# Bhagavad Gītā reader — complete replication and handoff guide

Status: all 18 Bhagavad Gītā chapter shells now use the completed Chapter 1 reader template. The shared renderer is designed for 701 visible verse cards, one card per verse, with the pinned Sanskrit, transliteration, source English translation, word-for-word panel, and Śrīdhara panels.

Live entry points:

- https://krishnavyasmuni.github.io/vivekadrishti/pages/bhagavad-gita/
- https://krishnavyasmuni.github.io/vivekadrishti/articles/bhagavad-gita-chapter-1/
- https://krishnavyasmuni.github.io/vivekadrishti/articles/bhagavad-gita-chapter-2/
- through chapter 18 at the same path pattern

This file is the handoff contract. A new contributor or AI agent should read it before changing any Gītā chapter.

## 1. What the finished reader must look like

Every Gītā chapter is a shell plus the same shared runtime:

- one HTML shell at articles/bhagavad-gita-chapter-N/index.html;
- one root element with data-gita-chapter="N";
- one verse article per visible verse, never a range heading such as BG 1.29–1.31;
- one stable id per card: gita-N-1, gita-N-2, and so on;
- the same three collapsed controls on every card:
  - Word-for-word
  - Transliteration
  - Śrīdhara Sanskrit
- the English translation directly below the Sanskrit, with source ranges shown once and linked from each included verse card;
- the Śrīdhara commentary section below the controls;
- chapter navigation with All chapters and Previous/Next chapter pills;
- no textual-basis/source explanation inserted into the reader UI.

The controls must be closed on first load. The word-for-word control must exist on every card, even when the pinned source record has no separate word-meaning text. In that case the panel says that no separate word-for-word meaning is supplied; it must not invent a translation.

## 2. The shared Chapter 1 template

The Chapter 1 shell is the canonical HTML template for all chapters. Its asset order is:

1. site.css
2. bhagavad-gita.css
3. gita-bhavishya-exact.css
4. site.js
5. bhagavad-gita.js
6. bhagavad-gita-sridhara-all.js
7. gita-bhavishya-exact.js

The current cache-busted asset versions in the shells are:

- site.js?v=20260918-gita-template-1
- bhagavad-gita.css?v=20260918-gita-all-chapters-1
- gita-bhavishya-exact.css?v=20260918-gita-all-chapters-1
- bhagavad-gita.js?v=20260929-source-alignment-1
- bhagavad-gita-sridhara-all.js?build=20260929-commentary-fix-1
- gita-bhavishya-exact.js?v=20260918-ch1-nav-commentary-2

Do not add the old chapter-specific bhagavad-gita-sridhara-tools.js to later chapters. Do not add the old inline gita-bhavishya-inline-v3.js. The all-chapter Śrīdhara overlay is the single overlay used by every chapter.

When cloning the shell for a new chapter, change only:

- the data-gita-chapter value;
- the chapter number in the title, description, and static heading;
- the conventional chapter name in the static subtitle.

The renderer then loads the correct chapter from the chapter number. Do not paste verse text into the HTML shell.

## 3. Chapter names and verse counts

The names below are the Sanskrit chapter names used by this site.

| Chapter | Traditional name | English gloss | Verses |
|---:|---|---|---:|
| 1 | Arjuna Viṣāda Yoga | Arjuna’s Despondency | 47 |
| 2 | Sāṅkhya Yoga | The Yoga of Knowledge | 72 |
| 3 | Karma Yoga | The Yoga of Action | 43 |
| 4 | Jñāna Karma Sannyāsa Yoga | Knowledge and Renunciation of Action | 42 |
| 5 | Karma Sannyāsa Yoga | The Yoga of Renunciation | 29 |
| 6 | Ātma Saṃyama Yoga | The Yoga of Meditation | 47 |
| 7 | Jñāna Vijñāna Yoga | Knowledge and Realization | 30 |
| 8 | Akṣara Brahma Yoga | The Imperishable Brahman | 28 |
| 9 | Rāja Vidyā Rāja Guhya Yoga | Royal Knowledge and Royal Secret | 34 |
| 10 | Vibhūti Yoga | Divine Glories | 42 |
| 11 | Viśvarūpa Darśana Yoga | The Vision of the Universal Form | 55 |
| 12 | Bhakti Yoga | Devotion | 20 |
| 13 | Kṣetra Kṣetrajña Vibhāga Yoga | The Field and the Knower | 35 |
| 14 | Guṇatraya Vibhāga Yoga | The Three Guṇas | 27 |
| 15 | Puruṣottama Yoga | The Supreme Person | 20 |
| 16 | Daivāsura Sampad Vibhāga Yoga | Divine and Demonic Qualities | 24 |
| 17 | Śraddhātraya Vibhāga Yoga | The Threefold Faith | 28 |
| 18 | Mokṣa Sannyāsa Yoga | Liberation through Renunciation | 78 |

The total is 701 visible verses. If a source count differs from this table, stop and audit the source before changing the page.

## 4. Locked source records

Do not replace these with an unpinned branch or a different commentary feed.

| Layer | Pinned source | Runtime use |
|---|---|---|
| Sanskrit and transliteration | [vedicscriptures/bhagavad-gita](https://github.com/vedicscriptures/bhagavad-gita), companion data at commit [43dfc8db815d01e15a347ea294b089334cf2aa17](https://github.com/vedicscriptures/bhagavad-gita/tree/43dfc8db815d01e15a347ea294b089334cf2aa17/slok) | One API record per visible verse |
| Word meanings | [gita/gita-frontend-v2 common data](https://github.com/gita/gita-frontend-v2/tree/27d92fe5e3decde8bda747a1bfbb3ff4d6f67aeb/data/common) at commit 27d92fe5e3decde8bda747a1bfbb3ff4d6f67aeb | Holy Bhagavad Gita word-meaning fields |
| Mukundananda English | [author_22_en.json](https://github.com/gita/gita-frontend-v2/blob/27d92fe5e3decde8bda747a1bfbb3ff4d6f67aeb/data/authors/author_22_en.json) at the same commit | Visible English verse translation |
| Śrīdhara Sanskrit | [Vasuki Śrīdhara source](https://github.com/vishvAsa/mahAbhAratam/tree/3405cca553363ae77edf0c7e58ff1908b5d27d29/vyAsaH/shlokashaH/bhagavad-gItA-parva/TIkA/shrIdhara-vishvanAtha-baladevAH) at commit 3405cca553363ae77edf0c7e58ff1908b5d27d29 | Sanskrit commentary, mapped through the local manifest |

The Vasuki chapter files are under vyAsaH/shlokashaH/bhagavad-gItA-parva/TIkA/shrIdhara-vishvanAtha-baladevAH/01.md through 18.md.

The local mapping file is assets/data/bhagavad-gita-vasuki-manifest.json. It is authoritative for grouped Śrīdhara sections, missing sections, and chapter-specific numbering exceptions.

## 5. Renderer responsibilities

The shared renderer is assets/js/bhagavad-gita.js.

It must:

- read the chapter number from data-gita-chapter;
- use the verse-count table above;
- load the pinned common data, author_22 English data, Vasuki manifest/file, and one pinned API record per verse;
- expand grouped source records only for lookup;
- extract the Sanskrit for the requested verse from the API record;
- keep the verse heading and card id at one verse only;
- render the three controls in the same order on every card;
- render the pinned Mukundananda translation with the matching Mukundananda word meanings; for a source range, render its complete translation on the first verse card and link every remaining card back to it;
- render a mapped Vasuki section or the intentional text No commentary.;
- leave the panel in the DOM even when a source field is empty.

The runtime overlay assets/data rules must remain separate from the Sanskrit/API loader. Never fall back to author_8_sa.json or to a moving main branch.

## 6. Grouped records and word-for-word panels

The pinned common file contains 49 grouped word-meaning records covering more than one verse. The reader must still give every visible verse its own Word-for-word control.

Normal rule:

- a one-verse record is shown in full;
- if a grouped record has exactly one newline-delimited part per verse, assign one part to each verse;
- if a source field is empty, keep the control and show the neutral missing-source notice;
- do not create labels such as “generated translation,” “shared text,” or “same as previous verse.”

The explicit grouped word-meaning slices currently used by pickWordMeaning are:

| Source range | Verse 1 slice | Verse 2 slice | Verse 3 slice |
|---|---|---|---|
| 1.29–1.31 | source lines 1–2 | line 3 | line 4 |
| 2.42–2.43 | line 1 | lines 2–3 | — |
| 4.29–4.30 | line 1 | lines 2–3 | — |
| 5.8–5.9 | line 1 | lines 2–3 | — |
| 5.27–5.28 | line 1 | lines 2–3 | — |
| 11.26–11.27 | line 1 | lines 2–3 | — |
| 12.3–12.4 | line 1 | lines 2–3 | — |
| 16.13–16.15 | line 1 | line 2 | line 3 |

The fourth line in the pinned 16.13–16.15 record must not be attached to verse 16.15. It is the next verse’s source material and must not be fabricated into the 16.15 card. If the upstream record is re-pinned, re-audit this boundary rather than guessing.

The visible English and word meanings come from the same pinned Gītā data release. English verse translations come from Mukundananda’s author records, and word meanings come from the release’s common records. Its 49 grouped translation records cover 110 verses and match the grouped word-meaning ranges exactly. This verifies complete source coverage and alignment; it is not an independent Sanskrit-level retranslation of all 701 verses. Each grouped translation appears once on its first verse card, and the remaining verse cards link back to it. No later verse silently switches to another translator.

## 7. Śrīdhara panels

Each card has:

1. Śrīdhara Sanskrit in the collapsed Sanskrit control;
2. the commentary section headed Śrīdhara’s Commentary.;
3. the separate literal/commentary rendering supplied by the reviewed runtime data where available.

The phrase No commentary. is allowed only when the locked Vasuki manifest has no separate Śrīdhara section for that verse. Do not replace missing source text with a guessed commentary.

The current readability target is:

- Sanskrit verse: Noto Serif Devanagari, 17px on desktop and 16px on narrow screens;
- English verse translation: Noto Serif, 13px on desktop and a slightly smaller narrow-screen size;
- Śrīdhara commentary body: Georgia/Times, 16px on desktop and 15px on narrow screens;
- Śrīdhara heading: 18px on desktop and 17px on narrow screens.

The Sanskrit and English verse are intentionally smaller than the commentary so the long commentary remains readable without making the verse cards overwhelming. Keep the Sanskrit font separate from the commentary font.

## 8. Gītā contents page

The contents page is pages/bhagavad-gita/index.html.

It follows the Bhāgavatam contents layout:

- warm paper background and teal heading;
- sticky contents rail on desktop;
- responsive single-column layout on narrow screens;
- one chapter grid with the chapter number, traditional Sanskrit name, and English gloss;
- all 18 chapter links;
- no fabricated chapters or source records.

The chapter names in the contents page must match the names array in assets/js/bhagavad-gita.js and the table in this guide.

## 9. Bhāgavatam contents page

The Bhāgavatam contents page is pages/bhagavatam-with-sridhara-bhasya/index.html.

Only the currently published Cantos 1, 2, and 11 are linked. Each is a closed details accordion by default:

- Canto 1 — 19 chapters;
- Canto 2 — 10 chapters;
- Canto 11 — 31 chapters.

Each link is labelled with both its canto/chapter number and its chapter title, for example 1.1 — Questions by the Sages. Do not re-add unverified Cantos 3–10 or 12 merely to make the contents list look complete.

The title strings are embedded in the contents page from the pinned Bhāgavatam English mirror used by the existing reader. If a chapter source changes, update the title list and the reader manifest together.

## 10. How to replicate the template for a chapter

Use this workflow for any future Gītā repair:

1. Read this guide and the current Chapter 1 shell.
2. Check the expected chapter number and verse count in the table.
3. Fetch the current shell and current shared asset blobs before editing.
4. Copy the Chapter 1 shell structure; change only the chapter number and subtitle.
5. Do not put Sanskrit, transliteration, translations, or commentary into the HTML shell.
6. Keep the shared renderer’s source locks and the Vasuki manifest unchanged unless the source audit requires a deliberate update.
7. Verify grouped word meanings with the explicit slice table above.
8. Verify that every verse has exactly three control labels and one verse heading.
9. Update all 18 shells’ cache-busting query when a shared asset changes.
10. Commit the chapter/template change, wait for Pages, and browser-check a representative desktop and narrow viewport before calling it done.
11. Update this guide immediately if a source rule, exception, asset version, or validation invariant changes.

For a shared renderer change, do not update only Chapter 1. The shared asset is used by all 18 shells, so all 18 cache-busted script references must move together.

## 11. Browser and DOM validation

For every chapter N, check:

- the number of .gita-verse elements equals the table count;
- ids are gita-N-1 through gita-N-count with no gaps;
- each h2 is exactly BG N.i;
- no h2 contains a verse range;
- every card has exactly these three summaries, in order: Word-for-word, Transliteration, Śrīdhara Sanskrit;
- all details are closed before interaction;
- the Word-for-word control is present even if its paragraph contains the neutral missing-source notice;
- the subtitle contains the conventional chapter name;
- Sanskrit and translation computed styles are smaller than commentary;
- the navigation contains All chapters and the correct Previous/Next links;
- opening one control changes only that card’s panel.

Recommended representative checks after a release:

- Chapter 1, including 1.29–1.31;
- Chapter 2, including 2.42–2.43;
- Chapter 5, including both grouped exceptions;
- Chapter 11, including 11.26–11.27;
- Chapter 16, including 16.13–16.15;
- Chapter 18, to prove the final shell is not using a special case.

For the contents pages, check:

- Gītā: 18 named links;
- Bhāgavatam: three closed Canto accordions and 60 named chapter links;
- clicking a Canto summary reveals only that Canto’s grid;
- closing it hides that grid again.

When checking immediately after deployment, append a query such as ?verify=COMMIT_SHA&fresh=template1 to bypass a stale GitHub Pages/CDN response. A clean URL can remain cached briefly; do not call a deployment verified from an old HTML response.

## 12. Release definition of done

The Gītā rollout is complete only when:

- all 18 shells use the Chapter 1 template;
- all 18 use the same shared script order;
- all 701 cards render one verse at a time;
- every card has Word-for-word, Transliteration, and Śrīdhara Sanskrit controls;
- no grouped verse heading or fabricated per-verse translation appears;
- every single-verse card has its exact Mukundananda translation, and each card in a grouped source range links to the complete Mukundananda translation for that range;
- traditional names agree across the renderer, contents page, shells, and guide;
- the eight grouped word-meaning exceptions remain explicit;
- Śrīdhara styling is readable and distinct from the Sanskrit verse;
- the Bhāgavatam contents page has only the currently published Cantos 1, 2, and 11, with named chapters inside closed accordions;
- the guide is updated in the same rollout;
- Pages has rebuilt and representative desktop/narrow browser checks pass.


## 13. Full source audit — 2026-09-21

The shared reader was audited against the pinned Holy Bhagavad Gita word-meaning/translation dataset, the pinned VedicScriptures verse records, and the pinned VishvAsa/Vasuki Śrīdhara mapping. The audit covers all 701 visible verses. Two corrections were applied: Mukundananda’s pinned translation now takes precedence over the fallback API translation, and the stray fourth upstream word-meaning line attached to 16.13–16.15 is excluded because it belongs to 16.16. The eight explicit grouped word-meaning slices remain covered by `pickWordMeaning`; all 18 chapters expand to their expected verse counts with no missing word-meaning record.

The locked source commits remain unchanged. The Vedic Scriptures URL points to the repository that contains the pinned commit. `No commentary.` is retained only for verses that the Vasuki manifest explicitly maps to no Śrīdhara section.

## 14. Śrīdhara boundary audit — 2026-09-22

The Gita reader now parses the pinned VishvAsa/Vasuki Markdown by visible verse heading and speaker boundary. It recognizes both `श्रीधरः -` and `श्रीधर :`, merges multiple Śrīdhara sections that belong to the same verse range, and renders a merged commentary once on the range’s first verse instead of repeating it on every verse card.

The source-backed no-commentary verses are BG 1.11, 1.47, 12.6, and 13.35. All other verses, including BG 18.1–18.78, have a recognized Śrīdhara block. The full report is `GITA_AUDIT_2026-09-22.md`.

## 15. Do not regress these rules

- Do not merge separate verse cards.
- Do not make a grouped source look like a fabricated new source record.
- Do not duplicate a grouped Mukundananda translation or substitute another translator on later cards; link later cards to the source range translation.
- Do not remove the Word-for-word control from a verse because its source field is blank.
- Do not replace exact Sanskrit/API records with generated Sanskrit.
- Do not use a different commentary source without a new audit.
- Do not add unverified Bhāgavatam Cantos back to the contents page.
- Do not claim a clean URL is updated until a cache-busted browser check confirms it.
