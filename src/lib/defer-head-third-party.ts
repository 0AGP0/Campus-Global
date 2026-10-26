/**
 * Editörden gelen head HTML içindeki Meta Pixel’i ayırır.
 * Senkron fbevents.js TBT’yi şişirir; idle sonrası yüklenmeli.
 */
export function splitDeferredHeadHtml(html: string): {
  immediateHtml: string;
  metaPixelId: string | null;
} {
  const raw = (html || "").trim();
  if (!raw) return { immediateHtml: "", metaPixelId: null };

  const init = raw.match(/fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/);
  const metaPixelId = init?.[1] ?? null;

  let immediateHtml = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (block) => {
    if (/fbevents\.js|fbq\s*\(/i.test(block)) return "";
    return block;
  });

  immediateHtml = immediateHtml.replace(
    /<noscript\b[^>]*>[\s\S]*?facebook\.com\/tr[\s\S]*?<\/noscript>/gi,
    "",
  );

  return { immediateHtml: immediateHtml.trim(), metaPixelId };
}
