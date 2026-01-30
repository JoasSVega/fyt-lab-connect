import React from "react";
import { Link } from "react-router-dom";
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
  // Formatear fecha (parseo local para evitar desfase por zona horaria)
  const parseLocalDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, (month || 1) - 1, day || 1);
  };
  const formattedDate = parseLocalDate(noticia.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <header className="w-full bg-white noticia-page__header">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        {/* Barra de navegación secundaria */}
        <nav className="noticia-page__breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/noticias">Noticias</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="noticia-page__breadcrumb-current">{noticia.category}</li>
          </ol>
        </nav>

        {/* Categoría y fecha (fecha alineada a la derecha) */}
        <div className="noticia-page__meta">
          <div className="noticia-page__category">
            <Tag className="w-4 h-4" />
            {noticia.category}
          </div>
          <time
            dateTime={noticia.date}
            className="noticia-page__date"
          >
            {formattedDate}
          </time>
        </div>

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
    </header>
  );
};

export default NoticiaHero;
