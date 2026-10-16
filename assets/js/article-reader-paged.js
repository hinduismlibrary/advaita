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
/* Source PDFs may include an embedded Contents/Index between sections.
   The reader navigation already provides links, so omit that duplicate page. */
const contentFiltered=[];let skippingEmbeddedContents=false;
for(const node of nodes){
  const isContentsHeading=isHeading(node)&&/^\s*(?:contents|index)\s*$/i.test(text(node));
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
const hasMaterial=node=>!!text(node)||!!node.matches?.('img,svg,video,table,figure,canvas,hr')||
  !!node.querySelector?.('img,svg,video,table,figure,canvas,hr');
const headingLabel=raw=>{
  const value=unnumber(raw);
  const hasBibliography=/\bbibliograph(?:y|ies)\b/i.test(value);
  const hasSources=/\b(?:primary\s+)?(?:references?|sources?|works cited)\b/i.test(value);
  if(hasBibliography&&hasSources)return 'Bibliography & Sources';
  if(hasBibliography)return 'Bibliography';
  if(hasSources)return 'Sources';
  if(/^objections?\b/i.test(value))return 'Objections';
  return value;
};
const isSourceHeading=raw=>/^\s*(?:(?:primary|secondary|selected|additional|further|list of)\s+)*(?:bibliograph(?:y|ies)|references?|sources?|works cited)\b/i.test(unnumber(raw));
const isObjectionsHeading=raw=>/^\s*objections?\b/i.test(unnumber(raw));
const isStorySection=raw=>/\b(?:examples?\s+of|stories|narratives?|episodes?)\b/i.test(unnumber(raw));
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
    const group={title:headingLabel(text(heading)),heading,entries:[]};
    const isSourceSection=isSourceHeading(text(heading));
    const isObjectionSection=isObjectionsHeading(text(heading));
    const sourceChildren=children.filter(child=>isSourceHeading(text(child)));
    const splitChildren=children.length&&!isSourceSection&&!isObjectionSection&&
      isStorySection(text(heading));
    if(splitChildren){
      for(let j=0;j<children.length;j++){
        const child=children[j];
        const from=body.indexOf(child);
        const to=j+1<children.length?body.indexOf(children[j+1]):body.length;
        group.entries.push({heading:child,title:headingLabel(text(child)),
          nodes:[...(j===0?body.slice(0,from):[]),...body.slice(from+1,to)]});
      }
    }else if(sourceChildren.length===1){
      const sourceHeading=sourceChildren[0];
      const sourceIndex=children.indexOf(sourceHeading);
      const from=body.indexOf(sourceHeading);
      const nextChild=children[sourceIndex+1];
      const to=nextChild?body.indexOf(nextChild):body.length;
      const parentNodes=body.slice(0,from);
      if(parentNodes.some(hasMaterial))group.entries.push({heading,title:group.title,nodes:parentNodes});
      group.entries.push({heading:sourceHeading,title:headingLabel(text(sourceHeading)),
        nodes:body.slice(from+1,to)});
      for(let j=sourceIndex+1;j<children.length;j++){
        const child=children[j];
        const childFrom=body.indexOf(child);
        const childTo=j+1<children.length?body.indexOf(children[j+1]):body.length;
        group.entries.push({heading:child,title:headingLabel(text(child)),
          nodes:body.slice(childFrom+1,childTo)});
      }
    }else group.entries.push({heading,title:group.title,nodes:body});
    groups.push(group);
  }
  for(const group of groups){
    const entries=[];
    for(let j=0;j<group.entries.length;){
      const entry=group.entries[j];
      if(entry.nodes.some(hasMaterial)){entries.push(entry);j++;continue;}
      let next=j+1;
      const nestedHeadings=[];
      while(next<group.entries.length&&!group.entries[next].nodes.some(hasMaterial)){
        nestedHeadings.push(group.entries[next].heading);
        next++;
      }
      if(next<group.entries.length){
        nestedHeadings.push(group.entries[next].heading);
        entry.nodes=[...nestedHeadings,...group.entries[next].nodes];
        entries.push(entry);
        j=next+1;
      }else j=next;
    }
    for(const entry of entries){
      segments.push({group,heading:entry.heading,title:entry.title||headingLabel(text(entry.heading)),
        nodes:[...(segments.length===0?opening:[]),...entry.nodes]});
    }
  }
}else{
  // A failed heading extraction must show the full paper, never a blank page.
  segments=[{group:{title:'Article',heading:null},heading:null,title:'Full text',nodes}];
}
// Heading-only source artifacts should not create empty reader tabs.
const materialSegments=segments.filter(page=>page.nodes.some(hasMaterial));
if(materialSegments.length)segments=materialSegments;
const seen=new Set(),idFor=(raw)=>{
  let id=raw||'section',suffix=2;
  while(seen.has(id))id=raw+'-'+suffix++;
  seen.add(id);return id;
};
const idMap=new Map();
segments.forEach(p=>{
  p.id=idFor(p.heading?.id||slug(p.title));
  const put=id=>{if(id&&!idMap.has(id))idMap.set(id,p);};
  put(p.heading?.id);put(p.id);
  p.nodes.forEach(n=>{
    const headings=[];
    const headingSelector='h3,h4,h5';
    if(n.matches?.(headingSelector))headings.push(n);
    n.querySelectorAll?.(headingSelector).forEach(h=>headings.push(h));
    for(const heading of headings){
      if(!heading.id||idMap.has(heading.id))heading.id=idFor(p.id+'-'+slug(text(heading)));
      else seen.add(heading.id);
      put(heading.id);
    }
    put(n.id);
    n.querySelectorAll?.('[id]').forEach(c=>{seen.add(c.id);put(c.id);});
  });
});
for(const p of segments){
  if(p.group.heading?.id&&!idMap.has(p.group.heading.id))idMap.set(p.group.heading.id,p);
}

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
function tocLabel(raw){
  const label=String(raw??'').replace(/\s+/g,' ').trim();
  const numberedObjection=label.match(/^objection\s+([ivxlcdm]+|\d+)\s*:/i);
  if(numberedObjection)return 'Objection '+numberedObjection[1].toUpperCase();
  return label;
}
function pageSubheadings(page){
  const headings=[];
  const selector='h3,h4,h5';
  for(const node of page.nodes){
    if(node.matches?.(selector))headings.push(node);
    node.querySelectorAll?.(selector).forEach(heading=>headings.push(heading));
  }
  const rootLevel=Number(page.heading?.tagName?.slice(1))||2;
  const root={level:rootLevel,children:[]};
  const stack=[root];
  const seenHeadings=new Set();
  let skippedAnswerLevel=null;
  for(const heading of headings){
    const level=Number(heading.tagName?.slice(1))||3;
    if(skippedAnswerLevel!==null){
      if(level>skippedAnswerLevel)continue;
      skippedAnswerLevel=null;
    }
    while(stack.length>1&&stack[stack.length-1].level>=level)stack.pop();
    const label=text(heading);
    if(label&&!heading.id){
      heading.id=idFor(page.id+'-'+slug(label));
      idMap.set(heading.id,page);
    }
    if(!heading.id||!label||seenHeadings.has(heading.id))continue;
    seenHeadings.add(heading.id);
    if(/^answer\s*:/i.test(label)){
      skippedAnswerLevel=level;
      continue;
    }
    if(level<=rootLevel)continue;
    const item={heading,label:tocLabel(label),fullLabel:label,level,children:[]};
    stack[stack.length-1].children.push(item);
    stack.push({level,children:item.children});
  }
  return root.children;
}
function containsSubheading(items,id){
  return items.some(item=>item.heading.id===id||containsSubheading(item.children,id));
}
function buildSubheadingList(items,page){
  const nested=el('div','toc-subitems');
  for(const item of items){
    const sublink=el('a',`toc-subitem toc-level-${item.level}`,item.label);
    sublink.dataset.section=page.id;
    sublink.dataset.subsection=item.heading.id;
    sublink.href=href(page)+'#'+encodeURIComponent(item.heading.id);
    sublink.title=item.fullLabel;
    sublink.setAttribute('aria-label',item.fullLabel);
    nested.append(sublink);
    if(item.children.length){
      const childList=buildSubheadingList(item.children,page);
      childList.classList.add('toc-subitems-nested');
      if(item.children.length>5){
        const group=el('details','toc-subgroup toc-subgroup-nested');
        const summary=el('summary',null,`Subsections (${item.children.length})`);
        let hash='';
        try{hash=decodeURIComponent(location.hash.slice(1));}catch{}
        if(containsSubheading(item.children,hash))group.open=true;
        group.append(summary,childList);
        nested.append(group);
      }else nested.append(childList);
    }
  }
  return nested;
}
function countSubheadings(items){
  return items.reduce((total,item)=>total+1+countSubheadings(item.children||[]),0);
}
function appendPageEntry(container,page,linkClass){
  const link=el('a',linkClass,page.title);
  link.dataset.section=page.id;
  link.href=href(page);
  container.append(link);
  const headings=pageSubheadings(page);
  if(!headings.length)return;
  const referencePage=isSourceHeading(page.title);
  const previewCount=headings.length>5?(referencePage?Math.min(4,headings.length):3):headings.length;
  const preview=headings.slice(0,previewCount);
  const remaining=headings.slice(previewCount);
  if(preview.length)container.append(buildSubheadingList(preview,page));
  if(!remaining.length)return;
  const hiddenCount=countSubheadings(remaining);
  const group=el('details','toc-subgroup');
  const summary=el('summary',null,referencePage?`Sections (${hiddenCount})`:`More sections (${hiddenCount})`);
  let hash='';
  try{hash=decodeURIComponent(location.hash.slice(1));}catch{}
  if(containsSubheading(remaining,hash))group.open=true;
  group.append(summary,buildSubheadingList(remaining,page));
  container.append(group);
}
function makeToc(nav){
  const grouped=new Map();
  for(const page of segments){
    if(!grouped.has(page.group))grouped.set(page.group,[]);
    grouped.get(page.group).push(page);
  }
  for(const [group,pages] of grouped){
    if(pages.length===1){
      appendPageEntry(nav,pages[0],'toc-main');
      continue;
    }
    const wrap=el('details','toc-group');
    const label=el('summary','toc-parent');
    label.append(el('span','toc-parent-title',group.title),el('span','toc-current',''));
    const items=el('div','toc-children');
    wrap.append(label,items);nav.append(wrap);
    wrap.open=true;
    for(const page of pages){
      const entry=el('div','toc-page-item');
      appendPageEntry(entry,page,'');
      items.append(entry);
    }
  }
}
makeToc(sideNav);makeToc(mobileNav);
function syncSubsectionToc(){
  let hash='';
  try{hash=decodeURIComponent(location.hash.slice(1));}catch{}
  for(const nav of [sideNav,mobileNav]){
    for(const link of nav.querySelectorAll('a[data-subsection]')){
      const active=link.dataset.subsection===hash;
      link.classList.toggle('is-active-subsection',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    }
  }
}
window.addEventListener('hashchange',syncSubsectionToc);
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
  if(copy.matches?.('h3'))copy.classList.add('reader-subheading');
  copy.querySelectorAll?.('h3').forEach(heading=>heading.classList.add('reader-subheading'));
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
    if(citation.matches('p.reference')&&/^(?:english translation|sanskrit text(?: and english translation)?)\s*:?[.]?$/i.test(text(citation)))continue;
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
  for(const n of page.nodes)frag.append(clean(n,page));
  pairWomenScripture(frag);
  styleArticleQuotes(frag);
  normalizeCitationOrder(frag);
  reader.replaceChildren(frag);
  reader.classList.toggle('document-reference-page',isSourceHeading(page.title));
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
    for(const a of nav.querySelectorAll('a[data-section]:not([data-subsection])')){
      const active=a.dataset.section===page.id;a.classList.toggle('is-active',active);
      if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    }
    for(const group of nav.querySelectorAll('.toc-group')){
      const active=group.querySelector('a[aria-current="page"]');
      const current=group.querySelector('.toc-current');
      group.classList.toggle('has-current',!!active);
      if(current)current.textContent=active?text(active):'';
    }
  }
  syncSubsectionToc();
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
