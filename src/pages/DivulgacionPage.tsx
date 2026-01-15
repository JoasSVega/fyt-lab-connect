import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { divulgacionPosts } from "@/data/divulgacionPosts";
import DivulgacionCard from "@/components/divulgacion/DivulgacionCard";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Página principal de Divulgación
 * Listado editorial de publicaciones con filtros y búsqueda
 */
const DivulgacionPage: React.FC = () => {
  usePageReady();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(divulgacionPosts.map(p => p.category).filter(Boolean));
    return Array.from(cats);
  }, []);

  // Filtrar publicaciones
  const filteredPosts = useMemo(() => {
    return divulgacionPosts.filter(post => {
      const matchesSearch = searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || 
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-background">
      <Seo
        title="Divulgación | Grupo FyT"
        description="Artículos de divulgación científica sobre farmacología, investigación y salud. Contenido académico accesible del Grupo FyT."
        canonical="https://fyt-research.org/divulgacion"
        openGraph={{
          title: "Divulgación Científica | Grupo FyT",
          description: "Conocimiento científico accesible",
          type: "website",
          url: "https://fyt-research.org/divulgacion",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              Divulgación Científica
            </h1>
            <p className="font-inter text-lg sm:text-xl text-gray-600 leading-relaxed">
              Artículos académicos accesibles sobre farmacología, investigación y salud. 
              Conectamos la ciencia con la sociedad a través de contenido riguroso y comprensible.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros y búsqueda */}
      <section className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Búsqueda */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Filtro por categoría */}
            <div className="w-full sm:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Categoría" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat || ""}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Limpiar filtros */}
            {(searchQuery || selectedCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="w-full sm:w-auto"
              >
                Limpiar
              </Button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredPosts.length} {filteredPosts.length === 1 ? "artículo" : "artículos"}
            {searchQuery && ` para "${searchQuery}"`}
            {selectedCategory !== "all" && ` en ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Grid de publicaciones */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <DivulgacionCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
              No se encontraron artículos
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros o búsqueda
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Ver todos los artículos
            </Button>
          </div>
        )}
      </section>

      {/* CTA institucional */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            ¿Te interesa colaborar?
          </h2>
          <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Si deseas proponer un tema, colaborar en un artículo o conocer más sobre nuestra investigación, 
            estamos abiertos a nuevas ideas y alianzas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 cta-primary">
              <Link to="/contactos">Contactar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 cta-secondary">
              <Link to="/investigacion">Ver investigación</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivulgacionPage;
