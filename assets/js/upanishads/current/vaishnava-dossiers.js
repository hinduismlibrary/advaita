(() => {
  const D=window.SCRIPTURE_DETAIL_DATA=window.SCRIPTURE_DETAIL_DATA||{};
  const put=(name,data)=>{const k=`Upaniṣad:${name}`;D[k]=Object.assign({},D[name]||{},D[k]||{},data);};
  const merge=(a,b)=>[...new Map([...(a||[]),...b].map(x=>[typeof x==='string'?x:(x.title||JSON.stringify(x)),x])).values()];
  const MAH='A. Mahadeva Sastri, The Vaishnava Upanishads with Upanishad Brahmayogin';
  const AIY='K. Narayanasvami Aiyar, minor Upanishad translations';
  const DEU='Paul Deussen, Sixty Upanishads of the Veda';
  const MUK='Muktika Upanishad — 108-name and Veda catalogue';
  const common=[MAH,AIY,DEU,MUK];
  const W=(title,url,detail)=>({title:`Wikipedia — ${title}`,detail,url});

  put('Vāsudeva',{
    sanskritTitle:'वासुदेवोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE; exact redaction uncertain',extent:'Short Vaishnava mantra and sectarian-mark Upanishad',
    leadParagraphs:[
      'The Vasudeva Upanishad presents Vasudeva—Krishna understood as the all-pervading Lord—as the supreme reality and interprets Vaishnava mantra and bodily marks through that theology. It is not a narrative life of Krishna; it is a short sectarian Upanishad asking how visible practice expresses the identity of the worshipped Lord with Brahman.',
      'Its importance lies in the joining of Vedantic language with the concrete religious life of a Vaishnava. Mantra, sacred marks and meditation are not treated as separate from metaphysics: they are signs of belonging to Vasudeva and contemplative means for remembering him as the ground of all.'
    ],articleSections:[
      {title:'Date and textual identity',paragraphs:[
        'The received text is medieval, broadly c. 1200–1600 CE. A narrower date cannot be securely established from the surviving manuscript and citation record.',
        'Muktika includes it among the 108 and gives the Vedic affiliation used in later anthologies. That canonical placement belongs to the history of reception rather than to the linguistic date of the ancient Vedic Samhitas.'
      ]},
      {title:'Vasudeva as supreme reality',paragraphs:[
        'The deity-name Vasudeva is interpreted in the widest possible sense: the Lord who dwells in and pervades beings is not one finite divine figure within a larger universe but the ultimate reality on which the universe depends.',
        'This is a characteristic strategy of sectarian Upanishads. Older words such as Brahman, Atman and Narayana are coordinated with a specific form of devotion rather than left as religiously neutral abstractions.'
      ]},
      {title:'Mantra and sacred marks',paragraphs:[
        'The work connects Vaishnava mantra with the bodily signs of devotion. Tilaka and related marks function as remembered theology: the body itself becomes a place in which affiliation to Vasudeva is made visible.',
        'The marks are therefore not presented as sufficient by themselves. Their meaning depends upon knowledge and remembrance of the Lord whom they signify.'
      ]},
      {title:'Vedanta and worship',paragraphs:[
        'The text does not force a choice between worship and knowledge. Meditation on Vasudeva is a way of apprehending the supreme as personal Lord while the same Lord is affirmed as the ultimate spiritual ground.',
        'Later Vaishnava schools can therefore receive such a text differently according to their account of the relation between jiva, Brahman and Bhagavan.'
      ]},
      {title:'Transmission and reception',paragraphs:[
        'The Upanishad survives through later Vaishnava and minor-Upanishad collections rather than an ancient independent shakha manuscript tradition.',
        'Its historical value is greatest when read alongside the wider development of Vasudeva-Krishna worship and the use of shruti language in medieval Vaishnava theology.'
      ]}
    ],sources:merge(D['Upaniṣad:Vāsudeva']?.sources,[...common,'Vaishnava manuscript catalogues and sectarian Upanishad collections'])
  });

  put('Avyakta',{
    sanskritTitle:'अव्यक्तोपनिषद्',language:'Sanskrit',period:'c. 800–1400 CE',extent:'Short Vaishnava cosmological and contemplative Upanishad',
    leadParagraphs:[
      'The Avyakta Upanishad takes the “unmanifest” as its point of departure and interprets the hidden source of the cosmos through Narayana and Vasudeva. The text belongs to a later Vaishnava environment in which older Upanishadic questions about the relation of the manifest world to an unseen cause are answered through a personal supreme Lord.',
      'Its characteristic move is from cosmology to meditation: creation is not described simply to explain where the world came from, but to show why contemplation must pass beyond visible forms to the divine ground from which they arise.'
    ],articleSections:[
      {title:'Date and place in the corpus',paragraphs:[
        'A broad c. 800–1400 CE range fits the received text. Its developed sectarian theology places it later than the principal Upanishads, while exact chronology remains uncertain.',
        'The title avyakta belongs to a much older philosophical vocabulary; the antiquity of the word does not by itself date this Vaishnava Upanishad.'
      ]},
      {title:'The unmanifest and creation',paragraphs:[
        'Avyakta names the state in which differentiated names and forms have not yet appeared. The text relates this unmanifest source to the supreme Narayana rather than treating it as an autonomous material principle.',
        'Creation is thus dependent manifestation. The world is real as the Lord’s ordered manifestation while its intelligibility depends upon a cause that is not exhausted by visible forms.'
      ]},
      {title:'Narayana and Vasudeva',paragraphs:[
        'The divine names are not competing deities in the argument. They designate the supreme source known through different Vaishnava forms and theological associations.',
        'This fluidity is typical of many Vaishnava Upanishads, where Narayana, Vishnu and Vasudeva can function as mutually interpreting names of the supreme.'
      ]},
      {title:'Dhyana-yajna',paragraphs:[
        'The text turns sacrificial language inward through contemplative worship. The decisive offering becomes sustained meditation on the Lord beyond merely external action.',
        'Interiorization does not simply abolish Vedic ritual vocabulary. It preserves the sacrificial model while relocating its centre in awareness and devotion.'
      ]},
      {title:'Reception',paragraphs:[
        'The Avyakta Upanishad is less prominent than Narayana or Gopalatapani, but it is useful evidence for the way sectarian Vedanta re-read cosmological categories through devotion.',
        'Its Upanishadic status in later anthologies gave Vaishnava cosmology a shruti form even where the surviving composition is medieval.'
      ]}
    ],sources:merge(D['Upaniṣad:Avyakta']?.sources,[...common,'Vaishnava Upanishad Sanskrit editions'])
  });

  put('Nārāyaṇa',{
    sanskritTitle:'नारायणोपनिषद्',language:'Sanskrit',period:'c. 300 BCE–500 CE for an early core; later recensional transmission continued',extent:'Very short theological and mantra Upanishad',
    leadParagraphs:[
      'The Narayana Upanishad is a compact but influential declaration that Narayana is the source of Brahma, Rudra, the gods, the elements and the universe. The theological claim is followed by the eight-syllabled mantra Om namo Narayanaya, making cosmology, divine supremacy and mantra one continuous teaching.',
      'Its size is small; its influence is not. Later Vaishnava Vedanta repeatedly cites Narayana-language as shruti evidence that the supreme cause is not an impersonal abstraction but the Lord identified as Narayana.'
    ],articleSections:[
      {title:'Date and textual setting',paragraphs:[
        'The text is generally treated as substantially older than many medieval sectarian Upanishads. A broad c. 300 BCE–500 CE range is appropriate for the early theological core, though the surviving manuscript tradition is later.',
        'Its exact relation to other Narayana and Mahanarayana materials requires care because similar titles and verses circulate in more than one Vedic and Upanishadic context.'
      ]},
      {title:'Narayana as the source of all',paragraphs:[
        'The Upanishad begins from theological causality. Brahma, Rudra, Indra, the elements, directions and living beings arise from Narayana; creation is therefore placed within the sovereignty of one supreme Lord.',
        'The passage does not merely rank gods socially. It answers the Upanishadic question of first cause by identifying the source of cosmic plurality with Narayana.'
      ]},
      {title:'Om namo Narayanaya',paragraphs:[
        'The eight-syllabled mantra is presented as a concentrated means of approaching the same supreme reality described cosmologically. Om gives the Vedic frame, namah expresses reverent surrender, and Narayana names the Lord.',
        'Later mantra traditions elaborate nyasa, initiation and ritual around the formula, but the Upanishad itself provides the basic shruti authority for its sacred status.'
      ]},
      {title:'Brahman and the personal Lord',paragraphs:[
        'Narayana is not described as a finite form opposed to Brahman. The text’s force comes from identifying the supreme theological person with the ultimate reality sought by the Upanishads.',
        'Different Vedanta schools interpret the metaphysical consequences differently, but all can recognize the passage as a major Vaishnava shruti witness.'
      ]},
      {title:'Commentarial and liturgical reception',paragraphs:[
        'The text became important in Sri Vaishnava and other Vaishnava environments, especially when establishing the Vedic status of Narayana and the eight-syllabled mantra.',
        'It is frequently transmitted and recited together with other Narayana-centred Vedic materials, which makes exact textual citation especially important.'
      ]}
    ],sources:merge(D['Upaniṣad:Nārāyaṇa']?.sources,[W('Narayana Upanishad','https://en.wikipedia.org/wiki/Narayana_Upanishad','Narayana theology and mantra tradition.'),...common,'Narayana Upanishad Sanskrit editions and Vaishnava commentarial traditions'])
  });

  put('Kali-Saṇṭāraṇa',{
    sanskritTitle:'कलिसन्तरणोपनिषद्',language:'Sanskrit',period:'c. 1400–1600 CE; certainly before its early-modern circulation',extent:'Very short dialogue of Narada and Brahma centred on a sixteen-name mantra',
    leadParagraphs:[
      'The Kali-Santarana Upanishad is a tiny scripture with an enormous later reception. Narada asks Brahma how beings can cross the evils of Kali Yuga, and Brahma answers with a sixteen-name sequence built from Hare, Rama and Krishna.',
      'Because the entire work is short, its article should not be padded with invented chapters. Its real history lies in the dialogue, the exact mantra sequence, the claim made for divine-name recitation, and the extraordinary afterlife of the text in nama-bhakti traditions.'
    ],articleSections:[
      {title:'Date and textual form',paragraphs:[
        'The received work is late, broadly c. 1400–1600 CE. It was certainly in circulation by the early modern period, but a more precise composition year is not securely recoverable.',
        'The dialogue is extremely brief. Narada’s question and Brahma’s answer form the whole literary frame, followed by statements of the mantra’s power and practice.'
      ]},
      {title:'Narada’s question',paragraphs:[
        'The problem is specifically Kali Yuga: how can people cross an age described as spiritually difficult? The answer does not prescribe a complex sacrifice or philosophical curriculum.',
        'The setting gives nama-japa a theological rationale. The divine name is presented as accessible in an age where more demanding forms of practice are presumed difficult.'
      ]},
      {title:'The sixteen names',paragraphs:[
        'Brahma gives sixteen names composed from Hare, Rama and Krishna. The text presents their recitation as the means for crossing Kali’s influence.',
        'Different later communities order and interpret the names through their own devotional traditions. The Sanskrit Upanishad should therefore be quoted directly when the precise sequence is historically important.'
      ]},
      {title:'Nama and liberation',paragraphs:[
        'The theological principle is that the divine name is not an ordinary verbal label. Recitation establishes relation with the named Lord and is credited with purifying the obstructions characteristic of the age.',
        'The work thus belongs to the wider Hindu development in which remembrance and utterance of divine names become central forms of bhakti.'
      ]},
      {title:'Gaudiya and wider reception',paragraphs:[
        'The text became especially prominent in Gaudiya Vaishnavism because of the Hare Krishna/Hare Rama name-sequence, while divine-name traditions outside Gaudiya communities also cite it.',
        'Its later fame should not be confused with antiquity. The historical importance of the Upanishad lies precisely in the way a late short text could acquire enormous devotional authority.'
      ]}
    ],sources:merge(D['Upaniṣad:Kali-Saṇṭāraṇa']?.sources,[W('Kali-Santarana Upanishad','https://en.wikipedia.org/wiki/Kali-Sa%E1%B9%87%E1%B9%AD%C4%81ra%E1%B9%87a_Upani%E1%B9%A3ad','Narada–Brahma dialogue, sixteen-name mantra and reception.'),...common,'Kali-Santarana Sanskrit editions and nama-bhakti studies'])
  });

  put('Tārasāra',{
    sanskritTitle:'तारसारोपनिषद्',language:'Sanskrit',period:'c. 1000–1600 CE',extent:'Short Vaishnava mantra Upanishad',
    leadParagraphs:[
      'The Tarasara Upanishad is a mantra-centred Vaishnava text concerned with the tāraka, the formula that “carries across.” It interprets sacred names and syllables, especially Rama- and Narayana-centred forms, as condensed theology rather than arbitrary sound.',
      'Its real subject is the relation between name and liberation. Mantra works because the divine name is interpreted as revealing the supreme reality to which it refers.'
    ],articleSections:[
      {title:'Date and identity',paragraphs:[
        'The received work is medieval, broadly c. 1000–1600 CE. Exact chronology is uncertain because the text is preserved mainly in later Vaishnava and minor-Upanishad collections.',
        'The title tarasara, “essence of the deliverer,” places the work inside the wider tāraka-mantra tradition rather than identifying one single universal formula across all schools.'
      ]},
      {title:'The tāraka mantra',paragraphs:[
        'A tāraka formula is one that carries the practitioner across samsara. The Upanishad analyses sacred names syllabically so that sound, deity and metaphysical meaning are understood together.',
        'The practice is therefore contemplative exegesis: recitation is deepened by knowing what the mantra’s sounds signify.'
      ]},
      {title:'Rama, Narayana and divine identity',paragraphs:[
        'The text can coordinate more than one Vaishnava divine name because its theological claim is that the supreme reality addressed in mantra is not divided by the linguistic form through which the devotee approaches it.',
        'Later Rama and Narayana traditions can emphasize different formulas while receiving the same Upanishadic logic of liberating name.'
      ]},
      {title:'Mantra and Vedanta',paragraphs:[
        'The work does not present mantra as a magical substitute for knowledge. Syllabic analysis itself becomes a form of knowledge in which the practitioner understands the divine reality concentrated in the name.',
        'This is one of the characteristic features of sectarian minor Upanishads: mantra-shastra is presented in Vedantic terms.'
      ]},
      {title:'Transmission',paragraphs:[
        'The text survives in later collections and is comparatively little represented by early independent manuscripts.',
        'Its value lies in the history of tāraka-mantra theology and the use of Upanishadic authority for sacred-name practice.'
      ]}
    ],sources:merge(D['Upaniṣad:Tārasāra']?.sources,[...common,'Tarasara Upanishad Sanskrit editions and Rama/Narayana mantra studies'])
  });

  put('Nṛsiṃhatāpanī',{
    sanskritTitle:'नृसिंहतापनीयोपनिषद्',language:'Sanskrit',period:'c. 600–1000 CE for major layers; Purva and Uttara portions may differ in date',extent:'Two major texts, Purva-Tapaniya and Uttara-Tapaniya, with substantial mantra and Vedanta exposition',primaryRecensions:['Nrisimha Purva-Tapaniya','Nrisimha Uttara-Tapaniya'],
    leadParagraphs:[
      'The Nrisimhatapani Upanishad is among the most substantial sectarian Upanishads. Its Purva and Uttara portions take the fierce man-lion form Nrisimha, his mantra and sacred syllables as the centre of an inquiry into Om, states of consciousness, the Self and Brahman.',
      'It is not merely a hymn praising an avatara. The Tapaniya method subjects mantra to extended Upanishadic analysis so that deity, sound and metaphysics become inseparable.'
    ],articleSections:[
      {title:'Date, Tapaniya form and textual layers',paragraphs:[
        'Major layers are often placed broadly between c. 600 and 1000 CE, although the Purva and Uttara materials need not be contemporary. The Tapaniya title belongs to a family of sectarian Upanishads characterized by esoteric mantra exegesis.',
        'The two major portions should be cited separately. Their organization and doctrinal emphases differ enough that “Nrisimhatapani” can conceal more than one textual layer.'
      ]},
      {title:'Purva-Tapaniya — Nrisimha and mantra',paragraphs:[
        'The Purva section establishes Nrisimha as the supreme object of meditation and analyses the mantra through its syllables, ritual correspondences and cosmic meanings.',
        'The fierce form is interpreted spiritually: the avatara who destroys the demon becomes a symbol and presence of the power that destroys ignorance and fear.'
      ]},
      {title:'Om and the states of consciousness',paragraphs:[
        'The text draws upon the older Upanishadic analysis of waking, dream, deep sleep and the fourth. These states are coordinated with Om and Nrisimha rather than left as a purely abstract psychology.',
        'The method shows how a sectarian text appropriates classical Upanishadic structures while giving them a deity-centred interpretation.'
      ]},
      {title:'Uttara-Tapaniya — Atman and Brahman',paragraphs:[
        'The Uttara section develops the metaphysical consequences more fully. The Nrisimha mantra becomes a path to recognizing the relation between individual awareness and the supreme Brahman.',
        'Later Vedanta traditions can read these passages differently, but the work’s own strategy is clear: the supreme Lord addressed in mantra is the reality sought by Upanishadic knowledge.'
      ]},
      {title:'Reception in Nrisimha worship',paragraphs:[
        'The text became a major shruti source for Nrisimha traditions because it gives the deity not only Purana narrative authority but Upanishadic mantra and Brahman theology.',
        'Its two-part structure and layered composition remain essential for scholarly use. A quotation should identify Purva or Uttara rather than cite a vague “Nrisimha Upanishad.”'
      ]}
    ],sources:merge(D['Upaniṣad:Nṛsiṃhatāpanī']?.sources,[...common,'Nrisimha Purva- and Uttara-Tapaniya Sanskrit editions','Studies of Tapaniya Upanishads and Nrisimha mantra theology'])
  });

  put('Tripādvibhūti-Mahānārāyaṇa',{
    sanskritTitle:'त्रिपाद्विभूतिमहानारायणोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Large sectarian Upanishad with cosmological, mantra and Vedanta material',
    leadParagraphs:[
      'The Tripadvibhuti-Mahanarayana Upanishad is one of the largest Vaishnava minor Upanishads. Its title invokes the “three-quarters glory” of the supreme, using the Purusha idea of a transcendent three-quarters to distinguish Narayana’s imperishable divine plenitude from the manifested cosmos.',
      'The work combines cosmology, maya, worship, mantra, bhakti and liberation. Its scale makes it closer to a theological compendium than to a tiny mantra Upanishad.'
    ],articleSections:[
      {title:'Date, title and textual identity',paragraphs:[
        'The received text is medieval, broadly c. 1200–1600 CE. It should not be confused with the much older Mahanarayana Upanishad of the Taittiriya tradition simply because the titles overlap.',
        'The compound Tripadvibhuti-Mahanarayana identifies a distinct Vaishnava work whose manuscript history belongs to the later sectarian Upanishad corpus.'
      ]},
      {title:'The three-quarters glory',paragraphs:[
        'The title develops the old Purusha image in which only one quarter is manifest while three quarters remain transcendent. Narayana’s supreme realm therefore exceeds the visible universe without being unrelated to it.',
        'The cosmology gives a metaphysical grammar for transcendence and immanence: the Lord manifests the cosmos yet is not exhausted by cosmic manifestation.'
      ]},
      {title:'Maya and manifestation',paragraphs:[
        'Maya explains differentiated manifestation under divine sovereignty. The world of names and forms depends upon the Lord’s power rather than existing as an independent ultimate.',
        'Different Vedanta traditions interpret the ontological status of maya differently, but the text uses the category to protect both divine transcendence and cosmic dependence.'
      ]},
      {title:'Bhakti, mantra and liberation',paragraphs:[
        'Worship and mantra are joined to knowledge of Narayana. Bhakti is not treated as an emotional appendix to metaphysics; it is a mode of relation to the very reality described as supreme.',
        'Liberation is accordingly described through entry into or realization of the divine reality beyond the limitations of manifest existence.'
      ]},
      {title:'Relation to Vaishnava Vedanta',paragraphs:[
        'The text’s developed Narayana theology made it useful to later Vaishnava theologians and to readers interested in the relation between Purusha imagery and sectarian Vedanta.',
        'Its late date should be kept visible even when its doctrines echo very ancient Vedic verses.'
      ]}
    ],sources:merge(D['Upaniṣad:Tripādvibhūti-Mahānārāyaṇa']?.sources,[...common,'Tripadvibhuti-Mahanarayana Sanskrit editions','Studies of Vaishnava sectarian Upanishads'])
  });

  put('Rāmarahasya',{
    sanskritTitle:'रामरहस्योपनिषद्',language:'Sanskrit',period:'c. 1500–1700 CE',extent:'Later Rama-centred mantra Upanishad',
    leadParagraphs:[
      'The Ramarahasya Upanishad, the “secret of Rama,” gives Rama devotion an explicitly Upanishadic mantra framework. The divine name, forms of Rama, sacred syllables and ritual diagrams are treated as condensed revelations of the supreme rather than merely as devotional ornaments.',
      'Its world is late medieval and early modern Rama bhakti. The text is therefore valuable not because it is ancient Vedic prose, but because it shows how Rama-centred worship claimed and interpreted shruti authority.'
    ],articleSections:[
      {title:'Date and Rama-Upanishad setting',paragraphs:[
        'The received work is late, broadly c. 1500–1700 CE. Its mantra and sectarian ritual vocabulary belongs to the mature Rama-bhakti world.',
        'The title “rahasya” signals esoteric meaning: the text explains the inner significance of names and forms rather than narrating the Ramayana.'
      ]},
      {title:'The name Rama',paragraphs:[
        'The divine name is analysed as a sacred concentration of the Lord’s presence and power. Phonetic interpretation becomes theology.',
        'This is a different literary operation from telling Rama’s deeds. The Upanishad asks what makes the name spiritually efficacious and how it can serve as a contemplative support.'
      ]},
      {title:'Forms, mantra and worship',paragraphs:[
        'Rama’s forms and associated mantras are organized for meditation and ritual use. Diagrammatic or syllabic structures transform sectarian worship into an esoteric scriptural system.',
        'The practices belong to a broader mantra-shastra environment in which deity, sound and visual form are mutually interpreting.'
      ]},
      {title:'Rama as supreme reality',paragraphs:[
        'The theological culmination identifies Rama with the supreme sought in the Upanishads. The epic king and avatara is not treated as less than Brahman but as the personal form through which Brahman is known.',
        'Later Rama traditions receive this identification according to their own Vedantic positions.'
      ]},
      {title:'Reception',paragraphs:[
        'The work belongs to the corpus through which later Rama devotion acquired Upanishadic mantra authority alongside Purana, Agama and vernacular bhakti sources.',
        'Its late chronology should be stated openly; devotional authority in Hindu tradition does not depend on pretending every text is linguistically ancient.'
      ]}
    ],sources:merge(D['Upaniṣad:Rāmarahasya']?.sources,[...common,'Ramarahasya Upanishad Sanskrit editions','Rama mantra and sectarian Upanishad studies'])
  });

  put('Rāmatāpanī',{
    sanskritTitle:'रामतापनीयोपनिषद्',language:'Sanskrit',period:'c. 1400–1700 CE',extent:'Rama-centred Tapaniya Upanishad with mantra and theological exposition',
    leadParagraphs:[
      'The Ramatapani Upanishad applies the esoteric Tapaniya method to Rama. Rama’s name, mantra, form and cosmic identity are analysed so that the avatara becomes the direct object of Upanishadic meditation as supreme Brahman.',
      'Like the Nrisimha and Gopala Tapaniya texts, it is concerned less with narrative than with mantra. The episodes of the Ramayana provide devotional context, but the literary task is to disclose the hidden theological meaning of Rama.'
    ],articleSections:[
      {title:'Date and Tapaniya setting',paragraphs:[
        'The received work is late medieval or early modern, broadly c. 1400–1700 CE. Its precise relation to other Tapaniya texts remains a question of sectarian manuscript history.',
        '“Tapaniya” identifies a style of esoteric Upanishadic exegesis in which mantra, syllable and deity are analysed in great theological detail.'
      ]},
      {title:'Rama-mantra',paragraphs:[
        'The text treats the mantra of Rama as a compact revelation. Individual syllables can be assigned divine, cosmic and spiritual correspondences.',
        'Recitation is therefore joined to understanding. The mantra is not arbitrary sound but a form in which the supreme is said to be present and knowable.'
      ]},
      {title:'Rama and Brahman',paragraphs:[
        'Rama is identified with the ultimate reality rather than merely described as one historical or mythic hero among others.',
        'This theological elevation places Rama bhakti inside the central Upanishadic problem of the relation between the personal Lord and Brahman.'
      ]},
      {title:'Meditation and liberation',paragraphs:[
        'Mantra and visualization order the contemplative path. The practitioner approaches Rama through name and form until those supports disclose the supreme reality they embody.',
        'Liberation is not reduced to obtaining a worldly boon from the deity; it is relation to and knowledge of the supreme Rama.'
      ]},
      {title:'Reception',paragraphs:[
        'The Ramatapani became one of the Upanishadic resources available to Rama-centred theological traditions seeking shruti authority for mantra and divine supremacy.',
        'It should be read beside Ramarahasya without assuming the two titles name the same text.'
      ]}
    ],sources:merge(D['Upaniṣad:Rāmatāpanī']?.sources,[...common,'Ramatapaniya Upanishad Sanskrit editions','Studies of Rama-centred sectarian Upanishads'])
  });

  put('Gopālatāpanī',{
    sanskritTitle:'गोपालतापनीयोपनिषद्',language:'Sanskrit',period:'c. 1300–1500 CE for the received form',extent:'Two major parts, Gopala Purva-Tapaniya and Gopala Uttara-Tapaniya',primaryRecensions:['Purva-Tapaniya','Uttara-Tapaniya'],
    leadParagraphs:[
      'The Gopalatapani Upanishad is the most important Krishna-centred sectarian Upanishad. Its Purva and Uttara sections identify Gopala-Krishna with supreme Brahman, explain Krishna mantras and sacred names, and place Mathura and the pastoral world of Krishna inside an Upanishadic theology of liberation.',
      'The work became especially important to Gaudiya Vaishnava theologians, who cited it as shruti authority for Krishna’s supremacy. Its historical importance lies precisely in this transformation of devotional Krishna into the central language of a Tapaniya Upanishad.'
    ],articleSections:[
      {title:'Date and two Tapaniya sections',paragraphs:[
        'The received text is commonly placed in the late medieval period, broadly c. 1300–1500 CE. The Purva and Uttara sections need not have been composed at exactly the same moment.',
        'Both belong to the Tapaniya family of mantra-oriented sectarian Upanishads, where the deity’s name and form are analysed through esoteric Vedic and Vedantic correspondences.'
      ]},
      {title:'Purva-Tapaniya — Gopala as Brahman',paragraphs:[
        'The opening establishes Gopala-Krishna not merely as an avatara acting within the cosmos but as the supreme reality from which cosmic order depends.',
        'Mantras associated with Krishna are interpreted through their syllables and divine meanings. Devotion is thus given the literary form of Upanishadic brahma-vidya.'
      ]},
      {title:'Mathura and the sacred Krishna world',paragraphs:[
        'The geography surrounding Krishna is sacralized rather than treated as a neutral setting. Mathura and the pastoral divine world become spaces of revelation and meditation.',
        'This movement anticipates later Vaishnava sacred geography in which place, name and lila all function as forms of access to the Lord.'
      ]},
      {title:'Uttara-Tapaniya — devotion and realization',paragraphs:[
        'The Uttara material develops the relation between the devotee and Gopala through further dialogues and theological exposition.',
        'The text’s Krishna-bhakti is not opposed to Upanishadic knowledge. Knowledge consists precisely in understanding the supreme identity and nature of the Krishna who is worshipped.'
      ]},
      {title:'Gaudiya and wider Vaishnava reception',paragraphs:[
        'Gaudiya authors such as Jiva Gosvamin cite Gopalatapani as a crucial Upanishadic authority for Gopala-Krishna. Other Krishna-centred traditions also receive the text within their own theological systems.',
        'Its prominence in later devotion should be distinguished from chronology: the received work is medieval, not one of the archaic prose Upanishads.'
      ]}
    ],sources:merge(D['Upaniṣad:Gopālatāpanī']?.sources,[W('Gopala Tapani Upanishad','https://en.wikipedia.org/wiki/Gopala_Tapani_Upanishad','Krishna theology, Purva/Uttara structure and Gaudiya reception.'),...common,'Gopala-Tapaniya Sanskrit editions and Gaudiya commentarial citations'])
  });

  put('Kṛṣṇa',{
    sanskritTitle:'कृष्णोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short Krishna-centred symbolic Upanishad',
    leadParagraphs:[
      'The Krishna Upanishad interprets the world of Krishna devotion through sacred correspondences. Krishna, his companions and elements of the Vraja narrative are read as manifestations of Vedic or cosmic principles rather than merely as characters in a story.',
      'The result is a compact theological bridge between Krishna lila and the Upanishadic habit of mapping visible forms onto deeper realities.'
    ],articleSections:[
      {title:'Date and textual character',paragraphs:[
        'The received text is medieval, broadly c. 1200–1600 CE. Its developed Krishna symbolism belongs to the period when sectarian Upanishads were incorporating mature bhakti traditions.',
        'It should not be confused with the much older appearances of the name Krishna in Chandogya or epic literature. This is a distinct later Upanishad.'
      ]},
      {title:'Krishna and sacred correspondence',paragraphs:[
        'Figures and objects from Krishna’s world are assigned deeper meanings. The method resembles older Upanishadic correspondences but applies them to a fully developed devotional narrative environment.',
        'The point is not to erase the lila. It is to show that the lila itself can be read as the manifestation of Vedic and cosmic truth.'
      ]},
      {title:'Vraja figures and the cosmos',paragraphs:[
        'Pastoral companions, divine relations and symbolic objects become parts of a sacred universe centred on Krishna.',
        'This interpretation lets bhakti and cosmology reinforce one another: affection for the divine form is simultaneously contemplation of a deeper cosmic order.'
      ]},
      {title:'Krishna as supreme',paragraphs:[
        'The theology culminates in Krishna as the supreme reality behind the correspondences. The visible form is not treated as a lesser mask that must be discarded for an impersonal absolute.',
        'This is the major theological difference between sectarian Krishna Upanishads and non-sectarian summaries of early Vedanta.'
      ]},
      {title:'Reception',paragraphs:[
        'The work has a smaller commentarial history than Gopalatapani but belongs to the same wider attempt to articulate Krishna devotion as shruti.',
        'Its symbolic method is particularly useful for tracing how Vraja narrative was interpreted through Vedic categories in later Sanskrit theology.'
      ]}
    ],sources:merge(D['Upaniṣad:Kṛṣṇa']?.sources,[...common,'Krishna Upanishad Sanskrit editions and Vaishnava sectarian-Upanishad studies'])
  });

  put('Hayagrīva',{
    sanskritTitle:'हयग्रीवोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short mantra Upanishad devoted to Hayagriva as Lord of knowledge',
    leadParagraphs:[
      'The Hayagriva Upanishad presents the horse-headed form of Vishnu as the divine source and protector of knowledge. Its mantras address Hayagriva not simply as a mythic rescuer of the Vedas but as the supreme intelligence through whom sacred learning becomes possible.',
      'The text therefore belongs naturally to traditions in which Hayagriva is worshipped by students, teachers and theologians. Knowledge itself becomes devotional because its source is the Lord.'
    ],articleSections:[
      {title:'Date and sectarian setting',paragraphs:[
        'The received text is medieval, broadly c. 1200–1600 CE. Its mantra and deity theology belong to the later Vaishnava Upanishad corpus.',
        'The association of Hayagriva with recovered Vedic knowledge is older than the Upanishad, but the surviving mantra text reflects a mature sectarian cult.'
      ]},
      {title:'Hayagriva and the Vedas',paragraphs:[
        'Hayagriva is understood as the divine power by which knowledge is preserved and restored. The familiar mythic role of recovering Vedic revelation is converted into a contemplative theology of wisdom.',
        'The deity therefore embodies both scripture and the intelligence required to understand scripture.'
      ]},
      {title:'Mantra and meditation',paragraphs:[
        'The Upanishad supplies mantric formulas for invoking Hayagriva. Sound, deity and knowledge are joined so that recitation itself becomes a discipline of intellectual and spiritual purification.',
        'The practice is especially suited to a deity whose religious identity is inseparable from learning.'
      ]},
      {title:'Knowledge as divine gift',paragraphs:[
        'The text refuses to treat knowledge as mere possession of information. True vidya depends upon a transformation of the knower and is ultimately grounded in the supreme Lord.',
        'This gives educational devotion a Vedantic horizon: learning becomes a path toward the source of consciousness itself.'
      ]},
      {title:'Reception',paragraphs:[
        'Hayagriva worship became especially important in Sri Vaishnava and related traditions, where the deity is invoked as a source of scriptural and philosophical understanding.',
        'The Upanishad is one among several Sanskrit authorities supporting that devotional-intellectual role.'
      ]}
    ],sources:merge(D['Upaniṣad:Hayagrīva']?.sources,[...common,'Hayagriva Upanishad Sanskrit editions','Hayagriva liturgical and Vaishnava theological traditions'])
  });

  put('Dattātreya',{
    sanskritTitle:'दत्तात्रेयोपनिषद्',language:'Sanskrit',period:'c. 1200–1600 CE',extent:'Short mantra Upanishad devoted to Dattatreya',
    leadParagraphs:[
      'The Dattatreya Upanishad is a mantra text devoted to Dattatreya as supreme teacher and divine presence. It belongs to the stage in which the figure of Dattatreya had become a major focus of mantra, yoga and guru theology across sectarian boundaries.',
      'Although classified among the Vaishnava Upanishads in the received scheme, Dattatreya’s later religious life is deliberately difficult to confine: Vaishnava, Shaiva, yogic, Avadhuta and Tantric traditions all receive him.'
    ],articleSections:[
      {title:'Date and Dattatreya tradition',paragraphs:[
        'The received Upanishad is medieval, broadly c. 1200–1600 CE. It reflects a developed Dattatreya cult rather than the earliest literary appearances of the sage-deity.',
        'The text is preserved through later minor-Upanishad collections and mantra traditions.'
      ]},
      {title:'Dattatreya as guru and deity',paragraphs:[
        'Dattatreya is both teacher and the divine reality taught. The guru principle is therefore not merely social: instruction is grounded in the presence of the Lord as knowledge itself.',
        'This fusion helps explain Dattatreya’s later attraction to yogic and renunciatory communities as well as devotional ones.'
      ]},
      {title:'Mantras',paragraphs:[
        'The Upanishad gives mantric forms associated with Dattatreya and interprets their use as a path of worship and realization.',
        'As in other sectarian Upanishads, mantra is not separated from theology. The efficacy of the formula rests upon the nature of the deity it invokes.'
      ]},
      {title:'Liberation and knowledge',paragraphs:[
        'Dattatreya is approached not merely for worldly success but as a teacher of release. The spiritual trajectory moves from invocation toward knowledge of the supreme.',
        'This makes the work an Upanishad rather than only a ritual manual, even where its surface form is strongly mantric.'
      ]},
      {title:'Cross-sectarian reception',paragraphs:[
        'Later Dattatreya traditions range widely—from devotional worship to Nath, Avadhuta and Tantric environments. The Upanishad participates in that expansion without representing every later form.',
        'Its Vaishnava classification should therefore be recorded without pretending that Dattatreya’s historical reception remained exclusively Vaishnava.'
      ]}
    ],sources:merge(D['Upaniṣad:Dattātreya']?.sources,[...common,'Dattatreya Upanishad Sanskrit editions','Studies of Dattatreya, Avadhuta and guru traditions'])
  });

  put('Garuḍa',{
    sanskritTitle:'गरुडोपनिषद्',language:'Sanskrit',period:'c. 800–1400 CE',extent:'Short protective mantra Upanishad centred on Garuda and snake-poison rites',
    leadParagraphs:[
      'The Garuda Upanishad is unusual among the 108 because its purpose is strongly practical. It preserves Garuda mantras used against snakes and poison, placing a protective ritual technology inside the literary category of Upanishad.',
      'That does not make the work less important. It shows how broad the later Upanishadic corpus became: brahma-vidya, renunciation, yoga, sectarian theology and apotropaic mantra could all be transmitted under the same prestigious title.'
    ],articleSections:[
      {title:'Date and textual character',paragraphs:[
        'The received text is medieval, broadly c. 800–1400 CE. Its mantra vocabulary and practical ritual setting place it in the later Atharvavedic-associated world rather than among early philosophical prose Upanishads.',
        'The work’s exact manuscript history is less studied than that of the principal Upanishads, so broad dating is more defensible than a precise century.'
      ]},
      {title:'Garuda and serpent power',paragraphs:[
        'Garuda’s mythic enmity with serpents gives the deity a natural protective role. The Upanishad turns that mythology into ritual language for neutralizing poison and snake danger.',
        'The divine bird is therefore invoked as active power rather than only contemplated as a symbol.'
      ]},
      {title:'Protective mantra',paragraphs:[
        'The text provides formulas whose purpose is protection and healing. Their function resembles Atharvanic charm traditions more closely than abstract Vedantic dialogue.',
        'Mantra is expected to work through sacred authority, correct transmission and relation to Garuda.'
      ]},
      {title:'Why this is an Upanishad',paragraphs:[
        'The Garuda text demonstrates that the later Upanishad category was not restricted to one philosophical genre. The name could authorize specialized sacred knowledge transmitted as secret or powerful instruction.',
        'A history of the 108 must therefore resist defining “Upanishad” exclusively from Brihadaranyaka or Chandogya.'
      ]},
      {title:'Reception',paragraphs:[
        'Garuda mantras continued to circulate in protective, medical and ritual contexts, often outside complete Upanishad collections.',
        'The text’s importance is greatest for the history of mantra and protective religion rather than for later Vedanta commentary.'
      ]}
    ],sources:merge(D['Upaniṣad:Garuḍa']?.sources,[...common,'Garuda Upanishad Sanskrit editions and Atharvanic/protective-mantra studies'])
  });
})();