/** Ana sayfa metinleri — tek kaynak */

export type ProgramCategory = {
  id: string;
  title: string;
  href: string;
  blurb: string;
  image: string;
};

/** Harici Unsplash hotlink’leri bazı ağlarda bloklanıyor; Picsum seed URL’leri stabil ve geniş erişimli. */
const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const programCategories: ProgramCategory[] = [
  {
    id: "dil-okullari",
    title: "Dil okulları",
    href: "#dil-okullari",
    blurb: "Yoğun kurs, sınav hazırlığı ve konaklamalı paketler",
    image: img("cg-dil-kurs-2024"),
  },
  {
    id: "universite",
    title: "Üniversite",
    href: "#universite",
    blurb: "Lisans başvuru takvimi ve uygun programa yönlendirme",
    image: img("cg-universite-kampus-2024"),
  },
  {
    id: "yuksek-lisans",
    title: "Yüksek lisans",
    href: "#yuksek-lisans",
    blurb: "MSc / MBA seçimi ve akademik uyum planı",
    image: img("cg-msc-mba-2024"),
  },
  {
    id: "diploma",
    title: "Diploma & sertifika",
    href: "#program-kategorileri",
    blurb: "Kısa süreli meslek ve uzmanlık programları",
    image: img("cg-diploma-sertifika-2024"),
  },
  {
    id: "lise",
    title: "Lise",
    href: "#program-kategorileri",
    blurb: "IB, A-Level ve yatılı okul seçenekleri",
    image: img("cg-lise-okul-2024"),
  },
  {
    id: "teach-usa",
    title: "Teach in USA",
    href: "#program-kategorileri",
    blurb: "Kültürel değişim ve öğretim odaklı programlar",
    image: img("cg-teach-usa-2024"),
  },
];

export const dilOkuluUlke = [
  "Amerika",
  "İngiltere",
  "Malta",
  "İrlanda",
  "Kanada",
  "Avustralya",
  "Dubai",
  "Güney Afrika",
  "Almanya",
  "Fransa",
  "İtalya",
  "İspanya",
];

export type UniversiteUlkeItem = {
  ulke: string;
  /** URL parçası — `site-nav` ve ana sayfa kartı ile aynı */
  slug: string;
  /** Mega menü / kısa özet */
  ozet: string;
  /** Kart üst metni */
  not: string;
  madde: string[];
};

export const universiteUlke: UniversiteUlkeItem[] = [
  {
    ulke: "Almanya",
    slug: "almanya",
    ozet: "Harç, blokaj ve şehir seçimi tek ekranda.",
    not: "Devlet üniversiteleri ve İngilizce bölümler; Studienkolleg veya doğrudan yıl 1 senaryoları için bütçe, belge ve dil yeterliliği ayrı ayrı tablolaştırılır.",
    madde: ["Studienkolleg / doğrudan giriş ayrımı", "Blokaj hesabı ve vize takvimi", "DSH · TestDaF ve hazırlık bandı"],
  },
  {
    ulke: "İngiltere",
    slug: "ingiltere",
    ozet: "UCAS, pathway ve conditional offer akışı.",
    not: "Ocak başvuru penceresi ve firm choice sıralaması; foundation veya doğrudan lisans için farklı kanıt setleri ve referans hattı birlikte planlanır.",
    madde: ["UCAS takvimi ve firm choice", "Personal statement turları", "IELTS / bölüm eşikleri"],
  },
  {
    ulke: "İtalya",
    slug: "italya",
    ozet: "IMAT, TOLC ve motivasyon hattı.",
    not: "Bölüm bazlı sınavlar ve İtalyanca yeterlilik; ön kayıt ile vize randevuları şehir ve okula göre farklı hızda ilerir — shortlist erken netleşmeli.",
    madde: ["Sınav türü ve tarih uyumu", "Ön kayıt ve apostil süreci", "Şehir-okul eşlemesi"],
  },
  {
    ulke: "Polonya",
    slug: "polonya",
    ozet: "İngilizce lisanslar, erişilebilir yaşam.",
    not: "Varşova, Krakow ve Gdansk çevresinde yoğunlaşan İngilizce programlar; başvuru dosyası ve apostil adımları Türkiye’den uçtan uca takip edilir.",
    madde: ["İngilizce program yoğunluğu", "Yaşam maliyeti bandı", "Dosya ve apostil hattı"],
  },
  {
    ulke: "Hollanda",
    slug: "hollanda",
    ozet: "Studielink ve numerus fixus.",
    not: "Research üniversiteleri ile UAS ayrımı; staj kredisi ve mezuniyet sonrası Orientation Year seçenekleri profilinize göre tartılır.",
    madde: ["Studielink akışı", "Research / UAS seçimi", "Staj ve kariyer ağı"],
  },
  {
    ulke: "Macaristan",
    slug: "macaristan",
    ozet: "Tıp ve mühendislikte güçlü talep.",
    not: "Çok dilli programlar ve rekabetçi sınav takvimleri; yurt ve kampüs yerleşimi için erken rezervasyon ve bütçe bandı birlikte ele alınır.",
    madde: ["Tıp / mühendislik yoğunluğu", "Sınav ve başvuru takvimi", "Konaklama erken plan"],
  },
];

export type SinavKarti = {
  kod: string;
  /** Kart üstü kısa rol */
  rol: string;
  /** Ana paragraf */
  aciklama: string;
  /** 2 maddelik pratik vurgu */
  maddeler: [string, string];
};

export const sinavlar: SinavKarti[] = [
  {
    kod: "IELTS",
    rol: "İngilizce yeterlilik · Academic / General",
    aciklama:
      "Hedef band ve modül, seçeceğiniz programlarla aynı tabloda; prova, yazılı-oral dönüt ve yeni sınav giriş tarihleri tek hatta planlanır. Gerekirse kurs + sınav paketi üniversite eşiğiyle birleştirilir.",
    maddeler: ["Bölüme ve ülkeye göre eşik notu", "Geri bildirim turu, boşluk kapanınca tekrar"],
  },
  {
    kod: "TOEFL iBT",
    rol: "Kuzey Amerika ve dijital deneme odaklı",
    aciklama:
      "Okulların istediği minimum skor ve bölüme özel eşikler; deneme, zaman yönetimi ve speaking/writing taslakları. İngilizce odaklı yüksek lisans başvurularıyla aynı evrak setinde ilerler.",
    maddeler: ["Bölüm bazlı eşleştirme", "Deneme + skor hedefi takibi"],
  },
  {
    kod: "SAT",
    rol: "Lisans (özellikle ABD) puan hedefi",
    aciklama:
      "Test opsiyonları, superscore okuyan okullar ve bölüm rekabine göre gerçekçi hedef; tekrar ve başvuru takvimi (early / regular) birlikte yazılır. Lise sınıfınız ve ders yüküyle uyumlu seans planı.",
    maddeler: ["Okul listesi + hedef puan", "Tarih: ilk giriş / tekrar pencereleri"],
  },
  {
    kod: "GRE / GMAT",
    rol: "Yüksek lisans & MBA için profil puanı",
    aciklama:
      "Programın baktığı ağırlık (Kuant / verbal / AWA) ve başvuru dilindeki hikâyeniz; deneme, zayıf alan çalışması ve başvuru son tarihine göre tersine doğru takvim. Burs / asistanlık sorusu açıksa aynı görüşmede ele alınır.",
    maddeler: ["Programa göre hangi test", "Hedef puan + başvuru öncesi son prova günü"],
  },
];

/** Ana sayfa fiyat bantları — sayı aralıkları plaseholder; nihai teklif görüşmede */
export type FiyatBanti = {
  ulke: string;
  /** Nokta bölge / ilgi alanı; kart alt satır */
  bolgeNot: string;
  aralik: string;
  birim: "hafta" | "ay";
  not: string;
  maddeler: [string, string];
};

export const fiyatKampanya: FiyatBanti[] = [
  {
    ulke: "İngiltere",
    bolgeNot: "LON · Manchester · dil merkezleri, öğrenci odaklı şehirler",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Kurs (saat / hafta) ve konaklama tipi ayrı kalem: aile, yurt veya stüdyo. Başvuru, materyal ve seyahat kalemleri tabloda satır satır açık.",
    maddeler: ["Şehir seçimi aynı kursu farklı fiyatlar", "Sezon: yaz / dönem içi ayrı band"],
  },
  {
    ulke: "Malta",
    bolgeNot: "Sliema · St Julian’s — paket + konaklama pratikte sık tercih",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Dil + konaklama birlikte fiyatlandırılan paketler; yoğunluk ve bina mesafesine göre fark. Toplu açılış tarihlerinde dönem fiyatı oynayabilir.",
    maddeler: ["Havayolu ayrı kaleme yazılır", "Mini grup / standart sınıf farkı"],
  },
  {
    ulke: "Dubai",
    bolgeNot: "Premium okullar, erken kapanan kontenjan dönemleri",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Segment ve kampüs türüne göre bant kırar; aile, tek veya oda tipi, okul sözleşmesi birlikte okunur. Avantaj dönemleri sınırlı koltukla gelir.",
    maddeler: ["Yaz açlığı vs dönem ortası fiyat ayrımı", "Eğitim vizesi paketle ilişkili hizmetler ayrı"],
  },
  {
    ulke: "Almanya",
    bolgeNot: "Büyük şehirler: Berlin · Munich · bölgeye göre yurt/ayrık ev",
    aralik: "₺ — ₺ / ay",
    birim: "ay",
    not: "Aylık ifade: dil / pathway veya lisansa hazırlık. Bloke, depozit ve aylık canlı gider tablosu; harç 0’e yakın hatlar için ayrı satırlar.",
    maddeler: ["Bloke tutarı okul+ eyalete göre fark", "Aylık: konak, ulaşım, yemek bandı"],
  },
];

export const yuksekLisansUlke = ["ABD", "İngiltere", "Kanada", "Hollanda", "İrlanda", "Avustralya"];

export const haberSpotlight = [
  {
    baslik: "Berlin şehir rehberi",
    kategori: "Şehir",
    ozet: "Konaklama bölgeleri, ulaşım kartları ve günlük bütçe notları.",
    img: img("haber-berlin-1"),
  },
  {
    baslik: "Seul şehir rehberi",
    kategori: "Asya",
    ozet: "Kampüs çevresi, öğrenci ofisleri ve vize süreleri hakkında özet.",
    img: img("haber-seul-1"),
  },
  {
    baslik: "Üniversite sıralamalarını okumak",
    kategori: "Üniversite",
    ozet: "Bölüm gücü, staj imkânı ve mezun ağını tabloyla birlikte değerlendirin.",
    img: img("haber-siralama-1"),
  },
  {
    baslik: "Yurtdışında burs kalemleri",
    kategori: "Burs",
    ozet: "Erken başvuru ve portfolyonun skorunu nasıl taşıdığına dair notlar.",
    img: img("haber-burs-1"),
  },
];

export type FaqItem = { soru: string; cevap: string };

export const faqItems: FaqItem[] = [
  {
    soru: "Dil okulu fiyatları ülkeye göre nasıl değişir?",
    cevap:
      "Konaklama ve kurs yoğunluğu haftalık bandı etkiler. Güncel bant için danışman görüşmesi önerilir.",
  },
  {
    soru: "Hangi ülke bana daha uygun?",
    cevap:
      "Bütçe, sınav durumu ve hedefiniz için kısa liste çıkarıyoruz; tek bir “doğru” ülke yerine uyum profili önceliklidir.",
  },
  {
    soru: "Ücretsiz veya düşük harçlı üniversite mümkün mü?",
    cevap:
      "Bazı Avrupa kamu üniversitelerinde harç politikaları uygundur; koşullar birlikte değerlendirilmelidir.",
  },
  {
    soru: "YÖK denkliği süreci nasıl işler?",
    cevap:
      "Program ve üniversiteye göre evrak seti değişir; resmi rehberle güncel listeyi senkron tutarız.",
  },
];

export function buildFaqPageJsonLd(siteUrl = "https://www.example.com/") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.soru,
      acceptedAnswer: { "@type": "Answer", text: f.cevap },
    })),
    url: siteUrl,
  };
}

export const preFooterPrograms = [
  { label: "Dil okulları", href: "#dil-okullari" },
  { label: "Üniversite", href: "#universite" },
  { label: "Yüksek lisans", href: "#yuksek-lisans" },
  { label: "Sınav hazırlık", href: "#sinavlar" },
  { label: "Fiyat rehberi", href: "#fiyatlar" },
];

export const preFooterPopuler = [
  { label: "İngiltere dil okulu", href: "#fiyatlar" },
  { label: "Almanya üniversite", href: "#universite" },
  { label: "IELTS danışmanlığı", href: "#sinavlar" },
  { label: "Yüksek lisans ABD", href: "#yuksek-lisans" },
];

export const preFooterSubeler = [
  { sehir: "İstanbul", ad: "Merkez" },
  { sehir: "Ankara", ad: "Çankaya" },
  { sehir: "İzmir", ad: "Alsancak" },
  { sehir: "Bursa", ad: "Nilüfer" },
  { sehir: "Antalya", ad: "Konyaaltı" },
  { sehir: "Adana", ad: "Seyhan" },
];

export const footerIletisim = {
  tel: "+90 (___) ___ __ __",
  email: "info@campusglobal.example.com",
  mesai: "Hafta içi 09:00 — 18:30",
};
