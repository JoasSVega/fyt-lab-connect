import * as React from "react";
import ModalCalculator from "@/components/tools/common/ModalCalculator";
import NumberField from "@/components/inputs/NumberField";
import { Button } from "@/components/ui/button";

const bsaMosteller = (wKg: number, hCm: number) => Math.sqrt((wKg * hCm) / 3600);

const SuperficieCorporal: React.FC<{ open: boolean; onOpenChange: (v:boolean)=>void; color?: string; }>
= ({ open, onOpenChange, color = '#10b981' }) => {
  const [w, setW] = React.useState(70 as number | "");
  const [h, setH] = React.useState(170 as number | "");
  const [res, setRes] = React.useState<number | null>(null);
  const [flipped, setFlipped] = React.useState(false);

  const calc = () => { if (!w || !h) return; setRes(bsaMosteller(Number(w), Number(h))); setFlipped(true); };
  const reset = () => { setFlipped(false); setRes(null); };

  return (
    <ModalCalculator open={open} onOpenChange={onOpenChange} flipped={flipped}
      title={<span style={{ color }} className="font-bold">Superficie corporal</span>}
      description="Fórmula de Mosteller: √(peso×talla/3600).">
      <ModalCalculator.Front>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberField id="bsa-w" label="Peso" name="w" value={String(w)} onChange={(e)=>setW(Number(e.target.value))} min={20} max={300} unit="kg" required />
          <NumberField id="bsa-h" label="Talla" name="h" value={String(h)} onChange={(e)=>setH(Number(e.target.value))} min={100} max={250} unit="cm" required />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={calc} className="bg-emerald-600 hover:bg-emerald-700">Calcular</Button>
          <Button variant="outline" onClick={reset}>Limpiar</Button>
        </div>
      </ModalCalculator.Front>
      <ModalCalculator.Back>
        <div className="p-2">
          {res != null && (
            <div className="text-3xl font-mono">{res.toFixed(2)} m²</div>
          )}
          <div className="mt-5">
            <Button onClick={reset}>Volver</Button>
          </div>
        </div>
      </ModalCalculator.Back>
    </ModalCalculator>
  );
};

export default SuperficieCorporal;
