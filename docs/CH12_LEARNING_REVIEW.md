# Chapter12 — 5–10분 Learning Review

`dist/silicon-photonics-textbook-v0.12.0.html`을 Browser로 열고 Chapter12를 선택하세요. 총79개 Lesson입니다. Chapter12는 Extension Curriculum E1 / Independent Teaching Supplement이며 원본 교재의 Chapter14가 아닙니다. 각 Lesson은 설명→Guided Tutor→Physics Notebook→Prediction/Reflection 순서입니다.

|시간 / Lesson|조작|예상 현상과 설명할 질문|
|---|---|---|
|1분 ·12.1|Filter Mode=Ideal Bypass, Bit Rate25→50Gb/s; Pattern0101→0011|UI40→20ps. 같은 비율의 P0/P1 평균 Power는 같지만 Transition 간격은 다릅니다. 지원 속도 보증이 아닙니다.|
|1분 ·12.2|Both Poles, Pattern0101. Tx Bandwidth20→3GHz 후 복원; Rx15→3GHz|낮은 Bandwidth에서 Settling이 느려지고 이전 Bit 영향이 남습니다. Long Run과 비교하세요. Tx intensity/Rx current 두 위치를 구별합니다.|
|1분 ·12.3|Actual2-UI Eye View. Sampling Phase0.7→0.1→0.9UI|실제 파형에서 Sample Marker가 이동합니다. 낮은 Bandwidth·이른 Phase에서는 음의 Signed Opening도 유지됩니다. Bit Label을 지연 보정하지 않습니다.|
|1분 ·12.4|Power/Current Ledger. Loss6→9dB, 복원 후 Quantum Efficiency0.8→0.4|Loss3dB 증가는 Rx Power·Photocurrent를 약0.501배로 줄입니다. QE는 Optical Power를 바꾸지 않고 Current만 절반으로 줄입니다. Dark DC는 한 번 포함됩니다.|
|1분 ·12.5|Shot/Thermal 각각 On/Off; Rx Bandwidth15→3GHz; Seed42→43|Noise Sigma와 Signal Settling이 함께 바뀝니다. 같은 Named Pattern에서 Seed만 바꾸면 Continuous Eye는 같고 Sample Scatter가 바뀝니다. Ideal Rx에서는 finite ENBW가 없어 Noise Disabled입니다.|
|1분 ·12.6|Threshold를 낮추고 높이기; Seed 변경; Noise Off|Actual Noisy Samples와 Threshold로 Error 위치를 표시합니다. Observed Count와 Gaussian Expected Error는 다릅니다.0/N은 BER=0 또는 검증된 BER<1/N이 아닙니다. ISI/zero sigma에서 Q는 이유와 함께 Withheld입니다. Rate=1Gb/s, Tx/Rx=200GHz와 Noise On에서는 Steady-level Q 예제를 볼 수 있습니다.|
|1–2분 ·12.7|Save Comparison→Rate/Phase/Threshold/Seed 변경→Frozen 확인→JSON Report→Save Comparison 재취득|이전 Samples/조건은 유지되고 Stale이 됩니다. View/Theme/Zoom은 Evidence를 바꾸지 않습니다. Report의 Source Hash/Manifest, Settings, dt/Warm-up, Current/Frozen/Scope를 비교하세요.|

Mobile 추가 확인: 숫자 수정의 마지막 항목까지 이동한 후 항상 보이는 Apply/Close, P1≥P0 검증, 그림 확대·Pan·닫기와 Focus 복귀, Light/Dark, 학습 기록 Backup/Restore를 확인하세요. Backup은 Notes/Tutor/Completion과 Frozen Settings를 함께 복원합니다. Report는 학습 Backup과 다른 물리 증거입니다.

학습 후 스스로 설명해 보세요: 같은 평균 Power라도 Bandwidth·Pattern·Sampling 때문에 결과가 달라지는 이유, Rx3-dB Bandwidth와 ENBW의 차이, Optical Intensity와 음수가 가능한 Noisy Electrical Sample의 차이, Continuous Deterministic Eye와 Decision-sample Noise의 범위, Observed/Expected/Q의 구분.

독립 교육 모델입니다. Actual Hardware/IEEE 적합성/Device Calibration/실제 Android 기기/상용 Simulator와 수치 동등성/Low BER은 자동 검증으로 확인하지 않습니다. 실제 기기 조작성과 학습 효과는 사용자 검토 대상입니다. 승인 전 main 병합 금지; 다음 Chapter를 자동 시작하지 않습니다.
