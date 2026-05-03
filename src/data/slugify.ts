/** Türkçe ülke/başlık → URL segmenti (mega menü ve ana sayfa ile aynı kurallar) */
export function slugify(s: string) {
  let t = s.normalize("NFKD").replace(/\p{M}/gu, "");
  const tr: Record<string, string> = {
    ü: "u",
    Ü: "u",
    ş: "s",
    Ş: "s",
    ğ: "g",
    Ğ: "g",
    ö: "o",
    Ö: "o",
    ç: "c",
    Ç: "c",
    İ: "i",
    I: "i",
    i: "i",
    ı: "i",
    â: "a",
    ô: "o",
  };
  for (const [k, v] of Object.entries(tr)) t = t.split(k).join(v);
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
