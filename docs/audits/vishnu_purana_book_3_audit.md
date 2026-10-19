# Viṣṇu Purāṇa, Book 3 — audit and change log

Updated 14 October 2026 in [krishnavyasmuni/advaita](https://github.com/krishnavyasmuni/advaita).

## Scope

Reviewed all 18 chapter routes and 837 displayed verse cards. The table records the surviving main-text lexical rows after this pass.

| Chapter | Verse cards | Word-for-word rows |
|---:|---:|---:|
| 1 | 46 | 189 |
| 2 | 62 | 244 |
| 3 | 31 | 274 |
| 4 | 26 | 233 |
| 5 | 30 | 207 |
| 6 | 33 | 338 |
| 7 | 39 | 485 |
| 8 | 41 | 266 |
| 9 | 33 | 240 |
| 10 | 26 | 206 |
| 11 | 127 | 275 |
| 12 | 45 | 307 |
| 13 | 41 | 317 |
| 14 | 31 | 91 |
| 15 | 56 | 168 |
| 16 | 20 | 69 |
| 17 | 45 | 92 |
| 18 | 105 | 221 |
| **Total** | **837** | **4,222** |

## Changes made

- Regenerated the main Viṣṇu Purāṇa transliteration in all 837 cards from the displayed Devanāgarī. Speaker labels and verse numerals are omitted; Śrīdhara transliteration remains in its separate layer.
- Regenerated all 4,222 lexical-row IAST fields from the Devanāgarī displayed in the same row. This corrected stale spellings in the 3.15.11 rows, among others.
- Removed 537 Śrīdhara commentary-map sections from word-for-word controls while retaining their separate Sanskrit and commentary layers. No word-for-word control contains a Śrīdhara block or `.wfw-map`.
- Converted 71 main-text lexical maps into structured word rows and removed 16 exact duplicate rows within verses.
- Rebuilt the main transliteration details in every card. This separated nested Śrīdhara transliteration in Chapter 5 and restored balanced markup.
- Rewrote 3.11.1 as 12 aligned lexical rows: गृहस्थस्य, सदाचारम्, श्रोतुम्, इच्छामि, अहम्, मुने, लोकात् अस्मात्, परस्मात् च, यम्, आतिष्ठन्, न, हीयते.
- Corrected displayed Sanskrit and linked lexical readings at 3.15.11, 3.15.43, 3.17.4, 3.18.92, 3.18.94, 3.18.101, and 3.18.105 (details below).
- Added the `vp-book-3` page class, visible edition notes, a shared 840px reader width, 15.5px/1.55 desktop lexical rows, 13.5px/1.48 mobile lexical rows, and matching source-note sizing. Updated the reader stylesheet cache version to `20261014-vp-book3-audit-1`.

## Sanskrit and source checks

- **3.15.11:** restored भोजयित्वा and मज्जयत्य्; corrected व्यवायी. The critical text reads `śrāddhe niyukto bhuktvā vā bhojayitvā niyujya ca / vyavāyī retaso garte majjayaty ātmanaḥ pitṝn`.
- **3.15.43:** corrected मातामहांस् and पूजयित्वा.
- **3.17.4:** corrected the lexical IAST to `nagnaḥ` to match the displayed नग्नः, and removed stray bracket markup. The third pāda is retained as an insertion recorded after 3.17.4 in the critical edition.
- **3.18.92:** restored पालयित्वा. The page follows the pinned mūla reading भुक्त्वा (`bhuktvā`); Pathak’s critical text has कृत्वा (`kṛtvā`), recorded as a variant.
- **3.18.94:** restored कामदुहोऽक्षयान् and aligned the lexical/transliteration text to `aindrān atītya vai lokān lokān kāmaduho 'kṣayān`.
- **3.18.101:** corrected पाषण्डिनो, बैडाल-व्रतिकाञ् छठान्, and बक-वृत्तींश्.
- **3.18.105:** corrected जटाधरण-मौण्ड्यवतां and संभाषणाद्.
- The page includes an additional stanza after 3.18.99. Consequently its verse IDs 3.18.101–105 correspond to Pathak’s 3.18.100–104; this numbering difference is stated in the chapter note.

Page edition notes identify the pinned VishvAsa/Vasuki witnesses used for each chapter. Chapters 1–10 use the pinned mūla commit `4f878940be057c6efcc644dc688b604e0b2e64a1`; chapters 11–18 use `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. The numbered Sanskrit witnesses and local variant decisions are recorded on the individual pages.

Additional cross-checks: [GRETIL, Viṣṇu Purāṇa critical edition (M. M. Pathak, 1997–1999)](https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/3_purana/vipce_pu.htm), including 3.15.11, 3.15.43, 3.17.4, and 3.18.89–104; [pinned Book 3 mūla, Chapter 15](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/03/15.md); [Chapter 17](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/03/17.md); [Chapter 18](https://github.com/vishvAsa/purANam_vaiShNavam/blob/fc117aa4514dfd4e4840037aeb3ca825ba030b05/viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/03/18.md).

## Verification

- All 18 routes have balanced `div`, `details`, and `article` tags.
- All 837 cards have displayed Sanskrit, an English translation, a nonempty word-for-word control, a main transliteration, and a commentary or explicit no-commentary status.
- All 837 main transliterations and all 4,222 row IAST fields match their displayed Devanāgarī under the same mechanical transliteration routine.
- No word-for-word control contains a `.wfw-map` or a `gita-dual-sridhara` block.
- All 18 pages carry the Book 3 class, the cache-busted stylesheet, and an edition note linking this log.

## Translation review limit

This pass fixes source-text, transliteration, IAST, panel-separation, and layout defects. It does not certify a complete strict one-token-per-row translation. Existing phrase groupings remain, 301 gloss fields are longer than 65 characters, and the English gloss meanings and prose translations were not each independently checked against a Sanskrit lexicon. No claim of perfect or fully lexicon-verified translation is made.