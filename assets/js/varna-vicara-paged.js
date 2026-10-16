(()=>{
const base='/advaita/articles/varna-vicara/';
const pages=[
{id:'introduction',file:'preface.html',parent:'Preface',title:'Introduction',stop:'remark-1'},
{id:'remark-1',file:'preface.html',parent:'Preface',title:'Remark on Ācārya Consensus',kind:'remark'},
{id:'remark-2',file:'preface.html',parent:'Preface',title:'Remark on Paramparā and Circular Reasoning',kind:'remark'},
{id:'purvapaksha-position',file:'purvapaksha.html',parent:'Pūrvapakṣa',title:'Position and pramāṇas',stop:'remark-3'},
{id:'remark-3',file:'purvapaksha.html',parent:'Pūrvapakṣa',title:'Remark on Birth-Based Brāhmaṇa Privileges',kind:'remark'},
{id:'rejection-universal',file:'rejection.html',parent:'Pūrvapakṣa',title:'Refutation of Pūrvapakṣa',stop:'vishvamitra'},
{id:'vishvamitra',file:'rejection.html',parent:'Bhaviṣya Purāṇa on Varṇa',title:'Viśvāmitra, mlecchas and śūdras',stop:'remark-4'},
{id:'remark-4',file:'rejection.html',parent:'Bhaviṣya Purāṇa on Varṇa',title:'Remark on the Fast to Become a Brāhmaṇa',stop:'jati-distinctions',kind:'remark-heading'},
{id:'jati-distinctions',file:'rejection.html',parent:'Bhaviṣya Purāṇa on Varṇa',title:'Rejection of jāti-distinctions'}
];
const byId=new Map(pages.map(x=>[x.id,x]));
const aliases=new Map([['preface','introduction'],['purvapaksha','purvapaksha-position'],['rejection','vishvamitra']]);
const params=new URLSearchParams(location.search);
let id=params.get('section')||location.hash.slice(1)||'introduction';
id=aliases.get(id)||id;
const current=byId.get(id)||pages[0],index=pages.indexOf(current);
if(location.hash||params.get('section')!==current.id){
  const u=new URL(location.href);u.hash='';
  current.id==='introduction'?u.searchParams.delete('section'):u.searchParams.set('section',current.id);
  history.replaceState(null,'',u.pathname+u.search);
}
const root=document.getElementById('source-content'),parent=document.getElementById('section-parent'),count=document.getElementById('section-count');
if(parent)parent.textContent=current.parent;
if(count)count.textContent=`Section ${index+1} of ${pages.length}`;
document.title=`${current.title} — Varṇa-vicāra — Viveka Dṛṣṭi`;
document.querySelectorAll('.toc a[data-section]').forEach(a=>{
  const on=a.dataset.section===current.id;
  a.classList.toggle('is-active',on);
  on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');
});
const href=p=>p?(p.id==='introduction'?base:`${base}?section=${encodeURIComponent(p.id)}`):'';
const pager=(el,p,label)=>{
  if(!el)return;
  if(!p){el.classList.add('disabled');el.removeAttribute('href');el.innerHTML=`<small>${label}</small>`;return}
  el.classList.remove('disabled');el.href=href(p);el.innerHTML=`<small>${label}</small>${p.title}`;
};
pager(document.getElementById('page-prev'),pages[index-1],'Previous');
pager(document.getElementById('page-next'),pages[index+1],'Next');

const bindSanskrit=scope=>scope.querySelectorAll('details.sanskrit-reveal').forEach(d=>{
  const s=d.querySelector(':scope>summary');if(!s)return;
  const sync=()=>s.textContent=d.open?'Hide Sanskrit':'Show Sanskrit';
  d.addEventListener('toggle',sync);sync();
});

const remarkSection=(source,page)=>{
  const section=document.createElement('section');section.className='remark-section plain-remark';section.id=page.id;
  const h=document.createElement('h3');h.className='remark-label';h.textContent=page.title;section.appendChild(h);
  if(source.matches('details')) [...source.children].filter(n=>!n.matches('summary')).forEach(n=>section.appendChild(n.cloneNode(true)));
  else{
    let n=source.nextSibling;
    while(n){if(n.nodeType===1&&page.stop&&n.id===page.stop)break;section.appendChild(n.cloneNode(true));n=n.nextSibling}
  }
  if(page.id==='remark-4'){
    const p=section.querySelector('p');
    if(p)p.innerHTML='Vishvamitra was not born a Brahmin or Brahmin-Jati. In some stories he does a long period of Tapas <strong>by which</strong> he attained Brahminhood. In this story too he does a long time of tapas, but that is stated to have been useless. Only by performing this fast for a year he attained Brahminhood. A basic understanding of the Vishvamitra story tells us that he became a true Brahmin due to the attainment of ritual rights etc. The Purana states that Mlecchas and Shudras can also do this fast to attain Brahminhood. We should understand it to be in the same sense as Vishvamitra.';
  }
  return section;
};
const extract=(frag,page)=>{
  const start=frag.querySelector(`#${CSS.escape(page.id)}`);
  if(!start)throw Error(`Missing ${page.id}`);
  if(page.kind==='remark'||page.kind==='remark-heading')return[remarkSection(start,page)];
  const out=[start.cloneNode(true)];let n=start.nextSibling;
  while(n){if(n.nodeType===1&&page.stop&&n.id===page.stop)break;out.push(n.cloneNode(true));n=n.nextSibling}
  if(page.id==='rejection-universal'&&out[0])out[0].textContent='Refutation of Pūrvapakṣa';
  return out;
};

const literalTranslations={
'bp-1-40-3':`Is jāti superior, O hero, or is karma better? Seeing the son of the Kṛttikās, this great doubt has arisen for me.`,
'bp-1-40-4':`Decide this and tell it so that no doubt remains: of birth and karma, tell me which is greater.`,
'bp-1-40-8':`The ṛṣis said: O Brahmā, tell us what brāhmaṇya is among jāti, study, body, self, saṃskāra, ācāra and karma.`,
'bp-1-40-10':`Those well-known things which are said to establish distinctions of jāti should be abandoned when they are not ascertained as real things by perception or by the other pramāṇas.`,
'bp-1-40-11':`If the rule of human jāti-distinctions is said to be established by an unspecified āgama, this alternative does not strengthen the force of your reasoning.`,
'bp-1-40-12':`Brahmā said: It is as you say; there is no doubt. Hear, O yogins, a statement accompanied by tarka, for the good of the disciples.`,
'bp-1-40-19':`If jāti — brāhmaṇatva and the rest — inheres in a person, then the difference of the two varṇa-jātis should be apprehended as an object of perception.`,
'bp-1-40-20':`Just as a horse that has entered the middle of a herd of cows is distinguished by those who know, so, being undifferentiated in human nature, a dvija is not distinct in that way from a group of śūdras.`,
'bp-1-40-21':`There is no further distinguishing feature beyond manuṣya-jāti which accompanies every man. Saṃskāra together with distinctive kriyā is the cause of the discrimination between the twice-born and śūdras.`,
'bp-1-40-25':`Immersed and tossed about in the terrible ocean of saṃsāra, overcome by the burden of much pāpa — how is that jīva a brāhmaṇa?`,
'bp-1-40-26':`Brahmā said: Manu related the account of the seven hunters. Hearing it, O best of the Yadus, one should always abandon the jāti-designation.`,
'bp-1-40-29':`Therefore we do not see brāhmaṇya in the jīva in any way.`,
'bp-1-40-31':`No such brāhmaṇa-jāti is found among human beings: there is no permanent form, no subordinate distinctive form by which an ultimate difference could be established here; nor is there a lasting bodily colour-difference of an exclusive kind such as whiteness and the like.`,
'bp-1-40-32':`This brāhmaṇya is unfixed (adhruva), because it is kṛtrima. The transmitted first line then reads “akṛtrimaṃ bhavati sāmayikatvayogāt.” It is sāṅketika, obtained through a particular measure of merit, like the jāti-distinctions of merchants and physicians.`,
'bp-1-40-33':`Are those who abandon good action brāhmaṇas? Are those who do not protect the people kṣatriyas? Likewise, are those without their own dharma vaiśyas, and those without their principal work śūdras?`,
'bp-1-40-34':`Therefore there is no jāti-difference among embodied human beings like that between a cow and a horse. The saṅketa is kṛtrima and has capacity for work as its cause.`,
'bp-1-40-35':`Thus, although this conventional arrangement is being refuted by the pramāṇas, a man resorts to it. The poor, confused man does not understand that what he takes to be established is rejected by his own views.`,
'bp-1-40-44':`Therefore no jāti remains inseparably in an embodied being. Because it is destructible, people recite verses on this matter.`,
'bp-1-40-47':`A śūdra attains brāhmaṇatā, and a brāhmaṇa attains śūdratā. A kṣatriya attains vipratva; understand the same of a vaiśya.`,
'bp-1-41-8':`The Vedas do not purify one who is without ācāra, even when they have been studied together with the six limbs. For the twice-born, Vedic study is a skill; vṛtta is remembered as the lakṣaṇa of a brāhmaṇa.`,
'bp-1-41-12':`Therefore yajñopavīta, saṃskāra, girdle, topknot and the rest are not observed as intrinsically distinctive marks among men.`,
'bp-1-41-15':`Deceit and harsh speech are practised by all human beings. Therefore no difference whatever exists between śūdra and brāhmaṇa on that ground.`,
'bp-1-41-18':`Do not suppose that this occurs only in the Kali age, in this country, or in a dvija who acts wrongly; it may occur among eminent dvijas in other places and times as well.`,
'bp-1-41-19':`Some say that the power to curse and bless, or some other spiritual capacity serving the attainment of Brahman, is the distinguishing sign.`,
'bp-1-41-21':`Is jāti-dharma itself some particular viśeṣa produced through connection with śruti, unestablished among śūdra-jātis but established among vipra-jātis?`,
'bp-1-41-22':`Is it a saṃskāra dependent on the womb, or something produced from a complete causal complex? What common property gives an excellence over śūdras?`,
'bp-1-41-23':`Then learned men would have to imagine a fivefold division among vipras. No viśeṣa born of jāti or of the three Vedas stands, because it is blocked by reasoning. Ordered and unordered rites concern what is not a permanent thing.`,
'bp-1-41-24':`A permanent entity is not a cause, because it is devoid of activity. If some particular Vedic factor is the cause, then because that factor remains present, the effect ought absurdly to be seen even when the proper time has passed.`,
'bp-1-41-26':`If connection with Brahman is kṛtrima through a special property of study, then that excellence belongs to the person who possesses it; it cannot rest on some other basis.`,
'bp-1-41-27':`Is this brāhmaṇya that is intended something visible by nature, or is its form unseen? If it were visible it would be perceived by everyone; otherwise there would be no ascertainment of it.`,
'bp-1-41-28':`To posit some supreme distinction residing in the body of a “god on earth,” because a causal complex is absent in others, and thereby to posit merit and demerit in the self — this has been stated without justification.`,
'bp-1-41-29':`Since śūdras may be complete in the same causal materials, observances and qualities as dvijas, the distinction denoted by “dvija” and “śūdra” is neither an inward spiritual distinction nor one caused by an external mark.`,
'bp-1-41-30':`If that excellence were from saṃskāra, it would belong to every person who is highly saṃskṛta. One who is saṃskṛta as foremost among vipras, such as Vyāsa and others, would then admit of no equality.`,
'bp-1-41-31':`Causality does not fit jāti and the other proposed factors. Since jāti is unproduced, study does not produce a new viśeṣa in it.`,
'bp-1-41-32':`No inward difference is reached, because there is no superior saṃskāra and because the bodies of all are material, composed from the same elements.`,
'bp-1-41-34':`Excellence in dharma is seen even among people whose outward conduct lies outside what the Veda prescribes, among cruel and violent people and others. Therefore that excellence in vipras is not produced by the causal complex of jāti and the rest.`,
'bp-1-41-35':`Therefore no distinction exists either outside or in the inner self — not in pleasure and the like, not in power, not in ignorance, nor in fearlessness.`,
'bp-1-41-36':`Nor in strength, form, senses, occupation, lifespan, bodily nourishment, weakness, steadiness or restlessness.`,
'bp-1-41-37':`Nor in intelligence, dispassion, dharma, courage, the three aims, skill, appearance or medicine.`,
'bp-1-41-38':`Nor in the womb, movement, bodily impurities, openings of the bones, affection, bodily measure or hair.`,
'bp-1-41-39':`Even when sought with effort, a difference between śūdra and brāhmaṇa is not perceived in all these properties, even by the gods assembled together.`,
'bp-1-41-41':`Brāhmaṇas are not white like moonbeams; kṣatriyas are not the colour of kiṃśuka flowers; vaiśyas are not like yellow orpiment; śūdras are not the colour of charcoal.`,
'bp-1-41-42':`They are alike in gait, bodily colour, hair, pleasure and pain, blood, skin, flesh, fat, bones and bodily fluids. How then are there four divisions?`,
'bp-1-41-43':`There is no viśeṣa made by jāti in colour, measure, form, gestation, speech, intelligence, action, senses, life, strength, the three aims, disease or medicine.`,
'bp-1-41-44':`There is one and the same Lord of creatures here; how then is there a division made by jāti? When examined by pramāṇa, example, reasoning and established teaching, it falls apart.`,
'bp-1-41-45':`Four sons of one father have one jāti, and so do their sons. In the same way there is one father of creatures; because the father is one, there is no jāti-bheda.`,
'bp-1-41-46':`The fruits of one udumbara tree, whether they grow at the top, middle or bottom, are alike in colour, form, touch and taste. In the same way, jāti should be considered as one.`,
'bp-1-41-48':`The gotras and jātis are of many kinds, with relations through marriage, intercourse and children. Marriage is an act, not a varṇa-difference, and every occupation occurs among them.`,
'bp-1-41-49':`Other learned men say that the body itself has brāhmaṇatā. Out of compassion, the darkness of their wrong view is to be removed.`,
'bp-1-41-50':`With the divine medicinal collyrium of nyāya, bringing happiness in its result, we carefully bring them to clear sight.`,
'bp-1-41-51':`Because the body is mortal it is perishable. Since it is perishable, like other material things, brāhmaṇya cannot be posited in what is based in the body.`,
'bp-1-41-52':`No single one of its parts possesses brāhmaṇya, nor does the collection of many parts; otherwise there is an over-extension of the consequence.`,
'bp-1-41-53':`Bodies arise from particular transformations of earth, water, air and fire. If the body were the ground, brāhmaṇatva would follow for all embodied beings.`,
'bp-1-41-54':`Those who do not know the truth posit brāhmaṇatva of the body. The second half of the transmitted verse says: “for those who prepare/transform the body, brahmatā would not arise.”`,
'bp-1-41-55':`When it is carefully sought in the body, it is not found. Therefore brāhmaṇya is neither in the body nor constituted by the body.`,
'bp-1-41-56':`If you admit vipratva of the body, the same consequence follows for degraded varṇa-groups, caṇḍālas, dog-eaters and others.`,
'bp-1-41-57':`The powers and qualities of the body decay, and the body comes to the state of ash and the like. Therefore this brāhmaṇya is not something constituted by the body.`,
'bp-1-42-5':`Knowing that in the turning of saṃsāra there are countless jātis — low, high and middling — what wise person would take pride in jāti?`,
'bp-1-42-6':`Through the force of karma a being passes through many different jātis, each preceded by the cessation of a previous set of senses. Whose jāti, then, remains one and permanent?`,
'bp-1-42-7':`If someone in an assembly of learned men says that one becomes a brāhmaṇa through saṃskāra, those who know nyāya should refute him with statements that follow nyāya.`,
'bp-1-42-16':`A person who has undergone saṃskāra but has bad ācāra goes to hell. A person without saṃskāra but with good ācāra may be a foremost vipra.`,
'bp-1-42-18':`Since falling is possible, one is certainly separated from brāhmaṇya through attachment to bad observance.`,
'bp-1-42-19':`Has this actually been seen anywhere, or is it a view distorted by rivalry? If you venture to assert even what has not been seen, then say so.`,
'bp-1-42-20':`Vyāsa and other excellent sages practised ācāra while clearly lacking the full collection of saṃskāras beginning with garbhādhāna.`,
'bp-1-42-21':`They became foremost vipras, attained splendour, and were honoured by all the worlds. Many examples are told; hear a few.`,
'bp-1-42-24':`The royal sage Māṇḍavya arose from a frog's womb. Many others too are said to have attained vipratva as described above.`,
'bp-1-42-26':`The great sage Ṛṣyaśṛṅga, born from a doe's womb, became a brāhmaṇa through tapas. The printed text then says: saṃskāras tena kāraṇam — “saṃskāra is therefore the cause.”`,
'bp-1-42-27':`O king, Vyāsa's father, born from a śvapākī womb, became a brāhmaṇa through tapas. The printed text again says: “saṃskāra is therefore the cause.”`,
'bp-1-42-28':`The great sage named Kaṇāda, born from an owl's womb, became a brāhmaṇa through tapas. The printed text again says: “saṃskāra is therefore the cause.”`,
'bp-1-42-29':`The great sage Vasiṣṭha, born from a courtesan's womb, became a brāhmaṇa through tapas. The printed text again says: “saṃskāra is therefore the cause.”`,
'bp-1-42-30':`The great sage Mandapāla, born from a boatwoman's womb, became a brāhmaṇa through tapas. The printed text again says: “saṃskāra is therefore the cause.”`,
'bp-1-42-32':`Since brahma withdraws from great sinners even though their bodies have received saṃskāra, they know it as sāṅketika.`,
'bp-1-43-1':`Brahmā said: You who know the Vedic mantras are to be asked this further question: in whose saṃskāra do you apprehend a viśeṣa?`,
'bp-1-43-2':`Is it in the body — which remains impure by nature, produced from semen and blood like a worm arising from filth?`,
'bp-1-43-4':`I reject this position with regard to uncontrolled men whose hidden mind, body and speech are corrupt despite outwardly proper acts.`,
'bp-1-43-9':`Those lowest brāhmaṇas ruined by corrupt acts of speech, mind and body do not reach purity even through a hundred sacrifices.`,
'bp-1-43-11':`Therefore mantra, agnihotra and even the killing of an animal at the altar are not causes of vipratva, since such an act is possible for śūdras.`,
'bp-1-43-15':`Śūdras, vipras and the rest do not differ from one another in yoni. Because the common properties are the same, saṃskāra and the like are without force as an intrinsic distinction.`,
'bp-1-43-17':`They are alike in intelligence, power, svabhāva, properties, jāti, prosperity, duties, merit and demerit, and the conditions that belong to every body.`,
'bp-1-43-40':`But cows, horses, camels and elephants, which are distinct by jāti and the like, do not produce pregnancy in a different jāti even when seeking pleasure.`,
'bp-1-43-45':`No such division exists in sexual union between human men and women. By this, the supposed difference between dvija and śūdra is plainly worn away.`,
'bp-1-43-50':`Therefore this division among human beings is made by the force of saṅketa.`,
'bp-1-43-52':`Others fall from brāhmaṇya through the commission of great sins. Therefore this conception of jāti and the rest is a false construction (vyalīka-kalpanā).`,
'bp-1-44-11':`Knowers of Brahman say that brāhmaṇya belongs to those who are devoted to ācāra.`,
'bp-1-44-15':`For human beings who practise such ācāra, their brāhmaṇya continually increases greatly.`,
'bp-1-44-19':`The Lord established boundaries among human beings according to the activities they undertook.`,
'bp-1-44-20':`Those men who protect people from harm came to be known as kṣatriyas.`,
'bp-1-44-21':`Those who speak truth and Brahman, and who are devoted to Brahman, are remembered as brāhmaṇas.`,
'bp-1-44-22':`Those engaged in agriculture and the means of livelihood are remembered as vaiśyas.`,
'bp-1-44-23':`Those devoted to service and attendant work are remembered as śūdras.`,
'bp-1-44-24':`The karmas were divided according to the guṇas arising from svabhāva.`,
'bp-1-44-28':`Yoga, tapas, compassion, giving, truth, dharma, śruti, moral aversion to wrong, jñāna, vijñāna and āstikya — this is the lakṣaṇa of a brāhmaṇa.`,
'bp-1-44-29':`The śikhā is made of knowledge; the sacred purifier is made of tapas. One who has these is said to possess brāhmaṇya in abundance.`,
'bp-1-44-30':`In whatever varṇa — high, low or middle — one who has turned away from sinful karma is prescribed as a brāhmaṇa.`,
'bp-1-44-31':`Even a śūdra endowed with śīla may be superior to a brāhmaṇa; a brāhmaṇa who has lost ācāra may be lower than a śūdra.`
};

const translationNotes={
'bp-1-40-26':`Here nityam is the adverb “always/continually.” It does not mean “eternal jāti.” Jāti-padam is left close to the Sanskrit rather than expanded into a doctrine the verse does not literally state.`,
'bp-1-40-32':`The printed Sanskrit is difficult: it has kṛtrimatvād akṛtrimaṃ bhavati, without a printed na. I have not silently supplied a negation. The secure words are adhruva (“unfixed/not permanent”), kṛtrima, sāmayika and sāṅketika.`,
'bp-1-41-23':`Sanātana here modifies vastu in the final pāda. I have not used “eternal” for every occurrence of nitya/nityam elsewhere.`,
'bp-1-41-54':`The printed Sanskrit explicitly has na brahmatā bhavet. The older English on the source page omitted this negative. The syntax of saṃskartṝṇāṃ śarīrasya is difficult, so the translation remains deliberately close to the words.`,
'bp-1-42-26':`There is no na in saṃskāras tena kāraṇam. The older English inserted “not.” I have not repeated that insertion. The line is textually/contextually difficult because the preceding half says he became a brāhmaṇa through tapas.`,
'bp-1-42-27':`Same textual point: the printed Sanskrit has saṃskāras tena kāraṇam, not “saṃskāra was not the cause.”`,
'bp-1-42-28':`Same textual point: no negative particle is printed.`,
'bp-1-42-29':`Same textual point: no negative particle is printed.`,
'bp-1-42-30':`Same textual point: no negative particle is printed.`
};

const jatiArguments=[
{title:'The question is jāti or karma',context:`Śatānīka asks the question directly. The discussion then asks what brāhmaṇya actually rests on: jāti, study, body, self, saṃskāra, ācāra or karma.`,refs:['bp-1-40-3','bp-1-40-4','bp-1-40-8','bp-1-40-10','bp-1-40-11','bp-1-40-12'],label:'Bhaviṣya Purāṇa 1.40.3–4, 8, 10–12',argument:`The text does not start by assuming a hereditary distinction. It asks for its pramāṇa and then says the answer will be satarka — accompanied by reasoning.`},
{title:'If jāti is real, it should be perceptible',context:`The first test is simple: if brāhmaṇa and śūdra are different natural jātis, where is the perceptible difference?`,refs:['bp-1-40-19','bp-1-40-20','bp-1-40-21'],label:'Bhaviṣya Purāṇa 1.40.19–21',argument:`A horse remains recognisably different among cows. The text says no comparable mark separates a dvija from śūdras as human beings. It names manuṣya-jāti as the common jāti and then points to saṃskāra and kriyā for the practical distinction.`},
{title:'Brāhmaṇya is not in the jīva',context:`The next possibility is that brāhmaṇya belongs to the jīva rather than the visible body. The seven-hunters story is brought in against that view.`,refs:['bp-1-40-22','bp-1-40-25','bp-1-40-26','bp-1-40-27','bp-1-40-28','bp-1-40-29'],label:'Bhaviṣya Purāṇa 1.40.22, 25–29',argument:`The same jīva moves through different births and later appears as a Veda-knowing brāhmaṇa. The conclusion is explicit: brāhmaṇya is not found in the jīva itself.`},
{title:'There is no fixed human form like the difference between animals',context:`The text compares human varṇa with animal kinds which really do have stable distinguishing marks.`,refs:['bp-1-40-30','bp-1-40-31','bp-1-40-32','bp-1-40-33','bp-1-40-34','bp-1-40-35'],label:'Bhaviṣya Purāṇa 1.40.30–35',argument:`No fixed bodily form or colour is found for a human brāhmaṇa-jāti. The text calls the arrangement sāṅketika and kṛtrima and says the saṅketa depends on capacity for work.`},
{title:'The status can be lost and attained',context:`The passage then uses loss of status as another test. Gotra, saṃskāra and Vedic learning do not make brāhmaṇya impossible to lose.`,refs:['bp-1-40-42','bp-1-40-43','bp-1-40-44','bp-1-40-45','bp-1-40-46','bp-1-40-47'],label:'Bhaviṣya Purāṇa 1.40.42–47',argument:`Bad conduct and certain occupations are said to cause a fall; the sequence then states in plain words that a śūdra can attain brāhmaṇatā and a brāhmaṇa śūdratā.`},
{title:'Veda-study alone is not the lakṣaṇa',context:`Chapter 41 asks whether Vedic learning itself gives a reliable hereditary distinction.`,refs:['bp-1-41-1','bp-1-41-2','bp-1-41-3','bp-1-41-4','bp-1-41-5','bp-1-41-6','bp-1-41-7','bp-1-41-8','bp-1-41-9'],label:'Bhaviṣya Purāṇa 1.41.1–9',argument:`The sharp line is 1.41.8: Veda-study is called a śilpa, while vṛtta — conduct — is remembered as the brāhmaṇa-lakṣaṇa.`},
{title:'Thread, śikhā and saṃskāra are not an intrinsic difference',context:`The text next checks the obvious external signs of dvija status.`,refs:['bp-1-41-10','bp-1-41-11','bp-1-41-12'],label:'Bhaviṣya Purāṇa 1.41.10–12',argument:`Because these signs can also occur among śūdras, they cannot by themselves prove an intrinsic difference in the person.`},
{title:'Mantra-power is not the difference either',context:`Another proposed sign is special mantra-power, the ability to curse or bless, or some other spiritual capacity. The discussion does not stop at verse 17; it also answers the attempt to restrict the problem to Kali-yuga or bad dvijas.`,refs:['bp-1-41-13','bp-1-41-14','bp-1-41-15','bp-1-41-16','bp-1-41-17','bp-1-41-18','bp-1-41-19','bp-1-41-20'],label:'Bhaviṣya Purāṇa 1.41.13–20',argument:`The power is linked to tapas, satya and other qualities, not to a birth-mark. Verse 18 also blocks the reply that the examples are only a Kali-yuga degeneration.`},
{title:'Visible or invisible? Produced or unproduced?',context:`Now the argument gets more technical. It asks where the proposed viśeṣa comes from and what kind of thing it is.`,refs:['bp-1-41-21','bp-1-41-22','bp-1-41-23','bp-1-41-24','bp-1-41-25','bp-1-41-26','bp-1-41-27','bp-1-41-28','bp-1-41-29','bp-1-41-30','bp-1-41-31','bp-1-41-32'],label:'Bhaviṣya Purāṇa 1.41.21–32',argument:`If it is visible, everybody should perceive it. If study or saṃskāra produces the excellence, it belongs wherever that cause is present. If jāti is unproduced, study cannot newly produce a distinction in it. The body itself is common material.`},
{title:'The difference cannot be found inside or outside',context:`The passage then searches through the proposed places where a natural difference could show itself.`,refs:['bp-1-41-33','bp-1-41-34','bp-1-41-35','bp-1-41-36','bp-1-41-37','bp-1-41-38','bp-1-41-39','bp-1-41-40'],label:'Bhaviṣya Purāṇa 1.41.33–40',argument:`It goes through strength, body, senses, occupation, lifespan, intelligence, dharma, womb, bodily measures and other properties. Verse 39 says that, even when sought carefully, the śūdra–brāhmaṇa difference is not perceived in these dharmas.`},
{title:'The colour theory is explicitly rejected',context:`The next verses are too direct to bury inside a general summary. They reject fixed varṇa-colours and then list ordinary human features which are shared.`,refs:['bp-1-41-41','bp-1-41-42','bp-1-41-43','bp-1-41-44','bp-1-41-45','bp-1-41-46'],label:'Bhaviṣya Purāṇa 1.41.41–46',argument:`Verse 43 says there is no jāti-kṛta viśeṣa in the listed bodily and mental features. The one-father and udumbara-tree comparisons then press the same point in simpler language.`},
{title:'Gotra and marriage do not create a natural varṇa difference',context:`The text lists many gotras and then turns to marriage, kinship and occupation.`,refs:['bp-1-41-47','bp-1-41-48'],label:'Bhaviṣya Purāṇa 1.41.47–48',argument:`Its point is not that gotra disappears, but that gotra, marriage and occupation do not amount to a separate natural human species.`},
{title:'Where is brāhmaṇya in the body — in a part or in the whole?',context:`This is the whole-and-parts argument. Some learned men are said to place brāhmaṇatā in the body itself, and the text answers them with nyāya.`,refs:['bp-1-41-49','bp-1-41-50','bp-1-41-51','bp-1-41-52','bp-1-41-53','bp-1-41-54','bp-1-41-55','bp-1-41-56','bp-1-41-57'],label:'Bhaviṣya Purāṇa 1.41.49–57',argument:`Verse 52 asks the exact question: no single bodily part has brāhmaṇya, but neither can it simply be put in the aggregate without an atiprasaṅga. Verse 55 then says that, when sought in the body, it is not found.`},
{title:'Jāti changes through saṃsāra',context:`Chapter 42 turns to rebirth. A single jīva passes through many jātis according to karma.`,refs:['bp-1-42-2','bp-1-42-3','bp-1-42-4','bp-1-42-5','bp-1-42-6','bp-1-42-7'],label:'Bhaviṣya Purāṇa 1.42.2–7',argument:`Here the text really does use śāśvatī in 1.42.6: “whose jāti remains one and permanent?” It then tells nyāya-knowers to answer the claim that saṃskāra by itself makes a brāhmaṇa.`},
{title:'Saṃskāra does not save bad conduct',context:`The next verses compare saṃskāra with knowledge, discipline and ācāra.`,refs:['bp-1-42-8','bp-1-42-9','bp-1-42-10','bp-1-42-11','bp-1-42-12','bp-1-42-13','bp-1-42-14','bp-1-42-15','bp-1-42-16','bp-1-42-17','bp-1-42-18','bp-1-42-19'],label:'Bhaviṣya Purāṇa 1.42.8–19',argument:`The strongest line is 1.42.16: a saṃskṛta man of bad ācāra goes to hell, while a niḥsaṃskāra man of good ācāra may be a foremost vipra. Verse 18 again says falling from brāhmaṇya is possible.`},
{title:'The sages are given as counterexamples',context:`The Purāṇa itself then gives named cases to show why garbhādhāna and the inherited saṃskāra-chain cannot be treated as an absolute prerequisite.`,refs:['bp-1-42-20','bp-1-42-21','bp-1-42-22','bp-1-42-23','bp-1-42-24','bp-1-42-25'],label:'Bhaviṣya Purāṇa 1.42.20–25',argument:`Whatever one thinks historically of each birth-story, this is the use the Purāṇa makes of them in its own argument: it calls these figures viprottamāḥ while saying they lacked the normal sequence beginning with garbhādhāna.`},
{title:'The tapas verses — and a problem in the old translation',context:`The following five verses repeat the same formula for Ṛṣyaśṛṅga, Parāśara, Kaṇāda, Vasiṣṭha and Mandapāla.`,refs:['bp-1-42-26','bp-1-42-27','bp-1-42-28','bp-1-42-29','bp-1-42-30','bp-1-42-31','bp-1-42-32'],label:'Bhaviṣya Purāṇa 1.42.26–32',argument:`The old English on the source page inserted “not” into saṃskāras tena kāraṇam. The Sanskrit printed on the page has no na. I have therefore left the line literal and marked the difficulty instead of forcing it to say what the argument seems to want.`},
{title:'Rites do not make a bad man intrinsically different',context:`Chapter 43 opens by asking whose saṃskāra actually produces the alleged viśeṣa. It then contrasts outward rite with mind, speech and bodily conduct.`,refs:['bp-1-43-1','bp-1-43-2','bp-1-43-3','bp-1-43-4','bp-1-43-5','bp-1-43-6','bp-1-43-7','bp-1-43-8','bp-1-43-9','bp-1-43-10','bp-1-43-11'],label:'Bhaviṣya Purāṇa 1.43.1–11',argument:`The conclusion at 1.43.11 is plain: mantra, agnihotra and ritual acts are not themselves the cause of vipratva.`},
{title:'Same birth-source and mixed dharmas',context:`The text next looks at human birth and at the actual distribution of qualities.`,refs:['bp-1-43-14','bp-1-43-15','bp-1-43-16','bp-1-43-17'],label:'Bhaviṣya Purāṇa 1.43.14–17',argument:`It says śūdras, vipras and the rest do not differ in yoni and that their dharmas are found mixed. This is another attack on an intrinsic birth-species distinction, not a claim that every social rule is identical.`},
{title:'The reproductive argument',context:`The Purāṇa then tests human varṇa against a biological sign of genuinely different animal jātis: reproductive separation.`,refs:['bp-1-43-37','bp-1-43-38','bp-1-43-39','bp-1-43-40','bp-1-43-41','bp-1-43-42','bp-1-43-43','bp-1-43-44','bp-1-43-45'],label:'Bhaviṣya Purāṇa 1.43.37–45',argument:`Cows, horses, camels and elephants do not reproduce across those species-lines. Human dvija and śūdra do not show that kind of reproductive division. Verse 45 states the conclusion explicitly.`},
{title:'The division is said to be made by saṅketa',context:`After the reproductive argument, the text returns to the status itself.`,refs:['bp-1-43-46','bp-1-43-47','bp-1-43-48','bp-1-43-49','bp-1-43-50','bp-1-43-51','bp-1-43-52'],label:'Bhaviṣya Purāṇa 1.43.46–52',argument:`Verse 50 calls the human division saṅketa-bala-nirmita — made by the force of convention/designation. Verse 52 calls the jāti-conception a vyalīka-kalpanā after again noting that one can fall from brāhmaṇya.`},
{title:'How the text then describes a brāhmaṇa',context:`Chapter 44 is the constructive side. Instead of ending with “there is no difference,” it gives a long list of what it calls brāhmaṇa conduct and qualities.`,refs:['bp-1-44-1','bp-1-44-2','bp-1-44-3','bp-1-44-4','bp-1-44-5','bp-1-44-6','bp-1-44-7','bp-1-44-8','bp-1-44-9','bp-1-44-10','bp-1-44-11','bp-1-44-12','bp-1-44-13','bp-1-44-14','bp-1-44-15'],label:'Bhaviṣya Purāṇa 1.44.1–15',argument:`The repeated centre of gravity is ācāra, restraint, knowledge and qualities. At 1.44.15 brāhmaṇya is even said to increase through the practice of such ācāra.`},
{title:'Varṇa by svabhāva, guṇa, karma, śīla and ācāra',context:`The chapter finally explains the four names through activity and then gives their characteristic qualities and work.`,refs:['bp-1-44-19','bp-1-44-20','bp-1-44-21','bp-1-44-22','bp-1-44-23','bp-1-44-24','bp-1-44-25','bp-1-44-26','bp-1-44-27','bp-1-44-28','bp-1-44-29','bp-1-44-30','bp-1-44-31','bp-1-44-32','bp-1-44-33'],label:'Bhaviṣya Purāṇa 1.44.19–33',argument:`The closing statements are especially clear: karmas are divided by guṇas arising from svabhāva; a brāhmaṇa-lakṣaṇa is listed; and a śūdra with śīla may be superior to a brāhmaṇa who has lost ācāra.`}
];

const intro=()=>{
  const d=document.createElement('div');
  d.innerHTML=`<p>The earlier draft left out too much of this discussion. Here I have kept the portions of <em>Bhaviṣya Purāṇa</em> 1.40–44 which actually bear on jāti, brāhmaṇya, saṃskāra and the marks by which a varṇa is supposed to be known. Ritual and narrative material which does not affect the argument is left out. Where several verses make one argument, they are quoted together.</p>
<p class="translation"><strong>Translation note.</strong> The tarka passages below have been retranslated closely from the Sanskrit. I often leave terms such as <em>jāti</em>, <em>brāhmaṇya</em>, <em>saṃskāra</em>, <em>ācāra</em>, <em>pramāṇa</em> and <em>nyāya</em> untranslated where an English substitute would decide the question too early. In 1.40.26, <em>nityam</em> is the adverb “always,” not “eternal jāti.” Difficult readings are marked instead of silently repaired.</p>`;
  return d;
};

const verseData=(doc,id)=>{
  const h=doc.getElementById(id);if(!h)throw Error(`Missing ${id}`);
  const sec=h.closest('section');if(!sec)throw Error(`Missing section for ${id}`);
  const sa=sec.querySelector('div[lang^="sa"]');
  const ps=[...sec.querySelectorAll(':scope > p')];
  const sourceTranslation=ps[0]?.textContent.trim()||'';
  return {id,ref:id.replace('bp-','').replaceAll('-', '.'),sanskrit:sa?.innerHTML||'',translation:literalTranslations[id]||sourceTranslation,note:translationNotes[id]||''};
};

const passage=(doc,item)=>{
  const verses=item.refs.map(id=>verseData(doc,id));
  const wrap=document.createElement('div');wrap.className='bp-argument-passage';
  const ref=document.createElement('p');ref.className='reference';ref.textContent=item.label;wrap.appendChild(ref);
  const details=document.createElement('details');details.className='sanskrit-reveal';
  details.innerHTML=`<summary>Show Sanskrit</summary><div lang="sa-Deva">${verses.map(v=>`<div style="margin:0 0 14px"><strong style="font-family:Vollkorn,Georgia,serif">${v.ref}</strong><br>${v.sanskrit}</div>`).join('')}</div>`;
  wrap.appendChild(details);
  const trans=document.createElement('div');trans.className='translation';
  trans.innerHTML=verses.map(v=>`<p style="margin:0 0 12px"><strong>${v.ref}</strong> ${v.translation}${v.note?`<br><span style="font-size:.92em"><em>Text/translation note:</em> ${v.note}</span>`:''}</p>`).join('');
  wrap.appendChild(trans);
  return wrap;
};

const argumentSection=(doc,item)=>{
  const s=document.createElement('section');s.className='remark-section plain-remark';
  const h=document.createElement('h4');h.className='remark-label';h.textContent=item.title;s.appendChild(h);
  const c=document.createElement('p');c.textContent=item.context;s.appendChild(c);
  s.appendChild(passage(doc,item));
  const a=document.createElement('p');a.className='argument-chain';a.textContent=item.argument;s.appendChild(a);
  return s;
};

const mountJatiArguments=async()=>{
  const oldHeading=root.querySelector('#jati-distinctions');
  const heading=oldHeading?oldHeading.cloneNode(true):Object.assign(document.createElement('h3'),{id:'jati-distinctions',textContent:'Rejection of Jāti-distinctions'});
  const loading=document.createElement('p');loading.className='reference';loading.textContent='Loading Bhaviṣya Purāṇa passages…';
  root.replaceChildren(heading,intro(),loading);
  try{
    const r=await fetch('/advaita/articles/bhavisya-purana-addresses-varna-system/?v=20260914-jati3',{cache:'no-store'});
    if(!r.ok)throw Error('Bhaviṣya Purāṇa source article');
    const doc=new DOMParser().parseFromString(await r.text(),'text/html');
    const frag=document.createDocumentFragment();
    for(const item of jatiArguments)frag.appendChild(argumentSection(doc,item));
    loading.replaceWith(frag);
    bindSanskrit(root);
  }catch(e){
    loading.className='load-error';
    loading.textContent='Could not load the Bhaviṣya Purāṇa passages. Refresh the page.';
    console.error(e);
  }
};

(async()=>{
  try{
    const r=await fetch(`${base}${current.file}?v=paged6`,{cache:'no-store'});
    if(!r.ok)throw Error(current.file);
    const t=document.createElement('template');t.innerHTML=await r.text();
    root.replaceChildren(...extract(t.content,current));
    bindSanskrit(root);
    if(current.id==='jati-distinctions')await mountJatiArguments();
  }catch(e){
    root.innerHTML='<p class="load-error">Could not load this section. Refresh the page.</p>';
    console.error(e);
  }
})();
})();