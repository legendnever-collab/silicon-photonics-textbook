# Chapter 10 validation

Final runtime: `c90f797ef1b1c4885457f008aafcda81b6843f82`. Offline HTML SHA256: `c925a0bdfe801fa3aeb947f46d49c1703a0ab0df10b2a98d3ade47757508aef2`.

| Check | Actual result |
|---|---|
| Node/content/model/preservation | 208 PASS (182 retained + 26 new) |
| Independent Python | 1,416 comparisons PASS; max absolute error 5.115907697472721e-13 |
| Chapter 10 Browser | 83 PASS |
| Archived Chapter 1–9 Browser | 378 PASS; original assertions unchanged |
| Total Browser | 461 PASS |
| Hangul coverage | 355 required, 0 missing; 6 additional fallback glyphs |
| Deterministic build | byte-identical rebuild, release SHA256 checked |
| Local prior baseline | 371 files preserved; 3 allowed metadata updates |
| Remote prior tree | 534 blobs preserved; 3 metadata updates; 0 removed |
| Full runtime CI | [successful run](https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/40004450517) |

Independent references use NumPy SVD rigid registration, complex all-pass field ratio, explicit cm propagation units, Gaussian/Jones chain, known-floor qualification and complex voltage-divider RL power waves. Coverage: 36 optical configurations, 12 registration poses and 48 RL cases. Numerical consistency of declared assumptions; no actual measurement accuracy is inferred. Retained Chapter7/8/9 independent references also pass (110/320/1,204 comparisons).

Actual Browser matrix: 1440×900, 1366×768, 390×844 and 320×740, each Light/Dark. Local Chromium 153.0.8010.0; pinned CI Playwright 1.62 / Chromium 151.0.7922.34. Mobile is viewport emulation, not physical phone testing. Runtime/console/network/SVG-bounds errors: 0 in Chapter10; archived reports also have zero reported error counters.

The 83 new scenarios exercise 65-lesson integration and prior Notebook smoke checks, all eight lessons and twelve figures, tutor explanations/predictions, optical alignment, rigid registration, RL power conservation, capture gates and frozen/stale snapshot retention across edits/presets/reload, reference/path correction, floor/saturation/nulls/sampling, stable control nodes/focus/viewport, mobile zoom panning, numeric Properties validation and reachable footer, actual JSON report/Backup downloads and restore, malformed/future rejection, and read-only v9/v8/v7 migration. Detailed records: CH10_BROWSER_VALIDATION.json, CH10_ARCHIVED_BROWSER_VALIDATION.json, CH10_INDEPENDENT_VALIDATION.json, CH10_FONT_AUDIT.json and CH10_VISUAL_REVIEW.json.

The first D1 CI stopped at missing NumPy because dependency installation followed its use. D2 fixes installation order before independent validation. D3 simplifies the laser-to-fiber diagram route; no model formulas or old assertions changed. Final checkpoint and dist HTML are byte-identical. User review/merge approval remains pending; Chapter11 has not started.
