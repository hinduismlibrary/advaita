/* Prepare the PDF transcription for the shared Varna and Shiva reader. */
(()=>{
'use strict';
if(!/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(location.pathname))return;
const source=document.querySelector('#source-document .article-body');
if(!source)return;

const ascii=value=>String(value??'')
 .replace(/[śṣ]/g,'sh').replace(/[ŚṢ]/g,'Sh').replace(/[ṛṝ]/g,'r').replace(/[ṚṜ]/g,'R')
 .replace(/[ṇ]/g,'n').replace(/[ṅñ]/g,'n').replace(/[ṆṄÑ]/g,'N').replace(/[ṭ]/g,'t').replace(/[Ṭ]/g,'T')
 .replace(/[ḍ]/g,'d').replace(/[Ḍ]/g,'D').replace(/[ḷ]/g,'l').replace(/[Ḷ]/g,'L')
 .replace(/[ṃṁ]/g,'m').replace(/[ṂṀ]/g,'M').replace(/[ḥ]/g,'h').replace(/[Ḥ]/g,'H')
 .replace(/[’‘‛]/g,"'").replace(/[“”„]/g,'"').replace(/[–—−]/g,'-').replace(/→/g,'->').replace(/←/g,'<-')
 .normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
for(const details of source.querySelectorAll('details')){
 const summary=details.querySelector(':scope>summary');
 if(summary&&!/sanskrit/i.test(summary.textContent||''))continue;
 details.classList.add('sanskrit-reveal');
 if(summary)summary.textContent='Show Sanskrit';
 details.querySelectorAll('.sanskrit-transliteration,[lang^="sa-Latn"]').forEach(node=>node.remove());
}
for(const table of source.querySelectorAll('table'))table.classList.add('vishnu-data-table');
const walker=document.createTreeWalker(source,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(node.parentElement?.closest('[lang="sa-Deva"],[lang^="sa-Deva-"]'))continue;
 node.nodeValue=ascii(node.nodeValue);
}
for(const node of source.querySelectorAll('[alt],[title],[aria-label]')){
 for(const name of ['alt','title','aria-label'])if(node.hasAttribute(name))node.setAttribute(name,ascii(node.getAttribute(name)));
}
const polish=()=>{
 document.body.classList.add('vishnu-article');
 const brand=document.querySelector('.sitebar a');
 if(brand&&brand.textContent!=='Viveka Drishti')brand.textContent='Viveka Drishti';
};
polish();
new MutationObserver(polish).observe(document.body,{childList:true});
})();
