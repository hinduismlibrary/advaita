(() => {
  const R=window.SCRIPTURE_PRINCIPAL_RICH=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const href=file=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
  const baseRefs=(wiki)=>[
    {t:'Wikipedia',d:'Article survey, structure, manuscript history and bibliography.',u:wiki},
    {t:'Patrick Olivelle, The Early Upanishads',d:'Critical translation, textual notes and relative chronology.'},
    {t:'Paul Deussen, Sixty Upanishads of the Veda',d:'Translation and comparative discussion.'},
    {t:'Robert Ernest Hume, The Thirteen Principal Upanishads',d:'Translation, introduction and notes.'},
    {t:'S. Radhakrishnan, The Principal Upanishads',d:'Translation and philosophical notes.'},
    {t:'SanskritDocuments',d:'Sanskrit e-texts used to check mantra numbering and titles.',u:'https://sanskritdocuments.org/doc_upanishhat/'},
    {t:'Muktika Upanishad',d:'Traditional 108-name canon and Vedic associations.',u:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'}
  ];
  R['Śvetāśvatara']={
    title:'Shvetashvatara Upanishad',deva:'श्वेताश्वतरोपनिषद्',date:'c. 5th–3rd century BCE',type:'Mukhya Upanishad',veda:'Krishna Yajurveda',school:'Taittiriya / Shvetashvatara tradition',setting:'Yajurvedic verse Upanishad',structure:'6 chapters; 113 verses in common editions',muktika:'No. 14',commentators:'Shankara-attributed bhashya; later Shaiva and Vedanta traditions',famous:'Rudra, maya, yoga and devotion',
    image:{src:commons('Shvetashvatara Upanishad verse 1.1, Sanskrit, Devanagari script.jpg'),href:href('Shvetashvatara Upanishad verse 1.1, Sanskrit, Devanagari script.jpg'),cap:'Shvetashvatara Upanishad 1.1 with commentary in a nineteenth-century Devanagari manuscript. Wikimedia Commons.'},
    lead:[
      ['The Shvetashvatara Upanishad is one of the most distinctive principal Upanishads because it asks the old question of ultimate cause in a new theological and yogic vocabulary. Time, nature, necessity, chance, the elements and the individual soul are considered and rejected as sufficient explanations; the text increasingly speaks of one divine Lord whose power governs manifestation.',[1,2,4]],
      ['Its six chapters combine inherited Vedic verses with material on Rudra, Purusha, prakriti, maya, the individual self, grace and disciplined meditation. It is therefore a major bridge between early Upanishadic speculation and the more explicitly theistic worlds of later Shaiva and Vedantic theology.',[2,3,5]],
      ['The text should not be reduced either to “early Shaivism” or to a neutral metaphysical treatise. Its importance lies precisely in the way Rudra is elevated through Vedic language while older categories of Self, Brahman and cosmic causality are retained and reconfigured.',[2,3]]
    ],
    sections:[
      {t:'Date, authorship and textual character',ps:[
        ['Shvetashvatara is later than Brihadaranyaka and Chandogya and is commonly placed in the middle or later first millennium BCE. The text is metrical and shows a philosophical vocabulary in which inherited Vedic imagery, emerging theism and yoga can be discussed in the same literary frame.',[1,2]],
        ['The name is traditionally connected with a sage Shvetashvatara, who is mentioned at the end as transmitter of the teaching. Modern scholarship is cautious about treating that closing attribution as a simple statement of single authorship for every layer of the work.',[1,4]],
        ['Many verses have close parallels in earlier Vedic texts. The Upanishad’s originality therefore lies partly in arrangement: old Rudra, Savitar and Purusha language is gathered into a sustained account of one supreme cause and the knowledge by which bondage ends.',[2,3]]
      ]},
      {t:'Chapter 1 — what is the first cause?',ps:[
        ['The opening asks whether Brahman-knowers should regard time, inherent nature, necessity, chance, the elements, womb or the individual spirit as the source of the cosmos. None by itself explains the whole, because each is already conditioned or limited.',[2,4]],
        ['Through meditation the sages perceive the divine power hidden by its own qualities. This formulation allows the text to speak both of a supreme principle and of the structured natural world without treating nature as an independent ultimate.',[2,3]],
        ['The famous wheel imagery depicts embodied existence as a complex arrangement of spokes, rims, currents, qualities and paths. Rather than offering one literal diagram of the cosmos, the image emphasizes how the self becomes caught in a system of powers it mistakes for its own essence.',[3,4]]
      ]},
      {t:'Chapter 2 — an early yoga discipline',ps:[
        ['The second chapter begins with Vedic invocations to Savitar and then turns to practical meditation. The body is to be held steady, chest, neck and head aligned, senses restrained and mind collected. Breath is regulated and the place of practice should be clean and undisturbing.',[2,4]],
        ['The instructions are among the clearest witnesses to yogic discipline inside an Upanishad. They predate the fully systematized eight-limbed Yoga of later texts, so similarities are important but should not be turned into an assumption that the Yoga Sutra system already exists here in complete form.',[2,3]],
        ['Signs such as lightness, health and clarity are mentioned, but they are not the final goal. The practice exists to make subtle divine reality knowable, not to transform preliminary experiences into objects of display.',[3,5]]
      ]},
      {t:'Chapters 3–4 — Rudra, Purusha, prakriti and maya',subs:[
        {h:'Rudra as the one ruler',ps:[['Chapter 3 praises Rudra as the one who rules over all worlds and all beings. Language from older Vedic hymns is intensified so that the deity becomes a universal Lord with faces, hands and feet everywhere, closely approaching the cosmic Purusha.',[2,3]]]},
        {h:'The supreme beyond form',ps:[['The same text that gives the Lord cosmic presence also insists that the highest is beyond finite form and ordinary comparison. Personal divine language and apophatic language are therefore not alternatives here; they operate together.',[2,5]]]},
        {h:'The red-white-black unborn female',ps:[['Chapter 4 uses the image of an unborn female of red, white and black colours, often interpreted through the three qualities of manifest nature. The passage became important for later discussions of prakriti and its relation to the supreme Lord.',[3,4]]]},
        {h:'Maya and mayin',ps:[['The famous maya language distinguishes the power of manifestation from the Lord who wields it. Later Vedanta schools interpret that relation differently, but Shvetashvatara is one of the early shruti texts in which the pair maya and mayin becomes theologically significant.',[2,5]]]}]},
      {t:'Chapters 5–6 — souls, Lord, grace and devotion',ps:[
        ['The final chapters examine embodied selves, ignorance, karma and the one divine ruler. Individuality is real enough to ground bondage and rebirth, yet the soul is not independent of the Lord who knows and sustains the whole.',[2,3]],
        ['The sixth chapter explicitly rejects time and impersonal nature as sufficient final causes and returns to the supreme Lord. Knowledge is not portrayed as a purely self-generated intellectual achievement; divine favour and disclosure are part of the religious vocabulary of liberation.',[3,5]],
        ['The closing verse famously says that the teachings become luminous for one who has supreme devotion to God and the same devotion toward the teacher. This is one of the clearest devotional conclusions in the principal Upanishads.',[2,5]]
      ]},
      {t:'Shaiva and Vedantic reception',ps:[
        ['Shaiva traditions cite Shvetashvatara as a major shruti witness because Rudra is praised in language of universal supremacy. At the same time, Vedanta schools read the text as part of the common Upanishadic canon and interpret its Rudra, Ishvara, maya and selves according to their own metaphysical commitments.',[3,5]],
        ['The bhashya transmitted under Shankara’s name has been debated by modern scholars, and the text has generated an unusually wide reception in histories of Shaivism, Yoga and Vedanta. Its historical value comes from occupying the intersection of all three rather than fitting neatly into only one later category.',[1,2]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Shvetashvatara_Upanishad')
  };

  R['Īśāvāsya']={
    title:'Isha Upanishad',deva:'ईशावास्योपनिषद्',date:'Early first millennium BCE',type:'Mukhya Upanishad',veda:'Shukla Yajurveda',school:'Vajasaneyi — Madhyandina / Kanva',setting:'Vajasaneyi Samhita, chapter 40',structure:'18 mantras in common Madhyandina recension',muktika:'No. 1',commentators:'Shankara, Madhva, Uvata and later Vedanta traditions',famous:'Ishavasyam idam sarvam',
    image:{src:commons('MS Indic 37, Isa upanisad. Wellcome L0027330.jpg'),href:href('MS Indic 37, Isa upanisad. Wellcome L0027330.jpg'),cap:'Isha Upanishad, folio 1r, Wellcome MS Indic 37. Wikimedia Commons / Wellcome Collection.'},
    lead:[
      ['The Isha or Ishavasya Upanishad is the shortest principal Upanishad after Mandukya and one of the most densely contested. It is transmitted not in an Aranyaka but as the fortieth and final chapter of the Shukla Yajurveda Vajasaneyi Samhita, giving it an unusually direct place inside a Vedic Samhita.',[1,2,4]],
      ['Its opening asks the reader to see the whole moving world as enveloped or inhabited by the Lord and immediately links that vision with renunciation, enjoyment and non-covetousness. Later verses then juxtapose action and a hundred-year life, knowledge and ignorance, becoming and non-becoming, and the path toward the sun and truth.',[3,5]],
      ['Because the poem is so compressed, traditions disagree not merely over isolated words but over the architecture of the whole. Is it teaching renunciation, action, a synthesis of both, graded worship, nondual knowledge, devotion to the supreme Lord, or several levels at once? The history of Isha interpretation is largely the history of those questions.',[2,3]]
    ],
    sections:[
      {t:'Text, recensions and position in the Veda',ps:[
        ['The Isha is chapter 40 of the Vajasaneyi Samhita. This is unusual among principal Upanishads, which are more often attached to Brahmana or Aranyaka layers. Its Samhita location helped give the text exceptional liturgical and canonical prestige.',[1,4]],
        ['Madhyandina and Kanva recensions preserve the work with differences in reading and sequence. The familiar eighteen-mantra form is the Madhyandina arrangement; Kanva transmission must be consulted when exact wording or order matters.',[1,3]],
        ['The title comes from the opening word ishavasyam. “Isha” itself is therefore not originally an author’s name but a conventional title formed from the poem’s first and most memorable expression.',[2,4]]
      ]},
      {t:'Mantras 1–2 — indwelling, renunciation and action',ps:[
        ['The first mantra declares that all this—whatever moves in the moving world—is to be covered, inhabited or pervaded by Isha. The famous ambiguity of the verb has generated translations ranging from “clothed by the Lord” to “pervaded by the Self.”',[2,3]],
        ['The same verse says one should enjoy or protect through renunciation and not covet another’s wealth. The conjunction of renunciation and enjoyment is deliberate: the text refuses to define fulfilment as possession of objects independently of the whole to which they belong.',[3,5]],
        ['The second mantra speaks of living a hundred years while performing action. Shankara interprets this primarily for a person not yet qualified for renunciatory knowledge, whereas other traditions see a more positive integration of action and God-centred life.',[3,5]]
      ]},
      {t:'Mantras 3–8 — Self, movement and unity',ps:[
        ['Those who destroy or ignore the Self are associated with dark worlds. The poem then describes the ultimate as unmoving yet swifter than mind, far yet near, within all and outside all. The contradictions are a method: ordinary spatial categories cannot contain the reality being described.',[2,4]],
        ['The ethical consequence appears in the verses on seeing all beings in the Self and the Self in all beings. Such vision removes hatred and delusion because the apparent other is no longer absolutely separate from the knower.',[2,5]],
        ['The eighth mantra describes the supreme as luminous, bodiless, without wound or sinews, pure and untouched by evil, a seer and thinker who orders things through all time. Different Vedanta schools debate whether these are negations of material limitation, positive divine attributes, or both.',[3,5]]
      ]},
      {t:'Mantras 9–14 — vidya, avidya, sambhuti and asambhuti',ps:[
        ['The most difficult middle portion pairs vidya with avidya and sambhuti with asambhuti or vinasha. Each member of the pair, pursued alone, is associated with darkness; the text then says that knowing both together leads through death toward immortality.',[2,3]],
        ['The terms have been interpreted in many ways: ritual action and knowledge, worship and ordinary learning, knowledge of deities and knowledge of the Self, manifested and unmanifested reality. No responsible summary should pretend that one modern gloss resolves the entire commentarial history.',[2,5]],
        ['The literary strategy is more stable than the disputed terminology. Isha repeatedly warns against one-sidedness: a partial attainment can be mistaken for the whole, and a finite object of knowledge can become another form of darkness when absolutized.',[3,4]]
      ]},
      {t:'Mantras 15–18 — the sun, truth and the final prayer',ps:[
        ['The final verses shift into prayer. The face of truth is said to be hidden by a golden vessel, and the solar deity is asked to remove the covering so that the seeker may behold the form of truth.',[2,4]],
        ['The speaker then identifies the person in the sun with the deepest self in language whose precise metaphysical force is interpreted differently by Vedanta schools. The poem closes with remembrance, fire, the right path and release from crooked evil.',[3,5]],
        ['This ending is one reason Isha cannot be reduced to a purely abstract philosophy. Its ultimate knowledge remains embedded in Vedic prayer, solar symbolism and a lived relationship to divine guidance.',[2,3]]
      ]},
      {t:'Commentaries and competing interpretations',ps:[
        ['Shankara’s commentary is among the most influential readings and sharply distinguishes the path of knowledge from ritual action at the highest level. Madhva and later theistic commentators reject the Advaita conclusion and read the Lord and individual self as genuinely distinct.',[5]],
        ['Modern interpreters from traditional acharyas to reformers and philosophers have repeatedly used Isha to argue for radically different relations between worldly action and spiritual realization. Its eighteen verses are therefore a useful lesson in how little textual length has to do with interpretive simplicity.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Isha_Upanishad')
  };

  R['Bṛhadāraṇyaka']={
    title:'Brihadaranyaka Upanishad',deva:'बृहदारण्यकोपनिषद्',date:'c. 7th–6th century BCE',type:'Mukhya Upanishad',veda:'Shukla Yajurveda',school:'Madhyandina and Kanva',setting:'Shatapatha Brahmana',structure:'6 adhyayas; two major recensions',muktika:'No. 10',commentators:'Shankara, Madhva, Rangaramanuja; Sureshvara',famous:'Aham brahmasmi; neti neti; antaryamin',
    image:{src:commons('Brihadaranyaka upanishad adhyaya 1 folio 3b, pages 1r 1v 2r 2v, Schoenberg Center manuscript, Penn Library.jpg'),href:href('Brihadaranyaka upanishad adhyaya 1 folio 3b, pages 1r 1v 2r 2v, Schoenberg Center manuscript, Penn Library.jpg'),cap:'Brihadaranyaka Upanishad manuscript folios, Schoenberg Center, Penn Libraries. Wikimedia Commons.'},
    lead:[
      ['The Brihadaranyaka Upanishad is among the oldest, largest and most influential Upanishads. Embedded in the Shatapatha Brahmana of the Shukla Yajurveda, it preserves ritual reinterpretation, creation myths, debates at royal courts, teachings on sleep and death, the inner controller, karma and rebirth, and some of the most famous formulations of Self and Brahman in Indian philosophy.',[1,2,4]],
      ['Its literary centre of gravity is the sage Yajnavalkya, who appears in debates with priests, King Janaka, Gargi and Maitreyi. Yet the text is not one continuous biography or treatise. It is a layered collection whose older and newer materials were assembled within two major recensional traditions, Madhyandina and Kanva.',[2,3]],
      ['Later Vedanta returned to Brihadaranyaka again and again because the text does not merely state conclusions. It stages the process by which ritual knowledge is questioned, public debate becomes inward inquiry, and ordinary notions of self are stripped away through formulas such as neti neti—“not this, not this.”',[3,5]]
    ],
    sections:[
      {t:'Textual history and the two recensions',ps:[
        ['The Upanishad belongs to the Shatapatha Brahmana and survives principally in Madhyandina and Kanva recensions. The broad six-chapter structure is shared, but wording, sequence and smaller divisions differ. Exact citations therefore need a recensional context.',[1,3]],
        ['The work is usually divided into three pairs: chapters 1–2, often called the Madhu section; chapters 3–4, centred on Yajnavalkya and sometimes called the Muni section; and chapters 5–6, a supplementary Khila section containing further meditations and ritual-philosophical material.',[2,4]],
        ['Because the text preserves several genres and repeated versions of related teachings, scholars generally treat it as layered rather than as a composition written at one moment by one author. Traditional memory of Yajnavalkya remains central without functioning as a modern authorship statement for every passage.',[2,3]]
      ]},
      {t:'Chapters 1–2 — from horse sacrifice to the Self',subs:[
        {h:'The cosmic horse',ps:[['The work opens by reinterpreting the ashvamedha horse cosmically: dawn is its head, the sun its eye, wind its breath, the year its body. Ritual is thus expanded into a map of the cosmos before the text gradually turns toward the knowing self.',[2,3]]]},
        {h:'Speech, breath and the senses',ps:[['A contest among bodily powers and a myth of gods and demons ask what survives corruption. Breath repeatedly appears as a sustaining principle, but the text will later press beyond even prana toward the Self that knows the powers.',[2,4]]]},
        {h:'Aham brahmasmi',ps:[['The famous “I am Brahman” occurs in a creation sequence where the primordial Self recognizes itself. Later Advaita made it a mahavakya; other Vedanta traditions deny that it erases the eternal difference or dependence of individual selves.',[3,5]]]},
        {h:'Yajnavalkya and Maitreyi',ps:[['When Yajnavalkya prepares to leave household life, Maitreyi asks whether wealth can make her immortal. He answers no and teaches that husband, wife, children, wealth and worlds are loved for the sake of the Self. The dialogue turns familiar relationships into an inquiry into the deepest ground of value.',[2,4]]]}]},
      {t:'Chapter 3 — the debate at Janaka’s court',subs:[
        {h:'A public philosophical contest',ps:[['King Janaka convenes learned Brahmins and offers a rich prize to the greatest knower of Brahman. Yajnavalkya simply orders the cows taken, provoking a sequence of challenges from rival scholars. The chapter thereby dramatizes knowledge as public, risky and contestable.',[2,4]]]},
        {h:'Gargi’s questions',ps:[['Gargi asks what the world is woven on, pushing Yajnavalkya through successive levels toward the imperishable. Her second challenge is so radical that it becomes one of the best-known philosophical exchanges in the Upanishads.',[2,3]]]},
        {h:'The inner controller',ps:[['The antaryamin teaching describes one who dwells within earth, water, fire, sky, gods, senses and self, whom those things do not know, whose body they are and who controls them from within. The passage became crucial for theistic Vedanta accounts of divine immanence.',[3,5]]]},
        {h:'What remains at death?',ps:[['Other questions examine the fate of speech, breath, mind and action at death. The text links karma and knowledge with post-mortem destiny, helping shape one of the earliest sustained Upanishadic accounts of moral causation across lives.',[2,4]]]}]},
      {t:'Chapter 4 — Janaka, consciousness and neti neti',ps:[
        ['The fourth chapter continues Yajnavalkya’s relation with King Janaka and contains some of the deepest discussions of waking, dream, deep sleep and the luminous Self. The person is not identified with any single state because the same subject passes through all three.',[2,3]],
        ['The “not this, not this” formula denies that Brahman can be exhaustively identified with any finite predicate or object. It is not simple nihilism: the same passages speak of the Self as imperishable, unattached and the ground of knowing.',[3,5]],
        ['Maitreyi reappears in a version of the teaching about why all things are dear for the sake of the Self. Repetition across chapters is evidence of transmission and editorial collection rather than needless redundancy.',[2,4]],
        ['The chapter also contains the compact analysis of desire, action and becoming: as a person desires, so is the will; as is the will, so is the action; and according to action a person becomes. Later Indian discussions of karma repeatedly draw on this sequence.',[2,3]]
      ]},
      {t:'Chapters 5–6 — meditations, ethics and rebirth',ps:[
        ['The fifth chapter collects shorter meditations on Brahman through heart, truth, mind and other supports. Among its most famous passages is the thunder teaching “da”: gods hear restraint, humans giving and demons compassion, each receiving from the same syllable the discipline they most need.',[2,4]],
        ['The sixth chapter returns to prana, lineage and the paths after death and includes a version of the five-fires teaching also preserved in Chandogya. The overlap reveals a shared late-Vedic teaching culture rather than dependence that can always be reduced to one simple direction.',[2,3]],
        ['Ritual and household material remains present even at the end. Brihadaranyaka does not narrate a clean historical replacement of ritual by philosophy; it shows philosophical reinterpretation occurring inside a world where ritual, family and Vedic lineage still matter.',[2,4]]
      ]},
      {t:'Commentaries and the formation of Vedanta',ps:[
        ['Shankara’s Brihadaranyaka Bhashya is one of the foundational works of Advaita, and Sureshvara’s Brihadaranyakavarttika expands its arguments on a vast scale. Madhva and Rangaramanuja traditions also comment on the text and challenge Advaita readings of identity-statements and negation.',[5]],
        ['Nearly every major Vedantic topic can be argued from Brihadaranyaka: the nature of the self, divine immanence, liberation, knowledge, karma, rebirth, desire, deep sleep and the relation between language and the absolute. Its influence comes from this breadth as much as from its famous slogans.',[3,5]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Brihadaranyaka_Upanishad')
  };

  R['Praśna']={
    title:'Prashna Upanishad',deva:'प्रश्नोपनिषद्',date:'Later first millennium BCE',type:'Mukhya Upanishad',veda:'Atharvaveda',school:'Pippalada tradition',setting:'Atharvavedic Upanishad',structure:'6 prashnas / questions',muktika:'No. 4',commentators:'Shankara, Madhva, Rangaramanuja',famous:'Six questions on prana, Om and Purusha',
    image:{src:commons('Prashna Upanishad sample manuscript page, Sanskrit, Devanagari script.jpg'),href:href('Prashna Upanishad sample manuscript page, Sanskrit, Devanagari script.jpg'),cap:'Prashna Upanishad manuscript page in Devanagari, nineteenth-century copy. Wikimedia Commons.'},
    lead:[
      ['The Prashna Upanishad turns philosophical inquiry into a carefully staged classroom. Six seekers approach the teacher Pippalada carrying fuel in their hands, but he does not answer them immediately. They must first live with him for a year in austerity, chastity and faith, after which each student is permitted one major question.',[1,2,4]],
      ['The six questions form a deliberate sequence: where living beings come from; how many powers sustain the body; where prana itself comes from; what happens in sleep and dream; what is attained through meditation on Om; and who is the Purusha with sixteen parts.',[3,4]],
      ['Compared with the sprawling anthological structure of Chandogya, Prashna is unusually compact and pedagogical. It gathers mature Upanishadic doctrines into a sequence whose organization is itself part of the teaching.',[2,3]]
    ],
    sections:[
      {t:'Teacher, students and literary structure',ps:[
        ['The Upanishad opens by naming six students from learned lineages. Their arrival with sacrificial fuel evokes the older Vedic gurukula, but the questions they ask are not technical ritual questions. Traditional educational form becomes the setting for inquiry into life and consciousness.',[2,4]],
        ['Pippalada’s demand for a year of discipline makes qualification part of knowledge. The student is not entitled to an answer simply by asking; intellectual inquiry is embedded in ethical and ascetic preparation.',[2,3]],
        ['Each prashna is a discrete unit, yet the order moves from cosmos to body, from body to consciousness, and from mantra to the supreme person. The structure therefore prevents the six chapters from being treated as unrelated essays.',[3,4]]
      ]},
      {t:'Question 1 — from where are beings born?',ps:[
        ['Kabandhin Katyayana asks the origin of living beings. Pippalada responds with Prajapati, who creates the pair rayi and prana—material form and life, often associated with moon and sun—as complementary principles through which generation occurs.',[2,4]],
        ['The answer also distinguishes paths connected with different forms of religious life and knowledge. Cosmic cycles, sacrifice and human reproduction are placed in one ordered account rather than treated as separate domains.',[3,4]],
        ['The chapter’s language remains close to Vedic cosmology, but the purpose is already inward: the reader is being prepared to ask what life-power itself is and whether it can explain the whole person.',[2,3]]
      ]},
      {t:'Question 2 — which powers sustain the person?',ps:[
        ['Bhargava asks how many deities support a living being and which of them is supreme. Space, air, fire, water, earth, speech, mind, eye and ear all claim importance.',[2,4]],
        ['Prana demonstrates supremacy by appearing to depart. The other faculties begin to follow, just as bees follow their queen. When prana remains, they remain. The image makes dependence visible without denying the real function of the senses.',[3,5]],
        ['The rest of the answer praises prana through cosmic correspondences: it is linked with fire, sun, rain, Indra and the vital processes of the body. The vital breath thus joins microcosm and macrocosm.',[2,3]]
      ]},
      {t:'Question 3 — where does Prana come from?',ps:[
        ['Kausalya asks for the origin, entry, distribution and departure of prana. The answer says prana arises from the Self like a shadow and enters the body through the activity of mind.',[2,3]],
        ['The chief prana delegates functions to subordinate vital powers: apana, samana, vyana and udana. Their locations and activities provide one of the classic Upanishadic models of the vital body.',[3,4]],
        ['Udana is connected with post-mortem movement and the person’s mental orientation. The chapter therefore refuses to isolate physiology from ethics and destiny: how one lives shapes where the integrated person moves when embodied life ends.',[2,5]]
      ]},
      {t:'Question 4 — sleep, dream and the witnessing person',ps:[
        ['Gargya asks what sleeps, what remains awake, who sees dreams and in whom all these powers finally rest. The senses withdraw like rays of the setting sun, while prana continues its bodily work.',[2,4]],
        ['Mind becomes the dreamer, recombining what has been seen, heard and experienced. In deep sleep the mind itself rests, and the person is described as entering a condition of undifferentiated happiness.',[2,3]],
        ['The answer culminates in the Purusha who sees, touches, hears, thinks and knows through the faculties without being identical to any one of them. The analysis of sleep thus becomes an argument for a deeper subject of experience.',[3,5]]
      ]},
      {t:'Questions 5–6 — Om and the person with sixteen parts',ps:[
        ['Satyakama asks about sustained meditation on Om. Pippalada distinguishes partial and complete meditation through the mantra’s measures, associating them with progressively higher attainments. The full contemplation is directed beyond finite results.',[2,4]],
        ['The final student, Sukesha, asks about the Purusha with sixteen parts. The parts arise from the person through prana, faith, elements, senses, mind, food, strength, austerity, mantra, action, worlds and names.',[3,4]],
        ['At liberation the parts return to their source like rivers entering the sea, where separate names and forms are no longer maintained as independent realities. The Upanishad ends with gratitude to the teacher who has carried the students beyond ignorance.',[2,5]]
      ]},
      {t:'Commentaries and pedagogical influence',ps:[
        ['Shankara, Madhva and later Vedanta commentators use Prashna extensively in debates about prana, Om, the relation between the self and its faculties, and the difference between finite religious attainments and liberation.',[5]],
        ['The six-question design made Prashna exceptionally suitable for teaching. Its enduring value is not merely that it contains six answers, but that each answer reveals why the next question must be asked.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Prashna_Upanishad')
  };
})();