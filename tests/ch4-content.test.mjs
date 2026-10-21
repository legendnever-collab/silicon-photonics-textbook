import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import{createHash}from'node:crypto';
for(let i=1;i<=7;i++)test('Chapter 4.'+i+' substantive textbook and misconception-sensitive tutor',()=>{
 const l=JSON.parse(fs.readFileSync('textbook/chapter-04/4.'+i+'.json','utf8')),t=JSON.parse(fs.readFileSync('tutor/chapter-04/4.'+i+'.json','utf8'));
 assert.deepEqual(l.sections.map(x=>x.key),['why','concept','equation','tutor','experiment','summary']);
 assert.ok(l.sections[1].html.length>=900,'concept prose too short '+l.id);
 assert.match(l.sections[2].html,/Worked Example/);
 assert.ok(l.sections[2].html.includes('equation'));
 assert.equal(t.choices.length,3);assert.equal(t.choices.filter(x=>x.correct).length,1);
 assert.equal(new Set(t.choices.map(x=>x.feedback)).size,3);
 for(const k of['why','simple','math','notebook'])assert.ok(t[k].length>35,k);
 assert.equal(l.predictionOptions.length,4);assert.ok(l.reflection.length>20);
 assert.ok(l.sections.every(x=>x.html.length>50));
});
test('Chapter 6 source mapping covers original sections in order',()=>{
 const m=fs.readFileSync('docs/CH4_TEXTBOOK_SOURCE_MAPPING.md','utf8');
 for(const x of ['6.1','6.1.1','6.2.1','6.2.2','6.2.3','6.2.4','6.3.1','6.3.2','6.3.3','6.4.1','6.5.1','6.5.2','6.6','6.7','6.8'])assert.ok(m.includes(x),x);
});
test('14 chapter-4 figures use classified and reproducible renderer',()=>{
 const cat=JSON.parse(fs.readFileSync('figures/ch4-catalog.json','utf8'));
 const ctx={TEXTBOOK:{figures:cat,scalar:{}}};vm.createContext(ctx);
 for(const path of['notebook/models.js','notebook/ch4-models.js','figures/renderer.js','figures/ch4-renderer.js'])vm.runInContext(fs.readFileSync(path,'utf8'),ctx);
 assert.equal(cat.length,14);assert.equal(new Set(cat.map(f=>f.id)).size,cat.length);
 for(const f of cat){assert.ok(['Analytical','Conceptual'].includes(f.classification));for(const k of ['see','notice','meaning','parameters','limits','source','anchor'])assert.ok(f[k]?.length>10,k+f.id);const g=ctx.TeachingFigures.render(f.id);assert.match(g.graphic,/<svg/);assert.ok(g.values.length>25);}
});
test('Chapter 4 uses separate persistent storage with v3/v2 fallback',()=>{
 const app=fs.readFileSync('src/app.js','utf8'),build=fs.readFileSync('scripts/build-chapter4.mjs','utf8');
 assert.ok(app.includes('Ch4Notebook.sanitize'));assert.ok(app.includes('Ch4Notebook.update'));
 for(const s of ['sipt-textbook-v4','sipt-textbook-v3',"'04'",'ch4-models.js','ch4-renderer.js','ch4-notebook.js'])assert.ok(build.includes(s));
 assert.ok(build.includes('v0.4.0.html'));
});
test('v0.3.0 standalone and chapter 1/2 preserved',()=>{
 const files={'dist/silicon-photonics-textbook-v0.3.0.html':'0f55380c219f31ec57b90288f529d8be32eea3d0fbedba5374d83c8e6602a8ad','dist/silicon-photonics-textbook-v0.2.0.html':'f108bb1ef4c90598ca56f1f806a3fc46c2bf2fa55666288b2754bac1372a7a68','dist/chapter-01.html':'35d44b6e612e16633d819aaba2a1b0372d5c96e1b16ffeb1553cb89320f17da1'};
 for(const [path,expected]of Object.entries(files))assert.equal(createHash('sha256').update(fs.readFileSync(path)).digest('hex'),expected,path);
});
