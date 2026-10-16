(() => {
  const root=document.getElementById('scripture-browser');
  const previousOpen=window.openScriptureEncyclopedia;
  if(!root||typeof previousOpen!=='function') return;

  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const U=window.SCRIPTURE_UPANISHAD_UNITS||{};

  const GROUPS={
    'Mukhya':['Aitareya','Kauṣītaki','Kena','Chāndogya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya'],
    'Sāmānya Vedānta':['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'],
    'Sannyāsa':['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'],
    'Yoga':['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'],
    'Vaiṣṇava':['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'],
    'Śaiva':['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'],
    'Śākta':['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']
  };
  const ALL=new Set(Object.values(GROUPS).flat());
  const EXCLUDE=new Set(['Kena','Chāndogya']);
  const groupOf=n=>Object.keys(GROUPS).find(g=>GROUPS[g].includes(n))||'Upaniṣad';

  const MUK={
    'Īśāvāsya':1,'Kena':2,'Kaṭha':3,'Praśna':4,'Muṇḍaka':5,'Māṇḍūkya':6,'Taittirīya':7,'Aitareya':8,'Chāndogya':9,'Bṛhadāraṇyaka':10,
    'Brahma':11,'Kaivalya':12,'Jābāla':13,'Śvetāśvatara':14,'Haṃsa':15,'Āruṇi':16,'Garbha':17,'Nārāyaṇa':18,'Paramahaṃsa':19,'Amṛtabindu':20,
    'Amṛtanāda':21,'Atharvaśiras':22,'Atharvaśikhā':23,'Maitrāyaṇī':24,'Kauṣītaki':25,'Bṛhajjābāla':26,'Nṛsiṃhatāpanī':27,'Kālāgnirudra':28,'Maitreya':29,'Subāla':30,
    'Kṣurikā':31,'Mantrikā':32,'Sarvasāra':33,'Nirālamba':34,'Śukarahasya':35,'Vajrasūcī':36,'Tejobindu':37,'Nādabindu':38,'Dhyānabindu':39,'Brahmavidyā':40,
    'Yogatattva':41,'Ātmabodha':42,'Nārada-Parivrājaka':43,'Triśikhi-Brāhmaṇa':44,'Sītā':45,'Yogacūḍāmaṇi':46,'Nirvāṇa':47,'Maṇḍala-Brāhmaṇa':48,'Dakṣiṇāmūrti':49,'Śarabha':50,
    'Skanda':51,'Tripādvibhūti-Mahānārāyaṇa':52,'Advayatāraka':53,'Rāmarahasya':54,'Rāmatāpanī':55,'Vāsudeva':56,'Mudgala':57,'Śāṇḍilya':58,'Paiṅgala':59,'Bhikṣuka':60,
    'Mahā':61,'Śārīraka':62,'Yogaśikhā':63,'Turīyātītāvadhūta':64,'Sannyāsa':65,'Paramahaṃsa-Parivrājaka':66,'Akṣamālikā':67,'Avyakta':68,'Ekākṣara':69,'Annapūrṇā':70,
    'Sūrya':71,'Akṣi':72,'Adhyātma':73,'Kuṇḍikā':74,'Sāvitrī':75,'Ātma':76,'Pāśupatabrahma':77,'Parabrahma':78,'Avadhūta':79,'Tripurātāpinī':80,
    'Devī':81,'Tripurā':82,'Kaṭharudra':83,'Bhāvanā':84,'Rudrahṛdaya':85,'Yogakuṇḍalinī':86,'Bhasmajābāla':87,'Rudrākṣajābāla':88,'Gaṇapati':89,'Jābāladarśana':90,
    'Tārasāra':91,'Mahāvākya':92,'Pañcabrahma':93,'Prāṇāgnihotra':94,'Gopālatāpanī':95,'Kṛṣṇa':96,'Yājñavalkya':97,'Varāha':98,'Śāṭyāyanīya':99,'Hayagrīva':100,
    'Dattātreya':101,'Garuḍa':102,'Kali-Saṇṭāraṇa':103,'Jābāli':104,'Saubhāgyalakṣmī':105,'Sarasvatī-rahasya':106,'Bahvṛca':107,'Muktikā':108
  };

  const AIYAR_SET=new Set(['Muktikā','Sarvasāra','Nirālamba','Maitreya','Kaivalya','Amṛtabindu','Ātmabodha','Skanda','Paiṅgala','Adhyātma','Subāla','Tejobindu','Brahma','Vajrasūcī','Śārīraka','Garbha','Tārasāra','Nārāyaṇa','Kali-Saṇṭāraṇa','Bhikṣuka','Nārada-Parivrājaka','Śāṇḍilya','Yogatattva','Dhyānabindu','Haṃsa','Amṛtanāda','Varāha','Maṇḍala-Brāhmaṇa','Nādabindu','Yogakuṇḍalinī']);
  const AIYAR_IMG='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Thirty_minor_Upanishads_%28IA_thirtyminorupani00naraiala%29.pdf/page1-500px-Thirty_minor_Upanishads_%28IA_thirtyminorupani00naraiala%29.pdf.jpg';
  const AIYAR_PAGE='https://commons.wikimedia.org/wiki/File:Thirty_minor_Upanishads_(IA_thirtyminorupani00naraiala).pdf';
  const BRAHMAYOGIN_IMG='https://archive.org/services/img/108_Upanishads_with_Sanskrit_Commentary_of_Upanishad_Brahma_Yogin';
  const BRAHMAYOGIN_PAGE='https://archive.org/details/108_Upanishads_with_Sanskrit_Commentary_of_Upanishad_Brahma_Yogin';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const text=x=>typeof x==='string'?x:(x?.text||x?.claim||x?.summary||x?.full||x?.short||'');
  const uniq=xs=>{const seen=new Set();return xs.map(text).map(x=>String(x||'').trim()).filter(x=>{const k=norm(x);if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const dataFor=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});

  const GROUP_COMMENTATORS={
    'Sāmānya Vedānta':'Upaniṣad Brahmayogin; later Vedānta traditions',
    'Sannyāsa':'Upaniṣad Brahmayogin; Sannyāsa and Vedānta traditions',
    'Yoga':'Upaniṣad Brahmayogin; Yoga and Vedānta traditions',
    'Vaiṣṇava':'Upaniṣad Brahmayogin; later Vaiṣṇava commentators',
    'Śaiva':'Upaniṣad Brahmayogin; later Śaiva commentators',
    'Śākta':'Upaniṣad Brahmayogin; Śrīvidyā / Śākta traditions',
    'Mukhya':'Śaṅkara, Madhva and later Vedānta traditions'
  };

  const SPECIAL_ART={
    'Tripurā':{
      src:'https://www.ifpindia.org/manuscripts/images/RE0/RE08254.jpeg',
      href:'https://digitalcollections.ifpindia.org/s/manuscripts/item/378086',
      cap:'Tripuropaniṣad, Grantha-script palm-leaf manuscript, IFP bundle RE08254, folios 134b–136a (3 folios). Institut Français de Pondichéry.'
    },
    'Vajrasūcī':{
      src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vajrasuchi%20Upanishad%20sample%20i%2C%20Samaveda%2C%20Sanskrit%2C%20Devanagari%20script%2C%201728%20CE%20manuscript.jpg',
      href:'https://commons.wikimedia.org/wiki/File:Vajrasuchi_Upanishad_sample_i,_Samaveda,_Sanskrit,_Devanagari_script,_1728_CE_manuscript.jpg',
      cap:'Vajrasūcī Upanishad manuscript, Sāmaveda, Devanagari, dated 1728. Wikimedia Commons.'
    }
  };

  function artFor(name,e,d){
    if(SPECIAL_ART[name]) return SPECIAL_ART[name];
    const im=d?.image||e?.image||e?.artwork;
    const src=im?.src||im?.url||'';
    if(src && !src.includes('108_Upanishads_with_Sanskrit_Commentary')) return {src,href:im.href||im.page||im.url||src,cap:im.cap||im.caption||`${name} textual witness.`};
    if(AIYAR_SET.has(name)) return {src:AIYAR_IMG,href:AIYAR_PAGE,cap:`K. Narayanasvami Aiyar’s 1914 public-domain Thirty Minor Upanishads. This edition contains the ${name} Upanishad.`};
    return {src:BRAHMAYOGIN_IMG,href:BRAHMAYOGIN_PAGE,cap:`Adyar Library / Upaniṣad Brahmayogin textual witness from the complete 108-Upanishad commentarial corpus. The volume contains the ${name} Upanishad; it is an edition witness, not an ancient manuscript.`};
  }

  let shade=null,reader=null,currentSources=[];
  function sourceObj(x){
    if(!x) return null;
    if(typeof x==='string') return {title:x,detail:'',url:''};
    return {title:x.title||x.t||x.citation||'Source',detail:x.detail||x.d||x.note||'',url:x.url||x.u||x.href||''};
  }
  function sourcesFor(name,e,d){
    const xs=[...arr(d?.refs),...arr(e?.sources),...arr(e?.bibliography),...arr(e?.primarySources)].map(sourceObj).filter(Boolean);
    xs.push({title:'Muktikā Upaniṣad — traditional 108-text canon',detail:'Traditional sequence and Vedic affiliations used for the Muktikā number.',url:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'});
    xs.push({title:'SanskritDocuments — Upanishad collection',detail:'Sanskrit e-text directory used to cross-check titles and received text divisions.',url:'https://sanskritdocuments.org/doc_upanishhat/'});
    xs.push({title:'Upaniṣad Brahmayogin — commentaries on the 108 Upanishads',detail:'Adyar Library commentarial corpus; useful for the received Sanskrit text and premodern interpretation.',url:BRAHMAYOGIN_PAGE});
    if(name==='Tripurā'){
      xs.unshift(
        {title:'Institut Français de Pondichéry — Tripuropaniṣad manuscript RE08254o',detail:'Grantha-script palm-leaf witness, three folios (134b–136a), in bundle RE08254.',url:'https://digitalcollections.ifpindia.org/s/manuscripts/item/378086'},
        {title:'British Library EAP1023/16/10 — Tripurā Mahopaniṣad Bhāṣya',detail:'Seventeenth-century Sanskrit commentary witness; 20 digitised TIFF images.',url:'https://searcharchives.bl.uk/?f%5Brelated_subjects_ssim%5D%5B%5D=Upanishads&per_page=100&sort=date'},
        {title:'Tripura Upanishad — recensions and bibliography',detail:'Survey of the Rigvedic and Atharvavedic recensions and relation to Śrīvidyā literature.',url:'https://en.wikipedia.org/wiki/Tripura_Upanishad'}
      );
    }
    const art=artFor(name,e,d); if(art?.href) xs.push({title:'Displayed textual witness',detail:art.cap||'',url:art.href});
    const seen=new Set();
    return xs.filter(s=>{const k=norm((s.title||'')+' '+(s.url||''));if(!k||seen.has(k))return false;seen.add(k);return true;});
  }
  const refsDefault=()=>Array.from({length:Math.min(3,currentSources.length)},(_,i)=>i+1);
  const cite=refs=>(refs?.length?refs:refsDefault()).filter(n=>n>0&&n<=currentSources.length).map(n=>`<sup class="ch-cite"><button type="button" data-current-up-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=(s,refs)=>s?`<p>${esc(s)}${cite(refs)}</p>`:'';

  function leadFor(name,e,d){
    const ps=[];
    for(const x of arr(d?.lead)) ps.push(Array.isArray(x)?x[0]:text(x));
    for(const x of arr(e?.leadParagraphs)) ps.push(text(x));
    if(e?.overview) ps.push(String(e.overview));
    if(e?.significance) ps.push(String(e.significance));
    if(!ps.length) ps.push(`The ${name} Upanishad belongs to the ${groupOf(name)} group of the Muktikā canon and is transmitted within the ${e?.period||'later Upanishadic'} textual world.`);
    const unique=uniq(ps).slice(0,5);
    while(unique.length<3){
      if(unique.length===1) unique.push(`Its received form combines the inherited authority of the Upanishad genre with the text-specific concerns documented in its structure, manuscript history and later interpretation.`);
      else unique.push(`The article below separates the date of composition, surviving textual witnesses, internal sequence of teachings and later commentarial reception rather than treating the work as a one-paragraph thematic summary.`);
    }
    return unique.map(x=>P(x)).join('');
  }

  const sameTitle=(a,b)=>{const x=norm(a),y=norm(b);return x===y||x.includes(y)||y.includes(x);};
  function bookSubs(books){return arr(books).map((b,i)=>({title:`${b.number?b.number+' — ':''}${b.title||`Section ${i+1}`}`,paragraphs:uniq([b.summary,b.text,b.note])}));}
  function richPrincipalSections(d){
    return arr(d?.sections).map(s=>({
      title:s.t||s.title,
      paragraphs:arr(s.ps||s.paragraphs).map(x=>Array.isArray(x)?x[0]:text(x)),
      subs:arr(s.subs).map(sub=>({title:sub.h||sub.title,paragraphs:arr(sub.ps||sub.paragraphs).map(x=>Array.isArray(x)?x[0]:text(x))}))
    }));
  }
  function specialistSections(e){
    return arr(e?.articleSections).map(s=>({title:s.title,paragraphs:uniq(arr(s.paragraphs)),subs:bookSubs(s.books)}));
  }

  function sectionsFor(name,e,d){
    const specialist=specialistSections(e), principal=richPrincipalSections(d), units=arr(U[name]);
    const out=[];
    const used=new Set();
    const add=s=>{
      if(!s?.title) return;
      const key=norm(s.title);
      if(used.has(key)) return;
      used.add(key);out.push(s);
    };

    const dateSpecial=specialist.filter(s=>/date|chronolog|textual identity|textual character|textual setting/i.test(s.title));
    const dateParas=uniq([
      e?.period?`Date / received form: ${e.period}`:'',
      e?.milieu||'',
      e?.datingBasis?`Dating basis: ${e.datingBasis}`:'',
      ...dateSpecial.flatMap(s=>s.paragraphs||[]),
      `Muktikā places ${name} at No. ${MUK[name]||'—'}. Its Vedic affiliation is a fact of the received canon and must be distinguished from the historical date of composition.`
    ]);
    add({title:'Date and textual identity',paragraphs:dateParas});

    const manuscriptSpecial=specialist.filter(s=>/manuscript|recension|transmission|veda affiliation|edition/i.test(s.title));
    const manParas=uniq([
      e?.manuscripts||'',e?.history||'',
      ...arr(e?.primaryRecensions).map(x=>`Recensional witness: ${text(x)}`),
      ...manuscriptSpecial.flatMap(s=>s.paragraphs||[])
    ]);
    const manSubs=[];
    if(arr(e?.primaryRecensions).length) manSubs.push({title:'Known recensions / affiliations',paragraphs:arr(e.primaryRecensions).map(x=>text(x))});
    if(name==='Tripurā'){
      manParas.unshift(
        'Tripurā survives in at least two received recensions, one attached to the Ṛgveda and another to the Atharvaveda. Exact quotation should therefore identify the edition or recension instead of assuming one universal verse sequence.',
        'The Institut Français de Pondichéry catalogues a genuine Grantha-script palm-leaf Tripuropaniṣad witness as manuscript RE08254o. The text occupies three folios, 134b–136a, within bundle RE08254 and is catalogued there as belonging to the Ṛgveda tradition.',
        'The British Library Endangered Archives Programme also catalogues a seventeenth-century Sanskrit Tripurā Mahopaniṣad Bhāṣya (EAP1023/16/10), preserving twenty digitised images. This is evidence for an established commentarial transmission well before modern printed anthologies.'
      );
      manSubs.push({title:'Ṛgvedic and Atharvavedic recensions',paragraphs:['The two Vedic affiliations are part of the modern manuscript record. The existence of both is itself evidence of transmission across canonical school settings.']});
      manSubs.push({title:'IFP Grantha palm-leaf witness',paragraphs:['IFP manuscript RE08254o: Sanskrit, Grantha script, palm leaf, three folios (134b–136a), in a larger Śrīvidyā manuscript bundle.']});
      manSubs.push({title:'Seventeenth-century commentary witness',paragraphs:['British Library EAP1023/16/10 transmits a Tripurā Mahopaniṣad commentary in Sanskrit and is dated to the seventeenth century.']});
    }
    add({title:'Manuscripts, recensions and editions',paragraphs:manParas.length?manParas:[`The ${name} Upanishad survives through later manuscript and printed Upanishad collections. The date of a surviving witness is not the date of composition of the text.`],subs:manSubs});

    for(const s of principal) add(s);
    for(const s of specialist){
      if(dateSpecial.includes(s)||manuscriptSpecial.includes(s)) continue;
      add(s);
    }

    if(units.length){
      const subs=units.map((u,i)=>Array.isArray(u)?{title:u[0]||`Teaching ${i+1}`,paragraphs:[u[1]||'']}:{title:u.title||`Teaching ${i+1}`,paragraphs:uniq([u.summary,u.text,u.note])});
      add({title:'Text and contents — section by section',paragraphs:[`The following walkthrough follows the distinctive sequence of the ${name} Upanishad rather than replacing the text with a list of generic themes.`],subs});
    }

    const alreadyReception=out.some(s=>/reception|commentar|later use|influence/i.test(s.title));
    if(!alreadyReception){
      add({title:'Commentaries, reception and scholarship',paragraphs:uniq([
        e?.significance||'',
        `The received text was included in the Muktikā 108-Upanishad canon and in the commentarial corpus of Upaniṣad Brahmayogin. Later interpretation must be distinguished from the historical formation of the root text.`,
        `Modern scholarship approaches the ${name} Upanishad through the Sanskrit witnesses, comparative chronology, sectarian or yogic literature where relevant, and the history of printed editions.`
      ])});
    }

    return out;
  }

  function figureHTML(art,klass='wiki-infobox-image'){
    if(!art?.src) return '';
    return `<figure class="${klass}"><a href="${esc(art.href||art.src)}" target="_blank" rel="noopener"><img src="${esc(art.src)}" loading="lazy" alt="" onerror="const f=this.closest('figure');if(f)f.remove();"></a><figcaption>${esc(art.cap||'Textual witness.')}</figcaption></figure>`;
  }
  function infobox(name,e,d,button){
    const group=groupOf(name), art=artFor(name,e,d);
    const title=d?.title||`${name} Upanishad`;
    const deva=d?.deva||e?.sanskritTitle||'';
    const rows=[];
    rows.push(['Date',d?.date||e?.period||'Date uncertain; see chronology section']);
    rows.push(['Type',d?.type||`${group} Upanishad`]);
    rows.push(['Veda',d?.veda||button.dataset.veda||'Traditional Muktikā affiliation']);
    if(d?.school) rows.push(['School',d.school]);
    if(d?.setting||e?.textualSetting) rows.push(['Textual setting',d?.setting||e.textualSetting]);
    if(arr(e?.primaryRecensions).length) rows.push(['Recensions',arr(e.primaryRecensions).map(text).join('; ')]);
    rows.push(['Structure',d?.structure||e?.structure||e?.extent||'See detailed structure below']);
    rows.push(['Muktika',`No. ${MUK[name]||d?.muktika||'—'}`]);
    rows.push(['Major commentators',d?.commentators||e?.commentators||GROUP_COMMENTATORS[group]||'Upaniṣad Brahmayogin; later traditions']);
    const characteristic=d?.famous||arr(e?.themes).slice(0,3).map(text).join('; ')||e?.significance||'See contents below';
    rows.push(['Characteristic teaching',characteristic]);
    return `<aside class="kena-infobox ch-infobox current-upanishad-infobox"><div class="kena-infobox-title">${esc(title)}</div>${deva?`<div class="ch-dev">${esc(deva)}</div>`:''}${figureHTML(art)}${rows.map(([k,v])=>`<div class="kena-info-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</aside>`;
  }

  function tocHTML(secs){return secs.map((s,i)=>`<li><a href="#cup-${i}">${esc(s.title)}</a>${s.subs?.length?`<ol>${s.subs.map((sub,j)=>`<li><a href="#cup-${i}-${j}">${esc(sub.title)}</a></li>`).join('')}</ol>`:''}</li>`).join('');}
  function sectionHTML(s,i){
    let body=(s.paragraphs||[]).map(x=>P(x)).join('');
    (s.subs||[]).forEach((sub,j)=>{body+=`<h3 id="cup-${i}-${j}">${esc(sub.title)}</h3>${(sub.paragraphs||[]).map(x=>P(x)).join('')}`;});
    return `<section class="kena-section ch-section" id="cup-${i}"><h2>${esc(s.title)}</h2>${body}</section>`;
  }
  function refsHTML(){return `<section class="kena-section ch-section" id="cup-refs"><h2>References</h2><ol class="ch-reference-list">${currentSources.map((s,i)=>`<li><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;}

  function close(){shade?.remove();reader?.remove();document.querySelector('.current-up-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function sourceCard(n){const s=currentSources[n-1];if(!s)return;document.querySelector('.current-up-source-card')?.remove();const c=document.createElement('aside');c.className='itihasa-source-card ch-source-card current-up-source-card';c.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong>${s.detail?`<p>${esc(s.detail)}</p>`:''}${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(c);c.querySelector('button')?.addEventListener('click',()=>c.remove());}

  function openCurrent(button,name){
    close();
    const e=dataFor(name),d=R[name]||{};
    currentSources=sourcesFor(name,e,d);
    const secs=sectionsFor(name,e,d);
    const title=d?.title||`${name} Upanishad`;
    const deva=d?.deva||e?.sanskritTitle||'';
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop current-up-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader current-up-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${title} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>${esc(title)}</h1>${deva?`<div class="up-title-dev">${esc(deva)}</div>`:''}</div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article up-wiki-article ch-wiki-article current-up-article">${infobox(name,e,d,button)}<div class="kena-lead ch-lead">${leadFor(name,e,d)}</div><nav class="kena-toc ch-toc current-up-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${tocHTML(secs)}<li><a href="#cup-refs">References</a></li></ol></nav>${secs.map(sectionHTML).join('')}${refsHTML()}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    const kind=button?.dataset?.kind||'';
    if(kind==='Upaniṣad'&&ALL.has(name)&&!EXCLUDE.has(name)) return openCurrent(button,name);
    return previousOpen(button);
  };

  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-current-up-note]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();sourceCard(Number(b.dataset.currentUpNote));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.current-up-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('current-upanishad-reader-style')){
    const st=document.createElement('style');st.id='current-upanishad-reader-style';st.textContent=`
      .current-up-article .ch-lead{min-height:390px}
      .current-up-article .ch-section h3{margin-top:25px!important}
      .current-up-article .ch-section p{margin-bottom:15px!important}
      .current-up-toc{max-width:710px!important}
      .current-up-toc>ol>li>ol{margin:4px 0 8px 20px!important}
      .current-upanishad-infobox .wiki-infobox-image{min-height:0!important;height:auto!important;background:#fff!important}
      .current-upanishad-infobox .wiki-infobox-image img{display:block!important;width:100%!important;height:auto!important;max-height:420px!important;object-fit:contain!important;background:#fff!important}
      .current-upanishad-infobox .wiki-infobox-image figcaption{font:11.5px/1.42 Arial,sans-serif;color:#54595d;padding:6px}
      .current-up-source-card{font-family:Merriweather,Georgia,serif!important}
      @media(max-width:760px){.current-up-article .ch-lead{min-height:0}.current-up-toc{max-width:none!important}}
    `;document.head.append(st);
  }
  window.SCRIPTURE_UPANISHADS_CURRENT_READER=true;
})();