// Tipos para la sección de Noticias (registro institucional cronológico)

export interface NoticiaOverview {
  slug: string;
  date: string;
  category: "Colaboración" | "Evento" | "Publicación" | "Lanzamiento" | "Participación" | "Reconocimiento" | "Comunicado";
  title: string;
  summary: string;
  cta?: string; // "Ver comunicado", "Consultar noticia", etc.
}

export interface Noticia extends NoticiaOverview {
  subtitle?: string;
  imageAlt?: string; // Descripción del tipo de imagen
  imagePlaceholder?: string; // Instrucciones sobre la imagen principal
  content: string;
  principalInstitutions?: string[]; // Instituciones involucradas
  researchGroups?: string[]; // Grupos de investigación
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
  images?: Array<{
    webp: string;
    png?: string;
    alt: string;
  }>; // Galería de imágenes para la página individual
  author?: string; // Opcional: redactor de la noticia
  metadata?: {
    institution?: string;
    location?: string;
  };
}


export interface NoticiaUI extends Noticia {
  // Props adicionales para componentes UI
  previousSlug?: string;
  nextSlug?: string;
}
