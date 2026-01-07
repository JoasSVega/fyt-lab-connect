/**
 * Rutas públicas a prerender y metadatos SEO institucional
 * 
 * Este archivo combina:
 * - Rutas estáticas (definidas manualmente)
 * - Rutas dinámicas (generadas automáticamente desde datos)
 * 
 * IMPORTANTE: No añadir rutas dinámicas manualmente aquí.
 * Usar el sistema de generadores en src/data/
 */

import { generateDivulgacionRoutes, generateDivulgacionMeta } from '@/data/generateDivulgacionRoutes';

// ========================================
// RUTAS DINÁMICAS (AUTOMÁTICAS)
// ========================================
const divulgacionRoutes = generateDivulgacionRoutes();
const divulgacionMeta = generateDivulgacionMeta();

// ========================================
// RUTAS ESTÁTICAS (MANUALES)
// ========================================
export const routesToPrerender: string[] = [
  // Páginas principales
  '/',
  
  // Investigación
  '/investigacion',
  '/investigacion/proyectos',
  '/investigacion/publicaciones',
  '/investigacion/eventos',
  '/investigacion/formacion',
  '/investigacion/divulgacion-cientifica',
  
  // Noticias y divulgación
  '/noticias',
  '/divulgacion',  // Landing page del blog
  
  // Herramientas
  '/herramientas',
  '/herramientas/clinicos',
  '/herramientas/antropometricos',
  '/herramientas/avanzados',
  '/herramientas/escalas',
  
  // Institucional
  '/sobre-nosotros',
  '/contactos',
  '/equipo',
  
  // Legal
  '/politica-privacidad',
  '/terminos-uso',
  '/codigo-etica',
  
  // Calculadoras
  '/calculator/dosage',
  
  // ========================================
  // RUTAS DINÁMICAS INYECTADAS AUTOMÁTICAMENTE
  // ========================================
  ...divulgacionRoutes,  // /divulgacion/:slug para cada artículo
];

// ========================================
// METADATOS SEO
// ========================================
export const routeMeta: Record<string, { title: string; description: string }> = {
  // ========================================
  // PÁGINAS ESTÁTICAS
  // ========================================
  '/': {
    title: 'Inicio',
    description:
      'Grupo FyT: Investigación de vanguardia en Farmacología y Terapéutica de la Universidad de Cartagena. Proyectos, publicaciones y herramientas científicas.'
  },
  '/sobre-nosotros': {
    title: 'Sobre Nosotros',
    description:
      'Grupo de Investigación en Farmacología y Terapéutica (Grupo FyT) - Universidad de Cartagena. Líneas de investigación: Atención Farmacéutica, Diseño de Fármacos, Farmacoeconomía, Farmacoepidemiología, Farmacovigilancia y Toxicología. Categoría B Minciencias.'
  },
  '/investigacion': {
    title: 'Investigación',
    description:
      'Producción científica del Grupo de Investigación en Farmacología y Terapéutica (FyT) - Universidad de Cartagena. Investigación en Atención Farmacéutica, Diseño de Fármacos, Farmacoeconomía, Farmacoepidemiología, Farmacovigilancia y Toxicología.'
  },
  '/investigacion/publicaciones': {
    title: 'Publicaciones',
    description: 'Artículos, revisiones y producción académica del Grupo FyT.'
  },
  '/investigacion/proyectos': {
    title: 'Proyectos',
    description: 'Proyectos de investigación activos y finalizados del Grupo FyT.'
  },
  '/investigacion/eventos': {
    title: 'Eventos',
    description: 'Congresos, seminarios, jornadas científicas y eventos académicos del Grupo FyT - Universidad de Cartagena en farmacología, farmacovigilancia y ciencias de la salud.'
  },
  '/investigacion/formacion': {
    title: 'Formación',
    description: 'Programas de formación académica, maestrías, doctorados, semilleros de investigación y actividades educativas del Grupo FyT - Universidad de Cartagena en ciencias farmacéuticas.'
  },
  '/investigacion/divulgacion-cientifica': {
    title: 'Divulgación Científica',
    description: 'Contenidos de divulgación y transferencia del Grupo FyT.'
  },
  '/divulgacion': {
    title: 'Divulgación Científica',
    description: 'Artículos de divulgación científica y análisis en farmacología, terapéutica y política de salud del Grupo FyT.'
  },
  '/noticias': {
    title: 'Noticias',
    description: 'Actualidad científica y logros del Grupo de Investigación en Farmacología y Terapéutica de la Universidad de Cartagena. Eventos, publicaciones, reconocimientos y actividades académicas.'
  },
  '/herramientas': {
    title: 'Herramientas',
    description: 'Herramientas clínicas, farmacéuticas y científicas del Grupo de Investigación en Farmacología y Terapéutica (FyT) - Universidad de Cartagena. Recursos para Atención Farmacéutica, Farmacoeconomía, Farmacoepidemiología y Farmacovigilancia. Calculadoras digitales para profesionales de la salud en Colombia.'
  },
  '/herramientas/clinicos': {
    title: 'Herramientas Clínicas',
    description: 'Calculadoras clínicas validadas para farmacología aplicada, dosificación terapéutica y análisis farmacológico. Herramientas científicas del Grupo de Investigación FyT - Universidad de Cartagena para Atención Farmacéutica y Farmacovigilancia.'
  },
  '/herramientas/antropometricos': {
    title: 'Herramientas Antropométricas',
    description: 'Calculadoras de índice de masa corporal (IMC), superficie corporal, peso ideal y evaluación nutricional. Herramientas científicas del Grupo FyT para análisis antropométrico en farmacoterapia.'
  },
  '/herramientas/avanzados': {
    title: 'Herramientas Avanzadas',
    description: 'Herramientas computacionales avanzadas para farmacocinética, farmacodinámica, diseño de fármacos y modelización molecular. Utilidades experimentales del Grupo de Investigación en Farmacología y Terapéutica FyT - Universidad de Cartagena.'
  },
  '/herramientas/escalas': {
    title: 'Herramientas: Escalas',
    description: 'Escalas clínicas validadas y normalizadas para evaluación farmacoterapéutica, farmacovigilancia, toxicología y seguimiento de pacientes. Recursos científicos del Grupo de Investigación FyT - Universidad de Cartagena.'
  },
  '/contactos': {
    title: 'Contactos',
    description: 'Información de contacto institucional del Grupo FyT.'
  },
  '/equipo': {
    title: 'Equipo',
    description: 'Investigadores y semilleristas del Grupo de Investigación en Farmacología y Terapéutica (Grupo FyT) - Universidad de Cartagena. Especialistas en farmacología, farmacovigilancia, farmacoeconomía, farmacoepidemiología y ciencias biomédicas comprometidos con la investigación científica.'
  },
  '/politica-privacidad': {
    title: 'Política de Privacidad',
    description: 'Política de tratamiento de datos personales y protección de información del Grupo de Investigación en Farmacología y Terapéutica - Universidad de Cartagena. Cumplimiento normativa colombiana.'
  },
  '/terminos-uso': {
    title: 'Términos de Uso',
    description: 'Términos y condiciones de uso de recursos, herramientas y plataformas digitales del Grupo FyT - Universidad de Cartagena. Normativa y responsabilidades para usuarios.'
  },
  '/codigo-etica': {
    title: 'Código de Ética',
    description: 'Principios éticos, valores institucionales y buenas prácticas de investigación científica del Grupo FyT - Universidad de Cartagena. Compromiso con la integridad académica en Colombia.'
  },
  '/calculator/dosage': {
    title: 'Calculadora de Dosificación',
    description: 'Calculadora farmacológica para cálculo preciso de dosificación y ajuste de dosis. Herramienta clínica de atención farmacéutica del Grupo de Investigación FyT - Universidad de Cartagena para profesionales de la salud.'
  },
  
  // ========================================
  // METADATOS DINÁMICOS INYECTADOS AUTOMÁTICAMENTE
  // ========================================
  ...divulgacionMeta,  // Title y description específicos por artículo
};
