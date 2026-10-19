#!/usr/bin/env python3
"""Correct a verified, local 11.22 editorial numbering shift; not a full-canto certification."""
from pathlib import Path
import json
from urllib.request import Request, urlopen

ROOT=Path(__file__).resolve().parents[3]
DATA=ROOT/'assets/data/bhagavatam-sridhara-wfw-canto11-ch22-verses01-61.json'
READER=ROOT/'assets/js/bhagavatam-sridhara-reader.js'
PIN='100560de6c9f68c2875097d40a2012a84c784179'
ROOT_URL='https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/'+PIN+'/bhAgavatam/'

def fetch(path):
    with urlopen(Request(ROOT_URL+path,headers={'User-Agent':'vivekadrishti-ch22-verified-fix'}), timeout=75) as response:
        return response.read().decode('utf-8')

def main():
    source=fetch('gauDIya-prastutiH/11/22_shrI-bhagavad-uddhava-saMvAde.md')
    mirror=fetch('gauDIyo_abhaya-charaNaH/11/22.md')
    data=json.loads(DATA.read_text())
    assert data['source_commit']==PIN
    source_to_verse=[('मनः कर्म-मयं नॄणाम्','मन- कर्ममयं नृणामिन्द्रियै-',37),
                     ('ध्यायन् मनोऽनु विषयान्','ध्यायन् मनोऽनु विषयान्',38),
                     ('विषयाभिनिवेशेन नात्मानं','विषयाभिनिवेशेन नात्मानं',39)]
    for src,mir,verse in source_to_verse:
        assert src in source and mir in mirror, (src,mir,verse)
    entries=data['entries']
    fixes=[(36,36,37,37,'मनः कर्म-मयं'),
           (37,37,38,38,'ध्यायन् मनो'),
           (38,39,39,39,'विषयाभिनिवेशेन')]
    for old_start,old_end,new_start,new_end,needle in fixes:
        e=next((e for e in entries if e['start']==old_start and e['end']==old_end and needle in e['main_sanskrit']),None)
        assert e, (old_start,old_end,needle)
        e['start'],e['end']=new_start,new_end
        e['source_numbering_note']='Pinned Sanskrit prints heading 11.22.%d for canonical verse 11.22.%d; matched by the complete main Sanskrit to the pinned English mirror.'%(old_start,new_start)
    data['status']='requires-full-verification'
    data['editorial_note']=(data.get('editorial_note','')+' Corrected the pinned witness’s repeated 11.22.36 heading and consequent two-verse numbering shift for the three subsequent local commentary records. The rest of the chapter still needs exhaustive verification.').strip()
    for verse in [35,36,37,38,39]:
        matching=[e for e in entries if e['start']<=verse<=e['end']]
        assert len(matching)==1,(verse,matching)
    DATA.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    js=READER.read_text()
    old='const sourceOffset = markerCanto === 1 && markerChapter === 16 && sourceStart >= 13 ? -1 : 0;'
    new=('const sourceOffset = markerCanto === 1 && markerChapter === 16 && sourceStart >= 13 ? -1\n'
         '        : markerCanto === 11 && markerChapter === 22 && sourceStart >= 36 && sourceStart <= 38 ? 1\n'
         '        : 0;')
    assert old in js and new not in js
    READER.write_text(js.replace(old,new,1))
    print('Corrected Canto 11 Chapter 22 source headings 36–38 to canonical 37–39 in both reader and local WFW records. Verified one local record per verse 35–39.')

if __name__=='__main__': main()
