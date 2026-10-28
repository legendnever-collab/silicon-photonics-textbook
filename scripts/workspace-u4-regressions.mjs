// Original files and assertions remain archived. U3 has one explicit availability expectation adapted for the authorized all-lesson rollout.
import{readFile,writeFile,mkdtemp,rm}from'node:fs/promises';import{join}from'node:path';import{spawn}from'node:child_process';
const mode=process.argv[2]||'integrated',dir=await mkdtemp(join(process.cwd(),mode==='integrated'?'scripts/.workspace-u4-':'tests/.workspace-u4-'));
try{
 const spec={all:['tests/workspace-all-browser.mjs','v0.12.2','workspace-all-build-info.json'],u2:['tests/workspace-u2-browser.mjs','v0.12.3','workspace-u2-build-info.json'],u3:['tests/workspace-u3-browser.mjs','v0.12.4','workspace-u3-build-info.json'],integrated:['scripts/workspace-regressions.mjs','v0.12.1','workspace-build-info.json']}[mode];if(!spec)throw Error('Unknown suite');
 let source=await readFile(spec[0],'utf8');source=source.replaceAll(spec[1],'v0.12.5').replaceAll(spec[2],'workspace-u4-build-info.json');
 if(mode==='u3'){
  const old="assert.equal(await p.locator('#u3-learning').count(),0,'nonpilot unchanged')",updated="assert.equal(await p.locator('#u3-learning').count(),1,'authorized all-lesson U3 rollout')";
  if(source.split(old).length!==2)throw Error('U3 scope expectation changed');source=source.replace(old,updated);
 }
 const file=join(dir,'runner.mjs');await writeFile(file,source);
 const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[file,...(mode==='integrated'?['integrated']:[])],{stdio:'inherit',env:process.env});child.on('close',resolve);child.on('error',reject);});if(code!==0)throw Error('U4 '+mode+' regression failed');
}finally{await rm(dir,{recursive:true,force:true});}
