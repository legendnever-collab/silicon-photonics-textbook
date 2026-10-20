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
