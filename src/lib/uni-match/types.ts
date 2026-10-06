/** Prototip `Campus_Global_Universite_Secim_v33` ile aynı seçenek değerleri. */

export type EducationStatus =
  | "lise_okuyor"
  | "lise_mezunu_yks_var"
  | "lise_mezunu_yks_yok"
  | "on_lisans_okuyor"
  | "on_lisans_mezunu"
  | "lisans_okuyor"
  | "lisans_mezunu";

export type YksStatus = "yerlesti" | "baraj";
export type GpaBand = "low" | "mid" | "high";
export type StudyField = "saglik" | "sayisal" | "sozel";
export type LanguageCode = "en" | "de" | "fr" | "es" | "it" | "ru" | "other" | "none";
export type LanguageLevel = "low" | "mid" | "high";
export type BudgetBand = "5_10" | "10_20" | "20_40" | "40_plus";

export type UniMatchAnswers = {
  education: EducationStatus | "";
  yks: YksStatus | "";
  gpa: GpaBand | "";
  dept: StudyField | "";
  lang: LanguageCode | "";
  level: LanguageLevel | "";
  budget: BudgetBand | "";
};

export const EMPTY_ANSWERS: UniMatchAnswers = {
  education: "",
  yks: "",
  gpa: "",
  dept: "",
  lang: "",
  level: "",
  budget: "",
};

export type ProgramBadge = "LİSANS" | "YÜKSEK LİSANS" | "LİSANS & YÜKSEK LİSANS";

export type Callout = {
  tone: "advantage" | "warning";
  text: string;
};

export type CountryMatch = {
  name: string;
  flag: string;
  badge: ProgramBadge;
  bachelorCallouts: Callout[];
  bachelorBody: string;
  masterCallouts: Callout[];
  masterBody: string;
  /** `**kalın**` işaretli düz metin */
  languageNote: string;
};

export type UniMatchResult =
  | { kind: "early" }
  | { kind: "empty" }
  | { kind: "list"; countries: CountryMatch[] };

export type QuizStep = "education" | "scores" | "dept" | "lang" | "level" | "budget" | "calculate";
