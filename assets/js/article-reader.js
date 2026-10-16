(()=>{
const path=location.pathname,dirs=[/^\/advaita\/articles\/?$/, /\/articles\/scripture\/?$/, /\/articles\/(?:scripture-index-version-3|an-index-of-hindu-scripture)\/?$/];
if(!/^\/advaita\/articles\//.test(path)||dirs.some(r=>r.test(path))||/\/articles\/varna-vicara\/?$/.test(path))return;
const body=document.body,article=document.querySelector('.article-body');if(!article)return;
const scripture=/\/articles\/(?:bhagavad-gita-chapter-\d+|vishnu-purana-book-\d+-chapter-\d+|bhavishya-purana-pratisargaparvan-part-\d+-chapter-\d+|bhavishya-purana-brahmaparvan-chapter-\d+|srimad-bhagavatam-(?:second|tenth)-canto-sridhara-svami-rebuild|srimad-bhagavatam-canto-\d{2}-sridhara-svami|mimamsa-sutras-sabara-bhasya-chapter-1)\/?$/.test(path);
body.classList.add('vicara-reader-page');
const text=n=>(n?.textContent||'').replace(/\s+/g,' ').trim(),isContents=n=>/^contents$/i.test(text(n));
const ppArticle=path.match(/\/articles\/bhavishya-purana-pratisargaparvan-part-(\d+)-chapter-(\d+)\/?$/);
const normalizePratisargaLabels=()=>{
 if(!ppArticle)return;
 const part=ppArticle[1],chapter=ppArticle[2];
 let fallback=0;
 article.querySelectorAll('h3,a').forEach(node=>{
  const raw=text(node);
  if(!/^Text block\b/i.test(raw)&&!/^\d+\.\d+\.\d+$/.test(raw))return;
  const ref=(node.id||node.getAttribute('href')||'').match(/#?pp-(\d+)-(\d+)-(\d+)/);
  const verse=ref?Number(ref[3]):++fallback;
  if(!verse)return;
  node.textContent='PP '+part+'.'+chapter+'.'+verse;
 });
};
normalizePratisargaLabels();
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';
const cloneToc=list=>{const c=list.cloneNode(true);c.removeAttribute('style');c.querySelectorAll('*').forEach(n=>{n.removeAttribute('style');n.removeAttribute('class')});c.classList.add('vicara-toc');return c};
const manualContents=()=>{
 const g=article.querySelector('.gita-contents ol,.gita-contents ul');if(g)return{list:g,container:g.closest('.gita-contents')};
 for(const h of [...article.querySelectorAll('h2,h3')].filter(isContents)){let n=h.nextElementSibling,between=[];while(n&&!/^H[23]$/.test(n.tagName)){between.push(n);if(n.matches('ol,ul'))return{list:n,heading:h,between};n=n.nextElementSibling}}
 return null;
};
const hideManual=m=>{if(!m)return;if(m.container)m.container.classList.add('vicara-original-contents');else{m.heading?.classList.add('vicara-original-contents');(m.between||[]).forEach(n=>n.classList.add('vicara-original-contents'))}};
const addIds=()=>{const used=new Set([...article.querySelectorAll('[id]')].map(n=>n.id));let i=0;article.querySelectorAll('h2,h3').forEach(h=>{if(isContents(h)||h.closest('.vicara-side-toc,.vicara-mobile-toc'))return;if(!h.id){let base=slug(text(h))||`section-${++i}`,id=base,n=2;while(used.has(id)||document.getElementById(id))id=`${base}-${n++}`;h.id=id;used.add(id)}})};
const generatedToc=()=>{addIds();const hs=[...article.querySelectorAll('h2,h3')].filter(h=>!isContents(h)&&!h.closest('.vicara-side-toc,.vicara-mobile-toc')&&h.id);if(!hs.length)return null;const ol=document.createElement('ol');ol.className='vicara-toc';let top=null;hs.forEach(h=>{const li=document.createElement('li'),a=document.createElement('a');a.href=`#${h.id}`;a.textContent=text(h).replace(/^\d+(?:\.\d+)*\.?\s*/,'');li.append(a);if(h.tagName==='H2'){ol.append(li);top=li}else if(top){let sub=top.querySelector(':scope>ol');if(!sub){sub=document.createElement('ol');top.append(sub)}sub.append(li)}else ol.append(li)});return ol};
const figure=(file,alt,cls='')=>{const f=document.createElement('figure');f.className=`source-document-figure ${cls}`.trim();const img=document.createElement('img');img.src=`/advaita/assets/images/source-documents/${file}`;img.alt=alt;img.loading='lazy';img.decoding='async';f.append(img);return f};
const sourceArt=()=>{if(scripture)return{};let cover=null,closing=null;
 if(/a-shashtric-lens-of-varna-part-one\/?$/.test(path)){cover=figure('varna-cover-art.webp','Four-panel illustration reproduced from the original Varṇa source document.','source-document-figure--varna');closing=figure('varna-om.webp','Oṃ symbol reproduced from the closing page of the original Varṇa source document.','source-document-figure--closing')}
 if(/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(path)){cover=figure('vishnu-cover-art.webp','Line illustration reproduced from the cover of the original Viṣṇu supremacy paper.','source-document-figure--vishnu');closing=figure('vishnu-closing-emblem.webp','Closing emblem reproduced from the original Viṣṇu supremacy paper.','source-document-figure--closing source-document-figure--vishnu-emblem');const table=article.querySelector('.empyrean-final-236 table,.empyrean-final-article table');if(table)table.insertAdjacentElement('afterend',figure('vishnu-veda-diagram.webp','Diagram of the Vedic divisions reproduced from the original source paper.','source-document-figure--diagram'))}
 if(/meat-eating-in-hinduism-through-the-lens-of-shastra\/?$/.test(path))cover=figure('meat-om.webp','Oṃ symbol reproduced from the cover of the original meat-eating source document.','source-document-figure--meat');
 return{cover,closing};
};
const markSanskrit=scope=>scope.querySelectorAll('details>summary').forEach(s=>{if(!/show sanskrit|hide sanskrit/i.test(text(s)))return;s.classList.add('vicara-sanskrit-summary');const d=s.parentElement,sync=()=>s.textContent=d.open?'Hide Sanskrit':'Show Sanskrit';if(!s.dataset.vicaraToggle){d.addEventListener('toggle',sync);s.dataset.vicaraToggle='1'}sync()});
let observer=null;
const activeScroll=aside=>{observer?.disconnect();const links=[...aside.querySelectorAll('a[href^="#"]')],map=new Map(links.map(a=>[a.hash.slice(1),a]));if(!('IntersectionObserver'in window))return;observer=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(v){links.forEach(a=>a.classList.remove('is-active'));map.get(v.target.id)?.classList.add('is-active')}},{rootMargin:'-120px 0px -420px 0px',threshold:[0,1]});[...map.keys()].map(id=>document.getElementById(id)).filter(Boolean).forEach(n=>observer.observe(n))};
const shell=()=>{const manual=manualContents(),toc=manual?.list?cloneToc(manual.list):generatedToc();if(!toc?.querySelector('a[href^="#"]'))return null;hideManual(manual);let side=article.querySelector(':scope>.vicara-side-toc'),mobile=article.querySelector(':scope>.vicara-mobile-toc');if(!side){side=document.createElement('aside');side.className='vicara-side-toc';side.setAttribute('aria-label','Table of contents');article.prepend(side)}side.replaceChildren();const title=document.createElement('h2');title.className='vicara-side-title';title.textContent='Contents';side.append(title,toc);if(!mobile){mobile=document.createElement('details');mobile.className='vicara-mobile-toc';const s=document.createElement('summary');s.textContent='Contents';mobile.append(s);side.insertAdjacentElement('afterend',mobile)}mobile.querySelectorAll(':scope>.vicara-toc').forEach(n=>n.remove());mobile.append(cloneToc(toc));markSanskrit(article);return{side,mobile,manual}};
const paginate=({side,mobile,manual},art)=>{
 body.classList.add('paged-article-page');
 const rootList=side.querySelector('.vicara-toc'),links=[...rootList.querySelectorAll('a[href^="#"]')],allIds=[...new Set(links.map(a=>a.hash.slice(1)))];
 const aliases=new Map(),parentLabel=new Map();rootList.querySelectorAll(':scope>li').forEach(li=>{const a=li.querySelector(':scope>a'),kids=[...li.querySelectorAll(':scope>ol>li>a')];if(a&&kids.length){aliases.set(a.hash.slice(1),kids[0].hash.slice(1));kids.forEach(k=>parentLabel.set(k.hash.slice(1),text(a)))}});
 const leafIds=[...new Set(links.filter(a=>!a.closest('li')?.querySelector(':scope>ol')).map(a=>a.hash.slice(1)))];
 const targets=leafIds.map(id=>document.getElementById(id)).filter(Boolean);if(!targets.length){activeScroll(side);return}
 const allTargets=allIds.map(id=>document.getElementById(id)).filter(Boolean),pages=[];
 allTargets.filter(t=>aliases.has(t.id)).forEach(t=>{t.classList.add('vicara-parent-heading');const next=t.nextElementSibling;if(next?.matches('hr,.empyrean-divider'))next.classList.add('vicara-parent-heading')});
 targets.forEach(start=>{const parent=start.parentNode,boundary=allTargets.find(t=>t.parentNode===parent&&(start.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING));const sec=document.createElement('section');sec.className='vicara-doc-page';sec.dataset.pageId=start.id;parent.insertBefore(sec,start);let n=start;while(n&&n!==boundary){const next=n.nextSibling;sec.append(n);n=next}pages.push(sec)});
 if(!pages.length)return;
 const firstTarget=targets[0],firstBoundary=allTargets.find(t=>t.parentNode===firstTarget.parentNode);if(manual?.list&&manual.list.parentNode===firstTarget.parentNode&&firstBoundary){let n=manual.list.nextSibling;const stash=[];while(n&&n!==firstBoundary){const next=n.nextSibling;if(!n.classList?.contains('vicara-original-contents'))stash.push(n);n=next}stash.reverse().forEach(x=>pages[0].insertBefore(x,pages[0].firstChild))}
 const label=id=>text(side.querySelector(`a[href="#${CSS.escape(id)}"]`))||id,articleTitle=text(article.querySelector('h1'))||document.title.split(' — ')[0];
 pages.forEach((page,i)=>{const id=page.dataset.pageId,ctx=document.createElement('div');ctx.className='page-context';ctx.innerHTML=`<strong>${parentLabel.get(id)||articleTitle}</strong><span>Section ${i+1} of ${pages.length}</span>`;page.prepend(ctx);const nav=document.createElement('nav');nav.className='page-nav';nav.setAttribute('aria-label','Article sections');const prev=pages[i-1],next=pages[i+1],link=(p,cls,lab)=>p?`<a class="${cls}" data-page="${p.dataset.pageId}" href="#${p.dataset.pageId}"><small>${lab}</small>${label(p.dataset.pageId)}</a>`:`<a class="${cls} disabled"><small>${lab}</small></a>`;nav.innerHTML=link(prev,'prev','Previous')+link(next,'next','Next');page.append(nav)});
 if(art.cover)pages[0].insertBefore(art.cover,pages[0].querySelector('.page-context').nextSibling);if(art.closing)pages.at(-1).insertBefore(art.closing,pages.at(-1).querySelector('.page-nav'));
 const allToc=[...article.querySelectorAll('.vicara-side-toc a[href^="#"],.vicara-mobile-toc a[href^="#"]')];
 const urlFor=id=>{const u=new URL(location.href);u.hash='';id===pages[0].dataset.pageId?u.searchParams.delete('section'):u.searchParams.set('section',id);return u.pathname+u.search};
 const activate=raw=>{let id=aliases.get(raw)||raw;if(!pages.some(p=>p.dataset.pageId===id))id=pages[0].dataset.pageId;pages.forEach(p=>p.hidden=p.dataset.pageId!==id);allToc.forEach(a=>{const rid=aliases.get(a.hash.slice(1))||a.hash.slice(1),on=rid===id;a.classList.toggle('is-active',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});document.title=`${label(id)} — ${articleTitle} — Viveka Dṛṣṭi`;mobile.open=false;return id};
 article.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const raw=a.hash.slice(1);if(!allIds.includes(raw)&&!pages.some(p=>p.dataset.pageId===raw))return;e.preventDefault();const id=activate(raw);history.pushState(null,'',urlFor(id));article.scrollIntoView({behavior:'smooth',block:'start'})});
 addEventListener('popstate',()=>activate(new URLSearchParams(location.search).get('section')||location.hash.slice(1)||pages[0].dataset.pageId));
 const requested=new URLSearchParams(location.search).get('section')||location.hash.slice(1)||pages[0].dataset.pageId,id=activate(requested);if(location.hash||requested!==id)history.replaceState(null,'',urlFor(id));
};
const art=sourceArt();let built=false;
const build=()=>{if(built&&!scripture)return;const s=shell();if(!s)return;if(scripture){activeScroll(s.side);return}built=true;paginate(s,art)};
build();
if(scripture){let timer;const mo=new MutationObserver(ms=>{if(ms.every(m=>m.target.closest?.('.vicara-side-toc,.vicara-mobile-toc')))return;clearTimeout(timer);timer=setTimeout(()=>{mo.disconnect();build();mo.observe(article,{childList:true,subtree:true})},80)});mo.observe(article,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),2500)}
})();