import React from "react";

interface EventsFilterBarProps {
  typeFilter: string;
  onTypeChange: (type: string) => void;
  yearFilter: string;
  onYearChange: (year: string) => void;
  participationFilter: string;
  onParticipationChange: (participation: string) => void;
  types: string[];
  years: number[];
  participations: string[];
}

const EventsFilterBar: React.FC<EventsFilterBarProps> = ({
  typeFilter,
  onTypeChange,
  yearFilter,
  onYearChange,
  participationFilter,
  onParticipationChange,
  types,
  years,
  participations,
}) => {
  return (
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
        value={participationFilter}
        onChange={(e) => onParticipationChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Filtrar por participación"
      >
        <option value="">Rol (todos)</option>
        {participations.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {(typeFilter || yearFilter || participationFilter) && (
        <button
          onClick={() => {
            onTypeChange("");
            onYearChange("");
            onParticipationChange("");
          }}
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Limpiar todos los filtros de eventos"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default EventsFilterBar;
