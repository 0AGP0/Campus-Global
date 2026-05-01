/** Tam kanonik URL ve Open Graph için kök adres. `.env` içinde PUBLIC_SITE_URL tanımlayın (sonunda / olmadan). */
export function getSiteOrigin(): string {
  const raw = import.meta.env.PUBLIC_SITE_URL as string | undefined;
  if (raw && raw.trim()) return raw.replace(/\/$/, "");
  return "https://campusglobal.com.tr";
}
