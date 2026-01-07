/**
 * Generate all favicon assets from source logo
 * Creates square 1:1 aspect ratio icons for all devices
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const sourceImage = path.join(publicDir, 'images', 'logo-fyt-small.webp');

// Sizes needed
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 }
];

async function generateFavicons() {
  try {
    // Read source image metadata
    const metadata = await sharp(sourceImage).metadata();
    console.log(`Source: ${metadata.width}x${metadata.height}`);

    // Create square base image (take the larger dimension)
    const targetSize = Math.max(metadata.width, metadata.height);
    
    // Create square canvas with white background, center the logo
    const squareBase = await sharp(sourceImage)
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    console.log('✓ Created square base image');

    // Generate all sizes
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(squareBase)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: name.includes('apple') ? 1 : 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate .ico file (16x16 + 32x32 multi-resolution)
    const ico16 = await sharp(squareBase)
      .resize(16, 16)
      .png()
      .toBuffer();
    
    const ico32 = await sharp(squareBase)
      .resize(32, 32)
      .png()
      .toBuffer();

    // Note: sharp doesn't natively support .ico, but we'll create a 32x32 PNG as favicon.ico
    await sharp(ico32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico (32x32)');

    // Generate SVG from PNG logo (rasterized in SVG wrapper for compatibility)
    // For best results, replace with actual vector logo if available
    const svg64Buffer = await sharp(squareBase)
      .resize(512, 512)
      .png()
      .toBuffer();
    
    const base64Image = svg64Buffer.toString('base64');
    
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
  <image width="512" height="512" xlink:href="data:image/png;base64,${base64Image}"/>
</svg>`;
    
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
    console.log('✓ Generated favicon.svg (embedded PNG logo)');

    console.log('\n✅ All favicons generated successfully!');
    console.log('✓ El logo completo está ahora en todos los favicons con aspect ratio 1:1');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
