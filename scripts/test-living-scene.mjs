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

  // Navigate and prime state to Chapter 1 (shadows)
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const s = {
      completed: ['workshop'],
      active: 'shadows',
      muted: true,
      easter: false,
      started: true,
    };
    localStorage.setItem('morrow-v2', JSON.stringify(s));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  // 1. Beat 0: Duck speaking with anchored balloon
  await page.screenshot({ path: path.join(outDir, 'loop11_01_beat0_duck_390px.png'), fullPage: true });

  // 2. Advance to Beat 1: Sir Clack speaking
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop11_02_beat1_clack_390px.png'), fullPage: true });

  // 3. Advance to Beat 2: Pipkin speaking
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop11_03_beat2_pipkin_390px.png'), fullPage: true });

  // 4. Advance to Beat 3: Morrow speaking
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'loop11_04_beat3_morrow_390px.png'), fullPage: true });

  // 5. Test Cinematic Reveal Film Modal
  await page.getByRole('button', { name: /reveal film/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'loop11_05_cinematic_bridge_390px.png'), fullPage: true });

  // Return to scene
  await page.getByRole('button', { name: /return to scene/i }).click();
  await page.waitForTimeout(300);

  // 6. Enter Tactile Shadow Stitcher
  await page.getByRole('button', { name: /turn the page/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'loop11_06_stitcher_initial_390px.png'), fullPage: true });

  // Simulate drag-to-stitch on Seam 1 (Trunk Anchor)
  const svgEl = await page.locator('.tactile-shadow-svg');
  await svgEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const box = await svgEl.boundingBox();
  if (box) {
    const startX = box.x + box.width * (200 / 400);
    const startY = box.y + box.height * (412 / 460);
    const midX = box.x + box.width * (195 / 400);
    const midY = box.y + box.height * (332 / 460);
    const endX = box.x + box.width * (186 / 400);
    const endY = box.y + box.height * (252 / 460);

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(midX, midY, { steps: 5 });
    await page.waitForTimeout(100);
    await page.screenshot({ path: path.join(outDir, 'loop11_07_stitcher_dragging_390px.png'), fullPage: true });
    await page.mouse.move(endX, endY, { steps: 5 });
    await page.mouse.up();
  }

  // Complete all 3 seams via accessible resident buttons
  const treeBtn = page.getByRole('button', { name: /tree shadow/i });
  await treeBtn.scrollIntoViewIfNeeded();
  await treeBtn.click();
  const starBtn = page.getByRole('button', { name: /star shadow/i });
  await starBtn.scrollIntoViewIfNeeded();
  await starBtn.click();
  const duckBtn = page.getByRole('button', { name: /duck shadow/i });
  await duckBtn.scrollIntoViewIfNeeded();
  await duckBtn.click();
  await page.waitForTimeout(500);

  // 7. Beat 5: Celebration Payoff
  await page.screenshot({ path: path.join(outDir, 'loop11_08_celebration_payoff_390px.png'), fullPage: true });

  // Desktop Viewport Test (1280px)
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(base, { waitUntil: 'domcontentloaded' });
  await desktopPage.evaluate(() => {
    const s = {
      completed: ['workshop'],
      active: 'shadows',
      muted: true,
      easter: false,
      started: true,
    };
    localStorage.setItem('morrow-v2', JSON.stringify(s));
  });
  await desktopPage.reload({ waitUntil: 'domcontentloaded' });
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: path.join(outDir, 'loop11_09_desktop_stage_1280px.png'), fullPage: true });

  await context.close();
  await desktopContext.close();
  console.log('LOOP 11 VISUAL QA CAPTURE COMPLETE: Screenshots saved to master_delivery');
} finally {
  await browser.close();
}
