import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ExternalLink, Menu, Phone, Sparkles, X } from "lucide-react";
import { megaNav, megaNavRowLeft, megaNavRowRight } from "@/data/site-nav";
import { footerIletisim } from "@/data/home-ia";
import { navPanelHeading } from "@/styles/typography";

/** ELT tarzı düzen: sol 4 ana başlık, sağ 5 (logo ortada) */
/** Aktif `hero.tsx` nav düğmesi — DM Sans 14–15px medium; açıkken lime pill (`border-[#0b1f3f] bg-[#CCFF00]` ↔ zap-ink / zap-burst) */
function navLinkClass(active: boolean) {
  return [
    "inline-flex max-w-[11rem] items-center gap-1 rounded-lg border-2 px-2.5 py-2 text-left font-sans text-[14px] font-medium leading-normal tracking-[0.01em] text-zap-ink antialiased transition sm:max-w-[13rem] md:max-w-[15rem] xl:max-w-[17rem] 2xl:max-w-none xl:px-3 xl:text-[15px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/35",
    active
      ? "border-zap-ink bg-zap-burst font-semibold shadow-[2px_2px_0_rgb(6_50_66)]"
      : "border-transparent hover:border-zap-ink/25 hover:bg-white",
  ].join(" ");
}

function TopBarActions({ className = "" }: { className?: string }) {
  const telHref =
    footerIletisim.tel.includes("_") ? "#site-footer" : `tel:${footerIletisim.tel.replace(/[^\d+]/g, "")}`;

  return (
    <div className={`flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2 ${className}`}>
      <a
        href={telHref}
        className="inline-flex min-w-0 max-w-[12rem] items-center gap-1.5 rounded-md border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:border-zap-burstLight/60 hover:bg-white/15 sm:max-w-none sm:px-3 sm:text-sm"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
      >
        <Phone className="h-3.5 w-3.5 shrink-0 text-zap-burstLight" strokeWidth={2.5} aria-hidden />
        <span className="truncate">{footerIletisim.tel}</span>
      </a>
      <a
        href="/iletisim"
        className="inline-flex items-center gap-1.5 rounded-md border-2 border-zap-ink bg-zap-burst px-3 py-1.5 text-xs font-bold uppercase leading-none tracking-wide text-zap-ink shadow-[1px_2px_0_rgba(0,0,0,0.35)] transition hover:bg-[#ffd166] sm:text-sm"
        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.35)" }}
      >
        İletişim
        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </a>
    </div>
  );
}

/**
 * Açık renkli header, üst barda telefon+iletişim; nav butonları açık tema; mega menü absolute (sayfayı itmez).
 */
export function SiteHeader() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<string | null>(null);
  const [mobileCol, setMobileCol] = useState<Record<string, number>>({});
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onDoc = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    const t = window.setTimeout(() => document.addEventListener("click", onDoc), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onDoc);
    };
  }, [openId]);

  const NavButtons = ({ items }: { items: typeof megaNav }) => (
    <>
      {items.map((item) => (
        <div key={item.id} className="relative shrink-0">
          <button
            type="button"
            className={navLinkClass(openId === item.id)}
            aria-expanded={openId === item.id}
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              setOpenId((d) => (d === item.id ? null : item.id));
            }}
          >
            <span className="min-w-0 flex-1 truncate 2xl:whitespace-normal">{item.title}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 opacity-70 transition ${openId === item.id ? "rotate-180" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
          </button>
        </div>
      ))}
    </>
  );

  return (
    <header id="site-header" className="sticky top-0 z-[80] w-full font-sans text-zap-ink">
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-aqua via-brand-teal to-brand-flame sm:h-1" aria-hidden />

      <div
        ref={shellRef}
        className="relative w-full border-b-2 border-zap-ink/10 bg-gradient-to-b from-white via-[#e8faf7] to-[#dff5f2] shadow-[0_8px_32px_rgba(3,214,186,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar: koyu — yalnızca md+; mobilde gizli (ek alan, sade logo+menü) */}
        <div className="hidden border-b border-white/10 bg-zap-night px-3 py-1.5 text-white sm:px-4 sm:py-2 md:block md:px-5">
          <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-3">
              <span className="inline-flex items-center gap-1.5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-zap-burst" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm md:text-[15px]">
                  Campus Global
                </span>
              </span>
              <span className="hidden h-3.5 w-px bg-white/25 sm:block" aria-hidden />
              <span
                className="text-xs font-semibold text-zap-burstLight sm:text-sm md:text-[15px]"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
              >
                Şeffaf danışmanlık
              </span>
              <span className="hidden text-white/40 md:inline" aria-hidden>
                ·
              </span>
              <span
                className="hidden text-xs text-white/85 sm:text-sm md:inline md:text-[15px] md:leading-snug"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                Dil okulu · üniversite · yüksek lisans danışmanlığı
              </span>
            </div>
            <TopBarActions />
          </div>
        </div>

        {/* Desktop: tek satır grid — nav asla logonun altına düşmez */}
        <div className="mx-auto hidden w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 px-2 py-1.5 sm:px-3 md:gap-x-3 md:px-4 lg:grid lg:min-h-[3.5rem]">
          <div className="flex min-h-0 min-w-0 items-center justify-end gap-1 overflow-x-auto overflow-y-visible rounded-xl border-2 border-zap-ink bg-[#f8fafc] px-1.5 py-1 shadow-[3px_3px_0_rgba(6,50,66,0.12)] [scrollbar-width:thin] sm:gap-1.5 sm:px-2">
            <NavButtons items={megaNavRowLeft} />
          </div>
          <a
            href="/"
            className="group relative flex shrink-0 items-center justify-self-center outline-offset-4"
            onClick={() => setMobileOpen(false)}
            aria-label="Campus Global — ana sayfa"
          >
            <span
              className="pointer-events-none absolute -left-0.5 -top-0.5 z-[1] h-5 w-5 border-l-2 border-t-2 border-zap-burst sm:h-6 sm:w-6"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -bottom-0.5 -right-0.5 z-[1] h-5 w-5 border-b-2 border-r-2 border-brand-aqua sm:h-6 sm:w-6"
              aria-hidden
            />
            <span className="relative flex items-center rounded-lg border border-zap-ink/10 bg-white px-2 py-1 shadow-md ring-1 ring-zap-ink/5 sm:rounded-xl sm:px-2.5 sm:py-1.5">
              <img
                src="/campus-global-logo.png"
                alt="Campus Global"
                className="h-9 w-auto sm:h-10 md:h-11"
                width={300}
                height={90}
                loading="eager"
                decoding="async"
                style={{ maxHeight: "3.35rem" }}
              />
            </span>
          </a>
          <div className="flex min-h-0 min-w-0 items-center justify-start gap-1 overflow-x-auto overflow-y-visible rounded-xl border-2 border-zap-ink bg-[#f8fafc] px-1.5 py-1 shadow-[3px_3px_0_rgba(6,50,66,0.12)] [scrollbar-width:thin] sm:gap-1.5 sm:px-2">
            <NavButtons items={megaNavRowRight} />
          </div>
        </div>

        {/* Mobil: logo + menü (üst barda zaten telefon+iletişim) */}
        <div className="grid w-full grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 px-3 py-2 sm:px-4 md:px-5 lg:hidden">
          <span className="w-11 shrink-0" aria-hidden />
          <a
            href="/"
            className="group relative flex min-w-0 justify-center justify-self-center outline-offset-4"
            onClick={() => setMobileOpen(false)}
            aria-label="Campus Global — ana sayfa"
          >
            <span
              className="pointer-events-none absolute -left-0.5 -top-0.5 z-[1] h-6 w-6 border-l-2 border-t-2 border-zap-burst"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -bottom-0.5 -right-0.5 z-[1] h-6 w-6 border-b-2 border-r-2 border-brand-aqua"
              aria-hidden
            />
            <span className="relative block rounded-lg border border-zap-ink/10 bg-white px-2 py-1 shadow-sm ring-1 ring-zap-ink/5 sm:rounded-xl sm:px-2.5 sm:py-1.5">
              <img
                src="/campus-global-logo.png"
                alt="Campus Global"
                className="h-12 w-auto sm:h-14"
                width={300}
                height={90}
                loading="eager"
                decoding="async"
                style={{ maxHeight: "3.65rem" }}
              />
            </span>
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center justify-self-end rounded-xl border-2 border-zap-ink/20 bg-white text-zap-ink shadow-[2px_2px_0_rgb(6_50_66)] transition hover:border-brand-teal"
            aria-expanded={mobileOpen}
            aria-controls="mobile-main-nav"
            onClick={() => {
              setMobileOpen((o) => !o);
              setOpenId(null);
              setMobileAcc(null);
            }}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="sr-only">Menü</span>
          </button>
        </div>

        {/* Mega: absolute — sayfa layout’unu itmez */}
        {openId ? <MegaPanel openId={openId} onClose={() => setOpenId(null)} /> : null}
      </div>

      {mobileOpen ? (
        <MobileNav
          mobileAcc={mobileAcc}
          setMobileAcc={setMobileAcc}
          mobileCol={mobileCol}
          setMobileCol={setMobileCol}
          onClose={() => setMobileOpen(false)}
        />
      ) : null}
    </header>
  );
}

function MegaPanel({ openId, onClose }: { openId: string; onClose: () => void }) {
  const item = megaNav.find((m) => m.id === openId);
  const [activeCol, setActiveCol] = useState(0);

  useEffect(() => {
    setActiveCol(0);
  }, [openId]);

  if (!item) return null;

  const colMax = Math.max(0, item.columns.length - 1);
  const safeIdx = Math.min(Math.max(0, activeCol), colMax);
  const current = item.columns[safeIdx] ?? item.columns[0];

  return (
    <div
      className="absolute left-0 right-0 top-full z-[90] max-h-[min(78vh,820px)] overflow-y-auto border-t-4 border-zap-burst bg-zap-ink shadow-[0_24px_64px_rgba(0,0,0,0.28)]"
      role="region"
      aria-label="Alt menü"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(3,214,186,0.1),transparent_55%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5 sm:py-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-zap-night p-5 shadow-brutal ring-1 ring-white/10 sm:p-6 md:rounded-[1.35rem] md:p-8">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-brand-aqua/8"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-3 top-3 z-[1] h-7 w-7 border-l-2 border-t-2 border-zap-burst sm:left-4 sm:top-4 sm:h-9 sm:w-9"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-3 right-3 z-[1] h-7 w-7 border-b-2 border-r-2 border-brand-aqua sm:bottom-4 sm:right-4 sm:h-9 sm:w-9"
            aria-hidden
          />

          <div className="relative z-[2] flex flex-col gap-5 border-b border-dashed border-white/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zap-burstLight md:text-[12px]"
                style={navPanelHeading}
              >
                <Sparkles className="h-3.5 w-3.5 text-zap-burst md:h-4 md:w-4" aria-hidden />
                {item.title}
              </p>
              {item.blurb ? (
                <p className="mt-2 max-w-2xl text-[15px] font-semibold leading-relaxed text-white md:text-[16px]">
                  {item.blurb}
                </p>
              ) : null}
            </div>
            <a
              href={item.href}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-zap-burst px-5 py-2.5 text-[12px] font-black uppercase tracking-wide text-zap-ink shadow-brutal transition hover:bg-[#ffd166] sm:w-auto md:px-6 md:py-3 md:text-[13px]"
              onClick={onClose}
            >
              Bölüme git
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          </div>

          <div className="relative z-[2] mt-6 flex min-h-[10rem] flex-col gap-4 md:min-h-[12rem] md:flex-row md:gap-0">
            <div
              className="flex w-full shrink-0 flex-col border-b border-dashed border-white/15 pb-4 md:w-56 md:border-b-0 md:border-r md:pb-0 md:pr-4 lg:w-64"
              role="tablist"
              aria-label="Kategoriler"
            >
              {item.columns.map((c, i) => (
                <button
                  key={c.heading}
                  type="button"
                  role="tab"
                  aria-selected={safeIdx === i}
                  className={`mb-1.5 w-full rounded-xl border-2 px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wide transition sm:text-[13px] ${
                    safeIdx === i
                      ? "border-zap-burst bg-zap-burst/20 text-zap-burstLight shadow-[2px_2px_0_rgb(6_50_66)]"
                      : "border-white/20 bg-zap-ink/80 text-white/90 hover:border-white/40 hover:bg-zap-ink"
                  }`}
                  style={navPanelHeading}
                  onClick={() => setActiveCol(i)}
                >
                  {c.heading}
                </button>
              ))}
            </div>
            <div
              className="min-w-0 flex-1 pl-0 md:pl-6 lg:pl-8"
              role="tabpanel"
              aria-label={current?.heading ?? "Sayfalar"}
            >
              {current ? (
                <ul className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
                  {current.links.map((l) => (
                    <li key={l.label + l.href} className="min-w-0">
                      <a
                        href={l.href}
                        className="group flex items-start gap-1.5 rounded-lg border-2 border-transparent px-1.5 py-2 text-[14px] font-semibold leading-snug text-white transition hover:border-white/25 hover:bg-white/8 hover:text-zap-burstLight md:text-[15px]"
                        onClick={onClose}
                      >
                        <span className="min-w-0 flex-1">{l.label}</span>
                        {l.href.startsWith("http") ? (
                          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-90" aria-hidden />
                        ) : null}
                      </a>
                      {l.desc ? (
                        <p className="mt-0.5 text-[12px] font-medium leading-snug text-white/50 line-clamp-2 md:text-[13px]">
                          {l.desc}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({
  mobileAcc,
  setMobileAcc,
  mobileCol,
  setMobileCol,
  onClose,
}: {
  mobileAcc: string | null;
  setMobileAcc: React.Dispatch<React.SetStateAction<string | null>>;
  mobileCol: Record<string, number>;
  setMobileCol: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onClose: () => void;
}) {
  return (
    <div
      id="mobile-main-nav"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 bottom-0 max-h-[min(92dvh,900px)] overflow-y-auto rounded-t-[2rem] border-t-4 border-zap-burst bg-gradient-to-b from-white to-[#e6faf8] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 text-zap-ink shadow-[0_-24px_64px_rgba(3,214,186,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-zap-burst via-brand-aqua to-brand-flame" aria-hidden />
        <p
          className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-zap-ink/80"
          style={navPanelHeading}
        >
          Menü
        </p>

        <div className="mx-auto mt-5 w-full max-w-lg space-y-3">
          {megaNav.map((item) => {
            const cIdx = mobileCol[item.id] ?? 0;
            const col = item.columns[cIdx] ?? item.columns[0];
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border-2 border-zap-ink/15 bg-white shadow-[3px_3px_0_rgb(6_50_66)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-4 text-left"
                  style={navPanelHeading}
                  aria-expanded={mobileAcc === item.id}
                  onClick={() => setMobileAcc((a) => (a === item.id ? null : item.id))}
                >
                  <span className="text-[12px] uppercase tracking-[0.06em] text-zap-ink">{item.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-brand-teal transition ${mobileAcc === item.id ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {mobileAcc === item.id ? (
                  <div className="border-t-2 border-dashed border-zap-ink/15 bg-[#f0fbf9] px-2 py-3 sm:px-3">
                    <a
                      href={item.href}
                      className="mb-3 flex items-center justify-center gap-2 rounded-full border-2 border-zap-ink bg-zap-burst py-2.5 text-center text-[11px] font-black uppercase tracking-wide text-zap-ink shadow-[2px_2px_0_rgb(6_50_66)]"
                      onClick={onClose}
                    >
                      Bölüme git
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <div className="flex shrink-0 flex-wrap gap-1.5 sm:w-40 sm:flex-col sm:gap-1">
                        {item.columns.map((c, i) => (
                          <button
                            key={c.heading}
                            type="button"
                            className={`rounded-lg border-2 px-2.5 py-2 text-left text-[10px] font-bold uppercase leading-tight sm:text-[11px] ${
                              cIdx === i
                                ? "border-brand-teal bg-white text-zap-ink shadow-sm"
                                : "border-zap-ink/15 bg-white/80 text-zap-ink/90"
                            }`}
                            style={navPanelHeading}
                            onClick={() => setMobileCol((m) => ({ ...m, [item.id]: i }))}
                          >
                            {c.heading}
                          </button>
                        ))}
                      </div>
                      <ul className="min-w-0 flex-1 grid grid-cols-1 gap-1 border-t border-zap-ink/10 pt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                        {col?.links.map((l) => (
                          <li key={l.label + l.href} className="min-w-0">
                            <a
                              href={l.href}
                              className="block rounded-lg px-2 py-1.5 text-[14px] font-semibold leading-snug text-zap-ink hover:bg-white/80 hover:text-brand-flame"
                              onClick={onClose}
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
