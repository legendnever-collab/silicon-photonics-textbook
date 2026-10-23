# Textbook Source Mapping · v0.2.0

확인일: 2026-10-21 KST. 개발 전 D0에서 작성.

주 교재: Lukas Chrostowski & Michael Hochberg, *Silicon Photonics Design: From Devices to Systems*, Cambridge University Press, 2015, ISBN 9781107085459. 원본 Chapter 4 **Fundamental Building Blocks**, pp.92–161.

확인 근거: [출판사 공식 목차](https://assets.cambridge.org/97811070/85459/toc/9781107085459_toc.pdf), 인쇄 목차 vii–viii(PDF 3–4쪽), [Chapter 서지](https://doi.org/10.1017/CBO9781316084168.005). 목차의 Section 번호·시작 페이지·순서를 확인했다. 유료 본문 전체와 원본 Equation/Figure는 확보하지 않았으므로 문장별 대조나 원본 실험 수치 재현을 주장하지 않는다. 아래 세부 항목은 목차의 한국어 요약이며 새 본문·예제·SVG·모델은 독자 작성한다. 앱 Chapter 2는 원본 Chapter 2가 아니라 원본 Chapter 4에 대응한다.

## 원본 순서 및 세부 Section 대응

| 원본 Section / 시작 쪽 | 목차 세부 항목의 요약 | 이번 학습 위치 / 수준 | 재배치·축소 이유 및 후속 위치 |
|---|---|---|---|
| 4.1 / 92 | Directional couplers | 2.2 첫 부분 · CMT 해석 | 2.1에서 Power/Field 정규화만 선행하여 식의 의미를 준비 |
| 4.1.1 / 93 | Mode Solver 접근; Gap(94), Length(95), Wavelength(95) 의존 | 2.2 · Supermode 분리와 κ=(βeven−βodd)/2; Length 정량 | Gap/λ→κ는 임의 곡선으로 대체하지 않음; 후속 Passive Advanced §DC-Geometry에서 수렴한 Mode Solver/PDK 필요 |
| 4.1.2 / 96 | Phase | 2.2 · Cross Port의 ±i; 2.3에서 경로 Phase 확장 | Coupler Phase를 먼저 설명하고 MZI 직전 전파 Phase 복습 |
| 4.1.3 / 99 | 실험 데이터 | 2.2 · 측정과 이상 모델의 차이 | 원본 측정 재현 생략; 후속 Passive Advanced §DC-Measurement에서 실측 S-parameter 비교 |
| 4.1.4 / 102 | FDTD; Mode Solver와 비교 | 2.2 · 방법/가정 설명 | 새 Full-wave Solver 생략; 후속 Passive Advanced §DC-Convergence |
| 4.1.5 / 103 | 공정 민감도 | 2.2 · Gap/Width 변화가 κ/Δβ에 미치는 영향 | 수율 수치 생성 안 함; 후속 Passive Advanced §DC-Corners |
| 4.1.6 / 105 | Strip 구현 | 2.2 · 실제 단면과 이상 2-mode의 차이 | Ch1 Mode와 연결; 후속 DC-Geometry에서 Vector Mode |
| 4.1.7 / 106 | 기생 결합; Δβ coupling(108) | 2.2 · Mismatch 해석식/잔류 Coupling | Notebook은 phase-matched 기본; 후속 Passive Advanced §DC-Mismatch에서 Geometry 연동 |
| 4.2 / 110 | Y-branch | 2.2 DC 다음 · 구조, 대칭 Mode 분기, 역방향 합성 한계 | 누락하지 않음. 이상 1→2 전력만 정량; 후속 Passive Advanced §Y-Junction에서 Tip/방사/제조 |
| 4.3 / 113 | Mach–Zehnder interferometer | 2.4 · Complex Field, 두 출력, ER | 2.3은 선수 Phase 복습; 후속 Passive Advanced §MZI-Spectrum에서 분산 측정 |
| 4.4 / 115 | Ring resonators | 2.5A · MZI 다음, 재순환과 Resonance | 누락하지 않음; Exercise 전에 교재 순서로 학습 |
| 4.4.1 / 115 | Optical transfer function | 2.5A · All-pass 복소 전달함수, Critical Coupling, ng/FSR | Add-drop/Q 추출은 후속 Passive Advanced §Ring-Filters |
| 4.4.2 / 117 | 실험 결과 | 2.5A · Loss·Coupling 추출의 필요성 | 원본 실험 복제 없음; 후속 Ring-Filters에서 측정 Spectrum 비교 |
| 4.5 / 117 | Waveguide Bragg grating filters | 2.5B · Ring 다음, 전후진 결합 | 누락하지 않음; 외부 입출력 Grating Coupler와 구별 |
| 4.5.1 / 117 | 이론; Grating κ(120) | 2.5B · Bragg 조건, 균일 격자 CMT, R/T | κ는 가정한 입력이며 Corrugation→κ 공정 예측 아님 |
| 4.5.2 / 120 | 설계; TMM(121), 구조(123), FDTD(125) | 2.5B · TMM의 구간 연결 개념 | 검증한 균일 CMT만 정량; 후속 Passive Advanced §Grating-TMM에서 Apodization/실제 구조 |
| 4.5.3 / 126 | 실험; Strip(127), Rib(128), Period(129) | 2.5B · Period로 반사 중심 설계, 구현 차이 | 실험 수치 생략; 후속 Grating-TMM에서 제작·측정 비교 |
| 4.5.4 / 130 | 제작 경험식; Lithography(134), 제조 고려(136) | 2.5B · 이상 형상과 제작 형상 차이 | 보정 데이터 없음; 후속 Passive Advanced §Grating-Fabrication |
| 4.5.5 / 137 | Spiral; 온도 민감도(138) | 2.5B 심화 읽기 · Footprint/온도 | 별도 수치 모델 생략; 후속 Grating-Fabrication |
| 4.5.6 / 138 | Phase-shifted | 2.5B 심화 읽기 · Stopband 내 결함 Resonance | 후속 Grating-TMM에서 결함 행렬 계산 |
| 4.5.7 / 140 | Multi-period | 2.5B 심화 읽기 · 다중 반사 대역 | 후속 Grating-TMM에서 다중 주기 |
| 4.5.8 / 141 | Grating-assisted contra-directional coupler | 2.5B 심화 읽기 · 서로 다른 Guide의 후진 결합 | 후속 Grating-TMM에서 4-port 모델 |
| 4.6 / 143 | Problems | 2.1–2.5 Worked Examples/Tutor, 2.5C 실습 | 원문 문제 복제 없이 학습 목표를 적용한 새 문제 |
| 4.7 / 144 | Code listings | 공통 notebook/ch2-models.js 및 테스트 | 상용 도구 Listing 복제 생략; 실행 가능한 해석 모델로 대체 |
| References / 159 | 참고 문헌 | Lesson 출처 및 본 문서 | 확인한 1차 자료만 근거로 사용 |

## 추가와 읽기 순서

기본 흐름: 2.1 Power/Field 선수 개념 → 2.2 DC → Y-branch → MMI 보충 → 2.3 Path Phase 선수 개념 → 2.4 MZI → 2.5A Ring → 2.5B Bragg → 2.5C Passive PIC 종합 실습.

MMI는 공식 Chapter 4 목차의 독립 Section이 아니다. 사용자가 요구한 비교 학습을 위해 2.2 말미에 추가한다. Self-imaging은 Conceptual이며 Full-wave 결과로 표시하지 않는다. 참고: Soldano & Pennings, “Optical multi-mode interference devices based on self-imaging”, JLT 13, 615–627 (1995), DOI 10.1109/50.372474. Coupler를 이해한 뒤 다른 분배 원리를 비교하는 교육적 확장이다.

원본의 DC→Y→MZI→Ring→Bragg 순서는 유지한다. 위 Passive Advanced 명칭은 후속 학습 위치의 예약이며 이번 릴리스의 완성 콘텐츠가 아니다. 이번 Chapter에서 모든 핵심 소자의 개념·기초 식·예제를 제공하되, 확인하지 못한 제작·실험·고급 Numerical 내용을 완성했다고 표시하지 않는다. Active Modulation 및 Chapter 3는 시작하지 않는다.

# Chapter 3 mapping · v0.3.0 · Optical I/O

Verified 2026-10-21, before Chapter 3 implementation. User chose **original sequence** explicitly. Official Cambridge Contents (same PDF above, printed viii) places Optical I/O after Fundamental Building Blocks and before Active Components. App Chapter 3 therefore maps to original Chapter 5, pp.162–214. Earlier PN Phase Shifter preview is superseded by this user choice; active devices follow I/O in a future chapter. Full paid chapter text/figures were not acquired; the following headings/pages are verified from official contents. New prose, worked examples and diagrams are independently authored.

| Original section / start page | Detailed contents (paraphrased) | App location / treatment | Reason and follow-up |
|---|---|---|---|
| 5.1 / 162 | Fiber–chip coupling challenge | 3.1 Mode size, spatial/phase overlap and loss | Scalar Gaussian is a declared teaching profile, not a solved silicon Mode |
| 5.2 / 163 | Grating coupler | 3.2 surface access and radiation phase matching | Preserve original order; distinguish Ch2 reflective Bragg |
| 5.2.1 / 164 | Performance | 3.2 efficiency, bandwidth, directionality, return loss | Definitions; no assumed measured device values |
| 5.2.2 / 165 | Theory | 3.2 k matching and finite array sum | Analytical phase condition and normalized coherent array only |
| 5.2.3 / 168 | Design methodology | 3.2 ordered design workflow | Avoid a fake geometry-to-efficiency fit |
| 169–173 | Analytic design, 2D FDTD, results, design parameters | 3.2 period example, method comparison | FDTD results not fabricated; I/O Advanced §GC-Vector-Solver for mesh/port convergence and spectral extraction |
| 177 | Cladding / buried oxide | 3.2 upward/downward channels and substrate interference | Qualitative; I/O Advanced §GC-Stack for stack-calibrated field model |
| 179–181 | Focusing geometry, mask layout, 3D modelling | 3.2 focusing/taper and fabrication notes | Conceptual; I/O Advanced §GC-3D-Layout for transverse focusing/actual GDS and fabrication rules |
| 5.2.4 / 181 | Experimental results | 3.2 measurement/de-embedding notes | No original measurements reproduced; I/O Advanced §GC-Measurement |
| 5.3 / 182 | Edge coupler | 3.3 facet mode matching | Original order retained |
| 5.3.1 / 183 | Nano-taper; overlap calculation; FDTD approach (187) | 3.3 inverse taper concept; Gaussian mismatch/offset/tilt; overlap limits | No tip-width→Mode-size shortcut; I/O Advanced §Edge-EME-FDTD for vector eigenmodes and adiabatic propagation |
| 5.3.2 / 189 | Overlay waveguide and EME | 3.3 overlay concept / local modes / EME | Conceptual architecture; I/O Advanced §Edge-Overlay for validated 3D transfer |
| 5.4 / 190 | Polarization | 3.4 Jones states, projection, PDL and diversity | Scalar spatial and Jones polarization assumptions separated |
| 5.5 / 193 | Problems | 3.1–3.5 independent worked examples/Tutor; 3.5 ledger | Newly written exercises; no copyrighted problem reproduction |
| 5.6 / 193 | Code listings | notebook/ch3-models.js + independent numerical checks | Offline analytical teaching models instead of copied commercial scripts |
| References / 211 | References | Lesson sources and contract | First-party documentation and research papers, no unverified page quotations |

Added scaffolding: normalized overlap integral is introduced in 3.1 before the original edge-coupler overlap detail, so students can distinguish overlap and total coupling before comparing interfaces. A small-angle same-plane Gaussian tilt factor extends this bridge. Polarization is only named as an assumption until 3.4, where the original order is preserved. 3.5 is a new synthesis exercise using independent input factors, not an additional original textbook section. No original principal component is skipped. Advanced labels above reserve future learning locations; they are not implemented content.

Primary supporting sources checked: Ansys "Understanding the mode overlap calculation" (https://optics.ansys.com/hc/en-us/articles/360034396834-Understanding-the-mode-overlap-calculation), Ansys "Overlap analysis – Modal Analysis Tab" (https://optics.ansys.com/hc/en-us/articles/360034917453-Overlap-analysis-Modal-Analysis-Tab), Flexcompute "Mode overlap integral between a waveguide mode and a Gaussian mode" (https://www.flexcompute.com/tidy3d/examples/notebooks/ModeOverlap/), Hadden et al. arXiv:2207.06157 (grating phase-matching convention only; its GaN geometry/performance is not imported). Source formulas are re-derived and examples are original assumptions. Real Vector/Fresnel/EME/FDTD results are outside this release.

## Chapter6 — Lasers
See [CH6_TEXTBOOK_SOURCE_MAPPING.md](docs/CH6_TEXTBOOK_SOURCE_MAPPING.md) for original8.1–8.7 mapping and access limits.

## Chapter 7 — Photonic Circuit Modelling
Original Chapter9 pp313–348. Official section-by-section mapping and access limits: [CH7_TEXTBOOK_SOURCE_MAPPING.md](docs/CH7_TEXTBOOK_SOURCE_MAPPING.md). Original seven-lesson content follows9.1→9.6;7.7 is an educational synthesis. No full-text/figure/listing access or reproduction.

## Chapter 8 — Tools and techniques
Original Chapter10 pp349–366: [mapping](docs/CH8_TEXTBOOK_SOURCE_MAPPING.md). Full text not accessed.


## App Chapter9 — Original Chapter11 Fabrication

Original11.1(non-uniformity368),11.1.1(contours369),11.1.2(corner370),11.1.3(on-chip experimental results372;ring373;grating377),11.2(problems379) map to app9.1–9.7. Official contents verified; full chapter and measurements not accessed/reproduced. Independent explanations, worked examples, SVG and declared teaching models. Detailed coverage/limits: `docs/CH9_TEXTBOOK_SOURCE_MAPPING.md`. Next appChapter10 maps originalChapter12 Testing and packaging381. Chapter9 is a separately reviewed feature depending on unmerged Chapter8.


## App Chapter10 — Original Chapter12 Testing and packaging

Original12.1optical/electrical interfaces381–388,12.2station/parts/software/registration/testing/equipment389–397,12.3DFT/power/layout/review398–404 map to8app lessons10.1–10.8. All optical interface types and pads/probing/wire bond/flip-chip are covered conceptually; Gaussian alignment is introduced early as a prerequisite and revisited with registration. Independent synthetic examples, not original measured data or paid-text replication. Detailed mapping/deferrals: `docs/CH10_TEXTBOOK_SOURCE_MAPPING.md`; formula/units/scope: `notebook/CH10_MODEL_CONTRACT.md`. Next appChapter11 maps originalChapter13System Example406–412; no automatic development.
