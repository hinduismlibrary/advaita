# Viṣṇu Purāṇa Book 1 — correction and coverage log

Audit date: 2026-10-14  
Repository: [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita)  
Reader: [Book 1](https://krishnavyasmuni.github.io/advaita/pages/vishnu-purana/)

## Coverage checked

Structural checks were run across all 22 Book 1 chapter pages. They contain 1,407 verse cards. Every card has a Sanskrit text block, Wilson English translation paragraph, base-verse transliteration panel, and word-for-word panel. Every displayed word-for-word row contains Devanāgarī, IAST, and an English gloss. The audit counted 13,327 word-for-word rows after the corrections below.

All 22 chapter pages link to the same reader stylesheet. Both base stylesheets use 15.5 px / 1.55 line height for word rows on wider screens and 13.5 px / 1.48 on mobile; no chapter-specific word-row size overrides were found. Book 1 pages now expose the pinned textual-basis note at a consistent 12.5 px / 12 px size; a cache-busting version was added to the Book 1 stylesheet links.

| Chapter | Verse cards | Word-for-word rows | Śrīdhara Sanskrit panels |
|---:|---:|---:|---:|
| 1 | 35 | 209 | 19 |
| 2 | 68 | 499 | 49 |
| 3 | 28 | 215 | 26 |
| 4 | 52 | 449 | 52 |
| 5 | 66 | 638 | 62 |
| 6 | 42 | 246 | 37 |
| 7 | 48 | 304 | 37 |
| 8 | 32 | 230 | 27 |
| 9 | 149 | 1663 | 102 |
| 10 | 21 | 243 | 13 |
| 11 | 57 | 686 | 34 |
| 12 | 103 | 1127 | 59 |
| 13 | 95 | 1130 | 40 |
| 14 | 49 | 524 | 30 |
| 15 | 156 | 1786 | 102 |
| 16 | 16 | 201 | 4 |
| 17 | 91 | 470 | 59 |
| 18 | 43 | 319 | 23 |
| 19 | 86 | 1022 | 53 |
| 20 | 39 | 464 | 22 |
| 21 | 41 | 476 | 24 |
| 22 | 90 | 426 | 60 |
| **Total** | **1407** | **13327** | **934** |

A Śrīdhara Sanskrit panel is shown where the source commentary block is attached. The source sometimes comments on a verse range rather than repeating a comment for each verse. This audit did not duplicate or invent commentary to make the panel count equal the verse count. The panel counts above are not a claim that every verse has a standalone commentary block.

## Corrections made

- Removed 934 Śrīdhara explanatory/gloss blocks from the *Word-for-word* panels across Book 1. These blocks contained commentary summaries and phrase-level explanations, so they did not belong in a strict lexical panel. The source's Sanskrit commentary and its transliteration remain in their separate panels.
- **1.1.1:** Split grouped phrases into separate lexical entries and corrected the glosses for *viśva-bhāvana*, *mahā-puruṣa*, and *pūrvaja*.
- **1.1.2:** Reassigned the glosses to the correct Sanskrit components. *Pumān* is “Person/Puruṣa”; *guṇormi* is the wave of the qualities. The remaining words and compound components now appear in source order.
- **1.3.24:** Restored the omitted *tu* and the second *trailokya* in the final compound; corrected the case-sensitive glosses.
- **1.5.7, 1.5.23–25, 1.5.46–49:** Removed trailing word rows copied from later verse cards. The following verses retain their own word lists.
- **1.8.16:** Replaced the editorial heading *aṇutva-pakṣa-prakṣepaḥ* in the Sanskrit slot with the actual verse. Updated its Devanāgarī text, IAST transliteration, and WFW rows; restored omitted *tu* in the WFW list.
- Made the Book 1 textual-basis notes visible and consistently styled. Added a Book 1 body class and cache-busting stylesheet version to the 22 chapter pages.

## Textual decisions and source

The Sanskrit and commentary were checked against the pinned Vasuki source files:
- [Book 1, chapter 1 source](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/shrIdhara-viShNu-chittau/1/01_mangalAcharaNaM_parAsharaM_prati_mait.md)
- [Book 1, chapter 8 source](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/shrIdhara-viShNu-chittau/1/08_laxmy-utpatti-kathanaM.md)

At **1.1.2**, the printed root text reads *saubhāgya*, while the Śrīdhara gloss paraphrases this component as *buddhi*. The WFW rows preserve the printed root reading instead of silently substituting the commentary's gloss. This reading difference is recorded for source-level review.

At **1.8.16**, the source labels an editorial excursus on the “atomicity view” before the verse. That heading is apparatus, not the verse, and has been removed from the verse text slot. The verse itself is now displayed.

Chapter-local verse numbering and the selected Vasuki sequence were left intact. In particular, this change did not silently renumber prefatory or variant verses.

## Remaining review limit

These edits correct identified errors and verify the presence and structure of all verse layers. They do **not** constitute an independent philological proof of every one of the 13,327 English glosses. A complete lexical and grammatical review of every verse remains necessary before describing the whole Book 1 translation as perfect. No such blanket accuracy claim is made here.
