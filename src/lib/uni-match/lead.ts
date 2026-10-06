import { summarizeMatch } from "./match";
import type { UniMatchAnswers, UniMatchResult } from "./types";

export type UniMatchLeadSource = "form" | "popup";

const KAYNAK: Record<UniMatchLeadSource, string> = {
  form: "Üniversite Seçim Form",
  popup: "Üniversite Seçim Popup",
};

export type UniMatchLeadInput = {
  source: UniMatchLeadSource;
  fullName: string;
  city: string;
  phone: string;
  email: string;
  pageUrl: string;
  utm: Record<string, string>;
  answers: UniMatchAnswers;
  result: UniMatchResult | null;
  /** Testlerde window’suz referrer. Boşsa `buildReferrerLabel` kullanılır. */
  referrer?: string;
  influencerRef?: string;
};

/** QR / site lead ile aynı çekirdek alanlar + seçim özeti. */
export function buildUniMatchLeadPayload(input: UniMatchLeadInput): Record<string, string> {
  const kaynak = KAYNAK[input.source];
  const adSoyad = input.fullName.trim();
  const email = input.email.trim();
  const ref = (input.influencerRef ?? "").trim();
  const referrer = input.referrer ?? (ref ? `${kaynak} - influencer: ${ref}` : kaynak);

  return {
    adSoyad,
    eposta: email,
    sehir: input.city.trim(),
    telefon: input.phone.trim(),
    email,
    not: summarizeMatch(input.answers, input.result),
    program: "Üniversite",
    programId: "universite",
    kaynak,
    page_url: input.pageUrl,
    influencer_ref: ref,
    referrer,
    tarih: new Date().toISOString(),
    utm_source: input.utm.utm_source ?? "",
    utm_medium: input.utm.utm_medium ?? "",
    utm_campaign: input.utm.utm_campaign ?? "",
    utm_term: input.utm.utm_term ?? "",
    utm_content: input.utm.utm_content ?? "",
  };
}
