import { chromium } from 'playwright-core';
const exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out = '/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b = await chromium.launch({ executablePath: exe, args:['--no-sandbox'] });
const base='http://localhost:8123';
const rv = `.reveal{opacity:1 !important;transform:none !important;}`;
async function grab(vp, name, url, sel, drawer){
  const p = await b.newPage({viewport:vp, deviceScaleFactor: vp.width<500?2:1.25});
  await p.goto(base+url,{waitUntil:'domcontentloaded'}).catch(()=>{});
  await p.waitForTimeout(500); await p.addStyleTag({content:rv}); await p.waitForTimeout(200);
  if(drawer){ await p.click('.hamburger').catch(()=>{}); await p.waitForTimeout(400); }
  if(sel){const el=await p.$(sel); if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(150);await el.screenshot({path:`${out}/${name}.png`});console.log('ok',name);}else console.log('MISS',sel,name);}
  else {await p.screenshot({path:`${out}/${name}.png`,fullPage:true});console.log('ok',name);}
  await p.close();
}
// desktop nav at a mid width where crowding shows
await grab({width:1024,height:800},'ux-nav-1024','/massage.html','nav.nav');
await grab({width:1440,height:900},'ux-nav-1440','/index.html','nav.nav');
// mobile membership table stacking
await grab({width:390,height:844},'ux-m-pricing','/massage.html','#mas-pricing');
await grab({width:390,height:844},'ux-m-training','/training.html',null);
await grab({width:390,height:844},'ux-m-drawer','/index.html',null,true);
await grab({width:390,height:844},'ux-m-borders','/index.html','#borders');
// desktop home services (2 cards) + massage treatments
await grab({width:1280,height:900},'ux-services','/index.html','#services');
await grab({width:1280,height:900},'ux-treat','/massage.html','.treatments');
await b.close(); console.log('done');
