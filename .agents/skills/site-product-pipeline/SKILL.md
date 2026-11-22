---
name: site-product-pipeline
description: Coordinate source-based content and presentation work on the Advaita library without letting one AI author, verify, style, and approve its own changes.
---

# Site product pipeline

Use this workflow when a request changes scripture or source data, articles, explanatory prose, citations, reader presentation, or a user-facing site flow. The purpose is to keep source truth, interpretation, design, and release review distinct. This skill is an agent workflow; it does not replace human review, CI, branch protections, or release controls.

## Begin with the requested outcome

1. Identify affected work, routes, page family, requested behavior, and whether the user asked for a draft, a code change, verification, or release.
2. Read the relevant repository guidance before editing. At minimum, use `SITE_MAINTENANCE.md` for standardized articles and `ADVAITA_READER_AUDIT_METHODOLOGY.md` for Shankara reader data. Inspect the target files and current `git status`; preserve pre-existing user changes.
3. Define the exact deliverable and which specialist skills apply. Do not run the full pipeline for a request that only needs one isolated phase.

## Sequence and separation of duties

Use specialist subagents when available and useful. Give each the relevant skill, a precise scope, the allowed files, required source material, and a handoff request. Each specialist must report what it did and what it could not establish. If subagents are unavailable, perform the roles in sequence and keep their review records distinct.

For work that needs multiple phases, use this order:

1. **Source library:** establish editions, source identity, exact locators, provenance, variants, and known gaps.
2. **Raw transcription and writing:** produce separate drafts from the approved source record. They may proceed in parallel only when their inputs and output files do not overlap.
3. **Evidence verification:** a reviewer who did not author the candidate checks source fidelity, claims, data contracts, and uncertainty. Return flags to the author; do not silently repair their work.
4. **Visual styling:** once content and structure are agreed, make scoped presentation changes without rewriting source text or prose.
5. **Quality testing:** assess the integrated candidate and report relevant checks, including browser behavior where applicable.
6. **Coordinator review:** inspect the combined diff and handoffs, resolve or clearly retain flags, and present the result for user review.

The coordinator owns integration, not unilateral approval of scholarly accuracy. Do not have two agents write to the same files in the shared workspace. Prefer separate draft artifacts or proposed patches from specialists; the coordinator applies a chosen patch after reviewing it. Parallelize only independent work.

## Required handoff

Use `.agents/skills/site-product-pipeline/references/handoff-template.md` for multi-role work. Keep the candidate distinct from its evidence and review. A completed pipeline has:

- an identified request, affected route/work, scope, and changed files;
- the source record and exact locators for source-backed claims or text;
- separate author and reviewer identities or roles;
- verification and quality results labeled `passed`, `failed`, `skipped`, or `unrun`;
- unresolved variants, gaps, and limitations stated plainly;
- a reviewable diff with no unrelated generated changes.

An automated structural pass is not a judgment that a Sanskrit reading or translation is correct. A browser pass is not evidence of source fidelity. Keep these claims separate.

## Repository boundaries

- Follow the applicable specialist skill’s `Do` and `Do not` rules. Do not invent source readings, citations, references, or missing passages.
- Keep site-facing changes within the requested page family. Do not broaden CSS or content changes to unrelated routes without explicit scope.
- `tools/scripts/site-checks/prepare-site-deploy.py` rewrites prepared site files. When preparation is needed, operate on a disposable copy and leave the checkout’s source files intact unless the user explicitly requested a prepared artifact.
- Do not suppress a failing assertion, change source counts to make a gate pass, or describe an unrun check as passed. The quality-testing skill defines status reporting.
- Never commit, push to `main`, merge, deploy, or publish as an implicit final step. Obtain explicit user direction for any release action and use the repository’s review and CI path.

## GitHub release gate

Skills are guidance, not an access-control boundary. `.github/workflows/publish-pages.yml` now runs a read-only validation job on every pull request to `main`; the job builds and checks the prepared site and runs browser smoke review. Its separate deployment job only runs after validation on `main` pushes or a manual dispatch from `main`. `.github/workflows/visual-smoke.yml` remains available for manual review. Inspect workflow triggers before claiming a check will block a merge.

To make the product boundary real, keep AI work on a feature branch, require a pull request and human review for `main`, and require the `Validate site` status check from `publish-pages.yml`. Restrict direct pushes and bypasses in GitHub repository settings. Checks that only run after a `main` push cannot block a merge. Do not change branch protection or release settings from this skill.

## Stop conditions

Pause the affected content phase when its authoritative source or precise locator is missing, when editions conflict, or when a material reading cannot be resolved. Continue independent work if useful, but keep the affected output marked as a draft or blocked. A known source gap must stay visible; do not replace it with plausible AI-generated content.
