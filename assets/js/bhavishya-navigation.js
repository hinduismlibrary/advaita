(()=>{
  const root='/advaita/';
  const path=location.pathname;
  const isPratisarga=/pages\/bhavishya-purana-pratisargaparvan|articles\/bhavishya-purana-pratisargaparvan-part-/.test(path);
  const isBrahma=/pages\/bhavishya-purana-brahmaparvan|articles\/bhavishya-purana-brahmaparvan-chapter-/.test(path);
  const isMadhyama=/pages\/bhavishya-purana-madhyamaparvan|articles\/bhavishya-purana-madhyamaparvan-/.test(path);
  const isUttara=/pages\/bhavishya-purana-uttaraparvan|articles\/bhavishya-purana-uttaraparvan-/.test(path);
  const isBookIndex=/pages\/bhavishya-purana\/?$/.test(path);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const currentArticle=()=>{
    const ppMatch=path.match(/pratisargaparvan-part-(\d+)-chapter-(\d+)/);
    if(ppMatch)return {kind:'pp',part:Number(ppMatch[1]),chapter:Number(ppMatch[2])};
    const b=path.match(/brahmaparvan-chapter-(\d+)/);
    if(b)return {kind:'bp',chapter:Number(b[1])};
    const mpMatch=path.match(/madhyamaparvan-part-(\d+)-chapter-(\d+)/);
    if(mpMatch)return {kind:'mp',part:Number(mpMatch[1]),chapter:Number(mpMatch[2])};
    const u=path.match(/uttaraparvan-chapter-(\d+)/);
    if(u)return {kind:'up',chapter:Number(u[1])};
    return null;
  };

  function parseQuery(raw){
    const cleaned=String(raw||'').trim().replace(/[–—]/g,'-');
    const prefixMatch=cleaned.match(/^([a-z]+)\s*/i);
    const prefix=prefixMatch?prefixMatch[1].toLowerCase():'';
    const nums=(cleaned.replace(/^([a-z]+)\s*/i,'').match(/\d+/g)||[]).map(Number);
    const ctx=currentArticle();
    const pp=prefix==='pp'||prefix==='pratisarga'||prefix==='pratisargaparvan';
    const bp=prefix==='bp'||prefix==='brahma'||prefix==='brahmaparvan';
    const mp=prefix==='mp'||prefix==='madhyama'||prefix==='madhyamaparvan';
    const up=prefix==='up'||prefix==='uttara'||prefix==='uttaraparvan';
    if(pp){
      if(nums.length===3)return {kind:'pp',part:nums[0],chapter:nums[1],verse:nums[2]};
      if(ctx?.kind==='pp'&&nums.length===1)return {kind:'pp',part:ctx.part,chapter:ctx.chapter,verse:nums[0]};
      return null;
    }
    if(bp){
      if(nums.length===3)return {kind:'bp',chapter:nums[1],verse:nums[2]};
      if(nums.length===2)return {kind:'bp',chapter:nums[0],verse:nums[1]};
      if(ctx?.kind==='bp'&&nums.length===1)return {kind:'bp',chapter:ctx.chapter,verse:nums[0]};
      return null;
    }
    if(mp){
      if(nums.length===3)return {kind:'mp',part:nums[0],chapter:nums[1],verse:nums[2]};
      if(ctx?.kind==='mp'&&nums.length===1)return {kind:'mp',part:ctx.part,chapter:ctx.chapter,verse:nums[0]};
      return null;
    }
    if(up){
      if(nums.length===2)return {kind:'up',chapter:nums[0],verse:nums[1]};
      if(ctx?.kind==='up'&&nums.length===1)return {kind:'up',chapter:ctx.chapter,verse:nums[0]};
      return null;
    }
    if(isPratisarga&&nums.length===3)return {kind:'pp',part:nums[0],chapter:nums[1],verse:nums[2]};
    if(isBrahma&&nums.length===3)return {kind:'bp',chapter:nums[1],verse:nums[2]};
    if(isBrahma&&nums.length===2)return {kind:'bp',chapter:nums[0],verse:nums[1]};
    if(isMadhyama&&nums.length===3)return {kind:'mp',part:nums[0],chapter:nums[1],verse:nums[2]};
    if(isUttara&&nums.length===2)return {kind:'up',chapter:nums[0],verse:nums[1]};
    if(ctx&&nums.length===1)return {...ctx,verse:nums[0]};
    return null;
  }

  function targetFor(q){
    if(!q||!q.verse||q.verse<1)return null;
    if(q.kind==='pp')return `${root}articles/bhavishya-purana-pratisargaparvan-part-${q.part}-chapter-${q.chapter}/#pp-${q.part}-${q.chapter}-${q.verse}`;
    if(q.kind==='bp')return `${root}articles/bhavishya-purana-brahmaparvan-chapter-${q.chapter}/#bp-1-${q.chapter}-${q.verse}`;
    if(q.kind==='mp')return `${root}articles/bhavishya-purana-madhyamaparvan-part-${q.part}-chapter-${q.chapter}/#mp-${q.part}-${q.chapter}-${q.verse}`;
    return `${root}articles/bhavishya-purana-uttaraparvan-chapter-${q.chapter}/#up-${q.chapter}-${q.verse}`;
  }

  function applyWordForWordMode(){
    if(new URLSearchParams(location.search).get('mode')!=='wfw')return;
    document.body.classList.add('bp-wfw-only');
    const body=document.querySelector('.article-body');
    if(!body)return;
    body.querySelectorAll('p').forEach(p=>{
      const text=(p.textContent||'').trim();
      if(/^Source links:|^Primary Sanskrit source:|^Unable to load|^The Sanskrit source could not/i.test(text))return;
      p.hidden=true;
    });
    body.querySelectorAll('details').forEach(d=>{
      const summary=(d.querySelector('summary')?.textContent||'').toLowerCase();
      if(summary.includes('word-for-word'))d.open=true;
      if(summary.includes('transliteration'))d.hidden=true;
    });
  }

  function slugFor(q){
    if(q.kind==='pp')return `bhavishya-purana-pratisargaparvan-part-${q.part}-chapter-${q.chapter}`;
    if(q.kind==='bp')return `bhavishya-purana-brahmaparvan-chapter-${q.chapter}`;
    if(q.kind==='mp')return `bhavishya-purana-madhyamaparvan-part-${q.part}-chapter-${q.chapter}`;
    return `bhavishya-purana-uttaraparvan-chapter-${q.chapter}`;
  }

  function wireSearch(form){
    const input=form.querySelector('input');
    const status=form.parentElement.querySelector('.bp-search-status');
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const query=parseQuery(input.value);
      const target=targetFor(query);
      if(!target){
        status.textContent='Use Pratisarga P.C.V. (for example 2.3.5) or Brāhmaparvan C.V. (for example 19.3).';
        return;
      }
      if(document.querySelector('.chapter-index')){
        const link=document.querySelector(`a[href*="${slugFor(query)}"]`);
        if(!link){
          status.textContent='No matching chapter.';
          return;
        }
      }
      location.href=target;
    });
  }

  function enhanceIndex(){
    // The page markup contains the complete public contents menu.
  }

  function removePratisargaReaderClutter(){
    if(currentArticle()?.kind!=='pp')return;
    document.querySelectorAll('.gita-contents,.bp-reader-nav').forEach(node=>node.remove());
    const body=document.querySelector('.article-body');
    if(!body)return;
    Array.from(body.querySelectorAll('h2,h3,h4,p,strong')).forEach(label=>{
      if((label.textContent||'').trim()!=='Contents')return;
      const block=label.parentElement;
      if(!block||block===body||block.querySelector('article,section'))return;
      const lists=Array.from(block.querySelectorAll('ul,ol'));
      const links=Array.from(block.querySelectorAll('a'));
      if(!lists.length||!links.length||links.some(link=>!String(link.getAttribute('href')||'').startsWith('#')))return;
      const before=block.previousElementSibling;
      const after=block.nextElementSibling;
      if(before?.tagName==='HR')before.remove();
      if(after?.tagName==='HR')after.remove();
      block.remove();
    });
  }

  if(isBookIndex||isPratisarga||isBrahma||isMadhyama||isUttara){enhanceIndex();removePratisargaReaderClutter();applyWordForWordMode();const articleBody=document.querySelector('.article-body');if(articleBody&&new URLSearchParams(location.search).get('mode')==='wfw')new MutationObserver(applyWordForWordMode).observe(articleBody,{childList:true,subtree:true})}
})();
