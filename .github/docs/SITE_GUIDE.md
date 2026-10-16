# Viveka Dṛṣṭi — document upload, repair, and publication handbook

**Current Śaiva article design:** The owner explicitly requires the complete Śaiva article to use the design of [`Varṇa-vicāra`](https://krishnavyasmuni.github.io/vivekadrishti/articles/varna-vicara/). Follow the specific contract below; it supersedes the older provisional Śaiva styling notes in §8. The content-fidelity rules in this handbook still apply.

**Purpose:** This is the repository-wide handoff contract for any document the owner supplies for publication or repair, including PDF, DOCX, ODT, Markdown, HTML, text, scans, manuscripts, Sanskrit/English editions, and existing web articles. **Read this entire guide before working on an uploaded document.** It is a procedure, not a claim that every existing article has already passed inspection.

**Priority:** Explicit instructions for the particular document take precedence over defaults here. This handbook governs document/article ingestion, recovery, formatting, and quality assurance. Existing corpus-specific rules remain in `.github/docs/GITA_COMPLETION.md`, `.github/docs/BHAGAVATAM_COMPLETION.md`, and `.github/docs/VISHNU_PURANA_COMPLETION.md`; consult them when working in those corpora. Never transplant a Gītā verse renderer or a commentary policy onto an independent essay without checking its structure.

**Core rule:** Preserve the actual source and make its *content and structure* readable. Making a broken paragraph smaller, splitting text by script, or passing a deployment check is **not** the same as repairing a document. No claim of “fully fixed,” “exact,” or “word-for-word verified” is permitted until the checks in §13 have passed for the whole source.

## 1. What the owner expects

- An article that looks and reads like the supplied document, with an elegant, warm, white-paper reading surface, restrained brown borders/accents, clear serif English, and a legible Devanāgarī typeface. Match any document-specific exemplar, title treatment, and quotation styling the owner explicitly requests rather than mechanically applying a universal look.
- The *entire* document: front matter, headings, continuous prose, quotations, scripture, tables, footnotes/endnotes, citations, bibliography, diagrams and images, appendices, and ending. Nothing silently omitted, merged, rearranged, or invented.
- On a desktop, English and Sanskrit translations may appear side by side when the source genuinely pairs them; on a phone they must reflow into **one aligned Sanskrit-then-English unit per verse or paragraph** with no horizontal clipping. A document may use a different arrangement if its own structure calls for it.
- Preserve existing art unless asked to change it. Do not replace actual deity artwork with generated deity imagery. Use only assets whose provenance and permission are known; do not invent artwork or a Sanskrit verse to fill an empty space.
- Preserve content, tone, spelling, doctrinal assertions, and attribution as they appear in the owner's document. Correct obvious OCR or encoding errors from the source image, **not** by guessing what the passage ought to say. Mark uncertain readings for review instead of silently rewriting an argument.
- When a question is about fidelity, make the source document—not a third-party paraphrase or a guessed external edition—the first reference. If the user explicitly requests an independent textual verification, document which edition/translation was checked and distinguish it from the uploaded text.

## 2. Start each job with discovery and a source inventory

1. Identify the user-supplied file(s), links, current live URL, target repository, desired destination, and any exemplar. Do not substitute a similarly named online text for the actual upload. If the source is missing or cannot be opened, request that file; do not reconstruct a 50-page document from one screenshot.
2. Determine whether this is **new publication**, **repair of an existing article**, or **revision to a previously published source**. Locate the actual article `index.html`, assets, build scripts, and applicable specialist guide before editing. Use GitHub repository search and directory listing if the location is unknown; do not guess a path.
3. Establish source authority and revision: exact file name, file format, page count (if paged), source/version/date if known, SHA-256 when local bytes are available, and any user-supplied errata. Preserve the original bytes in a safe source location when permission/storage allow; never overwrite the only copy.
4. Inventory all pages and features **before** conversion. Note page ranges for front matter, sections, tables, verse blocks, footnotes, images, bibliography, appendices, and any pages that are scans or have poor extraction.
5. Record the existing live URL and its current behavior, including `?section=` links, navigation, images, mobile view, and an example of the failure. Keep a baseline screenshot or a clear written record of what was broken; protect other published articles from regressions.
6. Decide what *must not change*: original prose, supplied translation, sourced quotations, section order, title, attribution, existing licensed art, and unrelated site pages. A requested **layout repair** is not authorization to rewrite the content or change its thesis.

### Intake record (create one per document)

Create `.github/maintenance/audit/documents/<slug>.md` or an equivalent clearly located record, and update it while working. Do not label a source verified merely because it has been uploaded.

```yaml
slug: example-slug
request: new-publication | repair | revision
source_files: ["exact-uploaded-filename.pdf"]
source_version_or_hash: "record only if established"
source_pages: "verified total or unknown"
article_path: "articles/example-slug/index.html"
live_url: "https://krishnavyasmuni.github.io/vivekadrishti/articles/example-slug/"
reference_layout: "user-specified URL or description"
source_inventory: "headings / prose / tables / verses / images / notes / bibliography"
expected_units: "counts established from original, not guessed"
known_defects: []
unresolved_source_readings: []
qa_status: "not started | in progress | passed | blocked"
commit: "fill after changes"
deployment: "not checked | pending | succeeded | failed"
```

## 3. Extract the *structure*, not just a stream of characters

Use the best text extraction available for each format; compare it with page images/visual rendering throughout. Extraction output is a **working draft**, not evidence that a complex PDF table is correctly represented.

| Input | Preferred starting point | Required extra care |
| --- | --- | --- |
| DOCX/ODT | Read the package's actual paragraphs, styles, table grid, lists, footnotes, hyperlinks, and media | Preserve merged cells, headings, runs/language spans, comments/notes where relevant, and image order |
| Born-digital PDF | Extract text **with bounding boxes / layout**, plus render page images for comparison | Reconstruct reading order and column boundaries; don't assume linearly extracted text follows page order |
| Scanned PDF/photo | Inspect page images; transcription/OCR only when needed and review against images | Record uncertain glyphs, diacritics, conjuncts and page breaks; OCR is not a verified Sanskrit edition |
| Markdown/plain text | Parse headings, fences, links, citations, list nesting, verse blocks | Keep intentional hard breaks and stanza boundaries |
| Existing HTML | Parse the DOM and source content, stylesheets, scripts, and anchors | Retain semantic structures and do not use `.textContent` as an authoritative replacement for complex nodes |

For each page (or logical document segment): identify **individual semantic units** and reading order: heading, paragraph, verse, translation, commentary, note, table cell, image/caption, reference. Capture the association of Sanskrit ↔ translation **before** writing HTML. Preserve intentional line breaks in verse and poetry; join only the line wraps that the original treats as a single prose paragraph. Remove running headers/page numbers from the text flow only when they are clearly layout furniture, and retain meaningful original page references in metadata when useful.

If a section mixes two columns, do not concatenate all of column 1 with all of column 2, and do not interleave them in the order a PDF extractor happens to return. Identify rows/cells from the visual source, then transcribe each pair accurately. A single corrupted paragraph can contain *multiple* original table rows and later prose; separate the later prose from the table without deleting it.

## 4. Content-integrity rules — especially for Sanskrit

**No fabrication:** Never fill missing Sanskrit syllables, translations, words, titles, or citations from linguistic plausibility alone. Never silently replace the author's English translation with another translation. An external critical text can help diagnose a discrepancy but does not automatically override the user's specified edition.

**Inspect these common extraction failures explicitly:** inserted spaces within Sanskrit words or mātrās; reversed/displaced vowel signs; lost virāma, anusvāra, visarga or avagraha; wrong conjuncts; `।`/`॥` loss; Devanāgarī/Arabic verse-digit confusion; broken IAST diacritics; replacement characters `�`; doubled or skipped passages; dropped italics, superscripts, footnote markers, and quotation marks; English accidentally embedded in a Sanskrit line; table labels rendered as prose. Unicode normalization may help comparison but must not be used as an excuse to rewrite the source.

For every verse or quoted passage, keep a stable record of:

```text
unit_id | source page/location | cited work / chapter / verse as printed
Sanskrit (exact recovered text, with line breaks)
Transliteration (only if source provides it or user requests a sourced addition)
English (the provided translation, exactly attributed)
Commentary / author's surrounding explanation (separate from translation)
Verification: source-image checked / independently cross-checked / unresolved
```

If the original translation covers verses 4–6 together, preserve the grouping and mark it; never duplicate that translation as if separately supplied for each verse. If two editions number a passage differently, record both schemes and the edition instead of silently renumbering. Preserve transliteration conventions unless the user asks for normalization. For authorial claims that quote scripture, distinguish **what the document claims**, **what the cited source actually reads**, and **any editorial correction**; don't conflate those layers.

### Fidelity comparison

Create a per-page or per-section ledger with the expected and published headings, paragraph/verse/table counts, and any unresolved units. Use semantic text comparison in addition to visual comparison. Pure character-count equality is not sufficient: it cannot catch swapped translations, duplicated text, damaged syllables, or out-of-order paragraphs. Conversely, explain any difference caused by legitimate removal of a printed page number or rearrangement for responsive reading.

## 5. Canonical content model: separate source data from presentation

For substantial or recurring work, maintain a structured intermediate source (JSON, Markdown with explicit blocks, or carefully authored semantic HTML). Store logical units in their original order, with source page/anchor and type; render from those units. One reasonable shape:

```json
{
  "id": "passage-001",
  "kind": "parallel-passage",
  "source_page": 12,
  "citation_as_printed": "Original citation here",
  "rows": [
    {
      "id": "verse-1",
      "sanskrit": "Verified original text with intentional line breaks",
      "english": "The exact supplied translation",
      "status": "checked-against-source"
    }
  ],
  "following_prose": ["Author's actual paragraph, not part of the verse table"]
}
```

This is an **example schema**, not permission to publish the example text. Store each source field once. Do not create a JavaScript patch that replaces an entire passage with guessed text just because the extracted text is damaged. Never delete content with a broad rule like “remove all siblings until the next heading” without first verifying and preserving every sibling's contents.

If possible, keep the corrected, semantic source in the article's checked-in HTML or a data file used by the renderer. A runtime cleanup script may be a temporary safety net; it is not the long-term authoritative manuscript.

## 6. Semantic HTML for the website

Use proper headings (`h1` for the document title, hierarchical `h2`/`h3`), `p` for prose, `blockquote` with attribution for quoted prose, `figure`/`figcaption` for illustrations, `ol`/`ul` for real lists, footnotes with bidirectional links, and actual `table` markup for tabular data. Use `lang="sa-Deva"` on Devanāgarī passages, `lang="sa-Latn"` on Sanskrit transliteration, and `lang="en"` on English where needed. Maintain a consistent distinction among **primary text**, **translation**, **commentary**, **authorial analysis**, and **source citation**.

For paired scripture and translation, use one semantic container per numbered verse or logically paired passage, with stable IDs. On wide screens display two adequately wide columns **only** if pairs are genuine and the text remains readable; on narrow screens stack *each pair together* (Sanskrit then its English), not all Sanskrit first followed by all English. If a pair cannot fit comfortably, stack it at any viewport width. Do not use `<br>` and nonbreaking spaces to simulate a PDF table, and do not use role="table" on a div as a substitute for real associations when a normal table is suitable.

An illustrative pattern, to be populated with **verified real content**:

```html
<section class="parallel-passage" aria-labelledby="passage-title">
  <h3 id="passage-title">Source and translation</h3>
  <div class="parallel-passage__pair" id="verse-1">
    <div class="parallel-passage__source" lang="sa-Deva">
      <p><!-- verified Sanskrit verse, retaining its line breaks --></p>
    </div>
    <div class="parallel-passage__translation" lang="en">
      <p><!-- matching supplied English translation --></p>
    </div>
  </div>
</section>
```

Implement verse line breaks with explicit verse lines or `white-space: pre-line` on a dedicated verse element, **not** `white-space: nowrap`. For long tables use a correctly labelled horizontally scrollable wrapper *only* when stacking would destroy essential relationships. Avoid horizontal scrolling for the whole page. Make images fluid (`max-width: 100%; height: auto`) and give informative alt text; decorative images can have empty alt text. Do not place an image where it displaces or obscures source text.

## 7. Design and device baseline

Treat the uploaded document or expressly chosen reference as the principal design target. For essays with no special reference: white paper, readable dark body text, warm brown borders, restrained quotation accent, generous but not excessive line spacing, and a separate Sanskrit font. User-specific directives about purple quotations, orange Sanskrit buttons, or other article styling apply only where requested and should not be imposed on unrelated documents.

- **Desktop:** a restrained reading measure (~65–85 characters for ordinary prose), readable text size and line-height; fixed-width side navigation must never squeeze the article into microscopic columns. Tables should not overpower prose.
- **Mobile:** viewport meta tag; one-column body; no element causing document-level horizontal overflow at 320, 375, 390, or 430 CSS pixels; comfortable touch targets; heading and verse sizes with a sensible clamp; Devanāgarī conjuncts remain intact; navigation remains usable.
- **Accessibility:** correct heading order, keyboard-operable links/toggles, focus styles, meaningful labels, contrast, and appropriate languages. Test zoom at 200% and long words/URLs. The Sanskrit toggle must retain its state and correct “Show Sanskrit” / “Hide Sanskrit” label where that feature is part of the article.
- **Typography:** ensure the intended web font *actually loads* and has a glyph-complete fallback (`Noto Serif Devanagari`, Nirmala UI/Mangal or suitable installed alternatives). Test macOS/iOS, Windows/Android when available. Do not split an Indic grapheme cluster or apply `overflow-wrap:anywhere` indiscriminately to Sanskrit.
- **Images:** preserve their order, captions, resolution, aspect ratio, attribution and existing art. Check for 404s and lazy-loading issues.

## 8. Repository integration: inspect before touching

Current repository: `krishnavyasmuni/vivekadrishti`. Its public site is published under `/vivekadrishti/`, **not** the domain root. New and existing essay paths typically look like `articles/<slug>/index.html`. Inspect live repository files on the target branch before assuming a template or asset version is current.

For the Śaiva essay discussed in the September 2026 repair:

- Article: `articles/a-shaiva-lens-on-shiva-as-the-supreme-deity/index.html`.
- Shared section/pagination runtime: `assets/js/article-reader-paged.js`; it reads `#article-config` and hidden `#source-document`, segments `h2`/`h3` material, clones one section into `.document-content`, and supports `?section=<id>` navigation.
- Earlier passage-specific patch: `assets/js/shaiva-document-layout.js`.
- Broad mixed-script formatting patch: `assets/js/shaiva-repair-all.js`.
- An installation workflow exists at `.github/workflows/install-shaiva-all-layout.yml`.

**Important known limitation:** The broad repair script separates text by writing system in selected paragraphs. That improves legibility but **cannot reliably reconstruct the original PDF's column order, recover garbled Sanskrit, or prove a translation matches its verse**. An earlier patch also substitutes manually supplied Padma Purāṇa rows. Treat both as provisional until individually compared with the actual source pages. The mere existence of these scripts or a successful GitHub Pages build does not close the manuscript audit. Prefer replacing damaged source content with faithful, checked semantic markup and then retiring overlapping patches carefully.

**Shared reader hazard:** `article-reader-paged.js` replaces the body and renders *one section at a time*. A script that only transforms currently visible `.document-content` must be checked after every `?section=` navigation; source corrections should live in `#source-document` or an authoritative source dataset, not only transient DOM nodes. Inspect `clean()` and the section boundary logic before inserting nested tables, notes, or block elements. Preserve introductory paragraphs, the conclusion, and the bibliography. Do not modify Varṇa or unrelated articles while fixing the Śaiva essay.

When integrating a new document, first see whether it is compatible with this existing reader. Reuse the site's navigation and CSS responsibly, but do not force a large, multi-column scholarly document through a simplistic paragraph-only conversion. If a different renderer is needed, scope its styles/scripts to that article and document the choice. Avoid dynamic external text dependencies unless requested and reliable; keep source content reproducible and pinned where an external dataset is necessary.

## 9. Repair workflow for an existing broken article

1. Open the actual uploaded original and the current repository article. Read the applicable guide, runtime, and stylesheet; document the defects across the **whole** article.
2. Build an exhaustive page/section map from the original, including every true table, pair of verse and translation, notes, figures, and trailing material. Compare against published DOM, not merely screenshots.
3. Produce a list of damaged units and classify: **extraction error**, **wrong reading order**, **missing source**, **duplicated content**, **typographic problem**, **responsive problem**, **navigation/rendering regression**, or **uncertain source**.
4. Repair from the *original source*, one unit at a time. For a damaged table, restore all its rows and source associations; for corrupted Sanskrit, inspect page image and verify glyphs; for prose, retain the author's actual text and paragraph boundaries. Never relabel guessed reconstruction as an exact transcription.
5. Make semantic, reproducible changes in the repository. Keep each commit focused. Avoid replacing an entire document with `textContent` or globally altering all `p` elements. If an emergency runtime patch is unavoidable, comment exactly what it does and does **not** repair.
6. Run content/structural checks, desktop and mobile browser checks, navigation and links checks, then inspect the deployed URL after a successful build. Re-open first, middle, last, and every section containing a repaired complex element; sample screenshots alone cannot prove text fidelity.
7. Update the intake ledger and report remaining uncertainties honestly. A known corrupt verse, an unavailable source page, or untested section means the manuscript remains **partially verified**, even if the layout looks much better.

## 10. Publication workflow for a new upload

1. Collect the source and user's requested destination/reference style, determine if it supersedes an existing article, and record provenance. When essential material is missing, request precisely what is needed.
2. Inventory the entire source, extract and reconcile reading order, prepare semantic units and source locations, and check hard cases visually.
3. Choose a slug and place the page under `articles/<slug>/index.html` or the location explicitly requested; do not overwrite an existing article accidentally. Preserve a way to return to the contents/index where appropriate.
4. Build HTML from verified units; add styles/assets scoped to the page or compatible with the shared layout; include source acknowledgement and citations as supplied. Do not fabricate credits, publication dates, or scholarly references.
5. Test every section, notes, figures, Sanskrit/English pairing, navigation, and phone/desktop appearance. Verify content against original, not just parseability.
6. Commit, confirm deployment, inspect the real URL, update the article index/sitemap/menu **only when required and authorized**, and record the exact resulting link and revision in the ledger.

If the owner says “upload this document,” treat it as a request for a usable published page **only if that intent and destination are clear**. Do not silently publish private/confidential uploads into a public repository. Confirm public-publication intent when the material may be private or the destination is ambiguous. Keep source files private unless their publication has been authorized; putting an HTML article online does not automatically authorize uploading the complete original PDF or third-party copyrighted assets.

## 11. Verification tests: automated AND human-visible

Automated checks should fail the job when possible; they support but cannot replace the source/page comparison. Adapt commands to the actual checked-out project instead of assuming a package manager or test suite exists.

**Minimum source tests:**

- Every source heading and document section appears in the correct order. Expected number of pages/sections/verses/rows/images/notes matches the inventory or each difference is explained.
- Each Sanskrit unit is associated with the **correct** English unit; no source line is silently truncated, duplicated, or lost. All quoted passages have their correct labels/citations where provided.
- Search for telltales: `�`, placeholder strings, obvious mid-word Indic spaces, `Devanagari English Translation` leaked into prose, missing image URLs, unexpected duplicate IDs, and giant paragraphs representing extracted table rows. Flag detections for review, not automatic unsupervised replacement.
- Text diff by source page/section, with an explicit exception ledger for justified changes. Validate HTML syntax/DOM structure and all local asset paths. Check that section anchors and TOC entries resolve.
- Run `node --check` for changed JavaScript; run relevant existing checks/builds. Do not add an unrelated workflow simply to claim “tests passed.”

**Browser and visual matrix:**

| View | Verify |
| --- | --- |
| Desktop ~1440px | complete text, readable measure, correctly aligned pairs, no overlapping sidebar/table |
| Laptop ~1024px | breakpoint and TOC transition, comfortable body width |
| Phone ~390px | pairs stack correctly, no horizontal overflow, complete lines and buttons |
| Narrow phone ~320px | large Sanskrit clusters and long citations still fit/scroll locally without clipping |
| 200% zoom / keyboard | text reflows, focus visible, contents and toggles work |

Test section navigation, browser back/forward as implemented, direct `?section=` and hash links, first/middle/final sections, images, footnotes, and expanded/collapsed Sanskrit controls. Observe the browser console and failed network resources. Check real screen captures against rendered original source pages for *all* complex passages, not only the screenshot that first revealed the problem.

After deployment, visit the actual GitHub Pages URL and confirm that its fetched HTML references the new asset/version and that the visible page reflects the commit; allow for caching, and use a fresh/private tab or cache-busted asset when appropriate. A `success` CI/deployment status proves a build happened, **not** that glyphs, column alignment, content, or mobile rendering are correct.

## 12. Safe changes and version control

- Inspect `git status`/current remote history before changes; do not discard unrelated owner edits. Make targeted commits with descriptive messages; prefer a reviewable diff when significant source text changes.
- Do not run concurrent writes to the same file. Refresh its latest SHA before editing through the GitHub API. Be careful with workflows that commit back to `main`: they can race with a human edit or retrigger a deployment.
- Never paste an enormous extracted PDF into a shell replacement solely because it is faster. Large source rewrites require a lossless checked intermediate representation and page-by-page review.
- When a change affects a shared asset, smoke-test at least one unrelated article, especially Varṇa, the Gītā reader, and the site's menu, to catch unwanted global styling or script side effects.
- Keep rollback straightforward: record the prior commit, affected files, and why each changed. Preserve original file hashes and audit ledgers. If an attempted repair is wrong, revert the affected change rather than layering more contradictory runtime patches.
- Do not delete sections, images, Sanskrit controls, commentary, or footnotes for visual convenience. Never rewrite a doctrinal statement under the guise of proofreading.

## 13. Definition of done — all boxes must genuinely pass

**A document is complete only after its *entire* source has been checked.** Record each item as `PASS`, `FAIL`, `BLOCKED`, or `NOT TESTED`, with evidence in its intake ledger. `NOT TESTED` is not a pass.

- [ ] Correct original source/version identified; every page or logical unit inventoried.
- [ ] Every heading, paragraph, verse, translation, comment, note, table cell, figure, caption, and appendix preserved in the correct reading order (or explicitly accounted for).
- [ ] All damaged script/transliteration and ambiguous table cells checked against the source image; unresolved readings disclosed.
- [ ] Every Sanskrit/English pair verified; no invented text, silently swapped translation, false citation, or duplicated/missing verse.
- [ ] Semantic structure, article title/metadata, links, anchors, TOC, section navigation, footnotes, and optional controls work.
- [ ] Desktop, tablet/laptop, phone, narrow phone, and zoom checks passed; no document-level clipping or oversized mixed paragraphs.
- [ ] All images/assets load with correct permissions, attribution, alt text, proportions, and source-preserved placement.
- [ ] Changed scripts and relevant project checks passed, shared components smoke-tested, and no known regression remains.
- [ ] Commit/revision recorded; deployment finished successfully; **live page** opened and visually inspected after deployment.
- [ ] Ledger updated with a truthful list of verified sections and any remaining failures or uncertainties.

If any substantive box fails or is untested, say **“partial repair”** or **“layout improved, source fidelity not fully verified”**. Avoid saying “everything is fixed” based on a successful build or one screenshot.

## 14. Standard final report to the owner

Keep it short but specific. State exactly what was changed, the checked source/version, the scope (pages/sections/verses/tables), the tests performed and their outcomes, the live article URL, and the commit or PR. If there are remaining issues, name the exact pages/sections and whether they are source-transcription, typography, responsiveness, links, or publication problems. Do not call a planned fix a completed fix. For long jobs, a candid status checkpoint is better than a false completion report.

A suggested format:

```text
Document: <title, original file/version>
Publication: <live URL> | Commit: <SHA>
Completed: <specific sections/pages and repair categories>
Verified against source: <exact scope and method>
Checks: <desktop, mobile, links, script/build, deployment: pass/fail/not tested>
Remaining: <none, or exact items with page references>
Status: COMPLETE / PARTIAL / BLOCKED
```

## 15. Instructions for the next AI assistant or maintainer

When the owner provides a new document and says “fix this,” “publish this,” “make it like the doc,” or “use the guide,” **start here**. Read the actual upload, its page images where relevant, the current repository article, and any relevant corpus guide. Do not rely on a chat summary, a previous assistant's “done” claim, a search snippet, or a webpage screenshot as a substitute for the full source. Make the repair, test it, and report only what you have verified. Keep the owner's source and decisions authoritative; ask only for genuinely missing essential material. A later assistant should be able to repeat your comparison from the source inventory, structured content, audit ledger, and specific commit without having to guess how the article was reconstructed.


## Śaiva article: Varṇa-vicāra design contract (2026-09-21)

**Reader UI correction (2026-09-21):** The original button-per-passage layout was crowded. Keep only the single section-level Sanskrit control; no repeated visible PDF-page banners between paragraphs. Keep source-page anchors and the unobtrusive source-page range at the end of each section. Use the actual Varṇa-vicāra stylesheet and review visual appearance rather than treating a no-overflow test as proof of good design.



The exact design exemplar is `articles/varna-vicara/index.html`, with `assets/css/varna-vicara-paged.css` and `assets/js/varna-vicara-paged.js`. This user-requested reference, not the previous Śaiva card/PDF-page reader, controls the **whole Śaiva article** at `articles/a-shaiva-lens-on-shiva-as-the-supreme-deity/index.html`. Do not replace the Varṇa-vicāra visual system with a merely similar warm-paper aesthetic.

- **Match the reference shell and typography:** same `sitebar` and centered `page`, Merriweather body type, Vollkorn headings and menu, dark outer background and pale paper, teal title/section headings, narrow readable article measure, desktop sticky left contents, mobile disclosure contents, section context strip, Previous/Next links, purple translation/quotation rules, and orange `Show Sanskrit` / `Hide Sanskrit` pills. Reuse the original `varna-vicara-paged.css` on the Śaiva page; add only targeted Śaiva-specific CSS. Reference behavior on desktop and mobile, not a superficial color match.
- **Current Śaiva implementation:** `assets/js/shaiva-complete-reader.js` converts the existing structured original into titled, URL-addressable `?section=` sections, builds the reference-style contents navigation and section pager, and displays source-derived bilingual rows as paired Sanskrit passages followed immediately by their English translations, with **one compact Show Sanskrit / Hide Sanskrit control per section** rather than a button for every row. The choice persists between sections. `assets/css/shaiva-complete.css` is a small *extension* of the Varṇa stylesheet rather than a competing design. The complete original PDF-derived dataset remains `assets/data/shaiva-manuscript.b64`; the original cover artwork remains `assets/images/source-documents/shaiva-original-cover.webp` / `assets/data/shaiva-cover.webp.b64`. Preserve the original authorial words, order, passage associations, notes, headings, and closing pages. Never generate or substitute deity art.
- **Retired presentation:** `shaiva-document-layout.js`, `shaiva-repair-all.js`, and the older standalone `shaiva-complete.css` card layout are not the current reader. `articles/a-shaiva-lens-on-shiva-as-the-supreme-deity/source-original.html` retains the earlier publication as a backup; do not load its old patch scripts into the new reader. Do not run the old installation workflows on the new article.
- **Faithfulness and verification:** The structured manuscript was automatically recovered from a 52-page supplied PDF (50 populated pages; final two blank); automated checks count 20 bilingual table blocks and 67 paired rows. Those counts validate structural completeness **only**. They do not prove that every Sanskrit syllable, bibliographic reference, translation alignment, image placement, or original footnote has been manually collated against the PDF. Compare the rendered text and every bilingual row against the PDF before reporting word-for-word or scholarly source fidelity. The request to match Varṇa-vicāra is a **design change**, not permission to alter the underlying text.
- **Definition of done for future changes:** Verify that the same Varṇa CSS loads on both articles; check every Śaiva `?section=` route, both desktop and mobile contents, active navigation, previous/next endpoints, the single Sanskrit toggle per section and every paired English translation, original artwork and final invocation, and 320/375/390/430 px as well as desktop widths for overflow or clipping. Check GitHub Pages deployment and visually compare both articles. Record defects accurately rather than claiming a fully proofread text when only layout and structural checks passed.
