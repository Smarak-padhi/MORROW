import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = 'C:\\Users\\smara\\.gemini\\antigravity\\brain\\8108cb18-00a2-48e4-a809-40432b736722\\master_delivery';
await fs.mkdir(outDir, { recursive: true });

const base = process.env.MORROW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });

try {
  // Mobile Viewport Test (390px - iPhone 14/15)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  // Navigate and prime state to Chapter 2 (weather)
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const s = {
      completed: ['workshop', 'shadows'],
      active: 'weather',
      muted: true,
      easter: false,
      started: true,
    };
    localStorage.setItem('morrow-v2', JSON.stringify(s));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  // 1. Beat 0: Frog Mayor speaking with umbrella bucket and anchored balloon
  await page.screenshot({ path: path.join(outDir, 'loop12_01_beat0_frog_390px.png'), fullPage: true });

  // 2. Advance to Beat 1: Morrow speaking
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop12_02_beat1_morrow_390px.png'), fullPage: true });

  // 3. Advance to Beat 2: Sir Clack speaking
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop12_03_beat2_clack_390px.png'), fullPage: true });

  // 4. Advance to Beat 3: Pipkin speaking upside-down
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop12_04_beat3_pipkin_390px.png'), fullPage: true });

  // 5. Test Cinematic Reveal Film Modal
  await page.getByRole('button', { name: /reveal film/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'loop12_05_cinematic_bridge_390px.png'), fullPage: true });

  // Return to scene
  await page.getByRole('button', { name: /return to scene/i }).click();
  await page.waitForTimeout(300);

  // 6. Enter Tactile Weather Loom
  await page.getByRole('button', { name: /weave the sky|turn the page/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'loop12_06_loom_initial_390px.png'), fullPage: true });

  // 7. Simulate drag-to-weave on Spool 1 (Rain -> Lilies)
  const svgEl = await page.locator('.tactile-weather-svg');
  await svgEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const box = await svgEl.boundingBox();
  if (box) {
    // Rain spool is at (50, 110) in 540x460 viewBox
    const startX = box.x + box.width * (50 / 540);
    const startY = box.y + box.height * (110 / 460);
    const midX = box.x + box.width * (130 / 540);
    const midY = box.y + box.height * (170 / 460);

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(midX, midY, { steps: 5 });
    await page.waitForTimeout(100);
    await page.screenshot({ path: path.join(outDir, 'loop12_07_loom_dragging_390px.png'), fullPage: true });
    await page.mouse.up();
  }

  // 8. Complete all 3 spools via accessible resident buttons
  const liliesBtn = page.getByRole('button', { name: /thirsty lilies/i });
  await liliesBtn.scrollIntoViewIfNeeded();
  await liliesBtn.click();
  await page.waitForTimeout(150);

  const windmillBtn = page.getByRole('button', { name: /frozen windmill/i });
  await windmillBtn.scrollIntoViewIfNeeded();
  await windmillBtn.click();
  await page.waitForTimeout(150);

  const frogBtn = page.getByRole('button', { name: /frog mayor/i });
  await frogBtn.scrollIntoViewIfNeeded();
  await frogBtn.click();
  await page.waitForTimeout(500);

  // 9. Chapter Payoff & Celebration Card (390px)
  await page.screenshot({ path: path.join(outDir, 'loop12_08_celebration_payoff_390px.png'), fullPage: true });

  // 10. Desktop Viewport (1280px)
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(base, { waitUntil: 'domcontentloaded' });
  await desktopPage.evaluate(() => {
    const s = {
      completed: ['workshop', 'shadows'],
      active: 'weather',
      muted: true,
      easter: false,
      started: true,
    };
    localStorage.setItem('morrow-v2', JSON.stringify(s));
  });
  await desktopPage.reload({ waitUntil: 'domcontentloaded' });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(outDir, 'loop12_09_desktop_stage_1280px.png'), fullPage: true });

  console.log('WEATHER SCENE QA COMPLETE: 9 screenshots captured.');
} finally {
  await browser.close();
}
