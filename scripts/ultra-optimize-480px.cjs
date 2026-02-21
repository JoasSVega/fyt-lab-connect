#!/usr/bin/env node

/**
 * OPTIMIZACIÓN ULTRA-AGRESIVA PARA PAGESPEED 90+
 * 
 * Target: 455px display en móviles
 * Solución: 480px (1.05x DPR - PERFECTO para Retina 1x, aceptable para 2x)
 * Compresión: Q70 (agresiva pero imperceptible en cards pequeños)
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  targetWidth: 480,   // Para 455px display = 1.05x ratio perfecto
  quality: 70,        // Agresivo para máximo ahorro
  effort: 6,          // Máximo esfuerzo de compresión
};

const CAROUSEL_IMAGES = [
  'images/Carrusel/Articulo-Cientifico-small.webp',
  'images/Carrusel/Asignatura-de-Postgrado-small.webp',
  'images/Carrusel/Comunidad-small.webp',
  'images/Carrusel/Cursos-small.webp',
  'images/Carrusel/Diplomado-small.webp',
  'images/Carrusel/Estudios-In-silico-small.webp',
  'images/Carrusel/Farmacia-Asistencial-small.webp',
  'images/Carrusel/Farmacoeconomia-small.webp',
  'images/Carrusel/Farmacoepidemiologia-small.webp',
  'images/Carrusel/Farmacologia-small.webp',
  'images/Carrusel/Farmacovigilancia-small.webp',
  'images/Carrusel/Monografia-small.webp',
  'images/Carrusel/Pasantia-small.webp',
  'images/Carrusel/Ponencias-small.webp',
  'images/Carrusel/Proyecto-de-Investigacion-small.webp',
  'images/Carrusel/Semilleristas-small.webp',
];

async function optimizeImage(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;

    console.log(`📸 ${path.basename(filePath)}`);
    console.log(`   Antes: ${metadata.width}x${metadata.height} | ${(originalSize/1024).toFixed(1)} KB`);

    // Backup
    await fs.copyFile(filePath, `${filePath}.backup`);

    // Redimensionar agresivamente
    const aspectRatio = metadata.height / metadata.width;
    const newHeight = Math.round(CONFIG.targetWidth * aspectRatio);

    await sharp(filePath)
      .resize(CONFIG.targetWidth, newHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort,
        smartSubsample: true,
        nearLossless: false,
      })
      .toFile(`${filePath}.tmp`);

    await fs.rename(`${filePath}.tmp`, filePath);

    const newStats = await fs.stat(filePath);
    const saved = originalSize - newStats.size;

    console.log(`   Ahora: ${CONFIG.targetWidth}x${newHeight} | ${(newStats.size/1024).toFixed(1)} KB`);
    console.log(`   ✅ Ahorro: ${(saved/1024).toFixed(1)} KB\n`);

    return saved;

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🚀 OPTIMIZACIÓN ULTRA-AGRESIVA PARA PAGESPEED 90+');
  console.log(`📐 Target: ${CONFIG.targetWidth}px para display 455px (1.05x ratio)`);
  console.log(`🎨 Calidad: ${CONFIG.quality} (agresiva)\n`);
  console.log('='.repeat(60) + '\n');

  let totalSaved = 0;

  for (const imagePath of CAROUSEL_IMAGES) {
    const saved = await optimizeImage(imagePath);
    totalSaved += saved;
  }

  // Limpiar backups
  console.log('🧹 Limpiando backups...\n');
  for (const imagePath of CAROUSEL_IMAGES) {
    try {
      await fs.unlink(`${imagePath}.backup`);
    } catch {}
  }

  console.log('='.repeat(60));
  console.log(`✅ Total procesado: ${CAROUSEL_IMAGES.length} imágenes`);
  console.log(`💾 Total ahorrado: ${(totalSaved/1024).toFixed(1)} KB`);
  console.log(`📊 Promedio: ${(totalSaved/1024/CAROUSEL_IMAGES.length).toFixed(1)} KB por imagen`);
  console.log('='.repeat(60));
}

main().catch(console.error);
