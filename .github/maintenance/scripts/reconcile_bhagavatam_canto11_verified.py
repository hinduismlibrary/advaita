#!/usr/bin/env python3
"""Apply only independently checked, narrow Canto 11 corrections; never certify the canto."""
from pathlib import Path
import json
import re
from urllib.request import Request, urlopen
ROOT=Path(__file__).resolve().parents[3]
DATA=ROOT/'assets/data'
PIN='100560de6c9f68c2875097d40a2012a84c784179'

def load(ch):
    path=DATA/f'bhagavatam-sridhara-wfw-canto11-ch{ch:02}-verses01-{ {11:49,12:24,31:28}[ch]:02}.json'
    return path,json.loads(path.read_text())

def save(p,d):
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')

def run():
    p,d=load(11)
    entry=next(e for e in d['entries'] if e['start']==1)
    assert entry['literal_english'].startswith('The eleventh canto teaches')
    entry['literal_english']=entry['literal_english'].replace('The eleventh canto teaches','The eleventh chapter teaches',1)
    if d.get('status')=='complete':d['status']='requires-full-verification'
    save(p,d)

    p,d=load(12)
    entry=next(e for e in d['entries'] if e['start']==1 and e['end']==2)
    src_url='https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/'+PIN+'/bhAgavatam/gauDIya-prastutiH/11/12_sat-sanga-mahimA_karma-tyAga-vidhish_cha.md'
    with urlopen(Request(src_url,headers={'User-Agent':'vivekadrishti-C11-repair'}),timeout=75) as resp: source=resp.read().decode()
    m=re.search(r'\*\*श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)\s*:\*\*(.*?)\*\*सनातन-गोस्वामी\*\*',source,re.S)
    assert m and 'न रोधयति' in m[1]
    only_sridhara=m[1].strip()
    assert only_sridhara.startswith('द्वादशे') and 'सनातन' not in only_sridhara
    assert entry['sanskrit'].startswith('द्वादशे') and 'सनातन-गोस्वामी' in entry['sanskrit']
    entry['sanskrit']=only_sridhara
    d['status']='requires-full-verification'
    d['editorial_note']=(d.get('editorial_note','')+' Corrected 11.12.1–2 to exclude separately attributed Sanātana material; the glosses and English still require source-first rechecking.').strip()
    save(p,d)

    p,d=load(31)
    entry=next(e for e in d['entries'] if e['start']==2 and e['end']==2)
    assert 'द्विजा गरुड-लोक-निवासिनः पक्षिणः' in entry['sanskrit']
    entry['word_for_word']=[['द्विजाः','twice-born'],['गरुड-लोक-निवासिनः','inhabitants of Garuḍa’s realm'],['पक्षिणः','birds'],['मैत्रेय-आदयः','Maitreya and others'],['वा','or']]
    entry['literal_english']='“Twice-born” means birds dwelling in Garuḍa’s realm, or alternatively Maitreya and others.'
    d['status']='requires-full-verification'
    d['editorial_note']=(d.get('editorial_note','')+' Corrected the previously unrelated 11.31.2 glosses; other verses remain unaudited for complete word coverage.').strip()
    save(p,d)

    readme=ROOT/'.github/docs/BHAGAVATAM_COMPLETION.md'
    body=readme.read_text()
    if 'canto_11_audit_status: COMPLETE' in body:
        body=body.replace('canto_11_audit_status: COMPLETE','canto_11_audit_status: FAILED_FULL_VERIFICATION',1)
    if 'canto_11_verified_chapters: 11.1-11.31' in body:
        body=body.replace('canto_11_verified_chapters: 11.1-11.31','canto_11_verified_chapters: none under the full-verse standard',1)
    if 'latest_release_status: LIVE_VERIFIED' in body:
        body=body.replace('latest_release_status: LIVE_VERIFIED','latest_release_status: RETRACTED_PENDING_FULL_VERIFICATION',1)
    title='# Vivekadrishti Śrīmad-Bhāgavatam with Śrīdhara Bhāṣya — Completion Workflow'
    note=('\n\n> **Canto 11 status correction (2026-09-20):** The previous COMPLETE/LIVE_VERIFIED labels were not supported by a full verse-by-verse comparison. See [the deterministic mapping audit](../maintenance/audit/canto11/automated-summary.md) and [the evidentiary review](BHAGAVATAM_CANTO11_AUDIT_2026-09-20.md). All 31 chapters remain under verification. In particular, the pinned 11.23 numbering differs from the displayed VedaBase mirror from the mid-chapter onward. Do not reassert completion from file counts or this historical snapshot.\n')
    assert title in body
    if 'Canto 11 status correction (2026-09-20)' not in body:body=body.replace(title,title+note,1)
    readme.write_text(body)

    html=ROOT/'articles/srimad-bhagavatam-canto-11-sridhara-svami/index.html'
    page=html.read_text()
    old='Chapter 2 commentary glosses presently cover verses 1–34 except verse 3, which lacks a separate Śrīdhara gloss.'
    new='Chapter 2 files include gloss records through verse 55, but their exhaustive word-for-word accuracy remains under review; verse 3 has no separate Śrīdhara explanation in the pinned source.'
    assert old in page
    html.write_text(page.replace(old,new,1))
    print('Corrected 11.11.1, 11.12.1–2 attribution, 11.31.2, completion guide status, and the stale Canto 11 source note.')

if __name__=='__main__':run()
