(()=>{
const p=location.pathname,dirs=[/^\/advaita\/articles\/?$/, /\/articles\/scripture\/?$/, /\/articles\/(?:scripture-index-version-3|an-index-of-hindu-scripture)\/?$/];
const article=/^\/advaita\/articles\//.test(p)&&!dirs.some(r=>r.test(p));
const vishnuSupremacy=/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(p);
const combinedBhavishya=/\/articles\/bhavisya-purana-addresses-varna-system\/?$/.test(p);
const mmkChapter=/\/articles\/mulamadhyamakakarika-with-chandrakirti\/chapter-\d+(?:\.html|\/(?:[^/]+\.html)?)?\/?$/.test(p);
const scripture=/\/articles\/(?:vishnu-purana-book-\d+-chapter-\d+|bhagavad-gita-chapter-\d+|bhavishya-purana-pratisargaparvan-part-\d+-chapter-\d+|bhavishya-purana-brahmaparvan-chapter-\d+|bhavisya-purana-addresses-varna-system|srimad-bhagavatam-(?:second|tenth)-canto-sridhara-svami-rebuild|srimad-bhagavatam-canto-\d{2}-sridhara-svami|mimamsa-sutras-sabara-bhasya-chapter-1)\/?$/.test(p);
// Viṣṇu Purāṇa WFW integrity guard: never display a full article translation as lexical data.
const vishnuPuranaRoute=/\/articles\/vishnu-purana-book-\d+-chapter-\d+(?:\/index\.html)?\/?$/.test(p);
if(vishnuPuranaRoute&&document.body)document.body.classList.add('vishnu-purana-reader');
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
// Keep Devanāgarī verses visible in the verse body and remove the extra disclosure.
const standardizeVishnuControls=()=>{
 if(!vishnuPuranaRoute)return;
 const cleanText=node=>String(node?.textContent||'').replace(/\s+/gu,' ').trim();
 const cleanSourceSeparators=value=>String(value||'')
  .replace(/([\u0900-\u097F])[-]*\.[-]*([\u0900-\u097F])/gu,'$1 $2')
  .replace(/(^|\s)[-]*\.[-]*(?=[\u0900-\u097F])/gu,'$1')
  .replace(/([A-Za-z\u00C0-\u024F])[-]*\.[-]*([A-Za-z\u00C0-\u024F])/gu,'$1 $2')
  .replace(/(^|\s)[-]*\.[-]*(?=[A-Za-z\u00C0-\u024F])/gu,'$1')
  .replace(/\s+/gu,' ').trim();
 const sridharaOnly=value=>cleanSourceSeparators(String(value||'')
  .split(/(?:विष्णुचित्त(?:ाचार्य)?ः?|viṣṇucitta(?:-?cārya)?ḥ?|vishnucitta(?:-?acharya)?)[\s\u200b]*[-–—:]/iu)[0]);
 const disclosure=(items,name)=>items.find(item=>
  new RegExp('^'+name+'$','i').test(cleanText(item.querySelector(':scope>summary'))));
 let chapterPreface=null;
 document.querySelectorAll('.gita-verse').forEach(verse=>{
  const controls=verse.querySelector(':scope>.gita-controls');
  if(!controls)return;
  const items=[...controls.children].filter(node=>node.matches('details.gita-details'));
  const transliteration=disclosure(items,'Transliteration');
  const devanagari=items.find(item=>item.classList.contains('gita-devanagari-details'))||disclosure(items,'Devanagari');
  const verseIast=cleanText(transliteration?.querySelector('.gita-dual-gita [lang="sa-Latn"]'));
  let commentaryDeva=sridharaOnly(cleanText(devanagari?.querySelector('.gita-dual-sridhara [lang="sa-Deva"]')));
  let commentaryIast=sridharaOnly(cleanText(transliteration?.querySelector('.gita-dual-sridhara p')));
  if(!chapterPreface&&commentaryDeva.startsWith('श्रीबिन्दुमाधवं वन्दे')){
   const devaBoundary=commentaryDeva.indexOf('जितं त इति');
   const iastBoundary=commentaryIast.search(/jitaṃ\s+ta\s+iti/iu);
   if(devaBoundary>0){
    chapterPreface={deva:commentaryDeva.slice(0,devaBoundary).trim(),iast:'',translations:[
     'I bow to Śrī Bindumādhava, whose form is supreme bliss; I bow to Vāc, Viśveśvara, and Gaṅgā, and to the sages headed by Parāśara.',
     'Having carefully examined the commentary called Ātmaprakāśa—composed by the eminent yogi Citsukha, clear, following his method, and an accessible digest—the ascetic Śrīdhara Svāmin, a bee at the lotus feet of his true teacher, will compose a good exposition on the essence of the glorious Viṣṇu Purāṇa, to purify his own understanding.',
     'Having seen the earlier commentaries on the glorious Viṣṇu Purāṇa, which are exceedingly extensive, this intermediate-length commentary is undertaken.',
     'The sage makes an auspicious beginning by means of an Upaniṣadic mantra framed as a salutation to the subject intended here.'
    ],glosses:[
     [['śrī-bindu-mādhavam','Śrī Bindumādhava (object of “I bow”)'],['vande','I bow to'],['paramānanda-vigraham','whose form is supreme bliss'],['vācam','Vāc, the goddess of speech'],['viśveśvaram','Viśveśvara'],['gaṅgām','Gaṅgā'],['parāśara-mukhān','headed by Parāśara'],['munīn','sages']],
     [['śrīmat-cit-sukha-yogi-mukhya-racita-vyākhyām','commentary composed by the eminent Citsukha yogi'],['nirīkṣya','having examined'],['sphuṭam','clearly'],['tan-mārgeṇa','by following that method'],['subodha-saṅgrahavatīm','containing an accessible digest'],['ātma-prakāśābhidhām','called Ātmaprakāśa'],['śrīmad-viṣṇu-purāṇa-sāra-vivṛtim','exposition on the essence of the glorious Viṣṇu Purāṇa'],['kartā','will compose'],['yatiḥ','the ascetic'],['śrīdhara-svāmī','Śrīdhara Svāmin'],['sad-guru-pāda-padma-madhu-paḥ','a bee at the lotus feet of his true teacher'],['sādhu','well'],['sva-dhī-śuddhaye','for the purification of his own understanding']],
     [['śrīmad-viṣṇu-purāṇasya','of the glorious Viṣṇu Purāṇa'],['vyākhyāḥ','commentaries'],['ati-vistarām','exceedingly extensive'],['prācām','of the earlier authors'],['ālokya','having seen'],['tat-vyākhyā','this commentary'],['madhyamā iyam','this intermediate-length one'],['vidhīyate','is undertaken']],
     [['asmin','in this'],['vivakṣitam','intended'],['yat tu vastu','whatever subject matter'],['tat-namanātmakam','of the nature of a salutation'],['muniḥ','the sage'],['mantra-upaniṣadā','by means of an Upaniṣadic mantra'],['kṛtam','made'],['badhnāti','sets / secures'],['maṅgalam','an auspicious beginning']]
    ]};
    if(iastBoundary>=0){chapterPreface.iast=commentaryIast.slice(0,iastBoundary).trim();commentaryIast=commentaryIast.slice(iastBoundary).trim()}else commentaryIast='';
    commentaryDeva=commentaryDeva.slice(devaBoundary).trim();
   }
  }
  const verseSanskrit=verse.querySelector(':scope>.gita-sanskrit');
  if(verseIast&&verseSanskrit&&!verse.querySelector(':scope>.gita-iast')){
   const line=document.createElement('p');
   line.className='gita-iast';
   line.lang='sa-Latn';
   line.textContent=verseIast;
   verseSanskrit.after(line);
  }
  if(commentaryDeva&&!verse.querySelector(':scope>.gita-sridhara-sanskrit-block')){
   const block=document.createElement('section');
   block.className='gita-sridhara-sanskrit-block';
   block.setAttribute('aria-label','Śrīdhara Sanskrit');
   const label=document.createElement('h3');
   label.className='gita-sridhara-source-label';
   label.textContent='Śrīdhara';
   const sanskrit=document.createElement('p');
   sanskrit.className='gita-sridhara-sanskrit';
   sanskrit.lang='sa-Deva';
   sanskrit.textContent=commentaryDeva;
   block.append(label,sanskrit);
   if(commentaryIast){
    const iast=document.createElement('p');
    iast.className='gita-sridhara-iast';
    iast.lang='sa-Latn';
    iast.textContent=commentaryIast;
    block.appendChild(iast);
   }
   const english=verse.querySelector(':scope>.gita-sridhara-translation');
   if(english)english.before(block);
   else controls.before(block);
  }
  items.filter(item=>item===transliteration||item===devanagari).forEach(item=>item.remove());
 });
 if(chapterPreface?.deva&&!document.querySelector('.gita-sridhara-chapter-preface')){
  const firstVerse=document.querySelector('.gita-verse');
  if(firstVerse){
   const section=document.createElement('section');
   section.className='gita-sridhara-sanskrit-block gita-sridhara-chapter-preface';
   section.setAttribute('aria-label','Śrīdhara’s opening verses');
   const heading=document.createElement('h3');
   heading.className='gita-sridhara-source-label';
   heading.textContent='Śrīdhara’s opening verses';
   section.appendChild(heading);
   const devaVerses=chapterPreface.deva.match(/[\s\S]*?॥[०-९]+॥/gu)||[chapterPreface.deva];
   const iastVerses=chapterPreface.iast.match(/[\s\S]*?\|\|\d+\|\|/gu)||[];
   devaVerses.forEach((text,index)=>{
    const verse=document.createElement('article');
    verse.className='gita-sridhara-preface-verse';
    const verseHeading=document.createElement('h4');
    verseHeading.className='gita-sridhara-preface-verse-label';
    verseHeading.textContent='Opening verse '+(index+1);
    const sanskrit=document.createElement('p');
    sanskrit.className='gita-sridhara-sanskrit';
    sanskrit.lang='sa-Deva';
    sanskrit.textContent=text.trim();
    verse.append(verseHeading,sanskrit);
    if(iastVerses[index]){
     const iast=document.createElement('p');
     iast.className='gita-sridhara-iast';
     iast.lang='sa-Latn';
     iast.textContent=iastVerses[index].trim();
     verse.appendChild(iast);
    }
    const translation=document.createElement('p');
    translation.className='gita-sridhara-body gita-sridhara-preface-translation';
    translation.textContent=chapterPreface.translations[index]||'';
    verse.appendChild(translation);
    const glosses=chapterPreface.glosses[index]||[];
    if(glosses.length){
     const details=document.createElement('details');
     details.className='gita-details';
     const summary=document.createElement('summary');
     summary.textContent='Word-for-word';
     const reveal=document.createElement('div');
     reveal.className='gita-reveal';
     glosses.forEach(([word,gloss])=>{
      const row=document.createElement('p');
      row.className='gita-wfw-list';
      row.textContent=word+' — '+gloss;
      reveal.appendChild(row);
     });
     details.append(summary,reveal);
     verse.appendChild(details);
    }
    section.appendChild(verse);
   });
   firstVerse.before(section);
  }
 }
};
standardizeVishnuControls();
if(vishnuPuranaRoute){
 document.querySelectorAll('.gita-no-commentary').forEach(node=>node.remove());
 document.querySelectorAll('.gita-sridhara-translation').forEach(section=>{
  const body=section.querySelector('.gita-sridhara-body');
  const text=String(body?.textContent||'').replace(/\s+/gu,' ').trim();
  if(/^no\s+(?:(?:separate|independent)\s+)?(?:śrīdhara\s+)?(?:commentary|translation)\b/iu.test(text))section.remove();
 });
}


const citation=/\/articles\/compilation-of-peer-reviewed-citations-against-aryan-migration-theory\/?$/.test(p),meat=/\/articles\/meat-eating-in-hinduism-through-the-lens-of-shastra\/?$/.test(p);
const css=(key,href)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.dataset[key]='1';document.head.append(l)};
const js=(key,src)=>{if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.async=false;s.dataset[key]='1';document.body.append(s)};
js('siteChrome','/advaita/assets/js/site-chrome.js?v=20261113-sridhara-reader-repair-6');
if(article){
 document.querySelectorAll('link[href*="/assets/css/hindupedia-site.css"]').forEach(n=>n.remove());
 if(mmkChapter){
  // MMK is already a complete, static chapter reader. Never load article pagination.
  document.body.classList.add('scripture-reader-page');
 }else if(vishnuSupremacy){
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
}else if(document.body.classList.contains('page-page'))css('hindupediaSite','/advaita/assets/css/hindupedia-site.css?build=20260826-2145');

const paths=new Map([
['/advaita/introduction-to-hinduism/','/advaita/pages/introduction-to-hinduism/'],['/advaita/indology/','/advaita/pages/indology/'],['/advaita/purana-library/','/advaita/pages/purana-library/'],['/advaita/bhagavatam-with-sridhara-bhasya/','/advaita/pages/bhagavatam-with-sridhara-bhasya/'],['/advaita/bhavishya-purana/','/advaita/pages/bhavishya-purana-brahmaparvan/'],['/advaita/bhavishya-purana-brahmaparvan/','/advaita/pages/bhavishya-purana-brahmaparvan/'],['/advaita/bhagavad-gita/','/advaita/pages/bhagavad-gita/']]);
document.querySelectorAll('a[href]').forEach(a=>{const x=paths.get(a.getAttribute('href'));if(x)a.href=x});
const primaryNavItems=[
 {href:'/advaita/',label:'Advaita Vedanta',isCurrent:path=>path==='/advaita/'},
 {href:'/advaita/pages/purana-library/',label:'Puranas',isCurrent:path=>/\/(?:pages\/(?:purana-library|vishnu-purana|bhagavatam-with-sridhara-bhasya|bhavishya-purana[^/]*)|articles\/(?:vishnu-purana-|bhavishya-purana-|bhavisya-purana-addresses-varna-system|srimad-bhagavatam-))/.test(path)},
 {href:'/advaita/pages/bhagavad-gita/',label:'Bhagavad Gita',isCurrent:path=>/\/(?:pages\/bhagavad-gita|articles\/bhagavad-gita-chapter-)/.test(path)},
 {href:'/advaita/#vaishnavism',label:'Vaishnavism',isCurrent:path=>/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(path)},
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

const enhanceMmkReader=()=>{
 if(!mmkChapter)return;
 document.querySelectorAll('.mmk-entry-status').forEach(status=>status.remove());
 const verseList=document.querySelector('.mmk-verse-list');
 if(verseList)verseList.classList.remove('mmk-verse-list--nested');
};
enhanceMmkReader();

const rebuild=document.querySelector('.empyrean-bhagavatam-rebuild,.empyrean-bhagavatam-rebuild-part');if(!rebuild)return;
document.body.classList.add('bhagavatam-rebuild-page');
if(/srimad-bhagavatam-second-canto-sridhara-svami-rebuild/.test(p)){
 document.body.classList.add('canto-2-verse-layout');
 document.querySelectorAll('section[aria-labelledby^="sb-2-"]').forEach(s=>{if(s.querySelector(':scope>.sb-translation,:scope>.sb-translation-content'))return;const d=s.querySelector(':scope>[lang="sa-Deva"],:scope>.sb-devanagari,:scope>.sb-dev'),n=d?.nextElementSibling;if(n&&!n.matches('details,hr,h1,h2,h3')&&!/Śrīdhara['’]s Commentary/i.test(n.textContent||''))n.classList.add('sb-translation')});
 css('canto2Layout','/advaita/assets/css/bhagavatam-canto2-verse-layout-v7.css?v=11');js('canto2Renderer','/advaita/assets/js/bhagavatam-canto2.js?v=3');return;
}
css('bhagavatamRebuildStyles','/advaita/assets/css/bhagavatam-rebuild-all-verses.css?v=6');
})();

