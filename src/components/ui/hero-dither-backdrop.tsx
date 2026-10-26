import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { HeroPixelWaveFallback } from "@/components/ui/hero-pixel-wave-fallback";
import type { DitheringShape } from "@/components/ui/dithering-shader";

type ShaderProps = {
  className?: string;
  width: number;
  height: number;
  shape: DitheringShape;
  type: "8x8";
  colorBack: string;
  colorFront: string;
  pxSize: number;
  speed: number;
  maxFps: number;
  renderScale: number;
  pauseWhenTabHidden?: boolean;
  pauseWhenOffscreen?: boolean;
  transparentBackground?: boolean;
  onInit?: (ok: boolean) => void;
  style?: CSSProperties;
};

export interface HeroDitherBackdropProps {
  /** Arkaplan (dither koyu tonu) */
  colorBack?: string;
  /** Ön / vurgu rengi (ana sayfada turuncu-kırmızı wave) */
  colorFront?: string;
  /** Dalga ekseni: `wave` dikey, `waveSide` yatay (sol–sağ) */
  shape?: DitheringShape;
  /** Makale header gibi dar panellerde IO yanlışlıkla durdurmasın diye kapatılabilir */
  pauseWhenOffscreen?: boolean;
  /** Boş alanları şeffaf bırak; alttaki header gradient görünsün */
  transparentBackground?: boolean;
}

/** Hero yüksekliği sabit kalır; WebGL idle sonrası dinamik yüklenir (TBT). */
export function HeroDitherBackdrop({
  colorBack = "#0b4246",
  colorFront = "#f51d00",
  shape = "wave",
  pauseWhenOffscreen = true,
  transparentBackground = false,
}: HeroDitherBackdropProps = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1200, h: 520 });
  const [webglOk, setWebglOk] = useState(false);
  const [Shader, setShader] = useState<ComponentType<ShaderProps> | null>(null);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const apply = () => {
      const r = el.getBoundingClientRect();
      const w = Math.max(360, Math.floor(r.width));
      const h = Math.max(320, Math.floor(r.height));
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

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const load = () => {
      void import("@/components/ui/dithering-shader").then((mod) => {
        if (!cancelled) setShader(() => mod.DitheringShader as ComponentType<ShaderProps>);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 2200 });
    } else {
      timeoutId = window.setTimeout(load, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {!webglOk && !transparentBackground ? (
        <HeroPixelWaveFallback colorBack={colorBack} colorFront={colorFront} />
      ) : null}

      {Shader ? (
        <div className={webglOk ? "absolute inset-0" : "absolute inset-0 opacity-0"}>
          <Shader
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
            transparentBackground={transparentBackground}
            onInit={setWebglOk}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
}
