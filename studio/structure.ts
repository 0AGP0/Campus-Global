import type { StructureResolver } from "sanity/structure";

const articleFilter = (prefix: string) => `_type == "article" && slug match "${prefix}*"`;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Campus Global")
    .items([
      S.listItem()
        .title("Navbar (üst menü)")
        .child(
          S.document()
            .schemaType("siteNavigation")
            .documentId("siteNavigation")
            .title("Navbar düzenleme"),
        ),
      S.divider(),
      S.listItem()
        .title("Tüm yazı sayfaları")
        .schemaType("article")
        .child(S.documentTypeList("article").title("Tüm yazılar")),
      S.listItem()
        .title("Dil okulları")
        .child(
          S.documentList()
            .title("Dil okulları")
            .filter(articleFilter("dil-okullari/")),
        ),
      S.listItem()
        .title("Üniversite")
        .child(
          S.documentList()
            .title("Üniversite")
            .filter(articleFilter("universite/")),
        ),
      S.listItem()
        .title("Yüksek lisans")
        .child(
          S.documentList()
            .title("Yüksek lisans")
            .filter(articleFilter("yuksek-lisans/")),
        ),
      S.listItem()
        .title("Work & Study")
        .child(
          S.documentList()
            .title("Work & Study")
            .filter(articleFilter("work-study/")),
        ),
      S.divider(),
      S.listItem()
        .title("Yurtdışında lise")
        .child(S.documentList().title("Lise").filter(articleFilter("lise/"))),
      S.listItem()
        .title("Yaz okulu")
        .child(
          S.documentList()
            .title("Yaz okulu")
            .filter(articleFilter("yaz-okulu/")),
        ),
      S.listItem()
        .title("Sertifika")
        .child(
          S.documentList()
            .title("Sertifika")
            .filter(articleFilter("sertifika/")),
        ),
      S.listItem()
        .title("Work & Travel")
        .child(
          S.documentList()
            .title("Work & Travel")
            .filter(articleFilter("work-travel/")),
        ),
    ]);
