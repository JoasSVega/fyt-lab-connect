# Guía de Despliegue - Grupo FyT Website

## ⚠️ IMPORTANTE: Evitar Problemas de Indexación en Google

Esta guía explica cómo desplegar correctamente el sitio web para evitar problemas de indexación, duplicados de contenido, y errores de "Page with redirect" en Google Search Console.

## 📦 Proceso de Build

### 1. Build de Producción (SSG)

```bash
npm run build
```

Este comando:
- Limpia `dist/`
- Compila el bundle client (`dist/assets/`, `dist/index.html`)
- Compila el bundle SSR (`dist/server/`)
- Valida contenido estático
- Prerenderiza todas las rutas como HTML estático
- **Copia `.htaccess` a todos los subdirectorios** (CRÍTICO para SEO)
- Genera `sitemap.xml` dinámico
- Precomprime archivos (gzip + brotli)

### 2. Verificar el Build

```bash
ls -la dist/
```

Debe contener:
```
dist/
├── index.html              # Homepage (raíz)
├── .htaccess               # Reglas Apache (trailing slash)
├── sitemap.xml             # Sitemap generado dinámicamente
├── robots.txt              # Copiado desde raíz
├── assets/                 # JS, CSS, imágenes hasheadas
├── images/                 # Imágenes públicas
├── investigacion/          # Rutas prerenderizadas
│   ├── index.html
│   ├── .htaccess           # ⚠️ CRÍTICO: Debe existir
│   ├── proyectos/
│   │   ├── index.html
│   │   └── .htaccess
│   └── ...
├── herramientas/
│   ├── index.html
│   ├── .htaccess
│   └── ...
└── server/                 # Bundle SSR (NO desplegar)
```

## 🚀 Despliegue a Producción

### ⚠️ REGLA CRÍTICA: Solo desplegar `dist/`

**NUNCA desplegar estos directorios de la raíz del proyecto:**
- ❌ `/investigacion/` (raíz del proyecto)
- ❌ `/herramientas/` (raíz del proyecto)
- ❌ `/noticias/` (raíz del proyecto)
- ❌ `/sobre-nosotros/` (raíz del proyecto)
- ❌ `/contactos/` (raíz del proyecto)
- ❌ Cualquier otro directorio con `index.html` en la raíz

**Estos son artefactos de builds antiguos y causarán:**
- Contenido duplicado
- Redirects no deseados
- Problemas de indexación en Google

### ✅ Desplegar SOLO el contenido de `dist/`

#### Opción 1: FTP/SFTP (Hosting tradicional)

1. Subir TODO el contenido de `dist/` a la raíz del servidor
2. **Verificar que cada subdirectorio tenga su `.htaccess`**
3. Verificar que `sitemap.xml` esté en la raíz

```bash
# Ejemplo con rsync
rsync -avz --delete dist/ user@fyt-research.org:/var/www/html/
```

#### Opción 2: GitHub Pages

1. Hacer push del contenido de `dist/` a la rama `main`:
   ```bash
   npm run build
   cd dist
   git init
   git add .
   git commit -m "Deploy SSG"
   git push origin main --force
   ```

2. Configurar GitHub Pages para usar la rama `main` (raíz)

#### Opción 3: Netlify/Vercel

**netlify.toml** (si usas Netlify):
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**vercel.json** (si usas Vercel):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "trailingSlash": false,
  "cleanUrls": true
}
```

## 🔍 Verificación Post-Despliegue

### 1. Verificar Trailing Slashes

Probar que las URLs CON trailing slash redireccionen a SIN trailing slash:

```bash
# Debe redirigir 301 a /investigacion (sin /)
curl -I https://fyt-research.org/investigacion/

# Debe redirigir 301 a /herramientas/clinicos (sin /)
curl -I https://fyt-research.org/herramientas/clinicos/
```

**Esperado:** `HTTP/1.1 301 Moved Permanently`
**Location:** Sin trailing slash

### 2. Verificar URLs Canónicas

Inspeccionar el HTML de cada página:

```bash
curl -s https://fyt-research.org/investigacion | grep canonical
```

**Esperado:** `<link rel="canonical" href="https://fyt-research.org/investigacion">`

**Sin trailing slash final**

### 3. Verificar Sitemap

```bash
curl -s https://fyt-research.org/sitemap.xml | head -20
```

**Verificar:**
- Todas las URLs sin trailing slash (excepto raíz `/`)
- Fechas actualizadas (`<lastmod>`)

### 4. Google Search Console

1. Ir a [Search Console](https://search.google.com/search-console)
2. Verificar "Page indexing" → No debe haber "Page with redirect"
3. Solicitar reindexación de URLs corregidas

## 🐛 Problemas Comunes y Soluciones

### Problema: "Page with redirect" en Google

**Causa:** URLs con trailing slash que redireccionen a sin trailing slash (o viceversa)

**Solución:**
1. Verificar que `.htaccess` esté en TODOS los subdirectories de `dist/`
2. Ejecutar script de copia: `node scripts/copy-htaccess.mjs`
3. Redesplegar `dist/` completo

### Problema: Contenido duplicado

**Causa:** Archivos HTML antiguos en la raíz del proyecto siendo desplegados

**Solución:**
1. Verificar que `.gitignore` excluya directorios de la raíz
2. Limpiar servidor: eliminar directorios antiguos
3. Desplegar SOLO contenido de `dist/`

### Problema: Sitemap desactualizado

**Causa:** El sitemap ubicado en la raíz del proyecto no se actualiza automáticamente

**Solución:**
1. Eliminar `sitemap.xml` de la raíz del proyecto si existe
2. El build genera `dist/sitemap.xml` dinámicamente
3. Solo desplegar el de `dist/`

### Problema: 404 en subdirectorios

**Causa:** Falta `.htaccess` en subdirectorios

**Solución:**
1. Verificar que `scripts/copy-htaccess.mjs` se ejecute en build
2. Verificar que `package.json` incluya el script en `build:ssg`
3. Rebuild y redesplegar

## 📋 Checklist de Despliegue

Antes de cada despliegue:

- [ ] Ejecutar `npm run build` exitosamente
- [ ] Verificar que `dist/.htaccess` existe
- [ ] Verificar que `dist/investigacion/.htaccess` existe
- [ ] Verificar que `dist/sitemap.xml` está actualizado
- [ ] Limpiar directorios antiguos del servidor
- [ ] Desplegar SOLO el contenido de `dist/`
- [ ] Probar redirects de trailing slashes
- [ ] Verificar URLs canónicas en HTML
- [ ] Solicitar reindexación en Search Console

## 📞 Soporte

Si encuentras problemas de indexación:

1. Verificar configuración de `.htaccess`
2. Revisar logs del servidor web
3. Usar Google Search Console → URL Inspection
4. Contactar con el equipo de desarrollo

---

**Última actualización:** 2026-02-20  
**Versión:** 2.0 (SSG + Trailing Slash Fix)
