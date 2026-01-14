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
  <title>Redirigiendo... | Grupo FyT</title>
  
  <!-- GitHub Pages SPA redirect hack -->
  <!-- This script takes the current page's path and query string and stores it in sessionStorage -->
  <!-- The index.html will then restore the correct route -->
  <script>
    // Store the path that led to this 404 page
    sessionStorage.setItem('redirectPath', window.location.pathname + window.location.search + window.location.hash);
    
    // Redirect to the homepage (index.html)
    // The main app will read the stored path and navigate accordingly
    window.location.replace('/');
  </script>
  
  <!-- Fallback for users with JavaScript disabled -->
  <meta http-equiv="refresh" content="0;url=/" />
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0;">
  <main style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;">
    <section style="max-width: 520px; width: 100%; text-align: center; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);">
      <h1 style="margin: 0 0 12px; font-size: 28px; font-weight: 700;">Redirigiendo...</h1>
      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #334155;">Si no eres redirigido automáticamente, <a href="/" style="color: #2563eb; text-decoration: underline;">haz clic aquí</a>.</p>
    </section>
  </main>
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
