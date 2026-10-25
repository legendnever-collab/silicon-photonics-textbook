"""Independent SI / closed-form continuous ODE / math.erfc references, no copied JS solver."""
from pathlib import Path
import json,subprocess,math
js="""import fs from'node:fs';import vm from'node:vm';const c={};vm.createContext(c);for(const p of['ch4-models','ch5-models','ch12-models'])vm.runInContext(fs.readFileSync('notebook/'+p+'.js','utf8'),c);const M=c.DynamicLinkPhysics;const cases=[];for(const filterMode of[0,1,2,3])for(const pattern of[0,1,2,3])for(const samplesUI of[32,64,128,256]){const r=M.evaluate({filterMode,pattern,samplesUI,testedBits:64,txGHz:8,rxGHz:11});cases.push({settings:r.settings,timing:r.timing,planes:r.planes,pattern:r.patternBits,samples:r.samples});}console.log(JSON.stringify({cases,tail:M.erfc?Array.from({length:151},(_,i)=>({x:i/10,y:M.erfc(i/10)})):[]}));"""
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',js],text=True))
count=0;max_rel=0;errors={}
h=6.62607015e-34;c=299792458;q=1.602176634e-19
for case in data['cases']:
 s=case['settings'];T=1/(s['rateGbps']*1e9);tt=1/(2*math.pi*s['txGHz']*1e9) if s['filterMode'] in [0,1] else 0;tr=1/(2*math.pi*s['rxGHz']*1e9) if s['filterMode'] in [0,2] else 0
 levels=[s['p0Mw']*1e-3,s['p1Mw']*1e-3];factor=10**(-s['lossDb']/10)*s['eta']*q*s['lambdaNm']*1e-9/(h*c);dark=s['darkNa']*1e-9
 for k in [0,1]:
  ref=levels[k]*factor;assert abs(ref-case['planes']['photoPlateauA'][k])<1e-11*max(ref,1e-20);count+=1
 pat=case['pattern'];x=y=levels[pat[0]]
 def advance(x,y,u,t):
  if tt==0:return u,u+(y-u)*math.exp(-t/tr) if tr else u
  e1=math.exp(-t/tt);nx=u+(x-u)*e1
  if tr==0:return nx,nx
  e2=math.exp(-t/tr)
  ny=u+(y-u)*e2+(x-u)*(t/tt)*e1 if abs(tt-tr)<1e-24 else u+(y-u)*e2+(x-u)*tt/(tt-tr)*(e1-e2)
  return nx,ny
 for k in range(case['timing']['warmupBits']):x,y=advance(x,y,levels[pat[k%len(pat)]],T)
 err=[]
 for k,sample in enumerate(case['samples']):
  u=levels[pat[k%len(pat)]];_,ys=advance(x,y,u,s['phase']*T);ref=ys*factor+dark;err.append(abs(ref-sample['meanA'])/max(levels[1]*factor,1e-20));assert sample['bit']==pat[k%len(pat)];count+=2;x,y=advance(x,y,u,T)
 e=max(err);max_rel=max(max_rel,e);errors[(s['filterMode'],s['pattern'],s['samplesUI'])]=e
 for f in [0.5,1,2]:
  tau=1/(2*math.pi*s['rxGHz']*1e9);mag=1/math.sqrt(1+(2*math.pi*f*s['rxGHz']*1e9*tau)**2);assert abs(mag-1/math.sqrt(1+f*f))<1e-12;count+=1
for mode in [0]:
 for p in [0,1,2,3]:
  ee=[errors[(mode,p,S)]for S in[32,64,128,256]];assert all(b<a*.65 for a,b in zip(ee,ee[1:])),ee;assert ee[1]<.02;count+=4
for mode in [1,2,3]:
 for p in [0,1,2,3]:assert errors[(mode,p,64)]<.0003;count+=1
for t in data['tail']:
 ref=math.erfc(t['x']);assert abs(t['y']-ref)<=max(2e-14,abs(ref)*2e-10),(t,ref);count+=1
# Independent SI variances and per-context math.erfc expected errors (not copied JS tail).
noise_js=js[:js.index('const cases=[];')]+"const cases=[];for(const filterMode of[0,1,2,3])for(const shotOn of[0,1])for(const thermalOn of[0,1])for(const lossDb of[0,6,40]){const r=M.evaluate({filterMode,shotOn,thermalOn,lossDb,testedBits:64});cases.push({settings:r.settings,planes:r.planes,noise:r.noise,samples:r.samples,errors:r.errors,expected:r.expectedError});}console.log(JSON.stringify(cases));"
noise_cases=json.loads(subprocess.check_output(['node','--input-type=module','-e',noise_js],text=True))
for case in noise_cases:
 s=case['settings'];enabled=s['filterMode']in[0,2];bn=math.pi/2*s['rxGHz']*1e9 if enabled else 0;sigmas=[]
 for bit in[0,1]:
  photo=case['planes']['photoPlateauA'][bit];shot=2*q*(photo+s['darkNa']*1e-9)*bn if s['shotOn'] else 0;thermal=(s['thermalPa']*1e-12)**2*bn if s['thermalOn'] else 0;sigmas.append(math.sqrt(shot+thermal));assert abs(sigmas[-1]-case['noise']['sigmaA'][bit])<1e-11*max(sigmas[-1],1e-20);count+=1
 expected=[];observed=0;threshold=s['thresholdUa']*1e-6
 for p in case['samples']:
  sigma=sigmas[p['bit']];ref=float((1 if p['meanA']>=threshold else 0)!=p['bit']) if sigma==0 else .5*math.erfc((p['meanA']-threshold if p['bit'] else threshold-p['meanA'])/(math.sqrt(2)*sigma));assert abs(ref-p['expectedError'])<2e-14;expected.append(ref);observed+=((1 if p['noisyA']>=threshold else 0)!=p['bit']);count+=1
 assert observed==case['errors'];assert abs(sum(expected)/len(expected)-case['expected'])<2e-14;count+=2
out={'comparisons':count,'status':'PASS','reference':'Closed-form continuous piecewise constant two-pole ODE, exact SI, independent math.erfc','cascadeMaxNormalizedErrorBySamplesUI':{str(S):max(errors[(0,p,S)]for p in[0,1,2,3])for S in[32,64,128,256]},'scope':'Numerical teaching-model consistency, not calibrated hardware accuracy'}
Path('docs/CH12_INDEPENDENT_VALIDATION.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
