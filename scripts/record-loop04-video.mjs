import { chromium } from 'playwright';
import path from 'path';

const recordDir = 'C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/comic_loop04_delivery/recordings';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
  recordVideo: {
    dir: recordDir,
    size: { width: 390, height: 844 }
  }
});

const page = await context.newPage();
await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.removeItem('morrow-v2'));
await page.reload();

await page.waitForTimeout(600);
await page.getByRole('button', { name: /open the story/i }).click();
await page.waitForTimeout(800);

// Ring the bell
await page.getByRole('button', { name: /ring the bell/i }).first().click();
await page.waitForTimeout(700);

// Unroll each panel with a small pause
for (let i = 0; i < 7; i++) {
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(650);
}

// Smooth scroll through all panels from top to bottom
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(600);

const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const step = 350;
for (let y = 0; y < totalHeight; y += step) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), y);
  await page.waitForTimeout(300);
}

await page.waitForTimeout(1000);
await page.close();
await context.close();
await browser.close();
console.log('Mobile scroll-through video recorded successfully.');
