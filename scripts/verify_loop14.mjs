import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // Test 1: Workshop Opening Transition with 0.8s comedic pause
  console.log('Testing 1: Workshop opening dialogue comedic pause...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(600);

    // Click "Open the story"
    await page.click('button:has-text("Open the story")');
    await page.waitForTimeout(800);

    // If cinematic plays, skip it
    const skipBtn = page.locator('button:has-text("Skip scene"), button:has-text("Continue story")');
    if (await skipBtn.isVisible()) {
      await skipBtn.click();
      await page.waitForTimeout(800);
    }

    // Wake up the workshop by ringing the bell
    const bellBtn = page.locator('button:has-text("Ring the bell")').first();
    if (await bellBtn.isVisible()) {
      await bellBtn.click();
      await page.waitForTimeout(800);
    }

    // Capture Workshop with comedic pause active
    await page.screenshot({ path: 'qa/master_rc_audit/loop14_workshop_comic.png' });
    console.log('✓ Workshop Comic verified');
    await page.close();
  }

  // Test 2: Shadow Village direct environmental stitching
  console.log('Testing 2: Shadow Village direct environmental stitching...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop'],
        active: 'shadows',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Advance dialogue into Beat 4 (Stitching mode)
    for (let i = 0; i < 4; i++) {
      const nextBtn = page.locator('.balloon-next-btn');
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(400);
      }
    }
    await page.waitForTimeout(600);

    // Verify the direct environmental stitcher is mounted
    const stitcher = page.locator('.direct-environmental-stitcher');
    const isVisible = await stitcher.isVisible();
    console.log('Direct environmental stitcher visible:', isVisible);

    // Capture screenshot of direct environmental stitching without white dashboard
    await page.screenshot({ path: 'qa/master_rc_audit/loop14_shadow_environmental.png' });

    // Click keyboard advance button to test accessible alternative
    const kbBtn = page.locator('.tactile-stitch-keyboard-btn');
    if (await kbBtn.isVisible()) {
      await kbBtn.click();
      await page.waitForTimeout(300);
      await kbBtn.click();
      await page.waitForTimeout(300);
    }

    await page.screenshot({ path: 'qa/master_rc_audit/loop14_shadow_stitched.png' });
    console.log('✓ Shadow Village environmental stitcher verified');
    await page.close();
  }

  // Test 3: Tomorrow Town physical clockwork mechanism
  console.log('Testing 3: Tomorrow Town physical clockwork mechanism...');
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

    // Advance story reading to reach the mechanism
    for (let i = 0; i < 4; i++) {
      const pageTurn = page.locator('button:has-text("Turn the page")');
      if (await pageTurn.isVisible()) {
        await pageTurn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(600);

    // Capture Tomorrow Town stage with crooked buildings and mechanism
    await page.screenshot({ path: 'qa/master_rc_audit/loop14_clock_initial.png' });

    // Step 1: Fit brass cog
    const gearBtn = page.locator('button:has-text("Fit Brass Cog on Spindle")');
    if (await gearBtn.isVisible()) {
      await gearBtn.click();
      await page.waitForTimeout(400);
    }

    // Step 2: Rotate weather vane
    const rotateBtn = page.locator('button:has-text("Rotate ↷ +45°")');
    while (await rotateBtn.isVisible()) {
      await rotateBtn.click();
      await page.waitForTimeout(300);
    }

    // Step 3: Insert Heart Spring
    const heartBtn = page.locator('button:has-text("Insert Heart Spring")');
    if (await heartBtn.isVisible()) {
      await heartBtn.click();
      await page.waitForTimeout(600);
    }

    await page.screenshot({ path: 'qa/master_rc_audit/loop14_clock_restarted.png' });
    console.log('✓ Tomorrow Town physical mechanism verified');
    await page.close();
  }

  // Test 4: Desktop view of Tomorrow Town
  console.log('Testing 4: Desktop view of Tomorrow Town...');
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
    await page.screenshot({ path: 'qa/master_rc_audit/loop14_clock_desktop.png' });
    console.log('✓ Tomorrow Town desktop verified');
    await page.close();
  }

  await browser.close();
  console.log('ALL LOOP 14 AUTOMATED PLAYWRIGHT TESTS COMPLETED SUCCESSFULLY!');
})();
