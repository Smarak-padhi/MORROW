import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const browser = await chromium.launch({ headless: true });
const viewports = [
  { name: '320px', width: 320, height: 600 },
  { name: '390px', width: 390, height: 844 },
  { name: '430px', width: 430, height: 932 },
  { name: 'desktop', width: 1280, height: 800 }
];

const outDir = 'C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/comic_loop04_delivery';
fs.mkdirSync(outDir, { recursive: true });

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.removeItem('morrow-v2'));
  await page.reload();
  await page.getByRole('button', { name: /open the story/i }).click();
  await page.getByRole('button', { name: /ring the bell/i }).click();
  for (let i = 0; i < 7; i++) await page.getByRole('button', { name: /turn the page/i }).click();

  const panels = await page.locator('.comic-panel').all();

  // Capture all 9 panels at this viewport
  for (let i = 0; i < panels.length; i++) {
    await panels[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await panels[i].screenshot({
      path: path.join(outDir, `panel_${i + 1}_${vp.name}.png`)
    });
  }

  // Full page scroll screenshot
  await page.screenshot({
    path: path.join(outDir, `workshop_fullpage_${vp.name}.png`),
    fullPage: true
  });

  await page.close();
}

await browser.close();
console.log('Comic Loop 04 delivery screenshots captured across 320px, 390px, 430px, and desktop.');
