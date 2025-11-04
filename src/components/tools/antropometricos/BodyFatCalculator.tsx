import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import SelectField from "@/components/inputs/SelectField";

type Sex = "male" | "female";

// Deurenberg et al., 1991. sex: 1 = male, 0 = female
const deurenergBodyFat = (wKg: number, hCm: number, age: number, sex: Sex) => {
  const hM = hCm / 100;
  const bmi = wKg / (hM * hM);
  const sexNum = sex === "male" ? 1 : 0;
  return 1.2 * bmi + 0.23 * age - 10.8 * sexNum - 5.4;
};

function categoryForBF(sex: Sex, bf: number): { label: string; color: string } {
  if (sex === "male") {
    if (bf < 6) return { label: "Muy bajo (riesgo)", color: "#ef4444" };
    if (bf < 14) return { label: "Atleta", color: "#10b981" };
    if (bf < 18) return { label: "Fitness", color: "#10b981" };
    if (bf < 25) return { label: "Promedio", color: "#f59e0b" };
    return { label: "Obesidad", color: "#ef4444" };
  }
  // female
  if (bf < 14) return { label: "Muy bajo (riesgo)", color: "#ef4444" };
  if (bf < 21) return { label: "Atleta", color: "#10b981" };
  if (bf < 25) return { label: "Fitness", color: "#10b981" };
  if (bf < 32) return { label: "Promedio", color: "#f59e0b" };
  return { label: "Obesidad", color: "#ef4444" };
}

const BodyFatCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#a855f7' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [age, setAge] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || h === "" || age === "") { setError("Complete peso, talla y edad"); return; }
    const val = deurenergBodyFat(Number(w), Number(h), Number(age), sex);
    setRes(val);
  };
  const reset = () => { setRes(null); setW(""); setH(""); setAge(""); setError(""); };

  const interp = React.useMemo(()=>{
    if (res == null) return { label: "", color: "#6b7280" };
    return categoryForBF(sex, res);
  }, [res, sex]);

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>% Grasa corporal (Deurenberg)</>}
      description="Estimación porcentual de grasa corporal basada en IMC, edad y sexo."
      onCalculate={calc}
      onClear={reset}
  primaryButtonClass="bg-violet-600 hover:bg-violet-700"
      errorMessage={error}
      result={res != null ? (
        <>
          <div className="text-3xl font-mono">{res.toFixed(1)} %</div>
          <div className="mt-2 text-sm" style={{ color: interp.color }}>{interp.label}</div>
        </>
      ) : undefined}
    >
      <NumberField id="bf-w" label="Peso" name="w" value={w === "" ? "" : String(w)} onChange={(e)=>setW(e.target.value === "" ? "" : Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="bf-h" label="Talla" name="h" value={h === "" ? "" : String(h)} onChange={(e)=>setH(e.target.value === "" ? "" : Number(e.target.value))} min={100} max={250} unit="cm" required />
      <NumberField id="bf-age" label="Edad" name="age" value={age === "" ? "" : String(age)} onChange={(e)=>setAge(e.target.value === "" ? "" : Number(e.target.value))} min={5} max={120} unit="años" required />
      <SelectField
        id="bf-sex"
        label="Sexo"
        value={sex}
        onChange={(e)=>setSex(e.target.value as Sex)}
        options={[{ value: "male", label: "Masculino" }, { value: "female", label: "Femenino" }]}
      />
    </CalculatorPanel>
  );
};

export default BodyFatCalculator;
