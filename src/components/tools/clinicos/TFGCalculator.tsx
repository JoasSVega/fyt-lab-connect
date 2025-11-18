import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";
import SelectField from "@/components/inputs/SelectField";
import { cockcroftGault } from "@/utils/renal";

// Calculadora breve de Cockcroft-Gault para TFG aproximada (ClCr)
// Mantiene consistencia visual con el resto y ofrece botón para ir a la página avanzada.

type Sex = 'male' | 'female';

const TFGCalculator: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void; onOpenAdvanced?: () => void; color?: string; }>
= ({ open, onOpenChange, onOpenAdvanced, color = '#3B82F6' }) => {
  const [age, setAge] = React.useState(60 as number | "");
  const [weight, setWeight] = React.useState(70 as number | "");
  const [scr, setScr] = React.useState(1 as number | "");
  const [sex, setSex] = React.useState<Sex>('male');
  const [result, setResult] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = React.useCallback(() => {
    setError("");
    if (!age || !weight || !scr) { setError("Complete edad, peso y creatinina"); return; }
    const val = cockcroftGault(Number(age), Number(weight), Number(scr), sex, 'mgdl');
    setResult(val);
  }, [age, weight, scr, sex]);

  const reset = React.useCallback(() => {
    setResult(null);
    setError("");
  }, []);

  const risk = React.useMemo(() => {
    if (result == null) return '';
    if (result < 30) return 'TFG muy reducida: alto riesgo';
    if (result < 60) return 'TFG reducida: riesgo moderado';
    return 'TFG > 60 ml/min: rango conservado';
  }, [result]);

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>Función renal (Cockcroft-Gault)</>}
      description="Estimación rápida del aclaramiento de creatinina (ml/min)."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-blue-600 hover:bg-blue-700"
      errorMessage={error}
      result={result != null ? (
        <>
          <div className="text-3xl font-mono">{result.toFixed(2)} ml/min</div>
          <div className="mt-2 text-sm text-muted-foreground">{risk}</div>
          {onOpenAdvanced && (
            <div className="mt-3 text-xs"><button className="underline" onClick={onOpenAdvanced}>Ir a versión avanzada</button></div>
          )}
        </>
      ) : undefined}
    >
      <NumberField id="tfg-age" label="Edad" name="age" placeholder="p. ej., 65" value={String(age)} onChange={(e)=>setAge(Number(e.target.value))} min={18} max={120} required />
      <NumberField id="tfg-weight" label="Peso" name="weight" placeholder="p. ej., 70" value={String(weight)} onChange={(e)=>setWeight(Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="tfg-scr" label="Creatinina sérica" name="scr" placeholder="p. ej., 1.0" value={String(scr)} onChange={(e)=>setScr(Number(e.target.value))} min={0.1} unit="mg/dL" required />
      <SelectField
        id="tfg-sex"
        label="Sexo"
        value={sex}
        onChange={(e)=>setSex(e.target.value as Sex)}
        options={[{ value: 'male', label: 'Masculino' }, { value: 'female', label: 'Femenino' }]}
      />
    </CalculatorPanel>
  );
};

export default TFGCalculator;
