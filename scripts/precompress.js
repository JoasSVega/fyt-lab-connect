#!/usr/bin/env node
/**
 * Precompress build assets with Brotli and Gzip
 * This allows servers to serve pre-compressed files for better performance
 */

import { promises as fs } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip, createBrotliCompress } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, '../dist');

const compressibleExtensions = ['.js', '.css', '.html', '.json', '.svg', '.xml', '.txt'];
const minSizeBytes = 1024; // Only compress files > 1KB

async function* walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(path);
    } else {
      yield path;
    }
  }
}

async function compressFile(filePath, algorithm) {
  const ext = algorithm === 'brotli' ? '.br' : '.gz';
  const outputPath = filePath + ext;
  
  const compressor = algorithm === 'brotli' 
    ? createBrotliCompress() // Use default quality (11)
    : createGzip({ level: 9 }); // Max compression

  try {
    await pipeline(
      createReadStream(filePath),
      compressor,
      createWriteStream(outputPath)
    );
    
    const [original, compressed] = await Promise.all([
      fs.stat(filePath),
      fs.stat(outputPath)
    ]);
    
    const ratio = ((1 - compressed.size / original.size) * 100).toFixed(1);
    console.log(`  ✓ ${algorithm}: ${(compressed.size / 1024).toFixed(1)}KB (${ratio}% reduction)`);
  } catch (err) {
    console.error(`  ✗ ${algorithm} failed:`, err.message);
  }
}

async function precompressAssets() {
  console.log('🗜️  Precompressing build assets...\n');
  
  try {
    await fs.access(distPath);
  } catch {
    console.error('❌ dist/ directory not found. Run build first.');
    process.exit(1);
  }

  let processed = 0;
  let skipped = 0;

  for await (const filePath of walkDir(distPath)) {
    const isCompressible = compressibleExtensions.some(ext => filePath.endsWith(ext));
    if (!isCompressible) continue;

    const stats = await fs.stat(filePath);
    if (stats.size < minSizeBytes) {
      skipped++;
      continue;
    }

    const relativePath = filePath.replace(distPath, '');
    console.log(`\n📦 ${relativePath} (${(stats.size / 1024).toFixed(1)}KB)`);
    
    await Promise.all([
      compressFile(filePath, 'gzip'),
      compressFile(filePath, 'brotli')
    ]);
    
    processed++;
  }

  console.log(`\n✅ Done! Processed ${processed} files, skipped ${skipped} small files.`);
}

precompressAssets().catch(err => {
  console.error('❌ Precompression failed:', err);
  process.exit(1);
});
