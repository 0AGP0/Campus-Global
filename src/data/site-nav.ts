import {
  dilOkuluUlkeMegaNav,
  universiteUlke,
  yuksekLisansUlkeMegaNav,
} from "@/data/home-ia";

export type NavSubLink = { label: string; href: string; desc?: string };
export type NavColumn = { heading: string; links: NavSubLink[] };

export type MegaNavItem = {
  id: string;
  title: string;
  href: string;
  columns: NavColumn[];
  blurb?: string;
};

const u = (slugs: string[]) => "/" + slugs.join("/");

export const navBase = (segment: string, page: string) => u([segment, page]);

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

export const dilUlkeler: NavSubLink[] = dilOkuluUlkeMegaNav.map((ülke) => ({
  label: `${ülke} dil okulu`,
  href: navBase("dil-okullari", slugify(ülke)),
  desc: `Yurtdışında ${ülke} dil okulları`,
}));

type UniExtra = { ulke: string; slug: string; ozet: string };
/** Ana sayfadaki kartlarda olmayan üniversite rehberleri */
const uniNavEk: UniExtra[] = [
  { ulke: "Amerika", slug: "amerika", ozet: "SAT, ACT ve bölüm eşikleri özeti." },
  { ulke: "Avustralya", slug: "avustralya-uni", ozet: "Ses ve yüksek lisans bağlantılı lisans seçenekleri." },
  { ulke: "Kanada", slug: "kanada-uni", ozet: "Dil kanıtı pathway ve kolej transfer hatları." },
  { ulke: "Çekya", slug: "cekya-uni", ozet: "Prag ve Brno çevrimi yaşam maliyeti notları." },
  { ulke: "Fransa", slug: "fransa-uni", ozet: "Campus France ve sınav gereksinimleri." },
  { ulke: "Güney Kore", slug: "guney-kore-uni", ozet: "Kampüs yaşamı ve burs kulvarları." },
  { ulke: "İrlanda", slug: "irlanda-uni", ozet: "Two-Tier ve foundation senaryoları." },
  { ulke: "İspanya", slug: "ispanya-uni", ozet: "Selectividad/PCE ve dil hazırlık çizelgesi." },
  { ulke: "Letonya", slug: "letonya-uni", ozet: "İngilizce program seçimi ve yaşam bandı." },
  { ulke: "Litvanya", slug: "litvanya-uni", ozet: "Uygun yaşam ile Avrupa merkezi." },
  { ulke: "Rusya", slug: "rusya-uni", ozet: "Uygun program seçimi ve güncel gereklilikler." },
  { ulke: "Ukrayna", slug: "ukrayna-uni", ozet: "Güncel program ve akademik uyum süreci." },
];

const uniByKartlar: NavSubLink[] = universiteUlke.map((x) => ({
  label: `${x.ulke}'da üniversite`,
  href: navBase("universite", x.slug),
  desc: x.ozet,
}));

const uniByEkstra: NavSubLink[] = uniNavEk.map((x) => ({
  label: `${x.ulke}'da üniversite`,
  href: navBase("universite", x.slug),
  desc: x.ozet,
}));

export const uniTumUlkeler: NavSubLink[] = [...uniByKartlar, ...uniByEkstra];

export const ylUlkeler: NavSubLink[] = yuksekLisansUlkeMegaNav.map((ülke) => ({
  label: ülke === "ABD" ? "ABD’de yüksek lisans" : `${ülke}'da yüksek lisans`,
  href: navBase("yuksek-lisans", slugify(ülke)),
  desc: `${ülke} program ve başvuru notları`,
}));

/** Sertifika hub — destinasyon vitrinleri (mega menü ile uyumlu) */
export const sertifikaUlkeler: NavSubLink[] = [
  { label: "Avustralya sertifika", href: navBase("sertifika", "avustralya"), desc: "VET ve mesleki sertifika hatları" },
  { label: "Amerika sertifika", href: navBase("sertifika", "amerika"), desc: "Community college ve sertifika programları" },
  { label: "İngiltere sertifika", href: navBase("sertifika", "ingiltere"), desc: "Kısa süreli meslek ve diploma pathway" },
  { label: "İrlanda sertifika", href: navBase("sertifika", "irlanda"), desc: "Çalışma hakkı odaklı seçenekler" },
  { label: "İtalya sertifika", href: navBase("sertifika", "italya"), desc: "Tasarım ve teknik alan vitrinleri" },
  { label: "Kanada sertifika", href: navBase("sertifika", "kanada"), desc: "College ve PGWP bağlantılı rotalar" },
];

/** Sol şerit: ilk 4 ana başlık (elt.com.tr sırasına yakın) */
export const megaNavRowLeft: MegaNavItem[] = [
  {
    id: "dil-okullari",
    title: "DİL OKULLARI",
    href: navBase("dil-okullari", "hub"),
    blurb: "Yurtdışında akredite dil okulları ve kurs seçimi",
    columns: [
      {
        heading: "Ülkeler",
        links: dilUlkeler,
      },
      {
        heading: "Eğitim programları",
        links: [
          { label: "Genel İngilizce kursları", href: navBase("dil-okullari", "genel-ingilizce") },
          { label: "Akademik hazırlık", href: navBase("dil-okullari", "akademik-yil") },
          { label: "İş ve meslek İngilizcesi", href: navBase("dil-okullari", "is-ingilizcesi") },
          {
            label: "Öğretmen gelişimi (CELTA benzeri)",
            href: navBase("dil-okullari", "ogretmen-egitimi"),
          },
          { label: "IELTS hazırlık programı", href: navBase("dil-okullari", "ielts-kurs") },
          { label: "TOEFL iBT hazırlık", href: navBase("dil-okullari", "toefl-kurs") },
          { label: "Almanca üniversite dil sınavları (DSH/TestDaF)", href: navBase("dil-okullari", "dsh-testdaf") },
          { label: "Telc sınavına hazırlık özeti", href: navBase("dil-okullari", "telc-hazirlik") },
          { label: "Yoğun kısa süre paketleri", href: navBase("dil-okullari", "yogun-genel") },
          { label: "Birebir ve mini grup", href: navBase("dil-okullari", "bire-bir") },
        ],
      },
      {
        heading: "Rehber & bilgi bankası",
        links: [
          {
            label: "Neden danışmanlık desteği?",
            href: navBase("dil-okullari", "danismanlik-destegi"),
          },
          { label: "Konaklama seçenekleri", href: navBase("dil-okullari", "konaklama-rehberi") },
          { label: "Yurtdışı üniversite hazırlık", href: navBase("dil-okullari", "universiteye-hazirlik") },
          { label: "Dil okulu süresini planlamak", href: navBase("dil-okullari", "sure-planlama") },
          {
            label: "Doğru okul seçimi için kontrol listesi",
            href: navBase("dil-okullari", "okul-secimi"),
          },
          { label: "İngiltere şehir notları", href: navBase("dil-okullari", "ingiltere-sehir") },
          { label: "Malta dil eğitimi avantajları", href: navBase("dil-okullari", "malta-avantaj") },
          { label: "Giden öğrenciler: dil okulu", href: navBase("topluluk", "referanslar-dil") },
        ],
      },
    ],
  },
  {
    id: "universite",
    title: "ÜNİVERSİTE",
    href: navBase("universite", "hub"),
    blurb: "Yurtdışında lisans başvuru rehberi ve seçili ülkeler",
    columns: [
      {
        heading: "Ülkeler",
        links: uniTumUlkeler,
      },
      {
        heading: "Bilgi bankası",
        links: [
          { label: "İtalya TOLC & IMAT notları", href: navBase("universite", "italya-sinavlar-genel") },
          { label: "İtalyada DSU bursu özeti", href: navBase("universite", "italya-dsu-ozet") },
          { label: "SAT sınav özeti", href: navBase("universite", "sat-ozet") },
          { label: "ACT sınav özeti", href: navBase("universite", "act-ozet") },
          { label: "AP kurs seçimi özeti", href: navBase("universite", "ap-ozet") },
          {
            label: "Almanya NC puan ve hazırlık",
            href: navBase("universite", "almanya-nc-puan"),
          },
          { label: "IB diploması ve denklik", href: navBase("universite", "ib-diploma-notu") },
          {
            label: "Mavi diploma (IB) sık sorulanlar",
            href: navBase("universite", "mavi-diploma-faq"),
          },
          {
            label: "Giden öğrenciler: üniversite",
            href: navBase("topluluk", "referanslar-uni"),
          },
        ],
      },
      {
        heading: "Öne çıkan içerikler",
        links: [
          {
            label: "İngiltere foundation seçimi",
            href: navBase("universite", "foundation-ingiltere"),
          },
          { label: "YÖK denkliği ve tanınmış kurumlar", href: navBase("universite", "yok-denklik") },
          { label: "Hollanda araştırma vs UAS", href: navBase("universite", "hollanda-uni-turleri") },
          {
            label: "Macaristan’da İngilizce hazırlık",
            href: navBase("universite", "macaristan-ingilizce-hazirlik"),
          },
          {
            label: "Varşova ve Polonyada konaklama bandı",
            href: navBase("universite", "polonya-konaklama"),
          },
          {
            label: "Prag’da okumaya başlangıç",
            href: navBase("universite", "prag-baslangic"),
          },
          {
            label: "Lisans tamamlama (Avrupa transfer)",
            href: navBase("universite", "lisans-tamamlama-avrupa"),
          },
          {
            label: "Tıp odaklı lisans araştırması",
            href: navBase("universite", "avrupada-tip-lisans"),
          },
        ],
      },
      {
        heading: "Duyurular & başvuru notları",
        links: [
          {
            label: "Yeni akademik yıl için erken başvuru",
            href: navBase("universite", "akis-yeni-yil"),
          },
          {
            label: "Türkiye’den Almanya kamu üniversitesine geçiş",
            href: navBase("universite", "tr-lise-alman-uni"),
          },
          {
            label: "Türkiye’de sınav yerine yurtdışı alternatifleri",
            href: navBase("universite", "turkiye-uni-yurtdisi"),
          },
          { label: "Profesyonel danışmanlık kapsamı", href: navBase("universite", "danismanlik-kapsam") },
          { label: "Lisans başvuru yol haritası", href: navBase("universite", "basvuru") },
          { label: "Belgeler ve zaman çizelgesi", href: navBase("universite", "belgeler") },
          { label: "Burs ve yaşam bandı planı", href: navBase("universite", "burs") },
        ],
      },
    ],
  },
  {
    id: "yuksek-lisans",
    title: "YÜKSEK LİSANS",
    href: navBase("yuksek-lisans", "hub"),
    blurb: "MSc · MA · MBA ve doktora başvuru desteği",
    columns: [
      {
        heading: "Ülkeler",
        links: ylUlkeler,
      },
      {
        heading: "Program & sınav özeti",
        links: [
          { label: "GRE sınav rehberi", href: navBase("yuksek-lisans", "gre-rehber") },
          { label: "GMAT sınav rehberi", href: navBase("yuksek-lisans", "gmat-rehber") },
          { label: "MSc ve teknik alanlar", href: navBase("yuksek-lisans", "msc") },
          { label: "MBA başvuru vitrini", href: navBase("yuksek-lisans", "mba") },
          {
            label: "Kabul gereksinimleri özeti",
            href: navBase("yuksek-lisans", "kabul-genel"),
          },
          {
            label: "Dil hazırlık programları",
            href: navBase("yuksek-lisans", "dil-hazirlik"),
          },
          {
            label: "ABD başvuru adımları",
            href: navBase("yuksek-lisans", "abd-basvuru-adimlari"),
          },
          { label: "Giden öğrenciler: yüksek lisans", href: navBase("topluluk", "referanslar-yl") },
        ],
      },
      {
        heading: "Ücret & süreç notları",
        links: [
          {
            label: "Yüksek lisans için bütçe kalemleri",
            href: navBase("yuksek-lisans", "butce-kalemleri"),
          },
          {
            label: "Mezuniyet sonrası çalışma izni özeti",
            href: navBase("yuksek-lisans", "post-study-calisma"),
          },
          {
            label: "Neden Campus Global?",
            href: navBase("yuksek-lisans", "danismanlik-avantaji"),
          },
        ],
      },
      {
        heading: "Gündem yazıları",
        links: [
          {
            label: "Yurtdışında master’a başlarken",
            href: navBase("yuksek-lisans", "master-karar-notu"),
          },
          {
            label: "Almanya’da hazırlık okulu hatırlatması",
            href: navBase("yuksek-lisans", "hazirlik-okulu-almanya"),
          },
          { label: "Profesyonel danışmanlık kapsamı", href: navBase("yuksek-lisans", "destek-ne-iceriyor") },
        ],
      },
    ],
  },
  {
    id: "work-study",
    title: "WORK & STUDY",
    href: navBase("work-study", "overview"),
    blurb: "Eğitim + yasal çalışma hakkı bir arada modeller",
    columns: [
      {
        heading: "Ülkeler ve modeller",
        links: [
          { label: "Avustralya", href: navBase("work-study", "avustralya") },
          { label: "İrlanda", href: navBase("work-study", "irlanda") },
          { label: "Kanada", href: navBase("work-study", "kanada") },
          { label: "Malta", href: navBase("work-study", "malta") },
          { label: "Dubai", href: navBase("work-study", "dubai") },
          { label: "Kurum bazlı programa giriş", href: navBase("work-study", "kurum") },
          { label: "Mesleki İngilizce + iş deneyimi", href: navBase("work-study", "mesleki") },
        ],
      },
      {
        heading: "Rehber",
        links: [
          { label: "Work & Study nedir, nerelerde uygundur?", href: navBase("work-study", "overview") },
          {
            label: "Avustralya mı İrlanda mı — kısa karşılaştırma",
            href: navBase("work-study", "avustralya-irlanda-karsilastirma"),
          },
          { label: "Tipik başvuru şartları", href: navBase("work-study", "basvuru-sartlari") },
          { label: "Neden Avustralya vitrini?", href: navBase("work-study", "neden-avustralya-panel") },
          { label: "Çalışma sonrası vize özeti", href: navBase("work-study", "post-study") },
        ],
      },
    ],
  },
];

/** Sağ şerit: logo sonrası dört ana başlık */
export const megaNavRowRight: MegaNavItem[] = [
  {
    id: "lise",
    title: "YURTDIŞINDA LİSE",
    href: navBase("lise", "overview"),
    blurb: "IB · A-Level · AP ve yatılı okul seçenekleri",
    columns: [
      {
        heading: "Ülkeler",
        links: [
          { label: "Almanya’da lise", href: navBase("lise", "almanya") },
          { label: "Amerika’da lise", href: navBase("lise", "abd") },
          { label: "İngiltere’de lise", href: navBase("lise", "ingiltere") },
          { label: "İrlanda’da lise", href: navBase("lise", "irlanda") },
          { label: "İsviçre’de lise", href: navBase("lise", "isvicre") },
          { label: "Kanada’da lise", href: navBase("lise", "kanada") },
        ],
      },
      {
        heading: "Program türü",
        links: [
          { label: "IB & A-Level vitrini", href: navBase("lise", "ib-a-level") },
          { label: "AP ve Kuzey Amerika lise", href: navBase("lise", "ap") },
          { label: "Yatılı kurum seçimi", href: navBase("lise", "yatili") },
        ],
      },
      {
        heading: "Rehber",
        links: [
          { label: "Yurtdışında lise nasıl seçilir?", href: navBase("lise", "kurum-secimi") },
          { label: "Danışman seçerken dikkat edilecekler", href: navBase("lise", "danisman-secimi") },
        ],
      },
    ],
  },
  {
    id: "yaz-okulu",
    title: "YAZ OKULU",
    href: navBase("yaz-okulu", "dil-genel"),
    blurb: "Dil kampı ve akademik kampüs yaz programları",
    columns: [
      {
        heading: "Ülkeler",
        links: [
          { label: "Almanya yaz okulu", href: navBase("yaz-okulu", "almanya") },
          { label: "Amerika yaz kampı", href: navBase("yaz-okulu", "abd") },
          { label: "İngiltere yaz okulu", href: navBase("yaz-okulu", "ingiltere") },
          { label: "İrlanda yaz okulu", href: navBase("yaz-okulu", "irlanda") },
          { label: "Malta yaz programı", href: navBase("yaz-okulu", "malta") },
          { label: "Kanada yaz seçenekleri", href: navBase("yaz-okulu", "kanada") },
          { label: "Fransa yaz kampı", href: navBase("yaz-okulu", "fransa") },
          { label: "İspanya yaz programı", href: navBase("yaz-okulu", "ispanya") },
        ],
      },
      {
        heading: "Program odakları",
        links: [
          { label: "Genel dil yazı", href: navBase("yaz-okulu", "dil-genel") },
          { label: "Sınava özel yaz bloğu", href: navBase("yaz-okulu", "sinav") },
          {
            label: "Üniversite kampüsü yaz akademisi",
            href: navBase("yaz-okulu", "kampus"),
          },
        ],
      },
      {
        heading: "Operasyon bilgisi",
        links: [
          { label: "Grup çıkışlı yaz kampıları", href: navBase("yaz-okulu", "grup-akisi") },
          { label: "Konaklama ve kampüs yakınlığı", href: navBase("yaz-okulu", "konaklama") },
          { label: "Günlük aktiviteler ve geziler", href: navBase("yaz-okulu", "etkinlikler") },
          { label: "Havalimanı transfer planı", href: navBase("yaz-okulu", "transfer") },
          { label: "Güvenlik ve sigorta notları", href: navBase("yaz-okulu", "guvenlik") },
          { label: "Kalite ve seçilen kurumlar", href: navBase("yaz-okulu", "kalite-standarti") },
        ],
      },
    ],
  },
  {
    id: "sertifika",
    title: "SERTİFİKA",
    href: navBase("sertifika", "hub"),
    blurb: "Kısa süreli sertifika ve meslek programları",
    columns: [
      {
        heading: "Destinasyon vitrinleri",
        links: sertifikaUlkeler,
      },
      {
        heading: "Program rehberi",
        links: [
          { label: "Sertifika programı nedir?", href: navBase("sertifika", "nedir") },
          {
            label: "Kimler katılmalı?",
            href: navBase("sertifika", "katilim-profili"),
          },
          {
            label: "Dil + meslek bileşik parçalar",
            href: navBase("sertifika", "dil-meslek"),
          },
          { label: "Hızlı dönüş kariyer seçenekleri", href: navBase("sertifika", "kisa-program") },
          { label: "Giden öğrencilerden notlar", href: navBase("sertifika", "topluluk-sertifika") },
        ],
      },
    ],
  },
  {
    id: "work-travel",
    title: "WORK & TRAVEL",
    href: navBase("work-travel", "overview"),
    blurb: "Kültürel değişim ve sezonluk iş deneyimi",
    columns: [
      {
        heading: "Genel başlıklar",
        links: [
          { label: "Work & Travel nedir?", href: navBase("work-travel", "overview") },
          {
            label: "Program şartları ve yaş aralığı",
            href: navBase("work-travel", "sartlar"),
          },
          { label: "Tipik tarih çizelgesi", href: navBase("work-travel", "takvim") },
          {
            label: "Erken başvuru neden kritik?",
            href: navBase("work-travel", "erken-basvuru"),
          },
          { label: "Örnek iş alanları", href: navBase("work-travel", "is-alanlari") },
          {
            label: "Ücret paketi ve dahil olanlar özeti",
            href: navBase("work-travel", "butce-genel"),
          },
          {
            label: "Pasaport ve SEVIS notları",
            href: navBase("work-travel", "pasaport-sevis"),
          },
        ],
      },
      {
        heading: "Sık sorulanlar",
        links: [
          { label: "Gelir beklentisi ve saat çizelgesi", href: navBase("work-travel", "sss-gelir") },
          { label: "İkinci iş imkânı", href: navBase("work-travel", "sss-ikinci-is") },
          { label: "İngilizce gelişimi", href: navBase("work-travel", "sss-ingilizce") },
          {
            label: "Yer seçimi nasıl yapılır?",
            href: navBase("work-travel", "sss-self-placement"),
          },
          { label: "J-1 vizesi özeti", href: navBase("work-travel", "j1-vize") },
        ],
      },
      {
        heading: "Program rotaları",
        links: [
          { label: "ABD klasik yaz rotası", href: navBase("work-travel", "abd") },
          {
            label: "Güney yarı küre seçenekleri",
            href: navBase("work-travel", "guney"),
          },
        ],
      },
    ],
  },
];

/** Mobil menü ve statik route üretimi için birleşik sıra */
export const megaNav: MegaNavItem[] = [...megaNavRowLeft, ...megaNavRowRight];

/** İlgili hub.astro dosyalarıyla tanımlı yollar — `[...slug]` burada route üretmez */
export const STATIC_HUB_SLUGS = new Set<string>([
  "dil-okullari/hub",
  "universite/hub",
  "yuksek-lisans/hub",
  "sertifika/hub",
]);

/** Ayrı `pages/*.astro` dosyası olan yollar — dinamik slug listesinden çıkarılır */
export const RESERVED_NON_ARTICLE_SLUGS = new Set<string>([...STATIC_HUB_SLUGS, "iletisim"]);

/** `[...slug]` breadcrumb: ilk path parçası → mega menü başlığı ve hub bağlantısı */
export function getMegaNavSegmentMeta(
  segment: string,
): { label: string; hubHref: string } | undefined {
  const item = megaNav.find((m) => m.id === segment);
  if (!item) return undefined;
  const label = item.title
    .toLocaleLowerCase("tr-TR")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toLocaleUpperCase("tr-TR") + w.slice(1))
    .join(" ");
  return { label, hubHref: item.href };
}
