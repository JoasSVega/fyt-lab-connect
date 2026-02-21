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
        title="Sobre Nosotros | Misión, Visión y Equipo del Grupo FyT"
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
          <source media="(min-width: 1280px)" srcSet="/images/hero-nosotros-large.webp?v=20260221" />
          <source media="(min-width: 640px)" srcSet="/images/hero-nosotros-medium.webp?v=20260221" />
          <img
            src="/images/hero-nosotros-small.webp?v=20260221"
            alt="Equipo de Grupo FyT"
            className="hero-image"
            aria-hidden="true"
            width={1920}
            height={1080}
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div className="hero-overlay" />
        <div className="relative z-10 w-full hero-content-left hero-text-shadow text-center md:text-left">
          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 className="hero-title font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Propósito, valores y equipo del Grupo FyT
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
