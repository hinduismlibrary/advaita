/* Vishnu article presentation. The transcription is the authority:
   keep the printed table rows and bibliography in their original order. */
(()=>{
'use strict';
const root=document.querySelector('.document-content');
if(!root)return;
// Keep Sanskrit controls compact even when late shared chrome styles load.
const compactSanskritControls=()=>{
  for(const summary of root.querySelectorAll('details.sanskrit-reveal>summary')){
    summary.style.setProperty('display','inline-block','important');
    summary.style.setProperty('min-height','0','important');
    summary.style.setProperty('padding','2px 8px','important');
    summary.style.setProperty('font-family','Merriweather,Georgia,serif','important');
    summary.style.setProperty('font-size','12px','important');
    summary.style.setProperty('line-height','1.3','important');
    summary.style.setProperty('font-weight','400','important');
  }
};
compactSanskritControls();
new MutationObserver(compactSanskritControls).observe(root,{childList:true,subtree:true});
document.body.classList.add('vishnu-editorial-reader');
for(const heading of root.querySelectorAll('.document-section-title,.document-group-heading,.source-page-heading')){
  const label=(heading.textContent||'').replace(/\s+/g,' ').trim();
  if(/^(?:\d+\.\s*)?(?:objections|summary\s*&\s*conclusion|conclusion)$/i.test(label))
    heading.classList.add('vishnu-strong-heading');
}
const objectionsSection=[...root.querySelectorAll('.document-section')]
  .find(section=>section.querySelector(':scope > .document-section-title#objections'));
objectionsSection?.classList.add('vishnu-objections');
// Keep native Sanskrit disclosures collapsed until the reader opens them.
const desktopToc=document.querySelector('.side-toc .toc');
const mobileToc=document.querySelector('.mobile-toc .toc');
if(desktopToc)desktopToc.id='vishnu-desktop-toc';
if(mobileToc)mobileToc.id='vishnu-mobile-toc';
for(const nav of [desktopToc,mobileToc].filter(Boolean)){
  const paintActive=()=>{
    for(const link of nav.querySelectorAll('a.toc-index-link')){
      const active=link.classList.contains('is-active')||link.classList.contains('is-active-subsection');
      if(active){
        link.style.setProperty('color','#26777a','important');
        link.style.setProperty('font-weight','700','important');
        link.style.setProperty('background-color','#eaf1f0','important');
      }else{
        link.style.removeProperty('color');
        link.style.removeProperty('font-weight');
        link.style.removeProperty('background-color');
      }
    }
  };
  paintActive();
  new MutationObserver(paintActive).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
}
// Keep the paper's opening illustration and invocation before the Preface.
const firstSection=root.querySelector('.document-section');
const cover=firstSection?.querySelector(':scope > figure.vishnu-cover-art');
if(cover){
  const invocation=cover.nextElementSibling;
  if(invocation?.matches('.scripture-quote-pair'))firstSection.prepend(cover,invocation);
  else firstSection.prepend(cover);
}
const captions=new Map([
  ['vishnu-lakshmi.webp','Vishnu and Lakshmi'],
  ['vishnu-veda-divisions.webp','The Vedic divisions'],
  ['vishnu-smriti-sources.webp','The sources of smrti'],
  ['vishnu-emblem.webp','Closing emblem']
]);
for(const figure of root.querySelectorAll('figure')){
  const img=figure.querySelector('img');
  if(!img||figure.querySelector('figcaption'))continue;
  const key=[...captions.keys()].find(name=>(img.getAttribute('src')||'').includes(name));
  if(!key)continue;
  const caption=document.createElement('figcaption');
  caption.textContent=captions.get(key);
  figure.append(caption);
}
for(const table of root.querySelectorAll('table.vishnu-data-table')){
  if(table.parentElement?.classList.contains('table-scroll'))continue;
  const wrap=document.createElement('div');
  wrap.className='table-scroll';
  wrap.tabIndex=0;
  wrap.setAttribute('role','region');
  const heading=table.closest('.document-section')?.querySelector('.document-section-title,.reader-subheading');
  wrap.setAttribute('aria-label',heading?.textContent?.trim()||'Summary table');
  table.before(wrap);
  wrap.append(table);
}
for(const citation of root.querySelectorAll('p.reference,p.source-citation,p.scripture-source,p.citation')){
  const first=[...citation.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&node.nodeValue.trim());
  if(first)first.nodeValue=first.nodeValue.replace(/^\s*Source:\s*/i,'');
}
for(const item of document.querySelectorAll('.toc a[href$="#bibliography"],.document-reference-section .source-page-heading')){
  item.textContent='Sources and tables';
  item.dataset.vdBilingual='true';
  item.setAttribute('aria-label','Sources and tables');
}
const normalizeArticleText=value=>{
  const latin=String(value||'').replace(/(?:\p{Script=Latin}\p{M}*)+/gu,run=>run.normalize('NFD').replace(/\p{M}+/gu,''));
  return latin.replace(/["“”]/gu,'').replace(/[‘’]/gu,"'");
};
for(const textRoot of [root,desktopToc,mobileToc].filter(Boolean)){
  const walker=document.createTreeWalker(textRoot,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes)node.nodeValue=normalizeArticleText(node.nodeValue);
}
for(const citation of root.querySelectorAll('p.reference,p.source-citation,p.scripture-source,p.citation')){
  const walker=document.createTreeWalker(citation,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
    node.nodeValue=(node.nodeValue||'')
      .replace(/\s*[–—-]\s*(?=\d)/gu,' to ')
      .replace(/(\p{L})[-‐‑](\p{L})/gu,'$1 $2')
      .replace(/[^\p{L}\p{N}. ]+/gu,' ')
      .replace(/\s+/gu,' ');
  }
}
/* Site chrome loads late. Keep the article's typography last in the cascade. */
const editorialCss=[...document.head.querySelectorAll('link[rel="stylesheet"]')]
  .find(link=>(link.getAttribute('href')||'').includes('/vishnu-article-editorial.css'));
function keepLast(){
  const chrome=document.head.querySelector('link[href*="/site-chrome.css"]');
  if(chrome&&!chrome.href.includes('20261029-vishnu-exception-1'))
    chrome.href='/advaita/assets/css/site-chrome.css?v=20261029-vishnu-exception-1';
  if(chrome&&editorialCss&&(editorialCss.compareDocumentPosition(chrome)&Node.DOCUMENT_POSITION_FOLLOWING))
    document.head.append(editorialCss);
}
keepLast();
const observer=new MutationObserver(()=>{
  keepLast();
  if(document.head.querySelector('link[href*="/site-chrome.css"]'))observer.disconnect();
});
observer.observe(document.head,{childList:true});
})();
