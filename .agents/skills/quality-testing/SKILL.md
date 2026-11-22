---
name: quality-testing
description: Select and report meaningful structural, data, and browser checks for Advaita Library changes without editing the product to silence failures.
---

# Quality testing

Own validation of an integrated candidate. Select checks based on the changed files, routes, data type, and behavior. Report evidence and limits; do not author a fix or certify source accuracy.

## Read first

- The user request and specialist handoffs
- `SITE_MAINTENANCE.md` and `ADVAITA_READER_AUDIT_METHODOLOGY.md` as relevant
- CI workflows under `.github/workflows/`
- The specific validator and its documented scope

## Choose relevant checks

- **Standardized articles / links / SEO:** `verify-site-integrity.py`, with prepared-site chrome checks when applicable.
- **Shared chrome:** `verify-site-chrome.py` and its matching workflow.
- **Shankara JSON or routes:** `validate-shankara-reader-data.py` and the reader standardization checks.
- **MMK reader:** `verify-mmk-chapter-reader.py` and `.github/workflows/validate-mmk-chapter-reader.yml`.
- **Editorial reader:** `verify-mandukya-editorial-reader.py` and its workflow.
- **Browser controls and layout:** the relevant browser script/workflow, such as `article-browser-checks.py`, `verify-advaita-reader-browser.py`, or `visual-smoke.py`.
- **Build/search:** use the exact pinned Pagefind command from `.github/workflows/publish-pages.yml` when the candidate changes deploy content or indexing.

Check actual behavior on affected routes. Where the feature is user-facing, exercise a representative desktop and mobile viewport; check native reading without JavaScript when the page promises it. A process starting or a port opening alone is not a functional check.

## Safe execution and reporting

- `tools/scripts/site-checks/prepare-site-deploy.py` rewrites HTML, metadata, cache versions, and the sitemap. Run it only in a disposable copy for review unless the user explicitly asked for a prepared site artifact.
- Preserve command exit codes and identify the revision/artifact checked. Do not pipe away failures or describe commands that did not run as passed.
- Label each check `passed`, `failed`, `skipped`, or `unrun`, with a short result and reason.
- Investigate failures enough to separate environment/setup failures from code or design defects. Keep unrelated failures and known limitations visible.
- Report visual/browser behavior directly; screenshots are evidence for review, not a substitute for an assertion or interaction.
- Inspect each workflow's event and path filters before saying a check ran for a pull request. `publish-pages.yml` now runs the named `Validate site` job on pull requests, with read-only permissions, prepared-site validation, a Pagefind build, and browser smoke checks. Its `Publish validated site` job runs only on `main` pushes or a manual dispatch from `main`.

## Do not

- Do not edit source, data, CSS, test scope, counts, or assertions solely to make a run green. When an assertion omits a documented design token or data contract, record the evidence and make a focused expectation correction; do not change product styling just to satisfy a test.
- Do not replace a meaningful test with a syntax check, zero-test run, or trivial smoke test.
- Do not infer semantic correctness from structural validation, or accessibility from a screenshot alone.
- Do not expand into unrelated suites after the relevant gates pass unless new evidence warrants it.
- Do not claim deploy readiness when required checks failed, were skipped, or were not run.
- Do not call an after-merge check a branch-protection gate. If the needed PR check is missing, report that as a release-control gap for GitHub settings/workflow configuration.

## Visual-smoke palette

`tools/scripts/site-checks/visual-smoke.py` accepts `rgb(84, 89, 93)` as a neutral secondary text color used by existing index styles. Keep the expected palette aligned with documented site styling. If the site’s color system changes, review the page-family rules and accessibility impact before changing either the style or assertion.

## Completion and handoff

Use the shared pipeline handoff template. List command/browser checks and statuses, exact route and viewport, observed result, failures and diagnosis, source revision, and what remains unrun. Give the coordinator a clear quality assessment with limitations; do not publish.
