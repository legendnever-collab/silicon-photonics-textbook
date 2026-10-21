# Chapter 5 source mapping — D0

Primary reference: Chrostowski & Hochberg, Silicon Photonics Design (2015), original Chapter 7 Detectors, pp.259–294.
Official source verified 2026-10-22 (KST): https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf, PDF pages 9–10 (printed Contents ix–x).

## Access boundary
Official **contents/section titles and starting pages only** were accessed. Chapter 7 full text, its equations, figures, measured data, problems and code listings were not accessed. No claim of full-text verification. All app explanations, exercises, code and SVGs are newly authored. No original figure or problem reproduction.

| Original section | Start page | App lesson |
|---|---:|---|
| 7.1 Performance parameters | 259 | 5.1–5.2 |
| 7.1.1 Responsivity | 259 | 5.1 |
| 7.1.2 Bandwidth | 260 | 5.2 |
| Transit time | 260 | 5.2 |
| RC response | 261 | 5.2 |
| Dark current | 262 | 5.2 |
| 7.2 Fabrication | 264 | 5.3 |
| 7.3 Types of detectors | 266 | 5.4 |
| 7.3.1 Photoconductive detector | 266 | 5.4 |
| 7.3.2 PIN detector | 267 | 5.4 |
| 7.3.3 Avalanche detector | 268 | 5.4 |
| Charge region design | 270 | 5.4 |
| 7.4 Design considerations | 271 | 5.5 |
| 7.4.1 PIN junction orientation | 271 | 5.5 |
| 7.4.2 Detector geometry | 272 | 5.5 |
| Detector length / width / height | 272 | 5.5 |
| 7.4.3 Contacts / Contact material | 273 | 5.5 |
| Contact geometry | 274 | 5.5 |
| 7.4.4 External load on the detector | 275 | 5.5 |
| 7.5 Detector modelling | 275 | 5.6 |
| 7.5.1 3D FDTD optical simulations | 276 | 5.6 |
| 7.5.2 Electronic simulations | 279 | 5.6 |
| 7.6 Problems | 282 | 5.7 |
| 7.7 Code listings | 283 | 5.7 |
| References | 292 | 5.7 references |

## Teaching decisions
Original ordering 7.1→7.7 is preserved. 7.1 is split into photon counting/responsivity (5.1) then independent response/noise limitations (5.2). Internal/external reference planes and shot-noise assumptions are explicit teaching supplements. No section is omitted; length/width/height, contact material/geometry, charge-region design receive named prose.
7.6–7.7 are mapped to original worked exercises and transparent JS calculations in 5.7, rather than claiming to reproduce inaccessible original problems or listings. FDTD/TCAD are explained conceptually in 5.6; implementing those solvers is deliberately out of scope. Full receiver/TIA/DSP/PAM4 and system design are deferred to subsequent original Part IV (Chapters 9–13); original Chapter 8 Lasers is not implemented.

## Independently accessible supporting primary sources
- [D1] Hamamatsu, Si photodiodes technical note: https://www.hamamatsu.com/content/dam/hamamatsu-photonics/sites/documents/99_SALES_LIBRARY/ssd/si_pd_kspd9001e.pdf — photon conversion, response and elementary noise. No Si spectral response is applied to Ge.
- [D2] Ansys, Germanium-on-Silicon lateral photodetector: https://optics.ansys.com/hc/en-us/articles/360042828913-Germanium-on-Silicon-lateral-photodetector — optical generation passed to electronic transport, ideal collection vs actual response, contact loss. The app does not run or reproduce these simulations/data.
- [D3] Hamamatsu, WITS guide: https://hub.hamamatsu.com/us/en/technical-notes/detector-selection/the-wits-guide-to-selecting-a-photodetector.html — responsivity/QE/reference definition.
