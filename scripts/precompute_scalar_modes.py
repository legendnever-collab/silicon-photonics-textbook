"""Reproducible educational 2D SCALAR Helmholtz modes, not vector Maxwell.
Requires Python 3, numpy, scipy. Production HTML uses only the committed data.
Units: micrometers throughout numerical operator. Physical strip approximation
is deliberately separate from numerical convergence of this scalar equation.
"""
from pathlib import Path
import json, hashlib, argparse, io, base64
from PIL import Image
import numpy as np
from scipy.sparse import diags, eye, kron
from scipy.sparse.linalg import eigsh
from scipy.interpolate import RegularGridInterpolator
from scipy.linalg import eigh_tridiagonal

COLORS=[[18,26,60],[37,95,140],[44,154,150],[242,201,95],[251,249,206]]

def encode_map(values,db=False):
    v=np.maximum(values,1e-4)
    v=(10*np.log10(v)+40)/40 if db else values
    rgb=np.empty((*v.shape,3),dtype=np.uint8)
    for channel in range(3):
        rgb[:,:,channel]=np.round(np.interp(v,np.linspace(0,1,5),[c[channel] for c in COLORS])).astype(np.uint8)
    buffer=io.BytesIO();Image.fromarray(rgb[::-1]).save(buffer,format='PNG',optimize=True)
    return base64.b64encode(buffer.getvalue()).decode()

K0=2*np.pi/1.55;NCORE=3.48;NCLAD=1.444;HEIGHT=.220

def solve(width_nm,step_nm,half_domain_um=1.0):
    dx=step_nm/1000;N=round(2*half_domain_um/dx)
    assert abs(N*dx-2*half_domain_um)<1e-10
    # N cell centers, ghost cells odd-reflected to enforce u=0 at physical edges.
    x=-half_domain_um+(np.arange(N)+.5)*dx
    width=width_nm/1000
    fraction=lambda a:np.clip((np.minimum(x+dx/2,a)-np.maximum(x-dx/2,-a))/dx,0,1)
    area=np.outer(fraction(HEIGHT/2),fraction(width/2))
    eps=NCLAD**2+(NCORE**2-NCLAD**2)*area
    diag=np.full(N,-2.0);diag[[0,-1]]=-3.0
    lap=diags([np.ones(N-1),diag,np.ones(N-1)],[-1,0,1],format='csc')/dx**2
    A=kron(eye(N,format='csc'),lap,format='csc')+kron(lap,eye(N,format='csc'),format='csc')+diags((K0**2*eps).ravel(),format='csc')
    # Shift above the strict material upper bound to select largest eigenvalue.
    vals,vecs=eigsh(A,k=1,sigma=(NCORE*K0)**2+1,which='LM',tol=1e-10,v0=np.ones(N*N))
    ev=float(vals[0]);v=vecs[:,0];res=float(np.linalg.norm(A@v-ev*v)/max(abs(ev),1))
    u=v.reshape(N,N);u*=np.sign(u[N//2,N//2]);u/=u.max()
    neff=float(np.sqrt(ev)/K0)
    assert NCLAD<neff<NCORE
    symmetry=max(float(np.max(abs(u-u[:,::-1]))),float(np.max(abs(u-u[::-1,:]))))
    localization=float(np.sum(u*u*area)/np.sum(u*u))
    return {'width_nm':width_nm,'step_nm':step_nm,'half_domain_um':half_domain_um,'neff':neff,'beta_um_inv':float(np.sqrt(ev)),'relative_eigen_residual':res,'symmetry_error':symmetry,'scalar_core_overlap':localization},x,u

def box_check():
    # Independent closed-form continuum and exact discrete homogeneous box checks.
    N=120;L=2.;dx=L/N;n=1.5
    diag=np.full(N,-2.);diag[[0,-1]]=-3.
    ev=eigh_tridiagonal(diag/dx**2,np.ones(N-1)/dx**2,select='i',select_range=(N-1,N-1),eigvals_only=True)[0]
    exact_discrete=-4/dx**2*np.sin(np.pi/(2*N))**2
    continuum=(K0*n)**2-2*(np.pi/L)**2
    numerical=(K0*n)**2+2*ev
    assert abs(ev-exact_discrete)<1e-9
    assert abs(numerical-continuum)<.0003
    return {'N':N,'length_um':L,'exact_discrete_error':abs(ev-exact_discrete),'continuum_beta_squared_error':abs(numerical-continuum)}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--quick',action='store_true',help='only 10nm previews; not a validated release');args=ap.parse_args()
    widths=[220,500,800];cases=[];validation=[]
    for width in widths:
        grid=[];finest=None
        for step in ([10] if args.quick else [20,10,5]):
            result,x,u=solve(width,step);grid.append(result);finest=(result,x,u)
            print('grid',width,step,result['neff'],flush=True)
        domain=[]
        if not args.quick:
            for half in [1.0,1.3,1.6]:
                result,_,_=solve(width,10,half);domain.append(result)
                print('domain',width,half,result['neff'],flush=True)
            changes=[abs(grid[i]['neff']-grid[i-1]['neff']) for i in range(1,len(grid))]
            assert changes[-1]<.005 and changes[-1]<changes[0],changes
            assert abs(domain[-1]['neff']-domain[-2]['neff'])<1e-4,domain
        r,x,u=finest
        assert r['relative_eigen_residual']<1e-7 and r['symmetry_error']<1e-7
        # Common observation window, padded physical Dirichlet boundary values.
        xp=np.r_[-1.,x,1.];up=np.pad(u,1,mode='constant')
        observation=np.linspace(-1.,1.,101)
        Y,X=np.meshgrid(observation,observation,indexing='ij')
        field=RegularGridInterpolator((xp,xp),up)(np.stack([Y,X],axis=-1));field/=field.max()
        intensity=np.round(field*field,6)
        # Normalize display, not input Power; y is stored ascending.
        cases.append({**r,'height_nm':220,'name':f'W{width}-H220','grid_n':101,'display_bounds_um':[-1,1,-1,1],'quantity':'|u|^2 / max|u|^2','normalization':'independent peak=1; not equal optical power','values':intensity.ravel().tolist(),'linear_png_base64':encode_map(intensity),'db_png_base64':encode_map(intensity,True)})
        validation.append({'width_nm':width,'grid':grid,'domain':domain,'grid_delta_last':None if args.quick else changes[-1],'domain_delta_last':None if args.quick else abs(domain[-1]['neff']-domain[-2]['neff'])})
    metadata={'colormap_rgb':COLORS,'colormap_positions':[0,.25,.5,.75,1],'method':'2D scalar 5-point cell-centered finite difference; subcell area-averaged n^2; sparse symmetric shift-invert eigenproblem','equation':'(dxx+dyy+k0^2*n^2)u=beta^2*u','boundary':'u=0 at x,y=±domain halfwidth; odd ghost values at boundary faces','lambda_nm':1550,'n_core':NCORE,'n_clad':NCLAD,'height_nm':220,'polarization':'none; scalar fundamental u00, not TE/TM or quasi-TE','limits':'Scalar approximation omits vector/interface conditions; especially inaccurate for high-contrast silicon. Converging scalar discretization does not validate actual strip neff, polarization, loss or power.','display':'101×101 samples over ±1 µm; interpolated from the solved grid for display, common 0–1 relative squared-field scale','status':'PREVIEW' if args.quick else 'VALIDATED_SCALAR_DISCRETIZATION'}
    data={'metadata':metadata,'cases':cases}
    path=Path('notebook/data/scalar-modes.json');path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(data,separators=(',',':'))+'\n')
    report={'status':metadata['status'],'metadata':metadata,'homogeneous_box_check':box_check(),'validation':validation,'dataset_sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'numpy':np.__version__}
    Path('docs/SCALAR_2D_VALIDATION.json').write_text(json.dumps(report,indent=2)+'\n')
if __name__=='__main__':main()
