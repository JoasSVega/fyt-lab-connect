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
    slug: "actualizacion-codigos-cups-atencion-farmaceutica",
    title: "CUPS en atención farmacéutica: visibilidad del Químico Farmacéutico",
    excerpt: "Actualizar los CUPS en atención farmacéutica visibiliza la labor clínica del Químico Farmacéutico y mejora la seguridad del paciente con trazabilidad.",
    author: "Antistio Alviz Amador",
    authorRole: "Q.F., MSc, PhD - Grupo de Investigación en Farmacología y Terapéutica (FyT)",
    authorImage: "/images/equipo/Antistio-Alviz-medium.webp",
    date: "2026-01-06",
    readTime: "7 min",
    category: "Política Farmacéutica",
    tags: ["Atención Farmacéutica", "CUPS", "Política de Salud", "Química Farmacéutica", "Colombia"],
    content: `
<p>En el sistema de salud colombiano, la Clasificación Única de Procedimientos en Salud (CUPS) constituye el eje sobre el cual se articula la atención; es el lenguaje técnico que permite que cada intervención sea registrada, medida y, por supuesto, financiada. Sin embargo, para el Químico Farmacéutico, esta estructura ha presentado históricamente un vacío que limita el reconocimiento de su rol asistencial. Por esta razón, la evolución de estos códigos no debe verse como un simple ajuste administrativo, sino como una necesidad imperativa para otorgar visibilidad real a la profesión desde el ámbito de la atención farmacéutica, lo cual constituye una necesidad en los procesos de seguridad del paciente.</p>

<h2>¿Qué son los códigos CUPS?</h2>

<p>Formalmente, el Artículo 4 de la Resolución 4678 de 2015 define los CUPS como el sistema que "corresponde al ordenamiento lógico y detallado de los procedimientos y servicios en salud que se realizan en el país, en cumplimiento de los principios de interoperabilidad y estandarización de datos". En la práctica, esto significa que cada procedimiento, desde una cirugía compleja hasta una consulta de control, recibe un código y una descripción únicos. Este sistema es esencial para estandarizar el registro de la atención, la facturación de servicios y el análisis de datos a nivel nacional, independientemente del profesional que realice el procedimiento. Sin embargo, si bien este modelo funciona para la mayoría de las áreas, presenta una ambigüedad crítica en lo que respecta a los servicios clínicos farmacéuticos.</p>

<p>Teniendo en cuenta lo anterior, nos enfrentamos a una falta de especificidad que diluye la labor del Químico Farmacéutico colombiano. Al agrupar diversas actividades farmacéuticas en códigos genéricos, se genera un déficit de datos que impide al Ministerio de Salud y a los entes de control valorar el impacto real de nuestras intervenciones. La atención farmacéutica, por su propia naturaleza legal y técnica, no es un proceso de soporte logístico, sino un acto clínico autónomo. Cuando realizamos una entrevista al paciente, construimos su perfil farmacoterapéutico y detectamos problemas relacionados con los medicamentos, estamos ejecutando una actividad que es equivalente, en rigor y responsabilidad, a una consulta profesional, que además puede ser especializada por el universo complejo de patologías a las que nos enfrentamos y a todo el arsenal terapéutico disponible tanto farmacológico como no farmacológico.</p>

<p>Bajo esta premisa, la inclusión de códigos específicos para la Interconsulta por Químico Farmacéutico y las consultas de seguimiento se vuelve el pilar para la integración definitiva del farmacéutico en el equipo interdisciplinario. Este reconocimiento permite que nuestra participación en la historia clínica deje de ser una nota marginal para convertirse en un procedimiento trazable. Es, en esencia, la herramienta que nos permite hablar el mismo idioma que otras disciplinas de la salud, como enfermería o nutrición, quienes ya cuentan con este respaldo en la codificación nacional para sus consultas especializadas.</p>

<p>El beneficio de esta visibilidad impacta directamente en la seguridad de las poblaciones más vulnerables. En escenarios de alta complejidad, como el manejo de enfermedades huérfanas, la atención pediátrica o el control de la polifarmacia en adultos mayores, la intervención del Químico Farmacéutico reduce de forma comprobada la morbilidad y los reingresos hospitalarios. Al formalizar estos procedimientos mediante códigos CUPS diferenciados, el sistema finalmente podrá cuantificar cómo la gestión experta de la farmacoterapia salva vidas y optimiza los recursos públicos.</p>

<p>En definitiva, actualizar los CUPS para reflejar la realidad de la atención farmacéutica es un acto de justicia profesional y de responsabilidad sanitaria. Solo a través de una codificación que reconozca nuestra autonomía clínica podremos asegurar que el papel del Químico Farmacéutico en Colombia sea valorado por su verdadero aporte: garantizar que cada tratamiento sea una herramienta de curación segura, efectiva y humana.</p>
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
    authorImage: "/images/equipo/Antistio-Alviz-medium.webp",
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
