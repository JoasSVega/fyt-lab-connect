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
      { id: "cg", label: "Cockcroft–Gault", description: "CrCl en mL/min", expressionLatex: String.raw`\mathrm{CrCl}=\frac{(140-\text{edad})\times \text{peso}\times (0.85\;\text{si mujer})}{72\times SCr_{mg/dL}}`, compute: computeCockcroft },
      { id: "mdrd", label: "MDRD (4v)", description: "TFG en mL/min/1.73m²", expressionLatex: String.raw`\mathrm{TFG}=175\times (SCr)^{-1.154}\times (\text{edad})^{-0.203}\times (0.742^{[\text{mujer}]})\times (1.212^{[\text{afro}]})`, compute: computeMDRD4 },
      { id: "ckd2009", label: "CKD‑EPI 2009", expressionLatex: String.raw`\mathrm{TFG}=141\times \min\left(\tfrac{SCr}{\kappa},1\right)^{\alpha}\times \max\left(\tfrac{SCr}{\kappa},1\right)^{-1.209}\times 0.993^{\text{edad}}\times 1.018^{[\text{mujer}]}\times 1.159^{[\text{afro}]}`, compute: computeCKDEPI2009 },
      { id: "ckd2021", label: "CKD‑EPI 2021", expressionLatex: String.raw`\mathrm{TFG}=142\times \min\left(\tfrac{SCr}{\kappa},1\right)^{\alpha}\times \max\left(\tfrac{SCr}{\kappa},1\right)^{-1.200}\times 0.9938^{\text{edad}}\times 1.012^{[\text{mujer}]}`, compute: computeCKDEPI2021 },
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
  formulas: [ { id: "bmi", label: "IMC", description: "IMC = peso / (talla[m])²", expressionLatex: String.raw`\mathrm{IMC}=\frac{\text{peso}}{(\tfrac{\text{talla}}{100})^{2}}`, compute: computeBMI } ],
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
  formulas: [ { id: "dubois", label: "DuBois", description: "BSA = 0.007184 × peso^0.425 × talla^0.725", expressionLatex: String.raw`\mathrm{SC}=0.007184\times \text{peso}^{0.425}\times \text{talla}^{0.725}`, compute: computeBSA } ],
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
  formulas: [ { id: "deurenberg", label: "Deurenberg", description: "% Grasa corporal", expressionLatex: String.raw`\%\,\mathrm{Grasa}=1.2\times \mathrm{IMC}+0.23\times \text{edad}-10.8\times [\text{varón}]-5.4`, compute: computeBodyFat } ],
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
  { id: "mifflin", label: "Mifflin–St Jeor", description: "kcal/día", expressionLatex: String.raw`\mathrm{CEB}=10\,\text{peso}+6.25\,\text{talla}-5\,\text{edad}+\beta\quad (\beta=5\;\text{varón},\;-161\;\text{mujer})`, compute: computeBMRMifflin },
  { id: "harris", label: "Harris–Benedict", description: "kcal/día", expressionLatex: String.raw`\mathrm{CEB}=\alpha+13.75\,\text{peso}+5.003\,\text{talla}-6.755\,\text{edad}\; (\alpha=66.5\;\text{varón})\\ \mathrm{CEB}=\alpha+9.563\,\text{peso}+1.850\,\text{talla}-4.676\,\text{edad}\; (\alpha=655.1\;\text{mujer})`, compute: computeBMRHarris },
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
      { id: "devine", label: "Devine (1974)", expressionLatex: String.raw`\mathrm{PI}_{\text{varón}}=50+2.3\,(\tfrac{\text{talla\,(in)}}{1}-60)\\ \mathrm{PI}_{\text{mujer}}=45.5+2.3\,(\tfrac{\text{talla\,(in)}}{1}-60)`, compute: computeIdealDevine },
      { id: "robinson", label: "Robinson (1983)", expressionLatex: String.raw`\mathrm{PI}_{\text{varón}}=52+1.9\,(\text{in}-60)\\ \mathrm{PI}_{\text{mujer}}=49+1.7\,(\text{in}-60)`, compute: computeIdealRobinson },
      { id: "miller", label: "Miller (1983)", expressionLatex: String.raw`\mathrm{PI}_{\text{varón}}=56.2+1.41\,(\text{in}-60)\\ \mathrm{PI}_{\text{mujer}}=53.1+1.36\,(\text{in}-60)`, compute: computeIdealMiller },
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
      { id: "watson", label: "Watson", expressionLatex: String.raw`\mathrm{ACT}_{\text{varón}}=2.447-0.09516\,\text{edad}+0.1074\,\text{talla}+0.3362\,\text{peso}\\ \mathrm{ACT}_{\text{mujer}}=-2.097+0.1069\,\text{talla}+0.2466\,\text{peso}` , compute: computeACTWatson },
      { id: "chumlea", label: "Chumlea", expressionLatex: String.raw`\mathrm{ACT}_{\text{mujer}}=0.34454\,\text{talla}+0.183809\,\text{peso}-35.270121`, compute: computeACTChumlea },
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
      { id: "james", label: "James", expressionLatex: String.raw`\mathrm{MM}_{\text{varón}}=1.1\,\text{peso}-128\,\Big(\tfrac{\text{peso}}{\text{talla}}\Big)^{2}\\ \mathrm{MM}_{\text{mujer}}=1.07\,\text{peso}-148\,\Big(\tfrac{\text{peso}}{\text{talla}}\Big)^{2}`, compute: computeMMCJames },
      { id: "hume", label: "Hume", expressionLatex: String.raw`\mathrm{MM}_{\text{varón}}=0.32810\,\text{peso}+0.33929\,\text{talla}-29.5336\\ \mathrm{MM}_{\text{mujer}}=0.29569\,\text{peso}+0.41813\,\text{talla}-43.2933`, compute: computeMMCHume },
      { id: "lean", label: "Lean (% grasa)", description: "Masa magra a partir de % grasa", expressionLatex: String.raw`\mathrm{MM}=\text{peso}\times (1-\tfrac{\%\,\text{grasa}}{100})`, compute: computeLeanMassFromBF },
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
      { id: "child", label: "Child‑Pugh", description: "Puntuación por categorías clínicas y laboratoriales", compute: computeChildPugh, fields: [
        { name: "bili", label: "Bilirrubina total", type: "number", unit: "mg/dL o µmol/L" },
        { name: "biliUnit", label: "Unidad de bilirrubina", type: "select", options: [ { value: "mgdl", label: "mg/dL" }, { value: "umol", label: "µmol/L" } ], placeholder: "Unidad" },
        { name: "albumin", label: "Albúmina", type: "number", unit: "g/dL" },
        { name: "inr", label: "INR", type: "number" },
        { name: "ascites", label: "Ascitis", type: "select", options: [ { value: "none", label: "Ninguna" }, { value: "mild", label: "Leve" }, { value: "moderate", label: "Moderada" }, { value: "severe", label: "Severa" } ] },
        { name: "enceph", label: "Encefalopatía", type: "select", options: [ { value: "none", label: "Ninguna" }, { value: "mild", label: "Leve (I–II)" }, { value: "moderate", label: "Moderada" }, { value: "severe", label: "Severa (III–IV)" } ] },
      ] },
  { id: "meld", label: "MELD / MELD‑Na", description: "Modelo de enfermedad hepática terminal", expressionLatex: String.raw`\mathrm{MELD}=3.78\ln(\text{bili})+11.2\ln(\text{INR})+9.57\ln(\text{creat})+6.43\\ \mathrm{MELD\mbox{-}Na}=\mathrm{MELD}+1.59\,(135-\text{Na})`, compute: computeMELD, fields: [
        { name: "inr", label: "INR", type: "number" },
        { name: "bili", label: "Bilirrubina total", type: "number", unit: "mg/dL" },
        { name: "creat", label: "Creatinina", type: "number", unit: "mg/dL" },
        { name: "sodium", label: "Sodio sérico (opcional)", type: "number", unit: "mmol/L" },
      ] },
  { id: "apri", label: "APRI", description: "Índice AST/plaquetas", expressionLatex: String.raw`\mathrm{APRI}=\frac{\tfrac{\text{AST}}{\text{LSN}}\times 100}{\text{Plaquetas}}`, compute: computeAPRI, fields: [
        { name: "ast", label: "AST", type: "number", unit: "UI/L" },
        { name: "astULN", label: "LSN AST", type: "number", unit: "UI/L" },
        { name: "platelets", label: "Plaquetas", type: "number", unit: "10^9/L" },
      ] },
  { id: "fib4", label: "FIB‑4", description: "Fibrosis (edad, AST, ALT, plaquetas)", expressionLatex: String.raw`\mathrm{FIB4}=\frac{\text{Edad}\times \text{AST}}{\text{Plaquetas}\times \sqrt{\text{ALT}}}`, compute: computeFIB4, fields: [
        { name: "age", label: "Edad", type: "number", unit: "años" },
        { name: "ast", label: "AST", type: "number", unit: "UI/L" },
        { name: "alt", label: "ALT", type: "number", unit: "UI/L" },
        { name: "platelets", label: "Plaquetas", type: "number", unit: "10^9/L" },
      ] },
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
      { id: "perWeight", label: "Por peso (kg)", description: "Dosis total por peso", expressionLatex: String.raw`\text{Dosis}=\text{Peso}\times \text{Dosis}_{\text{por kg}}`, compute: (v) => computeDoseByWeight(v, "weight"), fields: [
        { name: "weight", label: "Peso corporal", type: "number", unit: "kg", validation: { min: 1 } },
        { name: "dosePer", label: "Dosis recomendada", type: "number" },
        { name: "unit", label: "Unidad", type: "select", options: [
          { value: "mg/kg", label: "mg/kg" },
          { value: "µg/kg", label: "µg/kg" },
        ] },
        { name: "frequency", label: "Frecuencia / intervalo (opcional)", type: "text" },
        { name: "drug", label: "Nombre del fármaco (opcional)", type: "text" },
  ] },
  { id: "perBSA", label: "Por SC (m²)", description: "Dosis total por superficie corporal", expressionLatex: String.raw`\text{Dosis}=\text{SC}\times \text{Dosis}_{\text{por m}^2}`, compute: (v) => computeDoseByWeight(v, "bsa"), fields: [
        { name: "bsa", label: "Superficie corporal", type: "number", unit: "m²", validation: { min: 0 } },
        { name: "dosePer", label: "Dosis recomendada", type: "number" },
        { name: "unit", label: "Unidad", type: "select", options: [
          { value: "mg/m²", label: "mg/m²" },
          { value: "µg/m²", label: "µg/m²" },
        ] },
        { name: "frequency", label: "Frecuencia / intervalo (opcional)", type: "text" },
        { name: "drug", label: "Nombre del fármaco (opcional)", type: "text" },
      ] },
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
  formulas: [ { id: "reconst", label: "Calcular", description: "C=\tfrac{m}{V}; Volumen para dosis: V=\tfrac{\text{dosis}}{C}", expressionLatex: String.raw`C=\frac{m}{V}\quad;\quad V=\frac{\text{dosis}}{C}` , compute: (v) => computeReconstitution(v), fields: [
      { name: "abId", label: "Antibiótico", type: "select", options: (antibiotics as Array<{id:string; name:string}>).map((a) => ({ value: a.id, label: a.name })) },
      { name: "reconstMl", label: "Volumen de reconstitución", type: "number", unit: "mL", validation: { min: 0 } },
      { name: "dose", label: "Dosis a administrar", type: "number" },
      { name: "doseUnit", label: "Unidad de dosis", type: "select", options: [ { value: "mg", label: "mg" }, { value: "g", label: "g" } ] },
      { name: "desiredConc", label: "Concentración final (opcional)", type: "number", unit: "mg/mL" },
      { name: "finalVolume", label: "Volumen final (opcional)", type: "number", unit: "mL" },
      { name: "addDiluent", label: "Agregar diluyente adicional", type: "toggle" },
      { name: "weight", label: "Peso del paciente (opcional)", type: "number", unit: "kg" },
    ] } ],
  },
} as const;

export type RegistryKey = keyof typeof CalculatorsRegistry;
