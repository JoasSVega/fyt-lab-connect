import * as React from "react";
import CalculatorModal, { FieldSpec, FormulaSpec, CalculationResult } from "@/components/calculators/CalculatorModal";
import { AlertTriangle } from "lucide-react";

const yesNo = [ { value: "si", label: "Sí" }, { value: "no", label: "No" } ] as const;
const fields: ReadonlyArray<FieldSpec> = [
  { name: "htn", label: "Hipertensión (PA sistólica > 160 mmHg)", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "liver", label: "Función hepática alterada", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "renal", label: "Función renal alterada", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "stroke", label: "ACV previo", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "bleeding", label: "Historia de sangrado o predisposición", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "labileINR", label: "INR lábil / TTR bajo", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "age", label: "Edad > 65 años", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "drugs", label: "Fármacos predisponentes", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
  { name: "alcohol", label: "Consumo de alcohol", type: "select", placeholder: "Seleccionar", options: yesNo, validation: { required: true } },
];

const formulas: ReadonlyArray<FormulaSpec> = [
  {
    id: "hasbled",
    label: "HAS-BLED",
    expressionLatex: String.raw`\\mathrm{HAS\\text{-}BLED}=H+A_{h}+A_{r}+S+B+L+E+D_{f}+D_{a}`,
    scoring: {
      rows: [
        { label: "Hipertensión (PA sistólica > 160)", options: [{ label: "Presente", points: 1 }, { label: "Ausente", points: 0 }] },
        { label: "Alteración hepática", options: [{ label: "Presente", points: 1 }] },
        { label: "Alteración renal", options: [{ label: "Presente", points: 1 }] },
        { label: "ACV previo", options: [{ label: "Presente", points: 1 }] },
        { label: "Sangrado o predisposición", options: [{ label: "Presente", points: 1 }] },
        { label: "INR lábil / TTR bajo", options: [{ label: "Presente", points: 1 }] },
        { label: "Edad > 65", options: [{ label: "Presente", points: 1 }] },
        { label: "Fármacos predisponentes", options: [{ label: "Presente", points: 1 }] },
        { label: "Alcohol", options: [{ label: "Presente", points: 1 }] },
      ],
    },
    compute: (values: Record<string, unknown>): CalculationResult => {
      const score = [
        "htn","liver","renal","stroke","bleeding","labileINR","age","drugs","alcohol"
      ].reduce((acc, key) => acc + (String(values[key] || "").toLowerCase() === "si" ? 1 : 0), 0);

      let interpretation = "Bajo riesgo";
      let severity: CalculationResult["severity"] = "green";
      if (score === 2) {
        interpretation = "Riesgo moderado";
        severity = "yellow";
      } else if (score >= 3) {
        interpretation = "Alto riesgo";
        severity = "red";
      }

      return { value: score, unit: "pt", interpretation, severity };
    },
    fields,
  },
];

const HASBLEDTool: React.FC = () => {
  return (
    <CalculatorModal
      id="hasbled-tool"
      title="Riesgo de sangrado en anticoagulación (HAS-BLED)"
      subtitle="Pacientes con FA bajo anticoagulación"
      fields={fields}
      formulas={formulas}
      categoryColor="#e53935"
      autoCalculate
      actionVisibility="clear-only"
      backAction="volver"
      icon={<AlertTriangle className="w-5 h-5" style={{ color: "#e53935" }} />}
      openButtonLabel="Abrir herramienta"
    />
  );
};

export default HASBLEDTool;
