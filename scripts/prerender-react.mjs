#!/usr/bin/env node

/**
 * Prerender Script para SSG
 * 
 * Genera HTMLs estáticos para todas las rutas definidas en routesMeta.ts
 * Incluye validaciones, manejo de errores y reporte detallado.
 * 
 * Proceso:
 * 1. Localizar el bundle SSR compilado (dist/server/main.ssg.*.js)
 * 2. Importar getRoutes() y render() desde el bundle
 * 3. Prerrenderizar cada ruta
 * 4. Validar que el output sea correcto
 * 5. Generar reporte final
 * 
 * Si alguna ruta falla, el build completo falla (fail-fast).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// ========================================
// UTILIDADES
// ========================================

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

/**
 * Valida que el head contenga meta tags críticos
 */
function validateHead(head, routePath) {
  const warnings = [];
  
  if (!head.includes('<title>')) {
    warnings.push(`${routePath}: Falta <title>`);
  }
  
  if (!head.includes('<meta name="description"')) {
    warnings.push(`${routePath}: Falta <meta name="description">`);
  }
  
  if (!head.includes('<link rel="canonical"')) {
    warnings.push(`${routePath}: Falta <link rel="canonical">`);
  }
  
  if (!head.includes('og:title')) {
    warnings.push(`${routePath}: Falta OpenGraph og:title`);
  }
  
  return warnings;
}

/**
 * Sanitiza el HTML removiendo comentarios y templates de error de React SSR
 * Estos contienen file:// URLs que causan errores de MIME type en el navegador
 */
function sanitizeHTML(html) {
  // Remover comentarios de React Suspense (<!--$!--> y <!--/$-->)
  let cleaned = html.replace(/<!--\$!-->/g, '');
  cleaned = cleaned.replace(/<!--\/\$-->/g, '');
  
  // Remover templates con mensajes de error de SSR que contienen file:// URLs
  cleaned = cleaned.replace(/<template[^>]*data-msg="[^"]*"[^>]*data-stck="[^"]*"[^>]*><\/template>/gi, '');
  
  // Remover cualquier comentario con file:// URLs
  cleaned = cleaned.replace(/<!--[\s\S]*?file:\/\/[\s\S]*?-->/gi, '');
  
  return cleaned;
}

/**
 * Escribe el HTML prerenderizado para una ruta específica
 */
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

  // Sanitizar el HTML para remover errores de SSR
  const sanitizedHTML = sanitizeHTML(html);

  // Inyectar head SSR antes del cierre de </head>
  const result = clientIndex
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${sanitizedHTML}</div>`);

  fs.writeFileSync(targetFile, result, 'utf-8');
  
  return targetFile;
}

/**
 * Localiza el bundle SSR compilado en dist/server
 */
function findSSRBundlePath() {
  const serverDir = path.join(distDir, 'server');
  if (!fs.existsSync(serverDir)) {
    throw new Error(
      'No se encontró dist/server.\n' +
      'Ejecuta primero: npm run build:ssr'
    );
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
  if (!entry) {
    throw new Error(
      'No se encontró el bundle SSR de main.ssg en dist/server.\n' +
      'Verifica que vite build --ssr src/main.ssg.tsx se ejecutó correctamente.'
    );
  }
  
  return entry;
}

// ========================================
// MAIN PRERENDER LOGIC
// ========================================

async function main() {
  console.log('\n🎨 Iniciando prerender estático...\n');
  
  // ========================================
  // 1. LOCALIZAR Y CARGAR BUNDLE SSR
  // ========================================
  
  const entryPath = findSSRBundlePath();
  console.log(`📦 Bundle SSR encontrado: ${path.relative(projectRoot, entryPath)}`);
  
  const ssr = await import(pathToFileURL(entryPath).href);
  
  if (!ssr.getRoutes || !ssr.render) {
    throw new Error(
      'El bundle SSR no expone getRoutes() y render().\n' +
      'Verifica que src/main.ssg.tsx exporta estas funciones correctamente.'
    );
  }

  // ========================================
  // 2. OBTENER RUTAS A PRERRENDERIZAR
  // ========================================
  
  const routes = ssr.getRoutes();
  console.log(`📋 Rutas a prerrenderizar: ${routes.length}\n`);

  // ========================================
  // 3. PRERRENDERIZAR CADA RUTA
  // ========================================
  
  const failedRoutes = [];
  const generatedRoutes = [];
  const allWarnings = [];
  
  for (const routePath of routes) {
    try {
      const { head, html } = ssr.render(routePath);
      
      // Validaciones básicas
      if (!head || !html) {
        failedRoutes.push({
          route: routePath,
          reason: 'Head o HTML vacío'
        });
        continue;
      }
      
      // Validar meta tags críticos
      const warnings = validateHead(head, routePath);
      if (warnings.length > 0) {
        allWarnings.push(...warnings);
      }
      
      // Escribir archivo
      const targetFile = writeHTMLForRoute(routePath, head, html);
      generatedRoutes.push({
        route: routePath,
        file: path.relative(projectRoot, targetFile),
      });
      
      // Log progreso
      const routeDisplay = routePath.padEnd(50);
      console.log(`  ✓ ${routeDisplay} → ${path.relative(distDir, targetFile)}`);
      
    } catch (err) {
      failedRoutes.push({
        route: routePath,
        reason: err.message,
      });
      console.error(`  ✗ ${routePath} - ERROR: ${err.message}`);
    }
  }

  // ========================================
  // 4. COPIAR ARCHIVOS ADICIONALES
  // ========================================
  
  const cnameSrc = path.join(projectRoot, 'CNAME');
  const cnameDst = path.join(distDir, 'CNAME');
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, cnameDst);
    console.log('\n✓ Copiado CNAME al dist/');
  }

  // ========================================
  // 5. REPORTE FINAL
  // ========================================
  
  console.log('\n' + '═'.repeat(60));
  console.log('📊 REPORTE DE PRERENDER');
  console.log('═'.repeat(60));
  
  // Estadísticas generales
  console.log(`\n✅ Rutas prerenderizadas: ${generatedRoutes.length}/${routes.length}`);
  
  // Análisis por sección
  const bySection = {};
  generatedRoutes.forEach(({ route }) => {
    const section = route === '/' ? 'root' : route.split('/')[1] || 'other';
    bySection[section] = (bySection[section] || 0) + 1;
  });
  
  console.log('\n📁 Por sección:');
  Object.entries(bySection)
    .sort(([, a], [, b]) => b - a)
    .forEach(([section, count]) => {
      console.log(`   ${section.padEnd(25)} ${count.toString().padStart(3)} ruta(s)`);
    });
  
  // Rutas dinámicas (artículos)
  const dynamicRoutes = generatedRoutes.filter(({ route }) =>
    route.match(/\/(divulgacion|noticias|articulos)\/[^/]+$/)
  );
  
  if (dynamicRoutes.length > 0) {
    console.log(`\n📄 Artículos prerenderizados: ${dynamicRoutes.length}`);
    console.log('   Ejemplos:');
    dynamicRoutes.slice(0, 5).forEach(({ route }) => {
      console.log(`   • ${route}`);
    });
    if (dynamicRoutes.length > 5) {
      console.log(`   ... y ${dynamicRoutes.length - 5} más`);
    }
  }
  
  // Warnings
  if (allWarnings.length > 0) {
    console.log(`\n⚠️  Advertencias (${allWarnings.length}):`);
    const uniqueWarnings = [...new Set(allWarnings)];
    uniqueWarnings.slice(0, 10).forEach(warning => {
      console.log(`   • ${warning}`);
    });
    if (uniqueWarnings.length > 10) {
      console.log(`   ... y ${uniqueWarnings.length - 10} más`);
    }
  }
  
  // Errores (fail-fast)
  if (failedRoutes.length > 0) {
    console.error('\n❌ RUTAS FALLIDAS:');
    failedRoutes.forEach(({ route, reason }) => {
      console.error(`   • ${route}: ${reason}`);
    });
    console.error(`\n❌ Prerender fallido: ${failedRoutes.length} ruta(s) no se pudieron generar.`);
    console.error('   El build no puede continuar hasta que se corrijan.\n');
    process.exit(1);
  }
  
  // Éxito
  console.log('\n✅ PRERENDER COMPLETADO EXITOSAMENTE');
  console.log('═'.repeat(60) + '\n');
}

// ========================================
// EJECUCIÓN
// ========================================

main().catch((err) => {
  console.error('\n❌ Error crítico en prerender:');
  console.error(err.message);
  if (err.stack) {
    console.error('\nStack trace:');
    console.error(err.stack);
  }
  console.error('');
  process.exit(1);
});
