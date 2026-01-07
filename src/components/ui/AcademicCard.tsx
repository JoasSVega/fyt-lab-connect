// AcademicCard: Card reutilizable para proyectos y publicaciones
import React from "react";

interface AcademicCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  tag?: string;
  tagColor?: string;
  children?: React.ReactNode;
  href?: string;
}

const AcademicCard: React.FC<AcademicCardProps> = ({
  icon,
  title,
  subtitle,
  meta,
  tag,
  tagColor = "bg-fyt-blue/10 text-fyt-blue border-fyt-blue/30",
  children,
  href
}) => (
  <div className="bg-white rounded-3xl shadow-soft p-6 flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full border border-blue-50">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      {meta && <span className="text-xs text-slate-500">{meta}</span>}
      {tag && (
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold border ${tagColor}`}>{tag}</span>
      )}
    </div>
    <h4 className="text-lg font-bold text-slate-800 mb-1 leading-snug">{title}</h4>
    {subtitle && <div className="text-xs text-slate-600 mb-1">{subtitle}</div>}
    {children}
    {href && (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-fyt-blue underline mt-2">Ver más</a>
    )}
  </div>
);

export default AcademicCard;
