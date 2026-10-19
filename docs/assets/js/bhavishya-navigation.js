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
          status.textContent='That chapter is not uploaded yet. It is marked in the book index as in preparation.';
          return;
        }
      }
      location.href=target;
    });
  }

  function searchBlock(){
    const section=document.createElement('section');
    section.className='bp-index-tools';
    section.setAttribute('aria-labelledby','bp-search-title');
    section.innerHTML=`<strong id="bp-search-title">Go to a verse</strong><p>Use <b>2.3.5</b> for Pratisargaparvan, <b>MP 1.3.5</b> for Madhyamaparvan, <b>19.3</b> for Brāhmaparvan, or <b>UP 12.4</b> for Uttaraparvan.</p><form class="bp-search"><label><span class="sr-only">Verse reference</span><input inputmode="decimal" autocomplete="off" placeholder="e.g. 2.3.5 or BP 1.19.3" aria-label="Verse reference" required></label><button type="submit">Open verse</button></form><p class="bp-search-status" role="status" aria-live="polite"></p>`;
    wireSearch(section.querySelector('form'));
    return section;
  }

  function switcher(){
    const nav=document.createElement('nav');
    nav.className='bp-index-switcher';
    nav.setAttribute('aria-label','Bhavishya Purāṇa sections');
    nav.innerHTML=`<a href="${root}pages/bhavishya-purana/">All parvas</a><a href="${root}pages/bhavishya-purana-pratisargaparvan/">Pratisargaparvan</a><a href="${root}pages/bhavishya-purana-brahmaparvan/">Brāhmaparvan</a><a href="${root}pages/bhavishya-purana-madhyamaparvan/">Madhyamaparvan</a><a href="${root}pages/bhavishya-purana-uttaraparvan/">Uttaraparvan</a>`;
    return nav;
  }

  function makeDropdown(section,depth,open){
    if(section.dataset.bpDropdown==='1')return;
    const heading=Array.from(section.children).find(x=>x.matches('h3.section-heading,h4.section-heading'));
    if(!heading)return;
    const details=document.createElement('details');
    details.className=`bp-index-dropdown ${depth===0?'bp-parva-dropdown':'bp-section-dropdown'}`;
    details.open=Boolean(open);
    details.dataset.bpDropdown='1';
    details.dataset.bpDepth=String(depth);
    const summary=document.createElement('summary');
    const label=document.createElement('span');
    label.className='bp-summary-label';
    label.innerHTML=heading.innerHTML;
    summary.append(label);
    details.append(summary);
    Array.from(section.children).forEach(child=>{if(child!==heading)details.append(child)});
    section.replaceWith(details);
    Array.from(details.children).filter(x=>x.matches('section.section-block')).forEach(child=>makeDropdown(child,depth+1,false));
  }

  function indexControls(content){
    const controls=document.createElement('div');
    controls.className='bp-index-controls';
    controls.setAttribute('aria-label','Contents controls');
    controls.innerHTML='<span class="bp-index-controls-label">Contents:</span><button class="bp-index-control" type="button" data-bp-open="all">Expand all</button><button class="bp-index-control" type="button" data-bp-open="none">Collapse all</button>';
    controls.querySelector('[data-bp-open="all"]').addEventListener('click',()=>{
      content.querySelectorAll('details.bp-index-dropdown').forEach(details=>{details.open=true});
    });
    controls.querySelector('[data-bp-open="none"]').addEventListener('click',()=>{
      content.querySelectorAll('details.bp-index-dropdown').forEach(details=>{details.open=false});
    });
    return controls;
  }

  function expandPendingRanges(content){
    content.querySelectorAll('[data-bp-pending-range]').forEach(grid=>{
      if(grid.dataset.bpExpanded==='1')return;
      const nums=(grid.dataset.bpPendingRange.match(/\d+/g)||[]).map(Number);
      if(nums.length!==2)return;
      grid.dataset.bpExpanded='1';
      grid.innerHTML='';
      for(let n=nums[0];n<=nums[1];n++){
        const item=document.createElement('span');
        item.className='chapter-pending';
        item.textContent=`Chapter ${n} — in preparation`;
        grid.append(item);
      }
    });
  }

  function enhanceIndex(){
    const body=document.body;
    const content=document.querySelector('.chapter-index');
    if(!content||content.dataset.bpEnhanced==='1')return;
    content.dataset.bpEnhanced='1';
    expandPendingRanges(content);
    const title=content.querySelector('.index-title');
    if(title)title.after(switcher(),searchBlock(),indexControls(content));
    Array.from(content.children).filter(x=>x.matches('section.section-block')).forEach(section=>makeDropdown(section,0,false));
    if(isBookIndex){
      const note=document.createElement('p');
      note.className='bp-book-order-note';
      note.textContent='Reading order begins with Pratisargaparvan, then Brāhmaparvan, Madhyamaparvan, and Uttaraparvan. Each chapter is labeled as it enters the reader.';
      const first=content.querySelector('.bp-index-dropdown');
      if(first)first.before(note);
    }
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
