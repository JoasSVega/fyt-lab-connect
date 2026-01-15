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
    title: 'Grupo FyT - Investigación Farmacología Universidad',
    description: 'Grupo de investigación en Farmacología y Terapéutica de la Universidad de Cartagena. Proyectos, publicaciones y herramientas.'
  },
  '/sobre-nosotros': {
    title: 'Sobre Nosotros - Grupo FyT Universidad de Cartagena',
    description: 'Grupo de investigación categoría B Minciencias. Líneas: Atención Farmacéutica, Farmacoeconomía, Farmacovigilancia y Toxicología.'
  },
  '/investigacion': {
    title: 'Investigación Científica Farmacológica - Grupo FyT UdeC',
    description: 'Producción científica del Grupo FyT: proyectos, publicaciones y eventos en Farmacología y Terapéutica de la Universidad de Cartagena.'
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
  '/investigacion/divulgacion-cientifica': {
    title: 'Divulgación Científica Farmacológica - Grupo FyT UdeC',
    description: 'Contenidos de divulgación científica y transferencia de conocimiento del Grupo de Investigación FyT Universidad de Cartagena.'
  },
  '/divulgacion': {
    title: 'Divulgación Científica Farmacológica - Artículos FyT UdeC',
    description: 'Artículos de divulgación científica y análisis en farmacología, terapéutica y política de salud del Grupo FyT.'
  },
  '/noticias': {
    title: 'Noticias Científicas Farmacológicas - Grupo FyT Universidad',
    description: 'Actualidad científica, eventos, publicaciones y logros del Grupo de Investigación en Farmacología y Terapéutica UdeC.'
  },
  '/herramientas': {
    title: 'Herramientas Clínicas Farmacológicas - Grupo FyT Universidad',
    description: 'Calculadoras y herramientas clínicas para profesionales de la salud. Recursos del Grupo FyT en farmacología y terapéutica.'
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
    title: 'Contacto Grupo FyT - Investigación Farmacología Universidad',
    description: 'Información de contacto del Grupo de Investigación en Farmacología y Terapéutica de la Universidad de Cartagena.'
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
