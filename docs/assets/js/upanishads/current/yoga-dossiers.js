(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Upaniṣad:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const AIY='K. Narayanasvami Aiyar, Thirty Minor Upanishads';
  const AYY='T. R. Srinivasa Ayyangar, The Yoga Upanishads, Adyar Library';
  const DEU='Paul Deussen, Sixty Upanishads of the Veda';
  const MUK='Muktika Upanishad — 108-name and Veda catalogue';
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});
  const common=[AIY,AYY,DEU,MUK];

  put('Nādabindu',{
    sanskritTitle:'नादबिन्दूपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE for the early core; surviving northern and southern recensions differ substantially',extent:'Two principal recensional forms; about 20 verses in a short northern text and about 56 in a longer southern form',primaryRecensions:['Northern recension, commonly linked with the Atharvaveda','Southern recension, commonly linked with the Rigveda'],
    leadParagraphs:[
      'The Nadabindu Upanishad is an early Yoga Upanishad in which Om, inner sound and the stilling of mind are joined into a single contemplative path. Its central practice is nada-anusandhana: attention is withdrawn from external sound and trained upon progressively subtler inner resonance until even sound itself is left behind.',
      'The title combines nada, sound, with bindu, the point or seed associated with the subtle completion of Om. The text is especially important because it survives in significantly different northern and southern forms, showing that “the Nadabindu” was not transmitted everywhere as one fixed verse sequence.'
    ],articleSections:[
      {title:'Date, title and recensions',paragraphs:[
        'The core belongs to the early Yoga-Upanishad stratum, often placed between about 100 BCE and 300 CE. The precise date of either recension cannot be reduced to a single year, but the work is earlier in character than the medieval Kundalini manuals.',
        'Northern manuscripts tend to preserve a much shorter text and attach it to the Atharvaveda. Southern transmission preserves a longer recension and may attach it to the Rigveda. The difference is not only verse count: the longer text elaborates the sequence of sounds and yogic instruction.',
        'Because of this recensional history, quotations should be cited by edition or recension. A verse number from one printed Nadabindu may not correspond exactly to another.'
      ]},
      {title:'Om and the image of the hamsa',paragraphs:[
        'The work begins by treating Om as a complete contemplative symbol rather than a mere syllable prefixed to recitation. The components of Om are mapped onto parts of the hamsa, the migratory bird that becomes an image of the individual and supreme self in later yoga literature.',
        'This symbolic body lets the practitioner contemplate sound spatially and cosmically. The audible syllable is a support; its purpose is to lead attention toward the subtle principle that sound reveals but cannot exhaust.'
      ]},
      {title:'The sequence of inner sounds',paragraphs:[
        'As attention deepens, inner sound is described through a graded series of comparisons: ocean, thunder, drum, bell, horn, flute and increasingly fine tones. The list is not presented as a catalogue of supernatural entertainment. Its function is pedagogical: attention that habitually follows external objects is given an increasingly subtle internal object.',
        'The practitioner is instructed not to become attached even to a pleasing sound. One sound is left for a subtler one until the mind becomes absorbed and the distinction between listener and heard sound loses its ordinary force.',
        'Later Hatha and nada-yoga traditions develop this practice at far greater technical length, but Nadabindu is one of the clearest early Upanishadic witnesses to the method.'
      ]},
      {title:'Beyond nada',paragraphs:[
        'The culmination is not an eternal inner noise. Nada is itself a support that is finally transcended. When attention no longer runs outward and mental movement subsides, the practitioner is directed toward the soundless Brahman.',
        'This prevents a purely physiological reading of the work. Its yoga is a means of knowledge: concentration on subtle sound is valuable because it dissolves distraction and prepares recognition of the self beyond the changing contents of awareness.'
      ]},
      {title:'Transmission and later yoga',paragraphs:[
        'Nadabindu became part of the five so-called Bindu Upanishads and was repeatedly printed in Yoga-Upanishad collections. Its vocabulary of inner sound was taken up in later Hatha, laya and nada traditions.',
        'Modern study must keep the early Upanishadic text separate from much later manuals that use the same practice. Similarity of method shows reception, not identity of authorship or date.'
      ]}
    ],sources:merge(D['Upaniṣad:Nādabindu']?.sources,[W('Nadabindu Upanishad','https://en.wikipedia.org/wiki/Nadabindu_Upanishad','Chronology, northern and southern recensions, verse counts and inner-sound teaching.'),...common])
  });

  put('Yogacūḍāmaṇi',{
    sanskritTitle:'योगचूडामण्युपनिषद्',language:'Sanskrit',period:'c. 14th–15th century CE in a common modern chronology',extent:'121 verses in the commonly studied recension',
    leadParagraphs:[
      'The Yogachudamani Upanishad is a medieval Yoga text devoted to the subtle body. Nadis, chakras, kundalini, breath, mantra and inner sound are arranged as parts of a single ascent in which bodily practice is meant to culminate in knowledge rather than remain an end in itself.',
      'Its title means the “crest-jewel of yoga.” The work belongs to a period when subtle-body systems had become much more explicit than in the early prose Upanishads, and its language should therefore be read beside Hatha and Tantric yoga rather than projected back into the age of Chandogya.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received text is commonly placed around the fourteenth or fifteenth century CE. This relatively late date fits its mature chakra, nadi and kundalini vocabulary.',
        'The Muktika canon associates it with the Samaveda. That affiliation gives the work a place inside the received Upanishadic canon; it does not make the surviving composition linguistically contemporary with the ancient Samaveda Samhita.'
      ]},
      {title:'The subtle body',paragraphs:[
        'The text maps the human organism through channels and centres that do not correspond to ordinary gross anatomy. Ida, pingala and sushumna are especially important because the yogic process seeks to redirect the life-force into the central channel.',
        'Chakras are described as stations in this internal geography. Their petals, locations and associated powers supply a contemplative map through which the body becomes a field of sacred practice rather than merely an obstacle to liberation.'
      ]},
      {title:'Kundalini and breath',paragraphs:[
        'Kundalini is presented as a dormant power whose awakening changes the movement of prana. Breath-control, bodily locks and concentrated attention are not independent exercises; they prepare the central ascent.',
        'The work repeatedly joins pranayama to purification of the channels. Control of breath is therefore both physiological discipline and a means of changing the conditions under which mind ordinarily follows the senses.'
      ]},
      {title:'Hamsa and inner sound',paragraphs:[
        'The natural movement of breathing is interpreted through the hamsa or soham mantra. Every breath can thus be heard as an unceasing recitation that normally passes unnoticed.',
        'The same interiorizing tendency appears in its treatment of nada. As practice becomes subtler, mantra and breath lead toward a state in which mental differentiation is no longer dominant.'
      ]},
      {title:'Relation to Hatha and Tantra',paragraphs:[
        'The Yogachudamani belongs to the history in which Upanishadic self-knowledge, mantra and the technical body of Hatha/Tantric yoga were being woven together. It should not be used as evidence that the full medieval chakra system existed unchanged in the earliest Vedic period.',
        'Its importance is instead historical and theological: it shows how later yogic communities expressed a mature subtle-body praxis in the authoritative literary form of an Upanishad.'
      ]}
    ],sources:merge(D['Upaniṣad:Yogacūḍāmaṇi']?.sources,[W('Yogachudamani Upanishad','https://en.wikipedia.org/wiki/Yogachudamani_Upanishad','121-verse recension, Samaveda affiliation, Kundalini and medieval chronology.'),...common])
  });

  put('Jābāladarśana',{
    sanskritTitle:'जाबालदर्शनोपनिषद्',language:'Sanskrit',period:'c. 10th–15th century CE',extent:'A substantial Yoga Upanishad organized around a developed eight-limbed discipline',
    leadParagraphs:[
      'The Jabaladarshana, also called Darshana Upanishad, is one of the most systematic Yoga Upanishads. It presents an eight-limbed path but expands the ethical and practical material far beyond a simple list of Patanjali’s limbs.',
      'Its interest lies in integration. Yama, niyama, posture, breath, withdrawal, concentration, meditation and samadhi are joined to nadi purification and Vedantic self-knowledge, making the work a bridge between moral discipline, bodily yoga and liberation.'
    ],articleSections:[
      {title:'Date and place among the Yoga Upanishads',paragraphs:[
        'The received work belongs to the medieval Yoga-Upanishad corpus. Its developed nadi and pranayama system is later than the oldest Yoga Upanishads, although exact dating remains uncertain.',
        'The text is transmitted as a Vedic Upanishad in later anthologies and should be read as evidence for the medieval consolidation of yoga under shruti authority.'
      ]},
      {title:'Yama and niyama',paragraphs:[
        'The ethical beginning is unusually detailed. Restraints and observances regulate violence, truth, sexuality, possession, food, austerity, purity, devotion and disciplined study before the practitioner turns to breath or concentration.',
        'This ordering matters. The text does not present yoga as a set of neutral bodily techniques; the body and breath are trained inside an ethical way of life.'
      ]},
      {title:'Posture, channels and pranayama',paragraphs:[
        'Asana establishes steadiness for the work of breath. The Upanishad then describes internal channels and prescribes purification so that prana can be regulated without the obstructions assumed in the subtle-body model.',
        'Pranayama is treated through measured inhalation, retention and exhalation. Its purpose is not athletic display but the weakening of mental and sensory dispersion.'
      ]},
      {title:'Withdrawal, concentration and samadhi',paragraphs:[
        'Pratyahara turns the senses away from automatic pursuit of objects. Dharana fixes attention, dhyana sustains it, and samadhi marks the point at which ordinary division between meditator and object ceases to govern experience.',
        'The text’s eight limbs therefore resemble the classical sequence while being embedded in a later body of nadi and Vedantic teaching. Similar labels should not conceal differences in practical detail.'
      ]},
      {title:'Yoga and self-knowledge',paragraphs:[
        'The final purpose is realization of the self, not mastery of technique. The Upanishad repeatedly places disciplined yoga in the service of liberating knowledge.',
        'This is one of the defining tendencies of the Yoga Upanishads as a corpus: methods associated with bodily and meditative yoga are interpreted as means toward the Upanishadic problem of Atman and Brahman.'
      ]}
    ],sources:merge(D['Upaniṣad:Jābāladarśana']?.sources,[AIY,AYY,DEU,MUK,'Modern studies of Yoga-Upanishad eight-limbed systems'])
  });

  put('Amṛtabindu',{
    sanskritTitle:'अमृतबिन्दूपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE for the early core',extent:'Two principal manuscript forms; about 22 verses in a short recension and about 38 in an expanded form',primaryRecensions:['Short recension','Expanded recension'],
    leadParagraphs:[
      'The Amritabindu Upanishad is one of the shortest and most influential Yoga-Vedanta texts. Its famous opening makes the mind the immediate field of bondage and liberation: mind attached to objects binds; mind freed from compulsive object-dependence becomes the means of release.',
      'The title, “drop of immortality,” suits its compressed style. Rather than offering a long narrative, the text condenses a theory of mind, meditation, Om and Brahman into a small number of verses whose transmission differs between manuscripts.'
    ],articleSections:[
      {title:'Date and recensional history',paragraphs:[
        'The early core is often placed between about 100 BCE and 300 CE. Manuscripts circulate in both shorter and expanded forms, and Veda affiliation can vary between collections.',
        'The variation is significant because later editors can produce different verse totals without one edition necessarily being corrupt. The text grew inside a living minor-Upanishad transmission.'
      ]},
      {title:'Mind as bondage and liberation',paragraphs:[
        'The opening claim is psychological rather than anti-intellectual: bondage occurs when mind is driven by attachment to objects, while liberation requires a mind capable of resting without compulsive projection.',
        'This does not mean the mind itself becomes the supreme Self. The practice is to purify and quiet the instrument so that what is not reducible to mental movement can be known.'
      ]},
      {title:'Om and contemplative method',paragraphs:[
        'Om functions as a support for gathering the mind. The practitioner uses sound and meaning until concentration no longer depends on the audible support.',
        'The relation between mantra and silence resembles other Bindu Upanishads: a finite sign is valuable because it directs awareness toward what cannot itself be confined to a sign.'
      ]},
      {title:'Brahman beyond conceptual division',paragraphs:[
        'The text uses compact nondual language to deny final reality to the distinctions that organize ordinary thought. The knower is not liberated by accumulating descriptions of Brahman but by the cessation of the ignorance that makes the self appear limited.',
        'For this reason Amritabindu became attractive to Vedanta compilers as well as to Yoga traditions. Its yoga is psychological discipline ordered toward knowledge.'
      ]},
      {title:'Reception',paragraphs:[
        'Its aphoristic statements on mind are frequently quoted outside complete editions of the Upanishad. That popularity can obscure the small but coherent sequence from mind-control through mantra to knowledge.',
        'Modern editions should identify which recension they print, especially when verse numbers are used in scholarship or teaching.'
      ]}
    ],sources:merge(D['Upaniṣad:Amṛtabindu']?.sources,[W('Amritabindu Upanishad','https://en.wikipedia.org/wiki/Amritabindu_Upanishad','Early chronology, manuscript versions and teaching on mind.'),...common])
  });

  put('Amṛtanāda',{
    sanskritTitle:'अमृतनादोपनिषद्',language:'Sanskrit',period:'c. 100 BCE–500 CE for an early core, with later transmission',extent:'Compact Yoga Upanishad; verse numbering varies among collections',
    leadParagraphs:[
      'The Amritanada Upanishad joins Om with a six-limbed yoga. Its “immortal sound” is not an invitation to chase auditory phenomena for their own sake; mantra, breath, withdrawal and concentration are stages in the quieting of a mind that ordinarily scatters itself among objects.',
      'It is distinct from Amritabindu even though modern web catalogues sometimes confuse or redirect the titles. Sanskrit collections preserve Amritanada as its own Yoga-Upanishad text.'
    ],articleSections:[
      {title:'Textual identity',paragraphs:[
        'The work belongs to the early-to-middle Yoga-Upanishad corpus, though a precise composition year is not recoverable. Its title and contents must be distinguished from Amritabindu.',
        'Later anthologies can assign different Vedic affiliations or numbering, making incipit and contents more reliable identifiers than title alone.'
      ]},
      {title:'The six limbs',paragraphs:[
        'The text gives pranayama, pratyahara, dhyana, dharana, tarka and samadhi as six limbs. The sequence differs from Patanjali’s eightfold yoga and therefore preserves an alternative early taxonomy.',
        'Tarka here belongs to contemplative discernment rather than public logical debate. It helps the practitioner discriminate what is transient from the reality sought in absorption.'
      ]},
      {title:'Breath and withdrawal',paragraphs:[
        'Pranayama steadies the vital process, while pratyahara breaks the automatic movement of the senses toward their objects. These are preparatory because a distracted mind cannot sustain meditation merely by hearing doctrinal statements.',
        'The body is disciplined so that attention can become less dependent on bodily disturbance, not because bodily control is itself liberation.'
      ]},
      {title:'Om, meditation and samadhi',paragraphs:[
        'Om provides a contemplative focus. Dhyana and dharana deepen the continuity of attention until samadhi is possible.',
        'The final orientation remains Brahman and liberation. “Immortal sound” is therefore a path-marker within a theology of knowledge, not a separate metaphysical substance.'
      ]},
      {title:'Place in Yoga history',paragraphs:[
        'Amritanada is important because it shows that several limb-systems circulated before later yoga literature standardized particular lists. The Yoga Upanishads preserve a family resemblance, not one uniform technical school.',
        'Comparing it with Nadabindu, Kshurika and Yogatattva helps reconstruct how mantra, breath and meditative taxonomies were combined in different ways.'
      ]}
    ],sources:merge(D['Upaniṣad:Amṛtanāda']?.sources,[AIY,AYY,DEU,MUK,'Yoga-Upanishad Sanskrit editions distinguishing Amritanada from Amritabindu'])
  });

  put('Kṣurikā',{
    sanskritTitle:'क्षुरिकोपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE in a common modern chronology',extent:'1 chapter, about 25 verses',
    leadParagraphs:[
      'The Kshurika Upanishad takes its name from a razor. The razor is disciplined mind: sharpened by posture, breath and concentration, it cuts the bonds that keep attention attached to the changing field of sense experience.',
      'The work is compact but technically clear. It moves from bodily preparation into pranayama and withdrawal, then uses the razor metaphor for concentration through the subtle channels and liberation from samsara.'
    ],articleSections:[
      {title:'Date, Veda affiliation and structure',paragraphs:[
        'The text is often placed with the early Yoga Upanishads around 100 BCE–300 CE. Manuscripts attach it either to the Krishna Yajurveda or the Atharvaveda.',
        'The commonly cited recension has one chapter of about twenty-five verses. Its brevity is part of its character: one sustained metaphor organizes the entire discipline.'
      ]},
      {title:'The razor of meditation',paragraphs:[
        'Kshurika is the mind made sharp enough to separate the self from habitual identification with body, sense and desire. The image is surgical rather than violent: ignorance and attachment are what must be cut.',
        'The practitioner does not destroy the body. Instead attention is trained to distinguish the witness from the changing processes observed within embodiment.'
      ]},
      {title:'Asana, breath and withdrawal',paragraphs:[
        'Steady posture and measured breath create the conditions for internal concentration. Pratyahara withdraws the senses from automatic outward movement.',
        'These preliminary limbs are practical expressions of the razor image. A mind constantly pulled outward is blunt; concentrated awareness becomes capable of cutting the knot of identification.'
      ]},
      {title:'Nadis and liberation',paragraphs:[
        'The meditation proceeds through subtle bodily locations and channels. The technical map is used to guide concentration rather than to provide gross anatomical description.',
        'The culmination is knowledge of the self and freedom from rebirth. Yogic technique has meaning because it ends in liberation, not because subtle-body experience is treated as the final goal.'
      ]},
      {title:'Historical importance',paragraphs:[
        'The work is one of the early witnesses to the integration of pranayama and subtle-body concentration within an Upanishadic framework.',
        'Its relative chronology is useful in comparing the earlier Yoga Upanishads with later texts such as Yogakundalini and Varaha, where the technical body is developed in much greater detail.'
      ]}
    ],sources:merge(D['Upaniṣad:Kṣurikā']?.sources,[W('Kshurika Upanishad','https://en.wikipedia.org/wiki/Kshurika_Upanishad','One chapter, 25 verses, early chronology, Veda affiliations and razor metaphor.'),...common])
  });

  put('Tejobindu',{
    sanskritTitle:'तेजोबिन्दूपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE for the early text; verse count varies by manuscript',extent:'One of the Bindu Upanishads; verse count and Veda affiliation vary by manuscript',
    leadParagraphs:[
      'The Tejobindu Upanishad, the “point of radiance,” combines rigorous meditation with uncompromising Vedantic language. It repeatedly insists that conceptual learning without contemplative transformation is insufficient, then sets out a yoga whose purpose is the disappearance of the distinction between meditator, meditation and Brahman.',
      'Its recensions vary, but the work is one of the strongest Yoga-Upanishadic examples of practice and nondual knowledge being treated as one path rather than rival disciplines.'
    ],articleSections:[
      {title:'Date and manuscript variation',paragraphs:[
        'The core is commonly placed around 100 BCE–300 CE. Manuscripts differ in verse count and may attach the text to the Yajurveda or Atharvaveda.',
        'The title can also appear as Tejabindu in some catalogues. These differences make manuscript identification important when citing individual verses.'
      ]},
      {title:'The radiant bindu',paragraphs:[
        'Bindu is the concentrated point in which the audible and conceptual aspects of meditation are gathered. “Radiance” describes consciousness rather than physical light alone.',
        'The symbol directs attention from multiplicity to a focus that can itself be transcended. The point is a method, not a miniature object imagined to be Brahman.'
      ]},
      {title:'A fifteen-limbed yoga',paragraphs:[
        'The longer teaching expands yoga into a distinctive fifteen-limbed discipline. Familiar terms are supplemented by practices of discrimination, silence and contemplative absorption.',
        'The expanded list shows why “Yoga Upanishad” does not mean every text repeats Patanjali. Different traditions reorganized discipline according to their own account of liberating knowledge.'
      ]},
      {title:'Meditation beyond book-learning',paragraphs:[
        'The Upanishad sharply contrasts accumulated verbal learning with actual realization. This is not contempt for scripture: the scripture itself uses words to warn that words must culminate in direct knowledge.',
        'Meditation becomes increasingly non-objective. The final state is not a subject staring at Brahman as an external thing, but a collapse of the ignorance that established that duality.'
      ]},
      {title:'Advaita and reception',paragraphs:[
        'The strongly nondual vocabulary made Tejobindu attractive in Advaita-oriented Yoga collections. Its historical significance lies in the fusion: body, breath and meditative discipline are given a Vedantic culmination.',
        'A careful article must still distinguish the early core from the exact form of later expanded manuscripts rather than presenting one printed recension as the only text.'
      ]}
    ],sources:merge(D['Upaniṣad:Tejobindu']?.sources,[W('Tejobindu Upanishad','https://en.wikipedia.org/wiki/Tejobindu_Upanishad','Early chronology, manuscript variation, Bindu classification and meditation.'),...common])
  });

  put('Dhyānabindu',{
    sanskritTitle:'ध्यानबिन्दूपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE for the short core; the longer recension contains expanded yoga material',extent:'Short recension about 23 verses; long recension about 106 verses',primaryRecensions:['Short Atharvavedic recension','Longer Samavedic recension'],
    leadParagraphs:[
      'The Dhyanabindu Upanishad is a meditation text transmitted in two markedly different lengths. The short form concentrates on the subtlety of meditation and the self present in all beings; the longer form adds a much larger technical yoga involving Om, breath, channels and meditative absorption.',
      'Its history is therefore visible inside the manuscript tradition. Treating the 23-verse and 106-verse forms as though they were identical obscures how Yoga-Upanishadic texts could expand in transmission.'
    ],articleSections:[
      {title:'Two recensions',paragraphs:[
        'The short recension is commonly attached to the Atharvaveda and has about twenty-three verses. A much longer form of about 106 verses circulates with Samavedic affiliation.',
        'The longer text is not merely the short text with spelling changes. It incorporates a developed sequence of breath and subtle-body practices, showing substantial literary expansion.'
      ]},
      {title:'Meditation and the subtle self',paragraphs:[
        'The title joins dhyana, meditation, with bindu, point or seed. Silence and subtle concentration are used to turn awareness away from gross objects.',
        'The practitioner is repeatedly directed to recognize the self in living beings rather than reducing meditation to private interior experience. The “part” must be understood in relation to the whole.'
      ]},
      {title:'Om and pranayama in the longer text',paragraphs:[
        'The expanded recension develops Om as a meditative structure and adds regulation of breath. The syllable becomes a map through which attention is gathered into subtler stages.',
        'Pranayama prepares for sustained concentration, while the subtle body gives the practitioner a symbolic geography for that inward movement.'
      ]},
      {title:'Six-stage yoga and absorption',paragraphs:[
        'The longer form teaches a staged yoga leading from control of breath and senses toward concentration and samadhi. Its organization overlaps with other early Yoga Upanishads without reproducing any one of them exactly.',
        'The final purpose is self-knowledge. The bindu and the practices surrounding it are supports that become unnecessary when the sought reality is directly known.'
      ]},
      {title:'Textual history and reception',paragraphs:[
        'Dhyanabindu is especially useful for the history of Yoga because its recensions preserve two different scales of the same named scripture.',
        'Modern editions should therefore identify the recension. Apparent contradictions in verse count often reflect real textual history rather than simple editorial error.'
      ]}
    ],sources:merge(D['Upaniṣad:Dhyānabindu']?.sources,[W('Dhyanabindu Upanishad','https://en.wikipedia.org/wiki/Dhyanabindu_Upanishad','23- and 106-verse versions, Veda affiliations and meditation teaching.'),...common])
  });

  put('Brahmavidyā',{
    sanskritTitle:'ब्रह्मविद्योपनिषद्',language:'Sanskrit',period:'c. 100 BCE–300 CE for an early core; expanded manuscripts are later',extent:'Short recension about 14 verses; expanded recension about 110 verses',primaryRecensions:['Short recension','Expanded Telugu/Scholastic recension'],
    leadParagraphs:[
      'The Brahmavidya Upanishad uses Om, breath and mantra to teach “knowledge of Brahman.” Its manuscript history is unusually revealing: a very short text and a much larger expanded version circulate under the same title.',
      'The larger recension develops hamsa/soham, breath and guru-centred instruction. The result is a Yoga-Vedanta scripture in which sonic practice is meant to mature into knowledge of the self.'
    ],articleSections:[
      {title:'Date and recensions',paragraphs:[
        'The short core is commonly placed with the early Yoga Upanishads around 100 BCE–300 CE. A much longer recension, especially in southern manuscript collections, clearly represents expanded transmission.',
        'Some catalogues attach the short form to the Atharvaveda and the long form to the Krishna Yajurveda. This should be recorded as recensional evidence rather than harmonized away.'
      ]},
      {title:'The structure of Om',paragraphs:[
        'A central concern is the internal structure of Om—its sound, measures, beginning, fading and contemplative significance. The practitioner is taught to attend not only to the pronounced syllable but to its dissolution.',
        'The fading of sound becomes a model for mind itself: attention moves from articulated difference toward the undivided reality indicated by the mantra.'
      ]},
      {title:'Hamsa and the movement of breath',paragraphs:[
        'The expanded text interprets ordinary respiration through hamsa or soham. Breath thereby becomes an involuntary mantra already present in embodied life.',
        'Yoga makes that unnoticed process conscious. The aim is not simply breath-counting but recognition of the relation between the individual life-current and Brahman.'
      ]},
      {title:'Guru and Brahma-vidya',paragraphs:[
        'Because the text is about knowledge, correct instruction matters. The guru is not merely a ceremonial figure but the one who clarifies how mantra, breath and doctrine point beyond themselves.',
        'The work thus integrates a pedagogical relationship with yogic technique, a pattern that becomes increasingly explicit in later Yoga and Tantra literature.'
      ]},
      {title:'Historical significance',paragraphs:[
        'Brahmavidya is evidence for both early Yoga-Upanishadic meditation and later expansion. The manuscript gulf between fourteen and roughly one hundred ten verses should be central to any account of the work.',
        'Its title is generic enough to appear elsewhere in Sanskrit literature, so exact identification requires the Upanishadic incipit and recension.'
      ]}
    ],sources:merge(D['Upaniṣad:Brahmavidyā']?.sources,[W('Brahmavidya Upanishad','https://en.wikipedia.org/wiki/Brahmavidya_Upanishad','Early chronology, short and expanded recensions, Om and Yoga.'),...common])
  });

  put('Yogatattva',{
    sanskritTitle:'योगतत्त्वोपनिषद्',language:'Sanskrit',period:'c. 2nd century CE for an early form; expanded recensions are later',extent:'Short recension about 15 verses; expanded recension about 142–143 verses',primaryRecensions:['Short Atharvavedic recension','Expanded recension often linked with the Krishna Yajurveda'],
    leadParagraphs:[
      'The Yogatattva Upanishad is one of the most important synthetic Yoga texts in the Upanishadic corpus. It refuses to separate knowledge from practice: knowledge without yoga is ineffective for liberation, while yoga without knowledge cannot complete the task.',
      'The work is also textually layered. A short recension and a much larger expanded version circulate under the same title, and the longer form contains a developed classification of mantra, laya, hatha and raja yoga.'
    ],articleSections:[
      {title:'Date, recensions and Veda affiliation',paragraphs:[
        'An early form is commonly placed around the second century CE, while the expanded technical material may reflect later development. Manuscripts preserve striking differences in length.',
        'The short text may be associated with the Atharvaveda, while the expanded southern recension is often attached to the Krishna Yajurveda. The competing affiliations are part of its actual transmission.'
      ]},
      {title:'Knowledge and yoga',paragraphs:[
        'The defining statement is that jnana without yoga and yoga without jnana are both insufficient. The work therefore rejects two one-sided spiritual ideals: purely conceptual knowledge and purely technical attainment.',
        'Yoga disciplines mind and body so that knowledge can become transformative; knowledge supplies the understanding without which technique remains finite.'
      ]},
      {title:'Four forms of yoga',paragraphs:[
        'The expanded text distinguishes mantra-yoga, laya-yoga, hatha-yoga and raja-yoga. They are not presented as four unrelated modern “styles” but as different modes of disciplining sound, mind, body and awareness.',
        'The classification is historically valuable because it shows the vocabulary of Hatha and Raja yoga being organized within an Upanishadic theology of liberation.'
      ]},
      {title:'Pranayama, mudra and subtle practice',paragraphs:[
        'The technical chapters describe breath regulation and bodily seals alongside meditative control. The subtle body is assumed as the field through which prana can be redirected.',
        'These practices are always subordinated to the final problem of the self. Extraordinary effects are not treated as equivalent to moksha.'
      ]},
      {title:'Reception and importance',paragraphs:[
        'Yogatattva became a key source for modern histories of Hatha and Yoga-Upanishad traditions because it explicitly names multiple yoga systems and insists on their relation to knowledge.',
        'Its two very different recensions also warn against citing “the Yogatattva” without identifying the text being used.'
      ]}
    ],sources:merge(D['Upaniṣad:Yogatattva']?.sources,[W('Yogatattva Upanishad','https://en.wikipedia.org/wiki/Yogatattva_Upanishad','Recensions, c. 2nd-century dating, four yogas and 143-verse expanded text.'),...common])
  });

  put('Yogaśikhā',{
    sanskritTitle:'योगशिखोपनिषद्',language:'Sanskrit',period:'Early core possibly first centuries CE; long six-chapter recension developed later',extent:'Short version about 10 verses; long recension 6 chapters and roughly 390 verses',primaryRecensions:['Very short recension often linked with the Atharvaveda','Long six-chapter recension often linked with the Krishna Yajurveda'],
    leadParagraphs:[
      'The Yogashikha Upanishad survives in two radically different scales. A tiny text and a long six-chapter work circulate under the same title; the latter develops a synthetic “Mahayoga” in which mantra, hatha, laya, raja yoga and knowledge are brought together.',
      'The textual difference is so large that any serious article must begin with recension. The long text is not simply a verbose copy of the short one; it represents an extensive history of expansion and systematization.'
    ],articleSections:[
      {title:'Short and long recensions',paragraphs:[
        'Some anthologies preserve a short Yogashikha of only around ten verses and associate it with the Atharvaveda. Southern collections commonly transmit a long Krishna-Yajurvedic version in six chapters, roughly forty times larger.',
        'The first chapter of the long recension incorporates material corresponding to the short text, but the subsequent chapters develop a much broader yoga system.'
      ]},
      {title:'Mahayoga',paragraphs:[
        'The long recension presents a synthetic yoga in which mantra, hatha, laya and raja are coordinated rather than competing paths. “Mahayoga” names their integration toward liberation.',
        'The text also insists that practice and knowledge belong together. Yogic discipline without knowledge cannot provide the final release, while verbal knowledge without discipline remains unstable.'
      ]},
      {title:'Prana, kundalini and the subtle body',paragraphs:[
        'The expanded work gives substantial attention to the channels, breath and awakening of latent power. Hatha techniques are placed inside a larger contemplative framework rather than treated as physical culture.',
        'The central channel and ascent of prana provide the internal geography through which laya and meditative absorption are described.'
      ]},
      {title:'Nada and laya',paragraphs:[
        'Inner sound becomes a means for dissolving mental activity. Laya is not simple unconsciousness; it is the progressive absorption of the mind’s ordinary differentiating movement.',
        'This material links Yogashikha with Nadabindu and later Hatha texts while retaining a strongly Vedantic account of the final realization.'
      ]},
      {title:'Textual history and reception',paragraphs:[
        'The enormous difference between recensions makes Yogashikha one of the clearest examples of a Yoga Upanishad growing in transmission.',
        'Modern references should identify “short” or “long” Yogashikha and the Veda affiliation of the edition. Otherwise chapter and verse references can be meaningless across versions.'
      ]}
    ],sources:merge(D['Upaniṣad:Yogaśikhā']?.sources,[W('Yogashikha Upanishad','https://en.wikipedia.org/wiki/Yogashikha_Upanishad','Short and long versions, six chapters, verse variation and Mahayoga.'),...common])
  });

  put('Yogakuṇḍalinī',{
    sanskritTitle:'योगकुण्डलिन्युपनिषद्',language:'Sanskrit',period:'c. 10th–15th century CE in its mature received form',extent:'3 chapters, 171 verses',
    leadParagraphs:[
      'The Yogakundalini Upanishad is one of the most technically explicit texts in the 108. Its three chapters move from the causes of mental activity and preparation of the body, through the awakening and ascent of kundalini, to a final account of self-knowledge and liberation while living.',
      'Unlike the early Yoga Upanishads, it presupposes a mature Hatha and subtle-body vocabulary. Diet, asana, breath, bandha, shakti-chalana and the central channel all belong to the practical sequence.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The received work is medieval in character, even though precise dating varies. Its mature kundalini and Hatha vocabulary makes it later than texts such as Kshurika and the early Bindu Upanishads.',
        'The Muktika canon associates it with the Krishna Yajurveda. The common text has three chapters and 171 verses.'
      ]},
      {title:'Chapter 1 — mind, food and preparation',paragraphs:[
        'The opening identifies both vasana, habitual tendency, and prana as factors in the movement of mind. Yoga works upon prana because the mental and vital processes are treated as mutually connected.',
        'Moderate diet, posture and preparatory discipline are therefore part of the philosophical path. The body is prepared so that breath can be regulated without destabilizing the practitioner.'
      ]},
      {title:'Chapter 2 — Shakti-chalana and kundalini',paragraphs:[
        'The second chapter turns to the awakening of the dormant power. Through breath and bodily methods, prana is directed toward sushumna and kundalini is described as rising through the internal system.',
        'The text uses the image of fire generated by churning: knowledge does not blaze merely because wood is present; yogic effort supplies the friction by which latent capacity becomes manifest.'
      ]},
      {title:'Chapter 3 — self-knowledge and jivanmukti',paragraphs:[
        'The final chapter shifts decisively from subtle-body mechanics to Atman and Brahman. The culmination of kundalini yoga is not possession of an extraordinary bodily state but realization of the nondual ground.',
        'The liberated person is described through knowledge rather than through permanent performance of techniques. This prevents the work from being reduced to an esoteric physiology manual.'
      ]},
      {title:'Relation to Hatha and Shakta traditions',paragraphs:[
        'Yogakundalini became important to both Hatha-yoga history and Shakta interpretations because it presents kundalini as a central transformative power.',
        'Its Upanishadic framing places that power inside a Vedantic horizon of liberation, one of the clearest examples of medieval yoga and Upanishadic theology being fused.'
      ]}
    ],sources:merge(D['Upaniṣad:Yogakuṇḍalinī']?.sources,[W('Yoga-kundalini Upanishad','https://en.wikipedia.org/wiki/Yoga-kundalini_Upanishad','Three chapters, 171 verses, Hatha/Lambika yoga, Kundalini and self-knowledge.'),...common])
  });

  put('Varāha',{
    sanskritTitle:'वराहोपनिषद्',language:'Sanskrit',period:'c. 13th–16th century CE',extent:'5 chapters, about 247 verses in a common recension',
    leadParagraphs:[
      'The Varaha Upanishad is a large medieval Yoga-Vedanta text framed as Bhagavan Varaha teaching the sage Ribhu. Its five chapters combine a detailed analysis of tattvas with postures, pranayama, subtle-body practice and a strongly nondual account of liberation.',
      'Its Vaishnava frame should not mislead the reader into expecting a narrative Purana. Varaha appears here as the divine teacher of a technical yoga whose goal is knowledge of the Self.'
    ],articleSections:[
      {title:'Date, frame and structure',paragraphs:[
        'The received text is generally placed between the thirteenth and sixteenth centuries CE. It belongs to the late medieval Yoga-Upanishad world and is associated with the Krishna Yajurveda.',
        'Five chapters organize the dialogue of Varaha and Ribhu. The text is much larger and more technical than the early Yoga Upanishads.'
      ]},
      {title:'Tattvas and the constitution of experience',paragraphs:[
        'The opening analyses the principles through which embodied experience is constructed. Elements, senses, mind and subtler categories are enumerated so that the practitioner can distinguish the witnessing self from the system it illuminates.',
        'This enumeration gives the yoga an intellectual map. Practice is not supposed to manipulate an unexplained body; it is grounded in a theory of what the person is and is not.'
      ]},
      {title:'Asanas and bodily discipline',paragraphs:[
        'The Upanishad describes multiple postures and the bodily steadiness required for further practice. The list belongs to a period when asana had become far more elaborated than in the earliest meditative texts.',
        'Posture remains preparatory. Its value is measured by whether it supports breath-control and stable knowledge, not by variety for its own sake.'
      ]},
      {title:'Pranayama, subtle body and Sampuṭa yoga',paragraphs:[
        'Later chapters describe breath regulation and specialized internal methods, including forms of sampuṭa practice. The central channel and yogic physiology provide the map for inward concentration.',
        'These techniques belong to the same medieval environment as developed Hatha yoga, but the Upanishad interprets them through the authority of Varaha and Vedantic liberation.'
      ]},
      {title:'Jnana and liberation',paragraphs:[
        'The dialogue repeatedly refuses to separate yoga from knowledge. Ribhu’s goal is to recognize the self that remains untouched by the tattvas analysed at the beginning.',
        'The five-chapter structure therefore forms an arc from analysis of embodiment through discipline to nondual realization. The technical middle cannot be understood without its Vedantic conclusion.'
      ]}
    ],sources:merge(D['Upaniṣad:Varāha']?.sources,[W('Varaha Upanishad','https://en.wikipedia.org/wiki/Varaha_Upanishad','Five chapters, 247 verses, medieval dating, Varaha–Ribhu dialogue and Yoga-Vedanta.'),...common])
  });

  put('Haṃsa',{
    sanskritTitle:'हंसोपनिषद्',language:'Sanskrit',period:'2nd millennium CE; before the early 17th century',extent:'11 chapters in a common recension; multiple manuscript versions survive',primaryRecensions:['Calcutta recension','Poona recension and related manuscript forms'],
    leadParagraphs:[
      'The Hamsa Upanishad is a late Yoga text centred on the mantra concealed in ordinary breathing. The incoming and outgoing breath are interpreted as an unceasing hamsa/soham recitation; practice makes conscious what embodied life is already said to perform thousands of times each day.',
      'Its eleven chapters combine mantra, subtle-body symbolism, inner sound and a strongly Tantric-Shakta colouring. The work is therefore much later in texture than the early Upanishads despite its place in the Muktika canon.'
    ],articleSections:[
      {title:'Date and manuscript history',paragraphs:[
        'The text belongs to the second millennium CE and existed before the seventeenth century, when Dara Shikoh’s Persian Upanishad collection included a Hamsa text.',
        'Calcutta and Poona editions preserve differences in layout and wording. The common message is recognizable, but chapter and verse citation requires an identified edition.'
      ]},
      {title:'Hamsa and Soham',paragraphs:[
        'Hamsa becomes both bird and mantra. The natural rhythm of breathing is heard as ham-sa or so-ham, “I am He,” converting respiration into an ajapa, an unspoken recitation.',
        'The doctrine makes mantra continuous with life rather than an occasional ritual act. Yoga consists partly in recognizing the sacred pattern already moving through the body.'
      ]},
      {title:'The heart-lotus and subtle symbolism',paragraphs:[
        'The hamsa is visualized in the heart-lotus through a dense symbolic anatomy involving Agni, Soma, Om, Rudra and Shakti. The bird becomes a diagram of cosmic and bodily powers.',
        'These chapters belong to the Tantric phase of Yoga-Upanishad literature, where mantra, deity and subtle body are inseparable.'
      ]},
      {title:'Nada and the Paramahamsa',paragraphs:[
        'Inner sounds appear as stages in the movement of attention. The practitioner follows subtle resonance toward the state symbolized by the Paramahamsa, the supreme hamsa.',
        'The final term does not merely name a bird or social class of renouncer; it expresses the identity of the migrating individual principle with the supreme spiritual reality.'
      ]},
      {title:'Reception',paragraphs:[
        'The hamsa-soham doctrine became enormously influential across yoga, Vedanta and Tantra. Later traditions often teach the ajapa mantra independently of the complete Upanishad.',
        'The text’s late date is important: it documents the maturation of breath-mantra and subtle-body practice rather than the unchanged survival of a system from the earliest Vedic period.'
      ]}
    ],sources:merge(D['Upaniṣad:Haṃsa']?.sources,[W('Hamsa Upanishad','https://en.wikipedia.org/wiki/Hamsa_Upanishad','Second-millennium chronology, eleven chapters, recensions and hamsa/soham practice.'),...common])
  });

  put('Triśikhi-Brāhmaṇa',{
    sanskritTitle:'त्रिशिखिब्राह्मणोपनिषद्',language:'Sanskrit',period:'c. 8th–14th century CE',extent:'Substantial Yoga Upanishad combining cosmology, body and an expanded limb-system',
    leadParagraphs:[
      'The Trishikhi-Brahmana Upanishad is a substantial synthetic Yoga text. It begins with cosmology and the relation between body and universe before moving into ethical discipline, posture, breath, meditation and samadhi.',
      'Its importance lies in scope. Rather than offering one isolated technique, it tries to show how action, knowledge and yoga can be organized inside a single account of liberation.'
    ],articleSections:[
      {title:'Textual setting and date',paragraphs:[
        'The work belongs to the medieval Yoga-Upanishad corpus. Exact dating remains uncertain, but its developed limb-system and subtle-body material place it well after the oldest prose Upanishads.',
        'Its Brahmana title gives a Vedic literary colouring to a text whose yoga vocabulary belongs to a later intellectual world.'
      ]},
      {title:'Cosmos and body',paragraphs:[
        'The opening maps cosmic principles onto the embodied person. This microcosm–macrocosm relation provides the conceptual basis for later practice: working upon breath and awareness in the body has cosmic significance because the same principles are present at both scales.',
        'The map is symbolic and philosophical rather than a substitute for ordinary anatomy.'
      ]},
      {title:'Yama, niyama and posture',paragraphs:[
        'Ethical restraints and observances precede the technical stages. The text thereby treats yogic capacity as inseparable from disciplined conduct.',
        'Postures stabilize the practitioner and prepare the body for breath-control. Their role is functional rather than competitive.'
      ]},
      {title:'Pranayama and meditation',paragraphs:[
        'Breath-control and withdrawal turn attention inward. Concentration and meditation are then directed toward the subtle and spiritual principles previously described in cosmological terms.',
        'The movement from cosmology to practice is one of the text’s distinctive features: doctrine supplies the map that meditation inhabits.'
      ]},
      {title:'Karma, jnana and samadhi',paragraphs:[
        'The Upanishad distinguishes action and knowledge without making them enemies. Disciplined action prepares the practitioner, while knowledge and samadhi address the root misidentification that produces bondage.',
        'Its synthetic character makes Trishikhi-Brahmana an important witness to medieval attempts to reconcile several established yoga vocabularies.'
      ]}
    ],sources:merge(D['Upaniṣad:Triśikhi-Brāhmaṇa']?.sources,[AIY,AYY,DEU,MUK,'Yoga-Upanishad editions of the Trishikhi-Brahmana'])
  });

  put('Maṇḍala-Brāhmaṇa',{
    sanskritTitle:'मण्डलब्राह्मणोपनिषद्',language:'Sanskrit',period:'Medieval; exact date uncertain',extent:'5 chapters in the common recension',
    leadParagraphs:[
      'The Mandala-Brahmana Upanishad presents Narayana, the Purusha in the solar sphere, teaching Yajnavalkya a yoga directed toward self-knowledge. Its five chapters combine an eight-step discipline with taraka, inner light and the state called amanaska, “beyond mind.”',
      'The text is a good example of the permeability of later categories: it is a Yoga Upanishad with a Vaishnava divine teacher, Vedantic goal and practices that later literature would associate with Raja and Hatha yoga.'
    ],articleSections:[
      {title:'Frame, date and structure',paragraphs:[
        'The precise composition date is uncertain, but the work belongs to the medieval Yoga-Upanishad corpus. Muktika associates it with the Shukla Yajurveda.',
        'Five chapters organize the instruction from Narayana to Yajnavalkya. The solar “mandala” of the title is the sphere in which the teaching figure is envisioned.'
      ]},
      {title:'An eight-step yoga',paragraphs:[
        'The Upanishad presents an eight-step discipline, but its conceptual details do not simply reproduce Patanjali. Ethical and bodily preparation lead into increasingly subtle forms of internal concentration.',
        'The comparison is historically useful precisely because the same number of limbs can conceal different practical taxonomies.'
      ]},
      {title:'Taraka and inner vision',paragraphs:[
        'Taraka yoga uses internal and external signs of light as supports through which attention is directed beyond ordinary visual cognition.',
        'The “light” is not treated as a final external object. Its function is to lead awareness toward the consciousness in which visual signs appear.'
      ]},
      {title:'Amanaska — beyond mind',paragraphs:[
        'The culmination is described through amanaska, a state in which ordinary mental construction no longer dominates. This is not simple blankness but a mode of awareness in which dualistic thought has subsided.',
        'The text therefore links technical concentration with a Vedantic account of the self beyond the fluctuating mind.'
      ]},
      {title:'Narayana, Yajnavalkya and reception',paragraphs:[
        'The literary frame brings a famous Upanishadic sage under instruction from Narayana. This gives the yoga a Vaishnava theological setting without changing its classification as a Yoga Upanishad.',
        'The work became important in histories of taraka and amanaska traditions, especially where later Hatha and Raja yoga intersect.'
      ]}
    ],sources:merge(D['Upaniṣad:Maṇḍala-Brāhmaṇa']?.sources,[W('Mandala-brahmana Upanishad','https://en.wikipedia.org/wiki/Mandala-brahmana_Upanishad','Five chapters, Narayana–Yajnavalkya frame and Yoga/Vedanta teaching.'),...common])
  });

  put('Advayatāraka',{
    sanskritTitle:'अद्वयतारकोपनिषद्',language:'Sanskrit prose and verse',period:'c. 100 BCE–300 CE in a common broad chronology',extent:'1 chapter, 19 passages/verses including the closing praise',
    leadParagraphs:[
      'The Advayataraka Upanishad teaches the “nondual deliverer,” a yoga of inner and outer luminosity culminating in recognition of nondual Brahman. The work is very short—nineteen passages—but its compact sequence joins kundalini, taraka vision, the guru and liberation.',
      'It is especially important for the history of taraka yoga and for its strong statement that the teacher dispels the darkness that makes differentiated reality appear ultimate.'
    ],articleSections:[
      {title:'Date and structure',paragraphs:[
        'The text is commonly placed with the early Yoga Upanishads in a broad 100 BCE–300 CE range, although exact dating is uncertain. It is associated with the Shukla Yajurveda.',
        'One chapter contains eighteen teaching passages followed by a nineteenth praise passage. Its brevity makes the internal order especially important.'
      ]},
      {title:'Inner, outer and intermediate signs',paragraphs:[
        'The practitioner is directed toward luminous signs perceived through disciplined concentration. The text distinguishes modes of internal and external seeing and uses them as stages rather than final objects.',
        'The purpose is taraka, that which carries the practitioner beyond ordinary dualistic cognition.'
      ]},
      {title:'Kundalini and the centre between the brows',paragraphs:[
        'Subtle-body language locates yogic attention in the channels and the region associated with the space between the brows. The visual discipline belongs to the same family of practices later systematized in taraka and Hatha traditions.',
        'The physiology remains subordinate to realization; light and channel are means through which mind becomes capable of nondual knowledge.'
      ]},
      {title:'The guru',paragraphs:[
        'The Upanishad famously praises the guru as the one who removes darkness. The teacher is necessary because subtle experience can itself become another object of attachment unless its meaning is understood.',
        'Instruction therefore joins technique and interpretation: the practitioner is not left to identify every unusual perception with liberation.'
      ]},
      {title:'Nondual realization',paragraphs:[
        'The final teaching dissolves the distinction between individual and supreme reality produced by maya. Taraka is “advaya” because its goal is not a privileged vision within duality but freedom from duality as the final framework.',
        'The text’s influence lies less in size than in the precision with which it connects yogic luminosity, guru and nondual Vedanta.'
      ]}
    ],sources:merge(D['Upaniṣad:Advayatāraka']?.sources,[W('Advayataraka Upanishad','https://en.wikipedia.org/wiki/Advayataraka_Upanishad','One chapter, 19 passages, taraka yoga, guru and early chronology.'),...common])
  });

  put('Śāṇḍilya',{
    sanskritTitle:'शाण्डिल्योपनिषद्',traditionalAuthor:'Rishi Shandilya',language:'Sanskrit',period:'Medieval Yoga-Upanishad recension; individual strata may be older',extent:'3 chapters; one of the most detailed Yoga Upanishads',
    leadParagraphs:[
      'The Shandilya Upanishad is one of the most comprehensive Yoga Upanishads. Its three chapters expand the ethical limbs into ten yamas and ten niyamas, describe eight postures, several forms of pranayama and withdrawal, then continue through concentration, meditation and samadhi.',
      'The text is associated with the sage Shandilya and the Atharvaveda in the received canon. Its developed practical system should be read as a later Yoga synthesis rather than simply labelled “Vedic age.”'
    ],articleSections:[
      {title:'Date, authorship and three chapters',paragraphs:[
        'Traditional attribution associates the teaching with Rishi Shandilya. The received Upanishad, however, reflects a developed Yoga vocabulary and is best treated as a layered later text rather than assigned wholesale to the linguistic age of the Vedic Samhitas.',
        'Three chapters organize a remarkably detailed discipline. This scale makes the work especially useful for comparing Yoga-Upanishadic practice with Patanjali and Hatha sources.'
      ]},
      {title:'Ten yamas and ten niyamas',paragraphs:[
        'The ethical foundation is broader than the five-and-five list familiar from the Yoga Sutra. Restraints and observances address violence, truth, sexuality, possession, food, austerity, purity, devotion and other dimensions of conduct.',
        'The expanded list shows that medieval yoga communities did not inherit one immutable ethical taxonomy. They elaborated discipline according to the spiritual world of their own texts.'
      ]},
      {title:'Eight asanas and pranayama',paragraphs:[
        'The Upanishad names eight important postures and then gives technical instruction for breath. Asana provides stability; pranayama purifies and regulates the vital processes assumed to influence mind.',
        'The number of postures is modest compared with later Hatha manuals, but much larger in practical detail than the earliest Upanishadic meditation passages.'
      ]},
      {title:'Pratyahara, dharana, dhyana and samadhi',paragraphs:[
        'Withdrawal is described in several forms, showing that pratyahara is not a single mechanical act. Dharana and dhyana then organize sustained attention before samadhi.',
        'The structure remains recognizably eight-limbed, but the expanded subcategories give Shandilya its own technical identity.'
      ]},
      {title:'Brahman and liberation',paragraphs:[
        'The final object is not mastery of a limb-system. The Upanishad connects disciplined practice with knowledge of Brahman and release from limiting identification.',
        'This Vedantic conclusion is why the text belongs to the Upanishadic corpus rather than being only a manual of bodily yoga.'
      ]}
    ],sources:merge(D['Upaniṣad:Śāṇḍilya']?.sources,[W('Shandilya Upanishad','https://en.wikipedia.org/wiki/Shandilya_Upanishad','Three chapters, ten yamas and niyamas, eight asanas and detailed yoga.'),...common])
  });

  put('Pāśupatabrahma',{
    sanskritTitle:'पाशुपतब्रह्मोपनिषद्',language:'Sanskrit',period:'Later Yoga-Upanishad period; commonly placed after the earliest Yoga Upanishads',extent:'2 chapters (Purva and Uttara), 78 verses',
    leadParagraphs:[
      'The Pashupatabrahma Upanishad is a two-part Yoga-Vedanta text whose Shaiva title conceals a broad contemplative synthesis. Hamsa, Om, the inner sun, internal sacrifice and the Pashupati within are used to redirect ritual and social identity toward knowledge of Brahman.',
      'The work repeatedly internalizes what might otherwise remain external: Om is the true sacred thread, hamsa is the migrating self, and the decisive sacrifice is the transformation of awareness.'
    ],articleSections:[
      {title:'Date, frame and two khandas',paragraphs:[
        'The text is regarded as a relatively later Yoga Upanishad and is attached to the Atharvaveda in the received canon.',
        'Seventy-eight verses are divided into Purva and Uttara sections. The opening is framed as questions addressed to Brahma, while the second half develops the yogic and liberated condition.'
      ]},
      {title:'Purva-khanda — Hamsa, Om and inner sacrifice',paragraphs:[
        'Hamsa becomes the symbol of the migrating individual and the supreme self. Om is interpreted across past, present and future and is identified with the inner principle rather than only with external recitation.',
        'The text explicitly redirects yajna inward. Realization of hamsa-soham is described as accomplishing the spiritual purpose for which external sacrifice had served as a model.'
      ]},
      {title:'The inner sun and Pashupati',paragraphs:[
        'The supreme is described as an internal sun radiating within the person. Meditation through Om is therefore a movement toward the divine presence already sustaining consciousness.',
        'Pashupati, “Lord of beings,” is not treated merely as an external sectarian deity. The title names the supreme principle within the embodied field.'
      ]},
      {title:'Uttara-khanda — liberation within the body',paragraphs:[
        'The second section turns explicitly to yoga and knowledge. The highest truth is sought within the body, not because the body is ultimate but because embodied awareness is the field in which ignorance and realization occur.',
        'The liberated person is described as going beyond rigid identification with social classifications, mandates and prohibitions. This language belongs to jivanmukti, not to a general permission for the unliberated person to ignore dharma.'
      ]},
      {title:'Ahimsa and jivanmukti',paragraphs:[
        'The work explicitly associates dharma-yoga with non-injury. Ethical transformation accompanies the inward turn; meditation is not presented as morally neutral.',
        'Its combination of Pashupati terminology, hamsa, internal sacrifice and Vedantic liberation makes it one of the clearest cross-sectarian Yoga Upanishads.'
      ]}
    ],sources:merge(D['Upaniṣad:Pāśupatabrahma']?.sources,[W('Pashupatabrahma Upanishad','https://en.wikipedia.org/wiki/Pashupatabrahma_Upanishad','Two chapters, 78 verses, hamsa, internal sacrifice, yoga and jivanmukti.'),...common])
  });

  put('Mahāvākya',{
    sanskritTitle:'महावाक्योपनिषद्',language:'Sanskrit',period:'Later Yoga-Vedanta period; exact date uncertain',extent:'1 chapter, 12 verses in a common recension',
    leadParagraphs:[
      'The Mahavakya Upanishad is a very short Yoga-Vedanta text centred on the great identity-statements of the Upanishadic tradition. Its twelve verses make a simple but demanding point: meditation is complete only when ignorance about the self is destroyed.',
      'Because the scripture is so short, a responsible article should not inflate it into imaginary chapters. Its importance lies in the precise relation it draws between yogic concentration, knowledge and the mahavakya.'
    ],articleSections:[
      {title:'Textual identity and structure',paragraphs:[
        'The work is associated with the Atharvaveda in the Muktika canon. The common text has one chapter of about twelve verses.',
        'Its brevity reflects a later scholastic environment in which “mahavakya” already refers to a recognized set of Upanishadic identity-statements.'
      ]},
      {title:'The great statements',paragraphs:[
        'The text treats the mahavakyas not as slogans to be repeated without analysis but as verbal instruments whose meaning must be realized.',
        'The relation between the individual self and Brahman is therefore the central interpretive problem. Different Vedanta schools accept the authority of the older source passages while disagreeing about the exact kind of identity or dependence expressed.'
      ]},
      {title:'Meditation and ignorance',paragraphs:[
        'Concentration can steady the mind, but liberation requires removal of avidya. Yogic attainment that leaves the fundamental error of self-identification untouched is incomplete.',
        'The text thus gives meditation a Vedantic criterion: its success is measured by knowledge, not by extraordinary experience.'
      ]},
      {title:'Yoga and jnana',paragraphs:[
        'The same concern appears throughout the Yoga Upanishads but is unusually concentrated here. Practice prepares the field; the mahavakya provides the knowledge through which limitation is understood differently.',
        'The work is therefore best read alongside Yogatattva and other texts that explicitly refuse to separate yoga and jnana.'
      ]},
      {title:'Reception',paragraphs:[
        'Mahavakya’s small size made it easy to include in anthologies and to cite as support for knowledge-centred yoga.',
        'Its historical importance is proportional to the doctrine it condenses, not to the number of verses it contains.'
      ]}
    ],sources:merge(D['Upaniṣad:Mahāvākya']?.sources,[W('Mahavakya Upanishad','https://en.wikipedia.org/wiki/Mahavakya_Upanishad','One chapter, twelve verses and Yoga-Vedanta focus.'),...common])
  });
})();