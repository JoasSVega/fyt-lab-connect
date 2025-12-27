import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { routeMeta, routesToPrerender } from './seo/routesMeta';

// Lista de rutas públicas a prerenderizar
export function getRoutes(): string[] {
  return routesToPrerender;
}

// Render SSR por ruta y construcción de <head> SEO institucional
export function render(path: string): { html: string; head: string } {
  const meta = routeMeta[path] || routeMeta['/'];
  const canonical = `https://fyt-research.org${path === '/' ? '' : path}`;

  const app = (
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );

  const html = renderToString(app);
  const head = [
    `<title>Grupo FyT | ${meta.title}</title>`,
    `<meta name="author" content="Grupo FyT">`,
    `<meta name="description" content="${meta.description}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="Grupo FyT | ${meta.title}">`,
    `<meta property="og:description" content="${meta.description}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:site_name" content="Grupo FyT">`,
    `<meta property="og:locale" content="es_ES">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="Grupo FyT | ${meta.title}">`,
    `<meta name="twitter:description" content="${meta.description}">`,
  ].join('\n');

  return { html, head };
}
