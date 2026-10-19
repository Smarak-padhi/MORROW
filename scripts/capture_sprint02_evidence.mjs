import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/sprint02_tomorrow_town');
await fs.mkdir(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('Capturing Tomorrow Town Sprint 02 Evidence Screenshots...\n');

  // 1. Mobile (390x844) - Frozen State (Beat 0 arrival, locked at 4:01)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'tomorrow_town_frozen_mobile_390px.png') });
    console.log('✓ Captured tomorrow_town_frozen_mobile_390px.png');
    await page.close();
  }

  // 2. Desktop (1280x800) - Frozen State (Beat 0 arrival, locked at 4:01)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'tomorrow_town_frozen_desktop_1280px.png') });
    console.log('✓ Captured tomorrow_town_frozen_desktop_1280px.png');
    await page.close();
  }

  // 3. Mobile (390x844) - Restored State (Puzzle solved, gears spinning, dawn light)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(600);

    // Turn dialogue pages to reach mechanism
    for (let i = 0; i < 4; i++) {
      const pageTurn = page.locator('button:has-text("Turn the page")');
      if (await pageTurn.isVisible()) {
        await pageTurn.click();
        await page.waitForTimeout(250);
      }
    }

    // Solve mechanism
    await page.click('button:has-text("Fit Brass Cog on Spindle")');
    await page.waitForTimeout(250);
    const rotateBtn = page.locator('button:has-text("Rotate ↷ +45°")');
    while (await rotateBtn.isVisible()) {
      await rotateBtn.click();
      await page.waitForTimeout(200);
    }
    await page.click('button:has-text("Insert Heart Spring")');
    await page.waitForTimeout(700);

    await page.screenshot({ path: path.join(outDir, 'tomorrow_town_restored_mobile_390px.png') });
    console.log('✓ Captured tomorrow_town_restored_mobile_390px.png');
    await page.close();
  }

  // 4. Desktop (1280x800) - Restored State (Puzzle solved, gears spinning, dawn light)
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(600);

    // Turn dialogue pages to reach mechanism
    for (let i = 0; i < 4; i++) {
      const pageTurn = page.locator('button:has-text("Turn the page")');
      if (await pageTurn.isVisible()) {
        await pageTurn.click();
        await page.waitForTimeout(250);
      }
    }

    // Solve mechanism
    await page.click('button:has-text("Fit Brass Cog on Spindle")');
    await page.waitForTimeout(250);
    const rotateBtn = page.locator('button:has-text("Rotate ↷ +45°")');
    while (await rotateBtn.isVisible()) {
      await rotateBtn.click();
      await page.waitForTimeout(200);
    }
    await page.click('button:has-text("Insert Heart Spring")');
    await page.waitForTimeout(700);

    await page.screenshot({ path: path.join(outDir, 'tomorrow_town_restored_desktop_1280px.png') });
    console.log('✓ Captured tomorrow_town_restored_desktop_1280px.png');
    await page.close();
  }

  await browser.close();
  console.log('\nAll Sprint 02 evidence screenshots successfully captured!');
})();
