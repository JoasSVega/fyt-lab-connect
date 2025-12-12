// Componente base para item de publicación
import React from "react";
import { ExternalLink, Users, Calendar, BookOpen, Tag, Building } from "lucide-react";

export interface PublicacionItemProps {
  titulo: string;
  autores?: string;
  fecha?: string;
  tipo?: string;
  institucion?: string; // Revista o editorial
  enlace?: string;
  tags?: string[];
  descripcion?: string;
  doi?: string;
}

const PublicacionItem: React.FC<PublicacionItemProps> = ({
  titulo,
  autores,
  fecha,
  tipo,
  institucion,
  enlace,
  tags,
  descripcion,
  doi,
}) => {
  const getTypeStyles = () => {
    switch (tipo?.toLowerCase()) {
      case "artículo":
      case "articulo":
        return "bg-blue-50 text-blue-700";
      case "libro":
        return "bg-green-50 text-green-700";
      case "capítulo":
      case "capitulo":
        return "bg-purple-50 text-purple-700";
      case "divulgación":
      case "divulgacion":
        return "bg-amber-50 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100">
      {/* Header con tipo y fecha */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {tipo && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getTypeStyles()}`}>
            <BookOpen className="w-3 h-3" />
            {tipo}
          </span>
        )}
        {fecha && (
          <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs">
            <Calendar className="w-3 h-3" />
            {fecha}
          </span>
        )}
      </div>

      {/* Título */}
      <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3 leading-snug">
        {titulo}
      </h3>

      {/* Descripción opcional */}
      {descripcion && (
        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
          {descripcion}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
        {autores && (
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="line-clamp-1">{autores}</span>
          </span>
        )}
        {institucion && (
          <span className="inline-flex items-center gap-1.5">
            <Building className="w-4 h-4" />
            <span>{institucion}</span>
          </span>
        )}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Enlaces */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100">
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            DOI
          </a>
        )}
        {enlace && (
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver publicación
          </a>
        )}
      </div>
    </article>
  );
};

export default PublicacionItem;
