import { CalculationResult } from "@/components/calculators/CalculatorModal";
import { cockcroftGault, mdrd4, ckdEpi2009, ckdEpi2021 } from "@/utils/renal";

type Values = Record<string, any>;

export function computeCockcroft(values: Values): CalculationResult {
  const age = Number(values.age);
  const weight = Number(values.weight);
  const scr = Number(values.scr);
  const sex = (values.sex || "male") as "male" | "female";
  const unit = (values.unit || "mgdl") as "mgdl" | "umol";
  const v = cockcroftGault(age, weight, scr, sex, unit);
  return { value: Number(v.toFixed(2)), unit: "ml/min", interpretation: interpretGFR(v), severity: severityFromGFR(v) };
}

export function computeMDRD4(values: Values): CalculationResult {
  const age = Number(values.age);
  const scr = Number(values.scr);
  const sex = (values.sex || "male") as "male" | "female";
  const unit = (values.unit || "mgdl") as "mgdl" | "umol";
  const black = !!values.black;
  const v = mdrd4(age, scr, sex, black, unit);
  return { value: Number(v.toFixed(2)), unit: "ml/min/1.73m²", interpretation: interpretGFR(v), severity: severityFromGFR(v) };
}

export function computeCKDEPI2009(values: Values): CalculationResult {
  const age = Number(values.age);
  const scr = Number(values.scr);
  const sex = (values.sex || "male") as "male" | "female";
  const unit = (values.unit || "mgdl") as "mgdl" | "umol";
  const black = !!values.black;
  const v = ckdEpi2009(age, scr, sex, black, unit);
  return { value: Number(v.toFixed(2)), unit: "ml/min/1.73m²", interpretation: interpretGFR(v), severity: severityFromGFR(v) };
}

export function computeCKDEPI2021(values: Values): CalculationResult {
  const age = Number(values.age);
  const scr = Number(values.scr);
  const sex = (values.sex || "male") as "male" | "female";
  const unit = (values.unit || "mgdl") as "mgdl" | "umol";
  const v = ckdEpi2021(age, scr, sex, unit);
  return { value: Number(v.toFixed(2)), unit: "ml/min/1.73m²", interpretation: interpretGFR(v), severity: severityFromGFR(v) };
}

function interpretGFR(gfr: number): string {
  if (!isFinite(gfr)) return "—";
  if (gfr >= 90) return "Normal (≥90)";
  if (gfr >= 60) return "Leve (60–89)";
  if (gfr >= 30) return "Moderada (30–59)";
  if (gfr >= 15) return "Severa (15–29)";
  return "Falla renal (<15)";
}

function severityFromGFR(gfr: number): CalculationResult["severity"] {
  if (!isFinite(gfr)) return undefined;
  if (gfr >= 60) return "green";
  if (gfr >= 30) return "yellow";
  return "red";
}
