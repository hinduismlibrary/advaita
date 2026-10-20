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
 {id:"upadesha-sahasri",title:"Upadeśasāhasrī",author:"Ādi Śaṅkara",path:"/advaita/books/adi-shankaracharya/upadesha-sahasri/"},
 {id:"vedantasara",title:"Vedāntasāra",author:"Sadānanda Yogīndra",path:"/advaita/books/adi-shankaracharya/vedantasara/"},
 {id:"naishkarmya-siddhi",title:"Naiṣkarmyasiddhi",author:"Sureśvara",path:"/advaita/books/adi-shankaracharya/naishkarmya-siddhi/"},
{id:"brahma-siddhi",title:"Brahmasiddhi",author:"Maṇḍana Miśra",path:"/advaita/books/adi-shankaracharya/brahma-siddhi/"},
];

const STUDY_LAYOUT_WORKS=new Set(["aparokshanubhuti","vedantasara","svsss","mandukya-karika","brahma-siddhi","panchadasi","vivekachudamani","upadesha-sahasri","naishkarmya-siddhi","advaita-makaranda","atma-bodha","atmavidya-vilasa","brahmajnanavali-mala","drg-drsya-viveka","tattvabodha","nirvana-shatkam","maya-panchakam","advaita-pancharatnam","yati-panchakam","kashi-panchakam","dakshinamurti-ashtakam","shatpadi-stotram","bhaja-govindam","manisha-panchakam","hastamalaka-stotram"]);

const ABOUT={
 "nirvana-shatkam":"Six verses that loosen identification with body, mind, senses, and roles, pointing to the Self as awareness.",
 "maya-panchakam":"Five verses on how māyā makes non-dual reality appear divided and how knowledge clears that confusion.",
 "advaita-pancharatnam":"Five verses expressing the non-dual vision and recognition of the Self as Brahman.",
 "yati-panchakam":"Five verses on the discipline and clarity of a renunciate established in Self-knowledge.",
 "kashi-panchakam":"Five verses that interpret Kāśī and pilgrimage through the inward vision of the Self.",
 "dakshinamurti-ashtakam":"Eight verses on Dakṣiṇāmūrti as teacher and the world as an appearance in consciousness.",
 "shatpadi-stotram":"A short prayer to Viṣṇu asking for refuge, guidance, and freedom from ignorance.",
 "bhaja-govindam":"A devotional teaching poem urging discernment and freedom from attachment to what passes away.",
 "manisha-panchakam":"Five verses affirming that the knower of Brahman is worthy of reverence, regardless of social status.",
 "upadesha-panchakam":"Five verses outlining practical disciplines and inquiry for a seeker of liberation.",
 "dashashloki":"Ten verses describing the Self beyond the body, mind, and ordinary descriptions.",
 "ekashloki":"A single verse using waking and dream to point toward the one consciousness.",
 "atma-bodha":"A concise verse manual on Self-knowledge, using familiar examples to explain the distinction between Self and not-Self.",
 "tattvabodha":"An introductory guide to Vedānta terms, the three bodies, five sheaths, and discrimination between Self and not-Self.",
 "drg-drsya-viveka":"A compact inquiry that distinguishes the seer from the seen and follows perception back to awareness.",
 "hastamalaka-stotram":"Twelve verses describing immediate Self-knowledge through the image of a fruit resting in the palm.",
 "panchikarana-prakarana":"A brief prose teaching on the fivefold combination of elements and the formation of the perceptible world.",
 "aparokshanubhuti":"A verse text on immediate knowledge of the Self, with sections on qualification, discrimination, and contemplative practice.",
 "panchadasi":"A fifteen-chapter exposition of reality, consciousness, and bliss through a sequence of Advaita teachings.",
 "svsss":"A five-part summary of Vedānta covering preparation, self-knowledge, mistaken identity, and assimilation of the teaching.",
 "vivekachudamani":"A 580-verse teaching poem on discrimination, the qualifications of a seeker, and liberation.",
 "mandukya-karika":"Gauḍapāda’s 215 numbered verses on Om, the states of experience, and non-duality, in four chapters.",
 "brahmajnanavali-mala":"A garland of verses returning to the understanding that one's essential nature is Brahman.",
 "advaita-makaranda":"Twenty-eight verses on non-dual knowledge, combining direct inquiry with devotional address.",
 "atmavidya-vilasa":"A poetic teaching on the joy of Self-knowledge and the life of one established in it.",
 "upadesha-sahasri":"A systematic teaching on Self-knowledge presented through verse and prose.",
 "vedantasara":"A concise manual introducing the central structure and teachings of Vedānta.",
 "naishkarmya-siddhi":"Sureśvara’s sustained inquiry into knowledge, action, and liberation.",
"brahma-siddhi":"Maṇḍana Miśra’s major examination of Brahman, knowledge, and liberation.",

};
const PANCHADASI_CHAPTERS={1:"Tattva-viveka",2:"Pañca-mahā-bhūta-viveka",3:"Pañca-kośa-viveka",4:"Dvaita-viveka",5:"Mahā-vākya",6:"Citra-dīpa",7:"Tṛpti-dīpa",8:"Kūṭastha-dīpa",9:"Dhyāna-dīpa",10:"Nāṭa-dīpa",11:"Brahmānanda",12:"Ātmānanda",13:"Advaitānanda",14:"Vidyānanda",15:"Viṣayānanda"};
const cleanAuthor=s=>String(s||"").replace(/,\s*traditional attribution/ig,"").trim();
const SVSSS_SECTIONS={1:"Part 1 · The Topic of this Study and the Successful Student",2:"Part 2 · Identifying Only with Ultimate Reality",3:"Part 3 · Otherwise Mis-identifying with Untruth",4:"Part 4 · You are Only that Ultimate Reality",5:"Part 5 · Assimilating this Knowledge"};
const MANDUKYA_CHAPTERS={1:"Āgama-prakaraṇa",2:"Vaitathya-prakaraṇa",3:"Advaita-prakaraṇa",4:"Alāta-śānti-prakaraṇa"};
function aboutHTML(item){
 const summary=ABOUT[item.id];if(!summary)return "";
 let source="";
 if(item.id==="panchadasi")source='<p class="shankara-about-source">Sanskrit and English text: A.K. Aruna, <i>Pañca-Daśī</i> (2020); translations marked ** by Swami Swahananda, Sri Ramakrishna Math, Chennai. Licensed CC BY-NC-SA 4.0. This on-site reader groups six adjacent verse pairs as ranges; Sanskrit at 10.22–10.23 was checked against a second text witness. Word-for-word glosses cover Chapters 1–5 and Chapter 6 verses 1–180. Chapter 6 verses 181–290 and Chapters 7–15 still need separate glosses.</p>';
 if(item.id==="svsss")source='<p class="shankara-about-source">A.K. Aruna format and transcription (2020 v3.0); English translation adopted from Swami Tattwananda, Sri Ramakrishna Advaita Ashrama; Sanskrit prose order adopted from Pandit Rāmasvarūpaśarmā. Licensed CC BY-NC-SA 4.0. This on-site reader groups adjacent source verses where the English translation spans them. The source prose order is not presented as a word-for-word gloss.</p>';
 if(item.id==="vivekachudamani")source='<p class="shankara-about-source">English translation by Swami Madhavananda, Himalayan Series No. XLIII (1921), a public-domain edition. Sanskrit electronic witness from GRETIL, marked not proofread; normalized and converted from IAST to Devanāgarī for this reader. This reader includes all 580 numbered verses, with translations spanning adjacent verses shown as ranges. Editorial notes and index are excluded. No separate word-for-word lexical gloss is supplied.</p>';
 if(item.id==="mandukya-karika")source='<p class="shankara-about-source">A.K. Aruna format and transcription (2022 version 6.0); Kārikā verse translation adopted from Swami Nikhilananda; Devanāgarī text credited by the source edition to Śāradā Peetham, Sringeri. Licensed CC BY-NC-SA 4.0. This reader includes all 215 numbered Kārikā verses and excludes the Upaniṣad mantras, Śaṅkara Bhāṣya, and Ṭīkā glosses. Translations spanning adjacent Sanskrit verses are shown as numbered ranges. No separate word-for-word gloss is included.</p>';
 if(item.id==="upadesha-sahasri")source='<p class="shankara-about-source">Sanskrit and IAST from the GRETIL text, data entry by Ivan Andrijanić, based on Sengaku Mayeda’s edition (1973; 2006). Licensed CC BY-NC-SA 4.0. All 787 source-marked verse and prose passages have clear literal English readings and word-for-word glosses. Prose sections: II.1.1–II.1.44, II.2.45–II.2.111, and II.3.112–II.3.116.</p>';
 if(item.id==="vedantasara")source='<p class="shankara-about-source">Sanskrit text of Sadānanda Yogīndra’s work, distributed from a CC BY-SA 4.0 Wikisource edition. The complete local text includes prose and all 38 numbered source passages in this recension. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="naishkarmya-siddhi")source='<p class="shankara-about-source">Sanskrit Wikisource text, compiled and transliterated by the ERC-funded Intellexus project, under CC BY-SA 4.0. The complete four-chapter source is converted from IAST to Devanāgarī for this local reader. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="brahma-siddhi")source='<p class="shankara-about-source">Sanskrit from GRETIL, data entry by Diwakar Acharya, based on S. Kuppuswami Sastri’s 1937 edition. Licensed CC BY-NC-SA 4.0. This local reader contains the 231 source-marked passages present in that transcription, across Kāṇḍas 1, 2, and 4; it makes no claim for unrepresented sections. No English translation or word-for-word gloss is supplied.</p>';
 return '<details class="gita-details shankara-about"><summary>Info</summary><div class="shankara-about-copy"><p>'+esc(summary)+'</p>'+source+'</div></details>';
}
function chapterOf(unit,id){
 if(unit.chapter)return String(unit.chapter);
 const m=String(unit.id||"").match(/^(?:panchadasi|svsss)-(\d+)-/);
 if((id==="panchadasi"||id==="svsss")&&m)return m[1];
 const label=String(unit.label||"").match(/chapter\s+(\d+)/i);
 return label?label[1]:null;
}
function contentsHTML(units,id){
 const groups=[];
 units.forEach((unit,index)=>{
  const chapter=chapterOf(unit,id),section=String(unit.sectionTitle||"").trim();
  const key=section?"section:"+section:chapter?"chapter:"+chapter:"all";
  let group=groups[groups.length-1];
  if(!group||group.key!==key){
   let title=section||"";
   if(!title&&chapter){
    title=id==="panchadasi"&&PANCHADASI_CHAPTERS[chapter]?"Chapter "+chapter+": "+PANCHADASI_CHAPTERS[chapter]:
     id==="svsss"&&SVSSS_SECTIONS[chapter]?SVSSS_SECTIONS[chapter]:
     id==="mandukya-karika"&&MANDUKYA_CHAPTERS[chapter]?"Chapter "+chapter+": "+MANDUKYA_CHAPTERS[chapter]:"Chapter "+chapter;
   }
   group={key,title,items:[]};groups.push(group);
  }
  group.items.push({unit,index});
 });
 const links=(items)=>{
  if(items.length<=20)return items.map(({unit,index})=>'<li><a href="#'+esc(unit.id)+'">'+esc(unit.label||("Verse "+(unit.number||index+1)))+'</a></li>').join("");
  const size=items.length>200?50:items.length>100?25:10,rows=[];
  for(let i=0;i<items.length;i+=size){
   const part=items.slice(i,i+size),first=part[0],last=part[part.length-1];
   const start=first.unit.number||String(first.index+1),finish=last.unit.number||String(last.index+1);
   const type=first.unit.label&&/^Page/i.test(first.unit.label)?"Pages":first.unit.label&&/^Passage/i.test(first.unit.label)?"Passages":"Verses";
   rows.push('<li><a href="#'+esc(first.unit.id)+'">'+esc(type+" "+start+"–"+finish)+'</a></li>');
  }
  return rows.join("");
 };
 if(units.length<=20)return '<ol>'+links(units.map((unit,index)=>({unit,index})))+'</ol>';
 const descriptive=units.every(unit=>unit.label&&!/^(?:(?:chapter\s+\S+\s*[·:–-]\s*)?)(?:verses?|passages?|sections?|pages?|entries?)\s+\S+$/i.test(unit.label));
 if(descriptive)return '<ol>'+units.map(unit=>'<li><a href="#'+esc(unit.id)+'">'+esc(unit.label)+'</a></li>').join("")+'</ol>';
 if(groups.length===1&&groups[0].key==="all")return '<ol>'+links(groups[0].items)+'</ol>';
 return '<ol>'+groups.map(group=>{
  const first=group.items[0].unit,tail=group.items[group.items.length-1];
  const title=group.title||("Verses "+(first.number||group.items[0].index+1)+"–"+(tail.unit.number||tail.index+1));
  return '<li><a href="#'+esc(first.id)+'">'+esc(title)+'</a><ol>'+links(group.items)+'</ol></li>';
 }).join("")+'</ol>';
}
const TREATISE_READERS=new Set(["upadesha-sahasri","vedantasara","naishkarmya-siddhi","brahma-siddhi","panchadasi","svsss","mandukya-karika"]);
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
function treatiseGroups(units,id){
 const groups=[];
 units.forEach((unit,index)=>{
  let title;
  if(id==="vedantasara")title=vedantasaraGroup(index);
  else if(id==="panchadasi"){
   const chapter=chapterOf(unit,id);
   title="Chapter "+chapter+(PANCHADASI_CHAPTERS[chapter]?": "+PANCHADASI_CHAPTERS[chapter]:"");
  }else if(id==="svsss"){
   const chapter=chapterOf(unit,id);
   title=SVSSS_SECTIONS[chapter]||unit.sectionTitle||("Part "+chapter);
  }else if(id==="mandukya-karika"){
   const chapter=chapterOf(unit,id);
   title="Chapter "+chapter+": "+(MANDUKYA_CHAPTERS[chapter]||unit.sectionTitle||"");
  }else title=unit.sectionTitle||("Section "+(unit.chapter||""));
  let group=groups[groups.length-1];
  if(!group||group.title!==title){group={title,items:[],anchor:"treatise-"+id+"-section-"+(groups.length+1)};groups.push(group)}
  group.items.push({unit,index});
 });
 return groups;
}
function treatiseContentsHTML(groups){
 return '<nav class="gita-contents treatise-contents" aria-label="Contents"><h2>Contents</h2><ol class="treatise-chapter-list">'+groups.map(group=>{
  return '<li class="treatise-chapter-item"><a class="treatise-chapter-link" href="#'+esc(group.anchor)+'">'+esc(group.title)+'</a></li>';
 }).join("")+'</ol></nav>';
}function sourceVerseHTML(verse){
 const label=verse.label||("Verse "+(verse.number||"")),number=verse.number||"";
 const deva=String(verse.deva||""),transliteration=verse.iast||iast(deva),gloss=Array.isArray(verse.gloss)?verse.gloss:[];
 const wordGloss=gloss.length?'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><div class="gita-word-list">'+glossHTML(gloss)+'</div></div></details>':"";
 const translation=verse.translation?'<p class="gita-translation">'+esc(verse.translation)+'</p>':"";
 return '<article class="gita-verse shankara-verse jmv-source-verse" id="'+esc(verse.id)+'" aria-label="'+esc(label)+'"><h3>Verse '+esc(number)+'</h3><hr class="gita-verse-rule"/><div class="gita-sanskrit sa-text" lang="sa-Deva" data-iast="'+esc(transliteration)+'">'+breakLines(deva)+'</div><p class="jmv-literal-label">Literal translation</p>'+translation+'<div class="gita-controls">'+wordGloss+'<details class="gita-details shankara-transliteration"><summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(transliteration)+'</p></div></details></div></article>';
}
function treatiseUnitHTML(unit,index,englishOnly){
 const label=unit.label||("Passage "+(index+1)),number=unit.number||String(index+1);
 if(englishOnly){
  const paragraphs=String(unit.translation||"").split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).map(p=>'<p class="gita-translation">'+esc(p.replace(/\r?\n/g," "))+'</p>').join("");
  const verses=Array.isArray(unit.verses)?unit.verses:[];
  const verseRange=verses.length?("Verses "+verses[0].number+"–"+verses[verses.length-1].number):"";
  const literalSection=verses.length?'<section class="jmv-literal-section" aria-label="Sanskrit and literal translations"><h3>Chapter I · '+esc(verseRange)+'</h3>'+verses.map(sourceVerseHTML).join("")+'</section>':"";
  const legacySection=paragraphs?'<section class="jmv-1897-section" aria-label="1897 English edition"><h3>1897 English edition</h3>'+paragraphs+'</section>':"";
  return '<article class="gita-verse shankara-verse shankara-english-unit" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(number)+'</h2><hr class="gita-verse-rule"/>'+literalSection+legacySection+'</article>';
 }
 const deva=String(unit.deva||"");
 const transliteration=unit.iast||iast(deva);
 const isLong=deva.length>260||/\n/.test(deva);
 const classes="gita-sanskrit sa-text"+(isLong?" treatise-long-text":"");
 const gloss=Array.isArray(unit.gloss)?unit.gloss:[];
 const wordGloss=gloss.length?'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><div class="gita-word-list">'+glossHTML(gloss)+'</div></div></details>':"";
 const translation=unit.translation?'<p class="gita-translation">'+esc(unit.translation)+'</p>':"";
 return '<article class="gita-verse shankara-verse'+(isLong?" treatise-long-unit":"")+'" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(number)+'</h2><hr class="gita-verse-rule"/><div class="'+classes+'" lang="sa-Deva" data-iast="'+esc(transliteration)+'">'+breakLines(deva)+'</div>'+translation+'<div class="gita-controls">'+wordGloss+'<details class="gita-details shankara-transliteration"><summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(transliteration)+'</p></div></details></div></article>';
}
function treatiseReaderHTML(data,item,id){
 const groups=treatiseGroups(data.units,id);
 const byline='By '+esc(cleanAuthor(item.author));
 const header='<header class="gita-hero"><h1>'+esc(item.title)+'</h1><p class="shankara-author">'+byline+'</p>'+aboutHTML(item)+'<p><a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">← Advaita texts</a></p></header>';
 const contents=treatiseContentsHTML(groups);
 const sections=groups.map(group=>{
  const heading='<h2 class="shankara-section-heading" id="'+esc(group.anchor)+'">'+esc(group.title)+'</h2>';
  const entries=group.items.map(({unit,index})=>treatiseUnitHTML(unit,index,data.englishOnly)).join("");
  return '<section class="treatise-reader-section" aria-label="'+esc(group.title)+'">'+heading+entries+'</section>';
 }).join("");
 return '<div class="shankara-reading-grid">'+header+contents+'<div class="shankara-unit-column">'+sections+navHTML(id)+'</div></div>';
}
function enhanceFallback(root,item){
 const author=root.querySelector(".shankara-author");
 if(author&&item.author)author.textContent="By "+cleanAuthor(item.author);
 const hero=root.querySelector(".gita-hero"),controls=hero?.querySelector(".script-controls");
 if(hero&&!hero.querySelector(".eyebrow"))hero.insertAdjacentHTML("afterbegin",'<p class="eyebrow">Advaita Treatises</p>');
 if(hero&&!hero.querySelector(".shankara-about"))controls?.insertAdjacentHTML("beforebegin",aboutHTML(item));
 root.querySelectorAll(".shankara-unit-label").forEach(label=>label.remove());
 root.querySelectorAll(".shankara-word-gloss").forEach(details=>{if(!details.querySelector(".gita-word-row"))details.remove()});
 const nav=root.querySelector(".gita-contents");
 if(nav&&!nav.querySelector(".shankara-chapter")){
  const links=[...nav.querySelectorAll("li a")].map(a=>({id:(a.getAttribute("href")||"").replace(/^#/,""),label:a.textContent.trim()})).filter(x=>x.id);
  if(links.length)nav.innerHTML='<h2>Contents</h2>'+contentsHTML(links,item.id);
 }
 if(!root.querySelector(".shankara-work-nav"))root.insertAdjacentHTML("beforeend",navHTML(item.id));
}
const VOWELS={"अ":"a","आ":"ā","इ":"i","ई":"ī","उ":"u","ऊ":"ū","ऋ":"ṛ","ॠ":"ṝ","ऌ":"ḷ","ॡ":"ḹ","ए":"e","ऐ":"ai","ओ":"o","औ":"au"};
const SIGNS={"ा":"ā","ि":"i","ी":"ī","ु":"u","ू":"ū","ृ":"ṛ","ॄ":"ṝ","ॢ":"ḷ","ॣ":"ḹ","े":"e","ै":"ai","ो":"o","ौ":"au"};
const CONS={"क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"ṅ","च":"c","छ":"ch","ज":"j","झ":"jh","ञ":"ñ","ट":"ṭ","ठ":"ṭh","ड":"ḍ","ढ":"ḍh","ण":"ṇ","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"ś","ष":"ṣ","स":"s","ह":"h","ळ":"ḷ"};
function iast(s){
 let out="",last=false;
 for(const ch of String(s)){
  if(CONS[ch]){out+=CONS[ch]+"a";last=true}
  else if(SIGNS[ch]){if(last)out=out.slice(0,-1);out+=SIGNS[ch];last=false}
  else if(ch==="्"){if(last)out=out.slice(0,-1);last=false}
  else if(VOWELS[ch]){out+=VOWELS[ch];last=false}
  else if(ch==="ं")out+="ṃ";
  else if(ch==="ः")out+="ḥ";
  else if(ch==="ँ")out+="m̐";
  else if(ch==="ऽ")out+="’";
  else if(ch==="॥")out+="||";
  else if(ch==="।")out+="|";
  else if(ch==="॥")out+="||";
  else if(/[०-९]/.test(ch))out+=String("0123456789")["०१२३४५६७८९".indexOf(ch)];
  else if(ch==="‍"||ch==="‌"){}
  else {out+=ch;last=false}
 }
 return out;
}
function esc(s){return String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]))}
function complete(data){
 if(!data||!Array.isArray(data.units)||!Number.isInteger(data.expectedUnits)||data.units.length!==data.expectedUnits||!data.units.length)return false;
 if(data.englishOnly)return data.units.every(u=>u&&u.id&&u.translation);
 return data.units.every(u=>u&&u.id&&u.deva&&Array.isArray(u.gloss)&&u.gloss.every(w=>w&&w.sa&&w.en)&&(data.translationAvailable===false||u.translation));
}
function glossHTML(words){return words.map(w=>'<div class="gita-word-row"><span class="gita-word-source"><span class="gita-word-dev" lang="sa-Deva">'+esc(w.sa)+'</span> <span class="gita-word-iast">('+esc(iast(w.sa))+')</span></span><span class="gita-word-separator" aria-hidden="true"> — </span><span class="gita-word-gloss">'+esc(w.en)+'</span></div>').join("")}
function normalizeGlossMarkup(wordList){
 if(!wordList)return;
 wordList.querySelectorAll(".gita-word-row").forEach(function(row){
  const devanagari=row.querySelector(".gita-word-dev"),gloss=row.querySelector(".gita-word-gloss");
  if(!devanagari||!gloss)return;
  let source=row.querySelector(".gita-word-source");
  if(!source){source=document.createElement("span");source.className="gita-word-source";row.insertBefore(source,gloss);source.append(devanagari);}
  if(!source.querySelector(".gita-word-iast")){
   const roman=document.createElement("span");roman.className="gita-word-iast";roman.textContent="("+iast(devanagari.textContent.trim())+")";
   source.append(document.createTextNode(" "),roman);
  }
  if(!row.querySelector(".gita-word-separator")){
   const separator=document.createElement("span");separator.className="gita-word-separator";separator.setAttribute("aria-hidden","true");separator.textContent=" — ";row.insertBefore(separator,gloss);
  }
 });
}
function unitHTML(u,index,englishOnly,translationAvailable){
 const label=u.label||("Verse "+(index+1));
 if(englishOnly){
  const paragraphs=String(u.translation||"").split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).map(p=>'<p class="gita-translation">'+esc(p.replace(/\n/g," "))+'</p>').join("");
  return '<article class="gita-verse shankara-verse shankara-english-unit" id="'+esc(u.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(u.number||String(index+1))+'</h2><hr class="gita-verse-rule"/>'+paragraphs+'</article>';
 }
 const transliteration=u.iast||iast(u.deva);
 const gloss=Array.isArray(u.gloss)?u.gloss:[];
 const wordGloss=gloss.length?'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><div class="gita-word-list">'+glossHTML(gloss)+'</div></div></details>':"";
 const translation=u.translation?'<p class="gita-translation">'+esc(u.translation)+'</p>':"";
 return '<article class="gita-verse shankara-verse" id="'+esc(u.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(u.number||String(index+1))+'</h2><hr class="gita-verse-rule"/><div class="gita-sanskrit sa-text" lang="sa-Deva" data-iast="'+esc(transliteration)+'">'+esc(u.deva)+'</div>'+translation+'<div class="gita-controls">'+wordGloss+'<details class="gita-details shankara-transliteration"><summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(transliteration)+'</p></div></details></div></article>';
}
function navHTML(id){
 const i=WORKS.findIndex(w=>w.id===id),prev=WORKS[i-1],next=WORKS[i+1];
 return '<nav class="shankara-work-nav" aria-label="Work navigation">'+(prev?'<a rel="prev" href="'+prev.path+'">← '+esc(prev.title)+'</a>':'<span></span>')+'<a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">Advaita Treatises</a>'+(next?'<a rel="next" href="'+next.path+'">'+esc(next.title)+' →</a>':'<span></span>')+'</nav>';
}
function makeStudyButton(label,panel,expanded,available){
 const button=document.createElement("button");
 button.type="button";
 button.className="shankara-study-button"+(expanded?" is-active":"");
 button.textContent=label;
 button.setAttribute("aria-controls",panel.id);
 button.setAttribute("aria-expanded",expanded?"true":"false");
 if(typeof available==="boolean")button.dataset.available=available?"true":"false";
 button.addEventListener("click",function(){
  const willOpen=panel.hidden;
  panel.hidden=!willOpen;
  button.setAttribute("aria-expanded",willOpen?"true":"false");
  button.classList.toggle("is-active",willOpen);
 });
 return button;
}
function bindStudyControls(root){
 const cards=Array.from(root.querySelectorAll(".gita-verse,.shankara-verse"));
 let total=0,available=0;
 cards.forEach(function(card,index){
  if(card.dataset.studyControls==="true"){
   const existing=card.querySelector(".shankara-word-panel");
   if(existing){total++;if(existing.dataset.available==="true")available++;return;}
   delete card.dataset.studyControls;
  }
  const source=Array.from(card.children).find(function(node){return node.matches(".gita-sanskrit");})||card.querySelector(".gita-sanskrit");
  if(!source)return;
  const translations=Array.from(card.children).filter(function(node){return node.matches(".gita-translation");});
  const oldControls=Array.from(card.children).find(function(node){return node.matches(".gita-controls");})||card.querySelector(".gita-controls");
  let wordDetails=oldControls?oldControls.querySelector(".shankara-word-gloss"):null;
  if(!wordDetails)wordDetails=card.querySelector(".shankara-word-gloss");
  let wordList=wordDetails?wordDetails.querySelector(".gita-word-list"):null;
  if(!wordList)wordList=card.querySelector(".gita-word-list");
  if(!wordList){
   const rows=Array.from(card.querySelectorAll(".gita-word-row"));
   if(rows.length){
    wordList=document.createElement("div");
    wordList.className="gita-word-list";
    const first=rows[0],parent=first.parentElement||card;
    parent.insertBefore(wordList,first);
    rows.forEach(function(row){wordList.appendChild(row);});
   }
  }
  normalizeGlossMarkup(wordList);
  const hasGloss=Boolean(wordList&&wordList.querySelector(".gita-word-row"));
  total++;
  if(hasGloss)available++;
  const idBase=(card.id||("entry-"+(index+1))).replace(/[^a-zA-Z0-9_-]/g,"-");
  const transliteration=String(source.getAttribute("data-iast")||iast(source.textContent||"")).replace(/\|/g,"\n").trim();
  const controls=document.createElement("div");
  controls.className="shankara-study-controls";
  const row=document.createElement("div");
  row.className="shankara-study-button-row";
  const transliterationPanel=document.createElement("div");
  transliterationPanel.className="shankara-study-panel shankara-transliteration-panel";
  transliterationPanel.id="shankara-transliteration-"+idBase;
  transliterationPanel.setAttribute("role","region");
  transliterationPanel.setAttribute("aria-label","Transliteration");
  transliterationPanel.hidden=true;
  if(transliteration){
   const transliterationText=document.createElement("p");
   transliterationText.className="shankara-iast";
   transliterationText.lang="sa-Latn";
   transliterationText.textContent=transliteration;
   transliterationPanel.append(transliterationText);
   row.append(makeStudyButton("Transliteration",transliterationPanel,false,true));
  }
  const wordPanel=document.createElement("div");
  wordPanel.className="shankara-study-panel shankara-word-panel";
  wordPanel.id="shankara-word-for-word-"+idBase;
  wordPanel.dataset.available=hasGloss?"true":"false";
  wordPanel.setAttribute("role","region");
  wordPanel.setAttribute("aria-label","Word for Word");
  wordPanel.hidden=true;
  row.append(makeStudyButton("Word for Word",wordPanel,false,hasGloss));
  controls.append(row);
  if(transliteration)controls.append(transliterationPanel);
  controls.append(wordPanel);
  const insertionPoint=translations.length?translations[translations.length-1].nextElementSibling:source.nextElementSibling;
  if(insertionPoint&&insertionPoint.parentElement===card)card.insertBefore(controls,insertionPoint);
  else card.append(controls);
  if(hasGloss)wordPanel.append(wordList);
  else{
   const missing=document.createElement("p");
   missing.className="shankara-word-missing";
   missing.textContent="A word-for-word gloss is not available for this entry yet.";
   wordPanel.append(missing);
  }
  if(wordDetails)wordDetails.remove();
  if(oldControls){
   Array.from(oldControls.querySelectorAll(".shankara-expanded-translation")).forEach(function(detail){
    Array.from(detail.querySelectorAll(".gita-translation")).forEach(function(paragraph){
     card.insertBefore(paragraph,controls);
    });
   });
   oldControls.remove();
  }
  Array.from(card.children).filter(function(node){return node.matches(".shankara-literal-label,.jmv-literal-label");}).forEach(function(node){node.remove();});
  card.dataset.studyControls="true";
 });
 return {total:total,available:available};
}
window.ShankaraReaderControls={apply:bindStudyControls};
function bindScript(root){
 root.dataset.scriptMode="deva";
 root.querySelectorAll(".script-controls").forEach(node=>node.remove());
 root.querySelectorAll(".gita-verse,.shankara-verse").forEach(article=>{
  const source=article.querySelector(":scope > .gita-sanskrit");
  if(!source||article.querySelector(".shankara-transliteration"))return;
  const text=source.getAttribute("data-iast")||iast(source.textContent||"");
  if(!source.hasAttribute("data-iast"))source.setAttribute("data-iast",text);
  const details=document.createElement("details");
  details.className="gita-details shankara-transliteration";
  details.innerHTML='<summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(text)+'</p></div>';
  let controls=article.querySelector(":scope > .gita-controls");
  if(!controls){
   controls=document.createElement("div");
   controls.className="gita-controls";
   const after=article.querySelector(":scope > .gita-translation")||source;
   after.insertAdjacentElement("afterend",controls);
  }
  controls.appendChild(details);
 });
 if(STUDY_LAYOUT_WORKS.has(root.dataset.work)){
  const counts=bindStudyControls(root);
  const hero=root.querySelector(".gita-hero");
  if(hero&&counts.total){
   let note=hero.querySelector(".shankara-reader-coverage");
   if(!note){note=document.createElement("p");note.className="shankara-reader-coverage";hero.append(note);}
   note.textContent=counts.available===counts.total
    ?"Word for Word glosses are available for all "+counts.total+" entries."
    :"Word for Word glosses are available for "+counts.available+" of "+counts.total+" entries; the rest are marked individually.";
  }
 }else root.querySelectorAll(".shankara-reader-coverage").forEach(node=>node.remove());
}
function selectedTreatiseSection(groups,search){
 const requested=Number(new URLSearchParams(search||"").get("section")||"1");
 return Number.isInteger(requested)&&requested>=1&&requested<=groups.length?requested-1:0;
}
function bindTreatiseNavigation(root){
 root.querySelectorAll("[data-treatise-section]").forEach(select=>select.addEventListener("change",()=>{
  if(select.value)location.href=select.value;
 }));
}
const READER_DATA_VERSION="reader-contents-20261020c";
function readerErrorHTML(item,fallback){
 const retry=esc(location.pathname+location.search);
 if(fallback)return '<p class="shankara-reader-error" role="alert">The complete local text could not be loaded. The embedded edition is shown below; reload to try the complete reader again. <a href="'+retry+'">Reload this text</a> · <a href="/advaita/books/adi-shankaracharya/">Advaita Treatises</a></p>';
 return '<header class="gita-hero"><p class="eyebrow">Advaita Treatises</p><h1>'+esc(item.title)+'</h1><p class="shankara-reader-error" role="alert">The locally stored text could not be loaded. Check the connection and reload this page. <a href="'+retry+'">Reload this text</a></p><p><a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">Advaita Treatises</a></p></header>';
}
async function start(root){
 const id=root.dataset.work,item=WORKS.find(w=>w.id===id);
 if(!item)return;
 const hasStaticText=Boolean(root.querySelector(".gita-verse,.shankara-verse"));
 // Keep embedded verse HTML as a no-JavaScript fallback, but refresh it from the checked-in reader data when JavaScript runs.
 root.setAttribute("aria-busy","true");
 bindScript(root);
 if(!hasStaticText){
  const hero=root.querySelector(".gita-hero");
  const status='<p class="gita-loading shankara-loading-status" role="status" aria-live="polite">Loading the complete text stored on this site…</p>';
  if(!root.querySelector(".shankara-loading-status")){if(hero)hero.insertAdjacentHTML("afterend",status);else root.insertAdjacentHTML("afterbegin",status)}
 }
 try{
  const readerScript=Array.from(document.scripts).find(s=>s.src&&/\/assets\/js\/shankara-reader\.js(?:\?|$)/.test(s.src));
  const dataUrl=readerScript?new URL("../data/shankara/"+encodeURIComponent(id)+".json",readerScript.src):new URL("/advaita/assets/data/shankara/"+encodeURIComponent(id)+".json",location.origin);
  dataUrl.searchParams.set("v",READER_DATA_VERSION);
  const res=await fetch(dataUrl.href);
  if(!res.ok)throw new Error("Work data unavailable");
  const data=await res.json();
  if(!complete(data)||data.id!==id)throw new Error("Incomplete text data");
  if(TREATISE_READERS.has(id)){
   const groups=treatiseGroups(data.units,id);
   document.title=item.title+" — Advaita Treatises — Viveka Dṛṣṭi";
   root.innerHTML=treatiseReaderHTML(data,item,id);
  }else{
   document.title=item.title+" — Advaita Treatises — Viveka Dṛṣṭi";
   root.innerHTML='<div class="shankara-reading-grid"><header class="gita-hero"><p class="eyebrow">Advaita Treatises</p><h1>'+esc(data.title)+'</h1>'+(item.author?'<p class="shankara-author">By '+esc(cleanAuthor(item.author))+'</p>':'')+aboutHTML(item)+readerCoverageNote(data)+(data.englishOnly?'':'<div class="script-controls" role="group" aria-label="Sanskrit script"><button type="button" data-script="deva" aria-pressed="true">देवनागरी</button><button type="button" data-script="iast" aria-pressed="false">IAST</button></div>')+'<p><a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">← Advaita Treatises</a></p></header><nav class="gita-contents" aria-label="Contents"><h2>Contents</h2>'+contentsHTML(data.units,id)+'</nav><div class="shankara-unit-column">'+data.units.map((u,i)=>unitHTML(u,i,data.englishOnly,data.translationAvailable)).join("")+navHTML(id)+'</div></div>';
  }
  root.setAttribute("aria-busy","false");
  delete root.dataset.readerFallback;
  bindScript(root);
  bindTreatiseNavigation(root);
 }catch(err){
  root.setAttribute("aria-busy","false");
  root.dataset.readerFallback="true";
  if(hasStaticText){
   const hero=root.querySelector(".gita-hero");
   if(hero&&!hero.querySelector(".eyebrow"))hero.insertAdjacentHTML("afterbegin",'<p class="eyebrow">Advaita Treatises</p>');
   root.querySelector(".shankara-loading-status")?.remove();
   if(hero)hero.insertAdjacentHTML("beforeend",readerErrorHTML(item,true));
   else root.insertAdjacentHTML("afterbegin",readerErrorHTML(item,true));
   enhanceFallback(root,item);
  }else root.innerHTML=readerErrorHTML(item,false);
  console.error(err);
 }
}
document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("[data-shankara-reader]").forEach(start));
})();