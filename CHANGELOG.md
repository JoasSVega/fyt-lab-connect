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
