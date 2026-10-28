/* Presentation adapter: original controls and renderers; no physical solver or evidence acquisition. */
(function(root){'use strict';
const $=s=>document.querySelector(s),catalog=root.WorkspaceU4Catalog,pilots=new Set(['1.4','12.2','12.5']),key='sipt-workspace-u4-v1';
const allowedStrings=new Set(['signed','intensity','modes','polarization','field','dispersion','strip','linear','db']);
let prefs={},lesson=null,raw={},redraw=null,initial={},labels={},lastSignature='',storageOK=true;
const cleanRecord=v=>Object.fromEntries(Object.entries(v||{}).filter(([k,x])=>!k.startsWith('snap_')&&k!=='captured'&&((typeof x==='number'&&Number.isFinite(x))||(typeof x==='string'&&allowedStrings.has(x)))).slice(0,100));
try{const v=JSON.parse(localStorage.getItem(key));if(v?.schema===1)for(const id of Object.keys(catalog)){const p=v.lessons?.[id];if(p&&typeof p==='object'){prefs[id]={enabled:p.enabled===true};if(p.reference&&typeof p.reference==='object'&&!Array.isArray(p.reference))prefs[id].reference=cleanRecord(p.reference);}}}catch{}
const pref=()=>prefs[lesson.id]||(prefs[lesson.id]={enabled:false});
function persist(){try{localStorage.setItem(key,JSON.stringify({schema:1,lessons:prefs}));storageOK=true;}catch{storageOK=false;}}
function values(s){
 const out={...s};for(const e of document.querySelectorAll('#notebook [data-setting],#notebook [data-select-setting]'))out[e.dataset.setting||e.dataset.selectSetting]=e.dataset.selectSetting?e.value:Number(e.value);
 for(const[attr,k]of[['data-view','view'],['data-field','field'],['data-mode','mode'],['data-ch2-view','ch2View']]){const b=document.querySelector('#notebook ['+attr+'][aria-pressed=true]');if(b)out[k]=['mode','ch2View'].includes(k)?Number(b.getAttribute(attr)):b.getAttribute(attr);}
 return out;
}
function source(l,s){const ch=Number(l.id.split('.')[0]);return ch===10&&s.view>=5?'sweep':ch===11?'wdm':ch===12?'dynamic':'ui';}
function reference(l,s){
 const type=source(l,s);
 if(type==='sweep'){const a=root.TestingPhysics.acquisition(s);return a.data?{state:{...s,...a.state},keys:root.TestingPhysics.captureKeys,status:a.status,type}:null;}
 if(type==='wdm'){const a=root.WDMPhysics.snapshot(s);return a.state?{state:{...s,...a.state},keys:root.WDMPhysics.captureKeys,status:a.status,type}:null;}
 if(type==='dynamic'){const a=root.DynamicLinkPhysics.snapshot(s);return a.settings?{state:{...s,...a.settings,view:s.view,captured:s.captured},keys:root.DynamicLinkPhysics.physical,status:a.status,type}:null;}
 let r=pref().reference;if(r){const ch=Number(l.id.split('.')[0]);if(ch>1)r=cleanRecord(root['Ch'+ch+'Notebook'].sanitize(l.id,r));else{const limits={angle:[5,80],neff:[1.5,3.4],length:[0,20],width:[100,1000],radius:[0,3],mode:[0,4]};if(Object.entries(r).some(([k,v])=>limits[k]&&(v<limits[k][0]||v>limits[k][1])))r=null;}}
 return r?{state:r,keys:[...new Set([...Object.keys(r),...Object.keys(cleanRecord(s))])],status:'UI Reference',type}:null;
}
function present(l,s){
 const ch=Number(l.id.split('.')[0]);if(ch===1)return root.WorkspaceU4Ch1(l,s);
 const n=root['Ch'+ch+'Notebook'];return n.u4Present(l,[2,3,4].includes(ch)?n.sanitize(l.id,s):s);
}
function observationChanged(a,b){return ['view','modelView','ch2View','viewMode','field'].some(k=>(a[k]??null)!==(b[k]??null));}
function numericRows(html){
 const box=document.createElement('div');box.innerHTML=html;const rows=[];
 for(const p of box.querySelectorAll('p')){
  const copy=p.cloneNode(true);for(const e of copy.querySelectorAll('strong'))e.textContent='□';const context=copy.textContent.replace(/\s+/g,' ').trim();
  [...p.querySelectorAll('strong')].forEach((e,index)=>{const m=e.textContent.trim().match(/^([+−-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+−-]?\d+)?)\s*([^\d]*)$/i);if(!m)return;const value=Number(m[1].replaceAll('−','-'));if(Number.isFinite(value))rows.push({key:context+'|'+index+'|'+m[2].trim(),label:context,unit:m[2].trim(),value,display:e.textContent.trim()});});
 }
 return rows;
}
function metricDeltas(a,b){const refs=new Map(numericRows(a).map(r=>[r.key,r]));return numericRows(b).filter(r=>refs.has(r.key)).map(r=>({label:r.label,unit:r.unit,reference:refs.get(r.key).display,current:r.display,delta:Number((r.value-refs.get(r.key).value).toPrecision(8))}));}
function cell(tag,text){const e=document.createElement(tag);e.textContent=String(text);return e;}
function table(headers,rows,caption){const t=document.createElement('table'),cap=document.createElement('caption');cap.textContent=caption;t.append(cap);const head=document.createElement('tr');headers.forEach(x=>head.append(cell('th',x)));const thead=document.createElement('thead');thead.append(head);t.append(thead);const body=document.createElement('tbody');for(const row of rows){const tr=document.createElement('tr');row.forEach((x,i)=>tr.append(cell(i?'td':'th',x)));body.append(tr);}t.append(body);return t;}
function graphic(html,prefix){
 const box=document.createElement('div');box.className='u4-graphic';box.inert=true;box.innerHTML=html;const ids=new Map([...box.querySelectorAll('[id]')].map(e=>[e.id,prefix+e.id]));
 for(const e of box.querySelectorAll('*'))for(const a of [...e.attributes]){
  if(a.name.startsWith('data-')||a.name.startsWith('on')||['tabindex','role'].includes(a.name)){e.removeAttribute(a.name);continue;}
  let value=a.value;if(a.name==='id')value=ids.get(value);else{for(const[id,replacement]of ids){value=value.replaceAll('url(#'+id+')','url(#'+replacement+')');if(value==='#'+id)value='#'+replacement;}}
  if(value!==a.value)e.setAttribute(a.name,value);
 }
 return box;
}
function panel(title,r,prefix){const section=document.createElement('section');section.className='u4-result';section.append(cell('h4',title),graphic(r.graphic,prefix));const readout=document.createElement('div');readout.className='u4-readout';readout.append(graphic(r.values,prefix+'readout-'));section.append(readout);return section;}
function primaryNode(k){
 if(k[0]==='@'){const selectors={'@view':'#notebook [data-view]','@mode':'#mode-buttons','@field':'#field-toggle'};const e=$(selectors[k]);return k==='@view'?e?.closest('.segmented'):e;}
 const e=$('#'+CSS.escape(k));if(!e)return null;const row=e.closest('.controls');if(row){return row.parentElement.matches('[data-laser-control],[data-circuit-control],[data-tune-channel]')?row.parentElement:row;}
 const group=document.createElement('div');group.className='u4-select';const label=document.querySelector('label[for="'+k+'"]');if(label)group.append(label);group.append(e);return group;
}
function mount(l,s,refresh){
 if(pilots.has(l.id))return;lesson=l;raw=s;redraw=refresh;lastSignature='';labels={};
 for(const e of document.querySelectorAll('#notebook [data-setting],#notebook [data-select-setting]'))labels[e.dataset.setting||e.dataset.selectSetting]=document.querySelector('label[for="'+e.id+'"]')?.textContent.trim()||e.id;
 Object.assign(labels,{view:'View',field:'Field 표시',mode:'Slab TE Mode',ch2View:'Ring / Bragg / Circuit'});
 const guide=document.createElement('section');guide.className='u2-guide u4-guide';guide.id='u2-guide';guide.dataset.u4Lesson=l.id;guide.setAttribute('aria-label','Lesson별 핵심 Parameter와 기준 비교');
 guide.innerHTML='<h3></h3><p id="u4-relation"></p><details class="u2-primary" open><summary>핵심 Parameter · 전체 항목은 아래</summary><div id="u4-primary"></div></details><div class="u2-actions"><button id="u4-save" type="button">UI 기준 저장</button><button id="u4-toggle" type="button" aria-pressed="false">나란히 비교 켜기</button></div><p id="u4-source"></p><p id="u4-changes" aria-live="polite"></p><details id="u4-comparison"><summary>기준 / 현재 · 원래 그래프와 Readout</summary><p class="u4-axis">각 그림은 원래 Renderer의 축·단위·정규화를 유지합니다. 축 범위는 독립적이며 공통 Auto/Fixed 축이 아닙니다. 축 눈금과 Model 범위를 확인하세요.</p><div id="u4-results"></div></details><p class="u2-more">교재·Guided Tutor·모든 Parameter·원래 결과와 Report를 계속 사용할 수 있습니다.</p>';
 guide.querySelector('h3').textContent=l.short+' · 변화 비교';guide.querySelector('#u4-relation').textContent=catalog[l.id].relation;
 $('.ws-controls').prepend(guide);const group=guide.querySelector('#u4-primary');for(const k of catalog[l.id].keys){const node=primaryNode(k);if(node&&!group.contains(node))group.append(node);}
 const ch=Number(l.id.split('.')[0]);
 if(ch>=10){
  const capture=$(ch===10?'#ch10-acquire':'#ch'+ch+'-capture');guide.querySelector('.u2-actions').prepend(capture);capture.classList.add('u4-native-save');capture.addEventListener('click',()=>{pref().enabled=true;persist();$('#u4-comparison').open=true;});
 }
 $('#u4-save').onclick=()=>{pref().reference=cleanRecord(values(raw));pref().enabled=true;persist();$('#u4-comparison').open=true;lastSignature='';redraw();};
 $('#u4-toggle').onclick=()=>{pref().enabled=!pref().enabled;persist();$('#u4-comparison').open=pref().enabled;lastSignature='';redraw();};
 $('#u4-comparison').addEventListener('toggle',()=>{if(lesson?.id===l.id&&$('#u4-comparison')?.open)sync(l,raw);});
 initial[l.id]??=cleanRecord(values(s));sync(l,s);root.WorkspaceUI.refresh();
}
function sync(l,s){
 if(pilots.has(l.id)||!$('#u4-source')||$('#u2-guide').dataset.u4Lesson!==l.id)return;lesson=l;raw=s;
 const now=values(s),ref=reference(l,now),base=ref?.state||initial[l.id],keys=ref?.keys||Object.keys(cleanRecord(now)),changed=keys.filter(k=>now[k]!==base[k]);
 for(const e of document.querySelectorAll('#notebook [data-setting],#notebook [data-select-setting]')){const k=e.dataset.setting||e.dataset.selectSetting;e.classList.toggle('u4-changed',changed.includes(k));e.closest('.controls')?.classList.toggle('u4-changed',changed.includes(k));}
 for(const[k,selector]of[['mode','#mode-buttons'],['field','#field-toggle']])$(selector)?.classList.toggle('u4-changed',changed.includes(k));
 $('#u4-relation').classList.toggle('u4-related-change',catalog[l.id].keys.some(k=>changed.includes(k)||k[0]==='@'&&changed.includes(k.slice(1))));
 $('#u4-changes').textContent=(ref?'기준 대비':'시작 조건 대비')+' 변경: '+(changed.length?changed.map(k=>labels[k]||k).join(' · '):'없음');
 const type=source(l,now),scope=type==='ui'?'UI Reference · 학습 Backup과 별도'+(l.id.startsWith('10.')?' · 원래 Frozen Sweep은 별도 Capture':''):type==='sweep'?'원래 Frozen Sweep · Capture Keys만 비교':type==='wdm'?'원래 Frozen WDM · Physical Keys 비교, Architecture/Channel/Pattern은 현재 선택 공유':'원래 Frozen Dynamic · Physical/Evidence Keys 비교, View는 현재 선택 공유';
 $('#u4-save').hidden=type!=='ui';
 $('#u4-source').textContent=scope+' · '+(ref?ref.status:'기준 없음 · 저장 버튼을 명시적으로 눌러 비교하세요.')+(storageOK?'':' · UI 설정 저장 불가 · 현재 세션에서만 유지');
 const toggle=$('#u4-toggle');toggle.disabled=!ref;toggle.setAttribute('aria-pressed',String(!!ref&&pref().enabled));toggle.textContent=ref&&pref().enabled?'나란히 비교 끄기':'나란히 비교 켜기';
 if(!ref||!pref().enabled){$('#u4-results').replaceChildren();lastSignature='';return;}
 if(!$('#u4-comparison').open)return;
 const signature=JSON.stringify([l.id,now,ref.state]);if(signature===lastSignature)return;lastSignature=signature;
 const a=present(l,ref.state),b=present(l,now),results=$('#u4-results');results.replaceChildren();const pair=document.createElement('div');pair.className='u4-pair';pair.append(panel('Reference · 원래 축',a,'u4-reference-'),panel('Current · 원래 축',b,'u4-current-'));results.append(pair);
 const different=observationChanged(ref.state,now),deltas=different?[]:metricDeltas(a.values,b.values);results.append(cell('p',different?'View / Model 표시가 달라 Δ 수치 비교를 보류합니다. 각 원래 그래프와 Readout을 확인하세요.':'Δ는 같은 표현·단위의 원래 Readout 표시값 차이입니다. 내부 계산 정밀도가 아니며 null/withheld는 0으로 바꾸지 않습니다.'));
 if(deltas.length)results.append(table(['Model Result','Reference','Current','Δ'],deltas.map(r=>[r.label,r.reference,r.current,String(r.delta)+(r.unit?' '+r.unit:'')]),'Δ = Current − Reference · 표시값 기준'));
 results.append(table(['조건','Reference','Current'],keys.filter(k=>!k.startsWith('snap_')&&k!=='captured').map(k=>[labels[k]||k,ref.state[k]??'— · 저장 범위 밖',now[k]??'— · 현재 View 범위 밖']),'조건과 Capture 범위'));
}
root.WorkspaceU4={mount,sync,present,metricDeltas,source};
})(globalThis);
