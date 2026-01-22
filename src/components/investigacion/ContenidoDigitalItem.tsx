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
      <div className="p-3">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-snug break-words whitespace-normal">
          {titulo}
        </h3>
        {fecha && <div className="mt-1 text-xs text-gray-500">{fecha}</div>}

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
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
        <div className="mt-4 flex items-center justify-between">
          {enlace ? (
            <a
              href={enlace}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md ${colors.button} text-white text-sm font-medium hover:shadow-md transition-all duration-200 hover:scale-[1.01]`}
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
              <PlayCircle className={`w-6 h-6 ${colors.icon}`} />
            ) : (
              <Mic2 className={`w-5 h-5 ${colors.icon}`} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContenidoDigitalItem;
