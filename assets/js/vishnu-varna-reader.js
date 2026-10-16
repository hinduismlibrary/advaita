/* The Viṣṇu paper uses the SAME reader shell and stylesheet as Varṇa-vicāra.
   Every original paragraph, table, quotation and Sanskrit disclosure is kept.
   Only source headings are converted to the reader's section heading. */
(()=>{
'use strict';
if(!/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(location.pathname))return;

function boot(){
  const source=document.getElementById('preface')?.parentElement;
  if(!source)return; // Do not hide the original document if markup changes.
  const original=[...source.children];
  const contents=original.find(n=>n.matches('ol,ul')&&n.querySelector('a[href="#preface"]'));
  if(!contents)return;
  const base='/advaita/articles/a-vaishnava-lens-on-vishnu-as-the-supreme-deity/';
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
  const label=n=>(n?.textContent||'').replace(/\s+/g,' ').trim().replace(/^\d+(?:\.\d+)*\.?\s*/, '');
  const cleanId=id=>decodeURIComponent((id||'').replace(/^#/,''));
  const directAncestor=node=>{while(node&&node.parentElement!==source)node=node.parentElement;return node};
  const index=id=>{const target=source.querySelector('#'+CSS.escape(id));return target?original.indexOf(directAncestor(target)):-1};
  const groups=[];
  for(const li of contents.querySelectorAll(':scope > li')){
    const top=li.querySelector(':scope > a[href^="#"]');if(!top)continue;
    const parentId=cleanId(top.getAttribute('href')),parentIndex=index(parentId);
    if(parentIndex<0)continue;
    const children=[...li.querySelectorAll(':scope > ol > li > a[href^="#"],:scope > ul > li > a[href^="#"]')]
      .map(a=>({id:cleanId(a.getAttribute('href')),title:label(a),index:index(cleanId(a.getAttribute('href')))}))
      .filter(x=>x.index>=0);
    groups.push({id:parentId,title:label(top),index:parentIndex,children});
  }
  if(!groups.length)return;
  const boundaries=groups.flatMap(g=>[g.index,...g.children.map(c=>c.index)]).sort((a,b)=>a-b);
  const first=groups[0].index;
  // The invocation is before the preface, after the original in-article contents.
  const opening=original.slice(original.indexOf(contents)+1,first)
    .filter(n=>n.matches('p,details,figure,img,blockquote,table'));
  const pages=[];
  const aliases=new Map();
  for(const g of groups){
    const entries=g.children.length?g.children:[{id:g.id,title:g.title,index:g.index}];
    if(g.children.length)aliases.set(g.id,entries[0].id);
    for(let j=0;j<entries.length;j++){
      const entry=entries[j],next=boundaries.find(i=>i>entry.index)??original.length;
      const nodes=[];
      if(j===0&&g.children.length){
        // Do not lose material that appears after a parent heading but before its first child.
        nodes.push(...original.slice(g.index+1,entry.index));
      }
      nodes.push(...original.slice(entry.index+1,next));
      pages.push({id:entry.id,title:entry.title,parent:g.title,nodes,target:entry.index});
    }
  }
  if(!pages.length)return;
  // If a parent and its first child share a paragraph-containing wrapper, do not
  // silently discard anything: leave the original page intact instead.
  const counted=n=>Number(n.matches('p,details,table,blockquote,figure,img,ol,ul'))+
    n.querySelectorAll('p,details,table,blockquote,figure,img,ol,ul').length;
  const expected=opening.reduce((t,n)=>t+counted(n),0)+
    original.slice(first).reduce((t,n)=>t+counted(n),0);
  const actual=pages.reduce((t,p)=>t+p.nodes.reduce((s,n)=>s+counted(n),0),0)+
    opening.reduce((t,n)=>t+counted(n),0);
  if(expected!==actual){
    console.error('Viṣṇu reader: source coverage check failed; retaining full original',expected,actual);
    return;
  }
  pages[0].nodes.unshift(...opening);
  const byId=new Map(pages.map((p,i)=>[p.id,i]));
  const targetPage=new Map();
  groups.forEach(g=>{
    targetPage.set(g.id,aliases.get(g.id)||g.id);
    g.children.forEach(c=>targetPage.set(c.id,c.id));
  });
  pages.forEach(p=>p.nodes.forEach(n=>{
    if(n.id)targetPage.set(n.id,p.id);
    n.querySelectorAll('[id]').forEach(x=>targetPage.set(x.id,p.id));
  }));
  const href=id=>id===pages[0].id?base:base+'?section='+encodeURIComponent(id);

  // Exact structural classes and element order of articles/varna-vicara/index.html.
  const sitebar=el('header','sitebar'),home=el('a',null,'Viveka Dṛṣṭi');
  home.href='/advaita/';sitebar.append(home);
  const main=el('main','page'),head=el('header','article-head');
  head.append(el('h1',null,'A Vaiṣṇava Lens on Viṣṇu as the Supreme Deity'));
  const grid=el('div','reader-grid'),side=el('aside','side-toc'),toc=el('nav','toc');
  side.setAttribute('aria-label','Table of contents');
  side.append(el('h2','side-toc-title','Contents'),toc);
  const article=el('article','article'),mobile=el('details','mobile-toc');
  const mobileNav=el('nav','toc');mobile.append(el('summary',null,'Contents'),mobileNav);
  const context=el('div','page-context'),parent=el('strong'),count=el('span');
  parent.id='section-parent';count.id='section-count';context.append(parent,count);
  const reader=el('div');reader.id='source-content';
  const pager=el('nav','page-nav');pager.setAttribute('aria-label','Document sections');
  const prev=el('a','prev'),next=el('a','next');prev.id='page-prev';next.id='page-next';
  pager.append(prev,next);article.append(mobile,context,reader,pager);
  grid.append(side,article);main.append(head,grid);
  groups.forEach(g=>{
    const group=el('div','toc-group'),title=el('div','toc-parent',g.title),links=el('div','toc-children');
    (g.children.length?g.children:[{id:g.id,title:g.title}]).forEach(child=>{
      const a=el('a',null,child.title);a.href=href(child.id);a.dataset.section=child.id;
      links.append(a);
    });group.append(title,links);toc.append(group);
  });
  mobileNav.innerHTML=toc.innerHTML;
  const figure=(name,alt)=>{
    const f=el('figure','source-figure'),img=el('img');
    img.src='/advaita/assets/images/source-documents/'+name;
    img.alt=alt;img.loading='lazy';f.append(img);return f;
  };
  const clean=node=>{
    const copy=node.cloneNode(true);
    [copy,...copy.querySelectorAll('*')].forEach(n=>{
      const style=n.getAttribute('style')||'';
      if(n.matches('p')&&(/color\s*:\s*#(?:a92727|65516f)/i.test(style)||/^[“\"]/.test(n.textContent.trim())))n.classList.add('translation');
      if(n.matches('details')&&/show sanskrit|hide sanskrit/i.test(n.querySelector('summary')?.textContent||''))n.classList.add('sanskrit-reveal');
      n.removeAttribute('style');n.removeAttribute('width');
    });
    return copy;
  };
  const navButton=(a,p,direction)=>{
    a.replaceChildren(el('small',null,direction));
    if(!p){a.removeAttribute('href');a.classList.add('disabled');return;}
    a.classList.remove('disabled');a.href=href(p.id);a.append(document.createTextNode(p.title));
  };
  let requested=new URLSearchParams(location.search).get('section');
  const hash=cleanId(location.hash);
  if(!requested&&hash)requested=targetPage.get(hash)||hash;
  requested=aliases.get(requested)||requested;
  const i=byId.get(requested)??0,page=pages[i];
  // Build and validate before replacing the source document. A failed reader
  // must NEVER leave an empty article.
  const title=el('h3',null,page.title);title.id=page.id;reader.append(title);
  if(i===0)reader.append(figure('vishnu-cover-art.webp','Illustration reproduced from the original Viṣṇu paper'));
  page.nodes.forEach(n=>reader.append(clean(n)));
  if(i===pages.length-1)reader.append(figure('vishnu-closing-emblem.webp','Closing emblem reproduced from the original paper'));
  reader.querySelectorAll('details.sanskrit-reveal').forEach(d=>{
    const summary=d.querySelector(':scope > summary');if(!summary)return;
    const sync=()=>{summary.textContent=d.open?'Hide Sanskrit':'Show Sanskrit'};
    d.addEventListener('toggle',sync);sync();
  });
  reader.querySelectorAll('a[href^="#"]').forEach(a=>{
    const target=cleanId(a.getAttribute('href')),dest=targetPage.get(target);
    if(dest)a.href=href(dest)+(target===dest?'':'#'+encodeURIComponent(target));
  });
  parent.textContent=page.parent;count.textContent=`Section ${i+1} of ${pages.length}`;
  navButton(prev,pages[i-1],'Previous');navButton(next,pages[i+1],'Next');
  [toc,mobileNav].forEach(nav=>nav.querySelectorAll('a[data-section]').forEach(a=>{
    const selected=a.dataset.section===page.id;
    a.classList.toggle('is-active',selected);
    if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  }));
  document.body.replaceChildren(sitebar,main);
  document.body.className='vishnu-vicara-page';
  document.querySelector('link[href="/advaita/assets/css/site.css"]')?.remove();
  document.title=`${page.title} — A Vaiṣṇava Lens on Viṣṇu — Viveka Dṛṣṭi`;
  // Older section links, including those from the original in-article contents.
  if((requested&&requested!==page.id)||(hash&&targetPage.has(hash)&&hash===page.id)){
    history.replaceState(null,'',href(page.id)+(hash&&hash!==page.id?'#'+encodeURIComponent(hash):''));
  }
  if(hash&&hash!==page.id)document.getElementById(hash)?.scrollIntoView();
  console.info('Viṣṇu / Varṇa-vicāra reader: '+pages.length+' complete sections, '+expected+' source elements accounted for.');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();