import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
const rv='.reveal{opacity:1!important;transform:none!important;}';
async function g(vp,name,url,sel,drawer){
  const p=await b.newPage({viewport:vp,deviceScaleFactor:vp.width<500?2:1});
  await p.goto('http://localhost:8123'+url,{waitUntil:'domcontentloaded'}).catch(()=>{});
  await p.waitForTimeout(500); await p.addStyleTag({content:rv}); await p.waitForTimeout(200);
  if(drawer){await p.click('.hamburger').catch(()=>{});await p.waitForTimeout(400);}
  if(sel){const el=await p.$(sel); if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(150);await el.screenshot({path:`${out}/${name}.png`});console.log(name);}else console.log('MISS',sel,name);}
  else{await p.screenshot({path:`${out}/${name}.png`,fullPage:true});console.log(name);}
  await p.close();
}
await g({width:390,height:844},'u-m-mas','/massage.html','#mas-pricing');
await g({width:390,height:844},'u-m-train','/training.html',null);
await g({width:390,height:844},'u-m-drawer','/index.html',null,true);
await g({width:390,height:844},'u-m-home','/index.html','.hero');
await b.close();
