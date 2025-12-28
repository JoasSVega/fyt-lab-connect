# Arquitectura del Proyecto — FyT Lab Connect

## Resumen
FyT Lab Connect es una aplicación front-end construida con React + TypeScript y empaquetada con Vite. El repositorio contiene rutas, componentes, estilos con Tailwind CSS y scripts para builds que incluyen soporte para SSG/SSR y prerender.

## Principios de diseño
- Single Responsibility: componentes con responsabilidad única cuando es posible.
- Rendimiento: carga diferida (lazy) de rutas y componentes pesados.
- Accesibilidad: estructura semántica (usar h1/h2, roles ARIA cuando aplique).
- Preparación para escala: separación clara entre `pages`, `components`, `data` y `utils`.

## Estructura principal de carpetas
- `src/` — código fuente
  - `pages/` — rutas y vistas de página
  - `components/` — componentes reutilizables UI
  - `assets/` — imágenes y recursos estáticos
  - `data/` — datasets locales, fixtures
  - `hooks/`, `lib/`, `utils/` — utilidades y hooks compartidos
  - `providers/` — contextos/Providers React
  - `seo/` — metadatos y rutas meta

## Decisiones técnicas relevantes
- Vite como bundler: tiempos de desarrollo rápidos y soporte moderno.
- TypeScript para seguridad de tipos.
- Tailwind CSS para utilidades de estilo y consistencia.
- `react-router-dom` v6 para ruteo; uso de `React.lazy` para lazy-loading.
- Scripts personalizados en `scripts/` para revisión de desarrollo, optimización de imágenes, prerender y precompress.

## Preparación para escalabilidad
- Componentes atómicos y separación por dominio (investigación, contacto, etc.).
- Lazy-loading en rutas para reducir bundle inicial.
- Soporte existente para SSG/SSR y prerender; recomendar integrar una pipeline de CI que genere artefactos pre-rendered y los valide.

## Recomendaciones inmediatas
1. Añadir `docs/DIAGRAMS` con diagramas de alto nivel (plantillas mermaid o SVG) — placeholder.
2. Añadir `ops/` con scripts de despliegue y configuración de CI (placeholder para Jenkins/GitHub Actions).
3. Normalizar `src/components/` y documentar patrones de diseño (Atomic Design o similar).

---
> Placeholders: validar con el owner los requisitos de despliegue (hosting, CDN, SSR vs SSG prioritario).
