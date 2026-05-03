import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    publishedISO: z.string(),
    modifiedISO: z.string().optional(),
    eyebrow: z.string().optional(),
    section: z.string().optional(),
    readingMinutes: z.number(),
    toc: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          depth: z.union([z.literal(2), z.literal(3)]).optional(),
        }),
      )
      .default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles };
