import { lazy, Suspense } from "react";
const AboutSobreNosotros = lazy(() => import("@/components/AboutSobreNosotros"));
const Team = lazy(() => import("@/components/Team"));
const FloatingContact = lazy(() => import("@/components/FloatingContact"));
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
 

const SobreNosotros = () => {
  usePageReady({
    responsiveImages: ["/images/hero-nosotros"], // Preloads -small, -medium, -large variants
  });
  return (
  <div className="w-full bg-background flex flex-col">
      <Seo
        title="Sobre Nosotros – FYT Lab Connect"
        description="Equipo comprometido con la innovación farmacéutica, la seguridad del paciente y la excelencia científica."
        author="FYT Lab Connect"
        robots="index, follow"
        canonical="https://fytlabconnect.com/sobre-nosotros"
        openGraph={{ title: "Sobre Nosotros", description: "Conoce nuestro equipo y valores", type: "article" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      {/* Hero Institucional */}
      <section
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
        aria-label="Hero Sobre Nosotros"
      >
        {/* Imagen de fondo optimizada para LCP usando <picture> */}
        <picture>
          {/* Escritorio Grande (>1024px) - Carga la versión LARGE */}
          <source 
            media="(min-width: 1024px)" 
            srcSet="/images/hero-nosotros-large.webp" 
          />
          
          {/* Tablet/Laptop (>640px) - Carga la versión MEDIUM */}
          <source 
            media="(min-width: 640px)" 
            srcSet="/images/hero-nosotros-medium.webp" 
          />
          
          {/* Móvil (Default) - Carga la versión SMALL optimizada */}
          <img 
            src="/images/hero-nosotros-small.webp" 
            alt="Equipo de Grupo FyT"
            className="w-full h-full object-cover object-center"
            aria-hidden="true"
            width={1920}
            height={600}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
        
        {/* Overlay oscuro para que el texto se lea bien */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Contenido de texto encima */}
        <div className="absolute inset-0 z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-start">
          <div className="max-w-3xl text-left">
            <h1 className="font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg text-4xl md:text-5xl lg:text-6xl">
              Sobre Nosotros
            </h1>
            <p className="font-inter text-white/95 leading-relaxed drop-shadow-md text-lg md:text-xl">
              Somos un equipo comprometido con la innovación farmacéutica, la seguridad del paciente y la excelencia científica. Nuestra misión es desarrollar soluciones inteligentes que impulsen el futuro de la salud.
            </p>
          </div>
        </div>
      </section>
      {/* Sección Nuestro Objetivo y Nuestros Valores (lazy) */}
      <Suspense fallback={<div className="min-h-[80vh]" />}>
        <ScrollReveal>
          <AboutSobreNosotros />
        </ScrollReveal>
      </Suspense>
      {/* Sección Nuestro Equipo (lazy) */}
      <ScrollReveal delay={0.1}>
        <section className="py-20 min-h-[60vh] bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="site-section-title text-center text-fyt-dark mb-8 drop-shadow-lg">Nuestro Equipo</h2>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Team compact />
            </Suspense>
          </div>
        </section>
      </ScrollReveal>
      <Suspense fallback={null}>
        <FloatingContact />
      </Suspense>
  </div>
  );
};

export default SobreNosotros;
