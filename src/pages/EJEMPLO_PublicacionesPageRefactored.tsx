/**
 * EJEMPLO COMPLETO: Página de Publicaciones Refactorizada
 * 
 * Este archivo muestra cómo usar todos los componentes nuevos
 * para crear una página académica evaluable.
 * 
 * ESTADO: Ejemplo de referencia (NO EJECUTAR DIRECTAMENTE)
 * 
 * Para usar este código:
 * 1. Copia la estructura al archivo real (ej: PublicacionesPageV2.tsx)
 * 2. Ajusta imports según tu estructura
 * 3. Integra datos reales
 * 4. Prueba en desarrollo
 */

import React from "react";
import { publicaciones } from "@/data/publicaciones";
import type { Publicacion } from "@/types/investigacion";

// Nuevos componentes y hooks
import { useAcademicFilters } from "@/hooks/useAcademicFilters";
import AcademicFilters from "@/components/investigacion/AcademicFilters";
import AcademicItem from "@/components/investigacion/AcademicItem";
import SectionHeader from "@/components/investigacion/SectionHeader";

// Componentes existentes
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

/**
 * Página de Publicaciones Refactorizada
 * 
 * ✨ Características:
 * - Filtros globales reutilizables
 * - Búsqueda semántica por palabra clave
 * - Jerarquía visual normalizada
 * - Microtexto institucional
 * - Contador de resultados
 * - Rendimiento optimizado
 */
const PublicacionesPageRefactored: React.FC = () => {
  usePageReady();

  // Mapear datos al formato esperado por useAcademicFilters
  const itemsForFiltering = publicaciones.map((pub: Publicacion) => ({
    ...pub,
    year: pub.anio,
    type: pub.tipo,
    institution: pub.revista || pub.editorial,
    authors: pub.autores,
    description: pub.descripcion,
    status: "Publicado", // Todas las publicaciones están publicadas
  }));

  // Hook centralizado de filtros
  const {
    filters,
    filteredItems,
    availableYears,
    availableTypes,
    availableStatus,
    setYearRange,
    toggleType,
    toggleStatus,
    setSearchQuery,
    clearFilters,
    itemCount,
  } = useAcademicFilters(itemsForFiltering);

  const hasData = publicaciones.length > 0;

  return (
    <div className="w-full bg-background">
      {/* SEO */}
      <Seo
        title="Publicaciones Científicas y Académicas – FYT Lab Connect"
        description="Producción intelectual del Grupo FyT en revistas indexadas, libros y espacios editoriales científicos."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/investigacion/publicaciones"
      />

      {/* Hero */}
      <SmallHero
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT."
      />

      {/* Navegación secundaria */}
      <ResearchSubNav />

      {/* Contenido principal */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {hasData ? (
          <>
            {/* Header con microtexto institucional */}
            <ScrollReveal>
              <SectionHeader
                title="Publicaciones Científicas y Académicas"
                subtitle="Producción intelectual del Grupo FyT."
                institutionalText="Artículos en revistas indexadas, libros y espacios editoriales científicos."
              />
            </ScrollReveal>

            {/* Filtros globales reutilizables */}
            <ScrollReveal delay={100}>
              <AcademicFilters
                availableYears={availableYears}
                availableTypes={availableTypes}
                availableResearchLines={[]} // No aplicable para publicaciones
                availableStatus={availableStatus}
                activeFilters={filters}
                onYearRangeChange={setYearRange}
                onTypeToggle={toggleType}
                onResearchLineToggle={() => {}} // No usado
                onStatusToggle={toggleStatus}
                onSearchChange={setSearchQuery}
                onClearFilters={clearFilters}
                resultCount={itemCount}
                showResearchLines={false}
                showStatus={false} // Todas están publicadas
              />
            </ScrollReveal>

            {/* Grid de ítems con jerarquía normalizada */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {(filteredItems as Publicacion[]).map((pub, idx) => (
                  <ScrollReveal key={pub.id} delay={idx * 30}>
                    <AcademicItem
                      title={pub.titulo}
                      type={pub.tipo}
                      year={pub.anio}
                      authors={pub.autores}
                      institution={pub.revista || pub.editorial}
                      description={pub.descripcion}
                      link={pub.enlace || pub.doi}
                      className="hover:shadow-lg transition-shadow"
                    >
                      {/* Contenido adicional opcional */}
                      {pub.doi && (
                        <div className="text-xs text-slate-500">
                          DOI: <code className="font-mono">{pub.doi}</code>
                        </div>
                      )}
                      {pub.indexacion && (
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold">Indexación:</span> {pub.indexacion}
                        </div>
                      )}
                    </AcademicItem>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              // Mensaje cuando no hay resultados
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg">
                <p className="text-slate-600">
                  No se encontraron publicaciones con los filtros aplicados.
                </p>
              </div>
            )}

            {/* Pie de sección con estadísticas (futuro) */}
            <ScrollReveal delay={200}>
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Total de publicaciones: <span className="font-semibold">{publicaciones.length}</span>
                </p>
                {/* Aquí irían métricas futuras (H-index, citas, etc.) */}
              </div>
            </ScrollReveal>
          </>
        ) : (
          // Estado cuando no hay datos
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay publicaciones registradas en este momento.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PublicacionesPageRefactored;

/**
 * ═══════════════════════════════════════════════════════════════
 * PATRONES DE USO PARA OTRAS PÁGINAS
 * ═══════════════════════════════════════════════════════════════
 * 
 * PROYECTOS (con líneas de investigación):
 * 
 * <AcademicFilters
 *   showResearchLines={true}  // Mostrar líneas
 *   showStatus={true}         // Mostrar estado (En curso/Finalizado)
 *   availableResearchLines={availableResearchLines}
 *   onResearchLineToggle={toggleResearchLine}
 *   // ... otros props
 * />
 * 
 * EVENTOS:
 * 
 * <AcademicFilters
 *   showResearchLines={false}
 *   showStatus={false}
 *   // Agregar filter.ambito personalizado para Nacional/Internacional
 *   // ... otros props
 * />
 * 
 * FORMACIÓN:
 * 
 * <AcademicFilters
 *   showResearchLines={false}
 *   showStatus={true}  // Mostrar estado de cursos
 *   availableStatus={["Completado", "En progreso", "Pendiente"]}
 *   // ... otros props
 * />
 * 
 * PRODUCCIÓN AUDIOVISUAL Y SONORA:
 * 
 * <AcademicFilters
 *   showResearchLines={false}
 *   showStatus={false}
 *   availableTypes={["Video", "Podcast", "Cápsula"]}
 *   // ... otros props
 * />
 * 
 * ═══════════════════════════════════════════════════════════════
 */
