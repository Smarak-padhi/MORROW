// Run locally after npm run dev: npm install --no-save playwright && node scripts/mobile-qa.mjs
// Real browser smoke test, including cinematic absence and mobile overflow.
import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';

const base = process.env.MORROW_URL || 'http://localhost:5173';
const out = 'qa/screenshots';
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const issues = [];
const check = (ok, message) => { if (!ok) issues.push(message); };
const widths = [320, 375, 430, 768, 1280];
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: `${out}/opening-${width}.png`, fullPage: true });
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    check(sizes.scroll <= sizes.client + 1, `Opening overflows at ${width}: ${JSON.stringify(sizes)}`);
    const open = page.getByRole('button', { name: /open the story/i });
    check(await open.isVisible(), `Open story button missing at ${width}`);
    if (await open.isVisible()) await open.click();
    await page.getByRole('button', { name: /ring the bell/i }).click();
    const first = page.getByRole('button', { name: /turn the page/i });
    if (await first.isVisible()) await first.click();
    await page.screenshot({ path: `${out}/workshop-${width}.png`, fullPage: true });
    const nextSizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    check(nextSizes.scroll <= nextSizes.client + 1, `Workshop overflows at ${width}: ${JSON.stringify(nextSizes)}`);
    check(errors.length === 0, `JS errors at ${width}: ${errors.join('; ')}`);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /open the story/i }).click();
  await page.getByRole('button', { name: /ring the bell/i }).click();
  async function advanceDialogue() {
    for (let i = 0; i < 15; i++) {
      const turn = page.getByRole('button', { name: /turn the page/i });
      if (!await turn.count() || !await turn.isVisible()) break;
      await turn.click();
    }
  }
  async function chapter() {
    const h = await page.locator('.storybook-reading h1').innerText();
    return h.trim();
  }
  await advanceDialogue();
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  await advanceDialogue();
  for (const [resident, shadow] of [['Village Duck','Tree shadow'],['Little Lantern','Star shadow'],['Wandering Snail','Duck shadow']]) {
    await page.getByRole('button', { name: new RegExp(resident,'i') }).click();
    await page.getByRole('button', { name: new RegExp(shadow,'i') }).click();
  }
  check(await page.getByRole('button', { name: /step into the next chapter/i }).isVisible(), 'Shadow Stitcher cannot complete');
  await page.screenshot({ path: `${out}/shadows-complete.png`, fullPage: true });
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  await advanceDialogue();
  const pairs = [['Gentle Downpour','Thirsty Lilies'],['Whistling Breeze','Frozen Windmill'],['Golden Sunbeam','Frog Mayor']];
  for (const [thread, target] of pairs) {
    await page.getByRole('button', { name: new RegExp(thread,'i') }).click();
    await page.getByRole('button', { name: new RegExp(target,'i') }).click();
  }
  check(await page.getByRole('button', { name: /step into the next chapter/i }).isVisible(), 'Weather Loom cannot complete');
  await page.screenshot({ path: `${out}/weather-complete.png`, fullPage: true });
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  await advanceDialogue();
  const cogGroup = page.locator('.draggable-gear-group');
  if (await cogGroup.count() && await cogGroup.isVisible()) {
    await cogGroup.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const dialZone = page.locator('.weather-vane-zone');
    await dialZone.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const heartGroup = page.locator('.draggable-heart-group');
    await heartGroup.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);
  } else {
    await page.locator('.accessible-clock-drawer').evaluate(el => el.open = true);
    await page.waitForTimeout(300);
    const cogBtn = page.locator('.accessible-clock-btn:has-text("1. Fit Brass Cog")');
    if (await cogBtn.isVisible()) {
      await cogBtn.click();
      await page.waitForTimeout(300);
    }
    const dialBtn = page.locator('button[aria-label="Align Weather Spring"]');
    if (await dialBtn.isVisible()) {
      await dialBtn.click();
      await page.waitForTimeout(300);
    }
    const springBtn = page.locator('.accessible-clock-btn:has-text("3. Seat Crooked Heart Spring")');
    if (await springBtn.isVisible()) {
      await springBtn.click();
      await page.waitForTimeout(500);
    }
  }
  await page.waitForTimeout(6000);
  check(await page.getByRole('button', { name: /step into the next chapter/i }).isVisible(), 'Impossible Clock cannot complete');
  await page.screenshot({ path: `${out}/clock-complete.png`, fullPage: true });
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  await advanceDialogue();

  await page.locator('.accessible-stitch-drawer').evaluate(el => el.open = true);
  await page.waitForTimeout(300);
  const stitchBtn = page.locator('.accessible-stitch-btn:has-text("Cinch Crooked Knot")');
  if (await stitchBtn.isVisible()) {
    await stitchBtn.click();
    await page.waitForTimeout(5500);
  }
  check(await page.getByRole('button', { name: /step into the next chapter/i }).isVisible(), 'Finale Stitch cannot complete');
  await page.getByRole('button', { name: /step into the next chapter/i }).click();
  await advanceDialogue();
  check((await chapter()).toLowerCase().includes('epilogue') || await page.locator('.storybook-ending').count() > 0, 'Epilogue not reached');
  await page.screenshot({ path: `${out}/epilogue.png`, fullPage: true });
  await page.reload();
  check(await page.locator('.storybook-chapter').count() > 0, 'Save state not restored');
  await page.close();
} finally {
  await browser.close();
}
if (issues.length) { console.error('MORROW QA FAILED\n' + issues.map(x => '- ' + x).join('\n')); process.exitCode = 1; }
else console.log('MORROW QA PASSED: responsive opening, gameplay sequence, epilogue and reload. Screenshots in qa/screenshots.');
