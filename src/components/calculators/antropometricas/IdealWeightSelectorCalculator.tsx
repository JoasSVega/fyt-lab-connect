import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import { idealDevine, idealMiller, idealRobinson, Sex } from "./formulas";

const IdealWeightSelectorCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#0d9488' }) => {
  const [h, setH] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [formula, setFormula] = React.useState<'devine'|'robinson'|'miller'>('devine');
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (h === "") { setError("Complete la talla"); return; }
    const height = Number(h);
    let val = 0;
    if (formula === 'devine') val = idealDevine(sex, height);
    else if (formula === 'robinson') val = idealRobinson(sex, height);
    else val = idealMiller(sex, height);
    setRes(val);
  };
  const reset = () => {
    setRes(null);
    setH("");
    setSex("male");
    setFormula('devine');
  };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Peso ideal</>}
      description="Seleccione entre Devine, Robinson o Miller."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-teal-700 hover:bg-teal-800"
      formulaSelector={
        <select id="pi-formula" value={formula} onChange={(e)=>setFormula(e.target.value as 'devine'|'robinson'|'miller')} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="devine">Devine (1974)</option>
          <option value="robinson">Robinson (1983)</option>
          <option value="miller">Miller (1983)</option>
        </select>
      }
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} kg</div> : undefined}
    >
      <NumberField id="pi-h" label="Talla" name="h" value={h===""?"":String(h)} onChange={(e)=>setH(e.target.value===""?"":Number(e.target.value))} min={120} max={230} unit="cm" required />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="pi-sex">Sexo</label>
        <select id="pi-sex" value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default IdealWeightSelectorCalculator;
