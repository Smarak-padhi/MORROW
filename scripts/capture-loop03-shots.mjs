import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const browser = await chromium.launch({ headless: true });
const viewports = [320, 390, 430];
const outDir = 'C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/comic_loop03_screenshots';
fs.mkdirSync(outDir, { recursive: true });

for (const width of viewports) {
  const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.removeItem('morrow-v2'));
  await page.reload();
  await page.getByRole('button', { name: /open the story/i }).click();
  await page.getByRole('button', { name: /ring the bell/i }).click();
  for (let i = 0; i < 7; i++) await page.getByRole('button', { name: /turn the page/i }).click();

  const panels = await page.locator('.comic-panel').all();
  
  // Panel 1: Establish (index 0)
  await panels[0].scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await panels[0].screenshot({ path: path.join(outDir, `panel_1_establish_${width}px.png`) });

  // Panel 3: Reaction (index 2)
  await panels[2].scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await panels[2].screenshot({ path: path.join(outDir, `panel_3_reaction_${width}px.png`) });

  // Panel 5: Clack (index 4)
  await panels[4].scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await panels[4].screenshot({ path: path.join(outDir, `panel_5_clack_${width}px.png`) });

  // Panel 6: Hello (index 5)
  await panels[5].scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await panels[5].screenshot({ path: path.join(outDir, `panel_6_hello_${width}px.png`) });

  await page.close();
}
await browser.close();
console.log('Screenshots captured successfully.');
