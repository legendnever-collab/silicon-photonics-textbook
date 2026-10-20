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
