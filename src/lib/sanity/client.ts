import { createClient, type SanityClient } from "@sanity/client";

const apiVersion = "2025-01-01";

function envString(key: string): string | undefined {
  const fromMeta = (import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env?.[key];
  if (typeof fromMeta === "string" && fromMeta.length > 0) return fromMeta;
  const fromProcess = process.env[key];
  return typeof fromProcess === "string" && fromProcess.length > 0 ? fromProcess : undefined;
}

export function isSanityConfigured(): boolean {
  const id = envString("PUBLIC_SANITY_PROJECT_ID");
  return typeof id === "string" && id.length > 0 && id !== "replace-me";
}

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;

  const token = envString("SANITY_API_READ_TOKEN");
  const projectId = envString("PUBLIC_SANITY_PROJECT_ID");
  if (!projectId) return null;

  const isProd = (import.meta as ImportMeta & { env?: { PROD?: boolean } }).env?.PROD === true;

  return createClient({
    projectId,
    dataset: envString("PUBLIC_SANITY_DATASET") ?? "production",
    apiVersion,
    useCdn: isProd,
    token: token || undefined,
  });
}
