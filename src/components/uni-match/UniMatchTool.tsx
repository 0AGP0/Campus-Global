import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { getInfluencerRef, getUtmParams } from "@/lib/influencer-ref";
import { postLeadWebhook } from "@/lib/leads/webhook";
import { buildUniMatchLeadPayload, type UniMatchLeadSource } from "@/lib/uni-match/lead";
import {
  BUDGET_OPTIONS,
  DEPT_OPTIONS,
  EDUCATION_OPTIONS,
  LANG_OPTIONS,
  LEVEL_OPTIONS,
  YKS_OPTIONS,
  matchUniversities,
  scoreQuestion,
  scoresReady,
  visibleSteps,
} from "@/lib/uni-match/match";
import { EMPTY_ANSWERS, type Callout, type CountryMatch, type UniMatchAnswers, type UniMatchResult } from "@/lib/uni-match/types";

const WHATSAPP_HREF = "https://wa.me/902129092034?text=Merhaba%2C%20bilgi%20alabilir%20miyim%3F";

type LeadValues = { fullName: string; city: string; phone: string; email: string; privacy: boolean };

const EMPTY_LEAD: LeadValues = { fullName: "", city: "", phone: "", email: "", privacy: false };

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-black">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ChoiceGroup<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
}: {
  label: string;
  hint?: string;
  value: T | "";
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-[15px] font-black leading-snug text-zap-night sm:text-base">{label}</legend>
      {hint ? <p className="mt-1 text-[13px] font-medium leading-snug text-zap-ink/65">{hint}</p> : null}
      <div role="radiogroup" aria-label={label} className="mt-3 grid gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-11 w-full items-start gap-3 rounded-xl border-[3px] px-3 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${
                selected
                  ? "border-zap-ink bg-brand-aqua/20 shadow-[3px_3px_0_rgb(6_50_66)]"
                  : "border-zap-ink/20 bg-white hover:border-zap-ink/50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-zap-ink bg-zap-burst text-zap-night" : "border-zap-ink/30 bg-white"
                }`}
                aria-hidden
              >
                {selected ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-snug text-zap-night">{option.label}</span>
                {option.hint ? (
                  <span className="mt-0.5 block text-[13px] font-medium leading-snug text-zap-ink/62">{option.hint}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function CalloutList({ items }: { items: Callout[] }) {
  if (!items.length) return null;
  return (
    <div className="mb-3 space-y-2">
      {items.map((item) => (
        <p
          key={item.text}
          className={`rounded-lg border-l-4 px-3 py-2 text-[13px] font-semibold leading-relaxed ${
            item.tone === "warning"
              ? "border-brand-flame bg-brand-flame/10 text-zap-night"
              : "border-zap-burst bg-zap-burst/15 text-zap-night"
          }`}
        >
          {item.text}
        </p>
      ))}
    </div>
  );
}

function CountryCard({ country }: { country: CountryMatch }) {
  const hasBachelor = Boolean(country.bachelorBody);
  const hasMaster = Boolean(country.masterBody);
  return (
    <article className="rounded-2xl border-[3px] border-zap-ink bg-white p-4 shadow-[4px_4px_0_rgb(6_50_66)] sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-2 text-[1.15rem] font-black leading-tight text-zap-night">
          <span className="text-[1.6rem] leading-none" aria-hidden>
            {country.flag}
          </span>
          {country.name}
        </h3>
        <span className="w-fit rounded-full border-2 border-zap-ink bg-zap-burst px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-zap-night">
          {country.badge}
        </span>
      </div>
      <div className="mt-3 space-y-3 text-[14px] font-medium leading-relaxed text-zap-ink/88">
        {hasBachelor && hasMaster ? <p className="text-[12px] font-black uppercase tracking-wide text-brand-teal">Lisans</p> : null}
        {hasBachelor ? (
          <div>
            <CalloutList items={country.bachelorCallouts} />
            <p>{country.bachelorBody}</p>
          </div>
        ) : null}
        {hasMaster ? (
          <div>
            {hasBachelor ? <p className="text-[12px] font-black uppercase tracking-wide text-brand-teal">Yüksek lisans</p> : null}
            <CalloutList items={country.masterCallouts} />
            <p>{country.masterBody}</p>
          </div>
        ) : null}
        {country.languageNote ? (
          <p className="rounded-lg border-l-4 border-brand-teal bg-brand-aqua/15 px-3 py-2 text-[13px] font-semibold leading-relaxed text-zap-night">
            <RichText text={country.languageNote} />
          </p>
        ) : null}
      </div>
    </article>
  );
}

function LeadFields({
  idPrefix,
  values,
  error,
  sending,
  onChange,
  onActivity,
  onSubmit,
}: {
  idPrefix: string;
  values: LeadValues;
  error: string | null;
  sending: boolean;
  onChange: (next: LeadValues) => void;
  onActivity?: () => void;
  onSubmit: () => void;
}) {
  const field =
    "mt-1 w-full rounded-xl border-[3px] border-zap-ink/20 bg-white px-3 py-3 text-base font-semibold text-zap-night outline-none focus:border-brand-teal";
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-[12px] font-black uppercase tracking-wide text-zap-ink/80">
          Ad Soyad
          <input
            id={`${idPrefix}-name`}
            value={values.fullName}
            onChange={(e) => onChange({ ...values, fullName: e.target.value })}
            onFocus={onActivity}
            required
            autoComplete="name"
            placeholder="Adın ve soyadın"
            className={field}
          />
        </label>
        <label className="block text-[12px] font-black uppercase tracking-wide text-zap-ink/80">
          Şehir
          <input
            value={values.city}
            onChange={(e) => onChange({ ...values, city: e.target.value })}
            onFocus={onActivity}
            required
            autoComplete="address-level2"
            placeholder="Yaşadığın şehir"
            className={field}
          />
        </label>
        <label className="block text-[12px] font-black uppercase tracking-wide text-zap-ink/80">
          WhatsApp / Telefon
          <input
            value={values.phone}
            onChange={(e) => onChange({ ...values, phone: e.target.value })}
            onFocus={onActivity}
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="5XX XXX XX XX"
            className={field}
          />
        </label>
        <label className="block text-[12px] font-black uppercase tracking-wide text-zap-ink/80">
          E-posta
          <input
            value={values.email}
            onChange={(e) => onChange({ ...values, email: e.target.value })}
            onFocus={onActivity}
            required
            type="email"
            autoComplete="email"
            placeholder="ornek@email.com"
            className={field}
          />
        </label>
      </div>
      <label className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-zap-ink/80">
        <input
          type="checkbox"
          checked={values.privacy}
          onChange={(e) => onChange({ ...values, privacy: e.target.checked })}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-teal"
        />
        <span>
          <a href="https://campusglobal.com.tr/" className="font-black text-brand-teal underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
            Gizlilik politikasını
          </a>{" "}
          kabul ediyorum.
        </span>
      </label>
      {error ? <p className="text-[13px] font-bold text-brand-flame">{error}</p> : null}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl border-4 border-zap-ink bg-zap-burst py-3 text-[13px] font-black uppercase tracking-wide text-zap-night shadow-[4px_4px_0_rgb(6_50_66)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}

function LeadCard({
  values,
  error,
  sending,
  done,
  onChange,
  onActivity,
  onSubmit,
  idPrefix,
}: {
  values: LeadValues;
  error: string | null;
  sending: boolean;
  done: boolean;
  onChange: (next: LeadValues) => void;
  onActivity?: () => void;
  onSubmit: () => void;
  idPrefix: string;
}) {
  return (
    <section className="rounded-2xl border-4 border-zap-ink bg-white p-4 shadow-brutal sm:p-6">
      {done ? (
        <div className="py-6 text-center">
          <p className="text-xl font-black text-zap-night">Teşekkürler</p>
          <p className="mt-2 text-[15px] font-semibold leading-relaxed text-zap-ink/80">
            Formun bize ulaştı. Eğitim danışmanlarımız en kısa sürede seninle iletişime geçecek.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-[1.25rem] font-black leading-tight text-zap-night">Sonucu danışmanla değerlendir</h2>
          <p className="mt-1 text-[14px] font-medium text-zap-ink/70">Yol haritanı beraber oluşturalım.</p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl border-4 border-[#128C7E] bg-[#25D366] px-4 py-3 text-[14px] font-black text-white"
          >
            WhatsApp’tan danış
          </a>
          <p className="my-4 text-center text-[13px] font-black uppercase tracking-wide text-brand-teal">
            Ücretsiz ön görüşme için formu doldur
          </p>
          <LeadFields
            idPrefix={idPrefix}
            values={values}
            error={error}
            sending={sending}
            onChange={onChange}
            onActivity={onActivity}
            onSubmit={onSubmit}
          />
        </>
      )}
    </section>
  );
}

function answerSummary(step: "education" | "scores" | "dept" | "lang" | "level" | "budget", answers: UniMatchAnswers): string {
  if (step === "education") return EDUCATION_OPTIONS.find((o) => o.value === answers.education)?.label ?? "";
  if (step === "scores") {
    const yks = YKS_OPTIONS.find((o) => o.value === answers.yks)?.label;
    const gpaList = scoreQuestion(answers.education)?.gpaOptions ?? [];
    const gpa = gpaList.find((o) => o.value === answers.gpa)?.label;
    return [yks, gpa].filter(Boolean).join(" · ");
  }
  if (step === "dept") return DEPT_OPTIONS.find((o) => o.value === answers.dept)?.label ?? "";
  if (step === "lang") return LANG_OPTIONS.find((o) => o.value === answers.lang)?.label ?? "";
  if (step === "level") return LEVEL_OPTIONS.find((o) => o.value === answers.level)?.label ?? "";
  return BUDGET_OPTIONS.find((o) => o.value === answers.budget)?.label ?? "";
}

const STEP_TITLES: Record<"education" | "scores" | "dept" | "lang" | "level" | "budget", string> = {
  education: "Eğitim durumu",
  scores: "Not / YKS",
  dept: "Alan",
  lang: "Dil",
  level: "Seviye",
  budget: "Bütçe",
};

function stepComplete(
  step: "education" | "scores" | "dept" | "lang" | "level" | "budget",
  answers: UniMatchAnswers,
): boolean {
  if (step === "education") return Boolean(answers.education);
  if (step === "scores") return scoresReady(answers);
  if (step === "dept") return Boolean(answers.dept);
  if (step === "lang") return Boolean(answers.lang);
  if (step === "level") return Boolean(answers.level);
  return Boolean(answers.budget);
}

function validateLead(values: LeadValues): string | null {
  if (!values.fullName.trim() || !values.city.trim() || !values.phone.trim() || !values.email.trim()) {
    return "Ad soyad, şehir, telefon ve e-posta zorunludur.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return "Geçerli bir e-posta yaz.";
  if (!values.privacy) return "Devam etmek için gizlilik metnini kabul et.";
  return null;
}

export function UniMatchTool() {
  const [answers, setAnswers] = useState<UniMatchAnswers>(EMPTY_ANSWERS);
  const [result, setResult] = useState<UniMatchResult | null>(null);
  const [mainLead, setMainLead] = useState<LeadValues>(EMPTY_LEAD);
  const [popupLead, setPopupLead] = useState<LeadValues>(EMPTY_LEAD);
  const [mainError, setMainError] = useState<string | null>(null);
  const [popupError, setPopupError] = useState<string | null>(null);
  const [mainSending, setMainSending] = useState(false);
  const [popupSending, setPopupSending] = useState(false);
  const [mainDone, setMainDone] = useState(false);
  const [popupDone, setPopupDone] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const titleId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);
  const popupTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const steps = visibleSteps(answers);
  const score = scoreQuestion(answers.education);
  const [openStep, setOpenStep] = useState<"education" | "scores" | "dept" | "lang" | "level" | "budget" | null>(null);
  const activeStep =
    openStep && steps.includes(openStep)
      ? openStep
      : (steps.find((step) => step !== "calculate" && !stepComplete(step, answers)) ?? null);

  function clearTimers() {
    if (popupTimer.current) window.clearTimeout(popupTimer.current);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    popupTimer.current = null;
    idleTimer.current = null;
  }

  function armPopup(delay: number) {
    clearTimers();
    if (submittedRef.current) return;
    popupTimer.current = window.setTimeout(() => {
      if (!submittedRef.current) setPopupOpen(true);
    }, delay);
  }

  useEffect(() => () => {
    clearTimers();
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!popupOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPopupOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const name = document.getElementById("uni-popup-name");
    name?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [popupOpen]);

  function resetFrom(updater: (prev: UniMatchAnswers) => UniMatchAnswers) {
    setAnswers(updater);
    setResult(null);
    setMainDone(false);
    setPopupDone(false);
    setMainLead(EMPTY_LEAD);
    setPopupLead(EMPTY_LEAD);
    setMainError(null);
    setPopupError(null);
    submittedRef.current = false;
    setPopupOpen(false);
    setOpenStep(null);
    clearTimers();
  }

  function calculate() {
    const next = matchUniversities(answers);
    setResult(next);
    setMainDone(false);
    setPopupDone(false);
    setMainLead(EMPTY_LEAD);
    setPopupLead(EMPTY_LEAD);
    submittedRef.current = false;
    setPopupOpen(false);
    armPopup(10000);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function send(source: UniMatchLeadSource, values: LeadValues) {
    const invalid = validateLead(values);
    if (source === "form") setMainError(invalid);
    else setPopupError(invalid);
    if (invalid) return;

    if (source === "form") setMainSending(true);
    else setPopupSending(true);

    const payload = buildUniMatchLeadPayload({
      source,
      fullName: values.fullName,
      city: values.city,
      phone: values.phone,
      email: values.email,
      pageUrl: window.location.href,
      utm: getUtmParams(),
      answers,
      result,
      influencerRef: getInfluencerRef(),
    });
    await postLeadWebhook(payload);
    submittedRef.current = true;
    clearTimers();

    if (source === "form") {
      setMainSending(false);
      setMainDone(true);
      setPopupOpen(false);
      return;
    }

    setPopupSending(false);
    setPopupDone(true);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setPopupOpen(false);
      setPopupDone(false);
      setPopupLead(EMPTY_LEAD);
    }, 4000);
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
      <section className="rounded-2xl border-4 border-zap-ink bg-white p-4 shadow-brutal sm:p-6" aria-labelledby={titleId}>
        <h1 id={titleId} className="text-[clamp(1.6rem,4vw,2.2rem)] font-black uppercase leading-[1.05] tracking-tight text-zap-night">
          Hangi üniversite bana uygun?
        </h1>
        <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-zap-ink/75">
          Eğitim hedefini ve bütçeni seç. Sana uygun ülkeler aynı kurallarla listelenir.
        </p>

        <div className="mt-6 space-y-3">
          {steps
            .filter((step) => step !== "calculate")
            .map((step) => {
              if (step !== activeStep && stepComplete(step, answers)) {
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setOpenStep(step)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border-[3px] border-zap-ink/15 bg-brand-aqua/10 px-3 py-3 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-black uppercase tracking-wide text-brand-teal">{STEP_TITLES[step]}</span>
                      <span className="mt-0.5 block text-[14px] font-semibold leading-snug text-zap-night">{answerSummary(step, answers)}</span>
                    </span>
                    <span className="shrink-0 text-[11px] font-black uppercase text-zap-ink/50">Değiştir</span>
                  </button>
                );
              }
              if (step !== activeStep) return null;
              if (step === "education") {
                return (
                  <ChoiceGroup
                    key={step}
                    label="1. Eğitim durumunuz nedir?"
                    value={answers.education}
                    options={EDUCATION_OPTIONS}
                    onChange={(education) => {
                      resetFrom(() => ({ ...EMPTY_ANSWERS, education }));
                    }}
                  />
                );
              }
              if (step === "scores" && score) {
                return (
                  <div key={step} className="space-y-4">
                    {score.askYks ? <p className="text-[15px] font-black leading-snug text-zap-night">2. {score.label}</p> : null}
                    {score.askYks ? (
                      <ChoiceGroup
                        label="YKS durumunuz"
                        value={answers.yks}
                        options={YKS_OPTIONS}
                        onChange={(yks) => {
                          resetFrom((prev) => ({ ...prev, yks, dept: "", lang: "", level: "", budget: "" }));
                        }}
                      />
                    ) : null}
                    <ChoiceGroup
                      label={score.askYks ? "Lise ortalamanız" : `2. ${score.label}`}
                      value={answers.gpa}
                      options={score.gpaOptions}
                      onChange={(gpa) => {
                        resetFrom((prev) => ({ ...prev, gpa, dept: "", lang: "", level: "", budget: "" }));
                      }}
                    />
                  </div>
                );
              }
              if (step === "dept") {
                return (
                  <ChoiceGroup
                    key={step}
                    label="3. Hangi alanda okumak istiyorsunuz?"
                    value={answers.dept}
                    options={DEPT_OPTIONS}
                    onChange={(dept) => {
                      resetFrom((prev) => ({ ...prev, dept, lang: "", level: "", budget: "" }));
                    }}
                  />
                );
              }
              if (step === "lang") {
                return (
                  <ChoiceGroup
                    key={step}
                    label="4. Yabancı dil bilginiz nedir?"
                    hint="En iyi bildiğiniz dil"
                    value={answers.lang}
                    options={LANG_OPTIONS}
                    onChange={(lang) => {
                      resetFrom((prev) => ({ ...prev, lang, level: "", budget: "" }));
                    }}
                  />
                );
              }
              if (step === "level") {
                return (
                  <ChoiceGroup
                    key={step}
                    label="5. Bu dildeki seviyeniz nedir?"
                    value={answers.level}
                    options={LEVEL_OPTIONS}
                    onChange={(level) => {
                      resetFrom((prev) => ({ ...prev, level, budget: "" }));
                    }}
                  />
                );
              }
              return (
                <ChoiceGroup
                  key={step}
                  label="6. İlk sene için tahmini bütçeniz"
                  hint="Her şey dahil"
                  value={answers.budget}
                  options={BUDGET_OPTIONS}
                  onChange={(budget) => {
                    setOpenStep(null);
                    setAnswers((prev) => ({ ...prev, budget }));
                    setResult(null);
                    setPopupOpen(false);
                    clearTimers();
                  }}
                />
              );
            })}

          {steps.includes("calculate") && activeStep === null ? (
            <button
              type="button"
              onClick={calculate}
              className="w-full rounded-xl border-4 border-zap-ink bg-zap-night py-3.5 text-[14px] font-black uppercase tracking-wide text-white shadow-[4px_4px_0_rgb(6_50_66)] transition hover:bg-zap-ink"
            >
              {answers.education === "lise_okuyor" ? "Danışmanla görüş" : "Uygun ülkeleri bul"}
            </button>
          ) : null}
        </div>
      </section>

      <div ref={resultsRef} className="flex min-w-0 flex-col gap-4">
        {result?.kind === "early" ? (
          <section className="rounded-2xl border-4 border-zap-ink bg-brand-aqua/15 p-4 text-[15px] font-semibold leading-relaxed text-zap-night sm:p-5">
            Henüz liseden mezun olmadığınız için alternatifleri öğrenmek adına danışmanlarımızla iletişime geçebilirsiniz.
            Erken planlama yapmak, dil yeterliliğini sağlamak ve sürece şimdiden hazırlanmak büyük avantaj sağlar.
          </section>
        ) : null}
        {result?.kind === "empty" ? (
          <section className="rounded-2xl border-4 border-zap-ink bg-white p-4 sm:p-5">
            <h2 className="text-lg font-black text-zap-night">Özel planlama gerekli</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-zap-ink/80">
              Seçtiğiniz kriterlere uyan standart bir rota bulunamadı. Size özel alternatifler için formu doldurabilirsiniz.
            </p>
          </section>
        ) : null}
        {result?.kind === "list" ? (
          <section aria-live="polite">
            <h2 className="text-[1.35rem] font-black text-zap-night">Size uygun ülkeler</h2>
            <p className="mt-1 text-[14px] font-medium text-zap-ink/70">Kriterlerinize göre değerlendirebileceğiniz seçenekler.</p>
            <div className="mt-4 flex max-h-[70vh] flex-col gap-3 overflow-y-auto overscroll-contain pr-1">
              {result.countries.map((country) => (
                <CountryCard key={country.name} country={country} />
              ))}
            </div>
            {result.countries.length > 2 ? (
              <p className="mt-2 flex items-center gap-1 text-[12px] font-bold text-zap-ink/55">
                <ChevronDown className="h-4 w-4" aria-hidden />
                Diğer ülkeler için kaydırın
              </p>
            ) : null}
          </section>
        ) : null}

        <LeadCard
          idPrefix="uni-main"
          values={mainLead}
          error={mainError}
          sending={mainSending}
          done={mainDone}
          onChange={setMainLead}
          onActivity={() => {
            if (!result || submittedRef.current) return;
            clearTimers();
            idleTimer.current = window.setTimeout(() => {
              if (!submittedRef.current) setPopupOpen(true);
            }, 15000);
          }}
          onSubmit={() => void send("form", mainLead)}
        />
      </div>

      {popupOpen ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="presentation">
          <button type="button" className="absolute inset-0 bg-zap-night/60" aria-label="Pencereyi kapat" onClick={() => setPopupOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="uni-popup-title"
            className="relative z-[1] max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border-4 border-zap-ink bg-[#f7fbfb] p-4 shadow-brutal sm:max-w-lg sm:rounded-2xl sm:p-5"
          >
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-zap-ink bg-white"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
            {popupDone ? (
              <div className="px-2 py-8 text-center">
                <p className="text-xl font-black text-zap-night">Teşekkürler</p>
                <p className="mt-2 text-[15px] font-semibold leading-relaxed text-zap-ink/80">
                  Formun bize ulaştı. Eğitim danışmanlarımız en kısa sürede seninle iletişime geçecek.
                </p>
              </div>
            ) : (
              <>
                <h2 id="uni-popup-title" className="pr-10 text-[1.25rem] font-black leading-tight text-zap-night">
                  Sonucu danışmanla değerlendir
                </h2>
                <p className="mt-1 text-[14px] font-medium text-zap-ink/70">Yol haritanı beraber oluşturalım.</p>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex min-h-11 items-center justify-center rounded-xl border-4 border-[#128C7E] bg-[#25D366] px-4 py-3 text-[14px] font-black text-white"
                >
                  WhatsApp’tan danış
                </a>
                <p className="my-4 text-center text-[13px] font-black uppercase tracking-wide text-brand-teal">
                  Ücretsiz ön görüşme için formu doldur
                </p>
                <LeadFields
                  idPrefix="uni-popup"
                  values={popupLead}
                  error={popupError}
                  sending={popupSending}
                  onChange={setPopupLead}
                  onSubmit={() => void send("popup", popupLead)}
                />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
