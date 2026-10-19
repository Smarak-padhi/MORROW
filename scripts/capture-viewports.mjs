import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.removeItem('morrow-v2'));
await page.reload();
await page.getByRole('button', { name: /open the story/i }).click();
await page.getByRole('button', { name: /ring the bell/i }).click();
for (let i = 0; i < 7; i++) await page.getByRole('button', { name: /turn the page/i }).click();

const outDir = 'C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/comic_loop03_screenshots';

const panels = await page.locator('.comic-panel').all();
for (let i = 0; i < panels.length; i++) {
  await panels[i].scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(outDir, `viewport_panel_${i+1}_390px.png`) });
}
await browser.close();
console.log('Viewport shots captured.');
