(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Upaniṣad:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const AIY='K. Narayanasvami Aiyar, Thirty Minor Upanishads and later minor-Upanishad translations';
  const DEU='Paul Deussen, Sixty Upanishads of the Veda';
  const MUK='Muktika Upanishad — 108-name and Veda catalogue';
  const SHA='Shaiva Upanishad Sanskrit editions and Upanishad Brahmayogin commentarial corpus';
  const SAK='A. G. Krishna Warrier, The Shakta Upanishads; Srividya commentarial traditions';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});
  const shCommon=[AIY,DEU,MUK,SHA], skCommon=[AIY,DEU,MUK,SAK];

  put('Akṣamālikā',{
    sanskritTitle:'अक्षमालिकोपनिषद्',language:'Sanskrit',period:'c. 1000–1500 CE',extent:'Short Shaiva ritual-mantra Upanishad on the rosary and Sanskrit letters',
    leadParagraphs:[
      'The Akshamalika Upanishad gives the prayer rosary an Upanishadic theology. Beads, letters and mantra are not treated as neutral counting devices: the mala becomes a material form of sacred speech and a support for remembering Shiva.',
      'Its subject is therefore both ritual and language. The alphabet is understood as a field of divine power, while the rosary organizes that power into disciplined japa.'
    ],articleSections:[
      {title:'Date and textual character',paragraphs:[
        'The received text is medieval, broadly c. 1000–1500 CE. Its ritual treatment of the rosary and mantra belongs to the later Shaiva Upanishad corpus.',
        'Muktika includes it among the 108, but its Veda affiliation in the later canon should not be confused with the date of the ancient Vedic Samhita.'
      ]},
      {title:'The akshamala',paragraphs:[
        'The rosary is explained through the number and ordering of beads, the materials from which they may be made, and the sacred meanings attached to them.',
        'Counting is not the only function. The mala gives repeated mantra a bodily rhythm and makes the discipline of memory tangible.'
      ]},
      {title:'Letters as sacred power',paragraphs:[
        'Aksha can mean both bead and syllabic unit. The text exploits that resonance by mapping the Sanskrit letters onto the rosary and divine powers.',
        'The alphabet thereby becomes more than a writing system. It is imagined as the articulated body of sacred speech through which mantra manifests.'
      ]},
      {title:'Japa and Shiva',paragraphs:[
        'The religious purpose of the rosary is sustained remembrance through mantra. Shiva is the supreme focus around whom the material object, letters and repetition acquire coherence.',
        'The work thus stands at the intersection of Upanishad, mantra-shastra and everyday Shaiva practice.'
      ]},
      {title:'Reception',paragraphs:[
        'Rosary use became ubiquitous across Hindu traditions, but Akshamalika preserves a specifically scriptural attempt to explain why the object can be sacred.',
        'Its significance lies in ritual theology rather than in a large independent metaphysical system.'
      ]}
    ],sources:merge(D['Upaniṣad:Akṣamālikā']?.sources,shCommon)
  });

  put('Rudrākṣajābāla',{
    sanskritTitle:'रुद्राक्षजाबालोपनिषद्',traditionalAuthor:'Kalagni Rudra teaching Sanatkumara',language:'Sanskrit',period:'c. 1000–1500 CE',extent:'Shaiva Upanishad devoted to the origin, types and wearing of rudraksha beads',
    leadParagraphs:[
      'The Rudrakshajabala Upanishad is the principal Upanishadic text devoted to rudraksha. Sanatkumara questions Kalagni Rudra about the origin and use of the sacred seeds, and the answer connects them directly with Shiva’s own eyes and compassion.',
      'The text moves from mythic origin to classification and practice. Different bead forms and arrangements are given religious meanings, while wearing rudraksha becomes a visible discipline of remembrance of Rudra.'
    ],articleSections:[
      {title:'Date, dialogue and Samaveda affiliation',paragraphs:[
        'The received work is medieval, broadly c. 1000–1500 CE, and is associated in later classification with the Samaveda.',
        'Its dialogue form places the teaching in the voice of Kalagni Rudra speaking to Sanatkumara. The ancient names provide sacred authority; the surviving ritual system is much later than the early Vedic hymns.'
      ]},
      {title:'Origin of rudraksha',paragraphs:[
        'The seeds are explained through the tears or eyes of Rudra, giving a botanical object a mythic origin in Shiva himself.',
        'This origin is not decorative background. It establishes why contact with the seed can be treated as contact with a sacred sign of the Lord.'
      ]},
      {title:'Types and faces of the beads',paragraphs:[
        'Rudraksha beads are distinguished by their mukhas or natural faces. The text assigns religious significance to different forms rather than treating every seed as ritually identical.',
        'Later rudraksha manuals greatly expand these classifications, so the Upanishad should be distinguished from later encyclopedic lists.'
      ]},
      {title:'How rudraksha is worn',paragraphs:[
        'The scripture describes wearing beads on different parts of the body and links bodily adornment with mantra and Shaiva identity.',
        'The religious logic is remembrance: the body marked by rudraksha becomes a moving field of worship rather than a neutral surface.'
      ]},
      {title:'Later Shaiva reception',paragraphs:[
        'Rudraksha became one of the most recognizable objects of Shaiva devotion, and the Upanishad supplied a shruti-style authority for practices otherwise elaborated in Purana and Agama literature.',
        'Modern popular claims about every possible mukhi should therefore not automatically be attributed to this Upanishad without checking the Sanskrit text.'
      ]}
    ],sources:merge(D['Upaniṣad:Rudrākṣajābāla']?.sources,[W('Rudrakshajabala Upanishad','https://en.wikipedia.org/wiki/Rudrakshajabala_Upanishad','Dialogue, Samaveda affiliation and rudraksha teaching.'),...shCommon])
  });

  put('Jābāli',{
    sanskritTitle:'जाबाल्युपनिषद्',language:'Sanskrit',period:'c. 800–1400 CE',extent:'Short Shaiva Upanishad on Pashupati, pashu and sacred ash',
    leadParagraphs:[
      'The Jabali Upanishad explains Shaiva religious identity through the relation between Pashupati, the Lord, and pashu, the bound individual. Sacred ash becomes the visible ritual expression of a deeper claim: bondage persists when the self is misidentified, while remembrance of Shiva directs the practitioner toward release.',
      'The text therefore connects metaphysical vocabulary with an embodied Shaiva practice rather than treating bhasma as mere external decoration.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received work belongs broadly to the medieval Shaiva-Upanishad corpus, c. 800–1400 CE. Exact redaction is uncertain.',
        'Its title links it to the wide Jabala family of Sanskrit texts, but it should not be confused with the older Sannyasa Jabala Upanishad.'
      ]},
      {title:'Pashupati and pashu',paragraphs:[
        'Pashupati is the Lord of bound beings; pashu names the finite creature conditioned by ignorance and attachment.',
        'The terminology gives Shaiva practice a soteriological structure: Shiva is not merely one deity to propitiate but the Lord in relation to whom bondage and release are understood.'
      ]},
      {title:'Bhasma',paragraphs:[
        'Sacred ash is praised and prescribed as a Shaiva mark. Its physical impermanence makes it an apt reminder of the body’s perishability and of Shiva’s association with cremation and transcendence.',
        'Ritual application is joined to mantra, turning a visible mark into a repeated act of theological memory.'
      ]},
      {title:'Knowledge and ritual identity',paragraphs:[
        'The text does not make ash a substitute for knowledge. The outer sign is valuable insofar as it expresses a transformed relation to Pashupati.',
        'This relationship between mark and meaning is typical of sectarian Upanishads: visible practice is justified by inward theology.'
      ]},
      {title:'Reception',paragraphs:[
        'The work belongs to the scriptural background of Shaiva bhasma practice alongside Kalagnirudra, Bhasmajabala and Purana/Agama sources.',
        'Keeping these texts distinct helps identify which ritual details are actually Upanishadic and which belong to later manuals.'
      ]}
    ],sources:merge(D['Upaniṣad:Jābāli']?.sources,shCommon)
  });

  put('Kaivalya',{
    sanskritTitle:'कैवल्योपनिषद्',language:'Sanskrit verse',period:'late 1st millennium BCE, broadly c. 300 BCE–100 CE',extent:'1 chapter, 26 verses in the common text; two Veda affiliations survive',primaryRecensions:['Krishna Yajurveda affiliation','Atharvaveda affiliation'],
    leadParagraphs:[
      'The Kaivalya Upanishad is a short but important Shaiva Vedanta text in which Ashvalayana seeks the highest knowledge and is directed toward meditation on the supreme Lord within the heart. Shiva-language, renunciation and the identity of the self with Brahman are woven into one twenty-six-verse teaching.',
      'Its “Shaiva” character does not make it a Purana in miniature. The work remains recognizably Upanishadic: the decisive problem is knowledge of the self, while Shiva is the name through which that supreme reality is contemplated.'
    ],articleSections:[
      {title:'Date, Veda affiliation and structure',paragraphs:[
        'The text belongs to the later first millennium BCE, broadly c. 300 BCE–100 CE, and is later than the oldest prose Upanishads. It survives with both Krishna-Yajurvedic and Atharvavedic affiliations.',
        'The common text has one chapter of twenty-six verses. Its compact form moves directly from the student’s question to meditation, realization and the description of the liberated knower.'
      ]},
      {title:'Ashvalayana seeks Brahma-vidya',paragraphs:[
        'The sage Ashvalayana asks for the highest knowledge by which the wise become free from all evil and attain the supreme Purusha.',
        'The answer places faith, devotion, meditation and renunciation together. Knowledge is not presented as mere intellectual information detached from spiritual discipline.'
      ]},
      {title:'Meditation on Shiva in the heart',paragraphs:[
        'The practitioner is directed to a quiet place and to meditate upon the Lord within the lotus of the heart. Shiva is described through attributes that simultaneously affirm divine form and transcend ordinary limitation.',
        'The heart-meditation makes the supreme inwardly present. The goal is not travel toward a distant deity but recognition of the Lord as the deepest reality of consciousness.'
      ]},
      {title:'Atman, Brahman and kaivalya',paragraphs:[
        'The text moves from devotional meditation to the declaration that the same consciousness shines through Brahma, Shiva, Indra and the universe. The realized person knows the one divine essence present in all.',
        'Kaivalya, “absoluteness” or freedom, is therefore not loneliness. It is release from false limitation and recognition of the supreme Self.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Kaivalya became popular beyond narrowly Shaiva circles because its language of meditation and nondual knowledge could be read within broader Vedanta.',
        'Its relatively early date also makes it important for the history of explicit Shiva theology in Upanishadic literature alongside Atharvashiras, Atharvashikha and Shvetashvatara.'
      ]}
    ],sources:merge(D['Upaniṣad:Kaivalya']?.sources,[W('Kaivalya Upanishad','https://en.wikipedia.org/wiki/Kaivalya_Upanishad','26 verses, late-first-millennium-BCE chronology, Shiva and Vedanta.'),...shCommon])
  });

  put('Kālāgnirudra',{
    sanskritTitle:'कालाग्निरुद्रोपनिषद्',traditionalAuthor:'Kalagni Rudra teaching Sanatkumara',language:'Sanskrit',period:'c. 300 BCE–500 CE for an early Shaiva core; ritual redaction may be later',extent:'Short Shaiva Upanishad on bhasma and tripundra',
    leadParagraphs:[
      'The Kalagnirudra Upanishad gives one of the most important scriptural explanations of the tripundra, the three horizontal lines of sacred ash worn by Shaivas. Sanatkumara asks Kalagni Rudra about the rite, and the reply maps ash, mantra, the three lines and their divine correspondences into a single ritual theology.',
      'The work is valuable because a familiar visual mark is explained not as custom alone but as condensed Vedic and Shaiva symbolism.'
    ],articleSections:[
      {title:'Date and dialogue',paragraphs:[
        'The text is often grouped with relatively early Shaiva Upanishads. A broad c. 300 BCE–500 CE range allows for an early theological core while recognizing that the precise ritual redaction is uncertain.',
        'The teaching is framed as Kalagni Rudra’s answer to Sanatkumara, linking the practice directly to Shiva’s authority.'
      ]},
      {title:'Preparation of sacred ash',paragraphs:[
        'Bhasma is prepared and consecrated through mantra. Its ritual purity matters because the ash is not ordinary dust once incorporated into worship.',
        'The act joins the material remains of fire to Rudra’s purifying and dissolving power.'
      ]},
      {title:'The three lines',paragraphs:[
        'Tripundra consists of three horizontal lines, each interpreted through sets of divine and cosmic correspondences.',
        'The lines can be related to fires, syllables, powers and states, turning the forehead mark into a compact sacred diagram.'
      ]},
      {title:'Mantra and bodily marking',paragraphs:[
        'Application is accompanied by mantra and extends beyond mere public identity. The marked body becomes part of ritual practice.',
        'This is why removing the mantras from the rite leaves only part of the Upanishad’s meaning.'
      ]},
      {title:'Shaiva reception',paragraphs:[
        'Kalagnirudra stands behind later Shaiva explanations of tripundra together with Agamic, Purana and other Upanishadic sources.',
        'Its early place in the Shaiva-Upanishad corpus makes it especially useful for tracing the scriptural history of visible sectarian marks.'
      ]}
    ],sources:merge(D['Upaniṣad:Kālāgnirudra']?.sources,shCommon)
  });

  put('Dakṣiṇāmūrti',{
    sanskritTitle:'दक्षिणामूर्त्युपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short mantra and meditation Upanishad devoted to Shiva as Dakshinamurti',
    leadParagraphs:[
      'The Dakshinamurti Upanishad presents Shiva as the supreme teacher, the south-facing Lord whose knowledge is deeper than ordinary verbal instruction. Its mantras and meditations identify the guru-form of Shiva with the absolute reality realized in the heart.',
      'The text belongs to the later flourishing of Dakshinamurti theology, where the silent teacher becomes a powerful image for knowledge that cannot be reduced to words.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received text is medieval, broadly c. 1200–1600 CE. Its mantra system and developed Dakshinamurti iconography belong to the mature Shaiva-Vedanta world.',
        'It is distinct from later hymns and stotras to Dakshinamurti even when they share theological vocabulary.'
      ]},
      {title:'Shiva as guru',paragraphs:[
        'Dakshinamurti embodies the claim that the supreme teacher is ultimately the consciousness in which teaching is understood.',
        'The guru image therefore joins devotion to epistemology: knowledge is divine because its final source is the Lord present as awareness.'
      ]},
      {title:'Mantra and visualization',paragraphs:[
        'The text provides mantras and a contemplative form of Dakshinamurti. Iconographic details are used as meditation supports rather than as mere artistic description.',
        'The form organizes attention until the practitioner understands the divine teacher as the reality of the self.'
      ]},
      {title:'Silence and knowledge',paragraphs:[
        'Dakshinamurti is famous as the teacher who can instruct through silence. The Upanishadic logic is that words remove misunderstanding but do not manufacture Brahman.',
        'Silence therefore symbolizes the point at which conceptual instruction has fulfilled its purpose and direct knowledge remains.'
      ]},
      {title:'Reception',paragraphs:[
        'The Upanishad belongs to the wide South Indian and Advaita reception of Dakshinamurti as guru of gurus.',
        'It should be read alongside Shaiva Agama and Vedanta traditions without assuming that every later Dakshinamurti hymn derives directly from this small text.'
      ]}
    ],sources:merge(D['Upaniṣad:Dakṣiṇāmūrti']?.sources,shCommon)
  });

  put('Rudrahṛdaya',{
    sanskritTitle:'रुद्रहृदयोपनिषद्',language:'Sanskrit',period:'c. 800–1400 CE',extent:'Short Shaiva-Vedanta Upanishad emphasizing divine non-difference',
    leadParagraphs:[
      'The Rudrahridaya Upanishad, the “heart of Rudra,” is remarkable for refusing a simple Shiva-versus-Vishnu theology. Rudra, Vishnu, Brahma, Uma and other divine forms are interpreted as manifestations of one supreme spiritual reality.',
      'Its Shaiva classification therefore coexists with an explicit theology of non-difference. The text is especially useful for understanding Hindu sectarian literature that affirms a chosen divine language without making ultimate reality plural.'
    ],articleSections:[
      {title:'Date and textual character',paragraphs:[
        'The received work is medieval, broadly c. 800–1400 CE. It belongs to the later Shaiva minor-Upanishad corpus.',
        'Its title “heart of Rudra” signals essence rather than anatomy: the teaching seeks the reality expressed through Rudra-language.'
      ]},
      {title:'Rudra and Vishnu',paragraphs:[
        'The text explicitly coordinates Rudra and Vishnu instead of turning their names into metaphysical rivals.',
        'This non-difference can support several theological readings: one supreme Lord known through multiple names, or a nondual Brahman in which deity distinction is ultimately overcome.'
      ]},
      {title:'Uma and divine power',paragraphs:[
        'The divine feminine is not absent from the synthesis. Uma appears in relation to Rudra and the power through which the supreme becomes manifest.',
        'The text thereby resists reducing divine unity to a merely masculine triad.'
      ]},
      {title:'Atman and Brahman',paragraphs:[
        'The doctrinal culmination is interior. The same reality expressed through the gods is the deepest self, so sectarian reconciliation is grounded in Upanishadic self-knowledge.',
        'The work therefore unites theology and Vedanta rather than treating tolerance as an external social slogan.'
      ]},
      {title:'Reception',paragraphs:[
        'Rudrahridaya became useful in traditions emphasizing Shiva-Vishnu harmony and in modern discussions of sectarian non-difference.',
        'Its own wording should be distinguished from later Harihara theology even where the religious impulse is similar.'
      ]}
    ],sources:merge(D['Upaniṣad:Rudrahṛdaya']?.sources,shCommon)
  });

  put('Pañcabrahma',{
    sanskritTitle:'पञ्चब्रह्मोपनिषद्',language:'Sanskrit',period:'c. 600–1000 CE',extent:'Shaiva Upanishad organized around the five Brahman/faces of Shiva',
    leadParagraphs:[
      'The Panchabrahma Upanishad organizes Shaiva theology around five forms or faces of Shiva: Sadyojata, Vamadeva, Aghora, Tatpurusha and Ishana. These are not merely five statues; they provide a map connecting divine manifestation, cosmic functions, elements and the supreme beyond differentiated form.',
      'The work became important because the fivefold Shiva system is central to later Shaiva mantra, temple and Agamic theology.'
    ],articleSections:[
      {title:'Date and fivefold Shaiva theology',paragraphs:[
        'A broad c. 600–1000 CE range suits the received text and its relation to developed fivefold Shaiva mantra theology.',
        'The work should be read alongside, but not collapsed into, Agamic Panchabrahma systems. The Upanishad is one scriptural witness among several.'
      ]},
      {title:'Sadyojata and Vamadeva',paragraphs:[
        'Sadyojata and Vamadeva express distinct aspects of Shiva’s manifestation and cosmic function. Their mantras and correspondences make divine plurality part of one supreme identity.',
        'The text’s method is classificatory: each face receives a theological place without becoming an independent ultimate.'
      ]},
      {title:'Aghora and Tatpurusha',paragraphs:[
        'Aghora transforms the fearful Rudra dimension into a sacred form of the Lord, while Tatpurusha gives another orientation of the same supreme reality.',
        'Together the forms organize directions, elements and powers into a mandala of Shiva.'
      ]},
      {title:'Ishana and the supreme',paragraphs:[
        'Ishana is associated with the transcendent and governing dimension. The fivefold system culminates in a unity that exceeds the differentiated faces.',
        'The theology therefore moves from multiplicity to one Shiva rather than multiplying independent gods.'
      ]},
      {title:'Agamic and liturgical reception',paragraphs:[
        'The five Brahman mantras became fundamental in Shaiva ritual, consecration and iconography. Panchabrahma Upanishad supplies a shruti-style exposition of the same sacred pattern.',
        'Its influence is best understood through the larger Shaiva ritual world rather than isolated as an abstract philosophical curiosity.'
      ]}
    ],sources:merge(D['Upaniṣad:Pañcabrahma']?.sources,shCommon)
  });

  put('Atharvaśiras',{
    sanskritTitle:'अथर्वशिर उपनिषद्',language:'Sanskrit',period:'1st millennium BCE; broadly c. 500 BCE–300 CE with layered transmission',extent:'7 chapters in a common recension',
    leadParagraphs:[
      'The Atharvashiras Upanishad is one of the earliest explicitly Rudra-centred minor Upanishads. Across seven chapters it identifies Rudra with all gods, all beings, Om, Atman and Brahman, making divine supremacy an Upanishadic statement about the innermost reality of everything visible and invisible.',
      'Its language is important for the transition from Vedic Rudra to developed Shaiva theology. The text is not yet a medieval Purana or Agama, but it already gives Rudra a comprehensive metaphysical identity.'
    ],articleSections:[
      {title:'Date, Atharvaveda and seven chapters',paragraphs:[
        'The work belongs broadly to the first millennium BCE, perhaps with layers continuing into the early Common Era. It is attached to the Atharvaveda.',
        'Seven chapters organize the received teaching. Its relative antiquity distinguishes it from many medieval Shaiva Upanishads of ritual marks and sectarian mantra.'
      ]},
      {title:'All gods are Rudra',paragraphs:[
        'The Upanishad makes an expansive identification: Rudra is Brahma, Vishnu, Indra and the divine powers rather than merely one member of a pantheon.',
        'The point is metaphysical unity. Divine names are gathered into the one principle that exists through all forms.'
      ]},
      {title:'Rudra as Atman and Brahman',paragraphs:[
        'The same theological movement is internalized. Rudra is the self in the heart and the supreme Brahman, not only the cosmic ruler.',
        'Knowledge of Rudra therefore becomes self-knowledge. The Shaiva declaration is simultaneously a Vedantic one.'
      ]},
      {title:'Om and Pashupata language',paragraphs:[
        'Om is identified with Rudra and functions as the sonic form through which the supreme can be meditated upon.',
        'The text also preserves Pashupata-oriented language that becomes increasingly important in early Shaiva ascetic theology.'
      ]},
      {title:'Reception',paragraphs:[
        'Atharvashiras became a major early shruti witness for Shaiva claims about Rudra’s supremacy and universality.',
        'Its relatively early chronology makes it especially significant when distinguishing the development of Shaivism from much later sectarian literature.'
      ]}
    ],sources:merge(D['Upaniṣad:Atharvaśiras']?.sources,[W('Atharvashiras Upanishad','https://en.wikipedia.org/wiki/Atharvashiras_Upanishad','Seven chapters, first-millennium-BCE chronology and Rudra monism.'),...shCommon])
  });

  put('Atharvaśikhā',{
    sanskritTitle:'अथर्वशिखोपनिषद्',language:'Sanskrit',period:'c. 300 BCE–500 CE',extent:'Short early Shaiva Upanishad centred on Om and Rudra',
    leadParagraphs:[
      'The Atharvashikha Upanishad is an early Shaiva text in which Om is analysed through Vedic and Rudra theology. The syllable becomes a complete sacred body through which the practitioner approaches the supreme Lord.',
      'Like Atharvashiras, it belongs to the stage where Vedic Rudra is being interpreted as the all-encompassing reality of Upanishadic meditation.'
    ],articleSections:[
      {title:'Date and Atharvan setting',paragraphs:[
        'A broad c. 300 BCE–500 CE range reflects its early Shaiva vocabulary while allowing for layered transmission.',
        'The work is associated with the Atharvaveda and is often grouped with Atharvashiras, Kaivalya and Kalagnirudra in discussions of early Shaiva Upanishads.'
      ]},
      {title:'Om and its measures',paragraphs:[
        'The text analyses Om through its components and correspondences. Sound becomes a structured revelation rather than a single undifferentiated utterance.',
        'The measures of Om are related to deities and cosmic powers, drawing older Vedic phonology into a Shaiva contemplative framework.'
      ]},
      {title:'Rudra as the meaning of Om',paragraphs:[
        'Rudra is presented as the supreme significance toward which the syllable points. The mantra and deity are therefore not separate objects.',
        'Meditation on Om becomes meditation on Rudra as the reality underlying the worlds and the self.'
      ]},
      {title:'Knowledge and liberation',paragraphs:[
        'Correct recitation is joined to understanding. The goal is not merely sonic merit but knowledge of the principle represented in the mantra.',
        'This is the Upanishadic movement inside the text: ritual sound is interiorized as brahma-vidya.'
      ]},
      {title:'Historical importance',paragraphs:[
        'Atharvashikha shows how early Shaiva theology could emerge through reinterpretation of one of the most central Vedic sounds rather than through narrative mythology.',
        'Its study is therefore important for both the history of Om meditation and the development of Rudra-Shiva as supreme.'
      ]}
    ],sources:merge(D['Upaniṣad:Atharvaśikhā']?.sources,shCommon)
  });

  put('Bṛhajjābāla',{
    sanskritTitle:'बृहज्जाबालोपनिषद्',language:'Sanskrit',period:'c. 900–1400 CE',extent:'Large Shaiva ritual Upanishad on bhasma, sacred places and sectarian observance',
    leadParagraphs:[
      'The Brihajjabala Upanishad is a much larger Shaiva ritual text than the short Jabali or Kalagnirudra. Sacred ash, its preparation and application, holy places and Shaiva observance are treated at enough length to form a small ritual compendium.',
      'Its importance lies in detail. Practices that appear as a few verses in other Shaiva Upanishads are expanded into a broader account of religious life.'
    ],articleSections:[
      {title:'Date and textual identity',paragraphs:[
        'The received text is medieval, broadly c. 900–1400 CE. The adjective brihat, “great” or “large,” distinguishes it from shorter Jabala-related titles.',
        'Title resemblance alone is not enough to merge Jabali, Brihajjabala and the Sannyasa Jabala; they are distinct works.'
      ]},
      {title:'Sacred ash',paragraphs:[
        'Bhasma is the central ritual substance. The text explains its consecration, use and religious power in much greater detail than the shorter ash Upanishads.',
        'Ash binds the practitioner to Shiva through a symbol of dissolution, purity and the transcendence of perishable form.'
      ]},
      {title:'Tripundra and bodily observance',paragraphs:[
        'The body is marked through lines and mantra so that Shaiva identity is enacted rather than merely believed.',
        'The work coordinates external practice with sacred utterance, showing the ritual density of medieval Shaiva life.'
      ]},
      {title:'Sacred geography',paragraphs:[
        'The text also links Shaiva practice with holy places and particular religious spaces. Geography becomes part of the ritual field in which the body, ash and pilgrimage intersect.',
        'This broader scope distinguishes Brihajjabala from a simple manual for forehead marking.'
      ]},
      {title:'Reception',paragraphs:[
        'The Upanishad sits alongside Purana and Agama literature as a shruti-style source for ash practice and Shaiva sacred identity.',
        'Its detailed prescriptions are historically valuable precisely because they belong to a mature medieval ritual environment.'
      ]}
    ],sources:merge(D['Upaniṣad:Bṛhajjābāla']?.sources,shCommon)
  });

  put('Śarabha',{
    sanskritTitle:'शरभोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short sectarian Shaiva Upanishad centred on Sharabha',
    leadParagraphs:[
      'The Sharabha Upanishad belongs to a strongly sectarian phase of Shaiva literature. Shiva appears as Sharabha, the extraordinary form used in Shaiva traditions to express a power surpassing the fierce Nrisimha form of Vishnu.',
      'The text should be read as theology rather than as a neutral account of all Hindu traditions. Its value lies in showing how sectarian supremacy claims could be given Upanishadic authority.'
    ],articleSections:[
      {title:'Date and sectarian setting',paragraphs:[
        'The received work is medieval, broadly c. 1200–1600 CE. Its Sharabha-Nrisimha polemic belongs to an environment of developed Shaiva and Vaishnava sectarian mythology.',
        'That late setting is essential for historical interpretation; the text should not be projected into the age of the earliest Upanishads.'
      ]},
      {title:'The Sharabha form',paragraphs:[
        'Sharabha is a powerful composite form of Shiva. In this Upanishad the form embodies the Lord’s supremacy over even the most terrifying cosmic powers.',
        'The visual mythology serves a theological argument about which divine form represents the highest reality.'
      ]},
      {title:'Nrisimha and sectarian narrative',paragraphs:[
        'The treatment of Nrisimha differs sharply from Vaishnava scriptures. Rather than harmonizing the traditions, the text participates in a Shaiva supremacy narrative.',
        'A scholarly Hindu article should state this plainly while also distinguishing the text’s sectarian claim from the doctrines of Vaishnava communities that reject the narrative.'
      ]},
      {title:'Shiva as supreme',paragraphs:[
        'The mythic conflict culminates in an Upanishadic claim: Shiva is the supreme reality beyond the competing forms.',
        'This move transforms sectarian myth into brahma-vidya by interpreting divine victory as revelation of ultimate identity.'
      ]},
      {title:'Reception and controversy',paragraphs:[
        'Sharabha traditions appear in Shaiva Purana and iconography as well as this Upanishad. Vaishnava traditions preserve very different accounts of Nrisimha’s supremacy.',
        'The page should therefore present the work as a particular Shaiva scripture, not as a universally agreed inter-sectarian narrative.'
      ]}
    ],sources:merge(D['Upaniṣad:Śarabha']?.sources,shCommon)
  });

  put('Bhasmajābāla',{
    sanskritTitle:'भस्मजाबालोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Shaiva ritual Upanishad on ash, tripundra and Shiva worship',
    leadParagraphs:[
      'The Bhasmajabala Upanishad is a late Shaiva scripture devoted to sacred ash. It describes preparation, consecration and application of bhasma and joins these acts to mantra, tripundra and worship of Shiva.',
      'Its level of ritual detail makes it a useful counterpart to Kalagnirudra and Brihajjabala. The three works overlap in subject but should not be treated as one interchangeable ash text.'
    ],articleSections:[
      {title:'Date and relationship to Jabala texts',paragraphs:[
        'The work is late medieval, broadly c. 1200–1600 CE. Its title signals a Jabala-related scriptural lineage but the received text has its own ritual contents.',
        'The exact order of dependence among the ash Upanishads is a textual question; shared prescriptions do not prove identical authorship.'
      ]},
      {title:'Making and consecrating bhasma',paragraphs:[
        'Ash becomes sacred through a ritual process involving fire and mantra. The material transformation is matched by a verbal consecration.',
        'The practice embodies a theology of purification and dissolution associated with Shiva.'
      ]},
      {title:'Tripundra',paragraphs:[
        'The three horizontal lines are applied according to prescribed forms and sacred utterances.',
        'Their visible simplicity hides a complex network of correspondences that connect body, mantra and divine power.'
      ]},
      {title:'Shiva worship',paragraphs:[
        'Bhasma is integrated into a wider devotional life rather than isolated as a magical substance.',
        'The practitioner remembers Shiva through wearing, recitation and worship, making sectarian identity a continuous ritual discipline.'
      ]},
      {title:'Reception',paragraphs:[
        'Bhasmajabala helped authorize ash practice as Upanishadic while later Shaiva traditions elaborated the same themes through Agama and Purana.',
        'Popular summaries should therefore cite the specific source when attributing a rule about ash or tripundra.'
      ]}
    ],sources:merge(D['Upaniṣad:Bhasmajābāla']?.sources,shCommon)
  });

  put('Gaṇapati',{
    sanskritTitle:'गणपत्यथर्वशीर्षोपनिषद्',traditionalAuthor:'Ganapati Atharvashirsha tradition',language:'Sanskrit',period:'c. 1000–1500 CE for the received form',extent:'Short Ganapatya Upanishad/mantra text, widely recited as Ganapati Atharvashirsha',
    leadParagraphs:[
      'The Ganapati Upanishad, widely known as the Ganapati Atharvashirsha, is one of the most living minor Upanishads in contemporary Hindu practice. Ganapati is addressed not merely as remover of obstacles but as the visible form of Brahman, the Self and the totality of the elements and worlds.',
      'The text combines praise, identity-statements, mantra analysis and the famous Ganapati Gayatri. Its importance is therefore devotional, liturgical and Vedantic at once.'
    ],articleSections:[
      {title:'Date, Atharvashirsha title and transmission',paragraphs:[
        'The received form is medieval, broadly c. 1000–1500 CE. It is associated with the Atharvaveda and circulated widely as an independent recitation text.',
        'The title Atharvashirsha links it to an Atharvan “head” or essence tradition; modern editions may call it Ganapati Upanishad or Ganapati Atharvashirsha.'
      ]},
      {title:'Ganapati as Brahman',paragraphs:[
        'The opening identifies Ganapati with direct reality, consciousness and bliss and extends that identity through the gods and elements.',
        'This is the core Upanishadic move: the familiar deity of worship is affirmed as the supreme reality rather than as a local divine specialist.'
      ]},
      {title:'The Ganapati mantra',paragraphs:[
        'The seed and name of Ganapati are analysed through sound. The mantra becomes a compressed divine body whose syllables can be contemplated as well as recited.',
        'The text’s phonetic attention connects it to the wider mantra-Upanishad world.'
      ]},
      {title:'Ganapati Gayatri and worship',paragraphs:[
        'The scripture includes the celebrated Ganapati Gayatri and praise of the elephant-faced Lord. These verses became central to recitation and ritual far beyond scholarly study of the 108 Upanishads.',
        'The living liturgical reception is one reason the text remains far more visible than many other minor Upanishads.'
      ]},
      {title:'Reception',paragraphs:[
        'Ganapati Atharvashirsha is recited in temples, homes and Ganapatya practice across India. Commentarial and vernacular traditions have further expanded its theology.',
        'Its late date does not diminish its status in living Hindu worship; chronology and religious authority answer different questions.'
      ]}
    ],sources:merge(D['Upaniṣad:Gaṇapati']?.sources,[W('Ganapati Atharvashirsa','https://en.wikipedia.org/wiki/Ganapati_Atharvasirsa','Text, mantra, Ganapati as Brahman and living reception.'),...shCommon,'Ganapati Atharvashirsha Sanskrit editions'])
  });

  put('Tripurā',{
    sanskritTitle:'त्रिपुरोपनिषद्',language:'Sanskrit',period:'c. 1200–1500 CE',extent:'Short Srividya Shakta Upanishad centred on Tripura/Tripurasundari',
    leadParagraphs:[
      'The Tripura Upanishad is a medieval Srividya scripture in which the Goddess of the three cities is interpreted as the supreme power behind consciousness, mantra and the universe. Its short verses condense the symbolic world that later Srividya ritual expresses through mantra and Srichakra.',
      'The text is a sister in religious environment to Tripuratapini and Bhavana, but each work has its own structure and should not be merged into one generic “Tripura Upanishad.”'
    ],articleSections:[
      {title:'Date and Srividya setting',paragraphs:[
        'The received text belongs broadly to the twelfth–fifteenth centuries CE, the period in which several Shakta Upanishads crystallized.',
        'It reflects a mature Srividya world where mantra, Goddess theology and Vedanta already interact.'
      ]},
      {title:'Tripura — the Goddess of three',paragraphs:[
        'The “three” of Tripura can be interpreted through multiple triads—worlds, states, powers and levels of manifestation. The Goddess is not confined to any one triad; she is the consciousness through which they become meaningful.',
        'This allows sectarian devotion to carry a nondual metaphysical claim.'
      ]},
      {title:'Mantra and sacred power',paragraphs:[
        'The text belongs to a mantric environment in which syllables are forms of Shakti. Recitation and contemplation disclose the Goddess through sound.',
        'The mantra is not a verbal description of Tripura but one of the modes in which her power is ritually present.'
      ]},
      {title:'Shiva, Shakti and nonduality',paragraphs:[
        'The Goddess is not presented as a secondary energy possessed by an independent Shiva. Shiva and Shakti are interpreted as inseparable aspects of the supreme reality.',
        'This principle becomes more elaborate in Tripuratapini and later Srividya commentaries.'
      ]},
      {title:'Commentary and reception',paragraphs:[
        'Tripura received later Srividya commentary, including attention from Bhaskararaya’s intellectual world.',
        'Its importance lies in placing mature Goddess mantra theology within the prestige of the Upanishadic canon.'
      ]}
    ],sources:merge(D['Upaniṣad:Tripurā']?.sources,skCommon)
  });

  put('Saubhāgyalakṣmī',{
    sanskritTitle:'सौभाग्यलक्ष्म्युपनिषद्',language:'Sanskrit',period:'c. 1200–1500 CE',extent:'3 chapters; Lakshmi worship followed by tantric-yogic teaching including nine chakras',
    leadParagraphs:[
      'The Saubhagyalakshmi Upanishad begins with Sri-Lakshmi, prosperity and auspiciousness, but quickly makes clear that true wealth cannot be reduced to material possession. Across three chapters, Goddess worship opens into yoga, inner discipline and a nine-chakra subtle-body system.',
      'The work is therefore a Shakta synthesis rather than a prosperity charm. Lakshmi becomes the sacred frame for moving from external fortune toward inner abundance and liberation.'
    ],articleSections:[
      {title:'Date, Rigveda affiliation and three chapters',paragraphs:[
        'The received work is medieval, broadly c. 1200–1500 CE. Muktika associates it with the Rigveda and lists it among the Shakta Upanishads.',
        'Three chapters organize a striking transition from Sri worship to yogic interiorization.'
      ]},
      {title:'Chapter 1 — Sri and true prosperity',paragraphs:[
        'The opening praises Lakshmi as fortune, fertility, beauty and sacred abundance. Hymnic and yantric forms organize worship of the Goddess.',
        'The text gradually redirects the idea of prosperity: external wealth is unstable unless joined to spiritual knowledge and disciplined life.'
      ]},
      {title:'Chapter 2 — yoga and inward wealth',paragraphs:[
        'The second chapter turns toward yogic practice. The shift is deliberate: the auspicious Goddess is now sought through inward discipline rather than only external petition.',
        'The practitioner is trained to understand prosperity as freedom from the compulsions that make possession spiritually impoverishing.'
      ]},
      {title:'Chapter 3 — nine chakras',paragraphs:[
        'The text presents a subtle-body system of nine chakras, a significant variation from later popular seven-chakra schemata.',
        'This is historically important: Hindu subtle-body systems were never perfectly uniform, and Saubhagyalakshmi preserves a specifically Shakta arrangement.'
      ]},
      {title:'Advaita and Shakta synthesis',paragraphs:[
        'Lakshmi is not left as a deity outside the practitioner. Goddess worship culminates in a Vedantic recognition of the supreme reality present as consciousness.',
        'The Upanishad therefore unites prosperity symbolism, Tantra and nondual teaching without collapsing one into the other.'
      ]}
    ],sources:merge(D['Upaniṣad:Saubhāgyalakṣmī']?.sources,[W('Saubhagyalakshmi Upanishad','https://en.wikipedia.org/wiki/Saubhagyalakshmi_Upanishad','Three chapters, Lakshmi, yoga and nine chakras.'),...skCommon])
  });

  put('Bahvṛca',{
    sanskritTitle:'बह्वृचोपनिषद्',language:'Sanskrit',period:'c. 1200–1500 CE',extent:'Very short Shakta Upanishad declaring Devi to be Brahman and the Self',
    leadParagraphs:[
      'The Bahvricha Upanishad is one of the most concentrated statements of Shakta nondualism. The Goddess is not one being inside creation: she is the source, substance and consciousness of the universe and the Self present in all beings.',
      'Its small size gives it unusual force. Almost every verse contributes directly to the same claim that Devi is Brahman.'
    ],articleSections:[
      {title:'Date and Rigvedic title',paragraphs:[
        'The received text is medieval, broadly c. 1200–1500 CE. The name Bahvricha associates it with the Rigvedic tradition in the later canon.',
        'The Vedic label expresses canonical affiliation rather than proof that the composition belongs to the age of Rigvedic hymns.'
      ]},
      {title:'Devi before creation',paragraphs:[
        'The Goddess is described as existing before differentiated creation and as the power from which the worlds arise.',
        'Creation is therefore not external to Devi; it is manifestation within the reality that she herself is.'
      ]},
      {title:'Devi as Atman',paragraphs:[
        'The supreme Goddess is also the inner self. This removes the gap between worshipper and worshipped at the highest level without making devotion meaningless at the level of practice.',
        'The text’s nondualism is explicitly Shakta: the absolute is named and praised as Goddess.'
      ]},
      {title:'The universe as Goddess',paragraphs:[
        'Divine, human and material forms are included within her manifestation. The world cannot therefore be divided into sacred Goddess and wholly non-divine remainder.',
        'The teaching supplies a theological basis for seeing embodiment and cosmos as Shakti.'
      ]},
      {title:'Reception',paragraphs:[
        'Bahvricha became important in Shakta Vedanta precisely because it gives a short shruti-style declaration of Devi as Brahman.',
        'Its concise form also makes it frequently quoted independently of the complete 108-Upanishad collection.'
      ]}
    ],sources:merge(D['Upaniṣad:Bahvṛca']?.sources,skCommon)
  });

  put('Sarasvatī-rahasya',{
    sanskritTitle:'सरस्वतीरहस्योपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Shakta-Vedanta Upanishad combining Sarasvati mantra, hymn and nondual interpretation',
    leadParagraphs:[
      'The Sarasvati-rahasya Upanishad, the “secret of Sarasvati,” presents the Goddess of speech and learning as the consciousness through which knowledge is possible. Hymn and mantra culminate in a Vedantic identification of Sarasvati with Brahman.',
      'The text is especially fitting for a Goddess of language: sacred speech becomes both the means by which reality is taught and a divine power whose source is beyond ordinary words.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received work is medieval, broadly c. 1200–1600 CE. Its combination of mantra, hymn and developed Advaita language places it in the later Shakta Upanishad corpus.',
        'It should be distinguished from ancient Vedic hymns to Sarasvati even where it deliberately draws upon their divine name.'
      ]},
      {title:'Sarasvati as Vak',paragraphs:[
        'Sarasvati is identified with sacred speech, the power through which knowledge becomes articulated.',
        'Vak is not merely verbal noise. It is the divine capacity by which meaning appears and scripture can reveal what ordinary speech cannot grasp by itself.'
      ]},
      {title:'Mantra and hymn',paragraphs:[
        'The Upanishad uses praise and mantra as contemplative instruments. The Goddess is approached through sound because sound belongs to her own sphere of power.',
        'Recitation is therefore both devotion and participation in the sacred principle of speech.'
      ]},
      {title:'Sarasvati as Brahman',paragraphs:[
        'The theological culmination identifies the Goddess with ultimate consciousness rather than restricting her to patronage of learning.',
        'Knowledge of Brahman is thus interpreted through the very deity who personifies knowledge.'
      ]},
      {title:'Reception',paragraphs:[
        'The text became useful in traditions that join Sarasvati worship to Vedanta, mantra and education.',
        'Its “secret” is not a hidden historical fact but the inward identity of speech, knowledge and the supreme reality.'
      ]}
    ],sources:merge(D['Upaniṣad:Sarasvatī-rahasya']?.sources,skCommon)
  });

  put('Sītā',{
    sanskritTitle:'सीतोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short Shakta/Vaishnava-crossing Upanishad identifying Sita with primordial Prakriti and Shakti',
    leadParagraphs:[
      'The Sita Upanishad takes the Sita of the Ramayana and interprets her as primordial Prakriti, the cosmic Shakti through whom manifestation occurs. She is not reduced to a supporting figure in Rama’s story; the text gives her an independent metaphysical identity.',
      'Its theology crosses modern category boundaries. Sita remains inseparable from Rama while also being described through the Shakta language of will, action and knowledge.'
    ],articleSections:[
      {title:'Date and sectarian setting',paragraphs:[
        'The received work is medieval, broadly c. 1200–1600 CE. Its developed Shakti and Prakriti theology belongs to the later sectarian Upanishad world.',
        'The text can be classified Shakta while remaining deeply embedded in Rama-Vaishnava sacred narrative.'
      ]},
      {title:'Sita as primordial Prakriti',paragraphs:[
        'Sita is identified with the power through which the universe takes form. Prakriti is not independent of the supreme Lord but his manifesting energy.',
        'The epic name thereby becomes a cosmological category without losing its devotional association.'
      ]},
      {title:'Iccha, kriya and jnana',paragraphs:[
        'The Goddess is analysed through the powers of will, action and knowledge. These three shaktis explain how intention, manifestation and consciousness belong to one divine reality.',
        'The triad became widely important in later Shakta and Shaiva theology.'
      ]},
      {title:'Sita and Rama',paragraphs:[
        'The relation of Sita and Rama is interpreted metaphysically as Shakti and the Lord rather than only as husband and wife within epic narrative.',
        'The text therefore gives theological depth to a relationship already sacred in Ramayana devotion.'
      ]},
      {title:'Reception',paragraphs:[
        'The Sita Upanishad is a relatively small text, but it is an important witness to the elevation of Sita as cosmic Goddess in Sanskrit theology.',
        'Its existence also warns against treating Shaiva, Shakta and Vaishnava labels as perfectly sealed literary worlds.'
      ]}
    ],sources:merge(D['Upaniṣad:Sītā']?.sources,skCommon)
  });

  put('Tripurātāpinī',{
    sanskritTitle:'त्रिपुरातापिन्युपनिषद्',language:'Sanskrit',period:'c. 12th–15th century CE',extent:'5 chapters; major Srividya Upanishad on Tripura, mantra, chakra and nondual Shakti',primaryRecensions:['Tripuratapini manuscript forms with structural and verse variation'],
    leadParagraphs:[
      'The Tripuratapini Upanishad is one of the major scriptures of Srividya. Across five chapters it treats Tripura or Tripurasundari as primordial Shakti, interprets mantra and sacred diagram, and ends in a nondual theology in which Shakti and Brahman cannot be separated.',
      'The work is not merely a tantric manual given an Upanishad title. Its distinctive project is to express Srividya mantra and yantra through the language of Upanishadic ultimacy.'
    ],articleSections:[
      {title:'Date, manuscripts and five chapters',paragraphs:[
        'The text is generally placed between the twelfth and fifteenth centuries CE. Manuscripts circulate under closely related title forms and can vary in structure and verse sequence.',
        'Five chapters form the common organization. Its late medieval chronology belongs to the great expansion of Srividya and Shakta Tantra.'
      ]},
      {title:'Tripura as primordial Shakti',paragraphs:[
        'Tripura is presented as the power prior to and within cosmic manifestation. The threefold symbolism of her name can encompass worlds, states and divine powers without limiting her to them.',
        'The Goddess therefore functions as both deity of worship and metaphysical principle.'
      ]},
      {title:'Panchadashi mantra',paragraphs:[
        'The text analyses the celebrated fifteen-syllabled Srividya mantra. Syllables become a theology of the Goddess rather than arbitrary ritual code.',
        'Mantra is a sonic body through which the practitioner approaches the unity of Shiva and Shakti.'
      ]},
      {title:'Sri Chakra and Kamakala',paragraphs:[
        'Yantric symbolism, including the chakra and kamakala, organizes the relation between divine powers, cosmos and the practitioner.',
        'The diagram is not simply an image to look at; it is a map of manifestation and return used in ritual and meditation.'
      ]},
      {title:'Nondual Shakti and reception',paragraphs:[
        'The final teaching identifies Shakti with the supreme Brahman and the deepest self. Shiva and Shakti are not ultimately two independent substances.',
        'Tripuratapini, Bhavana and Tripura became important in Srividya traditions and attracted later commentary, including the intellectual world of Bhaskararaya.'
      ]}
    ],sources:merge(D['Upaniṣad:Tripurātāpinī']?.sources,[W('Tripuratapini Upanishad','https://en.wikipedia.org/wiki/Tripuratapini_Upanishad','12th–15th century date, five chapters, Srividya, mantra and Shakta nondualism.'),...skCommon])
  });

  put('Devī',{
    sanskritTitle:'देव्युपनिषद्',language:'Sanskrit',period:'c. 1200–1500 CE',extent:'Short Shakta Upanishad in which Devi speaks as Brahman, Prakriti, Purusha and the whole cosmos',
    leadParagraphs:[
      'The Devi Upanishad is one of the clearest Shakta declarations of absolute Goddess theology. Devi speaks in the first person and identifies herself with Brahman, Prakriti and Purusha, knowledge and ignorance, the gods and the entire universe.',
      'The rhetorical form matters. The Goddess is not described from outside by a theologian; the scripture lets Devi herself declare the scope of her being.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received text is medieval, broadly c. 1200–1500 CE, and belongs to the Shakta Upanishad corpus associated with the Atharvaveda.',
        'Its language presupposes a mature Goddess theology while drawing on older Vedic forms of divine self-declaration.'
      ]},
      {title:'“I am Brahman” — the Goddess speaks',paragraphs:[
        'Devi identifies herself with the highest reality rather than with one limited cosmic function.',
        'This first-person voice gives the text an especially strong theological form: the Goddess is the subject who includes the categories by which philosophers ordinarily analyse reality.'
      ]},
      {title:'Prakriti, Purusha, knowledge and ignorance',paragraphs:[
        'The text holds together terms that other systems may distinguish sharply. Devi is both the power of manifestation and the consciousness through which manifestation is known.',
        'Even knowledge and ignorance are encompassed within her sovereignty, a radical way of expressing that no category stands outside the absolute.'
      ]},
      {title:'All gods as Goddess',paragraphs:[
        'The divine pantheon is included in Devi rather than placed beside her as a set of competing powers.',
        'The strategy parallels some Shaiva and Vaishnava Upanishads, but here the supreme language is unmistakably feminine.'
      ]},
      {title:'Shakta reception',paragraphs:[
        'Devi Upanishad became a major shruti-style witness for Shakta traditions affirming the Goddess as Brahman.',
        'Its short length and declarative force make it one of the most frequently cited of the eight Shakta Upanishads.'
      ]}
    ],sources:merge(D['Upaniṣad:Devī']?.sources,[W('Devi Upanishad','https://en.wikipedia.org/wiki/Devi_Upanishad','Goddess as Brahman and the totality of reality.'),...skCommon])
  });

  put('Bhāvanā',{
    sanskritTitle:'भावनोपनिषद्',language:'Sanskrit',period:'c. 12th–15th century CE; often placed near the 15th century',extent:'1 chapter, 37 verses in a common recension',
    leadParagraphs:[
      'The Bhavana Upanishad is a central Srividya text of internal worship. In thirty-seven verses it maps the human body and its faculties onto the Sri Chakra, teaching that the sacred diagram is not only an external ritual object but an inner structure of embodied consciousness.',
      'Its title, bhavana, points to contemplative visualization and inward realization. The whole text is an argument for antaryaga—the internal sacrifice in which practitioner, body, Goddess and chakra are understood together.'
    ],articleSections:[
      {title:'Date, one-chapter structure and Srividya setting',paragraphs:[
        'The work is medieval, broadly c. 1200–1500 CE and often placed near the fifteenth century. The common text has one chapter of thirty-seven verses.',
        'It is closely related in religious environment to Tripura and Tripuratapini and is associated with the Atharvaveda in later classification.'
      ]},
      {title:'The body as Sri Chakra',paragraphs:[
        'The Upanishad systematically maps bodily structures, faculties and powers onto the enclosures and deities of the Sri Chakra.',
        'This does not make the physical body a literal geometric diagram. The mapping is contemplative: the external yantra reveals a structure that worship must eventually discover within.'
      ]},
      {title:'Antaryaga — internal worship',paragraphs:[
        'External offerings are reinterpreted as processes of awareness. Worship becomes an inward sacrifice in which mental and bodily faculties are recognized as powers of the Goddess.',
        'The shift is not anti-ritual. It assumes the external Srividya ritual and then internalizes its meaning.'
      ]},
      {title:'Shakti as Atman',paragraphs:[
        'The text identifies the Goddess with the inner self and supreme reality. The practitioner’s deepest identity is therefore not outside the deity being worshipped.',
        'This provides the nondual ground for the body–chakra mapping: both body and yantra are manifestations within Shakti.'
      ]},
      {title:'Bhaskararaya and reception',paragraphs:[
        'Bhavana became especially important in South Indian Srividya and was commented upon by major later scholars, including Bhaskararaya’s tradition.',
        'Its thirty-seven verses continue to function as a compact scriptural statement of internal Sri Chakra worship.'
      ]}
    ],sources:merge(D['Upaniṣad:Bhāvanā']?.sources,[W('Bhavana Upanishad','https://en.wikipedia.org/wiki/Bhavana_Upanishad','One chapter, 37 verses, body as Sri Chakra, antaryaga and Shakta nondualism.'),...skCommon])
  });
})();