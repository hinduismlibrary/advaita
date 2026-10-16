/*
 * Unified Upanishad encyclopedia renderer.
 * Preserves the existing 108-text research data while using the same
 * continuous, text-only layout as the Mahapurana pages.
 */
(() => {
  const root = document.getElementById('scripture-browser');
  if (!root) return;

  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const R = window.SCRIPTURE_PRINCIPAL_RICH || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};
  const PRINCIPAL_NAMES = {
    'Īśāvāsya':'Isha','Kena':'Kena','Kaṭha':'Katha','Praśna':'Prashna','Muṇḍaka':'Mundaka',
    'Māṇḍūkya':'Mandukya','Taittirīya':'Taittiriya','Aitareya':'Aitareya',
    'Chāndogya':'Chandogya','Bṛhadāraṇyaka':'Brihadaranyaka'
  };
  const PRINCIPAL_MUKTIKA = {
    'Īśāvāsya':1,'Kena':2,'Kaṭha':3,'Praśna':4,'Muṇḍaka':5,
    'Māṇḍūkya':6,'Taittirīya':7,'Aitareya':8,'Chāndogya':9,'Bṛhadāraṇyaka':10
  };
  const DEVA = {
    'Īśāvāsya':'ईशावास्योपनिषद्','Kena':'केनोपनिषद्','Kaṭha':'कठोपनिषद्',
    'Praśna':'प्रश्नोपनिषद्','Muṇḍaka':'मुण्डकोपनिषद्','Māṇḍūkya':'माण्डूक्योपनिषद्',
    'Taittirīya':'तैत्तिरीयोपनिषद्','Aitareya':'ऐतरेयोपनिषद्',
    'Chāndogya':'छान्दोग्योपनिषद्','Bṛhadāraṇyaka':'बृहदारण्यकोपनिषद्'
  };
  const PRINCIPAL_CONTENT_UNITS = {
    'Īśāvāsya':[
      ['Mantras 1–2 — world and action','The opening places the moving world within the Lord, rejects possessive grasping and immediately asks how a person may live a full life while acting.'],
      ['Mantras 3–8 — death, Self and vision','The poem contrasts self-destructive darkness with the vision that sees the unmoving Self in all beings and all beings in the Self.'],
      ['Mantras 9–14 — paired kinds of knowledge','Vidya and avidya, then sambhuti and asambhuti, are presented in deliberately paired verses; Madhyandina and Kanva orderings must be identified when interpreting the sequence.'],
      ['Mantras 15–18 — the final prayer','The speaker asks the sun to uncover truth, remembers deeds at death and appeals to Agni for guidance along the good path.']
    ],
    'Kena':[
      ['Khandas 1–2 — “By whom?”','The metrical half asks what impels mind, breath, speech, sight and hearing. Brahman is approached as the condition of every faculty, not as one more object known by them.'],
      ['Khandas 3–4 — the Yaksha and Uma','The prose half tells how Agni, Vayu and Indra fail before a mysterious Yaksha; Uma Haimavati reveals that the gods’ victory belonged to Brahman.']
    ],
    'Kaṭha':[
      ['1.1 — Nachiketas reaches Death','Given to Yama by his father, Nachiketas waits three nights and receives three boons: reconciliation, knowledge of the fire sacrifice and an answer about death.'],
      ['1.2 — Shreyas and preyas','Yama distinguishes the good from the merely pleasant and begins teaching the subtle, deathless Self.'],
      ['1.3 — chariot and discipline','Body, senses, mind, intellect and Self are arranged through the chariot image; disciplined integration makes the highest journey possible.'],
      ['2.1 — the inward Self','The senses turn outward, but the wise seek the inner Self. The valli develops the contrast between changing objects and the witnessing person.'],
      ['2.2 — the one fire and the inner ruler','Images of fire, sun and the person in the heart describe one reality appearing through many forms without being exhausted by them.'],
      ['2.3 — tree, yoga and release','The inverted ashvattha, the hierarchy beyond the unmanifest and the stilling of the senses lead to the loosening of the knots of the heart.']
    ],
    'Praśna':[
      ['Question 1 — origin of living beings','Kabandhin asks whence creatures arise; Prajapati, food, breath, sun and moon organize the reply.'],
      ['Question 2 — powers that sustain the person','Bhargava asks how many deities support a living being, and Prana demonstrates its primacy among the faculties.'],
      ['Question 3 — the course of Prana','Kaushalya asks where Prana comes from, how it divides within the body and how it connects person and cosmos.'],
      ['Question 4 — sleep and the witnessing person','Gargya asks what sleeps, dreams and remains awake; the answer moves from the faculties to the seer who experiences their states.'],
      ['Question 5 — meditation on Om','Satyakama asks about Om, and the response differentiates the fruits associated with its one, two and three measures.'],
      ['Question 6 — the person of sixteen parts','Sukesha asks about the sixteen-part person; the parts arise from and return to the imperishable person like rivers entering the sea.']
    ],
    'Muṇḍaka':[
      ['1.1 — two kinds of knowledge','A teacher lineage introduces higher knowledge of the imperishable and lower knowledge comprising the Vedas and auxiliary disciplines.'],
      ['1.2 — sacrifice and its limits','Vedic rites receive their proper sphere, but fragile ritual results cannot by themselves reach the imperishable.'],
      ['2.1 — the imperishable source','Cosmos, gods, beings and faculties proceed from the imperishable as sparks from fire.'],
      ['2.2 — the bow of Om','Om is the bow, the self the arrow and Brahman the target; concentrated knowledge crosses the field of ignorance.'],
      ['3.1 — the two birds','Two birds share one tree: one eats its fruit while the other watches, an inherited Vedic image recast as a teaching about bondage and vision.'],
      ['3.2 — knowledge and release','Truth, austerity and knowledge culminate in the knower’s release, while desire is identified as the force that carries ordinary rebirth.']
    ],
    'Māṇḍūkya':[
      ['Mantras 1–2 — Om and the Self','Om is identified with all time and the whole field of experience; the Self is said to have four quarters.'],
      ['Mantras 3–6 — waking, dream and deep sleep','The first three quarters are mapped as outward cognition, inward cognition and undifferentiated deep sleep.'],
      ['Mantra 7 — turiya','The fourth is described apophatically: neither inward nor outward cognition, peaceful, auspicious and non-dual.'],
      ['Mantras 8–12 — A, U, M and the measureless','The states are correlated with the measures of Om, ending with the measureless sound and entry into the Self.']
    ],
    'Taittirīya':[
      ['Shiksha Valli — recitation and formation','Phonetics, sacred correspondences, teacher–student discipline, ethical injunctions and the convocation address define the learned life that precedes inquiry into Brahman.'],
      ['Brahmananda Valli — Brahman, person and bliss','The text moves through food, breath, mind, understanding and bliss, then measures human and divine bliss before returning to fearlessness in Brahman.'],
      ['Bhrigu Valli — inquiry by stages','Bhrigu investigates food, breath, mind, understanding and bliss through repeated austerity, turning received instruction into progressive realization.']
    ],
    'Aitareya':[
      ['Chapter 1 — creation and entry','The Self creates worlds, guardians, faculties and food, then enters the embodied person through the opening in the head.'],
      ['Chapter 2 — three births','Embryonic generation, birth into family continuity and rebirth through the son organize a historically specific account of human reproduction.'],
      ['Chapter 3 — consciousness','The inquiry asks which Self is worshipped and culminates in the identification prajnanam brahma, later received as a mahavakya.']
    ],
    'Chāndogya':[
      ['Prapathakas 1–2 — chant and correspondence','Meditations on Udgitha and Saman connect sound, breath, sun, ritual performance and cosmic order.'],
      ['Prapathaka 3 — cosmic meditations','Madhu-vidya, Gayatri, the person in the sun and other correspondences broaden chant exegesis into a map of reality.'],
      ['Prapathaka 4 — teachers and students','Satyakama, Upakosala, Raikva and Janashruti show knowledge moving through students, householders, marginal figures and unexpected teachers.'],
      ['Prapathaka 5 — afterlife and the five fires','The five-fire teaching, two paths after death, Prana’s primacy and Vaishvanara join cosmology to human destiny.'],
      ['Prapathaka 6 — Uddalaka and Shvetaketu','Through clay, rivers, salt and the seed, Uddalaka teaches sat and repeats tat tvam asi across a staged dialogue.'],
      ['Prapathaka 7 — Narada and Sanatkumara','A ladder of increasingly comprehensive realities carries Narada from names and learning toward bhuman, the unbounded.'],
      ['Prapathaka 8 — the city of Brahman','Dahara-vidya and the long Indra–Prajapati dialogue examine the Self through waking, dream, sleep and embodied appearance.']
    ],
    'Bṛhadāraṇyaka':[
      ['Adhyayas 1–2 — Madhu Kanda','Horse-sacrifice cosmology, creation, speech and breath, Gargya, Ajatashatru and the first Maitreyi dialogue move from ritual totality toward the Self.'],
      ['Adhyayas 3–4 — Yajnavalkya Kanda','The Janaka court debates bring Yajnavalkya into exchanges with Gargi, Ushasta, Kahola and others before the second Maitreyi teaching and the language of neti neti.'],
      ['Adhyayas 5–6 — Khila Kanda','Supplementary meditations, ethical triads, genealogies, the five-fire teaching and rites concerning household continuity close the received work.']
    ]
  };

  const englishize = value => String(value || '')
    .replace(/[ŚśṢṣ]/g, c => c === c.toUpperCase() ? 'Sh' : 'sh')
    .replace(/[ṚṛṜṝ]/g, c => c === c.toUpperCase() ? 'Ri' : 'ri')
    .replace(/[Ṅṅ]/g, c => c === c.toUpperCase() ? 'Ng' : 'ng')
    .replace(/[Ññ]/g, c => c === c.toUpperCase() ? 'Ny' : 'ny')
    .replace(/[ṂṃṀṁ]/g, c => c === c.toUpperCase() ? 'M' : 'm')
    .replace(/[Ḥḥ]/g, c => c === c.toUpperCase() ? 'H' : 'h')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const txt = v => typeof v === 'string' ? v :
    (v?.text || v?.claim || v?.summary || v?.full || v?.short || v?.description ||
     v?.note || v?.title || v?.t || v?.d || '');
  const textOf = value => Array.isArray(value) ? value.map(textOf).join(' ') : String(txt(value) || '');
  const hasDocumentedCriticalEdition = values => {
    const source = textOf(values).replace(/\s+/g,' ').trim();
    if (!source || /\bcritical edition is needed\b/i.test(source)) return false;
    if (!/\b(?:critical edition|critical text)\b/i.test(source)) return false;
    return /\b(?:Olivelle|Schrader)\b[^.]{0,260}\b(?:critical edition|critical text|critically reconstructed)\b|\b(?:critical edition|critical text|critically reconstructed)\b[^.]{0,260}\b(?:Olivelle|Schrader)\b/i.test(source);
  };

  const norm = v => englishize(String(v || '')).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const uniq = values => {
    const seen = new Set();
    return values.flatMap(v => Array.isArray(v) ? v : [v]).map(txt).map(v=>String(v||'').trim()).filter(v=>{
      const k=norm(v); if(!k || seen.has(k)) return false; seen.add(k); return true;
    });
  };
  const brief = (value, sentences = 2, max = 420) => {
    const source=String(txt(value)||'').replace(/\s+/g,' ').trim();
    if(!source)return '';
    return source;
  };
  const concise=(values,limit,sentences=2,max=420)=>uniq(values).map(v=>brief(v,sentences,max)).filter(Boolean).slice(0,limit);

  const dataFor = name => Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});
  function nested(obj,name){
    if(!obj || typeof obj !== 'object') return {};
    if(obj[name] && typeof obj[name] === 'object') return obj[name];
    for(const value of Object.values(obj)){
      if(value && typeof value === 'object' && !Array.isArray(value) && value[name]) return value[name];
      if(Array.isArray(value)){
        const hit=value.find(x=>x&&typeof x==='object'&&(x.name===name||x.title===name));
        if(hit) return hit;
      }
    }
    return {};
  }
  const richFor = name => Object.assign({},nested(R,name),nested(U,name));
  const displayName = name => PRINCIPAL_NAMES[name] || englishize(name);
  const displayText = value => englishize(txt(value));
  const shortValue = value => {
    let s = displayText(value).replace(/\s+/g,' ').trim();
    if (!s) return '';
    const sentence = s.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
    if (sentence && sentence.length <= 170) s = sentence;
    if (s.length > 170) s = s.slice(0,167).replace(/\s+\S*$/,'') + '...';
    return s;
  };
  const paragraph = value => value ? `<p>${esc(displayText(value))}</p>` : '';

  function fallbackResearch(name,e,r){
    const sourceObj=v=>{
      if(!v)return null;
      if(typeof v==='string')return{title:v,detail:'',url:''};
      return{title:v.title||v.t||v.citation||v.name||txt(v)||'Source',detail:v.detail||v.d||v.note||v.description||'',url:/^https?:\/\//i.test(String(v.url||v.u||v.href||''))?String(v.url||v.u||v.href):''};
    };
    const raw=[...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(e.primarySources),...arr(r.sources),...arr(r.refs),...arr(r.bibliography)];
    raw.push({title:'Muktika Upanishad — traditional 108-text canon',detail:'Traditional sequence and Vedic affiliation.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'});
    raw.push({title:'SanskritDocuments — Upanishad collection',detail:'Electronic Sanskrit access aid.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    const refs=[],seen=new Set();
    raw.map(sourceObj).filter(Boolean).forEach(s=>{const k=norm(s.title);if(!k||seen.has(k))return;seen.add(k);refs.push(s);});
    return {sections:{
      date:uniq([e.period,e.date,e.dating,e.datingBasis,e.history,r.period,r.date]),
      structure:uniq([e.structure,e.extent,r.structure,r.extent,...arr(e.chapterMap),...arr(r.chapterMap)]),
      contents:uniq([e.overview,e.summary,r.overview,r.summary,...arr(e.contents),...arr(e.keyContents),...arr(r.contents),...arr(r.keyContents)]),
      theology:uniq([e.profile,e.theology,e.philosophy,r.profile,r.theology,r.philosophy,e.significance,r.significance,...arr(e.themes),...arr(r.themes)]),
      critical:uniq([e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,r.manuscripts,r.recensions,r.edition,r.criticalEdition]),
      reception:uniq([e.reception,e.commentaries,e.significance,r.reception,r.commentaries,r.significance]),
      social:uniq([e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation]),
      further:refs.map(s=>s.title)
    },references:refs};
  }

  function makeLead(name,e,r){
    const lines=uniq([...arr(r.lead),e.overview,e.summary,r.overview,r.summary,e.significance,r.significance]).slice(0,3);
    if(lines.length) return lines.map(paragraph).join('');
    return `<p>${esc(`${displayName(name)} Upanishad is part of the received Upanishadic corpus. This article separates traditional classification from historical composition, textual transmission, doctrine and reception.`)}</p>`;
  }
  function devaFor(name,e,r){return r.deva || e.deva || e.sanskritTitle || r.sanskritTitle || DEVA[name] || '';}

  function makeInfobox(name,button,e,r,research){
    const group=button.dataset.type || research?.group || e.group || e.type || 'Upanishad';
    const veda=button.dataset.veda || e.veda || r.veda || '';
    const muktika=research?.muktika || PRINCIPAL_MUKTIKA[name] || '';
    const rows=[
      ['Religion','Hinduism'],['Classification',group],...(muktika ? [['Muktika',`No. ${muktika}`]] : []),
      ['Language','Sanskrit'],['Vedic affiliation',veda],
      ['Period',shortValue(r.date || e.period || e.date || e.dating)],
      ['Structure',shortValue(r.structure || e.structure || e.extent)]
    ].filter(([,v])=>String(v||'').trim());
    return `<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">${esc(displayName(name))} Upanishad</div>${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(englishize(v))}</span></div>`).join('')}</aside>`;
  }

  function build(name,button){
    const e=dataFor(name),r=richFor(name);
    const research=window.UPANISHAD_RESEARCH_108?.[name] || fallbackResearch(name,e,r);
    const s=research.sections || {};
    const rawUnits=PRINCIPAL_CONTENT_UNITS[name] || arr(U[name]).map((unit,i)=>Array.isArray(unit)?[unit[0]||`Part ${i+1}`,unit[1]||'']:[unit.title||`Part ${i+1}`,unit.summary||unit.text||unit.note||'']);
    const units=rawUnits.map(([title,text])=>({title,paragraphs:concise([text],3,8,1800)})).filter(x=>x.paragraphs.length);
    const date={paragraphs:concise(s.date,10,8,2200),subs:[]};
    const structure={paragraphs:concise([s.structure,e.structure,e.extent,e.primaryRecensions],7,8,1800),subs:[]};
    const contents={paragraphs:[`This walkthrough follows the received order of the text. It separates literary sequence from later doctrinal summaries and does not assume that every unit belongs to one date.`],subs:units};
    if(!units.length)contents.paragraphs.push(...concise(s.contents,10,8,1800));
    const synthesis={paragraphs:[],subs:[
      {title:'Theology and philosophy',paragraphs:concise(s.theology,7,8,1800)},
      {title:'Reception and influence',paragraphs:concise(s.reception,6,8,1800)},
      {title:'Ritual, discipline and historical practice',paragraphs:concise(s.social,6,8,1800)}
    ].filter(x=>x.paragraphs.length)};
    const critical={paragraphs:concise(s.critical,10,8,2200),subs:[]};
    const further={paragraphs:concise([s.further,arr(research.references).map(x=>x?.title||x)],20,4,1200),subs:[]};
    const sections=[
      {title:'Date and textual history',body:date},
      {title:'Structure and recensions',body:structure},
      {title:'Contents',body:contents},
      {title:'Theology, influence and practice',body:synthesis}
    ];
    if(critical.paragraphs.length&&hasDocumentedCriticalEdition(s.critical))sections.push({title:'Critical edition and textual criticism',body:critical});
    sections.push({title:'Further reading',body:further});
    const renderBody=part=>{
      let html=arr(part.paragraphs).map(paragraph).join('');
      arr(part.subs).forEach(sub=>{html+=`<h3>${esc(englishize(sub.title))}</h3>${arr(sub.paragraphs).map(paragraph).join('')}`;});
      return html;
    };
    const sectionHtml=sections.map((section,i)=>`<section class="kena-section purana-full-section mahapurana-article-section" id="up-live-${i+1}"><h2>${esc(section.title)}</h2><div class="mahapurana-collapse-body">${renderBody(section.body)}</div></section>`).join('');
    const refs=arr(research.references);
    const refsId=sections.length+1;
    const refsHtml=`<section class="kena-section purana-full-section mahapurana-article-section universal-references" id="up-live-${refsId}"><h2>References</h2><div class="mahapurana-collapse-body"><ol>${refs.map(s=>`<li>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(englishize(s.title||'Source'))}</a>`:esc(englishize(s.title||'Source'))}${s.detail?` — ${esc(englishize(s.detail))}`:''}</li>`).join('')}</ol></div></section>`;
    const toc=`<nav class="kena-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${sections.map((section,i)=>`<li><a href="#up-live-${i+1}" data-up-target="up-live-${i+1}">${esc(section.title)}</a></li>`).join('')}<li><a href="#up-live-${refsId}" data-up-target="up-live-${refsId}">References</a></li></ol></nav>`;
    return `<article class="purana-full-article universal-wiki-article mahapurana-wiki-article upanishad-research-complete">${makeInfobox(name,button,e,r,research)}<div class="kena-lead">${makeLead(name,e,r)}</div>${toc}${sectionHtml}${refsHtml}</article>`;
  }

  function emphasize(container){
    const terms=['Brahman','Atman','Vedanta','Veda','Upanishad','Sanskrit','moksha','karma','dharma','yoga','renunciation'];
    const re=new RegExp(`\\b(${terms.join('|')})\\b`,'gi');
    container.querySelectorAll('.kena-lead p,.mahapurana-collapse-body p,.mahapurana-collapse-body li').forEach(el=>{
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];
      while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement?.closest('a,strong,h1,h2,h3'))nodes.push(n);}
      nodes.forEach(node=>{
        const text=node.nodeValue;
        if(!text || !re.test(text)){re.lastIndex=0;return;}
        re.lastIndex=0;const frag=document.createDocumentFragment();let pos=0,m;
        while((m=re.exec(text))){if(m.index>pos)frag.append(document.createTextNode(text.slice(pos,m.index)));const strong=document.createElement('strong');strong.textContent=m[0];frag.append(strong);pos=m.index+m[0].length;}
        if(pos<text.length)frag.append(document.createTextNode(text.slice(pos)));node.replaceWith(frag);re.lastIndex=0;
      });
    });
  }

  let backdrop=null,reader=null,researchLoader=null;
  function close(){
    backdrop?.remove();reader?.remove();backdrop=reader=null;document.documentElement.classList.remove('kena-article-open');
    root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
  }
  function clearLegacy(){
    document.querySelectorAll('.kena-article-backdrop,.scripture-wiki-backdrop,.current-up-backdrop,.up-research-backdrop,.chandogya-backdrop').forEach(x=>x.remove());
    document.querySelectorAll('.kena-article-reader,.scripture-wiki-reader,.current-up-reader,.up-research-reader,.chandogya-reader').forEach(x=>x.remove());
  }
  function ensureResearch(done){
    if(window.UPANISHAD_RESEARCH_108){done();return;}
    if(researchLoader){researchLoader.addEventListener('load',done,{once:true});return;}
    researchLoader=document.createElement('script');researchLoader.src='/advaita/assets/js/upanishads/current/research-108-complete.js?build=20260828-upanishad-unified-v1';researchLoader.async=false;
    researchLoader.addEventListener('load',done,{once:true});researchLoader.addEventListener('error',done,{once:true});document.head.append(researchLoader);
  }

  function open(button){
    const name=button.dataset.name||button.querySelector('span')?.textContent?.trim()||button.textContent.trim();if(!name)return false;
    close();clearLegacy();button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    const e=dataFor(name),r=richFor(name),deva=devaFor(name,e,r);
    backdrop=document.createElement('div');backdrop.className='kena-article-backdrop scripture-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader purana-full-reader mahapurana-wiki-reader upanishad-mahapurana-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${displayName(name)} Upanishad encyclopedia article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad · encyclopedia article</span><h1>${esc(displayName(name))} Upanishad ${deva?`<span class="purana-devanagari-title" lang="sa-Deva">${esc(String(deva).split('/')[0].trim())}</span>`:''}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${build(name,button)}</div>`;
    document.body.append(backdrop,reader);document.documentElement.classList.add('kena-article-open');emphasize(reader);reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;
  }

  window.addEventListener('click',ev=>{
    const button=ev.target.closest?.('#scripture-browser .shastra-name[data-kind="Upaniṣad"]');if(!button)return;
    ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();ensureResearch(()=>open(button));
  },true);
  document.addEventListener('click',ev=>{
    if(ev.target===backdrop||ev.target.closest?.('.upanishad-mahapurana-reader .kena-article-close')){close();return;}
    const link=ev.target.closest?.('.upanishad-mahapurana-reader .kena-toc a[data-up-target]');
    if(link){ev.preventDefault();const sec=document.getElementById(link.dataset.upTarget);sec?.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',`#${link.dataset.upTarget}`);}
  },true);
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&reader)close();},true);
  window.UPANISHAD_LIVE_TEMPLATE='unified-text-only-v1';
})();

