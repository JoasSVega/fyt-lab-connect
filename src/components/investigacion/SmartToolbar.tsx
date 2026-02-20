import React, { useState } from "react";
import { Search, Calendar, FileType, Tag, X, ChevronDown } from "lucide-react";

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
  categoryLabel?: string; // Label personalizado para el dropdown de categorías
  
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
  categoryLabel = "Categoría",
  onReset,
  resultCount,
  totalCount,
  isLoading = false,
}) => {
  // State para dropdowns animados
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasYearFilter = selectedYear !== "";
  const hasTypeFilter = selectedType !== "";
  const hasCategoryFilter = selectedCategory !== "";
  const hasSearchQuery = searchQuery.trim() !== "";
  const hasActiveFilters = hasSearchQuery || hasYearFilter || hasTypeFilter || hasCategoryFilter;

  // Componente AnimatedDropdown
  const AnimatedDropdown: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    isActive: boolean;
    disabled?: boolean;
  }> = ({ icon, label, value, options, onChange, isActive, disabled = false }) => {
    const isOpen = openDropdown === label;

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue);
      setOpenDropdown(null);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : label)}
          disabled={disabled || options.length === 0}
          className={`
            flex items-center gap-2 pl-2.5 pr-2 py-1.5 text-sm font-medium rounded-full border cursor-pointer
            transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <div className="h-3.5 w-3.5 text-gray-400 flex-shrink-0">{icon}</div>
          <span className="hidden sm:inline text-xs">{value || "Todos"}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown animado tipo persiana */}
        <div
          className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 origin-top"
          style={{
            maxHeight: isOpen ? "300px" : "0px",
            overflow: isOpen ? "auto" : "hidden",
            opacity: isOpen ? 1 : 0,
            transitionProperty: "max-height, opacity, transform",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-out",
            transform: isOpen ? "scaleY(1)" : "scaleY(0.95)",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <div className="py-1">
            <button
              onClick={() => handleSelect("")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Todos
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full text-left px-4 py-2 text-sm transition-colors
                  ${
                    value === option.value
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Buscador */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="search-toolbar"
              name="search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título, autor..."
              className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              aria-label="Buscar publicaciones por título o autor"
            />
          </div>

          {/* Filtros Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filtro de Año */}
            <AnimatedDropdown
              icon={<Calendar className="w-full h-full" />}
              label="Año"
              value={selectedYear}
              options={availableYears.map((y) => ({ value: y.toString(), label: y.toString() }))}
              onChange={onYearChange}
              isActive={hasYearFilter}
              disabled={isLoading || availableYears.length === 0}
            />

            {/* Filtro de Tipo */}
            <AnimatedDropdown
              icon={<FileType className="w-full h-full" />}
              label="Tipo"
              value={selectedType}
              options={availableTypes.map((t) => ({ value: t, label: t }))}
              onChange={onTypeChange}
              isActive={hasTypeFilter}
              disabled={isLoading || availableTypes.length === 0}
            />

            {/* Filtro de Categoría (Opcional) */}
            {availableCategories.length > 0 && onCategoryChange && (
              <AnimatedDropdown
                icon={<Tag className="w-full h-full" />}
                label={categoryLabel}
                value={selectedCategory}
                options={availableCategories.map((c) => ({ value: c, label: c }))}
                onChange={onCategoryChange}
                isActive={hasCategoryFilter}
                disabled={isLoading}
              />
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
