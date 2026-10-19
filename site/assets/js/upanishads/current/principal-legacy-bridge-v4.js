/* Merge the older detailed principal-Upanishad dossiers into the authoritative research map. */
(() => {
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const R=window.UPANISHAD_RESEARCH_108=window.UPANISHAD_RESEARCH_108||{};
  const names=['Īśāvāsya','Kena','Kaṭha','Praśna','Muṇḍaka','Māṇḍūkya','Taittirīya','Aitareya','Chāndogya','Bṛhadāraṇyaka'];
  const alias={
    'Īśāvāsya':['Īśāvāsya','Isha','Isha Upanishad'],'Kena':['Kena'],'Kaṭha':['Kaṭha','Katha'],
    'Praśna':['Praśna','Prashna'],'Muṇḍaka':['Muṇḍaka','Mundaka'],'Māṇḍūkya':['Māṇḍūkya','Mandukya'],
    'Taittirīya':['Taittirīya','Taittiriya'],'Aitareya':['Aitareya'],'Chāndogya':['Chāndogya','Chandogya'],
    'Bṛhadāraṇyaka':['Bṛhadāraṇyaka','Brihadaranyaka']
  };
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const keyFor=t=>{
    const x=norm(t);
    if(/date|vedic setting|formation|chronolog|place in/.test(x))return'date';
    if(/structure|chapter|valli|prapathaka|mundaka|question|mantra|three births|four states|eight/.test(x))return'structure';
    if(/commentar|reception|later|influence|manuscript/.test(x))return'reception';
    if(/ritual|social|education|householder|renunciation|ethic|practice/.test(x))return'social';
    if(/critical|recension|textual|edition/.test(x))return'critical';
    if(/theolog|brahman|atman|self|conscious|moksha|knowledge|prana|om|ananda|neti|tat tvam|philosoph/.test(x))return'theology';
    return'contents';
  };
  const unique=(base,more)=>{const out=[...arr(base)],seen=new Set(arr(base).map(norm));for(const x of more){const s=String(x||'').trim(),k=norm(s);if(s&&k&&!seen.has(k)){seen.add(k);out.push(s);}}return out;};
  function findD(name){for(const a of alias[name]||[name]){if(D['Upaniṣad:'+a])return D['Upaniṣad:'+a];if(D[a])return D[a];}return null;}
  function flattenSection(s){const out=[];arr(s?.paragraphs).forEach(x=>out.push(x));arr(s?.bullets).forEach(x=>out.push(x));arr(s?.books).forEach(b=>{if(typeof b==='string')out.push(b);else{const title=[b.number,b.title||b.name].filter(Boolean).join(' — ');const body=b.summary||b.text||b.description||b.note||'';out.push((title?title+': ':'')+body);}});arr(s?.subsections).forEach(ss=>{arr(ss?.paragraphs).forEach(p=>out.push((ss.title?ss.title+': ':'')+p));arr(ss?.bullets).forEach(p=>out.push((ss.title?ss.title+': ':'')+p));});return out.filter(Boolean);}
  for(const name of names){
    const d=findD(name); if(!d)continue;
    const r=R[name]=R[name]||{};r.sections=r.sections||{};
    for(const s of arr(d.articleSections)){const k=keyFor(s.title);r.sections[k]=unique(r.sections[k],flattenSection(s));}
    r.sections.structure=unique(r.sections.structure,[...arr(d.extent),...arr(d.primaryRecensions)]);
    r.sections.contents=unique(r.sections.contents,[...arr(d.leadParagraphs).slice(2),...arr(d.chapterMap),...arr(d.keyContents)]);
    const sources=[...arr(d.sources),...arr(d.bibliography)].map(x=>typeof x==='string'?{title:x}:x).filter(Boolean);
    const existing=new Set(arr(r.references).map(x=>norm(x?.title||x)));
    r.references=[...arr(r.references),...sources.filter(x=>{const k=norm(x?.title||x);if(!k||existing.has(k))return false;existing.add(k);return true;})];
    r.scholarlyDepth='deep-v4-bridge';
  }
})();
