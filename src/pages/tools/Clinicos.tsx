import * as React from "react";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
const TFGCalculator = lazy(() => import("@/components/tools/clinicos/TFGCalculator"));
import { pathRenal } from "@/pages/RenalFunctionPage";
import Seo from "@/components/Seo";

const Clinicos: React.FC = () => {
  const [openTFG, setOpenTFG] = React.useState(false);
  const navigate = useNavigate();

  return (
    <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title">
      {/* SEO meta */}
      <Seo
        title="Cálculos Clínicos y Farmacéuticos | Herramientas para profesionales de la salud"
        description="Optimiza tus decisiones terapéuticas con cálculos precisos basados en evidencia: función renal (Cockcroft-Gault, MDRD, CKD-EPI), dosis, infusión y reconstitución."
        keywords={["cálculos clínicos", "farmacéuticos", "función renal", "dosis", "infusión", "reconstitución", "Cockcroft-Gault", "MDRD", "CKD-EPI"]}
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
          <li className="font-medium">Cálculos clínicos y farmacéuticos</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2">
        <Stethoscope className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h1 id="page-title" className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Cálculos clínicos y farmacéuticos</h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Optimiza tus decisiones terapéuticas con cálculos precisos y basados en evidencia.</p>
      <p className="text-sm text-muted-foreground mb-6">Accede rápidamente a herramientas para estimar función renal, calcular dosis, programar infusiones y estandarizar procesos de reconstitución.</p>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" aria-label="Herramientas clínicas">
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

        {/* Dosis de carga / mantenimiento */}
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Dosis de carga / mantenimiento</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        {/* Velocidad de infusión */}
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Velocidad de infusión</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
        {/* Reconstitución de antibióticos */}
        <div className="rounded-2xl border-2 bg-white/60 p-6">
          <h3 className="text-lg font-semibold">Reconstitución de antibióticos</h3>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-10 text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </main>
  );
};

export default Clinicos;
