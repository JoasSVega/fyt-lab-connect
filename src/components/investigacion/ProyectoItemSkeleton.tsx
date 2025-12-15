// Skeleton para ProyectoItem - Previene CLS durante carga
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProyectoItemSkeleton: React.FC = () => {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm min-h-[200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Body */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Footer tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Institucion */}
      <div className="mt-3">
        <Skeleton className="h-3 w-32" />
      </div>
    </article>
  );
};
