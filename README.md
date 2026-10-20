# Interactive Silicon Photonics Textbook

기술 용어는 영어, 설명은 한글인 독립적인 Interactive Textbook입니다. 교재 설명 → Guided Tutor → Physics Notebook을 연결합니다. 게임이나 최적화 퍼즐을 중심으로 만들지 않습니다.

## Run offline
`dist/chapter-01.html`을 다운로드한 후 Browser로 엽니다. HTML 하나에 Source·Content·모델이 포함되며 외부 Script/Font/API를 요청하지 않습니다. Source 파일 `src/index.html`은 Build Template입니다.

## Reproduce
Node.js 20 이상. Production Build에는 npm 의존성이 없습니다.

```sh
npm run build
npm test
npm run serve
```

`http://localhost:8080/dist/chapter-01.html`에서도 실행할 수 있습니다. Browser QA는 Playwright와 Chromium이 설치된 환경에서 `npm run test:browser`로 수행합니다. Browser 의존성은 `tests/README.md`를 따릅니다.

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

Chapter 1 사용자 학습 검토와 명시적 승인 전 main 병합 금지. Chapter 2 자동 시작 금지. 저작권이 있는 교재 PDF·원본 그림·표는 포함하지 않습니다.

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
