(()=>{
const params=new URLSearchParams(location.search);
const wanted=params.get('section')==='jati-distinctions'||location.hash==='#jati-distinctions';
if(!wanted)return;

const root=document.getElementById('source-content');
if(!root)return;

const sourceUrl='/advaita/articles/bhavisya-purana-addresses-varna-system/?v=20260914-audit';

/* Close translations only where the older source-page English either needs
   correction or where the omitted tarka is dense enough that a loose
   paraphrase would hide the argument. Other newly restored verses use the
   source-page translation verbatim. */
const literal={
'bp-1-40-3':`Is jāti superior, O hero, or is karma better? Seeing the son of the Kṛttikās, this great doubt has arisen for me.`,
'bp-1-40-4':`Decide this and tell it so that no doubt remains: of birth and karma, tell me which is greater.`,
'bp-1-40-8':`The ṛṣis said: O Brahmā, tell us what brāhmaṇya is among jāti, study, body, self, saṃskāra, ācāra and karma.`,
'bp-1-40-9':`If the outer and inner, common and distinguishing features are kṛtrima, are they constituted by mind, speech, action, body, jāti, substance and quality?`,
'bp-1-40-10':`Those well-known things which are said to establish distinctions of jāti should be abandoned when they are not ascertained as real things by perception or the other pramāṇas.`,
'bp-1-40-11':`If the rule of human jāti-distinctions is said to be established by an unspecified āgama, that alternative does not strengthen the force of your reasoning.`,
'bp-1-40-12':`Brahmā said: It is as you say; there is no doubt. Hear, O yogins, a statement accompanied by tarka, for the good of the disciples.`,
'bp-1-40-13':`A pramāṇa, when established, has its own distinct object. Direct perception first examines an object fit to be clearly apprehended.`,
'bp-1-40-14':`A siddhānta concerning a universal beyond the senses may be admitted; but if that alone is said to be the single pramāṇa, that does not follow.`,
'bp-1-40-15':`For there are two difficulties here for you, good sir: the Veda's pauruṣeyatva, and its being taken as support for a nitya-jāti.`,
'bp-1-40-16':`The Veda enjoins particular things to be done. An unproduced utterance is not reasonable, since hearing follows the operation of the palate and the other organs of speech.`,
'bp-1-40-17':`Because the utterance occurs after that operation and was absent before it, its existence follows that operation through anvaya and vyatireka.`,
'bp-1-40-18':`Thus a causal relation is established, like that between smoke and fire; otherwise the relation between the operation and the utterance would be inexplicable.`,
'bp-1-40-25':`Immersed and tossed about in the terrible ocean of saṃsāra, overcome by the burden of much pāpa — how is that jīva a brāhmaṇa?`,
'bp-1-40-26':`Brahmā said: Manu related the account of the seven hunters. Hearing it, O best of the Yadus, one should always abandon the jāti-designation.`,
'bp-1-40-29':`Therefore we do not see brāhmaṇya in the jīva in any way.`,
'bp-1-40-44':`Therefore no jāti remains inseparably in an embodied being. Because it is destructible, people recite verses on this matter.`,
'bp-1-40-47':`A śūdra attains brāhmaṇatā, and a brāhmaṇa attains śūdratā. A kṣatriya attains vipratva; understand the same of a vaiśya.`,
'bp-1-44-11':`Knowers of Brahman say that brāhmaṇya belongs to those who are devoted to ācāra.`,
'bp-1-44-15':`For human beings who practise such ācāra, their brāhmaṇya continually increases greatly.`
};

const notes={
'bp-1-40-15':`Here nitya is adjectival in nitya-jāti, so “permanent/eternal jāti” is appropriate. This is different from 1.40.26, where nityam is adverbial: “always.”`,
'bp-1-40-14':`The syntax and argumentative target of this verse are compressed in the transmitted text, so the English is deliberately close rather than interpretive.`
};

const verseData=(doc,id)=>{
  const heading=doc.getElementById(id);
  if(!heading)throw new Error(`Missing ${id}`);
  const sec=heading.closest('section')||heading;
  const sa=sec.querySelector(':scope > div[lang="sa"]');
  const ps=[...sec.querySelectorAll(':scope > p')];
  return {
    id,
    ref:id.replace('bp-','').replaceAll('-','.'),
    sanskrit:sa?.innerHTML||'',
    translation:literal[id]||ps[0]?.textContent.trim()||'',
    note:notes[id]||''
  };
};

const removeRequestedMeta=()=>{
  root.querySelectorAll('p').forEach(p=>{
    const t=p.textContent.trim();
    if(t.startsWith('The earlier draft left out too much of this discussion.')||
       t.startsWith('Translation note. The tarka passages below have been retranslated closely from the Sanskrit.')){
      p.remove();
    }
  });
};

const bindDetails=d=>{
  const s=d.querySelector(':scope > summary');
  if(!s)return;
  const sync=()=>s.textContent=d.open?'Hide Sanskrit':'Show Sanskrit';
  d.addEventListener('toggle',sync);sync();
};

const passage=(doc,item)=>{
  const verses=item.refs.map(id=>verseData(doc,id));
  const wrap=document.createElement('div');wrap.className='bp-argument-passage';
  const ref=document.createElement('p');ref.className='reference';ref.textContent=item.label;wrap.appendChild(ref);
  const details=document.createElement('details');details.className='sanskrit-reveal';
  details.innerHTML=`<summary>Show Sanskrit</summary><div lang="sa-Deva">${verses.map(v=>`<div style="margin:0 0 14px"><strong style="font-family:Vollkorn,Georgia,serif">${v.ref}</strong><br>${v.sanskrit}</div>`).join('')}</div>`;
  bindDetails(details);wrap.appendChild(details);
  const trans=document.createElement('div');trans.className='translation';
  trans.innerHTML=verses.map(v=>`<p style="margin:0 0 12px"><strong>${v.ref}</strong> ${v.translation}${v.note?`<br><span style="font-size:.92em"><em>Text/translation note:</em> ${v.note}</span>`:''}</p>`).join('');
  wrap.appendChild(trans);
  return wrap;
};

const makeSection=(doc,item,key)=>{
  const s=document.createElement('section');s.className='remark-section plain-remark';s.dataset.jatiAudit=key;
  const h=document.createElement('h4');h.className='remark-label';h.textContent=item.title;s.appendChild(h);
  const c=document.createElement('p');c.textContent=item.context;s.appendChild(c);
  s.appendChild(passage(doc,item));
  const a=document.createElement('p');a.className='argument-chain';a.textContent=item.argument;s.appendChild(a);
  return s;
};

const sectionByTitle=title=>[...root.querySelectorAll('section.remark-section')].find(s=>s.querySelector(':scope > h4.remark-label')?.textContent.trim()===title);

const replacePassage=(doc,title,item)=>{
  const s=sectionByTitle(title);if(!s)return false;
  const old=s.querySelector(':scope > .bp-argument-passage');if(!old)return false;
  old.replaceWith(passage(doc,item));
  if(item.context){const p=s.querySelector(':scope > h4 + p');if(p)p.textContent=item.context;}
  if(item.argument){const p=s.querySelector(':scope > p.argument-chain');if(p)p.textContent=item.argument;}
  return true;
};

const insertBefore=(doc,title,item,key)=>{
  if(root.querySelector(`[data-jati-audit="${key}"]`))return true;
  const target=sectionByTitle(title);if(!target)return false;
  target.before(makeSection(doc,item,key));return true;
};
const insertAfter=(doc,title,item,key)=>{
  if(root.querySelector(`[data-jati-audit="${key}"]`))return true;
  const target=sectionByTitle(title);if(!target)return false;
  target.after(makeSection(doc,item,key));return true;
};

const additions={
opening:{
  refs:['bp-1-40-3','bp-1-40-4','bp-1-40-5','bp-1-40-6','bp-1-40-7','bp-1-40-8','bp-1-40-9','bp-1-40-10','bp-1-40-11','bp-1-40-12'],
  label:'Bhaviṣya Purāṇa 1.40.3–12',
  context:`Śatānīka asks whether jāti or karma is superior. The sages then approach Brahmā after seeing Viśvāmitra's attainment of vipratā and ask where brāhmaṇya is actually to be located: jāti, study, body, self, saṃskāra, ācāra or karma.`,
  argument:`The question is explicitly about birth and action, and the text immediately asks for the pramāṇa by which a jāti-distinction could be established. Brahmā says the answer that follows is satarka — accompanied by reasoning.`
},
pramana:{
  title:'Before the horse-and-cow example: what can the pramāṇas establish?',
  refs:['bp-1-40-13','bp-1-40-14','bp-1-40-15','bp-1-40-16','bp-1-40-17','bp-1-40-18'],
  label:'Bhaviṣya Purāṇa 1.40.13–18',
  context:`These six verses belong to the technical lead-in that was missing before. They discuss pramāṇa, universals, nitya-jāti, and causal reasoning about Vedic utterance before the text turns to the perceptible horse-and-cow comparison.`,
  argument:`The important point for this section is 1.40.15: the text explicitly names nitya-jāti as part of the problem under examination. Verses 16–18 then use production, prior absence, and anvaya-vyatireka as part of the tarka leading into the perceptual test.`
},
jiva:{
  refs:['bp-1-40-22','bp-1-40-23','bp-1-40-24','bp-1-40-25','bp-1-40-26','bp-1-40-27','bp-1-40-28','bp-1-40-29'],
  label:'Bhaviṣya Purāṇa 1.40.22–29',
  context:`The next possibility is that brāhmaṇya belongs to the jīva rather than to the visible body. The text answers by following the same jīva through very different births.`,
  argument:`Verses 23–24 matter because they spell out the range of bodies the jīva may assume — human, animal, śūdra, dog, pig, caṇḍāla, worm and others. The seven-hunters example then ends with the explicit conclusion: brāhmaṇya is not found in the jīva itself.`
},
fallingContext:{
  title:'The text gives concrete ways a brāhmaṇa can fall before stating the general rule',
  refs:['bp-1-40-36','bp-1-40-37','bp-1-40-38','bp-1-40-39','bp-1-40-40','bp-1-40-41'],
  label:'Bhaviṣya Purāṇa 1.40.36–41',
  context:`These verses are the immediate lead-in to 1.40.42–47. They list occupations, consumption, associations and faults of conduct by which people called dvija or brāhmaṇa are treated as fallen or excluded.`,
  argument:`The point is not the individual dietary rule. The argumentative use of the list is that brāhmaṇa standing is treated as defeasible by what a person does. That prepares the next verses, which say directly that brāhmaṇya may be lost and that śūdra and brāhmaṇa status may be attained in opposite directions.`
},
sharedContinuation:{
  title:'The list of shared human conditions continues',
  refs:['bp-1-43-18','bp-1-43-19','bp-1-43-20','bp-1-43-21','bp-1-43-22','bp-1-43-23'],
  label:'Bhaviṣya Purāṇa 1.43.18–23',
  context:`These verses grammatically continue the comparison begun in 1.43.14–17. The earlier version stopped the list too soon.`,
  argument:`The text continues through punishment, grief, bodily humours, desire, wealth, pleasure and pain, disease and other conditions. Its point is cumulative: the alleged natural division is not recovered by searching these ordinary conditions of embodied human life.`
},
conductCatalogue:{
  title:'Why the long catalogue of bad conduct is part of the argument',
  refs:['bp-1-43-24','bp-1-43-25','bp-1-43-26','bp-1-43-27','bp-1-43-28','bp-1-43-29','bp-1-43-30','bp-1-43-31','bp-1-43-32','bp-1-43-33','bp-1-43-34','bp-1-43-35','bp-1-43-36'],
  label:'Bhaviṣya Purāṇa 1.43.24–36',
  context:`This is a long moral catalogue, but it is not detached filler. It precedes 1.43.37's tasmāt (“therefore”) and shows that a dvija or learned label does not prevent violence, deceit, wrong livelihood, śūdra-karma, anger and other conduct condemned by the text.`,
  argument:`The relevant inference is that inherited or outward status cannot by itself supply the sought intrinsic superiority. After this catalogue the chapter says “therefore” embodied beings are bound within a common class, and then moves straight into the reproductive jāti test.`
},
bridge44:{
  title:'The bridge from ācāra to the division of varṇa',
  refs:['bp-1-44-16','bp-1-44-17','bp-1-44-18'],
  label:'Bhaviṣya Purāṇa 1.44.16–18',
  context:`These three transitional verses were previously skipped between the long account of brāhmaṇa-ācāra and the account of how the varṇa boundaries were established.`,
  argument:`They keep the constructive answer tied to varṇa-ācāra and śāstric conduct before 1.44.19 begins the account of boundaries fixed according to undertaken activity.`
}
};

let done=false;
const apply=async()=>{
  removeRequestedMeta();
  if(done)return;
  if(!sectionByTitle('The question is jāti or karma')||!sectionByTitle('Varṇa by svabhāva, guṇa, karma, śīla and ācāra'))return;
  done=true;
  try{
    const r=await fetch(sourceUrl,{cache:'no-store'});if(!r.ok)throw new Error('Bhaviṣya source');
    const doc=new DOMParser().parseFromString(await r.text(),'text/html');

    replacePassage(doc,'The question is jāti or karma',additions.opening);
    insertAfter(doc,'The question is jāti or karma',additions.pramana,'40-pramana');
    replacePassage(doc,'Brāhmaṇya is not in the jīva',additions.jiva);
    insertBefore(doc,'The status can be lost and attained',additions.fallingContext,'40-fall-context');
    insertAfter(doc,'Same birth-source and mixed dharmas',additions.sharedContinuation,'43-shared-continuation');
    insertAfter(doc,'The list of shared human conditions continues',additions.conductCatalogue,'43-conduct-catalogue');
    insertBefore(doc,'Varṇa by svabhāva, guṇa, karma, śīla and ācāra',additions.bridge44,'44-bridge');
    removeRequestedMeta();
  }catch(e){
    console.error('Could not apply jāti audit completion',e);
  }
};

const observer=new MutationObserver(()=>apply());
observer.observe(root,{childList:true,subtree:true});
apply();
setTimeout(()=>observer.disconnect(),15000);
})();