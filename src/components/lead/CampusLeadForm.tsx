import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Award,
  Building2,
  Check,
  ChevronRight,
  Flag,
  Globe2,
  Languages,
  Mail,
  MapPin,
  Phone,
  School,
  ScrollText,
  User,
} from "lucide-react";
import type { LeadFormPrefill } from "@/data/lead-form-data";
import { countriesForLeadProgram, leadProgramCategories } from "@/data/lead-form-data";

/** Ana sayfa program kartlarıyla aynı ikon / şerit dili */
const leadCategoryIcon: Record<string, LucideIcon> = {
  "dil-okullari": Languages,
  universite: Building2,
  "yuksek-lisans": Award,
  diploma: ScrollText,
  lise: School,
  "teach-usa": Flag,
};

/** Ana sayfa `categoryVisual` ile aynı blob / şerit — küçük kartlarda tekrar kullanılıyor */
const leadCategoryVisual: Record<string, { stripe: string; iconBg: string; blob: string; num: string }> = {
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

/** Ülke kartlarında sırayla renk çeşitliliği */
const countryCardPalette = [
  { stripe: "bg-brand-aqua", iconBg: "from-brand-aqua to-brand-teal" },
  { stripe: "bg-brand-teal", iconBg: "from-brand-teal to-emerald-600" },
  { stripe: "bg-zap-burst", iconBg: "from-zap-burst to-amber-500" },
  { stripe: "bg-brand-flame", iconBg: "from-brand-flame to-brand-coral" },
  { stripe: "bg-violet-500", iconBg: "from-violet-500 to-fuchsia-600" },
  { stripe: "bg-sky-500", iconBg: "from-sky-500 to-blue-600" },
] as const;

type Props = {
  onClose: () => void;
  /** Navbar ülke sayfası — doğrulanırsa doğrudan iletişim (adım 3) */
  leadFormPrefill?: LeadFormPrefill | null;
};

function normalizePrefill(p: LeadFormPrefill | null | undefined): LeadFormPrefill | null {
  if (!p?.programId || !p.countryLabel) return null;
  if (!countriesForLeadProgram(p.programId).includes(p.countryLabel)) return null;
  return { programId: p.programId, countryLabel: p.countryLabel };
}

export function CampusLeadForm({ onClose, leadFormPrefill }: Props) {
  const pf = useMemo(() => normalizePrefill(leadFormPrefill ?? null), [leadFormPrefill]);
  /** Ülke sayfasından doğrudan iletişim — program/ülke geri dönüşle değiştirilemez */
  const lockedFromPrefill = pf !== null;

  const [step, setStep] = useState<1 | 2 | 3>(() => (pf ? 3 : 1));
  const [programId, setProgramId] = useState<string | null>(() => pf?.programId ?? null);
  const [country, setCountry] = useState<string | null>(() => pf?.countryLabel ?? null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const program = useMemo(
    () => (programId ? leadProgramCategories.find((p) => p.id === programId) ?? null : null),
    [programId],
  );

  const countries = useMemo(() => (programId ? countriesForLeadProgram(programId) : []), [programId]);

  const goPrograms = () => {
    setStep(1);
    setProgramId(null);
    setCountry(null);
    setError(null);
  };

  const goContact = () => {
    if (!country) {
      setError("Lütfen bir ülke seçin.");
      return;
    }
    setError(null);
    setStep(3);
  };

  const submit = () => {
    setError(null);
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Ad, soyad ve e-posta zorunludur.");
      return;
    }
    setDone(true);
  };

  if (done) {
    const DoneIcon = programId ? leadCategoryIcon[programId] ?? Globe2 : Globe2;
    const doneVis = programId ? leadCategoryVisual[programId] ?? leadCategoryVisual["dil-okullari"] : leadCategoryVisual["dil-okullari"];
    return (
      <div className="relative rounded-2xl border-4 border-zap-ink bg-white p-6 shadow-brutal sm:p-7">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-[10px] bg-gradient-to-r from-brand-teal via-zap-burst to-brand-flame"
          aria-hidden
        />
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border-4 border-zap-ink bg-brand-aqua/25 text-brand-teal">
            <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
          </span>
        </div>
        <p className="mt-4 text-center text-[15px] font-black uppercase leading-snug text-zap-ink">Talebin alındı</p>
        {program && country && programId ? (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl border-4 border-zap-ink bg-zap-night px-3 py-2 text-[11px] font-black uppercase tracking-wide text-white shadow-[3px_3px_0_rgb(6_50_66)]">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-gradient-to-br ${doneVis.iconBg}`}
              >
                <DoneIcon className="h-4 w-4 text-white" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="max-w-[11rem] truncate sm:max-w-[14rem]">{program.title}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border-4 border-zap-ink bg-white px-3 py-2 text-[11px] font-black uppercase tracking-wide text-zap-ink shadow-[3px_3px_0_rgb(6_50_66)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zap-ink bg-gradient-to-br from-brand-aqua to-brand-teal text-white">
                <MapPin className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="max-w-[10rem] truncate sm:max-w-[13rem]">{country}</span>
            </span>
          </div>
        ) : null}
        <p className="mt-3 text-center text-[13px] font-semibold leading-relaxed text-zap-ink/78">
          Danışmanımız en kısa sürede seninle iletişime geçecek.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl border-4 border-zap-ink bg-zap-burst py-3 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_rgb(6_50_66)] transition hover:brightness-105"
        >
          Tamam
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-zap-ink bg-white shadow-brutal">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-zap-burst to-brand-flame"
        aria-hidden
      />

      <div className="border-b-4 border-dashed border-zap-ink/15 px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
        <div className="flex items-center justify-between gap-2">
          {step > 1 && !lockedFromPrefill ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                if (step === 2) goPrograms();
                else setStep(2);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink bg-white text-zap-ink shadow-[2px_2px_0_rgb(6_50_66)] transition hover:bg-brand-aqua/15"
              aria-label="Önceki adım"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </button>
          ) : (
            <span className="w-9 shrink-0" aria-hidden />
          )}
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-teal">Ücretsiz ön talep</p>
          <span className="w-9 shrink-0 text-right text-[11px] font-black tabular-nums text-zap-ink/55">{step}/3</span>
        </div>
        <div className="mt-3 flex gap-1">
          {([1, 2, 3] as const).map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full ${step >= n ? "bg-gradient-to-r from-brand-teal to-zap-burst" : "bg-zap-ink/12"}`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        {step === 1 ? (
          <section className="lead-step1" aria-labelledby="lead-step1-heading">
            <div className="rounded-lg border-2 border-zap-ink/12 bg-gradient-to-br from-brand-aqua/[0.07] via-white to-zap-burst/[0.05] px-3 py-2 sm:px-3.5 sm:py-2.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-teal">Adım 1</p>
              <h3 id="lead-step1-heading" className="mt-0.5 text-[14px] font-black uppercase leading-tight tracking-tight text-zap-ink sm:text-[15px]">
                Programını seç
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold leading-snug text-zap-ink/62">
                Ana sayfadaki kartların küçültülmüş hâli — tam genişlik görsel ve koyu alt bant.
              </p>
            </div>

            <ul className="mt-3 grid max-h-[min(58vh,460px)] grid-cols-2 gap-2 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch] sm:mt-3.5 sm:max-h-[min(64vh,540px)] md:max-h-[min(68vh,600px)] sm:gap-2.5">
              {leadProgramCategories.map((p) => {
                const Icon = leadCategoryIcon[p.id] ?? Globe2;
                const vis = leadCategoryVisual[p.id] ?? leadCategoryVisual["dil-okullari"];
                return (
                  <li key={p.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setProgramId(p.id);
                        setError(null);
                        setStep(2);
                      }}
                      className="group relative flex min-h-0 w-full flex-col overflow-hidden rounded-lg border-[3px] border-zap-ink bg-zap-night text-left shadow-[3px_3px_0_rgb(6_50_66)] transition hover:-translate-y-px hover:shadow-[4px_4px_0_rgb(6_50_66)] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_rgb(6_50_66)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 sm:rounded-xl"
                    >
                      <span
                        className={`pointer-events-none absolute left-0 top-0 z-[3] h-full w-[3px] sm:w-1 ${vis.stripe}`}
                        aria-hidden
                      />
                      <div className="relative min-h-[72px] flex-1 overflow-hidden sm:min-h-[80px]">
                        <img
                          src={p.image}
                          alt=""
                          width={800}
                          height={520}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 h-full w-full min-h-[72px] object-cover transition duration-500 group-hover:scale-[1.05] sm:min-h-[80px]"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zap-night via-zap-night/55 to-zap-night/10"
                          aria-hidden
                        />
                        <div
                          className={`pointer-events-none absolute -right-4 -top-4 h-[5.25rem] w-[5.25rem] rounded-full bg-gradient-to-br ${vis.blob} blur-xl sm:h-24 sm:w-24`}
                          aria-hidden
                        />
                        <span
                          className="pointer-events-none absolute bottom-0 right-1.5 font-black tabular-nums text-[1.45rem] leading-none text-white/[0.08] sm:bottom-0.5 sm:right-2 sm:text-[1.65rem]"
                          aria-hidden
                        >
                          {vis.num}
                        </span>
                        <div className="absolute left-1.5 top-1.5 z-[2] flex h-8 w-8 items-center justify-center rounded-lg border-2 border-white/80 bg-gradient-to-br text-white shadow-[1px_1px_0_rgba(0,0,0,0.2)] sm:left-2 sm:top-2 sm:h-9 sm:w-9">
                          <div
                            className={`flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br ${vis.iconBg}`}
                          >
                            <Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.25} aria-hidden />
                          </div>
                        </div>
                      </div>
                      <div className="relative z-[2] flex shrink-0 flex-col justify-end bg-zap-night px-2 pb-2 pt-1.5 sm:px-2.5 sm:pb-2.5 sm:pt-2">
                        <p className="text-[12px] font-black uppercase leading-snug tracking-tight text-white line-clamp-2 sm:text-[13px]">
                          {p.title}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-zap-burstLight sm:text-[10px]">
                          Seç
                          <ChevronRight
                            className="h-3 w-3 shrink-0 transition group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
                            strokeWidth={2.25}
                            aria-hidden
                          />
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {step === 2 && program && programId ? (
          <section className="lead-step2" aria-labelledby="lead-step2-heading">
            <div className="rounded-xl border-2 border-zap-ink/12 bg-gradient-to-br from-brand-teal/[0.09] via-white to-brand-aqua/[0.08] px-3 py-3 sm:px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-teal">Adım 2</p>
              <h3 id="lead-step2-heading" className="mt-1 text-[15px] font-black uppercase leading-snug tracking-tight text-zap-ink">
                Hedef ülkeyi seç
              </h3>
              <p className="mt-1 text-[12px] font-semibold leading-snug text-zap-ink/68">
                <span className="text-brand-teal">{program.title}</span> için danışmanlık hangi ülkeye göre ilerlesin?
              </p>
            </div>

            <ul className="mt-4 grid max-h-[min(48vh,380px)] grid-cols-3 gap-2 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch] sm:max-h-[min(50vh,420px)] sm:gap-2.5 md:max-h-[min(52vh,440px)]">
              {countries.map((c, idx) => {
                const pal = countryCardPalette[idx % countryCardPalette.length];
                const selected = country === c;
                return (
                  <li key={c} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setError(null);
                      }}
                      className={`group relative flex min-h-[3rem] w-full items-center gap-1.5 overflow-hidden rounded-xl border-[3px] py-2 pl-1 pr-1.5 text-left shadow-[3px_3px_0_rgb(6_50_66)] transition hover:-translate-y-px hover:shadow-[4px_4px_0_rgb(6_50_66)] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_rgb(6_50_66)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 sm:min-h-[3.15rem] sm:gap-2 sm:pl-1.5 sm:pr-2 ${
                        selected
                          ? "border-zap-ink bg-gradient-to-r from-zap-burst/28 via-white to-brand-aqua/18 ring-2 ring-brand-teal/35"
                          : "border-zap-ink bg-white ring-0 ring-transparent"
                      }`}
                    >
                      <span
                        className={`pointer-events-none absolute bottom-0 left-0 top-0 w-1 shrink-0 ${pal.stripe}`}
                        aria-hidden
                      />
                      <span
                        className={`relative z-[1] ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink/18 bg-gradient-to-br ${pal.iconBg} text-white shadow-[1px_1px_0_rgba(6,50,66,0.18)] sm:h-10 sm:w-10`}
                      >
                        <MapPin className="h-[1.05rem] w-[1.05rem] sm:h-[1.15rem] sm:w-[1.15rem]" strokeWidth={2.15} aria-hidden />
                      </span>
                      <span className="relative z-[1] min-w-0 flex-1 py-0.5">
                        <span className="block truncate text-[10px] font-black uppercase leading-tight tracking-wide text-zap-ink sm:text-[11px]">
                          {c}
                        </span>
                      </span>
                      <span
                        className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-zap-ink transition sm:h-9 sm:w-9 ${
                          selected
                            ? "bg-zap-burst text-zap-night"
                            : "border-zap-ink/12 bg-zap-ink/[0.04] text-zap-ink/22 group-hover:border-zap-ink/28 group-hover:text-brand-teal"
                        }`}
                        aria-hidden
                      >
                        {selected ? (
                          <Check className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.75} />
                        ) : (
                          <Globe2 className="h-3.5 w-3.5 opacity-35 sm:h-4 sm:w-4" strokeWidth={2.25} />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {error ? <p className="mt-3 text-[12px] font-bold text-brand-flame">{error}</p> : null}
            <button
              type="button"
              onClick={goContact}
              disabled={!country}
              className="mt-5 w-full rounded-xl border-4 border-zap-ink bg-zap-burst py-2.5 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_rgb(6_50_66)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              Devam · iletişim
            </button>
          </section>
        ) : null}

        {step === 3 && program && country && programId ? (
          <section className="lead-step3" aria-labelledby="lead-step3-heading">
            <div className="rounded-xl border-2 border-zap-ink/12 bg-gradient-to-br from-zap-burst/[0.08] via-white to-brand-flame/[0.06] px-3 py-3 sm:px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-teal">Adım 3</p>
              <h3 id="lead-step3-heading" className="mt-1 text-[15px] font-black uppercase leading-snug tracking-tight text-zap-ink">
                İletişim bilgilerin
              </h3>
              <p className="mt-1 text-[12px] font-semibold leading-snug text-zap-ink/68">
                Danışmanın dosyayı doğru açması için iletişimini bırak; telefon ve not isteğe bağlı.
              </p>
            </div>

            <div className="mt-4 space-y-3 rounded-xl border-2 border-dashed border-zap-ink/15 bg-gradient-to-b from-white to-brand-aqua/[0.04] p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block min-w-0 text-[11px] font-black uppercase tracking-wide text-zap-ink/85">
                  Ad
                  <span className="mt-1 flex items-center gap-2 rounded-xl border-4 border-zap-ink/15 bg-white px-3 py-2 shadow-[inset_0_1px_2px_rgba(6,50,66,0.06)] focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-aqua/30">
                    <User className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-semibold text-zap-night outline-none"
                      autoComplete="given-name"
                    />
                  </span>
                </label>
                <label className="block min-w-0 text-[11px] font-black uppercase tracking-wide text-zap-ink/85">
                  Soyad
                  <span className="mt-1 flex items-center gap-2 rounded-xl border-4 border-zap-ink/15 bg-white px-3 py-2 shadow-[inset_0_1px_2px_rgba(6,50,66,0.06)] focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-aqua/30">
                    <User className="h-4 w-4 shrink-0 text-brand-teal opacity-80" aria-hidden />
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-semibold text-zap-night outline-none"
                      autoComplete="family-name"
                    />
                  </span>
                </label>
              </div>
              <label className="block text-[11px] font-black uppercase tracking-wide text-zap-ink/85">
                E-posta
                <span className="mt-1 flex items-center gap-2 rounded-xl border-4 border-zap-ink/15 bg-white px-3 py-2 shadow-[inset_0_1px_2px_rgba(6,50,66,0.06)] focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-aqua/30">
                  <Mail className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-semibold text-zap-night outline-none"
                    autoComplete="email"
                  />
                </span>
              </label>
              <label className="block text-[11px] font-black uppercase tracking-wide text-zap-ink/85">
                Telefon <span className="font-semibold normal-case text-zap-ink/45">(isteğe bağlı)</span>
                <span className="mt-1 flex items-center gap-2 rounded-xl border-4 border-zap-ink/15 bg-white px-3 py-2 shadow-[inset_0_1px_2px_rgba(6,50,66,0.06)] focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-aqua/30">
                  <Phone className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="min-w-0 flex-1 border-0 bg-transparent text-[14px] font-semibold text-zap-night outline-none"
                    autoComplete="tel"
                  />
                </span>
              </label>
              <label className="block text-[11px] font-black uppercase tracking-wide text-zap-ink/85">
                Not <span className="font-semibold normal-case text-zap-ink/45">(isteğe bağlı)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 w-full resize-none rounded-xl border-4 border-zap-ink/15 bg-white px-3 py-2 text-[13px] font-semibold text-zap-night shadow-[inset_0_1px_2px_rgba(6,50,66,0.06)] outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-aqua/30"
                  placeholder="Kısa hedef veya soru…"
                />
              </label>
            </div>
            {error ? <p className="mt-3 text-[12px] font-bold text-brand-flame">{error}</p> : null}
            <button
              type="button"
              onClick={submit}
              className="mt-5 w-full rounded-xl border-4 border-zap-ink bg-zap-burst py-2.5 text-[12px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_rgb(6_50_66)] transition hover:brightness-105"
            >
              Talebi gönder
            </button>
          </section>
        ) : null}
      </div>

      <div className="flex justify-end border-t-4 border-dashed border-zap-ink/12 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border-2 border-zap-ink/25 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-zap-ink transition hover:border-zap-ink hover:bg-brand-aqua/10"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
