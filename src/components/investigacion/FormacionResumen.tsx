/**
 * COMPONENTE: RESUMEN DE FORMACIÓN
 * Ubicación: Página /investigacion (vista resumen/overview)
 * Vista homogénea sin separadores de categorías.
 */

import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import AcademicItem from "@/components/investigacion/AcademicItem";
import { formacionItems } from "@/data/formacionCurada";
import type { FormacionItem } from "@/data/formacionCurada";

const FormacionResumen: React.FC = () => {
  // Mostrar exactamente 3 tarjetas destacadas
  const destacados = useMemo(() => {
    return formacionItems.slice(0, 3);
  }, []);

  const typeLabel = (type: FormacionItem["type"]): string => {
    if (type === "programa") return "Programa";
    if (type === "curso") return "Curso";
    return "Tutoría";
  };

  const levelLabel = (level: FormacionItem["level"]): string | undefined => {
    if (!level) return undefined;
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 border-t border-slate-200">
      <ScrollReveal>
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-800">
            Formación Académica
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            Programas, cursos y tutorías del Grupo FyT
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destacados.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 40}>
            <AcademicItem
              title={item.title}
              type={typeLabel(item.type)}
              level={levelLabel(item.level)}
              year={item.year || undefined}
              institution={item.institution}
              description={item.description}
              link={item.link}
              className="h-full"
              variant="compact"
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={180}>
        <div className="text-center mt-12">
          <Link
            to="/investigacion/formacion"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 group"
          >
            Ver formación completa
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FormacionResumen;
