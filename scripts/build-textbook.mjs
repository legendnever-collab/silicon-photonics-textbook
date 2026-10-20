import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=p=>readFile(p,'utf8'),lessons=[],sources=[];
for(const chapter of ['01','02'])for(const name of (await readdir('textbook/chapter-'+chapter)).filter(x=>x.endsWith('.json')).sort()){
 const path='textbook/chapter-'+chapter+'/'+name,l=JSON.parse(await read(path)),t=chapter==='01'?'tutor/'+l.id+'.json':'tutor/chapter-02/'+l.id+'.json';l.tutor=JSON.parse(await read(t));lessons.push(l);sources.push(path,t);
}
const files=['src/index.html','src/styles.css','src/app.js','notebook/models.js','notebook/ch2-models.js','notebook/ch2-notebook.js','figures/styles.css','figures/renderer.js','figures/ch2-renderer.js','figures/catalog.json','figures/ch2-catalog.json','notebook/data/scalar-modes.json','assets/pretendard-ch1.b64','assets/Pretendard-LICENSE.txt'];sources.push(...files,'scripts/build-textbook.mjs');
const hash=createHash('sha256');for(const p of sources.sort())hash.update(p+'\0'+await read(p)+'\0');const sourceHash=hash.digest('hex');
const data={lessons,figures:[...JSON.parse(await read('figures/catalog.json')),...JSON.parse(await read('figures/ch2-catalog.json'))],scalar:JSON.parse(await read('notebook/data/scalar-modes.json')),sourceHash,multiChapter:true};
const template=(await read('src/index.html')).replace('Chapter 1 · Interactive','Chapters 1–2 · Interactive').replace('aria-label="Chapter 1 Lesson"','aria-label="교재 Lesson"');
const [style,figureStyle,models,passiveModels,figureRenderer,ch2Renderer,ch2Notebook,app]=await Promise.all(['src/styles.css','figures/styles.css','notebook/models.js','notebook/ch2-models.js','figures/renderer.js','figures/ch2-renderer.js','notebook/ch2-notebook.js','src/app.js'].map(read));
const font=await read('assets/pretendard-ch1.b64'),license=await read('assets/Pretendard-LICENSE.txt');
const html=template.replace('/* STYLE */',()=>`/* ${license.replaceAll('*/','* /')} */\n@font-face{font-family:TextbookKR;src:url(data:font/woff;base64,${font.trim()}) format('woff');font-style:normal;font-weight:400;font-display:swap}`+style+figureStyle)
 .replace('/* DATA */',()=>`window.TEXTBOOK=${JSON.stringify(data).replace(/</g,'\\u003c')};`)
 .replace('/* MODELS */',()=>models+'\n'+passiveModels)
 .replace('/* FIGURES */',()=>figureRenderer+'\n'+ch2Renderer+'\n'+ch2Notebook)
 .replace('/* APP */',()=>app);
await mkdir('dist',{recursive:true});
const path='dist/silicon-photonics-textbook-v0.2.0.html';await writeFile(path,html);
const sha=createHash('sha256').update(html).digest('hex');
await writeFile('dist/textbook-build-info.json',JSON.stringify({version:'0.2.0',lessons:lessons.map(l=>l.id),sources,sourceHash,htmlSha256:sha},null,2)+'\n');
await writeFile('dist/TEXTBOOK_SHA256SUMS.txt',`${sha}  silicon-photonics-textbook-v0.2.0.html\n`);
console.log(`Built ${lessons.length} lessons; HTML SHA256 ${sha}`);
