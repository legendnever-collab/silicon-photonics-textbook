(function(root){
'use strict';
const TAU=2*Math.PI,abs2=z=>z.re*z.re+z.im*z.im;
function finite(x,name){if(!Number.isFinite(x))throw RangeError(name+' must be finite');return x;}
function bound(x,a,b,name){finite(x,name);if(x<a||x>b)throw RangeError(name+' out of range');return x;}
function positive(x,name){finite(x,name);if(x<=0)throw RangeError(name+' must be positive');return x;}
function splitter(pin=1,r=.5,excessDb=0){bound(pin,0,1e6,'Pin');bound(r,0,1,'ratio');bound(excessDb,0,100,'excess');const eta=10**(-excessDb/10),p1=pin*r*eta,p2=pin*(1-r)*eta;return {pin,r,eta,p1,p2,a1:Math.sqrt(p1),a2:Math.sqrt(p2),lost:pin-p1-p2};}
function dc(kappa=.04,length=20,deltaBeta=0){bound(kappa,0,1,'kappa');bound(length,0,1e4,'length');finite(deltaBeta,'deltaBeta');const q=Math.hypot(kappa,deltaBeta/2),sin=q?Math.sin(q*length):0,cs=Math.cos(q*length),x=q?kappa/q*sin:0,z=q?deltaBeta/(2*q)*sin:0;return {through:cs*cs+z*z,cross:x*x,fieldThrough:{re:cs,im:z},fieldCross:{re:0,im:x},q,kappa,length,halfLength:kappa?Math.PI/(4*kappa):Infinity,fullLength:kappa?Math.PI/(2*kappa):Infinity};}
function phase(neff=2.4,wavelengthNm=1550,lengthUm=10){positive(neff,'neff');positive(wavelengthNm,'wavelength');bound(lengthUm,0,1e7,'length');const beta=TAU*neff/(wavelengthNm/1000),phi=beta*lengthUm;return {beta,phi,cycles:phi/TAU};}
function phaseDifference(nUpper=2.4,nLower=2.4,lUpper=10,lLower=10,wavelengthNm=1550){const u=phase(nUpper,wavelengthNm,lUpper),l=phase(nLower,wavelengthNm,lLower);return {upper:u,lower:l,delta:u.phi-l.phi};}
function circuit({ratio=.5,delta=0,upperUm=1000,lowerUm=1000,alphaDbCm=0,pin=1}={}){bound(ratio,0,1,'ratio');finite(delta,'delta');bound(upperUm,0,1e7,'upper length');bound(lowerUm,0,1e7,'lower length');bound(alphaDbCm,0,1000,'loss');bound(pin,0,1e6,'Pin');const gu=10**(-alphaDbCm*upperUm/200000),gl=10**(-alphaDbCm*lowerUm/200000),e={re:Math.cos(delta),im:Math.sin(delta)},c=Math.sqrt(ratio*(1-ratio));
 const e1={re:ratio*gu*e.re+(1-ratio)*gl,im:ratio*gu*e.im},e2={re:c*gu*e.im,im:c*(gl-gu*e.re)},t1=abs2(e1),t2=abs2(e2),delivered=ratio*gu*gu+(1-ratio)*gl*gl;
 const max=(ratio*gu+(1-ratio)*gl)**2,min=(ratio*gu-(1-ratio)*gl)**2;
 return {e1,e2,t1,t2,p1:pin*t1,p2:pin*t2,pin,delivered,lost:pin*(1-delivered),gu,gl,armUpper:pin*ratio*gu*gu,armLower:pin*(1-ratio)*gl*gl,max,min,erDb:min<1e-28?(max>0?Infinity:NaN):10*Math.log10(max/min)};}
function mzi(delta=0){return circuit({delta});}
function ring(theta=0,t=.9,a=.9){finite(theta,'theta');bound(t,0,1,'self coupling');bound(a,0,1,'round trip');const c=Math.cos(theta),s=Math.sin(theta),dr=1-t*a*c,di=-t*a*s,nr=t-a*c,ni=-a*s,den=dr*dr+di*di;if(den<1e-28&&t===1)return {transmission:1,h:{re:1,im:0}};const h={re:(nr*dr+ni*di)/den,im:(ni*dr-nr*di)/den};return {transmission:abs2(h),h};}
function fsr(wavelengthNm=1550,ng=4,radiusUm=10){positive(wavelengthNm,'lambda');positive(ng,'ng');positive(radiusUm,'R');return (wavelengthNm/1000)**2/(ng*TAU*radiusUm)*1000;}
function bragg(kappa=.01,lengthUm=100,delta=0){bound(kappa,0,1,'grating kappa');bound(lengthUm,0,1000,'grating length');finite(delta,'detuning');const d=kappa*kappa-delta*delta;let f,c;if(Math.abs(d)<1e-18){f=lengthUm;c=1;}else if(d>0){const s=Math.sqrt(d),u=s*lengthUm,h=Math.tanh(u),den=s*s+delta*delta*h*h,e=Math.exp(-u),sech=2*e/(1+e*e);return {reflection:kappa*kappa*h*h/den,transmission:s*s*sech*sech/den};}else{const q=Math.sqrt(-d);f=Math.sin(q*lengthUm)/q;c=Math.cos(q*lengthUm);}const den=c*c+delta*delta*f*f;return {reflection:kappa*kappa*f*f/den,transmission:1/den};}
root.PassivePhysics={splitter,dc,phase,phaseDifference,circuit,mzi,ring,fsr,bragg,abs2};
})(globalThis);
