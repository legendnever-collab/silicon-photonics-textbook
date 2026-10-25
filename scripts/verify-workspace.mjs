import{readFile}from'node:fs/promises';import{createHash}from'node:crypto';import assert from'node:assert/strict';
const sha=x=>createHash('sha256').update(x).digest('hex'),base=JSON.parse(await readFile('docs/WORKSPACE_PRESERVATION.json','utf8'));
for(const[path,expected]of Object.entries(base.files))assert.equal(sha(await readFile(path)),expected,path);
const info=JSON.parse(await readFile('dist/workspace-build-info.json','utf8')),html=await readFile('dist/silicon-photonics-textbook-v0.12.1.html','utf8');
assert.equal(sha(html),info.htmlSha256);for(const{path,sha256}of info.sourceManifest)assert.equal(sha(await readFile(path)),sha256,path);assert.equal(sha(JSON.stringify(info.sourceManifest)),info.sourceHash);
const data=JSON.parse(html.match(/window.TEXTBOOK=(.*?);<\/script>/s)[1]),prior=JSON.parse((await readFile('dist/silicon-photonics-textbook-v0.12.0.html','utf8')).match(/window.TEXTBOOK=(.*?);<\/script>/s)[1]);assert.deepEqual(data,prior);assert.equal(data.lessons.length,79);assert.equal(data.chapters.length,12);assert.equal(data.storageKey,'sipt-textbook-v12');
console.log(JSON.stringify({preservedFiles:Object.keys(base.files).length,lessons:data.lessons.length,sourceManifest:'PASS',htmlSha256:info.htmlSha256}));
