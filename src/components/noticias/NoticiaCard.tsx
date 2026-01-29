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
 * Diseño: Timeline horizontal con colores dinámicos por categoría
 * - Fecha prominente en la izquierda (color según categoría)
 * - Contenido a la derecha (ancho completo)
 * - Microinteracciones similares a divulgación
 * - Animación de CTA: gap expansión en hover
 * 
 * Características:
 * - Sin imagen
 * - Colores primarios y secundarios por categoría
 * - CTA discreto con animación
 * - Tipografía raleway + inter (similar a divulgación)
 */
const NoticiaCard: React.FC<NoticiaCardProps> = ({ noticia, delay = 0 }) => {
  // Extraer día, mes, año
  const date = new Date(noticia.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
  const year = date.getFullYear();

  // Mapear categorías a clases CSS (BEM style, como divulgación)
  const categoryClassMap: Record<string, string> = {
    "Colaboración": "cat-colaboracion",
    "Evento": "cat-evento",
    "Publicación": "cat-publicacion",
    "Lanzamiento": "cat-lanzamiento",
    "Participación": "cat-participacion",
    "Reconocimiento": "cat-reconocimiento",
    "Comunicado": "cat-comunicado"
  };

  const categoryClass = categoryClassMap[noticia.category] || "cat-comunicado";
  const cardClassName = `noticia-card ${categoryClass}`;

  return (
    <Link
      to={`/noticias/${noticia.slug}`}
      style={{ display: "block" }}
      className="no-underline"
    >
      <article
        className={cardClassName}
        style={{
          animationDelay: `${delay * 0.1}s`
        }}
        data-category={noticia.category}
      >
        {/* COLUMNA IZQUIERDA: Fecha (Anclaje visual principal) */}
        <div className="noticia-card__date">
          <span className="noticia-card__day">{day}</span>
          <span className="noticia-card__month">{month}</span>
          <span className="noticia-card__year">{year}</span>
        </div>

        {/* COLUMNA DERECHA: Contenido (Ancho completo) */}
        <div className="noticia-card__content">
          {/* Categoría badge (institucional) */}
          <span className="noticia-card__category">
            {noticia.category}
          </span>

          {/* Título (máximo 2 líneas, institucional) */}
          <h3 className="noticia-card__title line-clamp-2">
            {noticia.title}
          </h3>

          {/* Resumen corto (1-2 líneas, informativo) */}
          <p className="noticia-card__summary line-clamp-2">
            {noticia.summary}
          </p>

          {/* CTA discreto (link, con animación similar a divulgación) */}
          <div className="noticia-card__cta">
            {noticia.cta || "Ver comunicado"}
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NoticiaCard;
