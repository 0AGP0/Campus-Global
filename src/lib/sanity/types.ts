import type { MegaNavItem, NavColumn, NavSubLink } from "@/data/site-nav";

export type SanityNavLink = { label: string; href: string; desc?: string };
export type SanityNavColumn = { heading: string; links?: SanityNavLink[] };
export type SanityMegaNavItem = {
  id: string;
  title: string;
  href: string;
  blurb?: string;
  columns?: SanityNavColumn[];
};

export type SanityTocItem = { id: string; label: string; depth?: number };
export type SanityFaqItem = { question: string; answer: string };

export type SanityArticle = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  publishedISO: string;
  modifiedISO?: string;
  eyebrow?: string;
  section?: string;
  readingMinutes: number;
  toc?: SanityTocItem[];
  faq?: SanityFaqItem[];
  bodyHtml: string;
  showInNav?: boolean;
  navMegaId?: string;
  navColumnHeading?: string;
  navLabel?: string;
  navOrder?: number;
};

export type SanitySiteNavigation = {
  megaNavItems?: SanityMegaNavItem[];
  rowLeftIds?: string[];
  rowRightIds?: string[];
};

export function mapNavLink(link: SanityNavLink): NavSubLink {
  return {
    label: link.label,
    href: link.href.startsWith("/") ? link.href : `/${link.href}`,
    desc: link.desc,
  };
}

export function mapMegaNavItem(item: SanityMegaNavItem): MegaNavItem {
  return {
    id: item.id,
    title: item.title,
    href: item.href.startsWith("/") ? item.href : `/${item.href}`,
    blurb: item.blurb,
    columns: (item.columns ?? []).map((col): NavColumn => ({
      heading: col.heading,
      links: (col.links ?? []).map(mapNavLink),
    })),
  };
}

export type CmsArticle = {
  source: "sanity" | "markdown";
  slug: string;
  title: string;
  description: string;
  keywords: string;
  publishedISO: string;
  modifiedISO: string;
  eyebrow?: string;
  section?: string;
  readingMinutes?: number;
  toc?: { id: string; label: string; depth?: 2 | 3 }[];
  faq?: { question: string; answer: string }[];
  bodyHtml?: string;
};
