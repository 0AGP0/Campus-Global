/**
 * WebGL dither açılamazsa: yükselen/alçalan piksel sütunları.
 * Ana sayfa hero’daki kare dalga hissini CSS ile taklit eder.
 */
export function HeroPixelWaveFallback({
  colorBack = "#0f4c75",
  colorFront = "#40c4ff",
}: {
  colorBack?: string;
  colorFront?: string;
}) {
  const cols = 48;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: colorBack }}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-end justify-between px-0">
        {Array.from({ length: cols }, (_, i) => {
          const delay = ((i * 0.11) % 2.4).toFixed(2);
          const duration = (2.8 + (i % 5) * 0.35).toFixed(2);
          const base = 28 + ((i * 17) % 55);
          return (
            <span
              key={i}
              className="hero-pixel-col mx-px w-full max-w-[14px] min-w-[6px] rounded-sm opacity-90"
              style={{
                backgroundColor: colorFront,
                height: `${base}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>
      <style>{`
        @keyframes hero-pixel-wave {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }
        .hero-pixel-col {
          transform-origin: bottom center;
          animation-name: hero-pixel-wave;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-pixel-col {
            animation: none;
            transform: scaleY(0.72);
          }
        }
      `}</style>
    </div>
  );
}
