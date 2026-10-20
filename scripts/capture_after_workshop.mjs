import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'desktop_1920', width: 1920, height: 1080 },
];

const OUT_DIR = path.resolve('qa/workshop_rebuild_evidence/after');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function captureAfter() {
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://127.0.0.1:4173/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // 1. Start story & skip intro cinematic
    const startBtn = page.locator('button.storybook-action').first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(500);
    }
    const skipBtn = page.locator('button:has-text("Skip")').first();
    if (await skipBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(500);
    }

    // 2. Capture Initial Bell State (unawakened)
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_after_workshop_initial.png`), fullPage: false });

    // 3. Ring the counter bell
    const ringBellBtn = page.getByRole('button', { name: /ring the bell/i }).first();
    if (await ringBellBtn.isVisible()) {
      await ringBellBtn.click();
      await page.waitForTimeout(600);
    }

    // 4. Capture early active scene (Beat 2 / Beat 3)
    const continueBtn = page.getByRole('button', { name: /continue story/i });
    if (await continueBtn.isVisible()) {
      await continueBtn.click();
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_after_workshop_active_scene.png`), fullPage: false });

    // 5. Advance through dialogue beats until Beat 8 (Pipkin's "YES.")
    for (let i = 0; i < 7; i++) {
      const btn = page.getByRole('button', { name: /continue story/i });
      if (await btn.count() && (await btn.isVisible())) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(600);

    // 6. Capture Pipkin "YES" Payoff beat
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}_after_workshop_pipkin_yes.png`), fullPage: false });

    // 7. Fullpage captures
    if (vp.name === 'desktop_1440') {
      await page.screenshot({ path: path.join(OUT_DIR, 'desktop_1440_after_fullpage.png'), fullPage: true });
    }
    if (vp.name === 'mobile_390') {
      await page.screenshot({ path: path.join(OUT_DIR, 'mobile_390_after_fullpage.png'), fullPage: true });
    }

    await page.close();
  }
  await browser.close();
  console.log('✓ Successfully captured all AFTER screenshots in qa/workshop_rebuild_evidence/after');
}

captureAfter().catch(err => {
  console.error(err);
  process.exit(1);
});
