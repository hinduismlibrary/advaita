#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../../..");
const site = path.join(root, "site");
global.window = { location: { href: "https://example.test/advaita/books/adi-shankaracharya/book-contents.html", origin: "https://example.test" } };
require(path.join(site, "assets/js/shankara-reader-navigation.js"));
const navigation = global.window.AdvaitaReaderNavigation;

const expectedWorks = [
  "advaita-makaranda", "aparokshanubhuti", "atma-bodha", "atmavidya-vilasa", "upadesha-panchakam",
  "upadesha-sahasri", "ekashloki", "tattvabodha", "dashashloki", "drg-drsya-viveka",
  "naishkarmya-siddhi", "panchadasi", "panchikarana-prakarana", "brahmajnanavali-mala", "brahma-siddhi",
  "mandukya-karika", "vedantasara", "vivekachudamani", "svsss", "advaita-pancharatnam", "kashi-panchakam",
  "nirvana-shatkam", "bhaja-govindam", "manisha-panchakam", "maya-panchakam", "shatpadi-stotram",
  "yati-panchakam", "dakshinamurti-ashtakam", "hastamalaka-stotram", "advaita-siddhi"
];
const expectedContentsItems = {
  "advaita-makaranda": 0, "aparokshanubhuti": 0, "atma-bodha": 0, "atmavidya-vilasa": 0,
  "upadesha-panchakam": 0, "upadesha-sahasri": 22, "ekashloki": 0, "tattvabodha": 0, "dashashloki": 0,
  "drg-drsya-viveka": 0, "naishkarmya-siddhi": 4, "panchadasi": 15, "panchikarana-prakarana": 0,
  "brahmajnanavali-mala": 0, "brahma-siddhi": 4, "mandukya-karika": 4, "vedantasara": 6,
  "vivekachudamani": 0, "svsss": 0, "advaita-pancharatnam": 0, "kashi-panchakam": 0,
  "nirvana-shatkam": 0, "bhaja-govindam": 4, "manisha-panchakam": 0, "maya-panchakam": 0,
  "shatpadi-stotram": 0, "yati-panchakam": 0, "dakshinamurti-ashtakam": 0, "hastamalaka-stotram": 0, "advaita-siddhi": 3
};
const directTextWorks = new Set([
  "advaita-makaranda", "aparokshanubhuti", "atma-bodha", "atmavidya-vilasa", "upadesha-panchakam",
  "ekashloki", "tattvabodha", "dashashloki",
  "drg-drsya-viveka", "panchikarana-prakarana", "brahmajnanavali-mala", "advaita-pancharatnam",
  "kashi-panchakam", "nirvana-shatkam", "bhaja-govindam", "manisha-panchakam", "maya-panchakam",
  "shatpadi-stotram", "yati-panchakam", "dakshinamurti-ashtakam", "hastamalaka-stotram",
  "vivekachudamani", "svsss"
]);
const editorialWorks = new Set(["aparokshanubhuti", "atma-bodha", "atmavidya-vilasa", "tattvabodha", "vivekachudamani", "svsss"]);
const expectedEditorialNote = "The following thematic divisions are editorial aids to navigation and do not represent original chapters of the Sanskrit text.";
const fail = (message) => { throw new Error(message); };

function read(file) { return fs.readFileSync(file, "utf8"); }

if (navigation.workIds.length !== 30) fail(`Navigation manifest has ${navigation.workIds.length} works; expected 30.`);
if (JSON.stringify([...navigation.workIds].sort()) !== JSON.stringify([...expectedWorks].sort())) fail("Navigation manifest work set does not match the main and hymn directories.");

const contentsPage = read(path.join(site, "books/adi-shankaracharya/book-contents.html"));
const chapterPage = read(path.join(site, "books/adi-shankaracharya/book-chapter.html"));
const directory = read(path.join(site, "books/adi-shankaracharya/index.html"));
const stotrams = read(path.join(site, "books/adi-shankaracharya/stotrams/index.html"));
const runtime = read(path.join(site, "assets/js/shankara-reader-runtime.js"));
const styles = read(path.join(site, "assets/css/shankara-reader-standard.css"));

for (const work of expectedWorks) {
  const dataPath = path.join(site, `assets/data/shankara/${work}.json`);
  if (!fs.existsSync(dataPath)) fail(`Missing source text data: ${work}`);
  const data = JSON.parse(read(dataPath));
  const units = Array.isArray(data.units) ? data.units : [];
  if (!units.length || units.length !== data.expectedUnits) fail(`${work}: expectedUnits does not match its complete unit list.`);
  const ids = new Set();
  let withGloss = 0;
  for (const [index, unit] of units.entries()) {
    if (!unit.id || ids.has(unit.id)) fail(`${work}: missing or duplicate unit id at ${index}.`);
    ids.add(unit.id);
    for (const field of ["deva", "iast", "translation"]) if (!String(unit[field] || "").trim()) fail(`${work}: ${field} is empty in unit ${unit.id}.`);
    const words = Array.isArray(unit.gloss) ? unit.gloss : [];
    if (words.length && words.every((word) => word && word.sa && word.en)) withGloss += 1;
  }
  if (withGloss !== units.length) fail(`${work}: word-for-word glosses are available for ${withGloss}/${units.length} entries.`);

  const items = navigation.itemsForContents(work, data);
  if (items.length !== expectedContentsItems[work]) fail(`${work}: got ${items.length} contents links; expected ${expectedContentsItems[work]}.`);
  if (items.length) {
    if (items[0].index !== 0) fail(`${work}: first contents range does not start at the beginning of the text.`);
    const starts = items.map((item) => item.index);
    if (starts.some((index, i) => !Number.isInteger(index) || index < 0 || index >= units.length || (i && index <= starts[i - 1]))) fail(`${work}: contents divisions are not in strict source order.`);
    const ranges = starts.map((start, i) => [start, items[i + 1] ? items[i + 1].index : units.length]);
    if (ranges.some(([start, end]) => end <= start)) fail(`${work}: contents list contains an empty section.`);
    if (ranges[0][0] !== 0 || ranges[ranges.length - 1][1] !== units.length || ranges.some((range, i) => i && range[0] !== ranges[i - 1][1])) fail(`${work}: contents divisions do not cover the complete work contiguously.`);
    for (const item of items) {
      if (!item.id || !ids.has(item.id)) fail(`${work}: section target is not present in the source text.`);
      if (editorialWorks.has(work) && item.type !== "editorial") fail(`${work}: editorial division is marked as original.`);
      if (!editorialWorks.has(work) && item.type === "editorial") fail(`${work}: an authentic division is marked as editorial.`);
    }
  } else {
    const readerItems = navigation.itemsForReader(work, data);
    if (readerItems.length !== 1 || readerItems[0].index !== 0 || readerItems[0].type !== "complete") fail(`${work}: continuous text does not resolve to one complete reader.`);
  }
  if (editorialWorks.has(work) && navigation.note(work) !== expectedEditorialNote) fail(`${work}: required editorial transparency note is missing.`);

  const directoryText = work === "bhaja-govindam" || stotrams.includes(`?work=${work}`) ? stotrams : directory;
  const directoryRoute = directTextWorks.has(work)
    ? `/book-chapter.html?work=${work}&amp;full=1`
    : `/book-contents.html?work=${work}`;
  if (!directoryText.includes(directoryRoute)) fail(`${work}: directory route does not match the short-text rule.`);
  const legacyPath = path.join(site, `books/adi-shankaracharya/${work}/index.html`);
  const legacyRootPath = path.join(root, `books/adi-shankaracharya/${work}/index.html`);
  if (!fs.existsSync(legacyPath)) fail(`${work}: established reader URL was removed.`);
  const legacyPage = read(legacyPath);
  const legacyTarget = work === "brahma-siddhi" || work === "advaita-siddhi" ? "book-contents.html" : "book-chapter.html";
  if (!legacyPage.includes(`var work = "${work}"`) || !legacyPage.includes(legacyTarget) || !legacyPage.includes("window.location.replace") || !legacyPage.includes("window.location.hash")) fail(`${work}: established reader URL does not preserve its text route and fragment.`);
  if (!fs.existsSync(legacyRootPath) || read(legacyRootPath) !== legacyPage) fail(`${work}: root and site legacy reader routes differ.`);

  const rootDataPath = path.join(root, `assets/data/shankara/${work}.json`);
  if (!fs.existsSync(rootDataPath) || read(rootDataPath) !== read(dataPath)) fail(`${work}: root and site data copies differ.`);
  const mainReader = navigation.itemsForReader(work, data);
  const ranges = items.length ? items.map((item, index) => [item.index, items[index + 1] ? items[index + 1].index : units.length]) : [[0, units.length]];
  const coverage = ranges.map(([start, end]) => end - start).reduce((sum, n) => sum + n, 0);
  if (coverage !== units.length) fail(`${work}: reader route loses source entries.`);
  console.log(`${work}\tunits=${units.length}\tcontents=${items.length || "continuous"}\treader-ranges=${ranges.length}\tword-gloss=${withGloss}/${units.length}`);
}

if (!contentsPage.includes("shankara-reader-navigation.js") || !chapterPage.includes("shankara-reader-runtime.js")) fail("A shared reader page is missing the navigation/runtime bundle.");
if (contentsPage.includes("fallbackRanges") || chapterPage.includes("fallbackRanges") || chapterPage.includes("window.location.replace")) fail("Legacy range fabrication or a reader-page redirect remains in the shared reader.");
if (!contentsPage.includes("units.length<=50&&!data.longWork||!items.length") || !contentsPage.includes("window.location.replace(readerUrl)")) fail("Short texts and works without source divisions do not bypass the contents page.");
if (!chapterPage.includes("reader-jump-form") || !runtime.includes("jumpInput.max = String(maximum)")) fail("The compact Go to verse/section control or its maximum is missing.");
if (chapterPage.includes("chapter-list") || chapterPage.includes("work-author") || runtime.includes("Text source, authorship, and translation credit")) fail("The reader still includes the old contents list or metadata boilerplate.");
const brahmaLegacyPage = read(path.join(site, "books/adi-shankaracharya/brahma-siddhi/index.html"));
if (!brahmaLegacyPage.includes("book-contents.html") || brahmaLegacyPage.includes("book-chapter.html?work=brahma-siddhi&amp;full=1")) fail("Brahmasiddhi's default route still opens the entire work at once.");
if (!runtime.includes('translationParagraphs.forEach(function (paragraph) { card.append(paragraph); })') || !runtime.includes('reference.textContent = readerNumber') || !runtime.includes('transliterationButton.textContent = "Show transliteration"') || !runtime.includes('toggle.textContent = "Word for Word"') || !runtime.includes('controls.append(gloss.toggle)')) fail("Reader verse order, visible references, or paired disclosures have changed.");
for (const preserved of ["editionTranslation", "editorialNote", "sourceNote", "sourceNumbers"]) {
  if (!runtime.includes(preserved)) fail(`Reader no longer preserves the ${preserved} source-data field.`);
}
if (!styles.includes("display:block!important;width:100%!important;max-width:none!important")) fail("The reader does not use the full available width.");
if (styles.includes("border-left:2px solid #a5a9aa") || !styles.includes(".reader-disclosure-actions>button")) fail("The translation rule or matched disclosure controls have returned.");
if (styles.includes(".side-toc") || styles.includes(".advaita-mobile-contents-toggle") || styles.includes(".reader-citation-details")) fail("The reader still contains sidebar or citation boilerplate styling.");
if (!styles.includes(".reader-edition-translation")) fail("Alternate edition translations have no shared reader styling.");

for (const [sitePath, rootPath] of [
  ["books/adi-shankaracharya/book-contents.html", "books/adi-shankaracharya/book-contents.html"],
  ["books/adi-shankaracharya/book-chapter.html", "books/adi-shankaracharya/book-chapter.html"],
  ["books/adi-shankaracharya/index.html", "books/adi-shankaracharya/index.html"],
  ["books/adi-shankaracharya/stotrams/index.html", "books/adi-shankaracharya/stotrams/index.html"],
  ["assets/js/shankara-reader-navigation.js", "assets/js/shankara-reader-navigation.js"],
  ["assets/js/shankara-reader-runtime.js", "assets/js/shankara-reader-runtime.js"],
  ["assets/css/shankara-reader-standard.css", "assets/css/shankara-reader-standard.css"]
]) {
  const siteFile = path.join(site, sitePath), rootFile = path.join(root, rootPath);
  if (!fs.existsSync(rootFile) || read(siteFile) !== read(rootFile)) fail(`Published/source copy differs for ${sitePath}.`);
}
console.log(`PASS: ${expectedWorks.length} works, unchanged text payloads, contents routes, section coverage, bilingual reader order, and mirrored publication files.`);
