// Página de publicaciones científicas y académicas
import React, { useState, useMemo } from "react";
import { publicaciones } from "@/data/publicaciones";
import type { Publicacion } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import PublicationCard from "@/components/publications/PublicationCard";
import PublicationCategoryTabs from "@/components/publications/PublicationCategoryTabs";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type PublicationType = "articulo" | "libro" | "capitulo" | "divulgacion";

const PublicacionesPage: React.FC = () => {
  usePageReady();
  
  const [activeTab, setActiveTab] = useState<PublicationType | "">("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique years
  const years = useMemo(() => 
    [...new Set(publicaciones.map(p => p.anio))].sort((a, b) => b - a),
    []
  );

  // Count by type
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: publicaciones.length };
    publicaciones.forEach((p: Publicacion) => {
      c[p.tipo] = (c[p.tipo] || 0) + 1;
    });
    return c;
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return publicaciones.filter((p: Publicacion) => {
      if (activeTab && p.tipo !== activeTab) return false;
      if (yearFilter && p.anio !== Number(yearFilter)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          p.titulo.toLowerCase().includes(query) ||
          p.autores.toLowerCase().includes(query) ||
          (p.revista?.toLowerCase().includes(query) ?? false)
        );
      }
      return true;
    });
  }, [activeTab, yearFilter, searchQuery]);

  const hasData = publicaciones.length > 0;

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT en revistas indexadas, libros y espacios editoriales científicos."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {hasData ? (
          <>
            {/* Category tabs */}
            <ScrollReveal>
              <PublicationCategoryTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={counts}
              />
            </ScrollReveal>

            {/* Additional filters */}
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap gap-3 mt-6">
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Filtrar por año"
                >
                  <option value="">Año (todos)</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Buscar por título, autor o revista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-[200px] max-w-md px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Buscar publicación"
                />

                {(activeTab || yearFilter || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveTab("");
                      setYearFilter("");
                      setSearchQuery("");
                    }}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </ScrollReveal>

            {/* Results count */}
            <ScrollReveal delay={150}>
              <p className="text-sm text-muted-foreground mt-6 mb-8">
                Mostrando {filteredPublications.length} de {publicaciones.length} publicaciones
              </p>
            </ScrollReveal>

            {/* Publications grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((pub, idx) => (
                <ScrollReveal key={pub.id} delay={idx * 50}>
                  <PublicationCard
                    title={pub.titulo}
                    authors={pub.autores}
                    journal={pub.revista || pub.editorial || ""}
                    year={pub.anio}
                    type={pub.tipo}
                    summary={pub.descripcion}
                    doi={pub.doi}
                    indexation={pub.indexacion}
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* Empty state */}
            {filteredPublications.length === 0 && (
              <ScrollReveal>
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No se encontraron publicaciones con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab("");
                      setYearFilter("");
                      setSearchQuery("");
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
            <PlaceholderSection message="Aquí se cargará el listado de publicaciones científicas y académicas del Grupo FyT." />
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};

export default PublicacionesPage;
