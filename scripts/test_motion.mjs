import { chromium } from 'playwright';

async function testMotion() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } }); // Normal motion
  await page.goto('http://127.0.0.1:4173/');

  // Skip video
  await page.getByRole('button', { name: /open the story/i }).click();
  await page.waitForTimeout(600);
  const skip = page.getByRole('button', { name: /skip scene/i });
  if (await skip.isVisible()) await skip.click();

  // Workshop
  await page.getByRole('button', { name: /ring the bell/i }).click();

  // Test page turns with normal motion
  for (let i = 0; i < 4; i++) {
    const turn = page.getByRole('button', { name: /turn the page/i });
    if (await turn.isVisible()) {
      await turn.click();
      await page.waitForTimeout(100);
      const isTurnAnimating = (await page.locator('.story-page-turn').count()) > 0;
      const isCharReacting = (await page.locator('.story-character-react').count()) > 0;
      console.log(`Page turn ${i + 1}: text animated=${isTurnAnimating}, character reacted=${isCharReacting}`);
    }
  }

  // Scroll down to check scroll reveal
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);

  const readingRevealed = await page.evaluate(() => {
    const el = document.querySelector('.storybook-reading');
    return el ? el.classList.contains('is-revealed') : false;
  });
  console.log('Reading container revealed on scroll:', readingRevealed);

  // Take screenshot with normal motion
  await page.screenshot({ path: 'qa/screenshots/motion-workshop-375.png', fullPage: true });

  await browser.close();
  console.log('NORMAL MOTION PAGE TURN AUDIT COMPLETE!');
}

testMotion();
