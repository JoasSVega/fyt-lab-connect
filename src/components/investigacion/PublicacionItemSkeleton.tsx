// Skeleton para PublicacionItem - Previene CLS durante carga
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const PublicacionItemSkeleton: React.FC = () => {
  return (
    <article className="w-full px-2 sm:px-3">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 py-4 border-b border-gray-200">
        {/* Izquierda: Icono */}
        <div className="flex items-center sm:items-start gap-3 min-w-0">
          <Skeleton className="w-6 h-6 min-w-[24px] shrink-0 rounded" />

          {/* Centro: Título + meta */}
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
          </div>
        </div>

        {/* Derecha: Año + enlace */}
        <div className="flex items-center gap-2 sm:ml-auto pt-1 sm:pt-0">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>
    </article>
  );
};
