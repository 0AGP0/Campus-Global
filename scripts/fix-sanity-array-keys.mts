/**
 * Sanity'deki mevcut belgelerde eksik _key alanlarını düzeltir (toc, faq, navbar).
 */
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { join } from "node:path";
import { faqWithKeys, tocWithKeys, withArrayKeys } from "./lib/sanity-array-keys.ts";

const root = join(import.meta.dirname, "..");
config({ path: join(root, ".env") });

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

type NavLink = { label?: string; href?: string; desc?: string; _type?: string };
type NavColumn = { heading?: string; links?: NavLink[]; _type?: string };
type MegaNavItem = { id?: string; columns?: NavColumn[]; _type?: string };

function fixMegaNavItems(items: unknown) {
  return withArrayKeys<MegaNavItem>(items, (item, index) => {
    const id = typeof item.id === "string" ? item.id : `mega-${index}`;
    return id;
  })?.map((item) => ({
    ...item,
    columns: withArrayKeys<NavColumn>(item.columns, (col, ci) => {
      const heading =
        typeof col.heading === "string" ? col.heading.replace(/[^a-z0-9]+/gi, "-").slice(0, 32) : `col-${ci}`;
      return `${item.id ?? "mega"}-col-${ci}-${heading}`;
    })?.map((col, ci) => ({
      ...col,
      links: withArrayKeys<NavLink>(col.links, (link, li) => {
        const href = typeof link.href === "string" ? link.href.replace(/[^a-z0-9]+/gi, "-").slice(0, 48) : `link-${li}`;
        return `${item.id ?? "mega"}-${ci}-${li}-${href}`;
      }),
    })),
  }));
}

const articles = await client.fetch<
  { _id: string; slug?: string; toc?: unknown; faq?: unknown }[]
>(`*[_type == "article"]{ _id, slug, toc, faq }`);

let articlePatches = 0;
for (const article of articles) {
  const toc = tocWithKeys(article.toc);
  const faq = faqWithKeys(article.faq);
  const needsToc = Array.isArray(article.toc) && article.toc.some((row) => !(row as { _key?: string })._key);
  const needsFaq = Array.isArray(article.faq) && article.faq.some((row) => !(row as { _key?: string })._key);
  if (!needsToc && !needsFaq) continue;

  await client.patch(article._id).set({ ...(needsToc && toc ? { toc } : {}), ...(needsFaq && faq ? { faq } : {}) }).commit();
  articlePatches += 1;
  console.log(`  · ${article.slug ?? article._id}`);
}

const nav = await client.fetch<{ _id: string; megaNavItems?: unknown }>(
  `*[_type == "siteNavigation"][0]{ _id, megaNavItems }`,
);

if (nav?.megaNavItems) {
  const megaNavItems = fixMegaNavItems(nav.megaNavItems);
  const needsNav = Array.isArray(nav.megaNavItems) && nav.megaNavItems.some((row) => !(row as { _key?: string })._key);
  if (needsNav && megaNavItems) {
    await client.patch(nav._id).set({ megaNavItems }).commit();
    console.log("  · siteNavigation (navbar)");
  }
}

console.log(`✓ ${articlePatches} makalede _key düzeltildi.`);
