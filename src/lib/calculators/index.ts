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
} as const;

export type RegistryKey = keyof typeof CalculatorsRegistry;
