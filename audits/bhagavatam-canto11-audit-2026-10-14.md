# Canto 11 source alignment and reader audit — 2026-10-14

## Scope and source pins

This update audits the Canto 11 reader across all 31 chapters, repairs confirmed source-label alignment and false gloss attribution, and standardizes the inline reader sizes. It uses the pinned VishvAsa corpus commit `100560de6c9f68c2875097d40a2012a84c784179` for both Sanskrit and the English mirror.

All 31 manifest Sanskrit paths exist at that commit and their local word-for-word JSON files retain the matching source path and blob SHA. The displayed English mirror has 1,367 numbered verse records. Its Devanagari field is present for 1,366 records; the reader supplies the pinned-source text for 11.7.1 through the existing override. IAST verse text, source Synonyms, and English Translation fields are present for all 1,367 records.

## Chapter coverage inventory

| Chapter | Displayed verse records |
|---|---:|
| 11.1 | 24 |
| 11.2 | 55 |
| 11.3 | 55 |
| 11.4 | 23 |
| 11.5 | 52 |
| 11.6 | 50 |
| 11.7 | 74 |
| 11.8 | 44 |
| 11.9 | 33 |
| 11.10 | 37 |
| 11.11 | 49 |
| 11.12 | 24 |
| 11.13 | 42 |
| 11.14 | 46 |
| 11.15 | 36 |
| 11.16 | 44 |
| 11.17 | 58 |
| 11.18 | 48 |
| 11.19 | 45 |
| 11.20 | 37 |
| 11.21 | 43 |
| 11.22 | 61 |
| 11.23 | 61 |
| 11.24 | 29 |
| 11.25 | 36 |
| 11.26 | 35 |
| 11.27 | 55 |
| 11.28 | 44 |
| 11.29 | 49 |
| 11.30 | 50 |
| 11.31 | 28 |

**Total: 1,367 displayed verse records across 31 chapters.**

There are 40 local Canto 11 word-for-word JSON files containing 1,267 records. Those records are still marked `requires-full-verification`. The source-provided Bhāgavatam Synonyms and English translations have not been independently rewritten or certified by this audit.

## Fixes

### 1. Chapter 23 source-label alignment

The pinned Śrīdhara file has 59 source marker records whose ranges cover source labels 1–62. The English mirror has 61 displayed verse IDs. Comparison of the verse text confirms that source marker 35 begins the continuation of displayed verse 34, and the later source labels are one ahead of the displayed numbering. Source label 42 occurs twice: the first is displayed verse 41; the second, beginning `dvija uvāca`, is displayed verse 42. The source labels proceed from 42 to 44; no source label 43 appears.

The reader now applies this map without changing the Devanāgarī source text:

| Pinned Śrīdhara label | Displayed verse ID |
|---|---:|
| 34 | 34 |
| 35 | 34 |
| 36–38 | 35–37 |
| 39–40 | 38–39 |
| 41 | 40 |
| first 42 | 41 |
| second 42 (`dvija uvāca`) | 42 |
| 44–62 | 43–61 |

The same one-label offset is applied to Chapter 23 local word-for-word and commentary ranges. The local JSON resolves the second repeated 42 as source range 43 before the runtime offset. Chapter 22’s earlier verified mapping (source labels 36–38 to displayed 37–39) remains in place.

### 2. No-commentary records

Three records had no-commentary markers in their Sanskrit field but also exposed misleading Śrīdhara word-for-word pairs:

- 11.14.40: removed a displayed gloss translating the source marker as “no commentary by anyone.”
- 11.16.13: removed the Bhagavatam verse’s Synonyms that had been misattributed to Śrīdhara.
- 11.16.15: removed the Bhagavatam verse’s Synonyms that had been misattributed to Śrīdhara.

The source Sanskrit no-commentary markers remain unchanged, and the affected local `word_for_word` arrays are now empty. The Chapter 16 record notes explicitly state that no separate Śrīdhara commentary is present.

### 3. Standardized reader sizing

The inline `!important` rules had been overriding the shared stylesheet. They now match its reader values:

- Verse heading: 23 px desktop, 21 px mobile.
- Main Devanāgarī: 18 px desktop, 16.5 px mobile.
- English verse translation: 14 px.
- Word-for-word rows: 15.5 px desktop, 13.5 px mobile.
- Word-for-word section labels remain 19 px desktop and 17 px mobile.

The changed scripts and JSON cache keys were versioned so browsers request the corrections.

## Verification

- Parsed all 59 pinned Chapter 23 source markers and mapped their expanded ranges to displayed verses 1–61: no missing displayed IDs; the duplicate canonical 34 is intentional because source labels 34 and 35 form that displayed verse.
- Applied the same local-range mapping to the 59 Chapter 23 local records: displayed IDs 1–61 are covered with the same intentional overlap at verse 34.
- Confirmed all three edited local records retain their exact no-commentary Sanskrit marker and no longer contain falsely attributed word-for-word pairs.
- Checked that the reader and style script remain syntactically valid and that each changed asset has a new cache key.

## Remaining review

This update is **not a certification of perfect word-for-word translation**. The existing deterministic audit at [`.github/maintenance/audit/canto11/automated-summary.md`](../.github/maintenance/audit/canto11/automated-summary.md) records 6,163 diagnostic flags across 1,367 verse rows, including possible gloss-source mismatches and Sanskrit text differences. Those checks are conservative and some flags can result from grouped commentary or orthographic differences, but they have not all been reviewed verse by verse. The local glosses still require a full source-first linguistic review. The source-provided Bhāgavatam Synonyms, IAST and prose translations remain as sourced and are not presented as independently retranslated.
