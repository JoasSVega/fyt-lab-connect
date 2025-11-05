import { CalculationResult } from "@/components/calculators/CalculatorModal";
import {
  bmi,
  bsaDuBois,
  cebMifflin,
  cebHarrisBenedict,
  idealDevine,
  idealRobinson,
  idealMiller,
  actWatson,
  actChumlea,
  mmcJames,
  mmcHume,
  leanMassFromBf,
  Sex,
} from "@/components/calculators/antropometricas/formulas";

type Values = Record<string, unknown>;

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

// Body Fat (Deurenberg)
export function computeBodyFat(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const age = Number(values.age);
  const sex = (values.sex || "male") as Sex;
  const hM = height / 100;
  const bmiVal = weight / (hM * hM);
  const sexNum = sex === "male" ? 1 : 0;
  const v = 1.2 * bmiVal + 0.23 * age - 10.8 * sexNum - 5.4;
  // Interpretación básica por sexo
  const interp = ((): { text: string; severity?: CalculationResult["severity"] } => {
    const bf = v;
    if (sex === "male") {
      if (bf < 6) return { text: "Muy bajo (riesgo)", severity: "red" };
      if (bf < 14) return { text: "Atleta", severity: "green" };
      if (bf < 18) return { text: "Fitness", severity: "green" };
      if (bf < 25) return { text: "Promedio", severity: "yellow" };
      return { text: "Obesidad", severity: "red" };
    }
    if (bf < 14) return { text: "Muy bajo (riesgo)", severity: "red" };
    if (bf < 21) return { text: "Atleta", severity: "green" };
    if (bf < 25) return { text: "Fitness", severity: "green" };
    if (bf < 32) return { text: "Promedio", severity: "yellow" };
    return { text: "Obesidad", severity: "red" };
  })();
  return { value: Number(v.toFixed(1)), unit: "%", interpretation: interp.text, severity: interp.severity };
}

// BMR / CEB
export function computeBMRMifflin(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const age = Number(values.age);
  const sex = (values.sex || "male") as Sex;
  const v = cebMifflin(sex, weight, height, age);
  return { value: Math.round(v), unit: "kcal/día" };
}
export function computeBMRHarris(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const age = Number(values.age);
  const sex = (values.sex || "male") as Sex;
  const v = cebHarrisBenedict(sex, weight, height, age);
  return { value: Math.round(v), unit: "kcal/día" };
}

// Peso ideal
export function computeIdealDevine(values: Values): CalculationResult {
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = idealDevine(sex, height);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}
export function computeIdealRobinson(values: Values): CalculationResult {
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = idealRobinson(sex, height);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}
export function computeIdealMiller(values: Values): CalculationResult {
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = idealMiller(sex, height);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}

// ACT
export function computeACTWatson(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const age = Number(values.age);
  const sex = (values.sex || "male") as Sex;
  const v = actWatson(sex, weight, height, age);
  return { value: Number(v.toFixed(2)), unit: "L" };
}
export function computeACTChumlea(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = actChumlea(sex, weight, height);
  return { value: Number(v.toFixed(2)), unit: "L" };
}

// MMC
export function computeMMCJames(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = mmcJames(sex, weight, height);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}
export function computeMMCHume(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const height = Number(values.height);
  const sex = (values.sex || "male") as Sex;
  const v = mmcHume(sex, weight, height);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}
export function computeLeanMassFromBF(values: Values): CalculationResult {
  const weight = Number(values.weight);
  const bf = Number(values.bf);
  const v = leanMassFromBf(weight, bf);
  return { value: Number(v.toFixed(2)), unit: "kg" };
}
