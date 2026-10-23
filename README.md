# Interactive Silicon Photonics Textbook

기술 용어는 영어, 설명은 한글인 독립적인 Interactive Textbook입니다. 교재 설명 → Guided Tutor → Physics Notebook을 연결합니다. 게임이나 최적화 퍼즐을 중심으로 만들지 않습니다.

## Run offline
현재 통합판 `dist/silicon-photonics-textbook-v0.8.0.html`을 다운로드한 후 Browser로 엽니다. HTML 하나에 Source·Content·모델이 포함되며 외부 Script/Font/API를 요청하지 않습니다. Source 파일 `src/index.html`은 Build Template입니다.

## Reproduce
Node.js 20 이상. Production Build에는 npm 의존성이 없습니다.

```sh
npm run build
npm test
npm run serve
```

`http://localhost:8080/dist/silicon-photonics-textbook-v0.8.0.html`에서도 실행할 수 있습니다. Chapter 8 Browser QA는 Playwright와 Chromium이 설치된 환경에서 `npm run test:ch8:browser`로 수행합니다. `npm run test:browser`는 보존된 Chapter 1 검증입니다. Browser 의존성은 `tests/README.md`를 따릅니다.

## Learning review
Chapter 1은 약 30–45분을 목표로 한 Pilot입니다. 실제 학습 시간과 교육 효과는 아직 사용자 검토가 필요합니다. 자동 테스트 통과와 학습 효과 검증을 구별합니다. Save/Resume는 같은 Origin/Browser의 Local Storage를 사용하며 기록 JSON으로 백업할 수 있습니다. 파일 위치/Browser가 바뀌면 자동으로 공유되지 않습니다.

## Source structure
- `textbook/chapter-01/`: 한글 교재 설명과 Worked Examples
- `tutor/`: 고정형 Offline Guided Tutor. 실시간 AI 아님
- `notebook/`: 가정이 명시된 독립 Physics 함수
- `src/`: Web Application. 외부 Backend 없음
- `docs/`: 학습 설계, Checkpoint, QA
- `references/SOURCE_MAPPING.md`: 확인한 출처와 미확인 범위
- `tests/`: Physics·Content·Browser 검증
- `dist/`: Offline HTML, Build Info, SHA256
- `checkpoints/`: 단계별 Offline HTML 보존

아래 각 과거 Release의 승인 대기 문구는 당시 기록입니다. 현재 Chapter1–5는 병합 완료, Chapter6은 사용자 학습 검토 및 명시적 승인 전 main 병합 금지. Chapter7 자동 시작 금지. 저작권이 있는 교재 PDF·원본 그림·표는 포함하지 않습니다.

## v0.1.1 · Figure & Physics Upgrade
10개의 번호가 있는 Inline Figure를 추가했습니다. 기존 본문·Tutor·검증된 Analytical Model은 그대로 유지합니다. Figure별 Caption, 분류, 계산 조건, 한계와 모바일 확대를 제공합니다.

- `figures/catalog.json`, `figures/renderer.js`, `figures/styles.css`: Figure 정의·삽입 위치·Renderer.
- `notebook/data/scalar-modes.json`: 3개 Geometry의 Precomputed Scalar 2D Mode. 실제 Full-vector/TE/TM 또는 실측 결과가 아닙니다.
- `scripts/precompute_scalar_modes.py`: 재현 가능한 Scalar 계산. Python + numpy/scipy/Pillow가 필요하며 HTML 실행에는 필요하지 않습니다.
- `docs/FIGURE_INVENTORY.md`, `docs/PHYSICS_FIGURE_VALIDATION.md`, `docs/QA_REPORT.md`: Figure 범위와 검증.
- `docs/FIGURE_LEARNING_REVIEW.md`: 사용자 학습 검토 안내.
- `checkpoints/v0.1.1/F0-chapter-01.html`부터 `F3-chapter-01.html`: 중간 실행 HTML 보존.
- `artifacts/v0.1.1/`: Browser 보고서와 Desktop/Mobile Screenshot.

2D Scalar 근사의 Numerical 수렴은 실제 Silicon Strip의 물리적 정확도를 보장하지 않습니다. Bend Figure는 Conceptual 또는 합성 데이터 기반 Illustrative입니다. 실제 학습 효과와 Figure 밀도는 사용자 검토를 기다립니다.

## v0.2.0 · Chapter 2 Release Candidate

- Offline 통합 교재: `dist/silicon-photonics-textbook-v0.2.0.html` (Chapter 1+2).
- Chapter 1 원본 실행 파일 `dist/chapter-01.html`과 Save key는 보존합니다.
- 원본 순서/Section 대응: [TEXTBOOK_SOURCE_MAPPING.md](TEXTBOOK_SOURCE_MAPPING.md).
- 학습: Power/Field 선수 개념 → DC → Y-branch → MMI 보충 → Phase → MZI → Ring → Bragg → Passive PIC Exercise.
- Figure/검증/검토: `docs/CH2_FIGURE_INVENTORY.md`, `notebook/CH2_MODEL_CONTRACT.md`, `docs/CH2_QA_REPORT.md`, `docs/CH2_LEARNING_REVIEW.md`.
- Checkpoints: `checkpoints/v0.2.0/D0-textbook.html`–`D3-textbook.html`.
- Build: `npm run build`; Unit/Content: `npm test`; Ch1 Browser Regression: `npm run test:browser`; Ch2 Browser: `npm run test:ch2:browser`.
- Browser tests require Playwright and Chromium (or `BROWSER_EXECUTABLE_PATH`). Set `TEXTBOOK_HTML=/dist/silicon-photonics-textbook-v0.2.0.html` to run the existing Chapter 1 scenarios against the integrated artifact. This repository has no configured GitHub Actions workflow; reports record local execution.

This branch is a Draft stacked on `feature/ch1-textbook-pilot` (PR #1), for user learning review. No main merge and no Chapter 3 implementation.

## v0.3.0 · Chapter 3 Optical I/O

- Integrated offline textbook: `dist/silicon-photonics-textbook-v0.3.0.html` (Chapters 1–3).
- Original sequence: Coupling Challenge → Grating Coupler → Edge Coupler → Polarization → I/O Ledger. App Chapter3 maps to original Chapter5. Active components are later.
- Mapping: `TEXTBOOK_SOURCE_MAPPING.md`; model contract: `notebook/CH3_MODEL_CONTRACT.md`.
- QA/inventory/review: `docs/CH3_QA_REPORT.md`, `docs/CH3_FIGURE_INVENTORY.md`, `docs/CH3_LEARNING_REVIEW.md`.
- E0–E3 HTML: `checkpoints/v0.3.0/`. Build hash: `dist/CH3_SHA256SUMS.txt`; all checkpoint hashes: `dist/CH3_CHECKPOINT_SHA256SUMS.txt`.
- Current build: `npm run build`; all unit/content checks: `npm test`; Ch3 browser: `npm run test:ch3:browser`.
- Run Ch1/2 regressions against current HTML with `TEXTBOOK_HTML=/dist/silicon-photonics-textbook-v0.3.0.html`; use `CH2_ARTIFACT_DIR=artifacts/v0.3.0/ch2-regression` for Ch2 reports. Playwright and compatible browser required; optional `BROWSER_EXECUTABLE_PATH`.
- Current data uses `sipt-textbook-v3`, read-only migration from v2 then original Ch1. Backup/Restore transfers records across Browser-dependent file origins.
- Prior HTML/source/model/catalog data remain intact. Scalar Gaussian, relative array factor and ideal Jones projections are declared teaching approximations, not device/PDK/full-wave results.

## v0.6.0 · Chapter6 Lasers — current review candidate

현재 `npm run build`는 `scripts/build-chapter6.mjs`로 Chapter1–6의36개 Lesson을 통합합니다. Chapter6은7개 A–F Lesson,13개 독자 Figure,Offline Guided Tutor와4가지 Interaction(Threshold,L–I,Power & Heat,Integration Structure)을 제공합니다. 기술 용어 영어·서술 한글, Light/Dark,Mobile,Save/Resume·Backup/Restore를 유지합니다.

- 실행: `dist/silicon-photonics-textbook-v0.6.0.html`
- 검증: `npm test`, `npm run test:ch6:browser`, `python3 tests/ch6-independent-validation.py`
- 이전 재현 경로: `build:ch2`, `build:ch3`, `build:ch4`, `build:ch5`; 기존 Chapter1–5 Source/HTML은 byte-identical입니다. CH6 전용 빌드가 checked additive hooks를 in-memory로 적용하여 기존 공통 app과 과거 manifest를 보존합니다.
- 기록: 새 `sipt-textbook-v6`가 기존v5/v4 이하를 Read-only로 읽으며 원본 Key를 수정하지 않습니다.
- 범위: 공식 Chapter8 목차·공개 Summary 기반. Full text/원본 Equation·Figure·Problem 미확인.8.6의 원본 세부 기술 목록은 미확인이며 Raman은 별도1차 연구의 보충입니다.
- 검토: `docs/CH6_LEARNING_REVIEW.md`, 결과/제한은 `docs/CH6_QA_REPORT.md`; Source Mapping/Model Contract/Figure Inventory를 함께 확인합니다.
- 승인 전 main 병합 금지,Chapter7 자동 시작 금지. Remote Push/PR/CI 상태는 QA Report의 실제 관측 결과를 따릅니다.


## Chapter 7 — Photonic Circuit Modelling (v0.7.0)
7.1 Why Circuit Modelling → 7.2 Compact Models → 7.3 Complex Waves/S-parameters → 7.4 Coupler/MZI/Fit/Passivity → 7.5 Ring Feedback → 7.6 GC Measurement → 7.7 Guided Circuit/Photocurrent. 기술 용어 English, 설명 Korean.

`npm run build` creates the current offline43-lesson HTML; `npm run build:ch6` retains the Chapter6 reproduction path. `npm test`, `npm run test:ch7:independent` (Python/numpy) and `npm run test:ch7:browser` (Playwright/Chromium) cover the new release. Existing browser commands target their archived HTML.

Source mapping: docs/CH7_TEXTBOOK_SOURCE_MAPPING.md. Contract/reuse: notebook/CH7_MODEL_CONTRACT.md. Physics validation, QA, figure inventory and review: docs/CH7_*. New v7 save reads previous keys without modifying the originals; JSON export/import remains offline.

Static coherent single-mode models and synthetic fitting/cutback data are teaching assumptions, not FDTD/measured/PDK performance. Explicit phase/loss replace unsupported PN bias calibration. No main merge before user review; stop at Chapter7.

## Chapter 8 — Tools & Techniques (v0.8.0 learning review)
Open `dist/silicon-photonics-textbook-v0.8.0.html` offline and select Chapter8. Seven textbook-first lessons connect PDK/layers/cells/ports to linked MZI schematic/layout/netlist, width/coupon-spacing DRC and endpoint graph comparison, hierarchy/test access and guided review. Properties supports numeric Apply/Close on narrow screens; JSON Study Report is distinct from learning Backup and is not GDS. This is SIPT-DEMO-1 teaching technology, not a foundry PDK or sign-off tool.

Build: `npm run build`; Node/content/preservation: `npm test`; independent reference: `npm run test:ch8:independent`; browser: `npm run test:ch8:browser`. Reproduce Chapter7 with `npm run build:ch7`; other historical commands remain. Chapter1–7 source/releases preserved. See `docs/CH8_LEARNING_REVIEW.md`, QA, Model Contract and Source Mapping. PR8 remains Draft pending completed QA/user review; do not merge or start Chapter9 without explicit instruction.


## Chapter 9 Fabrication — review candidate

`npm run build` builds `dist/silicon-photonics-textbook-v0.9.0.html`:57lessons across Chapters1–9. Chapter8 is an unmerged dependency; Chapter9 PR targets its feature branch until separately approved. Main remains Chapter7. Seven A–F lessons,10original SVG figures, shared geometry/contour/corners/spatial/ring/grating lab, numeric Properties, JSON study report and v9 backup migration. SIPT-FAB-1 is independent teaching assumptions, not measured/foundry distributions or yield. See `notebook/CH9_MODEL_CONTRACT.md`, `docs/CH9_TEXTBOOK_SOURCE_MAPPING.md`, `docs/CH9_VALIDATION.md`, `docs/CH9_QA_REPORT.md` and `docs/CH9_LEARNING_REVIEW.md`.

Checks: `npm test`, `npm run test:ch9:independent`, `python3 scripts/audit-ch9-font.py`, `npm run test:ch9:browser`. Prior releases/build scripts and archived assertions preserved. Verified local Node182, independent Python1204comparisons and Browser378(67new+311archived) PASS; runtime/console/network/SVG bounds errors0. CI and exact artifact hash are recorded in `docs/CH9_RELEASE_CHECKPOINT.json` and `docs/CH9_QA_REPORT.md`. No automatic merge or next chapter start.
