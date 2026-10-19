# Canto 1 source alignment and reader audit — 2026-10-15

## Scope and source pins

This pass checks all 19 chapters against the pinned Sanskrit witness and the pinned English mirror:

- Sanskrit and English mirror: [vishvAsa/purANam_vaiShNavam](https://github.com/vishvAsa/purANam_vaiShNavam), commit `100560de6c9f68c2875097d40a2012a84c784179`.
- Canto 1 Sanskrit chapter files: [gauḍīya-prastutiḥ/01](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIya-prastutiH/01).
- English mirror: [gauḍīyo-abhaya-caraṇaḥ/01](https://github.com/vishvAsa/purANam_vaiShNavam/tree/100560de6c9f68c2875097d40a2012a84c784179/bhAgavatam/gauDIyo_abhaya-charaNaH/01).

## Coverage

The English mirror has 779 `Text(s)` blocks, originally spanning 808 verse IDs. After aligning the two edition-specific numberings below, the reader renders 776 source-aligned article blocks covering all 810 Canto 1 verse IDs, 1.1.1–1.19.40, without a gap or duplicate.

| Source field | Raw English blocks with field | Note |
|---|---:|---|
| Devanāgarī | 778/779 | The mirror’s 1.16.25 field is blank; the reader’s existing override matches the pinned Sanskrit verse exactly. |
| IAST verse text | 779/779 | Present in every block. |
| Synonyms | 779/779 | Preserved from the pinned English mirror. |
| English translation | 779/779 | Preserved from the pinned English mirror. |

The existing Śrīdhara word/phrase dataset has 763 Canto 1 records covering all 810 verse IDs exactly once, with 4,817 non-empty pairs and matching pinned source paths and blob hashes. Thirteen records explicitly say “No commentary”; these are retained as source statements, not translated as if commentary existed.

This verifies structural coverage and source linkage. It does **not** certify every English synonym or gloss as a newly produced, independently checked translation. The existing English Synonyms and Translation fields remain attributed to the pinned mirror; this pass did not retranslate all 810 verses or re-audit every one of the 4,817 word/phrase glosses.

## Numbering and grouping repairs

### Chapter 6

The English mirror’s 38 numbered blocks expand to 38 IDs, while the pinned Śrīdhara source marks the chapter through 1.6.39. Its grouping around 1.6.12–1.6.16 differs from the English mirror’s headings. The reader now:

- combines English Texts 12–13 as source range 1.6.12–1.6.14;
- combines English Texts 14–15 as source range 1.6.15–1.6.16; and
- shifts English Texts 16–38 forward by one, placing the final existing verse text at source verse 1.6.39.

No verse wording or Sanskrit source text was rewritten. The mapping was checked against the pinned Sanskrit file and the [VedaBase 1.6.12](https://vedabase.io/en/library/sb/1/6/12/) and [1.6.13](https://vedabase.io/en/library/sb/1/6/13/) verse pages.

### Chapter 11

The English mirror’s 37 blocks expand to 39 IDs, while the pinned Sanskrit source ends at 1.11.40. English Text 10 contains the material for source verses 10–11; subsequent English headings are one number behind the pinned source labels. The reader now:

- displays English Text 10 as source range 1.11.10–1.11.11;
- shifts later headings forward by one; and
- combines the shifted source ranges 1.11.16 and 1.11.17–1.11.18 as 1.11.16–1.11.18.

The final existing stanza is now displayed under source label 1.11.40. VedaBase’s edition numbers the chapter’s ending as 1.11.39, so the page follows the explicitly pinned Sanskrit witness’s labels and records the edition difference. The grouping was checked against [VedaBase 1.11.10](https://vedabase.io/en/library/sb/1/11/10/), [1.11.11](https://vedabase.io/en/library/sb/1/11/11/), and its [chapter ending at 1.11.39](https://vedabase.io/en/library/sb/1/11/39/).

Translation paragraph breaks are preserved when source blocks are grouped.

## Reader and typography

Canto 1 now loads the current shared responsive styles and word-for-word reader assets used by the later canto pages. This fixes the stale cache references that kept the page from receiving the standardized sizes. No Canto 1-only font or size override was added.

## Verification

- Parsed the 19 pinned English and Sanskrit chapter files.
- Checked that the resulting article ranges cover 1.1.1–1.19.40 exactly once.
- Confirmed all 4,817 Canto 1 word/phrase pairs are non-empty and source-blob linked.
- Confirmed the 1.16.25 Devanāgarī override is text-identical to the pinned Sanskrit verse after whitespace normalization.
- JavaScript syntax compilation passed.
