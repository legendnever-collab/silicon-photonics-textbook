# Checkpoint log

## Initial recovery
- 2026-10-20: main `a40bb926b5e4adab9aad09a67a11765feef979cc` 확인. README만 존재, 기존 변경 없음.
- 새 Branch: `feature/ch1-textbook-pilot`. 다른 프로젝트 Source 복제 없음.
- C1–C4를 순서대로 Commit/Push. 해당 Commit의 `checkpoints/Cn-chapter-01.html`로 시점별 HTML 보존.

## C1 · Foundation & First Lesson
- 새 Frontend, Desktop Textbook/Notebook, Mobile 실험 절 삽입, Theme, Save/Resume 구조.
- Lesson 1.1의 A–F, Worked Example, Offline Guided Tutor, Critical Angle 실험.
- `checkpoints/C1-chapter-01.html`. 다음 단계 전 Build/Model/Content 확인.

## C1 remote record
- GitHub Commit: `eb31f0c3fb55e57c248d1f1d9b1b23c9cca810be`.
- Remote Tree와 Local Tree 모두 `76ce465f3f1f18b4d756cc6fab83d206dc3d15ec` 확인.
- 셸 Push 인증 미제공으로 GitHub connector의 Blob/Tree/Commit/Ref 경로 사용. 이후도 동일한 내용 SHA로 확인.

## C2 · Core Waveguide Theory
- Lesson 1.2: Slab TE 실제 해, Signed Field / Field², Node, Polarization 개념도.
- Lesson 1.3: n_eff, β, Phase, Guided Wavelength, Worked Example와 Phase Calculator.
- 독립 모델 함수와 경계 연속/고유방정식/Cutoff/Parity/단위 테스트.
- 한글 Font를 SIL OFL 라이선스와 함께 Inline subset으로 포함. 외부 Font 요청 없음.
- Chromium에서 1.1/1.2/1.3 전환, Mode/Field 표시, Polarization, Phase 확인. Runtime Error 0.
- `checkpoints/C2-chapter-01.html` 보존. 자동 테스트 8 PASS.

## C2 remote record
- GitHub Commit: `f8729e5c34075c4c816ea44e8f1e01a05fadf869`.
- Remote Tree: `ec09cc19d098c723819719dfda58bcee02e20f53`.

## C3 · Geometry & Engineering Application
- Lesson 1.4: Width-dependent Slab TE Profile, all supported TE branches, Core Power Fraction, separate finite Strip illustration.
- Lesson 1.5: synthetic Bend data, physical path length and dB Power ledger, explicit footprint constraints and Chapter Learning Review.
- All 5 Lessons have complete A–F, Worked Example, three-choice Tutor, extra explanations, Prediction and Reflection.
- `notebook/MODEL_CONTRACT.md` states equations, derivation, units and limits.
- `checkpoints/C3-chapter-01.html` preserved before release QA.

## C3 remote record
- GitHub Commit: `9a131e7e9e30966997203bdf08f69da8a69d25ec`.
- Remote/Local Tree: `904ac6ddb2589a5208c9b76754e8324defc55ad2`.

## C4 · Chapter 1 Release Candidate
- 5 Lessons completed. Source/Content/Model/Build tests: 11 PASS.
- Actual Chromium Browser: 15 Scenario PASS, Desktop/Mobile/Theme/Keyboard/Touch button/Save/Resume/Backup/Offline.
- Runtime Error 0, Console Error 0, external HTTP(S) request 0.
- Mobile notebook-removal regression found and fixed; complete suite re-run.
- Slab independent Finite Difference and quadrature PASS. Exact grids/errors in PHYSICS_VALIDATION.json.
- Final HTML, deterministic hash, C4 snapshot, five screenshots and QA/learning review report preserved.
- `docs/RELEASE_CHECKPOINT.json` carries baseline, build hashes and verification scope. The C4 Commit itself is recorded by the Git history/PR to avoid a self-referential commit hash.
- User learning review pending. Main not merged. Chapter 2 not started.

## v0.1.1 F0 · Recovery & Figure Audit
- PR #1/main/development HEAD verified. Baseline 11 Node tests + 15 Chromium scenarios PASS.
- Existing content, Tutor and model hashes captured in FIGURE_BASELINE.json.
- Original HTML preserved as checkpoints/v0.1.1/F0-chapter-01.html.
- New Figure plan and bounded Scalar approach in FIGURE_AUDIT.md. No product/model changes at F0.

## v0.1.1 F1 · Analytical Figure Upgrade
- 1.1A Core/Cladding, 1.1B Slab TE0 Tail, 1.2A TE0/TE1 Signed/Field² comparison, 1.3A kCore/β/h/q, 1.3B live Phase inserted into unchanged textbook paragraphs.
- Reuses original slabTE/slabField/phase. All baseline textbook, Tutor and model source hashes still identical.
- Native SVG captions, classifications, model details and keyboard/mobile scrollable zoom.
- 17 Node tests PASS; original 15 Browser Scenarios PASS. Figure smoke: cutoff handling, normalization switch, Zoom/Escape, live Phase and mobile panning PASS; runtime errors 0.
- Original screenshot/report artifacts preserved; future browser outputs go to artifacts/v0.1.1/.
- F1 Offline HTML preserved under checkpoints/v0.1.1/F1-chapter-01.html.

## v0.1.1 F2 · 2D Mode & Geometry Visualization
- Added Numerical Scalar 2D profiles for W=220/500/800nm, H=220nm, λ0=1550nm, Si/SiO2. Explicitly not Full-vector/TE/TM or measured Strip predictions.
- Reproduction script, 20→10→5nm Grid comparison, ±1→±1.3→±1.6µm Domain comparison, residual/symmetry and independent homogeneous-box check preserved.
- Numerical samples and six linear/dB colored PNG encodings cross-checked exactly, including y orientation. Common relative scale; no real Power/Loss claim.
- Figures 1.2B (2D map), 1.4A (width comparison + y=0 cuts), 1.4B (existing analytical Slab branches + TE count). Notebook Width updates the analytical Figure only; scalar cases are explicitly precomputed selections.
- 20 Node tests PASS; Figure smoke for scalar scale/case, live Slab and Mobile zoom PASS with runtime errors 0.
- Updated Model Contract and sources. F2 HTML preserved under checkpoints/v0.1.1/F2-chapter-01.html.

## v0.1.1 remote checkpoint records
- F0: df1c7516cc93002d48e20c58e3b1d0f7bee574c1
- F1: d527554143a98a0729e51e7bff812a2a862096fe
- F2: ab70b482ed0e76ce112d83cec0c97f9a478a89b9

## v0.1.1 F3 · Bend Figure & Final Integration
- 1.5A Conceptual Bend comparison; 1.5B Illustrative synthetic Bend Loss / analytical Total / Footprint graph. Existing table and coefficients unchanged.
- 10 Figures complete with captions/classifications/parameters/limits. Nearby Figure highlights; zoom supports keyboard/Escape/focus return and sticky Mobile close.
- 21 Node tests PASS. Existing 15 + new 17 actual Chromium Browser Scenarios PASS across 1440×900, 1366×768, 390×844 and 320×740, each Light/Dark.
- Runtime Error, Console Error, external HTTP(S) requests all 0. Original textbook/Tutor/model hashes unchanged.
- Figure Inventory, Physics Figure Validation, Scalar raw evidence, reproduction requirements, user learning review and updated QA preserved.
- Final F3 HTML/SHA256 and screenshots preserved. Source/Commit identity is recorded by Git history and PR #1, avoiding a self-referential commit hash.
- User learning review pending. Main not merged; Chapter 2 not started; no Full-vector Solver expansion.

## v0.2.0 D0–D1
- D0 f3a44fb: official Cambridge Chapter 4 section/page/order mapping before implementation; architecture and physics contracts; D0 HTML preserves Chapter 1 baseline.
- D1: Lessons 2.1–2.2, six figures including Y-branch and Conceptual MMI, shared Power/DC models, integrated chapter navigation and read-only Ch1 save migration. Ch1 standalone bytes preserved.
- Verification: original 21 unit tests and 32 browser scenarios PASS; new physics 12 PASS (including models used in next checkpoints); D1 browser 12 PASS with 4 viewport sizes × Light/Dark, no runtime/console errors or runtime HTTP requests.
- D1 HTML: checkpoints/v0.2.0/D1-textbook.html. Seven available lessons. Existing source renderer changes limited to registration hook and app dispatch/navigation/storage extension.

## v0.2.0 D2
- Lessons 2.3–2.4: β/OPL/Relative Phase, lossless separate-arm distinction, explicit U†DU MZI convention, complex field/transfer/phasor figures. Nine lessons and 11 Ch2 figures available.
- Browser 13 scenarios PASS including phase worked value, MZI 0/π/2/π, shared Figure/Notebook state, focus retention and viewport/theme matrix. D2 HTML and Browser evidence preserved.
- Desktop integrated shell uses flex height to retain full header while reading/notebook independently scroll. Existing Ch1 standalone remains byte-identical.

## v0.2.0 D3 · Release Candidate
- Remote checkpoints: D0 a319d97d8e879e39cab4c47f89bcfe6a75bbcae2; D1 241067041695aa4ce7b1a2d69154ba6f2f8ab8a1; D2 9d2062ff151e144663a84d3471018a1a0bf95cc9. Local authoring commits preserve the same checkpoint trees; connector-created commits retain a fast-forward remote history.
- Complete Lesson 2.5 Ring→Bragg→Passive PIC, shared analytical models, 17 classified figures, read-linked Ring/Bragg/Circuit notebook, original key read-only migration, robust imported parameter bounds, extended Korean font coverage.
- Unit/content 41 PASS; integrated Chapter1 browser 32 PASS; Chapter2 browser 15 PASS. Four viewport sizes × Light/Dark; no runtime/console errors or runtime HTTP requests.
- D0–D3 standalone HTML preserved; D3 matches dist/silicon-photonics-textbook-v0.2.0.html. SHA256 manifest dist/CH2_SHA256SUMS.txt. QA/Inventory/Review/Release Checkpoint docs saved.
- PR #2 remains Draft, base feature/ch1-textbook-pilot. User learning review pending. No main merge, no Chapter3 implementation.

## v0.3.0 E0–E1 · Optical I/O
- User selected original textbook order. E0 7dc04da maps original Chapter 5 sections/pages before implementation; active devices deferred to later learning.
- E1 completes 3.1 Coupling/normalized Gaussian overlap and 3.2 Surface Grating/phase matching. Four classified Figures, A–F prose, independent worked examples, misconception-specific Tutor, shared Notebook models.
- Physics: original 41 tests preserved; new analytical physics tests 10 PASS, including independent 2D complex quadrature and Jones/Stokes comparison. No Vector/FDTD/device-efficiency claims.
- New storage key v3 migrates v2/Ch1 read-only; new chapter descriptor navigation. Ch1 and v0.2.0 HTML retained byte-for-byte. E1 HTML preserved (12 available lessons).
- Browser runtime setup is being recovered in the current environment; browser verification is not yet claimed at this authoring checkpoint.
