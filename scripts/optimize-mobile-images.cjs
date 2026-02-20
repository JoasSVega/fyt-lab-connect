#!/usr/bin/env node

/**
 * Script para optimizar imágenes para móviles
 * 
 * Problema: Imágenes -small.webp son 800x689px pero se muestran a 455x455px
 * Solución: Redimensionar a 600x517px (suficiente para 455px con 1.32x DPR)
 * Ahorro: ~35 KiB por imagen × 18 imágenes = ~630 KiB
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuración
const CONFIG = {
  targetWidth: 600, // Para display de 455px da 1.32x DPR (aceptable para Retina)
  quality: 85, // Balance entre calidad y tamaño
  effort: 6, // Esfuerzo de compresión WebP (0-6)
};

// Directorios a procesar
const DIRS = [
  'images/Carrusel',
  'images', // Para hero images
];

async function getImageDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    return null;
  }
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);
  
  try {
    // Obtener dimensiones actuales
    const dimensions = await getImageDimensions(filePath);
    if (!dimensions) {
      console.log(`❌ No se pudo leer: ${fileName}`);
      return { success: false, saved: 0 };
    }

    // Solo procesar si es más grande que el target
    if (dimensions.width <= CONFIG.targetWidth) {
      console.log(`⏭️  Ya optimizado: ${fileName} (${dimensions.width}x${dimensions.height})`);
      return { success: true, saved: 0 };
    }

    // Obtener tamaño original
    const stats = await fs.stat(filePath);
    const originalSize = stats.size;

    // Crear backup
    const backupPath = `${filePath}.backup`;
    await fs.copyFile(filePath, backupPath);

    // Redimensionar y optimizar
    const aspectRatio = dimensions.height / dimensions.width;
    const newHeight = Math.round(CONFIG.targetWidth * aspectRatio);

    await sharp(filePath)
      .resize(CONFIG.targetWidth, newHeight, {
        kernel: sharp.kernel.lanczos3, // Mejor calidad de redimensionamiento
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort,
        lossless: false
      })
      .toFile(`${filePath}.tmp`);

    // Reemplazar original con optimizado
    await fs.rename(`${filePath}.tmp`, filePath);

    // Calcular ahorro
    const newStats = await fs.stat(filePath);
    const newSize = newStats.size;
    const saved = originalSize - newSize;

    console.log(`✅ ${fileName}: ${dimensions.width}x${dimensions.height} → ${CONFIG.targetWidth}x${newHeight} | ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB | Ahorro: ${(saved/1024).toFixed(1)}KB`);

    return { success: true, saved };

  } catch (error) {
    console.error(`❌ Error procesando ${fileName}:`, error.message);
    // Restaurar backup si existe
    const backupPath = `${filePath}.backup`;
    try {
      await fs.copyFile(backupPath, filePath);
      await fs.unlink(backupPath);
    } catch {}
    return { success: false, saved: 0 };
  }
}

async function processDirectory(dirPath) {
  console.log(`\n📁 Procesando: ${dirPath}`);
  
  try {
    const files = await fs.readdir(dirPath);
    const smallFiles = files.filter(f => 
      f.endsWith('-small.webp') && 
      !f.includes('-small-') && // Excluir duplicados
      !f.endsWith('.backup')
    );

    if (smallFiles.length === 0) {
      console.log('   No hay archivos -small.webp para optimizar');
      return { processed: 0, saved: 0 };
    }

    let totalSaved = 0;
    let processedCount = 0;

    for (const file of smallFiles) {
      const filePath = path.join(dirPath, file);
      const result = await optimizeImage(filePath);
      if (result.success) {
        processedCount++;
        totalSaved += result.saved;
      }
    }

    return { processed: processedCount, saved: totalSaved };

  } catch (error) {
    console.error(`❌ Error leyendo directorio ${dirPath}:`, error.message);
    return { processed: 0, saved: 0 };
  }
}

async function cleanupBackups() {
  console.log('\n🧹 Limpiando backups...');
  for (const dir of DIRS) {
    try {
      const files = await fs.readdir(dir);
      const backups = files.filter(f => f.endsWith('.backup'));
      for (const backup of backups) {
        await fs.unlink(path.join(dir, backup));
        console.log(`   Eliminado: ${backup}`);
      }
    } catch (error) {
      // Ignorar errores de limpieza
    }
  }
}

async function main() {
  console.log('🚀 Iniciando optimización de imágenes para móviles');
  console.log(`📐 Redimensionando a: ${CONFIG.targetWidth}px de ancho`);
  console.log(`🎨 Calidad WebP: ${CONFIG.quality}`);
  console.log(`⚙️  Esfuerzo de compresión: ${CONFIG.effort}\n`);

  let totalProcessed = 0;
  let totalSaved = 0;

  for (const dir of DIRS) {
    const fullPath = path.join(process.cwd(), dir);
    try {
      await fs.access(fullPath);
      const result = await processDirectory(fullPath);
      totalProcessed += result.processed;
      totalSaved += result.saved;
    } catch (error) {
      console.log(`⏭️  Saltando ${dir} (no existe o no accesible)`);
    }
  }

  await cleanupBackups();

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Optimización completada`);
  console.log(`📊 Imágenes procesadas: ${totalProcessed}`);
  console.log(`💾 Ahorro total: ${(totalSaved/1024).toFixed(1)} KB`);
  console.log('='.repeat(60));
}

main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
