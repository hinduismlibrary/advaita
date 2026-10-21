from __future__ import annotations

from pathlib import Path
import re

ROOT = Path("site")
ARTICLE = ROOT / "articles/mulamadhyamakakarika-with-chandrakirti"
EXPECTED = {
    1: 14, 2: 25, 3: 9, 4: 9, 5: 8, 6: 10, 7: 34, 8: 13, 9: 12,
    10: 16, 11: 8, 12: 10, 13: 8, 14: 8, 15: 11, 16: 10, 17: 33,
    18: 12, 19: 6, 20: 24, 21: 21, 22: 16, 23: 25, 24: 40, 25: 24,
    26: 12, 27: 30,
}

seen = 0
for chapter, count in EXPECTED.items():
    for verse in range(1, count + 1):
        number = f"{chapter}.{verse}"
        path = ARTICLE / f"chapter-{chapter}" / f"{number}.html"
        assert path.is_file(), f"Missing verse page: {path}"
        html = path.read_text(encoding="utf-8")
        seen += 1
        assert 'class="mmk-root-sanskrit"' in html, f"{number}: missing visible Sanskrit root verse"
        assert 'class="gita-translation mmk-readable-translation"' in html, f"{number}: missing readable root translation"
        assert "mmk-word-gloss" not in html and "mmk-word-by-word" not in html, f"{number}: unexpected word-gloss material"
        match = re.search(
            r'<section class="mmk-chapter mmk-commentary-unit">([\s\S]*?)</section>',
            html,
        )
        assert match, f"{number}: missing commentary section"
        assert "Candrakīrti’s Commentary" in match.group(1), f"{number}: missing commentary heading"
        assert re.search(r"<p(?:\s|>)", match.group(1)), f"{number}: commentary section has no translated text"
        assert f"MMK {number}" in html, f"{number}: page heading/metadata is incorrect"

assert seen == 448, f"Expected 448 verse pages, found {seen}"

hub = (ARTICLE / "chapter-1.html").read_text(encoding="utf-8")
assert "data-mmk-section" not in hub, "Chapter 1 hub should be a verse list"
for verse in range(1, EXPECTED[1] + 1):
    assert f"chapter-1/1.{verse}.html" in hub, f"Chapter 1 hub misses verse 1.{verse}"
assert "introduction.html" in hub, "Chapter 1 hub misses the separate introduction"

index = (ARTICLE / "index.html").read_text(encoding="utf-8")
assert 'id="introduction"' in index, "Book introduction must have its own contents section"
assert 'id="chapters"' in index, "Book chapter list is missing"
for chapter in EXPECTED:
    assert f"chapter-{chapter}/{chapter}.1.html" in index, f"Chapter {chapter} does not open at its first verse"

sources = (ARTICLE / "sources" / "index.html").read_text(encoding="utf-8")
assert "English translation of Candrakīrti’s commentary" in sources
assert "not undergone external peer review" in sources

css = (ROOT / "assets/css/mmk-reader.css").read_text(encoding="utf-8")
assert ".mmk-content .mmk-root-sanskrit" in css
print("Validated all 448 MMK verse pages, translated commentary sections, separate introduction, chapter-to-first-verse links, and source notes.")
