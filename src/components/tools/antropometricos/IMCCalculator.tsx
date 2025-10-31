import * as React from "react";
import ModalCalculator from "@/components/tools/common/ModalCalculator";
import NumberField from "@/components/inputs/NumberField";
import { Button } from "@/components/ui/button";

const bmi = (w: number, hCm: number) => w / Math.pow(hCm/100, 2);

const IMCCalculator: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#0ea5e9' }) => {
  const [w, setW] = React.useState(70 as number | "");
  const [h, setH] = React.useState(170 as number | "");
  const [res, setRes] = React.useState<number | null>(null);
  const [flipped, setFlipped] = React.useState(false);

  const calc = () => {
    if (!w || !h) return;
    setRes(bmi(Number(w), Number(h)));
    setFlipped(true);
  };
  const reset = () => { setFlipped(false); setRes(null); };

  const msg = React.useMemo(()=>{
    if (res == null) return '';
    if (res < 18.5) return 'Bajo peso';
    if (res < 25) return 'Normopeso';
    if (res < 30) return 'Sobrepeso';
    return 'Obesidad';
  }, [res]);

  return (
    <ModalCalculator open={open} onOpenChange={onOpenChange} flipped={flipped}
      title={<span style={{ color }} className="font-bold">IMC</span>}
      description="Índice de masa corporal (kg/m²) con categorización clínica.">
      <ModalCalculator.Front>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField id="bmi-w" label="Peso" name="w" value={String(w)} onChange={(e)=>setW(Number(e.target.value))} min={20} max={300} unit="kg" required />
          <NumberField id="bmi-h" label="Talla" name="h" value={String(h)} onChange={(e)=>setH(Number(e.target.value))} min={100} max={250} unit="cm" required />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={calc} className="bg-sky-600 hover:bg-sky-700">Calcular</Button>
          <Button variant="outline" onClick={reset}>Limpiar</Button>
        </div>
      </ModalCalculator.Front>
      <ModalCalculator.Back>
        <div className="p-2">
          {res != null && (
            <>
              <div className="text-3xl font-mono">{res.toFixed(2)} kg/m²</div>
              <div className="mt-3 text-sm text-muted-foreground">{msg}</div>
            </>
          )}
          <div className="mt-5">
            <Button onClick={reset}>Volver</Button>
          </div>
        </div>
      </ModalCalculator.Back>
    </ModalCalculator>
  );
};

export default IMCCalculator;
