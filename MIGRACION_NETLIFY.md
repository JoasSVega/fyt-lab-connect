# 🚀 Migración a Netlify - Guía Paso a Paso

## ✅ Preparación (ya completada)

- ✅ Archivo `netlify.toml` creado y subido a GitHub
- ✅ Configuración de redirects 301 lista
- ✅ Todo commiteado en `main` y `develop`

---

## 📋 PASO 1: Crear cuenta en Netlify (2 minutos)

1. Ve a: https://app.netlify.com/signup
2. Haz clic en **"Sign up with GitHub"**
3. Autoriza a Netlify (usa tu cuenta de GitHub)
4. ¡Listo! Ya tienes cuenta

---

## 📋 PASO 2: Importar tu sitio desde GitHub (3 minutos)

1. Una vez dentro de Netlify, haz clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Elige **"Deploy with GitHub"**
4. Busca y selecciona tu repositorio: **JoasSVega/fyt-lab-connect**
5. Configura el deployment:
   - **Branch to deploy:** `main`
   - **Build command:** Ya está configurado en netlify.toml (déjalo vacío)
   - **Publish directory:** Ya está configurado en netlify.toml (déjalo vacío)
6. Haz clic en **"Deploy site"**

⏱️ **Netlify empezará a construir tu sitio (tarda 2-3 minutos)**

---

## 📋 PASO 3: Configurar tu dominio personalizado (5 minutos)

### A) En Netlify:

1. Una vez que el sitio termine de desplegarse, ve a **"Site settings"**
2. En el menú lateral, haz clic en **"Domain management"**
3. Haz clic en **"Add custom domain"**
4. Escribe: `fyt-research.org`
5. Haz clic en **"Verify"** y luego **"Add domain"**
6. Netlify te mostrará los **DNS nameservers** que necesitas configurar

**Anota estos valores** (algo como):
```
dns1.p06.nsone.net
dns2.p06.nsone.net
dns3.p06.nsone.net
dns4.p06.nsone.net
```

### B) En Namecheap:

1. Ve a: https://www.namecheap.com/
2. Inicia sesión
3. Ve a **"Domain List"** → encuentra `fyt-research.org`
4. Haz clic en **"Manage"**
5. En la sección **"NAMESERVERS"**, selecciona **"Custom DNS"**
6. Pega los 4 nameservers de Netlify (los que anotaste arriba)
7. Haz clic en **"Save"**

⏱️ **Los cambios DNS pueden tardar 5-30 minutos en propagarse**

---

## 📋 PASO 4: Habilitar HTTPS (automático)

1. Vuelve a Netlify → **"Domain management"**
2. Espera a que el DNS se verifique (puede tardar hasta 30 minutos)
3. Una vez verificado, Netlify **automáticamente** habilitará HTTPS (SSL gratis)
4. Verás un certificado SSL de Let's Encrypt

---

## 📋 PASO 5: Verificar que todo funciona (5 minutos)

Una vez que el DNS se haya propagado (30 min aprox):

### A) Verifica que el sitio carga:

- ✅ https://fyt-research.org/
- ✅ https://fyt-research.org/investigacion
- ✅ https://fyt-research.org/herramientas/clinicos

### B) **CRÍTICO - Verifica los redirects de trailing slash:**

1. Abre: `https://fyt-research.org/investigacion/` (CON barra)
2. Presiona Enter
3. **La URL debe cambiar automáticamente a:** `https://fyt-research.org/investigacion` (SIN barra)

**Si la barra desaparece → ✅ Funciona perfectamente**

### C) Verifica en móvil:

- Abre el sitio en tu celular
- Las tarjetas de noticias deben mostrar texto completo

---

## 📋 PASO 6: Desactivar GitHub Pages (1 minuto)

Una vez que verifiques que Netlify funciona bien:

1. Ve a: https://github.com/JoasSVega/fyt-lab-connect/settings/pages
2. En **"Source"**, selecciona **"None"**
3. Haz clic en **"Save"**

Esto desactiva GitHub Pages para evitar confusión.

---

## 🎁 Beneficios de Netlify vs GitHub Pages

✅ **Redirects 301 funcionan** (el problema se resuelve)
✅ Auto-deploy cada vez que haces push (igual que antes)
✅ HTTPS automático (gratis)
✅ Headers de seguridad
✅ Cache optimizado
✅ Preview de PRs automático
✅ Rollback fácil a versiones anteriores

---

## 🔄 Tu workflow NO cambia

**Antes (GitHub Pages):**
```bash
# Editas en VSCode
git add .
git commit -m "mensaje"
git push origin main
# GitHub despliega automáticamente
```

**Ahora (Netlify):**
```bash
# Editas en VSCode
git add .
git commit -m "mensaje"
git push origin main
# Netlify despliega automáticamente
```

**Es EXACTAMENTE lo mismo** 🎯

---

## ✅ Checklist de migración

- [ ] PASO 1: Cuenta en Netlify creada
- [ ] PASO 2: Sitio importado desde GitHub
- [ ] PASO 3: Dominio configurado en Netlify
- [ ] PASO 3B: Nameservers cambiados en Namecheap
- [ ] PASO 4: HTTPS habilitado (automático)
- [ ] PASO 5A: Sitio carga correctamente
- [ ] PASO 5B: Redirects de trailing slash funcionan
- [ ] PASO 6: GitHub Pages desactivado

---

## 🆘 ¿Necesitas ayuda?

Si algo no funciona durante el proceso, dime en qué paso estás y te ayudo inmediatamente.

**Fecha:** 2026-02-20  
**Archivo de configuración:** netlify.toml (ya subido a GitHub)
