import { footerIletisim } from "@/data/home-ia";
import type { NavSubLink } from "@/data/site-nav";
import { dilUlkeler, sertifikaUlkeler, uniTumUlkeler, ylUlkeler } from "@/data/site-nav";

export type ProgramHubId = "dil-okullari" | "universite" | "yuksek-lisans" | "sertifika";

/** Hero altı broşür bandı — PDF’teki şerit + 3 sütun yapısına yakın */
export type ProgramHubSpotlight = {
  kicker: string;
  title: string;
  subtitle: string;
  /** Vurgu alıntısı (tek cümle) */
  pullQuote: string;
  /** Üst şerit etiketleri */
  programStrip: string[];
  /** Üç ana blok: program / süreç / destek */
  pillars: { title: string; body: string }[];
  body: string;
  bullets: string[];
  imageTagline: string;
};

export type ProgramHubModel = {
  id: ProgramHubId;
  layoutTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroLead: string;
  bullets: string[];
  /** Hero görseli (Picsum seed — ana sayfa ile aynı yaklaşım) */
  heroImageSrc: string;
  heroImageAlt: string;
  stats: { value: string; label: string }[];
  countriesHeading: string;
  countries: NavSubLink[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  /** İkinci bant metinleri (görsel + özet) */
  spotlight: ProgramHubSpotlight;
  valueProps: { title: string; body: string; bullets: string[] }[];
  processTitle: string;
  process: { title: string; body: string; tips: string[] }[];
};

function firstCountryHref(list: NavSubLink[]): string {
  return list[0]?.href ?? "/";
}

const mailHref = `mailto:${footerIletisim.email}`;

export const programHubById: Record<ProgramHubId, ProgramHubModel> = {
  "dil-okullari": {
    id: "dil-okullari",
    layoutTitle: "Dil okulları | Campus Global",
    metaDescription:
      "Yurtdışında dil eğitimi: yabancı dilin konuşulduğu ülkede öğrenme, yoğun veya genel kurs, konaklama, okul kaydı ve öğrenci vizesi. Campus Global ile ülke ve programa göre planlama.",
    eyebrow: "Dil okulları · hub",
    heroTitle: "Yurtdışında",
    heroHighlight: "dil eğitimi",
    heroLead:
      "Yabancı dil, konuşulduğu ülkede en verimli şekilde ilerler. Genel, akademik veya iş İngilizcesi gibi hatlar; havacılık / hukuk İngilizcesi veya öğretmenlik odaklı özel programlar için okul ve süreyi birlikte seçeriz. Ücretler çoğunlukla hedef ülkenin para birimiyle hesaplanır; kampanya ve paket dönemlerinde yazılı karşılaştırma sunarız.",
    heroImageSrc: "https://picsum.photos/seed/cg-hub-dil-hero-2024/1400/1000",
    heroImageAlt: "Yurtdışında dil eğitimi ve kampüs ortamı",
    stats: [
      { value: "26+", label: "Yıl danışmanlık" },
      { value: "Tek", label: "Koordinasyon hattı" },
      { value: "20+", label: "Dil destinasyonu" },
    ],
    bullets: [
      "Yoğun veya genel kurs; seviye ve hedefe göre haftalık ders yükü",
      "Aile yanı, rezidans, öğrenci evi veya paylaşımlı apart için güvenli konaklama planı",
      "Güncel konsolosluk bilgisine göre kişiye özel vize dosyası ve takip",
    ],
    countriesHeading: "Ülke rehberleri",
    countries: dilUlkeler,
    primaryCta: { href: mailHref, label: "Ücretsiz ön görüşme" },
    secondaryCta: { href: firstCountryHref(dilUlkeler), label: "İlk ülke sayfasına git" },
    spotlight: {
      kicker: "Campus Global · dil okulları",
      title: "Yurtdışı dil okulları",
      subtitle:
        "Kendinize yapacağınız önemli bir yatırım: doğru ülke ve okulla dil, kültür ve konforlu konaklamayı aynı pakette planlıyoruz.",
      pullQuote:
        "Yabancı dil, konuşulduğu ülkede öğrenilir. İngilizce, Almanca, İspanyolca, Fransızca, İtalyanca ve daha birçok dilde hedefinize uygun okul ve süre ile ilerleyebilirsiniz.",
      programStrip: [
        "Genel dil kursları",
        "Akademik & sınav hazırlığı (IELTS vb.)",
        "İş İngilizcesi · 30+ yaş programları",
        "Özel hatlar: havacılık, hukuk, teacher training",
      ],
      pillars: [
        {
          title: "Kurs ve yoğunluk",
          body:
            "Gramer ve temel seviyedeyseniz yoğun kursla haftalık ders sayısını artırabilirsiniz. Belirli seviyedeyseniz ama pratik eksikse genel kursla ders dışı zamanı sosyalleşmeye ayırıp öğrendiklerinizi günlük hayatta pekiştirebilirsiniz. Hangi programın uygun olduğunu hedef ve süreyle birlikte netleştiririz.",
        },
        {
          title: "Konaklama",
          body:
            "Okul partnerlerinin sunduğu aile yanı, rezidans, öğrenci evi veya paylaşımlı apart seçeneklerinden, kendinizi güvende hissedeceğiniz konaklamayı ihtiyaç ve bütçeye göre rezerve etmeye yönlendiririz. İyi dil eğitimi kadar keyifli konaklamanın da öneminin bilincindeyiz.",
        },
        {
          title: "Vize ve dosya",
          body:
            "Gidilecek ülkede vizenin sorunsuz ilerlemesi kritiktir. Her ülkenin kriterleri ve her öğrencinin profili farklıdır; güncel büyükelçilik ve konsolosluk bilgisine göre kişiye özel dosya hazırlanır, randevu ve başvuru adımlarında yanınızda kalırız.",
        },
      ],
      body:
        "Okul ücretleri çoğunlukla hedef ülkenin para birimiyle (Euro, sterlin, Amerikan doları, Kanada veya Avustralya doları vb.) hesaplanır. Avrupa’da birçok ülkede fiyatlandırma Euro üzerinden; Birleşik Krallık’ta sterlin; ABD’de dolar esastır. Kur ve kampanya dönemlerini yazılı özet ve karşılaştırmayla netleştiririz.",
      bullets: [
        "Çok dilli program seçenekleri ve yoğun / genel kurs dengesi",
        "Konaklama türleri tek çatı altında planlanır",
        "Öğrenci vizesi için kişiye özel checklist ve süreç takibi",
        "Tek iletişim hattı: okul yazışması, kayıt ve evrak",
      ],
      imageTagline: "Dil · konaklama · vize — uyumlu plan",
    },
    valueProps: [
      {
        title: "Okul ve program",
        body: "İhtiyaç, beklenti ve bütçeye uygun dil okulu; genel, akademik, iş dünyası ve özel amaçlı kurslar için kısa liste.",
        bullets: ["Akreditasyon ve kampüs profili", "Sınav ve akademik hazırlık hatları"],
      },
      {
        title: "Kayıt ve maliyet",
        body: "Kurs ücreti ve konaklama kalemlerinin şeffaf özeti; depozito ve okul politikaları yazılı paylaşılır.",
        bullets: ["Para birimine göre bütçe tablosu", "Kampanya ve paket dönemleri bilgisi"],
      },
      {
        title: "Operasyon ve varış",
        body: "Çalışma izinli dil programları gibi ülkeye özel seçenekler hakkında bilgilendirme; sigorta, transfer ve varış öncesi kontroller.",
        bullets: ["Ülkeye özel yasal çerçeve özeti", "Yolculuk öncesi hatırlatmalar"],
      },
    ],
    processTitle: "Nasıl ilerliyoruz?",
    process: [
      {
        title: "1 · Görüşme",
        body: "Mevcut seviye, süre, bütçe ve hedef (sınav, iş, akademik geçiş vb.); ülke ve kurs tipi birlikte seçilir.",
        tips: ["Seviye ve hedef netleşir", "Yoğun veya genel program karşılaştırması"],
      },
      {
        title: "2 · Teklif",
        body: "Okul ve tarih alternatifleri; kurs + konaklama kalemleri ve ülke parası üzerinden net maliyet özeti.",
        tips: ["İptal ve depozito koşulları yazılı", "Farklı destinasyon kıyası"],
      },
      {
        title: "3 · Başvuru",
        body: "Okul kaydı ve öğrenci vizesi dosyası paralel ilerler; evrak seti profilinize göre hazırlanır.",
        tips: ["Pasaport, finans, sağlık formları checklist", "Konsolosluk randevusu hazırlığı"],
      },
      {
        title: "4 · Gidiş",
        body: "Kabul ve vize sonrası konaklama kesinleştirme, uçuş ve varış koordinasyonu.",
        tips: ["Transfer ve oryantasyon notları", "Yerel acil hatlar özeti"],
      },
    ],
  },
  universite: {
    id: "universite",
    layoutTitle: "Üniversite yurtdışı | Campus Global",
    metaDescription:
      "Yurtdışında üniversite: tıptan mühendisliğe, iletişim ve medyadan işletmeye geniş bölüm yelpazesi. Uluslararası diploma, dil, kültürel deneyim ve kariyer. Campus Global ile ülke, başvuru ve vize planı.",
    eyebrow: "Üniversite · hub",
    heroTitle: "Yurtdışında",
    heroHighlight: "üniversite",
    heroLead:
      "Liseden sonra kariyerinize Avrupa, Amerika, Kanada, Avustralya veya diğer hedef ülkelerde devam edebilirsiniz. Tıp, diş, eczacılık, mühendislik, mimarlık, psikoloji, işletme, iletişim ve medya, tasarım gibi alanlarda programları ülke sayfalarıyla eşleştiririz; foundation, doğrudan lisans veya ülkeye uygun hazırlık hatlarını netleştiririz.",
    heroImageSrc: "https://picsum.photos/seed/cg-hub-uni-hero-2024/1300/920",
    heroImageAlt: "Yurtdışında üniversite kampüsü ve mezuniyet atmosferi",
    stats: [
      { value: "26+", label: "Yıl deneyim" },
      { value: "Ülke", label: "Bazlı rehber" },
      { value: "UCAS+", label: "Başvuru hatları" },
    ],
    bullets: [
      "Dünya çapında tanınan kurumlarda güçlü akademik ve araştırma altyapısı",
      "Yüksek dil becerisi ve çok kültürlü kampüs deneyimi",
      "Uluslararası diploma ile CV ve global iş ağı güçlendirme",
    ],
    countriesHeading: "Ülke sayfaları",
    countries: uniTumUlkeler,
    primaryCta: { href: mailHref, label: "Danışmanlık talep et" },
    secondaryCta: { href: firstCountryHref(uniTumUlkeler), label: "Ülkeleri incele" },
    spotlight: {
      kicker: "Campus Global · üniversite",
      title: "Yurtdışında üniversite",
      subtitle:
        "Daha iyi eğitim, güçlü kariyer ve farklı kültürleri keşfetme: lisans yolculuğunuzu ülke ve bölüm rehberleriyle destekliyoruz.",
      pullQuote:
        "Yurtdışında üniversite okumak; uluslararası tanınan bir diploma, akıcı yabancı dil, parlak bir kariyer yörüngesi ve kozmopolit bir ağ demektir.",
      programStrip: [
        "Lisans & popüler bölümler",
        "Foundation / pathway / college rotaları",
        "Burs ve son başvuru tarihleri",
        "Kabul sonrası yerleşim",
      ],
      pillars: [
        {
          title: "Dünya standartlarında eğitim",
          body:
            "Birçok yurtdışı üniversite; güçlü akademik gelenek, güncel araştırma altyapısı ve yenilikçi öğretim yöntemleriyle öne çıkar. Alanınızda fark yaratmanız için gerçekçi üniversite ve bölüm seti, transkript, GPA ve varsa uluslararası programlar (AP, IB, A-Level vb.) ile harmanlanarak çıkarılır.",
        },
        {
          title: "Dil, kültür, bağımsızlık",
          body:
            "İngilizce veya hedef ülkede eğitim diliyle akademik seviyede ilerleme; yeni kültür, gelenekler ve yaşam biçimlerini keşfetme. Yurtdışında okumak özgüveninizi ve kendi kararlarınızı alma, bütçenizi yönetme pratiğinizi de destekler.",
        },
        {
          title: "Kariyer ve ağ",
          body:
            "Saygın bir lisans diploması CV’nizi güçlendirir; işverenler bağımsızlık, kültürlerarası iletişim ve problem çözme gibi yurtdışı deneyimlere de değer verir. Kozmopolit kampüste kuracağınız ilişkiler, ileride iş ve akademide ağınıza dönüşebilir.",
        },
      ],
      body:
        "İletişim, medya, gazetecilik, animasyon ve dijital içerik gibi alanlarda ülkeye göre çalışma izinli eğitim veya farklı giriş modelleri (ör. ABD’de community college veya doğrudan lisans) hakkında bilgilendirme yaparız. Avrupa’da birçok program üç yıllık lisans yapısıyla verimli bir maliyet-süre dengesi sunabilir. Ücretler ve depozito okul bazında değişir; yazılı özet ve aileye yönelik bilgilendirme sunulabilir.",
      bullets: [
        "Tıp, sağlık, mühendislik, mimarlık, sosyal bilimler, işletme, havacılık, tasarım ve daha fazlası için ülke bazlı içerik",
        "Giriş koşulları ve sınav eşleştirmesi (SAT, ACT, dil testleri vb.)",
        "Motivasyon ve ek sorular için taslak + revizyon; burs ve son tarih uyarıları",
        "Kabul sonrası CAS / I-20 benzeri süreçler ve öğrenci vizesi checklist",
      ],
      imageTagline: "Akademik hedef · kültür · kariyer",
    },
    valueProps: [
      {
        title: "Bölüm ve ülke seçimi",
        body: "Profilinize uygun üniversite ve program listesi; pathway ve doğrudan lisans senaryoları ülke kurallarına göre karşılaştırılır.",
        bullets: ["Geniş bölüm yelpazesi", "Ülkeye özel giriş modelleri"],
      },
      {
        title: "Başvuru ve denklik bilgisi",
        body: "UCAS veya yerel portallar, ek sorular ve motivasyon metni; Türkiye’den mezuniyet sonrası denklik ve geçiş konularında yönlendirme.",
        bullets: ["Deadline ve burs takvimi", "Belge ve referans düzeni"],
      },
      {
        title: "Kabul sonrası",
        body: "Konaklama, banka, oryantasyon ve güvenli yerleşim için kontrol listeleri.",
        bullets: ["Yerleşim checklist", "İlk dönem pratik adımları"],
      },
    ],
    processTitle: "Lisans yolculuğu",
    process: [
      {
        title: "Profil",
        body: "Eğitim geçmişi, sınavlar, dil yeterliliği ve kariyer hedefi; hangi ülke ve bölümün gerçekçi olduğu konuşulur.",
        tips: ["Transkript ve ek belge ön kontrol", "Hedef ülke ve bölüm önceliği"],
      },
      {
        title: "Liste",
        body: "Üniversite ve programlar önceliklendirilir; giriş şartları ve burs fırsatları kontrol edilir.",
        tips: ["Foundation / doğrudan lisans karşılaştırması", "Maliyet ve süre özeti"],
      },
      {
        title: "Başvuru",
        body: "Portal yüklemeleri, referans ve ek belgeler tamamlanır.",
        tips: ["Motivasyon ve ek sorular taslağı", "Son tarih takibi"],
      },
      {
        title: "Vize",
        body: "Kabul sonrası konsolosluk evrakları ve finans kanıtı hazırlığı.",
        tips: ["CAS / I-20 ve ülkeye özel belgeler", "Randevu ve mülakat hazırlığı"],
      },
    ],
  },
  "yuksek-lisans": {
    id: "yuksek-lisans",
    layoutTitle: "Yüksek lisans yurtdışı | Campus Global",
    metaDescription:
      "Yurtdışında master ve graduate: prestijli üniversitelerde diploma, Türkiye ile rekabetçi maliyet seçenekleri, AB ve güçlü akademik geleneğe sahip ülkeler. Psikoloji, mühendislik, işletme, iletişim ve medya ve daha fazlası. Campus Global ile başvuru ve vize.",
    eyebrow: "Yüksek lisans · hub",
    heroTitle: "Yurtdışında",
    heroHighlight: "yüksek lisans",
    heroLead:
      "Lisans sonrası yurtdışında master; dünya çapında tanınan diploma, uluslararası iş deneyimi ve güçlü bir profesyonel ağ sunabilir. Almanya, İngiltere, Polonya, Çekya, Macaristan, Kanada, Amerika, Hollanda ve diğer hedeflerde program maliyetleri ve süreleri ülke sayfalarında derinleşir; taught veya araştırma ağırlıklı seçenekleri netleştiririz.",
    heroImageSrc: "https://picsum.photos/seed/cg-hub-yl-hero-2024/1200/960",
    heroImageAlt: "Yüksek lisans ve araştırma odaklı çalışma ortamı",
    stats: [
      { value: "26+", label: "Yıl ekip" },
      { value: "SOP", label: "Belge rehberi" },
      { value: "GRE+", label: "Sınav hatları" },
    ],
    bullets: [
      "Akademik profilinize uygun üniversite ve master programı analizi",
      "Statement of purpose, CV ve referanslarda tutarlı anlatı",
      "Burs, assistantship ve son başvuru tarihleri için takvim",
    ],
    countriesHeading: "Ülke rehberleri",
    countries: ylUlkeler,
    primaryCta: { href: mailHref, label: "Ön değerlendirme" },
    secondaryCta: { href: firstCountryHref(ylUlkeler), label: "Ülkeleri aç" },
    spotlight: {
      kicker: "Campus Global · yüksek lisans",
      title: "Master · MBA · graduate",
      subtitle:
        "Yurtdışında master; tanınan diploma, güçlü network, akıcı dil ve özgüven — ülke ve programa göre akademik danışmanlık.",
      pullQuote:
        "Yurtdışında yüksek lisans birçok öğrencinin hedefi: dünya ölçeğinde geçerli eğitim, parlak kariyer ve olaylara farklı açıdan bakabilme fırsatı bir araya gelir.",
      programStrip: [
        "Taught master",
        "Research & akademik derinleşme",
        "MBA ve uzmanlık",
        "Burs · assistantship",
      ],
      pillars: [
        {
          title: "Program ve akademik analiz",
          body:
            "Talepleriniz ve akademik geçmişiniz doğrultusunda yüksek lisans sunan üniversitelerin gereksinimleri değerlendirilir; taught ile research ağırlıklı programlar, süre, müfredat ve mezuniyet sonrası çıktılar karşılaştırılır. GRE/GMAT ve dil testleri üniversite bazında çizelgeye alınır.",
        },
        {
          title: "SOP · CV · referans",
          body:
            "Statement of purpose ve CV tek profesyonel hikâyede birleştirilir; her okulun motivasyon beklentisi farklıdır, kopyala-yapıştır yerine programa özel paragraflar hedeflenir. Referans verecek isimler ve iletişim tonu planlanır; portal yüklemeleri son tarihlerle izlenir.",
        },
        {
          title: "Maliyet · kabul · vize",
          body:
            "Birçok destinasyonda Türkiye ile rekabet edebilecek maliyet ve süre profilleri mümkündür; yaşam gideri ve burs / assistantship özetleri ülke bazında paylaşılır. Kabul sonrası kayıt, ön ödeme ve öğrenci vizesi evrakları paralel yürütülür.",
        },
      ],
      body:
        "Öğrenciler arasında sık tercih edilen alanlar arasında psikoloji, mimarlık, mühendislik, sosyal bilimler, işletme, iletişim ve medya (gazetecilik, film, dijital medya vb.), bilgisayar ve yazılım mühendisliği, havacılık ve sağlık bilimleri sayılabilir. Ülkeye göre çalışma izni ve mezuniyet sonrası seçenekler hakkında bilgilendirme yapılır.",
      bullets: [
        "Geniş ülke ve üniversite yelpazesi; giriş koşulu karşılaştırması",
        "SOP iskeleti, revizyon ve programa uygun ton",
        "Referans süreci ve akademik iletişim",
        "Kabul, I-20 / CAS benzeri belgeler ve vize checklist",
      ],
      imageTagline: "Analiz · dosya · zamanlama",
    },
    valueProps: [
      {
        title: "Akademik eşleştirme",
        body: "Disiplin, sıralama, süre ve mezuniyet sonrası hedefe göre program seçimi; research için danışman/süpervizyon uyumu değerlendirilir.",
        bullets: ["Taught ve research ayrımı", "Müfredat karşılaştırması"],
      },
      {
        title: "Başvuru seti",
        body: "CV, SOP ve referanslarda tutarlı anlatı; portal ve ek sorular deadline’larla takip edilir.",
        bullets: ["Programa özel motivasyon metni", "Referans stratejisi"],
      },
      {
        title: "Finansman ve yerleşim",
        body: "Öğrenim ve yaşam bütçesi, burs ve assistantship fırsatları ülke bazlı özetlenir; kabul sonrası konaklama ve banka adımları.",
        bullets: ["Maliyet tablosu", "Kayıt ve vize sonrası checklist"],
      },
    ],
    processTitle: "Master süreci",
    process: [
      {
        title: "Hedef",
        body: "Disiplin, süre, kariyer ve mümkünse ülke önceliği netleştirilir.",
        tips: ["Master vs uzun vadeli akademik plan", "Burs ve GA fırsatları özetlenir"],
      },
      {
        title: "Kısa liste",
        body: "Programlar, giriş notu, sınav ve dil şartları karşılaştırılır.",
        tips: ["GRE / GMAT ve waiver senaryoları", "Popüler bölüm ve ülke eşleştirmesi"],
      },
      {
        title: "Dosya",
        body: "SOP, CV ve referanslar programa göre revize edilir.",
        tips: ["Akademik hikâye ve proje uyumu", "Okul tonuna göre revizyon"],
      },
      {
        title: "Kabul & vize",
        body: "Kayıt onayı, ön ödeme ve konsolosluk evrakları tamamlanır.",
        tips: ["I-20 / CAS süreçleri", "Konaklama ve banka hesabı"],
      },
    ],
  },
  sertifika: {
    id: "sertifika",
    layoutTitle: "Sertifika programları | Campus Global",
    metaDescription:
      "Yurtdışında kısa süreli sertifika ve mesleki programlar: dil + meslek bileşikleri, college hatları ve iş piyasasına hızlı dönüş. Ülke sayfaları ve başvuru desteği.",
    eyebrow: "Sertifika · hub",
    heroTitle: "Yurtdışında",
    heroHighlight: "sertifika",
    heroLead:
      "Lisans öncesi veya kariyer ara destekli meslek programları; İngiltere, İrlanda, Kanada, Avustralya, Amerika ve İtalya vitrinlerinden ülke içeriklerine dalın. Süre, giriş koşulu ve vize tipini birlikte netleştirir, dil ile teknik modülleri aynı takvimde planlarız.",
    heroImageSrc: "https://picsum.photos/seed/cg-hub-sertifika-2024/1300/920",
    heroImageAlt: "Yurtdışında mesleki sertifika ve atölye ortamı",
    stats: [
      { value: "6+", label: "Ülke vitrini" },
      { value: "Kısa", label: "Süre seçenekleri" },
      { value: "Tek", label: "Koordinasyon hattı" },
    ],
    bullets: [
      "Dil yeterliliği ve programa özel ön koşul kontrolü",
      "College / pathway veya doğrudan sertifika modülleri için ülke özeti",
      "Öğrenci veya kısa süreli vize dosyası paralel hazırlığı",
    ],
    countriesHeading: "Ülke rehberleri",
    countries: sertifikaUlkeler,
    primaryCta: { href: mailHref, label: "Ücretsiz ön görüşme" },
    secondaryCta: { href: firstCountryHref(sertifikaUlkeler), label: "İlk destinasyon sayfası" },
    spotlight: {
      kicker: "Campus Global · sertifika",
      title: "Mesleki sertifika & kısa programlar",
      subtitle: "Hızlı dönüş, net süre ve şeffaf maliyet: dil ile birlikte veya saf teknik modüller.",
      pullQuote:
        "Sertifika programları kariyerinizi kesintisiz güçlendirmek isteyenler için idealdir; doğru ülkede doğru modül, iş piyasasına girişte fark yaratır.",
      programStrip: [
        "Sertifika · diploma pathway",
        "Dil + meslek bileşikleri",
        "Hızlı dönüş kariyer hatları",
        "Katılım profiline göre süre",
      ],
      pillars: [
        {
          title: "Program tipi",
          body:
            "Kısa süreli meslek sertifikası, college tabanlı modül veya lisansa köprü pathway arasındaki farklar ülkeye göre açıklanır. Kimlerin katılması gerektiği ve tipik haftalık yoğunluk birlikte netleştirilir.",
        },
        {
          title: "Dil ve akademik giriş",
          body:
            "Program İngilizce veya yerel dilde olabilir; IELTS/TOEFL veya okul içi test senaryoları, gerekirse dil okulu + sertifika zinciri önerilir. Önceki iş deneyimi veya lisans parçası gerektiren modüller kontrol edilir.",
        },
        {
          title: "Vize ve sonrası",
          body:
            "Ülkeye göre öğrenci, mesleki veya ziyaretçi çerçeveleri farklıdır; kabul mektubu ve finans kanıtı ile dosya hazırlanır. Mezuniyet sonrası çalışma veya üst programa geçiş imkânları ülkeye göre özetlenir.",
        },
      ],
      body:
        "Ücretler genelde hedef ülke para birimiyle ve modül süresiyle belirlenir. Kampanya ve paket dönemlerinde yazılı karşılaştırma; konaklama, materyal ve sınav ücretleri kalemleri tek tabloda toplanır.",
      bullets: [
        "Destinasyon bazlı program vitrinleri ve giriş şartı özeti",
        "Dil + meslek kombinasyonlarında zamanlama",
        "Kabul, ön ödeme ve vize checklist",
        "Tek hattan kurum yazışması ve evrak takibi",
      ],
      imageTagline: "Modül · dil · vize — uyumlu plan",
    },
    valueProps: [
      {
        title: "Profil ve süre",
        body: "Kariyer arası, yeni mezun veya meslek değiştiren profiller için uygun süre ve yoğunluk seçimi.",
        bullets: ["Katılım profili netleştirme", "Haftalık ders yükü karşılaştırması"],
      },
      {
        title: "Okul eşleştirme",
        body: "Akreditasyon, kampüs konumu ve sektör odaklı modüllere göre kısa liste.",
        bullets: ["College vs özel merkez karşılaştırması", "Staj veya proje bileşenleri"],
      },
      {
        title: "Operasyon",
        body: "Kayıt, konaklama, sigorta ve varış öncesi kontrol listeleri.",
        bullets: ["Depozito ve iptal politikası özeti", "Yerleşim ve oryantasyon notları"],
      },
    ],
    processTitle: "Sertifika süreci",
    process: [
      {
        title: "1 · Görüşme",
        body: "Hedef sektör, süre, bütçe ve mevcut dil seviyesi; ülke ve program tipi ön seçilir.",
        tips: ["Online veya yüz yüze", "Önceki diploma veya iş deneyimi özeti"],
      },
      {
        title: "2 · Teklif",
        body: "Okul ve tarih alternatifleri; modül ücreti, konaklama ve yan kalemler yazılı özetlenir.",
        tips: ["Dil okulu ön okuma opsiyonu", "İptal koşulları net"],
      },
      {
        title: "3 · Başvuru",
        body: "Kabul için evrak seti ve gerekiyorsa vize dosyası paralel hazırlanır.",
        tips: ["Pasaport ve finans kanıtı checklist", "Kurum ile yazışma tek kanalda"],
      },
      {
        title: "4 · Gidiş",
        body: "Kabul sonrası konaklama, uçuş ve yerel kayıt adımları tamamlanır.",
        tips: ["Varış ve okul kaydı hatırlatmaları", "Acil iletişim bilgileri"],
      },
    ],
  },
};
