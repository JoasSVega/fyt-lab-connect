import { useState, FC } from "react";
import CalculatorModal, { FieldSpec, FormulaSpec, CalculationResult } from "@/components/calculators/CalculatorModal";
import { Brain } from "lucide-react";

const fields: ReadonlyArray<FieldSpec> = [
  {
    name: "E",
    label: "Respuesta ocular (E)",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "4", label: "4 - Espontánea" },
      { value: "3", label: "3 - A la voz" },
      { value: "2", label: "2 - Al dolor" },
      { value: "1", label: "1 - Ninguna" },
    ],
    validation: { required: true },
  },
  {
    name: "V",
    label: "Respuesta verbal (V)",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "5", label: "5 - Orientado" },
      { value: "4", label: "4 - Confuso" },
      { value: "3", label: "3 - Palabras inapropiadas" },
      { value: "2", label: "2 - Sonidos incomprensibles" },
      { value: "1", label: "1 - Ninguna" },
    ],
    validation: { required: true },
  },
  {
    name: "M",
    label: "Respuesta motora (M)",
    type: "select",
    placeholder: "Seleccionar",
    options: [
      { value: "6", label: "6 - Obedece órdenes" },
      { value: "5", label: "5 - Localiza dolor" },
      { value: "4", label: "4 - Retirada al dolor" },
      { value: "3", label: "3 - Flexión anormal" },
      { value: "2", label: "2 - Extensión anormal" },
      { value: "1", label: "1 - Ninguna" },
    ],
    validation: { required: true },
  },
];

const formulas: ReadonlyArray<FormulaSpec> = [
  {
    id: "gcs",
    label: "Escala de Glasgow (GCS)",
    expressionLatex: String.raw`GCS = E + V + M`,
    scoring: {
      title: "Puntuación por componente",
      rows: [
        { label: "E (ocular)", options: [
          { label: "Espontánea", points: 4 },
          { label: "A la voz", points: 3 },
          { label: "Al dolor", points: 2 },
          { label: "Ninguna", points: 1 },
        ]},
        { label: "V (verbal)", options: [
          { label: "Orientado", points: 5 },
          { label: "Confuso", points: 4 },
          { label: "Palabras inapropiadas", points: 3 },
          { label: "Sonidos incomprensibles", points: 2 },
          { label: "Ninguna", points: 1 },
        ]},
        { label: "M (motora)", options: [
          { label: "Obedece órdenes", points: 6 },
          { label: "Localiza dolor", points: 5 },
          { label: "Retirada al dolor", points: 4 },
          { label: "Flexión anormal", points: 3 },
          { label: "Extensión anormal", points: 2 },
          { label: "Ninguna", points: 1 },
        ]},
      ],
    },
    compute: (values: Record<string, unknown>): CalculationResult => {
      const E = Number(values["E"]);
      const V = Number(values["V"]);
      const M = Number(values["M"]);
      const total = (Number.isFinite(E) ? E : 0) + (Number.isFinite(V) ? V : 0) + (Number.isFinite(M) ? M : 0);

      let interpretation = "TCE leve";
      let severity: CalculationResult["severity"] = "green";
      if (total >= 13 && total <= 15) {
        interpretation = "TCE leve";
        severity = "green";
      } else if (total >= 9 && total <= 12) {
        interpretation = "TCE moderado";
        severity = "yellow";
      } else if (total >= 3 && total <= 8) {
        interpretation = "TCE grave";
        severity = "red";
      }

      return {
        value: total,
        unit: "pt",
        interpretation,
        severity,
      };
    },
    fields,
  },
];

const GlasgowTool: FC = () => {
  return (
    <CalculatorModal
      id="glasgow-tool"
      title="Escala de Glasgow (GCS)"
      subtitle="Evaluación neurológica: sumatoria E + V + M"
      fields={fields}
      formulas={formulas}
  categoryColor="#8e24aa"
      autoCalculate
      actionVisibility="clear-only"
      backAction="volver"
      icon={<Brain className="w-5 h-5" style={{ color: "#8e24aa" }} />}
      openButtonLabel="Abrir Herramienta"
    />
  );
};

export default GlasgowTool;
