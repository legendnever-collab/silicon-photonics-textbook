# Chapter 9 checkpoint log

- D0: verified GitHub main dfca9db6be3140c0c3ba5fbd9c717e289c81f30c; Chapter8 PR8 open Draft at8a4f3b6080dd86aa0e0aa51bd0109ccf460a8dae. Created feature/ch9-fabrication from that dependency without merging.
- D1: seven independent A–F lessons/tutors, ten figures, teaching geometry/dispersion/phase-matching/common-local models, linked notebook, presets, numeric dialog/report and read-only v9 persistence. Node181/Python1204/font336(no missing) passed. Captured baseline hashes and a reviewable HTML. Browser CI pending.

- D2: manual slider/Properties changes now show Custom rather than Nominal; choosing Custom preserves values. Co-located map markers use distinct solid/dashed radii, with a separate legend. Removed SVG implementation units from coupon label. Tightened linked reading/Notebook equality test. Node182/Python1204/Font336 all passed; real Chromium CI remains in progress.

- D3: real Chromium D2 passed Desktop1440/1366 and390px in both themes, then identified a320px paragraph overflow in9.4. Added Chapter9-only long-expression wrapping, readable wrapped Parameter JSON, true mobile zoom pan verification and geometry-label clearance. Preserved overflow assertion and all archived checks. D1 linked-view test compared mismatched scopes; fixed to exact full-view equality without changing runtime values.

- D3b: repeated GitHub runners stalled in system-package installation while the earlier full Chromium install succeeded. Chapter9 workflow now installs the pinned Playwright browser directly, using hosted-runner browser system libraries, and retains every browser/regression assertion. A working local Chromium153 binary was discovered and is running the same matrix plus archived regressions independently. No runtime/physics change.
