import { createClient, type SanityClient } from "@sanity/client";

const apiVersion = "2025-01-01";

export function isSanityConfigured(): boolean {
  const id = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  return typeof id === "string" && id.length > 0 && id !== "replace-me";
}

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;

  const token = import.meta.env.SANITY_API_READ_TOKEN;
  return createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
    apiVersion,
    useCdn: import.meta.env.PROD,
    token: token || undefined,
  });
}
