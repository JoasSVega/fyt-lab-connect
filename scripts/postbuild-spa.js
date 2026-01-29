// Crea un 404.html apropiado para SPA en GitHub Pages con dominio personalizado.
// El 404.html actúa como fallback cuando se solicitan rutas inexistentes,
// redirigiendo al index.html para que React Router maneje la navegación.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

// Generar 404.html INCLUSO en SSG builds
// Necesario para GitHub Pages para manejar rutas SPA que no están prerrenderizadas
// o para URLs antiguas que podrían existir en el índice de Google
const isSSGBuild = process.env.SSG_BUILD === 'true' || process.env.SSG_BUILD === '1';
if (isSSGBuild) {
  console.log('[postbuild] SSG build detectado - generando 404.html para SPA fallback...');
}

if (existsSync(indexPath)) {
  try {
    const indexHtml = readFileSync(indexPath, 'utf8');
    
    // Crear un 404.html optimizado para GitHub Pages + SPA
    // Este archivo será servido por GitHub Pages cuando una ruta no existe
    // Luego redirige al index.html para que React Router maneje la ruta
    const notFoundHtml = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grupo FyT - Redirigiendo</title>
  <!-- GitHub Pages SPA Routing Fallback
       Este archivo se sirve cuando una ruta no existe.
       Redirige al index.html y restaura la URL original para que React Router maneje la navegación.
  -->
  <script>
    // Truque de SPA para GitHub Pages: capturar rutas inexistentes y redirigir a index.html
    (function() {
      // Obtener la ruta solicitada (sin dominio)
      var path = window.location.pathname;
      var search = window.location.search;
      var hash = window.location.hash;
      
      // Excluir archivos reales (assets, API, etc.)
      // No redirigir si: termina en extensión conocida, es raíz, contiene puntos en el nombre
      var isFile = /\\.(html|css|js|json|xml|ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|otf)$/i.test(path);
      var isRoot = path === '/' || path === '';
      var isHiddenDir = path.startsWith('/.well-known') || path.startsWith('/.git');
      
      // Si es un archivo real o la raíz, dejar que GitHub Pages lo maneje normalmente
      if (isFile || isRoot || isHiddenDir) {
        return;
      }
      
      // Para rutas SPA (ej: /investigacion, /herramientas/clinicos, /divulgacion/slug):
      // Guardar la ruta en sessionStorage, redirigir a /index.html
      // El script en index.html restaurará la URL en el navegador
      sessionStorage.setItem('redirectPath', path + search + hash);
      
      // Redirigir a index.html (GitHub Pages lo sirve correctamente)
      window.location = '/index.html';
    })();
  </script>
</head>
<body>
  <!-- Contenido fallback mientras se procesa el redirect (máximo 1-2 segundos) -->
  <div style="
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ">
    <div style="text-align: center; color: white;">
      <h1 style="margin: 0 0 20px; font-size: 24px;">Grupo FyT</h1>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">Cargando página...</p>
    </div>
  </div>
  
  <!-- Fallback: si JavaScript está deshabilitado o falla, mostrar mensaje + enlace manual -->
  <noscript>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; }
      h1 { color: #333; }
      p { color: #666; margin: 20px 0; }
      a { color: #667eea; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
    <h1>Página no encontrada</h1>
    <p>La página que buscas no existe o ha sido movida.</p>
    <p><a href="/">← Volver al inicio</a></p>
    <p style="margin-top: 40px; font-size: 12px; color: #999;">
      Si el problema persiste, intenta vaciar el cache del navegador o <a href="/">haz clic aquí</a> para ir a inicio.
    </p>
  </noscript>
</body>
</html>`;
    
    writeFileSync(notFoundPath, notFoundHtml, 'utf8');
    console.log('[postbuild] 404.html optimizado generado para GitHub Pages + SPA.');
  } catch (err) {
    console.warn('[postbuild] No se pudo crear 404.html:', err);
  }
} else {
  console.warn('[postbuild] index.html no encontrado en dist, ¿falló el build?');
}
