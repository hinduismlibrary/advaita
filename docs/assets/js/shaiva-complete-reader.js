/* Complete Shaiva article reader. The manuscript data is preserved separately;
   this file only turns it into the same quiet, paged reading experience used
   by the Varna-vicara article. */
(()=>{
'use strict';

const site='/advaita/';
const base=site+'articles/a-shaiva-lens-on-shiva-as-the-supreme-deity/';
const root=document.getElementById('source-content');
if(!root)return;
const siteChrome=document.createElement('script');
siteChrome.src='/advaita/assets/js/site-chrome.js?v=20261019-unified-theme-3';
siteChrome.async=false;
document.body.append(siteChrome);

const make=(tag,cls,text)=>{
  const node=document.createElement(tag);
  if(cls)node.className=cls;
  if(text!==undefined)node.textContent=text;
  return node;
};

const empty=()=>document.createDocumentFragment();

function normaliseSpelling(value){
  /* The article uses plain English for all Roman text. Sanskrit source text
     stays in Devanagari and is only rendered by the Sanskrit control. */
  return String(value??'')
    .replace(/[śṣ]/g,'sh').replace(/[ŚṢ]/g,'Sh')
    .replace(/[ṛṝ]/g,'r').replace(/[ṚṜ]/g,'R')
    .replace(/[ṇṅñ]/g,'n').replace(/[ṆṄÑ]/g,'N')
    .replace(/[ṭ]/g,'t').replace(/[Ṭ]/g,'T')
    .replace(/[ḍ]/g,'d').replace(/[Ḍ]/g,'D')
    .replace(/[ḷ]/g,'l').replace(/[Ḷ]/g,'L')
    .replace(/[ṃṁ]/g,'m').replace(/[ṂṀ]/g,'M')
    .replace(/[ḥ]/g,'h').replace(/[Ḥ]/g,'H')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[ß]/g,'ss')
    .replace(/[æ]/gi,'ae')
    .replace(/[œ]/gi,'oe')
    .replace(/\bKrshna\b/gi,'Krishna')
    .replace(/\bRgveda\b/gi,'Rigveda')
    .replace(/\bPurusha\b/gi,'Purusha')
    .replace(/\bDrshti\b/gi,'Drishti');
}

function articleText(value){
  let text=String(value??'').replace(/\u00a0/g,' ');
  text=text
    .replace(/\bcontinued\s+on\s+(?:the\s+)?source\s+PDF\s+page\s+\d+\b/gi,' ')
    .replace(/\bsource\s+PDF\s+page\s+\d+\b/gi,' ')
    .replace(/\bPDF\s+page\s+\d+\b/gi,' ')
    .replace(/\b(?:source\s+)?document\b/gi,'article')
    .replace(/\bthis\s+article\s+article\b/gi,'this article')
    .replace(/\bBY\s+POPCULTKING\b/gi,' ')
    .replace(/\b([A-Z]{2,})\b/g,match=>match.toLowerCase())
    .replace(/\s*&\s*/g,' and ')
    .replace(/\s*([,.;:!?])/g,'$1')
    .replace(/([,.;:!?])(?=[A-Z“‘])/g,'$1 ')
    .replace(/,([A-Za-z])/g,', $1')
    .replace(/\s+([)])/g,'$1')
    .replace(/([([])\s+/g,'$1')
    .replace(/\s*:\s*/g,': ')
    .replace(/\s{2,}/g,' ')
    .trim();
  if(!text)return '';
  text=normaliseSpelling(text);
  return text.replace(/^([a-z])/u,(_,letter)=>letter.toUpperCase());
}

function sentenceTitle(value){
  let text=articleText(value)
    .replace(/^\s*\d+(?:\.\d+)*[.)]?\s*/,'')
    .replace(/\s*:\s*$/,'')
    .trim();
  if(!text)return '';
  text=text.toLocaleLowerCase();
  const proper=['shiva','shaiva','vishnu','vaishnava','narayana','mahanarayana',
    'rama','krishna','mahadeva','maheshvara','shvetashvatara','upanishad','upanishads',
    'purana','puranas','padma','garuda','bhagavata','matsya','kurma','skanda','shruti',
    'smriti','gita','itihasa','itihasas','dharmashastra','dharmashastras','purvapaksha',
    'mimamsa','shankara','shankaracharya','shri','shastra','shastras','adi','hara','yajurveda','bhagavad','karmakanda',
    'jnana','sattvic','sattvika','tamasic','tamasika'];
  for(const word of proper){
    const title=word.charAt(0).toUpperCase()+word.slice(1);
    text=text.replace(new RegExp('(?<![a-z])'+word+'(?![a-z])','gi'),title);
  }
  text=text.replace(/^(\s*["“‘'(]*)([a-z])/u,(_,prefix,letter)=>prefix+letter.toUpperCase());
  return text;
}

function stripOuterQuotes(value){
  return String(value??'').trim()
    .replace(/^[“"‘']+/,'')
    .replace(/[”"’']+$/,'')
    .trim();
}

function cleanSanskrit(value){
  let text=String(value??'').replace(/\s*\(Translation:\s*$/i,'').trim();
  text=text.replace(/\s+[‘'][\s\S]*$/,'').trim();
  text=stripOuterQuotes(text);
  return text;
}

const devanagariRun=/(?:[॥।]\s*)?[\u0900-\u097F][\u0900-\u097F\s।॥०-९|,.;:!?()\-–—\u200c\u200d]*[\u0900-\u097F।॥]/gu;

function sanskrit(value){
  const text=cleanSanskrit(value);
  if(!text)return empty();
  const details=make('details','sanskrit-reveal');
  const summary=make('summary',null,'Show Sanskrit');
  const source=make('div',null,text);
  source.lang='sa-Deva';
  details.append(summary,source);
  details.addEventListener('toggle',()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit';});
  return details;
}

function mixedSanskrit(value,mode='paragraph'){
  const visible=articleText(value);
  const matches=[...visible.matchAll(devanagariRun)];
  if(!matches.length)return null;
  const fragment=document.createDocumentFragment();
  let cursor=0;
  const appendEnglish=part=>{
    const text=part.replace(/[“"(\[]\s*$/u,'').replace(/^\s*[“"()\]]\s*/u,'').trim();
    if(!text)return;
    fragment.append(mode==='translation'?translation(text):make('p',null,text));
  };
  for(const match of matches){
    appendEnglish(visible.slice(cursor,match.index));
    fragment.append(sanskrit(match[0]));
    cursor=match.index+match[0].length;
  }
  appendEnglish(visible.slice(cursor));
  return fragment;
}

function translation(value){
  const text=stripOuterQuotes(articleText(value));
  return text?make('p','translation',text):empty();
}

function reference(value){
  const text=articleText(value);
  return text?make('p','reference',text):empty();
}

function note(value){
  const text=articleText(value);
  if(!text)return empty();
  const block=make('p','aside-note');
  block.textContent=text;
  return block;
}

function normaliseMajorHeading(value){
  const raw=String(value??'').trim();
  const numberMatch=/^\s*(\d+)\./.exec(raw);
  const number=numberMatch?Number(numberMatch[1]):null;
  if(/^\s*index\b/i.test(raw))return {id:'index',title:'Contents'};
  const titles={
    1:'Preface',
    2:'On guna based Purana classification',
    3:'Vishnu as tamasic and Shiva as sattvic',
    4:'Double standards on absolute and relative supremacy',
    5:'Evidence from Shruti on the supremacy of Shiva',
    6:'Supremacy of Shiva in itihasas',
    7:'Purva paksha: Mahanarayana Upanishad on the supposed supremacy of Vishnu',
    8:'Addressing the scope-of-questions argument',
    9:'Supremacy of Shiva in Dharmashastras'
  };
  const title=titles[number]||sentenceTitle(raw);
  const prefix=number===6?'6.1 Lord Rama on the supremacy of Shiva':null;
  return {id:number?'section-'+number:title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''),title,number,prefix};
}

function sectionGroup(number){
  if(number===null)return 'Opening';
  if(number<=3)return 'Introduction and Puranas';
  if(number<=6)return 'Scriptural evidence';
  if(number<=8)return 'Objections';
  return 'Dharmashastra';
}

function sectionsFrom(pages){
  const opening={id:'opening-salutation',title:'Opening Salutation',parent:'Opening',blocks:[]};
  const sections=[opening];
  const subsectionTitles={
    '1.1':{id:'introduction',title:'Introduction'},
    '1.2':{id:'methodology',title:'Methodology'},
    '2.1':{id:'padma-pur-a-s-contradiction',title:'Padma Purana and Its Contradiction'},
    '2.2':{id:'garuda-pur-a-s-contradiction',title:'Garuda Purana and Its Contradiction'},
    '2.3':{id:'supremacy-of-shiva-in-vaishnava-puranas',title:'Supremacy of Shiva in Vaishnava Puranas'},
    '3.1':{id:'shiva-purana-on-the-true-nature-of-vishnu',title:'Shiva Purana on the True Nature of Vishnu'},
    '3.2':{id:'tamasic-nature-of-vaishnava-puranas',title:'Tamasic Nature of Vaishnava Puranas'},
    '4.1':{id:'krsna-on-shivas-supremacy',title:'Kṛṣṇa on Śiva\'s Supremacy in Mahābhārat'},
    '5.1':{id:'shvetashvatara-upanishad-and-adi-shankaracharya-on-shivas-supremacy',title:'Shvetashvatara Upanishad and Adi Shankaracharya on the Supremacy of Shiva'},
    '5.2':{id:'the-vai-ava-claim-relative-superiority-and-courtesy',title:'The Vaishnava Claim: Relative Superiority and Courtesy'},
    '5.3':{id:'hara-as-the-destroyer-of-the-root-of-bondage',title:'Hara as the Destroyer of the Root of Bondage'},
    '5.4':{id:'sri-rudram-in-yajurveda',title:'Sri Rudram in Yajurveda'},
    '5.5':{id:'supremacy-of-vishnu-in-brahmanas',title:'Supremacy of Vishnu in Brahmanas'},
    '6.1':{id:'lord-rama-on-supremacy-of-shiva',title:'Lord Rama on the Supremacy of Shiva'},
    '6.2':{id:'supremacy-of-shiva-in-bhagavad-gita',title:'Supremacy of Shiva in Bhagavad Gita'}
  };
  let current=opening;
  let major=null;
  let chapterTitle='Opening Salutation';
  let pending=[];
  const append=(target,block)=>{
    const previous=target.blocks[target.blocks.length-1];
    if(block.kind==='table'&&previous?.kind==='table'&&Array.isArray(previous.value)&&Array.isArray(block.value)){
      previous.value.push(...block.value);
    }else if(block.kind==='sa'&&previous?.kind==='sa'){
      previous.value+='\n'+block.value;
    }else{
      target.blocks.push(block);
    }
  };
  const start=(id,title,number,parentTitle)=>{
    current={id,title,parent:sectionGroup(number),chapterTitle:parentTitle,blocks:pending};
    sections.push(current);
    pending=[];
  };
  pages.forEach((blocks,pageIndex)=>blocks.forEach(([kind,value])=>{
    if(kind==='heading'){
      const info=normaliseMajorHeading(value);
      if(info.id==='index'){
        major=null;
        chapterTitle='Contents';
        current={id:'contents',title:'Contents',parent:'Contents',chapterTitle:'Contents',blocks:pending};
        sections.push(current);
        pending=[];
        return;
      }
      major=info.number;
      chapterTitle=info.title;
      current=null;
      pending=[];
      if(major===7){
        start('objections','Objections',major,'Objections');
        append(current,{kind:'subheading',value:info.title,id:'objections-section-'+major});
        return;
      }
      if(major===8){
        const objections=sections[sections.length-1];
        if(objections?.id==='objections')current=objections;
        else start('objections','Objections',major,'Objections');
        append(current,{kind:'subheading',value:info.title,id:'objections-section-'+major});
        return;
      }
      if(major===6&&info.prefix){
        const first=subsectionTitles['6.1'];
        start(first.id,first.title,major,chapterTitle);
        return;
      }
      const id=major===4?'double-standards-on-absolute-and-relative-supremacy':
        major===9?'smriti-testimony':info.id;
      start(id,info.title,major,null);
      return;
    }
    if(kind==='p'){
      const text=articleText(value);
      const match=/^\s*(\d{1,2})\.(\d{1,2})\s+(.+)$/.exec(text);
      if(match){
        const sourceMajor=Number(match[1]);
        const minor=Number(match[2]);
        const misnumberedFiveThree=major===5&&sourceMajor===4&&minor===3;
        const key=misnumberedFiveThree?'5.3':`${sourceMajor}.${minor}`;
        const definition=subsectionTitles[key];
        if(definition&&(sourceMajor===major||misnumberedFiveThree)){
          if(major===6)start(definition.id,definition.title,major,chapterTitle);
          else if(current)append(current,{kind:'subheading',value:definition.title,id:definition.id});
          return;
        }
      }
    }
    if(kind==='sa'&&major===4&&current&&!current.blocks.some(block=>block.kind==='subheading'&&block.id==='krsna-on-shivas-supremacy')){
      const definition=subsectionTitles['4.1'];
      append(current,{kind:'subheading',value:definition.title,id:definition.id});
    }
    const block={kind,value,page:pageIndex+1};
    if(current)append(current,block);
    else if(major!==null)append({blocks:pending},block);
  }));
  return sections;
}

function indexList(value){
  const text=String(value??'').replace(/\s+/g,' ').trim();
  const wrapper=make('div','article-index');
  const topPattern=/(?:^|\s)(\d+)\.\s+(.+?)(?=\s+\d+\.\s+|$)/g;
  let match;
  while((match=topPattern.exec(text))){
    const number=match[1];
    const body=match[2].trim();
    const firstSub=body.search(/\s+\d+\.\d+\s+/);
    const topTitle=(firstSub<0?body:body.slice(0,firstSub)).trim();
    const entry=make('div','index-entry');
    const heading=make('a','index-heading',sentenceTitle(number+'. '+topTitle));
    heading.href=base+'?section=section-'+number;
    entry.append(heading);
    const subText=firstSub<0?'':body.slice(firstSub).trim();
    const subPattern=/(?:^|\s)(\d+\.\d+)\s+(.+?)(?=\s+\d+\.\d+\s+|$)/g;
    let sub;
    while((sub=subPattern.exec(subText))){
      const child=make('a','index-subitem',sentenceTitle(sub[1]+' '+sub[2]));
      child.href=base+'?section=section-'+number;
      entry.append(child);
    }
    wrapper.append(entry);
  }
  return wrapper.childElementCount?wrapper:make('p',null,articleText(value));
}

function renderVerse(value){
  const raw=articleText(value);
  const marks=[...raw.matchAll(/\|\|\s*(\d+)\s*\|\|/g)];
  if(!marks.length)return null;
  const fragment=document.createDocumentFragment();
  let start=0;
  for(const mark of marks){
    const before=raw.slice(start,mark.index).trim();
    if(before)fragment.append(translation(before));
    fragment.append(reference('Verse '+mark[1]));
    start=mark.index+mark[0].length;
  }
  const tail=raw.slice(start).trim();
  if(tail)fragment.append(translation(tail));
  return fragment;
}

function renderQuote(value){
  const visible=articleText(value);
  if(!visible)return empty();
  const inlineQuote=visible.match(/^([\s\S]*?\|\|\s*)([“\"][\s\S]+)$/);
  if(inlineQuote){
    /* The Roman line belongs with the Sanskrit reveal, never as a separate
       teal citation in the article flow. */
    return translation(inlineQuote[2]);
  }
  const mixed=mixedSanskrit(value,'translation');
  if(mixed)return mixed;
  if(/^(?:english(?:\s+translation)?|translation)\s*:?[.]?$/i.test(visible))return reference('English translation');
  if(/^(?:Bhagavadgita|Laugaksi)\b/i.test(visible))return reference(visible);
  const withoutLabel=visible.replace(/^\s*(?:English\s+)?translation\s*:\s*/i,'').trim();
  if(!withoutLabel)return empty();
  const noteAt=withoutLabel.search(/\s+NOTE\s*:\s*/i);
  const fragment=document.createDocumentFragment();
  const quoteText=noteAt<0?withoutLabel:withoutLabel.slice(0,noteAt).trim();
  const pieces=quoteText.split(/\s+>\s+/).map(stripOuterQuotes).filter(Boolean);
  for(const piece of pieces)fragment.append(translation(piece));
  if(noteAt>=0)fragment.append(note(withoutLabel.slice(noteAt+1)));
  return fragment;
}

function renderTable(value){
  if(!Array.isArray(value)||!value.length)return empty();
  const table=make('table','shaiva-parallel');
  table.setAttribute('aria-label','Sanskrit and English translation');
  const thead=document.createElement('thead');
  const headRow=document.createElement('tr');
  const leftHead=make('th',null,'Sanskrit');
  const rightHead=make('th',null,'English translation');
  leftHead.scope='col';rightHead.scope='col';
  thead.append(headRow);headRow.append(leftHead,rightHead);
  const tbody=document.createElement('tbody');
  for(const rowData of value){
    const row=document.createElement('tr');
    const original=Array.isArray(rowData)?rowData[0]||'':'';
    const english=Array.isArray(rowData)?rowData[1]||'':'';
    const extra=Array.isArray(rowData)?rowData.slice(2).filter(Boolean).join(' '):'';
    const left=make('td','shaiva-parallel__sanskrit',cleanSanskrit(original));
    left.lang='sa-Deva';
    left.dataset.label='Sanskrit';
    const right=make('td','shaiva-parallel__english',articleText(english));
    right.lang='en';
    right.dataset.label='English translation';
    if(extra)right.append(make('small','shaiva-note',articleText(extra)));
    row.append(left,right);
    tbody.append(row);
  }
  table.append(thead,tbody);
  return table;
}

function renderParagraph(value,section){
  const visible=articleText(value);
  if(!visible||/popcultking/i.test(visible))return empty();
  if(section==='contents')return indexList(visible);
  const mixed=mixedSanskrit(value,/^\s*\(?translation\s*:/i.test(String(value??''))?'translation':'paragraph');
  if(mixed){
    const first=mixed.firstElementChild;
    if(first?.matches('p')&&/^\s*[●•]/u.test(first.textContent||'')){
      first.className='article-bullet';
      first.textContent=first.textContent.replace(/^\s*[●•]\s*/u,'');
    }
    return mixed;
  }
  if(/^\s*(?:english\s+)?translation\s*:?\s*$/i.test(visible))return reference('English translation');
  if(/^\s*sanskrit\s+text(?:\s+and\s+english\s+translation)?\s*:?\s*$/i.test(visible))return reference(sentenceTitle(visible));
  if(/^\s*shankara[’']s commentary\b/i.test(visible)||/^\s*shankara[’']s commentary\s*\(sanskrit bhashya\)\s*$/i.test(visible))return reference(visible);
  if(/^\s*\(?translation\s*:/i.test(visible))return translation(visible.replace(/^\s*\(?translation\s*:\s*/i,'').replace(/\)\s*$/,'').trim());
  const verse=renderVerse(value);if(verse)return verse;
  if(/^\s*[●•]/u.test(visible))return make('p','article-bullet',visible.replace(/^\s*[●•]\s*/u,''));
  if(/^\s*note\s*:/i.test(visible))return note(visible);
  if(/^\s*\d{1,2}\.\d{1,2}(?:\.\d+)?\s+/.test(visible)&&visible.length<220){
    return make('h3',null,sentenceTitle(visible));
  }
  if(/^(?:bhagavadgita|laugaksi)\b/i.test(visible)&&visible.length<100)return reference(visible);
  if(/^[“"]/.test(visible)&&visible.length>40)return translation(visible);
  return make('p',null,visible);
}

function renderBlock(block,section){
  if(block.kind==='sa')return sanskrit(block.value);
  if(block.kind==='quote')return renderQuote(block.value);
  if(block.kind==='table')return renderTable(block.value);
  if(block.kind==='subheading'){
    const heading=make('h3','reader-subheading',sentenceTitle(block.value));
    if(block.id)heading.id=block.id;
    return heading;
  }
  if(block.kind==='p'){
    const visible=articleText(block.value);
    if(section==='opening-salutation'&&/^a scripture-based case for the supremacy of shiva$/i.test(visible))return empty();
    return renderParagraph(block.value,section);
  }
  return make('p',null,articleText(block.value));
}

function normalizeCitationOrder(root){
  const isTranslation=n=>n?.matches?.('p.translation,p.scripture-translation,blockquote.translation,blockquote.scripture-translation');
  const isQuoteSource=n=>n?.matches?.('details.sanskrit-reveal,p[lang^="sa"],.sanskrit-text,blockquote.translation,blockquote.scripture-translation');
  for(const citation of root.querySelectorAll('p.reference,p.source-citation,p.scripture-source,p.citation')){
    if(citation.matches('p.reference')&&/^(?:english translation|sanskrit text(?: and english translation)?)\s*:?[.]?$/i.test(articleText(citation.textContent)))continue;
    let target=citation.previousElementSibling;
    if(isTranslation(target)){
      while(isTranslation(target.previousElementSibling))target=target.previousElementSibling;
      if(isQuoteSource(target.previousElementSibling))target=target.previousElementSibling;
      target.before(citation);
    }else if(isQuoteSource(target))target.before(citation);
  }
}

function href(section){
  return base+'#'+encodeURIComponent(section.id);
}

function tocLabel(value){
  const label=sentenceTitle(value);
  const numberedObjection=label.match(/^objection\s+([ivxlcdm]+|\d+)\s*:/i);
  if(numberedObjection)return 'Objection '+numberedObjection[1].toUpperCase();
  return label;
}

const isSources=section=>/^\s*(?:\d+(?:\.\d+)*[.)]?\s+)?(?:(?:primary|secondary|selected|additional|further|list of)\s+)*(?:bibliograph(?:y|ies)|references?|sources?|works cited)\b/i.test(section.title);

function tocInto(node,sections,selected){
  const outline=[{"label":"1. Preface","sectionId":"section-1","children":[{"label":"1.1 Introduction","sectionId":"section-1","target":"introduction","children":[]},{"label":"1.2 Methodology","sectionId":"section-1","target":"methodology","children":[]}]},{"label":"2. On Guṇa-Based Purāṇa Classification","sectionId":"section-2","children":[{"label":"2.1 Padma Purāṇa's Contradiction","sectionId":"section-2","target":"padma-pur-a-s-contradiction","children":[]},{"label":"2.2 Garuḍa Purāṇa's Contradiction","sectionId":"section-2","target":"garuda-pur-a-s-contradiction","children":[]},{"label":"2.3 Supremacy of Śiva in Vaiṣṇava Purāṇas","sectionId":"section-2","target":"supremacy-of-shiva-in-vaishnava-puranas","children":[]}]},{"label":"3. Viṣṇu as Tāmasic & Śiva as Sāttvic","sectionId":"section-3","children":[{"label":"3.1 Śiva Purāṇa on the True Nature of Viṣṇu","sectionId":"section-3","target":"shiva-purana-on-the-true-nature-of-vishnu","children":[]},{"label":"3.2 Tāmasic Nature of Vaiṣṇava Purāṇas","sectionId":"section-3","target":"tamasic-nature-of-vaishnava-puranas","children":[]}]},{"label":"4. Double Standards on Relative & Absolute Supremacy","sectionId":"double-standards-on-absolute-and-relative-supremacy","children":[{"label":"4.1 Kṛṣṇa on Śiva's Supremacy in Mahābhārat","sectionId":"double-standards-on-absolute-and-relative-supremacy","target":"krsna-on-shivas-supremacy","children":[]}]},{"label":"5. Evidence from Śruti on the Supremacy of Śiva","sectionId":"section-5","children":[{"label":"5.1 Śvetāśvatara Upaniṣad & Ādi Śaṅkarācārya on the Supremacy of Śiva","sectionId":"section-5","target":"shvetashvatara-upanishad-and-adi-shankaracharya-on-shivas-supremacy","children":[]},{"label":"5.2 The Vaiṣṇava Claim: “Relative Superiority” and “Courtesy”","sectionId":"section-5","target":"the-vai-ava-claim-relative-superiority-and-courtesy","children":[]},{"label":"5.3 “Hara” as the Destroyer of the Root of Bondage","sectionId":"section-5","target":"hara-as-the-destroyer-of-the-root-of-bondage","children":[]},{"label":"5.4 Śrī-Rudram in Yajurveda","sectionId":"section-5","target":"sri-rudram-in-yajurveda","children":[]},{"label":"5.5 Supremacy of Viṣṇu in Brāhmaṇas","sectionId":"section-5","target":"supremacy-of-vishnu-in-brahmanas","children":[]}]},{"label":"6. Supremacy of Śiva in Itihāsas","children":[{"label":"6.1 Lord Rāma on Supremacy of Śiva","sectionId":"lord-rama-on-supremacy-of-shiva","target":null,"children":[]},{"label":"6.2 Supremacy of Lord Śiva in Bhagavad Gītā","sectionId":"supremacy-of-shiva-in-bhagavad-gita","target":null,"children":[]}]},{"label":"7. Pūrva Pakṣa: Mahānārāyaṇa Upaniṣad","sectionId":"objections","target":"objections-section-7","children":[]},{"label":"8. Addressing the Scope-of-Questions Argument","sectionId":"objections","target":"objections-section-8","children":[]},{"label":"9. Supremacy of Śiva in Dharmaśāstras","sectionId":"smriti-testimony","target":null,"children":[]}];
  const pageFor=item=>item.sectionId?sections.find(section=>section.id===item.sectionId):null;
  const renderList=(items,depth=0)=>{
    const list=make('ul',depth?'toc-index-list toc-index-nested':'toc-index-list');
    for(const item of items){
      const entry=make('li','toc-index-entry');
      const section=pageFor(item);
      const label=isSources(section||{title:item.label})?'Sources':item.label;
      if(section){
        const link=make('a','toc-index-link',label);
        link.href=base+'#'+encodeURIComponent(item.target||section.id);
        link.dataset.section=section.id;
        if(item.target)link.dataset.subsection=item.target;
        link.title=label;
        link.setAttribute('aria-label',label);
        if(item.target&&location.hash.slice(1)===item.target){
          link.classList.add('is-active-subsection');
          link.setAttribute('aria-current','location');
        }else if(!item.target&&section.id===selected.id){
          link.classList.add('is-active');
          link.setAttribute('aria-current','page');
        }
        entry.append(link);
      }else{
        entry.append(make('span','toc-index-label',label));
      }
      if(item.children?.length)entry.append(renderList(item.children,depth+1));
      list.append(entry);
    }
    return list;
  };
  node.classList.add('toc-index');
  node.replaceChildren(renderList(outline));
}
let currentTocSection=null,subsectionSyncPending=false,renderedSections=[];
function syncActiveSubsection(){
  const visibleSections=renderedSections.map(section=>({section,heading:document.getElementById(section.id)})).filter(item=>item.heading);
  if(visibleSections.length){
    const line=40;
    let current=visibleSections[0];
    for(const item of visibleSections){
      if(item.heading.getBoundingClientRect().top<=line)current=item;
      else break;
    }
    currentTocSection=current.section;
  }
  const section=currentTocSection;
  if(!section)return;
  document.getElementById('section-parent').textContent=isSources(section)?'Sources':section.chapterTitle||section.parent;
  document.getElementById('section-count').textContent='Full document';
  root.classList.toggle('document-reference-page',isSources(section));
  const desktop=document.getElementById('shaiva-desktop-toc');
  const mobile=document.getElementById('shaiva-mobile-toc');
  const reference=desktop||mobile;
  const candidates=reference?[...reference.querySelectorAll('a[data-subsection]')]
    .filter(link=>link.dataset.section===section.id)
    .map(link=>({link,target:document.getElementById(link.dataset.subsection)}))
    .filter(item=>item.target&&root.contains(item.target)&&item.target.getClientRects().length)
    .sort((a,b)=>{
      const order=a.target.compareDocumentPosition(b.target);
      if(order&Node.DOCUMENT_POSITION_FOLLOWING)return -1;
      if(order&Node.DOCUMENT_POSITION_PRECEDING)return 1;
      return 0;
    }):[];
  const line=40;
  let selected=null;
  for(const item of candidates){
    if(item.target.getBoundingClientRect().top<=line)selected=item;
    else break;
  }
  for(const nav of [desktop,mobile]){
    if(!nav)continue;
    let activeOnce=false;
    for(const link of nav.querySelectorAll('a[data-section]')){
      const subsection=link.hasAttribute('data-subsection');
      const matches=selected
        ? subsection&&link.dataset.section===section.id&&link.dataset.subsection===selected.link.dataset.subsection
        : !subsection&&link.dataset.section===section.id;
      const active=!activeOnce&&matches;
      if(active)activeOnce=true;
      link.classList.toggle('is-active',active&&!subsection);
      link.classList.toggle('is-active-subsection',active&&subsection);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    }
  }
}
function scheduleActiveSubsection(){
  if(subsectionSyncPending)return;
  subsectionSyncPending=true;
  requestAnimationFrame(()=>{subsectionSyncPending=false;syncActiveSubsection();});
}
window.addEventListener('scroll',scheduleActiveSubsection,{passive:true});
window.addEventListener('resize',scheduleActiveSubsection,{passive:true});
window.addEventListener('hashchange',scheduleActiveSubsection);

function navLink(anchor,section,label){
  anchor.replaceChildren(make('small',null,label));
  if(!section){
    anchor.classList.add('disabled');
    anchor.removeAttribute('href');
    return;
  }
  anchor.classList.remove('disabled');
  anchor.href=href(section);
  anchor.append(document.createTextNode(isSources(section)?'Sources':section.title));
}

async function get(path){
  const response=await fetch(site+path+'?v=20260923-shaiva-parity-1');
  if(!response.ok)throw Error(path+': HTTP '+response.status);
  return (await response.text()).trim();
}

async function load(){
  const encoded=await get('assets/data/shaiva-manuscript.b64');
  const bytes=Uint8Array.from(atob(encoded),character=>character.charCodeAt(0));
  if(!('DecompressionStream' in window))throw Error('This browser cannot decompress the manuscript');
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
  const pages=JSON.parse(await new Response(stream).text());
  if(!Array.isArray(pages)||pages.length!==52||pages.slice(0,50).some(page=>!Array.isArray(page)||!page.length)||pages.slice(50).some(page=>!Array.isArray(page)||page.length))throw Error('Incomplete manuscript');
  return pages;
}

function normalizeSourcePage(body){
  for(const heading of [...body.querySelectorAll('h2,h3,h4,h5,h6')]){
    const label=(heading.innerText||heading.textContent||'').trim();
    if(!label)continue;
    const normalized=make('h4','source-group-heading',label);
    if(heading.id)normalized.id=heading.id;
    heading.replaceWith(normalized);
  }
  for(const paragraph of [...body.querySelectorAll('p')]){
    const next=paragraph.nextElementSibling;
    const label=(paragraph.innerText||paragraph.textContent||'').trim();
    const masterIndex=paragraph.classList.contains('reference')&&/^master citation index$/i.test(label);
    if((!next||!next.matches('ol,ul,.article-index'))&&!masterIndex)continue;
    if(!label||label.length>100)continue;
    const heading=make('h4','source-group-heading',label);
    if(paragraph.id)heading.id=paragraph.id;
    paragraph.replaceWith(heading);
  }
  for(const snippet of [...body.querySelectorAll('.index-subitem')]){
    const value=(snippet.innerText||snippet.textContent||'').trim();
    const field=value.match(/^(?:quote(?: begins| includes)?|sanskrit)\s*:\s*(.*)$/i);
    if(field&&/[A-Za-z]/.test(field[1]))snippet.remove();
  }
  body.querySelectorAll('ol,ul').forEach(list=>list.classList.add('source-entry-list'));
  body.querySelectorAll('li,.index-entry').forEach(entry=>entry.classList.add('source-entry'));
  body.querySelectorAll('.article-index').forEach(index=>index.classList.add('source-entry-index'));
}

function decodeFragment(value){
  const raw=String(value||'').replace(/^#/,'').split('#')[0];
  try{return decodeURIComponent(raw);}catch{return raw;}
}

async function render(){
  const pages=await load();
  const sections=sectionsFrom(pages).filter(section=>section.id!=='contents');
  renderedSections=sections;
  const requested=new URLSearchParams(location.search).get('section');
  const legacy={
    opening:'opening-salutation',index:'contents',
    'section-1':'section-1','section-2':'section-2','section-3':'section-3',
    'section-4':'double-standards-on-absolute-and-relative-supremacy',
    'section-5':'section-5','section-6':'lord-rama-on-supremacy-of-shiva',
    'section-7':'objections','section-8':'objections','section-9':'smriti-testimony',
    introduction:'section-1',methodology:'section-1',
    'padma-pur-a-s-contradiction':'section-2','garuda-pur-a-s-contradiction':'section-2',
    'supremacy-of-shiva-in-vaishnava-puranas':'section-2',
    'shiva-purana-on-the-true-nature-of-vishnu':'section-3',
    'tamasic-nature-of-vaishnava-puranas':'section-3',
    'shvetashvatara-upanishad-and-adi-shankaracharya-on-shivas-supremacy':'section-5',
    'the-vai-ava-claim-relative-superiority-and-courtesy':'section-5',
    'hara-as-the-destroyer-of-the-root-of-bondage':'section-5',
    'sri-rudram-in-yajurveda':'section-5','supremacy-of-vishnu-in-brahmanas':'section-5'
  };
  const requestedTarget=location.hash?decodeFragment(location.hash):legacy[requested]||requested||'';
  const findSection=target=>sections.find(section=>section.id===target||section.blocks.some(block=>block.id===target));
  const initial=findSection(requestedTarget)||sections[0];
  currentTocSection=initial;
  const desktop=document.getElementById('shaiva-desktop-toc');
  const mobile=document.getElementById('shaiva-mobile-toc');
  if(desktop)tocInto(desktop,sections,initial);
  if(mobile)tocInto(mobile,sections,initial);
  document.title='A Scripture-Based Case for the Supremacy of Shiva — Viveka Drishti';
  const content=document.createDocumentFragment();
  for(const section of sections){
    const sourcePage=isSources(section);
    const container=make('section','document-section');
    if(sourcePage)container.classList.add('document-reference-section');
    const displayTitle=sourcePage?'Sources':section.title;
    const heading=make('h3',sourcePage?'source-page-heading':'document-section-title',displayTitle);
    heading.id=section.id;
    container.append(heading);
    const sourceBody=sourcePage?make('div','source-page-body'):container;
    for(const block of section.blocks)sourceBody.append(renderBlock(block,section.id));
    if(sourcePage){normalizeSourcePage(sourceBody);container.append(sourceBody);}
    normalizeCitationOrder(container);
    content.append(container);
  }
  root.replaceChildren(content);
  root.classList.remove('document-reference-page');
  document.querySelector('.page-nav')?.remove();
  const targetId=requestedTarget&&document.getElementById(requestedTarget)?requestedTarget:initial?.id||'';
  if(requested){
    const url=new URL(location.href);
    url.searchParams.delete('section');
    if(!url.hash&&targetId)url.hash=encodeURIComponent(targetId);
    history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  scheduleActiveSubsection();
  requestAnimationFrame(()=>{
    const target=targetId&&document.getElementById(targetId);
    if(target&&root.contains(target))target.scrollIntoView({block:'start'});
    else if(!location.hash&&!requested)window.scrollTo(0,0);
    scheduleActiveSubsection();
  });
}
render().catch(async error=>{
  console.error('Unable to load the Śaiva article',error);
  try{
    await showCompleteSourceFallback();
  }catch(fallbackError){
    console.error('Unable to load the Śaiva source fallback',fallbackError);
    const message=make('p','load-error','The article could not load. ');
    const link=make('a',null,'Open the complete source article');
    link.href=base+'source-original.html';
    message.append(link);
    root.replaceChildren(message);
  }
});
})();
