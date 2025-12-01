import * as React from "react";
import { Stethoscope, Ruler, FlaskConical, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { usePageReady } from "@/hooks/usePageReady";

const Card = ({ icon, title, desc, to, color }: { icon: React.ReactNode; title: string; desc: string; to: string; color: string; }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border-2 bg-white/90 shadow-xl hover:shadow-2xl transition-all p-6 flex flex-col">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-3 min-w-0 text-center sm:text-left">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + '22', color }}>
          {icon}
        </div>
        <h3 className="sm:flex-1 sm:min-w-0 text-xl font-raleway font-bold break-words whitespace-normal leading-snug" style={{ hyphens: 'none' }}>{title}</h3>
      </div>
      <p className="text-muted-foreground flex-1">{desc}</p>
      <Button
        onClick={()=>navigate(to)}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow btn-solid-interactive"
        style={{ backgroundColor: color }}
      >
        Explorar <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

const IndexTools: React.FC = () => {
  usePageReady({
    responsiveImages: ["/images/hero-herramientas"],
  });
  return (
    <>
      <Seo
        title="Herramientas farmacéuticas clínicas y asistenciales"
        description="Explora cálculos clínicos y farmacéuticos, cálculos fisiológicos y antropométricos, escalas clínicas y validación farmacoterapéutica, y herramientas avanzadas y conversores."
      />
      {/* Hero Section con imagen de fondo */}
      <section
        className="hero-container"
        aria-label="Hero Herramientas"
      >
        {/* Imagen de fondo unificada */}
        <picture>
          <source 
            srcSet="/images/hero-herramientas-large.webp" 
            media="(min-width: 1280px)" 
          />
          <source 
            srcSet="/images/hero-herramientas-medium.webp" 
            media="(min-width: 640px)" 
          />
          <img 
            src="/images/hero-herramientas-small.webp" 
            alt="" 
            className="hero-image" 
            aria-hidden="true"
            width={1920}
            height={1080}
          />
        </picture>
        {/* Overlay oscuro unificado */}
        <div className="hero-overlay" />
        {/* Content con text-shadow */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center hero-text-shadow">
          <h1 className="hero-title font-poppins font-extrabold text-white mb-6 tracking-tight">
            Herramientas Digitales para Profesionales Farmacéuticos
          </h1>
          <p className="hero-subtitle font-inter text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Soluciones inteligentes diseñadas para análisis clínico, gestión de datos y optimización de decisiones en entornos sanitarios.
          </p>
        </div>
      </section>
      {/* Contenido principal */}
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          icon={<Stethoscope className="w-7 h-7" />}
          title="Cálculos Clínicos y Farmacéuticos"
          desc="Evalúa función renal, hepática y ajusta dosis con precisión."
          to="/herramientas/clinicos"
          color="#3B82F6"
        />
        <Card
          icon={<Ruler className="w-7 h-7" />}
          title="Cálculos Fisiológicos y Antropométricos"
          desc="Determina parámetros corporales clave para farmacocinética."
          to="/herramientas/antropometricos"
          color="#0ea5e9"
        />
        <Card
          icon={<ClipboardCheck className="w-7 h-7" />}
          title="Escalas Clínicas y Validación Farmacoterapéutica"
          desc="Evalúa riesgo, seguridad y efectividad del tratamiento."
          to="/herramientas/escalas"
          color="#a855f7"
        />
        <Card
          icon={<FlaskConical className="w-7 h-7" />}
          title="Herramientas Avanzadas y Conversores Farmacéuticos"
          desc="Convierte, compara y analiza compatibilidades y estabilidad."
          to="/herramientas/avanzados"
          color="#10b981"
        />
      </div>

      {/* Disclaimer (plain text, centered, outside of cards) */}
      <p className="text-center font-bold mt-12 text-sm text-gray-800 dark:text-gray-200">
        Estas herramientas son de uso académico e informativo. No reemplazan el juicio clínico ni las decisiones de un profesional de la salud.
      </p>
      </div>
    </>
  );
};

export default IndexTools;
