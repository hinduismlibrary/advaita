(() => {
  const previousOpen = window.openScriptureEncyclopedia;
  if (typeof previousOpen !== 'function') return;

  const D = window.SCRIPTURE_DETAIL_DATA || {};
  const PURANA_KINDS = new Set(['Mahāpurāṇa','Upapurāṇa','Both']);

  const HAZRA_RITES_URL = 'https://archive.org/details/in.ernet.dli.2015.110115';
  const HAZRA_UPA_URL = 'https://archive.org/details/in.gov.ignca.15670';
  const HAZRA_UPA2_URL = 'https://archive.org/details/in.gov.ignca.18862';
  const HINDU_MAHA_URL = 'https://hindupedia.com/en/Pur%C4%81%E1%B9%87as';
  const HINDU_UPA_URL = 'https://hindupedia.com/en/Upapur%C4%81%E1%B9%87as';
  const ROCHER_URL = 'https://books.google.com/books?id=n0-4RJh5FgoC';
  const GENERIC_IMG = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/A_monk_meditates_under_a_tree.jpg';

  const WIKI = {
    'Brahma Purāṇa':'Brahma_Purana','Padma Purāṇa':'Padma_Purana','Viṣṇu Purāṇa':'Vishnu_Purana','Śiva Purāṇa':'Shiva_Purana',
    'Liṅga Purāṇa':'Linga_Purana','Garuḍa Purāṇa':'Garuda_Purana','Nāradīya Purāṇa':'Naradiya_Purana','Bhāgavata Purāṇa':'Bhagavata_Purana',
    'Agni Purāṇa':'Agni_Purana','Skanda Purāṇa':'Skanda_Purana','Bhaviṣya Purāṇa':'Bhavishya_Purana','Brahmavaivarta Purāṇa':'Brahma_Vaivarta_Purana',
    'Mārkaṇḍeya Purāṇa':'Markandeya_Purana','Vāmana Purāṇa':'Vamana_Purana','Varāha Purāṇa':'Varaha_Purana','Matsya Purāṇa':'Matsya_Purana',
    'Kūrma Purāṇa':'Kurma_Purana','Brahmāṇḍa Purāṇa':'Brahmanda_Purana','Vāyu Purāṇa':'Vayu_Purana','Devī Bhāgavata Purāṇa':'Devi_Bhagavata_Purana',
    'Mahābhāgavata Purāṇa':'Mahabhagavata_Purana','Nṛsiṃha Purāṇa':'Narasimha_Purana','Kālikā Purāṇa':'Kalika_Purana','Sāmba Purāṇa':'Samba_Purana',
    'Saura Purāṇa':'Saura_Purana','Viṣṇudharmottara Purāṇa':'Vishnudharmottara_Purana','Bṛhaddharma Purāṇa':'Brihaddharma_Purana'
  };

  const HINDU_SPECIFIC = {
    'Ādi Purāṇa':'https://hindupedia.com/en/%C4%80dipur%C4%81na',
    'Āditya Purāṇa':'https://hindupedia.com/en/%C4%80dityapur%C4%81%E1%B9%87a'
  };


  const COMMONS_FILE_URL = 'https://commons.wikimedia.org/wiki/File:';
  const COMMONS_IMAGE_URL = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

  // Exact files are taken from the corresponding Wikipedia article where one is
  // available. Representative files are labelled as such for lost/uncertain titles.
  const ART = {
    'Brahma Purāṇa':{file:'Balabhadra_Subhadra_Jagannath.jpg',caption:'Jagannātha, Balabhadra and Subhadrā; used in the Wikipedia article on the Brahma Purāṇa.',exact:true},
    'Padma Purāṇa':{file:'Padma_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Padma Purāṇa; used in its Wikipedia article.',exact:true},
    'Viṣṇu Purāṇa':{file:'Vishnu.jpg',caption:'Viṣṇu in a Pahari painting; used in the Wikipedia article on the Viṣṇu Purāṇa.',exact:true},
    'Śiva Purāṇa':{file:'The_Creation_of_the_Cosmic_Ocean_and_the_Elements_(detail),_folio_3_from_the_Shiva_Purana,_c._1828.jpg',caption:'Creation of the cosmic ocean and elements, a folio from the Śiva Purāṇa, c. 1828; used in its Wikipedia article.',exact:true},
    'Liṅga Purāṇa':{file:'Linga_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Liṅga Purāṇa; used in its Wikipedia article.',exact:true},
    'Garuḍa Purāṇa':{file:'Garuda_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Garuḍa Purāṇa; used in its Wikipedia article.',exact:true},
    'Nāradīya Purāṇa':{file:'Naradiya_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Nāradīya Purāṇa; used in its Wikipedia article.',exact:true},
    'Bhāgavata Purāṇa':{file:'Rajasthan_manuscript_page_of_Bhagavata_Purana.jpg',caption:'An illustrated Rajasthan manuscript page of the Bhāgavata Purāṇa; used in its Wikipedia article.',exact:true},
    'Agni Purāṇa':{file:'Agni_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Agni Purāṇa; used in its Wikipedia article.',exact:true},
    'Skanda Purāṇa':{file:'Skanda_Purana,_Sanskrit,_miniature_Grantha_script,_Whish_manuscript_collection,_acquired_1829_CE.jpg',caption:'A palm-leaf Skanda Purāṇa manuscript in miniature Grantha script; used in its Wikipedia article.',exact:true},
    'Bhaviṣya Purāṇa':{file:'Bhavishya_Purana,_Bhavishyottara,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit Bhaviṣya/Bhaviṣyottara manuscript page; used in the Wikipedia article.',exact:true},
    'Brahmavaivarta Purāṇa':{file:'Brahmavaivarta_Purana.jpg',caption:'A manuscript image used in the Wikipedia article on the Brahmavaivarta Purāṇa.',exact:true},
    'Mārkaṇḍeya Purāṇa':{file:'Devimahatmya_Sanskrit_MS_Nepal_11c.jpg',caption:'An eleventh-century Nepalese Devī Māhātmya manuscript; used in the Wikipedia article on the Mārkaṇḍeya Purāṇa.',exact:true},
    'Vāmana Purāṇa':{file:'Screen_shot_of_Vamana_Purana.jpg',caption:'A page image used in the Wikipedia article on the Vāmana Purāṇa.',exact:true},
    'Varāha Purāṇa':{file:'Varaha_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Varāha Purāṇa; used in its Wikipedia article.',exact:true},
    'Matsya Purāṇa':{file:'Matsya_Purana,_Chapters_13–14,_page_1_front,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of Matsya Purāṇa chapters 13–14; used in its Wikipedia article.',exact:true},
    'Kūrma Purāṇa':{file:'Kurma_Purana,_Sanskrit,_Devanagari.jpg',caption:'A Sanskrit manuscript page of the Kūrma Purāṇa; used in its Wikipedia article.',exact:true},
    'Brahmāṇḍa Purāṇa':{file:'Adhyatma_Ramayana_verses_1.1_–_1.14,_Brahmanda_Purana_Raghunath_Hindu_temple_library,_Sanskrit,_Devanagari_lipi.jpg',caption:'An Adhyātma Rāmāyaṇa manuscript transmitted in the Brahmāṇḍa Purāṇa; used in its Wikipedia article.',exact:true},
    'Vāyu Purāṇa':{file:'Vayu_Deva.jpg',caption:'A c. 1820 painting of Vāyu. The Vāyu Purāṇa article has no suitable lead image, so this is a representative Hindu image.',exact:false},
    'Devī Bhāgavata Purāṇa':{file:'Devi_bhagavata.jpg',caption:'A Devī Bhāgavata image used in the corresponding Wikipedia article.',exact:true},
    'Mahābhāgavata Purāṇa':{file:'Debi_Durga_Sculpture_by_Sandalwood_Murshidabad_WB_30_01_2018.jpg',caption:'A Bengal image of Devī Durgā used in the Wikipedia article on the Mahābhāgavata Purāṇa.',exact:true},
    'Nṛsiṃha Purāṇa':{file:'Kalighat_Narasimha_avatar.jpg',caption:'A Kalighat image of Nṛsiṃha used in the Wikipedia article on the Nṛsiṃha Purāṇa.',exact:true},
    'Kālikā Purāṇa':{file:'Kamakhya_Temple.jpg',caption:'Kāmākhyā Temple in Assam, central to the Kālikā Purāṇa. The article has no suitable lead image, so this is a representative Commons image.',exact:false},
    'Sāmba Purāṇa':{file:'Konark_Sun_Temple_Statue_of_Sun_God.jpg',caption:'Sūrya at Konark, used in the Wikipedia article on the Sāmba Purāṇa.',exact:true},
    'Saura Purāṇa':{file:'The_Creation_of_the_Cosmic_Ocean_and_the_Elements_(detail),_folio_3_from_the_Shiva_Purana,_c._1828.jpg',caption:'A Śiva Purāṇa folio, used here as a representative image because the extant Saura Purāṇa is predominantly Śaiva/Pāśupata and has no suitable Wikipedia article image.',exact:false},
    'Viṣṇudharmottara Purāṇa':{file:'1150_CE_Hoysaleswara_temple_Halebidu_Karnataka,_Inscription,_Dancing_Saraswati_2.jpg',caption:'Dancing Sarasvatī with the arts and a manuscript, representative of the Viṣṇudharmottara Purāṇa’s encyclopedic arts teaching.',exact:false},
    'Bṛhaddharma Purāṇa':{file:'Kalighat_pictures_Indian_gods_f.25.jpg',caption:'A Bengal image of Durgā, representative of the Bṛhaddharma Purāṇa’s eastern and Goddess-oriented setting.',exact:false},
    'Viṣṇudharma Purāṇa':{file:'Vishnu.jpg',caption:'A Pahari painting of Viṣṇu, representative of the Vaiṣṇava Viṣṇudharma Purāṇa.',exact:false},
    'Śivadharma Purāṇa':{file:"Shiva's_Wedding_Procession,_folio_17_of_Shiva_Purana,_circa_1828_CE,_attributed_to_Vana_Akhavat,_Marwar_Kalam_of_Rajasthani_School_of_Art,_housed_in_the_CSMVS_Museum,_Mumbai.jpg",caption:'A Śiva Purāṇa folio, representative of the Śaiva textual world of the Śivadharma corpus.',exact:false},
    'Kapila Purāṇa':{file:'Balabhadra_Subhadra_Jagannath.jpg',caption:'Jagannātha, Balabhadra and Subhadrā, representative of the Kapila Purāṇa’s Odishan sacred-geographical world.',exact:false}
  };

  const REPRESENTATIVE_ART = {
    'Vaiṣṇava':{file:'Vishnu.jpg',caption:'A Pahari painting of Viṣṇu; representative artwork for a Vaiṣṇava title without a secure article image.'},
    'Śaiva':{file:'The_Creation_of_the_Cosmic_Ocean_and_the_Elements_(detail),_folio_3_from_the_Shiva_Purana,_c._1828.jpg',caption:'A Śiva Purāṇa folio; representative artwork for a Śaiva title without a secure article image.'},
    'Śākta':{file:'Kalighat_pictures_Indian_gods_f.25.jpg',caption:'A Bengal image of Durgā; representative artwork for a Goddess-oriented title without a secure article image.'},
    'Saura':{file:'Konark_Sun_Temple_Statue_of_Sun_God.jpg',caption:'Sūrya at Konark; representative artwork for a solar title without a secure article image.'},
    'Brahmā':{file:'Balabhadra_Subhadra_Jagannath.jpg',caption:'A Hindu devotional image from Wikimedia Commons; representative artwork for a title without a secure article image.'},
    'Mixed / composite':{file:'A_minor_Purana,_Kerala_Mahatmya,_Malayalam_script,_Sanskrit_language,_Whish_manuscript_collection,_acquired_1836_CE.jpg',caption:'A Sanskrit palm-leaf folio from a minor Purāṇa. This representative manuscript is used because the catalogue-title is lost, uncertain or lacks a secure article image.'}
  };

  function artFor(name,button){
    const picked=ART[name] || REPRESENTATIVE_ART[button?.dataset?.sect] || REPRESENTATIVE_ART['Mixed / composite'];
    const file=picked.file;
    return {
      src:COMMONS_IMAGE_URL+encodeURIComponent(file),
      href:COMMONS_FILE_URL+encodeURIComponent(file),
      alt:picked.caption.replace(/\s*(?:The article|This representative).*$/,'').trim(),
      caption:picked.caption,
      exact:!!picked.exact
    };
  }

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const plain = x => typeof x === 'string' ? x : (x?.text || x?.claim || x?.summary || x?.full || x?.short || x?.title || '');
  const uniq = xs => { const seen = new Set(); return xs.map(plain).map(x => String(x||'').trim()).filter(x => { const k=x.toLowerCase().replace(/\s+/g,' '); if(!k||seen.has(k))return false;seen.add(k);return true; }); };
  const slug = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  function entryFor(name) { return Object.assign({}, D[name] || {}, D[`Purāṇa:${name}`] || {}); }
  function sourceObj(x) {
    if (!x) return null;
    if (typeof x === 'string') {
      const m = x.match(/https?:\/\/\S+/);
      return {title:x.replace(/\s+https?:\/\/\S+.*/,'').trim() || x, detail:'', url:m?m[0]:''};
    }
    return {title:x.title || x.citation || x.text || x.claim || 'Source', detail:x.detail || x.note || '', url:x.url || x.href || ''};
  }
  function wikiUrl(name) {
    const p = WIKI[name];
    return p ? `https://en.wikipedia.org/wiki/${p}` : `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(name)}`;
  }
  function sourcesFor(name, kind, e) {
    const out = [];
    out.push({key:'hazra-rites',title:'R. C. Hazra — Studies in the Purāṇic Records on Hindu Rites and Customs',detail:'Chronology of Purāṇic chapters; rites, customs, social history and the absorption of Tantric material.',url:HAZRA_RITES_URL});
    if (kind !== 'Mahāpurāṇa') {
      out.push({key:'hazra-upa',title:'R. C. Hazra — Studies in the Upapurāṇas, volume I',detail:'Early Śaiva, Śākta and catalogue-title studies; textual identity, chronology, ritual and manuscript evidence.',url:HAZRA_UPA_URL});
      out.push({key:'hazra-upa-2',title:'R. C. Hazra — Studies in the Upapurāṇas, volume II',detail:'Saura and Vaiṣṇava Upapurāṇas; chronology, chapter strata, ritual and manuscript evidence.',url:HAZRA_UPA2_URL});
    }
    out.push({key:'wiki',title:`Wikipedia — ${name}`,detail:'Article-specific cross-check for structure, manuscript history, dating, contents and reception.',url:wikiUrl(name)});
    out.push({key:'hindupedia',title:`Hindupedia — ${name}`,detail:'Traditional encyclopedia cross-check for contents, classification, ritual and received tradition.',url:HINDU_SPECIFIC[name] || (kind === 'Mahāpurāṇa' ? HINDU_MAHA_URL : HINDU_UPA_URL)});
    out.push({key:'grok',title:`Grokipedia search — ${name}`,detail:'Additional encyclopedia lead; claims are retained only when corroborated by stronger textual or scholarly sources.',url:`https://grokipedia.com/search?q=${encodeURIComponent(name)}`});
    out.push({key:'rocher',title:'Ludo Rocher — The Purāṇas',detail:'Modern survey of Purāṇa textual history, classification, recensions and scholarship.',url:ROCHER_URL});
    [...arr(e.sources),...arr(e.bibliography),...arr(e.primarySources),...arr(e.references)].map(sourceObj).filter(Boolean).forEach(s=>out.push(s));
    const seen=new Set();
    const canonical=s=>{
      const t=(s.title||'').toLowerCase();
      if(/ludo rocher|the purāṇas|the puranas/.test(t))return'rocher';
      if(/hazra/.test(t)&&/upapur/.test(t))return /volume ii|vol\.?\s*2/.test(t)?'hazra-upa-2':'hazra-upa';
      if(/hazra/.test(t)&&/puranic records|purāṇic records|rites and customs/.test(t))return'hazra-rites';
      if(s.url)return String(s.url).replace(/^http:/,'https:').replace(/[?#].*$/,'').replace(/\/$/,'').toLowerCase();
      return t.replace(/[^a-z0-9]+/g,' ').trim();
    };
    return out.filter(s=>{const k=canonical(s);if(!k||seen.has(k))return false;seen.add(k);return true;});
  }

  function sourceIndex(sources,key){const i=sources.findIndex(s=>s.key===key);return i>=0?i+1:0;}
  function citeLink(n,sources){if(!n)return'';const s=sources[n-1];if(!s)return'';return `<sup class="purana-source-cite"><a href="${esc(s.url||`#purana-ref-${n}`)}"${s.url?' target="_blank" rel="noopener"':''} title="${esc(s.title)}">[${n}]</a></sup>`;}
  function p(text,cite=''){ if(!text)return''; return `<p>${esc(plain(text))}${cite}</p>`; }

  function sectionSources(title,sources,kind){
    const t=String(title||'').toLowerCase();
    if(/ritual|dharma|social|custom|vrata|gift|dāna|sraddha|śrāddha|tantr/.test(t)) return [sourceIndex(sources,'hazra-rites')];
    if(/upapur|catalog|classification|identity|lost|attestation/.test(t) && kind!=='Mahāpurāṇa') return [sourceIndex(sources,'hazra-upa')];
    if(/date|chronolog|formation|manuscript|recension|edition|transmission/.test(t)) return [sourceIndex(sources,kind==='Mahāpurāṇa'?'hazra-rites':'hazra-upa'),sourceIndex(sources,'rocher')].filter(Boolean).slice(0,2);
    if(/contents|structure|book|skandha|khanda|khaṇḍa|chapter|narrative|episode/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'hindupedia')].filter(Boolean).slice(0,2);
    if(/theolog|bhakti|shaiva|śaiva|vaish|vaiṣ|shakta|śākta|religious|doctrine|philosoph/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'hindupedia')].filter(Boolean).slice(0,2);
    if(/reception|influence|commentar|scholar/.test(t)) return [sourceIndex(sources,'wiki'),sourceIndex(sources,'rocher')].filter(Boolean).slice(0,2);
    return [sourceIndex(sources,'wiki')].filter(Boolean);
  }

  function renderParagraphs(items, refs, sources) {
    const xs = uniq(arr(items));
    const cites=refs.map(n=>citeLink(n,sources)).join('');
    return xs.map(x=>p(x,cites)).join('');
  }
  function renderBooks(books,refs,sources){
    const xs=arr(books); if(!xs.length)return'';
    return `<div class="purana-books">${xs.map((b,i)=>{
      if(typeof b==='string') return `<div class="purana-book">${p(b,refs.map(n=>citeLink(n,sources)).join(''))}</div>`;
      const title=b.title||b.name||`Book ${b.number||i+1}`;
      const num=b.number ? `${b.number}. ` : '';
      return `<div class="purana-book"><h3>${esc(num+title)}</h3>${renderParagraphs([b.summary,b.text,b.description,b.note],refs,sources)}</div>`;
    }).join('')}</div>`;
  }
  function renderCustomSection(s, idx, sources, kind) {
    const title=s?.title || `Section ${idx+1}`;
    const refs=sectionSources(title,sources,kind);
    let body=renderParagraphs(s?.paragraphs || s?.text,refs,sources);
    body+=renderBooks(s?.books,refs,sources);
    arr(s?.subsections).forEach((sub,j)=>{
      const st=sub.title||`Subsection ${j+1}`;
      body+=`<h3>${esc(st)}</h3>${renderParagraphs(sub.paragraphs||sub.text,refs,sources)}${renderBooks(sub.books,refs,sources)}`;
      const bullets=uniq(arr(sub.bullets)); if(bullets.length) body+=`<ul>${bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    });
    const bullets=uniq(arr(s?.bullets)); if(bullets.length) body+=`<ul>${bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    if(s?.note)body+=`<div class="kena-note">${esc(plain(s.note))}</div>`;
    if(!body)return null;
    return {id:`pur-${slug(title)}-${idx}`,title,html:`<section class="kena-section ch-section purana-full-section" id="pur-${slug(title)}-${idx}"><h2>${esc(title)}</h2>${body}</section>`};
  }

  function automaticSections(name,kind,e,sources,customTitles){
    const secs=[];
    const has = re => customTitles.some(t=>re.test(t));
    const mk=(title,paras,subs=[])=>{
      const refs=sectionSources(title,sources,kind); const ps=uniq(paras); const goodSubs=subs.filter(x=>x&&x.title&&uniq(x.paragraphs||[]).length);
      if(!ps.length&&!goodSubs.length)return;
      let body=renderParagraphs(ps,refs,sources);
      goodSubs.forEach((s,j)=>{body+=`<h3>${esc(s.title)}</h3>${renderParagraphs(s.paragraphs,refs,sources)}`;});
      secs.push({id:`pur-auto-${slug(title)}`,title,html:`<section class="kena-section ch-section purana-full-section" id="pur-auto-${slug(title)}"><h2>${esc(title)}</h2>${body}</section>`});
    };

    if(!has(/date|chronolog|formation|textual history/i)) mk('Date, composition and textual formation',[e.period,e.milieu,e.history,e.datingBasis,e.status]);
    if(!has(/manuscript|recension|edition|transmission/i)) mk('Manuscripts, recensions and editions',[e.manuscripts, arr(e.primaryRecensions).length?`Major recensions or textual organizations: ${arr(e.primaryRecensions).map(plain).join('; ')}.`:'',...arr(e.dependencies).map(plain)]);
    if(!has(/structure|contents|skandha|khaṇḍa|khanda|book|chapter/i)) mk('Structure and complete contents',[e.extent,e.structure,e.booksCount?`Major divisions: ${e.booksCount}.`:'',e.verseCount?`Verse count or traditional extent: ${e.verseCount}.`:'',...arr(e.chapterMap),...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures)]);
    if(!has(/ritual|dharma|social|custom|vrata|pilgrimage|sacred geography/i)) mk('Ritual, dharma, sacred geography and social world',[e.ritualHistory,...arr(e.rituals),...arr(e.sacredGeography),...arr(e.pilgrimage),...arr(e.dharma),...arr(e.socialHistory)]);
    if(!has(/theolog|teaching|philosoph|bhakti|religious|doctrine/i)) mk('Theology, philosophy and religious profile',[e.profile,...arr(e.themes),...arr(e.teachings)]);
    if(!has(/commentar|reception|influence|scholar/i)) mk('Commentaries, reception and scholarship',[e.reception,e.significance,e.hazraNotes,...arr(e.scholarlyDebates)]);
    mk('Canonical classification and catalogue evidence',[kind==='Mahāpurāṇa'?`${name} is presented here under the Mahāpurāṇa witnesses preserved by the index.`:`${name} is presented here under Upapurāṇa or overlapping Purāṇa catalogue witnesses; the lists of eighteen Upapurāṇas vary substantially across Sanskrit sources.`,kind==='Both'?`${name} occurs in both Mahāpurāṇa and Upapurāṇa witness sets in this index, so classification must be cited from the particular Sanskrit catalogue rather than treated as universally fixed.`:'']);
    return secs;
  }


  function evidenceSections(name,kind,e,sources,button){
    const specs=[];
    const list=v=>uniq(arr(v));
    const make=(title,paragraphs,subsections)=>{
      const sec={title,paragraphs:list(paragraphs),subsections:(subsections||[]).map(s=>({title:s.title,paragraphs:list(s.paragraphs),bullets:list(s.bullets)}))};
      const hasBody=sec.paragraphs.length||sec.subsections.some(s=>s.paragraphs.length||s.bullets.length);
      if(hasBody)specs.push(sec);
    };
    const traditional=e.traditionalAuthor
      ? 'The received tradition attributes this Purāṇa to '+String(e.traditionalAuthor).replace(/\s*\(traditional attribution\)/gi,'')+'. That is a traditional statement of sacred transmission, not evidence that every surviving chapter was written at one sitting by a single historical author.'
      : 'Like Purāṇic literature generally, this title belongs to a transmission tradition rather than a modern single-author book. Where no secure continuous recension survives, the catalogue-title must not be converted into an invented author biography.';
    const classEvidence=[];
    if(button?.dataset?.maha)classEvidence.push('Mahāpurāṇa witness or witnesses shown by this index: '+button.dataset.maha.split(' · ').join('; ')+'.');
    if(button?.dataset?.upa)classEvidence.push('Upapurāṇa witness or witnesses shown by this index: '+button.dataset.upa.split(' · ').join('; ')+'.');
    classEvidence.push(kind==='Both'
      ? 'The title occurs in both Mahāpurāṇa and Upapurāṇa witness sets. “Both” records a history of classification; it does not prove that every list refers to one identical recension.'
      : 'The classification used here follows the cited Sanskrit catalogue or colophon evidence attached to the card, rather than a modern harmonized list.');

    make('Identity, title and canonical status',
      [e.status,e.overview,e.profile],
      [
        {title:'Traditional attribution and historical authorship',paragraphs:[traditional]},
        {title:'Catalogue and colophon evidence',paragraphs:classEvidence},
        {title:'Problems of identification',paragraphs:[e.identityProblem,e.classificationProblem]}
      ]
    );

    make('Chronology and textual formation — detailed evidence',
      [e.period,e.milieu,e.history,e.datingBasis,e.hazraNotes],
      [
        {title:'What the dates mean',paragraphs:[
          'Dates in this dossier refer to recoverable layers, quotations, manuscript witnesses or a received redaction. They are not dates for the sacred events narrated in the text, and they should not be extended automatically to every verse.',
          'R. C. Hazra’s method compares rites, customs, vocabulary, quotations and the growth of sectarian practice; Ludo Rocher repeatedly cautions against assigning one date to an entire stratified Purāṇa.'
        ]},
        {title:'Layering and dependencies',paragraphs:list(e.dependencies)}
      ]
    );

    const recensions=list(e.primaryRecensions);
    make('Manuscripts, recensions, editions and transmission',
      [e.manuscripts,e.extent,e.booksCount?('Major divisions: '+e.booksCount+'.'):'',e.verseCount?('Verse count or traditional extent: '+e.verseCount+'.'):''],
      [
        {title:'Named recensions or textual organizations',bullets:recensions},
        {title:'Primary textual evidence',bullets:list(e.primaryEvidence)},
        {title:'Editorial cautions',paragraphs:[
          'Chapter and verse numbers should be cited with an edition or recension whenever the witnesses differ. A traditional verse total may describe an ideal Purāṇa and need not equal the surviving printed text.',
          'A quotation preserved by a medieval digest can witness an older form of a title even when the verse is absent from a modern edition. Conversely, a late printed passage cannot be dated merely from the antiquity of the Purāṇa’s name.'
        ]}
      ]
    );

    const maps=list(e.chapterMap), contents=list(e.contents), features=list(e.namedFeatures), keys=list(e.keyContents);
    const unavailable=/lost|uncertain|fragment|not securely|incompletely recoverable/i.test(String(e.status||e.manuscripts||''));
    make('Detailed contents, chapter map and named units',
      maps.length||contents.length||features.length||keys.length
        ? []
        : [unavailable
          ? 'No continuous recension securely matching this exact catalogue-title is available for a responsible chapter-by-chapter synopsis. Giving a “complete plot” here would invent evidence; the recoverable catalogue, quotation and manuscript record is presented instead.'
          : 'The surviving evidence does not support a stable chapter map independent of edition. The thematic outline below is therefore descriptive rather than a claim that every recension has the same sequence.'],
      [
        {title:'Chapter or book map',bullets:maps},
        {title:'Contents attested in the received text or recoverable fragments',bullets:[...contents,...keys]},
        {title:'Named narratives, doctrines or ritual units',bullets:features}
      ]
    );

    make('Rites, customs, dharma, pilgrimage and social history',
      [e.ritualHistory],
      [
        {title:'Rites, vows and worship',bullets:[...list(e.rituals),...list(e.vratas)]},
        {title:'Sacred geography and pilgrimage',bullets:[...list(e.sacredGeography),...list(e.pilgrimage)]},
        {title:'Dharma and social evidence',bullets:[...list(e.dharma),...list(e.socialHistory)]},
        {title:'How ritual evidence is dated',paragraphs:[
          'Ritual chapters are historical evidence only after their textual layer is assessed. Hazra’s studies are used here precisely because the presence of a rite, mantra or social rule in a Purāṇa does not make that passage as old as the Purāṇa title.'
        ]}
      ]
    );

    make('Reception, commentaries and scholarly questions',
      [e.reception,e.significance],
      [
        {title:'Reported scholarly positions',bullets:[...list(e.scholarlyPositions),...list(e.scholarlyDebates)]},
        {title:'Responsible use of this dossier',paragraphs:[
          'Traditional classification, modern textual history and living religious authority answer different questions. The article preserves all three without using one to erase the others.',
          'Claims should be traced to the exact source in the reference list. Wikipedia, Hindupedia and Grokipedia are discovery and cross-checking aids; manuscript editions, primary passages, Hazra, Rocher and specialist studies carry greater weight where they conflict.'
        ]}
      ]
    );

    return specs.map((s,i)=>renderCustomSection(s,200+i,sources,kind)).filter(Boolean);
  }

  function lead(name,e,sources,kind){
    const supplied=uniq(arr(e.leadParagraphs));
    const ps=supplied.length?supplied:uniq([e.overview,e.summary,e.significance,e.profile]);
    const refs=[sourceIndex(sources,'wiki'),sourceIndex(sources,kind==='Mahāpurāṇa'?'hazra-rites':'hazra-upa')].filter(Boolean).slice(0,2);
    return (ps.length?ps:[`${name} is a Purāṇa represented in the traditional scripture index. This article distinguishes the received text, its historical layers, its ritual and theological profile, and the catalogue tradition under which the title is classified.`]).map(x=>p(x,refs.map(n=>citeLink(n,sources)).join(''))).join('');
  }

  function infobox(name,kind,e,button){
    const rows=[];
    if(e.sanskritTitle)rows.push(['Sanskrit',String(e.sanskritTitle).split('/')[0].trim()]);
    if(e.traditionalAuthor)rows.push(['Traditional attribution',String(e.traditionalAuthor).replace(/\s*\(traditional attribution\)/gi,'')]);
    rows.push(['Religion','Hinduism']);
    if(e.language)rows.push(['Language',e.language]);
    rows.push(['Genre',kind]);
    if(e.period)rows.push(['Date / textual formation',e.period]);
    if(e.status)rows.push(['Textual status',e.status]);
    if(e.extent)rows.push(['Extent',e.extent]);
    if(e.booksCount)rows.push(['Major divisions',e.booksCount]);
    if(e.verseCount)rows.push(['Verse count',e.verseCount]);
    if(arr(e.primaryRecensions).length)rows.push(['Recensions',arr(e.primaryRecensions).map(plain).join('; ')]);
    if(button?.dataset?.sect)rows.push(['Sectarian profile',button.dataset.sect]);
    if(button?.dataset?.maha)rows.push(['Mahāpurāṇa witnesses',button.dataset.maha.split(' · ').join('; ')]);
    if(button?.dataset?.upa)rows.push(['Upapurāṇa witnesses',button.dataset.upa.split(' · ').join('; ')]);
    const dev=e.sanskritTitle?'<div class="universal-devanagari">'+esc(String(e.sanskritTitle).split('/')[0].trim())+'</div>':'';
    const art=artFor(name,button);
    const figure='<figure class="universal-infobox-image purana-wiki-image" data-image-kind="'+(art.exact?'article':'representative')+'"><a href="'+esc(art.href)+'" target="_blank" rel="noopener"><img src="'+esc(art.src)+'" alt="'+esc(art.alt)+'" loading="lazy"></a><figcaption>'+esc(art.caption)+' <a href="'+esc(art.href)+'" target="_blank" rel="noopener">Wikimedia Commons</a>.</figcaption></figure>';
    return '<aside class="kena-infobox universal-infobox purana-full-infobox"><div class="kena-infobox-title">'+esc(name)+'</div>'+dev+figure+rows.map(([k,v])=>'<div class="kena-info-row"><b>'+esc(k)+'</b><span>'+esc(v)+'</span></div>').join('')+'</aside>';
  }

  function toc(sections){return sections.map(s=>`<li><a href="#${esc(s.id)}">${esc(s.title)}</a></li>`).join('');}
  function refsHtml(sources){return `<section class="kena-section ch-section kena-references universal-references" id="purana-references"><h2>References</h2><ol>${sources.map((s,i)=>`<li id="purana-ref-${i+1}"><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol></section>`;}

  let shade=null, reader=null;
  function close(){shade?.remove();reader?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');document.querySelectorAll('#scripture-browser .shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}

  async function setWikiImage(name,figure){
    if(!figure)return;
    const img=figure.querySelector('img'), cap=figure.querySelector('figcaption');
    const page=WIKI[name]; if(!page){cap.remove();return;}
    try{
      const api=`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|info&inprop=url&pithumbsize=700&titles=${encodeURIComponent(page.replace(/_/g,' '))}`;
      const r=await fetch(api,{mode:'cors'}); if(!r.ok)throw new Error('wiki'); const j=await r.json(); const p=Object.values(j?.query?.pages||{})[0];
      if(p?.thumbnail?.source){img.src=p.thumbnail.source;cap.textContent=`Image from the Wikipedia article on ${name}.`;}
      else cap.remove();
    }catch(_){cap.remove();}
    img.onerror=()=>{img.onerror=null;img.src=GENERIC_IMG;cap?.remove();};
  }

  function openPurana(button,name,kind){
    close();
    const e=entryFor(name), sources=sourcesFor(name,kind,e);
    const custom=arr(e.articleSections);
    const sections=[];
    custom.forEach((s,i)=>{const x=renderCustomSection(s,i,sources,kind);if(x)sections.push(x);});
    const evidence=evidenceSections(name,kind,e,sources,button);
    evidence.forEach(s=>sections.push(s));
    const knownTitles=[...custom.map(s=>String(s?.title||'')),...evidence.map(s=>s.title)];
    automaticSections(name,kind,e,sources,knownTitles).forEach(s=>sections.push(s));
    const seen=new Set();
    const ordered=sections.filter(s=>{const k=s.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
    const refs=refsHtml(sources);
    button.classList.add('is-active');button.setAttribute('aria-pressed','true');
    shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop universal-wiki-backdrop purana-full-backdrop';
    reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader universal-wiki-reader purana-full-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label',`${name} article`);
    reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Purāṇa encyclopedia</span><h1>${esc(name)}</h1></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll"><article class="scripture-wiki-article universal-wiki-article purana-full-article">${infobox(name,kind,e,button)}<div class="kena-lead ch-lead">${lead(name,e,sources,kind)}</div><nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>${toc(ordered)}<li><a href="#purana-references">References</a></li></ol></nav>${ordered.map(s=>s.html).join('')}${refs}</article></div>`;
    document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');
    reader.querySelector('.kena-article-close')?.addEventListener('click',close);shade.addEventListener('click',close);
    reader.querySelector('.kena-article-close')?.focus({preventScroll:true});
    return true;
  }

  window.openScriptureEncyclopedia=function(button){
    const kind=button?.dataset?.kind||'';
    if(!PURANA_KINDS.has(kind))return previousOpen(button);
    const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim()||'';
    return openPurana(button,name,kind);
  };
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});

  if(!document.getElementById('purana-full-reader-style')){
    const style=document.createElement('style');style.id='purana-full-reader-style';style.textContent=`
      .purana-full-article{max-width:1120px;margin:0 auto;font-family:Merriweather,Georgia,serif;color:#202122;font-size:16px;line-height:1.72}
      .purana-full-article .purana-books{margin:10px 0 18px}
      .purana-full-article .purana-book{margin:0 0 18px}
      .purana-full-article .purana-book h3{margin:17px 0 6px;font:600 21px/1.25 Vollkorn,Georgia,serif;color:#202122}
      .purana-source-cite{vertical-align:super;margin-left:2px}.purana-source-cite a{font:12px/1 Arial,sans-serif;color:#36c;text-decoration:none}.purana-source-cite a:hover{text-decoration:underline}
      .purana-full-infobox .universal-infobox-image img{width:100%;height:auto;display:block;max-height:420px;object-fit:contain;background:#fff}
      .purana-full-infobox .universal-infobox-image a{display:block}
      .purana-full-infobox .universal-infobox-image figcaption{padding:7px 9px;font:12px/1.45 Arial,sans-serif;color:#54595d;background:#f8f9fa;border-top:1px solid #eaecf0}
      .purana-full-infobox .universal-infobox-image figcaption a{display:inline;color:#36c}
      .purana-full-infobox .universal-infobox-image figcaption:empty{display:none}
      .purana-full-section ul{margin:0 0 16px 28px}.purana-full-section li{margin:0 0 7px}
    `;document.head.append(style);
  }
})();
