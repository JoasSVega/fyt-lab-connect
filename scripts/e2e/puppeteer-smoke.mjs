import puppeteer from 'puppeteer';

const BASE = process.env.BASE_URL || 'http://localhost:5173';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  const getBodyOverflow = async () => page.evaluate(() => getComputedStyle(document.body).overflow);

  const gotoAndCheck = async (path) => {
    const start = Date.now();
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' });
    const afterLoad = Date.now();

    // Allow loader to finish
    await page.waitForTimeout(1700);

    // Assertions
    const overflow = await getBodyOverflow();
    const scrollY = await page.evaluate(() => window.scrollY);
    const docHasScroll = await page.evaluate(() => document.documentElement.scrollHeight > window.innerHeight);
    const appWrappers = await page.evaluate(() => Array.from(document.querySelectorAll('[style*="overflow:"]')).length);

    console.log(`[${path}] load=${afterLoad - start}ms overflow=${overflow} scrollY=${scrollY} docHasScroll=${docHasScroll} wrappersWithOverflow=${appWrappers}`);
    if (overflow === 'hidden') throw new Error('Body remains locked after load');
    if (scrollY !== 0) throw new Error('Not scrolled to top after transition');
  };

  await gotoAndCheck('/');
  // Navigate to another route via client-side navigation
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.getAttribute('href')?.includes('/sobre-nosotros'));
    if (link) (link).click();
  });
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.waitForTimeout(1700);

  const overflow2 = await getBodyOverflow();
  const scrollY2 = await page.evaluate(() => window.scrollY);
  if (overflow2 === 'hidden') throw new Error('Body remains locked after route transition');
  if (scrollY2 !== 0) throw new Error('Not scrolled to top after route transition');

  // Navigate again
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.getAttribute('href')?.includes('/contactos'));
    if (link) (link).click();
  });
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.waitForTimeout(1700);
  const overflow3 = await getBodyOverflow();
  if (overflow3 === 'hidden') throw new Error('Body remains locked after second route transition');

  await browser.close();
  console.log('Puppeteer smoke OK');
})();
