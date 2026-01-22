import React from "react";
import { ExternalLink, Mic2, PlayCircle } from "lucide-react";

type ContenidoDigitalItemProps = {
  titulo: string;
  autores?: string;
  fecha?: string;
  tipo?: string; // "video", "podcast", etc.
  institucion?: string;
  enlace?: string;
  tags?: string[];
  descripcion?: string;
  duracion?: string; // ej. "12:34"
};

const getColorByTipo = (tipo?: string) => {
  const k = (tipo || "").toLowerCase();
  if (k.includes("video"))
    return {
      stripe: "bg-rose-600",
      icon: "text-rose-600",
      button: "bg-rose-600 hover:bg-rose-700",
    };
  if (k.includes("podcast"))
    return {
      stripe: "bg-violet-600",
      icon: "text-violet-600",
      button: "bg-violet-600 hover:bg-violet-700",
    };
  return {
    stripe: "bg-sky-600",
    icon: "text-sky-600",
    button: "bg-sky-600 hover:bg-sky-700",
  };
};

export const ContenidoDigitalItem: React.FC<ContenidoDigitalItemProps> = ({
  titulo,
  fecha,
  tipo,
  enlace,
  tags,
  duracion,
}) => {
  const colors = getColorByTipo(tipo);
  const isVideo = (tipo || "").toLowerCase().includes("video");

  return (
    <article className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] will-change-transform">
      {/* Top color stripe (only top, subtle) */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${colors.stripe}`} />

      {/* Body */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight break-words whitespace-normal">
          {titulo}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {fecha && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
              {fecha}
            </span>
          )}
          {tipo && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-800 text-xs font-semibold uppercase tracking-wide">
              {tipo}
            </span>
          )}
        </div>

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.filter(Boolean).map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer: button left, icon right */}
        <div className="flex items-center justify-between">
          {enlace ? (
            <a
              href={enlace}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${colors.button} text-white text-sm md:text-base font-semibold hover:shadow-md transition-all duration-200 hover:scale-[1.01] min-w-[130px] justify-center`}
            >
              {isVideo ? "Reproducir" : "Escuchar"}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-xs text-gray-400">Sin enlace</span>
          )}

          <div className="flex items-center gap-3">
            {duracion && (
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                {duracion}
              </span>
            )}
            {isVideo ? (
              <PlayCircle className={`w-7 h-7 ${colors.icon}`} />
            ) : (
              <Mic2 className={`w-6 h-6 ${colors.icon}`} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContenidoDigitalItem;
