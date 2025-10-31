import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";

const bsaMosteller = (wKg: number, hCm: number) => Math.sqrt((wKg * hCm) / 3600);

const SuperficieCorporal: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#10b981' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => { setError(""); if (w === "" || h === "") { setError("Complete peso y talla"); return; } setRes(bsaMosteller(Number(w), Number(h))); };
  const reset = () => { setRes(null); setW(""); setH(""); setError(""); };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Superficie corporal</>}
      description="Fórmula de Mosteller: √(peso×talla/3600)."
      onCalculate={calc}
      onClear={reset}
  primaryButtonClass="bg-emerald-600 hover:bg-emerald-700"
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} m²</div> : undefined}
    >
      <NumberField id="bsa-w" label="Peso" name="w" value={w === "" ? "" : String(w)} onChange={(e)=>setW(e.target.value === "" ? "" : Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="bsa-h" label="Talla" name="h" value={h === "" ? "" : String(h)} onChange={(e)=>setH(e.target.value === "" ? "" : Number(e.target.value))} min={100} max={250} unit="cm" required />
    </CalculatorPanel>
  );
};

export default SuperficieCorporal;
