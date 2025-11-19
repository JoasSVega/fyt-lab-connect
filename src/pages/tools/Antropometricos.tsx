import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Ruler, Maximize2, Percent, Flame, Target, Droplets, Activity } from "lucide-react";
import Seo from "@/components/Seo";
import CalculatorModal from "@/components/calculators/CalculatorModal";
import ImcHybridCalculator from "@/components/calculators/ImcHybrid";
import { CalculatorsRegistry } from "@/lib/calculators";

const Antropometricos: React.FC = () => {
  const [openIMC, setOpenIMC] = React.useState(false);
  const [openBSA, setOpenBSA] = React.useState(false);
  const [openBF, setOpenBF] = React.useState(false);
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
          <li className="font-medium">Cálculos Fisiológicos y Antropométricos</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2 min-w-0">
        <Ruler className="w-6 h-6 text-sky-600" aria-hidden="true" />
        <h1 id="page-title" className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 break-words whitespace-normal leading-snug min-w-0" style={{ hyphens: 'none' }}>Cálculos Fisiológicos y Antropométricos</h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Determina parámetros corporales clave para farmacocinética.</p>
      <p className="text-sm text-muted-foreground mb-6">Accede a una suite de herramientas antropométricas con diseño unificado para análisis rápido y comparables.</p>

  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 py-4 overflow-visible" aria-label="Herramientas fisiológicas y antropométricas">
  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#0ea5e922', color: '#0ea5e9' }}>
              <Ruler className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Índice de Masa Corporal (IMC)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Índice de masa corporal (kg/m²) con categorización básica.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenIMC(true)} className="px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700">Abrir Calculadora</button>
          </div>
          <ImcHybridCalculator
            open={openIMC}
            onOpenChange={setOpenIMC}
            categoryColor={CalculatorsRegistry.bmi.color}
          />
        </div>

  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#10b98122', color: '#10b981' }}>
              <Maximize2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Superficie Corporal (SC)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Selector de fórmula: DuBois, Gehan-George o Haycock (m²).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBSA(true)} className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-bsa"
            open={openBSA}
            onOpenChange={setOpenBSA}
            title={CalculatorsRegistry.bsa.title}
            subtitle={CalculatorsRegistry.bsa.subtitle}
            fields={CalculatorsRegistry.bsa.fields}
            formulas={CalculatorsRegistry.bsa.formulas}
            categoryColor={CalculatorsRegistry.bsa.color}
            icon={<Maximize2 className="w-5 h-5" style={{ color: CalculatorsRegistry.bsa.color }} />}
          />
        </div>

  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#a855f722', color: '#a855f7' }}>
              <Percent className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Porcentaje de Grasa Corporal (%GC)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Ecuación de Deurenberg (IMC, edad y sexo).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBF(true)} className="px-4 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-bf"
            open={openBF}
            onOpenChange={setOpenBF}
            title={CalculatorsRegistry.bodyFat.title}
            subtitle={CalculatorsRegistry.bodyFat.subtitle}
            fields={CalculatorsRegistry.bodyFat.fields}
            formulas={CalculatorsRegistry.bodyFat.formulas}
            categoryColor={CalculatorsRegistry.bodyFat.color}
            icon={<Percent className="w-5 h-5" style={{ color: CalculatorsRegistry.bodyFat.color }} />}
          />
        </div>

  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#0891b222', color: '#0891b2' }}>
              <Activity className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Masa Magra Corporal (MMC)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">James, Hume o a partir de % de grasa.</p>
          <div className="mt-auto">
            <button onClick={()=> setOpenMMC(true)} className="px-4 py-2 rounded-md bg-cyan-700 text-white font-semibold hover:bg-cyan-800">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-mmc"
            open={openMMC}
            onOpenChange={setOpenMMC}
            title={CalculatorsRegistry.mmc.title}
            subtitle={CalculatorsRegistry.mmc.subtitle}
            fields={CalculatorsRegistry.mmc.fields}
            formulas={CalculatorsRegistry.mmc.formulas}
            categoryColor={CalculatorsRegistry.mmc.color}
            icon={<Activity className="w-5 h-5" style={{ color: CalculatorsRegistry.mmc.color }} />}
          />
        </div>

  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#0d948822', color: '#0d9488' }}>
              <Target className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Peso Ideal (PI)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Selector: Devine, Robinson o Miller.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenPI(true)} className="px-4 py-2 rounded-md bg-teal-700 text-white font-semibold hover:bg-teal-800">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-ideal"
            open={openPI}
            onOpenChange={setOpenPI}
            title={CalculatorsRegistry.idealWeight.title}
            subtitle={CalculatorsRegistry.idealWeight.subtitle}
            fields={CalculatorsRegistry.idealWeight.fields}
            formulas={CalculatorsRegistry.idealWeight.formulas}
            categoryColor={CalculatorsRegistry.idealWeight.color}
            icon={<Target className="w-5 h-5" style={{ color: CalculatorsRegistry.idealWeight.color }} />}
          />
        </div>

  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#f9731622', color: '#f97316' }}>
              <Flame className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Consumo Energético Basal (CEB)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Consumo energético basal: Harris-Benedict o Mifflin–St Jeor.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenBMR(true)} className="px-4 py-2 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-bmr"
            open={openBMR}
            onOpenChange={setOpenBMR}
            title={CalculatorsRegistry.bmr.title}
            subtitle={CalculatorsRegistry.bmr.subtitle}
            fields={CalculatorsRegistry.bmr.fields}
            formulas={CalculatorsRegistry.bmr.formulas}
            categoryColor={CalculatorsRegistry.bmr.color}
            icon={<Flame className="w-5 h-5" style={{ color: CalculatorsRegistry.bmr.color }} />}
          />
        </div>

        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform transition-shadow duration-200 ease-out hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#16a34a22', color: '#16a34a' }}>
              <Droplets className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Agua Corporal Total (ACT)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Agua corporal total: Watson o Chumlea.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenACT(true)} className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-act"
            open={openACT}
            onOpenChange={setOpenACT}
            title={CalculatorsRegistry.act.title}
            subtitle={CalculatorsRegistry.act.subtitle}
            fields={CalculatorsRegistry.act.fields}
            formulas={CalculatorsRegistry.act.formulas}
            categoryColor={CalculatorsRegistry.act.color}
            icon={<Droplets className="w-5 h-5" style={{ color: CalculatorsRegistry.act.color }} />}
          />
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
