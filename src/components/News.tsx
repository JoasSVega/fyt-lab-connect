import React, { useState, useMemo } from "react";
import { Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { CardReveal } from "./animations/CardReveal";
import { Link } from "react-router-dom";
import { getAllNoticias } from "@/data/noticias";
import NoticiaCard from "./noticias/NoticiaCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Noticia } from "@/types/noticias";

const NOTICIAS_PER_PAGE = 6;

const News = () => {
  const noticias = getAllNoticias();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(noticias.map((n) => n.category));
    return Array.from(cats).sort();
  }, [noticias]);

  // Filtrar noticias
  const filteredNoticias = useMemo(() => {
    return noticias.filter((noticia) => {
      const matchesSearch =
        searchQuery === "" ||
        noticia.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        noticia.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || noticia.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [noticias, searchQuery, selectedCategory]);

  // Paginación
  const totalPages = Math.ceil(filteredNoticias.length / NOTICIAS_PER_PAGE);
  const startIndex = (currentPage - 1) * NOTICIAS_PER_PAGE;
  const endIndex = startIndex + NOTICIAS_PER_PAGE;
  const paginatedNoticias = filteredNoticias.slice(startIndex, endIndex);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="w-full py-16">
      {noticias.length > 0 ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Filtros */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar noticias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-300"
              />
            </div>

            {/* Filtro por categoría */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-slate-300">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid de noticias - Layout timeline completo */}
          {paginatedNoticias.length > 0 ? (
            <>
              <div className="space-y-0">
                {paginatedNoticias.map((noticia, idx) => (
                  <NoticiaCard
                    key={noticia.slug}
                    noticia={noticia}
                    delay={idx}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <Button
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  <span className="text-sm text-slate-600">
                    Página <span className="font-semibold">{currentPage}</span> de{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                  <Button
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="gap-2"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                No se encontraron noticias que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <CardReveal>
            <div className="bg-white shadow-lg rounded-xl px-8 py-12 flex flex-col items-center justify-center min-h-[300px]">
              <Clock className="w-12 h-12 text-fyt-blue mb-4" style={{ filter: 'drop-shadow(0 2px 8px rgba(59,185,255,0.2))' }} />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Noticias del Grupo de Investigación FyT</h2>
              <div className="text-center max-w-2xl text-slate-700 leading-relaxed space-y-4">
                <p>
                  Esta sección reunirá comunicaciones institucionales del <span className="font-semibold text-fyt-blue">Grupo de Investigación en Farmacología y Terapéutica (FyT)</span>.
                </p>
                <p>
                  Publicaremos: eventos organizados por el grupo, la participación de nuestros integrantes en actividades académicas, y anuncios sobre publicaciones, herramientas y recursos desarrollados por FyT.
                </p>
                <p className="text-sm text-slate-600 italic">
                  Te invitamos a explorar <Link to="/investigacion" className="text-fyt-blue hover:underline">Investigación</Link> y <Link to="/divulgacion" className="text-fyt-blue hover:underline">Divulgación Científica</Link>.
                </p>
              </div>
            </div>
          </CardReveal>
        </div>
      )}
    </section>
  );
};

export default News;