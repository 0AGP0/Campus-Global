import type { CollectionEntry } from "astro:content";
import type { ProgramHubId, ProgramHubModel } from "@/data/program-hub-content";
import { dilUlkeler, sertifikaUlkeler, uniTumUlkeler, ylUlkeler } from "@/data/site-nav";

type HubEntry = CollectionEntry<"hubs">;

const countriesByHub: Record<ProgramHubId, ProgramHubModel["countries"]> = {
  "dil-okullari": dilUlkeler,
  universite: uniTumUlkeler,
  "yuksek-lisans": ylUlkeler,
  sertifika: sertifikaUlkeler,
};

/** Hub MD içeriği + site-nav ülke listesini birleştirir. */
export function programHubModelFromEntry(entry: HubEntry): ProgramHubModel {
  const id = entry.data.id;
  return {
    ...entry.data,
    countries: countriesByHub[id],
  };
}
