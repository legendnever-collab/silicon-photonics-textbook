# Chapter 4 v0.4.0 — QA and learning release candidate

## Baseline and integrity
- Chapter 3 merged baseline main: `accb134a59e1cc7f40bbfa9c6a6fcd0068267023`.
- Development branch `feature/ch4-modulators`, Draft PR #4; no main merge.
- Seven Chapter 4 Lessons, each A–F substantial textbook prose, Worked Example, three-choice misconception-based Offline Guided Tutor, Reflection and Prediction.
- Fourteen new Figure entries (Analytical and Conceptual), share model/state with Physics Notebook.
- Unified offline HTML: `dist/silicon-photonics-textbook-v0.4.0.html` in GitHub Actions release artifact.
- Built HTML SHA256: `d35dccadca62d9d5f36d3afd92101bdd2fde18d4addbb1bdb4826e46b05a3fee`.
- Preserved previous standalone releases (Ch1, v0.2.0, v0.3.0); source changes to shared `src/app.js` are additive for Ch4.

## GitHub Actions — measured
- Workflow: https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/39598482066
- Node Unit/Content/Physics/Figure tests: **79 PASS; 0 FAIL**.
- `npm run build`: 22 total Lessons (5 Ch1 + 5 Ch2 + 5 Ch3 + 7 Ch4).
- Deterministic repeated build, matching SHA256 manifest: **PASS**.
- Chromium real Browser Scenario suite: **8 PASS**, using actual built HTML in offline context.
- Desktop viewport 1440×900 and Mobile-emulated 390×844 checked for cross-Chapter navigation, all 7 Ch4 lessons & 2 figures/lesson, Tutor feedback, MZM control update, Save/Resume.
- Browser Page Runtime Errors: **0**. External network requests: **0**.
- CI artifact `silicon-photonics-textbook-v0.4.0` contains standalone HTML, SHA manifest, build-info, Browser JSON report.

## Fidelity and boundary statements
- Soref–Bennett empirical 1550 nm bulk Silicon free-carrier model (illustrative use, not calibrated local device).
- Abrupt 1D PN Depletion width is an electrostatic approximation, **not** real Junction `Δn_eff(V)`.
- `VπL` uses independently assumed effective index sensitivity, not derived from carrier-overlap TCAD.
- Lumped RC is not Traveling-wave RF or end-to-end 200G EO response.
- Ideal 50:50 Lossless MZI and all-pass Ring steady-state transfer do not predict PDK/device dynamic behavior.
- Forward PIN VOA takes independent Power α; no voltage/carrier-transport model.
- Single-time-constant Thermal model is not electrothermal FEM or packaging thermal-crosstalk assessment.
- Font note: v0.4 reuses embedded v0.3 Korean subset. Some newly introduced Hangul glyphs rely on system font fallback; full font coverage upgrade can be reviewed separately. This does not affect physics calculations.
- Chromium test is CI emulated Mobile, not tested on a physical phone; Accessibility and other browser engines are not certified.

## Learner acceptance questions
1. Are Plasma Dispersion's material `Δn` and real Waveguide `Δn_eff` clearly distinguished?
2. Does PN Depletion Width appear separately from optical Phase and actual `VπL`?
3. Does Voltage → `Δn_eff` → Phase → MZI two-port intensity make intuitive sense?
4. Can one explain Ring resonance detuning versus actual EO Bandwidth?
5. Can one distinguish PN depletion / PIN injection / thermal tuning in speed and loss?
6. Are Chapter 1–3 still easy to read and their study records preserved?
7. Are all Figure labels, captions, contrast and equations legible on actual mobile hardware?

**Stop condition:** Do not merge PR #4 into main and do not start Chapter 5 without explicit learner review/approval.
