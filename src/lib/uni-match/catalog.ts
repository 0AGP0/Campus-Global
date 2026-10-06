export type BachelorCountry = {
  name: string;
  flag: string;
  req_yks: "yerlesti" | "baraj" | "yok";
  min_budget: number;
  max_budget: number;
  desc: string;
};

export type MasterCountry = {
  name: string;
  flag: string;
  min_budget: number;
  max_budget: number;
  desc: string;
};

export const bachelorsCountries: BachelorCountry[] = [
  { name: "Almanya", flag: "🇩🇪", req_yks: "yerlesti", min_budget: 12000, max_budget: 20000, desc: "Dil ve puan şartsız şartlı kabul imkanı. Eğitim süresince haftada 20 saat çalışma hakkı. Mezuniyet sonrası 18 ay iş arama izni. Devlet üniversitelerinde ücretsiz eğitim." },
  { name: "İngiltere", flag: "🇬🇧", req_yks: "yok", min_budget: 35000, max_budget: 999999, desc: "Dünyanın en iyi üniversitelerinde prestijli eğitim. Eğitim süresince yarı zamanlı çalışma hakkı. Mezuniyet sonrası 2 yıl tam zamanlı çalışma izni (Graduate Route)." },
  { name: "İtalya", flag: "🇮🇹", req_yks: "baraj", min_budget: 10000, max_budget: 20000, desc: "Devlet destekli bölgesel burslar (DSU) ile ücretsiz eğitim ve yıllık cep harçlığı alma şansı. Mezuniyet sonrası 1 yıl iş arama izni ve uygun yaşam maliyetleri." },
  { name: "Polonya", flag: "🇵🇱", req_yks: "yok", min_budget: 8000, max_budget: 15000, desc: "Avrupa'nın en ekonomik yaşam ve eğitim seçenekleri. Mezuniyet sonrası tüm AB'de geçerli Mavi Diploma ve doğrudan tam zamanlı çalışma izni." },
  { name: "Hollanda", flag: "🇳🇱", req_yks: "yok", min_budget: 20000, max_budget: 40000, desc: "Çok uluslu şirketlerin merkezlerinde global kariyer ve staj fırsatları. Mezuniyet sonrası 1 yıl iş arama ve çalışma izni (Search Year). Avrupa'nın en yüksek İngilizce konuşulma oranı." },
  { name: "Amerika", flag: "🇺🇸", req_yks: "yok", min_budget: 38000, max_budget: 999999, desc: "Eğitim sırasında üniversite içi çalışma imkanı ve (CPT) maaşlı staj fırsatları. Mezuniyet sonrası (OPT) ile 1 ila 3 yıl arası tam zamanlı çalışma izni." },
  { name: "Kanada", flag: "🇨🇦", req_yks: "yok", min_budget: 48000, max_budget: 999999, desc: "Co-op programları sayesinde eğitim alırken maaşlı staj yapma imkanı. Mezuniyet sonrası 3 yıla kadar çalışma izni (PGWP) ve sonrasında göçmenlik (PR) kolaylığı." },
  { name: "Macaristan", flag: "🇭🇺", req_yks: "yok", min_budget: 11000, max_budget: 20000, desc: "Stipendium Hungaricum devlet bursu ile ücretsiz eğitim, konaklama ve aylık harçlık imkanı. Mezuniyet sonrası 9 ay iş arama vizesi." },
  { name: "Çekya", flag: "🇨🇿", req_yks: "yok", min_budget: 10000, max_budget: 20000, desc: "Çekçe dilinde eğitim alınması durumunda tamamen ücretsiz üniversite imkanı. Avrupa'nın tam merkezinde düşük işsizlik oranı ile kolay kariyer başlangıcı." },
  { name: "Avustralya", flag: "🇦🇺", req_yks: "yok", min_budget: 60000, max_budget: 999999, desc: "Eğitim süresince yüksek asgari ücretle iki haftada 48 saat çalışma hakkı. Mezuniyet sonrası 2 ila 4 yıl arası çalışma izni ve yüksek göçmenlik şansı." },
  { name: "Fransa", flag: "🇫🇷", req_yks: "yerlesti", min_budget: 12000, max_budget: 20000, desc: "Devlet tarafından sağlanan aylık kira yardımı (CAF) ve öğrenci destekleri. Devlet okullarında düşük harç ücretleri. Mezuniyet sonrası 1 yıl iş arama izni." },
  { name: "Güney Kore", flag: "🇰🇷", req_yks: "yok", min_budget: 14000, max_budget: 25000, desc: "Global Korea Scholarship (GKS) ile %100 eğitim bursu ve aylık maaş desteği. Mezuniyet sonrası (D-10) iş arama vizesi ile teknoloji devlerinde kariyer imkanı." },
  { name: "İrlanda", flag: "🇮🇪", req_yks: "yok", min_budget: 27000, max_budget: 45000, desc: "Google, Apple ve Microsoft gibi teknoloji devlerinin Avrupa merkezinde eğitim. Eğitim sırasında çalışma hakkı ve mezuniyet sonrası tam zamanlı çalışma izni." },
  { name: "İspanya", flag: "🇪🇸", req_yks: "yok", min_budget: 11000, max_budget: 20000, desc: "Akdeniz kültürü ile kolay sosyal adaptasyon. Dünyada 500 milyondan fazla kişinin konuştuğu İspanyolcayı yerinde öğrenme avantajı ve mezuniyet sonrası iş arama vizesi." },
  { name: "Letonya", flag: "🇱🇻", req_yks: "yok", min_budget: 11000, max_budget: 18000, desc: "Diğer Avrupa ülkelerine göre çok daha hızlı ve kolay vize/oturum süreçleri. Uygun bütçeyle Mavi Diploma sahibi olma ve Avrupa'da serbest dolaşım hakkı." },
  { name: "Litvanya", flag: "🇱🇹", req_yks: "yok", min_budget: 8500, max_budget: 15000, desc: "Hızla büyüyen IT ve bilişim sektörü sayesinde mezuniyet sonrası kolay iş bulma avantajı. Mezuniyet sonrası 1 yıl iş arama izni ve ekonomik yaşam şartları." },
  { name: "Rusya", flag: "🇷🇺", req_yks: "yok", min_budget: 6000, max_budget: 12000, desc: "Mühendislik, tıp ve havacılık gibi alanlarda dünya çapında köklü eğitim. Üniversite bünyesindeki hazırlık sınıflarında (Podfak) sıfırdan Rusça öğrenme imkanı." },
  { name: "Ukrayna", flag: "🇺🇦", req_yks: "yok", min_budget: 0, max_budget: 10000, desc: "Sınavsız ve şartsız üniversite kabul imkanı. Oldukça uygun maliyetli eğitim seçenekleri." },
];

export const mastersCountries: MasterCountry[] = [
  { name: "Almanya", flag: "🇩🇪", min_budget: 15000, max_budget: 20000, desc: "İngilizce veya Almanca ücretsiz yüksek lisans programları. Haftada 20 saat çalışma hakkı. Mezuniyet sonrası 18 ay iş arama izni." },
  { name: "Amerika", flag: "🇺🇸", min_budget: 47000, max_budget: 999999, desc: "Asistanlık (Teaching/Research Assistantship) başvuruları ile burs imkanları. Mezuniyet sonrası (OPT) ile 1 ila 3 yıl arası tam zamanlı çalışma izni." },
  { name: "İngiltere", flag: "🇬🇧", min_budget: 39000, max_budget: 999999, desc: "Yüksek lisans programlarının 1 yıl sürmesiyle zamandan ve yaşam maliyetinden tasarruf. Mezuniyet sonrası 2 yıl tam zamanlı çalışma izni (Graduate Route)." },
  { name: "Kanada", flag: "🇨🇦", min_budget: 27000, max_budget: 999999, desc: "Eğitim süresince çalışma hakkı. Mezuniyet sonrası 3 yıla kadar çalışma izni (PGWP) ve Master mezunlarına özel göçmenlik (PR) kolaylığı." },
  { name: "Hollanda", flag: "🇳🇱", min_budget: 30000, max_budget: 999999, desc: "Global şirketlerde kariyer fırsatları. Mezuniyet sonrası 1 yıl iş arama ve çalışma izni (Search Year). Avrupa'nın en yüksek İngilizce konuşulma oranı." },
  { name: "İrlanda", flag: "🇮🇪", min_budget: 27500, max_budget: 999999, desc: "Avrupa'nın teknoloji üssü. 1 yıllık yoğun yüksek lisans programları sayesinde hızlı mezuniyet ve sonrasında 2 yıl tam zamanlı çalışma izni." },
  { name: "Avustralya", flag: "🇦🇺", min_budget: 34500, max_budget: 999999, desc: "Eğitim süresince iki haftada 48 saat çalışma hakkı. Master mezunlarına özel mezuniyet sonrası 3 yıla varan çalışma izni ve yüksek göçmenlik şansı." },
  { name: "Fransa", flag: "🇫🇷", min_budget: 12500, max_budget: 20000, desc: "Master mezunlarına özel 1 yıl (APS) iş arama izni. Devlet tarafından sağlanan aylık kira yardımı (CAF). Çok düşük okul harç ücretleri." },
  { name: "İtalya", flag: "🇮🇹", min_budget: 10000, max_budget: 20000, desc: "Devlet destekli bölgesel burslar (DSU) ile okul harcından muafiyet ve nakit cep harçlığı fırsatı. Mezuniyet sonrası 1 yıl iş arama izni." },
  { name: "İspanya", flag: "🇪🇸", min_budget: 12500, max_budget: 20000, desc: "1 yıl süren yoğun yüksek lisans programları (Master's Degree). Mezuniyet sonrası 1 yıl süreli iş arama vizesi imkanı. Dünyanın en popüler dillerinden birini öğrenme şansı." },
  { name: "Polonya", flag: "🇵🇱", min_budget: 8000, max_budget: 15000, desc: "Ekonomik eğitim maliyetleri ve uluslararası geçerliliği olan prestijli üniversiteler. Mezuniyet sonrası doğrudan tam zamanlı çalışma izni." },
  { name: "Çekya", flag: "🇨🇿", min_budget: 9000, max_budget: 20000, desc: "Çekçe eğitimde tamamen ücretsiz okuma fırsatı. Avrupa'nın en düşük işsizlik oranına sahip ülkelerinden birinde kolayca işe başlama avantajı." },
  { name: "Macaristan", flag: "🇭🇺", min_budget: 9000, max_budget: 20000, desc: "Stipendium Hungaricum bursu kazanılırsa ücretsiz eğitim, konaklama ve nakit destek. Mezuniyet sonrasında 9 ay iş arama izni." },
  { name: "Güney Kore", flag: "🇰🇷", min_budget: 19000, max_budget: 30000, desc: "Global Korea Scholarship (GKS) ile %100 devlet burslu yüksek lisans fırsatı. D-10 iş arama vizesi ile global markalarda kariyer şansı." },
  { name: "Letonya", flag: "🇱🇻", min_budget: 7000, max_budget: 15000, desc: "Kabul ve vize süreçleri diğer AB ülkelerine göre çok daha hızlıdır. Uygun yaşam ve eğitim maliyeti ile Avrupa diplomasına (Mavi Diploma) sahip olma imkanı." },
  { name: "Litvanya", flag: "🇱🇹", min_budget: 8000, max_budget: 15000, desc: "Hızla gelişen start-up ve IT sektörü. Eğitim bittikten sonra 1 yıl iş arama izni ve AB genelinde çalışma ve yaşama kapılarının açılması." },
  { name: "Rusya", flag: "🇷🇺", min_budget: 5200, max_budget: 10000, desc: "Rusya devlet burslarına başvuru fırsatı. Özellikle temel bilimler ve mühendislikte çok köklü üniversiteler. Hazırlık sınıfları ile yeni bir dil öğrenme imkanı." },
  { name: "Ukrayna", flag: "🇺🇦", min_budget: 3800, max_budget: 8000, desc: "Sınavsız üniversite kabul imkanı. Çok ekonomik eğitim alternatifleri." },
];

export const basePriorityOrder = [
  "Almanya",
  "İtalya",
  "İngiltere",
  "Amerika",
  "Çekya",
  "Polonya",
  "İspanya",
  "Hollanda",
  "Macaristan",
  "İrlanda",
  "Avustralya",
  "Kanada",
  "Fransa",
  "Güney Kore",
  "Letonya",
  "Litvanya",
  "Rusya",
  "Ukrayna",
];
