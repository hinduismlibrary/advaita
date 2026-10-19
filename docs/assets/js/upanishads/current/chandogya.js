(() => {
  const root=document.getElementById('scripture-browser');
  if(!root)return;
  const previousOpen=window.openScriptureEncyclopedia;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const SOURCES=[
    {title:'Wikipedia — Chandogya Upanishad',detail:'Chronology, structure, eight prapathakas, major vidyas, narratives and influence.',url:'https://en.wikipedia.org/wiki/Chandogya_Upanishad'},
    {title:'Hindupedia — Upanishads / Chandogya Upanishad',detail:'Traditional Hindu summary, Chandogya vidyas, ethical passages and place in Vedanta.',url:'https://www.hindupedia.com/en/Upani%E1%B9%A3ads'},
    {title:'Patrick Olivelle — The Early Upanishads',detail:'Critical Sanskrit text, translation, chronology and notes on the early prose Upanishads.'},
    {title:'Paul Deussen — Sixty Upanishads of the Veda, vol. 1',detail:'Detailed translation and philosophical analysis of Chandogya.'},
    {title:'Robert Ernest Hume — The Thirteen Principal Upanishads',detail:'Complete English translation with section numbering and notes.'},
    {title:'Chandogya Upanishad with Shankara Bhashya, trans. Ganganath Jha',detail:'Sanskrit commentarial tradition and Advaita interpretation of individual passages.'},
    {title:'Klaus Witz — The Supreme Wisdom of the Upanishads',detail:'Structural discussion of the three broad groups within Chandogya.'},
    {title:'S. Radhakrishnan — The Principal Upanishads',detail:'Translation and notes on major teachings and later Vedantic reception.'},
    {title:'Wikimedia Commons — Chandogya 1.1 manuscript',detail:'Chandogya Upanishad 1.1.1–1.1.9, Samaveda, Devanagari manuscript copied in 1849.',url:'https://commons.wikimedia.org/wiki/File:Chandogya_Upanishad_verses_1.1.1-1.1.9,_Samaveda,_Sanskrit,_Devanagari_script,_1849_CE_manuscript.jpg'},
    {title:'Wikimedia Commons — Chandogya Vivarana manuscript',detail:'Grantha-script palm-leaf manuscript of a Chandogya Upanishad commentary, acquired by C. M. Whish in 1836.',url:'https://commons.wikimedia.org/wiki/File:1836_CE_July_purchase,_Chandogya_Upanishad_vivarana,_Whish_manuscript_collection,_Kahle-Austin_Foundation,_Sanskrit,_Grantha_script.jpg'}
  ];
  const MAIN_IMG='https://commons.wikimedia.org/wiki/Special:Redirect/file/Chandogya%20Upanishad%20verses%201.1.1-1.1.9%2C%20Samaveda%2C%20Sanskrit%2C%20Devanagari%20script%2C%201849%20CE%20manuscript.jpg';
  const COMMENTARY_IMG='https://commons.wikimedia.org/wiki/Special:Redirect/file/1836%20CE%20July%20purchase%2C%20Chandogya%20Upanishad%20vivarana%2C%20Whish%20manuscript%20collection%2C%20Kahle-Austin%20Foundation%2C%20Sanskrit%2C%20Grantha%20script.jpg';
  const C=(...ns)=>ns.map(n=>`<sup class="ch-cite"><button type="button" data-ch-note="${n}" aria-label="Source ${n}">${n}</button></sup>`).join('');
  const P=(html,...ns)=>`<p>${html}${C(...ns)}</p>`;
  const H3=t=>`<h3>${t}</h3>`;
  const section=(id,title,body)=>`<section class="kena-section ch-section" id="${id}"><h2>${title}</h2>${body}</section>`;
  const thumb=(src,href,caption)=>`<figure class="ch-thumb"><a href="${href}" target="_blank" rel="noopener"><img src="${src}" loading="lazy" alt=""></a><figcaption>${caption}</figcaption></figure>`;

  function article(){
    const lead=`
      <aside class="kena-infobox ch-infobox">
        <div class="kena-infobox-title">Chandogya Upanishad</div>
        <div class="ch-dev">छान्दोग्योपनिषद्</div>
        <figure class="wiki-infobox-image"><a href="${SOURCES[8].url}" target="_blank" rel="noopener"><img src="${MAIN_IMG}" loading="lazy" alt="Chandogya Upanishad manuscript"></a><figcaption>Chandogya Upanishad 1.1.1–1.1.9, copied in 1849. Wikimedia Commons.</figcaption></figure>
        <div class="kena-info-row"><b>Date</b><span>8th–6th century BCE</span></div>
        <div class="kena-info-row"><b>Type</b><span>Mukhya Upanishad</span></div>
        <div class="kena-info-row"><b>Veda</b><span>Samaveda</span></div>
        <div class="kena-info-row"><b>School</b><span>Tandya / Kauthuma tradition</span></div>
        <div class="kena-info-row"><b>Textual setting</b><span>Chandogya Brahmana, chapters 3–10</span></div>
        <div class="kena-info-row"><b>Structure</b><span>8 prapathakas; 154 khandas</span></div>
        <div class="kena-info-row"><b>Muktika</b><span>No. 9</span></div>
        <div class="kena-info-row"><b>Major commentators</b><span>Shankara, Madhva, Rangaramanuja</span></div>
        <div class="kena-info-row"><b>Famous teaching</b><span>Tat tvam asi</span></div>
      </aside>
      <div class="kena-lead ch-lead">
        ${P('The <b>Chandogya Upanishad</b> is one of the oldest and largest Upanishads. It belongs to the Samaveda and forms the final eight chapters of the ten-chapter Chandogya Brahmana. Its world is unmistakably Samavedic: chant, syllable, breath, sacrificial performance and the structure of speech repeatedly become objects of <i>upasana</i>, but the text also contains some of the most influential teachings on Atman, Brahman, rebirth and liberation in the entire Vedantic tradition.',1,2,3)}
        ${P('The work is not organized around one philosophical argument. It is an anthology of teachings, stories and meditations preserved within one Vedic school. The first two chapters are dominated by Om, Udgitha and Saman symbolism; chapters three to five gather numerous <i>vidyas</i> and narrative teachings; chapters six to eight contain the great dialogues on <i>sat</i>, the Self, <i>tat tvam asi</i>, <i>bhuman</i> and the “small space” within the heart.',1,7)}
        ${P('Its later authority is correspondingly broad. The Brahma Sutras repeatedly draw on Chandogya passages, and major Vedanta traditions comment on the same text while disagreeing about how its identity-statements, meditations and descriptions of the supreme Self should be interpreted.',1,2,6,8)}
      </div>`;

    const date=section('ch-date','Date and composition',
      P('The Chandogya Upanishad is generally dated to the <b>8th–6th centuries BCE</b>. It is therefore placed among the earliest surviving Upanishads, together with the Brihadaranyaka and the oldest layers of the Kauṣitaki tradition.',1,3)+
      P('The received text was not produced as a single composition in one sitting. Differences in prose style, metre, ritual setting and subject matter show that older units were gathered and edited into the eight-prapathaka collection now transmitted as Chandogya. Several narratives and formulas also have close parallels in the Brihadaranyaka, showing that the two works preserve material from a wider late-Vedic teaching culture rather than two sealed literary worlds.',1,3,7)+
      P('The relative chronology is visible inside the work itself. The earliest sections remain close to Samavedic liturgy and the interpretation of chant; later sections foreground self-knowledge, rebirth, inward sacrifice and extended philosophical dialogues. These layers belong to one received scripture, but they need not all be the same age.',1,3,7)
    );

    const structure=section('ch-structure','Text, school and structure',
      H3('The Chandogya Brahmana')+
      P('The Upanishad is the last eight chapters of a ten-chapter Chandogya Brahmana. The first two chapters of that Brahmana contain mantras and rites connected with marriage, birth and other ritual occasions; chapters three through ten are the long speculative text conventionally called the Chandogya Upanishad. Its identity as an Upanishad is therefore inseparable from its Samavedic textual home.',1,3,5)+
      H3('Eight prapathakas and 154 khandas')+
      P('The eight prapathakas contain, respectively, <b>13, 24, 19, 17, 24, 16, 26 and 15 khandas</b> — 154 sections in all. The uneven size matters: Chandogya is not eight equal “books,” and individual khandas range from very short ritual meditations to long narrative-philosophical sequences.',1,5)+
      H3('Three broad movements')+
      P('A useful way of seeing the architecture is to distinguish three broad movements. Prapathakas 1–2 remain closest to Samavedic sound, chant and liturgical correspondences. Prapathakas 3–5 contain more than twenty major <i>upasanas</i> and <i>vidyas</i>, together with narratives about teachers, kings and students. Prapathakas 6–8 concentrate on the Self and ultimate reality through the Shvetaketu, Narada–Sanatkumara and Indra–Prajapati cycles.',1,7)+
      H3('A transmitted anthology')+
      P('The text preserves seams, repetitions and passages whose grammar or style differs from their surroundings. Some units appear to have circulated independently before being assembled into the present collection. That does not make them extraneous to the Hindu text as received; it explains why a single Upanishad can move from technical Saman syllables to royal instruction, cosmology, ethics and the deepest Vedantic debates without behaving like a modern monograph.',1,3)
    );

    const p1=section('ch-p1','First prapathaka — Om, Udgitha and the powers of life',
      H3('Om as the essence of the chant (1.1)')+
      P('The Upanishad opens by directing meditation toward <b>Om as the Udgitha</b>, the high chant of the Samaveda. Its first chain of “essences” moves from all beings to earth, water, plants, the human being, speech, Rigvedic verse, Samavedic chant and finally Udgitha. The movement is characteristic of late-Vedic speculation: the ritual sound is treated as the concentrated essence of a hierarchy that begins with the entire living world.',1,4,5)+
      P('Speech and Saman are paired with breath and song. The point is not merely phonetic. Om is the point at which ritual performance, sacred speech and the life that makes speech possible converge. The opening therefore establishes the method used throughout the first chapters: an external liturgical form is read as a map of cosmic and bodily reality.',1,4)+
      H3('Devas, Asuras and Prana (1.2)')+
      P('The Devas attempt to defeat the Asuras through Udgitha. Smell, speech, sight, hearing and mind are each struck by evil, which explains why the same faculty can apprehend both what is wholesome and what is corrupt. When the hostile force attacks <b>Prana</b>, however, it breaks apart. The story places vital breath beneath and behind the other faculties: the senses can be morally mixed, but embodied life depends upon the power that sustains all of them.',1,4,5)+
      H3('What supports the Udgitha? Space and the highest chant (1.8–1.9)')+
      P('A debate among learned reciters asks what ultimately supports the chant and the world. The inquiry passes beyond sound to <b>space</b>, into which beings arise and into which they return. The episode is an early example of the text turning a technical ritual question into an inquiry about the ground of existence.',1,4)+
      H3('The Udgitha of the dogs (1.12)')+
      P('One of the strangest scenes in the Upanishads satirizes empty ritual performance. A procession of dogs imitates the movement and sound of chanting priests while demanding food. The episode is funny, but the criticism is serious: exact recitation without understanding can become self-serving performance. Chandogya is therefore not simply “anti-ritual”; it distinguishes meaningful knowledge of ritual from mechanical ritualism.',1,4,5)+
      H3('Stobha syllables and cosmic correspondences (1.13)')+
      P('The final section interprets non-lexical syllables used in Samavedic singing — sounds such as <i>hau</i>, <i>hai</i>, <i>i</i> and <i>hing</i> — through correspondences with the sun, moon, wind, fire and other powers. The chapter ends where it began: the smallest element of chant can be treated as a doorway into a larger cosmic order.',1,4)
    );

    const p2=section('ch-p2','Second prapathaka — the universe as Saman',
      H3('The significance of Saman (2.1)')+
      P('The second chapter widens the field from the syllable Om to the whole Saman. It plays on the associations of <i>saman</i> with goodness, harmony and well-being: what is properly ordered is “saman,” while disorder is “asaman.” Chant thus becomes a language for ethical as well as liturgical order.',1,4)+
      H3('Fivefold and sevenfold chant (2.2–2.22)')+
      P('Successive sections map the components of Saman — <i>hinkara, prastava, udgitha, pratihara</i> and <i>nidhana</i> — onto rain, seasons, animals, the body, sexual generation, deities and other processes. A sevenfold form adds <i>adi</i> and <i>upadrava</i>. The underlying claim is that chant is not isolated from nature: its ordered sequence mirrors ordered sequences throughout the cosmos and the human being.',1,4,5)+
      P('The chapter also turns to vowels, consonants and sibilants. Sound is analysed not as an abstract linguistic science but because correct sound, bodily life and cosmic pattern belong to one ritual-intellectual universe.',1,4)+
      H3('Dharma and modes of religious life (2.23)')+
      P('Section 2.23 gives one of the earliest important discussions of the “branches of dharma”: sacrifice, Vedic study and giving; austerity; and the disciplined life of the student in the teacher’s household. It then places immortality beyond merely finite religious rewards, with abiding in Brahman as the decisive goal. Later discussions of the ashramas repeatedly return to this passage.',1,2,3,4)
    );

    const p3=section('ch-p3','Third prapathaka — Madhu, Gayatri and the Self within',
      H3('Madhu-vidya: the sun as honey (3.1–3.11)')+
      P('The first eleven sections develop the <b>Madhu-vidya</b>, the “honey teaching.” The sun is imagined as a honeycomb and Vedic revelations as flowers from which the nectars of knowledge are gathered. Rig, Yajur, Sama and Atharvan materials are coordinated into one solar image. The meditation culminates not in astronomy but in a vision of knowledge whose light no longer alternates with night.',1,4,5)+
      H3('Gayatri as the form of all (3.12)')+
      P('Gayatri is treated simultaneously as metre, speech, living beings and cosmic order. The famous Vedic metre is not reduced to a count of syllables: its structure becomes a contemplative model for the relation between language and the totality it expresses.',1,4)+
      H3('The body as heaven and the five gates (3.13)')+
      P('The body is described as a heavenly domain with five gates associated with the faculties and vital powers. Chandogya repeatedly uses this macrocosm–microcosm relation: the highest reality is not searched for only in a distant world because the same order is present within the person.',1,4,5)+
      H3('Shandilya-vidya (3.14)')+
      P('The <b>Shandilya-vidya</b> is among the most important early Vedantic passages. It begins from the claim that all this is Brahman and directs meditation toward the Self within the heart. The inward Self is described through intention, consciousness and vastness rather than as a physical object. Later Vedanta schools agree that the passage is central while disagreeing about the precise relation between the individual Self and Brahman.',1,2,4,6)+
      H3('The imperishable treasury (3.15–3.16)')+
      P('The following meditations portray the universe as an imperishable treasury and link human longevity with ritual-cosmic patterns. Such passages show why Chandogya cannot be read as if every section were making the same metaphysical claim; many of its teachings are specific meditations with their own promised fruits.',1,4)+
      H3('Life as a Soma sacrifice; ethics as dakshina (3.17)')+
      P('Human life itself is reinterpreted as a Soma sacrifice. Hunger and thirst become consecratory discipline, ordinary enjoyments correspond to ritual stages, and death completes the sacrificial arc. The “gift” offered through this life-sacrifice is ethical: austerity, charity, straightforwardness, <b>ahimsa</b> and truthfulness. The same section also preserves Ghora Angirasa’s instruction to Krishna Devakiputra.',1,2,4,5)
    );

    const p4=section('ch-p4','Fourth prapathaka — teachers, students and hidden knowledge',
      H3('Janasruti and Raikva: Samvarga-vidya (4.1–4.3)')+
      P('King Janasruti is shaken when he learns of a greater knower, Raikva, a man found under a cart. The social reversal is deliberate: royal generosity does not itself confer brahmavidya. Raikva teaches <b>Samvarga-vidya</b>, the doctrine of “gathering” or absorption. Cosmically, wind gathers fire, sun, moon and water; within the person, Prana gathers the faculties in sleep. Outer cosmos and inner life are mirrors of the same principle.',1,4,5)+
      H3('Satyakama Jabala (4.4–4.9)')+
      P('Satyakama asks his mother about his lineage and is told that she cannot identify his father with certainty. He repeats this truth exactly to Haridrumata Gautama. The teacher accepts him because such uncompromising truthfulness is itself evidence of brahminical character. During his studentship, a bull, fire, a swan and a water bird instruct him in successive quarters of Brahman before his human teacher completes the teaching.',1,4,5)+
      H3('Upakosala and the sacred fires (4.10–4.15)')+
      P('Upakosala remains with the sacred fires while his teacher is absent. The fires themselves teach him that Brahman is life, joy and vastness and identify divine manifestations in the sun, moon, lightning and other forms. When Satyakama returns, he completes the instruction by explaining the person seen in the eye and the path of the knower. The narrative does not oppose ritual fire to knowledge: the very fires of ritual become teachers of Brahman.',1,4,5,6)
    );

    const p5=section('ch-p5','Fifth prapathaka — Prana, rebirth and Vaishvanara',
      H3('The contest of the faculties (5.1–5.2)')+
      P('Speech, sight, hearing, mind and Prana each claim supremacy. One by one the faculties leave the body for a year; life continues, though impaired. When Prana prepares to depart, all the others begin to fail at once. They acknowledge Prana as their support. Versions of this old Vedic contest occur elsewhere, but Chandogya uses it to establish a hierarchy inside embodied life.',1,4,5)+
      H3('Panchagni-vidya and the two paths (5.3–5.10)')+
      P('The <b>Panchagni-vidya</b> presents the cosmos as five sacrificial fires: heaven, rain cloud, earth, man and woman. Offerings pass through these fires as moon, rain, food, semen and embryo. The doctrine links cosmology, reproduction and rebirth through sacrificial imagery rather than treating them as separate subjects.',1,2,4,5)+
      P('The same sequence distinguishes post-mortem paths. The path associated with knowledge leads through a divine route without ordinary return; the ancestral path leads through the moon and back into the cycle of rain, food and birth. A third destiny is assigned to tiny creatures outside these two routes. This is one of the formative Vedic statements of rebirth and differentiated afterlife.',1,4,5)+
      H3('Ashvapati Kaikeya and Vaishvanara Atman (5.11–5.24)')+
      P('Five learned householders ask what the Self and Brahman are. Uddalaka Aruni directs them to King <b>Ashvapati Kaikeya</b>, who teaches the Vaishvanara Self. Each seeker has meditated on one cosmic member — heaven, sun, air, space, water or earth — and each meditation is valid but partial. The king teaches them to understand the whole cosmic Person rather than absolutizing one limb.',1,4,5,6)+
      P('The Vaishvanara teaching then turns the ordinary act of eating into <i>pranagnihotra</i>, an offering into the vital fires. Once again Chandogya interiorizes sacrifice without simply discarding it: bodily nourishment, cosmic fire and knowledge of the universal Self are placed in one ritual-philosophical frame.',2,4,6)
    );

    const p6=section('ch-p6','Sixth prapathaka — Uddalaka, Shvetaketu and Tat tvam asi',
      H3('“By knowing one thing, everything of that kind is known” (6.1)')+
      P('Shvetaketu returns home after twelve years of Vedic study proud of his learning. Uddalaka asks whether he learned the instruction by which what has not been heard becomes heard and what has not been known becomes known. Clay and pots, gold and ornaments, iron and tools illustrate the point: changing names and forms depend upon a more fundamental material reality.',1,4,5)+
      H3('Sat and creation (6.2–6.7)')+
      P('Uddalaka begins from <b>sat</b>, “being” or “the existent,” rather than from absolute non-being. Sat wills to become many; heat, water and food emerge, and these three enter living beings. Their coarse, middle and subtle portions become bodily waste, flesh, mind, breath and speech. A fasting experiment with Shvetaketu is used to show the dependence of mind upon nourishment.',1,3,4,5)+
      H3('Tat tvam asi repeated nine times (6.8–6.16)')+
      P('The teaching then proceeds through a sequence of analogies. Rivers lose their separate names in the ocean. A tree remains alive while its life-principle pervades it. The huge banyan grows from an almost invisible seed. Salt dissolved in water cannot be seen but is present throughout. A blindfolded traveller from Gandhara needs a guide who knows the road. Each example turns Shvetaketu away from visible form toward the subtle reality on which visible things depend.',1,4,5)+
      P('The refrain <b>tat tvam asi</b> occurs nine times in sections 6.8–6.16. Its interpretation became one of the great debates of Vedanta. Advaita reads it as expressing the identity of the deepest Self and Brahman once limiting conditions are removed; Vishishtadvaita and Dvaita interpret the relation within different accounts of the individual soul, the supreme Lord and the world. Modern philology has also debated the most exact grammatical force of the phrase. The article therefore presents the Sanskrit teaching and its reception rather than silently making one later school’s exegesis the only possible reading.',1,3,6,8)
    );

    const p7=section('ch-p7','Seventh prapathaka — Narada, Sanatkumara and Bhuman',
      H3('Learning without Self-knowledge (7.1)')+
      P('Narada approaches Sanatkumara with an extraordinary catalogue of learning: the four Vedas, Itihasa-Purana, grammar, ritual sciences, mathematics, astronomy, political knowledge, reasoning, divine lore and other disciplines. Yet he says that he knows mantras, not the Self, and has not crossed sorrow. The chapter begins by distinguishing vast learning from the knowledge that transforms the knower.',1,4,5)+
      H3('The graded ascent: name to Prana (7.2–7.15)')+
      P('Sanatkumara leads Narada through a deliberate hierarchy. <b>Name</b> is surpassed by <b>speech</b>; speech by <b>mind</b>; mind by <b>will</b> or intention; will by <b>thought</b>; thought by <b>meditation</b>; meditation by <b>understanding</b>; understanding by <b>strength</b>; strength by <b>food</b>; food by <b>water</b>; water by <b>heat</b>; heat by <b>space</b>; space by <b>memory</b>; memory by <b>hope</b>; and hope by <b>Prana</b>. At each stage, the supposedly “higher” principle is what makes the preceding level effective or intelligible.',1,4,5)+
      H3('From the Ativadin to truth and Bhuman (7.16–7.26)')+
      P('Reaching Prana is not the end. The true “speaker beyond” is grounded in <b>truth</b>, and truth requires understanding, reflection, faith, steadfastness and disciplined activity. The ascent culminates in <b>bhuman</b>, fullness or the infinite. Where one sees or hears an “other,” there is limitation; bhuman is described through a condition in which reality is not experienced as a finite object over against another finite subject.',1,4,5)+
      P('The chapter closes by reversing the hierarchy: Prana, hope, memory, space, fire, water, food, strength, understanding, meditation, thought, will, mind, speech and name all arise from the Self. The pedagogical ladder is therefore not a catalogue of independent substances. It teaches Narada to trace every field of experience back to the ground from which its power comes.',1,4,5)
    );

    const p8=section('ch-p8','Eighth prapathaka — the city of Brahman and the true Self',
      H3('Dahara-vidya: the small space within the heart (8.1–8.4)')+
      P('The body is called the <b>city of Brahman</b>, and within it is a small lotus-like dwelling containing a “small space.” The paradox is deliberate: the space within the heart is small in location but not in content. Heaven, earth, sun, moon, lightning, stars and all that exists are said to be contained there. The teaching directs attention from the apparent size of the body to the immeasurable reality present within it.',1,2,4,5)+
      P('The text compares unrecognized inner reality to buried treasure: people may walk over it without knowing what lies beneath them. Desires fulfilled through external objects are unstable because their objects are unstable; the Self is sought as the unlost basis of desire and freedom.',1,4,5)+
      H3('Brahmacharya and the inward fulfilment of ritual (8.5–8.6)')+
      P('Student life under a teacher is equated with sacrifice, offering, sacred session, silence, fasting and forest discipline. Chandogya’s characteristic move appears again: external rites are not merely rejected, but their highest meaning is drawn inward into disciplined knowledge and meditation. The chapter also describes subtle channels connected with the heart and the route of the knower at death.',1,4,5)+
      H3('Indra and Prajapati: body, dream and deep sleep (8.7–8.12)')+
      P('Prajapati announces a Self free from evil, age, death, sorrow, hunger and thirst. <b>Indra</b> and <b>Virochana</b> approach for instruction. A first identification with the reflected bodily person satisfies Virochana, who leaves with a doctrine centred on the body. Indra notices that a body-dependent self would share the body’s blindness, injury and death, so he returns.',1,4,5)+
      P('Prajapati next points to the dream-self. Indra again sees the problem: the dreamer can suffer and be frightened. Deep sleep is then proposed, but a self that seems to know nothing cannot yet explain the conscious, immortal principle being sought. Only after repeated returns and extended studentship does Indra receive the final teaching of the Self that is not exhausted by body, dream or the blankness of deep sleep.',1,4,5,6)+
      H3('Closing teaching (8.13–8.15)')+
      P('The final sections praise the transition from darkness to light and the purification of the knower. The closing instruction joins Vedic study, concentration on the Self and non-injury toward living beings. The knower reaches Brahman and does not return to ordinary rebirth. Chandogya thus ends not with a new speculative system but with a life ordered around study, harmlessness and realization of the Self.',1,2,4,5)
    );

    const vidyas=section('ch-vidyas','Major vidyas and meditations',
      P('Chandogya became a central source for Vedanta not only because of a few mahavakyas but because it preserves a large repertoire of named <b>vidyas</b> — structured contemplations that later exegetes classify and compare across the Upanishads. Important examples include Udgitha-vidya, Madhu-vidya, Gayatri-vidya, Shandilya-vidya, Samvarga-vidya, Upakosala-vidya, Panchagni-vidya, Vaishvanara-vidya, Sad-vidya, Bhuma-vidya and Dahara-vidya.',2,6,8)+
      P('These vidyas do not all teach the same object in the same way. Some begin from a ritual sound, some from the sun, some from breath, some from the cosmic person, and some from the heart. Later Vedanta asks when apparently different meditations can be combined and when their distinctive forms and fruits must be preserved. That exegetical problem is one reason Chandogya appears so often in the Brahma Sutras and their commentaries.',2,6)
    );

    const reception=section('ch-reception','Commentaries, Vedanta and influence',
      thumb(COMMENTARY_IMG,SOURCES[9].url,'A Grantha-script palm-leaf manuscript of a Chandogya Upanishad commentary, acquired in Thanjavur in 1836. Wikimedia Commons.')+
      H3('Commentarial traditions')+
      P('Chandogya is among the most heavily interpreted Upanishads. <b>Adi Shankara</b> comments on the complete work; <b>Madhvacharya</b> and the Dvaita tradition read its statements within a theology of the real difference between God and individual souls; <b>Rangaramanuja</b>, in the Sri Vaishnava tradition, interprets it within Vishishtadvaita. The same verses therefore became a common arena in which Vedanta schools defined their differences.',1,6,8)+
      H3('Tat tvam asi and the problem of interpretation')+
      P('No Chandogya passage has generated more interpretation than 6.8–6.16. The traditional Advaita explanation treats the repeated statement as a mahavakya revealing the identity of Atman and Brahman at the deepest level. Other Vedantic readings insist that scriptural unity must be interpreted together with passages that distinguish the individual, the Lord and the cosmos. A scholarly page should preserve that plurality instead of writing one sectarian bhashya as if it were simply “what the Sanskrit means.”',1,3,6,8)+
      H3('Ethics, renunciation and later Hindu thought')+
      P('The Upanishad is also important outside metaphysical debates. Its passages on the branches of dharma, ahimsa, student life, knowledge beyond ritual reward, the two post-mortem paths and the figure of the wandering seeker became reference points in later discussions of the ashramas, renunciation and liberation.',1,2,3)+
      H3('Why the text remained foundational')+
      P('Chandogya’s lasting influence comes from the coexistence of several Hindu intellectual forms within one scripture: precise Vedic chant, sacrificial symbolism, story, ethical instruction, royal teaching, inward meditation and arguments about the Self. Later Vedanta did not inherit a single abstract doctrine from Chandogya; it inherited an archive of vidyas and dialogues whose relation had to be interpreted.',1,2,6,7)
    );

    const refs=section('ch-references','References',`<ol class="ch-reference-list">${SOURCES.map((s,i)=>`<li id="ch-ref-${i+1}"><b>${i+1}.</b> ${esc(s.title)}${s.detail?` — ${esc(s.detail)}`:''}${s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}</li>`).join('')}</ol>`);

    const toc=`<nav class="kena-toc ch-toc" aria-label="Contents"><div class="kena-toc-title">Contents</div><ol>
      <li><a href="#ch-date">Date and composition</a></li>
      <li><a href="#ch-structure">Text, school and structure</a></li>
      <li><a href="#ch-p1">First prapathaka — Om and Udgitha</a></li>
      <li><a href="#ch-p2">Second prapathaka — the universe as Saman</a></li>
      <li><a href="#ch-p3">Third prapathaka — Madhu, Gayatri and the Self</a></li>
      <li><a href="#ch-p4">Fourth prapathaka — Raikva, Satyakama, Upakosala</a></li>
      <li><a href="#ch-p5">Fifth prapathaka — Prana, rebirth, Vaishvanara</a></li>
      <li><a href="#ch-p6">Sixth prapathaka — Shvetaketu and Tat tvam asi</a></li>
      <li><a href="#ch-p7">Seventh prapathaka — Narada and Bhuman</a></li>
      <li><a href="#ch-p8">Eighth prapathaka — Dahara and the true Self</a></li>
      <li><a href="#ch-vidyas">Major vidyas and meditations</a></li>
      <li><a href="#ch-reception">Commentaries and influence</a></li>
      <li><a href="#ch-references">References</a></li>
    </ol></nav>`;
    return `<article class="scripture-wiki-article up-wiki-article ch-wiki-article">${lead}${toc}${date}${structure}${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${vidyas}${reception}${refs}</article>`;
  }

  let shade=null,reader=null;
  function close(){shade?.remove();reader?.remove();document.querySelector('.ch-source-card')?.remove();shade=reader=null;document.documentElement.classList.remove('kena-article-open');root.querySelectorAll('.shastra-name.is-active').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});}
  function showSource(n){const s=SOURCES[n-1];if(!s)return;document.querySelector('.ch-source-card')?.remove();const card=document.createElement('aside');card.className='itihasa-source-card ch-source-card';card.innerHTML=`<button class="itihasa-source-close" type="button" aria-label="Close source">×</button><div class="itihasa-source-num">Source ${n}</div><strong>${esc(s.title)}</strong><p>${esc(s.detail)}</p>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>`:''}`;document.body.append(card);card.querySelector('button')?.addEventListener('click',()=>card.remove());}
  function open(button){close();button.classList.add('is-active');button.setAttribute('aria-pressed','true');shade=document.createElement('div');shade.className='kena-article-backdrop scripture-wiki-backdrop up-wiki-backdrop';reader=document.createElement('section');reader.className='kena-article-reader scripture-wiki-reader up-wiki-reader ch-wiki-reader';reader.setAttribute('role','dialog');reader.setAttribute('aria-modal','true');reader.setAttribute('aria-label','Chandogya Upanishad article');reader.innerHTML=`<header class="kena-article-head"><div><span class="eyebrow">Upanishad encyclopedia</span><h1>Chandogya Upanishad</h1><div class="up-title-dev">छान्दोग्योपनिषद्</div></div><button class="kena-article-close" type="button" aria-label="Close">×</button></header><div class="kena-article-scroll">${article()}</div>`;document.body.append(shade,reader);document.documentElement.classList.add('kena-article-open');reader.querySelector('.kena-article-close')?.focus({preventScroll:true});return true;}

  document.addEventListener('click',e=>{const b=e.target.closest?.('.ch-cite button');if(!b)return;e.preventDefault();e.stopImmediatePropagation();showSource(Number(b.dataset.chNote));},true);
  document.addEventListener('click',e=>{if(e.target===shade||e.target.closest?.('.ch-wiki-reader .kena-article-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&reader)close();});
  if(!document.getElementById('chandogya-v13-style')){const st=document.createElement('style');st.id='chandogya-v13-style';st.textContent=`
    .ch-wiki-article .ch-lead{min-height:360px}.ch-infobox{width:330px!important}.ch-dev{padding:2px 8px 7px;color:#746b61;text-align:center;font-family:'Noto Serif Devanagari','Nirmala UI',serif;font-size:17px}.ch-wiki-article .ch-section h3{margin-top:25px!important}.ch-wiki-article .ch-section p{margin-bottom:15px!important}.ch-toc{max-width:650px!important}.ch-toc ol{columns:1!important}.ch-cite{vertical-align:super}.ch-cite button{border:0;background:transparent;color:#5b3ec4;padding:0 1px;font:600 10px/1 Merriweather,Georgia,serif;cursor:pointer}.ch-reference-list{padding-left:1.3em}.ch-reference-list li{font-size:14px!important;line-height:1.55!important;margin:0 0 11px!important}.ch-thumb{float:right;width:285px;margin:5px 0 18px 24px;padding:4px;border:1px solid rgba(92,82,70,.24);background:#f4f1eb}.ch-thumb img{display:block;width:100%;height:auto}.ch-thumb figcaption{padding:6px 3px 2px;color:#6d655c;font:11.5px/1.45 Merriweather,Georgia,serif}.ch-source-card{font-family:Merriweather,Georgia,serif!important;color:#3c362e!important}.ch-source-card a{color:#5b3ec4!important}@media(max-width:760px){.ch-wiki-article .ch-lead{min-height:0}.ch-infobox{width:100%!important}.ch-thumb{float:none;width:100%;margin:10px 0 18px}}
  `;document.head.append(st);}
  window.openScriptureEncyclopedia=function(button){const name=button?.dataset?.name||button?.querySelector?.('span')?.textContent?.trim();const kind=button?.dataset?.kind||'';if(kind==='Upaniṣad'&&name==='Chāndogya')return open(button);return typeof previousOpen==='function'?previousOpen(button):false;};
  window.SCRIPTURE_CHANDOGYA_V13=true;
})();