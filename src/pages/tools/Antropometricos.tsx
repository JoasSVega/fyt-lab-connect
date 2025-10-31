import * as React from "react";
import { Ruler } from "lucide-react";
import IMCCalculator from "@/components/tools/antropometricos/IMCCalculator";
import SuperficieCorporal from "@/components/tools/antropometricos/SuperficieCorporal";

const Antropometricos: React.FC = () => {
  const [openIMC, setOpenIMC] = React.useState(false);
  const [openBSA, setOpenBSA] = React.useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Ruler className="w-6 h-6 text-sky-600" />
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Fisiológicos y antropométricos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#0ea5e9' }}>IMC</h3>
          <p className="text-sm text-muted-foreground mb-4">Índice de masa corporal (kg/m²) con categorización básica.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenIMC(true)} className="px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700">Abrir calculadora</button>
          </div>
          <IMCCalculator open={openIMC} onOpenChange={setOpenIMC} />
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#10b981' }}>Superficie corporal</h3>
          <p className="text-sm text-muted-foreground mb-4">Fórmula de Mosteller para estimación rápida (m²).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBSA(true)} className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Abrir calculadora</button>
          </div>
          <SuperficieCorporal open={openBSA} onOpenChange={setOpenBSA} />
        </div>

        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Relación cintura-cadera</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default Antropometricos;
