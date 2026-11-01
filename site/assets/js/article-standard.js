/* Progressive enhancements: every article and every contents link works without JS. */
(()=>{
  'use strict';
  const root=document.getElementById('source-content');
  if(!root)return;
  const links=[...document.querySelectorAll('.toc a[href*="#"]')];
  const targets=new Map();
  for(const link of links){
    let id;
    try{id=decodeURIComponent(new URL(link.href).hash.slice(1));}catch{continue;}
    const target=document.getElementById(id);
    if(target&&root.contains(target))targets.set(id,target);
  }
  const headings=[...targets.values()].sort((a,b)=>a===b?0:(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1));
  let active='';
  function mark(id){
    if(id===active)return;
    active=id;
    for(const link of links){
      let selected=false;
      try{selected=decodeURIComponent(new URL(link.href).hash.slice(1))===id;}catch{}
      link.classList.toggle('is-active',selected);
      if(selected)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  }
  let scheduled=false;
  function sync(){
    scheduled=false;
    let current=headings[0];
    for(const heading of headings){
      if(heading.getBoundingClientRect().top<=Math.min(180,window.innerHeight*.25))current=heading;
      else break;
    }
    if(current)mark(current.id);
  }
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}},{passive:true});
  addEventListener('resize',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}});
  for(const details of root.querySelectorAll('details.sanskrit-reveal')){
    const summary=details.querySelector(':scope>summary');
    if(!summary)continue;
    const label=()=>{summary.textContent=details.open?'Hide Sanskrit':'Show Sanskrit';};
    details.addEventListener('toggle',label);label();
  }
  document.querySelectorAll('.mobile-toc .toc a').forEach(link=>link.addEventListener('click',()=>{
    const mobile=link.closest('details');if(mobile)mobile.open=false;
  }));
  // Preserve previously shared ?section= URLs using the same native anchor target.
  const section=new URLSearchParams(location.search).get('section');
  if(section&&document.getElementById(section)){
    const url=new URL(location.href);url.searchParams.delete('section');
    if(!url.hash)url.hash=section;
    history.replaceState(null,'',url.pathname+url.search+url.hash);
    document.getElementById(section).scrollIntoView({block:'start'});
  }
  sync();
})();
