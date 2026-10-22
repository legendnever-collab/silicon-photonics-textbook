"""Independent checks: numpy SVD, explicit path sum, geometric recurrence and cutback LS."""
import cmath,json,math,subprocess
from pathlib import Path
import numpy as np
js="""for(const n of ['ch2','ch3','ch5','ch7'])await import('./notebook/'+n+'-models.js');const P=CircuitPhysics;const cases=[];for(const K of [.1,.5,.9])for(const delta of [-2,0,1.2,Math.PI])for(const armLossDb of [0,3])cases.push({K,delta,armLossDb,r:P.mzi({K,delta,armLossDb})});const rings=[-.9,0,.7].map(theta=>({theta,r:P.ring({K:.1,roundtripDb:.5,theta})}));const matrices=Array.from({length:31},(_,n)=>[[P.z(Math.sin(n),.2),P.z(.3,Math.cos(n))],[P.z(.1,-.4),P.z(Math.cos(n/3),-.2)]]);console.log(JSON.stringify({cases,rings,norms:matrices.map(S=>({S,sigma:P.sigma(S)})),cut:P.cutback(.5,3),guided:P.guided({delta:Math.PI/2})}));"""
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',js],text=True));errors=[]
def near(a,b,tol=2e-12):
 e=abs(a-b);errors.append(e)
 assert e<tol,(a,b,e)
for case in data['cases']:
 k,delta,loss=case['K'],case['delta'],case['armLossDb'];t,q=math.sqrt(1-k),math.sqrt(k);u=math.sqrt(.001)*t*10**(-loss/20)*cmath.exp(-1j*delta);l=1j*q*math.sqrt(.001)
 # Four independent optical paths instead of multiplying the implementation matrix.
 expected=[t*u+1j*q*l,1j*q*u+t*l]
 for z,actual in zip(expected,case['r']['out']):near(z,complex(actual['re'],actual['im']))
 near(sum(abs(z)**2*1000 for z in expected)+case['r']['lostMw'],1)
for item in data['rings']:
 t=math.sqrt(.9);a=10**(-.5/20);q=a*cmath.exp(-1j*item['theta']);field=t;term=-.1*q
 for n in range(500):field+=term;term*=t*q
 near(field,complex(**{'real':item['r']['h']['re'],'imag':item['r']['h']['im']}))
for item in data['norms']:
 m=np.array([[complex(v['re'],v['im']) for v in row] for row in item['S']]);near(np.linalg.svd(m,compute_uv=False)[0],item['sigma'])
x=np.array([p['lengthCm'] for p in data['cut']['points']]);y=np.array([p['lossDb'] for p in data['cut']['points']]);slope,intercept=np.linalg.lstsq(np.column_stack([x,np.ones_like(x)]),y,rcond=None)[0];near(slope,3);near(intercept,-20*math.log10(.5))
# Exact-SI detector readout independently from photon energy, not copied JS current model.
near(data['guided']['readout']['primaryA'],.8*1.602176634e-19*(1550e-9)/(6.62607015e-34*299792458)*.000125)
near(data['guided']['residual'],0)
report={'method':'numpy SVD, explicit path summation, 500-term feedback recurrence, least-squares length slope, exact-SI photon count','checks':len(errors),'maxAbsoluteError':max(errors),'tolerance':2e-12,'status':'PASS'}
Path('docs/CH7_PHYSICS_VALIDATION.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
