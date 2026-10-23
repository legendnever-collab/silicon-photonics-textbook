"""Independent analytic length/port/edge-gap/transfer reference, not a JS formula copy."""
import json,math,subprocess,pathlib
states=[dict(rotation=a,shift=t,extraUm=e)for a in range(4)for t in [0,13]for e in [0,.16145833333333334,.5,7]]
js="""const vm=require('vm'),fs=require('fs');for(const p of ['notebook/ch2-models.js','notebook/ch3-models.js','notebook/ch5-models.js','notebook/ch7-models.js','notebook/ch8-models.js'])vm.runInThisContext(fs.readFileSync(p,'utf8'));const states=JSON.parse(process.argv[1]);console.log(JSON.stringify(states.map(s=>({r:LayoutPhysics.evaluate(s),p:LayoutPhysics.transformPort({x:10,y:0,angle:0},{rotation:s.rotation*90,x:s.shift,y:20})}))));"""
results=json.loads(subprocess.check_output(['node','-e',js,json.dumps(states)],text=True));errors=[];n=0

def check(x,y):
 global n
 e=abs(x-y);errors.append(e);assert e<1e-10,(x,y,e);n+=1
for s,v in zip(states,results):
 # Each dogleg has four quarter circles. Independent decomposition of lengths:
 # endpoint horizontal leads10+10, plateau40, vertical legs2*(h-10).
 h=20+s['extraUm'];lu=20+40+2*(h-10)+4*math.pi*5/2;ll=20+40+2*(20-10)+4*math.pi*5/2
 r=v['r'];check(r['lengths'][0]['lengthUm'],lu);check(r['lengths'][1]['lengthUm'],ll);check(r['deltaLength'],lu-ll)
 # Sum phasors at both outputs directly, i*sqrt(.5) cross phase.
 a=complex(math.cos(-2*math.pi*2.4/1.55*(lu-ll)),math.sin(-2*math.pi*2.4/1.55*(lu-ll)))
 check(r['physics']['upperMw'],abs((a-1)/2)**2);check(r['physics']['lowerMw'],abs(1j*(a+1)/2)**2);check(r['physics']['totalMw'],1)
 phi=s['rotation']*math.pi/2;check(v['p']['x'],10*math.cos(phi)+s['shift']);check(v['p']['y'],10*math.sin(phi)+20)
 assert r['lvs']['pass'] and r['drc']['pass'];n+=2
out={'comparisons':n,'maxAbsoluteError':max(errors),'method':'Python independent primitive decomposition, complex field summation, trig transforms','states':len(states),'status':'PASS'}
pathlib.Path('docs/CH8_INDEPENDENT_VALIDATION.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
