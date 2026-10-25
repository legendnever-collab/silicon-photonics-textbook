/* UI-only adapter. No calls to Physics or evidence acquisition. */
(function(root){
'use strict';
const $=s=>document.querySelector(s),pilots=new Set(['1.4','12.2','12.5']),uiKey='sipt-workspace-ui-v1';
let lesson='',modal=null,origin=null,saved=null,resizeObserver=null,drag=null;
let prefs={rows:.70,mobile:.54,columns:.66};
let lens='rx';
try{const p=JSON.parse(localStorage.getItem(uiKey));for(const k of ['rows','mobile','columns'])if(Number.isFinite(p?.[k]))prefs[k]=Math.max(.25,Math.min(.8,p[k]));}catch{}
const create=(tag,cls)=>{const e=document.createElement(tag);e.className=cls;return e;};
function focusKey(e){if(!e)return null;if(e.id)return '#'+CSS.escape(e.id);for(const k of ['data-view','data-mode','data-field'])if(e.hasAttribute(k))return '['+k+'="'+e.getAttribute(k)+'"]';return null;}
function render(id,original){
 const n=$('#notebook'),same=id===lesson,scroll=same?$('.ws-controls')?.scrollTop||0:0;
 const key=same&&n.contains(document.activeElement)?focusKey(document.activeElement):null;
 if(modal?.open&&id!==lesson)close();
 resizeObserver?.disconnect();lesson=id;original();
 n.classList.remove('ws-pilot');document.body.classList.toggle('ws-active',pilots.has(id));
 if(!pilots.has(id))return;
 mount(n);$('.ws-controls').scrollTop=scroll;
 if(key)n.querySelector(key)?.focus({preventScroll:true});
}
function mount(n){
 n.classList.add('ws-pilot');n.dataset.workspaceLesson=lesson;
 const toolbar=create('div','ws-toolbar');
 toolbar.innerHTML='<div><span class="ws-eyebrow">LIVE · PHYSICS NOTEBOOK</span><h2 id="ws-title"></h2></div><button id="ws-expand" type="button">실험 화면 확대</button><button id="ws-close" type="button" hidden>닫기 · 교재로</button>';
 toolbar.querySelector('h2').textContent=n.querySelector('.scene-title').textContent;
 const observe=create('section','ws-observe');observe.setAttribute('aria-label','그래프와 주요 결과');
 const view=create('div','ws-view');view.id='ws-view';
 const lensControl=create('div','ws-lens');lensControl.innerHTML='<label for="ws-lens">표시 영역</label><select id="ws-lens"><option value="rx">Rx Current</option><option value="tx">Tx Power</option><option value="full">전체 그림</option></select>';
 lensControl.querySelector('select').value=lens;lensControl.querySelector('select').onchange=e=>{lens=e.target.value;frame();};
 const plot=n.querySelector('#notebook-plot');
 plot.setAttribute('tabindex','0');plot.setAttribute('aria-label','Live 그래프 · 필요한 경우 그래프 안에서 스크롤');
 const kpi=create('div','ws-kpi');kpi.id='ws-kpi';kpi.setAttribute('aria-live','polite');kpi.setAttribute('aria-atomic','true');
 observe.append(view,lensControl,plot,kpi);
 const separator=create('div','ws-separator');separator.tabIndex=0;separator.setAttribute('role','separator');separator.setAttribute('aria-label','그래프와 Parameter 영역 크기');separator.setAttribute('aria-controls','ws-observe ws-controls');observe.id='ws-observe';
 const controls=create('section','ws-controls');controls.id='ws-controls';controls.tabIndex=0;controls.setAttribute('aria-label','Parameter와 상세 결과 · 독립 스크롤');
 // Existing children, original controls, readout and dialogs are moved, not copied.
 while(n.firstChild)controls.append(n.firstChild);
 controls.querySelector('.notebook-sheet').classList.add('ws-sheet');
 n.append(toolbar,observe,separator,controls);
 toolbar.querySelector('#ws-expand').onclick=open;toolbar.querySelector('#ws-close').onclick=close;
 separator.addEventListener('keydown',resizeKey);separator.addEventListener('pointerdown',startDrag);
 separator.addEventListener('pointermove',moveDrag);separator.addEventListener('pointerup',endDrag);separator.addEventListener('pointercancel',endDrag);
 resizeObserver=new ResizeObserver(layout);resizeObserver.observe(n);sync();layout();
}
function sync(){
 if(!$('#notebook.ws-pilot'))return;
 const s=$('#notebook-readout'),out=$('#ws-kpi');if(!s||!out)return;
 // Present renderer-produced values without evaluating or duplicating physics.
 const ps=[...s.querySelectorAll('p')];
 const items=lesson==='1.4'?ps.slice(0,2):ps.filter(p=>p.querySelector('strong')&&!p.querySelector('[data-dynamic-snapshot]')).slice(0,2);
 out.replaceChildren(...items.map(p=>{const e=create('div','ws-metric');const c=p.cloneNode(true);if(lesson!=='1.4'){const br=c.querySelector('br');if(br){let node=br.nextSibling;while(node){const next=node.nextSibling;node.remove();node=next;}br.remove();}}e.textContent=c.textContent;return e;}));
 const view=$('#view'),pressed=$('#notebook [data-view][aria-pressed=true]');
 $('#ws-view').textContent=view?view.selectedOptions[0].textContent:pressed?.textContent||'Field Profile';
 frame();
}

function frame(){
 const plot=$('#notebook.ws-pilot #notebook-plot');if(!plot)return;
 let svg=plot.querySelector('svg.ch12-svg,svg.plot');if(!svg)return;
 const wave=lesson.startsWith('12.')&&$('#view')?.value==='0';
 $('.ws-lens').hidden=!wave;
 let outer=plot.querySelector('.ws-frame');
 if(!outer){outer=document.createElementNS('http://www.w3.org/2000/svg','svg');outer.classList.add('ws-frame');outer.setAttribute('role','img');outer.setAttribute('aria-label',svg.getAttribute('aria-label'));svg.before(outer);outer.append(svg);}
 const v=svg.viewBox.baseVal,w=v.width,h=v.height;
 const box=wave&&lens!=='full'?(lens==='rx'?[0,330,640,240]:[0,75,640,255]):[0,0,w,h];
 outer.setAttribute('viewBox',box.join(' '));svg.setAttribute('width',w);svg.setAttribute('height',h);
 svg.style.width=w+'px';svg.style.height=h+'px';svg.style.minWidth='0';
 const min=lesson==='1.4'?400:510;
 const width=Math.max(min,Math.min(plot.clientWidth,Math.max(120,plot.clientHeight)*box[2]/box[3]));
 outer.style.width=width+'px';outer.style.height=width*box[3]/box[2]+'px';
}

function update(original){
 const n=$('#notebook'),m=n?.querySelector('#mode-buttons');
 const old=m?[...m.children]:[],focused=document.activeElement;
 const result=original();
 if(n?.classList.contains('ws-pilot')&&m){
  for(const next of [...m.children]){const prev=old.find(b=>b.dataset.mode===next.dataset.mode);if(prev){prev.setAttribute('aria-pressed',next.getAttribute('aria-pressed'));next.replaceWith(prev);}}
  if(old.includes(focused)&&focused.isConnected)focused.focus({preventScroll:true});
 }
 sync();return result;
}
function isColumns(){return !!modal?.open&&matchMedia('(min-width:1000px), (min-width:700px) and (max-height:500px)').matches;}
function layout(){
 const n=$('#notebook.ws-pilot');if(!n)return;
 const sep=$('.ws-separator'),wide=isColumns(),active=modal?.open||matchMedia('(min-width:761px)').matches;
 sep.setAttribute('aria-orientation',wide?'vertical':'horizontal');sep.hidden=!active;
 if(!active){n.style.removeProperty('--ws-size');return;}
 const span=wide?n.clientWidth:n.clientHeight-$('.ws-toolbar').offsetHeight;
 const minObserve=wide?400:240,minControls=wide?280:144,gap=14;
 // Both panes remain usable even after viewport changes; short viewport is handled by CSS.
 const max=Math.max(minObserve,span-gap-minControls),size=Math.min(max,Math.max(minObserve,span*prefs[wide?'columns':matchMedia('(max-width:760px)').matches?'mobile':'rows']));
 n.style.setProperty('--ws-size',size+'px');
 sep.setAttribute('aria-valuemin',String(minObserve));sep.setAttribute('aria-valuemax',String(Math.round(max)));sep.setAttribute('aria-valuenow',String(Math.round(size)));sep.setAttribute('aria-valuetext',Math.round(size)+' pixels');
 $('#ws-expand').hidden=!!modal?.open;$('#ws-close').hidden=!modal?.open;frame();
}
function persist(){try{localStorage.setItem(uiKey,JSON.stringify(prefs));}catch{}}
function setSize(size){const n=$('#notebook'),wide=isColumns(),span=wide?n.clientWidth:n.clientHeight-$('.ws-toolbar').offsetHeight;const sep=$('.ws-separator');size=Math.max(+sep.getAttribute('aria-valuemin'),Math.min(+sep.getAttribute('aria-valuemax'),size));prefs[wide?'columns':matchMedia('(max-width:760px)').matches?'mobile':'rows']=size/span;layout();persist();}
function resizeKey(e){const wide=isColumns(),keys=wide?['ArrowLeft','ArrowRight']:['ArrowUp','ArrowDown'];if(![...keys,'Home','End'].includes(e.key))return;e.preventDefault();const sep=e.currentTarget,x=+sep.getAttribute('aria-valuenow');setSize(e.key==='Home'?+sep.getAttribute('aria-valuemin'):e.key==='End'?+sep.getAttribute('aria-valuemax'):x+(e.key===keys[0]?-1:1)*(e.shiftKey?40:16));}
function startDrag(e){if(e.button!==0)return;e.preventDefault();drag={id:e.pointerId,wide:isColumns(),position:isColumns()?e.clientX:e.clientY,size:+e.currentTarget.getAttribute('aria-valuenow')};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.focus({preventScroll:true});}
function moveDrag(e){if(!drag||e.pointerId!==drag.id)return;setSize(drag.size+(drag.wide?e.clientX:e.clientY)-drag.position);}
function endDrag(e){if(drag?.id===e.pointerId){drag=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}}
function open(){
 if(modal?.open)return;const n=$('#notebook');
 saved={windowY:scrollY,reading:$('#reading').scrollTop,controls:$('.ws-controls').scrollTop,focus:document.activeElement,bodyOverflow:document.body.style.overflow};
 origin=document.createComment('Notebook return location');n.before(origin);
 if(!modal){modal=create('dialog','ws-dialog');modal.id='workspace-dialog';modal.setAttribute('aria-labelledby','ws-title');modal.addEventListener('cancel',e=>{e.preventDefault();close();});document.body.append(modal);}
 modal.style.height='';modal.style.top='';modal.append(n);modal.showModal();document.body.style.overflow='hidden';document.body.classList.add('ws-expanded');layout();$('.ws-controls').scrollTop=saved.controls;$('#ws-close').focus({preventScroll:true});
}
function close(){
 if(!modal?.open)return;const n=$('#notebook'),s=saved;
 // Closing before moving preserves native dialog return-focus semantics.
 modal.close();origin.replaceWith(n);origin=null;document.body.classList.remove('ws-expanded');document.body.style.overflow=s.bodyOverflow;
 layout();$('.ws-controls').scrollTop=s.controls;$('#reading').scrollTop=s.reading;window.scrollTo(0,s.windowY);s.focus?.focus({preventScroll:true});saved=null;
}
root.addEventListener('resize',layout);root.visualViewport?.addEventListener('resize',()=>{if(modal?.open){modal.style.height=root.visualViewport.height+'px';modal.style.top=root.visualViewport.offsetTop+'px';}layout();});
root.WorkspaceUI={render,update,expanded:()=>!!modal?.open};
})(globalThis);
