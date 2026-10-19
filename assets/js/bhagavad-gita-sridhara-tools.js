(() => {
  const root = document.querySelector('[data-gita-chapter="1"]');
  if (!root) return;

  const wfw = {
    1: [
      ['iha khalu', 'here indeed'],
      ['sakala-loka-hita-avatāraḥ', 'whose descent is for the welfare of all the worlds'],
      ['sakala-vandita-caraṇaḥ', 'whose feet are worshipped by all'],
      ['parama-kāruṇikaḥ bhagavān devakī-nandanaḥ', 'the supremely compassionate Lord, the son of Devakī'],
      ['tattva-ajñāna-vijṛmbhita-śoka-moha-vibhraṃśita-vivekatayā', 'with discrimination overthrown by grief and delusion expanded from ignorance of reality'],
      ['nija-dharma-tyāga-para-dharma-abhisaṃdhi-param arjunam', 'Arjuna, intent on abandoning his own dharma and adopting another’s'],
      ['dharma-jñāna-rahasya-upadeśa-plavena', 'by the raft of instruction in the secret of dharma and knowledge'],
      ['tasmāt śoka-moha-sāgarāt uddadhāra', 'he raised him from that ocean of grief and delusion'],
      ['tam eva bhagavad-upadiṣṭam artham', 'that very meaning taught by the Lord'],
      ['kṛṣṇa-dvaipāyanaḥ saptabhiḥ śloka-śataiḥ upanibabandha', 'Kṛṣṇa Dvaipāyana set down in seven hundred verses'],
      ['prāyaśaḥ śrī-kṛṣṇa-mukha-niḥsṛtān eva ślokān alikhat', 'he wrote mostly the verses issuing from Śrī Kṛṣṇa’s own mouth'],
      ['kāṃścit tat-saṅgataye svayaṃ vyaracayat', 'and composed some himself for their connection'],
      ['śrī-kṛṣṇārjuna-saṃvāda-prastāvāya kathā nirūpyate', 'the narrative is set out to introduce the dialogue of Śrī Kṛṣṇa and Arjuna'],
      ['dharma-bhūmau kuru-kṣetre', 'on Kurukṣetra, the field of dharma'],
      ['mat-putrāḥ pāṇḍu-putrāś ca', 'my sons and the sons of Pāṇḍu'],
      ['yuyutsavaḥ yoddhum icchantaḥ', 'desiring to fight'],
      ['samavetāḥ militāḥ santaḥ', 'having assembled together'],
      ['kiṃ kṛtavantaḥ', 'what did they do?']
    ],
    2: [
      ['dṛṣṭvā iti', 'on the word “having seen”'],
      ['pāṇḍavānām anīkaṃ sainyam', 'the army of the Pāṇḍavas'],
      ['vyūḍham', 'arrayed'],
      ['vyūha-racanayā vyavasthitam', 'set in battle formation'],
      ['dṛṣṭvā', 'having seen'],
      ['droṇācārya-samīpaṃ gatvā', 'having gone near Droṇa, his teacher'],
      ['rājā duryodhanaḥ', 'King Duryodhana'],
      ['vakṣyamāṇaṃ vākyam uvāca', 'spoke the words that follow']
    ],
    3: [
      ['tad eva vākyam āha', 'he states those very words'],
      ['paśyaitām ity-ādi-navabhiḥ ślokaiḥ', 'in the nine verses beginning “Behold this”'],
      ['bho ācārya', 'O teacher'],
      ['pāṇḍavānāṃ vitatāṃ camūṃ senāṃ paśya', 'behold the extensive army of the Pāṇḍavas'],
      ['drupada-putreṇa dhṛṣṭadyumnena', 'by Dhṛṣṭadyumna, the son of Drupada'],
      ['vyūḍhām', 'arrayed'],
      ['vyūha-racanayā adhiṣṭhitām', 'set in battle formation']
    ],
    4: [
      ['atra śūrā iti', 'on “here are heroes”'],
      ['atra asyāṃ camvām', 'here, in this army'],
      ['iṣavaḥ bāṇāḥ', 'arrows'],
      ['asyante kṣipyante ebhiḥ iti iṣvāsāḥ', 'those by which arrows are discharged are bows'],
      ['mahāntaḥ iṣvāsāḥ yeṣāṃ te', 'those whose bows are great'],
      ['bhīmārjunau', 'Bhīma and Arjuna'],
      ['atiprasiddhau yoddhārau', 'very famous warriors'],
      ['tābhyāṃ samāḥ śūrāḥ', 'heroes equal to those two'],
      ['śauryeṇa kṣātra-dharmeṇa upetāḥ', 'endowed with valor and the warrior’s dharma'],
      ['yuyudhānaḥ sātyakiḥ', 'Yuyudhāna is Sātyaki']
    ],
    5: [
      ['kiṃ ca', 'and further'],
      ['dhṛṣṭaketuḥ iti', 'on “Dhṛṣṭaketu”'],
      ['cekitānaḥ nāma ekaḥ rājā', 'Cekitāna is the name of a king'],
      ['nara-puṅgavaḥ', 'a bull among men'],
      ['nara-śreṣṭhaḥ śaibyaḥ', 'Śaibya, the best of men']
    ],
    6: [
      ['yudhāmanyuś ca iti', 'on “and Yudhāmanyu”'],
      ['vikrāntaḥ yudhāmanyuḥ nāma ekaḥ', 'one named the valiant Yudhāmanyu'],
      ['saubhadraḥ abhimanyuḥ', 'the son of Subhadrā is Abhimanyu'],
      ['draupadeyāḥ', 'the sons of Draupadī'],
      ['draupadyāṃ pañcabhyaḥ yudhiṣṭhirādibhyaḥ jātāḥ', 'born to Draupadī from the five beginning with Yudhiṣṭhira'],
      ['prativindhyādayaḥ pañca', 'the five beginning with Prativindhya'],
      ['mahārathādīnāṃ lakṣaṇam', 'the definition of mahāratha and the other classes'],
      ['eko daśa-sahasrāṇi yodhayet dhanvinām', 'one who can fight ten thousand bowmen'],
      ['śastra-śāstra-pravīṇaḥ', 'skilled in weapons and the science of weapons'],
      ['mahāratha iti smṛtaḥ', 'is remembered as a mahāratha'],
      ['amitān yodhayet yaḥ', 'one who can fight an unlimited number'],
      ['atirathaḥ', 'is called an atiratha'],
      ['rathī tu ekena yuddhyet', 'a rathin fights one warrior'],
      ['tad-nyūnaḥ ardharathī', 'one inferior to that is an ardharathin']
    ],
    7: [
      ['asmākam iti', 'on “ours”'],
      ['nibodha', 'understand'],
      ['nāyakāḥ', 'leaders'],
      ['saṃjñārtham', 'for complete understanding'],
      ['samyag-jñānārtham iti arthaḥ', 'that is, for proper knowledge']
    ],
    8: [
      ['tān eva āha', 'he names those very men'],
      ['bhavān iti dvābhyām', 'in the two verses beginning “you yourself”'],
      ['bhavān droṇaḥ', '“you” means Droṇa'],
      ['samitiṃ saṅgrāmaṃ jayati iti', 'one who conquers the battle'],
      ['saumadattiḥ', 'the son of Somadatta'],
      ['somadattasya putraḥ bhūriśravāḥ', 'Bhūriśravā, the son of Somadatta']
    ],
    9: [
      ['anye ca iti', 'on “and others”'],
      ['mad-arthe', 'for my sake'],
      ['mat-prayojanārtham', 'for my purpose'],
      ['jīvitaṃ tyaktum adhyavasitāḥ', 'resolved to give up their lives'],
      ['nānā anekāni śastrāṇi', 'various, many weapons'],
      ['praharaṇa-sādhanāni', 'instruments for striking'],
      ['yuddhe viśāradāḥ', 'skilled in war'],
      ['nipuṇāḥ', 'expert']
    ],
    10: [
      ['tataḥ kim iti', 'then what follows?'],
      ['aparyāptam iti', 'on “insufficient”'],
      ['tathā-bhūtaiḥ vīraiḥ yuktam api', 'although joined by heroes of that kind'],
      ['bhīṣmeṇa abhirakṣitam api', 'although protected by Bhīṣma'],
      ['asmākaṃ balaṃ sainyam', 'our force, our army'],
      ['aparyāptam', 'insufficient'],
      ['taiḥ saha yoddhum asamartham bhāti', 'appears unable to fight against them'],
      ['pāṇḍavānāṃ balam', 'the force of the Pāṇḍavas'],
      ['bhīmena abhirakṣitam', 'protected by Bhīma'],
      ['paryāptam samartham bhāti', 'appears sufficient and capable'],
      ['bhīṣmasya ubhaya-pakṣa-pātitvāt', 'because Bhīṣma favors both sides'],
      ['bhīmasya eka-pakṣa-pātitvāt', 'because Bhīma favors only one side']
    ],
    11: [
      ['tasmāt bhavadbhiḥ evaṃ vartitavyam', 'therefore you should act in this way'],
      ['ayaneṣu', 'at the approaches'],
      ['vyūha-praveśa-mārgeṣu', 'at the entrances into the battle formation'],
      ['yathā-bhāgaṃ vibhaktāṃ svāṃ svāṃ raṇa-bhūmim', 'each one’s assigned place of battle'],
      ['aparityajya avasthitāḥ santaḥ', 'remaining there without abandoning it'],
      ['sarve bhīṣmam eva abhitaḥ rakṣantu', 'let all protect Bhīṣma on every side'],
      ['pṛṣṭhataḥ kaiścit na hanyeta', 'so that he is not struck by anyone from behind'],
      ['bhīṣma-balena eva asmākaṃ jīvitam', 'our very life depends on Bhīṣma’s strength']
    ],
    12: [
      ['bahumāna-yuktaṃ rājñaḥ duryodhanasya vākyam', 'Duryodhana’s words filled with respect'],
      ['śrutvā', 'having heard'],
      ['pitāmahaḥ bhīṣmaḥ', 'the grandsire Bhīṣma'],
      ['tasya rājñaḥ harṣaṃ saṃjanayan', 'producing joy in that king'],
      ['uccaiḥ mahāntaṃ siṃha-nādaṃ kṛtvā', 'having made a great, loud lion-roar'],
      ['śaṅkhaṃ dadhmau', 'blew the conch'],
      ['vāditavān', 'sounded it']
    ],
    13: [
      ['senāpateḥ bhīṣmasya yuddhotsavam ālakṣya', 'seeing the battle enthusiasm of the commander Bhīṣma'],
      ['sarvataḥ yuddhotsavaḥ pravṛttaḥ', 'battle enthusiasm arose everywhere'],
      ['paṇavāḥ ānakāḥ gomukhāḥ ca', 'paṇavas, ānakas, and gomukhas'],
      ['vādya-viśeṣāḥ', 'particular kinds of musical instruments'],
      ['sahasā eva tat-kṣaṇam eva', 'at once, at that very moment'],
      ['abhyahanyanta vāditāḥ', 'they were sounded'],
      ['śaṅkhādi-śabdaḥ', 'the sound of the conches and other instruments'],
      ['tumulaḥ mahān abhavat', 'became tumultuous and great']
    ],
    14: [
      ['pāṇḍava-sainye pravṛttaṃ yuddhotsavam', 'the battle enthusiasm arising in the Pāṇḍava army'],
      ['tata iti pañcabhiḥ', 'described in the five verses beginning “then”'],
      ['kaurava-sainya-vādya-kolāhala-anantaram', 'after the uproar of instruments in the Kaurava army'],
      ['syandane rathe sthitau', 'standing in the chariot'],
      ['kṛṣṇārjunau', 'Kṛṣṇa and Arjuna'],
      ['divyau śaṅkhau', 'their divine conches'],
      ['prakarṣeṇa dadhmatuḥ', 'blew powerfully']
    ],
    15: [
      ['tad eva vibhāgena darśayan āha', 'showing that very thing in detail, he says'],
      ['pāñcajanyam iti', 'on “Pāñcajanya”'],
      ['pāñcajanyādīni', 'Pāñcajanya and the others'],
      ['śrī-kṛṣṇādi-śaṅkhānāṃ nāmāni', 'the names of the conches of Śrī Kṛṣṇa and the others'],
      ['bhīmaṃ ghoraṃ karma yasya saḥ', 'he whose action is terrible is Bhīma'],
      ['vṛkavad udaraṃ yasya sa vṛkodaraḥ', 'he whose belly is like a wolf’s is Vṛkodara'],
      ['mahā-śaṅkhaṃ pauṇḍraṃ dadhmau', 'he blew the great conch Pauṇḍra']
    ],
    16: [
      ['anantavijayam iti', 'on “Anantavijaya”'],
      ['nakulaḥ sughoṣaṃ nāma śaṅkhaṃ dadhmau', 'Nakula blew the conch named Sughoṣa'],
      ['sahadevaḥ maṇipuṣpakaṃ nāma', 'Sahadeva the one named Maṇipuṣpaka']
    ],
    17: [
      ['kāśyaś ca iti', 'on “and the king of Kāśī”'],
      ['kāśyaḥ kāśirājaḥ', 'Kāśya means the king of Kāśī'],
      ['kathaṃ-bhūtaḥ', 'what kind of man is he?'],
      ['paramaḥ śreṣṭhaḥ iṣvāsaḥ dhanuḥ yasya saḥ', 'one whose bow is supreme and excellent']
    ],
    18: [
      ['drupada iti', 'on “Drupada”'],
      ['he pṛthivī-pate', 'O lord of the earth'],
      ['he dhṛtarāṣṭra', 'O Dhṛtarāṣṭra']
    ],
    19: [
      ['sa ca śaṅkhānāṃ nādaḥ', 'that sound of the conches'],
      ['tvadīyānāṃ mahā-bhayaṃ janayāmāsa', 'produced great fear in your people'],
      ['sa ghoṣa iti', 'on “that tumult”'],
      ['dhārtarāṣṭrāṇāṃ tvadīyānāṃ hṛdayāni vidāritavān', 'it tore the hearts of the sons of Dhṛtarāṣṭra, your people'],
      ['nabhaś ca pṛthivīṃ ca eva', 'both heaven and earth'],
      ['tumulaḥ vyanunādayan', 'resounding tumultuously']
    ],
    20: [
      ['tasmin samaye', 'at that time'],
      ['śrī-kṛṣṇam arjunaḥ vijñāpayāmāsa', 'Arjuna addressed Śrī Kṛṣṇa'],
      ['atha iti caturbhiḥ', 'in the four verses beginning “then”'],
      ['vyavasthitān', 'those standing ready'],
      ['yuddha-udyogena sthitān', 'standing with the intention of battle'],
      ['kapi-dhvajaḥ arjunaḥ', 'Arjuna is he whose banner bears the monkey']
    ],
    21: [
      ['hṛṣīkeśam iti', 'on “Hṛṣīkeśa”'],
      ['tad eva vākyam āha', 'he gives those very words'],
      ['senayor iti', 'in “between the two armies”']
    ],
    22: [
      ['yāvad etān iti', 'on “until I see these”'],
      ['nanu tvaṃ yoddhā', 'but you are a fighter'],
      ['na tu yuddha-prekṣakaḥ', 'not a spectator of the battle'],
      ['tatra āha', 'to this he replies'],
      ['kaiḥ saha mayā yoddhavyam', 'with whom am I to fight?']
    ],
    23: [
      ['yotsyamānān iti', 'on “those about to fight”'],
      ['dhārtarāṣṭrasya duryodhanasya', 'of Dhṛtarāṣṭra’s son Duryodhana'],
      ['priyaṃ kartum icchantaḥ', 'wishing to do what pleases him'],
      ['ye iha samāgatāḥ', 'those who have assembled here'],
      ['tān yāvat drakṣyāmi', 'until I have seen them'],
      ['ubhayoḥ senayoḥ madhye', 'between the two armies'],
      ['me rathaṃ sthāpaya', 'place my chariot']
    ],
    24: [
      ['tataḥ kiṃ pravṛttam', 'what happened next?'],
      ['sañjaya uvāca', 'Sañjaya said'],
      ['guḍākā nidrā', 'guḍākā means sleep'],
      ['tasyā īśena', 'by its lord'],
      ['jita-nidreṇa arjunena', 'by Arjuna, the conqueror of sleep'],
      ['evam uktaḥ san', 'being thus addressed'],
      ['he bhārata dhṛtarāṣṭra', 'O Bhārata, O Dhṛtarāṣṭra'],
      ['senayoḥ madhye', 'between the two armies'],
      ['rathānām uttamam ratham', 'the best of chariots'],
      ['hṛṣīkeśaḥ sthāpitavān', 'Hṛṣīkeśa placed']
    ],
    25: [
      ['bhīṣma-droṇa iti', 'on “before Bhīṣma and Droṇa”'],
      ['mahī-kṣitāṃ pitāmaha-droṇa-rājñāṃ ca', 'before the grandsire, Droṇa, and the kings who rule the earth'],
      ['pramukhataḥ saṃmukhe', 'directly in front'],
      ['rathaṃ sthāpayitvā', 'having placed the chariot'],
      ['he pārtha', 'O Pārtha'],
      ['etān kurūn paśya', 'behold these Kurus'],
      ['iti uvāca', 'he said']
    ],
    26: [
      ['tataḥ kiṃ pravṛttam', 'what happened then?'],
      ['pitṝn', 'fathers'],
      ['pitṛvyādīn iti arthaḥ', 'meaning paternal uncles and the others'],
      ['putrān pautrān', 'sons and grandsons'],
      ['duryodhanādīnāṃ ye putrāḥ pautrāś ca', 'the sons and grandsons of Duryodhana and the others'],
      ['sakhīn', 'friends'],
      ['mitrāṇi', 'companions'],
      ['suhṛdaḥ', 'well-wishers'],
      ['kṛtopakārān', 'those who had rendered kindness'],
      ['apaśyat', 'he saw']
    ],
    27: [
      ['tataḥ kiṃ kṛtavān', 'then what did he do?'],
      ['tān iti', 'on “those”'],
      ['āviṣṭaḥ', 'pervaded, possessed'],
      ['vyāptaḥ yuktaḥ', 'filled, joined'],
      ['viṣīdan', 'sinking deeply'],
      ['viśeṣeṇa sīdan', 'especially sinking'],
      ['avasādaṃ glāniṃ labhamānaḥ', 'falling into dejection and despondency']
    ],
    28: [
      ['kim abravīt', 'what did he say?'],
      ['dṛṣṭvemam ity-ādi yāvat adhyāya-samāpti', 'from “seeing these” through the end of the chapter'],
      ['he kṛṣṇa', 'O Kṛṣṇa'],
      ['yoddhum icchantaṃ', 'desiring to fight'],
      ['purataḥ samyag avasthitam', 'standing fully before me'],
      ['imaṃ bandhu-janam dṛṣṭvā', 'seeing these kinsmen'],
      ['madīyāni gātrāṇi', 'my limbs'],
      ['kara-caraṇādīni', 'hands, feet, and the rest'],
      ['sīdanti viśīryante', 'give way and grow weak'],
      ['mukhaṃ pari samantāt śuṣyati', 'my mouth dries up completely'],
      ['nirdravī-bhavati', 'it loses all moisture']
    ],
    29: [
      ['kiṃ ca', 'moreover'],
      ['vepathuḥ', 'trembling'],
      ['kampaḥ', 'shaking'],
      ['roma-harṣaḥ', 'horripilation'],
      ['romāñcaḥ', 'the hair standing on end'],
      ['sraṃsate', 'slips, falls'],
      ['nipatati', 'drops'],
      ['paridahyate', 'burns all over'],
      ['sarvataḥ santapyate', 'is scorched on every side']
    ],
    30: [
      ['anyac ca', 'and further'],
      ['na ca iti', 'on “nor”'],
      ['viparītāni nimittāni', 'contrary omens'],
      ['aniṣṭa-sūcakāni śakunāni', 'signs indicating misfortune'],
      ['paśyāmi', 'I see']
    ],
    31: [
      ['kiṃ ca', 'moreover'],
      ['na ca iti', 'on “nor”'],
      ['svajanaṃ', 'one’s own people'],
      ['āhave yuddhe', 'in battle'],
      ['hatvā', 'having killed'],
      ['śreyaḥ phalaṃ na paśyāmi', 'I see no good result']
    ],
    32: [
      ['vijayādikaṃ phalaṃ kiṃ na paśyasi', 'do you not see victory and the other results?'],
      ['na kāṅkṣe iti', 'he answers, “I do not desire them”'],
      ['etad eva prapañcayati', 'he expands this very point'],
      ['kiṃ na iti sārdhābhyām', 'in the verse and a half beginning “What use is kingdom?”'],
      ['yad-artham asmākaṃ rājyādikam apekṣitam', 'those for whose sake kingdom and the rest were desired by us'],
      ['te ete prāṇa-dhanāni tyaktvā', 'these men, having given up life and wealth'],
      ['tyāgam aṅgīkṛtya', 'having accepted sacrifice'],
      ['yuddhārtham avasthitāḥ', 'stand here for battle'],
      ['ataḥ kim asmākaṃ rājyādibhiḥ kṛtyam', 'therefore, what use have we for kingdom and the rest?']
    ],
    33: [
      ['vijayādikaṃ phalaṃ kiṃ na paśyasi', 'do you not see victory and the other results?'],
      ['na kāṅkṣe iti', 'he answers, “I do not desire them”'],
      ['yad-artham asmākaṃ rājyādikam apekṣitam', 'those for whose sake kingdom and the rest were desired by us'],
      ['te ete prāṇa-dhanāni tyaktvā', 'these men, having given up life and wealth'],
      ['yuddhārtham avasthitāḥ', 'stand here for battle'],
      ['ataḥ kim asmākaṃ rājyādibhiḥ kṛtyam', 'therefore, what use have we for kingdom and the rest?']
    ],
    34: [
      ['nanu yadi kṛpayā tvam etān na haṃsi', 'if out of compassion you do not kill them'],
      ['tvām ete rājya-lobhena haniṣyanti eva', 'they will surely kill you out of greed for the kingdom'],
      ['atas tvam eva etān hatvā rājyaṃ bhuṅkṣva', 'therefore kill them and enjoy the kingdom'],
      ['etān na iti sārdhena', 'he answers in the verse and a half beginning “these I do not wish to kill”'],
      ['ghnataḥ api asmān', 'even if they were killing us'],
      ['trailokya-rājyasya api hetoḥ', 'even for the sovereignty of the three worlds'],
      ['tat-prāpty-artham api', 'even for obtaining that'],
      ['ahaṃ hantuṃ na icchāmi', 'I do not wish to kill them'],
      ['kiṃ punaḥ mahī-mātra-prāpty-artham', 'how much less merely for gaining the earth']
    ],
    35: [
      ['nanu yadi kṛpayā tvam etān na haṃsi', 'if out of compassion you do not kill them'],
      ['tvām ete rājya-lobhena haniṣyanti eva', 'they will surely kill you out of greed for the kingdom'],
      ['atas tvam eva etān hatvā rājyaṃ bhuṅkṣva', 'therefore kill them and enjoy the kingdom'],
      ['ghnataḥ api asmān', 'even if they were killing us'],
      ['trailokya-rājyasya api hetoḥ', 'even for the sovereignty of the three worlds'],
      ['ahaṃ hantuṃ na icchāmi', 'I do not wish to kill them'],
      ['kiṃ punaḥ mahī-mātra-prāpty-artham', 'how much less merely for gaining the earth']
    ],
    36: [
      ['agnidaḥ', 'an incendiary'],
      ['garadaḥ', 'a poisoner'],
      ['śastra-pāṇiḥ', 'one attacking with a weapon'],
      ['dhana-apahaḥ', 'a robber of wealth'],
      ['kṣetra-dāra-apahartā', 'a seizer of land or another’s wife'],
      ['ṣaḍ ete hi ātatāyinaḥ', 'these six are aggressors'],
      ['ātatāyināṃ vadhaḥ yuktaḥ eva', 'the killing of aggressors is indeed proper'],
      ['ātatāyinam āyāntaṃ hanyāt eva avicārayan', 'one should kill an approaching aggressor without deliberation'],
      ['na ātatāyi-vadhe doṣaḥ', 'there is no fault in killing an aggressor'],
      ['tatra āha pāpam iti', 'to this he replies with “sin”'],
      ['artha-śāstraṃ dharma-śāstrāt durbalam', 'Arthaśāstra is weaker than Dharmaśāstra'],
      ['smṛtyoḥ virodhe nyāyaḥ tu balavān', 'when two Smṛtis conflict, reasoning is stronger in legal procedure'],
      ['artha-śāstrāt tu balavat dharma-śāstram', 'but Dharmaśāstra is stronger than Arthaśāstra'],
      ['ātatāyinām api eteṣām āryādīnāṃ vadhe', 'even in killing these aggressors who are teachers and other venerable persons'],
      ['asmākaṃ pāpam eva bhavet', 'sin alone would arise for us'],
      ['anyāyyatvāt adharmatvāc ca', 'because such killing is unjust and contrary to dharma'],
      ['na ca iha sukhaṃ syāt', 'nor would there be happiness here']
    ],
    37: [
      ['nanu tava eteṣām api bandhu-vadha-doṣe samāne sati', 'since the fault of killing relatives is the same for you and for them'],
      ['yathā ete bandhu-vadha-doṣam aṅgīkṛtya yuddhe pravartante', 'just as they enter battle accepting that fault'],
      ['tathā eva bhavān api pravartatām', 'so too you should act'],
      ['kim anena viṣādena', 'why this despondency?'],
      ['yadyapi iti dvābhyām', 'he answers in the two verses beginning “although”'],
      ['rājya-lobhena upahataṃ bhraṣṭa-vivekaṃ cetaḥ yeṣām', 'those whose minds are ruined and whose discrimination is corrupted by greed for the kingdom'],
      ['ete duryodhanādayaḥ yadyapi doṣaṃ na paśyanti', 'although Duryodhana and the others do not see the fault'],
      ['tathā api asmābhiḥ doṣaṃ prapaśyadbhiḥ', 'nevertheless, we who clearly see the fault'],
      ['asmāt pāpāt nivartituṃ kathaṃ na jñeyam', 'how could we fail to know that we should turn away from this sin?'],
      ['nivṛttau eva buddhiḥ kartavyā', 'our resolve should be solely to withdraw']
    ],
    40: [
      ['adharmaḥ abhibhavati iti', 'the words “adharma overwhelms”'],
      ['mānasa-doṣa-uktiḥ', 'state the mental fault']
    ],
    41: [
      ['praduṣyanti iti', 'the word “become corrupted”'],
      ['kāyika-doṣa-uktiḥ', 'states the bodily fault']
    ],
    42: [
      ['praduṣyanti iti', 'the word “become corrupted”'],
      ['kāyika-doṣa-uktiḥ', 'states the bodily fault']
    ],
    47: [
      ['etān na hantum icchāmi', '“I do not wish to kill these”'],
      ['yadi mām apratīkāram', '“if they should kill me while I offer no resistance”'],
      ['ity-ādeḥ abhipretam', 'the intention of these and similar statements'],
      ['sarvathā aham iti', 'is expressed by “in every way”'],
      ['sarvathā bahu-prakāram', '“in every way” means in many respects'],
      ['eṣām ātatāyitve api', 'even though they are aggressors'],
      ['idānīṃ hantum udyatatve api', 'even though they are now intent on killing me'],
      ['yuddhāt nivṛtteḥ adharma-akīrtyādi-hetutve api', 'even though withdrawal from battle would cause adharma, infamy, and the like'],
      ['yuddhasya trailokya-rājyādi-upāyatve api', 'even though battle is the means to sovereignty over the three worlds and so on'],
      ['sarveśvareśvareṇa mama hitatama-upadeśinā bhavatā uktatve api', 'even though you, Lord of the Lord of all and my best well-wisher and instructor, have told me to fight'],
      ['bandhu-vināśasya siddhatva-adhyavasāyaḥ', 'the firm conviction that the destruction of relatives is certain'],
      ['śoka-hetuḥ', 'is the cause of grief'],
      ['viṣāda-mātra-paraḥ vā atra śoka-śabdaḥ', 'or here the word “grief” may simply denote despondency'],
      ['sa śokaḥ śara-cāpa-parityāge hetuḥ', 'that grief is the cause of abandoning bow and arrows'],
      ['saṃvigna-mānasaḥ', 'one whose resolve to fight has been greatly shaken'],
      ['vijī bhaya-calanayoḥ iti dhātuḥ', 'the verbal root vij has the senses of fear and trembling'],
      ['sa-śaraṃ cāpaṃ visṛjya', 'having cast aside the bow together with its arrows'],
      ['rathopasthe upāviśat', 'he sat down in the seat of the chariot']
    ]
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const independent = {
    'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ॡ':'ḹ','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ॐ':'oṃ'
  };
  const consonants = {
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
    'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
    'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
  };
  const matras = {'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const marks = {'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','।':' |','॥':' ||','०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'};

  const devaToIast = (input) => {
    const s = String(input || '');
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

  const cleanSrid = (text) => String(text || '')
    .replace(/^\s*[।॥]+\s*\d+(?:\.\d+)?\s*[।॥]*\s*/, '')
    .trim();

  const renderPairs = (pairs) => {
    if (!pairs || !pairs.length) return '<p class="gita-dual-empty">No commentary.</p>';
    return '<p class="gita-wfw-list">' + pairs.map(([term, gloss]) => '<strong>' + esc(term) + '</strong> — ' + esc(gloss)).join('; ') + '.</p>';
  };

  const dualBlock = (gitaHtml, sridHtml) =>
    '<div class="gita-dual-section gita-dual-gita"><div class="gita-dual-label">Bhagavad Gītā</div>' + gitaHtml + '</div>' +
    '<div class="gita-dual-section gita-dual-sridhara"><div class="gita-dual-label">Śrīdhara</div>' + sridHtml + '</div>';

  const enhanceVerse = (article) => {
    if (!article || article.dataset.sridharaTools === '1') return;
    const match = article.id && article.id.match(/gita-1-(\d+)/);
    if (!match) return;
    const verse = Number(match[1]);
    const details = article.querySelectorAll('.gita-details');
    if (details.length < 3) return;

    const wfwReveal = details[0].querySelector('.gita-reveal');
    const transReveal = details[1].querySelector('.gita-reveal');
    const sridTextNode = details[2].querySelector('.gita-reveal p');
    if (!wfwReveal || !transReveal || !sridTextNode) return;

    const gitaWfw = wfwReveal.innerHTML;
    const gitaTrans = transReveal.innerHTML;
    const sridRaw = cleanSrid(sridTextNode.textContent);
    const noCommentary = /^no commentary\.?$/i.test(sridRaw);
    const sridTrans = noCommentary
      ? '<p class="gita-dual-empty">No commentary.</p>'
      : '<p><em>' + esc(devaToIast(sridRaw)) + '</em></p>';

    wfwReveal.innerHTML = dualBlock(gitaWfw, renderPairs(noCommentary ? [] : wfw[verse]));
    transReveal.innerHTML = dualBlock(gitaTrans, sridTrans);
    article.dataset.sridharaTools = '1';
  };

  const enhanceAll = () => root.querySelectorAll('.gita-verse').forEach(enhanceVerse);
  const observer = new MutationObserver(enhanceAll);
  observer.observe(root, {childList:true, subtree:true});
  enhanceAll();
})();