/**
 * NORMALIZACIÓN DE RUTAS Y SEMÁNTICA DEL PORTAL
 * 
 * Verificación de consistencia en rutas y nombres de secciones
 * según estándares MinCiencias/GrupLAC
 */

export const ROUTE_MAPPING = {
  // ✅ RUTAS VALIDADAS Y COHERENTES
  investigacion: "/investigacion",
  publicaciones: "/investigacion/publicaciones",
  proyectos: "/investigacion/proyectos",
  eventos: "/investigacion/eventos",
  formacion: "/investigacion/formacion",
  produccionAudiovisual: "/investigacion/divulgacion-cientifica", // Ruta antigua, renombrada
  
  // 🔄 RUTAS QUE PODRÍAN NECESITAR ACTUALIZACIÓN EN FUTURO
  // (Si se migra a ruta más semántica)
  // OLD: /investigacion/contenidos
  // NEW: /investigacion/produccion-audiovisual-sonora
} as const;

export const SECTION_NAMES = {
  // Nombres OFICIALES de secciones (usar exactamente estos)
  publicaciones: {
    title: "Publicaciones Científicas y Académicas",
    subtitle: "Producción intelectual del Grupo FyT.",
    microtexto: "Artículos en revistas indexadas, libros y espacios editoriales científicos.",
  },
  
  proyectos: {
    title: "Proyectos de Investigación",
    subtitle: "Iniciativas de investigación y desarrollo del grupo.",
    microtexto: "Proyectos de investigación y desarrollo registrados en GrupLAC.",
  },
  
  eventos: {
    title: "Eventos Científicos",
    subtitle: "Participación en congreso, encuentros y seminarios.",
    microtexto: "Participación en congresos, encuentros y seminarios científicos.",
  },
  
  formacion: {
    title: "Formación y Extensión",
    subtitle: "Actividades de capacitación y extensión universitaria.",
    microtexto: "Formación académica y actividades de extensión universitaria.",
  },
  
  produccionAudiovisual: {
    title: "Producción Audiovisual y Sonora",
    subtitle: "Producción audiovisual y sonora asociada a proyectos de investigación en ciencias farmacéuticas.",
    microtexto: "", // El subtítulo ya es el microtexto en este caso
  },
} as const;

/**
 * RECOMENDACIÓN: Actualizar ruta de "Contenidos digitales"
 * 
 * Actual: /investigacion/divulgacion-cientifica
 * Sugerida: /investigacion/produccion-audiovisual-sonora
 * 
 * Razón: Mayor claridad semántica y consistencia con nombre oficial
 * Impacto: Requiere actualizar App.tsx, ResearchSubNav.tsx, enlaces internos
 */

export const ROUTER_PATH_CONSTANTS = {
  // Usar estas constantes en App.tsx y componentes de navegación
  INVESTIGACION: "/investigacion",
  PUBLICACIONES: "/investigacion/publicaciones",
  PROYECTOS: "/investigacion/proyectos",
  EVENTOS: "/investigacion/eventos",
  FORMACION: "/investigacion/formacion",
  PRODUCCION_AUDIOVISUAL: "/investigacion/divulgacion-cientifica", // A considerar renombrar
} as const;

/**
 * TIPOS DE PRODUCCIÓN NORMALIZADOS
 * 
 * Usar exactamente estos strings en toda la aplicación
 */
export const PRODUCTION_TYPES = {
  ARTICULO: "Artículo",
  LIBRO: "Libro",
  CAPITULO: "Capítulo de libro",
  PROYECTO: "Proyecto",
  EVENTO: "Evento",
  FORMACION: "Formación",
  VIDEO: "Video",
  PODCAST: "Podcast",
  CAPSULA: "Cápsula audiovisual",
} as const;

/**
 * ESTADOS NORMALIZADOS
 */
export const STATUS_TYPES = {
  EN_CURSO: "En curso",
  FINALIZADO: "Finalizado",
  PUBLICADO: "Publicado",
} as const;

/**
 * ÁMBITOS NORMALIZADOS
 */
export const AMBITO_TYPES = {
  NACIONAL: "Nacional",
  INTERNACIONAL: "Internacional",
} as const;
