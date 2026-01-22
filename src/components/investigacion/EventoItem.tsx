import React from "react";
import { Calendar, MapPin } from "lucide-react";

type EventoItemProps = {
  titulo: string;
  fecha?: string; // ISO o similar
  tipo?: string; // Congreso, Encuentro, etc.
  institucion?: string; // Lugar/Institución
  enlace?: string;
  tags?: string[];
  descripcion?: string;
  participacion?: string; // Ponente, Póster, Organización, etc.
  ciudad?: string;
  pais?: string;
};

const getYear = (fecha?: string) => {
  if (!fecha) return undefined as number | undefined;
  const yearPart = fecha.substring(0, 4);
  const year = Number(yearPart);
  return Number.isNaN(year) ? undefined : year;
};

export const EventoItem: React.FC<EventoItemProps> = ({
  titulo,
  fecha,
  participacion,
  ciudad,
  pais,
}) => {
  const year = getYear(fecha);

  return (
    <article className="w-full">
      <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform duration-300 will-change-transform">
        {/* Bloque de Año (solo año, centrado) */}
        <div className="w-16 min-w-[64px] aspect-square rounded-lg bg-fuchsia-50 text-fuchsia-700 flex items-center justify-center">
          <div className="text-lg md:text-xl font-extrabold leading-tight">
            {year ?? "--"}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {participacion && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-50 text-fuchsia-700">
                {participacion}
              </span>
            )}
            <Calendar className="w-4 h-4 text-fuchsia-600" />
          </div>

          <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
            {titulo}
          </h3>

          {(ciudad || pais) && (
            <div className="mt-1 text-sm text-slate-600 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-fuchsia-600" />
              <span className="font-medium">{ciudad}</span>
              {ciudad && pais && <span>,</span>}
              <span>{pais}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventoItem;
