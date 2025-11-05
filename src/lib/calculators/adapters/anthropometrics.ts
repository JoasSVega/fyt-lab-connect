import { CalculationResult } from "@/components/calculators/CalculatorModal";
import { bmi, bsaDuBois } from "@/components/calculators/antropometricas/formulas";

type Values = Record<string, any>;

export function computeBMI(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const v = bmi(weight, height);
  return { value: Number(v.toFixed(2)), unit: "kg/m²", interpretation: interpretBMI(v), severity: bmiSeverity(v) };
}

export function computeBSA(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  // Usamos DuBois para consistencia; Mosteller está en otras partes pero no centralizada aquí
  const v = bsaDuBois(weight, height);
  return { value: Number(v.toFixed(3)), unit: "m²" };
}

function interpretBMI(v: number): string {
  if (v < 18.5) return "Bajo peso";
  if (v < 25) return "Normal";
  if (v < 30) return "Sobrepeso";
  return "Obesidad";
}

function bmiSeverity(v: number): CalculationResult["severity"] {
  if (v < 25 && v >= 18.5) return "green";
  if (v < 30) return "yellow";
  return "red";
}
