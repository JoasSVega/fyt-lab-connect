/**
 * Generador automático de rutas y metadatos para artículos de divulgación
 * 
 * Este archivo es el puente entre los datos (divulgacionPosts.ts) y el sistema de SSG.
 * Garantiza que cualquier artículo nuevo se prerrenderice automáticamente sin intervención manual.
 * 
 * Fuente única de verdad: divulgacionPosts.ts
 * Consumidores: routesMeta.ts, main.ssg.tsx
 */

import { divulgacionPosts } from './divulgacionPosts';
import type { DivulgacionPost } from '@/types/divulgacion';

/**
 * Genera automáticamente todas las rutas dinámicas de artículos
 * Formato: /divulgacion/:slug
 * 
 * @returns Array de rutas absolutas a prerrenderizar
 */
export function generateDivulgacionRoutes(): string[] {
  return divulgacionPosts.map(post => `/divulgacion/${post.slug}`);
}

/**
 * Genera automáticamente metadatos SEO por artículo
 * Incluye: title, description
 * 
 * @returns Record con path → metadata para cada artículo
 */
export function generateDivulgacionMeta(): Record<string, { title: string; description: string }> {
  const meta: Record<string, { title: string; description: string }> = {};
  
  divulgacionPosts.forEach((post: DivulgacionPost) => {
    const path = `/divulgacion/${post.slug}`;
    meta[path] = {
      title: post.title,
      description: post.excerpt,
    };
  });
  
  return meta;
}

/**
 * Obtiene un post por slug (para uso en SSR)
 * 
 * @param slug - Identificador único del artículo
 * @returns Post completo o undefined si no existe
 */
export function getPostBySlugSSR(slug: string): DivulgacionPost | undefined {
  return divulgacionPosts.find(post => post.slug === slug);
}

/**
 * Estadísticas de contenido (para reportes)
 */
export function getDivulgacionStats() {
  const categories = new Set(divulgacionPosts.map(p => p.category).filter(Boolean));
  const totalWords = divulgacionPosts.reduce((acc, post) => {
    // Estimar palabras del contenido HTML (strip tags aproximado)
    const textContent = post.content.replace(/<[^>]+>/g, '');
    return acc + textContent.split(/\s+/).length;
  }, 0);

  return {
    totalPosts: divulgacionPosts.length,
    categories: Array.from(categories),
    totalWords,
    latestDate: divulgacionPosts.length > 0 
      ? new Date(Math.max(...divulgacionPosts.map(p => new Date(p.date).getTime())))
      : null,
  };
}
