import React from "react";
import AuthorBadge from "./AuthorBadge";

interface DivulgacionHeroProps {
  title: string;
  subtitle?: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime?: string;
  category?: string;
}

/**
 * Hero editorial para artículos individuales de divulgación
 * Diseño limpio, científico y coherente con las tarjetas
 * Jerarquía visual clara: Imagen → Autor → Credenciales → Fecha → Título → Extracto
 */
const DivulgacionHero: React.FC<DivulgacionHeroProps> = ({
  title,
  subtitle,
  author,
  authorRole,
  authorImage,
  date,
  readTime,
  category
}) => {
  // Formatear fecha
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Extraer credenciales académicas del rol (antes del guión)
  const academicCredentials = authorRole
    ? authorRole.split(" - ")[0].trim()
    : "";

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Categoría y tiempo de lectura - en la parte superior */}
        {(category || readTime) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-8">
            <div>
              {category && (
                <span className="inline-block font-medium text-primary uppercase tracking-wide text-xs break-words">
                  {category}
                </span>
              )}
            </div>
            {readTime && (
              <span className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime}
              </span>
            )}
          </div>
        )}

        {/* Información del autor - arriba del título */}
        <div className="mb-8 text-center">
          {/* Nombre del autor */}
          <h2 className="font-poppins font-bold text-lg sm:text-xl text-gray-900 mb-1 break-words">
            {author}
          </h2>

          {/* Credenciales académicas */}
          {academicCredentials && (
            <p className="text-sm sm:text-base font-semibold text-gray-700 font-poppins mb-2 break-words">
              {academicCredentials}
            </p>
          )}

          {/* Fecha de publicación */}
          <p className="text-xs text-gray-400 font-inter break-words">
            {formattedDate}
          </p>
        </div>

        {/* Divisor visual */}
        <div className="h-px bg-gray-100 mb-8"></div>

        {/* Título principal - más prominente */}
        <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6 break-words">
          {title}
        </h1>

        {/* Subtítulo (extracto) */}
        {subtitle && (
          <p className="font-inter text-lg sm:text-xl text-gray-600 leading-relaxed break-words">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default DivulgacionHero;
