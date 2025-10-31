import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import { cebHarrisBenedict, cebMifflin, Sex } from "./formulas";

const CEBSelectorCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#f97316' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [age, setAge] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [formula, setFormula] = React.useState<'harris'|'mifflin'>('mifflin');
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || h === "" || age === "") { setError("Complete peso, talla y edad"); return; }
    const weight = Number(w); const height = Number(h); const a = Number(age);
    let val = 0;
    if (formula === 'harris') val = cebHarrisBenedict(sex, weight, height, a);
    else val = cebMifflin(sex, weight, height, a);
    setRes(val);
  };
  const reset = () => {
    setRes(null);
    setW("");
    setH("");
    setAge("");
    setSex("male");
    setFormula('mifflin');
    setError("");
  };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Consumo energético basal (CEB)</>}
      description="Seleccione fórmula: Harris-Benedict o Mifflin–St Jeor."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-orange-600 hover:bg-orange-700"
      formulaSelector={
        <select id="ceb-formula" value={formula} onChange={(e)=>setFormula(e.target.value as any)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="harris">Harris-Benedict</option>
          <option value="mifflin">Mifflin–St Jeor</option>
        </select>
      }
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{Math.round(res)} kcal/día</div> : undefined}
    >
      <NumberField id="ceb-w" label="Peso" name="w" value={w===""?"":String(w)} onChange={(e)=>setW(e.target.value===""?"":Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="ceb-h" label="Talla" name="h" value={h===""?"":String(h)} onChange={(e)=>setH(e.target.value===""?"":Number(e.target.value))} min={120} max={230} unit="cm" required />
      <NumberField id="ceb-age" label="Edad" name="age" value={age===""?"":String(age)} onChange={(e)=>setAge(e.target.value===""?"":Number(e.target.value))} min={14} max={100} unit="años" required />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="ceb-sex">Sexo</label>
        <select id="ceb-sex" value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default CEBSelectorCalculator;
