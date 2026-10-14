(() => {
  'use strict';
  const url = 'https://www.wisdomlib.org/hinduism/book/bhavishya-purana-sanskrit';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const divisions = [
    {id:'brahma', name:'Brāhma-parvan', sections:['I'], note:'The opening book. Quotations in later legal and ritual works overlap here with extensive solar passages shared with the Sāmba Purāṇa.'},
    {id:'madhyama', name:'Madhyama-parvan', sections:['II.1','II.2','II.3'], note:'Three bhāgas, numbered separately. A citation to the third bhāga is placed in chapter 18, although the citing work numbers it differently.'},
    {id:'pratisarga', name:'Pratisarga-parvan', sections:['III.1','III.2','III.3','III.4'], note:'Four separately numbered khaṇḍas. No located verse correspondence has yet been entered for these chapters.'},
    {id:'uttara', name:'Uttara-parvan', sections:['IV'], note:'Also circulated as Bhaviṣyottara. A title used by a citing work does not always predict where its verses fall in the received text.'}
  ];
  const key = (section, chapter) => `${section}.${chapter}`;
  let data, byChapter;

  function entryRow(item, section, chapter) {
    const shown = `${section}.${chapter}.${item.passage}`;
    const note = item.note ? `<span class="note">${esc(item.note)}</span>` : '';
    const label = item.label ? `<span class="variant-label">${esc(item.label)}</span>` : '';
    return `<tr><td>${esc(shown)}</td><td><em>${esc(item.work)}</em>${item.author ? `<span class="sub">${esc(item.author)}</span>` : ''}${label}</td><td>${esc(item.locus)}${note}</td></tr>`;
  }
  function detail(section, chapter) {
    const found = byChapter.get(key(section, chapter)) || [];
    const title = data.sections.find(s => s.id === section).name;
    const names = [
      ['Later quotations', found.filter(x => x.kind === 'quotation')],
      ['Parallels in other Purāṇas', found.filter(x => x.kind === 'parallel' && x.work.includes('Purāṇa'))],
      ['Other textual parallels', found.filter(x => x.kind === 'parallel' && !x.work.includes('Purāṇa'))]
    ];
    let html = `<div class="detail-head"><h3>${esc(section)}.${chapter}</h3><span>${esc(title)}</span></div>`;
    if (!found.length) html += '<p class="empty-note">No quotation or verse parallel has a located entry for this chapter in the present concordance.</p>';
    else for (const [label, items] of names) if (items.length) {
      html += `<div class="evidence-group"><h4>${label} · ${items.length}</h4><table class="evidence-table"><tbody>${items.map(x => entryRow(x, section, chapter)).join('')}</tbody></table></div>`;
    }
    return html + `<a class="edition-link" href="${url}" target="_blank" rel="noopener noreferrer">Received Sanskrit text ↗</a>`;
  }
  function row(section, first, last) {
    let html = `<div class="row"><span class="range">${first}–${last}</span><div class="cells">`;
    for (let chapter=first;chapter<=last;chapter++) {
      const evidence = byChapter.get(key(section.id,chapter)) || [];
      const marked = evidence.length>0;
      const gap = evidence.some(x => /(?:absent|no match|do not occur)/i.test(x.note || ''));
      const status = marked ? `${evidence.length} located ${evidence.length===1?'match':'matches'}` : 'no located entry';
      html += `<button class="tile${marked?' marked':''}${gap?' gap':''}" id="tile-${section.id.replace('.','-')}-${chapter}" type="button" data-section="${section.id}" data-chapter="${chapter}" aria-expanded="false" aria-label="${esc(section.name)}, chapter ${chapter}: ${status}">${chapter}</button>`;
    }
    return html + '</div><div class="detail" hidden></div></div>';
  }
  function render() {
    const total = data.sections.reduce((a,s)=>a+s.chapters,0);
    document.getElementById('stat').textContent = `${byChapter.size} / ${total} chapters with located entries`;
    const columns = window.matchMedia('(max-width:390px)').matches ? 10 : window.matchMedia('(max-width:760px)').matches ? 12 : 24;
    let html = '';
    for (const division of divisions) {
      const parts = division.sections.map(id => data.sections.find(s=>s.id===id));
      const n = parts.reduce((sum,s)=>sum+s.chapters,0);
      const matches = [...byChapter.keys()].filter(k=>parts.some(s=>k.startsWith(s.id+'.'))).length;
      html += `<section class="division" id="${division.id}"><div class="division-heading"><div><span class="small-label">${esc(parts.map(x=>x.id).join(' · '))}</span><h2>${division.name}</h2></div><span class="total">${matches} / ${n} chapters</span></div><p class="division-note">${division.note}</p>`;
      for (const section of parts) {
        html += `<div class="part"><div class="part-title"><h3>${parts.length===1?'Chapters':esc(section.name)}</h3><span>1–${section.chapters}</span></div>`;
        for (let first=1;first<=section.chapters;first+=columns) html += row(section,first,Math.min(section.chapters,first+columns-1));
        html += '</div>';
      }
      html += '</section>';
    }
    html += `<section class="unplaced" id="unplaced"><span class="small-label">Outside the grid</span><h2>Unplaced citations</h2><p>Some passages are attributed to the Bhaviṣya but cannot be assigned to a numbered chapter of this received text. They are listed here, rather than coloured into a guessed position.</p><ul class="unplaced-list">${data.unplaced.map(x=>`<li><div><strong><em>${esc(x.work)}</em></strong><span>${esc(x.locus)}</span></div><div>${esc(x.detail)}</div></li>`).join('')}</ul></section>`;
    document.getElementById('map').innerHTML = html;
  }
  function openTile(tile, scroll=false) {
    const row = tile.closest('.row');
    const panel = row.querySelector('.detail');
    const already = tile.getAttribute('aria-expanded')==='true';
    row.querySelectorAll('.tile').forEach(x=>x.setAttribute('aria-expanded','false'));
    if (already && !scroll) {panel.hidden=true;return;}
    tile.setAttribute('aria-expanded','true');
    panel.innerHTML = detail(tile.dataset.section, Number(tile.dataset.chapter));
    panel.hidden=false;
    if (scroll) tile.scrollIntoView({block:'center',behavior:'smooth'});
  }
  document.getElementById('map').addEventListener('click',event=>{
    const tile = event.target.closest('.tile');
    if (!tile) return;
    openTile(tile);
    history.replaceState(null,'',`#${tile.dataset.section}.${tile.dataset.chapter}`);
  });
  fetch('./bhavisya-evidence.json').then(response=>{
    if (!response.ok) throw Error('Unable to load chapter data');
    return response.json();
  }).then(json=>{
    data=json;
    byChapter=new Map(json.chapters.map(x=>[key(x.section,x.chapter),x.evidence]));
    render();
    const match = location.hash.match(/^#(I|II\.[123]|III\.[1234]|IV)\.(\d+)$/);
    if (match) {
      const tile=document.getElementById(`tile-${match[1].replace('.','-')}-${match[2]}`);
      if (tile) openTile(tile,true);
    }
  }).catch(()=>{document.getElementById('map').innerHTML='<p>Chapter data could not load. Reload this page.</p>';});
})();
