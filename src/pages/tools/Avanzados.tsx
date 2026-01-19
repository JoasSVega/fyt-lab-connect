import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import Seo from "@/components/Seo";
import { usePageReady } from "@/hooks/usePageReady";
import ToolsSmallHero from "@/components/tools/ToolsSmallHero";
import ToolsSubNav from "@/components/tools/ToolsSubNav";
// Cards migradas a la sección de Cálculos Clínicos

const Avanzados: FC = () => {
  usePageReady(); // Sincronización con TransitionProvider
  const navigate = useNavigate();
  // Calculadoras avanzadas específicas migradas a Cálculos Clínicos y Farmacéuticos

  return (
    <div className="w-full bg-background flex flex-col">
      {/* SEO meta */}
      <Seo
        title="Herramientas Farmacéuticas Avanzadas y Conversores | Herramientas para profesionales de la salud"
        description="Convierte, calcula y analiza compatibilidad y estabilidad: conversores, osmolaridad IV, compatibilidad, dilución y nutrición parenteral."
        keywords={["compatibilidad IV", "osmolaridad", "dilución", "nutrición parenteral", "conversores", "herramientas avanzadas"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/herramientas/avanzados"
      />

      <ToolsSmallHero
        title="Herramientas Farmacéuticas Avanzadas y Conversores"
        subtitle="Convierte, compara y analiza compatibilidades y estabilidad."
        icon={Zap}
        color="#16A34A"
      />

      <ToolsSubNav />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title" role="region">

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
      </div>
    </div>
  );
};

export default Avanzados;
