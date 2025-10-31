import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";

type Sex = "male" | "female";

const mifflinStJeor = (wKg: number, hCm: number, age: number, sex: Sex) => {
  let bmr = 10 * wKg + 6.25 * hCm - 5 * age;
  bmr += sex === "male" ? 5 : -161;
  return Math.round(bmr);
};

const BMRCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#f97316' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [age, setAge] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (!w || !h || !age) { setError("Complete peso, talla y edad"); return; }
    setRes(mifflinStJeor(Number(w), Number(h), Number(age), sex));
  };
  const reset = () => { setRes(null); setW(""); setH(""); setAge(""); setError(""); };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>BMR (Mifflin–St Jeor)</>}
      description="Tasa metabólica basal estimada en kcal/día."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-orange-600 hover:bg-orange-700"
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res} kcal/día</div> : undefined}
    >
      <NumberField id="bmr-w" label="Peso" name="w" value={w === "" ? "" : String(w)} onChange={(e)=>setW(e.target.value === "" ? "" : Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="bmr-h" label="Talla" name="h" value={h === "" ? "" : String(h)} onChange={(e)=>setH(e.target.value === "" ? "" : Number(e.target.value))} min={100} max={250} unit="cm" required />
      <NumberField id="bmr-age" label="Edad" name="age" value={age === "" ? "" : String(age)} onChange={(e)=>setAge(e.target.value === "" ? "" : Number(e.target.value))} min={5} max={120} unit="años" required />
      <div>
        <label htmlFor="bmr-sex" className="block text-sm font-medium mb-1">Sexo</label>
        <select id="bmr-sex" value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default BMRCalculator;
