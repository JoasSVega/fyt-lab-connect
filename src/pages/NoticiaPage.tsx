import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getNoticiaBySlug, getAllNoticias } from "@/data/noticias";
import NoticiaHero from "@/components/noticias/NoticiaHero";
import NoticiaImages from "@/components/noticias/NoticiaImages";
import NoticiaClosing from "@/components/noticias/NoticiaClosing";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import FloatingContact from "@/components/FloatingContact";
import type { Noticia } from "@/types/noticias";

/**
 * Mapeo de categorías a variables CSS (colores primarios y secundarios)
 * Similar a divulgación pero con paleta institucional de noticias
 */
const getCategoryColorVars = (category: Noticia["category"]): Record<string, string> => {
  const colorMap: Record<Noticia["category"], Record<string, string>> = {
    "Colaboración": {
      "--accent-primary": "#1565C0",
      "--accent-secondary": "#E3F2FD",
      "--accent-light": "#BBDEFB"
    },
    "Evento": {
      "--accent-primary": "#00897B",
      "--accent-secondary": "#E0F2F1",
      "--accent-light": "#B2DFDB"
    },
    "Publicación": {
      "--accent-primary": "#673AB7",
      "--accent-secondary": "#EDE7F6",
      "--accent-light": "#CE93D8"
    },
    "Lanzamiento": {
      "--accent-primary": "#F57C00",
      "--accent-secondary": "#FFF3E0",
      "--accent-light": "#FFB74D"
    },
    "Participación": {
      "--accent-primary": "#388E3C",
      "--accent-secondary": "#E8F5E9",
      "--accent-light": "#81C784"
    },
    "Reconocimiento": {
      "--accent-primary": "#F9A825",
      "--accent-secondary": "#FFF8E1",
      "--accent-light": "#FFD54F"
    },
    "Comunicado": {
      "--accent-primary": "#455A64",
      "--accent-secondary": "#ECEFF1",
      "--accent-light": "#90A4AE"
    }
  };

  return colorMap[category] || colorMap["Comunicado"];
};

/**
 * Página individual de noticia institucional
 * 
 * Estructura:
 * 1. SEO y metadatos
 * 2. Hero con categoría, fecha, título, subtítulo
 * 3. Espacio para imagen principal
 * 4. Contenido redactado en HTML (con colores dinámicos)
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
  const baseUrl = "https://fyt-research.org";
  const ogImagePath = "/images/noticias/2026/2026-01-21-fyt-fortalece-colaboracion-internacional-guadalajara/03-og.webp";
  const ogImage = `${baseUrl}${ogImagePath}`;

  // Obtener variables de color para la categoría
  const colorVars = getCategoryColorVars(noticia.category);

  return (
    <div className="w-full bg-background flex flex-col noticia-page" style={colorVars as React.CSSProperties}>
      <Seo
        title={`${noticia.title} | Noticias FyT`}
        description={noticia.summary}
        keywords={[
          "Noticias FyT",
          "Grupo FyT",
          "Universidad de Cartagena",
          "Universidad de Guadalajara",
          "colaboración internacional",
          "investigación biomédica",
          "farmacología",
          "inmunoinformática",
          "investigación computacional"
        ]}
        author="Grupo FyT"
        robots="index, follow"
        canonical={`https://fyt-research.org/noticias/${noticia.slug}`}
        openGraph={{
          title: `${noticia.title} | Grupo FyT`,
          description: noticia.summary,
          type: "article",
          url: `https://fyt-research.org/noticias/${noticia.slug}`,
          siteName: "Grupo FyT",
          locale: "es_ES",
          image: ogImage,
          imageAlt: "Grupo FyT fortalece colaboración internacional con la Universidad de Guadalajara",
          imageWidth: "1200",
          imageHeight: "630"
        }}
        twitter={{
          card: "summary_large_image",
          site: "@fytlab",
          image: ogImage
        }}
        schema={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: noticia.title,
          description: noticia.summary,
          image: [ogImage],
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
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://fyt-research.org/noticias/${noticia.slug}`
          }
        }}
      >
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:section" content={noticia.category} />
        <meta property="article:tag" content="Noticias FyT" />
      </Seo>

      {/* Hero con metadatos */}
      <NoticiaHero noticia={noticia} />

      {/* Galería de imágenes horizontal */}
      <NoticiaImages slug={noticia.slug} images={noticia.images} />

      {/* Contenido principal */}
      <article className="w-full bg-white noticia-page__content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          {/* Contenido HTML renderizado con estilos dinámicos */}
          <div
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
