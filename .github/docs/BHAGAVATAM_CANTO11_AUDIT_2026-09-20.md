# Śrīmad-Bhāgavatam Canto 11 — evidence-based audit

**Date:** 2026-09-20  
**Repository:** `krishnavyasmuni/vivekadrishti`, `main`  
**Pinned Sanskrit witness:** [`vishvAsa/purANam_vaiShNavam`, commit `100560de6c9f68c2875097d40a2012a84c784179`](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIya-prastutiH/11)  
**Requirement:** [`BHAGAVATAM_COMPLETION.md`](BHAGAVATAM_COMPLETION.md)

## Scope and conclusion

This is a **chapter-by-chapter first-record and architecture audit**, supplemented by direct Sanskrit source comparisons for 11.12, 11.22, and 11.31 and further record sampling in 11.20, 11.21, and 11.23. I located and inspected the beginning of the respective Canto 11 word-for-word JSON for each of all 31 chapters, inspected the README, manifest, both rendering scripts, and the Canto 11 HTML shell. This **does not constitute a line-by-line collation of all verses**, an independent verification of every English sentence, a browser-rendering test, or proof of who originally authored the English. The declared `complete` / `live-verified` labels cannot be used to fill those evidentiary gaps.

**Finding:** Canto 11 cannot currently be certified as fully independently translated word-for-word. All 31 chapter paths have linked source and local data records, but the opening entries in chapters 21–31 show obviously incomplete word/phrase glossing and/or reusable chapter summaries, Chapter 12's local Sanskrit field includes text separately attributed to Sanātana Gosvāmī, and 11.11.1 mistranslates an introductory reference to the *eleventh chapter* as the *eleventh canto*. The main reader's Bhāgavatam synonyms and English are from the pinned VedaBase mirror; a separate clarity script adds Canto 11's local Śrīdhara word meanings. This distinction must not be conflated.

## Actual rendering path

1. [`assets/js/bhagavatam-sridhara-reader.js`](../../assets/js/bhagavatam-sridhara-reader.js) obtains the main verse Devanāgarī, transliteration, English and synonyms from the VedaBase English mirror; it separately parses Śrīdhara Sanskrit from the pinned ViśvAsa Markdown. It retrieves [`assets/data/bhagavatam-sridhara-english-checkpoints.json`](../../assets/data/bhagavatam-sridhara-english-checkpoints.json) for English commentary.
2. **Correction to an initial inspection:** [`assets/js/bhagavatam-sridhara-clarity.js`](../../assets/js/bhagavatam-sridhara-clarity.js) DOES load the Canto 11 local WFW JSON files and inserts a separate Śrīdhara section into the word-for-word panel. Its `ensureCommentary` adds local `literal_english` only if there is not already a commentary panel; an existing checkpoint translation therefore takes precedence. The poor local WFW entries are not merely unused artifacts.
3. [`articles/srimad-bhagavatam-canto-11-sridhara-svami/index.html`](../../articles/srimad-bhagavatam-canto-11-sridhara-svami/index.html) includes both scripts. Its visible source note still says Chapter 2 commentary glosses only cover 1–34, although the clarity script now lists a 35–55 data file: the note is stale.
4. The displayed **main verse** Devanāgarī is taken from the English mirror, not extracted from the pinned ViśvAsa main verse. A comparison with the pinned witness is therefore still necessary; this statement is about provenance, **not** a finding of textual divergence in every verse.

## Chapter-by-chapter first-record audit

Here **sample needs full check** means the inspected record provides no sufficient evidence to certify *all* verses, even where it contains detailed independent-looking work. **Opening record fails** means a concrete defect is visible in the sampled first record; later entries need checking too. Source paths and blob SHAs in local metadata are claims until separately compared with the pinned repository.

| Chapter | Inspected local data | Finding / remaining verification |
|---|---|---|
| 11.1 | `assets/data/bhagavatam-sridhara-wfw-canto11-ch01-reviewed.json` and `...ch01-verses11-24.json` | Opening passage and 11.1.11 contain substantial phrase-by-phrase glosses. Split files cover declared ranges; all entries/source boundaries not collated. Source lacks a separate Śrīdhara gloss at 11.1.20. **Sample needs full check.** |
| 11.2 | `...ch02-verses01-10.json` and `...ch02-verses35-55.json` | First file explicitly says it is a *partial checkpoint*, not the whole chapter; other segment files exist and the later sample has substantial glosses. Do not treat that note as proof later segments are absent. Full 1–55 union, attribution and accuracy not audited. **Sample needs full check.** |
| 11.3 | `...ch03-verses01-55.json` | 11.3.1 contains several specific Sanskrit/English phrase matches, unlike the late template entries. **Sample needs full check.** |
| 11.4 | `...ch04-verses01-23.json` | 11.4.1 has specific glosses; declared no separate commentary at 11.4.23. **Sample needs full check.** |
| 11.5 | `...ch05-verses01-52.json` | 11.5.1 has specific glosses; documented grouped and no-commentary markers require exact handling. **Sample needs full check.** |
| 11.6 | `...ch06-verses01-50.json` | 11.6.1 contains specific glosses; numerous reported no-commentary and merged ranges require checking. **Sample needs full check.** |
| 11.7 | `...ch07-verses01-74.json` | 11.7.1 contains specific glosses; merged and no-commentary ranges claimed, not independently reconciled. **Sample needs full check.** |
| 11.8 | `...ch08-verses01-44.json` | 11.8.1 contains specific glosses; grouped source ranges claimed. **Sample needs full check.** |
| 11.9 | `...ch09-verses01-33.json` | 11.9.1 contains specific glosses; grouped source range claimed. **Sample needs full check.** |
| 11.10 | `...ch10-verses01-37.json` | 11.10.1 contains specific glosses; grouped source range claimed. **Sample needs full check.** |
| 11.11 | `...ch11-verses01-49.json` | **Opening record fails translation accuracy/completeness:** its English starts 'The eleventh canto teaches...' for Sanskrit `एकादशे तु ...` introducing the eleventh *chapter*, and five gloss pairs cannot cover its long opening commentary. |
| 11.12 | `...ch12-verses01-24.json` | **Opening record fails attribution:** the local `sanskrit` field for 11.12.1–2 continues into separately labelled `सनातन-गोस्वामी` material. The pinned Sanskrit source places that text after Śrīdhara's text. The live parser appears designed to stop at this other author's label, but the local data still misattributes the passage. |
| 11.13 | `...ch13-verses01-42.json` | 11.13.1 has a long explanatory passage and initial glosses. Complete phrase coverage not established. **Sample needs full check.** |
| 11.14 | `...ch14-verses01-46.json` | 11.14.1 has commentary and initial glosses; all word/clause coverage not established. **Sample needs full check.** |
| 11.15 | `...ch15-verses01-36.json` | 11.15.1 has commentary and glosses; a Markdown footnote is interleaved within its opening Sanskrit stanza and should be separated from continuous commentary before exact-text and translation checks. **Sample needs full check.** |
| 11.16 | `...ch16-verses01-44.json` | 11.16.1 contains unusually long introductory commentary. Initial glosses do not establish full passage coverage; check all words and joint attribution. **Sample needs full check.** |
| 11.17 | `...ch17-verses01-58.json` | 11.17.1–2 is grouped in source; commentary and initial glosses appear, but whole-range phrase coverage and no-commentary markers need checking. **Sample needs full check.** |
| 11.18 | `...ch18-verses01-48.json` | 11.18.1 has commentary and glosses; source is reported not to explain 11.18.23. **Sample needs full check.** |
| 11.19 | `...ch19-verses01-45.json` | 11.19.1 has extensive commentary and only initial glosses in examined portion. Full coverage and merged markers unverified. **Sample needs full check.** |
| 11.20 | `...ch20-verses01-37.json` | **Opening record fails completeness:** the long 11.20.1–2 Sanskrit receives only three gloss pairs and a one-sentence chapter-level English summary. 11.20.3–4 likewise contain long Sanskrit with only three glosses each and compressed English. |
| 11.21 | `...ch21-verses01-43.json` | **Opening record fails:** lengthy commentary gets a handful of generic glosses; verses 1 and 2 reuse the same generalized English paragraph despite different Sanskrit. |
| 11.22 | `...ch22-verses01-61.json` | **Opening record fails:** 11.22.1–2's long commentary gets only `तत्त्व — principle`; 11.22.1–3 share a generalized English paragraph. Direct source sample confirms the initial Sanskrit passage and stated source blob. |
| 11.23 | `...ch23-verses01-62.json` | **Opening record fails:** 11.23.1 has a long commentary with a few generic glosses. For 11.23.2, `सुख-दुःख` and `धृति` appear in glosses even though not in that Śrīdhara Sanskrit passage; its summary is reused. |
| 11.24 | `...ch24-verses01-29.json` | **Opening record fails:** 11.24.1 has substantial commentary but only a few theme-word glosses. |
| 11.25 | `...ch25-verses01-36.json` | **Opening record fails:** 11.25.1 contains lengthy commentary with a few theme-word glosses. |
| 11.26 | `...ch26-verses01-35.json` | **Opening record fails:** 11.26.1 commentary receives a few abstract glossary words, not continuous word-for-word coverage. |
| 11.27 | `...ch27-verses01-55.json` | **Opening record fails:** the 11.27.1 commentary is much longer than the generic glosses attached. |
| 11.28 | `...ch28-verses01-44.json` | **Opening record fails:** 11.28.1's commentary receives only `ज्ञान — knowledge` in its word-for-word list. The local `main_sanskrit` also includes a *Madhvācārya*-attributed passage, so never treat that field indiscriminately as only main verse. |
| 11.29 | `...ch29-verses01-49.json` | **Opening record fails:** 11.29.1's commentary receives only `भक्ति — devotion` and a generalized chapter summary. |
| 11.30 | `...ch30-verses01-50.json` | **Opening record fails:** 11.30.1 has multiple commentary stanzas but only thematic `कुल`/`धाम` glosses. |
| 11.31 | `...ch31-verses01-28.json` | **Opening record fails:** 11.31.1's long commentary receives only `धाम — abode` and a general chapter summary. The 11.31.2 glosses include unrelated `धाम`/`अवतार`/`भक्ति` while the actual commentary is a short explanation of `द्विजाः`. Direct source sample agrees in its opening Sanskrit and blob SHA. |

All abbreviated chapter file names above have prefix `assets/data/bhagavatam-sridhara-wfw-canto11-`. The exact, full file paths are listed in `assets/js/bhagavatam-sridhara-clarity.js`. No row claiming a defect in an **opening record** should be read as a claim that every subsequent record was inspected.

## Independently drafted miniature correction, **not yet applied to the site**

For the pinned source's Śrīdhara commentary on **11.31.2**:

> द्विजा गरुड-लोक-निवासिनः पक्षिणः । मैत्रेयादयो वा ॥२॥

My new phrase glosses, drafted from that Sanskrit: **द्विजाः** — the twice-born; **गरुड-लोक-निवासिनः** — inhabitants of Garuḍa's realm; **पक्षिणः** — birds; **मैत्रेय-आदयः** — Maitreya and others; **वा** — or. A close English rendering: *“‘Twice-born’ means birds dwelling in Garuḍa's realm, or alternatively Maitreya and others.”* The term `द्विजाः` can have either meaning in this explanation. This example is **not** a claim to have retranslated all of Chapter 31.

## Release-gate repairs needed

- Reconcile every numbered verse and every grouped/absent Śrīdhara range against the **pinned**, not moving, ViśvAsa source; record the true source blob SHA per chapter and investigate any discrepancies. Do not flatten other authors' text into Śrīdhara or append Markdown footnotes to commentary prose.
- Independently draft and verify the main-verse word-for-word material **distinct from VedaBase reference synonyms**, plus exhaustive Śrīdhara word/phrase glosses and faithful sentence-by-sentence English. Keep reference material explicitly credited. Sanskrit-to-English originality cannot be established from a JSON `editorial_note` alone.
- Fix the specific Chapter 11 translation error and Chapter 12 attribution error; replace the deficient 11.20 and 11.21–11.31 opening records and audit their remaining records. Verify Chapter 2's union of segment files rather than treating a single file's 'partial' note as a missing chapter.
- Verify which English commentary is actually displayed: main reader's checkpoint file wins over `literal_english` already present when a commentary panel exists. Verify the actual emitted DOM for each chapter, including the two word-for-word sections, on mobile and desktop.
- Until **all** these checks pass, mark Canto 11 as **audit failed / not fully verified**, not complete, in the canonical completion ledger and public publication claims. Fix the stale Chapter 2 source note in the Canto 11 HTML shell after verifying its true coverage.

**Site content changed in this audit:** none. This file records findings only. The full 31-chapter Sanskrit collation, exhaustive retranslation, and browser test have **not** been performed or certified.
