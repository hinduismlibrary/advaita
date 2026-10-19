/* Plain-English cleanup shared by the Varna and meat-eating articles.
   It keeps Devanagari in quiet Sanskrit controls and presents every Roman
   word in the same plain ASCII reader style. */
(()=>{
'use strict';

if(!/\/articles\/(?:a-shashtric-lens-of-varna-part-one|meat-eating-in-hinduism-through-the-lens-of-shastra|a-vaishnava-lens-on-vishnu-as-the-supreme-deity)\/?$/.test(location.pathname))return;
const root=document.getElementById('source-content');
if(!root)return;

const devanagariRun=/(?:[॥।]\s*)?[\u0900-\u097F][\u0900-\u097F\s।॥०-९|,.;:!?()\-–—\u200c\u200d]*[\u0900-\u097F।॥]/gu;

const toAscii=value=>String(value??'')
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
  .replace(/\bKrishna\b/gi,'Krishna')
  .replace(/\bRigveda\b/gi,'Rigveda')
  .replace(/\bDrishti\b/gi,'Drishti')
  .replace(/\bin\s+this\s+document\b/gi,'in this article')
  .replace(/\bthis\s+document\b/gi,'this article')
  .replace(/\bsource\s+document\b/gi,'article')
  .replace(/\bas\s+tabulated\s+in\s+the\s+source\s+PDF\b/gi,'')
  .replace(/\bcontinued\s+on\s+(?:the\s+)?source\s+PDF\s+page\s+\d+\b/gi,'')
  .replace(/\bsource\s+PDF\s+page\s+\d+\b/gi,'')
  .replace(/\bPDF\s+page\s+\d+\b/gi,'')
  .replace(/\bsource\s+PDF\b/gi,'article')
  .replace(/\bPDF\b/gi,'article')
  .replace(/\bBY\s+POPCULTKING\b/gi,'')
  .replace(/\bPOPCULTKING\b/gi,'')
  .replace(/\b([A-Z]{2,})\b/g,match=>match.toLowerCase())
  .replace(/[ \t]{2,}/g,' ');

const isSanskritNode=node=>{
  const element=node.nodeType===Node.ELEMENT_NODE?node:node.parentElement;
  return !!element?.closest('[lang^="sa"]');
};

const makeDetails=(sourceText,transliteration='')=>{
  const details=document.createElement('details');
  details.className='sanskrit-reveal';
  const summary=document.createElement('summary');
  summary.textContent='Show Sanskrit';
  const source=document.createElement('div');
  source.lang='sa-Deva';
  source.textContent=sourceText.trim();
  details.append(summary,source);
  if(transliteration.trim()){
    const roman=document.createElement('p');
    roman.className='sanskrit-transliteration';
    roman.textContent=toAscii(transliteration.trim());
    details.append(roman);
  }
  details.addEventListener('toggle',()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit'});
  return details;
};

const makeTransliterationDetails=value=>{
  const details=document.createElement('details');
  details.className='sanskrit-reveal';
  const summary=document.createElement('summary');
  summary.textContent='Show Sanskrit';
  const roman=document.createElement('p');
  roman.className='sanskrit-transliteration';
  roman.textContent=toAscii(value.trim());
  details.append(summary,roman);
  details.addEventListener('toggle',()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit'});
  return details;
};

const blockSelector='p,blockquote,li,h2,h3,h4';

const boundaryBefore=value=>value
  .replace(/[“"(\[]\s*$/u,'')
  .replace(/\s*[/]\s*$/u,'')
  .trim();

const boundaryAfter=value=>value
  .replace(/^\s*[”"\)\]]\s*/u,'')
  .replace(/^\s*[/]\s*/u,'')
  .trim();

const blockPart=(node,value,keepId)=>{
  const part=node.cloneNode(false);
  part.removeAttribute('style');
  if(!keepId)part.removeAttribute('id');
  part.textContent=toAscii(value);
  return part;
};

const splitBlock=node=>{
  const raw=node.textContent||'';
  const matches=[...raw.matchAll(devanagariRun)];
  if(!matches.length)return false;
  const fragment=document.createDocumentFragment();
  let cursor=0,partIndex=0;
  for(const match of matches){
    const before=boundaryBefore(raw.slice(cursor,match.index));
    if(before)fragment.append(blockPart(node,before,partIndex++===0));
    fragment.append(makeDetails(match[0]));
    cursor=match.index+match[0].length;
  }
  const after=boundaryAfter(raw.slice(cursor));
  if(after)fragment.append(blockPart(node,after,partIndex++===0));
  if(!fragment.childNodes.length)return false;
  node.replaceWith(fragment);
  return true;
};

/* Flattened mixed-script paragraphs from the old reader are rebuilt as
   separate English blocks and Sanskrit controls. */
for(const node of [...root.querySelectorAll(blockSelector)]){
  if(node.closest('details,table'))continue;
  if(!node.querySelector('.mixed-sanskrit'))continue;
  const otherChildren=[...node.children].filter(child=>!child.classList.contains('mixed-sanskrit'));
  if(!otherChildren.length)splitBlock(node);
}

/* Catch any unmarked Sanskrit that remained in a plain paragraph or heading. */
for(const node of [...root.querySelectorAll(blockSelector)]){
  if(node.closest('details,table'))continue;
  if(node.children.length)continue;
  const value=node.textContent||'';
  if(!/[\u0900-\u097F]/u.test(value))continue;
  if(!/[A-Za-z]/u.test(value)){
    if(/^h[2-4]$/i.test(node.tagName)){
      const heading=node.cloneNode(false);
      heading.removeAttribute('style');
      heading.textContent='Sanskrit passage';
      node.replaceWith(heading,makeDetails(value));
    }else{
      node.replaceWith(makeDetails(value));
    }
    continue;
  }
  splitBlock(node);
}

/* Sanskrit-only source headings become plain English labels while the
   original heading text remains available inside its control. */
for(const node of [...document.querySelectorAll('.toc a,.toc-parent')]){
  const value=(node.textContent||'').trim();
  if(/^[\s\u0900-\u097F०-९।॥|,.;:!?()\-–—]+$/u.test(value)&&/[\u0900-\u097F]/u.test(value)){
    node.textContent='Sanskrit passage';
  }
}

/* A transliteration is never left as a loose line in the article. */
for(const node of [...root.querySelectorAll('.sanskrit-transliteration')]){
  if(!node.closest('details'))node.replaceWith(makeTransliterationDetails(node.textContent||''));
}

/* Standardise every Sanskrit control, including controls present in source. */
root.querySelectorAll('details').forEach(details=>{
  const summary=details.querySelector(':scope>summary');
  if(!summary)return;
  if(/sanskrit/i.test(summary.textContent||'')){
    details.classList.add('sanskrit-reveal');
    const sync=()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit'};
    details.addEventListener('toggle',sync);
    sync();
  }
});

/* Remove typographic citation dashes that made the old source look pasted. */
root.querySelectorAll('.source-citation').forEach(node=>{
  const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
  const first=walker.nextNode();
  if(first)first.nodeValue=first.nodeValue.replace(/^\s*[—–-]\s*/u,'');
});

/* Normalise only Roman text. Devanagari and anything inside a Sanskrit
   language node remains byte-for-byte untouched. */
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
const textNodes=[];
let current;
while((current=walker.nextNode())){
  if(current.parentElement?.closest('script,style'))continue;
  textNodes.push(current);
}
for(const node of textNodes){
  if(isSanskritNode(node))continue;
  node.nodeValue=toAscii(node.nodeValue);
}

const brand=document.querySelector('.sitebar a');
if(brand)brand.textContent='Viveka Drishti';
document.title=toAscii(document.title).replace(/Viveka Drsti/g,'Viveka Drishti');
const title=document.querySelector('.article-head h1');
if(title)title.textContent=toAscii(title.textContent);
})();