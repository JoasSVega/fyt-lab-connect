---
Estado: Propuesto
Idioma: Mixto
---

# EJEMPLO COMPLETO: Página de Publicaciones Refactorizada (ES)

Este ejemplo muestra cómo integrar los componentes y hooks diseñados para el `Portal Académico Evaluable`.

**Estado:** Ejemplo de referencia (NO EJECUTAR DIRECTAMENTE)

**Instrucciones de uso:**
1. Copiar la estructura al archivo real (por ejemplo `PublicacionesPageV2.tsx`).
2. Ajustar imports según la estructura del proyecto.
3. Integrar datos reales.
4. Probar en entorno de desarrollo.

## Código de ejemplo

```tsx
// (Se incluye el componente tal como en el ejemplo de referencia)
import React from "react";
import { publicaciones } from "@/data/publicaciones";
import type { Publicacion } from "@/types/investigacion";

import { useAcademicFilters } from "@/hooks/useAcademicFilters";
import AcademicFilters from "@/components/investigacion/AcademicFilters";
import AcademicItem from "@/components/investigacion/AcademicItem";
import SectionHeader from "@/components/investigacion/SectionHeader";

import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const PublicacionesPageRefactored: React.FC = () => {
  usePageReady();

  const itemsForFiltering = publicaciones.map((pub: Publicacion) => ({
    ...pub,
    year: pub.anio,
    type: pub.tipo,
    institution: pub.revista || pub.editorial,
    authors: pub.autores,
    description: pub.descripcion,
    status: "Publicado",
  }));

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
      <Seo
        title="Grupo FyT | Publicaciones Científicas y Académicas"
        description="Producción intelectual del Grupo de Investigación en Farmacología y Terapéutica en revistas indexadas, libros y espacios editoriales científicos."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/publicaciones"
      />

      <SmallHero
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {hasData ? (
          <>
            <ScrollReveal>
              <SectionHeader
                title="Publicaciones Científicas y Académicas"
                subtitle="Producción intelectual del Grupo FyT."
                institutionalText="Artículos en revistas indexadas, libros y espacios editoriales científicos."
              />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <AcademicFilters
                availableYears={availableYears}
                availableTypes={availableTypes}
                availableResearchLines={[]}
                availableStatus={availableStatus}
                activeFilters={filters}
                onYearRangeChange={setYearRange}
                onTypeToggle={toggleType}
                onResearchLineToggle={() => {}}
                onStatusToggle={toggleStatus}
                onSearchChange={setSearchQuery}
                onClearFilters={clearFilters}
                resultCount={itemCount}
                showResearchLines={false}
                showStatus={false}
              />
            </ScrollReveal>

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
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg">
                <p className="text-slate-600">No se encontraron publicaciones con los filtros aplicados.</p>
              </div>
            )}

            <ScrollReveal delay={200}>
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Total de publicaciones: <span className="font-semibold">{publicaciones.length}</span>
                </p>
              </div>
            </ScrollReveal>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay publicaciones registradas en este momento.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PublicacionesPageRefactored;
```

## Patrones de uso (ES)

Incluye ejemplos de props y variantes para `AcademicFilters` aplicables a Proyectos, Eventos, Formación y Producción audiovisual.

---

# FULL EXAMPLE: Refactored Publications Page (EN)

This file shows how to integrate the components and hooks designed for the `Academic Evaluated Portal`.

**Status:** Reference example (DO NOT RUN DIRECTLY)

**Usage instructions:**
1. Copy the structure into the real file (e.g. `PublicacionesPageV2.tsx`).
2. Adjust imports according to your project layout.
3. Integrate real data.
4. Test in development.

## Example code (EN)

```tsx
// (Same component code as above — kept verbatim to preserve examples and usage)
import React from "react";
import { publicaciones } from "@/data/publicaciones";
import type { Publicacion } from "@/types/investigacion";

import { useAcademicFilters } from "@/hooks/useAcademicFilters";
import AcademicFilters from "@/components/investigacion/AcademicFilters";
import AcademicItem from "@/components/investigacion/AcademicItem";
import SectionHeader from "@/components/investigacion/SectionHeader";

import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const PublicacionesPageRefactored: React.FC = () => { /* ... */ };

export default PublicacionesPageRefactored;
```

## Usage patterns (EN)

Provides examples of props and variants for `AcademicFilters` applicable to Projects, Events, Training and Audio/Video production. See the original file for more detailed snippets.
