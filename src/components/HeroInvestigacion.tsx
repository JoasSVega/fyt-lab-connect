
import React from "react";
import { FileText, BookOpen, Microscope, Users, Award } from "lucide-react";

const kpis = [
  {
    icon: <FileText className="w-9 h-9 text-blue-400" aria-label="Publicaciones científicas" />,
    value: 90,
    label: "Publicaciones científicas",
    subtitle: "Artículos indexados en revistas nacionales e internacionales",
    numberColor: "text-blue-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <BookOpen className="w-9 h-9 text-purple-300" aria-label="Libros y capítulos" />,
    value: 3,
    label: "Libros y capítulos",
    subtitle: "Producción académica especializada en farmacología y terapéutica",
    numberColor: "text-purple-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Microscope className="w-9 h-9 text-green-300" aria-label="Proyectos de investigación" />,
    value: 48,
    label: "Proyectos de investigación",
    subtitle: "Iniciativas desarrolladas en diferentes áreas de la salud",
    numberColor: "text-green-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Users className="w-9 h-9 text-orange-300" aria-label="Tutorías y trabajos dirigidos" />,
    value: 116,
    label: "Tutorías y trabajos dirigidos",
    subtitle: "Formando nuevas generaciones de investigadores",
    numberColor: "text-orange-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <Award className="w-9 h-9 text-gray-400" aria-label="Eventos científicos" />,
    value: 65,
    label: "Eventos científicos",
    subtitle: "Participación activa en congresos, simposios y seminarios",
    numberColor: "text-gray-700",
    subtitleColor: "text-slate-600"
  },
  {
    icon: <BookOpen className="w-9 h-9 text-teal-300" aria-label="Cursos y formación continua" />,
    value: 43,
    label: "Cursos y formación continua",
    subtitle: "Capacitaciones y formación especializada",
    numberColor: "text-teal-700",
    subtitleColor: "text-slate-600"
  },
];

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const start = 0;
    let startTimestamp: number | null = null;
    const duration = 1400;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplay(Math.round(start + (value - start) * easeOut(progress)));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
    return () => {
      setDisplay(value);
    };
  }, [value]);
  return <span aria-label={String(value)}>{display}</span>;
}

export default function HeroInvestigacion() {
  return (
    <section
      className="w-full py-10 px-2 sm:px-6 rounded-3xl mb-10"
      style={{
        background: "linear-gradient(120deg, #e0f2ff 0%, #f8fafc 60%, #f3f4f6 100%)",
      }}
      aria-label="Indicadores académicos"
    >
      <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-800 mb-4 text-center">
        Investigación y Producción Académica
      </h1>
      <p className="text-lg font-inter text-slate-500 mb-10 text-center max-w-2xl mx-auto">
        Contribuciones científicas, proyectos y producción intelectual del grupo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center"
            aria-label={kpi.label}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3" aria-hidden="true">
              {kpi.icon}
            </span>
            <span className={`text-3xl font-bold mb-1 ${kpi.numberColor}`}>
              <AnimatedCounter value={kpi.value} />
            </span>
            <span className="text-base font-semibold text-slate-800 mb-1 text-center">{kpi.label}</span>
            <span className={`text-xs ${kpi.subtitleColor} text-center`}>{kpi.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
