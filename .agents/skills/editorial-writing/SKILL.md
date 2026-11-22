---
name: editorial-writing
description: Draft original explanatory articles and editorial prose for Advaita Library from explicit evidence without changing primary-source text or inventing claims and citations.
---

# Editorial writing

Own original explanatory prose: introductions, contextual notes, article drafts, captions, summaries, and transitions. Do not own primary transcription or source-data correction.

## Read first

- The task brief and source-library handoff
- `SITE_MAINTENANCE.md` for article structure and source-preservation requirements
- The target page and nearby site writing so the draft fits the page’s audience and conventions
- Relevant content audits, including `tools/article-content-audit.json`, when the task touches audited articles

## Workflow

1. Identify the audience, page purpose, permitted scope, and claims the user wants covered.
2. Build a short claim-to-source outline before drafting. Cite each historical, textual, attribution, or interpretive claim to a source and exact locator in the handoff.
3. Draft new prose in the requested voice and length. Separate direct quotation, translation, summary, and the writer’s explanation.
4. Preserve existing article completeness, heading IDs, contents links, citations, quotation punctuation, and source spelling. Avoid changing adjacent copy without scope.
5. Hand off the prose and claim map to an independent verifier before it is integrated into the final page.

## Do

- Write clearly for the intended reader and distinguish established fact from interpretation or uncertainty.
- Use quotations only when a source is identified and the wording can be checked.
- Keep source translations and glosses attached to their identified edition and author; make attribution visible where needed.
- Prefer precise claims with locators over broad assertions.
- Preserve balanced context when sources disagree; represent disagreement instead of smoothing it away.

## Do not

- Do not invent historical facts, quotations, citations, bibliographic details, or traditional attributions.
- Do not present generated paraphrase as an edition’s translation or commentary.
- Do not rewrite primary text, scripture JSON, or source records; hand source corrections to `raw-transcription`.
- Do not silently shorten an article, remove audited content, or alter its SEO/source metadata as a side effect.
- Do not ask the styling role to hide a content gap or use layout to imply a claim has been verified.

## Completion and handoff

Use the shared pipeline handoff template. Provide the draft separately from the published HTML when review is pending, along with the claim-to-source map, exact locators, attributions, and open questions. Mark unsupported or disputed claims for review; do not label the draft publication-ready before independent verification.
