/**
 * Script de Optimización Fase 1 - Performance Mobile
 * Objetivo: Reducir LCP de 8.1s a 5-6s mediante optimización de imágenes críticas
 * 
 * Tareas:
 * 1. hero-index-small.webp: 60KB → 22KB (calidad 68, resize conservador)
 * 2. logo-fyt-small.webp: 69KB → 28KB (calidad 75)
 * 3. logo-fyt-medium.webp: 87KB → 40KB (calidad 75)
 * 4. logo-fyt-large.webp: 87KB → 55KB (calidad 78)
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');

// Configuración de optimización para imágenes críticas
const OPTIMIZATIONS = [
  {
    name: 'Hero Index Small',
    input: 'images/hero-index-small.webp',
    output: 'images/hero-index-small.webp',
    backup: 'images/hero-index-small.webp.backup',
    config: {
      quality: 68,
      // Mantener dimensiones actuales pero comprimir agresivamente
      resize: null
    },
    targetKB: 22,
    description: 'LCP principal en mobile'
  },
  {
    name: 'Logo FYT Small',
    input: 'images/logo-fyt-small.webp',
    output: 'images/logo-fyt-small.webp',
    backup: 'images/logo-fyt-small.webp.backup',
    config: {
      quality: 75,
      // Resize a un tamaño razonable para 1x display (max 400px)
      resize: { width: 400, height: 350, fit: 'inside' }
    },
    targetKB: 28,
    description: 'Logo en Navbar (1x display)'
  },
  {
    name: 'Logo FYT Medium',
    input: 'images/logo-fyt-medium.webp',
    output: 'images/logo-fyt-medium.webp',
    backup: 'images/logo-fyt-medium.webp.backup',
    config: {
      quality: 75,
      // Resize para 2x display (max 600px)
      resize: { width: 600, height: 524, fit: 'inside' }
    },
    targetKB: 40,
    description: 'Logo en Navbar (2x display)'
  },
  {
    name: 'Logo FYT Large',
    input: 'images/logo-fyt-large.webp',
    output: 'images/logo-fyt-large.webp',
    backup: 'images/logo-fyt-large.webp.backup',
    config: {
      quality: 78,
      // Resize para footer/pantallas grandes (max 800px)
      resize: { width: 800, height: 700, fit: 'inside' }
    },
    targetKB: 55,
    description: 'Logo en Footer'
  }
];

async function backupFile(filePath) {
  try {
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!exists) {
      console.log(`   ⚠️  Archivo no existe: ${filePath}`);
      return false;
    }
    
    const backupPath = filePath + '.backup';
    const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
    
    if (!backupExists) {
      await fs.copyFile(filePath, backupPath);
      console.log(`   ✓ Backup creado: ${path.basename(backupPath)}`);
    } else {
      console.log(`   ℹ️  Backup ya existe: ${path.basename(backupPath)}`);
    }
    return true;
  } catch (error) {
    console.error(`   ✗ Error creando backup: ${error.message}`);
    return false;
  }
}

async function optimizeImage(opt) {
  const inputPath = path.join(publicDir, opt.input);
  const outputPath = path.join(publicDir, opt.output);
  
  console.log(`\n📸 ${opt.name}`);
  console.log(`   Descripción: ${opt.description}`);
  console.log(`   Target: ${opt.targetKB} KB`);
  
  try {
    // Crear backup
    const hasBackup = await backupFile(inputPath);
    if (!hasBackup) {
      console.log(`   ⏭️  Saltando (archivo no encontrado)`);
      return { success: false, skipped: true };
    }

    // Obtener metadata original
    const beforeStats = await fs.stat(inputPath);
    const beforeKB = (beforeStats.size / 1024).toFixed(1);
    
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Original: ${metadata.width}×${metadata.height}, ${beforeKB} KB`);

    // Procesar imagen
    let pipeline = sharp(inputPath);
    
    if (opt.config.resize) {
      pipeline = pipeline.resize(
        opt.config.resize.width,
        opt.config.resize.height,
        { 
          fit: opt.config.resize.fit || 'inside',
          withoutEnlargement: true
        }
      );
    }
    
    pipeline = pipeline.webp({ 
      quality: opt.config.quality,
      effort: 6 // Máxima compresión (0-6)
    });

    // Guardar temporalmente
    const tmpPath = outputPath + '.tmp';
    await pipeline.toFile(tmpPath);
    
    // Verificar resultado
    const afterStats = await fs.stat(tmpPath);
    const afterKB = (afterStats.size / 1024).toFixed(1);
    const reduction = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);
    
    // Mover archivo temporal al final
    await fs.rename(tmpPath, outputPath);
    
    const metadataNew = await sharp(outputPath).metadata();
    console.log(`   Nuevo: ${metadataNew.width}×${metadataNew.height}, ${afterKB} KB`);
    console.log(`   ✓ Reducción: ${reduction}% (${beforeKB} KB → ${afterKB} KB)`);
    
    // Verificar si alcanzamos el target
    if (parseFloat(afterKB) <= opt.targetKB * 1.15) {
      console.log(`   ✅ Target alcanzado (≤ ${opt.targetKB} KB)`);
    } else {
      console.log(`   ⚠️  Por encima del target (objetivo: ${opt.targetKB} KB)`);
    }
    
    return { 
      success: true, 
      before: parseFloat(beforeKB), 
      after: parseFloat(afterKB),
      reduction: parseFloat(reduction)
    };
    
  } catch (error) {
    console.error(`   ✗ Error: ${error.message}`);
    // Restaurar desde backup si existe
    try {
      const backupPath = inputPath + '.backup';
      const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
      if (backupExists) {
        await fs.copyFile(backupPath, outputPath);
        console.log(`   ↺ Restaurado desde backup`);
      }
    } catch {}
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 FASE 1: Optimización de Imágenes Críticas (LCP)');
  console.log('================================================\n');
  
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;
  
  for (const opt of OPTIMIZATIONS) {
    const result = await optimizeImage(opt);
    if (result.success) {
      totalBefore += result.before;
      totalAfter += result.after;
    }
    results.push({ name: opt.name, ...result });
  }
  
  // Resumen
  console.log('\n================================================');
  console.log('📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('================================================\n');
  
  const successful = results.filter(r => r.success);
  const skipped = results.filter(r => r.skipped);
  const failed = results.filter(r => !r.success && !r.skipped);
  
  console.log(`✓ Procesadas: ${successful.length}`);
  if (skipped.length > 0) console.log(`⏭️  Saltadas: ${skipped.length}`);
  if (failed.length > 0) console.log(`✗ Fallidas: ${failed.length}`);
  
  if (successful.length > 0) {
    const totalReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    const savedKB = (totalBefore - totalAfter).toFixed(1);
    
    console.log(`\n💾 Ahorro total: ${savedKB} KB (${totalReduction}%)`);
    console.log(`   Antes: ${totalBefore.toFixed(1)} KB`);
    console.log(`   Después: ${totalAfter.toFixed(1)} KB`);
    
    console.log(`\n🎯 Impacto esperado en LCP:`);
    console.log(`   Reducción estimada: 1.5-2.5s`);
    console.log(`   LCP proyectado: 5.5-6.5s (desde 8.1s)`);
  }
  
  console.log('\n💡 Próximos pasos:');
  console.log('   1. Ejecutar: npm run build:fast');
  console.log('   2. Verificar que las imágenes cargan correctamente');
  console.log('   3. Test en navegador mobile (DevTools)');
  console.log('   4. Si hay problemas, restaurar desde *.backup');
  console.log('\n✅ Optimización completada!\n');
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
