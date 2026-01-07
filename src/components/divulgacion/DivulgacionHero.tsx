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
 * Diseño limpio y enfocado en la lectura
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
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Categoría y tiempo de lectura */}
        {(category || readTime) && (
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            {category && (
              <span className="font-semibold text-primary uppercase tracking-wide">
                {category}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} de lectura
              </span>
            )}
          </div>
        )}

        {/* Título principal */}
        <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
          {title}
        </h1>

        {/* Subtítulo (si existe) */}
        {subtitle && (
          <p className="font-inter text-xl sm:text-2xl text-gray-600 leading-relaxed mb-8">
            {subtitle}
          </p>
        )}

        {/* Información del autor */}
        <div className="pt-8 border-t border-gray-200">
          <AuthorBadge
            name={author}
            role={authorRole}
            image={authorImage}
            date={date}
            size="lg"
          />
        </div>
      </div>
    </section>
  );
};

export default DivulgacionHero;
