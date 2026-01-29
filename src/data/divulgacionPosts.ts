import type { DivulgacionPost } from "@/types/divulgacion";

/**
 * Mock data temporal para la sección de Divulgación
 * 
 * Este archivo contiene publicaciones de ejemplo que demuestran
 * la estructura y diseño de la sección.
 * 
 * Para añadir una nueva publicación real:
 * 1. Añadir un nuevo objeto al array siguiendo la estructura
 * 2. Asegurar que el slug sea único y URL-friendly
 * 3. Proporcionar contenido en formato markdown o HTML
 */

export const divulgacionPosts: DivulgacionPost[] = [
  {
    slug: "codigos-cups-atencion-farmaceutica-colombia",
    title: "Códigos CUPS: Visibilidad del Químico Farmacéutico en el Sistema de Salud Colombiano",
    excerpt: "La actualización de los códigos CUPS es clave para reconocer el rol clínico del Químico Farmacéutico y garantizar la seguridad del paciente en Colombia.",
    author: "Antistio Alviz Amador",
    authorRole: "Q.F., MSc, PhD",
    authorImage: "/images/equipo/Antistio-Alviz-large.webp",
    authorBio: "Químico Farmacéutico, Magíster en Farmacología y Doctor en Ciencias Biomédicas. Director del Grupo de Investigación Farmacia y Terapéutica (FyT) y del programa de Química Farmacéutica de la Universidad de Cartagena.",
    date: "2026-01-06",
    readTime: "3 min",
    category: "Asuntos Regulatorios",
    tags: ["Codificación en Salud", "CUPS", "Interoperabilidad", "Rol Farmacéutico", "Seguridad del Paciente"],
    content: `
<p class="lead">En el sistema de salud colombiano, la <strong>Clasificación Única de Procedimientos en Salud (CUPS)</strong> constituye el lenguaje técnico que permite que cada intervención sea registrada, medida y financiada. Sin embargo, para el Químico Farmacéutico, esta estructura ha presentado históricamente un vacío que limita el reconocimiento de su rol asistencial. La evolución de estos códigos no debe verse como un simple ajuste administrativo, sino como una necesidad imperativa para otorgar visibilidad real a la profesión y fortalecer los procesos de seguridad del paciente.</p>

<h2>¿Qué son los códigos CUPS y por qué importan?</h2>

<p>Formalmente, el Artículo 4 de la Resolución 4678 de 2015 define los CUPS como el sistema que corresponde al ordenamiento lógico y detallado de los procedimientos en salud, "en cumplimiento de los principios de interoperabilidad y estandarización de datos".</p>

<p>En la práctica, esto significa que cada procedimiento recibe un código único, lo cual es esencial para estandarizar el registro, la facturación y el análisis de datos a nivel nacional, independientemente del profesional que lo realice. Sin embargo, este modelo presenta una ambigüedad crítica en lo que respecta a los servicios clínicos farmacéuticos.</p>

<h2>El problema: Invisibilidad de datos y labor clínica</h2>

<p>Nos enfrentamos a una falta de especificidad que diluye la labor del Químico Farmacéutico. Al agrupar diversas actividades en códigos genéricos, se genera un déficit de datos que impide al Ministerio de Salud y a los entes de control valorar el impacto real de nuestras intervenciones.</p>

<blockquote class="highlight-quote">"La atención farmacéutica, por su propia naturaleza legal y técnica, no es un proceso de soporte logístico, sino un acto clínico autónomo."</blockquote>

<p>Cuando realizamos una entrevista al paciente, construimos su perfil farmacoterapéutico y detectamos problemas relacionados con los medicamentos, estamos ejecutando una actividad equivalente en rigor a una consulta profesional especializada. Esta labor responde a un universo complejo de patologías y a todo el arsenal terapéutico disponible, tanto farmacológico como no farmacológico.</p>

<h2>La solución: Codificación de la Interconsulta</h2>

<p>La inclusión de códigos específicos para la <strong>Interconsulta por Químico Farmacéutico</strong> y las consultas de seguimiento se vuelve el pilar para la integración definitiva en el equipo interdisciplinario. Este reconocimiento permite que nuestra participación en la historia clínica deje de ser una nota marginal para convertirse en un procedimiento trazable. Es la herramienta que nos permite hablar el mismo idioma que otras disciplinas, como enfermería o nutrición, quienes ya cuentan con este respaldo.</p>

<h2>Impacto directo en la Seguridad del Paciente</h2>

<p>El beneficio de esta visibilidad impacta directamente a las poblaciones más vulnerables. La intervención del Químico Farmacéutico reduce de forma comprobada la morbilidad y los reingresos hospitalarios en escenarios de alta complejidad, tales como:</p>

<ul class="clinical-checklist">
  <li>Manejo de enfermedades huérfanas.</li>
  <li>Atención pediátrica especializada.</li>
  <li>Control de la polifarmacia en adultos mayores.</li>
  </ul>

<p>Al formalizar estos procedimientos, el sistema finalmente podrá cuantificar cómo la gestión experta de la farmacoterapia salva vidas y optimiza los recursos públicos.</p>

<h2>Conclusión</h2>

<p>Actualizar los CUPS es un acto de justicia profesional y responsabilidad sanitaria. Solo a través de una codificación que reconozca nuestra autonomía clínica podremos asegurar que el papel del Químico Farmacéutico en Colombia sea valorado por su verdadero aporte: garantizar que cada tratamiento sea una herramienta de curación segura, efectiva y humana.</p>

<div class="references-section">
  <h3>Referencias y Lecturas Recomendadas</h3>
  <ol>
    <li>Ministerio de Salud y Protección Social. Resolución 4678 de 2015: Por la cual se adopta la Clasificación Única de Procedimientos en Salud - CUPS.</li>
  </ol>
</div>
    `
  },
  {
    slug: "innovacion-eeirf-metodo-deti-seguridad-paciente",
    title: "Prevención y Priorización Clínica: La EEIRF como herramienta de Atención Farmacéutica",
    excerpt: "Análisis divulgativo de la EEIRF y el Método DETI como herramientas clínicas para priorizar intervenciones farmacéuticas y proteger la seguridad del paciente.",
    author: "Manuel de los Santos Ávila Padilla",
    authorRole: "Q.F., MSc",
    authorImage: "/images/equipo/manuel-avila-large.webp",
    authorBio: "Químico Farmacéutico y Magíster en Farmacia Asistencial. Autor del Método DETI y la Escala EEIRF. Docente de la Maestría en Farmacia Asistencial y Director del Diplomado en Evaluación de Riesgo Farmacológico de la Universidad de Cartagena.",
    date: "2026-01-29",
    readTime: "3 min",
    category: "Farmacia Clínica",
    tags: [
      "Farmacia Clínica",
      "Seguridad del Paciente",
      "Atención Farmacéutica",
      "Método DETI",
      "EEIRF"
    ],
    content: `
<p class="lead">
En los sistemas de salud contemporáneos, la seguridad del paciente ya no puede depender exclusivamente de la reacción ante eventos adversos. La creciente complejidad de los tratamientos farmacológicos exige modelos estructurados de prevención, priorización y gestión del riesgo desde la práctica clínica.
</p>

<h2>¿Por qué evaluar el riesgo farmacológico de forma estructurada?</h2>

<p>
La práctica clínica reconoce que el <strong>Químico Farmacéutico</strong> interviene en escenarios donde el <strong>riesgo farmacológico</strong> no es homogéneo, y por ello necesita criterios objetivos para la <strong>priorización clínica</strong> de pacientes. Evaluar de forma estructurada permite ordenar la intervención, disminuir la variabilidad del juicio individual y alinear el seguimiento con la gravedad potencial de cada caso.
</p>

<h2>El Método DETI: del criterio individual al algoritmo clínico</h2>

<p>
La EEIRF se apoya en el Método DETI de Atención Farmacéutica, que transforma la experiencia clínica en un modelo replicable y trazable para la toma de decisiones en contextos asistenciales reales.
</p>

<ul class="clinical-checklist">
  <li>Integrar información clínica del paciente.</li>
  <li>Analizar la farmacoterapia activa.</li>
  <li>Incorporar variables sociodemográficas y asistenciales.</li>
</ul>

<blockquote class="highlight-quote">
“La atención farmacéutica no es un proceso de soporte logístico, sino un acto clínico autónomo orientado a la seguridad del paciente.”
</blockquote>

<h2>Construcción y validación: rigor que respalda la práctica clínica</h2>

<p>
La construcción de la EEIRF se sustentó en metodología de validación científica para asegurar consistencia, claridad y utilidad clínica en escenarios reales de atención farmacéutica.
</p>

<ul class="clinical-checklist">
  <li><strong>Validez de contenido</strong> respaldada por acuerdo experto y relevancia temática.</li>
  <li><strong>Concordancia entre jueces</strong> con niveles de consistencia que soportan decisiones clínicas reproducibles.</li>
  <li><strong>Consistencia interna</strong> adecuada para un instrumento multidimensional orientado a la práctica.</li>
</ul>

<h2>¿Qué diferencia a la EEIRF de otras herramientas clínicas?</h2>

<p>
Mientras los criterios STOPP/START se enfocan en prescripción potencialmente inapropiada, la EEIRF integra una visión más amplia del riesgo, incluyendo la complejidad terapéutica y la dinámica del sistema asistencial.
</p>

<p>
Además, herramientas como la carga anticolinérgica, PHARAO, Janusmed e IMPACT aportan métricas específicas, pero no consolidan en un solo instrumento la priorización integral que requiere la práctica farmacéutica clínica.
</p>

<ul class="clinical-checklist">
  <li>Manejo de enfermedades huérfanas.</li>
  <li>Atención pediátrica especializada.</li>
  <li>Control de la polifarmacia en adultos mayores.</li>
</ul>

<h2>Una reflexión final</h2>

<p>
La innovación clínica también implica ordenar la práctica, medir el riesgo y actuar con oportunidad. EEIRF y el Método DETI muestran que la priorización basada en evidencia es una responsabilidad ética y sanitaria.
</p>

<div class="references-section">
  <h3>Referencias y lecturas recomendadas</h3>
  <ol>
    <li>Ospina AS, Benjumea DM, Amariles PM. Rev Fac Nac Salud Pública. 2011.</li>
    <li>Organización Panamericana de la Salud. Servicios farmacéuticos basados en APS. 2013.</li>
    <li>American College of Clinical Pharmacy. Definition of Clinical Pharmacy. 2008.</li>
    <li>Avila Padilla M. Método DETI de Atención Farmacéutica. 2022.</li>
    <li>Menezes MS et al. Exploratory Research in Clinical and Social Pharmacy. 2024.</li>
  </ol>
</div>
    `
  },
  // COMENTADOS: Posts de prueba/demostración generados por IA
  // Se dejan en el código como referencia para futuras reactivaciones
  // pero no se prerenderizarán ni aparecerán en el sitio público
  /*
  {
    slug: "futuro-farmacologia-personalizada",
    title: "El futuro de la farmacología personalizada: De la teoría a la práctica clínica",
    excerpt: "La farmacogenómica está revolucionando el tratamiento médico. Exploramos cómo la medicina personalizada está transformando la forma en que prescribimos medicamentos.",
    author: "Antistio Alviz",
    authorRole: "Director del grupo FyT, PhD. Ciencias Biomédicas",
    authorImage: "/images/equipo/Antistio-Alviz-large.webp",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Farmacología",
    tags: ["Farmacogenómica", "Medicina Personalizada", "Innovación"],
    content: `
# El futuro de la farmacología personalizada

La farmacología personalizada representa uno de los avances más prometedores en la medicina moderna. Este artículo explora cómo la integración de la genómica y la farmacología está transformando el paradigma del tratamiento médico.

## Introducción

Durante décadas, el enfoque terapéutico ha seguido el modelo "una talla para todos". Sin embargo, la variabilidad individual en la respuesta a los medicamentos ha sido un desafío constante para los profesionales de la salud.

## El papel de la farmacogenómica

La farmacogenómica estudia cómo los genes afectan la respuesta de una persona a los medicamentos. Este campo combina la farmacología y la genómica para desarrollar tratamientos efectivos y seguros basados en el perfil genético del paciente.

### Aplicaciones clínicas actuales

1. **Oncología**: Personalización de quimioterapias basadas en marcadores tumorales
2. **Psiquiatría**: Optimización de antidepresivos según metabolizadores
3. **Cardiología**: Ajuste de anticoagulantes y estatinas

## Desafíos y oportunidades

A pesar de los avances, existen barreras significativas:
- Costo de los análisis genéticos
- Infraestructura tecnológica necesaria
- Formación del personal de salud
- Aspectos éticos y de privacidad

## Conclusión

La farmacología personalizada no es el futuro, es el presente. Nuestra responsabilidad como investigadores es hacer que esta tecnología sea accesible, ética y efectiva para todas las poblaciones.
    `
  },
  {
    slug: "microbioma-resistencia-antibioticos",
    title: "Microbioma intestinal y resistencia antibiótica: Una relación compleja",
    excerpt: "Nuevos estudios revelan cómo el microbioma intestinal influye en el desarrollo de resistencia a los antibióticos. Una perspectiva desde la investigación básica.",
    author: "Yaneth García",
    authorRole: "Investigadora Senior, MSc. Microbiología",
    authorImage: "/images/equipo/Yaneth-Garcia-medium.webp",
    date: "2025-01-10",
    readTime: "10 min",
    category: "Investigación",
    tags: ["Microbioma", "Antibióticos", "Resistencia Bacteriana"],
    content: `
# Microbioma intestinal y resistencia antibiótica

El microbioma intestinal juega un papel crucial en nuestra salud, pero también puede ser un reservorio de genes de resistencia antibiótica. Este artículo examina la intersección entre microbiología y farmacología.

## El ecosistema invisible

Nuestro intestino alberga billones de microorganismos que conforman un ecosistema complejo y dinámico. Este microbioma:
- Ayuda en la digestión
- Modula el sistema inmune
- Produce vitaminas esenciales
- Protege contra patógenos

## Resistencia antibiótica: Un problema global

La resistencia a los antibióticos representa una de las mayores amenazas para la salud pública global. Cada año, miles de personas mueren por infecciones que antes eran tratables.

### Mecanismos de resistencia

Los genes de resistencia pueden transferirse entre bacterias mediante:
1. Conjugación
2. Transformación
3. Transducción

## Perspectivas futuras

La investigación en esta área busca:
- Desarrollar nuevas estrategias terapéuticas
- Preservar la efectividad de los antibióticos existentes
- Implementar prácticas de prescripción racional

## Reflexión final

Como investigadores, debemos abordar la resistencia antibiótica desde una perspectiva holística que incluya el microbioma como actor clave en este desafío global.
    `
  },
  {
    slug: "inteligencia-artificial-descubrimiento-farmacos",
    title: "Inteligencia artificial en el descubrimiento de nuevos fármacos",
    excerpt: "La IA está acelerando el proceso de descubrimiento farmacológico. Analizamos casos de éxito y los desafíos que aún enfrentamos en esta revolución tecnológica.",
    author: "Julián Martínez",
    authorRole: "Investigador en Química Computacional",
    authorImage: "/images/equipo/Julian-Martinez-medium.webp",
    date: "2025-01-05",
    readTime: "12 min",
    category: "Innovación",
    tags: ["Inteligencia Artificial", "Drug Discovery", "Tecnología"],
    content: `
# Inteligencia artificial en el descubrimiento de nuevos fármacos

La inteligencia artificial está transformando radicalmente el proceso de descubrimiento y desarrollo de medicamentos, reduciendo tiempos y costos significativamente.

## El desafío tradicional

Tradicionalmente, el desarrollo de un nuevo fármaco:
- Toma entre 10-15 años
- Cuesta más de 2.6 mil millones de dólares
- Tiene una tasa de fracaso del 90%

## La revolución de la IA

El aprendizaje automático y el deep learning están cambiando este panorama:

### Aplicaciones principales

1. **Screening virtual**: Análisis de millones de compuestos en horas
2. **Predicción de propiedades**: ADME-Tox computacional
3. **Optimización molecular**: Diseño dirigido de candidatos
4. **Identificación de dianas**: Descubrimiento de nuevos targets terapéuticos

## Casos de éxito recientes

Varias compañías han reportado avances significativos:
- Reducción del 70% en tiempo de identificación de lead compounds
- Mejora en la precisión de predicciones de toxicidad
- Optimización de formulaciones farmacéuticas

## Limitaciones actuales

A pesar del entusiasmo, existen desafíos:
- Calidad y cantidad de datos de entrenamiento
- Interpretabilidad de los modelos
- Validación experimental necesaria
- Integración con procesos regulatorios

## Perspectiva desde América Latina

En nuestra región, debemos:
- Invertir en infraestructura computacional
- Formar talento especializado
- Establecer colaboraciones internacionales
- Adaptar estas tecnologías a nuestras necesidades locales

## Conclusión

La IA no reemplaza al científico, sino que potencia su capacidad para innovar. El futuro del descubrimiento farmacológico es colaborativo: humano + máquina.
    `
  }
  */
  {
    slug: "eeirf-metodo-deti-seguridad-paciente",
    title: "Desarrollo y Validación de la EEIRF: Gestión del Riesgo Farmacológico basada en Evidencia",
    excerpt: "La EEIRF y el Método DETI transforman la práctica farmacéutica en decisiones estructuradas basadas en evidencia para la seguridad del paciente.",
    author: "Manuel de los Santos Ávila Padilla",
    authorRole: "Q.F., MSc",
    authorImage: "/images/equipo/manuel-avila-large.webp",
    authorBio: "Químico Farmacéutico y Magíster en Farmacia Asistencial. Autor del Método DETI y la Escala EEIRF. Docente de la Maestría en Farmacia Asistencial y Director del Diplomado en Evaluación de Riesgo Farmacológico de la Universidad de Cartagena.",
    date: "2026-01-29",
    readTime: "5 min",
    category: "Farmacia Clínica",
    tags: ["Seguridad del Paciente", "Atención Farmacéutica", "Seguimiento Farmacoterapéutico", "Método DETI", "EEIRF"],
    content: `
<p class="lead">En el escenario actual de la atención sanitaria, el Químico Farmacéutico no solo gestiona medicamentos: gestiona riesgos clínicos. La seguridad del paciente depende, en gran medida, de identificar de forma oportuna quién necesita una intervención farmacéutica prioritaria y por qué.</p>

<h2>El desafío actual: priorizar con criterio clínico y datos</h2>

<p>La práctica farmacéutica contemporánea enfrenta una presión creciente: polifarmacia, pacientes con múltiples comorbilidades, atención domiciliaria y limitación de recursos humanos.</p>

<p>Tradicionalmente, la priorización de pacientes ha dependido del "ojo clínico" o de criterios aislados. Si bien la experiencia profesional es valiosa, la complejidad del riesgo farmacológico exige modelos más estructurados y reproducibles.</p>

<p>Aquí es donde la <strong>Escala de Evaluación Individual de Riesgo Farmacológico (EEIRF)</strong> aporta valor diferencial.</p>

<h2>El Método DETI: fundamento conceptual y operativo</h2>

<p>La EEIRF se fundamenta en el <strong>Método DETI de Atención Farmacéutica</strong>, desarrollado por el Químico Farmacéutico Manuel de los Santos Ávila Padilla, MSc.</p>

<p>Este método propone una estructura clara para el seguimiento farmacoterapéutico, permitiendo al profesional:</p>

<ul class="clinical-checklist">
  <li><strong>Identificar riesgos</strong> asociados a la medicación de forma sistemática.</li>
  <li><strong>Priorizar pacientes</strong> de forma objetiva y basada en evidencia.</li>
  <li><strong>Optimizar el tiempo</strong> de intervención clínica en entornos de alta demanda.</li>
</ul>

<p>Bajo esta lógica, el Método DETI establece el marco conceptual, mientras que la EEIRF actúa como su herramienta operativa de estratificación del riesgo.</p>

<h2>De la intuición clínica a la evidencia científica</h2>

<p>La EEIRF fue diseñada para abordar el riesgo farmacológico como un fenómeno multidimensional. Integra en un solo instrumento variables:</p>

<ul class="clinical-checklist">
  <li><strong>Sociodemográficas:</strong> Edad, condiciones de vida, soporte familiar.</li>
  <li><strong>Clínicas:</strong> Comorbilidades, estado funcional, polifarmacia.</li>
  <li><strong>De utilización de servicios:</strong> Hospitalizaciones previas, uso de urgencias.</li>
  <li><strong>Relacionadas con la medicación:</strong> Adherencia, eventos adversos previos, interacciones.</li>
</ul>

<p>Este enfoque permite una evaluación más realista y alineada con la complejidad de los pacientes atendidos en la práctica clínica actual.</p>

<h2>Validación metodológica: respaldo científico</h2>

<p>El desarrollo y la validación de contenido de la EEIRF se realizaron mediante el método Delphi, siguiendo estándares ampliamente aceptados en investigación en salud.</p>

<p>Los resultados confirman su robustez:</p>

<ul class="clinical-checklist">
  <li><strong>Validez de contenido:</strong> V de Aiken = 0,98, reflejando consenso experto excepcional.</li>
  <li><strong>Concordancia entre jueces:</strong> W de Kendall = 0,837, indicando acuerdo sólido sobre los factores evaluados.</li>
  <li><strong>Confiabilidad:</strong> Alfa de Cronbach = 0,702, adecuado para instrumentos multidimensionales de nueva creación.</li>
</ul>

<p>Estos indicadores respaldan el uso de la EEIRF como herramienta confiable en la práctica farmacéutica clínica.</p>

<blockquote class="highlight-quote">"La validación científica transforma una propuesta teórica en una herramienta clínica confiable. Sin evidencia que respalde su construcción, cualquier instrumento permanece como una idea sin impacto real en la seguridad del paciente."</blockquote>

<h2>Impacto clínico y proyección profesional</h2>

<p>La implementación de la EEIRF permite al Químico Farmacéutico:</p>

<ul class="clinical-checklist">
  <li><strong>Priorizar pacientes</strong> con mayor riesgo farmacológico de manera objetiva.</li>
  <li><strong>Optimizar recursos</strong> y tiempo de intervención en entornos de alta demanda.</li>
  <li><strong>Fortalecer la trazabilidad</strong> de sus decisiones clínicas con respaldo científico.</li>
  <li><strong>Generar información útil</strong> para investigación y gestión sanitaria.</li>
</ul>

<p>En un sistema de salud orientado a resultados, este tipo de herramientas fortalecen el rol clínico del farmacéutico y contribuyen directamente a la seguridad del paciente.</p>

<h2>Conclusión</h2>

<p>La Escala de Evaluación Individual de Riesgo Farmacológico, articulada con el Método DETI, representa un avance significativo para la Farmacia Clínica. Más que un instrumento, constituye una estrategia basada en evidencia que permite transformar la experiencia clínica en decisiones estructuradas y medibles.</p>

<p>Invertir en herramientas validadas no es solo una decisión académica: es una responsabilidad profesional orientada a mejorar los resultados en salud.</p>

<div class="references-section">
  <h3>Referencias y Lecturas Recomendadas</h3>
  <ol>
    <li><strong>Ávila Padilla, M.</strong> Método DETI de Atención Farmacéutica. Grupo de Investigación Farmacia y Terapéutica, Universidad de Cartagena. 2025.</li>
    <li><strong>Aiken, L.R.</strong> Content validity and reliability of single items or questionnaires. Educational and Psychological Measurement. 1980; 40(4): 955-959.</li>
    <li><strong>Cronbach, L.J.</strong> Coefficient alpha and the internal structure of tests. Psychometrika. 1951; 16(3): 297-334.</li>
    <li><strong>Ministerio de Salud y Protección Social.</strong> Política Farmacéutica Nacional. Bogotá, Colombia. 2012.</li>
  </ol>
</div>
    `,
  },
];

/**
 * Función auxiliar para obtener un post por slug
 */
export function getPostBySlug(slug: string): DivulgacionPost | undefined {
  return divulgacionPosts.find(post => post.slug === slug);
}

/**
 * Función auxiliar para obtener posts recientes
 */
export function getRecentPosts(limit: number = 3): DivulgacionPost[] {
  return [...divulgacionPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
