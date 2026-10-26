import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },
  integrations: [
    react(),
    // global.css zaten @tailwind base içeriyor — true olursa CSS iki kez basılıyor
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
