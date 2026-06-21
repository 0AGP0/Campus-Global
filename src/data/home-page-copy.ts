/**
 * Ana sayfa bölüm metinleri — `src/content/home/index.md` ile senkron tutulur.
 * HomeLanding.tsx bu dosyadan okur; içerik üreticisi MD’yi düzenler, geliştirici export/sync sonrası burayı günceller.
 */

export const homePageMeta = {
  layoutTitle:
    "Yurtdışı Eğitim Danışmanlığı | Dil Okulu, Üniversite ve Yüksek Lisans | Campus Global",
  layoutDescription:
    "Campus Global ile yurtdışında dil okulu, üniversite ve yüksek lisans danışmanlığı: IELTS, TOEFL, SAT ve GRE/GMAT planı, ülke rehberleri ve şeffaf başvuru süreci.",
};

export const homePageImages = {
  heroVisual:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=960&h=1180&q=82",
  heroVisualAlt:
    "Yurtdışında eğitim ve üniversite ortamında öğrenciler — Campus Global danışmanlık vitrin görseli",
  dilBand: "https://picsum.photos/seed/cg-dil-yurtdisi-2024/1400/1000",
  nedenCg: "https://picsum.photos/seed/cg-ayni-masada-net-karar-2024/1000/660",
  yuksekLisans: "https://picsum.photos/seed/cg-yuksek-lisans-kulvar-2024/1100/1200",
};

export const homeHero = {
  eyebrow: "Campus Global · yurtdışı eğitim danışmanlığı",
  titleLine1: "Yurtdışında eğitim",
  titleLine2: "profesyonel danışmanlık",
  lead:
    "Dil okulu ve yurtdışı üniversite başvurusundan yüksek lisans ve sınav planına (IELTS, TOEFL, SAT, GRE/GMAT) kadar tek merkezden, şeffaf süreç ve güncel ülke rehberleriyle Campus Global yanınızda.",
  tags: "Dil okulu · Lisans · Yüksek lisans · Kabul sınavları",
  ctaPrimary: { label: "Dil okulları hub", href: "/dil-okullari/hub" },
  ctaSecondary: { label: "İletişim", href: "/iletisim" },
};

export const homeProgramKategorileri = {
  eyebrow: "Programlar · Campus Global",
  titleLine1: "Yurtdışı eğitimde",
  titleLine2: "hangi kulvar size uygun?",
  lead:
    "Dil okulları, üniversite ve yüksek lisans seçeneklerini kartlardan seçin; her kart ilgili hub ve rehber sayfasına gider — sınav ve bütçe için de site içi makalelere yönlendirirsiniz.",
  chips: ["Şeffaf süreç", "Güncel rehber", "Öğrenci odağı"],
  gridLabel: "Dil · üniversite · diğer programlar",
  gridHint: "Kartlar ilgili hub veya rehber sayfasına gider",
  cardCta: "Sayfaya git",
  ctaBand: {
    kicker: "Sonraki adım",
    body: "Ücretsiz ön görüşme ve bütçe netleştirme için bizi arayın veya e-posta gönderin; danışmanınız aynı gün döner.",
    button: "İletişime geç",
    href: "/iletisim",
  },
};

export const homeDilOkullari = {
  imageCaptionKicker: "Öne çıkan segment",
  imageCaption: "Yurtdışında dil okulu · yoğun kurs ve sınav modülleri",
  eyebrow: "Dil okulları",
  titleHighlight: "Yurtdışında",
  titleRest: "dil eğitimi",
  hubLink: { label: "Dil okulları hub — tüm ülkeler ve kurs türleri", href: "/dil-okullari/hub" },
  lead:
    "Genel İngilizce, akademik İngilizce veya IELTS ve TOEFL odaklı kursları; aile yanı konaklama, yurt veya stüdyo seçenekleriyle uyumlu planlıyoruz. Hedef ülkeye göre bütçe, süre ve öğrenci vizesi adımlarını danışmanlık dosyanızda birlikte netleştiririz.",
  bullets: [
    "Yoğun kurs & sınav hazırlığı (IELTS / TOEFL)",
    "Konaklama ve okul kampüsü seçenekleri",
    "Başvuru evrakları ve süreç takibi",
  ],
  destinationsLabel: "Popüler destinasyonlar",
  ctaPrimary: { label: "Ayrıntılı bilgi", href: "/iletisim" },
  ctaSecondary: { label: "IELTS rehberi", href: "/dil-okullari/ielts-kurs" },
};

export const homeNedenCampusGlobal = {
  eyebrow: "Campus Global · güvenilir ekip",
  titleLine1: "Aynı masada",
  titleLine2: "net karar",
  lead:
    "Başvurudan varışa kısa hatlar, yazılı takip noktaları ve açık sözlü fiyat/ süre sınırları — aileyle birlikte planladığımız yol, sürprize yer bırakmaz. Ofiste veya çevrimiçi; tüm ekip aynı notları görür, aynı cevabı verir.",
  bullets: [
    "Bütçe ve burs seçenekleri kıyaslanır, gizli kalemler açıkça söylenir.",
    "Okul ve ülke shortlist’i sizin önceliklerinizle puanlanır, tek taraflı yönlendirme yok.",
    "Vize ve belge aşamaları için hatırlatma ve “eksik evrak” uyarıları aynı panelde.",
  ],
  meeting: {
    kicker: "Toplu görüş",
    body:
      "İlk toplantıda bütçe, sınav, hedef ülke ve akademik süre çizelgesini birlikte yazıyoruz; yüz yüze veya çevrimiçi randevuyle başlayabilirsiniz.",
    cta: "İletişim & şubeler",
    href: "/iletisim",
  },
  imageAlt:
    "Aile veya öğrenci ile birlikte danışmanlık — teklif, takvim ve belgelerin aynı masada ele alındığı görüşme",
  valueCards: [
    {
      t: "Ücret & takvim",
      d: "Program ücreti, peşinat ve kampüs konaklama bantlarını aynı tabloda; kritik son başvuru tarihleri vurgulu.",
    },
    {
      t: "Evrak & başvuru",
      d: "Motivasyon, referans, transkript — adım adım PDF checklist, müfredat farkı notları tek yerde.",
    },
    {
      t: "Vize & yolculuk",
      d: "Randevu, biyometri, sağlık sigortası: ülke bazlı hatırlatmalar, randevu çakışması uyarıları.",
    },
    {
      t: "Varış & oryantasyon",
      d: "Havalimanı, yurt teslim, banka/ SIM — mini playbook; ilk hafta iletişim hattı net.",
    },
    {
      t: "Eğitimde destek",
      d: "Ders değişimi, sınav kaydı, danışman görüşmeleri — dönem içi e-posta hattı ve kayıt takip.",
    },
    {
      t: "Güvence & şeffaflık",
      d: "Sözleşme, iptal/erteleme koşulları ve okul sözleşmeleri önceden paylaşılır; sürpriz fatura yok.",
    },
  ],
};

export const homeUniversite = {
  eyebrow: "Lisans · Üniversite",
  title: "Yurtdışında üniversite: ülkeye göre giriş",
  lead:
    "Her ülkenin başvuru takvimi, dil yeterliliği ve finansal ispat kuralları farklıdır. Aşağıdaki kartlar popüler yurtdışı üniversite destinasyonları için özet giriş rehberi sunar; detaylı program ve evrak takibi ilk görüşmede planlanır.",
  hubLink: { label: "Üniversite hub — tüm ülke rehberleri", href: "/universite/hub" },
  quickLinks: [
    { label: "Başvuru yolu", segment: "basvuru" },
    { label: "Belgeler", segment: "belgeler" },
    { label: "Burs & bütçe", segment: "burs" },
  ],
  sideBoxes: [
    {
      t: "Ülkeye özel rehber",
      d: "Kartları izleyerek Almanya’dan İngiltere’ye giriş koşulları, sınavlar ve belgeler için özet ve alt sayfa yollarına geçebilirsiniz.",
    },
    {
      t: "Evrak & takip",
      d: "Motivasyon, transkript, vize eki — tek hatta checklist; kritik tarihlerde hatırlatma.",
    },
    {
      t: "İngiltere · UCAS",
      d: "Başvuru penceresi, firm choice ve foundation / doğrudan lisans senaryoları aynı masada.",
    },
    {
      t: "Bütçe & yaşam",
      d: "Yıllık harç, konaklama tipi ve şehre göre aylık yaşam — önce şeffaf tablo, sürpriz yok.",
    },
  ],
  gridLabel: "Destinasyon grid",
  gridHint: "Tıkla — ülke sayfasına git",
  cardFooter: "Ülke rehberi",
};

export const homeSinavlar = {
  eyebrow: "Hedef puan & prova hattı",
  titleLine1: "Programına göre",
  titleLine2: "net sınav planı",
  lead:
    "IELTS, TOEFL, SAT ve GRE/GMAT hazırlığında tek başına “ders saati” değil; hedef band veya skor, üniversitenin dil veya test eşiği ve yeniden sınav tarihleri başvuru takviminize bağlanır. Özet kartların altında ilk görüşmede seans ve prova planı netleşir.",
  links: [
    { label: "IELTS rehberi", href: "/dil-okullari/ielts-kurs" },
    { label: "TOEFL rehberi", href: "/dil-okullari/toefl-kurs" },
    { label: "SAT özeti", href: "/universite/sat-ozet" },
    { label: "GRE rehberi", href: "/yuksek-lisans/gre-rehber" },
  ],
};

export const homeFiyatlar = {
  eyebrow: "Bütçe",
  title: "Yurtdışı dil okulu için örnek fiyat bantları",
  planLink: { label: "Süre ve bütçe planlama rehberi →", href: "/dil-okullari/sure-planlama" },
  chips: ["Kur: ofis notu", "Kalemler ayrı"],
  liveBand: "Canlı bant",
  intro:
    "Gördüğünüz ₺ ile gösterilen aralıklar örnektir; güncel kampanya ve kur görüşmede yazılır. Her kutuda şehir, konaklama ve yoğunluk gibi fiyatı etkileyen başlıkları açıklıyoruz — yurtdışında dil eğitimi bütçenizi böyle kuruyoruz.",
  cta: { label: "Bütçe hattı", href: "/iletisim" },
  footnote: "Kur veya kampanya o turda bilet üzerine yazılır; aynı öğrenci dosyasında kalem ayrımları kaybolmaz.",
};

export const homeYuksekLisans = {
  eyebrow: "Yüksek lisans",
  tags: ["MSc / MA", "MBA", "Araştırma", "Mezuniyet PSW"],
  titleLine1: "MSc · MBA · doktora",
  titleLine2: "yurtdışı yüksek lisans planı",
  hubLink: {
    label: "Yüksek lisans hub — tüm ülkeler ve kabul notları",
    href: "/yuksek-lisans/hub",
  },
  lead:
    "Yurtdışında yüksek lisans ve MBA başvurularında araştırma çıkarımından essay turlarına, burs ve asistanlık senaryolarından mezuniyet sonrası çalışma izni özetlerine kadar tek danışmanlık dosyasında ilerliyoruz. Okul listesi; akademik uyum ve kariyer hedefinize göre, tek taraflı yönlendirme olmadan oluşturulur.",
  rows: [
    { t: "Program uyumu ve araştırma çıkarımı" },
    { t: "Essay ve mülakatta çok tur geri bildirim" },
    { t: "Mezuniyet sonrası oturum politikalarına göre ön bilgi" },
  ],
  cta: { label: "Detaylı bilgi", href: "/iletisim" },
  imageAlt: "Yurtdışında yüksek lisans ve kariyer ağı",
  imageBadge: "YL+",
  imageCaption: "Global ağ & araştırma",
  targetMarketLabel: "Hedef pazar",
  bottomKicker: "Aynı dosyada · aynı ritim",
  bottomChips: ["Supervisor eşleşmesi", "Essay turları", "Burs + GA tablosu", "Görüşme iskeleti"],
};

export const homeHaberler = {
  eyebrow: "İçerik",
  freshBadge: "Taze içerik",
  title: "Yurtdışı eğitim rehberleri",
  lead:
    "Dil okulu, üniversite başvurusu ve sınav planına dair blog ve rehber özetleri; yakında tam makale sayfalarıyla arama motorlarında daha zengin indeks oluşturacağız.",
  tags: "Blog · şehir · üniversite",
  readCta: "Oku",
};

export const homeSss = {
  eyebrow: "SSS",
  title: "Sık sorulan sorular",
  lead:
    "Yurtdışı eğitim ücretleri, ülke seçimi ve denklik sorularına hızlı cevaplar; kişisel planınız ilk görüşmede detaylanır.",
};

export const homeFooterProgramlar = {
  eyebrow: "Hızlı erişim",
  title: "Program · içerik · şubeler",
  badge: "Ana sayfa haritası",
  columns: {
    programs: "Programlar",
    popular: "Popüler içerikler",
    branches: "Şubeler",
  },
};
