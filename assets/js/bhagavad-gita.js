(() => {
  const root = document.querySelector('[data-gita-chapter]');
  if (!root) return;

  const chapter = Number(root.dataset.gitaChapter);
  const counts = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];
  const names = ["Arjuna Viṣāda Yoga","Sāṅkhya Yoga","Karma Yoga","Jñāna Karma Sannyāsa Yoga","Karma Sannyāsa Yoga","Ātma Saṃyama Yoga","Jñāna Vijñāna Yoga","Akṣara Brahma Yoga","Rāja Vidyā Rāja Guhya Yoga","Vibhūti Yoga","Viśvarūpa Darśana Yoga","Bhakti Yoga","Kṣetra Kṣetrajña Vibhāga Yoga","Guṇatraya Vibhāga Yoga","Puruṣottama Yoga","Daivāsura Sampad Vibhāga Yoga","Śraddhātraya Vibhāga Yoga","Mokṣa Sannyāsa Yoga"];

  const sridharaEnglish = {
    2: {
      "1": "Then, expecting what happened, Sañjaya said “him thus”: he whose eyes were full and agitated with tears; to Arjuna grieving in the manner described, Madhusūdana spoke these words.",
      "2": "He says that very speech: Śrī Bhagavān said, “from where?” From what cause has this impurity, this delusion, come upon you in this perilous crisis? It is unpractised by the noble, does not lead to heaven, and brings dishonour.",
      "3": "Therefore: O Pārtha, do not resort to cowardice; do not attain it, for it is not appropriate or fit for you. Abandon this petty weakness of heart, this cowardice; rise for battle, O scorcher of foes.",
      "4": "Arjuna says: I have not withdrawn through cowardice but because the battle is unrighteous. How shall I fight Bhīṣma and Droṇa, who are worthy of worship? Especially with arrows—where it is improper even to say “I shall fight with words,” how could I fight with arrows? O destroyer of foes.",
      "5": "If you say that he could not even maintain his body, he answers: Without killing Droṇa and the other great teachers, without committing teacher-killing opposed to the next world, it is better here to live even on alms. On the contrary, by killing the teachers here I would eat enjoyments of wealth and desire, smeared heavily with their blood. Alternatively, “wealth and desire” qualifies the teachers: because they are agitated by thirst for wealth, they will not withdraw from the battle; their killing is therefore inevitable. Thus Bhīṣma said to Yudhiṣṭhira: “A man is a slave to wealth; wealth is slave to no one. Truly, O king, I am bound by wealth to the Kauravas.”",
      "6": "Further, even if we accept adharma, we do not know whether victory or defeat for us is preferable. He shows both: whether we conquer them or they conquer us. And even our victory would in result be defeat: those whom, after killing, we would not wish to live are standing before us.",
      "7": "Therefore Arjuna says: My nature, marked by courage and the like, has been overcome by the defect of miserliness and by the fault born of destroying my own family. I ask you, my mind confused about dharma—uncertain whether abandoning battle and begging is dharma or adharma. Tell me decisively what is truly beneficial for me. Moreover, I am your disciple, fit to be instructed; instruct me, who have taken refuge in you.",
      "8": "If you say, “Consider and do what is proper,” he says: I do not see any action that could remove my grief, which dries up and torments my senses. Even if I obtain an unrivalled prosperous kingdom on earth, or even lordship over the gods, after obtaining all that is desired I still do not see a means to remove grief.",
      "9": "Expecting what Arjuna did after saying this, Sañjaya said: “Thus”—the meaning is clear.",
      "10": "Then, expecting what happened, he says: Hṛṣīkeśa said to him “as if laughing,” that is, with a cheerful face.",
      "11": "Because this grief arises from lack of discrimination between body and Self, the Blessed Lord spoke to show that discrimination: You mourn for relatives who are not objects of grief; although I had taught you, you merely speak words of the wise—“How shall I fight Bhīṣma?” and so on—but you are not wise. For the dead, and even for the living who are bereft of relatives, thinking “How will they live?”, the wise do not grieve.",
      "12": "He gives the reason why they are not to be grieved: Just as I, the Supreme Lord, never was non-existent at any time—even when this play-body manifests and disappears, I always existed, being beginningless—so you were never non-existent; you always existed. These kings too were never non-existent, being portions of Me. Likewise, after this, we shall not cease to exist; we shall remain. Therefore they are not objects of grief, being free from birth and death.",
      "13": "The objection is that the Lord’s freedom from birth and death is true, but the births and deaths of embodied beings are well known. He answers: For the embodied, the body-identified living being, just as in this gross body childhood and the other states are conditions dependent on the body—not on the Self—though one state ends and another arises, the recognition “I am the same” remains. So, when this body is destroyed, obtaining another body also depends on the subtle body; the Self is not destroyed. The newborn’s activity, such as nursing, from prior impressions shows this. Therefore the wise do not become deluded at the destruction and production of bodies, thinking that the Self alone dies or is born.",
      "14": "The objection is: “I do not grieve for the past and future, but for myself suffering separation from them.” He answers: The “measures” are the sense functions by which objects are measured and known; their contacts with objects produce cold, heat, and the like. They come and go and are impermanent, so endure them. Just as contact with water or sunlight at a given time naturally gives cold or heat, so union and separation from desired things give happiness and sorrow. Since these are unstable, endurance is proper for the wise, not subjection to joy and grief.",
      "15": "Even effort to remedy them should give way to endurance because it yields great fruit: these contacts do not distress or overpower the person who is even-minded in happiness and sorrow. Remaining undisturbed by them, through dharma and knowledge he becomes fit for immortality, that is, liberation.",
      "16": "The objection is: “Cold and heat are unbearable; how can they be endured?” By inquiry into truth everything can be endured: the being of the nonexistent—cold, heat, and the like, which are not properties of the Self—is not found in the Self; and the nonbeing or destruction of the existent, whose nature is existence, is not found. The conclusion of both existent and nonexistent has been seen by seers of truth, knowers of reality. Thus endure with this discrimination.",
      "17": "Here the imperishable reality with the nature of being is stated generally: “that which pervades all this” means pervading as witness; know that Self-form to be imperishable, free from destruction. He gives the reason with “no one can destroy…”",      "18": "He shows that the bodies have the nature of coming and going: these bodies have an end. They are said by seers of truth to belong to the embodied one, who is eternal, indestructible, and immeasurable, while bodies bear happiness, sorrow, and the like. Since the Self is not destroyed and has no relation to happiness or sorrow, abandon delusion-born grief and fight; do not abandon your own dharma.",
      "19": "Thus grief caused by the death of Bhīṣma and the others is removed. The sorrow stated as arising from the Self’s being a killer—“I do not wish to kill these”—is also without cause: “this” means the Self; it is neither the object nor the agent of killing. Hence it does not kill and is not killed.",
      "20": "He establishes this by the absence of the six modifications: “not born” denies birth; “does not die” denies destruction; “nor, having become, will it become again” denies the second change, post-birth existence, because it is already existence by itself. “Unborn” is the reason. “Eternal”—always of one form—denies growth. “Everlasting”—ever existing—denies decline. “Ancient” denies transformation: though existing formerly, it is ever new, not changed into another form. Thus the six changes taught by Yāska and the other Vedic scholars—birth, existence, growth, transformation, decline, and destruction—are negated. Therefore the intended absence of destruction is concluded: it is not killed when the body is killed.",
      "21": "Therefore the absence of agency in killing is established: whoever knows the Self as eternal, free from growth, imperishable, free from decline, unborn, and indestructible—how does that person kill anyone, or cause anyone to be killed? Such a one has no means for killing. Nor, becoming the instigator, does he cause anyone to kill anyone—no one in any way. This also says: do not see fault in Me as the instigator.",
      "22": "The objection is: “Even if the Self is indestructible, I grieve when considering the destruction of its body.” He answers: because bodies, bound by karma, necessarily perish, there is no occasion for grief at the destruction of an old body.",
      "23": "He clarifies immortality by showing the absence of any means of killing: weapons do not moisten or soften the Self; they do not make it pliable.",
      "24": "He gives the reasons: being without parts, it cannot be cut; being formless, it cannot be burned; because it lacks liquidity, it cannot be dried. Thus it is not fit for cutting and the rest. Since it is eternal, all-pervading, stable in nature, free from change of form, immovable—retaining its prior form—and beginningless, it has these qualities.",
      "25": "Moreover, it is unmanifest—not an object of the eyes—inconceivable—not an object of the mind—and immutable—not accessible even to the organs of action. Thus it is said by the authorities to be eternal and the like. He concludes: knowing it to be so, you ought not grieve.",
      "26": "Thus he said that there is no grief because the Self lacks birth and destruction. Now, even accepting that the Self is born with each body and destroyed with its death: if you think it is eternally born whenever a body is born and eternally dead whenever that body dies, still you ought not grieve.",
      "27": "Why? For one who has been born, death is certain when the karma initiating that embodiment is exhausted; for one who has died, birth is likewise certain through the karma producing the next body. Therefore, in this unavoidable matter of birth and death, you, being wise, should not grieve; you are not fit to do so.",
      "28": "Further, considering the nature of the body and the birth and death of the Self conditioned by it: beings have the Unmanifest, primordial matter, as their beginning or previous state; they are manifest in the middle, in the interval between birth and death; and they dissolve into the Unmanifest at death. They are so constituted; what lamentation or ground for grief is there? Like one awakened, grief for objects seen in a dream is improper.",
      "29": "Why do even the learned grieve? To show that the Self is difficult to know: someone, seeing the Self through scripture and the teacher, sees it as wondrous, because the all-pervading, eternal knowledge-bliss Self is unlike worldly things, appearing as impossible as magic. Another speaks of it and hears of it as wondrous. Yet someone overcome by contrary notions does not know it even after hearing; by “and” it should be understood that even after speaking, someone may not truly know.",
      "30": "He concludes the instruction on the difficult-to-understand Self and its freedom from lamentation: the embodied Self in everyone’s body is eternally invulnerable; therefore you should not grieve for any being.",
      "31": "What Arjuna said—“Trembling arises in my body” and the like—is also unfitting: because the Self is not destroyed, you should not tremble even at killing; and considering your own duty too, you must not tremble. What you said—“I see no good in killing my own people”—is answered: nothing is higher for a kṣatriya than a righteous, just war.",
      "32": "If great good has come of itself, why tremble? Such a war, unasked and arriving unsought, is gained only by fortunate warriors, because it is an unobstructed door to heaven. Thus his claim, “How could we be happy after killing our kin?”, is refuted.",
      "33": "He states the fault in the opposite case: if you do not perform this righteous battle, then, abandoning your own duty and fame, you will incur sin.",
      "34": "Moreover, people will proclaim your lasting and imperishable infamy; for one held in honour and esteem, infamy is greater than death.",
      "35": "Moreover, those great chariot-warriors who formerly esteemed you for your many qualities will think you withdrew from battle out of fear; having been greatly esteemed, you will then fall into lightness and disrepute.",
      "36": "Moreover, your enemies will utter many unutterable and insulting words—words unfit to be spoken—slandering your power. What could indeed be more painful than that?",
      "37": "The objection was: “We do not know which is preferable, victory or defeat.” He answers: in either side there is gain for you. If killed, you will attain heaven; if victorious, you will enjoy the earth. Therefore rise, O son of Kuntī, with a firm resolve for battle.",
      "38": "The objection was: “Sin alone would fall upon us.” He answers: regarding happiness and sorrow equally, and likewise gain and loss, victory and defeat—the causes of those pairs—make them equal. Their equality rests on freedom from joy and grief. Join the battle, become ready. Fighting with the understanding of your own duty, abandoning desire for happiness and the rest, you will not incur sin.",
      "39": "He concludes the teaching of knowledge-yoga and introduces karma-yoga, its means: that by which reality is fully manifested is “sāṅkhya,” complete knowledge; the intellect concerning the Self that should be cultivated in it has been taught to you. If, even after this teaching, direct realization of the Self is not possible, then hear this intellect in karma-yoga, for the sake of direct realization through purification of the inner organ. Endowed with this intellect and with karma-yoga offered to the Supreme Lord, becoming pure within and receiving direct knowledge through His grace, you will completely abandon the bondage made of action.",
      "40": "The objection is: “As in farming, action may be obstructed and fail to bear fruit; and through defects in a mantra or its limbs an adverse result may arise. How can karma-yoga remove the bondage of action?” He answers: in this desireless karma-yoga there is no loss or fruitlessness of the beginning or effort, and no adverse result, because it is directed to the Lord and is not subject to defects and obstacles. Even a small beginning of this dharma, merely undertaking it, protects one from the great fear of saṁsāra; unlike desire-motivated action, it does not become fruitless through a defect in an accessory.",
      "41": "He explains the difference: in this karma-yoga, whose form is worship of the Lord, there is one resolute intellect, a certainty that “through devotion to the Supreme Lord I shall surely cross over.” In the irresolute, desire-driven, there are many and endless intellects, because desires are endless and differ according to action, quality, and fruit. Daily and occasional duties performed for worship of God do not perish from a defect in an accessory; they are prescribed to be done as one can, and no defect remains because they are directed to the Lord. Desire-motivated action is not so; hence the great difference.",
      "42": "The objection is: “Why do those who desire things not abandon difficult desires and adopt the resolute intellect?” He answers: those undiscerning people attached to Vedic statements speak this flowery speech, lovely at first like a poisonous creeper, proclaiming heaven and other fruits and saying that there is nothing else. In the Veda they delight in its arthavāda passages—“the merit of one performing Cāturmāsya is inexhaustible,” “we have become immortal by drinking Soma,” and the like—so they speak as though there were no higher reality, the Lord, to be attained.",
      "43": "Therefore they are “desire-souled,” their minds agitated by desire; “heaven as supreme,” for whom heaven is the highest goal. They proclaim a course toward enjoyment and sovereignty, consisting of many special rites that grant birth, actions, and their fruits.",
      "44": "Consequently, for those attached to enjoyment and sovereignty, whose minds that flowery speech has carried away, resolute intellect directed to one-pointed absorption in the Lord does not arise.",
      "45": "The objection is: “If heaven and the like are not the highest fruit, why do the Vedas prescribe rites as their means?” The Vedas concern the three guṇas: for qualified, desire-motivated persons they teach the relation of actions to their fruits. But you become free from the three guṇas, desireless. Be free from pairs such as pleasure and pain, heat and cold—endure them. Be steadfast in eternal sattva, relying on courage. Be free from yoga-kṣema: from taking what is not obtained and preserving what is obtained. Be self-possessed and not negligent. One distracted by dualities and occupied with gain and preservation cannot transcend the three guṇas.",
      "46": "The objection is: “Perhaps the intellect of worshipping God without desire, after abandoning Vedic fruits, is a bad intellect.” He answers: an udapāna is a small reservoir or well in which water is drunk; because its water is limited, purposes such as bathing and drinking are obtained by going around to different places. All those purposes at once exist in a large lake filled everywhere. Similarly, whatever purpose or fruit of action is in all the Vedas is wholly included in the knower of Brahman with resolute intellect, established in Brahman, because lesser joys are contained in Brahman-bliss. Therefore this intellect is right.",
      "47": "If you think that all the fruits of action will arise through worship of the Lord and therefore act with that intention, he prevents it: for you, who seek knowledge of the Self, there is entitlement only to action, not to its fruits that cause bondage; let desire not be the cause of action. The objection is: “Once action is done, its fruit necessarily comes, like satiety after eating.” He says: do not become one whose action is motivated by a desired result such as heaven—the desired alone is the result; an undesired fruit need not arise. Therefore do not become attached to non-action either, fearing the bondage of fruit; do not make abstention your commitment.",
      "48": "What then? Being established in yoga—single-mindedness toward the Lord—perform actions. Abandon attachment, the fixation on doership, and act solely by dependence on God. Be equal regarding success and failure, even of the result and knowledge, and act as an offering to God alone. Such equanimity is called yoga by the wise, because it is the settling of the mind.",
      "49": "Desire-motivated action is extremely inferior to action done through buddhi-yoga, the yoga produced by resolute intellect or whose means is intellect. Therefore seek and perform karma-yoga, taking refuge in buddhi and knowledge—or take refuge in the Lord, the protector, in buddhi. Those who seek fruits are pitiable and miserly, as the scripture says: one who departs without knowing the Imperishable is a miser.",
      "50": "The one endowed with buddhi-yoga is superior: in this very life, by the grace of the Lord, he abandons both good action, which leads to heaven, and bad action, which leads to hell. Therefore strive for yoga, karma-yoga. The skill in actions is the ability to make even binding actions serve liberation through worship of God.",
      "51": "He explains how actions become a means of liberation: the wise, endowed with buddhi, relinquishing the fruits born of action and acting only to worship God, become freed from birth as bondage and go to Viṣṇu’s state, called liberation, free from every affliction.",
      "52": "When, through the Lord’s grace from performing worship, your intellect crosses the deep and difficult wilderness of delusion—delusion is identification of the Self with the body, called a dense thicket—then you will reach dispassion toward what is to be heard and what has been heard. You will not seek them as things to be acquired or inquire after them.",
      "53": "Previously distracted by hearing many worldly and Vedic meanings, when your intellect becomes steady and unmoving in samādhi—samādhi is the Lord, in whom the mind is gathered—undistracted by other objects and stable through practice, then you will attain yoga, the fruit of yoga: knowledge of reality.",
      "54": "Arjuna, wishing to know the signs of the knower of the Self mentioned in the previous verse, asks: What is the definition or mark of one whose prajñā is steady, naturally established in samādhi? By what mark is he called sthitaprajña? How does he speak, sit, and walk?",
      "55": "The disciplines that are means for the seeker are themselves the natural marks of the perfected one. Therefore, while stating the signs of the perfected, he describes the inner means until the chapter’s end. First he answers: when one completely abandons all desires lodged in the mind, one is called sthitaprajña. The cause is being satisfied in the Self alone, by the Self itself, with supreme bliss; when one delights in the Self and gives up small desires for sense objects, one has this mark.",
      "56": "Further: whose mind is not agitated even when suffering arises; whose longing has gone in pleasures; whose attachment, fear, and anger have departed—such a sage is called sthitadhi, one with steady wisdom, or sthitaprajña.",
      "57": "This answers “How does he speak?” One without deep attachment anywhere, even to sons and the like, does not praise or rejoice when obtaining each favourable good, and does not hate or blame when obtaining unfavourable evil; he speaks only as an indifferent witness. His wisdom is established.",
      "58": "Further: when this yogin withdraws or retracts his senses from sense objects, as a tortoise naturally draws in its limbs—hands, feet, and the rest—his wisdom is established.",
      "59": "The objection is: non-engagement of the senses with objects cannot be a mark of sthitaprajña, since the dull, the sick, and those devoted to fasting also do not engage with objects. He answers: for an ignorant embodied person who does not take in objects through the senses, the objects withdraw; that experience ends, but taste, attachment, or desire remains. Even that taste naturally ceases on seeing the Supreme for the sthitaprajña. Or, for one fasting, objects mostly withdraw because hunger removes the expectation of sound, touch, and the rest, but craving for taste remains; the rest is the same.",
      "60": "Without sense-control sthitaprajña is impossible; therefore great effort is needed in the seeker. Even the mind of a discriminating person striving for liberation is forcibly carried away by the senses, because they are turbulent and prone to agitation.",
      "61": "Therefore, restraining all the senses, the disciplined yogin should abide with Me as supreme. This answers how he sits: with the senses under control. For one whose senses are under control, wisdom is established.",
      "62": "Having spoken of the defects when the external senses are uncontrolled, he speaks of the defect when the mind is uncontrolled: for a person who contemplates sense objects with a judgement of their qualities, attachment to them arises; from attachment a greater desire arises; and from desire, when obstructed by something, anger arises.",
      "63": "From anger comes delusion, the absence of discrimination between what should and should not be done; from that comes confusion and deviation of the memory of what scripture and teacher have taught; from that comes destruction or overpowering of the intellect, as when a tree is covered; then one perishes, becoming like the dead.",
      "64": "The objection is: “The senses naturally run toward objects and cannot be opposed; how can sthitaprajña be possible?” He answers: even while using objects, one whose senses are free from attachment and aversion, whose mind is controlled and made subordinate to the Self, attains prasāda, peace. This also answers how he walks and enjoys: he approaches objects with senses under his control.",
      "65": "What follows when prasāda arises? The destruction of all sorrow arises; then, for one of tranquil mind, the intellect becomes firmly established. This is the meaning.",
      "66": "He establishes by contrast that sense-restraint is a means of sthitaprajña: for one who is not yoked, with uncontrolled senses, an intellect concerning the Self does not arise from scripture and the teacher—how could it be established? Nor is there contemplation; through contemplation the intellect becomes established in the Self. For one who does not contemplate there is no peace, the mind’s settling in the Self; for the unpeaceful, where is happiness, the bliss of liberation?",
      "67": "He gives the reason for the absence of intellect in the unyoked: among uncontrolled senses roaming freely in objects, whichever one sense the mind follows, being uncontrolled and going along with that sense, carries away the person’s wisdom and scatters it among objects; how much more when many senses carry it away. It is like wind driving the boat of a distracted helmsman all around the sea.",
      "68": "He concludes that sense-restraint is both means and mark: since this is so, know that for one whose senses are completely restrained from objects, wisdom is established. The address “mighty-armed” hints that one capable of conquering enemies can also conquer here.",
      "69": "The objection is: no one is seen in the world with senses completely restrained, as if asleep or without seeing and acting; this mark seems impossible. He answers: the “night” of all beings is the Self-abiding state, night-like for minds covered by the darkness of ignorance, because ordinary seeing and acting are absent. In that Self-abiding state the self-controlled one is awake and awakened. That in which beings awaken through object-knowledge is night for the sage who sees the Self; he has no seeing and acting there. Just as owls that are blind by day see at night, the Brahman-knower with eyes open sees Brahman, not objects; thus the mark is possible.",
      "70": "The objection is: if he has no sight of objects, how does he experience them? A filled ocean, unmoving in its boundary, receives waters from many rivers and still more waters enter; likewise all sense objects, drawn in by prārabdha karma, enter the inward-seeing sage while he remains unchanged by enjoyment. He attains peace and liberation, not one who desires and strives for enjoyment.",
      "71": "Since this is so: having abandoned or ignored obtained desires, and being without longing for unobtained ones; because he is without ego, therefore without “mine” regarding the means of enjoyment; becoming inward-seeing, he moves and experiences enjoyments by the force of prārabdha, or goes anywhere. Such a person attains peace.",
      "72": "He praises and concludes the knowledge-nistha taught: this is the brāhmī state, steadfastness in knowledge of Brahman. A person whose inner being has been purified by worship of the Supreme attains it and is not deluded again by worldly saṃsāra. Since, established in it even for a moment at death, he attains dissolution and liberation in Brahman, what need is there to say of one established in it from childhood?"
    },
  3: {
      "1": `First, by “you grieve for those who should not be grieved for,” discrimination between body and Self was taught as a means to liberation. Then, by “this was taught in Sāṅkhya; hear this in Yoga,” action was also taught. Seeing praise of the resolute intellect, the steadfast person’s freedom from desire, sense-control, and ego, and the conclusion “this is the Brahmic state,” Arjuna thinks intellect is superior: if it is greater than action as the inner means to liberation, why do You repeatedly direct me into this terrible, violent action of battle?`,
      "2": `Because action too was praised—“for a kṣatriya there is nothing higher than righteous battle”—Arjuna says that words praising action here and knowledge there make his understanding waver and seem to confuse him. The compassionate Lord cannot truly be a deluder; he says it only appears so through his own error. Therefore decide which of the two is auspicious, the single practice by which he may attain liberation, and tell him.`,
      "3": `The Blessed Lord replies: in this world, whose qualified persons have either purified or impure inner organs, I earlier declared a twofold discipline aimed at liberation. These are not independent paths; one Brahman-discipline is taught in two forms according to qualification. For the Sāṅkhyas, whose minds are pure and who have risen to the ground of knowledge, knowledge-yoga, meditation and the like mature their knowledge. For those seeking that ground, karma-yoga purifies the inner organ and enables them to rise to it.`,
      "4": `Therefore the actions proper to one’s social and religious station must be performed until knowledge arises; without purification knowledge does not arise. Non-performance of action does not produce naishkarmya, the knowledge or freedom from action, and mere renunciation without knowledge does not bring perfection or liberation.`,
      "5": `Renunciation means detachment from actions, not cessation of action in its very nature, which is impossible. No one—wise or ignorant—remains even for a moment without acting. Everyone is compelled, helpless and not independent, by the qualities born of nature, such as attraction and aversion.`,
      "6": `He condemns the ignorant renouncer: one who restrains the organs of action—speech, hands and the rest—but sits remembering sense-objects in the mind under the pretext of meditation, with an impure mind that lacks steadiness in the Self, is called a hypocrite.`,
      "7": `The person opposite to this is superior: controlling the organs of knowledge by the mind and turning them toward the Lord, he undertakes action through the organs of action, without attachment or desire for its fruit. Through the resulting purification he becomes distinguished and fit for knowledge.`,
      "8": `Therefore perform the obligatory daily duties, such as the twilight worship. Action is better than non-action; without action even the maintenance of your body would not be possible.`,
      "9": `The Sāṅkhyas say that all action binds, and therefore should not be done. The Lord refutes this: “sacrifice” here means Viṣṇu, as Scripture says, “Sacrifice indeed is Viṣṇu.” Action done for His worship does not bind; action done for any other purpose binds the world. Therefore perform action for Viṣṇu’s satisfaction, free from attachment and desire.`,
      "10": `At the beginning of creation Brahmā created beings qualified for sacrifice and said: “Prosper and multiply by this sacrifice; let it bring you increasing growth. Let this sacrifice be your wish-fulfilling giver, yielding the objects you desire.” “Food” also indicates necessary duties; the incidental praise of desire-motivated action serves the point that action is superior to inaction.`,
      "11": `By this sacrifice nourish the gods with the portions of oblations; let the gods nourish you through rain and the production of food. Thus mutually nourishing one another, gods and human beings will obtain prosperity and the desired good.`,
      "12": `The gods, nourished by sacrifices, will indeed give you enjoyments through rain and the like. One who eats food and other enjoyments given by them without offering anything back through the five great sacrifices is to be known as a thief.`,
      "13": `Those who eat the remnants of the Vaiśvadeva and other sacrifices are freed from all sins produced by the five household killings—grinding, pounding, the hearth, the water-pot, and sweeping. Those who cook food only for themselves, and not for such sacrifices, eat sin; they are evil-doers.`,
      "14": `Beings arise from food, transformed into bodily seed and blood; food arises from rain; rain arises from sacrifice; and sacrifice arises from action, the proper activity of the sacrificer. Scripture remembers: an offering placed in fire reaches the sun, from the sun rain arises, from rain food, and from food creatures.`,
      "15": `Know that action—the sacrificer’s activity—arises from Brahman, the Veda. Know also that the Veda arises from the Imperishable, the Supreme Brahman, as the Veda is described as the breath of the Great Being. Since sacrifice arises from that Imperishable and is its purport, the all-pervading Imperishable is said to be established in sacrifice, attained through it. Thus the sacrificial duties must be performed.`,
      "16": `The Lord has set in motion this cycle for the accomplishment of human aims: from the Vedic Brahman comes action, from action rain, from rain food, from food beings, and from beings action again. Whoever does not follow and perform this cycle lives sinfully; delighting only in sense-objects, that person lives in vain.`,
      "17": `Having taught karma-yoga for the purification of the ignorant person’s inner organ, He explains that action is unnecessary for the knower: one whose joy is in the Self, whose satisfaction is in the Self through the experience of its own bliss, and who is content in the Self has no duty to perform.`,
      "18": `Such a person gains nothing from action and incurs no fault from non-action, being egoless and beyond injunction and prohibition. For him there is no dependent object or person—from Brahmā down to the immovable—for whom liberation must be obtained. The gods cannot obstruct the rise of his knowledge; any such obstruction belongs only to the period before true knowledge arises.`,
      "19": `Only such a knower is free from the use of action, not another person. Therefore you should always perform the obligatory action prescribed as your duty, without attachment to its fruit. A person who acts without attachment attains the highest, liberation, through purification of the mind and the knowledge that follows.`,
      "20": `King Janaka and others attained perfection through action; you too should act for the maintenance of the world. “Maintenance of the world” means keeping people established in their own duties. If I perform action, everyone will follow; if I abandon it, the ignorant may abandon action by taking the knower as their example.`,
      "21": `Whatever a great person does, ordinary people do the same. Whatever standard that excellent person accepts as authoritative—whether the scripture of action or the scripture of renunciation—the whole world follows.`,
      "22": `I have no duty, O Pārtha, in any of the three worlds; there is nothing unattained that I ought to attain. Nevertheless I remain engaged in action and perform it.`,
      "23": `If I did not remain constantly vigilant and did not perform action, people would follow my path; they would likewise cease from action.`,
      "24": `Then the worlds would perish through the disappearance of action, social mixture would arise, and I would become the cause of the destruction and defilement of these creatures.`,
      "25": `Therefore the wise person should act without attachment for the maintenance of the world, just as ignorant people act while attached to action.`,
      "26": `The wise should not unsettle the understanding of ignorant people who are attached to action by teaching them the non-doership of the Self; he should not move their minds away from action. Rather, while himself acting attentively, he should help them remain devoted to action and cause them to perform it. Otherwise they would lose faith in action and fail to gain knowledge.`,
      "27": `All actions are performed in every way by the qualities of nature, through the senses and the other instruments. But a deluded person, whose understanding is confused by identification with the organs, thinks, “I alone am the doer.”`,
      "28": `The knower knows the distinction of the Self from the qualities and from actions and therefore does not become attached or identify as doer. He knows that the qualities—the senses—move among the qualities—their objects—and says, “I am not this.”`,
      "29": `Those deluded by nature’s qualities become attached to the qualities, the senses, and their actions, thinking “we act.” The complete knower should not unsettle these limited-minded people; he should not turn them away from their actions, but guide them appropriately.`,
      "30": `Dedicate all actions to Me, seeing “I act as one dependent on the inner ruler,” with the mind fixed on the Self. Become free from desire and possessiveness, free from the fever of grief, and fight.`,
      "31": `Those who have faith in My teaching, who do not find fault with it by thinking that it makes them engage in painful action, and who practise it, are gradually freed from bondage by their actions, just as the knower is freed.`,
      "32": `Those who, without discrimination, resent My teaching that action should be done for the Lord and do not practise it—know those senseless people as ruined and deluded in every kind of knowledge, whether of action or of Brahman.`,
      "33": `Even a person endowed with knowledge of right and wrong acts according to the nature formed by former impressions and karma. All beings follow their own nature; what then can mere restraint accomplish against that powerful nature?`,
      "34": `For every sense, attraction to its agreeable object and aversion to its disagreeable object are fixed and inevitable. Thus nature impels a being. Yet Scripture governs the aspirant so that he does not become subject to them, for attraction and aversion are his enemies. The teaching turns him toward worship of the Lord before he falls into their deep current, like one who boards a boat before entering the flood.`,
      "35": `One’s own duty, even if defective, is better and more praiseworthy than another’s duty performed perfectly. For one who undertakes his own duty, such as battle, even death is better because it leads to heaven; another’s duty is fearful because, being prohibited for him, it leads to hell.`,
      "36": `Arjuna asks: “O descendant of Vṛṣṇi, by what is a person impelled to commit this sinful act even though he does not wish to do so? Even one who restrains desire and anger by discrimination is seen to fall again; is there another force at their root that drives him?”`,
      "37": `The Lord replies: it is desire, born of the quality of passion. Anger too is not separate; when desire is obstructed it changes into the form of anger. With the growth of sattva desire is destroyed. Know it here, on the path to liberation, as the enemy—a great devourer, never satisfied, and a terrible sinner. It cannot be reconciled by gifts or conciliation.`,
      "38": `He shows how desire is an enemy: just as fire is covered by its natural smoke, a mirror by adventitious dust, and an embryo by the skin enclosing the womb, so knowledge is covered by desire in three ways.`,
      "39": `The knowledge referred to is the discriminating knowledge of the Self. In an ignorant person, desire appears to be a source of happiness while the object is enjoyed, but afterwards becomes an enemy; in the knower it is an enemy even at the moment of enjoyment because its harm is understood. It is never satisfied even when filled with objects, like fire, and brings sorrow and torment; thus it is an eternal enemy to all.`,
      "40": `The abodes of desire are the senses, mind, and intellect. Through seeing and hearing objects, and through intention and resolve, desire manifests. Taking these senses and inner organs as its supports, it covers discriminating knowledge and deludes the embodied being.`,
      "41": `Therefore, before delusion arises, restrain the senses, mind, and intellect, and clearly destroy or abandon this sinful desire. Knowledge is the Self-knowledge received from scripture and teacher; higher realization is its assimilation through contemplation. Both are destroyed by desire, so it must be slain.`,
      "42": `The senses are said to be superior to their objects, being subtler and illumining them; the mind, which directs them, is superior to the senses; the decisive intellect, on which intention depends, is superior to the mind. The Self, abiding as the witness of the intellect and the innermost of all, is beyond the intellect; “the embodied” refers to that Self.`,
      "43": `Thus knowing the Self, which is beyond the intellect, and making the mind steady by a discriminating intellect of this kind, slay the enemy in the form of desire—difficult to approach and difficult to understand.`,
    },
  4: {
      "1": `The karma-yoga and knowledge-yoga that were taught in the first two chapters as means to liberation are now to be expanded. The Lord first praises this yoga as received through a lineage: because its fruit is imperishable, I taught this imperishable yoga long ago to Vivasvān, the sun-god; he taught it to his son Manu, and Manu to his son Ikṣvāku.`,
      "2": `The royal sages—kings who were also seers, beginning with Nimi, and their successors beginning with Ikṣvāku—knew this yoga as it was taught through the lineage. The reason why people of the present age do not know it is that, under the power of time, the lineage was broken and the yoga was lost in the world.`,
      "3": `That same yoga, now broken off from its tradition, has been taught by Me again to you. You are My devotee and My friend; therefore this highest secret is spoken to you, not to someone unprepared.`,
      "4": `Arjuna sees an impossibility in the chronology: Your birth is recent, whereas Vivasvān’s birth was ancient. How am I to understand that You first taught this yoga to the ancient sun-god?`,
      "5": `The Blessed Lord replies: many births have passed for Me and for you. I know all of them because My power of knowledge is never obscured; you do not know them because your knowledge is covered by ignorance.`,
      "6": `Although I am unborn and imperishable in nature, and although I am the Lord free from dependence on karma, I manifest Myself through My own māyā. I take hold of My own pure-sattva nature and, by My will, appear in a pure and exalted form; I am not born as an ordinary embodied being.`,
      "7": `Whenever there is decline of dharma—its loss—and an increase of adharma, I manifest Myself. The time of manifestation is whenever righteousness has become weak and unrighteousness has become strong.`,
      "8": `I manifest in every age to protect the virtuous who follow their own dharma, to destroy the wicked who perform evil actions, and to establish dharma firmly through the protection of the good and the destruction of the wicked. Therefore I appear again and again. The punishment of the wicked is not cruelty, just as a mother’s discipline of a child is not lack of compassion.`,
      "9": `My birth, which is produced by My own will, and My action, which consists in protecting dharma, are divine and unlike worldly birth and action. One who knows them in truth abandons bodily identification and does not take another birth; he attains Me alone.`,
      "10": `Many, free from attachment, fear and anger, with their minds absorbed in Me and taking refuge in Me alone, were purified by the austerity of knowledge. Knowing My supreme compassion—that I preserve dharma through manifestations of pure sattva—and practising the duties that ripen knowledge, they attained My state. This does not mean that the path of devotion began only recently. The distinction between the ever-pure Lord and the individual, whose ignorance is removed by His grace, should be understood.`,
      "11": `People worship Me in whatever manner—desirefully or without desire—and I bless them in that very manner by granting the fruit they seek. It is not that I neglect those who worship Indra and other gods; worshippers of every kind follow My path, since the gods too are forms through which I am worshipped.`,
      "12": `Desiring quick success in action, people in this human world generally worship the gods rather than Me directly. The fruit born of ritual action comes quickly, whereas the fruit of knowledge, liberation, is difficult to attain; hence their choice.`,
      "13": `I created the fourfold order according to divisions of qualities and actions: sattva-dominant brāhmaṇas with tranquillity and self-control, sattva-rajas kṣatriyas with courage and battle, rajas-tamas vaiśyas with farming and trade, and tamas-dominant śūdras with service. Although I am their creator, know Me as in truth non-doer, because I am unattached, tireless and imperishable.`,
      "14": `The actions involved in creation and the rest do not stain Me or make Me attached. I have no desire for their fruits, being fulfilled and free from ego. One who knows Me as unattached and without desire for results is likewise not bound by actions, because his ego and craving become weak through that knowledge.`,
      "15": `Knowing that action done without ego and desire is not binding, ancient seekers such as Janaka performed it in former ages for purification of the inner organ. Therefore you too should first perform action.`,
      "16": `Action and inaction must be examined with the wise, not decided merely from worldly custom. Even discerning people are confused about what action is, what inaction is, and what forbidden action is. I shall explain the action and inaction whose knowledge and practice free you from the inauspicious bondage of saṃsāra.`,
      "17": `The truth of prescribed action must be known; the truth of non-performance of prescribed action must also be known; and the truth of forbidden action must be known. The movement and consequence of action are difficult to understand, so “action” indicates all three—action, inaction, and wrong action.`,
      "18": `One who sees in action the inaction that makes it non-binding—action performed as worship of the Supreme—and sees in inaction the action that produces fault, is wise among human beings. Such a person is a yogi and performs all action, because through it he attains knowledge. Alternatively, while acting with body and senses he sees the Self’s natural actionlessness, and in renouncing action without knowledge he sees the binding action hidden there; he is truly intelligent.`,
      "19": `The wise call a person learned whose undertakings are free from desire and whose actions are burnt to the state of inaction by the fire of knowledge. His actions arise without the force of desire, and knowledge born of the purification of his mind makes them non-binding.`,
      "20": `Having abandoned attachment to action and its fruit, satisfied by the bliss that is naturally his, and needing no support for acquisition or preservation, he may be engaged in prescribed or natural action, yet in truth does nothing; his action has become inaction.`,
      "21": `Free from desire, with mind and body controlled, having renounced all possessions, he performs only the action needed to maintain the body and does not incur sin or bondage. In the case of one established in yoga, begging and other natural actions needed for the body likewise do not produce the fault of neglecting a prescribed duty.`,
      "22": `Content with whatever unasked-for gain comes, beyond the pairs such as heat and cold and able to endure them, free from envy, and equal in success and failure, such a person is not bound even while performing the actions appropriate to either stage of spiritual development.`,
      "23": `For one whose attachment has gone, whose mind is established in knowledge, and who performs action as sacrifice for the Supreme Lord, the whole of action, together with its latent impressions, dissolves into the condition of inaction. For one established in yoga, action is performed only to protect sacrifice and maintain the world.`,
      "24": `The action described as sacrifice is itself Brahman: the ladle used to offer is Brahman, the clarified butter offered is Brahman, the fire is Brahman, the offerer is Brahman, and the act of offering is Brahman. For one whose mind is absorbed in Brahman, Brahman alone is reached, not another fruit. Thus action dissolves.`,
      "25": `He praises the knowledge-sacrifice by explaining several sacrifices according to the qualifications of practitioners. Some karma-yogins worship the gods in a sacrifice in which Indra and Varuṇa are the deities; the word “alone” shows that they do not yet see Brahman in those gods. Others, practising knowledge-yoga, offer the sacrifice itself into the fire that is Brahman, using the sacrifice as the means called “the ladle is Brahman”; thus all action is dissolved. This is the knowledge-sacrifice.`,
      "26": `Some steadfast celibates offer the organs of hearing and the other senses into the fires of restraint, withdrawing them and remaining governed by self-control. Other householders offer sound and the other sense-objects into the fires that are their senses, regarding the senses as fires and the objects as offerings, yet remaining unattached even while enjoying.`,
      "27": `Other meditators offer the activities of the organs of knowledge—hearing, seeing and the rest—the activities of the organs of action—speech, grasping and the rest—and the activities of the ten vital airs into the fire of self-control, which is meditation. Having illuminated that fire with knowledge of the object of meditation, they restrain the mind and bring all those activities to rest in the Self.`,
      "28": `Some perform sacrifice by giving wealth; some by austerity such as the kṛcchra and cāndrāyaṇa vows; some by yoga, the restraint of mental modifications; and some by study of the Veda and the knowledge gained by hearing and reflection. These are practitioners whose vows have been properly sharpened and fulfilled.`,
      "29": `Some devoted to breath-discipline offer the upward-moving prāṇa into the downward-moving apāna during inhalation, making them one; during exhalation they offer apāna into prāṇa. By inhalation, retention and exhalation they restrain the upward and downward movements. Others practise regulated eating and, through retention, bring all the vital airs and the senses into unity in the prāṇa, offering them into the fire of restraint. Thus the various breath-sacrifices are described.`,
      "30": `All these people who know sacrifice destroy their sins by sacrifice. Those who eat the nectar-like remnant of sacrifice attain the eternal Brahman through knowledge. For one who does not perform sacrifice there is not even this human world of limited happiness; how then could there be a higher world? Therefore sacrifices must be performed.`,
      "31": `Sacrifices of all these kinds are spread out in the mouth of Brahman, the Veda; they are directly prescribed by it. Yet know that all of them, being produced by actions of speech, mind and body, are not in contact with the Self, for the Self is beyond action. Knowing this and becoming established in knowledge, one becomes free from saṃsāra.`,
      "32": `The sacrifice of knowledge is superior to the sacrifice made of material things. Although knowledge itself is revealed in the mind, it is not produced as an effect by the mind; it is merely manifested there. All action, together with its fruit, culminates in knowledge and is included in it.`,
      "33": `The means of attaining this knowledge is taught: know it by approaching knowers with prostration, by repeated questioning—“What is the cause of my saṃsāra and how does it cease?”—and by service. Those knowers are learned in Scripture and see the truth directly; they will impart knowledge to you through instruction.`,
      "34": `Having gained that knowledge, you will not again fall into delusion, such as grief over the killing of relatives. Through it you will see all beings, from fathers and sons onward, as non-different from the Self, and thereafter you will see the Self as non-different from Me, the Supreme Self.`,
      "35": `Even if you were the greatest sinner among all sinners, you would cross the entire ocean of sin easily in the boat of knowledge. Knowledge is the boat that carries one beyond the ocean of accumulated wrongdoing.`,
      "36": `As a blazing fire reduces pieces of wood to ashes, so the fire of knowledge of the Self reduces all actions—apart from the karma already bearing fruit—to ashes. Knowledge destroys the potential of the remaining karma and makes it non-binding.`,
      "37": `There is no purifier in this world equal to knowledge among austerity, yoga and the other disciplines. A person perfected by karma-yoga gradually obtains knowledge of the Self by himself, without strain, in due time; not by abandoning karma-yoga prematurely.`,
      "38": `The person who has faith in the truth taught by the teacher, is devoted exclusively to it, and has controlled senses obtains knowledge; another does not. Therefore karma-yoga must be practised for purification before knowledge arises. Having gained knowledge, he quickly reaches the highest peace, liberation.`,
      "39": `The ignorant person who does not know the teaching, the faithless person who doubts it, and the person whose mind is seized by doubt are ruined and fall from their aim. For such a doubter there is neither this world—ordinary aims such as wealth and marriage—nor the next world, because dharma is not completed, nor happiness, because even enjoyment is prevented by doubt.`,
      "40": `The ignorant person who does not know the teaching, the faithless person who doubts it, and the person whose mind is seized by doubt are ruined and fall from their aim. For such a doubter there is neither this world—ordinary aims such as wealth and marriage—nor the next world, because dharma is not completed, nor happiness, because even enjoyment is prevented by doubt.`,
      "41": `The twofold Brahman-discipline taught in the preceding chapters is concluded: actions offered to the Supreme Lord through yoga do not bind a person; knowledge cuts the doubt born of identification with the body; and the self-controlled, vigilant person is not bound by actions performed for the maintenance of the world or by natural actions.`,
      "42": `Therefore cut with the sword of knowledge of the Self this doubt born of ignorance and lodged in your heart, the doubt that causes grief. Take refuge in karma-yoga, the means to knowledge of the Supreme Self, and rise for the battle now before you, O Bhārata; your kṣatriya duty makes battle your own dharma.`,
    },
  5: {
      "1": `Arjuna says: by “the knower has no duty” and “all action culminates in knowledge,” You teach renunciation of action to the wise; then You say, “cut doubt with the sword of knowledge and take refuge in karma-yoga.” Since renunciation and karma-yoga seem opposed and cannot be performed by one person at the same time, tell me decisively which one is truly best for me.`,
      "2": `The Lord replies: I am not prescribing karma-yoga to one who already knows the Self revealed by Vedānta, for it would conflict with the renunciation taught for that person. I tell you, who are still identified with the body, to cut the doubt born of grief and delusion with discrimination and practise karma-yoga, the means to knowledge. When karma-yoga purifies the mind and Self-knowledge arises, renunciation was taught earlier as an aid to the maturity of knowledge. Thus the two are combined successively according to spiritual stage, but karma-yoga is superior to immediate renunciation.`,
      "3": `Know as a perpetual renouncer the person who performs action for the Lord without attraction and aversion. Even while acting he is a renouncer, because he is free from the dualities. His mind is purified and, through knowledge, he is easily released from saṃsāra.`,
      "4": `Only childish, ignorant people say that Sāṅkhya, the renunciation belonging to knowledge, and karma-yoga are separate and independent paths with different fruits. A wise person does not say this: one who properly follows either obtains the fruit of both. Karma-yoga purifies the mind and leads through knowledge to liberation; renunciation rests on the previously performed karma-yoga and reaches the same liberation.`,
      "5": `The state directly attained by the Sāṅkhya renouncers—liberation—is also reached by the karma-yogins through knowledge. Therefore the person who sees Sāṅkhya and Yoga as one because they have one fruit sees correctly.`,
      "6": `Renunciation without karma-yoga is difficult and cannot be accomplished successfully; without purification, knowledge does not arise. But the karma-yogi, whose mind has become pure, becomes a renouncer and quickly realizes Brahman directly. Therefore karma-yoga is superior before purification.`,
      "7": `The karma-yogi whose mind is purified, whose body and senses are mastered, and who sees the Self as the Self of all beings is not tainted even while performing natural action or action for the maintenance of the world. Such action does not bind him.`,
      "8": `The knower, joined to karma-yoga and gradually realizing the truth, should think, “I do nothing,” even while seeing, hearing, touching, smelling, eating, walking, sleeping, breathing, speaking, releasing, grasping, opening and closing the eyes. He understands that the senses move among their objects, not that the Self acts.`,
      "9": `This is the same explanation: the operations of seeing, hearing, touching, smelling and eating belong to the organs of knowledge; walking to the feet, sleeping to the inner organ, breathing to prāṇa, speaking to speech, releasing to the lower organs, grasping to the hands, and opening and closing the eyes to the kūrma-vital air. Even while these actions occur, the knower is not stained because he has no doership.`,
      "10": `One who performs actions after placing them in Brahman, the Supreme Lord, and abandoning attachment to their fruits is not stained by the sinful, binding mixture of merit and demerit. He is like a lotus leaf that rests in water yet is not wetted by it.`,
      "11": `For the sake of purification of the mind, yogins perform action with the body, with the mind through decisions of truth, and with the senses engaged in hearing and chanting, while abandoning attachment to the fruit and the sense of being the doer.`,
      "12": `The person devoted exclusively to the Supreme Lord performs action while abandoning its fruit and attains final peace, liberation. The undisciplined, turned outward and acting from desire, becomes attached to the fruit and reaches intense bondage.`,
      "13": `The self-controlled person, with mind restrained and all distracting actions renounced inwardly through discrimination, dwells happily in the city of nine gates—the body with seven openings in the head and two below. Free from “I” and “mine,” he neither acts nor causes action; an impure-minded renouncer, by contrast, returns to action.`,
      "14": `The Lord does not create the individual’s doership, actions, or the connection between actions and their results. The nature of the individual itself—beginningless ignorance and desire—moves him as though he were a doer. The Lord does not manufacture that doership; He merely governs a being whose disposition has arisen from former karma.`,
      "15": `Although the Lord is the governor, He does not take anyone’s sin or merit. He is all-pervading and fulfilled, with no personal desire for which He would make someone act. His seeming favour toward devotees and punishment of others are both forms of grace according to their karma. Ignorance covers the truth that the Lord is equal everywhere, and beings are deluded into imagining partiality.`,
      "16": `The wise do not suffer that delusion. The knowledge of the Self and the Lord destroys their ignorance and reveals the complete form of the Supreme, just as the sun, removing darkness, illumines all objects.`,
      "17": `Those whose intellect is fixed in Him, whose mind is in Him, whose steadfastness is in Him, and whose highest refuge is Him alone have their impurity removed by knowledge gained through His grace. They attain non-return, liberation.`,
      "18": `The wise see the same Brahman in a learned and humble brāhmaṇa, in a cow, an elephant, a dog, and a person regarded as an outcast. Social action and species differ, but the Self seen by knowledge is one and undivided.`,
      "19": `Equality of vision does not make the wise foolish or violate ordinary conduct. While still living, saṃsāra is conquered by those whose mind rests in equality, because Brahman is equal, stainless, and without defect; therefore they are established in Brahman. The fault in treating unlike persons alike belongs only to one who has not yet attained Brahman.`,
      "20": `Having become a knower of Brahman and being established in Brahman, one does not exult on obtaining what is pleasant or become distressed on obtaining what is unpleasant. His intellect is steady because delusion has ceased.`,
      "21": `When the mind is not attached to the external contacts reached by the senses, it finds the inward, sattvic happiness of inner stillness. Having gained that joy and become united with Brahman through samādhi, the person whose Self is Brahman enjoys imperishable happiness.`,
      "22": `Sense-objects are called contacts because the senses touch them. The pleasures born from them are causes of sorrow even while they are present, being filled with rivalry and envy; they have a beginning and an end. Therefore the wise person does not delight in them.`,
      "23": `The impulse born of desire and anger disturbs the mind and the senses. A person who can withstand and restrain it here, at the very moment it arises, and continue to do so until the body falls, is liberated, composed, and happy. Such endurance is required before death, not merely after it.`,
      "24": `Not only does such a person restrain the impulse; the one whose happiness is within, whose play is within, and whose light or vision is within—not in external pleasures—is established in Brahman and attains Brahman-nirvāṇa, absorption in Brahman.`,
      "25": `The sages who see truly, whose sins have been exhausted, whose doubts have been cut, whose minds and bodies are controlled, and who are devoted to the welfare of all beings attain Brahman-nirvāṇa, liberation.`,
      "26": `For ascetics free from desire and anger, with controlled minds and knowledge of the Self, Brahman-nirvāṇa is not only a post-mortem attainment. It belongs to them while they are still alive; they are liberated here and now.`,
      "27": `The yogi withdraws the external contacts—forms, tastes and the other objects that enter inward through thought—and keeps them outside. He fixes the gaze between the brows, with the eyes not entirely closed lest sleep arise and not entirely open lest the mind disperse, and restrains the upward and downward movements of prāṇa and apāna by retention or gentle balanced breathing.`,
      "28": `By this method the organs, mind, and intellect are controlled. One whose highest refuge is liberation, whose desire, fear and anger have gone, and who is such a sage is liberated even while living.`,
      "29": `Knowing Me as the enjoyer and protector of the sacrifices and austerities offered by My devotees, as the great Lord of all worlds, and as the friend of every being who helps without self-interest, one attains peace and liberation through My grace.`,
    },
  6: {
      "1": `This chapter expands meditation-yoga. Because premature renunciation alone does not yield liberation even after the mind is purified, the Lord praises karma-yoga: one who performs the duty that must be done without depending on its fruit is a renouncer and a yogi, not one who merely gives up fire-based rites or becomes inactive.`,
      "2": `The renunciation that Scripture praises is to be understood as yoga itself, because both depend on abandoning the intention for the fruits of action. No person who has not renounced that fruit-intention can be a yogi, whether devoted to action or to knowledge; through that renunciation he is both a renouncer and a yogi.`,
      "3": `For one who wishes to rise to knowledge-yoga, action is said to be the means because it purifies the mind. For one who has risen and is established in knowledge, tranquillity—cessation of actions that disturb the mind—is the means to the maturity of that knowledge.`,
      "4": `When a person is no longer attached to sense-objects such as sound or to the actions that obtain them, and when he has made it his nature to abandon all thought-constructs rooted in attachment to enjoyment and action, he is called one who has risen to yoga.`,
      "5": `Therefore, considering that attachment binds and renunciation frees, one should lift oneself from saṃsāra by oneself, with discriminating understanding; one should never degrade oneself. The self withdrawn from attachment is one’s friend and helper; the self sunk in attachment is one’s enemy.`,
      "6": `For one whose embodied mind and its instruments have been conquered, the self is a friend and acts for one’s good. For one whose mind is not conquered, the self behaves like an enemy and causes harm as an enemy would.`,
      "7": `For the person whose mind is conquered and who is serene and free from attraction and other disturbances, the Self alone remains established even amid heat and cold, pleasure and pain, honour and dishonour. Alternatively, the Supreme Self is established in the heart of such a person.`,
      "8": `The person whose mind is satisfied by scriptural knowledge and direct realization, who is unchanged and has conquered the senses, regards a lump of earth, a stone, and gold as equal in the sense that he has no preference between what is to be rejected and what is to be taken. Such a person is established in yoga.`,
      "9": `He is still more distinguished when his understanding is equal toward a well-wisher who naturally wishes him good, a friend who helps through affection, an enemy who seeks to harm, an indifferent person, a mediator between disputants, one who is hateful, a relative, a virtuous person, and an evildoer.`,
      "10": `The yogi should constantly join the mind to the Self in a secluded place, remaining alone and free from association, with mind and body controlled, without desire, and without possessions. This is the complete discipline of one established in yoga.`,
      "11": `In a clean place he should set up his own seat, firm and unmoving, neither too high nor too low, with cloth spread over kuśa grass and a deerskin over the grass and cloth. The order is kuśa below, skin above it, and cloth above the skin.`,
      "12": `Sitting on that seat, he should practise yoga with a one-pointed, undistracted mind. The activity of his mind and senses should be controlled for the purification and tranquillity of the inner organ.`,
      "13": `He should hold the body, head, and neck straight and motionless, from the base to the crown, with firm effort. He should sit with the gaze directed toward the tip of his own nose, meaning with the eyes half closed and not looking in the directions.`,
      "14": `With a peaceful mind, free from fear, established in the vow of celibacy, withdrawing and restraining the mind, he should sit with his thought fixed on Me. I alone am his highest aim; thus joined, he should remain.`,
      "15": `Practising in this way and continually making the mind concentrated and restrained, he attains the peace in which saṃsāra has ceased—the supreme nirvāṇa, the state of abiding in Me.`,
      "16": `Yoga is not possible for one who eats excessively or who abstains from food altogether; nor for one who sleeps excessively or remains constantly awake. Both extremes obstruct samādhi.`,
      "17": `For the person whose eating and recreation are regulated, whose effort in action is measured, and whose sleep and waking are regulated, yoga arises and becomes the remover of sorrow.`,
      "18": `When the completely restrained mind rests steadily in the Self alone and the person becomes free from thirst for every enjoyment here and hereafter, he is said to have attained yoga.`,
      "19": `As a lamp in a windless place does not flicker, so is the controlled mind of a yogi practising yoga directed to the Self: it remains steady, unmoving, and illumines the object of meditation.`,
      "20": `The yoga called samādhi is the cessation of the movements of mind. In that state, through the pure mind, one sees the Self alone, not the body or anything else, and is satisfied in the Self alone, not in sense-objects.`,
      "21": `In that state one knows an unsurpassed, eternal happiness beyond the contact of senses and objects, grasped only by purified understanding. Established there, one does not move away from the true nature of the Self.`,
      "22": `Having gained the Self’s happiness, one considers no other gain greater. Established in it, one is not shaken even by great suffering such as heat, cold, or other intense affliction. This also defines yoga by its result of freedom from unwanted experience.`,
      "23": `Know that state as yoga in which there is separation, even by mere contact, from union with sorrow. Because it has a great fruit, it must be practised with determination born of Scripture and teacher, with a mind free from despondency even when attainment is slow.`,
      "24": `All desires born of thought-construction, together with their latent tendencies, are contrary to yoga and must be abandoned without remainder. The whole group of senses, which spreads outward in every direction, must be firmly restrained by the mind through seeing the defects of objects.`,
      "25": `If the mind is disturbed by former karma-impressions, it should be made still by holding it with firmness and bringing it into the Self. It must be calmed gradually, through the stages of practice, not suddenly; having made it steady, one should cease to think of anything. In the motionless mind the supreme bliss shines by itself.`,
      "26": `The mind is naturally restless. Whenever it goes out toward any object, one should withdraw it from that object and bring it back to steadiness in the Self alone.`,
      "27": `By repeatedly withdrawing the mind, when the quality of passion has become quiet, the yogi’s mind becomes serene and free from impurity. The highest samādhi-happiness comes of itself to this purified yogi who has attained the state of Brahman.`,
      "28": `Always joining the mind to the Self in this way, the yogi whose sins have completely departed through the whole practice easily experiences the contact with Brahman—the direct knowledge that removes ignorance—and enjoys the supreme happiness. He becomes liberated while living.`,
      "29": `With mind concentrated by yoga, the yogi sees the same Brahman everywhere. He sees his own Self, free from the limitation imposed by body and other forms, abiding in every being from Brahmā down to the immovable, and sees all beings as non-different from that Self.`,
      "30": `The person who sees Me, the Supreme Lord, present in every being, and sees every creature in Me, never loses sight of Me and I never become hidden from him. I become directly manifest to him and, looking upon him with grace, bless him.`,
      "31": `The yogi who worships Me as abiding without difference in all beings is not merely a servant of injunctions. Even while living without external action, he remains in Me and is liberated; he does not fall away from Me.`,
      "32": `The yogi who, by comparing others with himself, sees equally everywhere that what is happiness and dear to him is happiness and dear to others, and that his pain is likewise theirs, wishes happiness for all and no one’s suffering. Such a yogi is declared by Me to be the highest.`,
      "33": `Arjuna says: this yoga of seeing equality that You have described seems impossible to maintain steadily for a long time, because it requires the mind to remain free from dissolution and distraction and to abide only in the form of the Self.`,
      "34": `The mind is naturally fickle and turbulent, continually agitating body and senses. It is powerful, difficult to conquer even by careful reasoning, and obstinate because bound by the deep tendencies toward objects. I consider its restraint as hard as restraining wind that is shaking the sky.`,
      "35": `The Lord accepts that the mind is difficult to restrain because of its fickleness. Yet it can be controlled by practice—repeatedly producing the thought of the Supreme Self while abandoning thought of objects—and by dispassion, the withdrawal of thirst for them. Practice checks dissolution; dispassion checks distraction.`,
      "36": `Yoga is difficult to attain for one whose mind is not controlled by this practice and dispassion. But for one whose mind has been brought under control and who makes the required effort by those very means, yoga can be attained.`,
      "37": `Arjuna asks about a person who entered yoga with faith rather than hypocrisy, but whose effort later became slack and whose mind was carried toward objects by weak dispassion. Failing to obtain the full result of yoga and knowledge, what destiny does he reach?`,
      "38": `Because he dedicated actions to the Lord and therefore does not obtain their ordinary fruit such as heaven, yet does not attain liberation because yoga remained incomplete, has he fallen from both and become without support on the path to Brahman? Is he like a cloud separated from one cloud and unable to join another, dissolving in the middle?`,
      "39": `Only You, who are omniscient, can remove this doubt for me. There is no one other than You who can cut and dispel it completely.`,
      "40": `The Lord replies: in this world there is no downfall for him in the form of losing both aims, nor in the next world in the form of a bad rebirth or hell. A person who does good can never go to an evil destination; this person entered yoga with faith and is therefore a doer of good.`,
      "41": `After reaching the worlds obtained by performers of merit, such as those who perform great sacrifices, and dwelling there for many years enjoying the happiness of residence, the fallen yogi is born in the home of pure, righteous, and prosperous people.`,
      "42": `Or, if the yoga had been practised for a long time, he is born in the family of wise yogins who are established in knowledge. This birth is rarer than the former and is praised because it directly supports liberation.`,
      "43": `In either kind of new birth he regains the connection with the understanding formed in his previous body. From that foundation he strives again, with greater effort, for complete perfection and liberation.`,
      "44": `Because of the practice made in the former body, he is drawn back even against his will, turned away from objects and toward Brahman. A mere seeker of the nature of yoga, even one who has only entered the path and later fallen through sin, surpasses the fruits of the Vedic ritual path and reaches a higher result.`,
      "45": `If even a yogi of modest effort reaches the highest goal in this way, what need is there to speak of one who strives increasingly? Purified of sin through yoga and perfected by practice accumulated over many births, he reaches the supreme state.`,
      "46": `Therefore the yogi is considered superior to ascetics devoted to austerities such as the kṛcchra and cāndrāyaṇa, superior to learned ritualists and scholars, and superior to performers of prescribed and optional works. Become a yogi.`,
      "47": `Among yogins, the best is the devotee who, with inner self absorbed in Me, worships Me, the Supreme Lord Vāsudeva, with faith. Therefore become My devotee; such a yogi is most dear and highest in My view.`,
    },
  7: {
      "1": `At the end of the previous chapter the Lord said that the devotee whose inner self is absorbed in Him is the most united. Arjuna asks what kind of Lord is to be worshipped. The Lord says: with the mind attached to Me, taking refuge in Me alone, and practising yoga, hear how you will know Me completely, together with My powers and majesty, without doubt.`,
      "2": `I shall teach you knowledge—what Scripture teaches—and realization, direct experience, together with it, concerning Me in full. Knowing this, a person travelling the path of the good has nothing further left to know; through this knowledge he becomes fulfilled.`,
      "3": `Among innumerable living beings, those other than human beings generally do not even undertake the pursuit of the good. Among thousands of human beings, only one, through exceptional merit, strives for perfection and Self-knowledge. Among thousands of those who strive, scarcely one truly knows Me, the Supreme Self, by My grace. Therefore My knowledge is exceedingly rare.`,
      "4": `My lower nature, the power called māyā, is divided eightfold: earth and the other subtle elements, together with mind, intellect, and ego. In another formulation, the five gross elements with their subtle causes, ego with its sense-organs, the great principle, and the unmanifest are included in these eight divisions; the twenty-four principles are being gathered into eight.`,
      "5": `Know a higher nature different from this lower, inert and existing for another’s sake: it is the living Self, the conscious knower of the field. Through this conscious nature the whole universe is sustained.`,
      "6": `Understand that all beings, moving and unmoving, have these two natures as their causes. Inert nature becomes their bodies, while the conscious nature, a portion of Me, enters as enjoyer and sustains them according to its karma. These two natures arise from Me; I am therefore the source from which the entire universe proceeds and the power in which it dissolves.`,
      "7": `There is no cause higher or more independent than Me for the creation and dissolution of the universe. I am also its cause of continuance. All this world is strung on Me, its support, as pearls are strung on a thread.`,
      "8": `I am the essence in water, and I abide in water through the glory that is the subtle essence of taste. I am the radiance of the moon and sun, the syllable Om in all the Vedas, the subtle sound in space, and the human power of effort; human beings stand by that endeavour.`,
      "9": `I am the pure, unmodified fragrance in earth, or the excellent fragrance that supports the earth; I am the radiance in fire, the life that maintains the existence of all beings, and the austerity of ascetics such as forest-dwellers, expressed as endurance of the dualities.`,
      "10": `Know Me as the eternal seed—the capacity to produce successive effects of the same kind—in all moving and unmoving beings, continuing through every generation. I am the intelligence of the intelligent and the brilliance and courage of the brilliant.`,
      "11": `I am the strength of the strong when it is free from desire for what is not obtained and from attachment to what is obtained. I am the desire in beings that is not opposed to dharma, the desire in one’s own marriage that serves only the righteous generation of children.`,
      "12": `Whatever states arise in beings—sattvic tranquillity and self-control, rajasic hatred and pride, or tamasic grief and delusion—know them all as arising from Me, because they are effects of My threefold nature. Even so, I am not dependent on them as a living being is; they depend on Me.`,
      "13": `This whole world is deluded by the threefold states of nature, the transformations such as desire and greed described above, and therefore does not know Me, who am beyond them, untouched by them, and their imperishable controller.`,
      "14": `My divine māyā, made of the qualities of nature, is difficult to cross; this is well known. Yet those who take refuge in Me alone, with unwavering devotion, cross this difficult māyā and thereafter know Me.`,
      "15": `The lowest among human beings do not take refuge in Me. They are deluded and without discrimination, sinful in their conduct; their knowledge, even if produced by Scripture and teacher, has been stolen by māyā. Having adopted the demonic disposition—hypocrisy, pride, anger and harshness—they do not worship Me.`,
      "16": `Those who have accumulated merit in former births worship Me in four ways. The distressed person, afflicted by disease and the like, seeks Me; the seeker of knowledge desires Self-knowledge; the seeker of wealth wants objects that produce enjoyment here or hereafter; and the wise person knows the Self.`,
      "17": `Among these the wise person is distinguished: he is constantly united with Me and has single-pointed devotion to Me. Because he is free from body-identification and mental distraction, he can remain ever united and devoted. Therefore I am exceedingly dear to him and he is dear to Me.`,
      "18": `Do not think that the other three devotees are lost in saṃsāra. All four are noble and are destined for liberation. Yet the wise person is My very Self in the sense that he is wholly single-minded; he has taken refuge in Me alone and considers no fruit apart from Me. Thus he is the highest.`,
      "19": `After many births, through the gradual accumulation of merit, a person becomes wise and in his final birth surrenders to Me, seeing with the vision of the Self that all this moving and unmoving world is Vāsudeva alone. Such a great soul, with an unbounded vision, is exceedingly rare.`,
      "20": `Those whose discrimination has been carried away by desires—such as a child, fame, or victory over an enemy—worship other, limited deities. Taking up the particular rules of fasting and worship for each deity, they become governed by their own nature and former tendencies.`,
      "21": `Whatever devotee wishes to worship whatever divine form, which is in truth one of My forms, I, the indwelling ruler, make his faith in that form firm and unwavering. I establish the faith by which he approaches that chosen form.`,
      "22": `With that firm faith he worships the chosen form and obtains from that deity the desires he has conceived. In truth I alone, as the inner ruler and giver, have appointed and produced those results; the deities too depend on Me and are My forms.`,
      "23": `The results granted to those of limited understanding are finite and perishable. Those who worship the gods reach the gods and the limited worlds associated with them; My devotees, however, reach Me, the beginningless and endless supreme bliss.`,
      "24": `People of small understanding think that I, who am beyond manifestation, have now become manifest in a human, fish, tortoise, or other form. They do not know My supreme nature, which is eternal and imperishable, and regard My divinely manifested forms as ordinary material bodies; therefore they prefer deities that give quick fruit.`,
      "25": `I am not manifest to everyone, but only to My devotees, because I am veiled by My own yogamāyā—an inconceivable power that can conceal and reveal. Deluded by it, this world does not know Me, the unborn and imperishable Lord.`,
      "26": `I know all beings that have passed away, that exist now, and that will exist—moving and unmoving—because māyā cannot delude its own support. But no one knows Me, because beings are deluded by My māyā; this is the unequalled power of māyā to bewilder others while remaining dependent on Me.`,
      "27": `At the creation of embodied beings, desire toward the agreeable and aversion toward the disagreeable arise from contact with dualities such as heat and cold, pleasure and pain. Through the delusion produced by these, every being becomes firmly convinced, “I am happy” or “I am suffering,” and therefore does not know Me.`,
      "28": `But those whose accumulated sins have come to an end through meritorious conduct, who are free from the delusion caused by the dualities, and who are steadfast in a single vow, worship Me.`,
      "29": `Those who take refuge in Me and strive to overcome old age and death know the supreme Brahman, the complete inner Self beyond the body, and the whole of karma with its secret meaning—the means by which that Self is attained.`,
      "30": `Those who worship Me with concentrated minds know Me together with the presiding powers of the elements and gods and with the indwelling sacrifice. Even at the time of departure from the body they remain attached to Me and know Me; they do not become confused and forget Me at death. Thus there is no danger of their falling from yoga.`,
    },
  8: {
      "1": `At the end of the previous chapter seven subjects were mentioned—Brahman, the individual Self, karma, the elements, the gods, and sacrifice. Arjuna asks: what is Brahman, what is the individual Self and karma, what are the presiding element and deity, and how are these to be understood?`,
      "2": `He also asks who is the presiding deity of the sacrifice that occurs in this body, how that presiding Lord remains established in the body and directs the sacrifice, and by what means He is to be known by concentrated persons at the time of death.`,
      "3": `The Imperishable is that which does not perish or move; the supreme Imperishable, the root cause of the worlds, is Brahman. The individual Self, a portion of Brahman appearing as the enjoyer in a body, is called adhyātma, its own nature. The offering or sacrifice that causes the origination, growth, and production of beings is called karma; all actions are included under this name.`,
      "4": `The perishing condition of the body and other things, which exists in relation to beings, is called adhibhūta. The cosmic Person situated in the sun and presiding over the deities is called adhidaiva. I Myself, abiding within this body as the inner ruler, the presiding deity of sacrifice, the mover of action, and the giver of its fruit, am adhiyajña. The two birds in one tree illustrate the enjoyer and the witnessing inner ruler.`,
      "5": `The way to know Me at the end of life and its fruit are now taught: remembering Me, the inner ruler and Supreme Lord described above, when he leaves the body, the person travels by the luminous path and attains My state. Remembrance is the means, and attainment of My nature is the result.`,
      "6": `It is not only one who remembers Me who attains Me. Whatever state—another deity or any other being—a person remembers while leaving the body, that very state he reaches. The reason is that his mind has been shaped and perfumed by the constant contemplation of that state throughout life.`,
      "7": `Since the previous tendency alone gives rise to the memory at the helpless moment of death, remember Me at all times and fight. Constant remembrance requires a purified mind, so perform your own duty, such as battle, for purification. With mind and decisive understanding offered to Me, you will attain Me without doubt.`,
      "8": `Constant remembrance is the practice of a continuous stream of similar thoughts, and is the inner means to remembrance at death. United with that one-pointed yoga, whose mind has no tendency to go to another object, meditate on the supreme, radiant Person; O Pārtha, he reaches that Person alone.`,
      "9": `Meditate on the Person as omniscient, the maker of all knowledge, ancient and beginningless, the ruler and controller, subtler than the subtlest, more subtle than space, time, and directions, the sustainer and nourisher of all, of inconceivable form because of immeasurable majesty, beyond the reach of impure mind and intellect, self-luminous like the sun, and beyond darkness and primordial nature.`,
      "10": `At the time of death, the devotee who remembers this Person with an unwavering, undistracted mind, and who places the prāṇa by the power of yoga in the channel between the brows through the suṣumṇā, reaches that supreme, divine Person.`,
      "11": `The Imperishable of which the knowers of Vedānta speak, which desireless ascetics enter, and which those desiring it practise celibacy to attain, is that supreme goal. I shall explain it to you briefly and teach the means by which it is attained.`,
      "12": `The means is performed with its limbs: restraining all the gates of the senses, withdrawing from external objects; holding the mind in the heart, so that it does not remember those objects; placing the prāṇa at the crown or between the brows; and becoming established in the steadiness of yoga.`,
      "13": `Uttering the one syllable Om, which denotes Brahman or serves as Brahman’s symbol, and remembering Me, whose nature it denotes, the person who leaves the body reaches the supreme state—travelling by the luminous path to Me.`,
      "14": `Thus attainment at death by such concentration results from constant practice, not from someone who has never practised. The one-pointed person whose mind has no other object and who remembers Me continuously, every day and at every moment, finds Me easy to attain; not another.`,
      "15": `The great souls who attain Me—My devotees of the described kind—do not again obtain birth, which is impermanent and the abode of suffering. Having attained Me they have obtained the highest perfection, liberation, and do not return.`,
      "16": `All worlds, extending up to Brahmā’s world, are subject to return, because even Brahmā’s world is perishable. Those who reach Brahmā-loka through graded meditation return unless knowledge arises there with Brahmā at the end of his life. Those who attain Me do not return at all.`,
      "17": `Those who know the day and night of Brahmā know that Brahmā’s day extends for a thousand four-age cycles and his night for the same. The teaching uses “Brahmā” also to indicate the residents of higher worlds. The full calculation proceeds from human days and divine years through the four yugas, a thousand of which make Brahmā’s day and an equal period his night.`,
      "18": `At the coming of Brahmā’s day, beings become manifest from the unmanifest causal state; at the coming of night, they dissolve again into that same state. The unmanifest here is the causal form of the world from which the moving and unmoving beings emerge.`,
      "19": `The same multitude of beings that existed before becomes manifest again at the day’s beginning and dissolves at night; at the next day it arises again, helpless and subject to its karma. It is not a new group of beings, so there is no destruction of action or arrival of an unearned result.`,
      "20": `Beyond that unmanifest causal state, which is the source of the moving and unmoving world, is another unmanifest reality, different from it, eternal and beginningless. Even when all effects and causes perish, this imperishable reality does not perish.`,
      "21": `That unmanifest, imperishable reality is declared by the Upaniṣads to be the supreme goal. It is the state to be reached, and having reached it one does not return. It is My own nature; therefore I Myself am the supreme goal.`,
      "22": `That supreme Person, in whom all beings abide and by whom the whole universe is pervaded, is attained only by exclusive devotion, in which no other refuge is taken. He is the inner cause of all beings and the support of all.`,
      "23": `The Lord now explains the two ways: by which route and at which time yogins who depart do not return, and by which route those who depart return. “Time” here means the path marked by deities who preside over fire, day and the other stages, not merely a clock-time.`,
      "24": `The non-returning path is marked by fire and light, the presiding deities of the bright period, day, the bright fortnight, and the six months of the sun’s northern course, together with the further stages of year and divine worlds. The devotees of Brahman who depart by this path reach Brahman. Those established in direct knowledge have no journey at all, since their prāṇas do not depart.`,
      "25": `The returning path is marked by smoke, night, the dark fortnight, and the six months of the sun’s southern course, together with the lunar and ancestral worlds. The ritualist who goes by this path reaches the moon and heaven, enjoys the fruit of sacrifice and charity, and returns after that fruit is exhausted.`,
      "26": `These two paths are regarded as eternal routes of the world: the bright, made of light, leads the qualified person to liberation and the dark, made of smoke, leads to return. They correspond to the paths of knowledge and action; the beginningless saṃsāra gives them their permanence.`,
      "27": `Knowing these two routes, the yogi is not deluded. He does not desire heaven and its finite result with the thought “it is pleasant,” but remains established in the Supreme Lord and seeks the highest state.`,
      "28": `Knowing the truth taught through these eight questions, the yogi surpasses the merit promised by Vedic study, sacrifices, austerities, and gifts. Becoming a knower and a yogi, he obtains a power greater than all those fruits and reaches the supreme, primal abode of Viṣṇu, the root of the universe.`,
    },
  9: {
      "1": `After teaching in the seventh and eighth chapters that the Lord’s nature is easily reached by devotion, the Lord now unfolds His inconceivable majesty and the extraordinary power of devotion. He will teach you, who do not find fault with the teaching, knowledge concerning Me together with direct realization; knowing it, you will be freed immediately from the inauspicious course of saṃsāra.`,
      "2": `This knowledge is the king of sciences and the king of secrets: the highest among knowledges and the deepest among what is hidden. It is supremely purifying, directly experienced by the wise, in accordance with dharma, easy to practise, and imperishable because its fruit does not decay.`,
      "3": `Those without faith do not accept this dharma of knowledge joined with devotion. Even if they make other efforts to reach Me, they do not attain Me; they continue to wander on the death-filled path of saṃsāra.`,
      "4": `With an unmanifest, beyond-the-senses form, I pervade this entire universe as its causal ground. Therefore all moving and unmoving beings abide in Me. Yet, as space is unattached, I am not established in those beings as though limited by them.`,
      "5": `Nor, because of My non-attachment, are the beings truly located in Me in the ordinary sense. See My extraordinary divine yoga, the inconceivable skill of My māyā: I support and nourish all beings and am their cause, yet My supreme Self is not confined in them. I am both their bearer and their source of protection without egoistic involvement.`,
      "6": `Know the non-contact of support and supported through this example: air, vast and moving everywhere, rests in space because it cannot exist without space, yet it does not become joined to space, which is without parts. In the same way all beings rest in Me without limiting or touching Me.`,
      "7": `At the end of a cosmic cycle all beings enter My nature, the three-guṇa māyā, and dissolve there. At the beginning of the next cycle I send them forth again. Thus My non-attached power is both the support of their continuance and the cause of their dissolution.`,
      "8": `Taking hold of My own nature, which is under My control, I repeatedly bring forth this entire fourfold multitude of beings, now dissolved in the causal state, under the compulsion of their former actions and the tendencies produced by them. “I create” means I make them manifest again in diverse forms according to karma.`,
      "9": `These works of creation, maintenance and dissolution do not bind Me, because attachment to action is the cause of bondage and I am fulfilled, without desire for their fruits. I remain like an indifferent witness; as one truly indifferent cannot be an egoistic doer, My action does not make Me bound.`,
      "10": `Under My supervision and by My mere presence, nature gives birth to the moving and unmoving universe. The world revolves and is born again and again under that governance. My being the ruler by proximity is not opposed to My being without egoistic doership.`,
      "11": `Fools who do not know My supreme nature as the Lord of all beings disregard Me when I assume a human-looking body, even though that body is made of pure sattva and assumed out of love for devotees. Their ignorance makes them despise the Supreme Lord.`,
      "12": `Their hopes are vain because they expect another deity to give quick fruit; their actions are vain because they turn away from Me; and their scriptural learning is vain because it rests on many false arguments. Their minds are scattered, for they have taken refuge in demonic and tamasic, violent, desire-filled natures that destroy discrimination.`,
      "13": `Great souls whose minds are not overcome by desire and the other faults take refuge in the divine nature—purity, fearlessness and the rest. Knowing Me as the imperishable cause and source of the universe, they worship Me alone.`,
      "14": `Some worship Me continually by praising Me with hymns and mantras; some keep firm vows and strive in worship, sense-control and other disciplines; others repeatedly bow down to Me. All remain ever united with Me through devotion and attentive remembrance.`,
      "15": `Others worship Me through the sacrifice of knowledge, seeing “Vāsudeva is all” and recognizing My all-Self nature. Some worship Me as one without a second—the single supreme Brahman; some with difference, thinking “I am His servant”; and some worship My all-faced, universal form in many forms such as Brahmā and Rudra.`,
      "16": `I am the Vedic sacrifice such as Agniṣṭoma, the Smārta fivefold sacrifice, the offering called svadhā to the ancestors, the food or medicine produced by plants, the sacrificial mantra, the clarified butter used for offering, the fire, and the act of offering. All these are My forms.`,
      "17": `I am the father, mother, sustainer and grandsire of the world; the giver of the fruits of action, the object to be known, and the purifier or expiation. I am the syllable Om and the Vedas such as Ṛg, Yajur and Sāma. Nothing in this range is separate from Me.`,
      "18": `I am the goal to be reached, the fruit, the sustainer and nourisher, the Lord and controller, the witness of good and evil, the dwelling and experience, the refuge and protector, and the selfless friend. I am the origin, from which beings arise, and the dissolution in which they cease, the support and substratum, the resting-place into which they are deposited, and the imperishable seed and cause.`,
      "19": `As the sun I heat the world during drought; in the rainy season I release rain and at times withhold it. I am immortality, the life that continues, and death, its cessation; I am the manifest gross reality and the unmanifest subtle reality. All these are My forms.`,
      "20": `Those who know the three Vedas, devoted to the rituals prescribed in them, worship Me in the form of the gods and drink soma. Though they do not understand that the gods are My forms, they worship Me through those forms, become purified of sin, and seek the heaven of Indra; they obtain the celestial enjoyments there.`,
      "21": `After enjoying that vast heaven, when the merit producing those pleasures is exhausted, they enter the mortal world again. Following the dharma prescribed by the three Vedas and desiring enjoyments, they repeatedly undergo coming and going.`,
      "22": `But those who have no other desired object or deity besides Me, who think of Me and serve Me, are ever devoted solely to Me. I Myself bring them what they lack—such as wealth—and preserve what they have; I also lead them to liberation, even if they did not separately ask for it.`,
      "23": `It is true that those who, with faith, worship other gods are also in reality worshipping Me, because the other gods are My forms. Yet they worship without the proper understanding of the method that leads to liberation; therefore they return to saṃsāra rather than reaching Me.`,
      "24": `I alone am the enjoyer and Lord of all sacrifices performed through the forms of the various gods, and I alone am their giver of results. Those who do not know Me as the inner ruler in all the gods fail to reach the proper result and fall back into return; those who see Me there do not return.`,
      "25": `Those who vow to the gods reach the gods and therefore return, since the gods and their worlds are finite. Those devoted to the ancestors reach the ancestors; those who worship beings such as the gaṇas and minor spirits reach them; but those who worship Me reach imperishable Nārāyaṇa, the supreme bliss.`,
      "26": `My devotee need not perform a costly sacrifice. If one with a purified mind and desireless devotion offers Me even a leaf, a flower, a fruit, or water, I accept and enjoy it through love. I am not pleased by wealth-demanding rituals, but by devotion alone; the small offering is accepted for the devotee’s blessing.`,
      "27": `Whatever action you naturally or scripturally perform, whatever you eat, whatever you offer into fire, whatever you give, and whatever austerity you undertake—do all of it as an offering to Me. Let every part of life be dedicated to Me.`,
      "28": `Doing this, you will be freed from the bonds of action and from their auspicious and inauspicious fruits. With mind joined to Me by this renunciation-yoga—renunciation consisting in offering all actions to Me—you will be liberated from the relation to their fruits and will attain Me.`,
      "29": `I am equal toward all beings; no one is inherently dear or hateful to Me. Yet those who worship Me abide in Me, and I abide in them as their benefactor. This partiality is not an injustice, just as fire removes cold for those who approach it; it is the glory of devotion.`,
      "30": `Even if a person of extremely bad conduct worships Me alone, understanding that all other deities are also Vāsudeva and refusing to turn elsewhere, he should be regarded as saintly. His resolve is rightly directed: by worshipping the Supreme Lord he will become fulfilled.`,
      "31": `Though his former conduct was bad, the devotee quickly becomes righteous in mind and attains lasting peace, the cessation of mental disturbance in the Lord. To remove Arjuna’s doubt, proclaim publicly and fearlessly that My devotee never perishes; those who hear this will abandon their sophistry and take refuge in Me.`,
      "32": `What wonder is there that devotion purifies those who have fallen from good conduct? Even people born in despised conditions, women, vaiśyas occupied with agriculture and trade, and śūdras without Vedic study attain the supreme goal by taking refuge in Me and serving Me.`,
      "33": `How much more certainly do virtuous brāhmaṇas and royal sages attain the supreme goal? Therefore, having obtained this impermanent human body and world, which is without lasting happiness, do not delay seeking pleasure in transient things; worship Me alone.`,
      "34": `Let your mind be fixed in Me, become My devotee and servant, worship Me, and bow down to Me alone. Making Me your highest refuge and uniting your mind with Me in these ways, you will attain Me, the supreme bliss.`,
    },
  10: {
      "1": `The Lord now expands the divine manifestations briefly mentioned in the preceding chapters and explains their necessity for devotion. O mighty-armed one, hear again My supreme words, spoken for your welfare; those who delight in the nectar of My words will be pleased by them.`,
      "2": `Neither the hosts of gods nor the great seers such as Bhṛgu know My glorious manifestation, My appearing through various vibhūtis although I am unborn. I am the beginning and cause of the gods and sages, producing them and directing their understanding; without My grace none can know Me fully.`,
      "3": `One who knows Me as unborn, without a beginning or cause, and as the great Lord of all worlds is undeluded among human beings and is freed from every sin. My being the cause of all is the reason I am beginningless and birthless.`,
      "4": `Intelligence—the skill of discriminating the essential from the non-essential; knowledge of the Self; absence of delusion; patience; truth; control of the outer senses; control of the inner organ; happiness; sorrow; coming into being; disappearance; fear; and fearlessness—all these conditions of beings arise from Me.`,
      "5": `Non-injury, freedom from harming others; equanimity, absence of attraction and aversion; contentment with what is obtained by destiny; austerity of body and the rest; charity of justly earned wealth to a worthy recipient; fame and infamy—these, and their opposites such as stupidity, arise from Me in beings.`,
      "6": `The seven great sages beginning with Bhṛgu and the four ancient sages beginning with Sanaka, together with the Manus beginning with Svāyambhuva, are born from My mind by mere resolve. They possess My power and are My manifestations. From their sons, descendants and students, the various peoples of the world continue to arise.`,
      "7": `One who knows in truth this vibhūti of Mine, seen in the sages and Manus, and this yoga of My lordly power becomes joined to steady, doubt-free knowledge. There is no uncertainty in this.`,
      "8": `I am the source of the entire universe through these manifestations such as Bhṛgu and the other sages; from Me proceeds everything, including intelligence, knowledge, absence of delusion and the other qualities. Knowing this, wise people filled with loving emotion worship Me.`,
      "9": `Their minds are fixed in Me, their lives and senses are dedicated to Me. Teaching one another about Me through reasoned testimony such as Scripture, speaking and singing about Me with understanding, they are continually satisfied by mutual approval and rejoice in Me.`,
      "10": `To those who are constantly joined to Me and worship Me with love, I give the buddhi-yoga, the understanding that is the means by which they reach Me. I give them the right inner method, not merely intellectual information.`,
      "11": `Out of compassion for them I destroy the darkness of saṃsāra born of ignorance. Where does this destruction occur and by what means? Remaining in their inner understanding, I destroy it with the shining lamp of knowledge, the direct realization that illumines the Self.`,
      "12": `Arjuna says: You are the supreme Brahman, the supreme abode and support, and the supreme purifier. You are the eternal Person, divine and self-luminous, the primal God, unborn and all-pervading. This is the truth about You.`,
      "13": `All the seers—Bhṛgu and the others—say this, as do the divine seer Nārada, Asita, Devala, and Vyāsa; and You Yourself directly tell me this about Your own nature.`,
      "14": `Therefore my doubt that what You say might be impossible is gone. I consider everything You tell me—“the gods do not know My manifestation” and the rest—to be true. The gods do not know Your appearance for our blessing, nor do the demons know it as the form that will chastise them.`,
      "15": `Who else could know You? You alone know Yourself, and You know Yourself through Yourself, not through another means. I address You with many names of reverence: Supreme Person, source and Lord of all beings, light of the gods, and Lord of the universe.`,
      "16": `Since You alone know Your divine manifestations and no god or sage can tell them completely, You alone are qualified to describe all those extraordinary manifestations by which You pervade the worlds.`,
      "17": `What are the different forms of Your glory by which I should think of You constantly? Although You may be meditated on through these manifestations, in which kinds of objects should I especially contemplate You?`,
      "18": `Therefore tell me your yoga—the lordly power of omniscience, omnipotence and the rest—and Your vibhūti in detail again. I never become satisfied by hearing Your nectar-like words; the more I hear, the more I wish to hear.`,
      "19": `The Blessed Lord says: I shall describe to you the principal of My divine manifestations, because the detailed extent of My manifestations has no end. I will state only the chief examples.`,
      "20": `I am the Self abiding as the inner ruler in the hearts of all beings. I am the beginning, the middle, and the end of all beings—the cause of their birth, their continued existence, and their dissolution.`,
      "21": `Among the twelve Ādityas I am Viṣṇu; among luminous bodies I am the sun with its all-pervading rays; among the Maruts I am Marīci; and among the stars I am the moon. The names identify the chief or most powerful manifestation in each class.`,
      "22": `Among the Vedas I am the Sāma Veda; among the gods I am Indra, Vāsava; among beings I am consciousness, the power of knowing associated with them.`,
      "23": `Among the Rudras I am Śaṅkara; among yakṣas and rākṣasas I am Kubera, the lord of wealth; among the Vasus I am fire, Pāvaka; and among mountains with peaks I am Meru.`,
      "24": `Among priests I am Bṛhaspati, the chief priest of the gods; among commanders I am Skanda, the commander of the divine army; and among bodies of still water I am the ocean.`,
      "25": `Among great sages I am Bhṛgu; among words I am the one syllable Om; among sacrifices I am the sacrifice of repetition, japa, which is available without great external cost and is foremost among sacrifices.`,
      "26": `Among trees I am the aśvattha; among divine seers I am Nārada; and among perfected sages who have known the truth from birth I am the sage Kapila.`,
      "27": `Among horses I am Uccaiḥśravas, born from the churning of the ocean for nectar; among elephants I am Airāvata, also born from that churning; and among human beings I am the king.`,
      "28": `Among weapons I am the thunderbolt; among cows I am the wish-giving Kāmadhenu; among the causes of procreation I am Kāma, desire that produces beings and is not opposed to Scripture; and among venomous serpents I am Vāsuki.`,
      "29": `Among non-venomous nāgas I am Ananta, Śeṣa; among aquatic beings I am Varuṇa, their king; among ancestors I am Aryaman; and among those who enforce restraint I am Yama.`,
      "30": `Among those who subdue or count I am Time; among beasts I am the lion, the king of animals; and among birds I am Garuḍa.`,
      "31": `Among purifiers and swift-moving things I am the wind; among weapon-bearing heroes I am Rāma, son of Daśaratha, or Paraśurāma; among fish I am the makara; and among rivers I am the Gaṅgā, the Bhāgīrathī.`,
      "32": `Among creations I am the beginning, middle, and end—the origin, continuance, and dissolution of the elements. Among discussions of spiritual knowledge I am the reasoned debate that aims at truth, superior to disputation and destructive wrangling.`,
      "33": `Among letters I am A, the first and most comprehensive, as all speech is expressed through it. Among compounds I am the copulative compound such as Rāma-Kṛṣṇa, in which both members retain their importance. I am inexhaustible, flowing Time; and among dispensers of the fruits of action I am the all-faced Dispenser who gives every result.`,
      "34": `Among destroyers I am all-devouring Death; among future beings I am their arising and prosperity. Among feminine manifestations I am the seven goddesses—fame, prosperity, speech, memory, intelligence, steadfastness, and forgiveness—whose mere presence makes beings worthy of praise.`,
      "35": `Among chants I am the Bṛhat-Sāman, sung in the hymn that glorifies Indra; among metres I am the Gāyatrī, foremost and connected with initiation and the Vedic life; and among seasons I am spring, the flower-bearing season.`,
      "36": `Among deceits I am gambling, the game by which disputants try to outwit one another; among the splendid I am splendour; among conquerors I am victory; among the energetic I am enterprise; and among the sattvic I am sattva itself.`,
      "37": `Among the Vṛṣṇis I am Vāsudeva, the very Lord who teaches this; among the Pāṇḍavas I am Dhanañjaya, Arjuna; among sages I am Vyāsa, who reflects on the meaning of the Veda; and among poets I am Uśanas, Śukra.`,
      "38": `Among those who restrain I am the rod of punishment by which the uncontrolled become controlled; among those seeking victory I am policy, the means such as conciliation; among secrets I am silence, which conceals what should not be exposed; and among the wise I am knowledge of reality.`,
      "39": `Whatever is the seed, the cause from which all beings sprout, that too am I. Without Me no moving or unmoving being could exist at all.`,
      "40": `The extent of My manifestations has no end, so they cannot all be narrated. What has been stated is only a concise, representative account of the principal manifestations.`,
      "41": `Whatever being is endowed with splendour, prosperity, or extraordinary power and quality—whatever object is exceptionally glorious—know it to have arisen from a portion of My majesty and radiance.`,
      "42": `What need have you for this limited knowledge of particular manifestations? Know instead that I stand sustaining and pervading this entire universe with a single portion of My power. Nothing exists apart from Me; the whole universe is held by Me as a small fraction of My glory.`,
    },
  11: {
    "1": "Having declared the glory of the divine manifestations, Hari now showed the universal form to Arjuna who wished to see it. Arjuna says: the teaching on the Self and non-Self given for my grace through the sixth chapter has destroyed my delusion of being the killer and others being killed, because it taught the Self is not an agent.",
    "2": "I have repeatedly heard from scripture that the creation and dissolution of beings arise from You, and I have heard Your imperishable greatness: though You create the universe, direct actions, and grant varied fruits, You remain changeless, impartial and unattached. Thus my delusion that I am the agent has gone.",
    "3": "What You have said about Yourself as Lord of the universe is indeed so; nevertheless, O Supreme Person, I wish to behold Your lordly form endowed with knowledge, sovereignty, power, strength, heroism and splendor.",
    "4": "If You think that this form can be seen by me, then show me Your imperishable Self possessing that form.",
    "5": "Behold My divine, extraordinary forms, countless and of many kinds, colors and shapes.",
    "6": "Behold in My body the Ādityas, Vasus, Rudras, Aśvins and Maruts, and forms never seen before, wondrous and marvelous.",
    "7": "In this body behold the whole universe, with moving and unmoving beings, standing in one place; behold whatever else you wish to see, including the cause and varied states of the world.",
    "8": "With these ordinary eyes you cannot see Me; therefore I give you a divine, knowledge-born eye. Behold My incomparable sovereign yoga.",
    "9": "Having spoken thus, the great Lord of Yoga showed Arjuna the supreme divine form.",
    "10": "It had many mouths and eyes, many wondrous sights, many divine ornaments, and many weapons raised.",
    "11": "It wore divine garlands and garments, was anointed with divine fragrances, was made of every wonder, was luminous, endless, and had faces everywhere.",
    "12": "If the splendor of a thousand suns arose together in the sky, it might somehow resemble the splendor of that great universal form.",
    "13": "Then Arjuna saw the entire universe, divided in many ways, standing together in the body of the God of gods.",
    "14": "Filled with wonder, with hairs standing erect, Dhanañjaya bowed his head to that God, joined his hands, and spoke.",
    "15": "O God, in Your body I see all gods, all classes of beings, divine sages, serpents, and Brahmā seated on the lotus.",
    "16": "I see You with countless arms and infinite forms, everywhere; I see neither Your end, middle, nor beginning, because You are all-pervading.",
    "17": "I see You crowned, bearing mace and discus, shining on every side like a mass of light, hard to behold like the radiance of sun and fire, immeasurable.",
    "18": "You alone are the imperishable supreme Brahman, the object to be known; You are the supreme support of this universe, the imperishable guardian of the eternal dharma and the ancient Person.",
    "19": "I see You without beginning, middle or end, with limitless power and arms, moon and sun as eyes, fire in Your mouths, and heating the universe with Your splendor.",
    "20": "The space between heaven and earth and all directions are pervaded by You alone; seeing this wondrous and terrible form, the three worlds are greatly shaken.",
    "21": "The hosts of gods enter You in fear; some, standing apart with folded hands, praise You and pray for protection.",
    "22": "Rudras, Ādityas, Vasus, Sādhyas, Viśvedevas, Aśvins, Maruts, Pitṛs, Gandharvas, Yakṣas, Asuras and Siddhas all behold You in wonder.",
    "23": "Seeing Your vast, mighty form, with many mouths, eyes, arms, thighs, feet, bellies and terrible teeth, all people are terrified, and I too am terrified.",
    "24": "Seeing You touching the sky, blazing, many-colored, with open mouths and wide shining eyes, my inner self is shaken; I find neither courage nor calm.",
    "25": "Seeing Your mouths terrible with tusks like the fire of dissolution, I cannot recognize the directions or find comfort; be gracious, Lord of gods, refuge of the universe.",
    "26": "All the sons of Dhṛtarāṣṭra, with the kings, Bhīṣma, Droṇa and Karṇa, and our chief warriors, enter Your mouths.",
    "27": "They rush into Your frightful, tusked mouths; some are seen caught between Your teeth with their heads crushed.",
    "28": "As many rivers flow toward and enter the ocean, so these heroes of the human world enter Your blazing mouths.",
    "29": "As moths rush into a blazing fire for destruction, so these people too enter Your mouths.",
    "30": "You lick up and devour all the worlds on every side with blazing mouths; Your fierce radiances scorch the whole universe.",
    "31": "Tell me who You are in this fierce form. I bow to You; be gracious, O best of gods. I wish to know You, the Primal Person, and do not understand Your activity.",
    "32": "I am mighty Time, destroyer of worlds, arisen to annihilate these people. Even without you, none of the warriors arrayed in the opposing armies will survive.",
    "33": "Therefore arise, win glory, conquer the enemies and enjoy a prosperous kingdom; they are already slain by Me, and you be merely the instrument, O left-handed archer.",
    "34": "Slay Droṇa, Bhīṣma, Jayadratha, Karṇa and the other warriors already killed by Me; do not grieve. You will certainly conquer your enemies in battle.",
    "35": "Hearing Kṛṣṇa's three preceding verses, trembling, crowned Arjuna bowed to Kṛṣṇa with joined hands and spoke in a voice choked with emotion, bowing again in fear.",
    "36": "It is fitting that the world rejoices and becomes attached at Your praise, that the demons flee in fear, and that all hosts of perfected beings bow.",
    "37": "Why would they not bow to You, O Great Self, Infinite, Lord of gods and abode of the universe, greater than Brahmā, the primal creator? You are the imperishable cause beyond being and non-being.",
    "38": "You are the primal God, the ancient Person, the supreme refuge of this universe, knower and object of knowledge, and supreme abode; by You this universe is pervaded.",
    "39": "You are Vāyu, Yama, Agni, Varuṇa, the Moon, Prajāpati and the great-grandfather; salutations to You a thousand times and again.",
    "40": "Salutations before and behind You, on every side; You are of infinite might and immeasurable valor, pervading everything within and without, and thus You are all.",
    "41": "Thinking of You as a friend, I rashly addressed You as Kṛṣṇa, Yādava, friend; forgive whatever I said through carelessness or affection, not knowing Your greatness and this universal form.",
    "42": "Whatever disrespect I showed in play, while alone or before friends, I ask You, the immeasurable One, to forgive all those offenses.",
    "43": "You are the father of this moving and unmoving world, its venerable teacher and most worthy of worship; there is none equal to You in the three worlds, much less greater.",
    "44": "Therefore I bow down and seek Your grace, O Lord of the universe worthy of praise; forgive me as a father forgives a son, a friend a friend, and a beloved one the beloved.",
    "45": "Seeing what was never seen before I rejoice, yet my mind is shaken with fear; therefore show me again that form, O Lord of gods and abode of the universe, and be gracious.",
    "46": "I wish to see You as before, crowned, bearing mace and discus; withdraw this universal form and appear in Your four-armed form.",
    "47": "Do not fear; through My grace I have shown you this supreme, radiant, universal, infinite and primal form, which no one besides a devotee like you has seen.",
    "48": "Neither Vedic study, sacrifice, gifts, rites, nor fierce austerities can make this form seen by another human; you alone have seen it through My grace.",
    "49": "Let no fear or bewilderment remain on seeing this terrible form; freed from fear and with a pleased mind, behold again My familiar form.",
    "50": "Having spoken thus, Vāsudeva again showed Arjuna His former four-armed form and, assuming a gentle body, comforted the terrified one.",
    "51": "Seeing the human form, I have become conscious and have regained my own nature and composure.",
    "52": "This universal form that you have seen is extremely difficult to behold; even the gods always long to see it.",
    "53": "Neither by the Vedas, sacrifices, gifts, rituals, or severe austerities can I be seen in this form as you have seen Me.",
    "54": "By undivided devotion alone can I be known in this way, seen truly, and entered into; not by other means.",
    "55": "He who performs action for Me, takes Me as supreme, is My devotee and refuge, free from attachment and without hatred toward any being, reaches Me."
  },
  12: {
    "1": "Arjuna asks which devotees are more accomplished: those who constantly worship You, the Lord with attributes, or those who worship the imperishable, unmanifest Brahman.",
    "2": "Those who fix their mind on Me, remain constantly united with Me through actions done for Me, and worship Me with supreme faith are considered by Me the most united.",
    "3": "Those who worship the imperishable also reach Me: it is indefinable by words, unmanifest, all-pervading, inconceivable, established in the immutable, motionless and eternal.",
    "4": "They restrain all the senses, are equal toward all beings, and are devoted to the welfare of all; worshiping that imperishable, they attain Me.",
    "5": "For those whose minds cling to the unmanifest, the path is more difficult, because embodied people find it hard to turn constantly inward toward the unmanifest.",
    "6": "Those who dedicate all actions to Me, take Me as supreme, meditate on Me, and worship Me with one-pointed devotion are My devotees.",
    "7": "For those whose minds are fixed in Me, I quickly become the one who lifts them from the ocean of death and worldly existence.",
    "8": "Fix your mind on Me alone and place your decisive understanding in Me; thus, by My grace, after the body ends you will dwell in Me—there is no doubt.",
    "9": "If you cannot steadily fix the mind in Me, seek to reach Me through repeated practice, repeatedly withdrawing the scattered mind and remembering Me.",
    "10": "If you are unable even to practice, become one whose chief purpose is actions done for My pleasure—fasts, vows, sacred recitation and the like; doing these for Me, you will attain liberation.",
    "11": "If you cannot do even this, take refuge in My yoga and relinquish the fruits of all necessary actions, placing their seen and unseen results in My care and abandoning attachment to them.",
    "12": "Knowledge preceded by proper instruction is better than mere practice; meditation is better than such knowledge; and renunciation of the fruits of action is better than meditation, for peace follows immediately from that renunciation.",
    "13": "The devotee who hates no being, is friendly and compassionate, free from possessiveness and ego, equal in pleasure and pain, and forgiving is dear to Me.",
    "14": "Ever content in gain and loss, cheerful, self-controlled, firm in conviction, with mind and intellect offered to Me, that devotee is dear to Me.",
    "15": "One from whom the world does not suffer fear or agitation, who is not agitated by the world, and who is free from natural excitement, resentment, fear and anxiety is dear to Me.",
    "16": "The devotee who is desireless, pure outwardly and inwardly, active, impartial, free from distress, and accustomed to abandon all undertakings is dear to Me.",
    "17": "One who neither rejoices on gaining the pleasant nor hates the unpleasant, neither grieves at loss nor longs for the unattained, and habitually abandons good and evil is dear to Me.",
    "18": "One who is equal toward enemy and friend, honor and dishonor, heat and cold, pleasure and pain, and is free from attachment is dear to Me.",
    "19": "One who is alike in praise and blame, restrained in speech, content with whatever comes, without a fixed dwelling, steady in mind and devoted to Me is dear to Me.",
    "20": "Those devotees who practice this immortal dharma, have faith, take Me as supreme and are devoted to Me are exceedingly dear to Me."
  },

  13: {
    "1": "No commentary.",
    "2": "The promise to lift devotees from worldly existence requires knowledge of the Self. The body, the field of experience, is called the field; one who knows it as 'I' and 'mine' is called the field-knower. The wise distinguish the two.",
    "3": "Know the field-knower in every field to be Myself, the consciousness indicated by 'That thou art.' Knowledge of the difference between field and knower alone is true knowledge and the means of liberation; other learning is mere scholarship.",
    "4": "The field is the inert, visible body with the qualities of desire and the like, its modifications and its arising from the conjunction of nature and person. Hear briefly also the nature, powers and glory of the field-knower.",
    "5": "The field has been described at length by sages, by many Vedic hymns and by the aphorisms of Brahman, with reasoned statements that establish the meaning; I shall now state it briefly.",
    "6": "The field consists of the five great elements, ego, intellect, the unmanifest root nature, the ten external senses, the mind, and the five sense-objects—twenty-four principles.",
    "7": "Desire and the other mental states, the bodily aggregate, consciousness as a mental mode and steadfastness are also included in the field, because they are observed qualities of the mind and body.",
    "8": "Knowledge begins with absence of self-praise, absence of hypocrisy, nonviolence, patience, straightforwardness, service of the teacher, purity both outward and inward, steadfastness on the good path and control of the body.",
    "9": "It includes repeatedly seeing the suffering and defect in birth, death, old age, disease, pain and evil, rather than treating these as desirable.",
    "10": "It includes nonattachment to objects such as children, no excessive identification with their pleasure or pain, and constant equanimity when the pleasant or unpleasant occurs.",
    "11": "It includes one-pointed, unbroken devotion to the Supreme, a habit of living in a pure and solitary place, and dislike for the company of worldly people.",
    "12": "It includes constancy in knowledge of the Self and seeing liberation, the purpose of true knowledge. All contrary qualities such as pride are declared ignorance and are to be abandoned.",
    "13": "I shall explain the knowable, knowing which one attains immortality: the beginningless, unsurpassed Brahman, which is neither being nor non-being and is beyond both as an object of knowledge and negation.",
    "14": "It has hands and feet everywhere, eyes, heads and mouths everywhere, and ears everywhere; pervading everything in the world, it stands as the basis of all activity through the instruments of beings.",
    "15": "It appears in the functions of every sense yet is without any sense; unattached, it supports all; free from the qualities, it nevertheless sustains and experiences their operations.",
    "16": "It is inside and outside all beings, moving and unmoving; because it is subtle it cannot be clearly grasped by the ignorant, and is said to be far, while to the wise it is ever near.",
    "17": "Though undivided as the cause, it appears divided among beings; it sustains them, absorbs them at dissolution, and brings them forth at creation in many forms.",
    "18": "It is the light of lights, beyond darkness, the very knowledge, the object reached by knowledge and the goal of knowledge; it is established in the heart of every being.",
    "19": "Thus the field, knowledge and the knowable have been briefly described. My devotee who understands them in this manner becomes fit for My state, the nature of Brahman.",
    "20": "Know both nature and person to be beginningless. The modifications of body and senses and the qualities such as pleasure, pain and delusion arise from nature.",
    "21": "Nature is called the cause of body, senses and their actions; the person is called the cause of experiencing the pleasure and pain produced by them.",
    "22": "Being seated in nature and identified with its products, the person experiences its qualities; attachment to those qualities becomes the cause of births in good and evil wombs.",
    "23": "The person is also the supreme Self: the witness, the permitter, the supporter, the experiencer, the great Lord and the supreme Self within the body.",
    "24": "Whoever knows person and nature together with their qualities in this way is not born again, whatever conduct that person may outwardly follow; such knowledge gives liberation.",
    "25": "Some behold the Self through meditation; others through the discrimination of the Sāṅkhya; others through the eightfold yoga; and others through karma-yoga. These are distinct approaches to the same Self.",
    "26": "Those unable to realize the Self by these methods hear the teaching from other teachers and meditate upon it with faith; devoted to hearing, they gradually cross beyond death and worldly existence.",
    "27": "Know that whatever being comes into existence, moving or unmoving, arises from the conjunction of the field and the field-knower, produced by their mistaken identification.",
    "28": "The one who sees the same supreme Self dwelling equally in all beings, while the bodies perish, truly sees.",
    "29": "Seeing the same Self everywhere, one does not injure the Self by the self through ignorance, and therefore reaches the highest state.",
    "30": "The one who sees that all actions are performed in every way by nature transformed into body and senses, and that the Self is not an agent, truly sees.",
    "31": "When one sees the separate forms of beings resting in one nature, and their expansion proceeding from that same nature, one attains the complete Brahman and becomes Brahman.",
    "32": "Because the supreme Self is beginningless and without qualities, it is imperishable and changeless; though abiding in the body, it does nothing and is not stained by actions or their fruits.",
    "33": "As all-pervading space, because of its subtlety and detachment, is not stained by the mud or other things it occupies, so the Self in every body is not touched by bodily qualities and defects.",
    "34": "As the one sun illumines the whole world, so the one field-knower illumines the entire field.",
    "35": "Those who know with the eye of discrimination the distinction between the field and the field-knower, and know the means of release from nature, attain the supreme state."
  },

  14: {
    "1": "I shall again teach you the highest knowledge, knowledge among all forms of knowledge; knowing it, sages attained the supreme perfection beyond bodily bondage.",
    "2": "Taking refuge in this knowledge and practicing its means, they attain likeness to Me; they are not born even when Brahmā and the worlds are created, nor are they distressed at dissolution.",
    "3": "The great Brahman, My nature, is the womb into which I place the seed of consciousness; from that union all beings are born.",
    "4": "In every kind of womb, the many moving and unmoving forms have nature as their mother and Me, the giver of the seed and creator of the embryo, as their father.",
    "5": "Sattva, rajas and tamas arise from nature. Though the embodied consciousness is truly imperishable and changeless, these qualities bind it by joining it to pleasure, pain, delusion and their other products.",
    "6": "Sattva, being pure, clear and free from disturbance, binds through attachment to its effects, happiness and knowledge, making the field-knower think, 'I am happy and wise.'",
    "7": "Rajas is passion, born from craving for what is not obtained and attachment to what is obtained; it binds the embodied one strongly to actions through thirst and attachment.",
    "8": "Tamas is born of ignorance and dominated by the covering power of nature; it deludes beings and binds them through negligence, laziness and sleep.",
    "9": "Sattva joins the embodied one to happiness, rajas to action, and tamas, even when knowledge is present, to negligence and laziness.",
    "10": "Sattva arises by overpowering rajas and tamas, rajas by overpowering sattva and tamas, and tamas by overpowering sattva and rajas; each then joins the person to its own effects.",
    "11": "When light in the form of knowledge of sound and the other objects arises through all the senses, know that sattva has become predominant.",
    "12": "When rajas is predominant, greed, constant activity, beginning many undertakings, restlessness of thought and craving for various objects arise.",
    "13": "When tamas is predominant, lack of clarity, inactivity, negligence in one's duties and delusion arise.",
    "14": "If one dies while sattva is predominant, one reaches the pure, luminous worlds of the highest knowers, such as Hiraṇyagarbha.",
    "15": "If one dies while rajas predominates, one is born among people attached to action; if one dies in tamas, one is born in deluded, animal-like wombs.",
    "16": "The fruit of sattvic action is pure, luminous happiness; the fruit of rajasic action is pain; the fruit of tamasic action is ignorance and delusion.",
    "17": "From sattva arises knowledge, from rajas greed, and from tamas negligence, delusion and ignorance; therefore the corresponding fruits follow naturally.",
    "18": "Those established in sattva rise to higher worlds, those dominated by rajas remain in the middle, among human beings, and those established in tamas go downward to lower births and hells.",
    "19": "When the discerning person sees no agent other than the qualities, and knows the Self as different from and beyond the qualities, that person reaches My state, the state of Brahman.",
    "20": "Having crossed these three qualities, which produce the body, and becoming free from birth, old age and the other evils produced by them, one enjoys immortality, the bliss of Brahman.",
    "21": "Arjuna asks by what signs one who has crossed the qualities is recognized, what conduct that person follows, and by what means one transcends all three qualities.",
    "22": "The person beyond the qualities neither hates the effects of sattva, rajas and tamas—light, activity and delusion—when they arise, nor longs for them when they cease.",
    "23": "Remaining like an indifferent witness, that person is not shaken by the qualities or their effects, knowing through discrimination that the qualities alone operate and have no relation to the Self.",
    "24": "Such a person is equal in pleasure and pain, established in the Self, and regards a clod, a stone and gold alike; is equal toward the pleasant and unpleasant, and is wise.",
    "25": "The person is equal in praise and blame, honor and dishonor, friend and enemy, and has abandoned all undertakings; such conduct marks one who has crossed the qualities.",
    "26": "One who serves Me alone with undeviating, one-pointed devotion completely crosses these qualities and becomes fit for the state of Brahman.",
    "27": "I am the foundation and embodied form of Brahman, the imperishable, immortal state, the eternal dharma and the unbroken bliss, because I am of the nature of supreme bliss."
  },

  15: {
    "1": "The Lord is the root of the imperishable Aśvattha tree of worldly existence, with its branches below, extending through the worlds; the Vedas are its leaves. One who knows this tree and its root, Nārāyaṇa, knows the meaning of the Vedas.",
    "2": "Its branches spread below and above through good and evil births, nourished as though by the water of the qualities; sense-objects are its tender shoots, and its secondary roots are the latent desires tied to action in the human world.",
    "3": "Those living in worldly existence do not perceive this tree's form, its end, beginning or firm foundation. Because it is deeply rooted and harmful, it must be cut with the strong sword of detachment, abandoning possessiveness and ego.",
    "4": "After cutting it, one must seek the supreme, imperishable Viṣṇu-state from which those who arrive never return, taking refuge with exclusive devotion in the primal Person from whom this ancient worldly process has spread.",
    "5": "Those free from pride and delusion, who have conquered attachment, are established in knowledge of the Self, free from the pairs that produce pleasure and pain, and no longer deluded, reach that imperishable Viṣṇu-state.",
    "6": "That supreme abode of Mine is not illumined by sun, moon or fire; having reached it, the yogins do not return. Its freedom from ordinary light does not make it inert or subject to cold and heat.",
    "7": "The individual being is eternally an aspect of Myself, but, covered by ignorance, it draws to itself the mind and five senses that rest in nature, and returns to worldly experience.",
    "8": "When the lord of the body obtains another body or leaves one, it takes the senses and mind with it, just as the wind carries subtle scents from their source.",
    "9": "Taking up the ear, skin, eyes, tongue and the other senses together with the mind, the individual enjoys sound and the other sense-objects.",
    "10": "The deluded do not see the individual leaving the body, remaining in it, or enjoying the objects while joined with the senses; those whose eyes are knowledge and discrimination do see.",
    "11": "Some yogins who strive through meditation behold this distinct Self dwelling in the body; even those who study scripture and strive do not see it if their minds remain impure and dull.",
    "12": "The various radiances in the sun, moon, fire and other luminous bodies that illumine the whole universe should be known as My radiance.",
    "13": "Entering the earth and supporting it by My power, I uphold all moving and unmoving beings; becoming the sap-filled Moon, I nourish all plants.",
    "14": "Becoming the digestive fire in the bodies of living beings and joined with the upward and downward breaths, I digest the four kinds of food: chewed, swallowed, licked and sucked.",
    "15": "I am seated in the heart of every being as the inner controller. From Me arise memory, knowledge and their removal; by all the Vedas I alone am to be known, I am the author and knower of Vedānta.",
    "16": "Two persons are known in the world: the perishable, which is all bodies from Brahmā to the immovable, and the imperishable, the changeless conscious witness that remains while bodies perish.",
    "17": "Different from both is the highest Person, the supreme Self, called the imperishable Lord in the scriptures; entering all three worlds, He sustains and rules them.",
    "18": "Because I transcend the perishable inert class and am higher than the imperishable conscious class through My power of control, I am celebrated in the world and the Veda as the Supreme Person.",
    "19": "The undeluded person who knows Me as the Supreme Person in this way worships Me alone in every manner and thereby becomes all-knowing.",
    "20": "Thus I have taught the entire most secret scripture, not merely this chapter. Knowing it properly, the wise person becomes accomplished and fulfills the purpose of life."
  },

  16: {
    "1": "The divine endowment begins with fearlessness, purity of mind, steadfastness in the yoga of Self-knowledge, charity, control of the external senses, sacrifice, study of the Veda, austerity, and straightforwardness.",
    "2": "It includes nonviolence, truthful speech, absence of anger even toward one who strikes, generosity, mental quiet, absence of slander, compassion for the helpless, absence of greed, gentleness, modesty and freedom from useless activity.",
    "3": "It includes vigor, forgiveness that restrains anger after insult, fortitude that steadies the mind in pain, outward and inward purity, absence of hatred and absence of excessive self-importance. These twenty-six qualities belong to one born for the divine endowment.",
    "4": "The demonic endowment consists of hypocrisy, arrogance born of wealth or learning, self-conceit, anger, harshness and ignorance; these qualities characterize those born for demonic nature.",
    "5": "The divine endowment makes one qualified for the knowledge I have taught and leads to liberation; the demonic endowment keeps one in worldly existence. Do not grieve, O Pāṇḍava, for you are born with the divine endowment.",
    "6": "There are two kinds of creation: divine and demonic. Hear from Me the demonic nature in detail so that it may be wholly rejected.",
    "7": "Demonic people do not know the way of action in dharma or the way of withdrawal from adharma; therefore purity, proper conduct and truth are absent in them.",
    "8": "They say the world is unreal, without the authority of Veda or dharma, without a governing Lord, and produced merely from the mutual union of male and female, with desire as its only cause.",
    "9": "Holding this materialist view, their inner selves ruined and minds impure, with little understanding and violent actions, they arise as enemies for the destruction of the world.",
    "10": "Relying on insatiable desire and joined with hypocrisy, they undertake worship of petty deities, clinging through delusion to impure vows and to fanciful claims about gaining great treasures.",
    "11": "They are devoted to immeasurable anxiety ending only at death, regard gratification of desire as the highest human aim, and resolve that nothing beyond this exists while striving to accumulate wealth.",
    "12": "Bound by hundreds of hopes that are nets, dragged in every direction, and making lust and anger their refuge, they seek to amass wealth for the enjoyment of desire through unjust means.",
    "13": "They boast, 'Today I have gained this object; I shall obtain that other desired thing; I possess this much wealth, and I shall acquire more.'",
    "14": "They say, 'That enemy has been killed by me, and I shall kill others too; I am successful, powerful and happy.'",
    "15": "They say, 'I am rich and well-born; I shall perform sacrifices and gain great honor from other initiated people; I shall give and rejoice,' being deluded by ignorance and false identification.",
    "16": "Driven by many desires, with minds scattered and covered by a net of delusion, attached to the enjoyment of desire, they fall into an impure hell.",
    "17": "They are self-honored, stiff and proud of wealth; their sacrifices are performed only for the name of being a sacrificer, with hypocrisy and not faith, and without proper rule.",
    "18": "Taking refuge in ego, power, pride, desire and anger, they hate Me, who dwell as consciousness in their own and others' bodies; they perform hypocritical sacrifices and find fault with the virtues of those on the righteous path.",
    "19": "Those cruel haters of Me I continually cast into worldly births, and even into especially cruel demonic wombs such as those of predators, giving them the corresponding fruit of their sinful actions.",
    "20": "Failing to attain Me and not reaching the righteous path that leads to Me, they repeatedly enter births lower still, among worms and insects, and go to a condition worse than the demonic one.",
    "21": "Desire, anger and greed are the three gates of hell, the causes of one's ruin and of birth in low wombs; therefore one should abandon all three completely.",
    "22": "Freed from these three gates of darkness and hell, a person undertakes actions that produce the welfare of the Self, such as austerity and yoga, and thereby attains liberation.",
    "23": "One who abandons the scriptural rule of dharma and acts merely according to desire does not attain perfection, happiness, peace or the highest goal.",
    "24": "Therefore scripture—Veda, Smṛti and Purāṇa—is your authority for deciding what should and should not be done. Knowing the actions prescribed there, perform the duty appropriate to your qualification."
  },

  17: {
    "1": "Arjuna asks about those who, abandoning the scriptural rule, nevertheless worship with faith: is their standing sattvic, rajasic or tamasic?",
    "2": "Faith is threefold among people who act merely according to custom: sattvic, rajasic and tamasic, born from the impressions of their nature. Those guided by scriptural knowledge have one sattvic faith.",
    "3": "Each person's faith conforms to that person's nature; a person is made of faith. Whatever one's faith is, that person is precisely that.",
    "4": "Sattvic people worship the gods; rajasic people worship Yakṣas and Rākṣasas; tamasic people, unlike both, worship ghosts and hosts of spirits.",
    "5": "Some, lacking scriptural knowledge but following a harsh tradition, perform terrible austerities not prescribed by scripture. They are joined with hypocrisy, ego, desire, attachment and obstinate force; know them as having demonic resolve.",
    "6": "By tormenting the group of elements in the body through needless fasting and similar practices, and by tormenting Me, the inner controller abiding in the body, these undiscerning people perform austerities with demonic resolve.",
    "7": "Food, sacrifice, austerity and charity are each threefold according to their quality. Hear these distinctions so that sattvic forms may be cultivated and rajasic and tamasic forms abandoned.",
    "8": "Foods dear to the sattvic increase life, vitality, strength, health, happiness and satisfaction; they are juicy, nourishing, firm and pleasing.",
    "9": "Foods dear to the rajasic are excessively bitter, sour, salty, hot, pungent, dry or burning; they produce pain, sorrow and disease.",
    "10": "Food dear to the tamasic is stale, tasteless, putrid, long kept, leftover from another's meal or impure and unfit to offer.",
    "11": "A sattvic sacrifice is performed by people without desire for fruit, according to rule, with the settled conviction that the sacrifice itself is their duty.",
    "12": "A sacrifice performed with a desired result in view and for display of one's importance is rajasic.",
    "13": "A sacrifice without scriptural rule, food shared with the participants, mantra, proper gift or faith is declared by the disciplined to be tamasic.",
    "14": "Bodily austerity consists in worship of gods, learned Brahmins and teachers, purity, straightforwardness, celibacy and nonviolence—practices accomplished through the body.",
    "15": "Verbal austerity is speech that causes no agitation, is true, pleasant and beneficial, together with regular study and recitation of the Veda.",
    "16": "Mental austerity is serenity, gentleness, silence in the contemplative sense, control of the mind by withdrawing it from objects, and purity of intention in one's dealings.",
    "17": "The three kinds of austerity, performed by disciplined people with supreme faith, without desire for fruit and with one-pointed minds, are called sattvic.",
    "18": "Austerity performed for honor, praise, social respect or bodily worship, through hypocrisy, is rajasic; it is unstable, uncertain and short-lived.",
    "19": "Austerity undertaken through a foolish, undiscerning obstinacy, by tormenting oneself or for the destruction of another, is declared tamasic.",
    "20": "Sattvic charity is given with the conviction that it ought to be given, to one unable to repay, at the proper place and time and to a worthy person.",
    "21": "Charity given with the expectation that the recipient will repay later, or with a heavenly fruit in view, and given reluctantly with distress, is rajasic.",
    "22": "Charity given in an improper or impure place, at an improper time, to an unworthy person, without respect and with contempt, is tamasic.",
    "23": "Om, Tat and Sat are remembered as the threefold designation of Brahman. By this threefold designation, the Creator originally consecrated the Brahmins, the Vedas and the sacrifices.",
    "24": "Therefore the followers of the Veda utter Om and perform the scripturally prescribed sacrifices and other rites, making them spiritually complete even when some parts are deficient.",
    "25": "Uttering Tat, seekers of liberation perform sacrifices and other actions without directing them toward a fruit; the designation Tat is praised because it removes fruit-intention and purifies the mind.",
    "26": "The word Sat is used for existence and for goodness, and also for an auspicious or praiseworthy action.",
    "27": "Steadfastness in sacrifice, austerity and charity, and every action performed for their sake, is also called Sat; the threefold name should therefore be uttered to make actions good.",
    "28": "Whatever is offered, given or practiced without faith, and every other action done without faith, is called asat; being defective, it bears no fruit in the next world or even honor in this one."
  },

  18: {
    "1": "Arjuna asks, O Hṛṣīkeśa and mighty-armed destroyer of Keśin, for the distinct truth of renunciation of action and relinquishment of the fruits of action.",
    "2": "Śrīdhara explains the Lord’s reply: the wise call the abandonment of works enjoined with desire—such as “let one sacrifice desiring a son” or “desiring heaven”—sannyāsa, giving them up together with their fruits. The discerning call the abandonment of the fruits alone of all desire-motivated, obligatory and occasional works tyāga, not abandoning the works themselves. Though the fruits of obligatory and occasional works are not always stated, the injunctions imply some fruit so that people will undertake them; scripture speaks of results such as meritorious worlds, the ancestral world and the removal of sin. Thus all works are performed for the purpose of seeking knowledge, abandoning their binding fruits. Seeking knowledge means turning the intellect inward through discrimination between the eternal and non-eternal and freedom from bodily identification. Until that knowledge arises, one performs the necessary actions for purification, without attachment to their fruits; this fruit-relinquishment is called renunciation of action, not abandoning the actions in their very form. When knowledge is established, all action ceases naturally. Śrīdhara concludes that desire-motivated works are abandoned in their very form, while obligatory works are relinquished only with respect to their fruits; tyāga means performing all works after abandoning desire for their fruits.",
    "3": "Some discerning Sāṅkhyas say that all action should be abandoned because it contains defects such as injury and causes bondage; others, the Mīmāṃsakas, say that sacrifices and similar actions must not be abandoned.",
    "4": "Hear My settled conclusion about relinquishment in this disputed matter: relinquishment is declared threefold by the knowers of truth—as tamasic, rajasic and sattvic.",
    "5": "Sacrifice, charity and austerity are purifying for the discerning; they cleanse the mind and therefore should not be abandoned.",
    "6": "These actions should be performed as duties, while abandoning attachment and the fruits, solely as worship of the Lord; this is My settled and highest view.",
    "7": "Giving up an obligatory action because it is regarded as troublesome, through delusion, is tamasic relinquishment.",
    "8": "Giving up obligatory action merely because it is painful or laborious and one fears bodily strain is rajasic relinquishment; such a person does not gain the fruit of true renunciation.",
    "9": "Performing an obligatory action because it ought to be done, while abandoning attachment and fruit, is considered sattvic relinquishment.",
    "10": "The sattvic renouncer neither hates an unpleasant duty nor clings to a pleasant one; wise, steady and free from doubt, that person has truly relinquished.",
    "11": "An embodied person cannot abandon every action completely. Therefore the one who performs action while relinquishing its fruits is called the true renouncer.",
    "12": "The non-renouncer receives after death the three fruits of action—unpleasant, pleasant and mixed. The renouncer of fruits receives none of these, because action has been offered to the Lord.",
    "13": "For the accomplishment of every action, learn from Me the five causes that must be known in order to remove the ego's claim to be the sole doer.",
    "14": "They are the body as seat, the ego-bound individual as doer, the many instruments such as the senses, the various efforts of prāṇa and apāna, and the divine cause—the inner controller and powers that aid the senses.",
    "15": "Whatever action a person performs through body, speech or mind, righteous or unrighteous, has these five causes.",
    "16": "Therefore the one who, because of an untrained understanding and disregard of teaching, sees the pure, unattached Self alone as the doer does not see correctly.",
    "17": "One who has no thought 'I am the doer,' whose understanding is not stained by preference for pleasant or unpleasant action, sees the body and its instruments as acting; even killing, from that standpoint, does not kill or bind that person.",
    "18": "Knowledge, the knowable and the knower are the threefold impulse toward action; the instrument, the action and the doer are the threefold basis in which action is gathered.",
    "19": "In the science that analyzes the qualities, knowledge, action and the doer are each described as threefold according to sattva, rajas and tamas.",
    "20": "Sattvic knowledge sees one undivided, imperishable and changeless reality present in all separate beings, from Brahmā to the immovable.",
    "21": "Rajasic knowledge sees in every body many distinct knowers, each as truly separate and experiencing pleasure and pain.",
    "22": "Tamasic knowledge clings without reason to one body, image or object as though it were the whole Self or Lord; it has no sound basis, sees no truth and is narrow in result.",
    "23": "Sattvic action is obligatory, performed without attachment, without attraction or aversion, and by one who does not seek its fruit.",
    "24": "Rajasic action is performed by one who desires its fruit, with egoistic self-display and much strain and exertion.",
    "25": "Tamasic action is begun through delusion, without considering its future consequence, loss, injury to others or one's own capacity.",
    "26": "The sattvic doer is free from attachment and egoistic speech, endowed with firmness and enthusiasm, and unchanged in success or failure.",
    "27": "The rajasic doer is attached, desirous of the fruit, greedy, violent in nature, impure, and subject to joy and sorrow in gain and loss.",
    "28": "The tamasic doer is inattentive, crude, stiff, deceitful, malicious, lazy, habitually sorrowful and procrastinating—unable to finish today's or tomorrow's work even in a month.",
    "29": "Now hear the threefold distinctions of understanding and steadfastness, by which the various kinds of knowledge, action and doer are understood.",
    "30": "Sattvic understanding knows what is dharma and adharma, what should be done and not done, what is fear and fearlessness, and what produces bondage and liberation.",
    "31": "Rajasic understanding knows these matters incorrectly and doubtfully, without grasping their proper distinction.",
    "32": "Tamasic understanding takes adharma for dharma and sees all things perversely, covered by darkness.",
    "33": "Sattvic steadfastness is unwavering concentration through yoga, by which one holds and restrains the activities of mind, breath and senses without turning to other objects.",
    "34": "Rajasic steadfastness holds fast to dharma, wealth and desire, and remains attached to them while seeking their fruits.",
    "35": "Tamasic steadfastness is the persistence of a dull person who does not release sleep, fear, grief, depression and delusion, repeatedly returning to them.",
    "36": "Happiness too is threefold. Sattvic happiness is that in which one delights through practice and by which one reaches the end of sorrow.",
    "37": "It is at first like poison because it depends on mastery of the mind, but at the end is like nectar; born from the clarity of the understanding of the Self, it is called sattvic by yogins.",
    "38": "Rajasic happiness, such as that arising from contact between senses and objects, seems like nectar at first but is like poison in the end, producing suffering here and hereafter.",
    "39": "Tamasic happiness is delusive both at first and afterward; it arises from sleep, laziness and negligence, the mind's failure to attend to what should be done.",
    "40": "There is no being on earth or among the gods in heaven that is free from these three qualities born of nature.",
    "41": "The duties of Brahmins, Kṣatriyas, Vaiśyas and Śūdras are divided according to the qualities born of their nature: sattva-dominant Brahmins, sattva with rajas Kṣatriyas, tamas with rajas Vaiśyas, and rajas with tamas Śūdras.",
    "42": "The natural duties of a Brahmin are tranquility, control of the external senses, austerity, purity, patience, straightforwardness, scriptural knowledge, realized wisdom and faith in the unseen.",
    "43": "The natural duties of a Kṣatriya are bravery, vigor, firmness, skill, not fleeing from battle, generosity and the power to govern.",
    "44": "The natural duties of a Vaiśya are farming, protecting cows and trade; the natural duty of a Śūdra is service of the three higher classes.",
    "45": "A person devoted to the duty appropriate to that person's own qualification attains perfection, becoming fit for knowledge. Hear how a person devoted to one's own work gains truth.",
    "46": "Worshiping through one's own work the Lord from whom the activity of beings arises and by whom this entire universe is pervaded, a person attains perfection.",
    "47": "Even if imperfect, one's own duty is better than another's duty performed well. Performing the work assigned by one's nature, one does not incur sin.",
    "48": "One should not abandon natural duty even if it has defects, for every undertaking is covered by some defect, just as fire is covered by smoke. One should use its beneficial aspect for purification.",
    "49": "With unattached understanding, self-control, no ego and no desire for fruit, a person reaches the perfection of actionlessness through the renunciation of attachment and results.",
    "50": "Having attained this perfection of actionlessness, learn briefly from Me the way by which one reaches Brahman and becomes established in Brahman.",
    "51": "Endowed with purified sattvic understanding and steadfastness, making the understanding firm, abandoning sense-objects and the attraction and aversion directed toward them, one becomes fit for Brahman.",
    "52": "Living in solitude, eating lightly, controlling speech, body and mind, constantly devoted to meditation and repeatedly taking firm refuge in dispassion, one proceeds toward Brahman.",
    "53": "Having abandoned ego, force, pride, desire, anger and possessiveness, and becoming peaceful and free from 'mine,' a person becomes fit to stand immovably as Brahman.",
    "54": "Established in Brahman and serene in mind, one neither grieves for what is gone nor longs for what is not obtained; equal toward all beings, one gains supreme devotion to Me.",
    "55": "Through that supreme devotion one knows Me in truth—as all-pervading and of the massed nature of existence, consciousness and bliss—and, having known Me, enters Me.",
    "56": "Though performing all actions, one who takes refuge in Me reaches by My grace the eternal, imperishable and supreme Vaiṣṇava state.",
    "57": "Mentally dedicate all actions to Me, take Me as the supreme goal, and, relying on the yoga of decisive understanding, keep the mind on Me even while acting.",
    "58": "With the mind fixed on Me you will cross all worldly difficulties by My grace. But if through ego you refuse to hear My teaching, you will perish and fall away from the human purpose.",
    "59": "If you decide, relying on ego, 'I will not fight,' that decision is vain, because you are not independent; nature transformed by rajas will compel you to fight.",
    "60": "Bound by your own nature as a Kṣatriya, born from past impressions, you will perform the battle-action that through delusion you now do not wish to perform, even against your will.",
    "61": "The Lord, dwelling in the heart of every being, makes all beings revolve through His own māyā, engaging them in their respective actions, like puppets mounted on a machine.",
    "62": "Therefore, abandoning ego, go with your whole being for refuge to that Lord alone. By His grace you will attain supreme peace and the eternal divine abode.",
    "63": "Thus I have explained to you, out of omniscience and compassion, the knowledge that is more secret than all other secrets. Reflect fully on this whole teaching, and then act as you wish.",
    "64": "Hear again My supreme and most secret word, the essence of what has been taught repeatedly. You are exceedingly dear to Me, and I will tell you what is for your welfare.",
    "65": "Fix your mind on Me, be My devotee, worship Me and bow to Me. Living thus, you will come to Me by My grace; I promise this truth because you are dear to Me.",
    "66": "Abandon all forms of religious obligation and take refuge in Me alone with firm faith that devotion to Me accomplishes all. Do not grieve; I shall liberate you from every sin.",
    "67": "This teaching on the truth of the Gītā should never be spoken to one without austerity, without devotion, unwilling to listen, or hostile to Me and blaming Me as though I were merely human.",
    "68": "One who teaches this Gītā doctrine to My devotees develops supreme devotion to Me and, becoming free from doubt, reaches Me alone.",
    "69": "Among human beings there is no one who does more pleasing service to Me than the teacher of this scripture to My devotees, nor will there be another dearer to Me in the future.",
    "70": "One who studies this righteous dialogue between Kṛṣṇa and Arjuna worships Me through the highest sacrifice of knowledge; this is My conviction, even if the text is recited without full understanding.",
    "71": "Even a person who merely hears it with faith and without envy, without finding fault in the recitation, becomes freed from all sins and reaches the worlds attained by performers of great merit.",
    "72": "Kṛṣṇa asks whether Arjuna has heard with attention and whether his delusion born from ignorance has been destroyed.",
    "73": "Arjuna replies: my delusion about the Self has been destroyed, memory of my true nature has returned by Your grace, my doubt about dharma is gone, and I shall do Your command.",
    "74": "Sañjaya says that he heard this wondrous, hair-raising dialogue between Kṛṣṇa and Arjuna while recounting it to Dhṛtarāṣṭra.",
    "75": "By Vyāsa's grace I received divine sight and hearing; therefore I heard this supreme yoga directly from Kṛṣṇa, the Lord of Yoga, speaking Himself.",
    "76": "Remembering again and again this holy and wondrous dialogue, I rejoice and become thrilled with joy.",
    "77": "Remembering again and again that most wondrous form of Hari, I am struck with great wonder and rejoice repeatedly.",
    "78": "Wherever Kṛṣṇa, the Lord of Yoga, and Arjuna, the bearer of the Gāṇḍīva bow, stand, there are prosperity, victory, glory and firm policy. This is my certainty."
  },
    1: {
      1: `Here indeed the supremely compassionate Lord, the son of Devakī—whose descent is for the welfare of all the worlds and whose feet are worshipped by all—rescued Arjuna from the ocean of grief and delusion by the raft of instruction in the secret of dharma and knowledge. Arjuna’s discrimination had been overthrown by grief and delusion arising from ignorance of reality, and he had become intent on abandoning his own dharma and taking up another’s dharma. Kṛṣṇa Dvaipāyana set down that very meaning taught by the Lord in seven hundred verses. In doing so, he wrote mostly the verses that issued from Śrī Kṛṣṇa’s own mouth, and composed some himself in order to connect them. As stated in the Gītā Māhātmya: “The Gītā should be well studied; what need is there of extensive scriptures? It issued directly from the lotus-mouth of Padmanābha.” Then, from “On the field of dharma” up to “he spoke these words in sorrow,” the narrative is set out in order to introduce the dialogue of Śrī Kṛṣṇa and Arjuna. “On the field of dharma”: O Sañjaya, when my sons and the sons of Pāṇḍu, desiring to fight, had assembled together on Kurukṣetra, the field of dharma, what did they do?`,
      2: `On “having seen”: Having seen the army of the Pāṇḍavas arranged in battle formation, King Duryodhana went to Droṇa, his teacher, and spoke the words that follow.`,
      3: `The next nine verses give Duryodhana’s speech. O teacher, behold this extensive army of the Pāṇḍavas, deployed in battle formation by Dhṛṣṭadyumna, the son of Drupada.`,
      4: `On “here are heroes”: In this army are great bowmen—those whose bows discharge arrows. Bhīma and Arjuna are already famous here as warriors; there are heroes equal to them, endowed with valor and the warrior’s dharma. He names them: Yuyudhāna is Sātyaki.`,
      5: `Further, on “Dhṛṣṭaketu”: Cekitāna is the name of a king. Śaibya is a bull among men, that is, the best of men.`,
      6: `On “Yudhāmanyu”: Vikrānta Yudhāmanyu is one warrior. Saubhadra is Abhimanyu. The Draupadeyas are the five sons born to Draupadī from Yudhiṣṭhira and the others, beginning with Prativindhya. The definitions of mahāratha and the rest are: “One who can fight ten thousand bowmen and is skilled in weapons and their science is remembered as a mahāratha. One who can fight an unlimited number is called an atiratha. One who fights a single warrior is a rathin, and one inferior to that is regarded as an ardharathin.”`,
      7: `On “ours”: Nibodha means “understand.” Nāyaka means “leader.” Saṃjñārtham means “for complete understanding.”`,
      8: `The next two verses name the warriors. Bhavān means you, Droṇa. Samitiṃjaya means victorious in battle. Saumadatti, the son of Somadatta, is Bhūriśravā.`,
      9: `Others means the additional warriors, resolved to give up their lives for Duryodhana’s purpose. Nānā means many. Nānā-śastra-praharaṇāḥ means equipped with many weapons for striking. Yuddha-viśāradāḥ means skilled in battle.`,
      10: `Then what follows? He says, “insufficient.” Although our force is joined by heroes of that kind and is protected by Bhīṣma, it appears insufficient—unable to fight against them. But this force of the Pāṇḍavas, protected by Bhīma, appears sufficient and capable. Because Bhīṣma favors both sides, our force is not capable against the Pāṇḍava army; because Bhīma favors only one side, the Pāṇḍavas’ force is capable.`,
      11: `Therefore he says how you should act, in “at the approaches.” Remaining at your own assigned places of battle at the approaches—the entrances into the formation—without abandoning them, all of you should protect Bhīṣma on every side, so that while fighting others he is not struck from behind by anyone. The sense is: our very life depends on Bhīṣma’s strength.`,
      12: `Having heard Duryodhana’s words filled with such respect, what did Bhīṣma do? He says in “of him.” Producing joy in that king, the grandsire Bhīṣma roared loudly like a lion and blew his conch.`,
      13: `Seeing the battle enthusiasm of the commander Bhīṣma, eagerness for battle arose everywhere; this is stated in “then.” Paṇavas, ānakas, and gomukhas are particular kinds of musical instruments. At once, at that very moment, they were sounded. The sound of the conches and the other instruments became tumultuous and great.`,
      14: `Then, in the five verses beginning “then,” he describes the battle enthusiasm that arose in the Pāṇḍava army. After the uproar of the instruments in the Kaurava army, Kṛṣṇa and Arjuna, standing in their chariot, powerfully blew their divine conches.`,
      15: `He shows this very thing in detail in “Pāñcajanya.” Pāñcajanya and the others are the names of the conches of Śrī Kṛṣṇa and the others. Bhīma is one whose deeds are terrible; because his belly is like a wolf’s, he is Vṛkodara. He blew the great conch Pauṇḍra.`,
      16: `On “Anantavijaya”: Nakula blew the conch named Sughoṣa, and Sahadeva the one named Maṇipuṣpaka.`,
      17: `On “the king of Kāśī”: Kāśya means the king of Kāśī. What kind of man is he? One whose bow is supreme, excellent.`,
      18: `On “Drupada”: “O lord of the earth” means O Dhṛtarāṣṭra.`,
      19: `That sound of the conches produced great fear in your people; this is stated in “that tumult.” It tore the hearts of the sons of Dhṛtarāṣṭra—your people—while resounding tumultuously through both heaven and earth.`,
      20: `At that time Arjuna addressed Śrī Kṛṣṇa; this is stated in the four verses beginning “then.” Vyavasthitān means those who stood ready with the intention of fighting. “He whose banner bears the monkey” is Arjuna.`,
      21: `On “Hṛṣīkeśa”: The very words he spoke are given in “between the two armies.”`,
      22: `On “until I see these”: One may object, “You are a fighter, not a spectator of the battle.” To this he says: “With whom am I to fight?”`,
      23: `On “those about to fight”: The construction is: “Place my chariot between the two armies until I have seen those who have assembled here wishing to please Dhṛtarāṣṭra’s son Duryodhana.”`,
      24: `What happened next? Sañjaya says, “Thus.” Guḍākā means sleep; Arjuna is its lord, one who has conquered sleep. Thus addressed by Arjuna, Hṛṣīkeśa placed the best of chariots between the two armies, O Bhārata—O Dhṛtarāṣṭra.`,
      25: `On “before Bhīṣma and Droṇa”: Having placed the chariot before the grandsire Bhīṣma, Droṇa, and the kings, he said, “O Pārtha, behold these Kurus.”`,
      26: `What happened then? He says: “fathers” means paternal uncles and the others. “Sons and grandsons” means the sons and grandsons of Duryodhana and the others. Sakhīn means friends, and suhṛdaḥ means those who had rendered him kindness. He saw them all.`,
      27: `Then what did he do? He says, “those.” Āviṣṭa means pervaded, possessed. Viṣīdan means sinking deeply—falling into despondency and dejection.`,
      28: `What did he say? This is given from “seeing these” through the end of the chapter. O Kṛṣṇa, seeing these kinsmen standing fully before me, desiring to fight, my limbs—hands, feet, and so on—give way and grow weak. And my mouth dries up completely, losing all moisture.`,
      29: `Moreover, on “trembling”: Vepathu means trembling. Romaharṣa means horripilation, the hair standing on end. Sraṃsate means slips or falls. Paridahyate means burns all over.`,
      30: `And further, on “nor”: I see contrary omens—signs indicating misfortune.`,
      31: `Moreover, on “nor”: I see no good result in killing my own people in battle.`,
      32: `If it is asked, “Do you not see victory and the other results?” he answers, “I do not desire them.” He expands this in the verse and a half beginning “What use is kingdom to us?” Those for whose sake we desired kingdom and the rest are standing here for battle having relinquished life and wealth, accepting their sacrifice. Therefore, what use have we for kingdom and the rest?`,
      33: `If it is asked, “Do you not see victory and the other results?” he answers, “I do not desire them.” He expands this in the verse and a half beginning “What use is kingdom to us?” Those for whose sake we desired kingdom and the rest are standing here for battle having relinquished life and wealth, accepting their sacrifice. Therefore, what use have we for kingdom and the rest?`,
      34: `Suppose it is said: “If, out of compassion, you do not kill them, they will certainly kill you out of greed for the kingdom. Therefore kill them and enjoy the kingdom.” He answers in the verse and a half beginning “these I do not wish to kill.” Even if they were killing us, I would not wish to kill them even for the sovereignty of the three worlds, even to obtain that—how much less merely for the earth.`,
      35: `Suppose it is said: “If, out of compassion, you do not kill them, they will certainly kill you out of greed for the kingdom. Therefore kill them and enjoy the kingdom.” He answers in the verse and a half beginning “these I do not wish to kill.” Even if they were killing us, I would not wish to kill them even for the sovereignty of the three worlds, even to obtain that—how much less merely for the earth.`,
      36: `One may object: It is remembered, “The incendiary, the poisoner, one who attacks with a weapon, the robber of wealth, the seizer of land, and the seizer of another’s wife—these six are aggressors.” Thus these men are aggressors on all six grounds, beginning with arson, and killing aggressors is proper. For it is said, “One should kill an aggressor who approaches, without deliberation; no fault falls upon the killer for killing an aggressor.” To this he replies in the verse and a half beginning “sin.” The teaching of Arthaśāstra beginning “an aggressor who approaches” is weaker than Dharmaśāstra. As Yājñavalkya says, “When two Smṛtis conflict, reasoning is stronger in legal procedure; but Dharmaśāstra is held to be stronger than Arthaśāstra.” Therefore, even though these men are aggressors, killing these teachers and other venerable persons would indeed bring us sin, because such killing is unjust and contrary to dharma. Nor would there be happiness here; therefore he says, “one’s own people indeed.”`,
      37: `One may object: Since the fault of killing relatives is the same for them as for you, just as they enter battle accepting the fault of killing relatives, you too should do so. Why this despondency? He answers in the two verses beginning “although.” Although Duryodhana and the others, whose minds are ruined and whose discrimination is corrupted by greed for the kingdom, do not see the fault, how can we, who clearly see the fault, fail to understand that we should turn away from this sin? Our resolve should be solely to withdraw.`,
      38: `Although Duryodhana and the others, their discrimination ruined by greed for the kingdom, do not see the fault, why should we—who do see it—not understand that we must withdraw from this sin? Our resolve should be solely to withdraw.`,
      39: `The eternal family duties handed down through the generations are destroyed. When adharma overwhelms the whole surviving family, it spreads through it.`,
      40: `Then, because adharma overwhelms the family, and so forth.`,
      41: `In this condition he says, “there will be social mixture and the like”: the fathers of these family-killers fall, because the rites of offering rice-balls and water have disappeared for them.`,
      42: `These faults destroy community duties, varṇa duties, and family duties. The word and also includes the duties of the āśrama stages and related duties.`,
      43: `The phrase about destroyed family duties also indicates destroyed community duties. People who persist in sin without expiation or repentance go to terrible hells.`,
      44: `Because they are resolved to kill their relatives, he says “alas” and the rest: we have resolved to commit this great sin, namely to kill our own people; alas, what great suffering.`,
      45: `Being afflicted and wishing for death, he says, “If they should kill me.” If they kill me while I sit quietly and unresisting, that killing would be most beneficial for me, since it would prevent sin from arising.`,
      46: `Then, expecting what happened, Sañjaya says, “having spoken thus”: in the battle, on the seat above the chariot, he sat down; his mind was shaken and trembling with grief.`,
      47: `No commentary.`
    }
  };


  const GITA_DATA_COMMIT = '27d92fe5e3decde8bda747a1bfbb3ff4d6f67aeb';
  const GITA_DATA_BASE = 'https://raw.githubusercontent.com/gita/gita-frontend-v2/' + GITA_DATA_COMMIT + '/data/';
  const VASUKI_MANIFEST_URL = '/advaita/assets/data/bhagavad-gita-vasuki-manifest.json?v=20260922-content-audit-1';

  const fetchJson = (url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error('Could not load ' + url);
    return response.json();
  });

  const fetchText = (url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error('Could not load ' + url);
    return response.text();
  });

  const sourceHeadingRe = /^##\s+([0-9०-९]+)[।.]\s*([0-9०-९]+)(?:\s*[-–—]\s*([0-9०-९]+))?/gmu;
  const sourceLabelRe = /^[ \t]*(श्रीधर|मधुसूदन|विश्वनाथ|बलदेव)(?:ः[ \t]*-[ \t]*|[ \t]+-[ \t]*|[ \t]+:[ \t]*)/gmu;
  const sourceVerseMarkerRe = /॥\s*([0-9०-९]+)(?:\s*[-–—]\s*([0-9०-९]+))?\s*(?:॥|।)/g;

  const devanagariNumber = (value) => [...String(value || '')].reduce((total, character) => {
    const digit = '०१२३४५६७८९'.indexOf(character);
    return total * 10 + (digit >= 0 ? digit : Number(character) || 0);
  }, 0);

  const rangeFromMarker = (marker) => ({
    start: devanagariNumber(marker[1]),
    end: marker[2] ? devanagariNumber(marker[2]) : devanagariNumber(marker[1])
  });

  const lastSourceVerseRange = (value) => {
    const markers = Array.from(String(value || '').matchAll(sourceVerseMarkerRe));
    return markers.length ? rangeFromMarker(markers[markers.length - 1]) : null;
  };

  const pickVasukiByVerse = (markdown, manifest, chapterNumber) => {
    const text = String(markdown || '').replace(/\r\n?/g, '\n');
    const headings = Array.from(text.matchAll(sourceHeadingRe))
      .filter((heading) => devanagariNumber(heading[1]) === chapterNumber);
    if (!headings.length) {
      throw new Error('No Vasuki verse headings found for chapter ' + chapterNumber);
    }

    const groups = new Map();
    headings.forEach((heading, headingIndex) => {
      const blockStart = heading.index;
      const blockEnd = headingIndex + 1 < headings.length ? headings[headingIndex + 1].index : text.length;
      const block = text.slice(blockStart, blockEnd);
      const labels = Array.from(block.matchAll(sourceLabelRe));
      if (!labels.length) return;

      const firstLabel = labels[0];
      const prelude = block.slice(heading[0].length, firstLabel.index);
      const preludeRanges = Array.from(prelude.matchAll(sourceVerseMarkerRe)).map(rangeFromMarker);
      const fallbackRange = {
        start: devanagariNumber(heading[2]),
        end: heading[3] ? devanagariNumber(heading[3]) : devanagariNumber(heading[2])
      };

      labels.filter((label) => label[1] === 'श्रीधर').forEach((label) => {
        const beforeLabel = block.slice(0, label.index);
        const range = label.index === firstLabel.index && preludeRanges.length
          ? {
              start: Math.min(...preludeRanges.map((item) => item.start)),
              end: Math.max(...preludeRanges.map((item) => item.end))
            }
          : (lastSourceVerseRange(beforeLabel) || fallbackRange);
        const labelIndex = labels.indexOf(label);
        const bodyStart = label.index + label[0].length;
        const bodyEnd = labelIndex + 1 < labels.length ? labels[labelIndex + 1].index : block.length;
        const body = block.slice(bodyStart, bodyEnd).trim();
        if (!body) return;

        const key = range.start + '-' + range.end;
        const group = groups.get(key) || {start: range.start, end: range.end, sections: []};
        group.sections.push(body);
        groups.set(key, group);
      });
    });

    const result = {};
    groups.forEach((group) => {
      const commentary = group.sections.join('\n\n');
      for (let verse = group.start; verse <= group.end; verse += 1) {
        result[verse] = {sc: commentary, start: group.start, end: group.end};
      }
    });
    return result;
  };

  const esc = (value) => String(value || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lines = (value) => esc(value).replace(/\n/g, '<br>');

  const capitalizeEnglishStart = (value) => String(value || '').replace(/^(\s*[““‘"'(\[]*\s*)([a-z])/u, (_, prefix, first) => prefix + first.toUpperCase());

  const simplifyCommentaryVoice = (value) => {
  let text = String(value ?? '');
  const edits = [
    [/^Then what follows\?\s*He says,\s*“insufficient.”\s*/u, ''],
    [/^Therefore he says how you should act, in “at the approaches.” Remaining at your own assigned places of battle at the approaches—the entrances into the formation—without abandoning them, all of you should protect Bhīṣma on every side,/u,
      'At the approaches means the entrances into the formation. Remain at your assigned battle positions without abandoning them. All of you should protect Bhīṣma on every side,'],
    [/^Having heard Duryodhana’s words filled with such respect, what did Bhīṣma do\? He says in “of him.” Producing joy in that king, the grandsire Bhīṣma roared loudly like a lion and blew his conch\./u,
      'Having heard Duryodhana’s respectful words, Bhīṣma roared like a lion, bringing joy to the king, and blew his conch.'],
    [/^Then, in the five verses beginning “then,” he describes the battle enthusiasm that arose in the Pāṇḍava army\./u,
      'The five verses beginning with then describe the enthusiasm for battle that arose in the Pāṇḍava army.'],
    [/^He shows this very thing in detail in “Pāñcajanya.”\s*/u, 'The verse explains this in detail. '],
    [/^On “until I see these”: One may object, “You are a fighter, not a spectator of the battle.” To this he says: “With whom am I to fight\?”/u,
      'On the words until I see these. Though Arjuna is a fighter rather than a spectator, he asks. With whom am I to fight?'],
    [/^What happened next\? Sañjaya says, “Thus.” Guḍākā means sleep; Arjuna is its lord, one who has conquered sleep\. Thus addressed by Arjuna, Hṛṣīkeśa placed the best of chariots between the two armies, O Bhārata—O Dhṛtarāṣṭra\./u,
      'Thus addressed by Arjuna, Hṛṣīkeśa placed the best of chariots between the two armies, O Bhārata, meaning O Dhṛtarāṣṭra. Guḍākā means sleep, and Arjuna is its lord because he has conquered sleep.'],
    [/^What happened then\?\s*He says:\s*/u, ''],
    [/^Then what did he do\?\s*He says,\s*“those.”\s*/u, ''],
    [/^If it is asked, “Do you not see victory and the other results?” he answers, “I do not desire them.” He expands this in the verse and a half beginning “What use is kingdom to us?”\s*/u,
      'Arjuna does not desire victory or its other results. The following verse and a half expands this point. '],
    [/^Suppose it is said: “If, out of compassion, you do not kill them, they will certainly kill you out of greed for the kingdom. Therefore kill them and enjoy the kingdom.” He answers in the verse and a half beginning “these I do not wish to kill.”\s*/u,
      ''],
    [/\bOne may object:/gu, 'An objection is raised:'],
    [/To this he replies in the verse and a half beginning “sin.”/gu, 'The reply begins in the verse and a half beginning sin.'],
    [/therefore he says, “one’s own people indeed.”/gu, 'therefore Arjuna speaks of his own people.'],
    [/He answers in the two verses beginning “although.”/gu, 'The answer is given in the two verses beginning although.'],
    [/^In this condition he says, “there will be social mixture and the like”:\s*/u, 'The words there will be social mixture and the like mean this: '],
    [/^Because they are resolved to kill their relatives, he says “alas” and the rest:\s*/u, 'Arjuna laments that they are resolved to kill their relatives: '],
    [/^Being afflicted and wishing for death, he says, “If they should kill me.” If they kill me while I sit quietly and unresisting, that killing would be most beneficial for me, since it would prevent sin from arising\./u,
      'Afflicted and wishing for death, Arjuna says that if they kill him while he sits quietly and does not resist, it would benefit him by preventing sin.'],
    [/^Then, expecting what happened, Sañjaya says, “having spoken thus”:\s*in the battle, on the seat above the chariot, he sat down; his mind was shaken and trembling with grief\./u,
      'After speaking thus, Arjuna sat on the chariot seat, his mind shaken and trembling with grief.'],
    [/^Then, expecting what happened, Sañjaya said “him thus”:\s*he whose eyes were full and agitated with tears;\s*to Arjuna grieving in the manner described, Madhusūdana spoke these words\./u,
      'Arjuna was grieving as described, with tears filling his eyes. Madhusūdana spoke these words to him.'],
    [/^He says that very speech: Śrī Bhagavān said, “from where?” From what cause has this impurity, this delusion, come upon you in this perilous crisis\?/u,
      'Śrī Bhagavān said. From what cause has this impurity, this delusion, come upon you in this perilous crisis?'],
    [/^If you say that he could not even maintain his body, he answers:/u,
      'If the objection is that he could not maintain his body without killing them, the reply is:'],
    [/He shows both:/u, 'The two possibilities are'],
    [/^If you say, “Consider and do what is proper,” he says:/u, 'Arjuna replies:'],
    [/^Expecting what Arjuna did after saying this, Sañjaya said: “Thus”—the meaning is clear\./u,
      'Sañjaya says thus. The meaning is clear.'],
    [/^Then, expecting what happened, he says: Hṛṣīkeśa said to him “as if laughing,” that is, with a cheerful face\./u,
      'Hṛṣīkeśa spoke to Arjuna with a cheerful face, as if smiling.'],
    [/He gives the reason why they are not to be grieved:/gu, 'They are not to be grieved for this reason:'],
    [/He answers:/gu, 'The answer is:'],
    [/he answers:/gu, 'the answer is:'],
    [/He gives the reason with “no one can destroy…”/gu, 'The reason appears in the words no one can destroy:'],
    [/He shows that the bodies have the nature of coming and going:/gu, 'These bodies come and go and have an end.'],
    [/He establishes this by the absence of the six modifications:/gu, 'The absence of the six modifications establishes this:'],
    [/He clarifies immortality by showing the absence of any means of killing:/gu, 'Immortality is clarified by showing that there is no means of killing:'],
    [/He gives the reasons:/gu, 'The reasons are:'],
    [/He concludes:/gu, 'The conclusion is:'],
    [/^Thus he said that there is no grief because the Self lacks birth and destruction\./u,
      'Thus there is no cause for grief because the Self is free from birth and destruction.'],
    [/He concludes the instruction on the difficult-to-understand Self and its freedom from lamentation:/gu,
      'This concludes the teaching on the difficult-to-understand Self and freedom from lamentation:'],
    [/He states the fault in the opposite case:/gu, 'The fault in the opposite case is:'],
    [/He concludes the teaching of knowledge-yoga and introduces karma-yoga, its means:/gu,
      'The teaching of knowledge-yoga ends here. Karma-yoga is introduced as its means:'],
    [/He explains the difference:/gu, 'The difference is:'],
    [/he prevents it:/gu, 'the reply is:'],
    [/He says:\s*do not become/gu, 'Do not become'],
    [/He explains how actions become a means of liberation:/gu, 'Actions become a means of liberation in this way:'],
    [/Therefore, while stating the signs of the perfected, he describes the inner means until the chapter’s end\. First he answers:/u,
      'The signs of the perfected person also reveal the inner disciplines through the end of the chapter. The first sign is:'],
    [/He establishes by contrast that sense-restraint is a means of sthitaprajña:/gu,
      'By contrast, sense-restraint is a means to steady wisdom:'],
    [/He gives the reason for the absence of intellect in the unyoked:/gu,
      'The reason for the absence of understanding in the unyoked is:'],
    [/He concludes that sense-restraint is both means and mark:/gu,
      'Sense-restraint is both the means and the mark:'],
    [/He praises and concludes the knowledge-nistha taught:/gu,
      'This closes the teaching on steadfastness in knowledge:'],
    [/the compassionate Lord cannot truly be a deluder; he says it only appears so through his own error\./u,
      'the compassionate Lord does not delude him. Arjuna recognizes that the confusion comes from his own error.'],
    [/Having taught karma-yoga for the purification of the ignorant person’s inner organ, He explains that action is unnecessary for the knower:/u,
      'For the knower, action is unnecessary:'],
    [/He shows how desire is an enemy:/u, 'Desire is an enemy:'],
    [/He praises the knowledge-sacrifice by explaining several sacrifices according to the qualifications of practitioners\./u,
      'The knowledge-sacrifice is praised through examples of sacrifices suited to different practitioners.']
  ];
  for (const [pattern, replacement] of edits) text = text.replace(pattern, replacement);

  text = text.replace(/^If it is asked, “Do you not see victory and the other results\?” he answers, “I do not desire them\.” He expands this in the verse and a half beginning “What use is kingdom to us\?”\s*/u, 'Arjuna does not desire victory or its other results. The following verse and a half expands this point. ');
  text = text.replace(/^He says that very speech: Śrī Bhagavān said, “from where\?” From what cause has this impurity, this delusion, come upon you in this perilous crisis\?/u, 'Śrī Bhagavān said. From what cause has this impurity, this delusion, come upon you in this perilous crisis?');
  text = text.replace(/The compassionate Lord cannot truly be a deluder; he says it only appears so through his own error\./u, 'The compassionate Lord does not delude him. Arjuna recognizes that the confusion comes from his own error.');
  text = text.replace(/^The disciplines that are means for the seeker are themselves the natural marks of the perfected one\. Therefore, while stating the signs of the perfected, he describes the inner means until the chapter’s end\. First the answer is:/u, 'The disciplines that guide the seeker are also marks of the perfected one. The signs of perfection reveal the inner practice through the end of the chapter. The first sign is:');
  return text;
};

  const normalizeEnglishSentences = (value) => {
    let text = simplifyCommentaryVoice(value || '')
      .replace(/\r\n?/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/“([^”]*)”/g, '$1')
      .replace(/‘([^’]*)’/g, '$1')
      .replace(/["“”]/g, '')
      .replace(/[‘’]/g, "'")
      .replace(/(^|[\s(\[{])'([^'\n]+)'(?=$|[\s.,!?;:)\]}])/g, '$1$2')
      .replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\s*;\s*/g, '. ')
      .replace(/\s*:\s*/g, '. ')
      .replace(/[()[\]]/g, '')
      .replace(/[ \t]*([,.!?])/g, '$1')
      .replace(/([,.!?])(?=[A-Za-z])/g, '$1 ')
      .replace(/\.{2,}/g, '.')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
    text = text.replace(/(^|[.!?]\s+|\n+)([a-z])/gu, (_, boundary, first) => boundary + first.toUpperCase());
    if (text && !/[.!?]$/u.test(text)) text += '.';
    return text;
  };

  const devanagariToIast = (value) => {
    const independent = {'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ॡ':'ḹ','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ॐ':'oṃ'};
    const consonants = {'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'};
    const matras = {'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au'};
    const marks = {'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','।':' |','॥':' ||','०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'};
    const s = String(value || '');
    let out = '';
    for (let i = 0; i < s.length; i += 1) {
      const ch = s[i];
      if (independent[ch]) { out += independent[ch]; continue; }
      if (consonants[ch]) {
        out += consonants[ch];
        const next = s[i + 1];
        if (next === '्') { i += 1; continue; }
        if (matras[next]) { out += matras[next]; i += 1; continue; }
        out += 'a';
        continue;
      }
      if (matras[ch]) { out += matras[ch]; continue; }
      if (ch === '्' || ch === '़') continue;
      out += marks[ch] ?? ch;
    }
    return out.replace(/\s+([|])/g, ' $1').replace(/\s{2,}/g, ' ').trim();
  };

  const iastToDevanagari = (value) => {
    const vowels = {'a':'अ','ā':'आ','i':'इ','ī':'ई','u':'उ','ū':'ऊ','ṛ':'ऋ','ṝ':'ॠ','ḷ':'ऌ','ḹ':'ॡ','e':'ए','ai':'ऐ','o':'ओ','au':'औ'};
    const consonants = {'kh':'ख','gh':'घ','ṅ':'ङ','ch':'छ','jh':'झ','ñ':'ञ','ṭh':'ठ','ṭ':'ट','ḍh':'ढ','ḍ':'ड','ṇ':'ण','th':'थ','dh':'ध','ph':'फ','bh':'भ','ś':'श','ṣ':'ष','k':'क','g':'ग','c':'च','j':'ज','t':'त','d':'द','n':'न','p':'प','b':'ब','m':'म','y':'य','r':'र','l':'ल','v':'व','s':'स','h':'ह'};
    const vowelMarks = {'a':'','ā':'ा','i':'ि','ī':'ी','u':'ु','ū':'ू','ṛ':'ृ','ṝ':'ॄ','ḷ':'ॢ','ḹ':'ॣ','e':'े','ai':'ै','o':'ो','au':'ौ'};
    const marks = {'ṃ':'ं','ḥ':'ः','m̐':'ँ','’':'ऽ'};
    const convertWord = (word) => {
      let out = '';
      let i = 0;
      let afterConsonant = false;
      while (i < word.length) {
        const two = word.slice(i, i + 2);
        const one = word[i];
        if (marks[two]) { out += marks[two]; i += 2; continue; }
        if (marks[one]) { out += marks[one]; i += 1; continue; }
        const consonant = consonants[two] ? two : (consonants[one] ? one : '');
        if (consonant) {
          if (afterConsonant) out += '्';
          out += consonants[consonant];
          i += consonant.length;
          afterConsonant = true;
          if (word.slice(i, i + 1) === '̇') i += 1;
          continue;
        }
        const vowel = vowels[two] ? two : (vowels[one] ? one : '');
        if (vowel) {
          if (afterConsonant) out += vowelMarks[vowel];
          else out += vowels[vowel];
          i += vowel.length;
          afterConsonant = false;
          continue;
        }
        if (one === '्') { out += '्'; i += 1; afterConsonant = false; continue; }
        out += one;
        i += 1;
        afterConsonant = false;
      }
      return out;
    };
    return String(value || '').split(/(\s+|[-–—/|.,;:!?()[\]“”‘’'"])/u).map((part) => {
      if (!part || /^\s+$/.test(part) || /^[\-–—/|.,;:!?()[\]“”‘’'"]$/u.test(part)) return part;
      return convertWord(part);
    }).join('');
  };

  const parseWordMeaning = (value) => String(value || '')
    .replace(/<br\s*\/?>(?=.)/gi, '\n')
    .split(/[;\n]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separator = entry.match(/\s*[—–]\s*|\s+-\s+/u);
      if (!separator) return [entry, ''];
      const index = separator.index;
      return [entry.slice(0, index).trim(), entry.slice(index + separator[0].length).trim()];
    })
    .filter((pair) => pair[0]);

  const cleanVisibleGloss = (value) => String(value || '')
    .replace(/“([^”]*)”/g, '$1')
    .replace(/‘([^’]*)’/g, '$1')
    .replace(/["“”]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/(^|[\s(\[{])'([^'\n]+)'(?=$|[\s.,!?;:)\]}])/g, '$1$2')
    .replace(/\s*[—–]\s*/g, ' ')
    .replace(/[;:]/g, '')
    .replace(/[()[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const renderWordMeaningRows = (value, emptyText) => {
    const pairs = parseWordMeaning(value);
    if (!pairs.length) return '<p class="gita-dual-empty">' + esc(emptyText || 'Word-for-word meaning unavailable in the pinned source record.') + '</p>';
    return '<div class="gita-word-list">' + pairs.map((pair) => {
      const term = pair[0];
      const devanagari = /[\u0900-\u097F]/u.test(term) ? term : iastToDevanagari(term);
      const iast = /[\u0900-\u097F]/u.test(term) ? devanagariToIast(term) : term;
      const gloss = capitalizeEnglishStart(cleanVisibleGloss(pair[1]));
      return '<div class="gita-word-row"><span class="gita-word-dev" lang="sa-Deva">' + esc(devanagari) + '</span> <span class="gita-word-iast"><em>' + esc(iast) + '</em></span> <span class="gita-word-gloss">' + esc(gloss) + '</span></div>';
    }).join('') + '</div>';
  };

  const VEDICSCRIPTURES_GITA_COMMIT = '43dfc8db815d01e15a347ea294b089334cf2aa17';
  const VEDICSCRIPTURES_GITA_BASE = 'https://raw.githubusercontent.com/vedicscriptures/bhagavad-gita/' + VEDICSCRIPTURES_GITA_COMMIT + '/slok/';
  const VEDICSCRIPTURES_COUNTS = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];
  const verseUrl = (n) => VEDICSCRIPTURES_GITA_BASE + 'bhagavadgita_chapter_' + chapter + '_slok_' + n + '.json';
  const cleanApiTransliteration = (value) =>
    String(value || '')
      .replace(/\s*(?:\|\||।।)\s*[0-9०-९]+(?:[-–][0-9०-९]+)?\s*(?:\|\||।।)\s*$/g, '')
      .replace(/\s*\.\s*/g, '\n')
      .trim();

  const cleanApiTranslation = (value) =>
    String(value || '')
      .replace(/^\s*[0-9०-९]+\.[0-9०-९]+\.?\s*/, '')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;!?])/g, '$1')
      .replace(/,\s*,/g, ',')
      .trim();

  const expandEntries = (entries) => {
    const out = {};
    (entries || []).filter(Boolean).forEach((entry) => {
      const nums = String(entry.verse_number || '').match(/\d+/g);
      if (!nums || !nums.length) return;
      const first = Number(nums[0]);
      const last = Number(nums[nums.length - 1]);
      for (let n = first; n <= last; n += 1) out[n] = entry;
    });
    return out;
  };

  const getSourceRange = (entry, fallback) => {
    const nums = String(entry && entry.verse_number || fallback).match(/\d+/g) || [String(fallback)];
    const start = Number(nums[0]) || fallback;
    const end = Number(nums[nums.length - 1]) || start;
    return {start, end};
  };

  const groupedWordMeaningSlices = {
    '1:29-31': [[0, 1], [2], [3]],
    '2:42-43': [[0], [1, 2]],
    '4:29-30': [[0], [1, 2]],
    '5:8-9': [[0], [1, 2]],
    '5:27-28': [[0], [1, 2]],
    '11:26-27': [[0], [1, 2]],
    '12:3-4': [[0], [1, 2]],
    '16:13-15': [[0], [1], [2]]
  };

  const pickWordMeaning = (entry, n) => {
    const value = String(entry && entry.word_meanings || '').trim();
    if (!value) return '';
    const range = getSourceRange(entry, n);
    if (range.start === range.end) return value;
    const parts = value.split(/\n+/).map((part) => part.trim()).filter(Boolean);
    const span = range.end - range.start + 1;
    const sliceMap = groupedWordMeaningSlices[chapter + ':' + range.start + '-' + range.end];
    if (sliceMap) {
      const selected = sliceMap[n - range.start] || [];
      return selected.map((index) => parts[index]).filter(Boolean).join('\n');
    }
    if (parts.length === span) return parts[n - range.start] || '';
    return n === range.start ? value : '';
  };

  const pickSanskritVerse = (entry, n) => {
    const value = String(entry && entry.sanskrit_text || '');
    const re = new RegExp('(?:\\|\\||।।)\\s*' + chapter + '\\.(\\d+)\\s*(?:\\|\\||।।)', 'g');
    const matches = Array.from(value.matchAll(re));
    const index = matches.findIndex((match) => Number(match[1]) === n);
    if (index < 0) return value;
    const start = index === 0 ? 0 : matches[index - 1].index + matches[index - 1][0].length;
    const end = matches[index].index + matches[index][0].length;
    return value.slice(start, end).trim();
  };

  const pickCommentaryVerse = (entry, n) => {
    const value = String(entry && entry.commentary || '');
    const re = new RegExp('(?:\\|\\||।।)\\s*' + chapter + '\\.(\\d+)\\s*(?:\\|\\||।।)', 'g');
    const matches = Array.from(value.matchAll(re));
    const index = matches.findIndex((match) => Number(match[1]) === n);
    if (index < 0) return value;
    const start = matches[index].index;
    const end = index + 1 < matches.length ? matches[index + 1].index : value.length;
    return value.slice(start, end).trim();
  };

  const makeVerse = (d, meanings, sourceMode) => {
    const n = d.verse;
    const rootText = sourceMode === 'legacy'
      ? String(d.slok || '').replace(/\|\|[^|]+\|\|/g, '').replace(/\|/g, '').replace(/\\n/g, '\n').replace(/\s+\d+-\d+\s*$/, '')
      : String(d.slok || '').replace(/(?:\|\||।।)\s*[0-9०-९]+(?:[-–][0-9०-९]+)?\s*(?:\|\||।।)/g, '').replace(/\|/g, '');
    const rootLines = rootText.split('\n').map((x) => x.trim()).filter(Boolean).join('<br>');
    const englishSource = sourceMode === 'legacy'
      ? (d.gambir && d.gambir.et ? d.gambir.et : 'English translation unavailable in the source record.')
      : (d.mukEnglish || d.apiEnglish || 'English translation unavailable in the pinned source records.');
    const english = lines(normalizeEnglishSentences(englishSource));
    const key = chapter + '.' + n;
    const wordMeaning = sourceMode === 'legacy'
      ? lines(meanings[key] || 'Word-for-word meaning unavailable in the source record.')
      : lines(d.wordMeaning || 'Word-for-word meaning unavailable in the pinned source record.');
    const transliteration = sourceMode === 'legacy'
      ? lines(d.transliteration || 'Transliteration unavailable in the source record.')
      : d.transliteration
        ? lines(d.transliteration)
        : '';
    const sridhara = sourceMode === 'legacy'
      ? (d.srid && d.srid.sc ? {sc: d.srid.sc, start: n, end: n} : null)
      : (d.srid && d.srid.start === n ? d.srid : null);
    const commentary = sridhara
      ? lines(sridhara.sc)
      : '';
    const translatedCommentary = sridhara
      ? lines(normalizeEnglishSentences(d.translatedCommentary || (sourceMode === 'legacy'
        ? (d.srid && d.srid.et ? d.srid.et : 'The source repository supplies Śrīdhara Svāmī’s commentary in Sanskrit. No English translation is supplied there.')
        : 'No English translation is supplied for this passage.')))
      : '';

    const translationRange = d.mukTranslationRange || {start: n, end: n};
    const hasGroupedTranslation = sourceMode === 'mukundananda' &&
      Number(translationRange.start) !== Number(translationRange.end);
    const groupedTranslationContinuation = hasGroupedTranslation && n !== Number(translationRange.start);
    const rangeLabel = 'BG ' + chapter + '.' + translationRange.start + '–' + chapter + '.' + translationRange.end;
    const translationPanel = groupedTranslationContinuation
      ? '<p class="gita-translation">The translation for ' + rangeLabel + ' is shown with verse ' +
        translationRange.start + '. <a href="#gita-' + chapter + '-' + translationRange.start + '">View it there</a>.</p>'
      : '<p class="gita-translation">' + (hasGroupedTranslation
        ? '<span class="gita-translation-range">' + rangeLabel + '</span><br>'
        : '') + english + '</p>';
    const wordMeaningPanel = '<details class="gita-details gita-word-for-word"><summary>Word-for-word</summary><div class="gita-reveal">' +
      renderWordMeaningRows(wordMeaning, 'No word-for-word meaning is supplied separately in the pinned source record.') +
      '</div></details>';
    const transliterationPanel = transliteration
      ? '<details class="gita-details"><summary>Transliteration</summary><div class="gita-reveal"><p><em>' + transliteration + '</em></p></div></details>'
      : '';

    return '<article class="gita-verse" id="gita-' + chapter + '-' + n + '">' +
      '<h2><span>BG</span> ' + chapter + '.' + n + '</h2><hr class="gita-verse-rule">' +
      '<div class="gita-sanskrit" lang="sa-Deva">' + rootLines + '</div>' +
      translationPanel +
      '<div class="gita-controls">' +
      wordMeaningPanel +
      transliterationPanel +
      (sridhara ? '<details class="gita-details"><summary>Śrīdhara Sanskrit' +
        (sridhara.start !== sridhara.end ? ' (' + chapter + '.' + sridhara.start + '–' + sridhara.end + ')' : '') +
        '</summary><div class="gita-reveal"><p lang="sa">' + commentary + '</p></div></details>' : '') +
      '</div>' +
      (sridhara ? '<section class="gita-commentary"><h3>Śrīdhara’s Commentary</h3><p>' + translatedCommentary + '</p></section>' : '') +
      '</article>';
  };

  const renderChapter = (data, meanings, sourceMode) => {
    root.innerHTML = '<header class="gita-hero"><p class="eyebrow">Śrīmad Bhagavad Gītā</p><h1>Chapter ' + chapter + '</h1><p class="subtitle">' + names[chapter - 1] + '</p><div class="gita-rule" aria-hidden="true"></div></header>' +
      '<nav class="gita-chapter-nav" aria-label="Chapter navigation"><a class="gita-nav-all" href="/advaita/pages/bhagavad-gita/">All chapters</a>' + (chapter > 1 ? '<a class="gita-nav-prev" href="/advaita/articles/bhagavad-gita-chapter-' + (chapter - 1) + '/">← Previous</a>' : '') + (chapter < 18 ? '<a class="gita-nav-next" href="/advaita/articles/bhagavad-gita-chapter-' + (chapter + 1) + '/">Next chapter →</a>' : '') + '</nav>' +
      '<div class="gita-contents"><h2>Contents</h2><ol>' + data.map((d) => '<li><a href="#gita-' + chapter + '-' + d.verse + '">Verse ' + d.verse + '</a></li>').join('') + '</ol></div>' +
      data.map((d) => makeVerse(d, meanings, sourceMode)).join('');
  };

  const load = async () => {
    root.innerHTML = '<p class="gita-loading">Loading chapter text…</p>';

    const vasukiManifest = await fetchJson(VASUKI_MANIFEST_URL);
    const vasukiChapter = (vasukiManifest.chapters || {})[String(chapter)] || {};
    const vasukiPath = vasukiManifest._meta.source_path + '/' + vasukiChapter.file;
    const vasukiUrl = 'https://raw.githubusercontent.com/vishvAsa/mahAbhAratam/' + vasukiManifest._meta.source_commit + '/' + vasukiPath;
    const vedicRecordCount = VEDICSCRIPTURES_COUNTS[chapter - 1] || 0;
    const [common, mukundananda, vasukiMarkdown, vedicRecords] = await Promise.all([
      fetchJson(GITA_DATA_BASE + 'common/common_en.json'),
      fetchJson(GITA_DATA_BASE + 'authors/author_22_en.json'),
      fetchText(vasukiUrl),
      Promise.all(Array.from({length: vedicRecordCount}, (_, index) => fetchJson(verseUrl(index + 1))))
    ]);
    const commonChapter = (common.chapters || []).find((entry) => Number(entry.chapter_number) === chapter) || {};
    const mukChapter = (mukundananda.chapters || []).find((entry) => Number(entry.chapter_number) === chapter) || {};
    const commonByVerse = expandEntries(commonChapter.verses);
    const mukByVerse = expandEntries(mukChapter.verses);
    const vedicByVerse = Object.fromEntries((vedicRecords || []).map((entry) => [Number(entry.verse), entry]));
    const vasukiByVerse = pickVasukiByVerse(vasukiMarkdown, vasukiManifest, chapter);
    const commonOverrides = chapter === 2 ? {
      42: {
        slok: 'यामिमां पुष्पितां वाचं प्रवदन्त्यविपश्चितः।\\n\\nवेदवादरताः पार्थ नान्यदस्तीति वादिनः।।2.42।।',
        transliteration: 'yāmimāṁ puṣhpitāṁ vāchaṁ pravadanty-avipaśhchitaḥ\\nveda-vāda-ratāḥ pārtha nānyad astīti vādinaḥ',
        wordMeaning: 'yām imām—all these; puṣhpitām—flowery; vācham—words; pravadanti—speak; avipaśhchitaḥ—those with limited understanding; veda-vāda-ratāḥ—attached to the flowery words of the Vedas; pārtha—Arjun, the son of Pritha; na anyat—no other; asti—is; iti—thus; vādinaḥ—advocate'
      },
      43: {
        slok: 'कामात्मानः स्वर्गपरा जन्मकर्मफलप्रदाम्।\\n\\nक्रियाविशेषबहुलां भोगैश्वर्यगतिं प्रति।।2.43।।',
        transliteration: 'kāmātmānaḥ swarga-parā janma-karma-phala-pradām\\nkriyā-viśheṣha-bahulāṁ bhogaiśhwarya-gatiṁ prati',
        wordMeaning: 'kāmātmānaḥ—desirous of sensual pleasure; swarga-parāḥ—aiming to achieve heavenly planets; janma-karma-phala-pradām—awarding high birth and fruitive results; kriyā-viśheṣha-bahulām—full of special ritualistic ceremonies; bhoga-aiśhwarya-gatim prati—toward enjoyment and sovereignty'
      }
    } : {};
    const data = Array.from({length: counts[chapter - 1]}, (_, index) => {
      const n = index + 1;
      const c = commonByVerse[n] || {};
      const m = mukByVerse[n] || {};
      const api = vedicByVerse[n] || {};
      const override = commonOverrides[n] || {};
      const commonRange = getSourceRange(c, n);
      const mukRange = getSourceRange(m, n);
      const hasTransliterationOverride = Object.prototype.hasOwnProperty.call(override, 'transliteration');
      const hasWordMeaningOverride = Object.prototype.hasOwnProperty.call(override, 'wordMeaning');
      const apiTransliteration = cleanApiTransliteration(api.transliteration);
      // Prabhupāda's per-verse English here matches the Vedabase translation.
      // The word-for-word glossary below is split to the same visible verse,
      // so grouped source records can never spill onto neighboring cards.
      const apiTranslation = cleanApiTranslation(
        (api.prabhu && api.prabhu.et) ||
        (api.gambir && api.gambir.et) ||
        (api.purohit && api.purohit.et) ||
        (api.adi && api.adi.et) ||
        (api.siva && api.siva.et)
      );
      const sridharaCommentary = vasukiByVerse[n] || null;
      const translatedCommentary = sridharaCommentary
        ? Array.from({length: sridharaCommentary.end - sridharaCommentary.start + 1}, (_, offset) => {
            const value = (sridharaEnglish[chapter] || {})[String(sridharaCommentary.start + offset)] || '';
            return value === 'No commentary.' ? '' : value;
          }).filter((value, index, values) => Boolean(value) && (index === 0 || value !== values[index - 1])).join('\n\n')
        : '';
      return {
        verse: n,
        slok: override.slok || api.slok || pickSanskritVerse(c, n),
        transliteration: hasTransliterationOverride
          ? (override.transliteration || '')
          : (apiTransliteration || (commonRange.start === n ? (c.transliteration || '') : '')),
        transliterationShared: apiTransliteration || hasTransliterationOverride || commonRange.start === n
          ? null
          : (c.transliteration ? commonRange : null),
        wordMeaning: hasWordMeaningOverride
          ? (override.wordMeaning || pickWordMeaning(c, n))
          : pickWordMeaning(c, n),
        wordMeaningShared: null,
        // The translation and word meanings come from the same pinned Gītā data release.
        // Keep range translations together on their first card; continuation cards link back.
        apiEnglish: apiTranslation,
        mukEnglish: m.translation || '',
        mukTranslationRange: mukRange,
        srid: sridharaCommentary,
        translatedCommentary
      };
    });
    renderChapter(data, {}, 'mukundananda');
  };

  load().catch(() => {
    root.innerHTML = '<p class="gita-no-source">This chapter could not be loaded. Please refresh and try again.</p>';
  });
})();