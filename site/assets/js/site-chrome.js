(()=>{
"use strict";
if(window.__vivekaSiteChrome)return;
window.__vivekaSiteChrome=true;
const SITE="/advaita/";
const FAVICON=SITE+"favicon.svg";
const CSS=SITE+"assets/css/site-chrome.css?v=20261021-original-iast-2";

function addFavicon(){
  let icons=[...document.querySelectorAll('link[rel~="icon"]')];
  if(!icons.length){
    const icon=document.createElement("link");
    icon.rel="icon";
    icon.type="image/svg+xml";
    icon.href=FAVICON;
    document.head.append(icon);
    return;
  }
  icons.forEach(icon=>{
    icon.href=FAVICON;
    icon.type="image/svg+xml";
  });
}
function addStyles(){
  let link=document.querySelector('link[data-viveka-site-chrome],link[href*="site-chrome.css"]');
  if(link){
    link.dataset.vivekaSiteChrome="true";
    document.head.append(link);
    return;
  }
  link=document.createElement("link");
  link.rel="stylesheet";
  link.href=CSS;
  link.dataset.vivekaSiteChrome="true";
  document.head.append(link);
}
function addFonts(){
  if(document.querySelector('link[data-viveka-site-fonts]'))return;
  const preconnect=document.createElement("link");
  preconnect.rel="preconnect";
  preconnect.href="https://fonts.googleapis.com";
  const preconnectFonts=document.createElement("link");
  preconnectFonts.rel="preconnect";
  preconnectFonts.href="https://fonts.gstatic.com";
  preconnectFonts.crossOrigin="anonymous";
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500&family=Tiro+Devanagari+Sanskrit&family=Vollkorn:wght@400;500;600&display=swap";
  link.dataset.vivekaSiteFonts="true";
  document.head.append(preconnect,preconnectFonts,link);
}
function currentTitle(){
  const raw=(document.title||"").trim();
  const title=raw.replace(/\s*[|–—-]\s*(?:Viveka\s+Dṛṣṭi|Viveka\s+Drishti)(?:\s*[|–—-].*)?$/i,"").trim();
  return title||document.querySelector("main h1,h1")?.textContent?.replace(/\s+/g," ").trim()||"Current page";
}
function normalizedPath(){
  let path=location.pathname.replace(/\/index\.html$/i,"/").replace(/\.html$/i,"/");
  path=path.replace(/\/+$/,"");
  return path||"/";
}
function routeTitle(path){
  const chapter=path.match(/\/chapter-(\d+)$/i);
  if(chapter)return "Chapter "+chapter[1];
  if(/\/articles\/purana-analysis$/.test(path))return "Purāṇa Attestation Heatmap";
  const chaturChapter=path.match(/\/books\/chaturvarnya\/chapter-(\d+)$/i);
  if(chaturChapter)return "Chapter "+chaturChapter[1];
  if(/\/books\/chaturvarnya$/.test(path))return "Chaturvarnya";
  if(/\/articles\/hinduism-on-women$/.test(path))return "Hinduism on Women";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti\/sources$/.test(path))return "Text sources";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti\/reader$/.test(path))return "Reader";
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti$/.test(path))return "Mūlamadhyamakakārikā";
  if(path==="/advaita/articles")return "Writings";
  if(/\/books\/adi-shankaracharya\/book-contents$/.test(path))return "Contents";
  if(/\/search$/.test(path))return "Search";
  return currentTitle();
}
function makeCrumbs(path){
  if(path==="/advaita")return [];
  const home={label:"Home",href:SITE};
  const title=routeTitle(path);
  if(/\/books\/adi-shankaracharya\/book-contents$/.test(path))return [home,{label:"Advaita texts",href:SITE+"books/adi-shankaracharya/"},{label:"Contents"}];
  if(/\/articles\/mulamadhyamakakarika-with-chandrakirti(?:\/|$)/.test(path)){
    const parent="/advaita/articles/mulamadhyamakakarika-with-chandrakirti/";
    const chapter=path.match(/\/chapter-(\d+)$/i);
    const items=[home,{label:"Eastern Philosophy",href:SITE+"pages/introduction-to-eastern-philosophy/"},{label:"Mūlamadhyamakakārikā",href:parent}];
    if(chapter)items.push({label:"Chapter "+chapter[1]});
    else if(/\/sources$/.test(path))items.push({label:"Text sources"});
    else if(/\/reader$/.test(path))items.push({label:"Reader"});
    return items;
  }
  if(/\/articles\/purana-analysis$/.test(path))
    return [home,{label:"Purāṇa Library",href:SITE+"pages/purana-library/"},{label:title}];
  if(/\/articles\/hinduism-on-women$/.test(path))
    return [home,{label:"Introduction to Hinduism",href:SITE+"pages/introduction-to-hinduism/"},{label:title}];
  if(/\/contact$/.test(path))
    return [home,{label:"Contact"}];
  if(/\/search$/.test(path))
    return [home,{label:"Search"}];
  if(/\/articles\/(?:bhavishya-purana-|bhavisya-purana-addresses-varna-system|vishnu-purana-|srimad-bhagavatam-)/.test(path)||
     /\/pages\/(?:purana-library|vishnu-purana|bhagavatam-with-sridhara-bhasya|bhavishya-purana)/.test(path))
    return [home,{label:"Purāṇa Library",href:SITE+"pages/purana-library/"},{label:title}];
  if(/\/(?:articles\/bhagavad-gita-chapter-|pages\/bhagavad-gita)/.test(path))
    return [home,{label:"Bhagavad Gītā",href:SITE+"pages/bhagavad-gita/"},{label:title}];
  if(/\/books\/chaturvarnya(?:\/|$)/.test(path)){
    const chapter=path.match(/\/books\/chaturvarnya\/chapter-(\d+)$/i);
    const items=[home,{label:"Chaturvarnya",href:SITE+"books/chaturvarnya/"}];
    if(chapter)items.push({label:"Chapter "+chapter[1]});
    else items[1]={label:"Chaturvarnya"};
    return items;
  }
  if(/\/books(?:\/|$)/.test(path)){
    const bookIndex=SITE+"books/adi-shankaracharya/";
    return [home,{label:"Advaita Texts",href:bookIndex},{label:title}];
  }
  if(/\/articles\/varna-vicara$/.test(path)||/\/articles\/a-shashtric-lens-of-varna/.test(path))
    return [home,{label:"Varṇa",href:SITE+"#varna"},{label:title}];
  if(/\/articles(?:\/|$)/.test(path))
    return [home,{label:"Writings",href:SITE+"articles/"},{label:title}];
  if(/\/pages(?:\/|$)/.test(path))
    return [home,{label:"Sections",href:SITE},{label:title}];
  if(path==="/advaita/books"||path==="/advaita/books/adi-shankaracharya")
    return [home,{label:"Advaita Texts"}];
  return [home,{label:title}];
}
const TITLE_PAIRS={"A Scripture-Based Case for Viṣṇu Supremacy":"विष्णोः परात्परत्वे शास्त्रीयप्रमाणम्","A Scripture-Based Case for the Supremacy of Śiva":"शिवस्य परात्परत्वे शास्त्रीयप्रमाणम्","A Scripture-Based Case for the Validity of the Āgamas":"आगमानां शास्त्रीयप्रामाण्यम्","A Vaiṣṇava Lens on Viṣṇu as the Supreme Deity":"वैष्णवदृष्ट्या विष्णोः परात्परत्वम्","Advaita Stotrams":"अद्वैतस्तोत्राणि","Advaita Treatises":"अद्वैतप्रकरणानि","An Index of Hindu Scripture":"हिन्दुशास्त्राणाम् अनुक्रमणिका","Bhagavad Gītā Śrīdhara Bhāṣya":"श्रीमद्भगवद्गीता — श्रीधरभाष्यम्","Bhaviṣya Purāṇa Brāhmaparvan":"भविष्यपुराणम् — ब्रह्मपर्व","Bhaviṣya Purāṇa Brāhmaparvan Chapter Index":"भविष्यपुराणस्य ब्रह्मपर्वणः अध्यायानुक्रमणिका","Bhaviṣya Purāṇa Chapter 1 Introduction":"भविष्यपुराणस्य प्रथमाध्यायस्य परिचयः","Bhaviṣya Purāṇa Chapter Concordance":"भविष्यपुराणाध्यायसाम्यसूची","Bhaviṣya Purāṇa English Translation":"भविष्यपुराणम् — आङ्ग्लानुवादः","Bhāgavatam Canto 10 with Śrīdhara Svāmī":"श्रीमद्भागवतम् — दशमस्कन्धः, श्रीधरस्वामिव्याख्यासहितः","Bhāgavatam Canto 11 reader":"एकादशस्कन्धपाठः","Bhāgavatam Canto 12 reader":"द्वादशस्कन्धपाठः","Bhāgavatam Canto 2 with Śrīdhara Svāmī":"श्रीमद्भागवतम् — द्वितीयस्कन्धः, श्रीधरस्वामिव्याख्यासहितः","Bhāgavatam with Śrīdhara Bhāṣya":"श्रीमद्भागवतम् — श्रीधरभाष्यसहितम्","Bhāgavatam with Śrīdhara Bhāṣya Cantos 1–12":"श्रीमद्भागवतम् — श्रीधरभाष्यसहितम् (१–१२ स्कन्धाः)","Brahmasiddhi by Maṇḍana Miśra":"ब्रह्मसिद्धिः — मण्डनमिश्रकृता","Chapter I Arjuna Viṣāda Yoga Arjuna’s Despondency":"अर्जुनविषादयोगः","Chapter II Sāṅkhya Yoga The Yoga of Knowledge":"साङ्ख्ययोगः","Chapter III Karma Yoga The Yoga of Action":"कर्मयोगः","Chapter IV Jñāna Karma Sannyāsa Yoga Knowledge and Renunciation of Action":"ज्ञानकर्मसंन्यासयोगः","Chapter V Karma Sannyāsa Yoga The Yoga of Renunciation":"कर्मसंन्यासयोगः","Chapter VI Ātma Saṃyama Yoga The Yoga of Meditation":"आत्मसंयमयोगः","Chapter VII Jñāna Vijñāna Yoga Knowledge and Realization":"ज्ञानविज्ञानयोगः","Chapter VIII Akṣara Brahma Yoga The Imperishable Brahman":"अक्षरब्रह्मयोगः","Chapter IX Rāja Vidyā Rāja Guhya Yoga Royal Knowledge and Royal Secret":"राजविद्याराजगुह्ययोगः","Chapter X Vibhūti Yoga Divine Glories":"विभूतियोगः","Chapter XI Viśvarūpa Darśana Yoga The Vision of the Universal Form":"विश्वरूपदर्शनयोगः","Chapter XII Bhakti Yoga Devotion":"भक्तियोगः","Chapter XIII Kṣetra Kṣetrajña Vibhāga Yoga The Field and the Knower":"क्षेत्रक्षेत्रज्ञविभागयोगः","Chapter XIV Guṇatraya Vibhāga Yoga The Three Guṇas":"गुणत्रयविभागयोगः","Chapter XV Puruṣottama Yoga The Supreme Person":"पुरुषोत्तमयोगः","Chapter XVI Daivāsura Sampad Vibhāga Yoga Divine and Demonic Qualities":"दैवासुरसम्पद्विभागयोगः","Chapter XVII Śraddhātraya Vibhāga Yoga The Threefold Faith":"श्रद्धात्रयविभागयोगः","Chapter XVIII Mokṣa Sannyāsa Yoga Liberation through Renunciation":"मोक्षसंन्यासयोगः","Compilation of Peer-Reviewed Citations Against Aryan Migration Theory":"आर्यप्रवाससिद्धान्तस्य प्रतिवादे समीक्षितसन्दर्भसङ्कलनम्","Dṛg-dṛśya-viveka by Bhāratī Tīrtha":"दृग्दृश्यविवेकः — भारतीतीर्थकृतः","Hinduism on Women Scriptural Analysis of Women’s Dharma":"हिन्दुधर्मे स्त्रीधर्मस्य शास्त्रीयविश्लेषणम्","Indology":"भारतविद्या","Introduction to Eastern Philosophy":"प्राच्यदर्शनपरिचयः","Introduction to Hinduism":"हिन्दुधर्मपरिचयः","Meat-eating in Hinduism through the lens of Śāstra":"शास्त्रदृष्ट्या हिन्दुधर्मे मांसभक्षणम्","Mūlamadhyamakakārikā with Candrakīrti’s Commentary":"मूलमध्यमककारिका — चन्द्रकीर्तिव्याख्यासह","Naiṣkarmyasiddhi by Sureśvara":"नैष्कर्म्यसिद्धिः — सुरेश्वरकृता","On the Lack of Steppe Ancestry and Haplogroups in Ancient Iranians":"प्राचीनपारसीकेषु स्तेपीयपूर्वजत्वस्य हैप्लोग्रूपाणां च अभावः","Pratisargaparvan Four-Part Chapter Index":"प्रतिसर्गपर्वणः चतुर्भागीयाध्यायानुक्रमणिका","Purāṇa Attestation Heatmap":"पुराणसाक्ष्यतापचित्रम्","Purāṇa Library":"पुराणग्रन्थालयः","Purāṇa Research Index":"पुराणानुसन्धानानुक्रमणिका","Short Advaita Texts":"अद्वैतलघुग्रन्थाः","Stotrams and Hymns by Ādi Śaṅkara":"आदिशङ्कराचार्यकृतानि स्तोत्राणि","Tattvabodha by Ādi Śaṅkara":"तत्त्वबोधः — आदिशङ्करकृतः","Vedāntasāra by Sadānanda Yogīndra":"वेदान्तसारः — सदानन्दयोगीन्द्रकृतः","Viṣṇu Purāṇa Śrīdhara Bhāṣya":"विष्णुपुराणम् — श्रीधरभाष्यम्","Ātmabodha by Ādi Śaṅkara":"आत्मबोधः — आदिशङ्करकृतः","Śrīmad Bhāgavatam Śrīdhara Bhāṣya":"श्रीमद्भागवतम् — श्रीधरभाष्यम्","Home":"मुखपृष्ठम्","Writings":"लेखाः","Advaita texts":"अद्वैतग्रन्थाः","Advaita Texts":"अद्वैतग्रन्थाः","Advaita Vedānta Portal":"अद्वैतवेदान्तः","Purāṇas":"पुराणानि","Search":"अन्वेषणम्","Search results":"अन्वेषणपरिणामाः","Text sources":"पाठस्रोतांसि","Reader":"पाठः","Eastern Philosophy":"प्राच्यदर्शनम्","Sections":"विभागाः","Viveka Dṛṣṭi":"विवेकदृष्टिः","Bhagavad Gītā":"श्रीमद्भगवद्गीता","Varṇa":"वर्णः","Chaturvarnya":"चातुर्वर्ण्यम्","Hinduism on Women":"हिन्दुधर्मे स्त्रीधर्मः","Mūlamadhyamakakārikā":"मूलमध्यमककारिका","Analysis of Texts":"ग्रन्थविश्लेषणम्","Documents":"निबन्धाः","Reference sections":"सन्दर्भविभागाः","Short Texts (under 50 verses)":"लघुग्रन्थाः","Summaries and Explanations (over 50 verses)":"सारव्याख्यानानि","Stotrams and Hymns":"स्तोत्राणि च स्तुतयः","Purāṇa Research":"पुराणानुसन्धानम्","Śrīmad Bhāgavatam":"श्रीमद्भागवतम्","Bhaviṣya Purāṇa":"भविष्यपुराणम्","Related Scripture":"सम्बद्धशास्त्राणि","Archaeogenetics and Migration":"पुरातनवंशविज्ञानं जनप्रवासश्च","Textual Reference":"ग्रन्थसन्दर्भः","Purāṇa Studies":"पुराणाध्ययनम्","Theology and Interpretation":"ईश्वरमीमांसा तथा व्याख्या","Varṇa-vicāra":"वर्णविचारः","A Śāstric Lens of Varṇa — Part One":"वर्णविषये शास्त्रीयदृष्टिः — प्रथमभागः","Introduction":"परिचयः","Sources":"स्रोतांसि","Contents":"विषयसूची","Tattvabodha":"तत्त्वबोधः","Chapters and sections":"अध्यायाः तथा विभागाः","Opening invocation":"मङ्गलाचरणम्","Purpose of the teaching":"उपदेशप्रयोजनम्","The four preparations":"साधनचतुष्टयम्","Discernment":"विवेकः","Dispassion":"वैराग्यम्","The sixfold discipline":"षट्सम्पत्तिः","Śama — calm of mind":"शमः — मनोनिग्रहः","Dama — restraint of the senses":"दमः — इन्द्रियनिग्रहः","Uparama — steady conduct":"उपरतिः — स्वधर्मनिष्ठा","Titikṣā — forbearance":"तितिक्षा — सहनशीलता","Śraddhā — trust in the teaching":"श्रद्धा — शास्त्रवाक्यविश्वासः","Samādhāna — collected attention":"समाधानम् — चित्तैकाग्रता","Mumukṣutva — the desire for liberation":"मुमुक्षुत्वम् — मोक्षेच्छा","Inquiry into reality":"तत्त्वविचारः","The Self — definition":"आत्मनः स्वरूपम्","The gross body":"स्थूलशरीरम्","The subtle body":"सूक्ष्मशरीरम्","The organs of perception":"ज्ञानेन्द्रियाणि","The organs of action":"कर्मेन्द्रियाणि","The causal body":"कारणशरीरम्","The three states":"अवस्थात्रयम्","Waking and dreaming":"जाग्रत्स्वप्नौ","Deep sleep":"सुषुप्तिः","The five sheaths":"पञ्चकोशाः","The food sheath":"अन्नमयकोशः","The vital-air sheath":"प्राणमयकोशः","The mental sheath":"मनोमयकोशः","The intellect sheath":"विज्ञानमयकोशः","The bliss sheath and the five sheaths":"आनन्दमयकोशः तथा पञ्चकोशाः","The Self is distinct from the sheaths":"आत्मा कोशेभ्यो भिन्नः","The Self as existence, awareness, and fullness":"सच्चिदानन्दरूपः आत्मा","Māyā and the twenty-four principles":"माया च चतुर्विंशतितत्त्वानि","The five elements":"पञ्चमहाभूतानि","Sattva and the sense organs":"सत्त्वं ज्ञानेन्द्रियाणि च","The inner instrument":"अन्तःकरणम्","Rajas and the organs of action":"रजः कर्मेन्द्रियाणि च","Tamas and fivefold combination":"तमः पञ्चीकरणं च","The body and the universe":"शरीरं विश्वं च","The individual and the Lord":"जीवेश्वरौ","That thou art":"तत्त्वमसि","The liberated person while living":"जीवन्मुक्तः","The three kinds of action":"कर्मणां त्रिविधता","Freedom from action and the fruit of knowledge":"कर्मक्षयः ज्ञानफलं च","Final teaching and colophon":"उपसंहारः","By Ādi Śaṅkara":"आदिशङ्कराचार्यः","Dṛg-dṛśya-viveka":"दृग्दृश्यविवेकः","Ātmabodha":"आत्मबोधः","Aparokṣānubhūti":"अपरोक्षानुभूतिः","Aparokṣānubhūti by Ādi Śaṅkara":"अपरोक्षानुभूतिः — आदिशङ्करकृता","Māṇḍūkyakārikā":"माण्डूक्यकारिका","Māṇḍūkyakārikā by Gauḍapāda":"माण्डूक्यकारिका — गौडपादकृता","Vedāntasāra":"वेदान्तसारः","Ekaślokī":"एकश्लोकी","Upadeśapañcakam (Sādhanapañcakam)":"उपदेशपञ्चकम् (साधनपञ्चकम्)","Pañcīkaraṇa-prakaraṇa":"पञ्चीकरणप्रकरणम्","Daśaślokī":"दशश्लोकी","Brahmajñānāvalīmālā":"ब्रह्मज्ञानावलीमाला","Advaitamakaranda":"अद्वैतमकरन्दः","Ātmavidyāvilāsa":"आत्मविद्याविलासः","Brahmasiddhi":"ब्रह्मसिद्धिः","Naiṣkarmyasiddhi":"नैष्कर्म्यसिद्धिः","Vivekacūḍāmaṇi":"विवेकचूडामणिः","Upadeśasāhasrī":"उपदेशसाहस्री","Sarvavedāntasiddhāntasārasaṅgraha":"सर्ववेदान्तसिद्धान्तसारसङ्ग्रहः","Pañcadaśī":"पञ्चदशी","Advaitapañcaratnam":"अद्वैतपञ्चरत्नम्","Kāśīpañcakam":"काशीपञ्चकम्","Manīṣāpañcakam":"मनीषापञ्चकम्","Māyāpañcakam":"मायापञ्चकम्","Yatipañcakam":"यतिपञ्चकम्","Nirvāṇaṣaṭkam":"निर्वाणषट्कम्","Viṣṇu Ṣaṭpadī Stotram":"विष्णुषट्पदीस्तोत्रम्","Śrī Dakṣiṇāmūrtyaṣṭakam":"श्रीदक्षिणामूर्त्यष्टकम्","Hastāmalaka-stotram":"हस्तामलकस्तोत्रम्","Bhajagovindam (Mohamudgara)":"भजगोविन्दम् (मोहमुद्गरः)","Ekaślokī by Ādi Śaṅkara":"एकश्लोकी — आदिशङ्करकृता","Upadeśapañcakam (Sādhanapañcakam) by Ādi Śaṅkara":"उपदेशपञ्चकम् (साधनपञ्चकम्) — आदिशङ्करकृतम्","Pañcīkaraṇa-prakaraṇa by Ādi Śaṅkara":"पञ्चीकरणप्रकरणम् — आदिशङ्करकृतम्","Daśaślokī by Ādi Śaṅkara":"दशश्लोकी — आदिशङ्करकृता","Brahmajñānāvalīmālā by Ādi Śaṅkara":"ब्रह्मज्ञानावलीमाला — आदिशङ्करकृता","Advaitamakaranda by Lakṣmīdhara Kavi":"अद्वैतमकरन्दः — लक्ष्मीधरकविकृतः","Ātmavidyāvilāsa by Sadāśiva Brahmendra":"आत्मविद्याविलासः — सदाशिवब्रह्मेन्द्रकृतः","Vivekacūḍāmaṇi by Ādi Śaṅkara":"विवेकचूडामणिः — आदिशङ्करकृता","Upadeśasāhasrī by Ādi Śaṅkara":"उपदेशसाहस्री — आदिशङ्करकृता","Sarvavedāntasiddhāntasārasaṅgraha by Ādi Śaṅkara":"सर्ववेदान्तसिद्धान्तसारसङ्ग्रहः — आदिशङ्करकृतः","Pañcadaśī by Vidyāraṇya":"पञ्चदशी — विद्यारण्यकृता","Advaitapañcaratnam by Ādi Śaṅkara":"अद्वैतपञ्चरत्नम् — आदिशङ्करकृतम्","Kāśīpañcakam by Ādi Śaṅkara":"काशीपञ्चकम् — आदिशङ्करकृतम्","Manīṣāpañcakam by Ādi Śaṅkara":"मनीषापञ्चकम् — आदिशङ्करकृतम्","Māyāpañcakam by Ādi Śaṅkara":"मायापञ्चकम् — आदिशङ्करकृतम्","Yatipañcakam by Ādi Śaṅkara":"यतिपञ्चकम् — आदिशङ्करकृतम्","Nirvāṇaṣaṭkam by Ādi Śaṅkara":"निर्वाणषट्कम् — आदिशङ्करकृतम्","Viṣṇu Ṣaṭpadī Stotram by Ādi Śaṅkara":"विष्णुषट्पदीस्तोत्रम् — आदिशङ्करकृतम्","Śrī Dakṣiṇāmūrtyaṣṭakam by Ādi Śaṅkara":"श्रीदक्षिणामूर्त्यष्टकम् — आदिशङ्करकृतम्","Hastāmalaka-stotram by Hastāmalaka":"हस्तामलकस्तोत्रम् — हस्तामलककृतम्","Bhajagovindam (Mohamudgara) by Ādi Śaṅkara":"भजगोविन्दम् (मोहमुद्गरः) — आदिशङ्करकृतम्"};
function normalizeLabel(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[–—:.,'’]/g," ").replace(/\s+/g," ").trim().toLowerCase();}
const DISPLAY_LABELS=new Map(Object.entries({"Viveka Dṛṣṭi":"Viveka Drishti","Purāṇas":"Puranas","Tattvabodha":"Knowledge of Reality","Tattvabodha by Ādi Śaṅkara":"Knowledge of Reality by Adi Shankara","Vedāntasāra by Sadānanda Yogīndra":"Essence of Vedanta by Sadananda","Ātmabodha by Ādi Śaṅkara":"Knowledge of the Self by Adi Shankara","By Ādi Śaṅkara":"By Adi Shankara","Śama — calm of mind":"Calm of mind","Dama — restraint of the senses":"Restraint of the senses","Uparama — steady conduct":"Steady conduct","Titikṣā — forbearance":"Forbearance","Śraddhā — trust in the teaching":"Trust in the teaching","Samādhāna — collected attention":"Collected attention","Mumukṣutva — the desire for liberation":"Desire for liberation","Māyā and the twenty-four principles":"Illusion and the twenty-four principles","Sattva and the sense organs":"Purity and the sense organs","Rajas and the organs of action":"Activity and the organs of action","Tamas and fivefold combination":"Inertia and fivefold combination","Dṛg-dṛśya-viveka":"Seer and Seen","Dṛg-dṛśya-viveka by Bhāratī Tīrtha":"Seer and Seen by Bharati Tirtha","Ātmabodha":"Knowledge of the Self","Aparokṣānubhūti":"Direct Knowledge of the Self","Māṇḍūkyakārikā":"Verses on the Mandukya Upanishad","Māṇḍūkyakārikā by Gauḍapāda":"Verses on the Mandukya Upanishad by Gaudapada","Vedāntasāra":"Essence of Vedanta","Ekaślokī":"One Verse","Upadeśapañcakam (Sādhanapañcakam)":"Five Teachings (Five Disciplines)","Pañcīkaraṇa-prakaraṇa":"Treatise on Fivefold Combination","Daśaślokī":"Ten Verses","Brahmajñānāvalīmālā":"Garland of Brahman Knowledge","Advaitamakaranda":"Nectar of Non-Duality","Ātmavidyāvilāsa":"The Play of Self-Knowledge","Brahmasiddhi":"Knowledge of Brahman","Naiṣkarmyasiddhi":"Mastery of Actionlessness","Vivekacūḍāmaṇi":"Crest-Jewel of Discernment","Upadeśasāhasrī":"A Thousand Teachings","Sarvavedāntasiddhāntasārasaṅgraha":"Summary of Vedanta Conclusions","Pañcadaśī":"Fifteen Chapters","Advaitapañcaratnam":"Five Gems on Non-Duality","Kāśīpañcakam":"Five Verses on Kashi","Manīṣāpañcakam":"Five Verses of Discernment","Māyāpañcakam":"Five Verses on Illusion","Yatipañcakam":"Five Verses for Ascetics","Nirvāṇaṣaṭkam":"Six Verses on Liberation","Viṣṇu Ṣaṭpadī Stotram":"Six Verses to Vishnu","Śrī Dakṣiṇāmūrtyaṣṭakam":"Eight Verses on Dakshinamurti","Hastāmalaka-stotram":"Hymn of Hastamalaka","Bhajagovindam (Mohamudgara)":"Worship Govinda (The Hammer of Delusion)","Aparokṣānubhūti by Ādi Śaṅkara":"Direct Knowledge of the Self by Adi Shankara","Ekaślokī by Ādi Śaṅkara":"One Verse by Adi Shankara","Upadeśapañcakam (Sādhanapañcakam) by Ādi Śaṅkara":"Five Teachings by Adi Shankara","Pañcīkaraṇa-prakaraṇa by Ādi Śaṅkara":"Treatise on Fivefold Combination by Adi Shankara","Daśaślokī by Ādi Śaṅkara":"Ten Verses by Adi Shankara","Brahmajñānāvalīmālā by Ādi Śaṅkara":"Garland of Brahman Knowledge by Adi Shankara","Advaitamakaranda by Lakṣmīdhara Kavi":"Nectar of Non-Duality by Lakshmidhara Kavi","Ātmavidyāvilāsa by Sadāśiva Brahmendra":"The Play of Self-Knowledge by Sadashiva Brahmendra","Brahmasiddhi by Maṇḍana Miśra":"Knowledge of Brahman by Mandana Mishra","Naiṣkarmyasiddhi by Sureśvara":"Mastery of Actionlessness by Sureshvara","Vivekacūḍāmaṇi by Ādi Śaṅkara":"Crest-Jewel of Discernment by Adi Shankara","Upadeśasāhasrī by Ādi Śaṅkara":"A Thousand Teachings by Adi Shankara","Sarvavedāntasiddhāntasārasaṅgraha by Ādi Śaṅkara":"Summary of Vedanta Conclusions by Adi Shankara","Pañcadaśī by Vidyāraṇya":"Fifteen Chapters by Vidyaranya","Advaitapañcaratnam by Ādi Śaṅkara":"Five Gems on Non-Duality by Adi Shankara","Kāśīpañcakam by Ādi Śaṅkara":"Five Verses on Kashi by Adi Shankara","Manīṣāpañcakam by Ādi Śaṅkara":"Five Verses of Discernment by Adi Shankara","Māyāpañcakam by Ādi Śaṅkara":"Five Verses on Illusion by Adi Shankara","Yatipañcakam by Ādi Śaṅkara":"Five Verses for Ascetics by Adi Shankara","Nirvāṇaṣaṭkam by Ādi Śaṅkara":"Six Verses on Liberation by Adi Shankara","Viṣṇu Ṣaṭpadī Stotram by Ādi Śaṅkara":"Six Verses to Vishnu by Adi Shankara","Śrī Dakṣiṇāmūrtyaṣṭakam by Ādi Śaṅkara":"Eight Verses on Dakshinamurti by Adi Shankara","Hastāmalaka-stotram by Hastāmalaka":"Hymn of Hastamalaka","Bhajagovindam (Mohamudgara) by Ādi Śaṅkara":"Worship Govinda by Adi Shankara"}).map(([label,text])=>[normalizeLabel(label),text]));
function englishFor(value){return DISPLAY_LABELS.get(normalizeLabel(value))||value;}

const TITLE_INDEX=new Map(Object.entries(TITLE_PAIRS).map(([english,devanagari])=>[normalizeLabel(english),devanagari]));
function devanagariFor(english){
 const key=normalizeLabel(english), mapped=TITLE_INDEX.get(key);
 if(mapped)return mapped;
 const chapter=key.match(/^chapter (\d+)$/);
 const chapterContents=key.match(/^chapter (\d+) contents$/);
 if(chapterContents)return "अध्यायः "+chapterContents[1].replace(/\d/g,d=>"०१२३४५६७८९"[Number(d)])+" — विषयसूची";
 const mmk=key.match(/^mmk (\d+)\s+(\d+)/);
 if(mmk)return "मूलमध्यमककारिका "+mmk[1].replace(/\d/g,d=>"०१२३४५६७८९"[Number(d)])+"."+mmk[2].replace(/\d/g,d=>"०१२३४५६७८९"[Number(d)]);
 return chapter?"अध्यायः "+chapter[1].replace(/\d/g,d=>"०१२३४५६७८९"[Number(d)]):null;
}
function hasDevanagari(value){return Array.from(String(value||"")).some(ch=>ch>="ऀ"&&ch<="ॿ");}
function stackLabel(element,english,devanagari){
 if(!element||!english||!devanagari||element.dataset.vdBilingual==="true")return;
 const en=document.createElement("span");en.className="vd-label-en";en.lang="en";en.textContent=english;
 const sa=document.createElement("span");sa.className="vd-label-dev";sa.lang="sa-Deva";sa.textContent=devanagari;
 element.dataset.vdEnglish=english;element.dataset.vdBilingual="true";element.replaceChildren(en,sa);
}
function stackSanskritLabel(element,devanagari){
 if(!element||!devanagari||element.dataset.vdBilingual==="true")return;
 const sa=document.createElement("span");sa.className="vd-label-dev";sa.lang="sa-Deva";sa.textContent=devanagari;
 element.dataset.vdBilingual="true";element.dataset.vdScriptOnly="true";element.replaceChildren(sa);
}
function stackOriginalDirectoryEntry(element){
 if(!element||element.dataset.vdBilingual==="true")return false;
 const title=element.querySelector(".ad-entry-title");
 if(!title)return false;
 const original=title.textContent.replace(/\s+/g," ").trim();
 const devanagari=devanagariFor(original);
 if(!original||!devanagari)return false;
 const line=document.createElement("span");line.className="ad-entry-original";
 const sa=document.createElement("span");sa.className="ad-entry-original-dev";sa.lang="sa-Deva";sa.textContent=devanagari;
 const separator=document.createElement("span");separator.className="ad-entry-original-separator";separator.setAttribute("aria-hidden","true");separator.textContent=" · ";
 const iast=document.createElement("span");iast.className="ad-entry-original-iast";iast.lang="sa-Latn";iast.textContent=original;
 line.append(sa,separator,iast);
 element.dataset.vdBilingual="true";element.replaceChildren(line);
 return true;
}
function applyPageLabels(scope){
 const root=scope&&scope.nodeType===1?scope:(document.querySelector("main.site-main")||document.body);
 const selector="h1,h2,.hp-section-title,.shankara-card strong,.shankara-author,.shankara-section-heading,a,.site-footer p";
 const elements=[...(root.matches&&root.matches(selector)?[root]:[]),...root.querySelectorAll(selector)];
 elements.forEach(element=>{
  if(element.closest(".vd-global-header")||element.dataset.vdBilingual==="true")return;
  if(element.matches("a")&&element.querySelector(".shankara-card strong"))return;
  let target=element;
  if(!element.matches("a")){const link=element.querySelector(":scope > a");if(link)target=link;}
  if(target.dataset.vdBilingual==="true")return;
  if(document.body.classList.contains("ad-shankar-index-page")&&target.matches(".ad-entry-link")&&stackOriginalDirectoryEntry(target))return;
  const english=target.textContent.replace(/\s+/g," ").trim();
  if(!english||target.querySelector("img,svg,button,small,sup,sub,.sr-only"))return;
  const devanagari=devanagariFor(english);
  if(devanagari)stackLabel(target,englishFor(english),devanagari);
  else if(hasDevanagari(english))stackSanskritLabel(target,english);
 });
}

function addLink(parent,href,label,current){
  const li=document.createElement("li");
  if(href){
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(a,englishFor(label),devanagari);
    else if(hasDevanagari(label))stackSanskritLabel(a,label);
    li.append(a);
  }else{
    const span=document.createElement("span");
    span.textContent=label;
    span.setAttribute("aria-current","page");
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(span,englishFor(label),devanagari);
    else if(hasDevanagari(label))stackSanskritLabel(span,label);
    li.append(span);
  }
  parent.append(li);
}
function makeHeader(path){
  const header=document.createElement("header");
  header.className="site-header vd-global-header";
  const row=document.createElement("div");
  row.className="vd-nav-wrap";
  const brand=document.createElement("a");
  brand.className="brand";
  brand.href=SITE;
  brand.textContent="Viveka Dṛṣṭi";
  stackLabel(brand,englishFor("Viveka Dṛṣṭi"),"विवेकदृष्टिः");
  const toggle=document.createElement("button");
  toggle.className="vd-menu-toggle";
  toggle.type="button";
  toggle.setAttribute("aria-expanded","false");
  toggle.setAttribute("aria-controls","vd-primary-nav");
  toggle.setAttribute("aria-label","Open navigation");
  toggle.innerHTML='<span></span><span></span><span></span>';
  const nav=document.createElement("nav");
  nav.className="site-nav vd-primary-nav";
  nav.id="vd-primary-nav";
  nav.setAttribute("aria-label","Primary navigation");
  const links=[
    [SITE,"Home",path==="/advaita"],
    [SITE+"articles/","Writings",/\/articles(?:\/|$)/.test(path)],
    [SITE+"books/adi-shankaracharya/","Advaita texts",/\/books\//.test(path)],
    [SITE+"pages/purana-library/","Purāṇas",/purana|bhagavatam|vishnu-purana/i.test(path)],
    [SITE+"pages/indology/","Indology",/indology|aryan-migration|steppe-ancestry/i.test(path)],
  ];
  links.forEach(([href,label,current])=>{
    const a=document.createElement("a");
    a.href=href;
    a.textContent=label;
    if(current)a.setAttribute("aria-current","page");
    const devanagari=devanagariFor(label);
    if(devanagari)stackLabel(a,englishFor(label),devanagari);
    nav.append(a);
  });
  const form=document.createElement("form");
  form.className="vd-search-form";
  form.action=SITE+"search/";
  form.method="get";
  form.setAttribute("role","search");
  const label=document.createElement("label");
  label.className="vd-visually-hidden";
  label.htmlFor="vd-site-search";
  label.textContent="Search Viveka Dṛṣṭi";
  const input=document.createElement("input");
  input.type="search";
  input.id="vd-site-search";
  input.name="q";
  input.placeholder="Search";
  input.required=true;
  input.autocomplete="off";
  const button=document.createElement("button");
  button.type="submit";
  button.textContent="Search";
  stackLabel(button,"Search","अन्वेषणम्");
  form.append(label,input,button);
  const navRow=document.createElement("div");
  navRow.className="vd-nav-subrow";
  navRow.append(nav);
  row.append(brand,toggle,form);
  header.append(row,navRow);
  const crumbs=makeCrumbs(path);
  if(crumbs.length){
    const crumbRow=document.createElement("div");
    crumbRow.className="vd-breadcrumb-row";
    const crumbNav=document.createElement("nav");
    crumbNav.className="vd-breadcrumb-inner";
    crumbNav.setAttribute("aria-label","Breadcrumb");
    const list=document.createElement("ol");
    crumbs.forEach((item,index)=>addLink(list,item.href,item.label,index===crumbs.length-1));
    crumbNav.append(list);
    crumbRow.append(crumbNav);
    header.append(crumbRow);
  }
  form.addEventListener("submit",event=>{
    const term=input.value.trim();
    if(!term){event.preventDefault();input.focus();return;}
    input.value=term;
  });
  toggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",String(open));
    toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
  });
  nav.addEventListener("click",event=>{
    if(event.target.closest("a")){
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
      toggle.setAttribute("aria-label","Open navigation");
    }
  });
  return header;
}
function watchSearchResults(){
  const results=document.querySelector(".search-results");
  if(!results||results.dataset.vdLabelWatch==="true")return;
  results.dataset.vdLabelWatch="true";
  const observer=new MutationObserver(()=>applyPageLabels(results));
  observer.observe(results,{childList:true,subtree:true});
}
function watchDynamicLabels(){
  const root=document.querySelector("main.site-main")||document.body;
  if(root.dataset.vdLabelWatch==="true")return;
  root.dataset.vdLabelWatch="true";
  const observer=new MutationObserver(records=>{
    const changed=new Set(records.map(record=>record.target).filter(node=>node&&node.nodeType===1));
    changed.forEach(node=>applyPageLabels(node));
  });
  observer.observe(root,{childList:true,subtree:true});
}
function repairMmkLayout(path){
  if(!/\/articles\/mulamadhyamakakarika-with-chandrakirti(?:\/|$)/i.test(path))return;
  document.body.classList.remove("vp-book-1");
  document.querySelectorAll('link[rel~="stylesheet"][href*="vishnu-purana-chapter-reader.css"]').forEach(link=>link.remove());
}
function mount(){
  if(!document.head||!document.body)return false;
  repairMmkLayout(normalizedPath());
  addFavicon();
  addFonts();
  addStyles();
  document.body.classList.add("vd-chrome-page");
  let header=document.querySelector("body > header.site-header.vd-global-header");
  document.querySelectorAll("body > header.site-header, body > header.sitebar, body > header.topbar, body > header.ad-topbar").forEach(node=>{
    if(node!==header)node.remove();
  });
  if(!header){
    header=makeHeader(normalizedPath());
    document.body.prepend(header);
  }
  applyPageLabels();
  watchSearchResults();
  watchDynamicLabels();
  return true;
}
function init(){
  if(!mount()||window.__vivekaSiteChromeObserver)return;
  const observer=new MutationObserver(()=>{
    if(!document.querySelector("body > header.site-header.vd-global-header"))mount();
  });
  observer.observe(document.body,{childList:true});
  window.__vivekaSiteChromeObserver=observer;
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
