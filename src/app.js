(function(){
'use strict';
const {lessons}=TEXTBOOK, P=Photonics, $=s=>document.querySelector(s), key=TEXTBOOK.storageKey||(TEXTBOOK.multiChapter?'sipt-textbook-v2':'sipt-ch1-v1');
const defaults=()=>({version:1,lesson:lessons[0].id,theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',positions:{},notes:{},answers:{},extras:{},predictions:{},settings:{},completed:[]});
let state=defaults(), storageOK=true, observer, navigating=false, scrollTimer;
try{const stored=localStorage.getItem(key)||(TEXTBOOK.fallbackKeys?TEXTBOOK.fallbackKeys.map(k=>localStorage.getItem(k)).find(Boolean):(TEXTBOOK.multiChapter?localStorage.getItem('sipt-ch1-v1'):null));if(stored)state=validate(JSON.parse(stored));}catch(e){storageOK=false;}
function validate(v){
 if(!v||v.version!==1||!lessons.some(l=>l.id===v.lesson))throw Error('이 Chapter와 호환되는 version 1 기록이 아닙니다.');
 const clean=defaults();clean.lesson=v.lesson;clean.theme=v.theme==='dark'?'dark':'light';
 for(const id of lessons.map(l=>l.id)){
  clean.positions[id]=Math.max(0,Math.min(100000,Number(v.positions?.[id])||0));
  const l=lessons.find(l=>l.id===id), a=v.answers?.[id];if(Number.isInteger(a)&&a>=0&&a<l.tutor.choices.length)clean.answers[id]=a;
  if(['why','simple','math','notebook'].includes(v.extras?.[id]))clean.extras[id]=v.extras[id];
  const pred=v.predictions?.[id];if(Number.isInteger(pred)&&pred>=0&&pred<l.predictionOptions.length)clean.predictions[id]=pred;
  for(const type of ['reflection','prediction','explanation']){const n=v.notes?.[id+':'+type];if(typeof n==='string')clean.notes[id+':'+type]=n.slice(0,12000);}
  clean.settings[id]={};for(const [k,val] of Object.entries(v.settings?.[id]||{})){if(typeof val==='number'&&Number.isFinite(val))clean.settings[id][k]=Math.max(-100000,Math.min(100000,val));if(['signed','intensity','modes','polarization','field','dispersion','strip','linear','db'].includes(val))clean.settings[id][k]=val;}
 if(id.startsWith('2.'))clean.settings[id]=Ch2Notebook.sanitize(id,clean.settings[id]);
 if(id.startsWith('3.'))clean.settings[id]=Ch3Notebook.sanitize(id,clean.settings[id]);
 if(id.startsWith('4.'))clean.settings[id]=Ch4Notebook.sanitize(id,clean.settings[id]);
 if(id.startsWith('5.'))clean.settings[id]=Ch5Notebook.sanitize(id,clean.settings[id]);
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
function renderNav(){const nav=$('#lesson-nav');const activeChapter=state.lesson.split('.')[0];if(TEXTBOOK.multiChapter){let chapterNav=$('#chapter-nav');if(!chapterNav){chapterNav=document.createElement('nav');chapterNav.id='chapter-nav';chapterNav.setAttribute('aria-label','Chapter 선택');nav.before(chapterNav);chapterNav.addEventListener('click',navigateClick);}chapterNav.innerHTML=(TEXTBOOK.chapters||[{id:'1',title:'Waveguides'},{id:'2',title:'Passive Components'}]).filter(c=>lessons.some(l=>l.id===c.id+'.1')).map(ch=>{const c=ch.id;return `<button data-lesson="${c}.1" ${c===activeChapter?'aria-current="page"':''}>Chapter ${c} · ${ch.title}</button>`;}).join('');}nav.innerHTML=lessons.filter(l=>!TEXTBOOK.multiChapter||l.id.startsWith(activeChapter+'.')).map(l=>`<button data-lesson="${l.id}" ${l.id===state.lesson?'aria-current="page"':''}><span>LESSON ${l.id}</span>${l.short}</button>`).join('');}
const sourceLinks={D0:['Chrostowski & Hochberg · Chapter 7 official contents (full text not accessed)','https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf'],D1:['Hamamatsu · Si photodiode principles and noise','https://www.hamamatsu.com/content/dam/hamamatsu-photonics/sites/documents/99_SALES_LIBRARY/ssd/si_pd_kspd9001e.pdf'],D2:['Ansys · Ge-on-Si optical and electronic modelling','https://optics.ansys.com/hc/en-us/articles/360042828913-Germanium-on-Silicon-lateral-photodetector'],D3:['Hamamatsu · QE and responsivity definitions','https://hub.hamamatsu.com/us/en/technical-notes/detector-selection/the-wits-guide-to-selecting-a-photodetector.html'],A0:['Chrostowski & Hochberg · Chapter 6 Contents','https://assets.cambridge.org/97811070/85459/toc/9781107085459_toc.pdf'],A1:['Soref–Bennett · Plasma Dispersion','https://doi.org/10.1109/JQE.1987.1073206'],A2:['MIT · PN Junction Fundamentals','https://ocw.mit.edu/courses/6-012-microelectronic-devices-and-circuits-fall-2009/'],A3:['Bogaerts et al. · Microring Resonators','https://www.photonics.intec.ugent.be/download/pub_3105.pdf'],I0:['Chrostowski & Hochberg · Chapter 5 Contents','https://assets.cambridge.org/97811070/85459/toc/9781107085459_toc.pdf'],I1:['Ansys · Mode overlap and power normalization','https://optics.ansys.com/hc/en-us/articles/360034396834-Understanding-the-mode-overlap-calculation'],I2:['Flexcompute · Gaussian and waveguide overlap','https://www.flexcompute.com/tidy3d/examples/notebooks/ModeOverlap/'],I3:['Hadden et al. · Grating phase matching','https://arxiv.org/abs/2207.06157'],I4:['Ansys · Polarization diversity architecture','https://optics.ansys.com/hc/en-us/articles/45496988997011-2D-Polarization-Splitting-Grating-Couplers'],C0:['Chrostowski & Hochberg · Chapter 4 / Official Contents','https://assets.cambridge.org/97811070/85459/toc/9781107085459_toc.pdf'],C1:['Yariv · Coupled-mode theory for guided-wave optics','https://doi.org/10.1109/JQE.1973.1077767'],C2:['Soldano & Pennings · MMI self-imaging','https://doi.org/10.1109/50.372474'],C3:['Bogaerts et al. · Silicon microring resonators','https://www.photonics.intec.ugent.be/download/pub_3105.pdf'],C4:['Ansys · Uniform Grating Coupled-wave Model','https://optics.ansys.com/hc/en-us/articles/39728177095059-Grating-Options-in-the-TWLM'],R1:['MIT · Dielectric Waveguides','https://web.mit.edu/6.013_book/www/chapter13/13.5.html'],R2:['MIT OCW · Lecture 15','https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec15/'],R3:['Ansys · Mode List and Deck','https://optics.ansys.com/hc/en-us/articles/360034396734-FDE-solver-analysis-Mode-List-and-Deck'],R4:['RP Photonics · Effective Refractive Index','https://www.rp-photonics.com/effective_refractive_index.html'],R5:['RP Photonics · Propagation Losses','https://www.rp-photonics.com/propagation_losses.html'],R6:['RP Photonics · Bend Losses','https://www.rp-photonics.com/bend_losses.html']};
function renderLesson(focus=false){
 navigating=true;observer?.disconnect();$('.workspace').append($('#notebook'));const l=current();$('#reading').dataset.chapter=l.id.split('.')[0];$('#notebook').dataset.chapter=l.id.split('.')[0];renderNav();
 $('#reading').innerHTML=`<div class="chapter-label">${TEXTBOOK.chapters?.find(c=>l.id.startsWith(c.id+'.'))?.label||(l.id.startsWith('2.')?'CHAPTER 02 · PASSIVE COMPONENTS & INTERFERENCE':'CHAPTER 01 · FUNDAMENTALS OF OPTICAL WAVEGUIDES')}</div><div class="lesson-time">Lesson ${l.id} · ${l.time} 예상 · 학습 시간 미검증</div><h1>${l.title}</h1><p class="lead">${l.lead}</p><blockquote class="opening-question">${l.question}</blockquote>${l.sections.map(s=>`<section id="section-${s.key}" class="reading-section" data-section="${s.key}" data-scene="${s.scene}"><div class="section-label">${s.label}</div><h2>${s.title}</h2>${s.html}${s.key==='tutor'?tutorHTML(l):''}${s.key==='experiment'?experimentHTML(l):''}${s.key==='summary'?reflectionHTML(l):''}</section>`).join('')}<details class="source-links"><summary>이 Lesson의 참고자료와 모델 구분</summary><ul>${l.sources.map(id=>`<li>[${id}] <a href="${sourceLinks[id][1]}" target="_blank" rel="noopener noreferrer">${sourceLinks[id][0]}</a></li>`).join('')}</ul><p>${l.id.startsWith('5.')?'원본 Chapter 7의 공식 목차와 페이지를 확인했습니다. 전체 본문·원본 Figure·문제·Code Listings에는 접근하지 않았습니다. 설명·SVG·계산은 독자 작성한 교육용 콘텐츠이며 Ge-on-Si 실측/PDK/FDTD/TCAD 결과가 아닙니다. docs/CH5_TEXTBOOK_SOURCE_MAPPING.md와 모델 한계를 참조하세요.':l.id.startsWith('4.')?'원본 Chapter 6의 공식 목차에 대응하며 독자 작성 교육용 모델을 사용합니다. TCAD/Full-wave/측정 결과가 아니라는 한계와 Source Mapping을 참조하세요.':l.id.startsWith('3.')?'원본 Chapter 5의 공식 세부 목차 순서를 따릅니다. 설명·Figure·모델은 독자 작성한 교육용 근사이며 실제 장치의 Full-wave/제작 검증이 아닙니다. 대응과 후속 학습은 TEXTBOOK_SOURCE_MAPPING.md에 기록합니다.':l.id.startsWith('2.')?'원본 Chapter 4의 공식 목차·세부 Section을 확인했습니다. 전체 본문·원본 실험 데이터는 재현하지 않았습니다. 독자 작성한 본문·SVG·해석 모델의 대응과 축소 이유는 TEXTBOOK_SOURCE_MAPPING.md에 기록합니다.':'본문과 그림은 독자적으로 작성했습니다. 원서 PDF는 확보하지 못했으며 확인하지 않은 페이지를 인용하지 않습니다. 전체 출처/모델 조건은 Repository의 references/SOURCE_MAPPING.md에 기록합니다.'}</p></details><footer class="lesson-footer"><button id="mark-read" aria-pressed="${state.completed.includes(l.id)}">${state.completed.includes(l.id)?'읽음 기록됨 · 취소':'이 Lesson 읽음으로 기록'}</button>${lessons.indexOf(l)<lessons.length-1?`<button class="primary" data-lesson="${lessons[lessons.indexOf(l)+1].id}">다음 Lesson 읽기 →</button>`:'<a href="#section-summary">Chapter Review로 돌아가기 ↑</a>'}</footer>`;
 TeachingFigures.mount($('#reading'),l.id,settings());
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
let connectedTopic='';
function setupObserver(){
 observer?.disconnect();connectedTopic='';
 const mobile=matchMedia('(max-width:760px)').matches,root=mobile?null:$('#reading');
 const targets=[...document.querySelectorAll('[data-section], [data-notebook-scene], [data-figure]')];
 function connect(){
  const top=(root?root.getBoundingClientRect().top:0)+80;
  const reached=targets.filter(el=>el.getBoundingClientRect().top<=top);
  const active=reached.at(-1)||targets[0];if(!active)return;
  const section=active.closest('[data-section]'),topic=active.dataset.notebookScene||section.dataset.scene;
  const context=$('#notebook-context');if(context)context.textContent=`지금 읽는 절 · ${section.querySelector('h2').textContent}`;
  $('#notebook').dataset.scene=topic;
  document.querySelectorAll('.teaching-figure').forEach(el=>el.classList.toggle('figure-active',el===active));
  if(current().id==='2.5'&&['ring','bragg','circuit'].includes(topic)&&topic!==connectedTopic){connectedTopic=topic;settings().ch2View=['ring','bragg','circuit'].indexOf(topic);renderNotebook();const c=$('#notebook-context');if(c)c.textContent=`지금 읽는 절 · ${section.querySelector('h2').textContent}`;}else if(current().id==='1.2'&&topic!==connectedTopic){
   const previous=connectedTopic;connectedTopic=topic;
   const view=topic==='polarization'?'polarization':'modes';
   if(previous&&settings().view!==view){settings().view=view;renderNotebook();const c=$('#notebook-context');if(c)c.textContent=`지금 읽는 절 · ${section.querySelector('h2').textContent}`;}
  }else connectedTopic=topic;
 }
 observer=new IntersectionObserver(connect,{root,rootMargin:'-5% 0px -55% 0px',threshold:[0,.1,.3]});targets.forEach(el=>observer.observe(el));connect();
}

function placeNotebook(){const n=$('#notebook');if(matchMedia('(max-width:760px)').matches)$('#mobile-notebook-slot').append(n);else $('.workspace').append(n);}
function shell(type,title,body,detail){return `<div class="notebook-top"><h2>Physics Notebook</h2><span class="model-type">${type}</span></div><p class="notebook-intro">예측을 남기고 결과를 살펴보세요. 관찰한 변화가 본문의 어떤 원리에서 나왔는지 연결합니다.</p><div class="notebook-sheet"><h3 class="scene-title">${title}</h3>${body}</div><details class="model-details"><summary>모델의 가정 · 단위 · 한계</summary>${detail}</details><p class="notebook-context" id="notebook-context">본문을 읽으면 현재 절과 연결됩니다.</p><a class="return-reading" href="#section-experiment">실험 본문으로 돌아가기 ↑</a>`;}
function slider(id,label,value,min,max,step,unit){return `<div class="controls"><label class="control-row" for="${id}"><span>${label}</span><output id="${id}-value" for="${id}">${value} ${unit}</output></label><input id="${id}" data-setting="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"><div class="range-bounds"><span>${min} ${unit}</span><span>${max} ${unit}</span></div></div>`;}
function svg(label,body,view='0 0 500 320'){return `<svg class="plot" viewBox="${view}" role="img" aria-label="${esc(label)}">${body}</svg>`;}
function renderNotebook(){
 const l=current();
 if(l.id.startsWith('5.')){$('#notebook').innerHTML=Ch5Notebook.render(l,settings(),{shell,slider});Ch5Notebook.update(l,settings());return;}
 if(l.id.startsWith('4.')){$('#notebook').innerHTML=Ch4Notebook.render(l,settings(),{shell,slider});Ch4Notebook.update(l,settings());return;}
 if(l.id.startsWith('3.')){$('#notebook').innerHTML=Ch3Notebook.render(l,settings(),{shell,slider});Ch3Notebook.update(l,settings());return;}
 if(l.id.startsWith('2.')){$('#notebook').innerHTML=Ch2Notebook.render(l,settings(),{shell,slider});Ch2Notebook.update(l,settings());return;}
 if(l.id==='1.1'){
  $('#notebook').innerHTML=shell('Analytical + Conceptual','Index Contrast와 TIR',`<div id="notebook-plot"></div><p class="plot-caption">Conceptual ray diagram · 각도는 경계의 Normal 기준입니다. 선의 굵기는 Power나 반사율을 나타내지 않습니다.</p>${slider('angle','입사각 θ₁',num('angle',45,5,80),5,80,1,'°')}<div class="readout" id="notebook-readout" role="status"></div>`,`<p>Snell’s Law와 θc 계산은 Analytical입니다. 그림은 Conceptual입니다. λ₀ = 1550 nm 부근의 예시 nCore = 3.48, nClad = 1.444를 고정합니다.</p><p>평탄한 무한 경계, 투명한 선형·등방성·비자성 매질을 가정합니다. Polarization별 Fresnel 반사율, Evanescent Field 크기, 실제 Strip Mode를 계산하지 않습니다.</p>`);
 }else renderAdvancedNotebook(l);
 updateNotebook();
}
function renderAdvancedNotebook(l){
 if(l.id==='1.2'){
  const view=settings().view==='polarization'?'polarization':'modes';
  $('#notebook').innerHTML=shell(view==='modes'?'Analytical · Slab TE':'Conceptual','Mode의 공간적 형태',`<div class="segmented"><button data-view="modes" aria-pressed="${view==='modes'}">Slab Mode</button><button data-view="polarization" aria-pressed="${view==='polarization'}">TE / TM 개념</button></div><div id="notebook-plot"></div><div id="mode-buttons" class="segmented"></div><div id="field-toggle" class="segmented"><button data-field="signed">Signed Field</button><button data-field="intensity">Field²</button></div><div class="readout" id="notebook-readout" role="status"></div>`,`<p>Slab: x 방향 Width d = 500 nm, y 방향 무한, z 방향 전파. λ₀ = 1550 nm, nCore = 3.48, nClad = 1.444. Ey인 TE만 풉니다. 유한한 Height의 Strip Mode가 아닙니다.</p><p>해석적으로 유도한 Slab 고유방정식을 80회 Bisection으로 풉니다. 그래프는 실제 1D 해의 성분 Ey 또는 Ey²이며 최대 진폭 1로 정규화합니다. 수치 근 찾기는 Full-vector Simulation 또는 실측 검증을 의미하지 않습니다.</p><p>Polarization 그림은 Conceptual이며 화살표 크기는 실제 Field 세기를 뜻하지 않습니다.</p>`);
 }else if(l.id==='1.3'){
  $('#notebook').innerHTML=shell('Analytical · Phase','길이에 쌓이는 Phase',`<div id="notebook-plot"></div><p class="plot-caption">단색 Wave의 정규화된 cos(βz)와 전체 Phase의 2π 나머지. 진폭은 1이며 Power를 계산하지 않습니다.</p>${slider('neff','가정한 n_eff',num('neff',2.4,1.5,3.4),1.5,3.4,.01,'')}${slider('length','전파 길이 L',num('length',10,0,20),0,20,.1,'µm')}<div class="readout" id="notebook-readout" role="status"></div>`,`<p>λ₀ = 1550 nm 고정. 균일한 단면, 단일 Mode, 실수 n_eff, 무손실 단색 전파를 가정합니다. n_eff Slider는 예제 입력이며 2D Strip Solver 결과가 아닙니다.</p><p>β는 rad/µm, L과 λ는 µm로 변환합니다. φ는 rad, φ/(2π)는 Cycle 수입니다. Group Velocity, Dispersion, 실제 Input Coupling은 계산하지 않습니다.</p>`);
 }else renderEngineeringNotebook(l);
}
function updateNotebook(){
 if(current().id.startsWith('5.')){Ch5Notebook.update(current(),settings());return;}
 if(current().id.startsWith('4.')){Ch4Notebook.update(current(),settings());return;}
 if(current().id.startsWith('3.')){Ch3Notebook.update(current(),settings());return;}
 if(current().id.startsWith('2.')){Ch2Notebook.update(current(),settings());return;}
 if(current().id!=='1.1'){updateAdvancedNotebook();return;}
 const theta=num('angle',45,5,80), tc=P.criticalAngle(),tir=theta>tc, rad=theta*Math.PI/180;
 $('#angle-value').textContent=theta+' °';
 const x=240,y=150,len=130,s=Math.sin(rad),c=Math.cos(rad),ratio=3.48/1.444*s;
 const transmit=tir?`<path d="M110 126 Q240 110 370 126" stroke="var(--plot)" fill="none" stroke-width="2" stroke-dasharray="4 5"/><text x="274" y="90">Evanescent field</text>`:(()=>{const t=Math.asin(ratio);return `<path class="ray" d="M${x} ${y} L${x+120*Math.sin(t)} ${y-120*Math.cos(t)}"/><text x="330" y="79">Refracted ray</text>`;})();
 $('#notebook-plot').innerHTML=svg(`Normal 기준 입사각 ${theta}도. ${tir?'TIR, Cladding에 Evanescent Field 존재':'전파하는 굴절파 존재'}`,`<rect class="core" x="20" y="150" width="460" height="150" rx="5"/><line class="axis" x1="20" y1="150" x2="480" y2="150"/><line x1="240" x2="240" y1="45" y2="300" stroke="var(--muted)" stroke-dasharray="5 5"/><text x="252" y="40">Normal</text><text x="30" y="57">SiO₂ · n₂ = 1.444</text><text x="30" y="285">Si · n₁ = 3.48</text><path class="ray" d="M${x-len*s} ${y+len*c} L${x} ${y} L${x+len*s} ${y+len*c}"/>${transmit}<circle cx="240" cy="150" r="4" fill="var(--warm)"/><text x="155" y="211">θ₁ = ${theta}°</text><text x="300" y="252">Reflected ray</text>`);
 $('#notebook-readout').innerHTML=`<p>Critical Angle θc = <strong>${tc.toFixed(2)}°</strong></p><p>${tir?`θ₁ &gt; θc → <strong>TIR 조건을 만족합니다</strong>`:`θ₁ &lt; θc → 굴절각 θ₂ = <strong>${(Math.asin(ratio)*180/Math.PI).toFixed(1)}°</strong>`}</p><p class="caption">${tir?'바깥으로 진행하는 굴절파는 없지만 경계의 Field는 사라지지 않습니다.':'일부 빛이 Cladding으로 전파할 수 있습니다. 반사되는 성분도 존재합니다.'}</p>`;
}
function fieldPlot(model,mode,kind='signed'){
 const extent=Math.max(.8,model.a+.35), left=49,right=475,top=45,bottom=245,mid=(top+bottom)/2;
 const X=x=>left+(x+extent)/(2*extent)*(right-left),Y=e=>kind==='intensity'?bottom-170*e:mid-85*e;
 const values=Array.from({length:501},(_,i)=>{const x=-extent+2*extent*i/500,e=P.slabField(mode,x);return `${i?'L':'M'}${X(x).toFixed(2)} ${Y(kind==='intensity'?e*e:e).toFixed(2)}`;}).join(' ');
 const ticks=[-extent,-model.a,0,model.a,extent].filter((v,i,a)=>!i||v-a[i-1]>.05);
 return svg(`1D symmetric Slab TE${mode.m}, ${kind==='intensity'?'normalized Ey squared':'normalized signed Ey'} versus x in micrometers`, `<rect class="core" x="${X(-model.a)}" y="${top}" width="${X(model.a)-X(-model.a)}" height="${bottom-top}"/><text x="${X(-model.a)+5}" y="34">Si Core</text><text x="340" y="34">SiO₂</text><line class="axis" x1="${left}" x2="${right}" y1="${Y(0)}" y2="${Y(0)}"/><line class="axis" x1="${left}" x2="${left}" y1="${top}" y2="${bottom}"/><path class="field" d="${values}"/>${ticks.map(x=>`<line class="axis" x1="${X(x)}" x2="${X(x)}" y1="${bottom}" y2="${bottom+5}"/><text x="${X(x)}" y="${bottom+24}" text-anchor="middle">${x.toFixed(2)}</text>`).join('')}<text x="12" y="65">1</text><text x="8" y="${Y(0)+5}">0</text>${kind==='signed'?'<text x="4" y="235">−1</text>':''}<text x="245" y="301" text-anchor="middle">x (µm) · ${kind==='intensity'?'Ey² / max|Ey|²':'Ey / max|Ey|'}</text>`);
}
function updateAdvancedNotebook(){
 const l=current();
 if(l.id==='1.2'){
  if(settings().view==='polarization'){
   $('#notebook-plot').innerHTML=svg('Conceptual polarization of a finite strip: propagation z, width x, height y. Quasi TE predominantly Ex, quasi TM predominantly Ey.',`<rect class="core" x="100" y="100" width="280" height="115"/><rect x="100" y="100" width="280" height="115" stroke="var(--muted)" fill="none"/><path class="curve" d="M130 158 H345 M335 150 L345 158 L335 166"/><path class="ray" d="M240 202 V113 M232 123 L240 113 L248 123"/><text x="100" y="255">x · Width</text><text x="31" y="115">y</text><text x="30" y="137">Height</text><text x="291" y="145">Ex</text><text x="247" y="124">Ey</text><text x="105" y="62">z: propagation</text><text x="45" y="298">Quasi-TE: Ex</text><text x="280" y="298">Quasi-TM: Ey</text>`);
   $('#mode-buttons').innerHTML='';$('#field-toggle').hidden=true;
   $('#notebook-readout').innerHTML='<p><strong>유한한 Silicon Strip의 개념도</strong></p><p>Chip 면: x–z, Height: y. 실제 Strip에서는 종방향 성분도 존재할 수 있습니다. 화살표는 주된 방향을 설명하며 정량 Field Profile이 아닙니다.</p><p class="caption">이 Notebook의 Slab TE는 Ey 성분입니다. Slab의 불변 축과 Chip의 면을 다르게 정의했기 때문에 이름만 보고 Strip Quasi-TE와 동일시하지 마세요.</p>';
  }else{
   const model=P.slabTE(500),index=Math.round(num('mode',0,0,model.modes.length-1)),mode=model.modes[index],kind=settings().field==='intensity'?'intensity':'signed';
   $('#notebook-plot').innerHTML=fieldPlot(model,mode,kind);$('#field-toggle').hidden=false;
   $('#mode-buttons').innerHTML=model.modes.map(m=>`<button data-mode="${m.m}" aria-pressed="${m.m===index}">TE${m.m===0?'₀':m.m===1?'₁':'₂'}</button>`).join('');
   document.querySelectorAll('[data-field]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.field===kind)));
   $('#notebook-readout').innerHTML=`<p>TE<sub>${mode.m}</sub> · 내부 Node <strong>${mode.m}개</strong> · n_eff <strong>${mode.neff.toFixed(4)}</strong></p><p>허용된 Slab TE Mode: ${model.modes.length}개. 최대 진폭 1로 각각 정규화했으므로 Mode 사이 Power 크기를 비교하지 않습니다.</p><p class="caption">Analytical model · 수치 근 찾기. 2D Strip 또는 측정 결과가 아닙니다.</p>`;
  }
 }else if(l.id==='1.3'){
  const n=num('neff',2.4,1.5,3.4),L=num('length',10,0,20),p=P.phase(n,1550,L),angle=p.phi%(2*Math.PI);
  $('#neff-value').textContent=n.toFixed(2);$('#length-value').textContent=L.toFixed(1)+' µm';
  const path=Array.from({length:801},(_,i)=>{const z=i/800*3.1;return `${i?'L':'M'}${(42+z/3.1*420).toFixed(2)} ${(95-38*Math.cos(p.beta*z)).toFixed(2)}`;}).join(' ');
  $('#notebook-plot').innerHTML=svg('Normalized real field cos beta z for first 3.1 micrometers and phase modulo 2 pi at selected length',`<line class="axis" x1="42" x2="462" y1="95" y2="95"/><path class="curve" d="${path}"/><text x="30" y="40">Re(E) / E₀ · first 3.1 µm</text><text x="42" y="155">0</text><text x="427" y="155">3.1 µm</text><circle cx="112" cy="237" r="45" stroke="var(--line)" fill="none"/><path class="curve" d="M112 237 L${112+42*Math.cos(angle)} ${237-42*Math.sin(angle)}"/><text x="185" y="226">${angle.toFixed(2)} rad (mod 2π)</text><text x="185" y="252">${p.cycles.toFixed(2)} cycles · L=${L.toFixed(1)}</text><text x="30" y="310">λg = ${(p.guidedUm*1000).toFixed(1)} nm</text>`);
  $('#notebook-readout').innerHTML=`<p>β = 2π × ${n.toFixed(2)} / 1.55 = <strong>${p.beta.toFixed(3)} rad/µm</strong></p><p>φ = ${p.beta.toFixed(3)} × ${L.toFixed(1)} = <strong>${p.phi.toFixed(3)} rad</strong></p><p>λg = 1.55 / ${n.toFixed(2)} = <strong>${p.guidedUm.toFixed(3)} µm</strong></p><p class="caption">위 그래프는 같은 길이의 확대 구간입니다. L만 바꾸면 β와 물결 간격은 그대로이고 누적 Phase만 변합니다.</p>`;
 }else updateEngineeringNotebook();
}
function renderEngineeringNotebook(l){
 if(l.id==='1.4'){
  const view=['dispersion','strip'].includes(settings().view)?settings().view:'field';
  $('#notebook').innerHTML=shell(view==='strip'?'Conceptual · Strip':'Analytical · Slab TE','Width와 Mode의 관계',`<div class="segmented"><button data-view="field" aria-pressed="${view==='field'}">Field Profile</button><button data-view="dispersion" aria-pressed="${view==='dispersion'}">n_eff vs Width</button><button data-view="strip" aria-pressed="${view==='strip'}">Strip Geometry</button></div><div id="notebook-plot"></div><p id="geometry-caption" class="plot-caption"></p>${slider('width','Slab의 전체 Width d',num('width',220,100,1000),100,1000,10,'nm')}<div id="mode-buttons" class="segmented"></div><div class="readout" id="notebook-readout" role="status"></div>`,`<p>대칭 Slab: x 방향 전체 Width d, y 방향 무한, 전파 z, TE의 Electric Field는 Ey. λ₀ = 1550 nm, nCore = 3.48, nClad = 1.444 고정. 유한 Height는 없습니다.</p><p>V = k₀(d/2)√(nCore²−nClad²). Mode m은 V > mπ/2일 때 계산합니다. TE 고유방정식은 80회 Bisection. ΓTE는 이 Slab TE의 축 방향 Power 비율이며 2D Energy Fraction이 아닙니다.</p><p>Strip Geometry는 Conceptual입니다. H = 220 nm를 그림 설명용으로 표시하며 Slab 계산에 입력하지 않습니다. 실제 Strip의 2D Field, Quasi-TE/TM n_eff, Bend Loss를 예측하지 않습니다.</p>`);
 }else if(l.id==='1.5'){
  $('#notebook').innerHTML=shell('Analytical ledger · 합성 데이터','Bend, Loss와 Footprint',`<p class="note" style="margin-top:10px">Radius별 Bend Loss는 가정한 교육용 데이터입니다. PDK·실측·수치 전자기 해가 아닙니다.</p><div id="notebook-plot"></div>${slider('radius','Bend Radius R',num('radius',2,0,3),0,3,1,'')}<p class="caption">Radius 후보: 2 / 5 / 10 / 20 µm · 동일한 90° Bend 네 개</p><div class="readout" id="notebook-readout" role="status"></div><details open><summary>모든 후보의 Loss Ledger 비교</summary><div id="ledger-table" class="table-wrap"></div></details>`,`<p>α = 3 dB/cm, 직선 2 mm, Circular 90° Bend N = 4개. b(R): R = 2/5/10/20 µm에서 각각 0.4/0.08/0.02/0.005 dB/90°를 가정합니다.</p><p>Length [cm] = 0.2 + NπR/(2×10000). Propagation [dB] = αLength. 추가 Bend [dB] = N b(R). Total은 두 항의 합, Power 비율 = 10^(−Total/10).</p><p>Footprint는 한 코너 중심선의 R² Bounding Square [µm²]. 실제 Chip 면적, Width/Spacing, 접속·반사·공정 변화·Coupling은 제외합니다. 조건: 한 코너 100 µm² 이하, Total Loss 0.8 dB 이하. Radius별 데이터는 실제 Platform의 추천값이 아닙니다.</p>`);
 }
}
function dispersionPlot(width,selected){
 const left=50,right=476,top=40,bottom=240,X=d=>left+(d-100)/900*(right-left),Y=n=>bottom-(n-1.4)/2.1*(bottom-top);
 const colors=['var(--plot)','var(--warm)','#647bc0','#92709c','#7b8548'];
 const curves=colors.map((color,m)=>{let path='';for(let d=100;d<=1000;d+=5){const mode=P.slabTE(d).modes[m];if(mode)path+=`${path?'L':'M'}${X(d).toFixed(2)} ${Y(mode.neff).toFixed(2)} `;}return `<path fill="none" stroke="${color}" stroke-width="${m===selected?3:1.6}" d="${path}"/>`;}).join('');
 return svg('Slab TE effective indices versus full slab width from 100 to 1000 nanometers, all supported TE branches',`<line class="axis" x1="${left}" x2="${left}" y1="${top}" y2="${bottom}"/><line class="axis" x1="${left}" x2="${right}" y1="${bottom}" y2="${bottom}"/><line x1="${left}" x2="${right}" y1="${Y(1.444)}" y2="${Y(1.444)}" stroke="var(--line)" stroke-dasharray="4 5"/><text x="54" y="28">n_eff · TE₀ … TE₄</text>${[1.444,2,2.5,3,3.48].map(n=>`<text x="43" y="${Y(n)+4}" text-anchor="end">${n.toFixed(2)}</text>`).join('')}${curves}<line x1="${X(width)}" x2="${X(width)}" y1="${top}" y2="${bottom}" stroke="var(--muted)" stroke-dasharray="3 4"/>${[100,250,500,750,1000].map(d=>`<text x="${X(d)}" y="268" text-anchor="middle">${d}</text>`).join('')}<text x="260" y="303" text-anchor="middle">Full slab width d (nm)</text>`);
}
function updateEngineeringNotebook(){
 const l=current();
 if(l.id==='1.4'){
  const d=num('width',220,100,1000),model=P.slabTE(d),index=Math.round(num('mode',0,0,model.modes.length-1)),mode=model.modes[index],view=settings().view||'field';
  $('#width-value').textContent=d.toFixed(0)+' nm';
  $('#mode-buttons').innerHTML=model.modes.map(m=>`<button data-mode="${m.m}" aria-pressed="${m.m===index}">TE${m.m}</button>`).join('');
  if(view==='strip'){
   const W=80+d*.23;
   $('#notebook-plot').innerHTML=svg('Conceptual finite strip cross section, width varies for illustration and height 220nm is not used in slab calculation',`<rect class="core" x="25" y="35" width="450" height="235" rx="10"/><rect x="${250-W/2}" y="110" width="${W}" height="90" fill="var(--core)" stroke="var(--muted)"/><path d="M${250-W/2} 225 H${250+W/2}" stroke="var(--plot)" stroke-width="2"/><text x="250" y="252" text-anchor="middle">W = ${d.toFixed(0)} nm (illustration)</text><text x="${260+W/2}" y="150">H</text><text x="42" y="75">SiO₂ cladding · finite Si core</text><text x="250" y="301" text-anchor="middle">H = 220 nm · conceptual only</text>`);
   $('#geometry-caption').textContent='Conceptual · 실제 Strip은 Width와 Height가 모두 유한합니다. 이 그림에서 2D Field나 n_eff를 계산하지 않습니다.';
   $('#mode-buttons').hidden=true;$('#notebook-readout').innerHTML='<p>아래 Slab 계산과 이 Strip 개념도를 구별하세요. 유한 H = 220 nm는 Slab 모델의 입력이 아닙니다.</p><p class="caption">Field Profile 또는 n_eff vs Width에서 y 방향이 무한한 별도 모델을 실험할 수 있습니다.</p>';
  }else{
   $('#mode-buttons').hidden=false;$('#notebook-plot').innerHTML=view==='dispersion'?dispersionPlot(d,index):fieldPlot(model,mode);
   $('#geometry-caption').textContent=view==='dispersion'?'Analytical Slab · 모든 허용된 TE Branch. 점선은 현재 Width이며 실제 Strip의 Cutoff 곡선이 아닙니다.':'Analytical Slab · Signed Ey / max|Ey|. Core 밖의 Tail도 해의 일부입니다. y 방향 무한, 유한 Height 없음.';
   $('#notebook-readout').innerHTML=`<p>허용된 Slab TE Mode <strong>${model.modes.length}개</strong> · 선택 TE${mode.m}</p><p>n_eff = <strong>${mode.neff.toFixed(4)}</strong> · Core Power ΓTE = <strong>${(mode.corePower*100).toFixed(1)}%</strong></p><p class="caption">V = ${model.V.toFixed(3)} · 내부 Node ${mode.m}개. ΓTE는 이 TE Slab의 축 방향 Power 비율입니다.</p>`;
  }
 }else if(l.id==='1.5'){
  const index=Math.round(num('radius',2,0,3)),p=P.designLedger(index),R=p.radius,scale=5,side=R*scale;
  $('#radius-value').textContent=R+' µm';$('#radius').setAttribute('aria-valuetext',R+' micrometers');
  const bounds=$('#radius').nextElementSibling;bounds.children[0].textContent='2 µm';bounds.children[1].textContent='20 µm';
  $('#notebook-plot').innerHTML=svg('One circular 90 degree bend and radius squared bounding square at a common scale',`<rect x="130" y="45" width="${side}" height="${side}" fill="var(--soft)" stroke="var(--line)"/><path d="M130 ${45+side} A${side} ${side} 0 0 0 ${130+side} 45" fill="none" stroke="var(--plot)" stroke-width="5"/><path d="M130 45 V${45+side} M130 45 H${130+side}" stroke="var(--muted)" stroke-dasharray="4 3"/><text x="275" y="75">R = ${R} µm</text><text x="275" y="108">R² = ${R*R} µm²</text><text x="275" y="141">one 90° corner</text><text x="35" y="205">One corner · fixed scale</text>`, '0 0 500 225');
  $('#notebook-readout').innerHTML=`<p>Propagation <strong>${p.propagationDb.toFixed(3)} dB</strong> + Bend <strong>${p.bendsDb.toFixed(3)} dB</strong></p><p>Total <strong>${p.totalDb.toFixed(3)} dB</strong> → Power <strong>${(p.transmission*100).toFixed(1)}%</strong></p><p class="caption">${p.footprint<=100?'공간 ≤ 100 µm² 조건 만족':'공간 100 µm² 조건 초과'} · ${p.totalDb<=.8?'Loss ≤ 0.8 dB 조건 만족':'Loss 0.8 dB 조건 초과'}</p>`;
  $('#ledger-table').innerHTML=`<table><caption class="caption">가정한 Bend 데이터 · 단위: R [µm], Loss [dB], A [µm²]</caption><thead><tr><th scope="col">R</th><th scope="col">Prop.</th><th scope="col">Bend</th><th scope="col">Total</th><th scope="col">A</th></tr></thead><tbody>${P.bendTable.map((_,i)=>{const p=P.designLedger(i);return `<tr ${i===index?'style="background:var(--soft)"':''}><th scope="row">${p.radius}</th><td>${p.propagationDb.toFixed(3)}</td><td>${p.bendsDb.toFixed(3)}</td><td>${p.totalDb.toFixed(3)}</td><td>${p.footprint}</td></tr>`;}).join('')}</tbody></table><p class="caption">한 코너 A ≤ 100, Total ≤ 0.8. 전체 Route 길이는 선택에 따라 ${p.lengthCm.toFixed(5)} cm이며, 표의 Bend 항은 그 경로의 Propagation 이외의 추가 손실입니다.</p>`;
 }
}
function showSession(){remember();$('#session-content').innerHTML=(storageOK?'':'<p role="status">이 Browser에서 자동 저장할 수 없습니다. 기록 내보내기로 백업해 주세요.</p>')+lessons.map(l=>`<div class="session-item"><span>${l.id} · ${l.short}</span><span>${state.completed.includes(l.id)?'읽음으로 기록':'자유롭게 학습 중'}</span></div>`).join('');$('#session-dialog').showModal();}
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
$('#notebook').addEventListener('input',e=>{if(e.target.dataset.setting){settings()[e.target.dataset.setting]=Number(e.target.value);updateNotebook();TeachingFigures.refresh($('#reading'),settings());save();}});
$('#notebook').addEventListener('change',e=>{if(e.target.dataset.selectSetting){settings()[e.target.dataset.selectSetting]=e.target.value;updateNotebook();TeachingFigures.refresh($('#reading'),settings());save();}});
$('#notebook').addEventListener('click',e=>{const ch2=e.target.closest('[data-ch2-view]');if(ch2){settings().ch2View=Number(ch2.dataset.ch2View);renderNotebook();save();}const b=e.target.closest('[data-view]');if(b){settings().view=b.dataset.view;renderNotebook();save();}const f=e.target.closest('[data-field]');if(f){settings().field=f.dataset.field;updateNotebook();TeachingFigures.refresh($('#reading'),settings());save();}const m=e.target.closest('[data-mode]');if(m){settings().mode=Number(m.dataset.mode);updateNotebook();TeachingFigures.refresh($('#reading'),settings());save();}});
function onScroll(){if(navigating)return;clearTimeout(scrollTimer);scrollTimer=setTimeout(remember,250);}
$('#reading').addEventListener('scroll',onScroll,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('pagehide',remember);
matchMedia('(max-width:760px)').addEventListener('change',()=>{placeNotebook();setupObserver();});
$('#theme').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';setTheme();save();};
$('.brand').onclick=e=>{e.preventDefault();remember();state.lesson=lessons[0].id;state.positions[state.lesson]=0;save();renderLesson(true);};
$('#session').onclick=showSession;$('#close-session').onclick=()=>$('#session-dialog').close();
$('#export').onclick=()=>{remember();const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download=TEXTBOOK.multiChapter?'silicon-photonics-study-record.json':'silicon-photonics-ch1-study-record.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
$('#import').onchange=async e=>{$('#import-status').textContent='불러오는 중…';try{const file=e.target.files[0];if(!file)return;if(file.size>1000000)throw Error('1 MB 이하의 학습 기록을 선택해 주세요.');const clean=validate(JSON.parse(await file.text()));state=clean;setTheme();save();renderLesson();$('#import-status').textContent='학습 기록을 불러왔습니다.';}catch(err){$('#import-status').textContent='가져오지 못했습니다. '+err.message;}e.target.value='';};
TeachingFigures.bind({get:()=>settings(),set:(k,v)=>{settings()[k]=v;save();}});
setTheme();renderLesson();save();
})();
