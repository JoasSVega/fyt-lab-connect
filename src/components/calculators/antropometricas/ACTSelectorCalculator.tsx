import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import { actWatson, actChumlea, Sex } from "./formulas";

const ACTSelectorCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#16a34a' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [age, setAge] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [formula, setFormula] = React.useState<'watson'|'chumlea'>('watson');
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || h === "") { setError("Complete peso y talla"); return; }
    const weight = Number(w); const height = Number(h); const a = age === "" ? 0 : Number(age);
    let val = 0;
    if (formula === 'watson') val = actWatson(sex, weight, height, a);
    else val = actChumlea(sex, weight, height);
    setRes(val);
  };
  const reset = () => {
    setRes(null);
    setW("");
    setH("");
    setAge("");
    setSex("male");
    setFormula('watson');
    setError("");
  };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Agua corporal total (ACT)</>}
      description="Seleccione fórmula: Watson o Chumlea."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-green-600 hover:bg-green-700"
      formulaSelector={
        <select id="act-formula" value={formula} onChange={(e)=>setFormula(e.target.value as any)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="watson">Watson</option>
          <option value="chumlea">Chumlea</option>
        </select>
      }
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} L</div> : undefined}
    >
      <NumberField id="act-w" label="Peso" name="w" value={w===""?"":String(w)} onChange={(e)=>setW(e.target.value===""?"":Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="act-h" label="Talla" name="h" value={h===""?"":String(h)} onChange={(e)=>setH(e.target.value===""?"":Number(e.target.value))} min={120} max={230} unit="cm" required />
      <NumberField id="act-age" label="Edad" name="age" value={age===""?"":String(age)} onChange={(e)=>setAge(e.target.value===""?"":Number(e.target.value))} min={14} max={100} unit="años" />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="act-sex">Sexo</label>
        <select id="act-sex" value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default ACTSelectorCalculator;
