import {
  collectSlugPathsFromNav,
  getStaticSiteNavigation,
  type SiteNavigationBundle,
} from "@/lib/cms/navigation-bundle";

export type { SiteNavigationBundle } from "@/lib/cms/navigation-bundle";
export { collectSlugPathsFromNav } from "@/lib/cms/navigation-bundle";

let cachedNavigation: SiteNavigationBundle | null = null;

export async function getSiteNavigation(): Promise<SiteNavigationBundle> {
  if (cachedNavigation) return cachedNavigation;
  cachedNavigation = getStaticSiteNavigation();
  return cachedNavigation;
}
