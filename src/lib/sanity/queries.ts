import { getSanityClient } from "./client";
import type { SanityArticle, SanitySiteNavigation } from "./types";

const articleFields = `
  _id,
  title,
  slug,
  description,
  keywords,
  publishedISO,
  modifiedISO,
  eyebrow,
  section,
  readingMinutes,
  toc,
  faq,
  bodyHtml,
  showInNav,
  navMegaId,
  navColumnHeading,
  navLabel,
  navOrder
`;

export async function fetchSanityArticles(): Promise<SanityArticle[]> {
  const client = getSanityClient();
  if (!client) return [];

  return client.fetch<SanityArticle[]>(
    `*[_type == "article" && defined(slug)] | order(slug asc) { ${articleFields} }`,
  );
}

export async function fetchSanityArticleBySlug(slug: string): Promise<SanityArticle | null> {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<SanityArticle | null>(
    `*[_type == "article" && slug == $slug][0] { ${articleFields} }`,
    { slug },
  );
}

export async function fetchSanityNavigation(): Promise<SanitySiteNavigation | null> {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<SanitySiteNavigation | null>(
    `*[_type == "siteNavigation" && _id == "siteNavigation"][0]{
      megaNavItems,
      rowLeftIds,
      rowRightIds
    }`,
  );
}
