import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";

// CalculatorLayout: capa fina sobre CalculatorPanel para estandarizar la API
// solicitada en los requisitos. Mantiene compatibilidad total con las
// calculadoras existentes (que ya usan <CalculatorPanel />).
// "inputs" es opcional y se ignora (los formularios se siguen pasando como children),
// y "hasFormulaSelector" es un azúcar sintáctico para mostrar u ocultar la
// prop formulaSelector.

export type CalculatorLayoutProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  color?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  // En la práctica, los inputs se pasan como children para conservar
  // la flexibilidad de cada calculadora (NumberField, selects, etc.).
  inputs?: React.ReactNode[];
  hasFormulaSelector?: boolean;
  formulaSelector?: React.ReactNode;
  onCalculate: () => void;
  onReset: () => void;
  primaryButtonClass?: string;
  result?: React.ReactNode;
  errorMessage?: string;
  children?: React.ReactNode;
};

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  open,
  onOpenChange,
  color,
  title,
  description,
  inputs,
  hasFormulaSelector,
  formulaSelector,
  onCalculate,
  onReset,
  primaryButtonClass,
  result,
  errorMessage,
  children,
}) => {
  const selector = hasFormulaSelector ? formulaSelector : undefined;

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={title}
      description={description}
      onCalculate={onCalculate}
      onClear={onReset}
      primaryButtonClass={primaryButtonClass}
      formulaSelector={selector}
      result={result}
      errorMessage={errorMessage}
    >
      {/* Si se provee "inputs", se renderizan antes de los children para compatibilidad */}
      {inputs}
      {children}
    </CalculatorPanel>
  );
};

export default CalculatorLayout;
