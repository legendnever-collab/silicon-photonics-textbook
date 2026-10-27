# U2 Pilot · v0.12.3 검토

실행 파일: `silicon-photonics-textbook-v0.12.3.html`. U1의 고정 그래프·독립 스크롤은 79개 Lesson 전체에 유지합니다. U2는 1.4 / 12.2 / 12.5만 적용했습니다. 기존 본문·Tutor·Prediction/Reflection·Physics를 그대로 사용합니다.

1. **1.4 Width & Mode:** 기준 저장 → Width 변경. 기준 점선과 현재 실선의 Field를 같은 x축에서 비교합니다. 핵심 Parameter와 관련 수식 항에 변경 표시가 나타납니다. 수치와 축을 열어 n_eff / Core Power / Mode 수의 차이를 봅니다. 각 Field는 독립 정규화되며 실제 TE Mode와 Cutoff에 따른 유효 Mode 선택이 표시됩니다.
2. **12.2 Bandwidth / ISI:** 기준 저장 → Tx Bandwidth 하나를 줄여 Time Waveform을 비교합니다. Rx도 별도로 바꾸고 Eye를 확인합니다. Time Waveform은 공통 ps축, Eye는 0–2UI축입니다. Eye의 선은 Deterministic Trace이고, 사각형/원은 Reference/Current의 실제 Decision Samples(각 최대128개)입니다. Rate 변경 시 두 조건의 실제 UI 길이는 비교 표에 나옵니다.
3. **12.5 Receiver Noise:** 기존 Shot/Thermal 설정을 확인하고 기준 저장 → Rx Bandwidth 또는 Thermal Noise Density를 바꿉니다. Histogram은 실제 Seeded Decision Samples를 공통 Current bin으로 다시 묶은 Count입니다. Tested Bits가 다르면 Count도 영향을 받습니다. Deterministic Eye를 Continuous Noisy Waveform으로 해석하지 않습니다.
4. **Auto / Fixed:** Auto는 두 조건을 포함하는 공통 범위, Fixed는 기준 범위입니다. Fixed에서 잘린 Plot Point와 범위 밖 Histogram Sample 수를 표시합니다. 다른 View는 원래 그래프와 비교 표를 유지하며 의미가 다른 곡선을 강제로 겹치지 않습니다.
5. **기록과 복귀:** Chapter12의 기준 저장은 기존 Save Comparison과 같은 Frozen 재취득입니다. 다시 누르면 이전 Frozen을 교체합니다. View·축·Theme·Resize·확대/복귀는 재취득하지 않습니다. 기존 JSON Report와 학습 기록 Backup에 같은 Frozen이 포함됩니다. Chapter1 기준은 별도 UI 저장으로, 기존 학습 Backup에는 포함되지 않습니다.

좁은 화면의 그래프는 읽을 수 있는 크기를 유지하므로 안쪽 Pan이 필요할 수 있습니다. Mobile의 숫자 수정 Apply/Close, 실제 Keyboard/IME·가로 전환·시스템 Back·Touch는 실기기 검토 항목입니다. 자동 검증은 Viewport Emulation입니다. UI 조작성 검사가 실제 학습 향상률을 증명하지 않습니다.

다음은 U2 Pilot 사용자 검토입니다. U3의 실험 가까운 Prediction/Reflection 배치나 U2 전체79Lesson 확대, 새 Chapter, 별도 Browser 창은 이번 범위가 아닙니다. 명시적 사용자 승인 전 main에 병합하지 않습니다.
