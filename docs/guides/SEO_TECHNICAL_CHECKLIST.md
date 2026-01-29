# ✅ Checklist Técnico SEO

**Fecha:** 29 de enero de 2026  
**Público:** Developers, DevOps  
**Duración:** 10 minutos

---

## 🔧 Verificación Pre-Deploy

### Git y Cambios de Código

- [ ] Cambios en 404.html (68 líneas nuevas)
  ```bash
  git diff 404.html | head -70
  # Debe mostrar script de redirección
  ```

- [ ] Cambios en scripts/postbuild-spa.js (25 líneas nuevas)
  ```bash
  git diff scripts/postbuild-spa.js
  # Debe mostrar: Removed process.exit(0) para SSG
  ```

- [ ] No hay cambios en otros archivos
  ```bash
  git status --short
  # Debe mostrar SOLO: 404.html, postbuild-spa.js
  ```

- [ ] Branch está actualizado
  ```bash
  git log --oneline -1
  # Debe mostrar commit reciente
  ```

### Verificación de Dependencias

- [ ] Node.js es 18+ (para Vite)
  ```bash
  node --version
  # Esperado: v18.0.0 o superior
  ```

- [ ] npm está actualizado
  ```bash
  npm --version
  # Esperado: 8.0.0 o superior
  ```

- [ ] node_modules instalados
  ```bash
  ls node_modules/ | head
  # Debe mostrar carpetas de paquetes
  ```

---

## 🏗️ Verificación de Build

### Build SPA (Development)

- [ ] Build client completa sin errores
  ```bash
  npm run build:client
  # Esperado: "Built in X.Xs"
  # Output: ./dist/
  ```

- [ ] 404.html existe en dist
  ```bash
  ls -la dist/404.html
  # Esperado: -rw-r--r-- 1 user user XXXX 404.html
  ```

- [ ] 404.html tiene contenido
  ```bash
  wc -l dist/404.html
  # Esperado: > 30 líneas (no 10)
  ```

- [ ] 404.html contiene script
  ```bash
  grep -q "sessionStorage" dist/404.html && echo "✅ OK" || echo "❌ FAIL"
  # Esperado: ✅ OK
  ```

### Build SSG (Production)

- [ ] Build SSG completa sin errores
  ```bash
  npm run build:ssg
  # Esperado: "Built in X.Xs"
  ```

- [ ] Prerender ejecuta correctamente
  ```bash
  npm run prerender
  # Esperado: "✅ Prerendered X pages"
  ```

- [ ] 404.html generado en SSG
  ```bash
  ls -la dist/404.html
  # Debe existir con contenido robusto
  ```

- [ ] Sitemap generado
  ```bash
  ls -la dist/sitemap.xml
  # Debe existir y tener X URLs
  ```

- [ ] index.html contiene script de restauración
  ```bash
  grep -A5 "sessionStorage" dist/index.html
  # Debe contener restauración de ruta
  ```

---

## 📂 Verificación de Archivos Críticos

### 404.html

- [ ] Existe en raíz
  ```bash
  test -f 404.html && echo "✅ OK" || echo "❌ MISSING"
  ```

- [ ] Tiene script de redirección
  ```bash
  grep -q "window.location = '/index.html'" 404.html && echo "✅ OK" || echo "❌ FAIL"
  ```

- [ ] Maneja archivos estáticos
  ```bash
  grep -q "isStaticFile\|\.js\|\.css" 404.html && echo "✅ OK" || echo "❌ FAIL"
  ```

- [ ] Excepto rutas reales
  ```bash
  grep -q "realFiles\|robots.txt" 404.html && echo "✅ OK" || echo "❌ FAIL"
  ```

### index.html

- [ ] Script de restauración existe
  ```bash
  grep -A3 "redirectPath" index.html | head -5
  # Debe mostrar la lógica
  ```

- [ ] Se carga después de contenido
  ```bash
  tail -30 index.html | grep -q "redirectPath" && echo "✅ OK" || echo "❌ FAIL"
  ```

### vite.config.ts

- [ ] Base es raíz
  ```bash
  grep "base:" vite.config.ts
  # Esperado: base: '/',
  ```

- [ ] SSR está configurado
  ```bash
  grep -q "ssr\|main.ssg" vite.config.ts && echo "✅ OK" || echo "❌ FAIL"
  ```

### robots.txt

- [ ] Existe y permite rastreo
  ```bash
  cat robots.txt | head -5
  # Esperado: User-agent: * ✅
  #           Allow: / ✅
  ```

- [ ] Contiene sitemap
  ```bash
  grep -q "sitemap.xml" robots.txt && echo "✅ OK" || echo "❌ FAIL"
  ```

### CNAME

- [ ] Contiene dominio correcto
  ```bash
  cat CNAME
  # Esperado: fyt-research.org
  ```

---

## 🌐 Verificación de Servidor

### Respuestas HTTP

- [ ] / devuelve 200 OK
  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://fyt-research.org/
  # Esperado: 200
  ```

- [ ] /equipo devuelve 200 OK (después del fix)
  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://fyt-research.org/equipo
  # Esperado: 200 (antes era 404)
  ```

- [ ] /404.html devuelve 404 (con contenido SPA)
  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://fyt-research.org/404.html
  # Esperado: 404 (correcto, es configurado por GitHub Pages)
  ```

### Headers

- [ ] Cache-Control está configurado
  ```bash
  curl -I https://fyt-research.org/index.html | grep Cache-Control
  # Esperado: max-age=XXXX
  ```

- [ ] Content-Type es correcto
  ```bash
  curl -I https://fyt-research.org/ | grep Content-Type
  # Esperado: text/html; charset=utf-8
  ```

- [ ] HTTPS está activado
  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://fyt-research.org/
  # Esperado: 200 (no 404, no error SSL)
  ```

---

## 🔍 Verificación SEO

### Sitemap

- [ ] Sitemap existe y es válido
  ```bash
  curl -s https://fyt-research.org/sitemap.xml | head -20
  # Esperado: XML con <url> tags
  ```

- [ ] Sitemap contiene URL correctas
  ```bash
  curl -s https://fyt-research.org/sitemap.xml | grep -c "<url>"
  # Esperado: 35+ URLs
  ```

- [ ] Sitemap está en robots.txt
  ```bash
  grep "sitemap" robots.txt
  # Esperado: Sitemap: https://fyt-research.org/sitemap.xml
  ```

### Meta Tags

- [ ] index.html tiene meta tags base
  ```bash
  grep -o 'meta' index.html | wc -l
  # Esperado: 5+ (charset, viewport, etc)
  ```

- [ ] Hay canonical tag
  ```bash
  grep -q 'rel="canonical"' index.html && echo "✅ OK" || echo "❌ FAIL"
  ```

### Open Graph

- [ ] og:title existe
  ```bash
  grep -q 'og:title' index.html && echo "✅ OK" || echo "❌ FAIL"
  ```

- [ ] og:image existe
  ```bash
  grep -q 'og:image' index.html && echo "✅ OK" || echo "❌ FAIL"
  ```

---

## 📊 Verificación en Google Search Console

### Propiedad

- [ ] Propiedad verificada
  ```
  GSC → Settings → Users and permissions
  Esperado: Tu cuenta tiene acceso
  ```

- [ ] Dominio correcto
  ```
  Debe ser: fyt-research.org (sin www)
  ```

### Coverage

- [ ] Revisar state actual
  ```
  GSC → Coverage
  Tomar nota de:
  - Válidas: X
  - Excluidas: Y
  - Errores: Z
  ```

- [ ] No hay 404 errors
  ```
  GSC → Coverage → Error
  Esperado: 0 (después del fix)
  ```

### Sitemaps

- [ ] Sitemap está registrado
  ```
  GSC → Sitemaps
  Esperado: /sitemap.xml (Success)
  ```

- [ ] Últimas URLs detectadas
  ```
  GSC → Sitemaps → /sitemap.xml → See details
  Debe mostrar las URLs
  ```

---

## 🚀 Pre-Deploy Checklist

Antes de hacer `git push`:

- [ ] Todos los archivos están en git
  ```bash
  git status
  # Esperado: nothing to commit, working tree clean
  ```

- [ ] Los cambios son los esperados
  ```bash
  git diff HEAD
  # Esperado: solo cambios en 404.html y postbuild-spa.js
  ```

- [ ] Branch está actualizado
  ```bash
  git pull origin develop
  # Esperado: Already up to date
  ```

- [ ] Rama correcta (develop)
  ```bash
  git branch
  # Esperado: * develop
  ```

---

## 🔄 Post-Deploy Checklist

Después de `git push`:

### GitHub Actions (30 segundos - 2 minutos)

- [ ] Build inicia automáticamente
  ```
  GitHub → Actions → Latest workflow
  Esperado: Status "Running"
  ```

- [ ] Build completa exitosamente
  ```
  Esperado: ✅ All checks passed
  Tiempo: 2-3 minutos
  ```

- [ ] Cambios están en main
  ```bash
  git log --oneline | head -2
  # Segundo commit debe ser el nuevo push
  ```

### En Producción (2 minutos)

- [ ] /404.html es accesible
  ```bash
  curl -I https://fyt-research.org/404.html
  # Esperado: HTTP/2 404
  ```

- [ ] /404.html tiene script
  ```bash
  curl https://fyt-research.org/404.html | grep sessionStorage
  # Esperado: encontrar la línea de script
  ```

- [ ] Página /equipo funciona
  ```bash
  curl https://fyt-research.org/equipo | grep -q "Team\|Equipo"
  # Esperado: encontrar contenido de página
  ```

### En Google Search Console (24+ horas)

- [ ] URL Inspection muestra cambios
  ```
  GSC → URL Inspection → /equipo
  Esperado: ✅ URL is on Google (no 404)
  ```

- [ ] Solicita indexación
  ```
  GSC → URL Inspection → Request indexing
  Repite para todas las 8 URLs con 404
  ```

---

## 🎯 Monitoreo Continuo

### Después de 24 horas

- [ ] Coverage ha mejorado
  ```
  GSC → Coverage
  Esperado: Valid pages 22 → 25+
  ```

### Después de 72 horas

- [ ] Coverage está en 70%+
  ```
  GSC → Coverage
  Esperado: 35+ páginas válidas
  ```

- [ ] No hay errores 404
  ```
  GSC → Coverage → Error
  Esperado: 0 páginas con 404
  ```

- [ ] Performance muestra actividad
  ```
  GSC → Performance
  Esperado: Clicks > 0, Impressions > 100
  ```

---

## 📞 Contactos de Soporte

Si algo falla:

1. **GitHub Pages:** Verifica actions logs
2. **Namecheap DNS:** Contacta soporte si SSL no funciona
3. **Google:** GSC → Coverage → Error para detalles
4. **Dev Team:** Revisa logs locales

---

**Última actualización:** 2026-01-29  
**Próximo documento:** [SEO_IMPLEMENTATION_SUMMARY.md](SEO_IMPLEMENTATION_SUMMARY.md)
