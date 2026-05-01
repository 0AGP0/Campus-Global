import { useEffect, useRef, useState } from "react";
import { DitheringShader, type DitheringShape } from "@/components/ui/dithering-shader";

export interface HeroDitherBackdropProps {
  /** Arkaplan (dither koyu tonu) */
  colorBack?: string;
  /** Ön / vurgu rengi (ana sayfada turuncu-kırmızı wave) */
  colorFront?: string;
  /** Dalga ekseni: `wave` dikey, `waveSide` yatay (sol–sağ) */
  shape?: DitheringShape;
  /** Makale header gibi dar panellerde IO yanlışlıkla durdurmasın diye kapatılabilir */
  pauseWhenOffscreen?: boolean;
}

/** Hero yüksekliği sabit kalır; shader üst üste ölçülür (ResizeObserver, debounce). */
export function HeroDitherBackdrop({
  colorBack = "#0b4246",
  colorFront = "#f51d00",
  shape = "wave",
  pauseWhenOffscreen = true,
}: HeroDitherBackdropProps = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 520 });
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const apply = () => {
      const r = el.getBoundingClientRect();
      const w = Math.max(360, Math.floor(r.width));
      const h = Math.max(320, Math.floor(r.height));
      /* Sık boyut güncellemesi WebGL effect’ini sürekli yeniden kurar → animasyon kesilir */
      setDims((prev) => (Math.abs(prev.w - w) > 28 || Math.abs(prev.h - h) > 28 ? { w, h } : prev));
    };

    apply();

    const ro = new ResizeObserver(() => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(apply);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <DitheringShader
        className="h-full w-full [&>div]:!h-full [&>div]:!w-full"
        width={dims.w}
        height={dims.h}
        shape={shape}
        type="8x8"
        colorBack={colorBack}
        colorFront={colorFront}
        pxSize={4}
        speed={0.4}
        maxFps={22}
        renderScale={0.62}
        pauseWhenTabHidden
        pauseWhenOffscreen={pauseWhenOffscreen}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
