# Vishnu Purana, Book 5 — audit log

Audit date: 2026-10-15  
Repository: [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita)  
Source snapshot: [vishvAsa/purANam_vaiShNavam commit fc117aa4514dfd4e4840037aeb3ca825ba030b05](https://github.com/vishvAsa/purANam_vaiShNavam/tree/fc117aa4514dfd4e4840037aeb3ca825ba030b05)

## Scope and coverage

The 38 current chapter pages contain 1,517 verse cards. These are counts of the current site, not an assertion that every edition or witness has the same verse numbering. The site currently has a word-for-word panel on 1,162 cards (10,065 lexical rows); 355 cards do not have a word-for-word panel. The existing rows and English renderings have not been fully checked against Sanskrit lexicons and do not constitute a complete strict one-to-one translation of every verse.

The pages contain 656 supplied Śrīdhara Sanskrit excerpts. The remaining 861 cards have no Śrīdhara excerpt displayed from the pinned source material; that absence does not establish that no commentary survives in other witnesses.

| Chapter | Verse cards | With WFW panel | Without WFW panel | Existing lexical rows | Śrīdhara Sanskrit excerpts |
|---:|---:|---:|---:|---:|---:|
| 1 | 87 | 0 | 87 | 0 | 54 |
| 2 | 21 | 21 | 0 | 246 | 10 |
| 3 | 29 | 29 | 0 | 325 | 18 |
| 4 | 17 | 17 | 0 | 222 | 9 |
| 5 | 23 | 23 | 0 | 261 | 10 |
| 6 | 51 | 51 | 0 | 528 | 27 |
| 7 | 83 | 0 | 83 | 0 | 36 |
| 8 | 13 | 13 | 0 | 161 | 5 |
| 9 | 38 | 38 | 0 | 444 | 22 |
| 10 | 49 | 49 | 0 | 578 | 28 |
| 11 | 25 | 25 | 0 | 270 | 14 |
| 12 | 26 | 26 | 0 | 298 | 12 |
| 13 | 62 | 62 | 0 | 691 | 25 |
| 14 | 14 | 14 | 0 | 71 | 7 |
| 15 | 24 | 24 | 0 | 106 | 4 |
| 16 | 28 | 28 | 0 | 114 | 10 |
| 17 | 33 | 33 | 0 | 118 | 9 |
| 18 | 58 | 58 | 0 | 644 | 35 |
| 19 | 29 | 29 | 0 | 116 | 11 |
| 20 | 105 | 0 | 105 | 0 | 40 |
| 21 | 32 | 32 | 0 | 339 | 6 |
| 22 | 18 | 18 | 0 | 178 | 9 |
| 23 | 47 | 47 | 0 | 538 | 18 |
| 24 | 21 | 21 | 0 | 211 | 15 |
| 25 | 19 | 19 | 0 | 80 | 0 |
| 26 | 12 | 12 | 0 | 50 | 3 |
| 27 | 32 | 32 | 0 | 360 | 11 |
| 28 | 28 | 28 | 0 | 326 | 15 |
| 29 | 35 | 35 | 0 | 275 | 12 |
| 30 | 80 | 0 | 80 | 0 | 30 |
| 31 | 20 | 20 | 0 | 210 | 8 |
| 32 | 30 | 30 | 0 | 209 | 12 |
| 33 | 53 | 53 | 0 | 399 | 25 |
| 34 | 44 | 44 | 0 | 307 | 19 |
| 35 | 38 | 38 | 0 | 247 | 16 |
| 36 | 24 | 24 | 0 | 134 | 6 |
| 37 | 75 | 75 | 0 | 514 | 29 |
| 38 | 94 | 94 | 0 | 495 | 36 |
| **Total** | **1517** | **1162** | **355** | **10065** | **656** |

## Changes made

- Added the Book 5 body class so source notes and lexical styles display, and added matching Book 5 CSS for consistent reader widths and type sizes (15.5 px desktop / 13.5 px mobile lexical rows; 12.5 px / 12 px source notes).
- Rebuilt IAST transliteration for all 1,517 displayed main Sanskrit verse blocks and all 656 displayed Śrīdhara Sanskrit excerpts; regenerated the IAST fields in all 4,520 existing lexical rows. This is mechanical transliteration from displayed Devanāgarī, not an independent scholarly transliteration review.
- Removed 65 inline numeric reference markers from the displayed Sanskrit verses and moved 63 speaker labels out of the verse text into separate speaker lines.
- Removed 199 embedded map blocks from word-for-word panels to keep their text separate from lexical rows.
- Replaced 433 “Śrīdhara commentary” paragraphs that exactly repeated the card’s English rendering with “No separate English commentary is supplied.” Changed broad “No commentary” placeholders to say that no Śrīdhara text is supplied in that card.
- Corrected the copied Śrīdhara commentary colophon that named Book 5, Chapter 12 in Chapters 14, 17, 18, and 23; updated each corresponding IAST colophon as well.
- Corrected three concrete verse/lexical mismatches: in 5.28.16, changed बुधैव / बुधैः (“by the wise”) to मुधैव / मुधा (“in vain”), matching the pinned text; in 5.31.13, corrected कुर्वतो to कुर्वन्तो to agree with the verse source and lexical row; in 5.33.24, aligned the word row to the displayed reading प्रणेशुः (“fled”) instead of प्रणेमुः and tightened the gloss from “fled / withdrew” to “fled.”
- Corrected the source note so it describes comparison across the pinned mūla, numbered Sanskrit/Hindi, and Śrīdhara witnesses without claiming a single witness is followed throughout; renamed the Wilson link as a comparison translation.
- Added the coverage limitation and this audit link to every Book 5 page.

## Source-text check and remaining items

A normalized text-presence check compared the displayed Sanskrit readings (ignoring line breaks, punctuation, removed reference digits, and separated speaker labels) against the pinned mūla, numbered Sanskrit/Hindi, and Śrīdhara source files. 1,499 of 1,517 cards matched at least one of those source texts after the corrections above; the following 18 remain unresolved by that check:

- 5.22.11
- 5.27.5, 5.27.6, 5.27.14, 5.27.18, 5.27.20, 5.27.26
- 5.28.11
- 5.31.6, 5.31.13, 5.31.16
- 5.33.22, 5.33.24, 5.33.25, 5.33.28, 5.33.37
- 5.34.26, 5.34.42

This check is a normalized text-presence test, not a critical-edition collation or a proof that the matching reading is correct. The witnesses differ in spelling, sandhi, segmentation, and sometimes wording; these 18 references need direct collation before their readings can be adjudicated.

## Not complete

Book 5 still does **not** have a complete strict word-for-word translation. 355 cards have no WFW panel, and the 10,065 existing lexical rows have not all been independently verified for morphology, sandhi, compounds, and gloss accuracy. The English prose is retained as a supplied rendering; it has not been converted into a strict word-by-word translation. Further philological work is required before describing this book as complete or perfect.

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
