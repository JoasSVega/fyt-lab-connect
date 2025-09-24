// Página dedicada para el listado completo de publicaciones
// Filtros por año y tipo, grid minimalista, cards académicas
// Página de listado de publicaciones con filtros y paginación
import React, { useState, useMemo } from "react";
import BaseLayout from "@/components/BaseLayout";
import publicationsData from "@/data/publications.json";
import PublicationCard from "@/components/publications/PublicationCard";
import FiltersBar from "@/components/search/FiltersBar";


const TYPE_LABELS: Record<string, string> = {
  articulo: "Artículo",
  libro: "Libro",
  capitulo: "Capítulo"
};
const AÑOS = Array.from(new Set(publicationsData.map((p: any) => p.year))).sort((a, b) => b - a);
const TIPOS = Array.from(new Set(publicationsData.map((p: any) => p.type)));
const PAGE_SIZE = 6;

const PublicacionesPage: React.FC = () => {
  const [year, setYear] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return publicationsData.filter((p: any) =>
      (!year || p.year === Number(year)) &&
      (!type || p.type === type) &&
      (
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [year, type, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [year, type, search]);

  return (
    <BaseLayout>
      <section className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
  <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-slate-800 mb-4 text-center">Publicaciones</h1>
        <FiltersBar>
          <select
            value={year || ''}
            onChange={e => setYear(e.target.value || null)}
            className="border rounded px-2 py-1 text-sm font-inter"
            aria-label="Filtrar por año"
          >
            <option value="">Año (todos)</option>
            {AÑOS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={type || ''}
            onChange={e => setType(e.target.value || null)}
            className="border rounded px-2 py-1 text-sm font-inter"
            aria-label="Filtrar por tipo"
          >
            <option value="">Tipo (todos)</option>
            {TIPOS.map(t => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
          </select>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar publicación..."
            className="border rounded px-2 py-1 text-sm font-inter"
            aria-label="Buscar publicación"
          />
          <button
            type="button"
            onClick={() => { setYear(null); setType(null); setSearch(""); }}
            className="px-2 py-1 rounded text-xs border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-inter"
            aria-label="Limpiar filtros"
          >
            Limpiar filtros
          </button>
        </FiltersBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((pub: any) => (
            <PublicationCard
              key={pub.id}
              image={pub.image}
              title={pub.title}
              year={pub.year}
              type={TYPE_LABELS[pub.type] || pub.type}
              authors={pub.authors}
              link={pub.link}
            />
          ))}
        </div>
        {/* Paginación */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            aria-label="Página anterior"
          >
            Anterior
          </button>
          <span className="px-2 py-1 text-sm">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      </section>
    </BaseLayout>
  );
};

export default PublicacionesPage;
