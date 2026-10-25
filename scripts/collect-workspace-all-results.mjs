import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const root = 'artifacts/v0.12.2';
const sha = createHash('sha256').update(await readFile('dist/silicon-photonics-textbook-v0.12.2.html')).digest('hex');
const records = [];
for (const name of ['desktop', 'mobile']) {
  const path = `${root}/${name}/all-browser-results.json`;
  const report = JSON.parse(await readFile(path, 'utf8'));
  assert.equal(report.htmlSha256, sha, path);
  for (const key of ['errors', 'console', 'network']) assert.deepEqual(report[key], [], `${path}: ${key}`);
  for (const scenario of report.scenarios) {
    assert.equal(scenario.status, 'PASS', `${path}: ${scenario.name}`);
    records.push({...scenario, source: path});
  }
}
assert.equal(new Set(records.map(r => r.name)).size, 634);
assert.equal(records.filter(r => r.name.startsWith('All ')).length, 632);
const regressionPath = `${root}/integrated/ch12-browser/browser-results.json`;
const regression = JSON.parse(await readFile(regressionPath, 'utf8'));
assert.equal(regression.htmlSha256, sha, regressionPath);
assert.equal(regression.scenarios.length, 67);
for (const scenario of regression.scenarios) assert.equal(scenario.status, 'PASS', scenario.name);
for (const key of ['errors', 'console', 'network']) {
  assert.deepEqual(regression[key], [], `${regressionPath}: ${key}`);
}
const summary = {
  htmlSha256: sha,
  scope: '79 lessons × 4 viewports × 2 themes, plus original/new parity and chapter-specific interaction walkthrough',
  matrixScenarios: 632,
  parityLessons: 79,
  passedScenarios: records.length,
  provenance: 'Fresh reports regenerated after session cleanup. Earlier 26408df hosted desktop attempt used innerText on a hidden JSON pre and failed; corrected to textContent without changing app source or assertions.',
  limitations: 'Viewport emulation only; physical Android keyboard/IME, system Back, touch feel and learning outcomes require user review.',
  regressionReport: regressionPath,
  regressionScenarios: regression.scenarios.length,
  scenarios: records
};
await writeFile(`${root}/all-validation-summary.json`, JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({htmlSha256: sha, matrix: 632, total: records.length}));
