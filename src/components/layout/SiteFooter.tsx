import React from "react";
import { ArrowUp, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { footerIletisim, preFooterPrograms, preFooterSubeler } from "@/data/home-ia";
import { titleDarkOnBand } from "@/styles/typography";

const inner = "relative mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-14";

export function SiteFooter() {
  const telHref =
    footerIletisim.tel.includes("_") ? "#site-footer" : `tel:${footerIletisim.tel.replace(/[^\d+]/g, "")}`;

  return (
    <footer id="site-footer" className="relative mt-auto scroll-mt-24 overflow-hidden border-t-4 border-zap-ink bg-zap-night text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_10%_0%,rgba(3,214,186,0.16),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[22rem] w-[22rem] rounded-full bg-brand-flame/18 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-brand-aqua/14 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:2.25rem_2.25rem] opacity-50"
        aria-hidden
      />
      <div
        className="relative h-2.5 w-full bg-gradient-to-r from-zap-burst via-brand-aqua to-brand-flame shadow-[0_0_28px_rgba(3,214,186,0.32)]"
        aria-hidden
      />
      <div className="relative z-[1]">
        <div className={`${inner} pb-12 pt-10 md:pb-16 md:pt-12`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-2xl border-4 border-zap-burst/45 bg-zap-burst/18 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zap-burst">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                Campus Global
              </div>
              <h2 className="mt-5 text-[clamp(1.5rem,3.2vw,1.95rem)] font-black uppercase leading-[0.95]" style={titleDarkOnBand}>
                Yurtdışında eğitim, <span className="text-zap-burst">aynı ekip</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] font-semibold leading-relaxed text-white/76">
                Türkiye genelinden yurtdışında dil okulu, lisans ve yüksek lisans adayları için başvuru, evrak ve vize süreçlerinde tek
                noktadan koordinasyon.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {preFooterPrograms.slice(0, 4).map((l) => (
                  <a
                    key={l.label}
                    href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border-2 border-white/24 bg-white/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white/92 transition hover:border-zap-burst/75 hover:bg-zap-burst/12"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="h-full min-h-0 rounded-2xl border-4 border-zap-ink/90 bg-gradient-to-b from-zap-night/95 to-[#0a313a] p-5 shadow-brutal sm:p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-zap-burstLight">İletişim</p>
                <a
                  className="mt-4 flex min-h-14 items-center gap-3.5 text-[1rem] font-black leading-snug text-white transition hover:text-zap-burst"
                  href={telHref}
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-4 border-zap-ink bg-zap-burst text-zap-night shadow-sm">
                    <Phone className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                  </span>
                  {footerIletisim.tel}
                </a>
                <a
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-4 border-zap-ink bg-zap-burst/95 px-4 py-2.5 text-center text-[12px] font-black uppercase tracking-wide text-zap-night shadow-brutal transition hover:brightness-110"
                  href={`mailto:${footerIletisim.email}`}
                >
                  <Mail className="h-4 w-4" strokeWidth={2.1} aria-hidden />
                  {footerIletisim.email}
                </a>
                <p className="mt-4 flex items-center gap-2.5 text-[12px] font-medium text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-zap-burst ring-2 ring-zap-burst/40" aria-hidden />
                  {footerIletisim.mesai}
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-zap-burstLight">Şubeler</p>
              <ul className="mt-5 space-y-2.5">
                {preFooterSubeler.slice(0, 5).map((s) => (
                  <li key={`ft-${s.sehir}`}>
                    <div className="flex items-center gap-2.5 rounded-xl border-2 border-white/12 bg-white/[0.04] px-3 py-2.5 text-[12px] font-bold leading-snug text-white/80">
                      <MapPin className="h-4 w-4 shrink-0 text-zap-burst" strokeWidth={2.1} aria-hidden />
                      <span>
                        <span className="text-white/95">{s.sehir}</span> · {s.ad}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-white/14 pt-8 sm:flex-row sm:pt-10">
            <p className="order-2 text-center text-[12px] font-semibold text-white/45 sm:order-1 sm:text-left">
              © {new Date().getFullYear()} Campus Global · Tüm hakları saklıdır.
            </p>
            <a
              className="order-1 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-2 border-white/28 bg-white/5 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/90 transition hover:border-zap-burst/55 sm:order-2"
              href="#top"
              aria-label="Sayfanın başına dön"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              Başa dön
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
