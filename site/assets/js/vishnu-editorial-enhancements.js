/* Vishnu article only. Source-faithful presentation enhancements.
 * No scripture text, table statements, or section order is generated here.
 * Where the paper gives no verse locator, say so explicitly instead of guessing. */
(()=>{
'use strict';
if(!document.querySelector('.document-content'))return;
const root=document.querySelector('.document-content');
const txt=node=>(node?.textContent||'').replace(/\s+/g,' ').trim();
const citationSel='p.reference,p.source-citation,p.scripture-source,p.citation,.verse-provenance';
const figureCaptions={
 'vishnu-lakshmi.webp':'Viṣṇu and Lakṣmī — cover illustration reproduced from the original paper, p. 1.',
 'vishnu-veda-divisions.webp':'The Vedic divisions — original diagram from the supplied paper, p. 5.',
 'vishnu-smriti-sources.webp':'Sources related to the Vedas — original diagram from the supplied paper, p. 7.',
 'vishnu-emblem.webp':'Closing emblem — original illustration from the supplied paper, p. 72.'
};
for(const fig of root.querySelectorAll('figure')){
  if(fig.querySelector('figcaption'))continue;
  const img=fig.querySelector('img');
  if(!img)continue;
  const source=Object.entries(figureCaptions).find(([file])=>(img.getAttribute('src')||'').includes(file));
  if(!source)continue;
  const caption=document.createElement('figcaption');
  caption.textContent=source[1];
  fig.append(caption);
}
function wrapTable(table){
  if(table.parentElement?.classList.contains('table-scroll'))return;
  const wrap=document.createElement('div');
  wrap.className='table-scroll';
  wrap.tabIndex=0;
  wrap.setAttribute('role','region');
  const caption=table.querySelector('caption');
  wrap.setAttribute('aria-label',caption?txt(caption):'Source comparison table');
  table.before(wrap);
  wrap.append(table);
}
for(const bibliography of root.querySelectorAll('.document-reference-section .source-page-body ol')){
  const items=[...bibliography.children].filter(item=>item.matches('li'));
  if(!items.length)continue;
  const table=document.createElement('table');
  table.className='bibliography-table';
  table.setAttribute('aria-label','Bibliography entries in original numbered order');
  const thead=document.createElement('thead'),headrow=document.createElement('tr');
  for(const label of ['No.','Source or work']){
    const th=document.createElement('th');
    th.scope='col';th.textContent=label;headrow.append(th);
  }
  thead.append(headrow);table.append(thead);
  const tbody=document.createElement('tbody');
  let n=Number(bibliography.getAttribute('start')||1);
  for(const item of items){
    const tr=document.createElement('tr');
    const number=document.createElement('td');
    if(item.hasAttribute('value'))n=Number(item.getAttribute('value'))||n;
    number.textContent=String(n++);
    const work=document.createElement('td');
    while(item.firstChild)work.append(item.firstChild);
    tr.append(number,work);tbody.append(tr);
  }
  table.append(tbody);
  bibliography.replaceWith(table);
}
for(const table of root.querySelectorAll('table'))wrapTable(table);

/* Locate only printed or already-transcribed attributions. Do not invent a
 * chapter or verse number from an unrelated mention in nearby prose. */
function isCitation(node){return !!node?.matches?.(citationSel);}
function existingLabel(details){
  let prev=details.previousElementSibling,steps=0;
  while(prev&&steps++<3){
    if(isCitation(prev)&&txt(prev))return txt(prev);
    if(prev.matches('details.sanskrit-reveal,h2,h3,h4,table,figure'))break;
    prev=prev.previousElementSibling;
  }
  return '';
}
function nearbyVerbatimReference(details){
  const parent=details.closest('.scripture-quote-pair,.women-scripture-pair')||details;
  let prev=parent.previousElementSibling;
  let inspected=0;
  while(prev&&inspected++<2){
    if(isCitation(prev)&&txt(prev))return txt(prev);
    if(prev.matches('h2,h3,h4,details,table,figure,.scripture-quote-pair'))break;
    const t=txt(prev);
    // A literal "Source: ..." line in the provided transcription.
    const explicit=t.match(/(?:^|\s)Source:\s*([^\n]{5,155})/i);
    if(explicit)return 'Source: '+explicit[1].replace(/\s+/g,' ').trim();
    prev=prev.previousElementSibling;
  }
  return '';
}
const quotedDetails=[...root.querySelectorAll('details.sanskrit-reveal')];
for(let i=0;i<quotedDetails.length;i++){
  const details=quotedDetails[i];
  const summary=details.querySelector(':scope > summary');
  if(!summary)continue;
  const siblingCitation=existingLabel(details);
  if(siblingCitation)continue;
  let label=nearbyVerbatimReference(details);
  let uncertainty=false;
  if(i===0)label='Source: Maṅgalācaraṇam (opening invocation), Hari-paratva-vimarśaḥ, PDF p. 2.';
  if(!label&&i===quotedDetails.length-1){
    label='Source: Closing colophon, Hari-paratva-vimarśaḥ, PDF p. 72.';
  }
  if(!label){
    const section=details.closest('.document-section');
    const sectionName=txt(section?.querySelector('.document-section-title,.source-page-heading,.document-group-heading'))||'this section';
    label='Exact scripture/verse locator not provided beside this passage in the source transcription ('+sectionName+').';
    uncertainty=true;
  }
  const note=document.createElement('p');
  note.className='verse-provenance'+(uncertainty?' is-unverified':'');
  note.textContent=label;
  details.before(note);
}
})();
