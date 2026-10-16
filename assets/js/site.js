(()=>{
const p=location.pathname,dirs=[/^\/advaita\/articles\/?$/, /\/articles\/scripture\/?$/, /\/articles\/(?:scripture-index-version-3|an-index-of-hindu-scripture)\/?$/];
const article=/^\/advaita\/articles\//.test(p)&&!dirs.some(r=>r.test(p));
const vishnuSupremacy=/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(p);
const combinedBhavishya=/\/articles\/bhavisya-purana-addresses-varna-system\/?$/.test(p);
const scripture=/\/articles\/(?:vishnu-purana-book-\d+-chapter-\d+|bhagavad-gita-chapter-\d+|bhavishya-purana-pratisargaparvan-part-\d+-chapter-\d+|bhavishya-purana-brahmaparvan-chapter-\d+|bhavisya-purana-addresses-varna-system|srimad-bhagavatam-(?:second|tenth)-canto-sridhara-svami-rebuild|srimad-bhagavatam-canto-\d{2}-sridhara-svami|mimamsa-sutras-sabara-bhasya-chapter-1)\/?$/.test(p);
// Viṣṇu Purāṇa WFW integrity guard: never display a full article translation as lexical data.
const vishnuPuranaRoute=/\/articles\/vishnu-purana-book-\d+-chapter-\d+(?:\/index\.html)?\/?$/.test(p);
const repairVishnuWordForWord=()=>{
 if(!vishnuPuranaRoute)return;
 const normalize=s=>String(s||'').replace(/\s+/g,' ').trim();
 document.querySelectorAll('.gita-verse').forEach(article=>{
  const translation=normalize(article.querySelector(':scope > .gita-translation')?.textContent);
  if(!translation)return;
  [...article.querySelectorAll(':scope > .gita-controls > details.gita-details')].filter(d=>/^Word-for-word$/i.test(normalize(d.querySelector(':scope > summary')?.textContent))).forEach(detail=>{
   detail.querySelectorAll('.gita-wfw-list').forEach(row=>{
    const strong=row.querySelector(':scope > strong');
    if(!strong)return;
    const remainder=[...row.childNodes].filter(n=>n!==strong).map(n=>n.textContent||'').join('').replace(/^\s*—\s*/,'');
    const rowText=normalize(row.textContent).toLowerCase(), translationText=translation.toLowerCase();
    const copiedTranslation=(translationText.length>80&&rowText.includes(translationText.slice(0,100)))||/sri paraasharar|sri vishnu puraana|one who having|this completes chapter/i.test(rowText);
    if(normalize(remainder)===translation||copiedTranslation)row.closest('.gita-dual-section')?.remove();
   });
   if(!detail.querySelector('.gita-dual-section'))detail.remove();
  });
 });
};
repairVishnuWordForWord();
// Keep the WFW control visible even when an invalid generated layer was removed.
// The status is explicit; no ordinary translation is relabelled as lexical data.
const restoreVishnuWordForWordControl=()=>{
 if(!vishnuPuranaRoute)return;
 document.querySelectorAll('.gita-verse').forEach(article=>{
  const controls=article.querySelector(':scope > .gita-controls');
  if(!controls)return;
  const exists=[...controls.querySelectorAll(':scope > details.gita-details')].some(d=>/^Word-for-word$/i.test((d.querySelector(':scope > summary')?.textContent||'').trim()));
  if(exists)return;
  const detail=document.createElement('details');detail.className='gita-details';
  const summary=document.createElement('summary');summary.textContent='Word-for-word';
  const reveal=document.createElement('div');reveal.className='gita-reveal';
  const note=document.createElement('p');note.className='gita-wfw-pending';note.textContent='No verified word-for-word rendering is currently published for this verse.';
  reveal.append(note);detail.append(summary,reveal);controls.prepend(detail);
 });
};
restoreVishnuWordForWordControl();


const citation=/\/articles\/compilation-of-peer-reviewed-citations-against-aryan-migration-theory\/?$/.test(p),meat=/\/articles\/meat-eating-in-hinduism-through-the-lens-of-shastra\/?$/.test(p);
const css=(key,href)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset[key]='1';document.head.append(l)};
const js=(key,src)=>{if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.async=false;s.dataset[key]='1';document.body.append(s)};
if(article){
 document.querySelectorAll('link[href*="/assets/css/hindupedia-site.css"]').forEach(n=>n.remove());
 if(vishnuSupremacy){
  css('vishnuVicaraBase','/advaita/assets/css/varna-vicara-paged.css?v=20260914-2');
  css('vishnuVicaraFix','/advaita/assets/css/vishnu-supremacy-vicara.css?v=20260918-1');
  js('vishnuPdfPassages','/advaita/assets/js/vishnu-pdf-passages.js?v=20260918-3');
  js('vishnuSourceRestoration','/advaita/assets/js/vishnu-source-restoration.js?v=20260918-2');
  js('vishnuVarnaReader','/advaita/assets/js/vishnu-varna-reader.js?v=20260918-5');
 }else{
  document.body.classList.add('vicara-reader-page');if(citation)document.body.classList.add('citation-reader-page');if(meat)document.body.classList.add('meat-reader-page');if(scripture)document.body.classList.add('scripture-reader-page');
  css('articleReader','/advaita/assets/css/article-reader.css?v=20260916-6');
  if(!scripture)css('articlePager','/advaita/assets/css/article-pager.css?v=20260914-2');
  if(citation||scripture)css('articlePolish','/advaita/assets/css/article-polish.css?v=20260916-6');
  if(!combinedBhavishya)js('articleReader','/advaita/assets/js/article-reader.js?v=20260916-1');
 }
}else css('hindupediaSite','/advaita/assets/css/hindupedia-site.css?build=20260826-2145');

const paths=new Map([
['/advaita/introduction-to-hinduism/','/advaita/pages/introduction-to-hinduism/'],['/advaita/indology/','/advaita/pages/indology/'],['/advaita/purana-library/','/advaita/pages/purana-library/'],['/advaita/bhagavatam-with-sridhara-bhasya/','/advaita/pages/bhagavatam-with-sridhara-bhasya/'],['/advaita/bhavishya-purana/','/advaita/pages/bhavishya-purana/'],['/advaita/bhavishya-purana-brahmaparvan/','/advaita/pages/bhavishya-purana-brahmaparvan/'],['/advaita/bhagavad-gita/','/advaita/pages/bhagavad-gita/']]);
document.querySelectorAll('a[href]').forEach(a=>{const x=paths.get(a.getAttribute('href'));if(x)a.href=x});
const primaryNavItems=[
 {href:'/advaita/',label:'Advaita Vedānta Portal',isCurrent:path=>path==='/advaita/'},
 {href:'/advaita/pages/purana-library/',label:'Purāṇas',isCurrent:path=>/\/(?:pages\/(?:purana-library|vishnu-purana|bhagavatam-with-sridhara-bhasya|bhavishya-purana[^/]*)|articles\/(?:vishnu-purana-|bhavishya-purana-|bhavisya-purana-addresses-varna-system|srimad-bhagavatam-))/.test(path)},
 {href:'/advaita/pages/bhagavad-gita/',label:'Bhagavad Gītā',isCurrent:path=>/\/(?:pages\/bhagavad-gita|articles\/bhagavad-gita-chapter-)/.test(path)},
 {href:'/advaita/#vaishnavism',label:'Vaiṣṇavism',isCurrent:path=>/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(path)},
 {href:'/advaita/pages/indology/',label:'Indology',isCurrent:path=>/\/pages\/indology\/?$/.test(path)||/\/articles\/(?:on-the-lack-of-steppe-ancestry|compilation-of-peer-reviewed-citations-against-aryan-migration-theory)\/?$/.test(path)},
 {href:'/advaita/books/',label:'Other books',isCurrent:path=>/\/advaita\/books\//.test(path)&&!/\/books\/adi-shankaracharya\//.test(path)}
];
document.querySelectorAll('.site-nav').forEach(nav=>{
 const links=primaryNavItems.map(item=>{
  const a=document.createElement('a');a.href=item.href;a.textContent=item.label;
  if(item.isCurrent(p))a.setAttribute('aria-current','page');
  return a;
 });
 nav.replaceChildren(...links);
});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');if(menu&&nav){menu.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));nav.addEventListener('click',e=>{if(e.target.matches('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}})}

if(/\/articles\/an-index-of-hindu-scripture\/?$/.test(p))css('scriptureIndexClean','/advaita/assets/css/scripture-index-clean.css?v=1');

const bhavishya=/\/(?:pages\/bhavishya-purana(?:\/|-)|articles\/(?:bhavishya-purana-|bhavisya-purana-addresses-varna-system))/.test(p);
if(bhavishya){css('bhavishyaNavigation','/advaita/assets/css/bhavishya-navigation.css?v=20260915-2');js('bhavishyaNavigation','/advaita/assets/js/bhavishya-navigation.js?v=20261004-1')}
const rebuild=document.querySelector('.empyrean-bhagavatam-rebuild,.empyrean-bhagavatam-rebuild-part');if(!rebuild)return;
document.body.classList.add('bhagavatam-rebuild-page');
if(/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(p)){
 document.body.classList.add('canto-2-verse-layout');
 document.querySelectorAll('section[aria-labelledby^="sb-2-"]').forEach(s=>{if(s.querySelector(':scope>.sb-translation,:scope>.sb-translation-content'))return;const d=s.querySelector(':scope>[lang="sa-Deva"],:scope>.sb-devanagari,:scope>.sb-dev'),n=d?.nextElementSibling;if(n&&!n.matches('details,hr,h1,h2,h3')&&!/Śrīdhara['’]s Commentary/i.test(n.textContent||''))n.classList.add('sb-translation')});
 css('canto2Layout','/advaita/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=11');js('canto2Renderer','/advaita/assets/js/bhagavatam-canto2.js?v=3');return;
}
css('bhagavatamRebuildStyles','/advaita/assets/css/bhagavatam-rebuild-all-verses.css?v=6');
})();
