// Página de Contenido Digital - Producción audiovisual y sonora
import React, { useMemo } from "react";
import { divulgacionCientifica } from "@/data/contenidosDigitales";
import type { DivulgacionCientifica as DivulgacionCientificaType } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";
import ContenidoDigitalItem from "@/components/investigacion/ContenidoDigitalItem";
import { ContenidoDigitalItemSkeleton } from "@/components/investigacion/ContenidoDigitalItemSkeleton";

const DivulgacionCientificaPage: React.FC = () => {
  usePageReady();

  // Separate by category
  const videos = useMemo(() => 
    divulgacionCientifica.filter((c: DivulgacionCientificaType) => c.categoria === "audiovisual"),
    []
  );
  const podcasts = useMemo(() => 
    divulgacionCientifica.filter((c: DivulgacionCientificaType) => c.categoria === "podcast"),
    []
  );

  const hasVideos = videos.length > 0;
  const hasPodcasts = podcasts.length > 0;

  // Paginación: 10 items por página
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.max(1, Math.ceil(divulgacionCientifica.length / itemsPerPage));
  const pagedItems = divulgacionCientifica.slice(indexOfFirstItem, indexOfLastItem);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-full bg-background">
      <Seo
        title="Contenido Digital | Grupo FyT"
        description="Videos, podcasts y contenido audiovisual sobre investigación en ciencias farmacéuticas del Grupo FyT."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/investigacion/contenido-digital"
        openGraph={{
          title: "Contenido Digital | Grupo FyT",
          description: "Contenido audiovisual sobre investigación en ciencias farmacéuticas",
          type: "website",
          url: "https://fyt-research.org/investigacion/contenido-digital",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{ card: "summary_large_image", site: "@fytlab" }}
      />

      <SmallHero
        title="Contenido Digital"
        subtitle="Contenido audiovisual sobre investigación en ciencias farmacéuticas: videos, podcasts y más."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 min-h-[900px]">
        <ScrollReveal>
          {divulgacionCientifica.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[700px]">
                {pagedItems.map((item) => {
                  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] as const;
                  const mesesPorTitulo: Record<string, number> = {
                    "Synthesizing Amino Acids Modified with Reactive Carbonyls in Silico to Assess Structural Effects Using Molecular Dynamics Simulations": 4,
                    "Farmacovigilancia: Miocarditis tras la administración de vacunas de RNA": 3,
                    "Conversatorio Hablemos de farmacia comunitaria": 8,
                    "Actualización en análisis de los parámetros PK/PD - farmacocinética/farmacodinamia en paciente de cuidado crítico": 8,
                    "Hábitos de consumo de medicamentos de venta libre por estudiantes del área de la salud en Cartagena-Colombia": 6,
                    "AUDIOCIENCIA ? PERFILES": 11,
                  };
                  const mesNum = mesesPorTitulo[item.titulo] || 1;
                  const fechaLabel = `${meses[mesNum - 1]} ${item.anio}`;
                  return (
                    <ContenidoDigitalItem
                      key={item.id}
                      titulo={item.titulo}
                      tipo={item.tipo}
                      fecha={fechaLabel}
                      descripcion={item.descripcion}
                      enlace={item.enlace}
                      tags={item.plataforma ? [item.plataforma] : undefined}
                    />
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm text-slate-600">Página {currentPage} de {totalPages}</span>
                <button
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8"/><path d="M16 3H8a2 2 0 0 0-2 2v0"/><path d="M22 8H2"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
              <p className="text-slate-600">No hay elementos registrados en esta categoría aún.</p>
            </div>
          )}
        </ScrollReveal>
      </section>
    </div>
  );
};

export default DivulgacionCientificaPage;
