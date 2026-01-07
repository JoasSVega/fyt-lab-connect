import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /**
   * Microtexto institucional (máximo 1 línea)
   * Ejemplo: "Producción audiovisual y sonora vinculada a proyectos de investigación."
   */
  institutionalText?: string;
  className?: string;
}

/**
 * Componente header para secciones académicas
 * Incluye microtexto institucional breve y académico
 * Evita lenguaje publicitario y narrativo largo
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  institutionalText,
  className = "",
}) => {
  return (
    <div className={`text-left mb-10 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mb-2">
          {subtitle}
        </p>
      )}
      {institutionalText && (
        <p className="text-sm text-slate-600 font-medium italic max-w-3xl">
          {institutionalText}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
