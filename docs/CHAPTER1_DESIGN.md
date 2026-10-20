# Chapter 1 design

## Learning question
재료와 단면이 어떻게 허용된 Field Pattern과 Phase를 정하며, 설계자가 그것을 Loss와 Footprint에 어떻게 연결하는가?

## Layout
1440×900 기준 상단 Brand/Session, 5개 Lesson 직접 선택, 좌측 교재(약 51%), 우측 Physics Notebook(약 49%). 본문 17px / 1.85 line-height. 본문 절의 IntersectionObserver가 Notebook의 문맥 안내를 갱신한다. 과도한 Next와 전체 화면 전환을 사용하지 않는다. Mobile에서는 E 절에 Notebook을 삽입하며 상단 바로가기로 접근한다.

## Physics contract
- 1.1: Snell’s Law와 Critical Angle은 Analytical. 광선 그림은 Conceptual. 반사율/광선 tracing을 계산한 그림이 아니다.
- 1.2, 1.4: 무한한 y, 유한한 x, 전파 z의 대칭 유전체 Slab. Ey인 TE만 계산. 실수·고정 n, lossless, isotropic, nonmagnetic. 초월방정식을 Bisection으로 푼다. 2D Strip, 유한 Height, Quasi-TM의 정량 해가 아니다.
- 1.3: 가정한 n_eff를 입력한 Phase 계산. Mode Solver가 산출한 Strip n_eff라고 주장하지 않는다. Phase Velocity와 Group Velocity 구별.
- 1.5: dB Power Ledger는 Analytical. Radius별 Bend Loss는 명시적인 synthetic 교육용 데이터. PDK/실측/수치 전자기 해가 아니다. 실제 설계 추천값으로 전용하지 않는다.

## Content and tutor
각 Lesson은 A–F 및 Worked Example, 변수/단위/조건/한계, 3가지 응답 중 2개의 오개념, 4가지 후속 설명, 예측/자기 설명 메모를 가진다. 자유 입력은 로컬 메모이며 AI가 해석하거나 채점하지 않는다.

## Review
Chapter 완료는 학습자가 자가 기록한다. 5개 Lesson 모두 자유롭게 접근한다. Chapter Summary와 Rubric은 스스로 설명의 질을 확인하게 한다. 성공 기준은 사용자가 공부한 느낌과 개념 이해의 증가를 보고하는 것이다.
