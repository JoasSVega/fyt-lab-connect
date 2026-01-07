import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';

interface SEOProps {
  /**
   * Título de la página (visible en pestañas y resultados de búsqueda)
   * Máximo 60 caracteres para evitar truncamiento
   */
  title: string;

  /**
   * Descripción meta (visible en Google)
   * Máximo 160 caracteres
   */
  description?: string;

  /**
   * Palabras clave separadas por comas o array
   */
  keywords?: string[] | string;

  /**
   * URL canónica de la página
   */
  canonical?: string;

  /**
   * Autor de la página
   */
  author?: string;

  /**
   * Instrucciones para robots
   */
  robots?: string;

  /**
   * Schema JSON-LD para datos estructurados
   */
  schema?: Record<string, unknown>;

  /**
   * Open Graph para redes sociales
   */
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    image?: string;
    url?: string;
    locale?: string;
    siteName?: string;
    imageAlt?: string;
    imageWidth?: string;
    imageHeight?: string;
  };

  /**
   * Twitter Card
   */
  twitter?: {
    card?: string;
    site?: string;
    image?: string;
  };

  /**
   * Hijos opcionales
   */
  children?: ReactNode;
}

// Palabras clave globales: variaciones del nombre del grupo + líneas de investigación (todas equitativas)
const GLOBAL_KEYWORDS = 'Grupo FyT, Grupo de Investigación FyT, Grupo de Investigación Farmacología y Terapéutica, Farmacología y Terapéutica Universidad de Cartagena, FyT, Grupo de investigación, Universidad de Cartagena, Atención Farmacéutica, Diseño de Fármacos, Farmacoeconomía, Farmacoepidemiología, Farmacología y Terapéutica, Farmacovigilancia, Toxicología, Farmacia Asistencial, Modelización Molecular, Investigación Farmacéutica, Ciencias Farmacéuticas, Cartagena, Colombia, Minciencias';

/**
 * Componente reutilizable para gestionar meta tags y datos estructurados
 * Usa react-helmet-async para inyectar dinámicamente en el <head>
 */
export default function SEO({
  title,
  description = '',
  keywords = '',
  canonical = '',
  author = '',
  robots = 'index, follow',
  schema = null,
  openGraph = {},
  twitter = {},
  children,
}: SEOProps) {
  // Combinar keywords
  let finalKeywords = GLOBAL_KEYWORDS;
  if (keywords) {
    const keywordString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    finalKeywords = `${keywordString}, ${GLOBAL_KEYWORDS}`;
  }

  return (
    <Helmet>
      {/* Básicos */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={finalKeywords} />}
      {author && <meta name="author" content={author} />}
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph - Completo para WhatsApp/LinkedIn/Facebook */}
      <meta property="og:title" content={openGraph?.title || title} />
      {description && <meta property="og:description" content={openGraph?.description || description} />}
      {openGraph?.type && <meta property="og:type" content={openGraph.type} />}
      {openGraph?.image && (
        <>
          <meta property="og:image" content={openGraph.image} />
          <meta property="og:image:secure_url" content={openGraph.image} />
        </>
      )}
      {openGraph?.imageAlt && <meta property="og:image:alt" content={openGraph.imageAlt} />}
      {openGraph?.imageWidth && <meta property="og:image:width" content={openGraph.imageWidth} />}
      {openGraph?.imageHeight && <meta property="og:image:height" content={openGraph.imageHeight} />}
      {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
      {openGraph?.locale && <meta property="og:locale" content={openGraph.locale} />}
      {openGraph?.siteName && <meta property="og:site_name" content={openGraph.siteName} />}

      {/* Twitter Card */}
      {twitter?.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter?.site && <meta name="twitter:site" content={twitter.site} />}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {twitter?.image && <meta name="twitter:image" content={twitter.image} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* JSON-LD Schema */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}

      {children}
    </Helmet>
  );
}
