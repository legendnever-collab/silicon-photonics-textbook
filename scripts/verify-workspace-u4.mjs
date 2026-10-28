import{readFile}from'node:fs/promises';import{createHash}from'node:crypto';import assert from'node:assert/strict';import vm from'node:vm';
const sha=x=>createHash('sha256').update(x).digest('hex'),read=p=>readFile(p,'utf8');
const baseline=JSON.parse(await read('docs/WORKSPACE_U4_PRESERVATION.json'));for(const[path,hash]of Object.entries(baseline.files))assert.equal(sha(await readFile(path)),hash,path);
const info=JSON.parse(await read('dist/workspace-u4-build-info.json')),html=await read('dist/silicon-photonics-textbook-v0.12.5.html');assert.equal(sha(html),info.htmlSha256);for(const p of info.sourceManifest)assert.equal(sha(await readFile(p.path)),p.sha256,p.path);assert.equal(sha(JSON.stringify(info.sourceManifest)),info.sourceHash);
const data=s=>JSON.parse(s.match(/window.TEXTBOOK=(.*?);<\/script>/s)[1]);assert.deepEqual(data(html),data(await read('dist/silicon-photonics-textbook-v0.12.4.html')));assert.equal(data(html).lessons.length,79);
const scope={};vm.runInNewContext(await read('workspace-u4/catalog.js'),scope);assert.deepEqual(Object.keys(scope.WorkspaceU4Catalog).sort(),data(html).lessons.map(l=>l.id).sort());for(const[id,c]of Object.entries(scope.WorkspaceU4Catalog)){assert.ok(c.keys.length>0,id);assert.ok(c.relation.length>20,id);}
console.log(JSON.stringify({preservedFiles:Object.keys(baseline.files).length,lessons:79,allGuides:79,htmlSha256:info.htmlSha256}));
