import { megaNav, megaNavRowLeft, megaNavRowRight } from "@/data/site-nav";
import { isSanityConfigured } from "@/lib/sanity/client";
import { fetchSanityNavigation } from "@/lib/sanity/queries";
import {
  buildNavigationBundle,
  type SiteNavigationBundle,
} from "@/lib/cms/navigation-bundle";

export type { SiteNavigationBundle } from "@/lib/cms/navigation-bundle";
export { collectSlugPathsFromNav } from "@/lib/cms/navigation-bundle";

let cachedNavigation: SiteNavigationBundle | null = null;
let navigationInflight: Promise<SiteNavigationBundle> | null = null;

export async function getSiteNavigation(): Promise<SiteNavigationBundle> {
  if (cachedNavigation) return cachedNavigation;
  if (navigationInflight) return navigationInflight;

  navigationInflight = loadSiteNavigation();
  try {
    cachedNavigation = await navigationInflight;
    return cachedNavigation;
  } finally {
    navigationInflight = null;
  }
}

async function loadSiteNavigation(): Promise<SiteNavigationBundle> {
  if (!isSanityConfigured()) {
    return {
      megaNav,
      megaNavRowLeft,
      megaNavRowRight,
      source: "static",
    };
  }

  const remote = await fetchSanityNavigation();
  const { getAllCmsArticles } = await import("./articles");
  const articles = await getAllCmsArticles();

  return buildNavigationBundle(remote, articles);
}
