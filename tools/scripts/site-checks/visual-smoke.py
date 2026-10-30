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
        "links => links.filter(link => !link.closest('.hp-section-title') && !link.classList.contains('brand')).map(link => getComputedStyle(link).color)"
    )
    assert all(color == "rgb(6, 69, 173)" for color in colors), colors
    background = page.locator("body").evaluate(
        "element => getComputedStyle(element).backgroundColor"
    )
    assert background == "rgb(255, 255, 255)", background
    devanagari = page.locator('[lang^="sa-Deva"], [lang^="hi-Deva"]').evaluate_all(
        "nodes => nodes.filter(node => node.isConnected && node.getClientRects().length > 0).map(node => getComputedStyle(node).color)"
    )
    assert all(color == "rgb(32, 33, 34)" for color in devanagari), devanagari
    blue_labels = page.locator(
        ".vd-label-en, .vd-label-iast, .label-en, .original-work-iast, "
        ".ad-entry-original-iast, .catalog-iast, .chapter-iast, "
        ".purana-title-iast, .purana-name-iast, .ad-title-en, .ad-heading-en, "
        ".hp-home-title-iast, .hp-link-en, .hp-original-iast"
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
                page.wait_for_function("""() => {
                    const link = document.querySelector('link[data-viveka-site-chrome]');
                    return Boolean(link?.sheet && link.sheet.cssRules.length > 0);
                }""", timeout=20000)
                page.locator(".hp-home-title-dev").wait_for(timeout=20000)
                assert page.title() == "विवेकदृष्टिः", page.title()
                assert page.locator(".hp-home-title-iast").count() == 0
                assert page.locator(".hp-home-intro").count() == 0
                assert page.locator(".site-footer").count() == 0
                assert page.locator(".hp-home > h1").inner_text().strip() == "विवेकदृष्टिः"
                home_text = page.locator(".hp-home").inner_text().lower()
                for note in ("reference library for hindu scripture", "verification in progress", "pinned source mirror", "audit log", "translation review is ongoing"):
                    assert note not in home_text, note
                page.evaluate("() => document.fonts.ready")
                assert_site_palette(page)
                header = page.locator("body > header.vd-global-header")
                assert header.count() == 1 and header.is_visible(), "Homepage header is missing"
                assert header.locator(".vd-primary-nav:visible").count() == 1, "Homepage navigation is missing"
                assert header.locator(".vd-search-form:visible").count() == 1, "Homepage search is missing"
                panels = page.locator(".hp-directory .hp-column > .hp-panel")
                columns = page.locator(".hp-directory > .hp-column")
                assert columns.count() == 2, f"Homepage has {columns.count()} columns"
                assert panels.count() == 5, f"Homepage has {panels.count()} subject groups"
                heading_metrics = panels.first.locator(".hp-section-title").evaluate("""el => {
                    const english = el.querySelector(".hp-section-en");
                    const devanagari = el.querySelector(".hp-section-dev");
                    return {
                        headingColor: getComputedStyle(english).color,
                        headingFill: getComputedStyle(english).webkitTextFillColor,
                        headingText: english.innerText.trim(),
                        devanagariDisplay: getComputedStyle(devanagari).display
                    };
                }""")
                assert heading_metrics["headingColor"] == "rgb(32, 33, 34)", heading_metrics
                assert heading_metrics["headingFill"] == "rgb(32, 33, 34)", heading_metrics
                assert heading_metrics["headingText"] == "Advaita Vedanta", heading_metrics
                assert heading_metrics["devanagariDisplay"] == "none", heading_metrics
                home_width = page.locator(".hp-home").evaluate("el => el.getBoundingClientRect().width")
                assert 1039 <= home_width <= 1041, f"Homepage content width is {home_width}px"
                panel_titles = [panels.nth(i).locator(".hp-section-en").inner_text() for i in range(5)]
                assert panel_titles == ["Advaita Vedanta", "Documents", "Śāstras", "Introduction to Eastern Philosophy", "Indology"], panel_titles
                left_box, right_box = [columns.nth(i).bounding_box() for i in range(2)]
                assert right_box["x"] > left_box["x"] and abs(left_box["width"] - right_box["width"]) <= 2, (left_box, right_box)
                left_panels = columns.nth(0).locator(":scope > .hp-panel")
                right_panels = columns.nth(1).locator(":scope > .hp-panel")
                left_y = [left_panels.nth(i).bounding_box()["y"] for i in range(left_panels.count())]
                right_y = [right_panels.nth(i).bounding_box()["y"] for i in range(right_panels.count())]
                assert left_y == sorted(left_y) and right_y == sorted(right_y), (left_y, right_y)
                documents = page.locator(".home-documents-list")
                shastras = page.locator(".home-shastra-list")
                assert documents.locator("li").count() == 8
                assert documents.locator('a[href="/advaita/articles/a-defence-of-the-manusmriti/"]').count() == 1
                document_titles = documents.locator("li > a").evaluate_all("""
                    links => links.map(link => (link.querySelector(".hp-link-en") || link).innerText.trim().split(/\\r?\\n/)[0].trim())
                """)
                assert document_titles == sorted(document_titles, key=len), document_titles
                assert documents.locator('a[href="/advaita/articles/purana-analysis/"]').count() == 0
                assert page.locator('#indology a[href="/advaita/articles/purana-analysis/"]').count() == 1
                assert shastras.locator("li").count() == 4
                list_metrics = page.locator(".hp-link-list").evaluate_all("""
                    lists => lists.map(list => {
                        const item = list.querySelector("li");
                        const link = list.querySelector("a");
                        const ls = getComputedStyle(list), is = getComputedStyle(item), as = getComputedStyle(link);
                        return {
                            display: ls.display, type: ls.listStyleType, paddingLeft: ls.paddingLeft,
                            itemMargin: is.margin, itemPadding: is.padding, itemBorder: is.borderWidth,
                            linkSize: as.fontSize, linkLineHeight: as.lineHeight, linkFamily: as.fontFamily
                        };
                    })
                """)
                assert len(list_metrics) == 5 and all(row == list_metrics[0] for row in list_metrics), list_metrics
                assert list_metrics[0]["display"] == "block" and list_metrics[0]["type"] == "disc", list_metrics
                assert list_metrics[0]["linkSize"] == "16px" and "Arial" in list_metrics[0]["linkFamily"], list_metrics
                assert all(row["itemBorder"] == "0px" for row in list_metrics), list_metrics
                section_style = panels.nth(1).evaluate("""el => {
                    const s = getComputedStyle(el);
                    return {radius:s.borderRadius, shadow:s.boxShadow, background:s.backgroundColor, topBorder:s.borderTopWidth, sideBorder:s.borderLeftWidth};
                }""")
                assert section_style["radius"] == "0px" and section_style["shadow"] == "none"
                assert section_style["background"] in ("rgba(0, 0, 0, 0)", "rgb(255, 255, 255)"), section_style
                assert section_style["topBorder"] == "1px" and section_style["sideBorder"] == "0px", section_style
                assert page.locator("#gita").count() == 0
                colors = page.locator(".hp-link-list a .hp-link-en").first.evaluate(
                    "(el) => ({english:getComputedStyle(el).color, dev:getComputedStyle(el.nextElementSibling).color, englishSize:getComputedStyle(el).fontSize, devSize:getComputedStyle(el.nextElementSibling).fontSize})"
                )
                assert colors["english"] == "rgb(6, 69, 173)", colors
                assert colors["dev"] == "rgb(32, 33, 34)", colors
                assert colors["englishSize"] == "16px" and colors["devSize"] == "16px", colors
                link_formats = page.locator(".hp-link-list a").evaluate_all("""
                    links => links.map(link => {
                        const [first, second] = Array.from(link.children);
                        return {
                            count: link.children.length,
                            firstLang: first?.lang,
                            secondLang: second?.lang,
                            firstColor: first ? getComputedStyle(first).color : null,
                            secondColor: second ? getComputedStyle(second).color : null,
                            secondFill: second ? getComputedStyle(second).webkitTextFillColor : null,
                            secondText: second ? second.textContent.trim() : null,
                            firstDisplay: first ? getComputedStyle(first).display : null,
                            secondDisplay: second ? getComputedStyle(second).display : null,
                            firstHeight: first ? first.getBoundingClientRect().height : 0,
                            secondHeight: second ? second.getBoundingClientRect().height : 0,
                            firstTop: first ? first.getBoundingClientRect().top : 0,
                            secondTop: second ? second.getBoundingClientRect().top : 0,
                            firstFontSize: first ? getComputedStyle(first).fontSize : null,
                            secondFontSize: second ? getComputedStyle(second).fontSize : null
                        };
                    })
                """)
                assert link_formats and all(
                    row["count"] == 2
                    and row["firstLang"] != "sa-Deva"
                    and row["secondLang"] == "sa-Deva"
                    and row["firstColor"] == "rgb(6, 69, 173)"
                    and row["secondColor"] == "rgb(32, 33, 34)"
                    and row["secondFill"] == "rgb(32, 33, 34)"
                    and row["secondText"]
                    and row["firstDisplay"] == "block" and row["secondDisplay"] == "block"
                    and row["firstHeight"] > 0 and row["secondHeight"] > 0
                    and row["firstTop"] < row["secondTop"]
                    and row["firstFontSize"] == "16px" and row["secondFontSize"] == "16px"
                    for row in link_formats
                ), link_formats
                report["home"] = {"columns": 2, "style": "two-column wiki-style lists", "link_format": "English blue above Devanagari black", "links_checked": len(link_formats), "navigation_visible": True, "search_visible": True, **colors}
                page.screenshot(path=str(OUT / "home.png"))
                page.set_viewport_size({"width": 390, "height": 844})
                page.reload(wait_until="domcontentloaded")
                page.wait_for_function("""() => {
                    const link = document.querySelector('link[data-viveka-site-chrome]');
                    return Boolean(link?.sheet && link.sheet.cssRules.length > 0);
                }""", timeout=20000)
                mobile_toggle = page.locator(".vd-menu-toggle")
                mobile_nav = page.locator(".vd-primary-nav")
                assert mobile_toggle.is_visible(), "Mobile menu button is hidden"
                assert not mobile_nav.is_visible(), "Mobile menu should start closed"
                mobile_toggle.click()
                assert mobile_nav.is_visible(), "Mobile menu did not open"
                assert page.locator(".vd-search-form:visible").count() == 1
                report["home_mobile"] = {"menu": "opens", "search": "visible"}

                page.set_viewport_size({"width": 1366, "height": 900})
                page.goto(base + "articles/a-defence-of-the-manusmriti/", wait_until="domcontentloaded")
                page.locator(".article-head h1").wait_for(timeout=20000)
                assert page.locator(".article-head h1").inner_text().strip() == "A Defence of the Manusmriti"
                page.locator("#vishnu-desktop-toc a").first.wait_for(timeout=20000)
                assert page.locator("#vishnu-desktop-toc a").count() >= 5
                first_translation = page.locator("p.translation").first
                pair = first_translation.locator("xpath=ancestor::div[contains(@class, 'scripture-quote-pair')][1]")
                assert pair.locator("p.reference").inner_text().strip() == "Taittirīya Brāhmaṇa 2.2.10.2"
                details = pair.locator("details.sanskrit-reveal")
                quote_box = first_translation.bounding_box()
                button_box = details.locator("summary").bounding_box()
                assert button_box["y"] >= quote_box["y"] + quote_box["height"] - 1, {"quote": quote_box, "button": button_box}
                details.locator("summary").click()
                assert details.get_attribute("open") is not None
                source_image = details.locator("img")
                source_image.wait_for(state="visible", timeout=20000)
                assert source_image.evaluate("img => img.complete && img.naturalWidth > 0"), "Sanskrit source image did not load"
                assert page.locator(".reference-table tbody tr").count() == 15

                page.wait_for_function("() => document.querySelector('#vishnu-desktop-toc a[aria-current=location]')", timeout=20000)
                initial_active = page.locator("#vishnu-desktop-toc a[aria-current='location']").get_attribute("href")
                page.evaluate("""() => {
                    const heading = document.querySelector("#source-content #women");
                    window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 100);
                }""")
                page.wait_for_function("initial => { const link = document.querySelector('#vishnu-desktop-toc a[aria-current=location]'); return link && link.getAttribute('href') !== initial; }", arg=initial_active, timeout=20000)
                active_color = page.locator("#vishnu-desktop-toc a[aria-current='location']").evaluate("el => getComputedStyle(el).color")
                inactive_color = page.locator("#vishnu-desktop-toc a:not([aria-current='location'])").first.evaluate("el => getComputedStyle(el).color")
                assert active_color != inactive_color, {"active": active_color, "inactive": inactive_color}
                assert initial_active != page.locator("#vishnu-desktop-toc a[aria-current='location']").get_attribute("href")
                report["manusmriti"] = {"sections": "linked", "active_contents": "updates while scrolling", "sanskrit": "source scan opens", "table_rows": 15}
                page.screenshot(path=str(OUT / "manusmriti.png"))

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
                assert page.locator(".ad-entry-link").first.evaluate("(el)=>getComputedStyle(el).color") == "rgb(6, 69, 173)"
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
                canto4 = page.locator("#canto-4 .chapter-list a")
                assert canto4.count() == 31 and canto4.first.inner_text() == "4.1" and canto4.last.inner_text() == "4.31"
                canto4_color = canto4.first.locator(".purana-chapter-reference").evaluate("(el)=>getComputedStyle(el).color")
                assert canto4_color == "rgb(6, 69, 173)", canto4_color
                page.goto(base + "articles/srimad-bhagavatam-canto-01-sridhara-svami/", wait_until="domcontentloaded")
                assert page.locator(".source-note").count() == 0
                assert "Coverage runs through" not in page.locator("body").inner_text()
                page.goto(base + "pages/bhagavatam-with-sridhara-bhasya/", wait_until="domcontentloaded")
                bhagavatam_link = page.locator(".chapter-list a").first
                bhagavatam_link.locator(".purana-chapter-reference").wait_for(timeout=20000)
                assert bhagavatam_link.locator(".purana-chapter-reference").inner_text() == "1.1"
                chapter_name = bhagavatam_link.locator(".purana-chapter-name")
                assert not chapter_name.is_visible()
                names_toggle = page.locator(".purana-chapter-name-toggle")
                assert names_toggle.evaluate("(el) => el.tagName") == "INPUT"
                number_color = bhagavatam_link.locator(".purana-chapter-reference").evaluate("(el) => getComputedStyle(el).color")
                assert number_color == "rgb(6, 69, 173)", number_color
                assert not names_toggle.is_checked()
                names_toggle.check()
                assert chapter_name.is_visible()
                assert "Questions by the Sages" in chapter_name.inner_text()
                names_toggle.uncheck()
                assert not chapter_name.is_visible()
                report["purana_chapter_names"] = {"default": "numbered references", "optional": "chapter names show and hide"}
                page.screenshot(path=str(OUT / "purana-chapter-numbers.png"))

                page.goto(base, wait_until="domcontentloaded")
                bhavishya_home_link = page.locator('#shastras a[href="/advaita/pages/bhavishya-purana-brahmaparvan/"]')
                assert bhavishya_home_link.count() == 1
                page.goto(base + "pages/bhavishya-purana-brahmaparvan/", wait_until="domcontentloaded")
                chapter_links = page.locator(".chapter-list a")
                brahma_link = chapter_links.first
                brahma_link.locator(".purana-chapter-reference").wait_for(timeout=20000)
                assert chapter_links.count() == 216
                assert page.locator(".parva").count() == 1
                assert page.locator("#pratisargaparvan, #madhyamaparvan, #uttaraparvan").count() == 0
                assert page.locator(".side a").count() == 1
                assert page.locator(".reader details, .reader summary, .reader button").count() == 0
                assert brahma_link.locator(".purana-chapter-reference").inner_text() == "1.1"
                assert chapter_links.last.locator(".purana-chapter-reference").inner_text() == "1.216"
                brahma_color = brahma_link.locator(".purana-chapter-reference").evaluate("(el) => getComputedStyle(el).color")
                assert brahma_color == "rgb(6, 69, 173)", brahma_color
                assert not brahma_link.locator(".purana-chapter-name").is_visible()
                names_toggle = page.locator(".purana-chapter-name-toggle")
                assert not names_toggle.is_checked()
                names_toggle.check()
                assert brahma_link.locator(".purana-chapter-name").is_visible()
                assert "Śatānīka’s Inquiry" in brahma_link.locator(".purana-chapter-name").inner_text()
                report["bhavishya_index"] = {"default": "1.1–1.216", "parvas": 1, "chapter_names": "optional"}

                page.goto(base + "pages/vishnu-purana/", wait_until="domcontentloaded")
                vishnu_first = page.locator("#book-list .chapter-grid a .purana-chapter-reference").first
                vishnu_first.wait_for(timeout=20000)
                assert vishnu_first.inner_text() == "1.1"
                report["purana_indexes"] = {"bhagavatam_canto": "1.1", "bhavishya_brahmaparvan": "216 chapters", "vishnu_purana_book": "1.1"}

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

                page.set_viewport_size({"width": 1366, "height": 900})
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

