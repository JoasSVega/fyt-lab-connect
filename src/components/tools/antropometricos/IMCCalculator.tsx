import * as React from "react";
import CalculatorPanel from "@/components/tools/common/CalculatorPanel";
import NumberField from "@/components/inputs/NumberField";

const bmi = (w: number, hCm: number) => w / Math.pow(hCm/100, 2);

const IMCCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#f97316' }) => {
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [res, setRes] = React.useState<number | null>(null);
  const [error, setError] = React.useState("");

  const calc = () => {
    setError("");
    if (w === "" || h === "") { setError("Complete peso y talla"); return; }
    setRes(bmi(Number(w), Number(h)));
  };
  const reset = () => { setRes(null); setW(""); setH(""); setError(""); };

  const msg = React.useMemo(()=>{
    if (res == null) return '';
    if (res < 18.5) return 'Bajo peso';
    if (res < 25) return 'Normopeso';
    if (res < 30) return 'Sobrepeso';
    return 'Obesidad';
  }, [res]);

  return (
    <CalculatorPanel
      open={open}
      onOpenChange={onOpenChange}
      color={color}
      title={<>IMC</>}
      description="Índice de masa corporal (kg/m²) con categorización clínica."
      onCalculate={calc}
      onClear={reset}
      primaryButtonClass="bg-orange-600 hover:bg-orange-700"
      // Añadimos un placeholder invisible para usar la misma franja/divisor
      // de 'selector de fórmula' que en CEB y así igualar la distribución
      // vertical de secciones (inputs → divisor → acciones → resultado).
      formulaSelector={<div className="h-0" aria-hidden />}
      errorMessage={error}
      result={res != null ? (
        <>
          <div className="text-3xl font-mono">{res.toFixed(2)} kg/m²</div>
          <div className="mt-2 text-sm text-muted-foreground">{msg}</div>
        </>
      ) : undefined}
    >
      <NumberField id="bmi-w" label="Peso" name="w" placeholder="p. ej., 72" value={w === "" ? "" : String(w)} onChange={(e)=>setW(e.target.value === "" ? "" : Number(e.target.value))} min={20} max={300} unit="kg" required />
      <NumberField id="bmi-h" label="Talla" name="h" placeholder="p. ej., 170" value={h === "" ? "" : String(h)} onChange={(e)=>setH(e.target.value === "" ? "" : Number(e.target.value))} min={100} max={250} unit="cm" required />
    </CalculatorPanel>
  );
};

export default IMCCalculator;
