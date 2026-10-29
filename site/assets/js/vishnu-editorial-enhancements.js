/* Vishnu article presentation. The transcription is the authority:
   keep the printed table rows and bibliography in their original order. */
(()=>{
'use strict';
const root=document.querySelector('.document-content');
if(!root)return;
document.body.classList.add('vishnu-editorial-reader');
// Keep native Sanskrit disclosures collapsed until the reader opens them.
const desktopToc=document.querySelector('.side-toc .toc');
const mobileToc=document.querySelector('.mobile-toc .toc');
if(desktopToc)desktopToc.id='vishnu-desktop-toc';
if(mobileToc)mobileToc.id='vishnu-mobile-toc';
for(const nav of [desktopToc,mobileToc].filter(Boolean)){
  const paintActive=()=>{
    for(const link of nav.querySelectorAll('a.toc-index-link')){
      const active=link.classList.contains('is-active')||link.classList.contains('is-active-subsection');
      if(active)link.style.setProperty('color','#496b6c','important');
      else link.style.removeProperty('color');
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
  ['vishnu-lakshmi.webp','Viṣṇu and Lakṣmī · p. 1'],
  ['vishnu-veda-divisions.webp','The Vedic divisions · p. 5'],
  ['vishnu-smriti-sources.webp','The sources of smṛti · p. 7'],
  ['vishnu-emblem.webp','Closing emblem · p. 72']
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
  item.textContent='Sources';
  item.dataset.vdBilingual='true';
  item.setAttribute('aria-label','Sources');
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
