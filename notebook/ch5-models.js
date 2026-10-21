/* Original educational detector models; exact SI constants, explicit domain checks. */
(function(root){'use strict';
const h=6.62607015e-34,c=299792458,q=1.602176634e-19;
function bounded(x,lo,hi=Infinity,name='input'){if(!Number.isFinite(x)||x<lo||x>hi)throw RangeError(name+' outside model domain');return x;}
function photon(lambdaNm=1550){bounded(lambdaNm,Number.MIN_VALUE);const joule=h*c/(lambdaNm*1e-9);return {joule,ev:joule/q};}
function responsivity(lambdaNm=1550,eta=.8){bounded(eta,0,1,'quantum efficiency');return eta*q/photon(lambdaNm).joule;}
function current({lambdaNm=1550,eta=.8,powerUw=100,gain=1}={}){bounded(powerUw,0);bounded(gain,1);const energy=photon(lambdaNm),r=responsivity(lambdaNm,eta),primaryA=r*powerUw*1e-6;return {energy,r,primaryA,multipliedA:gain*primaryA,flux:powerUw*1e-6/energy.joule,gain};}
function rc(rOhm=50,cFf=100,fGhz=10){bounded(rOhm,Number.MIN_VALUE);bounded(cFf,Number.MIN_VALUE);bounded(fGhz,0);const tauS=rOhm*cFf*1e-15,fHz=1/(2*Math.PI*tauS),magnitude=1/Math.hypot(1,fGhz*1e9/fHz);return {tauS,fHz,fGhz:fHz/1e9,magnitude,db:20*Math.log10(magnitude)};}
function transit(distanceUm=1,velocityMps=1e5){bounded(distanceUm,0);bounded(velocityMps,Number.MIN_VALUE);return distanceUm*1e-6/velocityMps;}
function shot(primaryA=0,darkNa=10,noiseGhz=10){bounded(primaryA,0);bounded(darkNa,0);bounded(noiseGhz,0);const darkA=darkNa*1e-9,B=noiseGhz*1e9;return {rmsA:Math.sqrt(2*q*(primaryA+darkA)*B),darkRmsA:Math.sqrt(2*q*darkA*B),photoRmsA:Math.sqrt(2*q*primaryA*B),B,darkA};}
function absorption(alphaCm=1000,lengthUm=20){bounded(alphaCm,0);bounded(lengthUm,0);const opticalDepth=alphaCm*lengthUm*1e-4;return {etaAbs:-Math.expm1(-opticalDepth),transmission:Math.exp(-opticalDepth),opticalDepth};}
function externalQE({alphaCm=1000,lengthUm=20,coupling=.9,collection=.9}={}){bounded(coupling,0,1);bounded(collection,0,1);const a=absorption(alphaCm,lengthUm);return {...a,etaExt:coupling*a.etaAbs*collection,coupling,collection};}
root.DetectorPhysics={h,c,q,photon,responsivity,current,rc,transit,shot,absorption,externalQE};
})(globalThis);
