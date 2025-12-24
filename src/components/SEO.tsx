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
  description: string;

  /**
   * Palabras clave separadas por comas
   * Ej: "farmacología, investigación, herramientas"
   */
  keywords?: string;

  /**
   * URL canónica de la página
   */
  url?: string;

  /**
   * Imagen para Open Graph (redes sociales)
   */
  image?: string;

  /**
   * Autor de la página
   */
  author?: string;

  /**
   * Schema JSON-LD para datos estructurados
   */
  schema?: Record<string, unknown>;

  /**
   * Tipo de contenido (article, website, etc.)
   */
  ogType?: string;

  /**
   * Hijos opcionales para renderizar dentro del Helmet
   */
  children?: ReactNode;
}

/**
 * Componente reutilizable para gestionar meta tags y datos estructurados
 * Usa react-helmet-async para inyectar dinámicamente en el <head>
 */
export default function SEO({
  title,
  description,
  keywords = '',
  url = '',
  image = '',
  author = '',
  schema = null,
  ogType = 'website',
  children,
}: SEOProps) {
  // Palabras clave globales (siempre presentes)
  const GLOBAL_KEYWORDS = 'Grupo FyT, FyT, Farmacología y Terapéutica, Investigación Farmacéutica';
  const finalKeywords = keywords ? `${keywords}, ${GLOBAL_KEYWORDS}` : GLOBAL_KEYWORDS;

  return (
    <Helmet>
      {/* Títulos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={finalKeywords} />}
      {author && <meta name="author" content={author} />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* JSON-LD Schema (datos estructurados) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}

      {children}
    </Helmet>
  );
}
