// Componente base para item de contenido digital (videos/podcasts)
import React from "react";
import { ExternalLink, Calendar, Tag, Play, Headphones, Film, Users } from "lucide-react";

export interface ContenidoDigitalItemProps {
  titulo: string;
  autores?: string; // Presentador o creador
  fecha?: string;
  tipo?: string; // Video, Podcast, Webinar, etc.
  institucion?: string; // Plataforma o canal
  enlace?: string;
  tags?: string[];
  descripcion?: string;
  duracion?: string;
}

const ContenidoDigitalItem: React.FC<ContenidoDigitalItemProps> = ({
  titulo,
  autores,
  fecha,
  tipo,
  institucion,
  enlace,
  tags,
  descripcion,
  duracion,
}) => {
  const getTypeIcon = () => {
    switch (tipo?.toLowerCase()) {
      case "video":
        return <Film className="w-3 h-3" />;
      case "podcast":
        return <Headphones className="w-3 h-3" />;
      case "webinar":
        return <Play className="w-3 h-3" />;
      default:
        return <Play className="w-3 h-3" />;
    }
  };

  const getTypeStyles = () => {
    switch (tipo?.toLowerCase()) {
      case "video":
        return "bg-red-50 text-red-700";
      case "podcast":
        return "bg-purple-50 text-purple-700";
      case "webinar":
        return "bg-blue-50 text-blue-700";
      case "entrevista":
        return "bg-green-50 text-green-700";
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
            {getTypeIcon()}
            {tipo}
          </span>
        )}
        {duracion && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            {duracion}
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
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
        {autores && (
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{autores}</span>
          </span>
        )}
        {institucion && (
          <span className="inline-flex items-center gap-1.5">
            <Tag className="w-4 h-4" />
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

      {/* Enlace */}
      {enlace && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            Ver contenido
          </a>
        </div>
      )}
    </article>
  );
};

export default ContenidoDigitalItem;
