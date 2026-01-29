import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NoticiaOverview } from "@/types/noticias";

interface NoticiaCardProps {
  noticia: NoticiaOverview;
  delay?: number;
}

/**
 * Tarjeta de noticia para el timeline institucional
 * 
 * Características:
 * - Sin imagen
 * - Metadata clara: fecha, categoría
 * - CTA discreto pero visible
 * - Diseño minimalista, académico
 */
const NoticiaCard: React.FC<NoticiaCardProps> = ({ noticia, delay = 0 }) => {
  // Formatear fecha
  const formattedDate = new Date(noticia.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Mapear categorías a colores
  const categoryColors: Record<string, string> = {
    "Colaboración": "bg-blue-100 text-blue-700",
    "Evento": "bg-green-100 text-green-700",
    "Publicación": "bg-purple-100 text-purple-700",
    "Lanzamiento": "bg-orange-100 text-orange-700",
    "Participación": "bg-teal-100 text-teal-700",
    "Reconocimiento": "bg-yellow-100 text-yellow-700",
    "Comunicado": "bg-slate-100 text-slate-700"
  };

  const colorClass = categoryColors[noticia.category] || categoryColors["Comunicado"];

  return (
    <article
      className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
      style={{
        animationDelay: `${delay * 0.1}s`
      }}
      data-category={noticia.category}
    >
      {/* Header con fecha y categoría */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* Fecha */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <time dateTime={noticia.date}>
            {formattedDate}
          </time>
        </div>

        {/* Categoría badge */}
        <span className={`${colorClass} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide w-fit`}>
          {noticia.category}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug font-raleway">
        {noticia.title}
      </h3>

      {/* Resumen */}
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-inter">
        {noticia.summary}
      </p>

      {/* CTA */}
      <Link to={`/noticias/${noticia.slug}`} className="inline-block">
        <Button
          variant="outline"
          className="group border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
        >
          {noticia.cta || "Ver comunicado"}
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </article>
  );
};

export default NoticiaCard;
