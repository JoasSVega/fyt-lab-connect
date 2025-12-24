import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Droplets, FlaskRound, Pill, Syringe } from "lucide-react";
import Seo from "@/components/Seo";
import { usePageReady } from "@/hooks/usePageReady";
import CalculatorModal from "@/components/calculators/CalculatorModal";
import { CalculatorsRegistry } from "@/lib/calculators";
// Migrado a modal unificado
// Migrados a modal unificado

const Clinicos: React.FC = () => {
  usePageReady(); // Sincronización con TransitionProvider
  const [openRenal, setOpenRenal] = React.useState(false);
  const [openHepatic, setOpenHepatic] = React.useState(false);
  const [openDose, setOpenDose] = React.useState(false);
  const [openDCM, setOpenDCM] = React.useState(false);
  const [openInf, setOpenInf] = React.useState(false);
  const [openReconst, setOpenReconst] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title" role="region">
      {/* SEO meta */}
      <Seo
        title="Cálculos Clínicos y Farmacéuticos | Herramientas para profesionales de la salud"
        description="Optimiza tus decisiones terapéuticas con cálculos precisos basados en evidencia: función renal (Cockcroft-Gault, MDRD, CKD-EPI), dosis, infusión y reconstitución."
        keywords={["cálculos clínicos", "farmacéuticos", "función renal", "dosis", "infusión", "reconstitución", "Cockcroft-Gault", "MDRD", "CKD-EPI"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/herramientas/clinicos"
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-600 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><button onClick={()=>navigate("/")} className="underline-offset-2 hover:underline">Inicio</button></li>
          <li className="opacity-60" aria-hidden="true">/</li>
          <li><button onClick={()=>navigate("/herramientas")} className="underline-offset-2 hover:underline">Herramientas</button></li>
          <li className="opacity-60" aria-hidden="true">/</li>
          <li className="font-medium">Cálculos Clínicos y Farmacéuticos</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2 min-w-0">
        <Stethoscope className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h1
          id="page-title"
          className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 break-words whitespace-normal leading-snug min-w-0"
          style={{ hyphens: 'none' }}
        >
          Cálculos Clínicos y Farmacéuticos
        </h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Optimiza tus decisiones terapéuticas con cálculos precisos y basados en evidencia.</p>
      <p className="text-sm text-muted-foreground mb-6">Accede rápidamente a herramientas para estimar función renal, calcular dosis, programar infusiones y estandarizar procesos de reconstitución.</p>

  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 py-4 overflow-visible" aria-label="Herramientas clínicas">
        {/* Dosis de Carga y Mantenimiento (DC/DM) */}
        <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#6366F122', color: '#6366F1' }}>
              <Syringe className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Dosis de Carga y Mantenimiento (DC/DM)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Calcula la dosis de carga y la de mantenimiento a partir de Cp, Vd, F, intervalo y Cl.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenDCM(true)} className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-dcdm"
            open={openDCM}
            onOpenChange={setOpenDCM}
            title={CalculatorsRegistry.loadingMaintenance.title}
            subtitle={CalculatorsRegistry.loadingMaintenance.subtitle}
            fields={CalculatorsRegistry.loadingMaintenance.fields}
            formulas={CalculatorsRegistry.loadingMaintenance.formulas}
            categoryColor={CalculatorsRegistry.loadingMaintenance.color}
            icon={<Syringe className="w-5 h-5" style={{ color: CalculatorsRegistry.loadingMaintenance.color }} />}
          />
        </div>

        {/* Dosis por Peso y Superficie Corporal (SC) */}
  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#0EA5E922', color: '#0EA5E9' }}>
              <Pill className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Dosis por Peso y Superficie Corporal (SC)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Calcula la dosis total según peso (mg/kg o µg/kg) o superficie corporal (mg/m² o µg/m²).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenDose(true)} className="px-4 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-dose"
            open={openDose}
            onOpenChange={setOpenDose}
            title={CalculatorsRegistry.dose.title}
            subtitle={CalculatorsRegistry.dose.subtitle}
            fields={CalculatorsRegistry.dose.fields}
            formulas={CalculatorsRegistry.dose.formulas}
            categoryColor={CalculatorsRegistry.dose.color}
            icon={<Pill className="w-5 h-5" style={{ color: CalculatorsRegistry.dose.color }} />}
          />
        </div>

        {/* Función Hepática */}
  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F59E0B22', color: '#F59E0B' }}>
              <FlaskRound className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Función Hepática</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Child‑Pugh, MELD/MELD‑Na, APRI y FIB‑4 para evaluar severidad y fibrosis.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenHepatic(true)} className="px-4 py-2 rounded-md bg-amber-600 text-white font-semibold hover:bg-amber-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-hepatic"
            open={openHepatic}
            onOpenChange={setOpenHepatic}
            title={CalculatorsRegistry.hepatic.title}
            subtitle={CalculatorsRegistry.hepatic.subtitle}
            fields={CalculatorsRegistry.hepatic.fields}
            formulas={CalculatorsRegistry.hepatic.formulas}
            categoryColor={CalculatorsRegistry.hepatic.color}
            icon={<FlaskRound className="w-5 h-5" style={{ color: CalculatorsRegistry.hepatic.color }} />}
          />
        </div>

        {/* Función Renal */}
  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#3B82F622', color: '#3B82F6' }}>
              <Droplets className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Función Renal</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Estima TFG/aclaramiento con Cockcroft–Gault, MDRD y CKD‑EPI.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenRenal(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-renal"
            open={openRenal}
            onOpenChange={setOpenRenal}
            title={CalculatorsRegistry.renal.title}
            subtitle={CalculatorsRegistry.renal.subtitle}
            fields={CalculatorsRegistry.renal.fields}
            formulas={CalculatorsRegistry.renal.formulas}
            categoryColor={CalculatorsRegistry.renal.color}
            icon={<Droplets className="w-5 h-5" style={{ color: CalculatorsRegistry.renal.color }} />}
          />
        </div>

        {/* Reconstitución y Dilución de Antibióticos */}
  <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#64748B22', color: '#64748B' }}>
              <Syringe className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Reconstitución y Dilución de Antibióticos</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Calcula concentración tras reconstitución, volumen para la dosis y dilución final.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenReconst(true)} className="px-4 py-2 rounded-md bg-slate-700 text-white font-semibold transition-transform duration-150 hover:scale-105 hover:bg-slate-800">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-reconst"
            open={openReconst}
            onOpenChange={setOpenReconst}
            title={CalculatorsRegistry.reconstitution.title}
            subtitle={CalculatorsRegistry.reconstitution.subtitle}
            fields={CalculatorsRegistry.reconstitution.fields}
            formulas={CalculatorsRegistry.reconstitution.formulas}
            categoryColor={CalculatorsRegistry.reconstitution.color}
            icon={<Syringe className="w-5 h-5" style={{ color: CalculatorsRegistry.reconstitution.color }} />}
          />
        </div>

        {/* Velocidad de Infusión (VI) */}
        <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-1 min-w-0 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#14b8a622', color: '#14b8a6' }}>
              <Syringe className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>Velocidad de Infusión (VI)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Estima mL/h a partir de volumen/tiempo, dosis/concentración y opcionalmente gotas/min.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenInf(true)} className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700">Abrir Calculadora</button>
          </div>
          <CalculatorModal
            id="calc-vi"
            open={openInf}
            onOpenChange={setOpenInf}
            title={CalculatorsRegistry.infusion.title}
            subtitle={CalculatorsRegistry.infusion.subtitle}
            fields={CalculatorsRegistry.infusion.fields}
            formulas={CalculatorsRegistry.infusion.formulas}
            categoryColor={CalculatorsRegistry.infusion.color}
            icon={<Syringe className="w-5 h-5" style={{ color: CalculatorsRegistry.infusion.color }} />}
          />
        </div>
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </div>
  );
};

export default Clinicos;
