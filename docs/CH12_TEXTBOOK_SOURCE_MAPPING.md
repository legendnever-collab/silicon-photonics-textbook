# Chapter 12 — Extension Curriculum E1 / Independent Teaching Supplement

Original Chrostowski & Hochberg (2015) ends with original Chapter13, System Example (app Chapter11). Chapter12 is independently authored synthesis, not an invented original Chapter14. Official contents were reopened 2026-10-25 KST. Paid full text, original equations/figures/problems were not accessed or reproduced. All examples and figures are original teaching material.

| Lesson | Prerequisites | Independent addition |
|---|---|---|
|12.1 Static to bits|Ch4 modulation, Ch11 static opening|NRZ hold, bit rate/UI, declared optical P0/P1|
|12.2 Bandwidth memory|Ch4 RC, Ch5 receiver|Effective intensity Tx pole and current Rx pole, warm-up, ISI|
|12.3 Actual waveform Eye|Ch7 modelling|Two-UI fold, sample phase, signed finite-pattern opening|
|12.4 Receiver planes|Ch3 loss, Ch5 responsivity/current|Power loss, direct DetectorPhysics calls, explicit current plane|
|12.5 Noise|Ch5 shot noise|One-sided input PSD, analog Rx ENBW, decision-sample Gaussian approximation|
|12.6 Decisions|Ch7 model scope, Ch10 evidence|Observed errors vs pattern-conditional expected error, limited Q proxy|
|12.7 Synthesis|Ch10/11 frozen reports|New independent state, Frozen/Stale/re-acquire, study report/backup|

## API audit: direct calls, no previous model modifications
- `ActivePhysics.rc({rOhm:50,cFf,frequencyGhz})` returns tauPs/f3dBGhz; capacitance is selected to represent the declared Tx pole. This is small-signal pole reuse, not a pre-existing transient solver.
- `DetectorPhysics.rc(50,cFf,fGhz)` returns tauS/fHz, reused for the declared Rx pole. New time stepping is Chapter12 only.
- `DetectorPhysics.responsivity(lambdaNm,eta)` [A/W] and `current({lambdaNm,eta,powerUw})` [primaryA] implement W→µW explicitly. No avalanche gain. Dark DC included once after filtering; threshold is total input-referred current in µA.
- `DetectorPhysics.shot(photoA,darkNa,Bn/1e9)` returns rmsA. Bn is ENBW, not f3dB. Variance is squared RMS and added to thermal variance once.
- Chapter3 Gaussian/Jones and Chapter7 scattering/loss were audited: no coupling is enabled in this first fixture, so a single declared power attenuation is applied once. Static MZM is optional explanatory context only; no inferred PN calibration.

## Supplementary primary pages reopened 2026-10-25
- Cambridge official contents: https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf — Chapter13 followed by references/index, no original Chapter14.
- Ansys PIN element: https://optics.ansys.com/hc/en-us/articles/360036108954-PIN-Photodetector-PIN-INTERCONNECT-Element — public responsivity/dark current/noise switches and qualitative eye examples inspected. Its circuit model is not claimed equivalent.
- Synopsys Receiver Sensitivity: https://www.synopsys.com/photonic-solutions/product-applications/performance-estimation/optsim-receiver-sensitivity.html — public NRZ/PIN/filter/eye/error chain inspected. Its fourth-order Bessel settings, sensitivity numbers and additional noise mechanisms are not imported.

The exact ZOH recurrence, ENBW integral, Gaussian-tail algebra and numerical examples below are independently derived teaching assumptions; these pages do not validate this implementation. Excluded: PAM4, coherent, DSP/CDR/FEC/jitter, WDM dynamic channels/beat/crosstalk, dispersion/chirp/reflections/RIN/ASE, real TIA/TCAD/full-wave/foundry/hardware qualification or commercial simulator equivalence. Chapter11 static opening remains unchanged.
