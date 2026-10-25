# Chapter 11 source mapping and coverage

Primary reference: Chrostowski & Hochberg, Silicon Photonics Design: From Devices to Systems (2015). Original Chapter13, Silicon photonic system example, pp406–412. Official Cambridge contents verified2026-10-24(KST): https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf . Full paid chapter, original figures, measured spectra, detailed experimental parameters and source listings were not accessed or copied. Coverage is by verified section titles and independent teaching synthesis, not a claim of exact full-text reproduction.

| App lesson | Verified original contents | Independent implementation / sequencing |
|---|---|---|
|11.1 WDM System|13.1 WDM transmitter406|Per-carrier/total power, frequency/wavelength grid and source/reference planes|
|11.2 Ring Architecture|13.1.1 Ring-based WDM architectures406|Existing all-pass feedback reuse, two static states and periodic FSR; no high-speed device calibration|
|11.3 Common-bus|13.1.2 Common-bus transmitter408|All carriers traverse all active rings; exhaustive16pattern data-interaction matrix|
|11.4 Mod-Mux|13.1.3 Mod-Mux transmitter410|Separate active branches and new passive add/drop filter power graph; filter/order penalties retained|
|11.5 Detuning & Interaction|Supplement after13.1.3, before conclusion|Existing Chapter9/10 concepts connect detuning to nominal versus worst static conditions; independently added to make architecture comparison interpretable|
|11.6 Budget & Monitoring|Supplement after13.1.3, before conclusion|Existing Chapter5/10 concepts connect reference planes/tap/current/observability; model probe distinguished from real stabilization|
|11.7 System Review|13.1.4 Conclusion411|Same-assumption architecture comparison, frozen report and explicit remaining real-link validation|

Original learning order WDM→Ring architectures→Common-bus→Mod-Mux→Conclusion is retained.11.5/11.6 are clearly marked educational additions to integrate earlier chapters rather than silently claiming sections in the original. Original references start412; no new original chapter after13 is inferred. No Chapter12 app development is started automatically.

Primary technical support:
- W1 inventor technical disclosure US9941990B2, https://patents.google.com/patent/US9941990B2/en . Read description of common bus, separate modulator/add-filter branch topology, aggregate monitoring and distinction of modulator/filter alignment. Used qualitatively; no patent claims interpretation, legal status, original figure, fabricated-device numbers or actual control algorithm is asserted or copied.
- W2 Ran Ding et al., OFC2014 Th4G.6, https://opg.optica.org/abstract.cfm?uri=ofc-2014-Th4G.6 . Published abstract confirms both common-bus and Mod-MUX demonstrations. Full conference paper not accessed and its performance figures are not used as teaching-model validation.
- A University of Washington dissertation PDF was found in search, but direct retrieval returned403; its full contents are not treated as inspected evidence.

All carrier spacing/FSR/drive/drift/mismatch, common port assumptions, passive lossless add filters, source/tap/segment values and finite-grid tuning are independently declared examples. Architecture advantages have scope limits: zero cross-modulation in the separated active feed-forward model does not imply zero thermal/electrical/receiver crosstalk, loss, alias penalty or BER. Equations/units and direct model reuse: notebook/CH11_MODEL_CONTRACT.md.
