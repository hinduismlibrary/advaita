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
    const marker=/[।॥]{1,2}\s*(?:1\.)?(?:\d+\.)?([०-९](?:\s*[०-९])*)\s*[।॥]{1,2}/g;
    const found=[]; let last=0,m;
    while((m=marker.exec(text))){
      const n=Number([...m[1].replace(/\s+/g,'')].map(x=>DEV_DIGITS.indexOf(x)).join(''));
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
    const LITERAL_RULES=[{"p":"Vijaya Saptamī","f":"giu","r":"Victory observance of the seventh lunar day","proper":true},{"p":"Fruit Saptamī","f":"giu","r":"Fruit observance of the seventh lunar day","proper":true},{"p":"Water Saptamī","f":"giu","r":"Water observance of the seventh lunar day","proper":true},{"p":"Sura Marīca Saptamī","f":"giu","r":"Sura Marīca seventh-day observance","proper":true},{"p":"Marīca Saptamī","f":"giu","r":"Marīca seventh-day observance","proper":true},{"p":"Sun Saptamī","f":"giu","r":"Sun's seventh-day observance","proper":true},{"p":"Arka Saptamī","f":"giu","r":"Arka's seventh-day observance","proper":true},{"p":"seven Saptamīs","f":"giu","r":"seven observances of the seventh lunar day"},{"p":"on Saptamī","f":"giu","r":"on the seventh lunar day"},{"p":"at Saptamī","f":"giu","r":"on the seventh lunar day"},{"p":"about Saptamī","f":"giu","r":"about the seventh lunar day"},{"p":"Saptamī vow","f":"giu","r":"vow for the seventh lunar day"},{"p":"Saptamī observance","f":"giu","r":"observance of the seventh lunar day"},{"p":"Saptamī procedure","f":"giu","r":"seventh-day procedure"},{"p":"this Saptamī","f":"giu","r":"this seventh-day observance"},{"p":"each Saptamī","f":"giu","r":"each seventh-day observance"},{"p":"Saptamīs","f":"giu","r":"seventh-day observances"},{"p":"Saptamī","f":"giu","r":"seventh lunar day"},{"p":"Bhagavān|Bhagavan","f":"giu","r":"Lord","proper":true},{"p":"(?<![\\p{L}])Brāhmaṇas?(?![\\p{L}])","f":"giu","r":"Brahmin","pl":"Brahmins"},{"p":"(?<![\\p{L}])Bhojakas?(?![\\p{L}])","f":"giu","r":"Sun-priest","pl":"Sun-priests"},{"p":"(?<![\\p{L}])mudrās?(?![\\p{L}])","f":"giu","r":"ritual gesture","pl":"ritual gestures"},{"p":"(?<![\\p{L}])dakṣiṇās?(?![\\p{L}])","f":"giu","r":"gift","pl":"gifts"},{"p":"incurs Brahmahatyā","f":"giu","r":"incurs the sin of killing a Brahmin"},{"p":"freed from Brahmahatyā","f":"giu","r":"freed from the sin of killing a Brahmin"},{"p":"(?<![\\p{L}])Brahmahatyā(?![\\p{L}])","f":"giu","r":"the sin of killing a Brahmin"},{"p":"(?<![\\p{L}])maṇḍalas?(?![\\p{L}])","f":"giu","r":"ritual diagram","pl":"ritual diagrams"},{"p":"(?<![\\p{L}])śaktis?(?![\\p{L}])","f":"giu","r":"power","pl":"powers"},{"p":"(?<![\\p{L}])śrāddha(?![\\p{L}])","f":"giu","r":"ancestral rite"},{"p":"(?<![\\p{L}])tīrthas?(?![\\p{L}])","f":"giu","r":"pilgrimage place","pl":"pilgrimage places"},{"p":"(?<![\\p{L}])hiraṇya(?![\\p{L}])","f":"giu","r":"gold"},{"p":"(?<![\\p{L}])akṣata(?![\\p{L}])","f":"giu","r":"unbroken rice"},{"p":"Itihāsas and Purāṇas","f":"giu","r":"epics and Purāṇas"},{"p":"Itihāsa and Purāṇa","f":"giu","r":"epic history and Purāṇa"},{"p":"(?<![\\p{L}])itihāsas?(?![\\p{L}])","f":"giu","r":"epic","pl":"epics"},{"p":"(?<![\\p{L}])pāraṇa(?![\\p{L}])","f":"giu","r":"completion rite"},{"p":"(?<![\\p{L}])kṛcchra(?![\\p{L}])","f":"giu","r":"penance"},{"p":"(?<![\\p{L}])pāyasa(?![\\p{L}])","f":"giu","r":"rice pudding"},{"p":"(?<![\\p{L}])kṛśara(?![\\p{L}])","f":"giu","r":"rice-and-pulse porridge"},{"p":"(?<![\\p{L}])karavīra(?![\\p{L}])","f":"giu","r":"oleander"},{"p":"(?<![\\p{L}])piśācas?(?![\\p{L}])","f":"giu","r":"evil spirit","pl":"evil spirits"},{"p":"(?<![\\p{L}])rākṣasas?(?![\\p{L}])","f":"giu","r":"demon","pl":"demons"},{"p":"(?<![\\p{L}])dānavas?(?![\\p{L}])","f":"giu","r":"demon","pl":"demons"},{"p":"(?<![\\p{L}])mātrā(?![\\p{L}])","f":"giu","r":"vowel measure"},{"p":"(?<![\\p{L}])sthaṇḍila(?![\\p{L}])","f":"giu","r":"ritual altar"},{"p":"(?<![\\p{L}])pādya(?![\\p{L}])","f":"giu","r":"water for washing the feet"},{"p":"(?<![\\p{L}])Aśvamedhas?(?![\\p{L}])","f":"giu","r":"horse sacrifice","pl":"horse sacrifices"},{"p":"(?<![\\p{L}])ṛcs?(?![\\p{L}])","f":"giu","r":"Rigvedic hymn","pl":"Rigvedic hymns"},{"p":"Vaiṣṇava dharmas?","f":"giu","r":"duties of Viṣṇu's followers"},{"p":"a Vaiṣṇava","f":"giu","r":"a devotee of Viṣṇu"},{"p":"(?<![\\p{L}])nakṣatras?(?![\\p{L}])","f":"giu","r":"lunar mansion","pl":"lunar mansions"},{"p":"śiro nyāsa","f":"giu","r":"head-placement rite"},{"p":"(?<![\\p{L}])nyāsa(?![\\p{L}])","f":"giu","r":"ritual placement"},{"p":"(?<![\\p{L}])śaṅkha(?![\\p{L}])","f":"giu","r":"conch"},{"p":"(?<![\\p{L}])sāttvika(?![\\p{L}])","f":"giu","r":"pure"},{"p":"(?<![\\p{L}])rājasa(?![\\p{L}])","f":"giu","r":"passionate"},{"p":"(?<![\\p{L}])kuṣṭha disease(?![\\p{L}])","f":"giu","r":"skin disease"},{"p":"(?<![\\p{L}])kuṣṭhas?(?![\\p{L}])","f":"giu","r":"skin disease","pl":"skin diseases"},{"p":"(?<![\\p{L}])māṣas?(?![\\p{L}])","f":"giu","r":"weight-unit","pl":"weight-units"},{"p":"(?<![\\p{L}])sandhyās?(?![\\p{L}])","f":"giu","r":"twilight period","pl":"twilight periods"},{"p":"(?<![\\p{L}])saṃpuṭas?(?![\\p{L}])","f":"giu","r":"folded packet","pl":"folded packets"},{"p":"(?<![\\p{L}])pūjā(?![\\p{L}])","f":"giu","r":"worship"},{"p":"(?<![\\p{L}])mokṣa(?![\\p{L}])","f":"giu","r":"liberation"},{"p":"(?<![\\p{L}])kuṅkuma(?![\\p{L}])","f":"giu","r":"vermilion"},{"p":"(?<![\\p{L}])prāṇāyāma(?![\\p{L}])","f":"giu","r":"breath control"},{"p":"(?<![\\p{L}])upavīta(?![\\p{L}])","f":"giu","r":"sacred thread"},{"p":"(?<![\\p{L}])upavāsa(?![\\p{L}])","f":"giu","r":"fasting"},{"p":"(?<![\\p{L}])japa(?![\\p{L}])","f":"giu","r":"recitation"},{"p":"(?<![\\p{L}])homa(?![\\p{L}])","f":"giu","r":"fire offering"},{"p":"(?<![\\p{L}])naivedya(?![\\p{L}])","f":"giu","r":"food offering"},{"p":"arghya vessel","f":"giu","r":"water-offering vessel"},{"p":"(?<![\\p{L}])arghya(?![\\p{L}])","f":"giu","r":"water offering"},{"p":"(?<![\\p{L}])hṛdaya(?![\\p{L}])","f":"giu","r":"heart mantra"},{"p":"(?<![\\p{L}])sāmans?(?![\\p{L}])","f":"giu","r":"Vedic chant","pl":"Vedic chants"},{"p":"(?<![\\p{L}])sādhaka(?![\\p{L}])","f":"giu","r":"practitioner"},{"p":"(?<![\\p{L}])kuśa(?![\\p{L}])","f":"giu","r":"sacred grass"},{"p":"(?<![\\p{L}])darbha(?![\\p{L}])","f":"giu","r":"sacred grass"},{"p":"(?<![\\p{L}])parvans?(?![\\p{L}])","f":"giu","r":"section","pl":"sections"},{"p":"Vājapeya sacrifices?","f":"giu","r":"strength-drink sacrifice","pl":"strength-drink sacrifices"},{"p":"(?<![\\p{L}])Vājapeyas?(?![\\p{L}])","f":"giu","r":"strength-drink sacrifice","pl":"strength-drink sacrifices"},{"p":"Rājasūya sacrifices?","f":"giu","r":"royal-consecration sacrifice","pl":"royal-consecration sacrifices"},{"p":"(?<![\\p{L}])Rājasūyas?(?![\\p{L}])","f":"giu","r":"royal-consecration sacrifice","pl":"royal-consecration sacrifices"},{"p":"Agniṣṭoma sacrifices?","f":"giu","r":"fire-praise sacrifice","pl":"fire-praise sacrifices"},{"p":"(?<![\\p{L}])Agniṣṭomas?(?![\\p{L}])","f":"giu","r":"fire-praise sacrifice","pl":"fire-praise sacrifices"},{"p":"(?<![\\p{L}])siddhi(?![\\p{L}])","f":"giu","r":"success"},{"p":"(?<![\\p{L}])amṛta(?![\\p{L}])","f":"gu","r":"nectar"},{"p":"(?<![\\p{L}])pāvaka(?![\\p{L}])","f":"gu","r":"fire"},{"p":"Arka flowers","f":"giu","r":"calotropis flowers"},{"p":"Arka leaves","f":"giu","r":"calotropis leaves"},{"p":"(?<![\\p{L}])guggulu(?![\\p{L}])","f":"giu","r":"guggul resin"}];
  function literalEnglish(value){
    let text=String(value||'');
    for(const rule of LITERAL_RULES){
      const re=new RegExp(rule.p,rule.f);
      text=text.replace(re,(match,offset,source)=>{
        let out=(rule.pl&&/s$/iu.test(match))?rule.pl:rule.r;
        const previous=source.slice(0,offset).trimEnd().slice(-1);const atSentenceStart=offset===0||'.!?'.includes(previous);
        if((rule.proper||atSentenceStart)&&out)out=out[0].toUpperCase()+out.slice(1);
        return out;
      });
    }
    return text;
  }
window.renderBhavishyaLiveChapter=async function(config,translations){
    const mount=document.getElementById('chapter-mount'); if(!mount)return;
    mount.innerHTML='<div class="bp-reader"></div>';
    const render=source=>{
      const cards=source.map(v=>{
        const t=translations[v.n]||{};
        const obj=typeof t==='string'?{en:t}:t;
        if(obj.omit&&!v.sa)return '';
        const en=literalEnglish(obj.en||'');
        const sa=(config.preferEmbeddedSanskrit&&obj.sa)?obj.sa:(v.sa||obj.sa||'');
        if(!sa&&!en)return '';
        const sanskrit=sa?'<div class="bp-sa" lang="sa"><strong>'+br(sa)+'</strong></div>':'';
        const english=en?'<p class="bp-en" lang="en">'+esc(en)+'</p>':'';
        return '<section class="bp-verse" id="bp-1-'+config.chapter+'-'+v.n+'"><h3>BP 1.'+config.chapter+'.'+v.n+'</h3><hr>'+sanskrit+english+'</section>';
      }).join('');
      mount.querySelector('.bp-reader').innerHTML=cards;
    };
    try{
      const source=await fetchSanskrit(config.chapter,config.verseCount);
      render(source);
    }catch(e){
      const source=Object.entries(translations).map(([n,t])=>({
        n:Number(n),
        sa:typeof t==='object'&&t.sa?t.sa:''
      }));
      render(source);
    }
  };
})();