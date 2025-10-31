import * as React from "react";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
const TFGCalculator = lazy(() => import("@/components/tools/clinicos/TFGCalculator"));
import { pathRenal } from "@/pages/RenalFunctionPage";

const Clinicos: React.FC = () => {
  const [openTFG, setOpenTFG] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Stethoscope className="w-6 h-6 text-blue-600" />
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Cálculos clínicos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Función renal */}
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#3B82F6' }}>Función renal</h3>
          <p className="text-sm text-muted-foreground mb-4">Estimación rápida de aclaramiento de creatinina (Cockcroft-Gault). Incluye acceso a versión avanzada con múltiples fórmulas.</p>
          <div className="mt-auto flex gap-3">
            <button onClick={()=>setOpenTFG(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">Abrir calculadora</button>
            <button onClick={()=>navigate(pathRenal)} className="px-4 py-2 rounded-md border font-semibold hover:bg-blue-50">Versión avanzada</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-blue-100 animate-pulse mt-3" aria-hidden /> }>
            <TFGCalculator open={openTFG} onOpenChange={setOpenTFG} onOpenAdvanced={()=>navigate(pathRenal)} />
          </Suspense>
        </div>

        {/* Placeholders para futuras clínicas */}
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Balance hídrico</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Conversión de electrolitos</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default Clinicos;
