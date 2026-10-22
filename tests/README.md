# Verification

## Production/content/model tests
Node.js ≥20. No npm dependencies for `npm run build && npm test`.

## Browser tests
Executed using Playwright 1.62.1 + Chromium headless 133 available in the work environment. The runner accepts an explicit browser binary and falls back to Playwright's installed Chromium. To run elsewhere, install the same Playwright version and its Chromium:

```sh
npm install --no-save playwright@1.62.1
npx playwright install chromium
npm run build
npm run test:browser
```

Optional: `BROWSER_EXECUTABLE_PATH=/path/to/chromium npm run test:browser`.
The test uses local `file://`, sets Browser network offline, and records external request attempts/errors. It tests Desktop 1440×900, Mobile 390×844 and 320×740, themes, keyboard, notebook models, tutor misconceptions, scroll-linked topic, saves, backup/restore, corrupted records and storage-denied operation. Emulation is not physical mobile device validation or a full assistive-technology audit.

## Independent numerical model audit
Python 3, numpy and scipy. `python3 tests/independent-validation.py` independently discretizes E''+k0²n²E=β²E with a cell-centered grid, checks 5→2.5→1.25 nm convergence on ±12 µm and compares the JS analytic Slab roots. It also integrates Power Fraction independently. The resulting `docs/PHYSICS_VALIDATION.json` contains exact grids/errors. No FDTD/FEM is built for the product; this is a small offline QA check of the simplified Slab implementation.

## v0.1.1 Figure verification
`npm run test:browser` runs both original browser scenarios and the new `tests/figures-browser.mjs`. Reports/screenshots go into `artifacts/v0.1.1/`; the original Pilot artifacts stay preserved. The Figure suite covers all ten figures in 1440×900, 1366×768, 390×844 and 320×740, both themes, model labels/zoom, case/scale selection, live Phase/Slab/Bend linkage and session restoration.

`npm test` additionally verifies original content/model source hashes, cutoff/normalization/vector relations, scalar dataset/script hashes and raw convergence evidence. `python3 tests/validate_scalar_images.py` checks numerical samples against all six encoded color images, including y orientation. Reproduce data with `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 python3 scripts/precompute_scalar_modes.py`. Use the exact versions in `scripts/requirements-physics.txt` for the recorded numerical environment. Production builds still use committed data and have no Python/API dependency.

## Chapter7
`npm run build`, `npm test`, `npm run test:ch7:independent` (Python/numpy), `npm run test:ch7:browser` (Playwright/Chromium). The v0.7.0 suite navigates all43 lessons and tests the7 new lessons/interactions,11 figures,tutors,read-only prior save migration and actual JSON download/restore. Historical Chapter1–6 browser commands still target archived standalone releases. CI captures screenshots and checks SVG text bounds; visual inspection is a separate human/model review step. Mobile is emulation.
