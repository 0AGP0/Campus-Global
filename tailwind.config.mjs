/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        /** Marka — logo */
        brand: {
          aqua: "#03d6ba",
          teal: "#00a39b",
          flame: "#f51d00",
          coral: "#ff4b33",
        },
        /** Zıt / cesur yüzeyler (Aktif Kampüs tarzı canlılık) — yeşil yerine sıcak amber burst */
        zap: {
          /** Ana vurgu: "net karar" ve CTA ikonları (lime yerine) */
          burst: "#ffb703",
          burstLight: "#ffd166",
          lemon: "#fff066",
          night: "#041a24",
          ink: "#063242",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "8px 8px 0 rgb(6 50 66)",
        brutalLg: "12px 12px 0 rgb(6 50 66)",
      },
    },
  },
  plugins: [],
};
