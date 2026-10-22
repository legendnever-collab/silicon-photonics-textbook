# Chapter 7 Textbook Source Mapping

Checked 2026-10-22 KST against Cambridge official frontmatter, printed x / PDF page10. Original Chapter9 pp313–348. Full text, equations, figures and code listings not accessed. Explanations, examples, SVGs and executable teaching models are original. No textbook numerical example is claimed reproduced.

| Original section / start page | App | Treatment and reason |
|---|---|---|
|9.1 Need for photonic circuit modelling /313|7.1|Device-to-port-to-circuit role, retained order|
|9.2 Components for system design /314|7.2|Optical/electrical boundary, component roles|
|9.3 Compact models /314|7.2|Domain, units, normalization and empirical tradeoffs|
|9.3.1 Empirical or equivalent circuit models /316|7.2,7.4|Original analytical sampling and polynomial fit|
|9.3.2 S-parameters /317|7.3|b=Sa, coherent amplitude and reference plane|
|9.4 Directional coupler compact model /318|7.4|Ideal reciprocal 4-port and forward sub-block|
|9.4.1 FDTD simulations /318|7.4|Extraction workflow explained, NO FDTD performed|
|9.4.2 FDTD S-parameters /320; Directional coupler S-parameters /321|7.4|Magnitude/phase and port placement, analytical substitute|
|9.4.3 Empirical model polynomial /323|7.4|Five synthetic samples; linear complex fit; explicit domain/error|
|9.4.4 S-parameter model passivity /324; Assessment /324; Enforcement /325|7.4|Exact2x2 spectral norm, coherent counterexample, pointwise scaling limits|
|9.5 Ring modulator circuit model /330|7.5|Legacy ring feedback reused with convention adapter; static independent phase/loss; PN bias calibration deferred|
|9.6 Grating coupler S-parameters /330|7.6|Explicit peak efficiency × Chapter3 normalized shape; assumed phase, matched model|
|9.6.1 Grating coupler circuits /333|7.6|GC–WG–GC, synthetic length sweep and non-identifiability|
|9.7 Code listings /333|All notebooks/tests|Original offline implementations replace commercial listings; no copied listing|
|References /348|Sources in lessons|Only actually accessed primary sources|
|Educational addition|7.7|Fixed source–MZI–detector synthesis connects Chapters1–6; not an original independent section|

MZI is a supplemental coherent-phase demonstration in7.3–7.4. Device geometry, FDTD convergence experiments, PDK calibration, broadband causality, dynamic EO/eye/BER and arbitrary circuits are deferred beyond this chapter. The independent phase control avoids unsupported voltage-to-index calibration.

Primary sources accessed:
- Cambridge official contents: https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf
- Ansys SPS formulation (optical mode envelopes, component/connection matrices): https://optics.ansys.com/hc/en-us/articles/360034919853-INTERCONNECT-S-Parameter-Simulator-SPS
- Ansys passive workflow guide (spectral norm, scaling and SVD distinctions, amplitude-only measurement limitations): https://optics.ansys.com/hc/en-us/articles/360059772393-S-parameter-passive-workflow-guide
- Existing independently validated Chapter2 ring, Chapter3 grating and Chapter5 detector contracts; new formulas independently checked against conservation and Python complex arithmetic.

No current PDK or product performance claims. The app is a single-mode, fixed-frequency/fixed-bias educational circuit model.
