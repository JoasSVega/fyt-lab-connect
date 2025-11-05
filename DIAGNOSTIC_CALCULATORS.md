# Calculators UI Diagnostic and Fixes

Date: 2025-11-05
Branches:
- fix/calculators-ui-20251105-1310 (prev fixes)
- fix/calculators-ui-full-20251105-134424 (current full pass)

## Files inspected
- src/components/calculators/CalculatorModal.tsx
- src/components/calculators/CalculatorCard.jsx
- src/lib/calculators/index.ts (registry of fields/formulas)
 - src/components/panels/CalculatorCard.tsx (alt panel-style card)

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
  - Flip refactor: conditional rendering of front/back using AnimatePresence; no overlapping layers; simple rotateY animation on enter/exit; prevents front bleed-through.
  - Enlarged header buttons (X/Info) for mobile tap targets; ensured overlay click to close.
  - Info panel converted to a proper modal: centered, `max-w-[600px]`, `w-[90vw]`, lists all formulas with index, latex/text and description; TODO placeholder when missing.
  - Header made sticky with high z-index for mobile; overlay click closes; Esc closes; touch-manipulation enabled on overlay/buttons.
  - Kept modal body free of forced scroll unless content > 90vh; cards remain natural height.
- Registry (index.ts) previously updated to include per-formula `fields` where appropriate (hepatic, dose, reconstitution). Verified presence of `expressionText`/`expressionLatex` in FormulaSpec.
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
- KaTeX integrated via `src/components/ui/Latex.tsx` and used in formula info modal.
