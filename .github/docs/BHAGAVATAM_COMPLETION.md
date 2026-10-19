# Vivekadrishti Śrīmad-Bhāgavatam with Śrīdhara Bhāṣya — Completion Workflow

> **Display and translation correction (2026-10-03):** Removed fifteen editorial absence notes from the English commentary checkpoint; rewrote twelve local commentary renderings that attributed text to “Śrīdhara says/asks” or a joint note; revised the Canto 3.19.35 attribution wording in both data sources; and cleared five source-absence notes from literal fields. The reader now suppresses the named-attribution pattern and known placeholders, and all twelve canto shells use refreshed cache versions. See [the display audit](../maintenance/audit/bhagavatam-commentary-display-audit-2026-10-03.md). This cleanup does not certify every chapter’s English or Sanskrit.

> **Canto 11 status correction (2026-09-20):** The previous COMPLETE/LIVE_VERIFIED labels were not supported by a full verse-by-verse comparison. See [the deterministic mapping audit](../maintenance/audit/canto11/automated-summary.md) and [the evidentiary review](BHAGAVATAM_CANTO11_AUDIT_2026-09-20.md). All 31 chapters remain under verification. In particular, the pinned 11.23 numbering differs from the displayed VedaBase mirror from the mid-chapter onward. Do not reassert completion from file counts or this historical snapshot.


> **Project-wide audit correction (2026-09-22):** A fresh audit of every reader-linked data file found that the prior completion labels were too broad. Canto 3 initially contained 3,542 generated filler gloss rows (“contextual literal sense of …”) across 1,321 records; Canto 3.1–3.18 now have real IAST phrase-level word-for-word pairs; Canto 3.5, 3.6 and 3.18 retain explicit pinned-source gaps; 1,729 generated filler rows remain to repair in Canto 3; the un-wired Canto 4 cache contains 3,216 such rows across 1,104 records; Canto 11 still requires full verse alignment verification; and Canto 10 has now been rechecked: six intact missing ranges were repaired, while four corrupt pinned-source rows remain explicitly tracked as source gaps (10.64.13, 10.68.30, 10.68.32, 10.77.34). Canto 12 passes the structural/source audit. These cantos must not be called complete or released until their real Sanskrit-first glosses are supplied and re-verified.

> **Current Contents audit correction (2026-09-26):** [Read the Contents audit](../maintenance/audit/bhagavatam-contents-audit-2026-09-26.md). The public Contents has 196 links across Cantos 1, 2, 3, 10, 11, and 12. Translation checks remain open in chapters recorded in the audit.

> **Canto 3.30 source and gloss review (2026-09-29):** The pinned Śrīdhara witness contains ten commentary-bearing ranges and 21 explicit `न व्याख्यातम्` markers in verses 1–34. The reader labels those markers as source-declared absences; it does not invent commentary. Phrase-level English glosses for all ten source-bearing ranges were rechecked. Corrections include `उद्वहनाधिना` at 3.30.7 and `द्वाभ्यां वा` at 3.30.24, which refers to two muhūrtas, not two messengers. This review does not certify all 196 linked chapters or the whole Canto 3 corpus; live rendering remains unverified.

## Mission

You are the implementation AI for the Vivekadrishti Śrīmad-Bhāgavatam reader:

https://krishnavyasmuni.github.io/vivekadrishti/pages/bhagavatam-with-sridhara-bhasya/

Finish the Śrīmad-Bhāgavatam chapter by chapter inside the existing website. For
each chapter, preserve the exact supplied Sanskrit, produce independent
Sanskrit-first transliteration and English word-for-word material, translate the
supplied Śrīdhara Sanskrit independently, preserve the existing reader design,
update the real Contents page only after the chapter is complete, commit the
work to GitHub, and verify the committed result.

This README is the standing handoff for every AI. Read it before doing any
Bhāgavatam work. The repository is the source of truth, not an old chat message,
a local assumption, or a previous AI claim.

The user’s core rule is:

- use the supplied reference sources to check reading, segmentation, grammar,
  transliteration, and sense;
- write the site’s own translation and word-for-word material from the Sanskrit;
- never silently copy another translator’s English into the AI’s own fields;
- preserve exact source Sanskrit and exact Śrīdhara Sanskrit;
- never publish a partial or guessed chapter as complete.

## Copy/paste handoff for a new AI

Before editing:

1. Fetch this README from the repository’s current default branch.
2. Fetch the current repository tip, the Bhagavatam Contents page, the reader
   manifest, the target data files, and the current reader JavaScript.
3. Recalculate progress from the current files. Do not trust this README’s
   snapshot if the repository tip is newer.
4. Select the first incomplete or unverified chapter in canonical Canto order.
5. Complete one entire chapter, verify it, and only then move to the next.

The exact continuation instruction is:

~~~text
Read BHAGAVATAM_COMPLETION.md first. Inspect the current GitHub tip,
Contents page, reader manifest, source paths, and progress data. Find the first
chapter that is not fully source-checked, schema-valid, committed, and
post-commit verified. Finish that one chapter only. Use Wisdomlib as a
cross-check, use the pinned VishvAsa/Vasuki corpus for the exact main Sanskrit
and Śrīdhara Sanskrit, translate independently, keep the existing Bhagavatam
reader design unchanged, and do not add the chapter to Contents until the full
release gate passes.
~~~

## Current code map

The current Bhagavatam implementation is data-driven. Do not assume that the
article shell itself contains all chapter text.

| Function | Current repository location |
|---|---|
| Bhagavatam Contents page | pages/bhagavatam-with-sridhara-bhasya/index.html |
| Canto reader shells | articles/srimad-bhagavatam-canto-01-sridhara-svami/ through articles/srimad-bhagavatam-canto-12-sridhara-svami/ |
| Main dynamic renderer | assets/js/bhagavatam-sridhara-reader.js |
| Commentary/clarity layer | assets/js/bhagavatam-sridhara-clarity.js |
| Canonical source/path manifest | assets/data/bhagavatam-sridhara-reader-manifest.json |
| Source-check checkpoint ledger | assets/data/bhagavatam-sridhara-checkpoints.json |
| Tracked Śrīdhara English checkpoints | assets/data/bhagavatam-sridhara-english-checkpoints.json |
| Reviewed word-for-word data | assets/data/bhagavatam-sridhara-wfw-reviewed.json and related canto/range files |

The reader manifest currently describes 12 Cantos and 335 chapters:

- Canto 1: 19 chapters
- Canto 2: 10 chapters
- Canto 3: 33 chapters
- Canto 4: 31 chapters
- Canto 5: 26 chapters
- Canto 6: 19 chapters
- Canto 7: 15 chapters
- Canto 8: 24 chapters
- Canto 9: 24 chapters
- Canto 10: 90 chapters
- Canto 11: 31 chapters
- Canto 12: 13 chapters

The manifest, not a hand-written Contents list, is the canonical inventory.

## Baseline state at the last audit

The current release ledger has been cleaned to retain only the verified public Cantos 1, 2, and 11. The manifest remains the canonical 335-chapter inventory, but unverified material is not public:

~~~yaml
repository: krishnavyasmuni/vivekadrishti
branch: main
last_audited_data_commit: 6bb885cd3ef288ff00c20829ad3d1f62b4176802
contents_file: pages/bhagavatam-with-sridhara-bhasya/index.html
reader_manifest: assets/data/bhagavatam-sridhara-reader-manifest.json
manifest_blob_sha: ea31b3c412df39343653569463f48adfb8ed2db0
current_contents_link_groups: 1.1–1.8, 2.1–2.10, 3.1–3.33, 10.1–10.90, 11.1–11.31, 12.1–12.13
  - 1.1-1.19
  - 2.1-2.10
  - 3.1-3.33
  - 10.1-10.90
  - 11.1-11.31
visible_contents_link_count: 196
manifest_chapter_count: 335
latest_verified_release: "3.25"
latest_release_status: LIVE_VERIFIED
latest_release_source_blob_sha: ebbe2b3712054ab23c8f419e6845fe2cf4941e2f
latest_release_expected_verses: 44
latest_release_sridhara_blocks: 38
latest_release_wfw_entries: 39
latest_release_no_commentary: 1
canto_1_audit_status: COMPLETE
canto_1_gap_cleanup: 1.2.1, 1.2.3-1.2.5
canto_2_audit_status: COMPLETE
canto_2_verified_chapters: 2.1-2.10
canto_2_source_ranges: 371
canto_3_audit_status: FAILED_PLACEHOLDER_GLOSSES_REMAINING
canto_3_verified_chapters: 3.1-3.33
canto_3_source_ranges: 1288
canto_3_source_blocks: 860
canto_3_no_commentary_records: 420
canto_3_repaired_chapters: 3.1–3.18 (3.5, 3.6 and 3.18 retain explicit pinned-source gaps)
canto_3_source_checked_with_gap: 3.5 (pinned Śrīdhara source gap at 3.5.51; supplementary block used for 3.5.37); 3.6 (pinned Śrīdhara source gap at 3.6.22); 3.18 (empty pinned Śrīdhara block at 3.18.16)
canto_3_placeholder_wfw_rows_remaining: 905
canto_3_literal_placeholder_records_remaining: 187
canto_3_pseudo_word_for_word_pairs_remaining: 0
canto_3_lexical_reaudit_chapters: required for source-to-phrase QA across existing chapters
canto_3_lexical_audit_status: FAILED — 905 filler WFW rows and 187 missing commentary translations remain in 3.26–3.33; earlier phrase/source QA still required
canto_4_audit_status: FAILED_PLACEHOLDER_GLOSSES
canto_4_cached_records: 1104
canto_4_placeholder_wfw_rows: 3216
canto_10_audit_status: SOURCE_CHECKED_WITH_4_SOURCE_GAPS
canto_10_verified_chapters: 10.1-10.90
canto_10_source_ranges: 3768
canto_10_source_blocks: 2607
canto_10_wfw_entries: 3768
canto_10_no_commentary_records: 989
canto_10_post_repair_records_checked: 3748
canto_10_post_repair_wfw_rows_checked: 10159
canto_10_placeholder_rows: 0
canto_10_repaired_ranges: 10.52.12–10.52.14, 10.55.19, 10.60.8, 10.69.24, 10.74.43, 10.87.42–10.87.43
canto_10_missing_wfw_ranges: none in intact source rows
canto_10_source_gap_ranges: 10.64.13, 10.68.30, 10.68.32, 10.77.34
canto_10_form_marker_rows: 0
canto_10_forbidden_filler_rows: 0
canto_11_audit_status: FAILED_FULL_VERIFICATION
canto_11_verified_chapters: none under the full-verse standard
canto_11_source_ranges: 1368
canto_11_no_commentary_ranges: 11.1.20, 11.2.3, 11.3.22, 11.4.23, 11.5.17, 11.5.23, 11.5.51, 11.6.2–11.6.3, 11.6.6, 11.6.7, 11.6.13, 11.6.14, 11.6.15, 11.6.20, 11.6.23, 11.6.24, 11.6.25, 11.6.26, 11.6.27, 11.6.28, 11.6.31, 11.6.32, 11.6.33, 11.6.34, 11.6.39, 11.6.40–11.6.41, 11.6.43, 11.6.44, 11.6.47, 11.6.50, 11.7.2, 11.7.6, 11.7.13, 11.7.15, 11.7.25, 11.7.31, 11.7.56, 11.7.59, 11.7.62, 11.7.65, 11.7.69–11.7.70, 11.7.73, 11.13.20, 11.14.40, 11.16.13, 11.16.15, 11.17.8, 11.17.18, 11.17.27, 11.17.46, 11.18.23, 11.19.12, 11.23.8, 11.23.12, 11.23.37, 11.25.10, 11.26.30, 11.29.28, 11.29.30, 11.30.25, 11.30.34–11.30.37, 11.30.39, 11.30.41, 11.30.43, 11.30.45, 11.30.47, 11.31.4, 11.31.19, 11.31.20, 11.31.23–11.31.24, 11.31.25–11.31.26
canto_12_audit_status: COMPLETE
canto_12_verified_chapters: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10, 12.11, 12.12, 12.13
canto_12_source_ranges: 507
canto_12_sridhara_blocks: 441
canto_12_no_commentary_ranges: 66
next_resume_target: CANTO_3_CHAPTER_22_LIVE_VERIFY_AND_RELEASE
resume_note: Whole-Canto-3 audit is underway. Mechanical IAST and no-commentary sentinel normalization was applied across all 33 chapter data files. Canto 3.22 is source/WFW complete but awaits live verification; 3.26–3.33 still contain 905 filler pairs and 187 missing full commentary translations. Next action: verify and release 3.22, then finish 3.26 in canonical order. No source Sanskrit or existing chapter content was deleted.
release_rule: "A visible link is not proof that the chapter is complete."
~~~

The release marker above is the handoff point for the next AI. Before changing
anything, re-read the current branch and confirm that the marker still matches
the repository. After each chapter release, update the marker to the next
canonical chapter.

The chapter workflow is deliberately simple: use the exact Sanskrit and
Śrīdhara block from the pinned VishvAsa/Vasuki source, use the matching
Wisdomlib chapter as an English and lexical cross-reference, then write the
site’s own Sanskrit-first transliteration and word-for-word meanings. Wisdomlib
prose is never copied. Preserve combined source ranges exactly when the pinned
source groups multiple verses.

## Source lock

### 1. Primary Sanskrit and Śrīdhara corpus

Use the pinned VishvAsa/Vasuki corpus recorded in the reader manifest:

https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIya-prastutiH

Required upstream commit:

~~~text
100560de6c9f68c2875097d40a2012a84c784179
~~~

Primary source root:

~~~text
bhAgavatam/gauDIya-prastutiH
~~~

This pinned corpus is the authority for:

- the exact main Sanskrit Devanāgarī;
- the exact Śrīdhara Svāmī Sanskrit;
- source verse numbering;
- commentary-to-verse mapping;
- source file paths.

Use the manifest’s exact Canto/chapter path. Never guess a filename from a
chapter title. Some directories use descriptive transliterated filenames,
some use numeric filenames, Canto 3 contains a merged source range for
chapters 24–33, and Canto 10 uses a special cached/range arrangement.

Do not silently switch to the latest upstream branch. If the source commit must
change, record the new SHA, the reason, and the exact affected paths.

### 2. Wisdomlib reference requested by the user

Use the user-provided Bhagavata Purāṇa reference:

https://www.wisdomlib.org/hinduism/book/the-bhagavata-purana

The supplied link is an online reference book page rather than a single PDF
file. Use the matching Wisdomlib chapter page for each chapter. If a separate
PDF edition is later supplied, record its exact filename, edition, page, and
source URL instead of silently mixing editions.

Wisdomlib is a reference and comparison aid. Use it to check:

- chapter and verse division;
- Sanskrit display and reading;
- transliteration;
- word segmentation and lexical clues;
- English sense and clause coverage;
- notes that expose a possible grammatical or textual issue.

Read the Sanskrit first. Draft the site’s own transliteration and English
word-for-word material before consulting Wisdomlib’s English. Then use
Wisdomlib to catch an omitted word, wrong clause boundary, name, agent, object,
or major sense error. Do not copy Wisdomlib’s distinctive English sentences,
paragraphs, notes, or commentary into the site’s independent translation.

If Wisdomlib and the pinned VishvAsa source differ, preserve the pinned source
verbatim and record the discrepancy narrowly. Do not harmonize the source by
guessing.

### 3. Existing English/reference contract

The current reader manifest says that the existing main English, transliteration,
and synonyms come from the Bhaktivedanta VedaBase Advanced View and its pinned
VishvAsa mirror:

https://vedabase.io/en/library/sb/{canto}/{chapter}/advanced-view/

The corresponding pinned mirror is under:

~~~text
bhAgavatam/gauDIyo_abhaya-charaNaH
~~~

Do not silently replace the project’s established reference-English field with
Wisdomlib. Wisdomlib is the user-approved cross-check. Preserve the existing
reader contract unless the user explicitly requests a separate source migration.

When the reader displays reference English, label it as reference material.
When the AI writes a word-for-word or literal field, that field must be the
AI’s independent Sanskrit-first work.

### 4. Optional independent Śrīdhara comparison

The manifest records this comparison edition:

https://archive.org/details/Bhagavata_with_Sridhari_Tika_Ramtej_Pandey_1949_PanditPustakalay

Use it only to investigate a doubtful Śrīdhara reading. Treat OCR as a checking
aid, not as a silent correction layer. Prefer the scan image when OCR and the
pinned VishvAsa source disagree.

## Design and code law

The Bhagavatam Contents page already follows the established Viṣṇu Purāṇa
Contents design. “Identical” means preserve the visual system while using
Bhāgavatam content.

Preserve exactly:

- the existing Contents page structure and responsive behavior;
- the current typography, colours, borders, spacing, and narrow Contents rail;
- the current Book/Canto labels;
- the existing Canto article shell and dynamic reader;
- the current verse-panel hierarchy and controls;
- existing data attributes, IDs, route conventions, and query/cache strategy;
- mobile and desktop behavior.

Do not paste a new static full chapter into a reader shell that is meant to load
data dynamically. Do not copy Viṣṇu Purāṇa HTML into the Bhagavatam reader merely
because the visual design matches. Use the Bhagavatam reader’s existing schema
and renderer.

Do not change unrelated pages, CSS, artwork, navigation, completed books, or
source files. Do not redesign the Contents page, add a second Contents rail,
introduce generic Markdown styling, or add temporary debugging output.

The current Contents script uses Canto objects and a count to create links of
the form:

~~~text
/vivekadrishti/articles/srimad-bhagavatam-canto-XX-sridhara-svami/#chapter-N
~~~

Only change the relevant Canto count or Canto entry after that chapter has
passed the full release gate. A Contents link is a publication claim.

## What one completed verse must contain

Follow the current reader schema rather than inventing a new JSON shape. The
semantic record for each verse must contain, either directly or through the
existing renderer’s fields:

1. Exact main Sanskrit Devanāgarī from the pinned source.
2. Accurate IAST/transliteration of that exact main Sanskrit.
3. The project’s required reference English, kept in its established reference
   field when present.
4. An independent AI main-text word-for-word rendering.
5. An independent AI main-text literal/clear rendering only if the existing
   schema and reader support that field.
6. Exact Śrīdhara Sanskrit Devanāgarī from the pinned source.
7. Accurate IAST/transliteration of the exact Śrīdhara Sanskrit.
8. Independent Śrīdhara word-for-word English.
9. Faithful independent English translation of the supplied Śrīdhara passage.
10. Exact source path, source commit, verse number, and any narrow source note
    required to explain an ambiguity or merged commentary range.

A reference translation is not the same thing as the AI’s own translation.
Transliteration is not translation. Word-for-word is not a free devotional
paraphrase.

If a verse genuinely has no Śrīdhara commentary, use the current reader’s exact
sentinel as defined in the current JavaScript. At the current audit this is:

~~~text
No commentary
~~~

Do not change the sentinel’s punctuation or wording without checking and
updating the reader contract consistently.

## Sanskrit, transliteration, and word-for-word rules

Preserve source Devanāgarī verbatim. Do not modernize spelling, normalize
punctuation for preference, silently correct a source reading, or replace
Śrīdhara with a summary.

IAST must be generated from the exact Sanskrit that is displayed. Use standard
diacritics, including:

~~~text
ā ī ū ṛ ṝ ḷ ṅ ñ ṭ ṭh ḍ ḍh ṇ ś ṣ ṃ ḥ
~~~

For every main-text verse:

- identify every word or necessary phrase unit;
- preserve compounds, sandhi, case relations, tense, voice, negation,
  vocatives, connectives, agents, objects, and implied relationships;
- show a narrow lexical meaning before a smoother clause meaning;
- use phrase units when a compound cannot honestly be translated as isolated
  words;
- do not hide a difficult grammatical relation behind a polished paraphrase;
- compare with Wisdomlib and the project’s reference English only after drafting;
- keep uncertainty explicit and local if the Sanskrit is genuinely ambiguous.

For Śrīdhara:

- read the complete source commentary block before assigning it to verses;
- preserve the exact commentary range;
- translate grammatical analysis, derivations, alternate readings, quotations,
  speaker references, and qualifications;
- write the word-for-word rendering from the Śrīdhara Sanskrit, not from the
  main verse’s English;
- write the faithful paragraph translation from the supplied commentary, not
  from a generic explanation.

Never substitute any of the following for a real gloss:

~~~text
Words
key term
important word
lexical term
inflected form
sense
literal meaning
meaning unavailable
commentary unavailable
explanation omitted
the commentator explains
generic filler
TODO
TBD
coming soon
translation pending
~~~

Do not add invented narration such as “this verse discusses,” “the commentator
now explains,” or a made-up summary. Preserve real source speaker labels when
they occur in the source.

## Release statuses

Use these meanings when recording progress:

| Status | Meaning |
|---|---|
| NOT_STARTED | No reliable chapter-level work exists. |
| IN_PROGRESS | Work exists but required source fields or ranges are unfinished. |
| SOURCE_LOCKED | Exact source files and upstream commit have been recorded. |
| SOURCE_CHECKED | Sanskrit, verse count, and commentary mapping were checked. |
| DRAFT_CHECKPOINTED | A verified working range exists, but the chapter is not public. |
| COMPLETE | Every required field for the whole chapter passes the audit. |
| LIVE_VERIFIED | The completed chapter was committed, Contents was updated, and the committed result was fetched and checked. |

Only LIVE_VERIFIED chapters may be added to the main Contents page. A
checkpoint, a partial data file, a standalone experiment, or a chapter shell is
not a completed chapter.

## Optimized chapter workflow

The fast path is one source read, one alignment map, batched translation, one
complete audit, one release commit, and immediate verification. Speed never
permits a partial, guessed, or misaligned publication.

### Step 1 — Recalculate state

Fetch the latest:

- this README;
- repository tip and current branch;
- Contents file;
- reader manifest;
- Bhagavatam reader and clarity JavaScript;
- target Canto shell;
- existing checkpoint/reviewed data for the target;
- latest relevant commit.

Compare the current tip with the baseline in this README. If it changed, trust
the files and commits, not the baseline snapshot.

### Step 2 — Select exactly one target

Walk the manifest in canonical order: Canto 1, chapter 1 through the end of
Canto 12.

For each chapter, ask:

1. Does the exact source path exist at the pinned source commit?
2. Is every source verse accounted for?
3. Is the Śrīdhara block mapped to the correct verse or range?
4. Are all required fields complete in the current reader schema?
5. Is the chapter-level record marked complete rather than partial?
6. Is the chapter in Contents only if it is actually release-ready?
7. Was the last committed version fetched and verified?

The first chapter for which any answer is no is the next target. If partial work
already exists for that chapter, finish or reconcile it; do not skip ahead.

Never work on two chapters simultaneously.

### Step 3 — Fetch sources once

Read-only source retrieval may be parallelized:

- the exact pinned VishvAsa/Vasuki source file;
- the matching Wisdomlib chapter page;
- the existing reference-English source or pinned mirror;
- the optional independent scan only if a reading needs comparison.

Cache the exact source text and URLs for the chapter. Do not repeatedly dump
large source files into the conversation or use a moving upstream branch.

### Step 4 — Build an alignment map before translating

Create an internal table with:

~~~text
canto.chapter.verse
main source path and source verse marker
exact main Sanskrit
exact Śrīdhara source path
Śrīdhara verse/range marker
reference-English location
Wisdomlib chapter/verse location
status
~~~

Use explicit markers such as the source’s verse number. Handle merged source
ranges exactly as the manifest describes. If one commentary block covers a range,
do not fabricate separate commentary statements for individual verses.

If numbering, source reading, or commentary alignment is genuinely ambiguous,
stop and record the exact affected verse numbers. Do not silently shift text.

### Step 5 — Translate the main verse independently

For each verse, in this order:

1. Read the exact Devanāgarī.
2. Segment sandhi and compounds only as needed for analysis; do not alter the
   displayed source.
3. Produce IAST from the exact displayed Sanskrit.
4. Produce the AI’s word-for-word meanings from Sanskrit.
5. Produce any supported literal/clear rendering.
6. Check the result against Wisdomlib and the project’s reference English for
   omissions and major sense errors.
7. Correct the AI draft without copying another translator’s prose.

### Step 6 — Translate Śrīdhara independently

For the exact supplied Śrīdhara passage:

1. preserve the Devanāgarī;
2. map it to the correct verse or verse range;
3. produce IAST from that exact passage;
4. translate every phrase word-for-word;
5. translate the complete passage faithfully into English;
6. preserve grammatical explanation and alternate readings;
7. use the exact no-commentary sentinel only when the source has no commentary.

Do not summarize a full bhāṣya passage as “the commentator explains.”

### Step 7 — Use 20-verse safety checkpoints

For chapters longer than 20 verses, checkpoint ranges such as:

~~~text
1.18.1–1.18.20
1.18.21–1.18.40
1.18.41–1.18.end
~~~

After each range:

- count source verses and generated records;
- check verse keys and source markers;
- check that main Sanskrit, IAST, main word-for-word, Śrīdhara mapping,
  Śrīdhara IAST, and required English fields are present;
- search for placeholders and accidental copied prose;
- record the exact range status in the existing progress/checkpoint mechanism.

A checkpoint is a resume aid, not a public release. Do not add a partial range
to the public Contents page. If the repository uses a non-live working branch,
checkpoint there and verify the checkpoint commit before continuing. Never let a
draft checkpoint make the public reader claim that the chapter is complete.

### Step 8 — Write through the existing data path

Use the current Bhagavatam reader schema and data files. Prefer extending the
existing reviewed/checkpointed data pattern over creating a new parallel format.

Do not:

- paste full chapter HTML into a dynamic shell;
- duplicate source data in multiple competing files;
- create a new renderer for one chapter;
- rename existing keys for convenience;
- overwrite unrelated reviewed entries;
- mark partial ranges as complete;
- alter the template to conceal missing translation.

### Step 9 — Run the complete release audit

Before any public Contents update, pass every check in the validation section
below. A chapter is not complete because an AI produced text; it is complete
only when the data, source mapping, reader, commit, and links all pass.

### Step 10 — Release one complete chapter

Only after the whole chapter passes:

- update the relevant canonical data/checkpoint file;
- update the Contents Canto count or entry;
- keep the existing Contents styling unchanged;
- include only the chapter-specific files required for this release;
- create one clear chapter-specific commit on the current main workflow.

Do not bundle unrelated chapters or design changes.

### Step 11 — Verify immediately

Fetch the new commit and the changed files again. Confirm:

- the commit exists;
- the chapter data is the committed version;
- the source paths and SHA are present;
- all verse records are present;
- the Contents link points to the exact existing route;
- the reader still loads the chapter;
- no unrelated file changed.

Then mark the chapter LIVE_VERIFIED and recalculate the next target from the
repository.

## Pre-commit validation checklist

### Source and alignment

- exact pinned source commit is recorded;
- exact main Sanskrit path is recorded;
- exact Śrīdhara path is recorded;
- every source verse marker is present exactly once;
- source verse count equals generated verse-record count;
- merged commentary ranges are represented accurately;
- no commentary is under the wrong verse;
- no verse is omitted, duplicated, or silently renumbered;
- Wisdomlib reference URL identifies the matching chapter;
- differences between sources are recorded rather than silently harmonized.

### Translation and transliteration

- every main Sanskrit field is non-empty and source-exact;
- every main IAST field is derived from the displayed Sanskrit;
- every main word-for-word field covers every word or honest phrase unit;
- every main reference-English field follows the existing reader contract;
- every Śrīdhara Sanskrit field is source-exact;
- every Śrīdhara IAST field is derived from the displayed Śrīdhara Sanskrit;
- every Śrīdhara word-for-word field covers the supplied commentary;
- every Śrīdhara English field translates the complete supplied commentary;
- absent commentary uses exactly the current sentinel;
- ambiguity is stated narrowly instead of guessed away;
- no other translator’s prose has been presented as the AI’s own work;
- no forbidden placeholder or generic narration remains.

### Schema and reader

- JSON parses;
- all keys match the current reader schema;
- chapter and verse identifiers are unique and sequential;
- manifest paths resolve;
- target Canto shell still loads;
- reader JavaScript and clarity behavior are unchanged unless a justified,
  separately verified fix is required;
- no duplicate data source overrides a newer reviewed record;
- no stale cache-busting reference hides a changed asset.

### UI and Contents

- Contents uses the existing Vishnu-style visual system;
- only a complete chapter is added;
- the Canto count is correct;
- the route and chapter anchor resolve;
- desktop and mobile layout remain unchanged;
- no new rail, pagination system, colors, or unrelated redesign appears;
- no unrelated article, CSS, image, or navigation file changed.

## GitHub checkpoint protocol

Before writing:

1. Fetch the latest file contents and blob SHAs.
2. Refetch them immediately before the write.
3. If a SHA changed, stop and re-read the latest version.
4. Do not run writes to the same path in parallel.
5. Preserve unrelated user changes.
6. Use one chapter-specific commit for a final public release.

After writing:

1. Fetch the commit details.
2. Fetch every changed file from the new commit.
3. Re-run the structural and content counts.
4. Confirm the new Contents link and chapter route.
5. Confirm the fetched content equals what was committed.
6. Confirm no unrelated files changed.
7. Record the direct commit URL and next resume target.

Never invent a commit link. Never say a chapter is live because generation
finished. If GitHub or the live site cannot be verified, report the exact
blocker and leave the chapter out of the public Contents claim.

## Completion report format

Use this format after a verified release:

~~~text
Chapter {CANTO}.{CHAPTER} is published and verified.

Chapter:
{title and exact route}

Commit:
{direct GitHub commit URL}

Source:
- pinned repository commit: {SHA}
- main Sanskrit path: {exact path}
- Śrīdhara path: {exact path}
- Wisdomlib reference: {exact chapter URL}

Verified:
- expected source verses: {number}
- verse records: {number}
- main Sanskrit fields: {number}
- main IAST fields: {number}
- main word-for-word fields: {number}
- Śrīdhara Sanskrit fields: {number}
- Śrīdhara IAST fields: {number}
- Śrīdhara word-for-word fields: {number}
- Śrīdhara English fields: {number}
- exact no-commentary fields: {number}
- placeholders found: 0
- duplicate or missing verses: 0
- JSON/schema validation: passed
- Contents route validation: passed
- committed files re-fetched: yes
- live reader verification: yes
- unrelated files changed: no

Main Contents updated: yes

Unresolved source or translation issue:
{none, or exact verse and issue}

Next resume target:
{next incomplete chapter, recalculated from repository}
~~~

## Hard prohibitions

Never:

- trust an old chat state over the current repository;
- use a moving upstream source without recording its commit;
- guess a source filename or commentary mapping;
- publish a partial chapter as complete;
- add an unfinished chapter to Contents;
- invent Sanskrit, IAST, word meanings, or Śrīdhara commentary;
- copy Wisdomlib, VedaBase, or another translator’s English into the AI’s own
  word-for-word field;
- replace exact source Sanskrit with a preferred spelling;
- summarize Śrīdhara where a literal translation is required;
- silently split or merge commentary ranges;
- replace the current no-commentary sentinel;
- create a competing data schema or one-off renderer;
- redesign the established Vishnu-style Contents page;
- change unrelated files;
- overwrite newer work with a stale SHA;
- run multiple writes to the same path in parallel;
- claim publication without a real commit and post-commit verification.

## Definition of done

The Bhagavatam project is finished only when all manifest chapters have a
complete source-bound record in the existing reader schema, every main verse and
Śrīdhara passage has accurate transliteration and independent word-for-word
English, every chapter has passed the full validation audit, the real Contents
page lists only LIVE_VERIFIED chapters, every release has a verified
chapter-specific commit, and the final repository state has no unresolved
placeholders, omissions, misalignments, or unrecorded source substitutions.
