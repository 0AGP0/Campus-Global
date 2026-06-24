/**
 * Navbar verisini JS bundle’a yazar — astro-island props’a dev JSON gömülmesin (hydration kopması).
 */
import { config } from "dotenv";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildNavigationBundle } from "../src/lib/cms/navigation-bundle.ts";
import { isSanityConfigured } from "../src/lib/sanity/client.ts";
import { fetchSanityArticles, fetchSanityNavigation } from "../src/lib/sanity/queries.ts";

const root = join(import.meta.dirname, "..");
config({ path: join(root, ".env") });

let nav = buildNavigationBundle(null, []);

if (isSanityConfigured()) {
  const [remote, articles] = await Promise.all([fetchSanityNavigation(), fetchSanityArticles()]);
  nav = buildNavigationBundle(
    remote,
    articles.map((a) => ({
      slug: a.slug,
      showInNav: a.showInNav,
      navMegaId: a.navMegaId,
      navColumnHeading: a.navColumnHeading,
      navLabel: a.navLabel,
      navOrder: a.navOrder,
    })),
  );
}

const outPath = join(root, "src/data/generated-site-nav.ts");

const payload = {
  megaNav: nav.megaNav,
  megaNavRowLeft: nav.megaNavRowLeft,
  megaNavRowRight: nav.megaNavRowRight,
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
console.log(`✓ generated-site-nav.ts (${nav.source}, ${nav.megaNav.length} mega menü)`);
