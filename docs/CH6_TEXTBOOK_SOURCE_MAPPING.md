# Chapter 6 source mapping — D0

Verified 2026-10-22 KST. Baseline main/merged PR5: 30d04b9ee43e62647544c3942199b9078ccacf3a. Clean checkout; no prior CH6 branch/PR; 99 baseline Node tests PASS. Browser baseline initially blocked by missing Chromium executable; provisioning is recorded separately.

## Access boundary
Cambridge official contents (printed x, PDF page10) and public Chapter8 summary were accessed. Full text, original equations, figures and problem were not accessed. All app prose, examples, questions and SVG are original. The official heading is **8.7 Problem** (singular).

| Original section | Start page | App | Treatment / reason / later work |
|---|---:|---|---|
| 8.1 External lasers |295|6.1|Optical power supply; reference planes; Ch3 coupling review|
| 8.2 Laser modelling |296|6.2|Original supplemental uniform FP threshold and L–I basics; not a reconstruction of original section equations; dynamics deferred|
| 8.3 Co-packaging |299|6.3|Package versus cavity boundary; original schematics|
| 8.3.1 Pre-made laser |299|6.3|Complete laser die vs optical interface|
| 8.3.2 External cavity lasers |300|6.3|Gain chip and remote reflector; conceptual only, not uniform FP simulation|
| 8.3.3 Etched-pit embedded epitaxy |301|6.3|Embedded pre-grown III–V material distinguished from direct growth. Creazzo2013 primary abstract confirms embedded, metal-bonded gain; exact original process/geometry not accessed; no recipe|
| 8.4 Hybrid silicon lasers |301|6.4|Bonded gain, Si guidance and qualitative overlap; Fang primary research; no solved mode|
| 8.5 Monolithic lasers |303|6.5|Growth versus bonding; lattice/interface and thermal issues|
| 8.5.1 III–V Monolithic growth |303|6.5|Direct growth; no process or universal ranking|
| 8.5.2 Germanium lasers |304|6.5|Indirect/direct valleys; strain/doping tradeoffs qualitatively; no threshold prediction|
| 8.6 Alternative light sources |306|6.6|Heading verified, original subsection technology list NOT verified. Conservative scope: independently sourced Raman example, explicitly supplemental; no claim it reproduces original list. Original-specific coverage remains limited pending licensed text|
| 8.7 Problem |307|6.7|Original synthesis exercises and explanation; not original problem reproduction|
| References |307|6.7 sources|Verified primary-source reading|

Original 8.1→8.7 order retained. Emission/gain/feedback/L–I and energy bookkeeping are teaching supplements, not claims about the full text. Model excludes RIN, linewidth, dynamics, rate equations, thermal/transport/EM solver, DFB/DBR spectrum, foundry/PDK performance. Those need subsequent specialist study; no Chapter7 implementation. No claim that 2015 MPW availability describes 2026.

## Sources (checked 2026-10-22 KST)
- L0 Cambridge contents: https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf
- L1 Cambridge public summary: https://www.cambridge.org/core/books/abs/silicon-photonics-design/lasers/08CBE91DCF0D0AFA07C124149BF3C552 ; DOI10.1017/CBO9781316084168.009
- L2 Southern Methodist University, GAIN manual §4.1.2: https://s2.smu.edu/ee/smuphotonics/GainManual/HTM_GainManual/book.htm — modal/material gain, mirror/internal loss, L–I slope. No GAIN execution.
- L3 Wistey, Stanford dissertation (2005), printed pp21–23, eq2.2: https://snow.stanford.edu/thesis/Wistey.pdf — differential photon/current efficiency and phase condition. Our R is POWER reflectivity; never substitute amplitude r into its formula.
- L4 Creazzo et al., Integrated tunable CMOS laser (2013), DOI10.1364/OE.21.028048, primary abstract: https://pubmed.ncbi.nlm.nih.gov/24514318/ — embedded and metal-bonded III–V gain. Full article blocked at publisher; no inferred dimensions.
- L5 Fang et al., Design and fabrication of optically pumped hybrid silicon-AlGaInAs evanescent lasers (2006): https://escholarship.org/uc/item/1q3279gw — primary abstract indexed; direct page rate-limited. Bonded structure and overlap only; no reported curve reproduced.
- L6 Rong et al., A continuous-wave Raman silicon laser (2005), DOI10.1038/nature03346, https://pubmed.ncbi.nlm.nih.gov/15716948/ — primary abstract indexed. Independent supplemental mechanism, not verified as original §8.6 content.

Conservation-based power ledger is derived directly from definitions and energy balance. WPE excludes driver/TEC; coupling-rejected power is not assigned to source heat. No modern product recommendations or invented efficiency/PDK values.
