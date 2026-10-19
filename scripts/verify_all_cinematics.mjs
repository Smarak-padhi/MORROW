import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // Test 1: Chapter 1 Shadows Video Modal (shadows-01-duck.mp4)
  console.log('Testing 1: Chapter 1 Shadows Video Modal (shadows-01-duck.mp4)...');
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
    await page.click('button:has-text("Reveal Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_duck.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  // Test 2: Chapter 2 Weather Umbrella Video Modal (weather-02-umbrella.mp4)
  console.log('Testing 2: Chapter 2 Weather Umbrella Video Modal (weather-02-umbrella.mp4)...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows'],
        active: 'weather',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    await page.click('.storybook-scene-label-pill button:has-text("Reveal Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_weather_umbrella.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  // Test 3: Chapter 2 Weather Loom Video Modal (weather-04-loom.mp4)
  console.log('Testing 3: Chapter 2 Weather Loom Video Modal (weather-04-loom.mp4)...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows'],
        active: 'weather',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    for (let i = 0; i < 4; i++) {
      const btn = page.locator('.balloon-next-btn');
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(400);
      }
    }
    await page.waitForTimeout(600);
    await page.click('.storybook-scene-label-pill button:has-text("Loom Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_weather_loom.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  // Test 4: Chapter 2 Weather Bloom Video Modal (weather-05-bloom.mp4)
  console.log('Testing 4: Chapter 2 Weather Bloom Video Modal (weather-05-bloom.mp4)...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows'],
        active: 'weather',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    for (let i = 0; i < 4; i++) {
      const btn = page.locator('.balloon-next-btn');
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(300);
      }
    }
    for (let i = 0; i < 15; i++) {
      await page.click('button:has-text("Weave with Keyboard")');
      await page.waitForTimeout(150);
    }
    await page.waitForTimeout(800);
    await page.click('.storybook-scene-label-pill button:has-text("Bloom Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_weather_bloom.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  // Test 5: Chapter 3 Clock Freeze Video Modal (clock-01-freeze.mp4)
  console.log('Testing 5: Chapter 3 Clock Freeze Video Modal (clock-01-freeze.mp4)...');
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
    await page.click('button:has-text("Reveal Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_clock_freeze.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  // Test 6: Chapter 4 Finale Knot Video Modal (finale-01-knot.mp4)
  console.log('Testing 6: Chapter 4 Finale Knot Video Modal (finale-01-knot.mp4)...');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather', 'clock'],
        active: 'finale',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Reveal Film")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'qa/master_rc_audit/test_video_finale_knot.png' });
    await page.click('button:has-text("Return to Scene ✕")');
    await page.close();
  }

  await browser.close();
  console.log('SUCCESS: All approved cinematics independently tested from actual gameplay triggers!');
})();
