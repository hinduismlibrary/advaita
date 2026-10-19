/* Shared continuous-scroll reader for the five HTML-backed articles.
 * Keep the separate Varna-vicara reader and its source material untouched.
 * Keep every source node: the old reader selected the outermost wrapper and could
 * mistake a page shell for a document, leaving its article empty.
 */
(()=>{
'use strict';
/* Preserve a complete article fallback if reader rendering throws. */
const fallbackBodyNodes=[...document.body.childNodes];
const fallbackBodyClass=document.body.className;
const fallbackSource=document.getElementById('source-document');
const restoreSourceDocument=()=>{
  if(!fallbackSource)return;
  document.body.replaceChildren(...fallbackBodyNodes);
  document.body.className=fallbackBodyClass;
  fallbackSource.hidden=false;
};
window.__restorePagedArticleSource=restoreSourceDocument;
window.addEventListener('error',event=>{
  if(String(event.filename||'').includes('article-reader-paged.js'))restoreSourceDocument();
},true);

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
  const sourceLabel=/^\s*(?:(?:primary|secondary|selected|additional|further|list of)\s+)*(?:bibliograph(?:y|ies)|references?|sources?|works cited)\b/i.test(value);
  if(sourceLabel)return 'Sources';
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
    const splitChildren=children.length&&!isSourceSection&&!isObjectionSection;
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

const href=p=>base+'#'+encodeURIComponent(p.id);
const groupKey=page=>isSourceHeading(page.title)?'__sources__':page.group?.heading?.id||slug(page.group?.title||page.title);
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
article.append(mobile,context,reader);grid.append(side,article);main.append(header,grid);
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
  for(const heading of headings){
    const level=Number(heading.tagName?.slice(1))||3;
    while(stack.length>1&&stack[stack.length-1].level>=level)stack.pop();
    const label=text(heading);
    if(label&&!heading.id){
      heading.id=idFor(page.id+'-'+slug(label));
      idMap.set(heading.id,page);
    }
    if(!heading.id||!label||seenHeadings.has(heading.id))continue;
    seenHeadings.add(heading.id);
    if(level<=rootLevel)continue;
    const item={heading,label:tocLabel(label),fullLabel:label,level,children:[]};
    stack[stack.length-1].children.push(item);
    stack.push({level,children:item.children});
  }
  return root.children;
}
function makeToc(nav){
  const sourceData={"a-shashtric-lens-of-varna-part-one":[{"label":"1. Preface","target":"preface","children":[{"label":"1.1. Introduction","target":"introduction","children":[]},{"label":"1.2. On Pramana","target":"on-pramana","children":[]},{"label":"1.3. Summary view","target":"summary-view","children":[]}]},{"label":"2. Varna by Janma (Jati)","target":"varna-by-janma","children":[{"label":"2.1. Indirect Pramana","target":"indirect-pramana","children":[]},{"label":"2.2. Direct Pramana","target":"direct-pramana","children":[]}]},{"label":"3. Change in Varna","target":"change-in-varna","children":[{"label":"3.1. Introductory pramanas","target":"3-1-introductory-pramanas","children":[]},{"label":"3.2. Lord Siva on varna","target":"3-2-varna-according-to-siva","children":[]},{"label":"3.3. Verses on loss of Varna","target":"3-4-degradation-in-varna","children":[]},{"label":"3.4. Pramana about right of Vedas","target":"3-5-a-pramana-concerning-the-right-to-the-vedas","children":[]},{"label":"3.5. Narada on Varna [quoting Lord Narayana]","target":"3-3-varna-according-to-narada","children":[]}]},{"label":"4. Varna by qualities (sila)","target":"varna-by-qualities","children":[{"label":"4.1. Bhrigu & Bharadvaja on varna","target":"bhrigu-and-bharadvaja","children":[{"label":"Issues with jati","target":"issues-with-jati","children":[]},{"label":"Origin of varnas","target":"origin-of-varnas","children":[]},{"label":"Acquisition of Varnas","target":"acquisition-of-varnas","children":[]}]},{"label":"4.2. Yudhisthira on Varna","target":"yudhisthira-on-varna","children":[{"label":"Qualities as basis of Varna","target":"yudhisthira-qualities","children":[]},{"label":"Primacy of qualities over birth","target":"primacy-of-qualities","children":[]}]},{"label":"4.3. Sukracharya on Varna","target":"sukracharya-on-varna","children":[]},{"label":"4.4. Gita on varna","target":"gita-on-varna","children":[{"label":"4.13","target":"gita-4-13","children":[]},{"label":"18:44","target":"gita-18-44-45","children":[]}]},{"label":"4.5. Vajrasichi upanisad on Varna","target":"vajrasuchi-upanishad","children":[{"label":"Rejection of jati","target":"vajrasuci-rejection-of-jati","children":[]},{"label":"Varna is by gunas","target":"vajrasuci-guna-conclusion","children":[]}]}]},{"label":"5. Examples of change in varna","target":"examples-of-change","children":[{"label":"5.1. Prsadhra","target":"5-1-prsadhra","children":[]},{"label":"5.2. Nabhaga","target":"5-2-nabhaga","children":[]},{"label":"5.3. Lineages of dhrsta & agnivesya","target":"5-3-the-lineages-of-dhrsta-and-agnivesya","children":[]},{"label":"5.4. Visvamitra","target":"5-4-visvamitra","children":[]},{"label":"5.5. Arstisena, Devapi & Sindhudvipa","target":"5-5-arstisena-sindhudvipa-and-devapi","children":[]},{"label":"5.6. Matanga","target":"5-6-matanga","children":[]},{"label":"5.7. Vitahavya","target":"5-7-king-vitahavya","children":[]},{"label":"5.8. Trisanku, Vasisthas & Vaisvamitras","target":"5-8-trisanku-and-others","children":[]},{"label":"5.9. Verse from the rgveda","target":"5-9-a-verse-of-the-rgveda","children":[]},{"label":"5.10. Kavasa ailisa","target":"5-10-kavasa-ailusa","children":[]}]},{"label":"6. View of some other acharyas","target":"other-acharyas","children":[{"label":"6.1. Madhva acharyas","target":"6-1-madhva-acaryas","children":[]},{"label":"6.2. Gaudiya acharyas","target":"6-2-gaudiya-acaryas","children":[]},{"label":"6.3. Advaita acharyas","target":"6-3-advaita-acaryas","children":[]},{"label":"6.4. Saiva acharyas","target":"6-4-saiva-acaryas","children":[]}]},{"label":"7. Summary of the pramanas","target":"summary-of-pramanas","children":[]},{"label":"8. Pragmatic perspective","target":"pragmatic-perspective","children":[]}],"a-vaishnava-lens-on-vishnu-as-the-supreme-deity":[{"label":"1. Preface","target":"preface","children":[{"label":"1.1. Introduction","target":"introduction","children":[]},{"label":"1.2. Methodology","target":"methodology","children":[]}]},{"label":"2. Vedas","target":"vedas","children":[{"label":"2.1. Karma kanda","target":"karma-kanda","children":[]},{"label":"2.2. Jnana kanda","target":"jnana-kanda","children":[]}]},{"label":"3. Smrtis","target":"smrtis","children":[{"label":"3.1. Vedangas & Dharmasastras","target":"dharmasastras-vedangas","children":[]},{"label":"3.2. Ramayana","target":"ramayana","children":[]},{"label":"3.3. Mahabharata","target":"mahabharata","children":[]}]},{"label":"4. Puranas","target":"puranas","children":[{"label":"4.1. Meta-analysis","target":"purana-meta-analysis","children":[]},{"label":"4.2. Statements of the Puranas","target":"purana-statements","children":[]}]},{"label":"5. Objections","target":"objections","children":[]},{"label":"6. Summary & conclusion","target":"summary-and-conclusion","children":[]},{"label":"Sources","target":"bibliography","children":[]}],"meat-eating-in-hinduism-through-the-lens-of-shastra":[{"label":"I. Preface","target":"preface","children":[{"label":"1. Introduction","target":"introduction","children":[]},{"label":"2. On pramanas","target":"on-pramanas","children":[]},{"label":"3. Summary","target":"summary","children":[]}]},{"label":"II. Purvardha","target":"purvardha","children":[{"label":"1. Condemnation of meat (Utsarga)","target":"condemnation-of-meat","children":[]},{"label":"2. Exceptions in ritual contexts & Hunting (Apavada)","target":"ritual-exceptions-and-hunting","children":[]},{"label":"3. Abstention even from lawful meat","target":"abstention-from-lawful-meat","children":[]}]},{"label":"III. Uttarardha","target":"uttarardha","children":[{"label":"1. Beef & other forbidden meats","target":"forbidden-meats","children":[]},{"label":"2. Desacara & nutrition: valid exceptions?","target":"desacara-and-health","children":[]},{"label":"3. Did Rama eat meat?","target":"did-rama-eat-meat","children":[]}]},{"label":"Sources","target":"bibliography","children":[]}]};
  const route=base.endsWith('/')?base.slice(0,-1):base;
  function readIndexList(list){
    if(!list)return [];
    const children=[...list.children].filter(item=>item.matches?.('li'));
    const roman=value=>{const numerals=['I','II','III','IV','V','VI','VII','VIII','IX','X'];return numerals[value-1]||String(value);};
    return children.map((item,index)=>{
      const anchor=item.querySelector(':scope > a[href^="#"]');
      if(!anchor)return null;
      const hrefValue=anchor.getAttribute('href')||'';
      let target='';
      try{target=decodeURIComponent(hrefValue.replace(/^#/,'').split('#')[0]);}catch{}
      let label=text(anchor);
      const listType=(list.getAttribute('type')||'').toUpperCase();
      if(list.tagName==='OL'&&listType==='I')label=roman(index+1)+'. '+label;
      if(list.tagName==='UL')label='• '+label;
      const nested=[...item.children].find(child=>child.matches?.('ol,ul'));
      return {label,target,children:nested?readIndexList(nested):[]};
    }).filter(Boolean);
  }
  function outlineFromSource(){
    if(route.endsWith('/hinduism-on-women')){
      const index=source.querySelector('.women-index > ol,.women-index > ul');
      if(index)return readIndexList(index);
    }
    const key=Object.keys(sourceData).find(path=>route.endsWith('/'+path));
    return key?sourceData[key]:null;
  }
  function autoOutline(){
    const groups=[];
    for(const page of segments){
      const sourcePage=isSourceHeading(page.title);
      const key=sourcePage?'__sources__':page.group;
      let group=groups[groups.length-1];
      if(!group||group.key!==key){
        group={key,title:sourcePage?'Sources':page.group?.title||page.title,heading:page.group?.heading,pages:[]};
        groups.push(group);
      }
      group.pages.push(page);
    }
    const headingEntries=page=>pageSubheadings(page).map(item=>({
      label:item.fullLabel,target:item.heading.id,children:item.children.map(child=>({
        label:child.fullLabel,target:child.heading.id,children:[]
      }))
    }));
    return groups.map(group=>{
      const first=group.pages[0];
      if(group.key==='__sources__'){
        return {label:'Sources',target:first.heading?.id||first.id,children:[]};
      }
      const root={label:group.title,target:group.heading?.id||first.heading?.id||first.id,children:[]};
      for(const page of group.pages){
        const isOnlyRoot=group.pages.length===1&&page.heading===group.heading;
        if(isOnlyRoot){
          root.children.push(...headingEntries(page));
          continue;
        }
        if(page.heading){
          root.children.push({
            label:page.title,target:page.heading.id,children:headingEntries(page)
          });
        }
      }
      return root;
    });
  }
  let outline=outlineFromSource();
  if(!outline)outline=autoOutline();
  const hasSourceEntry=items=>{
    for(const item of items){
      const page=item.target?idMap.get(item.target):null;
      if(isSourceHeading(item.label)||(page&&isSourceHeading(page.title)))return true;
      if(item.children?.length&&hasSourceEntry(item.children))return true;
    }
    return false;
  };
  if(segments.some(page=>isSourceHeading(page.title))&&!hasSourceEntry(outline)){
    const page=segments.find(isSourceHeading);
    outline.push({label:'Sources',target:page.heading?.id||page.id,children:[]});
  }
  nav.classList.add('toc-index');
  const renderList=(items,depth=0)=>{
    const list=el('ul',depth?'toc-index-list toc-index-nested':'toc-index-list');
    for(const item of items){
      const entry=el('li','toc-index-entry');
      const page=item.target?idMap.get(item.target)||segments.find(candidate=>
        candidate.id===item.target||candidate.heading?.id===item.target||candidate.group?.heading?.id===item.target
      ):null;
      const sourceEntry=isSourceHeading(item.label)||(page&&isSourceHeading(page.title));
      const label=sourceEntry?'Sources':item.label;
      if(page){
        const link=el('a','toc-index-link',label);
        const isPageHeading=item.target===page.id||item.target===page.heading?.id||item.target===page.group?.heading?.id;
        link.href=base+'#'+encodeURIComponent(item.target||page.id);
        link.dataset.section=page.id;
        link.dataset.group=groupKey(page);
        if(item.target&&!isPageHeading)link.dataset.subsection=item.target;
        link.title=label;
        link.setAttribute('aria-label',label);
        entry.append(link);
      }else{
        if(item.target)console.error('Contents target not found:',item.target,label);
        entry.append(el('span','toc-index-label',label));
      }
      if(item.children?.length)entry.append(renderList(item.children,depth+1));
      list.append(entry);
    }
    return list;
  };
  nav.replaceChildren(renderList(outline));
}
makeToc(sideNav);makeToc(mobileNav);
let currentTocPage=null,subsectionSyncPending=false;
function syncSubsectionToc(){
  const page=currentTocPage;
  const candidates=page?[...sideNav.querySelectorAll('a[data-subsection]')]
    .filter(link=>link.dataset.section===page.id)
    .map(link=>({link,target:document.getElementById(link.dataset.subsection)}))
    .filter(item=>item.target&&reader.contains(item.target)&&item.target.getClientRects().length)
    .sort((a,b)=>{
      const order=a.target.compareDocumentPosition(b.target);
      if(order&Node.DOCUMENT_POSITION_FOLLOWING)return -1;
      if(order&Node.DOCUMENT_POSITION_PRECEDING)return 1;
      return 0;
    }):[];
  const line=40;
  let selected=null;
  for(const item of candidates){
    if(item.target.getBoundingClientRect().top<=line)selected=item;
    else break;
  }
  for(const nav of [sideNav,mobileNav]){
    let activeOnce=false;
    for(const link of nav.querySelectorAll('a[data-subsection]')){
      const active=!activeOnce&&!!selected&&link.dataset.section===page.id&&link.dataset.subsection===selected.link.dataset.subsection;
      if(active)activeOnce=true;
      link.classList.toggle('is-active-subsection',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    }
  }
  return !!selected;
}
function tocTargetId(link){
  try{return decodeURIComponent(new URL(link.href).hash.slice(1));}catch{return '';}
}
function syncActiveSection(){
  const entries=segments.map(page=>({page,heading:renderedHeadings.get(page.id)})).filter(item=>item.heading);
  if(!entries.length)return;
  const line=40;
  let active=entries[0];
  for(const entry of entries){
    if(entry.heading.getBoundingClientRect().top<=line)active=entry;
    else break;
  }
  currentTocPage=active.page;
  const sourcePage=isSourceHeading(active.page.title);
  parent.textContent=sourcePage?'Sources':active.page.group?.title||active.page.title;
  count.textContent='Full document';
  reader.classList.toggle('document-reference-page',sourcePage);
  const activeGroup=groupKey(active.page);
  const activeSubsection=syncSubsectionToc();
  for(const nav of [sideNav,mobileNav]){
    const groupLinks=[...nav.querySelectorAll('a[data-section]:not([data-subsection])')]
      .filter(link=>link.dataset.group===activeGroup);
    const activeLink=groupLinks.find(link=>tocTargetId(link)===active.heading.id)||groupLinks[0];
    for(const link of nav.querySelectorAll('a[data-section]:not([data-subsection])')){
      const selected=!activeSubsection&&link===activeLink;
      link.classList.toggle('is-active',selected);
      if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    }
  }
}
function scheduleSubsectionSync(){
  if(subsectionSyncPending)return;
  subsectionSyncPending=true;
  requestAnimationFrame(()=>{subsectionSyncPending=false;syncActiveSection();});
}
window.addEventListener('scroll',scheduleSubsectionSync,{passive:true});
window.addEventListener('resize',scheduleSubsectionSync,{passive:true});
window.addEventListener('hashchange',scheduleSubsectionSync);
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
function normalizeSourcePage(root){
  for(const heading of [...root.querySelectorAll('h2,h3,h4,h5,h6')]){
    const normalized=el('h4','source-group-heading',text(heading));
    if(heading.id)normalized.id=heading.id;
    heading.replaceWith(normalized);
  }
  for(const paragraph of [...root.querySelectorAll('p')]){
    const next=paragraph.nextElementSibling;
    const label=text(paragraph);
    const masterIndex=paragraph.classList.contains('reference')&&/^master citation index$/i.test(label);
    if((!next||!next.matches('ol,ul,.article-index'))&&!masterIndex)continue;
    if(!label||label.length>100)continue;
    const heading=el('h4','source-group-heading',label);
    if(paragraph.id)heading.id=paragraph.id;
    paragraph.replaceWith(heading);
  }
  /* Some citation indexes contain unmarked Romanized verse snippets.
     Keep the bibliographic entries and notes, but don't present those snippets
     as verified Sanskrit text in the reader. */
  for(const snippet of [...root.querySelectorAll('.index-subitem')]){
    const value=text(snippet);
    const field=value.match(/^(?:quote(?: begins| includes)?|sanskrit)\s*:\s*(.*)$/i);
    if(field&&/[A-Za-z]/.test(field[1]))snippet.remove();
  }
  root.querySelectorAll('ol,ul').forEach(list=>list.classList.add('source-entry-list'));
  root.querySelectorAll('li').forEach(entry=>entry.classList.add('source-entry'));
  root.querySelectorAll('.article-index').forEach(index=>index.classList.add('source-entry-index'));
  root.querySelectorAll('.index-entry').forEach(entry=>entry.classList.add('source-entry'));
}
const renderedHeadings=new Map();
const renderedGroupHeadings=new Set();
function renderSection(page){
  const sourcePage=isSourceHeading(page.title);
  const section=el('section','document-section');
  if(sourcePage)section.classList.add('document-reference-section');
  const heading=el('h3',sourcePage?'source-page-heading':'document-section-title',
    sourcePage?'Sources':page.title);
  heading.id=page.id;
  section.append(heading);
  renderedHeadings.set(page.id,heading);
  if(page.group?.heading&&page.group.heading!==page.heading&&!renderedGroupHeadings.has(page.group.heading)){
    renderedGroupHeadings.add(page.group.heading);
    const groupHeading=el('h2','document-group-heading',page.group.title||headingLabel(text(page.group.heading)));
    if(page.group.heading.id)groupHeading.id=page.group.heading.id;
    section.prepend(groupHeading);
  }
  const body=sourcePage?el('div','source-page-body'):section;
  for(const node of page.nodes)body.append(clean(node,page));
  if(sourcePage){normalizeSourcePage(body);section.append(body);}
  pairWomenScripture(section);
  styleArticleQuotes(section);
  normalizeCitationOrder(section);
  return section;
}
function decodeFragment(value){
  try{return decodeURIComponent(String(value||'').replace(/^#/,'').split('#')[0]);}
  catch{return String(value||'').replace(/^#/,'').split('#')[0];}
}
function resolveTarget(value){
  if(!value)return '';
  if(document.getElementById(value)&&reader.contains(document.getElementById(value)))return value;
  const page=idMap.get(value);
  return page?.id||'';
}
function renderDocument(){
  const fragment=document.createDocumentFragment();
  renderedHeadings.clear();
  renderedGroupHeadings.clear();
  for(const page of segments)fragment.append(renderSection(page));
  reader.replaceChildren(fragment);
  const requested=new URLSearchParams(location.search).get('section');
  const targetId=resolveTarget(location.hash?decodeFragment(location.hash):requested);
  if(requested){
    const url=new URL(location.href);
    url.searchParams.delete('section');
    if(!url.hash&&targetId)url.hash=encodeURIComponent(targetId);
    history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  currentTocPage=idMap.get(targetId)||segments.find(page=>page.id===targetId)||segments[0]||null;
  
  syncActiveSection();
  requestAnimationFrame(()=>{
    const target=targetId&&document.getElementById(targetId);
    if(target&&reader.contains(target))target.scrollIntoView({block:'start'});
    else if(!location.hash&&!requested)window.scrollTo(0,0);
    syncActiveSection();
  });
}
/* Replace only after the entire document was successfully indexed. */
if(segments.every(page=>page.nodes.length===0)){source.hidden=false;return;}
document.body.replaceChildren(bar,main);
document.body.className='document-paged-page shastric-article'+(title==='Hinduism on Women'?' women-reader':'')+(title==='Śrī Sadvarṇārthaprakāśinī'?' sadvarn-reader':'');
renderDocument();
const siteChrome=document.createElement('script');
siteChrome.src='/advaita/assets/js/site-chrome.js?v=20261019-unified-theme-3';
siteChrome.async=false;
document.body.append(siteChrome);
})();
