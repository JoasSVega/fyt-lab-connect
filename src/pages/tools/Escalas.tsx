import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, HeartPulse, Brain, Activity, Stethoscope, TestTube } from "lucide-react";
import Seo from "@/components/Seo";

const Escalas: React.FC = () => {
  const navigate = useNavigate();

  const Card = ({ icon, title, desc, color = "#a855f7" }: { icon: React.ReactNode; title: string; desc: string; color?: string; }) => (
    <div className="rounded-2xl border-2 bg-white/90 shadow-lg hover:shadow-xl transition-all p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: color + "22", color }}>
          {icon}
        </div>
        <h3 className="text-xl font-raleway font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
      <button
        type="button"
        className="mt-auto px-4 py-2 rounded-md bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2"
      >
        Explorar
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <Seo
        title="Escalas Clínicas y Validación Farmacoterapéutica | Herramientas Farmacéuticas"
        description="Evalúa la seguridad, riesgo y efectividad del tratamiento farmacológico mediante escalas clínicas validadas como Child-Pugh, HAS-BLED y CHA₂DS₂-VASc."
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-600 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><button onClick={()=>navigate("/")} className="underline-offset-2 hover:underline">Inicio</button></li>
          <li className="opacity-60">/</li>
          <li><button onClick={()=>navigate("/herramientas")} className="underline-offset-2 hover:underline">Herramientas</button></li>
          <li className="opacity-60">/</li>
          <li className="font-medium">Escalas Clínicas</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <ClipboardCheck className="w-6 h-6 text-violet-600" />
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900">Escalas Clínicas y Validación Farmacoterapéutica</h1>
      </div>
      <p className="text-base text-muted-foreground mb-2">Evalúa riesgo, seguridad y efectividad terapéutica con escalas validadas clínicamente.</p>
      <p className="text-sm text-muted-foreground mb-6">Esta sección reúne herramientas para apoyar la toma de decisiones farmacoterapéuticas, estandarizando la valoración clínica y facilitando la comunicación interdisciplinaria.</p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          icon={<Stethoscope className="w-7 h-7" />}
          title="Child-Pugh"
          desc="Evaluación de la función hepática."
          color="#0ea5e9"
        />
        <Card
          icon={<HeartPulse className="w-7 h-7" />}
          title="HAS-BLED"
          desc="Riesgo de sangrado en anticoagulación."
          color="#ef4444"
        />
        <Card
          icon={<Activity className="w-7 h-7" />}
          title="CHA₂DS₂-VASc"
          desc="Riesgo de eventos tromboembólicos."
          color="#10b981"
        />
        <Card
          icon={<TestTube className="w-7 h-7" />}
          title="CURB-65"
          desc="Severidad de la neumonía adquirida en la comunidad."
          color="#f59e0b"
        />
        <Card
          icon={<Brain className="w-7 h-7" />}
          title="Glasgow (GCS)"
          desc="Evaluación del estado neurológico del paciente."
          color="#6366f1"
        />
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border-2 bg-white/80 p-6 text-center">
        <p className="text-sm sm:text-base text-slate-700">
          💊 Desarrollado por el Grupo de Investigación en Farmacología y Terapéutica — ACEQF
        </p>
      </section>
    </div>
  );
};

export default Escalas;
