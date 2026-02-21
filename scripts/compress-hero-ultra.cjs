#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;

async function compressHero() {
  const filePath = 'images/hero-index-small.webp';
  
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = await fs.stat(filePath);
    console.log(`📸 hero-index-small.webp`);  
    console.log(`   Antes: ${metadata.width}x${metadata.height} | ${(stats.size/1024).toFixed(1)} KB`);

    await fs.copyFile(filePath, `${filePath}.backup`);

    await sharp(filePath)
      .webp({
        quality: 68,        // Ultra agresivo
        effort: 6,
        smartSubsample: true,
        nearLossless: false,
      })
      .toFile(`${filePath}.tmp`);

    await fs.rename(`${filePath}.tmp`, filePath);

    const newStats = await fs.stat(filePath);
    const saved = stats.size - newStats.size;

    console.log(`   Ahora: ${(newStats.size/1024).toFixed(1)} KB`);
    console.log(`   ✅ Ahorro: ${(saved/1024).toFixed(1)} KB`);

    await fs.unlink(`${filePath}.backup`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

compressHero();
