/* Complete Shaiva article reader. The manuscript data is preserved separately;
   this file only turns it into the same quiet, paged reading experience used
   by the Varna-vicara article. */
(()=>{
'use strict';

const site='/advaita/';
const base=site+'articles/a-shaiva-lens-on-shiva-as-the-supreme-deity/';
const root=document.getElementById('source-content');
if(!root)return;

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
  return 'Objections and Dharmashastra';
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
      if(major===1||major===2||major===3||major===5)return;
      if(major===6&&info.prefix){
        const first=subsectionTitles['6.1'];
        start(first.id,first.title,major,chapterTitle);
        return;
      }
      const id=major===4?'double-standards-on-absolute-and-relative-supremacy':
        major===7?'purva-paksha-mahanarayana-upanishad':
        major===8?'addressing-the-scope-of-questions-argument':
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
          start(definition.id,definition.title,major,chapterTitle);
          return;
        }
      }
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
  if(block.kind==='subheading')return make('h3',null,sentenceTitle(block.value));
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
    if(citation.matches('p.reference')&&/^(?:english translation|sanskrit text(?: and english translation)?)\\s*:?[.]?$/i.test(articleText(citation.textContent)))continue;
    let target=citation.previousElementSibling;
    if(isTranslation(target)){
      while(isTranslation(target.previousElementSibling))target=target.previousElementSibling;
      if(isQuoteSource(target.previousElementSibling))target=target.previousElementSibling;
      target.before(citation);
    }else if(isQuoteSource(target))target.before(citation);
  }
}

function href(section){
  return section.id==='contents'?base:base+'?section='+encodeURIComponent(section.id);
}

function tocInto(node,sections,selected){
  node.replaceChildren();
  const groups=new Map();
  for(const section of sections){
    let group=groups.get(section.parent);
    if(!group){
      const wrapper=make('details','toc-group');
      const summary=make('summary','toc-parent');
      summary.append(make('span','toc-parent-title',section.parent));
      const children=make('div','toc-children');
      wrapper.append(summary,children);
      node.append(wrapper);
      group={wrapper,summary,children,current:null};
      groups.set(section.parent,group);
    }
    const link=make('a',section.id===selected.id?'is-active':'',section.title);
    link.href=href(section);
    link.dataset.section=section.id;
    if(section.id===selected.id){
      link.setAttribute('aria-current','page');
      group.wrapper.classList.add('has-current');
      group.current=make('span','toc-current',section.title);
      group.summary.append(group.current);
    }
    group.children.append(link);
  }
}

function navLink(anchor,section,label){
  anchor.replaceChildren(make('small',null,label));
  if(!section){
    anchor.classList.add('disabled');
    anchor.removeAttribute('href');
    return;
  }
  anchor.classList.remove('disabled');
  anchor.href=href(section);
  anchor.append(document.createTextNode(section.title));
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

async function render(){
  const pages=await load();
  const sections=sectionsFrom(pages);
  const contentsIndex=sections.findIndex(section=>section.id==='contents');
  if(contentsIndex>0)sections.unshift(sections.splice(contentsIndex,1)[0]);
  const requested=new URLSearchParams(location.search).get('section');
  const legacy={
    opening:'opening-salutation',index:'contents',
    'section-1':'introduction','section-2':'padma-pur-a-s-contradiction',
    'section-3':'shiva-purana-on-the-true-nature-of-vishnu',
    'section-4':'double-standards-on-absolute-and-relative-supremacy',
    'section-5':'shvetashvatara-upanishad-and-adi-shankaracharya-on-shivas-supremacy',
    'section-6':'lord-rama-on-supremacy-of-shiva','section-7':'purva-paksha-mahanarayana-upanishad',
    'section-8':'addressing-the-scope-of-questions-argument','section-9':'smriti-testimony'
  };
  const resolved=requested&&legacy[requested]||requested;
  let selected=sections.find(section=>section.id===resolved)||sections[0];
  if(requested&&selected.id!==requested)history.replaceState(null,'',href(selected));
  const index=sections.indexOf(selected);
  const desktop=document.getElementById('shaiva-desktop-toc');
  const mobile=document.getElementById('shaiva-mobile-toc');
  if(desktop)tocInto(desktop,sections,selected);
  if(mobile)tocInto(mobile,sections,selected);
  document.getElementById('section-parent').textContent=selected.chapterTitle||selected.parent;
  document.getElementById('section-count').textContent='Section '+(index+1)+' of '+sections.length;
  navLink(document.getElementById('page-prev'),sections[index-1],'Previous');
  navLink(document.getElementById('page-next'),sections[index+1],'Next');
  document.title=selected.title+' — A Scripture-Based Case for the Supremacy of Shiva — Viveka Drishti';
  const content=document.createDocumentFragment();
  content.append(make('h3',null,selected.title));
  for(const block of selected.blocks)content.append(renderBlock(block,selected.id));
  normalizeCitationOrder(content);
  root.replaceChildren(content);
}

render().catch(error=>{
  console.error('Unable to load the Śaiva article',error);
  root.replaceChildren(make('p','load-error','The article could not load. Refresh this page and try again.'));
});
})();
