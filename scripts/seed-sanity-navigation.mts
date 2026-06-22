/**
 * Mevcut site-nav.ts içeriğini Sanity siteNavigation belgesine yükler.
 * Gereken: SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, SANITY_API_WRITE_TOKEN
 */
import { config } from "dotenv";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { megaNav, megaNavRowLeft, megaNavRowRight, type MegaNavItem } from "../src/data/site-nav.ts";
import { withArrayKeys } from "./lib/sanity-array-keys.ts";

config({ path: resolve(import.meta.dirname, "../.env") });

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "replace-me") {
  console.error("SANITY_STUDIO_PROJECT_ID veya PUBLIC_SANITY_PROJECT_ID gerekli.");
  process.exit(1);
}
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN gerekli (Editor yetkisi).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

function toSanityMegaNav(item: MegaNavItem) {
  return {
    _type: "megaNavItem",
    _key: item.id,
    id: item.id,
    title: item.title,
    href: item.href,
    blurb: item.blurb,
    columns: withArrayKeys(item.columns, (col, ci) => {
      const heading = col.heading.replace(/[^a-z0-9]+/gi, "-").slice(0, 32);
      return `${item.id}-col-${ci}-${heading}`;
    })!.map((col, ci) => ({
      _type: "navColumn",
      _key: col._key,
      heading: col.heading,
      links: withArrayKeys(col.links, (link, li) => {
        const href = link.href.replace(/[^a-z0-9]+/gi, "-").slice(0, 48);
        return `${item.id}-${ci}-${li}-${href}`;
      })!.map((link) => ({
        _type: "navLink",
        _key: link._key,
        label: link.label,
        href: link.href,
        desc: link.desc,
      })),
    })),
  };
}

const doc = {
  _id: "siteNavigation",
  _type: "siteNavigation",
  title: "Ana navigasyon",
  megaNavItems: megaNav.map(toSanityMegaNav),
  rowLeftIds: megaNavRowLeft.map((m) => m.id),
  rowRightIds: megaNavRowRight.map((m) => m.id),
};

await client.createOrReplace(doc);
console.log("✓ siteNavigation belgesi yüklendi (navbar).");
