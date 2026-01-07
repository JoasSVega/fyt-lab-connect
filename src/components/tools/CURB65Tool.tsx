import { useState, FC } from "react";
import CalculatorModal, { FieldSpec, FormulaSpec, CalculationResult } from "@/components/calculators/CalculatorModal";
import { TestTube } from "lucide-react";

const fields: ReadonlyArray<FieldSpec> = [
  {
    name: "confusion",
    label: "Confusión o desorientación",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    validation: { required: true },
  },
  { name: "urea", label: "Urea", type: "number", unit: "mmol/L", placeholder: "p. ej., 6.5", validation: { required: true, min: 0 } },
  { name: "rr", label: "Frecuencia respiratoria", type: "number", unit: "/min", placeholder: "p. ej., 22", validation: { required: true, min: 0 } },
  { name: "sbp", label: "Presión sistólica", type: "number", unit: "mmHg", placeholder: "p. ej., 110", validation: { required: true, min: 0 } },
  { name: "dbp", label: "Presión diastólica", type: "number", unit: "mmHg", placeholder: "p. ej., 70", validation: { required: true, min: 0 } },
  { name: "age", label: "Edad", type: "number", unit: "años", placeholder: "p. ej., 58", validation: { required: true, min: 0 } },
];

const formulas: ReadonlyArray<FormulaSpec> = [
  {
    id: "curb65",
    label: "CURB-65",
    expressionLatex: String.raw`\\mathrm{CURB65} = C + U + R + B + A_{\\ge 65}`,
    scoring: {
      title: "Criterios CURB-65",
      rows: [
        { label: "Confusión", options: [{ label: "Presente", points: 1 }, { label: "Ausente", points: 0 }] },
        { label: "Urea > 7 mmol/L", options: [{ label: "> 7", points: 1 }, { label: "≤ 7", points: 0 }] },
        { label: "FR ≥ 30/min", options: [{ label: "≥ 30", points: 1 }, { label: "< 30", points: 0 }] },
        { label: "PA sistólica < 90 o diastólica ≤ 60 mmHg", options: [{ label: "Cumple", points: 1 }, { label: "No cumple", points: 0 }] },
        { label: "Edad ≥ 65 años", options: [{ label: "≥ 65", points: 1 }, { label: "< 65", points: 0 }] },
      ],
    },
    compute: (values: Record<string, unknown>): CalculationResult => {
  const confusion = String(values["confusion"] || "").toLowerCase() === "si";
      const urea = Number(values["urea"]);
      const rr = Number(values["rr"]);
      const sbp = Number(values["sbp"]);
      const dbp = Number(values["dbp"]);
      const age = Number(values["age"]);

      let score = 0;
      if (confusion) score += 1;
      if (Number.isFinite(urea) && urea > 7) score += 1;
      if (Number.isFinite(rr) && rr >= 30) score += 1;
      if ((Number.isFinite(sbp) && sbp < 90) || (Number.isFinite(dbp) && dbp <= 60)) score += 1;
      if (Number.isFinite(age) && age >= 65) score += 1;

      let interpretation = "Riesgo bajo. Manejo ambulatorio en la mayoría de los casos.";
      let severity: CalculationResult["severity"] = "green";
      if (score === 2) {
        interpretation = "Riesgo intermedio. Considerar observación/ingreso corto.";
        severity = "yellow";
      } else if (score >= 3) {
        interpretation = "Riesgo alto. Ingreso hospitalario; valorar UCI.";
        severity = "red";
      }

      return {
        value: score,
        unit: "pt",
        interpretation,
        severity,
      };
    },
    fields,
  },
];

const CURB65Tool: FC = () => {
  // Predicate: all required fields present & valid before enabling Calcular
  const canCalculate = (values: Record<string, unknown>): boolean => {
    for (const f of fields) {
      const v = values[f.name];
      if (f.validation?.required) {
        if (v === undefined || v === "") return false;
      }
      if (f.type === "number") {
        const num = Number(v);
        if (!Number.isFinite(num)) return false;
        if (f.validation?.min !== undefined && num < f.validation.min) return false;
        if (f.validation?.max !== undefined && num > f.validation.max) return false;
      }
    }
    return true;
  };

  return (
    <CalculatorModal
      id="curb65-tool"
      title="Severidad de Neumonía Adquirida en la Comunidad (CURB-65)"
      subtitle="Adultos con neumonía adquirida en la comunidad"
      fields={fields}
      formulas={formulas}
      categoryColor="#fb8c00"
      autoCalculate={false}
      actionVisibility="default"
      backAction="volver"
      enableCalculatePredicate={canCalculate}
      icon={<TestTube className="w-5 h-5" style={{ color: "#fb8c00" }} />}
      openButtonLabel="Abrir Herramienta"
    />
  );
};

export default CURB65Tool;
