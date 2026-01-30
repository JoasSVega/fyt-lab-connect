import type { Noticia } from "@/types/noticias";

/**
 * Registro cronológico institucional de noticias del Grupo FyT
 * 
 * Características:
 * - Ordenadas por fecha descendente (más recientes primero)
 * - Sin imágenes en el overview
 * - Imágenes solo en páginas individuales
 * - Tono formal, académico, tercera persona
 * - Protagonista: Grupo FyT e instituciones, no narrativas personales
 */

export const noticias: Noticia[] = [
  {
    slug: "fyt-fortalece-colaboracion-internacional-guadalajara",
    date: "2026-01-21",
    category: "Colaboración",
    title: "Grupo FyT fortalece colaboración internacional con la Universidad de Guadalajara",
    summary: "Se consolida una conexión académica internacional orientada al fortalecimiento de la divulgación científica y el desarrollo de investigación computacional e in silico.",
    subtitle: "Intercambio académico internacional y vinculación de estudiante doctoral marca el inicio de una cooperación institucional con impacto en la investigación biomédica.",
    cta: "Ver comunicado",
    
    // Información de imagen principal (NO incrustar)
    imagePlaceholder: "Ubicar imagen al inicio del contenido - Foto documental de reunión académica o acto de cooperación institucional entre las dos universidades",
    imageAlt: "Encuentro académico colaborativo entre la Universidad de Cartagena y la Universidad de Guadalajara",
    
    // Contenido redactado formal
    content: `
<p class="lead">
En el marco de un encuentro colaborativo, se consolidó una conexión académica internacional entre la <strong>Universidad de Cartagena</strong> y la <strong>Universidad de Guadalajara</strong>, orientada al fortalecimiento de la divulgación científica y al desarrollo de nuevo conocimiento en el área de la investigación computacional e in silico.
</p>

<h2>Origen de la colaboración</h2>

<p>
Esta aproximación surge a partir del interés investigativo del docente <strong>Juan Manuel Guzmán Flores</strong>, vinculado al <strong>Centro Universitario de los Altos (CUALTOS)</strong> de la <strong>Universidad de Guadalajara</strong>, en el desarrollo de estudios in silico. Su visita académica a Colombia permitió un acercamiento directo a la <strong>Universidad de Cartagena</strong> y al trabajo desarrollado por distintos grupos de investigación enfocados en análisis de datos y computación aplicada.
</p>

<h2>Establecimiento de vínculos con el Grupo FyT</h2>

<p>
Como resultado del intercambio académico, se establecieron vínculos de colaboración con el <strong>Grupo de Investigación en Farmacología y Terapéutica (FyT)</strong> del programa de Ciencias Farmacéuticas de la <strong>Universidad de Cartagena</strong>. Este proceso fue acompañado por la visión institucional del director del grupo, <strong>Antistio Alviz Amador</strong>, quien promovió el fortalecimiento de los lazos académicos y de cooperación entre ambas instituciones.
</p>

<h2>Líneas de trabajo y vinculación estudiantil</h2>

<p>
En el marco de esta relación internacional, se proyectaron líneas de trabajo de interés común orientadas a fortalecer los procesos investigativos desarrollados por ambos grupos. Esta colaboración derivó en la vinculación de un estudiante pasante con adscripción directa al <strong>Centro Universitario de los Altos (CUALTOS)</strong>.
</p>

<p>
La participación del estudiante doctoral <strong>Rafael Pineda Alemán</strong> constituye el punto de partida formal de esta colaboración internacional, que amplía las oportunidades de trabajo conjunto con diferentes centros universitarios adscritos a la red académica de la <strong>Universidad de Guadalajara</strong> y contribuye al reconocimiento del trabajo colaborativo con la <strong>Universidad de Cartagena</strong>.
</p>

<h2>Proyecto de investigación conjunto</h2>

<p>
Actualmente, se desarrolla de manera conjunta el proyecto de investigación titulado:
</p>

<blockquote class="highlight-quote">
"Diseño in silico de una <strong>vacuna peptídica multiepítopo</strong> utilizando inmunoinformática y análisis de interacción proteína-proteína para combatir la resistencia a los antibióticos en <em>Acinetobacter baumannii</em>"
</blockquote>

<p>
Este trabajo ha sido acogido y reconocido por el <strong>Centro Universitario de Ciencias de la Salud (CUCS)</strong> de la <strong>Universidad de Guadalajara</strong>, específicamente en el <strong>Instituto de Investigaciones en Ciencias Biomédicas</strong>, dirigido por el doctor <strong>José Francisco Muñoz Valle</strong>.
</p>

<h2>Acercamiento institucional en la Universidad de Guadalajara</h2>

<p>
Durante la visita académica internacional a la <strong>Universidad de Guadalajara</strong>, el doctor <strong>José Francisco Muñoz Valle</strong> brindó una cálida bienvenida al profesor <strong>Juan Manuel Guzmán Flores</strong> y al estudiante doctoral <strong>Rafael Pineda Alemán</strong>, resaltando la importancia de la cooperación académica e investigativa entre las instituciones participantes. Este acercamiento fortalece el acceso a nuevas oportunidades de colaboración tanto en investigación experimental como in silico.
</p>

<p>
A través de sus canales institucionales, el doctor <strong>José Francisco Muñoz Valle</strong> destacó la relevancia de la colaboración académica, la investigación conjunta y la cooperación internacional, manifestando su interés en continuar fortaleciendo los lazos de trabajo con la <strong>Universidad de Cartagena</strong>.
</p>

<h2>Impacto e implicaciones futuras</h2>

<p>
Esta colaboración representa un hito en la consolidación del Grupo FyT como actor relevante en la cooperación internacional, contribuyendo a:
</p>

<ul class="institutional-list">
  <li>El fortalecimiento de la investigación en farmacología computacional e inmunoinformática.</li>
  <li>La creación de redes académicas formales entre instituciones latinoamericanas.</li>
  <li>La generación de conocimiento aplicado a problemas sanitarios de relevancia global, como la resistencia antimicrobiana.</li>
  <li>La formación de estudiantes doctorales en contextos de cooperación internacional.</li>
</ul>

<p>
El <strong>Grupo FyT</strong> reafirma su compromiso con la cooperación académica y la investigación de excelencia como herramientas para avanzar en el conocimiento científico y responder a los desafíos del sector salud.
</p>
    `,
    
    // Información institucional
    principalInstitutions: [
      "Universidad de Cartagena",
      "Universidad de Guadalajara"
    ],
    
    researchGroups: [
      "Grupo de Investigación en Farmacología y Terapéutica (FyT)",
      "Grupos de investigación en análisis de datos y computación aplicada"
    ],
    
    images: [
      {
        webp: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/01.webp",
        png: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/01.png",
        alt: "Encuentro académico inicial - Presentación de proyectos de investigación compartidos"
      },
      {
        webp: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/02.webp",
        png: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/02.png",
        alt: "Reunión colaborativa - Discusión académica sobre líneas de investigación conjunta"
      },
      {
        webp: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/03.webp",
        png: "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/03.png",
        alt: "Acto protocolar - Representantes institucionales y miembros del Grupo FyT"
      }
    ],
    
    relatedLinks: [
      {
        title: "Universidad de Cartagena",
        url: "https://www.unicartagena.edu.co/"
      },
      {
        title: "Universidad de Guadalajara",
        url: "https://www.udg.mx/"
      }
    ],
    
    metadata: {
      institution: "Universidad de Cartagena",
      location: "Cartagena, Colombia / Guadalajara, México"
    }
  }
];

/**
 * Función auxiliar para obtener una noticia por slug
 */
export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find(noticia => noticia.slug === slug);
}

/**
 * Función auxiliar para obtener todas las noticias ordenadas (descendente por defecto)
 */
export function getAllNoticias(ascending = false): Noticia[] {
  const sorted = [...noticias].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
  return sorted;
}

/**
 * Función auxiliar para obtener noticias por categoría
 */
export function getNoticiasByCategory(category: Noticia["category"]): Noticia[] {
  return getAllNoticias().filter(noticia => noticia.category === category);
}
