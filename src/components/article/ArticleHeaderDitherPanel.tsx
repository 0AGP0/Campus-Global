import { useReducedMotion } from "motion/react";
import { HeroDitherBackdrop } from "@/components/ui/hero-dither-backdrop";

/**
 * Makale hero sağ paneli — şeffaf zemin; header gradient + blur sol sütunla paylaşılır.
 */
export function ArticleHeaderDitherPanel() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <HeroDitherBackdrop
        shape="waveSide"
        colorFront="#008f87"
        transparentBackground
        pauseWhenOffscreen={false}
      />
    </div>
  );
}
