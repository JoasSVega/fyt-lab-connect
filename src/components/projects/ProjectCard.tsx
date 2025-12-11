import React from "react";
import { Microscope, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  type: string;
  status: "En curso" | "Finalizado";
  year: number;
  role: string;
  summary?: string;
  lines?: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  type,
  status,
  year,
  role,
  summary,
  lines,
  link,
}) => {
  return (
    <div className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full">
      {/* Header with icon and badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Microscope className="w-5 h-5 text-primary" />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            status === "En curso"
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-green-100 text-green-700 border border-green-200"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Summary */}
      {summary && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {summary}
        </p>
      )}

      {/* Metadata */}
      <div className="space-y-2 mt-auto">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 bg-muted rounded">{type}</span>
          <span className="px-2 py-1 bg-muted rounded">{year}</span>
          <span className="px-2 py-1 bg-muted rounded">{role}</span>
        </div>

        {/* Research lines */}
        {lines && lines.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {lines.slice(0, 2).map((line, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full"
              >
                {line}
              </span>
            ))}
          </div>
        )}

        {/* External link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
          >
            Ver más <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
