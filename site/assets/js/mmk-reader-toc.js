(()=>{
  const toc=document.querySelector(".mmk-reader-toc__links");
  if(!toc)return;
  const sections=[...document.querySelectorAll("[data-mmk-section][id]")];
  const links=[...toc.querySelectorAll('a[href^="#"]')];
  if(!sections.length||!links.length)return;
  const linkById=new Map(links.map(link=>[decodeURIComponent(link.hash.slice(1)),link]));
  let activeId="";
  let frame=0;
  const sync=()=>{
    frame=0;
    const marker=Math.min(150,Math.max(88,window.innerHeight*.18));
    let active=sections[0];
    for(const section of sections){
      if(section.getBoundingClientRect().top<=marker)active=section;
      else break;
    }
    if(!active||active.id===activeId)return;
    activeId=active.id;
    for(const link of links){
      if(decodeURIComponent(link.hash.slice(1))===activeId)link.setAttribute("aria-current","location");
      else link.removeAttribute("aria-current");
    }
    const current=linkById.get(activeId);
    if(current){
      const listRect=toc.getBoundingClientRect();
      const linkRect=current.getBoundingClientRect();
      const outside=linkRect.top<listRect.top||linkRect.bottom>listRect.bottom||linkRect.left<listRect.left||linkRect.right>listRect.right;
      if(outside){
        const behavior=matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
        current.scrollIntoView({block:"nearest",inline:"nearest",behavior});
      }
    }
  };
  const schedule=()=>{if(frame)return;frame=requestAnimationFrame(sync)};
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  window.addEventListener("hashchange",schedule);
  toc.addEventListener("click",schedule);
  window.addEventListener("load",schedule,{once:true});
  schedule();
  requestAnimationFrame(()=>requestAnimationFrame(schedule));
})();
