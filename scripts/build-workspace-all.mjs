import{readFile,writeFile,mkdir}from'node:fs/promises';import{createHash}from'node:crypto';import{extendWorkspace}from'./workspace-all-extension.mjs';
const read=p=>readFile(p,'utf8'),sha=x=>createHash('sha256').update(x).digest('hex');
const base='dist/silicon-photonics-textbook-v0.12.1.html',baseHTML=await read(base);if(sha(baseHTML)!=='566537810b9ad8a0d52317c942d0ef7f1e2ac26a15000a82eb1be109d98f41b8')throw Error('U1 Pilot release changed');
const data=JSON.parse(baseHTML.match(/window.TEXTBOOK=(.*?);<\/script>/s)[1]);
const sources=[base,'workspace/workspace.js','scripts/build-workspace-all.mjs','scripts/workspace-all-extension.mjs','workspace/all/styles.css'];
const sourceManifest=await Promise.all(sources.map(async path=>({path,sha256:sha(await read(path))}))),sourceHash=sha(JSON.stringify(sourceManifest));
const meta={version:'0.12.2',baseVersion:'0.12.1',allLessons:true,lessons:data.lessons.map(l=>l.id),sourceHash,sourceManifest};let html=baseHTML;
function replace(a,b){if(html.split(a).length!==2)throw Error('All-lesson build anchor changed: '+a.slice(0,70));html=html.replace(a,()=>b);}
replace(await read('workspace/workspace.js'),extendWorkspace(await read('workspace/workspace.js')));
const oldMeta=html.match(/window.WORKSPACE_BUILD=(.*?);\n/)[0];replace(oldMeta,'window.WORKSPACE_BUILD='+JSON.stringify(meta)+';\n');
replace('</style>',(await read('workspace/all/styles.css'))+'\n</style>');
// Reading-linked physical view changes are paused while the same notebook is expanded.
replace('function connect(){','function connect(){if(WorkspaceUI.expanded())return;');
await mkdir('dist',{recursive:true});const path='dist/silicon-photonics-textbook-v0.12.2.html';await writeFile(path,html);
await writeFile('dist/workspace-all-build-info.json',JSON.stringify({...meta,htmlSha256:sha(html)},null,2)+'\n');
await writeFile('dist/WORKSPACE_ALL_SHA256SUMS.txt',sha(html)+'  silicon-photonics-textbook-v0.12.2.html\n');
console.log('Built all '+data.lessons.length+' lessons; HTML SHA256 '+sha(html));
