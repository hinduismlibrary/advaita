(()=>{
"use strict";
if(window.__vivekaSiteChrome)return;
window.__vivekaSiteChrome=true;
const SITE="/advaita/";
const FAVICON=SITE+"favicon.svg";
const CSS=SITE+"assets/css/site-chrome.css?v=20261019-unified-theme-3";

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
  link.href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;500;600;700&family=Vollkorn:wght@400;500;600&display=swap";
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
function addLink(parent,href,label,current){
  const li=document.createElement("li");
  if(href){
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    li.append(a);
  }else{
    const span=document.createElement("span");
    span.textContent=label;
    span.setAttribute("aria-current","page");
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
    [SITE+"contact/","Contact",/\/contact$/.test(path)]
  ];
  links.forEach(([href,label,current])=>{
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    if(current)a.setAttribute("aria-current","page");
    nav.append(a);
  });
  const form=document.createElement("form");
  form.className="vd-search-form";
  form.action="https://www.google.com/search";
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
  form.append(label,input,button);
  row.append(brand,toggle,nav,form);
  header.append(row);
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
    input.value="site:krishnavyasmuni.github.io "+term;
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
function mount(){
  if(!document.head||!document.body)return false;
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