# v0.12.1 · 5–10분 사용자 Play Review

실행 파일: `dist/silicon-photonics-textbook-v0.12.1.html`. 다운로드한 HTML을 Browser에서 엽니다. 외부 서버/API/Font가 필요하지 않습니다. 기존 교재→Tutor→예측→실험→관찰/Reflection 흐름과79Lesson을 유지합니다. 이번 화면 변경은1.4/12.2/12.5에만 적용합니다. Chapter 선택 줄은 Desktop Pilot에서 좌우로 스크롤할 수 있습니다.

## 1. Width와 Mode · 약2분

Chapter1 → Lesson1.4. 오른쪽 Parameter 영역을 내려 Width를1000nm로 변경하고 TE0–TE4를 선택합니다. 위 Live Field/주요 결과가 계속 보이는지 확인합니다. Field Profile ↔ n_eff vs Width를 전환하고 선택 Mode가 유지되는지 봅니다. Strip Geometry는 기존 Conceptual 그림이며 새로운2D Solver 결과가 아닙니다.

## 2. Bandwidth / ISI · 약2분

Chapter12 → Lesson12.2. Time / Bandwidth / Sampling을 열고 Tx/Rx Bandwidth와 Pattern을 조절합니다. 위 표시 영역에서 Rx Current / Tx Power / 전체 그림을 선택할 수 있습니다. 표시 영역 선택은 계산 조건이나 Frozen Evidence를 바꾸지 않습니다. 긴 원본 그래프의 전체 내용을 보려면 전체 그림 또는 기존 그림 확대를 사용합니다.

Decision / Noise / Evidence까지 내려 마지막 Tested Bits를 바꿉니다. 그래프가 사라지지 않는지 확인합니다. 주기 Pattern에서 Tested Bits만 늘려도 첫8UI 파형은 같을 수 있습니다. Evidence Count와 Histogram은 해당 조건에 맞게 갱신됩니다. 그래프 갱신을 보기 위해 Rx Bandwidth도 변경해 보세요.

## 3. Noise와 확대·복귀 · 약3분

Lesson12.5 → Save Comparison으로 현재 조건을 저장합니다. Shot/Thermal, Rx Bandwidth를 바꾸고 Noise / Histogram ↔ Actual2-UI Eye를 선택합니다. Parameter의 전체 Readout/Frozen Evidence는 아래 상세 영역에 남아 있습니다. 물리 조건 변경은 기존 Frozen을 Stale로 표시하며 자동 재취득하지 않습니다.

`실험 화면 확대`를 누릅니다. Desktop에서는 그래프/Parameter가 좌우로, Mobile 세로에서는 위아래로 배치됩니다. 같은 Notebook을 옮기므로 값과 Evidence를 공유합니다. `숫자 수정`에서 마지막 입력까지 내려 Apply/Close가 닿는지 확인합니다. 닫기 또는 Escape로 교재의 읽던 위치·값·Focus로 돌아갑니다. Properties나 그림 확대가 열린 상태의 Escape는 그 안쪽 창부터 닫습니다.

## 4. 영역 크기 · 약1분

구분선을 드래그하거나 Tab으로 선택한 뒤 Arrow/Shift+Arrow/Home/End로 조절합니다. 그래프와 Parameter가 모두 남는 범위에서 움직입니다. 좁은 화면에서도 축/단위 글씨를 지나치게 축소하지 않으므로 그래프 내부를 좌우·위아래로 Pan/Scroll할 수 있습니다. 이는 Parameter 스크롤과 별개입니다. 전체 그림 확대도 그대로 사용할 수 있습니다.

## 검토 결과

- 아래 Parameter를 조작할 때 인과관계를 계속 볼 수 있는가?
- 그래프/Parameter 크기와 글씨가 학습에 충분한가?
- Mobile 숫자 입력·적용·닫기와 교재 복귀가 편한가?
- 기존 설명/Tutor/Notes/예측/Reflection 경험에 방해되는 부분이 있는가?

자동 검증은 Viewport Emulation입니다. 실제 Android Keyboard/IME, 시스템 Back, 실제 Touch 느낌과 학습 효과는 사용자 확인이 필요합니다. 이번 검토와 명시적 승인 전 main 병합하지 않습니다. U2–U4/Chapter13은 시작하지 않았습니다.
