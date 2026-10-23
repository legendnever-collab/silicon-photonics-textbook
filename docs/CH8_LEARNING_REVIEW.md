# Chapter 8 Learning Review
Open dist/silicon-photonics-textbook-v0.8.0.html in a Browser. Entire textbook runs offline; select Chapter8. Technical terms English, narrative Korean.

1.8.1–8.2: Read Layer/Stack, Cell/PCell/Instance; select Metal10/0 or a different Library Cell. Explain which information is process meaning versus drawing identity.
2.8.3–8.4: Select C1.ru and Upper Route in linked views. Switch Schematic/Layout and rotate the whole circuit90°. Length must be invariant. Set Extra Excursion e≈.161458333µm and observe two-output interchange under explicit UDU/fixed-index assumptions.
3.8.5: Compare four error presets. In Combined, repair Width/Spacing first; LVS must remain FAIL. Restore Upper Endpoint and check graph. Swap destinations and explain missing/unexpected Nets.
4.8.6: Toggle conceptual Test Access. DRC/Connectivity can be identical while access requires further review. The drawing is not dimensional equipment clearance validation.
5.8.7: Use numeric Properties, Apply/Close and JSON Report. Report should contain independent Reference/Extracted Graph, checked Rules, Length/Phase and Not checked scope. Save Notes, Backup and Restore learning record separately.

On mobile, no dragging is required. Properties actions remain in a sticky footer; numeric values accept finite in-range input. Try Figure Zoom/Escape and Light/Dark. File-origin storage can vary by Browser; use JSON backup to transfer records.

Limits: SIPT-DEMO-1 only, port/endpoint graph (not polygon extraction), route width and parallel coupon spacing only, fixed n_eff, no optical-loss/EO/foundry/GDS sign-off. Chapter7 and all previous release HTML retained. PR8 Draft; explicit user approval needed before main merge.

Technical runtime validation complete:159Node/320independent/67new+244archived Browser PASS; [CI](https://github.com/legendnever-collab/silicon-photonics-textbook/actions/runs/39938850918). User study review remains separate. SHA256 `f2c1440f499612f73cfa4403bc867760357055f7ba28226acfa41fe2dbfb0362`.
