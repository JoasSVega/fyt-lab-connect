import { CalculationResult } from "@/components/calculators/CalculatorModal";

type Values = Record<string, unknown>;

// Conversions for bilirubin if needed
const mgdlToUmolBili = (x: number) => x * 17.1;
const umolToMgdlBili = (x: number) => x / 17.1;

// Child-Pugh helpers
function childPointsBilirubin(mgdl: number): 1 | 2 | 3 {
  if (mgdl < 2) return 1;
  if (mgdl <= 3) return 2;
  return 3;
}
function childPointsAlbumin(gdl: number): 1 | 2 | 3 {
  if (gdl > 3.5) return 1;
  if (gdl >= 2.8) return 2;
  return 3;
}
function childPointsINR(inr: number): 1 | 2 | 3 {
  if (inr < 1.7) return 1;
  if (inr <= 2.3) return 2;
  return 3;
}
function childPointsAscites(a: string): 1 | 2 | 3 {
  if (a === "none") return 1;
  if (a === "mild") return 2;
  return 3;
}
function childPointsEnceph(a: string): 1 | 2 | 3 {
  if (a === "none") return 1;
  if (a === "mild") return 2;
  return 3;
}

function childClass(total: number): { cls: "A" | "B" | "C"; severity: CalculationResult["severity"] } {
  if (total <= 6) return { cls: "A", severity: "green" };
  if (total <= 9) return { cls: "B", severity: "yellow" };
  return { cls: "C", severity: "red" };
}

export function computeChildPugh(values: Values): CalculationResult {
  const bili = Number(values.bili);
  const biliUnit = (values.biliUnit || "mgdl") as "mgdl" | "umol";
  const albumin = Number(values.albumin);
  const inr = Number(values.inr);
  const ascites = String(values.ascites || "none");
  const enceph = String(values.enceph || "none");
  const bMgdl = biliUnit === "umol" ? umolToMgdlBili(bili) : bili;
  const total =
    childPointsBilirubin(bMgdl) +
    childPointsAlbumin(albumin) +
    childPointsINR(inr) +
    childPointsAscites(ascites) +
    childPointsEnceph(enceph);
  const c = childClass(total);
  return { value: total, interpretation: `Clase ${c.cls}`, severity: c.severity };
}

// MELD and MELD-Na
function calcMELD(bili: number, inr: number, creat: number): number {
  const b = Math.max(bili, 1);
  const i = Math.max(inr, 1);
  const c = Math.min(Math.max(creat, 1), 4);
  return 10 * (0.957 * Math.log(c) + 0.378 * Math.log(b) + 1.12 * Math.log(i)) + 6.43;
}
function calcMELDNa(meld: number, sodium: number): number {
  const Na = Math.min(Math.max(sodium, 125), 137);
  return meld + 1.32 * (137 - Na) - 0.033 * meld * (137 - Na);
}
function meldMortalityText(meldScore: number): string {
  if (meldScore < 10) return "Mortalidad 3 meses ~1–2%";
  if (meldScore < 20) return "Mortalidad 3 meses ~6–20%";
  if (meldScore < 30) return "Mortalidad 3 meses ~19–76%";
  return "Mortalidad 3 meses alta (>76%)";
}

export function computeMELD(values: Values): CalculationResult {
  const bili = Number(values.bili);
  const inr = Number(values.inr);
  const creat = Number(values.creat);
  const sodium = values.sodium != null && values.sodium !== "" ? Number(values.sodium) : undefined;
  const meld = calcMELD(bili, inr, creat);
  const score = sodium ? calcMELDNa(meld, sodium) : meld;
  const text = `${score.toFixed(1)} puntos · ${meldMortalityText(score)}`;
  const severity: CalculationResult["severity"] = score < 10 ? "green" : score < 20 ? "yellow" : "red";
  return { value: Number(score.toFixed(1)), interpretation: text, severity };
}

// APRI
export function computeAPRI(values: Values): CalculationResult {
  const ast = Number(values.ast);
  const astULN = Number(values.astULN);
  const platelets = Number(values.platelets);
  if (!ast || !astULN || !platelets) return { value: NaN, interpretation: "—" };
  const val = (ast / astULN) / platelets * 100;
  if (val < 0.5) return { value: Number(val.toFixed(2)), interpretation: "Sin fibrosis significativa", severity: "green" };
  if (val < 1.0) return { value: Number(val.toFixed(2)), interpretation: "Indeterminado / leve", severity: "yellow" };
  if (val < 2.0) return { value: Number(val.toFixed(2)), interpretation: "Fibrosis significativa", severity: "yellow" };
  return { value: Number(val.toFixed(2)), interpretation: "Cirrosis probable", severity: "red" };
}

// FIB-4
export function computeFIB4(values: Values): CalculationResult {
  const age = Number(values.age);
  const ast = Number(values.ast);
  const alt = Number(values.alt);
  const platelets = Number(values.platelets);
  if (!age || !ast || !alt || !platelets) return { value: NaN, interpretation: "—" };
  const val = (age * ast) / (platelets * Math.sqrt(alt));
  if (val < 1.3) return { value: Number(val.toFixed(2)), interpretation: "Bajo riesgo de fibrosis avanzada", severity: "green" };
  if (val <= 2.67) return { value: Number(val.toFixed(2)), interpretation: "Riesgo intermedio", severity: "yellow" };
  return { value: Number(val.toFixed(2)), interpretation: "Alto riesgo de fibrosis avanzada", severity: "red" };
}
