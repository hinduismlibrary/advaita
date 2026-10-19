# Contributing and publishing

## Site files
The published website lives under `docs/` in the organized tree. Preserve original HTML filenames, relative asset references and published paths. Old URLs under `/advaita/articles/`, `/advaita/pages/`, and `/advaita/books/` must continue to work.

Use `docs/puranas/` to browse each Purāṇa by traditional parvan, book or canto. Canonical chapter HTML stays in `docs/articles/` because these locations correspond to long-established public URLs.

## Required staged Pages cutover — do not merge this preview directly
The **current live source is `main /`**, while the organized tree requires **`main /docs`**. Switching the Pages source immediately is not sufficient: GitHub may not offer `/docs` while that folder is absent from `main`.

1. Save a recovery bundle of all current repository refs **outside the repo**.
2. On `main`, first **copy** the new `docs/` tree into place **without removing** the old root `index.html`, `assets/`, `articles/`, `books/`, `pages/` or other published paths. Verify the still-root-based site builds and deploys successfully. This is a temporary staging step, not the final layout.
3. In **GitHub Settings → Pages → Build and deployment**, select **Deploy from a branch → main → /docs**, and verify the deployed site and old bookmarked routes. This setting requires administration permission.
4. Only **after** the `/docs` deployment succeeds, complete the cleanup that removes the duplicated old root site files. The final root will have exactly five entries, with original site content still available inside `docs/`.
5. Verify all sitemap routes, representative `?section=` and fragment-navigation requests, active JS/CSS/data assets, downloads, favicon, 404 behavior and mobile views.

Existing maintenance workflows are adapted for the new source-relative directory but must still be exercised as appropriate before enabling any automated writeback. A successful source-only Jekyll build is not a substitute for an actual deployed-site test.

Avoid deleting scripts, assets, duplicate-looking HTML routes or data without proving that the current readers do not request them.
