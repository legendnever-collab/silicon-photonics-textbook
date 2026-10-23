# Chapter 9 textbook and source mapping

Textbook: Chrostowski & Hochberg, Silicon Photonics Design: From Devices to Systems (2015). Original Chapter11 Fabrication starts368, references380; next Chapter12 starts381. Official Cambridge contents inspected2026-10-23: https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf . Full paid chapter, original equations/figures/experimental measurements/problems were not accessed or reproduced. Explanations, worked examples, tutor choices and SVG are independently authored; no claim of exact textbook coverage beyond verified contents.

| App lesson | Original contents | What is implemented |
|---|---|---|
|9.1 Nominal vs Fabricated|11.1 Fabrication non-uniformity368|Rib w/t/e deviations and residual slab; independent teaching parameters|
|9.2 Process Contours|11.1.1 Lithography process contours369|Geometric nominal/biased overlay and separate rounded coupon; no lithography simulation|
|9.3 Corner Analysis|11.1.2 Corner analysis370|Nominal+8 unweighted corners; monotonic linear box extrema; no process probabilities|
|9.4 On-chip Variation|11.1.3 On-chip non-uniformity, experimental results372|Deterministic normalized die field, common/local decomposition, analytical covariance; no original experiment reproduced|
|9.5 Ring Sensitivity|Ring resonators373|Fixed order dispersive ring resonance and independent all-pass transfer assumptions|
|9.6 Grating Sensitivity|Grating couplers377|Frozen-index phase matching plus explicitly assumed Gaussian power envelope|
|9.7 Review|11.2 Problems379|Original guided calculations and reproducible JSON study report; no copied textbook problems|

Additional primary sources checked:
- F1 Xing, Dong, Khan & Bogaerts (2023), Capturing the effects of spatial process variations in silicon photonic circuits, ACS Photonics10(4)928–944, DOI10.1021/acsphotonics.2c01194. University author-repository abstract accessed: https://biblio.ugent.be/publication/01GRK0BSRAJEA1R35PCEHBST3Z . Used only as conceptual support for separating systematic location/layout dependence and random variation. Full15.28MB paper not loaded; no extracted measurements, fitted distributions or paper figures used.
- F2 Bogaerts et al., Silicon microring resonators, Laser & Photonics Reviews6(1)47–73 (2012), DOI10.1002/lpor.201100017. Author PDF https://photonics.intec.ugent.be/download/pub_3105.pdf accessed. Sections2.1–2.3 support resonance, all-pass transfer, field-vs-power coefficients and group-index convention. Our declared dispersion, sensitivities and numeric examples are independent assumptions, not their measured device.
- F3 Roelkens, Van Thourhout & Baets, High efficiency Silicon-on-Insulator grating coupler based on a poly-Silicon overlay (2006), Optics Express14(24), author PDF https://www.photonics.intec.ugent.be/download/pub_2056.pdf accessed. Used qualitatively for process geometry/period dependence and separation of directionality/overlap from phase matching. No paper-specific design, efficiency, dataset or figures reproduced. Our shallow rib and frozen-index Gaussian are independent simplified teaching constructions, not a replication of its poly-Si-overlay device.

SIPT-FAB-1 sensitivities, control limits, normalized maps, covariance example, mode order, coupling/loss and Gaussian height/FWHM are declared teaching assumptions. No foundry PDK, SEM, measured wafer distribution or yield result is included. Derivation and domains: notebook/CH9_MODEL_CONTRACT.md. Next app Chapter10 maps original Chapter12 Testing and packaging; no automatic implementation or merge.
