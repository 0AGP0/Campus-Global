/**
 * Ana sayfa listeleri. Kaynak: `src/content/home/index.md`
 * Derlemeden önce `npm run sync:home` bu JSON'u üretir.
 */
import runtime from "@/data/generated/home-runtime.json";

export type ProgramCategory = {
  id: string;
  title: string;
  href: string;
  blurb: string;
  image: string;
};

export type UniversiteUlkeItem = {
  ulke: string;
  slug: string;
  ozet: string;
  not: string;
  madde: string[];
};

export type SinavKarti = {
  kod: string;
  rol: string;
  aciklama: string;
  maddeler: [string, string];
  href: string;
};

export type FiyatBanti = {
  ulke: string;
  bolgeNot: string;
  aralik: string;
  birim: "hafta" | "ay";
  not: string;
  maddeler: [string, string];
  href: string;
};

export type FaqItem = { soru: string; cevap: string };

export const programCategories = runtime.programCategories as ProgramCategory[];
export const dilOkuluUlke = runtime.dilOkuluUlke;
export const dilOkuluUlkeMegaNav = runtime.dilOkuluUlkeMegaNav;
export const universiteUlke = runtime.universiteUlke as UniversiteUlkeItem[];
export const sinavlar = runtime.sinavlar as SinavKarti[];
export const fiyatKampanya = runtime.fiyatKampanya as FiyatBanti[];
export const yuksekLisansUlke = runtime.yuksekLisansUlke;
export const yuksekLisansUlkeMegaNav = runtime.yuksekLisansUlkeMegaNav;
export const haberSpotlight = runtime.haberSpotlight;
export const faqItems = runtime.faqItems as FaqItem[];
export const preFooterPrograms = runtime.preFooterPrograms;
export const preFooterPopuler = runtime.preFooterPopuler;
export const preFooterSubeler = runtime.preFooterSubeler;
export const footerIletisim = runtime.footerIletisim;
export const icefIas = runtime.icefIas;

export function buildFaqPageJsonLd(siteUrl = "https://www.example.com/") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.soru,
      acceptedAnswer: { "@type": "Answer", text: item.cevap },
    })),
    url: siteUrl,
  };
}

/** Görünen numaradan `tel:+90…` üretir (0212… ve +90 212… formatlarını destekler). */
export function telHrefFromDisplay(tel: string): string {
  if (tel.includes("_")) return "#site-footer";
  let digits = tel.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 && !digits.startsWith("90")) digits = `90${digits}`;
  return digits.length >= 11 ? `tel:+${digits}` : "#site-footer";
}
