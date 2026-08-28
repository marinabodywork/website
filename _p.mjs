import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1280,height:1000},deviceScaleFactor:1});
await p.goto('http://localhost:8123/training.html',{waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(700); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'}); await p.waitForTimeout(300);
const el=await p.$('.section--dark'); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${out}/photo-band.png`});
console.log('ok'); await b.close();
