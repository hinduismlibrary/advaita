# Viṣṇu Purāṇa full-corpus audit — 2026-09-22

Full-corpus baseline commit: `c8ca1aab6e791010c41287c5738d3989d522811a` (2026-09-22); chapter-level delta added below.

Scope: all 126 Viṣṇu Purāṇa chapter routes on `main`, using the cited Vishvas/Vasuki source paths recorded in each route. All inspection and writes were performed through the remote GitHub workspace; nothing was run locally or in a local browser.

## What passed structurally

- 126 chapter routes were present.
- 6,400 verse articles were present after restoring six omitted Book 4 articles: 4.6.8, 4.6.30, 4.6.50, 4.7.5, 4.8.17, and 4.19.18.
- Verse IDs were contiguous and unique across all routes after those restorations.
- Every article had a Sanskrit block, a main translation block, and a Transliteration control.
- No `source range` labels remained.
- No leading ellipsis/marker scaffolding remained in the verse articles.
- No legacy WFW row retained a copied ordinary translation tail. The VP WFW markup was standardized to the verified one-mapping-per-line layout.
- No embedded three-digit source-footnote numerals remained in the audited lexical/source fields.
- The restored six articles contain source-backed Sanskrit, transliteration, direct lexical rows, and the correct no-commentary or Śrīdhara state.

## Word-for-word status

The requirement is not complete.

Following the verified Book 6 Chapter 8 release, 3,565 of 6,400 articles have a main-text lexical layer; 2,835 remain missing:

| Book | Articles | Main lexical WFW present | Still missing |
|---|---:|---:|---:|
| 1 | 1,407 | 1,198 | 209 |
| 2 | 787 | 710 | 77 |
| 3 | 837 | 837 | 0 |
| 4 | 1,354 | 61 | 1,293 |
| 5 | 1,517 | 695 | 822 |
| 6 | 498 | 64 | 434 |

Books 1–2 contain some WFW controls with Śrīdhara material; those are not automatically counted as complete main-text WFW. Books 4–6 still need genuine Sanskrit-first reconstruction beyond the chapters already rebuilt; the current reverse-order pass has now rebuilt Book 6 Chapter 8 (64/64 main lexical layers), alongside the previously rebuilt Book 5 chapters. A control’s presence is not being counted as semantic completion.

## Śrīdhara and control status

After replacing Book 6 Chapter 8's previous 24 Śrīdhara controls and 41 no-commentary states with 31 source-mapped Śrīdhara controls and 33 exact no-commentary states, the repository contains 3,577 articles with a Śrīdhara Sanskrit control and 3,140 explicit `No commentary.` states. The structural control check confirms that the published Transliteration controls are present, but it does not prove that every IAST string or every Śrīdhara translation is semantically correct.

## Required next work

Rebuild the missing main WFW one complete chapter at a time from the exact displayed Sanskrit, with every phrase mapped directly, then independently check the corresponding Śrīdhara Sanskrit and English. Do not mark a chapter complete merely because its route or button exists. Do not replace missing lexical work with the ordinary translation, a placeholder, or a generated paragraph.

This audit therefore records the site as structurally repaired in the areas above but semantically incomplete for the remaining 2,835 main WFW articles. Chapter-by-chapter lexical rebuilding remains open.


## Incremental reverse-order chapter audit — 2026-09-23

Book 6 Chapter 8 has been rebuilt from its final verse backwards and published as a complete chapter. The dynamic Contents page already generates all eight Book 6 chapter links, including this route, so no Contents-file change was needed.

- 64/64 contiguous verse articles, Sanskrit blocks, English translations, Word-for-word controls, and Transliteration controls.
- 832 main-text lexical mappings and 113 Śrīdhara lexical mappings; each entry pairs Sanskrit, IAST, and a concise gloss.
- 31 source-mapped Śrīdhara Sanskrit/commentary blocks and 33 exact `No commentary.` states.
- Main IAST and supplied Śrīdhara IAST were checked against their displayed Devanāgarī; the verse 6.8.15 spelling and lexical gloss were corrected to `पुंसां (puṃsām)`.
- No placeholder word-for-word messages, ellipses, displayed source-range labels, missing verse IDs, or unbalanced HTML remain in this chapter.

This is an incremental chapter audit, not a claim that the rest of the 6,400-verse corpus is complete. The next reverse-order target is Book 6 Chapter 7, beginning with its source's final verse, 6.7.106.


## User-directed Book 1 completion pass — 2026-09-24

A direct current-branch audit finds 761/1,407 Book 1 verses with an explicit main-text word-for-word section before this pass. The earlier 1,198 figure counted visible controls, including pending panels and Śrīdhara-only material; it is not a verified main-text lexical count. This correction leaves 646 Book 1 verses requiring main-text mapping.

### Book 1, Chapter 18

- 43/43 contiguous verse articles have a main-text lexical map, with Sanskrit and IAST panels and source/commentary content retained.
- Added 43 Chapter 9-style word-for-word sections using the paired-script row layout and matching control sizes.
- Corrected 1.18.3 from `प्रविज्ञातम् (pravijñātam)` to source-backed `अविज्ञातम् (avijñātam)`; the pinned mūla and numbered witness agree.
- Source witness: `vishvAsa/purANam_vaiShNavam` content commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`; mūla `viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/01/18.md`, blob `4247989218affbd077c77bf960a0b09e3295da1d`; numbered witness `viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/01/18.md`, blob `8777450e4dba39b5e270b7d3d32cdef8de92f5bd`.
- Book 1 status after this release: 804/1,407 main-text maps complete; 603 remain.


Chapter 18 lexical refinement after read-back: 1.18.33 now separates `hṛdi āste` from `hariḥ īśvaraḥ`; 1.18.38's contextual phrase gloss is clarified as `I do not regard them as evil`.


## User-directed Books 1–2 re-audit and Chapter 21 release — 2026-09-24

Pre-release branch audited: `e53270cb5ef7bb4eafc65a3898fdb49683b7ec54`.

The Chapter 9 fonts and exact pill-control stylesheet are linked from all 38 Book 1–2 pages. Current focused panel-presence counts after the Chapter 21 release:

| Book | Verse articles | Main-text panel marker | No main-text panel marker |
|---|---:|---:|---:|
| 1 | 1,407 | 943 | 464 |
| 2 | 787 | 710 | 77 |

These counts identify panel presence only. Other chapters still require verse-by-verse semantic review; some existing panels may contain commentary or running translation instead of lexical mappings. Book 1, Chapters 20 and 19 add 39 and 86 completed panels, respectively, to the pre-release total.

| Book | Chapter | Verses without a main-text panel |
|---|---:|---:|
| 1 | 11 | 57 |
| 1 | 12 | 95 |
| 1 | 13 | 94 |
| 1 | 14 | 48 |
| 1 | 15 | 154 |
| 1 | 16 | 16 |
| 2 | 1 | 8 |
| 2 | 4 | 5 |
| 2 | 7 | 2 |
| 2 | 8 | 32 |
| 2 | 13 | 30 |

### Book 1, Chapter 21

- 41/41 contiguous verse articles have a main-text lexical map in paired Devanāgarī/IAST rows: 476 mappings, each with a concise gloss.
- Main-text IAST was checked against the displayed Sanskrit; all word-row pairs were checked for script/transliteration agreement. All 41 Word-for-word controls are present, with no pending messages or empty lists.
- The previously missing panels for 1.21.1–14 are complete. Existing main-text maps for 1.21.15–41 were reviewed and rebuilt in Sanskrit order. Commentary and no-commentary controls were retained.
- Sources pinned at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla `viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/01/21.md` (blob `18c1791300db9d2cdcd2b542fb99e997f723a168`); numbered witness `viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/01/21.md` (blob `dea16ef42693026bc6c28a96a4271c7aa4f13caa`); Śrīdhara `viShNu-purANam/shrIdhara-viShNu-chittau/1/21_prahlAda-vaMsha-kathanam.md` (blob `f3306d685d30f0223e97f5e1e03e751e4600e6ae`); English cross-check `viShNu-purANam/viShNu-chitta-TIkA/en/01/21.md` (blob `5dc0209c0e5cb46981bd50e4542800a49ad4ddf4`).
- The page note records these textual decisions: 1.21.1 uses witness `saṃhlāda-putra` against mūla `prahlāda-putra`; 1.21.2, .3, .5, .7, and .11 retain selected mūla readings; 1.21.9 and .12 correct apparent mūla transcription errors with witness support; 1.21.13 retains mūla `vivardhana`; 1.21.15 adopts witness `sattva`; 1.21.24 adopts witness `vallī/tṛṇa`; 1.21.29 retains `putratve` against `pitṛtve`; 1.21.35 adopts `taṃ`; and 1.21.40 adopts `cakre` while retaining mūla `adri`.

### Book 1, Chapter 20

- 39/39 contiguous verse articles now have full source-backed Sanskrit, English translations, word-for-word maps, and main transliteration.
- The Chapter 9 reader layout is used for every WFW panel: 464 rows pair a Devanāgarī form, its IAST transliteration, and a concise gloss.
- Restored incomplete main text in 1.20.18–20, .23–24, .28, and .34; corrected other source-level mismatches including 1.20.1, .4, .6–7, .9–16, .20, .22–24, .30, .32, .38–39.
- 1.20.24's English was corrected to say that Prahlāda asks for his father to be freed from the sin of hating him as a devotee of Viṣṇu.
- Mūla blob 933bca3c6c89434e5c6da197bfec80440b2ac9b8, numbered witness 3190a2277be02951fad524c96c7a1982e4db70ca, Śrīdhara commentary ac332a7076db4d0ebb1d965a209a7b9802ba0f80, and English cross-check 75120bef826851429fff57461d6f912139b2fde9 are pinned at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05.
- The page note records witness-supported readings including 1.20.4 calaty uragabandhais taiḥ, .7 ātmani, .16 pāvaya, .24 mucyeta, and .30 jīvasi; mūla readings retained include .9 paramārthāya, .13 prakaṭo’prakāśaḥ, and .23 baddhvā.

### Book 1, Chapter 19

- 86/86 contiguous articles have a reviewed word-for-word panel, with 1,022 paired Sanskrit/IAST/gloss rows.
- Main Sanskrit and IAST were corrected for clear source transcription errors, including the missing fire element in 1.19.68; all 86 translations remain present.
- The source note pins mūla bc63e2448277dcc0790db2f445b7b3d18eb4404f, numbered witness 51c727faa692da6cc6764c87eb299085e506f7c0, Śrīdhara commentary 8799fe7c8745d6b135b25db5924bb2a845fd4ad1, and English cross-check 96fc014cd636f8f28591cb50334e9cfd05cdab76 at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05.
- Book 1 focused panel markers now total 943/1,407; 464 remain. Book 2 remains 710/787 with 77 remaining. These are panel-presence counts and do not certify chapters whose existing panels have not been semantically reviewed.

Book 1–2 semantic completion remains open. The panel gaps above and the other present-but-unreviewed panels must still be checked chapter by chapter.


## User-directed Books 1–2 focus — Chapter 16 release — 2026-09-24

Book 1 Chapter 16 is complete and read back on `main`. The 16 contiguous verse articles now each contain a source-checked Sanskrit text, full English translation, Chapter 9-style paired Devanāgarī/IAST word-for-word rows, and a matching IAST control. The chapter has 201 lexical rows and no placeholder panels. Existing Śrīdhara contextual material was retained.

The Sanskrit note pins the mūla text, numbered witness, Śrīdhara Sanskrit and commentary, and English cross-check at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Material choices include mūla `dantabhāgaiḥ ... nipīḍitaḥ` at 1.16.8 against the numbered/Śrīdhara `dantabhūmim ... nirūpitaḥ`; mūla `ghoraṃ` at .10 against witness `aho`; witness-supported `kaḥ samarthaḥ` at .12; and mūla `vipakṣe cāpi` at .15 against witness `vipakṣā api`. The page records the remaining source-supported corrections.

Structural panel status at the Chapter 16 release: Book 1 had 959/1,407 markers (448 without a marker); Book 2 had 710/787 (77 without a marker). Book 1’s gaps then were Chapters 11–15: 57, 95, 94, 48, and 154 verses. Book 2’s gaps were Chapters 1, 4, 7, 8, and 13: 8, 5, 2, 32, and 30. Existing panels outside the reviewed chapters still need semantic audit.


## User-directed Books 1–2 focus — Chapter 15 release — 2026-09-25

- Book 1 Chapter 15 is complete on `main`: 156/156 verse articles, 1,786 paired Devanāgarī/IAST/gloss rows, 156 word-for-word controls, 156 translation paragraphs, and 156 transliteration controls. Chapter 9’s existing `gita-details`, `gita-word-list`, and `gita-word-row` presentation is used. Both legacy partial main-text maps are rebuilt; all 102 pre-existing Śrīdhara panels are retained.
- The route-local verse labels include the separate qualities list at 1.15.65; local labels from 1.15.66 run one higher than the mūla edition. Rows map to the Sanskrit in the displayed article. Local 1.15.74 follows numbered-witness `daśabhyas` against mūla `daśamyas`.
- Source blobs are pinned at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla `39f12c475cf82e3363bcfaec28726f99a714e1fb`, numbered witness `a067d93fe25621fadffd7b3426e051c9b3b34746`, Śrīdhara text `e6eaf7dd0be0805a1294aa58041e7be83b3746be`, commentary `aa4555e1360e35a41a728ed89a8291938407fa27`, and English cross-check `23c8812f1479e5a043713c0c609835c884b8603d`. The page records the source variants and corrections, including local .72 patnī, .73 Mārīṣām, .74 daśabhyas, .98 bhrātṛṇām, .123 Rudra counts, and .154 matimān amatsarī.
- At the Chapter 15 release, focused Book 1 markers totaled 1,113/1,407 (294 gaps); Book 2 remained 710/787 (77 gaps). Book 1’s remaining marker gaps were Chapters 11–14 (57, 95, 94, and 48). Book 2’s gaps were Chapters 1, 4, 7, 8, and 13 (8, 5, 2, 32, and 30). Present panels on other chapters remained unaudited.


## User-directed Books 1–2 focus — Chapter 14 release — 2026-09-25

- Book 1 Chapter 14 is complete on `main`: 49/49 verse articles, 524 paired Devanāgarī/IAST/gloss rows, 49 word-for-word controls, 49 translation paragraphs, and 49 transliteration controls. The Chapter 9 `gita-details`, `gita-word-list`, and `gita-word-row` controls are used. Forty-eight main-text markers were added; the one legacy partial main panel at 1.14.26 was rebuilt. All 30 existing Śrīdhara word-for-word panels were preserved.
- The page pins mūla `b70ca85ceaf9772668984598bc271f6ddb6dd36b`, numbered witness `a8545db2876fd82a27eeec2a3b143f4476f89952`, Śrīdhara text `d27c4b41afa15ee48cdb2994d0a89edb073cd1c2`, commentary `3beda04bc7be41e7675d8e4290e197c426f3249c`, and English cross-check `5bbe3aea66167c13420b817c79061fe4d515c697`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. The page source note records mūla readings at local .4 `vistṛtā`, .5 `tamasaḥ`, .10 `tat`, and .47 `vriyatām īpsito`; it also records corrections at .26 `bhujyate`, .30 `mukhaṃ`, and .32 `anantamūrtimān ca śuddhaḥ`, while documenting the .26 `jīvabhūtaḥ` witness variant.
- Focused Book 1 marker count is now 1,161/1,407 (246 gaps); Book 2 remains 710/787 (77 gaps). Remaining Book 1 marker gaps are Chapters 11–13 (57, 95, and 94). Book 2 gaps are Chapters 1, 4, 7, 8, and 13 (8, 5, 2, 32, and 30). Panels on other chapters still need semantic audit.

## User-directed Books 1–2 re-audit — Chapter 13 release — 2026-09-25

- Book 1 Chapter 13 is complete on `main`: 95/95 verse articles, 1,130 paired Devanāgarī/IAST/gloss rows, 95 word-for-word controls, 95 translation paragraphs, and 95 transliteration controls whose main IAST represents the displayed Sanskrit, including speaker labels. The Chapter 9 `gita-details`, `gita-word-list`, and `gita-word-row` controls are used.
- Ninety-four main-text panels were added; the legacy partial main panel at 1.13.38 was rebuilt. All 40 existing Śrīdhara word-for-word panels were preserved. The English translations, commentary, and no-commentary states remained in place; main IAST was regenerated from the displayed Sanskrit, while supplied Śrīdhara transliterations were preserved.
- The page pins mūla `216b675eb4704fd9ef1157a7c411873540f5f701`, numbered witness `39c4bfbeb08d0479d2e22f5ae15b2228fe14a95d`, Śrīdhara text `1915e0a47b2cdd8d1d63c5f9418cef043e2ea4db`, commentary `f932a96c9e4e62f94554216e4c3b5b137e28fcd4`, and English reference `ce67ff9dae71965186de9567807d96c220087201`, all from upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections and the .35 witness variant are recorded in the route's source note; local .82 preserves `vivardhitāḥ` and records the distinct Śrīdhara and Viṣṇucitta explanations.
- Book 1 focused panel markers after this release: 1,255/1,407 (152 gaps); Chapters 11 and 12 account for the remaining 57 and 95 markers. Book 2 remains at 710/787 (77 gaps in Chapters 1, 4, 7, 8, and 13). Existing panels outside the reviewed chapters still need semantic audit.

This release completes Chapter 13 only; it does not mark the rest of Books 1–2 complete.


## User-directed Books 1–2 focus — Chapter 12 release — 2026-09-25

- Book 1 Chapter 12 is complete on `main`: 103/103 verse articles, 1,127 paired Devanāgarī/IAST/contextual-gloss rows, 103 Word-for-word controls, 103 translation paragraphs, and 103 transliteration controls. Main IAST matches the displayed Sanskrit, including speaker labels. The Chapter 9 `gita-details`, `gita-word-list`, and `gita-word-row` layout and shared 12px/4px × 10px button rule are used.
- Ninety-five main-text panels were added; all eight pre-existing partial main maps were rebuilt. All 51 existing Śrīdhara Word-for-word panels were preserved, including nine Śrīdhara legacy maps. All 59 commentary panels and 44 no-commentary states remain accounted for.
- The page pins mūla `1dd25be195442a479c767095ef6f633dad78a193`, numbered witness `bf008fc3238907d9f08f6ab96f4725cc35c5e63d`, Śrīdhara text `eb3062a4dfb9f98ebd822f334fcb7a6ee8c7a475`, commentary `a3662e00f307c22a82ece6dc30d1f71602876704`, and English reference `0855626556bb082b4005e43e0d2b4af0b32566b4`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. The page restores mūla/numbered 1.12.19 omitted by Śrīdhara, renumbers matprīti and the maternal warning to .20 and .21, and records the .21 `api/iha` variant, .13/.15 variants, the .20 `mā mohaṃ nivartyāsmāt` normalization, and corrections at .43/.102.
- Book 1 focused markers after this release: 1,350/1,407 (57 gaps, all at 1.11). Book 2 remains 710/787 (77 gaps in Chapters 1, 4, 7, 8, and 13). Panels on other chapters still need semantic review.

This release completes Chapter 12 only; it does not mark the rest of Books 1–2 complete.

## User-directed Books 1–2 focus — Chapter 11 release — 2026-09-25

- Book 1 Chapter 11 is complete on `main`: 57/57 verse articles have main-text Word-for-word panels, 686 paired Devanāgarī/IAST/contextual-gloss rows, 57 Word-for-word controls, 57 translation paragraphs, and 57 transliteration controls. Main IAST matches the displayed Sanskrit, including speaker labels. The Chapter 9 layout and shared 12px/4px × 10px button rule are used.
- Twenty-six Word-for-word controls were added; the 31 existing controls were augmented with main-text rows. All 31 Śrīdhara panels and their legacy maps were preserved. All 34 commentary panels and 23 no-commentary states remain accounted for.
- The page pins mūla `99cb7be5e8dc29fab3278efeaca476240e9d6d6a`, numbered witness `8655f9fb2808772efcb6be144f8b8eac0d34023f`, Śrīdhara text `693f2667d21b0284083db6033b85b819bdac0066`, commentary `43b9789f2e5ca9cd43b8c36edf2e44d83f32aa2b`, and English reference `de1c6fc6aef2ca07fcd9ec38923b4466c4d66eeb`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections and the .19/.32/.48 textual variants are recorded in the route’s source note.
- Book 1 focused marker count after this release: 1,407/1,407. Book 2 remains 710/787, with 77 gaps in Chapters 1, 4, 7, 8, and 13. Existing panels in other Book 1 chapters still need semantic review.

This release completes Chapter 11 only; it does not mark the rest of Books 1–2 complete.

## User-directed Books 1–2 focus — Book 2, Chapter 1 release — 2026-09-25

- Book 2 Chapter 1 is complete on `main`: 43/43 verse articles now have main-text Word-for-word panels, 480 paired Devanāgarī/IAST/contextual-gloss rows, 43 Word-for-word controls, 43 translation paragraphs, and 43 transliteration controls. Main IAST matches the displayed Sanskrit. The Chapter 9 layout and shared 12px/4px × 10px button rule are used.
- Eight controls were added and 35 existing controls were augmented with complete rows. All 49 legacy maps and Śrīdhara notes were retained. All 43 commentary sections remain accounted for, including eight “No commentary” notices.
- The page pins mūla `35e04e5d71462f8e5449e4a734c638bfb95ba174`, numbered witness `8d338951fb5c5c80c5d50d277875a43e544f2ac0`, Śrīdhara source `444145de015c5746d9bf8bc31f88fbe191ce0be1`, and English reference `3da244428968d26b15dfc92ec323176cfd810b73`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections and the .10/.37 variants are recorded in the route source note.
- Book 1 focused markers remain 1,407/1,407, with older panels still under semantic review. Book 2 focused markers now total 718/787 (69 gaps in Chapters 4, 7, 8, and 13).

This release completes Book 2 Chapter 1 only; it does not mark the rest of Books 1–2 complete.

## User-directed Books 1–2 focus — Book 2, Chapter 4 release — 2026-09-25

- Book 2 Chapter 4 is complete on `main`: 97/97 articles have main-text Word-for-word lists and 1,040 paired Devanāgarī/IAST/contextual-gloss rows. All 97 English translation paragraphs and all 97 transliteration controls remain present; main IAST was regenerated from the displayed Sanskrit, including the Parāśara speaker cue in verse 1.
- Five Word-for-word controls were added and 92 existing controls were expanded. The page retains all 132 existing `.wfw-map` blocks byte-for-byte and all 97 commentary-state panels, including 16 “No commentary” notices. It uses the Chapter 9 shared details/list/row layout and shared 12px, 4px × 10px pill-button rule.
- The route pins mūla `78aa74027224a72061184086acdbbee0d59e4480`, numbered witness `59e0595ab053e03c66ebf85c88591b877f2c3055`, Śrīdhara commentary `98c5ac6f61bd168e25a38057f315f701a16d9a54`, and English reference `45aba963269c4adf9ab4d79f4c46771bd9b3f211`, all from upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Page transcription corrections restore 2.4.31 `viṣṇum`, 2.4.33 `samudreṇa` and `vistārācchālmalasyaiva`, 2.4.37 `manujāḥ`, 2.4.56 `puṣkarādyaiḥ` and `yāgai`, and 2.4.68 `dharma-hāni`. Verses 2.4.73, .80, and .84 follow mūla/English `Mahāpīta` against the numbered-witness `Mahāvīra`; at .73 the page retains numbered-witness `Dhātaki` against mūla `Dhātuki`. Verse 2.4.33 uses numbered-witness `samantataḥ` where mūla reads `samatantaḥ`.
- Book 1 markers remain 1,407/1,407; older panels remain under semantic audit. Book 2 markers now total 723/787, with 64 gaps in Chapters 7, 8, and 13 (2, 32, and 30).

This release completes Book 2 Chapter 4 only; the rest of Books 1–2 remains in progress.


## User-directed Books 1–2 focus — Book 2, Chapter 7 release — 2026-09-25

- Book 2 Chapter 7 is complete on `main`: 43/43 articles have main-text Word-for-word lists and 490 paired Devanāgarī/IAST/contextual-gloss rows. The verse-1 speaker cue is included; all 43 translation paragraphs and transliteration controls remain present, and main IAST was regenerated from displayed Sanskrit.
- Two controls were added and 41 existing controls were expanded. All 56 legacy `.wfw-map` blocks and 43 commentary-state panels were preserved, including four “No commentary” notices. The Chapter 9 shared layout and 12px, 4px × 10px pill-button rule are used.
- The route pins mūla `a7bbc6caa7ee28d3d75d6f9456d992db6332ec55`, numbered witness `2841ccbfc130847647e3d5ee79fb0ad1a35c44c8`, Śrīdhara commentary `e6b9f9ef491aa3499298ba96d5db798fe9daff52`, and English reference `2820b451c83faff48d6494a1ee86c1979051f5c1`, all from upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections restore 2.7.1 `śrīmaitreya uvāca`, .9 `saptarṣi`, .12 `kalpavāsinaḥ`, .16 `bhūrlokaḥ`, .28 `cetanātmātma-vedanaḥ`, .29 `sarvabhūtātmabhūtayā`, .34 `putrāṇām`, .35 `naivāsti`, .37 `patrāṅkurau`, and .41 `caitac`, alongside the restored Maitreya vocatives and removal of duplicated verse-number suffixes. The route note records .5 `śaśinaḥ/śaśinā`, .31 `jale/chale`, .32 `pādapaḥ/pādayoḥ`, and .34 `surādayaḥ/asurādayaḥ` variants.
- Book 1 markers remain 1,407/1,407, with older panels under semantic audit. Book 2 markers now total 725/787; the remaining gaps are in Chapters 8 and 13 (32 and 30).

This release completes Book 2 Chapter 7 only; the rest of Books 1–2 remains in progress.


## User-directed Books 1–2 focus — Book 2, Chapter 8 release — 2026-09-25

- Chapter 8 is complete on `main`: 122/122 articles have main-text Word-for-word lists and 1,378 paired Devanāgarī/IAST/contextual-gloss rows. All 122 translation paragraphs and commentary-state panels remain; 21 panels say “No commentary.” All 122 main transliterations match the displayed Sanskrit.
- Thirty-two Word-for-word controls were added and 90 existing controls expanded. All 116 legacy `.wfw-map` blocks were preserved byte-for-byte. The Chapter 9 shared stylesheets, details/list/row layout, and 12px, 4px × 10px pill-button rule are used.
- The route pins mūla `b58f841534fe5f077ecdb6b5a069742b9240b59b`, numbered witness `4def34474ab0393d59503da8796c3c582cba5ba6`, Śrīdhara source `7e3e596f06bc5f94b0a2d3846095d9442b13c5f6`, and English reference `ca699cb4933e6f760308267b54090606dd234f94`, all from upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections restore the Maitreya readings in 2.8.10/.12 and 2.8.13–.14, plus .21, .25, .33–.34, .39, .62, .70, .72–.73, .80, and .102. Main-text verses .93–.99 were restored to the numbered sequence; .98 records the `bhāsvaram/bhāsuram` witness difference. Stray verse-number/footnote artifacts were removed.
- Book 1 focused markers remain 1,407/1,407, with older panels still under semantic audit. Book 2 markers now total 757/787; the remaining gap is Chapter 13 (30).

This release completes Book 2 Chapter 8 only; the rest of Books 1–2 remains in progress.

## User-directed Books 1–2 focus — Book 2, Chapter 13 release — 2026-09-25

- Chapter 13 is complete on `main`: 104/104 verses have a full main-text Word-for-word list and 1,180 paired Devanāgarī/IAST/contextual-gloss rows. Thirty controls were added, 74 expanded, and all 95 legacy `.wfw-map` blocks were preserved byte-for-byte.
- All 104 translations and commentary-state sections remain unchanged, including 16 “No commentary” notices. All 104 main transliterations match the displayed Sanskrit, including speaker cues.
- The Chapter 9 shared stylesheets and 12px, 4px × 10px pill-button rule are used. The source note pins the mūla, numbered witness, Śrīdhara, and English references at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05` (mūla blob `3e329eddcc6a5434b6c18a570defaf1f66ad8262`; numbered witness `aa6bd83e979204fefe5f009fd44152ba0db6f637`; Śrīdhara `c9e67fabf4c668dda27c7adc9aee8023f86eb041`; English `055a9219c51cf27ac8154b3025b85dff43898bb9`). Corrections follow the numbered witness at 2.13.9, .11, .20, .23–.24, .29, .35, .44, .47–.50, .58, .61, .64, .70, .73–.77, .85, and .89–.104. The .92–.96 sequence was restored and .89 corrected to singular `piṇḍaḥ`; duplicate verse-number/footnote artifacts were removed.
- Word-for-word display coverage is now complete across Books 1 and 2: Book 1 has 1,407/1,407 verse panels, and Book 2 has 787/787. These counts establish panel coverage, not full semantic review of inherited glosses.


## User-directed Books 1–2 Word-for-word layout completion — 2026-09-25

- Book 1: 1,407/1,407 verse panels; 5,615 rows added across 12 migrated pages.
- Book 2: 787/787 verse panels; this release adds 2,407 rows to 378 verses across Chapters 2, 3, 5, 6, 9, 10, 11, 12, 14, 15, and 16. Chapters 10 and 11 have per-token rows from corrected displayed Sanskrit; remaining migrated chapters carry forward source-map phrase groupings.
- All migrated pages use the Chapter 9 shared stylesheet and its 12px, 4px × 10px pill-button rule. English translations, Śrīdhara sections, and “No commentary” notices remain unchanged; the Śrīdhara maps were preserved.
- Numbered-witness source corrections in Chapters 10–11 are recorded in the completion guide at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05` (Chapter 10 blob `99f8bf9ee439a9c9dd954ab575db1feb819a8ff6`; Chapter 11 blob `fb0af6e5edb8cf611ee4dc4da090421d24fec88e`).
- Layout coverage is complete for Books 1–2; inherited phrase-level glosses outside the per-token-reviewed pages remain candidates for a separate semantic audit.


## Current structural and reader audit — 2026-09-26

The current-branch scan covered all 126 routes and 6,400 verse articles. Every article had nonempty Sanskrit and English fields plus a Transliteration control. Verse IDs were contiguous from 1 through each chapter's final verse, and every verse target listed in a Contents section resolved. Translation and transliteration correctness were not established by these presence checks.

| Book | Articles | Nonempty WFW panels | Missing WFW panel | Placeholder panels |
|---|---:|---:|---:|---:|
| 1 | 1,407 | 1,407 | 0 | 0 |
| 2 | 787 | 783 | 0 | 4 |
| 3 | 837 | 837 | 0 | 0 |
| 4 | 1,354 | 61 | 1,293 | 0 |
| 5 | 1,517 | 671 | 846 | 0 |
| 6 | 498 | 64 | 434 | 0 |
| **Total** | **6,400** | **3,823** | **2,573** | **4** |

“Nonempty WFW panel” is a DOM-presence count only; it does not assert that each lexical map accounts for every Sanskrit word. The Book 2 placeholders are 2.4.96, 2.6.40–41, and 2.8.34. Book 4–6 gaps are the next source-based completion targets in descending book order, beginning at 6.7.106. The reader update applies the Chapter 1 theme to all routes. The 3.8.7 map now includes the omitted vocative `rājendra` (“O king”).


## User-sampled Book 3, Chapter 4 markup and content repair — 2026-09-26

- Rechecked all 26 verses against the pinned mūla, numbered witness, Śrīdhara, and English cross-check. Restored missing third-pāda translation and lexical material at 3.4.25; corrected 3.4.1 English/commentary wording and other source-backed readings recorded in the page note.
- Chapter coverage: 26/26 English translations, 26 main-text Word-for-word controls, 238 paired lexical rows, 26 Transliteration controls, 22 supplied Śrīdhara states, and four exact “No commentary.” states.
- Removed the extra closing divs in all 26 Word-for-word panels; fixed the 3.4.21 Transliteration reveal and outer `main` closure. Chapter 1 and 3.4 share identical stylesheet/font links and reader classes. Source validation passed; live visual rendering was not verified in a browser.
- Structural scan before this repair: 1,635/6,400 article nodes had div-count imbalance. This release fixes 26; 1,609 remain (Book 1: 8; Book 2: 682; Book 3: 680; Book 4: 61; Book 5: 178; Book 6: 0). This is markup-only; the semantic audit across the other chapters remains open. Whole-corpus WFW panel presence is 3,823/6,400, with 2,573 missing panels and four explicit placeholders, as recorded above.
- Source blobs are pinned in the chapter note at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla `9140193c63be14daf9616d617a436616021b2880`, numbered witness `59f12fc67520cf05689f452f5e9147c0f12a28d3`, Śrīdhara `add296b89589d37e9a249ebcb5c67b3f342d456b`, English `9b6296cb41622e4d0500de8547251e5cd189abcb`.


## User-directed Book 3, Chapter 8 layout repair — 2026-09-26

- Converted all 266 existing main-text WFW entries across 41 verses from legacy `.wfw-map` blocks into Book 1, Chapter 1's paired `gita-word-list` / `gita-word-row` layout. The row glosses and IAST were retained; Devanāgarī forms were paired alongside them. Śrīdhara maps remain in the reference page's existing phrase-map style.
- Fixed the 41 surplus div closings and restored the outer page wrappers. All 41 verse IDs, translations, WFW controls, Transliteration controls, and Contents anchors are present. Markup validation found 790 balanced div pairs and 109 balanced details controls, with no nesting errors. Stylesheet/font links match Book 1, Chapter 1.
- Added the pinned numbered Sanskrit witness to the chapter source note: upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`, blob `ad105b21f40a2c5adfac988fedef6733fb65953f`. Translation and gloss semantics remain under the broader verse-by-verse audit.
- After the Book 3.4 and 3.8 fixes, the structural scan leaves 1,568 article nodes with div-count imbalance (Book 1: 8; Book 2: 682; Book 3: 639; Book 4: 61; Book 5: 178; Book 6: 0). Whole-corpus main-WFW panel presence remains 3,823/6,400; 2,573 missing panels and four placeholders remain. These are structural counts, not semantic completion totals.


## Owner-directed whole-corpus reader correction — 2026-09-26

This release applies the Book 1, Chapter 1 reader standard across all 126 chapter routes and 6,400 verse articles. Book 1, Chapter 1 itself remains unchanged as the reference.

- All routes use the same page shell, hero, Contents rail, and stylesheet/font links as Book 1, Chapter 1. Incorrect copied titles were fixed, and Book 5, Chapter 36 received the missing shell and Contents rail.
- Converted 1,731 existing main-text lexical maps into paired `gita-word-list` / `gita-word-row` rows, preserving their IAST and gloss wording. The 167 remaining irregular or prose-shaped main-text maps stay in their source layout for verse-level review. All 1,891 Śrīdhara phrase maps retain the Chapter 1 reference's phrase-map layout.
- Corrected generated Devanāgarī in 14 rows that had retained Latin characters. The fields now contain Devanāgarī script; these display pairings still require source-witness review.
- Repaired the nested reader markup across the affected routes: removed 1,567 extra div closings inside controls and restored their matching wrappers; balanced 43 controls that were missing a closure; removed 43 surplus article-level div closings; removed 156 duplicate article endings; restored 122 outer page wrappers; repaired the malformed article fragment in 3.12.25; and closed the missing paragraph tag in 4.19.17.
- Static validation passed across all 126 routes: 6,400 contiguous verse articles; nonempty Sanskrit and English fields; one Transliteration control per verse; every Contents target resolves; all 13,718 native details/summary controls and div nesting are balanced; all routes match the reference shell and stylesheet/font links; no generated `lang="sa-Deva"` field contains Latin-script characters.

This is a reader and markup correction, not semantic completion. The current coverage scan still finds 3,823 nonempty main-text WFW panels, 2,573 verses without a panel, and four explicit placeholder panels. Existing translations and lexical glosses still need source-based, verse-by-verse review. At this 2026-09-26 checkpoint, the next full-corpus target was Book 6, Chapter 7, verse 106. The later owner-directed Book 3 audit below supersedes that cursor until Book 3 is complete.


## Owner-directed Book 3 translation and commentary audit — 2026-09-29

Book 3, Chapter 1 has received a verse-by-verse Sanskrit, translation, word-map, and Śrīdhara review against the pinned Vishvas/Vasuki mūla, numbered witness, Śrīdhara commentary, Vasuki English witness, and Wilson at Wisdom Library and Sacred Texts.

- Coverage: 46/46 contiguous verse articles; 46 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 189 main lexical rows.
- Commentary: 20 cards reproduce the 15 supplied source annotations wherever they apply; 26 other verses display the exact No commentary. state.
- Corrected subject references in the Śrīdhara maps. The opening signature really names Śrīdhara in third person. The verb pṛcchati refers to Maitreya. In 3.1.35, darśayati is rendered as the text showing Viṣṇu's presiding role. In 3.1.46, āha is rendered explicitly as Śrīdhara says.
- The verse translation and word map render cāturvarṇya as four varṇas. Wilson translates cāturvarṇya as four castes. This is disclosed only as an English cross-reference.
- At 3.1.36, the numbered witness and Śrīdhara read ākūtyām, Ākūti, in agreement with Wilson; the mūla transcription reads ākṛtyām. The page adopts Ākūti and records the variant.
- The Jyotirdhāma gloss is placed under 3.1.18, where the name appears, though the Śrīdhara source marks it after 3.1.19. The fourteen-member gloss is placed with 3.1.21, not the entire 3.1.22–27 range, because 3.1.27 explicitly names groups of eight.
- The page's Śrīdhara label is qualified as the Śrīdhara recension. Wilson records Ratnagarbha as the manuscript attribution for Book III, so the page note discloses the attribution conflict rather than presenting one as uncontested.
- Chapter 1 controls follow the Chapter 1 Bhagavad Gītā reader sizing, including the 4px by 10px summary padding. Static checks found 46 IDs in order, 46 nonempty translations and Sanskrit blocks, balanced reader markup, no square brackets, and no caste wording in verse translations or word maps.

Book 3 semantic review status: 46/837 verse articles across 1/18 chapters. The other 17 chapters remain to be reviewed. Continue with Book 3, Chapter 2. This semantic audit is separate from the baseline main-WFW panel count of 837/837.

## Owner-directed Book 3 translation and commentary audit — 2026-09-30

Book 3, Chapter 2 has received a verse-by-verse Sanskrit, translation, word-map, transliteration, and supplied Śrīdhara review against the pinned VishvAsa/Vasuki mūla, numbered witness, Śrīdhara commentary, Vasuki English witness, and Wilson at Wisdom Library and Sacred Texts.

- Coverage: 62/62 contiguous verse articles; 62 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 244 main lexical rows.
- Commentary: 27 source annotations are aligned and repeated wherever they apply, yielding 30 sourced commentary paragraphs across 27 verses; the other 35 verses display the exact No commentary. state. The 3.2.7 note applies to 3.2.6–7; the 3.2.53 note continues through 3.2.62; and the conclusion at 3.2.58 applies to 3.2.58–59.
- Third-person references: at 3.2.1, Śrīdhara's summary describes Parāśara telling Maitreya the account of Sāvarṇi's origin. The Sun's son is Sāvarṇi. The source's āha markers at 3.2.47, 3.2.49, and 3.2.53 refer to Śrīdhara's explanatory voice; the English phrase maps name Śrīdhara directly.
- At 3.2.13, savarṇa is translated as complexion or appearance. Caste is not used as its meaning in the translation or word map.
- Textual decisions: the mūla reading bhartuḥ śuśrūṣaṇe is used at 3.2.3; the numbered witness tejo-niśātanam is used at 3.2.9; śibikā at 3.2.11 follows Śrīdhara's conveyance gloss; viṃśaka means twenty at 3.2.16; and the 3.2.17 list counts Vyāsa sixth and Ṛṣyaśṛṅga seventh. The page records differences from Wilson and Vasuki English at 3.2.19, 3.2.24–25, 3.2.27, 3.2.34, and 3.2.38, and numbered-witness spellings at 3.2.37, 3.2.43–45.
- Reader sizing: same stylesheet links and reader styles as the Book 3, Chapter 1 Bhagavad Gītā template. Summaries are 12px with 4px by 10px padding; word rows are 15.5px desktop and 13.5px mobile.
- Static validation passed: 62 contiguous IDs; 62 nonempty translations and Sanskrit blocks; 62 main word lists and 244 paired rows; 62 main Transliteration controls; 27 Śrīdhara Sanskrit details; 151 matched details and summaries; balanced 984 div openings and closings; no square brackets; and no caste wording in verse translations or word maps.

Book 3 semantic review status: 108/837 verse articles across 2/18 chapters. Seventeen chapters remain. Continue with Book 3, Chapter 3. This semantic audit remains separate from the baseline main-WFW panel count of 837/837.


## Owner-directed Book 3 translation and commentary audit — 2026-09-30

### Book 3, Chapter 3

Book 3, Chapter 3 has received a verse-by-verse Sanskrit, translation, word-map, transliteration, and supplied Śrīdhara review against the pinned VishvAsa/Vasuki mūla, numbered witness, Śrīdhara commentary, Vasuki English witness, and Wilson at Wisdom Library and Sacred Texts. The Bhagavad-gītā 8.13 at Vedabase was used only to check the echoed phrase.

- Coverage: 31/31 contiguous verse articles; 31 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 276 main lexical rows.
- Commentary: 20 Śrīdhara Sanskrit and phrase-map units; 34 sourced commentary paragraphs are aligned with their verses; verse 9 displays the exact No commentary. state.
- Speaker and pronouns: Maitreya speaks in 3.3.1–3, and Parāśara replies from 3.3.4. Śrīdhara’s āha and nivedayati formulae have the commentator as their implied subject. The verse’s first-person statements in 3.3.18 and 3.3.21 belong to Parāśara. Phrase maps name Śrīdhara, Parāśara, or the Lord where English pronouns could be unclear.
- Textual decisions: 3.3.4 follows the mūla na śakyā; the numbered and separate Śrīdhara witnesses read na śakto. At 3.3.17, the mūla reads somaśuṣkāyaṇaḥ; the numbered witness and separate Śrīdhara file read somaśuṣmāyaṇaḥ. The translation follows the mūla spelling and the Vasuki English reading of Tṛṇabindu’s lineage. At 3.3.19, the mūla reads prakīrtitāḥ and the numbered witness purātanāḥ. At 3.3.29, the mūla sarvabhūteṣu supports in all beings, while the numbered witness reads sarvabhedeṣu. At 3.3.31, the page follows the mūla sa bhidyate and bhagavān anantaḥ; the separate Śrīdhara text records na bhidyate as a Gītā Press reading, and the numbered witness has asaṅgaḥ.
- Wilson’s list differs in several Vyāsa names, including Triśikha, Varṇī, Ṛtuñjaya, Jaya, Uttara, Vājaśrava, and Jātukarṇa. Varṇī is a proper name and is not translated as caste.
- Reader sizing: control summaries use the Bhagavad Gītā Chapter 1 styling at 12px with 4px by 10px padding; main word rows use 15.5px on desktop and 13.5px on mobile.
- Static validation passed: 31 contiguous IDs; 31 nonempty translations and Sanskrit blocks; 31 main word lists with 276 rows; 31 main Transliteration controls; 20 Śrīdhara Sanskrit controls; 82 matched details and summaries; balanced 680 opening and closing div tags; no curly quotation marks; no Latin-script characters in Devanāgarī word fields; and no caste wording in verse translations or word maps.

Book 3 semantic review status: 228/837 verse articles across 6/18 chapters. Twelve chapters remain. Continue with Book 3, Chapter 7. This semantic audit remains separate from the baseline main-WFW panel count of 837/837.

### Book 3, Chapter 4

Book 3, Chapter 4 was reviewed verse by verse against the pinned mūla, numbered witness, Śrīdhara commentary, and Vasuki English reference, with Wilson checked at Wisdom Library and Sacred Texts.

- Coverage: 26/26 contiguous verses; 26 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 236 main lexical rows.
- Commentary: 22 supplied Śrīdhara states and four exact No commentary. states; 74 matched details and summaries.
- Speaker and pronouns: Parāśara speaks to Maitreya. The my son and by me/from me statements belong to Parāśara, as the chapter source identifies him as speaker. The āha formulas in Śrīdhara’s comments have the commentator as their implied subject. English maps name Śrīdhara, Vyāsa, Paila, or Śākapūrṇi where a bare third-person pronoun would be unclear. The two Bāṣkalis in 3.4.25–26 are distinguished.
- Textual decisions: 3.4.3 follows mūla te and vyāsaiḥ; 3.4.6 follows tan me; 3.4.7 follows mūla sa jagrāha; 3.4.12 follows numbered tu; 3.4.15 follows mūla mahāvedataruḥ; 3.4.16–17 follow mūla vibheda; the numbered witness supplies the first two pādas at 3.4.22, which the mūla omits, and the last name follows mūla śaiśiraḥ and Wilson’s Śiśira; and 3.4.24 follows numbered and Śrīdhara niruktakṛt, also reflected by Wilson. The numbered witness supplies the third pāda at 3.4.25, omitted by the mūla, with the three disciple names.
- Source and wording repairs: aligned the 3.4.7, 3.4.9, 3.4.15–18, 3.4.25, and 3.4.26 Devanāgarī and IAST displays with their selected readings; corrected the Jaimini spelling and the segmentation of Agnimāḍhaka; removed unsupported bracket insertions and typographic quotation marks; and replaced unclear agent pronouns in maps and commentary.
- Reader sizing: the shared Chapter 1 Bhagavad Gītā styles remain in use, with 12px summaries, 4px by 10px summary padding, 15.5px desktop word rows, and 13.5px mobile word rows.
- Static validation passed: 26 contiguous IDs and translations; 26 Word-for-word and 26 Transliteration controls; 236 lexical rows; 22 Śrīdhara Sanskrit controls; 74 matched details and summaries; 607 balanced div openings and closings; no square brackets or curly quotation marks; no Latin-script characters in Devanāgarī fields; and no caste wording in verse translations or word maps.

### Book 3, Chapter 5

Book 3, Chapter 5 was reviewed verse by verse against the pinned mūla, numbered witness, Śrīdhara commentary, and Vasuki English reference, with Wilson checked at Wisdom Library and Sacred Texts.

- Coverage: 30/30 contiguous verses; 30 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 207 main lexical rows.
- Commentary: 24 sourced Śrīdhara controls and 24 English commentary states, with six exact No commentary. states; 84 matched details and summaries.
- Speaker and pronouns: Parāśara narrates 3.5.1 through 3.5.15 and 3.5.26 through 3.5.30. Yājñavalkya speaks in the hymn at 3.5.16 through 3.5.25. Śrīdhara’s āha formula in the Sanskrit commentary refers to Śrīdhara as commentator. English commentary names the speaker or agent where a bare pronoun could be unclear. Commentary applying to 3.5.4–5 and 3.5.13–14 is repeated under both verses.
- Textual decisions: The page follows the mūla at 3.5.6 atāḍayat rather than numbered aghātayat; at 3.5.7 ca rather than sa; at 3.5.12 ityuktvā and yayau ca rather than ityukto and yayau sa; at 3.5.14 cakrur ādhvaryavam rather than carakādhvaryavaḥ; at 3.5.15 praṇataḥ rather than prayataḥ; at 3.5.18 kāla-saṃjñātmane rather than kāla-jñāna-ātmarūpiṇe; at 3.5.19 dhṛtyātmanē rather than tṛptyātmanē; at 3.5.23 kriyāyogyo’bhijāyate and pavitrakāraṇātmāya rather than kriyāyogyo hi jāyate and pavitratākāraṇāya; at 3.5.25 bhūtānālokacakṣuṣam rather than bhuvanālokicakṣuṣam; and at 3.5.29 sūryo’śvaḥ sa abhavat rather than sūryo’py aśvo’bhavat. At 3.5.30 the page follows the mūla kaṇvādyāḥ rather than the Śrīdhara text kāṇvādyāḥ. Verse 3.5.13’s missing second half was restored from the mūla and numbered witness.
- Translation corrections include the proper reading at 3.5.10, which says that the excellent Brahmins are without vigor. It does not tell Yājñavalkya to become devoid of strength. At 3.5.6 the main verse follows the mūla reading struck; Śrīdhara explains that the child died from a sage’s curse, while the numbered witness reads killed.
- Source and wording repairs: restored the mūla spellings saptaviṃśan, abhūd, vyatikrāntavān, agniṣoma, and gharma; corrected Devanāgarī and IAST to match the selected readings; removed bracketed insertions and curly quotation marks; named unclear speakers and agents in the English commentary and lexical maps.
- Reader sizing: the page uses the same shared Bhagavad Gītā Chapter 1 control styling. Summary labels are 12px with 4px by 10px padding. Main word rows are 15.5px on desktop and 13.5px on mobile.
- Static validation passed: 30 contiguous IDs; 30 translations and Sanskrit blocks; 30 Word-for-word and 30 Transliteration controls; 207 main lexical rows; 24 Śrīdhara Sanskrit controls; 84 matched details and summaries; 624 balanced div openings and closings; no square brackets or curly quotation marks; no Latin-script characters in Devanāgarī fields; and no caste wording in verse translations or word maps. The page links Wisdom Library and Sacred Texts and pins all upstream source blobs to commit `4f878940be057c6efcc644dc688b604e0b2e64a1`.


## Owner-directed Book 3 translation and commentary audit — Chapter 6 — 2026-09-30

Book 3, Chapter 6 was reviewed against the pinned Vishvas/Vasuki mūla, numbered Sanskrit witness, Śrīdhara source, and Vasuki English witness. Wilson’s translation was cross-checked at Wisdom Library and Sacred Texts.

- Coverage: 33/33 contiguous verse articles; 33 Sanskrit blocks, translations, main Word-for-word controls, and Transliteration controls; 344 lexical rows.
- Commentary alignment: 21 Śrīdhara Sanskrit panels and English translations, with 12 exact No commentary. states. The notes on Devadarśa and Pathya now sit with their corresponding verses. The Āṅgirasa and Śānti gloss is grouped with the Kalpa passage. The verse 3.6.18 commentary now says Romaharṣaṇa made the abridged Romaharṣaṇikā, as the Śrīdhara Sanskrit does.
- Speakers: Śrīdhara’s āha formulas at 3.6.4 and 3.6.6 use an omitted subject for the Purāṇa narrator naming pupils. They do not describe Śrīdhara as acting in the narrative. The explicit saḥ api at 3.6.9 refers to Kabandha. In the 3.6.19 gloss, mayā kṛtam is Parāśara speaking, not Śrīdhara.
- Textual readings: 3.6.2 follows mūla Sutvā rather than the numbered witness and Wilson Sukarman. The mūla at 3.6.3 makes Sukarman the son of Sutvā, while Śrīdhara and Wilson identify him as Sumantu’s son. Wilson reads the compound as a Sāhasra collection of a thousand hymns; this page follows Śrīdhara’s division gloss. At 3.6.4, the mūla verse says five hundred northern Sāmagas while the Śrīdhara gloss gives fifteen pupils and fifteen Saṃhitās; Wilson instead gives fifteen northern pupils of Pauṣpiñji and fifteen eastern pupils of Hiraṇyanābha. At 3.6.6, the mūla names Kaumudi and Kakṣīvān while Wilson has Kuthumi and Kuṣīdī. At 3.6.7, the main verse follows mūla Kṛtanāma; Śrīdhara’s commentary reads Kṛti among Hiraṇyanābha’s northern Sāmagas; the mūla gloss gives Kṛtanāma among eastern Sāmagas; Wilson renders Kriti. At 3.6.8–9 the numbered witness keeps the Atharvaveda instruction under verse 9. At 3.6.10 the verse reads Medha, while Śrīdhara and Wilson give Maudga. At 3.6.13 the main translation follows the root words and leaves the other Kalpa names to the commentary.
- UI and wording: the page keeps the shared Bhagavad Gītā summary and word-row sizes. Root IAST was checked against all 33 displayed verses. The 3.6.9 last pāda and the 3.6.24 word etāni were restored. The 3.6.12 text now reads saṃhitām and saṃjñine. All 344 Devanāgarī and IAST word rows match. No varṇa was translated as caste.
- Validation: 33 IDs, translations, main WFW lists, and root IAST controls; 344 main lexical rows; 21 Śrīdhara Sanskrit controls; 87 details; 772 opening and 772 closing div tags; no square brackets, curly quotation marks, Latin characters in Devanāgarī word fields, or caste wording in verse translations and lexical glosses.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `a2c09b6d94ac90c0b261e96388c0f598b9f06158`; numbered witness blob `12a6e637bc52bdae621f9609072aebe738ad7017`; Śrīdhara blob `4a1c71a07fa9b8b4553e46d9369eb4d9e9c1b8fc`; English cross-check blob `9da20ac2c3b5dcda8c995cc095b7c03db05b0cdd`.



## Owner-directed Book 3 semantic audit — Chapter 7 — 2026-09-30

Book 3, Chapter 7 was checked against the pinned Vishvas/Vasuki mūla, numbered Sanskrit witness, Śrīdhara source, and Vasuki English witness. Wilson’s translation was cross-checked at Wisdom Library and Sacred Texts.

- Coverage: 39/39 contiguous verse articles; 39 Sanskrit blocks, translations, main Word-for-word controls, and Transliteration controls; 448 lexical gloss rows plus one verse-text row for each verse.
- Commentary alignment: 29 Śrīdhara Sanskrit panels and direct English translations, with 10 exact No commentary. states. The notes at 3.7.18, 3.7.30, and 3.7.33 were corrected against their source verses. The 3.7.18 prose now translates the Sanskrit question about devotion to the controller of Yama. The 3.7.30 prose translates the commentary on greed for wealth from friends and relatives. The 3.7.33 prose translates the note on chanting the names of the Lord and taking refuge in the Lord alone.
- Speakers and pronouns: at 3.7.1 bhavān prabravītu uses honorific third-person agreement but addresses Parāśara as you. The earlier may he tell gloss was incorrect and is now may you tell. In the opening Śrīdhara note pṛcchati refers to Maitreya asking. It does not refer to Śrīdhara. Other third-person forms refer to their actual subjects in the verse or commentary. The English commentary at 3.7.16 names Hari explicitly.
- Textual readings: 3.7.2 follows mūla pātāla-vīthayaḥ; the Śrīdhara file’s verse transcription has pātāla-vidhayaḥ but its gloss defines pātāla-vīthī as a row of cavities beneath the earth. At 3.7.14 the mūla reads sva-puruṣam; the Śrīdhara file’s verse transcription has kha-puruṣam while Śrīdhara’s commentary explains sva-puruṣam. At 3.7.20 the text reads nija-varṇa-dharma without āśrama. Varṇa remains untranslated as varṇa and is not called caste. At 3.7.22 the mūla transcription omits a letter in viṣṇu-bhaktam; the Śrīdhara witness restores the word. The remaining witness choices at 3.7.3, 3.7.15–18, 3.7.23, 3.7.25, and 3.7.35 are recorded in the page note.
- UI and wording: the page shares the Bhagavad Gītā reader styles. Summary labels are 12px and word rows are 15.5px desktop and 13.5px mobile. The verse translations and English commentaries use periods and question marks only.
- Validation: 39 IDs, translations, main WFW panels, and root IAST panels; 487 main word-map rows including one full-verse IAST row per verse; 29 Śrīdhara Sanskrit controls; 107 matched details and summaries; 530 opening and closing div tags; no square brackets, curly quotation marks, Latin characters in Devanāgarī fields, or caste wording in verse translations and word maps.

Source pins at upstream commit `4f878940be057c6efcc644dc688b604e0b2e64a1`: mūla `00515e32ba3b6fb472a603ae35ed3041eb64837d`; numbered witness `f99784cc4320f21834579c2f337b186d4e8894a1`; Śrīdhara `0a474c4aa2db43845758b11eabad29efe8bb64ef`; Vasuki English `4de94ead6b0e10f30fbd21967fe53082ffded4e4`. Wilson cross-check: Wisdom Library chapter VII and Sacred Texts chapter VII.


## User-directed Book 1 Śrīdhara word-for-word pass — Chapter 3 — 15 October 2026

Book 1, Chapter 3 is complete and read back on `main`. Its 28 verse articles now have complete English translations written against the Sanskrit, paired root-text word maps, and root transliteration matching the displayed Devanāgarī. The 26 supplied Śrīdhara passages have English translations and 565 lexical rows inside the same **Word-for-word** control as their root-verse maps. The 2 verses without a supplied commentary retain the exact `No commentary.` state.

- Root lexical maps: 315 Devanāgarī/IAST/gloss rows across 28 verses. Commentary maps: 565 rows across 26 passages. Every row pairs the Sanskrit form with its IAST and a concise gloss.
- All 28 root translations were rewritten from the Sanskrit; the page no longer attributes the translation to Wilson. Verse IAST was regenerated from the displayed Sanskrit. The source-backed corrections at 1.3.1 and 1.3.12 repair the duplicated/truncated root reading and the readings `dve` and `divyābdānām`.
- At 1.3.16 the page retains `parimāṇam`, matching the Śrīdhara verse and its “Manvantara measure” gloss. The mūla verse reads `pariṇāmam`; its commentary records both the dissolution and measurement readings.
- Each commentary map is inside its verse’s existing **Word-for-word** control. The **Transliteration** control contains both root and Śrīdhara IAST; the Devanāgarī control contains the Śrīdhara text. The visible label is “Śrīdhara translation,” and the translation text remains regular weight.
- Validation: 28 contiguous article IDs, 28 root translations, 28 root WFW controls and root IAST controls, 26 commentary translations and maps, 565 commentary rows, 315 root rows, 2 exact no-commentary states, 82 matched details/summaries, and 1,422 balanced div openings/closings. No public “Textual basis” or Wilson note remains.

Source pins: upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`; mūla blob `f0a74063b72d9197cf7ac4f1fc205518dd1d3f20`; Śrīdhara blob `74b309ba972130e1cb8c3479c8eb7f6614d4e74c`.

## User-directed Book 1 word-for-word pass — Chapter 4 — 15 October 2026

Book 1, Chapter 4 now has 52 contiguous verse articles. Every root verse has a Sanskrit-derived English translation, a 590-row lexical map, and IAST regenerated from the displayed Devanāgarī. All 52 supplied Śrīdhara passages have direct English and a lexical map inside the same **Word-for-word** control as the root verse. The 303 phrase-level Śrīdhara rows cover all 900 Sanskrit word tokens; each row pairs source Devanāgarī, IAST, and a concise English gloss. The page retains exactly three controls per verse: **Word-for-word**, **Transliteration**, and **Devanagari**. Both Sanskrit layers appear in the latter two controls. The visible label is “Śrīdhara translation”; its English text remains regular weight. Shared Book 1 styling keeps the verse and Śrīdhara translation text at the same font, size, and color, with bold Sanskrit and a bold black Śrīdhara label as the specified exceptions.

The English root layer was rewritten from the Sanskrit rather than copied from Wilson. The existing Śrīdhara English was checked against its supplied Sanskrit; the wording was corrected where it drifted or added material, including 1.4.1–2, 1.4.13–14, 1.4.17, 1.4.21, 1.4.23, 1.4.34, 1.4.49, and 1.4.51. Technical terms such as Sattva, Rajas, Pradhāna, Yajña, Veda, and Brahman remain untranslated.

Text decisions: 1.4.11 uses **पाताल**; 1.4.16 restores **संभक्षयित्वा**; 1.4.17 follows the numbered witness **भवतो यत् परं तत्त्वं तन्न जानाति कश्चन**, where the mūla file is corrupt; 1.4.32 separates **दन्तेषु यज्ञाः**; 1.4.42 restores **शं नो देहि**; 1.4.48 follows the numbered reading **प्रभावेण**; 1.4.51 uses **सृज्यानां**; and 1.4.52 follows **मुक्त्वैनं**.

Validation: 52 contiguous IDs and root translations; 590 root word rows; 52 Śrīdhara translations and maps; 303 Śrīdhara phrase rows covering 900 source tokens; 52 paired root/Śrīdhara transliteration and Devanāgarī controls; exactly 156 matched details and summaries; 1,937 balanced div openings and closings; no Wilson or “Textual basis” note in the public article.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla `viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/01/04.md`, blob `f76974eef290bfe14a5ab4e1e4212dda5a3628ce`; numbered witness `viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/01/04.md`, blob `126debac6f79562850fc1dcae3813711f18afc03`; Śrīdhara `viShNu-purANam/shrIdhara-viShNu-chittau/1/04_kalpAnte_sarga-varNanaM.md`, blob `85b032d035d4fd23a11cd632296e493ed5d22d31`; English cross-check `viShNu-purANam/viShNu-chitta-TIkA/en/01/04.md`, blob `83fe115f5feb8d0fb6f54e5941e46ac51d5e6c90`. English cross-checks informed corrections but were not copied.

Book 1 cumulative ledger: 17,325 word-for-word panel rows across 1,407 verse cards; all 934 attached Śrīdhara passages are paired inside their controls. Chapters 1–4 have lexical maps; Chapters 5–22 currently have passage-level pairings and still need lexical segmentation.


## Book 1, Chapter 5 WFW panel repair — 15 October 2026

The page now includes the root map and the full supplied Śrīdhara Sanskrit/IAST/English passage pairing inside the same **Word-for-word** control for all 62 attached passages. Four no-commentary cards remain. This is a structural pairing pass: Chapter 5 Śrīdhara entries are passage-level and still require token-level lexical segmentation. Root maps: 608 rows. The public page’s Wilson attribution was removed from its description; the all 66 verses have the same three-control layout.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `a2c09b6d94ac90c0b261f9609072aebe738ad7017`; numbered witness blob `12a6e637bc52bdae621f9609072aebe738ad7017`; Śrīdhara blob `4a1c71a07fa9b8b4553e46d9369eb4d9e9c1b8fc`; English cross-check blob `9da20ac2c3b5dcda8c995cc095b7c03db05b0cdd`.


## Book 1, Chapter 6 WFW panel repair — 15 October 2026

The 37 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. Five no-commentary cards remain. This is a structural pairing pass: Chapter 6 Śrīdhara entries remain passage-level and need lexical segmentation. Root maps: 258 rows. The page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `89c109b6ba0ea96a63205a40158b4f73e82eef91`; numbered witness blob `9da984197682b4412dfc3f46378baeef3f510cf4`; Śrīdhara blob `973c1100189ce2a7998c99e085f6271fffd030b2`; English cross-check blob `fcaa97a0aa122626f351d8c8b7d8ccee3686959a`.


## Book 1, Chapter 7 WFW panel repair — 15 October 2026

All 37 supplied Śrīdhara Sanskrit passages now appear inside the same Word-for-word control as the root maps, paired with IAST and the existing English translation. Eleven no-commentary cards remain. This structural pass uses passage-level rows; lexical segmentation remains. Root maps: 315 rows. The public page has exactly three controls on every verse and no Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `624170f48f48bd15ded65e1ccce0b15310e4b0b5`; numbered witness blob `b58a0b4ec02a6426247ca17ba16cbb7ca7f4916b`; Śrīdhara blob `3ec99981ee33c49caf2c678a737210c250c2345a`; English cross-check blob `3ea1d03c07ee61d9933a5f814bb8b5693b315f38`.


## Book 1, Chapter 8 WFW panel repair — 15 October 2026

All 27 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 5 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 253 rows. The public page has exactly three controls per verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `a6218b8a8fe3d942c3e690b84a7f059f1bfc6639`; numbered witness blob `9d629ac8b1ffa4d5fc80c18eb83b4d949c79e81a`; Śrīdhara blob `28d7701eabb0e38ab275ca3f9d1e3c4ddd6fb5ef`; English cross-check blob `a79e4ef29adce6ae70c66801fa24413b8091c9a1`.


## Book 1, Chapter 9 WFW panel repair — 15 October 2026

All 102 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 47 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 1672 rows. The public page has exactly three controls per verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `81fc3acef8a692db6f86280c41d300eef988f285`; numbered witness blob `60253676a3437e2c458ffc33e47452e56461ea06`; Śrīdhara blob `7fab306d4de79f2b6160b3eac43a1180b16fa1ec`; English cross-check blob `deb2af835d90da4e5a3510868832ff42ca28f6f4`.


## Book 1, Chapter 10 WFW panel repair — 15 October 2026

All 13 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 8 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 243 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `dac8bfa64a36fee35ddf3ad22a813949f40f2f26`; numbered witness blob `928c18a82ea89a9a09a1271745dffd7c887b919f`; Śrīdhara blob `d5c420a5ae35b2ddca611e81c429fd744e4a3380`; English cross-check blob `0431dabebcb907002fb339826c79f850f75c527d`.


## Book 1, Chapter 11 WFW panel repair — 16 October 2026

All 34 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 23 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 686 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `99cb7be5e8dc29fab3278efeaca476240e9d6d6a`; numbered witness blob `8655f9fb2808772efcb6be144f8b8eac0d34023f`; Śrīdhara blob `43b9789f2e5ca9cd43b8c36edf2e44d83f32aa2b`; English cross-check blob `de1c6fc6aef2ca07fcd9ec38923b4466c4d66eeb`.


## Book 1, Chapter 12 WFW panel repair — 16 October 2026

All 59 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 44 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 1127 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `1dd25be195442a479c767095ef6f633dad78a193`; numbered witness blob `bf008fc3238907d9f08f6ab96f4725cc35c5e63d`; Śrīdhara blob `a3662e00f307c22a82ece6dc30d1f71602876704`; English cross-check blob `0855626556bb082b4005e43e0d2b4af0b32566b4`.


## Book 1, Chapter 13 WFW panel repair — 16 October 2026

All 40 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 55 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 1130 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `216b675eb4704fd9ef1157a7c411873540f5f701`; numbered witness blob `39c4bfbeb08d0479d2e22f5ae15b2228fe14a95d`; Śrīdhara blob `f932a96c9e4e62f94554216e4c3b5b137e28fcd4`; English cross-check blob `ce67ff9dae71965186de9567807d96c220087201`.


## Book 1, Chapter 14 WFW panel repair — 16 October 2026

All 30 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 19 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 524 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `b70ca85ceaf9772668984598bc271f6ddb6dd36b`; numbered witness blob `a8545db2876fd82a27eeec2a3b143f4476f89952`; Śrīdhara blob `3beda04bc7be41e7675d8e4290e197c426f3249c`; English cross-check blob `5bbe3aea66167c13420b817c79061fe4d515c697`.


## Book 1, Chapter 15 WFW panel repair — 16 October 2026

All 102 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 54 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 1786 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `39f12c475cf82e3363bcfaec28726f99a714e1fb`; numbered witness blob `a067d93fe25621fadffd7b3426e051c9b3b34746`; Śrīdhara blob `aa4555e1360e35a41a728ed89a8291938407fa27`; English cross-check blob `23c8812f1479e5a043713c0c609835c884b8603d`.


## Book 1, Chapter 16 WFW panel repair — 16 October 2026

All 4 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 12 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 201 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `d71c097c2cad2fb5189e315a3eea2fd68d4d9698`; numbered witness blob `de6b070db8b47f4f29a2983ed98ef4bc9757b467`; Śrīdhara blob `28f92fe91cc60996aeb66b0879276e2df2ae0450`; English cross-check blob `a24bca6b0e9a1aebd5b41b38857554c8012fb6a0`.


## Book 1, Chapter 17 WFW panel repair — 16 October 2026

All 59 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 32 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 546 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `3be42bfcb5ede84ca8ada055978fdd88adb259ec`; numbered witness blob `e1dbf0777601bef30b76e946f890b8f642926437`; Śrīdhara blob `5fa0212834a9d7507cb0278516871bbbfd0aecc1`; English cross-check blob `f55649492799aeaf6592200be00e33cbc8ede27c`.


## Book 1, Chapter 18 WFW panel repair — 16 October 2026

All 23 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 20 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 319 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `4247989218affbd077c77bf960a0b09e3295da1d`; numbered witness blob `8777450e4dba39b5e270b7d3d32cdef8de92f5bd`; Śrīdhara blob `aae2db5c8cdd87060a6d5db61a7e36b18a7bb137`; no English cross-check file is present at the pinned upstream revision.


## Book 1, Chapter 19 WFW panel repair — 16 October 2026

All 53 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 33 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 1022 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `bc63e2448277dcc0790db2f445b7b3d18eb4404f`; numbered witness blob `51c727faa692da6cc6764c87eb299085e506f7c0`; Śrīdhara blob `8799fe7c8745d6b135b25db5924bb2a845fd4ad1`; English cross-check blob `96fc014cd636f8f28591cb50334e9cfd05cdab76`.


## Book 1, Chapter 20 WFW panel repair — 16 October 2026

All 22 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 17 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 464 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05: mūla blob 933bca3c6c89434e5c6da197bfec80440b2ac9b8; numbered witness blob 3190a2277be02951fad524c96c7a1982e4db70ca; Śrīdhara blob ac332a7076db4d0ebb1d965a209a7b9802ba0f80; English cross-check blob 75120bef826851429fff57461d6f912139b2fde9.


## Book 1, Chapter 21 WFW panel repair — 16 October 2026

All 24 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 17 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 476 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05: mūla blob 18c1791300db9d2cdcd2b542fb99e997f723a168; numbered witness blob dea16ef42693026bc6c28a96a4271c7aa4f13caa; Śrīdhara blob f3306d685d30f0223e97f5e1e03e751e4600e6ae; English cross-check blob 5dc0209c0e5cb46981bd50e4542800a49ad4ddf4.


## Book 1, Chapter 22 WFW panel repair — 16 October 2026

All 60 supplied Śrīdhara passages now appear inside the same Word-for-word controls as the root maps, with Devanāgarī, IAST, and their existing English translations. 30 no-commentary cards remain. This structural pairing pass uses passage-level rows; lexical segmentation remains. Root maps: 478 rows. The public page has exactly three controls on every verse and no public Wilson attribution.

Source pins at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05: mūla blob ec816b256d90970025c30cf20faa9c609e980580; numbered witness blob 6e85fae0e3479a9f2f2a6ef565cd6aea523fd46e; Śrīdhara blob 6f15d32bac448d1dc934e7dd21510c4c50de47f4; English cross-check blob 4ea136d7adabfce12ea0f22663ef85d7822308c6.


## Book 1, Chapter 1 control consistency — 16 October 2026

Added a Devanagari control to each of the 16 no-commentary cards, displaying the root verse. Removed the public Wilson attribution from the page description. The existing 19 Śrīdhara WFW pairings remain in place.



## Book 1, Chapter 2 control consistency — 16 October 2026

Added a root-Devanāgarī control to every no-commentary verse. All 68 cards now have all three controls, and all 49 supplied Śrīdhara passages remain paired inside Word-for-word.



## Book 1, Chapter 3 control consistency — 16 October 2026

Added a root-Devanāgarī control to every no-commentary verse. All 28 cards now have all three controls, and all 26 supplied Śrīdhara passages remain paired inside Word-for-word.

## Whole-corpus route and text anomaly audit — 2026-09-26

The latest scan at parent commit `e93d5f89e30b63eabbe87973c94f58eea6a79d88` covers 126 routes and 6,400 verse cards. Complete per-route ID lists and transliteration comparisons are in `.github/maintenance/audit/vishnu-purana-route-audit-2026-09-26.json`.

- 3,827 cards have a nonempty main-text WFW control; 2,573 controls are missing (Book 4: 1,293; Book 5: 846; Book 6: 434). No empty WFW controls were found.
- 2,909 cards lack Śrīdhara Sanskrit. 516 have no commentary section, while 2,899 carry an explicit “No commentary.” state.
- All route stylesheet/font links match Book 1 Chapter 1, all 13,718 details/summary controls are balanced, and all 6,394 Contents targets resolve.
- This batch reclassified 40 Book 2 commentary maps and reformatted 127 Book 3 phrase maps. Generated Devanāgarī still needs source review.
- Eight English paragraphs and two commentary filler fields were corrected. The non-English contamination at 4.9.18 remains open.
- The IAST screen flags 1,260 cards against displayed Sanskrit; 151 have tri-gram similarity below 0.4. Numeric artifacts are flagged on 52 cards. These are audit flags, not a source-certified error total.

This batch does not mark any chapter semantically complete. Continue in reverse order from Book 6, Chapter 7, verse 106.
