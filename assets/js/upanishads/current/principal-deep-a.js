(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Upaniṣad:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const OL='Patrick Olivelle, The Early Upanishads: Annotated Text and Translation';
  const DE='Paul Deussen, Sixty Upanishads of the Veda';
  const RAD='S. Radhakrishnan, The Principal Upanishads';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});

  put('Aitareya',{
    sanskritTitle:'ऐतरेयोपनिषद्',traditionalAuthor:'Aitareya tradition',language:'Vedic Sanskrit prose',period:'c. 6th–5th centuries BCE',extent:'3 chapters, commonly divided into 5 sections and 33 passages; embedded in Aitareya Aranyaka 2.4–2.6',
    leadParagraphs:[
      'The Aitareya Upanishad is the principal philosophical text of the Aitareya branch of the Rigveda. It is short, but its argument moves across an unusually large field: the emergence of the worlds, the creation of the cosmic powers and bodily faculties, the entry of consciousness into embodied life, human birth, and finally the declaration that consciousness itself is Brahman.',
      'Its famous formula prajnanam brahma—“consciousness is Brahman”—does not appear as an isolated slogan. It is the conclusion of a sequence in which the text repeatedly asks what makes a living person more than a collection of organs. Sight, speech, hearing and breath are all functional powers; the self is the conscious principle by which they become a lived world.'
    ],articleSections:[
      {title:'Date and Vedic setting',paragraphs:[
        'The Upanishad is generally placed in the sixth or fifth century BCE, after the oldest layers of the Brihadaranyaka and Chandogya but still within the pre-Buddhist prose Upanishadic period. Its language remains close to the Aranyaka and Brahmana world rather than to later systematic Vedanta.',
        'It is not an independent book in its earliest textual setting. The work occupies part of the Aitareya Aranyaka of the Rigveda, and its three chapters continue a school tradition in which ritual speculation is gradually turned toward the person, consciousness and the origin of experience.',
        'The name Aitareya belongs to the Vedic school tradition. Later printed Upanishad collections extract these chapters from the Aranyaka, but the embedded position explains the text’s mixture of cosmology, ritual symbolism and inquiry into the self.'
      ]},
      {title:'The three chapters',books:[
        {number:1,title:'Creation from the Self',summary:'The Self alone exists at the beginning. It projects the worlds and their guardians; the divine powers seek suitable abodes and enter the human body as speech, breath, sight, hearing, skin, mind and generative power. Food is created, but none of the faculties can seize it until apana takes it in. The Self then enters the body, making embodied consciousness possible.'},
        {number:2,title:'The three births',summary:'Human existence is described through conception, gestation, birth and the continuation of the father through the son. The discussion joins biological reproduction to the Vedic concern with lineage and immortality, while also preparing the question of what is truly born and reborn.'},
        {number:3,title:'Who is the Self?',summary:'The final chapter asks which principle should be worshipped as the Self. The answer moves through the powers of cognition and identifies the conscious knower—prajnana—as the reality through which perception, memory, desire, thought and knowledge occur. It culminates in prajnanam brahma.'}
      ]},
      {title:'Creation and embodiment',paragraphs:[
        'The first chapter is not a creation myth in which a finished deity manufactures a world from outside. The Self differentiates itself into worlds, powers and bodily locations. The macrocosm and the human organism therefore mirror one another: fire enters as speech, the sun as sight, the quarters as hearing, plants as hair, the moon as mind, death as apana and water as generative seed.',
        'The gods’ search for an adequate body is a major part of the argument. Cow and horse are rejected; the human form is accepted as a fitting habitation. The passage gives the human body a cosmological dignity without making the body itself the final self.',
        'The dramatic moment is the Self’s own entry. The faculties can perform their individual functions, but the living person becomes a unified knower only when the conscious Self enters. The text then asks through which opening it entered, a question later traditions connect with the crown and the “door of bliss.”'
      ]},
      {title:'The three births and human life',paragraphs:[
        'The second chapter describes the father’s seed as containing the gathered essence of the body, the mother’s protection of the embryo and the son as the continuation of the father. This material is often read too quickly as primitive embryology; within the Upanishad it is an argument about continuity, identity and the Vedic problem of overcoming death through offspring.',
        'A person is said to have three births: first in the father as seed, second from the mother, and a third in the continuation of the line after death. The framework belongs to householder religion, but the Upanishad’s next chapter redirects the search for immortality from lineage toward knowledge of the conscious Self.'
      ]},
      {title:'Prajnanam brahma',paragraphs:[
        'The final inquiry lists perception, understanding, discrimination, memory, will, desire and other cognitive powers, then says that these are names of prajnana. Consciousness is not one additional faculty placed beside sight or hearing; it is the condition in which the faculties are known and coordinated.',
        'The sentence prajnanam brahma became one of the four mahavakyas in later Advaita organization. Other Vedanta traditions accept the verse as shruti while interpreting the relation between the individual knower and Brahman differently. The sentence’s original force is best read in the complete chapter: the text is answering the question “who is this Self whom we worship?”',
        'The Upanishad closes by saying that the knower, having risen beyond this world, obtains all desires in the heavenly world and becomes immortal. Liberation is therefore presented as knowledge of the conscious ground rather than merely as survival of the body.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara wrote a substantial commentary that reads the creation sequence as a teaching whose purpose is knowledge of the nondual Self rather than cosmology for its own sake. His explanation of prajnanam brahma became decisive for Advaita.',
        'Madhva and later Vedanta commentators retain the authority of the Upanishad while resisting an Advaita equation of the finite self with Brahman. The same brief text therefore became a useful test case for how different schools understand the relation between consciousness, jiva and the supreme Lord.',
        'Modern translations by S. Sitarama Sastri, Radhakrishnan, Olivelle and others often print the text separately, but scholarly editions continue to identify its precise place in the Aitareya Aranyaka.'
      ]}
    ],sources:merge(D['Upaniṣad:Aitareya']?.sources,[W('Aitareya Upanishad','https://en.wikipedia.org/wiki/Aitareya_Upanishad','Three chapters, 33 passages, chronology and principal teaching.'),OL,DE,RAD,'Aitareya Aranyaka Sanskrit editions','Shankara, Aitareyopanishadbhashya'])
  });

  put('Kauṣītaki',{
    sanskritTitle:'कौषीतक्युपनिषद् / कौषीतकिब्राह्मणोपनिषद्',traditionalAuthor:'Kaushitaki / Shankhayana school',language:'Vedic Sanskrit prose',period:'c. 6th–5th centuries BCE',extent:'4 chapters; chapter numbering varies in manuscripts of the Kaushitaki Aranyaka',primaryRecensions:['Kaushitaki / Shankhayana Aranyaka transmission with differing chapter numbering'],
    leadParagraphs:[
      'The Kaushitaki Upanishad is a Rigvedic prose Upanishad belonging to the Kaushitaki or Shankhayana school. Its four chapters connect the fate of the soul after death, the primacy of prana, the identity of the conscious subject, and several dialogues in which kings or gods overturn the assumptions of learned Brahmins.',
      'The work is less famous than Brihadaranyaka or Chandogya, but it preserves an independent Rigvedic route into the same early Upanishadic questions. Its teaching does not begin with a single metaphysical formula; it repeatedly asks what remains constant when individual sensory functions change, sleep, withdraw or cease.'
    ],articleSections:[
      {title:'Date and place in the Rigveda',paragraphs:[
        'The Kaushitaki is generally placed in the sixth or fifth century BCE, after the earliest Brihadaranyaka and Chandogya strata and broadly near Aitareya and Taittiriya. Its prose is archaic enough to belong to the early Upanishadic period and its social world remains closely tied to Vedic ritual culture.',
        'The text forms four chapters of the Kaushitaki or Shankhayana Aranyaka, but manuscripts do not number those chapters uniformly. In some witnesses the Upanishad is chapters 1–4; in others it is embedded as chapters 6–9 or under still different numbering. This is a manuscript-organization problem, not evidence for several unrelated Kaushitaki Upanishads.',
        'The varying placement is important because it shows how an Upanishadic teaching could be incorporated into an Aranyaka corpus and later circulate as a named independent text.'
      ]},
      {title:'The four chapters',books:[
        {number:1,title:'The path after death',summary:'Citra Gangyayani questions Shvetaketu and his father about the route of the dead. The teaching describes passage to the moon, rebirth for those who return, and an ascent through divine worlds for the knower.'},
        {number:2,title:'Prana and ritual interiorization',summary:'Prana is praised as the chief life-power. Daily actions and older sacrificial ideas are reinterpreted through the vital functions of the person, bringing ritual into the body.'},
        {number:3,title:'Indra and Pratardana',summary:'King Pratardana receives a boon from Indra and is told to know Indra as prana and conscious self. The chapter repeatedly redirects attention from perceived objects to the subject who sees, hears, speaks and knows.'},
        {number:4,title:'Balaki and Ajatashatru',summary:'The learned Balaki offers a series of inadequate identifications of Brahman with cosmic persons. King Ajatashatru finally teaches through the phenomenon of deep sleep, asking where the conscious person has gone when the faculties no longer operate outwardly.'}
      ]},
      {title:'The path of the dead',paragraphs:[
        'The first chapter belongs to the early Upanishadic development of the two-path doctrine. The moon is not simply a heavenly destination; it becomes a gate in a larger account of how knowledge, ritual and rebirth determine post-mortem destiny.',
        'The ascending knower passes through increasingly elevated divine stations before reaching Brahman. Similar material occurs in Chandogya and Brihadaranyaka, but the Kaushitaki preserves its own sequence and imagery. These differences matter when reconstructing how the doctrine developed rather than assuming one original standardized map of the afterlife.'
      ]},
      {title:'Prana and consciousness',paragraphs:[
        'The second and third chapters make prana more than breathing. It is the integrating life-power without which the senses cannot function as a living unity. Yet the text also identifies the deepest prana with consciousness, preventing a merely physiological reading.',
        'Indra’s instruction to Pratardana is especially direct: one should not seek to know speech but the speaker, not sound but the hearer, not sight but the seer, not pleasure and pain but the experiencer. The Upanishad shifts inquiry from objects of awareness to the conscious subject.',
        'This move anticipates later Vedanta arguments about the witness, but the vocabulary remains early and fluid. Prana, prajna and atman overlap without being presented as the fully systematized categories of a later philosophical manual.'
      ]},
      {title:'Balaki and Ajatashatru',paragraphs:[
        'Balaki Gargya boasts that he will teach Brahman and successively identifies it with persons in the sun, moon, lightning, space, wind and other cosmic forms. Ajatashatru rejects each partial identification.',
        'The king then takes Balaki to a sleeping man. Calling to the sleeper produces no response; physical touch wakes him. The episode turns deep sleep into philosophical evidence: if the ordinary powers of cognition have withdrawn, where was the person who later awakens and remembers continuity?',
        'The reversal of roles is striking. A Kshatriya king instructs a learned Brahmin, just as kings teach Brahmins in several early Upanishads. The literary pattern reflects a wider Upanishadic willingness to locate decisive knowledge outside one conventional pedagogical hierarchy.'
      ]},
      {title:'Manuscripts, commentaries and reception',paragraphs:[
        'The different Aranyaka chapter numberings are the main structural manuscript problem. Paul Deussen and later editors compared these arrangements while preserving the four-chapter independent Upanishad.',
        'Shankara’s surviving corpus does not include a universally accepted commentary on every principal Upanishad under his name, and the Kaushitaki has a smaller classical commentary tradition than Chandogya or Brihadaranyaka. It nevertheless remained part of the principal-Upanishad canon in modern collections.',
        'Its value for scholarship is high because it preserves parallel early doctrines—prana, post-mortem paths, deep sleep and conscious subjectivity—in an independent Rigvedic school tradition.'
      ]}
    ],sources:merge(D['Upaniṣad:Kauṣītaki']?.sources,[W('Kaushitaki Upanishad','https://en.wikipedia.org/wiki/Kaushitaki_Upanishad','Four chapters, manuscript numbering, chronology and chapter contents.'),OL,DE,RAD,'Kaushitaki Aranyaka Sanskrit editions'])
  });

  put('Chāndogya',{
    sanskritTitle:'छान्दोग्योपनिषद्',traditionalAuthor:'Chandogya / Kauthuma Samaveda tradition',language:'Vedic Sanskrit prose',period:'c. 8th–6th centuries BCE',extent:'8 prapathakas (chapters), one of the largest principal Upanishads',
    leadParagraphs:[
      'The Chandogya Upanishad is one of the two oldest and largest Upanishads. It grows directly from Samavedic chant culture: its opening chapters meditate on udgitha, saman, syllable, breath, sun and sacrifice, while its later chapters contain some of the most famous philosophical narratives in Hindu scripture—Satyakama Jabala, Raikva, Uddalaka and Shvetaketu, Narada and Sanatkumara, the five fires, the small space in the heart and the repeated teaching tat tvam asi.',
      'The text is not a systematic treatise written from one philosophical viewpoint. Eight large chapters preserve many teachings, some ritual-symbolic, some cosmological, some ethical and some focused on self-knowledge. Its unity lies in a Samavedic habit of discovering hidden correspondences: sound can be read as cosmos, breath as sacrifice, heart as world, and the individual self as the point at which these correspondences become knowledge.'
    ],articleSections:[
      {title:'Date, formation and Samavedic setting',paragraphs:[
        'Substantial layers are commonly placed between the eighth and sixth centuries BCE, making Chandogya one of the earliest surviving Upanishads alongside Brihadaranyaka. The text is layered, and not every chapter need belong to the same moment.',
        'It belongs to the Kauthuma Samaveda and forms the Upanishadic continuation of the Chandogya Brahmana. The first chapters remain so close to chant, priestly roles and ritual symbolism that separating “philosophy” from “ritual” would misrepresent the composition.',
        'The later narrative chapters show a different literary world: kings, householders, students and wandering teachers debate rebirth, self, truth and the highest good. The compilation therefore preserves several stages of early Upanishadic thought.'
      ]},
      {title:'The eight prapathakas',books:[
        {number:1,title:'Prapathaka 1 — Udgitha and Om',summary:'Meditations on Om and the udgitha chant, conflicts between divine and demonic powers, prana as the invulnerable centre of the faculties, and correspondences among chant, sun and life.'},
        {number:2,title:'Prapathaka 2 — Saman, order and ways of life',summary:'The structure of saman is mapped onto worlds, seasons, animals, bodily processes and ritual; the chapter also contains an early formulation of several religious ways of life and the importance of disciplined conduct.'},
        {number:3,title:'Prapathaka 3 — Madhu, Gayatri and the inner person',summary:'Madhu-vidya interprets the sun as honey produced by cosmic relations; Gayatri becomes a symbol of the world; Shandilya-vidya teaches meditation on the inner self as Brahman.'},
        {number:4,title:'Prapathaka 4 — Raikva and Satyakama',summary:'Janashruti seeks the obscure sage Raikva and learns samvarga-vidya; Satyakama Jabala is accepted as a student because of his truthfulness and receives instruction from fire, animals and his teacher.'},
        {number:5,title:'Prapathaka 5 — Prana and the five fires',summary:'The faculties debate their superiority; prana proves indispensable. Pravahana Jaivali teaches the five-fires doctrine, the paths after death and the relation between cosmic processes and human birth.'},
        {number:6,title:'Prapathaka 6 — Uddalaka and Shvetaketu',summary:'Uddalaka teaches that Being alone was at first, explains creation through heat, water and food, and uses salt, seed, clay and other analogies to repeat tat tvam asi—“you are that”—to Shvetaketu.'},
        {number:7,title:'Prapathaka 7 — Narada and Sanatkumara',summary:'Narada lists a vast curriculum but admits sorrow. Sanatkumara leads him step by step from name, speech and mind through increasingly comprehensive realities to bhuman, fullness or the unlimited.'},
        {number:8,title:'Prapathaka 8 — Dahara and the self',summary:'The “small space” in the heart contains the worlds; the true self is free from age, death and sorrow. Indra and Virocana receive progressively deeper instruction from Prajapati about body, dream, deep sleep and the deathless self.'}
      ]},
      {title:'Tat tvam asi and Uddalaka’s teaching',paragraphs:[
        'The sixth chapter begins by challenging Shvetaketu’s pride after formal Vedic education. Uddalaka asks whether he learned the instruction by which the unheard becomes heard, the unthought thought and the unknown known. The question introduces a search for the underlying reality from which multiplicity can be understood.',
        'Clay and pots, gold and ornaments, iron and tools establish a recurring pattern: changing names and forms do not exhaust the underlying reality. Uddalaka then says that Being alone existed at first, “one without a second,” before differentiating into the elemental and embodied world.',
        'The refrain tat tvam asi is repeated after a series of concrete examples—seed, sap, salt dissolved in water, a person led blindfolded from Gandhara. Later Vedanta schools disagree over its grammatical and metaphysical force, but every serious interpretation has to account for the whole pedagogical sequence rather than treating the sentence as a freestanding motto.'
      ]},
      {title:'Satyakama, Raikva and the social world of knowledge',paragraphs:[
        'Satyakama Jabala cannot name his father because his mother does not know which man fathered him. Gautama accepts him as a student because he tells the truth without concealment, declaring that only a true Brahmana could speak with such honesty. The episode became a major traditional locus for discussions of truth, qualification and spiritual character.',
        'Raikva presents the opposite social image: the possessor of crucial knowledge is found beneath a cart rather than at a royal court. King Janashruti must approach him and be instructed. The Upanishad repeatedly destabilizes the assumption that status and information automatically equal liberating knowledge.'
      ]},
      {title:'Rebirth, the five fires and the paths after death',paragraphs:[
        'The fifth chapter’s five-fires teaching interprets heaven, rain, earth, man and woman as successive sacrificial fires through which beings move into birth. Cosmic process and human reproduction become one ritual sequence.',
        'The same teaching distinguishes the path of the gods from the path of the ancestors and from lower recurring forms of rebirth. Similar doctrines appear in Brihadaranyaka and Kaushitaki, but the differences in sequence and terminology show a doctrine still being developed across schools.',
        'Karma here is already tied to differentiated post-mortem destiny. Later Indian theories of rebirth become more systematized, but Chandogya preserves one of their earliest extensive Vedic formulations.'
      ]},
      {title:'Narada, Sanatkumara and bhuman',paragraphs:[
        'Narada arrives with an enormous list of learned subjects—Vedas, history, mathematics, omens, grammar, ritual and other sciences—yet says that he knows the mantras but not the Self and therefore remains in sorrow. The chapter sharply distinguishes accumulated learning from liberating knowledge.',
        'Sanatkumara does not dismiss learning. He leads Narada through an ordered ascent: name, speech, mind, intention, thought, meditation, understanding, strength, food, water, heat, space, memory, hope, prana and beyond. Each level is more comprehensive than the one before it.',
        'The culmination is bhuman, the fullness or unlimited reality in which there is no constricting otherness. The pedagogy is one of expansion: liberation comes not through possessing one more object of knowledge but through discovering the ground in which knower and world are no longer experienced as finite fragments.'
      ]},
      {title:'Dahara-vidya and the final self-teaching',paragraphs:[
        'The eighth chapter locates a “small lotus-like dwelling” in the city of Brahman, the body. Within it is a small space, dahara-akasha, yet that smallness contains heaven, earth, sun, moon and all worlds. The paradox makes inwardness cosmic rather than merely psychological.',
        'The Indra-Virocana story then tests possible identifications of the self. The reflected body is inadequate because it is injured when the body is injured. Dream is inadequate because the dreamer can suffer. Deep sleep is inadequate if it leaves no conscious distinction. Indra repeatedly returns for further instruction until Prajapati teaches the deathless self beyond bodily limitation.',
        'The chapter therefore closes the Upanishad by joining cosmology, psychology and liberation: the inward self is not a hidden miniature object but the deathless reality in which the worlds are grounded.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s Chandogya commentary is one of the foundational works of Advaita Vedanta. Ramanuja does not leave a separate bhashya on every Upanishad but repeatedly cites Chandogya in the Sri Bhashya and Vedarthasangraha; Madhva and later Dvaita commentators read the same passages through a permanent distinction and dependence of souls upon the Lord.',
        'Tat tvam asi, Shandilya-vidya, dahara-vidya and the five-fires doctrine became major loci of inter-school debate. A single chapter can therefore have several long commentarial afterlives, none of which should be confused with the wording of the Upanishad itself.',
        'The text’s stories also entered modern Hindu education and reform discourse, especially Satyakama and the teachings of Uddalaka, while its ritual-symbolic opening chapters are often neglected outside specialist Vedic study.'
      ]}
    ],sources:merge(D['Upaniṣad:Chāndogya']?.sources,[W('Chandogya Upanishad','https://en.wikipedia.org/wiki/Chandogya_Upanishad','Eight chapters, chronology and detailed contents.'),OL,DE,RAD,'Chandogya Upanishad with Shankara Bhashya','Samaveda / Chandogya Brahmana editions'])
  });

  put('Taittirīya',{
    sanskritTitle:'तैत्तिरीयोपनिषद्',traditionalAuthor:'Taittiriya school of the Krishna Yajurveda',language:'Vedic Sanskrit prose and verse',period:'c. 6th century BCE',extent:'3 vallis corresponding to Taittiriya Aranyaka 7–9',
    leadParagraphs:[
      'The Taittiriya Upanishad is the philosophical culmination of three chapters of the Taittiriya Aranyaka. Its three vallis are deliberately different in form. Shiksha-valli begins with recitation and disciplined Vedic education; Brahmananda-valli asks what Brahman and the human person are; Bhrigu-valli turns that teaching into an inquiry in which Bhrigu repeatedly returns to Varuna and discovers progressively deeper levels of life.',
      'The text’s most famous ideas—the five koshas, satyam jnanam anantam brahma, the scale of bliss, and Bhrigu’s ascent from food to ananda—belong to one continuous argument about how the finite person is rooted in Brahman.'
    ],articleSections:[
      {title:'Date and place in the Taittiriya Aranyaka',paragraphs:[
        'The Upanishad is commonly placed around the sixth century BCE and belongs to the early prose Upanishadic period. It is embedded as chapters 7, 8 and 9 of the Taittiriya Aranyaka of the Krishna Yajurveda.',
        'Its embedded position explains the opening concern with phonetics, accent, recitation and student discipline. The text does not begin by discarding Vedic learning; it asks what form of learning can move from exact sacred speech to knowledge of Brahman.',
        'The three vallis may preserve distinguishable layers, but they were transmitted as a coherent sequence in which training, metaphysical inquiry and lived realization follow one another.'
      ]},
      {title:'The three vallis',books:[
        {number:1,title:'Shiksha-valli',summary:'Phonetics, recitation, meditations on conjunctions, prayers, teacher-student discipline and the famous convocation address instructing the graduate to speak truth, practice dharma, honour parents and teacher, and sustain Vedic learning.'},
        {number:2,title:'Brahmananda-valli',summary:'Defines Brahman as truth, knowledge and infinite; describes creation; presents the person as successively food, prana, mind, understanding and bliss; culminates in the measure of ananda and the knower’s freedom from fear.'},
        {number:3,title:'Bhrigu-valli',summary:'Bhrigu asks Varuna to teach Brahman. Through tapas he successively identifies food, prana, mind, knowledge and bliss as deeper grounds until the inquiry reaches ananda; the chapter closes with teaching on food, hospitality and abundance.'}
      ]},
      {title:'Shiksha-valli: education and ethical formation',paragraphs:[
        'The opening word shiksha means phonetic instruction. Vowel, accent, quantity, force, melody and combination are not preliminary trivia: Vedic revelation exists through correctly embodied speech, so intellectual and ethical formation begin in disciplined recitation.',
        'Several meditations interpret conjunction itself—between teacher and pupil, mother and father, upper and lower jaws—as a pattern through which separate things become meaningful wholes. The Upanishad thus turns grammar and phonetics into contemplative structures.',
        'The convocation address is among the most famous ethical passages in the Upanishads. “Speak truth; practice dharma” is followed by concrete duties toward teacher, parents, guests, giving and continued study. Liberation-oriented knowledge is not presented as permission to abandon ethical seriousness.'
      ]},
      {title:'Brahmananda-valli and the five koshas',paragraphs:[
        'The sentence satyam jnanam anantam brahma introduces Brahman as truth/reality, knowledge and the infinite. From Brahman arise space, air, fire, water, earth, plants, food and the human person; cosmology leads directly into the analysis of embodied existence.',
        'The text describes five nested or successively subtler forms: annamaya, pranamaya, manomaya, vijnanamaya and anandamaya. Later Vedanta calls these the five koshas or sheaths, but the original passage presents each as a person-shaped layer whose apparent completeness is exceeded by a deeper one.',
        'The sequence is not merely a chart of occult anatomy. It is pedagogical. If one identifies the self with food-body, life, mind, intellect or even experienced bliss, inquiry can still ask what makes that level possible. The movement prepares the discovery of Brahman rather than replacing it with five separate selves.'
      ]},
      {title:'The measure of bliss',paragraphs:[
        'The ananda-mimamsa constructs a scale beginning with the happiness of an ideal vigorous human being possessing the whole earth and multiplying that happiness by one hundred through progressively higher beings. The point is not to produce a literal celestial currency of pleasure.',
        'Each multiplication shows the inadequacy of finite comparison. The culmination is the bliss of the knower of Brahman, who is not dependent on an external possession to produce happiness. The passage ends by linking knowledge with fearlessness: fear arises where reality is experienced through separation and instability.'
      ]},
      {title:'Bhrigu’s inquiry',paragraphs:[
        'Bhrigu asks Varuna, “Teach me Brahman.” Varuna does not give him a final proposition. He points to food, prana, sight, hearing, mind and speech, then tells him to know Brahman through tapas. Bhrigu returns repeatedly as each provisional understanding proves incomplete.',
        'Food is Brahman because beings arise from food, live by food and return to food; prana, mind and knowledge each offer a deeper explanatory level. The final recognition of ananda is therefore earned through repeated inquiry rather than memorized from a teacher.',
        'The closing injunctions about respecting food and feeding guests prevent an abstract ending. The realization of Brahman returns to embodied hospitality and abundance: knowledge changes how ordinary nourishment is understood and shared.'
      ]},
      {title:'Commentaries and reception',paragraphs:[
        'Shankara’s commentary made the five-sheath analysis central to Advaita pedagogy. Madhva wrote a Taittiriya bhashya and reads its Brahman language through Vishnu’s supremacy; Rangaramanuja and Sri Vaishnava interpretation understand the text within a qualified nondual theology of Brahman and dependent selves.',
        'The convocation address is widely recited in modern Hindu educational ceremonies, while satyam jnanam anantam brahma and the five koshas have become standard concepts far beyond specialist Vedanta.',
        'That popularity can obscure the Vedic setting. The text is simultaneously a school document about recitation, an ethical address, a metaphysical inquiry and a meditation on bliss.'
      ]}
    ],sources:merge(D['Upaniṣad:Taittirīya']?.sources,[W('Taittiriya Upanishad','https://en.wikipedia.org/wiki/Taittiriya_Upanishad','Three vallis, c. sixth-century BCE date and contents.'),OL,DE,RAD,'Taittiriya Upanishad with Shankara Bhashya','Madhva, Taittiriyopanishad Bhashya'])
  });

  put('Bṛhadāraṇyaka',{
    sanskritTitle:'बृहदारण्यकोपनिषद्',traditionalAuthor:'Yajnavalkya and the Shatapatha tradition',language:'Vedic Sanskrit prose',period:'c. 7th–6th centuries BCE',extent:'6 chapters; Madhyandina and Kanva recensions differ in arrangement and readings',primaryRecensions:['Madhyandina','Kanva'],
    leadParagraphs:[
      'The Brihadaranyaka Upanishad is the largest and, together with the Chandogya, the oldest major Upanishad. It emerges from the Shatapatha Brahmana of the White Yajurveda and preserves several layers of ritual interpretation, cosmology and philosophical debate. Yajnavalkya dominates its most famous chapters, but the text is a collection of many voices rather than the work of one historical lecturer.',
      'Its central questions are radical even by later standards: what remains when every object by which a person defines himself is removed? What is the self in waking, dream, sleep and death? How do desire and action shape rebirth? Can Brahman be described positively, or only by refusing every finite description? The answers appear in debates, domestic dialogues, royal courts, ritual reinterpretations and terse formulas such as aham brahmasmi and neti neti.'
    ],articleSections:[
      {title:'Date, composition and two recensions',paragraphs:[
        'The oldest substantial layers are generally placed in the seventh or sixth century BCE. The Upanishad belongs to the closing portions of the Shatapatha Brahmana and retains an unmistakable late-Vedic ritual setting even when it turns toward self-knowledge.',
        'The work is composite. Scholars distinguish older and younger units by prose style, repetition and the way teachings are embedded. Yajnavalkya’s debates form one major cluster; the opening horse-sacrifice symbolism and several creation accounts preserve other trajectories.',
        'The Sanskrit survives principally in Madhyandina and Kanva recensions. They share the great majority of material but differ in order, wording and chapter placement. A precise scholarly citation should therefore identify the recension when a reading matters.'
      ]},
      {title:'The six chapters',books:[
        {number:1,title:'Chapter 1 — ritual cosmos and the self',summary:'The Ashvamedha horse is read as the cosmos; creation myths, speech, death, vital powers and the celebrated “aham brahmasmi” passage move from ritual totality toward the identity of the knowing self.'},
        {number:2,title:'Chapter 2 — Yajnavalkya, Maitreyi and neti neti',summary:'Ajatashatru instructs Balaki; Yajnavalkya teaches Maitreyi that nothing is loved purely for its own separate sake but for the sake of the Self; the chapter develops the Madhu doctrine and the apophatic formula neti neti.'},
        {number:3,title:'Chapter 3 — the debate at Janaka’s court',summary:'Yajnavalkya faces a succession of Brahmins. Questions concern sacrificial transcendence, the number of gods, the inner controller, death and the famous exchange with Gargi about what the universe is woven upon.'},
        {number:4,title:'Chapter 4 — Janaka, Maitreyi, desire and liberation',summary:'Yajnavalkya teaches King Janaka on the light of the person, dream and deep sleep, the self beyond bodily states, karma and rebirth; a second Maitreyi dialogue culminates in the dissolution of finite duality.'},
        {number:5,title:'Chapter 5 — short meditations and Da-Da-Da',summary:'A collection of meditations on Brahman, truth, heart, food and sacred formulas, including Prajapati’s single syllable “da,” heard by gods, humans and demons as self-restraint, giving and compassion.'},
        {number:6,title:'Chapter 6 — lineage, meditation and household rites',summary:'Teachings on prana and the path after death stand beside teacher lineages and ritual material concerning conception and household continuity, showing the continued overlap of philosophical and domestic Vedic concerns.'}
      ]},
      {title:'Yajnavalkya and Maitreyi',paragraphs:[
        'When Yajnavalkya prepares to leave household life, he offers to divide property between Maitreyi and Katyayani. Maitreyi asks whether the whole earth filled with wealth could make her immortal. Yajnavalkya answers no, and the conversation changes from inheritance to self-knowledge.',
        'The famous sequence—husband is dear for the sake of the Self, wife is dear for the sake of the Self, sons, wealth, Brahminhood, kingship, worlds and gods are dear for the sake of the Self—does not simply recommend selfishness. It argues that value is intelligible only within consciousness and that objects taken as wholly independent cannot provide immortality.',
        'The conclusion is that the Self must be seen, heard, reflected upon and deeply contemplated. Later Vedanta schools build different metaphysics from this passage, but the dramatic force lies in Maitreyi’s refusal to exchange the question of immortality for material security.'
      ]},
      {title:'Gargi and the court of Janaka',paragraphs:[
        'King Janaka sponsors a gathering of learned Brahmins and offers cattle with gold attached to their horns. Yajnavalkya orders his pupil to drive the cattle away before winning the debate, provoking a long sequence of challenges.',
        'Gargi Vachaknavi asks what the world is woven upon, then what that supporting reality is woven upon, pressing the regress toward the imperishable. Yajnavalkya eventually describes the akshara as neither gross nor subtle, neither short nor long, beyond ordinary predicates yet governing cosmic order.',
        'The scene is one of the most important female philosophical voices in Vedic literature. Gargi is not a decorative participant; she frames one of the most abstract metaphysical interrogations in the text and publicly tests Yajnavalkya’s claim to knowledge.'
      ]},
      {title:'The inner controller and neti neti',paragraphs:[
        'The antaryamin passage describes the one who dwells within earth, water, fire, atmosphere, sun, directions, living beings, breath, speech, eye, mind and self—unknown by each object yet controlling it from within. The formula lets the Upanishad speak of transcendence without removing Brahman from the world.',
        'Neti neti—“not this, not this”—appears when finite predicates can no longer adequately identify the Self. The method is not nihilism: the text does not say that nothing exists. It denies that the imperishable can be exhausted by any object or conceptual category available within ordinary experience.',
        'Shankara treats this negation as central to Advaita. Other Vedanta schools argue that negation removes limiting defects rather than all positive attributes of the Lord. The two words thus became one of the great hermeneutic battlegrounds of later Vedanta.'
      ]},
      {title:'Karma, desire and rebirth',paragraphs:[
        'The fourth chapter gives one of the early classical statements linking desire, intention and action: as a person’s desire is, so becomes the will; as the will is, so the deed; as the deed is, so the result. The passage helps establish the moral psychology of karma in later Indian thought.',
        'At death the self is described through images of a caterpillar reaching to another blade and a goldsmith reshaping material into a new form. Rebirth is not random movement but follows knowledge, action and desire.',
        'The liberated knower is described differently. Where desires rooted in the heart are released, the mortal becomes immortal and attains Brahman here. Liberation therefore transforms the condition that produces karmic becoming rather than simply supplying a more pleasant destination after death.'
      ]},
      {title:'Dream, deep sleep and the light of the self',paragraphs:[
        'Yajnavalkya’s dialogue with Janaka asks what serves as a person’s light. Sun, moon, fire and speech are successively removed until the self itself remains as the light by which experience is possible.',
        'Dream shows the self constructing a world when ordinary external objects are absent. Deep sleep removes even that differentiated dream activity. The analysis does not reduce consciousness to one of these states; it uses their contrast to seek the continuity that persists through them.',
        'Later Advaita makes state-analysis a major contemplative method, especially in Mandukya. Brihadaranyaka preserves an older and less schematized version of the same inquiry.'
      ]},
      {title:'Manuscripts, commentaries and reception',paragraphs:[
        'The Madhyandina and Kanva recensions are both living textual witnesses and should not be treated as one “correct” text plus one corruption. Their differences can preserve alternative early arrangements of the Shatapatha-Upanishadic material.',
        'Shankara’s Brihadaranyakabhashya is among the longest and most important Advaita commentaries. Madhva’s tradition and Sri Vaishnava works repeatedly engage the same passages, while later Advaita subcommentaries made the text a central arena of scholastic debate.',
        'Modern scholarship also treats the Upanishad as crucial evidence for early Indian theories of self, karma and renunciation. Its prominence is justified by the breadth of the primary text, not only by later philosophical canonization.'
      ]}
    ],sources:merge(D['Upaniṣad:Bṛhadāraṇyaka']?.sources,[W('Brihadaranyaka Upanishad','https://en.wikipedia.org/wiki/Brihadaranyaka_Upanishad','Six chapters, two recensions, c. seventh–sixth centuries BCE and major teachings.'),OL,DE,RAD,'Brihadaranyaka Upanishad with Shankara Bhashya','Madhyandina and Kanva Shatapatha Brahmana editions'])
  });
})();