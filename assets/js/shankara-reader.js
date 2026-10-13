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
 "prasthanabheda":"A short survey of scriptural sources and their distinct approaches within Vedānta.",
 "upadesha-sahasri":"A systematic teaching on Self-knowledge presented through verse and prose.",
 "vedantasara":"A concise manual introducing the central structure and teachings of Vedānta.",
 "naishkarmya-siddhi":"Sureśvara’s sustained inquiry into knowledge, action, and liberation.",
 "jivanmukti-viveka":"Vidyāraṇya’s inquiry into liberation while embodied, renunciation, and mental discipline.",
 "brahma-siddhi":"Maṇḍana Miśra’s major examination of Brahman, knowledge, and liberation.",

};
const PANCHADASI_CHAPTERS={1:"Tattva-viveka",2:"Pañca-mahā-bhūta-viveka",3:"Pañca-kośa-viveka",4:"Dvaita-viveka",5:"Mahā-vākya",6:"Citra-dīpa",7:"Tṛpti-dīpa",8:"Kūṭastha-dīpa",9:"Dhyāna-dīpa",10:"Nāṭa-dīpa",11:"Brahmānanda",12:"Ātmānanda",13:"Advaitānanda",14:"Vidyānanda",15:"Viṣayānanda"};
const cleanAuthor=s=>String(s||"").replace(/,\s*traditional attribution/ig,"").trim();
const SVSSS_SECTIONS={1:"Part 1 · The Topic of this Study and the Successful Student",2:"Part 2 · Identifying Only with Ultimate Reality",3:"Part 3 · Otherwise Mis-identifying with Untruth",4:"Part 4 · You are Only that Ultimate Reality",5:"Part 5 · Assimilating this Knowledge"};
const MANDUKYA_CHAPTERS={1:"Āgama-prakaraṇa",2:"Vaitathya-prakaraṇa",3:"Advaita-prakaraṇa",4:"Alāta-śānti-prakaraṇa"};
function aboutHTML(item){
 const summary=ABOUT[item.id];if(!summary)return "";
 let source="";
 if(item.id==="panchadasi")source='<p class="shankara-about-source">Sanskrit and English text: A.K. Aruna, <i>Pañca-Daśī</i> (2020); translations marked ** by Swami Swahananda, Sri Ramakrishna Math, Chennai. Licensed CC BY-NC-SA 4.0. This on-site reader groups six adjacent verse pairs as ranges; Sanskrit at 10.22–10.23 was checked against a second text witness. Word-for-word glosses are available for Chapter 1 only.</p>';
 if(item.id==="svsss")source='<p class="shankara-about-source">A.K. Aruna format and transcription (2020 v3.0); English translation adopted from Swami Tattwananda, Sri Ramakrishna Advaita Ashrama; Sanskrit prose order adopted from Pandit Rāmasvarūpaśarmā. Licensed CC BY-NC-SA 4.0. This on-site reader groups adjacent source verses where the English translation spans them. The source prose order is not presented as a word-for-word gloss.</p>';
 if(item.id==="vivekachudamani")source='<p class="shankara-about-source">English translation by Swami Madhavananda, Himalayan Series No. XLIII (1921), a public-domain edition. Sanskrit electronic witness from GRETIL, marked not proofread; normalized and converted from IAST to Devanāgarī for this reader. This reader includes all 580 numbered verses, with translations spanning adjacent verses shown as ranges. Editorial notes and index are excluded. No separate word-for-word lexical gloss is supplied.</p>';
 if(item.id==="mandukya-karika")source='<p class="shankara-about-source">A.K. Aruna format and transcription (2022 version 6.0); Kārikā verse translation adopted from Swami Nikhilananda; Devanāgarī text credited by the source edition to Śāradā Peetham, Sringeri. Licensed CC BY-NC-SA 4.0. This reader includes all 215 numbered Kārikā verses and excludes the Upaniṣad mantras, Śaṅkara Bhāṣya, and Ṭīkā glosses. Translations spanning adjacent Sanskrit verses are shown as numbered ranges. No separate word-for-word gloss is included.</p>';
 if(item.id==="upadesha-sahasri")source='<p class="shankara-about-source">Sanskrit and IAST from the GRETIL text, data entry by Ivan Andrijanić, based on Sengaku Mayeda’s edition (1973; 2006). Licensed CC BY-NC-SA 4.0. All 787 source-marked verse and prose passages are included. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="vedantasara")source='<p class="shankara-about-source">Sanskrit text of Sadānanda Yogīndra’s work, distributed from a CC BY-SA 4.0 Wikisource edition. The complete local text includes prose and all 38 numbered source passages in this recension. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="naishkarmya-siddhi")source='<p class="shankara-about-source">Sanskrit Wikisource text, compiled and transliterated by the ERC-funded Intellexus project, under CC BY-SA 4.0. The complete four-chapter source is converted from IAST to Devanāgarī for this local reader. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="brahma-siddhi")source='<p class="shankara-about-source">Sanskrit from GRETIL, data entry by Diwakar Acharya, based on S. Kuppuswami Sastri’s 1937 edition. Licensed CC BY-NC-SA 4.0. This local reader contains the 231 source-marked passages present in that transcription, across Kāṇḍas 1, 2, and 4; it makes no claim for unrepresented sections. No English translation or word-for-word gloss is supplied.</p>';
 if(item.id==="jivanmukti-viveka")source='<p class="shankara-about-source">English translation by Manilal Nabhubhai Dvivedi, first published in 1897 and now in the public domain. All 165 printed-page units are arranged into the five chapter sections, front matter, glossary, and publisher’s catalogue present in this transcription. Sanskrit text is not included. Digital transcription credited to Maryse Locke.</p>';

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
 const groups=new Map();
 units.forEach((unit,index)=>{
  const chapter=chapterOf(unit,id),key=chapter?String(chapter):"all";
  if(!groups.has(key))groups.set(key,[]);
  groups.get(key).push({unit,index});
 });
 return [...groups.entries()].map(([key,items])=>{
  const chapter=key==="all"?null:Number(key),first=items[0]?.unit;
  const label=chapter?(first?.sectionTitle||(id==="panchadasi"&&PANCHADASI_CHAPTERS[chapter]?"Chapter "+chapter+": "+PANCHADASI_CHAPTERS[chapter]:id==="svsss"&&SVSSS_SECTIONS[chapter]?SVSSS_SECTIONS[chapter]:id==="mandukya-karika"&&MANDUKYA_CHAPTERS[chapter]?"Chapter "+chapter+": "+MANDUKYA_CHAPTERS[chapter]:"Chapter "+chapter)):(id==="jivanmukti-viveka"?"Pages ("+items.length+")":"Verses ("+items.length+")");
  return '<details class="shankara-chapter"><summary>'+esc(label)+'</summary><ol>'+items.map(({unit,index})=>'<li><a href="#'+esc(unit.id)+'">'+esc(unit.label||("Verse "+(index+1)))+'</a></li>').join("")+'</ol></details>';
 }).join("");
}

const TREATISE_READERS=new Set(["upadesha-sahasri","vedantasara","naishkarmya-siddhi","jivanmukti-viveka","brahma-siddhi"]);
function jivanGroup(unit){
 const match=String(unit.number||unit.label||"").match(/(\d+)/),page=match?Number(match[1]):0;
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
function treatiseGroups(units,id){
 const groups=[];
 units.forEach((unit,index)=>{
  let title;
  if(id==="jivanmukti-viveka")title=jivanGroup(unit);
  else if(id==="vedantasara")title=vedantasaraGroup(index);
  else title=unit.sectionTitle||("Section "+(unit.chapter||""));
  let group=groups[groups.length-1];
  if(!group||group.title!==title){group={title,items:[],anchor:"treatise-"+id+"-section-"+(groups.length+1)};groups.push(group)}
  group.items.push({unit,index});
 });
 return groups;
}
function treatiseContentsHTML(group,englishOnly){
 const large=group.items.length>120?" treatise-contents--large":"";
 return '<div class="gita-contents treatise-contents'+large+'" aria-label="Contents"><h2>Contents</h2><ol>'+
 group.items.map(({unit,index})=>'<li><a href="#'+esc(unit.id)+'">'+esc(unit.label||unit.number||("Entry "+(index+1)))+'</a></li>').join("")+
 '</ol></div>';
}
function breakLines(value){return esc(value).replace(/\r?\n/g,"<br/>")}
function treatiseUnitHTML(unit,index,englishOnly){
 const label=unit.label||("Passage "+(index+1)),number=unit.number||String(index+1);
 if(englishOnly){
  const paragraphs=String(unit.translation||"").split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).map(p=>'<p class="gita-translation">'+esc(p.replace(/\r?\n/g," "))+'</p>').join("");
  return '<article class="gita-verse shankara-verse shankara-english-unit" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(number)+'</h2><hr class="gita-verse-rule"/>'+paragraphs+'</article>';
 }
 const deva=String(unit.deva||"");
 const transliteration=unit.iast||iast(deva);
 const isLong=deva.length>260||/\n/.test(deva);
 const classes="gita-sanskrit sa-text"+(isLong?" treatise-long-text":"");
 const wordGloss=Array.isArray(unit.gloss)&&unit.gloss.length
  ?'<div class="gita-reveal"><div class="gita-word-list">'+glossHTML(unit.gloss)+'</div></div>'
  :'<div class="gita-reveal"><p>This source edition does not include a separate word-for-word gloss.</p></div>';
 const translation=unit.translation?'<p class="gita-translation">'+esc(unit.translation)+'</p>':"";
 return '<article class="gita-verse shankara-verse'+(isLong?" treatise-long-unit":"")+'" id="'+esc(unit.id)+'" aria-label="'+esc(label)+'"><h2>'+esc(number)+'</h2><hr class="gita-verse-rule"/><div class="'+classes+'" lang="sa-Deva" data-iast="'+esc(unit.iast||"")+'">'+breakLines(deva)+'</div>'+translation+'<div class="gita-controls"><details class="gita-details shankara-transliteration"><summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(transliteration)+'</p></div></details><details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary>'+wordGloss+'</details></div></article>';
}
function treatiseSubtitle(data,id){
 if(id==="jivanmukti-viveka")return "1897 English translation · 165 printed-page units";
 if(id==="upadesha-sahasri")return "Sanskrit text · 787 verse and prose passages";
 if(id==="vedantasara")return "Sanskrit text · 70 local units retaining all 38 numbered passages";
 if(id==="naishkarmya-siddhi")return "Sanskrit text · four Adhyāyas · 1,300 units";
 return "Sanskrit text · 231 source-marked passages in the available transcription";
}
function treatiseNavigationHTML(item,id,groups,sectionIndex){
 const noun=id==="naishkarmya-siddhi"?"chapter":"section";
 const urlFor=index=>item.path+"?section="+(index+1);
 const previous=sectionIndex>0?'<a class="gita-nav-prev" rel="prev" href="'+esc(urlFor(sectionIndex-1))+'">← Previous '+noun+'</a>':"";
 const next=sectionIndex<groups.length-1?'<a class="gita-nav-next" rel="next" href="'+esc(urlFor(sectionIndex+1))+'">Next '+noun+' →</a>':"";
 const options=groups.map((group,index)=>'<option value="'+esc(urlFor(index))+'"'+(index===sectionIndex?' selected':'')+'>'+(index+1)+'. '+esc(group.title)+'</option>').join("");
 return '<nav class="gita-chapter-nav treatise-section-nav" aria-label="Section navigation"><a class="gita-nav-all" href="/advaita/books/adi-shankaracharya/">Advaita Treatises</a>'+previous+
 '<label class="treatise-section-picker"><span class="treatise-visually-hidden">Choose a section</span><select data-treatise-section aria-label="Choose a section">'+options+'</select></label>'+next+'</nav>';
}
function treatiseReaderHTML(data,item,id,sectionIndex){
 const groups=treatiseGroups(data.units,id);
 const group=groups[sectionIndex]||groups[0];
 const byline=id==="jivanmukti-viveka"?'By '+esc(cleanAuthor(item.author))+' · English translation by Manilal Nabhubhai Dvivedi':'By '+esc(cleanAuthor(item.author));
 const controls=data.englishOnly?"":'<div class="script-controls" role="group" aria-label="Sanskrit script"><button type="button" data-script="deva" aria-pressed="true">देवनागरी</button><button type="button" data-script="iast" aria-pressed="false">IAST</button></div>';
 const position='Section '+(sectionIndex+1)+' of '+groups.length;
 const nav=treatiseNavigationHTML(item,id,groups,sectionIndex);
 const entries=group.items.map(({unit,index})=>treatiseUnitHTML(unit,index,data.englishOnly)).join("");
 const section='<section class="treatise-reader-section" aria-label="'+esc(group.title)+'">'+entries+'</section>';
 return '<header class="gita-hero"><p class="eyebrow">Advaita Treatises</p><h1>'+esc(item.title)+'</h1><p class="subtitle">'+esc(group.title)+'</p><p class="treatise-section-count">'+position+'</p><p class="shankara-author">'+byline+'</p>'+aboutHTML(item)+controls+'<p><a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">← Advaita Treatises</a></p></header>'+
 nav+treatiseContentsHTML(group,data.englishOnly)+section+nav;
}
function enhanceFallback(root,item){
 const author=root.querySelector(".shankara-author");
 if(author&&item.author)author.textContent="By "+cleanAuthor(item.author);
 const hero=root.querySelector(".gita-hero"),controls=hero?.querySelector(".script-controls");
 if(hero&&!hero.querySelector(".shankara-about"))controls?.insertAdjacentHTML("beforebegin",aboutHTML(item));
 const nav=root.querySelector(".gita-contents");
 if(nav&&!nav.querySelector(".shankara-chapter")){
  const links=[...nav.querySelectorAll("li a")].map(a=>({id:(a.getAttribute("href")||"").replace(/^#/,""),label:a.textContent.trim()})).filter(x=>x.id);
  if(links.length)nav.innerHTML='<h2>Contents</h2>'+contentsHTML(links,item.id);
 }
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
function glossHTML(words){return words.map(w=>'<div class="gita-word-row"><span class="gita-word-source"><span class="gita-word-dev" lang="sa-Deva">'+esc(w.sa)+'</span> <span class="gita-word-iast">('+esc(iast(w.sa))+')</span></span><span class="gita-word-gloss">'+esc(w.en)+'</span></div>').join("")}
function unitHTML(u,index,englishOnly,translationAvailable){
 const label=u.label||("Verse "+(index+1));
 if(englishOnly){
  const paragraphs=String(u.translation||"").split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).map(p=>'<p class="gita-translation">'+esc(p.replace(/\n/g," "))+'</p>').join("");
  return '<article class="gita-verse shankara-verse shankara-english-unit" id="'+esc(u.id)+'"><p class="shankara-unit-label">'+esc(label)+'</p><h2>'+esc(u.number||String(index+1))+'</h2><hr class="gita-verse-rule"/>'+paragraphs+'</article>';
 }
 const transliteration=u.iast||iast(u.deva);
 const wordGloss=Array.isArray(u.gloss)&&u.gloss.length
  ?'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><div class="gita-word-list">'+glossHTML(u.gloss)+'</div></div></details>'
  :translationAvailable===false?"":'<details class="gita-details shankara-word-gloss"><summary>Word-for-word</summary><div class="gita-reveal"><p class="shankara-gloss-unavailable">No word-for-word gloss is included for this entry.</p></div></details>';
 const translation=u.translation?'<p class="gita-translation">'+esc(u.translation)+'</p>':"";
 return '<article class="gita-verse shankara-verse" id="'+esc(u.id)+'"><p class="shankara-unit-label">'+esc(label)+'</p><h2>'+esc(u.number||String(index+1))+'</h2><hr class="gita-verse-rule"/><div class="gita-sanskrit sa-text" lang="sa-Deva">'+esc(u.deva)+'</div>'+translation+'<div class="gita-controls"><details class="gita-details shankara-transliteration"><summary>Transliteration</summary><div class="gita-reveal"><p class="shankara-iast" lang="sa-Latn">'+esc(transliteration)+'</p></div></details>'+wordGloss+'</div></article>';
}
function navHTML(id){
 const i=WORKS.findIndex(w=>w.id===id),prev=WORKS[i-1],next=WORKS[i+1];
 return '<nav class="shankara-work-nav" aria-label="Work navigation">'+(prev?'<a rel="prev" href="'+prev.path+'">← '+esc(prev.title)+'</a>':'<span></span>')+'<a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">Advaita Treatises</a>'+(next?'<a rel="next" href="'+next.path+'">'+esc(next.title)+' →</a>':'<span></span>')+'</nav>';
}
function bindScript(root){
 root.dataset.scriptMode="deva";
 root.querySelectorAll("[data-script]").forEach(btn=>btn.addEventListener("click",()=>{
  const mode=btn.dataset.script;root.dataset.scriptMode=mode;
  root.querySelectorAll("[data-script]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
  root.querySelectorAll(".sa-text").forEach(el=>{
   if(!el.dataset.deva)el.dataset.deva=el.textContent;
   el.textContent=mode==="iast"?(el.dataset.iast||iast(el.dataset.deva)):el.dataset.deva;
   el.lang=mode==="iast"?"sa-Latn":"sa-Deva";
  });
 }));
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
async function start(root){
 const id=root.dataset.work,item=WORKS.find(w=>w.id===id);
 if(!item)return;
 root.setAttribute("aria-busy","true");
 bindScript(root);
 try{
  const readerScript=Array.from(document.scripts).find(s=>s.src&&/\/assets\/js\/shankara-reader\.js(?:\?|$)/.test(s.src));
  const dataUrl=readerScript?new URL("../data/shankara/"+encodeURIComponent(id)+".json",readerScript.src).href:"/advaita/assets/data/shankara/"+encodeURIComponent(id)+".json";
  const res=await fetch(dataUrl);
  if(!res.ok)throw new Error("Work data unavailable");
  const data=await res.json();
  if(!complete(data)||data.id!==id)throw new Error("Incomplete text data");
  if(TREATISE_READERS.has(id)){
   const groups=treatiseGroups(data.units,id);
   const sectionIndex=selectedTreatiseSection(groups,location.search);
   document.title=item.title+" — "+groups[sectionIndex].title+" — Advaita Treatises — Viveka Dṛṣṭi";
   root.innerHTML=treatiseReaderHTML(data,item,id,sectionIndex);
  }else{
   document.title=item.title+" — Advaita Treatises — Viveka Dṛṣṭi";
   root.innerHTML='<div class="shankara-reading-grid"><header class="gita-hero"><h1>'+esc(data.title)+'</h1>'+(item.author?'<p class="shankara-author">By '+esc(cleanAuthor(item.author))+'</p>':'')+aboutHTML(item)+(data.englishOnly?'':'<div class="script-controls" role="group" aria-label="Sanskrit script"><button type="button" data-script="deva" aria-pressed="true">देवनागरी</button><button type="button" data-script="iast" aria-pressed="false">IAST</button></div>')+'<p><a class="shankara-index-link" href="/advaita/books/adi-shankaracharya/">← Advaita Treatises</a></p></header><nav class="gita-contents" aria-label="Contents"><h2>Contents</h2>'+contentsHTML(data.units,id)+'</nav><div class="shankara-unit-column">'+data.units.map((u,i)=>unitHTML(u,i,data.englishOnly,data.translationAvailable)).join("")+navHTML(id)+'</div></div>';
  }
  root.setAttribute("aria-busy","false");
  delete root.dataset.readerFallback;
  bindScript(root);
  bindTreatiseNavigation(root);
 }catch(err){
  root.setAttribute("aria-busy","false");
  root.dataset.readerFallback="true";
  enhanceFallback(root,item);
  console.error(err);
 }
}
document.addEventListener("DOMContentLoaded",()=>document.querySelectorAll("[data-shankara-reader]").forEach(start));
})();