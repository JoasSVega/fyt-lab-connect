// Card reutilizable para publicaciones académicas
import React from "react";

interface PublicationCardProps {
  image?: string;
  title: string;
  year: number | string;
  type: string;
  authors: string;
  link?: string;
  actions?: React.ReactNode;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ image, title, year, type, authors, link, actions }) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow p-5 flex flex-col h-full">
    <div className="mb-2 h-24 bg-slate-100 flex items-center justify-center rounded overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={`Portada de la publicación: ${title}`}
          width={320}
          height={180}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ) : (
        // Imagen placeholder accesible
        <span aria-hidden="true" className="text-slate-400">Imagen</span>
      )}
    </div>
    <h3 className="text-base font-raleway font-bold text-slate-800 mb-1">{title}</h3>
    <div className="text-xs font-inter text-slate-500 mb-1">{year} · {type}</div>
    <p className="text-xs font-inter text-slate-600 mb-1">{authors}</p>
    {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs font-inter text-fyt-blue underline mb-1">Ver publicación</a>}
    {actions && <div className="mt-auto">{actions}</div>}
  </div>
);

export default PublicationCard;
