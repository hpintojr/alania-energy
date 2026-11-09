const {chromium}=require('playwright');const fs=require('fs');
const axeSrc=fs.readFileSync('node_modules/axe-core/axe.min.js','utf8');
(async()=>{const b=await chromium.launch();const routes=['/','/natural-gas','/nuclear','/technology','/campus','/research-industrial','/green-technology','/contact','/investors','/investors?error=invalid','/privacy','/terms','/accessibility'];
const all={};
for (const [vw,label] of [[1280,'desk'],[390,'phone']]){
 const ctx=await b.newContext({viewport:{width:vw,height:900}});
 for (const r of routes){const p=await ctx.newPage();await p.goto('http://localhost:3140'+r,{waitUntil:'networkidle'});await p.addScriptTag({content:axeSrc});
  const res=await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
  for (const v of res.violations){const k=v.id;all[k]=all[k]||{impact:v.impact,help:v.help,where:new Set(),nodes:new Set()};all[k].where.add(label+' '+r);v.nodes.slice(0,4).forEach(n=>all[k].nodes.add(n.target.join(' ')+' | '+(n.any[0]?.message||n.failureSummary||'').slice(0,110)));}
  await p.close();}
 await ctx.close();}
for (const [k,v] of Object.entries(all)){console.log('\n##',k,v.impact,'-',v.help,'\n  pages:',[...v.where].slice(0,6).join(', '));[...v.nodes].slice(0,8).forEach(n=>console.log('   -',n));}
if(!Object.keys(all).length)console.log('NO VIOLATIONS');await b.close();})();
