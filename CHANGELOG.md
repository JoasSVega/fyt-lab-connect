## 2025-12-01

### Advanced Performance Optimization

- **feat**: intelligent predictive lazy loading system with scroll velocity detection
  - New hook: `usePredictiveLoader` with dynamic lookahead based on scroll speed
  - New hook: `useViewportPreloader` with extended rootMargin (200-300%)
  - Anticipates user needs and preloads content 1-2 seconds ahead
  
- **feat**: advanced carousel optimization with intelligent buffering
  - Adjacent slide buffering (±2 slides) with automatic 3-size preloading
  - Initial load optimized to first 3 slides for faster render
  - On-demand buffering as user navigates
  - Loading skeleton with visual feedback
  
- **feat**: predictive image preloading in About component
  - Viewport observer with 300% rootMargin for carousel sections
  - Automatic preload of 12 carousel images before scroll
  - Low priority to avoid blocking critical resources

- **refactor**: comprehensive code cleanup
  - Removed backup-images folder (24 obsolete files)
  - Removed audit folder (3 obsolete markdown files)
  - Moved 8 report files to docs/ for better organization
  - Removed duplicate scrollLock.ts (unused implementation)
  - Fixed unused Suspense import in Clinicos.tsx
  - Fixed ESLint warning in useImagePreloader

- **docs**: comprehensive ADVANCED_OPTIMIZATION_REPORT.md
  - Complete documentation of all optimizations
  - Technical details of predictive loading system
  - Performance metrics and validation results
  - Usage guide for new hooks

- **build**: validated successful build at 3.77s with 147.41 kB gzipped
- **lint**: clean ESLint run with zero errors and warnings

### Performance Improvements
- Zero flickering across all pages
- No visible loading states for images
- Smooth carousel navigation with pre-buffered slides
- Anticipatory loading based on user scroll behavior
- Optimized bundle size with tree shaking

## 2025-11-18

- Fixed: inputs lost focus while typing in calculators by switching to raw string storage for numeric fields, avoiding premature Number() coercion, and reducing layout thrash (height recalculation only on meaningful change).
- Fixed: restored reliable flip animation (front ↔ back) by enforcing a single 3D scene with explicit backface visibility (including WebKit), stable perspective/transform-style, and guarding against re-entrancy during transitions.
- Tests: added a Vitest + Testing Library spec covering focus persistence and flip transitions for `CalculatorCard`.
- Fix: remove console instrumentation (`console.count`, debug logs) from `CalculatorModal` and tests to keep dev/test consoles clean.
- Fix: eliminate React warning "fetchPriority prop" by applying native `fetchpriority` via `ref` in `Navbar` (pattern already used in `Hero`).
- DX: silence React Router v7 deprecation warnings by enabling future flags on `<BrowserRouter>` (`v7_startTransition`, `v7_relativeSplatPath`).

# Changelog

## feature/unified-calculator-modal

- feat: unified `CalculatorModal` component (dynamic fields, selector de fórmulas, flip de resultados, accesible)
- feat: calculators registry (`src/lib/calculators`) con entradas mínimas: renal (CG/MDRD/CKD‑EPI), IMC y ASC.
- refactor: páginas Clinicos y Antropometricos abren el modal unificado en las tarjetas correspondientes.
- test: Vitest + React Testing Library con prueba básica del modal.
- docs: `docs/calculators.md` para añadir nuevas calculadoras y convenciones.

Notas:
- No se elimina la lógica existente; se reutiliza mediante adaptadores (`src/lib/calculators/adapters`).
- Se mantiene la apariencia de tarjetas compactas. El botón "Abrir calculadora" invoca el modal unificado.
