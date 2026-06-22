import { defineField, defineType } from "sanity";

export const megaNavItem = defineType({
  name: "megaNavItem",
  title: "Mega menü bölümü",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID (teknik)",
      description: "Örn. dil-okullari — değiştirmeyin, menü sırası için kullanılır.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Navbar başlığı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Hub / ana link",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      title: "Kısa tanım (isteğe bağlı)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "columns",
      title: "Mega menü sütunları",
      type: "array",
      of: [{ type: "navColumn" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "href" },
  },
});
