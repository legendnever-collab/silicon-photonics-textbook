(function(root){'use strict';
const C=root.WorkspaceComparison,$=s=>document.querySelector(s),pilots=new Set(['1.4','12.2','12.5']),key='sipt-workspace-u2-v1';
const hints={
 '1.4':{keys:['width'],title:'Width → V → Mode',text:'Width를 바꾸고 허용된 Mode와 Field를 비교하세요. V = k₀(d/2)√(nCore²−nClad²). Slab 계산이며 Strip의 2D 해가 아닙니다.'},
 '12.2':{keys:['txGHz','rxGHz'],title:'Bandwidth → Settling → ISI',text:'Tx와 Rx를 하나씩 바꿔 Time Waveform과 Eye를 비교하세요. τ = 1/(2πf). Rate·Pattern·Phase도 결과에 영향을 줍니다.'},
 '12.5':{keys:['rxGHz','thermalPa','shotOn','thermalOn'],title:'Rx Bandwidth → Noise / Settling',text:'σ² = σshot² + σthermal², B = πfRx/2. Noise 감소와 Settling 지연을 함께 관찰하세요. Opening이 항상 단조롭게 변하지는 않습니다.'}
};
let prefs={},id='',state=null,refresh=null,initial={};
try{const v=JSON.parse(localStorage.getItem(key));if(v?.schema===1)for(const k of pilots){const p=v.lessons?.[k];if(!p||typeof p!=='object')continue;prefs[k]={enabled:p.enabled===true,axis:p.axis==='fixed'?'fixed':'auto'};if(k==='1.4'&&p.reference&&Number.isFinite(p.reference.width)&&p.reference.width>=100&&p.reference.width<=1000&&Number.isInteger(p.reference.mode)&&p.reference.mode>=0&&p.reference.mode<=4)prefs[k].reference={width:p.reference.width,mode:p.reference.mode};}}catch{}
const pref=()=>prefs[id]||(prefs[id]={enabled:false,axis:'auto'});
const persist=()=>{try{localStorage.setItem(key,JSON.stringify({schema:1,lessons:prefs}));}catch{}};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=x=>x===null?'withheld':Number.isInteger(x)?String(x):Math.abs(x)<1e-4&&x!==0?x.toExponential(3):x.toFixed(4);
function effective(s){return id==='1.4'?C.slab(s).settings:root.DynamicLinkPhysics.sanitize(s);}
function reference(){return id==='1.4'?pref().reference:root.DynamicLinkPhysics.snapshot(state).settings||null;}
function mount(lesson,s,redraw){
 id=lesson;state=s;refresh=redraw;if(!pilots.has(id))return;
 const pane=$('.ws-controls'),guide=document.createElement('section');guide.className='u2-guide';guide.id='u2-guide';guide.setAttribute('aria-label','핵심 Parameter와 기준 비교');
 guide.innerHTML='<h3>'+hints[id].title+'</h3><p class="u2-hint">'+hints[id].text+'</p><p class="u2-formula" id="u2-formula"></p><details class="u2-primary" open><summary>핵심 Parameter</summary><div id="u2-primary"></div></details><div class="u2-actions"><button id="u2-save">기준 저장</button><button id="u2-toggle" aria-pressed="false">비교 켜기</button><label>축 <select id="u2-axis"><option value="auto">Auto · 공통 범위</option><option value="fixed">Fixed · 기준 범위</option></select></label></div><p id="u2-status" role="status"></p><p id="u2-changes" aria-live="polite"></p><details class="u2-details"><summary>기준 / 현재 · 수치와 축</summary><div id="u2-results"></div><div id="u2-conditions"></div><p id="u2-scope"></p></details><p class="u2-more">모든 Parameter와 원래 결과는 아래에서 계속 조작할 수 있습니다.</p>';
 pane.prepend(guide);
 const primary=$('#u2-primary');for(const k of hints[id].keys){const control=$('#'+k);if(!control)continue;const wrapper=control.closest('.controls');if(wrapper)primary.append(wrapper);else{const label=document.querySelector('label[for="'+k+'"]');if(label)primary.append(label);primary.append(control);}}
 if(id==='1.4'){primary.append($('#mode-buttons'));$('#u2-save').onclick=()=>{pref().reference={...effective(state)};pref().enabled=true;persist();refresh();};}
 else{const capture=$('#ch12-capture');$('#u2-save').replaceWith(capture);capture.classList.add('u2-save');capture.textContent='기준 저장 · Frozen 재취득';capture.title='기존 Save Comparison: Frozen Evidence를 현재 조건으로 교체합니다.';capture.addEventListener('click',()=>{pref().enabled=true;persist();});}
 $('#u2-toggle').onclick=()=>{pref().enabled=!pref().enabled;persist();refresh();};
 $('#u2-axis').value=pref().axis;$('#u2-axis').onchange=e=>{pref().axis=e.target.value;persist();refresh();};
 initial[id]||={...effective(s)};sync(id,s);root.WorkspaceUI.refresh();
}
function draw(chart){
 const wave=chart.kind==='wave',n=chart.panels.length,height=chart.height;let body='<title>Reference dashed, Current solid; shared axes</title>';
 const text=(x,y,t,anchor='start')=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'">'+esc(t)+'</text>';
 let clipped=0;
 chart.panels.forEach((p,i)=>{
  const top=wave?(i?390:125):n===2?(i?355:100):85,bottom=wave?(i?505:260):n===2?(i?475:220):height-85;
  const X=x=>80+(x-p.x[0])/(p.x[1]-p.x[0])*510,Y=y=>bottom-(y-p.y[0])/(p.y[1]-p.y[0])*(bottom-top),clip='u2-clip-'+i;
  body+='<defs><clipPath id="'+clip+'"><rect x="80" y="'+top+'" width="510" height="'+(bottom-top)+'"/></clipPath></defs>'+text(24,top-42,p.title)+text(80,top-17,'Reference - - -   Current ━━━');
  body+='<path class="u2-axis-line" d="M80 '+top+' V'+bottom+' H590"/>';
  for(const f of[0,.5,1]){body+=text(70,Y(p.y[0]+f*(p.y[1]-p.y[0]))+5,fmt(p.y[0]+f*(p.y[1]-p.y[0])),'end')+text(X(p.x[0]+f*(p.x[1]-p.x[0])),bottom+23,fmt(p.x[0]+f*(p.x[1]-p.x[0])),'middle');}
  body+=text(335,bottom+48,p.xLabel,'middle');
  for(const [kind,series]of[['reference',p.reference],['current',p.current]])for(const points of series){clipped+=points.filter(([x,y])=>x<p.x[0]||x>p.x[1]||y<p.y[0]||y>p.y[1]).length;body+='<path data-u2-series="'+kind+'" clip-path="url(#'+clip+')" class="u2-curve u2-'+kind+'" d="'+points.map(([x,y],j)=>(j?'L':'M')+X(x).toFixed(3)+' '+Y(y).toFixed(3)).join(' ')+'"/>';}
 });
 return{graphic:'<svg class="u2-svg" role="img" aria-label="Reference dashed and Current solid on shared '+esc(chart.kind)+' axes" viewBox="0 0 640 '+height+'">'+body+'</svg>',clipped};
}
function sync(lesson,s){
 if(!pilots.has(lesson)||!$('#u2-guide'))return;id=lesson;state=s;
 const now=effective(s),ref=reference(),source=ref||initial[id]||now,keys=id==='1.4'?['width','mode']:root.DynamicLinkPhysics.physical,changed=keys.filter(k=>now[k]!==source[k]);
 for(const el of document.querySelectorAll('#notebook [data-setting]')){const k=el.dataset.setting;el.classList.toggle('u2-changed',changed.includes(k));el.closest('.controls')?.classList.toggle('u2-changed',changed.includes(k));}
 $('#mode-buttons')?.classList.toggle('u2-changed',changed.includes('mode'));
 const terms={width:'d → V → n_eff / Ey',txGHz:'fTx → τTx',rxGHz:'fRx → τRx / ENBW',thermalPa:'iThermal² × ENBW',shotOn:'2q(Iphoto + Idark) × ENBW',thermalOn:'σThermal²'};
 $('#u2-formula').innerHTML=hints[id].keys.map(k=>'<span data-u2-term="'+k+'"'+(changed.includes(k)?' class="u2-diff"':'')+'>'+terms[k]+'</span>').join(' · ');
 $('#u2-changes').textContent=(ref?'기준 대비':'시작 조건 대비')+' 변경: '+(changed.length?changed.map(k=>document.querySelector('label[for="'+k+'"]')?.textContent||k).join(' · '):'없음');
 const toggle=$('#u2-toggle');toggle.disabled=!ref;toggle.setAttribute('aria-pressed',String(pref().enabled&&!!ref));toggle.textContent=pref().enabled&&ref?'비교 끄기':'비교 켜기';$('#u2-axis').disabled=!ref;
 $('#u2-results').replaceChildren();$('#u2-conditions').replaceChildren();$('#u2-scope').textContent='';
 if(!ref){$('#u2-status').textContent='현재 조건을 기준으로 저장한 뒤 Parameter를 바꿔 보세요.';return;}
 const a=id==='1.4'?C.slab(now):root.DynamicLinkPhysics.evaluate(now),b=id==='1.4'?C.slab(ref):root.DynamicLinkPhysics.evaluate(ref),am=id==='1.4'?a.metrics:C.metrics(a),bm=id==='1.4'?b.metrics:C.metrics(b);
 $('#u2-results').innerHTML='<table><caption>Δ = Current − Reference</caption><thead><tr><th>Result</th><th>Reference</th><th>Current</th><th>Δ</th></tr></thead><tbody>'+Object.keys(am).map(k=>'<tr><th>'+esc(k)+'</th><td>'+fmt(bm[k])+'</td><td>'+fmt(am[k])+'</td><td data-u2-delta="'+esc(k)+'">'+fmt(am[k]===null||bm[k]===null?null:am[k]-bm[k])+'</td></tr>').join('')+'</tbody></table>';
 $('#u2-conditions').innerHTML='<details><summary>변경 조건 · Reference → Current</summary>'+keys.map(k=>'<p'+(changed.includes(k)?' class="u2-diff"':'')+'>'+esc(k)+': '+fmt(ref[k])+' → '+fmt(now[k])+'</p>').join('')+'</details>';
 const view=id==='1.4'?(s.view||'field'):now.view,chart=C.charts(id,a,b,view,pref().axis);
 let status=(id==='1.4'?'UI 기준 저장 · 학습 기록과 별도':'Frozen '+root.DynamicLinkPhysics.snapshot(s).status)+' · '+(pref().enabled?'Reference 점선 / Current 실선':'원래 그래프')+' · '+(pref().axis==='fixed'?'Fixed 기준 범위':'Auto 공통 범위');
 if(chart){
  $('#u2-scope').textContent=chart.panels.map(p=>p.title+': x=['+p.x.map(fmt).join(', ')+'], y=['+p.y.map(fmt).join(', ')+']').join(' · ');
  if(id==='1.4')$('#u2-scope').textContent+=' · Reference TE'+b.mode.m+' / Current TE'+a.mode.m+'. 각 Mode는 독립 정규화됩니다. 허용 범위를 벗어난 Mode 선택은 원래 모델의 유효 Mode로 표시합니다.';
  else $('#u2-scope').textContent+=' · Deterministic Eye와 seeded Decision-sample Histogram을 구별하세요. 유한 Sample이며 실제 BER 검증이 아닙니다.';
  if(pref().enabled){const r=draw(chart);$('#notebook-plot').innerHTML=r.graphic;status+=r.clipped?' · 범위 밖: '+r.clipped+' plot points (clipped)':'';if(chart.outside)status+=' · 범위 밖 Samples: Reference '+chart.outside.reference.reduce((a,b)=>a+b,0)+' / Current '+chart.outside.current.reduce((a,b)=>a+b,0);}
 }else status+=' · 이 View는 원래 그래프를 유지합니다. 수치는 아래 비교 표에서 확인하세요.';
 $('#u2-status').textContent=status;$('#notebook-plot').classList.toggle('u2-comparing',!!chart&&pref().enabled);
}
root.WorkspaceU2={mount,sync};
})(globalThis);
