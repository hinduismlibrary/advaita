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


def assert_site_palette(page) -> None:
    colors = page.locator("a").evaluate_all(
        "links => links.map(link => getComputedStyle(link).color)"
    )
    assert all(color == "rgb(6, 69, 173)" for color in colors), colors
    background = page.locator("body").evaluate(
        "element => getComputedStyle(element).backgroundColor"
    )
    assert background == "rgb(255, 255, 255)", background
    devanagari = page.locator('[lang^="sa-Deva"], [lang^="hi-Deva"]').evaluate_all(
        "nodes => nodes.map(node => getComputedStyle(node).color)"
    )
    assert all(color == "rgb(32, 33, 34)" for color in devanagari), devanagari
    blue_labels = page.locator(
        ".vd-label-en, .vd-label-iast, .label-en, .original-work-iast, "
        ".ad-entry-original-iast, .catalog-iast, .chapter-iast, "
        ".purana-title-iast, .purana-name-iast, .ad-title-en, .ad-heading-en, "
        ".hp-home-title-iast, .hp-section-en, .hp-link-en, .hp-original-iast"
    ).evaluate_all("nodes => nodes.map(node => getComputedStyle(node).color)")
    assert all(color == "rgb(6, 69, 173)" for color in blue_labels), blue_labels


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
                assert_site_palette(page)
                nav_formats = page.locator(".vd-primary-nav a").evaluate_all("""
                    links => links.map(link => {
                        const dev = link.querySelector(".vd-label-dev");
                        const roman = link.querySelector(".vd-label-en, .vd-label-iast");
                        return {
                            devColor: dev ? getComputedStyle(dev).color : null,
                            romanColor: roman ? getComputedStyle(roman).color : null,
                            devDisplay: dev ? getComputedStyle(dev).display : null,
                            romanDisplay: roman ? getComputedStyle(roman).display : null,
                            devHeight: dev ? dev.getBoundingClientRect().height : 0,
                            romanHeight: roman ? roman.getBoundingClientRect().height : 0
                        };
                    })
                """)
                assert nav_formats and all(
                    row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["devDisplay"] == "block" and row["romanDisplay"] == "block"
                    and row["devHeight"] > 0 and row["romanHeight"] > 0
                    for row in nav_formats
                ), nav_formats
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
                assert colors["latin"] == "rgb(6, 69, 173)", colors
                link_formats = page.locator(".hp-link-list a").evaluate_all("""
                    links => links.map(link => {
                        const [first, second] = Array.from(link.children);
                        return {
                            count: link.children.length,
                            firstLang: first?.lang,
                            secondLang: second?.lang,
                            firstColor: first ? getComputedStyle(first).color : null,
                            secondColor: second ? getComputedStyle(second).color : null,
                            firstDisplay: first ? getComputedStyle(first).display : null,
                            secondDisplay: second ? getComputedStyle(second).display : null,
                            firstHeight: first ? first.getBoundingClientRect().height : 0,
                            secondHeight: second ? second.getBoundingClientRect().height : 0
                        };
                    })
                """)
                assert link_formats and all(
                    row["count"] == 2
                    and row["firstLang"] == "sa-Deva"
                    and row["secondLang"] != "sa-Deva"
                    and row["firstColor"] == "rgb(32, 33, 34)"
                    and row["secondColor"] == "rgb(6, 69, 173)"
                    and row["firstDisplay"] == "block" and row["secondDisplay"] == "block"
                    and row["firstHeight"] > 0 and row["secondHeight"] > 0
                    for row in link_formats
                ), link_formats
                report["home"] = {"panel_gap_px": round(gap, 1), "link_format": "Devanagari black; Latin/English blue", "links_checked": len(link_formats), "nav_items_checked": len(nav_formats), **colors}
                page.screenshot(path=str(OUT / "home.png"))

                page.goto(base + "books/adi-shankaracharya/", wait_until="domcontentloaded")
                page.locator(".ad-entry-original-dev").first.wait_for(timeout=20000)
                page.evaluate("() => document.fonts.ready")
                assert_site_palette(page)
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
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["separatorDisplay"] in ("none", "absent")
                    for row in directory
                ), directory
                assert page.locator("a").first.evaluate("(el)=>getComputedStyle(el).color") == "rgb(6, 69, 173)"
                assert page.locator("body").evaluate("(el)=>getComputedStyle(el).backgroundColor") == "rgb(255, 255, 255)"
                report["directory"] = {"entries_checked": len(directory), "order": "Devanagari above IAST", "palette": "black Devanagari; blue IAST; white background"}
                page.screenshot(path=str(OUT / "advaita-directory.png"))

                page.goto(base + "pages/purana-library/", wait_until="domcontentloaded")
                page.locator(".purana-name-dev").first.wait_for(timeout=20000)
                page.evaluate("() => document.fonts.ready")
                assert_site_palette(page)
                puranas = page.locator(".purana-alpha-index .purana-name-dev").evaluate_all("""
                    labels => labels.map(dev => {
                        const roman = dev.nextElementSibling;
                        return {
                            devColor: getComputedStyle(dev).color,
                            romanColor: roman ? getComputedStyle(roman).color : null,
                            devDisplay: getComputedStyle(dev).display,
                            romanDisplay: roman ? getComputedStyle(roman).display : null,
                            devHeight: dev.getBoundingClientRect().height,
                            romanHeight: roman ? roman.getBoundingClientRect().height : 0,
                            devTop: dev.getBoundingClientRect().top,
                            romanTop: roman ? roman.getBoundingClientRect().top : null
                        };
                    })
                """)
                assert puranas and all(
                    row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["devDisplay"] == "block" and row["romanDisplay"] == "block"
                    and row["devHeight"] > 0 and row["romanHeight"] > 0
                    and row["devTop"] < row["romanTop"]
                    for row in puranas
                ), puranas
                headings = page.locator(".purana-library-title").evaluate_all("""
                    nodes => nodes.map(node => {
                        const dev = node.querySelector(".purana-title-dev");
                        const roman = node.querySelector(".purana-title-iast");
                        return {devColor:getComputedStyle(dev).color, romanColor:getComputedStyle(roman).color,
                            devDisplay:getComputedStyle(dev).display, romanDisplay:getComputedStyle(roman).display,
                            devHeight:dev.getBoundingClientRect().height, romanHeight:roman.getBoundingClientRect().height,
                            devTop:dev.getBoundingClientRect().top, romanTop:roman.getBoundingClientRect().top};
                    })
                """)
                section_headings = page.locator(".purana-section-title").evaluate_all("""
                    nodes => nodes.map(node => {
                        const dev = node.querySelector(".purana-title-dev");
                        const roman = node.querySelector(".purana-title-iast");
                        return {devColor:getComputedStyle(dev).color, romanColor:getComputedStyle(roman).color,
                            devDisplay:getComputedStyle(dev).display, romanDisplay:getComputedStyle(roman).display,
                            devHeight:dev.getBoundingClientRect().height, romanHeight:roman.getBoundingClientRect().height,
                            devTop:dev.getBoundingClientRect().top, romanTop:roman.getBoundingClientRect().top};
                    })
                """)
                assert headings and all(
                    row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["devDisplay"] == "block" and row["romanDisplay"] == "block"
                    and row["devHeight"] > 0 and row["romanHeight"] > 0
                    and row["devTop"] < row["romanTop"]
                    for row in headings
                ), headings
                assert section_headings and all(
                    row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["devDisplay"] == "block" and row["romanDisplay"] == "block"
                    and row["devHeight"] > 0 and row["romanHeight"] > 0
                    and row["devTop"] < row["romanTop"]
                    for row in section_headings
                ), section_headings
                research_links = page.locator(".purana-research-list a").evaluate_all("""
                    links => links.map(link => {
                        const dev = link.querySelector(".purana-name-dev");
                        const roman = link.querySelector(".purana-name-iast");
                        return {count:link.children.length, devColor:getComputedStyle(dev).color,
                            romanColor:getComputedStyle(roman).color, devDisplay:getComputedStyle(dev).display,
                            romanDisplay:getComputedStyle(roman).display, devHeight:dev.getBoundingClientRect().height,
                            romanHeight:roman.getBoundingClientRect().height, devTop:dev.getBoundingClientRect().top,
                            romanTop:roman.getBoundingClientRect().top};
                    })
                """)
                assert research_links and all(
                    row["count"] == 2
                    and row["devColor"] == "rgb(32, 33, 34)"
                    and row["romanColor"] == "rgb(6, 69, 173)"
                    and row["devDisplay"] == "block" and row["romanDisplay"] == "block"
                    and row["devHeight"] > 0 and row["romanHeight"] > 0
                    and row["devTop"] < row["romanTop"]
                    for row in research_links
                ), research_links
                page.locator(".vd-breadcrumb-inner span[aria-current='page'] .vd-label-dev").wait_for(timeout=20000)
                crumb = page.locator(".vd-breadcrumb-inner span[aria-current='page']").evaluate("""
                    node => ({text:node.textContent, dev:!!node.querySelector(".vd-label-dev"),
                        roman:!!node.querySelector(".vd-label-en"),
                        devColor:getComputedStyle(node.querySelector(".vd-label-dev")).color,
                        romanColor:getComputedStyle(node.querySelector(".vd-label-en")).color,
                        devTop:node.querySelector(".vd-label-dev").getBoundingClientRect().top,
                        romanTop:node.querySelector(".vd-label-en").getBoundingClientRect().top})
                """)
                assert "□" not in crumb["text"] and crumb["dev"] and crumb["roman"], crumb
                assert crumb["devColor"] == "rgb(32, 33, 34)" and crumb["romanColor"] == "rgb(6, 69, 173)" and crumb["devTop"] < crumb["romanTop"], crumb
                footer = page.locator(".site-footer p").evaluate("""
                    node => ({dev:!!node.querySelector(".vd-label-dev"), roman:!!node.querySelector(".vd-label-iast"),
                        devColor:getComputedStyle(node.querySelector(".vd-label-dev")).color,
                        romanColor:getComputedStyle(node.querySelector(".vd-label-iast")).color})
                """)
                assert footer["dev"] and footer["roman"] and footer["devColor"] == "rgb(32, 33, 34)" and footer["romanColor"] == "rgb(6, 69, 173)", footer
                report["puranas"] = {"entries_checked": len(puranas), "headings_checked": len(headings) + len(section_headings), "research_links_checked": len(research_links), "breadcrumb": "Devanagari above blue English", "footer": "black Devanagari; blue IAST", "order": "Devanagari above IAST", "palette": "black Devanagari; blue IAST"}
                page.screenshot(path=str(OUT / "purana-library.png"))

                page.goto(base + "pages/bhagavatam-with-sridhara-bhasya/", wait_until="domcontentloaded")
                bhagavatam_link = page.locator(".chapter-list a").first
                bhagavatam_link.locator(".purana-chapter-reference").wait_for(timeout=20000)
                assert bhagavatam_link.locator(".purana-chapter-reference").inner_text() == "1.1"
                chapter_name = bhagavatam_link.locator(".purana-chapter-name")
                assert not chapter_name.is_visible()
                names_toggle = page.locator(".purana-chapter-name-toggle")
                assert names_toggle.get_attribute("aria-pressed") == "false"
                names_toggle.click()
                assert chapter_name.is_visible()
                assert "Questions by the Sages" in chapter_name.inner_text()
                names_toggle.click()
                assert not chapter_name.is_visible()
                report["purana_chapter_names"] = {"default": "numbered references", "optional": "chapter names show and hide"}
                page.screenshot(path=str(OUT / "purana-chapter-numbers.png"))

                page.goto(base + "pages/bhavishya-purana-brahmaparvan/", wait_until="domcontentloaded")
                brahma_link = page.locator(".chapter-list a").first
                brahma_link.locator(".purana-chapter-reference").wait_for(timeout=20000)
                assert brahma_link.locator(".purana-chapter-reference").inner_text() == "1.1"
                assert not brahma_link.locator(".purana-chapter-name").is_visible()
                page.locator(".purana-chapter-name-toggle").click()
                assert brahma_link.locator(".purana-chapter-name").is_visible()
                assert "Śatānīka’s Inquiry" in brahma_link.locator(".purana-chapter-name").inner_text()

                page.goto(base + "pages/bhavishya-purana-pratisargaparvan/", wait_until="domcontentloaded")
                part_one = page.locator('a[href*="part-1-chapter-1"] .purana-chapter-reference')
                part_one.wait_for(timeout=20000)
                assert part_one.inner_text() == "1.1"
                part_two = page.locator('a[href*="part-2-chapter-1"] .purana-chapter-reference')
                assert part_two.inner_text() == "2.1"

                page.goto(base + "pages/vishnu-purana/", wait_until="domcontentloaded")
                vishnu_first = page.locator("#book-list .chapter-grid a .purana-chapter-reference").first
                vishnu_first.wait_for(timeout=20000)
                assert vishnu_first.inner_text() == "1.1"
                report["purana_indexes"] = {"bhagavatam_canto": "1.1", "bhavishya_parvan_parts": "1.1 and 2.1", "vishnu_purana_book": "1.1"}

                page.goto(base + "articles/varna-vicara/", wait_until="domcontentloaded")
                document = page.locator("details.sanskrit-reveal").first
                document.wait_for(timeout=20000)
                assert_site_palette(page)
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
                assert_site_palette(page)
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
                assert_site_palette(page)
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
                assert_site_palette(page)
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
