import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_QUALITY = 85;

const members = [
  'Julian-Martinez',
  'Luis-Utria',
  'Mariana-Mercado',
  'Roger-Caraballo',
  'Sergio-Uribe',
  'Shirley-Cavadia',
  'Yaneth-Garcia'
];

async function generateOGImages() {
  const equiPoPath = path.join(__dirname, 'images/equipo');
  
  for (const member of members) {
    const largePath = path.join(equiPoPath, `${member}-large.webp`);
    const ogPath = path.join(equiPoPath, `${member}-og.webp`);
    
    // Skip if OG already exists
    if (fs.existsSync(ogPath)) {
      console.log(`✓ ${member}-og.webp already exists`);
      continue;
    }
    
    // Check if large image exists
    if (!fs.existsSync(largePath)) {
      console.log(`✗ ${member}-large.webp not found`);
      continue;
    }
    
    try {
      await sharp(largePath)
        .resize(OG_WIDTH, OG_HEIGHT, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: OG_QUALITY })
        .toFile(ogPath);
      
      const stats = fs.statSync(ogPath);
      const sizeKb = (stats.size / 1024).toFixed(1);
      console.log(`✓ Created ${member}-og.webp (${sizeKb}KB)`);
    } catch (error) {
      console.error(`✗ Error creating ${member}-og.webp:`, error.message);
    }
  }
  
  console.log('\nDone! All OG images have been generated.');
}

generateOGImages();
