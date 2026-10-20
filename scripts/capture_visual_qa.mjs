import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'desktop_1920', width: 1920, height: 1080 },
];

const OUT_DIR = path.resolve('qa/visual_overhaul');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runVisualCapture() {
  console.log('>>> STARTING MULTI-VIEWPORT VISUAL QA SCREENSHOT CAPTURE...');
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Capturing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // 1. WORKSHOP (Comic Sequence)
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForLoadState('networkidle');
    // Start story
    const startBtn = page.locator('button.storybook-action').first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(600);
    }
    // Skip opening video if present
    const skipBtn = page.locator('button:has-text("Skip")').first();
    if (await skipBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(400);
    }
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_01_workshop.png`), fullPage: false });
    console.log(`  ✓ Captured Workshop: ${vp.name}_01_workshop.png`);

    // Advance to Beat 8 to verify video
    for (let i = 0; i < 7; i++) {
      const nextBtn = page.locator('.comic-next-btn, button:has-text("Next"), button:has-text("Ring")').first();
      if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await nextBtn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_01b_workshop_pipkin_yes.png`), fullPage: false });
    console.log(`  ✓ Captured Workshop Pipkin YES beat: ${vp.name}_01b_workshop_pipkin_yes.png`);

    // 2. SHADOW VILLAGE
    // Inject completed workshop state to jump straight to shadows
    await page.evaluate(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop'],
        active: 'shadows',
        muted: true,
        easter: false,
        started: true,
      }));
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_02_shadow_village_initial.png`), fullPage: false });
    console.log(`  ✓ Captured Shadow Village: ${vp.name}_02_shadow_village_initial.png`);

    // Step into active stitching mode (Beat 4)
    const stitchStartBtn = page.locator('button:has-text("Mend the 3 seams"), button:has-text("Next")').first();
    if (await stitchStartBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await stitchStartBtn.click();
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_02b_shadow_seams_visible.png`), fullPage: false });
    console.log(`  ✓ Captured Shadow Village 3 Seams: ${vp.name}_02b_shadow_seams_visible.png`);

    // 3. UPSIDE-DOWN FOREST
    await page.evaluate(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows'],
        active: 'weather',
        muted: true,
        easter: false,
        started: true,
      }));
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_03_upside_down_forest.png`), fullPage: false });
    console.log(`  ✓ Captured Upside-Down Forest: ${vp.name}_03_upside_down_forest.png`);

    // 4. TOMORROW TOWN & IMPOSSIBLE CLOCK
    await page.evaluate(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true,
      }));
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_04_tomorrow_town_clock.png`), fullPage: false });
    console.log(`  ✓ Captured Tomorrow Town Clock: ${vp.name}_04_tomorrow_town_clock.png`);

    await context.close();
  }

  await browser.close();
  console.log('\n>>> VISUAL QA CAPTURE COMPLETE! All screenshots stored in qa/visual_overhaul/');
}

runVisualCapture().catch((err) => {
  console.error('Visual capture error:', err);
  process.exit(1);
});
