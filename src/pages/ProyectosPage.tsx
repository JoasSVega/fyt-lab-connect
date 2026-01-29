// Página de listado completo de proyectos de investigación
import React, { useState, useMemo } from "react";
import { Microscope } from "lucide-react";
import { proyectos } from "@/data/proyectos";
import type { Proyecto } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import ProyectoItem from "@/components/investigacion/ProyectoItem";
import { ProyectoItemSkeleton } from "@/components/investigacion/ProyectoItemSkeleton";
import SmartToolbar from "@/components/investigacion/SmartToolbar";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const ProyectosPage: React.FC = () => {
  usePageReady();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset handler para limpiar todos los filtros
  const handleReset = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedType("");
    setSelectedStatus("");
  };

  // Extract unique values for filters (immediate calculation)
  const years = useMemo(() => 
    [...new Set(proyectos.map(p => p.anio))].sort((a, b) => b - a),
    []
  );
  const types = useMemo(() => 
    [...new Set(proyectos.map(p => p.tipo))],
    []
  );
  const states = useMemo(() => 
    [...new Set(proyectos.map(p => p.estado))],
    []
  );

  // Filter projects + ordenamiento (reciente a antiguo)
  const filteredProjects = useMemo(() => {
    const filtered = proyectos.filter((p: Proyecto) => {
      const matchesSearch = searchQuery.trim() === "" ||
        [p.titulo, p.descripcion, p.institucion]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "" || p.anio === Number(selectedYear);
      const matchesType = selectedType === "" || p.tipo === selectedType;
      const matchesStatus = selectedStatus === "" || p.estado === selectedStatus;
      return matchesSearch && matchesYear && matchesType && matchesStatus;
    });
    // Ordenar por año: reciente a antiguo
    return filtered.sort((a, b) => b.anio - a.anio);
  }, [searchQuery, selectedYear, selectedType, selectedStatus]);

  const hasData = proyectos.length > 0;

  // Paginación: 10 items por página
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pagedProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedType, selectedStatus]);

  return (
    <div className="w-full bg-background">
      <Seo
        title="Proyectos de Investigación FyT"
        description="Proyectos de investigación del Grupo FyT en Farmacología, Terapéutica, Farmacia Asistencial y Modelización Molecular."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/proyectos"
        openGraph={{ 
          title: "Grupo FyT | Proyectos de Investigación", 
          description: "Proyectos del Grupo FyT", 
          type: "website",
          url: "https://fyt-research.org/investigacion/proyectos",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{ card: "summary_large_image", site: "@fytlab" }}
      />
      <SmallHero
        title="Proyectos de Investigación"
        subtitle="Evidencia científica generada por el Grupo FyT a través de iniciativas en farmacología, terapéutica, farmacia asistencial y modelización molecular."
        icon={Microscope}
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
        availableCategories={states}
        selectedCategory={selectedStatus}
        onCategoryChange={setSelectedStatus}
        resultCount={filteredProjects.length}
        totalCount={proyectos.length}
        isLoading={false}
      />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12 min-h-[900px]">
        {hasData ? (
          <>

            {/* Projects grid (premium cards) */}
            <>
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[700px]">
                  {pagedProjects.map((p, idx) => {
                    const fecha = `${p.anio}-${String(p.mes || 1).padStart(2, "0")}-01`;
                    return (
                      <ProyectoItem
                        key={p.id}
                        titulo={p.titulo}
                        fecha={fecha}
                        tipo={p.estado}
                        institucion={p.institucion}
                        descripcion={p.descripcion}
                        tags={p.tags || p.lineas}
                        enlace={p.enlace}
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

            {/* Empty state for filters */}
            {filteredProjects.length === 0 && (
              <ScrollReveal>
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No se encontraron proyectos con los filtros seleccionados.
                  </p>
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
