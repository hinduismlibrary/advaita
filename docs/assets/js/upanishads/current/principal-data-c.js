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
  R['Muṇḍaka']={
    title:'Mundaka Upanishad',deva:'मुण्डकोपनिषद्',date:'Later first millennium BCE',type:'Mukhya Upanishad',veda:'Atharvaveda',school:'Atharvavedic',setting:'Independent Atharvaveda Upanishad',structure:'3 mundakas; 2 khandas each; 64 verses',muktika:'No. 5',commentators:'Shankara, Madhva, Rangaramanuja',famous:'Two birds; Om as bow',
    image:{src:commons('Mundaka Upanisad verses 3.2.8 to 3.2.10, Atharvaveda, Sanskrit language, Devanagari script.jpg'),href:href('Mundaka Upanisad verses 3.2.8 to 3.2.10, Atharvaveda, Sanskrit language, Devanagari script.jpg'),cap:'Mundaka Upanishad 3.2.8–3.2.10 with marginal notes in a nineteenth-century Devanagari manuscript. Wikimedia Commons.'},
    lead:[
      ['The Mundaka Upanishad is an Atharvavedic verse text that asks what kind of knowledge can actually make everything known. Its answer distinguishes lower knowledge—including the Vedas and the six Vedangas—from the higher knowledge by which the imperishable is realized.',[1,2,4]],
      ['That distinction does not simply declare the Vedas useless. Mundaka places ritual, recitation and learned disciplines inside a hierarchy. Sacrifices can produce real but finite results; knowledge of the imperishable concerns a different kind of attainment altogether.',[2,3]],
      ['Its images became classics of Vedanta: sparks issuing from fire, the imperishable as the source of the cosmos, Om as bow and the self as arrow, two birds on one tree, and rivers losing separate names when they enter the sea.',[3,5]]
    ],
    sections:[
      {t:'Structure and the two kinds of knowledge',ps:[
        ['The work has three mundakas, each divided into two khandas, for six teaching sections in all. The title mundaka is traditionally connected with shaving or stripping away, and later readers sometimes understood it as knowledge that shaves off ignorance, though etymological explanations should be treated cautiously.',[1,3]],
        ['The opening frames a lineage of knowledge from Brahma through Atharvan and Angiras. Shaunaka, described as a great householder, approaches Angiras and asks: what is that by knowing which all this becomes known?',[2,4]],
        ['The answer divides knowledge into lower and higher. The lower includes Rig, Yajur, Sama and Atharva Vedas together with phonetics, ritual, grammar, etymology, metre and astronomy. Higher knowledge is that through which the imperishable is known.',[3,5]]
      ]},
      {t:'Mundaka 1.2 — the limits of ritual achievement',ps:[
        ['The text describes Vedic sacrificial works and their promised results in language that shows real familiarity with ritual tradition. Its criticism is therefore internal rather than ignorant: the rites are fragile boats when mistaken for the highest good.',[2,3]],
        ['Those who regard finite sacrificial merit as complete wisdom repeatedly return to old age and death. The problem is not that ritual produces nothing, but that its result remains within the sphere of what begins and ends.',[3,4]],
        ['A seeker who has examined the worlds produced by action is therefore directed toward a qualified teacher, carrying sacrificial fuel in the traditional manner. Renunciation of finite results does not abolish the teacher-student structure of Vedic learning.',[2,5]]
      ]},
      {t:'Mundaka 2 — the imperishable and Om as bow',ps:[
        ['The second mundaka describes the cosmos as emerging from the imperishable as sparks arise from a blazing fire. Breath, mind, senses, worlds and beings depend upon one source without exhausting it.',[2,4]],
        ['The highest person is portrayed as both transcendent and present through cosmic forms. Fire is his head, sun and moon his eyes, directions his ears and the Vedas his speech. The image makes the world a body of dependence rather than an independent second ultimate.',[3,5]],
        ['The celebrated meditation says that Om is the bow, the self is the arrow and Brahman the target. The arrow must be sharpened by meditation and released with concentrated awareness so that it becomes one with the target.',[2,3]],
        ['The imagery is practical rather than merely decorative. It gathers mantra, discipline, selfhood and goal into one act: the seeker cannot hit the target while remaining distracted from the movement of the whole practice.',[3,5]]
      ]},
      {t:'Mundaka 3.1 — the two birds',ps:[
        ['Two birds, inseparable friends, sit on the same tree. One eats the sweet fruit while the other looks on without eating. The first bird grieves because it is entangled in experience; seeing the splendour of the other, it becomes free from sorrow.',[2,4]],
        ['The image had a long interpretive life. Advaita often reads the birds as empirical and witnessing self viewed from two standpoints; theistic Vedanta schools can read them as individual soul and supreme Lord. The verse itself is powerful partly because it supports a relation without reducing both figures to an identical role.',[3,5]],
        ['Knowledge is repeatedly associated with seeing rather than accumulating propositions. When the highest is seen, the knot of the heart is cut, doubts are resolved and the binding force of action is exhausted.',[2,3]]
      ]},
      {t:'Mundaka 3.2 — rivers, liberation and transmission',ps:[
        ['The final section returns to the qualifications of the seeker: truth, austerity, right knowledge and disciplined life. Brahman is not attained by weak resolve or careless ascetic display, but by a life whose faculties have been gathered toward knowledge.',[2,4]],
        ['The image of rivers entering the ocean explains liberation through the disappearance of separate name and form at their source. Different Vedanta schools disagree over whether this implies absolute identity, inseparable dependence or another relation, but all treat the passage as major shruti evidence.',[3,5]],
        ['The text closes by restricting the teaching to properly prepared students and by honouring the lineage through which it is transmitted. The movement from Vedic learning to higher knowledge therefore ends inside, not outside, a sacred pedagogy.',[2,3]]
      ]},
      {t:'Influence on Vedanta and renunciatory ideals',ps:[
        ['Mundaka became central to later ideals of knowledge-centred liberation because it explicitly contrasts finite sacrificial results with the imperishable. Its language is frequently cited in discussions of sannyasa and of the proper place of Vedic learning in the path to liberation.',[3,5]],
        ['At the same time, the text should not be simplified into “ritual bad, philosophy good.” Its hierarchy only works because ritual and Vedic disciplines are treated as real forms of knowledge whose limits can themselves be understood.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Mundaka_Upanishad')
  };

  R['Māṇḍūkya']={
    title:'Mandukya Upanishad',deva:'माण्डूक्योपनिषद्',date:'c. last centuries BCE / early centuries CE',type:'Mukhya Upanishad',veda:'Atharvaveda',school:'Atharvavedic',setting:'Independent Atharvaveda Upanishad',structure:'12 mantras',muktika:'No. 6',commentators:'Gaudapada Karika; Shankara; later Vedanta',famous:'Om and the four quarters of the Self',
    image:{src:commons('Mandukya Upanisad verses 1-3, Atharvaveda, Sanskrit, Devanagari.jpg'),href:href('Mandukya Upanisad verses 1-3, Atharvaveda, Sanskrit, Devanagari.jpg'),cap:'Mandukya Upanishad, opening mantras in a Devanagari manuscript with marginal notes. Wikimedia Commons.'},
    lead:[
      ['The Mandukya Upanishad is only twelve mantras long, yet its influence on Indian philosophy is enormous. It identifies Om with the totality of time and analyzes the Self through waking, dream, deep sleep and a “fourth” called turiya, then maps those four quarters onto the sounds A, U, M and the unmeasured completion of Om.',[1,3,4]],
      ['The Upanishad became famous above all through Gaudapada’s Mandukya Karika and Shankara’s commentary. Because later editions often print the Karika directly with the twelve mantras, it is essential to distinguish the compact Upanishad itself from the much larger philosophical work that grew around it.',[2,3]],
      ['Its method is not merely a classification of psychological states. Waking, dreaming and deep sleep are used to show that the Self cannot be identical with one temporary mode of experience; turiya names the reality through which all three are understood without being reduced to any of them.',[3,5]]
    ],
    sections:[
      {t:'Twelve mantras and the later Karika',ps:[
        ['Mandukya belongs to the Atharvaveda and consists of twelve short mantras. Its date is later than the oldest prose Upanishads, though exact absolute chronology remains uncertain.',[1,2]],
        ['Gaudapada’s Karika, probably centuries later, is divided into four chapters and develops radical arguments about non-origination, dream, causality and nonduality. Traditional Advaita studies Upanishad and Karika together, but historical description must keep their textual identities distinct.',[2,3]],
        ['The Muktika tradition famously gives Mandukya exceptional status by claiming that it alone can be sufficient for liberation to a properly prepared seeker, with other Upanishads studied if certainty has not yet arisen.',[3,7]]
      ]},
      {t:'Mantras 1–2 — Om, time and the four quarters',ps:[
        ['The opening declares Om to be all this: past, present and future, and whatever lies beyond the threefold division of time. The same totality is then identified with Brahman, and the Self is said to have four quarters.',[3,4]],
        ['This is not simply the claim that a sound physically contains the universe. Om functions as a complete symbolic support through which temporal experience, consciousness and Brahman can be contemplated together.',[2,5]],
        ['The phrase “four quarters” introduces the text’s central method. Three are recognizable through ordinary experience; the fourth is described only after those familiar modes have been examined and shown to be incomplete identities of the Self.',[3,5]]
      ]},
      {t:'Mantras 3–6 — waking, dream and deep sleep',subs:[
        {h:'Vaishvanara — waking',ps:[['The waking self is outwardly cognitive, functioning through the senses and the shared external world. It is called Vaishvanara and is given a cosmic description with seven limbs and nineteen mouths, linking the individual waking person with a larger universal form.',[3,4]]]},
        {h:'Taijasa — dream',ps:[['The dream self is inwardly cognitive. Its objects are generated within the subtle field of mind rather than encountered as stable public objects. Yet the dreamer remains a genuine experiencer while dreaming.',[2,3]]]},
        {h:'Prajna — deep sleep',ps:[['In deep sleep desire and differentiated dream disappear. The sleeper is described as a mass of consciousness and blissful, with cognition undivided. But deep sleep is still not the final realization because the person returns from it without having destroyed ignorance.',[3,5]]]},
        {h:'The Lord of all?',ps:[['The sixth mantra describes the deep-sleep principle as lord of all, knower of all and the source and end of beings. Vedanta traditions differ over whether this language identifies Prajna directly with Ishvara or presents an individual condition dependent on the supreme.',[3,5]]]}]},
      {t:'Mantra 7 — turiya',ps:[
        ['The seventh mantra is the heart of the Upanishad. Turiya is described through negations: neither inwardly cognitive nor outwardly cognitive, neither both, neither a mass of cognition nor ordinary cognition nor unconsciousness.',[2,4]],
        ['It is unseen, beyond transaction, ungraspable, without ordinary marks, unthinkable and indescribable. Yet the verse does not end in negation: turiya is the essence of the awareness of the one Self, the cessation of phenomenal proliferation, peaceful, auspicious and nondual.',[3,5]],
        ['Calling turiya a “fourth state” can mislead if it suggests one more temporary condition that comes after deep sleep. Traditional Advaita especially reads it as the ever-present reality of the Self in relation to which the other three appear.',[3,5]]
      ]},
      {t:'Mantras 8–12 — A, U, M and the soundless completion',ps:[
        ['The final four mantras map waking onto A, dream onto U and deep sleep onto M. Each relation is explained through phonetic analogies such as beginning, elevation and measure.',[2,4]],
        ['The soundless or unmeasured completion beyond the three letters corresponds to turiya. Here ordinary transactions cease and duality is not established. Om becomes a disciplined way of contemplating the entire argument of the text in compressed sonic form.',[3,5]],
        ['The mapping is not arbitrary decoration added after the philosophy. Mandukya is built so that analysis of consciousness and analysis of Om mirror one another: both move from differentiation toward an indivisible ground.',[2,3]]
      ]},
      {t:'Gaudapada, Shankara and later reception',ps:[
        ['Gaudapada’s Karika transformed Mandukya into a central Advaita text through arguments for non-origination and the unreality of duality. Shankara’s commentary then placed Upanishad and Karika inside a broader Vedantic interpretation of liberation through self-knowledge.',[3,5]],
        ['Other Vedanta schools accept the twelve mantras as shruti while rejecting Advaita conclusions drawn from them. The history of Mandukya therefore offers an unusually clear example of how a tiny scriptural core can support a very large philosophical afterlife.',[3,5]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Mandukya_Upanishad')
  };

  R['Maitrāyaṇī']={
    title:'Maitri Upanishad',deva:'मैत्रायणीयोपनिषद्',date:'Late first millennium BCE; layered',type:'Mukhya Upanishad',veda:'Krishna Yajurveda',school:'Maitrayaniya',setting:'Maitrayaniya Yajurveda tradition',structure:'Common 7-prapathaka recension; layered supplements',muktika:'No. 24',commentators:'Traditional Vedanta reception; less extensive than older Mukhya texts',famous:'Sixfold yoga; time and the Self',
    image:{src:commons('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample i, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),href:href('1860s manuscript copy of ancient Maitrayaniya Upanishad, sample i, Krishna Yajurveda, Pune Maharashtra, Sanskrit, Devanagari.jpg'),cap:'Maitrayaniya (Maitri) Upanishad, nineteenth-century Devanagari manuscript copy, Pune tradition. Wikimedia Commons.'},
    lead:[
      ['The Maitrayaniya or Maitri Upanishad is one of the latest principal Upanishads and one of the best witnesses to a changing intellectual world. Older Upanishadic inquiry into the Self is joined here by increasingly explicit language of mind-control, gunas, time, cosmic manifestation and systematic yoga.',[1,2,3]],
      ['The work belongs to the Maitrayaniya school of the Krishna Yajurveda and survives in several recensional forms. The common seven-prapathaka edition is visibly layered: an older dialogue between King Brihadratha and Shakayanya is followed by supplementary teachings whose vocabulary and concerns are not completely uniform.',[1,3]],
      ['Its historical value lies in this heterogeneity. Maitri shows Upanishadic thought interacting with conceptual schemes associated with emerging Samkhya and Yoga without simply becoming a textbook of either later school.',[2,5]]
    ],
    sections:[
      {t:'Recensions, layers and historical position',ps:[
        ['Maitri is later than Brihadaranyaka, Chandogya and the oldest prose Upanishads. Linguistic and doctrinal evidence places its core in the later first millennium BCE, while some supplementary material may be younger.',[1,2]],
        ['Manuscripts differ in the number and arrangement of prapathakas. The common seven-part form is useful for reading, but should not be mistaken for evidence that all seven chapters were composed together in one sitting.',[1,3]],
        ['The text’s mixture of archaic Upanishadic themes and more systematized terms such as the gunas makes it especially important for intellectual history. It preserves a period when categories that later became associated with distinct philosophical schools were still being combined experimentally.',[2,5]]
      ]},
      {t:'Prapathakas 1–2 — King Brihadratha and the search for the Self',ps:[
        ['King Brihadratha renounces his throne and undertakes austerity. When the sage Shakayanya offers a boon, the king asks for knowledge of the Self rather than power or prosperity.',[2,4]],
        ['His speech dwells on the instability and impurity of the body: flesh, bone, skin, waste, old age, disease and death. The rhetoric is intentionally severe because the king wants to know whether there is anything in the embodied person that does not perish with those conditions.',[3,4]],
        ['Shakayanya answers by distinguishing the serene conscious Self from the bodily and psychological apparatus through which it appears entangled. The problem of liberation becomes the problem of why the pure knower identifies with change.',[2,5]]
      ]},
      {t:'Prapathakas 3–4 — mind, qualities and bondage',ps:[
        ['The text develops the distinction between the pure Self and the conditioned person through elements, senses, mind and the three gunas. This vocabulary is much more analytic than the simple body-sense lists of some older Upanishads.',[2,3]],
        ['Mind becomes a central problem. The person is bound because mind is attracted outward and shaped by qualities, impressions and desire; liberation requires the mind to become still enough that the Self is no longer confused with its changing contents.',[3,5]],
        ['The Upanishad therefore moves toward a psychology of bondage. Ignorance is not merely failure to know a proposition; it is a whole pattern in which consciousness is captured by the activity of the instrument through which it experiences.',[2,5]]
      ]},
      {t:'Prapathakas 5–6 — sun, Om, time and sixfold yoga',subs:[
        {h:'Solar and cosmic meditation',ps:[['The sun becomes an important support for meditation, joining older Vedic solar symbolism with a more inward search for the supreme Self. Om likewise functions as a sonic form through which the seeker approaches the highest.',[2,4]]]},
        {h:'Time and the timeless',ps:[['Maitri distinguishes measurable time from that which stands beyond temporal succession. The year, sun and cosmic cycles belong to time, but the source through which time is known cannot simply be another moment inside the sequence.',[2,3]]]},
        {h:'The six limbs of yoga',ps:[['One of the most famous passages gives a sixfold yoga: breath control, withdrawal of the senses, meditation, concentration, reflective inquiry and absorption. The list is historically important because it shows systematic yogic practice entering an Upanishadic framework before the later classical eight-limbed scheme became standard.',[1,3]]]},
        {h:'Mind made motionless',ps:[['The practical aim is the cessation of scattered mental movement. When the mind is dissolved or made steady in the Self, ordinary bondage loses its basis. Yoga and knowledge are therefore integrated rather than opposed.',[2,5]]]}]},
      {t:'Prapathaka 7 and supplementary teachings',ps:[
        ['The seventh prapathaka gathers further meditations, correspondences and doctrinal clarifications. Its style often feels supplementary, and scholars have long treated parts of the later material as additions to an older core.',[1,3]],
        ['Rather than seeing this as a defect, the layered structure makes Maitri unusually revealing. It records how a Vedic school could continue expanding an Upanishadic teaching as new philosophical vocabularies became available.',[2,5]],
        ['The received text therefore belongs simultaneously to scripture and intellectual history: one canonical work preserves several stages of reflection on the same central problem of how the unchanging Self relates to mind, time and nature.',[2,3]]
      ]},
      {t:'Relation to Samkhya, Yoga and Vedanta',ps:[
        ['Maitri is often described as influenced by Samkhya and Yoga because of its gunas and systematic yogic discipline. Historically it is safer to speak of shared and developing vocabularies rather than assume the finished later schools already existed in exactly the same form.',[2,3]],
        ['Vedanta receives Maitri as an Upanishad of the Yajurveda, though it attracted less medieval commentarial attention than Brihadaranyaka, Chandogya or Taittiriya. Modern scholarship values it precisely because it reveals a transitional philosophical landscape that those older texts do not yet display so explicitly.',[3,5]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Maitrayaniya_Upanishad')
  };
})();