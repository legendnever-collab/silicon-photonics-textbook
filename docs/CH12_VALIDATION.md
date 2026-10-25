# Chapter12 final local validation

Runtime/content HEAD `c12501dc33f2c0aedabf1cce31d5878bff54c618`. HTML SHA256 `3fd513bdfb35af4854b7e3d9d300d330c75dd87b7804c5ce28bbb14bb08e54db`; source hash `968b9713a751381c561e99d55d1ee87d85caec27abd4e6af52e3b64e84162eac`. Independent Extension E1, not a fabricated next original chapter. Exact final documentation-head hosted CI is resolved separately in [PR12](https://github.com/legendnever-collab/silicon-photonics-textbook/pull/12) body/checks. Runtime CI candidate: https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/40156512829 . No pending hosted result is represented as PASS here.

## Executed local results

|Check|Executed result|Evidence|
|---|---|---|
|Node/content/model/source/release preservation|264PASS /0fail|artifacts/v0.12.0/verification-logs/node-tests.log|
|Independent SI / closed-form ODE / math.erfc|11955comparisons PASS|CH12_INDEPENDENT_VALIDATION.json|
|New integrated79lesson Browser matrix|67scenarios PASS|artifacts/v0.12.0/browser-results.json|
|Original archived Chapter1–11 Browser assertions|545scenarios PASS|artifacts/v0.12.0/retained-browser-results.json and verification logs|
|Total executed Browser scenarios|612PASS|67new+545archived; distinct runtime scopes|
|Runtime / Console / HTTP requests / SVG bounds|0 /0 /0 /0|New matrix and retained reports|
|Hangul font audit|318required /0missing,6new additive glyphs|CH12_FONT_AUDIT.json; prior fonts unchanged|
|Baseline source/content/tests/releases/artifacts|633files preserved;0unexpected changes|CH12_PRESERVATION_AUDIT.json|
|Deterministic HTML / previous release hashes|PASS byte-identical rebuild; v0.7–0.11hash checks; D1/D2/D3checkpoint hashes|dist manifests|

Chromium151.0.7922.34 headless shell; Desktop1440×900/1366×768 and Mobile390×844/320×740 ×Light/Dark. Mobile is viewport emulation, not actual Android. All79lessons traversed with A–F and Notebook readout; all7new tutors/alternatives/extras/predictions/reflections, actual labelled Eye/phase/control focus/scroll, negative electrical noise, source bypass, Current/Frozen/Stale/re-acquire, actual JSON Report and Backup/Restore downloads, future schema rejection, v11/v10/v9read-only migration, Properties sticky footer/validation/close/focus and Zoom/Pan checked.

The unchanged historical browser scripts use their archived releases. This is separate from the new runtime's all79lesson traversal and new67matrix cases. Historical browser generation outputs were captured as CH12verification logs, then prior tracked screenshots/reports were restored byte-for-byte before final264test/preservation run. Archived assertions were not modified. QA_REPORT records initial environment/overflow issues and the visually discovered alternating-eye stride alias correction; no assertions weakened or arbitrary sleeps/retries added.

## Numerical scope

Independent reference uses exact SI detector/noise equations, closed-form continuous piecewise-constant two-pole ODE, and Python math.erfc rather than copying the JS recurrence/tail routine. Cascade maximum errors normalized to P1photocurrent at32/64/128/256samples/UI:0.0107411178 /0.0052804133 /0.0026223614 /0.0013056146. Default64is approximately0.528% of P1current for these validation fixtures; not exact cascade or hardware accuracy. Warm-up/labels/negative opening, zero signal/noise/equality, ENBW, sigma decomposition/no duplicate noise, seed reproducibility/statistics8192draws, conditional expected errors and Q withholding checked. Statistical mean−0.0155098σ and variance0.994801σ² are within predeclared0.05/8% tolerances. Model details/reference example:CH12_MODEL_VALIDATION.json and Model Contract.

No actual hardware/low-BER/IEEE/device/PDK/commercial-simulator equivalence or measured learning effectiveness is claimed. Chapter11 Static Opening and all earlier model/source/release claims remain unchanged. User Play Review and explicit approval precede main merge; no next chapter started.
