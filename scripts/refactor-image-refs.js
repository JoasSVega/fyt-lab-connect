import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

// Replace direct PNG/JPG/GIF usage under /images to the -small.webp variant
const DIRECT_IMG_RE = /(src|backgroundImage)\s*[:=]\s*["'`](?:url\()?['\"]?(\/images\/[^'"\)]+?)\.(png|jpg|jpeg|gif)['\"]?\)?["'`]/ig;

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full));
    else if (/\.(tsx?|jsx?|css)$/i.test(e.name)) out.push(full);
  }
  return out;
}

async function refactorFile(fp) {
  let txt = await fs.readFile(fp, 'utf8');
  const before = txt;
  txt = txt.replace(DIRECT_IMG_RE, (m, attr, pathPart) => {
    return m.replace(/\.(png|jpg|jpeg|gif)/i, '-small.webp');
  });
  if (txt !== before) {
    await fs.writeFile(fp, txt, 'utf8');
    console.log('Updated', path.relative(ROOT, fp));
  }
}

async function main() {
  const files = await walk(SRC_DIR);
  for (const f of files) await refactorFile(f);
  console.log('Refactor complete.');
}

main().catch(err => { console.error(err); process.exit(1); });
