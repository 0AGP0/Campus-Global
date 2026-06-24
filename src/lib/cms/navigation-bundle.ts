import {
  megaNav,
  megaNavRowLeft,
  megaNavRowRight,
  type MegaNavItem,
} from "@/data/site-nav";
import { mapMegaNavItem, type SanityMegaNavItem, type SanitySiteNavigation } from "@/lib/sanity/types";

export type SiteNavigationBundle = {
  megaNav: MegaNavItem[];
  megaNavRowLeft: MegaNavItem[];
  megaNavRowRight: MegaNavItem[];
  source: "sanity" | "static";
};

export type NavArticleRef = {
  slug: string;
  showInNav?: boolean;
  navMegaId?: string;
  navColumnHeading?: string;
  navLabel?: string;
  navOrder?: number;
};

function pickRows(
  items: MegaNavItem[],
  leftIds: string[],
  rightIds: string[],
): { left: MegaNavItem[]; right: MegaNavItem[] } {
  const byId = new Map(items.map((m) => [m.id, m]));
  const left = leftIds.map((id) => byId.get(id)).filter(Boolean) as MegaNavItem[];
  const right = rightIds.map((id) => byId.get(id)).filter(Boolean) as MegaNavItem[];
  return { left, right };
}

export function mergeArticleNavLinks(base: MegaNavItem[], navArticles: NavArticleRef[]): MegaNavItem[] {
  const items = base.map((item) => ({
    ...item,
    columns: item.columns.map((col) => ({
      ...col,
      links: [...col.links],
    })),
  }));

  const byId = new Map(items.map((m) => [m.id, m]));

  for (const article of navArticles) {
    if (!article.showInNav || !article.navMegaId || !article.navColumnHeading || !article.navLabel) {
      continue;
    }
    const mega = byId.get(article.navMegaId);
    if (!mega) continue;

    let column = mega.columns.find((c) => c.heading === article.navColumnHeading);
    if (!column) {
      column = { heading: article.navColumnHeading, links: [] };
      mega.columns.push(column);
    }

    const href = `/${article.slug}`;
    const existingIdx = column.links.findIndex((l) => l.href === href);
    const link = { label: article.navLabel, href };
    if (existingIdx >= 0) {
      column.links[existingIdx] = link;
    } else {
      column.links.push(link);
    }

    column.links.sort((a, b) => {
      const ao = navArticles.find((x) => `/${x.slug}` === a.href)?.navOrder ?? 100;
      const bo = navArticles.find((x) => `/${x.slug}` === b.href)?.navOrder ?? 100;
      return ao - bo || a.label.localeCompare(b.label, "tr");
    });
  }

  return items;
}

export function buildNavigationBundle(
  remote: SanitySiteNavigation | null,
  articles: NavArticleRef[],
): SiteNavigationBundle {
  if (!remote?.megaNavItems?.length) {
    const merged = mergeArticleNavLinks(megaNav, articles);
    return {
      megaNav: merged,
      megaNavRowLeft: megaNavRowLeft.map((l) => merged.find((m) => m.id === l.id) ?? l),
      megaNavRowRight: megaNavRowRight.map((r) => merged.find((m) => m.id === r.id) ?? r),
      source: "static",
    };
  }

  const mapped = remote.megaNavItems.map((item) => mapMegaNavItem(item as SanityMegaNavItem));
  const merged = mergeArticleNavLinks(mapped, articles);

  const leftIds = remote.rowLeftIds ?? [];
  const rightIds = remote.rowRightIds ?? [];
  const { left, right } = pickRows(merged, leftIds, rightIds);

  const fallbackLeft = left.length ? left : megaNavRowLeft.map((l) => merged.find((m) => m.id === l.id) ?? l);
  const fallbackRight = right.length
    ? right
    : megaNavRowRight.map((r) => merged.find((m) => m.id === r.id) ?? r);

  return {
    megaNav: merged,
    megaNavRowLeft: fallbackLeft,
    megaNavRowRight: fallbackRight,
    source: "sanity",
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
