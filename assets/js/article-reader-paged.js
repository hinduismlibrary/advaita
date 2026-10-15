/* Shared reader for the five HTML-backed articles using the paged layout.
 * Keep the separate Varna-vicara reader and its source material untouched.
 * Keep every source node: the old reader selected the outermost wrapper and could
 * mistake a page shell for a document, leaving its article empty.
 */
(()=>{
'use strict';
const config=document.getElementById('article-config');
const source=document.getElementById('source-document');
if(!config||!source)return;
const title=config.dataset.title||'Article';
const subtitle=config.dataset.subtitle||'';
const author=config.dataset.author||'';
const base=config.dataset.base||location.pathname.replace(/\/?$/,'/');
const text=n=>(n?.textContent||'').replace(/\s+/g,' ').trim();
const unnumber=s=>(s||'').replace(/^\s*(?:[IVX]+[.)]|\d+(?:\.\d+)*[.)]?)\s*/i,'').trim();
const slug=s=>unnumber(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'section';
const isHeading=n=>n?.matches?.('h2,h3');
const realHeading=n=>isHeading(n)&&!/^\s*(?:contents|index)\s*$/i.test(text(n));
const root=source.querySelector('.article-body')||source;
const first=[...root.querySelectorAll('h2,h3')].find(realHeading);
/* Find the INNERMOST ancestor whose direct children contain the actual
   sequential headings. Never move out again to an unrelated site wrapper. */
let content=root;
if(first){
  for(let el=first.parentElement;el&&el!==root;el=el.parentElement){
    const heads=[...el.children].filter(realHeading);
    if(heads.length>=2){content=el;break;}
  }
  if(content===root&&first.parentElement!==root){
    const rootHeadings=[...root.children].filter(realHeading);
    if(rootHeadings.length>=2){
      /* The first nested heading may be a title-page heading. If the article
         itself has a chapter outline, keep the whole article as the source. */
      content=root;
    }else{
      let best=null,score=-1;
      for(let el=first.parentElement;el&&el!==root;el=el.parentElement){
        const heads=[...el.children].filter(isHeading);
        const points=heads.length*100+[...el.children].filter(n=>n.matches?.('p,ol,ul,table,details,figure')).length;
        if(points>score){score=points;best=el;}
      }
      if(best&&score>0)content=best;
    }
  }
}
let nodes=[...content.children];
if(title==='Hinduism on Women')nodes=nodes.filter(n=>!n.matches?.('.women-index'));
/* Source PDFs often include their own Contents/Index between article sections.
   Build one shared Contents page from the extracted sections instead. */
const contentFiltered=[];let skippingEmbeddedContents=false;
for(const node of nodes){
  const isContentsHeading=isHeading(node)&&/^\\s*(?:contents|index)\\s*$/i.test(text(node));
  if(skippingEmbeddedContents){
    if(isHeading(node)){
      skippingEmbeddedContents=false;
      if(isContentsHeading){skippingEmbeddedContents=true;continue;}
    }else continue;
  }
  if(isContentsHeading){skippingEmbeddedContents=true;continue;}
  contentFiltered.push(node);
}
nodes=contentFiltered;
/* If headings sit within a single inner wrapper, descend without discarding
   opening dedications, introductions, footnotes or final bibliography. */
if(!nodes.some(realHeading)){
  const candidates=[...content.querySelectorAll('h2,h3')].filter(realHeading);
  if(candidates.length){let parent=candidates[0].parentElement;
    if(candidates.every(n=>n.parentElement===parent))nodes=[...parent.children];
  }
}
const topHeads=nodes.filter(n=>n.matches?.('h2')&&realHeading(n));
const chapterHeads=topHeads.length?topHeads:nodes.filter(realHeading);
let segments=[];
if(chapterHeads.length){
  const opening=nodes.slice(0,nodes.indexOf(chapterHeads[0]));
  const firstContents=opening.findIndex(n=>n.matches?.('h2,h3')&&/^\s*(?:contents|index)\s*$/i.test(text(n)));
  if(firstContents>=0){
    let end=firstContents+1;
    while(end<opening.length&&opening[end].matches?.('ol,ul,hr,p'))end++;
    opening.splice(firstContents,end-firstContents);
  }
  const groups=[];
  for(let i=0;i<chapterHeads.length;i++){
    const heading=chapterHeads[i];
    const start=nodes.indexOf(heading),stop=i+1<chapterHeads.length?nodes.indexOf(chapterHeads[i+1]):nodes.length;
    const body=nodes.slice(start+1,stop);
    const children=heading.matches('h2')?body.filter(n=>n.matches?.('h3')):[];
    const group={title:unnumber(text(heading)),heading,entries:[]};
    const isBibliography=/\\b(?:bibliography|references|sources)\\b/i.test(unnumber(text(heading)));
    if(children.length&&!isBibliography){
      for(let j=0;j<children.length;j++){
        const from=body.indexOf(children[j]);
        const to=j+1<children.length?body.indexOf(children[j+1]):body.length;
        const prefix=j===0?body.slice(0,from):[];
        group.entries.push({heading:children[j],nodes:[...prefix,...body.slice(from+1,to)]});
      }
    }else group.entries.push({heading,nodes:body});
    groups.push(group);
  }
  for(const group of groups){
    for(const entry of group.entries){
      segments.push({group,heading:entry.heading,title:unnumber(text(entry.heading)),
        nodes:[...(segments.length===0?opening:[]),...entry.nodes]});
    }
  }
}else{
  // A failed heading extraction must show the full paper, never a blank page.
  segments=[{group:{title:'Article',heading:null},heading:null,title:'Full text',nodes}];
}
const seen=new Set(),idFor=(raw)=>{
  let id=raw||'section',suffix=2;
  while(seen.has(id))id=raw+'-'+suffix++;
  seen.add(id);return id;
};
const idMap=new Map();
segments.forEach((p,i)=>{
  p.id=idFor(p.heading?.id||slug(p.title));
  const put=id=>{if(id&&!idMap.has(id))idMap.set(id,p);};
  put(p.heading?.id);put(p.id);
  p.nodes.forEach(n=>{put(n.id);n.querySelectorAll?.('[id]').forEach(c=>put(c.id));});
});
for(const p of segments){
  if(p.group.heading?.id&&!idMap.has(p.group.heading.id))idMap.set(p.group.heading.id,p);
}
const contentsPage={group:{title:'Contents',heading:null},heading:null,title:'Contents',nodes:[],id:idFor('contents'),isContents:true};
segments.unshift(contentsPage);
idMap.set(contentsPage.id,contentsPage);
const href=p=>p===segments[0]?base:base+'?section='+encodeURIComponent(p.id);
const el=(tag,cls,value)=>{
  const n=document.createElement(tag);
  if(cls)n.className=cls;
  if(value!==undefined)n.textContent=value;
  return n;
};
const bar=el('header','sitebar'),brand=el('a',null,'Viveka Dṛṣṭi');
brand.href='/advaita/';bar.append(brand);
const main=el('main','page'),header=el('header','article-head');
header.append(el('h1',null,title));
if(subtitle)header.append(el('p','article-subtitle',subtitle));
if(author)header.append(el('p','article-byline',`By ${author}`));
const grid=el('div','reader-grid'),side=el('aside','side-toc'),sideNav=el('nav','toc');
side.setAttribute('aria-label','Table of contents');
side.append(el('h2','side-toc-title','Contents'),sideNav);
const article=el('article','article'),mobile=el('details','mobile-toc'),mobileNav=el('nav','toc');
mobile.append(el('summary',null,'Contents'),mobileNav);
const context=el('div','page-context'),parent=el('strong'),count=el('span');
context.append(parent,count);
const reader=el('div','document-content');reader.id='source-content';
const pager=el('nav','page-nav'),prev=el('a','prev'),next=el('a','next');
pager.setAttribute('aria-label','Article sections');pager.append(prev,next);
article.append(mobile,context,reader,pager);grid.append(side,article);main.append(header,grid);
function makeToc(nav){
  let group=null,items=null;
  for(const p of segments){
    if(group!==p.group){
      group=p.group;const wrap=el('details','toc-group');
      const label=el('summary','toc-parent');
      label.append(el('span','toc-parent-title',group.title),el('span','toc-current',''));
      items=el('div','toc-children');wrap.append(label,items);nav.append(wrap);
    }
    const a=el('a',null,p.title);a.dataset.section=p.id;a.href=href(p);items.append(a);
    for(const n of p.nodes){
      const subheads=[];
      if(n.matches?.('h4[id]'))subheads.push(n);
      subheads.push(...(n.querySelectorAll?.('h4[id]')||[]));
      for(const heading of subheads){
        const sub=el('a','toc-subitem',text(heading));
        sub.dataset.section=p.id;
        sub.dataset.subsection=heading.id;
        sub.href=href(p)+'#'+encodeURIComponent(heading.id);
        items.append(sub);
      }
    }
  }
}
makeToc(sideNav);makeToc(mobileNav);
const devanagari=/[\u0900-\u097f]/;
function styleQuotedText(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  for(const node of textNodes){
    if(node.parentElement?.closest('script,style,svg,.quoted-inline'))continue;
    const original=node.nodeValue||'';
    const value=original
      .replace(/([“"'‘])\s+(?=\S)/gu,'$1')
      .replace(/(?<=\S)\s+([”"'’])/gu,'$1');
    if(value!==original)node.nodeValue=value;
    const pattern=/(?:“[^”]*”|‘[^’]*’|"[^"]*")/g;
    let match,cursor=0;
    const pieces=[];
    while((match=pattern.exec(value))){
      if(match.index>cursor)pieces.push(document.createTextNode(value.slice(cursor,match.index)));
      pieces.push(el('span','quoted-inline',match[0]));
      cursor=pattern.lastIndex;
    }
    if(!cursor)continue;
    if(cursor<value.length)pieces.push(document.createTextNode(value.slice(cursor)));
    const fragment=document.createDocumentFragment();
    fragment.append(...pieces);
    node.replaceWith(fragment);
  }
}
function clean(node,page){
  if(title==='Hinduism on Women'&&node?.matches?.('p')){
    const raw=text(node);
    const strongOnly=node.children.length===1&&node.firstElementChild?.matches('strong');
    const marker=raw.match(/^\s*(?:¢«?|[•*])\s*(.+)$/u)||raw.match(/^\s*e\s+(.+)$/i);
    if(marker||strongOnly){
      const candidate=(marker?marker[1]:raw).trim();
      const pageTitle=(page.title||'').toLowerCase().replace(/[^a-z0-9]+/g,'');
      const candidateKey=candidate.toLowerCase().replace(/[^a-z0-9]+/g,'');
      if(candidateKey.length>=4&&candidateKey.length<=90){
        if(pageTitle.includes(candidateKey)||candidateKey.includes(pageTitle))return document.createDocumentFragment();
        const labels=candidate.split(/\s+(?:e|¢)\s+(?=[A-Z“])/);
        const fragment=document.createDocumentFragment();
        for(const label of labels){
          const cleanLabel=label.trim().replace(/[.:;]+$/,'');
          if(!cleanLabel)continue;
          fragment.append(el('h4','women-subsection',cleanLabel));
        }
        if(title==='Hinduism on Women')styleQuotedText(fragment);
        return fragment;
      }
    }
  }
  const copy=node.cloneNode(true);
  if(copy.matches?.('.sanskrit-transliteration,[lang^="sa-Latn"]'))return document.createDocumentFragment();
  copy.querySelectorAll('.sanskrit-transliteration,[lang^="sa-Latn"]').forEach(n=>n.remove());
  if(title==='Hinduism on Women')copy.querySelectorAll('.women-title-subtitle,.women-title-author').forEach(n=>n.remove());
  for(const n of [copy,...copy.querySelectorAll('*')]){
    if(!(n instanceof Element))continue;
    const style=n.getAttribute('style')||'';
    const value=n.matches('p')?text(n):'';
    const isSa=(n.getAttribute('lang')||'').toLowerCase().startsWith('sa');
    if(n.matches('details')&&/\b(?:show|hide)\s+sanskrit\b/i.test(text(n.querySelector('summary'))))n.classList.add('sanskrit-reveal');
    if(n.matches('p')){
      const citationSource=/^(?:Lord Krsna|Krsna|Manusmriti|Manu Smriti|Mahabharata|Bhagavata|Bhagavatam|Bhagavad Gita|Skanda|Siva|Shiva|Padma|Gita|Yajnavalkya|Taittiriya|Taittirlya|Rgveda|Ṛgveda|Veda|Satapatha|Apastamba|Baudhayana|Gautama|Visnu|Vishnu|Matsya|Harivamsa|Brahmavaivarta|Mahanirvana|Gobhila|Garuda|Devala|Daksa|Angiras|Bhavisya|Bhavishya|Vasistha|Valmiki Ramayana|Atri|Katyayana|Kātyāyana|Parasara|Parashara|Narada|Nārada|Yama|Sankha|Sankhalikhita|Vatsyayana|Harita|Atharva|Brahma|Agni|Vayu|Brahmanda)(?=$|[\s(,.:])/i.test(value);
      const hasCitationNumber=/\d/.test(value);
      const proseCitationCue=/\b(?:says?|states?|mentions?|discusses?|speaks?|describes?|explains?|elaborates?|concludes?|writes?|teaches?|gives?|calls?|regards?|regarding|is|are|was|were|the|this|these|that|which|his|her|they|there|because|since|if|when|for)\b/i.test(value);
      const citationLabel=citationSource&&hasCitationNumber&&value.length<=160&&!proseCitationCue;
      if(n.classList.contains('scripture-source')||(title==='Hinduism on Women'&&citationLabel))n.classList.add('source-citation');
      else if(n.classList.contains('scripture-translation')||n.classList.contains('translation')||
              /color\s*:\s*#(?:a92727|65516f|7b3d35)/i.test(style))n.classList.add('translation');
      if(isSa&&!n.closest('details.sanskrit-reveal'))n.classList.add('sanskrit-text');
      /* Some PDF tables were previously flattened into a single paragraph.
         Differentiate scripts without pretending that corrupt source glyphs
         have been independently restored or translated. */
      if(!isSa&&devanagari.test(value)&&/[a-zA-Z]{5}/.test(value)&&n.childElementCount===0){
        const raw=n.textContent;
        const parts=raw.split(/([\u0900-\u097f][\u0900-\u097f\s।॥०-९|,.;:!?()\-–—\u200c\u200d]*[\u0900-\u097f।॥])/g);
        if(parts.length>1){
          n.replaceChildren(...parts.filter(Boolean).map(part=>{
            if(!devanagari.test(part))return document.createTextNode(part);
            const span=el('span','mixed-sanskrit',part);span.lang='sa-Deva';return span;
          }));
        }
      }
    }
    if(n.matches('div')&&/grid-template-columns\s*:\s*44px/i.test(style))n.classList.add('reference-entry');
    if(n.matches('div')&&/border-left\s*:\s*(?:\d+px|\.\d+em)/i.test(style))n.classList.add('aside-note');
    // Retain graphics and semantic structures, only strip legacy WP layout.
    if(!n.closest('svg')&&!n.matches('svg,svg *,canvas')){
      n.removeAttribute('style');n.removeAttribute('width');n.removeAttribute('height');n.removeAttribute('align');
    }
  }
  for(const a of copy.querySelectorAll('a[href^="#"]')){
    let id='';try{id=decodeURIComponent(a.getAttribute('href').slice(1));}catch{continue;}
    const to=idMap.get(id);if(!to)continue;
    const heading=to.heading?.id===id||to.id===id||to.group.heading?.id===id;
    a.href=to===page?(heading?'#'+to.id:'#'+encodeURIComponent(id)):
      href(to)+(heading?'':'#'+encodeURIComponent(id));
  }
  if(title==='Hinduism on Women')styleQuotedText(copy);
  return copy;
}
function styleArticleQuotes(root){
  let active=false,continuationCount=0;
  const paragraphs=[...root.querySelectorAll('p')].filter(p=>!p.closest('blockquote')&&!p.closest('details'));
  for(const p of paragraphs){
    const value=(p.textContent||'').trim();
    const begins=/^[“"'‘]/u.test(value);
    const continues=active&&(/^[a-z]/u.test(value)||/^\(Papa\)\s+races\b/u.test(value));
    if(begins||continues)p.classList.add('translation');
    const open=(value.match(/[“‘]/gu)||[]).length;
    const close=(value.match(/[”’]/gu)||[]).length;
    const straight=(value.match(/\"/g)||[]).length;
    if(begins){
      active=open>close||(straight%2===1);
      continuationCount=active?1:0;
    }else if(active){
      if(!continues){active=false;continuationCount=0;continue;}
      continuationCount++;
      if(close>open||continuationCount>=3)active=false;
    }
  }
}

function pairWomenScripture(root){
  if(title!=='Hinduism on Women')return;
  const isStaticSanskrit=p=>p.closest('.women-title-page')||
    p.matches('.women-colophon-source-title,.women-om');
  const pending=new Set([...root.querySelectorAll('p[lang^="sa"]')]
    .filter(p=>!p.closest('details.sanskrit-reveal')&&!isStaticSanskrit(p)));
  for(const source of [...pending]){
    if(!pending.has(source))continue;
    const run=[source];
    let sibling=source.nextElementSibling;
    while(sibling&&pending.has(sibling)){run.push(sibling);sibling=sibling.nextElementSibling;}
    for(const p of run)pending.delete(p);
    const reveal=el('details','sanskrit-reveal');
    reveal.append(el('summary',null,'Show Sanskrit'));
    source.before(reveal);
    reveal.append(...run);
  }
  for(const term of root.querySelectorAll('dt[lang^="sa"]')){
    if(term.closest('details.sanskrit-reveal'))continue;
    const span=el('span','sanskrit-text');
    span.lang=term.lang||'sa-Deva';
    while(term.firstChild)span.append(term.firstChild);
    term.removeAttribute('lang');
    const reveal=el('details','sanskrit-reveal');
    reveal.append(el('summary',null,'Show Sanskrit'),span);
    term.append(reveal);
  }
  const sources=[...root.querySelectorAll('details.sanskrit-reveal,p[lang^="sa"]')];
  for(const source of sources){
    if(source.closest('.women-scripture-pair'))continue;
    let next=source.nextElementSibling;
    const citations=[];
    while(next&&next.matches('p.reference,p.source-citation,p.citation')){
      citations.push(next);next=next.nextElementSibling;
    }
    if(!next||next.closest('.women-scripture-pair'))continue;
    const isList=next.matches('ol.women-name-list');
    const isBlockquote=next.matches('blockquote.translation');
    const isTranslationParagraph=next.matches('p.translation')||
      (source.matches('details.sanskrit-reveal')&&next.matches('p')&&
       !next.matches('[lang^="sa"],.reference,.source-citation,.citation'));
    const quotedParagraph=next.matches('p')&&/^[“"'‘]/u.test(text(next));
    if(!isList&&!isBlockquote&&!isTranslationParagraph&&!quotedParagraph)continue;
    const pair=el('div','women-scripture-pair');
    source.before(pair);
    pair.append(source,...citations,next);
    if(next.matches('p')&&!next.classList.contains('translation'))
      next.classList.add('women-scripture-translation');
  }
}
function normalizeCitationOrder(root){
  const isTranslation=n=>n?.matches?.('p.translation,p.scripture-translation,.women-scripture-translation,blockquote.translation,blockquote.scripture-translation');
  const isQuoteSource=n=>n?.matches?.('details.sanskrit-reveal,p[lang^="sa"],.sanskrit-text,blockquote.translation,blockquote.scripture-translation');
  for(const citation of root.querySelectorAll('p.reference,p.source-citation,p.scripture-source,p.citation')){
    if(citation.matches('p.reference')&&/^(?:english translation|sanskrit text(?: and english translation)?)\\s*:?[.]?$/i.test(text(citation)))continue;
    let target=citation.previousElementSibling;
    if(isTranslation(target)){
      while(isTranslation(target.previousElementSibling))target=target.previousElementSibling;
      if(isQuoteSource(target.previousElementSibling))target=target.previousElementSibling;
      target.before(citation);
    }else if(isQuoteSource(target))target.before(citation);
  }
}
function render(index){
  const page=segments[index];if(!page)return;
  const frag=document.createDocumentFragment();
  const h=el('h3',null,page.title);h.id=page.id;frag.append(h);
  if(page.isContents){
    const list=el('ol','contents-page-list');
    for(const section of segments.slice(1)){
      const item=el('li');const link=el('a',null,section.title);link.href=href(section);
      item.append(link);list.append(item);
    }
    frag.append(list);
  }else for(const n of page.nodes)frag.append(clean(n,page));
  pairWomenScripture(frag);
  styleArticleQuotes(frag);
  normalizeCitationOrder(frag);
  reader.replaceChildren(frag);
  for(const d of reader.querySelectorAll('details.sanskrit-reveal')){
    const summary=d.querySelector(':scope>summary');if(!summary)continue;
    const sync=()=>summary.textContent=d.open?'Hide Sanskrit':'Show Sanskrit';
    d.addEventListener('toggle',sync);sync();
  }
  parent.textContent=page.group.title;
  count.textContent=`Section ${index+1} of ${segments.length}`;
  const button=(a,other,label)=>{
    a.replaceChildren(el('small',null,label));
    if(!other){a.removeAttribute('href');a.classList.add('disabled');return;}
    a.classList.remove('disabled');a.href=href(other);a.append(document.createTextNode(other.title));
  };
  button(prev,segments[index-1],'Previous');button(next,segments[index+1],'Next');
  for(const nav of [sideNav,mobileNav]){
    for(const a of nav.querySelectorAll('a[data-section]')){
      const active=a.dataset.section===page.id;a.classList.toggle('is-active',active);
      if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    }
    for(const a of nav.querySelectorAll('a[data-subsection]')){
      const active=page.id===a.dataset.section &&
        location.hash.slice(1)===encodeURIComponent(a.dataset.subsection);
      a.classList.toggle('is-active-subsection',!!active);
      if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
    }
    for(const group of nav.querySelectorAll('.toc-group')){
      const active=group.querySelector('a[aria-current="page"]');
      const current=group.querySelector('.toc-current');
      group.classList.toggle('has-current',!!active);
      if(current)current.textContent=active?text(active):'';
    }
  }
  document.title=`${page.title} — ${title} — Viveka Dṛṣṭi`;
  const u=new URL(location.href);
  if(index===0)u.searchParams.delete('section');else u.searchParams.set('section',page.id);
  history.replaceState(null,'',u.pathname+u.search+u.hash);
  let target=null;
  if(u.hash){try{target=document.getElementById(decodeURIComponent(u.hash.slice(1)));}catch{}}
  if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  else window.scrollTo(0,0);
}
/* Replace only after the entire document was successfully indexed. */
if(segments.every(p=>p.nodes.length===0)){source.hidden=false;return;}
document.body.replaceChildren(bar,main);
document.body.className='document-paged-page shastric-article'+(title==='Hinduism on Women'?' women-reader':'')+(title==='Śrī Sadvarṇārthaprakāśinī'?' sadvarn-reader':'');
const requested=new URLSearchParams(location.search).get('section');
let initial=segments.findIndex(p=>p.id===requested);
if(initial<0&&location.hash){
  try{const found=idMap.get(decodeURIComponent(location.hash.slice(1)));
    initial=segments.indexOf(found);}catch{}
}
render(Math.max(0,initial));
})();
