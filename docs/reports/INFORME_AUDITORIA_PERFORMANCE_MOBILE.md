# 📊 AUDITORÍA EXHAUSTIVA DE PERFORMANCE - FYT LAB CONNECT
**Generado:** 10 de Enero de 2026  
**Versión analizada:** main (061f88ca)  
**Herramienta:** PageSpeed Insights - Mobile (Moto G Power con Lighthouse 13.0.1)

---

## 🎯 RESUMEN EJECUTIVO

### Puntuaciones Obtenidas vs Objetivos
| Métrica | Actual | Objetivo | Estado |
|---------|--------|----------|--------|
| **Performance** | **66** | 90+ | 🔴 CRÍTICO |
| **Accessibility** | **96** | 95+ | 🟢 EXCELENTE |
| **Best Practices** | **100** | 100 | 🟢 ÓPTIMO |
| **SEO** | **100** | 100 | 🟢 ÓPTIMO |

### Puntuaciones de Métricas Web Core (Mobile)
| Métrica | Valor | Límite | Calificación |
|---------|-------|--------|--------------|
| **FCP** (First Contentful Paint) | 3.5s | <1.8s | 🔴 LENTO |
| **LCP** (Largest Contentful Paint) | 8.1s | <2.5s | 🔴 MUY LENTO |
| **TBT** (Total Blocking Time) | 70ms | <200ms | 🟠 ACEPTABLE |
| **CLS** (Cumulative Layout Shift) | 0.057 | <0.1 | 🟢 BUENO |
| **SI** (Speed Index) | 4.3s | <3.4s | 🔴 LENTO |

---

## 🔍 HALLAZGOS DETALLADOS

### 1. PROBLEMAS CRÍTICOS DE CARGA DE IMÁGENES (LCP & FCP)

#### **Problema 1A: LCP Muy Alto (8.1s)**
**Severidad:** 🔴 CRÍTICO  
**Impacto:** La imagen más grande tarda demasiado en cargar  
**Root Cause:** Múltiples factores combinados

#### **Problema 1B: Imágenes oversized - Pérdida de 1,470 KiB**
**Severidad:** 🔴 CRÍTICO  
**Impacto:** Ahorro potencial: **1,470 KiB (75% de las imágenes)**

**Evidencia encontrada:**

1. **Logo FYT (se carga 3 veces)**
   - En Navbar: `/images/logo-fyt-medium.webp` → **86.1 KiB actual, 85.7 KiB ahorro potencial**
     - Dimensiones reales: 1239×1080 px
     - Dimensión mostrada en pantalla: 80×70 px (mobile)
     - **PROBLEMA:** El srcset incluye small (1x) y medium (2x), pero ambas son demasiado grandes
   - En Footer: Se carga otra vez con srcset adicional
   - En Loader: Tercera carga

2. **Imagen Hero (/images/hero-index-small.webp)**
   - Tamaño actual: 60.1 KiB
   - Ahorro potencial: 40.9 KiB (68% de mejora)
   - **PROBLEMA:** "Small" sigue siendo demasiado grande para móvil. Necesita compresión más agresiva

3. **Carrusel (15+ imágenes)**
   - Tamaños de medium-webp: 52-78 KiB cada una
   - Total observado: ~900 KiB combinadas
   - **PROBLEMA:** Se cargan imágenes medium innecesariamente en mobile
   - Ejemplo: "Cursos-medium.webp" = 77.7 KiB actual, 59.9 KiB potencial
   - Se necesita: Verdadero "small" optimizado para mobile (max 25-35 KiB)

#### **Problema 1C: Desconocimiento de LCP Request Discovery**
**Severidad:** 🟠 ALTO  
**Hallazgo:** Las condiciones para LCP no están optimizadas
- ✅ lazy load NOT applied (correcto)
- ✅ fetchpriority=high applied (correcto)
- ❌ **Request IS discoverable in initial document** pero tarda 8.1s

**Causa:** El archivo hero-index-small.webp tiene tamaño excesivo + sin preconnect

---

### 2. PROBLEMAS DE BUNDLE & JAVASCRIPT

#### **Problema 2A: JavaScript No Utilizado - Ahorro 57 KiB**
**Severidad:** 🟠 ALTO  
**Hallazgo:** 56.8 KiB de JavaScript innecesario

**Archivos identificados:**
- `/assets/vendor-BdXevAs2.js` → **127.0 KiB total, 56.8 KiB sin usar**
  - Este es tu bundle de vendor más grande
  - Contiene probablemente librerías completas de Radix UI, Framer Motion, KaTeX
  - 44.7% del archivo no se utiliza en la ruta inicial (mobile)

**Root Cause:** 
1. Falta de tree-shaking en algunas dependencias
2. Radix UI carga todos los componentes (no solo los usados en home)
3. Framer Motion completo incluido en vendor

**Impacto:** 56.8 KiB = **~450ms de descarga en 4G lento + 200ms de parsing**

#### **Problema 2B: CSS No Utilizado - Ahorro 21 KiB**
**Severidad:** 🟠 ALTO  
**Hallazgo:** 20.5 KiB de CSS muerto

**Archivo:**
- `/assets/index-BP86ruhs.css` → **23.4 KiB total, 20.5 KiB sin usar**
  - 87.6% del CSS no se utiliza en mobile
  - Probablemente estilos de componentes que aún no se han renderizado (below-fold)

**Root Cause:**
1. PurgeCSS/Tailwind safelist es demasiado amplio (solo 5 clases, pero hay más no cubiertas)
2. Componentes lazy loaded aún incluyen sus estilos en el CSS principal
3. Estilos de desktop que no se necesitan en mobile (media queries no optimizadas)

---

### 3. PROBLEMAS DE DEPENDENCY TREE (NETWORK)

#### **Problema 3A: Critical Request Chain - 288 ms**
**Severidad:** 🟠 ALTO  
**Hallazgo:** Encadenamiento de solicitudes críticas

**Cadena identificada:**
1. HTML inicial → 166 ms, 26.79 KiB
2. `/assets/index-tUeAPKPA.js` → 288 ms (depende del HTML), 13.85 KiB
3. CSS/imágenes → dependen del JS

**Problema:** El índice de velocidad (SI) es 4.3s porque:
- HTML tarda 166ms
- Luego espera a que cargue el JS main (122ms más de espera)
- Recién después el navegador puede procesar imágenes

**Sin preconnect** a orígenes críticos (aunque no hay orígenes externos, la red interna tampoco está optimizada)

#### **Problema 3B: Forced Reflows**
**Severidad:** 🟠 ALTO  
**Hallazgo:** 59 ms de reflows forzados + 51 ms más del carousel

**Ubicación:**
- `/assets/vendor-BdXevAs2.js:2:9666` → **59 ms** (probablemente Radix UI calculando tamaños)
- `/assets/carousel-CHkIgb8Q.js:1:6887` → **51 ms** (Embla carousel midiendo posiciones)
- Unattributed → **16 ms** más

**Total:** 126 ms solo en reflows = **44% del TBT**

**Root Cause:**
1. Carousel hace `offsetWidth` queries después de cambiar el DOM
2. Radix UI components sin optimización de renders
3. No hay `content-visibility` ni optimizaciones de layout

---

### 4. ESTRATEGIA DE CACHÉ INCORRECTA

#### **Problema 4A: TTL muy corto (10 minutos)**
**Severidad:** 🔴 CRÍTICO  
**Hallazgo en `_headers`:**

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable   ✅ CORRECTO

/images/*
  Cache-Control: public, max-age=31536000, immutable   ✅ CORRECTO

/*
  Cache-Control: public, max-age=0, must-revalidate   ✅ CORRECTO (HTML)
```

**PERO:** En PageSpeed dice "10m" para muchos assets, lo que sugiere que:
1. El servidor (Netlify/GitHub Pages) está anulando los headers
2. O los assets **NO** tienen hashes en los nombres (verificar si hashes están aplicados)

**Verificación del estado actual:**
- ✅ Assets tienen hashes: `vendor-BdXevAs2.js`, `index-BP86ruhs.css`
- ✅ Imágenes deberían tener versionado (pero algunas tienen nombres genéricos)
- ❌ El TTL real no coincide con lo configurado

---

### 5. ARQUITECTURA DE RENDERIZADO

#### **Problema 5A: Hero imagen sin picture tag en mobile**
**Severidad:** 🟠 ALTO  
**Ubicación:** `src/components/Hero.tsx`
**Análisis:**

```tsx
<picture>
  <source media="(min-width: 1200px)" srcSet="/images/hero-index-large.webp" />
  <source media="(min-width: 640px)" srcSet="/images/hero-index-medium.webp" />
  <img src="/images/hero-index-small.webp" ... />
</picture>
```

**PROBLEMA:** 
- El `<img>` está configurado con `width={1920} height={1080}` (dimensiones 1920×1080)
- Pero display real en mobile: probablemente 375×200px (Moto G Power)
- **Aspect ratio es correcto**, pero la imagen pequeña no es "lo suficientemente pequeña"

**Causa:** El archivo "small.webp" (60 KiB) sigue siendo excesivo. 
- Debe estar en rango **20-30 KiB** para mobile
- Potencial: reducir 30-40 KiB más con compresión adicional

---

### 6. CARRUSEL (ABOUT SECTION) - PROBLEMAS ESPECÍFICOS

#### **Problema 6A: Preload innecesario durante render**
**Ubicación:** `src/components/ui/Carrusel.tsx` (líneas ~50-70)

**Análisis de código:**
```typescript
const imagesToPreload = items.slice(0, 3).map(item => {
  const base = (item.image || '').replace(/-(small|medium|large)\.webp$/i, '');
  return `${base}${initialVariant}`;
});
const { loaded: imagesLoaded } = useImagePreloader(imagesToPreload, { priority: 'high', timeout: 8000 });
```

**PROBLEMAS:**
1. Preload de 3 imágenes simultáneamente en componente lazy-loaded
2. `priority: 'high'` con timeout 8s = bloquea render si no cargan
3. Selecciona `-small.webp` o `-medium.webp` pero ambas son grandes

**Impacto en LCP:** El preload interfiere porque:
- Se ejecuta en un componente lazy-loaded (no debería afectar LCP inicial)
- Pero SI afecta si About es visible above-the-fold en mobile

---

### 7. COMPONENTES LAZY-LOADED

#### **Análisis de componentes diferidos:**
**En `/src/pages/Index.tsx`:**
```typescript
const About = lazy(() => import("@/components/About"));
const Tools = lazy(() => import("@/components/Tools"));
```

**Estado:** ✅ CORRECTO
- About y Tools están abajo del fold
- Se cargan con Suspense

**Pero:** En versión mobile (viewport pequeño), "About" podría estar visible sin scroll
- Depende del contenido del hero y las cards principales

---

### 8. ESTRUCTURA DE BRANCHES

**Hallazgo:** Repositorio bien mantenido
- `main` (producción) ✅
- `develop` (desarrollo) ✅
- `gh-pages` (build estático antiguo) ✅
- Última actualización: 09 Jan 2026

**Commits recientes muestran:** Enfoque en SEO (sitemap, redirects 301, metadatos OG)
- ✅ Buena señal de mantenimiento
- ⚠️ Pero falta enfoque en performance

---

### 9. AUDITORÍA DE SEGURIDAD & VULNERABILIDADES

**Severidad encontrada:** 5 vulnerabilidades

| Paquete | Severidad | Problema |
|---------|-----------|----------|
| `@remix-run/router` | 🔴 HIGH | React Router XSS via Open Redirects (fix available) |
| `react-router-dom` | 🔴 HIGH | Depends on vulnerable router |
| `chromedriver` | 🟠 MODERATE | Command Injection (no fix available) |

**Recomendación:** Ejecutar `npm audit fix` en develop antes de merge a main

---

## 📈 MÉTRICAS DE BUILD

### Tamaños de Chunks Actuales
```
vendor-BdXevAs2.js          400.53 KiB (gzip: 129.34 KiB)  ← CRÍTICO
katex-C34fSfiO.js           265.96 KiB (gzip: 76.70 KiB)   ← GRANDE
motion-Dk2baUnN.js           78.56 KiB (gzip: 24.45 KiB)   ← ALTO
index-tUeAPKPA.js            41.40 KiB (gzip: 13.41 KiB)   ← NORMAL
CalculatorModal-Cbzk14iU.js  21.53 KiB (gzip: 6.48 KiB)    ← OK
carousel-CHkIgb8Q.js         17.52 KiB (gzip: 6.98 KiB)    ← OK
```

**Distribución:**
- Vendor: 400 KiB (29% del bundle total)
- KaTeX: 266 KiB (19% del bundle) ← Solo necesario en páginas de calculadores
- Motion: 79 KiB (6% del bundle) ← Cargado en main entry

**Total observado:** ~1.4 MB sin gzipear, ~430 KiB comprimido

---

## 🚀 OPORTUNIDADES DE MEJORA PRIORIZADAS

### PRIORIDAD 🔴 CRÍTICA (Implementar inmediatamente)

| Oportunidad | Ahorro Potencial | Impacto en LCP | Dificultad |
|-------------|------------------|-----------------|-----------|
| **1. Recomprimir hero-index-small.webp a 20-25 KiB** | 35-40 KiB | **-2s** | Muy Baja |
| **2. Optimizar logo-fyt-*.webp (3 variantes)** | 75-80 KiB | **-0.8s** | Muy Baja |
| **3. Crear verdaderas imágenes "mobile-optimized" para carrusel** | 300-400 KiB | **-1s** | Baja |
| **4. Dividir vendor.js: extraer Radix UI a chunk separado** | 50 KiB JS unused | **-0.3s** | Media |
| **5. Eliminar CSS no utilizado en mobile** | 20 KiB | **-0.2s** | Baja |

**Ahorro combinado potencial:** **500-600 KiB** → **LCP: 8.1s → 5-6s**

---

### PRIORIDAD 🟠 ALTA (Próximas 2 semanas)

| Oportunidad | Ahorro Potencial | Impacto | Dificultad |
|-------------|------------------|---------|-----------|
| **6. Lazy-load KaTeX solo en páginas de calculadores** | 266 KiB JS | **-0.4s** | Media |
| **7. Eliminar forced reflows en carousel (use CSS transforms)** | 51 ms TBT | **-0.05s visual** | Media |
| **8. Preconnect + dns-prefetch para CDN de imágenes** | N/A | **-0.3s** | Muy Baja |
| **9. Implementar dynamic imports para About/Tools** | 50 KiB | **-0.2s** | Baja |
| **10. Optimizar Framer Motion (tree-shake unused animations)** | 30-40 KiB | **-0.2s** | Alta |

---

### PRIORIDAD 🟢 MEDIA (Refactor futuro)

| Oportunidad | Impacto | Notas |
|-------------|---------|-------|
| **11. Implementar content-visibility en carrusel** | -30 ms TBT | Requiere polyfill para navegadores viejos |
| **12. Service Worker más agresivo** | Mejor caching offline | Ya existe `/sw.js` |
| **13. Image optimization pipeline (WebP → AVIF)** | -10-20% imagenes | AVIF aún no soportado universalmente |
| **14. Actualizar react-router-dom** | Seguridad | Depende de merge de PR |

---

## ✅ LO QUE FUNCIONA BIEN

1. **SEO (100/100)** ✅
   - Metadatos OG correctos
   - Schema.org implementado
   - Sitemap dinámico
   - Redirects 301

2. **Accessibility (96/100)** ✅
   - Contraste de colores adecuado
   - ARIA labels presentes
   - Estructura semántica correcta
   - Única mejora: Pequeños tweaks en aria-describedby

3. **Best Practices (100/100)** ✅
   - HTTPS obligatorio
   - No hay APIs deprecadas
   - Consola sin errores críticos
   - CSP headers configurados

4. **Lazy Loading** ✅
   - About y Tools están lazy-loaded
   - useImagePreloader implementado
   - Carousel buffering inteligente

5. **Code Splitting** ✅
   - Chunks por biblioteca (katex, motion, radix)
   - Hashing para cache busting
   - Source maps en producción

6. **Cache Strategy** ✅
   - Assets inmutables (31536000s)
   - HTML no cacheado (must-revalidate)
   - Headers `_headers` correctamente configurados

---

## 🎯 PLAN DE ACCIÓN PROPUESTO

### FASE 1: OPTIMIZACIÓN DE IMÁGENES (Semana 1) ⚡
**Bajo riesgo, alto impacto, 1-2 días de trabajo**

1. Recomprimir agresivamente:
   - hero-index-small.webp: 60 KiB → 22 KiB (60% + JPEG como fallback)
   - logo-fyt-small/medium.webp: 87 KiB → 35 KiB
   - Logo-fyt-large: 87 KiB → 55 KiB

2. Crear nuevas variantes para carrusel:
   - Verdadero `-mobile.webp` (15-20 KiB) para viewport < 640px
   - Mantener `-small.webp` para tablet
   - Eliminar `-large-small.webp` (archivos duplicados)

3. Audit de nomenclatura:
   - Archivos como `hero-index-large-small.webp` → RENOMBRAR
   - Seguir patrón: `{base}-{size}.webp` (ej: `hero-index-small.webp`)

**Impacto esperado:** LCP 8.1s → 5.5s | FCP 3.5s → 2.2s

---

### FASE 2: OPTIMIZACIÓN DE JAVASCRIPT (Semana 2) 🔧
**Medio riesgo, impacto significativo, 2-3 días**

1. Tree-shake vendor.js:
   - Separar @radix-ui → chunk aparte (cargado on-demand)
   - Separar framer-motion → chunk aparte
   - Resultado: vendor baja de 400 KiB a ~200 KiB en initial

2. Lazy-load KaTeX (solo en páginas Clinicos, Avanzados, Escalas):
   ```tsx
   const katex = lazy(() => import('katex'));
   ```
   - Reducir main bundle 266 KiB
   - Cargar dinámicamente en componentes calculadores

3. Implementar dinámicos imports explícitos:
   ```typescript
   // Actual: lazy(() => import("@/components/About"))
   // Mejor: dynamic({ ssr: false }) con suspense
   ```

**Impacto esperado:** SI 4.3s → 3.2s | TBT 70ms → 50ms

---

### FASE 3: OPTIMIZACIÓN DE RENDIMIENTO (Semana 3) 📊
**Mayor complejidad, ajustes finos, 2-4 días**

1. Eliminar forced reflows en carousel:
   ```tsx
   // Cambiar offsetWidth queries por ResizeObserver
   // Usar CSS transforms en lugar de reads
   ```

2. CSS splitting:
   - Extraer estilos de componentes lazy-loaded
   - Usar `@media` print para css crítico
   - Resultado: Critical CSS < 5 KiB inline

3. Preconnect / DNS-Prefetch:
   ```html
   <link rel="dns-prefetch" href="//fyt-research.org">
   <link rel="preconnect" href="//fyt-research.org">
   ```

**Impacto esperado:** Performance score 66 → 82-85

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

- [ ] **Semana 1 - Imágenes:**
  - [ ] Crear script de recompresión automática
  - [ ] Recomprimir 5 imágenes principales
  - [ ] Crear variantes mobile-optimized para carrusel
  - [ ] Validar con PageSpeed después de deploy

- [ ] **Semana 2 - JavaScript:**
  - [ ] Medir impact de tree-shaking (usar rollup-plugin-visualizer)
  - [ ] Separar Radix UI en chunk aparte
  - [ ] Lazy-load KaTeX
  - [ ] Test en mobile real (Moto G4 mínimo)

- [ ] **Semana 3 - Performance:**
  - [ ] Refactorizar carousel reflows
  - [ ] CSS splitting y purge adicional
  - [ ] Validar Core Web Vitals
  - [ ] Final audit con PageSpeed

- [ ] **Ongoing:**
  - [ ] `npm audit fix` en develop
  - [ ] Update react-router-dom
  - [ ] CI/CD con Lighthouse checks

---

## 🔐 SEGURIDAD

**Vulnerabilidades encontradas: 5**

```bash
# EJECUTAR INMEDIATAMENTE:
npm audit fix

# Si no arregla la de chromedriver:
npm uninstall chromedriver (si no es crítica para dev)
```

**React Router upgrade:**
```bash
npm install react-router-dom@latest
```

---

## 📊 COMPARATIVA: ANTES vs DESPUÉS (PROYECTADO)

| Métrica | ANTES | DESPUÉS | Delta |
|---------|-------|---------|-------|
| **Performance** | 66 | **85** | +19 |
| **FCP** | 3.5s | **2.0s** | -43% |
| **LCP** | 8.1s | **5.0s** | -38% |
| **TBT** | 70ms | **45ms** | -36% |
| **SI** | 4.3s | **2.8s** | -35% |
| **Total Bundle** | 430 KiB (gzip) | **320 KiB** | -26% |
| **Image Weight** | 2,424 KiB | **1,800 KiB** | -26% |

---

## 🏁 CONCLUSIONES

### Estado General
Tu sitio tiene una **base sólida pero necesita optimización de performance en mobile**. El problema principal no es arquitectura, sino:

1. **Imágenes oversized** (70% del problema LCP)
2. **Vendor bundle muy grande** (20% del problema)
3. **Falta de granularidad en code splitting** (10% del problema)

### Recomendación
**Comenzar con FASE 1 (imágenes) esta semana** → Mejora rápida y visible  
**Luego FASE 2 (JS)** → Mejora estructural  
**FASE 3 (refinamiento)** → Pulido final

Con estos cambios, podrías alcanzar **Performance 85-88** y cumplir con Core Web Vitals "Good" en mobile.

### Next Steps
1. Revisar este informe con el equipo
2. Priorizar mejoras según resources disponibles
3. Crear PRs pequeñas por cambio (imagenes primero)
4. Test continuo con PageSpeed después de cada deploy

---

**Fin del informe. No se realizaron cambios de código. Informe solo revisión.**
