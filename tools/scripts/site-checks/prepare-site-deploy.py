#!/usr/bin/env python3
"""Prepare the committed static site for its GitHub Pages deployment."""
from __future__ import annotations

import argparse
import re
from pathlib import Path

CACHE_VERSION = "20261020-on-site-search-1"
REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_SITE = REPO_ROOT / "site"
MMK_PREFIX = "articles/mulamadhyamakakarika-with-chandrakirti"
CACHE_REPLACEMENTS = (
    ("/advaita/assets/js/site.js?v=20261019-unified-theme-4", f"/advaita/assets/js/site.js?v={CACHE_VERSION}"),
    ("/advaita/assets/js/site-chrome.js?v=20261019-unified-theme-4", f"/advaita/assets/js/site-chrome.js?v={CACHE_VERSION}"),
    ("/advaita/assets/css/site-chrome.css?v=20261019-unified-theme-4", f"/advaita/assets/css/site-chrome.css?v={CACHE_VERSION}"),
)
BODY_TAG = re.compile(r"<body\b[^>]*>", re.IGNORECASE)
CLASS_ATTR = re.compile(r"\bclass\s*=\s*([\"'])([^\"']*)\1", re.IGNORECASE)
VP_CSS_LINK = re.compile(r"\s*<link\b[^>]*vishnu-purana-chapter-reader\.css[^>]*>", re.IGNORECASE)


def prepare(site: Path) -> tuple[int, int]:
    html_files = sorted(site.rglob("*.html"))
    if not html_files:
        raise RuntimeError(f"No HTML pages found under {site}")

    changed_pages = 0
    repaired_mmk_pages = 0
    for page in html_files:
        relative = page.relative_to(site).as_posix()
        content = page.read_text(encoding="utf-8")
        updated = content
        for old, new in CACHE_REPLACEMENTS:
            updated = updated.replace(old, new)

        if relative.startswith(MMK_PREFIX + "/"):
            before = updated
            body = BODY_TAG.search(updated)
            if body:
                tag = body.group(0)
                class_match = CLASS_ATTR.search(tag)
                if class_match:
                    classes = class_match.group(2).split()
                    cleaned = " ".join(name for name in classes if name != "vp-book-1")
                    if cleaned != class_match.group(2):
                        replacement = tag[:class_match.start(2)] + cleaned + tag[class_match.end(2):]
                        updated = updated[:body.start()] + replacement + updated[body.end():]
            updated = VP_CSS_LINK.sub("", updated)
            if updated != before:
                repaired_mmk_pages += 1
            final_body = BODY_TAG.search(updated)
            if final_body:
                class_match = CLASS_ATTR.search(final_body.group(0))
                if class_match and "vp-book-1" in class_match.group(2).split():
                    raise RuntimeError(f"Vishnu Purana Book 1 styling remains on {page}")
            if "vishnu-purana-chapter-reader.css" in updated:
                raise RuntimeError(f"Vishnu Purana reader CSS remains on {page}")

        if updated != content:
            page.write_text(updated, encoding="utf-8")
            changed_pages += 1

    return changed_pages, repaired_mmk_pages


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", type=Path, default=DEFAULT_SITE)
    args = parser.parse_args()
    changed, repaired = prepare(args.site.resolve())
    print(f"Prepared {changed} HTML pages for cache-safe deployment.")
    print(f"Removed the mismatched Vishnu Purana reader styling from {repaired} MMK pages.")


if __name__ == "__main__":
    main()
