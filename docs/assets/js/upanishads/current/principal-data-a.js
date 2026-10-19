(() => {
  const R=window.SCRIPTURE_PRINCIPAL_RICH=window.SCRIPTURE_PRINCIPAL_RICH||{};
  const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
  const href=file=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
  const baseRefs=(wiki)=>[
    {t:'Wikipedia',d:'Article survey, structure, manuscript history and bibliography.',u:wiki},
    {t:'Patrick Olivelle, The Early Upanishads',d:'Critical translation, textual notes and relative chronology.'},
    {t:'Paul Deussen, Sixty Upanishads of the Veda',d:'Translation and comparative discussion of the principal Upanishads.'},
    {t:'Robert Ernest Hume, The Thirteen Principal Upanishads',d:'Translation, introduction and notes.'},
    {t:'S. Radhakrishnan, The Principal Upanishads',d:'Translation and philosophical notes.'},
    {t:'SanskritDocuments',d:'Sanskrit e-text used to check divisions and mantra numbering.',u:'https://sanskritdocuments.org/doc_upanishhat/'},
    {t:'Muktika Upanishad',d:'Traditional 108-name canon and Vedic associations.',u:'https://sanskritdocuments.org/doc_upanishhat/muktika.html'}
  ];
  R['Aitareya']={
    title:'Aitareya Upanishad',deva:'ऐतरेयोपनिषद्',date:'c. 7th–6th century BCE',type:'Mukhya Upanishad',veda:'Rigveda',school:'Aitareya tradition',setting:'Aitareya Aranyaka 2.4–2.6',structure:'3 chapters; 33 sections/verses in common editions',muktika:'No. 8',commentators:'Shankara; later Vedanta commentators',famous:'Prajnanam brahma',
    image:{src:commons('Aitareya Upanishad, Sanskrit, Rigveda, Devanagari script, 1865 CE manuscript.jpg'),href:href('Aitareya Upanishad, Sanskrit, Rigveda, Devanagari script, 1865 CE manuscript.jpg'),cap:'Aitareya Upanishad, Rigvedic Devanagari manuscript copied in 1865. Wikimedia Commons.'},
    lead:[
      ['The Aitareya Upanishad is one of the oldest prose Upanishads of the Rigveda. It belongs to the Aitareya Aranyaka and moves in three compact chapters from a creation account centred on Atman, through the problem of embodiment and human birth, to the celebrated declaration that consciousness itself is Brahman.',[1,2,4]],
      ['Its language is still close to the ritual and speculative world of the late Veda. Rather than beginning from an abstract metaphysical system, it asks how the faculties enter the body, what makes a human being alive, how the self is present through birth and death, and what principle makes experience possible at all.',[2,3]],
      ['Later Vedanta gave special importance to the final formula prajnanam brahma, “consciousness is Brahman,” one of the four mahavakyas selected in later Advaita tradition. The earlier chapters, however, are equally important because they show how that conclusion emerges from a reflection on creation, hunger, bodily life and cognition.',[3,5,7]]
    ],
    sections:[
      {t:'Date and textual setting',ps:[
        ['The Aitareya belongs to the oldest layer of Upanishadic prose and is normally placed in the early first millennium BCE. Exact dating is impossible because the text preserves no historical date; chronology is inferred from language, ritual background and comparison with Brihadaranyaka, Chandogya and other early prose Upanishads.',[2,4]],
        ['The Upanishad is not originally an independent book. It is embedded in the Aitareya Aranyaka of the Rigveda, conventionally identified with chapters 4–6 of the Aranyaka’s second book. This setting matters because the movement from ritual symbolism to speculation on the self is part of the Aranyaka literary environment.',[1,3]],
        ['Traditional literature associates the Aitareya corpus with Mahidasa Aitareya. Modern historical study distinguishes that traditional attribution from the layered composition and transmission of the surviving Vedic text.',[1,4]]
      ]},
      {t:'Chapter 1 — creation from the Self',subs:[
        {h:'The Self alone',ps:[['The opening imagines Atman as the sole reality before the differentiated world. From the Self arise the worlds, their guardians, the cosmic person and the organs through which experience becomes possible. The order is not a modern physical cosmology; it is a speculative account of how a world becomes inhabitable and intelligible.',[2,3]]]},
        {h:'The deities enter the body',ps:[['Speech, breath, sight, hearing, skin, mind and the reproductive power are linked with divine powers and seek a suitable dwelling. The human form becomes the place in which these powers can operate together. Hunger and thirst accompany them, reminding the reader that embodied existence is dependency as well as consciousness.',[3,4]]]},
        {h:'The entry of the Self',ps:[['A body furnished with faculties is still not a living knower until the Self enters. The text asks through which opening this entry occurs and presents the head as the decisive point. The purpose is to distinguish the living subject from the mere collection of organs.',[2,5]]]},
        {h:'Recognition',ps:[['Having entered, the Self sees the differentiated beings and recognizes the deepest reality through them. The chapter therefore ends not with creation as an event safely in the past but with recognition: the source of the world is also the principle present in the knower.',[2,3]]]}]},
      {t:'Chapter 2 — the three births',ps:[
        ['The second chapter compresses a theory of human continuity into the image of three births. The first is conception, where the future person is carried in the father and then placed in the mother. The second is ordinary birth, when the child emerges and becomes a social and ritual person.',[3,4]],
        ['The third birth occurs through death and continuity beyond one embodied life. The discussion joins biological generation, household continuity and the older Vedic concern with rebirth. It also preserves the striking figure of the seer Vamadeva, who is said to have known the succession of births while still in the womb.',[2,3]],
        ['The point is not simply a theory of reproduction. The chapter asks how identity persists through radically different bodily stages and uses inherited Vedic family language to lead back toward the self that is not exhausted by any one body.',[2,5]]
      ]},
      {t:'Chapter 3 — consciousness as Brahman',ps:[
        ['The final chapter asks what exactly is the Self that has been discussed throughout the work. Is it sight, hearing, speech, taste, mind, memory, desire or another faculty? The answer treats the many operations of cognition as names or manifestations of a more fundamental consciousness.',[2,4]],
        ['The text gathers intelligence, perception, understanding, insight, memory, resolve and related capacities under prajna. The celebrated conclusion prajnanam brahma identifies Brahman not with one object known by consciousness but with the principle of awareness through which knowing occurs.',[3,5]],
        ['Later schools disagree over how strongly this sentence supports identity between the individual self and the supreme. Its historical importance lies precisely in the fact that one terse Upanishadic statement could become a central point of debate across competing Vedantic metaphysics.',[3,5]]
      ]},
      {t:'Commentaries and influence',ps:[
        ['Shankara’s Aitareya Bhashya made the text an important Advaita scripture and reads the creation sequence pedagogically rather than as a doctrine that compromises the nondual Self. Later Vedantic authors cite the same passages when debating the relation between consciousness, individual self and Brahman.',[5]],
        ['The Aitareya also remains important for the history of Vedic thought because it shows the transition from an Aranyaka environment into explicitly Upanishadic inquiry. Its questions about consciousness, embodiment and birth are not marginal additions to ritual literature; they reveal how late-Vedic speculation transformed the meaning of the ritual person from within.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Aitareya_Upanishad')
  };

  R['Kauṣītaki']={
    title:'Kaushitaki Upanishad',deva:'कौषीतक्युपनिषद्',date:'Early first millennium BCE',type:'Mukhya / Principal Upanishad',veda:'Rigveda',school:'Kaushitaki / Shankhayana',setting:'Kaushitaki Aranyaka',structure:'4 prose chapters; common counts 6, 15, 9, 20 units',muktika:'No. 25',commentators:'Shankarananda; Vedanta citation tradition',famous:'Prana and consciousness',
    image:{src:commons('Aitareya Brahmana, pages 1r 1v 2r 2v, folio 3a, Schoenberg Center manuscript, Penn Library.jpg'),href:href('Aitareya Brahmana, pages 1r 1v 2r 2v, folio 3a, Schoenberg Center manuscript, Penn Library.jpg'),cap:'Rigvedic manuscript folios from the late-Vedic textual world in which the Kaushitaki Upanishad was transmitted. Penn Libraries / Wikimedia Commons.'},
    lead:[
      ['The Kaushitaki Upanishad is an early Rigvedic prose Upanishad attached to the Kaushitaki, also called Shankhayana, tradition. Its four chapters are unusually varied: the first follows the soul after death, the second develops meditations on prana, and the third and fourth preserve powerful dialogues about consciousness, agency and the Self.',[1,3,4]],
      ['The work is especially valuable because it provides an independent Rigvedic version of questions also found in Chandogya and Brihadaranyaka: what survives death, whether prana or consciousness is primary, how ritual knowledge becomes inward knowledge, and why the knowing subject cannot be reduced to one sense faculty.',[2,3]],
      ['Its manuscript history is less uniform than that of some better-known Upanishads. Different witnesses place the four chapters at different points inside the Kaushitaki Aranyaka, which is one reason older scholarship paid close attention to its transmission.',[1,3]]
    ],
    sections:[
      {t:'Text, manuscripts and place in the Aranyaka',ps:[
        ['The Kaushitaki Aranyaka contains fifteen chapters, but the four Upanishadic chapters are not numbered identically in every manuscript tradition. Common arrangements place them as chapters 3–6 or at other positions in the Aranyaka. Paul Deussen already emphasized that this variation may reflect the way an Upanishadic unit was inserted into differently transmitted Aranyaka collections.',[1,3]],
        ['The four chapters are prose and have their own internal coherence even though their subject matter changes sharply. The manuscript evidence therefore supports two facts at once: the text belongs to a Rigvedic school collection, and it could also circulate conceptually as a recognizable Upanishadic treatise.',[1,4]],
        ['A Persian translation was reportedly made in the early modern period, though the Sanskrit witness behind it is lost. Major nineteenth- and early twentieth-century translations by Cowell, Muller, Deussen and Hume helped establish the Upanishad in modern comparative study.',[1,4]]
      ]},
      {t:'Chapter 1 — the journey after death',ps:[
        ['The first chapter asks what happens to a knower after death. It describes a path through cosmic stations and culminates in an encounter with Brahman. The itinerary shares motifs with other early Upanishadic path doctrines but preserves its own Rigvedic formulation.',[2,4]],
        ['The dead person is tested through knowledge rather than merely carried by ritual merit. Identity, memory and the ability to answer who one truly is become central. The journey therefore turns eschatology into a philosophical question about the knower.',[3,4]],
        ['The chapter also links cosmic travel with the older ritual universe of the Veda. Sun, moon, seasons and divine powers remain present, but they are reorganized as stations in the destiny of a person whose knowledge determines the outcome.',[2,3]]
      ]},
      {t:'Chapter 2 — Prana as the integrating life-power',subs:[
        {h:'Prana and the faculties',ps:[['The second chapter develops meditations in which prana, vital breath or life-power, becomes the integrating centre of bodily faculties. Speech, sight and hearing are indispensable, yet embodied life collapses when the sustaining prana departs.',[2,3]]]},
        {h:'Daily life becomes meditation',ps:[['Ordinary acts such as waking, eating and breathing are interpreted as occasions for contemplative knowledge. This is a characteristic Upanishadic transformation: ritual correspondence is not simply rejected, but relocated into the living body.',[3,4]]]},
        {h:'Prana and Brahman',ps:[['The text repeatedly pushes beyond the merely physiological meaning of breath. Prana becomes a name for the power through which the living person functions, preparing the later dialogue in which prana and consciousness are deliberately brought together.',[2,3]]]}]},
      {t:'Chapter 3 — Indra and Pratardana',ps:[
        ['King Pratardana reaches the world of Indra and is invited to choose a boon. Instead of requesting an ordinary reward, he asks Indra to choose what is truly best for a human being. The result is one of the Upanishad’s most philosophically dense teachings.',[2,4]],
        ['Indra declares that prana and the conscious self must be known together. Speech by itself does not know that it speaks, the eye does not know that it sees, and the ear does not know that it hears. A coordinating conscious principle is therefore prior to the isolated operation of the senses.',[2,3]],
        ['The dialogue became important in later Vedanta because phrases identifying prana, consciousness and the divine speaker can be read in more than one way. The Brahma Sutras and later commentators debate whether particular terms refer to the individual life-power, the conscious self, or the supreme Brahman.',[3,5]]
      ]},
      {t:'Chapter 4 — Balaki and Ajatashatru',ps:[
        ['The fourth chapter tells how Balaki Gargya approaches King Ajatashatru claiming knowledge of Brahman. Balaki identifies Brahman successively with cosmic persons in the sun, moon, lightning and other powers. The king rejects each as incomplete.',[2,4]],
        ['The narrative reverses the expected hierarchy between Brahmin teacher and royal student. Ajatashatru finally becomes the instructor and uses the condition of a sleeping person to ask where consciousness goes when ordinary cognition ceases.',[2,3]],
        ['The analysis of sleep distinguishes the Self from the active senses without reducing it to unconsciousness. When the person wakes, differentiated cognition resumes from a principle that remained present through the withdrawal of the faculties.',[2,3]],
        ['Close parallels with Brihadaranyaka show that both works preserve material from a wider early-Upanishadic debate about sleep, consciousness and royal knowledge. The differences between their versions are themselves evidence of oral and school-based transmission.',[2,4]]
      ]},
      {t:'Reception and importance',ps:[
        ['The Kaushitaki never achieved the same popular fame as Katha or Isha, but its importance to Vedanta is disproportionate to its modern visibility. The Pratardana dialogue and its language about prana and consciousness are repeatedly used in exegetical debates.',[3,5]],
        ['For historians of the Upanishads, the text is also a reminder that the principal corpus was never a single centrally edited book. Different Vedic schools preserved related questions in different literary settings, and the Kaushitaki is one of the clearest surviving examples of that plurality.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Kaushitaki_Upanishad')
  };

  R['Kaṭha']={
    title:'Katha Upanishad',deva:'कठोपनिषद्',date:'c. 5th–1st century BCE',type:'Mukhya Upanishad',veda:'Krishna Yajurveda',school:'Katha school',setting:'Katha / Krishna Yajurveda tradition',structure:'2 adhyayas; 6 vallis',muktika:'No. 3',commentators:'Shankara, Madhva, Rangaramanuja',famous:'Shreyas and preyas; chariot allegory',
    image:{src:commons('Katha Upanishad, Sanskrit, Grantha script, Whish Manuscript Collection acquired 1836 CE.jpg'),href:href('Katha Upanishad, Sanskrit, Grantha script, Whish Manuscript Collection acquired 1836 CE.jpg'),cap:'Katha Upanishad palm-leaf manuscript in Grantha script, Whish Collection, acquired 1836. Wikimedia Commons.'},
    lead:[
      ['The Katha Upanishad is one of the great philosophical poems of the Upanishadic corpus. Its teaching is framed as a dialogue between the boy Nachiketas and Yama, lord of death. Because the student’s central question is what remains when a person dies, doctrines of Self, immortality, discipline and the highest good emerge organically from a narrative rather than as a scholastic list.',[1,2,4]],
      ['The work is arranged in two adhyayas, each containing three vallis. Its language is later than the oldest prose Upanishads, and several verses have close parallels elsewhere in early Indian literature. This has produced a wide range of scholarly dates, but there is broad agreement that Katha belongs to the mature pre-classical Upanishadic period.',[1,2,3]],
      ['Later traditions loved the text for its memorable images: the good and the merely pleasant, the body as a chariot, the senses as horses, the inward ascent beyond mind and intellect, and the image of the ancient Self hidden in the cave of the heart.',[3,5]]
    ],
    sections:[
      {t:'Date, form and literary character',ps:[
        ['Katha is a metrical Upanishad. Compared with Brihadaranyaka or Chandogya, its teaching is much more deliberately poetic and architectonic. Scholars normally place it after the oldest prose texts, though proposed absolute dates range widely from the middle first millennium BCE into its later centuries.',[1,2]],
        ['The received work has six vallis grouped as two chapters. The first chapter tells the Nachiketas story and establishes the principal philosophical problem; the second intensifies the inquiry into the Self, cosmic hierarchy and liberation.',[1,4]],
        ['Its association is with the Katha school of the Krishna Yajurveda. The fact that the surviving Upanishad is polished poetry does not mean it stands outside Vedic tradition: its imagery, sacrificial background and concern with the destiny after death remain deeply continuous with that world.',[2,3]]
      ]},
      {t:'First valli — Nachiketas goes to Death',ps:[
        ['The story begins with Vajashravasa performing a sacrifice in which all possessions are to be given away. His son Nachiketas notices that the cows being offered are old and useless, and asks repeatedly to whom he himself will be given. In anger his father says, “I give you to Death.”',[3,4]],
        ['Nachiketas reaches the house of Yama and waits for three nights without hospitality. To repair the breach, Yama grants three boons. The first restores peace with his father; the second concerns the fire sacrifice leading to heaven; the third asks the question that drives the entire Upanishad: when a person dies, does something remain or not?',[2,4]],
        ['Yama initially refuses. He offers wealth, long life, descendants, vehicles, music and pleasures instead. Nachiketas rejects them because every finite pleasure is exhausted and because no abundance can answer the question of death.',[2,3]]
      ]},
      {t:'Second valli — shreyas and preyas',ps:[
        ['Yama distinguishes shreyas, the genuinely good, from preyas, the immediately pleasant. Both confront the human being, but choosing the pleasant for its own sake leads away from the difficult knowledge sought by Nachiketas.',[2,5]],
        ['The teaching is not hostility to every pleasure. The contrast is about criteria of choice: whether one judges life by what satisfies desire now or by what reveals a reality not destroyed when desirable objects disappear.',[3,5]],
        ['The Self is described as difficult to hear, difficult to understand and not reached by mere argument. A qualified teacher and a student with unusual steadiness are therefore part of the epistemology of the text, not decorative features of its story.',[2,3]]
      ]},
      {t:'Third valli — the chariot and the inward hierarchy',ps:[
        ['The famous chariot allegory maps the embodied person onto a disciplined vehicle: the body is the chariot, the Self the lord of the chariot, intellect the charioteer, mind the reins and the senses the horses. Sense objects are the roads over which the horses travel.',[3,4]],
        ['The allegory explains why liberation requires coordination rather than the destruction of embodied faculties. Bad reins and an untrained driver produce wandering; a discerning intellect and controlled mind allow the traveller to reach the end of the road.',[3,5]],
        ['The chapter then places sense objects, senses, mind, intellect, the great Self and the unmanifest in an ascending hierarchy that culminates in Purusha. Later Samkhya, Yoga and Vedanta traditions drew on this language while interpreting the hierarchy in different metaphysical ways.',[2,3]]
      ]},
      {t:'Second adhyaya — the inward Self and liberation',subs:[
        {h:'The outward-turning senses',ps:[['The senses are said to have been fashioned outward, so ordinary beings look away from the inner Self. The rare seeker reverses that movement and searches within for immortality. The contrast gives the text one of its clearest accounts of contemplative inwardness.',[2,5]]]},
        {h:'The person in the heart',ps:[['The Self is described as ancient, minute yet greater than the great, hidden in the cave of the heart. Such paradoxes prevent the reader from treating it as one more physical object with measurable size.',[2,3]]]},
        {h:'The cosmic tree',ps:[['The image of an upside-down ashvattha tree with roots above and branches below expresses dependence of the manifest world upon a higher principle. The image later reappears in the Bhagavad Gita in a different literary setting.',[3,4]]]},
        {h:'When desires fall away',ps:[['Liberation is expressed through a transformation of desire: when the desires lodged in the heart fall away, the mortal becomes immortal. Knowledge therefore has an existential meaning; it changes what the person takes to be necessary for completeness.',[2,5]]]}]},
      {t:'Commentarial traditions and influence',ps:[
        ['Shankara’s commentary made Katha central to Advaita, but Madhva and Vishishtadvaita traditions also interpret the text in detail. The same words—Self, Purusha, avyakta, intellect—are therefore embedded in sharply different accounts of divine supremacy, individual identity and liberation.',[5]],
        ['Modern readers often isolate the chariot or “arise, awake” verses as inspirational sayings. In the Upanishad itself they belong to a sustained argument about death: disciplined life matters because the human person is seeking a good that cannot be taken away by the death that destroys ordinary possessions.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Katha_Upanishad')
  };

  R['Taittirīya']={
    title:'Taittiriya Upanishad',deva:'तैत्तिरीयोपनिषद्',date:'c. 6th century BCE',type:'Mukhya Upanishad',veda:'Krishna Yajurveda',school:'Taittiriya',setting:'Taittiriya Aranyaka, chapters 7–9',structure:'3 vallis: Shiksha, Brahmananda, Bhrigu',muktika:'No. 7',commentators:'Shankara, Madhva, Rangaramanuja; Sureshvara',famous:'Satyam jnanam anantam brahma',
    image:{src:commons('Screenshot Taittiriya Upanishad.jpg'),href:href('Screenshot Taittiriya Upanishad.jpg'),cap:'Taittiriya Upanishad 1.1–1.2 in Sanskrit and Devanagari. Wikimedia Commons.'},
    lead:[
      ['The Taittiriya Upanishad belongs to the Taittiriya school of the Krishna Yajurveda and is preserved in the Taittiriya Aranyaka. Its three vallis are strikingly different yet carefully complementary: the first begins with phonetics, recitation and student discipline; the second asks what Brahman and the human person are; the third turns philosophical doctrine into an experiential inquiry undertaken by Bhrigu.',[1,2,4]],
      ['The work is famous for the formula satyam jnanam anantam brahma, for the layered account often called the five koshas, for its extraordinary calculation of degrees of bliss, and for the convocation instructions telling a departing student how truth, duty, study, generosity and respect should govern adult life.',[3,5]],
      ['Taittiriya therefore resists the modern division between “ritual Veda” and “philosophical Upanishad.” Correct sound, teacher-student transmission, ethical life, food, breath, mind, knowledge and bliss all belong to one ascending inquiry into what sustains a human being.',[2,3]]
    ],
    sections:[
      {t:'Textual setting and the three vallis',ps:[
        ['The Upanishad is transmitted as three chapters of the Taittiriya Aranyaka, normally chapters 7, 8 and 9. They are conventionally called the Shiksha Valli, Brahmananda or Ananda Valli, and Bhrigu Valli.',[1,4]],
        ['Differences of style between the three sections have encouraged discussion of compositional layering. The first retains a strong educational and recitational setting, while the second and third are more overtly metaphysical. The received tradition nevertheless treats them as one Upanishad.',[2,3]],
        ['Its Krishna Yajurvedic home is crucial. Taittiriya is not simply a later philosophical essay attached to the Veda; its questions grow out of a school in which correct recitation, ritual competence and disciplined transmission were themselves sacred practices.',[2,4]]
      ]},
      {t:'Shiksha Valli — recitation, study and ethical life',subs:[
        {h:'Sound as sacred discipline',ps:[['The opening invokes peace between teacher and student and immediately turns to shiksha: sound, accent, quantity, strength, articulation and combination. The concern with phonetics is spiritual as well as technical because Vedic revelation exists through exact embodied recitation.',[3,4]]]},
        {h:'Meditative correspondences',ps:[['Several lessons connect syllables and acts of recitation with cosmic, bodily and social correspondences. The older Vedic habit of discovering hidden links between domains remains fully alive inside this Upanishad.',[2,3]]]},
        {h:'Convocation address',ps:[['The famous closing instruction tells the departing student to speak truth, practise dharma, continue study, honour mother, father, teacher and guest, and give with discernment. Knowledge of Brahman is therefore not presented as permission to abandon ordinary ethical obligations.',[3,5]]]},
        {h:'How to act when in doubt',ps:[['When uncertain about conduct, the graduate is told to observe thoughtful, disciplined and non-harsh Brahmins who are devoted to dharma. The passage gives an unusually concrete picture of moral reasoning within a Vedic educational community.',[3,5]]]}]},
      {t:'Brahmananda Valli — Brahman and the layered person',ps:[
        ['The second valli opens with the celebrated definition: Brahman is truth, knowledge and infinity. The knower of that Brahman is said to attain the highest, but the text immediately asks how the human person can be led toward such knowledge.',[3,5]],
        ['Its answer is a sequence of nested selves or layers: the person made of food, then of prana, mind, understanding and bliss. Later tradition popularized these as the five koshas or “sheaths.” In the text itself the method is progressive: each apparently complete identity is discovered to depend upon something subtler.',[2,3]],
        ['Food is treated with extraordinary seriousness because all embodied beings arise from food and return to it. Prana is more inward than food, mind more inward than prana, and understanding more inward than mind. The movement is neither contempt for the body nor simple psychology; it is a pedagogy of dependence.',[2,4]],
        ['The inquiry culminates in ananda, bliss. A famous passage imagines a perfectly flourishing human joy and then multiplies it through ascending orders of beings, only to subordinate all finite measures of happiness to Brahman-bliss.',[3,5]]
      ]},
      {t:'Bhrigu Valli — inquiry through experience',ps:[
        ['Bhrigu approaches his father Varuna asking to know Brahman. Varuna does not give a final definition. He names food, breath, sight, hearing, mind and speech and tells Bhrigu to seek through tapas, disciplined concentration and inquiry.',[2,4]],
        ['Bhrigu successively identifies Brahman with food, prana, mind, understanding and bliss. Each insight is real but incomplete, so he returns repeatedly to inquiry. The literary form is important: the student is not handed the hierarchy as a finished chart but discovers its limitations through contemplation.',[2,3]],
        ['The valli ends with teachings that honour food, hospitality and abundance. The apparent return from transcendental bliss to food is deliberate. Realization does not leave the material world meaningless; food is now seen as a manifestation of the same sustaining reality.',[3,5]]
      ]},
      {t:'Commentaries and Vedantic debates',ps:[
        ['Shankara’s Taittiriya Bhashya is one of the major Advaita commentaries, and Sureshvara’s varttika develops it at enormous length. Madhva and Rangaramanuja traditions likewise read the text as authoritative shruti while rejecting Advaita interpretations of identity and the fivefold progression.',[5]],
        ['The phrase satyam jnanam anantam brahma became a major battlefield in Vedantic semantics. Are truth, knowledge and infinity three attributes of Brahman, three terms removing limiting misconceptions, or indicators of one indivisible reality? Different schools answer differently because the grammar of one short Upanishadic sentence has major metaphysical consequences.',[3,5]],
        ['The five-kosha model also had a long afterlife in Vedanta and modern yoga literature. Historically, however, it is safest to read the later “sheath” system back through the actual sequence of the Upanishad rather than replacing the text with a simplified diagram.',[2,3]]
      ]}
    ],refs:baseRefs('https://en.wikipedia.org/wiki/Taittiriya_Upanishad')
  };
})();