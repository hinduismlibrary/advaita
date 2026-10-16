/* Repair mixed Devanagari / English text throughout the Śaiva manuscript.
   Preserve the source text; never fabricate syllables or translations. */
(()=>{'use strict';
if(!/a-shaiva-lens-on-shiva-as-the-supreme-deity/.test(location.pathname))return;
const style=document.createElement('style');style.textContent=`
.document-paged-page *,.document-paged-page *::before,.document-paged-page *::after{box-sizing:border-box}
.document-paged-page{--paper:#fff;--ink:#332b24;--teal:#684632;--sanskrit:#684331;background:#eee9e3}
.document-paged-page .page{width:1260px;max-width:100%;background:#fff;padding:42px clamp(18px,4vw,58px) 85px}
.document-paged-page .reader-grid{grid-template-columns:210px minmax(0,850px);gap:34px;justify-content:stretch}
.document-paged-page .article{width:100%;max-width:850px;min-width:0}
.document-paged-page .article-head{width:850px;max-width:calc(100% - 244px);margin:0 0 44px auto}
.document-paged-page .document-content{font-family:Georgia,'Times New Roman',serif;font-size:18.5px;line-height:1.78;color:#302a25}
.document-paged-page .document-content p{max-width:100%;font-size:inherit;line-height:inherit;overflow-wrap:break-word;word-break:normal}
.document-paged-page .document-content .shaiva-mixed{margin:21px 0 30px;border:1px solid #d7c6b7;border-radius:4px;overflow:hidden;font-size:17px;line-height:1.7}
.document-paged-page .shaiva-mixed-head,.document-paged-page .shaiva-mixed-row{display:grid;grid-template-columns:minmax(0,43%) minmax(0,57%)}
.document-paged-page .shaiva-mixed-head{font:600 12px/1.5 system-ui,sans-serif;color:#654832;background:#f7f0e9}
.document-paged-page .shaiva-mixed-head>span{padding:10px 15px}
.document-paged-page .shaiva-mixed-head>span+span,.document-paged-page .shaiva-mixed-en{border-left:1px solid #decfc2}
.document-paged-page .shaiva-mixed-row{border-top:1px solid #decfc2}
.document-paged-page .shaiva-mixed-row:nth-child(2n){background:#fffcf8}
.document-paged-page .shaiva-mixed-sa,.document-paged-page .shaiva-mixed-en{min-width:0;padding:15px;overflow-wrap:anywhere;white-space:pre-wrap}
.document-paged-page .shaiva-mixed-sa{font:400 19px/1.9 'Noto Serif Devanagari','Nirmala UI',Mangal,serif;color:#69412f}
.document-paged-page .shaiva-mixed-en{font:400 17px/1.75 Georgia,serif;color:#372e28}
@media(max-width:1000px){.document-paged-page .page{padding:30px 21px 75px}.document-paged-page .reader-grid{display:block;max-width:850px;margin:auto}.document-paged-page .article-head{max-width:850px;margin:0 auto 35px}.document-paged-page .side-toc{display:none}.document-paged-page .mobile-toc{display:block}}
@media(max-width:620px){.document-paged-page .page{padding:23px 13px 55px}.document-paged-page .document-content{font-size:16.5px;line-height:1.75}.document-paged-page .shaiva-mixed-head{display:none}.document-paged-page .shaiva-mixed-row{display:block}.document-paged-page .shaiva-mixed-sa,.document-paged-page .shaiva-mixed-en{padding:12px 13px}.document-paged-page .shaiva-mixed-sa{font-size:18.5px}.document-paged-page .shaiva-mixed-en{border-left:0;border-top:1px dashed #decfc2;font-size:16px}}
`;document.head.append(style);
const devanagari=/[\u0900-\u097f]/,english=/[a-zA-Z]/;
const make=(tag,cls,t)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(t!==undefined)x.textContent=t;return x;};
function repair(p){if(p.closest('.shaiva-parallel,.shaiva-mixed,[lang^="sa"],blockquote,details,table'))return;
if(p.querySelector('a,button,img,svg,input'))return;
const raw=p.textContent||'';
const saCount=(raw.match(/[\u0900-\u097f]/g)||[]).length;
const enCount=(raw.match(/[a-zA-Z]/g)||[]).length;
if(enCount<45||!(saCount>=70||(saCount>=25&&/[॥।]/.test(raw))))return;
const runs=[];let kind='',buf='';
for(const ch of raw){const k=devanagari.test(ch)?'sa':english.test(ch)?'en':kind||'en';if(kind&&k!==kind){runs.push([kind,buf]);buf='';}kind=k;buf+=ch;}
if(buf)runs.push([kind,buf]);
const sa=runs.filter(x=>x[0]==='sa').map(x=>x[1]).join('').trim();
let en=runs.filter(x=>x[0]==='en').map(x=>x[1]).join('').trim();
if(sa.length<10||en.length<30)return;
en=en.replace(/^\s*(?:Devanagari\s+English Translation|Sanskrit\s+English Translation)\s*/i,'');
const saPieces=sa.split(/(?<=॥\s*[०-९0-9]+\s*॥)/u).map(x=>x.trim()).filter(Boolean);
const enPieces=en.split(/(?<=\(\d{1,3}\))/u).map(x=>x.trim()).filter(Boolean);
const aligned=saPieces.length>1&&saPieces.length===enPieces.length&&saPieces.every(s=>s.length>3);
const outer=make('section','shaiva-mixed');outer.setAttribute('role','table');outer.setAttribute('aria-label','Original Sanskrit and English separated for legible reading');
const head=make('div','shaiva-mixed-head');head.append(make('span',null,'Sanskrit · Devanāgarī'),make('span',null,'English translation'));outer.append(head);
const pairs=aligned?saPieces.map((s,i)=>[s,enPieces[i]]):[[sa,en]];
for(const[s,e]of pairs){const row=make('div','shaiva-mixed-row');row.setAttribute('role','row');const left=make('div','shaiva-mixed-sa',s);left.lang='sa-Deva';const right=make('div','shaiva-mixed-en',e);right.lang='en';row.append(left,right);outer.append(row);}
p.replaceWith(outer);
}
function scan(){const reader=document.querySelector('.document-content');if(!reader)return;for(const p of reader.querySelectorAll('p'))repair(p);}
function start(){scan();const reader=document.querySelector('.document-content');if(!reader)return;let running=false;const obs=new MutationObserver(()=>{if(running)return;running=true;requestAnimationFrame(()=>{running=false;scan();});});obs.observe(reader,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();