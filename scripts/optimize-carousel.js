/**
 * Optimización de imágenes del carrusel
 * Reducir las más pesadas (>65KB) a ~35-40KB
 */
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carruselDir = path.join(__dirname, '..', 'public', 'images', 'Carrusel');

const images = [
  'Cursos-medium.webp',
  'Estudios-In-silico-medium.webp',
  'Ponencias-medium.webp',
  'Comunidad-medium.webp',
  'Pasantia-medium.webp',
  'Farmacoepidemiologia-medium.webp'
];

async function optimizeCarousel() {
  console.log('🎠 Optimización de imágenes del carrusel\n');
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  for (const img of images) {
    const fullPath = path.join(carruselDir, img);
    
    try {
      const before = (await fs.stat(fullPath)).size;
      totalBefore += before;
      
      // Backup
      const backupPath = fullPath + '.backup';
      const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
      if (!backupExists) {
        await fs.copyFile(fullPath, backupPath);
      }
      
      // Optimizar: resize a max 800px, calidad 70
      await sharp(fullPath)
        .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 70, effort: 6 })
        .toFile(fullPath + '.tmp');
      
      const after = (await fs.stat(fullPath + '.tmp')).size;
      totalAfter += after;
      
      await fs.rename(fullPath + '.tmp', fullPath);
      
      const beforeKB = (before / 1024).toFixed(1);
      const afterKB = (after / 1024).toFixed(1);
      const reduction = ((1 - after / before) * 100).toFixed(1);
      
      console.log(`✓ ${img}`);
      console.log(`  ${beforeKB} KB → ${afterKB} KB (-${reduction}%)\n`);
      
    } catch (err) {
      console.error(`✗ Error en ${img}:`, err.message);
    }
  }
  
  const totalReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  const savedKB = ((totalBefore - totalAfter) / 1024).toFixed(1);
  
  console.log(`\n💾 Total ahorrado: ${savedKB} KB (${totalReduction}%)`);
  console.log(`✅ Optimización completada!\n`);
}

optimizeCarousel();
