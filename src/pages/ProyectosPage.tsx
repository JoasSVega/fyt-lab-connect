// Página de listado completo de proyectos de investigación
import React, { useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/projects/ProjectCard";

const TABS = [
  { key: "en-curso", label: "En curso" },
  { key: "finalizados", label: "Completados" }
];

const ProyectosPage: React.FC = () => {
  const [tab, setTab] = useState<'en-curso' | 'finalizados'>('en-curso');
  const proyectosFiltrados = projectsData.filter((p: any) =>
    tab === 'en-curso' ? p.status === 'En curso' : p.status === 'Finalizado'
  );

  return (
    <BaseLayout>
      <section className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-slate-800 mb-8 text-center">
          Proyectos de Investigación
        </h1>
        <div className="flex gap-2 justify-end mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`px-3 py-1 rounded-full text-sm font-inter border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                tab === t.key
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : "bg-white text-blue-700 border-blue-100 hover:bg-blue-50"
              }`}
              onClick={() => setTab(t.key as any)}
              aria-current={tab === t.key ? "page" : undefined}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {proyectosFiltrados.map((proj: any) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default ProyectosPage;
