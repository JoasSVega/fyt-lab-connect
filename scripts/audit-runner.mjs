#!/usr/bin/env node
/*
  Puppeteer-based Full Audit Runner
  - Crawls routes parsed from React Router config (src/App.tsx) plus explicit patterns
  - Injects axe-core for accessibility audits
  - Collects console errors/warnings, network failures, performance timings
  - Detects SEO metadata presence
  - Flags images without width/height and oversized vs display
  - Checks external links rel noopener
  - Detects nested scroll containers and potential overlay z-index conflicts
  - Saves per-route JSON reports under audit/reports
  - Supports repeated runs with --rerun to compare results
*/
import fs from 'fs';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const auditDir = path.join(projectRoot, 'audit');
const reportsDir = path.join(auditDir, 'reports');
const routesListPath = path.join(projectRoot, 'reports', 'routes.txt');
const appFile = path.join(projectRoot, 'src', 'App.tsx');

async function ensureDirs() {
  fs.mkdirSync(auditDir, { recursive: true });
  fs.mkdirSync(reportsDir, { recursive: true });
}

function parseRoutesFromApp() {
  const content = fs.readFileSync(appFile, 'utf8');
  // Extract exported path constants like: export const pathInvestigacion = "/investigacion";
  const constRegex = /export\s+const\s+([a-zA-Z0-9_]+)\s*=\s*"([^"]+)"\s*;/g;
  const constMap = {};
  let c;
  while ((c = constRegex.exec(content)) !== null) {
    constMap[c[1]] = c[2];
  }

  // Extract Route paths, supporting string literals or identifiers inside { }
  const routeRegex = /<Route\s+path=\{?"?([^"}]+)"?\}?\s+element=/g;
  const paths = new Set();
  let m;
  while ((m = routeRegex.exec(content)) !== null) {
    let p = m[1];
    if (!p.startsWith('/')) {
      if (constMap[p]) p = constMap[p];
      else continue; // skip unknown identifiers
    }
    paths.add(p);
  }
  // Include root explicitly
  paths.add('/');
  return Array.from(paths);
}

function expandWildcardRoutes(baseRoutes) {
  const extra = [
    '/herramientas',
    '/herramientas/clinicos',
    '/herramientas/antropometricos',
    '/herramientas/avanzados',
    '/herramientas/escalas',
    '/investigacion',
    '/investigacion/publicaciones',
    '/investigacion/proyectos',
    '/PrivacyPolicy', '/TermsOfUse', '/CodeOfEthics'
  ];
  const set = new Set([...baseRoutes, ...extra]);
  return Array.from(set);
}

async function setupBrowser() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1366,768'
    ]
  });
  return browser;
}

async function collectPerformanceMetrics(page) {
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const ttfb = nav.responseStart - nav.requestStart;
    return {
      ttfb,
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      loadEvent: nav.loadEventEnd - nav.startTime,
    };
  });
  return timing;
}

async function checkSeoMeta(page) {
  return await page.evaluate(() => {
    const get = (sel) => document.querySelector(sel)?.getAttribute('content') || null;
    const hasTitle = !!document.title;
    const description = get('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
    const robots = get('meta[name="robots"]');
    const ogTitle = get('meta[property="og:title"]');
    const ogDesc = get('meta[property="og:description"]');
    const ogImage = get('meta[property="og:image"]');
    const twitterCard = get('meta[name="twitter:card"]');
    const twitterImage = get('meta[name="twitter:image"]');
    const htmlLang = document.documentElement.getAttribute('lang');
    return { hasTitle, description, canonical, robots, ogTitle, ogDesc, ogImage, twitterCard, twitterImage, htmlLang };
  });
}

async function detectImageIssues(page) {
  return await page.evaluate(() => {
    const issues = [];
    const imgs = Array.from(document.images);
    for (const img of imgs) {
      const rect = img.getBoundingClientRect();
      const displayW = Math.round(rect.width);
      const displayH = Math.round(rect.height);
      const widthAttr = img.getAttribute('width');
      const heightAttr = img.getAttribute('height');
      const src = img.currentSrc || img.src;
      const missingSize = !widthAttr || !heightAttr;
      const oversized = (img.naturalWidth > 0 && img.naturalWidth > displayW * 1.5) || (img.naturalHeight > 0 && img.naturalHeight > displayH * 1.5);
      issues.push({ src, displayW, displayH, widthAttr, heightAttr, missingSize, oversized });
    }
    return issues;
  });
}

async function detectExternalLinkRel(page) {
  return await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[target="_blank"]'));
    const missing = anchors.filter(a => !(a.rel || '').includes('noopener'));
    return missing.map(a => ({ href: a.href, rel: a.rel || '' }));
  });
}

async function detectScrollContainers(page) {
  return await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('*'));
    const scrolling = nodes.filter(n => {
      const s = getComputedStyle(n);
      return ['auto','scroll'].includes(s.overflowY) || ['auto','scroll'].includes(s.overflow);
    });
    const nested = [];
    for (const n of scrolling) {
      let p = n.parentElement;
      while (p) {
        const sp = getComputedStyle(p);
        if (['auto','scroll'].includes(sp.overflowY) || ['auto','scroll'].includes(sp.overflow)) {
          nested.push({ node: n.tagName, parent: p.tagName });
          break;
        }
        p = p.parentElement;
      }
    }
    return { scrollingCount: scrolling.length, nestedSamples: nested.slice(0, 10) };
  });
}

async function detectOverlayConflicts(page) {
  return await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('*'));
    const overlays = nodes
      .map(n => ({ z: parseInt(getComputedStyle(n).zIndex || '0', 10), tag: n.tagName, cls: n.className }))
      .filter(o => Number.isFinite(o.z) && o.z >= 40);
    const loaderCandidates = overlays.filter(o => (o.cls || '').toString().includes('Loader') || (o.cls || '').toString().includes('loader'));
    return { overlays: overlays.slice(0, 20), loaderCandidates: loaderCandidates.slice(0, 10) };
  });
}

async function injectAxeAndRun(page) {
  const axeUrl = 'https://cdn.jsdelivr.net/npm/axe-core@4.7.0/axe.min.js';
  await page.addScriptTag({ url: axeUrl });
  const results = await page.evaluate(async () => {
    return await axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a','wcag2aa','best-practice']
      }
    });
  });
  return results;
}

function classifySeverity(axeResult) {
  const violations = axeResult.violations || [];
  return violations.map(v => {
    // Map impact to severity
    const impact = (v.impact || 'minor').toLowerCase();
    let severity = 'Low';
    if (impact === 'critical') severity = 'Critical';
    else if (impact === 'serious') severity = 'High';
    else if (impact === 'moderate') severity = 'Medium';
    else severity = 'Low';
    return { id: v.id, help: v.help, severity, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target })) };
  });
}

async function auditRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  const consoleLogs = [];
  const consoleErrors = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    const entry = { type, text };
    if (type === 'error') consoleErrors.push(entry);
    else consoleLogs.push(entry);
  });
  const failedRequests = [];
  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), method: req.method(), failure: req.failure()?.errorText || 'unknown' });
  });

  const fullUrl = `${baseUrl}${route}`;
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
  // Vite dev server keeps HMR websockets open; avoid networkidle waits
  await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Wait for app root to render something
  try {
    await page.waitForSelector('#root, main', { timeout: 10000 });
  } catch {}

  const perf = await collectPerformanceMetrics(page);
  const seo = await checkSeoMeta(page);
  const images = await detectImageIssues(page);
  const externalRel = await detectExternalLinkRel(page);
  const scrolls = await detectScrollContainers(page);
  const overlays = await detectOverlayConflicts(page);

  const axe = await injectAxeAndRun(page);
  const a11y = classifySeverity(axe);

  const report = {
    route,
    url: fullUrl,
    timestamp: new Date().toISOString(),
    performance: perf,
    seo,
    images,
    externalLinksMissingRel: externalRel,
    scrollContainers: scrolls,
    overlays,
    consoleErrors,
    consoleLogs,
    networkErrors: failedRequests,
    axeRaw: axe,
    accessibilityFindings: a11y
  };

  const fileSafe = route.replace(/\//g, '_') || '_root';
  const outPath = path.join(reportsDir, `${fileSafe}.json`);
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  await page.close();
  return report;
}

function extractActionItems(report) {
  const findings = [];
  // SEO
  if (report.seo.htmlLang !== 'es') findings.push({ area: 'SEO', severity: 'Medium', msg: 'html lang should be es' });
  if (!report.seo.description) findings.push({ area: 'SEO', severity: 'Medium', msg: 'Missing meta description' });
  if (!report.seo.canonical) findings.push({ area: 'SEO', severity: 'Low', msg: 'Missing canonical link' });
  // External rel
  if (report.externalLinksMissingRel.length) findings.push({ area: 'Best Practices', severity: 'Medium', msg: 'External links missing rel noopener' });
  // Images
  const missingSizeCount = report.images.filter(i => i.missingSize).length;
  if (missingSizeCount) findings.push({ area: 'Performance/CLS', severity: 'High', msg: `Images missing width/height: ${missingSizeCount}` });
  const oversizedCount = report.images.filter(i => i.oversized).length;
  if (oversizedCount) findings.push({ area: 'Performance', severity: 'Medium', msg: `Oversized images: ${oversizedCount}` });
  // Scroll
  if ((report.scrollContainers?.scrollingCount || 0) > 1 && (report.scrollContainers?.nestedSamples?.length || 0) > 0) findings.push({ area: 'UX/Scroll', severity: 'Low', msg: 'Nested scroll containers detected' });
  // Console errors
  if (report.consoleErrors.length) findings.push({ area: 'Best Practices', severity: 'High', msg: `Console errors: ${report.consoleErrors.length}` });
  // A11y
  for (const v of report.accessibilityFindings) findings.push({ area: 'Accessibility', severity: v.severity, msg: `${v.id}: ${v.help}` });
  return findings;
}

async function main() {
  await ensureDirs();
  const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:8080';

  // If dev server is not running, start it in background
  // We won't manage its lifecycle here; assume user/dev has started it.

  let routes = [];
  try {
    routes = parseRoutesFromApp();
  } catch {
    // Fallback to routes.txt if available
    if (fs.existsSync(routesListPath)) {
      routes = fs.readFileSync(routesListPath, 'utf8').split(/\r?\n/).filter(Boolean);
    }
  }
  routes = expandWildcardRoutes(routes);

  const browser = await setupBrowser();
  const allReports = [];
  for (const r of routes) {
    try {
      const rep = await auditRoute(browser, baseUrl, r);
      allReports.push(rep);
      console.log(`✓ Audited ${r}`);
    } catch (e) {
      console.error(`✗ Failed ${r}:`, e.message);
    }
  }
  await browser.close();

  const summary = allReports.map(r => ({ route: r.route, performance: r.performance, seo: r.seo, a11yCount: r.accessibilityFindings.length }));
  fs.writeFileSync(path.join(auditDir, 'summary.json'), JSON.stringify(summary, null, 2));

  const actions = allReports.flatMap(extractActionItems);
  fs.writeFileSync(path.join(auditDir, 'actions.json'), JSON.stringify(actions, null, 2));

  console.log('Audit complete. Reports in audit/reports, summary and actions generated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
