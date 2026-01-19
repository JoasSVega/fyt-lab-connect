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
        title="Equipo FyT: Investigadores Farmacéuticos"
        description="Equipo de investigadores comprometidos con la innovación farmacéutica, seguridad del paciente y excelencia científica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/sobre-nosotros"
        openGraph={{ 
          title: "Grupo FyT | Sobre Nosotros", 
          description: "Conoce nuestro equipo y valores", 
          type: "website",
          url: "https://fyt-research.org/sobre-nosotros",
          siteName: "Grupo FyT",
          locale: "es_ES",
        }}
        twitter={{ card: "summary_large_image", site: "@fytlab" }}
      />
      {/* Hero Institucional */}
      <section className="hero-container" aria-label="Hero Sobre Nosotros">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero-nosotros-large.webp" />
          <source media="(min-width: 640px)" srcSet="/images/hero-nosotros-medium.webp" />
          <img
            src="/images/hero-nosotros-small.webp"
            alt="Equipo de Grupo FyT"
            className="hero-image"
            aria-hidden="true"
            width={1920}
            height={1080}
            fetchpriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
        <div className="hero-overlay" />
        <div className="relative z-10 w-full hero-text-shadow text-center md:text-left flex items-center">
          <div className="hero-content-left max-w-3xl">
            <h1 className="hero-title font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Sobre Nosotros
            </h1>
            <p className="hero-subtitle font-inter text-white/95 leading-relaxed drop-shadow-md">
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
