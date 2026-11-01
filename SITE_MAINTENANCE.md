# Site maintenance

The document and Indology essays share `site/assets/css/article-standard.css` and the progressive enhancements in `site/assets/js/article-standard.js`. The Vishnu article is the reference for the paper background, serif typography, contents sidebar, quotation rules, Sanskrit disclosures, and responsive tables.

## Editing articles

Edit the complete article inside `#source-content` in its `index.html`. Keep one page title, stable heading IDs, and both contents lists linked to those IDs. The content must remain visible without JavaScript. Native `<details>` elements provide the Sanskrit controls; the script updates labels and the active contents entry without rebuilding the document.

Do not attach the old article pagination or body-replacement scripts to the standardized pages. Their source files remain available for historical material and legacy fragments. The former reader omitted more than 200 paragraphs and two illustrations from the women article; the complete native transcription has been restored. The Shiva cover is restored as well.

`tools/article-content-audit.json` records the audited paragraph, table, row, image, and disclosure counts. Review changes against the original source before reducing these counts. Preserve source spelling, quotation marks, and citation punctuation.

The Purana reference maps keep their interactive data and controls, with the shared article navigation and palette. Scripture and verse readers retain their study interfaces.

## Validation and publication

Run:

```sh
python3 tools/scripts/site-checks/prepare-site-deploy.py
VERIFY_PREPARED=1 python3 tools/scripts/site-checks/verify-site-chrome.py
python3 tools/scripts/site-checks/verify-site-integrity.py
python3 tools/scripts/site-checks/validate-shankara-reader-data.py
python3 tools/scripts/site-checks/verify-mmk-chapter-reader.py
node --check site/assets/js/article-standard.js
```

Preparation repairs legacy navigation, applies cache versions, generates unique search metadata and structured data, and rebuilds the canonical sitemap. It is safe to rerun. The deployment gate checks local links and assets, article anchors, duplicate IDs, source-content counts, JSON-LD, titles, descriptions, and sitemap coverage.

GitHub Actions rebuilds Pagefind and tests desktop/mobile reading, contents links, Sanskrit controls, JavaScript-disabled reading, and search. Browser review screenshots are attached to the article review workflow run. The existing Advaita and MMK validators remain enabled.

## Available source material

The Bhavishya hub links the 216 published Brahmaparvan chapters and the 93 published Pratisargaparvan chapters. Madhyamaparvan and Uttaraparvan have no published transcription in this repository; their old URLs now point to the availability explanation instead of silently opening Brahmaparvan.

The previously documented Naiṣkarmyasiddhi source gap remains: 880 present reader units are validated, while 897 expected source units include 17 absent prose, heading, or other units. The original audit methodology records this distinction. Missing source passages must be supplied from a verified edition.

## Google Search

The public sitemap is `https://hinduismlibrary.github.io/advaita/sitemap.xml`. Submit it in the owner's Google Search Console property. Redirects, internal source pages, parameter-only reader shells, and search results are excluded from the canonical sitemap. Article text, navigation, and search metadata are delivered in HTML, and article/breadcrumb structured data contains only supported source information.

This project cannot set the host-root `/robots.txt` for `hinduismlibrary.github.io` from its `/advaita/` directory. A file placed at `/advaita/robots.txt` would not control crawling of this host. Search Console submission uses the real sitemap URL above.
