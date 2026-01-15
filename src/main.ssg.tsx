/**
 * SSG/SSR Entry Point
 * 
 * Este módulo exporta las funciones necesarias para el prerender estático:
 * - getRoutes(): Lista de rutas a prerenderizar
 * - render(path): Renderiza una ruta y retorna { html, head }
 * Soporte para:
 * - Rutas estáticas (páginas institucionales)
 * - Rutas dinámicas (artículos de blog, etc.)
 * El head SEO se adapta dinámicamente según el tipo de contenido.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { routeMeta, routesToPrerender } from './seo/routesMeta';
import { getPostBySlugSSR } from './data/generateDivulgacionRoutes';
/**
 * Lista de rutas públicas a prerenderizar
 * Incluye tanto rutas estáticas como dinámicas
 */
export function getRoutes(): string[] {
  return routesToPrerender;
}
/**
 * Renderiza una ruta específica y genera el HTML + head SEO
 * 
 * Lógica de meta tags:
 * - Para artículos (/divulgacion/:slug): Meta tags específicos del artículo
 * - Para páginas estáticas: Meta tags genéricos de routeMeta
 * @param path - Ruta absoluta a renderizar (ej: '/divulgacion/actualizacion-codigos-cups')
 * @returns { html, head } - HTML del cuerpo y tags del head
 */
export function render(path: string): { html: string; head: string } {
  const meta = routeMeta[path] || routeMeta['/'];
  const canonical = `https://fyt-research.org${path === '/' ? '' : path}`;
  const baseUrl = 'https://fyt-research.org';
  // ========================================
  // DETECCIÓN DE TIPO DE CONTENIDO
  // ========================================
  // Detectar si es un artículo de divulgación
  const divulgacionMatch = path.match(/^\/divulgacion\/([^/]+)$/);
  const post = divulgacionMatch ? getPostBySlugSSR(divulgacionMatch[1]) : null;
  // ========================================
  // RENDERIZADO SSR DEL COMPONENTE REACT
  // ========================================
  const app = (
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );

  const html = renderToString(app);

  // ========================================
  // GENERACIÓN DE HEAD SEO DINÁMICO
  // ========================================

  let headArray: string[];
  if (post) {
    // Usar imagen OG optimizada del autor si existe, o el logo por defecto
    let ogImage = '/images/logo-fyt-og.webp';
    if (post.authorImage) {
      // Convertir la ruta de la imagen del autor a la versión OG
      // Primero remover sufijos de tamaño (-large, -medium, -small)
      ogImage = post.authorImage.replace(/-(large|medium|small)\.webp$/, '.webp');
      // Luego agregar el sufijo OG
      ogImage = ogImage.replace(/\.webp$/, '-og.webp');
    }
    
    // META TAGS PARA ARTÍCULOS (OpenGraph Article)
    headArray = [
  `<title>${post.title}</title>`,
  `<meta name="author" content="${post.author}">`,
  `<meta name="description" content="${post.excerpt}">`,
  `<link rel="canonical" href="${canonical}">`,
  
  // Imagen social (autor o logo) - optimizada para OG
  `<meta property="og:image" content="${baseUrl}${ogImage}">`,
  `<meta property="og:image:secure_url" content="${baseUrl}${ogImage}">`,
  `<meta property="og:image:type" content="image/webp">`,
  `<meta property="og:image:width" content="1200">`,
  `<meta property="og:image:height" content="630">`,
  `<meta property="og:image:alt" content="Foto del autor ${post.author}">`,
      
  // OpenGraph para artículos
  `<meta property="og:title" content="${post.title}">`,
  `<meta property="og:description" content="${post.excerpt}">`,
  `<meta property="og:type" content="article">`,
  `<meta property="og:url" content="${canonical}">`,
  `<meta property="og:site_name" content="Grupo FyT">`,
  `<meta property="og:locale" content="es_ES">`,
  // Article-specific metadata
  `<meta property="article:author" content="${post.author}">`,
  `<meta property="article:published_time" content="${post.date}">`,
  `<meta property="article:section" content="${post.category || 'Divulgación Científica'}">`,
  ...(post.tags || []).map(tag => `<meta property="article:tag" content="${tag}">`),
      
  // Twitter Card
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="${post.title}">`,
  `<meta name="twitter:description" content="${post.excerpt}">`,
  `<meta name="twitter:image" content="${baseUrl}${ogImage}">`,
      
  // Structured Data (JSON-LD) para artículos
  `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${post.title.replace(/"/g, '\\"')}",
  "description": "${post.excerpt.replace(/"/g, '\\"')}",
  "author": {
    "@type": "Person",
    "name": "${post.author}",
    "jobTitle": "${post.authorRole.replace(/"/g, '\\"')}"
  },
  "datePublished": "${post.date}",
  "publisher": {
    "@type": "Organization",
    "name": "Grupo FyT",
    "url": "https://fyt-research.org"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${canonical}"
  }
}
</script>`,
    ];
  } else {
    // META TAGS PARA PÁGINAS ESTÁTICAS
    headArray = [
      `<title>Grupo FyT | ${meta.title}</title>`,
      `<meta name="author" content="Grupo FyT">`,
  `<meta name="description" content="${meta.description}">`,
  `<link rel="canonical" href="${canonical}">`,
      
  // Imagen social por defecto (logo optimizado para OG)
  `<meta property="og:image" content="${baseUrl}/images/logo-fyt-og.webp">`,
  `<meta property="og:image:secure_url" content="${baseUrl}/images/logo-fyt-og.webp">`,
  `<meta property="og:image:type" content="image/webp">`,
  `<meta property="og:image:width" content="1200">`,
  `<meta property="og:image:height" content="630">`,
  `<meta property="og:image:alt" content="Logo Grupo FyT">`,
      
  // OpenGraph genérico
  `<meta property="og:title" content="Grupo FyT | ${meta.title}">`,
  `<meta property="og:description" content="${meta.description}">`,
  `<meta property="og:type" content="website">`,
  `<meta property="og:url" content="${canonical}">`,
  `<meta property="og:site_name" content="Grupo FyT">`,
  `<meta property="og:locale" content="es_ES">`,
      
  // Twitter Card
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="Grupo FyT | ${meta.title}">`,
  `<meta name="twitter:description" content="${meta.description}">`,
  `<meta name="twitter:image" content="${baseUrl}/images/logo-fyt-medium.webp">`,
    ];
  }

  const head = headArray.join('\n');
  return { html, head };
}
 
