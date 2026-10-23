# Chapter 10 textbook mapping and source scope

Chrostowski & Hochberg, Silicon Photonics Design: From Devices to Systems (2015), original Chapter12 Testing and packaging381–404. Official Cambridge contents inspected2026-10-24(KST): https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf . Full textbook chapter, original figures, measurement data and checklist were not accessed or copied. All prose, examples, tutor choices and SVG are independent. Coverage follows verified contents; do not infer exact paid-text coverage.

| App lesson | Original verified contents | Implemented / limitation |
|---|---|---|
|10.1 Optical Interfaces|12.1/12.1.1,381; grating381/edge382/individual fiber382/SSC383/array384/free-space385/taper386|All listed roles explained; only grating/edge have declared numeric examples|
|10.2 Alignment & Polarization|12.1.1 interfaces; fiber alignment operation395|CH3 overlap/Jones reused; fine-alignment intuition introduced before station operation as prerequisite, then revisited10.5|
|10.3 Electrical Interfaces|12.1.2 electrical386; pads386/probing387/wire bonding388/flip-chip388|Conceptual interface roles and independent seriesRL50Ω example; no extraction/real package bandwidth|
|10.4 Probe Station|12.2 automated stations389; parts391–393/software393/operation394/equipment397|Synthetic station roles, limited workflow gates and frozen capture; no instrument control|
|10.5 Chip Registration|12.2.3 loading/alignment395/chip registration396|Noise-free two-fiducial rigid transform and linked optical misalignment; not real accuracy|
|10.6 Measurement & Reference|12.2.3 automated device testing396; equipment397|Synthetic sweep/reference/known floor/ceiling/path correction/sampling; no original experiments|
|10.7 Design for Test|12.3DFT398; power budgets400/layout401|One-loss-per-stage ledger, reference and conceptual access; no actual geometry collision checks|
|10.8 Packaging Review|12.3.3 design review/checklist402; synthesis of optical/electrical interfaces|Independent review questions and JSON report; reliability/assembly materials/thermal qualification deferred to real engineering validation|

Additional primary sources inspected:
- Q1 Keysight, How to Measure Optical Insertion Loss Across Wavelength: https://www.keysight.com/gb/en/use-cases/measure-optical-insertion-loss-across-wavelength.html . Used qualitatively for tunable-source/power-meter sweep and stored reference comparison. No product specification, device measurement or software API copied.
- Q2 imec (2018), Developing silicon photonics technologies with a wafer-level test station: https://www.imec-int.com/en/imec-magazine/imec-magazine-april-2018/developing-silicon-photonics-technologies-with-a-wafer-level-test-station . Used qualitatively for stage/fiber/probe coordination and need for calibration. No equipment accuracy/throughput claims or proprietary algorithms reproduced.
- Q3 Ansys, Understanding the mode overlap calculation: https://optics.ansys.com/hc/en-us/articles/360034396834-Understanding-the-mode-overlap-calculation . Supports distinction between field overlap and power normalization. Production code directly reuses the existing Chapter3 scalar Gaussian/Jones and Chapter9 synthetic grating/ring; no new EM solver is claimed.

Every numerical fixture parameter, additive floor, margin, ceiling, optical-center offset, registration transform, sweep grid and seriesRL value is an independent declared teaching assumption. Detailed units/formula/validation scope: notebook/CH10_MODEL_CONTRACT.md. Preview, frozen synthetic sample and actual measured data are kept distinct. Next appChapter11 maps originalChapter13 System Example406–412; no automatic start.
