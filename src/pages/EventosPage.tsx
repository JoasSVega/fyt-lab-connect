// Página de eventos académicos y cursos
import React, { useState, useMemo } from "react";
import { eventos } from "@/data/eventos";
import type { Evento } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import EventoItem from "@/components/investigacion/EventoItem";
import SmartToolbar from "@/components/investigacion/SmartToolbar";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const EventosPage: React.FC = () => {
  usePageReady();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset handler para limpiar todos los filtros
  const handleReset = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedType("");
    setSelectedCategory("");
  };

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
    const base = eventos.filter((e: Evento) => {
      const matchesSearch = searchQuery.trim() === "" ||
        [e.titulo, e.ciudad, e.pais]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "" || e.anio === Number(selectedYear);
      const matchesType = selectedType === "" || e.tipo === selectedType;
      const matchesParticipation = selectedCategory === "" || e.participacion === selectedCategory;
      return matchesSearch && matchesYear && matchesType && matchesParticipation;
    });
    return base.sort((a, b) => {
      const ma = a.mes || 1;
      const mb = b.mes || 1;
      if (b.anio !== a.anio) return b.anio - a.anio;
      return mb - ma;
    });
  }, [searchQuery, selectedYear, selectedType, selectedCategory]);

  const hasData = eventos.length > 0;

  // Paginación: 10 items por página
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pagedEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / itemsPerPage));
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedType, selectedCategory]);

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Eventos Académicos y Cursos"
        subtitle="Participación del Grupo FyT en congresos, simposios, jornadas científicas y programas de formación."
      />

      <ResearchSubNav />

      <SmartToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        availableYears={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableTypes={types}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        availableCategories={participations}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        resultCount={filteredEvents.length}
        totalCount={eventos.length}
        isLoading={false}
      />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        {hasData ? (
          <>

            {/* Events list (timeline-like rows) */}
            <>
              <ScrollReveal>
                <div className="flex flex-col gap-6">
                  {pagedEvents.map((e, idx) => {
                    const fecha = `${e.anio}-${String(e.mes || 1).padStart(2, "0")}-01`;
                    return (
                      <EventoItem
                        key={e.id}
                        titulo={e.titulo}
                        fecha={fecha}
                        participacion={e.participacion}
                        ciudad={e.ciudad}
                        pais={e.pais}
                        tipo={e.tipo}
                      />
                    );
                  })}
                </div>
              </ScrollReveal>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm text-slate-600">Página {currentPage} de {totalPages}</span>
                <button
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </>

            {/* Empty state */}
            {filteredEvents.length === 0 && (
              <ScrollReveal>
                <div className="py-16 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h8"/></svg>
                  <p className="text-slate-600">No hay elementos registrados en esta categoría aún.</p>
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
