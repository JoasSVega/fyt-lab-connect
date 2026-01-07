import React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface ProjectFilterBarProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
  yearFilter: string;
  onYearChange: (year: string) => void;
  roleFilter: string;
  onRoleChange: (role: string) => void;
  years: number[];
  types: string[];
  roles: string[];
}

const ProjectFilterBar: React.FC<ProjectFilterBarProps> = ({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
  yearFilter,
  onYearChange,
  roleFilter,
  onRoleChange,
  years,
  types,
  roles,
}) => {
  const statusOptions: FilterOption[] = [
    { value: "", label: "Todos" },
    { value: "En curso", label: "En curso" },
    { value: "Finalizado", label: "Finalizados" },
  ];

  return (
    <div className="space-y-4">
      {/* Status buttons */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === option.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Additional filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Filtrar por tipo"
        >
          <option value="">Tipo (todos)</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={yearFilter}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Filtrar por año"
        >
          <option value="">Año (todos)</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Filtrar por rol"
        >
          <option value="">Rol (todos)</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        {(statusFilter || typeFilter || yearFilter || roleFilter) && (
          <button
            onClick={() => {
              onStatusChange("");
              onTypeChange("");
              onYearChange("");
              onRoleChange("");
            }}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilterBar;
