import { bachelorsCountries, basePriorityOrder, mastersCountries } from "./catalog";
import type {
  BudgetBand,
  Callout,
  CountryMatch,
  EducationStatus,
  LanguageCode,
  QuizStep,
  UniMatchAnswers,
  UniMatchResult,
} from "./types";

const UNIVERSITY_TRACK: EducationStatus[] = [
  "lisans_okuyor",
  "lisans_mezunu",
  "on_lisans_mezunu",
  "on_lisans_okuyor",
];

const MASTER_GPA_STRICT = [
  "Almanya",
  "Amerika",
  "İngiltere",
  "Kanada",
  "Hollanda",
  "İrlanda",
  "Avustralya",
  "Fransa",
  "İtalya",
  "İspanya",
  "Çekya",
  "Güney Kore",
];

const MASTER_GPA_VERY_STRICT = ["Kanada", "Güney Kore"];

export const EDUCATION_OPTIONS: { value: EducationStatus; label: string }[] = [
  { value: "lise_okuyor", label: "Lise okuyorum" },
  { value: "lise_mezunu_yks_var", label: "Lise mezunuyum (YKS'ye girdim)" },
  { value: "lise_mezunu_yks_yok", label: "Lise mezunuyum (YKS'ye girmedim)" },
  { value: "on_lisans_okuyor", label: "Ön lisans okuyorum" },
  { value: "on_lisans_mezunu", label: "Ön lisans mezunuyum" },
  { value: "lisans_okuyor", label: "Lisans okuyorum" },
  { value: "lisans_mezunu", label: "Lisans mezunuyum" },
];

export const YKS_OPTIONS = [
  { value: "yerlesti" as const, label: "4 yıllık bir bölüme yerleştim" },
  { value: "baraj" as const, label: "Barajı geçtim / kazanamadım / tercih yapmadım" },
];

export const HIGH_SCHOOL_GPA_OPTIONS = [
  { value: "low" as const, label: "50 – 70 arası" },
  { value: "mid" as const, label: "70 – 85 arası" },
  { value: "high" as const, label: "85 ve üzeri" },
];

export const UNI_GPA_OPTIONS = [
  { value: "low" as const, label: "2.5 altı" },
  { value: "mid" as const, label: "2.5 – 3.0 arası" },
  { value: "high" as const, label: "3.0 ve üzeri" },
];

export const DEPT_OPTIONS = [
  { value: "saglik" as const, label: "Sağlık", hint: "Tıp, hemşirelik, psikoloji, veterinerlik" },
  { value: "sayisal" as const, label: "Sayısal", hint: "Mühendislik, finans" },
  { value: "sozel" as const, label: "Sözel", hint: "İletişim, tarih, tercümanlık" },
];

export const LANG_OPTIONS: { value: LanguageCode; label: string }[] = [
  { value: "en", label: "İngilizce" },
  { value: "de", label: "Almanca" },
  { value: "fr", label: "Fransızca" },
  { value: "es", label: "İspanyolca" },
  { value: "it", label: "İtalyanca" },
  { value: "ru", label: "Rusça" },
  { value: "other", label: "Diğer" },
  { value: "none", label: "Hiçbiri / sadece Türkçe (hazırlık okumak istiyorum)" },
];

export const LEVEL_OPTIONS = [
  { value: "low" as const, label: "A1 – A2", hint: "Başlangıç / temel" },
  { value: "mid" as const, label: "B1", hint: "Orta" },
  { value: "high" as const, label: "B2 – C2", hint: "İyi ve ileri" },
];

export const BUDGET_OPTIONS: { value: BudgetBand; label: string }[] = [
  { value: "5_10", label: "5.000$ – 10.000$ / yıllık" },
  { value: "10_20", label: "10.000$ – 20.000$ / yıllık" },
  { value: "20_40", label: "20.000$ – 40.000$ / yıllık" },
  { value: "40_plus", label: "40.000$ ve üzeri / yıllık" },
];

export function scoreQuestion(education: EducationStatus | ""): {
  label: string;
  gpaOptions: typeof HIGH_SCHOOL_GPA_OPTIONS | typeof UNI_GPA_OPTIONS;
  askYks: boolean;
} | null {
  if (!education || education === "lise_okuyor") return null;
  if (education === "lise_mezunu_yks_var") {
    return { label: "YKS durumunuz ve lise ortalamanız", gpaOptions: HIGH_SCHOOL_GPA_OPTIONS, askYks: true };
  }
  if (UNIVERSITY_TRACK.includes(education)) {
    return { label: "Üniversite not ortalamanız", gpaOptions: UNI_GPA_OPTIONS, askYks: false };
  }
  return { label: "Lise not ortalamanız", gpaOptions: HIGH_SCHOOL_GPA_OPTIONS, askYks: false };
}

export function scoresReady(answers: UniMatchAnswers): boolean {
  const q = scoreQuestion(answers.education);
  if (!q) return false;
  if (q.askYks && !answers.yks) return false;
  return Boolean(answers.gpa);
}

/** Prototipteki show/hide sırası. */
export function visibleSteps(answers: UniMatchAnswers): QuizStep[] {
  const steps: QuizStep[] = ["education"];
  if (!answers.education) return steps;
  if (answers.education === "lise_okuyor") return [...steps, "calculate"];
  steps.push("scores");
  if (!scoresReady(answers)) return steps;
  steps.push("dept");
  if (!answers.dept) return steps;
  steps.push("lang");
  if (!answers.lang) return steps;
  if (answers.lang === "none") {
    steps.push("budget");
  } else {
    steps.push("level");
    if (!answers.level) return steps;
    steps.push("budget");
  }
  if (!answers.budget) return steps;
  steps.push("calculate");
  return steps;
}

function budgetCeiling(budget: BudgetBand): number {
  if (budget === "5_10") return 10000;
  if (budget === "10_20") return 20000;
  if (budget === "20_40") return 40000;
  return 999999;
}

function languageFlags(answers: UniMatchAnswers) {
  const lang = answers.lang;
  const level = answers.level;
  return {
    lang,
    isSufficient: level === "high",
    isMid: level === "mid",
    isLow: level === "low" || lang === "none" || lang === "",
  };
}

function passesLanguageGate(name: string, lang: UniMatchAnswers["lang"], isSufficient: boolean): boolean {
  if (name === "Hollanda" && !(lang === "en" && isSufficient)) return false;
  if (name === "İtalya" && !((lang === "en" || lang === "it") && isSufficient)) return false;
  return true;
}

function bold(phrase: string, sentence: string): string {
  return sentence.replace(phrase, `**${phrase}**`);
}

export function languageNote(
  country: string,
  lang: UniMatchAnswers["lang"],
  isSufficient: boolean,
  isMid: boolean,
): string {
  let note = "";
  if (country === "Almanya") {
    if (lang === "de" && isSufficient) note = "Almanca seviyeniz doğrudan eğitime başlamak için yeterlidir.";
    else if (lang === "en" && isSufficient) {
      note = "İngilizce seviyeniz yeterli. Not ortalamanız uygunsa %100 İngilizce bölümlere başvurabilirsiniz.";
    } else {
      note = bold(
        "Şartlı Kabul",
        "A0/A1 Almanca ile Şartlı Kabul alarak Almanya'da dil eğitimine başlayabilir, ardından üniversiteye geçebilirsiniz.",
      );
    }
  } else if (["İngiltere", "Amerika", "Kanada", "İrlanda", "Avustralya"].includes(country)) {
    if (lang === "en" && isSufficient) note = "İngilizce seviyeniz doğrudan eğitime başlamak için yeterlidir.";
    else if (lang === "en" && isMid) {
      note = "Orta seviye İngilizceniz ile Pre-sessional veya kısa süreli hazırlık okuyarak başlayabilirsiniz.";
    } else {
      note = bold(
        "İngilizce Hazırlık (Foundation/ESL)",
        "İngilizce seviyeniz doğrudan giriş için yetersiz. Üniversite bünyesinde veya özel kurumlarda İngilizce Hazırlık (Foundation/ESL) okuyarak eğitiminize başlayabilirsiniz.",
      );
    }
  } else if (["Polonya", "Macaristan", "Letonya", "Litvanya"].includes(country)) {
    if (lang === "en" && isSufficient) note = "İngilizce seviyeniz bu ülkede İngilizce eğitim almak için yeterlidir.";
    else {
      note = bold(
        "1 yıllık İngilizce Hazırlık",
        "İngilizceniz yetersiz olsa bile, üniversitelerin sunduğu 1 yıllık İngilizce Hazırlık programlarıyla eğitiminize başlayabilirsiniz.",
      );
    }
  } else if (country === "Çekya") {
    if (lang === "en" && isSufficient) {
      note = bold(
        "ücretsiz",
        "İngilizce seviyeniz yeterli (Eğitim ücretlidir). Dilerseniz Çekçe hazırlık okuyarak eğitiminizi ücretsiz alabilirsiniz.",
      );
    } else {
      note = bold(
        "1 yıllık Çekçe veya İngilizce Hazırlık",
        "Üniversitelerin sunduğu 1 yıllık Çekçe veya İngilizce Hazırlık programlarına katılıp eğitiminize başlayabilirsiniz. Çekçe eğitim ücretsizdir.",
      );
    }
  } else if (country === "Hollanda") {
    if (lang === "en" && isSufficient) note = "İngilizce seviyeniz doğrudan başvuru için yeterlidir.";
    else {
      note =
        "Hollanda'da İngilizce hazırlık seçenekleri çok kısıtlıdır. İlgili bölümler için mutlaka İngilizce yeterlilik (min IELTS 6.0) belgesine ihtiyacınız olacak.";
    }
  } else if (country === "İtalya") {
    if ((lang === "en" || lang === "it") && isSufficient) note = "Dil seviyeniz İtalya'daki programlara başvuru için yeterlidir.";
    else note = "İtalya'da genellikle B2 seviyesinde dil (İngilizce/İtalyanca) talep edilir. Aksi durumda dil belgenizi almanız gerekecektir.";
  } else if (country === "Fransa") {
    if ((lang === "fr" || lang === "en") && isSufficient) {
      note = "Dil seviyeniz Fransa'daki Fransızca veya İngilizce programlara başvurmak için yeterlidir.";
    } else note = bold("dil okuluna", "Fransa'da öncelikle dil okuluna kayıt olup dilinizi geliştirerek eğitime başlayabilirsiniz.");
  } else if (country === "İspanya") {
    if ((lang === "es" && (isSufficient || isMid)) || (lang === "en" && isSufficient)) {
      note = "Dil seviyeniz İspanya'da eğitim almak için yeterlidir.";
    } else note = bold("dil okulu", "İspanya'da öncelikle dil okulu ile İspanyolca öğrenerek üniversiteye geçiş yapabilirsiniz.");
  } else if (country === "Rusya" || country === "Ukrayna") {
    if (lang === "ru" && isSufficient) note = "Rusça seviyeniz yeterli, doğrudan bölüme başlayabilirsiniz.";
    else {
      note = bold(
        "Hazırlık (Podfak)",
        "İlk yıl sıfırdan Hazırlık (Podfak) okuyarak eğitime başlarsınız. Önceden dil bilmenize gerek yoktur.",
      );
    }
  } else if (country === "Güney Kore") {
    if (lang === "en" && isSufficient) note = "İngilizce seviyenizle İngilizce programlara başvurabilirsiniz.";
    else if ((lang as string) === "ko" && (isSufficient || isMid)) note = "Korece seviyeniz eğitime başlamak için uygundur.";
    else {
      note = bold(
        "Korece hazırlık",
        "Üniversitelerin sunduğu Korece hazırlık programlarıyla eğitiminize başlayıp sonrasında bölüme geçebilirsiniz.",
      );
    }
  }
  return note;
}

function associateCallouts(name: string, stillStudying: boolean): Callout[] {
  const notes: Callout[] = [];
  if (stillStudying) {
    notes.push({
      tone: "warning",
      text: "Kredi transferi veya lisans tamamlama yapabilmek için ön lisans eğitiminizden mezun olmanız gerekmektedir. Beraber erkenden planlamanızı yapabiliriz.",
    });
  }
  if (name === "Almanya") {
    notes.push({
      tone: "advantage",
      text: "Ön lisans eğitiminiz sayesinde, Türkiye'deki alanınızla ilgili bölümlerde Almanya'daki devlet üniversitelerinde doğrudan lisans eğitimine kabul alabilirsiniz.",
    });
  } else if (name === "İngiltere" || name === "İrlanda") {
    notes.push({
      tone: "advantage",
      text: "Top-up degree programlarına başvurarak kredilerinizi saydırabilir ve lisans eğitiminizi 1 yılda tamamlayıp mezun olma fırsatından yararlanabilirsiniz.",
    });
  } else if (name === "Amerika" || name === "Kanada") {
    notes.push({
      tone: "advantage",
      text: "Ön lisans derslerinizi (transfer öğrenci olarak) saydırarak lisans eğitimine ortadan başlayabilir ve bütçeden büyük tasarruf edebilirsiniz.",
    });
  } else {
    notes.push({
      tone: "advantage",
      text: "Ön lisans eğitiminiz akademik yeterliliğinizi kanıtlar. Bazı üniversiteler Türkiye'de aldığınız kredileri sayarak sizi üst sınıflardan başlatabilir.",
    });
  }
  return notes;
}

function priorityFor(lang: UniMatchAnswers["lang"]): string[] {
  const rest = (top: string[]) => [...top, ...basePriorityOrder.filter((c) => !top.includes(c))];
  if (lang === "en") return rest(["İtalya", "Almanya", "İngiltere", "Amerika"]);
  if (lang === "de") return rest(["Almanya"]);
  if (lang === "fr") return rest(["Fransa"]);
  if (lang === "es") return rest(["İspanya"]);
  if (lang === "it") return rest(["İtalya"]);
  if (lang === "ru") return rest(["Rusya", "Ukrayna"]);
  return [...basePriorityOrder];
}

type Draft = {
  name: string;
  flag: string;
  bachelorCallouts: Callout[];
  bachelorBody: string;
  masterCallouts: Callout[];
  masterBody: string;
};

/**
 * Ülke eşlemesi. Prototipteki kurallar korunur:
 * yüksek lisans listesi yalnızca `lisans_mezunu` için dolar
 * (prototipte `lisans_okuyor` master uyarısı hiç çalışmaz).
 */
export function matchUniversities(answers: UniMatchAnswers): UniMatchResult {
  if (answers.education === "lise_okuyor") return { kind: "early" };
  if (!answers.education || !answers.dept || !answers.lang || !answers.budget) return { kind: "empty" };
  if (answers.lang !== "none" && !answers.level) return { kind: "empty" };

  const education = answers.education;
  const { lang, isSufficient, isMid } = languageFlags(answers);
  const userMax = budgetCeiling(answers.budget);

  let yksStatus: "yok" | "yerlesti" | "baraj" = "yok";
  if (UNIVERSITY_TRACK.includes(education)) yksStatus = "yerlesti";
  else if (answers.yks) yksStatus = answers.yks;

  const bMatched = bachelorsCountries.filter((c) => {
    if (c.req_yks === "yerlesti" && yksStatus !== "yerlesti") return false;
    if (c.req_yks === "baraj" && education === "lise_mezunu_yks_yok") return false;
    if (answers.dept === "saglik" && c.name === "Almanya") return false;
    if (c.min_budget > userMax) return false;
    if (!passesLanguageGate(c.name, lang, isSufficient)) return false;
    return true;
  });

  const mMatched =
    education === "lisans_mezunu"
      ? mastersCountries.filter((c) => {
          if (answers.dept === "saglik" && c.name === "Almanya") return false;
          if (answers.gpa === "low" && MASTER_GPA_STRICT.includes(c.name)) return false;
          if (answers.gpa === "mid" && MASTER_GPA_VERY_STRICT.includes(c.name)) return false;
          if (c.min_budget > userMax) return false;
          if (!passesLanguageGate(c.name, lang, isSufficient)) return false;
          return true;
        })
      : [];

  const merged = new Map<string, Draft>();
  const associate = education === "on_lisans_mezunu" || education === "on_lisans_okuyor";

  for (const c of bMatched) {
    merged.set(c.name, {
      name: c.name,
      flag: c.flag,
      bachelorCallouts: associate ? associateCallouts(c.name, education === "on_lisans_okuyor") : [],
      bachelorBody: c.desc,
      masterCallouts: [],
      masterBody: "",
    });
  }

  for (const c of mMatched) {
    const existing = merged.get(c.name);
    if (existing) {
      existing.masterBody = c.desc;
    } else {
      merged.set(c.name, {
        name: c.name,
        flag: c.flag,
        bachelorCallouts: [],
        bachelorBody: "",
        masterCallouts: [],
        masterBody: c.desc,
      });
    }
  }

  const order = priorityFor(lang);
  const countries: CountryMatch[] = [...merged.values()]
    .map((row) => {
      const hasB = Boolean(row.bachelorBody);
      const hasM = Boolean(row.masterBody);
      const badge: CountryMatch["badge"] =
        hasB && hasM ? "LİSANS & YÜKSEK LİSANS" : hasB ? "LİSANS" : "YÜKSEK LİSANS";
      return {
        ...row,
        badge,
        languageNote: languageNote(row.name, lang, isSufficient, isMid),
      };
    })
    .sort((a, b) => {
      const ia = order.indexOf(a.name);
      const ib = order.indexOf(b.name);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

  if (countries.length === 0) return { kind: "empty" };
  return { kind: "list", countries };
}

function labelOf<T extends string>(options: { value: T; label: string }[], value: T | ""): string {
  if (!value) return "";
  return options.find((o) => o.value === value)?.label ?? value;
}

/** CRM not alanına gidecek kısa özet. Form alanlarını değiştirmez. */
export function summarizeMatch(answers: UniMatchAnswers, result: UniMatchResult | null): string {
  const lines = [
    `Eğitim: ${labelOf(EDUCATION_OPTIONS, answers.education) || "—"}`,
    answers.yks ? `YKS: ${labelOf(YKS_OPTIONS, answers.yks)}` : "",
    answers.gpa
      ? `Not: ${labelOf(
          UNIVERSITY_TRACK.includes(answers.education as EducationStatus) ? UNI_GPA_OPTIONS : HIGH_SCHOOL_GPA_OPTIONS,
          answers.gpa,
        )}`
      : "",
    answers.dept ? `Alan: ${labelOf(DEPT_OPTIONS, answers.dept)}` : "",
    answers.lang ? `Dil: ${labelOf(LANG_OPTIONS, answers.lang)}` : "",
    answers.level ? `Seviye: ${labelOf(LEVEL_OPTIONS, answers.level)}` : "",
    answers.budget ? `Bütçe: ${labelOf(BUDGET_OPTIONS, answers.budget)}` : "",
  ].filter(Boolean);

  if (result?.kind === "early") lines.push("Sonuç: lise öğrencisi, erken planlama");
  else if (result?.kind === "empty") lines.push("Sonuç: standart rota yok");
  else if (result?.kind === "list") {
    lines.push(`Ülkeler: ${result.countries.map((c) => c.name).join(", ")}`);
  }
  return lines.join("\n");
}
