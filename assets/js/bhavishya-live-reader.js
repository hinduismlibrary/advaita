(()=>{
  const DEV_DIGITS=['०','१','२','३','४','५','६','७','८','९'];
  const toDev=n=>String(n).replace(/\d/g,d=>DEV_DIGITS[Number(d)]);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const br=s=>esc(s).replace(/\n/g,'<br>');
  const vowels={'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
  const signs={'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const cons={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ','क़':'q','ख़':'kh','ग़':'g','ज़':'z','ड़':'ṛ','ढ़':'ṛh','फ़':'f'};
  const misc={'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','ॐ':'oṃ','।':' |','॥':' ||'};
  function devToIast(input){
    const a=[...String(input??'')]; let out='';
    for(let i=0;i<a.length;i++){
      const c=a[i];
      if(vowels[c]){out+=vowels[c];continue;}
      if(cons[c]){
        out+=cons[c];
        const n=a[i+1];
        if(n==='्'){i++;continue;}
        if(signs[n]){out+=signs[n];i++;continue;}
        out+='a';continue;
      }
      if(signs[c]){out+=signs[c];continue;}
      if(misc[c]){out+=misc[c];continue;}
      if(DEV_DIGITS.includes(c)){out+=DEV_DIGITS.indexOf(c);continue;}
      if(c==='़')continue;
      out+=c;
    }
    return out.replace(/\s+\|\|/g,' ||').replace(/\s+\|/g,' |').replace(/\|\s+/g,'| ').trim();
  }
  function cleanText(t){
    return String(t||'')
      .replace(/\[[^\]]*\]/g,'')
      .replace(/\s+Image\s*/gi,' ')
      .replace(/"https?:[^\n]+/g,'')
      .replace(/इत्यस्माद्[^\n]*/g,'')
      .replace(/\n{3,}/g,'\n\n')
      .trim();
  }
  function extractVerses(text,expected,chapter){
    text=cleanText(text);
    const marker=/[।॥]{2}\s*(?:1\.)?(?:\d+\.)?([०-९]+)\s*[।॥]{2}/g;
    const found=[]; let last=0,m;
    while((m=marker.exec(text))){
      const n=Number([...m[1]].map(x=>DEV_DIGITS.indexOf(x)).join(''));
      if(!n||n>expected+3)continue;
      let block=text.slice(last,m.index+m[0].length).trim();
      last=m.index+m[0].length;
      block=block
        .replace(/^.*?सौरधर्म[^\n]*\n/s,'')
        .replace(/^.*?शान्तिकवर्णनम्\s*/s,'')
        .replace(/^.*?वर्णनम्\s*/s,'')
        .trim();
      found.push({n,sa:block});
    }
    const by=new Map();
    for(const v of found){let n=v.n;if(chapter===189&&n===36&&!by.has(26))n=26;if(chapter===192&&n===32&&!by.has(12))n=12;if(n>=1&&n<=expected){if(!by.has(n))by.set(n,v.sa);else by.set(n,`${by.get(n)} ${v.sa}`.trim());}}
    return Array.from({length:expected},(_,i)=>({n:i+1,sa:by.get(i+1)||''}));
  }
  async function fetchSanskrit(chapter,expected){
    const title=`भविष्यपुराणम्_/पर्व_१_(ब्राह्मपर्व)/अध्यायः_${toDev(chapter)}`;
    const url='https://sa.wikisource.org/w/api.php?action=parse&format=json&origin=*&prop=text&page='+encodeURIComponent(title);
    const r=await fetch(url,{cache:'no-store'}); if(!r.ok)throw new Error('source fetch failed');
    const j=await r.json(); const html=j?.parse?.text?.['*']; if(!html)throw new Error('source unavailable');
    const d=new DOMParser().parseFromString(html,'text/html');
    d.querySelectorAll('style,script,sup.reference,.mw-editsection').forEach(x=>x.remove());
    const root=d.querySelector('.mw-parser-output')||d.body;
    const text=root.innerText||root.textContent||'';
    return extractVerses(text,expected,chapter);
  }
  window.renderBhavishyaLiveChapter=async function(config,translations){
    const mount=document.getElementById('chapter-mount'); if(!mount)return;
    mount.innerHTML=`<div class="bp-reader"><div class="bp-source"><strong>${esc(config.subtitle)}</strong><br><span>Loading the Sanskrit witness…</span></div></div>`;
    try{
      const source=await fetchSanskrit(config.chapter,config.verseCount);
      const cards=source.map(v=>{
        const t=translations[v.n]||{};
        const obj=typeof t==='string'?{en:t}:t;
        if(obj.omit&&!v.sa)return '';
        const en=obj.en||'';
        const wfw=obj.wfw||obj.gloss||'';
        const sa=v.sa||obj.sa||`[Sanskrit verse ${v.n} could not be isolated automatically from the source page.]`;
        const iast=obj.iast||devToIast(sa);
        const note=obj.note?`<details><summary>Textual note</summary><div class="bp-detail">${esc(obj.note)}</div></details>`:'';
        return `<section class="bp-verse" id="bp-1-${config.chapter}-${v.n}"><h3>BP 1.${config.chapter}.${v.n}</h3><hr><div class="bp-sa" lang="sa">${br(sa)}</div><p class="bp-en">${esc(en||'Translation pending source check.')}</p><details><summary>Word-for-word</summary><div class="bp-detail">${esc(wfw||'Word-for-word gloss pending source check.')}</div></details><details><summary>Transliteration</summary><div class="bp-detail"><em>${br(iast)}</em></div></details>${note}</section>`;
      }).join('');
      mount.innerHTML=`<div class="bp-reader"><div class="bp-source"><strong>${esc(config.subtitle)}</strong><br><span>Close English translation and phrase-by-phrase gloss from the Sanskrit; Sanskrit cross-checked against Sanskrit Wikisource and Wisdomlib. Difficult or corrupt readings are flagged rather than silently normalised.</span></div>${cards}<div class="bp-colophon">${esc(config.colophon||'')}</div></div>`;
    }catch(e){
      const embedded=Object.entries(translations).every(([,t])=>typeof t==='object'&&t.sa);
      if(embedded){
        const source=Object.entries(translations).map(([n,t])=>({n:Number(n),sa:t.sa}));
        const cards=source.map(v=>{
          const obj=translations[v.n]||{};
          const iast=obj.iast||devToIast(v.sa);
          const note=obj.note?`<details><summary>Textual note</summary><div class="bp-detail">${esc(obj.note)}</div></details>`:'';
          return `<section class="bp-verse" id="bp-1-${config.chapter}-${v.n}"><h3>BP 1.${config.chapter}.${v.n}</h3><hr><div class="bp-sa" lang="sa">${br(v.sa)}</div><p class="bp-en">${esc(obj.en||'')}</p><details><summary>Word-for-word</summary><div class="bp-detail">${esc(obj.wfw||obj.gloss||'')}</div></details><details><summary>Transliteration</summary><div class="bp-detail"><em>${br(iast)}</em></div></details>${note}</section>`;
        }).join('');
        mount.innerHTML=`<div class="bp-reader"><div class="bp-source"><strong>${esc(config.subtitle)}</strong><br><span>Close English translation and phrase-by-phrase gloss from the Sanskrit; Sanskrit cross-checked against Sanskrit Wikisource and Wisdomlib.</span></div>${cards}<div class="bp-colophon">${esc(config.colophon||'')}</div></div>`;
      } else {
        mount.innerHTML=`<div class="bp-reader"><div class="bp-source"><strong>${esc(config.subtitle)}</strong><br><span>The Sanskrit source could not be loaded at this moment. Please reload the page.</span></div></div>`;
      }
    }
  };
})();