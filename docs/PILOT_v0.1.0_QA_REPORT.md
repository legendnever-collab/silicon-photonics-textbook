# Chapter 1 Release Candidate · QA report

## Result
C1–C4 complete. All five Lessons implemented independently from the initial README-only main. This release is ready for **user learning review**, not a claim of proven learning outcomes. Main remains unchanged; Chapter 2 is not started.

## Content and teaching audit
| Lesson | Teaching | Tutor | Notebook |
|---|---|---|---|
| 1.1 Confinement | Index, Core/Cladding, TIR→Maxwell, critical-angle example | 2 misconceptions, 4 explanations | Snell angle; conceptual rays |
| 1.2 Optical Modes | Eigenmode, nodes, signed E vs E², TE/TM and quasi labels | 2 misconceptions, 4 explanations | Exact 1D Slab TE; separate polarization illustration |
| 1.3 Effective Index | β, n_eff, phase, λg, units and 10µm example | 2 misconceptions, 4 explanations | Analytical phase calculator; assumed n_eff |
| 1.4 Geometry | Width/Height, confinement, cutoff and conditional Single-mode | 2 misconceptions, 4 explanations | All supported Slab TE branches and Power fraction; separate Strip geometry |
| 1.5 Design | Propagation/Bend ledger, footprint, trade-off, Chapter review | 2 misconceptions, 4 explanations | Analytical ledger with explicitly synthetic Bend inputs |

Each Lesson has A–F, a worked example, assumptions, units, limitations, prediction and explanation notes. No score, reward, mission or mandatory progression gate. Offline Guided Tutor is explicitly prewritten content; no AI chat, API, payment or backend. Technical nouns are English and explanations Korean.

Primary book PDF was not available. No invented page/section attribution or reproduced book figures/tables/PDF. See references/SOURCE_MAPPING.md for independently checked public and official sources. Native SVG illustrations and explanations were authored for this project.

## Physics audit
11 Node content/model/build tests PASS, including boundary continuity, transcendental residual, parity, cutoff, index ordering, unit conversions and dB power relation. Critical angle = 24.5157° approximately; phase example n_eff=2.40, λ₀=1550nm, L=10µm gives 97.288rad. Loss example R=10µm gives 0.698850dB and ~85.14% Power.

Independent finite-difference check solves E'' + k₀²n² E = β²E on ±12µm with 5→2.5→1.25nm grids. It does not use the JS transcendental root equation. All guided TE eigenvalues are compared; maximum final discrepancy is 3.73161e-05 in n_eff. Independent infinite-tail quadrature checks Power Fraction.

| Slab Width [nm] | TE modes | max Δn_eff magnitude at 1.25nm | max ΔΓ_TE magnitude |
|---|---|---|---|
| 220 | 1 | 1.602e-05 | 1.110e-16 |
| 500 | 3 | 1.746e-05 | 1.110e-16 |
| 800 | 4 | 3.732e-05 | 0.000e+00 |

The Slab model is validated within its ideal assumptions. Finite Height, actual 2D Strip modes, Quasi-TM numerical results, material dispersion/absorption, fabrication/process variation and real Bend loss are excluded. Synthetic Bend numbers are not fit to a platform. Analytical/conceptual labels remain explicit. Full conditions and original derivation: notebook/MODEL_CONTRACT.md. Machine-readable evidence: docs/PHYSICS_VALIDATION.json.

## Browser verification
15 end-to-end Scenarios PASS. Chromium 133.0.6943.0, Playwright 1.62.1. Local file:// HTML with Browser network offline. Desktop 1440×900, Mobile emulation 390×844 and 320×740, Light/Dark and Reduced Motion.

Covered: all five A–F flows; distinct Tutor feedback and extra explanations; TIR and keyboard range control; mode/field/polarization selection; scroll-linked polarization; phase doubling; 1→3→5 Slab modes and unavailable mode clamping; loss constraints; keyboard theme and navigation; prediction/notes/tutor/parameter/scroll resume; JSON export/import and read marker; invalid/future/oversized backup rejection; inline Mobile notebook after repeated Lesson changes; no horizontal overflow; touch button interaction; visible fallback when Storage is denied.

Runtime Errors: 0. Console Errors: 0. HTTP(S) requests: 0. Initial Mobile notebook-removal bug found during QA was fixed, then the full suite passed. Import tests wait for asynchronous file parsing; premature assertions were corrected. See artifacts/browser-results.json for named scenarios.

Screenshots were visually inspected for Korean font rendering, text/graph legibility, clipping, light/dark contrast, responsive layout and controls. Font is bundled inline with SIL OFL license in the HTML and Repository. Actual hardware touch/Android/iOS, non-Chromium browsers, screen readers and full WCAG audit are NOT TESTED. Automated browser tests do not establish educational effectiveness. No GitHub Actions workflow is configured; results here are the executed local checks.

## Offline build and source parity
- Run: download and open dist/chapter-01.html in a Browser.
- Build: Node.js ≥20; npm run build (no production dependencies).
- Reproduction: two consecutive builds produce identical HTML hash.
- Content source hash: `b69098ecc858d6973af61e39a0989caa6d85fcde2fec57d9b7b808c061552741`.
- HTML SHA256: `c7ae1459b2697da1399b59bbacad35acc3401df3be76bc4262e53671e3120d70`.
- CSP blocks network connections; Script/CSS/Font/Data are contained in the HTML. Reference links only open when explicitly selected.
- Local Storage is per Browser/Origin/file behavior. Export records before moving between devices or clearing Browser data. Storage-denied use remains possible with export fallback.

## User review remaining
Actual 30–45 minute duration, explanatory depth, independent conceptual transfer, Tutor usefulness, Notebook connection and overall textbook feel require direct user study. Follow docs/LEARNING_REVIEW.md. Do not merge or begin Chapter 2 until the user reviews and authorizes the next step.
