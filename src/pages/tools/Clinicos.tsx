import * as React from "react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import Seo from "@/components/Seo";
// Unificado: modal reutilizable
import CalculatorModal from "@/components/calculators/CalculatorModal";
import { CalculatorsRegistry } from "@/lib/calculators";
// Migrado a modal unificado
// Migrados a modal unificado

const Clinicos: React.FC = () => {
  const [openRenal, setOpenRenal] = React.useState(false);
  const [openHepatic, setOpenHepatic] = React.useState(false);
  const [openDose, setOpenDose] = React.useState(false);
  const [openReconst, setOpenReconst] = React.useState(false);
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
          <p className="text-sm text-muted-foreground mb-4">Estima TFG/aclaramiento con Cockcroft–Gault, MDRD y CKD‑EPI.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenRenal(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">Abrir calculadora</button>
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
          />
        </div>

        {/* Función hepática */}
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#F59E0B' }}>Función hepática</h3>
          <p className="text-sm text-muted-foreground mb-4">Child‑Pugh, MELD/MELD‑Na, APRI y FIB‑4 para evaluar severidad y fibrosis.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenHepatic(true)} className="px-4 py-2 rounded-md bg-amber-600 text-white font-semibold hover:bg-amber-700">Abrir calculadora</button>
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
          />
        </div>

        {/* Dosis por peso y superficie corporal */}
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#0EA5E9' }}>Dosis por peso y SC</h3>
          <p className="text-sm text-muted-foreground mb-4">Calcula la dosis total según peso (mg/kg o µg/kg) o superficie corporal (mg/m² o µg/m²).</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenDose(true)} className="px-4 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700">Abrir calculadora</button>
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
          />
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
        {/* Reconstitución y dilución de antibióticos */}
        <div className="rounded-2xl border-2 bg-white/90 shadow-lg p-6 flex flex-col">
          <h3 className="text-xl font-raleway font-bold mb-1" style={{ color: '#64748B' }}>Reconstitución y dilución de antibióticos</h3>
          <p className="text-sm text-muted-foreground mb-4">Calcula concentración tras reconstitución, volumen para la dosis y dilución final.</p>
          <div className="mt-auto">
            <button onClick={()=>setOpenReconst(true)} className="px-4 py-2 rounded-md bg-slate-700 text-white font-semibold transition-transform duration-150 hover:scale-105 hover:bg-slate-800">Abrir calculadora</button>
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
          />
        </div>
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </main>
  );
};

export default Clinicos;
