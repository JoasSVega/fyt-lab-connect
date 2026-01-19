import { useState, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Brain, AlertTriangle, TestTube, HeartPulse } from "lucide-react";
import Seo from "@/components/Seo";
import { usePageReady } from "@/hooks/usePageReady";
import ToolsSmallHero from "@/components/tools/ToolsSmallHero";
import ToolsSubNav from "@/components/tools/ToolsSubNav";
import CURB65Tool from "@/components/tools/CURB65Tool";
import GlasgowTool from "@/components/tools/GlasgowTool";
import HASBLEDTool from "@/components/tools/HASBLEDTool";
import CHA2DS2VAScTool from "@/components/tools/CHA2DS2VAScTool";

const Escalas: FC = () => {
  usePageReady(); // Sincronización con TransitionProvider
  const navigate = useNavigate();

  const Card = ({ icon, title, desc, color = "#a855f7", action }: { icon: ReactNode; title: string; desc: string; color?: string; action?: ReactNode; }) => {
    return (
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
            className="mt-auto px-4 py-2 rounded-md bg-violet-600 text-white font-semibold btn-solid-interactive inline-flex items-center gap-2"
            aria-label={`Explorar ${title}`}
          >
            Explorar
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="w-full bg-background flex flex-col">
      {/* SEO meta */}
      <Seo
        title="Escalas Clínicas y Validación Farmacoterapéutica | Herramientas Farmacéuticas"
        description="Evalúa la seguridad, riesgo y efectividad del tratamiento farmacológico mediante escalas clínicas validadas como HAS-BLED, CHA₂DS₂-VASc, CURB-65 y Glasgow."
        keywords={["escalas clínicas", "HAS-BLED", "CHA2DS2-VASc", "CURB-65", "Glasgow", "validación farmacoterapéutica"]}
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/herramientas/escalas"
      />

      <ToolsSmallHero
        title="Escalas Clínicas y Validación Farmacoterapéutica"
        subtitle="Evalúa la seguridad, riesgo y efectividad del tratamiento farmacológico mediante escalas clínicas validadas."
        icon={BarChart3}
        color="#A855F7"
      />

      <ToolsSubNav />

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10" aria-labelledby="page-title" role="region">
  {/* Grid */}
  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 py-4 overflow-visible" aria-label="Escalas clínicas disponibles">
        <Card
          icon={<Brain className="w-7 h-7" />}
          title="Escala de Glasgow (GCS)"
          desc="Evaluación del estado neurológico del paciente."
          color="#8e24aa"
          action={<GlasgowTool />}
        />
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
      </section>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
      </div>
    </div>
  );
};

export default Escalas;
