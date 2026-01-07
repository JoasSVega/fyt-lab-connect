// Crea un 404.html apropiado para SPA en GitHub Pages con dominio personalizado.
// El 404.html actúa como fallback cuando se solicitan rutas inexistentes,
// redirigiendo al index.html para que React Router maneje la navegación.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

if (process.env.SSG_BUILD === 'true' || process.env.SSG_BUILD === '1') {
  console.log('[postbuild] Skip SPA 404 generation (SSG build).');
  process.exit(0);
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
  <title>Grupo FyT</title>
  <!-- SPA fallback: Serve index.html for all 404 errors to support client-side routing -->
  <script>
    // Store the original pathname for React Router to handle
    sessionStorage.redirect = location.pathname + location.search + location.hash;
  </script>
  <!-- Redirect to index.html which will handle the route -->
  <meta http-equiv="refresh" content="0;url=/" />
  <!-- Fallback for older browsers -->
  <script>
    if (sessionStorage.redirect && location.pathname === '/404.html') {
      location.replace(sessionStorage.redirect);
    }
  </script>
</head>
<body>
  <!-- Fallback content while redirect happens -->
  <p>Redirigiendo...</p>
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
