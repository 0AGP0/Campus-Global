import { dilOkuluUlke, universiteUlke, yuksekLisansUlke } from "@/data/home-ia";

export type NavSubLink = { label: string; href: string; desc?: string };
export type NavColumn = { heading: string; links: NavSubLink[] };

export type MegaNavItem = {
  id: string;
  title: string;
  href: string;
  columns: NavColumn[];
  /** Kısa vurgu; mega panel üstünde */
  blurb?: string;
};

const u = (slugs: string[]) => "/" + slugs.join("/");

/** Alt sayfa URL’leri ileride Astro route ile eşlenecek; şimdilik tutarlı yapı */
export const navBase = (segment: string, page: string) => u([segment, page]);

const dilByPop: NavSubLink[] = dilOkuluUlke.slice(0, 8).map((l) => ({
  label: l,
  href: navBase("dil-okullari", slugify(l)),
  desc: "Kurs & konaklama notları",
}));

function slugify(s: string) {
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

const uniBy: NavSubLink[] = universiteUlke.map((x) => ({
  label: x.ulke,
  href: navBase("universite", x.slug),
  desc: x.ozet,
}));

const ylBy: NavSubLink[] = yuksekLisansUlke.map((l) => ({
  label: l,
  href: navBase("yuksek-lisans", slugify(l)),
}));

export const megaNav: MegaNavItem[] = [
  {
    id: "dil-okullari",
    title: "DİL OKULLARI",
    href: "/#dil-okullari",
    blurb: "Genel İngilizce, akademik hazırlık, pathway",
    columns: [
      {
        heading: "Program türleri",
        links: [
          { label: "Yoğun genel İngilizce", href: navBase("dil-okullari", "yogun-genel") },
          { label: "Hazırlık & pathway", href: navBase("dil-okullari", "pathway") },
          { label: "Akademik İngilizce", href: navBase("dil-okullari", "akademik") },
          { label: "Bire bir & mini grup", href: navBase("dil-okullari", "bire-bir") },
        ],
      },
      {
        heading: "Popüler ülkeler",
        links: dilByPop,
      },
      {
        heading: "Hızlı link",
        links: [
          { label: "Ana sayfada dil bölümü", href: "/#dil-okullari" },
          { label: "Sınavlar (IELTS / TOEFL)", href: "/#sinavlar" },
          { label: "Fiyat bantları", href: "/#fiyatlar" },
        ],
      },
    ],
  },
  {
    id: "universite",
    title: "ÜNİVERSİTE",
    href: "/#universite",
    blurb: "Lisans başvuru takvimi ve ülke profilleri",
    columns: [
      {
        heading: "Başvuru & rehber",
        links: [
          { label: "Lisans başvuru yol haritası", href: navBase("universite", "basvuru") },
          { label: "Mektuplar & belgeler", href: navBase("universite", "belgeler") },
          { label: "Burs & mali planlama", href: navBase("universite", "burs") },
        ],
      },
      { heading: "Ülkeler", links: uniBy.slice(0, 6) },
      {
        heading: "Hızlı link",
        links: [
          { label: "Ana sayfada üniversite", href: "/#universite" },
          { label: "Sınavlar (SAT, IELTS…)", href: "/#sinavlar" },
        ],
      },
    ],
  },
  {
    id: "yuksek-lisans",
    title: "YÜKSEK LİSANS",
    href: "/#yuksek-lisans",
    blurb: "MSc, MA, MBA, doktora yol haritası",
    columns: [
      {
        heading: "Program türü",
        links: [
          { label: "MSc & teknik alanlar", href: navBase("yuksek-lisans", "msc") },
          { label: "MBA & yönetim", href: navBase("yuksek-lisans", "mba") },
          { label: "Dil yeterliliği (IELTS / GRE / GMAT)", href: "/#sinavlar" },
        ],
      },
      { heading: "Destinasyon", links: ylBy },
      {
        heading: "Hızlı link",
        links: [{ label: "Yüksek lisans bölümü (ana sayfa)", href: "/#yuksek-lisans" }],
      },
    ],
  },
  {
    id: "work-study",
    title: "WORK AND STUDY",
    href: "/#program-kategorileri",
    blurb: "Çalışma hakkı ve eğitim modelleri",
    columns: [
      {
        heading: "Modeller",
        links: [
          { label: "Kurum destekli work & study", href: navBase("work-study", "kurum") },
          { label: "Mesleki dil + staj", href: navBase("work-study", "mesleki") },
          { label: "Post-study iş izni özetleri", href: navBase("work-study", "post-study") },
        ],
      },
      {
        heading: "Destinasyon örnekleri",
        links: [
          { label: "Avustralya", href: navBase("work-study", "avustralya") },
          { label: "Kanada", href: navBase("work-study", "kanada") },
          { label: "İngiltere", href: navBase("work-study", "ingiltere") },
          { label: "İrlanda", href: navBase("work-study", "irlanda") },
        ],
      },
      {
        heading: "Hızlı link",
        links: [{ label: "Program kategorileri", href: "/#program-kategorileri" }],
      },
    ],
  },
  {
    id: "lise",
    title: "YURTDIŞINDA LİSE",
    href: "/#program-kategorileri",
    blurb: "IB, A-Level, AP, yatılı",
    columns: [
      {
        heading: "Program türü",
        links: [
          { label: "IB & A-Level", href: navBase("lise", "ib-a-level") },
          { label: "AP (Kuzey Amerika)", href: navBase("lise", "ap") },
          { label: "Yatılı okul", href: navBase("lise", "yatili") },
        ],
      },
      {
        heading: "Destinasyon",
        links: [
          { label: "İngiltere", href: navBase("lise", "ingiltere") },
          { label: "Kanada", href: navBase("lise", "kanada") },
          { label: "ABD", href: navBase("lise", "abd") },
        ],
      },
      {
        heading: "Hızlı link",
        links: [{ label: "Kartlarda lise", href: "/#program-kategorileri" }],
      },
    ],
  },
  {
    id: "yaz-okulu",
    title: "YAZ OKULU",
    href: "/#dil-okullari",
    blurb: "Dil veya üniversite kampüsü yaz dönemi",
    columns: [
      {
        heading: "Dil yaz okulları",
        links: [
          { label: "Genel İngilizce yaz", href: navBase("yaz-okulu", "dil-genel") },
          { label: "Sınav odaklı (IELTS / TOEFL)", href: navBase("yaz-okulu", "sinav") },
        ],
      },
      {
        heading: "Akademik yaz",
        links: [
          { label: "Üniversite kampüs programları", href: navBase("yaz-okulu", "kampus") },
        ],
      },
      {
        heading: "Hızlı link",
        links: [
          { label: "Dil okulları bölümü", href: "/#dil-okullari" },
          { label: "Fiyat bantları", href: "/#fiyatlar" },
        ],
      },
    ],
  },
  {
    id: "sertifika",
    title: "SERTİFİKA",
    href: "/#program-kategorileri",
    blurb: "Kısa meslek & sertifika programları",
    columns: [
      {
        heading: "Kategoriler",
        links: [
          { label: "Dil + meslek bileşenleri", href: navBase("sertifika", "dil-meslek") },
          { label: "Diploma & sertifika (kısa)", href: navBase("sertifika", "kisa-program") },
        ],
      },
      {
        heading: "Hızlı link",
        links: [
          { label: "Program grid (Diploma & sertifika)", href: "/#program-kategorileri" },
        ],
      },
    ],
  },
  {
    id: "work-travel",
    title: "WORK & TRAVEL",
    href: "/#program-kategorileri",
    blurb: "Sezonluk kültür ve çalışma programları",
    columns: [
      {
        heading: "Programlar",
        links: [
          { label: "Work & Travel USA", href: navBase("work-travel", "abd") },
          { label: "Güney Yarımküre sezonları", href: navBase("work-travel", "guney") },
        ],
      },
      {
        heading: "Hızlı link",
        links: [{ label: "İletişim & süreç", href: "/#site-footer" }],
      },
    ],
  },
];
