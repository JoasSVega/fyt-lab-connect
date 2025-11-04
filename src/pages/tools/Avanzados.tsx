import * as React from "react";
import { FlaskConical } from "lucide-react";
import Seo from "@/components/Seo";

const Avanzados: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <Seo
        title="Herramientas farmacéuticas avanzadas | Herramientas"
        description="Conversor de unidades, osmolaridad IV, compatibilidad IV, dilución IV y nutrición parenteral. Próximamente."
      />
      <div className="flex items-center gap-3 mb-6">
        <FlaskConical className="w-6 h-6 text-emerald-600" />
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Herramientas farmacéuticas avanzadas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Conversor de unidades farmacéuticas</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Osmolaridad IV</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Compatibilidad IV</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Dilución IV</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Nutrición parenteral</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </div>
    </div>
  );
};

export default Avanzados;
