#!/usr/bin/env python3
"""Validate Advaita/Śaṅkara reader inventory, data shape, and contents routes."""

from __future__ import annotations

import html
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parents[3]
DATA_DIR = ROOT / "site/assets/data/shankara"
BOOK_DIR = ROOT / "site/books/adi-shankaracharya"
READER_JS = ROOT / "site/assets/js/shankara-reader.js"
CONTENTS_HTML = BOOK_DIR / "book-contents.html"
ROOT_INDEX = BOOK_DIR / "index.html"
STOTRAM_INDEX = BOOK_DIR / "stotrams/index.html"
STYLE_CSS = ROOT / "site/assets/css/shankara-books.css"
DEVANAGARI = re.compile(r"[\u0900-\u097f]")
LATIN = re.compile(r"[A-Za-z]")
GENERIC_SECTION = re.compile(r"^(?:chapter|section|part|verses?)\s+\S+$", re.I)
PLACEHOLDERS = (
    "a word-for-word gloss is not available for this entry yet",
    "word-for-word gloss unavailable",
)
PROSE_PASSAGE_WORKS = {"vedantasara"}

errors: list[str] = []


def error(message: str) -> None:
    errors.append(message)


def text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except OSError as exc:
        error(f"cannot read {path.relative_to(ROOT)}: {exc}")
        return ""


def contains_placeholder(value: object) -> bool:
    if isinstance(value, str):
        lowered = value.casefold()
        return any(phrase in lowered for phrase in PLACEHOLDERS)
    if isinstance(value, dict):
        return any(contains_placeholder(item) for item in value.values())
    if isinstance(value, list):
        return any(contains_placeholder(item) for item in value)
    return False


def numeric_source_numbers(unit: dict) -> list[int]:
    values = unit.get("sourceNumbers")
    if not isinstance(values, list):
        values = [unit.get("number")]
    result = []
    for value in values:
        if isinstance(value, int) and not isinstance(value, bool):
            result.append(value)
        elif isinstance(value, str) and re.fullmatch(r"\s*\d+\s*", value):
            result.append(int(value))
    return result


def inventory_links(markup: str) -> tuple[dict[str, list[str]], set[str]]:
    found: dict[str, list[str]] = {}
    unknown: set[str] = set()
    prefix = "/advaita/books/adi-shankaracharya/"
    for raw_href in re.findall(r"""href=["']([^"']+)["']""", markup):
        href = html.unescape(raw_href)
        parsed = urlsplit(href)
        if not parsed.path.startswith(prefix):
            continue
        suffix = parsed.path[len(prefix):].strip("/")
        if suffix in ("", "stotrams"):
            continue
        query = parse_qs(parsed.query)
        work_id = query.get("work", [None])[0]
        if not work_id and suffix != "book-contents.html":
            work_id = suffix.split("/")[0]
        if work_id:
            found.setdefault(work_id, []).append(href)
        else:
            unknown.add(href)
    return found, unknown


def main() -> int:
    reader_js = text(READER_JS)
    contents_html = text(CONTENTS_HTML)
    css = text(STYLE_CSS)

    works = re.findall(
        r'\{id:"([^"]+)",title:"[^"]+",author:"[^"]+",path:"([^"]+)"\}',
        reader_js,
    )
    work_ids = [work_id for work_id, _ in works]
    if not works:
        error("the reader's WORKS inventory could not be parsed")
    if len(work_ids) != len(set(work_ids)):
        error("the reader's WORKS inventory contains duplicate IDs")
    study_start = reader_js.find("const STUDY_LAYOUT_WORKS=new Set([")
    study_end = reader_js.find("]);", study_start)
    if study_start < 0 or study_end < 0:
        error("the reader's study-control work list could not be parsed")
    else:
        study_ids = set(re.findall(r'"([^"]+)"', reader_js[study_start:study_end]))
        if study_ids != set(work_ids):
            error(f"study controls do not cover every work: {sorted(set(work_ids) - study_ids)}")

    data_files = sorted(DATA_DIR.glob("*.json"))
    data_ids = {path.stem for path in data_files}
    if set(work_ids) != data_ids:
        error(
            "WORKS/data mismatch: "
            f"reader missing {sorted(data_ids - set(work_ids))}; "
            f"data missing {sorted(set(work_ids) - data_ids)}"
        )

    data_by_id: dict[str, dict] = {}
    total_units = 0
    total_gloss_rows = 0
    for path in data_files:
        work_id = path.stem
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            error(f"{path.name}: invalid JSON ({exc})")
            continue
        data_by_id[work_id] = data
        units = data.get("units")
        expected = data.get("expectedUnits")
        if data.get("id") != work_id:
            error(f"{work_id}: data id does not match filename")
        if not isinstance(units, list) or not units:
            error(f"{work_id}: units is missing or empty")
            continue
        if not isinstance(expected, int) or expected != len(units):
            error(
                f"{work_id}: expectedUnits={expected!r} but found {len(units)} units"
            )
        if len({u.get("id") for u in units if isinstance(u, dict)}) != len(units):
            error(f"{work_id}: unit IDs are missing or duplicated")

        total_units += len(units)
        numeric_units: Counter[int] = Counter()
        for index, unit in enumerate(units, start=1):
            where = f"{work_id} unit {index}"
            if not isinstance(unit, dict):
                error(f"{where}: unit is not an object")
                continue
            for field in ("id", "deva", "translation", "iast"):
                value = unit.get(field)
                if not isinstance(value, str) or not value.strip():
                    error(f"{where}: missing required {field}")
            deva = unit.get("deva", "")
            iast = unit.get("iast", "")
            if isinstance(deva, str) and deva and not DEVANAGARI.search(deva):
                error(f"{where}: Sanskrit field has no Devanāgarī text")
            if isinstance(iast, str) and iast and not LATIN.search(iast):
                error(f"{where}: IAST field has no Latin transliteration")
            if contains_placeholder(unit):
                error(f"{where}: contains a word-gloss placeholder")

            gloss = unit.get("gloss")
            if not isinstance(gloss, list) or not gloss:
                error(f"{where}: missing word-for-word gloss")
            else:
                for row_index, row in enumerate(gloss, start=1):
                    total_gloss_rows += 1
                    if not isinstance(row, dict):
                        error(f"{where} gloss {row_index}: expected an {sa,en} object")
                        continue
                    sa, en = row.get("sa"), row.get("en")
                    if not isinstance(sa, str) or not sa.strip():
                        error(f"{where} gloss {row_index}: missing Sanskrit word")
                    elif not DEVANAGARI.search(sa):
                        error(f"{where} gloss {row_index}: source is not Devanāgarī")
                    if not isinstance(en, str) or not en.strip():
                        error(f"{where} gloss {row_index}: missing English gloss")

            numeric_units.update(numeric_source_numbers(unit))

            # Verse texts must render one numbered source verse per card.
            # Vedāntasāra is prose; its numbered passages may share a study card.
            source_numbers = unit.get("sourceNumbers")
            number_label = str(unit.get("number", ""))
            if work_id not in PROSE_PASSAGE_WORKS:
                if isinstance(source_numbers, list) and len(source_numbers) > 1:
                    error(f"{where}: combines multiple source verses in one card")
                if re.search(r"\b\d+(?:\.\d+)?\s*[–—]\s*\d+\b", number_label):
                    error(f"{where}: verse card is labeled with a source-number range")
            if work_id == "mandukya-karika" and source_numbers != [number_label]:
                error(f"{where}: sourceNumbers must identify this one Kārikā verse")

        sections = data.get("sections")
        if not isinstance(sections, list):
            sections = []
        long_work = isinstance(expected, int) and expected >= 20
        derived_chapters = set()
        if work_id == "panchadasi":
            for unit in units:
                if isinstance(unit, dict):
                    match = re.match(r"^panchadasi-(\d+)-", str(unit.get("id", "")))
                    if match:
                        derived_chapters.add(int(match.group(1)))
            chapter_map = re.search(r"const PANCHADASI_CHAPTERS=\{([^}]+)\}", reader_js)
            named_chapter_count = (
                len(re.findall(r"(?:^|,)\s*\d+\s*:", chapter_map.group(1)))
                if chapter_map
                else 0
            )
            if len(derived_chapters) != 15 or named_chapter_count != 15:
                error("panchadasi: expected 15 ID-mapped chapters with 15 topic names")

        has_named_divisions = bool(sections) or bool(derived_chapters) or any(
            unit.get("chapter") is not None or unit.get("sectionTitle")
            for unit in units
            if isinstance(unit, dict)
        )
        if long_work and not has_named_divisions:
            error(f"{work_id}: long text has no named contents divisions")
        if long_work and sections:
            for section_index, section in enumerate(sections, start=1):
                title = section.get("title") if isinstance(section, dict) else None
                if not isinstance(title, str) or len(title.strip()) < 12:
                    error(f"{work_id} section {section_index}: missing topic-led title")
                elif GENERIC_SECTION.fullmatch(title.strip()):
                    error(f"{work_id} section {section_index}: generic title {title!r}")

        # For simple numbered works, ensure named contents ranges cover every
        # numbered source item once. Chaptered texts are checked by their IDs
        # and topic labels above and by the contents template below.
        if (
            long_work
            and sections
            and not any(
                isinstance(unit, dict) and unit.get("chapter") is not None
                for unit in units
            )
            and all(
                isinstance(section, dict)
                and isinstance(section.get("startVerse"), int)
                and isinstance(section.get("endVerse"), int)
                for section in sections
            )
            and numeric_units
        ):
            covered: Counter[int] = Counter()
            for section in sections:
                start, end = section["startVerse"], section["endVerse"]
                if start > end:
                    error(f"{work_id}: reversed contents range {start}–{end}")
                    continue
                covered.update(range(start, end + 1))
            if covered != numeric_units:
                missing = sorted((numeric_units - covered).elements())[:10]
                extra = sorted((covered - numeric_units).elements())[:10]
                error(
                    f"{work_id}: contents ranges do not cover source numbers once "
                    f"(missing {missing}, extra/overlap {extra})"
                )

    route_by_id: dict[str, list[str]] = {}
    for page in (ROOT_INDEX, STOTRAM_INDEX):
        found, unknown = inventory_links(text(page))
        for work_id, hrefs in found.items():
            route_by_id.setdefault(work_id, []).extend(hrefs)
        for href in unknown:
            error(f"{page.name}: unrecognized Advaita inventory link {href}")

    reader_path_by_id = dict(works)
    for work_id, path in reader_path_by_id.items():
        relative = path.removeprefix("/advaita/")
        page = ROOT / "site" / relative / "index.html"
        if not page.is_file():
            error(f"{work_id}: reader route is missing ({page.relative_to(ROOT)})")
        data = data_by_id.get(work_id)
        if not data:
            continue
        expected = data.get("expectedUnits")
        long_work = isinstance(expected, int) and expected >= 20
        hrefs = route_by_id.get(work_id, [])
        if len(hrefs) != 1:
            error(f"{work_id}: expected one inventory link, found {len(hrefs)}")
            continue
        is_contents = "book-contents.html" in hrefs[0] and parse_qs(urlsplit(hrefs[0]).query).get("work") == [work_id]
        if long_work and not is_contents:
            error(f"{work_id}: long text does not link through its contents page")
        if not long_work and is_contents:
            error(f"{work_id}: under-20 text should open as a single reader page")

    contents_match = re.search(
        r"var validWorks=new Set\(\[([^\]]*)\]\)",
        contents_html,
    )
    if not contents_match:
        error("the contents page's supported-work list could not be parsed")
        allowed_contents = set()
    else:
        allowed_contents = set(re.findall(r'"([^"]+)"', contents_match.group(1)))
    for work_id, data in data_by_id.items():
        expected = data.get("expectedUnits")
        if isinstance(expected, int) and expected >= 20 and work_id not in allowed_contents:
            error(f"{work_id}: contents page does not support this work")

    if not re.search(
        r"\.shankara-study-button-row[^{]*\{[^}]*gap\s*:\s*0!important",
        css,
        re.S,
    ):
        error("the shared transliteration/word-gloss button row lacks the zero-gap rule")

    if errors:
        for message in errors:
            print(f"FAIL: {message}", file=sys.stderr)
        print(f"Failed with {len(errors)} issue(s).", file=sys.stderr)
        return 1

    print(
        f"PASS: {len(data_by_id)} works, {total_units} units, "
        f"{total_gloss_rows} Devanāgarī-to-English gloss rows."
    )
    print(
        f"PASS: reader routes and inventory links resolve; all long works use "
        f"contents pages; short works open as single pages."
    )
    print("PASS: all units satisfy the reader loader and have Sanskrit, English, IAST, and word glosses.")
    print("PASS: verse texts use one source verse per card; numbered prose passage groups remain explicit.")
    print("PASS: named numeric contents ranges have no gaps or overlaps where directly comparable.")
    print("PASS: shared transliteration and word-gloss buttons have zero gap.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
