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
        assert 'class="gita-translation mmk-readable-translation"' in html, f"{number}: missing readable root translation"
        assert "mmk-word-gloss" not in html and "mmk-word-by-word" not in html, f"{number}: word-by-word material remains"
        assert 'mmk-commentary-unit' in html, f"{number}: missing commentary section"
        if chapter == 1:
            assert "Candrakīrti’s Commentary" in html, f"{number}: missing translated commentary"
            assert html.count('aria-current="page"') == 1, f"{number}: sidebar must highlight exactly one verse"
        else:
            assert 'class="mmk-root-sanskrit"' in html, f"{number}: missing visible Sanskrit root verse"
            assert "Commentary note on Candrakīrti" in html, f"{number}: note should be identified as a reading note"

assert seen == 448, f"Expected 448 verse pages, found {seen}"
hub = (ARTICLE / "chapter-1.html").read_text(encoding="utf-8")
assert "data-mmk-section" not in hub, "Chapter 1 should open as a verse list, not a continuous reader"
for verse in range(1, 15):
    assert f"{ARTICLE.as_posix().split('site/')[1]}/chapter-1/1.{verse}.html" in hub, f"Chapter 1 hub misses verse 1.{verse}"
assert f"{ARTICLE.as_posix().split('site/')[1]}/introduction.html" in hub
index = (ARTICLE / "index.html").read_text(encoding="utf-8")
assert "chapter-1.html" in index and "introduction.html" in index
sources = (ARTICLE / "sources" / "index.html").read_text(encoding="utf-8")
assert "not full translations of his Sanskrit prose" in sources
assert "not undergone external peer review" in sources
css = (ROOT / "assets/css/mmk-reader.css").read_text(encoding="utf-8")
assert ".mmk-content .mmk-root-sanskrit" in css
print("Validated 448 MMK verse pages, readable root translations, visible Sanskrit, no word-by-word glosses, per-verse navigation, and accurate source notes.")
