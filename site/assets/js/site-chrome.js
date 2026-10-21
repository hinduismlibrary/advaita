(()=>{
"use strict";
if(window.__vivekaSiteChrome)return;
window.__vivekaSiteChrome=true;
const SITE="/advaita/";
const FAVICON=SITE+"favicon.svg";
const CSS=SITE+"assets/css/site-chrome.css?v=20261021-wiki-stack-1";

function addFavicon(){
  let icons=[...document.querySelectorAll('link[rel~="icon"]')];
  if(!icons.length){
    const icon=document.createElement("link");
    icon.rel="icon";
    icon.type="image/svg+xml";
    icon.href=FAVICON;
    document.head.append(icon);
    return;
  }
  icons.forEach(icon=>{
    icon.href=FAVICON;
    icon.type="image/svg+xml";
  });
}
function addStyles(){
  if(document.querySelector('link[data-viveka-site-chrome]'))return;
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href=CSS;
  link.dataset.vivekaSiteChrome="true";
  document.head.append(link);
}
function addFonts(){
  if(document.querySelector('link[data-viveka-site-fonts]'))return;
  const preconnect=document.createElement("link");
  preconnect.rel="preconnect";
  preconnect.href="https://fonts.googleapis.com";
  const preconnectFonts=document.createElement("link");
  preconnectFonts.rel="preconnect";
  preconnectFonts.href="https://fonts.gstatic.com";
  preconnectFonts.crossOrigin="anonymous";
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500&family=Tiro+Devanagari+Sanskrit&family=Vollkorn:wght@400;500;600&display=swap";
  link.dataset.vivekaSiteFonts="true";
  document.head.append(preconnect,preconnectFonts,link);
}
function currentTitle(){
  const raw=(document.title||"").trim();
  const title=raw.replace(/\s*[|–—-]\s*(?:Viveka\s+Dṛṣṭi|Viveka\s+Drishti)(?:\s*[|–—-].*)?$/i,"").trim();
  return title||document.querySelector("main h1,h1")?.textContent?.replace(/\s+/g," ").trim()||"Current page";
}
function normalizedPath(){
  let path=location.pathname.replace(/\/index\.html$/i,"/").replace(/\.html$/i,"/");
  path=path.replace(/\/+$/,"");
  return path||"/";
}
function routeTitle(path){
  const chapter=path.match(/\/chapter-(\d+)$/i);
  if(chapter)return "Chapter "+chapter[1];
  if(/\/articles\/purana-analysis$/.test(path))return "Purāṇa Attestation Heatmap";
  const chaturChapter=path.match(/\/books\/chaturvarnya\/chapter-(\d+)$/i);
  if(chaturChapter)return "Chapter "+chaturChapter[1];
  if(/\/books\/chaturvarnya$/.test(path))return "Chaturvarnya";
  if(/\/articles\/hinduism-on-women$/.test(path))return "Hinduism on Women";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti\/sources$/.test(path))return "Text sources";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti\/reader$/.test(path))return "Reader";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti$/.test(path))return "Mūlamadhyamakakārikā";
  if(path==="/advaita/articles")return "Writings";
  if(/\/search$/.test(path))return "Search";
  return currentTitle();
}
function makeCrumbs(path){
  if(path==="/advaita")return [];
  const home={label:"Home",href:SITE};
  const title=routeTitle(path);
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti(?:\/|$)/.test(path)){
    const parent="/advaita/articles/mulamadhyamakakarika-with-chandrakirti/";
    const chapter=path.match(/\/chapter-(\d+)$/i);
    const items=[home,{label:"Eastern Philosophy",href:SITE+"pages/introduction-to-eastern-philosophy/"},{label:"Mūlamadhyamakakārikā",href:parent}];
    if(chapter)items.push({label:"Chapter "+chapter[1]});
    else if(/\/sources$/.test(path))items.push({label:"Text sources"});
    else if(/\/reader$/.test(path))items.push({label:"Reader"});
    return items;
  }
  if(/\/articles\/purana-analysis$/.test(path))
    return [home,{label:"Purāṇa Library",href:SITE+"pages/purana-library/"},{label:title}];
  if(/\/articles\/hinduism-on-women$/.test(path))
    return [home,{label:"Introduction to Hinduism",href:SITE+"pages/introduction-to-hinduism/"},{label:title}];
  if(/\/contact$/.test(path))
    return [home,{label:"Contact"}];
  if(/\/search$/.test(path))
    return [home,{label:"Search"}];
  if(/\/articles\/(?:bhavishya-purana-|bhavisya-purana-addresses-varna-system|vishnu-purana-|srimad-bhagavatam-)/.test(path)||
     /\/pages\/(?:purana-library|vishnu-purana|bhagavatam-with-sridhara-bhasya|bhavishya-purana)/.test(path))
    return [home,{label:"Purāṇa Library",href:SITE+"pages/purana-library/"},{label:title}];
  if(/\/(?:articles\/bhagavad-gita-chapter-|pages\/bhagavad-gita)/.test(path))
    return [home,{label:"Bhagavad Gītā",href:SITE+"pages/bhagavad-gita/"},{label:title}];
  if(/\/books\/chaturvarnya(?:\/|$)/.test(path)){
    const chapter=path.match(/\/books\/chaturvarnya\/chapter-(\d+)$/i);
    const items=[home,{label:"Chaturvarnya",href:SITE+"books/chaturvarnya/"}];
    if(chapter)items.push({label:"Chapter "+chapter[1]});
    else items[1]={label:"Chaturvarnya"};
    return items;
  }
  if(/\/books(?:\/|$)/.test(path)){
    const bookIndex=SITE+"books/adi-shankaracharya/";
    return [home,{label:"Advaita Texts",href:bookIndex},{label:title}];
  }
  if(/\/articles\/varna-vicara$/.test(path)||/\/articles\/a-shashtric-lens-of-varna/.test(path))
    return [home,{label:"Varṇa",href:SITE+"#varna"},{label:title}];
  if(/\/articles(?:\/|$)/.test(path))
    return [home,{label:"Writings",href:SITE+"articles/"},{label:title}];
  if(/\/pages(?:\/|$)/.test(path))
    return [home,{label:"Sections",href:SITE},{label:title}];
  if(path==="/advaita/books"||path==="/advaita/books/adi-shankaracharya")
    return [home,{label:"Advaita Texts"}];
  return [home,{label:title}];
}
const TITLE_PAIRS={"A Scripture-Based Case for Viṣṇu Supremacy":"विष्णोः परात्परत्वे शास्त्रीयप्रमाणम्","A Scripture-Based Case for the Supremacy of Śiva":"शिवस्य परात्परत्वे शास्त्रीयप्रमाणम्","A Scripture-Based Case for the Validity of the Āgamas":"आगमानां शास्त्रीयप्रामाण्यम्","A Vaiṣṇava Lens on Viṣṇu as the Supreme Deity":"वैष्णवदृष्ट्या विष्णोः परात्परत्वम्","Advaita Stotrams":"अद्वैतस्तोत्राणि","Advaita Treatises":"अद्वैतप्रकरणानि","An Index of Hindu Scripture":"हिन्दुशास्त्राणाम् अनुक्रमणिका","Bhagavad Gītā Śrīdhara Bhāṣya":"श्रीमद्भगवद्गीता — श्रीधरभाष्यम्","Bhaviṣya Purāṇa Brāhmaparvan":"भविष्यपुराणम् — ब्रह्मपर्व","Bhaviṣya Purāṇa Brāhmaparvan Chapter Index":"भविष्यपुराणस्य ब्रह्मपर्वणः अध्यायानुक्रमणिका","Bhaviṣya Purāṇa Chapter 1 Introduction":"भविष्यपुराणस्य प्रथमाध्यायस्य परिचयः","Bhaviṣya Purāṇa Chapter Concordance":"भविष्यपुराणाध्यायसाम्यसूची","Bhaviṣya Purāṇa English Translation":"भविष्यपुराणम् — आङ्ग्लानुवादः","Bhāgavatam Canto 10 with Śrīdhara Svāmī":"श्रीमद्भागवतम् — दशमस्कन्धः, श्रीधरस्वामिव्याख्यासहितः","Bhāgavatam Canto 11 reader":"एकादशस्कन्धपाठः","Bhāgavatam Canto 12 reader":"द्वादशस्कन्धपाठः","Bhāgavatam Canto 2 with Śrīdhara Svāmī":"श्रीमद्भागवतम् — द्वितीयस्कन्धः, श्रीधरस्वामिव्याख्यासहितः","Bhāgavatam with Śrīdhara Bhāṣya":"श्रीमद्भागवतम् — श्रीधरभाष्यसहितम्","Bhāgavatam with Śrīdhara Bhāṣya Cantos 1–12":"श्रीमद्भागवतम् — श्रीधरभाष्यसहितम् (१–१२ स्कन्धाः)","Brahmasiddhi by Maṇḍana Miśra":"ब्रह्मसिद्धिः — मण्डनमिश्रकृता","Chapter I Arjuna Viṣāda Yoga Arjuna’s Despondency":"अर्जुनविषादयोगः","Chapter II Sāṅkhya Yoga The Yoga of Knowledge":"साङ्ख्ययोगः","Chapter III Karma Yoga The Yoga of Action":"कर्मयोगः","Chapter IV Jñāna Karma Sannyāsa Yoga Knowledge and Renunciation of Action":"ज्ञानकर्मसंन्यासयोगः","Chapter V Karma Sannyāsa Yoga The Yoga of Renunciation":"कर्मसंन्यासयोगः","Chapter VI Ātma Saṃyama Yoga The Yoga of Meditation":"आत्मसंयमयोगः","Chapter VII Jñāna Vijñāna Yoga Knowledge and Realization":"ज्ञानविज्ञानयोगः","Chapter VIII Akṣara Brahma Yoga The Imperishable Brahman":"अक्षरब्रह्मयोगः","Chapter IX Rāja Vidyā Rāja Guhya Yoga Royal Knowledge and Royal Secret":"राजविद्याराजगुह्ययोगः","Chapter X Vibhūti Yoga Divine Glories":"विभूतियोगः","Chapter XI Viśvarūpa Darśana Yoga The Vision of the Universal Form":"विश्वरूपदर्शनयोगः","Chapter XII Bhakti Yoga Devotion":"भक्तियोगः","Chapter XIII Kṣetra Kṣetrajña Vibhāga Yoga The Field and the Knower":"क्षेत्रक्षेत्रज्ञविभागयोगः","Chapter XIV Guṇatraya Vibhāga Yoga The Three Guṇas":"गुणत्रयविभागयोगः","Chapter XV Puruṣottama Yoga The Supreme Person":"पुरुषोत्तमयोगः","Chapter XVI Daivāsura Sampad Vibhāga Yoga Divine and Demonic Qualities":"दैवासुरसम्पद्विभागयोगः","Chapter XVII Śraddhātraya Vibhāga Yoga The Threefold Faith":"श्रद्धात्रयविभागयोगः","Chapter XVIII Mokṣa Sannyāsa Yoga Liberation through Renunciation":"मोक्षसंन्यासयोगः","Compilation of Peer-Reviewed Citations Against Aryan Migration Theory":"आर्यप्रवाससिद्धान्तस्य प्रतिवादे समीक्षितसन्दर्भसङ्कलनम्","Dṛg-dṛśya-viveka by Bhāratī Tīrtha":"भारतीतीर्थकृतः दृग्दृश्यविवेकः","Hinduism on Women Scriptural Analysis of Women’s Dharma":"हिन्दुधर्मे स्त्रीधर्मस्य शास्त्रीयविश्लेषणम्","Indology":"भारतविद्या","Introduction to Eastern Philosophy":"प्राच्यदर्शनपरिचयः","Introduction to Hinduism":"हिन्दुधर्मपरिचयः","Meat-eating in Hinduism through the lens of Śāstra":"शास्त्रदृष्ट्या हिन्दुधर्मे मांसभक्षणम्","Mūlamadhyamakakārikā with Candrakīrti’s Commentary":"मूलमध्यमककारिका — चन्द्रकीर्तिव्याख्यासह","Naiṣkarmyasiddhi by Sureśvara":"नैष्कर्म्यसिद्धिः — सुरेश्वरकृता","On the Lack of Steppe Ancestry and Haplogroups in Ancient Iranians":"प्राचीनपारसीकेषु स्तेपीयपूर्वजत्वस्य हैप्लोग्रूपाणां च अभावः","Pratisargaparvan Four-Part Chapter Index":"प्रतिसर्गपर्वणः चतुर्भागीयाध्यायानुक्रमणिका","Purāṇa Attestation Heatmap":"पुराणसाक्ष्यतापचित्रम्","Purāṇa Library":"पुराणग्रन्थालयः","Purāṇa Research Index":"पुराणानुसन्धानानुक्रमणिका","Short Advaita Texts":"अद्वैतलघुग्रन्थाः","Stotrams and Hymns by Ādi Śaṅkara":"आदिशङ्कराचार्यकृतानि स्तोत्राणि","Tattvabodha by Ādi Śaṅkara":"तत्त्वबोधः — आदिशङ्करकृतः","Vedāntasāra by Sadānanda Yogīndra":"वेदान्तसारः — सदानन्दयोगीन्द्रकृतः","Viṣṇu Purāṇa Śrīdhara Bhāṣya":"विष्णुपुराणम् — श्रीधरभाष्यम्","Ātmabodha by Ādi Śaṅkara":"आत्मबोधः — आदिशङ्करकृतः","Śrīmad Bhāgavatam Śrīdhara Bhāṣya":"श्रीमद्भागवतम् — श्रीधरभाष्यम्","Home":"मुखपृष्ठम्","Writings":"लेखाः","Advaita texts":"अद्वैतग्रन्थाः","Advaita Texts":"अद्वैतग्रन्थाः","Advaita Vedānta Portal":"अद्वैतवेदान्तः","Purāṇas":"पुराणानि","Search":"अन्वेषणम्","Search results":"अन्वेषणपरिणामाः","Text sources":"पाठस्रोतांसि","Reader":"पाठः","Eastern Philosophy":"प्राच्यदर्शनम्","Sections":"विभागाः","Viveka Dṛṣṭi":"विवेकदृष्टिः","Bhagavad Gītā":"श्रीमद्भगवद्गीता","Varṇa":"वर्णः","Chaturvarnya":"चातुर्वर्ण्यम्","Hinduism on Women":"हिन्दुधर्मे स्त्रीधर्मः","Mūlamadhyamakakārikā":"मूलमध्यमककारिका","Analysis of Texts":"ग्रन्थविश्लेषणम्","Documents":"निबन्धाः","Reference sections":"सन्दर्भविभागाः","Short Texts (under 50 verses)":"लघुग्रन्थाः","Summaries and Explanations (over 50 verses)":"सारव्याख्यानानि","Stotrams and Hymns":"स्तोत्राणि च स्तुतयः","Purāṇa Research":"पुराणानुसन्धानम्","Śrīmad Bhāgavatam":"श्रीमद्भागवतम्","Bhaviṣya Purāṇa":"भविष्यपुराणम्","Related Scripture":"सम्बद्धशास्त्राणि","Archaeogenetics and Migration":"पुरातनवंशविज्ञानं जनप्रवासश्च","Textual Reference":"ग्रन्थसन्दर्भः","Purāṇa Studies":"पुराणाध्ययनम्","Theology and Interpretation":"ईश्वरमीमांसा तथा व्याख्या","Contents":"विषयसूची"};
function normalizeLabel(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[–—:.,'’]/g," ").replace(/\s+/g," ").trim().toLowerCase();}
const TITLE_INDEX=new Map(Object.entries(TITLE_PAIRS).map(([english,devanagari])=>[normalizeLabel(english),devanagari]));
function devanagariFor(english){
 const key=normalizeLabel(english), mapped=TITLE_INDEX.get(key);
 if(mapped)return mapped;
 const chapter=key.match(/^chapter (\d+)$/);
 return chapter?"अध्यायः "+chapter[1].replace(/\d/g,d=>"०१२३४५६७८९"[Number(d)]):null;
}
function stackLabel(element,english,devanagari){
 if(!element||!english||!devanagari||element.dataset.vdBilingual==="true")return;
 const en=document.createElement("span");en.className="vd-label-en";en.lang="en";en.textContent=english;
 const sa=document.createElement("span");sa.className="vd-label-dev";sa.lang="sa-Deva";sa.textContent=devanagari;
 element.dataset.vdEnglish=english;element.dataset.vdBilingual="true";element.replaceChildren(en,sa);
}
function applyPageLabels(){
 const root=document.querySelector("main.site-main")||document.body;
 const elements=[...root.querySelectorAll("h1,h2,.hp-section-title,a"),...document.querySelectorAll(".site-footer p")];
 elements.forEach(element=>{
  if(element.closest(".vd-global-header")||element.dataset.vdBilingual==="true")return;
  let target=element;
  if(!element.matches("a")){const link=element.querySelector(":scope > a");if(link)target=link;}
  if(target.dataset.vdBilingual==="true")return;
  const english=target.textContent.replace(/\s+/g," ").trim();
  if(!english||target.querySelector("img,svg,button,small,sup,sub,.sr-only"))return;
  const devanagari=devanagariFor(english);if(devanagari)stackLabel(target,english,devanagari);
 });
}

function addLink(parent,href,label,current){
  const li=document.createElement("li");
  if(href){
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(a,label,devanagari);
    li.append(a);
  }else{
    const span=document.createElement("span");
    span.textContent=label;
    span.setAttribute("aria-current","page");
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(span,label,devanagari);
    li.append(span);
  }
  parent.append(li);
}
function makeHeader(path){
  const header=document.createElement("header");
  header.className="site-header vd-global-header";
  const row=document.createElement("div");
  row.className="vd-nav-wrap";
  const brand=document.createElement("a");
  brand.className="brand";
  brand.href=SITE;
  brand.textContent="Viveka Dṛṣṭi";
  stackLabel(brand,"Viveka Dṛṣṭi","विवेकदृष्टिः");
  const toggle=document.createElement("button");
  toggle.className="vd-menu-toggle";
  toggle.type="button";
  toggle.setAttribute("aria-expanded","false");
  toggle.setAttribute("aria-controls","vd-primary-nav");
  toggle.setAttribute("aria-label","Open navigation");
  toggle.innerHTML='<span></span><span></span><span></span>';
  const nav=document.createElement("nav");
  nav.className="site-nav vd-primary-nav";
  nav.id="vd-primary-nav";
  nav.setAttribute("aria-label","Primary navigation");
  const links=[
    [SITE,"Home",path==="/advaita"],
    [SITE+"articles/","Writings",/\/articles(?:\/|$)/.test(path)],
    [SITE+"books/adi-shankaracharya/","Advaita texts",/\/books\//.test(path)],
    [SITE+"pages/purana-library/","Purāṇas",/purana|bhagavatam|vishnu-purana/i.test(path)],
    [SITE+"pages/indology/","Indology",/indology|aryan-migration|steppe-ancestry/i.test(path)],
  ];
  links.forEach(([href,label,current])=>{
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    if(current)a.setAttribute("aria-current","page");
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(a,label,devanagari);
    nav.append(a);
  });
  const form=document.createElement("form");
  form.className="vd-search-form";
  form.action=SITE+"search/";
  form.method="get";
  form.setAttribute("role","search");
  const label=document.createElement("label");
  label.className="vd-visually-hidden";
  label.htmlFor="vd-site-search";
  label.textContent="Search Viveka Dṛṣṭi";
  const input=document.createElement("input");
  input.type="search";
  input.id="vd-site-search";
  input.name="q";
  input.placeholder="Search this site";
  input.required=true;
  input.autocomplete="off";
  const button=document.createElement("button");
  button.type="submit";
  button.textContent="Search";
  stackLabel(button,"Search","अन्वेषणम्");
  form.append(label,input,button);
  const navRow=document.createElement("div");
  navRow.className="vd-nav-subrow";
  navRow.append(nav);
  row.append(brand,toggle,form);
  header.append(row,navRow);
  const crumbs=makeCrumbs(path);
  if(crumbs.length){
    const crumbRow=document.createElement("div");
    crumbRow.className="vd-breadcrumb-row";
    const crumbNav=document.createElement("nav");
    crumbNav.className="vd-breadcrumb-inner";
    crumbNav.setAttribute("aria-label","Breadcrumb");
    const list=document.createElement("ol");
    crumbs.forEach((item,index)=>addLink(list,item.href,item.label,index===crumbs.length-1));
    crumbNav.append(list);
    crumbRow.append(crumbNav);
    header.append(crumbRow);
  }
  form.addEventListener("submit",event=>{
    const term=input.value.trim();
    if(!term){event.preventDefault();input.focus();return;}
    input.value=term;
  });
  toggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  nav.addEventListener("click",event=>{
    if(event.target.closest("a")){
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
      toggle.setAttribute("aria-label","Open navigation");
    }
  });
  return header;
}
function watchSearchResults(){
  const results=document.querySelector(".search-results");
  if(!results||results.dataset.vdLabelWatch==="true")return;
  results.dataset.vdLabelWatch="true";
  const observer=new MutationObserver(applyPageLabels);
  observer.observe(results,{childList:true,subtree:true});
}
function repairMmkLayout(path){
  if(!/\/articles\/mulamadhyamakakarika-with-chandrakirti(?:\/|$)/i.test(path))return;
  document.body.classList.remove("vp-book-1");
  document.querySelectorAll('link[rel~="stylesheet"][href*="vishnu-purana-chapter-reader.css"]').forEach(link=>link.remove());
}
function mount(){
  if(!document.head||!document.body)return false;
  repairMmkLayout(normalizedPath());
  addFavicon();
  addFonts();
  addStyles();
  document.body.classList.add("vd-chrome-page");
  let header=document.querySelector("body > header.site-header.vd-global-header");
  document.querySelectorAll("body > header.site-header, body > header.sitebar, body > header.topbar, body > header.ad-topbar").forEach(node=>{
    if(node!==header)node.remove();
  });
  if(!header){
    header=makeHeader(normalizedPath());
    document.body.prepend(header);
  }
  applyPageLabels();
  watchSearchResults();
  return true;
}
function init(){
  if(!mount()||window.__vivekaSiteChromeObserver)return;
  const observer=new MutationObserver(()=>{
    if(!document.querySelector("body > header.site-header.vd-global-header"))mount();
  });
  observer.observe(document.body,{childList:true});
  window.__vivekaSiteChromeObserver=observer;
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();