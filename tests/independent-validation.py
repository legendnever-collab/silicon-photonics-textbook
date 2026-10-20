"""Independent Slab TE check: finite-difference eigenvalues, not the JS root equation.
Requires numpy/scipy; invoked manually for the C4 audit, not for the offline app.
"""
import json, subprocess
from pathlib import Path
import numpy as np
from scipy.linalg import eigh_tridiagonal
from scipy.integrate import quad

widths=[220,500,800]
js="import './notebook/models.js'; console.log(JSON.stringify([220,500,800].map(d=>Photonics.slabTE(d))));"
models=json.loads(subprocess.check_output(['node','--input-type=module','-e',js],text=True))
rows=[]
for model in models:
    d=model['widthNm']/1000
    # Cell-centered grid aligns each discontinuity exactly to a cell edge.
    # Boundaries 12um away avoid perturbing the weak TE2 mode at width 500nm.
    results=[]
    for dx_nm in [5,2.5,1.25]:
        dx=dx_nm/1000
        npoints=round(24/dx)
        x=-12+(np.arange(npoints)+.5)*dx
        n=np.where(np.abs(x)<d/2,3.48,1.444)
        k0=2*np.pi/1.55
        diag=-2/dx**2+(k0*n)**2
        off=np.ones(npoints-1)/dx**2
        vals=eigh_tridiagonal(diag,off,select='v',select_range=((1.444*k0)**2,(3.48*k0)**2),eigvals_only=True)
        neff=(np.sqrt(vals)/k0)[::-1]
        expected=np.array([m['neff'] for m in model['modes']])
        assert len(neff)==len(expected),(d,dx_nm,len(neff),len(expected))
        errors=np.abs(neff-expected)
        results.append({'dx_nm':dx_nm,'neff':neff.tolist(),'max_abs_error':float(errors.max())})
    assert results[-1]['max_abs_error']<6e-5,results
    assert results[-1]['max_abs_error']<results[0]['max_abs_error']/8,results
    gamma_errors=[]
    for m in model['modes']:
        a=m['a'];h=m['h'];q=m['q']
        # Independently integrate piecewise TE field squared, with infinite tails.
        inside=lambda x:(np.cos(h*x) if m['even'] else np.sin(h*x))**2
        edge=inside(a)
        core=quad(inside,-a,a,epsabs=1e-12)[0]
        tail=2*quad(lambda x:edge*np.exp(-2*q*x),0,np.inf,epsabs=1e-12)[0]
        gamma=core/(core+tail)
        error=abs(gamma-m['corePower']);assert error<1e-10
        gamma_errors.append(error)
    rows.append({'width_nm':model['widthNm'],'analytic_neff':[m['neff'] for m in model['modes']],'finite_difference':results,'gamma_integral_max_error':max(gamma_errors)})
report={'method':'Independent centered finite-difference TE eigenproblem on ±12 µm domain; grid convergence 5→2.5→1.25 nm. Independent quadrature of infinite-tail power fraction.','scope':'Same ideal 1D symmetric Slab only. Does not validate actual Strip modes, synthetic bend data or manufacturing accuracy.','results':rows,'status':'PASS'}
Path('docs/PHYSICS_VALIDATION.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','max_neff_error':max(r['finite_difference'][-1]['max_abs_error'] for r in rows),'mode_counts':[len(r['analytic_neff']) for r in rows]}))
