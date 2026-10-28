// Original assertions remain intact; only artifact/build-info/output routing changes.
import{readFile,writeFile,mkdtemp,rm}from'node:fs/promises';import{join}from'node:path';import{spawn}from'node:child_process';
const mode=process.argv[2]||'integrated',dir=await mkdtemp(join(process.cwd(),mode!=='integrated'?'tests/.workspace-u3-':'scripts/.workspace-u3-'));
try{
 let source=await readFile(mode==='u2'?'tests/workspace-u2-browser.mjs':mode==='all'?'tests/workspace-all-browser.mjs':'scripts/workspace-regressions.mjs','utf8');
 source=source.replaceAll(mode==='u2'?'v0.12.3':mode==='all'?'v0.12.2':'v0.12.1','v0.12.4').replaceAll(mode==='u2'?'workspace-u2-build-info.json':mode==='all'?'workspace-all-build-info.json':'workspace-build-info.json','workspace-u3-build-info.json');
 const path=join(dir,'runner.mjs');await writeFile(path,source);
 const code=await new Promise((resolve,reject)=>{const p=spawn(process.execPath,[path,...(mode!=='integrated'?[]:['integrated'])],{stdio:'inherit',env:process.env});p.on('close',resolve);p.on('error',reject);});if(code!==0)throw Error('U3 original regression failed');
}finally{await rm(dir,{recursive:true,force:true});}
