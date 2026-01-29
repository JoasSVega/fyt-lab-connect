import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { NoticiaOverview } from "@/types/noticias";

interface NoticiaCardProps {
  noticia: NoticiaOverview;
  delay?: number;
}

/**
 * Tarjeta de noticia para el timeline institucional
 * 
 * Diseño: Timeline horizontal
 * - Fecha prominente en la izquierda (anclaje visual)
 * - Contenido a la derecha (ancho completo)
 * - Estructura vertical clara
 * - Minimalista, académico, serio
 * 
 * Características:
 * - Sin imagen
 * - Metadata clara: fecha, categoría
 * - CTA discreto
 * - Diseño tipo historial/registro
 */
const NoticiaCard: React.FC<NoticiaCardProps> = ({ noticia, delay = 0 }) => {
  // Extraer día, mes, año
  const date = new Date(noticia.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
  const year = date.getFullYear();

  // Mapear categorías a colores (sobrios, institución)
  const categoryColors: Record<string, string> = {
    "Colaboración": "bg-blue-50 text-blue-700 border-blue-200",
    "Evento": "bg-green-50 text-green-700 border-green-200",
    "Publicación": "bg-purple-50 text-purple-700 border-purple-200",
    "Lanzamiento": "bg-orange-50 text-orange-700 border-orange-200",
    "Participación": "bg-teal-50 text-teal-700 border-teal-200",
    "Reconocimiento": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Comunicado": "bg-slate-50 text-slate-700 border-slate-200"
  };

  const colorClass = categoryColors[noticia.category] || categoryColors["Comunicado"];

  return (
    <article
      className="flex gap-6 sm:gap-8 pb-8 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-200 px-0 py-6 animate-fade-in"
      style={{
        animationDelay: `${delay * 0.1}s`
      }}
      data-category={noticia.category}
    >
      {/* COLUMNA IZQUIERDA: Fecha (Anclaje visual principal) */}
      <div className="flex-shrink-0 w-16 sm:w-20 pt-1">
        <div className="text-center font-raleway">
          {/* Día grande */}
          <div className="text-3xl sm:text-4xl font-bold text-slate-900 leading-none">
            {day}
          </div>
          {/* Mes y año pequeños */}
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wide">
            {month}
          </div>
          <div className="text-xs text-slate-500">
            {year}
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Contenido (Ancho completo) */}
      <div className="flex-1 min-w-0">
        {/* Categoría badge (institucional) */}
        <div className={`${colorClass} border px-2.5 py-1 rounded w-fit mb-3 font-semibold text-xs uppercase tracking-wider`}>
          {noticia.category}
        </div>

        {/* Título (máximo 2 líneas, institucional) */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug font-raleway line-clamp-2">
          {noticia.title}
        </h3>

        {/* Resumen corto (1-2 líneas, informativo) */}
        <p className="text-slate-700 text-sm leading-relaxed mb-4 font-inter line-clamp-2">
          {noticia.summary}
        </p>

        {/* CTA discreto (link, sin botón llamativo) */}
        <Link
          to={`/noticias/${noticia.slug}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-inter font-medium group"
        >
          {noticia.cta || "Ver comunicado"}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Link>
      </div>
    </article>
  );
};

export default NoticiaCard;
