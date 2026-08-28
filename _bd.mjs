import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1200,height:800},deviceScaleFactor:1.2});
await p.goto('http://localhost:8123/about.html',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(500); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'});await p.waitForTimeout(150);
const el=await p.$('#borders'); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${out}/about-borders.png`});
console.log('ok'); await b.close();
