import { dilOkuluUlkeMegaNav, programCategories, universiteUlke, yuksekLisansUlkeMegaNav } from "@/data/home-ia";
import { slugify } from "@/data/slugify";

/** Üniversite kartları + site-nav ekleri — ülke adı */
const UNIVERSITE_EXTRA = [
  "Amerika",
  "Avustralya",
  "Kanada",
  "Çekya",
  "Fransa",
  "Güney Kore",
  "İrlanda",
  "İspanya",
  "Letonya",
  "Litvanya",
  "Rusya",
  "Ukrayna",
];

export { programCategories as leadProgramCategories };

export function countriesForLeadProgram(programId: string): string[] {
  switch (programId) {
    case "dil-okullari":
      return [...dilOkuluUlkeMegaNav];
    case "universite":
      return [...new Set([...universiteUlke.map((u) => u.ulke), ...UNIVERSITE_EXTRA])].sort((a, b) =>
        a.localeCompare(b, "tr"),
      );
    case "yuksek-lisans":
      return [...yuksekLisansUlkeMegaNav];
    case "diploma":
      return ["Avustralya", "Amerika", "İngiltere", "İrlanda", "İtalya", "Kanada"];
    case "lise":
      return ["Almanya", "ABD", "İngiltere", "İrlanda", "İsviçre", "Kanada"];
    case "teach-usa":
      return ["Amerika", "Avustralya", "Kanada", "İrlanda", "Malta", "Dubai", "Güney Kore"];
    default:
      return [];
  }
}

const LEAD_PROGRAM_IDS = ["dil-okullari", "universite", "yuksek-lisans", "diploma", "lise", "teach-usa"] as const;

function allLeadCountryLabels(): string[] {
  const set = new Set<string>();
  for (const id of LEAD_PROGRAM_IDS) {
    for (const c of countriesForLeadProgram(id)) set.add(c);
  }
  return [...set];
}

/** `slugify(ülke adı)` → menüdeki Türkçe ülke etiketi */
const leadCountrySlugToLabel: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const label of allLeadCountryLabels()) {
    m[slugify(label)] = label;
  }
  return m;
})();

/**
 * Makale URL’sinin son segmenti bir ülke slug’ıysa (ör. `/dil-okullari/ingiltere`, `/universite/almanya`)
 * formda kullanılan ülke adını döner; eşleşme yoksa `null`.
 */
export function leadCountryFromPageSlug(pathname: string): string | null {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segments.length < 2) return null;
  const last = segments[segments.length - 1]!;
  return leadCountrySlugToLabel[last] ?? null;
}

/** Navbar ilk segmenti → lead form `programId` (hub altı ülke sayfaları) */
const LEAD_PATH_ROOT_TO_PROGRAM_ID: Record<string, string> = {
  "dil-okullari": "dil-okullari",
  universite: "universite",
  "yuksek-lisans": "yuksek-lisans",
  lise: "lise",
  sertifika: "diploma",
  "work-travel": "teach-usa",
};

export type LeadFormPrefill = {
  programId: string;
  countryLabel: string;
};

/**
 * Örn. `/dil-okullari/ingiltere` → program + ülke hem geçerliyse ön doldurma (doğrudan iletişim adımı).
 * Ülke slug’ı veya program kökü tanınmıyorsa veya ülke o program listesinde yoksa `null`.
 */
export function resolveLeadFormPrefillFromPath(pathname: string): LeadFormPrefill | null {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segments.length < 2) return null;
  const root = segments[0]!;
  const programId = LEAD_PATH_ROOT_TO_PROGRAM_ID[root];
  if (!programId) return null;
  const countryLabel = leadCountryFromPageSlug(pathname);
  if (!countryLabel) return null;
  if (!countriesForLeadProgram(programId).includes(countryLabel)) return null;
  return { programId, countryLabel };
}
