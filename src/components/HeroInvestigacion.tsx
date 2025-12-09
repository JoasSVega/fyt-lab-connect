import React from "react";
import { FileText, BookOpen, Microscope, Users, Award, GraduationCap } from "lucide-react";
import SafeImage from "./SafeImage";
import heroImage from "@/assets/hero-investigacion.jpg";

// KPIs académicos
const kpis = [
  {
    icon: FileText,
    value: 90,
    label: "Publicaciones científicas",
    subtitle: "Artículos indexados en revistas nacionales e internacionales",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BookOpen,
    value: 3,
    label: "Libros y capítulos",
    subtitle: "Producción académica especializada en farmacología y terapéutica",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Microscope,
    value: 48,
    label: "Proyectos de investigación",
    subtitle: "Proyectos institucionales y colaborativos",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Users,
    value: 116,
    label: "Tutorías y trabajos dirigidos",
    subtitle: "Procesos de acompañamiento y formación investigativa",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Award,
    value: 65,
    label: "Eventos científicos",
    subtitle: "Participación y liderazgo en espacios académicos",
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
  {
    icon: GraduationCap,
    value: 43,
    label: "Cursos y formación continua",
    subtitle: "Programas de fortalecimiento profesional y técnico",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
];

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let startTimestamp: number | null = null;
            const duration = 1400;
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            
            function step(timestamp: number) {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              setDisplay(Math.round(value * easeOut(progress)));
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            }
            window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} aria-label={String(value)}>{display}</span>;
}

export default function HeroInvestigacion() {
  return (
    <>
      {/* Hero Section - matching other heroes */}
      <section
        className="hero-container"
        aria-label="Hero Investigación"
      >
        {/* Background image */}
        <SafeImage 
          src={heroImage} 
          alt="" 
          className="hero-image" 
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Dark overlay */}
        <div className="hero-overlay" />
        {/* Content with text-shadow */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 hero-text-shadow">
          <div className="max-w-3xl text-center lg:text-left">
            <h1 className="hero-title font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Investigación y Producción Académica
            </h1>
            <p className="hero-subtitle font-inter text-white/95 leading-relaxed drop-shadow-md">
              Generación de conocimiento científico, desarrollo de proyectos de investigación y producción intelectual orientada al fortalecimiento de la farmacología y la terapéutica.
            </p>
          </div>
        </div>
      </section>

      {/* KPIs Section - Institutional design without cards */}
      <section 
        className="py-20 md:py-28 lg:py-32 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32"
        aria-label="Indicadores académicos"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-4">
              Indicadores de Producción Académica
            </h2>
            <p className="text-base sm:text-lg font-inter text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Métricas que reflejan el compromiso científico y la trayectoria investigativa del grupo.
            </p>
          </div>

          {/* KPI Grid - 3+3 layout with generous spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="flex flex-col items-center text-center group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full ${kpi.bgColor} flex items-center justify-center mb-5 md:mb-6 transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className={`w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 ${kpi.color}`} aria-hidden="true" />
                  </div>
                  
                  {/* Number */}
                  <span className={`text-4xl md:text-5xl lg:text-6xl font-poppins font-bold ${kpi.color} mb-3 md:mb-4`}>
                    <AnimatedCounter value={kpi.value} />
                  </span>
                  
                  {/* Label */}
                  <span className="text-base md:text-lg font-raleway font-semibold text-slate-800 mb-2 leading-tight">
                    {kpi.label}
                  </span>
                  
                  {/* Subtitle */}
                  <span className="text-sm md:text-base font-inter text-slate-500 leading-relaxed max-w-[220px]">
                    {kpi.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
