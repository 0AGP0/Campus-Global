import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  FileText,
  Flag,
  Globe2,
  GraduationCap,
  Headphones,
  Languages,
  ListChecks,
  MapPin,
  Phone,
  Plane,
  School,
  ScrollText,
  Shield,
  Sparkles,
  CalendarDays,
  Wallet,
  BookOpen,
  Banknote,
  Laptop,
  Pencil,
  TrendingUp,
  Newspaper,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import {
  dilOkuluUlke,
  faqItems,
  fiyatKampanya,
  haberSpotlight,
  preFooterPopuler,
  preFooterPrograms,
  preFooterSubeler,
  programCategories,
  sinavlar,
  universiteUlke,
  yuksekLisansUlke,
} from "@/data/home-ia";
import { HeroDitherBackdrop } from "@/components/ui/hero-dither-backdrop";
import { navBase } from "@/data/site-nav";
import { titleDarkOnBand, titleHero, titleHeroBrand, titleLight } from "@/styles/typography";

const inner = "relative mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-14";

const heroEase = [0.22, 1, 0.36, 1] as const;
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const heroItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: heroEase },
  },
};

/* Picsum: Unsplash hotlink’leri bazı ağlarda yüklenmiyor */
const IMG_DIL = "https://picsum.photos/seed/cg-dil-yurtdisi-2024/1400/1000";
const IMG_MAP = "https://picsum.photos/seed/cg-harita-dunya-2024/1200/800";
/** Neden CG — “Aynı masada net karar” görseli (Picsum seed) */
const IMG_NEDEN_CG = "https://picsum.photos/seed/cg-ayni-masada-net-karar-2024/1000/660";
const IMG_YUKSEK = "https://picsum.photos/seed/cg-yuksek-lisans-kulvar-2024/1100/1200";

const categoryIcon: Record<string, LucideIcon> = {
  "dil-okullari": Languages,
  universite: Building2,
  "yuksek-lisans": Award,
  diploma: ScrollText,
  lise: School,
  "teach-usa": Flag,
};

/** Program kategorisi kartı — brutal + marka vurgusu */
const categoryVisual: Record<
  string,
  { stripe: string; iconBg: string; blob: string; num: string }
> = {
  "dil-okullari": {
    stripe: "bg-brand-aqua",
    iconBg: "from-brand-aqua to-brand-teal",
    blob: "from-brand-aqua/50 via-teal-400/20 to-transparent",
    num: "01",
  },
  universite: {
    stripe: "bg-brand-teal",
    iconBg: "from-brand-teal to-emerald-600",
    blob: "from-brand-teal/45 via-cyan-300/15 to-transparent",
    num: "02",
  },
  "yuksek-lisans": {
    stripe: "bg-zap-burst",
    iconBg: "from-zap-burst to-amber-500",
    blob: "from-zap-burst/40 via-orange-300/15 to-transparent",
    num: "03",
  },
  diploma: {
    stripe: "bg-brand-flame",
    iconBg: "from-brand-flame to-brand-coral",
    blob: "from-brand-flame/35 via-rose-300/12 to-transparent",
    num: "04",
  },
  lise: {
    stripe: "bg-violet-500",
    iconBg: "from-violet-500 to-fuchsia-600",
    blob: "from-violet-500/35 via-fuchsia-300/12 to-transparent",
    num: "05",
  },
  "teach-usa": {
    stripe: "bg-sky-500",
    iconBg: "from-sky-500 to-blue-600",
    blob: "from-sky-500/35 via-blue-300/12 to-transparent",
    num: "06",
  },
};

export function HomeLanding() {
  const reduceMotion = useReducedMotion();
  const [haberVitrin, ...haberDiger] = haberSpotlight;

  return (
    <div className="flex w-full flex-col">
      {/* Hero: wave dither (WebGL) + marka metni; pt/pb sabit */}
      <motion.section
        id="hero"
        className="relative z-[1] w-full overflow-hidden pb-20 pt-14 text-center md:pb-24 md:pt-16 lg:pb-28"
      >
        {!reduceMotion ? (
          <>
            <HeroDitherBackdrop />
            {/* Düşük opaklık: dither görünsün; mavi hafif koyu (daha az göz yorar) */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(3,214,186,0.14),transparent_52%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-brand-teal/8 via-brand-aqua/5 to-brand-teal/22"
              aria-hidden
            />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-zap-burst/22 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -right-20 bottom-8 h-64 w-64 rounded-full bg-brand-flame/28 blur-3xl" aria-hidden />
          </>
        )}

        <div className={`${inner} relative z-10`}>
          <motion.div
            className="relative mx-auto max-w-4xl"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-zap-night/82 p-6 shadow-brutal ring-1 ring-white/10 backdrop-blur-xl md:rounded-[1.35rem] md:p-9">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-brand-aqua/10"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute left-5 top-5 z-[1] h-8 w-8 border-l-2 border-t-2 border-zap-burst sm:left-6 sm:top-6 sm:h-10 sm:w-10"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-5 right-5 z-[1] h-8 w-8 border-b-2 border-r-2 border-brand-aqua sm:bottom-6 sm:right-6 sm:h-10 sm:w-10"
                aria-hidden
              />

            <motion.p
              variants={heroItemVariants}
              className="relative z-[2] inline-flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-zap-burstLight md:text-[12px]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-zap-burst md:h-4 md:w-4" aria-hidden />
              Campus Global · 26 yıl yurtdışı eğitim danışmanlığı
            </motion.p>

            <motion.div variants={heroItemVariants} className="relative z-[2] mx-auto mt-4 h-1 w-44 overflow-hidden rounded-full bg-white/20 md:w-52">
              {!reduceMotion ? (
                <motion.div
                  className="absolute inset-y-0 w-2/5 rounded-full bg-gradient-to-r from-zap-burst via-brand-aqua to-brand-flame shadow-[0_0_12px_rgba(255,183,3,0.55)]"
                  animate={{ left: ["-40%", "105%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.35 }}
                />
              ) : (
                <div className="mx-auto h-full w-3/5 rounded-full bg-gradient-to-r from-zap-burst via-brand-aqua to-brand-flame opacity-90" />
              )}
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="relative z-[2] mx-auto mt-7 max-w-[20ch] text-[clamp(2rem,7vw,3.35rem)] font-black uppercase leading-[0.92] tracking-tighter md:mt-8 md:max-w-4xl"
            >
              <span className="block text-white" style={titleHero}>
                Yurtdışında eğitim
              </span>
              <span className="mt-1 block text-zap-burst" style={titleHeroBrand}>
                profesyonel danışmanlık
              </span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="relative z-[2] mx-auto mt-7 max-w-xl text-[15px] font-semibold leading-snug text-white/95 md:mt-8 md:text-[17px]"
            >
              Dil okulu ve yurtdışı üniversite başvurusundan yüksek lisans ve sınav planına (IELTS, TOEFL, SAT, GRE/GMAT)
              kadar tek merkezden, şeffaf süreç ve güncel ülke rehberleriyle Campus Global yanınızda.
            </motion.p>

            <motion.p
              variants={heroItemVariants}
              className="relative z-[2] mx-auto mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-white/85 md:text-[12px]"
            >
              Dil okulu · Lisans · Yüksek lisans · Kabul sınavları
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="relative z-[2] mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
            >
              <motion.a
                href="#program-kategorileri"
                className="inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-zap-burst px-10 py-3 text-[14px] font-black uppercase leading-none text-zap-night shadow-brutal md:text-[16px]"
                whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                Programları keşfet
                <ArrowRight className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
              </motion.a>
              <motion.a
                href="#site-footer"
                className="inline-flex min-h-[48px] w-fit items-center justify-center rounded-full border-2 border-white/75 bg-white/12 px-10 py-3 text-[15px] font-bold leading-none text-white shadow-[0_4px_22px_rgba(0,0,0,0.22)] backdrop-blur-md md:text-[16px]"
                whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                İletişim
              </motion.a>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* — Program kategorileri: bento + canlı kartlar (segmentasyon) */}
      <section id="program-kategorileri" className="relative z-[1] -mt-12 w-full scroll-mt-24 md:-mt-14">
        <div className="relative overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-[#f0fdfc] via-white to-[#e8faf7] pb-16 pt-14 text-zap-ink shadow-[0_-28px_80px_rgba(3,214,186,0.22)] md:rounded-t-[3rem] md:pb-24 md:pt-20">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-aqua/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-brand-flame/18 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-zap-burst/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#03d6ba08_0%,transparent_40%,#f51d0006_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#06324206_1px,transparent_1px),linear-gradient(to_bottom,#06324206_1px,transparent_1px)] bg-[size:2.75rem_2.75rem] opacity-70" />

          <div className={`${inner} relative`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col gap-6 border-b-4 border-dashed border-zap-ink/12 pb-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-12"
            >
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full border-2 border-zap-ink/15 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-teal shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-zap-burst" aria-hidden />
                  Programlar · Campus Global
                </p>
                <h2 className="mt-5 text-[clamp(1.85rem,5vw,3rem)] font-black uppercase leading-[0.9] tracking-tighter">
                  <span className="block" style={titleLight}>
                    Yurtdışı eğitimde
                  </span>
                  <span className="mt-1 block bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-flame bg-clip-text text-transparent" style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
                    hangi kulvar size uygun?
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-[16px] font-medium leading-relaxed text-zap-ink/90 md:text-[17px]">
                  Dil okulları, üniversite ve yüksek lisans seçeneklerini kartlardan seçin; her segment ana sayfadaki detaylı
                  bölüme ve sınav ile fiyat rehberine bağlanır — yurtdışı eğitim planınız tek akışta ilerler.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
                {["Şeffaf süreç", "Güncel rehber", "Öğrenci odağı"].map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border-2 border-zap-ink bg-zap-burst px-3 py-2 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-[3px_3px_0_#063242]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="relative mt-10 md:mt-12">
              <div className="mb-5 flex items-end justify-between gap-4">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-zap-ink/55">
                  Dil · üniversite · diğer programlar
                </p>
                <span className="hidden text-[12px] font-bold text-zap-ink/50 lg:inline">
                  Kartlardan ilgili bölüme atlayın
                </span>
              </div>

              <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-12 xl:auto-rows-auto xl:gap-5">
                {programCategories.map((c, j) => {
                  const Icon = categoryIcon[c.id] ?? Globe2;
                  const vis = categoryVisual[c.id] ?? categoryVisual["dil-okullari"];
                  const isHeroTile = c.id === "dil-okullari";
                  const isTallPair = c.id === "universite" || c.id === "yuksek-lisans";
                  const gridPlacement =
                    isHeroTile
                      ? "sm:col-span-2 xl:col-start-1 xl:col-end-7 xl:row-start-1 xl:row-end-3 min-h-[260px] sm:min-h-[280px] xl:min-h-0"
                      : c.id === "universite"
                        ? "xl:col-start-7 xl:col-end-10 xl:row-start-1 xl:row-end-3"
                        : c.id === "yuksek-lisans"
                          ? "xl:col-start-10 xl:col-end-13 xl:row-start-1 xl:row-end-3"
                          : c.id === "diploma"
                            ? "xl:col-start-1 xl:col-end-5 xl:row-start-3 xl:row-end-4"
                            : c.id === "lise"
                              ? "xl:col-start-5 xl:col-end-9 xl:row-start-3 xl:row-end-4"
                              : "xl:col-start-9 xl:col-end-13 xl:row-start-3 xl:row-end-4";

                  return (
                    <motion.a
                      key={c.id}
                      href={c.href}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: j * 0.06, duration: 0.45 }}
                      className={`group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-zap-night shadow-brutal transition xl:h-full ${reduceMotion ? "" : "hover:-translate-y-1 hover:rotate-[0.35deg] hover:shadow-brutalLg"} ${gridPlacement}`}
                    >
                      <span className={`pointer-events-none absolute left-0 top-0 z-[2] h-full w-1.5 ${vis.stripe}`} aria-hidden />
                      <div
                        className={`relative flex-1 overflow-hidden min-h-[140px] sm:min-h-[160px] ${
                          isHeroTile ? "xl:min-h-[14rem]" : isTallPair ? "xl:min-h-[12rem]" : "xl:min-h-[11rem]"
                        }`}
                      >
                        <img
                          src={c.image}
                          alt=""
                          className={`absolute inset-0 h-full w-full min-h-[140px] object-cover transition duration-700 ${reduceMotion ? "" : "group-hover:scale-[1.06]"}`}
                          width={1200}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zap-night via-zap-night/55 to-zap-night/10" />
                        <div className={`pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br ${vis.blob} blur-2xl`} />
                        <span className="pointer-events-none absolute bottom-2 right-3 font-black tabular-nums text-[clamp(3rem,8vw,5rem)] leading-none text-white/[0.07]">
                          {vis.num}
                        </span>
                        <div className="absolute left-4 top-4 z-[2] flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/80 bg-gradient-to-br text-white shadow-lg ring-2 ring-black/20 sm:h-16 sm:w-16">
                          <div className={`flex h-full w-full items-center justify-center rounded-[0.65rem] bg-gradient-to-br ${vis.iconBg}`}>
                            <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.25} aria-hidden />
                          </div>
                        </div>
                      </div>
                      <div className="relative z-[2] flex shrink-0 flex-col justify-end bg-zap-night px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                        <h3 className="text-[clamp(1rem,2.8vw,1.35rem)] font-black uppercase leading-tight tracking-tight text-white">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-[14px] font-semibold leading-snug text-white/80 sm:text-[15px]">{c.blurb}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.12em] text-zap-burstLight">
                          Bölüme git
                          <ChevronRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative mt-10 flex flex-col gap-5 overflow-hidden rounded-2xl border-4 border-zap-ink bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-teal p-6 text-white shadow-brutal sm:flex-row sm:items-center sm:justify-between md:mt-12 md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_45%)]" aria-hidden />
              <div className="relative flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-white/50 bg-zap-burst text-zap-night shadow-lg">
                  <Globe2 className="h-7 w-7" strokeWidth={2.25} aria-hidden />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zap-burstLight">Sonraki adım</p>
                  <p className="mt-1 text-[15px] font-bold leading-snug md:text-[16px]">
                    Ücretsiz ön görüşme ve bütçe netleştirme için bizi arayın veya e-posta gönderin; danışmanınız aynı gün döner.
                  </p>
                </div>
              </div>
              <a
                href="#site-footer"
                className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-zap-ink bg-brand-flame px-8 py-3.5 text-[12px] font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#063242] transition hover:brightness-105"
              >
                İletişime geç
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* — Dil okulları: sabit koyu bant (tema); arka plan oynaması #neden-campus-global için ayrı sorulur */}
      <section
        id="dil-okullari"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-zap-night via-zap-ink to-[#041e26] text-white"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-aqua/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand-flame/12 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:2.75rem_2.75rem] opacity-60" />

        <div className={`${inner} relative py-14 md:py-20 lg:py-24`}>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative lg:col-span-5"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-zap-ink shadow-brutal sm:aspect-[5/4] lg:aspect-auto lg:min-h-[22rem] xl:min-h-[26rem]">
                <img
                  src={IMG_DIL}
                  alt=""
                  className="absolute inset-0 h-full w-full min-h-[12rem] object-cover"
                  width={1400}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zap-night via-zap-night/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zap-night/70 via-transparent to-transparent" />
                <span className="pointer-events-none absolute left-4 top-4 z-[1] h-9 w-9 border-l-4 border-t-4 border-zap-burst sm:left-5 sm:top-5 sm:h-11 sm:w-11" aria-hidden />
                <span className="pointer-events-none absolute bottom-4 right-4 z-[1] h-9 w-9 border-b-4 border-r-4 border-brand-aqua sm:bottom-5 sm:right-5 sm:h-11 sm:w-11" aria-hidden />
                <div className="absolute bottom-5 left-5 right-5 z-[2] sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-zap-burstLight">Öne çıkan segment</p>
                  <p className="mt-2 text-[clamp(1.25rem,3.5vw,1.65rem)] font-black uppercase leading-tight tracking-tight text-white">
                    Yurtdışında dil okulu · yoğun kurs ve sınav modülleri
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex flex-col lg:col-span-7"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-zap-burstLight backdrop-blur-sm">
                <Languages className="h-4 w-4 text-brand-aqua" strokeWidth={2.25} aria-hidden />
                Dil okulları
              </div>

              <h2 className="mt-6 text-[clamp(1.85rem,4.5vw,2.85rem)] font-black uppercase leading-[0.92]" style={titleDarkOnBand}>
                <span className="text-zap-burst" style={{ ...titleDarkOnBand, color: "#ffb703" }}>
                  Yurtdışında
                </span>
                <span className="mt-1 block text-white">dil eğitimi</span>
              </h2>

              <p className="mt-6 max-w-2xl text-[16px] font-medium leading-relaxed text-white/90 md:text-[17px]">
                Genel İngilizce, akademik İngilizce veya IELTS ve TOEFL odaklı kursları; aile yan konaklama, yurt veya stüdyo
                seçenekleriyle uyumlu planlıyoruz. Hedef ülkeye göre bütçe, süre ve öğrenci vizesi adımlarını danışmanlık dosyanızda
                birlikte netleştiririz.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Yoğun kurs & sınav hazırlığı (IELTS / TOEFL)",
                  "Konaklama ve okul kampüsü seçenekleri",
                  "Başvuru evrakları ve süreç takibi",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] font-semibold leading-snug text-white/92 md:text-[16px]">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-zap-burst bg-zap-burst text-zap-night shadow-[3px_3px_0_rgba(255,255,255,0.12)]">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="pt-1">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border-4 border-white/20 bg-zap-night/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-aqua/95">Popüler destinasyonlar</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dilOkuluUlke.map((u) => (
                    <span
                      key={u}
                      className="rounded-xl border-2 border-white/20 bg-white/[0.07] px-3 py-2 text-[12px] font-black uppercase tracking-wide text-white/95 transition hover:border-zap-burst/80 hover:bg-white/10"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#site-footer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-zap-burst px-10 py-3 text-[13px] font-black uppercase tracking-wide text-zap-night shadow-brutal transition hover:brightness-105"
                >
                  Ayrıntılı bilgi
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
                <a
                  href="#sinavlar"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white/45 bg-transparent px-8 py-3 text-[13px] font-bold text-white transition hover:border-white/70 hover:bg-white/10"
                >
                  Sınav hazırlık bölümü
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* — Neden CG: açık zemin; kırmızı sadece vurgu */}
      <section
        id="neden-campus-global"
        className="relative scroll-mt-24 overflow-hidden border-t border-b border-zap-ink/8 bg-gradient-to-b from-[#fbf9f6] via-[#f3f0ec] to-[#eef8f6] py-16 text-zap-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-20%,rgba(3,214,186,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-aqua/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 translate-y-1/3 rounded-full bg-[#c92a1c]/8 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:repeating-linear-gradient(-12deg,transparent,transparent_48px,rgba(6,50,66,0.03)_48px,rgba(6,50,66,0.03)_49px)]"
          aria-hidden
        />

        <div className={`${inner} relative`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-14">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-zap-ink/12 bg-white/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-brand-teal shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-flame" aria-hidden />
                Campus Global · 26 yıl
              </p>
              <h2 className="mt-6 text-[clamp(1.85rem,5vw,2.9rem)] font-black uppercase leading-[0.9]">
                <span className="block text-zap-ink" style={titleLight}>
                  Aynı masada
                </span>
                <span className="mt-1 block text-brand-flame md:mt-1" style={{ fontFamily: titleLight.fontFamily }}>
                  net karar
                </span>
              </h2>
              <p className="mt-6 text-[16px] font-medium leading-relaxed text-zap-ink/80 md:text-[17px]">
                Başvurudan varışa kısa hatlar, yazılı takip noktaları ve açık sözlü fiyat/ süre sınırları — aileyle
                birlikte planladığımız yol, sürprize yer bırakmaz. Ofiste veya çevrimiçi; tüm ekip aynı notları
                görür, aynı cevabı verir.
              </p>
              <ul className="mt-8 space-y-3.5 border-l-4 border-brand-aqua/50 pl-5 text-[15px] font-semibold text-zap-ink/90">
                <li>
                  <span className="text-brand-flame/90">●</span> Bütçe ve burs seçenekleri kıyaslanır, gizli kalemler
                  açıkça söylenir.
                </li>
                <li>
                  <span className="text-brand-flame/90">●</span> Okul ve ülke shortlist’i sizin önceliklerinizle
                  puanlanır, tek taraflı yönlendirme yok.
                </li>
                <li>
                  <span className="text-brand-flame/90">●</span> Vize ve belge aşamaları için hatırlatma ve “eksik
                  evrak” uyarıları aynı panelde.
                </li>
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.45 }}
                className="relative mt-9 w-full overflow-hidden rounded-2xl border-2 border-zap-ink/10 bg-gradient-to-b from-white to-[#f4faf7] p-0 shadow-[0_1px_0_rgba(6,50,66,0.06),4px_4px_0_rgba(6,50,66,0.06)] ring-1 ring-zap-ink/5"
              >
                <div
                  className="h-1 w-full bg-gradient-to-r from-brand-aqua/90 via-brand-teal/80 to-brand-flame/50"
                  aria-hidden
                />
                <div className="p-4 pt-3.5 sm:p-5 sm:pt-4">
                  <p className="text-[10px] font-black uppercase leading-none tracking-[0.2em] text-brand-teal/95">
                    Toplu görüş
                  </p>
                  <p className="mt-2.5 text-[13.5px] font-medium leading-[1.55] text-zap-ink/85 sm:text-sm">
                    İlk toplantıda bütçe, sınav, hedef ülke ve akademik süre çizelgesini birlikte yazıyoruz; yüz yüze veya
                    çevrimiçi randevuyle başlayabilirsiniz.
                  </p>
                  <a
                    href="#site-footer"
                    className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-zap-ink/90 bg-zap-burst px-4 py-2.5 text-[11px] font-black uppercase leading-none tracking-wide text-zap-night shadow-[3px_3px_0_#063242] transition hover:brightness-105"
                  >
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={2.1} aria-hidden />
                    İletişim &amp; şubeler
                  </a>
                </div>
              </motion.div>
            </motion.header>

            <div className="flex flex-col gap-6 sm:gap-7 lg:col-span-7">
              <figure className="overflow-hidden rounded-2xl border-2 border-zap-ink/10 bg-white/60 shadow-sm ring-1 ring-zap-ink/[0.06] sm:rounded-[1.35rem]">
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-aqua/80 via-brand-teal/60 to-brand-flame/50" aria-hidden />
                <img
                  src={IMG_NEDEN_CG}
                  alt="Aile veya öğrenci ile birlikte danışmanlık — teklif, takvim ve belgelerin aynı masada ele alındığı görüşme"
                  className="aspect-[5/3] w-full object-cover sm:aspect-[2/1] lg:max-h-[min(100%,22rem)] lg:object-cover"
                  width={1000}
                  height={660}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </figure>
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-4">
              {(
                [
                  {
                    t: "Ücret & takvim",
                    d: "Program ücreti, peşinat ve kampüs konaklama bantlarını aynı tabloda; kritik son başvuru tarihleri vurgulu.",
                    Icon: FileText,
                  },
                  {
                    t: "Evrak & başvuru",
                    d: "Motivasyon, referans, transkript — adım adım PDF checklist, müfredat farkı notları tek yerde.",
                    Icon: ClipboardList,
                  },
                  {
                    t: "Vize & yolculuk",
                    d: "Randevu, biyometri, sağlık sigortası: ülke bazlı hatırlatmalar, randevu çakışması uyarıları.",
                    Icon: Plane,
                  },
                  {
                    t: "Varış & oryantasyon",
                    d: "Havalimanı, yurt teslim, banka/ SIM — mini playbook; ilk hafta iletişim hattı net.",
                    Icon: MapPin,
                  },
                  {
                    t: "Eğitimde destek",
                    d: "Ders değişimi, sınav kaydı, danışman görüşmeleri — dönem içi e-posta hattı ve kayıt takip.",
                    Icon: Headphones,
                  },
                  {
                    t: "Güvence & şeffaflık",
                    d: "Sözleşme, iptal/erteleme koşulları ve okul sözleşmeleri önceden paylaşılır; sürpriz fatura yok.",
                    Icon: Shield,
                  },
                ] as { t: string; d: string; Icon: LucideIcon }[]
              ).map((item, j) => {
                const Icon = item.Icon;
                return (
                  <motion.article
                    key={item.t}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: j * 0.05, duration: 0.4 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-zap-ink/10 bg-white p-5 shadow-sm ring-1 ring-zap-ink/5 transition hover:border-brand-teal/30 hover:shadow-md md:p-5"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-flame/80 via-brand-coral/60 to-brand-aqua/70"
                      aria-hidden
                    />
                    <div className="flex items-start gap-3 pt-1">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-zap-ink/8 bg-gradient-to-br from-zap-ink/95 to-zap-ink text-white shadow-[3px_3px_0_rgba(245,29,0,0.35)]">
                        <Icon className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.1} aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-[15px] font-black uppercase leading-tight tracking-tight text-zap-ink sm:text-base">
                          {item.t}
                        </h3>
                        <p className="mt-2 text-[13px] font-medium leading-relaxed text-zap-ink/78 sm:text-[14px]">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Üniversite: canlı kırmızı bant + brutal poster + ülke kartları */}
      <section
        id="universite"
        className="relative scroll-mt-24 overflow-hidden border-t-4 border-zap-ink bg-gradient-to-b from-brand-flame via-[#e32218] to-[#c41a12] py-14 text-white md:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(255,255,255,0.38),transparent_48%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(6,50,66,0.06)_22%,transparent_45%,rgba(255,255,255,0.08)_70%,transparent_100%)]" aria-hidden />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-zap-burst/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-coral/45 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:repeating-linear-gradient(-18deg,transparent,transparent_36px,rgba(255,255,255,0.07)_36px,rgba(255,255,255,0.07)_37px)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0632420d_1px,transparent_1px),linear-gradient(to_bottom,#0632420d_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 mix-blend-overlay" aria-hidden />

        <div className={`${inner} relative`}>
          <div className="relative mb-12 rounded-[1.75rem] border-4 border-zap-ink bg-zap-night/25 p-6 shadow-brutalLg backdrop-blur-md md:mb-14 md:rounded-[2rem] md:p-8 lg:p-10">
            <span className="pointer-events-none absolute left-4 top-4 z-[1] h-9 w-9 border-l-4 border-t-4 border-zap-burst md:left-6 md:top-6 md:h-11 md:w-11" aria-hidden />
            <span className="pointer-events-none absolute bottom-4 right-4 z-[1] h-9 w-9 border-b-4 border-r-4 border-brand-aqua md:bottom-6 md:right-6 md:h-11 md:w-11" aria-hidden />

            <div className="relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <p className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 bg-white/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-zap-burst shadow-[3px_3px_0_rgba(6,50,66,0.35)]">
                  <Building2 className="h-4 w-4 text-brand-aqua" strokeWidth={2.25} aria-hidden />
                  Lisans · Üniversite
                </p>
                <h2 className="mt-6 text-[clamp(1.85rem,4.8vw,3.1rem)] font-black uppercase leading-[0.88] tracking-tighter drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]" style={titleDarkOnBand}>
                  Yurtdışında üniversite: <span className="text-zap-burst">ülkeye göre giriş</span>
                </h2>
                <p className="mt-6 max-w-xl text-[16px] font-semibold leading-relaxed text-white/92 md:max-w-2xl md:text-[17px]">
                  Her ülkenin başvuru takvimi, dil yeterliliği ve finansal ispat kuralları farklıdır. Aşağıdaki kartlar popüler
                  yurtdışı üniversite destinasyonları için özet giriş rehberi sunar; detaylı program ve evrak takibi ilk görüşmede
                  planlanır.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: "Başvuru yolu", href: navBase("universite", "basvuru"), Icon: ClipboardList },
                    { label: "Belgeler", href: navBase("universite", "belgeler"), Icon: FileText },
                    { label: "Burs & bütçe", href: navBase("universite", "burs"), Icon: Sparkles },
                  ].map((x) => {
                    const LinkIcon = x.Icon;
                    return (
                    <a
                      key={x.href}
                      href={x.href}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-zap-ink bg-zap-burst px-4 py-2.5 text-[11px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_#063242] transition hover:brightness-105 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#063242]"
                    >
                      <LinkIcon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      {x.label}
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                    </a>
                  );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="flex min-w-0 flex-col gap-2.5 sm:gap-3 lg:col-span-5"
              >
                {(
                  [
                    {
                      t: "Ülkeye özel rehber",
                      d: "Kartları izleyerek Almanya’dan İngiltere’ye giriş koşulları, sınavlar ve belgeler için özet ve alt sayfa yollarına geçebilirsiniz.",
                      Icon: Globe2,
                    },
                    {
                      t: "Evrak & takip",
                      d: "Motivasyon, transkript, vize eki — tek hatta checklist; kritik tarihlerde hatırlatma.",
                      Icon: ListChecks,
                    },
                    {
                      t: "İngiltere · UCAS",
                      d: "Başvuru penceresi, firm choice ve foundation / doğrudan lisans senaryoları aynı masada.",
                      Icon: CalendarDays,
                    },
                    {
                      t: "Bütçe & yaşam",
                      d: "Yıllık harç, konaklama tipi ve şehre göre aylık yaşam — önce şeffaf tablo, sürpriz yok.",
                      Icon: Wallet,
                    },
                  ] as const
                ).map((box) => {
                  const BoxIcon = box.Icon;
                  return (
                    <div
                      key={box.t}
                      className="flex min-h-0 min-w-0 items-start gap-3.5 rounded-2xl border-2 border-zap-ink bg-white/95 p-3.5 text-zap-ink shadow-[5px_5px_0_#063242] sm:items-center sm:gap-4 sm:p-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink/12 bg-gradient-to-br from-brand-aqua/18 to-white shadow-sm sm:h-[3.25rem] sm:w-[3.25rem]">
                        <BoxIcon className="h-6 w-6 text-brand-teal" strokeWidth={2.1} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-black uppercase leading-snug tracking-wide text-zap-night sm:text-[13px]">
                          {box.t}
                        </p>
                        <p className="mt-1 text-[12px] font-medium leading-relaxed text-zap-ink/80 sm:text-[13px]">
                          {box.d}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-dashed border-white/35 pb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">Destinasyon grid</p>
            <span className="hidden items-center gap-2 text-[12px] font-bold text-white/80 sm:flex">
              <Sparkles className="h-4 w-4 text-zap-burst" aria-hidden />
              Tıkla — ülke sayfasına git
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {universiteUlke.map((u, j) => {
              const stripes = [
                "from-brand-aqua via-brand-teal to-brand-aqua",
                "from-zap-burst via-amber-400 to-zap-burst",
                "from-brand-flame via-brand-coral to-brand-aqua",
              ] as const;
              const stripe = stripes[j % 3];
              const num = String(j + 1).padStart(2, "0");
              return (
                <motion.a
                  key={u.ulke}
                  href={navBase("universite", u.slug)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: j * 0.05, duration: 0.42 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-gradient-to-b from-white to-[#eef8f6] text-zap-ink shadow-brutal transition md:rounded-[1.35rem] ${reduceMotion ? "" : "hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-brutalLg"}`}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stripe}`} aria-hidden />
                  <span className="pointer-events-none absolute bottom-3 right-3 font-black tabular-nums text-[clamp(3.5rem,10vw,4.5rem)] leading-none text-zap-ink/[0.06]" aria-hidden>
                    {num}
                  </span>
                  <span className="pointer-events-none absolute left-3 top-9 h-6 w-6 border-l-2 border-t-2 border-zap-ink/25 md:left-4 md:top-10" aria-hidden />
                  <span className="pointer-events-none absolute bottom-16 right-3 h-6 w-6 border-b-2 border-r-2 border-brand-aqua/40 md:bottom-[4.5rem] md:right-4" aria-hidden />

                  <div className="relative flex flex-1 flex-col p-5 pb-0 md:p-6 md:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink bg-gradient-to-br from-brand-aqua to-brand-teal text-white shadow-md">
                          <GraduationCap className="h-7 w-7" strokeWidth={2.25} aria-hidden />
                          <span className="absolute -right-1 -top-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border-2 border-zap-ink bg-zap-burst px-1 text-[10px] font-black text-zap-night">
                            {num}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[18px] font-black uppercase leading-tight tracking-tight text-zap-night md:text-[19px]">{u.ulke}</h3>
                          <p className="mt-2 inline-block max-w-full rounded-lg border border-brand-teal/25 bg-brand-teal/10 px-2.5 py-1 text-[10px] font-black uppercase leading-snug tracking-wide text-brand-teal">
                            {u.ozet}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="mt-1 h-6 w-6 shrink-0 text-zap-ink/30 transition group-hover:translate-x-0.5 group-hover:text-brand-flame" aria-hidden />
                    </div>
                    <p className="mt-4 text-[14px] font-semibold leading-relaxed text-zap-ink/88">{u.not}</p>
                    <ul className="mt-4 space-y-2.5 border-t border-dashed border-zap-ink/15 pt-4">
                      {u.madde.map((line) => (
                        <li key={line} className="flex gap-2.5 text-[13px] font-semibold leading-snug text-zap-ink/90">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink/15 bg-brand-aqua/15 text-brand-teal">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative mt-5 flex items-center justify-between gap-2 border-t-2 border-zap-ink/10 bg-gradient-to-r from-zap-burst/95 via-zap-burst to-amber-400/90 px-5 py-3.5 md:px-6">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-zap-night">Ülke rehberi</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-zap-night transition group-hover:translate-x-1" aria-hidden />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* — Burst band: sınavlar */}
      <section id="sinavlar" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-zap-burstLight via-brand-aqua/95 to-brand-teal py-16 text-zap-ink md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.55),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(-45deg,#063242_0,#063242_1px,transparent_1px,transparent_14px)]" />
        <div className={`${inner} relative`}>
          <div className="relative mb-10 overflow-hidden rounded-[1.75rem] border-4 border-zap-ink bg-gradient-to-br from-white via-white to-[#e8fbf8] p-6 shadow-brutalLg md:mb-12 md:rounded-[2rem] md:p-8">
            <span className="pointer-events-none absolute left-4 top-4 z-[1] h-8 w-8 border-l-[3px] border-t-[3px] border-zap-burst md:left-5 md:top-5 md:h-9 md:w-9" aria-hidden />
            <span className="pointer-events-none absolute bottom-4 right-4 z-[1] h-8 w-8 border-b-[3px] border-r-[3px] border-brand-teal md:bottom-5 md:right-5 md:h-9 md:w-9" aria-hidden />
            <div className="relative z-[2] grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full border-2 border-zap-ink/12 bg-zap-burst/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-zap-night shadow-[3px_3px_0_#063242]">
                  <Headphones className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  Hedef puan &amp; prova hattı
                </p>
                <h2 className="mt-5 text-[clamp(1.85rem,4.5vw,3rem)] font-black uppercase leading-[0.9] tracking-tighter" style={titleLight}>
                  <span className="block text-zap-night">Programına göre</span>
                  <span className="mt-1.5 block text-white [text-shadow:2px_2px_0_#063242,4px_4px_0_rgba(3,91,75,0.4)]" style={titleHero}>
                    net sınav planı
                  </span>
                </h2>
                <p className="mt-6 max-w-2xl text-[15px] font-semibold leading-relaxed text-zap-ink/90 md:text-[16px]">
                  IELTS, TOEFL, SAT ve GRE/GMAT hazırlığında tek başına “ders saati” değil; <span className="font-black text-zap-night">hedef band veya skor</span>,{" "}
                  <span className="font-black text-zap-night">üniversitenin dil veya test eşiği</span> ve{" "}
                  <span className="font-black text-zap-night">yeniden sınav tarihleri</span> başvuru takviminize bağlanır. Özet kartların
                  altında ilk görüşmede seans ve prova planı netleşir.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
                {(
                  [
                    { t: "Hedef band", dot: "bg-brand-flame" },
                    { t: "Prova turları", dot: "bg-zap-burst" },
                    { t: "Okul eşiği", dot: "bg-brand-teal" },
                    { t: "Ücretsiz ön soru", dot: "bg-brand-aqua" },
                  ] as const
                ).map((chip) => (
                  <span
                    key={chip.t}
                    className="inline-flex min-h-[2.5rem] items-center gap-2.5 rounded-xl border-2 border-zap-ink bg-white px-3.5 py-2 text-[11px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_#063242] sm:px-4"
                  >
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${chip.dot} ring-2 ring-zap-ink/20`} aria-hidden />
                    {chip.t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-3 border-b-2 border-dashed border-zap-ink/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-zap-ink/60">Sınav vitrini</p>
              <p className="mt-1 text-[13px] font-bold text-zap-ink/80">4 ana hat · kartta özet, görüşmede detay &amp; takvim</p>
            </div>
            <a
              href="#site-footer"
              className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-zap-ink bg-zap-burst px-4 py-2.5 text-[11px] font-black uppercase tracking-wide text-zap-night shadow-brutal transition hover:brightness-105"
            >
              Takvim netleştir
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {sinavlar.map((s, j) => {
              const meta = [
                { stripe: "from-brand-flame via-brand-coral to-brand-aqua" as const, Icon: BookOpen as LucideIcon },
                { stripe: "from-zap-burst via-amber-400 to-brand-aqua" as const, Icon: Laptop },
                { stripe: "from-brand-aqua via-violet-500 to-fuchsia-600" as const, Icon: Pencil },
                { stripe: "from-brand-teal via-cyan-400 to-violet-500" as const, Icon: TrendingUp },
              ][j] ?? { stripe: "from-brand-aqua to-brand-teal" as const, Icon: Sparkles };
              const CardIcon = meta.Icon;
              const num = String(j + 1).padStart(2, "0");
              return (
                <motion.div
                  key={s.kod}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ delay: j * 0.07, duration: 0.45 }}
                  className={`group relative overflow-hidden rounded-[1.35rem] border-4 border-zap-ink bg-gradient-to-b from-white to-[#f0fdf9] text-zap-ink shadow-brutal transition md:rounded-2xl ${reduceMotion ? "" : "hover:-translate-y-1 hover:rotate-[0.3deg] hover:shadow-brutalLg"}`}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${meta.stripe}`} aria-hidden />
                  <span
                    className="pointer-events-none absolute bottom-16 right-2 font-black tabular-nums text-[clamp(3rem,9vw,4.25rem)] leading-none text-zap-ink/[0.05] sm:bottom-20 sm:right-4"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <span className="pointer-events-none absolute left-3 top-8 h-5 w-5 border-l-2 border-t-2 border-zap-ink/20" aria-hidden />
                  <div className="relative p-6 md:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink bg-gradient-to-br from-brand-aqua/25 to-white shadow-sm">
                          <CardIcon className="h-7 w-7 text-brand-teal" strokeWidth={2.1} aria-hidden />
                          <span className="absolute -right-1 -top-1 flex min-w-[1.35rem] items-center justify-center rounded-full border-2 border-zap-ink bg-zap-burst px-1.5 text-[9px] font-black text-zap-night">
                            {num}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[19px] font-black uppercase leading-none tracking-tight text-zap-night sm:text-[20px]">
                            {s.kod}
                          </h3>
                          <p className="mt-1.5 text-[11px] font-bold leading-snug text-zap-ink/70">{s.rol}</p>
                        </div>
                      </div>
                      <Sparkles className="h-5 w-5 shrink-0 text-zap-ink/25" aria-hidden />
                    </div>
                    <p className="mt-4 text-[14px] font-bold leading-relaxed text-zap-ink sm:text-[15px]">{s.aciklama}</p>
                    <ul className="mt-4 space-y-2 border-t-2 border-dashed border-zap-ink/12 pt-4">
                      {s.maddeler.map((m) => (
                        <li key={m} className="flex gap-2.5 text-[12px] font-semibold leading-snug text-zap-ink/92 sm:text-[13px]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-zap-ink/10 bg-white text-brand-teal shadow-sm">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-zap-ink/8 bg-gradient-to-r from-zap-burst/95 via-zap-burst to-amber-200/90 px-6 py-3.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zap-night">Görüşme · hedef &amp; seans</span>
                    <ChevronRight className="h-4 w-4 text-zap-night opacity-80 transition group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* — Fiyatlar: üç bant üst + “bilet” satırları; tablo / 2’li eşit blok yok */}
      <section
        id="fiyatlar"
        className="relative scroll-mt-24 overflow-hidden border-t-4 border-zap-ink/10 py-16 md:py-20"
        aria-labelledby="fiyatlar-heading"
      >
        {/* Arka plan: taban + mesh + ızgara + hafif animasyonlu blob’lar (içerik z-10) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#e6f5f1] via-[#fbfffe] to-[#e8f4ef]" />
          <div
            className="absolute inset-0 opacity-[0.97] mix-blend-multiply"
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 85% 60% at 12% 8%, rgba(3,214,186,0.26) 0%, transparent 55%)",
                "radial-gradient(ellipse 70% 50% at 98% 12%, rgba(255,183,3,0.2) 0%, transparent 50%)",
                "radial-gradient(ellipse 55% 45% at 88% 88%, rgba(0,163,155,0.16) 0%, transparent 48%)",
                "radial-gradient(ellipse 50% 40% at 0% 85%, rgba(139,92,246,0.1) 0%, transparent 45%)",
                "radial-gradient(ellipse 40% 35% at 50% 100%, rgba(3,214,186,0.12) 0%, transparent 42%)",
              ].join(", "),
            }}
          />
          <div
            className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(6,50,66,0.028)_40px,rgba(6,50,66,0.028)_41px)] [mask-image:linear-gradient(180deg,black_0%,black_70%,transparent_100%)]"
          />
          <div
            className="absolute inset-0 bg-[repeating-linear-gradient(124deg,transparent,transparent_72px,rgba(6,50,66,0.02)_72px,rgba(6,50,66,0.02)_73px)] mix-blend-soft-light [mask-image:linear-gradient(135deg,black,transparent_85%)] opacity-80"
          />
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-aqua/18 blur-3xl motion-safe:animate-pulse [animation-duration:6.5s] motion-reduce:animate-none" />
          <div className="absolute -right-10 top-[22%] h-72 w-72 rounded-full bg-violet-400/14 blur-3xl motion-safe:animate-pulse [animation-delay:0.8s] [animation-duration:5.2s] motion-reduce:animate-none" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-zap-burst/12 blur-3xl motion-safe:animate-pulse [animation-delay:1.4s] [animation-duration:4.8s] motion-reduce:animate-none" />
          <div className="absolute bottom-[5%] left-[12%] h-64 w-64 rounded-full bg-brand-teal/12 blur-3xl motion-safe:animate-pulse [animation-delay:0.3s] [animation-duration:7s] motion-reduce:animate-none" />
          <div className="absolute left-[40%] top-[55%] h-40 w-40 -translate-x-1/2 rounded-full bg-amber-300/10 blur-2xl motion-safe:animate-pulse [animation-delay:2.1s] [animation-duration:5.5s] motion-reduce:animate-none" />
          <div className="absolute left-[5%] top-[18%] h-2.5 w-2.5 rotate-12 border-2 border-zap-ink/10 bg-zap-burst/30 shadow-sm" />
          <div className="absolute right-[10%] top-[32%] h-2 w-2 -rotate-6 border-2 border-zap-ink/12 bg-brand-aqua/35" />
          <div className="absolute bottom-[24%] right-[18%] h-2.5 w-2.5 border-2 border-zap-ink/10 bg-violet-400/25" />
          <div className="absolute left-[16%] bottom-[12%] h-1.5 w-6 -rotate-[18deg] rounded-full bg-zap-ink/[0.07]" />
        </div>

        <div className={`${inner} relative z-10`}>
          <motion.div
            className="mb-10 overflow-hidden rounded-2xl border-4 border-zap-ink shadow-brutalLg md:mb-12"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col justify-between gap-3 border-b-2 border-zap-ink/20 bg-zap-ink p-5 sm:p-6 md:flex-row md:items-center md:gap-6 lg:px-9 lg:py-6">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-zap-burstLight">
                  <Banknote className="h-4 w-4 text-zap-burst" strokeWidth={2.1} aria-hidden />
                  Bütçe
                </p>
                <h2
                  id="fiyatlar-heading"
                  className="mt-2.5 text-[clamp(1.4rem,3.4vw,2.15rem)] font-black uppercase leading-[0.98] tracking-tight"
                  style={titleDarkOnBand}
                >
                  Yurtdışı dil okulu için örnek fiyat <span className="text-zap-burst">bantları</span>
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2.5 sm:shrink-0">
                {[
                  { t: "Kur: ofis notu" },
                  { t: "Kalemler ayrı" },
                  { t: `${fiyatKampanya.length} bant` },
                ].map((c) => (
                  <span
                    key={c.t}
                    className="inline-flex min-h-9 items-center justify-center rounded-full border-2 border-zap-burst/30 bg-zap-ink/20 px-3.5 text-[9px] font-black uppercase tracking-wide text-zap-burstLight/95"
                  >
                    {c.t}
                  </span>
                ))}
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-zap-burst bg-zap-burst px-3.5 py-1.5 text-[10px] font-black uppercase text-zap-night"
                  title="Güncel teklif görüşmede netleşir"
                >
                  {!reduceMotion && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zap-night/45" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-zap-night" />
                    </span>
                  )}
                  {reduceMotion && <span className="h-2.5 w-2.5 rounded-full bg-zap-night" aria-hidden />}
                  Canlı bant
                </span>
              </div>
            </div>
            <div
              className="h-2.5 w-full bg-gradient-to-r from-brand-aqua via-zap-burst to-violet-500"
              aria-hidden
            />
            <div className="grid gap-5 border-t-0 bg-gradient-to-br from-white to-[#eef8f4] p-5 sm:grid-cols-12 sm:p-6 sm:items-center lg:gap-6 lg:px-9 lg:py-7">
              <p className="text-[15px] font-bold leading-relaxed text-zap-ink sm:col-span-7 sm:text-[15px]">
                Gördüğünüz <span className="font-black text-zap-night">₺ ile gösterilen aralıklar örnektir</span>; güncel kampanya ve kur görüşmede yazılır.
                Her kutuda şehir, konaklama ve yoğunluk gibi fiyatı etkileyen başlıkları açıklıyoruz — yurtdışında dil eğitimi bütçenizi böyle kuruyoruz.
              </p>
              <a
                href="#site-footer"
                className="sm:col-span-5 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-zap-ink bg-zap-burst px-5 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_#063242] transition hover:translate-x-0.5 hover:shadow-brutal sm:justify-center sm:justify-self-end sm:max-w-sm sm:py-0"
              >
                Bütçe hattı
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </div>
          </motion.div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-[1.1rem] top-3 -z-0 hidden h-[calc(100%-1.5rem)] w-px -translate-x-0.5 bg-gradient-to-b from-brand-aqua/50 via-zap-burst/40 to-violet-400/45 sm:block"
              aria-hidden
            />
            <ol className="relative m-0 list-none space-y-5 p-0 pl-0">
            {fiyatKampanya.map((f, j) => {
              const hair = [
                "from-brand-aqua via-cyan-400 to-brand-teal",
                "from-amber-300 via-zap-burst to-amber-200",
                "from-brand-coral/95 via-rose-300/90 to-zap-burst/90",
                "from-violet-500/90 to-fuchsia-500/80",
              ][j % 4] as string;
              const n = String(j + 1).padStart(2, "0");
              return (
                <motion.li
                  key={f.ulke}
                  initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: j % 2 ? -0.35 : 0.4 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-8%", amount: 0.25 }}
                  transition={
                    !reduceMotion
                      ? { type: "spring", stiffness: 140, damping: 19, mass: 0.85, delay: j * 0.1 }
                      : { duration: 0.2 }
                  }
                  className="relative pl-0 sm:pl-10"
                >
                  <span
                    className="mb-1 inline-flex w-9 justify-center text-[10px] font-mono font-black text-zap-ink/30 sm:absolute sm:-left-1.5 sm:top-3 sm:mb-0"
                    aria-hidden
                  >
                    {n}→
                  </span>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border-4 border-zap-ink bg-white shadow-brutal transition ${reduceMotion ? "" : "hover:-translate-y-1 hover:rotate-[0.2deg] hover:shadow-brutalLg"}`}
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${hair}`} aria-hidden />
                    <div className="p-4 sm:grid sm:grid-cols-[1fr_minmax(0,11rem)] sm:gap-5 sm:p-5">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3 sm:pr-0">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase leading-none tracking-wider text-zap-ink/50">
                              Ülke · bölge
                            </p>
                            <p className="mt-1.5 text-lg font-black uppercase leading-none text-zap-night sm:text-[1.35rem]">
                              {f.ulke}
                            </p>
                            <p className="mt-2.5 text-[12px] font-bold leading-relaxed text-zap-ink/70">{f.bolgeNot}</p>
                          </div>
                          <span
                            className="shrink-0 rounded-md border-2 border-zap-ink/20 bg-zap-burst/30 px-2.5 py-0.5 text-[10px] font-black uppercase text-zap-night"
                            title="Fiyatlama birimi"
                          >
                            {f.birim === "hafta" ? "Hafta" : "Ay"} bazlı
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col items-stretch border-t-2 border-dashed border-zap-ink/10 pt-3 sm:mt-0 sm:border-t-0 sm:items-end sm:justify-center sm:pt-0 sm:text-right">
                        <p className="text-[9px] font-black uppercase leading-none text-zap-ink/50">örnek bant</p>
                        <p
                          className="mt-1.5 break-words font-mono text-[0.9rem] font-black text-brand-teal sm:text-right sm:text-lg"
                          style={{ lineHeight: 1.15 }}
                        >
                          {f.aralik}
                        </p>
                      </div>
                    </div>
                    <div className="border-t-2 border-zap-ink/8 bg-zap-burst/10 px-4 py-3.5 sm:px-5 sm:py-4">
                      <p className="text-[14px] font-semibold leading-relaxed text-zap-ink/88">{f.not}</p>
                      <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
                        {f.maddeler.map((m) => (
                          <span
                            key={m}
                            className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border-2 border-zap-ink/20 bg-white px-3.5 py-1.5 text-left text-[12px] font-extrabold text-zap-ink/80 shadow-sm"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" aria-hidden />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
            </ol>
          </div>

          <p className="mx-auto mt-9 max-w-2xl text-center text-[13px] font-semibold leading-relaxed text-zap-ink/55">
            Kur veya kampanya o turda bilet üzerine yazılır; aynı öğrenci dosyasında kalem ayrımları kaybolmaz.
          </p>
        </div>
      </section>

      {/* — Yüksek lisans: brutal poster + zengin kartlar + hedef pazar stack */}
      <section
        id="yuksek-lisans"
        className="relative scroll-mt-24 overflow-hidden bg-zap-ink py-16 text-white md:py-20 lg:py-24"
        aria-labelledby="yuksek-lisans-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_60%_at_20%_0%,rgba(3,214,186,0.14),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_100%_20%,rgba(255,24,0,0.1),transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-28 top-8 h-[28rem] w-[28rem] rounded-full bg-zap-burst/18 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-aqua/14 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:1.75rem_1.75rem] opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:repeating-linear-gradient(-18deg,transparent,transparent_40px,rgba(255,255,255,0.04)_40px,rgba(255,255,255,0.04)_41px)]"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none font-black tabular-nums text-[clamp(6rem,22vw,14rem)] leading-none text-white/[0.04] sm:block"
          aria-hidden
        >
          02
        </span>

        <div className={`${inner} relative z-[1]`}>
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <div className="relative lg:col-span-6 xl:col-span-7">
              <span
                className="pointer-events-none absolute -left-1 top-0 font-mono text-[9rem] font-black leading-none text-white/[0.05] sm:text-[11rem]"
                aria-hidden
              >
                02
              </span>
              <div className="relative rounded-[1.75rem] border-4 border-white/20 bg-zap-night/35 p-6 shadow-brutalLg backdrop-blur-sm md:rounded-[2rem] md:p-8">
                <span
                  className="pointer-events-none absolute left-4 top-4 z-[1] h-8 w-8 border-l-4 border-t-4 border-zap-burst md:left-5 md:top-5 md:h-10 md:w-10"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-4 right-4 z-[1] h-8 w-8 border-b-4 border-r-4 border-brand-aqua/70 md:bottom-5 md:right-5 md:h-10 md:w-10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-zap-burst via-brand-coral/90 to-brand-aqua"
                  aria-hidden
                />

                <div className="relative z-[2]">
                  <p className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-zap-burst/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zap-burstLight shadow-[2px_2px_0_rgba(0,0,0,0.35)]">
                    <Award className="h-3.5 w-3.5 text-zap-burst" strokeWidth={2.2} aria-hidden />
                    Yüksek lisans
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                    {["MSc / MA", "MBA", "Araştırma", "Mezuniyet PSW"].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex min-h-8 items-center rounded-lg border-2 border-white/20 bg-zap-ink/50 px-3 text-[9px] font-black uppercase leading-none tracking-wide text-white/90 sm:text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    id="yuksek-lisans-heading"
                    className="relative z-[1] mt-5 text-[clamp(1.75rem,4.2vw,2.9rem)] font-black uppercase leading-[0.9] tracking-tight md:mt-6"
                    style={titleDarkOnBand}
                  >
                    <span className="relative inline-block pl-0">
                      <span
                        className="absolute -left-0.5 top-1.5 h-[calc(100%-0.4rem)] w-1.5 -translate-x-full bg-gradient-to-b from-zap-burst via-amber-300 to-brand-coral/90"
                        aria-hidden
                      />
                      <span className="block pl-0">MSc · MBA · doktora</span>
                    </span>
                    <span
                      className="mt-2.5 block bg-gradient-to-r from-zap-burst via-amber-200 to-zap-burstLight bg-clip-text text-[1.1em] text-transparent [text-shadow:none] sm:mt-3"
                    >
                      yurtdışı yüksek lisans planı
                    </span>
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-white/78 sm:text-base">
                    Yurtdışında yüksek lisans ve MBA başvurularında araştırma çıkarımından essay turlarına, burs ve asistanlık
                    senaryolarından mezuniyet sonrası çalışma izni özetlerine kadar tek danışmanlık dosyasında ilerliyoruz. Okul
                    listesi; akademik uyum ve kariyer hedefinize göre, tek taraflı yönlendirme olmadan oluşturulur.
                  </p>

                  <div className="mt-8 space-y-4 sm:mt-9">
                    {(
                      [
                        {
                          t: "Program uyumu ve araştırma çıkarımı",
                          stripe: "from-brand-aqua to-brand-teal",
                          Icon: BookOpen,
                        },
                        { t: "Essay ve mülakatta çok tur geri bildirim", stripe: "from-zap-burst to-amber-500", Icon: Pencil },
                        {
                          t: "Mezuniyet sonrası oturum politikalarına göre ön bilgi",
                          stripe: "from-brand-coral/90 to-brand-flame/80",
                          Icon: TrendingUp,
                        },
                      ] as const
                    ).map((row, j) => {
                      const RowIcon = row.Icon;
                      return (
                        <motion.div
                          key={row.t}
                          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-24px" }}
                          transition={{ delay: j * 0.07, duration: 0.42, ease: heroEase }}
                          className={`group relative flex gap-0 overflow-hidden rounded-2xl border-2 border-white/20 bg-zap-ink/45 pl-0 pr-0 shadow-[5px_5px_0_rgba(255,183,3,0.2)] sm:rounded-2xl ${reduceMotion ? "" : "hover:border-zap-burst/50 hover:shadow-[6px_6px_0_rgba(255,183,3,0.32)]"}`}
                        >
                          <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-aqua/40 via-zap-burst/30 to-brand-flame/30 opacity-0 transition group-hover:opacity-100"
                            aria-hidden
                          />
                          <div
                            className={`w-1.5 shrink-0 self-stretch bg-gradient-to-b ${row.stripe} shadow-[0_0_20px_rgba(255,183,3,0.15)]`}
                            aria-hidden
                          />
                          <div className="flex min-w-0 flex-1 items-start justify-between gap-2 py-3.5 pl-3.5 pr-2 sm:gap-3 sm:py-4 sm:pl-4 sm:pr-3">
                            <div className="flex min-w-0 items-start gap-2.5 sm:gap-3.5">
                              <span
                                className="mt-0.5 font-mono text-xs font-black leading-none text-zap-burst/90"
                                aria-hidden
                              >
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              <p className="text-[13.5px] font-bold leading-snug text-white/92 sm:text-[15px]">
                                {row.t}
                              </p>
                            </div>
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-white/15 bg-gradient-to-br from-white/12 to-zap-ink/80 text-zap-burst shadow-sm">
                              <RowIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <a
                    href="#site-footer"
                    className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-4 border-white/30 bg-brand-flame px-5 text-center text-xs font-black uppercase leading-none tracking-wide text-white shadow-[6px_6px_0_rgba(0,0,0,0.5)] transition hover:brightness-110 sm:mt-9 sm:justify-center sm:px-8 md:w-auto"
                  >
                    Detaylı bilgi <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-1 rounded-[1.5rem] bg-gradient-to-br from-zap-burst/40 via-brand-coral/15 to-brand-aqua/30 opacity-90 blur-sm"
                  aria-hidden
                />
                <div
                  className="relative overflow-hidden rounded-[1.4rem] border-4 border-zap-ink bg-zap-night shadow-brutalLg ring-1 ring-zap-burst/20"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1.5 bg-gradient-to-r from-zap-burst via-brand-coral/90 to-brand-aqua"
                    aria-hidden
                  />
                  <div className="absolute left-2 right-2 top-3 z-[2] sm:left-3 sm:top-4 sm:right-3">
                    <div className="flex items-start justify-end gap-2 sm:items-center sm:justify-between">
                      <span
                        className="hidden max-w-[55%] text-[9px] font-bold uppercase leading-tight text-white/70 sm:line-clamp-2 sm:inline"
                        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
                      >
                        Global ağ &amp; araştırma
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full border-2 border-zap-ink/30 bg-zap-burst px-2.5 py-1 text-[8px] font-black uppercase text-zap-night shadow-brutal sm:gap-1.5 sm:px-3 sm:text-[9px]"
                        style={{ boxShadow: "3px 3px 0 #063242" }}
                      >
                        <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden />
                        YL+
                      </span>
                    </div>
                  </div>
                  <img
                    src={IMG_YUKSEK}
                    alt="Yurtdışında yüksek lisans ve kariyer ağı"
                    className="relative z-[1] aspect-[4/5] min-h-[18rem] w-full object-cover sm:aspect-[3/4] sm:min-h-[22rem] lg:min-h-[26rem]"
                    width={1100}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-zap-ink via-zap-ink/65 to-zap-ink/5"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 left-0 right-0 z-[2] border-t-2 border-dashed border-zap-burst/35 bg-zap-ink/88 p-4 backdrop-blur-sm sm:p-5 md:px-6">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[9px] font-black uppercase leading-none tracking-[0.2em] text-zap-burst sm:text-[10px]">
                        Hedef pazar
                      </p>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-zap-burst/40 to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {yuksekLisansUlke.map((u) => (
                        <span
                          key={u}
                          className="rounded-md border-2 border-white/20 bg-zap-ink/90 px-2.5 py-1.5 text-[9px] font-black uppercase leading-none text-white/95 shadow-[2px_2px_0_rgba(0,0,0,0.4)] sm:px-3 sm:text-[11px] sm:leading-tight"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="pointer-events-none absolute bottom-28 right-2 z-[0] font-black tabular-nums text-[3.5rem] leading-none text-zap-burst/[0.15] sm:bottom-32 sm:text-[4.5rem] md:bottom-36"
                    aria-hidden
                  >
                    02
                  </span>
                  <span
                    className="pointer-events-none absolute left-3 top-9 z-[2] h-8 w-8 border-l-2 border-t-2 border-zap-burst sm:left-4 sm:top-10 sm:h-9 sm:w-9"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute bottom-40 right-3 z-[2] h-5 w-5 border-b-2 border-r-2 border-brand-aqua/50 sm:bottom-44"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-10 border-t-2 border-dashed border-white/20 pt-6 md:mt-12 md:pt-7"
          >
            <p className="mb-3.5 text-center text-[9px] font-black uppercase tracking-[0.3em] text-zap-burstLight/90">
              Aynı dosyada · aynı ritim
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { t: "Supervisor eşleşmesi", Icon: GraduationCap },
                { t: "Essay turları", Icon: Pencil },
                { t: "Burs + GA tablosu", Icon: Wallet },
                { t: "Görüşme iskeleti", Icon: Headphones },
              ].map((chip) => {
                const CIcon = chip.Icon;
                return (
                  <span
                    key={chip.t}
                    className="inline-flex items-center gap-1.5 rounded-lg border-2 border-white/15 bg-white/[0.08] px-2.5 py-2 text-[9px] font-bold uppercase text-white/88 shadow-[2px_2px_0_rgba(0,0,0,0.3)] sm:gap-2 sm:px-3 sm:text-[10px]"
                  >
                    <CIcon className="h-3.5 w-3.5 shrink-0 text-zap-burst" strokeWidth={2.1} aria-hidden />
                    {chip.t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* — Haberler: açık zemin */}
      <section
        id="haberler"
        className="relative scroll-mt-24 overflow-hidden border-t-4 border-zap-ink/10 bg-gradient-to-b from-[#f0faf7] via-white to-[#e8f5f0] py-16 text-zap-ink md:py-20"
        aria-labelledby="haberler-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_30%_0%,rgba(3,214,186,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-zap-burst/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_48px,rgba(6,50,66,0.04)_48px,rgba(6,50,66,0.04)_49px)] [mask-image:linear-gradient(180deg,black,transparent_95%)] opacity-50"
          aria-hidden
        />

        <div className={`${inner} relative z-[1]`}>
                <div className="mb-8 flex flex-col gap-4 border-b-2 border-dashed border-zap-ink/12 pb-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-9 md:mb-12">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-flame" aria-hidden />
                        <Newspaper className="h-3.5 w-3.5 text-zap-ink" strokeWidth={2.1} aria-hidden />
                        İçerik
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border-2 border-zap-ink/12 bg-zap-burst/90 px-2.5 py-0.5 text-[8px] font-black uppercase text-zap-night shadow-sm"
                        title="Yeni parçalar eklenecek"
                      >
                        {!reduceMotion && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-zap-ink/35" />
                            <span className="h-1.5 w-1.5 rounded-full bg-zap-ink" />
                          </span>
                        )}
                        {reduceMotion && <span className="h-1.5 w-1.5 rounded-full bg-zap-ink" aria-hidden />}
                        Taze içerik
                      </span>
                    </div>
                    <h2
                      id="haberler-heading"
                      className="mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] font-black uppercase leading-[0.95] sm:text-[clamp(1.55rem,4vw,2.4rem)]"
                      style={titleLight}
                    >
                      Yurtdışı eğitim <span className="text-brand-flame">rehberleri</span>
                    </h2>
                    <p className="mt-2.5 max-w-2xl text-[14px] font-medium leading-relaxed text-zap-ink/80">
                      Dil okulu, üniversite başvurusu ve sınav planına dair blog ve rehber özetleri; yakında tam makale sayfalarıyla
                      arama motorlarında daha zengin indeks oluşturacağız.
                    </p>
                  </div>
                  <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-2xl border-4 border-zap-ink bg-white px-4 py-2.5 text-center text-[10px] font-black uppercase leading-tight text-zap-ink shadow-brutal sm:px-5 sm:text-[11px] sm:leading-none">
                    Blog
                    <span className="text-zap-ink/30" aria-hidden>
                      ·
                    </span>{" "}
                    şehir
                    <span className="text-zap-ink/30" aria-hidden>
                      ·
                    </span>{" "}
                    üniversite
                  </span>
                </div>

                <motion.a
                  href="#haberler"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: heroEase }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-white shadow-brutalLg md:min-h-[16rem] md:flex-row ${
                    reduceMotion ? "" : "hover:-translate-y-0.5 hover:shadow-brutal"
                  } `}
                >
                  <div className="pointer-events-none absolute left-0 top-0 z-[2] h-1.5 w-full max-w-md bg-gradient-to-r from-brand-aqua via-brand-flame/90 to-zap-burst" aria-hidden />
                  <div className="absolute bottom-4 right-3 z-[1] font-black tabular-nums text-[3.2rem] leading-none text-zap-ink/[0.06] sm:bottom-5 sm:right-5 sm:text-[4.5rem]">
                    01
                  </div>
                  <div className="relative w-full min-h-[12rem] shrink-0 sm:min-h-[14rem] md:w-[min(50%,32rem)] md:min-h-0">
                    <img
                      src={haberVitrin.img}
                      alt=""
                      className={`h-full w-full min-h-[12rem] object-cover sm:min-h-[14rem] ${reduceMotion ? "" : "transition duration-500 group-hover:scale-[1.04]"}`}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zap-ink/45 via-zap-ink/5 to-transparent md:hidden"
                      aria-hidden
                    />
                    <span className="absolute left-3 top-3 z-[2] rounded-md border-2 border-zap-ink bg-zap-burst px-2.5 py-0.5 text-[9px] font-black uppercase text-zap-night shadow-[2px_2px_0_#063242] sm:text-[10px]">
                      {haberVitrin.kategori}
                    </span>
                    <span
                      className="pointer-events-none absolute left-3 top-3 z-[0] h-5 w-5 border-l-2 border-t-2 border-white/40"
                      aria-hidden
                    />
                  </div>
                  <div className="relative z-[1] flex flex-1 flex-col justify-center p-5 sm:p-6 md:py-6 md:pr-8">
                    <h3 className="text-[1.1rem] font-black uppercase leading-tight text-zap-night sm:text-lg md:text-xl">
                      {haberVitrin.baslik}
                    </h3>
                    <p className="mt-2.5 text-[14px] font-semibold leading-relaxed text-zap-ink/80 sm:mt-3 sm:text-[15px]">
                      {haberVitrin.ozet}
                    </p>
                    <span className="mt-4 inline-flex w-fit items-center gap-2 text-[12px] font-black uppercase text-brand-flame sm:mt-5">
                      Oku
                      <ChevronRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        aria-hidden
                        strokeWidth={2.4}
                      />
                    </span>
                  </div>
                </motion.a>

                <div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5 lg:mt-8 lg:grid-cols-3">
                  {haberDiger.map((b, j) => (
                    <motion.a
                      key={b.baslik}
                      href="#haberler"
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: j * 0.07, duration: 0.4, ease: heroEase }}
                      className={`group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-gradient-to-b from-white to-[#f1faf7] text-zap-ink shadow-brutal ${
                        reduceMotion ? "" : "hover:-translate-y-1 hover:rotate-[0.2deg] hover:shadow-brutalLg"
                      } `}
                    >
                      <div
                        className={`h-1 w-full bg-gradient-to-r ${
                          j % 3 === 0
                            ? "from-brand-aqua to-brand-teal"
                            : j % 3 === 1
                              ? "from-zap-burst to-amber-500"
                              : "from-violet-500/90 to-fuchsia-500/70"
                        }`}
                        aria-hidden
                      />
                      <div className="absolute bottom-3 right-2 z-[0] text-[2.1rem] font-black tabular-nums leading-none text-zap-ink/[0.07] sm:text-4xl">
                        0{j + 2}
                      </div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={b.img}
                          alt=""
                          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${reduceMotion ? "" : "group-hover:scale-[1.05]"}`}
                          width={1200}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute left-2.5 top-2.5 z-[1] max-w-[calc(100%-1.25rem)] rounded border-2 border-zap-ink/20 bg-zap-ink/75 px-2 py-0.5 text-[8.5px] font-black uppercase text-white/95 shadow-sm backdrop-blur-sm sm:text-[9.5px]">
                          {b.kategori}
                        </span>
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zap-ink/25 to-transparent"
                          aria-hidden
                        />
                      </div>
                      <div className="relative z-[1] flex flex-1 flex-col p-3.5 sm:p-4">
                        <h3 className="text-[13.5px] font-black uppercase leading-tight sm:text-sm">{b.baslik}</h3>
                        <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] font-semibold leading-relaxed text-zap-ink/80 sm:text-[13px]">
                          {b.ozet}
                        </p>
                        <span className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-brand-teal sm:mt-3 sm:text-[11px]">
                          Oku
                          <ChevronRight
                            className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                            aria-hidden
                            strokeWidth={2.4}
                          />
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
        </div>
      </section>

      {/* — SSS: kırmızı bant (logo ailesi) */}
      <section
        id="sss"
        className="relative scroll-mt-24 overflow-hidden border-t-4 border-zap-ink bg-gradient-to-b from-[#ff5c4a] via-brand-flame to-[#d42814] py-12 text-white md:py-16"
        aria-labelledby="sss-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-5%,rgba(255,255,255,0.4),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.1)_30%,transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-zap-burst/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-coral/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-20deg,transparent,transparent_38px,rgba(255,255,255,0.1)_38px,rgba(255,255,255,0.1)_39px)] opacity-50 mix-blend-overlay"
          aria-hidden
        />

          <div className={`${inner} relative z-[1]`}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zap-burstLight">
                <HelpCircle className="h-4 w-4 text-zap-burst" strokeWidth={2.1} aria-hidden />
                SSS
              </p>
              <h2
                id="sss-heading"
                className="mt-2.5 text-[clamp(1.45rem,3.6vw,2.1rem)] font-black uppercase leading-[0.95]"
                style={titleDarkOnBand}
              >
                Sık sorulan <span className="text-zap-burst">sorular</span>
              </h2>
              <p className="mt-3 text-[14px] font-medium leading-relaxed text-white/85">
                Yurtdışı eğitim ücretleri, ülke seçimi ve denklik sorularına hızlı cevaplar; kişisel planınız ilk görüşmede detaylanır.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-12">
              {faqItems.map((faq, i) => (
                <motion.div
                  key={faq.soru}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: heroEase }}
                >
                  <details className="group relative overflow-hidden rounded-2xl border-2 border-white/95 bg-white/95 p-0 shadow-[4px_4px_0_rgba(6,50,66,0.12)] backdrop-blur-sm open:border-white open:shadow-brutalLg sm:open:bg-white">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-zap-burst/80 via-white to-brand-aqua/50 opacity-0 transition group-open:opacity-100"
                      aria-hidden
                    />
                    <summary className="cursor-pointer list-none bg-white/90 px-4 py-4 pr-3 hover:bg-white [&::-webkit-details-marker]:hidden sm:px-5 sm:py-4">
                      <span className="flex min-w-0 items-start justify-between gap-3 text-left sm:gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-brand-flame/25 bg-brand-flame/10 font-mono text-[10px] font-black text-zap-ink sm:h-7 sm:w-7 sm:text-[11px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 pt-0.5 text-[14px] font-bold uppercase leading-snug tracking-tight text-zap-night sm:text-[15px]">
                          {faq.soru}
                        </span>
                        <span
                          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-zap-ink bg-zap-burst text-[1rem] font-black leading-none text-zap-night transition group-open:rotate-45 sm:h-8 sm:w-8"
                          aria-hidden
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <div className="border-t-2 border-dashed border-zap-ink/10 bg-white/85 px-4 py-4 sm:px-5 sm:py-5">
                      <p className="text-[14px] font-semibold leading-relaxed text-zap-ink/90">{faq.cevap}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* — Footer öncesi: hızlı erişim (brutal cam kartlar) */}
      <section
        id="footer-programlar"
        className="relative scroll-mt-8 overflow-hidden border-t-4 border-zap-ink bg-gradient-to-br from-brand-teal via-[#1a9d8a] to-brand-aqua py-16 text-zap-night md:py-20"
        aria-labelledby="footer-programlar-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_-8%,rgba(255,255,255,0.4),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-zap-burst/32 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(128deg,transparent,transparent_34px,rgba(6,50,66,0.055)_34px,rgba(6,50,66,0.055)_35px)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(6,50,66,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,50,66,0.07)_1px,transparent_1px)] bg-[size:1.4rem_1.4rem] opacity-40"
          aria-hidden
        />

        <div className={`${inner} relative z-[1]`}>
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between md:mb-14">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-zap-night/85">
                <Sparkles className="h-3.5 w-3.5 text-zap-burst" strokeWidth={2.2} aria-hidden />
                Hızlı erişim
              </p>
              <h2
                id="footer-programlar-heading"
                className="mt-2 text-[clamp(1.45rem,3.5vw,2.05rem)] font-black uppercase leading-[0.95] tracking-tight"
                style={titleLight}
              >
                Program · içerik · <span className="text-zap-night/88">şubeler</span>
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border-4 border-zap-ink/35 bg-zap-burst/95 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-zap-night shadow-[3px_3px_0_#063242]">
              Ana sayfa haritası
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ duration: 0.45, ease: heroEase }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink/38 bg-white/32 p-6 shadow-[6px_6px_0_rgba(6,50,66,0.2)] backdrop-blur-sm sm:p-7"
            >
              <div
                className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-zap-burst/15 blur-2xl transition group-hover:bg-zap-burst/25"
                aria-hidden
              />
              <div className="relative flex items-start gap-3.5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-zap-ink bg-zap-burst text-zap-night shadow-[3px_3px_0_#063242]">
                  <GraduationCap className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                </span>
                <p className="pt-1.5 text-[11px] font-black uppercase leading-tight tracking-[0.2em] text-zap-night/80">
                  Programlar
                </p>
              </div>
              <ul className="relative mt-5 space-y-0.5">
                {preFooterPrograms.map((l) => (
                  <li key={l.href}>
                    <a
                      className="group/link flex items-center justify-between gap-2 rounded-lg py-2.5 pr-1 text-[15px] font-bold text-zap-night transition hover:translate-x-0.5"
                      href={l.href}
                    >
                      <span className="underline decoration-2 decoration-zap-night/22 underline-offset-[5px] group-hover/link:decoration-zap-night/90">
                        {l.label}
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-zap-night/38 transition group-hover/link:translate-x-0.5 group-hover/link:text-zap-burst"
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ delay: 0.06, duration: 0.45, ease: heroEase }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink/38 bg-white/32 p-6 shadow-[6px_6px_0_rgba(6,50,66,0.2)] backdrop-blur-sm sm:p-7"
            >
              <div
                className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-brand-aqua/25 blur-2xl"
                aria-hidden
              />
              <div className="relative flex items-start gap-3.5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-zap-ink bg-gradient-to-br from-brand-aqua/95 to-brand-teal text-zap-night shadow-[3px_3px_0_#063242]">
                  <TrendingUp className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                </span>
                <p className="pt-1.5 text-[11px] font-black uppercase leading-tight tracking-[0.2em] text-zap-night/80">
                  Popüler içerikler
                </p>
              </div>
              <ul className="relative mt-5 space-y-0.5">
                {preFooterPopuler.map((l) => (
                  <li key={l.href + l.label}>
                    <a
                      className="group/link flex items-center justify-between gap-2 rounded-lg py-2.5 pr-1 text-[15px] font-bold text-zap-night transition hover:translate-x-0.5"
                      href={l.href}
                    >
                      <span className="underline decoration-2 decoration-zap-night/22 underline-offset-[5px] group-hover/link:decoration-zap-night/90">
                        {l.label}
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-zap-night/38 transition group-hover/link:translate-x-0.5 group-hover/link:text-zap-burst"
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-36px" }}
              transition={{ delay: 0.12, duration: 0.45, ease: heroEase }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink/38 bg-white/32 p-6 shadow-[6px_6px_0_rgba(6,50,66,0.2)] backdrop-blur-sm sm:p-7"
            >
              <div className="relative flex items-start gap-3.5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-zap-ink bg-white/90 text-zap-night shadow-[3px_3px_0_#063242]">
                  <MapPin className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                </span>
                <p className="pt-1.5 text-[11px] font-black uppercase leading-tight tracking-[0.2em] text-zap-night/80">
                  Şubeler
                </p>
              </div>
              <ul className="relative mt-5 space-y-0">
                {preFooterSubeler.map((s) => (
                  <li
                    key={s.sehir}
                    className="flex gap-2.5 border-b-2 border-dashed border-zap-ink/12 py-2.5 first:pt-0 last:border-b-0"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zap-night/65" aria-hidden />
                    <span className="text-[14px] font-semibold">
                      <strong className="font-black">{s.sehir}</strong> · {s.ad}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
