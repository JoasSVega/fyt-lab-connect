// Página de Formación y Actividades Docentes
import React from "react";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const FormacionPage: React.FC = () => {
  usePageReady();

  return (
    <div className="w-full bg-background">
      <Seo
        title="Formación y Actividades Docentes – FYT Lab Connect"
        description="Procesos formativos, tutorías, direcciones de tesis y actividades docentes del Grupo de Investigación FyT."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/investigacion/formacion"
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
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Tutorías y Trabajos Dirigidos
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Acompañamiento académico en pregrado, maestría y doctorado.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará el listado de tutorías, trabajos de grado y tesis dirigidas por miembros del grupo." />
          </div>
        </ScrollReveal>

        {/* Sección: Cursos y Capacitaciones */}
        <ScrollReveal delay={100}>
          <div className="mb-16 pt-12 border-t border-slate-100">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Cursos y Capacitaciones
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Programas de formación continua y capacitación profesional.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará el catálogo de cursos, talleres y programas de capacitación ofrecidos por el grupo." />
          </div>
        </ScrollReveal>

        {/* Sección: Docencia */}
        <ScrollReveal delay={200}>
          <div className="pt-12 border-t border-slate-100">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Actividades de Docencia
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
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
