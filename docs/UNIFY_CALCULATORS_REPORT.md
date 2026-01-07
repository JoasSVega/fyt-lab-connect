# Unify Calculators Report

Date: 2025-10-31
Branch: feature/unify-calculator-layout

## Summary
Applied a single structural layout across all calculators using `CalculatorPanel`. Preserved each calculator's color identity while unifying DOM order and spacing: inputs grid → (optional) formula selector → action buttons → inline result block.

## Files updated

- src/components/tools/common/CalculatorPanel.tsx
  - Layout wrapper used by all calculators. No color coupling; accepts `color` and `primaryButtonClass` from caller. Provides: header, inputs grid, optional bottom selector, action buttons, result area, and error message.

- Anthropometric selector calculators
  - src/components/calculators/antropometricas/ASCSelectorCalculator.tsx (emerald)
  - src/components/calculators/antropometricas/IdealWeightSelectorCalculator.tsx (teal)
  - src/components/calculators/antropometricas/CEBSelectorCalculator.tsx (orange)
  - src/components/calculators/antropometricas/ACTSelectorCalculator.tsx (green)
  - src/components/calculators/antropometricas/MMCCalculator.tsx (cyan)
  - Changes: removed extra label above formula dropdown, used `CalculatorPanel` structure, preserved per-calculator colors, normalized DOM order.

- Anthropometric single-formula calculators
  - src/components/tools/antropometricos/IMCCalculator.tsx (sky)
  - src/components/tools/antropometricos/BodyFatCalculator.tsx (violet)
  - src/components/tools/antropometricos/LeanMassCalculator.tsx (cyan)
  - src/components/tools/antropometricos/SuperficieCorporal.tsx (emerald)
  - Changes: aligned to `CalculatorPanel` structure; restored original colors.

- Clinical and legacy anthropometric calculators
  - src/components/tools/clinicos/TFGCalculator.tsx (blue): migrated from `ModalCalculator` flip to `CalculatorPanel` with inline result.
  - src/components/tools/antropometricos/BMRCalculator.tsx (orange): migrated to `CalculatorPanel`.
  - src/components/tools/antropometricos/IdealWeightCalculator.tsx (teal): migrated to `CalculatorPanel`.

## Problems detected and fixes

- Inconsistent color forcing from a previous pass (changed to orange). Reverted to original per-calculator colors and select focus rings.
- Duplicated/legacy modal flip markup caused layout divergence. Replaced with `CalculatorPanel` inline result area; logic preserved.
- Redundant imports (`Button`) and wrapper nodes were removed to prevent layout drift. Old code kept inline as comments was not necessary; instead, the Git history maintains the previous state.

## Structure enforced

- Header (title + description)
- Inputs grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Optional formula selector at bottom extension under inputs
- Actions row: `Calcular` (primary) + `Limpiar` (outline)
- Inline result block below actions

## Notes

- No mathematical formulas were modified.
- Colors remain calculator-specific via `color` prop and local classNames.

## Follow-ups

- If additional calculators exist outside current folders, apply the same pattern.
- Consider extracting a shared Select component to reduce duplicated classNames.
