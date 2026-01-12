import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { DivulgacionPost } from "@/types/divulgacion";

interface DivulgacionCardProps {
  post: DivulgacionPost;
}

/**
 * Mapeo de categorías a clases modificadoras de color
 */
const categoryClassMap: { [key: string]: string } = {
  "Asuntos Regulatorios": "cat-regulatoria",
  "Farmacia Clínica": "cat-clinica",
  "Farmacovigilancia": "cat-seguridad",
  "Industria & Tecnología": "cat-industria",
  "Data & Salud Digital": "cat-data",
};

/**
 * Card editorial para publicaciones de divulgación
 * Sistema de colores dinámico por categoría
 */
const DivulgacionCard: React.FC<DivulgacionCardProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Obtener clase modificadora según categoría
  const categoryClass = post.category ? categoryClassMap[post.category] || "cat-regulatoria" : "cat-regulatoria";
  const cardClassName = `blog-card ${categoryClass}`;

  return (
    <Link 
      to={`/divulgacion/${post.slug}`}
      style={{ display: 'block', height: '100%' }}
    >
      <article className={cardClassName}>
        {/* Cabecera: Categoría y Fecha */}
        <header className="blog-card__header">
          {post.category && (
            <span className="blog-card__category">
              {post.category}
            </span>
          )}
        </header>

        {/* Título */}
        <h3 className="blog-card__title">
          {post.title}
        </h3>

        {/* Resumen */}
        <p className="blog-card__excerpt">
          {post.excerpt}
        </p>

        {/* Footer: Autor y Contenedor de Acción Interactivo */}
        <footer className="blog-card__footer">
          <div className="blog-card__meta">
            <span className="blog-card__author">
              {post.author}
            </span>
            <time dateTime={post.date} className="blog-card__date">
              {formattedDate}
            </time>
          </div>
          <div className="blog-card__meta-action">
            <span className="blog-card__read-time">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="blog-card__read-more">
              Leer más <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default DivulgacionCard;
