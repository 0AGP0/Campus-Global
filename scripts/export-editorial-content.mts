/**
 * Mevcut TS verisinden içerik üreticisi MD dosyalarını üretir.
 * Çalıştırma: npm run content:export
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { stringify } from "yaml";
import {
  dilOkuluUlke,
  dilOkuluUlkeMegaNav,
  faqItems,
  fiyatKampanya,
  footerIletisim,
  haberSpotlight,
  icefIas,
  preFooterPopuler,
  preFooterPrograms,
  preFooterSubeler,
  programCategories,
  sinavlar,
  universiteUlke,
  yuksekLisansUlke,
  yuksekLisansUlkeMegaNav,
} from "../src/data/home-ia.ts";
import {
  homeDilOkullari,
  homeFiyatlar,
  homeFooterProgramlar,
  homeHero,
  homeHaberler,
  homeNedenCampusGlobal,
  homePageImages,
  homePageMeta,
  homeProgramKategorileri,
  homeSinavlar,
  homeSss,
  homeUniversite,
  homeYuksekLisans,
} from "../src/data/home-page-copy.ts";
import { programHubById, type ProgramHubId } from "../src/data/program-hub-content.ts";

const root = join(import.meta.dirname, "..");
const contentRoot = join(root, "src", "content");

function mdFile(frontmatter: Record<string, unknown>, body = ""): string {
  const yaml = stringify(frontmatter, { lineWidth: 0, defaultKeyType: "PLAIN" });
  const trimmedBody = body.trim();
  return trimmedBody
    ? `---\n${yaml}---\n\n${trimmedBody}\n`
    : `---\n${yaml}---\n`;
}

function hubFrontmatter(id: ProgramHubId) {
  const hub = programHubById[id];
  const { countries: _countries, ...editorial } = hub;
  return {
    id,
    ...editorial,
    _note:
      "Ülke listesi site-nav.ts üzerinden otomatik eklenir; bu dosyada countries alanı yok.",
  };
}

function exportHome() {
  const dir = join(contentRoot, "home");
  mkdirSync(dir, { recursive: true });

  const data = {
    title: "Ana sayfa",
    description: homePageMeta.layoutDescription,
    layout: homePageMeta,
    images: homePageImages,
    hero: homeHero,
    sections: {
      programKategorileri: homeProgramKategorileri,
      dilOkullari: homeDilOkullari,
      nedenCampusGlobal: homeNedenCampusGlobal,
      universite: homeUniversite,
      sinavlar: homeSinavlar,
      fiyatlar: homeFiyatlar,
      yuksekLisans: homeYuksekLisans,
      haberler: homeHaberler,
      sss: homeSss,
      footerProgramlar: homeFooterProgramlar,
    },
    programCategories,
    dilOkuluUlke,
    dilOkuluUlkeMegaNav,
    universiteUlke,
    sinavlar,
    fiyatKampanya,
    yuksekLisansUlke,
    yuksekLisansUlkeMegaNav,
    haberSpotlight,
    faqItems,
    preFooterPrograms,
    preFooterPopuler,
    preFooterSubeler,
    footerIletisim,
    icefIas,
  };

  const body = `<!--
  İçerik üreticisi notu
  - Bu dosyadaki YAML frontmatter düzenlenir; görsel URL’leri ve linkler korunmalı.
  - programCategories içindeki id alanlarını değiştirmeyin (nav ve lead form ile bağlı).
  - Güncelleme sonrası geliştirici: npm run content:export veya manuel senkron + npm run build
-->

Ana sayfa metinleri bu dosyanın frontmatter bölümündedir. Gövde metni kullanılmaz.
`;

  writeFileSync(join(dir, "index.md"), mdFile(data, body), "utf8");
}

function exportHubs() {
  const dir = join(contentRoot, "hubs");
  mkdirSync(dir, { recursive: true });

  const ids: ProgramHubId[] = ["dil-okullari", "universite", "yuksek-lisans", "sertifika"];
  for (const id of ids) {
    const fm = hubFrontmatter(id);
    const body = `<!--
  Hub içeriği — ${id}
  Ülke kartları site-nav.ts listesinden otomatik gelir.
-->

`;
    writeFileSync(join(dir, `${id}.md`), mdFile(fm, body), "utf8");
  }
}

exportHome();
exportHubs();
console.log("✓ src/content/home/index.md");
console.log("✓ src/content/hubs/*.md (4 dosya)");
