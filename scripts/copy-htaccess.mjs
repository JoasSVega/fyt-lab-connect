#!/usr/bin/env node
/**
 * Copy .htaccess to all prerendered subdirectories
 * 
 * Ensures trailing slash normalization works correctly
 * for all routes in SSG build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const sourceHtaccess = path.join(projectRoot, 'public', '.htaccess');

function copyHtaccessToDir(dir) {
  const targetPath = path.join(dir, '.htaccess');
  
  // Skip if .htaccess already exists or if it's a file directory
  if (fs.existsSync(targetPath)) {
    return false;
  }
  
  // Copy .htaccess
  try {
    fs.copyFileSync(sourceHtaccess, targetPath);
    return true;
  } catch (err) {
    console.warn(`⚠️  No se pudo copiar .htaccess a ${dir}: ${err.message}`);
    return false;
  }
}

function walkDirectories(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules, .git, assets, and server directories
      if (entry.name === 'node_modules' || 
          entry.name === '.git' || 
          entry.name === 'assets' || 
          entry.name === 'server' ||
          entry.name.startsWith('.')) {
        continue;
      }
      
      callback(fullPath);
      walkDirectories(fullPath, callback);
    }
  }
}

async function main() {
  console.log('\n📋 Copiando .htaccess a subdirectorios...\n');
  
  if (!fs.existsSync(sourceHtaccess)) {
    console.error('❌ No se encontró public/.htaccess');
    process.exit(1);
  }
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ No se encontró dist/. Ejecuta el build primero.');
    process.exit(1);
  }
  
  let copiedCount = 0;
  
  walkDirectories(distDir, (dir) => {
    // Only copy to directories that have an index.html (prerendered routes)
    const indexPath = path.join(dir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const copied = copyHtaccessToDir(dir);
      if (copied) {
        const relativePath = path.relative(distDir, dir);
        console.log(`  ✓ .htaccess → /${relativePath}/`);
        copiedCount++;
      }
    }
  });
  
  console.log(`\n✅ Copiado .htaccess a ${copiedCount} subdirectorio(s)\n`);
}

main().catch((err) => {
  console.error('\n❌ Error al copiar .htaccess:');
  console.error(err.message);
  process.exit(1);
});
