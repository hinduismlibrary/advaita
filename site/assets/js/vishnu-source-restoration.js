/* Source-PDF restoration for the Vishnu paper; loaded before its paged reader. */
(()=>{
'use strict';
if(!/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(location.pathname))return;
const root=document.getElementById('preface')?.parentElement;if(!root)return;
const children=()=>[...root.children],text=n=>(n?.textContent||'').replace(/\s+/g,' ').trim();
const make=(tag,s)=>{const n=document.createElement(tag);if(s)n.textContent=s;return n};
const find=(selector,re)=>children().find(n=>n.matches(selector)&&re.test(text(n)));
const opening=find('p',/^While special attention has been given to/i);
if(opening&&!document.getElementById('objections')){const h=make('h2','5. Objections');h.id='objections';opening.before(h)}
// Shridhara's Sanskrit gloss, source PDF p. 47 (omitted in the web transcription).
const sridhara=find('p',/Shridhara explains that Rudra, though possessing full knowledge/i);
if(sridhara&&!root.querySelector('[data-vishnu-sridhara-source]')){const d=make('details');d.className='sanskrit-reveal';d.dataset.vishnuSridharaSource='47';const p=make('p','भगवानिति स्वयं सर्वज्ञोऽपि स्वपराभवेन बाणमन्यांश्च प्रति कृष्णमहिमानमबोधयदिति भावः ।');p.lang='sa-Deva';d.append(make('summary','Show Sanskrit'),p);sridhara.after(d)}
// Each entry follows the corresponding row of the paper's original tables on pp. 63–67.
// The interpretations below are attributed to the original paper, not independently established facts.
const tables=[
['Table 1: Karma-kanda',[
['Rigveda 10.113.2','Vishnu worshipped for his intrinsic nature; Indra circumstantially.'],
['Rigveda 1.156.2','Vishnu is most ancient, creator and self-born.'],
['Rigveda 1.22.20','Vishnu’s supreme station is contemplated by the wise.'],
['Taittiriya Samhita 5.5.1','Vishnu is highest among the deities.'],
['Shatapatha Brahmana 14.1.1.5','Vishnu is supreme among the deities.'],
['Aitareya Brahmana 1.1.1','Vishnu highest among the deities; Sayana explains “highest” as superiority.'],
['Shatapatha Brahmana 5.2.3.6','Vishnu highest among the deities.'],
['Paingi-rahasya Brahmana','Vishnu alone existed at the beginning, neither Shiva nor Brahma.']]],
['Table 2: Jnana-kanda',[
['Narayana Sukta','Narayana (Vishnu) is supreme Brahman, the supreme being.'],
['Narayana Upanishad','Narayana creates Shiva, Brahma, Indra and all beings.'],
['Mahopanishad 1.1','Narayana alone was in the beginning, not Shiva or Brahma.'],
['Purusha Sukta (Taittiriya Aranyaka)','Primordial Purusha, creator of everything, is the husband of Lakshmi, i.e. Vishnu.'],
['Chandogya Upanishad 12.8.3','The supreme person (“uttama purusha”) is identified as Krishna by Shankara and reinforced by Anandagiri, as cited in the paper.'],
['Brihadaranyaka Upanishad 3.7.3','Shankara identifies the supreme God, creator of the earth, as Narayana.'],
['Katha Upanishad 1.2.15','Shankara identifies the being praised by all the Vedas as Vishnu.']]],
['Table 3: Vedangas, Dharmashastras and Ramayana',[
['Manusmrti 1.10–11','Narayana as creator.'],
['Brhat Parashara Hora Shastra 1.9–11','Narayana supreme creator; Brahma and Rudra subordinate.'],
['Valmiki Ramayana 1.15.32','All deities, including Shiva, worship and seek help from Vishnu.'],
['Valmiki Ramayana 1.74.14–20','Vishnu breaks Shiva’s bow; all deities and rshis accept Vishnu as superior.'],
['Valmiki Ramayana 5.51.45','Even Brahma, Shiva and Indra cannot save one Rama wishes to slay in battle.'],
['Valmiki Ramayana 6.105.12–14','Rama (Vishnu) identified as supreme Brahman.']]],
['Table 4: Mahabharata (including Bhagavad Gita)',[
['Mahabharata 1.1.22–24','Opening salutes Vishnu and calls him supreme creator, Brahman.'],
['Mahabharata 12.338','Shiva, subordinate to Brahma and called his son, asks him about the supreme Lord.'],
['Mahabharata 12.339','Brahma narrates the greatness of the supreme Lord and identifies him as Narayana.'],
['Mahabharata 12.350','Shiva and Brahma arise from supreme Vishnu as his instruments.'],
['Mahabharata 14.118.37','Krishna says Shiva, Brahma and other gods seek refuge in him.'],
['Bhagavad Gita 7.7','Nothing is superior to Krishna; everything depends on him.'],
['Bhagavad Gita 10.2','Deities and rshis do not know his origin because he created them.'],
['Bhagavad Gita 9.23','Worship of other deities reaches him but through an improper method, as glossed by Shankara.'],
['Bhagavad Gita 9.25','Worshippers of other deities reach their respective abodes; Krishna’s reach him.'],
['Bhagavad Gita 6.47','Shankara’s gloss identifies the supreme yogin as a worshipper of Vasudeva.']]],
['Table 5: Puranas',[
['Agni Purana 379','“Bhagavan” and “Brahman” are principally used for Vishnu; others secondarily.'],
['Linga Purana 2.1.7','Vishnu is supreme and creator of Brahma and Rudra.'],
['Skanda Purana 2.2.24.11','The cosmic Purusha arises at Vasudeva’s impulse; Shiva and Brahma are partial manifestations.'],
['Garuda Purana 3.2.32','Vishnu and Lakshmi alone existed at the beginning.'],
['Garuda Purana 3.2.34–35','Vishnu alone is supreme; only he is principally Brahman.'],
['Garuda Purana 3.4.4–9','Vishnu is neither exactly identical to nor wholly separate from Brahma and Shiva, whom he indwells.'],
['Garuda Purana 3.6.44','Shiva and others do not know even Vishnu’s feet.'],
['Garuda Purana 3.1.72','Vishnu supreme among deities; Shiva foremost among his devotees.'],
['Bhagavata Purana 12.13.16','Vishnu supreme among deities; Shiva foremost among Vaishnavas.'],
['Bhagavata Purana 2.5.15','Narayana supreme in the Vedas and among deities.'],
['Bhagavata Purana 3.8 and 3.12','Vishnu creates Brahma; Brahma creates Shiva.'],
['Bhagavata Purana 10.63','Shiva’s defeat in the Bana narrative is explained by Shridhara as revealing Krishna’s greatness.'],
['Varaha Purana 70.16–18','Shiva describes Vishnu as supreme and creator of himself and Brahma.'],
['Padma Purana 6.236.2, 9','Its Shiva passage condemns regarding another deity as superior or equal to Vishnu.'],
['Padma Purana 5.97.27','Its samanvaya passage concludes Vishnu supreme.']]]
];
const makeTable=(rows,offset=0)=>{const t=make('table');t.className='source-evidence-table';t.append(make('caption','Statements and references as tabulated in the source PDF'));const tr=make('tr');['No.','Reference','Statement in the source'].forEach(s=>tr.append(make('th',s)));const head=make('thead');head.append(tr);t.append(head);const body=make('tbody');rows.forEach((r,i)=>{const row=make('tr');[String(i+1+offset),...r].forEach(v=>row.append(make('td',v)));body.append(row)});t.append(body);return t};
tables.forEach(([heading,rows],i)=>{const h=find('h3',new RegExp('^Table '+(i+1)+':'));if(!h)return;let n=h.nextElementSibling;while(n&&!n.matches('table,h2,h3'))n=n.nextElementSibling;if(n?.matches('table'))n.replaceWith(makeTable(rows,[0,8,0,6,0][i]));h.textContent=heading});
const purana=find('h3',/^Table 5:/);
if(purana&&!root.querySelector('[data-vishnu-recap]')){const rec=make('div');rec.dataset.vishnuRecap='65-67';rec.innerHTML='<h4>Purana meta-analysis — summary in the source</h4><ul><li>The opening questions of Vaishnava Puranas ask generally which deity is supreme; the Shaiva Puranas cited begin with questions specifically about Shiva.</li><li>The paper compares Padma Purana 6.236, Skanda Purana 7.1.2.87 and Matsya Purana 56.68 on the sattvika, rajasa and tamasa classification of Puranas.</li><li>It cites Varaha Purana 70.20–24 on sattva, rajas and tamas.</li></ul>';purana.before(rec)}
// The PDF (pp. 70–71) has 30 separately numbered scriptures and 18 works.
const scriptures=[
['Vedas',['Rigveda Samhita','Taittiriya Samhita','Aitareya Brahmana','Shatapatha Brahmana','Paingi Rahasya Brahmana','Purusha Suktam (Taittiriya Aranyaka)','Mahopanishat','Narayanopanishat','Chandogyopanishat','Brhadaranyakopanishat','Kathopanishat','Shvetashvataropanishat']],
['Smriti',['Manusmrti','Brhat Parashara Hora Shastra','Ramayana','Mahabharata (BORI CE)','Bhagavad Gita (Mahabharata)','Vishnu Sahasranama (Mahabharata)']],
['Darshana',['Mimamsa Sutras','Brahma Sutras']],
['Puranas',['Agni','Linga','Skanda','Kurma','Shiva','Vishnu','Bhagavata','Varaha','Padma','Narada']]
];
const acharyas=[
['Commentaries of Shankaracarya',['On the Brahma Sutras (Shariraka-Mimamsa)','On the Bhagavad Gita','On Chandogya Upanishat','On Brhadaranyakopanishat','On the Vishnu Sahasranama']],
['Works of other Acaryas',['Madhusudana Sarasvati’s Advaita-Siddhi, Nirnaya Sagar Press','Yamunacarya’s Agama-pramanya','Anandagiri’s sub-commentary on Shankara’s commentary of Chandogya Upanishad, Anand Ashram Press','Sayana’s commentary on the Aitareya Brahmana','The Brahma Samhita, rediscovered by Caitanya Mahaprabhu','Shripati Panditacarya’s commentary on Brahma Sutras (Shrikara Bhashya), Oriental Institute, Mysore','Vijayendra Tirtha’s Paratattvaprakashika','Shridharacarya’s commentary on the Bhagavatam (Bhavarthadipika)','Govindaraja’s commentary on the Ramayana (Bhushana)','Maheshvara Tirtha’s commentary on the Ramayana (Tattvadipa)','Madhusudana Sarasvati’s commentary on the Gita','Ramanuja’s commentary on the Bhagavad Gita','Abhinavagupta’s commentary on the Bhagavad Gita']]
];
function restoreBibliography(h,groups){if(!h)return;let n=h.nextElementSibling;const old=[];while(n&&!n.matches('h2,h3')){old.push(n);n=n.nextElementSibling}old.filter(e=>e.matches('ol,ul')).forEach(e=>e.remove());const wrap=make('div');wrap.className='source-bibliography';let first=1;groups.forEach(([name,items])=>{wrap.append(make('h4',name));const list=make('ol');list.start=first;items.forEach(item=>list.append(make('li',item)));first+=items.length;wrap.append(list)});h.after(wrap)}
restoreBibliography(find('h3',/^I\. Scriptures/),scriptures);
restoreBibliography(find('h3',/^II\. Works of the Acaryas/),acharyas);
const note=find('p',/^Editorial note: This web edition preserves/i);
if(note)note.textContent='Editorial note: This online article is an edited transcription of Caligayla’s paper, not a page-for-page diplomatic edition. Check the source PDF for exact wording and references.';
})();