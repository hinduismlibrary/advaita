# Canto 2 source alignment and reader audit — 2026-10-15

## Pinned sources

The reader uses the pinned VishvAsa/Vasuki corpus at commit 100560de6c9f68c2875097d40a2012a84c784179:

- Śrīdhara Sanskrit: [gauḍīya-prastutiḥ, Canto 2](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIya-prastutiH/02).
- English verse text, transliteration, synonyms and translation: [gauḍīyo-abhaya-caraṇaḥ, Canto 2](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIyo_abhaya-charaNaH/02).
- Numbering was independently checked against [GRETIL’s Canto 2 text](https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/3_purana/bhagp/bhp_02u.htm) and [VedaBase 2.9.11](https://vedabase.io/en/library/sb/2/9/11/), [2.9.12](https://vedabase.io/en/library/sb/2/9/12/) and [2.9.13](https://vedabase.io/en/library/sb/2/9/13/). Existing chapter checkpoint logs also retain the 1949 Śrīdharī scan as a comparison witness; that scan does not replace the pinned corpus.

All ten pinned Śrīdhara source blob hashes match the chapter-complete checkpoint records. The source ranges contain 392 verse IDs, ŚB 2.1.1–2.10.51.

## Coverage and field checks

| Chapter | Source verses | Raw English blocks / IDs | WFW records / source IDs | Non-empty WFW pairs |
|---|---:|---:|---:|---:|
| 2.1 | 39 | 39 / 39 | 37 / 39 | 313 |
| 2.2 | 37 | 37 / 37 | 37 / 37 | 322 |
| 2.3 | 25 | 20 / 25 | 25 / 25 | 172 |
| 2.4 | 25 | 24 / 25 | 24 / 25 | 164 |
| 2.5 | 42 | 38 / 42 | 41 / 42 | 291 |
| 2.6 | 46 | 40 / 46 | 43 / 46 | 322 |
| 2.7 | 53 | 50 / 53 | 49 / 53 | 414 |
| 2.8 | 29 | 29 / 29 | 28 / 29 | 166 |
| 2.9 | 45 | 46 / 46 before alignment; 45 / 45 after | 44 / 45 | 215 |
| 2.10 | 51 | 47 / 51 | 45 / 51 | 237 |
| **Total** | **392** | **370 / 393 before alignment; 369 / 392 after** | **373 / 392** | **2,616** |

Across the raw English mirror blocks, IAST, synonyms and prose translation are present in 370/370. Devanāgarī is present in 369/370. The blank English-mirror Devanāgarī field at 2.8.8 is supplied by the reader override, which matches the pinned Śrīdhara source text. Chapter 2.9 is aligned in the reader before source-keyed commentary and WFW records are matched.

Each chapter’s WFW records cover every source verse ID exactly once. All 2,616 pairs have non-empty Sanskrit and English values. The dataset source blob hashes match the pinned source hashes. All ten datasets now use the full canonical source path in both the top-level metadata and every WFW row; the shortened row paths and top-level paths in chapters 2.9 and 2.10 were corrected.

## Chapter 2.9 numbering correction

The pinned Sanskrit source has 45 verses in chapter 9. Its verse 2.9.11 contains both the six pādas beginning “śyāmāvadātāḥ…” and “…parisphurat-kuṇḍala-mauli-mālinaḥ”. The English mirror places those halves under Texts 11 and 12, then labels its next stanza Text 13. The reader now combines English Texts 11–12 as source verse 2.9.11 and shifts Texts 13–46 back by one, so the displayed source range is 2.9.1–2.9.45 with no duplicate or missing ID. The former checkpoint incorrectly treated English Text 46 as a missing Sanskrit 2.9.46; that gap claim is removed.

This source alignment is confirmed by the pinned Sanskrit structure and independent text witnesses: the Sanskrit witness ends chapter 9 at verse 45 before chapter 10 begins; VedaBase’s [2.9.11](https://vedabase.io/en/library/sb/2/9/11/), [2.9.12](https://vedabase.io/en/library/sb/2/9/12/) and [2.9.13](https://vedabase.io/en/library/sb/2/9/13/) sequence also places “bhrājiṣṇubhir…” at 2.9.12, after the two English-mirror halves of 2.9.11.

## Reader, sizing and cache changes

- Canto 2’s page now uses the current shared reader sizing styles and matching exact-layout script versions used by the updated Canto 1 and Canto 10 pages.
- The Canto 2 reader now loads the source-alignment logic and a cache-busted checkpoint file.
- Chapter 9’s raw English heading split is normalized before commentary, Śrīdhara Sanskrit and WFW data are attached.
- The chapter 9 and 10 WFW JSON files now use the same full canonical source path in top-level metadata and each row, consistent with chapters 1–8.
- This audit fixes data alignment, metadata, reader assets and coverage logging. It does not newly certify the wording of every inherited English prose translation or each of the 2,616 glosses as a fresh independent lexical translation.
