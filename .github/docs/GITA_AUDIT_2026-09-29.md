# Bhagavad Gītā reader audit — 2026-09-29

## Changes

- The shared renderer uses Mukundananda English from the pinned author_22 records and word meanings from the common records in the same pinned Gītā data release.
- The 49 grouped source translations covering 110 verses are rendered once at the start of each range. The other 61 verse cards link to that translation rather than switching to another translator.
- The Śrīdhara overlay no longer turns a word-for-word glossary into the English commentary. When the reviewed data has no prose translation, the existing commentary prose remains visible instead.
- English commentary and word glosses no longer show unnecessary quotation marks, semicolons, or colon-heavy labels. A redundant opening “Śrīdhara says” or “the commentary says” label is removed from rendered commentary.
- BG 1.8–1.9 now show the existing Śrīdhara commentary prose instead of the partial glossary fragment.
- BG 1.42 distinguishes community duties, varṇa duties, and family duties. It does not translate varṇa as caste.
- All 18 chapter shells point to the updated shared scripts.

## Source and structure checks

- Expected visible verse cards: 701.
- Mukundananda translation records: 701/701 verses covered.
- Common word-meaning records: 701/701 verses covered.
- Translation and word-meaning source ranges: exact match for all 701 verses.
- Grouped translations: 49 source passages, covering 110 verses.
- Grouped continuation cards: 61 links back to their passage translation.
- Chapter shells updated: 18/18.

## Verification limits

The source audit confirms complete fields and exact verse-range alignment; it is not an independent Sanskrit-level retranslation of all 701 verses. The shared JavaScript and all shell references are checked. GitHub Pages rebuild and live browser checks are still pending.
