import { useEffect, useRef, useState } from "react";
import { DitheringShader } from "@/components/ui/dithering-shader";

/** Hero yüksekliği sabit kalır; shader üst üste ölçülür (ResizeObserver, debounce). */
export function HeroDitherBackdrop() {
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
        shape="wave"
        type="8x8"
        colorBack="#0b4246"
        colorFront="#f51d00"
        pxSize={4}
        speed={0.4}
        maxFps={22}
        renderScale={0.62}
        pauseWhenTabHidden
        pauseWhenOffscreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
