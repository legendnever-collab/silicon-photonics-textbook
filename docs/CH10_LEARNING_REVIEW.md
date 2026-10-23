# Chapter 10 learning review

Open dist/silicon-photonics-textbook-v0.10.0.html offline. Existing57lessons are retained; selectChapter10 for8new lessons.

1. 10.1 distinguish grating/edge access, individual/array placement, SSC, free-space and fiber taper. Numeric examples cover only grating/edge.
2. 10.2 Fine Align finds(.75,−.5)µm on declared grid. Add+1µm x: extra pair loss2.171472dB. Polar45deg gives.5 per port/.25 pair factor.
3. 10.3 f10GHz/L1nH/R0: Through.716957, Reflection.283043, Dissipation0, Total1. ChangeR to distinguish dissipation. Contact flag independent of passive optical sweep.
4. 10.4 Misregistered/Low Reference/Blocked Access each hold Capture for a reason. Register→Fine Align→Acquire Synthetic Sweep. Edit dx or preset: old snapshot stays Stale; re-acquire explicit.
5. 10.5 θ0/tx25/ty−12 gives macro error27.730849µm before Register and algebraic0 after. Optical fine center still(.75,−.5)µm. No real accuracy estimate.
6. 10.6 change DUT Length2→4mm: additional.6dB must be corrected after reference division. Coarse17points(.5nm) and Fine801(.01nm) sample a shifted ring differently. Model Resonance1550.43nm is not a fitted result. Floor/ceiling cause withheld nulls, not physical zeros.
7. 10.7 source0dBm, fine aligned/grating/λ1550: reference before detector floor−5.036975dBm (two couplers4.436975dB +reference path.6dB). Follow every stage once. Access is conceptual.
8. 10.8 normal Capture→edit length→Stale→re-acquire→JSON Report. Inspect synthetic/hardware flags, current versus frozen config, sample validity, coordinates and budget. Learning Backup separately restores notes/tutor/completion/snapshot state.

On mobile, use expandable control groups, numeric Properties with Apply/Close and scrollable figure zoom. Models are synthetic assumptions, not equipment operations/measurement uncertainty/collision/reliability approval. Explicit approval required before main merge or next chapter.
