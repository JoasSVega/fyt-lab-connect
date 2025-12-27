#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeHTMLForRoute(routePath, head, html) {
  const targetDir = path.join(distDir, routePath === '/' ? '' : routePath);
  ensureDir(targetDir);
  const targetFile = path.join(targetDir, 'index.html');

  const clientIndexPath = path.join(distDir, 'index.html');
  let clientIndex = fs.readFileSync(clientIndexPath, 'utf-8');

  // Limpiar head base (title, metas, OG, canonical) para evitar duplicados con SSR
  clientIndex = clientIndex.replace(/<title>.*?<\/title>/gi, '');
  clientIndex = clientIndex.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
  clientIndex = clientIndex.replace(/<meta\s+name=["']keywords["'][^>]*>/gi, '');
  clientIndex = clientIndex.replace(/<meta\s+name=["']author["'][^>]*>/gi, '');
  clientIndex = clientIndex.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  clientIndex = clientIndex.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
  clientIndex = clientIndex.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');

  // Inyectar head SSR antes del cierre de </head>
  const result = clientIndex
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  fs.writeFileSync(targetFile, result, 'utf-8');
  console.log(`✔ Prerender: ${routePath} -> ${path.relative(projectRoot, targetFile)}`);
}

function findSSRBundlePath() {
  const serverDir = path.join(distDir, 'server');
  if (!fs.existsSync(serverDir)) {
    throw new Error('No se encontró dist/server. Ejecuta: vite build --ssr src/main.ssg.tsx');
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
  if (!entry) throw new Error('No se encontró el bundle SSR de main.ssg en dist/server');
  return entry;
}

async function main() {
  const entryPath = findSSRBundlePath();
  const ssr = await import(pathToFileURL(entryPath).href);
  if (!ssr.getRoutes || !ssr.render) {
    throw new Error('El bundle SSR no expone getRoutes() y render().');
  }

  const routes = ssr.getRoutes();
  for (const r of routes) {
    const { head, html } = ssr.render(r);
    writeHTMLForRoute(r, head, html);
  }

  const cnameSrc = path.join(projectRoot, 'CNAME');
  const cnameDst = path.join(distDir, 'CNAME');
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, cnameDst);
    console.log('✔ Copiado CNAME al dist/');
  }
}

main().catch((err) => {
  console.error('❌ Error en prerender:', err);
  process.exit(1);
});
