import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/screenshots/loop10');
const brainDir = path.resolve('C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/master_delivery');

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(brainDir, { recursive: true });

const base = process.env.MORROW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });

try {
  // --- 1. NORMAL MOTION CAPTURE (Duck Video Player + Controls + Ground Shadow) ---
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'no-preference'
  });

  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('morrow-v2', JSON.stringify({
      completed: ['workshop'],
      active: 'shadows',
      muted: true,
      easter: false,
      started: true
    }));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  // Capture Beat 01/03: Normal Motion Stage with CinematicVideoPlayer
  async function saveSnap(filename) {
    const localP = path.join(outDir, filename);
    const brainP = path.join(brainDir, filename);
    await page.screenshot({ path: localP });
    await fs.copyFile(localP, brainP);
    console.log(`Captured: ${filename}`);
  }

  await saveSnap('shadows_01_cinematic_player_390px.png');

  // Turn dialogue pages to reveal puzzle
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(300);

  // Solve puzzle
  for (const [resident, shadow] of [
    ['Village Duck', 'Tree shadow'],
    ['Little Lantern', 'Star shadow'],
    ['Wandering Snail', 'Duck shadow']
  ]) {
    await page.getByRole('button', { name: new RegExp(resident, 'i') }).click();
    await page.locator('.choice-card').filter({ hasText: new RegExp(shadow, 'i') }).click();
  }
  await page.waitForTimeout(400);

  // Capture Beat 06 Minigame Payoff Card & Step Button
  await page.locator('.chapter-payoff-card').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await saveSnap('shadows_02_minigame_payoff_390px.png');

  // Scroll to top to capture Beat 06 Stage Payoff Banner
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await saveSnap('shadows_03_stage_payoff_banner_390px.png');

  await page.close();
} finally {
  await browser.close();
  console.log('--- SHADOW CINEMATICS INSPECTION CAPTURE COMPLETE ---');
}
