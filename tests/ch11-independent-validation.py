"""Independent frequency-domain scalar references for the declared four-carrier fixture."""
import json,math,pathlib,subprocess,itertools,random
C=299792458;H=6.62607015e-34;Q=1.602176634e-19;N=4;f0=C/1550
states=[{}, {'fsrGHz':300},{'fsrGHz':200,'spacingGHz':200},{'driftGHz':-20},{'driftGHz':15,'mismatchGHz':6},{'filterOffsetGHz':25},{'sourceMw':0},{'driveGHz':0},{'tapPercent':0},{'tapPercent':10,'polarDeg':45,'dxUm':1},{'mismatchGHz':20,'driftGHz':30},{'filterK':.05,'fsrGHz':1600}]
rng=random.Random(11013)
for i in range(20):
 d={k:rng.uniform(lo,hi)for k,(lo,hi)in dict(spacingGHz=(50,200),fsrGHz=(200,1600),driveGHz=(0,50),driftGHz=(-30,30),mismatchGHz=(0,20),filterK=(.05,.5),filterOffsetGHz=(-40,40),sourceMw=(0,5),dxUm=(-3,3),polarDeg=(0,80),segmentLossDb=(0,1),tapPercent=(0,10)).items()}
 for j in range(4):d['modTune'+str(j)]=rng.uniform(-40,40);d['muxTune'+str(j)]=rng.uniform(-40,40)
 states.append(d)
js="""import fs from'node:fs';import vm from'node:vm';const c={};vm.createContext(c);for(const p of['ch2','ch3','ch5','ch7','ch9','ch11'])vm.runInContext(fs.readFileSync('notebook/'+p+'-models.js','utf8'),c);let raw='';for await(const chunk of process.stdin)raw+=chunk;console.log(JSON.stringify(JSON.parse(raw).map(v=>({state:c.WDMPhysics.sanitize(v),grid:c.WDMPhysics.grid(v),networks:[0,1].map(a=>Array.from({length:16},(_,b)=>c.WDMPhysics.network(v,a,b))),comparison:c.WDMPhysics.compare(v)}))));"""
actual=json.loads(subprocess.check_output(['node','--input-type=module','-e',js],input=json.dumps(states).encode()))
checks=0;max_error=0

def close(a,b,label):
 global checks,max_error
 assert math.isfinite(a)and math.isfinite(b),(label,a,b)
 error=abs(a-b);max_error=max(max_error,error);checks+=1;assert error<3e-10,(label,a,b,error)

def ring(d,fsr):
 # Independent real power expression; production calls Chapter7 complex feedback.
 a=t=.98;z=2*a*t*(1-math.cos(2*math.pi*d/fsr));return((a-t)**2+z)/((1-a*t)**2+z)

def drop(d,s):
 # New mux is internally lossless, symmetric: derive drop and through by power conservation.
 k=s['filterK'];return k*k/(k*k+2*(1-k)*(1-math.cos(2*math.pi*d/s['fsrGHz'])))

def reference(s,a,bits):
 channels=[];pattern=[-1,-1/3,1/3,1]
 for k in range(N):
  f=f0+(k-1.5)*s['spacingGHz'];lam=C/f
  port=.6*math.exp(-4*math.log(2)*((lam-1550)/40)**2)*math.exp(-s['dxUm']**2/4)*math.cos(math.radians(s['polarDeg']))**2
  modres=[f0+(j-1.5)*s['spacingGHz']+s['driftGHz']+pattern[j]*s['mismatchGHz']+s['modTune'+str(j)]for j in range(N)]
  muxres=[f0+(j-1.5)*s['spacingGHz']+s['driftGHz']+.5*pattern[j]*s['mismatchGHz']+s['filterOffsetGHz']+s['muxTune'+str(j)]for j in range(N)]
  if a==0:route=math.prod(ring(f-modres[j]-((bits>>j)&1)*s['driveGHz'],s['fsrGHz'])for j in range(N));loss_db=N*s['segmentLossDb']
  else:route=ring(f-modres[k]-((bits>>k)&1)*s['driveGHz'],s['fsrGHz'])*drop(f-muxres[k],s)*math.prod(1-drop(f-muxres[j],s)for j in range(k+1,N));loss_db=(N-k)*s['segmentLossDb']
  beforetap=s['sourceMw']*port*route*10**(-loss_db/10);tap=beforetap*s['tapPercent']/100;out=(beforetap-tap)*port
  current=.8*Q*lam*1e-9/(H*C)*tap*1e-3
  channels.append(dict(outputMw=out,beforeTapMw=beforetap,monitorMw=tap,monitorA=current,fraction=port**2*route*10**(-loss_db/10)*(1-s['tapPercent']/100)))
 return channels

for row in actual:
 s=row['state']
 for k,g in enumerate(row['grid']):close(g['lambdaNm'],C/(f0+(k-1.5)*s['spacingGHz']),'grid wavelength')
 for a in range(2):
  refs=[reference(s,a,b)for b in range(16)]
  for b,n in enumerate(row['networks'][a]):
   for k,x in enumerate(n['channels']):
    for key in ['outputMw','beforeTapMw','monitorMw','monitorA','fraction']:close(x[key],refs[b][k][key],key)
    close(x['residualMw'],0,'energy ledger residual')
   close(n['totalOutputMw'],sum(x['outputMw']for x in refs[b]),'total output');close(n['monitorA'],sum(x['monitorA']for x in refs[b]),'monitor current sum')
  analysis=row['comparison']['commonBus'if a==0 else'modMux']
  for k in range(N):
   low=[refs[b][k]['outputMw']for b in range(16)if not((b>>k)&1)];high=[refs[b][k]['outputMw']for b in range(16)if(b>>k)&1]
   close(analysis['channels'][k]['staticOpeningMw'],min(high)-max(low),'all state opening')
   for j in range(N):
    matrix=max(abs(refs[b|(1<<j)][k]['fraction']-refs[b][k]['fraction'])for b in range(16)if not((b>>j)&1));close(analysis['matrix'][k][j],matrix,'interaction matrix')
result=dict(status='PASS',states=len(states),architectures=2,patternsPerState=16,channels=4,comparisons=checks,maxAbsoluteError=max_error,tolerance=3e-10,method='Independent real all-pass power expression; lossless add-drop power conservation; explicit frequency/wavelength and per-stage dB sum; Gaussian/Jones/grating chain; exact-SI photocurrent; exhaustive binary state and matrix enumeration',scope='Consistency of declared static synthetic assumptions, not link bandwidth, BER, hardware or measured accuracy')
pathlib.Path('docs/CH11_INDEPENDENT_VALIDATION.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
