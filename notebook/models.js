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
  root.Photonics = {criticalAngle, phase};
})(globalThis);
