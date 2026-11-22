# Website work as a product

Treat this repository as a maintained reading product. Keep primary-source text, editorial prose, source records, verification, visual presentation, and quality review as separate responsibilities.

## Route the work

For a request that changes published content or its presentation, read and follow `.agents/skills/site-product-pipeline/SKILL.md`. It coordinates the relevant specialist skills under `.agents/skills/` and defines their handoffs. Use only the specialists needed for the request; ordinary code maintenance can follow the repository instructions and checks for the affected component.

The specialist skills are:

- `source-library`: editions, source records, provenance, variants, and gaps.
- `raw-transcription`: faithful transcription and structured scripture data.
- `editorial-writing`: original explanatory and editorial prose.
- `evidence-verification`: independent source and content review.
- `visual-styling`: page-family styling and responsive presentation.
- `quality-testing`: selecting and reporting structural and browser checks.

Skills guide the agent; they do not enforce GitHub permissions or CI. Do not treat a skill’s presence as approval to merge, deploy, or publish. Keep production changes reviewable as a diff, and follow the user’s explicit release instructions.
