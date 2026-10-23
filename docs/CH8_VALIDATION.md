# Chapter 8 Validation
Local implementation gate:159Node tests PASS (140retained +19new). Tests cover port coordinate/orientation transforms, four full quarter rotations, rigid Length invariance, exact distance boundary, angle/domain/cross-section/width compatibility, duplicate/ambiguous port cases, missing instance, external terminals, interior crossing behavior, route array ordering, independent Reference versus Extracted Graph, orthogonal DRC/LVS and staged repair, invalid numeric domain, source/HTML manifest and prior source/release preservation.

Independent Python reference:320comparisons across32states, max absolute error1.84e−15. Primitive decomposition sums two horizontal leads, plateau, two vertical legs and four quarter circles; transfer from independently summed complex fields; trigonometric port coordinates. See CH8_INDEPENDENT_VALIDATION.json. This is a numerical consistency result, not full-wave or manufacturing accuracy.

Analytic examples (absolute tolerance1e−10 unless stated): base L=111.41592653589794µm for each route; ΔL0 gives Upper0,Lower1mW. e=.16145833333333334µm gives ΔL=.3229166666666667µm, δπ and Upper1,Lower0mW within floating error. Translation/rotation preserve lengths and total1mW. Parallel coupon w=.5µm and center distance .8µm give edge gap .3µm; threshold pass uses1e−9µm numeric tolerance. Endpoint matching .002µm passes and .00201µm fails. Body width .25µm leaves fixed .5µm interface connectivity but fails minimum width .4µm.

Export: JSON Study Report schema1; technology/state/reference/extracted/rules/length/phase/two outputs/unchecked scope. No binary GDS export. Save uses v8 key and reads previous keys without writing to them. Actual Browser download/restore, modal focus and viewport gates are tracked separately in QA; do not infer PASS from unit tests.

Physics reuses Chapter7 UDU with independent fixed n_eff2.4/λ1.55µm. No voltage/index calibration, bend-loss prediction, arbitrary Polygon DRC or device extraction. Curved spacing, component internals and foundry rules are explicitly Not checked.

DBU distinction: .001µm is an explanatory storage example only. The route model retains continuous floating-point µm for analytical phase exploration; no GDS DBU/quantized-mask output or grid-alignment DRC is claimed. The standalone quantize helper is independently boundary-tested.
