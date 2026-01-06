#!/usr/bin/env node

/**
 * Validador de contenido para build-time
 * 
 * Verifica la integridad de los datos DESPUÉS del build SSR para evitar:
 * - Slugs duplicados (conflictos de rutas)
 * - Slugs no URL-safe (problemas de routing)
 * - Campos obligatorios faltantes
 * - Excerpts fuera del rango óptimo para SEO
 * 
 * Si alguna validación falla, el build completo falla (fail-fast).
 * 
 * Uso:
 *   npm run validate:content  (después de npm run build:ssr)
 * 
 * Integración:
 *   Ejecutar DESPUÉS de build:ssr en el pipeline de SSG
 */

import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
// ========================================
// IMPORTAR DATOS DIRECTAMENTE DESDE SOURCE (TS)
// ========================================

async function loadDataFromSource() {
  try {
    const postsPath = path.join(projectRoot, 'src/data/divulgacionPosts.ts');
    const generatorPath = path.join(projectRoot, 'src/data/generateDivulgacionRoutes.ts');

    const postsModule = await import(pathToFileURL(postsPath).href);
    const generatorModule = await import(pathToFileURL(generatorPath).href);

    return {
      divulgacionPosts: postsModule.divulgacionPosts,
      getDivulgacionStats: generatorModule.getDivulgacionStats,
    };
  } catch (err) {
    console.error('\n❌ Error al cargar datos de divulgación desde el código fuente TS:');
    console.error(`   ${err.message}\n`);
    console.error('   Sugerencia: verifica rutas y que "tsx" esté instalado.\n');
    process.exit(1);
  }
}

const { divulgacionPosts, getDivulgacionStats } = await loadDataFromSource();

// ========================================
// VALIDADORES
// ========================================

const errors = [];
const warnings = [];

/**
 * Valida que un slug sea URL-safe
 * Permitido: a-z, 0-9, guiones (-)
 */
function isValidSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug);
}

/**
 * Valida un post completo
 */
function validatePost(post, index) {
  const prefix = `[divulgacionPosts[${index}]]`;

  // ========================================
  // VALIDACIÓN DE SLUG
  // ========================================
  
  if (!post.slug) {
    errors.push(`${prefix} Slug faltante`);
  } else {
    if (!isValidSlug(post.slug)) {
      errors.push(
        `${prefix} Slug no es URL-safe: "${post.slug}". ` +
        `Solo se permiten: a-z, 0-9, guiones (-). Sin mayúsculas, espacios ni caracteres especiales.`
      );
    }
    
    if (post.slug.length > 100) {
      warnings.push(`${prefix} Slug muy largo (${post.slug.length} chars). Recomendado: < 60 chars.`);
    }
    
    if (post.slug.startsWith('-') || post.slug.endsWith('-')) {
      errors.push(`${prefix} Slug no debe empezar ni terminar con guión: "${post.slug}"`);
    }
    
    if (post.slug.includes('--')) {
      warnings.push(`${prefix} Slug contiene guiones dobles: "${post.slug}"`);
    }
  }

  // ========================================
  // VALIDACIÓN DE CAMPOS OBLIGATORIOS
  // ========================================
  
  const requiredFields = [
    'title',
    'excerpt',
    'author',
    'authorRole',
    'authorImage',
    'date',
    'readTime',
    'category',
    'content',
  ];

  requiredFields.forEach(field => {
    if (!post[field]) {
      errors.push(`${prefix} Campo obligatorio faltante: "${field}"`);
    }
  });

  // ========================================
  // VALIDACIÓN DE TITLE
  // ========================================
  
  if (post.title) {
    if (post.title.length < 10) {
      warnings.push(`${prefix} Título muy corto (${post.title.length} chars). Recomendado: 40-70 chars.`);
    }
    
    if (post.title.length > 120) {
      warnings.push(`${prefix} Título muy largo (${post.title.length} chars). Recomendado: 40-70 chars.`);
    }
  }

  // ========================================
  // VALIDACIÓN DE EXCERPT (SEO CRÍTICO)
  // ========================================
  
  if (post.excerpt) {
    const excerptLength = post.excerpt.length;
    
    if (excerptLength < 20) {
      errors.push(
        `${prefix} Excerpt muy corto (${excerptLength} chars). ` +
        `Mínimo requerido: 20 chars (óptimo SEO: 120-160 chars).`
      );
    }
    
    if (excerptLength > 160) {
      warnings.push(
        `${prefix} Excerpt muy largo (${excerptLength} chars). ` +
        `Google truncará en ~160 chars. Considera acortarlo.`
      );
    }
    
    if (excerptLength >= 20 && excerptLength < 100) {
      warnings.push(
        `${prefix} Excerpt podría ser más descriptivo (${excerptLength} chars). ` +
        `Óptimo SEO: 120-160 chars.`
      );
    }
  }

  // ========================================
  // VALIDACIÓN DE FECHA
  // ========================================
  
  if (post.date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(post.date)) {
      errors.push(
        `${prefix} Fecha en formato incorrecto: "${post.date}". ` +
        `Formato esperado: YYYY-MM-DD (ej: 2026-01-06).`
      );
    } else {
      const parsedDate = new Date(post.date);
      if (isNaN(parsedDate.getTime())) {
        errors.push(`${prefix} Fecha inválida: "${post.date}"`);
      }
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      if (parsedDate > futureDate) {
        warnings.push(
          `${prefix} Fecha en el futuro: "${post.date}". ` +
          `¿Es intencional? Los artículos futuros pueden no aparecer en algunos listados.`
        );
      }
    }
  }

  // ========================================
  // VALIDACIÓN DE CONTENIDO
  // ========================================
  
  if (post.content) {
    if (post.content.trim().length < 100) {
      warnings.push(
        `${prefix} Contenido muy corto (${post.content.length} chars). ` +
        `Considera expandir para mejorar SEO y valor para el lector.`
      );
    }
  }

  // ========================================
  // VALIDACIÓN DE AUTHOR IMAGE
  // ========================================
  
  if (post.authorImage && !post.authorImage.startsWith('/')) {
    warnings.push(
      `${prefix} authorImage debería ser una ruta absoluta (empezar con /): "${post.authorImage}"`
    );
  }

  // ========================================
  // VALIDACIÓN DE TAGS
  // ========================================
  
  if (post.tags) {
    if (!Array.isArray(post.tags)) {
      errors.push(`${prefix} "tags" debe ser un array`);
    } else {
      if (post.tags.length === 0) {
        warnings.push(`${prefix} Sin tags. Considera añadir 2-5 tags relevantes para SEO.`);
      }
      
      if (post.tags.length > 10) {
        warnings.push(`${prefix} Demasiados tags (${post.tags.length}). Recomendado: 3-5 tags.`);
      }
    }
  }
}

/**
 * Validación de slugs únicos (crítico para evitar conflictos de rutas)
 */
function validateUniqueSlugs() {
  const slugs = new Map();

  divulgacionPosts.forEach((post, index) => {
    if (post.slug) {
      if (slugs.has(post.slug)) {
        errors.push(
          `Slug duplicado: "${post.slug}" ` +
          `(índices ${slugs.get(post.slug)} y ${index}). ` +
          `Cada slug debe ser único.`
        );
      } else {
        slugs.set(post.slug, index);
      }
    }
  });
}

// ========================================
// EJECUTAR VALIDACIONES
// ========================================

console.log('\n🔍 Validando contenido de divulgación...\n');

// Validar cada post
divulgacionPosts.forEach((post, index) => {
  validatePost(post, index);
});

// Validar unicidad de slugs
validateUniqueSlugs();

// ========================================
// REPORTE DE RESULTADOS
// ========================================

const stats = getDivulgacionStats();

console.log('📊 ESTADÍSTICAS');
console.log('─'.repeat(60));
console.log(`Total de artículos: ${stats.totalPosts}`);
console.log(`Categorías: ${stats.categories.join(', ')}`);
console.log(`Palabras totales: ~${stats.totalWords.toLocaleString()}`);
if (stats.latestDate) {
  console.log(`Último artículo: ${stats.latestDate.toLocaleDateString('es-ES')}`);
}
console.log('');

// Mostrar warnings
if (warnings.length > 0) {
  console.log('⚠️  ADVERTENCIAS');
  console.log('─'.repeat(60));
  warnings.forEach(warning => console.log(`  ${warning}`));
  console.log('');
}

// Mostrar errores
if (errors.length > 0) {
  console.error('❌ ERRORES CRÍTICOS');
  console.error('─'.repeat(60));
  errors.forEach(error => console.error(`  ${error}`));
  console.error('');
  console.error(`\n❌ Validación fallida: ${errors.length} error(es) encontrado(s).`);
  console.error('   El build no puede continuar hasta que se corrijan.\n');
  process.exit(1);
}

// Éxito
console.log('✅ VALIDACIÓN EXITOSA');
console.log('─'.repeat(60));
console.log(`  ${stats.totalPosts} artículo(s) validado(s) correctamente.`);
if (warnings.length > 0) {
  console.log(`  ${warnings.length} advertencia(s) detectada(s) (no bloquean el build).`);
}
console.log('');
