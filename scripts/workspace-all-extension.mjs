// Reuse the verified U1 shell. These checked presentation-only changes generalize it.
export function extendWorkspace(source){let ui=source;const replace=(a,b)=>{if(ui.split(a).length!==2)throw Error('All-lesson UI anchor changed: '+a.slice(0,70));ui=ui.replace(a,()=>b);};
replace("pilots=new Set(['1.4','12.2','12.5'])","pilots=new Set(TEXTBOOK.lessons.map(l=>l.id))");
replace("['data-view','data-mode','data-field']","['data-view','data-mode','data-field','data-ch2-view','data-ch8-select']");
replace("const items=lesson==='1.4'?ps.slice(0,2):ps.filter(p=>p.querySelector('strong')&&!p.querySelector('[data-dynamic-snapshot]')).slice(0,2);",`const preferred=ps.filter(p=>p.querySelector('strong')&&!p.querySelector('[data-dynamic-snapshot]')&&!/^Not checked/i.test(p.textContent.trim()));
 const items=(lesson==='1.4'?ps:preferred.length?preferred:ps).slice(0,2).map(p=>{const c=p.cloneNode(true);if(c.textContent.trim().length<25&&p.previousElementSibling?.matches('p')&&!p.previousElementSibling.querySelector('strong'))c.prepend(p.previousElementSibling.textContent+': ');return c;});`);
replace(" out.replaceChildren("," if(items.length===1&&items[0].textContent.includes(' · ')){const parts=items[0].textContent.split(' · ');items.splice(0,1,...parts.slice(0,3).map(text=>{const p=create('p','');p.textContent=text;return p;}));}\n out.replaceChildren(");
replace("const view=$('#view'),pressed=$('#notebook [data-view][aria-pressed=true]');\n $('#ws-view').textContent=view?view.selectedOptions[0].textContent:pressed?.textContent||'Field Profile';",`const view=$('#notebook #view')||$('#notebook #modelView')||$('#notebook #viewMode')||$('#notebook #structureIndex'),pressed=$('#notebook [data-view][aria-pressed=true]')||$('#notebook [data-ch2-view][aria-pressed=true]');
 $('#ws-view').textContent=view?view.selectedOptions[0].textContent:pressed?.textContent||$('#notebook .scene-title').textContent;`);
const start=ui.indexOf('function frame(){'),end=ui.indexOf('\nfunction update(original){',start);
if(start<0||end<0)throw Error('Frame boundaries changed');
ui=ui.slice(0,start)+`function frame(){
 const plot=$('#notebook.ws-pilot #notebook-plot');if(!plot)return;
 const wave=lesson.startsWith('12.')&&$('#notebook #view')?.value==='0';$('.ws-lens').hidden=!wave;
 const roots=[...plot.querySelectorAll('svg:not(.ws-frame)')].filter(svg=>!svg.parentElement.closest('svg:not(.ws-frame)'));
 for(const svg of roots){
  let outer=svg.parentElement.matches('svg.ws-frame')?svg.parentElement:null;
  if(!outer){outer=document.createElementNS('http://www.w3.org/2000/svg','svg');outer.classList.add('ws-frame');outer.setAttribute('role','img');outer.setAttribute('aria-label',svg.getAttribute('aria-label')||$('#ws-title').textContent);svg.before(outer);outer.append(svg);}
  const v=svg.viewBox.baseVal,w=v.width,h=v.height;if(!(w>0&&h>0))continue;
  const box=wave&&lens!=='full'?(lens==='rx'?[0,330,640,240]:[0,75,640,255]):[0,0,w,h];
  outer.setAttribute('viewBox',box.join(' '));svg.setAttribute('width',w);svg.setAttribute('height',h);svg.style.width=w+'px';svg.style.height=h+'px';svg.style.minWidth='0';
  const min=w<=500?400:510,available=roots.length>1?(plot.clientWidth-16)/roots.length:plot.clientWidth;
  const width=Math.max(min,Math.min(available,Math.max(120,plot.clientHeight)*box[2]/box[3]));
  outer.style.width=width+'px';outer.style.height=width*box[3]/box[2]+'px';
 }
}
`+ui.slice(end);
replace("const old=m?[...m.children]:[],focused=document.activeElement;","const old=m?[...m.children]:[],focused=document.activeElement,pane=$('.ws-controls');\n const anchor=pane?.contains(focused)&&focused.matches('[data-setting],[data-select-setting]')?{el:focused,y:focused.getBoundingClientRect().top}:null;");
replace(' sync();return result;',' sync();if(anchor?.el.isConnected&&anchor.el.getBoundingClientRect().height>0)pane.scrollTop+=anchor.el.getBoundingClientRect().top-anchor.y;return result;');
return ui;}
