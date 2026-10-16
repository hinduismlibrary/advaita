---
slug: hinduism-on-women
request: repair
source_files: ["Hinduism_on_women(2).pdf"]
source_version_or_hash: "21,998,164 bytes; SHA-256 250d2ed2bb54ff0be6476f07710504540c2ce82442ae18f2de82a84ec804157f"
source_pages: "98 scanned, image-only; visually inspected pages 1-3, 5-7, 16, 61-65, and 95-98; English OCR run on all pages"
article_path: "articles/hinduism-on-women/index.html"
live_url: "https://krishnavyasmuni.github.io/advaita/articles/hinduism-on-women/"
reference_layout: "Shared Varna-vicara reader used by the Vaishnava and Shaiva articles"
source_inventory: "Four main sections, front matter and index, English body text, Sanskrit citations, bibliography, three labeled diagrams, cover illustration, and closing matter"
expected_units: "Readable HTML transcription of the 98-page PDF, including its English and Devanagari text and all diagram labels; no full-page scans"
known_defects:
  - "The PDF has no searchable text layer. English OCR comparison suggests broad coverage in the existing body, but the English prose has not been manually checked word-for-word against every page."
  - "Devanagari passages on pages 4-96 outside the previously checked page 5-7 and 16 excerpts remain unverified. Tesseract lacks Hindi data here; attempts to retrieve the Hindi data returned HTTP 403."
  - "The source index reads 'Arsa and dowry' while the corresponding article heading reads 'Asura marriage and dowry'; the discrepancy is noted in the web index."
  - "Several English-only quotation blocks still lack their Sanskrit source text and Show Sanskrit control; the missing passages have not been transcribed and verified from the scans."
  - "Closing Sanskrit from page 97 was transcribed visually from the scan; apparent source spellings were retained and still need a Devanagari reader's review."
  - "Chrome could not open the Pages URL and returned net::ERR_BLOCKED_BY_CLIENT; desktop and mobile visual review were unavailable in this browser."
unresolved_source_readings:
  - "English-only translated quotations without a verified Sanskrit source passage and matching control."
  - "Page 16 prints संवासं in the second consent quotation; confirm whether this is intentional before normalizing it."
  - "Sanskrit citations and transliterations throughout pages 4-96 beyond the previously checked excerpts."
  - "A second-reader verification of the page 97 colophon."
qa_status: "partial"
commit: "00c81a56acaafec2a64dce0c18c026c98ca720d4"
deployment: "GitHub Pages run 37358656674 succeeded for commit ca1a3255ef857feaa8676853905618fa3b33beeb"
---

## Changes

- Added the source title, subtitle, author, opening Sanskrit, auspicious invocation, and linked index from pages 1-3.
- Added the missing Sanskrit quotation from page 62 and text alternatives for the clothing and ornament diagrams on pages 61, 63, and 65.
- Transcribed the closing verses, completion statement, and Om symbol from pages 97-98.
- Added responsive styling for the title page, index, diagram transcriptions, and colophon.
- Corrected a small set of clear English spelling and punctuation errors without rewriting the article's argument.

- Corrected the opening and auspicious-invocation Sanskrit against page 2, and corrected the two consent quotations against page 16.
- Added Show Sanskrit controls to the four Sanskrit labels in the clothing diagram.

## Checks

- Rendered and visually inspected source pages 1-3, 61-65, and 97-98 at high resolution before transcribing.
- English OCR was run on all 98 pages. Text sequence comparison indicates broad coverage in the existing English body, but does not validate every word or Sanskrit reading.
- HTML details elements are balanced; the page has 210 Show Sanskrit controls. All 55 in-page links point to unique IDs.
- The page contains textual alternatives for all three labeled diagrams and no references to full-page scan images.
- Hindi OCR model retrieval was blocked with HTTP 403; English OCR output was not used to reconstruct Sanskrit.
- GitHub Pages build: succeeded for commit ca1a3255ef857feaa8676853905618fa3b33beeb (run 37358656674).
- Browser visual review: unavailable; Chrome returned net::ERR_BLOCKED_BY_CLIENT for the Pages URL.
