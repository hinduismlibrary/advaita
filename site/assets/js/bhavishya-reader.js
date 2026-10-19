window.renderBhavishyaChapter=function(config,verses){
  const mount=document.getElementById('chapter-mount');
  if(!mount)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const br=s=>esc(s).replace(/\n/g,'<br>');
  const DEV=['०','१','२','३','४','५','६','७','८','९'];
  const vowels={'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
  const signs={'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const cons={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'};
  const misc={'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','ॐ':'oṃ','।':' |','॥':' ||'};
  const toIast=input=>{const a=[...String(input??'')];let out='';for(let i=0;i<a.length;i++){const c=a[i];if(vowels[c]){out+=vowels[c];continue;}if(cons[c]){out+=cons[c];const n=a[i+1];if(n==='्'){i++;continue;}if(signs[n]){out+=signs[n];i++;continue;}out+='a';continue;}if(signs[c]){out+=signs[c];continue;}if(misc[c]){out+=misc[c];continue;}if(DEV.includes(c)){out+=DEV.indexOf(c);continue;}if(c==='़')continue;out+=c;}return out.replace(/\s+\|\|/g,' ||').replace(/\s+\|/g,' |').replace(/\|\s+/g,'| ').trim();};
  const cards=verses.map(v=>{const iast=v.iast||toIast(v.sa);return `<section class="bp-verse" id="bp-1-${config.chapter}-${v.n}"><h3>BP 1.${config.chapter}.${v.n}</h3><hr><div class="bp-sa" lang="sa">${br(v.sa)}</div><p class="bp-en">${esc(v.en)}</p>${v.wfw?`<details><summary>Word-for-word</summary><div class="bp-detail">${esc(v.wfw)}</div></details>`:''}<details><summary>Transliteration</summary><div class="bp-detail"><em>${br(iast)}</em></div></details>${v.note?`<details><summary>Textual note</summary><div class="bp-detail">${esc(v.note)}</div></details>`:''}</section>`}).join('');
  mount.innerHTML=`<div class="bp-reader"><div class="bp-source"><strong>${esc(config.subtitle)}</strong><br><span>Close English translation and phrase-by-phrase gloss from the Sanskrit; Sanskrit cross-checked against Wisdomlib and Sanskrit Wikisource. Difficult or unstable readings are flagged rather than silently normalised.</span></div>${cards}<div class="bp-colophon">${esc(config.colophon||'')}</div></div>`;
  if(config.chapter>=180&&config.chapter<=190){
    const nav=document.querySelector('.chapter-nav');
    if(nav){
      const links=nav.querySelectorAll('a');
      if(config.chapter>180&&links[0]){links[0].href=`/advaita/articles/bhavishya-purana-brahmaparvan-chapter-${config.chapter-1}/`;links[0].textContent=`← Chapter ${config.chapter-1}`;}
      if(config.chapter<190&&links[1]){links[1].href=`/advaita/articles/bhavishya-purana-brahmaparvan-chapter-${config.chapter+1}/`;links[1].textContent=`Chapter ${config.chapter+1} →`;}
    }
  }
};