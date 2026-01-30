const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folder = './public/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara';

async function convertImages() {
  for (const i of ['01', '02', '03']) {
    const pngPath = path.join(folder, `${i}.png`);
    const webpPath = path.join(folder, `${i}.webp`);
    
    if (fs.existsSync(pngPath)) {
      try {
        await sharp(pngPath)
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        const stats = fs.statSync(webpPath);
        const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`✓ ${i}.webp creado (${sizeMb}MB)`);
      } catch (err) {
        console.error(`✗ Error converting ${i}.png:`, err.message);
      }
    } else {
      console.error(`✗ ${pngPath} no encontrado`);
    }
  }
}

convertImages();
