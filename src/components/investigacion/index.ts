// Exportación centralizada de componentes de investigación

// Componentes existentes
export { default as ResearchSubNav } from "./ResearchSubNav";
export { default as ProyectoItem } from "./ProyectoItem";
export { default as PublicacionItem } from "./PublicacionItem";
export { default as EventoItem } from "./EventoItem";
export { default as CursoItem } from "./CursoItem";
export { default as ContenidoDigitalItem } from "./ContenidoDigitalItem";
export { default as PlaceholderSection } from "./PlaceholderSection";

// 🆕 Componentes reutilizables para portal académico evaluable
export { default as AcademicFilters } from "./AcademicFilters";
export { default as AcademicItem } from "./AcademicItem";
export { default as SectionHeader } from "./SectionHeader";

// Re-exportar tipos desde CursoItem que ya los exporta con 'export interface'
export type { CursoItemProps } from "./CursoItem";

// 🆕 Tipos de nuevos componentes
export type { AcademicItemProps } from "./AcademicItem";
