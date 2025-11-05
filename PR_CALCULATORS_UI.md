# PR: Calculators UI unification and fixes

This PR unifies the calculators UX across the app and fixes long-standing UI/UX issues.

## Summary

- Clean flip in `CalculatorModal` with conditional front/back rendering using `AnimatePresence` (no overlapping layers).
- Dynamic per-formula fields with value trimming and focus restore on change.
- Full formulas info modal with KaTeX rendering via `src/components/ui/Latex.tsx` and textual fallback.
- Mobile-friendly close behavior: overlay click closes, Esc closes, sticky header with larger tap-target for the close button.
- Card growth: no internal scroll in cards; modal uses outer max-h with overflow only when needed.
- Test updated to cover calculate → back → volver → clear flow.

## Files changed (high-level)

- `src/components/calculators/CalculatorModal.tsx`
- `src/components/ui/Latex.tsx`
- `src/components/calculators/__tests__/CalculatorModal.test.tsx`
- `DIAGNOSTIC_CALCULATORS.md`

## How to QA

1) Setup
   - Node 18 via nvm
   - `npm ci`
   - `npm run dev`

2) Navigate
   - `/herramientas/clinicos` y `/herramientas/antropometricos`

3) Validate
   - Tarjetas crecen según contenido; sin scroll interno inesperado.
   - Cambiar de fórmula actualiza campos, labels, placeholders y opciones; los no listados desaparecen.
   - Calcular → se muestra reverso (resultado/interpretación) sin “filtración” del frente.
   - Volver → foco al primer input y UI limpia.
   - Botón Info → lista completa de fórmulas con LaTeX (cuando exista), más descripción.
   - Móvil → la X siempre visible; tap en overlay cierra; Esc cierra.

4) Automated
   - `npm test` debe pasar.

## Notes / follow-ups

- Se puede añadir `expressionLatex` a más fórmulas en `src/lib/calculators/index.ts` para enriquecer el panel.
- Si en el futuro alguna tarjeta usa `CalculatorCard.jsx`, verificar que el contenedor no fuerce alturas fijas.
