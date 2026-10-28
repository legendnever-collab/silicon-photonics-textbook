/* Presentation only: move original inputs; save through the original learning state. */
(function(root){
'use strict';
const $=s=>document.querySelector(s),pilots=new Set(['1.4','12.2','12.5']),key='sipt-workspace-u3-v1';
let prefs={},active=null,moved=[],bridge=null,bound=false,lastLesson='',revisiting=false,opened=false;
try{const v=JSON.parse(localStorage.getItem(key));if(v?.schema===1)for(const id of pilots)if(v.lessons?.[id])prefs[id]={visited:v.lessons[id].visited===true};}catch{}
function persist(){try{localStorage.setItem(key,JSON.stringify({schema:1,lessons:prefs}));}catch{}}
function release(){
 for(const {node,origin}of moved){if(origin.isConnected)origin.replaceWith(node);else node.remove();}
 moved=[];active=null;
}
function mount(lesson,callbacks){
 if(lastLesson!==lesson.id){revisiting=prefs[lesson.id]?.visited===true;lastLesson=lesson.id;opened=false;}
 if(!pilots.has(lesson.id))return;bridge=callbacks;
 const panel=document.createElement('section');panel.className='u3-learning';panel.id='u3-learning';panel.setAttribute('aria-label','예측 · 조작 · 관찰 · 설명');
 const title=document.createElement('h3');title.textContent='예측 → 조작 → 관찰 → 설명';
 const hint=document.createElement('p');hint.textContent='필요할 때 기존 학습 메모를 실험 옆에서 쓰세요. 자유 탐색도 바로 할 수 있습니다. 입력은 선택 사항이며 자동 채점하지 않습니다.';
 const toggle=document.createElement('button');toggle.id='u3-toggle';toggle.type='button';toggle.textContent='실험 옆에서 쓰기';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','u3-fields');
 const fields=document.createElement('div');fields.id='u3-fields';fields.hidden=true;
 const status=document.createElement('p');status.id='u3-status';status.setAttribute('role','status');status.textContent='교재의 기존 Prediction · Reflection과 같은 메모입니다.';
 panel.append(title,hint,toggle,status,fields);$('#u2-guide').after(panel);
 const revisit=revisiting;
 if(revisit){
  const recall=document.createElement('details');recall.id='u3-recall';
  const summary=document.createElement('summary');summary.textContent='다시 떠올리기 · 선택 사항';
  const question=document.createElement('p');question.textContent='이전 메모를 보기 전에 생각해 보세요: '+lesson.prediction;
  const open=document.createElement('button');open.type='button';open.id='u3-recall-open';open.textContent='생각한 뒤 기존 메모 열기';open.onclick=()=>{if(!active)toggle.click();$('#prediction-note').focus();};
  recall.append(summary,question,open);panel.append(recall);
 }
 prefs[lesson.id]={visited:true};persist();
 function collect(){
  const pred=$('#prediction').closest('.prediction'),explanation=$('#experiment-explanation'),reflection=$('#reflection');
  return [pred,$('#compare-prediction'),$('#prediction-feedback'),document.querySelector('label[for="experiment-explanation"]'),explanation,document.querySelector('label[for="reflection"]'),reflection];
 }
 toggle.onclick=()=>{
  if(active){opened=false;release();fields.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='실험 옆에서 쓰기';status.textContent='메모를 교재의 원래 위치로 돌려놓았습니다.';}
  else{
   for(const node of collect()){
    const origin=document.createElement('span');origin.className='u3-origin';node.before(origin);moved.push({node,origin});fields.append(node);
   }
   const origin=moved[0].origin,back=document.createElement('button');back.type='button';back.className='u3-return';back.textContent='실험 옆에서 입력 중 · 교재로 가져오기';back.onclick=()=>{toggle.click();$('#prediction').focus();};origin.append(back);
   active=lesson.id;opened=true;fields.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.textContent='메모를 교재로 돌려놓기';status.textContent='기존 메모를 연결했습니다. 위 그래프를 보며 관찰과 이유를 적으세요.';
  }
  root.WorkspaceUI.refresh();
 };
 if(!bound){
  bound=true;const notebook=$('#notebook');
  notebook.addEventListener('input',e=>{if(e.target.matches('#u3-fields [data-note]')){bridge.note(e);e.stopPropagation();}});
  notebook.addEventListener('change',e=>{if(e.target.matches('#u3-fields #prediction')){bridge.prediction(e);e.stopPropagation();}});
  notebook.addEventListener('click',e=>{if(e.target.closest('#u3-fields #compare-prediction')){bridge.compare();e.stopPropagation();}});
 }
 if(opened)toggle.click();
}
root.WorkspaceU3={release,mount};
})(globalThis);
