/* Restore Sanskrit from Caligayla's supplied PDF before the Varna-vicara-style reader paginates the article. */
(()=>{
'use strict';
if(!/\/articles\/a-vaishnava-lens-on-vishnu-as-the-supreme-deity\/?$/.test(location.pathname))return;
const root=document.getElementById('preface')?.parentElement;if(!root)return;
const children=[...root.children];
const text=n=>(n?.textContent||'').replace(/\s+/g,' ').trim();
const find=(tag,re)=>children.find(n=>n.matches(tag)&&re.test(text(n)));
function insert(anchor,key,verse){
 if(!anchor||root.querySelector(`[data-pdf-restoration="${key}"]`))return;
 const details=document.createElement('details');details.className='sanskrit-reveal';details.dataset.pdfRestoration=key;
 const summary=document.createElement('summary');summary.textContent='Show Sanskrit';
 const p=document.createElement('p');p.lang='sa-Deva';p.textContent=verse;details.append(summary,p);anchor.after(details);
}
// Page 22: Govindaraja's first Bhushana gloss.
insert(find('h3',/Commentary by Govindaraja \(Bhushana\)/),'22-govindaraja','आधिक्यावबोधेन न पक्षपातमूलमित्याह सर्षिगणा इति । अतीन्द्रियार्थद्रष्टार ऋषयः । न तत् ज्ञानं न पक्षपातमूलं न वा भ्रान्तिमूलमिति भावः ।');
// Page 32: Shankara's gloss on Bhagavad Gita 9.23.
insert(find('p',/source contrasts this with Shankaracarya.s gloss/i),'32-avidhi','अविधिपूर्वकम् अविधिः अज्ञानं तत्पूर्वकं यजन्ते इत्यर्थः ।');
// Pages 32–33: Shankara's Sanskrit commentary on 9.25.
insert(find('p',/Shankara explains “other beings” as Vinayaka/i),'32-33-other-beings','भूतानि विनायकमातृगणचतुर्भगिन्यादीनि यान्ति भूतेज्याः भूतानां पूजकाः । यान्ति मद्याजिनः मद्यजनशीलाः वैष्णवाः मामेव यान्ति । समाने अपि आयासे मामेव न भजन्ते अज्ञानात्तेन ते अल्पफलभाजः भवन्ति इत्यर्थः । न केवलं मद्भक्तानाम् अनन्तफलम् ।');
// Page 33: Shankara's Sanskrit commentary on Gita 6.47.
insert(find('p',/Shankara glosses “all yogis” as including worshippers of Rudra/i),'33-yogin','योगिनामपि सर्वेषां रुद्रादित्यादिध्यानपराणां मध्ये मद्गतेन मयि वासुदेवे समाहितेन अन्तरात्मना अन्तःकरणेन श्रद्धावान् श्रद्धाधानः सन् भजते सेवते यो मां स मे मम युक्ततमः ।');
// Pages 34–36: original opening questions of the Puranas, omitted in Sanskrit online.
insert(find('p',/\(i\) Garuda Purana 1\.1/i),'34-garuda','सूत ! जानासि सर्वं त्वं पृच्छामस्त्वामतो वयम् । देवतानां हि को देव ईश्वरः पूज्य एव कः । को ध्येयः को जगत्स्रष्टा जगत्पाति च हन्ति कः ।');
insert(find('p',/\(ii\) Padma Purana 1\.1/i),'35-padma','कथं पद्मं समुत्पन्नं ब्रह्म तत्र कथं न्यभूत् । प्रादुर्भूतेन कथं सृष्टिः कृता तां तु तथा वद । एवं पृष्टस्ततस्तांस्तु प्रत्युवाच शुभां गिरम् ।');
insert(find('p',/\(iii\) Vishnu Purana 1\.1/i),'35-vishnu','सोऽहमिच्छामि धर्मज्ञ श्रोतुं त्वत्तो यथा जगत् । बभूव भूयश्च यथा महाभाग भविष्यति ॥ ४ ॥ यन्मयं च जगद्ब्रह्मन्यतश्चैव चराचरम् । लीनमासीद्यथा यत्र लयमेष्यति यत्र च ॥ ५ ॥');
insert(find('p',/\(ii\) Skanda Purana 1\.1/i),'36-skanda','ऋषय ऊचुः । कथयस्व महाप्राज्ञ देवदेवस्य शूलिनः । महिमानं महाभाग ध्यानार्चनसमन्वितम् ।');
insert(find('p',/\(iii\) Shiva Purana 2\.1/i),'36-shiva','इदानीं कथय प्राज्ञ शिवरूपमनुत्तमम् । दिव्यानि वै चरित्राणि शिवयोश्च विशेषतः ॥ २१ ॥');
})();
