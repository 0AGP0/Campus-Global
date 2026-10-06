import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildUniMatchLeadPayload } from "../src/lib/uni-match/lead.ts";
import { matchUniversities, visibleSteps } from "../src/lib/uni-match/match.ts";
import { EMPTY_ANSWERS, type UniMatchAnswers } from "../src/lib/uni-match/types.ts";

function answers(partial: Partial<UniMatchAnswers>): UniMatchAnswers {
  return { ...EMPTY_ANSWERS, ...partial };
}

describe("visibleSteps", () => {
  it("lise okuyan hesaplamaya atlar", () => {
    assert.deepEqual(visibleSteps(answers({ education: "lise_okuyor" })), ["education", "calculate"]);
  });

  it("dil yoksa seviye adımı çıkmaz", () => {
    const steps = visibleSteps(
      answers({
        education: "lise_mezunu_yks_yok",
        gpa: "mid",
        dept: "sozel",
        lang: "none",
      }),
    );
    assert.equal(steps.includes("level"), false);
    assert.equal(steps.at(-1), "budget");
  });

  it("bütçe dolunca hesapla görünür", () => {
    const steps = visibleSteps(
      answers({
        education: "lise_mezunu_yks_var",
        yks: "yerlesti",
        gpa: "high",
        dept: "sozel",
        lang: "en",
        level: "high",
        budget: "40_plus",
      }),
    );
    assert.equal(steps.at(-1), "calculate");
  });
});

describe("matchUniversities", () => {
  it("lise öğrencisinde ülke listesi yok", () => {
    assert.deepEqual(matchUniversities(answers({ education: "lise_okuyor" })), { kind: "early" });
  });

  it("İngilizce ileri seviyede ilk ülkeler dil önceliğine uyar", () => {
    const result = matchUniversities(
      answers({
        education: "lise_mezunu_yks_var",
        yks: "yerlesti",
        gpa: "high",
        dept: "sozel",
        lang: "en",
        level: "high",
        budget: "40_plus",
      }),
    );
    assert.equal(result.kind, "list");
    if (result.kind !== "list") return;
    assert.deepEqual(
      result.countries.slice(0, 4).map((c) => c.name),
      ["İtalya", "Almanya", "İngiltere", "Amerika"],
    );
    assert.equal(result.countries.every((c) => c.badge === "LİSANS"), true);
    const almanya = result.countries.find((c) => c.name === "Almanya");
    assert.match(almanya?.languageNote ?? "", /İngilizce seviyeniz yeterli/);
  });

  it("sağlık + YKS yok Almanya ve İtalya'yı düşürür, dar bütçede düşük maliyet kalır", () => {
    const result = matchUniversities(
      answers({
        education: "lise_mezunu_yks_yok",
        gpa: "mid",
        dept: "saglik",
        lang: "en",
        level: "mid",
        budget: "5_10",
      }),
    );
    assert.equal(result.kind, "list");
    if (result.kind !== "list") return;
    const names = result.countries.map((c) => c.name);
    assert.equal(names.includes("Almanya"), false);
    assert.equal(names.includes("İtalya"), false);
    assert.equal(names.includes("Hollanda"), false);
    assert.equal(names.includes("Ukrayna"), true);
    assert.equal(names.includes("Polonya"), true);
    assert.equal(names.includes("İngiltere"), false);
  });

  it("düşük notlu yüksek lisans katı ülkeleri eler, lisans kalır", () => {
    const result = matchUniversities(
      answers({
        education: "lisans_mezunu",
        gpa: "low",
        dept: "sayisal",
        lang: "de",
        level: "high",
        budget: "40_plus",
      }),
    );
    assert.equal(result.kind, "list");
    if (result.kind !== "list") return;
    assert.equal(result.countries[0]?.name, "Almanya");
    const almanya = result.countries.find((c) => c.name === "Almanya");
    assert.equal(almanya?.badge, "LİSANS");
    const polonya = result.countries.find((c) => c.name === "Polonya");
    assert.equal(polonya?.badge, "LİSANS & YÜKSEK LİSANS");
    assert.equal(result.countries.some((c) => c.name === "Kanada" && c.badge.includes("YÜKSEK")), false);
  });

  it("ön lisans okuyan uyarı notu ekler", () => {
    const result = matchUniversities(
      answers({
        education: "on_lisans_okuyor",
        gpa: "mid",
        dept: "sozel",
        lang: "en",
        level: "high",
        budget: "20_40",
      }),
    );
    assert.equal(result.kind, "list");
    if (result.kind !== "list") return;
    const ing = result.countries.find((c) => c.name === "İngiltere");
    assert.equal(ing?.bachelorCallouts[0]?.tone, "warning");
    assert.match(ing?.bachelorCallouts[1]?.text ?? "", /Top-up/);
  });

  it("lisans okuyan için yüksek lisans listesi açılmaz", () => {
    const result = matchUniversities(
      answers({
        education: "lisans_okuyor",
        gpa: "high",
        dept: "sozel",
        lang: "en",
        level: "high",
        budget: "40_plus",
      }),
    );
    assert.equal(result.kind, "list");
    if (result.kind !== "list") return;
    assert.equal(result.countries.every((c) => c.badge === "LİSANS"), true);
  });
});

describe("buildUniMatchLeadPayload", () => {
  it("popup ve sayfa formu farklı kaynak, aynı çekirdek alanlar", () => {
    const base = {
      fullName: " Ada Yılmaz ",
      city: "İstanbul",
      phone: "5551112233",
      email: "ada@ornek.com",
      pageUrl: "https://campusglobal.com.tr/universite/hangi-universite?ref=sudeinrome",
      utm: { utm_source: "ig" },
      answers: answers({ education: "lise_okuyor" }),
      result: { kind: "early" as const },
      influencerRef: "sudeinrome",
    };
    const popup = buildUniMatchLeadPayload({ ...base, source: "popup" });
    const form = buildUniMatchLeadPayload({ ...base, source: "form" });
    assert.equal(popup.kaynak, "Üniversite Seçim Popup");
    assert.equal(form.kaynak, "Üniversite Seçim Form");
    assert.equal(popup.adSoyad, "Ada Yılmaz");
    assert.equal(popup.eposta, "ada@ornek.com");
    assert.equal(popup.sehir, "İstanbul");
    assert.equal(popup.telefon, "5551112233");
    assert.equal(popup.influencer_ref, "sudeinrome");
    assert.equal(popup.referrer, "Üniversite Seçim Popup - influencer: sudeinrome");
    assert.match(popup.not, /lise öğrencisi/i);
    assert.equal(popup.utm_source, "ig");
  });
});
