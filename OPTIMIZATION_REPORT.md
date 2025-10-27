# OPTIMIZATION_REPORT

Fecha: 2025-10-27

Resumen breve
------------
Se aplicaron optimizaciones no intrusivas enfocadas en reducir el bundle inicial, limpiar logs de depuración y preparar el proyecto para mejoras adicionales de rendimiento.

Cambios realizados
------------------
1. Limpieza de logs de depuración
   - Archivo: `src/components/Team.tsx`
   - Acción: Eliminado `console.log` que imprimía miembros sin foto. Se añadió comentario explicativo.
   - Justificación: Reduce ruido en la consola y evita potenciales impactos menores en rendimiento.

2. Lazy-load de componentes y librerías no críticas
   - Archivo: `src/pages/Index.tsx`
     - `FloatingContact` cambiado a `React.lazy` + `Suspense`.
     - Justificación: Evita incluir el código de animaciones en el bundle inicial.

   - Archivo: `src/App.tsx`
     - `framer-motion` cargado dinámicamente con `import('framer-motion')`.
     - Se reimplementó `AnimatedRoutes` para renderizar sin animaciones mientras la librería carga.
     - Justificación: `framer-motion` es grande y no crítico para el render inicial; su carga diferida mejora TTI.

   - Archivo: `src/components/ui/calendar.tsx`
     - `react-day-picker` cargado perezosamente con `React.lazy`.
     - Justificación: El calendario se usa en páginas concretas; cargarlo bajo demanda reduce el peso inicial.

3. Cambios visuales menores
   - Archivo: `src/pages/Index.tsx`
     - Los títulos de las tarjetas principales ahora usan `font-bold`.
     - Justificación: Ajuste solicitado por el equipo de diseño.

4. Otros
   - Se creó este `OPTIMIZATION_REPORT.md` con el detalle de cambios y justificaciones.

5. Code-splitting de vendors con manualChunks (Vite/Rollup)
   - Archivo: `vite.config.ts`
   - Acción: Se añadió `build.rollupOptions.output.manualChunks` para extraer vendors pesados en chunks separados: `vendor-react`, `vendor-framer-motion`, `vendor-embla`, `vendor-icons` y un `vendor` general.
   - Justificación: Reduce el tamaño del chunk principal y mejora el cacheo entre páginas.

6. Lazy-load consistente de FloatingContact en todas las páginas
   - Archivos: `src/pages/Index.tsx`, `src/pages/Noticias.tsx`, `src/pages/Equipo.tsx`, `src/pages/SobreNosotros.tsx`, y limpieza de import no usado en `src/pages/Contactos.tsx` y `src/pages/Herramientas.tsx`.
   - Acción: Reemplazo de import estático por `React.lazy` + `<Suspense fallback={null}>` (donde aplica). Se eliminaron imports no usados.
   - Resultado del build (referencia rápida):
       - Chunk separado emitido: `dist/assets/FloatingContact-*.js` ≈ 2.6 kB (gzip ≈ 1.2 kB).
       - Chunks de vendors: `vendor-react` ≈ 188 kB (gzip ≈ 60.8 kB), `vendor-framer-motion` ≈ 156 kB (gzip ≈ 52.7 kB), `vendor-embla` ≈ 19.8 kB (gzip ≈ 8.1 kB), `vendor-icons` ≈ 11.7 kB (gzip ≈ 2.9 kB).
       - Chunk de aplicación principal `index-*.js` ≈ 132 kB (gzip ≈ 32–33 kB).
   - Justificación: Evita la advertencia de mezcla de import estático/dinámico y reduce el trabajo del bundle inicial.

Siguientes pasos recomendados (priorizados)
-------------------------------------------
1. Asset optimizations
   - Generar y referencia `srcset` y tamaños responsivos para imágenes grandes (hero, banners).
   - Asegurar que todas las imágenes tengan `loading="lazy"` cuando no sean críticas.
   - Comprimir y servir WebP cuando sea posible (script `scripts/convert-images.js` ya incluido).

      Acciones realizadas (imagen):

      - Ejecuté el script `scripts/convert-images.js` localmente para convertir PNG/JPG/JPEG a WebP.
      - Resultado: se generaron 27 imágenes WebP en `public/images/` (incluye `Hero-Index.webp`, `Objetivo.webp`, `logo-fyt.webp` y varias imágenes de `Carrusel/` y `equipo/`).
      - Componentes actualizados: `src/components/AboutSobreNosotros.tsx` ahora usa un elemento `<picture>` que prioriza `/images/Objetivo.webp` con fallback a `Objetivo.jpeg`. También se añadió `loading="lazy"`, `decoding="async"` y `fetchPriority="low"`.
      - Nota: los archivos WebP se crearon localmente en tu workspace. Decide si quieres que los incluya en el repositorio (commit) o que los generes en tu entorno de despliegue/CI.

2. Lazy-load adicional
   - Cargar `recharts` solo cuando se usen gráficos (actualmente `src/components/ui/chart.tsx` incluye `recharts` en el bundle; considerar carga dinámica si los gráficos no están en la página principal).
   - Revisar `framer-motion` en componentes secundarios que todavía lo importen estáticamente.

3. Dependencias y package.json
   - Auditar `package.json` para detectar dependencias no usadas (por ejemplo `vaul`, `lovable-tagger` si no se usan en producción) y moverlas a `devDependencies` o removerlas.

    Auditoría rápida de dependencias (resultados):

    - Usadas claramente en el código:
       - `recharts` — usado en `src/components/ui/chart.tsx` (ahora cargado dinámicamente).
       - `react-day-picker` — usado en `src/components/ui/calendar.tsx` (ahora lazy-loaded).
       - `framer-motion` — usado en varias páginas; se difirió su carga en `src/App.tsx`.
       - `lucide-react` — icon set ampliamente utilizado en componentes.
       - `embla-carousel-react` — usado por los carousels.
       - `@tanstack/react-query` — usado para manejo de datos.
       - `sonner` y `next-themes` — usados por el toaster (`src/components/ui/sonner.tsx`).
       - `vaul` — usado por `src/components/ui/drawer.tsx`.
       - `input-otp` — usado por `src/components/ui/input-otp.tsx`.

    - Posibles candidatas para revisión (usar `git grep <pkg>` y pruebas antes de remover):
       - `lovable-tagger` — se utiliza en `vite.config.ts` como plugin de desarrollo; mover a `devDependencies` es apropiado si no se usa en producción.
       - `vaul` / `input-otp` — revisar si estas utilidades se usan en rutas de producción; si son solo para demos, considerar mover o eliminar.

    - Recomendación: no remover dependencias automáticamente. Crear una rama con cambios propuestos (mover paquetes a devDependencies o remover), ejecutar `npm ci` y `npm run build` en CI, y validar visualmente.

4. CI / Build
   - Workflow de GitHub Actions añadido: `.github/workflows/ci.yml` ejecuta `npm ci`, `npm run lint`, `npm run build` y sube `dist` como artifact.
   - `preview` disponible vía `npm run preview`. Se añadió análisis con visualizer bajo variable de entorno `ANALYZE` desde `vite.config.ts`.

5. Medición
   - Ejecutar auditoría con Lighthouse / WebPageTest antes y después de los cambios para cuantificar mejoras (TTI, LCP, CLS, bundle size).

Cómo revertir cambios
---------------------
- Cada cambio fue realizado en archivos específicos. Revertir un archivo a la versión anterior se puede hacer con `git checkout -- <file>` si no se ha hecho commit, o con `git revert <commit>` después del commit.

Notas finales
-------------
- No se han modificado rutas ni funcionalidades críticas.
- Las optimizaciones buscadas son seguras y reversibles. Se recomienda revisar el branch `opt/perf-cleanup` antes de mergear a `main`.

Contacto
--------
Para más detalles o para aplicar las siguientes etapas (auditoría de imágenes, CI, lazy-load de `recharts`, etc.), responde en el hilo y procederé con el siguiente bloque de cambios.
