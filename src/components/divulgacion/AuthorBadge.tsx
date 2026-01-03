import React from "react";
import SafeImage from "@/components/SafeImage";

interface AuthorBadgeProps {
  name: string;
  role: string;
  image: string;
  date: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Badge de autor reutilizable para publicaciones
 * Muestra foto, nombre, rol y fecha de manera compacta
 */
const AuthorBadge: React.FC<AuthorBadgeProps> = ({ 
  name, 
  role, 
  image, 
  date,
  size = "md"
}) => {
  // Formatear fecha
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Tamaños adaptativos
  const sizes = {
    sm: {
      image: "w-10 h-10",
      name: "text-sm",
      role: "text-xs",
      date: "text-xs"
    },
    md: {
      image: "w-12 h-12",
      name: "text-base",
      role: "text-sm",
      date: "text-sm"
    },
    lg: {
      image: "w-16 h-16",
      name: "text-lg",
      role: "text-base",
      date: "text-base"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center gap-4">
      <SafeImage
        src={image}
        alt={name}
        fallbackSrc="/images/equipo/placeholder-avatar.webp"
        className={`${currentSize.image} rounded-full object-cover ring-2 ring-white shadow-md`}
      />
      <div>
        <p className={`font-semibold text-gray-900 ${currentSize.name}`}>
          {name}
        </p>
        <p className={`text-gray-600 ${currentSize.role}`}>
          {role}
        </p>
        <p className={`text-gray-500 ${currentSize.date} mt-1`}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default AuthorBadge;
