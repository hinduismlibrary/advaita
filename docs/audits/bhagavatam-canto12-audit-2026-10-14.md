# Śrīmad-Bhāgavatam Canto 12 audit

**Audit date:** 2026-10-14  
**Scope:** all 13 chapters and all 568 numbered verses

## Verse coverage

The pinned Śrīdhara source is [vishvAsa/purANam_vaiShNavam](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIya-prastutiH/12), commit `100560de6c9f68c2875097d40a2012a84c784179`. The reader has 507 grouped Śrīdhara source records; their ranges and explicit no-commentary markers cover the 568 verses.

| Chapter | Verses | Coverage and change |
|---:|---:|---|
| 1 | 44 | The English mirror has 41 records and a different numbering/text at its ending. Replaced its overlapping tail with source-aligned records 39–44. |
| 2 | 44 | Full verse range and English-source fields present. |
| 3 | 52 | Full verse range and English-source fields present. |
| 4 | 43 | Full verse range and English-source fields present. |
| 5 | 13 | Full verse range and English-source fields present. |
| 6 | 80 | Full verse range and English-source fields present. |
| 7 | 25 | Full verse range and English-source fields present. |
| 8 | 49 | Full verse range and English-source fields present. |
| 9 | 34 | Full verse range and English-source fields present. |
| 10 | 42 | Full verse range and English-source fields present; source checksum corrected. |
| 11 | 50 | Full verse range and English-source fields present. |
| 12 | 69 | Full verse range and English-source fields present. |
| 13 | 23 | Added all 23 records locally because the pinned English mirror has no chapter 13 file. |

**Total: 568 verses.**

## Changes made

- Added local English overlays for ŚB 12.1.39–44 and 12.13.1–23. Each record has Devanāgarī, IAST transliteration, word-by-word glosses, and a literal translation. Canto 12.13 Sanskrit and verse segmentation were cross-checked against [VedaBase Advanced View](https://vedabase.io/en/library/sb/12/13/advanced-view/); English glosses and translations in the new records are written for this reader.
- Updated the reader to load Canto 12.13 locally and replace the English mirror's mismatched ending in chapter 1 with verses 39–44. Śrīdhara Sanskrit continues to load from the pinned source.
- Regenerated the 507 local Canto 12 auxiliary IAST fields from their stored Devanāgarī, and restored the complete main verse text for 12.1.39–44 in the local chapter 1 data.
- Corrected the chapter 10 source blob checksum from 39 to 40 hexadecimal characters.
- Standardized displayed typography across all chapters: main Sanskrit is 18px on desktop and 16.5px on mobile; the translation is 14px; word-for-word glosses are 15.5px on desktop and 13.5px on mobile; opened gloss labels are 19px and 17px. Shared selectors apply these sizes uniformly.

## Verification

- Chapter verse ranges were compared against the pinned local Śrīdhara chapter data. The expected chapter counts sum to 568.
- The English-source files for chapters 2–12 have complete verse coverage and nonempty Devanāgarī, transliteration, synonyms, and translation fields. Chapter 1's 39–44 records and all of chapter 13 are supplied by the new local Markdown files with the same fields.
- The 507 local auxiliary IAST strings now match transliteration generated from their stored Devanāgarī fields; the chapter 1 tail has full verse text.
- No per-chapter CSS was added; one shared reader stylesheet controls type sizes.

## Translation scope

Chapters 1–12 retain the pinned English source's word-by-word synonym blocks and prose translations where those records were complete. This audit verifies their verse coverage and required fields; it is not a fresh independent Sanskritist retranslation of every existing source gloss. The new records for 12.1.39–44 and 12.13.1–23 use literal, source-aligned glosses and translations.
