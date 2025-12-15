import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function recompress(inputPath, quality = 72) {
  const abs = path.resolve(inputPath);
  const tmp = abs + '.tmp';
  try {
    const before = (await fs.stat(abs)).size;
    const img = sharp(abs);
    const meta = await img.metadata();
    // Reencode as webp with target quality; keep original dimensions
    await img.toFormat('webp', { quality }).toFile(tmp);
    await fs.rename(tmp, abs);
    const after = (await fs.stat(abs)).size;
    console.log(`Recompressed ${abs}`);
    console.log(`Format: ${meta.format}, ${meta.width}x${meta.height}`);
    console.log(`Size: ${(before/1024).toFixed(1)}KB -> ${(after/1024).toFixed(1)}KB at q=${quality}`);
  } catch (err) {
    try { await fs.unlink(tmp); } catch {}
    console.error('Failed recompress:', err.message);
    process.exit(1);
  }
}

const [, , input, q] = process.argv;
if (!input) {
  console.error('Usage: node scripts/recompress-single.js <path-to-image.webp> [quality]');
  process.exit(1);
}

recompress(input, q ? parseInt(q, 10) : 72);
