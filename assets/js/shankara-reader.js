(()=>{"use strict";
const WORKS=[
 {id:"nirvana-shatkam",title:"Nirvāṇaṣaṭkam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/nirvana-shatkam/"},
 {id:"maya-panchakam",title:"Māyāpañcakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/maya-panchakam/"},
 {id:"advaita-pancharatnam",title:"Advaitapañcaratnam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/advaita-pancharatnam/"},
 {id:"yati-panchakam",title:"Yatipañcakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/yati-panchakam/"},
 {id:"kashi-panchakam",title:"Kāśīpañcakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/kashi-panchakam/"},
 {id:"dakshinamurti-ashtakam",title:"Śrī Dakṣiṇāmūrtyaṣṭakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/dakshinamurti-ashtakam/"},
 {id:"shatpadi-stotram",title:"Viṣṇu Ṣaṭpadī Stotram",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/shatpadi-stotram/"},
 {id:"bhaja-govindam",title:"Bhajagovindam (Mohamudgara)",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/bhaja-govindam/"},
 {id:"manisha-panchakam",title:"Manīṣāpañcakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/manisha-panchakam/"},
 {id:"upadesha-panchakam",title:"Upadeśapañcakam",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/upadesha-panchakam/"},
 {id:"dashashloki",title:"Daśaślokī",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/dashashloki/"},
 {id:"ekashloki",title:"Ekaślokī",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/ekashloki/"},
 {id:"atma-bodha",title:"Ātmabodha",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/atma-bodha/"},
 {id:"tattvabodha",title:"Tattvabodha",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/tattvabodha/"},
 {id:"drg-drsya-viveka",title:"Dṛg-dṛśya-viveka",author:"Bhāratī Tīrtha",path:"/advaita/books/adi-shankaracharya/drg-drsya-viveka/"},
 {id:"hastamalaka-stotram",title:"Hastāmalaka-stotram",author:"Hastāmalaka",path:"/advaita/books/adi-shankaracharya/hastamalaka-stotram/"},
 {id:"panchikarana-prakarana",title:"Pañcīkaraṇa-prakaraṇa",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/panchikarana-prakarana/"},
 {id:"aparokshanubhuti",title:"Aparokṣānubhūti",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/aparokshanubhuti/"},
 {id:"panchadasi",title:"Pañcadaśī",author:"Vidyāraṇya",path:"/advaita/books/adi-shankaracharya/panchadasi/"},
 {id:"svsss",title:"Sarvavedāntasiddhāntasārasaṅgraha",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/svsss/"},
 {id:"vivekachudamani",title:"Vivekacūḍāmaṇi",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/vivekachudamani/"},
 {id:"mandukya-karika",title:"Māṇḍūkyakārikā",author:"Gauḍapāda",path:"/advaita/books/adi-shankaracharya/mandukya-karika/"},
 {id:"brahmajnanavali-mala",title:"Brahmajñānāvalīmālā",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/brahmajnanavali-mala/"},
 {id:"advaita-makaranda",title:"Advaitamakaranda",author:"Lakṣmīdhara Kavi",path:"/advaita/books/adi-shankaracharya/advaita-makaranda/"},
 {id:"atmavidya-vilasa",title:"Ātmavidyāvilāsa",author:"Sadāśiva Brahmendra",path:"/advaita/books/adi-shankaracharya/atmavidya-vilasa/"},
 {id:"prasthanabheda",title:"Prasthānabheda",author:"Madhusūdana Sarasvatī",path:"/advaita/books/adi-shankaracharya/prasthanabheda/"},
 {id:"upadesha-sahasri",title:"Upadeśasāhasrī",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/upadesha-sahasri/"},
 {id:"vedantasara",title:"Vedāntasāra",author:"Sadānanda Yogīndra",path:"/advaita/books/adi-shankaracharya/vedantasara/"},
 {id:"naishkarmya-siddhi",title:"Naiṣkarmyasiddhi",author:"Sureśvara",path:"/advaita/books/adi-shankaracharya/naishkarmya-siddhi/"},
 {id:"jivanmukti-viveka",title:"Jīvanmuktiviveka",author:"Vidyāraṇya",path:"/advaita/books/adi-shankaracharya/jivanmukti-viveka/"},
 {id:"brahma-siddhi",title:"Brahmasiddhi",author:"Maṇḍana Miśra",path:"/advaita/books/adi-shankaracharya/brahma-siddhi/"},
];
const PANCHADASI_CHAPTERS={1:"Tattva-viveka",2:"Pañca-mahā-bhūta-viveka",3:"Pañca-kośa-viveka",4:"Dvaita-viveka",5:"Mahā-vākya",6:"Citra-dīpa",7:"Tṛpti-dīpa",8:"Kūṭastha-dīpa",9:"Dhyāna-dīpa",10:"Nāṭa-dīpa",11:"Brahmānanda",12:"Ātmānanda",13:"Advaitānanda",14:"Vidyānanda",15:"Viṣayānanda"};
const SVSSS_SECTIONS={1:"Part 1 · The Topic of this Study and the Successful Student",2:"Part 2 · Identifying Only with Ultimate Reality",3:"Part 3 · Otherwise Mis-identifying with Untruth",4:"Part 4 · You are Only that Ultimate Reality",5:"Part 5 · Assimilating this Knowledge"};
const MANDUKYA_CHAPTERS={1:"Āgama-prakaraṇa",2:"Vaitathya-prakaraṇa",3:"Advaita-prakaraṇa",4:"Alāta-śānti-prakaraṇa"};
const READER_DATA_VERSION="reader-refresh-20261015c";
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]))}
function cleanAuthor(s){return String(s||"").replace(", traditional attribution","").trim()}
function chapterOf(unit,id){
 if(unit.chapter!==undefined&&unit.chapter!==null&&String(unit.chapter).trim())return String(unit.chapter);
 const parts=String(unit.id||"").split("-");
 if((id==="panchadasi"||id==="svsss")&&parts.length>2&&/^[0-9]+$/.test(parts[1]))return parts[1];
 const label=String(unit.label||"").toLowerCase();
 const marker=label.indexOf("chapter ");
 if(marker>=0){const token=label.slice(marker+8).split(" ")[0];if(/^[0-9]+$/.test(token))return token}
 return null;
}
function jivanGroup(unit){
 const match=String(unit.number||unit.label||"").match(/[0-9]+/),page=match?Number(match[0]):0;
 if(page<=9)return "Front matter · Pages 1–9";
 if(page<=40)return "Chapter I · On Liberation in This Life";
 if(page<=80)return "Chapter II · On the Destruction of Latent Desire";
 if(page<=115)return "Chapter III · On the Dissolution of Mind";
 if(page<=129)return "Chapter IV · The Aim of Self-realisation in This Life";
 if(page<=151)return "Chapter V · Renunciation-of-the-accomplished";
 if(page<=155)return "Glossary · Words Not Englished in the Text";
 return "Publisher’s catalogue · Pages 156–165";
}
function vedantasaraGroup(index){
 if(index<8)return "Opening · Anubandha-catuṣṭaya";
 if(index<19)return "Avidyā and its effects";
 if(index<24)return "Subtle body and sheaths";
 if(index<32)return "Pañcīkaraṇa and gross creation";
 if(index<37)return "Superimposition and negation";
 if(index<55)return "Mahāvākya and knowledge";
 if(index<62)return "Samādhi";
 return "Jīvanmukti";
}
function groupTitle(unit,index,id){
 if(id==="jivanmukti-viveka")return jivanGroup(unit);
 if(id==="vedantasara")return vedantasaraGroup(index);
 const chapter=chapterOf(unit,id);
 if(id==="panchadasi"&&chapter)return "Chapter "+chapter+(PANCHADASI_CHAPTERS[chapter]?": "+PANCHADASI_CHAPTERS[chapter]:"");
 if(id==="svsss"&&chapter)return SVSSS_SECTIONS[chapter]||unit.sectionTitle||("Part "+chapter);
 if(id==="mandukya-karika"&&chapter)return "Chapter "+chapter+": "+(MANDUKYA_CHAPTERS[chapter]||unit.sectionTitle||"");
 if(chapter&&unit.sectionTitle)return unit.sectionTitle;
 if(chapter)return (id==="naishkarmya-siddhi"?"Adhyāya ":"Chapter ")+chapter;
 return unit.sectionTitle||"Text";
}
function sectionGroups(units,id){
 const groups=[];
 units.forEach((unit,index)=>{
  const title=groupTitle(unit,index,id);
  let group=groups[groups.length-1];
  if(!group||group.title!==title){group={title:title,anchor:"section-"+id+"-"+(groups.length+1),items:[]};groups.push(group)}
  group.items.push({unit:unit,index:index});
 });
 return groups;
}
function contentsHTML(groups){
 return '<h2>Contents</h2><ol>'+groups.map(group=>'<li><a href="#'+esc(group.anchor)+'">'+esc(group.title)+'</a></li>').join("")+'</ol><a class="shankara-all-texts" href="/advaita/books/adi-shankaracharya/">All texts</a>';
}
function glossHTML(words){
 return words.map(word=>'<div class="gita-word-row"><span class="gita-word-dev" lang="sa-Deva">'+esc(word.sa)+'</span><span class="gita-word-gloss">'+esc(word.en)+'</span></div>').join("");
}
function paragraphsHTML(value){
 const nl=String.fromCharCode(10),cr=String.fromCharCode(13);
 return String(value||"").split(cr).join("").split(nl+nl).map(p=>p.trim()).filter(Boolean).map(p=>'<p class="gita-translation">'+esc(p.split(nl).join(" "))+'</p>').join("");
}
function unitHTML(unit,index,englishOnly){
 const number=unit.number||unit.label||String(index+1),label=unit.label||("Text "+(index+1));
 if(englishOnly)return '<article class="gita-verse shankara-verse shankara-english-unit" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><p class="shankara-unit-number">'+esc(number)+'</p>'+paragraphsHTML(unit.translation)+'</article>';
 const gloss=Array.isArray(unit.gloss)?unit.gloss.filter(word=>word&&word.sa&&word.en):[];
 const wordGloss=gloss.length?'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><div class="gita-word-list">'+glossHTML(gloss)+'</div></div></details>':"";
 const translation=unit.translation?paragraphsHTML(unit.translation):"";
 return '<article class="gita-verse shankara-verse" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><p class="shankara-unit-number">'+esc(number)+'</p><div class="gita-sanskrit sa-text" lang="sa-Deva">'+esc(unit.deva)+'</div>'+translation+wordGloss+'</article>';
}
function validData(data){
 if(!data||!Array.isArray(data.units)||!Number.isInteger(data.expectedUnits)||data.units.length!==data.expectedUnits||!data.units.length)return false;
 if(data.englishOnly)return data.units.every(unit=>unit&&unit.id&&unit.translation);
 return data.units.every(unit=>unit&&unit.id&&unit.deva&&Array.isArray(unit.gloss)&&(data.translationAvailable===false||unit.translation));
}
function readerErrorHTML(item){
 return '<header class="gita-hero"><h1>'+esc(item.title)+'</h1><p class="shankara-author">By '+esc(cleanAuthor(item.author))+'</p><p class="shankara-reader-error" role="alert">This text could not be loaded. <a href="/advaita/books/adi-shankaracharya/">All texts</a></p></header>';
}
function render(data,item,id){
 const groups=sectionGroups(data.units,id),englishOnly=Boolean(data.englishOnly);
 const side='<aside class="gita-contents shankara-contents" aria-label="Contents">'+contentsHTML(groups)+'</aside>';
 const header='<header class="gita-hero"><h1>'+esc(item.title)+'</h1><p class="shankara-author">By '+esc(cleanAuthor(item.author))+'</p></header>';
 const sections=groups.map(group=>'<section class="shankara-reader-section" id="'+esc(group.anchor)+'" aria-label="'+esc(group.title)+'"><h2 class="shankara-section-heading">'+esc(group.title)+'</h2>'+group.items.map(({unit,index})=>unitHTML(unit,index,englishOnly)).join("")+'</section>').join("");
 return '<div class="shankara-reading-grid">'+side+'<div class="shankara-reader-column">'+header+'<div class="shankara-unit-column">'+sections+'</div></div></div>';
}
async function start(root){
 const id=root.dataset.work,item=WORKS.find(work=>work.id===id);
 if(!item)return;
 root.setAttribute("aria-busy","true");
 try{
  const script=Array.from(document.scripts).find(node=>node.src&&node.src.indexOf("/assets/js/shankara-reader.js")>=0);
  const dataUrl=script?new URL("../data/shankara/"+encodeURIComponent(id)+".json",script.src):new URL("/advaita/assets/data/shankara/"+encodeURIComponent(id)+".json",location.origin);
  dataUrl.searchParams.set("v",READER_DATA_VERSION);
  const response=await fetch(dataUrl.href,{cache:"no-store"});
  if(!response.ok)throw new Error("Work data unavailable");
  const data=await response.json();
  if(!validData(data)||data.id!==id)throw new Error("Invalid local text data");
  document.title=item.title+" — "+cleanAuthor(item.author)+" — Viveka Dṛṣṭi";
  root.innerHTML=render(data,item,id);
 }catch(error){root.innerHTML=readerErrorHTML(item)}
 root.setAttribute("aria-busy","false");
}
function launch(){document.querySelectorAll("[data-shankara-reader]").forEach(start)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",launch);
else launch();
})();