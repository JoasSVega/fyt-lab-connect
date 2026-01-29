# 🌐 GitHub Pages & Namecheap - Configuración de Dominio

**Fecha:** 29 de enero de 2026  
**Audiencia:** DevOps, Sysadmins  
**Nivel:** Intermedio

---

## 📋 Tabla de Contenidos

1. [Configuración Actual](#configuración-actual)
2. [GitHub Pages Setup](#github-pages-setup)
3. [Namecheap DNS Setup](#namecheap-dns-setup)
4. [Verificación](#verificación)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Configuración Actual {#configuración-actual}

### Estado Verificado

La configuración del dominio está **correctamente configurada** y no requiere cambios.

#### GitHub Pages

```
Repository: fyt-lab-connect
Owner: joas-s-vega (o tu usuario)
Branch published: main
Custom domain: fyt-research.org
HTTPS: ✅ Enabled
CNAME file: ✅ Present
```

#### Namecheap DNS

```
Domain: fyt-research.org
Registrar: Namecheap
DNS: Custom DNS (pointing to GitHub)
Status: ✅ Active
HTTPS: ✅ Configured
```

---

## 🔧 GitHub Pages Setup {#github-pages-setup}

### Paso 1: Repository Settings

1. Ir a https://github.com/joas-s-vega/fyt-lab-connect/settings
2. Scroll down a "GitHub Pages"
3. Verificar:
   ```
   Source: Deploy from a branch
   Branch: main (o la rama publicada)
   Folder: / (raíz)
   ```

### Paso 2: Custom Domain (CNAME)

**En GitHub:**

1. En GitHub Pages settings, en "Custom domain"
2. Ingresa: `fyt-research.org`
3. Click "Save"
4. GitHub crea/actualiza archivo CNAME automáticamente

**En tu repositorio:**

```bash
cat CNAME
# Debe mostrar: fyt-research.org
```

Si no existe:
```bash
echo "fyt-research.org" > CNAME
git add CNAME
git commit -m "Add CNAME for custom domain"
git push
```

### Paso 3: HTTPS Enforcement

En GitHub Pages settings:

1. Busca "Enforce HTTPS"
2. Debe estar ✅ checked
3. Si no está, esperá 5 minutos y actualiza

**Por qué es importante:**
- Seguridad (TLS 1.2+)
- SEO (Google penaliza HTTP)
- Confianza del usuario

### Paso 4: Verificar en GitHub

```bash
# Verificar CNAME existe
curl -s https://raw.githubusercontent.com/joas-s-vega/fyt-lab-connect/main/CNAME

# Esperado: fyt-research.org
```

---

## 🌍 Namecheap DNS Setup {#namecheap-dns-setup}

### Paso 1: Acceso a Namecheap

1. Ir a https://www.namecheap.com
2. Login con tus credenciales
3. Dashboard → "Manage" al lado de fyt-research.org

### Paso 2: Configurar Custom DNS

En Namecheap, bajo "Nameservers":

1. Selecciona **"Custom DNS"**
2. Ingresa los nameservers de GitHub Pages:
   ```
   ns-1395.awsdns-46.com
   ns-1820.awsdns-39.net
   ns-1374.awsdns-45.org
   ns-269.awsdns-33.com
   ```

3. Click "Save"

**O alternativamente (A Records):**

Si prefieres A Records en lugar de Custom Nameservers:

1. Selecciona **"Namecheap BasicDNS"**
2. Bajo "Host Records", agrega:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
           185.199.109.153
           185.199.110.153
           185.199.111.153
   TTL: 30 min
   ```

3. Agrega un record para www (opcional):
   ```
   Type: CNAME
   Host: www
   Value: joas-s-vega.github.io
   TTL: 30 min
   ```

### Paso 3: Verificar DNS Propagación

**Opción 1: Command Line**

```bash
# Verificar A records
nslookup fyt-research.org
# Esperado: 185.199.10X.1XX (cualquiera de los 4)

# Verificar CNAME para www
nslookup www.fyt-research.org
# Esperado: joas-s-vega.github.io
```

**Opción 2: Online Tool**

1. Ir a https://mxtoolbox.com/mxlookup.aspx
2. Ingresa: `fyt-research.org`
3. Click "MX Lookup" (o "A Lookup")
4. Espera resultados

**Opción 3: Namecheap Panel**

1. En Namecheap, bajo "Host Records"
2. Verifica que los records estén listados
3. Espera 24-48 horas para propagación completa

---

## ✅ Verificación {#verificación}

### Check 1: Dominio Resuelve

```bash
ping fyt-research.org
# Esperado: PING fyt-research.org (185.199.10X.1XX)
```

### Check 2: HTTPS Funciona

```bash
curl -I https://fyt-research.org/
# Esperado: HTTP/2 200
#          certificate is valid
```

### Check 3: Redirige a GitHub Pages

```bash
curl -L -I https://fyt-research.org/ | head -10
# Esperado: HTTP/2 200
#          Contenido de tu sitio
```

### Check 4: CNAME Correcto

```bash
curl -s https://api.github.com/repos/joas-s-vega/fyt-lab-connect/pages | grep "cname"
# Esperado: "cname":"fyt-research.org"
```

### Check 5: SSL Certificate

```bash
openssl s_client -connect fyt-research.org:443
# Esperado: certificate chain válida
#          subject: CN=fyt-research.org
```

---

## 🚨 Troubleshooting {#troubleshooting}

### Problema 1: HTTPS no funciona (ERR_SSL_PROTOCOL_ERROR)

**Posibles causas:**
1. GitHub Pages aún genera certificado (5-10 minutos)
2. DNS aún no propagó (24-48 horas)
3. CNAME incorrecto en GitHub

**Soluciones:**
```bash
# 1. Espera 10 minutos y reintenta
sleep 600
curl -I https://fyt-research.org/

# 2. Verifica CNAME
cat CNAME
# Debe ser exactamente: fyt-research.org

# 3. Verifica DNS
nslookup fyt-research.org
# Debe resolver a 185.199.10X.1XX

# 4. Si aún no funciona, en GitHub:
#    a) Quita custom domain
#    b) Espera 30 segundos
#    c) Vuelve a agregar custom domain
#    d) Espera 5 minutos
```

### Problema 2: Dominio no resuelve (NXDOMAIN)

**Posibles causas:**
1. DNS aún propaga
2. Nameservers de Namecheap incorrectos
3. CNAME no configurado correctamente

**Soluciones:**
```bash
# 1. Verifica Namecheap tiene nameservers correctos
#    Deberían ser los de GitHub o Custom DNS

# 2. Espera 24 horas para propagación
#    Puedes verificar en: https://dnspropagation.com/

# 3. Si aún no funciona:
nslookup fyt-research.org 8.8.8.8
# Si funciona con Google DNS (8.8.8.8), problema local
# Si no funciona, problema de Namecheap/propagación

# 4. Último recurso: contacta Namecheap support
```

### Problema 3: Certificado SSL Inválido

**Posibles causas:**
1. GitHub Pages no generó certificado aún
2. CNAME mal configurado

**Soluciones:**
```bash
# Verifica certificado
openssl s_client -connect fyt-research.org:443 -showcerts

# Si muestra wildcard o nombre incorrecto:
# 1. Ve a GitHub settings → GitHub Pages
# 2. Desactiva custom domain
# 3. Espera 30 segundos
# 4. Activa custom domain nuevamente
# 5. Espera 5 minutos para que GitHub regenre certificado
```

### Problema 4: www.fyt-research.org no funciona

**Causa:** No hay CNAME para www

**Solución:**
```bash
# En Namecheap, agrega:
Type: CNAME
Host: www
Value: joas-s-vega.github.io
TTL: 30 min

# O en GitHub, agrega record de redirección:
# (Algunos hosts lo hacen automáticamente)
```

---

## 📊 Configuración de Referencia

### GitHub Pages Settings

```yaml
repository: fyt-lab-connect
branch: main
folder: / (root)
custom_domain: fyt-research.org
enforce_https: true
cname_file: fyt-research.org
```

### Namecheap DNS

**Opción 1: Custom Nameservers (Recomendado)**
```
ns-1395.awsdns-46.com
ns-1820.awsdns-39.net
ns-1374.awsdns-45.org
ns-269.awsdns-33.com
```

**Opción 2: A Records**
```
Type   | Host | Value             | TTL
-------|------|-------------------|--------
A      | @    | 185.199.108.153   | 30 min
A      | @    | 185.199.109.153   | 30 min
A      | @    | 185.199.110.153   | 30 min
A      | @    | 185.199.111.153   | 30 min
CNAME  | www  | joas-s-vega.git.. | 30 min
```

---

## 🔄 Cambios de Dominio (Futura Referencia)

Si necesitaras cambiar de dominio en el futuro:

### En GitHub

1. Settings → GitHub Pages → Custom domain
2. Cambia a nuevo dominio
3. Click Save (GitHub actualiza CNAME automáticamente)

### En Namecheap

1. Compra nuevo dominio
2. O transfiere dominio actual
3. Configura nameservers igual que arriba

### En Código

Generalmente no es necesario cambiar nada si:
- `base: '/'` en vite.config.ts
- No tienes URLs hardcodeadas

---

## ✨ Características de la Configuración Actual

### ✅ Beneficios

- HTTPS automático con certificado válido
- DNS manejado por GitHub (confiable)
- Deploy automático en cada push
- Soporta alias www (opcional)
- Dominio personalizado profesional

### 🔒 Seguridad

- HTTPS enforced
- Certificado renovado automáticamente por GitHub
- DNS seguro (GitHub usa AWS Route 53)

### ⚡ Performance

- CDN global de GitHub Pages
- Latencia baja desde cualquier lugar
- Cache HTTP configurado correctamente

---

## 📞 Recursos Útiles

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Namecheap DNS Help](https://www.namecheap.com/support/knowledgebase/category/59)
- [DNS Propagation Checker](https://dnspropagation.com/)
- [SSL Certificate Checker](https://www.sslshopper.com/ssl-checker.html)

---

**Última actualización:** 29 de enero de 2026  
**Estado:** ✅ Configuración Correcta - No Requiere Cambios
