/** src/content/articles altındaki tüm .md dosyalarını Sanity'ye yükler */
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { parse as parseYaml } from "yaml";
import { faqWithKeys, tocWithKeys } from "./lib/sanity-array-keys.ts";

const root = join(import.meta.dirname, "..");
config({ path: join(root, ".env") });
const articlesRoot = join(root, "src/content/articles");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "replace-me") {
  console.error("SANITY_STUDIO_PROJECT_ID veya PUBLIC_SANITY_PROJECT_ID gerekli.");
  process.exit(1);
}
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN gerekli (Editor yetkisi).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

function walkMdFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walkMdFiles(path));
    else if (name.endsWith(".md")) out.push(path);
  }
  return out;
}

function parseMdFile(filePath: string) {
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Frontmatter bulunamadı: ${filePath}`);
  const frontmatter = parseYaml(match[1]) as Record<string, unknown>;
  const bodyHtml = match[2].trim();
  const slug = relative(articlesRoot, filePath).replace(/\\/g, "/").replace(/\.md$/, "");
  return { slug, frontmatter, bodyHtml };
}

function sanityIdForSlug(slug: string) {
  return `article-${slug.replace(/\//g, "--")}`;
}

const files = walkMdFiles(articlesRoot);
let ok = 0;

for (const file of files) {
  const { slug, frontmatter, bodyHtml } = parseMdFile(file);
  const doc = {
    _id: sanityIdForSlug(slug),
    _type: "article",
    title: frontmatter.title,
    slug,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    publishedISO: frontmatter.publishedISO,
    modifiedISO: frontmatter.modifiedISO ?? frontmatter.publishedISO,
    eyebrow: frontmatter.eyebrow,
    section: frontmatter.section,
    readingMinutes: frontmatter.readingMinutes,
    toc: tocWithKeys(frontmatter.toc),
    faq: faqWithKeys(frontmatter.faq),
    bodyHtml,
    showInNav: false,
  };

  await client.createOrReplace(doc);
  ok += 1;
  console.log(`  · ${slug}`);
}

console.log(`✓ ${ok} makale Sanity’ye yüklendi.`);
