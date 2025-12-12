// Página de listado completo de proyectos de investigación
import React, { useState, useMemo } from "react";
import projectsData from "@/data/projects.json";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilterBar from "@/components/projects/ProjectFilterBar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Project = {
  id: number;
  title: string;
  summary: string;
  type: string;
  status: "En curso" | "Finalizado";
  year: number;
  area: string;
  role: string;
  lines?: string[];
  link?: string;
};

const ProyectosPage: React.FC = () => {
  usePageReady();
  
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const projects = projectsData as unknown as Project[];

  // Extract unique values for filters
  const years = useMemo(() => 
    [...new Set(projects.map(p => p.year))].sort((a, b) => b - a),
    [projects]
  );
  const types = useMemo(() => 
    [...new Set(projects.map(p => p.type))],
    [projects]
  );
  const roles = useMemo(() => 
    [...new Set(projects.map(p => p.role))],
    [projects]
  );

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (statusFilter && p.status !== statusFilter) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (yearFilter && p.year !== Number(yearFilter)) return false;
      if (roleFilter && p.role !== roleFilter) return false;
      return true;
    });
  }, [projects, statusFilter, typeFilter, yearFilter, roleFilter]);

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Proyectos de Investigación"
        subtitle="Evidencia científica generada por el Grupo FyT a través de iniciativas en farmacología, terapéutica, farmacia asistencial y modelización molecular."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <ScrollReveal>
          <ProjectFilterBar
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            yearFilter={yearFilter}
            onYearChange={setYearFilter}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            years={years}
            types={types}
            roles={roles}
          />
        </ScrollReveal>

        {/* Results count */}
        <ScrollReveal delay={100}>
          <p className="text-sm text-muted-foreground mt-6 mb-8">
            Mostrando {filteredProjects.length} de {projects.length} proyectos
          </p>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 50}>
              <ProjectCard
                title={project.title}
                type={project.type}
                status={project.status}
                year={project.year}
                role={project.role}
                summary={project.summary}
                lines={project.lines}
                link={project.link}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No se encontraron proyectos con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setStatusFilter("");
                  setTypeFilter("");
                  setYearFilter("");
                  setRoleFilter("");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};

export default ProyectosPage;
