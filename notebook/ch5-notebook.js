(function(root){'use strict';
const common=[['lambdaNm','Wavelength λ',1550,800,1800,10,'nm'],['eta','External QE η_ext',.8,0,1,.01,''],['powerUw','Power at reference plane',100,0,1000,10,'µW']];
const response=[['rOhm','Small-signal R_eq',50,10,500,10,'Ω'],['cFf','Total C (junction + parasitic + load)',100,10,500,10,'fF'],['probeGhz','Probe frequency',20,0,100,1,'GHz'],['distanceUm','Carrier transit distance W',1,.1,5,.1,'µm'],['velocityE5','Assumed drift velocity',1,.1,2,.1,'×10⁵ m/s'],['darkNa','Dark current magnitude',10,0,1000,10,'nA'],['noiseGhz','Independent noise B',10,0,100,1,'GHz']];
const defs={
'5.1':{title:'Photon Counting & Unity-gain Responsivity',kind:'responsivity',controls:common,detail:'Reference Plane: Waveguide immediately before detector coupling region. Independent η_ext already includes coupling/absorption/collection. Fixed-η wavelength curve is not a material spectrum. Current magnitude only; no saturation.'},
'5.2':{title:'Independent RC, Transit and PIN Shot Noise',kind:'bandwidth',controls:[...response,...common],detail:'R_eq explicit equivalent resistance; total capacitance includes parasitics/load. First-order RC only. Transit W/v independent, no transit bandwidth or combined f. B is equivalent electrical noise bandwidth, not f_RC. Unity-gain Poisson shot noise; no thermal/amplifier/APD excess noise.'}
};
function sanitize(id,s){const out={};for(const[k,,v,lo,hi]of defs[id].controls)if(Number.isFinite(s[k]))out[k]=Math.max(lo,Math.min(hi,s[k]));return out;}
function render(l,s,{shell,slider}){const d=defs[l.id],clean={...defaults(l.id),...sanitize(l.id,s)};return shell('Analytical / Conceptual · Assumptions explicit',d.title,`<div id="notebook-plot"></div>${d.controls.map(([k,label,,lo,hi,step,unit])=>slider(k,label,clean[k],lo,hi,step,unit)).join('')}<div class="readout" id="notebook-readout" role="status"></div>`,`<p>${d.detail}</p>`);}
function defaults(id){return Object.fromEntries(defs[id].controls.map(([k,,v])=>[k,v]));}
function update(l,s){const d=defs[l.id],clean={...defaults(l.id),...sanitize(l.id,s)},r=Ch5Graphics[d.kind](clean);document.querySelector('#notebook-plot').innerHTML=r.graphic;document.querySelector('#notebook-readout').innerHTML=r.values;for(const[k,,,,,,unit]of d.controls){const e=document.getElementById(k+'-value');if(e)e.textContent=clean[k]+' '+unit;}}
root.Ch5Notebook={render,update,sanitize,defs,defaults};
})(globalThis);
