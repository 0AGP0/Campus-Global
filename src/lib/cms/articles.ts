import { getCollection } from "astro:content";

export type CmsArticle = {
  source: "markdown";
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
};

function mdToCms(entry: Awaited<ReturnType<typeof getCollection<"articles">>>[number]): CmsArticle {
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

let cachedArticles: CmsArticle[] | null = null;
let articlesInflight: Promise<CmsArticle[]> | null = null;

export async function getAllCmsArticles(): Promise<CmsArticle[]> {
  if (cachedArticles) return cachedArticles;
  if (articlesInflight) return articlesInflight;

  articlesInflight = loadAllCmsArticles();
  try {
    cachedArticles = await articlesInflight;
    return cachedArticles;
  } finally {
    articlesInflight = null;
  }
}

async function loadAllCmsArticles(): Promise<CmsArticle[]> {
  const mdEntries = await getCollection("articles");
  return mdEntries.map(mdToCms).sort((a, b) => a.slug.localeCompare(b.slug, "tr"));
}

export async function getCmsArticleBySlug(slug: string): Promise<CmsArticle | null> {
  const all = await getAllCmsArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const all = await getAllCmsArticles();
  return all.map((a) => a.slug);
}
