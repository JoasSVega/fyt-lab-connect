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

const gradientByTipo = (tipo?: string) => {
  const k = (tipo || "").toLowerCase();
  if (k.includes("video")) return "from-rose-500 to-rose-600";
  if (k.includes("podcast")) return "from-violet-500 to-violet-600";
  return "from-sky-500 to-cyan-600";
};

export const ContenidoDigitalItem: React.FC<ContenidoDigitalItemProps> = ({
  titulo,
  fecha,
  tipo,
  enlace,
  tags,
  duracion,
}) => {
  const grad = gradientByTipo(tipo);
  const isVideo = (tipo || "").toLowerCase().includes("video");

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Thumbnail simulado */}
      <div className={`relative h-40 bg-gradient-to-br ${grad} flex items-center justify-center`}>
        {isVideo ? (
          <PlayCircle className="w-14 h-14 text-white/95 drop-shadow" />
        ) : (
          <Mic2 className="w-12 h-12 text-white/95 drop-shadow" />
        )}

        {duracion && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium">
            {duracion}
          </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="p-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">{titulo}</h3>
        {fecha && (
          <div className="mt-1 text-xs text-gray-500">{fecha}</div>
        )}

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.filter(Boolean).map((t) => (
              <span key={t} className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {enlace && (
          <div className="mt-4">
            <a
              href={enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              {isVideo ? "Reproducir" : "Escuchar"}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ContenidoDigitalItem;
