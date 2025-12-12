// Página de Producción de Contenido Digital (Videos/Podcasts)
import React, { useMemo } from "react";
import { contenidosDigitales } from "@/data/contenidosDigitales";
import type { ContenidoDigital } from "@/types/investigacion";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import ContenidoDigitalItem from "@/components/investigacion/ContenidoDigitalItem";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const ContenidosPage: React.FC = () => {
  usePageReady();

  // Separate by type
  const videos = useMemo(() => 
    contenidosDigitales.filter((c: ContenidoDigital) => c.tipo === "video"),
    []
  );
  const podcasts = useMemo(() => 
    contenidosDigitales.filter((c: ContenidoDigital) => c.tipo === "podcast"),
    []
  );
  const webinars = useMemo(() => 
    contenidosDigitales.filter((c: ContenidoDigital) => c.tipo === "webinar"),
    []
  );

  const hasVideos = videos.length > 0;
  const hasPodcasts = podcasts.length > 0;
  const hasWebinars = webinars.length > 0;

  return (
    <div className="w-full bg-background">
      <Seo
        title="Contenidos Digitales – FYT Lab Connect"
        description="Videos, podcasts, webinars y contenidos de divulgación científica producidos por el Grupo de Investigación FyT."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/investigacion/contenidos"
      />

      <SmallHero
        title="Producción de Contenido Digital"
        subtitle="Videos, podcasts y material multimedia para la divulgación del conocimiento científico en farmacología y terapéutica."
      />

      <ResearchSubNav />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        {/* Sección: Videos */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Videos Educativos
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Material audiovisual sobre farmacología, terapéutica y ciencias biomédicas.
              </p>
            </div>
            {hasVideos ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, idx) => (
                  <ScrollReveal key={video.id} delay={idx * 50}>
                    <ContenidoDigitalItem
                      titulo={video.titulo}
                      autores={video.autores}
                      fecha={`${video.anio}`}
                      tipo={video.tipo}
                      enlace={video.enlace}
                      descripcion={video.descripcion}
                      duracion={video.duracion}
                      tags={video.tags}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <PlaceholderSection message="Aquí se cargará el catálogo de videos educativos y de divulgación científica del grupo." />
            )}
          </div>
        </ScrollReveal>

        {/* Sección: Podcasts */}
        <ScrollReveal delay={100}>
          <div className="mb-16 pt-12 border-t border-border">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Podcasts
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Episodios de audio sobre investigación, salud y ciencia farmacéutica.
              </p>
            </div>
            {hasPodcasts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts.map((podcast, idx) => (
                  <ScrollReveal key={podcast.id} delay={idx * 50}>
                    <ContenidoDigitalItem
                      titulo={podcast.titulo}
                      autores={podcast.autores}
                      fecha={`${podcast.anio}`}
                      tipo={podcast.tipo}
                      enlace={podcast.enlace}
                      descripcion={podcast.descripcion}
                      duracion={podcast.duracion}
                      tags={podcast.tags}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <PlaceholderSection message="Aquí se cargará el listado de episodios de podcast producidos por el grupo de investigación." />
            )}
          </div>
        </ScrollReveal>

        {/* Sección: Webinars */}
        <ScrollReveal delay={200}>
          <div className="pt-12 border-t border-border">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Webinars y Conferencias Online
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Seminarios virtuales y presentaciones académicas en línea.
              </p>
            </div>
            {hasWebinars ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars.map((webinar, idx) => (
                  <ScrollReveal key={webinar.id} delay={idx * 50}>
                    <ContenidoDigitalItem
                      titulo={webinar.titulo}
                      autores={webinar.autores}
                      fecha={`${webinar.anio}`}
                      tipo={webinar.tipo}
                      enlace={webinar.enlace}
                      descripcion={webinar.descripcion}
                      duracion={webinar.duracion}
                      tags={webinar.tags}
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <PlaceholderSection message="Aquí se cargará el archivo de webinars y conferencias virtuales realizadas por miembros del grupo." />
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ContenidosPage;
