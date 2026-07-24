import { HeroDitherBackdrop } from "@/components/ui/hero-dither-backdrop";

/**
 * Makale hero sağ paneli — şeffaf zemin; header gradient + blur sol sütunla paylaşılır.
 * Dalga marka kimliğinin parçası; `prefers-reduced-motion` açıkken de gizlenmez, yalnızca
 * düşük tempo (speed 0.4 / 22 fps) ile çizilir.
 */
export function ArticleHeaderDitherPanel() {
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
