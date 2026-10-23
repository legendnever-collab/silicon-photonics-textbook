# Chapter 8 Textbook Source Mapping
Verified 2026-10-23 KST. Cambridge official contents, printed x–xi / PDF10–11: https://assets.cambridge.org/97811070/85459/frontmatter/9781107085459_frontmatter.pdf
Original Chapter10 pp349–366. Full paid text, original figures and listings **not accessed**. Independent Korean prose, examples and SVG. No original numerical example reproduction.

| Original section/start | App lesson | Treatment and scope |
|---|---|---|
|10.1/349;10.1.1/352|8.1|PDK, stack, thickness/etch, layer/datatype, teaching rules; no foundry process specification|
|10.1.2/352|8.2|Cell/PCell/Instance/Port, geometry versus model validity|
|10.1.3/353;10.1.4/355|8.3|Schematic, independent reference netlist and JSON circuit export|
|10.1.5/356|8.4|Linked MZI layout, rigid transform, explicit straight/arc routing and length|
|10.1.6/360;10.1.7/361|8.5|Limited width/parallel coupon spacing DRC and port/route connectivity extraction; not polygon-based sign-off|
|10.2/362;10.2.1/362|8.6|Mask geometry, component reuse, hierarchy|
|10.2.2/362|8.6|Conceptual fiber/probe access; detailed packaging/testing deferred to original12|
|10.2.3/364;10.2.4/364|8.6|Hierarchical generation and footprint/access tradeoff|
|References/366|all|Only checked primary sources|

8.7 is an original synthesis, not an original textbook section. Original order retained; corner/yield deferred to original11. No mandatory binary GDS writer; JSON is explicitly not GDS.
Primary technical sources checked on 2026-10-23: KLayout official DRC basics https://www.klayout.de/doc-qt5/manual/drc_basic.html (width/space, markers); LVS introduction https://www.klayout.de/doc-qt5/manual/lvs_intro.html (extract/connect/compare distinction); database API https://www.klayout.de/doc-qt5/programming/database_api.html (layer/datatype, DBU, cells/instances). These establish concepts, not validation by KLayout. SiEPIC documentation retrieval unavailable; no unverified SiEPIC-specific behavior is claimed.
