# Chapter 7 Learning Review

실행 파일: dist/silicon-photonics-textbook-v0.7.0.html. 외부 Font·Script·API 없이 단일 HTML을 Browser에서 엽니다. Chapter7 메뉴를 선택합니다. 이전 Chapter1–6과 보존된 실행 HTML도 유지합니다.

검토 순서:
1.7.1–7.3: 본문→Worked Example→Tutor. Port/Mode/Reference Plane, sqrt(W), Field와 Power를 구별합니다. Phase와 기준면 Shift를 독립적으로 관찰합니다.
2.7.4: MZI에서 δ0→π의 두 출력 교환과 Arm Loss를 관찰합니다. Notebook의 모델 선택을 Synthetic Fit으로 바꾸고1555→1565nm에서 Domain/Error/σ_max/보정 오차를 비교합니다. B의 Coherent 입력 반례를 설명합니다.
3.7.5: K=.1,Round-trip Loss≈.4576dB,θ0에서 Critical Coupling; Loss0과 K0 경계를 비교합니다. Spectrum 상세에서 Magnitude/Phase와 Resonance Marker를 확인합니다.
4.7.6: Peak Efficiency·Length·Propagation Loss를 각각 바꿉니다. 합성 Length Sweep의 Slope/Intercept와 단일 측정의 비유일성을 설명합니다.
5.7.7: Source1mW,GC.5,K.5,δ≈1.5708rad,QE.8에서 Upper/Lower≈.125mW,Upper Current≈125.016µA를 확인합니다. 모든 Loss와 두 출력을 포함한 Ledger를 읽습니다.

Light/Dark,Figure 확대/Escape,Keyboard Slider와 학습 기록 JSON 내보내기/가져오기를 검토하세요. Save는 같은 Browser/Origin 기준이며 파일 이동 시 JSON으로 이전합니다.

적용 범위: Single coherent TE mode, Static Optical Response, ideal matched coupler, independent phase/loss, synthetic fit/cutback, detector primary current. Full textbook body/figures/listings not accessed. FDTD/PDK/measurement/EO dynamics/BER or calibrated voltage response not claimed. Mobile verification is viewport emulation, not a physical phone. 자동 테스트 통과와 실제 학습 효과 검토는 구분합니다.

PR7은 Draft입니다. 사용자 학습 검토와 별도 승인 전 main 병합 금지. Chapter8 자동 시작 금지.

검증 완료:140Node테스트,독립계산110비교,새통합Browser67시나리오와과거실행파일177시나리오 PASS.8화면MatrixScreenshot을직접확인했습니다. Mobile은Emulation입니다. Notebook의작은Port/축Label은‘회로그림확대’로읽을수있습니다. 전체증거는CH7_QA_REPORT.md와ReleaseCheckpoint를참조하세요.
