/* Original educational models. SI conversions are explicit at the boundaries. */
(function(root) {
  'use strict';
  function criticalAngle(nCore=3.48, nClad=1.444) {
    if (!(nCore > nClad && nClad > 0)) throw new RangeError('Require nCore > nClad > 0');
    return Math.asin(nClad/nCore)*180/Math.PI;
  }
  function phase(neff, lambdaNm, lengthUm) {
    if (!(neff>0 && lambdaNm>0 && lengthUm>=0)) throw new RangeError('Invalid phase inputs');
    const lambdaUm=lambdaNm/1000, beta=2*Math.PI*neff/lambdaUm;
    return {beta, phi:beta*lengthUm, cycles:neff*lengthUm/lambdaUm, guidedUm:lambdaUm/neff};
  }
  function slabTE(widthNm=500, lambdaNm=1550, nCore=3.48, nClad=1.444) {
    if (!(widthNm>0 && lambdaNm>0 && nCore>nClad && nClad>0)) throw new RangeError('Invalid slab inputs');
    // x confinement with |x|<=a, infinite y, propagation +z; electric field Ey.
    const a=widthNm/2000, k0=2*Math.PI/(lambdaNm/1000);
    const V=k0*a*Math.sqrt(nCore*nCore-nClad*nClad), modes=[];
    for(let m=0;m<256 && m*Math.PI/2<V-1e-10;m++) {
      const lower=m*Math.PI/2;
      let lo=lower, hi=Math.min(V,lower+Math.PI/2);
      // u = m*pi/2 + atan(sqrt(V^2-u^2)/u); strictly increasing residual.
      for(let j=0;j<80;j++) {
        const u=(lo+hi)/2, w=Math.sqrt(Math.max(0,V*V-u*u));
        if(u-lower-Math.atan2(w,u)>0) hi=u; else lo=u;
      }
      const u=(lo+hi)/2, w=Math.sqrt(Math.max(0,V*V-u*u));
      const h=u/a, q=w/a, beta=Math.sqrt((nClad*k0)**2+q*q), neff=beta/k0;
      const even=m%2===0, edge=even?Math.cos(u):Math.sin(u);
      const inside=a*(1+(even?1:-1)*Math.sin(2*u)/(2*u)), outside=edge*edge/q;
      modes.push({m,u,w,h,q,beta,neff,a,V,even,corePower:inside/(inside+outside)});
    }
    return {widthNm,lambdaNm,nCore,nClad,V,a,k0,modes};
  }
  function slabField(mode,xUm) {
    const {a,u,q,even}=mode, ax=Math.abs(xUm);
    if(ax<=a) return even?Math.cos(u*xUm/a):Math.sin(u*xUm/a);
    const edge=even?Math.cos(u):Math.sin(u)*(xUm<0?-1:1);
    return edge*Math.exp(-q*(ax-a));
  }
  // Synthetic exercise inputs only; not a fit to measured or simulated Silicon bends.
  const bendTable=Object.freeze([{radius:2,bendDb:.4},{radius:5,bendDb:.08},{radius:10,bendDb:.02},{radius:20,bendDb:.005}].map(Object.freeze));
  function designLedger(index=2,alphaDbCm=3,straightMm=2,count=4) {
    if(!Number.isInteger(index)||!bendTable[index]||!(alphaDbCm>=0&&straightMm>=0&&Number.isInteger(count)&&count>=0)) throw new RangeError('Invalid ledger inputs');
    const {radius,bendDb}=bendTable[index],bendLengthUm=count*Math.PI*radius/2;
    const lengthCm=straightMm/10+bendLengthUm/10000;
    const propagationDb=alphaDbCm*lengthCm,bendsDb=count*bendDb,totalDb=propagationDb+bendsDb;
    return {radius,bendDb,bendLengthUm,lengthCm,propagationDb,bendsDb,totalDb,transmission:10**(-totalDb/10),footprint:radius*radius};
  }
  root.Photonics = {criticalAngle, phase, slabTE, slabField, bendTable, designLedger};
})(globalThis);
