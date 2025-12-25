import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
// SSR prerender sin dependencias de head runtime
import App from './App'
import { routeMeta, routesToPrerender } from './seo/routesMeta'

/**
 * Devuelve la lista de rutas públicas a prerenderizar.
 * Mantiene React Router actual sin cambiar lógica ni estilos.
 */
export function getRoutes(): string[] {
  return routesToPrerender
}

/**
 * Renderiza una ruta a HTML estático y genera etiquetas <head> estandarizadas.
 */
export function render(path: string): { html: string; head: string } {
  const meta = routeMeta[path] || routeMeta['/']

  const app = (
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  )

  const html = renderToString(app)
  const canonical = `https://fyt-research.org${path === '/' ? '' : path}`
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
    `<meta name="twitter:description" content="${meta.description}">`
  ].join('\n')

  return { html, head }
}
