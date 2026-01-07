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

    // PASO 1: Recortar espacios en blanco/transparentes del logo original
    console.log('✓ Recortando espacios en blanco del logo...');
    const trimmedBuffer = await sharp(sourceImage)
      .trim({ threshold: 10 }) // Elimina bordes con alpha < 10
      .toBuffer();
    
    const trimmedMeta = await sharp(trimmedBuffer).metadata();
    console.log(`✓ Logo recortado: ${trimmedMeta.width}x${trimmedMeta.height}`);

    // PASO 2: Crear base cuadrada con FONDO TRANSPARENTE y padding mínimo (2%)
    const targetSize = Math.max(trimmedMeta.width, trimmedMeta.height);
    const paddingPercent = 0.02; // 2% de padding
    const finalSize = Math.ceil(targetSize / (1 - paddingPercent * 2));
    
    const squareBase = await sharp(trimmedBuffer)
      .resize(targetSize, targetSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // TRANSPARENTE
      })
      .extend({
        top: Math.floor(finalSize * paddingPercent),
        bottom: Math.floor(finalSize * paddingPercent),
        left: Math.floor(finalSize * paddingPercent),
        right: Math.floor(finalSize * paddingPercent),
        background: { r: 0, g: 0, b: 0, alpha: 0 } // TRANSPARENTE
      })
      .toBuffer();

    console.log('✓ Creada imagen base cuadrada con fondo transparente');

    // PASO 3: Generar todos los tamaños
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(squareBase)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // SIEMPRE TRANSPARENTE
        })
        .png({ compressionLevel: 9, palette: true })
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size}) con fondo transparente`);
    }

    // Generate .ico file (16x16 + 32x32 multi-resolution) CON TRANSPARENCIA
    const ico16 = await sharp(squareBase)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();
    
    const ico32 = await sharp(squareBase)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();

    // Note: sharp doesn't natively support .ico, but we'll create a 32x32 PNG as favicon.ico
    await sharp(ico32)
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico (32x32) con fondo transparente');

    // Generate SVG from PNG logo (rasterized in SVG wrapper for compatibility)
    // For best results, replace with actual vector logo if available
    const svg64Buffer = await sharp(squareBase)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9 })
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
