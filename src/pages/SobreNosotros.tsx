import AboutSobreNosotros from "@/components/AboutSobreNosotros";
import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";

const SobreNosotros = () => {
  usePageReady({
    responsiveImages: ["/images/hero-nosotros"],
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
        className="hero-container"
        aria-label="Hero Sobre Nosotros"
      >
        {/* Imagen de fondo unificada */}
        <picture>
          <source 
            srcSet="/images/hero-nosotros-large.webp" 
            media="(min-width: 1280px)" 
          />
          <source 
            srcSet="/images/hero-nosotros-medium.webp" 
            media="(min-width: 640px)" 
          />
          <img 
            src="/images/hero-nosotros-small.webp" 
            alt="" 
            className="hero-image" 
            aria-hidden="true"
            width={1920}
            height={1080}
          />
        </picture>
        {/* Overlay oscuro unificado */}
        <div className="hero-overlay" />
        {/* Content con text-shadow */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 hero-text-shadow">
          <div className="max-w-3xl text-center lg:text-left">
            <h1 className="hero-title font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Sobre Nosotros
            </h1>
            <p className="hero-subtitle font-inter text-white/95 leading-relaxed drop-shadow-md">
              Somos un equipo comprometido con la innovación farmacéutica, la seguridad del paciente y la excelencia científica. Nuestra misión es desarrollar soluciones inteligentes que impulsen el futuro de la salud.
            </p>
          </div>
        </div>
      </section>
      {/* Sección Nuestro Objetivo y Nuestros Valores (desde About) */}
      <ScrollReveal>
        <AboutSobreNosotros />
      </ScrollReveal>
      {/* Sección Nuestro Equipo */}
      <ScrollReveal delay={0.1}>
        <section className="py-20 min-h-[60vh] bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="site-section-title text-center text-fyt-dark mb-8 drop-shadow-lg">Nuestro Equipo</h2>
            <Team compact />
          </div>
        </section>
      </ScrollReveal>
    <FloatingContact />
  </div>
  );
};

export default SobreNosotros;
