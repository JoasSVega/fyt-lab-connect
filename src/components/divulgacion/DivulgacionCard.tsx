import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  const cardClassName = `divulgacion-card ${categoryClass}`;

  return (
    <Link 
      to={`/divulgacion/${post.slug}`}
      style={{ display: 'block', height: '100%' }}
    >
      <article className={cardClassName}>
        {/* Cabecera: Categoría y Fecha */}
        <header className="divulgacion-card__header">
          {post.category && (
            <span className="divulgacion-card__category">
              {post.category}
            </span>
          )}
        </header>

        {/* Título */}
        <h3 className="divulgacion-card__title">
          {post.title}
        </h3>

        {/* Resumen */}
        <p className="divulgacion-card__excerpt">
          {post.excerpt}
        </p>

        {/* Footer: Autor, Tiempo de lectura y CTA */}
        <footer className="divulgacion-card__footer">
          <div className="divulgacion-card__meta">
            <span className="divulgacion-card__author">
              {post.author}
            </span>
            <time dateTime={post.date} className="divulgacion-card__date">
              {formattedDate}
            </time>
          </div>
          <span className="divulgacion-card__cta">
            Leer más <ArrowRight className="w-4 h-4" />
          </span>
        </footer>
      </article>
    </Link>
  );
};

export default DivulgacionCard;
