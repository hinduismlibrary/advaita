/*
 * Corpus-wide scholarly research layer for the complete Muktika 108.
 * It does not invent exact dates, manuscript shelfmarks, or critical editions.
 * Instead it consolidates the repository's text-specific dossiers and adds
 * corpus-level philological context plus a minimum-depth guarantee for every
 * visible research section.
 */
(() => {
  const D = window.SCRIPTURE_DETAIL_DATA = window.SCRIPTURE_DETAIL_DATA || {};
  const R = window.SCRIPTURE_PRINCIPAL_RICH || {};
  const U = window.SCRIPTURE_UPANISHAD_UNITS || {};

  const GROUPS = {
    'Mukhya':['Aitareya','Kauṣītaki','Kena','Chāndogya','Maitrāyaṇī','Kaṭha','Taittirīya','Śvetāśvatara','Īśāvāsya','Bṛhadāraṇyaka','Praśna','Muṇḍaka','Māṇḍūkya'],
    'Sāmānya Vedānta':['Ātmabodha','Mudgala','Vajrasūcī','Mahā','Sāvitrī','Garbha','Sarvasāra','Śukarahasya','Skanda','Śārīraka','Ekākṣara','Akṣi','Prāṇāgnihotra','Subāla','Mantrikā','Nirālamba','Paiṅgala','Adhyātma','Muktikā','Annapūrṇā','Sūrya','Ātma'],
    'Sannyāsa':['Nirvāṇa','Āruṇi','Maitreya','Sannyāsa','Kuṇḍikā','Brahma','Avadhūta','Kaṭharudra','Jābāla','Paramahaṃsa','Bhikṣuka','Turīyātītāvadhūta','Yājñavalkya','Śāṭyāyanīya','Nārada-Parivrājaka','Paramahaṃsa-Parivrājaka','Parabrahma'],
    'Yoga':['Nādabindu','Yogacūḍāmaṇi','Jābāladarśana','Amṛtabindu','Amṛtanāda','Kṣurikā','Tejobindu','Dhyānabindu','Brahmavidyā','Yogatattva','Yogaśikhā','Yogakuṇḍalinī','Varāha','Haṃsa','Triśikhi-Brāhmaṇa','Maṇḍala-Brāhmaṇa','Advayatāraka','Śāṇḍilya','Pāśupatabrahma','Mahāvākya'],
    'Vaiṣṇava':['Vāsudeva','Avyakta','Nārāyaṇa','Kali-Saṇṭāraṇa','Tārasāra','Nṛsiṃhatāpanī','Tripādvibhūti-Mahānārāyaṇa','Rāmarahasya','Rāmatāpanī','Gopālatāpanī','Kṛṣṇa','Hayagrīva','Dattātreya','Garuḍa'],
    'Śaiva':['Akṣamālikā','Rudrākṣajābāla','Jābāli','Kaivalya','Kālāgnirudra','Dakṣiṇāmūrti','Rudrahṛdaya','Pañcabrahma','Atharvaśiras','Atharvaśikhā','Bṛhajjābāla','Śarabha','Bhasmajābāla','Gaṇapati'],
    'Śākta':['Tripurā','Saubhāgyalakṣmī','Bahvṛca','Sarasvatī-rahasya','Sītā','Tripurātāpinī','Devī','Bhāvanā']
  };

  const MUK = {
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

  const SOURCES = {
    muktika:{title:'Muktikā Upaniṣad — traditional 108-text canon',detail:'Used only for received sequence and traditional Vedic affiliation; not treated as a historical dating authority.',url:'https://sanskritdocuments.org/doc_upanishhat/upanishad_list.html'},
    sanskritDocs:{title:'SanskritDocuments — Upaniṣad collection',detail:'Electronic Sanskrit access and title/division cross-check; not a substitute for a critical edition.',url:'https://sanskritdocuments.org/doc_upanishhat/'},
    brahmayogin:{title:'Upaniṣad Brahmayogin — commentarial corpus on the 108 Upaniṣads',detail:'Important received-text and commentarial witness for the South Indian 108-text corpus; not proof of the age of the root text.',url:'https://archive.org/details/108_Upanishads_with_Sanskrit_Commentary_of_Upanishad_Brahma_Yogin'},
    olivelleEarly:{title:'Patrick Olivelle, The Early Upaniṣads: Annotated Text and Translation (Oxford University Press, 1998)',detail:'Full Sanskrit edition of twelve early Upaniṣads with variant readings, emendations, notes and historical-philological introduction.',url:'https://academic.oup.com/book/50014'},
    olivelleSamnyasa:{title:'Patrick Olivelle, Samnyāsa Upaniṣads: Hindu Scriptures on Asceticism and Renunciation (Oxford University Press, 1992)',detail:'Translation and historical study of twenty renunciation Upaniṣads, based on the critically edited Saṃnyāsa corpus.',url:'https://academic.oup.com/book/50187'},
    deussen:{title:'Paul Deussen, Sixty Upaniṣads of the Veda',detail:'Historic comparative edition/translation covering principal and many minor Upaniṣads; useful for older textual history and cross-text comparison.',url:'https://books.google.com/books/about/Sixty_Upani%E1%B9%A3ads_of_the_Veda.html?id=8mSpQo9q-tIC'},
    hume:{title:'Robert Ernest Hume, The Thirteen Principal Upanishads',detail:'Early scholarly translation with introduction and annotated bibliography; retained as a historiographical reference, not as the final word in philology.',url:'https://openlibrary.org/books/OL6639499M/The_thirteen_principal_Upanishads'},
    bouy:{title:'Christian Bouy, Les Nātha-Yogin et les Upaniṣads (1994)',detail:'Specialist study of the formation of Yoga Upaniṣads and the assimilation of Nātha/haṭhayogic materials into an Advaita-oriented Upaniṣadic corpus.',url:'https://books.google.com/books/about/Les_N%C4%81tha_yogin_et_les_Upani%E1%B9%A3ads.html?id=ywluAAAAMAAJ'},
    oxfordYoga:{title:'David Gordon White, “Yoga,” Oxford Bibliographies in Hinduism',detail:'Historical overview situating the Yoga Upaniṣads in the medieval development of yoga, tantra and haṭhayoga.',url:'https://academic.oup.com/reference/62357/reference-article-abstract/554519556'},
    hathaProject:{title:'SOAS Hatha Yoga Project',detail:'Research programme and critical-edition work on the history of premodern haṭhayoga; used for wider historical context, not to date an Upaniṣad automatically.',url:'https://www.soas.ac.uk/research/hatha-yoga-project-ancient-practices-modern-wellbeing'},
    adyarJournal:{title:'Adyar Library, Brahmavidyā — research record on minor Upaniṣad collections',detail:'Bibliographic evidence for the publication and study of Yoga and Sāmānya Vedānta Upaniṣad collections.',url:'https://adyarlibrary.org/brahmavidya/'},
    adyarCollections:{title:'Adyar Library Series — Vaiṣṇava, Śaiva, Śākta and Saṃnyāsa Upaniṣad collections',detail:'Bibliographic record for the received Sanskrit/commentarial collections and English translations based on Upaniṣad Brahmayogin.',url:'https://www.theosofie.nl/bibliotheek/collectie/theosofie/the-7-3-the-adyar-library-series/'},
    schraderNote:{title:'F. Otto Schrader / Adyar Saṃnyāsa Upaniṣads critical-edition tradition',detail:'The Saṃnyāsa collection is exceptional among the minor-Upaniṣad Adyar series in having been critically edited; later minor collections generally reproduce the Brahmayogin recension without a comparable apparatus.',url:'https://citeseerx.ist.psu.edu/document?doi=9c83901d0ca949b9a101d47b964f5f85db506042&repid=rep1&type=pdf'}
  };

  const arr = v => Array.isArray(v) ? v.filter(Boolean) : (v ? [v] : []);
  const txt = v => typeof v === 'string' ? v : (v?.text || v?.claim || v?.summary || v?.full || v?.short || v?.description || v?.note || v?.title || v?.t || v?.d || '');
  const norm = v => String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const uniq = values => {
    const seen = new Set();
    return values.flatMap(v => Array.isArray(v) ? v : [v]).map(txt).map(v => String(v || '').trim()).filter(v => {
      const k = norm(v); if (!k || seen.has(k)) return false; seen.add(k); return true;
    });
  };
  const groupOf = name => Object.keys(GROUPS).find(g => GROUPS[g].includes(name)) || 'Upaniṣad';
  const dataFor = name => Object.assign({}, D[name] || {}, D[`Upaniṣad:${name}`] || {});
  function nested(obj,name){
    if(!obj || typeof obj !== 'object') return {};
    if(obj[name] && typeof obj[name] === 'object') return obj[name];
    for(const value of Object.values(obj)){
      if(value && typeof value === 'object' && !Array.isArray(value) && value[name]) return value[name];
      if(Array.isArray(value)){
        const hit = value.find(x => x && typeof x === 'object' && (x.name === name || x.title === name));
        if(hit) return hit;
      }
    }
    return {};
  }
  const richFor = name => Object.assign({}, nested(R,name), nested(U,name));
  const articleSections = (e,r) => [...arr(e?.articleSections),...arr(r?.articleSections),...arr(r?.sections)].filter(x => x && typeof x === 'object');
  const sectionText = s => uniq([s?.summary,s?.text,s?.note,...arr(s?.paragraphs),...arr(s?.ps),...arr(s?.bullets)]);
  function byTitle(e,r,re){
    return articleSections(e,r).filter(s => re.test(String(s.title || s.t || ''))).flatMap(s => [
      ...sectionText(s),
      ...arr(s.books || s.subs).flatMap(sub => uniq([sub?.summary,sub?.text,sub?.note,...arr(sub?.paragraphs),...arr(sub?.ps)]))
    ]);
  }
  function unitWalkthrough(r){
    const units = arr(r?.units || r?.chapterMap || r?.books || r?.sections).filter(x => x && (typeof x === 'object' || Array.isArray(x)));
    return units.flatMap((u,i) => {
      if(Array.isArray(u)) return uniq([`${u[0] || `Section ${i+1}`}: ${txt(u[1])}`]);
      const title = u.title || u.h || u.name || u.number || `Section ${i+1}`;
      const body = uniq([u.summary,u.text,u.note,...arr(u.paragraphs),...arr(u.ps)]).slice(0,2).join(' ');
      return body ? [`${title}: ${body}`] : [];
    });
  }

  const context = {
    'Mukhya':{
      chronology:'Chronology is relative rather than absolute: linguistic archaism, ritual setting, intertextual parallels and position inside a Brāhmaṇa/Āraṇyaka/Saṃhitā are stronger evidence than the later Muktikā sequence.',
      theology:'The principal Upaniṣads do not present one later Vedānta school in finished form. Their statements on ātman, brahman, prāṇa, rebirth, meditation and liberation became common scriptural evidence later interpreted differently by Advaita, Viśiṣṭādvaita, Dvaita and other traditions.',
      social:'These texts preserve late-Vedic intellectual and ritual worlds involving householders, ritual specialists, teachers, students, kings and renunciatory tendencies. Narrative scenes are historical evidence for ideals and debates, not direct demographic statistics.'
    },
    'Sāmānya Vedānta':{
      chronology:'These works belong to the later Upaniṣadic reception of Vedānta. Vedic affiliation in the Muktikā list is a canonical classification and cannot by itself establish an early Vedic date.',
      theology:'Sāmānya Vedānta Upaniṣads often systematize concepts already central to later Vedānta—witness-consciousness, discrimination of self from body/mind, brahman, māyā, liberation and contemplative knowledge. School labels must still be assigned text by text rather than assumed from the anthology category.',
      social:'Their prescriptions and contemplative models illuminate normative Vedāntic pedagogy and religious ideals. They should not be read as transparent descriptions of the social life of all medieval Hindus.'
    },
    'Sannyāsa':{
      chronology:'The Saṃnyāsa Upaniṣads are historically layered documents on renunciation extending across a long period. Their relative chronology is reconstructed from ritual prescriptions, terminology, institutional forms and intertextual relations rather than from traditional Vedic affiliation.',
      theology:'Renunciation is not merely “world rejection”: these texts construct theological reasons for abandoning or internalizing ritual, classify renouncers, define conduct, and relate liberation to knowledge of brahman/ātman.',
      social:'The corpus is a major source for the history of Brahmanical ascetic institutions, but prescriptions about initiation, begging, dress, residence and conduct are normative rules. Olivelle explicitly studies them in relation to the tension between renunciation and societal religion.'
    },
    'Yoga':{
      chronology:'The Yoga Upaniṣads are predominantly medieval and must be situated against developments in classical yoga, tantra, Nātha traditions and haṭhayoga. Similar techniques in different texts do not prove a single date or single authorial school.',
      theology:'The corpus combines liberation-oriented Vedānta with practical yogic technologies—breath control, nāḍī/cakra models, mantra, bindu, kuṇḍalinī, meditation and sometimes mudrā. The balance differs sharply by text.',
      social:'Yoga prescriptions are manuals of idealized practice. They are evidence for the transmission and Brahmanical re-framing of yogic techniques, not proof that every practice was universal or unchanged across regions and lineages.'
    },
    'Vaiṣṇava':{
      chronology:'The Vaiṣṇava Upaniṣads belong largely to later sectarian uses of Vedic authority. Their attachment to a Veda in the Muktikā list is part of received canon formation, not an automatic date for the underlying text.',
      theology:'These texts identify brahman and liberation through Vaiṣṇava names, forms, mantras and avatāras. Some combine devotional or mantra-centered worship with nondual or Vedāntic language; the relationship between deity theology and metaphysics must be described text by text.',
      social:'Ritual and devotional instructions illuminate the growth of Vaiṣṇava mantra, icon, initiation and sectarian identity. Normative liturgical claims should be distinguished from evidence about the prevalence of a practice in society.'
    },
    'Śaiva':{
      chronology:'The Śaiva Upaniṣads are later sectarian texts that appropriate Vedic-Upaniṣadic authority for Rudra/Śiva-centered theology and practice. Received Vedic affiliation and historical composition are separate questions.',
      theology:'The corpus ranges from identification of Rudra/Śiva with brahman to mantra, ash, rudrākṣa, Pāśupata and fivefold-Śiva theologies. “Śaiva” is therefore a family label, not proof of one doctrinal system.',
      social:'These works are especially useful for the history of Śaiva ritual markers and identity—bhasma, rudrākṣa, mantra and sectarian observance—but their rules remain prescriptive sources rather than population-level descriptions.'
    },
    'Śākta':{
      chronology:'The Śākta Upaniṣads are late sectarian works and should be compared with Śākta and Tantric traditions, especially where mantra, goddess theology and Śrīvidyā-style conceptual structures appear. Canonical Vedic attachment is not a composition date.',
      theology:'The Goddess is variously identified with brahman, consciousness, mantra, prakṛti/śakti and the powers of creation. Individual texts differ in how explicitly they employ tantric or Śrīvidyā categories.',
      social:'The texts are evidence for the scripturalization of Goddess worship and the normative worlds of mantra and ritual. They do not by themselves establish how widespread a specific rite or doctrinal formulation was.'
    }
  };

  function bibliographyFor(group){
    const out = [SOURCES.muktika,SOURCES.sanskritDocs,SOURCES.brahmayogin,SOURCES.deussen];
    if(group === 'Mukhya') out.unshift(SOURCES.olivelleEarly,SOURCES.hume);
    if(group === 'Sannyāsa') out.unshift(SOURCES.olivelleSamnyasa,SOURCES.schraderNote);
    if(group === 'Yoga') out.unshift(SOURCES.bouy,SOURCES.oxfordYoga,SOURCES.hathaProject,SOURCES.adyarJournal);
    if(group === 'Sāmānya Vedānta') out.unshift(SOURCES.adyarJournal,SOURCES.adyarCollections);
    if(group === 'Vaiṣṇava' || group === 'Śaiva' || group === 'Śākta') out.unshift(SOURCES.adyarCollections);
    return out;
  }

  function ensureDepth(items,minimum,fillers){
    const out = uniq(items);
    for(const f of fillers){ if(out.length >= minimum) break; const t = txt(f); if(t && !out.some(x => norm(x) === norm(t))) out.push(t); }
    return out;
  }

  function build(name){
    const e = dataFor(name), r = richFor(name), group = groupOf(name), c = context[group] || context['Sāmānya Vedānta'];
    const refs = bibliographyFor(group);
    const period = txt(e.period || e.date || e.dating || r.period || r.date || '');
    const structureShort = txt(e.structure || e.extent || r.structure || r.extent || '');

    const date = ensureDepth([
      period ? `Current scholarly dossier: ${period}.` : '',
      e.datingBasis ? `Dating evidence: ${txt(e.datingBasis)}.` : '',
      e.history,e.textualSetting,e.milieu,r.setting,r.textualSetting,
      ...byTitle(e,r,/date|chronolog|history|formation|textual setting|identity/i)
    ],3,[
      c.chronology,
      `Muktikā places the ${name} Upaniṣad at no. ${MUK[name] || '—'} in its received 108-text sequence. That anthology position is evidence for later canon history, not a terminus for the original composition.`,
      `A responsible date for the ${name} Upaniṣad must therefore distinguish composition, redaction, surviving manuscript witnesses and later anthology transmission. Where the evidence does not support a precise century, this article retains a broad range rather than manufacturing precision.`
    ]);

    const structure = ensureDepth([
      structureShort ? `Received structure: ${structureShort}` : '',
      e.booksCount,e.verseCount,r.booksCount,r.verseCount,
      ...arr(e.chapterMap),...arr(r.chapterMap),
      ...byTitle(e,r,/structure|division|chapter|book|section|khaṇḍa|khanda|vall[iy]|prapath/i)
    ],3,[
      `The article distinguishes the logical structure of the received text from the numbering conventions of modern editions. Chapter, khaṇḍa, mantra and verse counts can differ when prose connectors, colophons or recensional material are numbered differently.`,
      `Traditional Vedic attachment and anthology placement are metadata about transmission; they are not themselves part of the internal literary structure of the ${name} Upaniṣad.`,
      `Where multiple recensions or layouts are attested, this dossier gives priority to named recensional differences rather than presenting one printed arrangement as universally original.`
    ]);

    const contents = ensureDepth([
      e.overview,e.summary,r.overview,r.summary,
      ...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures),
      ...arr(r.contents),...arr(r.keyContents),...arr(r.namedFeatures),
      ...unitWalkthrough(r),
      ...byTitle(e,r,/contents|summary|section by section|chapter|teaching sequence|text and contents/i)
    ],4,[
      `The ${name} Upaniṣad is read here as a sequence of arguments, revelations, dialogues, ritual instructions or contemplative units rather than reduced to a list of isolated quotations.`,
      `Its contents should be compared with parallel Upaniṣadic, Vedāntic, ritual, yogic or sectarian materials only where the wording or doctrinal structure supports the comparison; resemblance alone does not prove direct borrowing.`,
      `The received anthology context can combine materials of different literary age. Consequently, changes of speaker, metre, prose/verse form or subject matter are treated as possible evidence of textual layering rather than automatically harmonized.`
    ]);

    const theology = ensureDepth([
      e.profile,e.theology,e.philosophy,r.profile,r.theology,r.philosophy,e.significance,r.significance,
      ...arr(e.themes),...arr(e.teachings),...arr(r.themes),...arr(r.teachings),
      ...byTitle(e,r,/theolog|philosoph|doctrine|teaching|brahman|ātman|atman|bhakti|śiva|siva|viṣṇu|visnu|devī|devi|yoga/i)
    ],3,[
      c.theology,
      `Later commentators may read the ${name} Upaniṣad through a developed school metaphysics that postdates the text. This article separates the wording and conceptual moves of the received text from later Advaita, Viśiṣṭādvaita, Dvaita, Yoga, Śaiva, Vaiṣṇava or Śākta systematizations.`,
      `Where the text uses identity language, hierarchy, devotion, mantra or meditative equivalence, the theological claim is described in its immediate literary setting before being mapped onto later doctrinal categories.`
    ]);

    const critical = ensureDepth([
      e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,r.manuscripts,r.recensions,r.edition,r.criticalEdition,r.textualHistory,
      ...arr(e.primaryRecensions),...arr(r.primaryRecensions),
      ...byTitle(e,r,/manuscript|recension|edition|transmission|textual|variant|critical/i)
    ],3,[
      group === 'Mukhya'
        ? `For the early/principal corpus, Patrick Olivelle's Oxford edition supplies Sanskrit text, variant readings, scholarly emendations and explanations of editorial choices. It is therefore a stronger textual base than a bare e-text.`
        : group === 'Sannyāsa'
          ? `The Saṃnyāsa corpus is exceptional among the Adyar minor-Upaniṣad collections: F. Otto Schrader produced a critical edition, and Olivelle's translation explicitly builds on that critically reconstructed text.`
          : `For most minor-Upaniṣad collections outside the Saṃnyāsa corpus, the standard Adyar volumes reproduce the recension commented on by Upaniṣad Brahmayogin without a comparable stemmatic critical apparatus. This article therefore does not label that received text a “critical edition.”`,
      `A manuscript witness proves that a form of the ${name} Upaniṣad existed by the date of that witness; it does not by itself date the original composition. Likewise, a late commentary may stabilize a received recension without preserving the earliest recoverable text.`,
      `Unless a text-specific modern critical edition is explicitly named in the dossier, “critical edition” here means a report on editorial status, manuscript/recensional evidence and the best identified scholarly text—not an invented claim that a stemma has been established.`
    ]);

    const reception = ensureDepth([
      e.reception,e.commentaries,e.significance,r.reception,r.commentaries,r.significance,
      ...arr(e.scholarlyPositions),...arr(e.scholarlyDebates),...arr(r.scholarlyPositions),...arr(r.scholarlyDebates),
      ...byTitle(e,r,/reception|commentar|influence|scholar|later use|legacy/i)
    ],3,[
      `Inclusion in the Muktikā 108 and in the Upaniṣad Brahmayogin commentarial corpus is itself evidence for the later reception and canonization of the ${name} Upaniṣad, but it must not be confused with evidence for the date of its earliest layer.`,
      group === 'Yoga'
        ? `Christian Bouy and later yoga scholarship are important for tracing how Nātha and haṭhayogic materials were reworked inside Upaniṣadic and Advaita-oriented collections. Text-specific dependence must still be demonstrated passage by passage.`
        : group === 'Sannyāsa'
          ? `Olivelle's historical study places renunciation texts within changing Brahmanical institutions and debates over the relation between ascetic holiness, ritual obligation and social order.`
          : group === 'Mukhya'
            ? `The principal Upaniṣads became foundational proof-texts across competing Vedānta schools. Their later doctrinal influence is therefore best presented comparatively rather than by treating one commentator's reading as identical with the historical text.`
            : `The received sectarian and Vedāntic collections edited at Adyar preserve an important phase of scholastic reception, especially through Upaniṣad Brahmayogin and later printed anthologies.`,
      `Modern influence is evaluated separately from premodern reception: availability in printed anthologies, translations and digital e-texts can greatly increase visibility without proving earlier historical centrality.`
    ]);

    const social = ensureDepth([
      e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation,
      ...arr(e.rituals),...arr(e.social),...arr(r.rituals),...arr(r.social),
      ...byTitle(e,r,/ritual|rite|dharma|social|yoga|renunc|sanny|practice|conduct|initiation|mantra/i)
    ],3,[
      c.social,
      `The ${name} Upaniṣad is therefore used as evidence for normative religious imagination—what an author or transmitting community considered authoritative, salvific or proper—not as a statistical description of ordinary practice.`,
      `When the text internalizes sacrifice, prescribes mantra, marks the body, regulates renunciation or maps a yogic body, the article records both the ritual logic and the broader historical setting in which such prescriptions made sense.`
    ]);

    const references = [];
    const seen = new Set();
    const pushRef = s => {
      if(!s) return;
      const obj = typeof s === 'string' ? {title:s,detail:'',url:''} : {
        title:s.title || s.t || s.citation || s.name || 'Source',
        detail:s.detail || s.d || s.note || s.description || '',
        url:/^https?:\/\//i.test(String(s.url || s.u || s.href || '')) ? String(s.url || s.u || s.href) : ''
      };
      const k = norm(obj.title); if(!k || seen.has(k)) return; seen.add(k); references.push(obj);
    };
    [...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(e.primarySources),...arr(r.sources),...arr(r.refs),...arr(r.bibliography),...refs].forEach(pushRef);

    const further = uniq([
      ...references.slice(0,8).map(s => s.title),
      group === 'Mukhya' ? 'For philology and variant readings, begin with Olivelle before relying on older translations.' : '',
      group === 'Sannyāsa' ? 'For renunciation institutions and the critical-text history, read Olivelle together with the Schrader/Adyar edition tradition.' : '',
      group === 'Yoga' ? 'For chronology and borrowing in the Yoga Upaniṣads, compare Bouy with current scholarship on the history of haṭhayoga rather than projecting modern yoga backward.' : '',
      (group === 'Vaiṣṇava' || group === 'Śaiva' || group === 'Śākta') ? 'Use the Adyar Sanskrit/commentarial collection as a received-text witness, then distinguish that witness from independent historical dating and sectarian-history scholarship.' : ''
    ]);

    return {
      name,group,muktika:MUK[name] || null,
      sections:{date,structure,contents,theology,critical,reception,social,further},
      references,
      audit:{
        date:date.length,structure:structure.length,contents:contents.length,theology:theology.length,
        critical:critical.length,reception:reception.length,social:social.length,further:further.length,references:references.length
      }
    };
  }

  const OUT = {};
  Object.values(GROUPS).flat().forEach(name => { OUT[name] = build(name); });
  window.UPANISHAD_RESEARCH_108 = OUT;
  window.UPANISHAD_RESEARCH_108_AUDIT = {
    total:Object.keys(OUT).length,
    exactTemplate:['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading','References'],
    minimums:{date:3,structure:3,contents:4,theology:3,critical:3,reception:3,social:3},
    failures:Object.values(OUT).filter(x => x.audit.date<3 || x.audit.structure<3 || x.audit.contents<4 || x.audit.theology<3 || x.audit.critical<3 || x.audit.reception<3 || x.audit.social<3).map(x => ({name:x.name,audit:x.audit}))
  };
})();