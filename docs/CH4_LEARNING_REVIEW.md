# Chapter 4 — 학습 검토 안내

실행 파일: CI Artifact의 `silicon-photonics-textbook-v0.4.0.html` (Chapters 1–4 Offline). GitHub PR #4는 Draft입니다.

권장 학습 순서: 4.1 Plasma Dispersion → 4.2 PN Phase Shifter → 4.3 Active MZI/MZM → 4.4 Micro-ring Modulator → 4.5 Forward PIN/VOA → 4.6 Thermal Tuning → 4.7 Thermo-optic Switch.

### Learning review
- Textbook 문단 설명이 충분한가, Chapter 1–3의 학습 경험과 같은가?
- Material Free-carrier Δn, Optical Mode Δn_eff를 혼동하지 않게 설명하는가?
- PN Junction의 Depletion Width와 광학 Phase를 임의로 연결하지 않는가?
- MZI의 두 Port, Ring 정적 Resonance, Thermal Time Response가 실제 Figure와 연동되는가?
- Figure가 이해를 돕고 Notebook Parameter를 바꾸면 계산이 정확히 반영되는가?
- Mobile에서 본문, Equation, Figure, Tutor와 Notebook을 편리하게 읽고 조작할 수 있는가?
- Chapter 1–3 학습 기록을 v4에서 안전하게 복구할 수 있는가?

### 모델 한계
모든 수치 모델은 명시적 Analytical Approximation이다. TCAD, Full-vector Mode, Traveling-wave/200G, Electrothermal FEM, PDK/실측 Device 응답을 구현하지 않았다.

QA 세부 결과: `docs/CH4_QA_REPORT.md`. Source Mapping: `docs/CH4_TEXTBOOK_SOURCE_MAPPING.md`. Physics: `notebook/CH4_MODEL_CONTRACT.md`.

사용자 직접 학습 리뷰 후 수정 사항을 확정한다. PR 병합 및 Chapter 5는 자동으로 진행하지 않는다.
