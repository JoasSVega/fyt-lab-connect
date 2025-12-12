// Tipos e interfaces para la sección de Investigación

export interface Proyecto {
  id: number;
  titulo: string;
  autores?: string;
  anio: number;
  mes?: number;
  tipo: string;
  estado: "En curso" | "Finalizado";
  rol: string;
  institucion?: string;
  ciudad?: string;
  enlace?: string;
  descripcion?: string;
  lineas?: string[];
  tags?: string[];
}

export interface Publicacion {
  id: number;
  titulo: string;
  autores: string;
  anio: number;
  mes?: number;
  tipo: "articulo" | "libro" | "capitulo" | "divulgacion";
  revista?: string;
  editorial?: string;
  institucion?: string;
  ciudad?: string;
  enlace?: string;
  doi?: string;
  descripcion?: string;
  indexacion?: string;
  tags?: string[];
}

export interface Evento {
  id: number;
  titulo: string;
  autores?: string;
  anio: number;
  mes?: number;
  tipo: string;
  participacion: string;
  institucion?: string;
  ciudad?: string;
  lugar?: string;
  enlace?: string;
  descripcion?: string;
  tags?: string[];
}

export interface Curso {
  id: number;
  titulo: string;
  autores?: string;
  anio: number;
  mes?: number;
  tipo: string;
  modalidad?: string;
  duracion?: string;
  institucion?: string;
  ciudad?: string;
  enlace?: string;
  descripcion?: string;
  tags?: string[];
}

export interface ContenidoDigital {
  id: number;
  titulo: string;
  autores?: string;
  anio: number;
  mes?: number;
  tipo: "video" | "podcast" | "webinar";
  duracion?: string;
  plataforma?: string;
  institucion?: string;
  enlace?: string;
  descripcion?: string;
  tags?: string[];
}

// Tipo para tutorías y trabajos dirigidos
export interface Tutoria {
  id: number;
  titulo: string;
  estudiante: string;
  anio: number;
  mes?: number;
  tipo: string; // Pregrado, Maestría, Doctorado
  programa?: string;
  institucion?: string;
  estado?: "En curso" | "Finalizado";
  enlace?: string;
  descripcion?: string;
  tags?: string[];
}
