import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical } from "lucide-react";
import Seo from "@/components/Seo";
// Cards migradas a la sección de Cálculos Clínicos

const Avanzados: React.FC = () => {
  const navigate = useNavigate();
  // Calculadoras avanzadas específicas migradas a Cálculos Clínicos y Farmacéuticos

  return (
    <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title">
      {/* SEO meta */}
      <Seo
        title="Herramientas Farmacéuticas Avanzadas y Conversores | Herramientas para profesionales de la salud"
        description="Convierte, calcula y analiza compatibilidad y estabilidad: conversores, osmolaridad IV, compatibilidad, dilución y nutrición parenteral."
        keywords={["compatibilidad IV", "osmolaridad", "dilución", "nutrición parenteral", "conversores", "herramientas avanzadas"]}
        author="FYT Lab Connect"
        robots="index, follow"
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-600 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><button onClick={()=>navigate("/")} className="underline-offset-2 hover:underline">Inicio</button></li>
          <li className="opacity-60" aria-hidden="true">/</li>
          <li><button onClick={()=>navigate("/herramientas")} className="underline-offset-2 hover:underline">Herramientas</button></li>
          <li className="opacity-60" aria-hidden="true">/</li>
          <li className="font-medium">Herramientas Avanzadas y Conversores</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2">
        <FlaskConical className="w-6 h-6 text-emerald-600" aria-hidden="true" />
        <h1 id="page-title" className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Herramientas Farmacéuticas Avanzadas y Conversores</h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Convierte, compara y analiza compatibilidades y estabilidad.</p>
      <p className="text-sm text-muted-foreground mb-6">Próximamente encontrarás módulos para cálculos IV, compatibilidad, diluciones y soporte a nutrición parenteral.</p>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 py-4 overflow-visible" aria-label="Herramientas avanzadas">
        {/* Calculadoras migradas a Cálculos Clínicos y Farmacéuticos */}

        {/* Espacios reservados existentes */}
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Conversor de Unidades Farmacéuticas</h3>
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
          <h3 className="text-lg font-semibold">Nutrición Parenteral</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </main>
  );
};

export default Avanzados;
