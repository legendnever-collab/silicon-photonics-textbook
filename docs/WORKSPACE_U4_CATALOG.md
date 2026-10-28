# U4 · Lesson별 핵심 Parameter와 모델 연결

세 Pilot의 기존 Overlay는 유지합니다. 나머지76 Lesson은 각각의 원래 축으로 나란히 비교합니다. 모든 기존 Control과 모델 가정은 원본 그대로입니다. `@view/@mode/@field`는 기존 버튼 Group의 실제 노드 이동을 뜻합니다.

| Lesson | 핵심 Control | 모델 연결과 범위 |
| --- | --- | --- |
| 1.1 · Confinement | angle | Snell: n₁ sinθ₁ = n₂ sinθ₂ · θc = asin(n₂/n₁). Ray 그림은 Conceptual입니다. |
| 1.2 · Optical Modes | @view, @mode, @field | Slab TE의 Node 수 = m. Ey와 Ey²는 각각 정규화한 표시이며 Mode 사이 Power 크기를 비교하지 않습니다. |
| 1.3 · Effective Index | neff, length | β = 2πn_eff/λ₀ · φ = βL. L만 바꾸면 β는 그대로입니다. |
| 1.4 · Geometry & Light | width, @mode | V = k₀(d/2)√(nCore²−nClad²) → 허용 Slab TE Mode와 Field. |
| 1.5 · Physics to Design | radius | Total Loss = Propagation + 추가 Bend Loss. Radius별 Bend 데이터는 가정한 교육용 예시입니다. |
| 2.1 · Power & Field | ratio, excess | Power 비율 r과 Field √r를 구별하세요. Excess Loss는 독립 입력입니다. |
| 2.2 · Couplers | kappa, couplingLength | Cross Power = sin²(κL). 같은 β·Lossless·일정 κ를 가정합니다. |
| 2.3 · Optical Phase | deltaLength, phaseIndex, wavelength | Δφ = 2πn_effΔL/λ₀. 합치기 전 Arm Power와 Relative Phase는 다릅니다. |
| 2.4 · MZI | deltaPi | U†DU의 Complex Field 합성 → 두 Output Power. Port Convention을 유지합니다. |
| 2.5 · Filters & PIC | ringT, ringA, ringPhase, gratingK, gratingLength, detuning, circuitRatio, circuitDeltaLength | Ring / Bragg / Circuit은 별도 모델입니다. 서로 다른 View는 나란히 보고 Δ 수치 비교를 보류합니다. |
| 3.1 · Coupling Basics | fiberRadius, modeRadius, offsetX | η = ∣∫E₁*E₂ dA∣² / (∫∣E₁∣²dA ∫∣E₂∣²dA). 주어진 Scalar Gaussian Profile의 Overlap입니다. |
| 3.2 · Grating Coupler | period, fiberAngle, periods | βg − k_parallel = 2π/Λ. N은 정규화 Array Factor에 연결되며 절대 효율은 아닙니다. |
| 3.3 · Edge Coupler | offsetX, tilt, modeRadius | Gaussian 크기·Offset·Angular Phase Ramp → Overlap. 실제 Taper Mode Solver는 아닙니다. |
| 3.4 · Polarization | mix, relative, analyzer | Jones Projection의 ∣e_analyzer†j∣². 직교 Analyzer 두 Power의 합을 비교하세요. |
| 3.5 · I/O Ledger | ledgerRadius, ledgerOffset, interfaceLoss | Coupling과 Route Loss를 한 번씩 적용한 Power Ledger. 별도 Reference Plane을 확인하세요. |
| 4.1 · Plasma Dispersion | electronE17, holeE17 | Soref–Bennett Bulk Si: Carrier Density → Δn와 Δα. PN Voltage나 Mode Overlap에서 유도한 값이 아닙니다. |
| 4.2 · PN Phase Shifter | reverseV, assumedDneff, activeLength | Depletion Width와 Optical Δn_eff는 독립 입력입니다. Optical Phase = 2πΔn_effL/λ. |
| 4.3 · MZI Modulation | voltage, sensitivityMilli, biasPi | 가정한 Index Sensitivity × Voltage → MZI Phase. 실제 PN Calibration은 아닙니다. |
| 4.4 · Ring Modulators | ringR, ringA, detuningPi | All-pass Ring: Self-coupling·Roundtrip Survival·Phase의 정적 Transfer를 비교하세요. |
| 4.5 · Forward PIN / VOA | alphaCm, pinLength | Power Transmission = exp(−αL). α의 cm⁻¹와 L의 단위를 확인하세요. |
| 4.6 · Active Tuning | heaterMw, timeMs, tauMs | ΔT(t) = P Rth(1−exp(−t/τ)) → Thermo-optic Phase. Lumped Teaching Model입니다. |
| 4.7 · Thermo-optic Switch | heaterMw, timeMs, tauMs | 같은 Thermal Step의 Phase → Switch Output. 시간 응답과 최종 온도를 구별하세요. |
| 5.1 · Photon → Current | lambdaNm, eta, powerUw | R = ηqλ/(hc), I_photo = R P. Detector Reference Plane의 Power입니다. |
| 5.2 · Response & Noise | rOhm, cFf, noiseGhz | f_RC = 1/(2πRC). Noise Bandwidth B와 Carrier Transit W/v는 독립 입력입니다. |
| 5.3 · Ge-on-Si Fabrication | lambdaNm | Photon Energy hc/λ와 Integration 구조를 구별하세요. Bandgap 설명은 흡수계수나 QE Spectrum이 아닙니다. |
| 5.4 · Detector Architectures | gain, eta, powerUw | Mean I_photo = M I_primary. M>1에서 APD Noise·SNR은 모델링하지 않습니다. |
| 5.5 · Geometry & Contacts | alphaCm, lengthUm, collection | η_ext = Coupling × (1−exp(−α_eff L)) × Collection. C_total과 Transit 거리는 별도 입력입니다. |
| 5.6 · Optical & Electrical Models | alphaCm, lengthUm, coupling | Absorption → Generation → Collected Current의 단계를 구별하세요. 3D Field/TCAD 결과는 아닙니다. |
| 5.7 · Detector Design Review | powerUw, lengthUm, noiseGhz, gain | Factorized QE, 독립 RC/Transit, Unity-gain Shot Noise의 범위를 비교하세요. APD Noise는 보류합니다. |
| 6.1 · External Power Supply | sourceMw, wpe, lossDb | Electrical Input = Optical Source / η_WPE. Coupling Loss 후 PIC Power와 Source Heat를 구별하세요. |
| 6.2 · Gain, Feedback & L–I | modelView, materialGainCm, confinement, currentMa, thresholdMa | Threshold: Γg와 Cavity Loss. L–I: 가정한 I_th 이후의 Single-port Differential QE. 두 모델은 독립입니다. |
| 6.3 · Co-packaging | structureIndex | Integration 구조 선택 → Package와 Cavity 경계를 관찰하세요. 정량 Coupling 효율을 계산하는 구조 Solver는 아닙니다. |
| 6.4 · Hybrid & Gain Overlap | structureIndex | Bonded Gain과 Shared Mode의 개념을 비교하세요. Structure 선택으로 Gain Overlap을 계산하지 않습니다. |
| 6.5 · Monolithic III–V / Ge | structureIndex | Direct Growth / Engineered Ge의 가정과 구조를 구별하세요. 실제 Process Recipe나 효율 예측은 아닙니다. |
| 6.6 · Alternative Mechanisms | structureIndex | Emission Mechanism과 Integration Placement는 별도 축입니다. 구조 설명을 나란히 비교하세요. |
| 6.7 · Synthesis & Problems | sourceMw, wpe, lossDb | Source → PIC Power와 Electrical/Heat Ledger를 같은 Reference Plane에서 다시 설명해 보세요. |
| 7.1 · Why Circuit Modelling? | K, delta | 두 같은 방향 Coupler의 UDU → Complex Field와 Output Power. 단일 Coherent Mode 가정입니다. |
| 7.2 · Compact Model Contract | K, armLossDb, delta | Field는 √Power, Loss의 Field 계수는 Power 계수의 제곱근입니다. |
| 7.3 · Complex Waves & S-parameters | delta, referenceRad | Physical Relative Phase와 Reference Plane Phase를 구별하세요. 기준 이동만으로 Power가 바뀌지 않습니다. |
| 7.4 · Coupler, MZI & Passivity | modelView, K, delta, fitNm | MZI와 별도 Synthetic Fit/Passivity 검토를 구별하세요. Pointwise Passivity는 Broadband Causality 검증이 아닙니다. |
| 7.5 · Ring Feedback Model | K, roundtripDb, theta | Coupler와 Roundtrip Feedback → Ring Transfer. Loss의 Amplitude/Power Convention을 확인하세요. |
| 7.6 · GC Measurement Circuit | peak, lengthCm, alphaDbCm | GC–Waveguide–GC Ledger: 두 Coupling과 Propagation Loss를 적용합니다. Shape와 절대 GC Peak는 별도입니다. |
| 7.7 · Guided Circuit & Review | sourceMw, delta, eta | Laser → Coupling → MZI → Detector Current. Boundary Power와 Detector QE를 한 번씩 적용합니다. |
| 8.1 · PDK | layer, cell | PDK Layer / Cell 선언과 실제 Geometry를 구별하세요. 교육용 Technology이며 Foundry PDK가 아닙니다. |
| 8.2 · Cells & Ports | cell, selected | Instance / Port의 위치·방향·이름을 확인하세요. Port Compatibility는 제한된 선언 검사입니다. |
| 8.3 · Schematic & Netlist | disconnect, swap | Physical Endpoint 추출 → Reference Netlist와 비교. Polygon 기반 LVS는 아닙니다. |
| 8.4 · Schematic → Layout | extraUm, width, spacing | Route Length / Phase와 별도 Width / Coupon Gap 검사를 구별하세요. 자동 Routing은 하지 않습니다. |
| 8.5 · DRC & LVS | width, spacing, disconnect | Width ≥ 0.4 µm / Coupon Gap ≥ 0.3 µm와 Endpoint Connectivity를 따로 관찰하세요. |
| 8.6 · Mask & Test Access | rotation, shift, access | Rigid Layout 변환과 Conceptual Test Access를 비교하세요. 3D Collision/Package 검사는 아닙니다. |
| 8.7 · Guided Review | extraUm, width, disconnect | Geometry·Connectivity·Phase의 원인을 하나씩 바꿔 검토하세요. 제한된 Teaching Checks입니다. |
| 9.1 · Nominal vs Fabricated | bias, edge, thickness | Δw = Common + 2×Edge + Gradient·x + Local. Geometry와 Optical Response의 경계를 확인하세요. |
| 9.2 · Process Contours | etch, edge, rounding | Etch / Edge와 독립 Corner Coupon Rounding을 비교하세요. Rounding의 Optical 효과는 계산하지 않습니다. |
| 9.3 · Corner Analysis | bias, thickness, etch | 고정된 Corner Box와 현재 Slider 조건을 구별하세요. Probability / Yield를 계산하지 않습니다. |
| 9.4 · On-chip Variation | gradient, separation, mismatch | 공통 변화와 Pair Difference를 구별하세요. 거리별 확률 Correlation 모델은 아닙니다. |
| 9.5 · Ring Sensitivity | bias, thickness, mismatch | 가정한 Index Sensitivity와 Dispersion → Ring Spectrum. Ring Length/a/t는 고정입니다. |
| 9.6 · Grating Sensitivity | period, bias, etch | 가정한 Grating Phase Matching → Peak Shift. Gaussian Peak 높이/FWHM은 고정입니다. |
| 9.7 · Fabrication Review | bias, gradient, mismatch | Nominal·Common·Local 조건을 나눠 결과를 비교하세요. 측정 분포나 Foundry Yield가 아닙니다. |
| 10.1 · Optical Interfaces | interfaceType, dx, polar | Interface 예시와 Gaussian Overlap/Jones Projection을 구별하세요. UI 기준은 원래 Sweep Capture와 별도입니다. |
| 10.2 · Alignment & Polarization | dx, dy, polar | Spatial Overlap과 Polarization Projection을 하나씩 바꿔 비교하세요. 실제 장비 정렬은 아닙니다. |
| 10.3 · Electrical Interfaces | frequencyGHz, inductanceNh, resistanceOhm | 독립 Series R–L / 50 Ω 예제. 전기 설정은 Optical Frozen Sweep 범위 밖이므로 UI 기준으로 비교합니다. |
| 10.4 · Probe Station | registered, access, dx | Registration / Access와 Optical Fine Alignment를 구별하세요. Capture의 기존 조건 검사를 유지합니다. |
| 10.5 · Chip Registration | tx, ty, rotation | 두 Fiducial의 Proper Rigid Fit → Registration Error. Noise-free Synthetic 예시입니다. |
| 10.6 · Measurement & Reference | pinDbm, floorDbm, lengthMm | 원래 Synthetic Sweep Capture를 재사용합니다. Floor / Saturation / Reference 조건에서 정량 T 보류 여부를 확인하세요. |
| 10.7 · Design for Test | access, registered, resolution | Frozen Sweep와 Test Access를 비교하세요. Gate는 개념적 Workflow이며 실제 Hardware Interlock은 아닙니다. |
| 10.8 · Packaging Review | shiftNm, pinDbm, floorDbm | Current Preview와 원래 Frozen Sweep의 조건을 구별하세요. UI Observation은 재취득하지 않습니다. |
| 11.1 · WDM System | architecture, spacingGHz, fsrGHz | Channel Grid와 Frequency FSR를 구별하세요. Frozen은 두 Architecture의 16개 Static 상태를 보존합니다. |
| 11.2 · Ring Architecture | filterK, filterOffsetGHz, fsrGHz | Modulator와 Passive Mux의 별도 Ring Transfer를 비교하세요. Frequency FSR 고정 가정입니다. |
| 11.3 · Common-bus | driveGHz, driftGHz, mismatchGHz | Common-bus의 다른 Bit가 같은 Carrier에 미치는 Cross-modulation을 관찰하세요. Spectral Crosstalk와 다릅니다. |
| 11.4 · Mod-Mux | architecture, filterK, filterOffsetGHz | Mod-Mux와 Common-bus의 Static Transfer를 비교하세요. 실제 Time-domain Eye는 아닙니다. |
| 11.5 · Detuning & Interaction | channel, driftGHz, mismatchGHz | Selected Channel과 Detuning / Mismatch를 구별하세요. Tune은 유한 Noiseless Model Probe입니다. |
| 11.6 · Budget & Monitoring | sourceMw, dxUm, tapPercent | Carrier별 Source → Coupling → Bus → Tap Power Ledger. 실제 Detector Noise/BER는 계산하지 않습니다. |
| 11.7 · System Review | spacingGHz, fsrGHz, mismatchGHz | 두 Architecture / 16 Static 상태의 Opening과 Cross-modulation을 원래 Frozen 조건에서 비교하세요. |
| 12.1 · Bit Stream | rateGbps, pattern, filterMode | UI = 1/Bit Rate. Pattern과 Filter Memory가 실제 시간 파형을 함께 정합니다. |
| 12.2 · Bandwidth & Memory | txGHz, rxGHz | τ = 1/(2πf). Tx/Rx Settling과 ISI를 실제 시간 축에서 비교합니다. |
| 12.3 · Actual Eye | phase, rateGbps, rxGHz | 실제 2-UI Fold와 Sampling Phase를 구별하세요. Eye는 원래 결정적 파형이며 Noise Sample은 별도입니다. |
| 12.4 · Receiver Planes | p0Mw, p1Mw, lossDb | Tx Power → 1회 Optical Loss → Detector Responsivity → Current의 Reference Plane을 확인하세요. |
| 12.5 · Noise Sources | rxGHz, thermalPa, shotOn, thermalOn | σ² = σshot² + σthermal² · ENBW = πfRx/2. Noise 감소와 Settling 지연을 함께 봅니다. |
| 12.6 · Decisions & Errors | thresholdUa, phase, testedBits | 유한 Decision Samples의 Error Count와 Test Length를 구별하세요. Low BER / Hardware 검증이 아닙니다. |
| 12.7 · Preserve Evidence | seed, testedBits, thermalPa | Physical / Evidence 설정과 Observation-only View를 구별하세요. 명시적 Save Comparison만 Frozen을 교체합니다. |
