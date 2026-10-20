# Chapter 2 Release Candidate · QA Report

검증일: 2026-10-21 KST. PR #2는 Chapter 1 PR #1 위의 Stacked Draft이며 main/Chapter 1 Branch는 변경하지 않습니다.

## 범위와 학습 결과

| Lesson | 구현 내용 | 상태 |
|---|---|---|
| 2.1 | Power/Field, 1×2와 2×2 구별, 분배/Excess Loss, Worked Example/Tutor | 완료 |
| 2.2 | DC CMT, Matrix Phase, Mismatch 설명, Y-branch 대칭/역방향 한계, Conceptual MMI | 완료 |
| 2.3 | β/OPL/Relative Phase, 같은/다른 Index 예제, 결합 전 Power 구분 | 완료 |
| 2.4 | U†DU MZI, Field 합, 두 Port Transfer, Phasor, ER, Group Index/FSR | 완료 |
| 2.5 | Ring→Bragg→Passive PIC, 각 해석 모델·예제, 제작/심화 안내와 Power/Phase Ledger | 완료 |

모든 Lesson은 기존 A–F 교재 구조, 충분한 본문, Worked Examples, Offline Guided Tutor(오개념 2개 이상), Prediction/Reflection을 갖습니다. Chapter 1의 본문/Tutor/기존 물리 모델/기존 Figure Catalog와 Numerical Data는 바이트 단위로 보존했습니다. 기존 Figure Renderer에는 등록 Hook과 선택적 Notebook Scene만 추가했습니다.

## 검증 결과

- `npm test`: **41 PASS** = 기존 21 + 신규 Physics 12 + Ch2 Content/Build 8.
- 기존 Chapter 1 Browser 시나리오를 통합 HTML에 실행: **32 PASS** (기본 15 + Figure 17).
- Chapter 2 Browser: **15 PASS**. 1440×900, 1366×768, 390×844, 320×740 × Light/Dark.
- Offline의 Runtime Error / Console Error / HTTP(S) Request: 모두 **0**.
- Keyboard Slider Focus, Figure Zoom/Escape/Focus 복원, Tutor Feedback, Chapter 탐색, Save/Resume, Backup/Restore, 기존 기록 read-only Migration, 범위 밖 Backup Parameter Clamp와 잘못된 JSON 보호 확인.
- Ring/Bragg/Circuit의 설정은 각자 유지되고 본문 Figure와 같은 Model Output을 사용합니다. 읽는 Figure에 따라 관련 Notebook으로 연결되며 탭 직접 선택도 가능합니다.
- Source 목록을 정렬·Hash하여 통합 HTML에 Source Hash를 포함합니다. 재빌드에서 동일 HTML SHA256을 확인했습니다. 최종 값은 dist/CH2_SHA256SUMS.txt 및 CH2_RELEASE_CHECKPOINT.json 참조.
- Chapter 1 standalone SHA256은 기존 `35d44b6e612e16633d819aaba2a1b0372d5c96e1b16ffeb1553cb89320f17da1`과 같습니다.
- 통합 font는 한글 517개 음절의 포함을 검사해 누락 0. 기존 Ch1 subset 파일을 덮어쓰지 않았습니다.
- 기존 원본 standalone Browser 32개도 D0/D1 복구 시 별도로 PASS했습니다. Repository에 Actions Workflow가 없어 GitHub CI Run은 없습니다. 위 수치는 로컬 검증 결과입니다.

## Physics 근거

1. **Splitter:** 여러 r/EL에서 P1+P2+Loss=Pin, |a|²=P, 50:50 진폭=1/√2 검증.
2. **DC:** κ=0, π/(4κ), π/(2κ), π/κ, Through/Cross 보존, Cross의 i Phase, Δβ 불일치 최대 전달 제한 검증. κ 단위 rad/µm.
3. **Phase:** nm→µm, β=2πneff/λ, 길이/Index 차이, 2π 주기 검증. 단독 Arm의 Field Phase는 Power를 바꾸지 않음.
4. **MZI/Circuit:** 별도의 Complex Matrix 곱셈으로 U†DU와 구현 비교. Δφ=0/π/2/π의 Port Power, r 불균형의 ER, dB/cm→Field 감쇠, 두 출력+Loss 보존 검증.
5. **Ring:** t=a<1 Critical Coupling, a=1 All-pass, t=1 분리 한계, 2π 주기, 독립 ng의 FSR 단위 검증.
6. **Bragg:** δ=0의 tanh²/sech², κ=0/L=0, |δ|=κ의 연속 한계, 실수/허수 s 영역 R+T=1. 독립 RK4(2000 Step)로 전후진 Transfer ODE를 적분해 R/T를 1e-9 이내 비교. 이것은 해석 Envelope Model의 교차검증이며 EM Solver 정확도 검증이 아닙니다.

주 1차 자료: 원본의 공식 목차/Chapter 서지; Yariv CMT (원본 Chapter References에 등재), Bogaerts 등 Ring Review(저자 기관 공개 PDF), Ansys Uniform Grating Coupled-wave 공식 설명. 식과 수치 예제는 독자 유도·계산했습니다. 추가 자료 URL은 본문 Source Links와 TEXTBOOK_SOURCE_MAPPING.md에 있습니다.

## Figures와 시각 점검

신규 17개 = **10 Analytical + 7 Conceptual**. 전체 목록은 CH2_FIGURE_INVENTORY.md. 모든 Figure에 번호/분류/조건/한계/관찰 Caption/확대가 있습니다. Analytical Graph에는 Axis/Unit 및 현재 선택 Marker를 표시합니다. Desktop/Mobile Screenshot은 artifacts/v0.2.0에 보존합니다. 최종 Opening/Ring 화면 및 Mobile Figure를 직접 시각 점검했습니다.

## 한계와 사용자 검토

- 원본의 전체 유료 본문/그림/실험 데이터는 확보하지 않았습니다. 공식 목차의 세부 Section과 시작 페이지를 확인한 뒤 새 설명/예제를 작성했습니다. 원문 문장별 Fidelity 검토를 완료했다고 주장하지 않습니다.
- 실제 PDK, 제작/측정, FDTD/FEM을 수행하지 않았습니다. DC κ와 neff/Loss는 명시한 독립 입력입니다. Y/MMI 도식은 Conceptual입니다.
- Ring은 All-pass θ Sweep, FSR은 독립 ng의 국소 근사입니다. Bragg는 Uniform CMT이며 Phase Defect/Apodization/실제 Lithography Spectrum은 계산하지 않습니다. 해당 내용의 후속 위치는 Source Mapping에 명시했습니다.
- Chromium과 Mobile Emulation 검증입니다. 실제 Android/iOS, 다른 Browser Engine, 전체 Screen Reader/WCAG, 교육 효과는 검증하지 않았습니다.
- D1/D2는 당시 부분 구현과 Ch1 font subset을 보존한 개발 Snapshot입니다. 최종 D3를 학습 검토 기준으로 사용해 주세요.
- 2.5가 Ring/Bragg/종합 실습을 함께 담으므로 읽기 부담·설명의 깊이·Notebook 연결을 CH2_LEARNING_REVIEW.md에 따라 검토해야 합니다.

Release Candidate에서 중단합니다. 사용자 명시적 병합 승인 전 main에 병합하지 않으며 Chapter 3는 시작하지 않습니다.
