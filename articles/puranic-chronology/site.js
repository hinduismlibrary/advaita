(() => {
  'use strict';
  const scan = 'https://archive.org/details/in.ernet.dli.2015.110115';
  const grantha = 'https://grantha.jiva.org/index.php?c_no=29&show=category';
  const bhagavataEditions = {
    I:621, II:680, III:720, IV:766, V:767, VI:768, VII:769,
    VIII:770, IX:771, XI:784, XII:739
  };
  let table=[], analysis=[], chapters=[], sections=[], proof=new Map(), unlocated={};
  let names=[], selected='', selectedSection='', mode='reception';
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reference = x => x.chapter || x.c;
  const date = x => x.date || x.d;
  const subject = x => x.topic || x.t;
  const source = x => x.source || 'Table';
  const bounded = x => Number.isFinite(x.a) && Number.isFinite(x.b);
  const start = x => Number.isFinite(x.a) ? x.a : Infinity;
  const sort = (a,b) => start(a)-start(b) || (a.b??Infinity)-(b.b??Infinity) || names.indexOf(a.p)-names.indexOf(b.p) || (a.order||0)-(b.order||0) || (a.number||0)-(b.number||0);
  const key = (s,n) => [s.p,s.book,s.part,n].join('|');
  const sectionRows = s => chapters.filter(x => x.p===s.p && (x.book||'')===s.book && (x.part||'')===s.part);
  const matches = (x,s) => x.p===s.p && (x.book||'')===s.book && (x.part||'')===s.part;
  const link = (url,label) => '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';

  function commentaries(s) {
    if (s.p==='Bhāgavata Purāṇa') {
      const edition = bhagavataEditions[s.book]
        ? `https://grantha.jiva.org/index.php?e_no=${bhagavataEditions[s.book]}&show=entry`
        : grantha;
      return [{author:'Śrīdhara Svāmin',work:'Bhāvārthadīpikā',url:edition}];
    }
    if (s.p==='Viṣṇu Purāṇa') {
      const edition=`https://grantha.jiva.org/index.php?e_no=${['I','II','III'].includes(s.book)?715:821}&show=entry`;
      const items=[{author:'Śrīdhara Svāmin',work:'Ātmaprakāśa (Svaprakāśa)',url:edition}];
      if (['I','II','VI'].includes(s.book))
        items.push({author:'Viṣṇucitta',work:'Commentary on the Viṣṇu Purāṇa',url:edition});
      return items;
    }
    return [];
  }
  function companionEdition(s) {
    if (s.p!=='Bhāgavata Purāṇa') return '';
    const edition=bhagavataEditions[s.book]
      ? `https://grantha.jiva.org/index.php?e_no=${bhagavataEditions[s.book]}&show=entry`
      : grantha;
    return '<p class="companion-note">The edited canto also records Jīva Gosvāmin’s <em>Krama-saṃdarbha</em>, Viśvanātha Cakravartī’s <em>Sārārthadarśinī</em>, and Madhva’s <em>Bhāgavata-tātparya</em>. This is a canto-level edition record; the extent of their gloss on this particular chapter has not been checked. '+link(edition,'Edition record')+'</p>';
  }
  function covered(s,n) {
    const quoted=proof.has(key(s,n));
    const dated=sectionRows(s).some(x=>x.number===n);
    return mode==='date' ? dated : mode==='quote' ? quoted : quoted || commentaries(s).length>0;
  }
  function mapModes() {
    return '<div class="map-mode" role="group" aria-label="Evidence shown">'+[
      ['reception','Reception'],['quote','Quotations'],['date','Dates']
    ].map(([id,label])=>`<button type="button" data-mode="${id}" aria-pressed="${mode===id}">${label}</button>`).join('')+'</div>';
  }
  function legend() {
    const labels={
      reception:['Commented on or indexed quotation','No witness indexed here'],
      quote:['Indexed quotation or reported parallel','No quotation indexed here'],
      date:['Chapter-specific date entry','No individual date entry']
    }[mode];
    return `<p class="legend"><span class="swatch documented"></span>${labels[0]}<span class="swatch unindexed"></span>${labels[1]}<span class="legend-dot">·</span>${mode==='date'?'Quotation indexed':'Date entry'}</p>`;
  }
  function dating(s,n) {
    const found=sectionRows(s).filter(x=>x.number===n).sort(sort);
    if (!found.length) return '<p class="muted">No chapter-specific date is recorded in this chronology.</p>';
    return '<div class="dating-list">'+found.map(x=>
      `<p><strong>${esc(x.date)}</strong><br>${esc(x.topic)}${x.portion?' · '+esc(x.portion):''}<small>${esc(x.source)} p. ${esc(x.page)} · ${esc(x.printed)}</small></p>`
    ).join('')+'</div>';
  }
  function citations(s,n) {
    const row=proof.get(key(s,n));
    if (!row) return '<p class="muted">No quotation for this chapter is indexed in the cited selection. This is not evidence that it was never quoted.</p>';
    const traced=row.sources.filter(x=>x.kind==='traced');
    const reported=row.sources.filter(x=>x.kind==='reported'&&!traced.some(t=>t.author===x.author&&t.work===x.work));
    const unnamed=row.sources.filter(x=>x.kind==='discussion');
    let html='';
    if (traced.length || reported.length) {
      html+='<div class="witness-scroll"><table class="witness-table"><thead><tr><th>Later work</th><th>Location there</th><th>Purāṇa passage</th></tr></thead><tbody>';
      for (const x of traced) html+='<tr><td><em>'+esc(x.work||'Work not resolved from scan')+'</em>'+(x.author?'<span>'+esc(x.author)+'</span>':'')+'</td><td>'+esc(x.locus||'—')+'</td><td>'+esc(x.verse||'—')+'</td></tr>';
      for (const x of reported) html+='<tr class="reported"><td><em>'+esc(x.work)+'</em><span>'+esc(x.author)+'</span></td><td>Reported in discussion</td><td>ch. '+n+'</td></tr>';
      html+='</tbody></table></div>';
    }
    if (unnamed.length && !traced.length && !reported.length) {
      const statements=[...new Set(unnamed.map(x=>x.source).filter(x=>!x.includes('names the')&&!x.includes('lists the')&&!x.includes('names authors')))];
      if (statements.length) html+=statements.map(t=>'<p class="source-statement">'+esc(t.replace(/^Discussion, p\. \d+:\s*/,''))+'</p>').join('');
      else html+='<p class="muted">A quotation is reported for this chapter, but the later work and exact verse are not resolved in this index.</p>';
    }
    const page=(traced[0]||unnamed[0]||reported[0])?.source||'';
    html+='<p class="source-line">'+esc(page.split(':')[0])+'. '+link(scan,'Inspect source table')+'</p>';
    return html;
  }
  function chapterDetail(s,n) {
    const title=s.title==='Chapters'?'Chapter '+n:s.title+' · '+n;
    const commentary=commentaries(s);
    let html='<div class="detail-top"><strong>'+esc(title)+'</strong><span>'+esc(s.p)+'</span></div>';
    html+='<div class="detail-columns"><section><h5>Date</h5>'+dating(s,n)+'</section><section><h5>Textual reception</h5>';
    if (commentary.length) {
      html+='<div class="commentaries">'+commentary.map(c=>'<p><strong>'+esc(c.author)+'</strong> · <em>'+esc(c.work)+'</em><br><span>Commentary on this received chapter · '+link(c.url,'Canto / aṃśa edition')+'</span></p>').join('')+'</div>';
    }
    html+=companionEdition(s);
    html+=citations(s,n)+'</section></div>';
    return html;
  }
  function chapterMap(visible) {
    const total=visible.reduce((a,s)=>a+s.last,0);
    const count=visible.reduce((a,s)=>a+Array.from({length:s.last},(_,i)=>covered(s,i+1)?1:0).reduce((u,v)=>u+v,0),0);
    const columns=window.matchMedia('(max-width:720px)').matches?10:20;
    let html='<section class="map" id="chapter-maps"><div class="section-heading"><div><span class="section-number">01 / Chapter index</span><h3>Chapter atlas</h3></div><span class="section-count">'+count+' / '+total+' marked</span></div>'+mapModes()+legend();
    if (selected==='Bhāgavata Purāṇa') html+='<p class="editorial-note">The <em>Bhāvārthadīpikā</em> covers the received text. The separate quotation table is selective: <em>Haribhaktivilāsa</em> and other later works quote further Bhāgavata verses beyond those enumerated here.</p>';
    if (selected==='Viṣṇu Purāṇa') html+='<p class="editorial-note">All six aṃśas and 126 chapters appear below. Śrīdhara’s <em>Ātmaprakāśa</em> covers the received text; the quotation index records particular passages cited by other writers.</p>';
    for (const s of visible) {
      const sid=sections.indexOf(s);
      html+='<div class="map-section"><div class="part-heading"><h4>'+esc(s.title)+'</h4><span>'+(s.last?'1–'+s.last:'No numbered extent')+'</span></div>';
      if (!s.last) html+='<p class="muted">This group has a collective date but no safely numbered chapter span.</p>';
      for (let first=1;first<=s.last;first+=columns) {
        const last=Math.min(s.last,first+columns-1);
        html+='<div class="map-row"><span class="map-range">'+first+'–'+last+'</span><div class="map-cells" style="--columns:'+columns+'">';
        for (let n=first;n<=last;n++) {
          const marked=covered(s,n),dot=mode==='date'?proof.has(key(s,n)):sectionRows(s).some(x=>x.number===n);
          html+='<button class="map-cell '+(marked?'documented':'unindexed')+'" type="button" data-sid="'+sid+'" data-number="'+n+'" aria-pressed="false" aria-label="'+esc(s.title)+' chapter '+n+'; '+(marked?'marked':'not indexed')+'">'+n+(dot?'<i aria-hidden="true"></i>':'')+'</button>';
        }
        html+='</div><div class="map-detail" hidden></div></div>';
      }
      html+='</div>';
    }
    if (unlocated[selected]) html+='<p class="map-note">Additional quotations are ascribed to this Purāṇa without a secure match to a surviving chapter; they cannot be placed in a tile. Source appendix II, p. '+esc(unlocated[selected])+'.</p>';
    html+='<p class="map-note">The quotation index is selective. An unmarked chapter may still be quoted elsewhere. Where a full chapter count is unavailable, the grid stops at the last numbered chapter established by the source material.</p></section>';
    return html;
  }
  function atlas() {
    let html='<section class="atlas" id="chapter-maps"><div class="section-heading"><div><span class="section-number">02 / Chapter index</span><h2>Chapter atlas</h2></div><span class="section-count">19 Purāṇas</span></div><p class="atlas-intro">Open a Purāṇa to see its sections, every numbered tile within the mapped extent, and the evidence for each chapter.</p>'+mapModes()+legend()+'<div class="atlas-list">';
    for (const p of names) {
      const parts=sections.filter(s=>s.p===p&&s.last),total=parts.reduce((v,s)=>v+s.last,0);
      const marked=parts.reduce((v,s)=>v+Array.from({length:s.last},(_,i)=>covered(s,i+1)?1:0).reduce((a,b)=>a+b,0),0);
      let strip='';
      for (const s of parts) strip+='<span class="atlas-block" style="flex:'+s.last+'" title="'+esc(s.title)+' · 1–'+s.last+'">'+Array.from({length:s.last},(_,i)=>'<i class="atlas-tick '+(covered(s,i+1)?'documented':'unindexed')+'"></i>').join('')+'</span>';
      html+='<a class="atlas-row" href="#p='+encodeURIComponent(p)+'" data-book="'+esc(p)+'"><span class="atlas-name">'+esc(p)+'</span><span class="atlas-strip" aria-hidden="true">'+strip+'</span><span class="atlas-count">'+marked+' / '+total+'</span></a>';
    }
    return html+'</div></section>';
  }
  function sourceDetail(x) {
    const kind=source(x)==='Analysis'?'Discussion':'Chronological table';
    let html='<p><b>Printed reference</b> · '+esc(x.printed||reference(x))+'; '+esc(kind)+' p. '+esc(x.page)+'.</p>';
    if (x.portion) html+='<p><b>Passage</b> · '+esc(x.portion)+'</p>';
    if (x.openEnd) html+='<p>The printed range continues to the end; no final chapter is specified.</p>';
    if (x.endpointEvidence) html+='<p>'+esc(x.endpointEvidence)+'</p>';
    if (x.note||x.n) html+='<p>'+esc(x.note||x.n)+'</p>';
    if (x.variant||x.v) html+='<p>'+esc(x.variant||x.v)+'</p>';
    return html+'<p>'+link(scan,'Source scan')+'</p>';
  }
  function entry(x,single) {
    const name=single ? (x.part?'<small>'+esc(x.part)+'</small>':'') : '<a href="#p='+encodeURIComponent(x.p)+'" data-book="'+esc(x.p)+'">'+esc(x.p)+'</a>';
    return '<details class="entry"><summary class="entry-grid'+(single?' single':'')+'"><span class="date">'+esc(date(x))+'</span>'+(single?'':'<span class="book">'+name+'</span>')+'<span class="chapter">'+esc(reference(x))+(x.openEnd?' → end':'')+(single?name:'')+'</span><span class="subject">'+esc(subject(x))+'</span><span class="page-ref">'+esc(source(x)==='Analysis'?'D':'T')+' '+esc(x.page)+'</span></summary><div class="more">'+sourceDetail(x)+'</div></details>';
  }
  function timeline(rows,single) {
    const fixed=rows.filter(bounded).sort(sort),loose=rows.filter(x=>!bounded(x)).sort(sort),groups=new Map();
    for (const x of fixed) {const y=Math.floor(x.a/100)*100;if (!groups.has(y)) groups.set(y,[]);groups.get(y).push(x);}
    let html='<div class="column-head'+(single?' single':'')+'"><span>Period</span>'+(single?'':'<span>Purāṇa</span>')+'<span>Chapter</span><span>Subject</span><span>Source</span></div>';
    for (const [y,items] of groups) html+='<section class="epoch"><div class="epoch-label">'+y+'–'+(y+99)+'<small>CE</small></div><div class="epoch-list">'+items.map(x=>entry(x,single)).join('')+'</div></section>';
    if (!fixed.length) html+='<p class="muted empty">No fixed interval recorded for this selection.</p>';
    if (loose.length) html+='<section class="unplaced"><h3>Relative dates</h3><p>Before, after, and other intervals without two fixed endpoints.</p><div class="unplaced-list">'+loose.map(x=>entry(x,single)).join('')+'</div></section>';
    return html;
  }
  function render() {
    const own=!!selected,all=table.concat(analysis);
    const parts=own?sections.filter(s=>s.p===selected):[];
    const part=selectedSection?parts.find(s=>String(sections.indexOf(s))===selectedSection):null;
    const visible=part?[part]:parts;
    const rows=own?chapters.filter(x=>x.p===selected&&(!part||matches(x,part))).concat(table.filter(x=>x.scope&&x.p===selected&&(!part||((x.part||'')===part.part&&!part.book)))):all;
    const partWrap=document.getElementById('part-wrap');
    partWrap.hidden=parts.length<2;
    if (!partWrap.hidden) {
      document.getElementById('part').innerHTML='<option value="">All sections</option>'+parts.map(s=>'<option value="'+sections.indexOf(s)+'">'+esc(s.title)+'</option>').join('');
      document.getElementById('part').value=selectedSection;
    }
    document.getElementById('book').value=selected;
    document.getElementById('count').textContent=own?parts.reduce((v,s)=>v+s.last,0)+' mapped chapter tiles':names.length+' Purāṇas';
    const body=document.getElementById('main');
    body.innerHTML=own?'<div class="book-heading"><a href="#" data-book="">← All Purāṇas</a><h2>'+esc(selected)+'</h2><p>Choose a chapter to inspect its date and named textual witnesses.</p></div>'+chapterMap(visible)+'<section id="chronology" class="timeline-section"><div class="section-heading"><div><span class="section-number">02 / Dating</span><h3>Chronology</h3></div></div>'+timeline(rows,true)+'</section>'
      :'<div class="jump"><a href="#chronology">Chronology ↓</a><a href="#chapter-maps">Chapter atlas ↓</a></div><section id="chronology" class="timeline-section"><div class="section-heading"><div><span class="section-number">01 / Dating</span><h2>Chronology</h2></div><span class="section-count">'+all.length+' entries</span></div><p class="section-intro">Passages arranged by the opening century of their estimated interval. Open a row for its printed reference.</p>'+timeline(rows,false)+'</section>'+atlas();
  }
  function choose(p,hash) {
    selected=names.includes(p)?p:'';selectedSection='';render();
    if (hash) history.pushState(null,'',selected?'#p='+encodeURIComponent(selected):location.pathname+location.search);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.getElementById('book').addEventListener('change',e=>choose(e.target.value,true));
  document.getElementById('part').addEventListener('change',e=>{selectedSection=e.target.value;render();});
  document.getElementById('main').addEventListener('click',e=>{
    const tab=e.target.closest('[data-mode]');
    if (tab) {mode=tab.dataset.mode;render();return;}
    const tile=e.target.closest('.map-cell');
    if (tile) {
      const row=tile.closest('.map-row'),panel=row.querySelector('.map-detail'),was=tile.getAttribute('aria-pressed')==='true';
      row.querySelectorAll('.map-cell').forEach(b=>b.setAttribute('aria-pressed','false'));
      panel.hidden=was;
      if (!was) {tile.setAttribute('aria-pressed','true');panel.innerHTML=chapterDetail(sections[+tile.dataset.sid],+tile.dataset.number);}
      return;
    }
    const book=e.target.closest('[data-book]');
    if (book) {e.preventDefault();e.stopPropagation();choose(book.dataset.book,true);}
  });
  window.addEventListener('popstate',()=>{
    try {const p=location.hash.startsWith('#p=')?decodeURIComponent(location.hash.slice(3)):'';selected=names.includes(p)?p:'';} catch {selected='';}
    selectedSection='';render();
  });
  Promise.all(['chronology.json','analysis.json','chapters.json','map-sections.json','quote-evidence.json','unlocated.json'].map(file=>fetch('./'+file).then(r=>{if(!r.ok)throw Error(file);return r.json();})))
    .then(data=>{
      [table,analysis,chapters,sections,,unlocated]=data;
      for (const x of data[4]) proof.set([x.p,x.book,x.part,x.chapter].join('|'),x);
      names=[...new Set(table.map(x=>x.p))];
      document.getElementById('book').innerHTML='<option value="">All Purāṇas</option>'+names.map(p=>'<option value="'+esc(p)+'">'+esc(p)+'</option>').join('');
      try {const p=location.hash.startsWith('#p=')?decodeURIComponent(location.hash.slice(3)):'';selected=names.includes(p)?p:'';} catch {}
      render();
    }).catch(()=>document.getElementById('main').innerHTML='<p class="muted empty">The chapter data could not load. Reload this page.</p>');
})();
