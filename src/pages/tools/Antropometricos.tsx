import * as React from "react";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Ruler } from "lucide-react";
const IMCCalculator = lazy(() => import("@/components/tools/antropometricos/IMCCalculator"));
const BodyFatCalculator = lazy(() => import("@/components/tools/antropometricos/BodyFatCalculator"));
// Selector-based calculators centralizados
const ASCSelectorCalculator = lazy(() => import("@/components/calculators/antropometricas/ASCSelectorCalculator"));
const IdealWeightSelectorCalculator = lazy(() => import("@/components/calculators/antropometricas/IdealWeightSelectorCalculator"));
const CEBSelectorCalculator = lazy(() => import("@/components/calculators/antropometricas/CEBSelectorCalculator"));
const ACTSelectorCalculator = lazy(() => import("@/components/calculators/antropometricas/ACTSelectorCalculator"));
const MMCCalculator = lazy(() => import("@/components/calculators/antropometricas/MMCCalculator"));
import Seo from "@/components/Seo";

const Antropometricos: React.FC = () => {
  const [openIMC, setOpenIMC] = React.useState(false);
  const [openBSA, setOpenBSA] = React.useState(false);
  const [openBF, setOpenBF] = React.useState(false);
  const [mmcDefaultFormula, setMmcDefaultFormula] = React.useState<'james'|'hume'|'lean'>('james');
  const [openPI, setOpenPI] = React.useState(false);
  const [openBMR, setOpenBMR] = React.useState(false);
  const [openACT, setOpenACT] = React.useState(false);
  const [openMMC, setOpenMMC] = React.useState(false);

  const navigate = useNavigate();

  return (
    <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title">
      {/* SEO meta */}
      <Seo
        title="Cálculos Fisiológicos y Antropométricos | Herramientas para profesionales de la salud"
        description="IMC, superficie corporal, masa magra, peso ideal y consumo energético basal en una interfaz unificada."
        keywords={["IMC", "ASC", "masa magra", "peso ideal", "metabolismo basal", "cálculos fisiológicos", "antropometría"]}
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
          <li className="font-medium">Cálculos fisiológicos y antropométricos</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2">
        <Ruler className="w-6 h-6 text-sky-600" aria-hidden="true" />
        <h1 id="page-title" className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Cálculos fisiológicos y antropométricos</h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Determina parámetros corporales clave para farmacocinética.</p>
      <p className="text-sm text-muted-foreground mb-6">Accede a una suite de herramientas antropométricas con diseño unificado para análisis rápido y comparables.</p>

  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" aria-label="Herramientas fisiológicas y antropométricas">
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#0ea5e9' }}>IMC</h3>
          <p className="text-sm text-muted-foreground mb-4">Índice de masa corporal (kg/m²) con categorización básica.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenIMC(true)} className="px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-sky-100 animate-pulse mt-3" aria-hidden /> }>
            <IMCCalculator open={openIMC} onOpenChange={setOpenIMC} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#10b981' }}>Superficie corporal (ASC)</h3>
          <p className="text-sm text-muted-foreground mb-4">Selector de fórmula: DuBois, Gehan-George o Haycock (m²).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBSA(true)} className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-emerald-100 animate-pulse mt-3" aria-hidden /> }>
            <ASCSelectorCalculator open={openBSA} onOpenChange={setOpenBSA} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#a855f7' }}>% Grasa corporal</h3>
          <p className="text-sm text-muted-foreground mb-4">Ecuación de Deurenberg (IMC, edad y sexo).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBF(true)} className="px-4 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-violet-100 animate-pulse mt-3" aria-hidden /> }>
            <BodyFatCalculator open={openBF} onOpenChange={setOpenBF} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#0891b2' }}>Masa magra</h3>
          <p className="text-sm text-muted-foreground mb-4">Incluida en MMC como "Lean mass (% grasa)".</p>
          <div className="mt-auto">
            <button onClick={()=>{ setMmcDefaultFormula('lean'); setOpenMMC(true); }} className="px-4 py-2 rounded-md bg-cyan-700 text-white font-semibold hover:bg-cyan-800">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-cyan-100 animate-pulse mt-3" aria-hidden /> }>
            <MMCCalculator open={openMMC} onOpenChange={setOpenMMC} defaultFormula={mmcDefaultFormula} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#0d9488' }}>Peso ideal</h3>
          <p className="text-sm text-muted-foreground mb-4">Selector: Devine, Robinson o Miller.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenPI(true)} className="px-4 py-2 rounded-md bg-teal-700 text-white font-semibold hover:bg-teal-800">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-teal-100 animate-pulse mt-3" aria-hidden /> }>
            <IdealWeightSelectorCalculator open={openPI} onOpenChange={setOpenPI} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#f97316' }}>CEB</h3>
          <p className="text-sm text-muted-foreground mb-4">Consumo energético basal: Harris-Benedict o Mifflin–St Jeor.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBMR(true)} className="px-4 py-2 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-700">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-orange-100 animate-pulse mt-3" aria-hidden /> }>
            <CEBSelectorCalculator open={openBMR} onOpenChange={setOpenBMR} />
          </Suspense>
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#16a34a' }}>ACT</h3>
          <p className="text-sm text-muted-foreground mb-4">Agua corporal total: Watson o Chumlea.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenACT(true)} className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">Abrir calculadora</button>
          </div>
          <Suspense fallback={<div className="h-10 w-28 rounded-md bg-green-100 animate-pulse mt-3" aria-hidden /> }>
            <ACTSelectorCalculator open={openACT} onOpenChange={setOpenACT} />
          </Suspense>
        </div>

        {/* Tarjeta MMC eliminada para evitar duplicidad: toda la funcionalidad está incluida en 'Masa magra' */}
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </main>
  );
};

export default Antropometricos;
