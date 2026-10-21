# Chapter 3 · 사용자 학습 검토

통합 실행 파일: dist/silicon-photonics-textbook-v0.3.0.html → Chapter 3 Optical I/O. 기존 Chapter 1/2 콘텐츠와 실행 파일을 보존했습니다. 이번 번호는 앱 Chapter 3이며 원본 Chapter 5에 대응합니다.

권장 읽기: 3.1 Coupling Basics → 3.2 Grating Coupler → 3.3 Edge Coupler → 3.4 Polarization → 3.5 I/O Ledger. 원본의 큰 순서를 유지하고 수식에 필요한 Overlap 기초만 먼저 설명했습니다.

검토 항목:
1. 설명의 양과 읽기 흐름이 Chapter 1/2와 일관적인가?
2. Core 크기·MFD·정규화된 Mode Overlap·실제 Device Efficiency를 구별할 수 있는가?
3. Grating의 Period·각도·파장 관계와 F=1의 제한을 설명할 수 있는가?
4. Inverse Taper에서 Core와 Mode가 다르게 변할 수 있다는 점, 위치/각도 공차의 차이가 이해되는가?
5. 같은 성분 Power에서 Relative Phase만 바꿔 다른 Polarization을 만드는 과정을 설명할 수 있는가?
6. Total IL과 Residual Loss를 중복하지 않고 Power Ledger의 단위·감소량을 설명할 수 있는가?
7. Figure 크기·확대·Notebook 연결·Mobile에서 조작 후 결과 읽기에 불편한 곳은 어디인가?

E0/E1/E2는 당시 부분 구현을 보존한 개발 Snapshot입니다. 최종 학습에는 E3/최신 통합 HTML을 사용해 주세요. 기록은 새 v3 저장소로 이어받으며 이전 v2/Ch1 값을 덮어쓰지 않습니다. Browser의 file:// 저장 영역이 다르면 기존 HTML에서 Backup을 내보내고 새 통합 HTML에서 Restore하면 됩니다.

이번 작업은 학습 검토에서 멈춥니다. 원본 다음 Active Components는 후속 개발이며 이번 HTML에 PN Phase Shifter 코드는 없습니다.

Release review 후 추가 확인: Lesson 3.4에서 χ=0°와 ±180°인 Linear State의 서로 다른 Malus 식을 비교해 주세요. Lesson 3.5에서 0 dBm 입력−2.6 dB 손실=−2.6 dBm=0.549541 mW를 설명하고, 0 mW의 −∞ dBm과 실제 측정 한계를 구별해 주세요. 최신 통합 HTML은 E3 Snapshot 이후의 최소 보완을 포함합니다. 원래 E3 HTML은 보존했습니다.
