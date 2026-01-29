import React from "react";
import { Tag } from "lucide-react";
import type { Noticia } from "@/types/noticias";

interface NoticiaHeroProps {
  noticia: Noticia;
}

/**
 * Hero para página individual de noticia
 * 
 * Estructura:
 * - Categoría con icono (badge con color dinámico)
 * - Fecha
 * - Título (H1)
 * - Subtítulo contextual
 * - Espacio reservado para imagen principal
 * 
 * Estilos: Similares a divulgación pero adaptados para noticias
 * Tipografía: Raleway (títulos) + Inter (metadata)
 */
const NoticiaHero: React.FC<NoticiaHeroProps> = ({ noticia }) => {
  // Formatear fecha
  const formattedDate = new Date(noticia.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <header className="w-full bg-white noticia-page__header">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        {/* Categoría badge (dinámico con color) */}
        <div className="noticia-page__category">
          <Tag className="w-4 h-4" />
          {noticia.category}
        </div>

        {/* Fecha (pequeña, debajo de categoría) */}
        <time
          dateTime={noticia.date}
          className="inline-block text-sm text-gray-600 font-inter mb-4"
        >
          {formattedDate}
        </time>

        {/* Título H1 */}
        <h1 className="noticia-page__title">
          {noticia.title}
        </h1>

        {/* Subtítulo contextual */}
        {noticia.subtitle && (
          <p className="noticia-page__subtitle">
            {noticia.subtitle}
          </p>
        )}
      </div>

      {/* Espacio reservado para imagen principal */}
      {noticia.imagePlaceholder && (
        <div className="w-full bg-gray-100 border-t border-gray-200">
          <div className="max-w-5xl mx-auto aspect-video flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-gray-600 text-sm italic">
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
