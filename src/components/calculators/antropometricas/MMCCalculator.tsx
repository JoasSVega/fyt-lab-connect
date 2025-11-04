import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import SelectField from "@/components/inputs/SelectField";
import { mmcJames, mmcHume, leanMassFromBf, Sex } from "./formulas";

type Props = { open: boolean; onOpenChange: (v: boolean) => void; color?: string; defaultFormula?: 'james'|'hume'|'lean' };

const MMCCalculator: React.FC<Props> = ({ open, onOpenChange, color = "#0891b2", defaultFormula = 'james' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [sex, setSex] = React.useState<Sex>("male");
  const [bf, setBf] = React.useState<number | "">("");
  const [formula, setFormula] = React.useState<"james" | "hume" | "lean">(defaultFormula);
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string>("");

  const calc = () => {
    setError("");
    let val = 0;
    if (formula === "lean") {
      if (w === "" || bf === "") { setError("Complete peso y % de grasa corporal"); return; }
      val = leanMassFromBf(Number(w), Number(bf));
    } else {
      if (w === "" || h === "") { setError("Complete peso y talla"); return; }
      const weight = Number(w);
      const height = Number(h);
      val = formula === "james" ? mmcJames(sex, weight, height) : mmcHume(sex, weight, height);
    }
    setRes(val);
  };

  const reset = () => {
    setRes(null);
    setW("");
    setH("");
    setSex("male");
    setBf("");
    setFormula(defaultFormula);
    setError("");
  };

  // Sincroniza la fórmula por defecto cuando se abre desde distintas tarjetas
  React.useEffect(() => {
    if (open) {
      setFormula(defaultFormula);
    }
  }, [open, defaultFormula]);

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Masa magra corporal (MMC)</>}
  description="Seleccione fórmula: James, Hume o a partir de % de grasa corporal."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-cyan-700 hover:bg-cyan-800"
      formulaSelector={
        <SelectField
          id="mmc-formula"
          ariaLabel="Fórmula MMC"
          value={formula}
          onChange={(e)=>setFormula(e.target.value as 'james'|'hume'|'lean')}
          options={[
            { value: 'james', label: 'James (1980)' },
            { value: 'hume', label: 'Hume (1966)' },
            { value: 'lean', label: 'Lean mass (% grasa)' },
          ]}
        />
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
      {formula === 'lean' ? (
        <NumberField
          id="mmc-bf"
          label="% Grasa corporal"
          name="bf"
          value={bf === "" ? "" : String(bf)}
          onChange={(e) => setBf(e.target.value === "" ? "" : Number(e.target.value))}
          min={0}
          max={100}
          unit="%"
          required
        />
      ) : (
        <>
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
          <SelectField
            id="mmc-sex"
            label="Sexo"
            value={sex}
            onChange={(e)=>setSex(e.target.value as Sex)}
            options={[{ value: 'male', label: 'Masculino' }, { value: 'female', label: 'Femenino' }]}
          />
        </>
      )}
    </CalculatorPanel>
  );
};

export default MMCCalculator;
