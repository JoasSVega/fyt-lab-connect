# 🚀 Pasos Siguientes - Deployment y Verificación

## ✅ Lo que YA está listo (hecho automáticamente)

- ✅ Todos los problemas de accesibilidad corregidos
- ✅ Problema de texto cortado en móvil resuelto
- ✅ Problemas de indexación SEO arreglados:
  - URLs canónicas corregidas
  - Trailing slashes normalizados (redirects 301)
  - Script de .htaccess automático
- ✅ Build verificado y funcionando
- ✅ Código commiteado en rama `develop`

---

## 📋 Lo que DEBES hacer ahora (Paso a Paso)

### PASO 1: Subir cambios a GitHub

Abre la terminal en VSCode y ejecuta:

```bash
git push origin develop
```

**¿Qué hace esto?** Sube todos los cambios a tu repositorio en GitHub.

**Verificación:** Ve a https://github.com/JoasSVega/fyt-lab-connect y verifica que ves el commit reciente en la rama `develop`.

---

### PASO 2: Desplegar a Producción

Tienes **2 opciones** según cómo esté configurado tu servidor:

#### Opción A: Si usas FTP/cPanel (Hosting tradicional)

1. **Conecta al servidor** usando FileZilla o tu cliente FTP
2. **MUY IMPORTANTE**: Antes de subir nada, **elimina TODOS los archivos** del servidor (excepto .htaccess si existe)
3. **Sube SOLO el contenido de la carpeta `dist/`**:
   - En tu computadora: selecciona TODO lo que está dentro de `/workspaces/fyt-lab-connect/dist/`
   - En el servidor: pégalo en la raíz (`/public_html/` o `/www/`)

**CRÍTICO:** NO subas estos directorios de la raíz del proyecto:
- ❌ `/investigacion/` (raíz)
- ❌ `/herramientas/` (raíz)
- ❌ `/noticias/` (raíz)
- ❌ `/sobre-nosotros/` (raíz)

Solo sube el contenido de `dist/`.

#### Opción B: Si usas GitHub Pages

```bash
# En la terminal
cd dist
git init
git add .
git commit -m "Deploy production"
git branch -M main
git remote add origin https://github.com/JoasSVega/fyt-lab-connect.git
git push -f origin main
```

Luego ve a:
- GitHub → Settings → Pages
- Source: Deploy from branch `main`
- Folder: `/ (root)`
- Save

---

### PASO 3: Verificar que funcionó

#### A) Verificar Trailing Slashes (Redirects)

Abre tu navegador en modo incógnito y prueba:

1. Ve a: `https://fyt-research.org/investigacion/`  
   **Debe redirigir automáticamente a:** `https://fyt-research.org/investigacion` (sin /)

2. Ve a: `https://fyt-research.org/herramientas/`  
   **Debe redirigir automáticamente a:** `https://fyt-research.org/herramientas` (sin /)

**¿Cómo verificar?** Observa la URL en la barra del navegador - debe cambiar y quitar el `/` final.

#### B) Verificar Páginas

Visita estas páginas y confirma que cargan correctamente:
- https://fyt-research.org/
- https://fyt-research.org/investigacion
- https://fyt-research.org/herramientas/clinicos
- https://fyt-research.org/noticias
- https://fyt-research.org/sobre-nosotros

#### C) Verificar en Móvil

Abre las noticias en tu celular:
- https://fyt-research.org/noticias

**Verificar:** El texto de las tarjetas debe mostrarse completo, no cortado.

---

### PASO 4: Google Search Console (Después de 1-2 horas)

1. Ve a: https://search.google.com/search-console
2. Selecciona tu propiedad `fyt-research.org`
3. Ve a **"Indexación" → "Páginas"**
4. Para cada URL con problema, haz clic y selecciona **"Solicitar indexación"**

**Importante:** Los cambios en Google pueden tardar 1-2 semanas en reflejarse completamente.

---

## 🆘 Si algo sale mal

### Problema: El sitio no carga

**Solución:**
1. Verifica que subiste TODO el contenido de `dist/`
2. Verifica que el archivo `.htaccess` está en la raíz del servidor
3. Revisa los permisos de archivos (deben ser 644 para archivos, 755 para carpetas)

### Problema: Los redirects no funcionan

**Solución:**
1. Verifica que `.htaccess` está en la raíz
2. Verifica que tu servidor Apache tiene `mod_rewrite` habilitado
3. Contacta a tu hosting si es necesario

### Problema: Google sigue mostrando errores

**Solución:**
- Dale tiempo (1-2 semanas)
- Solicita reindexación manualmente
- Los errores antiguos desaparecerán gradualmente

---

## 📞 Resumen de lo que cambió

### Antes:
- ❌ Texto cortado en móvil
- ❌ Problemas de accesibilidad
- ❌ URLs duplicadas en Google (`/investigacion` y `/investigacion/`)
- ❌ "Page with redirect" en Search Console

### Después:
- ✅ Texto completo en móvil
- ✅ Accesibilidad mejorada (etiquetas ARIA)
- ✅ URLs normalizadas (sin trailing slash)
- ✅ Redirects 301 automáticos
- ✅ Sitemap actualizado
- ✅ Listo para indexación perfecta

---

## 🎯 Checklist Final

Marca cada paso cuando lo completes:

- [ ] PASO 1: `git push origin develop` ejecutado
- [ ] PASO 2: Archivos de `dist/` subidos al servidor
- [ ] PASO 3A: Redirects verificados (URLs sin `/` final)
- [ ] PASO 3B: Todas las páginas cargan correctamente
- [ ] PASO 3C: Texto completo en móvil
- [ ] PASO 4: Solicitada reindexación en Google Search Console

---

**¿Dudas?** Revisa el archivo [DEPLOYMENT.md](DEPLOYMENT.md) para más detalles técnicos.

**Fecha:** 2026-02-20  
**Estado:** ✅ Código listo para deployment
