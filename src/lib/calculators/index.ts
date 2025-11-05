import { FieldSpec, FormulaSpec } from "@/components/calculators/CalculatorModal";
import {
  computeBMI,
  computeBSA,
  computeBodyFat,
  computeBMRMifflin,
  computeBMRHarris,
  computeIdealDevine,
  computeIdealRobinson,
  computeIdealMiller,
  computeACTWatson,
  computeACTChumlea,
  computeMMCJames,
  computeMMCHume,
  computeLeanMassFromBF,
} from "./adapters/anthropometrics";
import { computeChildPugh, computeMELD, computeAPRI, computeFIB4 } from "./adapters/hepatic";
import { computeCockcroft, computeMDRD4, computeCKDEPI2009, computeCKDEPI2021 } from "./adapters/renal";
import { computeDoseByWeight, computeReconstitution } from "./adapters/pharma";
import antibiotics from "@/data/antibiotics.json";

export type CalculatorMeta = {
  id: string;
  title: string;
  subtitle?: string;
  category: "clinico" | "fisiologico";
  color: string;
  fields: FieldSpec[];
  formulas?: FormulaSpec[];
};

export const CalculatorsRegistry = {
  renal: {
    id: "renal",
    title: "Función renal",
    subtitle: "Cockcroft–Gault / MDRD / CKD‑EPI",
    category: "clinico",
    color: "#3B82F6", // brand blue
    fields: [
      { name: "age", label: "Edad", type: "number", validation: { required: true, min: 18, max: 120 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "scr", label: "Creatinina sérica", type: "number", unit: "mg/dL | µmol/L", validation: { required: true, min: 0.1 } },
      { name: "unit", label: "Unidad de creatinina", type: "select", options: [ { value: "mgdl", label: "mg/dL" }, { value: "umol", label: "µmol/L" } ], placeholder: "Unidad", validation: { required: true } },
      { name: "black", label: "¿Afrodescendiente?", type: "toggle", placeholder: "¿Afrodescendiente?" },
    ] as FieldSpec[],
    formulas: [
      { id: "cg", label: "Cockcroft–Gault", description: "CrCl = ((140 − edad) × peso × (0.85 si mujer)) / (72 × SCr[mg/dL])", compute: computeCockcroft },
      { id: "mdrd", label: "MDRD (4v)", description: "TFG = 175 × (SCr)^−1.154 × (edad)^−0.203 × (0.742 si mujer) × (1.212 si raza negra)", compute: computeMDRD4 },
      { id: "ckd2009", label: "CKD‑EPI 2009", compute: computeCKDEPI2009 },
      { id: "ckd2021", label: "CKD‑EPI 2021", compute: computeCKDEPI2021 },
    ] as FormulaSpec[],
  },
  bmi: {
    id: "bmi",
    title: "IMC",
    subtitle: "Índice de masa corporal (kg/m²)",
    category: "fisiologico",
    color: "#0ea5e9", // sky
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
    ],
    formulas: [ { id: "bmi", label: "IMC", description: "IMC = peso / (talla[m])²", compute: computeBMI } ],
  },
  bsa: {
    id: "bsa",
    title: "Superficie corporal",
    subtitle: "DuBois & DuBois (m²)",
    category: "fisiologico",
    color: "#10b981", // emerald
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
    ],
    formulas: [ { id: "dubois", label: "DuBois", description: "BSA = 0.007184 × peso^0.425 × talla^0.725", compute: computeBSA } ],
  },
  bodyFat: {
    id: "bodyFat",
    title: "% Grasa corporal",
    subtitle: "Deurenberg (1991)",
    category: "fisiologico",
    color: "#a855f7", // violet
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
      { name: "age", label: "Edad", type: "number", unit: "años", validation: { required: true, min: 5, max: 120 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
    ],
    formulas: [ { id: "deurenberg", label: "Deurenberg", compute: computeBodyFat } ],
  },
  bmr: {
    id: "bmr",
    title: "CEB",
    subtitle: "Consumo energético basal",
    category: "fisiologico",
    color: "#f97316", // orange
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
      { name: "age", label: "Edad", type: "number", unit: "años", validation: { required: true, min: 5, max: 120 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
    ],
    formulas: [
      { id: "mifflin", label: "Mifflin–St Jeor", compute: computeBMRMifflin },
      { id: "harris", label: "Harris–Benedict", compute: computeBMRHarris },
    ],
  },
  idealWeight: {
    id: "idealWeight",
    title: "Peso ideal",
    subtitle: "Devine / Robinson / Miller",
    category: "fisiologico",
    color: "#0d9488", // teal
    fields: [
      { name: "height", label: "Estatura", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
    ],
    formulas: [
      { id: "devine", label: "Devine (1974)", compute: computeIdealDevine },
      { id: "robinson", label: "Robinson (1983)", compute: computeIdealRobinson },
      { id: "miller", label: "Miller (1983)", compute: computeIdealMiller },
    ],
  },
  act: {
    id: "act",
    title: "Agua corporal total (ACT)",
    subtitle: "Watson / Chumlea",
    category: "fisiologico",
    color: "#16a34a", // green
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { required: true, min: 100, max: 250 } },
      { name: "age", label: "Edad", type: "number", unit: "años", validation: { required: true, min: 5, max: 120 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
    ],
    formulas: [
      { id: "watson", label: "Watson", compute: computeACTWatson },
      { id: "chumlea", label: "Chumlea", compute: computeACTChumlea },
    ],
  },
  mmc: {
    id: "mmc",
    title: "Masa magra corporal",
    subtitle: "James / Hume / % grasa",
    category: "fisiologico",
    color: "#0891b2", // cyan
    fields: [
      { name: "weight", label: "Peso", type: "number", unit: "kg", validation: { required: true, min: 20, max: 300 } },
      { name: "height", label: "Talla", type: "number", unit: "cm", validation: { min: 100, max: 250 } },
      { name: "bf", label: "% Grasa corporal", type: "number", unit: "%", validation: { min: 0, max: 100 } },
      { name: "sex", label: "Sexo", type: "select", options: [ { value: "male", label: "Masculino" }, { value: "female", label: "Femenino" } ], placeholder: "Seleccione…", validation: { required: true } },
    ],
    formulas: [
      { id: "james", label: "James", compute: computeMMCJames },
      { id: "hume", label: "Hume", compute: computeMMCHume },
      { id: "lean", label: "Lean (% grasa)", compute: computeLeanMassFromBF },
    ],
  },
  hepatic: {
    id: "hepatic",
    title: "Función hepática",
    subtitle: "Child‑Pugh / MELD / APRI / FIB‑4",
    category: "clinico",
    color: "#F59E0B", // amber
    // Usamos un superset de campos para todas las fórmulas
    fields: [
      { name: "bili", label: "Bilirrubina total", type: "number", unit: "mg/dL o µmol/L" },
      { name: "biliUnit", label: "Unidad de bilirrubina", type: "select", options: [ { value: "mgdl", label: "mg/dL" }, { value: "umol", label: "µmol/L" } ], placeholder: "Unidad" },
      { name: "albumin", label: "Albúmina", type: "number", unit: "g/dL" },
      { name: "inr", label: "INR", type: "number" },
      { name: "ascites", label: "Ascitis", type: "select", options: [ { value: "none", label: "Ninguna" }, { value: "mild", label: "Leve" }, { value: "moderate", label: "Moderada" }, { value: "severe", label: "Severa" } ] },
      { name: "enceph", label: "Encefalopatía", type: "select", options: [ { value: "none", label: "Ninguna" }, { value: "mild", label: "Leve (I–II)" }, { value: "moderate", label: "Moderada" }, { value: "severe", label: "Severa (III–IV)" } ] },
      { name: "creat", label: "Creatinina", type: "number", unit: "mg/dL" },
      { name: "sodium", label: "Sodio sérico (opcional)", type: "number", unit: "mmol/L" },
      { name: "ast", label: "AST", type: "number", unit: "UI/L" },
      { name: "alt", label: "ALT", type: "number", unit: "UI/L" },
      { name: "astULN", label: "LSN AST", type: "number", unit: "UI/L" },
      { name: "platelets", label: "Plaquetas", type: "number", unit: "10^9/L" },
      { name: "age", label: "Edad", type: "number", unit: "años" },
    ],
    formulas: [
      { id: "child", label: "Child‑Pugh", compute: computeChildPugh },
      { id: "meld", label: "MELD / MELD‑Na", compute: computeMELD },
      { id: "apri", label: "APRI", compute: computeAPRI },
      { id: "fib4", label: "FIB‑4", compute: computeFIB4 },
    ],
  },
  dose: {
    id: "dose",
    title: "Dosis por peso y SC",
    subtitle: "mg/kg · µg/kg · mg/m² · µg/m²",
    category: "clinico",
    color: "#0EA5E9",
    fields: [
      { name: "weight", label: "Peso corporal", type: "number", unit: "kg", validation: { min: 1 } },
      { name: "bsa", label: "Superficie corporal", type: "number", unit: "m²", validation: { min: 0 } },
      { name: "dosePer", label: "Dosis recomendada", type: "number" },
      { name: "unit", label: "Unidad", type: "select", options: [
        { value: "mg/kg", label: "mg/kg" },
        { value: "µg/kg", label: "µg/kg" },
        { value: "mg/m²", label: "mg/m²" },
        { value: "µg/m²", label: "µg/m²" },
      ] },
      { name: "frequency", label: "Frecuencia / intervalo (opcional)", type: "text" },
      { name: "drug", label: "Nombre del fármaco (opcional)", type: "text" },
    ],
    formulas: [
      { id: "perWeight", label: "Por peso (kg)", compute: (v) => computeDoseByWeight(v, "weight") },
      { id: "perBSA", label: "Por SC (m²)", compute: (v) => computeDoseByWeight(v, "bsa") },
    ],
  },
  reconstitution: {
    id: "reconstitution",
    title: "Reconstitución y dilución de antibióticos",
    subtitle: "Concentraciones, volúmenes y diluciones",
    category: "clinico",
    color: "#64748B",
    fields: [
      { name: "abId", label: "Antibiótico", type: "select", options: (antibiotics as Array<{id:string; name:string}>).map((a) => ({ value: a.id, label: a.name })) },
      { name: "reconstMl", label: "Volumen de reconstitución", type: "number", unit: "mL", validation: { min: 0 } },
      { name: "dose", label: "Dosis a administrar", type: "number" },
      { name: "doseUnit", label: "Unidad de dosis", type: "select", options: [ { value: "mg", label: "mg" }, { value: "g", label: "g" } ] },
      { name: "desiredConc", label: "Concentración final (opcional)", type: "number", unit: "mg/mL" },
      { name: "finalVolume", label: "Volumen final (opcional)", type: "number", unit: "mL" },
      { name: "addDiluent", label: "Agregar diluyente adicional", type: "toggle" },
      { name: "weight", label: "Peso del paciente (opcional)", type: "number", unit: "kg" },
    ],
    formulas: [ { id: "reconst", label: "Calcular", compute: (v) => computeReconstitution(v) } ],
  },
} as const;

export type RegistryKey = keyof typeof CalculatorsRegistry;
