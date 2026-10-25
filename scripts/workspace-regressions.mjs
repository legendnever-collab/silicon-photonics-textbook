// Original assertions stay byte-identical. Only artifact output/browser/target routing changes.
import{readFile,writeFile,mkdtemp,rm,mkdir}from'node:fs/promises';import{join}from'node:path';import{spawn}from'node:child_process';import{createHash}from'node:crypto';
const mode=process.argv[2]||'integrated',suites=mode==='archived'?['browser','figures-browser',...Array.from({length:11},(_,i)=>'ch'+(i+2)+'-browser')]:['ch12-browser'];
const dir=await mkdtemp(join(process.cwd(),'tests','.workspace-regression-')),records=[],out='artifacts/v0.12.1/'+mode;await mkdir(out,{recursive:true});
try{for(const name of suites){const path='tests/'+name+'.mjs',source=await readFile(path,'utf8');let test=source.replaceAll(/artifacts\/v0\.[0-9.]+/g,out+'/'+name);
if(process.env.BROWSER_EXECUTABLE_PATH)test=test.replaceAll('headless:true,',`headless:true,executablePath:${JSON.stringify(process.env.BROWSER_EXECUTABLE_PATH)},`);
if(mode==='integrated')test=test.replaceAll('silicon-photonics-textbook-v0.12.0.html','silicon-photonics-textbook-v0.12.1.html').replaceAll('dist/ch12-build-info.json','dist/workspace-build-info.json');
const file=join(dir,name+'.mjs');await writeFile(file,test);console.log('RUN '+mode+' '+name);
const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[file],{stdio:['ignore','pipe','pipe'],env:{...process.env,TEXTBOOK_HTML:''}});let log='';child.stdout.on('data',x=>{log+=x;process.stdout.write(x)});child.stderr.on('data',x=>{log+=x;process.stderr.write(x)});child.on('error',reject);child.on('close',async code=>{await writeFile(out+'/'+name+'.log',log);resolve(code)})});
records.push({name,sourceSha256:createHash('sha256').update(source).digest('hex'),exitCode:code});if(code!==0)throw Error(mode+' '+name+' failed; see log');}}
finally{await writeFile(out+'/suite-routing.json',JSON.stringify({mode,changes:'Only output directory, browser executable and integrated artifact/build-info target. Original assertions unmodified.',suites:records},null,2)+'\n');await rm(dir,{recursive:true,force:true})}
