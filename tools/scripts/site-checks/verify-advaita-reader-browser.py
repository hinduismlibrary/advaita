#!/usr/bin/env python3
"""Exercise every Advaita text through the shared reader in Chromium."""

from __future__ import annotations

import json
import os
import re
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright


WORKS = [
    "advaita-makaranda", "aparokshanubhuti", "atma-bodha", "atmavidya-vilasa",
    "upadesha-panchakam", "upadesha-sahasri", "ekashloki", "tattvabodha",
    "dashashloki", "drg-drsya-viveka", "naishkarmya-siddhi", "panchadasi",
    "panchikarana-prakarana", "brahmajnanavali-mala", "brahma-siddhi",
    "mandukya-karika", "vedantasara", "vivekachudamani", "svsss",
    "advaita-pancharatnam", "kashi-panchakam", "nirvana-shatkam",
    "bhaja-govindam", "manisha-panchakam", "maya-panchakam",
    "shatpadi-stotram", "yati-panchakam", "dakshinamurti-ashtakam",
    "hastamalaka-stotram",
]
BASE = os.environ.get("READER_TEST_BASE", "http://127.0.0.1:8765/advaita").rstrip("/")
OUTPUT = Path(os.environ.get("READER_TEST_OUTPUT", "advaita-reader-browser-output"))
OUTPUT.mkdir(parents=True, exist_ok=True)
CONTENTS_PATH = "/books/adi-shankaracharya/book-contents.html"
READER_PATH = "/books/adi-shankaracharya/book-chapter.html"
LIBRARY_PATH = "/books/adi-shankaracharya/"
STOTRAMS_PATH = "/books/adi-shankaracharya/stotrams/"
EDITORIAL_NOTICE = "The following thematic divisions are editorial aids to navigation and do not represent original chapters of the Sanskrit text."


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def route_for(work: str, **query: str) -> str:
    from urllib.parse import urlencode

    return f"{BASE}{CONTENTS_PATH}?{urlencode({'work': work, **query})}"


def page_errors(page, work: str, errors: list[str]) -> None:
    if errors:
        raise AssertionError(f"{work}: browser JavaScript errors: {errors}")


def inspect_all_work(page, work: str, errors: list[str]) -> None:
    page.set_viewport_size({"width": 1440, "height": 900})
    # Start at a real directory link, preserving the complete user path.
    found = False
    for directory in (LIBRARY_PATH, STOTRAMS_PATH):
        response = page.goto(BASE + directory, wait_until="domcontentloaded")
        require(response and response.status == 200, f"{work}: directory did not load ({directory})")
        directory_link = page.locator(f'a[href*="book-contents.html?work={work}"]').first
        if directory_link.count():
            directory_link.click()
            found = True
            break
    require(found, f"{work}: no directory route to its contents page")

    page.wait_for_function(
        """() => document.querySelector('#work-title .original-work-dev')
            && document.querySelector('#work-title .original-work-iast')
            && !document.querySelector('#sections .loading')""",
        timeout=30000,
    )
    author = page.evaluate(
        "work => {const metadata=window.AdvaitaReaderNavigation.metadata(work);return metadata.author||''}",
        work,
    )
    if author:
        require(author in page.locator("#work-author").inner_text(),
                f"{work}: contents page lost its qualified authorship information")
    require(page.locator("#complete-link").get_attribute("href").find("full=1") >= 0,
            f"{work}: contents page has no full-text link")
    if work in {"aparokshanubhuti", "atma-bodha", "atmavidya-vilasa", "tattvabodha", "vivekachudamani", "svsss"}:
        require(page.locator("#sections .editorial-note").inner_text() == EDITORIAL_NOTICE,
                f"{work}: editorial divisions lack their transparency note")
    data = page.evaluate(
        """async (work) => {
          const response = await fetch(`/advaita/assets/data/shankara/${encodeURIComponent(work)}.json`);
          if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
          return await response.json();
        }""",
        work,
    )
    units = data.get("units", [])
    require(units and len(units) == data.get("expectedUnits"),
            f"{work}: contents page source has incomplete units")

    section_links = page.locator("#sections a.chapter-link")
    complete_text_links = page.locator("#sections a.complete-text-link")
    contents_count = section_links.count()
    if contents_count:
        targets = page.locator("#sections a.chapter-link").evaluate_all(
            "links => links.map(a => new URL(a.href).searchParams.get('unit'))"
        )
        ids = {str(unit.get("id")) for unit in units}
        require(all(target in ids for target in targets),
                f"{work}: contents page links to a missing source unit")
        section_links.first.click()
    else:
        require(complete_text_links.count() == 1,
                f"{work}: short/continuous text needs one complete-text link")
        complete_text_links.click()
    page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
    selected_query = parse_qs(urlparse(page.url).query)
    require(selected_query.get("work") == [work], f"{work}: contents link routed to the wrong work")
    if section_links.count():
        require(selected_query.get("unit") and selected_query["unit"][0] in {str(u["id"]) for u in units},
                f"{work}: section link has no exact unit target")

    first_order = page.locator("#chapter-content > .shankara-verse").first.evaluate(
        """card => {
          const ref=card.querySelector(':scope > h2');
          const deva=card.querySelector(':scope > .gita-sanskrit');
          const iast=card.querySelector(':scope > .reader-inline-iast');
          const en=card.querySelector(':scope > .gita-translation');
          return {ref:!!ref,deva:!!deva,iast:!!iast,en:!!en,ordered:!!ref && !!deva && !!iast && !!en
            && ref.compareDocumentPosition(deva)&Node.DOCUMENT_POSITION_FOLLOWING
            && deva.compareDocumentPosition(iast)&Node.DOCUMENT_POSITION_FOLLOWING
            && iast.compareDocumentPosition(en)&Node.DOCUMENT_POSITION_FOLLOWING};
        }"""
    )
    require(first_order["ordered"], f"{work}: Sanskrit → IAST → English rendering order is wrong")
    page_errors(page, work, errors)

    # The full-text link is the canonical complete reading route, with every source entry.
    page.locator("#full-text-link").click()
    page.wait_for_function(
        "expected => document.querySelectorAll('#chapter-content > .shankara-verse').length === expected",
        arg=len(units),
        timeout=120000,
    )
    rendered = page.evaluate(
        r"""(payload) => {
          const units=payload.units;
          const cards=[...document.querySelectorAll('#chapter-content > .shankara-verse')];
          const links=[...document.querySelectorAll('#reader-toc .reader-verse-link')];
          const decoded=href=>decodeURIComponent(new URL(href,location.href).hash.slice(1));
          const optionalCount=(key, predicate=()=>true)=>units.filter(u=>u[key] && predicate(u)).length;
          const sourceRefs=units.filter(u=>{
            const values=(u.sourceNumbers||[]).map(String),number=String(u.number||'');
            if(!values.length||(u.number!==undefined&&values.length===1&&values[0]===number))return false;
            const range=number.match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);
            if(range&&values.length>1&&values.every((value,index)=>/^\d+$/.test(value)&&Number(value)===Number(range[1])+index)&&Number(values.at(-1))===Number(range[2]))return false;
            return true;
          }).length;
          return {
            cards:cards.length,links:links.length,
            referencesMatch:cards.every((card,index)=>card.id===String(units[index].id)),
            referenceLabelsMatch:cards.every((card,index)=>card.querySelector(':scope > h2')?.textContent===String(units[index].number || (units[index].sourceNumbers||[]).join(' · ') || index+1)),
            tocTargetsMatch:links.length===cards.length && links.every((link,index)=>decoded(link.href)===cards[index].id),
            alternateTranslations:document.querySelectorAll('.reader-edition-translation').length,
            expectedAlternateTranslations:optionalCount('editionTranslation'),
            sourceNotes:document.querySelectorAll('.reader-text-note .reader-note-label').length,
            expectedSourceNotes:optionalCount('sourceNote')+optionalCount('editorialNote')+optionalCount('commentary')+optionalCount('note')+optionalCount('notes'),
            sourceReferences:document.querySelectorAll('.reader-source-reference').length,
            expectedSourceReferences:sourceRefs,
            citations:!!document.querySelector('.reader-citation-details'),
            citationValuesPreserved:(()=>{const box=document.querySelector('.reader-citation-details');const values=[];const visit=v=>{if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object')Object.values(v).forEach(visit);else if(v!==undefined&&v!==null&&v!=='')values.push(String(v));};visit(payload.source);visit(payload.credit);return !!box&&values.every(v=>box.textContent.includes(v));})(),
            hasWordGloss:!!cards[0]?.querySelector('.gita-details > summary'),
            glossUnits:cards.filter(card=>card.querySelector('.gita-details > summary')).length,
            expectedGlossUnits:units.filter(unit=>Array.isArray(unit.gloss)&&unit.gloss.some(word=>word&&word.sa&&word.en)).length,
            completeGloss:cards.every((card,index)=>{const words=(units[index].gloss||[]).filter(word=>word&&word.sa&&word.en);const rows=[...card.querySelectorAll('.gita-word-row')];return words.length===rows.length&&rows.every((row,wordIndex)=>row.querySelector('.gita-word-dev')?.textContent===String(words[wordIndex].sa).trim()&&row.querySelector('.gita-word-gloss')?.textContent===String(words[wordIndex].en).trim());}),
            completeTranslation:cards.every((card,index)=>card.querySelector('.gita-translation')?.textContent===units[index].translation),
            completeDevanagari:cards.every((card,index)=>card.querySelector('.gita-sanskrit')?.textContent===units[index].deva),
            completeIAST:cards.every((card,index)=>card.querySelector('.reader-inline-iast')?.textContent===units[index].iast),
            completeEditionTranslation:units.every(unit=>!unit.editionTranslation||[...document.querySelectorAll('.reader-edition-translation')].some(node=>node.textContent.includes(unit.editionTranslation))),
            completeNotes:units.every(unit=>['sourceNote','editorialNote','commentary','note','notes'].every(key=>!unit[key]||[...document.querySelectorAll('.reader-text-note')].some(node=>node.textContent.includes(String(unit[key]))))),
            completeSourceReferences:units.every(unit=>{const values=(unit.sourceNumbers||[]).map(String),number=String(unit.number||'');if(!values.length||(unit.number!==undefined&&values.length===1&&values[0]===number))return true;const range=number.match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);if(range&&values.length>1&&values.every((value,index)=>/^\d+$/.test(value)&&Number(value)===Number(range[1])+index)&&Number(values.at(-1))===Number(range[2]))return true;return [...document.querySelectorAll('.reader-source-reference')].some(node=>node.textContent.includes(values.join(' · ')));}),
            standardizedLayout:(()=>{const h=document.querySelector('#work-title'),t=document.querySelector('#reader-toc'),c=document.querySelector('#chapter-content'),paper=document.querySelector('#chapter-reader');return {titleAlign:getComputedStyle(h).textAlign,titleColor:getComputedStyle(h).color,titleFont:getComputedStyle(h).fontFamily,tocLeft:t.getBoundingClientRect().left,readingLeft:c.getBoundingClientRect().left,paper:getComputedStyle(paper).backgroundColor,perUnitReveals:[...document.querySelectorAll('.shankara-verse details')].every(details=>details.classList.contains('gita-details'))};})(),
            desktopToc:(()=>{const e=document.querySelector('#reader-toc');const s=getComputedStyle(e);return {overflow:s.overflowY,scroll:e.scrollHeight,client:e.clientHeight};})()
          };
        }""",
        {"units": units, "source": data.get("source"), "credit": data.get("translationCredit")},
    )
    for check in ("referencesMatch", "referenceLabelsMatch", "tocTargetsMatch", "completeTranslation", "completeDevanagari", "completeIAST", "hasWordGloss", "completeGloss", "citationValuesPreserved", "completeEditionTranslation", "completeNotes", "completeSourceReferences"):
        require(rendered[check], f"{work}: full text check failed: {check} ({rendered})")
    require(rendered["glossUnits"] == rendered["expectedGlossUnits"], f"{work}: Word for Word controls do not cover every gloss ({rendered})")
    require(rendered["alternateTranslations"] == rendered["expectedAlternateTranslations"],
            f"{work}: alternate edition translations were lost ({rendered})")
    require(rendered["sourceNotes"] == rendered["expectedSourceNotes"],
            f"{work}: source/editorial notes were lost ({rendered})")
    require(rendered["sourceReferences"] == rendered["expectedSourceReferences"],
            f"{work}: source number references were lost ({rendered})")
    require(rendered["citations"], f"{work}: text source or edition citation is not rendered")
    layout = rendered["standardizedLayout"]
    require(layout["titleAlign"] == "center" and layout["titleColor"] == "rgb(73, 107, 108)" and "Merriweather" in layout["titleFont"] and layout["tocLeft"] < layout["readingLeft"] and layout["paper"] == "rgb(255, 253, 250)" and layout["perUnitReveals"],
            f"{work}: standardized scholarly layout or sole per-entry reveal changed ({layout})")
    require(rendered["desktopToc"]["overflow"] not in {"auto", "scroll"} and rendered["desktopToc"]["scroll"] <= rendered["desktopToc"]["client"] + 4,
            f"{work}: desktop contents sidebar creates nested scrolling ({rendered['desktopToc']})")
    page.locator("#chapter-content > .shankara-verse .gita-details > summary").first.click()
    require(page.locator("#chapter-content > .shankara-verse .gita-details").first.get_attribute("open") is not None,
            f"{work}: Word for Word control does not reveal its gloss")

    # Exercise one exact verse URL from the complete reader's unabridged contents list.
    last_link = page.locator("#reader-toc .reader-verse-link").last
    last_target = last_link.evaluate("a => decodeURIComponent(new URL(a.href).hash.slice(1))")
    last_link.click()
    require(urlparse(page.url).fragment == last_target, f"{work}: direct verse fragment did not resolve")
    require(page.locator(f"#chapter-content > article#{last_target}").count() == 1,
            f"{work}: direct verse fragment has no matching source entry")

    # Audit the narrowest required width for every work and the fully expanding mobile TOC.
    page.set_viewport_size({"width": 320, "height": 844})
    page.wait_for_timeout(120)
    overflow = page.evaluate("document.documentElement.scrollWidth > innerWidth")
    require(not overflow, f"{work}: horizontal overflow at 320 px")
    menu = page.locator(".advaita-mobile-contents-toggle")
    require(menu.is_visible(), f"{work}: mobile Contents disclosure is missing")
    menu.click()
    require(menu.get_attribute("aria-expanded") == "true", f"{work}: mobile Contents did not expand")
    require(page.locator("#reader-toc .reader-verse-link:visible").count() == len(units),
            f"{work}: mobile Contents is incomplete")
    toc_scroll = page.locator("#reader-toc").evaluate(
        "e => ({overflow:getComputedStyle(e).overflowY, scroll:e.scrollHeight, client:e.clientHeight})"
    )
    require(toc_scroll["overflow"] not in {"auto", "scroll"} and toc_scroll["scroll"] <= toc_scroll["client"] + 4,
            f"{work}: mobile TOC creates nested scrolling ({toc_scroll})")

    if work == "panchadasi":
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(route_for(work, unit="panchadasi-1-01"), wait_until="domcontentloaded")
        page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
        page.screenshot(path=str(OUTPUT / "reader-panchadasi-1440x900.png"), full_page=True)
        page.set_viewport_size({"width": 1024, "height": 768})
        page.screenshot(path=str(OUTPUT / "reader-panchadasi-1024x768.png"), full_page=True)
        page.set_viewport_size({"width": 768, "height": 1024})
        page.screenshot(path=str(OUTPUT / "reader-panchadasi-768x1024.png"), full_page=True)
        page.set_viewport_size({"width": 390, "height": 844})
        page.screenshot(path=str(OUTPUT / "reader-panchadasi-390x844.png"), full_page=True)
        page.set_viewport_size({"width": 320, "height": 844})
        page.screenshot(path=str(OUTPUT / "reader-panchadasi-320x844.png"), full_page=True)
        page.goto(route_for(work), wait_until="domcontentloaded")
        page.wait_for_selector("#sections a.chapter-link", timeout=30000)
        page.screenshot(path=str(OUTPUT / "contents-panchadasi-1440x900.png"), full_page=True)
        page.set_viewport_size({"width": 390, "height": 844})
        page.screenshot(path=str(OUTPUT / "contents-panchadasi-390x844.png"), full_page=True)
        page.goto(BASE + LIBRARY_PATH + "panchadasi/#section-panchadasi-1", wait_until="domcontentloaded")
        page.wait_for_function(
            "() => location.pathname.endsWith('/book-chapter.html') && location.hash === '#panchadasi-1-01'",
            timeout=30000,
        )
        page.wait_for_function(
            "expected => document.querySelectorAll('#chapter-content > .shankara-verse').length === expected",
            arg=len(units),
            timeout=120000,
        )

    print(f"PASS {work}: {len(units)} source entries, {contents_count or 'continuous'} contents links, full reader, references, notes, citations, gloss, 320 px")


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.set_default_timeout(30000)
        errors: list[str] = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        for work in WORKS:
            inspect_all_work(page, work, errors)
        # Shared template representative pass at all four remaining target widths.
        for width, height in ((1024, 768), (768, 1024), (390, 844)):
            page.set_viewport_size({"width": width, "height": height})
            page.goto(route_for("panchadasi", unit="panchadasi-1-01"), wait_until="domcontentloaded")
            page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
            require(not page.evaluate("document.documentElement.scrollWidth > innerWidth"),
                    f"Pañcadaśī has horizontal overflow at {width} px")
            if width == 390:
                page.locator(".advaita-mobile-contents-toggle").click()
                require(page.locator("#reader-toc .reader-verse-link:visible").count() == 65,
                        "Pañcadaśī mobile TOC is incomplete at 390 px")
        article_response = page.goto(BASE + "/articles/a-shashtric-lens-of-varna-part-one/", wait_until="domcontentloaded")
        require(article_response and article_response.status == 200, "The article design reference did not load")
        require(page.locator(".article-head h1").count() == 1, "The article design reference no longer has its article title")
        require(page.locator("body.advaita-standard-reader").count() == 0,
                "The shared-reader styles leaked into the article reference page")
        page_errors(page, "shared browser pass", errors)
        browser.close()
    (OUTPUT / "summary.json").write_text(json.dumps({"works": WORKS, "count": len(WORKS), "status": "passed"}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"PASS: {len(WORKS)} works, all required responsive widths, browser navigation, source preservation and layout checks.")


if __name__ == "__main__":
    main()
