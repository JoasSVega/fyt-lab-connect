// Página de publicaciones científicas y académicas
import React, { useState, useMemo } from "react";
import publicationsData from "@/data/publications.json";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import PublicationCard from "@/components/publications/PublicationCard";
import PublicationCategoryTabs from "@/components/publications/PublicationCategoryTabs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type PublicationType = "articulo" | "libro" | "capitulo" | "divulgacion";

type Publication = {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  summary?: string;
  type: PublicationType;
  doi?: string;
  indexation?: string;
};

const PublicacionesPage: React.FC = () => {
  usePageReady();
  
  const [activeTab, setActiveTab] = useState<PublicationType | "">("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const publications = publicationsData as unknown as Publication[];

  // Get unique years
  const years = useMemo(() => 
    [...new Set(publications.map(p => p.year))].sort((a, b) => b - a),
    [publications]
  );

  // Count by type
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: publications.length };
    publications.forEach(p => {
      c[p.type] = (c[p.type] || 0) + 1;
    });
    return c;
  }, [publications]);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return publications.filter(p => {
      if (activeTab && p.type !== activeTab) return false;
      if (yearFilter && p.year !== Number(yearFilter)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.authors.toLowerCase().includes(query) ||
          p.journal.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [publications, activeTab, yearFilter, searchQuery]);

  return (
    <div className="w-full bg-background">
      <SmallHero
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT en revistas indexadas, libros y espacios editoriales científicos."
      />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
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
            Mostrando {filteredPublications.length} de {publications.length} publicaciones
          </p>
        </ScrollReveal>

        {/* Publications grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub, idx) => (
            <ScrollReveal key={pub.id} delay={idx * 50}>
              <PublicationCard
                title={pub.title}
                authors={pub.authors}
                journal={pub.journal}
                year={pub.year}
                type={pub.type}
                summary={pub.summary}
                doi={pub.doi}
                indexation={pub.indexation}
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
      </section>
    </div>
  );
};

export default PublicacionesPage;
