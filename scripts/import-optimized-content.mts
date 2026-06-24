/**
 * Optimizasyon paketlerinden makaleleri src/content/articles altına kopyalar.
 * Kullanım: tsx scripts/import-optimized-content.mts lise|sertifika|all
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

type Pack = {
  id: string;
  sourceDir: string;
  destDir: string;
  renames: Record<string, string>;
  skip: Set<string>;
};

const packs: Pack[] = [
  {
    id: "lise",
    sourceDir: join(root, "campus_global_lise_tam_optimizasyon"),
    destDir: join(root, "src/content/articles/lise"),
    renames: {
      "ingiltere(2).md": "ingiltere.md",
      "almanya(2).md": "almanya.md",
      "isvicre(2).md": "isvicre.md",
    },
    skip: new Set(["CHANGELOG.md", "SSS_OPTIMIZASYON_ORNEKLERI.md", "OPTIMIZASYON_AUDIT.csv"]),
  },
  {
    id: "sertifika",
    sourceDir: join(root, "campus_global_sertifika_full_optimizasyon"),
    destDir: join(root, "src/content/articles/sertifika"),
    renames: {
      "ingiltere(3).md": "ingiltere.md",
      "irlanda(1).md": "irlanda.md",
      "kanada(1).md": "kanada.md",
      "italya(2).md": "italya.md",
    },
    skip: new Set(["CHANGELOG.md", "SSS_OPTIMIZASYON_ORNEKLERI.md", "OPTIMIZASYON_AUDIT.csv"]),
  },
];

const arg = process.argv[2] ?? "all";
const selected = packs.filter((p) => arg === "all" || p.id === arg);

if (!selected.length) {
  console.error("Kullanım: tsx scripts/import-optimized-content.mts [lise|sertifika|all]");
  process.exit(1);
}

let copied = 0;

for (const pack of selected) {
  if (!existsSync(pack.sourceDir)) {
    console.error(`Kaynak klasör yok: ${pack.sourceDir}`);
    process.exit(1);
  }
  mkdirSync(pack.destDir, { recursive: true });

  for (const name of readdirSync(pack.sourceDir)) {
    if (!name.endsWith(".md") || pack.skip.has(name)) continue;
    const srcPath = join(pack.sourceDir, name);
    if (!statSync(srcPath).isFile()) continue;

    const destName = pack.renames[name] ?? name;
    const destPath = join(pack.destDir, destName);
    copyFileSync(srcPath, destPath);
    copied += 1;
    const slug = `articles/${pack.id}/${destName.replace(/\.md$/, "")}`;
    console.log(`  · ${slug}`);
  }
}

console.log(`✓ ${copied} makale güncellendi.`);
