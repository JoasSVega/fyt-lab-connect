import * as React from "react";
import CalculatorModal, { FieldSpec, FormulaSpec, CalculationResult } from "@/components/calculators/CalculatorModal";
import { HeartPulse } from "lucide-react";

const yesNo = [ { value: "si", label: "Sí" }, { value: "no", label: "No" } ] as const;
const fields: ReadonlyArray<FieldSpec> = [
  { name: "chf", label: "Insuficiencia cardiaca (C)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "htn", label: "Hipertensión (H)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  {
    name: "ageBand",
    label: "Edad",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "lt65", label: "< 65 años" },
      { value: "65to74", label: "65–74 años" },
      { value: "ge75", label: "≥ 75 años" },
    ],
    validation: { required: true },
  },
  { name: "dm", label: "Diabetes mellitus (D)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "stroke", label: "ACV/AIT/Tromboembolismo previo (S)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "vascular", label: "Enfermedad vascular (V)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  {
    name: "sex",
    label: "Sexo",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "masculino", label: "Masculino" },
      { value: "femenino", label: "Femenino" },
    ],
    validation: { required: true },
  },
];

const formulas: ReadonlyArray<FormulaSpec> = [
  {
    id: "cha2ds2",
    label: "CHA₂DS₂-VASc",
    expressionLatex: String.raw`\\mathrm{CHA}_{2}\\mathrm{DS}_{2}\\text{-}\\mathrm{VASc}=C+H+2A_{\\ge 75}+D+2S+V+A_{65-74}+Sc`,
    scoring: {
      rows: [
        { label: "C: Insuficiencia cardiaca", options: [{ label: "Presente", points: 1 }] },
        { label: "H: Hipertensión", options: [{ label: "Presente", points: 1 }] },
        { label: "A₂: Edad ≥ 75 años", options: [{ label: "Si aplica", points: 2 }] },
        { label: "D: Diabetes mellitus", options: [{ label: "Presente", points: 1 }] },
        { label: "S₂: ACV/AIT/Tromboembolismo previo", options: [{ label: "Presente", points: 2 }] },
        { label: "V: Enfermedad vascular", options: [{ label: "Presente", points: 1 }] },
        { label: "A: Edad 65–74", options: [{ label: "Si aplica", points: 1 }] },
        { label: "Sc: Sexo femenino", options: [{ label: "Femenino", points: 1 }] },
      ],
    },
    compute: (values: Record<string, unknown>): CalculationResult => {
  const chf = String(values["chf"] || "").toLowerCase() === "si"; // 1
  const htn = String(values["htn"] || "").toLowerCase() === "si"; // 1
  const dm = String(values["dm"] || "").toLowerCase() === "si"; // 1
  const stroke = String(values["stroke"] || "").toLowerCase() === "si"; // 2
  const vascular = String(values["vascular"] || "").toLowerCase() === "si"; // 1
      const ageBand = String(values["ageBand"] || "");
      const sex = String(values["sex"] || "");

      let score = 0;
      if (chf) score += 1;
      if (htn) score += 1;
      if (dm) score += 1;
      if (stroke) score += 2;
      if (vascular) score += 1;
      if (ageBand === "ge75") score += 2;
      else if (ageBand === "65to74") score += 1;
      if (sex === "femenino") score += 1;

      let interpretation = "Riesgo bajo";
      let severity: CalculationResult["severity"] = "green";
      if (score === 1) {
        interpretation = "Riesgo intermedio";
        severity = "yellow";
      } else if (score >= 2) {
        interpretation = "Riesgo alto";
        severity = "red";
      }

      return { value: score, unit: "pt", interpretation, severity };
    },
    fields,
  },
];

const CHA2DS2VAScTool: React.FC = () => {
  return (
    <CalculatorModal
      id="cha2ds2vasc-tool"
      title="Riesgo de eventos tromboembólicos (CHA₂DS₂-VASc)"
      subtitle="Pacientes con FA"
      fields={fields}
      formulas={formulas}
      categoryColor="#43a047"
      autoCalculate
      actionVisibility="clear-only"
      backAction="volver"
      icon={<HeartPulse className="w-5 h-5" style={{ color: "#43a047" }} />}
      openButtonLabel="Abrir herramienta"
    />
  );
};

export default CHA2DS2VAScTool;
