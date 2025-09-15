// Card reutilizable para proyectos de investigación
import React from "react";

interface ProjectCardProps {
  image?: string;
  title: string;
  year: number | string;
  area: string;
  summary: string;
  status: string;
  actions?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, year, area, summary, status, actions }) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow p-5 flex flex-col h-full">
    <div className="mb-2 h-32 bg-slate-100 flex items-center justify-center rounded">
      {/* Imagen placeholder */}
      <div className="text-slate-400">Imagen</div>
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
    <div className="text-xs text-slate-500 mb-1">{year} · {area}</div>
    <span className={`mb-1 px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${status === 'En curso' ? 'bg-fyt-blue/10 text-fyt-blue border border-fyt-blue/30' : 'bg-fyt-purple/10 text-fyt-purple border border-fyt-purple/30'}`}>{status}</span>
    <p className="text-xs text-slate-600 mb-2 flex-1">{summary}</p>
    {actions && <div className="mt-auto">{actions}</div>}
  </div>
);

export default ProjectCard;
