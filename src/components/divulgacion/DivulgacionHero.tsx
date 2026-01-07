import React from "react";
import SmartImage from "@/components/SmartImage";

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Categoría y tiempo de lectura - en la parte superior */}
        {(category || readTime) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-10">
            <div className="w-full sm:w-auto">
              {category && (
                <span className="inline-block font-medium text-primary uppercase tracking-wide text-xs break-words">
                  {category}
                </span>
              )}
            </div>
            {readTime && (
              <span className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readTime}</span>
              </span>
            )}
          </div>
        )}

        {/* Imagen del autor - circular y prominente */}
        <div className="flex justify-center mb-6">
          <SmartImage
            basePath={authorImage.replace(/\.webp$/i, "")}
            usage="avatar"
            alt={author}
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
          />
        </div>

        {/* Información del autor - debajo de la imagen */}
        <div className="mb-8 text-center">
          {/* Nombre del autor */}
          <h2 className="font-poppins font-bold text-xl sm:text-2xl lg:text-2xl text-gray-900 mb-2 break-words px-2">
            {author}
          </h2>

          {/* Credenciales académicas */}
          {academicCredentials && (
            <p className="text-base sm:text-lg font-semibold text-gray-700 font-poppins mb-2 break-words px-2">
              {academicCredentials}
            </p>
          )}

          {/* Fecha de publicación */}
          <p className="text-xs sm:text-sm text-gray-400 font-inter break-words px-2">
            {formattedDate}
          </p>
        </div>

        {/* Divisor visual */}
        <div className="h-px bg-gray-200 mb-10"></div>

        {/* Título principal - más prominente */}
        <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-tight mb-6 break-words hyphens-auto">
          {title}
        </h1>

        {/* Subtítulo (extracto) */}
        {subtitle && (
          <p className="font-inter text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed break-words hyphens-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default DivulgacionHero;
