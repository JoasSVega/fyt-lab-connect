# Resumen: Solución de Problemas de Indexación en Google

**Fecha:** 12 de Enero de 2026  
**Estado:** ✅ COMPLETADO Y DEPLOYADO  
**Commit:** `bd882ff7` (main branch)

---

## Problema Identificado

Google Search Console reportaba errores para rutas SPA:
- ❌ **"URL is not available to Google"** - Las rutas `/divulgacion`, `/investigacion/*` retornaban 404
- ❌ **"Page cannot be indexed: Not found (404)"** - Páginas marcadas como no indexables
- ❌ **Sitemap desactualizado** - Fechas y rutas desactualizadas

**Causa Raíz:** GitHub Pages SPA sin mecanismo de redirect para rutas client-side. Google al intentar crawlear `/divulgacion` obtenía 404 porque el servidor HTTP no encontraba esa ruta física.

---

## Soluciones Implementadas

### 1. **Mecanismo de Redirect SPA (404.html → index.html)**

**Archivo:** [public/404.html](public/404.html)

GitHub Pages sirve `404.html` para cualquier ruta que no existe. Implementamos un redirect usando `sessionStorage`:

```javascript
// Guardar la ruta solicitada en sessionStorage
sessionStorage.setItem('redirectPath', 
  window.location.pathname + window.location.search + window.location.hash);

// Redirigir al homepage (index.html)
window.location.replace('/');
```

**Por qué sessionStorage:**
- ✅ Persiste datos para mismo origen (dominio)
- ✅ No se pierde en redirects HTTP
- ✅ Más confiable que query parameters
- ✅ Fallback: `<meta http-equiv="refresh">` para navegadores sin JS

---

### 2. **Restauración de Rutas en index.html**

**Archivo:** [index.html](index.html) (líneas 25-34)

El archivo raíz ahora lee el `sessionStorage` y restaura la ruta solicitada:

```javascript
// Leer la ruta que 404.html guardó en sessionStorage
var redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  // Restaurar en history para que React Router maneje la navegación
  window.history.replaceState(null, '', redirectPath);
} else {
  // Fallback: soportar legacy query parameters ?redirect=
  var redirect = params.get('redirect');
  if (redirect) { /* ... */ }
}
```

**Flujo completo:**
1. Usuario accede → `/divulgacion`
2. GitHub Pages no encuentra la ruta → sirve `404.html`
3. `404.html` guarda `/divulgacion` en sessionStorage
4. `404.html` redirige a `/` (homepage)
5. `index.html` carga React
6. Script en `index.html` lee sessionStorage y restaura `/divulgacion`
7. React Router manejaja la ruta → muestra página correcta

---

### 3. **Generación Correcta de 404.html en Build**

**Archivo:** [scripts/postbuild-spa.js](scripts/postbuild-spa.js)

El script que se ejecuta **después del build Vite** ahora genera el `404.html` con la lógica correcta:

```javascript
const notFoundHtml = `<!doctype html>
<html>
<head>
  <script>
    sessionStorage.setItem('redirectPath', 
      window.location.pathname + window.location.search + window.location.hash);
    window.location.replace('/');
  </script>
  <meta http-equiv="refresh" content="0;url=/" />
</head>
...`;

writeFileSync(notFoundPath, notFoundHtml, 'utf8');
```

**Importante:** Este script corre durante `npm run build` y **sobrescribe** el archivo `public/404.html` en la carpeta `dist/`. Los cambios manuales a `public/404.html` deben hacerse en el **template del script**, no en el archivo público.

---

### 4. **Actualización del Sitemap**

**Archivo:** [public/sitemap.xml](public/sitemap.xml)

✅ Fechas actualizadas: `2026-01-09` → `2026-01-12`  
✅ Agregado artículo divulgación: `/divulgacion/codigos-cups-atencion-farmaceutica-colombia`  
✅ Prioridades correctas (homepage 1.0, secciones 0.8, artículos 0.9)  
✅ 22 URLs indexables en total

**Nota:** Las rutas dinámicas de divulgación (`/divulgacion/:slug`) se generan automáticamente durante el build SSG.

---

## Archivos Modificados

| Archivo | Cambios | Razón |
|---------|---------|-------|
| `index.html` | Dual redirect logic (sessionStorage + query params) | Leer ruta guardada por 404.html |
| `public/404.html` | sessionStorage en lugar de sessionStorage.redirect | Mecanismo más robusto |
| `scripts/postbuild-spa.js` | Generación correcta del 404.html | Asegurar que dist/ tenga archivo correcto |
| `public/sitemap.xml` | Fechas + divulgación CUPS | Actualizar para Google |

---

## Verificación

### ✅ Build exitoso
```bash
npm run build
# Resultado: 57 files processed, 0 errors
```

### ✅ 404.html en dist/ generado correctamente
```bash
cat dist/404.html | head -30
# Contiene: sessionStorage.setItem('redirectPath', ...)
```

### ✅ Sitemap completo
```bash
grep -c "loc" dist/sitemap.xml
# Resultado: 22 URLs
```

### ✅ Robots.txt y Headers correctos
```bash
cat dist/robots.txt     # ✅ Allow: /, Sitemap ref
cat dist/_headers       # ✅ Cache-Control configurado
```

---

## Deploy a GitHub Pages

```bash
git add -A
git commit -m "fix: SPA routing y sitemap para indexación en Google"
git push origin develop
git checkout main && git merge develop && git push origin main
```

**Resultado:** ✅ Cambios en GitHub  
**Deploy automático:** GitHub Pages procesa en 2-5 minutos

---

## Próximos Pasos (IMPORTANTE)

### 1. **Esperar Deploy** (2-5 minutos)
Google Pages auto-deployará los cambios a `dist/`.

### 2. **Probar Manualmente**
```bash
# En tu navegador:
https://fyt-research.org/divulgacion
https://fyt-research.org/investigacion
https://fyt-research.org/divulgacion/codigos-cups-atencion-farmaceutica-colombia
```

Todas deben funcionar sin errores 404.

### 3. **Google Search Console - URL Inspection**
1. Abre [Google Search Console](https://search.google.com/search-console)
2. Inspecciona: `https://fyt-research.org/divulgacion`
3. Inspecciona: `https://fyt-research.org/investigacion`
4. **IMPORTANTE:** Haz clic en "Request Indexing" para ambas

### 4. **Verificar Sitemap**
En GSC: Coverage → Sitemap → Selecciona `sitemap.xml`
- Debe mostrar 22+ URLs
- Estado: ✅ Submitted

### 5. **Monitorear Indexación**
- Periodo: 48-72 horas
- Verificar en GSC Coverage que las páginas cambien a "Indexed"
- Probar en Google: `site:fyt-research.org divulgacion`

---

## Documentación Técnica

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Estructura general
- [GitHub Pages SPA routing](https://github.blog/2016-08-17-build-github-pages-static-site-jekyll/)
- [Google Search Console Help](https://support.google.com/webmasters)

---

## Notas Importantes

⚠️ **NO edites manualmente `dist/404.html`** - Se regenera en cada build  
⚠️ **Edita siempre `scripts/postbuild-spa.js`** si necesitas cambiar la lógica de redirect  
⚠️ **Recuerda hacer `npm run build` localmente** antes de pushear para verificar

---

**Autor:** GitHub Copilot  
**Resolución:** ✅ Completada y deployada  
**Estado:** Esperando confirmación de indexación en Google (48-72h)
