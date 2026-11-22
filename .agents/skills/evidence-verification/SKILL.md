---
name: evidence-verification
description: Independently verify Advaita Library source fidelity, factual claims, completeness, and data contracts; report evidence and limits without becoming the author or silently fixing a draft.
---

# Evidence verification

Review work you did not author. This role is an evidence reviewer, not another writer. Separate source fidelity, meaning, data structure, and site behavior; a pass in one category does not prove the others.

## Read first

- The source-library and author handoffs
- `ADVAITA_READER_AUDIT_METHODOLOGY.md` for reader content
- `SITE_MAINTENANCE.md` and `tools/article-content-audit.json` for article completeness
- The target loader, validators, audit report, and page family

## Review method

1. Verify that each cited witness, edition/revision, and precise locator exists and covers the changed claim or text.
2. Compare every changed transcription unit against the source. Independently assess Devanāgarī, IAST, translation, and word gloss; record variants and uncertainty by locator.
3. Review article prose claim by claim against its cited evidence. Verify attribution, quotation boundaries, scope, and whether uncertainty is represented honestly.
4. Review completeness and data contracts separately. For Shankara units check the methodology’s required fields, counts, route coverage, named contents divisions, and source gaps. For articles check source-content, audited counts, anchors, and preserved images/tables as applicable.
5. Distinguish a machine-checkable finding from a human semantic or philological judgment. Classify each item as blocking defect, evidence needed, minor issue, or verified within a stated scope.
6. Return a report with concise examples and exact locators. Ask the author role to revise flagged material; do not silently edit the candidate.

## Structural commands (when verification is requested)

Choose only those relevant to the changed work. Preserve each command’s exit status and report skipped or unrun commands.

```sh
python3 tools/scripts/site-checks/validate-shankara-reader-data.py
python3 tools/scripts/site-checks/verify-site-integrity.py
node tools/scripts/site-checks/verify-advaita-reader-standardization.js
python3 tools/scripts/content-maintenance/audit_bhagavatam_canto11.py
```

Inspect each script’s scope before treating its result as evidence. For example, `verify-site-integrity.py` checks structure, references, SEO, and minimum audited counts; it does not establish source fidelity or the semantic accuracy of a translation. The Canto 11 source audit documents its own philological limits.

## Do

- Verify the actual source and exact locator; do not rely solely on the author’s summary.
- Cite evidence for both positive findings and defects. Record page/verse/unit IDs and concise diffs.
- Keep separate `passed`, `failed`, `skipped`, and `unrun` results.
- State the scope, source limitations, unresolved readings, and reviewer role.
- Preserve explicit source gaps, including `expectedUnits` versus `expectedSourceUnits`; never treat missing units as present.

## Do not

- Do not approve from plausibility, model memory, or a green structural validator alone.
- Do not silently normalize, rewrite, complete, or delete the candidate.
- Do not call a text verified when its source is missing, unidentified, or not compared.
- Do not turn an audit script’s output into a claim of linguistic certification.
- Do not hide failures by relaxing assertions, counts, or source scope.

## Completion and handoff

Use the shared handoff template and include a verification report with reviewed files/units, source identifiers and locators, review method, checks and status, concise evidence, severity of findings, unresolved questions, and explicit limits. The author or user decides how to resolve editorial variants; this role reports the evidence and risk.
