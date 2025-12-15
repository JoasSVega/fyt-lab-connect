import React from "react";
import { ExternalLink } from "lucide-react";

export interface AcademicItemProps {
  /**
   * Título principal (máxima jerarquía)
   */
  title: string;

  /**
   * Tipo de producción (badge discreto)
   * Ej: "Artículo", "Proyecto", "Video", "Libro"
   */
  type?: string;

  /**
   * Año o período (YYYY o YYYY–YYYY)
   */
  year?: number | string;

  /**
   * Autores o responsables
   */
  authors?: string;

  /**
   * Institución, revista, proyecto asociado (según aplique)
   */
  institution?: string;

  /**
   * Estado (En curso / Finalizado / Publicado)
   */
  status?: string;

  /**
   * Breve descripción (máximo 2 líneas)
   */
  description?: string;

  /**
   * Líneas de investigación (si aplica)
   */
  researchLines?: string[];

  /**
   * URL de verificación o acceso
   */
  link?: string;

  /**
   * ClassName adicional
   */
  className?: string;

  /**
   * Contenido personalizado adicional (footer)
   */
  children?: React.ReactNode;
}

/**
 * Componente normalizado para ítems académicos
 * Mantiene jerarquía visual consistente en todo el portal
 * Evita textos largos y lenguaje narrativo
 */
const AcademicItem: React.FC<AcademicItemProps> = ({
  title,
  type,
  year,
  authors,
  institution,
  status,
  description,
  researchLines,
  link,
  className = "",
  children,
}) => {
  return (
    <div
      className={`border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 bg-white ${className}`}
    >
      {/* Badges de tipo y estado */}
      <div className="flex flex-wrap gap-2 mb-3">
        {type && (
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
            {type}
          </span>
        )}
        {year && (
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
            {year}
          </span>
        )}
        {status && (
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              status === "En curso"
                ? "bg-blue-100 text-blue-700"
                : status === "Finalizado"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-700"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Título */}
      <h3 className="text-lg sm:text-xl font-poppins font-bold text-foreground mb-3 leading-tight">
        {title}
      </h3>

      {/* Metadatos académicos */}
      <div className="space-y-2 mb-4 text-sm text-slate-600">
        {authors && (
          <p>
            <span className="font-semibold text-slate-700">Autores:</span> {authors}
          </p>
        )}
        {institution && (
          <p>
            <span className="font-semibold text-slate-700">Institución:</span> {institution}
          </p>
        )}
        {researchLines && researchLines.length > 0 && (
          <p>
            <span className="font-semibold text-slate-700">Líneas:</span>{" "}
            {researchLines.join(", ")}
          </p>
        )}
      </div>

      {/* Descripción breve */}
      {description && (
        <p className="text-sm text-slate-700 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      {/* Contenido personalizado (si existe) */}
      {children && <div className="mb-4">{children}</div>}

      {/* Enlace de acceso/verificación */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Ver fuente
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

export default AcademicItem;
