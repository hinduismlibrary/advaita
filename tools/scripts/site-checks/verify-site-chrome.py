#!/usr/bin/env python3
"""Fail when a published HTML document does not load the current shared site chrome."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / 'site'
THEME_VERSION = "20261019-unified-theme-4"
LOADER = re.compile(
    r"""<script\b[^>]*\bsrc=["'][^"']*/assets/js/(?:site|site-chrome)\.js\?v=20261019-unified-theme-4["']""",
    re.IGNORECASE,
)
HTML_DOC = re.compile(r"<html\b", re.IGNORECASE)
BODY = re.compile(r"<body\b", re.IGNORECASE)

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
    print(f"{len(missing)} of {checked} page documents lack the shared chrome at version {THEME_VERSION}:")
    for relative in missing:
        print(f" - {relative}")
    sys.exit(1)

print(f"All {checked} full HTML pages load the shared chrome at version {THEME_VERSION}.")
