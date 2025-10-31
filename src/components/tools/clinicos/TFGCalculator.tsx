import * as React from "react";
import ModalCalculator from "@/components/tools/common/ModalCalculator";
import NumberField from "@/components/inputs/NumberField";
import { Button } from "@/components/ui/button";
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
  const [flipped, setFlipped] = React.useState(false);

  const calc = React.useCallback(() => {
    if (!age || !weight || !scr) return;
    const val = cockcroftGault(Number(age), Number(weight), Number(scr), sex, 'mgdl');
    setResult(val);
    setFlipped(true);
  }, [age, weight, scr, sex]);

  const reset = React.useCallback(() => {
    setFlipped(false);
    setResult(null);
  }, []);

  const risk = React.useMemo(() => {
    if (result == null) return '';
    if (result < 30) return 'TFG muy reducida: alto riesgo';
    if (result < 60) return 'TFG reducida: riesgo moderado';
    return 'TFG > 60 ml/min: rango conservado';
  }, [result]);

  return (
    <ModalCalculator open={open} onOpenChange={onOpenChange} flipped={flipped}
      title={<span style={{ color }} className="font-bold">Función renal (Cockcroft-Gault)</span>}
      description="Estimación rápida del aclaramiento de creatinina (ml/min).">
      <ModalCalculator.Front>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField id="tfg-age" label="Edad" name="age" value={String(age)} onChange={(e)=>setAge(Number(e.target.value))} min={18} max={120} required />
          <NumberField id="tfg-weight" label="Peso" name="weight" value={String(weight)} onChange={(e)=>setWeight(Number(e.target.value))} min={20} max={300} unit="kg" required />
          <NumberField id="tfg-scr" label="Creatinina sérica" name="scr" value={String(scr)} onChange={(e)=>setScr(Number(e.target.value))} min={0.1} unit="mg/dL" required />
          <div>
            <label className="block font-medium mb-1">Sexo</label>
            <select value={sex} onChange={(e)=>setSex(e.target.value as Sex)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={calc} className="bg-blue-600 hover:bg-blue-700">Calcular</Button>
          <Button variant="outline" onClick={reset}>Limpiar</Button>
          {onOpenAdvanced && (
            <Button variant="ghost" onClick={onOpenAdvanced}>Versión avanzada</Button>
          )}
        </div>
      </ModalCalculator.Front>
      <ModalCalculator.Back>
        <div className="p-2">
          <div className="text-xl font-semibold">Resultado</div>
          {result != null ? (
            <>
              <div className="mt-2 text-3xl font-mono">{result.toFixed(2)} ml/min</div>
              <div className="mt-3 text-sm text-muted-foreground">{risk}</div>
            </>
          ) : null}
          <div className="mt-5">
            <Button onClick={reset}>Volver</Button>
          </div>
        </div>
      </ModalCalculator.Back>
    </ModalCalculator>
  );
};

export default TFGCalculator;
