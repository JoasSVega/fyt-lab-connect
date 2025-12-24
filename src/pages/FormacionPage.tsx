// Página de Formación y Actividades Docentes
import React from "react";
import { cursos, tutorias } from "@/data/formacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import CursoItem from "@/components/investigacion/CursoItem";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const FormacionPage: React.FC = () => {
  usePageReady();

  const hasTutorias = tutorias.length > 0;
  const hasCursos = cursos.length > 0;

  return (
    <div className="w-full bg-background">
      <Seo
        title="Grupo FyT | Formación y Actividades Docentes"
        description="Procesos formativos, tutorías, direcciones de tesis y actividades docentes del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/formacion"
      />

      <SmallHero
        title="Formación y Actividades Docentes"
        subtitle="Procesos de acompañamiento académico, tutorías, direcciones de tesis y programas de formación continua del Grupo FyT."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {/* Sección: Tutorías y Trabajos Dirigidos */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Tutorías y Trabajos Dirigidos
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Acompañamiento académico en pregrado, maestría y doctorado.
              </p>
            </div>
            {hasTutorias ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorias.map((tutoria, idx) => (
                  <ScrollReveal key={tutoria.id} delay={idx * 50}>
                    <CursoItem
                      titulo={tutoria.titulo}
                      autores={tutoria.estudiante}
                      fecha={`${tutoria.anio}`}
                      tipo={tutoria.tipo}
                      institucion={tutoria.institucion}
                      enlace={tutoria.enlace}
                      descripcion={tutoria.descripcion}
                      tags={tutoria.tags}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <PlaceholderSection message="Aquí se cargará el listado de tutorías, trabajos de grado y tesis dirigidas por miembros del grupo." />
            )}
          </div>
        </ScrollReveal>

        {/* Sección: Cursos y Capacitaciones */}
        <ScrollReveal delay={100}>
          <div className="mb-16 pt-12 border-t border-border">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Cursos y Capacitaciones
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Programas de formación continua y capacitación profesional.
              </p>
            </div>
            {hasCursos ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cursos.map((curso, idx) => (
                  <ScrollReveal key={curso.id} delay={idx * 50}>
                    <CursoItem
                      titulo={curso.titulo}
                      autores={curso.autores}
                      fecha={`${curso.anio}`}
                      tipo={curso.tipo}
                      institucion={curso.institucion}
                      enlace={curso.enlace}
                      descripcion={curso.descripcion}
                      duracion={curso.duracion}
                      modalidad={curso.modalidad}
                      tags={curso.tags}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <PlaceholderSection message="Aquí se cargará el catálogo de cursos, talleres y programas de capacitación ofrecidos por el grupo." />
            )}
          </div>
        </ScrollReveal>

        {/* Sección: Docencia */}
        <ScrollReveal delay={200}>
          <div className="pt-12 border-t border-border">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Actividades de Docencia
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Participación docente en programas académicos institucionales.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará información sobre asignaturas, programas y actividades docentes de los integrantes del grupo." />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default FormacionPage;
