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
            {/* Autor y fecha - prominentemente debajo de la imagen */}
            <div className="text-center mb-5">
              <h4 className="font-poppins font-bold text-base sm:text-lg text-gray-900 mb-1">
                {post.author}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 font-inter">
                {formattedDate}
              </p>
            </div>

            {/* Título */}
            <h3 className="font-poppins font-bold text-lg sm:text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Extracto */}
            <p className="font-inter text-sm sm:text-base text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Categoría y tiempo de lectura - parte inferior */}
            <div className="flex items-center justify-between gap-3 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {post.category && (
                  <span className="font-medium text-primary uppercase tracking-wide text-xs">
                    {post.category}
                  </span>
                )}
                {post.readTime && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </div>
        </article>
      </Link>
    </Card>
  );
};

export default DivulgacionCard;
