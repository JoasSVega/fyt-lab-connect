import { FieldSpec, FormulaSpec } from "@/components/calculators/CalculatorModal";
import { computeBMI, computeBSA } from "./adapters/anthropometrics";
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
} as const;

export type RegistryKey = keyof typeof CalculatorsRegistry;
