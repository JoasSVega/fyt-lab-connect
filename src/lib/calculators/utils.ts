import { FieldSpec, FormulaSpec } from "@/components/calculators/CalculatorModal";

/**
 * Return fields specific to selected formula if provided, otherwise base fields.
 * Preserves provided order.
 */
export function getEffectiveFields(base: ReadonlyArray<FieldSpec>, formulas?: ReadonlyArray<FormulaSpec>, selectedId?: string): ReadonlyArray<FieldSpec> {
  if (!formulas || !selectedId) return base;
  const f = formulas.find((x) => x.id === selectedId);
  return f?.fields && f.fields.length > 0 ? f.fields : base;
}

/**
 * Fully reinitialize values on formula switch: clear all inputs.
 * (Placeholders are driven from FieldSpec and unaffected.)
 */
export function resetValuesForFields(_prev: Record<string, unknown>, _fields: ReadonlyArray<FieldSpec>): Record<string, unknown> {
  // Requirement: variables should be fully reinitialized on formula change
  return {};
}

/**
 * Ensure there is a LaTeX string for a formula.
 * Priority: expressionLatex > formulaLatex > expressionText > description > null
 * For textual fallbacks we wrap safely using \text{...}.
 */
export function ensureLatexForFormula(f: FormulaSpec): string | null {
  if (f.expressionLatex) return f.expressionLatex;
  if (f.formulaLatex) return f.formulaLatex;
  const alt = f.expressionText || f.description;
  if (!alt) return null;
  return textToLatex(alt);
}

/**
 * Wrap arbitrary text as safe LaTeX using \\text{...} with simple escaping.
 */
export function textToLatex(text: string): string {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/([{}_#%&$])/g, "\\$1")
    .replace(/\n/g, " ");
  return String.raw`\text{${escaped}}`;
}
