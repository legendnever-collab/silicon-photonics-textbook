(function(){
'use strict';
const {lessons}=TEXTBOOK, P=Photonics, $=s=>document.querySelector(s), key='sipt-ch1-v1';
const defaults=()=>({version:1,lesson:lessons[0].id,theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',positions:{},notes:{},answers:{},extras:{},predictions:{},settings:{},completed:[]});
let state=defaults(), storageOK=true, observer, navigating=false, scrollTimer;
try{const stored=localStorage.getItem(key);if(stored)state=validate(JSON.parse(stored));}catch(e){storageOK=false;}
function validate(v){
 if(!v||v.version!==1||!lessons.some(l=>l.id===v.lesson))throw Error('이 Chapter와 호환되는 version 1 기록이 아닙니다.');
 const clean=defaults();clean.lesson=v.lesson;clean.theme=v.theme==='dark'?'dark':'light';
 for(const id of lessons.map(l=>l.id)){
  clean.positions[id]=Math.max(0,Math.min(100000,Number(v.positions?.[id])||0));
  const l=lessons.find(l=>l.id===id), a=v.answers?.[id];if(Number.isInteger(a)&&a>=0&&a<l.tutor.choices.length)clean.answers[id]=a;
  if(['why','simple','math','notebook'].includes(v.extras?.[id]))clean.extras[id]=v.extras[id];
  const pred=v.predictions?.[id];if(Number.isInteger(pred)&&pred>=0&&pred<l.predictionOptions.length)clean.predictions[id]=pred;
  for(const type of ['reflection','prediction','explanation']){const n=v.notes?.[id+':'+type];if(typeof n==='string')clean.notes[id+':'+type]=n.slice(0,12000);}
  clean.settings[id]={};for(const [k,val] of Object.entries(v.settings?.[id]||{})){if(typeof val==='number'&&Number.isFinite(val))clean.settings[id][k]=Math.max(-100000,Math.min(100000,val));if(['signed','intensity','modes','polarization'].includes(val))clean.settings[id][k]=val;}
 }
 clean.completed=Array.isArray(v.completed)?v.completed.filter(id=>lessons.some(l=>l.id===id)):[];return clean;
}
function save(){try{localStorage.setItem(key,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}$('#save-status').textContent=storageOK?'이 기기에 자동 저장됨':'저장 불가 · 학습 기록에서 내보내세요';}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function current(){return lessons.find(l=>l.id===state.lesson)||lessons[0];}
function settings(){return state.settings[state.lesson]||(state.settings[state.lesson]={});}
function num(k,def,min,max){const v=settings()[k];return typeof v==='number'&&Number.isFinite(v)?Math.max(min,Math.min(max,v)):def;}
function setTheme(){document.documentElement.dataset.theme=state.theme;$('#theme').textContent=state.theme==='dark'?'Light':'Dark';$('#theme').setAttribute('aria-label',`${state.theme==='dark'?'Light':'Dark'} Theme로 전환`);}
function position(){return matchMedia('(max-width:760px)').matches?window.scrollY:$('#reading').scrollTop;}
function remember(){state.positions[state.lesson]=position();save();}
function renderNav(){const nav=$('#lesson-nav');nav.innerHTML=lessons.map(l=>`<button data-lesson="${l.id}" ${l.id===state.lesson?'aria-current="page"':''}><span>LESSON ${l.id}</span>${l.short}</button>`).join('');}
const sourceLinks={R1:['MIT · Dielectric Waveguides','https://web.mit.edu/6.013_book/www/chapter13/13.5.html'],R2:['MIT OCW · Lecture 15','https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec15/'],R3:['Ansys · Mode List and Deck','https://optics.ansys.com/hc/en-us/articles/360034396734-FDE-solver-analysis-Mode-List-and-Deck'],R4:['RP Photonics · Effective Refractive Index','https://www.rp-photonics.com/effective_refractive_index.html'],R5:['RP Photonics · Propagation Losses','https://www.rp-photonics.com/propagation_losses.html'],R6:['RP Photonics · Bend Losses','https://www.rp-photonics.com/bend_losses.html']};
function renderLesson(focus=false){
 navigating=true;observer?.disconnect();const l=current();renderNav();
 $('#reading').innerHTML=`<div class="chapter-label">CHAPTER 01 · FUNDAMENTALS OF OPTICAL WAVEGUIDES</div><div class="lesson-time">Lesson ${l.id} · ${l.time} 예상 · 학습 시간 미검증</div><h1>${l.title}</h1><p class="lead">${l.lead}</p><blockquote class="opening-question">${l.question}</blockquote>${l.sections.map(s=>`<section id="section-${s.key}" class="reading-section" data-section="${s.key}" data-scene="${s.scene}"><div class="section-label">${s.label}</div><h2>${s.title}</h2>${s.html}${s.key==='tutor'?tutorHTML(l):''}${s.key==='experiment'?experimentHTML(l):''}${s.key==='summary'?reflectionHTML(l):''}</section>`).join('')}<details class="source-links"><summary>이 Lesson의 참고자료와 모델 구분</summary><ul>${l.sources.map(id=>`<li>[${id}] <a href="${sourceLinks[id][1]}" target="_blank" rel="noopener noreferrer">${sourceLinks[id][0]}</a></li>`).join('')}</ul><p>본문과 그림은 독자적으로 작성했습니다. 원서 PDF는 확보하지 못했으며 확인하지 않은 페이지를 인용하지 않습니다. 전체 출처/모델 조건은 Repository의 references/SOURCE_MAPPING.md에 기록합니다.</p></details><footer class="lesson-footer"><button id="mark-read" aria-pressed="${state.completed.includes(l.id)}">${state.completed.includes(l.id)?'읽음 기록됨 · 취소':'이 Lesson 읽음으로 기록'}</button>${lessons.indexOf(l)<lessons.length-1?`<button class="primary" data-lesson="${lessons[lessons.indexOf(l)+1].id}">다음 Lesson 읽기 →</button>`:'<a href="#section-summary">Chapter Review로 돌아가기 ↑</a>'}</footer>`;
 for(const el of document.querySelectorAll('[data-note]'))el.value=state.notes[l.id+':'+el.dataset.note]||'';
 const pred=$('#prediction');if(pred)pred.value=state.predictions[l.id]||0;
 renderTutor();renderNotebook();placeNotebook();
 requestAnimationFrame(()=>{
   const y=state.positions[l.id]||0;
   if(matchMedia('(max-width:760px)').matches)window.scrollTo(0,y);else $('#reading').scrollTop=y;
   if(focus)$('#reading').focus({preventScroll:true});
   setupObserver();navigating=false;
 });
 document.title=`Lesson ${l.id} · ${l.short} — Silicon Photonics Textbook`;
}
function tutorHTML(l){return `<div class="tutor"><div class="tutor-meta">OFFLINE GUIDED TUTOR · 저자가 준비한 설명</div><h3>${l.tutor.question}</h3><div class="choices">${l.tutor.choices.map((c,i)=>`<button class="choice" data-answer="${i}" aria-pressed="false">${c.text}</button>`).join('')}</div><div class="feedback" id="tutor-feedback" role="status"></div><div class="tutor-actions"><button data-extra="why">왜 그런가요?</button><button data-extra="simple">더 쉽게 설명해 주세요</button><button data-extra="math">수식으로 설명해 주세요</button><button data-extra="notebook">Notebook과 연결하기</button></div><div id="extra-explanation" class="extra-explanation" role="status"></div></div>`;}
function experimentHTML(l){return `<div class="prediction"><label for="prediction" class="writing-label">실험 전 예측 · ${l.prediction}</label><select id="prediction">${l.predictionOptions.map((o,i)=>`<option value="${i}">${o}</option>`).join('')}</select><label class="writing-label" for="prediction-note">왜 그렇게 예상했나요? <span class="caption">선택 사항 · 이 기기에만 저장</span></label><textarea id="prediction-note" data-note="prediction" placeholder="먼저 생각을 적고, 계산 또는 실험과 비교해 보세요."></textarea></div><div id="mobile-notebook-slot"></div><button id="compare-prediction">예측과 결과를 연결해 보기</button><p id="prediction-feedback" class="prediction-result" role="status"></p><label class="writing-label" for="experiment-explanation">관찰 후 설명 · 예상과 같거나 달랐던 이유는 무엇인가요?</label><textarea id="experiment-explanation" data-note="explanation" placeholder="Notebook의 수치와 물리적 이유를 연결해 보세요."></textarea>`;}
function reflectionHTML(l){return `<label class="writing-label" for="reflection">${l.reflection}</label><textarea id="reflection" data-note="reflection" placeholder="이 메모는 자동 채점하지 않습니다. 자신의 설명을 남겨 보세요."></textarea>`;}
function renderTutor(){const l=current(),a=state.answers[l.id];document.querySelectorAll('[data-answer]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.answer)===a)));$('#tutor-feedback').textContent=Number.isInteger(a)?l.tutor.choices[a].feedback:'';const extra=state.extras[l.id];$('#extra-explanation').textContent=extra?l.tutor[extra]:'';document.querySelectorAll('[data-extra]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.extra===extra)));}
function setupObserver(){const root=matchMedia('(max-width:760px)').matches?null:$('#reading');observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0]){const section=visible[0].target;$('#notebook-context').textContent=`지금 읽는 절 · ${section.querySelector('h2').textContent}`;$('#notebook').dataset.scene=section.dataset.scene;}},{root,rootMargin:'-5% 0px -55% 0px',threshold:[0,.1,.3]});document.querySelectorAll('[data-section]').forEach(el=>observer.observe(el));}
function placeNotebook(){const n=$('#notebook');if(matchMedia('(max-width:760px)').matches)$('#mobile-notebook-slot').append(n);else $('.workspace').append(n);}
function shell(type,title,body,detail){return `<div class="notebook-top"><h2>Physics Notebook</h2><span class="model-type">${type}</span></div><p class="notebook-intro">예측을 남기고 결과를 살펴보세요. 관찰한 변화가 본문의 어떤 원리에서 나왔는지 연결합니다.</p><div class="notebook-sheet"><h3 class="scene-title">${title}</h3>${body}</div><details class="model-details"><summary>모델의 가정 · 단위 · 한계</summary>${detail}</details><p class="notebook-context" id="notebook-context">본문을 읽으면 현재 절과 연결됩니다.</p><a class="return-reading" href="#section-experiment">실험 본문으로 돌아가기 ↑</a>`;}
function slider(id,label,value,min,max,step,unit){return `<div class="controls"><label class="control-row" for="${id}"><span>${label}</span><output id="${id}-value" for="${id}">${value} ${unit}</output></label><input id="${id}" data-setting="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"><div class="range-bounds"><span>${min} ${unit}</span><span>${max} ${unit}</span></div></div>`;}
function svg(label,body,view='0 0 500 320'){return `<svg class="plot" viewBox="${view}" role="img" aria-label="${esc(label)}">${body}</svg>`;}
function renderNotebook(){
 const l=current();
 if(l.id==='1.1'){
  $('#notebook').innerHTML=shell('Analytical + Conceptual','Index Contrast와 TIR',`<div id="notebook-plot"></div><p class="plot-caption">Conceptual ray diagram · 각도는 경계의 Normal 기준입니다. 선의 굵기는 Power나 반사율을 나타내지 않습니다.</p>${slider('angle','입사각 θ₁',num('angle',45,5,80),5,80,1,'°')}<div class="readout" id="notebook-readout" role="status"></div>`,`<p>Snell’s Law와 θc 계산은 Analytical입니다. 그림은 Conceptual입니다. λ₀ = 1550 nm 부근의 예시 nCore = 3.48, nClad = 1.444를 고정합니다.</p><p>평탄한 무한 경계, 투명한 선형·등방성·비자성 매질을 가정합니다. Polarization별 Fresnel 반사율, Evanescent Field 크기, 실제 Strip Mode를 계산하지 않습니다.</p>`);
 }else renderAdvancedNotebook(l);
 updateNotebook();
}
function renderAdvancedNotebook(){throw Error('Lesson notebook not implemented');}
function updateNotebook(){
 if(current().id!=='1.1'){updateAdvancedNotebook();return;}
 const theta=num('angle',45,5,80), tc=P.criticalAngle(),tir=theta>tc, rad=theta*Math.PI/180;
 $('#angle-value').textContent=theta+' °';
 const x=240,y=150,len=130,s=Math.sin(rad),c=Math.cos(rad),ratio=3.48/1.444*s;
 const transmit=tir?`<path d="M110 126 Q240 110 370 126" stroke="var(--plot)" fill="none" stroke-width="2" stroke-dasharray="4 5"/><text x="274" y="90">Evanescent field</text>`:(()=>{const t=Math.asin(ratio);return `<path class="ray" d="M${x} ${y} L${x+120*Math.sin(t)} ${y-120*Math.cos(t)}"/><text x="330" y="79">Refracted ray</text>`;})();
 $('#notebook-plot').innerHTML=svg(`Normal 기준 입사각 ${theta}도. ${tir?'TIR, Cladding에 Evanescent Field 존재':'전파하는 굴절파 존재'}`,`<rect class="core" x="20" y="150" width="460" height="150" rx="5"/><line class="axis" x1="20" y1="150" x2="480" y2="150"/><line x1="240" x2="240" y1="45" y2="300" stroke="var(--muted)" stroke-dasharray="5 5"/><text x="252" y="40">Normal</text><text x="30" y="57">SiO₂ · n₂ = 1.444</text><text x="30" y="285">Si · n₁ = 3.48</text><path class="ray" d="M${x-len*s} ${y+len*c} L${x} ${y} L${x+len*s} ${y+len*c}"/>${transmit}<circle cx="240" cy="150" r="4" fill="var(--warm)"/><text x="155" y="211">θ₁ = ${theta}°</text><text x="300" y="252">Reflected ray</text>`);
 $('#notebook-readout').innerHTML=`<p>Critical Angle θc = <strong>${tc.toFixed(2)}°</strong></p><p>${tir?`θ₁ &gt; θc → <strong>TIR 条件を満たします</strong>`.replace('条件を満たします','조건을 만족합니다'):`θ₁ &lt; θc → 굴절각 θ₂ = <strong>${(Math.asin(ratio)*180/Math.PI).toFixed(1)}°</strong>`}</p><p class="caption">${tir?'바깥으로 진행하는 굴절파는 없지만 경계의 Field는 사라지지 않습니다.':'일부 빛이 Cladding으로 전파할 수 있습니다. 반사되는 성분도 존재합니다.'}</p>`;
}
function updateAdvancedNotebook(){}
function showSession(){remember();$('#session-content').innerHTML=lessons.map(l=>`<div class="session-item"><span>${l.id} · ${l.short}</span><span>${state.completed.includes(l.id)?'읽음으로 기록':'자유롭게 학습 중'}</span></div>`).join('');$('#session-dialog').showModal();}
$('#lesson-nav').addEventListener('click',e=>navigateClick(e));
$('#reading').addEventListener('click',e=>{
 const a=e.target.closest('[data-answer]'),extra=e.target.closest('[data-extra]');
 if(a){state.answers[state.lesson]=Number(a.dataset.answer);renderTutor();save();}
 if(extra){state.extras[state.lesson]=extra.dataset.extra;renderTutor();save();if(extra.dataset.extra==='notebook'&&matchMedia('(max-width:760px)').matches)$('#notebook').scrollIntoView();}
 if(e.target.closest('[data-lesson]'))navigateClick(e);
 if(e.target.closest('#mark-read')){const i=state.completed.indexOf(state.lesson);if(i<0)state.completed.push(state.lesson);else state.completed.splice(i,1);const b=$('#mark-read');b.setAttribute('aria-pressed',String(i<0));b.textContent=i<0?'읽음 기록됨 · 취소':'이 Lesson 읽음으로 기록';save();}
 if(e.target.closest('#compare-prediction'))$('#prediction-feedback').textContent=current().predictionFeedback;
});
function navigateClick(e){const b=e.target.closest('[data-lesson]');if(!b)return;remember();state.lesson=b.dataset.lesson;save();renderLesson(true);$('#lesson-nav [aria-current]').scrollIntoView({block:'nearest',inline:'nearest'});}
$('#reading').addEventListener('input',e=>{if(e.target.dataset.note){state.notes[state.lesson+':'+e.target.dataset.note]=e.target.value.slice(0,12000);save();}});
$('#reading').addEventListener('change',e=>{if(e.target.id==='prediction'){state.predictions[state.lesson]=Number(e.target.value);$('#prediction-feedback').textContent='';save();}});
$('#notebook').addEventListener('input',e=>{if(e.target.dataset.setting){settings()[e.target.dataset.setting]=Number(e.target.value);updateNotebook();save();}});
$('#notebook').addEventListener('change',e=>{if(e.target.dataset.selectSetting){settings()[e.target.dataset.selectSetting]=e.target.value;updateNotebook();save();}});
$('#notebook').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b){settings().view=b.dataset.view;renderNotebook();save();}const m=e.target.closest('[data-mode]');if(m){settings().mode=Number(m.dataset.mode);updateNotebook();save();}});
function onScroll(){if(navigating)return;clearTimeout(scrollTimer);scrollTimer=setTimeout(remember,250);}
$('#reading').addEventListener('scroll',onScroll,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('pagehide',remember);
matchMedia('(max-width:760px)').addEventListener('change',()=>{placeNotebook();setupObserver();});
$('#theme').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';setTheme();save();};
$('.brand').onclick=e=>{e.preventDefault();remember();state.lesson=lessons[0].id;state.positions[state.lesson]=0;save();renderLesson(true);};
$('#session').onclick=showSession;$('#close-session').onclick=()=>$('#session-dialog').close();
$('#export').onclick=()=>{remember();const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='silicon-photonics-ch1-study-record.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
$('#import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>1000000)throw Error('1 MB 이하의 학습 기록을 선택해 주세요.');const clean=validate(JSON.parse(await file.text()));state=clean;setTheme();save();renderLesson();$('#import-status').textContent='학습 기록을 불러왔습니다.';}catch(err){$('#import-status').textContent='가져오지 못했습니다. '+err.message;}e.target.value='';};
setTheme();renderLesson();save();
})();
