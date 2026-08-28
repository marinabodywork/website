import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
async function shot(vp,name,url,sel,lang){
  const p=await b.newPage({viewport:vp,deviceScaleFactor:vp.width<500?2:1.2});
  await p.goto('http://localhost:8123'+url,{waitUntil:'networkidle'}).catch(()=>{});
  if(lang){await p.evaluate(l=>{try{localStorage.setItem('marinaLang',l)}catch(e){}},lang);await p.reload({waitUntil:'networkidle'}).catch(()=>{});}
  await p.waitForTimeout(700); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'});await p.waitForTimeout(200);
  if(sel){const el=await p.$(sel);await el.screenshot({path:`${out}/${name}.png`});}else await p.screenshot({path:`${out}/${name}.png`});
  console.log(name); await p.close();
}
await shot({width:1440,height:820},'h-hero','/index.html','.hero');
await shot({width:1440,height:120},'h-nav','/index.html','nav.nav');
await shot({width:1180,height:120},'h-nav-1180','/massage.html','nav.nav');
await shot({width:390,height:844},'h-hero-m','/index.html','.hero',null);
await shot({width:1440,height:820},'h-hero-pt','/index.html','.hero','pt');
await b.close();
