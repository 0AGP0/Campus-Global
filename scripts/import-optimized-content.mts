/**
 * Optimizasyon paketlerinden makaleleri src/content/articles altına kopyalar.
 * Kullanım: tsx scripts/import-optimized-content.mts [all|lise|sertifika|universite|work-study|...]
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

type Pack = {
  id: string;
  sourceDir: string;
  destDir: string;
  /** Manuel eşleme; yoksa `dosya(2).md` → `dosya.md` otomatik uygulanır */
  renames?: Record<string, string>;
  skip?: Set<string>;
};

const META = new Set(["CHANGELOG.md", "SSS_OPTIMIZASYON_ORNEKLERI.md", "OPTIMIZASYON_AUDIT.csv"]);

const packs: Pack[] = [
  {
    id: "lise",
    sourceDir: join(root, "campus_global_lise_tam_optimizasyon"),
    destDir: join(root, "src/content/articles/lise"),
  },
  {
    id: "sertifika",
    sourceDir: join(root, "campus_global_sertifika_full_optimizasyon"),
    destDir: join(root, "src/content/articles/sertifika"),
  },
  {
    id: "universite",
    sourceDir: join(root, "campus_global_universite_41_tam_optimizasyon"),
    destDir: join(root, "src/content/articles/universite"),
  },
  {
    id: "work-study",
    sourceDir: join(root, "work-study"),
    destDir: join(root, "src/content/articles/work-study"),
  },
  {
    id: "work-travel",
    sourceDir: join(root, "work-travel"),
    destDir: join(root, "src/content/articles/work-travel"),
  },
  {
    id: "yaz-okulu",
    sourceDir: join(root, "yaz-okulu"),
    destDir: join(root, "src/content/articles/yaz-okulu"),
  },
  {
    id: "yuksek-lisans",
    sourceDir: join(root, "yuksek-lisans"),
    destDir: join(root, "src/content/articles/yuksek-lisans"),
  },
];

function destNameFor(sourceName: string, renames: Record<string, string>): string {
  if (renames[sourceName]) return renames[sourceName];
  return sourceName.replace(/\(\d+\)(?=\.md$)/, "");
}

const args = process.argv.slice(2);
const selected =
  !args.length || args.includes("all")
    ? packs
    : packs.filter((p) => args.includes(p.id));

if (!selected.length) {
  console.error(
    "Kullanım: tsx scripts/import-optimized-content.mts [all|lise|sertifika|universite|work-study|work-travel|yaz-okulu|yuksek-lisans]",
  );
  process.exit(1);
}

let copied = 0;

for (const pack of selected) {
  if (!existsSync(pack.sourceDir)) {
    console.error(`Kaynak klasör yok: ${pack.sourceDir}`);
    process.exit(1);
  }

  const skip = pack.skip ?? META;
  const renames = pack.renames ?? {};
  mkdirSync(pack.destDir, { recursive: true });

  console.log(`\n[${pack.id}]`);

  for (const name of readdirSync(pack.sourceDir)) {
    if (!name.endsWith(".md") || skip.has(name)) continue;
    const srcPath = join(pack.sourceDir, name);
    if (!statSync(srcPath).isFile()) continue;

    const destName = destNameFor(name, renames);
    const destPath = join(pack.destDir, destName);
    copyFileSync(srcPath, destPath);
    copied += 1;
    const slug = `articles/${pack.id}/${destName.replace(/\.md$/, "")}`;
    if (name !== destName) {
      console.log(`  · ${slug}  ← ${name}`);
    } else {
      console.log(`  · ${slug}`);
    }
  }
}

console.log(`\n✓ ${copied} makale güncellendi.`);
