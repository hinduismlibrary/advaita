# Viṣṇu Purāṇa, Book 4 — audit and change log

Updated 14 October 2026 in [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita).

## Scope

Reviewed all 24 chapter routes and 1,354 displayed verse cards.

| Chapter | Verse cards | Word-for-word panels | Main-text lexical rows |
|---:|---:|---:|---:|
| 1 | 96 | 0 | 0 |
| 2 | 133 | 0 | 0 |
| 3 | 49 | 0 | 0 |
| 4 | 114 | 0 | 0 |
| 5 | 34 | 0 | 0 |
| 6 | 94 | 3 | 15 |
| 7 | 39 | 1 | 4 |
| 8 | 21 | 1 | 8 |
| 9 | 28 | 0 | 0 |
| 10 | 32 | 0 | 0 |
| 11 | 30 | 0 | 0 |
| 12 | 45 | 0 | 0 |
| 13 | 162 | 0 | 0 |
| 14 | 53 | 0 | 0 |
| 15 | 50 | 0 | 0 |
| 16 | 6 | 6 | 26 |
| 17 | 5 | 5 | 18 |
| 18 | 30 | 0 | 0 |
| 19 | 85 | 1 | 10 |
| 20 | 53 | 0 | 0 |
| 21 | 18 | 18 | 51 |
| 22 | 13 | 13 | 42 |
| 23 | 13 | 13 | 32 |
| 24 | 151 | 0 | 0 |
| **Total** | **1,354** | **61** | **206** |

## Changes made

- Regenerated the Viṣṇu Purāṇa IAST transliteration from displayed Devanāgarī in all 1,354 verse cards, with standardized danda spacing. The separate Śrīdhara transliteration layer was retained.
- Regenerated the IAST in all 206 existing main-text lexical rows from their displayed Devanāgarī.
- Removed 4 Śrīdhara explanatory maps from Word-for-word panels; the Sanskrit and commentary layers remain separate.
- Corrected Book 4.16.1–3 against the pinned numbered Sanskrit witness and Śrīdhara verse text: समासतस्ते (not समाप्ततस्ते); तुर्वसोर्वंशम् (not दुर्वसोर्वशम्); and तुर्वसोर्वह्निरात्मजः (not दुर्वसोर्वह्निरात्मजः). The mūla-text file carries different readings in these places; the page now follows the numbered witness for this passage.
- Replaced the Book 4.16.1–6 English paragraphs with compact literal translations and removed the chapter-heading prose accidentally appended to 4.16.5–6.
- Corrected 4.8.17 from “six hundred years” to “sixty hundreds of years” (ṣaṣṭi-śata), preserving 60 × 100.
- Added the `vp-book-4` class to all routes, made their existing source notes visible, and styled Book 4 lexical rows and source notes at the same 840px/desktop/mobile scale used by the earlier books.
- Updated the shared stylesheet cache key to `20261014-vp-book4-audit-1`.
- Preserved the 393 available Śrīdhara Sanskrit blocks; the other 961 cards explicitly show “No commentary.”
- Repaired the missing English-source blob hash on Chapter 13. Source notes now link this audit and distinguish the supplied English cross-reference from Wilson’s comparison translation.

## Textual basis

The pages cite sources pinned at `vishvAsa/purANam_vaiShNavam` commit [`fc117aa4514dfd4e4840037aeb3ca825ba030b05`](https://github.com/vishvAsa/purANam_vaiShNavam/commit/fc117aa4514dfd4e4840037aeb3ca825ba030b05): the Book 4 mūla-text files, numbered Sanskrit/Hindi witness, repository-labelled Śrīdhara source, and English cross-reference. The witnesses vary in readings and verse grouping. A normalized text-presence check found every displayed Sanskrit block in at least one of those pinned source files; this check does not settle which variant is historically preferable.

Independent reference: [GRETIL Viṣṇupurāṇa critical text](https://www.gretil.uni-goettingen.de/gretil/corpustei/transformations/html/sa_viSNupurANa-crit.htm), based on M. M. Pathak’s critical edition (Vadodara Oriental Institute, 1997–1999).


The passage-specific variant decision is traceable in the pinned files: [mūla text, 4.16](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/04/16.md); [numbered witness, 4.16](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/04/16.md); [Śrīdhara witness, 4.16](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/shrIdhara-viShNu-chittau/4/16_turvasu-vaMsha-kathanam.md). The numbered and Śrīdhara sources support समासतस् and तुर्वसु; the local mūla file instead reads समाप्ततस् and दुर्वसु.

## Remaining translation-quality limits

- Only 61 of 1,354 verse cards currently contain Word-for-word panels; 1,293 do not. The 206 surviving rows include phrase groupings, and their English glosses have not all been independently checked against a Sanskrit lexicon.
- Most existing English prose remains the supplied cross-reference, which sometimes includes explanatory paraphrase or commentary. It has not been rewritten into a strict, independently verified one-to-one translation for every verse.
- Therefore this pass fixes source-linked text, transliteration, existing lexical-row IAST, panel separation, and layout; it does not certify a complete or perfect word-for-word translation of Book 4.

## Verification

- All 24 route files contain the Book 4 body class, cache-busted stylesheet, visible source note, and a Book 4 audit link.
- All 1,354 cards contain Sanskrit, English prose, a transliteration panel, and a commentary section; 393 have Śrīdhara Sanskrit and 961 explicitly show “No commentary.”
- The displayed Sanskrit blocks are present in at least one pinned Sanskrit source after normalization for markup, whitespace, and punctuation.
- All 206 lexical-row IAST fields were regenerated from the corresponding Devanāgarī; no Śrīdhara `.wfw-map` remains inside a Word-for-word panel.
