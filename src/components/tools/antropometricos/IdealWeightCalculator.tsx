import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";

type Sex = "male" | "female";

const devine = (hCm: number, sex: Sex) => {
  const hIn = hCm / 2.54;
  return sex === "male" ? 50 + 2.3 * (hIn - 60) : 45.5 + 2.3 * (hIn - 60);
};

const IdealWeightCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#0d9488' }) => {
  const [h, setH] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (!h) { setError("Complete la estatura"); return; }
    setRes(devine(Number(h), sex));
  };
  const reset = () => { setRes(null); setH(""); setError(""); };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Peso ideal (Devine)</>}
      description="Estimación clásica basada en estatura y sexo."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-teal-700 hover:bg-teal-800"
      errorMessage={error}
      result={res != null ? (
        <>
          <div className="text-3xl font-mono">{res.toFixed(2)} kg</div>
          <div className="text-xs text-muted-foreground mt-2">Devine, 1974</div>
        </>
      ) : undefined}
    >
      <NumberField id="pi-h" label="Talla" name="h" placeholder="p. ej., 170" value={h === "" ? "" : String(h)} onChange={(e)=>setH(e.target.value === "" ? "" : Number(e.target.value))} min={100} max={250} unit="cm" required />
      <div>
        <label htmlFor="pi-sex" className="block text-sm font-medium mb-1">Sexo</label>
        <select id="pi-sex" value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default IdealWeightCalculator;
