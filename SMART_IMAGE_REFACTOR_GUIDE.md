# SmartImage - Guía de Refactorización

## 📋 Componente Creado

Se ha creado `src/components/SmartImage.tsx` - un componente inteligente que automatiza la optimización de imágenes responsivas.

---

## ✨ Características

### 1. **Generación Automática de srcSet**
No más escribir manualmente las variantes. El componente genera automáticamente:
```tsx
srcSet="${basePath}-small.webp 480w, ${basePath}-medium.webp 800w, ${basePath}-large.webp 1200w"
```

### 2. **Atributo sizes Inteligente**
5 presets predefinidos según el tipo de uso:

| Usage | Descripción | sizes |
|-------|-------------|-------|
| `hero` | Imagen hero a pantalla completa | `100vw` |
| `card` | Tarjetas en carrusel/grid | `(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px` |
| `avatar` | Logos pequeños/fotos perfil | `100px` |
| `team` | Fotos de equipo | `(max-width: 640px) 180px, 220px` |
| `thumbnail` | Miniaturas pequeñas | `(max-width: 640px) 150px, 200px` |

### 3. **Fallback Inteligente**
Por defecto usa `-small.webp` para garantizar carga rápida en móviles. Puedes cambiarlo con `fallbackSize`.

---

## 🔄 Ejemplos de Refactorización

### **ANTES vs DESPUÉS**

#### 1. **Carrusel (Carrusel.tsx)**

**❌ ANTES:**
```tsx
{(() => {
  const base = item.image.replace(/-medium\.webp$/i, '');
  const loadingMode: 'eager' | 'lazy' = index < 3 ? 'eager' : 'lazy';
  
  return (
    <img
      src={`${base}-medium.webp`}
      srcSet={`${base}-small.webp 480w, ${base}-medium.webp 800w, ${base}-large.webp 1200w`}
      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
      alt={item.title}
      loading={loadingMode}
      decoding="async"
      className={defaultImageClass}
      style={heightCss ? ({ height: '100%', maxHeight: heightCss, minHeight: heightCss } as React.CSSProperties) : ({ height: '100%' } as React.CSSProperties)}
      width={1200}
      height={900}
    />
  );
})()}
```

**✅ DESPUÉS:**
```tsx
import SmartImage from '@/components/SmartImage';

<SmartImage
  basePath={item.image}
  alt={item.title}
  usage="card"
  loading={index < 3 ? 'eager' : 'lazy'}
  fallbackSize="medium"
  className={defaultImageClass}
  style={heightCss ? ({ height: '100%', maxHeight: heightCss, minHeight: heightCss } as React.CSSProperties) : ({ height: '100%' } as React.CSSProperties)}
  width={1200}
  height={900}
  decoding="async"
/>
```

**Beneficios:**
- ✅ 15 líneas → 10 líneas (33% menos código)
- ✅ No más lógica manual de srcSet
- ✅ Sizes predefinido y optimizado
- ✅ Limpieza del basePath automática

---

#### 2. **Imagen Hero (SobreNosotros.tsx)**

**❌ ANTES:**
```tsx
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcSet="/images/hero-nosotros-large.webp" 
  />
  <source 
    media="(min-width: 640px)" 
    srcSet="/images/hero-nosotros-medium.webp" 
  />
  <img 
    src="/images/hero-nosotros-small.webp" 
    alt="Equipo de Grupo FyT"
    className="w-full h-full object-cover object-center"
    width={1920}
    height={600}
    fetchPriority="high"
    loading="eager"
    decoding="sync"
  />
</picture>
```

**✅ DESPUÉS:**
```tsx
import SmartImage from '@/components/SmartImage';

<SmartImage
  basePath="/images/hero-nosotros"
  alt="Equipo de Grupo FyT"
  usage="hero"
  fallbackSize="small"
  loading="eager"
  decoding="sync"
  fetchPriority="high"
  className="w-full h-full object-cover object-center"
  width={1920}
  height={600}
/>
```

**Beneficios:**
- ✅ 18 líneas → 11 líneas (39% menos código)
- ✅ Más simple y mantenible
- ✅ Automáticamente responsivo
- ✅ Fallback optimizado para móvil

---

#### 3. **Fotos de Equipo (Team.tsx)**

**❌ ANTES:**
```tsx
<SafeImage
  src={`${base}-small.webp`}
  srcSet={`${base}-small.webp 220w, ${base}-medium.webp 440w`}
  sizes="(max-width: 640px) 180px, 220px"
  alt={`Retrato de ${member.name}, ${member.role}`}
  className="mb-5 shadow-soft border-2 border-fyt-blue/30"
  style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 16 }}
  width={220}
  height={220}
  loading="lazy"
  decoding="async"
/>
```

**✅ DESPUÉS:**
```tsx
import SmartImage from '@/components/SmartImage';

<SmartImage
  basePath={imgSrc}
  alt={`Retrato de ${member.name}, ${member.role}`}
  usage="team"
  loading="lazy"
  decoding="async"
  className="mb-5 shadow-soft border-2 border-fyt-blue/30"
  style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 16 }}
  width={220}
  height={220}
/>
```

**Beneficios:**
- ✅ Preset `team` maneja sizes automáticamente
- ✅ Fallback a `-small.webp` por defecto (óptimo para móvil)
- ✅ Genera srcSet completo con 3 variantes automáticamente

---

#### 4. **Imagen de Proyecto (InvestigacionPage.tsx)**

**❌ ANTES (supuesto):**
```tsx
<img 
  src="/images/proyecto-ejemplo-large.webp"
  alt="Proyecto de investigación"
  className="w-full h-64 object-cover"
  loading="lazy"
/>
```

**✅ DESPUÉS:**
```tsx
import SmartImage from '@/components/SmartImage';

<SmartImage
  basePath="/images/proyecto-ejemplo"
  alt="Proyecto de investigación"
  usage="card"
  loading="lazy"
  className="w-full h-64 object-cover"
  width={1200}
  height={900}
/>
```

**Beneficios:**
- ✅ Móvil descargará `-small.webp` (no `-large.webp`)
- ✅ Responsive automático
- ✅ Optimización inmediata sin reescribir lógica

---

## 🎯 Casos de Uso Recomendados

| Componente | Usage Recomendado | Loading | FallbackSize |
|------------|-------------------|---------|--------------|
| Hero principal | `hero` | `eager` | `small` |
| Carrusel | `card` | primeros 3: `eager`, resto: `lazy` | `medium` |
| Fotos de equipo | `team` | `lazy` | `small` |
| Logos/avatares | `avatar` | `lazy` | `small` |
| Thumbnails noticias | `thumbnail` | `lazy` | `small` |
| Grid de proyectos | `card` | `lazy` | `small` |

---

## 📦 Props Disponibles

```tsx
interface SmartImageProps {
  basePath: string;              // Ruta sin sufijos (ej: "/images/evento")
  usage: 'hero' | 'card' | 'avatar' | 'team' | 'thumbnail';
  alt: string;                   // REQUERIDO para accesibilidad
  fallbackSize?: 'small' | 'medium' | 'large'; // Default: 'small'
  width?: number;                // Ancho real de la imagen
  height?: number;               // Alto real de la imagen
  loading?: 'eager' | 'lazy';    // Default: 'lazy'
  decoding?: 'async' | 'sync' | 'auto'; // Default: 'async'
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  style?: React.CSSProperties;
  // ... todos los atributos estándar de <img>
}
```

---

## 🚀 Pasos para Implementar

### Opción A: Refactorizar Carrusel.tsx (Recomendado)

1. **Abrir:** `src/components/ui/Carrusel.tsx`
2. **Importar SmartImage:**
   ```tsx
   import SmartImage from '@/components/SmartImage';
   ```
3. **Reemplazar el bloque de imagen** (líneas ~205-226) con:
   ```tsx
   <SmartImage
     basePath={item.image}
     alt={item.title}
     usage="card"
     loading={index < 3 ? 'eager' : 'lazy'}
     fallbackSize="medium"
     className={defaultImageClass}
     style={heightCss ? ({ height: '100%', maxHeight: heightCss, minHeight: heightCss } as React.CSSProperties) : ({ height: '100%' } as React.CSSProperties)}
     width={1200}
     height={900}
     decoding="async"
   />
   ```

### Opción B: Refactorizar SobreNosotros.tsx

1. **Abrir:** `src/pages/SobreNosotros.tsx`
2. **Importar SmartImage:**
   ```tsx
   import SmartImage from '@/components/SmartImage';
   ```
3. **Reemplazar el `<picture>`** (líneas ~32-56) con:
   ```tsx
   <SmartImage
     basePath="/images/hero-nosotros"
     alt="Equipo de Grupo FyT"
     usage="hero"
     fallbackSize="small"
     loading="eager"
     decoding="sync"
     fetchPriority="high"
     className="w-full h-full object-cover object-center"
     width={1920}
     height={600}
   />
   ```

### Opción C: Refactorizar Team.tsx

1. **Abrir:** `src/components/Team.tsx`
2. **Importar SmartImage:**
   ```tsx
   import SmartImage from '@/components/SmartImage';
   ```
3. **Reemplazar `<SafeImage>`** (líneas ~189-200) con:
   ```tsx
   <SmartImage
     basePath={imgSrc}
     alt={`Retrato de ${member.name}, ${member.role}`}
     usage="team"
     loading="lazy"
     decoding="async"
     className="mb-5 shadow-soft border-2 border-fyt-blue/30"
     style={{ width: 220, height: 220, objectFit: "cover", borderRadius: 16 }}
     width={220}
     height={220}
   />
   ```

---

## ✅ Checklist de Implementación

- [ ] SmartImage.tsx creado en `src/components/`
- [ ] Refactorizar Carrusel.tsx (mayor impacto - 3 carruseles en Homepage)
- [ ] Refactorizar SobreNosotros.tsx (LCP crítico)
- [ ] Refactorizar Team.tsx (8 fotos pesadas)
- [ ] Validar con Lighthouse móvil (objetivo: LCP < 2.5s)
- [ ] Commit y push cambios
- [ ] Validar en producción que todas las imágenes cargan correctamente

---

## 🎯 Impacto Esperado

### Performance
- **LCP móvil:** 3.8s → **< 2.5s** (objetivo 100/100)
- **Bytes transferidos:** Reducción del 60-70% en móviles
- **Tiempo de carga inicial:** Mejora del 40-50%

### Código
- **Reducción de líneas:** ~30-40% menos código repetitivo
- **Mantenibilidad:** Cambios centralizados en un solo componente
- **Consistencia:** Todos los componentes usan la misma estrategia

### Developer Experience
- ✅ No más copiar/pegar srcSet manualmente
- ✅ No más errores de sizes incorrectos
- ✅ Presets predefinidos y testeados
- ✅ TypeScript autocompletado para `usage`

---

## 🔍 Debugging

### Si una imagen no carga:
1. Verificar que existan las 3 variantes: `-small.webp`, `-medium.webp`, `-large.webp`
2. Verificar que el `basePath` no incluya sufijos duplicados
3. Abrir DevTools → Network → Filter por `webp` y ver qué variante se descarga

### Si el sizes no se aplica correctamente:
1. Inspeccionar el elemento en Chrome DevTools
2. Ver la pestaña "Properties" → `currentSrc` para ver qué imagen se seleccionó
3. Ajustar el preset en `USAGE_SIZES` si es necesario

---

## 📚 Referencias
- [MDN - Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Web.dev - Serve responsive images](https://web.dev/serve-responsive-images/)
- [Lighthouse - LCP Optimization](https://web.dev/optimize-lcp/)
