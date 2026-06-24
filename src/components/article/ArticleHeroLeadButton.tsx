import React, { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { LeadFormPrefill } from "@/data/lead-form-data";
import { CampusLeadForm } from "@/components/lead/CampusLeadForm";

type Props = {
  /** Boş bırakılırsa varsayılan Türkçe etiket kullanılır */
  label?: string;
  /** Ülke sayfası URL’si — program ve ülke eşleşirse ilk iki adım atlanır */
  leadFormPrefill?: LeadFormPrefill | null;
};

/**
 * Makale / şablon hero’sunda 3 adımlı ön talep formu (program · ülke · iletişim).
 * Native `<dialog>` kullanılmaz — overflow/stacking sorunlarında kapanma güvenilir olsun diye tamamen kontrollü overlay.
 */
export function ArticleHeroLeadButton({ label, leadFormPrefill }: Props) {
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const handleOpen = () => {
    setSession((s) => s + 1);
    setOpen(true);
  };

  const buttonLabel = label?.trim() || "Ücretsiz danışmanlık talebi";

  const overlay =
    open && mounted ? (
      <div
        className="qx-lead-overlay fixed inset-0 z-[2147483000] overflow-y-auto overflow-x-hidden overscroll-contain bg-transparent [-webkit-overflow-scrolling:touch]"
        role="presentation"
      >
        <div className="relative flex min-h-[100dvh] w-full justify-center px-3 py-5 sm:px-4 sm:py-8 md:py-10">
          {/* Tam alan tıklaması = kapat — içerik üstte, pointer-events ile ayrılıyor */}
          <button
            type="button"
            className="absolute inset-0 block cursor-default border-0 bg-zap-night/55 p-0 backdrop-blur-[2px]"
            aria-label="Formu kapat"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panelId}-title`}
            className="relative z-10 my-auto w-full max-w-[560px] outline-none sm:max-w-[640px] md:max-w-[680px]"
          >
            <div className="pointer-events-auto relative">
              <h2 id={`${panelId}-title`} className="sr-only">
                Ön talep ve teklif formu
              </h2>
              <button
                type="button"
                onClick={close}
                className="absolute right-1 top-2 z-[50] flex h-11 w-11 items-center justify-center rounded-xl border-4 border-zap-ink bg-white text-zap-ink transition hover:bg-brand-aqua/20 sm:right-2 sm:top-3"
                aria-label="Formu kapat"
              >
                <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              </button>
              <CampusLeadForm key={session} onClose={close} leadFormPrefill={leadFormPrefill ?? undefined} />
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="mt-6 md:mt-7">
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex min-h-[48px] w-full max-w-md items-center justify-center gap-2 rounded-full border-4 border-zap-ink bg-zap-burst px-8 py-3 text-center text-[13px] font-black uppercase tracking-wide text-zap-night transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2 sm:w-auto"
        >
          {buttonLabel}
        </button>
      </div>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
