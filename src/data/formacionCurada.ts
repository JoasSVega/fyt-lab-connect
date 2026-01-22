/**
 * DATOS CURADOS DE FORMACIÓN - GrupLAC
 * 
 * Información filtrada, clasificada y normalizada para mostrar
 * en portal institucional (no administrativo).
 * 
 * Fuente: GrupLAC - Grupo FyT
 * Última actualización: 2026
 */

import type { Curso, Tutoria } from "@/types/investigacion";

export type FormacionItem = {
  id: string;
  title: string;
  type: "programa" | "curso" | "tutoria";
  level: "pregrado" | "maestria" | "doctorado" | "extension" | null;
  institution: string;
  year: number | null;
  description?: string;
  link?: string;
};

/** Tipo para Programas de Posgrado */
export type ProgramaPosgrado = {
  id: number;
  nombre: string;
  nivel: "Maestría" | "Doctorado";
  institucion: string;
  anioVinculacion: number;
  rol: string;
  linea?: string;
  descripcion?: string;
};

/**
 * A. PROGRAMAS DE POSGRADO VINCULADOS AL GRUPO
 * 
 * Incluye programas formales donde el grupo participa activamente
 * en docencia, tutorías o dirección académica.
 */
export const programasPosgrado: ProgramaPosgrado[] = [
  {
    id: 1,
    nombre: "Maestría en Farmacia Asistencial",
    nivel: "Maestría",
    institucion: "Universidad de Cartagena",
    anioVinculacion: 2019,
    rol: "Docencia, tutorías clínicas y dirección de trabajos",
    linea: "Atención farmacéutica y farmacoseguridad",
    descripcion: "Formación en intervención farmacéutica y seguimiento terapéutico",
  },
  {
    id: 2,
    nombre: "Maestría en Farmacología",
    nivel: "Maestría",
    institucion: "Universidad de Cartagena",
    anioVinculacion: 2019,
    rol: "Docencia, diseño de fármacos in silico y co-dirección de tesis",
    linea: "Farmacología clínica y modelado molecular",
    descripcion: "Especialización en mecanismos farmacológicos y diseño racional de fármacos",
  },
  {
    id: 3,
    nombre: "Doctorado en Ciencias Biomédicas",
    nivel: "Doctorado",
    institucion: "Universidad de Cartagena",
    anioVinculacion: 2023,
    rol: "Cotutoría de tesis en resistencia bacteriana y blancos terapéuticos",
    linea: "Microbiología, quórum sensing y diseño racional de fármacos",
    descripcion: "Investigación avanzada en resistencia antimicrobiana y farmacoterapia",
  },
  {
    id: 4,
    nombre: "Doctorado en Ciencias Farmacéuticas",
    nivel: "Doctorado",
    institucion: "Universidad de Cartagena",
    anioVinculacion: 2023,
    rol: "Tutoría principal en genética y terapias avanzadas",
    linea: "Genética farmacéutica y medicina de precisión",
    descripcion: "Formación doctoral en farmacogenómica y terapias personalizadas",
  },
  {
    id: 5,
    nombre: "Maestría en Ciencias Básicas Biomédicas",
    nivel: "Maestría",
    institucion: "Universidad del Norte",
    anioVinculacion: 2021,
    rol: "Cotutoría en análisis bioinformático",
    linea: "Bioinformática y oncología molecular",
    descripcion: "Análisis computacional de expresión génica y progresión tumoral",
  },
  {
    id: 6,
    nombre: "Maestría en Gestión Farmacéutica",
    nivel: "Maestría",
    institucion: "Universidad del Atlántico",
    anioVinculacion: 2021,
    rol: "Tutoría en buenas prácticas y normativa",
    linea: "Asuntos regulatorios y farmacovigilancia",
    descripcion: "Gestión regulatoria y control de calidad en asuntos farmacéuticos",
  },
];

/**
 * B. CURSOS Y FORMACIÓN AVANZADA
 * 
 * Incluye cursos relacionados directamente con líneas de investigación.
 * Exluye: cursos de soft skills no académicos, oratoria, idiomas, etc.
 */
export const cursosAvanzados: Curso[] = [
  {
    id: 1,
    titulo: "Diseño de Fármacos por Computadora: Docking y Dinámica Molecular",
    autores: "Antistio A. Alviz Amador",
    anio: 2024,
    tipo: "Electivo Doctoral",
    modalidad: "Presencial",
    institucion: "Universidad de Córdoba",
    descripcion: "Curso avanzado en modelado computacional para diseño racional de fármacos",
    duracion: "Variable",
    tags: ["Modelado molecular", "In silico", "Computacional"],
  },
  {
    id: 2,
    titulo: "Farmacoterapia y Atención Farmacéutica I",
    autores: "Antistio A. Alviz Amador",
    anio: 2019,
    tipo: "Curso de Maestría",
    modalidad: "Presencial",
    institucion: "Universidad de Cartagena",
    duracion: "4 semanas",
    descripcion: "Intervenciones farmacéuticas e impacto en ajuste terapéutico",
    tags: ["Farmacia clínica", "Atención farmacéutica", "Impacto clínico"],
  },
  {
    id: 3,
    titulo: "Metodología de Investigación Aplicada",
    autores: "Antistio A. Alviz Amador",
    anio: 2019,
    tipo: "Seminario de Maestría",
    modalidad: "Presencial",
    institucion: "Universidad de Cartagena",
    descripcion: "Diseño metodológico riguroso y evaluación de estudios en salud",
    tags: ["Metodología", "Diseño de estudios", "Rigor científico"],
  },
  {
    id: 4,
    titulo: "Actualización en Fisiología y Farmacología",
    autores: "Luis A. Utria Acevedo",
    anio: 2019,
    tipo: "Curso Internacional",
    modalidad: "Presencial",
    institucion: "UNIFESP (Brasil)",
    descripcion: "Revisión crítica de mecanismos fisiológicos y respuesta farmacológica",
    tags: ["Fisiología", "Farmacología", "Internacional"],
  },
  {
    id: 5,
    titulo: "Farmacoterapéutica: Integración Clínica",
    autores: "Antistio A. Alviz Amador",
    anio: 2019,
    tipo: "Curso de Especialización",
    modalidad: "Presencial",
    institucion: "Universidad de Cartagena",
    descripcion: "Optimización terapéutica basada en evidencia clínica",
    tags: ["Terapéutica", "Validación", "Impacto clínico"],
  },
  {
    id: 6,
    titulo: "Drogas Psicodélicas: Historia, Farmacología y Potencial Terapéutico",
    autores: "Luis A. Utria Acevedo",
    anio: 2018,
    tipo: "Curso Internacional",
    modalidad: "Presencial",
    institucion: "FMUSP (Brasil)",
    descripcion: "Análisis farmacológico y aplicaciones terapéuticas de sustancias psicoactivas",
    tags: ["Neurofarmacología", "Salud mental", "Terapéutica innovadora"],
  },
  {
    id: 7,
    titulo: "Curso On-line de Pesquisa en PubMed",
    autores: "Luis A. Utria Acevedo",
    anio: 2018,
    tipo: "Seminario Virtual",
    modalidad: "Virtual",
    institucion: "Universidade Federal de São Paulo",
    descripcion: "Búsqueda sistemática y gestión de información científica",
    tags: ["Búsqueda bibliográfica", "Gestión de información", "Competencias digitales"],
  },
];

/**
 * C. TUTORÍAS Y DIRECCIÓN ACADÉMICA (SELECCIÓN CURADA)
 * 
 * Incluye tutorías recientes, tesis completadas con reconocimiento,
 * y proyectos en líneas de investigación del grupo.
 * 
 * Criterio: Mostrar diversidad de niveles y líneas de investigación.
 * Total GrupLAC: 116 registros desde 2024 hasta 1999.
 * Selección: 8 más destacadas + referencia al listado completo.
 */
export const tutoriasDestacadas: Tutoria[] = [
  {
    id: 1,
    titulo: "Resistencia de Quórum Sensing en A. baumannii (AbaI/AbaR)",
    estudiante: "Rafael J. Pineda Alemán",
    anio: 2023,
    tipo: "Doctorado",
    programa: "Ciencias Biomédicas",
    institucion: "Universidad de Cartagena",
    estado: "En curso",
    descripcion:
      "Cotutoría orientada a identificar blancos moleculares para diseño racional de fármacos contra resistencia bacteriana",
    tags: ["Quórum sensing", "Resistencia", "In silico", "Blancos terapéuticos"],
  },
  {
    id: 2,
    titulo: "HFE/TRF1 y Hemocromatosis: Caracterización Genética",
    estudiante: "Luis A. Utria Acevedo",
    anio: 2023,
    tipo: "Doctorado",
    programa: "Ciencias Farmacéuticas",
    institucion: "Universidad de Cartagena",
    estado: "En curso",
    descripcion:
      "Tutoría principal en medicina de precisión aplicando bioinformática y farmacogenómica",
    tags: ["Genética", "Medicina de precisión", "Caracterización molecular"],
  },
  {
    id: 3,
    titulo: "ARA II con BBB para Enfermedad de Alzheimer (In Silico)",
    estudiante: "Juan David Garcés Barraza",
    anio: 2024,
    tipo: "Maestría",
    programa: "Farmacología",
    institucion: "Universidad de Cartagena",
    estado: "Finalizado",
    descripcion:
      "Co-dirección de estudio computacional para identificar alternativas terapéuticas neuroprotectoras",
    tags: ["In silico", "Neurofarmacología", "Diseño de fármacos"],
  },
  {
    id: 4,
    titulo:
      "Leucoplasia a Carcinoma Oral: Análisis Bioinformático de Expresión Génica",
    estudiante: "Jaime Javier Guzmán de Ávila",
    anio: 2023,
    tipo: "Maestría",
    programa: "Ciencias Básicas Biomédicas",
    institucion: "Universidad del Norte",
    estado: "Finalizado",
    descripcion:
      "Cotutoría en análisis transcriptómico para comprensión de mecanismos de progresión tumoral",
    tags: ["Bioinformática", "Oncología", "Análisis transcriptómico"],
  },
  {
    id: 5,
    titulo: "Anestésicos Locales y Canal Nav1.7 (Dinámica Molecular)",
    estudiante: "Isabella Manzur Villalobos",
    anio: 2021,
    tipo: "Maestría",
    programa: "Farmacología",
    institucion: "Universidad de Cartagena",
    estado: "Finalizado",
    descripcion:
      "Tutoría principal con Distinción Meritoria en modelado molecular para optimización farmacológica",
    tags: ["Docking", "Dinámica molecular", "Modelado computacional"],
  },
  {
    id: 6,
    titulo: "Resistencia Antimicrobiana en Infecciones Urinarias Complicadas",
    estudiante: "Luis Fernando Primera Jiménez",
    anio: 2023,
    tipo: "Pregrado",
    programa: "Química Farmacéutica",
    institucion: "Universidad de Cartagena",
    estado: "Finalizado",
    descripcion:
      "Tutoría principal en vigilancia epidemiológica de resistencia y uso racional de antibióticos",
    tags: ["Resistencia", "Uso racional", "Epidemiología"],
  },
  {
    id: 7,
    titulo:
      "Programa Institucional de Farmacoseguridad en Pacientes Geriátricos",
    estudiante: "Manuel de los Santos Avila Padilla",
    anio: 2022,
    tipo: "Maestría",
    programa: "Farmacia Asistencial",
    institucion: "Universidad de Cartagena",
    estado: "Finalizado",
    descripcion:
      "Tutoría principal en implementación de sistemas de seguridad farmacológica mediante método DETI",
    tags: ["Farmacoseguridad", "Farmacovigilancia", "Atención geriátrica"],
  },
  {
    id: 8,
    titulo: "Cribado Virtual de Candidatos para Tratamiento del Cáncer de Pulmón",
    estudiante: "Leydis Janeth Luna Torres",
    anio: 2020,
    tipo: "Maestría",
    programa: "Química Farmacéutica",
    institucion: "Universidad de Cartagena",
    estado: "Finalizado",
    descripcion:
      "Tutoría principal usando acoplamiento molecular para identificar inhibidores de EGFR mutante",
    tags: ["Docking molecular", "Oncología", "In silico", "Terapia dirigida"],
  },
];

/**
 * ESTADÍSTICAS PARA PORTAL
 * 
 * Información agregada que se puede mostrar en sección resumen
 */
export const estadisticasFormacion = {
  programasPosgrado: {
    total: programasPosgrado.length,
    maestrias: programasPosgrado.filter((p) => p.nivel === "Maestría").length,
    doctorados: programasPosgrado.filter((p) => p.nivel === "Doctorado").length,
    instituciones: new Set(programasPosgrado.map((p) => p.institucion)).size,
  },
  cursosAvanzados: {
    total: cursosAvanzados.length,
    ultimos5Anios: cursosAvanzados.filter((c) => c.anio >= 2020).length,
    internacionales: cursosAvanzados.filter(
      (c) => c.institucion.includes("Brasil") || c.institucion.includes("Estados")
    ).length,
  },
  tutoriasCompletas: {
    registrosTotales: 116,
    pregrado: 70,
    maestria: 30,
    doctorado: 8,
    destacadas: tutoriasDestacadas.length,
  },
};

/**
 * LISTADO NORMALIZADO PARA FILTRADO Y LISTADOS HOMOGÉNEOS
 * Sin encabezados por categoría: se usa "type" para filtros/badges.
 */
const mapNivel = (nivel?: string): FormacionItem["level"] => {
  if (!nivel) return null;
  const n = nivel.toLowerCase();
  if (n.includes("doctor")) return "doctorado";
  if (n.includes("maestr")) return "maestria";
  if (n.includes("pregrado") || n.includes("pre-grado")) return "pregrado";
  if (n.includes("especial") || n.includes("extension")) return "extension";
  return null;
};

export const formacionItems: FormacionItem[] = [
  ...programasPosgrado.map((p) => ({
    id: `programa-${p.id}`,
    title: p.nombre,
    type: "programa" as const,
    level: mapNivel(p.nivel),
    institution: p.institucion,
    year: p.anioVinculacion ?? null,
    description: p.descripcion || p.rol,
  })),
  ...cursosAvanzados.map((c) => {
    const inferredLevel = mapNivel(c.tipo);
    return {
      id: `curso-${c.id}`,
      title: c.titulo,
      type: "curso" as const,
      level: inferredLevel,
      institution: c.institucion,
      year: c.anio ?? null,
      description: c.descripcion,
      link: c.enlace,
    } satisfies FormacionItem;
  }),
  ...tutoriasDestacadas.map((t) => ({
    id: `tutoria-${t.id}`,
    title: t.titulo,
    type: "tutoria" as const,
    level: mapNivel(t.tipo),
    institution: t.institucion || t.programa || "",
    year: t.anio ?? null,
    description: t.descripcion,
    link: t.enlace,
  })),
].sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
