// Página de Producción de Contenido Digital (Videos/Podcasts)
import React from "react";
import { usePageReady } from "@/hooks/usePageReady";
import SmallHero from "@/components/shared/SmallHero";
import ResearchSubNav from "@/components/investigacion/ResearchSubNav";
import PlaceholderSection from "@/components/investigacion/PlaceholderSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Seo from "@/components/Seo";

const ContenidosPage: React.FC = () => {
  usePageReady();

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
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Videos Educativos
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Material audiovisual sobre farmacología, terapéutica y ciencias biomédicas.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará el catálogo de videos educativos y de divulgación científica del grupo." />
          </div>
        </ScrollReveal>

        {/* Sección: Podcasts */}
        <ScrollReveal delay={100}>
          <div className="mb-16 pt-12 border-t border-slate-100">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Podcasts
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Episodios de audio sobre investigación, salud y ciencia farmacéutica.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará el listado de episodios de podcast producidos por el grupo de investigación." />
          </div>
        </ScrollReveal>

        {/* Sección: Webinars */}
        <ScrollReveal delay={200}>
          <div className="pt-12 border-t border-slate-100">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-800 mb-3">
                Webinars y Conferencias Online
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Seminarios virtuales y presentaciones académicas en línea.
              </p>
            </div>
            <PlaceholderSection message="Aquí se cargará el archivo de webinars y conferencias virtuales realizadas por miembros del grupo." />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ContenidosPage;
