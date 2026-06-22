import { defineField, defineType } from "sanity";

export const navColumn = defineType({
  name: "navColumn",
  title: "Menü sütunu",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Sütun başlığı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "links",
      title: "Bağlantılar",
      type: "array",
      of: [{ type: "navLink" }],
    }),
  ],
  preview: {
    select: { title: "heading", links: "links" },
    prepare({ title, links }) {
      const count = Array.isArray(links) ? links.length : 0;
      return { title, subtitle: `${count} bağlantı` };
    },
  },
});
