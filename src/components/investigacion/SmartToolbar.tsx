import React from "react";
import { Search, Calendar, FileType, Tag, X } from "lucide-react";

interface SmartToolbarProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
  // Year filter
  availableYears?: number[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  
  // Type filter
  availableTypes?: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  
  // Optional category/status filter
  availableCategories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  
  // Reset handler
  onReset?: () => void;
  
  // Results count
  resultCount?: number;
  totalCount?: number;
  
  // Loading state
  isLoading?: boolean;
}

/**
 * Smart Toolbar - Barra horizontal compacta de filtros premium
 * Sticky, translúcida, minimalista, de renderizado inmediato
 */
const SmartToolbar: React.FC<SmartToolbarProps> = ({
  searchQuery,
  onSearchChange,
  availableYears = [],
  selectedYear,
  onYearChange,
  availableTypes = [],
  selectedType,
  onTypeChange,
  availableCategories = [],
  selectedCategory = "",
  onCategoryChange,
  onReset,
  resultCount,
  totalCount,
  isLoading = false,
}) => {
  const hasYearFilter = selectedYear !== "";
  const hasTypeFilter = selectedType !== "";
  const hasCategoryFilter = selectedCategory !== "";
  const hasSearchQuery = searchQuery.trim() !== "";
  const hasActiveFilters = hasSearchQuery || hasYearFilter || hasTypeFilter || hasCategoryFilter;
  
  return (
    <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Buscador */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título, autor..."
              className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Filtros Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filtro de Año */}
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none z-10" />
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                disabled={isLoading || availableYears.length === 0}
                className={`
                  pl-8 pr-8 py-1.5 text-sm font-medium rounded-full border cursor-pointer
                  transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed appearance-none
                  ${hasYearFilter 
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <option value="">Todos los años</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro de Tipo */}
            <div className="relative">
              <FileType className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none z-10" />
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                disabled={isLoading || availableTypes.length === 0}
                className={`
                  pl-8 pr-8 py-1.5 text-sm font-medium rounded-full border cursor-pointer
                  transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                  disabled:opacity-50 disabled:cursor-not-allowed appearance-none
                  ${hasTypeFilter 
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <option value="">Todos los tipos</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro de Categoría (Opcional) */}
            {availableCategories.length > 0 && onCategoryChange && (
              <div className="relative">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  disabled={isLoading}
                  className={`
                    pl-8 pr-8 py-1.5 text-sm font-medium rounded-full border cursor-pointer
                    transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                    disabled:opacity-50 disabled:cursor-not-allowed appearance-none
                    ${hasCategoryFilter 
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <option value="">Todas las categorías</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Contador de resultados */}
            {resultCount !== undefined && (
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                {isLoading ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></span>
                    Cargando...
                  </span>
                ) : (
                  `${resultCount} ${totalCount ? `de ${totalCount}` : ""} resultado${resultCount !== 1 ? "s" : ""}`
                )}
              </span>
            )}

            {/* Botón Limpiar Filtros - Solo aparece si hay filtros activos */}
            {hasActiveFilters && onReset && (
              <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-red-500 underline decoration-dotted transition-colors inline-flex items-center gap-1 ml-2"
                title="Limpiar todos los filtros"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartToolbar;
