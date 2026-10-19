(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Upaniṣad:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const OL='Patrick Olivelle, The Early Upanishads: Annotated Text and Translation';
  const DE='Paul Deussen, Sixty Upanishads of the Veda';
  const RAD='S. Radhakrishnan, The Principal Upanishads';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});

  put('Maitrāyaṇī',{
    sanskritTitle:'मैत्रायणीयोपनिषद् / मैत्र्युपनिषद्',traditionalAuthor:'Maitrayaniya school',language:'Late Vedic / early Classical Sanskrit prose and verse',period:'c. 2nd century BCE–2nd century CE for major received layers',extent:'Usually 7 prapathakas; the final sections are especially layered and recensional',primaryRecensions:['Maitrayaniya / Maitri recensions with variant chapter divisions'],
    leadParagraphs:[
      'The Maitrayaniya or Maitri Upanishad is one of the latest principal Upanishads and one of the most visibly layered. It begins with King Brihadratha abandoning royal life and asking the sage Shakayanya what can be permanent in a body subject to decay. From that question the text develops a complex synthesis of self-knowledge, mind, time, the gunas, solar meditation and a six-limbed yoga.',
      'Its philosophical vocabulary is more systematized than that of the oldest prose Upanishads. Sankhya-like categories, a developed theory of mind and an explicit sequence of yogic practices appear beside older Vedic and Upanishadic formulations. That mixture is one of the chief reasons the text is historically important.'
    ],articleSections:[
      {title:'Date and layered composition',paragraphs:[
        'The Maitri is generally placed near the end of the classical Upanishadic period, around the last centuries BCE or early centuries CE. No single year fits the whole work because its seven-prapathaka recension contains additions and internal repetitions.',
        'J. A. B. van Buitenen and other scholars identify several compositional layers. Earlier teaching sections can be separated from later supplements that collect quotations, yoga material and polemical or syncretic discussions.',
        'The Upanishad’s relation to developed Sankhya and Yoga vocabulary is central to dating. It belongs to an intellectual world in which older Upanishadic self-teaching was already interacting with more formal accounts of mind, qualities and disciplined meditation.'
      ]},
      {title:'The seven prapathakas',books:[
        {number:1,title:'Prapathaka 1 — Brihadratha’s renunciation',summary:'The king, disgusted by bodily impermanence and the endless cycle of worldly events, abandons his throne, practices austerity and seeks instruction from Shakayanya.'},
        {number:2,title:'Prapathaka 2 — the self and the body',summary:'The teacher distinguishes the serene inner self from the psychophysical person and explains how consciousness appears bound through embodiment and mind.'},
        {number:3,title:'Prapathaka 3 — the embodied self',summary:'The text analyzes the bhutatman, the embodied self entangled in the gunas and action, and contrasts it with the immortal inner ruler.'},
        {number:4,title:'Prapathaka 4 — liberation and knowledge',summary:'Further instruction on bondage, desire, mind and the knowledge by which the person becomes free from identification with changing qualities.'},
        {number:5,title:'Prapathaka 5 — cosmic and solar teaching',summary:'Brahman, the sun, time and cosmic manifestation are interpreted through elaborate correspondences and meditations.'},
        {number:6,title:'Prapathaka 6 — sixfold yoga',summary:'Breath control, withdrawal, meditation, concentration, reasoning and absorption are coordinated as a six-limbed yoga whose aim is mastery of mind and realization of the self.'},
        {number:7,title:'Prapathaka 7 — supplementary teachings',summary:'A heterogeneous closing collection of meditations, quotations and doctrinal clarifications, often treated as one of the clearest later layers of the text.'}
      ]},
      {title:'Brihadratha and the problem of embodiment',paragraphs:[
        'Brihadratha’s opening lament is unusually severe. He lists the body’s decay, disease, excretions, sexual desire and mortality, then expands outward to kings and cosmic powers that also pass away. The problem is not one personal disappointment but the inability of any changing thing to provide a permanent ground.',
        'The sage does not answer by condemning existence as meaningless. He distinguishes the inner self from the embodied configuration of elements, faculties and mind. Liberation depends on knowing the difference and on transforming the mental processes through which the self appears bound.',
        'This opening makes the Maitri particularly important for the history of renunciatory psychology. Its language is closer to the ascetic and yogic world of later Indian philosophy than the ritual-court setting of Brihadaranyaka.'
      ]},
      {title:'Mind, gunas and the embodied self',paragraphs:[
        'The Maitri gives the mind an unusually central role in bondage. The self itself is pure, but the embodied person is shaped through mind, sense activity and the three gunas—sattva, rajas and tamas.',
        'The text can therefore describe liberation as a problem of mental purification without reducing the self to mind. The mind must become quiet enough for the difference between transient modification and the unchanging inner principle to be known.',
        'This combination of Upanishadic atman teaching with guna psychology is one of the clearest bridges from late Vedic speculation toward the conceptual world of classical Sankhya and Yoga.'
      ]},
      {title:'The six-limbed yoga',paragraphs:[
        'The sixth prapathaka gives a sixfold yoga: pranayama, pratyahara, dhyana, dharana, tarka and samadhi. The sequence differs from Patanjali’s later eightfold formulation and is therefore evidence for several competing early systems of yoga.',
        'Breath and the senses are drawn inward so that the mind becomes one-pointed. Tarka here is not ordinary debate but a contemplative discernment that supports absorption. Samadhi is the culmination in which mental dispersion no longer obscures the self.',
        'The text also uses bodily and acoustic imagery associated with internal sound and the central channel. These passages became important points of comparison for later Yoga Upanishads, though the Maitri remains earlier and less technically elaborate than the medieval subtle-body systems.'
      ]},
      {title:'Time, sun and Brahman',paragraphs:[
        'The Maitri distinguishes time that is measured through cosmic change from the timeless ground beyond measure. The sun becomes a visible form through which temporal order and the supreme can be contemplated.',
        'Solar meditation connects older Vedic worship with a more philosophical interpretation: the visible sun is not the final object but a doorway through which the practitioner understands life, breath, time and the inner self.',
        'These passages make the work a valuable witness to the persistence of Vedic cosmological meditation inside a late philosophical Upanishad.'
      ]},
      {title:'Manuscripts, commentaries and reception',paragraphs:[
        'The text survives in variant recensions, and chapter numbering differs. Scholars therefore distinguish the shorter core from later supplementary material rather than treating every printed paragraph as equally early.',
        'The Maitri has a smaller classical Vedanta commentary tradition than Brihadaranyaka or Chandogya, but its yoga and guna passages made it important to modern histories of Indian philosophy and yoga.',
        'Modern editions by van Buitenen and earlier translators should be consulted alongside Sanskrit recensions because the layered state of the text is itself one of its most significant features.'
      ]}
    ],sources:merge(D['Upaniṣad:Maitrāyaṇī']?.sources,[W('Maitrayaniya Upanishad','https://en.wikipedia.org/wiki/Maitrayaniya_Upanishad','Late chronology, layered composition and yoga sections.'),OL,DE,RAD,'J. A. B. van Buitenen, The Maitrayaniya Upanishad'])
  });

  put('Kaṭha',{
    sanskritTitle:'कठोपनिषद्',traditionalAuthor:'Katha school; dialogue of Nachiketa and Yama',language:'Vedic Sanskrit verse',period:'c. 5th–3rd centuries BCE',extent:'2 adhyayas, each divided into 3 vallis; 119 verses in the common recension',
    leadParagraphs:[
      'The Katha Upanishad is a philosophical poem built around a boy who refuses to be distracted from the question of death. Nachiketa, given to Yama by his angry father, waits three nights in the house of Death and receives three boons. After restoring his father and learning the Nachiketa fire, he spends the final boon on the question Yama says even the gods once doubted: what becomes of a person after death?',
      'The answer produces one of the most carefully structured Upanishadic teachings on the good and the pleasant, the hierarchy of senses and mind, the chariot image, the imperishable self, yoga, the cosmic tree and the supreme Purusha. The poem’s literary force comes from the fact that knowledge is repeatedly offered as an alternative to wealth, longevity, pleasure and celestial reward.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The Katha is later than the earliest prose Upanishads and is generally placed in the middle of the first millennium BCE, often between the fifth and third centuries BCE. Its polished verse and engagement with renunciatory and yogic ideas place it in the transition toward the early classical philosophical world.',
        'It belongs to the Katha school of the Krishna Yajurveda. The narrative uses an older Vedic motif of Nachiketa and sacrificial fire but transforms it into a sustained inquiry into death and liberation.',
        'Some verses have close parallels in the Bhagavad Gita and other early Sanskrit texts. Direction of borrowing is not always simple, but the shared language shows a developing common philosophical vocabulary.'
      ]},
      {title:'The six vallis',books:[
        {number:1,title:'1.1 — Nachiketa enters the house of Death',summary:'Vajashravas gives away worn-out cows; Nachiketa repeatedly asks to whom he himself will be given and is sent to Yama. After three nights without hospitality, Yama grants three boons.'},
        {number:2,title:'1.2 — Shreyas and preyas',summary:'Yama tests Nachiketa with sons, wealth, long life, celestial women and power. The boy rejects them. Yama distinguishes the good from the merely pleasant and begins the teaching of the self.'},
        {number:3,title:'1.3 — the chariot and the inner hierarchy',summary:'Body is chariot, senses horses, mind reins, intellect charioteer and self the rider. The hierarchy rises from senses to objects, mind, intellect, great self, unmanifest and Purusha.'},
        {number:4,title:'2.1 — inward vision',summary:'The senses naturally turn outward; the wise turn inward to see the self. The chapter describes the one consciousness appearing through many forms and the Lord within.'},
        {number:5,title:'2.2 — the city of eleven gates',summary:'The body is a city with eleven gates inhabited by the unborn self. The same principle appears as fire, sun, wind and life while remaining beyond them.'},
        {number:6,title:'2.3 — the inverted tree and yoga',summary:'The eternal ashvattha has roots above and branches below. The text teaches control of mind and senses, the stillness called yoga, and liberation when the knots and desires of the heart are cut.'}
      ]},
      {title:'The three boons',paragraphs:[
        'Nachiketa’s first boon is domestic: his father’s anger must be pacified so that the boy can return in peace. The second concerns the fire sacrifice leading to heaven, which Yama teaches in detail and names after him. Only the third asks directly about the self after death.',
        'The sequence is deliberate. The Upanishad does not begin by mocking ritual or family duty. It gives them their proper place, then asks whether even heavenly reward answers the deepest question of mortality.',
        'Yama’s attempt to divert the boy is the decisive test. Everything that ordinary desire might call success is offered—long life, wealth, descendants, power, pleasure. Nachiketa sees that all are temporary because Death ultimately possesses them. His fitness for knowledge is demonstrated through discrimination rather than through age or social power.'
      ]},
      {title:'Shreyas and preyas',paragraphs:[
        'Yama names two orientations: shreyas, the truly good, and preyas, the immediately pleasant. They can coincide, but the spiritual problem arises when the pleasant is chosen simply because it gratifies desire while obscuring what leads beyond death.',
        'The distinction is ethical, psychological and epistemic. A person attached to wealth may not merely behave badly; attachment narrows what he can recognize as real. Knowledge requires a reordering of desire.',
        'This makes the Katha less a speculative treatise about an invisible soul than a pedagogy of freedom. The student must become capable of preferring the truth even before the truth is fully explained.'
      ]},
      {title:'The chariot allegory',paragraphs:[
        'The body is the chariot, the self its lord or rider, the intellect the charioteer, mind the reins and senses the horses. Sense objects are the roads along which the horses move. A person with uncontrolled senses and an undiscerning charioteer travels badly; one whose intellect understands and whose mind holds the reins reaches the goal.',
        'The image is often simplified into “reason should control desire,” but the Upanishad goes further. Even a perfectly controlled psychophysical vehicle is not the final self. The hierarchy continues beyond senses, mind and intellect toward the great self, the unmanifest and Purusha.',
        'Later Yoga and Vedanta traditions repeatedly reuse the image because it gives a compact model of discipline without identifying liberation with psychological control alone.'
      ]},
      {title:'Self, Purusha and the inverted tree',paragraphs:[
        'The Katha describes the self as unborn, eternal and not slain when the body is slain. These verses later reappear in closely related form in the Bhagavad Gita, where they become part of Krishna’s teaching to Arjuna.',
        'The inverted ashvattha, rooted above and branching below, portrays the manifested world as dependent on a transcendent source. The same image becomes famous in Bhagavad Gita 15, but Katha places it inside a teaching about Brahman, fear and cosmic dependence.',
        'The supreme Purusha is beyond the unmanifest and beyond ordinary categories of the internal hierarchy. Liberation is not acquisition of a new object; it is realization of the principle that was never born and cannot die.'
      ]},
      {title:'Yoga and the knots of the heart',paragraphs:[
        'Yoga is defined through the firm holding of the senses and the stilling of mental dispersion. The text explicitly warns that this state can be gained and lost, indicating a disciplined practice rather than a one-time emotional experience.',
        'The closing verses say that when the desires lodged in the heart are released, the mortal becomes immortal, and when the knots of the heart are cut, liberation is attained here. Desire and ignorance are therefore not merely punishable faults but structures binding consciousness to finite identity.',
        'The upward movement of subtle channels at death also appears in the final section, a teaching that becomes more technically developed in later Yoga and Vedanta texts.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s Katha commentary became one of the standard Advaita readings of the self, the chariot and the hierarchy culminating in Purusha. Madhva’s commentary reads the same hierarchy within a theistic ontology of dependence upon Vishnu.',
        'The poem has been translated exceptionally often because of its narrative clarity. Nachiketa became a model of the ideal student in modern Hindu literature, while the “good and pleasant” distinction entered ethical teaching far beyond formal Vedanta.',
        'Its influence on the Bhagavad Gita and later Yoga vocabulary makes Katha central to understanding the transition from Vedic Upanishad to classical Hindu philosophical scripture.'
      ]}
    ],sources:merge(D['Upaniṣad:Kaṭha']?.sources,[W('Katha Upanishad','https://en.wikipedia.org/wiki/Katha_Upanishad','Six vallis, Nachiketa narrative, chronology and philosophy.'),OL,DE,RAD,'Katha Upanishad with Shankara Bhashya','Katha Upanishad with Madhva commentary'])
  });

  put('Śvetāśvatara',{
    sanskritTitle:'श्वेताश्वतरोपनिषद्',traditionalAuthor:'Sage Shvetashvatara and his teaching lineage',language:'Vedic / early Classical Sanskrit verse',period:'c. 5th–3rd centuries BCE',extent:'6 chapters, 113 verses in the common text',
    leadParagraphs:[
      'The Shvetashvatara Upanishad is the most explicitly theistic of the early principal Upanishads. It begins by asking what is the ultimate cause—time, nature, necessity, chance, the elements, the womb or the person—and answers through a theology in which the one Lord, repeatedly named Rudra, stands behind the world and the powers that appear to govern it.',
      'The text also preserves early yoga instructions, language of maya and mayin, reflections on prakriti and Purusha, and one of the earliest famous statements that devotion to God and guru opens the meaning of scripture. Its combination of Vedic Rudra, philosophical causality and contemplative discipline made it foundational for later Shaiva and theistic Vedanta interpretation.'
    ],articleSections:[
      {title:'Date and intellectual setting',paragraphs:[
        'The Upanishad is usually placed in the middle or later first millennium BCE, after the oldest prose texts and probably after Katha. Dates around the fifth to third centuries BCE are common, though individual scholars place it somewhat earlier or later.',
        'Its terminology shows an intellectual environment in which Upanishadic speculation was interacting with developing Sankhya, Yoga and theistic ideas. This does not make the text “non-Vedic”: several of its verses quote or rework older Samhita and Brahmana passages.',
        'The work presents itself as the teaching of Shvetashvatara and closes by praising the sage and the revelation received through divine grace.'
      ]},
      {title:'The six chapters',books:[
        {number:1,title:'Chapter 1 — what is the cause?',summary:'The sages ask whether time, nature, necessity, chance, elements or the individual person explain the universe. Meditation reveals the divine power hidden by its own qualities; prakriti, self and the Lord are distinguished.'},
        {number:2,title:'Chapter 2 — meditation and yoga',summary:'Vedic solar verses lead into instructions on bodily posture, breath, controlled senses, a suitable place for meditation and signs associated with yogic progress.'},
        {number:3,title:'Chapter 3 — Rudra and the supreme Person',summary:'Rudra is proclaimed the one God who rules the worlds; Purusha imagery and older Vedic verses are gathered into an explicitly supreme-Lord theology.'},
        {number:4,title:'Chapter 4 — the unborn, maya and divine unity',summary:'The famous image of the one unborn female with three colours and two unborn males is used to discuss prakriti and selves; the text speaks of maya and the Lord as mayin.'},
        {number:5,title:'Chapter 5 — knowledge, embodiment and liberation',summary:'The relation of finite soul, body, action and knowledge is explored through images of the subtle self and the Lord who grants release.'},
        {number:6,title:'Chapter 6 — the one Lord and devotion',summary:'The final chapter rejects time and impersonal causes as ultimate, praises the supreme Lord, and closes with the celebrated statement that the teachings shine for one who has supreme devotion to God and the same devotion to the guru.'}
      ]},
      {title:'Rudra as supreme Lord',paragraphs:[
        'The third chapter gathers older Vedic Rudra and Purusha language into a concentrated claim: the one Rudra stands without a second, rules all worlds and becomes the source and end of beings. This is one of the earliest unmistakably theistic developments inside the Upanishadic corpus.',
        'The text does not simply replace Brahman with a mythological deity. Rudra is described in the same transcendent terms used for the supreme reality: beyond colour, form and ordinary grasp, yet immanent in every being.',
        'Later Shaiva traditions naturally treated these verses as major shruti authority. Vaishnava Vedanta commentators, however, interpret divine names within their own hierarchy, showing how the same Vedic wording can be received differently across sampradayas.'
      ]},
      {title:'Maya, prakriti and the Lord',paragraphs:[
        'The fourth chapter contains the famous instruction to understand prakriti as maya and the great Lord as the mayin, the wielder or master of maya. The terminology became enormously important in later Vedanta, but its meaning here should not simply be replaced by a later school definition.',
        'The three-coloured unborn female is commonly connected with the three gunas or basic qualities, while conscious selves relate to her differently. The text is working toward a triadic account of nature, individual and Lord without presenting the fully formal system of classical Sankhya.',
        'For later commentators the question becomes whether maya is a real dependent power, beginningless ignorance, divine material causality or something else. The Upanishad supplies the authoritative vocabulary but not one universally accepted later metaphysics.'
      ]},
      {title:'Yoga practice',paragraphs:[
        'The second chapter is among the earliest Upanishadic passages to give concrete meditation instructions. The practitioner holds the body erect, controls the senses, regulates breath and chooses a clean, level and undisturbing place.',
        'The imagery of fire, wind, sun and bodily light connects yogic practice to Vedic cosmic symbolism. Early signs of concentration are described, but the goal is not the signs themselves; it is recognition of the divine self hidden in the person.',
        'The passage predates the standardized eight limbs of Patanjali and is therefore valuable evidence for the earlier diversity of yoga practice.'
      ]},
      {title:'God, guru and revelation',paragraphs:[
        'The final verse says that the teachings shine forth in the great soul who has supreme devotion to God and equal devotion to the guru. It is one of the earliest scriptural passages to place bhakti toward teacher and Lord explicitly beside philosophical knowledge.',
        'The statement does not make reason or Vedic study unnecessary. The entire Upanishad has argued, quoted, meditated and analyzed. Devotion describes the disposition in which this teaching becomes luminous rather than a substitute for understanding.',
        'Later Vedanta and Shaiva traditions repeatedly cite the verse when explaining why scriptural knowledge is received through a living line of instruction.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara is traditionally associated with a commentary on Shvetashvatara, though modern scholarship has debated the authorship of some commentarial works transmitted under his name. The text itself remained authoritative in Advaita regardless of that debate.',
        'Shaiva theologians used its Rudra verses as shruti support; Vedanta schools interpreted maya, the Lord and individual selves through their differing ontologies. The work therefore became a major bridge text rather than the exclusive property of one later school.',
        'Modern histories of Yoga also rely on chapter 2 because it preserves practical meditation instructions within an early theistic Upanishad.'
      ]}
    ],sources:merge(D['Upaniṣad:Śvetāśvatara']?.sources,[W('Shvetashvatara Upanishad','https://en.wikipedia.org/wiki/Shvetashvatara_Upanishad','Chronology, six chapters, Rudra theology, maya and yoga.'),OL,DE,RAD,'Shvetashvatara Upanishad Sanskrit commentarial editions'])
  });

  put('Īśāvāsya',{
    sanskritTitle:'ईशावास्योपनिषद् / ईशोपनिषद्',traditionalAuthor:'Vajasaneyi tradition',language:'Vedic Sanskrit verse',period:'c. 5th–3rd centuries BCE',extent:'18 mantras in the common Madhyandina recension; Kanva recension has 18 with variant ordering/readings',primaryRecensions:['Madhyandina','Kanva'],
    leadParagraphs:[
      'The Isha or Ishavasya Upanishad is the shortest principal Upanishad embedded directly in a Vedic Samhita: it forms the final chapter of the Vajasaneyi Samhita of the White Yajurveda. Eighteen compressed mantras move through possession and renunciation, action, seeing the self in all beings, knowledge and ignorance, becoming and non-becoming, and a final prayer to the sun and fire at death.',
      'Its brevity is deceptive. Nearly every paired concept in the poem has produced major disagreements among Vedanta commentators. The text does not present a simple opposition of “worldly action” and “spiritual renunciation”; it deliberately places apparently contrary disciplines beside one another and asks how each is limited when taken alone.'
    ],articleSections:[
      {title:'Date and Vedic recension',paragraphs:[
        'The Isha is later than the oldest prose Upanishads but belongs to the early metrical group, broadly in the middle of the first millennium BCE. Precise ordering relative to Kena and Katha remains disputed.',
        'It is chapter 40 of the Madhyandina Vajasaneyi Samhita and chapter 40 in the Kanva tradition as well, though the two recensions differ in wording and the ordering of some mantras. This direct Samhita location gives the text a distinctive status among principal Upanishads.',
        'Because it is part of a recited Yajurvedic Samhita, manuscript and oral recension must both be considered when discussing variant readings.'
      ]},
      {title:'The eighteen mantras',books:[
        {number:1,title:'Mantras 1–2 — Lord, renunciation and action',summary:'Everything moving in the world is to be covered or inhabited by the Lord; one should enjoy or protect through renunciation and not covet. The second mantra speaks of living a hundred years while performing action.'},
        {number:2,title:'Mantras 3–8 — self and all beings',summary:'Dark destinies are assigned to self-destroying ignorance; the self is unmoving yet swifter than mind, far and near, within and outside. Seeing all beings in the self and the self in all beings ends hatred and delusion.'},
        {number:3,title:'Mantras 9–11 — vidya and avidya',summary:'The poem warns that exclusive devotion to ignorance and exclusive devotion to knowledge can both lead into darkness, then says that knowing both together crosses death through avidya and reaches immortality through vidya.'},
        {number:4,title:'Mantras 12–14 — sambhuti and asambhuti',summary:'A second paired teaching contrasts becoming/manifestation with non-becoming or destruction; recensions and commentators differ over the exact terms and their theological referents.'},
        {number:5,title:'Mantras 15–18 — death prayers',summary:'The golden vessel covering the face of truth is asked to be removed; the solar Person is contemplated; the dying speaker remembers action and asks Agni to lead by the good path.'}
      ]},
      {title:'Ishavasyam idam sarvam',paragraphs:[
        'The opening compound can be understood through ideas of inhabiting, clothing or pervading by Isha, the Lord. The practical consequence is immediate: possession is relativized because the world is not ultimately owned by the individual who grasps at it.',
        'The phrase tena tyaktena bhunjitha has likewise generated different translations—enjoy through renunciation, protect through renunciation, accept what is allotted. The range of interpretation arises from real Sanskrit ambiguity, not merely from sectarian preference.',
        'The final warning “do not covet anyone’s wealth” anchors the metaphysical opening in conduct. The mantra’s vision of divine pervasion is inseparable from a transformed relation to possession.'
      ]},
      {title:'Action and renunciation',paragraphs:[
        'The second mantra says that one should wish to live a hundred years doing karma, because action performed in the proper way does not cling. This stands immediately after a verse famous for renunciation.',
        'Shankara distinguishes the path of knowledge from the ritual life of one not yet established in knowledge. Other traditions read the two verses more integratively and see prescribed action as compatible with knowledge and devotion.',
        'The interpretive dispute is built into the poem’s arrangement. A responsible article therefore presents the tension before presenting one school’s reconciliation of it.'
      ]},
      {title:'Seeing the self in all beings',paragraphs:[
        'The middle verses describe the self as simultaneously unmoving and faster than mind, distant and near, within all and outside all. Contradictory predicates are used to prevent the reader from turning the self into an ordinary finite object.',
        'The ethical culmination is vision: one who sees all beings in the self and the self in all beings does not shrink away from them. When unity is known, where can delusion or grief arise?',
        'Later Vedanta schools interpret the metaphysical unity differently, but the text itself directly joins knowledge with the overcoming of aversion, grief and alienation.'
      ]},
      {title:'Vidya, avidya, sambhuti and asambhuti',paragraphs:[
        'Mantras 9–14 are among the hardest in the text. Vidya and avidya cannot simply be translated as “knowledge good, ignorance bad,” because the poem says both must be known together and assigns a positive function to avidya in crossing death.',
        'Commentators identify the terms with different kinds of knowledge and worship. Shankara connects avidya with ritual action and vidya with meditation on deities; other Vedanta commentators construct different combinations.',
        'The second pair, sambhuti and asambhuti or vinasha depending on recension, is equally difficult. The textual variation is itself important: Madhyandina and Kanva transmission preserve different wording that affects interpretation.'
      ]},
      {title:'The final solar prayer',paragraphs:[
        'The last four mantras shift into first-person prayer. The face of truth is hidden by a golden vessel, and Pushan, the sun, is asked to remove his rays so that the speaker may see the most auspicious form.',
        'The declaration “that Person there, I am he” is followed immediately by the dissolution of breath and body, remembrance of deeds, and a prayer to Agni to lead by the good path. Knowledge, death and Vedic liturgy converge rather than appearing as separate genres.',
        'These mantras remain part of Hindu funerary and contemplative recitation, giving the small Upanishad a liturgical life much larger than its eighteen verses.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara, Madhva and other Vedanta teachers wrote or transmitted commentaries on Isha. The opening verse, the relation of knowledge and action, and the paired vidya/avidya section became major points of disagreement.',
        'Modern figures from Gandhi to Sri Aurobindo also produced influential readings, but those belong to reception history rather than replacing the premodern commentarial debates.',
        'The text’s direct place in the Vajasaneyi Samhita makes it especially useful for understanding how later Vedanta argument remained rooted in Vedic recitation.'
      ]}
    ],sources:merge(D['Upaniṣad:Īśāvāsya']?.sources,[W('Isha Upanishad','https://en.wikipedia.org/wiki/Isha_Upanishad','Eighteen mantras, chronology, recensions and philosophical debates.'),OL,DE,RAD,'Isha Upanishad with Shankara Bhashya','Vajasaneyi Samhita Madhyandina and Kanva editions'])
  });

  put('Praśna',{
    sanskritTitle:'प्रश्नोपनिषद्',traditionalAuthor:'Pippalada teaching tradition',language:'Sanskrit prose with verses',period:'c. 3rd century BCE–1st century CE',extent:'6 prashnas (questions)',
    leadParagraphs:[
      'The Prashna Upanishad is organized with unusual clarity around six students and six questions. The seekers approach the sage Pippalada carrying fuel, live with him for a year in austerity, chastity and faith, and then ask about creation, the powers sustaining the person, prana, sleep and dream, Om and the Purusha with sixteen parts.',
      'Its structure gives the text a scholastic character absent from the sprawling early prose Upanishads. Each question forms a self-contained inquiry, but the sequence narrows from cosmology toward the conscious person and finally toward the supreme source in whom all parts find rest.'
    ],articleSections:[
      {title:'Date and Atharvavedic setting',paragraphs:[
        'The Prashna is usually treated as a later classical Upanishad, broadly in the last centuries BCE or around the beginning of the Common Era. Its organized question-and-answer form and systematized prana doctrine place it after the oldest prose texts.',
        'It belongs to the Atharvaveda and is closely associated in later canon with Mundaka and Mandukya. The Pippalada frame gives the text a teacher lineage while allowing six different doctrinal problems to be gathered into one work.',
        'The students’ required year of preparation is part of the teaching. Questions are not answered simply because they are asked; disciplined life is presented as a condition for meaningful inquiry.'
      ]},
      {title:'The six questions',books:[
        {number:1,title:'Kabandhin — whence are beings born?',summary:'Pippalada teaches Prajapati’s creation of rayi and prana, the lunar and solar principles, time, year and the role of disciplined household generation.'},
        {number:2,title:'Bhargava — how many powers sustain a person?',summary:'The faculties claim superiority until prana prepares to leave and all begin to follow it. Prana is praised as the central life-power on which speech, sight, hearing and mind depend.'},
        {number:3,title:'Kaushalya — where does prana come from?',summary:'Prana arises from the Self, enters the body through mind, differentiates into five major functions and coordinates bodily and cosmic processes.'},
        {number:4,title:'Gargya — what sleeps and what remains awake?',summary:'The senses withdraw in sleep while prana continues its fires; dream is explained through the mind, and deep sleep through the person’s temporary rest in the luminous self.'},
        {number:5,title:'Satyakama — what is gained through Om?',summary:'Meditation on one, two or all three measures of Om produces different results; complete contemplation leads beyond limited worlds toward the supreme Purusha.'},
        {number:6,title:'Sukesha — who is the sixteen-part Purusha?',summary:'The sixteen parts arise from the Purusha and return to him like rivers losing name and form in the ocean. Knowing that centre ends the fear of death.'}
      ]},
      {title:'Prana as the organizing life-power',paragraphs:[
        'The second question dramatizes prana’s primacy. Speech, sight, hearing and mind each believe themselves central, but when prana makes as if to depart they are all pulled after it, like bees following their queen.',
        'The point is not that oxygen is metaphysically supreme. Prana names the living integration without which the separate faculties no longer constitute an embodied person. The Upanishad then maps this vital power onto fire, sun, rain, Indra, earth and wind.',
        'The third question refines the doctrine by differentiating prana, apana, samana, vyana and udana and associating them with bodily functions and post-mortem movement.'
      ]},
      {title:'Sleep, dream and deep sleep',paragraphs:[
        'When a person sleeps, the senses are said to merge into mind as rays merge into the sun. The vital fires remain active; ordinary outward cognition is suspended without life itself ceasing.',
        'Dream is constructed from what has been seen, heard, experienced and imagined. Deep sleep occurs when mind is overcome by light and no longer dreams; the person rests in the self and experiences happiness without differentiated objects.',
        'The discussion belongs to the larger Upanishadic use of states of consciousness as evidence. Prashna is less radical than Mandukya, but it shows the same effort to distinguish the enduring knower from changing cognitive states.'
      ]},
      {title:'Om and the three measures',paragraphs:[
        'The fifth question refuses to treat every use of Om as identical. Meditation on one measure, two measures and the full threefold syllable leads to progressively greater results.',
        'Partial contemplation can produce valuable but limited worlds; full contemplation is compared to a snake shedding its skin and leads toward the supreme Purusha. The structure makes the quality and completeness of meditation matter, not merely repetition of a sound.',
        'Later traditions connect this teaching with Mandukya’s A-U-M analysis, but Prashna’s emphasis is on graded meditative fruit rather than a four-state metaphysics.'
      ]},
      {title:'The sixteen-part Purusha',paragraphs:[
        'The final question begins with a prince who had asked Sukesha about the sixteen-part Purusha. Sukesha admits he did not know, refusing to fabricate an answer. His truthfulness prepares the scene for Pippalada’s teaching.',
        'From the Purusha arise prana, faith, space, air, fire, water, earth, senses, mind, food, strength, austerity, mantra, action, worlds and names. At dissolution the parts return to their source like rivers entering the sea.',
        'The image explains immortality as dependence on the centre rather than survival of sixteen independent components. When the Purusha is known, death no longer possesses the knower in the same way.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s commentary reads the six questions as a graded preparation for knowledge of Brahman. Madhva and later theistic commentators preserve the hierarchy while identifying the supreme Purusha with the Lord.',
        'The Upanishad is frequently taught because its structure is transparent enough for systematic study without sacrificing Vedic imagery. Its prana chapters also became important sources for later yoga and Ayurvedic discussions, although those traditions develop much more elaborate physiological systems.'
      ]}
    ],sources:merge(D['Upaniṣad:Praśna']?.sources,[W('Prashna Upanishad','https://en.wikipedia.org/wiki/Prashna_Upanishad','Six questions, contents and chronology.'),OL,DE,RAD,'Prashna Upanishad with Shankara Bhashya'])
  });

  put('Muṇḍaka',{
    sanskritTitle:'मुण्डकोपनिषद्',traditionalAuthor:'Atharvan-Angiras teaching lineage',language:'Sanskrit verse',period:'c. 4th–2nd centuries BCE',extent:'3 mundakas, each divided into 2 khandas; 64 mantras in the common text',
    leadParagraphs:[
      'The Mundaka Upanishad opens by drawing one of the sharpest distinctions in Vedic literature: there are two kinds of knowledge, higher and lower. The lower includes the four Vedas and six Vedangas; the higher is that by which the imperishable is known. The contrast does not deny the Veda. It asks whether mastery of sacred learning has reached the reality that makes sacred learning meaningful.',
      'The poem combines this critique of limited knowledge with images that became permanent in Hindu thought: sparks from a fire, two birds on one tree, rivers entering the ocean, and Om as a bow with the self as arrow and Brahman as target. Renunciation, disciplined truth and direct knowledge form the path toward the imperishable Purusha.'
    ],articleSections:[
      {title:'Date and Atharvavedic setting',paragraphs:[
        'The Mundaka is generally placed in the later first millennium BCE, after the oldest prose Upanishads and before or around the emergence of fully classical philosophical systems. Its verse style and renunciatory emphasis belong to the middle-late principal-Upanishad group.',
        'It is associated with the Atharvaveda and frames the teaching through a lineage from Brahma to Atharvan, Angiras and Shaunaka. That lineage gives the poem Vedic authority even while it relativizes ritual and textual learning as lower knowledge.',
        'The title mundaka is traditionally connected with shaving, suggesting a relation with renouncers, though etymological explanations vary. The text’s own ideal certainly favours the seeker who leaves dependence on ritual reward and approaches a teacher for knowledge of the imperishable.'
      ]},
      {title:'The three mundakas',books:[
        {number:1,title:'Mundaka 1 — two knowledges and the source of beings',summary:'Shaunaka asks what one thing, when known, makes everything known. The answer distinguishes higher and lower knowledge, describes the imperishable source, and criticizes ritual boats that cannot carry a person to final freedom.'},
        {number:2,title:'Mundaka 2 — Brahman, Om and the inner self',summary:'All worlds and powers arise from the imperishable Purusha; Om becomes the bow, the self the arrow and Brahman the target; the radiant self is to be known within the heart.'},
        {number:3,title:'Mundaka 3 — two birds and liberation',summary:'Two birds share one tree, one eating its fruits and the other witnessing. When the experiencer sees the majestic Lord, grief falls away. Truth, austerity, knowledge and freedom from desire culminate in union with the supreme.'}
      ]},
      {title:'Higher and lower knowledge',paragraphs:[
        'The lower knowledge includes Rigveda, Yajurveda, Samaveda, Atharvaveda and the six Vedangas—phonetics, ritual, grammar, etymology, metre and astronomy. This list is the classical scriptural source for the Vedanga category displayed elsewhere in the index.',
        'Calling these disciplines “lower” does not mean false or useless. They are real forms of knowledge whose objects remain within the field of name, ritual, language and cosmic order. The higher knowledge is different in kind because its object is the imperishable ground itself.',
        'The distinction became central to Vedanta because it gives scriptural authority for moving from mastery of texts to knowledge of Brahman while still treating Vedic study as a necessary part of the inherited path.'
      ]},
      {title:'Critique of ritual as final end',paragraphs:[
        'The first mundaka calls sacrificial forms fragile boats when they are treated as the highest good. Performers may reach meritorious worlds, but when that merit is exhausted they return.',
        'The critique is directed at finality, not at the existence of ritual. The poem itself knows the sacrifice intimately and uses Vedic imagery throughout. Its claim is that finite action cannot manufacture the imperishable result of liberation.',
        'The seeker who recognizes the limits of action is instructed to approach a teacher who is learned in scripture and established in Brahman. Renunciation here is therefore connected with a pedagogical lineage, not solitary rejection of all tradition.'
      ]},
      {title:'Om as bow',paragraphs:[
        'The image is precise: take the great weapon of the Upanishad, place upon it the arrow sharpened by meditation, draw the bow with mind absorbed in Brahman, and strike the imperishable target. Om is the bow, the self is the arrow and Brahman the target.',
        'The metaphor combines effort and identity. An arrow must be made straight, aimed and released, but when it reaches the target it is no longer experienced as separate in the same way. Later contemplative traditions repeatedly reuse this verse as a compact account of mantra and meditation.',
        'The surrounding passage locates Brahman in the heart and beyond ordinary light. Sun, moon, stars and fire do not illumine it; by its light everything else is known.'
      ]},
      {title:'The two birds',paragraphs:[
        'Two birds of beautiful plumage sit on the same tree. One eats the sweet fruit; the other does not eat but simply looks on. The image has an older Vedic history, but Mundaka gives it an explicitly soteriological interpretation.',
        'The fruit-eating bird is the finite experiencer caught in action, pleasure and grief. Seeing the other—the majestic, unstained Lord—transforms the first bird’s understanding and releases sorrow.',
        'Vedanta schools disagree over whether the two birds ultimately express identity with differing appearances or an eternal distinction between jiva and Lord. The verse became powerful precisely because both relation and transcendence are present in the image.'
      ]},
      {title:'Truth and liberation',paragraphs:[
        'Satyameva jayate—“truth alone triumphs”—comes from the third mundaka. In context it is not a political slogan but part of a description of the path by which sages reach the divine treasure.',
        'Truth, austerity, right knowledge and disciplined life purify the seeker. When desires cease and the supreme is known, the parts return to their cosmic bases and the knower reaches the imperishable.',
        'The river-ocean image closes the movement: rivers lose separate names and forms when they enter the sea; the knower, freed from limiting name and form, reaches the supreme Purusha.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s commentary emphasizes the insufficiency of ritual for liberation and the necessity of Brahma-knowledge. Madhva interprets the two birds and supreme Purusha in a strongly theistic direction.',
        'The text supplied the motto satyameva jayate to modern India, but its religious reception is much older: it became a key scriptural source for renunciation, guru-disciple instruction, Om meditation and the distinction between ritual merit and moksha.'
      ]}
    ],sources:merge(D['Upaniṣad:Muṇḍaka']?.sources,[W('Mundaka Upanishad','https://en.wikipedia.org/wiki/Mundaka_Upanishad','Three mundakas, higher/lower knowledge, two birds and Om.'),OL,DE,RAD,'Mundaka Upanishad with Shankara Bhashya'])
  });

  put('Māṇḍūkya',{
    sanskritTitle:'माण्डूक्योपनिषद्',traditionalAuthor:'Atharvaveda tradition',language:'Sanskrit prose',period:'c. 1st century BCE–2nd century CE',extent:'12 mantras; later studied with the 4-chapter Mandukya Karika of Gaudapada',
    leadParagraphs:[
      'The Mandukya Upanishad is only twelve mantras long, yet it became one of the most influential texts in Advaita Vedanta. Its subject is Om and the self as four quarters: waking, dream, deep sleep and turiya, the “fourth,” which is not another ordinary state but the nondual reality underlying the three experienced states.',
      'Much of its later fame comes from Gaudapada’s Mandukya Karika, a separate early Advaita work composed in four chapters and transmitted with the Upanishad. Keeping the twelve-mantra shruti distinct from the Karika is essential: later philosophical arguments about non-origination and Buddhist parallels belong primarily to Gaudapada’s text, not to every word of the Upanishad.'
    ],articleSections:[
      {title:'Date, text and the Gaudapada distinction',paragraphs:[
        'The Mandukya is usually placed among the later principal Upanishads, around the turn of the Common Era or early centuries CE. Its compressed state-analysis is more systematic than the dream and sleep discussions in Brihadaranyaka and Chandogya.',
        'The core Upanishad has only twelve mantras. Gaudapada’s Karika—often printed directly after or around them—contains roughly 215 verses in four chapters and is historically later.',
        'Shankara comments on the Upanishad and Karika together. This transmission made the combined work central to Advaita, but a scholarly article must identify whether a doctrine comes from mantra 7 of the Upanishad or from a later Karika chapter.'
      ]},
      {title:'The twelve mantras',books:[
        {number:1,title:'Mantras 1–2 — Om, all this and the self',summary:'Om is identified with all that was, is and will be and with what lies beyond time. The self is Brahman and is described as having four quarters.'},
        {number:2,title:'Mantras 3–4 — waking and dream',summary:'The waking self is Vaishvanara, outwardly cognitive and seven-limbed with nineteen mouths; the dream self is Taijasa, inwardly cognitive with the same symbolic structure.'},
        {number:3,title:'Mantras 5–6 — deep sleep and Prajna',summary:'In deep sleep desire and dream cease. Prajna is a mass of consciousness and bliss, the lord and source from which beings arise and into which they return.'},
        {number:4,title:'Mantra 7 — turiya',summary:'The fourth is neither inwardly nor outwardly cognitive, neither both nor a simple unconscious mass; it is unseeable, ungraspable, beyond empirical characteristics, peaceful, auspicious and nondual—the self to be realized.'},
        {number:5,title:'Mantras 8–12 — A-U-M and the four quarters',summary:'The four quarters are mapped onto the sounds A, U, M and the soundless completion of Om, giving a contemplative method in which phonetic analysis becomes self-inquiry.'}
      ]},
      {title:'Waking, dream and deep sleep',paragraphs:[
        'The first three quarters are not merely psychological states. Vaishvanara, Taijasa and Prajna have individual and cosmic dimensions, linking the human cycle of consciousness with the structure of the universe.',
        'Waking is outward-facing and organized around gross objects. Dream turns the same power inward and generates a subtle world. Deep sleep removes differentiated objects and desires, yet the person later reports having slept, raising the question of what continuity remained.',
        'The Upanishad refuses to identify the self with any one state because every ordinary state appears and disappears. The search therefore moves toward the reality present through all three without being confined to any of them.'
      ]},
      {title:'Turiya',paragraphs:[
        'Mantra 7 defines turiya almost entirely through negation. It is not outward cognition, inward cognition, both, a cognitive mass, ordinary knowledge or simple ignorance. It cannot be grasped as an object or marked by empirical characteristics.',
        'The positive terms are equally important: peaceful, auspicious and nondual. Turiya is not a blank nothing reached after destroying consciousness; it is the self whose reality cannot be captured by the categories generated inside waking, dream and sleep.',
        'Later Advaita treats this mantra as one of the clearest shruti statements of nondual consciousness. Other Vedanta schools accept the mantra but differ over whether the nonduality excludes real distinctions among Lord, soul and world.'
      ]},
      {title:'Om and the four quarters',paragraphs:[
        'The final five mantras map waking onto A, dream onto U, deep sleep onto M and the fourth onto the unmeasured or soundless completion of Om. The analysis turns pronunciation into contemplative structure.',
        'The similarities are explained through sound position and symbolic qualities. A is first and pervasive, U mediates and raises, M measures and absorbs. The soundless completion is not another phoneme but the silence in which the whole syllable is resolved.',
        'Meditation on Om therefore becomes a way to move through the known states toward recognition of the self that makes their sequence possible.'
      ]},
      {title:'Gaudapada’s Karika',paragraphs:[
        'Gaudapada’s four chapters are called Agama, Vaitathya, Advaita and Alatashanti. They develop arguments about dream, appearance, nonduality and ajativada, the doctrine of non-origination.',
        'The Karika uses philosophical vocabulary that has generated a major scholarly debate about relations with Mahayana Buddhism. Whatever position is taken, that debate concerns Gaudapada’s early Advaita argument, not proof that the twelve-mantra Upanishad itself is a Buddhist composition.',
        'The combined Upanishad-Karika tradition became decisive for later Advaita because Shankara’s commentary receives both as one pedagogical sequence while preserving the formal distinction between shruti and explanatory verse.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s Mandukya commentary is among the classic foundations of Advaita. Madhva and later Vedanta interpreters accept the Upanishad while rejecting Advaita conclusions drawn from turiya and the Karika.',
        'The text’s extraordinary reputation led to the later saying that Mandukya alone can be sufficient for liberation. That statement belongs to reception history; historically, the Upanishad became powerful because twelve mantras were amplified through Gaudapada, Shankara and centuries of contemplative interpretation.',
        'Modern discussions of consciousness frequently invoke the four states, but the original text is a Vedic meditation on self and Om rather than an experimental psychology.'
      ]}
    ],sources:merge(D['Upaniṣad:Māṇḍūkya']?.sources,[W('Mandukya Upanishad','https://en.wikipedia.org/wiki/Mandukya_Upanishad','Twelve mantras, four states, Om and Gaudapada Karika distinction.'),OL,DE,RAD,'Gaudapada, Mandukya Karika with Shankara Bhashya'])
  });
})();