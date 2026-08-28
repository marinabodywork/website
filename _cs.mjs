import { chromium } from 'playwright-core';
const exe='/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const out='/tmp/claude-0/-home-user-website/c77d56a1-be7a-5bbf-bcef-d02cf8d4f9d8/scratchpad';
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1.4});
await p.goto('http://localhost:8123/training.html',{waitUntil:'networkidle'}).catch(()=>{});
await p.waitForTimeout(600); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;}'});await p.waitForTimeout(200);
// hover the middle card to show animation state
const cards=await p.$$('.plan-card'); if(cards[1]) await cards[1].hover();
await p.waitForTimeout(500);
const el=await p.$('.plan-grid'); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${out}/cards-style.png`});
console.log('ok'); await b.close();
