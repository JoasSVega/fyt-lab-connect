import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getNoticiaBySlug, getAllNoticias } from "@/data/noticias";
import NoticiaHero from "@/components/noticias/NoticiaHero";
import NoticiaClosing from "@/components/noticias/NoticiaClosing";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import FloatingContact from "@/components/FloatingContact";

/**
 * Página individual de noticia institucional
 * 
 * Estructura:
 * 1. SEO y metadatos
 * 2. Hero con categoría, fecha, título, subtítulo
 * 3. Espacio para imagen principal
 * 4. Contenido redactado en HTML
 * 5. Bloque de cierre institucional
 * 6. Navegación
 */
const NoticiaPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  usePageReady();

  // Obtener la noticia actual
  const noticia = useMemo(() => {
    return getNoticiaBySlug(slug || "");
  }, [slug]);

  // Si no existe la noticia, redirigir
  if (!noticia) {
    return <Navigate to="/noticias" replace />;
  }

  // Obtener noticia anterior y siguiente para navegación
  const allNoticias = getAllNoticias();
  const currentIndex = allNoticias.findIndex((n) => n.slug === noticia.slug);
  const previousNoticia = currentIndex > 0 ? allNoticias[currentIndex - 1] : undefined;
  const nextNoticia = currentIndex < allNoticias.length - 1 ? allNoticias[currentIndex + 1] : undefined;

  // Formatear fecha para SEO
  const publishedDate = new Date(noticia.date).toISOString();
  const modifiedDate = new Date(noticia.date).toISOString();

  return (
    <div className="w-full bg-background flex flex-col">
      <Seo
        title={`${noticia.title} | Noticias FyT`}
        description={noticia.summary}
        author="Grupo FyT"
        robots="index, follow"
        canonical={`https://fyt-research.org/noticias/${noticia.slug}`}
        openGraph={{
          title: `${noticia.title} | Grupo FyT`,
          description: noticia.summary,
          type: "article",
          url: `https://fyt-research.org/noticias/${noticia.slug}`,
          siteName: "Grupo FyT",
          locale: "es_ES"
        }}
        twitter={{
          card: "summary_large_image",
          site: "@fytlab",
          image: noticia.imageAlt
        }}
        schema={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: noticia.title,
          description: noticia.summary,
          image: noticia.imageAlt ? [noticia.imageAlt] : [],
          datePublished: publishedDate,
          dateModified: modifiedDate,
          author: {
            "@type": "Organization",
            name: "Grupo de Investigación en Farmacología y Terapéutica (FyT)",
            url: "https://fyt-research.org"
          },
          publisher: {
            "@type": "Organization",
            name: "Universidad de Cartagena",
            url: "https://fyt-research.org"
          }
        }}
      />

      {/* Hero con metadatos */}
      <NoticiaHero noticia={noticia} />

      {/* Contenido principal */}
      <article className="w-full bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          {/* Contenido HTML renderizado */}
          <div
            className="prose prose-sm sm:prose md:prose-lg max-w-none text-slate-700 font-inter"
            dangerouslySetInnerHTML={{ __html: noticia.content }}
          />
        </div>
      </article>

      {/* Bloque de cierre institucional */}
      <NoticiaClosing noticia={noticia} />

      {/* Contacto flotante */}
      <FloatingContact />
    </div>
  );
};

export default NoticiaPage;
