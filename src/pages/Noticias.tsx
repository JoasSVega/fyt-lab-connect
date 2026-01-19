import News from "@/components/News";
import FloatingContact from "@/components/FloatingContact";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import SafeImage from "@/components/SafeImage";

const Noticias = () => {
  usePageReady();
  return (
    <div className="w-full bg-background flex flex-col">
      <Seo
        title="Grupo FyT | Noticias"
        description="Noticias y novedades del Grupo de Investigación en Farmacología y Terapéutica."
        author="Grupo FyT"
        robots="index, follow"
        canonical="https://fyt-research.org/noticias"
        openGraph={{ title: "Grupo FyT | Noticias", description: "Actualidad institucional del Grupo FyT", type: "website" }}
        twitter={{ card: "summary", site: "@fytlab" }}
      />
      {/* Hero Noticias */}
      <section className="hero-container" aria-label="Hero Noticias">
        <picture>
          <source srcSet="/images/hero-noticias-large.webp" media="(min-width: 1280px)" />
          <source srcSet="/images/hero-noticias-medium.webp" media="(min-width: 640px)" />
          <SafeImage
            src="/images/hero-noticias-small.webp"
            fallbackSrc="/images/hero-noticias.png"
            alt="Noticias del Grupo FyT"
            className="hero-image"
            aria-hidden="true"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
        <div className="hero-overlay" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center hero-text-shadow">
          <h1 className="hero-title font-poppins font-extrabold text-white mb-4">
            Noticias del Grupo FyT
          </h1>
          <p className="hero-subtitle text-white/90 max-w-3xl mx-auto leading-relaxed">
            Actualizaciones institucionales, eventos y lanzamientos del Grupo de Investigación en Farmacología y Terapéutica.
          </p>
        </div>
      </section>

      {/* Título principal eliminado para evitar duplicado, el componente News lo incluye */}
      <News />
      <FloatingContact />
    </div>
  );
};

export default Noticias;
