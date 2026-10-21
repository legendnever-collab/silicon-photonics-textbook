/* Chapter 4 — analytical teaching models. NO TCAD, PDK, measured or high-speed device results. */
(function(root){
'use strict';
const tau=2*Math.PI, e=1.602176634e-19, eps0=8.8541878128e-12, kb=1.380649e-23;
function fin(x,name){if(!Number.isFinite(x))throw RangeError(name+' must be finite');return x;}
function domain(x,a,b,name){fin(x,name);if(x<a||x>b)throw RangeError(name+' outside range '+a+'..'+b);return x;}
function positive(x,name){fin(x,name);if(x<=0)throw RangeError(name+' positive required');return x;}
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
function plasma(ne=1e17,nh=1e17){domain(ne,0,1e20,'electron density cm^-3');domain(nh,0,1e20,'hole density cm^-3');
 // Historical Soref–Bennett empirical coefficients at 1550 nm, approximate *bulk* Si response.
 const dn=-(8.8e-22*ne+8.5e-18*nh**0.8), alphaCm=8.5e-18*ne+6e-18*nh;
 return {ne,nh,dn,alphaCm,alphaDbCm:(10/Math.log(10))*alphaCm};
}
function plasmaChange(ne0,nh0,ne1,nh1){const a=plasma(ne0,nh0),b=plasma(ne1,nh1);return{dn:b.dn-a.dn,deltaAlphaCm:b.alphaCm-a.alphaCm,initial:a,final:b};}
function depletion({naCm=1e17,ndCm=1e17,vr=2,tempK=300,niCm=1e10}={}){domain(naCm,1e14,1e20,'NA');domain(ndCm,1e14,1e20,'ND');domain(vr,0,20,'reverse voltage');domain(tempK,200,400,'T');positive(niCm,'ni');const vbi=kb*tempK/e*Math.log(naCm*ndCm/(niCm*niCm));if(!(vbi>0))throw RangeError('Invalid intrinsic density for ideal abrupt PN');
 const naM=naCm*1e6,ndM=ndCm*1e6, widthM=Math.sqrt(2*11.7*eps0/e*(1/naM+1/ndM)*(vbi+vr));
 return {vbi,widthUm:widthM*1e6,acceptorSideUm:widthM*1e6*ndCm/(naCm+ndCm),donorSideUm:widthM*1e6*naCm/(naCm+ndCm),approxCperM2:11.7*eps0/widthM};
}
function phase({dNeff=-1e-4,lengthUm=1000,lambdaNm=1550}={}){domain(dNeff,-.1,.1,'delta n effective');domain(lengthUm,0,1e6,'L um');domain(lambdaNm,500,5000,'lambda nm');const phi=tau*dNeff*lengthUm/(lambdaNm/1000);return{phi,cycles:phi/tau,deltaOPLUm:dNeff*lengthUm};}
function vpiL({sensitivityPerV=1e-4,lambdaNm=1550}={}){positive(Math.abs(sensitivityPerV),'d n effective per V');domain(lambdaNm,500,5000,'lambda nm');return {vpiLUmV:(lambdaNm/1000)/(2*Math.abs(sensitivityPerV)),sensitivityPerV};}
function rc({rOhm=100,cFf=40,frequencyGhz=10}={}){positive(rOhm,'R');positive(cFf,'C');domain(frequencyGhz,0,10000,'frequency GHz');const tauSec=rOhm*cFf*1e-15, f3dBGhz=1/(tau*tauSec)/1e9,magnitude=1/Math.sqrt(1+(tau*frequencyGhz*1e9*tauSec)**2);return {tauPs:tauSec*1e12,f3dBGhz,magnitude,powerRatio:magnitude**2};}
function mzi(deltaPhaseRad=0){fin(deltaPhaseRad,'phase');const p1=Math.cos(deltaPhaseRad/2)**2,p2=Math.sin(deltaPhaseRad/2)**2;return{port1:p1,port2:p2,sum:p1+p2};}
function ring({selfCoupling=.9,roundtripAmplitude=.9,detuningRad=0,deltaNeff=0,lambdaNm=1550,ng=4}={}){domain(selfCoupling,0,1,'r');domain(roundtripAmplitude,0,1,'a');fin(detuningRad,'ring phase');domain(deltaNeff,-.05,.05,'delta n');positive(lambdaNm,'lambda');positive(ng,'group index');const c=Math.cos(detuningRad),r=selfCoupling,a=roundtripAmplitude,den=1+r*r*a*a-2*r*a*c,num=r*r+a*a-2*r*a*c, transmission=den>1e-14?clamp(num/den,0,1):null;return{transmission,shiftNm:lambdaNm*deltaNeff/ng,detuningRad,critical:Math.abs(r-a)<1e-10};}
function attenuation({alphaCm=10,lengthMm=1}={}){domain(alphaCm,0,1e5,'power alpha /cm');domain(lengthMm,0,100,'length mm');const transmission=Math.exp(-alphaCm*lengthMm/10);return{transmission,lossDb:(10/Math.log(10))*alphaCm*lengthMm/10};}
function thermal({powerMw=10,rthKperW=1000,tauMs=10,timeMs=20,coefPerK=1e-4,lengthUm=1000,lambdaNm=1550}={}){domain(powerMw,0,500,'power mW');positive(rthKperW,'Rth');positive(tauMs,'thermal tau');domain(timeMs,0,1000,'time ms');domain(coefPerK,-.01,.01,'dn_eff/dT');const steadyK=rthKperW*powerMw/1000, deltaK=steadyK*(1-Math.exp(-timeMs/tauMs)),dNeff=coefPerK*deltaK;return{deltaK,steadyK,deltaNeff:dNeff,deltaPhaseRad:phase({dNeff,lengthUm,lambdaNm}).phi,...mzi(phase({dNeff,lengthUm,lambdaNm}).phi)};}
root.ActivePhysics=Object.freeze({plasma,plasmaChange,depletion,phase,vpiL,rc,mzi,ring,attenuation,thermal});
})(globalThis);
