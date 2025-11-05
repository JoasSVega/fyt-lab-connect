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
