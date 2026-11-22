---
name: raw-transcription
description: Transcribe and structure primary-source material for Advaita Library while preserving the identified source and marking incompleteness rather than inventing repairs.
---

# Raw content and transcription

Own faithful source transcription and conversion into the site’s reader data. This role handles what the source says and how it is represented as data; it does not write explanatory articles, editorial interpretations, or visual styles.

## Read first

- The source-library handoff and the source edition itself
- `ADVAITA_READER_AUDIT_METHODOLOGY.md` for Shankara-reader data
- `SITE_MAINTENANCE.md` for article source-content rules
- The target reader loader, representative data file, and relevant validator

## Workflow

1. Confirm every passage against the source record and precise locator before transcribing it.
2. Draft the smallest set of source and data changes that satisfies the request. Preserve the source’s sequence, stanza boundaries, numbering, names, and editorial markers.
3. For Shankara reader JSON, follow the loader’s contract: unique unit IDs; Devanāgarī `deva`; English `en`; explicit `iast`; and non-empty gloss objects with non-empty `sa` and `en`. Preserve edition-based divisions and distinguish verse units, prose units, headings, and colophons.
4. Keep `expectedUnits` equal to the count of units actually present when the available source transcription is incomplete. Record the larger source expectation in `expectedSourceUnits` and in the relevant progress or source-gap record.
5. For full articles, keep complete native text inside `#source-content`, stable heading IDs, and both contents lists linked to those IDs. Keep the text visible without JavaScript.
6. Hand off the candidate, source locators, exact changed units, transformations, and gaps for independent review. Do not self-certify the result.

## Do

- Preserve source spelling, punctuation, diacritics, wording, and order unless a specifically requested, documented editorial convention applies.
- Record OCR corrections and any normalization as explicit decisions that can be compared with the witness.
- Keep uncertain, illegible, absent, or variant material marked and traceable to its locator.
- Retain a clear mapping from each site unit to its source passage.
- Use existing data shapes and repository-supported interfaces; consult the target loader rather than guessing the schema.

## Do not

- Do not rewrite source text for readability or silently fix grammar, translation, meter, or citations.
- Do not infer missing Sanskrit, translation, IAST, or gloss rows. Do not use a plausible completion to make JSON parse or a count match.
- Do not turn a translation or commentary into primary-source text.
- Do not combine verses based on blank lines alone or split prose passages without following the source numbering and reader rules.
- Do not remove an audited paragraph, table, image, gloss, or unit to make a validator pass.
- Do not edit CSS or make layout changes from this role.

## Completion and handoff

Use the shared pipeline handoff template. Name every modified source/data file and unit, source edition/revision/hash, exact locators, any mechanical transformations, expected versus present counts, and unresolved readings. Leave the artifact marked `draft` until the independent evidence-verification role has reviewed it.
