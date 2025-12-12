// Página de listado completo de proyectos de investigación
import React, { useState, useMemo } from "react";
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilterBar from "@/components/projects/ProjectFilterBar";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const ProyectosPage: React.FC = () => {
  usePageReady();
  
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Extract unique values for filters
  const years = useMemo(() => 
    [...new Set(proyectos.map(p => p.anio))].sort((a, b) => b - a),
    []
  );
  const types = useMemo(() => 
    [...new Set(proyectos.map(p => p.tipo))],
    []
  );
  const roles = useMemo(() => 
    [...new Set(proyectos.map(p => p.rol))],
    []
  );

  // Filter projects
  const filteredProjects = useMemo(() => {
    return proyectos.filter((p: Proyecto) => {
      if (statusFilter && p.estado !== statusFilter) return false;
      if (typeFilter && p.tipo !== typeFilter) return false;
      if (yearFilter && p.anio !== Number(yearFilter)) return false;
      if (roleFilter && p.rol !== roleFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter, yearFilter, roleFilter]);

  const hasData = proyectos.length > 0;

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Proyectos de Investigación"
        subtitle="Evidencia científica generada por el Grupo FyT a través de iniciativas en farmacología, terapéutica, farmacia asistencial y modelización molecular."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {hasData ? (
          <>
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
                Mostrando {filteredProjects.length} de {proyectos.length} proyectos
              </p>
            </ScrollReveal>

            {/* Projects grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 50}>
                  <ProjectCard
                    title={project.titulo}
                    type={project.tipo}
                    status={project.estado}
                    year={project.anio}
                    role={project.rol}
                    summary={project.descripcion}
                    lines={project.lineas}
                    link={project.enlace}
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Empty state for filters */}
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
          </>
        ) : (
          <ScrollReveal>
            <PlaceholderSection message="Aquí se cargará el listado de proyectos de investigación del Grupo FyT." />
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};

export default ProyectosPage;
