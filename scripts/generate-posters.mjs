import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const files = fs.readdirSync('public/cinematics').filter(f => f.endsWith('.mp4'));

for (const f of files) {
  const filePath = `http://127.0.0.1:4173/cinematics/${f}`;
  await page.goto(filePath, { waitUntil: 'domcontentloaded' });
  const meta = await page.evaluate(async () => {
    const v = document.querySelector('video');
    if (!v) return null;
    v.muted = true;
    v.playsInline = true;
    await new Promise(r => {
      if (v.readyState >= 1) r();
      else v.onloadedmetadata = r;
    });
    v.currentTime = Math.min(2.0, (v.duration || 5) * 0.4);
    await new Promise(r => { v.onseeked = r; setTimeout(r, 1000); });
    return { duration: v.duration, w: v.videoWidth, h: v.videoHeight };
  });
  console.log(f, meta);
  const posterPath = path.join('public/cinematics', f.replace('.mp4', '-poster.jpg'));
  await page.screenshot({ path: posterPath });
}

await browser.close();
console.log('Video metadata and posters created.');
