# Chapter 7 Learning Design

2026-10-22 KST. D0. Baseline main 31324f6355a33f2ae8333ab0073627d2776e93aa, merged PR #6. Seven lessons extend the existing A–F reading → worked example → guided tutor → notebook → reflection. Technical terms English, explanatory prose Korean. No framework rewrite.

7.1 Device → Port → Circuit; 7.2 compact model contract; 7.3 coherent waves and reference planes; 7.4 coupler/MZI and fit/passivity; 7.5 ring feedback; 7.6 grating measurement and identifiability; 7.7 fixed circuit with detector readout. Four focused notebook families, no general netlist/editor. Stable control nodes on input.

Reuse: PassivePhysics.ring via sign-convention adapter, IOPhysics grating spectrum if compatible after source audit, DetectorPhysics.current for readout, LaserPhysics.ledger for independent source power boundary. Existing PN model has independent effective-index assumptions; use explicit passive phase instead of inventing voltage-to-index calibration. Prior release sources, keys and bytes preserved. New v7 key reads prior keys without modifying them.

Figures: scale/port concept, model contract, full 4-port and sub-block, phasor/reference plane, two MZI outputs/spectrum, fit/error/passivity, ring loop/spectrum, GC reference planes/cutback, guided source/network/detector. Original code-native SVG only. Full textbook not accessed.
