import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Menü bağlantısı",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Metin",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL yolu",
      description: "Örn. /dil-okullari/ingiltere",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "desc",
      title: "Kısa açıklama (isteğe bağlı)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
