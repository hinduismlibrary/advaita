/* Prepare the PDF transcription for the shared Varna and Shiva reader. */
(()=>{
'use strict';
if(!/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(location.pathname))return;
const source=document.querySelector('#source-document .article-body');
if(!source)return;

const normalizePunctuation=value=>String(value??'')
 .replace(/[’‘‛]/g,"'").replace(/[“”„]/g,'"').replace(/[–—−]/g,'-').replace(/→/g,'->').replace(/←/g,'<-');
for(const details of source.querySelectorAll('details')){
 const summary=details.querySelector(':scope>summary');
 if(summary&&!/sanskrit/i.test(summary.textContent||''))continue;
 details.classList.add('sanskrit-reveal');
 if(summary){
  summary.textContent='Show Sanskrit';
  summary.setAttribute('aria-expanded',String(details.open));
  details.addEventListener('toggle',()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit';summary.setAttribute('aria-expanded',String(details.open));});
 }
 details.querySelectorAll('.sanskrit-transliteration,[lang^="sa-Latn"]').forEach(node=>{node.lang='sa-Latn';});
}
for(const table of source.querySelectorAll('table'))table.classList.add('vishnu-data-table');
const walker=document.createTreeWalker(source,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(node.parentElement?.closest('[lang="sa-Deva"],[lang^="sa-Deva-"]'))continue;
 node.nodeValue=normalizePunctuation(node.nodeValue);
}
for(const node of source.querySelectorAll('[alt],[title],[aria-label]')){
 for(const name of ['alt','title','aria-label'])if(node.hasAttribute(name))node.setAttribute(name,normalizePunctuation(node.getAttribute(name)));
}
document.body.classList.add('vishnu-article');
})();
