import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Seo from "@/components/Seo";
import { getOrganizationSchema, baseUrl } from "@/utils/seoSchemas";
import { Button } from "@/components/ui/button";
import { Users, Microscope, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingContact from "@/components/FloatingContact";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { usePageReady } from "@/hooks/usePageReady";

// Lazy load heavy components that appear below-the-fold
const About = lazy(() => import("@/components/About"));
const Tools = lazy(() => import("@/components/Tools"));

const Index = () => {
  const navigate = useNavigate();
  usePageReady({
    responsiveImages: ["/images/hero-index"],
  });
  return (
  <div className="w-full" style={{background: "linear-gradient(120deg, #e0f2ff 0%, #f8fafc 60%, #f3f4f6 100%)"}}>
        <Seo
          title="Grupo FyT | Investigación y Divulgación en Salud"
          description="Investigación en Farmacología y Terapéutica de la Universidad de Cartagena. Proyectos, publicaciones y herramientas científicas."
          keywords={["Grupo FyT", "Grupo de Investigación FyT", "Grupo de Investigación Farmacología y Terapéutica", "Farmacología y Terapéutica Universidad de Cartagena", "Universidad de Cartagena", "Grupo de investigación", "Investigación Farmacéutica", "Cartagena", "Colombia"]}
          author="Grupo FyT"
          robots="index, follow"
          canonical={baseUrl}
          openGraph={{
            title: "Grupo FyT | Investigación en Farmacología y Terapéutica",
            description: "Grupo FyT: Investigación de vanguardia en Farmacología y Terapéutica de la Universidad de Cartagena. Descubre nuestros proyectos, publicaciones y herramientas digitales.",
            type: "website",
            url: baseUrl,
            siteName: "Grupo FyT",
            locale: "es_ES",
          }}
          twitter={{
            card: "summary_large_image",
            site: "@fytlab",
          }}
          schema={getOrganizationSchema()}
        />
        {/* Título principal eliminado para evitar duplicidad. */}
        {/* Hero Section (sin ScrollReveal para evitar scroll interno y problemas de visualización) */}
        <Hero />
        {/* Tarjetas principales: diseño proporcional y simétrico en todas las pantallas */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-12 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
          {/* Sobre Nosotros */}
          <ScrollReveal delay={0}>
            <div className="flex flex-col h-full items-center gap-4 bg-white rounded-xl shadow-soft p-6 md:p-8 w-full border border-blue-100">
              <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-blue-600" aria-label="Sobre Nosotros" />
              </span>
              <h3 className="text-[clamp(1rem,1.6vw,1.125rem)] font-raleway font-bold text-fyt-dark mb-1 text-center">Sobre Nosotros</h3>
              <p className="text-muted-foreground text-center text-[clamp(0.9rem,1.4vw,1rem)] mb-4 font-inter">Conoce el objetivo, valores y equipo del grupo FyT.</p>
              <Button
                onClick={() => navigate('/sobre-nosotros')}
                className="mt-auto w-full md:w-auto rounded-full px-5 py-2 font-inter shadow bg-fyt-blue text-white border-2 border-fyt-blue btn-solid-interactive"
              >
                Ver Más
              </Button>
            </div>
          </ScrollReveal>
          {/* Investigación */}
          <ScrollReveal delay={0.1}>
          <div className="flex flex-col h-full items-center gap-4 bg-white rounded-xl shadow-soft p-6 md:p-8 w-full border border-purple-100">
            <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-purple-100 mb-2">
              <Microscope className="w-7 h-7 md:w-8 md:h-8 text-purple-600" aria-label="Investigación" />
            </span>
            <h3 className="text-[clamp(1rem,1.6vw,1.125rem)] font-raleway font-bold text-fyt-dark mb-1 text-center">Investigación</h3>
            <p className="text-muted-foreground text-center text-[clamp(0.9rem,1.4vw,1rem)] mb-4 font-inter">Conoce nuestras investigaciones actuales y resultados científicos.</p>
            <Button
              onClick={() => navigate('/investigacion')}
              className="mt-auto w-full md:w-auto rounded-full px-5 py-2 font-inter shadow bg-fyt-purple text-white border-2 border-fyt-purple btn-solid-interactive"
            >
              Ver Investigación
            </Button>
          </div>
          </ScrollReveal>
          {/* Noticias */}
          <ScrollReveal delay={0.2}>
          <div className="flex flex-col h-full items-center gap-4 bg-white rounded-xl shadow-soft p-6 md:p-8 w-full border border-red-100">
            <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-red-100 mb-2">
              <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-red-600" aria-label="Noticias" />
            </span>
            <h3 className="text-[clamp(1rem,1.6vw,1.125rem)] font-raleway font-bold text-fyt-dark mb-1 text-center">Noticias</h3>
            <p className="text-muted-foreground text-center text-[clamp(0.9rem,1.4vw,1rem)] mb-4 font-inter">Mantente informado sobre nuestras actividades y logros recientes.</p>
            <Button
              onClick={() => navigate('/noticias')}
              className="mt-auto w-full md:w-auto rounded-full px-5 py-2 font-inter shadow bg-fyt-red text-white border-2 border-fyt-red btn-solid-interactive"
            >
              Ver Noticias
            </Button>
          </div>
          </ScrollReveal>
        </section>
      {/* Secciones de investigación, modalidades, actividades y productos, y la tarjeta de inscripción */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ScrollReveal delay={0.1}>
          {/* Breakout: el carrusel ocupa todo el viewport ignorando contenedor centrado */}
          <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] px-4 md:px-8">
            <About />
          </div>
        </ScrollReveal>
      </Suspense>
        {/* Pharmaceutical Tools Section removida: ahora solo en la página Herramientas */}
      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
};

export default Index;
