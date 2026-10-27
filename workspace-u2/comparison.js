/* Presentation data only. All physical results come from the existing models. */
(function(root){'use strict';
const finite=(x,fallback)=>Number.isFinite(x)?x:fallback;
function slab(s={}){
 const width=Math.max(100,Math.min(1000,finite(s.width,220))),model=root.Photonics.slabTE(width);
 const selected=Math.round(Math.max(0,Math.min(model.modes.length-1,finite(s.mode,0))));
 return{settings:{width,mode:finite(s.mode,0)},model,mode:model.modes[selected],metrics:{'n_eff':model.modes[selected].neff,'Core Power (%)':model.modes[selected].corePower*100,'Allowed Modes':model.modes.length}};
}
function range(values,zero=false){const lo=Math.min(...values),hi=Math.max(...values),pad=Math.max((hi-lo)*.06,Math.abs(hi)*.02,1e-9);return[zero?Math.min(0,lo-pad):lo-pad,hi+pad];}
function bins(samples,domain,n=24){
 const counts=[Array(n).fill(0),Array(n).fill(0)],outside=[0,0];
 for(const p of samples){const x=p.noisyA*1e6;if(x<domain[0]||x>domain[1]){outside[p.bit]++;continue;}const j=Math.min(n-1,Math.floor((x-domain[0])/(domain[1]-domain[0])*n));counts[p.bit][j]++;}
 return{counts,outside};
}
function wavePoints(r,key,scale){return r.waveform[key].slice(0,r.settings.samplesUI*8+1).map((y,i)=>[i*r.timing.dtSec*1e12,y*scale]);}
function charts(id,current,reference,view,axis='auto'){
 const pair=axis==='fixed'?[reference]:[reference,current];
 if(id==='1.4'){
  if(view!=='field')return null;
  const extent=Math.max(.8,...pair.map(r=>r.model.a+.35)),x=[-extent,extent],y=[-1.1,1.1];
  const points=r=>Array.from({length:501},(_,i)=>{const z=-Math.max(.8,r.model.a+.35)+2*Math.max(.8,r.model.a+.35)*i/500;return[z,root.Photonics.slabField(r.mode,z)];});
  return{kind:'field',height:360,panels:[{title:'Signed Ey / max|Ey| · each mode normalized',xLabel:'x (µm)',yLabel:'Ey',x,y,current:[points(current)],reference:[points(reference)]}]};
 }
 if(view===0){
  const x=[0,Math.max(...pair.map(r=>r.timing.uiSec*8e12))];
  return{kind:'wave',height:590,panels:[['txW',1000,'Tx output (mW)'],['rxA',1e6,'Rx current (µA)']].map(([key,scale,title])=>({title,xLabel:'Time (ps) · first 8 UI of each condition',yLabel:'',x,y:range(pair.flatMap(r=>wavePoints(r,key,scale).map(p=>p[1])),true),current:[wavePoints(current,key,scale)],reference:[wavePoints(reference,key,scale)]}))};
 }
 if(view===1){
  const traces=r=>root.DynamicLinkPhysics.eyeTraceStarts(r,24).map(start=>r.waveform.rxA.slice(start,start+2*r.settings.samplesUI+1).map((v,i)=>[i/r.settings.samplesUI,v*1e6]));
  return{kind:'eye',height:500,panels:[{title:'Deterministic 2-UI Eye · no noisy continuous waveform',xLabel:'Time (UI) · UI duration is listed in the table',yLabel:'Rx (µA)',x:[0,2],y:range(pair.flatMap(r=>traces(r).flat().map(p=>p[1])),true),current:traces(current),reference:traces(reference)}]};
 }
 if(view===3){
  const x=range(pair.flatMap(r=>r.samples.map(p=>p.noisyA*1e6))),a=bins(current.samples,x),b=bins(reference.samples,x),peak=Math.max(1,...b.counts.flat(),...(axis==='fixed'?[]:a.counts.flat()));
  const points=counts=>counts.flatMap((n,i)=>[[x[0]+i/24*(x[1]-x[0]),n],[x[0]+(i+1)/24*(x[1]-x[0]),n]]);
  return{kind:'histogram',height:590,outside:{current:a.outside,reference:b.outside},panels:[0,1].map(bit=>({title:'Bit '+bit+' · actual seeded samples / shared bin',xLabel:'Decision current (µA)',yLabel:'Count',x,y:[0,peak*1.12],current:[points(a.counts[bit])],reference:[points(b.counts[bit])]}))};
 }
 return null;
}
function metrics(r){return{'UI (ps)':r.timing.uiSec*1e12,'Sample Opening (µA)':r.openingA===null?null:r.openingA*1e6,'Noise ENBW (GHz)':r.noise.enbwHz===null?null:r.noise.enbwHz/1e9,'σ0 (µA)':r.noise.sigmaA[0]*1e6,'σ1 (µA)':r.noise.sigmaA[1]*1e6,'Observed Errors':r.errors,'Tested Bits':r.settings.testedBits};}
root.WorkspaceComparison={slab,range,bins,charts,metrics};
})(globalThis);
