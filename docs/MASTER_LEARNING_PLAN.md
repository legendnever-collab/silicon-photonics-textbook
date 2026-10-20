# Interactive Silicon Photonics Textbook

## Product and scope
독립적인 교재형 제품. 기술 용어는 영어, 설명은 한글. 기존 게임/Study Companion의 Source를 복제하지 않는다. Chapter 1만 구현하고 사용자 학습 검토를 기다린다. Engine, MRM, EAM과 1.6T/3.2T System은 장기 연결 방향이며 이번 구현 범위가 아니다.

## Chapter 1 sequence
1.1 Index Contrast → TIR의 의미와 한계 (7–9분)
1.2 Eigenmode → Signed Field / Intensity → TE/TM (6–8분)
1.3 β → n_eff → Guided Wavelength → Phase (6–9분)
1.4 Width / Height → Slab Width 실험 → Mode Cutoff (6–9분)
1.5 Propagation / Bend → Loss Ledger → Engineering Explanation (5–10분)

목표 30–45분. 합산 범위는 개인차를 포함하며 실제 사용자 학습 시간은 미측정이다. 모든 Lesson의 A–F가 연속된 글 안에 존재한다. Tutor 응답이나 실험은 다음 Lesson의 접근 조건이 아니다.

## Learning evidence
읽은 페이지 수나 정답 수로 이해를 판정하지 않는다. 각 Lesson의 자기 설명, 실험 예측, Chapter 말의 전이 질문을 사용자 검토에 사용한다. 자동 QA는 구조/수식/동작을 검증하며 교육 효과를 증명하지 않는다.

## Checkpoints
C1 Foundation + 1.1, C2 1.2 + 1.3, C3 1.4 + 1.5, C4 QA + Release Candidate. 각 시점에 standalone HTML을 보존하고 Commit/Push한다. main 병합은 사용자 명시적 승인 후에만 허용한다.
