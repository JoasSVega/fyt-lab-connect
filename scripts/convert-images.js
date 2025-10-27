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
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function convertFile(filePath) {
  try {
    const outPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
    // Use sharp to convert to webp with quality 80 and keep alpha
    await sharp(filePath)
      .webp({ quality: 80, alphaQuality: 80 })
      .toFile(outPath);
    console.log(`Converted: ${filePath} -> ${outPath}`);
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
