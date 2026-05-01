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
    blurb: "Yurtdışında dil okulu: yoğun İngilizce, IELTS/TOEFL ve konaklamalı paketler",
    image: img("cg-dil-kurs-2024"),
  },
  {
    id: "universite",
    title: "Üniversite",
    href: "#universite",
    blurb: "Yurtdışında üniversite danışmanlığı, lisans başvuru takvimi ve program eşlemesi",
    image: img("cg-universite-kampus-2024"),
  },
  {
    id: "yuksek-lisans",
    title: "Yüksek lisans",
    href: "#yuksek-lisans",
    blurb: "MSc, MA ve MBA için hedef ülke, essay ve sınav planı tek dosyada",
    image: img("cg-msc-mba-2024"),
  },
  {
    id: "diploma",
    title: "Diploma & sertifika",
    href: "/sertifika/hub",
    blurb: "Mesleki diploma ve kısa sertifika programlarıyla kariyerinizi güçlendirin",
    image: img("cg-diploma-sertifika-2024"),
  },
  {
    id: "lise",
    title: "Lise",
    href: "#program-kategorileri",
    blurb: "IB, A-Level ve yurtdışında yatılı lise seçenekleri danışmanlığı",
    image: img("cg-lise-okul-2024"),
  },
  {
    id: "teach-usa",
    title: "Teach in USA",
    href: "#program-kategorileri",
    blurb: "Amerika Birleşik Devletleri’nde öğretim ve kültürel değişim programları",
    image: img("cg-teach-usa-2024"),
  },
];

/** Ana sayfa “Popüler destinasyonlar” çipleri */
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

/** Mega menü dil okulu “Ülkeler” — daha geniş destinasyon listesi */
export const dilOkuluUlkeMegaNav = [
  "İngiltere",
  "İskoçya",
  "İrlanda",
  "Malta",
  "Kanada",
  "Amerika",
  "Avustralya",
  "Yeni Zelanda",
  "Almanya",
  "Hollanda",
  "Fransa",
  "İspanya",
  "İtalya",
  "İsviçre",
  "Polonya",
  "Çekya",
  "Avusturya",
  "Belçika",
  "Macaristan",
  "Dubai",
  "Güney Afrika",
  "Güney Kore",
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
    bolgeNot: "Londra, Manchester ve öğrenci şehirlerinde akredite dil okulları",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Yurtdışında dil eğitimi bütçesinde kurs saati ve konaklama (aile, yurt, stüdyo) ayrı satırlardadır. Başvuru, materyal ve uçuş kalemleri görüşmede güncel kur ve kampanyayla yazılır; aşağıdaki aralık örnektir.",
    maddeler: ["Şehir ve okul aynı kursu farklı fiyatlar", "Yaz yoğunluğu / dönem içi fiyat ayrımı"],
  },
  {
    ulke: "Malta",
    bolgeNot: "Sliema ve St Julian’s çevresi; dil + konaklama paketleri yaygın",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Konaklama ve okul mesafesi haftalık bandı değiştirir. Grup açılışları ve erken kayıt dönemleri fiyatı etkiler; kesin teklif seçilen okul ve tarihle netleşir.",
    maddeler: ["Uçuş ve sigorta ayrı kalem", "Mini grup / standart sınıf farkı"],
  },
  {
    ulke: "Dubai",
    bolgeNot: "Premium segment; kontenjan ve dönem erken dolabilir",
    aralik: "₺ — ₺ / hafta",
    birim: "hafta",
    not: "Kampüs tipi ve oda seçimi maliyeti belirler. Eğitim vizesi ve okul sözleşmesiyle bağlı hizmetler kalem kalem ayrılır; kampanyalı dönemler sınırlı kontenjanlıdır.",
    maddeler: ["Sezonluk talep fiyatı etkiler", "Vize ve sağlık sigortası plana dahil edilir"],
  },
  {
    ulke: "Almanya",
    bolgeNot: "Berlin, Münih ve diğer şehirler — dil / pathway sonrası lisans hazırlığı",
    aralik: "₺ — ₺ / ay",
    birim: "ay",
    not: "Aylık maliyet dil kursu veya pathway programına göre hesaplanır. Blokaj hesabı, depozito ve yaşam gideri (konak, ulaşım, yemek) ayrı bantlarda; kamu üniversitesi harç avantajı profilinize göre ayrıca değerlendirilir.",
    maddeler: ["Bloke tutarı eyalet ve okula göre değişir", "Lisansa geçiş senaryosu için ayrı tablo"],
  },
];

/** Ana sayfa YL kart bandı için kısaltılmış liste */
export const yuksekLisansUlke = ["ABD", "İngiltere", "Kanada", "Hollanda", "İrlanda", "Avustralya"];

/** Mega menü “Ülkeler” — yüksek lisans destinasyonları */
export const yuksekLisansUlkeMegaNav = [
  "Almanya",
  "ABD",
  "İngiltere",
  "Kanada",
  "Hollanda",
  "İrlanda",
  "Avustralya",
  "Fransa",
  "İtalya",
  "İspanya",
  "Polonya",
  "Çekya",
  "Macaristan",
  "Güney Kore",
  "Letonya",
  "Litvanya",
  "Rusya",
  "Ukrayna",
];

export const haberSpotlight = [
  {
    baslik: "Almanya’da üniversite: harç, blokaj ve Studienkolleg",
    kategori: "Üniversite",
    ozet: "Devlet üniversiteleri, İngilizce bölümler ve vize öncesi mali ispat adımlarını öğrenci profilinize göre özetliyoruz.",
    img: img("haber-berlin-1"),
  },
  {
    baslik: "IELTS hedef band nasıl üniversite eşiğiyle eşleşir?",
    kategori: "Sınav",
    ozet: "Bölüm ve ülkeye göre dil yeterliliği tablosu, tekrar tarihleri ve kurs + sınav paketini aynı planda değerlendirin.",
    img: img("haber-seul-1"),
  },
  {
    baslik: "QS ve THE yerine: doğru programı seçmek",
    kategori: "Üniversite",
    ozet: "Sıralama etiketlerinin ötesinde staj, mezun ağı ve bölüm gücünü yurtdışı eğitim hedefinizle nasıl dengelersiniz?",
    img: img("haber-siralama-1"),
  },
  {
    baslik: "Yurtdışında burs: erken başvuru ve portföy",
    kategori: "Burs",
    ozet: "Başvuru pencereleri, motivasyon mektubu ve akademik referansların burs değerlendirmesindeki rolü.",
    img: img("haber-burs-1"),
  },
];

export type FaqItem = { soru: string; cevap: string };

export const faqItems: FaqItem[] = [
  {
    soru: "Yurtdışında dil okulu fiyatları ülkeye göre neden farklı?",
    cevap:
      "Haftalık maliyeti kurs saati, konaklama tipi (aile, yurt, stüdyo), şehir ve sezon belirler. Campus Global’de bütçeyi kalem kalem açıp güncel kur ve kampanyayla netleştiriyoruz; nihai teklif okul onayı ve görüşmeyle kesinleşir.",
  },
  {
    soru: "Hangi ülke yurtdışı eğitim planım için daha uygun?",
    cevap:
      "Sınav durumunuz, akademik arka plan, bütçe ve kariyer hedefinize göre ülke shortlist’i çıkarıyoruz. Tek bir “ideal ülke” yerine, sizin için puanlanmış seçenekler ve her biri için giriş koşulları tabloda sunulur.",
  },
  {
    soru: "Ücretsiz veya düşük harçlı yurtdışı üniversite mümkün mü?",
    cevap:
      "Bazı Avrupa ülkelerinde kamu üniversiteleri düşük veya sembolik harçla lisans sunar; dil yeterliliği, yaşam maliyeti ve blokaj gibi kalemler toplam bütçeyi belirler. Uygunluk program ve vize koşullarıyla birlikte değerlendirilir.",
  },
  {
    soru: "Yurtdışı diploması için YÖK denkliği süreci nasıl işler?",
    cevap:
      "Üniversite ve programa göre istenen belgeler değişir. Resmi YÖK duyuruları ve güncel denklik listeleriyle süreci eşzamanlı takip eder; eksik evrak ve çeviri adımlarını baştan planlarız.",
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
  { label: "İngiltere’de dil okulu fiyatları", href: "#fiyatlar" },
  { label: "Almanya’da üniversite başvurusu", href: "#universite" },
  { label: "IELTS sınav hazırlık danışmanlığı", href: "#sinavlar" },
  { label: "ABD’de yüksek lisans başvurusu", href: "#yuksek-lisans" },
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
  email: "info@campusglobal.com",
  mesai: "Hafta içi 09:00 — 18:30",
};
