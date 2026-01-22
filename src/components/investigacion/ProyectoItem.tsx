import React from "react";

type ProyectoItemProps = {
  titulo: string;
  autores?: string;
  fecha?: string; // ISO o legible
  tipo?: string; // estado/tipo: "En curso", "Finalizado", etc.
  institucion?: string;
  enlace?: string;
  tags?: string[];
  descripcion?: string;
};

const getYear = (fecha?: string) => {
  if (!fecha) return undefined;
  const yearPart = fecha.substring(0, 4);
  const year = Number(yearPart);
  return Number.isNaN(year) ? undefined : year;
};

export const ProyectoItem: React.FC<ProyectoItemProps> = ({
  titulo,
  fecha,
  tipo,
  institucion,
  tags,
  descripcion,
}) => {
  const year = getYear(fecha);
  const estado = tipo || "Proyecto";

  // Determinar si el proyecto está activo o finalizado
  const isActive = estado.toLowerCase().includes("en curso") || estado.toLowerCase().includes("activo");
  const isFinished = estado.toLowerCase().includes("finalizado") || estado.toLowerCase().includes("concluido");

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-transform duration-300 will-change-transform">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
          isActive 
            ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" 
            : isFinished 
            ? "bg-gray-100 text-gray-600 ring-gray-500/20"
            : "bg-indigo-50 text-indigo-700 ring-indigo-600/20"
        }`}>
          {estado}
        </span>
        {year && (
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            {year}
          </span>
        )}
      </div>

      {/* Body */}
      <h3 className="text-lg font-bold text-indigo-900 leading-snug mb-2">
        {titulo}
      </h3>
      {descripcion && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {descripcion}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {Array.isArray(tags) &&
          tags.filter(Boolean).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
            >
              {tag}
            </span>
          ))}
      </div>

      {institucion && (
        <div className="mt-3 text-xs text-gray-500">
          Institución: <span className="font-medium text-gray-700">{institucion}</span>
        </div>
      )}
    </article>
  );
};

export default ProyectoItem;
