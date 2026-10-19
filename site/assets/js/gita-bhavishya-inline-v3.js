(()=>{
  const root=document.querySelector('.gita-content');
  if(!root)return;
  const imp=(el,prop,val)=>el&&el.style.setProperty(prop,val,'important');
  const styleAll=()=>{
    root.querySelectorAll('.gita-verse').forEach(v=>{
      imp(v,'margin','0 0 26px'); imp(v,'padding','0'); imp(v,'border','0'); imp(v,'background','transparent'); imp(v,'box-shadow','none');
      const h=v.querySelector('h2');
      if(h){
        imp(h,'margin','0'); imp(h,'text-align','center'); imp(h,'color','#2f7f82'); imp(h,'font-family','Vollkorn, Georgia, serif'); imp(h,'font-size','26px'); imp(h,'line-height','1.1'); imp(h,'font-weight','600'); imp(h,'letter-spacing','.01em');
      }
      const hr=v.querySelector('.gita-verse-rule');
      if(hr){
        imp(hr,'border','0'); imp(hr,'border-top','1px solid #dedbd6'); imp(hr,'width','56%'); imp(hr,'max-width','520px'); imp(hr,'margin','13px auto 16px');
      }
      const sa=v.querySelector('.gita-sanskrit');
      if(sa){
        imp(sa,'max-width','840px'); imp(sa,'margin','0 auto 14px'); imp(sa,'text-align','center'); imp(sa,'color','#3c362e'); imp(sa,'font-size','21px'); imp(sa,'line-height','1.48'); imp(sa,'font-weight','400');
      }
      const en=v.querySelector('.gita-translation');
      if(en){
        const t=en.textContent||''; const cleaned=t.replace(/^\s*\d+\.\d+\s*/,''); if(cleaned!==t) en.textContent=cleaned;
        imp(en,'max-width','840px'); imp(en,'margin','0 auto 14px'); imp(en,'padding','0'); imp(en,'border','0'); imp(en,'background','transparent'); imp(en,'box-shadow','none'); imp(en,'text-align','center'); imp(en,'color','#3c362e'); imp(en,'font-size','16px'); imp(en,'line-height','1.45'); imp(en,'font-weight','400');
      }
      const ctr=v.querySelector('.gita-controls');
      if(ctr){ imp(ctr,'display','block'); imp(ctr,'max-width','840px'); imp(ctr,'margin','0 auto'); imp(ctr,'padding','0'); }
      const details=[...v.querySelectorAll('.gita-details')];
      details.forEach((d,i)=>{
        imp(d,'display','block'); imp(d,'max-width','840px'); imp(d,'margin',i===details.length-1?'0 auto 12px':'0 auto 8px'); imp(d,'padding','0'); imp(d,'border','0'); imp(d,'background','transparent'); imp(d,'box-shadow','none');
        const s=d.querySelector('summary');
        if(s){
          imp(s,'display','block'); imp(s,'width','max-content'); imp(s,'max-width','100%'); imp(s,'cursor','pointer'); imp(s,'border','1px solid #9bc5c7'); imp(s,'border-radius','999px'); imp(s,'padding','5px 13px'); imp(s,'color','#2f7f82'); imp(s,'background','transparent'); imp(s,'font-size','14px'); imp(s,'line-height','1.15'); imp(s,'font-weight','600'); imp(s,'box-shadow','none'); imp(s,'text-decoration','none');
        }
        const r=d.querySelector('.gita-reveal');
        if(r){
          imp(r,'margin','8px 0 12px'); imp(r,'padding','0'); imp(r,'border','0'); imp(r,'background','transparent'); imp(r,'box-shadow','none'); imp(r,'color','#3c362e'); imp(r,'font-size',i===1?'14px':'13px'); imp(r,'line-height','1.55');
        }
      });
      const c=v.querySelector('.gita-commentary');
      if(c){
        imp(c,'max-width','840px'); imp(c,'margin','18px auto 28px'); imp(c,'padding','0'); imp(c,'border','0'); imp(c,'border-left','0'); imp(c,'background','transparent'); imp(c,'box-shadow','none'); imp(c,'color','#3c362e'); imp(c,'font-size','15px'); imp(c,'line-height','1.6'); imp(c,'text-align','left');
      }
    });
  };
  styleAll();
  new MutationObserver(styleAll).observe(root,{childList:true,subtree:true});
})();
