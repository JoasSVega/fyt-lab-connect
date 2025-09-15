// KPISection: Sección de KPIs académicos con animación y estilo profesional
import React from "react";
import KPICard, { KPICardProps } from "@/components/KPICard";

interface KPISectionProps {
  kpis: KPICardProps[];
}

const KPISection: React.FC<KPISectionProps> = ({ kpis }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
    {kpis.map((kpi, i) => (
      <KPICard key={kpi.label} {...kpi} delay={i * 0.2} />
    ))}
  </div>
);

export default KPISection;
