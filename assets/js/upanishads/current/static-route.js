/* Boot a permanent /upanishads/<slug>/ page using the shared Mahapurana-style Upanishad renderer. */
(() => {
  const MAP={
'isavasya':['Īśāvāsya','Mukhya','Śukla Yajurveda'],'kena':['Kena','Mukhya','Sāmaveda'],'katha':['Kaṭha','Mukhya','Kṛṣṇa Yajurveda'],'prasna':['Praśna','Mukhya','Atharvaveda'],'mundaka':['Muṇḍaka','Mukhya','Atharvaveda'],'mandukya':['Māṇḍūkya','Mukhya','Atharvaveda'],'taittiriya':['Taittirīya','Mukhya','Kṛṣṇa Yajurveda'],'aitareya':['Aitareya','Mukhya','Ṛgveda'],'chandogya':['Chāndogya','Mukhya','Sāmaveda'],'brhadaranyaka':['Bṛhadāraṇyaka','Mukhya','Śukla Yajurveda'],
'brahma':['Brahma','Sannyāsa','Kṛṣṇa Yajurveda'],'kaivalya':['Kaivalya','Śaiva','Kṛṣṇa Yajurveda'],'jabala':['Jābāla','Sannyāsa','Śukla Yajurveda'],'svetasvatara':['Śvetāśvatara','Mukhya','Kṛṣṇa Yajurveda'],'hamsa':['Haṃsa','Yoga','Śukla Yajurveda'],'aruni':['Āruṇi','Sannyāsa','Sāmaveda'],'garbha':['Garbha','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'narayana':['Nārāyaṇa','Vaiṣṇava','Kṛṣṇa Yajurveda'],'paramahamsa':['Paramahaṃsa','Sannyāsa','Śukla Yajurveda'],'amrtabindu':['Amṛtabindu','Yoga','Kṛṣṇa Yajurveda'],
'amrtanada':['Amṛtanāda','Yoga','Kṛṣṇa Yajurveda'],'atharvasiras':['Atharvaśiras','Śaiva','Atharvaveda'],'atharvasikha':['Atharvaśikhā','Śaiva','Atharvaveda'],'maitrayani':['Maitrāyaṇī','Mukhya','Sāmaveda'],'kausitaki':['Kauṣītaki','Mukhya','Ṛgveda'],'brhajjabala':['Bṛhajjābāla','Śaiva','Atharvaveda'],'nrsimhatapani':['Nṛsiṃhatāpanī','Vaiṣṇava','Atharvaveda'],'kalagnirudra':['Kālāgnirudra','Śaiva','Kṛṣṇa Yajurveda'],'maitreya':['Maitreya','Sannyāsa','Sāmaveda'],'subala':['Subāla','Sāmānya Vedānta','Śukla Yajurveda'],
'ksurika':['Kṣurikā','Yoga','Kṛṣṇa Yajurveda'],'mantrika':['Mantrikā','Sāmānya Vedānta','Śukla Yajurveda'],'sarvasara':['Sarvasāra','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'niralamba':['Nirālamba','Sāmānya Vedānta','Śukla Yajurveda'],'sukarahasya':['Śukarahasya','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'vajrasuci':['Vajrasūcī','Sāmānya Vedānta','Sāmaveda'],'tejobindu':['Tejobindu','Yoga','Kṛṣṇa Yajurveda'],'nadabindu':['Nādabindu','Yoga','Ṛgveda'],'dhyanabindu':['Dhyānabindu','Yoga','Kṛṣṇa Yajurveda'],'brahmavidya':['Brahmavidyā','Yoga','Kṛṣṇa Yajurveda'],
'yogatattva':['Yogatattva','Yoga','Kṛṣṇa Yajurveda'],'atmabodha':['Ātmabodha','Sāmānya Vedānta','Ṛgveda'],'narada-parivrajaka':['Nārada-Parivrājaka','Sannyāsa','Atharvaveda'],'trisikhibramana':['Triśikhi-Brāhmaṇa','Yoga','Śukla Yajurveda'],'sita':['Sītā','Śākta','Atharvaveda'],'yogacudamani':['Yogacūḍāmaṇi','Yoga','Sāmaveda'],'nirvana':['Nirvāṇa','Sannyāsa','Ṛgveda'],'mandala-bramana':['Maṇḍala-Brāhmaṇa','Yoga','Śukla Yajurveda'],'daksinamurti':['Dakṣiṇāmūrti','Śaiva','Kṛṣṇa Yajurveda'],'sarabha':['Śarabha','Śaiva','Atharvaveda'],
'skanda':['Skanda','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'tripadvibhuti-mahanarayana':['Tripādvibhūti-Mahānārāyaṇa','Vaiṣṇava','Atharvaveda'],'advayataraka':['Advayatāraka','Yoga','Śukla Yajurveda'],'ramarahasya':['Rāmarahasya','Vaiṣṇava','Atharvaveda'],'ramatapani':['Rāmatāpanī','Vaiṣṇava','Atharvaveda'],'vasudeva':['Vāsudeva','Vaiṣṇava','Sāmaveda'],'mudgala':['Mudgala','Sāmānya Vedānta','Ṛgveda'],'sandilya':['Śāṇḍilya','Yoga','Atharvaveda'],'paingala':['Paiṅgala','Sāmānya Vedānta','Śukla Yajurveda'],'bhiksuka':['Bhikṣuka','Sannyāsa','Śukla Yajurveda'],
'maha':['Mahā','Sāmānya Vedānta','Sāmaveda'],'sariraka':['Śārīraka','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'yogasikha':['Yogaśikhā','Yoga','Kṛṣṇa Yajurveda'],'turiyatitavadhuta':['Turīyātītāvadhūta','Sannyāsa','Śukla Yajurveda'],'sannyasa':['Sannyāsa','Sannyāsa','Sāmaveda'],'paramahamsa-parivrajaka':['Paramahaṃsa-Parivrājaka','Sannyāsa','Atharvaveda'],'aksamalika':['Akṣamālikā','Śaiva','Ṛgveda'],'avyakta':['Avyakta','Vaiṣṇava','Sāmaveda'],'ekaksara':['Ekākṣara','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'annapurna':['Annapūrṇā','Sāmānya Vedānta','Atharvaveda'],
'surya':['Sūrya','Sāmānya Vedānta','Atharvaveda'],'aksi':['Akṣi','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'adhyatma':['Adhyātma','Sāmānya Vedānta','Śukla Yajurveda'],'kundika':['Kuṇḍikā','Sannyāsa','Sāmaveda'],'savitri':['Sāvitrī','Sāmānya Vedānta','Sāmaveda'],'atma':['Ātma','Sāmānya Vedānta','Atharvaveda'],'pasupatabrahma':['Pāśupatabrahma','Yoga','Atharvaveda'],'parabrahma':['Parabrahma','Sannyāsa','Atharvaveda'],'avadhuta':['Avadhūta','Sannyāsa','Kṛṣṇa Yajurveda'],'tripuratapini':['Tripurātāpinī','Śākta','Atharvaveda'],
'devi':['Devī','Śākta','Atharvaveda'],'tripura':['Tripurā','Śākta','Ṛgveda'],'katharudra':['Kaṭharudra','Sannyāsa','Kṛṣṇa Yajurveda'],'bhavana':['Bhāvanā','Śākta','Atharvaveda'],'rudrahrdaya':['Rudrahṛdaya','Śaiva','Kṛṣṇa Yajurveda'],'yogakundalini':['Yogakuṇḍalinī','Yoga','Kṛṣṇa Yajurveda'],'bhasmajabala':['Bhasmajābāla','Śaiva','Atharvaveda'],'rudraksajabala':['Rudrākṣajābāla','Śaiva','Sāmaveda'],'ganapati':['Gaṇapati','Śaiva','Atharvaveda'],'jabaladarsana':['Jābāladarśana','Yoga','Sāmaveda'],
'tarasara':['Tārasāra','Vaiṣṇava','Śukla Yajurveda'],'mahavakya':['Mahāvākya','Yoga','Atharvaveda'],'pancabrahma':['Pañcabrahma','Śaiva','Kṛṣṇa Yajurveda'],'pranagnihotra':['Prāṇāgnihotra','Sāmānya Vedānta','Kṛṣṇa Yajurveda'],'gopalatapani':['Gopālatāpanī','Vaiṣṇava','Atharvaveda'],'krsna':['Kṛṣṇa','Vaiṣṇava','Atharvaveda'],'yajnavalkya':['Yājñavalkya','Sannyāsa','Śukla Yajurveda'],'varaha':['Varāha','Yoga','Kṛṣṇa Yajurveda'],'satyayaniya':['Śāṭyāyanīya','Sannyāsa','Śukla Yajurveda'],'hayagriva':['Hayagrīva','Vaiṣṇava','Atharvaveda'],
'dattatreya':['Dattātreya','Vaiṣṇava','Atharvaveda'],'garuda':['Garuḍa','Vaiṣṇava','Atharvaveda'],'kali-santarana':['Kali-Saṇṭāraṇa','Vaiṣṇava','Kṛṣṇa Yajurveda'],'jabali':['Jābāli','Śaiva','Sāmaveda'],'saubhagyalaksmi':['Saubhāgyalakṣmī','Śākta','Ṛgveda'],'sarasvati-rahasya':['Sarasvatī-rahasya','Śākta','Kṛṣṇa Yajurveda'],'bahvrca':['Bahvṛca','Śākta','Ṛgveda'],'muktika':['Muktikā','Sāmānya Vedānta','Śukla Yajurveda']
  };
  const slug=location.pathname.split('/').filter(Boolean).pop()||'';
  const meta=MAP[slug];
  if(!meta){document.getElementById('route-status').innerHTML='Unknown Upaniṣad route. <a href="/advaita/articles/scripture/">Return to Scripture Index</a>.';return;}
  document.body.classList.add('mahapurana-static-page','mahapurana-unified-page');
  document.querySelectorAll('.site-header,.site-footer').forEach(node=>node.remove());
  if(!document.querySelector('body > .purana-page-nav')){
    const nav=document.createElement('nav');
    nav.className='purana-page-nav';
    nav.setAttribute('aria-label','Scripture navigation');
    nav.innerHTML='<a class="purana-back-button" href="/advaita/articles/scripture/">← Back to Scripture Index</a><a class="purana-home-link" href="/advaita/">Home</a>';
    document.body.insertBefore(nav,document.body.firstElementChild);
  }
  const [name,group,veda]=meta;
  document.title=`${name} Upaniṣad — Viveka Dṛṣṭi`;
  const button=document.createElement('button');
  button.type='button';button.className='shastra-name upanishad-name';button.dataset.name=name;button.dataset.kind='Upaniṣad';button.dataset.type=group;button.dataset.veda=veda;
  button.innerHTML=`<span>${name}</span>`;document.getElementById('scripture-browser').append(button);
  requestAnimationFrame(()=>button.click());
  const observer=new MutationObserver(()=>{
    const reader=document.querySelector('.upanishad-mahapurana-reader');if(!reader)return;
    reader.classList.add('upanishad-static-reader');
    const close=reader.querySelector('.kena-article-close');if(close)close.remove();
    document.querySelector('.upanishad-loading')?.remove();
    if(!document.querySelector('body > .purana-return-nav')){const nav=document.createElement('nav');nav.className='purana-return-nav';nav.setAttribute('aria-label','Return to Scripture Index');nav.innerHTML='<a href="/advaita/articles/scripture/">← Back to Scripture Index</a>';document.body.appendChild(nav);}
    observer.disconnect();
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();

