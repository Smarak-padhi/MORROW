import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'desktop_1920', width: 1920, height: 1080 },
];

const OUT_DIR = path.resolve('qa/workshop_rebuild_evidence/before');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function captureBefore() {
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForLoadState('networkidle');

    // Start
    const startBtn = page.locator('button.storybook-action').first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(500);
    }
    const skipBtn = page.locator('button:has-text("Skip")').first();
    if (await skipBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(400);
    }

    // Bell not yet rung
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_before_workshop_initial.png`), fullPage: false });

    // Ring the bell
    const bellBtn = page.getByRole('button', { name: /ring the bell/i });
    if (await bellBtn.isVisible()) {
      await bellBtn.click();
      await page.waitForTimeout(800);
    }

    // Capture state with panels stacking
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_before_workshop_awakened.png`), fullPage: false });

    if (vp.name === 'desktop_1440') {
      await page.screenshot({ path: path.join(OUT_DIR, 'desktop_1440_before_fullpage.png'), fullPage: true });
    }

    await page.close();
  }
  await browser.close();
  console.log('✓ Captured BEFORE screenshots in qa/workshop_rebuild_evidence/before');
}

captureBefore().catch(err => {
  console.error(err);
  process.exit(1);
});
