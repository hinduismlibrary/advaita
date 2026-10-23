#!/usr/bin/env python3
"""Render representative pages and verify shared layout and disclosure behavior."""
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
OUT = ROOT / "visual-smoke-output"
OUT.mkdir(exist_ok=True)


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def run() -> None:
    with tempfile.TemporaryDirectory() as directory:
        public = Path(directory)
        (public / "advaita").symlink_to(SITE, target_is_directory=True)
        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), partial(QuietHandler, directory=str(public))
        )
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{server.server_port}/advaita/"
        report = {}
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(headless=True)
                page = browser.new_page(viewport={"width": 1366, "height": 900})
                page.goto(base, wait_until="domcontentloaded")
                page.locator("body.vd-chrome-page .hp-panel").first.wait_for()
                page.locator("body.vd-chrome-page .hp-column").first.wait_for()
                panels = page.locator(".hp-column").first.locator(".hp-panel")
                first, second = panels.nth(0).bounding_box(), panels.nth(1).bounding_box()
                gap = second["y"] - (first["y"] + first["height"])
                assert 0 <= gap <= 35, f"Homepage panels separated by {gap}px"
                colors = page.locator(".hp-original-dev").first.evaluate(
                    "(el) => ({dev:getComputedStyle(el).color, iast:getComputedStyle(el.nextElementSibling).color})"
                )
                assert colors["dev"] == "rgb(32, 33, 34)", colors
                assert colors["iast"] == "rgb(6, 69, 173)", colors
                report["home"] = {"panel_gap_px": round(gap, 1), **colors}
                page.screenshot(path=str(OUT / "home.png"))

                page.goto(base + "articles/varna-vicara/", wait_until="domcontentloaded")
                document = page.locator("details.sanskrit-reveal").first
                document.wait_for(timeout=20000)
                source = document.locator(':scope > [lang^="sa-Deva"]').first
                document.locator("summary").click()
                assert document.get_attribute("open") is not None and source.is_visible()
                page.screenshot(path=str(OUT / "document-open.png"))
                document.locator("summary").click()
                assert document.get_attribute("open") is None and not source.is_visible()
                page.wait_for_function(
                    "() => document.querySelector('details.sanskrit-reveal summary')?.textContent.trim() === 'Show Sanskrit'"
                )
                report["document"] = {"sanskrit_toggle": "content appears and disappears"}
                page.screenshot(path=str(OUT / "document.png"))

                page.goto(base + "articles/bhavishya-purana-brahmaparvan-chapter-1/", wait_until="domcontentloaded")
                verse = page.locator(".bp-verse").filter(
                    has=page.locator('.bp-reader-toggle[data-bp-view="word-for-word"]')
                ).first
                verse.wait_for(timeout=20000)
                button = verse.locator('.bp-reader-toggle[data-bp-view="word-for-word"]')
                panel = verse.locator('.bp-reader-panel[data-bp-panel="word-for-word"]')
                button.click()
                assert panel.is_visible() and button.get_attribute("aria-pressed") == "true"
                button.click()
                assert not panel.is_visible() and button.get_attribute("aria-pressed") == "false"
                report["bhavishya"] = {"word_for_word_toggle": "opens and closes"}

                page.goto(base + "articles/vishnu-purana-book-1-chapter-1/", wait_until="domcontentloaded")
                verse = page.locator(".gita-verse").first
                verse.wait_for(timeout=20000)
                details = verse.locator(":scope > .gita-controls > details.gita-details")
                assert details.count() == 2, f"Viṣṇu verse has {details.count()} controls"
                labels = details.locator("summary").all_text_contents()
                assert set(labels) == {"Word for Word", "Transliteration"}, labels
                details.first.locator("summary").click()
                assert details.first.get_attribute("open") is not None
                details.first.locator("summary").click()
                assert details.first.get_attribute("open") is None
                report["vishnu"] = {"controls": labels, "toggle": "opens and closes"}
                page.screenshot(path=str(OUT / "vishnu.png"))

                browser_errors = []
                page.on("console", lambda message: browser_errors.append(message.text) if message.type == "error" else None)
                page.on("pageerror", lambda error: browser_errors.append(str(error)))
                page.goto(base + "books/adi-shankaracharya/tattvabodha/", wait_until="domcontentloaded")
                reader = page.locator('.shankara-content[data-work="tattvabodha"]')
                reader.wait_for(timeout=20000)
                page.wait_for_function(
                    "() => document.querySelector('[data-work=\"tattvabodha\"]')?.getAttribute('aria-busy') === 'false'",
                    timeout=20000,
                )
                fallback = reader.locator(".shankara-reader-error")
                assert fallback.count() == 0, "Tattvabodha reader fallback: " + "; ".join(browser_errors) + " / " + fallback.all_text_contents().__str__()
                assert reader.locator(".gita-contents:visible").count() == 0
                report["tattvabodha"] = {"contents_list": "absent", "text": "continuous"}
                page.screenshot(path=str(OUT / "tattvabodha.png"))
                browser.close()
        finally:
            server.shutdown()
        (OUT / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False))
        print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    run()
