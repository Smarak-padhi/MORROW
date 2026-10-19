import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/screenshots/loop07');
const brainDir = path.resolve('C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722/master_delivery');

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(brainDir, { recursive: true });

const base = process.env.MORROW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });

try {
  // 1. Mobile Walkthrough (390 x 844)
  console.log('--- Capturing Mobile (390px) Full Adventure ---');
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce'
  });

  // Reset state
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.removeItem('morrow-v2');
    localStorage.removeItem('morrow-v1');
  });
  await page.reload();

  // Helper for screenshot & copy to brain
  async function snap(filename, fullPage = false) {
    const localPath = path.join(outDir, filename);
    const brainPath = path.join(brainDir, filename);
    await page.screenshot({ path: localPath, fullPage });
    await fs.copyFile(localPath, brainPath);
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Opening
  await snap('00_opening_390px.png');
  await page.getByRole('button', { name: /open the story/i }).click();

  // 2. Prologue (The Workshop)
  await page.getByRole('button', { name: /ring the bell/i }).click();
  for (let i = 0; i < 7; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('01_workshop_comic_390px.png');

  // Step to Lost Shadows
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('02_shadows_stage_390px.png');

  // Solve Shadow Stitcher
  for (const [resident, shadow] of [['Village Duck','Tree shadow'],['Little Lantern','Star shadow'],['Wandering Snail','Duck shadow']]) {
    await page.getByRole('button', { name: new RegExp(resident,'i') }).click();
    await page.getByRole('button', { name: new RegExp(shadow,'i') }).click();
  }
  await page.waitForTimeout(300);
  await snap('02_shadows_puzzle_solved_390px.png');

  // Step to Weather Forest
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('03_weather_stage_390px.png');

  // Solve Weather Loom
  const weatherPairs = [['Gentle Downpour','Thirsty Lilies'],['Whistling Breeze','Frozen Windmill'],['Golden Sunbeam','Frog Mayor']];
  for (const [thread, target] of weatherPairs) {
    await page.getByRole('button', { name: new RegExp(thread,'i') }).click();
    await page.getByRole('button', { name: new RegExp(target,'i') }).click();
  }
  await page.waitForTimeout(300);
  await snap('03_weather_puzzle_solved_390px.png');

  // Step to Tomorrow Town
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('04_clock_stage_390px.png');

  // Solve Clock
  for (const gear of ['Shadow Cog','Weather Spring','Crooked Heart Key']) {
    await page.getByRole('button', { name: new RegExp(gear,'i') }).click();
  }
  await page.waitForTimeout(300);
  await snap('04_clock_puzzle_solved_390px.png');

  // Step to Finale (The Clock Tower)
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  for (let i = 0; i < 8; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('05_finale_stage_390px.png');

  // Advance Finale Stitch
  for (const step of ['Reach toward your friend','Listen to the crooked thread','Tie a wonderfully uneven knot']) {
    await page.getByRole('button', { name: new RegExp(step,'i') }).click();
  }
  await page.waitForTimeout(300);
  await snap('05_finale_puzzle_solved_390px.png');

  // Step to Epilogue
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /turn the page/i });
    if (await btn.isVisible()) await btn.click();
  }
  await page.waitForTimeout(500);
  await snap('06_epilogue_stage_390px.png');

  // Scroll to Character Scrapbook in Epilogue
  const scrapbookEl = page.locator('.character-scrapbook-module');
  if (await scrapbookEl.count() > 0) {
    await scrapbookEl.scrollIntoViewIfNeeded();
    await snap('06_epilogue_scrapbook_morrow_390px.png');
    // Click Sir Clack tab
    await page.getByRole('tab', { name: /Sir Clack/i }).click();
    await page.waitForTimeout(250);
    await snap('06_epilogue_scrapbook_clack_390px.png');
    // Click The Unfinished One tab
    await page.getByRole('tab', { name: /The Unfinished One/i }).click();
    await page.waitForTimeout(250);
    await snap('06_epilogue_scrapbook_unfinished_390px.png');
  }

  // Open Chapter Map
  await page.getByRole('button', { name: /open chapter map|chapters/i }).click();
  await page.waitForTimeout(300);
  await snap('07_chapter_map_390px.png');

  await page.close();

  // 2. Desktop Screenshots (1280 x 800)
  console.log('--- Capturing Desktop (1280px) Views ---');
  const dPage = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce'
  });

  await dPage.goto(base, { waitUntil: 'domcontentloaded' });
  // Seed full unlocked save state for instant chapter access on desktop
  await dPage.evaluate(() => {
    localStorage.setItem('morrow-v2', JSON.stringify({
      completed: ['workshop', 'shadows', 'weather', 'clock', 'finale', 'epilogue'],
      active: 'epilogue',
      muted: true,
      easter: true,
      started: true
    }));
  });
  await dPage.reload({ waitUntil: 'domcontentloaded' });

  // Open map
  await dPage.getByRole('button', { name: /chapters|open chapter map/i }).click();
  await dPage.waitForTimeout(400);
  await dPage.screenshot({ path: path.join(outDir, 'desktop_map_1280px.png') });
  await fs.copyFile(path.join(outDir, 'desktop_map_1280px.png'), path.join(brainDir, 'desktop_map_1280px.png'));

  // Visit Weather Forest on desktop
  await dPage.getByRole('button', { name: /Upside-Down Forest/i }).click();
  await dPage.waitForTimeout(400);
  await dPage.screenshot({ path: path.join(outDir, 'desktop_weather_1280px.png') });
  await fs.copyFile(path.join(outDir, 'desktop_weather_1280px.png'), path.join(brainDir, 'desktop_weather_1280px.png'));

  // Visit Finale on desktop
  await dPage.getByRole('button', { name: /chapters|open chapter map/i }).click();
  await dPage.getByRole('button', { name: /The Clock Tower/i }).click();
  await dPage.waitForTimeout(400);
  await dPage.screenshot({ path: path.join(outDir, 'desktop_finale_1280px.png') });
  await fs.copyFile(path.join(outDir, 'desktop_finale_1280px.png'), path.join(brainDir, 'desktop_finale_1280px.png'));

  // Visit Epilogue on desktop
  await dPage.getByRole('button', { name: /chapters|open chapter map/i }).click();
  await dPage.getByRole('button', { name: /Wonderfully Wrong/i }).click();
  await dPage.waitForTimeout(400);
  await dPage.screenshot({ path: path.join(outDir, 'desktop_epilogue_1280px.png') });
  await fs.copyFile(path.join(outDir, 'desktop_epilogue_1280px.png'), path.join(brainDir, 'desktop_epilogue_1280px.png'));

  await dPage.close();
  console.log('--- ALL CHAPTER SCREENSHOTS CAPTURED SUCCESSFULLY ---');
} finally {
  await browser.close();
}
