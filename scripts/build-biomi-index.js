/**
 * Builds public/biomi-index.json — the knowledge base for the Biomi chatbot on
 * the FAQ page. Biomi answers ONLY from this file (no AI, no server calls), so
 * it is regenerated from the website's own content on every build:
 *
 *   - products  : every product on the product pages (name, brand, category,
 *                 description, image, page link)
 *   - faqs      : app/user/chatbot/faqData.ts
 *   - offices   : the office list on the Contact page
 *
 * Run: node scripts/build-biomi-index.js   (also runs automatically in `npm run build`)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'app/user/products/components');
const OUT = path.join(ROOT, 'public/biomi-index.json');

// ---------- helpers ----------
/** Unquote a JS/JSON string literal body (handles \" \' \\ \n \uXXXX). */
const unquote = (body) => {
  try {
    return JSON.parse('"' + body.replace(/\\'/g, "'").replace(/"/g, '\\"').replace(/\\\\"/g, '\\"') + '"');
  } catch {
    return body.replace(/\\(['"\\])/g, '$1');
  }
};

/** Read a string field (`key: '...'`, `"key": "..."`, or `key: "..."`) from an object literal's text. */
const field = (obj, key) => {
  const re = new RegExp(`["']?${key}["']?\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`);
  const m = obj.match(re);
  return m ? unquote(m[2]).trim() : '';
};

/** Find the text of the object literal enclosing position `pos` (brace matching, string-aware). */
const enclosingObject = (src, pos) => {
  let depth = 0;
  let start = -1;
  for (let i = pos; i >= 0; i--) {
    const c = src[i];
    if (c === '}') depth++;
    else if (c === '{') {
      if (depth === 0) { start = i; break; }
      depth--;
    }
  }
  if (start < 0) return null;
  depth = 0;
  let quote = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return { start, text: src.slice(start, i + 1) };
    }
  }
  return null;
};

const prettyFolder = (folder) =>
  folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAnd\b/g, '&');

// ---------- products ----------
const products = [];
const seen = new Set();
for (const folder of fs.readdirSync(PRODUCTS_DIR)) {
  const dir = path.join(PRODUCTS_DIR, folder);
  if (!fs.statSync(dir).isDirectory() || ['shared'].includes(folder)) continue;
  if (folder === 'hamamatsusliderscanner') continue; // page is disabled (404)
  const url = `/user/products/components/${folder}`;
  for (const file of fs.readdirSync(dir)) {
    if (!/\.tsx$/.test(file) || /Footer|page\.tsx/.test(file)) continue;
    const src = fs.readFileSync(path.join(dir, file), 'utf8');

    // Page/category title: `category = { "title": ... }`, `categories = [{ title: ... }]`.
    const titleMatch = src.match(/(?:const\s+categor(?:y|ies)\s*[^=]*=\s*\[?\s*\{[\s\S]{0,200}?)["']?title["']?\s*:\s*(["'])((?:\\.|(?!\1).)*)\1/);
    const category = titleMatch ? unquote(titleMatch[2]) : prettyFolder(folder);
    // Page-level brand constant (e.g. NIKON_BRAND = { name: 'Nikon', logo: ... })
    const pageBrand = src.match(/_BRAND\s*=\s*\{[^}]*?name:\s*['"]([^'"]+)['"][^}]*?logo:\s*['"]([^'"]+)['"]/);

    // Multi-category pages (e.g. Sakura): category id -> title; products are
    // grouped under `<id>: [ ... ]`.
    const catTitles = {};
    for (const c of src.matchAll(/id:\s*['"]([\w-]+)['"]\s*,\s*title:\s*['"]([^'"]+)['"]/g)) catTitles[c[1]] = c[2];
    // ...and by folder name (Sakura keys its product groups by `folder`).
    for (const c of src.matchAll(/title:\s*['"]([^'"]+)['"][^{}]{0,400}?folder:\s*['"]([^'"]+)['"]/g)) catTitles[c[2]] = c[1];
    const catGroups =
      Object.keys(catTitles).length > 2
        ? [...src.matchAll(/(?:['"]([^'"\n]+)['"]|\b([\w-]+))\s*:\s*\[/g)]
            .map((g) => Object.assign(g, { 1: g[1] || g[2] }))
            .filter((g) => catTitles[g[1]])
            .map((g) => ({ at: g.index, title: catTitles[g[1]] }))
        : [];

    // Brand-grouped pages (Blood Bank, Microbiology): a BRANDS map plus
    // `brand: "<key>"` ahead of each group of products.
    const brandMap = {};
    const brandsBlock = src.match(/const BRANDS[^=]*=\s*\{([\s\S]*?)\n\};/);
    if (brandsBlock) {
      for (const b of brandsBlock[1].matchAll(/["']?([\w-]+)["']?\s*:\s*\{\s*["']?name["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?logo["']?\s*:\s*["']([^"']+)["']/g)) {
        brandMap[b[1]] = { name: b[2], logo: b[3] };
      }
    }
    const brandGroups = Object.keys(brandMap).length
      ? [...src.matchAll(/["']?brand["']?\s*:\s*["']([\w-]+)["']/g)]
          .filter((g) => brandMap[g[1]])
          .map((g) => ({ at: g.index, ...brandMap[g[1]] }))
      : [];
    const lastBefore = (groups, at) => groups.filter((g) => g.at < at).pop();

    const nameRe = /["']?name["']?\s*:\s*(["'])((?:\\.|(?!\1).)*)\1/g;
    let m;
    while ((m = nameRe.exec(src))) {
      const obj = enclosingObject(src, m.index);
      if (!obj) continue;
      const image = field(obj.text, 'image');
      const description = field(obj.text, 'description');
      if (!image || !description) continue; // brand tabs, offices etc. — not products
      const name = unquote(m[2]).trim();
      const key = url + '|' + name;
      if (seen.has(key)) continue;
      seen.add(key);
      const grp = lastBefore(brandGroups, obj.start);
      const catGrp = lastBefore(catGroups, obj.start);
      products.push({
        name,
        brand: field(obj.text, 'brandName') || (grp ? grp.name : '') || (pageBrand ? pageBrand[1] : ''),
        category: catGrp ? catGrp.title : category,
        description,
        image,
        logo: field(obj.text, 'brandLogo') || (grp ? grp.logo : '') || (pageBrand ? pageBrand[2] : ''),
        url,
      });
    }
  }
}

// Some products appear on two pages (e.g. Nikon ECLIPSE on Microscopes and
// Nikon Microscopes, Fujifilm on Imaging and Radiology). Keep one entry —
// the one with the fuller description — and remember the other categories
// so searching either one still finds it.
const byKey = new Map();
for (const p of products) {
  const key = `${p.brand}|${p.name}`.toLowerCase();
  const prev = byKey.get(key);
  if (!prev) { byKey.set(key, { ...p, alsoIn: [] }); continue; }
  const keep = p.description.length > prev.description.length ? { ...p, alsoIn: prev.alsoIn } : prev;
  const other = keep === prev ? p : prev;
  if (other.category !== keep.category && !keep.alsoIn.includes(other.category)) keep.alsoIn.push(other.category);
  byKey.set(key, keep);
}
const dupes = products.length - byKey.size;
products.length = 0;
for (const p of byKey.values()) products.push({ ...p, alsoIn: p.alsoIn.join(', ') });

// ---------- FAQs ----------
const faqSrc = fs.readFileSync(path.join(ROOT, 'app/user/chatbot/faqData.ts'), 'utf8');
const faqs = [];
const catRe = /category:\s*"((?:\\.|[^"\\])*)"/g;
const cats = [];
let cm;
while ((cm = catRe.exec(faqSrc))) cats.push({ name: unquote(cm[1]), at: cm.index });
const qaRe = /q:\s*"((?:\\.|[^"\\])*)"\s*,\s*a:\s*"((?:\\.|[^"\\])*)"/g;
let qm;
while ((qm = qaRe.exec(faqSrc))) {
  const cat = [...cats].reverse().find((c) => c.at < qm.index);
  faqs.push({ category: cat ? cat.name : '', q: unquote(qm[1]), a: unquote(qm[2]) });
}

// ---------- offices (Contact page) ----------
const contactSrc = fs.readFileSync(path.join(ROOT, 'app/user/contact/components/Contact.tsx'), 'utf8');
const offices = [];
const offRe = /name:\s*"([^"]+)",\s*address:\s*"([^"]+)",\s*phone:\s*"([^"]+)",\s*email:\s*"([^"]+)",\s*hours:\s*"([^"]+)"/g;
let om;
while ((om = offRe.exec(contactSrc))) {
  offices.push({ name: om[1], address: om[2], phone: om[3], email: om[4], hours: om[5] });
}

// ---------- company facts (About page stats: founded, years, ISO, awards…) ----------
const facts = [];
try {
  const statsSrc = fs.readFileSync(path.join(ROOT, 'app/user/about/components/Stats.tsx'), 'utf8');
  for (const s of statsSrc.matchAll(/\{\s*value:\s*'([^']+)',\s*label:\s*'([^']+)'\s*\}/g)) facts.push({ value: s[1], label: s[2] });
} catch {
  // About page moved — Biomi just won't answer company-fact questions.
}

// ---------- write ----------
if (products.length < 50 || faqs.length < 20 || offices.length < 1) {
  console.error(`[biomi-index] Extraction looks broken: ${products.length} products, ${faqs.length} FAQs, ${offices.length} offices.`);
  process.exit(1);
}
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), products, faqs, offices, facts }));
const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`[biomi-index] ${products.length} products (${dupes} duplicates merged), ${faqs.length} FAQs, ${offices.length} offices, ${facts.length} facts -> public/biomi-index.json (${kb} KB)`);
