import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const widths = [320, 375, 430, 768, 1280, 1440];
  const chapters = ['workshop', 'shadows', 'weather', 'clock', 'finale', 'epilogue'];
  let failures = 0;

  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 850 }, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:4173/');

    // Check opening
    const openingCheck = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth
    }));
    if (openingCheck.scroll > openingCheck.client + 1) {
      console.error(`OVERFLOW at opening ${w}px: scroll=${openingCheck.scroll}, client=${openingCheck.client}`);
      failures++;
    }

    // Test each chapter by setting state
    for (const ch of chapters) {
      await page.evaluate((chId) => {
        const s = {
          completed: ['workshop', 'shadows', 'weather', 'clock', 'finale'],
          active: chId,
          muted: true,
          easter: false,
          started: true
        };
        localStorage.setItem('morrow-v2', JSON.stringify(s));
      }, ch);
      await page.reload();
      await page.waitForTimeout(100);

      const check = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth
      }));
      if (check.scroll > check.client + 1) {
        console.error(`OVERFLOW in ${ch} at ${w}px: scroll=${check.scroll}, client=${check.client}`);
        failures++;
      }
    }
    await page.close();
  }

  await browser.close();
  if (failures === 0) {
    console.log('AUDIT PASSED: All 6 chapters across 6 viewports (320-1440px) have ZERO horizontal overflow!');
  } else {
    process.exitCode = 1;
  }
}

run();
