import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de tamaños estándar
const SIZES = {
  small: { width: 800, quality: 85 },
  medium: { width: 1600, quality: 85 },
  large: { width: 2400, quality: 85 }
};

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
const outputDir = path.join(publicDir, 'images-optimized');

// Lista de imágenes a procesar
const imagesToProcess = [
  // Heroes
  { input: 'images/hero-index.png', basename: 'hero-index' },
  { input: 'images/hero-nosotros.png', basename: 'hero-nosotros' },
  { input: 'images/hero-herramientas.png', basename: 'hero-herramientas' },
  // Logo
  { input: 'logo-fyt.png', basename: 'logo-fyt', folder: '' },
  // Objetivo
  { input: 'images/Objetivo.jpeg', basename: 'objetivo' },
  // Hero Index variations
  { input: 'images/Hero-Index.jpg', basename: 'hero-index-alt' }
];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function processImage(inputPath, outputBasename, outputFolder = 'images-optimized') {
  const fullInputPath = path.join(publicDir, inputPath);
  const outputDirPath = outputFolder ? path.join(publicDir, outputFolder) : publicDir;
  
  await ensureDir(outputDirPath);

  console.log(`\n📸 Processing: ${inputPath}`);

  try {
    const metadata = await sharp(fullInputPath).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

    for (const [sizeName, config] of Object.entries(SIZES)) {
      const outputPath = path.join(outputDirPath, `${outputBasename}-${sizeName}.webp`);
      
      await sharp(fullInputPath)
        .resize(config.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: config.quality })
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✓ ${sizeName}: ${config.width}px → ${sizeKB} KB`);
    }
  } catch (error) {
    console.error(`   ✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processCarouselImages() {
  const carouselDir = path.join(imagesDir, 'Carrusel');
  const outputCarouselDir = path.join(outputDir, 'Carrusel');
  
  await ensureDir(outputCarouselDir);

  try {
    const files = await fs.readdir(carouselDir);
    const imageFiles = files.filter(f => 
      /\.(jpg|jpeg|png|webp)$/i.test(f) && 
      !/-(small|medium|large|128|256|400|800|1200)\./.test(f)
    );

    console.log(`\n📁 Processing Carousel (${imageFiles.length} images):`);

    for (const file of imageFiles) {
      const basename = path.parse(file).name;
      const inputPath = path.join(carouselDir, file);
      
      for (const [sizeName, config] of Object.entries(SIZES)) {
        const outputPath = path.join(outputCarouselDir, `${basename}-${sizeName}.webp`);
        
        await sharp(inputPath)
          .resize(config.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: config.quality })
          .toFile(outputPath);
      }
      
      console.log(`   ✓ ${file}`);
    }
  } catch (error) {
    console.error(`Error processing carousel:`, error.message);
  }
}

async function processEquipoImages() {
  const equipoDir = path.join(imagesDir, 'equipo');
  const outputEquipoDir = path.join(outputDir, 'equipo');
  
  await ensureDir(outputEquipoDir);

  try {
    const files = await fs.readdir(equipoDir);
    const imageFiles = files.filter(f => 
      /\.(jpg|jpeg|png|webp)$/i.test(f) &&
      !/-(small|medium|large)\./.test(f)
    );

    console.log(`\n👥 Processing Equipo (${imageFiles.length} images):`);

    for (const file of imageFiles) {
      const basename = path.parse(file).name;
      const inputPath = path.join(equipoDir, file);
      
      for (const [sizeName, config] of Object.entries(SIZES)) {
        const outputPath = path.join(outputEquipoDir, `${basename}-${sizeName}.webp`);
        
        await sharp(inputPath)
          .resize(config.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: config.quality })
          .toFile(outputPath);
      }
      
      console.log(`   ✓ ${file}`);
    }
  } catch (error) {
    console.error(`Error processing equipo:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log('Target sizes:');
  console.log('  - Small (mobile): 800px');
  console.log('  - Medium (tablet/laptop): 1600px');
  console.log('  - Large (desktop/4K): 2400px');

  // Process main images
  for (const img of imagesToProcess) {
    await processImage(img.input, img.basename, img.folder || 'images-optimized');
  }

  // Process carousel
  await processCarouselImages();

  // Process equipo
  await processEquipoImages();

  console.log('\n✅ Image optimization complete!');
  console.log(`\n📂 Optimized images saved to: ${outputDir}`);
  console.log('\nNext steps:');
  console.log('1. Review the optimized images');
  console.log('2. Replace old images with new ones');
  console.log('3. Update code references');
  console.log('4. Delete old redundant images');
}

main().catch(console.error);
