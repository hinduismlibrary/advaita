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


def assert_monochrome(page) -> None:
    colors = page.locator("a").evaluate_all(
        "links => links.map(link => getComputedStyle(link).color)"
    )
    assert all(color == "rgb(32, 33, 34)" for color in colors), colors
    background = page.locator("body").evaluate(
        "element => getComputedStyle(element).backgroundColor"
    )
    assert background == "rgb(255, 255, 255)", background


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
                browser_errors = []
                javascript_errors = []
                page.on("console", lambda message: browser_errors.append(message.text) if message.type == "error" else None)
                page.on("pageerror", lambda error: javascript_errors.append(str(error)))
                page.goto(base, wait_until="domcontentloaded")
                page.locator(".vd-global-header .vd-label-dev").first.wait_for(timeout=20000)
                page.evaluate("() => document.fonts.ready")
                assert_monochrome(page)
                title_order = page.locator(".hp-section-title").first.evaluate(
                    "el => Array.from((el.querySelector(':scope > a') || el).children).map(child => child.className)"
                )
                assert title_order[0] == "hp-section-dev", title_order
                page.locator("body.vd-chrome-page .hp-panel").first.wait_for()
                page.locator("body.vd-chrome-page .hp-column").first.wait_for()
                panels = page.locator(".hp-column").first.locator(".hp-panel")
                first, second = panels.nth(0).bounding_box(), panels.nth(1).bounding_box()
                gap = second["y"] - (first["y"] + first["height"])
                assert 0 <= gap <= 35, f"Homepage panels separated by {gap}px"
                colors = page.locator(".hp-link-list a .hp-link-dev").first.evaluate(
                    "(el) => ({dev:getComputedStyle(el).color, latin:getComputedStyle(el.nextElementSibling).color})"
                )
                assert colors["dev"] == "rgb(32, 33, 34)", colors
                assert colors["latin"] == "rgb(32, 33, 34)", colors
                link_formats = page.locator(".hp-link-list a").evaluate_all("""
                    links => links.map(link => {
                        const [first, second] = Array.from(link.children);
                        return {
                            count: link.children.length,
                            firstLang: first?.lang,
                            secondLang: second?.lang,
                            firstColor: first ? getComputedStyle(first).color : null,
                            secondColor: second ? getComputedStyle(second).color : null
                        };
                    })
                """)
                assert link_formats and all(
                    row["count"] == 2
                    and row["firstLang"] == "sa-Deva"
                    and row["secondLang"] != "sa-Deva"
                    and row["firstColor"] == "rgb(32, 33, 34)"
                    and row["secondColor"] == "rgb(32, 33, 34)"
                    for row in link_formats
                ), link_formats
                report["home"] = {"panel_gap_px": round(gap, 1), "link_format": "Devanagari first; Latin/English second; monochrome", "links_checked": len(link_formats), **colors}
                page.screenshot(path=str(OUT / "home.png"))

                page.goto(base + "books/adi-shankaracharya/", wait_until="domcontentloaded")
                page.locator(".ad-entry-original-dev").first.wait_for(timeout=20000)
                page.evaluate("() => document.fonts.ready")
                assert_monochrome(page)
                directory = page.locator(".ad-entry-original").evaluate_all("""
                    rows => rows.map(row => {
                        const devanagari = row.querySelector(".ad-entry-original-dev");
                        const roman = row.querySelector(".ad-entry-original-iast");
                        const separator = row.querySelector(".ad-entry-original-separator");
                        return {
                            devDisplay: getComputedStyle(devanagari).display,
                            romanDisplay: getComputedStyle(roman).display,
                            devColor: getComputedStyle(devanagari).color,
                            devTop: devanagari.getBoundingClientRect().top,
                            romanColor: getComputedStyle(roman).color,
                            romanTop: roman.getBoundingClientRect().top,
                            separatorDisplay: separator ? getComputedStyle(separator).display : "absent"
                        };
                    })
                """)
                assert directory and all(
                    row["devDisplay"] == "block"
                    and row["romanDisplay"] == "block"
                    and row["devTop"] < row["romanTop"]
                    and row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(32, 33, 34)"
                    and row["separatorDisplay"] in ("none", "absent")
                    for row in directory
                ), directory
                assert page.locator("a").first.evaluate("(el)=>getComputedStyle(el).color") == "rgb(32, 33, 34)"
                assert page.locator("body").evaluate("(el)=>getComputedStyle(el).backgroundColor") == "rgb(255, 255, 255)"
                report["directory"] = {"entries_checked": len(directory), "order": "Devanagari above IAST", "palette": "black on white"}
                page.screenshot(path=str(OUT / "advaita-directory.png"))

                page.goto(base + "articles/varna-vicara/", wait_until="domcontentloaded")
                document = page.locator("details.sanskrit-reveal").first
                document.wait_for(timeout=20000)
                assert_monochrome(page)
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
                assert_monochrome(page)
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
                assert_monochrome(page)
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

                page.goto(base + "books/adi-shankaracharya/tattvabodha/", wait_until="domcontentloaded")
                reader = page.locator('.shankara-content[data-work="tattvabodha"]')
                reader.wait_for(timeout=20000)
                page.wait_for_function(
                    "() => document.querySelector('[data-work=\"tattvabodha\"]')?.getAttribute('aria-busy') === 'false'",
                    timeout=20000,
                )
                assert_monochrome(page)
                fallback = reader.locator(".shankara-reader-error")
                assert fallback.count() == 0, "Tattvabodha reader fallback: " + "; ".join(browser_errors) + " / " + fallback.all_text_contents().__str__()
                assert reader.locator(".gita-contents:visible").count() == 0
                assert reader.locator(".gita-verse").count() == 44, "Tattvabodha did not load all 44 units"
                box = reader.locator(".shankara-reading-grid").bounding_box()
                assert abs(box["x"] + box["width"] / 2 - 683) <= 35, f"Tattvabodha column is off center: {box}"
                report["tattvabodha"] = {"contents_list": "absent", "text": "continuous"}
                page.screenshot(path=str(OUT / "tattvabodha.png"))
                assert not javascript_errors, "Browser JavaScript errors: " + "; ".join(javascript_errors)
                browser.close()
        finally:
            server.shutdown()
        (OUT / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False))
        print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    run()
