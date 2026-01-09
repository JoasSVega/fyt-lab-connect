#!/usr/bin/env node
/**
 * Generador de sitemap basado en las rutas SSG reales
 * - Carga el bundle SSR de dist/server y usa getRoutes()/render()
 * - Extrae lastmod de <meta property="article:published_time"> cuando aplique
 * - Escribe dist/sitemap.xml con todas las rutas válidas
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

function findSSRBundlePath() {
  const serverDir = path.join(distDir, 'server');
  if (!fs.existsSync(serverDir)) {
    throw new Error('No se encontró dist/server. Ejecuta primero el build SSR.');
  }
  const entries = [];
  const walk = (dir) => {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, d.name);
      if (d.isDirectory()) walk(full);
      else entries.push(full);
    }
  };
  walk(serverDir);
  const entry = entries.find((f) => /main\.ssg.*\.js$/.test(path.basename(f)));
  if (!entry) throw new Error('No se encontró el bundle SSR main.ssg.*.js en dist/server');
  return entry;
}

function isoDate(d) {
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

(async function main() {
  const baseUrl = 'https://fyt-research.org';
  const entryPath = findSSRBundlePath();
  const ssr = await import(pathToFileURL(entryPath).href);
  if (!ssr.getRoutes || !ssr.render) {
    throw new Error('El bundle SSR no expone getRoutes()/render()');
  }

  const routes = ssr.getRoutes();
  const urlset = [];
  for (const route of routes) {
    let lastmod = isoDate(new Date());
    try {
      const { head } = ssr.render(route);
      const m = head.match(/<meta\s+property=["']article:published_time["']\s+content=["']([^"']+)["'][^>]*>/i);
      if (m && m[1]) lastmod = isoDate(m[1]);
    } catch {}
    urlset.push({ loc: `${baseUrl}${route === '/' ? '' : route}`, lastmod });
  }

  // Render XML
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const { loc, lastmod } of urlset) {
    lines.push('  <url>');
    lines.push(`    <loc>${loc}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.6</priority>');
    lines.push('  </url>');
  }
  lines.push('</urlset>');

  const outPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\n✓ Sitemap generado: ${path.relative(projectRoot, outPath)}`);
})();
