import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, HeartPulse, Brain, AlertTriangle, TestTube } from "lucide-react";
import Seo from "@/components/Seo";
import CURB65Tool from "@/components/tools/CURB65Tool";
import GlasgowTool from "@/components/tools/GlasgowTool";
import HASBLEDTool from "@/components/tools/HASBLEDTool";
import CHA2DS2VAScTool from "@/components/tools/CHA2DS2VAScTool";

const Escalas: React.FC = () => {
  const navigate = useNavigate();

  const Card = ({ icon, title, desc, color = "#a855f7", action }: { icon: React.ReactNode; title: string; desc: string; color?: string; action?: React.ReactNode; }) => (
    <div className="tool-card rounded-2xl border-2 bg-white/90 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl p-6 flex flex-col" role="article" aria-label={title}>
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-3 min-w-0 text-center sm:text-left">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + "22", color }}>
          {icon}
          <span className="sr-only">Icono de {title}</span>
        </div>
        <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold text-black break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
      {action ? (
        <div className="mt-auto">{action}</div>
      ) : (
        <button
          type="button"
          className="mt-auto px-4 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2"
          aria-label={`Explorar ${title}`}
        >
          Explorar
        </button>
      )}
    </div>
  );

  return (
    <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title">
      {/* SEO meta */}
      <Seo
        title="Escalas Clínicas y Validación Farmacoterapéutica | Herramientas Farmacéuticas"
        description="Evalúa la seguridad, riesgo y efectividad del tratamiento farmacológico mediante escalas clínicas validadas como HAS-BLED, CHA₂DS₂-VASc, CURB-65 y Glasgow."
        keywords={["escalas clínicas", "HAS-BLED", "CHA2DS2-VASc", "CURB-65", "Glasgow", "validación farmacoterapéutica"]}
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
          <li className="font-medium">Escalas Clínicas</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-3 mb-2 min-w-0">
        <ClipboardCheck className="w-6 h-6 text-violet-600" aria-hidden="true" />
        <h1 id="page-title" className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 break-words whitespace-normal leading-snug min-w-0" style={{ hyphens: 'none' }}>Escalas Clínicas y Validación Farmacoterapéutica</h1>
      </header>
      <p className="text-base text-muted-foreground mb-2">Evalúa riesgo, seguridad y efectividad terapéutica con escalas validadas clínicamente.</p>
      <p className="text-sm text-muted-foreground mb-6">Esta sección reúne herramientas para apoyar la toma de decisiones farmacoterapéuticas, estandarizando la valoración clínica y facilitando la comunicación interdisciplinaria.</p>

  {/* Grid */}
  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 py-4 overflow-visible" aria-label="Escalas clínicas disponibles">
        <Card
          icon={<AlertTriangle className="w-7 h-7" />}
          title="Riesgo de sangrado en anticoagulación (HAS-BLED)"
          desc="Riesgo de sangrado en anticoagulación."
          color="#e53935"
          action={<HASBLEDTool />}
        />
        <Card
          icon={<HeartPulse className="w-7 h-7" />}
          title="Riesgo de eventos tromboembólicos (CHA₂DS₂-VASc)"
          desc="Riesgo de eventos tromboembólicos."
          color="#43a047"
          action={<CHA2DS2VAScTool />}
        />
        <Card
          icon={<TestTube className="w-7 h-7" />}
          title="Severidad de neumonía adquirida en la comunidad (CURB-65)"
          desc="Severidad de la neumonía adquirida en la comunidad."
          color="#fb8c00"
          action={<CURB65Tool />}
        />
        <Card
          icon={<Brain className="w-7 h-7" />}
          title="Escala de Glasgow (GCS)"
          desc="Evaluación del estado neurológico del paciente."
          color="#8e24aa"
          action={<GlasgowTool />}
        />
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
    </main>
  );
};

export default Escalas;
