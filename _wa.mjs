import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1.4});
await p.goto('http://localhost:8123/training.html',{waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(600); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'});await p.waitForTimeout(150);
const el=await p.$('.availability-note'); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${out}/wa-avail.png`});
// PT check on home consult
await p.goto('http://localhost:8123/index.html',{waitUntil:'networkidle'}).catch(()=>{});
await p.evaluate(()=>{try{localStorage.setItem('marinaLang','pt')}catch(e){}}); await p.reload({waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(600); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'});await p.waitForTimeout(150);
const c=await p.$('#consult'); if(c){await c.scrollIntoViewIfNeeded(); await c.screenshot({path:`${out}/wa-consult-pt.png`});}
console.log('ok'); await b.close();
