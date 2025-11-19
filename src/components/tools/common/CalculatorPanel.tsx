import * as React from "react";
import ModalCalculator from "@/components/tools/common/ModalCalculator"; // legacy modal wrapper (deprecated path)
import { Button } from "@/components/ui/button";

type PanelVariant = 'legacy' | 'core';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  color?: string; // title accent color
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode; // input fields (NumberField etc.)
  formulaSelector?: React.ReactNode; // optional formula selector or spacer
  onCalculate: () => void;
  onClear: () => void;
  primaryButtonClass?: string; // accent button class
  result?: React.ReactNode; // legacy result block (for legacy variant)
  errorMessage?: string;
  // Hybrid architecture additions:
  variant?: PanelVariant; // default 'legacy'; when 'core' acts only as layout (no modal wrapper)
  actionsSlot?: React.ReactNode; // optional custom actions (overrides default buttons in core variant)
  resultNode?: React.ReactNode; // result container for core variant (mounted separately from inputs)
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
  variant = 'legacy',
  actionsSlot,
  resultNode,
}) => {
  // Core variant: pure layout, no modal wrapper, caller handles animation/wrapper.
  if (variant === 'core') {
    return (
      <div className="calc-panel-core flex flex-col">
        <header className="mb-4">
          <h3 className="text-xl font-bold" style={{ color }}>{title}</h3>
          {description ? <p className="text-sm text-slate-600 mt-1">{description}</p> : null}
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
        {formulaSelector && (
          <div className="mt-4 pt-3 border-t border-slate-200">{formulaSelector}</div>
        )}
        {errorMessage ? (
          <div className="mt-3 text-sm text-red-600">{errorMessage}</div>
        ) : null}
        <div className="mt-5">
          {actionsSlot ? (
            actionsSlot
          ) : (
            <div className="flex items-center gap-3">
              <Button onClick={onCalculate} className={primaryButtonClass}>Calcular</Button>
              <Button variant="outline" onClick={onClear}>Limpiar</Button>
            </div>
          )}
        </div>
        {resultNode && (
          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6 text-center">
            {resultNode}
          </div>
        )}
      </div>
    );
  }

  // Legacy variant: preserve existing behavior with legacy ModalCalculator wrapper.
  return (
    <ModalCalculator
      open={open}
      onOpenChange={onOpenChange}
      flipped={false}
      title={<span style={{ color }} className="font-bold">{title}</span>}
      description={description}
    >
      <ModalCalculator.Front>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
        {formulaSelector && (
          <div className="mt-4 pt-3 border-t border-slate-200">{formulaSelector}</div>
        )}
        {errorMessage ? (
          <div className="mt-3 text-sm text-red-600">{errorMessage}</div>
        ) : null}
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={onCalculate} className={primaryButtonClass}>Calcular</Button>
          <Button variant="outline" onClick={onClear}>Limpiar</Button>
        </div>
        {result && (
          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-6 text-center">{result}</div>
        )}
      </ModalCalculator.Front>
    </ModalCalculator>
  );
};

export default CalculatorPanel;
