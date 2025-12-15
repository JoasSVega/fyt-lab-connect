import { useState, useMemo } from "react";

export interface FilterOptions {
  yearMin?: number;
  yearMax?: number;
  types?: string[];
  researchLines?: string[];
  status?: string[];
  searchQuery?: string;
}

export interface FilterableItem {
  id: number;
  titulo?: string;
  title?: string;
  anio?: number;
  year?: number;
  tipo?: string;
  type?: string;
  categoria?: string;
  estado?: string;
  status?: string;
  lineas?: string[];
  researchLines?: string[];
  autores?: string;
  authors?: string;
  institucion?: string;
  institution?: string;
  descripcion?: string;
  description?: string;
  [key: string]: unknown;
}

/**
 * Hook reutilizable para filtrado académico
 * Soporta: año, tipo, líneas de investigación, estado, búsqueda semántica
 * Optimizado para portales académicos y CV digitales
 */
export const useAcademicFilters = (items: FilterableItem[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    yearMin: undefined,
    yearMax: undefined,
    types: [],
    researchLines: [],
    status: [],
    searchQuery: "",
  });

  // Extraer años únicos de los items
  const availableYears = useMemo(() => {
    const years = items
      .map((item) => item.anio || item.year)
      .filter((y): y is number => y !== undefined);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [items]);

  // Extraer tipos únicos
  const availableTypes = useMemo(() => {
    const types = items
      .map((item) => item.tipo || item.type)
      .filter((t): t is string => t !== undefined);
    return [...new Set(types)].sort();
  }, [items]);

  // Extraer líneas de investigación únicas
  const availableResearchLines = useMemo(() => {
    const lines = items
      .flatMap((item) => item.lineas || item.researchLines || [])
      .filter((l): l is string => l !== undefined);
    return [...new Set(lines)].sort();
  }, [items]);

  // Extraer estados únicos
  const availableStatus = useMemo(() => {
    const states = items
      .map((item) => item.estado || item.status)
      .filter((s): s is string => s !== undefined);
    return [...new Set(states)].sort();
  }, [items]);

  // Búsqueda semántica simple (título, autores, institución)
  const searchItem = (item: FilterableItem, query: string): boolean => {
    if (!query.trim()) return true;

    const searchFields = [
      item.titulo || item.title,
      item.autores || item.authors,
      item.institucion || item.institution,
      item.descripcion || item.description,
    ]
      .filter((f): f is string => f !== undefined)
      .join(" ")
      .toLowerCase();

    return searchFields.includes(query.toLowerCase());
  };

  // Filtrar items según filtros activos
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemYear = item.anio || item.year;
      const itemType = item.tipo || item.type;
      const itemStatus = item.estado || item.status;
      const itemLines = item.lineas || item.researchLines || [];

      // Filtro por año
      if (filters.yearMin && itemYear && itemYear < filters.yearMin)
        return false;
      if (filters.yearMax && itemYear && itemYear > filters.yearMax)
        return false;

      // Filtro por tipo
      if (filters.types.length > 0 && itemType && !filters.types.includes(itemType)) {
        return false;
      }

      // Filtro por líneas de investigación
      if (
        filters.researchLines.length > 0 &&
        !filters.researchLines.some((line) => itemLines.includes(line))
      ) {
        return false;
      }

      // Filtro por estado
      if (filters.status.length > 0 && itemStatus && !filters.status.includes(itemStatus)) {
        return false;
      }

      // Búsqueda semántica
      if (filters.searchQuery && !searchItem(item, filters.searchQuery)) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  // Funciones para actualizar filtros
  const setYearRange = (min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, yearMin: min, yearMax: max }));
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const toggleResearchLine = (line: string) => {
    setFilters((prev) => ({
      ...prev,
      researchLines: prev.researchLines.includes(line)
        ? prev.researchLines.filter((l) => l !== line)
        : [...prev.researchLines, line],
    }));
  };

  const toggleStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const clearFilters = () => {
    setFilters({
      yearMin: undefined,
      yearMax: undefined,
      types: [],
      researchLines: [],
      status: [],
      searchQuery: "",
    });
  };

  return {
    filters,
    filteredItems,
    availableYears,
    availableTypes,
    availableResearchLines,
    availableStatus,
    setYearRange,
    toggleType,
    toggleResearchLine,
    toggleStatus,
    setSearchQuery,
    clearFilters,
    itemCount: filteredItems.length,
  };
};
