import { useReducedMotion } from "motion/react";
import { HeroDitherBackdrop } from "@/components/ui/hero-dither-backdrop";

/**
 * Teal/mavi dither. CSS dönüşü YOK — -90° + overflow kırpması WebGL’i siyah gösteriyordu.
 */
export function ArticleHeaderDitherPanel() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden bg-transparent" aria-hidden>
        <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#03d6ba]/18 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-12 bottom-6 h-56 w-56 rounded-full bg-[#00a39b]/22 blur-3xl" aria-hidden />
      </div>
    );
  }

  /* Arkaplan header mint; ön renk marka teal–cyan (tailwind brand.aqua / brand.teal) */
  const headerMint = "#f6fdfb";
  const blueFront = "#00a39b";

  return (
    <div className="relative isolate h-full min-h-[300px] w-full overflow-hidden bg-transparent" aria-hidden>
      <HeroDitherBackdrop
        shape="waveSide"
        colorBack={headerMint}
        colorFront={blueFront}
        pauseWhenOffscreen={false}
      />
    </div>
  );
}
