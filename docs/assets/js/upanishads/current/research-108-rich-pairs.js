/*
 * Scholarly merger for the Muktikā 108.
 *
 * Editorial rule (2026-08-27):
 * This file may merge and reorganize text-specific evidence, but it must never
 * manufacture prose merely to satisfy a character target. The audit is
 * diagnostic: texts below the target are failures that require individual
 * research, not padding.
 */
(() => {
  const OUT=window.UPANISHAD_RESEARCH_108||{};
  const D=window.SCRIPTURE_DETAIL_DATA||{};
  const R=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const U=window.SCRIPTURE_UPANISHAD_UNITS||{};

  const arr=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const txt=v=>typeof v==='string'?v:(v?.text||v?.claim||v?.summary||v?.full||v?.short||v?.description||v?.note||v?.title||v?.t||v?.d||'');
  const norm=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const charCount=v=>arr(v).map(txt).join(' ').length;
  const uniq=values=>{
    const seen=new Set();
    return values.flatMap(v=>Array.isArray(v)?v:[v]).map(txt).map(v=>String(v||'').replace(/\s+/g,' ').trim()).filter(v=>{
      const k=norm(v); if(!k||seen.has(k)) return false; seen.add(k); return true;
    });
  };
  const add=(target,values)=>{
    if(!Array.isArray(target)) return;
    const seen=new Set(target.map(v=>norm(txt(v))));
    uniq(values).forEach(v=>{const k=norm(v); if(k&&!seen.has(k)){seen.add(k);target.push(v);}});
  };
  function nested(obj,name){
    if(!obj||typeof obj!=='object') return {};
    if(obj[name]&&typeof obj[name]==='object') return obj[name];
    for(const value of Object.values(obj)){
      if(value&&typeof value==='object'&&!Array.isArray(value)&&value[name]) return value[name];
      if(Array.isArray(value)){
        const hit=value.find(x=>x&&typeof x==='object'&&(x.name===name||x.title===name));
        if(hit) return hit;
      }
    }
    return {};
  }
  const dataFor=name=>Object.assign({},D[name]||{},D[`Upaniṣad:${name}`]||{});
  const richFor=name=>Object.assign({},nested(R,name),nested(U,name));

  function sectionText(s){
    if(!s||typeof s!=='object') return [];
    const direct=uniq([s.summary,s.text,s.note,...arr(s.paragraphs),...arr(s.ps),...arr(s.bullets)]);
    const children=[...arr(s.books),...arr(s.subs),...arr(s.subsections)].flatMap((x,i)=>{
      if(typeof x==='string') return [x];
      const label=x?.title||x?.name||x?.h||x?.number||`Unit ${i+1}`;
      return uniq([x?.summary,x?.text,x?.note,x?.description,...arr(x?.paragraphs),...arr(x?.ps),...arr(x?.bullets)]).map(p=>`${label}: ${p}`);
    });
    return uniq([...direct,...children]);
  }
  function unitText(r){
    return [...arr(r?.units),...arr(r?.chapterMap),...arr(r?.books)].flatMap((u,i)=>{
      if(typeof u==='string') return [u];
      if(Array.isArray(u)){
        const body=uniq(u.slice(1)).join(' ');
        return body?[`${u[0]||`Unit ${i+1}`}: ${body}`]:[];
      }
      if(u&&typeof u==='object'){
        const label=u.title||u.name||u.h||u.number||`Unit ${i+1}`;
        const body=uniq([u.summary,u.text,u.note,u.description,...arr(u.paragraphs),...arr(u.ps),...arr(u.bullets)]).join(' ');
        return body?[`${label}: ${body}`]:[];
      }
      return [];
    });
  }

  const DATE=/date|chronolog|formation|textual setting/i;
  const STRUCT=/structure|chapter|book|section|division|khaṇḍ|khanda|vall|prapāṭh|prapath|anuvāk|anuvak|verse count|mantra count/i;
  const CRIT=/manuscript|recension|edition|transmission|variant|critical/i;
  const RECP=/reception|commentar|influence|legacy|later use/i;
  const SOCIAL=/ritual|rite|dharma|social|practice|conduct|initiation|mantra|japa|vrata|bhasma|rudrākṣ|rosary|mālā|renunc|sanny|begg|staff|food|worship|pūj|nyāsa|cakra|nāḍ|prāṇ|breath/i;
  const THEO=/theolog|philosoph|doctrine|brahman|ātman|atman|self|conscious|mokṣ|moksh|liber|bhakti|devot|śiva|siva|viṣṇu|visnu|devī|devi|puruṣ|purush|māyā|maya|śakti|shakti|paramahaṃsa|so.?ham|haṃsa/i;

  function sourceObj(v){
    if(!v) return null;
    if(typeof v==='string') return {title:v,detail:'',url:''};
    return {
      title:v.title||v.t||v.citation||v.name||txt(v)||'Source',
      detail:v.detail||v.d||v.note||v.description||'',
      url:/^https?:\/\//i.test(String(v.url||v.u||v.href||''))?String(v.url||v.u||v.href):''
    };
  }
  function addRefs(research,values){
    research.references=arr(research.references).map(sourceObj).filter(Boolean);
    const seen=new Set(research.references.map(s=>norm((s.title||'')+' '+(s.url||''))));
    arr(values).flatMap(v=>Array.isArray(v)?v:[v]).map(sourceObj).filter(Boolean).forEach(s=>{
      const k=norm((s.title||'')+' '+(s.url||'')); if(k&&!seen.has(k)){seen.add(k);research.references.push(s);}
    });
  }

  const HAMSA_SOURCES=[
    {title:'K. Narayanasvami Aiyar, Thirty Minor Upanishads (1914), Haṃsa Upaniṣad',detail:'English translation of the received Haṃsa text, including the Gautama–Sanatkumāra dialogue, ajapā-gāyatrī, subtle-body ascent, heart-lotus symbolism and inner sounds.',url:'https://www.wisdomlib.org/hinduism/book/thirty-minor-upanishads/d/doc217057.html'},
    {title:'Paul Deussen, Sixty Upanishads of the Veda, Haṃsa Upaniṣad',detail:'Historical translation and discussion used for the text’s recensional history, symbolism and place among later Upaniṣads.',url:'https://books.google.com/books?id=8mSpQo9q-tIC'},
    {title:'T. R. Srinivasa Ayyangar, The Yoga Upaniṣads',detail:'Adyar Library translation of the Yoga Upaniṣad corpus based on the received Sanskrit/commentarial tradition.',url:'https://www.ts-adyar.org/book/yoga-upanisad-s-translation'},
    {title:'Christian Bouy, Les Nātha-Yogin et les Upaniṣads (1994)',detail:'Specialist study of the formation of the Yoga Upaniṣads and their relationship to Nātha and haṭhayogic materials.',url:'https://books.google.com/books?id=ywluAAAAMAAJ'}
  ];

  const HAMSA={
    date:[
      'The Haṃsa Upaniṣad belongs to the later Yoga-Upaniṣad stratum rather than to the archaic prose world of Bṛhadāraṇyaka or Chāndogya. Its developed subtle-body physiology, cakra ascent, nyāsa, mantra analysis, Śiva–Śakti symbolism and doctrine of inner nāda place the received text in a milieu shaped by medieval yoga and tantric practice. A broad second-millennium CE dating is therefore more plausible than an early Vedic date.',
      'A useful terminus ante quem is supplied by the seventeenth-century Persian Upaniṣad collection associated with Dārā Shikōh, which knew a Haṃsa/Hensnāda text. That proves circulation by the early modern period, not the date of every layer. The text may incorporate older motifs—especially haṃsa as a symbol of the self and so’ham as an identity formula—within a substantially later yogic synthesis.',
      'The Muktikā catalogue assigns Haṃsa to the Śukla Yajurveda and places it among the received 108. That affiliation is part of canon history. It should not be mistaken for evidence that the work was composed in the linguistic or ritual period of the Śukla Yajurvedic Saṃhitās.'
    ],
    structure:[
      'The received Haṃsa is a compact dialogue framed by Gautama’s request to Sanatkumāra for the means of attaining brahmavidyā. Sanatkumāra attributes the teaching to Pārvatī, who obtained Śiva’s doctrinal judgment after examining the dharmas. The frame therefore gives a Yoga-Upaniṣadic teaching both Vedic status and an explicitly Śaiva-Śākta chain of authorization.',
      'Modern descriptions often speak of eleven chapters, but manuscript and printed arrangements are not fully uniform. Calcutta and Poona recensions differ in layout and some wording. For that reason the article follows the conceptual sequence—qualification of the disciple, ascent of prāṇa, ajapā mantra, visualization of haṃsa, heart-lotus psychology, states of consciousness and nāda—rather than pretending that one modern chapter numbering is universal.',
      'The work is structurally cumulative. Breath first becomes mantra; mantra is then installed ritually and visualized in the body; the body is reread as a subtle cosmology; mental tendencies are mapped onto the heart-lotus; and finally attention is led through increasingly subtle sound toward a state in which the distinction between individual haṃsa and paramahaṃsa is overcome.'
    ],
    contents:[
      'The opening is a request for brahmavidyā. Gautama does not ask merely for a breathing exercise; he asks Sanatkumāra for the knowledge that leads to Brahman. Sanatkumāra answers with a “mystery” of haṃsa and paramahaṃsa, presented as a teaching suitable for a disciplined brahmacārin who has restrained desire, is devoted to the guru and continually contemplates the self. These qualifications establish the work’s horizon: technique is subordinate to liberating knowledge.',
      'Haṃsa is first described as an indwelling principle present in every body, compared to fire latent in wood or oil hidden in seed. The similes are philosophically important because they define realization as disclosure rather than production. The self is not manufactured by yoga; it is already pervasive but ordinarily unrecognized. Knowledge of that hidden presence is associated with overcoming death.',
      'The text then turns abruptly from metaphysical assertion to subtle-body practice. The practitioner contracts the lower bodily region, raises vāyu from mūlādhāra, and directs it through svādhiṣṭhāna, maṇipūra, anāhata, viśuddha and ājñā toward brahmarandhra. The sequence is a vertical interiorization of the body. Breath is no longer merely respiration: it becomes the vehicle by which attention leaves ordinary sensory organization and approaches the locus of formless contemplation.',
      'At brahmarandhra the practitioner meditates on the three mātrās and cognizes the self as formless. The ascent therefore culminates not in the permanent reification of a subtle anatomy but in a transition beyond form. The cakras organize the route; they are not themselves the final object of knowledge.',
      'The central practical doctrine is the ajapā-gāyatrī, the “unrecited” mantra already operating in breathing. Haṃsa is identified as the ṛṣi of the formula, avyaktā-gāyatrī as its metre, paramahaṃsa as its deity, ham as bīja, sa as śakti and so’ham as kīlaka. This technical mantra grammar is crucial: the text treats breathing as a complete mantra rite with seer, metre, deity, seed, power and fastening element, not simply as a poetic resemblance between breath and a word.',
      'The Upaniṣad counts 21,600 haṃsas in a day and night in the commonly transmitted reading, corresponding to the ceaseless alternation of respiration. The practitioner’s task is thus to become conscious of a mantra that embodied life is already performing. Ordinary breathing is reinterpreted as perpetual worship; yogic awareness transforms an involuntary biological rhythm into sustained remembrance of identity with the supreme.',
      'The mantra is accompanied by ritual installation. The text refers to aṅganyāsa and karanyāsa, placing the sacred formula into the limbs and hands before meditation on haṃsa in the heart. This matters historically because it shows the work standing at the intersection of Upaniṣadic brahmavidyā and tantric-mantric ritual. The body is consecrated before it is contemplated as the seat of the self.',
      'Haṃsa is then visualized through an elaborate symbolic body. Agni and Soma form the wings or sides; Oṃ is associated with the head; further phonetic elements, Rudra and Rudrāṇī/Śakti, and cosmic powers are mapped onto the bird. The migratory bird is therefore more than a metaphor for the soul: it becomes a mandala-like condensation of mantra, deity and cosmology within the practitioner’s own heart.',
      'The eight-petalled heart-lotus introduces a psychology of embodied consciousness. Different petals are associated with different tendencies or actions; the centre is associated with detachment. The inner parts of the lotus are then correlated with waking, dream and deep sleep, while movement beyond the lotus signifies turīya, the “fourth” state. The text thus overlays an older Upaniṣadic four-state analysis with a later yogic visualization.',
      'This mapping is not merely decorative. It gives the practitioner a spatial model of mental fluctuation: desire, movement, pleasure, lethargy and other dispositions are located in the petals, while progressive interiorization moves toward states less governed by outward cognition. The heart becomes both a psychological diagram and the ritual seat of haṃsa.',
      'The final major practice concerns nāda, inner sound. The practitioner closes the ears and attends to internally apprehended sound, which is described in a graded sequence from coarse and powerful resonances toward increasingly subtle tones. The well-known series includes comparisons such as thunder, drum, bell and flute, though exact enumeration and wording vary by recension and translation.',
      'The point of the nāda sequence is not the collection of extraordinary auditory experiences. Each sound serves as a subtler support for attention. The practitioner is repeatedly drawn away from gross sensory objects and toward a finer internal object until even the distinction between hearer and heard can no longer organize awareness in the ordinary way.',
      'Haṃsa therefore moves through a coherent soteriological arc despite its composite appearance: disciplined eligibility; recognition of the indwelling self; ascent of prāṇa; discovery of breath as ajapā mantra; ritual and contemplative installation of that mantra; interpretation of the heart and states of consciousness; absorption in inner sound; and recognition of the haṃsa as paramahaṃsa. The practices are multiple, but they are ordered toward one claim about identity.'
    ],
    theology:[
      'The governing theological equation is between haṃsa, the apparently individual life-principle, and paramahaṃsa, the supreme reality. The title term carries several resonances at once: a migratory bird, the living principle that “moves” through bodies, the breath-mantra, and the self that is finally recognized as non-separate from the supreme. The text exploits rather than resolves these meanings.',
      'So’ham—“I am He/That”—provides the most explicit identity formula. Yet the Upaniṣad does not present this as a proposition to be memorized apart from practice. The formula is synchronized with respiration and ritually analysed into bīja, śakti and other mantra components. Metaphysical identity is therefore embodied as a repetitive contemplative event.',
      'The claim that haṃsa pervades bodies like fire in wood or oil in seed supplies the ontology behind the practice. Brahman or the supreme self is hidden, not absent. Bondage consists in non-recognition and outward identification; yoga exposes an already-present reality. This makes the text compatible with nondual Vedāntic interpretation while its actual vocabulary remains deeply shaped by yoga and mantra.',
      'The work’s Śaiva-Śākta coloring is not incidental. Sanatkumāra transmits a teaching traced through Pārvatī and Śiva; Rudra and Rudrāṇī appear in the symbolic haṃsa; ham is paired with sa as śakti. The supreme reality is thus expressed through both nondual identity and divine polarity. Rather than choosing between “Vedānta” and “Tantra,” the text makes their vocabularies cooperate.',
      'The subtle body functions epistemologically. Raising prāṇa through the centres reorganizes attention so that consciousness is no longer dominated by the ordinary sensory field. The final formless cognition at brahmarandhra shows that the body-map is a means of transformation, not the final metaphysical truth. A university-level reading should therefore resist treating the cakra list as if it were the Upaniṣad’s whole philosophy.',
      'The four states mapped onto the heart-lotus connect Haṃsa with an older Upaniṣadic concern: waking, dream, deep sleep and a fourth condition beyond them. But the setting is distinctly later. Instead of a purely analytic discussion of consciousness, the states are embedded in a lotus visualization and yogic ascent. The text is a good example of medieval authors reworking inherited Upaniṣadic categories inside newer contemplative technologies.',
      'Nāda provides the bridge between practice and metaphysics. Sound is progressively refined until attention approaches what is no longer captured by ordinary sensory differentiation. The goal is not an eternal subtle noise; nāda is a vehicle of laya or absorption. Its philosophical function is to weaken the subject–object structure through which the individual normally experiences itself as separate.',
      'The term paramahaṃsa consequently names more than an exalted ascetic title. Within this text it is the supreme haṃsa, the reality that pervades the universe and is recognized as the truth of the individual principle. The yogic journey is a movement from haṃsa as unnoticed respiration and embodied individuality to paramahaṃsa as consciously realized universality.',
      'Liberation in Haṃsa is therefore best understood as recognition mediated by yogic transformation. The self is ontologically present from the beginning, but the practitioner must discipline breath, mantra, bodily attention and inner hearing so that this fact ceases to be merely doctrinal. The text refuses a sharp separation between jñāna and embodied contemplative method.'
    ],
    critical:[
      'Haṃsa survives in more than one manuscript and printed form. Older scholarship commonly distinguishes Calcutta and Poona versions, whose layout and readings are not identical. Claims about “eleven chapters” describe a common recension and should be tied to an edition when precise chapter or verse references are given.',
      'The presence of a Haṃsa text in Dārā Shikōh’s seventeenth-century Persian Upaniṣad collection is an important witness to circulation, but it does not by itself reconstruct the Sanskrit archetype. Persian transmission, later Sanskrit anthologies, the Muktikā list and the Upaniṣad Brahmayogin commentarial recension are different witnesses and should be evaluated separately.',
      'No ordinary printed Sanskrit text should be called a critical edition merely because it collates familiar readings. A proper critical edition would require systematic comparison of the manuscript families, transparent editorial principles and an apparatus documenting rejected variants. Much modern discussion of Haṃsa still depends on received editions and translations rather than such a full stemmatic reconstruction.',
      'Technical details are especially vulnerable to recensional variation: the number assigned to breaths, chapter divisions, the sequence of symbolic correspondences and the list of inner sounds may differ in presentation. University-level citation should therefore identify the Sanskrit edition or translation being followed.'
    ],
    reception:[
      'Haṃsa became important as a scriptural witness for ajapā-japa: the interpretation of ordinary inhalation and exhalation as an involuntary haṃsa/so’ham mantra. Later yoga and devotional writers could therefore present continuous remembrance not merely as a chosen repetition but as something already inscribed in life itself.',
      'Its importance also lies in synthesis. The text places mantra-śāstra categories, nyāsa, cakra ascent, Śiva–Śakti symbolism, four-state consciousness and nāda-yoga under the authority of an Upaniṣad. It is evidence for the historical process by which medieval yogic and tantric materials were reframed as śruti.',
      'Modern yoga literature frequently extracts the 21,600-breath doctrine or the so’ham formula while omitting the dialogue, ritual installation, sectarian symbolism and nāda sequence. Those extracts preserve genuine elements of the text but can give a misleading impression of simplicity. The received Haṃsa is a composite contemplative system, not merely a slogan about breath.',
      'The text also contributes to the broader semantic history of haṃsa and paramahaṃsa. These terms appear in renunciant classification, devotional symbolism and accounts of the liberated sage; Haṃsa Upaniṣad gives them a distinctive breath-mantra and subtle-body interpretation that should not automatically be transferred to every other occurrence.'
    ],
    social:[
      'The intended practitioner is presented as a disciplined brahmacārin: desire-controlled, devoted to a guru and qualified to receive a secret teaching. This is evidence for a restricted pedagogical ideal rather than for mass public practice. The text explicitly marks its knowledge as esoteric and not to be indiscriminately disclosed.',
      'Guru devotion is structurally important because the practice involves techniques and symbolic correspondences that are not self-explanatory. The dialogue form mirrors a social model in which liberating knowledge is transmitted through authorized instruction rather than discovered from an isolated text.',
      'Nyāsa and subtle-body practice show that Haṃsa belongs to an embodied ritual culture. Hands, limbs, breath, heart, channels and inner sound are all made sites of religious action. The Upaniṣad therefore complicates any simple narrative in which “philosophical” Upaniṣadic religion replaces ritual with abstract thought.',
      'The text’s Śaiva-Śākta authorization also locates it in a sectarian environment even though its final claim is universalizing. Śiva, Pārvatī, Rudra, Rudrāṇī and śakti are not merely ornaments; they mediate the authority through which a universal self is taught.',
      'The doctrine that every person breathes the mantra continuously creates a striking tension between universality and initiation. The physiological process is universal, but conscious recognition is reserved for the disciplined practitioner. Haṃsa thus turns an ordinary bodily fact into an esoteric religious resource.'
    ]
  };

  function cleanExisting(list){
    const BAD=[
      /should be read from beginning to end/i,
      /existing dossier/i,
      /distinctive centre .* dossier/i,
      /the encyclopedia therefore/i,
      /the article (asks|first reconstructs|ties|does not|avoids|records|follows)/i,
      /working chronological dossier/i,
      /received extent is summarized in the dossier/i,
      /a complete reading of .* reconnects doctrine/i,
      /the philosophical account of .* therefore distinguishes ontology/i,
      /historical interpretation remains evidentially layered/i,
      /an upaniṣad should be summarized as a sequence/i,
      /brevity is not evidence of simplicity/i,
      /when the received text brings together materials of different kinds/i,
      /the philosophical analysis asks four connected questions/i,
      /later commentators can be essential for reception history/i,
      /where identity statements, deity theology, mantra, yoga or ritual symbols appear/i,
      /composition, redaction, manuscript transmission, canonization and commentary are separate/i,
      /when precise dating is impossible, a broad range is more responsible/i,
      /structure is more than a verse count/i,
      /where multiple recensions survive, the article distinguishes/i,
      /a sanskrit printed text, a manuscript witness/i,
      /variant titles and spellings in the 108-text corpus/i,
      /reception is divided into stages/i,
      /influence should be tied to concrete teachings/i,
      /ritual and social prescriptions are treated as normative evidence/i,
      /teacher.student relations, bodily marks/i
    ];
    return arr(list).map(txt).filter(Boolean).filter(p=>!BAD.some(re=>re.test(p)));
  }

  function enrich(name,research){
    if(!research?.sections) return;
    const e=dataFor(name),r=richFor(name),s=research.sections;
    ['date','structure','contents','theology','critical','reception','social','further'].forEach(k=>s[k]=cleanExisting(s[k]));

    add(s.contents,[...arr(e.leadParagraphs),e.overview,e.summary,...arr(e.contents),...arr(e.keyContents),...arr(e.namedFeatures),...arr(r.lead),r.overview,r.summary,...arr(r.contents),...arr(r.keyContents),...unitText(r)]);
    add(s.theology,[e.profile,e.theology,e.philosophy,e.significance,...arr(e.themes),...arr(e.teachings),r.profile,r.theology,r.philosophy,r.significance,...arr(r.themes),...arr(r.teachings)]);
    add(s.date,[e.period,e.date,e.dating,e.datingBasis,e.history,e.textualSetting,r.period,r.date,r.setting,r.textualSetting]);
    add(s.structure,[e.structure,e.extent,e.booksCount,e.verseCount,...arr(e.chapterMap),r.structure,r.extent,r.booksCount,r.verseCount,...arr(r.chapterMap)]);
    add(s.critical,[e.manuscripts,e.recensions,e.edition,e.criticalEdition,e.textualHistory,...arr(e.primaryRecensions),r.manuscripts,r.recensions,r.edition,r.criticalEdition,r.textualHistory,...arr(r.primaryRecensions)]);
    add(s.reception,[e.reception,e.commentaries,e.significance,...arr(e.scholarlyPositions),...arr(e.scholarlyDebates),r.reception,r.commentaries,r.significance,...arr(r.scholarlyPositions),...arr(r.scholarlyDebates)]);
    add(s.social,[e.ritualHistory,e.socialHistory,e.dharma,e.ritual,e.yoga,e.renunciation,...arr(e.rituals),...arr(e.social),r.ritualHistory,r.socialHistory,r.dharma,r.ritual,r.yoga,r.renunciation,...arr(r.rituals),...arr(r.social)]);

    [...arr(e.articleSections),...arr(r.articleSections),...arr(r.sections)].filter(x=>x&&typeof x==='object').forEach(sec=>{
      const title=String(sec.title||sec.t||'').trim(),body=sectionText(sec); if(!body.length) return;
      if(DATE.test(title)) add(s.date,body);
      else if(STRUCT.test(title)) add(s.structure,body);
      else if(CRIT.test(title)) add(s.critical,body);
      else if(RECP.test(title)) add(s.reception,body);
      else if(SOCIAL.test(title)){add(s.social,body); add(s.contents,body);}
      else {add(s.contents,body); if(THEO.test(title)||body.some(x=>THEO.test(x))) add(s.theology,body);}
    });

    if(name==='Haṃsa'){
      Object.entries(HAMSA).forEach(([k,v])=>add(s[k],v));
      addRefs(research,HAMSA_SOURCES);
    } else {
      addRefs(research,[...arr(e.sources),...arr(e.refs),...arr(e.bibliography),...arr(r.sources),...arr(r.refs),...arr(r.bibliography)]);
    }
    add(s.further,research.references.slice(0,12).map(x=>x.title));

    const chars={date:charCount(s.date),structure:charCount(s.structure),contents:charCount(s.contents),theology:charCount(s.theology),critical:charCount(s.critical),reception:charCount(s.reception),social:charCount(s.social)};
    chars.total=Object.values(chars).reduce((a,b)=>a+b,0);
    research.audit=Object.assign({},research.audit||{}, {
      characters:chars,
      minimumCharacters:5000,
      contentsMinimum:2000,
      theologyMinimum:1400,
      encyclopedia5000:chars.total>=5000&&chars.contents>=2000&&chars.theology>=1400,
      paddingForbidden:true
    });
  }

  Object.entries(OUT).forEach(([name,research])=>enrich(name,research));
  const failures=Object.entries(OUT).map(([name,r])=>({name,chars:r?.audit?.characters||{}})).filter(x=>!x.chars.total||x.chars.total<5000||x.chars.contents<2000||x.chars.theology<1400);
  window.UPANISHAD_RESEARCH_108_AUDIT={
    total:Object.keys(OUT).length,
    minimumCharactersPerArticle:5000,
    minimumContentsCharacters:2000,
    minimumTheologyCharacters:1400,
    failures,
    allPass:failures.length===0,
    rule:'Only text-specific research counts. Falling below the target is a failure to research individually, never a reason to append generic prose.'
  };
})();
