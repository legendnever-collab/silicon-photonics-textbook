# Source mapping · Chapter 1

확인일: 2026-10-20. 원문 교재 PDF는 Library 검색에서 확보하지 못했다. Cambridge의 서지와 공개 자료만 확인했다. 아래 Lesson 번호는 **이 프로젝트의 번호**이며 원서의 페이지/Section을 뜻하지 않는다. 본문·SVG·Worked Example·Tutor는 새로 작성했으며 원서 그림/표/PDF를 Repository에 넣지 않는다.

| ID | 확인한 출처 | 사용하는 범위 | 확인 상태 / 한계 |
|---|---|---|---|
| R0 | Chrostowski & Hochberg, *Silicon Photonics Design: From Devices to Systems*, Cambridge, 2015. https://www.cambridge.org/core/books/silicon-photonics-design/BF3CF13E8542BCE67FD2BBC7104ECEAB | 프로젝트의 주 참고 교재와 장기 학습 방향 | 출판사 서지 확인. 원문 PDF/특정 페이지 미확인. 직접 인용 없음 |
| R1 | MIT, Haus & Melcher, *Electromagnetic Fields and Energy*, 13.5. https://web.mit.edu/6.013_book/www/chapter13/13.5.html | 1.1–1.4 Slab의 경계조건, 감쇠 외부 해, even/odd Mode, Cutoff | 공개 강의 교재 확인. 축과 기호를 이 프로젝트의 x/y/z로 재정의 |
| R2 | MIT OCW 6.013, Lecture 15 – Dielectric Waveguides. https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec15/ | 1.1–1.2 유전체 Guiding과 TE/TM | 공개 강의자료 안내 확인. 정확한 Page 인용 없음 |
| R3 | Ansys, FDE solver analysis – Mode List and Deck. https://optics.ansys.com/hc/en-us/articles/360034396734-FDE-solver-analysis-Mode-List-and-Deck | 1.2–1.3 n_eff=β/k₀, Modal Polarization, Loss 단위 | 공식 문서 확인. 이 제품에서 Ansys Solver를 실행했다는 뜻이 아님 |
| R4 | RP Photonics Encyclopedia, article on “Effective Refractive Index”, Dr. Rüdiger Paschotta, https://www.rp-photonics.com/effective_refractive_index.html | 1.3 Modal Index와 단순 가중평균의 차이, Phase/Group 구별 | 저자의 기술 설명 확인. 문장/그림 복제 없음 |
| R5 | RP Photonics Encyclopedia, article on “Propagation Losses”, Dr. Rüdiger Paschotta, https://www.rp-photonics.com/propagation_losses.html | 1.5 Power Attenuation, dB 단위 | 기술 설명 확인. 예제 수치는 이 프로젝트가 가정 |
| R6 | RP Photonics Encyclopedia, article on “Bend Losses”, Dr. Rüdiger Paschotta, https://www.rp-photonics.com/bend_losses.html | 1.5 Curvature와 Radiation의 정성적 관계 | 실제 Silicon Strip의 Radius별 Loss를 이 출처에서 가져오지 않음 |

## Original calculations
Snell’s Law Example, Phase Example, Slab root equation, TE Power Fraction 적분과 dB Ledger를 명시적인 가정에서 직접 계산한다. nSi=3.48, nSiO2=1.444는 1550nm 부근의 교육용 고정값이며 실측/분산식 fitting 결과가 아니다. Width, λ와 n 이외에 실제 Strip Height를 넣는 대체식을 만들지 않는다. Bisection/경계 연속/독립 Finite Difference 검증 범위는 QA 보고서에 기록한다.

## v0.1.1 Figure upgrade additions
- R7: University of Illinois, Photonic Devices Research Group, “Finite Difference Method for Modesolving”, https://vcsel.mntl.illinois.edu/research/fdm/ (accessed 2026-10-21). Supports the Helmholtz-to-finite-grid eigenproblem formulation. The scalar implementation and validation scripts here are independently authored; no external solver code is copied.
- R3 was rechecked for β/k₀ and the distinction between modal polarization definitions. No Ansys solver was run.
- Four user-supplied Figure references were inspected for pedagogy (field map / slab k-vector / transverse mode / bend comparison); screenshots are not republished and no reference-image number is used as simulation input.
