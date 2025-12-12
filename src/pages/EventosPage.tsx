// Página de eventos académicos y cursos
import React, { useState, useMemo } from "react";
import { eventos } from "@/data/eventos";
import type { Evento } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import EventCard from "@/components/events/EventCard";
import EventsFilterBar from "@/components/events/EventsFilterBar";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const EventosPage: React.FC = () => {
  usePageReady();
  
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [participationFilter, setParticipationFilter] = useState("");

  // Extract unique values for filters
  const types = useMemo(() => 
    [...new Set(eventos.map(e => e.tipo))].sort(),
    []
  );
  const years = useMemo(() => 
    [...new Set(eventos.map(e => e.anio))].sort((a, b) => b - a),
    []
  );
  const participations = useMemo(() => 
    [...new Set(eventos.map(e => e.participacion))],
    []
  );

  // Filter events
  const filteredEvents = useMemo(() => {
    return eventos.filter((e: Evento) => {
      if (typeFilter && e.tipo !== typeFilter) return false;
      if (yearFilter && e.anio !== Number(yearFilter)) return false;
      if (participationFilter && e.participacion !== participationFilter) return false;
      return true;
    });
  }, [typeFilter, yearFilter, participationFilter]);

  const hasData = eventos.length > 0;

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Eventos Académicos y Cursos"
        subtitle="Participación del Grupo FyT en congresos, simposios, jornadas científicas y programas de formación."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {hasData ? (
          <>
            <ScrollReveal>
              <EventsFilterBar
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                yearFilter={yearFilter}
                onYearChange={setYearFilter}
                participationFilter={participationFilter}
                onParticipationChange={setParticipationFilter}
                types={types}
                years={years}
                participations={participations}
              />
            </ScrollReveal>

            {/* Results count */}
            <ScrollReveal delay={100}>
              <p className="text-sm text-muted-foreground mt-6 mb-8">
                Mostrando {filteredEvents.length} de {eventos.length} eventos
              </p>
            </ScrollReveal>

            {/* Events list */}
            <div className="space-y-4">
              {filteredEvents.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 50}>
                  <EventCard
                    title={event.titulo}
                    year={event.anio}
                    type={event.tipo}
                    participation={event.participacion}
                    location={event.lugar || event.ciudad || event.institucion || ""}
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Empty state */}
            {filteredEvents.length === 0 && (
              <ScrollReveal>
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No se encontraron eventos con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setTypeFilter("");
                      setYearFilter("");
                      setParticipationFilter("");
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
            <PlaceholderSection message="Aquí se cargará el listado de eventos académicos y cursos del Grupo FyT." />
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};

export default EventosPage;
