#!/usr/bin/env python3
"""Fail when a published HTML document does not load the current shared site chrome."""
from pathlib import Path
import os
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
SITE = Path(os.environ.get("VERIFY_SITE_ROOT", ROOT / "site")).resolve()
SUPPORTED_THEME_VERSIONS = ("20261019-unified-theme-4", "20261020-on-site-search-1", "20261021-original-iast-2", "20261021-wikisource-4", "20261021-numbered-contents-1", "20261021-standardized-blue-1", "20261022-link-styles-1", "20261022-wikisource-directory-1", "20261022-wikisource-inspired-2", "20261022-wikisource-inspired-3", "20261022-standardized-reading-1", "20261023-navigation-devanagari-1", "20261023-standardized-sitewide-1", "20261023-standardized-sitewide-2", "20261023-reader-layout-3", "20261023-reader-layout-4", "20261023-reader-layout-5", "20261023-reader-layout-6", "20261023-reader-layout-7", "20261023-reader-layout-8", "20261023-reader-layout-9", "20261023-sitewide-monochrome-1", "20261023-sitewide-monochrome-2", "20261023-sitewide-bilingual-blue-1", "20261023-sitewide-bilingual-blue-2", "20261023-sitewide-bilingual-blue-3", "20261023-purana-chapter-names-1", "20261024-public-navigation-4", "20261024-readable-home-5", "20261024-readable-home-6", "20261024-balanced-home-7", "20261025-wikisource-list-1", "20261025-wikisource-home-2", "20261025-wikisource-home-3", "20261025-wikisource-home-4", "20261025-wikisource-home-5", "20261025-wikisource-home-6", "20261025-wikisource-home-7", "20261025-wikisource-home-8", "20261026-document-cleanup-1", "20261026-document-cleanup-2", "20261027-document-template-2", "20261027-heatmap-colors-2", "20261027-document-template-3", "20261027-document-brand-3", "20261031-document-standard-1", "20261101-site-repair-1")
SUPPORTED_THEME_PATTERN = "|".join(re.escape(version) for version in SUPPORTED_THEME_VERSIONS)
LOADER = re.compile(
    r"""<script\b[^>]*\bsrc=["'][^"']*/assets/js/(?:site|site-chrome)\.js\?v=(?:THEME_VERSION)["']""".replace("THEME_VERSION", SUPPORTED_THEME_PATTERN),
    re.IGNORECASE,
)
HTML_DOC = re.compile(r"<html\b", re.IGNORECASE)
BODY = re.compile(r"<body\b", re.IGNORECASE)

PREPARE = ROOT / "tools/scripts/site-checks/prepare-site-deploy.py"
CHROME_JS = SITE / "assets/js/site-chrome.js"
prepare_source = PREPARE.read_text(encoding="utf-8")
chrome_source = CHROME_JS.read_text(encoding="utf-8")
cache_line = next((line for line in prepare_source.splitlines() if line.startswith("CACHE_VERSION = ")), "")
quote = '"'
css_marker = "site-chrome.css?v="
cache_version = cache_line.split(quote, 2)[1] if quote in cache_line else None
css_version = chrome_source.split(css_marker, 1)[1].split(quote, 1)[0] if css_marker in chrome_source else None
if not cache_version or not css_version or cache_version != css_version:
    expected = cache_version or "missing deploy cache version"
    actual = css_version or "missing CSS cache version"
    print(f"Shared CSS cache version mismatch: deploy uses {expected}; site-chrome.js loads {actual}.")
    sys.exit(1)

SITE_JS = SITE / "assets/js/site.js"
site_js_source = SITE_JS.read_text(encoding="utf-8")
js_match = re.search(r"""assets/js/site-chrome\.js\?v=([^"'\s)]+)""", site_js_source)
js_version = js_match.group(1) if js_match else None
if not js_version or js_version != cache_version:
    actual = js_version or "missing site-chrome.js loader version"
    print(f"Shared JavaScript cache version mismatch: deploy uses {cache_version}; site.js loads {actual}.")
    sys.exit(1)

prepared = os.environ.get("VERIFY_PREPARED") == "1"
expected_loader = re.compile(
    rf"""<script\b[^>]*\bsrc=["'][^"']*/assets/js/(?:site|site-chrome)\.js\?v={re.escape(cache_version)}["']""",
    re.IGNORECASE,
)
expected_css = f"/advaita/assets/css/site-chrome.css?v={cache_version}"
ISOLATED_READER = re.compile(r"""\bdata-reader-isolated\s*=\s*(["'])mandukya\1""", re.IGNORECASE)
LOCAL_NAV = re.compile(
    r"""<nav\b(?=[^>]*\bclass\s*=\s*(["'])[^"']*\bmk-local-nav\b[^"']*\1)[^>]*>([\s\S]*?)</nav\s*>""",
    re.IGNORECASE,
)
LOCAL_HEADER = re.compile(r"""<header\b[^>]*\bclass\s*=\s*(["'])[^"']*\bmk-local-header\b[^"']*\1""", re.IGNORECASE)
HOME_LINK = re.compile(r"""<a\b[^>]*\bhref\s*=\s*(["'])/advaita/\1[^>]*>""", re.IGNORECASE)
TEXTS_LINK = re.compile(r"""<a\b[^>]*\bhref\s*=\s*(["'])/advaita/books/adi-shankaracharya/\1[^>]*>""", re.IGNORECASE)
SEARCH_LINK = re.compile(r"""<a\b[^>]*\bhref\s*=\s*(["'])/advaita/search/\1[^>]*>""", re.IGNORECASE)
READER_STYLESHEET = re.compile(r"<link\b(?=[^>]*mandukya-editorial-reader\.css)[^>]*>", re.IGNORECASE)
SHARED_CHROME = re.compile(r"(?:site-chrome\.(?:css|js))", re.IGNORECASE)

missing = []
checked = 0
for path in SITE.rglob("*.html"):
    relative = path.relative_to(SITE).as_posix()
    if relative.startswith("assets/templates/"):
        continue
    source = path.read_text(encoding="utf-8", errors="replace")
    # Content fragments are fetched into full readers and do not have a document shell.
    if not HTML_DOC.search(source) or not BODY.search(source):
        continue
    checked += 1
    if ISOLATED_READER.search(source):
        nav = LOCAL_NAV.search(source)
        nav_source = nav.group(2) if nav else ""
        body = re.search(r"<body\b[^>]*>", source, re.IGNORECASE)
        body_tag = body.group(0) if body else ""
        body_class = re.search(r"""\bclass\s*=\s*(["'])(.*?)\1""", body_tag, re.IGNORECASE)
        if (
            not LOCAL_HEADER.search(source)
            or not nav
            or 'aria-label="Main site navigation"' not in nav.group(0)
            or not HOME_LINK.search(nav_source)
            or not TEXTS_LINK.search(nav_source)
            or not SEARCH_LINK.search(nav_source)
            or not READER_STYLESHEET.search(source)
        ):
            missing.append(relative + ' (isolated reader masthead, navigation, search link, or stylesheet missing)')
        if SHARED_CHROME.search(source):
            missing.append(relative + ' (isolated reader unexpectedly loads shared chrome)')
        if not body_class or "mk-reading-page" not in body_class.group(2).split():
            missing.append(relative + ' (isolated reader body class missing)')
        if prepared and body_class and "vd-chrome-page" in body_class.group(2).split():
            missing.append(relative + ' (isolated reader received shared body class)')
        continue
    if 'data-article-standard="1"' in source or 'data-article-tool="1"' in source:
        required = ('vd-global-header', 'aria-label="Primary navigation"', 'role="search"', 'article-standard.css')
        if not all(marker in source for marker in required):
            missing.append(relative + ' (static navigation or search missing)')
        continue
    if not (expected_loader if prepared else LOADER).search(source):
        missing.append(relative)
    if prepared and (expected_css not in source or 'vd-chrome-page' not in source):
        missing.append(relative + ' (shared CSS or body class missing)')

if missing:
    print(f"{len(missing)} of {checked} page documents lack the shared chrome at supported cache versions {SUPPORTED_THEME_VERSIONS}:")
    for relative in missing:
        print(f" - {relative}")
    sys.exit(1)

print(f"All {checked} full HTML pages load the {'current' if prepared else 'supported'} shared chrome asset.")

