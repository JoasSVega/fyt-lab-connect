// Página de Formación y Actividades Docentes
import React, { useState, useMemo } from "react";
import { GraduationCap } from "lucide-react";
import {
  formacionItems,
  type FormacionItem,
} from "@/data/formacionCurada";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import AcademicItem from "@/components/investigacion/AcademicItem";
import SmartToolbar from "@/components/investigacion/SmartToolbar";
import Seo from "@/components/Seo";

const FormacionPage: React.FC = () => {
  usePageReady();

  // Filtros simples con estado local
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset handler para limpiar todos los filtros
  const handleReset = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedType("");
    setSelectedLevel("");
  };

  const hasData = formacionItems.length > 0;

  // Cálculo inmediato de opciones disponibles (no bloquea render)
  const availableYears = useMemo(
    () => [...new Set(formacionItems.map(f => f.year).filter(Boolean))].sort((a, b) => (b as number) - (a as number)),
    []
  );
  const availableTypes = useMemo(
    () => [...new Set(formacionItems.map(f => f.type))].sort(),
    []
  );
  const availableLevels = useMemo(
    () => [...new Set(formacionItems.map(f => f.level).filter(Boolean))].sort(),
    []
  );

  // Filtrado optimizado + ordenamiento (reciente a antiguo)
  const filteredItems = useMemo(() => {
    const filtered = formacionItems.filter((item) => {
      const matchesSearch = searchQuery.trim() === "" ||
        [item.title, item.institution, item.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "" || item.year === Number(selectedYear);
      const matchesType = selectedType === "" || item.type === selectedType;
      const matchesLevel = selectedLevel === "" || item.level === selectedLevel;
      return matchesSearch && matchesYear && matchesType && matchesLevel;
    });
    // Ordenar por año: reciente a antiguo
    return filtered.sort((a, b) => {
      const yearA = a.year || 0;
      const yearB = b.year || 0;
      return yearB - yearA;
    });
  }, [searchQuery, selectedYear, selectedType, selectedLevel]);

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
  }, [searchQuery, selectedYear, selectedType, selectedLevel]);

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
    <div className="w-full bg-background">
      <Seo
        title="Formación y Actividades Docentes"
        description="Tutorías, direcciones de tesis y programas de formación continua en Farmacología del Grupo FyT."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/formacion"
        openGraph={{
          title: "Grupo FyT | Formación y Actividades Docentes",
          description: "Procesos formativos y actividades docentes del Grupo FyT",
          type: "website",
          url: "https://fyt-research.org/investigacion/formacion",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{ card: "summary_large_image", site: "@fytlab" }}
      />

      <SmallHero
        title="Formación Académica"
        subtitle="Programas de posgrado, cursos avanzados y dirección de trabajos académicos del Grupo FyT."
        icon={GraduationCap}
      />

      <ResearchSubNav />

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
        availableCategories={availableLevels}
        selectedCategory={selectedLevel}
        onCategoryChange={setSelectedLevel}
        categoryLabel="Nivel"
        resultCount={filteredItems.length}
        totalCount={formacionItems.length}
        isLoading={false}
      />

      {/* Main content - Min height reserves space to prevent CLS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12 min-h-[800px]">
        {hasData ? (
          <>
            {/* Lista de formación */}
            {filteredItems.length > 0 ? (
              <>
                <ScrollReveal>
                  <div className="flex flex-col gap-4 min-h-[600px]">
                    {pagedItems.map((item) => (
                      <AcademicItem
                        key={item.id}
                        title={item.title}
                        type={typeLabel(item.type)}
                        level={levelLabel(item.level)}
                        year={item.year || undefined}
                        institution={item.institution}
                        description={item.description}
                        link={item.link}
                        className="hover:shadow-lg transition-shadow"
                        variant="default"
                      />
                    ))}
                  </div>
                </ScrollReveal>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Anterior
                  </button>
                  <span className="text-sm text-slate-600 font-medium">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              </>
            ) : (
              <ScrollReveal>
                <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg">
                  <p className="text-slate-600">
                    No se encontraron registros de formación con los filtros aplicados.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal>
            <div className="text-center py-12">
              <p className="text-slate-600">No hay información de formación disponible.</p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};

export default FormacionPage;
