# v0.12.5 · 전체79 Lesson Workspace 검토

모든12 Chapter /79 Lesson에서 기존 교재 → Guided Tutor → Physics Notebook → Prediction/Reflection 흐름을 유지합니다. U1의 고정 그래프·KPI·독립 스크롤·크기 조절·실험 확대에 U2 안내/비교와 U3 학습 메모 연결을 적용했습니다.

1. 해당 Lesson의 **핵심 Parameter**를 확인합니다. 위의 모델 연결 설명은 실제 모델의 가정과 단위를 따릅니다. 전체 Parameter·원래 결과·Model Scope·Properties·Reports는 계속 아래에서 접근합니다.
2. 원할 때 **실험 옆에서 쓰기**를 열어 기존 Prediction·이유·관찰 후 설명·Reflection을 입력합니다. 실제 입력 노드가 이동하며 닫으면 교재로 돌아갑니다. 입력은 선택이고 자동 채점하지 않습니다.
3. **UI 기준 저장** 또는 원래 **Capture / Save Comparison**으로 기준을 명시적으로 저장합니다. Parameter 하나를 바꾸고 점선 강조와 변경 조건을 확인합니다. Theme·View·확대·메모만으로 Frozen을 새로 취득하지 않습니다.
4. 기존 세 Pilot(1.4/12.2/12.5)은 검증된 Overlay와 공통 Auto/Fixed 축을 유지합니다. 나머지 Lesson은 **기준 / 현재 · 원래 그래프와 Readout**을 열어 나란히 봅니다. 각 그림의 축은 독립적입니다. View/Model이 다르면 Δ를 보류하며, 수치 Δ는 같은 표현·단위의 원래 표시값 차이입니다. `null/withheld`는0이 아닙니다.
5. 다른 Lesson을 방문하거나 다시 열면 **다시 떠올리기 · 선택 사항**을 열 수 있습니다. 기존 예측 질문을 먼저 생각한 뒤 메모를 엽니다. 점수·Gate·알림은 없습니다. 기존 결과 연결 버튼은 준비된 Lesson 설명이며 개인 답안의 정답 판정이 아닙니다.

| 기준 Source | 동작과 저장 범위 |
| --- | --- |
| Chapter1–9 | 별도 UI Reference. 학습 기록 JSON에는 포함되지 않습니다. |
| Chapter10 비 Sweep View | UI Reference로 구조/정렬/독립 전기 예제를 비교합니다. 원래 Frozen Sweep은 별도입니다. 전기 설정을 Sweep Capture 값이라고 표시하지 않습니다. |
| Chapter10 Sweep/Budget View | 원래 Acquire Synthetic Sweep과 Capture Keys를 재사용합니다. 기존 Capture 보류 조건을 유지합니다. |
| Chapter11 | 원래 Frozen의 Physical Keys를 사용합니다. 두 Architecture/16상태 비교 범위 안에서 현재 Architecture·Channel·Pattern을 공유해 관찰합니다. |
| Chapter12 | 원래 Physical/Evidence Frozen과 Backup을 사용합니다. 현재 View는 공유합니다. |
| Prediction / 세 메모 | 기존 학습 기록·Backup/Restore 그대로입니다. UI 방문 여부만 별도입니다. |

검토 예: 2.5 Ring→Bragg 전환, 6.2 Threshold→L–I, 7.4 MZI→Synthetic Fit에서 모델 구분을 확인하세요. 8.4/8.5에서는 원래 Layout 선택·Properties·Netlist가 정상인지 확인하세요. 10.3의 UI 전기 기준과 10.6의 Frozen Sweep을 구별하고,11.7·12.6의 Frozen을 유지한 채 메모·Backup/Restore를 확인하세요.

자동 검증은 UI와 Physics/기록 보존을 확인합니다. 학습 향상은 측정하지 않았습니다. Mobile은 Viewport Emulation이며 실제 Android IME·Touch·시스템 Back은 기기 확인이 필요합니다. 좁은 그래프는 원래처럼 내부 Pan/Scroll합니다. PR14→15→U4 순서의 Draft 검토판이며 main 병합은 사용자 검토 후 진행합니다.
