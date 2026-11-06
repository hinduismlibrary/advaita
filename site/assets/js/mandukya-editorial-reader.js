(()=>{
"use strict";
const BASE="/advaita/books/adi-shankaracharya/mandukya-karika/";
/* The shared chrome script mounts before DOMContentLoaded. Keep its search
   infrastructure loaded, but use this reader's uncluttered masthead instead. */
document.addEventListener("DOMContentLoaded",()=>{
 const chrome=document.querySelector("body > header.site-header.vd-global-header");
 if(chrome)chrome.style.setProperty("display","none","important");
 refreshEditorialLinks();
},{once:true});

const DATA="/advaita/assets/data/shankara/mandukya-karika.json?v=editorial-reader-20261106";
const COLORS={1:"#276e70",2:"#526e9c",3:"#796490",4:"#a27a52"};
const root=document.getElementById("mk-reader");
if(!root)return;
const nav=document.getElementById("mk-chapter-nav");
const chapterNode=document.getElementById("mk-chapter-content");
const mobileLabel=document.getElementById("mk-mobile-label");
const toggle=document.getElementById("mk-mobile-toggle");
const sidebar=document.getElementById("mk-sidebar");
const scrim=document.getElementById("mk-scrim");
const toolPrev=document.getElementById("mk-tool-prev");
const toolNext=document.getElementById("mk-tool-next");
let activeId="",scrollQueued=false,articleNodes=[],indexLinks=[],size=1,chapterNo=1;
const $=(tag,cls,text)=>{
 const el=document.createElement(tag);
 if(cls)el.className=cls;
 if(text!==undefined)el.textContent=String(text);
 return el;
};
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function chapterLink(n,id){return BASE+"?chapter="+n+(id?"#"+encodeURIComponent(id):"");}
function hashId(){try{return decodeURIComponent(location.hash.replace(/^#/,""));}catch(_){return location.hash.replace(/^#/,"");}}
function initialChapter(){
 const p=new URLSearchParams(location.search);
 const c=Number(p.get("chapter"));
 if(Number.isInteger(c)&&c>=1&&c<=4)return c;
 const legacy=(p.get("unit")||"").match(/^mandukya-karika-(\d)-/);
 if(legacy)return Number(legacy[1]);
 const hash=hashId().match(/^mandukya-karika-(\d)-/);
 if(hash)return Number(hash[1]);
 return 1;
}
function forceLinkInk(link,color){
 link.style.setProperty("color",color,"important");
 link.style.setProperty("-webkit-text-fill-color",color,"important");
}
function refreshEditorialLinks(){
 document.querySelectorAll(".mk-local-nav a").forEach(a=>forceLinkInk(a,"#536b6c"));
 document.querySelectorAll(".mk-local-brand").forEach(a=>forceLinkInk(a,"#295553"));
 root.querySelectorAll(".mk-breadcrumb a").forEach(a=>forceLinkInk(a,"#718181"));
 root.querySelectorAll(".mk-verse-nav a").forEach(a=>forceLinkInk(a,"#728081"));
 root.querySelectorAll(".mk-inline-list a").forEach(a=>forceLinkInk(a,"#376e71"));
 root.querySelectorAll(".mk-chapter-switch a").forEach(a=>forceLinkInk(a,"#536f72"));
 root.querySelectorAll(".mk-tools-link, .mk-source a, .mk-pager-link").forEach(a=>forceLinkInk(a,"#467174"));
}
function sectionName(section){
 const pieces=String(section.title||"").split(/\s+[—–]\s+/);
 return {sanskrit:pieces.shift()||"Chapter "+section.id,english:pieces.join(" — ")};
}
function renderNav(data){
 nav.replaceChildren();
 data.sections.forEach((section)=>{
  const n=Number(section.id),items=data.units.filter(u=>Number(u.chapter)===n);
  const info=sectionName(section);
  const li=$("li","mk-chapter"+(n===chapterNo?" is-current":""));
  li.dataset.chapter=String(n);
  const a=$("a","mk-chapter-name");
  a.href=chapterLink(n);
  if(n===chapterNo)a.setAttribute("aria-current","page");
  a.innerHTML='<span class="mk-index">'+String(n).padStart(2,"0")+'</span><span class="mk-label">'+esc(info.sanskrit)+'</span>';
  li.append(a);
  if(n===chapterNo){
   const list=$("ol","mk-verse-nav");
   items.forEach(unit=>{
    const v=$("li");
    const link=$("a","",unit.number);
    link.href=chapterLink(n,unit.id);
    link.dataset.verseId=unit.id;
    link.setAttribute("aria-label","Go to verse "+unit.number);
    v.append(link);
    list.append(v);
   });
   li.append(list);
  }
  nav.append(li);
 });
}
function chapterHead(section,units){
 const info=sectionName(section),n=Number(section.id);
 const hero=$("section","mk-chapter-hero");
 hero.setAttribute("aria-label","Chapter "+n+" introduction");
 hero.innerHTML='<p class="mk-chapter-label mk-micro">Chapter '+n+' / 4 · '+units.length+' verses</p>'+
 '<h2>'+esc(info.sanskrit)+'</h2>'+
 '<p class="mk-chapter-english">'+esc(info.english)+'</p>'+
 '<p class="mk-chapter-summary">'+esc(section.description||"")+'</p>';
 const switcher=$("nav","mk-chapter-switch");
 switcher.setAttribute("aria-label","Choose chapter");
 switcher.append($("span","","Chapter"));
 dataChapterNumbers().forEach(other=>{
   const link=$("a","",["","I","II","III","IV"][other]);
   link.href=chapterLink(other);
   link.setAttribute("aria-label","Open chapter "+other);
   if(other===n)link.setAttribute("aria-current","page");
   switcher.append(link);
 });
 hero.append(switcher);
 return hero;
}
function dataChapterNumbers(){return [1,2,3,4];}
function contents(units){
 const section=$("nav","mk-inline-toc");
 section.id="contents";
 section.setAttribute("aria-label","Contents of this chapter");
 const header=$("div","mk-inline-toc-head");
 header.append($("h3","","Contents"));
 header.append($("p","mk-caption",units.length+" verses in this chapter"));
 const list=$("ol","mk-inline-list");
 units.forEach(unit=>{
  const li=$("li"),a=$("a","",unit.number);
  a.href="#"+encodeURIComponent(unit.id);
  a.dataset.verseId=unit.id;
  a.setAttribute("aria-label","Jump to verse "+unit.number);
  li.append(a);
  list.append(li);
 });
 section.append(header,list);
 return section;
}
function renderVerse(unit){
 const article=$("article","mk-verse");
 article.id=unit.id;
 article.setAttribute("aria-label","Verse "+unit.number);
 const h=$("h3","mk-verse-heading");
 const anchor=$("a","mk-verse-number",unit.number);
 anchor.href="#"+encodeURIComponent(unit.id);
 anchor.title="Link to verse "+unit.number;
 h.append($("span","mk-verse-word","Kārikā"),anchor);
 const deva=$("p","mk-deva",unit.deva);
 deva.lang="sa-Deva";
 const iast=$("p","mk-iast",String(unit.iast||"").replace(/\|/g,"|"));
 iast.lang="sa-Latn";
 const transLabel=$("p","mk-translation-label","Translation");
 const trans=$("p","mk-translation",unit.translation);
 const gloss=$("details","mk-gloss");
 gloss.setAttribute("aria-label","Word by word meaning for verse "+unit.number);
 const summary=$("summary","","Word for word");
 const glossary=$("div","mk-gloss-list");
 (unit.gloss||[]).forEach(row=>{
  const line=$("div","mk-gloss-row");
  const source=$("span","mk-gloss-sa",row.sa);
  source.lang="sa-Deva";
  const meaning=$("span","mk-gloss-en",row.en);
  line.append(source,meaning);
  glossary.append(line);
 });
 gloss.append(summary,glossary);
 article.append(h,deva,iast,transLabel,trans,gloss);
 return article;
}
function sourceBox(data){
 const source=data.source||{};
 const section=$("section","mk-source");
 section.setAttribute("aria-label","Edition and translation source");
 const h=$("h3","","About this edition");
 section.append(h);
 section.append($("p","","Sanskrit and English: "+(source.edition||"Māṇḍūkyakārikā")+". "+(source.english||"")));
 section.append($("p","",source.attribution||""));
 section.append($("p","",source.license||""));
 if(/^https:\/\//.test(source.url||"")){
  const p=$("p"),a=$("a","","Text and edition details");
  a.href=source.url;a.target="_blank";a.rel="noopener noreferrer";
  p.append(a);
  section.append(p);
 }
 return section;
}
function pager(){
 const item=$("nav","mk-chapter-pager");
 item.setAttribute("aria-label","Previous and next chapters");
 if(chapterNo>1){
  const prev=$("a","mk-pager-link");
  prev.href=chapterLink(chapterNo-1);
  prev.innerHTML='<small>Previous chapter</small>← Chapter '+(chapterNo-1);
  item.append(prev);
 }else item.append($("span"));
 if(chapterNo<4){
  const next=$("a","mk-pager-link");
  next.href=chapterLink(chapterNo+1);
  next.innerHTML='<small>Next chapter</small>Chapter '+(chapterNo+1)+' →';
  item.append(next);
 }
 return item;
}
function render(data){
 chapterNo=initialChapter();
 const section=data.sections.find(s=>Number(s.id)===chapterNo);
 if(!section)throw Error("Chapter metadata could not be found.");
 const units=data.units.filter(u=>Number(u.chapter)===chapterNo);
 if(!units.length)throw Error("No verses were found for that chapter.");
 root.style.setProperty("--mk-accent",COLORS[chapterNo]);
 mobileLabel.textContent="Chapter "+chapterNo+" of 4";
 toolPrev.hidden=chapterNo===1;
 toolNext.hidden=chapterNo===4;
 if(chapterNo>1)toolPrev.href=chapterLink(chapterNo-1);
 if(chapterNo<4)toolNext.href=chapterLink(chapterNo+1);
 renderNav(data);
 chapterNode.replaceChildren();
 chapterNode.append(chapterHead(section,units),contents(units));
 const reading=$("div","mk-reading-copy");
 units.forEach(unit=>reading.append(renderVerse(unit)));
 chapterNode.append(reading,sourceBox(data),pager());
 refreshEditorialLinks();
 articleNodes=[...chapterNode.querySelectorAll(".mk-verse")];
 indexLinks=[...root.querySelectorAll("[data-verse-id]")];
 document.title="Māṇḍūkyakārikā · Chapter "+chapterNo+" — Viveka Dṛṣṭi";
 const requested=hashId(),target=requested?document.getElementById(requested):null;
 if(target&&target.classList.contains("mk-verse")){
   requestAnimationFrame(()=>{target.scrollIntoView({block:"start"});queueScroll();});
 }else queueScroll();
}
function updateActive(){
 scrollQueued=false;
 if(!articleNodes.length)return;
 const threshold=Math.min(innerHeight*.38,255);
 let chosen=articleNodes[0].id;
 for(const article of articleNodes){
  if(article.getBoundingClientRect().top<=threshold)chosen=article.id;
  else break;
 }
 if(chosen===activeId)return;
 activeId=chosen;
 indexLinks.forEach(a=>{
  if(a.dataset.verseId===chosen){
   a.setAttribute("aria-current","location");
   forceLinkInk(a,COLORS[chapterNo]);
  }else{
   a.removeAttribute("aria-current");
   forceLinkInk(a,a.classList.contains("mk-verse-nav")?"#728081":(a.closest(".mk-verse-nav")?"#728081":"#376e71"));
  }
 });
 const activeSidebar=nav.querySelector('[data-verse-id="'+chosen+'"]');
 if(activeSidebar&&matchMedia("(min-width: 791px)").matches){
  const r=activeSidebar.getBoundingClientRect(),side=sidebar.getBoundingClientRect();
  if(r.bottom>side.bottom-20||r.top<side.top+35){
    sidebar.scrollTop+=r.top-side.top-Math.min(side.height*.35,220);
  }
 }
}
function queueScroll(){
 if(scrollQueued)return;
 scrollQueued=true;
 requestAnimationFrame(updateActive);
}
function closeMobile(){
 sidebar.classList.remove("is-open");
 scrim.classList.remove("is-open");
 toggle.setAttribute("aria-expanded","false");
 document.body.style.overflow="";
}
function openMobile(){
 sidebar.classList.add("is-open");
 scrim.classList.add("is-open");
 toggle.setAttribute("aria-expanded","true");
 document.body.style.overflow="hidden";
}
toggle.addEventListener("click",()=>{
 if(sidebar.classList.contains("is-open"))closeMobile();
 else openMobile();
});
scrim.addEventListener("click",closeMobile);
sidebar.addEventListener("click",event=>{
 if(event.target.closest("a"))closeMobile();
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape")closeMobile();
});
addEventListener("scroll",queueScroll,{passive:true});
addEventListener("resize",queueScroll);
addEventListener("hashchange",()=>{
 const target=document.getElementById(hashId());
 if(target?.classList.contains("mk-verse"))target.scrollIntoView({block:"start"});
 queueScroll();
});
const smaller=document.getElementById("mk-text-smaller");
const larger=document.getElementById("mk-text-larger");
function scaleReader(delta){
 size=Math.max(.85,Math.min(1.25,Math.round((size+delta)*100)/100));
 root.style.setProperty("--mk-scale",size.toFixed(2));
 smaller.disabled=size<=.85;
 larger.disabled=size>=1.25;
 queueScroll();
}
smaller.addEventListener("click",()=>scaleReader(-.1));
larger.addEventListener("click",()=>scaleReader(.1));
const error=(msg)=>{
 chapterNode.replaceChildren();
 chapterNode.append($("p","mk-error",msg));
};
fetch(DATA,{cache:"no-cache"})
 .then(res=>{if(!res.ok)throw Error("HTTP "+res.status);return res.json();})
 .then(data=>{
  if(data?.id!=="mandukya-karika"||!Array.isArray(data.units)||data.units.length!==215||
     !Array.isArray(data.sections)||data.sections.length!==4||
     data.units.some(u=>!u.id||!u.deva||!u.iast||!u.translation||!Array.isArray(u.gloss)||!u.gloss.length))
   throw Error("The Māṇḍūkyakārikā source data did not pass validation.");
  render(data);
 })
 .catch(ex=>{
  console.error("Māṇḍūkyakārikā reader:",ex);
  error("The text could not be loaded. Reload the page or return to the Advaita texts index.");
 });
})();
