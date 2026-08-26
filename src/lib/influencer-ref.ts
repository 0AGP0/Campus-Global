/** Tarayıcıda `cg-ref-persist.js` ile saklanan influencer / ref değeri. */
export function getInfluencerRef(): string {
  if (typeof window === "undefined") return "";
  try {
    const fromApi =
      typeof window.cgGetInfluencerRef === "function" ? window.cgGetInfluencerRef() : "";
    if (fromApi) return fromApi;
    return (
      window.sessionStorage.getItem("cg_influencer_ref") ||
      window.localStorage.getItem("cg_influencer_ref") ||
      ""
    );
  } catch {
    return "";
  }
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
