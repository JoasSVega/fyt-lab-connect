import React from "react";
import { Calendar, MapPin, Users, Award } from "lucide-react";

type EventType =
  | "Congreso"
  | "Simposio"
  | "Jornada"
  | "Curso"
  | "Taller"
  | "Seminario"
  | "Evento académico";

interface EventCardProps {
  title: string;
  year: number;
  type: EventType | string;
  participation: string;
  location: string;
}

const typeColors: Record<string, string> = {
  Congreso: "bg-blue-100 text-blue-700 border-blue-200",
  Simposio: "bg-purple-100 text-purple-700 border-purple-200",
  Jornada: "bg-green-100 text-green-700 border-green-200",
  Curso: "bg-amber-100 text-amber-700 border-amber-200",
  Taller: "bg-rose-100 text-rose-700 border-rose-200",
  Seminario: "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Evento académico": "bg-slate-100 text-slate-700 border-slate-200",
};

const EventCard: React.FC<EventCardProps> = ({
  title,
  year,
  type,
  participation,
  location,
}) => {
  const colorClass = typeColors[type] || typeColors["Evento académico"];

  return (
    <div className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 p-5">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
            >
              {type}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              {participation}
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
