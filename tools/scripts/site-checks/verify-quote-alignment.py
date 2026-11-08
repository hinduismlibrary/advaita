#!/usr/bin/env python3
"""Reject displaced Sanskrit passages and inconsistent navigation in document readers."""
from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
SLUGS = (
    "varna-vicara",
    "a-defence-of-the-manusmriti",
    "a-shashtric-lens-of-varna-part-one",
    "a-vaishnava-lens-on-vishnu-as-the-supreme-deity",
    "a-shaiva-lens-on-shiva-as-the-supreme-deity",
    "meat-eating-in-hinduism-through-the-lens-of-shastra",
    "a-case-for-the-scriptural-validity-of-the-agamas",
    "hinduism-on-women",
)
DIV = re.compile(r"</?div\\b[^>]*>", re.I)
PAIR = re.compile(r'\\bclass="[^"]*\\bscripture-quote-pair\\b')
REF = re.compile(r'<p\\b[^>]*class="[^"]*\\breference\\b', re.I)
SA = re.compile(r'<(?:p|div)\\b[^>]*lang="sa-Deva"', re.I)
TRANS = re.compile(r'<p\\b[^>]*class="[^"]*\\btranslation\\b', re.I)
NAV = re.compile(r'<nav\\b[^>]*class="toc toc-index"[^>]*>[\\s\\S]*?</nav>', re.I)
LINK = re.compile(r'href="#([^"]+)"')
IDS = re.compile(r'\\bid="([^"]+)"')
DEV = re.compile(r'[\\u0900-\\u097F]')


def quote_blocks(html: str) -> list[tuple[int, int, str]]:
    stack: list[tuple[int, bool]] = []
    result: list[tuple[int, int, str]] = []
    for match in DIV.finditer(html):
        if match.group().startswith("</"):
            if not stack:
                raise ValueError("Unbalanced closing div")
            start, is_pair = stack.pop()
            if is_pair:
                result.append((start, match.end(), html[start:match.end()]))
        else:
            stack.append((match.start(), bool(PAIR.search(match.group()))))
    if stack:
        raise ValueError("Unclosed div")
    return sorted(result)


def check(slug: str) -> tuple[list[str], int]:
    path = ROOT / "site" / "articles" / slug / "index.html"
    html = path.read_text(encoding="utf-8")
    problems: list[str] = []
    try:
        blocks = quote_blocks(html)
    except ValueError as exc:
        return [f"{slug}: {exc}"], 0
    for number, (_, end, content) in enumerate(blocks, 1):
        refs, sanskrit, translations = len(REF.findall(content)), len(SA.findall(content)), len(TRANS.findall(content))
        if sanskrit and refs > sanskrit:
            problems.append(f"{slug}: quotation {number} has {refs} labels but only {sanskrit} Sanskrit passages")
        following = html[end:].lstrip()
        if sanskrit and translations > sanskrit and following.startswith('<div class="revealed-sanskrit"'):
            problems.append(f"{slug}: quotation {number} has a second translation before its Sanskrit")
    navigation = NAV.findall(html)
    if len(navigation) != 2:
        problems.append(f"{slug}: expected desktop and mobile contents")
    else:
        desktop, mobile = ([m.group(1) for m in LINK.finditer(nav)] for nav in navigation)
        if desktop != mobile:
            problems.append(f"{slug}: desktop and mobile contents differ")
        ids = set(IDS.findall(html))
        if any(anchor not in ids for anchor in desktop):
            problems.append(f"{slug}: contents have broken section links")
        if any(DEV.search(nav) for nav in navigation):
            problems.append(f"{slug}: contents contain Devanagari")
    return problems, len(blocks)


def main() -> int:
    errors: list[str] = []
    total = 0
    for slug in SLUGS:
        problems, count = check(slug)
        errors.extend(problems)
        total += count
    if errors:
        for line in errors:
            print("ERROR:", line, file=sys.stderr)
        return 1
    print(f"Verified {len(SLUGS)} research documents and {total} quotation blocks.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
