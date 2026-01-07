import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public');

const toKB = (b) => (b / 1024).toFixed(1) + ' KB';

function isVariant(name) {
  return /-(\d{2,4})\.(webp|avif)$/i.test(name);
}

async function walk(dir) {
  let out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(full));
    else out.push(full);
  }
  return out;
}

(async () => {
  const files = (await walk(ROOT)).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
  const byBase = new Map();

  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const base = rel.replace(/-(\d{2,4})\.(webp|avif)$/i, '.$2').replace(/\.(avif)$/i, '.webp');
    const stat = await fs.stat(file);
    const list = byBase.get(base) || [];
    list.push({ file: rel, bytes: stat.size });
    byBase.set(base, list);
  }

  let totalOriginal = 0;
  let totalSmallestVariant = 0;

  console.log('Image optimization report (sizes on disk):');
  console.log('');
  for (const [base, items] of byBase) {
    const originals = items.filter((i) => !isVariant(i.file));
    const variants = items.filter((i) => isVariant(i.file));
    const origBytes = originals.reduce((a, b) => a + b.bytes, 0) || 0;
    const minVariant = variants.reduce((min, i) => (min === null || i.bytes < min ? i.bytes : min), null);
    totalOriginal += origBytes;
    if (minVariant != null) totalSmallestVariant += minVariant;

    console.log(`- ${base}`);
    if (origBytes) console.log(`  original: ${toKB(origBytes)} (${originals.map(o => o.file).join(', ')})`);
    if (variants.length) {
      const line = variants.map(v => `${v.file}=${toKB(v.bytes)}`).join(' | ');
      console.log(`  variants: ${line}`);
    }
  }
  console.log('');
  console.log(`TOTAL originals: ${toKB(totalOriginal)}`);
  if (totalSmallestVariant) {
    const saved = totalOriginal - totalSmallestVariant;
    const pct = totalOriginal ? ((saved / totalOriginal) * 100).toFixed(1) : '0.0';
    console.log(`Smallest-variant total: ${toKB(totalSmallestVariant)} (approx best-case)`);
    console.log(`Estimated max saving: ${toKB(saved)} (${pct}%)`);
  }
})();
