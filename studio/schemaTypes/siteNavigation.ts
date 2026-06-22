import { defineField, defineType } from "sanity";

export const siteNavigation = defineType({
  name: "siteNavigation",
  title: "Site menüsü (navbar)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Dahili ad",
      type: "string",
      initialValue: "Ana navigasyon",
      hidden: true,
    }),
    defineField({
      name: "megaNavItems",
      title: "Mega menü bölümleri",
      description:
        "Her satır = navbar’daki ana başlık (DİL OKULLARI, ÜNİVERSİTE…). İçinde sütunlar ve linkler var. Site önizlemesi değildir; veri listesi gibi görünmesi normal.",
      type: "array",
      of: [{ type: "megaNavItem" }],
    }),
    defineField({
      name: "rowLeftIds",
      title: "Sol üst menü sırası (gelişmiş)",
      description:
        "Üst bardaki soldaki başlık sırası. Genelde değiştirmeyin. Örnek: dil-okullari, universite, yuksek-lisans, lise",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "rowRightIds",
      title: "Sağ üst menü sırası (gelişmiş)",
      description: "Üst bardaki sağdaki başlık sırası. Genelde değiştirmeyin.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site menüsü (navbar)" };
    },
  },
});
