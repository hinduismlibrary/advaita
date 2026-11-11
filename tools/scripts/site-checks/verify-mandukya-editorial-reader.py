#!/usr/bin/env python3
"""Browser QA for the standardized Māṇḍūkyakārikā and its legacy URL."""
from __future__ import annotations

import json
import os
import re
import tempfile
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / "site"
OUT = ROOT / "mandukya-reader-review"
OUT.mkdir(exist_ok=True)
DATA = json.loads((SITE / "assets/data/shankara/mandukya-karika.json").read_text(encoding="utf-8"))
UNITS = DATA["units"]
CHAPTERS: dict[int, list[dict]] = {chapter: [] for chapter in range(1, 5)}
for unit in UNITS:
    match = re.fullmatch(r"mandukya-karika-([1-4])-\d+", str(unit["id"]))
    assert match, f"Unrecognized Māṇḍūkyakārikā unit: {unit['id']}"
    CHAPTERS[int(match.group(1))].append(unit)
assert {chapter: len(units) for chapter, units in CHAPTERS.items()} == {1: 29, 2: 38, 3: 48, 4: 100}
assert len(UNITS) == 215


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def loaded(page, url: str, count: int):
    response = page.goto(url, wait_until="domcontentloaded")
    assert response and response.status == 200, (url, response.status if response else None)
    page.wait_for_function(
        "expected => document.querySelectorAll('#chapter-content > .shankara-verse').length === expected",
        arg=count,
        timeout=30000,
    )
    assert page.locator(".shankara-reader-error").count() == 0


def no_overflow(page, width: int):
    overflow = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    assert overflow <= 3, f"Horizontal overflow at {width}px: {overflow}px"
    return overflow


def check():
    report = {"source_entries": len(UNITS), "chapters": {str(k): len(v) for k, v in CHAPTERS.items()}}
    with tempfile.TemporaryDirectory() as directory:
        (Path(directory) / "advaita").symlink_to(SITE, target_is_directory=True)
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=directory))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{server.server_port}/advaita/books/adi-shankaracharya/"
        contents_url = base + "book-contents.html?work=mandukya-karika"
        reader_url = base + "book-chapter.html?work=mandukya-karika"
        legacy_url = base + "mandukya-karika/"
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(
                    headless=True,
                    args=["--no-sandbox"],
                    executable_path=os.environ.get("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH"),
                )
                errors: list[str] = []

                desktop = browser.new_page(viewport={"width": 1440, "height": 900})
                desktop.on("pageerror", lambda error: errors.append(str(error)))
                response = desktop.goto(contents_url, wait_until="domcontentloaded")
                assert response and response.status == 200
                desktop.locator("#sections .chapter-link").first.wait_for(timeout=30000)
                links = desktop.locator("#sections .chapter-link")
                assert links.count() == 4, "Contents must show all four original chapters."
                for chapter, first in CHAPTERS.items():
                    query = parse_qs(urlsplit(links.nth(chapter - 1).get_attribute("href")).query)
                    assert query.get("work") == ["mandukya-karika"]
                    assert query.get("unit") == [first[0]["id"]]
                assert "Māṇḍūkyakārikā" in desktop.locator("#work-title").inner_text()
                desktop.screenshot(path=str(OUT / "desktop-contents.png"), full_page=False)

                links.first.click()
                desktop.wait_for_function(
                    "expected => document.querySelectorAll('#chapter-content > .shankara-verse').length === expected",
                    arg=29,
                    timeout=30000,
                )
                assert desktop.locator("#reader-toc .reader-verse-link").count() == 29
                first = CHAPTERS[1][0]
                card = desktop.locator("#chapter-content > .shankara-verse").first
                assert card.get_attribute("id") == first["id"]
                assert card.locator(".gita-sanskrit").text_content().strip() == first["deva"].strip()
                assert card.locator(".reader-inline-iast").text_content().strip() == first["iast"].strip()
                assert card.locator(".gita-translation").text_content().strip() == first["translation"].strip()
                assert card.locator(".gita-details > summary").inner_text() == "Word for Word"
                assert desktop.locator("#reader-toc").bounding_box()["x"] < card.bounding_box()["x"]
                toc = desktop.locator("#reader-toc").evaluate(
                    "el => ({overflow: getComputedStyle(el).overflowY, scroll: el.scrollHeight, client: el.clientHeight})"
                )
                assert toc["overflow"] not in ("auto", "scroll") and toc["scroll"] <= toc["client"] + 4
                card.locator(".gita-details > summary").click()
                assert card.locator(".gita-details").get_attribute("open") is not None
                assert card.locator(".gita-word-row").count() > 0
                desktop.screenshot(path=str(OUT / "desktop-chapter-1.png"), full_page=False)

                loaded(desktop, reader_url + "&unit=" + CHAPTERS[2][0]["id"], 38)
                last = desktop.locator("#reader-toc .reader-verse-link").last
                last_id = CHAPTERS[2][-1]["id"]
                last.click()
                assert urlsplit(desktop.url).fragment == last_id
                assert desktop.locator("#chapter-content > article#" + last_id).count() == 1
                desktop.screenshot(path=str(OUT / "desktop-chapter-2.png"), full_page=False)

                loaded(desktop, legacy_url + "?chapter=2", 215)
                legacy = urlsplit(desktop.url)
                assert legacy.path.endswith("/book-chapter.html"), desktop.url
                assert parse_qs(legacy.query).get("work") == ["mandukya-karika"]
                assert parse_qs(legacy.query).get("full") == ["1"]
                assert legacy.fragment == CHAPTERS[2][0]["id"], desktop.url
                assert desktop.locator("#reader-toc .reader-verse-link").count() == 215
                report["legacy_chapter_2"] = "redirected to the complete reader and exact first verse"

                tablet = browser.new_page(viewport={"width": 768, "height": 1024})
                tablet.on("pageerror", lambda error: errors.append(str(error)))
                loaded(tablet, reader_url + "&unit=" + CHAPTERS[3][19]["id"], 48)
                assert tablet.locator("#chapter-content > .shankara-verse").first.get_attribute("id") == CHAPTERS[3][0]["id"]
                report["tablet_overflow_px"] = no_overflow(tablet, 768)
                tablet.screenshot(path=str(OUT / "tablet-chapter-3.png"), full_page=False)

                mobile = browser.new_page(viewport={"width": 390, "height": 844})
                mobile.on("pageerror", lambda error: errors.append(str(error)))
                loaded(mobile, reader_url + "&unit=" + CHAPTERS[4][0]["id"], 100)
                report["mobile_overflow_px"] = no_overflow(mobile, 390)
                toggle = mobile.locator(".advaita-mobile-contents-toggle")
                assert toggle.is_visible()
                toggle.click()
                assert toggle.get_attribute("aria-expanded") == "true"
                assert mobile.locator("#reader-toc .reader-verse-link:visible").count() == 100
                mobile.screenshot(path=str(OUT / "mobile-chapter-4.png"), full_page=False)

                small = browser.new_page(viewport={"width": 320, "height": 700})
                small.on("pageerror", lambda error: errors.append(str(error)))
                loaded(small, reader_url + "&unit=" + CHAPTERS[4][0]["id"], 100)
                report["small_mobile_overflow_px"] = no_overflow(small, 320)
                small.screenshot(path=str(OUT / "small-mobile-chapter-4.png"), full_page=False)
                assert not errors, errors
                browser.close()
        finally:
            server.shutdown()
    (OUT / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    print("PASS: Māṇḍūkyakārikā contents, all four chapters, source text, legacy link, and responsive reader.")


if __name__ == "__main__":
    check()

