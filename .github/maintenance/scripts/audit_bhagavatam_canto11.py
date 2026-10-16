#!/usr/bin/env python3
"""Conservative Canto 11 mapping audit. Flags are NOT linguistic certification.
Run from the repository root: python .github/maintenance/scripts/audit_bhagavatam_canto11.py
Requires Python 3 stdlib and network access to GitHub's pinned public raw files.
"""
from collections import Counter, defaultdict
from pathlib import Path
import csv
import hashlib
import json
import re
import unicodedata
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / '_maintenance' / 'audit' / 'canto11'
PIN = '100560de6c9f68c2875097d40a2012a84c784179'
M = json.loads((ROOT / 'assets/data/bhagavatam-sridhara-reader-manifest.json').read_text())
assert M['primary_sanskrit']['commit'] == M['english_source']['mirror_commit'] == PIN
CONFIG = M['cantos']['11']
JS = (ROOT / 'assets/js/bhagavatam-sridhara-clarity.js').read_text()
LOCAL_PATHS = sorted(set(re.findall(r'/vivekadrishti/(assets/data/bhagavatam-sridhara-wfw-canto11-[^?\'"\s]+?\.json)', JS)))
RAW = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/' + PIN + '/'
DEV = str.maketrans('०१२३४५६७८९', '0123456789')
MARK = re.compile(r'॥\s*\*{0,2}\s*([०-९]+)\s*[.।]\s*([०-९]+)\s*[.।]\s*([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*\*{0,2}\s*॥')
ENG = re.compile(r'^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$', re.M | re.I)
OTHER = re.compile(r'(?:मध्वाचार्य|सनातन-गोस्वामी|जीव-गोस्वामी|विश्वनाथ|बलदेव|वंशीधर|वशिधर|दिग्दर्शिनी|श्रीनाथ|श्रीधर(?:-स्वामी|ः)?)\s*(?:\([^\n]*?\))?\s*[:：]')
SRIDHARA = re.compile(r'श्रीधर(?:-स्वामी|ः)?\s*(?:\([^\n]*?\))?\s*[:：]')
SEP = re.compile(r'\n\s*(?:_{4,}|[—\-]{12,})')


def fetch_bytes(path):
    req = Request(RAW + path, headers={'User-Agent': 'vivekadrishti-canto11-audit/1.0'})
    with urlopen(req, timeout=75) as response:
        return response.read()


def git_sha(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def digits(x):
    return int(str(x).translate(DEV))


def deva(text):
    """Conservative character sequence: ignores formatting, NOT spelling differences."""
    text = unicodedata.normalize('NFC', str(text or ''))
    text = re.sub(r'^\s*\[\^[^\]]+\]:.*$', '', text, flags=re.M)
    return ''.join(c for c in text if '\u0900' <= c <= '\u097f' and not '\u0966' <= c <= '\u096f' and c not in '।॥')


def prose_tokens(text):
    return re.findall(r'[\u0900-\u095f\u0970-\u097f]+', re.sub(r'\[\^[^\]]+\]:[^\n]*', '', text))


def source_blocks(md, canto, chapter):
    # Formatting breaks inside the Devanagari verse heading occur in this witness.
    md = re.sub(r'(॥\s*[०-९]+\s*\.\s*[०-९]+)\s*।\s*\*{1,2}\s*([०-९]+)', r'\1.\2', md)
    md = re.sub(r'(॥\s*[०-९]+\s*\.\s*[०-९]+)\s*\*{1,2}\s*।\s*\*{1,2}\s*([०-९]+)', r'\1.\2', md)
    md = re.sub(r'(॥\s*[०-९]+\s*\.\s*[०-९]+\s*\.\s*[०-९]+(?:\s*[-–—]\s*[०-९]+)?)\s*\*{1,2}\s*॥', r'\1 ॥', md)
    md = re.sub(r'॥\s*\*{1,2}([०-९]+\s*\.\s*[०-९]+\s*\.\s*[०-९]+(?:\s*[-–—]\s*[०-९]+)?)\*{1,2}\s*॥', r'॥ \1 ॥', md)
    matches = list(MARK.finditer(md))
    blocks = []
    for i, m in enumerate(matches):
        if (digits(m[1]), digits(m[2])) != (canto, chapter):
            continue
        start, end = digits(m[3]), digits(m[4] or m[3])
        segment = md[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(md)]
        first = OTHER.search(segment)
        main = segment[:first.start()] if first else segment
        main = '\n'.join(line for line in main.splitlines() if 'उवाच' not in line and not line.lstrip().startswith('[^'))
        shr = SRIDHARA.search(segment)
        commentary = ''
        if shr:
            remainder = segment[shr.end():]
            stops = [x.start() for x in [OTHER.search(remainder), SEP.search(remainder)] if x]
            commentary = remainder[:min(stops)] if stops else remainder
        blocks.append({'start': start, 'end': end, 'main': main, 'sridhara': commentary, 'segment': segment})
    return blocks


def english_blocks(md):
    headings = list(ENG.finditer(md))
    result = []
    for i, m in enumerate(headings):
        body = md[m.end(): headings[i+1].start() if i+1 < len(headings) else len(md)]
        sec = re.search(r'^### Devanagari\s*\n(.*?)(?=^### |\Z)', body, re.M | re.S)
        verse = sec.group(1) if sec else ''
        # Some source mirrors use a dash in place of visarga; do not silently repair it.
        verse = '\n'.join(line for line in verse.splitlines() if 'उवाच' not in line)
        result.append({'start': int(m[1]), 'end': int(m[2] or m[1]), 'main': verse})
    return result


def issue(issues, chapter, start, end, kind, detail):
    issues.append({'chapter': chapter, 'start': start, 'end': end, 'kind': kind, 'detail': detail})


def main():
    if len(CONFIG['sridhara_paths']) != 31:
        raise ValueError('Manifest does not contain 31 source paths')
    if not LOCAL_PATHS:
        raise ValueError('No Canto 11 local paths found in the live clarity script')
    records = defaultdict(list)
    issues = []
    for path in LOCAL_PATHS:
        file = ROOT / path
        if not file.is_file():
            issue(issues, 0, 0, 0, 'missing_local_file', path)
            continue
        data = json.loads(file.read_text())
        if data.get('source_commit') != PIN:
            issue(issues, 0, 0, 0, 'unpinned_local_file', path)
        for e in data.get('entries', []):
            if digits(e.get('canto', 0)) == 11:
                entry = dict(e)
                entry['_file'] = path
                records[digits(e['chapter'])].append(entry)
    summaries = []
    detailed = []
    for ch in range(1, 32):
        path = M['primary_sanskrit']['path_root'] + '/' + CONFIG['sridhara_paths'][str(ch)]
        english_path = (M['english_source']['mirror_path_root'] + '/' +
                        CONFIG['english_path_template'].replace('{chapter2}', f'{ch:02d}').replace('{chapter}', str(ch)))
        try:
            raw = fetch_bytes(path)
            mirror_raw = fetch_bytes(english_path)
        except Exception as exc:
            issue(issues, ch, 0, 0, 'source_fetch_error', repr(exc))
            summaries.append({'chapter': ch, 'source_fetch_error': repr(exc)})
            continue
        source = source_blocks(raw.decode('utf-8'), 11, ch)
        mirror = english_blocks(mirror_raw.decode('utf-8'))
        sha = git_sha(raw)
        if not source or not mirror:
            issue(issues, ch, 0, 0, 'parser_no_records', f'source={len(source)} mirror={len(mirror)}')
        expected = max([b['end'] for b in mirror] or [0])
        source_by_verse = defaultdict(list)
        mirror_by_verse = defaultdict(list)
        local_by_verse = defaultdict(list)
        for block in source:
            for v in range(block['start'], block['end'] + 1):
                source_by_verse[v].append(block)
        for block in mirror:
            for v in range(block['start'], block['end'] + 1):
                mirror_by_verse[v].append(block)
        for e in records[ch]:
            for v in range(digits(e['start']), digits(e.get('end') or e['start']) + 1):
                local_by_verse[v].append(e)
            if e.get('source_blob_sha') and e['source_blob_sha'] != sha:
                issue(issues, ch, digits(e['start']), digits(e.get('end') or e['start']), 'source_blob_mismatch', e['_file'])
            if e.get('source_path') and e['source_path'] != path:
                issue(issues, ch, digits(e['start']), digits(e.get('end') or e['start']), 'source_path_mismatch', e['_file'])
        for v in range(1, expected + 1):
            found_source, found_mirror, found_local = source_by_verse[v], mirror_by_verse[v], local_by_verse[v]
            row = {'chapter': ch, 'verse': v, 'source_ranges': len(found_source), 'mirror_ranges': len(found_mirror), 'local_records': len(found_local), 'source_sha': sha}
            if len(found_source) != 1: issue(issues, ch, v, v, 'source_range_count', str(len(found_source)))
            if len(found_mirror) != 1: issue(issues, ch, v, v, 'mirror_range_count', str(len(found_mirror)))
            if len(found_local) != 1: issue(issues, ch, v, v, 'local_record_count', str(len(found_local)))
            # Compare one complete mirror range to the concatenated main Sanskrit of
            # the overlapping primary blocks, avoiding repeated group comparisons.
            if len(found_source) == 1 and len(found_mirror) == 1:
                eb = found_mirror[0]
                if v == eb['start']:
                    main_src = ''.join(deva(x['main']) for x in source if x['end'] >= eb['start'] and x['start'] <= eb['end'])
                    main_mirror = deva(eb['main'])
                    if not main_mirror:
                        issue(issues, ch, eb['start'], eb['end'], 'mirror_missing_devanagari', '')
                    elif main_src != main_mirror:
                        issue(issues, ch, eb['start'], eb['end'], 'main_sanskrit_diff', f'pinned={main_src[:65]} mirror={main_mirror[:65]}')
            if len(found_source) == 1 and len(found_local) == 1:
                s, e = found_source[0], found_local[0]
                source_comment = deva(s['sridhara'])
                local_comment = deva(e.get('sanskrit', ''))
                if source_comment and not local_comment:
                    issue(issues, ch, v, v, 'missing_local_sridhara', e['_file'])
                elif source_comment and local_comment and (local_comment not in source_comment and source_comment not in local_comment):
                    issue(issues, ch, v, v, 'sridhara_text_diff', e['_file'])
                if not source_comment and local_comment and 'नव्याख्यातम्' not in local_comment:
                    issue(issues, ch, v, v, 'local_text_without_source_commentary', e['_file'])
                if 'सनातनगोस्वामी' in local_comment or 'जीवगोस्वामी' in local_comment:
                    issue(issues, ch, v, v, 'other_author_in_sridhara_field', e['_file'])
                pairs = e.get('word_for_word', e.get('pairs', []))
                if source_comment and (not isinstance(pairs, list) or len(pairs) <= 3 and len(prose_tokens(s['sridhara'])) >= 12):
                    issue(issues, ch, v, v, 'insufficient_gloss_pairs', f'pairs={len(pairs) if isinstance(pairs, list) else 0}, source_words={len(prose_tokens(s["sridhara"]))}')
                if isinstance(pairs, list) and source_comment:
                    for pair in pairs:
                        if isinstance(pair, list) and pair and deva(pair[0]) and deva(pair[0]) not in source_comment:
                            issue(issues, ch, v, v, 'gloss_source_phrase_not_found', str(pair[0])[:60])
            detailed.append(row)
        literals = defaultdict(list)
        for e in records[ch]:
            text = ' '.join(str(e.get('literal_english', '')).lower().split())
            if len(text) >= 60 and text not in ('no commentary',):
                literals[text].append((digits(e['start']), digits(e.get('end') or e['start'])))
        for literal, spans in literals.items():
            if len(spans) >= 2:
                issue(issues, ch, spans[0][0], spans[-1][1], 'duplicate_literal_across_ranges', f'{len(spans)} ranges: {spans[:8]}')
        by_kind = Counter(i['kind'] for i in issues if i['chapter'] == ch)
        summaries.append({'chapter': ch, 'verse_count': expected, 'source_ranges': len(source), 'mirror_ranges': len(mirror), 'local_entries': len(records[ch]), 'source_sha': sha, 'issues': dict(sorted(by_kind.items()))})
        print(f'11.{ch:02d}: verses={expected} source_ranges={len(source)} local_entries={len(records[ch])} flags={sum(by_kind.values())}', flush=True)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'automated-summary.json').write_text(json.dumps({'source_commit': PIN, 'checks': summaries, 'issues': issues}, ensure_ascii=False, separators=(',', ':')) + '\n')
    with (OUT / 'automated-verse-map.csv').open('w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['chapter', 'verse', 'source_ranges', 'mirror_ranges', 'local_records', 'source_sha'])
        w.writeheader(); w.writerows(detailed)
    lines = ['# Canto 11 deterministic mapping audit', '',
             f'Pinned source commit: `{PIN}`. This report checks source SHA, numeric verse mapping, textual character differences and flags likely inadequate glosses. It **does not** certify Sanskrit philology, translation accuracy, or independent authorship.', '',
             f'Chapters attempted: **{len(summaries)}/31**; verse rows: **{len(detailed)}**; issue flags: **{len(issues)}**.', '',
             '| Chapter | Verses | Source ranges | Local records | Flag count |', '|---|---:|---:|---:|---:|']
    for s in summaries:
        lines.append(f'| 11.{s["chapter"]} | {s.get("verse_count", "—")} | {s.get("source_ranges", "—")} | {s.get("local_entries", "—")} | {sum(s.get("issues", {}).values())} |')
    lines += ['', '## Flags by type', '']
    for kind, n in Counter(x['kind'] for x in issues).most_common():
        lines.append(f'- `{kind}`: {n}')
    lines += ['', 'See `automated-summary.json` for every verse-range flag and `automated-verse-map.csv` for all verse mappings. Repeated flags for a grouped source passage can represent one underlying defect. **No chapter is declared verified by this script.**', '']
    (OUT / 'automated-summary.md').write_text('\n'.join(lines))
    print(f'TOTAL chapters={len(summaries)} verse_rows={len(detailed)} flags={len(issues)}', flush=True)
    if len(summaries) != 31 or any('source_fetch_error' in x for x in summaries):
        raise SystemExit('SOURCE FETCH FAILED: results are not a complete 31-chapter scan')


if __name__ == '__main__':
    main()
