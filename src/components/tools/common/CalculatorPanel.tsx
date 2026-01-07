import * as React from "react";
import ModalCalculator from "@/components/tools/common/ModalCalculator";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  color?: string; // title accent color
  title: React.ReactNode;
  description?: React.ReactNode;
  // Inputs section content
  children: React.ReactNode;
  // Optional formula selector (rendered as bottom extension with divider)
  formulaSelector?: React.ReactNode;
  // Actions
  onCalculate: () => void;
  onClear: () => void;
  // Styling for primary button (keeps per-tool accent while layout is unified)
  primaryButtonClass?: string;
  // Result block content
  result?: React.ReactNode;
  // Optional error message
  errorMessage?: string;
};

const CalculatorPanel: React.FC<Props> = ({
  open,
  onOpenChange,
  color = "#0f172a",
  title,
  description,
  children,
  formulaSelector,
  onCalculate,
  onClear,
  primaryButtonClass = "bg-sky-600 hover:bg-sky-700",
  result,
  errorMessage,
}) => {
  return (
    <ModalCalculator open={open} onOpenChange={onOpenChange} flipped={false}
      title={<span style={{ color }} className="font-bold">{title}</span>}
      description={description}
    >
      <ModalCalculator.Front>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>

        {formulaSelector && (
          <div className="mt-4 pt-3 border-t border-slate-200">
            {formulaSelector}
          </div>
        )}

        {errorMessage ? (
          <div className="mt-3 text-sm text-red-600">{errorMessage}</div>
        ) : null}

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={onCalculate} className={primaryButtonClass}>Calcular</Button>
          <Button variant="outline" onClick={onClear}>Limpiar</Button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6 text-center">
            {result}
          </div>
        )}
      </ModalCalculator.Front>
    </ModalCalculator>
  );
};

export default CalculatorPanel;
