#!/usr/bin/env python3
"""Prepare the committed static site for its GitHub Pages deployment."""
from __future__ import annotations

import argparse
import os
import re
from html import escape
from pathlib import Path
from site_seo import base_url_for, prepare_site_seo, url_for_page
import json

CACHE_VERSION = "20261031-document-standard-1"
DEFAULT_REPOSITORY = "hinduismlibrary/advaita"
TEXT_SUFFIXES = frozenset({".html", ".css", ".js", ".mjs", ".json", ".xml", ".svg", ".txt", ".md", ".csv", ".webmanifest", ".map"})
REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_SITE = REPO_ROOT / "site"
MMK_PREFIX = "articles/mulamadhyamakakarika-with-chandrakirti"
SITE_JS_URL = re.compile(
    r"""/advaita/assets/js/site\.js(?:\?[^"'\s>]*)?""",
    re.IGNORECASE,
)
BHAVISHYA_CONTROLS_URL = re.compile(
    r"""/advaita/assets/js/bhavishya-controls\.js(?:\?[^"'\s>]*)?""",
    re.IGNORECASE,
)
SHANKARA_READER_URL = re.compile(
    r"""/advaita/assets/js/shankara-reader\.js(?:\?[^"'\s>]*)?""",
    re.IGNORECASE,
)
SITE_CHROME_JS_URL = re.compile(
    r"""/advaita/assets/js/site-chrome\.js(?:\?[^"'\s>]*)?""",
    re.IGNORECASE,
)
WORD_SUMMARY = re.compile(r"(<summary\b[^>]*>)\s*Word[-– ]for[-– ]word\s*(</summary>)", re.IGNORECASE)
CHROME_LINK_TAG = re.compile(r"""<link\b(?=[^>]*\bsite-chrome\.css)[^>]*>""", re.IGNORECASE)
CHROME_LINK_HREF = re.compile(r"""\bhref\s*=\s*(["'])[^"']*site-chrome\.css(?:\?[^"']*)?\1""", re.IGNORECASE)
HEAD_CLOSE = re.compile(r"</head\s*>", re.IGNORECASE)
HEAD_OPEN = re.compile(r"<head\b[^>]*>", re.IGNORECASE)
HTML_DOC = re.compile(r"<html\b", re.IGNORECASE)
BODY_TAG = re.compile(r"<body\b[^>]*>", re.IGNORECASE)
CLASS_ATTR = re.compile(r"""\bclass\s*=\s*(["'])([^"']*)\1""", re.IGNORECASE)
VP_CSS_LINK = re.compile(r"\s*<link\b[^>]*vishnu-purana-chapter-reader\.css[^>]*>", re.IGNORECASE)


def ensure_shared_chrome(content: str) -> str:
    if not HTML_DOC.search(content) or not BODY_TAG.search(content):
        return content

    versioned_href = f'/advaita/assets/css/site-chrome.css?v={CACHE_VERSION}'
    chrome_link = CHROME_LINK_TAG.search(content)
    if chrome_link:
        tag = chrome_link.group(0)
        if CHROME_LINK_HREF.search(tag):
            tag = CHROME_LINK_HREF.sub(f'href="{versioned_href}"', tag, count=1)
            content = content[:chrome_link.start()] + tag + content[chrome_link.end():]
    else:
        link = f'  <link rel="stylesheet" href="{versioned_href}">\n'
        head_close = HEAD_CLOSE.search(content)
        if head_close:
            content = content[:head_close.start()] + link + content[head_close.start():]
        else:
            head_open = HEAD_OPEN.search(content)
            if head_open:
                content = content[:head_open.end()] + "\n" + link + content[head_open.end():]

    body = BODY_TAG.search(content)
    if body:
        tag = body.group(0)
        class_match = CLASS_ATTR.search(tag)
        if class_match:
            classes = class_match.group(2).split()
            if "vd-chrome-page" not in classes:
                classes.append("vd-chrome-page")
                replacement = tag[:class_match.start(2)] + " ".join(classes) + tag[class_match.end(2):]
                content = content[:body.start()] + replacement + content[body.end():]
        else:
            replacement = tag[:-1] + ' class="vd-chrome-page">'
            content = content[:body.start()] + replacement + content[body.end():]

    return content


def prepare(site: Path) -> tuple[int, int]:
    html_files = sorted(site.rglob("*.html"))
    if not html_files:
        raise RuntimeError(f"No HTML pages found under {site}")

    changed_pages = 0
    repaired_mmk_pages = 0
    for page in html_files:
        relative = page.relative_to(site).as_posix()
        content = page.read_text(encoding="utf-8")
        updated = SITE_JS_URL.sub(f"/advaita/assets/js/site.js?v={CACHE_VERSION}", content)
        updated = SITE_CHROME_JS_URL.sub(f"/advaita/assets/js/site-chrome.js?v={CACHE_VERSION}", updated)
        updated = BHAVISHYA_CONTROLS_URL.sub(f"/advaita/assets/js/bhavishya-controls.js?v={CACHE_VERSION}", updated)
        updated = SHANKARA_READER_URL.sub(f"/advaita/assets/js/shankara-reader.js?v={CACHE_VERSION}", updated)
        updated = WORD_SUMMARY.sub(r'\1Word for Word\2', updated)
        updated = ensure_shared_chrome(updated)

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


def rewrite_project_base(site: Path, repository: str) -> int:
    owner, separator, repository_name = repository.partition("/")
    if not separator or not owner or not repository_name:
        raise RuntimeError(f"Invalid GitHub repository: {repository!r}")
    if not re.fullmatch(r"[A-Za-z0-9._-]+", repository_name):
        raise RuntimeError(f"Invalid GitHub repository name: {repository!r}")
    if repository_name.casefold() == "advaita":
        return 0

    # User and organization Pages repositories publish at the host root.
    is_user_site = repository_name.casefold() == f"{owner}.github.io".casefold()
    replacement = "" if is_user_site else f"/{repository_name}"
    changed_files = 0
    for path in site.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        updated = content.replace("/advaita", replacement)
        if updated != content:
            path.write_text(updated, encoding="utf-8")
            changed_files += 1
    return changed_files


def create_legacy_project_redirects(site: Path, repository: str) -> int:
    owner, separator, repository_name = repository.partition("/")
    if not separator or not owner or not repository_name:
        raise RuntimeError(f"Invalid GitHub repository: {repository!r}")
    is_user_site = repository_name.casefold() == f"{owner}.github.io".casefold()
    if not is_user_site:
        return 0

    base_url = base_url_for(repository)
    pages = [
        path for path in sorted(site.rglob("*.html"))
        if not path.relative_to(site).as_posix().startswith("advaita/")
    ]
    legacy_root = site / "advaita"
    changed = 0

    for page in pages:
        relative = page.relative_to(site).as_posix()
        target_url = url_for_page(relative, base_url)
        escaped_url = escape(target_url, quote=True)
        js_url = json.dumps(target_url, ensure_ascii=False).replace("<", "\\u003c")
        redirect = (
            "<!doctype html>\n"
            '<html lang="en"><head><meta charset="utf-8">\n'
            '<meta name="robots" content="noindex,follow">\n'
            '<meta name="legacy-pages-redirect" content="true">\n'
            f'<link rel="canonical" href="{escaped_url}">\n'
            f'<meta http-equiv="refresh" content="0;url={escaped_url}">\n'
            "<title>Page moved</title>\n"
            f"<script>window.location.replace({js_url});</script>\n"
            f'</head><body><p>This page has moved. <a href="{escaped_url}">Open the new location</a>.</p></body></html>\n'
        )
        destination = legacy_root / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        if destination.exists() and destination.read_text(encoding="utf-8") == redirect:
            continue
        destination.write_text(redirect, encoding="utf-8")
        changed += 1

    return changed

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", type=Path, default=DEFAULT_SITE)
    parser.add_argument("--repository", default=os.environ.get("GITHUB_REPOSITORY", DEFAULT_REPOSITORY))
    args = parser.parse_args()
    site = args.site.resolve()
    changed, repaired = prepare(site)
    rewritten = rewrite_project_base(site, args.repository)
    redirects = create_legacy_project_redirects(site, args.repository)
    seo_changed, sitemap_pages = prepare_site_seo(site, args.repository)
    print(f"Prepared {changed} HTML pages for cache-safe deployment.")
    print(f"Removed the mismatched Vishnu Purana reader styling from {repaired} MMK pages.")
    print(f"Rewrote the Pages project path in {rewritten} files for {args.repository}.")
    print(f"Created or updated {redirects} legacy /advaita route redirects.")
    print(f"Updated SEO metadata on {seo_changed} full HTML pages.")
    print(f"Generated sitemap.xml with {sitemap_pages} canonical indexable URLs.")


if __name__ == "__main__":
    main()
