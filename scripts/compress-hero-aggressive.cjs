#!/usr/bin/env node

/**
 * Script para comprimir agresivamente imágenes hero
 * Target: Reducir hero-index-small.webp para eliminar 6.1 KB de desperdicio
 */

const sharp = require('sharp');
const fs = require('fs').promises;

const HERO_IMAGES = [
  'images/hero-index-small.webp',
  'images/hero-index-alt-small.webp',
  'images/hero-herramientas-small.webp',
  'images/hero-nosotros-small.webp',
];

async function compressImage(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;

    console.log(`\n📸 Procesando: ${filePath}`);
    console.log(`   Original: ${metadata.width}x${metadata.height} | ${(originalSize/1024).toFixed(1)} KB`);

    // Crear backup
    await fs.copyFile(filePath, `${filePath}.backup`);

    // Comprimir agresivamente
    await sharp(filePath)
      .webp({
        quality: 75,        // Reducido de 85 a 75
        effort: 6,          // Máximo esfuerzo
        smartSubsample: true, // Mejor compresión
        nearLossless: false,  // Permitir pérdida
      })
      .toFile(`${filePath}.tmp`);

    await fs.rename(`${filePath}.tmp`, filePath);

    const newStats = await fs.stat(filePath);
    const saved = originalSize - newStats.size;

    console.log(`   Nuevo: ${(newStats.size/1024).toFixed(1)} KB`);
    console.log(`   ✅ Ahorrado: ${(saved/1024).toFixed(1)} KB`);

    return saved;

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🚀 Compresión agresiva de imágenes HERO para PageSpeed 90+\n');
  
  let totalSaved = 0;

  for (const imagePath of HERO_IMAGES) {
    const saved = await compressImage(imagePath);
    totalSaved += saved;
  }

  // Limpiar backups
  console.log('\n🧹 Limpiando backups...');
  for (const imagePath of HERO_IMAGES) {
    try {
      await fs.unlink(`${imagePath}.backup`);
    } catch {}
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Total ahorrado: ${(totalSaved/1024).toFixed(1)} KB`);
  console.log('='.repeat(50));
}

main().catch(console.error);
