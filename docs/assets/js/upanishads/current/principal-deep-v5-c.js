/* Text-specific principal-Upanishad revision.
 * Replaces generic deep-v5 prose for the ten principal routes with
 * text-specific dating, structure, contents, philosophy, reception and
 * textual-critical notes. The observer post-processes the shared renderer
 * so Contents and synthesis sections can use text-specific subheadings.
 */
(() => {
  const R = window.UPANISHAD_RESEARCH_108 = window.UPANISHAD_RESEARCH_108 || {};
  const P = window.SCRIPTURE_PRINCIPAL_RICH = window.SCRIPTURE_PRINCIPAL_RICH || {};

  const OXFORD_BOOK = 'https://academic.oup.com/book/50014';
  const COHEN = 'https://academic.oup.com/book/55777/chapter-abstract/434287939';
  const UT_TEXTS = 'https://sites.utexas.edu/sanskrit/resources/early-upanisads-olivelle-edition/';

  const DATA = {
    'Īśāvāsya': {
      period: 'Probably one of the later metrical Upanishads, broadly in the last few centuries BCE; exact absolute dating is disputed.',
      infoboxStructure: '40th adhyaya of the Vajasaneyi Samhita; 18 verses in Kanva, 17 in Madhyandina.',
      structureTitle: 'Structure and the two Vajasaneyi recensions',
      date: [
        `The Isha is not securely datable to a single century. Patrick Olivelle places it after the earliest prose Upanishads and after the Kena and Katha in his relative sequence of early Upanishads, among the metrical works of the last few centuries BCE. That relative placement is more defensible than assigning a precise year: the poem shares the White Yajurvedic world of the Brihadaranyaka, but its compact verse form, intensified theistic language and paired doctrines belong to a later intellectual horizon.`,
        `Its position as chapter 40 of the Vajasaneyi Samhita does not by itself make it older than prose Upanishads embedded in Brahmanas and Aranyakas. The White Yajurveda was transmitted and redacted as a school corpus, and the Isha is a philosophical appendix within that received Samhita. Dating therefore depends on linguistic form, doctrinal comparison and the relative history of Upanishadic literature, not simply on the antiquity of the textual layer called “Samhita.”`
      ],
      structure: [
        `The textual fact that matters most is recension. The Kanva Vajasaneyi Samhita transmits eighteen mantras, while the Madhyandina has seventeen; the two agree through the opening sequence but rearrange the paired middle triads, and the closing solar-funerary verses do not correspond one-for-one. Any close argument about mantras 9–18 should therefore state which recension and numbering system it follows.`,
        `Within the Kanva eighteen-mantra form, the poem can be read in five movements: 1–2 on divine inhabitation, non-possession and action; 3–8 on the deathless Self and the vision of unity; 9–11 on avidya and vidya; 12–14 on asambhuti and sambhuti; and 15–18 as a prayer at death to the Sun and Agni. This is enough structure for such a short work; there is no need to manufacture a complicated theory of “books” or hypothetical authors.`
      ],
      contentUnits: [
        ['Mantras 1–2 — inhabiting the world without possession', `The opening joins two claims that later interpreters often separate: everything moving in the world is to be “covered” or inhabited by the Lord, yet the human being is still told how to live while acting. Mantra 1 attacks possessive appropriation—“whose is wealth?”—while mantra 2 permits a full lifespan of action under a condition that prevents action from binding the agent. The pair therefore frames the poem around the relation between divine pervasion, renunciation of ownership and karma, not around a simple opposition of world-affirmation versus world-denial.`],
        ['Mantras 3–5 — the Self beyond ordinary spatial and cognitive predicates', `After the warning about self-destructive darkness, the poem describes the ultimate as unmoving yet faster than mind, remaining in place yet outrunning the gods, far away and near, within all and outside all. These are not ornamental contradictions. They prevent the reader from treating the Self as one finite object among others: whatever makes movement, cognition and life possible cannot be captured by the same categories used for the things that move and are cognized.`],
        ['Mantras 6–8 — seeing all beings in the Self', `The metaphysical paradox becomes a transformation of vision. Whoever sees all beings in the Self and the Self in all beings no longer recoils from them; grief and delusion disappear when plurality is no longer experienced as absolute separation. Mantra 8 then gives a concentrated cluster of predicates—luminous, bodiless, pure, unwounded, self-existent—showing that the unity of the Self does not mean reducing it to the vulnerable empirical body.`],
        ['Mantras 9–11 — avidya and vidya', `The first paired triad is deliberately difficult. Exclusive devotion to avidya and exclusive devotion to vidya are both associated with darkness, yet the text then says that the two have different results and must in some sense be known together. In the older Vedic semantic field, vidya and avidya cannot simply be translated as modern “education” and “ignorance”; Shankara reads them through deity-knowledge and ritual action, while other commentators construe the pair differently. The philosophical point is that the poem rejects a one-term solution before assigning distinct functions to the two disciplines.`],
        ['Mantras 12–14 — sambhuti and asambhuti', `The second triad mirrors the syntax of the previous one but shifts the vocabulary to sambhuti and asambhuti, terms variously rendered as becoming/non-becoming, manifestation/non-manifestation or production/non-production. Because the Kanva and Madhyandina recensions order the paired triads differently, interpretation must begin with the actual transmitted sequence. The parallelism suggests a deliberate exercise in holding together two modes of religious understanding rather than a loose collection of sayings.`],
        ['Mantras 15–18 — solar revelation, memory and the path at death', `The poem ends in liturgical address. The golden disk of the Sun hides the face of truth; the worshipper asks it to be removed, seeks recognition of the Person beyond the radiance, remembers deeds as the body returns to ashes, and finally asks Agni to lead by the auspicious path. This conclusion matters because the Upanishad does not finish with a detached metaphysical theorem: knowledge, prayer, memory, divine guidance and the existential event of death remain joined.`]
      ],
      synthesisSubs: [
        ['Isha, Self and the problem of action', [
          `The opening two mantras make the relation between knowledge and action the text’s first philosophical problem. The poem does not merely say “renounce the world,” because it immediately asks how one may live a hundred years while performing action; nor does it simply sanctify ordinary possession, because ownership itself is destabilized by divine pervasion. Later Vedanta therefore inherited from the Isha a genuine hermeneutic problem: does liberating knowledge supersede ritual action, transform the agent’s relation to action, or require a disciplined conjunction of knowledge and action?`,
          `The same tension continues in the paired teachings on vidya/avidya and sambhuti/asambhuti. Their form is anti-reductionist: each single-sided pursuit is inadequate, yet the two members of a pair are not simply declared identical. The exact doctrinal referents remain disputed, which is why a good article should present the Sanskrit terms, the recensional order and major commentarial options rather than silently replacing them with a modern “science versus spirituality” formula.`
        ]],
        ['Unity, difference and divine language', [
          `Mantras 4–8 move between impersonal and personal registers. The ultimate is the condition of motion and cognition; it is also described through a vision in which all beings are in the Self and the Self is in all beings. The opening word isha and the solar prayer give the poem an unmistakably theological texture, but the text itself does not yet speak in the later technical vocabulary of Advaita, Vishishtadvaita or Dvaita.`,
          `That is precisely why the Isha became so productive for rival Vedanta traditions. Advaita can emphasize non-separation and the bodiless Self, while theistic Vedantins can read divine pervasion as the Lord’s presence without collapsing the distinction between God and individual selves. The ancient poem supplies the authoritative language; the later systems disagree over its metaphysical grammar.`
        ]],
        ['Reception', [
          `Shankara’s commentary is especially influential for the hierarchy he establishes between knowledge and Vedic action and for his interpretation of the difficult middle terms. Madhva and other Vedantins read the same short text through different accounts of divine lordship and the individual self. Modern interpreters have often elevated mantras 1 and 6–7 into summaries of the whole work, but the paired middle triads and the final death-prayer are necessary if the poem is to be read as a complete composition rather than as an anthology of famous quotations.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition is particularly useful for the Isha because it makes the Kanva and Madhyandina evidence visible rather than silently presenting one modern harmonized sequence. The chief critical problem is not a large manuscript stemma but the fact that two living White Yajurvedic recensions preserve different verse counts and different ordering in the second half of the poem.`,
        `For citation, the recension should be named whenever the argument concerns mantras 9–18. A quotation numbered “Isha 15” is not automatically the same textual location in Kanva and Madhyandina editions.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads: Annotated Text and Translation (1998), Isha chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709278'},
        {title:'Patrick Olivelle, The Early Upanishads — Oxford Academic', url: OXFORD_BOOK},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN}
      ]
    },

    'Kena': {
      period: 'Oldest of the principal metrical Upanishads in Olivelle’s relative chronology; probably mid-to-late first millennium BCE, before the later Katha/Isha/Mundaka group.',
      infoboxStructure: '4 khandas: 1–2 predominantly verse, 3–4 prose; Jaiminiya/Talavakara Samaveda.',
      structureTitle: 'Structure and compositional form',
      date: [
        `The Kena belongs after the earliest prose Upanishads but before the later cluster represented by the Katha, Isha, Shvetashvatara and Mundaka in Patrick Olivelle’s relative chronology. A cautious working date is therefore the middle part of the first millennium BCE, without pretending that the text can be fixed to a decade. Its language and compact metrical speculation are later than the great prose compilations, while its Samavedic setting and archaic formulation of Brahman remain firmly within the late-Vedic world.`,
        `Internal form is more informative than a generic date range. Khandas 1–2 are predominantly verse and ask how Brahman can be known when it is the very source of mind, speech, sight and hearing; khandas 3–4 switch to prose myth in which the gods discover that their victory depended on Brahman. The sharp genre break may preserve different compositional stages, but the received redaction deliberately makes the prose narrative interpret the epistemological paradox of the verse half.`
      ],
      structure: [
        `The Kena is the Talavakara Upanishad of the Jaiminiya branch of the Samaveda and appears as Jaiminiya Upanishad Brahmana 4.18–21. Its four khandas form two conspicuously different halves: the first two are mainly metrical, while the last two are prose narrative and epilogue. That bipartite form is the central textual issue; there is little value in inventing a complex recension discussion for a work whose most significant internal distinction is genre.`,
        `The first half proceeds by paradox and negative indication; the second converts the same problem into story. Agni and Vayu cannot master the mysterious yaksha, Indra continues the inquiry, and Uma identifies the victory as Brahman’s. The prose half is therefore not a detachable mythology appendix: it dramatizes the failure of powers that mistake dependent ability for independent knowledge.`
      ],
      contentUnits: [
        ['Khanda 1 — “By whom?” and the source of the faculties', `The Upanishad opens with a chain of causal questions: by whom does the mind go toward its object, who sends forth the breath, who impels speech, eye and ear? The reply—“ear of the ear, mind of the mind, speech of speech”—does not identify a hidden organ behind the visible organs. It points to a condition of cognition that cannot itself be placed alongside the objects cognition grasps.`],
        ['Khanda 2 — knowing Brahman without objectifying Brahman', `The second khanda sharpens the epistemological difficulty. The person who thinks “I know Brahman well” is told that the knowledge remains inadequate; yet the text does not conclude that Brahman is simply unknowable. Instead it distinguishes object-like possession of knowledge from a reflexive awareness in which the source of knowing is recognized without being turned into another finite object. This paradox became one of the Kena’s most important contributions to later Vedantic epistemology.`],
        ['Khanda 3 — the yaksha tests Agni, Vayu and Indra', `After the gods win a victory, they attribute the achievement to themselves. Brahman appears as an unknown yaksha: Agni, despite claiming the power to burn everything, cannot burn a blade of grass; Vayu cannot move it. The narrative transfers the abstract question of the first half to divine powers themselves. A faculty may operate magnificently and still fail to understand the ground from which its power derives.`],
        ['Khanda 4 — Uma’s revelation, lightning and disciplined knowledge', `Indra’s continued search leads to Uma Haimavati, who identifies the yaksha as Brahman and explains the gods’ dependence. The closing teaching compares apprehension of Brahman to lightning and the blink of an eye, then names tapas, self-restraint, action, Vedic learning and truth. The text therefore ends by joining sudden insight to sustained ethical and scholastic discipline rather than opposing realization to practice.`]
      ],
      synthesisSubs: [
        ['Brahman as the non-objectifiable source of knowing', [
          `The Kena’s most distinctive claim is not merely that Brahman is “behind the senses.” Its argument is reflexive: eye, ear, speech and mind can disclose objects, but the condition that makes those disclosures possible cannot be grasped in the same way as their objects. This is why its negations are epistemological before they are metaphysical.`,
          `The famous “known to the one who does not think it known” formula should therefore not be turned into anti-intellectual mysticism. The text is criticizing a model of knowledge based on mastery and possession. Knowledge of Brahman requires recognition of the limits of objectifying cognition, which is precisely what the gods fail to recognize in the prose story.`
        ]],
        ['The gods, Uma and dependent power', [
          `Agni and Vayu are not denied their Vedic powers; the story relativizes those powers by showing that they are not self-grounding. Indra is distinguished not because he succeeds by force but because he continues to inquire after the yaksha disappears. Uma then becomes the revealer who converts divine bewilderment into knowledge.`,
          `Later Shakta readers naturally found Uma’s role suggestive, but the early passage should not be collapsed into a fully developed medieval Shakti theology. What the received Kena actually establishes is narrower and striking enough: knowledge of Brahman is mediated by a female divine figure after major Vedic gods have failed to understand the source of their own victory.`
        ]],
        ['Commentarial reception', [
          `Shankara develops the text’s paradoxes through the doctrine that Brahman, as the Self and ground of consciousness, cannot be known as an external object. Other Vedanta traditions accept the authority of the same verses while construing the dependence of the finite knower on Brahman differently. The Kena thus became a compact test case for competing accounts of what it means to know ultimate reality.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition situates the Kena within the Jaiminiya or Talavakara Samaveda and prints the received four-khanda text with philological notes. The main textual-critical question for an introductory article is the relation of the metrical first half to the prose second half, not an elaborate recension history.`,
        `Because the work is also Jaiminiya Upanishad Brahmana 4.18–21, citation should preserve that Samavedic setting when questions of composition or transmission are being discussed.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Kena chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709268'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'The Classical Upanishads: a guide to the classical corpus (Oxford, 2024)', url:'https://academic.oup.com/book/55777/chapter-abstract/434288384'}
      ]
    },

    'Kaṭha': {
      period: 'A later principal metrical Upanishad, probably from the last few centuries BCE; its Naciketas ritual story is older than the received philosophical redaction.',
      infoboxStructure: '2 adhyayas, each with 3 vallis; 6 vallis total.',
      structureTitle: 'Structure and textual setting',
      date: [
        `The Katha is later than the earliest prose Upanishads and, in Olivelle’s relative chronology, follows the Kena among the metrical texts. A broad placement in the last few centuries BCE is more responsible than a single-century claim. The work’s developed yoga vocabulary, systematic hierarchy of body–senses–mind–intellect–Self, and literary affinities with other later verse Upanishads all point to a mature phase of Upanishadic speculation.`,
        `At the same time, the received Katha incorporates older ritual material. The story of Naciketas and the establishment of his fire is connected with the Kathaka school and has parallels in the Taittiriya Brahmana. This means the date of the Upanishad as a literary whole is not the date of every narrative element within it: an older sacrificial tale has been reworked into a philosophical dialogue about death, desire, Self and liberation.`
      ],
      structure: [
        `The received work has two adhyayas of three vallis each. The first adhyaya moves from the household sacrifice and three boons (1.1), through the choice between shreyas and preyas and the first teaching on the Self (1.2), to the chariot allegory and graded interior hierarchy (1.3). The second adhyaya reopens the problem from inward perception (2.1), develops the one reality present through many forms (2.2), and concludes with the inverted tree, yoga and the cutting of the heart’s knots (2.3).`,
        `Its formal association with the Kathaka school should not be confused with being an integral chapter of the surviving Kathaka Brahmana. Olivelle stresses that the Upanishad is a late work, while the Naciketas episode points to older Kathaka ritual traditions.`
      ],
      contentUnits: [
        ['1.1 — faulty gift, truthful speech and the three boons', `Vajashravas gives away worn-out cattle in a sacrifice, and Naciketas repeatedly asks to whom he himself will be given. His father angrily gives him to Death, converting a moral question about the quality of sacrificial giving into a journey to Yama. After waiting three nights without hospitality, Naciketas receives three boons: reconciliation with his father, knowledge of the fire leading to heaven, and finally knowledge about what happens after death.`],
        ['1.2 — shreyas, preyas and the hidden Self', `Yama refuses the third question at first and offers wealth, long life, descendants, vehicles and pleasures. Naciketas rejects them because they decay and cannot answer death. Yama then distinguishes shreyas, the genuinely good, from preyas, the merely pleasant, and teaches a Self that is unborn, deathless and not reached by ordinary intellectual cleverness alone. The philosophical argument is built from a hierarchy of desires: immortality becomes thinkable only after finite goods are shown unable to satisfy the question.`],
        ['1.3 — the chariot and the graded person', `The famous chariot image maps body, senses, mind and intellect into a disciplined hierarchy: the body is the chariot, senses the horses, mind the reins and intellect the driver, while the Self is the rider. The point is not psychological classification for its own sake. Ethical and contemplative discipline is required because an uncontrolled sensory-mind complex cannot carry the person toward the highest goal. The valli then moves beyond intellect through progressively subtler levels toward the purusha.`],
        ['2.1 — turning inward and the “thumb-sized” person', `The senses are said to have been fashioned outward, so ordinary human attention is directed toward external objects. The wise person turns vision inward toward the Self and discovers what does not perish when objects and bodies change. The imagery of the person in the heart and the “thumb-sized” purusha is spatially concrete yet philosophically paradoxical: the text localizes the Self for meditation without reducing it to a tiny material entity.`],
        ['2.2 — one reality through many forms', `Fire takes the form of whatever it enters without ceasing to be fire; the sun illuminates the world without being stained by what it illuminates. These analogies explain how the inner Self can be present through diverse living beings without being exhausted by their particular conditions. The section therefore develops unity without simply erasing empirical plurality.`],
        ['2.3 — inverted tree, yoga and release', `The final valli presents the world as an inverted ashvattha rooted above, then traces a hierarchy beyond the manifest toward the highest person. Yoga is defined through the firm restraint of the senses, and liberation is described by the loosening of the knots of the heart and the cessation of binding desires. The dialogue returns to its original problem: death is overcome not by prolonging finite life but by knowledge of what in the person is not born and does not die.`]
      ],
      synthesisSubs: [
        ['Death, desire and the hierarchy of ends', [
          `The Katha’s philosophy is inseparable from its dramatic test. Naciketas does not receive metaphysics until he has distinguished goods that merely postpone death from knowledge that changes the meaning of death. Shreyas and preyas are therefore not generic moral labels; they organize the whole narrative by ranking sacrificial heaven, wealth, pleasure, longevity and self-knowledge.`,
          `Yama’s teaching repeatedly distinguishes what is pleasant, visible and graspable from what is subtle and enduring. The Self is not simply one more immortal substance added to the inventory of the world. It is the principle by which the person’s identity is reconceived when body, possessions and even heavenly rewards are shown to be limited.`
        ]],
        ['Yoga, interiority and the chariot', [
          `The chariot passage integrates ethics, psychology and soteriology. Sense restraint is necessary because the path to the Self is not achieved by acquiring a new external object; the very apparatus of attention must be ordered. The later definition of yoga as the firm holding of the senses continues this line, making the Katha one of the earliest major Upanishadic texts in the history of yoga vocabulary.`,
          `The graded sequences—senses, objects, mind, intellect, great self, unmanifest, purusha—should be read as a philosophical ladder within this text before being assigned wholesale to later Samkhya. Some terms later become technical in other systems, but the Katha’s own function is to lead the hearer beyond progressively more comprehensive levels of experience.`
        ]],
        ['Reception', [
          `The Katha became one of the most widely read Upanishads because its doctrines are carried by a sustained story. Shankara reads the deathless Self and the hierarchy of knowledge within Advaita; later Vedantins contest the identity and relation of individual self, supreme Self and Lord. Modern readers often isolate the chariot allegory or the shreyas/preyas distinction, but the six-valli composition shows how those passages belong to one argument about what can and cannot answer the fact of death.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition is useful for distinguishing the received Katha Upanishad from the older Naciketas material associated with Kathaka ritual tradition. The critical question is compositional reuse: a sacrificial story and fire doctrine have become the narrative frame for a later philosophical poem.`,
        `The presence of parallels with Taittiriya Brahmana 3.11.8 does not mean that the surviving Upanishad is simply a chapter cut out of that Brahmana. Textual history must distinguish the antiquity of the narrative kernel from the redaction of the six-valli work.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Katha chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709273'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'Nirukti reference entry — Katha Upanishad', url:'https://www.nirukti.org/library/katha-upanisad'}
      ]
    },

    'Praśna': {
      period: 'A late prose Upanishad; Olivelle places it near the beginning of the Common Era, though earlier datings have been proposed.',
      infoboxStructure: '6 prashnas (questions), each answered by Pippalada after a year of discipline.',
      structureTitle: 'Structure of the six questions',
      date: [
        `The Prashna belongs to a late phase of the principal Upanishads. Patrick Olivelle argues that the Prashna and Mandukya “cannot be much older than the beginning of the common era,” while other scholars have proposed earlier dates. The safest presentation is therefore not a falsely exact year but a late relative position: it presupposes a developed Upanishadic vocabulary of prana, Om, rebirth and the sixteen-part person and stands later than the older prose corpora and later than the Mundaka in many modern chronologies.`,
        `Its literary organization also points to deliberate scholastic redaction. Six already learned Brahmins approach Pippalada, undertake a year of tapas, brahmacarya and faith, and then ask six carefully ordered questions. Olivelle notes that the question-and-answer setting has precedents in Shatapatha Brahmana 10.6.1 and Chandogya 5.11; the Prashna turns that older pedagogical form into the organizing architecture of the entire work.`
      ],
      structure: [
        `There is no need for an elaborate recension discussion here. The important structure is the six-question sequence. Questions 1–3 move from cosmic generation to the deities/faculties and then to the origin and bodily distribution of prana; question 4 turns to sleep and the experiencing person; question 5 interprets the graded fruits of meditation on Om; question 6 culminates in the purusha of sixteen parts and their dissolution into the imperishable.`,
        `The questions are not six unrelated catechism entries. They narrow from world-generation and cosmic rhythms toward the living body, then toward the experiencing subject and finally toward a soteriological account of return to the person from whom the parts arise.`
      ],
      contentUnits: [
        ['Question 1 — Prajapati, rayi and prana', `Kabandhin asks where living beings come from. Pippalada answers with a cosmogony in which Prajapati produces a pair, often rendered rayi (“matter,” “food,” or formed substance) and prana (“life-breath”), correlated with moon and sun and with temporal cycles. The teaching binds reproduction, food, solar energy, sacrifice and cosmic time into one generative system rather than presenting creation as a single mythic event.`],
        ['Question 2 — why prana is chief among the faculties', `Bhargava asks how many deities uphold the person. Speech, mind, sight, hearing and the elements each claim primacy, but when prana theatrically prepares to depart, all the others begin to follow. The point is functional dependence: the faculties are real powers, yet embodied life collapses without the coordinating vitality of prana. This is why the text praises prana through cosmic identifications rather than treating breath as merely one physiological process.`],
        ['Question 3 — origin, division and destiny of prana', `Kaushalya asks where prana itself comes from, how it enters the body, how it divides and how it supports experience. The reply derives prana from the Self and maps its differentiated functions—prana, apana, samana, vyana and udana—onto bodily processes. Udana then connects physiology to eschatology by carrying the person according to knowledge and action, so the theory of breath becomes a theory of moral and post-mortem movement.`],
        ['Question 4 — sleep, dream and the experiencer', `Sauryayani asks what sleeps, what remains awake, who sees dreams and in whom the faculties finally rest. The answer uses fire imagery to distinguish withdrawn senses from continuing vital processes and makes mind the dreamer that recombines impressions. It then pushes beyond both waking and dream toward the experiencer in whom the faculties find support, preparing the move from psychophysiology to the deeper person.`],
        ['Question 5 — one, two and three measures of Om', `Satyakama asks what is gained by meditation on Om. The answer is deliberately graded: partial contemplation on one or two measures produces correspondingly limited results, while complete contemplation using all three measures leads by the solar path toward Brahman. Om is therefore not merely declared identical with the absolute; the text embeds it in a pedagogy of incomplete and complete meditative practice.`],
        ['Question 6 — the purusha with sixteen parts', `Sukesha asks about the person of sixteen parts. The parts—beginning with prana and extending through faith, elements, senses, mind, food, vigor, austerity, mantra, action, worlds and name—arise from the purusha and return to him like rivers losing their separate names in the sea. The final image gives the whole work a unifying direction: the multiplicity analyzed in the previous questions is traced back to a single imperishable source.`]
      ],
      synthesisSubs: [
        ['Prana as the organizing principle', [
          `Prana is the conceptual thread running through the work. In the first question it is paired with rayi at the level of cosmic generation; in the second it becomes the chief support of embodied faculties; in the third it is derived from the Self and differentiated through bodily functions. This repeated rescaling—from cosmos to organism to destiny—is more distinctive to the Prashna than a generic list of “Upanishadic themes.”`,
          `The text therefore offers a layered anthropology. Human beings are not described as disembodied selves temporarily trapped in bodies; breath, food, senses, mind and cosmic rhythms are taken seriously as real structures of life. Liberation consists in knowing the source and hierarchy of these structures, not in pretending they never mattered.`
        ]],
        ['Om, parts and return to the purusha', [
          `Questions 5 and 6 tighten the soteriological argument. Meditation on Om is graded according to completeness, while the sixteen parts are traced back to the purusha from whom they arise. The river image gives a precise model of return: the derived parts lose independent designation when they reach their source.`,
          `Later Vedanta can interpret that return through different theories of identity and dependence. The Prashna itself is primarily concerned with the relation between the conditioned person composed of functions and the imperishable source in which those functions find their origin and end.`
        ]],
        ['Pedagogy and reception', [
          `The year of discipline before questioning is part of the philosophy. The six Brahmins are already learned, yet learning does not entitle them to immediate answers; tapas, brahmacarya and faith establish the conditions under which inquiry becomes authoritative. The work thus presents knowledge as disciplined transmission rather than spontaneous speculation.`,
          `Shankara’s commentary integrates the six questions into Advaita exegesis, especially the derivation of prana from the Self and the final return of the parts. Later readers often extract the physiological theory of the five breaths, but within the Prashna that theory belongs to a larger cosmological and soteriological sequence.`
        ]]
      ],
      critical: [],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Prashna chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709293'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'Oxford Academic — The Classical Upanishads (2024)', url:'https://academic.oup.com/book/55777/chapter-abstract/434288384'}
      ]
    },

    'Muṇḍaka': {
      period: 'A late metrical Upanishad, probably post-Buddhist in Olivelle’s chronology; roughly the last few centuries BCE.',
      infoboxStructure: '3 mundakas, each divided into 2 khandas; 6 sections total.',
      structureTitle: 'Structure and Atharvavedic affiliation',
      date: [
        `The Mundaka is one of the later principal Upanishads. Patrick Olivelle describes it as “rather late” and in all probability post-Buddhist, placing it after the Kena, Katha and Isha within the broad last-centuries-BCE phase of metrical Upanishads. That relative position fits its explicit contrast between higher and lower knowledge, its strong critique of ritual results, and vocabulary associated with ascetic renunciation.`,
        `Its Atharvavedic affiliation also needs qualification. Unlike the Bṛhadaranyaka, Chāndogya, Taittiriya or Aitareya, the Mundaka does not survive as a section cut from a larger Brahmana or Aranyaka. Tradition assigns it to the Atharvaveda, but Olivelle cautions that later independent Upanishads were often attached to the Atharvaveda. The date should therefore not be inferred from Atharvavedic affiliation alone.`
      ],
      structure: [
        `The work consists of three mundakas, each with two khandas. The first establishes a teacher lineage and the distinction between higher and lower knowledge (1.1), then subjects sacrificial works to a sharp soteriological critique (1.2). The second describes the imperishable source of the cosmos (2.1) and turns Om into the bow with which the Self is directed toward Brahman (2.2). The third uses the two-birds image to distinguish the experiencing and witnessing dimensions of the self (3.1) and concludes with desirelessness, renunciation and release (3.2).`,
        `The title mundaka literally suggests something “shaven,” and the conclusion mentions a shirovrata or “head-vow.” These details, together with the language of yatis and sannyasa, make an ascetic setting plausible, but they do not prove that the title simply means “Upanishad for shaved monks.”`
      ],
      contentUnits: [
        ['1.1 — para and apara vidya', `Shaunaka asks Angiras what must be known so that everything becomes known. The answer distinguishes lower knowledge—Rig, Yajur, Sama and Atharva Vedas together with the Vedangas—from the higher knowledge by which the imperishable is apprehended. This is not a rejection of Vedic learning as useless; it is a hierarchy inside Vedic culture in which mastery of texts and ritual sciences is denied the status of final liberating knowledge.`],
        ['1.2 — sacrifice as a fragile raft', `The text describes properly performed sacrifices and their heavenly results, then calls ritual forms “fragile rafts” when they are mistaken for the highest good. Those who treat sacrificial merit as final return again to old age and death. The criticism is therefore precise: ritual has efficacy within samsara but cannot produce the imperishable. The section then redirects the serious seeker toward a teacher who knows Brahman.`],
        ['2.1 — the imperishable as source of the cosmos', `From the imperishable arise life, mind, senses, elements, worlds, rites and living beings, like sparks issuing from a fire. The imagery allows the text to affirm both derivation and dependence: the world is not self-grounding, yet it is intelligible as an outflow from the imperishable. The passage relocates the totality once assigned to sacrifice within a cosmology of Brahman.`],
        ['2.2 — Om as bow, Self as arrow', `The famous archery image turns knowledge into disciplined concentration: Om is the bow, the self the arrow and Brahman the target. The arrow must be sharpened by meditation and released without distraction. The surrounding verses also describe the radiant Brahman as the support in which heaven, earth, mind, breath and senses are woven, so the meditation is directed toward the ground of the entire experienced world.`],
        ['3.1 — the two birds on one tree', `The Mundaka reuses the ancient Rigvedic image of two birds sharing a tree. One bird eats the sweet fruit while the other watches without eating; the suffering bird becomes free when it sees the greatness of the other. In the Upanishad’s new setting the image becomes a compact phenomenology of bondage and witnessing: entanglement belongs to the self identified with the fruits of action, while freedom comes through recognition of a non-consuming, luminous dimension.`],
        ['3.2 — desire, knowledge and renunciatory release', `The closing section ties rebirth to desire and release to the ending of desire in knowledge. When the knots of the heart are cut and the highest is known, the knower becomes Brahman; the text also speaks explicitly of ascetic renunciation and the path of knowers. Its antiritual polemic therefore culminates not in intellectualism but in a disciplined soteriology of teacher, knowledge, truth, austerity and release.`]
      ],
      synthesisSubs: [
        ['Higher knowledge and the critique of ritual finality', [
          `The para/apara distinction is the Mundaka’s organizing thesis. The Vedas themselves are placed within apara vidya when they are treated as bodies of teachable knowledge; the higher knowledge is defined by its object, the imperishable. This is a radical re-ranking of authority from within the Vedic tradition, not an external rejection of the Vedas.`,
          `The “fragile rafts” passage should be read with equal precision. The text does not argue that rituals never work; it argues that finite actions yield finite results. Heavenly reward remains within return and death, so an action whose result is produced cannot provide what is unproduced and imperishable.`
        ]],
        ['Brahman, the witnessing self and desire', [
          `The cosmological sections and the two-birds image join two scales of analysis. Brahman is the source in which the cosmos is woven, while bondage is experienced locally as identification with the bird that consumes the fruits of action. The transition from eater to witness is thus a shift in self-understanding with cosmic implications.`,
          `Desire is the mechanism that links action, fruit and rebirth in the conclusion. Release is not obtained by piling up purer fruits but by a knowledge in which the desiring structure that seeks finite results is brought to an end.`
        ]],
        ['Ascetic horizon and reception', [
          `The text’s vocabulary of yatis, sannyasa and a “head-vow,” together with its strong demotion of ritual finality, gives it one of the clearest renunciatory profiles among the principal Upanishads. That profile is historically more specific than saying merely that “Upanishads interiorize ritual.”`,
          `Shankara’s commentary made the Mundaka a major Advaita source for the distinction between ritual knowledge and liberating knowledge, the teacher-disciple relation and the nondual interpretation of “becoming Brahman.” Later traditions accept the authority of the work while disputing what that relation to Brahman entails.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition treats the Mundaka as an independent text traditionally assigned to the Atharvaveda. The edition is useful because manuscript traditions contain small additions and metrical irregularities; textual criticism can distinguish a reading supported by the verse structure from later insertions.`,
        `The article should therefore avoid saying that the Mundaka is simply a chapter of an Atharvaveda Brahmana. Its Vedic affiliation is traditional, whereas its extant literary form is independent.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Mundaka chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709288'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'The Journal of Hindu Studies — discussion citing Mundaka in the 3rd–1st centuries BCE', url:'https://academic.oup.com/jhs/article/14/1/8/6316037'}
      ]
    },

    'Māṇḍūkya': {
      period: 'One of the latest principal prose Upanishads; around the beginning of the Common Era is a cautious scholarly placement.',
      infoboxStructure: '12 mantras on Om and four quarters/states of the Self.',
      structureTitle: 'Structure of the twelve mantras',
      date: [
        `The Mandukya is among the latest texts in the classical principal group. Patrick Olivelle places it with the Prashna as a late prose Upanishad that “cannot be much older than the beginning of the common era”; Nakamura and Richard King likewise place it in the early centuries CE, while some other scholars argue for an earlier date. The article should therefore present the dispute but keep the relative fact clear: Mandukya is much later than the Bṛhadaranyaka and Chāndogya and presupposes a long history of Upanishadic reflection on self, sleep and Om.`,
        `Its twelve-mantra compression is also historically important. Material about waking, dream and deep sleep already appears in earlier Upanishads, especially Chāndogya 8, but the Mandukya reorganizes those states into a fourfold analysis of the Self and systematically maps the analysis onto A-U-M and the measureless Om. Its originality lies in that concise synthesis, not in inventing every component from nothing.`
      ],
      structure: [
        `The Mandukya is only twelve mantras long, so a long recension section would be disproportionate. Mantras 1–2 identify Om with the whole of time and with the Self; 3–6 define the waking, dreaming and deep-sleep quarters; mantra 7 describes turiya through a concentrated sequence of negations and positive terms such as peaceful, auspicious and nondual; 8–12 map the four quarters onto A, U, M and the measureless Om.`,
        `The major historical textual issue is later reception: the Upanishad became inseparable in philosophical history from Gaudapada’s Mandukya Karika (Agamashastra), but the Karika is a later commentary/treatise and should not be silently quoted as if its doctrines were mantras of the Upanishad itself.`
      ],
      contentUnits: [
        ['Mantras 1–2 — Om, time and the four-quarter Self', `The text begins by making Om coextensive with “all this”: past, present, future and what lies beyond ordinary temporality. It then declares the Self to be Brahman and says that the Self has four quarters. The rest of the work is an unpacking of this audacious compression, moving through ordinary experience toward a fourth that is not simply another state alongside the first three.`],
        ['Mantras 3–4 — waking and dream', `The first quarter, Vaishvanara, is outwardly cognitive and experiences gross objects; the second, Taijasa, is inwardly cognitive and experiences subtle objects in dream. Both are still forms of subject-object experience. The distinction allows the text to show that consciousness is not exhausted by waking perception, while also refusing to treat dream as the final truth of the Self.`],
        ['Mantras 5–6 — deep sleep and Prajna', `Deep sleep is described as a condition without differentiated desire or dream, a mass of cognition/bliss in which experiences are not separately articulated. Prajna is called the lord and source from which beings arise and to which they return. Yet deep sleep is still only the third quarter: absence of ordinary duality is not automatically liberating knowledge, because the sleeper does not consciously know the Self merely by failing to perceive objects.`],
        ['Mantra 7 — turiya', `The fourth is defined by refusing the predicates used for the first three: not inwardly cognitive, not outwardly cognitive, not both, not a mass of cognition, not ordinary knowing and not sheer unconsciousness. It is unseen, ungraspable, without marks, unthinkable, indescribable, peaceful, auspicious and nondual. The sequence is designed to block the mistake of turning turiya into a strange fourth object or altered state that could be observed from outside.`],
        ['Mantras 8–12 — A, U, M and the measureless', `The text then maps waking to A, dream to U and deep sleep to M, giving phonetic and symbolic reasons for each correspondence. The final Om is “measureless,” without conventional parts, and is identified with the peaceful nondual Self. Recitation thus becomes a disciplined way of integrating cosmology, phenomenology and self-knowledge in one sacred syllable.`]
      ],
      synthesisSubs: [
        ['The four quarters are an argument, not a sleep chart', [
          `The Mandukya is often reduced to a diagram of “four states of consciousness,” but the philosophical movement is more exact. Waking, dream and deep sleep are analyzed to show progressively different relations between subject and object; turiya is then denied the status of a fourth empirical condition. It is the nondual Self in relation to which the three ordinary states can be understood.`,
          `Deep sleep is especially important. Because differentiated cognition is absent there, it might look like nonduality, but the text does not stop with Prajna. The move to mantra 7 shows that mere absence of manifest duality is not the same as liberating realization.`
        ]],
        ['Om as a map of experience and Self', [
          `A-U-M is not an arbitrary mnemonic added after the metaphysics. The sound’s articulated measures reproduce the three experiential quarters, while the measureless whole points beyond segmentation. Om therefore acts as both symbol and practice: it gives an audible structure to a theory about how the apparent plurality of experience is grounded in a single Self.`
        ]],
        ['Gaudapada and Advaita reception', [
          `The Mandukya’s enormous later reputation depends on Gaudapada’s Karika, which uses the twelve mantras as the basis for a much larger argument about non-origination, nonduality and the status of experience. Shankara’s tradition then made the Mandukya-Karika complex central to Advaita. A historically careful page must keep two layers visible: the compact Upanishad itself and the later Karika that transformed its philosophical reach.`
        ]]
      ],
      critical: [],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Mandukya chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709298'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'Oxford Academic — The Classical Upanishads (2024)', url:'https://academic.oup.com/book/55777/chapter-abstract/434288384'}
      ]
    },

    'Taittirīya': {
      period: 'Early prose Upanishad, probably pre-Buddhist, broadly 6th–5th centuries BCE; its three vallis are composite.',
      infoboxStructure: 'Taittiriya Aranyaka 7–9: Shiksha, Brahmananda/Ananda, and Bhrigu vallis.',
      structureTitle: 'Structure within the Taittiriya Aranyaka',
      date: [
        `The Taittiriya belongs to the second major layer of early prose Upanishads. In Olivelle’s relative chronology it follows the Bṛhadaranyaka and Chāndogya, together with the Aitareya and Kaushitaki, and is probably pre-Buddhist; a broad 6th–5th-century BCE placement is therefore reasonable. That range applies to the received Upanishadic material, not to every formula in it, because the three vallis have distinct literary profiles and may preserve different stages of composition.`,
        `Its exact textual position is unusually helpful for dating and interpretation: the Upanishad is Taittiriya Aranyaka 7–9, itself attached to the Taittiriya tradition of the Black Yajurveda. The first chapter is sufficiently distinct that traditional and modern scholarship have sometimes treated it separately, while chapters 8–9 form a closer pair. This composite structure is more informative than a generic statement that “Upanishads evolved over centuries.”`
      ],
      structure: [
        `Taittiriya Aranyaka 7 is the Shiksha Valli, concerned with phonetics, recitational correspondences, teacher-student formation and the convocation injunctions. Aranyaka 8, called Brahmananda Valli or Ananda Valli, begins with “satyam jnanam anantam brahma” and develops the person through food, breath, mind, understanding and bliss. Aranyaka 9, Bhrigu Valli, recasts the same hierarchy as Bhrigu’s repeated inquiry under Varuna’s instruction.`,
        `Olivelle notes that the first chapter stands apart and that Sayana can call it a Samhita Upanishad, while the final two are treated as a distinct Varuni Upanishad. The received three-valli unity is therefore real, but it overlays an older internal distinction that should remain visible.`
      ],
      contentUnits: [
        ['Shiksha Valli 1.1–1.6 — sound, recitation and correspondences', `The Upanishad begins not with abstract metaphysics but with shiksha: sound, accent, quantity, force, modulation and combination. It then builds meditations by linking paired elements—earth and heaven, fire and sun, teacher and student—through a “junction.” Exact recitation and philosophical correlation belong to the same pedagogy: disciplined speech becomes a model for discovering ordered relations within cosmos and person.`],
        ['Shiksha Valli 1.7–1.11 — formation of the Vedic student', `Later anuvakas coordinate bodily and cosmic powers, prescribe recitation, and culminate in the famous convocation address. “Speak truth; practice dharma; do not neglect study” appears beside duties to teacher, parents, guests and worthy giving. This is not a detachable modern ethics list: it is the educational conclusion of a Vedic curriculum in which learning must be embodied in conduct as the student leaves formal study.`],
        ['Brahmananda Valli 2.1–2.5 — Brahman and the layered person', `“Brahman is truth, knowledge and infinite” opens a movement from cosmology into anthropology. From Brahman arise space, air, fire, water, earth, plants, food and the human person. The text then presents progressively subtler “selves” or person-forms associated with food, breath, mind and understanding. Later Vedanta speaks of five koshas, but the ancient passage itself is a nested ascent through increasingly interior principles rather than a ready-made technical doctrine of five sheaths.`],
        ['Brahmananda Valli 2.6–2.9 — bliss, creation and fearlessness', `The text asks whether Brahman is being or non-being, narrates self-production, and describes the world as grounded in rasa or delight. Its celebrated calculus of bliss multiplies human happiness through divine levels before locating the culmination in one who knows Brahman. The section finally links fear to perceived otherness and fearlessness to establishment in the unseen, unbodied ground.`],
        ['Bhrigu Valli 3.1–3.6 — inquiry through tapas', `Bhrigu asks Varuna to teach Brahman and receives a deliberately incomplete definition: that from which beings are born, by which they live and into which they return. Instead of receiving the answer as a proposition, Bhrigu practices tapas and successively identifies Brahman with food, breath, mind, understanding and bliss. The narrative turns the hierarchy of the previous valli into a method of inquiry in which each provisional identification is tested and surpassed.`],
        ['Bhrigu Valli 3.7–3.10 — food, reciprocity and the knower’s world', `The final anuvakas return insistently to food: do not despise food, produce food abundantly, receive the guest. Food is both material dependence and a sacred circulation linking eater and eaten, earth and body. The Upanishad closes with the liberated knower’s expansive chant of identity and abundance, so its highest knowledge does not erase the embodied economy that made inquiry possible.`]
      ],
      synthesisSubs: [
        ['Brahman, person and bliss', [
          `The Taittiriya’s distinctive philosophy lies in the movement from objective elements toward increasingly interior dimensions of the person. Food, breath, mind, understanding and bliss are not merely five static compartments. Each level is experienced as a “self” until inquiry discovers a more comprehensive basis, allowing the text to ask how embodied life, cognition and ultimate reality belong to one ordered continuum.`,
          `The formula satyam jnanam anantam brahma became central to later Vedanta, but its immediate context is cosmogonic: Brahman is that from which the elemental and living world proceeds. The Ananda discussion then adds an affective dimension—ultimate reality is approached not only through existence and knowledge but through a hierarchy of bliss that culminates beyond ordinary finite enjoyment.`
        ]],
        ['Education, speech and ethical formation', [
          `The Shiksha Valli makes the social form of knowledge part of the text’s philosophy. Exact phonetics, teacher-student transmission, truth-speaking, study, hospitality and giving are not an embarrassing prelude to the “real” metaphysics in chapter 2. They describe the disciplined person capable of preserving and receiving the teaching.`,
          `The convocation address should therefore be interpreted historically as Brahmanical educational ethics rather than generalized into a timeless civic code. Its authority is produced inside a specific ritual-scholar culture, even though many of its injunctions later travelled far beyond that setting.`
        ]],
        ['Bhrigu’s method and later reception', [
          `Bhrigu’s repeated tapas provides a narrative theory of philosophical method: instruction gives a criterion, but realization requires testing increasingly subtle candidates for Brahman. The student’s progression mirrors the layered anthropology of the Brahmananda Valli while making inquiry experiential rather than merely taxonomic.`,
          `Shankara’s commentary and later Vedanta made the Taittiriya foundational for theories of Brahman, the person and bliss. The later “five koshas” framework is indispensable to reception history, but a text-focused article should mark it as a systematization of the older sequence rather than pretending that every later technical term appears fully formed in the Upanishad.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition is especially useful for the Taittiriya because the Upanishad is not a perfectly homogeneous three-chapter composition. The first chapter has a distinct transmission history, and Olivelle records parallels with the Katha-Shiksha-Upanishad in his notes.`,
        `Textual criticism here means reading Taittiriya Aranyaka 7–9 as part of the larger Aranyaka and respecting the old distinction between the Shiksha/Samhita material and the Varuni pair, rather than forcing all three vallis into one imagined authorial plan.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Taittiriya chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709251'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN},
        {title:'Journal of Hindu Studies — recent study of Aranyaka textual settings', url:'https://academic.oup.com/jhs/advance-article/doi/10.1093/jhs/hiaf025/8429851'}
      ]
    },

    'Aitareya': {
      period: 'Early prose Upanishad, probably pre-Buddhist, broadly 6th–5th centuries BCE.',
      infoboxStructure: 'Aitareya Aranyaka 2.4–2.6; 3 adhyayas focused on creation, birth and consciousness.',
      structureTitle: 'Structure within the Aitareya Aranyaka',
      date: [
        `The Aitareya belongs with the Taittiriya and Kaushitaki in the early prose layer after the Bṛhadaranyaka and Chāndogya. Olivelle’s relative chronology places these texts in the 6th–5th centuries BCE and probably before Buddhism. The date is supported less by an isolated doctrine than by archaic prose style, its position inside an Aranyaka of the Rigvedic Aitareya school, and its continuity with the surrounding speculative exegesis.`,
        `The received “Aitareya Upanishad” is specifically chapters 4–6 of book 2 of the Aitareya Aranyaka. Olivelle stresses that the boundary between these chapters and the rest of the Aranyaka is partly conventional: nearby books also call themselves Upanishadic and pursue related speculation about recitation, body and cosmos. The article should therefore date and interpret the work inside the Aitareya Aranyaka rather than as an independent philosophical booklet with a single author.`
      ],
      structure: [
        `The Upanishad has three adhyayas. The first is an extended cosmogony in which the Self creates worlds, guardians, bodily openings, faculties and food and then enters the human person. The second compresses a theory of human continuity into “three births”: conception, birth and continuation through offspring. The third asks which Self is to be worshipped and identifies the fundamental principle through prajna, consciousness or intelligent awareness.`,
        `There is no major recension problem that needs a long standalone treatment. The relevant textual issue is its exact placement within Aitareya Aranyaka 2 and the artificiality of sharply separating the three Upanishadic chapters from neighboring Aranyaka speculation.`
      ],
      contentUnits: [
        ['1.1 — the Self creates worlds and guardians', `Before creation there is only the Self. It produces worlds and then cosmic guardians, but the gods require a stable dwelling in which their powers can function. Proposed animal forms prove inadequate until the human form is presented and accepted. The scene makes the human body a successful organization of cosmic powers rather than a mere prison from which spirit must escape.`],
        ['1.2 — faculties enter the body', `Mouth, nostrils, eyes, ears, skin, heart and navel become entry points for speech, breath, sight, hearing, hair, mind and other powers, each linked to a deity. The person is thus constructed as a microcosm: seeing is both a bodily capacity and the localized operation of a cosmic power. Hunger and thirst then demand participation in every deity’s share, introducing dependence at the center of embodied existence.`],
        ['1.3 — food, entry of the Self and recognition', `Created faculties still require food, and the text stages repeated failures to seize it until apana takes hold of nourishment. The Self then asks how such a living complex could exist without its own presence and enters through the opening in the head. Only after worlds, powers, body and nourishment have been established does first-person recognition become possible. Consciousness is therefore the culmination of a theory of embodied worldhood, not an isolated metaphysical slogan.`],
        ['Chapter 2 — the three births', `The second chapter traces the person through semen, gestation and birth, then through the continuity established by the son and the father’s death. Its anthropology is historically patriarchal and bound to household lineage, but philosophically it asks how identity persists across biological processes that transform the body. The famous “three births” are therefore about reproduction, social continuity and mortality before later readers turn them into abstract rebirth doctrine.`],
        ['Chapter 3 — prajnanam brahma', `The final chapter asks what the Self is by listing activities we would now call perception, memory, intention, understanding, desire and awareness. These are gathered under prajna, and the text concludes “prajñanam brahma”—Brahman is consciousness/intelligence. Later Advaita canonized this as one of the mahavakyas, but in the Aitareya’s own sequence it answers the cosmogony: the principle that entered the body and made experience possible is recognized through the field of conscious functions.`]
      ],
      synthesisSubs: [
        ['Cosmogony becomes philosophical anthropology', [
          `The Aitareya is distinctive because creation progressively narrows toward the human body. Worlds alone are incomplete; deities require organs, organs require nourishment, and the resulting organism still requires the Self’s entry. The philosophical question is therefore “what makes a world into lived experience?” rather than simply “what substance was created first?”`,
          `This sequence prevents two opposite misreadings. The work is not merely primitive mythology, because the cosmogony culminates in an analysis of awareness; but it is also not a detached theory of pure consciousness, because awareness is introduced only after a long account of embodiment, food and dependency.`
        ]],
        ['Prajna and the mahavakya', [
          `Chapter 3 does not define prajna as one narrow mental faculty. It gathers naming, perception, comprehension, knowledge, wisdom, memory, resolve, desire and related functions into a single principle and then identifies Brahman with that principle. The move is phenomenological before it becomes later Vedantic metaphysics: the text asks what is present across the diverse acts by which a world is experienced.`,
          `“Prajñanam brahma” became a canonical mahavakya through later Advaita pedagogy. That reception is enormously influential, but returning the phrase to the creation narrative makes its local force clearer: consciousness is the answer to the Upanishad’s prior question of how cosmic powers become an experiencing human person.`
        ]],
        ['Birth, lineage and reception', [
          `The “three births” chapter should be described without either sanitizing or overgeneralizing it. It assumes male lineage and a household ideal in which the son continues the father. That is evidence about the social imagination of this Rigvedic scholastic setting, but its inclusion also means the Upanishad treats metaphysical identity alongside concrete reproduction and mortality.`,
          `Shankara’s commentary gives chapter 3 a central Advaita reading, while modern philosophy of mind often isolates prajnanam brahma as a statement about “consciousness.” Comparison can be fruitful only if modern categories are kept distinct from the text’s own fusion of cognition, life, ritual-cosmic power and selfhood.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition prints the Aitareya Upanishad within the textual history of the Aitareya Aranyaka. Arthur Berriedale Keith’s 1909 edition of the complete Aranyaka remains valuable because it prints text, critical notes and the surrounding material rather than isolating chapters 2.4–2.6.`,
        `For historical arguments, citation should therefore distinguish the modern Upanishad numbering from the larger Aitareya Aranyaka location. The surrounding Aranyaka is evidence, not disposable packaging.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Aitareya chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709256'},
        {title:'Arthur Berriedale Keith, The Aitareya Aranyaka (1909) — Open Library/Internet Archive record', url:'https://openlibrary.org/books/OL28394388M/The_Aitareya_%C4%80ra%E1%B9%87yaka'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN}
      ]
    },

    'Chāndogya': {
      period: 'One of the two oldest Upanishadic compilations; broadly 7th–6th centuries BCE, with older and younger internal strata.',
      infoboxStructure: '8 prapathakas of the Chandogya Brahmana; a large composite Samavedic prose collection.',
      structureTitle: 'Structure and compositional strata',
      date: [
        `The Chandogya and Bṛhadaranyaka are the two oldest large Upanishadic compilations in the standard modern relative chronology. Patrick Olivelle places them broadly in the 7th–6th centuries BCE, “give or take a century,” while emphasizing that both are edited collections containing materials of different ages. The important claim is therefore not “Chandogya was written in 650 BCE,” but that its redaction belongs to the late-Vedic pre-Buddhist world and preserves older ritual-speculative units alongside younger philosophical dialogues.`,
        `Its Samavedic location makes that internal development visible. The Chandogya is part of the Chandogya Brahmana of the Tandya school and begins with extensive exegesis of chant, Udgitha and Saman before moving into increasingly elaborate teachings about prana, rebirth, sat, Self, bhuman and the “city of Brahman.” The text’s history is written into its changing genres: ritual correspondence, teacher-student narrative, royal instruction and speculative dialogue coexist within one received eight-prapathaka compilation.`
      ],
      structure: [
        `The eight prapathakas should not be summarized as if they were one continuous treatise. Chapters 1–2 remain closest to Samavedic chant exegesis; chapter 3 expands correspondence into cosmic meditations; chapter 4 is a sequence of teaching narratives; chapter 5 joins prana doctrine to the five-fire teaching and post-mortem paths; chapter 6 is Uddalaka’s sustained teaching to Shvetaketu on sat and tat tvam asi; chapter 7 is Narada’s ascent under Sanatkumara toward bhuman; chapter 8 centers on dahara-vidya and the long Indra–Prajapati inquiry into the Self.`,
        `The philosophical unity of the Chandogya is therefore cumulative rather than systematic. Recurrent strategies—equating ritual elements with cosmic and bodily powers, tracing multiplicity to a more comprehensive principle, and staging knowledge through pedagogy—link units that probably did not originate at the same time.`
      ],
      contentUnits: [
        ['Prapathaka 1 — Udgitha, Om and the primacy of breath', `The opening treats Om as the syllable of the Udgitha chant and multiplies correspondences among speech, breath, chant, sun and life. In the famous conflict of the faculties, speech, sight and hearing can be impaired while life continues, but when prana prepares to depart all the faculties are shaken. This establishes a recurrent Chandogya method: ritual sound is interpreted through the structure of the living person, and bodily life is in turn mapped onto the cosmos.`],
        ['Prapathaka 2 — the Saman as a cosmic and human pattern', `Chapter 2 distributes the parts of Saman chant across worlds, rain, waters, seasons, animals, bodily functions and sexual union. The philosophical interest lies in the technique of bandhu, correspondence: a liturgical sequence becomes a template for seeing ordered relations across domains. The chapter is therefore essential for understanding how later metaphysical identifications grow from ritual exegesis rather than abruptly replacing it.`],
        ['Prapathaka 3 — Madhu-vidya, Gayatri and the person in the sun', `The “honey doctrine” imagines solar rays, gods, Vedas and beings as mutually nourishing, while Gayatri is identified with the world and the person. The chapter repeatedly seeks a totality in which cosmic and bodily levels reflect one another. It also contains the teaching of Ghora Angirasa to Devaki’s son Krishna, showing how a sacrificial life can be reinterpreted through disciplines of generosity, non-injury and truthfulness without simply abolishing sacrificial language.`],
        ['Prapathaka 4 — Satyakama, Upakosala and unexpected teachers', `The stories of Satyakama Jabala, Upakosala and Raikva make pedagogy itself philosophical. Satyakama’s uncertain paternity is answered by his truthfulness, after which animals and natural powers participate in his instruction; Upakosala learns from sacrificial fires before receiving final teaching from his human teacher; Raikva, socially unimpressive in appearance, possesses knowledge sought by a king. Authority is repeatedly detached from simple outward status and attached to truth, discipline and possession of a specific vidya.`],
        ['Prapathaka 5 — prana, five fires and the two post-mortem paths', `The chapter first stages another contest of the faculties that confirms prana’s primacy, then turns to the five-fire doctrine taught by King Pravahana Jaivali. Heaven, rain, earth, man and woman are configured as successive sacrificial fires through which beings descend into birth; the teaching is followed by paths after death associated with knowledge and ritual merit. The unit is crucial for the early history of karma and rebirth because cosmology, reproduction and sacrificial transformation are presented as one cycle.`],
        ['Prapathaka 6 — Uddalaka, Shvetaketu and “tat tvam asi”', `Uddalaka begins by challenging Shvetaketu’s learned pride: has he learned the instruction by which the unheard becomes heard? Clay, copper and iron illustrate how knowledge of a material basis explains many named forms; the text then identifies the beginning as sat, Being, which differentiates into fire, water and food. Through seed, salt, rivers and bodily examples, Uddalaka repeatedly returns to the refrain tat tvam asi. The refrain belongs to this argument about subtle cause, living presence and the relation of the person to sat; it should not be quoted without the pedagogical sequence that gives “that” its referent.`],
        ['Prapathaka 7 — Narada’s ladder to bhuman', `Narada approaches Sanatkumara with an impressive catalogue of learning yet admits that he remains in sorrow. Sanatkumara leads him through a graded series—name, speech, mind, intention, thought, meditation, understanding, strength, food, water, heat, space, memory, hope, prana and beyond—each level more comprehensive than the previous. The culmination is bhuman, fullness or the unbounded, defined where one sees, hears and knows no “other.” The chapter is a systematic pedagogy of transcendence built from the insufficiency of encyclopedic knowledge.`],
        ['Prapathaka 8 — the heart-space and the Indra–Prajapati dialogue', `The final chapter introduces the “small space” within the heart as containing a reality as vast as the cosmos, then turns to a long inquiry into the Self. Prajapati first offers the reflected bodily self; Virocana accepts it, while Indra repeatedly returns because the reflection dies with bodily damage. Dream and deep sleep are likewise tested and rejected as incomplete before Prajapati teaches a Self free from bodily affliction. The sequence is an explicit method of philosophical correction: each candidate is plausible enough to teach, but inadequate when its consequences are examined.`]
      ],
      synthesisSubs: [
        ['From ritual correspondence to metaphysics', [
          `The Chandogya’s early chapters explain why “ritual” and “philosophy” are poor opposites for this text. Udgitha, Saman, Om and sacrificial fire become instruments for thinking about breath, sun, body and cosmic order. Later teachings on sat, prana and Self continue the same search for hidden relations, even when the sacrificial frame becomes less prominent.`,
          `This continuity matters historically. The text does not document a clean revolution in which speculative thinkers abandon Vedic ritual. It shows several strategies for re-describing ritual power as knowledge of correspondences, bodily processes and cosmic principles.`
        ]],
        ['Sat, Self and pedagogical testing', [
          `Chandogya 6, 7 and 8 offer three different routes toward ultimacy. Uddalaka traces multiplicity back to sat; Sanatkumara climbs through increasingly comprehensive levels to bhuman; Prajapati tests and rejects inadequate candidates for the Self. These are not interchangeable formulations of one ready-made Vedanta doctrine. Their differences are part of the philosophical richness of the compilation.`,
          `Joel Brereton’s contextual study of tat tvam asi is important precisely because the refrain has often been detached from Chandogya 6. A text-focused presentation should explain the grammatical and argumentative setting of the refrain before turning to how later Vedanta schools interpret it.`
        ]],
        ['Karma, rebirth and the person', [
          `The five-fire teaching and the two paths after death are among the most important early sources for the developing doctrines of rebirth. Birth is explained through a cosmological-sacrificial sequence rather than by a later standardized theory of karmic law. Elsewhere the text focuses on prana, dream, deep sleep and the heart-space, showing that “the person” is investigated through physiology, eschatology and metaphysics at once.`
        ]],
        ['Reception', [
          `The Chandogya became foundational for Vedanta above all through passages such as tat tvam asi, the dahara teaching and the doctrines of the Self. Advaita, Vishishtadvaita and Dvaita accept the text’s authority but disagree sharply about whether “that” and “you” express strict identity, qualified unity or dependence. The later dispute should be presented after the local Chandogya argument, not as a substitute for it.`,
          `Brian Black’s work on narrative and pedagogy is also useful here because Satyakama, Shvetaketu, Narada, Indra and the kings are not decorative characters. The authority, failure, persistence and social position of speakers shape what knowledge means inside the text.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition presents the Chandogya as part of the Chandogya Brahmana of the Tandya Samaveda and records textual variants and emendations. For such a large composite work, textual criticism is less about choosing between two major recensions than about preserving the boundaries, repetitions and seams of distinct teaching units.`,
        `A critical reading should therefore resist harmonizing every vidya into one authorial system. The received eight-prapathaka compilation is the object of interpretation, but its internal diversity is evidence for a long scholastic history.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Chandogya chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709244'},
        {title:'Joel P. Brereton, “Tat tvam asi in Context” (1986) — bibliographic record at UT Austin', url:'https://sites.utexas.edu/sanskrit/publications/major-past-publications/'},
        {title:'Brian Black, The Character of the Self in Ancient India (2007) — JSTOR book record', url:'https://www.jstor.org/stable/jj.18254396'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN}
      ]
    },

    'Bṛhadāraṇyaka': {
      period: 'One of the two oldest Upanishadic compilations; broadly 7th–6th centuries BCE, with substantial internal stratification.',
      infoboxStructure: '6 adhyayas; Madhyandina and Kanva recensions of the Shatapatha Brahmana tradition.',
      structureTitle: 'Structure and the Madhyandina–Kanva recensions',
      date: [
        `The Bṛhadaranyaka, together with the Chandogya, stands at the beginning of the surviving Upanishadic corpus in modern relative chronology. Patrick Olivelle places the redacted works broadly in the 7th–6th centuries BCE, “give or take a century,” while stressing that they are edited compilations containing older and younger material. That is especially important here: the horse-sacrifice cosmogony, Yajnavalkya dialogues, Maitreyi repetitions, Janaka court debates and later supplementary chapters need not all have entered the text at one moment.`,
        `Its location inside the Shatapatha Brahmana of the White Yajurveda gives unusually strong historical context. In both the Madhyandina and Kanva traditions the Upanishad forms the concluding section of the Shatapatha. Philosophical speculation therefore grows directly out of Brahmana-style sacrificial exegesis: the opening cosmic horse is not an unrelated ritual fossil but evidence for the intellectual environment in which sacrificial totalities were re-described as cosmology, person and Self.`,
        `Absolute dating should remain cautious, but relative strata can be discussed more specifically. The early prose idiom, pre-systematic use of atman and brahman, royal-Brahmin debates and the development of karma/rebirth place the central materials before the later metrical Upanishads. Duplicate teachings such as the two Maitreyi dialogues and shifts in frame are evidence of compilation and redaction, not reasons to flatten the work into one philosopher’s treatise.`
      ],
      structure: [
        `The received work has six adhyayas usually grouped as Madhu Kanda (1–2), Yajnavalkya Kanda (3–4) and Khila Kanda (5–6), but each chapter has a distinct philosophical profile. Chapters 1–2 move from sacrificial-cosmic interpretation and creation to prana, Ajatashatru’s teaching and the first Maitreyi dialogue. Chapters 3–4 stage Yajnavalkya’s public and royal debates, including the “unseen seer,” antaryamin, neti neti, karma, desire and the second Maitreyi teaching. Chapters 5–6 collect shorter meditations, the da-da-da ethical triad, five-fire/rebirth material, genealogies and household rites.`,
        `Recension is genuinely important. Madhyandina and Kanva preserve substantially the same work but differ in wording, ordering and the placement of individual sections. Olivelle’s edition follows Kanva and provides Madhyandina variants and a concordance. A serious citation should therefore identify recension when wording, sequence or numbering is under discussion.`,
        `The duplicated Maitreyi dialogue at 2.4 and 4.5 is a major compositional clue. Joel Brereton has shown why the repetition must be studied as a textual problem rather than explained away: the two occurrences and their recensional forms reveal editorial history inside the received Upanishad.`
      ],
      contentUnits: [
        ['Adhyaya 1 — the cosmic horse, creation and “I am Brahman”', `The work opens by identifying parts of the ashvamedha horse with dawn, sun, wind, fire, year and the spatial cosmos, turning sacrificial anatomy into a map of totality. It then presents several creation speculations in which Death, hunger, speech, mind and Self generate ordered reality. In 1.4 the primordial Self differentiates into male and female, the social orders and living forms; the chapter culminates in the claim “aham brahmasmi,” where the decisive issue is recognition of one’s deepest identity, not the later pedagogical label “mahavakya.”`],
        ['Adhyaya 2 — prana, Ajatashatru and the first Maitreyi dialogue', `The chapter contains competing ways of identifying the vital center of the person. In the Gargya–Ajatashatru episode a Brahmin who offers a series of cosmic identifications is corrected by a king, and the sleeping person becomes the test case for what remains when ordinary faculties withdraw. The first Maitreyi dialogue then asks whether wealth can produce immortality; Yajnavalkya answers by analyzing love as ultimately oriented toward the Self and by dissolving ordinary relational categories at the limit of self-knowledge.`],
        ['Adhyaya 3 — Janaka’s sacrifice, “unseen seer” and antaryamin', `At Janaka’s great sacrifice Yajnavalkya provocatively claims the prize cows before the debate begins, and a sequence of learned challengers tests his authority. Ushasta and Kahola press him to identify the immediately present Self; Yajnavalkya answers with the “seer who cannot be seen” and “knower who cannot be known” as an object. Gargi’s questioning expands the inquiry to the support of the cosmos, while Uddalaka’s section presents the antaryamin, the inner controller who inhabits earth, waters, gods, organs and selves while remaining other than what he controls. The chapter preserves both non-objectifiable Self-language and a strongly lord-like indwelling relation.`],
        ['Adhyaya 4 — Janaka and Yajnavalkya on Self, death, karma and neti neti', `The Janaka dialogues now become more sustained. Yajnavalkya distinguishes the self-luminous person from borrowed lights, analyzes dream and deep sleep, and describes the fate of the person at death through desire, action and knowledge. The formula neti neti occurs in a context that denies that the Self can be exhausted by finite predicates; it is followed not by nihilism but by claims of imperishability and non-attachment. The chapter also contains one of the clearest early statements that a person becomes good by good action and bad by bad action, while desire determines the direction of post-mortem becoming.`],
        ['Adhyaya 5 — short vidyas and the da-da-da teaching', `The fifth chapter is a collection rather than a single argument. It includes the “fullness” invocation, meditations on brahman through speech, mind, heart and truth, and the famous story in which gods, humans and demons all hear Prajapati utter da and understand it respectively as self-restraint, giving and compassion. Its brevity and diversity are characteristic of the Khila supplement: the philosophical interest lies in how short ritual and ethical formulas are attached to the larger Upanishadic corpus.`],
        ['Adhyaya 6 — prana contest, five fires, rebirth and household continuity', `The final chapter begins with another contest among the faculties in which prana proves indispensable, then moves into the five-fire doctrine and the two paths after death. Conception and rebirth are explained through a sequence of cosmic fires that links heaven, rain, earth, man and woman. The chapter closes with rites for conception, offspring and lineage. This juxtaposition is important: the received Bṛhadaranyaka does not simply progress from household ritual to pure renunciation; advanced speculation about rebirth stands beside rites concerned with family continuity.`]
      ],
      synthesisSubs: [
        ['The Self is developed through arguments, not one definition', [
          `Bṛhadaranyaka does not offer a single dictionary entry for atman. The Self is approached as the vital center of the person, the immediately present knower, the unseen seer, the self-luminous subject in waking/dream/sleep analysis, and the imperishable reality that cannot be exhausted by predicates. These formulations overlap but are not identical, and the compilation’s philosophy emerges from their dialogue.`,
          `The “unseen seer” argument is particularly important. Anything seen, heard, thought or known is an object for a subject; the ultimate knower therefore cannot be found as merely another item inside the field of known things. Kena later develops a related epistemological problem in compressed verse, but Bṛhadaranyaka stages it through adversarial questioning at Janaka’s court.`
        ]],
        ['Brahman, antaryamin and neti neti', [
          `The text also resists reducing ultimate reality to one theological grammar. Some passages move toward identity language—most famously aham brahmasmi—while the antaryamin section speaks of an indwelling controller who remains other than the beings and organs he inhabits. Later Advaita and theistic Vedanta can therefore appeal to different Bṛhadaranyaka passages without inventing their evidence from nothing.`,
          `Neti neti belongs to this plural field. It is a rule against confining the Self to a finite description, not a declaration that nothing is real. The surrounding language of imperishability, non-attachment, self-luminosity and freedom from ordinary relational predicates shows that negation is used to protect transcendence from objectification.`
        ]],
        ['Desire, action, death and liberation', [
          `Chapter 4 gives the text’s most concentrated account of moral becoming. A person is shaped by desire; desire issues in intention and action; action has consequences for what the person becomes. Knowledge changes this chain not by producing one more karmic result but by transforming the deepest identification from which desire and appropriation arise.`,
          `The Maitreyi dialogues provide the existential counterpart. Wealth can sustain life but cannot produce immortality; relations are loved “for the sake of the Self,” and the dissolution of ordinary subject-object distinctions is presented as the horizon of knowledge. The duplicated dialogue should be read in both locations because its meaning changes with its surrounding argument.`
        ]],
        ['Vedanta reception without erasing the ancient text', [
          `Shankara’s Bṛhadaranyaka Bhashya is one of the largest and most important Advaita commentaries. It makes Yajnavalkya’s teachings central to nondual self-knowledge and to debates over renunciation, karma and liberation. But the ancient Upanishad remains more internally diverse than a later Advaita treatise: antaryamin theology, ritual cosmology, household rites and multiple accounts of the person remain part of the received text.`,
          `Vishishtadvaita interpreters give special weight to antaryamin passages because they support a supreme Lord who indwells individual selves and matter while remaining distinct from them. Modern scholarship, including Brian Black and Joel Brereton, has also restored attention to narrative form: the philosophical force of Yajnavalkya’s claims is inseparable from debates with Gargi, Maitreyi, Janaka and other named interlocutors.`
        ]]
      ],
      critical: [
        `Patrick Olivelle’s 1998 critical edition is the basic modern scholarly edition for reading the Bṛhadaranyaka across its two major recensions. He follows the Kanva text, records Madhyandina variants and supplies a concordance, making it possible to see where familiar numbering and wording are recension-specific rather than universal.`,
        `The Madhyandina and Kanva recensions differ enough in wording and arrangement that precision requires identifying the recension, especially in studies of repeated units. This is not pedantry: the history of passages such as the Maitreyi dialogue can only be reconstructed by comparing the two transmissions.`,
        `Joel P. Brereton’s study of the duplicated Maitreyi dialogue demonstrates how textual criticism can illuminate composition. Repetition, shifted narrative frames and variant forms are evidence of redactional history; they should be preserved and explained rather than harmonized into one imagined original speech by Yajnavalkya.`,
        `Because the Upanishad is the conclusion of the Shatapatha Brahmana, comparison with its surrounding Brahmana material is indispensable. The horse-sacrifice opening, ritual correspondences and later household rites show the exact ritual-scholastic matrix from which many of the philosophical arguments emerge.`
      ],
      references: [
        {title:'Patrick Olivelle, The Early Upanishads (1998), Brihadaranyaka chapter', url:'https://academic.oup.com/book/50014/chapter-abstract/422709239'},
        {title:'Patrick Olivelle, The Early Upanishads — edition description and recension concordance', url: OXFORD_BOOK},
        {title:'Joel P. Brereton, “The composition of the Maitreyi dialogue in the Brhadaranyaka Upanisad” (2006)', url:'https://law-journals-books.vlex.com/vid/composition-maitreyi-brhadaranyaka-upanisad-56845863'},
        {title:'Brian Black, The Character of the Self in Ancient India (2007) — JSTOR book record', url:'https://www.jstor.org/stable/jj.18254396'},
        {title:'University of Texas Sanskrit — Olivelle Early Upanishads transcriptions', url: UT_TEXTS},
        {title:'Signe Cohen, The Classical Upanishads: A Guide — Dating and Authorship (2024)', url: COHEN}
      ]
    }
  };

  Object.keys(DATA).forEach(name => DATA[name].synthesisTitle = 'Philosophy and reception');

  Object.entries(DATA).forEach(([name,d]) => {
    R[name] = R[name] || {};
    R[name].scholarlyDepth = 'text-specific-v6';
    R[name].sections = {
      date: d.date || [], structure: d.structure || [], contents: [],
      theology: [], reception: [], social: [], critical: d.critical || [], further: []
    };
    R[name].references = d.references || [];
    R[name].contentUnits = d.contentUnits || [];
    R[name].structureTitle = d.structureTitle || 'Structure and textual setting';
    R[name].synthesisTitle = d.synthesisTitle || 'Philosophy and reception';
    R[name].synthesisSubs = d.synthesisSubs || [];
    P[name] = Object.assign({}, P[name] || {}, {date:d.period||'', period:d.period||'', structure:d.infoboxStructure||''});
  });

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slugMap = {isavasya:'Īśāvāsya',kena:'Kena',katha:'Kaṭha',prasna:'Praśna',mundaka:'Muṇḍaka',mandukya:'Māṇḍūkya',taittiriya:'Taittirīya',aitareya:'Aitareya',chandogya:'Chāndogya',brhadaranyaka:'Bṛhadāraṇyaka'};

  function updateToc(section,newTitle){
    if(!section||!newTitle)return;
    const id=section.id,h=section.querySelector(':scope > h2');if(h)h.textContent=newTitle;
    if(id){const a=document.querySelector(`.kena-toc a[href="#${id}"]`);if(a)a.textContent=newTitle;}
  }
  function renderContents(d){
    const intro='<p>This walkthrough follows the actual sequence of this Upanishad and explains what each literary unit contributes to its argument. Famous later formulas are returned to the narrative, ritual or pedagogical setting in which the received text places them.</p>';
    return intro+(d.contentUnits||[]).map(([title,text])=>`<h3>${esc(title)}</h3><p>${esc(text)}</p>`).join('');
  }
  function renderSynthesis(d){return(d.synthesisSubs||[]).map(([title,paras])=>`<h3>${esc(title)}</h3>${(paras||[]).map(p=>`<p>${esc(p)}</p>`).join('')}`).join('');}
  function patchArticle(){
    const slug=location.pathname.split('/').filter(Boolean).pop()||'',name=slugMap[slug],d=DATA[name];
    if(!d)return false;
    const article=document.querySelector('.upanishad-research-complete');if(!article||article.dataset.textSpecificV6==='1')return!!article;
    const sections=[...article.querySelectorAll('.mahapurana-article-section')];
    const byTitle=title=>sections.find(s=>s.querySelector(':scope > h2')?.textContent.trim()===title);
    const structure=byTitle('Structure and recensions');if(structure)updateToc(structure,d.structureTitle);
    const contents=byTitle('Contents');if(contents){const body=contents.querySelector('.mahapurana-collapse-body');if(body)body.innerHTML=renderContents(d);}
    const synthesis=byTitle('Theology, influence and practice');if(synthesis){updateToc(synthesis,d.synthesisTitle||'Philosophy and reception');const body=synthesis.querySelector('.mahapurana-collapse-body');if(body)body.innerHTML=renderSynthesis(d);}
    article.dataset.textSpecificV6='1';return true;
  }
  if(!patchArticle()){const observer=new MutationObserver(()=>{if(patchArticle())observer.disconnect();});observer.observe(document.documentElement,{childList:true,subtree:true});}
})();