(()=> {
  const list=document.querySelector(".mmk-reader-toc__links ol");
  if(!list)return;
  const current=list.querySelector('a[aria-current="page"]');
  if(!current)return;
  const alignCurrent=()=>{
    if(!window.matchMedia("(max-width: 850px)").matches)return;
    const item=current.getBoundingClientRect();
    const viewport=list.getBoundingClientRect();
    list.scrollLeft+=item.left-viewport.left-(list.clientWidth-item.width)/2;
  };
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(alignCurrent);
  else requestAnimationFrame(alignCurrent);
  window.addEventListener("resize",alignCurrent,{passive:true});
})();
