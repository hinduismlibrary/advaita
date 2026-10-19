(() => {
  // Load the final Vishnu-depth normalizer before users can open a Mahapurana.
  // It runs after all legacy Purana research/audit files and rewrites only the
  // presentation data: exact Vishnu section order, no discarded research.
  if(!window.__MAHAPURANA_BENCHMARK_REQUESTED__){
    window.__MAHAPURANA_BENCHMARK_REQUESTED__=true;
    const s=document.createElement('script');
    s.src='/advaita/assets/js/puranas/current/mahapuranas-benchmark.js?build=ad7e2c3e';
    s.async=false;
    document.head.appendChild(s);
  }

  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const NAMES = [
    'Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa',
    'Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa',
    'Vāyu Purāṇa','Devī Bhāgavata Purāṇa','Mahābhāgavata Purāṇa'
  ];
  const SET = new Set(NAMES);
  const SHORT_DATES = {
    'Brahma Purāṇa':'main received compilation c. 9th–12th centuries CE','Padma Purāṇa':'c. 4th–15th centuries CE','Viṣṇu Purāṇa':'c. 300–500 CE','Śiva Purāṇa':'c. 10th–14th centuries CE',
    'Liṅga Purāṇa':'c. 5th–10th centuries CE','Garuḍa Purāṇa':'c. 8th–11th centuries CE','Nāradīya Purāṇa':'c. 9th–12th centuries CE','Bhāgavata Purāṇa':'c. 8th–10th centuries CE',
    'Agni Purāṇa':'c. 7th–11th centuries CE','Skanda Purāṇa':'core c. 6th–8th centuries CE','Bhaviṣya Purāṇa':'layers from early medieval to 19th c.','Brahmavaivarta Purāṇa':'received form c. 15th–16th centuries CE',
    'Mārkaṇḍeya Purāṇa':'c. 3rd–6th centuries CE','Vāmana Purāṇa':'c. 7th–11th centuries CE','Varāha Purāṇa':'c. 9th–12th centuries CE','Matsya Purāṇa':'c. 3rd–7th centuries CE',
    'Kūrma Purāṇa':'c. 7th–11th centuries CE','Brahmāṇḍa Purāṇa':'early core; major medieval additions','Vāyu Purāṇa':'early first millennium CE','Devī Bhāgavata Purāṇa':'c. 9th–14th centuries CE','Mahābhāgavata Purāṇa':'late medieval, probably eastern India'
  };
  const STRUCTURE = {
    'Brahma Purāṇa':'245 chapters in the common recension','Padma Purāṇa':'5-book Bengal; 6–7-book printed recensions','Viṣṇu Purāṇa':'6 books · 126 chapters','Śiva Purāṇa':'7 Samhitas · 457 chapters in common recension','Liṅga Purāṇa':'2 parts · 163 chapters','Garuḍa Purāṇa':'2 principal parts; recension varies',
    'Nāradīya Purāṇa':'2 parts · 207 chapters','Bhāgavata Purāṇa':'12 books · 335 chapters','Agni Purāṇa':'382–383 chapters','Skanda Purāṇa':'old core + vast later recensions','Bhaviṣya Purāṇa':'4 principal parts in common recension',
    'Brahmavaivarta Purāṇa':'4 books · about 274 chapters','Mārkaṇḍeya Purāṇa':'137 chapters','Vāmana Purāṇa':'about 95 chapters','Varāha Purāṇa':'about 217–218 chapters','Matsya Purāṇa':'291 chapters','Kūrma Purāṇa':'2 principal parts · about 95 chapters',
    'Brahmāṇḍa Purāṇa':'large multi-part recension','Vāyu Purāṇa':'about 112 chapters','Devī Bhāgavata Purāṇa':'12 books · 318 chapters','Mahābhāgavata Purāṇa':'recensional structure varies'
  };
  const ALLOWED = new Set(['date of composition','structure','contents','theology','critical edition','influences and reception','rites dharma and social history','further reading','references']);
  const chars={'ā':'a','ī':'i','ū':'u','ṛ':'ri','ṝ':'ri','ḷ':'l','ḹ':'l','ṅ':'n','ñ':'n','ṇ':'n','ṭ':'t','ḍ':'d','ś':'sh','ṣ':'sh','ḥ':'h','ṃ':'m','ṁ':'m','Ā':'A','Ī':'I','Ū':'U','Ṛ':'Ri','Ṝ':'Ri','Ḷ':'L','Ṅ':'N','Ñ':'N','Ṇ':'N','Ṭ':'T','Ḍ':'D','Ś':'Sh','Ṣ':'Sh','Ḥ':'H','Ṃ':'M'};
  const replacements=[[/Purāṇa/g,'Purana'],[/purāṇa/g,'purana'],[/Mahāpurāṇa/g,'Mahapurana'],[/mahāpurāṇa/g,'mahapurana'],[/aṃśas/g,'books'],[/aṃśa/g,'book'],[/Aṃśas/g,'Books'],[/Aṃśa/g,'Book'],[/adhyāyas/g,'chapters'],[/adhyāya/g,'chapter'],[/ślokas/g,'verses'],[/śloka/g,'verse']];
  function english(s){let out=String(s||'');replacements.forEach(([r,v])=>out=out.replace(r,v));out=out.replace(/[āīūṛṝḷḹṅñṇṭḍśṣḥṃṁĀĪŪṚṜḶṄÑṆṬḌŚṢḤṂ]/g,c=>chars[c]||c);return out.normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC');}
  const norm=s=>english(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const slug=s=>norm(s).replace(/\s+/g,'-')||'section';
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const article=()=>document.querySelector('.purana-full-article, .universal-wiki-article');
  const currentName=button=>button?.dataset?.name || button?.querySelector?.('span')?.textContent?.trim() || '';
  const data=name=>Object.assign({},D[name]||{},D[`Purāṇa:${name}`]||{});

  function renameCards(){document.querySelectorAll('.purana-name[data-name]').forEach(el=>{const name=el.dataset.name;if(!SET.has(name))return;const span=el.querySelector('span');if(span)span.textContent=english(name);});document.querySelectorAll('.shastra-tab').forEach(el=>{if(el.textContent.trim()==='Mahāpurāṇa')el.textContent='Mahapuranas';});document.querySelectorAll('.shastra-title').forEach(el=>{if(el.textContent.trim()==='Purāṇas')el.textContent='Puranas';});}
  function deaccent(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const p=node.parentElement;if(!p||p.closest('[lang^="sa"],.universal-devanagari,.mahapurana-devanagari,.vishnu-devanagari,script,style'))return NodeFilter.FILTER_REJECT;return /[ĀĪŪṚṜḶṄÑṆṬḌŚṢḤṂāīūṛṝḷḹṅñṇṭḍśṣḥṃṁ]|Purāṇa|aṃś|ślok|adhyāy/.test(node.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>n.nodeValue=english(n.nodeValue));}
  function simplifyInfobox(root,name){[...root.querySelectorAll('.kena-info-row')].forEach(row=>{const b=row.querySelector('b'),v=row.querySelector('span');if(!b||!v)return;const t=norm(b.textContent);if(t.includes('traditional attribution')){b.textContent='Traditional attribution';v.textContent=english(v.textContent).replace(/\s*\(traditional attribution\)/i,'');}else if(t.includes('date')||t.includes('textual formation')){b.textContent='Date';v.textContent=SHORT_DATES[name]||english(v.textContent).split(/[.;]/)[0];}else if(t.includes('textual status')||t==='status'){b.textContent='Status';v.textContent='Mahapurana';}else if(t.includes('major divisions')||t==='structure'){b.textContent='Structure';v.textContent=STRUCTURE[name]||english(v.textContent).split(';')[0];}else if(t.includes('verse count')){v.textContent=english(v.textContent).replace(/\s+/g,' ');}else if(t==='extent'||t.includes('recension'))row.remove();else{b.textContent=english(b.textContent);v.textContent=english(v.textContent);}});}
  function addTitle(root,name,e){root.querySelector(':scope > .mahapurana-main-title')?.remove();root.querySelector(':scope > .mahapurana-devanagari')?.remove();root.querySelector(':scope > .vishnu-devanagari')?.remove();const title=document.createElement('div');title.className='mahapurana-main-title';title.textContent=english(name);const dev=document.createElement('div');dev.className='mahapurana-devanagari';dev.lang='sa-Deva';dev.textContent=e.sanskritTitle||'';root.prepend(dev);root.prepend(title);}
  function pruneGeneratedSections(root){[...root.querySelectorAll(':scope > section')].forEach(sec=>{const h=sec.querySelector(':scope > h2');if(!h)return;const key=norm(h.textContent);if(!(ALLOWED.has(key)||key.includes('references')))sec.remove();});}
  function rebuildToc(root){const toc=root.querySelector('.kena-toc,.ch-toc,.universal-toc,.wiki-toc');if(!toc)return;let ol=toc.querySelector(':scope > ol');if(!ol){ol=document.createElement('ol');toc.append(ol);}ol.innerHTML='';const used=new Set();[...root.querySelectorAll(':scope > section')].forEach(sec=>{const h=sec.querySelector(':scope > h2');if(!h)return;if(!sec.id){let id=`maha-${slug(h.textContent)}`,n=2;while(used.has(id)||document.getElementById(id))id=`maha-${slug(h.textContent)}-${n++}`;sec.id=id;}used.add(sec.id);const li=document.createElement('li');li.innerHTML=`<a href="#${esc(sec.id)}">${esc(english(h.textContent.trim()))}</a>`;ol.append(li);});}
  function setOpen(sec,open){const body=sec.querySelector(':scope > .mahapurana-collapse-body'),h=sec.querySelector(':scope > h2');if(!body||!h)return;sec.classList.toggle('is-open',open);body.hidden=!open;h.setAttribute('aria-expanded',open?'true':'false');}
  function makeCollapsible(sec){
    if(sec.classList.contains('mahapurana-collapse-section'))return;
    let h=sec.querySelector(':scope > h2');if(!h)return;
    // If an old cached Vishnu-only script already attached listeners, unwrap its
    // body and replace the heading node. Cloning removes those stale listeners,
    // preventing the open-then-immediately-close double toggle.
    const oldBody=sec.querySelector(':scope > .vishnu-collapse-body');
    if(oldBody){oldBody.hidden=false;while(oldBody.firstChild)sec.append(oldBody.firstChild);oldBody.remove();sec.classList.remove('vishnu-collapse-section','is-open');const clean=h.cloneNode(true);h.replaceWith(clean);h=clean;}
    const body=document.createElement('div');body.className='mahapurana-collapse-body';[...sec.childNodes].forEach(n=>{if(n!==h)body.append(n)});sec.append(body);sec.classList.add('mahapurana-collapse-section');h.setAttribute('role','button');h.setAttribute('tabindex','0');h.setAttribute('aria-expanded','false');
    const toggle=()=>setOpen(sec,!sec.classList.contains('is-open'));h.addEventListener('click',toggle);h.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();toggle();}});setOpen(sec,false);
  }
  function collapse(root){
    [...root.querySelectorAll(':scope > section')].filter(s=>s.querySelector(':scope > h2')).forEach(makeCollapsible);
    // The Contents list is rebuilt by several article-normalisation passes. Bind
    // once on the stable article root so replacement links keep disclosure logic.
    if(root.dataset.mahaTocBound==='1')return;
    root.dataset.mahaTocBound='1';
    root.addEventListener('click',ev=>{
      const link=ev.target instanceof Element?ev.target.closest('.kena-toc a[href^="#"],.ch-toc a[href^="#"],.universal-toc a[href^="#"],.wiki-toc a[href^="#"]'):null;
      if(!link||!root.contains(link))return;
      const id=decodeURIComponent((link.getAttribute('href')||'').slice(1));
      const target=document.getElementById(id);
      if(target&&root.contains(target)&&target.classList.contains('mahapurana-collapse-section'))setOpen(target,true);
    });
  }
  function apply(button){const name=currentName(button);if(!SET.has(name))return;const root=article();if(!root)return;const e=data(name);const reader=root.closest('.purana-full-reader,.universal-wiki-reader,.kena-article-reader');reader?.classList.add('mahapurana-wiki-reader');root.classList.add('mahapurana-wiki-article');const head=reader?.querySelector('.kena-article-head h1');if(head)head.textContent=english(name);const eye=reader?.querySelector('.kena-article-head .eyebrow');if(eye)eye.textContent='Mahapurana · encyclopedia article';simplifyInfobox(root,name);pruneGeneratedSections(root);deaccent(root);addTitle(root,name,e);rebuildToc(root);collapse(root);}

  renameCards();setTimeout(renameCards,200);setTimeout(renameCards,900);
  const previousOpen=window.openScriptureEncyclopedia;if(typeof previousOpen!=='function')return;
  window.openScriptureEncyclopedia=function(button){const result=previousOpen(button);const name=currentName(button);if(SET.has(name)){queueMicrotask(()=>apply(button));setTimeout(()=>apply(button),220);setTimeout(()=>apply(button),950);}return result;};
})();
