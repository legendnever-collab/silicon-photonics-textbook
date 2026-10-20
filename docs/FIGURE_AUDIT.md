# F0 · Figure & Physics audit

## Recovery
Verified 2026-10-21: main a40bb926b5e4adab9aad09a67a11765feef979cc, PR #1 open/unmerged, development branch feature/ch1-textbook-pilot at 21c3e2d4a2696332c492fd1bc6768270b67a465b. Working tree initially clean. Existing 11 Node tests and 15 actual Chromium browser scenarios PASS. Baseline source/content hashes and model outputs: FIGURE_BASELINE.json. Original C1–C4 artifacts remain preserved. F0 HTML is the original verified RC.

## Reuse inventory
- notebook/models.js: criticalAngle, slabTE, slabField, phase, bendTable, designLedger. No coefficient/formula changes planned.
- src/app.js: native SVG fieldPlot, dispersionPlot, phase trace/phasor, conceptual ray/strip/polarization/bend sketches.
- src/app.js: reading section observer, Desktop notebook, Mobile inline notebook, persistent session. Preserve these flows.
- Existing textbook JSON and tutor JSON will remain byte-identical. New figures are inserted by a separate renderer at semantic paragraph/section anchors.

## Planned delta
F1: five numbered inline figures: structure, evanescent confinement, TE0/TE1 comparison, k/β/h/q, live phase. Dedicated Figure renderer/metadata, model details, optional accessible zoom.
F2: 2D scalar finite-difference precomputed fundamental mode for three strip widths; reproduce/validate grid and domain convergence. Add 2D map, geometry comparison, analytical slab branches/count. Scalar unknown u is not a full vector E field or TE/TM label.
F3: qualitative bend comparison and synthetic Loss/Footprint graph, full responsive/theme/zoom/persistence regression, inventory/QA/final HTML.

## User figure references
The four supplied images were inspected: a TE-like dB field map; slab and k-vector triangle; normalized 2D transverse map; bend field/geometry comparison. Their pedagogical layout motivates axes, boundaries, colorbars and paired comparisons. They are not copied, embedded or committed. No numeric values are extracted as design truth. New SVG/data are independently authored.

## Numerical contract proposed
Scalar (∂x²+∂y²+k0²n²)u=β²u on finite rectangle with homogeneous Dirichlet boundary. Symmetric Si/SiO2 rectangle, λ0=1550nm, nSi=3.48, nSiO2=1.444, H=220nm, W=220/500/800nm. Real materials, 5-point cell-centered finite differences, sparse symmetric eigenproblem. Compare grid/domain convergence, eigen-residual, symmetry, localization; validate Laplacian against separable homogeneous-box eigenvalues. Geometry uses grid-aligned interfaces. Report true scalar eigenvalue only. Silicon's high index contrast makes vector/interface effects significant; numerical convergence of this scalar equation does not validate real strip accuracy, TE/TM polarization, radiation or loss.
