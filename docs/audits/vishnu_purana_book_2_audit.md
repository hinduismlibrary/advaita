# Viṣṇu Purāṇa, Book 2 — audit and change log

Updated 14 October 2026 in [`krishnavyasmuni/advaita`](https://github.com/krishnavyasmuni/advaita).

## Scope

Reviewed all 16 chapter pages and all 787 displayed verse cards. Counts below report the surviving main-text word-for-word rows after this pass.

| Chapter | Verse cards | Word-for-word rows |
|---:|---:|---:|
| 1 | 43 | 525 |
| 2 | 56 | 360 |
| 3 | 28 | 105 |
| 4 | 97 | 1148 |
| 5 | 27 | 97 |
| 6 | 53 | 311 |
| 7 | 43 | 574 |
| 8 | 122 | 1629 |
| 9 | 24 | 109 |
| 10 | 23 | 225 |
| 11 | 26 | 291 |
| 12 | 47 | 348 |
| 13 | 104 | 1365 |
| 14 | 33 | 223 |
| 15 | 36 | 220 |
| 16 | 25 | 131 |

## Changes made

- Regenerated the main-text transliteration in all 787 cards from each card’s displayed Devanāgarī. Verse-number and footnote digits were omitted from transliteration. The main-text transliteration now matches the displayed Sanskrit mechanically.
- Regenerated IAST in the surviving lexical rows from the Devanāgarī shown in those rows; 435 existing IAST strings changed. Danda punctuation was removed from 277 lexical row spellings because it is verse punctuation, not a word.
- Removed 490 explanatory `.wfw-map` blocks from word-for-word controls (450 inside duplicated Śrīdhara sections and 40 additional blocks), while retaining Śrīdhara Sanskrit, transliteration, and commentary in their separate layers.
- Removed 213 sentence-like gloss rows longer than 65 characters, 123 repeated catchall rows, 10 speaker/catchall rows, and one row carrying a stray digit. These were not word-for-word glosses. Split one grouped row in 2.4.1 into separate lexical rows.
- Added 39 concise lexical rows for 2.9.1, 2.9.9, and 2.9.24 after removal of prose catchalls would otherwise have left their word-for-word controls empty.
- Corrected 2.4.1 from the displayed misreading `अभिचेष्टितः` to `अभिवेष्टितः`, and normalized `जम्बू-संज्ञो`. The critical edition reads `jambūsaṃjño 'bhiveṣṭitaḥ`; its speaker notation is separate from the numbered verse. Sources: [GRETIL critical-edition text](https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/3_purana/vipce_pu.htm) and the [pinned Vasuki mūla file](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/02/04.md).
- Corrected 2.9.9 to follow the critical-edition reading `some muñcaty athenduś ca` and `abhreṣu`; the pinned mūla witness has a different reading in this clause. The page records the difference. Source: [GRETIL, ViP 2.9.8–10](https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/3_purana/vipce_pu.htm).
- Added explicit “No Śrīdhara commentary in the pinned source” status text at 2.14.9, 2.15.9–10, and 2.16.2, 2.16.16–21; the dedicated Śrīdhara controls remain omitted for those source-absent passages. Source files: [Book 2, Chapter 14](https://github.com/vishvAsa/purANam_vaiShNavam/blob/content/viShNu-purANam/shrIdhara-viShNu-chittau/2/14_jaDabharata-sauvIra-nareshayoH_saMvAd.md), [Chapter 15](https://github.com/vishvAsa/purANam_vaiShNavam/blob/content/viShNu-purANam/shrIdhara-viShNu-chittau/2/15_RbhUpadeshaH.md), and [Chapter 16](https://github.com/vishvAsa/purANam_vaiShNavam/blob/content/viShNu-purANam/shrIdhara-viShNu-chittau/2/16_Rbhor_Adeshato_nidAghasya_sva-gRha-pr.md).
- Added the `vp-book-2` reader class and matching Book 1 source-note styling. All 16 pages use the same shared reader CSS, an 840px content width, and one Book 2 cache version. Source notes now use the same desktop/mobile size rules as Book 1.

## Verification

- 16/16 chapter pages and 787/787 verse cards have Sanskrit, an English translation, a word-for-word control with at least one lexical row, a main-text transliteration control, and a commentary/status section.
- All 787 main-text transliterations match the displayed Devanāgarī under the same transliteration routine. All 7,661 surviving row IAST fields match their displayed Devanāgarī spellings under that routine.
- No word-for-word control contains a `.wfw-map` or a `gita-dual-sridhara` block. No surviving word-for-word gloss exceeds 65 characters.
- The 16 source notes are present and visible under the Book 2 page class. Page `div`, `details`, and `article` tags are balanced.
- Book 1 was re-fetched and structurally rechecked: see [Book 1 audit](VISHNU_PURANA_BOOK_1_AUDIT.md).

## Remaining translation review

This pass does **not** make Book 2 a certified, complete one-token-per-row translation. Some remaining rows group multiple Sanskrit padas; contextual glosses and compounds still need independent grammatical and lexical review. The 7,661 row glosses and the retained English translations were not each proofread against a Sanskrit lexicon in this pass. The page notes and this log do not claim perfection.
