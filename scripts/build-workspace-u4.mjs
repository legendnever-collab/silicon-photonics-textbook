import{readFile,writeFile}from'node:fs/promises';import{createHash}from'node:crypto';
const read=p=>readFile(p,'utf8'),sha=x=>createHash('sha256').update(x).digest('hex');
const base='dist/silicon-photonics-textbook-v0.12.4.html';let html=await read(base);if(sha(html)!=='40b2329ef02d05f33670caa17b8e6d56f5647e4bd5c007959bf12c0f5734530f')throw Error('Frozen U3 release changed');
const paths=[base,'scripts/build-workspace-u4.mjs','workspace-u4/catalog.js','workspace-u4/workspace.js','workspace-u4/styles.css'];
const sourceManifest=await Promise.all(paths.map(async path=>({path,sha256:sha(await read(path))}))),sourceHash=sha(JSON.stringify(sourceManifest));
const meta={version:'0.12.5',baseVersion:'0.12.4',pilotOverlayLessons:['1.4','12.2','12.5'],allLessons:79,sourceHash,sourceManifest};
function replace(a,b){if(html.split(a).length!==2)throw Error('U4 anchor changed: '+a.slice(0,120));html=html.replace(a,()=>b);}
// Add read-only presentation adapters inside existing notebook closures. Same original Graphics calls.
const calls={
 2:'const d=def(l,s);return Ch2Graphics[d.kind](s);',
 3:'return Ch3Graphics[defs[l.id].kind](s);',
 4:'return Ch4Graphics[defs[l.id].kind](s);',
 5:'return Ch5Graphics[defs[l.id].kind]({...defaults(l.id),...sanitize(l.id,s)});',
 6:"const v={...defaults(l.id),...sanitize(l.id,s)};return Ch6Graphics[l.id==='6.2'?(v.modelView?'li':'threshold'):defs[l.id].kind](v);",
 7:"const v={...defaults(l.id),...sanitize(l.id,s)};return Ch7Graphics[l.id==='7.4'&&v.modelView===1?'passivity':defs[l.id].kind](v);",
 8:"const v={...defaults(),...sanitize(l.id,s)},kind=['8.1','8.2'].includes(l.id)?'pdk':l.id==='8.5'?'rules':l.id==='8.6'?'access':'linked';return Ch8Graphics[kind](v);",
 9:'const v=sanitize(l.id,s);return Ch9Graphics[kinds[v.view]](v);',
 10:'const v=sanitize(l.id,s);return Ch10Graphics[kinds[v.view]](v);',
 11:'const v=sanitize(l.id,s);return Ch11Graphics[kinds[v.view]](v);',
 12:'const v=sanitize(l.id,s);return Ch12Graphics[kinds[v.view]](v);'
};
for(const[ch,body]of Object.entries(calls))replace('root.Ch'+ch+'Notebook={','root.Ch'+ch+'Notebook={u4Present:(l,s)=>{'+body+'},');
// Copy the frozen Chapter1 rendering functions unchanged into a read-only DOM facade.
const app=html.slice(html.indexOf('const {lessons}=TEXTBOOK'));
function fn(name){const a=app.indexOf('function '+name+'(');if(a<0)throw Error(name);const b=app.indexOf('\nfunction ',a+1);return app.slice(a,b);}
const ch1=`(function(root){root.WorkspaceU4Ch1=(lesson,state)=>{const P=root.Photonics,current=()=>lesson,settings=()=>state,nodes=new Map();
const element=()=>({innerHTML:'',textContent:'',setAttribute(){},nextElementSibling:{children:[{},{}]}}),$=key=>{if(!nodes.has(key))nodes.set(key,element());return nodes.get(key);},document={querySelectorAll:()=>[]};
${['esc','num','svg','fieldPlot','dispersionPlot','updateNotebookOriginal','updateAdvancedNotebook','updateEngineeringNotebook'].map(fn).join('\n')}
updateNotebookOriginal();return{graphic:$('#notebook-plot').innerHTML,values:$('#notebook-readout').innerHTML};};})(globalThis);`;
replace('</style>',await read('workspace-u4/styles.css')+'\n</style>');
// Original Chapter8–12 focus restoration predates the split panes. Restore the actual scrolling pane in the workspace.
replace("if(matchMedia('(max-width:760px)').matches)window.scrollBy(0,dy);else document.getElementById('notebook').scrollTop+=dy;","const pane=a.el.closest('.ws-controls');if(pane&&(root.WorkspaceUI?.expanded()||matchMedia('(min-width:761px)').matches))pane.scrollTop+=dy;else if(matchMedia('(max-width:760px)').matches)window.scrollBy(0,dy);else document.getElementById('notebook').scrollTop+=dy;");
replace("const $=s=>document.querySelector(s),pilots=new Set(['1.4','12.2','12.5']),key='sipt-workspace-u3-v1';","const $=s=>document.querySelector(s),pilots=new Set(root.TEXTBOOK.lessons.map(l=>l.id)),key='sipt-workspace-u3-v1';");
replace("(function(){\n'use strict';\nconst {lessons}=TEXTBOOK",ch1+'\n'+await read('workspace-u4/catalog.js')+'\n'+await read('workspace-u4/workspace.js')+"\n(function(){\n'use strict';\nconst {lessons}=TEXTBOOK");
replace('WorkspaceU2.mount(current().id,settings(),()=>updateNotebook());WorkspaceU3.mount(current(),{','WorkspaceU2.mount(current().id,settings(),()=>updateNotebook());WorkspaceU4.mount(current(),settings(),()=>updateNotebook());WorkspaceU3.mount(current(),{');
replace('WorkspaceU2.sync(current().id,settings());return result;','WorkspaceU2.sync(current().id,settings());WorkspaceU4.sync(current(),settings());return result;');
replace(html.match(/window.WORKSPACE_BUILD=(.*?);\n/)[0],'window.WORKSPACE_BUILD='+JSON.stringify(meta)+';\n');
await writeFile('dist/silicon-photonics-textbook-v0.12.5.html',html);await writeFile('dist/workspace-u4-build-info.json',JSON.stringify({...meta,htmlSha256:sha(html)},null,2)+'\n');await writeFile('dist/WORKSPACE_U4_SHA256SUMS.txt',sha(html)+'  silicon-photonics-textbook-v0.12.5.html\n');console.log('Built U4 all79: '+sha(html));
