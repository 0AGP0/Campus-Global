import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const link = z.object({ label: z.string(), href: z.string() });

const hubSpotlight = z.object({
  kicker: z.string(),
  title: z.string(),
  subtitle: z.string(),
  pullQuote: z.string(),
  programStrip: z.array(z.string()),
  pillars: z.array(z.object({ title: z.string(), body: z.string() })),
  body: z.string(),
  bullets: z.array(z.string()),
  imageTagline: z.string(),
});

const hubValueProp = z.object({
  title: z.string(),
  body: z.string(),
  bullets: z.array(z.string()),
});

const hubProcessStep = z.object({
  title: z.string(),
  body: z.string(),
  tips: z.array(z.string()),
});

const hubSchema = z.object({
  id: z.enum(["dil-okullari", "universite", "yuksek-lisans", "sertifika"]),
  _note: z.string().optional(),
  layoutTitle: z.string(),
  metaDescription: z.string(),
  eyebrow: z.string(),
  heroTitle: z.string(),
  heroHighlight: z.string(),
  heroLead: z.string(),
  heroImageSrc: z.string(),
  heroImageAlt: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  bullets: z.array(z.string()),
  countriesHeading: z.string(),
  primaryCta: link,
  secondaryCta: link,
  spotlight: hubSpotlight,
  valueProps: z.array(hubValueProp),
  processTitle: z.string(),
  process: z.array(hubProcessStep),
});

const programCategory = z.object({
  id: z.string(),
  title: z.string(),
  href: z.string(),
  blurb: z.string(),
  image: z.string(),
});

const universiteUlkeItem = z.object({
  ulke: z.string(),
  slug: z.string(),
  ozet: z.string(),
  not: z.string(),
  madde: z.array(z.string()),
});

const sinavKarti = z.object({
  kod: z.string(),
  rol: z.string(),
  aciklama: z.string(),
  maddeler: z.tuple([z.string(), z.string()]),
  href: z.string(),
});

const fiyatBanti = z.object({
  ulke: z.string(),
  bolgeNot: z.string(),
  aralik: z.string(),
  birim: z.enum(["hafta", "ay"]),
  not: z.string(),
  maddeler: z.tuple([z.string(), z.string()]),
  href: z.string(),
});

const haberItem = z.object({
  baslik: z.string(),
  kategori: z.string(),
  ozet: z.string(),
  img: z.string(),
  href: z.string(),
});

const faqItem = z.object({ soru: z.string(), cevap: z.string() });

const homeSchema = z.object({
  title: z.string(),
  description: z.string(),
  layout: z.object({
    layoutTitle: z.string(),
    layoutDescription: z.string(),
  }),
  images: z.record(z.string()),
  hero: z.record(z.unknown()),
  sections: z.record(z.unknown()),
  programCategories: z.array(programCategory),
  dilOkuluUlke: z.array(z.string()),
  dilOkuluUlkeMegaNav: z.array(z.string()),
  universiteUlke: z.array(universiteUlkeItem),
  sinavlar: z.array(sinavKarti),
  fiyatKampanya: z.array(fiyatBanti),
  yuksekLisansUlke: z.array(z.string()),
  yuksekLisansUlkeMegaNav: z.array(z.string()),
  haberSpotlight: z.array(haberItem),
  faqItems: z.array(faqItem),
  preFooterPrograms: z.array(link),
  preFooterPopuler: z.array(link),
  preFooterSubeler: z.array(
    z.object({ sehir: z.string(), ad: z.string(), href: z.string() }),
  ),
  footerIletisim: z.object({
    adres: z.string(),
    tel: z.string(),
    email: z.string(),
    mesai: z.string(),
  }),
  icefIas: z.object({
    accountId: z.string(),
    badgeScriptSrc: z.string(),
    verifyInfoUrl: z.string(),
    fallbackBadgeImage: z.string(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    publishedISO: z.string(),
    modifiedISO: z.string().optional(),
    eyebrow: z.string().optional(),
    section: z.string().optional(),
    readingMinutes: z.number(),
    toc: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          depth: z.union([z.literal(2), z.literal(3)]).optional(),
        }),
      )
      .default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
  }),
});

const hubs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/hubs" }),
  schema: hubSchema,
});

const home = defineCollection({
  loader: glob({ pattern: "index.md", base: "./src/content/home" }),
  schema: homeSchema,
});

export const collections = { articles, hubs, home };
