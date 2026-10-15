# Vishnu Purana, Book 5 — audit log

Audit date: 2026-10-15  
Repository: [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita)  
Source snapshot: [vishvAsa/purANam_vaiShNavam commit fc117aa4514dfd4e4840037aeb3ca825ba030b05](https://github.com/vishvAsa/purANam_vaiShNavam/tree/fc117aa4514dfd4e4840037aeb3ca825ba030b05)

## Scope and coverage

The 38 current chapter pages contain 1,517 verse cards. These are counts of the current site, not an assertion that every edition or witness has the same verse numbering. The site currently has a word-for-word panel on 671 cards (4,520 lexical rows); 846 cards do not have a word-for-word panel. The existing rows and English renderings have not been fully checked against Sanskrit lexicons and do not constitute a complete strict one-to-one translation of every verse.

The pages contain 656 supplied Śrīdhara Sanskrit excerpts. The remaining 861 cards have no Śrīdhara excerpt displayed from the pinned source material; that absence does not establish that no commentary survives in other witnesses.

| Chapter | Verse cards | With WFW panel | Without WFW panel | Existing lexical rows | Śrīdhara Sanskrit excerpts |
|---:|---:|---:|---:|---:|---:|
| 1 | 87 | 0 | 87 | 0 | 54 |
| 2 | 21 | 0 | 21 | 0 | 10 |
| 3 | 29 | 0 | 29 | 0 | 18 |
| 4 | 17 | 0 | 17 | 0 | 9 |
| 5 | 23 | 0 | 23 | 0 | 10 |
| 6 | 51 | 0 | 51 | 0 | 27 |
| 7 | 83 | 0 | 83 | 0 | 36 |
| 8 | 13 | 0 | 13 | 0 | 5 |
| 9 | 38 | 0 | 38 | 0 | 22 |
| 10 | 49 | 0 | 49 | 0 | 28 |
| 11 | 25 | 0 | 25 | 0 | 14 |
| 12 | 26 | 0 | 26 | 0 | 12 |
| 13 | 62 | 0 | 62 | 0 | 25 |
| 14 | 14 | 14 | 0 | 71 | 7 |
| 15 | 24 | 24 | 0 | 106 | 4 |
| 16 | 28 | 28 | 0 | 114 | 10 |
| 17 | 33 | 33 | 0 | 118 | 9 |
| 18 | 58 | 0 | 58 | 0 | 35 |
| 19 | 29 | 29 | 0 | 116 | 11 |
| 20 | 105 | 0 | 105 | 0 | 40 |
| 21 | 32 | 0 | 32 | 0 | 6 |
| 22 | 18 | 18 | 0 | 178 | 9 |
| 23 | 47 | 0 | 47 | 0 | 18 |
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
| **Total** | **1517** | **671** | **846** | **4,520** | **656** |

## Changes made

- Added the Book 5 body class so source notes and lexical styles display, and added matching Book 5 CSS for consistent reader widths and type sizes (15.5 px desktop / 13.5 px mobile lexical rows; 12.5 px / 12 px source notes).
- Rebuilt IAST transliteration for all 1,517 displayed main Sanskrit verse blocks and all 656 displayed Śrīdhara Sanskrit excerpts; regenerated the IAST fields in all 4,520 existing lexical rows. This is mechanical transliteration from displayed Devanāgarī, not an independent scholarly transliteration review.
- Removed 65 inline numeric reference markers from the displayed Sanskrit verses and moved 63 speaker labels out of the verse text into separate speaker lines.
- Removed 199 embedded map blocks from word-for-word panels to keep their text separate from lexical rows.
- Replaced 433 “Śrīdhara commentary” paragraphs that exactly repeated the card’s English rendering with “No separate English commentary is supplied.” Changed broad “No commentary” placeholders to say that no Śrīdhara text is supplied in that card.
- Corrected the copied Śrīdhara commentary colophon that named Book 5, Chapter 12 in Chapters 14, 17, 18, and 23; updated each corresponding IAST colophon as well.
- Corrected the source note so it describes comparison across the pinned mūla, numbered Sanskrit/Hindi, and Śrīdhara witnesses without claiming a single witness is followed throughout; renamed the Wilson link as a comparison translation.
- Added the coverage limitation and this audit link to every Book 5 page.

## Source-text check and remaining items

A normalized text-presence check compared the displayed Sanskrit readings (ignoring line breaks, punctuation, removed reference digits, and separated speaker labels) against the pinned mūla, numbered Sanskrit/Hindi, and Śrīdhara source files. 1,498 of 1,517 cards matched at least one of those source texts; the following 19 remain unresolved by that check:

- 5.22.11
- 5.27.5, 5.27.6, 5.27.14, 5.27.18, 5.27.20, 5.27.26
- 5.28.11, 5.28.16
- 5.31.6, 5.31.13, 5.31.16
- 5.33.22, 5.33.24, 5.33.25, 5.33.28, 5.33.37
- 5.34.26, 5.34.42

This check is a normalized text-presence test, not a critical-edition collation or a proof that the matching reading is correct. These 19 references need direct review against the source witnesses.

## Not complete

Book 5 still does **not** have a complete strict word-for-word translation. 846 cards have no WFW panel, and the 4,520 existing lexical rows have not all been independently verified for morphology, sandhi, compounds, and gloss accuracy. The English prose is retained as a supplied rendering; it has not been converted into a strict word-by-word translation. Further philological work is required before describing this book as complete or perfect.