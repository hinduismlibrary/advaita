# Advaita Reader Audit Methodology

## Purpose

Use this audit for every work listed on the Ādi Śaṅkarācārya texts page and the Stotrams page. It checks both whether a reader can load and whether every present unit has the requested study fields.

## 1. Build the inventory from the site

Compare the work IDs in `site/assets/js/shankara-reader.js` with the JSON data filenames in `site/assets/data/shankara/`. For each ID, confirm that its reader route has an `index.html` and that exactly one of the two collection pages links to it.

Works with 20 or more reader units must open the shared `book-contents.html?work=…` page. Works with fewer than 20 units open directly as a single reader. The contents page must list named divisions, and its supported-work list must include every longer work.

## 2. Check the loader’s exact data contract

The reader rejects a work when `expectedUnits` differs from the actual `units.length`. For every unit, require:

- a unique ID;
- Devanāgarī Sanskrit in `deva`;
- an English translation;
- explicit IAST in `iast`;
- a non-empty `gloss` array whose every entry is an object with non-empty Devanāgarī `sa` and English `en` values.

Search each unit for the reader’s fallback message, “A word-for-word gloss is not available for this entry yet.” Do not count an array that merely has two strings as a valid gloss object: the renderer reads the named `sa` and `en` fields.

If a source transcription itself is incomplete, keep `expectedUnits` equal to the number of present reader units so the loader can validate it. Record the source’s larger expected count separately as `expectedSourceUnits`, and describe the absent material in the data and progress log. Never fill a gap from guesswork.

## 3. Verify the contents divisions

For each long work, require descriptive division names. When divisions use numeric ranges, compare their coverage with the source verse numbers and flag gaps, overlap, or reversed ranges. For chaptered works, check the named chapter IDs and their topic labels. Keep colophons and grouped source verses represented in the underlying data without counting them as missing source verses.

## 4. Review Sanskrit, translation, and gloss meaning

Use the cited edition or primary text recorded for that work. Compare the Devanāgarī and IAST against the source, then review each translation and gloss against the Sanskrit grammar and compound structure. Keep the gloss close to the Sanskrit word order and forms; let the translation read plainly while preserving the source’s meaning. Record uncertain readings, recensional variants, and source omissions instead of silently normalizing them.

## 5. Check reader presentation

Open the transliteration and Word for Word controls on representative short, long, and prose entries. Confirm that each gloss line shows the Sanskrit word in Devanāgarī beside a compact English meaning, and confirm that the transliteration control has no extra gap before the gloss control. Check a narrow viewport as well as desktop.

## 6. Run the automated gate

Run:

```sh
python3 tools/scripts/site-checks/validate-shankara-reader-data.py
```

The validator checks all work IDs, reader paths, collection links, long-work contents routes, required fields, gloss row shape, count agreement, directly comparable numeric contents ranges, and the shared button gap. The Pages deployment workflow runs the same validator before deployment.

## Repairs from the 2026-10-27 cross-inventory audit

- Converted 4,285 Sarvavedāntasiddhāntasārasaṅgraha gloss pairs from positional arrays to the `{sa, en}` objects the reader requires. This affected 342 reader units.
- Set Naiṣkarmyasiddhi’s loader count to its 880 present units and retained 897 as `expectedSourceUnits`. All 423 numbered verses are present; 17 prose, heading, or other expected source units are absent from the available transcription and remain documented.
- Added six named, topic-led contents divisions for Tattvabodha’s 44 sections.
- Routed Advaitamakaranda (28 verses), Brahmajñānāvalīmālā (21 verses), and Tattvabodha (44 sections) through the contents page.
