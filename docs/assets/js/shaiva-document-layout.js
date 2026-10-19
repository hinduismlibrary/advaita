/* Repair the Shaiva manuscript's collapsed PDF table without touching other articles. */
(() => {
  'use strict';
  const source = document.getElementById('source-document');
  const config = document.getElementById('article-config');
  if (!source || !config || !config.dataset.base?.includes('a-shaiva-lens-on-shiva-as-the-supreme-deity')) return;
  const css = document.createElement('style');
  css.id = 'shaiva-document-layout';
  css.textContent = `
    body.document-paged-page{--paper:#fff;--ink:#2b2723;--teal:#684632;--purple:#674c78;--sanskrit:#57382d;--quote:#53435f;background:#eeeae5}
    .document-paged-page .sitebar{width:1260px;background:#fff;border-color:#dacabc}
    .document-paged-page .page{width:1260px;background:#fff;padding:46px 58px 90px;box-shadow:0 8px 32px #30241912}
    .document-paged-page .reader-grid{grid-template-columns:214px minmax(0,850px);gap:38px;justify-content:stretch}
    .document-paged-page .article{width:100%;max-width:850px;min-width:0}
    .document-paged-page .article-head{width:850px;max-width:calc(100% - 252px);margin:0 0 45px auto}
    .document-paged-page .article-head h1{font-size:clamp(29px,3.5vw,46px);color:#63442f}
    .document-paged-page .document-content{font-family:Georgia,Merriweather,serif;font-size:19px;line-height:1.85;color:#292520}
    .document-paged-page .document-content p{margin:0 0 25px}
    .document-paged-page .document-content>h2{color:#603f30}
    .document-paged-page .document-content h3,.document-paged-page .document-content h4{color:#603f30}
    .document-paged-page .document-content .shaiva-parallel{width:100%;margin:26px 0 34px;border:1px solid #d0c1b4;border-radius:5px;overflow:hidden;display:block;font-size:17px;line-height:1.7}
    .document-paged-page .shaiva-parallel__labels,.document-paged-page .shaiva-parallel__row{display:grid;grid-template-columns:minmax(0,41%) minmax(0,59%)}
    .document-paged-page .shaiva-parallel__labels{background:#f4eee7;color:#593e2e;font-size:13px;font-weight:700;letter-spacing:.025em}
    .document-paged-page .shaiva-parallel__labels span,.document-paged-page .shaiva-parallel__row>div{padding:18px 20px;min-width:0}
    .document-paged-page .shaiva-parallel__labels span+span,.document-paged-page .shaiva-parallel__row>div+div{border-left:1px solid #d0c1b4}
    .document-paged-page .shaiva-parallel__row{border-top:1px solid #d0c1b4}
    .document-paged-page .shaiva-parallel__row:nth-child(2n){background:#fffcf8}
    .document-paged-page .shaiva-parallel__sanskrit{font:400 20px/1.95 'Noto Serif Devanagari','Nirmala UI',Mangal,serif;color:#603d2d;white-space:pre-line;overflow-wrap:break-word}
    .document-paged-page .shaiva-parallel__english{font:400 17px/1.76 Georgia,Merriweather,serif;color:#352f2a}
    .document-paged-page .document-content .mixed-sanskrit{font:400 20px/1.85 'Noto Serif Devanagari','Nirmala UI',Mangal,serif;color:#704b37}
    .document-paged-page .document-content .source-note{line-height:1.7}
    .document-paged-page .side-toc{border-right-color:#d6c5b8}
    .document-paged-page .toc a.is-active{color:#674c78}
    @media(max-width:1000px){.document-paged-page .page{padding:35px 24px 70px}.document-paged-page .article-head{max-width:100%;margin:0 auto 38px}.document-paged-page .reader-grid{display:block;max-width:850px;margin:auto}.document-paged-page .side-toc{display:none}.document-paged-page .mobile-toc{display:block}}
    @media(max-width:620px){.document-paged-page .page{padding:26px 15px 60px}.document-paged-page .document-content{font-size:17px;line-height:1.78}.document-paged-page .shaiva-parallel__labels{display:none}.document-paged-page .shaiva-parallel__row{display:block;padding:13px 0}.document-paged-page .shaiva-parallel__row>div{padding:6px 16px 10px}.document-paged-page .shaiva-parallel__row>div+div{border-left:0;border-top:1px dashed #d0c1b4;padding-top:14px}.document-paged-page .shaiva-parallel__sanskrit{font-size:19px}.document-paged-page .shaiva-parallel__english{font-size:16.5px}}
  `;
  document.head.append(css);
  const heading = [...source.querySelectorAll('h2,h3')].find(h => /Padma Purāṇa.s Contradiction/i.test(h.textContent));
  if (!heading) return;
  const intro = heading.nextElementSibling;
  const p = intro?.nextElementSibling;
  if (!p?.matches('p') || !p.textContent.includes('Devanagari English Translation')) return;
  const rows = [
    ['सूत उवाच ।\nएवं यन्महिमा लोके लोकनिस्तारकारणम् ।\nतस्य विष्णोः परेशस्य नानाविग्रहधारिणः ॥ १ ॥','Sūta said: Thus, the single Purāṇic form belongs to that Supreme Lord Viṣṇu, who assumes various forms and whose majesty in the world is the cause of liberation for all beings. (1)'],
    ['एकं पुराणं रूपं वै तत्र पाद्मं परं महत् ।\nब्राह्मं मूर्धा हरेरेव हृदयं पद्मसंज्ञितम् ॥ २ ॥','Among those, the Padma Purāṇa is supreme and great. The Brahma Purāṇa is indeed the head of Hari, and the one named Padma is His heart. (2)'],
    ['वैष्णवं दक्षिणो बाहुः शैवं वामो महेशितुः ।\nऊरू भागवतं प्रोक्तं नाभिः स्यान्नारदीयकम् ॥ ३ ॥','The Viṣṇu Purāṇa is His right arm, and the Śiva Purāṇa is the left arm of the Great Lord. The Bhāgavata Purāṇa is said to be His thighs, and the Nāradīya Purāṇa is His navel. (3)'],
    ['मार्कण्डेयं च दक्षांघ्रिर्वामो ह्याग्नेयमुच्यते ।\nभविष्यं दक्षिणो जानुर्विष्णोरेव महात्मनः ॥ ४ ॥','The Mārkaṇḍeya Purāṇa is His right foot, and the Āgneya (Agni) Purāṇa is called His left foot. The Bhaviṣya Purāṇa is the right knee of the high-souled Viṣṇu. (4)'],
    ['ब्रह्मवैवर्तसंज्ञं तु वामजानुरुदाहृतः ।\nलैङ्गं ह गुल्फकं दक्षं वाराहं वामगुल्फकम् ॥ ५ ॥','The one known as Brahmavaivarta is declared to be His left knee. The Liṅga Purāṇa is His right ankle, and the Varāha Purāṇa is His left ankle. (5)'],
    ['स्कान्दं पुराणं लोमानि त्वगस्य वामनं स्मृतम् ।\nकौर्मं पृष्ठं समाख्यातं मात्स्यं मेदः प्रकीर्तितम् ॥ ६ ॥','The Skanda Purāṇa is the hair on His body, and the Vāmana Purāṇa is remembered as His skin. The Kūrma Purāṇa is described as His back, and the Matsya Purāṇa as His fat. (6)'],
    ['मज्जा तु गारुडं प्रोक्तं ब्रह्माण्डमस्थि गीयते ।\nएवमेवाभवद्विष्णुः पुराणावयवो हरिः ॥ ७ ॥','The Garuḍa Purāṇa is said to be His marrow, and the Brahmāṇḍa Purāṇa is sung of as His bones. In this manner Hari is described with the Purāṇas as His body parts. (7)'],
    ['हृदयं तत्र वै पाद्मं यच्छ्रुत्वामृतमश्नुते ।\nपाद्ममेतत्पुराणं तु स्वयं देवो भवद्धरिः ॥ ८ ॥','Among those, the Padma is the heart, by hearing which one experiences immortality. This Padma Purāṇa is indeed Lord Hari Himself manifested. (8)']
  ];
  const table = document.createElement('div');
  table.className = 'shaiva-parallel';
  table.setAttribute('role','table');
  table.setAttribute('aria-label','Padma Purāṇa, Svarga-khaṇḍa, chapter 62, verses 1–8');
  const labels=document.createElement('div');labels.className='shaiva-parallel__labels';
  labels.innerHTML='<span>Sanskrit · Devanāgarī</span><span>English translation</span>';table.append(labels);
  for (const [sa,en] of rows){
    const row=document.createElement('div');row.className='shaiva-parallel__row';row.setAttribute('role','row');
    const left=document.createElement('div');left.className='shaiva-parallel__sanskrit';left.lang='sa-Deva';left.textContent=sa;
    const right=document.createElement('div');right.className='shaiva-parallel__english';right.lang='en';right.textContent=en;
    row.append(left,right);table.append(row);
  }
  const prose=[
    'According to this passage, the Shiva Puran is the LEFT ARM of Bhagavan Hari himself. The Linga Puran is the RIGHT ANKLE of Sri Hari. The Skanda Puran is the HAIR on the body of Bhagavan Hari. The Kurma Puran is the BACK of Sri Hari. The Matsya Puran is the STOMACH of Lord Hari.',
    'To dismiss the Shaiva Puranas just because they are “Tamasic” is to dismiss a body part of Bhagavan Hari himself for even Vaishnavas. The Padma Puran that states this is not a peripheral text to Vaishnavism, but the very heart of Bhagavan Vishnu.'
  ];
  const remove=[];
  for (let n=p;n&&!n.matches('h2,h3');n=n.nextElementSibling) remove.push(n);
  for (const n of remove) n.remove();
  intro.after(table);
  let after = table;
  for (const s of prose){const para=document.createElement('p');para.textContent=s;after.after(para);after=para;}
})();