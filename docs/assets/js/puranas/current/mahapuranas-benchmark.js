(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const NAMES=['Brahma Purāṇa','Padma Purāṇa','Viṣṇu Purāṇa','Śiva Purāṇa','Liṅga Purāṇa','Garuḍa Purāṇa','Nāradīya Purāṇa','Bhāgavata Purāṇa','Agni Purāṇa','Skanda Purāṇa','Bhaviṣya Purāṇa','Brahmavaivarta Purāṇa','Mārkaṇḍeya Purāṇa','Vāmana Purāṇa','Varāha Purāṇa','Matsya Purāṇa','Kūrma Purāṇa','Brahmāṇḍa Purāṇa'];
  const ORDER=['Date of composition','Structure','Contents','Theology','Critical edition','Influences and reception','Rites, dharma and social history','Further reading'];
  const A=v=>Array.isArray(v)?v.filter(Boolean):(v?[v]:[]);
  const N=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const T=x=>typeof x==='string'?x:(x?.text||x?.summary||x?.description||x?.note||x?.title||'');
  const U=xs=>{const seen=new Set();return xs.filter(Boolean).filter(x=>{const k=N(T(x));if(!k||seen.has(k))return false;seen.add(k);return true;});};
  const E=name=>D[`Purāṇa:${name}`]||D[name]||{};
  const SNAP=window.__MAHAPURANA_EXPANDED_SNAPSHOT__||{};
  const EXACT=xs=>{const seen=new Set();return xs.filter(Boolean).filter(x=>{let k;try{k=JSON.stringify(x);}catch(_){k=String(x);}if(seen.has(k))return false;seen.add(k);return true;});};
  const SOURCEKEY=s=>N((typeof s==='string'?s:(s?.title||''))+' '+(typeof s==='string'?'':(s?.url||'')));
  const SOURCES=xs=>{const seen=new Set();return xs.filter(Boolean).filter(s=>{const k=SOURCEKEY(s);if(!k||seen.has(k))return false;seen.add(k);return true;});};

  function restoreExpanded(name){
    const snap=SNAP[name]; if(!snap)return;
    const e=E(name); if(!Object.keys(e).length)return;
    e.articleSections=EXACT([...A(snap.articleSections),...A(e.articleSections)]);
    e.leadParagraphs=U([...A(snap.leadParagraphs),...A(e.leadParagraphs)]);
    ['chapterMap','rituals','vratas','sacredGeography','pilgrimage','dharma','dependencies','scholarlyPositions','scholarlyDebates','primaryEvidence','bibliography'].forEach(field=>{e[field]=U([...A(snap[field]),...A(e[field])]);});
    e.sources=SOURCES([...A(snap.sources),...A(e.sources)]);
    D[`Purāṇa:${name}`]=e;
  }

  function canon(title){const t=N(title);if(/date|chronolog|provenance|formation/.test(t))return 'Date of composition';if(/structure|book|skandha|khanda|samhita|part|chapter|organization|organisation/.test(t))return 'Structure';if(/critical|manuscript|edition|transmission|recension|textual history/.test(t))return 'Critical edition';if(/theolog|philosoph|bhakti|jnana|yoga|advaita|vedanta|supreme|sectarian/.test(t))return 'Theology';if(/ritual|dharma|vrata|rite|custom|social|pilgrimage|sacred geography|temple|gift|dana|funeral|shraddha|worship|festival/.test(t))return 'Rites, dharma and social history';if(/reception|influence|commentar|historical significance/.test(t))return 'Influences and reception';if(/further reading|bibliograph|reference|source/.test(t))return 'Further reading';return 'Contents';}
  function merge(dst,s){dst.paragraphs=U([...A(dst.paragraphs),...A(s.paragraphs),s.text,s.summary,s.note]);dst.bullets=U([...A(dst.bullets),...A(s.bullets)]);dst.subsections=EXACT([...A(dst.subsections),...A(s.subsections)]);A(s.books).forEach((b,i)=>dst.subsections.push({title:b?.title||b?.name||`Part ${i+1}`,paragraphs:U([b?.summary,b?.text,b?.description,b?.note]),bullets:[]}));dst.subsections=EXACT(dst.subsections);}
  function normalize(name){const e=E(name);if(!Object.keys(e).length)return;const slots=Object.fromEntries(ORDER.map(t=>[t,{title:t,paragraphs:[],bullets:[],subsections:[]}])) ;A(e.articleSections).forEach(s=>merge(slots[canon(s.title)],s));e.articleSections=ORDER.map(t=>slots[t]);D[`Purāṇa:${name}`]=e;}

  const PROFILES={
    'Brahma Purāṇa':{
      date:'The extant Brahma Purāṇa is not a simple survival of an ancient “first Purāṇa.” Its present form is composite, and the unusually strong concentration on sacred geography—especially material connected with Odisha, the Jagannātha region and the Gautamī/Godāvarī cycle—shows that regional accretion and redaction are central to its history.',
      structure:'The received text is best approached as a layered anthology rather than as a single continuously planned narrative. Cosmology and genealogy coexist with large tīrtha-māhātmya blocks, and chapter totals differ across printed and manuscript traditions.',
      contents:'Its encyclopedic narrative moves through creation, dynastic material, myths of deities and avatāras, pilgrimage geography, vows and ritual observance. For historical study, the regional māhātmyas are as important as the more conventional pañcalakṣaṇa topics because they show how Purāṇic authority was used to sacralize landscapes.',
      theology:'The text is broadly Brahmanical and frequently Vaiṣṇava in orientation, yet its ritual and pilgrimage materials are not reducible to a single exclusive sectarian system. Viṣṇu, Śiva, Devī and regional sacred places are integrated into a shared Purāṇic cosmos.',
      reception:'The Brahma Purāṇa became important as a source for pilgrimage, regional sacred geography and Purāṇic cosmology. Its reception is therefore tied not only to narrative mythology but also to the localization of all-India sacred traditions.'
    },
    'Padma Purāṇa':{
      date:'The Padma Purāṇa is one of the clearest examples of a text whose title covers a long and unstable history. Its khaṇḍas contain materials of very different periods, and major northern and southern recensional configurations do not agree in all divisions or passages.',
      structure:'Printed editions commonly arrange the work into large khaṇḍas, but the number, order and extent of those khaṇḍas vary. Any chapter citation should therefore identify the edition or recension rather than assume a universal numbering system.',
      contents:'The work combines cosmogony, genealogy, pilgrimage, vrata, ritual instruction, narratives of Viṣṇu and Śiva, sacred-month observances and extensive sectarian teaching. The Uttara and other later strata became especially influential for Vaiṣṇava devotional and normative claims.',
      theology:'The Padma Purāṇa contains strongly Vaiṣṇava passages but also substantial Śaiva and more broadly Purāṇic material. Apparent theological uniformity is often the result of reading one recensional block as if it represented the entire textual history.',
      reception:'Its authority is especially visible in later Vaiṣṇava citation, pilgrimage literature, vrata manuals and discussions of Purāṇic classification. Individual verses should be traced to a recension because famous sectarian passages are not always equally attested.'
    },
    'Viṣṇu Purāṇa':{
      date:'The Viṣṇu Purāṇa is comparatively coherent among the Mahāpurāṇas, but it still reflects composition and redaction over time. Its language, dynastic horizon, theology and intertextual relations are more useful for historical dating than traditional claims assigning the whole work to primordial antiquity.',
      structure:'The received work is organized into six aṃśas. This six-part architecture gives it a clearer literary profile than many larger Purāṇas, though manuscripts and editions can still differ in readings and local detail.',
      contents:'The six aṃśas proceed through creation and cosmology, earth and sacred geography, Vedic-social order and stages of life, royal genealogies, an extensive Kṛṣṇa cycle, and final teachings on the Kali age and liberation. The narrative therefore joins classical pañcalakṣaṇa themes to Vaiṣṇava devotional theology.',
      theology:'Viṣṇu is the supreme divine ground of creation, preservation and dissolution, and avatāra theology integrates cosmic sovereignty with narrative devotion. At the same time, the work incorporates Sāṃkhya-like cosmological categories and mokṣa teaching rather than presenting bhakti as an isolated alternative to philosophical analysis.',
      reception:'The Viṣṇu Purāṇa became a major source for later Vaiṣṇava cosmology, genealogy and avatāra theory and was repeatedly cited by Vedāntic and Purāṇic authors. Modern scholarship also values it because its organization is unusually tractable for comparing Purāṇic narrative strata.'
    },
    'Śiva Purāṇa':{
      date:'The extant Śiva Purāṇa is a composite Śaiva corpus whose present saṃhitā arrangement is later than many of the myths and ritual themes it contains. Traditional reports of larger or alternative recensions are part of the transmission history and should not be collapsed into the modern printed text.',
      structure:'Common editions divide the work into seven saṃhitās, but Purāṇic catalogues and manuscripts preserve evidence for alternative arrangements and verse totals. The received architecture therefore represents one historically successful redaction rather than an uncontested original form.',
      contents:'The text includes cosmogony, the emergence and supremacy of Śiva, Satī and Pārvatī, the births of Skanda and Gaṇeśa, liṅga mythology, sacred geography, vows, initiation and modes of Śaiva worship. Narrative and ritual repeatedly interpret one another.',
      theology:'Śiva is presented as supreme, transcending and manifesting the cosmic functions while remaining accessible through liṅga, mantra, devotion and ritual. Śakti is integral to this theology, especially in the Pārvatī cycles and accounts of creation.',
      reception:'The Śiva Purāṇa is a major popular and liturgical source for Śaiva mythology, festival narration, liṅga theology and devotional practice. Its modern authority often reflects the prestige of printed recensions that stabilized a much more complicated manuscript history.'
    },
    'Liṅga Purāṇa':{
      date:'The Liṅga Purāṇa is composite, with Śaiva myth, cosmology, ritual and tīrtha material accumulated across different periods. Its present form belongs to the medieval Purāṇic transformation of older Rudra-Śiva traditions into developed liṅga-centered theology.',
      structure:'The common recension is divided into two large bhāgas. Internal repetitions and changes of topic are evidence of compilation, and exact chapter numbers should be checked against the edition being cited.',
      contents:'Creation, cosmic cycles, genealogies, manifestations of Śiva, liṅga worship, vows, pilgrimage, temple and image practice, yoga and liberation form the principal thematic fields. The famous infinite-liṅga motif expresses theology through narrative cosmology.',
      theology:'The liṅga is not treated merely as a cult object; it becomes a sign of the unbounded and causally prior Śiva from whom the manifest cosmos emerges. Ritual worship, knowledge and devotion are presented as mutually reinforcing paths.',
      reception:'The text is important for the historical interpretation of liṅga symbolism and the normalization of Śaiva ritual within Purāṇic religion. It also supplied later compilers with myths and prescriptions that circulated outside the work itself.'
    },
    'Garuḍa Purāṇa':{
      date:'The Garuḍa Purāṇa is a layered Vaiṣṇava encyclopedia whose funerary sections are only one part of a much broader textual history. Medical, gemological, ritual, cosmological and afterlife materials belong to different specialist and redactional environments.',
      structure:'Recensions commonly distinguish a large first section from an Uttara or Pretakalpa complex, but the boundaries and chapter counts vary. The popular identification of the whole Purāṇa with death ritual therefore misrepresents its structure.',
      contents:'Alongside Viṣṇu theology and cosmology, the text treats image worship, rites, gifts, medicine, toxicology, gems, omens, yoga, ethics, death, post-mortem journeys, śrāddha and rebirth. The Pretakalpa became disproportionately famous because of its ritual use around death.',
      theology:'The afterlife material is embedded in a Vaiṣṇava moral universe in which karma, ritual obligation, gifts, remembrance of Viṣṇu and knowledge all affect the destiny of embodied beings. The text joins devotional salvation to a highly elaborated account of post-mortem consequence.',
      reception:'Its strongest living reception is funerary: passages are recited or paraphrased in contexts of death and mourning. Yet historians of medicine, gems and ritual also use the Garuḍa Purāṇa as an encyclopedic witness to medieval Sanskrit knowledge.'
    },
    'Nāradīya Purāṇa':{
      date:'The Nāradīya or Nārada Purāṇa is a medieval Vaiṣṇava compilation and must be distinguished from other works circulating under related Nārada titles, especially the Bṛhannāradīya tradition. Title similarity is not evidence of textual identity.',
      structure:'The received Nāradīya Purāṇa is usually divided into two major parts with many chapters, but the textual boundaries and relation to Nārada-named companion works require edition-specific care.',
      contents:'It combines Vaiṣṇava devotion, pilgrimage, vows, ritual, cosmology, accounts of other scriptures and practical religious instruction. Its bibliographic or survey-like notices are particularly useful for the history of how later Brahmanical authors imagined the scriptural field.',
      theology:'Bhakti to Viṣṇu, especially through name, worship, sacred observance and pilgrimage, provides the dominant orientation, while other deities and conventional Purāṇic cosmology remain integrated into the larger religious world.',
      reception:'The text is important for Vaiṣṇava devotional practice and for later descriptions of Purāṇic and ritual literature. Its attribution to Nārada, the paradigmatic divine sage and transmitter of bhakti, strongly shaped its received authority.'
    },
    'Bhāgavata Purāṇa':{
      date:'The Bhāgavata Purāṇa is generally treated as an early-medieval work whose twelve-skandha form emerged within a mature Vaiṣṇava devotional and Vedāntic environment. Proposals for its date rely on language, theology, literary relations and reception history rather than the narrative claim that Vyāsa composed it at the dawn of Kali.',
      structure:'Its twelve skandhas form a carefully shaped literary whole, with the tenth skandha’s Kṛṣṇa narrative at the devotional center and the surrounding books establishing cosmology, avatāra theory, exemplary devotees, philosophy and eschatology.',
      contents:'The work moves from questions about the highest dharma and the nature of Bhagavān through creation, cosmology and avatāras to narratives of Dhruva, Prahlāda, Ṛṣabha, the churning of the ocean, Vāmana and other figures. The tenth skandha narrates Kṛṣṇa from birth through Vraja, Mathurā and Dvārakā; later books return to devotion, renunciation, Uddhava’s instruction and the end of the Yādavas.',
      theology:'Bhagavān is approached through intense bhakti without abandoning metaphysical claims about brahman, ātman and the cosmic ground. The text’s theology of Kṛṣṇa, līlā, avatāra, divine immanence and loving devotion became foundational for several later Vaiṣṇava traditions, which nevertheless interpret key passages differently.',
      reception:'Few Purāṇas have generated a comparable commentarial, performative and vernacular afterlife. Śrīdhara Svāmin, Vallabha, Gauḍīya Vaiṣṇava commentators and many later teachers made it central to theology, recitation, kathā, poetry, music and visual culture.'
    },
    'Agni Purāṇa':{
      date:'The Agni Purāṇa is a composite early-medieval encyclopedia. Its mature śāstric range presupposes centuries of technical literature, so dating must proceed by identifying strata and parallels rather than assigning its hundreds of chapters to one authorial moment.',
      structure:'Unlike Purāṇas organized around a stable set of skandhas, common Agni editions present roughly 382–383 chapters in a long encyclopedic sequence. Clusters of technical material may preserve different stages of compilation.',
      contents:'Myth and avatāra narrative stand beside temple construction, image measurement and consecration, polity, diplomacy, warfare, law, medicine, veterinary lore, grammar, lexicography, metrics, poetics, dramaturgy, omens, yoga and liberation. The text functions as a Purāṇic library of condensed specialist knowledge.',
      theology:'Its sacred horizon is broad rather than narrowly sectarian. Viṣṇu is prominent, but Śiva, Devī, Sūrya and other deities appear throughout ritual and iconographic chapters, while philosophical materials integrate yoga and knowledge into the encyclopedic project.',
      reception:'The Agni Purāṇa is repeatedly mined by modern historians of architecture, iconography, polity, medicine and Sanskrit literary theory. Its reception demonstrates that a Purāṇa could serve as an authoritative container for technical knowledge as well as myth.'
    },
    'Skanda Purāṇa':{
      date:'“Skanda Purāṇa” names a textual history rather than one uniform book. The oldest recoverable recension, studied by the Groningen critical-edition project, is much shorter than the enormous later khaṇḍa corpus familiar from many printed editions; later regional pilgrimage collections expanded under the same title.',
      structure:'The early Skandapurāṇa and the later multi-khaṇḍa Skanda corpus must be distinguished. Later editions assemble vast sections devoted to regions and tīrthas, while the critical edition of the early recension reconstructs a different and earlier textual configuration.',
      contents:'Śiva and Skanda mythology, cosmology and sacred geography are joined to some of the largest surviving bodies of pilgrimage māhātmya literature. Kāśī, the Himalaya, central and western Indian regions and many local tīrthas are woven into a Purāṇic map of sacred space.',
      theology:'The corpus is strongly Śaiva, presenting Śiva’s supremacy and the sacred power of his places, myths and manifestations. Yet the later pilgrimage strata are also repositories of local traditions and inter-sectarian accommodation.',
      reception:'Its greatest historical influence may lie in sacred geography: regional communities could attach local places to a transregional Purāṇic frame. The modern critical Skandapurāṇa project has also made the text central to scholarship on how Purāṇas grew through manuscript transmission and regional redaction.'
    },
    'Bhaviṣya Purāṇa':{
      date:'The Bhaviṣya Purāṇa is exceptionally composite and contains demonstrably late material. Different parvans and recensions grew over long periods, and passages that appear to refer to later peoples, religions or historical events cannot responsibly be projected back into remote antiquity.',
      structure:'Its major parvans are internally heterogeneous, and printed editions do not represent a single stable ancient archetype. The Pratisarga material in particular requires close recensional and manuscript control before historical claims are made from it.',
      contents:'The text contains creation and ritual material, vrata, festival and solar traditions, genealogical or “future” narrative, social prescriptions and late historicalizing passages. The category of bhaviṣya—future—became a powerful literary device for presenting retrospective material as prophecy.',
      theology:'No single theological program governs every layer. Sūrya worship, broader Brahmanical ritual, Vaiṣṇava and Śaiva materials, and later sectarian concerns coexist within the transmitted corpus.',
      reception:'The Bhaviṣya Purāṇa is frequently invoked in modern claims about prophecy. Scholarly use must instead begin with manuscript history, dateable vocabulary and the known capacity of Purāṇic texts to absorb new material over time.'
    },
    'Brahmavaivarta Purāṇa':{
      date:'The extant Brahmavaivarta Purāṇa is generally regarded as a comparatively late Purāṇic composition, with major strata reflecting medieval devotional developments. Its theology of Rādhā and Kṛṣṇa is especially important for relative dating within the history of Vaiṣṇavism.',
      structure:'The received work is arranged in four khaṇḍas—Brahma, Prakṛti, Gaṇeśa and Kṛṣṇajanma—whose theological emphases are linked by a strongly devotional cosmology.',
      contents:'Creation and divine emanation, extensive goddess material, Gaṇeśa traditions and a large Kṛṣṇa cycle culminate in a distinctive elevation of Rādhā and Kṛṣṇa. Ritual, myth, cosmology and devotional praise are interwoven rather than separated into independent treatises.',
      theology:'Rādhā is elevated as primordial divine power and Kṛṣṇa as the supreme reality, producing a theology that differs markedly from earlier Purāṇic Vaiṣṇava formulations. Prakṛti and the goddesses are integrated into this Kṛṣṇa-centered metaphysics.',
      reception:'The text became significant for later Rādhā-Kṛṣṇa devotional culture and is frequently cited in discussions of the Purāṇic development of Rādhā theology. Its late features make it especially useful for tracing change rather than reconstructing early Vaiṣṇavism.'
    },
    'Mārkaṇḍeya Purāṇa':{
      date:'The Mārkaṇḍeya Purāṇa contains relatively old Purāṇic narrative strata together with later additions; its layers cannot be dated as one unit. The Devīmāhātmya embedded within it is itself a major early witness to a developed Goddess theology and has a reception history larger than its host Purāṇa.',
      structure:'Common editions contain roughly 137 chapters. The Devīmāhātmya occupies a compact central block within the larger work, whose surrounding materials include cosmogony, moral narrative, legends and discussion of social and cosmic order.',
      contents:'The Purāṇa includes creation, the story of Mārkaṇḍeya, accounts of Manus and dynasties, moral and didactic narratives, and the Devīmāhātmya’s three great cycles of the Goddess defeating Madhu-Kaiṭabha, Mahiṣāsura and Śumbha-Niśumbha. The host text is broader than the famous Goddess section.',
      theology:'Outside the Devīmāhātmya the text is comparatively non-exclusive, while the Goddess section identifies Devī as the supreme cosmic power, simultaneously transcendent and immanent in all beings. This embedded theology became foundational for later Śākta traditions.',
      reception:'The Devīmāhātmya became one of the most recited and commented Sanskrit scriptures of Goddess worship and is central to Navarātri/Durgā Pūjā traditions. The larger Mārkaṇḍeya Purāṇa also remains important for reconstructing early Purāṇic narrative forms.'
    },
    'Vāmana Purāṇa':{
      date:'Despite its Vaiṣṇava title, the extant Vāmana Purāṇa is a composite medieval work with strong Śaiva and pilgrimage interests. The name of the Vāmana avatāra should therefore not be used as a shortcut for classifying every layer of the text as exclusively Vaiṣṇava.',
      structure:'The received chapter sequence is relatively compact by Mahāpurāṇa standards, but transmitted verse totals and the relation of lost or reported supplementary material remain part of the textual problem.',
      contents:'Myths of Śiva and Pārvatī, tīrtha geography, ritual observance and Brahmanical cosmology occupy substantial space alongside Vaiṣṇava narrative. Kurukṣetra and other sacred landscapes are especially important to its religious geography.',
      theology:'The text is a useful warning against rigid sectarian labels: Śaiva devotion and myth can dominate a Purāṇa named for a Viṣṇu avatāra. Its theology reflects the porous boundaries of medieval Purāṇic compilation.',
      reception:'The Vāmana Purāṇa has been used especially for sacred geography and Śaiva myth, while its title continued to secure it a place in lists of the eighteen Mahāpurāṇas.'
    },
    'Varāha Purāṇa':{
      date:'The Varāha Purāṇa is a composite medieval text whose surviving form is heavily shaped by pilgrimage, ritual and sectarian redaction. Traditional verse totals substantially exceed many extant recensions, indicating loss, rearrangement or the coexistence of different textual forms.',
      structure:'Much of the work is framed as instruction associated with Varāha, but the surviving sequence is not a simple avatāra biography. Large ritual and tīrtha units dominate the received architecture.',
      contents:'The text covers sacred places, vows, image and temple worship, gifts, cosmology and narratives of deities, with Vaiṣṇava framing alongside significant Goddess and regional religious material. Its value lies particularly in the intersection of theology with pilgrimage and ritual practice.',
      theology:'Varāha functions as a revelatory form of Viṣṇu, yet the text accommodates multiple deities and ritual systems. The theological world is therefore more inclusive and locally textured than the title alone suggests.',
      reception:'Its pilgrimage and ritual passages were important to later compilers and regional sacred-geography traditions. Textual instability, however, makes edition-specific citation essential.'
    },
    'Matsya Purāṇa':{
      date:'The Matsya Purāṇa preserves old Purāṇic material but reached its extant form through substantial redaction. Dynastic lists, temple and image chapters, ritual prescriptions and narrative parallels provide different chronological clues and should be assessed separately.',
      structure:'The work is transmitted as a long chapter sequence rather than a small number of stable skandhas. Changes in subject—from flood myth and cosmology to architecture, ritual and dynastic history—reflect its encyclopedic compilation.',
      contents:'The Matsya flood and rescue of Manu give the text its title, but the Purāṇa ranges far beyond that episode: creation, genealogies, royal dynasties, tīrthas, vows, gifts, temple architecture, iconography, festivals, śrāddha and duties of rulers all appear in detail.',
      theology:'Matsya is a form of Viṣṇu and the revelation frame is Vaiṣṇava, but the text operates within a broad Brahmanical religious universe in which Śiva, Devī and many forms of ritual worship are fully present.',
      reception:'Historians use the Matsya Purāṇa not only for myth but also for early Indian temple, iconographic and dynastic traditions. Its flood narrative has also become one of the best-known Purāṇic stories in comparative discussions of deluge myths.'
    },
    'Kūrma Purāṇa':{
      date:'The Kūrma Purāṇa is a layered medieval text whose Vaiṣṇava frame coexists with a powerful Śaiva and Vedāntic synthesis. Its history reflects a period in which Purāṇic authors could rework sectarian boundaries while claiming ancient revelation.',
      structure:'The received text is commonly divided into two major bhāgas. The organization combines narrative Purāṇic material with substantial doctrinal and ritual teaching, including the celebrated Īśvaragītā.',
      contents:'Creation, avatāras, cosmology, genealogies, pilgrimage, dharma, yoga and ritual are joined to the Īśvaragītā and other passages in which Śiva teaches liberation. This mixture makes the work especially important for studying Vaiṣṇava-Śaiva accommodation.',
      theology:'The Purāṇa can praise Viṣṇu while also presenting Śiva as supreme teacher and integrating Vedāntic nondual language. Rather than forcing these layers into a single sectarian label, the article treats theological plurality as evidence of redaction and synthesis.',
      reception:'The Kūrma Purāṇa has been important for the study of Pāśupata/Śaiva materials, dharma and Vedāntic synthesis. Its Īśvaragītā circulated as an influential Śaiva counterpart to better-known “Gītā” discourses.'
    },
    'Brahmāṇḍa Purāṇa':{
      date:'The Brahmāṇḍa Purāṇa is a layered cosmological and ritual corpus with major regional and sectarian accretions. Some famous works associated with its transmission, including the Lalitopākhyāna and versions of the Adhyātma Rāmāyaṇa, require recensional care rather than being assumed to belong equally to every manuscript lineage.',
      structure:'The received work is organized into large divisions whose names and boundaries vary in descriptions of the text. The transmission history is complicated further by embedded works that acquired semi-independent lives.',
      contents:'Cosmogony, cosmic geography, genealogies, ages, royal traditions and ritual material form the Purāṇic core. The Lalitopākhyāna presents an extensive Śrīvidyā-oriented Goddess narrative, while the Adhyātma Rāmāyaṇa in some transmission streams reinterprets the Rāma story through devotional and Vedāntic theology.',
      theology:'The core cosmology is broadly Brahmanical, while major embedded strata can be strongly Śākta or Vaiṣṇava-Vedāntic. This is a textbook case of why the theology of a Purāṇa must be described layer by layer.',
      reception:'The work influenced cosmological writing, Śrīvidyā traditions through the Lalitā cycle, and devotional Rāma traditions through the Adhyātma Rāmāyaṇa. These embedded texts often became better known than the surrounding Purāṇa.'
    }
  };

  const COMMON_SOURCES=[
    {title:'Ludo Rocher, The Purāṇas (1986)',detail:'Standard scholarly survey of Purāṇic literature, textual history, chronology, recensions and research problems.',url:'https://books.google.com/books?id=n0-4RJh5FgoC'},
    {title:'R. C. Hazra, Studies in the Purāṇic Records on Hindu Rites and Customs',detail:'Foundational study of Purāṇic chronology, ritual, vrata, dharma and social history.',url:'https://archive.org/details/in.ernet.dli.2015.110115'},
    {title:'P. V. Kane, History of Dharmaśāstra',detail:'Essential comparative reference for dharma, gifts, vows, pilgrimage, funerary rites and Purāṇic legal-religious prescriptions.',url:'https://archive.org/search?query=creator%3A%22P.+V.+Kane%22+History+of+Dharmasastra'},
    {title:'Moriz Winternitz, A History of Indian Literature, vol. 1',detail:'Classic history of Sanskrit literature with an early scholarly survey of Purāṇic composition and transmission.',url:'https://archive.org/search?query=Winternitz+History+Indian+Literature+Purana'},
    {title:'J. L. Brockington, The Sanskrit Epics',detail:'Useful for comparing Purāṇic narrative, genealogy and myth with the Mahābhārata and Rāmāyaṇa traditions.',url:'https://books.google.com/books?q=J.+L.+Brockington+The+Sanskrit+Epics'},
    {title:'GRETIL and major Sanskrit digital text repositories',detail:'Useful for electronic searching and parallel passages; electronic texts must be checked against identified printed editions and manuscripts.',url:'https://gretil.sub.uni-goettingen.de/gretil.html'}
  ];
  const SPECIFIC_SOURCES={
    'Skanda Purāṇa':[{title:'The Skandapurāṇa Project, University of Groningen',detail:'Critical-edition project for the oldest recoverable Skandapurāṇa recension; crucial for separating the early text from the later gigantic khaṇḍa corpus.',url:'https://www.skandapurana.org/'}],
    'Mārkaṇḍeya Purāṇa':[{title:'F. E. Pargiter, The Mārkaṇḍeya Purāṇa',detail:'Historic translation and textual study; still useful when checked against later scholarship and Sanskrit editions.',url:'https://archive.org/search?query=Pargiter+Markandeya+Purana'}],
    'Bhāgavata Purāṇa':[{title:'J. A. B. van Buitenen and later Bhāgavata scholarship',detail:'Use alongside Sanskrit editions and major commentaries for literary structure, bhakti theology and reception.',url:'https://books.google.com/books?q=Bhagavata+Purana+scholarship+van+Buitenen'}],
    'Viṣṇu Purāṇa':[{title:'H. H. Wilson, The Vishnu Purana',detail:'Historically important translation with extensive comparative notes; superseded in places but still valuable for the history of Purāṇic scholarship.',url:'https://archive.org/search?query=H.H.+Wilson+Vishnu+Purana'}],
    'Agni Purāṇa':[{title:'M. N. Dutt, English translation of the Agni Purāṇa',detail:'Access to a major printed recension; technical passages should be compared with their specialist śāstric parallels.',url:'https://www.wisdomlib.org/hinduism/book/the-agni-purana'}]
  };

  function section(e,title){return A(e.articleSections).find(s=>s&&s.title===title);}
  function addParagraph(e,title,text){const s=section(e,title);if(!s||!text)return;s.paragraphs=U([...A(s.paragraphs),text]);}
  function addBullet(e,title,text){const s=section(e,title);if(!s||!text)return;s.bullets=U([...A(s.bullets),text]);}
  function enrich(name){
    const e=E(name); if(!Object.keys(e).length)return;
    const p=PROFILES[name]; if(!p)return;
    addParagraph(e,'Date of composition',p.date);
    addParagraph(e,'Date of composition',`For ${name}, chronology is best expressed as a history of layers: the date of an older narrative motif, the redaction of a section, the age of surviving manuscripts and the date of a printed edition are different questions. Traditional attributions are recorded as reception history, not used as automatic historical dates.`);
    addParagraph(e,'Structure',p.structure);
    addParagraph(e,'Structure',`The structure reported here follows the received Sanskrit text actually used by modern editions. Where chapter, khaṇḍa, skandha or saṃhitā numbering varies, the article treats that variation as evidence about transmission rather than silently forcing all witnesses into one scheme.`);
    addParagraph(e,'Contents',p.contents);
    addParagraph(e,'Contents',`A complete reading of ${name} must distinguish narrative sequence from encyclopedic insertion. Myths, cosmology, genealogy, tīrtha-māhātmya, vrata, dharma, ritual and technical śāstra can enter the same Purāṇa at different redactional moments, so the article identifies both what each block says and why that block matters historically.`);
    addParagraph(e,'Theology',p.theology);
    addParagraph(e,'Theology',`Theology is reconstructed from the received text rather than from the later guṇa-classification of Purāṇas alone. Praise of one deity, inclusive identification of several deities, ritual hierarchy and philosophical statements can coexist, and apparent contradictions may preserve different compositional layers.`);
    addParagraph(e,'Critical edition',`No claim of a “critical edition” is made merely because a Sanskrit book has been printed. For ${name}, the article distinguishes ordinary editions, manuscript collation, recensional comparison and a genuinely critical or stemmatic reconstruction; where the last does not exist for the whole work, that limitation is stated explicitly.`);
    addParagraph(e,'Critical edition',`Text-critical work should compare chapter numbering, omitted or additional passages, colophons, regional recensions and quotations in other works. Parallel passages can reveal borrowing or interpolation, but they do not by themselves determine the direction of dependence.`);
    if(name==='Skanda Purāṇa') addParagraph(e,'Critical edition','The Groningen Skandapurāṇa Project is exceptional because it critically edits the oldest recoverable recension from manuscript evidence. Its text must not be confused with the much larger later printed Skanda corpus that circulates in multiple khaṇḍas.');
    addParagraph(e,'Influences and reception',p.reception);
    addParagraph(e,'Influences and reception',`Reception is separated into premodern commentary and citation, ritual or pilgrimage use, vernacular adaptation, print culture and modern popular circulation. A passage can be culturally influential even when it is demonstrably late, while an old stratum can have a comparatively narrow later reception.`);
    addParagraph(e,'Rites, dharma and social history',`The ritual and social evidence in ${name} is normative evidence: it shows what authors and transmitting communities prescribed, praised, prohibited or imagined. It cannot be converted directly into statistics about how all people actually lived.`);
    addParagraph(e,'Rites, dharma and social history',`Vrata, dāna, śrāddha, pilgrimage, temple service, royal duty, caste and life-stage rules, ascetic practice and domestic observance are therefore read together with Dharmaśāstra, inscriptions, regional history and other Purāṇas. Agreements and contradictions between these sources are historically meaningful.`);
    addBullet(e,'Further reading','Use Ludo Rocher for the textual history of the Purāṇic genre before relying on unsourced modern summaries.');
    addBullet(e,'Further reading','Use R. C. Hazra and P. V. Kane for chronology, rites, vrata, dharma and social prescriptions, checking their older conclusions against more recent text-critical work.');
    e.sources=SOURCES([...A(e.sources),...COMMON_SOURCES,...A(SPECIFIC_SOURCES[name])]);
    e.bibliography=U([...A(e.bibliography),...COMMON_SOURCES.map(s=>s.title),...A(SPECIFIC_SOURCES[name]).map(s=>s.title)]);
    e.mahapuranaEncyclopedic20260827=true;
    D[`Purāṇa:${name}`]=e;
  }

  NAMES.forEach(restoreExpanded);
  NAMES.forEach(normalize);
  NAMES.forEach(enrich);
  delete window.__MAHAPURANA_EXPANDED_SNAPSHOT__;
  window.__MAHAPURANA_BENCHMARK_READY__=true;
  window.__MAHAPURANA_ENCYCLOPEDIC_SCOPE__={mahapuranas:NAMES.length,names:[...NAMES],template:[...ORDER,'References']};
})();