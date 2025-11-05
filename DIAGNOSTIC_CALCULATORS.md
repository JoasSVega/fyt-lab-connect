# Calculators UI Diagnostic and Fixes

Date: 2025-11-05
Branch: fix/calculators-ui-20251105-1310

## Files inspected
- src/components/calculators/CalculatorModal.tsx
- src/components/calculators/CalculatorCard.jsx
- src/lib/calculators/index.ts (registry of fields/formulas)

## Problems detected
1) Info button only showed minimal tooltip; often blank or too narrow.
2) Cards/modals risk of clipping or awkward internal scroll.
3) Flip animation sometimes allowed front controls to remain interactive/visible.
4) "Volver" did not reset state/focus reliably.
5) Multiple formulas not fully rendered (no expression/equation list).
6) Inputs did not react to formula change (superset always shown).
7) On mobile, close (X) could be outside viewport; overlay didn’t always close.

## Changes executed
- CalculatorModal.tsx
  - Extended FormulaSpec with `fields`, `expressionText`, `expressionLatex` (backward compatible with existing `description`, `formulaLatex`).
  - Added per-formula dynamic fields: `effectiveFields` computed by selected formula.
  - Trim values and reset result/flip on formula change.
  - Implemented `handleReturn` to clear result, flip back, and focus first input.
  - Added `firstInputRef` passed to inputs; focus restored on return and formula change.
  - Flip robustness: front side gets `pointer-events-none` and `aria-hidden` when flipped.
  - Info panel converted to a proper modal: centered, `max-w-[600px]`, `w-[90vw]`, lists all formulas with index, latex/text and description; TODO placeholder when missing.
  - Header made sticky with high z-index for mobile; overlay click closes; Esc closes; touch-manipulation enabled on overlay/buttons.
  - Kept modal body free of forced scroll unless content > 90vh; cards remain natural height.
- Registry (index.ts) previously updated to include per-formula `fields` where appropriate (hepatic, dose, reconstitution).
- CalculatorCard.jsx already meets dynamic sizing and info modal requirements; no forced overflow introduced.

## Commands used
```
# create branch
git checkout -b fix/calculators-ui-20251105-1310

# build & test
npm run build
npm run test

# commit
git add src/components/calculators/CalculatorModal.tsx DIAGNOSTIC_CALCULATORS.md
git commit -m "fix(calculators): full formula info modal, dynamic fields, robust flip and return, mobile-friendly close"
```

## Manual validation steps
- Open a calculator with multiple formulas:
  - Info modal shows all formulas with index + expression (latex/text) + description.
- Switch formulas:
  - Inputs update to the formula’s field set; non-required fields are hidden.
- Calculate:
  - Flip to result; front controls non-interactive and hidden; only result + interpretation + Volver shown.
- Volver:
  - Returns to front, clears result, and focuses first input.
- Mobile tests:
  - Sticky header with X visible; tap overlay closes; Esc also closes.

## Notes
- If a formula lacks expressions, a visible TODO placeholder is shown to prompt completion.
- KaTeX can be integrated later for expressionLatex rendering if desired.
