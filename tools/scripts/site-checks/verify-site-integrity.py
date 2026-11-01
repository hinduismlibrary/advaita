#!/usr/bin/env python3
"""Validate published routes, native article content, and canonical search metadata."""
from __future__ import annotations

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / "site"
BASE = "https://hinduismlibrary.github.io/advaita/"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Document(HTMLParser):
    def __init__(self, content: str):
        super().__init__(convert_charrefs=True)
        self.elements: list[tuple[str, dict[str, str]]] = []
        self.ids: list[str] = []
        self.title = ""
        self.jsonld: list[str] = []
        self.current = ""
        self.buffer = ""
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        a = {key: value or "" for key, value in attrs}
        self.elements.append((tag, a))
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "title" or (tag == "script" and a.get("type") == "application/ld+json"):
            self.current = tag
            self.buffer = ""

    def handle_data(self, value):
        if self.current:
            self.buffer += value

    def handle_endtag(self, tag):
        if tag == self.current:
            if tag == "title":
                self.title = self.buffer.strip()
            else:
                self.jsonld.append(self.buffer)
            self.current = ""

    def values(self, tag, key, value, result):
        return [a.get(result, "") for t, a in self.elements if t == tag and a.get(key) == value]


def main():
    errors = []
    documents = {}
    content_by_path = {}
    for path in SITE.rglob("*.html"):
        content = path.read_text(encoding="utf-8")
        doc = Document(content)
        if any(tag == "html" for tag, _ in doc.elements):
            documents[path.resolve()] = doc
            content_by_path[path.resolve()] = content
    canonical_urls = set()
    titles = Counter()
    checked_links = 0
    static_articles = 0
    for path, doc in documents.items():
        relative = path.relative_to(SITE.resolve()).as_posix()
        content = content_by_path[path]
        standard = 'data-article-standard="1"' in content
        noindex = any("noindex" in value.lower() for value in doc.values("meta", "name", "robots", "content"))
        if not noindex:
            canonical = doc.values("link", "rel", "canonical", "href")
            if len(canonical) != 1 or not canonical[0].startswith(BASE):
                errors.append(f"{relative}: needs exactly one canonical URL on the current host")
            else:
                canonical_urls.add(canonical[0])
            titles[doc.title.casefold()] += 1
            descriptions = doc.values("meta", "name", "description", "content")
            if len(descriptions) != 1 or not descriptions[0].strip():
                errors.append(f"{relative}: missing or duplicate description")
            if not doc.title:
                errors.append(f"{relative}: missing title")
            if not doc.jsonld:
                errors.append(f"{relative}: missing structured data")
        for raw in doc.jsonld:
            try:
                json.loads(raw)
            except ValueError as exc:
                errors.append(f"{relative}: invalid structured data: {exc}")
        if standard:
            static_articles += 1
            headings = [a for tag, a in doc.elements if tag == "h1"]
            if len(headings) != 1:
                errors.append(f"{relative}: expected one article title")
            duplicates = [key for key, count in Counter(doc.ids).items() if count > 1]
            if duplicates:
                errors.append(f"{relative}: duplicate anchor IDs {duplicates}")
            if not any(tag == "main" for tag, _ in doc.elements):
                errors.append(f"{relative}: missing main landmark")
            if any(tag == "div" and a.get("id") == "source-document" and "hidden" in a for tag, a in doc.elements):
                errors.append(f"{relative}: article still depends on a hidden JavaScript source")
        for tag, a in doc.elements:
            for attribute in ("href", "src"):
                raw = a.get(attribute, "")
                if not raw or raw.startswith(("mailto:", "tel:", "data:", "javascript:")):
                    continue
                page_url = BASE + relative
                parsed = urlparse(urljoin(page_url, raw))
                if parsed.netloc != urlparse(BASE).netloc:
                    continue
                if not parsed.path.startswith("/advaita/"):
                    errors.append(f"{relative}: link outside the project: {raw}")
                    continue
                dest = SITE / unquote(parsed.path[len("/advaita/"):])
                if dest.is_dir():
                    dest = dest / "index.html"
                checked_links += 1
                if not dest.is_file():
                    errors.append(f"{relative}: missing target {raw}")
                elif standard and parsed.fragment and dest.resolve() in documents:
                    target = documents[dest.resolve()]
                    # Cross-reader verse anchors can be supplied by their reader script.
                    if (dest.resolve() == path or 'data-article-standard="1"' in content_by_path[dest.resolve()]) and unquote(parsed.fragment) not in target.ids:
                        errors.append(f"{relative}: missing anchor {raw}")
    if any(count > 1 for count in titles.values()):
        errors.append("Duplicate titles among canonical indexable pages")
    sitemap = ET.parse(SITE / "sitemap.xml")
    urls = {node.text for node in sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
    if urls != canonical_urls:
        errors.append(f"Sitemap differs from the canonical indexable pages: {len(urls ^ canonical_urls)} URLs")
    for item in json.loads((ROOT / "tools/article-content-audit.json").read_text()):
        path = (SITE / "articles" / item["slug"] / "index.html").resolve()
        doc = documents[path]
        for tag, key in (("p", "paragraphs"), ("table", "tables"), ("tr", "table_rows"), ("img", "images")):
            count = sum(t == tag for t, _ in doc.elements)
            if count < item[key]:
                errors.append(f"{item['slug']}: source content lost: {tag} count {count}, audited minimum {item[key]}")
    if errors:
        print("Site integrity failed:")
        print("\n".join(" - " + value for value in sorted(set(errors))))
        sys.exit(1)
    print(f"Validated {len(documents)} HTML documents, {static_articles} static reading pages, {checked_links} local references, and {len(urls)} canonical sitemap URLs.")


if __name__ == "__main__":
    main()
