import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
const read=p=>readFile(p,'utf8'),sha=x=>createHash('sha256').update(x).digest('hex');
const base='dist/silicon-photonics-textbook-v0.12.2.html';let html=await read(base);if(sha(html)!=='123a669cb5bac4acc8a2e8f6bd76d737c0dad3aed393946930053109ffcdd2a6')throw Error('Frozen U1 release changed');
const paths=[base,'scripts/build-workspace-u2.mjs','workspace-u2/comparison.js','workspace-u2/workspace.js','workspace-u2/styles.css'],sourceManifest=await Promise.all(paths.map(async path=>({path,sha256:sha(await read(path))}))),sourceHash=sha(JSON.stringify(sourceManifest));
const meta={version:'0.12.3',baseVersion:'0.12.2',pilots:['1.4','12.2','12.5'],allLessons:79,sourceHash,sourceManifest};
function replace(a,b){if(html.split(a).length!==2)throw Error('U2 anchor changed: '+a.slice(0,100));html=html.replace(a,()=>b);}
replace('</style>',await read('workspace-u2/styles.css')+'\n</style>');
replace('root.WorkspaceUI={render,update,expanded:()=>!!modal?.open};','root.WorkspaceUI={render,update,refresh:()=>{sync();layout();},expanded:()=>!!modal?.open};');
replace('function renderNotebook(){return WorkspaceUI.render(current().id,()=>renderNotebookOriginal());}','function renderNotebook(){const result=WorkspaceUI.render(current().id,()=>renderNotebookOriginal());WorkspaceU2.mount(current().id,settings(),()=>updateNotebook());return result;}');
replace('function updateNotebook(){return WorkspaceUI.update(()=>updateNotebookOriginal());}','function updateNotebook(){return WorkspaceUI.update(()=>{const result=updateNotebookOriginal();WorkspaceU2.sync(current().id,settings());return result;});}');
replace("(function(){\n'use strict';\nconst {lessons}=TEXTBOOK",await read('workspace-u2/comparison.js')+'\n'+await read('workspace-u2/workspace.js')+"\n(function(){\n'use strict';\nconst {lessons}=TEXTBOOK");
replace(html.match(/window.WORKSPACE_BUILD=(.*?);\n/)[0],'window.WORKSPACE_BUILD='+JSON.stringify(meta)+';\n');
await writeFile('dist/silicon-photonics-textbook-v0.12.3.html',html);await writeFile('dist/workspace-u2-build-info.json',JSON.stringify({...meta,htmlSha256:sha(html)},null,2)+'\n');await writeFile('dist/WORKSPACE_U2_SHA256SUMS.txt',sha(html)+'  silicon-photonics-textbook-v0.12.3.html\n');console.log('Built U2 Pilot: '+sha(html));
