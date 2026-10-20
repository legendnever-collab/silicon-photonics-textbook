import {test} from 'node:test';
import assert from 'node:assert/strict';
import '../notebook/models.js';
const P=globalThis.Photonics;
test('critical angle and direction constraints',()=>{assert.ok(Math.abs(P.criticalAngle()-24.516)<.01);assert.throws(()=>P.criticalAngle(1,2),RangeError);});
test('phase units and limiting cases',()=>{const p=P.phase(2.4,1550,10);assert.ok(Math.abs(p.guidedUm-.645833333333)<1e-10);assert.ok(Math.abs(p.phi-97.28803056)<1e-7);assert.equal(P.phase(2.4,1550,0).phi,0);assert.throws(()=>P.phase(2.4,0,1));});
