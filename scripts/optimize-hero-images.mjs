#!/usr/bin/env node
/**
 * Optimize Hero Images for Responsive Display
 * Generates responsive image variants (small, medium, large) from source images
 * Uses Sharp for high-quality WebP compression
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public/images');

/**
 * Image optimization profiles
 * Defines dimensions for different breakpoints and screen densities
 */
const heroImages = {
  'hero-nosotros': {
    // Mobile-first responsive breakpoints
    small: { width: 768, height: 400, quality: 80 },    // Mobile (< 640px)
    medium: { width: 1024, height: 500, quality: 82 },  // Tablet (≥ 640px, < 1024px)
    large: { width: 1920, height: 600, quality: 85 },   // Desktop (≥ 1024px)
  },
};

/**
 * Generate responsive image variants
 * @param {string} baseName - Base name of the image (without extension)
 * @param {Object} variants - Object with size definitions
 */
async function generateResponsiveImages(baseName, variants) {
  const sourceFile = path.join(publicDir, `${baseName}.webp`);

  if (!fs.existsSync(sourceFile)) {
    console.warn(`⚠️  Source image not found: ${sourceFile}`);
    return;
  }

  console.log(`\n📸 Processing: ${baseName}`);
  console.log(`   Source: ${sourceFile}`);

  for (const [variant, config] of Object.entries(variants)) {
    const outputPath = path.join(publicDir, `${baseName}-${variant}.webp`);
    const { width, height, quality } = config;

    try {
      const stats = await sharp(sourceFile)
        .resize(width, height, {
          fit: 'cover',
          position: 'center', // Focus on center (where people are)
          withoutEnlargement: true,
        })
        .webp({ quality })
        .toFile(outputPath);

      const fileSizeKB = (stats.size / 1024).toFixed(2);
      console.log(
        `   ✓ ${variant.padEnd(7)} (${width}x${height}) → ${fileSizeKB}KB`
      );
    } catch (error) {
      console.error(
        `   ✗ Failed to generate ${variant}: ${error.message}`
      );
    }
  }
}

/**
 * Validate existing images
 * Checks if all required variants exist
 */
function validateImages() {
  console.log('\n✅ Validating responsive image variants...\n');

  for (const [baseName, variants] of Object.entries(heroImages)) {
    console.log(`📋 ${baseName}`);
    let allValid = true;

    for (const variant of Object.keys(variants)) {
      const filePath = path.join(publicDir, `${baseName}-${variant}.webp`);
      const exists = fs.existsSync(filePath);
      const status = exists ? '✓' : '✗';

      console.log(`   ${status} ${baseName}-${variant}.webp`);
      if (!exists) allValid = false;
    }

    if (allValid) {
      console.log(`   → All variants present\n`);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🎨 Hero Image Optimization Script');
  console.log('==================================');

  // First validate
  validateImages();

  // Then regenerate if needed
  console.log('\n⚙️  Regenerating optimized variants...');
  for (const [baseName, variants] of Object.entries(heroImages)) {
    await generateResponsiveImages(baseName, variants);
  }

  console.log(
    '\n✅ Hero image optimization complete!\n'
  );
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
