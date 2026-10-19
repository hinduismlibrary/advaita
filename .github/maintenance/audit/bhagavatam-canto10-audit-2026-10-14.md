# Canto 10 source and alignment audit — 2026-10-14

## Status

Structural source coverage and known data defects have been corrected. This is **not** a certification that every English Śrīdhara gloss is complete or lexically correct. The word-for-word Śrīdhara layer is explicitly marked as under review.

## Pinned sources

- Sanskrit commentary and verse witness: [vishvAsa/purANam_vaiShNavam](https://github.com/vishvAsa/purANam_vaiShNavam), commit `100560de6c9f68c2875097d40a2012a84c784179`.
- English mirror: same pinned source commit, Canto 10 chapter markdown files.
- Repository base before this pass: `9dab5a1e2f0b479b0c7a6e022bf4e8d8dc3299ef`.

## Verse-field coverage

The pinned English mirror contains 90 chapter files and 3572 `Text`/`Texts` blocks. Expanding each block’s stated verse range yields 3936 canonical verse IDs.

| Field | Present | Missing |
|---|---:|---:|
| IAST verse text | 3936/3936 | 0 |
| Source Synonyms | 3936/3936 | 0 |
| Source verse translation | 3936/3936 | 0 |
| Devanāgarī verse text | 3935/3936 | 10.42.22 |

The English mirror’s Devanāgarī field for 10.42.22 is blank. The existing `devanagariOverrides["10.42.22"]` in `assets/js/bhagavatam-sridhara-reader.js` supplies the matching verse from the pinned Sanskrit witness. That override was verified and retained.

The Synonyms and verse translations above are source fields. Their presence is not an independent proof of word-for-word accuracy.

## Śrīdhara source-cache coverage

- 2939 pinned Sanskrit source-cache records cover 3078 canonical verse IDs.
- 725 source-cache records explicitly say `न व्याख्यातम्।` (no commentary).
- 858 canonical verse IDs have no local Śrīdhara source-cache record.
- 2 additional source-cache records are present but have no Sanskrit text: 10.3.30 and 10.3.46.

The Canto 10 reader now distinguishes an explicit no-commentary marker from a missing local source record. Missing records are labeled “Śrīdhara source record unavailable.” The page no longer infers “No commentary” from `source_available: false` for Canto 10.

## Word-for-word data corrections

All 90 Canto 10 word-for-word JSON files now say `source-linked; word-for-word review pending`; their previous “individually audited” claim was removed.

- Final data contains 3790 entries covering all 3936 canonical verse IDs. Coverage records do not mean that each gloss is complete.
- 587 entries are marked `translation_pending`; 47 of these were added for canonical verses with no matching local Śrīdhara source-cache record or verified gloss.
- 514 false `श्रीधर — Śrīdhara` placeholder pairs were removed.
- 8 attribution-only placeholders for “Śrīdhara Svāmī” were removed or cleared; the genuine name in 10.14.61 was retained.
- 13 false “No commentary” gloss claims were removed. A further 10.73.4 no-commentary record was removed because the pinned range 10.73.2–4 contains real commentary.
- 381 embedded IAST prefixes were removed from English pair glosses.
- 3203 prose `literal_english` fields were cleared so the Canto 10 Śrīdhara word-for-word section does not append paraphrase text.
- 7 no-commentary marker punctuation variants were normalized to the Sanskrit danda.
- 5 out-of-range no-commentary-only rows were removed.

### Confirmed verse-range repairs

- 10.51.3–4, 10.68.4, and 10.71.11 were aligned from verse numbers in the pinned Sanskrit commentary. The incorrect partial glosses on both overlapping 10.51.3 records were cleared pending range review.
- The unrelated or incomplete lexical pairs on 10.73.1 and 10.73.9 were cleared. 10.73.2–4 was kept as a grouped Sanskrit source range. The empty attribution-only 10.73.3 row and conflicting no-commentary 10.73.4 row were removed. The Sanskrit text at 10.73.5–6 was corrected to end at 6; the separate 10.73.7 entry remains.
- 10.81.41 received a draft lexical breakdown from its pinned Sanskrit source; it remains flagged for review.
- The real pinned commentary range 10.83.41–43 replaced false no-commentary rows; its English gloss remains pending.
- Exact no-commentary records for 10.84.69–70 were restored from the pinned source.

### Remaining range issues

Five source-backed commentary rows still fall outside the canonical chapter ranges and have not been reassigned: 10.37.34, 10.50.58, 10.51.64, 10.62.35, 10.72.48. The 10.51.3 source ranges still overlap; both are retained pending alignment review.

## Display sizing and status

Canto 10 now cache-busts to the shared reader sizing rules: verse heading 23 px desktop / 21 px mobile, Sanskrit 18 / 16.5 px, verse translation 14 px, word-for-word labels 19 / 17 px, and gloss rows 15.5 / 13.5 px.

The page states that Śrīdhara Sanskrit source records and English glosses remain incomplete or under review.
