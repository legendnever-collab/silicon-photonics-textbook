"""Independent complex fields, dB units, sensor qualification, nodal RL and SVD rigid registration."""
import cmath,itertools,json,math,pathlib,subprocess,numpy as np
states=[dict(dx=dx,dy=-.5,polar=pol,lengthMm=length,pinDbm=pin,tilt=2,registered=1)for dx,pol,length,pin in itertools.product([-1,.75,2],[0,45],[0,4,10],[-10,0])]
poses=[dict(rotation=a,tx=x,ty=-12,registered=1)for a,x in itertools.product([-2,0,1.3,2],[-50,25,50])]
js="""const vm=require('vm'),fs=require('fs');for(const p of['notebook/ch3-models.js','notebook/ch9-models.js','notebook/ch10-models.js'])vm.runInThisContext(fs.readFileSync(p,'utf8'));const states=JSON.parse(process.argv[1]),poses=JSON.parse(process.argv[2]);console.log(JSON.stringify({values:states.map(s=>[1546,1550,1552,1554].map(x=>TestingPhysics.measurement(s,x))),poses:poses.map(s=>TestingPhysics.registration(s)),rl:[0,5,10,40].flatMap(f=>[0,.1,1,2].flatMap(l=>[0,.5,5].map(r=>({f,l,r,value:TestingPhysics.electrical(f,l,r)}))))}));"""
out=json.loads(subprocess.check_output(['node','-e',js,json.dumps(states),json.dumps(poses)],text=True));errors=[];count=0
def check(a,b,tolerance=1e-9):
 global count
 error=abs(a-b);assert error<tolerance,(a,b,error);errors.append(error);count+=1
for s,rows in zip(states,out['values']):
 for lam,p in zip([1546,1550,1552,1554],rows):
  q=2*math.pi/(lam/1000)*math.sin(math.radians(2))
  overlap=math.exp(-(s['dx']-.75)**2/4)*math.exp(-q*q);pol=math.cos(math.radians(s['polar']))**2
  envelope=.6*math.exp(-4*math.log(2)*((lam-1550)/40)**2);eta=envelope*overlap*pol
  check(p['coupling']['eta'],eta)
  pin=10**(s['pinDbm']/10);ref=pin*eta*eta*10**(-.6/10)
  neff=2.4+.43*4.2/1550+(2.4-4.2)*(lam-1550)/1550;z=cmath.exp(2j*math.pi*neff*(100*1550/2.4)/lam);T=abs((.98-.98*z)/(1-.98*.98*z))**2
  dut=pin*eta*eta*10**(-(3*s['lengthMm']/10)/10)*T
  check(p['truthT'],T);check(p['signalDutMw'],dut);check(p['signalRefMw'],ref)
  check(p['reference']['observedMw'],min(ref+1e-8,1));check(p['dut']['observedMw'],min(dut+1e-8,1))
  valid=dut>=1e-8*10**.6 and ref>=1e-8*10**.6 and dut+1e-8<1 and ref+1e-8<1
  assert p['valid']==valid;count+=1
  if valid:check(p['normalizedT'],T)
  else:assert p['normalizedT']is None;count+=1
for s,r in zip(poses,out['poses']):
 a=math.radians(s['rotation']);R=np.array([[math.cos(a),-math.sin(a)],[math.sin(a),math.cos(a)]]);P=np.array([[0.,0.],[1000.,0.]]);Q=P@R.T+np.array([s['tx'],s['ty']]);pc=P.mean(axis=0);qc=Q.mean(axis=0);U,S,Vt=np.linalg.svd((P-pc).T@(Q-qc));D=np.diag([1,np.linalg.det(Vt.T@U.T)]);fit=Vt.T@D@U.T;t=qc-fit@pc;target=fit@np.array([1000,500])+t
 check(r['fit']['rotation'],math.degrees(math.atan2(fit[1,0],fit[0,0])));check(r['fit']['tx'],t[0]);check(r['fit']['ty'],t[1]);check(r['planned']['x'],target[0]);check(r['planned']['y'],target[1]);check(r['errorUm'],0)
for r in out['rl']:
 # Solve source/load voltage divider, then derive matched incident and reflected waves.
 Z=complex(r['r'],2*math.pi*r['f']*r['l']);current=1/(100+Z);vload=50*current;through=abs(2*vload)**2;reflected=abs(1-2*vload)**2;dissipated=4*50*r['r']*abs(current)**2
 check(r['value']['through'],through);check(r['value']['reflected'],reflected);check(r['value']['dissipated'],dissipated);check(r['value']['total'],1)
report=dict(status='PASS',states=len(states),registrationPoses=len(poses),electricalCases=len(out['rl']),comparisons=count,maxAbsoluteError=max(errors),method='Independent complex all-pass transfer and optical budget in explicit cm; Gaussian/Jones/envelope chain; exact known-floor sensor; NumPy SVD rigid registration; complex voltage-divider RL power waves',scope='Numerical consistency of declared synthetic fixture, not hardware or measurement accuracy')
pathlib.Path('docs/CH10_INDEPENDENT_VALIDATION.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
