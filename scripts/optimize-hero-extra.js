/**
 * Optimización adicional del hero para alcanzar 22KB
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const heroPath = path.join(publicDir, 'images/hero-index-small.webp');

async function optimizeHero() {
  console.log('🎯 Optimización adicional del hero...\n');
  
  // Reducir a 640px de ancho (suficiente para mobile)
  await sharp(heroPath)
    .resize(640, null, { 
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 68, effort: 6 })
    .toFile(heroPath + '.tmp');
  
  const fs = await import('fs/promises');
  const stats = await fs.stat(heroPath + '.tmp');
  const sizeKB = (stats.size / 1024).toFixed(1);
  
  console.log(`Nuevo tamaño: ${sizeKB} KB`);
  
  if (parseFloat(sizeKB) <= 25) {
    await fs.rename(heroPath + '.tmp', heroPath);
    console.log('✅ Optimización exitosa!');
  } else {
    await fs.unlink(heroPath + '.tmp');
    console.log('⚠️  No alcanzó el target, manteniendo versión actual');
  }
}

optimizeHero();
