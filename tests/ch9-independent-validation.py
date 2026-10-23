"""Independent phase roots, complex transfer, wavevector matching and finite covariance ensemble.
No import/translation of production JS; constants are declared teaching assumptions.
"""
import cmath,itertools,json,math,pathlib,subprocess
states=[dict(bias=b,edge=e,gradient=g,separation=d,mismatch=m,thickness=(i%3-1)*4,etch=(i%2*2-1)*5,period=(i%3-1)*8)for i,(b,e,g,d,m)in enumerate(itertools.product([-8,0,8],[-2,2],[-4,4],[0,1],[-4,4]))]
js="""const vm=require('vm'),fs=require('fs');vm.runInThisContext(fs.readFileSync('notebook/ch9-models.js','utf8'));const states=JSON.parse(process.argv[1]);console.log(JSON.stringify(states.map(s=>{const r=FabricationPhysics.evaluate(s);return{r,p:Object.fromEntries(Object.entries(r.geometry).map(([k,g])=>[k,[1537.3,1548.8,1553.7,1563.2].map(x=>[FabricationPhysics.ringPower(x,g),FabricationPhysics.gratingPower(x,g,s.period)])]))}})));"""
results=json.loads(subprocess.check_output(['node','-e',js,json.dumps(states)],text=True));n=0;errors=[]
def check(a,b,tol=1e-9):
 global n
 error=abs(a-b);assert error<tol,(a,b,error);errors.append(error);n+=1
def root(f,lo,hi):
 for _ in range(80):
  mid=(lo+hi)/2
  if f(mid)>0:lo=mid
  else:hi=mid
 return (lo+hi)/2
L=100*1550/2.4
for s,out in zip(states,results):
 shifts=[]
 for name,sign in [('A',-1),('B',1)]:
  x=sign*s['separation']/2;dw=s['bias']+2*s['edge']+s['gradient']*x+sign*s['mismatch']/2;dt=s['thickness'];de=s['etch']
  check(out['r']['geometry'][name]['widthNm'],500+dw);check(out['r']['geometry'][name]['residualNm'],150+dt-de)
  delta=.0008*dw+.002*dt-.0005*de
  index=lambda lam:2.4+delta+(2.4-4.2)*(lam-1550)/1550
  wavelength=root(lambda lam:index(lam)*L/lam-100,1500,1600)
  check(out['r']['rings'][name]['lambdaNm'],wavelength);shifts.append(wavelength)
  # Phase matching is solved as wavevectors, not by the JS product expression.
  period=630+s['period'];nb=1550/630+math.sin(math.radians(10))+.0005*dw+.0015*dt-.001*de
  gcroot=root(lambda lam:2*math.pi*(nb-math.sin(math.radians(10)))/lam-2*math.pi/period,1450,1650)
  check(out['r']['gratings'][name]['lambdaNm'],gcroot)
  for i,lam in enumerate([1537.3,1548.8,1553.7,1563.2]):
   z=cmath.exp(1j*2*math.pi*index(lam)*L/lam);transfer=(.98-.98*z)/(1-.98*.98*z)
   check(out['p'][name][i][0],abs(transfer)**2,1e-10)
   sigma=40/(2*math.sqrt(2*math.log(2)));power=.6*math.exp(-.5*((lam-gcroot)/sigma)**2)
   check(out['p'][name][i][1],power)
 check(out['r']['rings']['mismatchNm'],shifts[1]-shifts[0])
# An exact equiprobable sign ensemble verifies algebra, not a foundry probability model.
ensemble=[(c+a,c+b)for c,a,b in itertools.product([-3,3],[-1,1],[-1,1])]
js2="""require('vm').runInThisContext(require('fs').readFileSync('notebook/ch9-models.js','utf8'));console.log(JSON.stringify(FabricationPhysics.variance()));"""
v=json.loads(subprocess.check_output(['node','-e',js2],text=True));var_a=sum(a*a for a,b in ensemble)/8;cov=sum(a*b for a,b in ensemble)/8;diff=sum((b-a)**2 for a,b in ensemble)/8
check(v['deviceVariance'],var_a);check(v['covariance'],cov);check(v['correlation'],cov/var_a);check(v['differenceVariance'],diff)
report=dict(status='PASS',states=len(states),comparisons=n,maxAbsoluteError=max(errors),method='Python bisection of dispersive resonance and wavevector phase matching; independent complex all-pass transfer and Gaussian sigma conversion; finite covariance sign ensemble',scope='Numerical consistency of declared teaching assumptions, not manufacturing accuracy')
pathlib.Path('docs/CH9_INDEPENDENT_VALIDATION.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
