// Additive UI release: never executes historical builders or writes archived files.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=p=>readFile(p,'utf8'),sha=x=>createHash('sha256').update(x).digest('hex');
const base='dist/silicon-photonics-textbook-v0.12.0.html',baseHTML=await read(base);
if(sha(baseHTML)!=='3fd513bdfb35af4854b7e3d9d300d330c75dd87b7804c5ce28bbb14bb08e54db')throw Error('Archived Chapter12 HTML changed');
const sources=[base,'scripts/build-workspace.mjs','workspace/workspace.js','workspace/workspace.css'];
const sourceManifest=await Promise.all(sources.map(async path=>({path,sha256:sha(await read(path))})));
const sourceHash=sha(JSON.stringify(sourceManifest));
const meta={version:'0.12.1',baseVersion:'0.12.0',pilots:['1.4','12.2','12.5'],sourceHash,sourceManifest};
let html=baseHTML;
function replace(a,b){if(html.split(a).length!==2)throw Error('Workspace anchor changed: '+a);html=html.replace(a,()=>b);}
replace('</style>',(await read('workspace/workspace.css'))+'\n</style>');
replace('function renderNotebook(){','function renderNotebook(){return WorkspaceUI.render(current().id,()=>renderNotebookOriginal());}\nfunction renderNotebookOriginal(){');
replace('function updateNotebook(){','function updateNotebook(){return WorkspaceUI.update(()=>updateNotebookOriginal());}\nfunction updateNotebookOriginal(){');
replace('function placeNotebook(){','function placeNotebook(){if(WorkspaceUI.expanded())return;\nplaceNotebookOriginal();}\nfunction placeNotebookOriginal(){');
// Install the UI before the original app initializes; physics scripts stay byte-identical.
replace("(function(){\n'use strict';\nconst {lessons}=TEXTBOOK",`window.WORKSPACE_BUILD=${JSON.stringify(meta)};\n${await read('workspace/workspace.js')}\n(function(){\n'use strict';\nconst {lessons}=TEXTBOOK`);
await mkdir('dist',{recursive:true});
const path='dist/silicon-photonics-textbook-v0.12.1.html';
await writeFile(path,html);
await writeFile('dist/workspace-build-info.json',JSON.stringify({...meta,lessons:79,htmlSha256:sha(html)},null,2)+'\n');
await writeFile('dist/WORKSPACE_SHA256SUMS.txt',`${sha(html)}  silicon-photonics-textbook-v0.12.1.html\n`);
console.log(`Built U1 Pilot; 79 lessons; HTML SHA256 ${sha(html)}`);
