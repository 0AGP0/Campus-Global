/**
 * Navbar verisini JS bundle’a yazar — astro-island props’a dev JSON gömülmesin (hydration kopması).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { megaNav, megaNavRowLeft, megaNavRowRight } from "../src/data/site-nav.ts";

const root = join(import.meta.dirname, "..");
const outPath = join(root, "src/data/generated-site-nav.ts");

const payload = {
  megaNav,
  megaNavRowLeft,
  megaNavRowRight,
};

const file = `/** Otomatik üretildi — scripts/generate-site-nav-bundle.mts (elle düzenlemeyin) */
import type { MegaNavItem } from "./site-nav";

export const generatedSiteNav: {
  megaNav: MegaNavItem[];
  megaNavRowLeft: MegaNavItem[];
  megaNavRowRight: MegaNavItem[];
} = ${JSON.stringify(payload, null, 2)};
`;

writeFileSync(outPath, file, "utf8");
console.log(`✓ generated-site-nav.ts (static, ${megaNav.length} mega menü)`);
