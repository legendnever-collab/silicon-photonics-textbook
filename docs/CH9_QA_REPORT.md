# Chapter 9 QA report

## Review artifact
`dist/silicon-photonics-textbook-v0.9.0.html`, SHA256 `942ee24d28d769c45251a858e082fc424054456df42013c220dfbd7f6a022c28`. Identical retained checkpoint: `checkpoints/ch9/D4-final-fabrication-review.html`. Seven new lessons/10numbered figures;57integrated lessons total. Draft PR9 depends on unmerged Chapter8 PR8. No main merge or Chapter10 development.

## Actual browser evidence
Local Chromium153.0.8010.0 executed the unmodified Chapter9 matrix:67scenarios PASS, runtime/console/network/SVG bounds errors0. Desktop1440×900/1366×768 and mobile390×844/320×740, Light/Dark. Mobile is viewport emulation, not physical-phone verification. Temporary external executable override used for local tests; it is not a runtime dependency or change to historical assertions.

Each context navigated all57lessons and validated all7new lessons' tutor choices/explanations/prediction and finite figures. Actual geometry offsets, each-edge factor2, presets/Common/Local/Gradient, same-order Ring outputs, Grating product/FWHM, fixed corner table, geometry-only rounding, stable control node/focus/viewport and linked reading/Notebook equality passed. Numeric Properties rejects invalid values and supports Apply/Close/native Escape/focus return with reachable sticky footer. Zoom was actually panned horizontally on mobile. Actual JSON report and learning Backup downloads/restores, notes/answers/completion/reload, malformed/future rejection and read-only v8/v7/v6 migration passed. No runtime external requests.

All original archived Chapter1–8 browser commands also completed:311scenarios PASS. Total local378browser scenarios. Nine archived report counts15+17+15+15+8+49+58+67+67, error counters0. See `CH9_BROWSER_VALIDATION.json` and `CH9_ARCHIVED_BROWSER_VALIDATION.json`. Node182 and independent Python1204comparisons also PASS; font audit336Hangul/0missing,8fallback glyphs added. Old Chapter8 independent320 and Chapter7 independent110checks passed unchanged.

Ten final reading-figure screenshots and8ring crops plus4mobile properties/1zoom screenshots captured. Representative final geometry/contour, ring320Dark/zoom, both mobile dialog themes and distinct corner/field/covariance/grating diagrams were manually reviewed. Geometry label clearance and co-located solid/dashed A/B markers were improved. All viewports/figures have programmatic bounds checks; zoom intentionally scrolls.

## CI and issues
Pinned Playwright1.62/Chromium151 CI runs the same matrix and all preserved archived commands. Runtime verification record: https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/39990950206 . Final current-head checks are on PR9. The first standalone local Playwright download was truncated; a working local Chromium executable enabled the complete additional local verification above. Hosted-runner system-package installation stalled on redundant earlier runs, so the Chapter9 workflow installs the browser directly against hosted-runner system libraries; this installation gate has actually passed.

A D1 linked-view assertion compared the full figure readout against a truncated notebook readout; corrected to strict equality of the full matching views. Actual320px9.4 long-expression paragraph overflow was fixed with Chapter9-scoped wrapping; overflow assertion retained. Model Parameters JSON also wraps. Rounding remains intentionally geometry-only.

One duplicate runtime CI push run39990944828 hit the pre-existing Chapter2 archived save/resume race (expected Lesson2.1, observed1.3), also previously recorded during Chapter7/8. Archived source/release/assertions are byte-identical, and the same archived checks passed locally. This was not hidden, marked PASS, weakened or removed. The authoritative successful run is recorded at finalization below.

## Scope
All fabrication sensitivities and controls are independent teaching assumptions. No original experimental dataset, foundry distribution/yield, actual process contour simulation, full-wave solver or manufacturing approval. Ring fixed centerline/loss/coupling and linear dispersion; grating frozen index dispersion/fixed Gaussian height/FWHM. Deterministic normalized die map excludes local offsets; no local spatial correlation function. These model limits remain visible in lessons, figures, Notebook and report.

Final runtime CI39990950206 on head42ff7a0ab735421e26a50c4fa39fd17c93188233: completed SUCCESS observed, all build/Node/independent/font/deterministic/67new Browser/311archived Browser gates successful. HTML SHA matches the local reviewed artifact. This is distinct from the failed duplicate push run described above.
