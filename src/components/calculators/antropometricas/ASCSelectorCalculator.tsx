import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import SelectField from "@/components/inputs/SelectField";
import { bsaDuBois, bsaGehanGeorge, bsaHaycock } from "./formulas";

const ASCSelectorCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#10b981' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [formula, setFormula] = React.useState<'dubois'|'gehan'|'haycock'>('dubois');
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || h === "") { setError("Complete peso y talla"); return; }
    const weight = Number(w); const height = Number(h);
    let val = 0;
    if (formula === 'dubois') val = bsaDuBois(weight, height);
    else if (formula === 'gehan') val = bsaGehanGeorge(weight, height);
    else val = bsaHaycock(weight, height);
    setRes(val);
  };
  const reset = () => {
    setRes(null);
    setW("");
    setH("");
    setError("");
    setFormula('dubois');
  };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Superficie corporal (ASC)</>}
      description="Seleccione fórmula: Dubois, Gehan-George o Haycock."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-emerald-600 hover:bg-emerald-700"
      formulaSelector={
        <SelectField
          id="asc-formula"
          ariaLabel="Fórmula de superficie corporal"
          value={formula}
          onChange={(e)=>setFormula(e.target.value as 'dubois'|'gehan'|'haycock')}
          options={[
            { value: 'dubois', label: 'Dubois & Dubois (1916)' },
            { value: 'gehan', label: 'Gehan & George (1970)' },
            { value: 'haycock', label: 'Haycock (1978, pediátrica)' },
          ]}
        />
      }
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} m²</div> : undefined}
    >
      <NumberField id="asc-w" label="Peso" name="w" value={w===""?"":String(w)} onChange={(e)=>setW(e.target.value===""?"":Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="asc-h" label="Talla" name="h" value={h===""?"":String(h)} onChange={(e)=>setH(e.target.value===""?"":Number(e.target.value))} min={100} max={250} unit="cm" required />
    </CalculatorPanel>
  );
};

export default ASCSelectorCalculator;
