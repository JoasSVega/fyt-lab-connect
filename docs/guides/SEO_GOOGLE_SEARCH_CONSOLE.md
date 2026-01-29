# 🔍 Google Search Console - Pasos de Acción

**Fecha:** 29 de enero de 2026  
**Audiencia:** Marketing, Product Managers  
**Duración:** 15 minutos

---

## 📋 Tabla de Contenidos

1. [Acceso a Google Search Console](#acceso)
2. [Solicitar Indexación](#solicitar-indexación)
3. [Monitorear Cambios](#monitorear)
4. [Interpretación de Resultados](#interpretación)

---

## 🔓 Acceso a Google Search Console {#acceso}

### Paso 1: Ir a Google Search Console

1. Abre [https://search.google.com/search-console](https://search.google.com/search-console)
2. Si pide login, usa tu cuenta Google asociada a fyt-research.org
3. Selecciona la propiedad **fyt-research.org** (no www)

### Paso 2: Verificar Acceso

Si ves este panel, tienes acceso correcto:

```
FYT Lab Connect
fyt-research.org
├── Overview
├── Performance
├── URL Inspection
├── Coverage
├── Sitemaps
└── ... más opciones
```

Si NO ves esto:
- Verifica que estés logged en con la cuenta correcta
- Pide permiso al propietario de la propiedad
- Usa URL: `https://search.google.com/search-console?resource_id=sc-domain:fyt-research.org`

---

## 📤 Solicitar Indexación {#solicitar-indexación}

### Paso 1: Ir a URL Inspection

En el panel izquierdo:
1. Haz clic en **"URL Inspection"**
2. Verás una caja de búsqueda en la parte superior

### Paso 2: Verificar Primera URL Problemática

En la caja de búsqueda, pega:
```
https://fyt-research.org/equipo
```

Presiona Enter.

### Paso 3: Interpretar Resultado

**Versión Vieja (Antes del Deploy):**
```
URL: https://fyt-research.org/equipo
Status: ❌ Not found (404)
Last crawled: Jan 28, 2026
Last indexed: Not indexed
Discoverable: No
Coverage: Excluded
```

**Versión Nueva (Después del Deploy):**
```
URL: https://fyt-research.org/equipo
Status: ✅ URL is on Google
Last crawled: Jan 29, 2026 (nuevo)
Last indexed: Jan 29, 2026 (nuevo)
Discoverable: Yes
Coverage: Included
```

### Paso 4: Solicitar Reindexación

Si TODAVÍA muestra 404 (antes del deploy):

1. Haz clic en el botón **"Request indexing"** (rojo)
2. Verás: "Indexing requested for this URL"
3. Google volverá a rastrear en 2-5 horas

Si AHORA muestra como válido (después del deploy):

1. Haz clic en el botón **"Request indexing"** (rojo)
2. Esto hace que Google priorice el re-rastreo
3. Notarás cambios en 24 horas

### Paso 5: Repetir para Todas las URLs Problemáticas

**Primero grupo - URLs que mostraban 404:**
```
1. https://fyt-research.org/equipo
2. https://fyt-research.org/noticias
3. https://fyt-research.org/investigacion/formacion
4. https://fyt-research.org/investigacion/investigacion-clinica
5. https://fyt-research.org/investigacion/investigacion-avanzada
6. https://fyt-research.org/investigacion/herramientas
7. https://fyt-research.org/contenidos
8. https://fyt-research.org/eventos
```

**Segundo grupo - URLs que mostraban redirect:**
```
1. https://fyt-research.org/CodeOfEthics
2. https://fyt-research.org/PrivacyPolicy
3. https://fyt-research.org/TermsOfUse
4. https://fyt-research.org/sobre-nosotros-old
5. ... (4 más si aún están problemáticas)
```

**Opción: Batch Request (Avanzado)**

En lugar de una por una, puedes:

1. Ve a **"URL Inspection"**
2. En la parte superior, haz clic en **"Request indexing"** (botón general)
3. Pega todas las URLs a la vez (en algunos casos)

---

## 📊 Monitorear Cambios {#monitorear}

### Ver Cobertura Total

1. En el panel izquierdo, ve a **"Coverage"**
2. Verás gráfico de:
   - ✅ Valid pages (deberá crecer)
   - ⚠️ Valid with warnings
   - 🚫 Excluded (deberá decrecer)
   - 🔴 Error (deberá ser 0)

**Antes (HOY):**
```
Valid pages:           ~22 (44%)
Excluded:              ~28 (56%)
Error (404):           8   ❌
Error (Redirect):      8   ⚠️
```

**Después (72 horas):**
```
Valid pages:           ~35 (70%)
Excluded:              ~15 (30%)
Error (404):           0   ✅
Error (Redirect):      2   ✅
```

### Ver Performance

1. Ve a **"Performance"**
2. Selecciona los últimos 3 meses
3. Verás:
   - Clicks (buscadores que hacen clic)
   - Impressions (veces que aparece en búsquedas)
   - CTR (% que hace clic)
   - Position (posición promedio)

**Cambios Esperados:**
```
Clicks:      0 → 50-100+ (nuevas páginas indexadas)
Impressions: 100 → 300+ (más visibilidad)
CTR:         variable → debe mejorar
Position:    N/A → 10-30 (primeras páginas)
```

### Verificar Sitemaps

1. Ve a **"Sitemaps"**
2. Verás: `/sitemap.xml`
3. Estado debe ser: ✅ **Success**
4. Última lectura: 2026-01-29 (hoy)
5. URLs detectadas: ~40

Si dice "PENDING", espera 24 horas.

---

## 📈 Interpretación de Resultados {#interpretación}

### Escenario 1: URL muestra 404 TODAVÍA (después de 4 horas)

**Posibles causas:**
1. El deploy aún no llegó a producción
2. Google aún no ha rastreado

**Acciones:**
1. Verifica: `https://fyt-research.org/equipo` en tu navegador
2. Debería cargar la página normalmente
3. Si carga: Espera más (Google rastrea lentamente)
4. Si no carga: Hay un problema en el código

### Escenario 2: URL muestra como válida (excelente)

**Indicadores:**
```
Status: ✅ URL is on Google
Last crawled: Jan 29, 2026
Indexable: Yes
Coverage: Included
```

**Acciones:**
1. ¡Felicidades! Está funcionando
2. Repite con las otras URLs problemáticas
3. Espera 72 horas para ver cambios en Coverage

### Escenario 3: Todavía aparece "Page with redirect"

**Significado:**
- Google detectó una redirección
- Esto puede ser normal (algunos redirects son OK)
- Si es de una URL vieja a nueva: normal
- Si es en el mismo sitio sin razón: mala señal

**Acciones:**
1. Revisa si es una redirección esperada
2. Si la URL antigua debe ser 301: probablemente está OK
3. Si no debería redirigir: revisa src/App.tsx
4. Luego solicita re-rastreo

---

## ✅ Checklist de Acciones

### En Google Search Console (Hoy)

- [ ] Login en GSC con cuenta correcta
- [ ] Selecciona propiedad fyt-research.org
- [ ] Ve a URL Inspection
- [ ] Prueba una URL problemática (ej: /equipo)
- [ ] Si es válida: click "Request indexing"
- [ ] Si es 404: Espera 2 horas y reintenta

### En Google Search Console (Mañana)

- [ ] Revisa Coverage nuevamente
- [ ] ¿Hay menos errores 404? (deberían ser 0)
- [ ] ¿Más páginas válidas? (deberían ser ~35)
- [ ] Solicita indexación para las 8 URLs originales
- [ ] Anota el estado de cada una

### En Google Search Console (72 horas)

- [ ] Coverage está en 70%+ ✅
- [ ] Error 404 = 0 ✅
- [ ] Errores redirect = 0-2 ✅
- [ ] Sitemap muestra Success ✅
- [ ] Performance muestra más clicks ✅

---

## 🚨 Troubleshooting

### "URL muestra 404 después de 8 horas"

```
1. Verifica deploy:
   $ git log --oneline -5
   ↳ ¿Ves el último commit?

2. Verifica producción:
   $ curl https://fyt-research.org/equipo -I
   ↳ ¿Status code? Debe ser 200

3. Verifica 404.html:
   $ cat 404.html | head -20
   ↳ ¿Tiene <script>? Debe tener lógica de redirección
```

### "Google sigue diciendo Page with redirect"

```
1. Revisa App.tsx:
   ¿Hay <Navigate> en esa ruta?
   Si sí: Este comportamiento es esperado

2. Si quieres eliminar redirect:
   a) Copia contenido de destino
   b) Usa path original en lugar de redirect
   c) Redeploy y solicita reindexación
```

### "Coverage no mejora después de 72 horas"

```
1. Revisa si hay otros errores:
   - Ve a Coverage → Error section
   - ¿Hay otros tipos de errores?

2. Si hay errores de conectividad:
   - Posible problema de SSL
   - Contacta a Namecheap support

3. Si hay errores de robots.txt:
   - Verifica robots.txt está permitiendo /
   - Debe tener: Allow: /
```

---

## 📞 Soporte

Si tienes dudas:

1. Revisa [SEO_TECHNICAL_CHECKLIST.md](SEO_TECHNICAL_CHECKLIST.md)
2. Revisa [SEO_SOLUTION_ANALYSIS.md](SEO_SOLUTION_ANALYSIS.md)
3. Abre Google Search Console help: `?hl=en`

---

**Última actualización:** 2026-01-29  
**Próximo documento:** [SEO_TECHNICAL_CHECKLIST.md](SEO_TECHNICAL_CHECKLIST.md)
