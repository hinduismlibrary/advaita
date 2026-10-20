from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path("site")
ARTICLE = ROOT / "articles/mulamadhyamakakarika-with-chandrakirti"
CHAPTER = ARTICLE / "chapter-1"
HUB = ARTICLE / "chapter-1.html"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.links: list[str] = []
        self.current_pages: list[str] = []
        self.mains = 0
        self.h2_text: list[str] = []
        self._in_h2 = False
        self._h2_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if "id" in values:
            self.ids.append(values["id"] or "")
        if tag == "a":
            if values.get("href"):
                self.links.append(values["href"] or "")
            if values.get("aria-current") == "page":
                self.current_pages.append(values.get("href") or "")
        if tag == "main":
            self.mains += 1
        if tag == "h2":
            self._in_h2 = True
            self._h2_parts = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "h2" and self._in_h2:
            self.h2_text.append(" ".join(self._h2_parts).strip())
            self._in_h2 = False

    def handle_data(self, data: str) -> None:
        if self._in_h2:
            self._h2_parts.append(data)


def parse(path: Path) -> tuple[str, PageParser]:
    html = path.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(html)
    assert parser.mains == 1, f"{path}: expected one main landmark"
    assert len(parser.ids) == len(set(parser.ids)), f"{path}: duplicate IDs"
    return html, parser


hub, _ = parse(HUB)
canonical_hub = "https://krishnavyasmuni.github.io/advaita/articles/mulamadhyamakakarika-with-chandrakirti/chapter-1.html"
assert f'<link rel="canonical" href="{canonical_hub}"' in hub
assert "How this chapter is organized" in hub
assert "window.location.hash.match" in hub, "Legacy scroll fragments should resolve to the new verse pages."
assert "word-by-word gloss" in hub
assert "mmk-reader-toc.js" not in hub
assert not re.search(r'chapter-1\.html#mmk-1-\d+', hub), "Hub must link to verse pages, not scroll anchors."
for n in range(1, 15):
    assert f'/chapter-1/1.{n}.html' in hub, f"Hub is missing verse 1.{n}"

for n in range(1, 15):
    path = CHAPTER / f"1.{n}.html"
    html, parser = parse(path)
    canonical = f"https://krishnavyasmuni.github.io/advaita/articles/mulamadhyamakakarika-with-chandrakirti/chapter-1/1.{n}.html"
    assert f'<link rel="canonical" href="{canonical}"' in html, f"{path}: incorrect canonical URL"
    assert f'id="mmk-1-{n}"' in html, f"{path}: root verse is missing"
    assert f'<h2><span>MMK</span> 1.{n}</h2>' in html, f"{path}: incorrect verse heading"
    assert html.count('class="mmk-word-by-word"') == 1, f"{path}: expected one word-by-word section"
    assert html.count("mmk-commentary-unit") == 1, f"{path}: commentary is missing or duplicated"
    assert html.count('class="mmk-sanskrit-original"') == 1, f"{path}: Sanskrit panel is missing or duplicated"
    assert html.count('class="mmk-word-gloss-list"') == 1, f"{path}: word gloss list is missing"
    assert len(re.findall(r'<dt lang="sa-Latn">', html)) >= 9, f"{path}: word gloss looks incomplete"
    commentary = html[html.index("mmk-commentary-unit"):]
    assert len(re.findall(r'<p\b', commentary)) >= 1, f"{path}: commentary is unexpectedly short"
    comment_block = re.search(r'<section class="mmk-chapter mmk-commentary-unit">([\s\S]*?)</section>', html)
    assert comment_block is not None, f"{path}: full commentary block is missing"
    comment_text = re.sub(r'<[^>]+>', " ", comment_block.group(1))
    assert len(comment_text.strip()) > 250, f"{path}: commentary appears truncated or replaced by a redirect"
    assert f'href="1.{n}.html" aria-current="page"' in html, f"{path}: current verse is not highlighted"
    assert html.count('aria-current="page"') == 1, f"{path}: more than one sidebar item is highlighted"
    assert "mmk-reader-toc.js?v=20261020-verse-pages-gloss-1" in html, f"{path}: mobile current-link alignment script is missing"
    assert 'class="mmk-root-sanskrit"' in html and 'lang="sa-Latn"' in html, f"{path}: visible root Sanskrit is missing"
    assert 'class="gita-translation mmk-readable-translation"' in html, f"{path}: readable translation is missing"
    assert html.count('aria-label="Verse navigation"') == 2, f"{path}: expected two navigation bars"

intro, _ = parse(ARTICLE / "introduction.html")
assert "/chapter-1/1.1.html" in intro, "Introduction does not link to MMK 1.1."
book_index = (ARTICLE / "index.html").read_text(encoding="utf-8")
assert "/introduction.html" in book_index, "Book contents does not link to the standalone introduction."
contents_redirect = (CHAPTER / "contents.html").read_text(encoding="utf-8")
assert 'url=../chapter-1.html' in contents_redirect
chapter_redirect = (CHAPTER / "index.html").read_text(encoding="utf-8")
assert 'url=/advaita/articles/mulamadhyamakakarika-with-chandrakirti/chapter-1.html' in chapter_redirect
assert "Chapter 1 contents page" in chapter_redirect

css = (ROOT / "assets/css/mmk-reader.css").read_text(encoding="utf-8")
assert '.mmk-reader-toc__links a[aria-current="page"]' in css, "Current verse does not have a purple active state."
assert '.mmk-reader-toc__links a:hover{background:#eeece7;color:#514a43;' in css, "Hover state should not make a second item purple."
assert "@media(max-width:850px)" in css, "Responsive sidebar treatment is missing."
toc_script = (ROOT / "assets/js/mmk-reader-toc.js").read_text(encoding="utf-8")
assert 'aria-current="page"' in toc_script
assert "mmk-reader-section" not in toc_script, "The per-verse pages should not use scroll-spy behavior."
sources = (ARTICLE / "sources/index.html").read_text(encoding="utf-8")
assert "separate page for each" in sources
assert "word-by-word gloss" in sources
assert "not undergone external peer review" in sources

sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
for path in ["/introduction.html", *[f"/chapter-1/1.{n}.html" for n in range(1, 15)]]:
    assert f"{path}</loc>" in sitemap, f"Sitemap is missing {path}"

print("Validated Chapter 1 hub, introduction, fourteen verse pages, root-word glosses, commentary blocks, Sanskrit panels, one active sidebar item per page, navigation, and sitemap.")
