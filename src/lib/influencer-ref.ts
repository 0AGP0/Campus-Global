/** Tarayıcıda `cg-ref-persist.js` ile saklanan influencer / ref değeri. */

function sanitizeRef(raw: string): string {
  const ref = (raw || "").trim().slice(0, 80);
  if (!ref) return "";
  if (!/^[a-zA-Z0-9\u00C0-\u024F._-]+$/.test(ref)) return "";
  return ref;
}

function readStoredRef(): string {
  try {
    const fromApi =
      typeof window.cgGetInfluencerRef === "function" ? window.cgGetInfluencerRef() : "";
    if (fromApi) return sanitizeRef(fromApi);
    return sanitizeRef(
      window.sessionStorage.getItem("cg_influencer_ref") ||
        window.localStorage.getItem("cg_influencer_ref") ||
        "",
    );
  } catch {
    return "";
  }
}

function readUrlRef(): string {
  try {
    const u = new URL(window.location.href);
    return sanitizeRef(
      u.searchParams.get("ref") ||
        u.searchParams.get("influencer") ||
        u.searchParams.get("utm_ref") ||
        "",
    );
  } catch {
    return "";
  }
}

function persistRef(ref: string) {
  if (!ref) return;
  try {
    sessionStorage.setItem("cg_influencer_ref", ref);
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem("cg_influencer_ref", ref);
  } catch {
    /* ignore */
  }
}

/**
 * Önce mevcut URL’deki ?ref= (gönderim anı), yoksa storage.
 * Böylece sayfada ref varken eski/yanlış storage ezmez.
 */
export function getInfluencerRef(): string {
  if (typeof window === "undefined") return "";
  const fromUrl = readUrlRef();
  if (fromUrl) {
    persistRef(fromUrl);
    return fromUrl;
  }
  return readStoredRef();
}

/** CRM / Make için hazır referrer metni — formül gerekmez */
export function buildReferrerLabel(kaynak: string): string {
  const ref = getInfluencerRef();
  const base = (kaynak || "Site").trim() || "Site";
  return ref ? `${base} - influencer: ${ref}` : base;
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const u = new URL(window.location.href);
    return {
      utm_source: u.searchParams.get("utm_source") || "",
      utm_medium: u.searchParams.get("utm_medium") || "",
      utm_campaign: u.searchParams.get("utm_campaign") || "",
      utm_term: u.searchParams.get("utm_term") || "",
      utm_content: u.searchParams.get("utm_content") || "",
    };
  } catch {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }
}

declare global {
  interface Window {
    cgGetInfluencerRef?: () => string;
  }
}
