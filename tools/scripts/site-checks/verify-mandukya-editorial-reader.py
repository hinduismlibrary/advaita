#!/usr/bin/env python3
"""Browser-level QA for the stand-alone Māṇḍūkyakārikā reader."""
from __future__ import annotations
import json
import tempfile
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[3]
SITE = ROOT / "site"
OUT = ROOT / "mandukya-reader-review"
OUT.mkdir(exist_ok=True)

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass

def check():
    report = {}
    with tempfile.TemporaryDirectory() as directory:
        (Path(directory) / "advaita").symlink_to(SITE, target_is_directory=True)
        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(QuietHandler, directory=directory)
        )
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        url = f"http://127.0.0.1:{server.server_port}/advaita/books/adi-shankaracharya/mandukya-karika/"
        try:
            with sync_playwright() as pw:
                browser = pw.chromium.launch(headless=True, args=["--no-sandbox"])
                desktop = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
                page_errors = []
                desktop.on("pageerror", lambda e: page_errors.append(str(e)))
                response = desktop.goto(url, wait_until="domcontentloaded")
                assert response.status == 200, response.status
                desktop.locator(".mk-verse").first.wait_for(timeout=25000)
                desktop.evaluate("document.fonts.ready")
                assert desktop.locator(".mk-verse").count() == 29
                assert desktop.locator(".mk-inline-list a").count() == 29
                assert desktop.locator(".mk-verse-nav a").count() == 29
                assert desktop.locator("h1").inner_text().strip() == "Māṇḍūkyakārikā"
                assert desktop.locator(".mk-deva").first.inner_text().startswith("बहिःप्रज्ञो")
                assert desktop.locator(".mk-iast").first.inner_text().startswith("bahiḥprajño")
                assert desktop.locator(".mk-translation").first.inner_text().startswith("Viśva")
                toc_box = desktop.locator("#contents").bounding_box()
                verse_box = desktop.locator(".mk-verse").first.bounding_box()
                assert toc_box["y"] + toc_box["height"] <= verse_box["y"] + 3, (toc_box, verse_box)
                assert not desktop.locator(".mk-gloss-list").first.is_visible()
                desktop.locator(".mk-gloss summary").first.click()
                assert desktop.locator(".mk-gloss-list").first.is_visible()
                assert desktop.locator(".mk-gloss-row").count() > 20
                desktop.locator(".mk-gloss summary").first.click()
                assert not desktop.locator(".mk-gloss-list").first.is_visible()
                desktop.locator(".mk-inline-list a").nth(6).click()
                assert desktop.url.endswith("#mandukya-karika-1-007"), desktop.url
                assert desktop.locator(".mk-verse-nav a[aria-current='location']").count() == 1
                desktop.locator(".mk-chapter-name").nth(1).click()
                desktop.locator(".mk-verse").first.wait_for()
                desktop.wait_for_function("document.querySelector('.mk-verse')?.id === 'mandukya-karika-2-001'")
                assert desktop.locator(".mk-inline-list a").count() == 38
                assert desktop.locator(".mk-verse").count() == 38
                assert desktop.locator(".mk-inline-list a").first.inner_text() == "2.1"
                report["desktop"] = {"chapter_1_verses":29,"chapter_2_verses":38,"contents_precedes_text":True}
                desktop.screenshot(path=str(OUT / "desktop-chapter-2.png"), full_page=False)
                mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
                mobile.on("pageerror", lambda e: page_errors.append(str(e)))
                mobile.goto(url + "?chapter=4", wait_until="domcontentloaded")
                mobile.locator(".mk-verse").first.wait_for(timeout=25000)
                assert mobile.locator(".mk-verse").count() == 100
                assert mobile.locator(".mk-inline-list a").count() == 100
                overflow = mobile.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                assert overflow <= 3, f"Horizontal overflow: {overflow}px"
                mobile.locator("#mk-mobile-toggle").click()
                assert mobile.locator("#mk-sidebar").is_visible()
                assert mobile.locator("#mk-mobile-toggle").get_attribute("aria-expanded") == "true"
                mobile.locator("#mk-scrim").click(position={"x":380,"y":400}, force=True)
                assert not mobile.locator("#mk-sidebar").is_visible()
                report["mobile"] = {"chapter_4_verses":100,"horizontal_overflow_px":overflow,"drawer":"passed"}
                mobile.screenshot(path=str(OUT / "mobile-chapter-4.png"), full_page=False)
                assert not page_errors, page_errors
                browser.close()
        finally:
            server.shutdown()
    (OUT / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    check()
