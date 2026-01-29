// Tipos para la sección de Divulgación (blog académico institucional)

export interface DivulgacionPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime?: string;
  content: string;
  tags?: string[];
  category?: string;
  authorBio?: string;
}

export type DivulgacionCategory = 
  | "Ciencia y Salud"
  | "Investigación"
  | "Farmacología"
  | "Innovación"
  | "Actualidad Científica";
