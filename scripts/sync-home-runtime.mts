/**
 * Ana sayfa Markdown'ını bileşenlerin okuduğu JSON'a çevirir.
 * Panel yayınında MD yazılır; site derlemesi bu adımı build'den önce çalıştırır.
 *
 * Not: Editör DB hâlâ eski picsum/Unsplash tutuyorsa Yayınla MD'yi geri yazar.
 * Bu adım bilinen uzak görselleri lokal WebP'ye map'ler — skor düşmesin diye.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse } from "yaml";

const root = join(import.meta.dirname, "..");
const homeMdPath = join(root, "src/content/home/index.md");
let raw = readFileSync(homeMdPath, "utf8");

/** Panel DB / eski MD → lokal optimize görseller */
const IMAGE_REWRITES: Array<[RegExp | string, string]> = [
  [
    /https:\/\/images\.unsplash\.com\/photo-1523240795612-9a054b0db644[^"'\s]*/g,
    "/images/home/hero-visual.webp",
  ],
  ["https://picsum.photos/seed/cg-dil-yurtdisi-2024/1400/1000", "/images/home/dil-band.webp"],
  ["https://picsum.photos/seed/cg-ayni-masada-net-karar-2024/1000/660", "/images/home/neden-cg.webp"],
  ["https://picsum.photos/seed/cg-yuksek-lisans-kulvar-2024/1100/1200", "/images/home/yuksek-lisans.webp"],
  ["https://picsum.photos/seed/cg-dil-kurs-2024/1200/800", "/images/home/cat-dil.webp"],
  ["https://picsum.photos/seed/cg-universite-kampus-2024/1200/800", "/images/home/cat-uni.webp"],
  ["https://picsum.photos/seed/cg-msc-mba-2024/1200/800", "/images/home/cat-yl.webp"],
  ["https://picsum.photos/seed/cg-diploma-sertifika-2024/1200/800", "/images/home/cat-sertifika.webp"],
  ["https://picsum.photos/seed/cg-lise-okul-2024/1200/800", "/images/home/cat-lise.webp"],
  ["https://picsum.photos/seed/cg-teach-usa-2024/1200/800", "/images/home/cat-work.webp"],
  ["https://picsum.photos/seed/haber-berlin-1/1200/800", "/images/home/haber-1.webp"],
  ["https://picsum.photos/seed/haber-seul-1/1200/800", "/images/home/haber-2.webp"],
  ["https://picsum.photos/seed/haber-siralama-1/1200/800", "/images/home/haber-3.webp"],
  ["https://picsum.photos/seed/haber-burs-1/1200/800", "/images/home/haber-4.webp"],
];

let rewritten = 0;
for (const [from, to] of IMAGE_REWRITES) {
  if (typeof from === "string") {
    if (raw.includes(from)) {
      raw = raw.split(from).join(to);
      rewritten += 1;
    }
  } else {
    const next = raw.replace(from, to);
    if (next !== raw) {
      raw = next;
      rewritten += 1;
    }
  }
}
if (rewritten > 0) {
  writeFileSync(homeMdPath, raw);
  console.log(`✓ home görselleri yerelleştirildi (${rewritten} eşleme)`);
}

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
