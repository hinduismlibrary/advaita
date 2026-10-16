# Viveka Dṛṣṭi Viṣṇu Purāṇa — completion and audit workflow

## Objective

Complete and semantically audit all 126 Viṣṇu Purāṇa chapter routes (6,400 verse articles). The active user-directed pass is Viṣṇu Purāṇa Book 1, Chapters 1–22 in ascending order. It covers the root text and translation, Śrīdhara commentary and its word-for-word mappings, and the paired transliteration layers. Publish one fully checked chapter at a time. After Book 1 is complete, resume the paused full-corpus queue through Books 6, 5, 4, 3, and 2. The repository and the progress ledger below are the source of truth.

## Hard constraints

- Cloud-only: use the connected GitHub/API tools. Do not use a local checkout, shell, local browser, or local web server.
- Treat all synced `sources/` files as read-only.
- Never publish a partial chapter or overwrite a newer branch state.
- Work quickly by batching remote source reads and validation; accuracy has no artificial time limit.
- Do not alter unrelated pages, scripts, styling, or the Bhagavatam project files.
- Update the guide and audit ledger in the same chapter release. Publish the chapter immediately after all checks pass.

## Paused full-corpus reverse release order

The existing full-corpus queue starts at Book 6, Chapter 8, verse 64, then works backwards to 6.8.1. It continues chapter-by-chapter in descending order through Book 6, then Books 5, 4, 3, 2, and 1. Verify each chapter's actual verse count from its source; never assume a count.

The full-corpus cursor is paused at Book 6, Chapter 7, verse 106. The owner-directed Book 3 semantic audit below takes priority until Book 3, Chapters 1–18 are complete. Then resume the paused cursor at Book 6, Chapter 7, verse 106.

## Source hierarchy

For each chapter, fetch complete source files remotely and retain exact paths, revision IDs, and blob SHAs in the chapter note.

- Sanskrit base text: Vishvas/Vasuki mūla under `viShNu-purANam/viShNu-chitta-TIkA/mUlam_me/`.
- Numbering and alternate reading check: Vishvas/Vasuki numbered witness under `viShNu-purANam/goraxapura-pAThaH/hindy-anuvAdaH/`.
- Śrīdhara Sanskrit and mapping: `viShNu-purANam/shrIdhara-viShNu-chittau/`.
- Cross-checks only: the corresponding fixed Wikisource revision, GRETIL Sanskrit, Vasuki English witness, and Wilson’s translation at Wisdom Library.
- Translate from the Sanskrit first. English cross-checks are not a source to copy into the site's translation or word-for-word gloss.

If Sanskrit witnesses disagree, resolve the reading from the actual source evidence, correct obvious transcription/OCR errors only when supported by another witness, and record the precise choice in a concise textual note. Do not silently claim that every witness agrees.

## What a complete verse requires

Every source verse must have one correctly numbered article with:

1. Source-backed Sanskrit Devanāgarī.
2. A faithful, readable English translation that accounts for every clause.
3. A working **Word-for-word** control with genuine lexical mappings: Sanskrit form, correct IAST, and a concise gloss. Cover every word or necessary compound/phrase unit. Do not put a running translation, a paragraph, ellipses, filler, or a placeholder in this control.
4. A working **Transliteration** control whose IAST corresponds exactly to the displayed Sanskrit.
5. The actual Śrīdhara Sanskrit, IAST, phrase-level gloss, and faithful commentary translation wherever supplied.
6. Exactly `No commentary.` where the source supplies none.

A visible control does not prove that its content is complete. Check the semantics, not just the markup. Keep source alignment details out of displayed commentary; do not print source-range labels. When one source commentary passage applies to multiple verses, repeat it under every verse it explains without adding range labels to the UI.

## Fast, safe chapter release

1. Read current branch head and current target-file SHA; fetch chapter Sanskrit, Śrīdhara, English cross-checks, guide, audit ledger, and Contents page in parallel.
2. Establish source verse count, verse boundaries, textual variants, and Śrīdhara-to-verse alignment once in memory.
3. Complete every verse from the final verse backwards. Use one stable page template; preserve existing typography and controls.
4. Validate verse IDs/count, Sanskrit and translation coverage, every WFW lexical row, IAST-to-Devanāgarī correspondence, Śrīdhara coverage, exact no-commentary states, working native `details/summary` controls, source note, and balanced HTML.
5. Confirm the chapter route already appears in the dynamic Contents list. Change the Contents file only if its actual link is missing or broken.
6. Create one atomic chapter-specific commit containing the chapter, this guide, and audit ledger. Update `main` only as a fast-forward from the freshest observed head.
7. Fetch the committed chapter, guide, audit ledger, and commit metadata again. Confirm exact content and checksums; then immediately begin the next chapter in the active owner-directed sequence.

Batch checks and report only meaningful findings to keep the loop fast. If a witness conflict is unresolved, state the exact verse and do not mark that chapter complete.

## Progress — 2026-09-23

| Book | Articles | Main WFW complete | Still missing |
|---|---:|---:|---:|
| 1 | 1,407 | 1,198 | 209 |
| 2 | 787 | 710 | 77 |
| 3 | 837 | 837 | 0 |
| 4 | 1,354 | 61 | 1,293 |
| 5 | 1,517 | 695 | 822 |
| 6 | 498 | 64 | 434 |
| **Total** | **6,400** | **3,565** | **2,835** |

These are the 2026-09-22 full-corpus audit totals with the verified 6.8 release added: 64 main WFW articles. They do not certify the remaining verses or imply that the whole Purāṇa is finished. The chapter-level audit in `.github/maintenance/audit/vishnu-purana-wfw-audit-2026-09-22.md` records the baseline and this incremental update.

| Current release | Verified chapter state |
|---|---|
| Book 6, Chapter 8 | 64/64 verse articles; 64 Sanskrit, translations, main WFW panels, and IAST panels; 31 sourced Śrīdhara Sanskrit/commentary panels; 33 exact no-commentary states |
| Next | Book 6, Chapter 7, verse 106 downwards |

Chapter 6.8's disputed readings were checked against the Vasuki mūla and numbered Vishvas witness, Śrīdhara text, fixed Wikisource revision, and GRETIL. Verse 6.8.15 now reads **पुंसां (puṃsām)** in agreement with the numbered and Śrīdhara witnesses; the mūla file's differing **पुंसा (puṃsā)** is disclosed in its source note. Its 832 main and 113 Śrīdhara phrase-gloss rows were checked for Sanskrit/IAST pairing. The main and Śrīdhara transliteration panels were cross-checked against their displayed Devanāgarī. The word-for-word layer is a lexical map, not copied running prose.



## User-directed Book 1 completion pass — 2026-09-24

A direct verse-level re-audit separates a main-text lexical map from a visible control, a pending message, or a Śrīdhara-only panel. Before this pass, 761 of Book 1's 1,407 verses had an explicit main-text lexical section; 646 still needed one. This corrects the earlier control-presence count of 1,198, which included 182 pending panels and other controls without a main-text lexical section.

Book 1, Chapter 18 is now complete: 43/43 contiguous verse articles have a main-text word-for-word section in the Chapter 9 reader layout, with existing Śrīdhara material retained. The Devanāgarī and IAST for 1.18.3 were corrected to **अविज्ञातम् (avijñātam)** after the pinned Vasuki mūla text and numbered witness agreed on that reading. Chapter 18's 43 maps raise the Book 1 count to 804/1,407; 603 remain. The 1.18.3 witness check used upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`, mūla blob `4247989218affbd077c77bf960a0b09e3295da1d`, and numbered-witness blob `8777450e4dba39b5e270b7d3d32cdef8de92f5bd`.

## Completion rule

A chapter is complete only after source reconciliation, full verse-by-verse semantic review, functional controls, an atomic remote commit, and successful post-commit read-back. Keep the full-corpus goal open until all 6,400 verses and every supplied Śrīdhara passage meet that standard.

Chapter 18 wording refinement: the 1.18.33 lexical rows now separate `hṛdi āste` (“abides in the heart”) from `hariḥ īśvaraḥ` (“Hari, the Lord”), and 1.18.38 reads `na pāvakam cintayāmi` as “I do not regard them as evil.”


## User-directed Books 1–2 focus — 2026-09-24

The owner requested completion of the word-for-word layer in Viṣṇu Purāṇa Books 1 and 2 and a reader-style pass based on Bhagavad Gītā Chapter 9. The Chapter 9 fonts and exact 12px pill controls (4px × 10px padding) are linked from all 22 Book 1 and 16 Book 2 chapter pages.

After the Chapter 14 release, Book 1 has a main-text WFW panel marker on 1,161/1,407 verses; Book 2 remains at 710/787. Chapters 21, 20, 19, 16, 15, and 14 added 14, 39, 86, 16, 154, and 48 panel markers, respectively; Chapters 15 and 14 now have reviewed lexical maps on all 156 and 49 verses. A visible marker alone does not certify a correct lexical map; semantic coverage remains open for the other chapters.

| Book | Verse articles | Main-text panel markers | No marker |
|---|---:|---:|---:|
| 1 | 1,407 | 1,161 | 246 |
| 2 | 787 | 710 | 77 |

Outstanding panel gaps by chapter:

- Book 1: Chapters 11 (57), 12 (95), and 13 (94); total 246.
- Book 2: Chapters 1 (8), 4 (5), 7 (2), 8 (32), and 13 (30); total 77.

### Book 1, Chapter 21 release

- 41/41 contiguous articles have a reviewed main-text lexical map, with 476 paired Devanāgarī/IAST mapping rows.
- Main transliteration panels were checked against displayed Sanskrit; every lexical row has a matching Devanāgarī form, IAST, and concise gloss.
- All Word-for-word controls use the Chapter 9 paired-row layout. No pending messages or empty maps remain in the chapter.
- The source note pins the Vasuki mūla, numbered witness, Śrīdhara source, and English cross-check to their blob SHAs and upstream commit. It records the reading choices at 1.21.1–.40, including witness-supported corrections and retained mūla readings.
- The release adds the 14 previously missing main-text panels in verses 1–14; the 27 existing maps in verses 15–41 were checked and rebuilt as paired lexical rows.

### Book 1, Chapter 20 release

- 39/39 contiguous articles now contain source-complete Sanskrit, full translations, main-text word-for-word maps, and Transliteration controls. The previously truncated Sanskrit in verses 18–20, 23–24, 28, and 34 was restored.
- Added 464 paired Devanāgarī/IAST lexical rows across all 39 verses. Each map was reviewed for Sanskrit form, transliteration, and a concise gloss; all pending messages were removed.
- Main IAST panels were regenerated from the displayed Sanskrit. Existing Śrīdhara material, English translations outside the reviewed correction at 1.20.24, and commentary/no-commentary states were retained.
- The textual note pins the mūla, numbered witness, Śrīdhara commentary, and English cross-check. It records the decisions at 1.20.1–.39, including witness corrections and readings retained from the mūla.
- Book 1 panel status after this release: 857/1,407; 550 remain. The outstanding marker gaps are Book 1 Chapters 11–16 and 19 listed above, plus the Book 2 chapters listed above.

### Book 1, Chapter 19 release

- 86/86 contiguous verse articles now have word-for-word panels using the Chapter 9 paired Devanāgarī/IAST row layout, with 1,022 lexical rows and no pending controls.
- Every row pairs a Sanskrit form, its IAST, and a concise gloss. Existing English translations and commentary states were retained; main Sanskrit and IAST were corrected where the mūla and numbered witness exposed clear transcription errors.
- The pinned source note records significant readings, including mūla choices at 1.19.20, .29, .35, .39, .45, .68, .70, .74, .81–82, and .84, and witness-supported corrections at .16, .30, .54–55, .61, and .73.
- Book 1 panel status after this release: 943/1,407; 464 remain. The outstanding Book 1 marker gaps are Chapters 11–16 listed above; Book 2 remains at 710/787 with 77 gaps.

Books 1 and 2 remain in progress. Panel counts for the other chapters are structural only and do not certify lexical completeness.


### Book 1, Chapter 16 release

- All 16 verse articles now have reviewed, paired Devanāgarī/IAST lexical rows, for 201 word-for-word mappings; all translations and main transliteration panels were checked against the displayed Sanskrit.
- Replaced the four Śrīdhara-only/contextual controls with a main-text lexical layer while retaining their Śrīdhara content; added main lexical panels to the other 12 verses.
- Corrected source-backed Sanskrit readings and cleaned incomplete translations, including the mūla/witness readings at 1.16.1–.4, .6–.8, .10, .12–.16. The source note records variants at .8, .10, .12, and .15 with exact source blobs.
- At the Chapter 16 release, Book 1 had 959/1,407 panel markers, with 448 marker gaps in Chapters 11–15. Book 2 had 710/787 markers, with 77 gaps.
- No placeholder or empty word-for-word panel remains in Chapter 16; existing Śrīdhara material is preserved.


## User-directed Books 1–2 focus — Chapter 15 release — 2026-09-25

Book 1 Chapter 15 is complete and read back on `main`. All 156 verse articles have the Chapter 9 word-for-word control and complete paired rows: 1,786 Devanāgarī/IAST/gloss entries, 156 English translation paragraphs, and 156 transliteration controls. The two older partial main-text maps were rebuilt; the 102 existing Śrīdhara panels remain in place.

The page uses the Chapter 9 control classes and linked stylesheet, preserving the same 12px pill controls (4px × 10px padding). Its route-local number labels retain the standalone qualities list as 1.15.65, so labels from local 1.15.66 onward are one higher than the mūla edition. Word-for-word entries follow the Sanskrit displayed in each article. At local 1.15.74, the numbered witness’s `daśabhyas` reading is used against the mūla edition’s `daśamyas`.

The source note pins the mūla text `39f12c475cf82e3363bcfaec28726f99a714e1fb`, numbered witness `a067d93fe25621fadffd7b3426e051c9b3b34746`, Śrīdhara text `e6eaf7dd0be0805a1294aa58041e7be83b3746be`, commentary `aa4555e1360e35a41a728ed89a8291938407fa27`, and English cross-check `23c8812f1479e5a043713c0c609835c884b8603d`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections against these witnesses include local 1.15.1 `āvavruḥ`, .2 `vātuṃ`/`ceṣṭituṃ`, .3 `tān dṛṣṭvā`, .7 `vārkṣeyī`, .71 `nṛṇām`, .72 `patnī`, .73 `Mārīṣām`, .98 `bhrātṛṇām`, .112 `varcasvī`, .123 `rudrās`, .131 `savitā`, .132 `āsan ye`, .140 `dityāḥ`, and .154 `matimān amatsarī`. Chapter 1.15.123’s translation now matches the 11 and 101 Rudra counts in the Sanskrit.

Marker status at the Chapter 15 release: Book 1 was 1,113/1,407 (294 without markers); Book 2 was 710/787 (77 without markers). Book 1’s gaps then were Chapters 11–14: 57, 95, 94, and 48 verses. Book 2’s gaps were Chapters 1, 4, 7, 8, and 13: 8, 5, 2, 32, and 30. Existing panels outside the reviewed chapters still need semantic audit.


## User-directed Books 1–2 focus — Chapter 14 release — 2026-09-25

Book 1 Chapter 14 is complete and read back on `main`. All 49 verse articles now have Chapter 9-style word-for-word controls and 524 paired Devanāgarī/IAST/gloss rows, along with all 49 translation paragraphs and transliteration controls. Forty-eight main-text panel markers were added, and the pre-existing partial main map at 1.14.26 was rebuilt. The 30 existing Śrīdhara word-for-word panels were retained.

The page uses the same `gita-details`, `gita-word-list`, and `gita-word-row` controls and Chapter 9 stylesheet as the other completed pages. The source note pins the mūla text `b70ca85ceaf9772668984598bc271f6ddb6dd36b`, numbered witness `a8545db2876fd82a27eeec2a3b143f4476f89952`, Śrīdhara text `d27c4b41afa15ee48cdb2994d0a89edb073cd1c2`, commentary `3beda04bc7be41e7675d8e4290e197c426f3249c`, and English cross-check `5bbe3aea66167c13420b817c79061fe4d515c697`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Text corrections follow the mūla at local 1.14.4 `vistṛtā`, .5 `tamasaḥ`, .10 `tat`, and .47 `vriyatām īpsito`; clear transcription fixes include .26 `bhujyate`, .30 `mukhaṃ`, and .32 `anantamūrtimān ca śuddhaḥ`. At .26, the page retains the numbered-witness reading `jīvabhūtaḥ` against the mūla’s bracketed variant `jīva-bījabhūtaḥ`.

Current focused marker status: Book 1 1,161/1,407 (246 without markers); Book 2 remains at 710/787 (77 without markers). Book 1’s remaining marker gaps are Chapters 11–13: 57, 95, and 94 verses. Book 2’s gaps are Chapters 1, 4, 7, 8, and 13: 8, 5, 2, 32, and 30 verses. Present panels outside the reviewed chapters still need semantic audit.

## User-directed Books 1–2 focus — Chapter 13 release — 2026-09-25

Book 1 Chapter 13 is complete and read back on `main`. All 95 verse articles now have the Chapter 9 word-for-word control and paired Devanāgarī/IAST/gloss rows (1,130 rows total), with all 95 English translations retained and all 95 transliteration controls aligned to the corrected displayed Sanskrit, including speaker labels. Ninety-four main-text panels were added; the legacy partial map at 1.13.38 was rebuilt. All 40 existing Śrīdhara word-for-word panels were preserved.

The route uses the same Chapter 9 shared CSS and `gita-details`, `gita-word-list`, and `gita-word-row` layout. The source note pins mūla text `216b675eb4704fd9ef1157a7c411873540f5f701`, numbered witness `39c4bfbeb08d0479d2e22f5ae15b2228fe14a95d`, Śrīdhara text `1915e0a47b2cdd8d1d63c5f9418cef043e2ea4db`, commentary `f932a96c9e4e62f94554216e4c3b5b137e28fcd4`, and English cross-check `ce67ff9dae71965186de9567807d96c220087201`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Textual corrections include local .15 `sāmakalaṃ`, .19 `sampūjyate`, .21 `Janārdanaḥ`, .54 `jñāyate ’sya`, and .87 `kalpayitvā`; the stray .89 footnote marker was removed. At .35, the page retains numbered-witness/Śrīdhara `cāturaḥ` over mūla `tvarānvitaḥ`. At .82, the displayed `vivardhitāḥ` reading and commentary distinction are documented in the source note.

Focused Book 1 panel markers now total 1,255/1,407 (152 without markers); Book 2 remains 710/787 (77 without markers). Book 1's remaining marker gaps are Chapters 11 and 12 (57 and 95). Book 2's gaps remain Chapters 1, 4, 7, 8, and 13 (8, 5, 2, 32, and 30). These are panel-presence counts; chapters with older panels still require semantic review.


## User-directed Books 1–2 focus — Chapter 12 release — 2026-09-25

Book 1 Chapter 12 is complete and read back on `main`: all 103 verse articles have the Chapter 9-style Word-for-word control, with 1,127 paired Devanāgarī/IAST/contextual-gloss rows. All 103 English translations and 103 main-text transliteration controls are present; the latter reproduce the displayed Sanskrit, including speaker labels. Ninety-five main-text panels were added and the eight pre-existing partial main maps were rebuilt. All 51 existing Śrīdhara Word-for-word panels were preserved, including nine Śrīdhara legacy maps.

The page uses the same Chapter 9 stylesheets, `gita-details`, `gita-word-list`, and `gita-word-row` presentation; the shared Word-for-word buttons use the 12px, 4px × 10px pill rule. Its source note pins the mūla text `1dd25be195442a479c767095ef6f633dad78a193`, numbered witness `bf008fc3238907d9f08f6ab96f4725cc35c5e63d`, Śrīdhara text `eb3062a4dfb9f98ebd822f334fcb7a6ee8c7a475`, commentary `a3662e00f307c22a82ece6dc30d1f71602876704`, and English reference `0855626556bb082b4005e43e0d2b4af0b32566b4`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. The mūla and numbered witness contain verse 1.12.19 absent from Śrīdhara’s sequence; the page restores it and aligns the following matprīti and maternal-warning verses to .20 and .21. The source note records the .21 `api/iha` variant, the .13 and .15 witness variants, the .20 `mā mohaṃ nivartyāsmāt` normalization, and clear transcription corrections at .43 and .102.

Focused Book 1 panel markers now total 1,350/1,407 (57 without markers, all in Chapter 11). Book 2 remains 710/787 (77 without markers), with gaps in Chapters 1, 4, 7, 8, and 13 (8, 5, 2, 32, and 30). These are panel-presence counts; older panels outside the reviewed chapters still need semantic audit.

## User-directed Books 1–2 focus — Chapter 11 release — 2026-09-25

Book 1 Chapter 11 is complete and read back on `main`: all 57 verse articles now have a full main-text Word-for-word panel, with 686 paired Devanāgarī/IAST/contextual-gloss rows, 57 translations, and 57 transliteration controls regenerated from the displayed Sanskrit, including speaker labels. Twenty-six new Word-for-word controls were added and the 31 existing controls were augmented with main-text rows. All 31 existing Śrīdhara panels and their legacy maps were preserved; all 34 commentary panels and 23 no-commentary states remain accounted for.

The page uses the Chapter 9 shared stylesheets and `gita-details`, `gita-word-list`, and `gita-word-row` presentation, including the 12px, 4px × 10px pill rule. Its source note pins the mūla text `99cb7be5e8dc29fab3278efeaca476240e9d6d6a`, numbered witness `8655f9fb2808772efcb6be144f8b8eac0d34023f`, Śrīdhara text `693f2667d21b0284083db6033b85b819bdac0066`, commentary `43b9789f2e5ca9cd43b8c36edf2e44d83f32aa2b`, and English reference `de1c6fc6aef2ca07fcd9ec38923b4466c4d66eeb`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections restore .8 `dhṛtaḥ`, .32 `abhivādana-pūrvakam`, .38 `hṛdayān`, .49 `vatsottamottamam`, .52 `viṣṇor ārādhanaparaiḥ`, and .53 `bāhyārthāt akhilāt`. The source note records the .19 `rājacchattraṃ` reading, .32 Śrīdhara variant, and .48 `yajñe yoge ca` variant against the mūla and numbered witness.

Book 1 focused panel markers now total 1,407/1,407. Book 2 remains 710/787 (77 without markers), with gaps in Chapters 1, 4, 7, 8, and 13 (8, 5, 2, 32, and 30). Existing Book 1 panels outside the reviewed chapters still need semantic audit.

## User-directed Books 1–2 focus — Book 2, Chapter 1 release — 2026-09-25

Book 2 Chapter 1 is complete and read back on `main`: all 43 verse articles now have full main-text Word-for-word panels, with 480 paired Devanāgarī/IAST/contextual-gloss rows. All 43 translations and transliteration controls remain present; main IAST now follows the displayed Sanskrit. Eight Word-for-word controls were added and 35 existing controls were augmented. All 49 legacy word-for-word maps and Śrīdhara notes were retained; all 43 commentary sections remain accounted for, including eight “No commentary” notices.

The page uses the Chapter 9 shared stylesheets and `gita-details`, `gita-word-list`, and `gita-word-row` layout, including the shared 12px, 4px × 10px pill rule. Its source note pins the mūla text `35e04e5d71462f8e5449e4a734c638bfb95ba174`, numbered witness `8d338951fb5c5c80c5d50d277875a43e544f2ac0`, Śrīdhara source `444145de015c5746d9bf8bc31f88fbe191ce0be1`, and English reference `3da244428968d26b15dfc92ec323176cfd810b73`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Corrections restore .7 `savanaḥ`, .14 `krauñca`, .18 `varṣam`, .25 `svābhāvikī`, .27 `tasyarṣabho’bhavat`, .28 `makhān`, .29 `pulahasyāśramam`, .32 `etat`, and .41 `imāḥ`. The source note records .10 `nirmalāḥ/nirmamāḥ` and .37 `prastāva/prastāvi` witness variants.

Book 1 focused panel markers remain 1,407/1,407; existing panels in chapters outside the reviewed set still need semantic audit. Book 2 markers now total 718/787 (69 without markers), with gaps in Chapters 4, 7, 8, and 13 (5, 2, 32, and 30).

## User-directed Books 1–2 focus — Book 2, Chapter 4 release — 2026-09-25

Book 2 Chapter 4 is complete and read back on `main`: all 97 verse articles now have a full main-text Word-for-word list, with 1,040 paired Devanāgarī/IAST/contextual-gloss rows. All 97 translation paragraphs remain present, and all 97 main transliteration controls were regenerated from the displayed Sanskrit, including the Parāśara speaker cue in verse 1. Five Word-for-word controls were added and 92 existing controls were expanded. All 132 legacy `.wfw-map` blocks were preserved byte-for-byte; the 97 commentary-state panels remain, including 16 “No commentary” notices.

The page uses the Chapter 9 shared stylesheets and `gita-details`, `gita-word-list`, and `gita-word-row` layout, including the 12px, 4px × 10px pill-button rule. Its source note pins mūla `78aa74027224a72061184086acdbbee0d59e4480`, numbered witness `59e0595ab053e03c66ebf85c88591b877f2c3055`, Śrīdhara commentary `98c5ac6f61bd168e25a38057f315f701a16d9a54`, and English reference `45aba963269c4adf9ab4d79f4c46771bd9b3f211`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Source-backed corrections restore 2.4.31 `viṣṇum`, 2.4.33 `samudreṇa` and `vistārācchālmalasyaiva`, 2.4.37 `manujāḥ`, 2.4.56 `puṣkarādyaiḥ` and `yāgai`, and 2.4.68 `dharma-hāni`. At 2.4.73, .80, and .84 the page follows mūla and the English reference `Mahāpīta` against the numbered witness’s `Mahāvīra); the .73 Dhātaki/Dhātuki spelling difference is recorded in the source note.

Book 1 panel markers remain 1,407/1,407; older panels outside the reviewed chapters still need semantic audit. Book 2 panel markers now total 723/787 (64 remaining gaps: Chapters 7, 8, and 13 have 2, 32, and 30). Existing panels outside the completed chapters still need semantic audit.


## User-directed Books 1–2 focus — Book 2, Chapter 7 release — 2026-09-25

Book 2 Chapter 7 is complete and read back on `main`: all 43 verse articles now have full main-text Word-for-word lists, with 490 paired Devanāgarī/IAST/contextual-gloss rows. The verse-1 Maitreya speaker cue is included in the rows and regenerated transliteration. All 43 translation paragraphs remain present; two Word-for-word controls were added and 41 existing controls were expanded. All 56 legacy `.wfw-map` blocks were preserved byte-for-byte, along with all 43 commentary-state panels, including four “No commentary” notices.

The page uses the Chapter 9 shared stylesheets, details/list/row presentation, and 12px, 4px × 10px pill-button rule. Its source note pins mūla `a7bbc6caa7ee28d3d75d6f9456d992db6332ec55`, numbered witness `2841ccbfc130847647e3d5ee79fb0ad1a35c44c8`, Śrīdhara commentary `e6b9f9ef491aa3499298ba96d5db798fe9daff52`, and English reference `2820b451c83faff48d6494a1ee86c1979051f5c1`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Source-backed corrections restore 2.7.1 `śrīmaitreya uvāca`, .9 `saptarṣi`, .12 `kalpavāsinaḥ`, .16 `bhūrlokaḥ`, .28 `cetanātmātma-vedanaḥ`, .29 `sarvabhūtātmabhūtayā`, .34 `putrāṇām`, .35 `naivāsti`, .37 `patrāṅkurau`, and .41 `caitac`; corrupted `Maitreya` readings and duplicate verse-number suffixes were also corrected. The source note records the .5, .31, .32, and .34 witness variants.

Book 1 panel markers remain 1,407/1,407; older panels outside the reviewed chapters still need semantic audit. Book 2 panel markers now total 725/787 (62 remaining gaps: Chapters 8 and 13 have 32 and 30). Existing panels outside the completed chapters still need semantic audit.


## User-directed Books 1–2 focus — Book 2, Chapter 8 release — 2026-09-25

Book 2 Chapter 8 is complete and read back on `main`: all 122 verse articles have full main-text Word-for-word lists with 1,378 paired Devanāgarī/IAST/contextual-gloss rows. Thirty-two Word-for-word controls were added and 90 existing controls were expanded. All 116 legacy `.wfw-map` blocks remain byte-for-byte unchanged. The 122 English translation paragraphs and 122 commentary-state panels were preserved, including 21 “No commentary” notices; all 122 main transliterations were regenerated from the displayed Sanskrit.

The page uses the Chapter 9 shared stylesheets and details/list/row layout, including its 12px, 4px × 10px pill-button rule. The route pins mūla `b58f841534fe5f077ecdb6b5a069742b9240b59b`, numbered witness `4def34474ab0393d59503da8796c3c582cba5ba6`, Śrīdhara source `7e3e596f06bc5f94b0a2d3846095d9442b13c5f6`, and English reference `ca699cb4933e6f760308267b54090606dd234f94`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Source-backed corrections include 2.8.10, .12–.14, .21, .25, .33–.34, .39, .62, .70, .72–.73, .80, and .102. The missing or misassigned main verse sequence at .93–.99 was restored from the numbered witness; at .98 the page retains `bhāsvaram` against numbered-witness `bhāsuram`. Duplicate verse-number and footnote artifacts were removed from the Sanskrit display.

Book 1 focused panel markers remain 1,407/1,407; existing panels outside the reviewed chapters still need semantic audit. Book 2 markers now total 757/787; the only remaining marker gap is Chapter 13 (30). Existing panels outside the completed chapters still need semantic audit.

## User-directed Books 1–2 focus — Book 2, Chapter 13 release — 2026-09-25

Book 2 Chapter 13 is complete on `main`: all 104 verses now have Chapter 9-style Word-for-word controls with 1,180 paired Devanāgarī/IAST/contextual-gloss rows. Thirty controls were added and 74 existing controls were expanded. The 95 legacy `.wfw-map` blocks remain byte-for-byte unchanged; all 104 English translations and Śrīdhara commentary-state sections remain, including 16 exact “No commentary” notices. All 104 main transliterations match the displayed Sanskrit and include speaker cues where present.

The page uses the Chapter 9 shared stylesheets and `gita-details`, `gita-word-list`, and `gita-word-row` layout, including the 12px, 4px × 10px pill-button rule. Its source note pins the mūla text blob `3e329eddcc6a5434b6c18a570defaf1f66ad8262`, chapter mūla `39d8e72df251267d3f7699ac39a6c0318d28f182`, numbered witness `aa6bd83e979204fefe5f009fd44152ba0db6f637`, Śrīdhara source `c9e67fabf4c668dda27c7adc9aee8023f86eb041`, and English reference `055a9219c51cf27ac8154b3025b85dff43898bb9`, all at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`. Source-backed display corrections include 2.13.9, .11, .20, .23–.24, .29, .35, .44, .47–.50, .58, .61, .64, .70, .73–.77, .85, and .89–.104; the restored .92–.96 sequence and the singular .89 `piṇḍaḥ` follow the numbered witness. Stray verse-number/footnote artifacts were removed from the Sanskrit display.

Word-for-word display coverage is now complete across Books 1 and 2: Book 1 has 1,407/1,407 verse panels, and Book 2 has 787/787. Panel coverage records the presence of the layout; it does not by itself certify every inherited gloss.


## User-directed Books 1–2 Word-for-word layout completion — 2026-09-25

- Book 1 is complete at 1,407/1,407 verse panels. The Book 1 migration added 5,615 Devanāgarī/IAST/gloss rows across its 12 updated pages.
- Book 2 is complete at 787/787 verse panels. This release migrated 378 verses from Chapters 2, 3, 5, 6, 9, 10, 11, 12, 14, 15, and 16 into 2,407 rows. Chapters 10 and 11 use one aligned row per corrected displayed Sanskrit token; the other chapters retain the legacy source-map phrase groupings in the new row layout.
- The Chapter 9 shared styles remain in use, including 12px button text and 4px × 10px pill padding. English translations, Śrīdhara sections, and “No commentary” notices were checked unchanged; Śrīdhara map blocks were preserved.
- Chapter 10/11 Sanskrit corrections follow the numbered witness at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05` (Chapter 10 blob `99f8bf9ee439a9c9dd954ab575db1feb819a8ff6`; Chapter 11 blob `fb0af6e5edb8cf611ee4dc4da090421d24fec88e`). Corrections are 2.10.11–.12, .20–.21, .23 and 2.11.1, .4, .6, .15, .18.
- This completes the requested Word-for-word layout coverage. Inherited phrase-level source mappings outside the per-token-reviewed pages still need a separate verse-by-verse semantic audit.


## User-directed whole-corpus structure and reader pass — 2026-09-26

A static scan checked all 126 chapter routes (6,400 verse articles) on the parent `main` snapshot. Verse numbering is contiguous in every chapter; every verse article has a Sanskrit block, a nonempty English paragraph, and a native Transliteration `details/summary` control; all verse links present in each Contents list resolve. These are structure checks only: they do not certify that an English paragraph translates every clause or that an existing word-for-word panel covers every Sanskrit word.

All 126 routes now use the Chapter 1 font imports, current Bhagavad Gītā base stylesheet, and exact reader overrides, with cache-busted stylesheet URLs. A small Viṣṇu Purāṇa stylesheet constrains legacy `.wfw-map` material to the same reading measure and prevents horizontal overflow. Existing maps were not represented as paired Devanāgarī/IAST lexical rows where that data is absent.

The fresh panel scan finds 2,573 verses without a main-text word-for-word panel and four panels that still contain an explicit placeholder (2.4.96, 2.6.40–41, and 2.8.34). Book 3 has panel markers throughout, but inherited maps remain subject to source-based semantic review. One visible omission at 3.8.7 was repaired: `rājendra` (“O king”) is now included in its lexical map. The reverse-order content pass remains at Book 6, Chapter 7, verse 106; no missing mappings were fabricated during this reader update.

| Book | Verse articles | Nonempty WFW panels | No WFW panel | Placeholder panels |
|---|---:|---:|---:|---:|
| 1 | 1,407 | 1,407 | 0 | 0 |
| 2 | 787 | 783 | 0 | 4 |
| 3 | 837 | 837 | 0 | 0 |
| 4 | 1,354 | 61 | 1,293 | 0 |
| 5 | 1,517 | 671 | 846 | 0 |
| 6 | 498 | 64 | 434 | 0 |
| **Total** | **6,400** | **3,823** | **2,573** | **4** |

The table records panel presence, not semantic completion. Chapter 1–3 panels still need verse-level comparison to the Sanskrit witnesses; Books 4–6 have the listed unmapped verses. Existing English paragraphs in 4.1.1 and 6.7.1 also need editorial review before those translations can be described as complete.


## User-sampled Book 3, Chapter 4 repair — 2026-09-26

The owner reported visibly wrong sizing and incomplete verse content on this chapter. All 26 verses were rechecked against the pinned Sanskrit witnesses and the supplied Śrīdhara material. This diagnostic release does not change the reverse-order resume point: Book 6, Chapter 7, verse 106.

- All 26 articles have a source-checked English translation, a main-text Word-for-word control, and a Transliteration control. The 26 main maps contain 238 paired Devanāgarī/IAST/gloss rows. The page has 22 supplied-commentary states and four exact “No commentary.” states; the commentary passage for 3.4.25 is repeated under 3.4.26 where it also applies.
- The review restores the missing third pāda in the 3.4.25 English and word-for-word material, revises the 3.4.1 translation/commentary translation, removes an OCR footnote artifact at 3.4.2, and records source-supported readings and spelling corrections in the chapter’s source note.
- Markup repair removes the surplus closing tags in the chapter’s 26 Word-for-word panels, closes the 3.4.21 Transliteration reveal correctly, and closes the outer `main` element. The resulting page has 609 opening/closing div pairs, 74 balanced details controls, 26 contiguous verse IDs, and resolved Contents targets.
- The Chapter 1 and repaired Chapter 3 page have identical stylesheet/font links and matching reader-control classes. The source structure was verified; browser-rendered visual comparison is not available in this environment.
- Sources are pinned in the page note to upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla `9140193c63be14daf9616d617a436616021b2880`, numbered witness `59f12fc67520cf05689f452f5e9147c0f12a28d3`, Śrīdhara `add296b89589d37e9a249ebcb5c67b3f342d456b`, and English cross-check `9b6296cb41622e4d0500de8547251e5cd189abcb`.

The all-route div-count scan found 1,635 verse articles with an imbalance before this repair; 26 are corrected here and 1,609 remain. Remaining counts are Book 1: 8; Book 2: 682; Book 3: 680; Book 4: 61; Book 5: 178; Book 6: 0. This scan measures markup only. It does not certify translations or lexical coverage in the remaining verses. The separate panel-presence totals above remain 3,823/6,400 and also do not certify semantic completeness.


## User-directed Book 3, Chapter 8 Chapter 1-layout repair — 2026-09-26

The owner pointed out that Chapter 3.8 still looked unlike the Book 1, Chapter 1 reference. The page had the shared stylesheet links, but every verse's main lexical map used the legacy prose block, each of the 41 verse articles had one surplus closing `div`, and the outer reader wrappers were not closed.

- Converted all 266 existing main-text lexical entries into the Chapter 1 `gita-word-list` / `gita-word-row` format, with paired Devanāgarī, retained IAST, and retained gloss. Śrīdhara phrase maps remain in the same format used by the Chapter 1 reference.
- Removed one surplus closing tag from each of the 41 Word-for-word panels and restored the outer `div`, `article`, and `main` closures. All 41 verse IDs, translations, Word-for-word controls, Transliteration controls, and Contents links are present; 14 verses retain their explicit “No commentary.” state.
- Source markup check: 790 balanced `div` elements, 109 balanced native `details` controls, no tag-nesting errors, and stylesheet/font links identical to Book 1, Chapter 1. Added the pinned numbered witness to the page note (upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`, blob `ad105b21f40a2c5adfac988fedef6733fb65953f`).
- This release fixes Chapter 3.8's layout and structure. Existing English translations and lexical gloss meanings were retained; this layout repair is not a fresh semantic retranslation of every verse.

The all-route structural scan now leaves 1,568 imbalanced verse articles: Book 1: 8; Book 2: 682; Book 3: 639; Book 4: 61; Book 5: 178; Book 6: 0. The whole-corpus panel-presence count remains 3,823/6,400, with 2,573 verses lacking a main-text panel and four explicit placeholders. These totals are coverage/markup checks; the full semantic audit remains open.


## Owner-directed whole-corpus reader correction — 2026-09-26

This release applies the Book 1, Chapter 1 reader standard across all 126 chapter routes and 6,400 verse articles. Book 1, Chapter 1 itself remains unchanged as the reference.

- All routes use the same page shell, hero, Contents rail, and stylesheet/font links as Book 1, Chapter 1. Incorrect copied titles were fixed, and Book 5, Chapter 36 received the missing shell and Contents rail.
- Converted 1,731 existing main-text lexical maps into paired `gita-word-list` / `gita-word-row` rows, preserving their IAST and gloss wording. The 167 remaining irregular or prose-shaped main-text maps stay in their source layout for verse-level review. All 1,891 Śrīdhara phrase maps retain the Chapter 1 reference's phrase-map layout.
- Corrected generated Devanāgarī in 14 rows that had retained Latin characters. The fields now contain Devanāgarī script; these display pairings still require source-witness review.
- Repaired the nested reader markup across the affected routes: removed 1,567 extra div closings inside controls and restored their matching wrappers; balanced 43 controls that were missing a closure; removed 43 surplus article-level div closings; removed 156 duplicate article endings; restored 122 outer page wrappers; repaired the malformed article fragment in 3.12.25; and closed the missing paragraph tag in 4.19.17.
- Static validation passed across all 126 routes: 6,400 contiguous verse articles; nonempty Sanskrit and English fields; one Transliteration control per verse; every Contents target resolves; all 13,718 native details/summary controls and div nesting are balanced; all routes match the reference shell and stylesheet/font links; no generated `lang="sa-Deva"` field contains Latin-script characters.

This is a reader and markup correction, not semantic completion. The current coverage scan still finds 3,823 nonempty main-text WFW panels, 2,573 verses without a panel, and four explicit placeholder panels. Existing translations and lexical glosses still need source-based, verse-by-verse review. At the time of this 2026-09-26 release, the next full-corpus target was Book 6, Chapter 7, verse 106. The later owner-directed Book 3 audit below supersedes that cursor until Book 3 is complete.


## Owner-directed Book 3 semantic audit — 2026-09-30

This pass reviews translations, Sanskrit, word maps, and supplied Śrīdhara material in Book 3. The earlier main-WFW coverage count of 837/837 indicates that controls exist; it does not certify their meaning.

Book 3, Chapter 1 is complete: 46 contiguous verses, 46 English translations, 46 main Word-for-word controls with 189 lexical rows, and 46 Transliteration controls. Śrīdhara's 15 source annotations are aligned to the verses they explain and repeated under each applicable verse, yielding 20 sourced commentary cards and 26 cards with the exact No commentary. state. All reader controls use the Bhagavad Gītā Chapter 1 shared stylesheet sizes: 12px summaries with 4px by 10px padding, 15.5px desktop word rows, and 13.5px mobile word rows.

The Chapter 1 source note records the actual third-person author signature; distinguishes Maitreya as the subject of pṛcchati; names Śrīdhara as the subject of āha; and explains that the English gloss for darśayati used an unclear subject. It also records the conflict between the pinned Śrīdhara recension and Wilson's Ratnagarbha manuscript attribution for Book III.

Text decisions recorded in Chapter 1 include four varṇas for cāturvarṇya; the numbered and Śrīdhara reading ākūtyām, Ākūti, at 3.1.36 against the mūla transcription ākṛtyām; the 3.1.18 placement of the Jyotirdhāma gloss marked after verse 19 in the source; and the placement of the fourteen-member gloss at 3.1.21, where that count occurs, rather than across 3.1.22–27, whose verse 27 names groups of eight. The page note records additional readings at 3.1.6, 3.1.8, 3.1.11, 3.1.14, 3.1.18, 3.1.19, 3.1.22, 3.1.25, and 3.1.34.

Book 3, Chapter 2 is complete: 62 contiguous verses, 62 Sanskrit blocks, 62 English translations, 62 main Word-for-word controls with 244 lexical rows, and 62 Transliteration controls. The 27 sourced commentary annotations are aligned and repeated across their applicable verses, yielding 30 sourced commentary paragraphs and 35 exact No commentary. states.

The Chapter 2 note clarifies the speaker at 3.2.1. Śrīdhara's summary describes Parāśara telling Maitreya the account of Sāvarṇi's origin. The Sun's son is Sāvarṇi. The third-person subject is Parāśara, not Śrīdhara. At 3.2.47, 3.2.49, and 3.2.53, the commentarial āha is rendered by naming Śrīdhara where the English would otherwise leave an unclear third-person subject. At 3.2.13, savarṇa is rendered as complexion or appearance, not caste. At 3.2.17, the translation counts the seven seers with Vyāsa sixth and Ṛṣyaśṛṅga seventh.

Chapter 2's source note records the chosen readings and English divergences, including bhartuḥ śuśrūṣaṇe at 3.2.3, tejo-niśātanam at 3.2.9, śibikā as a conveyance at 3.2.11, twenty rather than Wilson's twenty-one at 3.2.16, the readings at 3.2.19, 3.2.24–25, 3.2.27, 3.2.34, and 3.2.37–45, and the 3.2.38 rendering of thirty-three divisions.

Chapter 2 controls use the same Bhagavad Gītā Chapter 1 styles as Chapter 1: 12px summaries with 4px by 10px padding, 15.5px desktop word rows, and 13.5px mobile word rows. Static checks found 62 contiguous verse IDs, 62 translations and Sanskrit blocks, 62 main word lists with 244 rows, 62 Transliteration controls, 27 Śrīdhara Sanskrit details, 151 matched details and summaries, and balanced 984 opening and closing div tags. The main word lists do not translate varṇa as caste.

Semantic review progress: 108 of 837 Book 3 verse articles, across 2 of 18 chapters. Next: Book 3, Chapter 3.


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


### Book 3, Chapter 6

Book 3, Chapter 6 was checked verse by verse against the pinned mūla, numbered witness, Śrīdhara source, and Vasuki English witness, with Wilson checked at Wisdom Library and Sacred Texts.

- Coverage: 33/33 contiguous verses; 33 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 344 main lexical rows.
- Commentary: 21 source-matched Śrīdhara Sanskrit controls and 21 English notes, with 12 exact No commentary. states. The notes on Devadarśa’s and Pathya’s students are attached to the verses they explain. The Āṅgirasa and Śānti gloss is grouped with the Kalpa passage.
- Speakers and pronouns: In the 3.6.4 and 3.6.6 gloss formulas, the omitted subject of āha is the Purāṇa speaker naming the pupils, not Śrīdhara narrating himself. In 3.6.9 saḥ api refers to Kabandha. In the 3.6.19 gloss, mayā kṛtam is Parāśara’s speech, supplied by Śrīdhara.
- Textual decisions: 3.6.2 follows mūla Sutvā; the numbered witness and Wilson read Sukarman. The mūla at 3.6.3 makes Sukarman the son of Sutvā; Śrīdhara and Wilson identify him as Sumantu’s son. Wilson reads the compound as a Sāhasra collection of a thousand hymns; this page follows Śrīdhara’s division gloss. At 3.6.4 the mūla says five hundred northern Sāmagas; Śrīdhara gives fifteen pupils and fifteen Saṃhitās; Wilson gives fifteen northern pupils of Pauṣpiñji and fifteen eastern pupils of Hiraṇyanābha. At 3.6.6 the mūla names Kaumudi and Kakṣīvān, while Wilson reads Kuthumi and Kuṣīdī. At 3.6.7 the verse follows mūla Kṛtanāma; Śrīdhara reads Kṛti among Hiraṇyanābha’s northern Sāmagas; the mūla gloss calls Kṛtanāma a king among eastern Sāmagas; Wilson reads Kriti. Verses 3.6.8–9 follow the numbered witness boundary. At 3.6.10 the verse reads Medha, while Śrīdhara and Wilson read Maudga. At 3.6.13 the root verse names Nakṣatra-kalpa; the remaining Kalpa explanations are in Śrīdhara’s commentary. At 3.6.18 the Śrīdhara Sanskrit says Romaharṣaṇa made the Romaharṣaṇikā in abbreviated form.
- Source and wording repairs: corrected the 3.6.5, 3.6.6, 3.6.11–13, 3.6.17–18, and 3.6.20 source displays; aligned root IAST to all 33 displayed verses; restored the final line of 3.6.9; corrected the 3.6.12 reading saṃhitām and saṃjñine; restored the omitted etāni in the 3.6.24 IAST and word map; expanded the word maps to account for the verse particles; paired every Devanāgarī word row with its IAST; removed a stray source spacing command; and made the English agents explicit where an omitted subject could be misread.
- Reader sizing: the page uses the same shared Chapter 1 Bhagavad Gītā controls. Summary labels are 12px. Word rows are 15.5px on desktop and 13.5px on mobile.
- Static validation passed: 33 contiguous IDs and translations; 33 Word-for-word and 33 Transliteration controls; 344 main lexical rows; 21 Śrīdhara Sanskrit controls; 87 matched details and summaries; 772 balanced div openings and closings; no square brackets, curly quotation marks, or Latin letters in Devanāgarī fields; and no caste wording in verse translations or word maps.



### Book 3, Chapter 7

Book 3, Chapter 7 was checked verse by verse against the pinned mūla, numbered witness, Śrīdhara source, and Vasuki English witness. Wilson was cross-checked at Wisdom Library and Sacred Texts.

- Coverage: 39/39 contiguous verse articles; 39 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 448 lexical gloss rows plus 39 verse-text rows in the main word maps.
- Commentary alignment: 29 supplied Śrīdhara Sanskrit notes have direct English translations; 10 verses are marked No commentary. Corrected the misplaced commentary at 3.7.18, 3.7.30, and 3.7.33. Verse 3.7.30 now translates the note on greed for wealth from friends and relatives. Verse 3.7.33 now translates the note on chanting the names of the Lord and taking refuge in the Lord alone.
- Speakers and pronouns: at 3.7.1 bhavān prabravītu is grammatically third person as an honorific but addresses Parāśara as you. The former gloss may he tell was incorrect and is now may you tell. Śrīdhara’s opening pṛcchati has Maitreya as its subject. Commentary pronouns identify their Sanskrit subject and do not refer to Śrīdhara speaking about himself. Verse 3.7.16 names Hari explicitly in the English commentary to avoid ambiguity.
- Textual decisions: 3.7.2 follows mūla pātāla-vīthayaḥ; the Śrīdhara file’s verse transcription has pātāla-vidhayaḥ while its gloss explains pātāla-vīthī. At 3.7.14 the mūla reads sva-puruṣam; the Śrīdhara file’s verse transcription reads kha-puruṣam while its commentary explains sva-puruṣam. At 3.7.20 the text reads nija-varṇa-dharma and does not include āśrama; varṇa remains varṇa and is never translated as caste. Other readings are documented on the page at 3.7.3, 3.7.15–18, 3.7.22, 3.7.23, 3.7.25, and 3.7.35.
- Reader sizing: the page uses the shared Bhagavad Gītā controls and word-row styles. Summary labels are 12px. Word rows are 15.5px on desktop and 13.5px on mobile.
- Validation: 39 contiguous IDs and translations; 39 Word-for-word and 39 Transliteration controls; 487 main word-map rows including the verse text row for each verse; 29 Śrīdhara Sanskrit controls; 107 matched details and summaries; 530 balanced div openings and closings; no extra punctuation in the verse translations or commentary text; no Latin-script characters in Devanāgarī fields; and no caste wording in verse translations or lexical glosses.

Source pins at upstream commit `4f878940be057c6efcc644dc688b604e0b2e64a1`: mūla `00515e32ba3b6fb472a603ae35ed3041eb64837d`; numbered witness `f99784cc4320f21834579c2f337b186d4e8894a1`; Śrīdhara `0a474c4aa2db43845758b11eabad29efe8bb64ef`; Vasuki English `4de94ead6b0e10f30fbd21967fe53082ffded4e4`. Wilson cross-check: Wisdom Library and Sacred Texts.

### Book 3, Chapter 8

Book 3, Chapter 8 was reviewed against the pinned mūla, numbered Sanskrit witness, Śrīdhara source, and Vasuki English witness. Horace Hayman Wilson was cross-checked through Wisdom Library and Sacred Texts.

- Coverage: 41/41 contiguous verse articles; 41 Sanskrit blocks, English translations, main Word-for-word controls, and Transliteration controls; 266 main lexical rows plus 41 full-verse text rows.
- Commentary: 27 supplied Śrīdhara notes are aligned with the supplied Sanskrit and translated directly; 14 verses display the exact No commentary. state. The long Mīmāṃsā discussion at 3.8.25 is translated concisely and retains its rule distinctions and examples.
- Pronouns and subjects: former editorial wording such as he glosses has been removed. At 3.8.41 the subject of pratijānīte is Aurva, who is speaking in the narrative. Other commentary verbs such as āha are translated impersonally where an English pronoun would obscure the source.
- Textual decisions: 3.8.6 follows mūla svargivandyam while the supplied Śrīdhara verse reads svarge ramyam. At 3.8.26 the page follows vā in the numbered witness and Śrīdhara source; the mūla reads hi. At 3.8.33 the page follows sat-saṅga in the numbered witness and Śrīdhara source; the mūla reads tat-saṅga. At 3.8.35 the translation follows Śrīdhara’s interpretation of parigraha as acquisition of wealth; the mūla gloss describes taking unclaimed grass and wood. At 3.8.39 the mūla gloss identifies etayoḥ as the Brāhmaṇa and Kṣatriya. Śrīdhara identifies the two as Kṣatriya and Vaiśya and includes the Brāhmaṇa by implication. The verse translation follows the mūla gloss and the commentary records Śrīdhara’s reading. The supplied source places svargibandhaṃ brahmalokādipadam after 3.8.3 although no word in that verse matches the gloss; the page identifies its referent as uncertain.
- Text and language repairs: restored the missing first half of 3.8.15 and removed its duplicate from 3.8.16; corrected the Sanskrit at 3.8.12–16, 3.8.24, and 3.8.32–33; aligned the selected IAST readings; corrected the chapter subtitle; and added the comparative English links. Varṇa remains varṇa and is not translated as caste.
- Reader sizing: the page uses the shared Bhagavad Gītā reader CSS. Summary labels are 12px with 4px by 10px padding. Main word rows are 15.5px on desktop and 13.5px on mobile.
- Validation: 41 contiguous IDs, Sanskrit blocks, translations, Word-for-word controls, and Transliteration controls; 27 Śrīdhara Sanskrit controls; 109 balanced details and summaries; 802 balanced div openings and closings; no comma, quotation, apostrophe, semicolon, or dash punctuation in verse translations or English commentary; no Latin-script characters in Devanāgarī fields; and no caste wording in the translations or lexical glosses.

Source pins at upstream commit `4f878940be057c6efcc644dc688b604e0b2e64a1`: mūla `cb9bfcded368db14c6e55468a0808832f936e702`; numbered witness `ad105b21f40a2c5adfac988fedef6733fb65953f`; Śrīdhara `46214b340f0516196a354c03930b1edeac544a06`; Vasuki English `dfc99c1c406fd937d5f8b4f80f5c38ea60e2c316`. Wilson cross-check: Wisdom Library and Sacred Texts.

Book 3 semantic review checkpoint before the owner-directed Book 1 pass: 308/837 verse articles across 8/18 chapters. This work is paused. The active next chapter is Book 1, Chapter 2, after the complete Chapter 1 Śrīdhara WFW layer is released.


## User-directed Book 1 Śrīdhara word-for-word pass — 15 October 2026

Book 1, Chapter 1 has 35 verse cards and 19 supplied Śrīdhara commentary blocks. The Chapter 1 update adds 628 lexical rows: each commentary word is paired with the corresponding Devanāgarī form, existing IAST form, and a concise English gloss inside the same **Word-for-word** control as the root verse map. The visible Śrīdhara translation and the three-control layout remain intact. Chapter 1 root maps and translations were not independently re-audited in this sub-pass, so this update does not certify every existing English gloss.

Book 1 Śrīdhara lexical-map coverage after Chapter 1: 20/934 source blocks, including the earlier 1.17.1 map; 914 source blocks remain. Book 1’s next user-directed chapter is Chapter 2.


## User-directed Book 1 Śrīdhara WFW pass — Chapter 2 — 15 October 2026

Chapter 2 has 68 verse articles and 49 supplied Śrīdhara commentaries. All 49 now have lexical maps in the corresponding existing **Word-for-word** control alongside the Viṣṇu Purāṇa verse map. The 1,270 commentary rows pair the source Devanāgarī with IAST transliterated directly from that form and concise English glosses. The chapter’s 19 explicit no-commentary states remain in place. The root word maps for 1.2.2–3 were rebuilt; the root reading at 1.2.2 was corrected to antakāriṇe from the pinned mūla. The visible commentary label is “Śrīdhara translation,” with the translation text in regular weight.

The chapter adds 1,270 Śrīdhara rows and three root rows; Book 1 now has 15,452 word-for-word rows in the ledger and lexical maps for 69/934 attached Śrīdhara blocks. 865 blocks remain. The root translations and root lexical maps in the rest of Book 1 still require semantic review. Source pins: upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`, Chapter 2 Śrīdhara blob `3136ba4326d8c57c8dd2115e48b66d25c35a3e25`, and mūla blob `b1661f729a573bfb7a2b9a83bf7d469bc36fea4e`. The next user-directed chapter is Book 1, Chapter 3.


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

Book 1 cumulative ledger: 28,896 word-for-word panel rows; 875/934 attached Śrīdhara passages have Sanskrit, IAST, and English paired inside the control, with 59 remaining. Chapters 5–21 Śrīdhara entries are passage-level pairings and still need lexical segmentation; root maps contain 11,630 rows across these chapters. The active next chapter is Book 1, Chapter 22.


## User-directed Book 1 Word-for-word panel repair — Chapter 5 — 15 October 2026

Chapter 5 retains 66 contiguous verse cards and exactly three controls per verse. The **Word-for-word** control in every card contains the existing 608-row root map; all 62 supplied Śrīdhara entries are now included in that same control with their source Devanāgarī, IAST, and English rendering. Four no-commentary cards remain unchanged. The visible heading is “Śrīdhara translation,” and the text remains regular weight. The page description no longer attributes the English translation to Wilson. The 62 Śrīdhara pairings are currently passage-level and need lexical segmentation before Book 1 completion.

Validation: 66 verse IDs, 66 root WFW controls, 66 Transliteration controls, 66 Devanāgarī controls, 62 Śrīdhara labels, 62 Śrīdhara pairings inside WFW, 608 root rows, exactly 198 matched controls, no Wilson/Textual basis note in the public article.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `a2c09b6d94ac90c0b261e96388c0f598b9f06158`; numbered witness blob `12a6e637bc52bdae621f9609072aebe738ad7017`; Śrīdhara blob `4a1c71a07fa9b8b4553e46d9369eb4d9e9c1b8fc`; English cross-check blob `9da20ac2c3b5dcda8c995cc095b7c03db05b0cdd`.


## User-directed Book 1 Word-for-word panel repair — Chapter 6 — 15 October 2026

Chapter 6 has 42 contiguous verse cards and exactly three controls per verse. All 37 supplied Śrīdhara entries are included in their existing **Word-for-word** control alongside the root map, with source Devanāgarī, IAST, and the visible English translation. Five no-commentary cards remain. The visible label is “Śrīdhara translation.” All 42 cards now have Word-for-word, Transliteration, and Devanagari controls. Chapter 6's 37 Śrīdhara alignments are passage-level and still need lexical segmentation; the 258 existing root rows were retained.

Validation: 42 contiguous IDs, 42 root translations, 42 of each of the three controls, 37 labels and Śrīdhara pairings inside Word-for-word, five no-commentary cards, balanced divs, no Wilson or “Textual basis” note in the public article.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `89c109b6ba0ea96a63205a40158b4f73e82eef91`; numbered witness blob `9da984197682b4412dfc3f46378baeef3f510cf4`; Śrīdhara blob `973c1100189ce2a7998c99e085f6271fffd030b2`; English cross-check blob `fcaa97a0aa122626f351d8c8b7d8ccee3686959a`.


## User-directed Book 1 Word-for-word panel repair — Chapter 7 — 15 October 2026

Chapter 7 has 48 contiguous verse cards and exactly three controls per verse. All 37 supplied Śrīdhara entries are paired inside their existing **Word-for-word** control with the source Devanāgarī, IAST, and the displayed English translation. Eleven no-commentary cards remain. The visible label is “Śrīdhara translation.” These 37 pairings are passage-level and still need lexical segmentation; the 315 root rows were retained. The page has no public Wilson or “Textual basis” note.

Validation: 48 IDs, root translations, and each of the three controls; 37 Śrīdhara labels and WFW pairings; 11 no-commentary cards; balanced divs.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `624170f48f48bd15ded65e1ccce0b15310e4b0b5`; numbered witness blob `b58a0b4ec02a6426247ca17ba16cbb7ca7f4916b`; Śrīdhara blob `3ec99981ee33c49caf2c678a737210c250c2345a`; English cross-check blob `3ea1d03c07ee61d9933a5f814bb8b5693b315f38`.


## User-directed Book 1 Word-for-word panel repair — Chapter 8 — 15 October 2026

Chapter 8 has 32 contiguous verse cards and exactly three controls per verse. All 27 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 5 no-commentary cards remain. The visible label is “Śrīdhara translation.” The 27 pairings are passage-level and still need lexical segmentation; 253 existing root rows were retained. The public description no longer attributes the translation to Wilson.

Validation: 32 verse IDs, root translations, and each of the three controls; 27 Śrīdhara labels and pairings inside WFW; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `a6218b8a8fe3d942c3e690b84a7f059f1bfc6639`; numbered witness blob `9d629ac8b1ffa4d5fc80c18eb83b4d949c79e81a`; Śrīdhara blob `28d7701eabb0e38ab275ca3f9d1e3c4ddd6fb5ef`; English cross-check blob `a79e4ef29adce6ae70c66801fa24413b8091c9a1`.


## User-directed Book 1 Word-for-word panel repair — Chapter 9 — 15 October 2026

Chapter 9 has 149 contiguous verse cards and exactly three controls per verse. All 102 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 47 no-commentary cards remain. The visible label is “Śrīdhara translation.” These 102 pairings are passage-level and still need lexical segmentation; 1672 existing root rows were retained. The public description no longer attributes the translation to Wilson.

Validation: 149 verse IDs, root translations, and each of the three controls; 102 Śrīdhara labels and pairings inside WFW; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `81fc3acef8a692db6f86280c41d300eef988f285`; numbered witness blob `60253676a3437e2c458ffc33e47452e56461ea06`; Śrīdhara blob `7fab306d4de79f2b6160b3eac43a1180b16fa1ec`; English cross-check blob `deb2af835d90da4e5a3510868832ff42ca28f6f4`.


## User-directed Book 1 Word-for-word panel repair — Chapter 10 — 15 October 2026

Chapter 10 has 21 contiguous verse cards and exactly three controls per verse. All 13 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 8 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 243 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 21 IDs, root translations, and each of the three controls; 13 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `dac8bfa64a36fee35ddf3ad22a813949f40f2f26`; numbered witness blob `928c18a82ea89a9a09a1271745dffd7c887b919f`; Śrīdhara blob `d5c420a5ae35b2ddca611e81c429fd744e4a3380`; English cross-check blob `0431dabebcb907002fb339826c79f850f75c527d`.


## User-directed Book 1 Word-for-word panel repair — Chapter 11 — 16 October 2026

Chapter 11 has 57 contiguous verse cards and exactly three controls per verse. All 34 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 23 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 686 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 57 IDs, root translations, and each of the three controls; 34 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `99cb7be5e8dc29fab3278efeaca476240e9d6d6a`; numbered witness blob `8655f9fb2808772efcb6be144f8b8eac0d34023f`; Śrīdhara blob `43b9789f2e5ca9cd43b8c36edf2e44d83f32aa2b`; English cross-check blob `de1c6fc6aef2ca07fcd9ec38923b4466c4d66eeb`.


## User-directed Book 1 Word-for-word panel repair — Chapter 12 — 16 October 2026

Chapter 12 has 103 contiguous verse cards and exactly three controls per verse. All 59 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 44 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 1127 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 103 IDs, root translations, and each of the three controls; 59 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `1dd25be195442a479c767095ef6f633dad78a193`; numbered witness blob `bf008fc3238907d9f08f6ab96f4725cc35c5e63d`; Śrīdhara blob `a3662e00f307c22a82ece6dc30d1f71602876704`; English cross-check blob `0855626556bb082b4005e43e0d2b4af0b32566b4`.


## User-directed Book 1 Word-for-word panel repair — Chapter 13 — 16 October 2026

Chapter 13 has 95 contiguous verse cards and exactly three controls per verse. All 40 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 55 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 1130 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 95 IDs, root translations, and each of the three controls; 40 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `216b675eb4704fd9ef1157a7c411873540f5f701`; numbered witness blob `39c4bfbeb08d0479d2e22f5ae15b2228fe14a95d`; Śrīdhara blob `f932a96c9e4e62f94554216e4c3b5b137e28fcd4`; English cross-check blob `ce67ff9dae71965186de9567807d96c220087201`.


## User-directed Book 1 Word-for-word panel repair — Chapter 14 — 16 October 2026

Chapter 14 has 49 contiguous verse cards and exactly three controls per verse. All 30 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 19 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 524 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 49 IDs, root translations, and each of the three controls; 30 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `b70ca85ceaf9772668984598bc271f6ddb6dd36b`; numbered witness blob `a8545db2876fd82a27eeec2a3b143f4476f89952`; Śrīdhara blob `3beda04bc7be41e7675d8e4290e197c426f3249c`; English cross-check blob `5bbe3aea66167c13420b817c79061fe4d515c697`.


## User-directed Book 1 Word-for-word panel repair — Chapter 15 — 16 October 2026

Chapter 15 has 156 contiguous verse cards and exactly three controls per verse. All 102 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 54 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 1786 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 156 IDs, root translations, and each of the three controls; 102 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `39f12c475cf82e3363bcfaec28726f99a714e1fb`; numbered witness blob `a067d93fe25621fadffd7b3426e051c9b3b34746`; Śrīdhara blob `aa4555e1360e35a41a728ed89a8291938407fa27`; English cross-check blob `23c8812f1479e5a043713c0c609835c884b8603d`.


## User-directed Book 1 Word-for-word panel repair — Chapter 16 — 16 October 2026

Chapter 16 has 16 contiguous verse cards and exactly three controls per verse. All 4 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 12 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 201 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 16 IDs, root translations, and each of the three controls; 4 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `d71c097c2cad2fb5189e315a3eea2fd68d4d9698`; numbered witness blob `de6b070db8b47f4f29a2983ed98ef4bc9757b467`; Śrīdhara blob `28f92fe91cc60996aeb66b0879276e2df2ae0450`; English cross-check blob `a24bca6b0e9a1aebd5b41b38857554c8012fb6a0`.


## User-directed Book 1 Word-for-word panel repair — Chapter 17 — 16 October 2026

Chapter 17 has 91 contiguous verse cards and exactly three controls per verse. All 59 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 32 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 546 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 91 IDs, root translations, and each of the three controls; 59 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `3be42bfcb5ede84ca8ada055978fdd88adb259ec`; numbered witness blob `e1dbf0777601bef30b76e946f890b8f642926437`; Śrīdhara blob `5fa0212834a9d7507cb0278516871bbbfd0aecc1`; English cross-check blob `f55649492799aeaf6592200be00e33cbc8ede27c`.


## User-directed Book 1 Word-for-word panel repair — Chapter 18 — 16 October 2026

Chapter 18 has 43 contiguous verse cards and exactly three controls per verse. All 23 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 20 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 319 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 43 IDs, root translations, and each of the three controls; 23 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `4247989218affbd077c77bf960a0b09e3295da1d`; numbered witness blob `8777450e4dba39b5e270b7d3d32cdef8de92f5bd`; Śrīdhara blob `aae2db5c8cdd87060a6d5db61a7e36b18a7bb137`; no English cross-check file is present at the pinned upstream revision.


## User-directed Book 1 Word-for-word panel repair — Chapter 19 — 16 October 2026

Chapter 19 has 86 contiguous verse cards and exactly three controls per verse. All 53 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 33 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 1022 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 86 IDs, root translations, and each of the three controls; 53 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit `fc117aa4514dfd4e4840037aeb3ca825ba030b05`: mūla blob `bc63e2448277dcc0790db2f445b7b3d18eb4404f`; numbered witness blob `51c727faa692da6cc6764c87eb299085e506f7c0`; Śrīdhara blob `8799fe7c8745d6b135b25db5924bb2a845fd4ad1`; English cross-check blob `96fc014cd636f8f28591cb50334e9cfd05cdab76`.


## User-directed Book 1 Word-for-word panel repair — Chapter 20 — 16 October 2026

Chapter 20 has 39 contiguous verse cards and exactly three controls per verse. All 22 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 17 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 464 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 39 IDs, root translations, and each of the three controls; 22 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05: mūla blob 933bca3c6c89434e5c6da197bfec80440b2ac9b8; numbered witness blob 3190a2277be02951fad524c96c7a1982e4db70ca; Śrīdhara blob ac332a7076db4d0ebb1d965a209a7b9802ba0f80; English cross-check blob 75120bef826851429fff57461d6f912139b2fde9.


## User-directed Book 1 Word-for-word panel repair — Chapter 21 — 16 October 2026

Chapter 21 has 41 contiguous verse cards and exactly three controls per verse. All 24 supplied Śrīdhara entries appear inside their existing **Word-for-word** control with source Devanāgarī, IAST, and the visible English translation. 17 no-commentary cards remain. The visible label is “Śrīdhara translation.” These pairings are passage-level and still need lexical segmentation; 476 existing root rows were retained. The page description no longer attributes the translation to Wilson.

Validation: 41 IDs, root translations, and each of the three controls; 24 Śrīdhara labels and WFW pairings; balanced divs; no Wilson or “Textual basis” note.

Source pins at upstream commit fc117aa4514dfd4e4840037aeb3ca825ba030b05: mūla blob 18c1791300db9d2cdcd2b542fb99e997f723a168; numbered witness blob dea16ef42693026bc6c28a96a4271c7aa4f13caa; Śrīdhara blob f3306d685d30f0223e97f5e1e03e751e4600e6ae; English cross-check blob 5dc0209c0e5cb46981bd50e4542800a49ad4ddf4.
