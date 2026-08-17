import { megaNav, megaNavRowLeft, megaNavRowRight, type MegaNavItem } from "@/data/site-nav";

export type SiteNavigationBundle = {
  megaNav: MegaNavItem[];
  megaNavRowLeft: MegaNavItem[];
  megaNavRowRight: MegaNavItem[];
  source: "static";
};

export function getStaticSiteNavigation(): SiteNavigationBundle {
  return {
    megaNav,
    megaNavRowLeft,
    megaNavRowRight,
    source: "static",
  };
}

export function collectSlugPathsFromNav(nav: SiteNavigationBundle): string[] {
  const paths = new Set<string>();
  const push = (href: string) => {
    if (href.startsWith("/") && !href.startsWith("http")) {
      const rest = href.replace(/^\//, "");
      if (rest) paths.add(rest);
    }
  };

  for (const m of nav.megaNav) {
    push(m.href);
    for (const c of m.columns) {
      for (const l of c.links) push(l.href);
    }
  }
  return [...paths];
}
