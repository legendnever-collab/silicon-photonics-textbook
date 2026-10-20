import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const lessons=[];
for(const name of (await readdir(new URL('textbook/chapter-01/',root))).filter(x=>x.endsWith('.json')).sort()) {
  const lesson=JSON.parse(await read('textbook/chapter-01/'+name));
  lesson.tutor=JSON.parse(await read('tutor/'+lesson.id+'.json'));
  lessons.push(lesson);
}
const [template,style,models,app,figureStyle,figureRenderer,figureCatalog]=await Promise.all(['src/index.html','src/styles.css','notebook/models.js','src/app.js','figures/styles.css','figures/renderer.js','figures/catalog.json'].map(read));
const sources=['figures/catalog.json','figures/styles.css','figures/renderer.js','src/index.html','src/styles.css','src/app.js','notebook/models.js','assets/pretendard-ch1.b64','assets/Pretendard-LICENSE.txt',...lessons.flatMap(l=>['textbook/chapter-01/'+l.id+'.json','tutor/'+l.id+'.json'])];
const hash=createHash('sha256');
for(const path of sources.sort()) hash.update(path+'\0'+await read(path)+'\0');
const sourceHash=hash.digest('hex');
const safeData=JSON.stringify({lessons,figures:JSON.parse(figureCatalog),sourceHash}).replace(/</g,'\\u003c');
const font=await read('assets/pretendard-ch1.b64');
const fontLicense=await read('assets/Pretendard-LICENSE.txt');
const html=template.replace('/* STYLE */',()=>`/* ${fontLicense.replaceAll('*/','* /')} */\n@font-face{font-family:TextbookKR;src:url(data:font/woff;base64,${font.trim()}) format('woff');font-style:normal;font-weight:400;font-display:swap}`+style+figureStyle).replace('/* DATA */',()=>`window.TEXTBOOK=${safeData};`).replace('/* MODELS */',()=>models).replace('/* FIGURES */',()=>figureRenderer).replace('/* APP */',()=>app);
await mkdir(new URL('dist/',root),{recursive:true});
await writeFile(new URL('dist/chapter-01.html',root),html);
const sha=createHash('sha256').update(html).digest('hex');
await writeFile(new URL('dist/SHA256SUMS.txt',root),`${sha}  chapter-01.html\n`);
await writeFile(new URL('dist/build-info.json',root),JSON.stringify({version:'0.1.1',lessons:lessons.map(l=>l.id),sourceHash,htmlSha256:sha},null,2)+'\n');
console.log(`Built ${lessons.length} lessons; HTML SHA256 ${sha}`);
