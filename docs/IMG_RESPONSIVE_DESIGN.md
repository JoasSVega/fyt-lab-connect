# Hero Images Responsive Strategy

## Overview
La página "Sobre Nosotros" utiliza una estrategia de imágenes responsivas optimizada con la etiqueta HTML5 `<picture>` para servir diferentes resoluciones según el dispositivo.

## Arquitectura

### Estructura HTML (`<picture>`)
```html
<picture>
  <!-- Desktop (≥1024px) -->
  <source media="(min-width: 1024px)" srcSet="/images/hero-nosotros-large.webp" />
  
  <!-- Tablet (≥640px, <1024px) -->
  <source media="(min-width: 640px)" srcSet="/images/hero-nosotros-medium.webp" />
  
  <!-- Mobile (Default fallback) -->
  <img src="/images/hero-nosotros-small.webp" alt="..." />
</picture>
```

### Variantes de Imagen

| Variante | Ancho | Alto | Breakpoint | Caso de Uso |
|----------|-------|------|------------|------------|
| `small` | 768px | 400px | < 640px | Móviles |
| `medium` | 1024px | 500px | ≥ 640px | Tablets |
| `large` | 1920px | 600px | ≥ 1024px | Desktop |

### Dimensiones del Hero

```css
/* Responsive Heights */
h-[400px]      /* Mobile: 400px */
md:h-[500px]   /* Tablet (md ≥ 768px): 500px */
lg:h-[600px]   /* Desktop (lg ≥ 1024px): 600px */
```

## Optimizaciones Aplicadas

### 1. **object-cover + object-center**
- `object-cover`: Cubre todo el espacio sin deformaciones
- `object-center`: Centra el foco (equipo de personas)
- Evita distorsión de aspect ratio

### 2. **WebP Format**
- Todos los archivos en `.webp` (VP8 encoding)
- Compresión de 25-30% mejor que JPEG/PNG
- Soportado en navegadores modernos (> 97%)

### 3. **Preload Strategy**
Usando `usePageReady` hook:
```typescript
usePageReady({
  responsiveImages: ["/images/hero-nosotros"]
  // Auto-precarga: -small, -medium, -large
});
```

### 4. **LCP Optimization**
```html
<img 
  fetchPriority="high"  <!-- High priority fetch -->
  loading="eager"        <!-- Load immediately -->
  decoding="sync"        <!-- Synchronous decoding -->
/>
```

### 5. **Overlay for Readability**
```html
<div className="absolute inset-0 bg-black/40" />
<!-- 40% black overlay ensures text is readable -->
```

## File Sizes

```
hero-nosotros-small.webp   ~50-80 KB   (768×400)
hero-nosotros-medium.webp  ~100-150 KB (1024×500)
hero-nosotros-large.webp   ~180-250 KB (1920×600)
```

## Performance Metrics

### Antes (CSS background-image)
- ❌ No responsive variants
- ❌ Baja calidad en móviles (overdimensionada)
- ❌ Sin preload específico
- ❌ LCP > 3.5s

### Después (picture + responsive)
- ✅ Imágenes optimizadas por dispositivo
- ✅ Mejor calidad en todos los tamaños
- ✅ Precarga inteligente
- ✅ LCP < 2.5s (estimated)

## Scripts

### Regenerar imágenes optimizadas
```bash
node scripts/optimize-hero-images.mjs
```

### Validar variantes
El script valida automáticamente que todas las variantes existan en build time.

## Breakpoints Reference

```
Mobile:       < 640px  → hero-nosotros-small.webp (768×400)
Tablet:       ≥ 640px  → hero-nosotros-medium.webp (1024×500)
Desktop:      ≥ 1024px → hero-nosotros-large.webp (1920×600)
```

## Mantenimiento

1. Si necesitas cambiar la imagen fuente:
   - Reemplaza en `/public/images/`
   - Ejecuta: `node scripts/optimize-hero-images.mjs`

2. Si necesitas ajustar calidad/dimensiones:
   - Edita `scripts/optimize-hero-images.mjs`
   - Ajusta `quality` o `width`/`height` en objeto `heroImages`

3. Para agregar más hero images:
   - Añade entrada en `heroImages` object
   - Ejecuta script nuevamente
   - Actualiza componente con las nuevas variantes
