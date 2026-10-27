# All-Chapter Workspace rollout · v0.12.2

User explicitly requested extending U1 to every Chapter after the Pilot. Recovered existing branch/PR13 at ae90df89f2ee84464e657ec012790afb23b9948c; main45db327 unchanged, no local user changes or AGENTS.md. Continue same Draft PR, no duplicate PR or implicit merge.

Scope: existing U1 pinned live plot, renderer-derived KPI, independent controls, keyboard/pointer split and same-state app expansion for all79Lessons/12Chapters. No U2/U3 features or new curriculum/Physics. Preserve v0.12.1 and its complete original source/build/provenance. New build reads hash-checked v0.12.1 and reuses its shell with checked UI-only transformation. New v0.12.2 HTML and separate source manifest. All prior tracked files except README/package metadata are hashed in WORKSPACE_ALL_PRESERVATION.json.

Audit found one live SVG in all lessons except8.3/8.4/8.7 (two linked Schematic/Layout SVGs). Wrap every original SVG independently, keep original events and logical graph order, allow pan at readable label scale. Original Spectrum/Netlist/Readout stays in the details pane. Choose View labels from actual chapter selectors; never label a generic lesson Field Profile. Derive compact KPI only from current Renderer paragraphs, with original full readout accessible. Scope/model assumptions remain preserved.

Chapter8/9 existing scroll-anchor compensation assumes the outer Notebook scrolls; new UI restores focused control position in the controls pane before legacy compensation runs. Pause reading-linked scene selection while expanded to preserve Chapter1.2/2.5 physical View semantics. Physical settings, captured evidence, seed and storage key remain original. UI-only preferences remain separate.

Verification: all79Lessons at1440×900/1366×768/390×844/320×740 ×Light/Dark; change last available parameter, actual live graphics/readout, independent scroll/focus/control identity, graph/KPI geometry, expand/return/settings/reading restoration. Direct v0.12.0 vs v0.12.2 result parity for each lesson, supported View/Mode/linked port changes, Chapter8–12 Properties and Reports/Frozen/Backup/Restore. Reuse original Chapter12 assertions against new HTML; Node/reference/hash/font/build checks. Browser viewport emulation; actual Android/IME remains user review. Existing historical evidence is not relabeled as a fresh test run.

User Play Review before main merge. Prior U1 approval to extend scope is not a merge instruction.
