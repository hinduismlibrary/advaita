from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path("site")
ARTICLE = ROOT / "articles/mulamadhyamakakarika-with-chandrakirti"
CHAPTER = ARTICLE / "chapter-1"
PAGE = ARTICLE / "chapter-1.html"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.links: list[str] = []
        self.mains = 0
        self.details = 0
        self.current_location = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if "id" in values:
            self.ids.append(values["id"] or "")
        if tag == "a" and (values.get("href") or "").startswith("#"):
            self.links.append(values["href"] or "")
        if tag == "main":
            self.mains += 1
        if tag == "details" and any(name in (values.get("class") or "") for name in ("mmk-sanskrit-original", "mmk-introduction-sanskrit")):
            self.details += 1
        if tag == "a" and values.get("aria-current") == "location":
            self.current_location += 1


html = PAGE.read_text(encoding="utf-8")
parser = PageParser()
parser.feed(html)
assert parser.mains == 1, "The reader should have one main landmark."
assert len(parser.ids) == len(set(parser.ids)), "The reader contains duplicate IDs."
assert 'id="mmk-reader-content" tabindex="-1"' in html, "The skip-link target should be keyboard-focusable."
assert parser.current_location == 1, "Exactly one contents link should be active on load."
assert parser.details == 15, "Expected Sanskrit panels for the introduction and all 14 verses."

sections = re.findall(r'<section[^>]*id="(introduction|mmk-1-\d+)"[^>]*data-mmk-section', html)
expected = ["introduction", *[f"mmk-1-{n}" for n in range(1, 15)]]
assert sections == expected, f"Chapter sections are out of order or missing: {sections}"
for n in range(1, 15):
    assert f'id="mmk-1-{n}"' in html
    assert f'<h2><span>MMK</span> 1.{n}</h2>' in html
    assert f'id="original-sanskrit-{n}"' in html
    assert "Candrakīrti’s Commentary" in html
assert 'href="https://krishnavyasmuni.github.io/advaita/articles/mulamadhyamakakarika-with-chandrakirti/chapter-1.html"' in html
assert "mmk-reader-toc.js?v=20261019-full-scroll-reader-1" in html
assert all(link[1:] in parser.ids for link in parser.links), "A chapter anchor points to a missing section."

contents = (CHAPTER / "contents.html").read_text(encoding="utf-8")
for target in expected:
    assert f"chapter-1.html#{target}" in contents, f"Contents page is missing {target}."
for n in range(1, 15):
    old = (CHAPTER / f"1.{n}.html").read_text(encoding="utf-8")
    assert f"chapter-1.html#mmk-1-{n}" in old, f"Legacy route 1.{n} does not redirect to its section."
    assert 'name="robots" content="noindex,follow"' in old

toc_script = (ROOT / "assets/js/mmk-reader-toc.js").read_text(encoding="utf-8")
assert 'setAttribute("aria-current","location")' in toc_script
assert 'removeAttribute("aria-current")' in toc_script
css = (ROOT / "assets/css/mmk-reader.css").read_text(encoding="utf-8")
assert '.mmk-reader-toc__links a[aria-current="location"]' in css
assert "@media(max-width:850px)" in css

root_index = (ARTICLE / "index.html").read_text(encoding="utf-8")
assert f"{ARTICLE.as_posix().split('site/')[1]}/chapter-1.html" in root_index
assert "chapter-1.html#introduction" in root_index
sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
assert "https://krishnavyasmuni.github.io/advaita/articles/mulamadhyamakakarika-with-chandrakirti/chapter-1.html" in sitemap
print("Validated continuous Chapter 1 reader: introduction, verses 1.1–1.14, Sanskrit panels, anchors, redirects, and single active contents link.")
