import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const BACKUP_DIR = path.join(ROOT, 'backup-images');

// Only 3 sizes as requested
const SIZES = [
  { key: 'small', width: 480 },
  { key: 'medium', width: 960 },
  { key: 'large', width: 1600 },
];

const VALID_SRC_EXT = /(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/i;
const VARIANT_SUFFIX = /-(small|medium|large)\.(webp)$/i;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function walk(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    if (!d) continue;
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (/images-old/i.test(full)) continue;
        stack.push(full);
      } else {
        if (VALID_SRC_EXT.test(e.name)) out.push(full);
      }
    }
  }
  return out;
}

function baseName(file) {
  // Remove variant suffix and extension
  const noExt = file.replace(VALID_SRC_EXT, '');
  return noExt.replace(VARIANT_SUFFIX, '');
}

async function generateVariants(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const base = baseName(inputPath);
  const img = sharp(inputPath);
  const meta = await img.metadata();
  const maxW = meta.width || 1600;

  for (const { key, width } of SIZES) {
    const target = `${base}-${key}.webp`;
    if (fssync.existsSync(target)) continue;
    const w = Math.min(width, maxW);
    await sharp(inputPath)
      .resize({ width: w, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 78, alphaQuality: 80 })
      .toFile(target);
    console.log('Created', path.relative(ROOT, target));
  }
}

async function collectCodeReferences() {
  // Create a set of referenced filenames (relative to /public)
  const SRC_DIR = path.join(ROOT, 'src');
  const refs = new Set();
  async function scan(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await scan(full);
      else if (/\.(ts|tsx|js|jsx|css)$/i.test(e.name)) {
        const txt = await fs.readFile(full, 'utf8');
        const re = /["'`](?:\/)?images\/[A-Za-z0-9_\-\/\.]+["'`]/g;
        const matches = txt.match(re) || [];
        for (const m of matches) {
          const s = m.slice(1, -1); // strip quotes
          refs.add(s.startsWith('/') ? s : `/${s}`);
        }
      }
    }
  }
  await scan(SRC_DIR);
  return refs;
}

async function backupAndRemoveObsolete(files, refs) {
  await ensureDir(BACKUP_DIR);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const sessDir = path.join(BACKUP_DIR, ts);
  await ensureDir(sessDir);

  let moved = 0;
  for (const f of files) {
    // Skip already standardized variants
    if (VARIANT_SUFFIX.test(f)) continue;

    const rel = `/${path.relative(PUBLIC_DIR, f).replace(/\\/g, '/')}`;
    const relWebp = rel.replace(VALID_SRC_EXT, '-small.webp');

    const base = baseName(f);
    const variantsExist = ['small', 'medium', 'large']
      .every(k => fssync.existsSync(`${base}-${k}.webp`));

    // Remove originals that are not referenced and have webp variants
    if (!refs.has(rel) && !refs.has(relWebp) && variantsExist && /(\.png|\.jpg|\.jpeg|\.gif)$/i.test(f)) {
      const target = path.join(sessDir, path.basename(f));
      await fs.rename(f, target);
      console.log('Moved to backup:', path.relative(ROOT, f));
      moved += 1;
    }
  }
  console.log(`Obsolete originals moved: ${moved}`);
}

async function main() {
  console.log('Standardizing images to small/medium/large .webp...');
  try {
    await ensureDir(IMAGES_DIR);
  } catch {}

  const files = await walk(IMAGES_DIR);
  console.log(`Found ${files.length} image files under /public/images`);

  for (const f of files) {
    // Generate variants for every file, even if original is webp
    await generateVariants(f);
  }

  const refs = await collectCodeReferences();
  await backupAndRemoveObsolete(files, refs);

  console.log('Done standardizing images.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
