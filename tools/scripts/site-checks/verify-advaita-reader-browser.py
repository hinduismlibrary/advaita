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


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def route_for(work: str, **query: str) -> str:
    from urllib.parse import urlencode

    return f"{BASE}{CONTENTS_PATH}?{urlencode({'work': work, **query})}"


def reader_route_for(work: str, **query: str) -> str:
    from urllib.parse import urlencode

    return f"{BASE}{READER_PATH}?{urlencode({'work': work, **query})}"


def page_errors(page, work: str, errors: list[str]) -> None:
    if errors:
        raise AssertionError(f"{work}: browser JavaScript errors: {errors}")


def inspect_all_work(page, work: str, errors: list[str]) -> None:
    page.set_viewport_size({"width": 1440, "height": 900})
    # Start at a real directory link, preserving the complete user path.
    found = False
    data = None
    units = []
    for directory in (LIBRARY_PATH, STOTRAMS_PATH):
        response = page.goto(BASE + directory, wait_until="domcontentloaded")
        require(response and response.status == 200, f"{work}: directory did not load ({directory})")
        directory_link = page.locator(f'a[href*="work={work}"]').first
        if directory_link.count():
            data = page.evaluate(
                """async work => {
                  const response=await fetch(`/advaita/assets/data/shankara/${encodeURIComponent(work)}.json`);
                  if(!response.ok)throw new Error(`Data request failed: ${response.status}`);
                  return await response.json();
                }""",
                work,
            )
            units = data.get("units", [])
            directory_href = directory_link.get_attribute("href") or ""
            if "book-chapter.html" in directory_href:
                require("full=1" in directory_href,
                        f"{work}: direct directory route does not open the full text")
            else:
                require("book-contents.html" in directory_href,
                        f"{work}: directory link is neither a full-text nor a contents route")
            directory_link.click()
            found = True
            break
    require(found, f"{work}: no directory route to its contents page")

    page.wait_for_function("!!window.AdvaitaReaderNavigation", timeout=30000)
    require(units and len(units) == data.get("expectedUnits"),
            f"{work}: contents page source has incomplete units")

    section_links = page.locator("#sections a.chapter-link")
    contents_count = page.evaluate(
        "payload => window.AdvaitaReaderNavigation.itemsForContents(payload.work,payload.data).length",
        {"work": work, "data": data},
    )
    opens_directly = len(units) <= 50 or contents_count == 0
    if opens_directly:
        page.wait_for_function(
            "() => location.pathname.endsWith('/book-chapter.html') && new URLSearchParams(location.search).has('full')",
            timeout=30000,
        )
        require(not page.locator("#work-author, .reader-citation-details, .reader-verse-link").count(),
                f"{work}: direct text page still shows contents or metadata boilerplate")
        require(not page.locator("#sections .work-description, #sections .editorial-note").count(),
                f"{work}: short-text route displayed a redundant contents page")
    else:
        page.wait_for_function(
            "expected => document.querySelectorAll('#sections a.chapter-link').length === expected",
            arg=contents_count,
            timeout=30000,
        )
        require(not page.locator("#work-author, #sections .work-description, #sections .editorial-note").count(),
                f"{work}: contents page displays authorship or editorial boilerplate")
        require(page.locator("#complete-link").get_attribute("href").find("full=1") >= 0,
                f"{work}: contents page has no full-text link")
    if not opens_directly and contents_count:
        targets = page.locator("#sections a.chapter-link").evaluate_all(
            "links => links.map(a => new URL(a.href).searchParams.get('unit'))"
        )
        ids = {str(unit.get("id")) for unit in units}
        require(all(target in ids for target in targets),
                f"{work}: contents page links to a missing source unit")
        section_links.first.click()
    try:
        page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
    except Exception as error:
        snapshot = page.evaluate(
            """() => ({url:location.href,title:document.title,readerError:document.querySelector('.shankara-reader-error')?.innerText||'',
              readerText:document.querySelector('#chapter-content')?.innerText.slice(0,600)||'',
              scripts:[...document.scripts].map(script=>script.src).filter(Boolean)})"""
        )
        raise AssertionError(f"{work}: selected reader route did not render: {snapshot}; page errors: {errors}") from error
    page.wait_for_function(
        """() => {
          const reader=document.querySelector('link[href*="shankara-reader-standard.css"]');
          const chrome=document.querySelector('link[data-viveka-site-chrome],link[href*="site-chrome.css"]');
          return !!reader && !!chrome && !!(chrome.compareDocumentPosition(reader)&Node.DOCUMENT_POSITION_FOLLOWING);
        }""",
        timeout=30000,
    )
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
          const controls=card.querySelector(':scope > .reader-disclosure-actions');
          const transliterationButton=controls?.querySelector(':scope > .reader-transliteration-toggle');
          const wordButton=controls?.querySelector(':scope > .reader-word-toggle');
          return {ref:!!ref,deva:!!deva,transliterationButton:!!transliterationButton,wordButton:!!wordButton,iast:!!iast,en:!!en,ordered:!!ref && !!deva && !!transliterationButton && !!wordButton && !!iast && !!en
            && ref.compareDocumentPosition(deva)&Node.DOCUMENT_POSITION_FOLLOWING
            && deva.compareDocumentPosition(iast)&Node.DOCUMENT_POSITION_FOLLOWING
            && iast.compareDocumentPosition(en)&Node.DOCUMENT_POSITION_FOLLOWING
            && en.compareDocumentPosition(controls)&Node.DOCUMENT_POSITION_FOLLOWING
            && transliterationButton.parentElement===wordButton.parentElement};
        }"""
    )
    require(first_order["ordered"], f"{work}: Sanskrit → transliteration control → IAST → English rendering order is wrong")
    page_errors(page, work, errors)

    # Long works can begin in a selected section; short works already opened continuously.
    if page.locator("#full-text-link").is_visible():
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
          const optionalCount=(key, predicate=()=>true)=>units.filter(u=>u[key] && predicate(u)).length;
          const sourceRefs=units.filter(u=>{
            const values=(u.sourceNumbers||[]).map(String),number=String(u.number||'');
            if(!values.length||(u.number!==undefined&&values.length===1&&values[0]===number))return false;
            const range=number.match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);
            if(range&&values.length>1&&values.every((value,index)=>/^\d+$/.test(value)&&Number(value)===Number(range[1])+index)&&Number(values.at(-1))===Number(range[2]))return false;
            return true;
          }).length;
          return {
            cards:cards.length,
            referencesMatch:cards.every((card,index)=>card.id===String(units[index].id)),
            referenceLabelsMatch:cards.every((card,index)=>card.querySelector(':scope > h2')?.textContent===String(units[index].number || (units[index].sourceNumbers||[]).join(' · ') || index+1)),
            jumpControl:(()=>{const input=document.querySelector('#reader-jump-input'),range=document.querySelector('#reader-jump-range'),label=document.querySelector('#reader-jump-label');return !!input&&!!range&&!!label&&input.max===String(cards.length)&&range.textContent===`1–${cards.length}`&&label.textContent.trim()===(payload.prose?'Go to section:':'Go to verse:');})(),
            noMetadataBoilerplate:!document.querySelector('#work-author,.shankara-reader-coverage,.reader-citation-details')&&!document.body.innerText.includes('Text source, authorship, and translation credit'),
            alternateTranslations:document.querySelectorAll('.reader-edition-translation').length,
            expectedAlternateTranslations:optionalCount('editionTranslation'),
            sourceNotes:document.querySelectorAll('.reader-text-note .reader-note-label').length,
            expectedSourceNotes:optionalCount('sourceNote')+optionalCount('editorialNote')+optionalCount('commentary')+optionalCount('note')+optionalCount('notes'),
            sourceReferences:document.querySelectorAll('.reader-source-reference').length,
            expectedSourceReferences:sourceRefs,
            hasWordGloss:!!cards[0]?.querySelector('.reader-word-toggle'),
            glossUnits:cards.filter(card=>card.querySelector('.reader-word-toggle')).length,
            expectedGlossUnits:units.filter(unit=>Array.isArray(unit.gloss)&&unit.gloss.some(word=>word&&word.sa&&word.en)).length,
            completeGloss:cards.every((card,index)=>{const words=(units[index].gloss||[]).filter(word=>word&&word.sa&&word.en);const rows=[...card.querySelectorAll('.gita-word-row')];return words.length===rows.length&&rows.every((row,wordIndex)=>row.querySelector('.gita-word-dev')?.textContent===String(words[wordIndex].sa).trim()&&row.querySelector('.gita-word-gloss')?.textContent===String(words[wordIndex].en).trim());}),
            completeTranslation:cards.every((card,index)=>card.querySelector('.gita-translation')?.textContent===units[index].translation),
            completeDevanagari:cards.every((card,index)=>card.querySelector('.gita-sanskrit')?.textContent===units[index].deva),
            completeIAST:cards.every((card,index)=>card.querySelector('.reader-inline-iast')?.textContent===units[index].iast),
            transliterationHiddenByDefault:cards.every(card=>{const button=card.querySelector('.reader-transliteration-toggle'),iast=card.querySelector('.reader-inline-iast');return button?.textContent.trim()==='Show transliteration'&&button.getAttribute('aria-expanded')==='false'&&iast?.hidden&&getComputedStyle(iast).display==='none';}),
            completeEditionTranslation:units.every(unit=>!unit.editionTranslation||[...document.querySelectorAll('.reader-edition-translation')].some(node=>node.textContent.includes(unit.editionTranslation))),
            completeNotes:units.every(unit=>['sourceNote','editorialNote','commentary','note','notes'].every(key=>!unit[key]||[...document.querySelectorAll('.reader-text-note')].some(node=>node.textContent.includes(String(unit[key]))))),
            completeSourceReferences:units.every(unit=>{const values=(unit.sourceNumbers||[]).map(String),number=String(unit.number||'');if(!values.length||(unit.number!==undefined&&values.length===1&&values[0]===number))return true;const range=number.match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);if(range&&values.length>1&&values.every((value,index)=>/^\d+$/.test(value)&&Number(value)===Number(range[1])+index)&&Number(values.at(-1))===Number(range[2]))return true;return [...document.querySelectorAll('.reader-source-reference')].some(node=>node.textContent.includes(values.join(' · ')));}),
            standardizedLayout:(()=>{const h=document.querySelector('#work-title'),t=document.querySelector('#reader-toc'),c=document.querySelector('#chapter-content'),paper=document.querySelector('#chapter-reader'),form=document.querySelector('.reader-jump-form'),first=cards[0];const matchedColors=el=>{const out=[];const visit=rules=>{for(const rule of rules){if(rule.type===1){if(rule.style.getPropertyValue('color')&&el.matches(rule.selectorText))out.push({selector:rule.selectorText,value:rule.style.getPropertyValue('color'),priority:rule.style.getPropertyPriority('color')})}else if(rule.cssRules)visit(rule.cssRules)}};for(const sheet of document.styleSheets){try{visit(sheet.cssRules)}catch(error){}}return out.slice(-12)};const tbox=t.getBoundingClientRect(),cbox=c.getBoundingClientRect(),dev=first?.querySelector('.gita-sanskrit'),deva=first?.querySelector('.reader-devanagari-text'),translation=first?.querySelector('.gita-translation'),iast=first?.querySelector('.reader-inline-iast'),transliterationButton=first?.querySelector('.reader-transliteration-toggle');return {bodyClasses:document.body.className,readerStylesheets:[...document.styleSheets].map(sheet=>sheet.href||'inline').filter(href=>href.includes('shankara-reader-standard.css')||href.includes('site-chrome.css')),readerLinkOrder:[...document.head.querySelectorAll('link[rel~="stylesheet"]')].filter(link=>link.href.includes('shankara-reader-standard.css')||link.href.includes('site-chrome.css')).map(link=>link.href),readerBox:(()=>{const box=paper.getBoundingClientRect();return {left:box.left,width:box.width}})(),titleAlign:getComputedStyle(h).textAlign,titleColor:getComputedStyle(h).color,titleFont:getComputedStyle(h).fontFamily,jumpLeft:tbox.left,readingLeft:cbox.left,jumpWidth:tbox.width,readingWidth:cbox.width,jumpMax:form.querySelector('input').max,paper:getComputedStyle(paper).backgroundColor,perUnitReveals:[...document.querySelectorAll('.shankara-verse details')].every(details=>details.classList.contains('gita-details')),chapterContext:document.querySelector('#chapter-title')?.textContent.trim(),sectionTitle:h.textContent.trim(),firstReference:first?.querySelector(':scope > h2')?.textContent.trim(),referenceColor:first?getComputedStyle(first.querySelector(':scope > h2')).color:'',referenceColorRules:first?matchedColors(first.querySelector(':scope > h2')):[],sanskritColor:dev?getComputedStyle(dev).color:'',sanskritAlign:dev?getComputedStyle(dev).textAlign:'',sanskritTextColor:deva?getComputedStyle(deva).color:'',sanskritTextWeight:deva?getComputedStyle(deva).fontWeight:'',sanskritBackground:deva?getComputedStyle(deva).backgroundColor:'',sanskritColorRules:dev?matchedColors(dev):[],translationColor:translation?getComputedStyle(translation).color:'',translationWeight:translation?getComputedStyle(translation).fontWeight:'',translationAlign:translation?getComputedStyle(translation).textAlign:'',transliterationAlign:iast?getComputedStyle(iast).textAlign:'',transliterationDefault:!!transliterationButton&&transliterationButton.textContent.trim()==='Show transliteration'&&transliterationButton.getAttribute('aria-expanded')==='false'&&!!iast?.hidden&&getComputedStyle(iast).display==='none',iastStyle:iast?getComputedStyle(iast).fontStyle:'',sectionIntro:!!document.querySelector('.reader-section-intro'),noSidebar:!document.querySelector('#chapter-list,.reader-verse-link')};})()
          };
        }""",
        {"units": units, "iast": page.evaluate("work => window.AdvaitaReaderNavigation.metadata(work).iast", work), "prose": bool(page.evaluate("work => window.AdvaitaReaderNavigation.metadata(work).prose", work))},
    )
    for check in ("referencesMatch", "referenceLabelsMatch", "jumpControl", "noMetadataBoilerplate", "completeTranslation", "completeDevanagari", "completeIAST", "transliterationHiddenByDefault", "hasWordGloss", "completeGloss", "completeEditionTranslation", "completeNotes", "completeSourceReferences"):
        require(rendered[check], f"{work}: full text check failed: {check} ({rendered})")
    require(rendered["glossUnits"] == rendered["expectedGlossUnits"], f"{work}: Word for Word controls do not cover every gloss ({rendered})")
    require(rendered["alternateTranslations"] == rendered["expectedAlternateTranslations"],
            f"{work}: alternate edition translations were lost ({rendered})")
    require(rendered["sourceNotes"] == rendered["expectedSourceNotes"],
            f"{work}: source/editorial notes were lost ({rendered})")
    require(rendered["sourceReferences"] == rendered["expectedSourceReferences"],
            f"{work}: source number references were lost ({rendered})")
    layout = rendered["standardizedLayout"]
    require(layout["titleAlign"] == "center" and layout["titleColor"] == "rgb(73, 107, 108)" and "Merriweather" in layout["titleFont"] and abs(layout["jumpLeft"]-layout["readingLeft"]) <= 3 and abs(layout["jumpWidth"]-layout["readingWidth"]) <= 4 and layout["paper"] == "rgb(255, 253, 250)" and layout["perUnitReveals"] and layout["readerStylesheets"] and "shankara-reader-standard.css" in layout["readerStylesheets"][-1],
            f"{work}: standardized scholarly layout or sole per-entry reveal changed ({layout})")
    require(layout["jumpMax"] == str(len(units)) and layout["noSidebar"] and layout["referenceColor"] == "rgb(50, 100, 102)" and layout["sanskritColor"] == "rgb(0, 0, 0)" and layout["sanskritAlign"] == "center" and layout["sanskritTextColor"] == "rgb(0, 0, 0)" and layout["sanskritTextWeight"] == "700" and layout["sanskritBackground"] == "rgba(0, 0, 0, 0)" and layout["translationColor"] == "rgb(0, 0, 0)" and layout["translationWeight"] == "400" and layout["translationAlign"] == "left" and layout["transliterationAlign"] == "center" and layout["transliterationDefault"] and layout["iastStyle"] == "italic" and not layout["sectionIntro"],
            f"{work}: the full-width reader or compact verse jump changed ({layout})")
    controls = page.locator("#chapter-content > .shankara-verse > .reader-disclosure-actions").first
    control_style = controls.evaluate(
        """row => {
          const transliteration=row.querySelector('.reader-transliteration-toggle');
          const word=row.querySelector('.reader-word-toggle');
          const translation=row.parentElement.querySelector('.gita-translation');
          const transliterationStyle=getComputedStyle(transliteration);
          const wordStyle=getComputedStyle(word);
          const translationStyle=getComputedStyle(translation);
          return {
            adjacent:transliteration.parentElement===word.parentElement&&transliteration.nextElementSibling===word,
            sameStyle:transliterationStyle.color===wordStyle.color&&transliterationStyle.borderColor===wordStyle.borderColor&&transliterationStyle.borderRadius===wordStyle.borderRadius,
            noTranslationRule:translationStyle.borderLeftWidth==='0px'&&translationStyle.paddingLeft==='0px'
          };
        }"""
    )
    require(control_style["adjacent"] and control_style["sameStyle"] and control_style["noTranslationRule"],
            f"{work}: disclosure buttons are not paired consistently or the translation rule remains ({control_style})")
    transliteration_button = controls.locator(".reader-transliteration-toggle").first
    transliteration = page.locator("#chapter-content > .shankara-verse > .reader-inline-iast").first
    transliteration_button.click()
    require(transliteration_button.inner_text().strip() == "Hide transliteration" and transliteration.is_visible() and transliteration_button.get_attribute("aria-expanded") == "true",
            f"{work}: Show transliteration does not reveal its text")
    transliteration_button.click()
    require(transliteration_button.inner_text().strip() == "Show transliteration" and not transliteration.is_visible() and transliteration_button.get_attribute("aria-expanded") == "false",
            f"{work}: Hide transliteration does not collapse its text")
    gloss_button = controls.locator(".reader-word-toggle").first
    gloss_button.click()
    require(gloss_button.get_attribute("aria-expanded") == "true"
            and page.locator("#chapter-content > .shankara-verse > .gita-reveal").first.is_visible(),
            f"{work}: Word for Word control does not reveal its gloss")

    # The compact control's maximum is the last visible entry and jumps to it.
    last_target = str(units[-1]["id"])
    page.locator("#reader-jump-input").fill(str(len(units)))
    page.locator("#reader-jump-form button[type=submit]").click()
    require(urlparse(page.url).fragment == last_target, f"{work}: Go to verse did not jump to the requested entry")
    require(page.locator(f"#chapter-content > article#{last_target}").count() == 1,
            f"{work}: Go to verse has no matching source entry")

    # Audit the narrowest required width and the compact mobile jump field.
    page.set_viewport_size({"width": 320, "height": 844})
    page.wait_for_timeout(120)
    overflow = page.evaluate("document.documentElement.scrollWidth > innerWidth")
    require(not overflow, f"{work}: horizontal overflow at 320 px")
    require(page.locator("#reader-jump-input").is_visible(), f"{work}: mobile Go to verse control is missing")
    require(page.locator("#reader-jump-input").get_attribute("max") == str(len(units)),
            f"{work}: mobile Go to verse control does not show the complete range")
    require(page.locator("#chapter-list, .reader-verse-link, .advaita-mobile-contents-toggle").count() == 0,
            f"{work}: old contents sidebar still takes up mobile space")

    if work == "panchadasi":
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(reader_route_for(work, unit="panchadasi-1-01"), wait_until="domcontentloaded")
        try:
            page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
        except Exception as error:
            snapshot = page.evaluate(
                """() => ({url:location.href,title:document.title,readerError:document.querySelector('.shankara-reader-error')?.innerText||'',
                  readerText:document.querySelector('#chapter-content')?.innerText.slice(0,600)||'',
                  scripts:[...document.scripts].map(script=>script.src).filter(Boolean)})"""
            )
            raise AssertionError(f"Pañcadaśī direct reader did not render: {snapshot}; page errors: {errors}") from error
        chapter_layout = page.evaluate("""() => ({context:document.querySelector('#chapter-title')?.textContent.trim(),title:document.querySelector('#work-title')?.textContent.trim(),byline:document.querySelector('#work-author')?.textContent.trim()||'',reference:document.querySelector('#chapter-content > .shankara-verse h2')?.textContent.trim(),jumpMax:document.querySelector('#reader-jump-input')?.max,jumpRange:document.querySelector('#reader-jump-range')?.textContent.trim()})""")
        require(chapter_layout["context"] == "Pañcadaśī · Book I, Chapter 1" and chapter_layout["title"] == "Tattva-viveka" and not chapter_layout["byline"] and chapter_layout["reference"] == "Pañcadaśī 1.1" and chapter_layout["jumpMax"] == "65" and chapter_layout["jumpRange"] == "1–65",
                f"Pañcadaśī Chapter 1 does not match the supplied reader example ({chapter_layout})")
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
            page.goto(reader_route_for("panchadasi", unit="panchadasi-1-01"), wait_until="domcontentloaded")
            page.wait_for_selector("#chapter-content > .shankara-verse", timeout=30000)
            require(not page.evaluate("document.documentElement.scrollWidth > innerWidth"),
                    f"Pañcadaśī has horizontal overflow at {width} px")
            if width == 390:
                require(page.locator("#reader-jump-input").get_attribute("max") == "65",
                        "Pañcadaśī mobile Go to verse range is incomplete at 390 px")
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
