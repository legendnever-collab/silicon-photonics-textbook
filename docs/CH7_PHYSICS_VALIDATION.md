# Chapter 7 Physics Validation

Independent Python check: `python3 tests/ch7-independent-validation.py`. Uses numpy SVD for31 arbitrary complex matrices; explicit four-path coherent summation for24 MZI states;500-term ring recurrence (not the closed-form implementation); independent least-squares length regression; exact-SI photon-to-current.110 comparisons, max error3.55e−15, tolerance2e−12. Detailed machine result: CH7_PHYSICS_VALIDATION.json.

Analytical limits tested by Node: K=0/.5/1 unitary coupler and reciprocal4-port; MZI port exchange, coherent conservation and one-arm loss; reference-plane magnitude/phase; B coherent input counterexample σ=√2 and output/input=2; sampled scaling passivity; synthetic complex fit domain/error; critical coupling and all-pass/decoupled ring; GC absolute/normalized separation, cutback and zero-power; guided detector readout and both output/loss channels. NaN/domain errors rejected. Coupled ring with loop denominator magnitude<1e−12 is explicitly ill-conditioned; K=0 is decoupled and returns1.

Worked examples: IL3dB→Field0.7079457844,Power0.5011872336. MZI at δ0:0/1mW; atπ:1/0mW. Ring K=.1 critical roundtrip loss0.4575749056dB→T=0. GC pair η=.5,α3dB/cm,L1cm→IL9.0205999133dB,Pout0.1252968084mW; synthetic slope3,intercept6.0205999133. Guided δπ/2,source1mW,QE.8:outputs0.125/0.125mW,R1.0001274482A/W,I125.015931µA. Numerical tolerances are stated in tests; browser sliders approximate π and use displayed precision.

Figures/Notebook use the same functions; zero phase is undefined below numerical amplitude1e−14sqrt(W). Phase shown principal wrapped value. Spectral sweep local1545–1555nm only. No dynamic EO, FDTD, measured, calibrated PDK, broadband causality or fabrication fidelity claim.
