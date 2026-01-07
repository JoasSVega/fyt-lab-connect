import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import type { DivulgacionPost } from "@/types/divulgacion";

interface DivulgacionCardProps {
  post: DivulgacionPost;
}

/**
 * Card editorial para publicaciones de divulgación
 * Diseño centrado con autor destacado en la parte superior
 * Inspirado en revistas científicas modernas con énfasis visual en el autor
 */
const DivulgacionCard: React.FC<DivulgacionCardProps> = ({ post }) => {
  // Formatear fecha a formato legible en español
  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Extraer estudios académicos del authorRole (antes del guión)
  // Ejemplo: "Q.F., MSc, PhD - Grupo de Investigación..." → "Q.F., MSc, PhD"
  const academicCredentials = post.authorRole
    ? post.authorRole.split(" - ")[0].trim()
    : "";

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white h-full flex flex-col">
      <Link 
        to={`/divulgacion/${post.slug}`}
        className="block h-full"
      >
        <article className="h-full flex flex-col">
          {/* Imagen del autor - parte superior prominente */}
          <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
            <SmartImage
              basePath={post.authorImage.replace(/\.webp$/i, "")}
              usage="featured"
              alt={post.author}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Contenido del artículo */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col">
            {/* Nombre del autor - centrado */}
            <div className="text-center mb-1">
              <h4 className="font-poppins font-bold text-base sm:text-lg text-gray-900 break-words">
                {post.author}
              </h4>
            </div>

            {/* Estudios académicos - centrados con mayor peso visual */}
            {academicCredentials && (
              <p className="text-sm sm:text-base font-semibold text-gray-700 font-poppins text-center mb-2 break-words">
                {academicCredentials}
              </p>
            )}

            {/* Fecha - alineada a la izquierda con menor peso */}
            <p className="text-xs text-gray-400 font-inter mb-4 text-left break-words">
              {formattedDate}
            </p>

            {/* Título - sin límite de líneas para mostrar completo */}
            <h3 className="font-poppins font-bold text-lg sm:text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors break-words">
              {post.title}
            </h3>

            {/* Extracto */}
            <p className="font-inter text-sm sm:text-base text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-4 break-words">
              {post.excerpt}
            </p>

            {/* Categoría y tiempo de lectura - parte inferior */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 pt-5 border-t border-gray-100">
              {/* Categoría - alineada a la izquierda */}
              <div className="flex items-center justify-start">
                {post.category && (
                  <span className="font-medium text-primary uppercase tracking-wide text-xs break-words">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Tiempo de lectura y flecha - alineados a la derecha */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {post.readTime && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">{post.readTime}</span>
                  </div>
                )}
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </Card>
  );
};

export default DivulgacionCard;
