// Componente base para item de proyecto
import React from "react";
import { ExternalLink, Users, Calendar, Tag, Building } from "lucide-react";

export interface ProyectoItemProps {
  titulo: string;
  autores?: string;
  fecha?: string;
  tipo?: string;
  institucion?: string;
  enlace?: string;
  tags?: string[];
  descripcion?: string;
}

const ProyectoItem: React.FC<ProyectoItemProps> = ({
  titulo,
  autores,
  fecha,
  tipo,
  institucion,
  enlace,
  tags,
  descripcion,
}) => {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100">
      {/* Header con tipo y fecha */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {tipo && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            <Tag className="w-3 h-3" />
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

      {/* Enlace */}
      {enlace && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ver más detalles
          </a>
        </div>
      )}
    </article>
  );
};

export default ProyectoItem;
