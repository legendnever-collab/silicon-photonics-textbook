# Hosted CI first-failure history

1. At source checkpoint e35576b: Chapter8 run40162609770, job121077130944. Chapter8 browser67PASS. The unchanged archived Chapter3 regression timed out at tests/ch3-browser.mjs14:942 in the save/restore wait. Local identical archived Chapter3 source passed; runtime437e9d3's Chapter8 workflow40163039274 later passed with unchanged archived assertions. No sleep or assertion weakening was added.
2. At runtime437e9d3: Workspace run40163039268, job121078399003. Build/Node/independent reference/preservation PASS; Pilot117PASS. Integrated regression launch failed before executing assertions: `Cannot find module 'undefined/playwright'`, require stack `/tmp/sipt-workspace-regression-KMev6E/ch12-browser.mjs`. The runner placed transient copies outside the repository dependency tree. Fix: temporary directory under repository tests/; original tests remain unchanged. Local full integrated67 suite is executed with CODEX_PRIMARY_RUNTIME_NODE_MODULES removed to exercise hosted dependency resolution. Final-head hosted run is resolved from PR13.

Canonical logs remain available under each GitHub Actions run. Final conclusions do not erase these initial failures.
