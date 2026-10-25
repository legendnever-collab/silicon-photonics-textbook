# Chapter 11 — 5–10분 Learning Review

실행: `dist/silicon-photonics-textbook-v0.11.0.html`을 다운로드하여 Browser로 열고 Chapter11을 선택합니다. 기존65개와 신규7개, 총72개 Lesson입니다. 기술 용어는 영어, 학습 설명은 한국어입니다.

각 Lesson에서 설명 → Guided Tutor → Physics Notebook → Prediction/Reflection 순서로 확인합니다. 아래 이름은 Notebook의 실제 Control 기준입니다. 각 Step의 Teaching Scenario를 먼저 선택하면 이전 조작의 영향을 피할 수 있습니다.

| 순서 / 시간 | 조작 | 관찰 및 학습 확인 |
|---|---|---|
|1 · 11.1 / 1분|Teaching Scenario=Reference. Channel Spacing을100→200GHz로 변경.|Frequency 간격이 커지고 Wavelength 간격도 변합니다. Frequency가 증가하면 Wavelength는 감소합니다.100GHz일 때1551.2030/1550.4008/1549.5994/1548.7988nm. Source1mW/carrier는 총4mW입니다.4×25Gb/s는 산술 예시이며 검증된 속도가 아닙니다.|
|2 · 11.2 / 1분|Reference, Ring / Mux Spectrum View에서 선택 Channel의 Bit와 Bit1 Resonance Shift를 조작.|Bit0의 이상적 공진 Through=0; FSR800GHz에서15GHz Shift이면 정규화 Through≈0.894629. Shift0이면 두 Bit 상태가 같아집니다.|
|3 · 11.3 / 1분|Teaching Scenario=FSR Alias, Architecture=Common-bus, CH1, Pattern1111에서 b4를0으로 변경. Cross-modulation Matrix 관찰.|FSR300/Spacing100GHz에서 CH1/CH4가 Alias. CH1 출력≈0.28215mW에서≈0으로 감소하며 RowCH1/ColumnMod4에 Data 의존성이 나타납니다. Nominal OMA만으로 최악 Static Opening을 판단할 수 없습니다.|
|4 · 11.4 / 1분|FSR Alias, Architecture=Mod-Mux. 같은 b4 변경 후 CH1과 CH4 비교.|Off-diagonal Cross-modulation=0이어도 CH1은 후단 Passive Add Filter 때문에≈0입니다. CH4는 밝습니다. Reference로 돌아가 Mux Layer Offset=25GHz를 비교하면 Mod-Mux에 Filter Penalty가 생깁니다. Zero Cross-modulation과 Zero Loss를 구분합니다.|
|5 · 11.5 / 1분|Drift / Mismatch Scenario, CH3, 숫자 수정에서 Common Resonance Drift=15GHz, Fixed Mismatch Pattern Scale=6GHz, Mux Layer Offset=4GHz 적용. Tune Selected Mod/Mux 실행.|Mod Tune=−17GHz, Mux Tune=−20GHz.81개 Noiseless Model Probe 결과이며 실제 Monitor 기반 Thermal Control이 아닙니다. Source Off에서는 Tune이 보류됩니다.|
|6 · 11.6 / 1분|Reference, Per-channel Power Budget에서 Output Monitor Tap=0→10%, Both-port Lateral Offset=0→1µm, Both-port Linear Polarization=0→45°를 각각 초기값으로 되돌리며 비교.|Tap10%는 출력0.9배, Monitor Current 증가. 두 Port Offset1µm는 출력exp(−0.5)배, Polarization45°는0.25배. Reference Plane별 Power를 추적하며 Network Removed Power를 전부 Heat로 해석하지 않습니다.|
|7 · 11.7 / 1–2분|Reference에서 Save Comparison → 물리 Parameter 변경 → Frozen Comparison 확인 → Save Comparison으로 재취득 → JSON Report 다운로드.|저장 직후 Current, 물리 변경 후 Stale이며 Frozen 값은 유지됩니다. 다시 Save하면 Current로 갱신됩니다. Architecture/View/Channel/Pattern만 바꾸면 두 구조·16상태가 이미 포함되어 Stale이 되지 않습니다. JSON의 Current/Frozen/Scope를 확인합니다.|

Mobile 추가 확인: 숫자 수정에서 마지막 Channel Tune 항목까지 이동하고 Apply · 적용 / Close · 돌아가기 버튼을 눌러봅니다. 그림 확대 후 Zoom/Pan과 닫기, Light/Dark, Save/Resume을 확인합니다. Learning Backup/Restore가 Notes/Tutor/Completion과 Snapshot을 복원하는지도 확인합니다. 자동 검증의 Mobile 결과는 Browser Viewport Emulation이며 실제 Android 기기 검증은 사용자 검토 항목입니다.

학습 검토 질문:
- Common-bus의 다른 Data Bit 영향과 Mod-Mux의 Passive Filter Penalty를 스스로 설명할 수 있나요?
- 동일 가정·Reference Plane에서 두 구조를 비교하고, 어떤 조건에서도 한 구조가 우월하다고 결론 내리지 않을 수 있나요?
- Optical Budget/Monitor Current와 Static Opening의 의미를 이해하고 실제 Eye/BER 검증과 구분할 수 있나요?
- 설명 → Tutor → Notebook → Prediction 흐름과 Figure/글자 크기가 실제 학습에 충분한가요?

이 모델은 독립적으로 정의한 Static Synthetic 교육 예시입니다. Measured Hardware, Time-domain Eye, BER/Signal Integrity, Thermal Controller Dynamics, Foundry Calibration, Measured Crosstalk, Full-wave EM, Packaging Reliability는 검증하지 않습니다. 원본 Chapter13 Mapping은 CH11_TEXTBOOK_SOURCE_MAPPING.md, 수식/한계는 ../notebook/CH11_MODEL_CONTRACT.md를 확인합니다.

사용자 Play Review 및 명시적 승인 전 main 병합 금지. Chapter12나 확장 Curriculum은 자동으로 시작하지 않습니다.
