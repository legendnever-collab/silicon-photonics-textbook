import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),read=p=>readFile(p,'utf8');
const base='dist/silicon-photonics-textbook-v0.12.3.html';let html=await read(base);
if(sha(html)!=='0c71675a1e945e4d65e31c73ab4e9ee22e8d45b2171a3fd4649c2b799c39c30d')throw Error('Frozen U2 release changed');
const paths=[base,'scripts/build-workspace-u3.mjs','workspace-u3/learning.js','workspace-u3/styles.css'],sourceManifest=await Promise.all(paths.map(async path=>({path,sha256:sha(await read(path))}))),sourceHash=sha(JSON.stringify(sourceManifest));
const meta={version:'0.12.4',baseVersion:'0.12.3',pilots:['1.4','12.2','12.5'],allLessons:79,sourceHash,sourceManifest};
function replace(a,b){if(html.split(a).length!==2)throw Error('U3 anchor changed: '+a.slice(0,100));html=html.replace(a,()=>b);}
replace('</style>',await read('workspace-u3/styles.css')+'\n</style>');
replace("(function(){\n'use strict';\nconst {lessons}=TEXTBOOK",await read('workspace-u3/learning.js')+"\n(function(){\n'use strict';\nconst {lessons}=TEXTBOOK");
replace('function renderNotebook(){const result=WorkspaceUI.render(current().id,()=>renderNotebookOriginal());WorkspaceU2.mount(current().id,settings(),()=>updateNotebook());return result;}',`function renderNotebook(){WorkspaceU3.release();const result=WorkspaceUI.render(current().id,()=>renderNotebookOriginal());WorkspaceU2.mount(current().id,settings(),()=>updateNotebook());WorkspaceU3.mount(current(),{
 note:e=>{state.notes[state.lesson+':'+e.target.dataset.note]=e.target.value.slice(0,12000);save();},
 prediction:e=>{state.predictions[state.lesson]=Number(e.target.value);$('#prediction-feedback').textContent='';save();},
 compare:()=>{$('#prediction-feedback').textContent=current().predictionFeedback;}
});return result;}`);
replace(html.match(/window.WORKSPACE_BUILD=(.*?);\n/)[0],'window.WORKSPACE_BUILD='+JSON.stringify(meta)+';\n');
await writeFile('dist/silicon-photonics-textbook-v0.12.4.html',html);await writeFile('dist/workspace-u3-build-info.json',JSON.stringify({...meta,htmlSha256:sha(html)},null,2)+'\n');await writeFile('dist/WORKSPACE_U3_SHA256SUMS.txt',sha(html)+'  silicon-photonics-textbook-v0.12.4.html\n');console.log('Built U3 Pilot: '+sha(html));
