import * as React from "react";
import { Stethoscope, Ruler, FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Card = ({ icon, title, desc, to, color }: { icon: React.ReactNode; title: string; desc: string; to: string; color: string; }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border-2 bg-white/90 shadow-xl hover:shadow-2xl transition-all p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: color + '22', color }}>
          {icon}
        </div>
        <h3 className="text-xl font-raleway font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground flex-1">{desc}</p>
      <Button
        onClick={()=>navigate(to)}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white shadow"
        style={{ backgroundColor: color }}
      >
        Explorar <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

const IndexTools: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-10">
      <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-slate-900 text-center mb-10">Herramientas</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          icon={<Stethoscope className="w-7 h-7" />}
          title="Cálculos clínicos"
          desc="Nefrológicos, respiratorios, digestivos y más. Ajustes posológicos y soporte diagnóstico."
          to="/herramientas/clinicos"
          color="#3B82F6"
        />
        <Card
          icon={<Ruler className="w-7 h-7" />}
          title="Fisiológicos y antropométricos"
          desc="IMC, superficie corporal, relación cintura-cadera, metabolismo basal."
          to="/herramientas/antropometricos"
          color="#0ea5e9"
        />
        <Card
          icon={<FlaskConical className="w-7 h-7" />}
          title="Herramientas avanzadas"
          desc="Conversores farmacéuticos y soporte clínico automatizado."
          to="/herramientas/avanzados"
          color="#10b981"
        />
      </div>
    </div>
  );
};

export default IndexTools;
