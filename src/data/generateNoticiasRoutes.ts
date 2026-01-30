/**
 * Generador automático de rutas y metadatos para noticias institucionales
 *
 * Fuente única de verdad: noticias.ts
 * Consumidores: routesMeta.ts, main.ssg.tsx
 */

import { noticias } from './noticias';
import type { Noticia } from '@/types/noticias';

/**
 * Genera automáticamente todas las rutas dinámicas de noticias
 * Formato: /noticias/:slug
 */
export function generateNoticiasRoutes(): string[] {
  return noticias.map(noticia => `/noticias/${noticia.slug}`);
}

/**
 * Genera automáticamente metadatos SEO por noticia
 */
export function generateNoticiasMeta(): Record<string, { title: string; description: string }> {
  const meta: Record<string, { title: string; description: string }> = {};

  noticias.forEach((noticia: Noticia) => {
    const path = `/noticias/${noticia.slug}`;
    meta[path] = {
      title: `${noticia.title} | Noticias FyT`,
      description: noticia.summary,
    };
  });

  return meta;
}

/**
 * Obtiene una noticia por slug (para SSR)
 */
export function getNoticiaBySlugSSR(slug: string): Noticia | undefined {
  return noticias.find(noticia => noticia.slug === slug);
}
