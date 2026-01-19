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
  '/investigacion/contenido-digital',
  
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
    title: 'Grupo FyT | Farmacología y Terapéutica basada en evidencia',
    description: 'Grupo de investigación enfocado en farmacología y terapéutica. Promovemos investigación, divulgación científica y análisis riguroso en salud.'
  },
  '/sobre-nosotros': {
    title: 'Sobre Nosotros | Misión, Visión y Equipo del Grupo FyT',
    description: 'Objetivo, misión, visión y valores del Grupo FyT, junto con la presentación del equipo principal y su enfoque en farmacología y terapéutica.'
  },
  '/investigacion': {
    title: 'Investigación | Producción Académica y Actividad Científica FyT',
    description: 'Resumen de la actividad investigativa del Grupo FyT: publicaciones, proyectos, participación en eventos, formación impartida y contenido digital.'
  },
  '/investigacion/publicaciones': {
    title: 'Publicaciones Científicas Farmacología - Grupo FyT UdeC',
    description: 'Artículos científicos, revisiones y producción académica del Grupo de Investigación en Farmacología y Terapéutica.'
  },
  '/investigacion/proyectos': {
    title: 'Proyectos de Investigación - Grupo FyT Universidad',
    description: 'Proyectos de investigación en farmacología, farmacovigilancia y terapéutica del Grupo FyT Universidad de Cartagena.'
  },
  '/investigacion/eventos': {
    title: 'Eventos Científicos Farmacológicos - Grupo FyT Universidad',
    description: 'Congresos, seminarios y jornadas científicas en farmacología y ciencias de la salud del Grupo FyT Universidad de Cartagena.'
  },
  '/investigacion/formacion': {
    title: 'Formación Académica Investigadores - Grupo FyT Universidad',
    description: 'Programas de formación, maestrías, doctorados y semilleros de investigación en ciencias farmacéuticas del Grupo FyT UdeC.'
  },
  '/investigacion/contenido-digital': {
    title: 'Contenido Digital | Grupo FyT UdeC',
    description: 'Contenido audiovisual y digital sobre investigación en ciencias farmacéuticas del Grupo FyT Universidad de Cartagena.'
  },
  '/divulgacion': {
    title: 'Divulgación Científica | Artículos del Grupo FyT',
    description: 'Artículos de divulgación científica en farmacología, investigación y salud. Contenido riguroso, accesible y basado en evidencia.'
  },
  '/noticias': {
    title: 'Noticias | Actualidad del Grupo FyT',
    description: 'Novedades, actividades y actualizaciones del Grupo FyT relacionadas con investigación, divulgación y trabajo académico.'
  },
  '/herramientas': {
    title: 'Herramientas | Recursos Científicos del Grupo FyT',
    description: 'Herramientas y recursos desarrollados por el Grupo FyT para apoyar el análisis, la investigación y la práctica en salud.'
  },
  '/herramientas/clinicos': {
    title: 'Calculadoras Clínicas Farmacéuticas - Grupo FyT Universidad',
    description: 'Calculadoras clínicas validadas para dosificación, análisis farmacológico y atención farmacéutica del Grupo FyT UdeC.'
  },
  '/herramientas/antropometricos': {
    title: 'Calculadoras Antropométricas Farmacéuticas - Grupo FyT UdeC',
    description: 'Calculadoras de IMC, superficie corporal y evaluación nutricional. Herramientas del Grupo FyT para análisis antropométrico.'
  },
  '/herramientas/avanzados': {
    title: 'Herramientas Computacionales Avanzadas - Grupo FyT',
    description: 'Herramientas computacionales para farmacocinética, farmacodinámica y modelización molecular del Grupo FyT UdeC.'
  },
  '/herramientas/escalas': {
    title: 'Escalas Clínicas Farmacoterapéuticas - Grupo FyT Universidad',
    description: 'Escalas clínicas validadas para evaluación farmacoterapéutica, farmacovigilancia y toxicología del Grupo FyT UdeC.'
  },
  '/contactos': {
    title: 'Contacto | Grupo FyT Investigación Científica',
    description: 'Ponte en contacto con el Grupo FyT para información académica, colaboración científica o consultas institucionales.'
  },
  '/equipo': {
    title: 'Equipo Investigador Farmacología - Grupo FyT Universidad',
    description: 'Investigadores y semilleristas del Grupo FyT especializados en farmacología, farmacovigilancia y ciencias biomédicas.'
  },
  '/politica-privacidad': {
    title: 'Política de Privacidad y Datos - Grupo FyT Universidad',
    description: 'Política de tratamiento de datos personales del Grupo de Investigación en Farmacología y Terapéutica Universidad de Cartagena.'
  },
  '/terminos-uso': {
    title: 'Términos de Uso Plataforma Digital - Grupo FyT Universidad',
    description: 'Términos y condiciones de uso de herramientas digitales del Grupo FyT. Normativa y responsabilidades para usuarios.'
  },
  '/codigo-etica': {
    title: 'Código de Ética Investigación Científica - Grupo FyT UdeC',
    description: 'Principios éticos y buenas prácticas de investigación científica del Grupo FyT Universidad de Cartagena. Integridad académica.'
  },
  '/calculator/dosage': {
    title: 'Calculadora Dosificación Farmacológica - Grupo FyT',
    description: 'Calculadora farmacológica para dosificación y ajuste de dosis. Herramienta de atención farmacéutica del Grupo FyT UdeC.'
  },
  
  // ========================================
  // METADATOS DINÁMICOS INYECTADOS AUTOMÁTICAMENTE
  // ========================================
  ...divulgacionMeta,  // Title y description específicos por artículo
};
