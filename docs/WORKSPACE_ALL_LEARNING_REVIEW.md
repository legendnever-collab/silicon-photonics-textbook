# v0.12.2 · All-Chapter Workspace Review

실행: silicon-photonics-textbook-v0.12.2.html. Chapter1–12의79Lesson 전체에 고정 Live 그래프/주요 결과, 독립 Parameter 스크롤, Resize, 앱 내부 확대/복귀를 적용했습니다. 기존 본문→Tutor→예측→실험→Reflection과 학습 기록은 유지합니다.

1. 어느 Chapter에서든 오른쪽 아래 조작부를 끝까지 내려 값을 바꿔 봅니다. 위 그래프/주요 결과가 계속 보이고, 조작 중인 Control의 화면 위치와 Focus가 유지되는지 확인합니다.
2. 실험 화면 확대: Desktop은 그래프/조작부를 좌우 배치합니다. Mobile 세로는 위아래 배치하고, 가로 전환 시 넓이에 맞춰 좌우로 바뀝니다. 닫기/Escape 후 같은 Lesson·읽던 위치·실험 값으로 복귀합니다. 숫자 수정/그림 확대 창이 열렸다면 Escape는 안쪽 창부터 닫습니다.
3. 구분선: 드래그 또는 Tab 후 Arrow/Shift+Arrow/Home/End. 그래프와 조작부의 최소 크기를 유지합니다. 좁은 화면에서는 글씨를 과도하게 축소하지 않으므로 그래프 안에서 Pan/Scroll하여 축·Legend·상세 그림을 볼 수 있습니다. 긴 KPI의 전체 문장은 아래 원래 Readout에도 남아 있습니다.
4. Chapter별 확인: Ch1 Mode/Field/Dispersion, Ch2 Ring/Bragg/Circuit, Ch6 Threshold/L–I/Structure, Ch7 MZI/Fit/Spectrum, Ch8 Schematic/Layout의 Port 선택, Ch9 Variation, Ch10–12 Current/Frozen/Stale·숫자 수정·Report를 확인합니다. Spectrum/Netlist/모델 설명은 아래 상세 조작 영역에 있습니다.
5. Chapter8 두 그림은 각각 실제 Live SVG입니다. 넓이가 부족하면 관찰 영역 내부를 좌우로 이동해 Schematic과 Layout을 확인할 수 있습니다. 원본 그림 확대도 유지합니다.

계산 모델과 실제 성능 가정은 기존 Chapter의 계약을 그대로 사용합니다. 화면 확대·복귀·Resize·Theme는 Evidence 재취득이 아닙니다. 기존 Source Report 버전/Hash는 Physics provenance이고, 새 UI sourceHash는 workspace-all-build-info.json에 별도로 기록됩니다.

자동 검증은 Viewport Emulation입니다. 실제 Android Keyboard/IME·시스템 Back·Touch 감각과 학습 효과는 사용자 확인이 필요합니다. 이번 변경의 main 병합은 사용자 Play Review와 명시적 승인 후 진행합니다. 새로운 학습 안내/비교/U2–U3 기능이나 Chapter13은 이번 범위에 포함하지 않았습니다.
