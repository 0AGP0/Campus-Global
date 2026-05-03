import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Languages,
  ListChecks,
  MapPin,
  Phone,
  Plane,
  Shield,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ProgramHubModel } from "@/data/program-hub-content";
import { titleDarkOnBand, titleLight } from "@/styles/typography";

const inner = "relative mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-14";
const heroEase = [0.22, 1, 0.36, 1] as const;

/** public/Campus Global Logo Tek.png */
const hubHeroLogoSrc = "/Campus%20Global%20Logo%20Tek.png";

const valueStripe = [
  "from-brand-aqua via-brand-teal to-brand-aqua",
  "from-zap-burst via-amber-400 to-zap-burst",
  "from-brand-flame via-brand-coral to-brand-aqua",
] as const;

const countryStripe = [
  "from-brand-aqua via-brand-teal to-brand-aqua",
  "from-zap-burst via-amber-400 to-zap-burst",
  "from-brand-flame via-brand-coral to-brand-aqua",
] as const;

const processStepIcons: LucideIcon[] = [CalendarDays, ListChecks, FileText, Plane];

function hubValueIcons(id: ProgramHubModel["id"]): LucideIcon[] {
  if (id === "dil-okullari") return [Languages, Plane, MapPin];
  if (id === "universite") return [Globe2, ListChecks, GraduationCap];
  if (id === "sertifika") return [Award, Sparkles, FileText];
  return [Award, FileText, TrendingUp];
}

export function ProgramHubPage({ model }: { model: ProgramHubModel }) {
  const reduceMotion = useReducedMotion();
  const ValueIcons = hubValueIcons(model.id);
  const spotlightCountries = model.countries.slice(0, 12);
  const isYl = model.id === "yuksek-lisans";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-zap-ink text-zap-ink">
      {/* Hub hero — yalnızca başlık + kısa metin + dekoratif zemin */}
      <section
        id="hub-hero"
        className="relative z-[1] w-full overflow-hidden border-b-4 border-zap-ink bg-gradient-to-br from-[#f4fdfb] via-white to-[#e6faf6] text-zap-ink"
      >
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-aqua/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(3,214,186,0.06)_35%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(6,50,66,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,50,66,0.04)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50"
          aria-hidden
        />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />
        <span
          className="pointer-events-none absolute left-4 top-5 h-8 w-8 border-l-2 border-t-2 border-zap-burst/80 md:left-8 md:top-7"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-5 right-4 h-8 w-8 border-b-2 border-r-2 border-brand-teal/70 md:bottom-7 md:right-10"
          aria-hidden
        />

        <div className={`${inner} relative z-[1] py-10 md:py-12 lg:py-14`}>
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1">
              <a
                href="/"
                className="inline-block text-[11px] font-semibold uppercase tracking-wider text-zap-ink/45 transition hover:text-zap-ink"
              >
                ← Ana sayfa
              </a>

              <h1
                className="mt-5 max-w-3xl text-[clamp(1.85rem,5vw,3rem)] font-black uppercase leading-[0.98] tracking-tight text-zap-night md:mt-6"
                style={titleLight}
              >
                <span className="block sm:inline sm:mr-2">{model.heroTitle}</span>
                <span className="mt-2 inline-block bg-zap-burst px-2.5 py-1.5 text-zap-night shadow-[4px_4px_0_#063242] sm:mt-0">
                  {model.heroHighlight}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-[15px] leading-snug text-zap-ink/82 line-clamp-3 md:mt-5 md:text-base md:leading-relaxed">
                {model.heroLead}
              </p>
            </div>

            <motion.div
              className="flex shrink-0 justify-center lg:justify-end"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [0, 2.5, -2.5, 0],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-zap-ink bg-white p-5 shadow-brutal md:p-7">
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />
                <img
                  src={hubHeroLogoSrc}
                  alt="Campus Global"
                  className="mx-auto block h-[7rem] w-auto max-w-[min(100%,14rem)] object-contain md:h-[8.5rem] md:max-w-[16rem]"
                  width={256}
                  height={256}
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* — Özet: süreç (“Adım adım netlik”) ile aynı zemin gradyanı + overlay */}
      <section className="relative scroll-mt-24 overflow-hidden border-t-4 border-zap-ink bg-gradient-to-b from-zap-burstLight via-brand-aqua/95 to-brand-teal py-14 text-zap-ink md:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.5),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(-45deg,#063242_0,#063242_1px,transparent_1px,transparent_14px)]"
          aria-hidden
        />

        <div className={`${inner} relative z-[1]`}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-zap-ink/15 bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-brand-teal shadow-sm">
              <Globe2 className="h-4 w-4 text-brand-aqua" strokeWidth={2.25} aria-hidden />
              {model.spotlight.kicker}
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.5rem,3.8vw,2.35rem)] font-black uppercase leading-[0.96] tracking-tight text-zap-night" style={titleLight}>
              {model.spotlight.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] font-bold uppercase tracking-wide text-brand-teal md:text-sm">{model.spotlight.subtitle}</p>
          </motion.div>

          <div className="mt-10 flex flex-col gap-6 lg:gap-8">
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-6 lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-zap-ink bg-zap-ink shadow-brutalLg">
                <div className={`pointer-events-none absolute inset-x-0 top-0 z-[2] h-1.5 bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />
                <span
                  className="pointer-events-none absolute left-4 top-5 z-[2] h-9 w-9 border-l-4 border-t-4 border-zap-burst sm:left-5 sm:top-6"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-4 right-4 z-[2] h-9 w-9 border-b-4 border-r-4 border-brand-aqua sm:bottom-5 sm:right-5"
                  aria-hidden
                />
                <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:min-h-[17rem] lg:aspect-auto">
                  <img
                    src={model.heroImageSrc}
                    alt={model.heroImageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    width={1400}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zap-night/70 via-zap-night/15 to-transparent" aria-hidden />
                </div>
                <div className="relative z-[2] px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zap-burstLight">Campus Global</p>
                  <p className="mt-1 text-[clamp(1rem,2.5vw,1.25rem)] font-black uppercase leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    {model.spotlight.imageTagline}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-4 border-zap-ink bg-white p-5 shadow-brutal md:p-6">
                <div className={`mb-3 h-1 w-14 rounded-full bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />
                <p className="text-[15px] font-semibold leading-relaxed text-zap-ink md:text-[16px]">{model.spotlight.body}</p>
                <ul className="mt-5 space-y-3 border-t-2 border-dashed border-zap-ink/15 pt-5">
                  {model.spotlight.bullets.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-[13px] font-bold leading-snug text-zap-ink/88">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink bg-brand-aqua/15 text-brand-teal">
                        <Check className="h-4 w-4" strokeWidth={2.8} aria-hidden />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6 lg:col-span-7">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.42, delay: 0.05 }}
                className="rounded-2xl border-4 border-zap-ink bg-white p-5 shadow-brutal md:p-6"
              >
                <div className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${valueStripe[2]}`} aria-hidden />
                <p className="text-[14px] font-semibold italic leading-relaxed text-zap-ink md:text-[15px]">“{model.spotlight.pullQuote}”</p>
              </motion.div>

              <div className="flex flex-wrap gap-2">
                {model.spotlight.programStrip.map((label) => (
                  <span
                    key={label}
                    className="rounded-lg border-2 border-zap-ink bg-zap-burst px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-zap-night shadow-[3px_3px_0_#063242]"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {model.spotlight.pillars.map((p, i) => (
                  <motion.article
                    key={p.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-white p-5 shadow-brutal"
                  >
                    <div className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${valueStripe[i % 3]}`} aria-hidden />
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-zap-ink bg-gradient-to-br from-zap-ink to-zap-night text-sm font-black text-white shadow-[3px_3px_0_rgba(245,29,0,0.35)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-black uppercase leading-snug tracking-wide text-zap-night">{p.title}</h3>
                    <p className="mt-2 text-[13px] font-semibold leading-relaxed text-zap-ink/82">{p.body}</p>
                  </motion.article>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/iletisim"
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-zap-burst px-8 py-3 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-brutal transition hover:brightness-105 sm:w-auto"
                >
                  İletişim
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
                <a
                  href={model.secondaryCta.href}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-white px-8 py-3 text-[12px] font-black uppercase tracking-wide text-zap-ink shadow-brutal transition hover:bg-[#f6fdfc] sm:w-auto"
                >
                  {model.countriesHeading}
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              </div>
            </div>
            </div>

            <div className="w-full">
              <div className="overflow-hidden rounded-2xl border-4 border-zap-ink bg-white shadow-brutalLg">
                <div
                  className={`relative flex flex-col gap-4 border-b-4 border-zap-ink bg-gradient-to-r from-zap-night via-zap-ink to-[#0a3d48] px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6`}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.26em] text-zap-burstLight">{model.countriesHeading}</p>
                    <p className="mt-2 max-w-xl text-[14px] font-semibold leading-snug text-white/88">
                      Rotaları iki sütunda hızlı seçin; detaylı içerik ilgili ülke sayfasında.
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-4 border-white/25 bg-white/10 shadow-brutal">
                    <MapPin className="h-7 w-7 text-zap-burst" strokeWidth={2.2} aria-hidden />
                  </div>
                </div>
                <nav
                  className="grid gap-3 p-5 sm:grid-cols-2 lg:gap-4 lg:p-8"
                  aria-label={model.countriesHeading}
                >
                  {spotlightCountries.map((c, idx) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className={`group flex items-center justify-between gap-4 rounded-xl border-4 border-zap-ink bg-gradient-to-br px-4 py-4 shadow-brutal transition hover:brightness-[1.03] ${
                        idx % 2 === 0 ? "from-white to-[#f0fdfb]" : "from-[#fafefa] to-white"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink bg-zap-burst text-sm font-black text-zap-night shadow-[3px_3px_0_#063242]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-[13px] font-black uppercase tracking-wide text-zap-night">{c.label}</span>
                      </span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-brand-teal transition group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Değer alanı: hub hero ile aynı zemin */}
      <section className="relative overflow-hidden border-y-4 border-zap-ink bg-gradient-to-br from-[#f4fdfb] via-white to-[#e6faf6] py-14 md:py-20 text-zap-ink">
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-aqua/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(3,214,186,0.06)_35%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(6,50,66,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,50,66,0.04)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50"
          aria-hidden
        />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${valueStripe[0]}`} aria-hidden />

        <div className={`${inner} relative z-[1]`}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-zap-ink/15 bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-brand-teal shadow-sm">
                <span className="h-2 w-2 rounded-full bg-brand-flame ring-2 ring-brand-flame/40" aria-hidden />
                Campus Global · hub avantajları
              </p>
              <h2 className="mt-4 text-[clamp(1.55rem,3.8vw,2.35rem)] font-black uppercase leading-[0.95]" style={titleLight}>
                Tek çatıdan <span className="text-brand-flame">plan</span>, belge ve takip
              </h2>
              <p className="mt-4 max-w-xl text-[15px] font-semibold leading-relaxed text-zap-ink/82">
                Menüdeki tüm ülke ve alt sayfalarla uyumlu URL yapısı; danışmanlık akışı ana sayfayla aynı disiplin ve görsel dilde
                ilerler.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Şeffaf fiyat", "Yazılı checklist", "Vize paralel", "Tek iletişim hattı"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border-2 border-zap-ink/20 bg-zap-night px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-[3px_3px_0_rgba(6,50,66,0.15)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-2xl border-4 border-zap-ink bg-gradient-to-b from-zap-night to-zap-ink p-6 text-white shadow-brutal lg:col-span-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(3,214,186,0.2),transparent_45%)]" aria-hidden />
              <div className="relative flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-white/25 bg-white/10">
                  <Headphones className="h-6 w-6 text-zap-burst" strokeWidth={2.1} aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zap-burstLight">Destek modeli</p>
                  <p className="mt-2 text-[14px] font-bold leading-relaxed text-white/88">
                    Başvuru, okul yazışması ve vize evrakları aynı dosyada toplanır; kritik tarihlerde hatırlatma alırsınız.
                  </p>
                </div>
              </div>
              <ul className="relative mt-5 space-y-2.5 border-t border-dashed border-white/20 pt-5 text-[13px] font-semibold text-white/85">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zap-burst" strokeWidth={2.6} aria-hidden />
                  Gizli ücret veya “sonradan çıkan” kalemler için önceden yazılı özet.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zap-burst" strokeWidth={2.6} aria-hidden />
                  Aileyle toplantı; karar notları paylaşılır.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zap-burst" strokeWidth={2.6} aria-hidden />
                  Ofis + çevrim içi; tüm ekip aynı notları görür.
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {model.valueProps.map((v, j) => {
              const Icon = ValueIcons[j] ?? Globe2;
              return (
                <motion.article
                  key={v.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ delay: j * 0.06, duration: 0.42, ease: heroEase }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-white p-6 shadow-brutal"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${valueStripe[j % 3]}`}
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute -right-8 top-16 h-32 w-32 rounded-full bg-brand-aqua/20 blur-2xl" aria-hidden />
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink bg-gradient-to-br from-zap-ink to-zap-night text-white shadow-[3px_3px_0_rgba(245,29,0,0.35)]">
                      <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                    </span>
                    <span className="rounded-lg border-2 border-zap-ink/10 bg-brand-aqua/10 px-2 py-1 text-[10px] font-black text-brand-teal">
                      0{j + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-black uppercase leading-tight text-zap-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] font-semibold leading-relaxed text-zap-ink/78">{v.body}</p>
                  <ul className="mt-4 space-y-2 border-t-2 border-dashed border-zap-ink/12 pt-4">
                    {v.bullets.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[12px] font-bold text-zap-ink/88">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zap-ink/15 bg-brand-aqua/15 text-brand-teal">
                          <Check className="h-3 w-3" strokeWidth={2.8} aria-hidden />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* — CTA: dolu panel + çift ton */}
      <section className="relative overflow-hidden border-y-4 border-zap-ink">
        <div className="grid md:grid-cols-5">
          <div className="relative flex flex-col justify-center bg-gradient-to-b from-zap-night to-zap-ink px-6 py-10 text-white md:col-span-2 md:px-8 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(3,214,186,0.15),transparent_55%)]" aria-hidden />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zap-burstLight">Sonraki adım</p>
              <h2 className="mt-3 text-[clamp(1.25rem,2.5vw,1.65rem)] font-black uppercase leading-tight" style={titleDarkOnBand}>
                Ön görüşme <span className="text-zap-burst">+</span> bütçe
              </h2>
              <p className="mt-4 text-[13px] font-semibold leading-relaxed text-white/78">
                E-posta veya telefonla talep bırakın; danışmanınız aynı iş günü içinde dönüş hedefiyle size ulaşır.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white/90">
                  <Shield className="h-3.5 w-3.5 text-zap-burst" aria-hidden />
                  Şeffaf süreç
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white/90">
                  <Phone className="h-3.5 w-3.5 text-brand-aqua" aria-hidden />
                  Footer&apos;da iletişim
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col justify-center bg-gradient-to-br from-brand-teal via-brand-aqua to-brand-teal px-6 py-10 md:col-span-3 md:px-10 md:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.2),transparent_50%)]"
              aria-hidden
            />
            <div className="relative rounded-2xl border-4 border-zap-ink/15 bg-white/95 p-6 shadow-brutal md:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink bg-zap-burst text-zap-night shadow-md">
                    <Sparkles className="h-7 w-7" strokeWidth={2.25} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Hemen başlayın</p>
                    <p className="mt-1 text-[14px] font-bold leading-snug text-zap-ink md:text-[15px]">
                      Ücretsiz ön görüşme ve bütçe netleştirme için bir tıkla e-posta veya footer’daki kanallardan yazın.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  <a
                    href={model.primaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-brand-flame px-7 py-3 text-[11px] font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#063242] transition hover:brightness-105"
                  >
                    {model.primaryCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href="/iletisim"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border-4 border-zap-ink/25 bg-zap-night px-6 py-3 text-[11px] font-black uppercase tracking-wide text-white transition hover:bg-zap-ink"
                  >
                    Footer · iletişim
                  </a>
                  <a
                    href={model.secondaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center gap-1 rounded-full border-2 border-zap-ink/20 bg-brand-aqua/25 px-5 py-3 text-[11px] font-black uppercase tracking-wide text-zap-ink transition hover:bg-brand-aqua/40"
                  >
                    {model.secondaryCta.label}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Süreç: arka plan aynı; içerik zengin */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zap-burstLight via-brand-aqua/95 to-brand-teal py-14 text-zap-ink md:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.5),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(-45deg,#063242_0,#063242_1px,transparent_1px,transparent_14px)]"
          aria-hidden
        />

        <div className={`${inner} relative`}>
          <div className="relative mb-8 grid gap-6 overflow-hidden rounded-[1.5rem] border-4 border-zap-ink bg-white/95 p-6 shadow-brutalLg md:mb-10 md:grid-cols-12 md:rounded-[1.85rem] md:p-8">
            <span
              className="pointer-events-none absolute left-4 top-4 z-[1] h-8 w-8 border-l-[3px] border-t-[3px] border-zap-burst md:left-5 md:top-5 md:h-9 md:w-9"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-4 right-4 z-[1] h-8 w-8 border-b-[3px] border-r-[3px] border-brand-teal md:bottom-5 md:right-5 md:h-9 md:w-9"
              aria-hidden
            />
            <div className="relative z-[2] md:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-zap-ink/12 bg-zap-burst/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zap-night shadow-[3px_3px_0_#063242] shadow-sm">
                <ListChecks className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                {model.processTitle}
              </p>
              <h2
                className="mt-4 text-[clamp(1.35rem,3.2vw,1.95rem)] font-black uppercase leading-tight text-zap-ink"
                style={titleLight}
              >
                Adım adım <span className="text-brand-flame">netlik</span>
              </h2>
              <p className="mt-3 max-w-lg text-[13px] font-semibold leading-relaxed text-zap-ink/78 md:text-[14px]">
                Her aşamada yazılı özet ve tarih hatları paylaşılır; vize ve okul başvurusu paralel yürütülür. Aşağıdaki kartlarda her
                adımın içinde neler olduğunu özetledik.
              </p>
            </div>
            <div className="relative z-[2] mt-6 flex flex-wrap gap-2 md:col-span-5 md:mt-0 md:flex-col md:items-stretch md:justify-center">
              {[
                { Icon: CalendarDays, t: "Takvim net", d: "Son başvuru ve sınav tarihleri tek tabloda." },
                { Icon: Shield, t: "Şeffaf", d: "İptal ve depozito koşulları önceden yazılı." },
                { Icon: Headphones, t: "Tek hat", d: "Tüm yazışma ve evrak tek koordinatörde." },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex min-w-[140px] flex-1 items-center gap-3 rounded-xl border-2 border-zap-ink/12 bg-brand-aqua/12 px-3 py-2.5 md:flex-initial"
                >
                  <row.Icon className="h-5 w-5 shrink-0 text-brand-teal" strokeWidth={2.1} aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-wide text-zap-night">{row.t}</p>
                    <p className="text-[11px] font-medium leading-snug text-zap-ink/72">{row.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {model.process.map((p, i) => {
              const StepIcon = processStepIcons[i % processStepIcons.length];
              const stepNum = String(i + 1).padStart(2, "0");
              return (
                <motion.li
                  key={p.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-white p-5 text-zap-ink shadow-brutal"
                >
                  <div className={`mb-4 h-1.5 w-full rounded-full bg-gradient-to-r ${countryStripe[i % 3]}`} aria-hidden />
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-zap-ink bg-gradient-to-br from-brand-aqua/30 to-white">
                      <StepIcon className="h-5 w-5 text-brand-teal" strokeWidth={2.1} aria-hidden />
                    </span>
                    <span className="font-black tabular-nums text-2xl leading-none text-zap-ink/[0.12]">{stepNum}</span>
                  </div>
                  <span className="mt-3 text-[11px] font-black uppercase tracking-wide text-brand-flame">{p.title}</span>
                  <p className="mt-2 text-[13px] font-bold leading-snug text-zap-ink">{p.body}</p>
                  <ul className="mt-4 space-y-2 border-t border-dashed border-zap-ink/12 pt-3">
                    {p.tips.map((tip) => (
                      <li key={tip} className="flex gap-2 text-[11px] font-semibold leading-snug text-zap-ink/80">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal" strokeWidth={2.6} aria-hidden />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* — Ülke grid */}
      <section
        className={`relative overflow-hidden border-t-4 border-zap-ink py-14 md:py-20 ${
          isYl
            ? "bg-gradient-to-b from-[#f0f4ff] via-white to-[#e8faf7]"
            : "bg-gradient-to-b from-white via-[#eef8f6] to-brand-aqua/15"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(6,50,66,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,50,66,0.04)_1px,transparent_1px)] bg-[size:2.25rem_2.25rem] opacity-40"
          aria-hidden
        />

        <div className={`${inner} relative`}>
          <div className="mb-8 flex flex-col gap-3 border-b-2 border-dashed border-zap-ink/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-brand-teal">Destinasyon grid</p>
              <h2 className="mt-2 text-[clamp(1.35rem,3vw,1.85rem)] font-black uppercase leading-tight text-zap-ink">
                {model.countriesHeading}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold text-zap-ink/65">
              <Sparkles className="h-4 w-4 text-zap-burst" aria-hidden />
              Tıkla — ilgili sayfaya git
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {model.countries.map((c, j) => {
              const stripe = countryStripe[j % 3];
              const num = String(j + 1).padStart(2, "0");
              return (
                <motion.a
                  key={c.href}
                  href={c.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ delay: (j % 8) * 0.03, duration: 0.38 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border-4 border-zap-ink bg-gradient-to-b from-white to-[#eef8f6] text-zap-ink shadow-brutal transition ${
                    reduceMotion ? "" : "hover:-translate-y-0.5 hover:shadow-brutalLg"
                  }`}
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stripe}`} aria-hidden />
                  <span
                    className="pointer-events-none absolute bottom-3 right-3 font-black tabular-nums text-[clamp(2.5rem,6vw,3.25rem)] leading-none text-zap-ink/[0.07]"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <div className="relative flex flex-1 flex-col p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-zap-ink bg-gradient-to-br from-brand-aqua to-brand-teal text-white shadow-md">
                          <Globe2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full border-2 border-zap-ink bg-zap-burst px-1 text-[9px] font-black text-zap-night">
                            {num}
                          </span>
                        </span>
                        <h3 className="min-w-0 text-[15px] font-black uppercase leading-tight tracking-tight text-zap-night md:text-[16px]">
                          {c.label}
                        </h3>
                      </div>
                      <ChevronRight
                        className="mt-0.5 h-5 w-5 shrink-0 text-zap-ink/30 transition group-hover:translate-x-0.5 group-hover:text-brand-flame"
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </div>
                    {c.desc ? (
                      <p className="mt-3 border-t border-dashed border-zap-ink/12 pt-3 text-[12px] font-semibold leading-snug text-zap-ink/75">
                        {c.desc}
                      </p>
                    ) : (
                      <p className="mt-3 border-t border-dashed border-zap-ink/12 pt-3 text-[12px] font-semibold leading-snug text-zap-ink/75">
                        Ülke rehberi ve alt sayfalar menüyle uyumlu.
                      </p>
                    )}
                  </div>
                  <div className="relative flex items-center justify-between gap-2 border-t-2 border-zap-ink/10 bg-gradient-to-r from-zap-burst/95 via-zap-burst to-amber-400/90 px-4 py-2.5 md:px-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-zap-night">Sayfaya git</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zap-night transition group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
