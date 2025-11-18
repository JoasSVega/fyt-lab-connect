import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";

const calcLean = (wKg: number, bfPct: number) => wKg * (1 - bfPct / 100);

const LeanMassCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#0891b2' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [bf, setBf] = React.useState<number | "">("");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || bf === "") { setError("Complete peso y % de grasa corporal"); return; }
    setRes(calcLean(Number(w), Number(bf)));
  };
  const reset = () => { setRes(null); setW(""); setBf(""); setError(""); };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Masa magra (Lean mass)</>}
      description="Estimación a partir de peso y % de grasa corporal."
      onCalculate={calc}
      onClear={reset}
  primaryButtonClass="bg-cyan-700 hover:bg-cyan-800"
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} kg</div> : undefined}
    >
      <NumberField id="lm-w" label="Peso" name="w" placeholder="p. ej., 70" value={w === "" ? "" : String(w)} onChange={(e)=>setW(e.target.value === "" ? "" : Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="lm-bf" label="% Grasa corporal" name="bf" placeholder="p. ej., 22" value={bf === "" ? "" : String(bf)} onChange={(e)=>setBf(e.target.value === "" ? "" : Number(e.target.value))} min={0} max={100} unit="%" required />
    </CalculatorPanel>
  );
};

export default LeanMassCalculator;
