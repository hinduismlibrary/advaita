(()=>{
"use strict";
const SITE="/advaita/";
const form=document.getElementById("page-search-form");
const input=document.getElementById("page-search-query");
const status=document.getElementById("page-search-status");
const resultsList=document.getElementById("page-search-results");
if(!form||!input||!status||!resultsList)return;

const query=new URLSearchParams(window.location.search).get("q")?.trim()||"";
input.value=query;
form.addEventListener("submit",event=>{
  const term=input.value.trim();
  if(!term){
    event.preventDefault();
    input.focus();
    return;
  }
  input.value=term;
});

function localResultUrl(raw){
  let parsed;
  try{
    parsed=new URL(String(raw||"/"),window.location.origin);
  }catch(_error){
    return SITE;
  }
  if(parsed.origin!==window.location.origin)return SITE;
  const base=SITE.endsWith("/")?SITE.slice(0,-1):SITE;
  let path=parsed.pathname;
  if(path!==base&&!path.startsWith(base+"/")){
    path=base+(path.startsWith("/")?path:"/"+path);
  }
  return path+parsed.search+parsed.hash;
}
function addResult(data){
  const item=document.createElement("li");
  item.className="search-result";
  const heading=document.createElement("h2");
  const link=document.createElement("a");
  link.href=localResultUrl(data.url);
  link.textContent=data.meta?.title||"Untitled page";
  heading.append(link);
  item.append(heading);
  if(data.plain_excerpt){
    const excerpt=document.createElement("p");
    excerpt.textContent=data.plain_excerpt;
    item.append(excerpt);
  }
  resultsList.append(item);
}
async function runSearch(){
  if(!query){
    status.textContent="Enter a word or phrase to search the articles and texts on this site.";
    return;
  }
  status.textContent="Searching this site…";
  try{
    const pagefind=await import(SITE+"pagefind/pagefind.js");
    const response=await pagefind.search(query);
    const matches=response.results||[];
    if(!matches.length){
      status.textContent="No results found for “"+query+"”. Try another word or phrase.";
      return;
    }
    const visible=matches.slice(0,20);
    const data=await Promise.all(visible.map(result=>result.data()));
    data.forEach(addResult);
    status.textContent=matches.length>20
      ?"Found "+matches.length+" results on this site. Showing the first 20."
      :"Found "+matches.length+" "+(matches.length===1?"result":"results")+" on this site.";
  }catch(_error){
    status.textContent="The site's search index could not be loaded. Please reload the page and try again.";
  }
}
runSearch();
})();