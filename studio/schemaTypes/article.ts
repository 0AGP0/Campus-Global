import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Yazı sayfası",
  type: "document",
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "seo", title: "SEO" },
    { name: "nav", title: "Menü" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Örn. dil-okullari/ingiltere → /dil-okullari/ingiltere",
      type: "string",
      group: "content",
      validation: (r) => r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/),
    }),
    defineField({
      name: "description",
      title: "Meta açıklama",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "keywords",
      title: "Anahtar kelimeler",
      type: "string",
      group: "seo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedISO",
      title: "Yayın tarihi (ISO)",
      type: "datetime",
      group: "seo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "modifiedISO",
      title: "Güncelleme tarihi (ISO)",
      type: "datetime",
      group: "seo",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "section",
      title: "Bölüm etiketi",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "readingMinutes",
      title: "Okuma süresi (dk)",
      type: "number",
      group: "content",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "toc",
      title: "İçindekiler",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "tocItem",
          fields: [
            { name: "id", title: "HTML id (h2)", type: "string", validation: (r) => r.required() },
            { name: "label", title: "Menü metni", type: "string", validation: (r) => r.required() },
            {
              name: "depth",
              title: "Derinlik",
              type: "number",
              options: { list: [2, 3] },
              initialValue: 2,
            },
          ],
          preview: {
            select: { title: "label", subtitle: "id" },
          },
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "Sık sorulan sorular",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            { name: "question", title: "Soru", type: "string", validation: (r) => r.required() },
            { name: "answer", title: "Cevap", type: "text", rows: 4, validation: (r) => r.required() },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "bodyHtml",
      title: "Gövde (HTML)",
      description:
        "ArticleLayout ile uyumlu HTML: <p>, <h2 id=\"...\">, <ul> vb. İçindekiler id’leri toc ile eşleşmeli.",
      type: "text",
      rows: 20,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "showInNav",
      title: "Mega menüde göster",
      description: "Açıksa, yayın sonrası menüye otomatik eklenir (Menü sekmesindeki alanlar dolu olmalı).",
      type: "boolean",
      group: "nav",
      initialValue: false,
    }),
    defineField({
      name: "navMegaId",
      title: "Hangi ana menü?",
      description: "Örn. dil-okullari, universite, yuksek-lisans, sertifika, lise, work-travel",
      type: "string",
      group: "nav",
      options: {
        list: [
          { title: "Dil okulları", value: "dil-okullari" },
          { title: "Üniversite", value: "universite" },
          { title: "Yüksek lisans", value: "yuksek-lisans" },
          { title: "Sertifika", value: "sertifika" },
          { title: "Lise", value: "lise" },
          { title: "Work & Travel", value: "work-travel" },
          { title: "Work & Study", value: "work-study" },
          { title: "Yaz okulu", value: "yaz-okulu" },
        ],
      },
      hidden: ({ parent }) => !parent?.showInNav,
    }),
    defineField({
      name: "navColumnHeading",
      title: "Menü sütunu",
      description: "Örn. Ülkeler · Eğitim programları · Rehber & bilgi bankası",
      type: "string",
      group: "nav",
      hidden: ({ parent }) => !parent?.showInNav,
    }),
    defineField({
      name: "navLabel",
      title: "Menüde görünen metin",
      type: "string",
      group: "nav",
      hidden: ({ parent }) => !parent?.showInNav,
    }),
    defineField({
      name: "navOrder",
      title: "Sıra (küçük = üstte)",
      type: "number",
      group: "nav",
      hidden: ({ parent }) => !parent?.showInNav,
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "Slug", name: "slugAsc", by: [{ field: "slug", direction: "asc" }] },
    { title: "Güncelleme", name: "modifiedDesc", by: [{ field: "modifiedISO", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "slug" },
  },
});
