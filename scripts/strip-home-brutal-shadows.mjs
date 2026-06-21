import fs from "node:fs";

const p = new URL("../src/components/home/HomeLanding.tsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");
const orig = s.length;

s = s.replace(/\s+shadow-brutalLg\b/g, "");
s = s.replace(/\s+shadow-brutal\b/g, "");
s = s.replace(/\s+hover:shadow-brutalLg\b/g, "");
s = s.replace(/\s+hover:shadow-brutal\b/g, "");
s = s.replace(/\s+open:shadow-brutalLg\b/g, "");

// offset shadows shadow-[…px_…px_0_…]
s = s.replace(/\s+shadow-\[[^\]]*\d+px_\d+px_0[^\]]*\]/g, "");

s = s.replace(/\s+shadow-\[0_-28px_80px_rgba\(3,214,186,0\.22\)\]/g, "");
s = s.replace(/\s+shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.08\)\]/g, "");
s = s.replace(/\s+shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.7\)\]/g, "");
s = s.replace(/\s+shadow-\[0_1px_0_rgba\(6,50,66,0\.06\),4px_4px_0_rgba\(6,50,66,0\.06\)\]/g, "");
s = s.replace(/\s+shadow-\[0_0_14px_rgba\(64,196,255,0\.55\)\]/g, "");
s = s.replace(/\s+shadow-\[0_4px_22px_rgba\(0,0,0,0\.22\)\]/g, "");
s = s.replace(/\s+shadow-\[5px_5px_0_rgba\(255,183,3,0\.2\)\]/g, "");
s = s.replace(/\s+shadow-\[6px_6px_0_rgba\(255,183,3,0\.32\)\]/g, "");
s = s.replace(/\s+shadow-\[0_0_20px_rgba\(255,183,3,0\.15\)\]/g, "");
s = s.replace(/\s+shadow-\[6px_6px_0_rgba\(0,0,0,0\.5\)\]/g, "");
s = s.replace(/\s+shadow-\[2px_2px_0_rgba\(0,0,0,0\.35\)\]/g, "");
s = s.replace(/\s+shadow-\[2px_2px_0_rgba\(0,0,0,0\.4\)\]/g, "");
s = s.replace(/\s+shadow-\[2px_2px_0_rgba\(0,0,0,0\.3\)\]/g, "");
s = s.replace(/\s+shadow-\[6px_6px_0_rgba\(6,50,66,0\.2\)\]/g, "");
s = s.replace(/\s+shadow-\[4px_4px_0_rgba\(6,50,66,0\.12\)\]/g, "");

s = s.replace(/\s+drop-shadow-\[0_2px_12px_rgba\(0,0,0,0\.2\)\]/g, "");
s = s.replace(/\s+\[text-shadow:2px_2px_0_#063242,4px_4px_0_rgba\(3,91,75,0\.4\)\]/g, "");
s = s.replace(/\s+\[text-shadow:none\]/g, "");

// soft shadows on bordered chips/cards — remove for “no shadow under border” pass
s = s.replace(/\s+shadow-sm\b/g, "");
s = s.replace(/\s+shadow-md\b/g, "");
s = s.replace(/\s+shadow-lg\b/g, "");
s = s.replace(/\s+hover:shadow-md\b/g, "");

// collapse double spaces inside className="..."
s = s.replace(/className="([^"]*)"/g, (_, inner) => {
  const t = inner.replace(/\s{2,}/g, " ").replace(/\s+\./g, ".").trim();
  return `className="${t}"`;
});

fs.writeFileSync(p, s);
console.log("HomeLanding.tsx shadows stripped:", orig, "->", s.length);
