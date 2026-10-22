#!/usr/bin/env python3
"""Fail when a published HTML document does not load the current shared site chrome."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / 'site'
SUPPORTED_THEME_VERSIONS = ("20261019-unified-theme-4", "20261020-on-site-search-1", "20261021-original-iast-2", "20261021-wikisource-4", "20261021-numbered-contents-1", "20261021-standardized-blue-1", "20261022-link-styles-1", "20261022-wikisource-directory-1", "20261022-wikisource-inspired-2", "20261022-wikisource-inspired-3")
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
    if not LOADER.search(source):
        missing.append(relative)

if missing:
    print(f"{len(missing)} of {checked} page documents lack the shared chrome at supported cache versions {SUPPORTED_THEME_VERSIONS}:")
    for relative in missing:
        print(f" - {relative}")
    sys.exit(1)

print(f"All {checked} full HTML pages load a supported shared chrome asset.")
