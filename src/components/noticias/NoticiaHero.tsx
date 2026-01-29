import React from "react";
import { Calendar, Tag } from "lucide-react";
import type { Noticia } from "@/types/noticias";

interface NoticiaHeroProps {
  noticia: Noticia;
}

/**
 * Hero para página individual de noticia
 * 
 * Estructura:
 * - Categoría
 * - Fecha
 * - Título (H1)
 * - Subtítulo contextual
 * - Espacio reservado para imagen
 */
const NoticiaHero: React.FC<NoticiaHeroProps> = ({ noticia }) => {
  // Formatear fecha
  const formattedDate = new Date(noticia.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Mapear categorías a colores
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
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        {/* Categoría */}
        <div className={`${colorClass} border px-4 py-2 rounded-lg w-fit mb-6 font-semibold text-sm uppercase tracking-wide`}>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {noticia.category}
          </div>
        </div>

        {/* Fecha */}
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
          <Calendar className="w-4 h-4" />
          <time dateTime={noticia.date}>
            {formattedDate}
          </time>
        </div>

        {/* Título H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight font-raleway">
          {noticia.title}
        </h1>

        {/* Subtítulo contextual */}
        {noticia.subtitle && (
          <p className="text-lg text-slate-700 leading-relaxed font-inter">
            {noticia.subtitle}
          </p>
        )}
      </div>

      {/* Espacio reservado para imagen principal */}
      {noticia.imagePlaceholder && (
        <div className="w-full bg-slate-100 border-t border-slate-200">
          <div className="max-w-5xl mx-auto aspect-video flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-slate-600 text-sm italic">
                📸 {noticia.imagePlaceholder}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NoticiaHero;
