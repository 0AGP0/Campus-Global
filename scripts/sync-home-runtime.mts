/**
 * Ana sayfa Markdown'ını bileşenlerin okuduğu JSON'a çevirir.
 * Panel yayınında MD yazılır; site derlemesi bu adımı build'den önce çalıştırır.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse } from "yaml";

const root = join(import.meta.dirname, "..");
const raw = readFileSync(join(root, "src/content/home/index.md"), "utf8");
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!match) {
  console.error("Ana sayfa frontmatter bulunamadı");
  process.exit(1);
}

const data = parse(match[1]) as Record<string, unknown>;
const required = [
  "title",
  "description",
  "layout",
  "images",
  "hero",
  "sections",
  "programCategories",
  "dilOkuluUlke",
  "footerIletisim",
  "faqItems",
  "icefIas",
];
for (const key of required) {
  if (data[key] == null) {
    console.error(`Ana sayfa eksik alan: ${key}`);
    process.exit(1);
  }
}

const sections = data.sections as Record<string, unknown>;
const sectionKeys = [
  "programKategorileri",
  "dilOkullari",
  "nedenCampusGlobal",
  "universite",
  "sinavlar",
  "fiyatlar",
  "yuksekLisans",
  "haberler",
  "sss",
  "footerProgramlar",
];
for (const key of sectionKeys) {
  const section = sections?.[key];
  if (!section || typeof section !== "object" || Array.isArray(section)) {
    console.error(`Ana sayfa bölümü eksik: sections.${key}`);
    process.exit(1);
  }
}

const headHtml = typeof data.headHtml === "string" ? data.headHtml : "";
const dest = join(root, "src/data/generated/home-runtime.json");
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, `${JSON.stringify({ ...data, headHtml }, null, 2)}\n`);
console.log("✓ src/data/generated/home-runtime.json");
