import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import { mmcJames, mmcHume, Sex } from "./formulas";

type Props = { open: boolean; onOpenChange: (v: boolean) => void; color?: string };

const MMCCalculator: React.FC<Props> = ({ open, onOpenChange, color = "#0891b2" }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [formula, setFormula] = React.useState<"james" | "hume">("james");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string>("");

  const calc = () => {
    setError("");
    if (w === "" || h === "") {
      setError("Complete peso y talla");
      return;
    }
    const weight = Number(w);
    const height = Number(h);
    const val = formula === "james" ? mmcJames(sex, weight, height) : mmcHume(sex, weight, height);
    setRes(val);
  };

  const reset = () => {
    setRes(null);
    setW("");
    setH("");
    setSex("male");
    setFormula("james");
    setError("");
  };

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Masa magra corporal (MMC)</>}
      description="Seleccione fórmula: James u Hume."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-cyan-700 hover:bg-cyan-800"
      formulaSelector={
        <select
          id="mmc-formula"
          value={formula}
          onChange={(e) => setFormula(e.target.value as any)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="james">James (1980)</option>
          <option value="hume">Hume (1966)</option>
        </select>
      }
      errorMessage={error}
      result={res != null ? <div className="text-3xl font-mono">{res.toFixed(2)} kg</div> : undefined}
    >
      <NumberField
        id="mmc-w"
        label="Peso"
        name="w"
        value={w === "" ? "" : String(w)}
        onChange={(e) => setW(e.target.value === "" ? "" : Number(e.target.value))}
        min={20}
        max={300}
        unit="kg"
        required
      />
      <NumberField
        id="mmc-h"
        label="Talla"
        name="h"
        value={h === "" ? "" : String(h)}
        onChange={(e) => setH(e.target.value === "" ? "" : Number(e.target.value))}
        min={100}
        max={250}
        unit="cm"
        required
      />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="mmc-sex">
          Sexo
        </label>
        <select
          id="mmc-sex"
          value={sex}
          onChange={(e) => setSex(e.target.value as Sex)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>
      </div>
    </CalculatorPanel>
  );
};

export default MMCCalculator;
