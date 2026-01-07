import React from "react";
import { X, ChevronDown } from "lucide-react";

interface AcademicFiltersProps {
  availableYears: number[];
  availableTypes: string[];
  availableResearchLines: string[];
  availableStatus: string[];
  activeFilters: {
    yearMin?: number;
    yearMax?: number;
    types?: string[];
    researchLines?: string[];
    status?: string[];
    searchQuery?: string;
  };
  onYearRangeChange: (min?: number, max?: number) => void;
  onTypeToggle: (type: string) => void;
  onResearchLineToggle: (line: string) => void;
  onStatusToggle: (status: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  resultCount?: number;
  showResearchLines?: boolean;
  showStatus?: boolean;
}

/**
 * Componente de filtros académicos reutilizable
 * Soporta múltiples tipos de filtrado para portales académicos
 * Diseño limpio, accesible y optimizado para evaluadores
 */
const AcademicFilters: React.FC<AcademicFiltersProps> = ({
  availableYears,
  availableTypes,
  availableResearchLines,
  availableStatus,
  activeFilters,
  onYearRangeChange,
  onTypeToggle,
  onResearchLineToggle,
  onStatusToggle,
  onSearchChange,
  onClearFilters,
  resultCount,
  showResearchLines = true,
  showStatus = true,
}) => {
  const hasActiveFilters =
    activeFilters.yearMin ||
    activeFilters.yearMax ||
    activeFilters.types.length > 0 ||
    activeFilters.researchLines.length > 0 ||
    activeFilters.status.length > 0 ||
    activeFilters.searchQuery.trim() !== "";

  const minYear = Math.min(...availableYears);
  const maxYear = Math.max(...availableYears);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-poppins font-bold text-foreground">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Campo de búsqueda */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Búsqueda por palabra clave
        </label>
        <input
          type="text"
          value={activeFilters.searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Título, autores, institución..."
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Filtro por año */}
      {availableYears.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Rango de años
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <select
                value={activeFilters.yearMin || ""}
                onChange={(e) =>
                  onYearRangeChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                    activeFilters.yearMax
                  )
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Desde</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={activeFilters.yearMax || ""}
                onChange={(e) =>
                  onYearRangeChange(
                    activeFilters.yearMin,
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Hasta</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Filtro por tipo */}
      {availableTypes.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Tipo de producción
          </label>
          <div className="space-y-2">
            {availableTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.types.includes(type)}
                  onChange={() => onTypeToggle(type)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por líneas de investigación */}
      {showResearchLines && availableResearchLines.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Líneas de investigación
          </label>
          <div className="space-y-2">
            {availableResearchLines.map((line) => (
              <label key={line} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.researchLines.includes(line)}
                  onChange={() => onResearchLineToggle(line)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {line}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por estado */}
      {showStatus && availableStatus.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Estado
          </label>
          <div className="space-y-2">
            {availableStatus.map((status) => (
              <label key={status} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.status.includes(status)}
                  onChange={() => onStatusToggle(status)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Contador de resultados */}
      {resultCount !== undefined && (
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{resultCount}</span> resultado
            {resultCount !== 1 ? "s" : ""} encontrado{resultCount !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default AcademicFilters;
