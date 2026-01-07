// Página de publicaciones científicas y académicas
import React, { useState, useMemo } from "react";
import { publicaciones } from "@/data/publicaciones";
import type { Publicacion } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";
import PublicacionItem from "@/components/investigacion/PublicacionItem";
import { PublicacionItemSkeleton } from "@/components/investigacion/PublicacionItemSkeleton";
import SmartToolbar from "@/components/investigacion/SmartToolbar";

const PublicacionesPage: React.FC = () => {
  usePageReady();

  // Filtros simples con estado local
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset handler para limpiar todos los filtros
  const handleReset = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedType("");
  };

  const hasData = publicaciones.length > 0;

  // Cálculo inmediato de opciones disponibles (no bloquea render)
  const availableYears = useMemo(
    () => [...new Set(publicaciones.map(p => p.anio))].sort((a, b) => b - a),
    []
  );
  const availableTypes = useMemo(
    () => [...new Set(publicaciones.map(p => p.tipo))].sort(),
    []
  );

  // Filtrado optimizado
  const filteredItems = useMemo(() => {
    return publicaciones.filter((pub) => {
      const matchesSearch = searchQuery.trim() === "" ||
        [pub.titulo, pub.autores, pub.revista, pub.editorial, pub.descripcion]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "" || pub.anio === Number(selectedYear);
      const matchesType = selectedType === "" || pub.tipo === selectedType;
      return matchesSearch && matchesYear && matchesType;
    });
  }, [searchQuery, selectedYear, selectedType]);

  // Paginación: 10 items por página
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pagedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedType]);

  return (
    <div className="w-full bg-background">
      {/* SEO */}
      <Seo
        title="Grupo FyT | Publicaciones Científicas y Académicas"
        description="Publicaciones científicas del Grupo de Investigación en Farmacología y Terapéutica en revistas indexadas, libros y espacios editoriales académicos."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/publicaciones"
      />

      {/* Hero section */}
      <SmallHero
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT en revistas indexadas, libros y espacios editoriales científicos."
      />

      {/* Navigation */}
      <ResearchSubNav />

      {/* Smart Toolbar - renders immediately */}
      <SmartToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        availableYears={availableYears}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableTypes={availableTypes}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        resultCount={filteredItems.length}
        totalCount={publicaciones.length}
        isLoading={false}
      />

      {/* Main content - Min height reserves space to prevent CLS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12 min-h-[800px]">
        {hasData ? (
          <>

            {/* Lista premium de publicaciones (row layout) */}
            {filteredItems.length > 0 ? (
              <>
                <ScrollReveal>
                  <div className="flex flex-col gap-4 min-h-[600px]">
                    {pagedItems.map((pub, idx) => {
                      const fecha = `${pub.anio}-${String(pub.mes || 1).padStart(2, "0")}-01`;
                      return (
                        <PublicacionItem
                          key={pub.id || `${pub.doi || pub.titulo}-${idx}`}
                          titulo={pub.titulo}
                          autores={pub.autores}
                          fecha={fecha}
                          tipo={pub.tipo}
                          institucion={pub.revista || pub.editorial}
                          enlace={pub.enlace}
                          descripcion={pub.descripcion}
                          doi={pub.doi}
                          tags={pub.tags}
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
            ) : (
              // 🆕 PASO 4: Estado vacío académico
              <ScrollReveal>
                <div className="py-16 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20v-2a4 4 0 0 1 4-4h.5"/><path d="M2 12h6"/><path d="M4 10v4"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/></svg>
                  <p className="text-slate-600">No hay publicaciones registradas en esta categoría aún.</p>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : null}
      </section>
    </div>
  );
};

export default PublicacionesPage;
