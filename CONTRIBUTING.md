# Contributing and publishing

## Site files
The published website lives under `docs/`. Keep its existing HTML filenames and relative asset paths intact; URLs under `/advaita/articles/`, `/advaita/pages/`, and `/advaita/books/` must continue to work.

Use `docs/puranas/` to browse each Purāṇa by parvan, book, or canto. These folders are source navigation guides. The existing readers remain in `docs/articles/` because moving them would break bookmarks, script references, and URLs.

## Safe publishing cutover
Before merging this preview, change **GitHub Settings → Pages → Build and deployment → Deploy from a branch → main → /docs** at the coordinated cutover. The current site is built from the repository root.

A Pages-source switch requires repository administration permission. Never merge the docs-only tree while the source is still `main /`. The workflow files in `.github/workflows/` currently reference paths from the old root; update and validate maintenance workflows before using those write actions with the new layout.

After cutover, verify all sitemap routes, example `?section=` chapter requests, article navigation, scripts, styles, fonts, downloads, and 404 pages. Preserve data-driven and external URLs.
