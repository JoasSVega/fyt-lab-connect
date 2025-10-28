// Crea un 404.html a partir de index.html para que los hosts estáticos
// redirijan rutas del SPA (React Router) al shell principal.
// También funciona como fallback en previsualizaciones de Lovable.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

if (existsSync(indexPath)) {
  try {
    const html = readFileSync(indexPath, 'utf8');
    writeFileSync(notFoundPath, html, 'utf8');
    console.log('[postbuild] 404.html generado para fallback SPA.');
  } catch (err) {
    console.warn('[postbuild] No se pudo crear 404.html:', err);
  }
} else {
  console.warn('[postbuild] index.html no encontrado en dist, ¿falló el build?');
}
