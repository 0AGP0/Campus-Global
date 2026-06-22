import { getCollection } from "astro:content";
import { fetchSanityArticles } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/lib/sanity/client";
import type { CmsArticle } from "@/lib/sanity/types";

export type CmsArticleWithNav = CmsArticle & {
  showInNav?: boolean;
  navMegaId?: string;
  navColumnHeading?: string;
  navLabel?: string;
  navOrder?: number;
};

function mdToCms(entry: Awaited<ReturnType<typeof getCollection<"articles">>>[number]): CmsArticleWithNav {
  const d = entry.data;
  return {
    source: "markdown",
    slug: entry.id,
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    publishedISO: d.publishedISO,
    modifiedISO: d.modifiedISO ?? d.publishedISO,
    eyebrow: d.eyebrow,
    section: d.section,
    readingMinutes: d.readingMinutes,
    toc: d.toc?.map((t) => ({
      id: t.id,
      label: t.label,
      depth: t.depth,
    })),
    faq: d.faq,
  };
}

export async function getAllCmsArticles(): Promise<CmsArticleWithNav[]> {
  const mdEntries = await getCollection("articles");
  const mdMap = new Map(mdEntries.map((e) => [e.id, mdToCms(e)]));
  const sanityArticles = isSanityConfigured() ? await fetchSanityArticles() : [];

  for (const s of sanityArticles) {
    mdMap.set(s.slug, {
      source: "sanity",
      slug: s.slug,
      title: s.title,
      description: s.description,
      keywords: s.keywords,
      publishedISO: s.publishedISO,
      modifiedISO: s.modifiedISO ?? s.publishedISO,
      eyebrow: s.eyebrow,
      section: s.section,
      readingMinutes: s.readingMinutes,
      toc: s.toc?.map((t) => ({
        id: t.id,
        label: t.label,
        depth: (t.depth === 3 ? 3 : 2) as 2 | 3,
      })),
      faq: s.faq,
      bodyHtml: s.bodyHtml,
      showInNav: s.showInNav,
      navMegaId: s.navMegaId,
      navColumnHeading: s.navColumnHeading,
      navLabel: s.navLabel,
      navOrder: s.navOrder,
    });
  }

  return [...mdMap.values()].sort((a, b) => a.slug.localeCompare(b.slug, "tr"));
}

export async function getCmsArticleBySlug(slug: string): Promise<CmsArticleWithNav | null> {
  const all = await getAllCmsArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const all = await getAllCmsArticles();
  return all.map((a) => a.slug);
}
