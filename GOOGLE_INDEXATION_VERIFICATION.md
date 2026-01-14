# Guía: Verificación y Re-indexación en Google Search Console

**Objetivo:** Verificar que Google pueda ahora crawlear y indexar correctamente las rutas SPA  
**Tiempo estimado:** 5-10 minutos  
**Estado requerido:** Deploy completado en GitHub Pages (2-5 minutos después del push)

---

## Paso 1: Verificación Manual en el Navegador

Abre estas URLs en tu navegador y verifica que cargan correctamente (sin error 404):

### 1.1 Página Principal de Divulgación
```
https://fyt-research.org/divulgacion
```
✅ Debe mostrar: Tarjetas de artículos de divulgación  
❌ Si ves: "404 - Página no encontrada" → El deploy aún no se completó

### 1.2 Artículo CUPS
```
https://fyt-research.org/divulgacion/codigos-cups-atencion-farmaceutica-colombia
```
✅ Debe mostrar: Artículo completo sobre CUPS en Colombia  
❌ Si ves: "404" → El SPA routing no está funcionando

### 1.3 Secciones de Investigación
```
https://fyt-research.org/investigacion
https://fyt-research.org/investigacion/publicaciones
```
✅ Deben cargar correctamente

---

## Paso 2: Verificación de la Solución SPA (Dev Tools)

Si en el navegador todo se ve correcto, verifica que el mecanismo de redirect funcionó:

1. **Abre tu página** → `https://fyt-research.org/divulgacion`
2. **Abre Dev Tools** → F12 o Click derecho → Inspect
3. **Ir a Network tab**
4. **Recarga la página** → Verás:
   - ❌ 404.html servido (status 404)
   - ✅ Después redirige a index.html (status 200)
   - ✅ React carga correctamente

**Esto es normal y esperado** - GitHub Pages sirve 404.html, que luego redirige a index.html.

---

## Paso 3: Google Search Console - URL Inspection

### Opción A: Si ya tienes propiedad verificada

1. **Abre** https://search.google.com/search-console
2. **Selecciona tu propiedad** → fyt-research.org
3. **Inspecciona URLs problemáticas:**

#### Inspección 1: Divulgación
```
Copiar en el cuadro de búsqueda:
https://fyt-research.org/divulgacion
```

**Pasos:**
1. Pega la URL
2. Haz clic en "Inspect"
3. Espera a que Google crawlee (5-10 segundos)
4. Deberías ver: ✅ "URL is available to Google"
5. Haz clic en **"Request Indexing"**

#### Inspección 2: Artículo CUPS
```
Copiar:
https://fyt-research.org/divulgacion/codigos-cups-atencion-farmaceutica-colombia
```

Repite los mismos pasos

#### Inspección 3: Investigación
```
Copiar:
https://fyt-research.org/investigacion
```

Repite los pasos

### Opción B: Si aún no tienes propiedad verificada

1. **Registra tu dominio** en Google Search Console
2. **Verifica propiedad** (mediante DNS o HTML file)
3. Luego sigue los pasos de la Opción A

---

## Paso 4: Verificar Sitemap

1. **En Google Search Console**
2. **Ir a** → Sitemaps (en el menú izquierdo)
3. **Click en** "Add/test sitemap"
4. **Pega:** `https://fyt-research.org/sitemap.xml`
5. **Verificar:**
   - ✅ Status: Success
   - ✅ Discovered: 22+ URLs
   - ✅ Submitted: 22+ URLs

---

## Paso 5: Monitorear Indexación

### Semana 1 (Hoy - próximos 24-48h)
1. **Coverage Report** → Coverage
2. Observa cambios en estos números:
   - ❌ "Excluded" - Páginas no rastreadas
   - ⚠️ "Error" - Problemas HTTP
   - ✅ "Valid" - Páginas indexadas correctamente

**Esperado:** Los números en "Valid" deben aumentar

### Semana 2 (48-72h)
1. **Google Search** → Prueba búsqueda:
   ```
   site:fyt-research.org divulgacion
   ```
2. Deberías ver resultados de tus páginas

---

## Verificación Técnica (Avanzado)

### Probar localmente el mecanismo de redirect

1. **Abre consola de navegador** (F12)
2. **Escribe:**
```javascript
// Simular redirect desde 404
sessionStorage.setItem('redirectPath', '/divulgacion/codigos-cups-atencion-farmaceutica-colombia');
window.location.replace('/');
```

3. **Verifica:** Deberías ver que la ruta se restaura en la URL

### Verificar que 404.html existe en dist/

```bash
curl -I https://fyt-research.org/divulgacion-fake
# Esperado: 404 → pero debería redirigir a homepage correctamente
```

---

## Checklist de Verificación

Marca cada paso como completado:

- [ ] **Deploy completado** - Cambios visibles en GitHub Pages (2-5 min)
- [ ] **Navegador**: `/divulgacion` carga correctamente
- [ ] **Navegador**: `/investigacion` carga correctamente
- [ ] **Navegador**: Artículo CUPS carga correctamente
- [ ] **GSC - URL Inspection**: Divulgación devuelve "Available to Google"
- [ ] **GSC - URL Inspection**: Investigación devuelve "Available to Google"
- [ ] **GSC - URL Inspection**: Solicitada reindexación (3 URLs)
- [ ] **GSC - Sitemap**: 22+ URLs discovered y submitted
- [ ] **Esperar 48-72h** para indexación completa
- [ ] **Verificar en Google** → site:fyt-research.org divulgacion

---

## Solución de Problemas

### ❌ Problema: Aún veo 404 en navegador

**Solución:**
1. Limpia cache del navegador (Ctrl+Shift+Delete)
2. Intenta en modo incógnito (Ctrl+Shift+N)
3. Espera 5 minutos más (GitHub Pages puede tardar)
4. Verifica que el push fue exitoso:
   ```bash
   git log --oneline | head -1
   # Debe mostrar commit reciente
   ```

### ❌ Problema: GSC dice "Not found (404)"

**Solución:**
1. Verifica que el mecanismo de redirect funciona en navegador
2. Limpia cache en GSC:
   - URL Inspection → "Request Crawl" nuevamente
3. Espera 5 minutos a que Google recrawlee

### ❌ Problema: Sitemap no aparece

**Solución:**
1. Verifica que `https://fyt-research.org/sitemap.xml` es accesible
2. En GSC: Sitemaps → "Add/test sitemap" → Introduce URL
3. Si aún no funciona, verifica robots.txt:
   ```bash
   curl https://fyt-research.org/robots.txt
   # Debe contener: Sitemap: https://fyt-research.org/sitemap.xml
   ```

---

## Documentación de Referencia

- **Google Search Console Help:** https://support.google.com/webmasters
- **Indexing API Documentation:** https://developers.google.com/search/apis/indexing-api
- **GitHub Pages + React Router:** https://create-react-app.dev/docs/deployment/#github-pages

---

## Preguntas Frecuentes

**P: ¿Cuánto tarda Google en indexar?**  
R: Típicamente 24-72 horas. Para artículos nuevos puede ser más rápido.

**P: ¿Debo hacer algo más?**  
R: Solo verificar los pasos anterior. Google visitará tu sitemap automáticamente.

**P: ¿Qué pasa si no funciona?**  
R: Verifica que los cambios están en GitHub (git log) y que el deploy se completó.

---

**¿Necesitas ayuda?** Referencia el archivo INDEXATION_FIX_SUMMARY.md para detalles técnicos.
