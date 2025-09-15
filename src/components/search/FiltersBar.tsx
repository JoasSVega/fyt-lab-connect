// Barra de filtros y búsqueda reutilizable para listados
import React from "react";

interface FiltersBarProps {
  children?: React.ReactNode;
}

const FiltersBar: React.FC<FiltersBarProps> = ({ children }) => (
  <div className="flex flex-wrap gap-2 items-center mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
    {children}
  </div>
);

export default FiltersBar;
