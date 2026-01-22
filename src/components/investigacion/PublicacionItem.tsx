import React from "react";
import { BookOpen, ExternalLink, FileText } from "lucide-react";

type PublicacionItemProps = {
  titulo: string;
  autores?: string;
  fecha?: string; // ISO o legible; se obtiene el año
  tipo?: string; // "articulo", "libro", "capitulo", etc.
  institucion?: string;
  enlace?: string; // url o doi link
  tags?: string[];
  descripcion?: string;
  doi?: string;
};

const getYear = (fecha?: string) => {
  if (!fecha) return undefined;
  const yearPart = fecha.substring(0, 4);
  const year = Number(yearPart);
  return Number.isNaN(year) ? undefined : year;
};

export const PublicacionItem: React.FC<PublicacionItemProps> = ({
  titulo,
  autores,
  fecha,
  tipo,
  institucion,
  enlace,
  doi,
}) => {
  const year = getYear(fecha);
  const kind = (tipo || "").toLowerCase();
  const isBook = kind.includes("libro") || kind.includes("capitulo");

  const iconColor = isBook ? "text-violet-600" : "text-sky-600";
  const Icon = isBook ? BookOpen : FileText;

  const targetUrl = doi
    ? (doi.startsWith("http") ? doi : `https://doi.org/${doi}`)
    : enlace;

  return (
    <article className="w-full px-2 sm:px-3">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 rounded-md transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
        {/* Izquierda: Icono del tipo */}
        <div className="flex items-center sm:items-start gap-3 min-w-0">
          <span className="inline-flex items-center justify-center w-6 h-6 min-w-[24px] shrink-0">
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </span>

          {/* Centro: Título + meta */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
              {titulo}
            </h3>
            {(autores || institucion) && (
              <div className="mt-1 text-xs sm:text-sm text-gray-500">
                {autores && <span className="truncate inline-block max-w-full align-top">{autores}</span>}
                {autores && institucion && <span className="px-2">•</span>}
                {institucion && <em className="text-gray-400 not-italic italic">{institucion}</em>}
              </div>
            )}
          </div>
        </div>

        {/* Derecha: Año + DOI/Enlace */}
        <div className="flex items-center gap-2 sm:ml-auto pt-1 sm:pt-0">
          {year && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
              {year}
            </span>
          )}
          {targetUrl && (
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-gray-300 text-gray-700 rounded-md text-xs hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default PublicacionItem;
 
