/**
 * Configuración de identidad académica y métricas
 * Estructura preparada para integración futura de:
 * - ORCID
 * - Google Scholar
 * - Métricas de impacto
 *
 * NO implementado aún. Solo estructura base.
 */

export interface AcademicProfile {
  // Identificadores académicos (para integración futura)
  orcid?: string; // Ej: "0000-0002-1825-0097"
  googleScholar?: string; // Google Scholar ID
  scopusAuthorId?: string;
  publonsResearcherId?: string;

  // Información básica
  name: string;
  institution: string;
  department?: string;
  email?: string;

  // Líneas de investigación del grupo
  researchLines: string[];

  // Configuración de visibilidad de secciones
  sections: {
    publications: boolean;
    projects: boolean;
    events: boolean;
    training: boolean;
    audiovisual: boolean;
    metrics: boolean;
  };
}

export interface AcademicMetrics {
  // Métricas por tipo de producción
  publicationsByType: {
    articles: number;
    books: number;
    chapters: number;
  };

  // Métricas por año
  publicationsByYear: Record<number, number>;

  // Métricas de impacto (para integración con APIs)
  citationCount?: number;
  hIndex?: number;
  impactFactor?: number;

  // Últimas actualizaciones
  lastUpdated?: Date;
  lastUpdatedFrom?: "GrupLAC" | "GoogleScholar" | "Manual";
}

// Estructura para integración futura de APIs
export interface ExternalAPIConfig {
  // GrupLAC
  grupLacGroupId?: string;
  grupLacAutoRefresh?: boolean;

  // Google Scholar
  googleScholarId?: string;
  googleScholarAutoSync?: boolean;

  // ORCID
  orcidId?: string;
  orcidAutoSync?: boolean;

  // Scopus (si se integra)
  scopusApiKey?: string;
  scopusAutoSync?: boolean;
}

/**
 * Función helper para calcular métricas
 * (Stub para integración futura)
 */
export const calculateMetrics = (publications: any[]): AcademicMetrics => {
  return {
    publicationsByType: {
      articles: 0,
      books: 0,
      chapters: 0,
    },
    publicationsByYear: {},
  };
};

/**
 * Función helper para sincronizar desde APIs externas
 * (Stub para integración futura)
 */
export const syncFromExternalAPIs = async (
  config: ExternalAPIConfig
): Promise<any> => {
  console.log(
    "🔗 Estructura preparada para sincronización con APIs externas",
    config
  );
  // Implementar en futuro
  return null;
};
