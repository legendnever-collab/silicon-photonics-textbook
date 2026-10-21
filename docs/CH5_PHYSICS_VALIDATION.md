# Chapter 5 physics validation

Verified by 7 new Node physics test groups plus existing suites and an independent Python Decimal calculation (CH5_PHYSICS_VALIDATION.json).

| Quantity / contract | Check | Result |
|---|---|---|
| Photon energy | exact SI h,c,q; 1550nm | 0.7998980544 eV |
| Unity-gain R limit | η=1,1550nm | 1.2501593103 A/W |
| Independent η_ext R | η=0.8,1550nm | 1.0001274482 A/W |
| Photo current | P100µW, independent η0.8 | 100.0127448 µA |
| Lumped RC | R50Ω,C100fF | τ5ps; f31.8309886GHz |
| RC −3dB definition | f=f_RC | amplitude0.70710678; −3.0103dB |
| Transit scale | W1µm,v10⁵m/s | 10ps only; no total f inferred |
| PIN shot | I100µA,Idark10nA,B10GHz | 566.0984nA rms |
| Dark-only noise | Idark10nA,B10GHz | 5.6607007nA rms |
| Effective absorption | α1000cm⁻¹,L20µm | 0.8646647168 |
| Factorized η_ext | coupling0.9,collection0.9 | 0.7003784206 |
| Factorized R/current | 1550nm,100µW | 0.8755846 A/W; I87.55846µA |
| APD | M1 recovers primary; M5 scales mean | no APD noise/SNR estimate |

Tests include zero QE/Power/Absorption/Noise, monotonic absorption, wavelength scaling, independent B scaling, variance addition, unit conversions, efficiency [0,1], invalid-domain rejection and no double-counted QE. Figure and Notebook share state/functions; browser asserts matching 5.5A readouts, unchanged RC/transit upon L-only changes and no PIN noise display at M>1. All inputs are stated assumptions, not measured Ge/PDK performance. Approximately constant drift velocity, fixed η spectrum and uniform effective power absorption are deliberate simplifications.
