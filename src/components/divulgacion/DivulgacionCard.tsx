import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { DivulgacionPost } from "@/types/divulgacion";

interface DivulgacionCardProps {
  post: DivulgacionPost;
}

/**
 * Card editorial para publicaciones de divulgación
 * Diseño sobrio, académico, inspirado en revistas científicas modernas
 */
const DivulgacionCard: React.FC<DivulgacionCardProps> = ({ post }) => {
  // Formatear fecha a formato legible en español
  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
      <Link 
        to={`/divulgacion/${post.slug}`}
        className="block"
      >
        <article className="h-full flex flex-col">
          {/* Contenido del artículo */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col">
            {/* Categoría y tiempo de lectura */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              {post.category && (
                <span className="font-medium text-primary uppercase tracking-wide">
                  {post.category}
                </span>
              )}
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>

            {/* Título */}
            <h3 className="font-poppins font-bold text-2xl text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Extracto */}
            <p className="font-inter text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Autor y fecha */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <SafeImage
                src={post.authorImage}
                alt={post.author}
                fallbackSrc="/images/equipo/placeholder-avatar.webp"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {post.author}
                </p>
                <p className="text-xs text-gray-500">
                  {formattedDate}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </article>
      </Link>
    </Card>
  );
};

export default DivulgacionCard;
