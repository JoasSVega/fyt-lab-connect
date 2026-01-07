---
Estado: Propuesto
Idioma: ES
---

# GUÍA DE IMPLEMENTACIÓN: Portal Académico Evaluable

Este archivo documenta cómo integrar los nuevos componentes reutilizables en las páginas existentes del portal académico.

✅ COMPONENTES CREADOS:
1. useAcademicFilters (hook) - Filtrado centralizado y reutilizable
2. AcademicFilters (componente) - UI de filtros globales
3. SectionHeader (componente) - Headers con microtextos institucionales
4. AcademicItem (componente) - Items normalizados con jerarquía visual
5. academicProfile (tipos) - Estructura para escalabilidad futura

📋 CHECKLIST DE IMPLEMENTACIÓN

- [ ] 1. PÁGINA DE PUBLICACIONES
    - Importar useAcademicFilters
    - Reemplazar filtros manuales por hook
    - Usar SectionHeader con microtexto institucional
    - Adaptar PublicacionItem a AcademicItem para jerarquía uniforme
- [ ] 2. PÁGINA DE PROYECTOS
    - Integrar useAcademicFilters (con líneas de investigación)
    - Agregar filtro de estado (En curso / Finalizado)
    - Usar SectionHeader con microtexto
    - Estandarizar ProyectoItem
- [ ] 3. PÁGINA DE EVENTOS
    - Integrar useAcademicFilters
    - Filtros: tipo, año, ámbito
    - Usar SectionHeader
    - Normalizar EventoItem
- [ ] 4. PÁGINA DE FORMACIÓN
    - Integrar useAcademicFilters
    - Filtros: tipo, año, estado
    - Usar SectionHeader
    - Normalizar CursoItem
- [ ] 5. PÁGINA DE PRODUCCIÓN AUDIOVISUAL Y SONORA
    - Integrar useAcademicFilters
    - Filtros: año, categoría (audiovisual/podcast)
    - Usar SectionHeader (sin líneas de investigación)
    - Normalizar ContenidoDigitalItem
- [ ] 6. ROUTES Y PATHS
    - Verificar consistencia de rutas:
      /investigacion/publicaciones ✓
      /investigacion/proyectos ✓
      /investigacion/eventos ✓
      /investigacion/formacion ✓
      /investigacion/produccion-audiovisual-sonora ✓
- [ ] 7. EXPORTAR ÍNDICE DE COMPONENTES
    - Actualizar src/components/investigacion/index.ts
    - Incluir todos los nuevos componentes
- [ ] 8. DOCUMENTACIÓN TÉCNICA
    - Crear storybook si es necesario
    - Documentar props de componentes
    - Ejemplos de uso en cada página

---

## EJEMPLO DE INTEGRACIÓN EN UNA PÁGINA

```tsx
// PublicacionesPageRefactored.tsx
import { useAcademicFilters } from "@/hooks/useAcademicFilters";
import AcademicFilters from "@/components/investigacion/AcademicFilters";
import SectionHeader from "@/components/investigacion/SectionHeader";
import AcademicItem from "@/components/investigacion/AcademicItem";

const PublicacionesPageRefactored: React.FC = () => {
  const {
    filters,
    filteredItems,
    availableYears,
    availableTypes,
    setYearRange,
    toggleType,
    setSearchQuery,
    clearFilters,
    itemCount,
  } = useAcademicFilters(publicaciones);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        title="Publicaciones Científicas y Académicas"
        subtitle="Producción intelectual del Grupo FyT."
        institutionalText="Artículos en revistas indexadas, libros y espacios editoriales científicos."
      />

      <AcademicFilters
        availableYears={availableYears}
        availableTypes={availableTypes}
        availableResearchLines={[]}
        availableStatus={[]}
        activeFilters={filters}
        onYearRangeChange={setYearRange}
        onTypeToggle={toggleType}
        onResearchLineToggle={() => {}}
        onStatusToggle={() => {}}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        resultCount={itemCount}
        showResearchLines={false}
        showStatus={false}
      />

      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((pub) => (
          <AcademicItem
            key={pub.id}
            title={pub.titulo}
            type={pub.tipo}
            year={pub.anio}
            authors={pub.autores}
            institution={pub.revista || pub.editorial}
            description={pub.descripcion}
            link={pub.enlace || pub.doi}
          />
        ))}
      </div>
    </section>
  );
};
```

---

## MICROTEXTOS INSTITUCIONALES RECOMENDADOS POR SECCIÓN

- **Publicaciones:** "Artículos en revistas indexadas, libros y espacios editoriales científicos."
- **Proyectos:** "Proyectos de investigación y desarrollo registrados en GrupLAC."
- **Eventos:** "Participación en congresos, encuentros y seminarios científicos."
- **Formación:** "Formación académica y actividades de extensión universitaria."
- **Audiovisual y Sonora:** "Producción audiovisual y sonora asociada a proyectos de investigación en ciencias farmacéuticas."

---

## NOTAS TÉCNICAS

1. **RENDIMIENTO**
   - useAcademicFilters usa useMemo para evitar recálculos innecesarios
   - No requiere librerías pesadas (lodash, react-query, etc.)
   - Optimizado para portales pequeños a medianos
2. **ACCESIBILIDAD**
   - Componentes con labels semánticos
   - Controles de formulario con focus states
   - Estructura ARIA lista para auditoría
3. **ESCALABILIDAD FUTURA**
   - Estructura academicProfile.ts lista para APIs
   - Funciones helper para ORCID, Google Scholar, Scopus
   - No requiere cambios arquitectónicos al integrar APIs
4. **MANTENIBILIDAD**
   - Componentes sin estado (stateless cuando es posible)
   - Propiedades bien documentadas
   - Código comentado en estrategias clave

---

## PRÓXIMAS FASES (NO IMPLEMENTADAS AÚN)

**FASE 2: Integración de APIs**
- Sincronización automática con GrupLAC
- Importación desde Google Scholar
- Validación con ORCID

**FASE 3: Métricas y Analytics**
- Dashboard de impacto
- Conteo por tipo y año
- Tendencias de producción

**FASE 4: Exportación**
- CV en PDF
- BibTeX
- JSON-LD (Schema.org)

---

## IMPLEMENTATION GUIDE: Assessable Academic Portal (EN)

This file documents how to integrate the new reusable components into existing pages of the academic portal.

✅ CREATED COMPONENTS:
1. useAcademicFilters (hook) - Centralized, reusable filtering
2. AcademicFilters (component) - Global filters UI
3. SectionHeader (component) - Headers with institutional microtexts
4. AcademicItem (component) - Standardized items with visual hierarchy
5. academicProfile (types) - Structure for future scalability

📋 IMPLEMENTATION CHECKLIST

- [ ] 1. PUBLICATIONS PAGE
    - Import useAcademicFilters
    - Replace manual filters with the hook
    - Use SectionHeader with institutional microtext
    - Adapt PublicacionItem to AcademicItem for a uniform hierarchy
- [ ] 2. PROJECTS PAGE
    - Integrate useAcademicFilters (with research lines)
    - Add status filter (Ongoing / Completed)
    - Use SectionHeader with microtext
    - Standardize ProyectoItem
- [ ] 3. EVENTS PAGE
    - Integrate useAcademicFilters
    - Filters: type, year, scope
    - Use SectionHeader
    - Normalize EventoItem
- [ ] 4. TRAINING PAGE
    - Integrate useAcademicFilters
    - Filters: type, year, status
    - Use SectionHeader
    - Normalize CursoItem
- [ ] 5. AUDIOVISUAL AND AUDIO PRODUCTION PAGE
    - Integrate useAcademicFilters
    - Filters: year, category (audiovisual/podcast)
    - Use SectionHeader (without research lines)
    - Normalize ContenidoDigitalItem
- [ ] 6. ROUTES AND PATHS
    - Verify route consistency:
      /investigacion/publicaciones ✓
      /investigacion/proyectos ✓
      /investigacion/eventos ✓
      /investigacion/formacion ✓
      /investigacion/produccion-audiovisual-sonora ✓
- [ ] 7. EXPORT COMPONENT INDEX
    - Update src/components/investigacion/index.ts
    - Include all new components
- [ ] 8. TECHNICAL DOCUMENTATION
    - Create storybook if needed
    - Document component props
    - Usage examples on each page

---

## EXAMPLE INTEGRATION IN A PAGE

```tsx
// PublicacionesPageRefactored.tsx
import { useAcademicFilters } from "@/hooks/useAcademicFilters";
import AcademicFilters from "@/components/investigacion/AcademicFilters";
import SectionHeader from "@/components/investigacion/SectionHeader";
import AcademicItem from "@/components/investigacion/AcademicItem";

const PublicacionesPageRefactored: React.FC = () => {
  const {
    filters,
    filteredItems,
    availableYears,
    availableTypes,
    setYearRange,
    toggleType,
    setSearchQuery,
    clearFilters,
    itemCount,
  } = useAcademicFilters(publicaciones);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        title="Scientific and Academic Publications"
        subtitle="Intellectual output of the FyT Group."
        institutionalText="Articles in indexed journals, books and scientific editorial venues."
      />

      <AcademicFilters
        availableYears={availableYears}
        availableTypes={availableTypes}
        availableResearchLines={[]}
        availableStatus={[]}
        activeFilters={filters}
        onYearRangeChange={setYearRange}
        onTypeToggle={toggleType}
        onResearchLineToggle={() => {}}
        onStatusToggle={() => {}}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        resultCount={itemCount}
        showResearchLines={false}
        showStatus={false}
      />

      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((pub) => (
          <AcademicItem
            key={pub.id}
            title={pub.titulo}
            type={pub.tipo}
            year={pub.anio}
            authors={pub.autores}
            institution={pub.revista || pub.editorial}
            description={pub.descripcion}
            link={pub.enlace || pub.doi}
          />
        ))}
      </div>
    </section>
  );
};
```

---

## RECOMMENDED INSTITUTIONAL MICROTEXTS BY SECTION

- **Publications:** "Articles in indexed journals, books and scientific editorial venues."
- **Projects:** "Research and development projects registered in GrupLAC."
- **Events:** "Participation in conferences, meetings and scientific seminars."
- **Training:** "Academic training and university outreach activities."
- **Audiovisual and Audio:** "Audiovisual and audio production associated with research projects in pharmaceutical sciences."

---

## TECHNICAL NOTES

1. **PERFORMANCE**
   - useAcademicFilters uses useMemo to avoid unnecessary recalculations
   - Does not require heavy libraries (lodash, react-query, etc.)
   - Optimized for small to medium portals
2. **ACCESSIBILITY**
   - Components with semantic labels
   - Form controls with focus states
   - ARIA-ready structure for auditing
3. **FUTURE SCALABILITY**
   - academicProfile.ts structure ready for APIs
   - Helper functions for ORCID, Google Scholar, Scopus
   - No architectural changes required to integrate APIs
4. **MAINTAINABILITY**
   - Stateless components where possible
   - Well-documented props
   - Commented code in key strategies

---

## NEXT PHASES (NOT YET IMPLEMENTED)

**PHASE 2: API Integration**
- Automatic synchronization with GrupLAC
- Import from Google Scholar
- Validation with ORCID

**PHASE 3: Metrics and Analytics**
- Impact dashboard
- Counts by type and year
- Production trends

**PHASE 4: Export**
- CV in PDF
- BibTeX
- JSON-LD (Schema.org)

````
