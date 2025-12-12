// Página de eventos académicos y cursos
import React, { useState, useMemo } from "react";
import eventsData from "@/data/events_courses.json";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import EventCard from "@/components/events/EventCard";
import EventsFilterBar from "@/components/events/EventsFilterBar";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Event = {
  id: number;
  title: string;
  year: number;
  type: string;
  participation: string;
  location: string;
};

const EventosPage: React.FC = () => {
  usePageReady();
  
  const [typeFilter, setTypeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [participationFilter, setParticipationFilter] = useState("");

  const events = eventsData as unknown as Event[];

  // Extract unique values for filters
  const types = useMemo(() => 
    [...new Set(events.map(e => e.type))].sort(),
    [events]
  );
  const years = useMemo(() => 
    [...new Set(events.map(e => e.year))].sort((a, b) => b - a),
    [events]
  );
  const participations = useMemo(() => 
    [...new Set(events.map(e => e.participation))],
    [events]
  );

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (typeFilter && e.type !== typeFilter) return false;
      if (yearFilter && e.year !== Number(yearFilter)) return false;
      if (participationFilter && e.participation !== participationFilter) return false;
      return true;
    });
  }, [events, typeFilter, yearFilter, participationFilter]);

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Eventos Académicos y Cursos"
        subtitle="Participación del Grupo FyT en congresos, simposios, jornadas científicas y programas de formación."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
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
            Mostrando {filteredEvents.length} de {events.length} eventos
          </p>
        </ScrollReveal>

        {/* Events list */}
        <div className="space-y-4">
          {filteredEvents.map((event, idx) => (
            <ScrollReveal key={event.id} delay={idx * 50}>
              <EventCard
                title={event.title}
                year={event.year}
                type={event.type}
                participation={event.participation}
                location={event.location}
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
      </section>
    </div>
  );
};

export default EventosPage;
