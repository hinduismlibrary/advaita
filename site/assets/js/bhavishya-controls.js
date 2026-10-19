(()=>{
  if(window.__bhavishyaReaderControlsInstalled)return;
  window.__bhavishyaReaderControlsInstalled=true;

  const DEV_DIGITS=['०','१','२','३','४','५','६','७','८','९'];
  const vowels={'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
  const signs={'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const cons={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ','क़':'q','ख़':'kh','ग़':'g','ज़':'z','ड़':'ṛ','ढ़':'ṛh','फ़':'f'};
  const misc={'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','ॐ':'oṃ','।':' |','॥':' ||'};

  function devToIast(input){
    const chars=[...String(input??'').replace(/[\u200c\u200d]/g,'')];
    let out='';
    for(let i=0;i<chars.length;i++){
      const ch=chars[i];
      if(vowels[ch]){out+=vowels[ch];continue;}
      if(cons[ch]){
        out+=cons[ch];
        const next=chars[i+1];
        if(next==='्'){i++;continue;}
        if(signs[next]){out+=signs[next];i++;continue;}
        out+='a';continue;
      }
      if(signs[ch]){out+=signs[ch];continue;}
      if(misc[ch]){out+=misc[ch];continue;}
      if(DEV_DIGITS.includes(ch)){out+=DEV_DIGITS.indexOf(ch);continue;}
      if(ch==='़')continue;
      out+=ch;
    }
    const marker='\uE000';
    return out
      .replace(/[ \t]*\|\|[ \t]*/g,marker)
      .replace(/[ \t]*\|[ \t]*/g,' |')
      .replaceAll(marker,' ||')
      .replace(/[ \t]*\n[ \t]*/g,'\n')
      .replace(/[ \t]{2,}/g,' ')
      .trim();
  }

  function sourceText(element){
    const copy=element.cloneNode(true);
    copy.querySelectorAll('br').forEach(node=>node.replaceWith('\n'));
    return String(copy.textContent||'').replace(/\u00a0/g,' ').replace(/[ \t]*\n[ \t]*/g,'\n').trim();
  }

  function showView(verse,view){
    const canonical=view==='translation'?'transliteration':view;
    const panels=[...verse.querySelectorAll('.bp-reader-panel[data-bp-panel],.bp-transliteration-panel,.bp-wfw-panel')]
      .filter(panel=>panel.dataset.bpPanel!=='english');
    const active=panels.find(panel=>panel.dataset.bpPanel===canonical);
    if(!active)return false;
    const closing=!active.hidden;
    panels.forEach(panel=>{panel.hidden=closing||panel!==active;});
    verse.querySelectorAll('.bp-reader-toggle').forEach(button=>{
      const selected=!closing&&button.dataset.bpView===canonical;
      button.classList.toggle('is-active',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
    return !closing;
  }

  function initialiseVerse(verse){
    const english=verse.querySelector('.bp-reader-panel[data-bp-panel="english"],.bp-reader-panel[data-bp-panel="translation"]');
    if(english){
      english.dataset.bpPanel='english';
      english.classList.add('bp-english-panel');
      english.hidden=false;
    }
    let transliteration=verse.querySelector('.bp-reader-panel[data-bp-panel="transliteration"],.bp-transliteration-panel');
    const sa=verse.querySelector('.bp-sa');
    const text=sa?devToIast(sourceText(sa)):'';
    if(!transliteration&&text){
      transliteration=document.createElement('div');
      transliteration.className='bp-reader-panel bp-transliteration-panel';
      transliteration.dataset.bpPanel='transliteration';
      const paragraph=document.createElement('p');
      paragraph.className='bp-transliteration';
      paragraph.lang='sa-Latn';
      paragraph.textContent=text;
      transliteration.append(paragraph);
      const controls=verse.querySelector('.bp-reader-controls');
      const wordPanel=verse.querySelector('.bp-reader-panel[data-bp-panel="word-for-word"]');
      if(controls)controls.after(transliteration);
      else if(wordPanel)wordPanel.before(transliteration);
      else verse.append(transliteration);
    }
    if(transliteration){
      transliteration.dataset.bpPanel='transliteration';
      transliteration.classList.add('bp-reader-panel','bp-transliteration-panel');
      if(!transliteration.id&&verse.id)transliteration.id=verse.id+'-transliteration';
    }
    let wordPanel=verse.querySelector('.bp-reader-panel[data-bp-panel="word-for-word"],.bp-wfw-panel');
    if(wordPanel){
      wordPanel.dataset.bpPanel='word-for-word';
      wordPanel.classList.add('bp-reader-panel','bp-wfw-panel');
      if(!wordPanel.id&&verse.id)wordPanel.id=verse.id+'-word-for-word';
    }
    const hasWords=Boolean(wordPanel&&wordPanel.textContent.trim());
    let controls=verse.querySelector('.bp-reader-controls');
    if(!controls&&((transliteration&&text)||hasWords)){
      controls=document.createElement('div');
      controls.className='bp-reader-controls';
      controls.setAttribute('role','group');
      controls.setAttribute('aria-label','Verse view');
      if(english)english.after(controls);
      else if(sa)sa.after(controls);
      else verse.prepend(controls);
    }
    let transliterationButton=verse.querySelector('.bp-reader-toggle[data-bp-view="transliteration"],.bp-reader-toggle[data-bp-view="translation"]');
    if(!transliterationButton&&controls&&(transliteration&&text)){
      transliterationButton=document.createElement('button');
      transliterationButton.className='bp-reader-toggle';
      transliterationButton.type='button';
      transliterationButton.dataset.bpView='transliteration';
      transliterationButton.textContent='Transliteration';
      controls.insertBefore(transliterationButton,controls.firstChild);
    }
    let wordButton=verse.querySelector('.bp-reader-toggle[data-bp-view="word-for-word"]');
    if(!wordButton&&controls&&hasWords){
      wordButton=document.createElement('button');
      wordButton.className='bp-reader-toggle';
      wordButton.type='button';
      wordButton.dataset.bpView='word-for-word';
      wordButton.textContent='Word for Word';
      controls.append(wordButton);
    }
    if(transliterationButton){
      transliterationButton.dataset.bpView='transliteration';
      transliterationButton.textContent='Transliteration';
      transliterationButton.disabled=!(transliteration&&text);
      if(transliteration&&transliteration.id)transliterationButton.setAttribute('aria-controls',transliteration.id);
      transliterationButton.setAttribute('aria-disabled',String(transliterationButton.disabled));
    }
    if(wordButton){
      wordButton.textContent='Word for Word';
      wordButton.disabled=!hasWords;
      if(wordPanel&&wordPanel.id)wordButton.setAttribute('aria-controls',wordPanel.id);
      wordButton.setAttribute('aria-disabled',String(wordButton.disabled));
    }
    [transliterationButton,wordButton].filter(Boolean).forEach(button=>{
      if(button.__bpControlBound)return;
      button.__bpControlBound=true;
      button.addEventListener('click',event=>{
        event.preventDefault();
        event.stopPropagation();
        const currentVerse=button.closest('.bp-verse')||verse;
        showView(currentVerse,button.dataset.bpView);
      });
    });
    const initialView='';
    if(initialView)showView(verse,initialView);
    else{
      [transliteration,wordPanel].filter(Boolean).forEach(panel=>{panel.hidden=true;});
      verse.querySelectorAll('.bp-reader-toggle').forEach(button=>{
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed','false');
      });
    }
  }

  function initialiseSubtree(root){
    if(!root||root.nodeType!==1)return;
    if(root.matches('.bp-verse'))initialiseVerse(root);
    else{
      const containingVerse=root.closest('.bp-verse');
      if(containingVerse)initialiseVerse(containingVerse);
    }
    root.querySelectorAll('.bp-verse').forEach(initialiseVerse);
  }

  document.querySelectorAll('.bp-verse').forEach(initialiseVerse);
  if(window.MutationObserver&&document.documentElement){
    const observer=new MutationObserver(records=>{
      const added=new Set();
      records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)added.add(node);}));
      added.forEach(initialiseSubtree);
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }

})();