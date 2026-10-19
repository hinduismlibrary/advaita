# Vishnu Purana, Book 5 — audit log

Audit date: 2026-10-15  
Repository: [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita)  
Source snapshot: [vishvAsa/purANam_vaiShNavam commit fc117aa4514dfd4e4840037aeb3ca825ba030b05](https://github.com/vishvAsa/purANam_vaiShNavam/tree/fc117aa4514dfd4e4840037aeb3ca825ba030b05)

## Scope and coverage

The 38 current chapter pages contain **1517 verse cards**, each with a word-for-word panel (**1517/1517**) and **16,715 lexical rows**. Each row contains one Sanskrit lexical form, its IAST transliteration, and a direct English gloss. Compounds remain single lexical units. Structural checks found no blank row fields, mixed-script Sanskrit forms, multi-form Sanskrit rows, or mechanical IAST mismatches after normalizing the typographic avagraha.

The pages show **772 numbered Śrīdhara Sanskrit excerpts** with corresponding IAST, and 34 cards state that no numbered excerpt is supplied in the pinned source material. That absence does not establish that no commentary survives in other witnesses. IAST was generated mechanically from Devanāgarī; this is not independent scholarly transliteration review. The supplied English prose renderings remain separate from the word-for-word rows.

| Chapter | Verse cards | WFW panels | WFW lexical rows | Numbered Śrīdhara Sanskrit excerpts |
|---:|---:|---:|---:|---:|
| 1 | 87 | 87 | 934 | 75 |
| 2 | 21 | 21 | 246 | 10 |
| 3 | 29 | 29 | 325 | 18 |
| 4 | 17 | 17 | 222 | 9 |
| 5 | 23 | 23 | 261 | 10 |
| 6 | 51 | 51 | 528 | 28 |
| 7 | 83 | 83 | 811 | 70 |
| 8 | 13 | 13 | 161 | 5 |
| 9 | 38 | 38 | 444 | 23 |
| 10 | 49 | 49 | 579 | 28 |
| 11 | 25 | 25 | 270 | 14 |
| 12 | 26 | 26 | 298 | 12 |
| 13 | 62 | 62 | 691 | 25 |
| 14 | 14 | 14 | 133 | 7 |
| 15 | 24 | 24 | 267 | 4 |
| 16 | 28 | 28 | 301 | 10 |
| 17 | 33 | 33 | 322 | 9 |
| 18 | 58 | 58 | 644 | 35 |
| 19 | 29 | 29 | 332 | 11 |
| 20 | 105 | 105 | 935 | 96 |
| 21 | 32 | 32 | 339 | 6 |
| 22 | 18 | 18 | 202 | 9 |
| 23 | 47 | 47 | 538 | 20 |
| 24 | 21 | 21 | 237 | 15 |
| 25 | 19 | 19 | 204 | 0 |
| 26 | 12 | 12 | 135 | 3 |
| 27 | 32 | 32 | 383 | 11 |
| 28 | 28 | 28 | 346 | 15 |
| 29 | 35 | 35 | 390 | 12 |
| 30 | 80 | 80 | 926 | 31 |
| 31 | 20 | 20 | 221 | 8 |
| 32 | 30 | 30 | 370 | 12 |
| 33 | 53 | 53 | 576 | 25 |
| 34 | 44 | 44 | 467 | 19 |
| 35 | 38 | 38 | 397 | 16 |
| 36 | 24 | 24 | 238 | 6 |
| 37 | 75 | 75 | 875 | 29 |
| 38 | 94 | 94 | 1167 | 36 |
| **Total** | **1517** | **1517** | **16715** | **772** |

## Changes made

- Added word-for-word panels to the 275 cards that were missing them in Chapters 1, 7, and 20. Every Book 5 verse card now has a panel.
- Built individual Sanskrit, IAST, and direct-gloss rows; split 1,919 grouped entries where the displayed text contained separate words, while keeping compounds together as lexical units.
- Compared exact verse matches with a second word-by-word source, removed 54 imported grammar labels that were not verse words, repaired three panels that duplicated morphemes, and manually reviewed the new Chapter 1, 7, and 20 rows. Unclear readings remain marked instead of being silently emended.
- Corrected mixed-script rows at 5.18.4 (ताभ्याम्; *tābhyām*), 5.20.20 (जायते; *jāyate*), and 5.30.67 (भिन्नेषु; *bhinneṣu*).
- Corrected the source reading and word rows at 5.28.11 to the pinned Gorakhpur/Gita Press reading, and corrected the displayed reading, IAST, and word row at 5.33.25 to ततो (*tato*). Corrected the mistranslated epithet at 5.31.6 from “slayer of Mura” to “slayer of asuras.”
- Rebuilt Śrīdhara Sanskrit excerpts and IAST in Chapters 1, 7, and 20 from the pinned source files; corrected misplaced excerpt markers elsewhere so commentary appears with the corresponding verse.
- Rebuilt IAST for all 1517 main verse blocks and 772 Śrīdhara excerpts. IAST generation is mechanical, not an independent scholarly review.
- Removed 65 inline numeric reference markers, moved 63 speaker labels out of the verse text into separate speaker lines, and removed 199 embedded map blocks from word-for-word panels.
- Replaced 433 English commentary paragraphs that only repeated the supplied rendering with “No separate English commentary is supplied”; clarified absence notes and corrected copied commentary colophons in Chapters 14, 17, 18, and 23.
- Repaired the word-panel closing markup on all 1517 cards so each panel’s HTML elements balance; cleaned 203 empty or malformed paragraph class attributes in the commentary blocks.
- Standardized the Book 5 reader width to 840 px, lexical row size to 15.5 px desktop / 13.5 px mobile, and source-note size to 12.5 px desktop / 12 px mobile. Updated all 38 page notices and their audit links.

## Source-text comparison and variants reviewed

An earlier normalized text-presence test flagged 18 cards. Each flagged verse was manually checked against the pinned mūla/Śrīdhara source and the pinned Gorakhpur/Gita Press Sanskrit-Hindi witness. The table records why the earlier exact match failed and the reading now displayed. Some variants remain between the witnesses; those are explicit editorial choices rather than hidden corrections.

| Verse(s) | Comparison result and disposition |
|---|---|
| 5.22.11 | The mūla transcription has *saṅgrāma* with the long vowel dropped; the Gorakhpur witness confirms *saṅgrāmān*. The page keeps the complete reading. |
| 5.27.5 | The page’s *ekaḥ* is the lexical padaccheda corresponding to the printed sandhied *eko*; the word row keeps the unsandhied form. |
| 5.27.6 | The mūla transcription has apparent OCR errors *dvaja* and *asūra*; the Gorakhpur witness confirms द्विज and असुरवर्याय, retained on the page. |
| 5.27.14, 5.27.18, 5.27.26 | The verse page separates lexical words; the Gorakhpur witness prints the same forms joined by external sandhi. Word rows retain padaccheda. |
| 5.27.20 | The page keeps *utpatya*, the regular absolutive form; the Gorakhpur witness prints *utpattya*. The spelling variant is logged. |
| 5.28.11 | The page now follows the Gorakhpur reading **न जयामो बलं कस्माद् द्यूतेनैनं महाबलम्**. Its WFW rows and IAST now match this reading. The mūla/Śrīdhara file has the variant **तज्जयामो बलं कस्माद् द्यूते नैनं महाबलम्**; that variant is logged rather than silently combined. |
| 5.31.6 | The page keeps *pravṛttau* (“in the work of protecting”), found in the mūla witness; the Gorakhpur witness reads *pravṛttaḥ* (“engaged in protecting”). The separate gloss for *asura-sūdana* now correctly says “slayer of asuras.” |
| 5.31.13 | The page keeps मुखदर्शनम्, supported by the Gorakhpur witness; the mūla transcription’s मखदर्शनम् is an apparent reading/transcription error. |
| 5.31.16 | The page separates words that the Gorakhpur witness joins by sandhi; no lexical change was needed. |
| 5.33.22 | The page keeps प्रतापिताः, supported by the Gorakhpur witness; the mūla transcription’s प्रतापितिः is an apparent error. |
| 5.33.24 | *jṛmbha/jṛṃbha* is an anusvāra spelling difference; the page retains the displayed Sanskrit form. |
| 5.33.25 | The page now follows the mūla and Gorakhpur reading ततो (*tato*); its Sanskrit, IAST, and WFW row were updated from तदा (*tadā*). |
| 5.33.28 | The nasal in *saṅgṛhīta* is written with a homorganic nasal or anusvāra across the witnesses; the reading is the same. |
| 5.33.37 | The Gorakhpur witness joins forms by sandhi; the page keeps separate lexical forms in the WFW rows. |
| 5.34.26 | The page follows the Gorakhpur form *kāśipuryām* and retains the sandhied *śiraśśaraiḥ*; the mūla source has *kāśīpuryām* and *śiraḥ śaraiḥ*. Both witness readings are logged. |
| 5.34.42 | The page keeps दुर्निरीक्ष्यां, supported by the Gorakhpur witness; the mūla transcription’s दुर्निरिक्ष्यां has a short vowel where the Sanskrit root requires long ī. |

The comparison sources are pinned to commit [fc117aa4514dfd4e4840037aeb3ca825ba030b05](https://github.com/vishvAsa/purANam_vaiShNavam/tree/fc117aa4514dfd4e4840037aeb3ca825ba030b05): [mūla/Śrīdhara chapter 28](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/05/28.md) and [Gorakhpur Sanskrit/Hindi chapter 28](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/05/28.md). The same source paths for the remaining checked chapters are in the pinned repository snapshot.

## Remaining verification limits

All 18 earlier text-presence flags have an explicit disposition in the comparison table above. Some witness variants remain, especially at 5.28.11, 5.31.6, and 5.34.26. This is not a critical-edition collation. The word-level English glosses and morphological decisions have not received independent specialist review, so complete panel coverage must not be described as a guarantee that every translation choice is perfect. The supplied prose renderings remain separate from the lexical rows.

## Historical progress log

The entries below are dated snapshots from earlier stages. Their coverage totals are superseded by the current 1,517-panel table above.

## 2026-10-15 follow-up — Chapter 4 word-for-word panels

Added strict one-word rows to all 17 Book 5, Chapter 4 verse cards (222 rows). IAST was generated from each displayed Devanagari word form. The Sanskrit segmentation was checked against the chapter’s Śrīdhara verse text and the current verse IDs; compound words remain single rows, while clear external sandhi was separated into lexical words. The then-current 829-card gap elsewhere in Book 5 remained open; this update does not claim full-book completion or independent Sanskrit-scholar certification.


## 2026-10-15 follow-up — Chapter 8 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 13 Book 5, Chapter 8 verses (161 rows). Clear word boundaries were taken from the verse text and compounds were kept as single lexical units. The historical checkpoint recorded 701/1,517 cards with a panel; 816 cards still lacked one. This is a coverage update, not a claim of full-book completion.


## 2026-10-15 follow-up — Chapter 2 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 21 Book 5, Chapter 2 verse cards (246 rows). IAST was generated from the padaccheda forms. The displayed reading in 5.2.20 repeats *svadhā* where the numbered and Śrīdhara verse witnesses read *sudhā*; the main witness reading is preserved in the panel and this variant remains logged for editorial review. The historical checkpoint recorded 722/1,517 cards with panels and 795 cards still without one.


## 2026-10-15 follow-up — Chapter 3 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 29 Book 5, Chapter 3 verse cards (325 rows). IAST was generated from each Devanāgarī padaccheda form. The historical checkpoint recorded 751/1,517 cards with panels and 766 cards still without one.


## 2026-10-15 follow-up — Chapter 5 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 23 Book 5, Chapter 5 verse cards (261 rows). Compound expressions remain one lexical row; inflected words are individually glossed. The historical checkpoint recorded 774/1,517 cards with panels and 743 cards still without one.


## 2026-10-15 follow-up — Chapter 11 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 25 Book 5, Chapter 11 verse cards (270 rows). The historical checkpoint recorded 799/1,517 cards with panels and 718 cards still without one.


## 2026-10-15 follow-up — Chapter 12 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 26 Book 5, Chapter 12 verse cards (298 rows). The historical checkpoint recorded 825/1,517 cards with panels and 692 cards still without one.


## 2026-10-15 follow-up — Chapter 21 word-for-word panels

Added one-word Sanskrit, IAST, and direct gloss rows to all 32 Book 5, Chapter 21 verse cards (339 rows). The audit records 857/1,517 cards with panels and 660 cards still without one.


## 2026-10-15 verification note

A wording review corrected 5.5.1 *prahṛṣṭaḥ* to accusative *prahṛṣṭam*, agreeing with *Nandam* in the verse. The coverage summary has also been reconciled to the updated chapter table: 857 panels and 6,642 rows total; 660 verse cards remain without a word-for-word panel.


## 2026-10-15 follow-up — Chapter 9 word-for-word panels

Added individual Sanskrit, IAST, and direct gloss rows to all 38 Book 5, Chapter 9 verse cards (444 rows). Compounds are retained as lexical units. The readings "कास्तम्" in 5.9.30 and "असुकल्पम्" in 5.9.31 remain explicitly flagged as unclear in the source rather than silently emended. Coverage is now 895/1,517 cards; 622 cards remain without panels.


## 2026-10-15 follow-up — Chapter 6 word-for-word panels

Added individual Sanskrit, IAST, and direct gloss rows to all 51 Book 5, Chapter 6 verse cards (528 rows). The displayed readings "गोपरोपीजनः" (5.6.3) and the segmentation of some descriptive compounds are retained from the page and flagged for source review rather than silently emended. Coverage is now 946/1,517 cards; 571 cards remain without panels.


## 2026-10-15 follow-up — Chapter 23 word-for-word panels

Added individual Sanskrit, IAST, and direct gloss rows to all 47 Book 5, Chapter 23 verse cards (538 rows). The page’s supplied Śrīdhara Sanskrit remains alongside its corresponding verses. The “not complete” counts now reflect 993/1,517 cards covered and 524 still uncovered.


## 2026-10-15 follow-up — Chapter 10 source corrections and word-for-word panels

Added Sanskrit, IAST, and direct gloss rows to all 49 Chapter 10 verse cards (578 rows). Source collation found that verses 32 and 39 had Śrīdhara prose in the main-verse field, and verse 36 repeated the ending of verse 43. Restored the mūla readings at 32, 36, and 39 from the pinned source witness; normalized the unclear OCR form “मीमान्तं” at 32 to “सीमान्तं” with support from the parallel reading and commentary. The audit now records 1,042/1,517 panels and 475 remaining.


## 2026-10-15 follow-up — Chapter 13 source correction and word-for-word panels

Added Sanskrit, IAST, and direct gloss rows to all 62 Chapter 13 verse cards (691 rows). Restored the actual mūla verse in 5.13.32, where Śrīdhara's explanatory prose had occupied the main Sanskrit field. The source correction follows the pinned mūla-text witness. Coverage is 1,104/1,517; 413 cards remain without panels.


## 2026-10-15 follow-up — Chapter 18 source correction and word-for-word panels

Added Sanskrit, IAST, and direct gloss rows to all 58 Chapter 18 verse cards (644 rows). Restored the mūla reading in 5.18.15, where the main Sanskrit field contained Śrīdhara explanatory prose. Remaining 355 cards are in Chapters 1, 7, 20, and 30.


## 2026-10-15 follow-up — Chapter 30 word-for-word panels

Added Sanskrit, IAST, and direct gloss rows to all 80 Chapter 30 verse cards (926 rows). Corrected a copied English rendering at 5.30.38 so it translates that verse. Coverage is now 1,242/1,517; 275 cards remain without panels.


## 2026-10-15 final completion — Book 5

Completed panels on all 1517 verse cards, with 16,715 word rows and 772 numbered Śrīdhara Sanskrit excerpts paired with IAST. The final structural pass found no blank row fields, mixed-script Sanskrit forms, multi-form rows, mechanical IAST mismatches, unbalanced word-panel markup, or unclosed details panels. It also corrected the 5.28.11 and 5.33.25 source readings and recorded the remaining witness variants above.

Reader styling and page notices are consistent across all 38 chapters. The lexical rows are complete as site content; independent philological certification is still needed before calling every gloss perfect.
