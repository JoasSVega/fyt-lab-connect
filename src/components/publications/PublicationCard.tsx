import React from "react";
import { FileText, BookOpen, BookMarked, ExternalLink } from "lucide-react";

type PublicationType = "articulo" | "libro" | "capitulo" | "divulgacion";

interface PublicationCardProps {
  title: string;
  authors: string;
  journal: string;
  year: number;
  type: PublicationType;
  summary?: string;
  doi?: string;
  indexation?: string;
}

const typeConfig: Record<
  PublicationType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  articulo: {
    label: "Artículo",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  libro: {
    label: "Libro",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  capitulo: {
    label: "Capítulo",
    icon: <BookMarked className="w-5 h-5" />,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  divulgacion: {
    label: "Divulgación",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
};

const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  authors,
  journal,
  year,
  type,
  summary,
  doi,
  indexation,
}) => {
  const config = typeConfig[type] || typeConfig.articulo;

  return (
    <div className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${config.color.split(" ")[0]}`}
        >
          {config.icon}
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}
          >
            {config.label}
          </span>
          {indexation && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              {indexation}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-muted-foreground mb-2">{authors}</p>

      {/* Journal/Editorial and Year */}
      <p className="text-xs text-muted-foreground mb-3">
        {journal} · {year}
      </p>

      {/* Summary */}
      {summary && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {summary}
        </p>
      )}

      {/* DOI Link */}
      {doi && (
        <a
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-auto"
        >
          DOI: {doi} <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};

export default PublicationCard;
