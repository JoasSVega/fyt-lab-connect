// Rutas públicas a prerender y metadatos SEO institucional
export const routesToPrerender: string[] = [
  '/',
  '/investigacion',
  '/investigacion/proyectos',
  '/investigacion/publicaciones',
  '/investigacion/eventos',
  '/investigacion/formacion',
  '/investigacion/divulgacion-cientifica',
  '/noticias',
  '/herramientas',
  '/herramientas/clinicos',
  '/herramientas/antropometricos',
  '/herramientas/avanzados',
  '/herramientas/escalas',
  '/sobre-nosotros',
  '/contactos',
  '/equipo',
  '/politica-privacidad',
  '/terminos-uso',
  '/codigo-etica',
  '/calculator/dosage',
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Inicio',
    description:
      'Grupo FyT: Investigación de vanguardia en Farmacología y Terapéutica de la Universidad de Cartagena. Proyectos, publicaciones y herramientas científicas.',
  },
  '/sobre-nosotros': {
    title: 'Sobre Nosotros',
    description:
      'Conoce la misión, visión y líneas de trabajo del Grupo FyT de la Universidad de Cartagena.',
  },
  '/investigacion': {
    title: 'Investigación',
    description:
      'Producción científica en farmacología y terapéutica: proyectos, publicaciones y divulgación del Grupo FyT.',
  },
  '/investigacion/publicaciones': {
    title: 'Publicaciones',
    description: 'Artículos, revisiones y producción académica del Grupo FyT.',
  },
  '/investigacion/proyectos': {
    title: 'Proyectos',
    description: 'Proyectos de investigación activos y finalizados del Grupo FyT.',
  },
  '/investigacion/eventos': {
    title: 'Eventos',
    description: 'Eventos y encuentros científicos del Grupo FyT.',
  },
  '/investigacion/formacion': {
    title: 'Formación',
    description: 'Programas de formación y actividades académicas del Grupo FyT.',
  },
  '/investigacion/divulgacion-cientifica': {
    title: 'Divulgación Científica',
    description: 'Contenidos de divulgación y transferencia del Grupo FyT.',
  },
  '/noticias': { title: 'Noticias', description: 'Actualidad institucional del Grupo FyT.' },
  '/herramientas': { title: 'Herramientas', description: 'Plataforma de herramientas clínicas y científicas.' },
  '/herramientas/clinicos': { title: 'Herramientas Clínicas', description: 'Herramientas clínicas para práctica e investigación.' },
  '/herramientas/antropometricos': { title: 'Herramientas Antropométricas', description: 'Cálculos y escalas antropométricas.' },
  '/herramientas/avanzados': { title: 'Herramientas Avanzadas', description: 'Utilidades avanzadas y experimentales.' },
  '/herramientas/escalas': { title: 'Herramientas: Escalas', description: 'Escalas clínicas normalizadas disponibles.' },
  '/contactos': { title: 'Contactos', description: 'Información de contacto institucional del Grupo FyT.' },
  '/equipo': { title: 'Equipo', description: 'Miembros del Grupo FyT y sus líneas de trabajo.' },
  '/politica-privacidad': { title: 'Política de Privacidad', description: 'Política de tratamiento de datos del Grupo FyT.' },
  '/terminos-uso': { title: 'Términos de Uso', description: 'Términos y condiciones del sitio del Grupo FyT.' },
  '/codigo-etica': { title: 'Código de Ética', description: 'Principios éticos y buenas prácticas del Grupo FyT.' },
  '/calculator/dosage': { title: 'Calculadora de Dosificación', description: 'Herramienta para cálculo de dosificación segura.' },
};
