---
Estado: Completado
Idioma: Mixto
---

# SmartImage — Guía de uso y reglas (ES)

`SmartImage` es un componente interno que automatiza la selección de variantes responsivas y las estrategias de carga (mobile-first).

### Reglas principales (MOBILE FIRST)
1. El atributo `src` apunta siempre a `-small.webp` (mobile-first).
2. El `srcSet` solo incluye `-small.webp` y `-medium.webp`; `-large.webp` no debe incluirse en `srcSet` para evitar descargas pesadas en móviles.
3. `sizes` utiliza presets mobile-first que ayudan a forzar la descarga de variantes ligeras en móviles.
4. `loading="lazy"` y `decoding="async"` por defecto; `priority=true` fuerza `loading="eager"` y `fetchPriority="high"`.

### Ejemplo de uso

```tsx
<SmartImage
  basePath="/images/hero-index"
  usage="hero"
  alt="Hero image description"
  width={1920}
  height={600}
  priority={true}
/>
```

### Configuración de `sizes` (resumen)
- `hero`: `100vw`
- `card`: `(max-width: 640px) 400px, (max-width: 1024px) 600px, 400px`
- `avatar`: `100px`
- `team`: `(max-width: 640px) 180px, 220px`
- `thumbnail`: `(max-width: 640px) 150px, 200px`

---

# SmartImage — Usage guide and rules (EN)

`SmartImage` is an internal component that automates responsive variant selection and loading strategies (mobile-first).

### Key rules (MOBILE FIRST)
1. The `src` attribute always points to `-small.webp` (mobile-first).
2. The `srcSet` includes only `-small.webp` and `-medium.webp`; `-large.webp` must not be included to avoid heavy downloads on mobile.
3. `sizes` uses mobile-first presets that help force download of lighter variants on mobile.
4. Default `loading="lazy"` and `decoding="async"`; `priority=true` forces `loading="eager"` and `fetchPriority="high"`.

### Usage example

```tsx
<SmartImage
  basePath="/images/hero-index"
  usage="hero"
  alt="Hero image description"
  width={1920}
  height={600}
  priority={true}
/>
```

### `sizes` summary
- `hero`: `100vw`
- `card`: `(max-width: 640px) 400px, (max-width: 1024px) 600px, 400px`
- `avatar`: `100px`
- `team`: `(max-width: 640px) 180px, 220px`
- `thumbnail`: `(max-width: 640px) 150px, 200px`
