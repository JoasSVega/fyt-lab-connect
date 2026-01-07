import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Directories to scan
const roots = [
  path.resolve(process.cwd(), 'public'),
  path.resolve(process.cwd(), 'src', 'assets')
];

async function findImageFiles(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await findImageFiles(full));
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// Generate responsive variants (and recompress existing webp)
const WIDTHS = [128, 256, 400, 800, 1200, 1600, 1920];

async function convertFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const base = filePath.replace(/\.(png|jpe?g|webp)$/i, '');
    const img = sharp(filePath);
    const meta = await img.metadata();
    const maxWidth = meta.width || 1920;

    // Helper to generate one variant
    const gen = async (fmt, width) => {
      const out = `${base}-${width}.${fmt}`;
      try {
        await fs.access(out); // skip if exists
        return;
      } catch {}
      const pipeline = sharp(filePath)
        .resize({ width: Math.min(width, maxWidth), withoutEnlargement: true });

      if (fmt === 'webp') {
        await pipeline.webp({ quality: 78, alphaQuality: 80 }).toFile(out);
      } else if (fmt === 'avif') {
        await pipeline.avif({ quality: 55 }).toFile(out);
      }
      console.log(`Created: ${path.relative(process.cwd(), out)}`);
    };

    // Base optimized webp for original size (compat for places using extension replacement)
    if (!/\.webp$/.test(filePath)) {
      const webpBase = `${base}.webp`;
      try {
        await fs.access(webpBase);
      } catch {
        await sharp(filePath).webp({ quality: 80, alphaQuality: 80 }).toFile(webpBase);
        console.log(`Converted: ${filePath} -> ${webpBase}`);
      }
    }

    for (const w of WIDTHS) {
      if (w <= maxWidth) {
        await gen('webp', w);
        await gen('avif', w);
      }
    }
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err.message || err);
  }
}

(async () => {
  try {
    for (const root of roots) {
      // skip if not exists
      try {
        await fs.access(root);
      } catch (err) {
        continue;
      }
      const imgs = await findImageFiles(root);
      console.log(`Found ${imgs.length} images (png/jpg/jpeg) under ${root}`);
      for (const file of imgs) {
        await convertFile(file);
      }
    }
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
