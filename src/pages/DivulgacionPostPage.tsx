import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getPostBySlug, divulgacionPosts } from "@/data/divulgacionPosts";
import DivulgacionHero from "@/components/divulgacion/DivulgacionHero";
import { usePageReady } from "@/hooks/usePageReady";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, MessageCircle, Copy, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DivulgacionCard from "@/components/divulgacion/DivulgacionCard";

/**
 * Página individual de artículo de divulgación
 * Muestra el contenido completo con opciones de compartir
 */
const DivulgacionPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  usePageReady();

  // Obtener el post actual
  const post = useMemo(() => {
    if (!slug) return null;
    return getPostBySlug(slug);
  }, [slug]);

  // Obtener posts relacionados (otros 2 posts)
  const relatedPosts = useMemo(() => {
    return divulgacionPosts
      .filter(p => p.slug !== slug)
      .slice(0, 2);
  }, [slug]);

  // Si no existe el post, redirigir a 404
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Función para compartir en LinkedIn
  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "width=600,height=600"
    );
  };

  // Función para compartir en WhatsApp
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${post.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Función para copiar enlace
  const copyLink = async () => {
    const url = window.location.href;
    try {
      // Intento estándar (HTTPS, Safari moderno)
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback para navegadores con soporte limitado (Safari antiguo)
        const textarea = document.createElement('textarea');
        textarea.value = url;
        // Evitar scroll en iOS
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textarea);
        }
      }
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    }
  };

  // Metadatos SEO / Open Graph / Twitter
  const baseUrl = "https://fyt-research.org";
  const canonicalUrl = `${baseUrl}/divulgacion/${post.slug}`;
  const ogImage = `${baseUrl}${post.authorImage || "/images/logo-fyt-medium.webp"}`;
  
  // Meta descripción optimizada (máx 160 caracteres para SEO)
  const metaDescription = "Análisis sobre la necesidad de actualizar los códigos CUPS en Colombia para reconocer el rol clínico del Químico Farmacéutico, garantizar la seguridad del paciente y optimizar recursos.";
  
  const metaKeywords = post.tags ? [...post.tags, "Divulgación", "Grupo FyT", "Farmacología y Terapéutica"] : ["Divulgación", "Grupo FyT", "Farmacología y Terapéutica"];

  return (
    <div className="w-full bg-background">
      <Seo
        title={`${post.title} | Divulgación FyT`}
        description={metaDescription}
        keywords={metaKeywords}
        author={post.author}
        canonical={canonicalUrl}
        openGraph={{
          title: post.title,
          description: metaDescription,
          type: "article",
          image: ogImage,
          url: canonicalUrl,
          locale: "es_ES",
          siteName: "Grupo FyT - Farmacología y Terapéutica",
          imageAlt: `Foto del autor ${post.author}`,
          imageWidth: "1200",
          imageHeight: "630",
        }}
        twitter={{
          card: "summary_large_image",
          image: ogImage,
        }}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: metaDescription,
          author: {
            "@type": "Person",
            name: post.author,
          },
          datePublished: post.date,
          image: ogImage,
          url: canonicalUrl,
          genre: post.category || "Divulgación",
          keywords: (post.tags || []).join(", "),
        }}
      >
        {/* Etiquetas adicionales específicas de artículos */}
        <meta property="article:published_time" content={post.date} />
        {post.author && <meta property="article:author" content={post.author} />}
        {post.category && <meta property="article:section" content={post.category} />}        
        {(post.tags || []).map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Seo>

      {/* Botón de regreso */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <Button variant="ghost" asChild className="gap-2 text-sm sm:text-base">
            <Link to="/divulgacion" className="flex items-center">
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span>Volver a Divulgación</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Artículo principal con estructura semántica */}
      <article className="bg-white">
        {/* Header del artículo */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
          {/* Breadcrumbs y categoría */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
              <ol className="flex flex-wrap items-center gap-1 sm:gap-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                    Inicio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link to="/divulgacion" className="text-gray-600 hover:text-primary transition-colors">
                    Divulgación
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">{post.category}</li>
              </ol>
            </nav>

            {/* Category Badge */}
            {post.category && (
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full border border-primary/30 whitespace-nowrap">
                {post.category}
              </span>
            )}
          </div>

          {/* Título H1 optimizado para SEO */}
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight mb-8 break-words">
            {post.title}
          </h1>

          {/* Metadatos en fila horizontal (Flexbox) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-8 border-t border-gray-200">
            {/* Avatar y nombre del autor */}
            <div className="flex items-center gap-3">
              {post.authorImage && (
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="author-avatar"
                />
              )}
              <div className="flex flex-col">
                <p className="font-medium text-gray-900 text-sm sm:text-base break-words">
                  {post.author}
                </p>
                {post.authorRole && (
                  <p className="text-xs sm:text-sm text-gray-600 break-words line-clamp-1">
                    {post.authorRole}
                  </p>
                )}
              </div>
            </div>

            {/* Fecha y tiempo de lectura */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                ⏱ {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Contenido del artículo */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Contenido en formato Markdown/HTML */}
        <div 
          className="prose prose-gray max-w-none
            prose-headings:font-poppins prose-headings:font-bold prose-headings:text-gray-900 prose-headings:leading-tight prose-headings:break-words
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-200
            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-gray-800
            prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-5 prose-h4:text-gray-800
            prose-h5:text-base sm:prose-h5:text-lg prose-h5:mt-8 prose-h5:mb-4 prose-h5:text-gray-800
            prose-h6:text-sm sm:prose-h6:text-base prose-h6:mt-6 prose-h6:mb-3 prose-h6:font-bold prose-h6:text-gray-800
            prose-p:font-inter prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-8 prose-p:text-sm sm:prose-p:text-base prose-p:break-words prose-p:text-justify
            prose-p:first-of-type:text-base sm:prose-p:first-of-type:text-lg prose-p:first-of-type:leading-relaxed prose-p:first-of-type:text-gray-800 prose-p:first-of-type:font-medium
            prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-colors prose-a:break-words
            prose-strong:text-gray-900 prose-strong:font-bold prose-strong:break-words
            prose-em:text-gray-800 prose-em:italic prose-em:break-words
            prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2.5 prose-code:py-1.5 prose-code:rounded prose-code:font-mono prose-code:text-xs sm:prose-code:text-sm prose-code:break-words
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 sm:prose-pre:p-6 prose-pre:rounded-lg prose-pre:mb-8 prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm prose-pre:leading-relaxed
            prose-pre:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 sm:prose-blockquote:py-6 prose-blockquote:px-4 sm:prose-blockquote:px-8 prose-blockquote:mb-8 prose-blockquote:text-gray-800 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
            prose-blockquote:break-words
            prose-ol:font-inter prose-ol:mb-8 prose-ol:space-y-4 prose-ol:ml-2 prose-ol:list-decimal
            prose-ul:font-inter prose-ul:mb-8 prose-ul:space-y-4 prose-ul:ml-2 prose-ul:list-disc
            prose-li:text-gray-700 prose-li:leading-7 prose-li:text-sm sm:prose-li:text-base prose-li:break-words prose-li:text-justify
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-10 prose-img:w-full prose-img:border prose-img:border-gray-200 prose-img:max-w-full
            prose-hr:border-gray-200 prose-hr:my-12 prose-hr:opacity-60
            prose-table:my-8 prose-table:border-collapse prose-table:w-full prose-table:overflow-x-auto prose-table:block sm:prose-table:table
            prose-thead:bg-gray-100
            prose-th:border prose-th:border-gray-200 prose-th:px-3 sm:prose-th:px-4 prose-th:py-2 sm:prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-900 prose-th:text-xs sm:prose-th:text-sm
            prose-td:border prose-td:border-gray-200 prose-td:px-3 sm:prose-td:px-4 prose-td:py-2 sm:prose-td:py-3 prose-td:text-gray-700 prose-td:text-xs sm:prose-td:text-sm prose-td:break-words
            
            [&_.lead]:text-base [&_.lead]:sm:text-lg [&_.lead]:font-medium [&_.lead]:text-gray-800 [&_.lead]:leading-relaxed [&_.lead]:first-letter:font-bold
            [&_.highlight-quote]:italic [&_.highlight-quote]:text-[1.25rem] [&_.highlight-quote]:text-[#1a2637] [&_.highlight-quote]:font-medium [&_.highlight-quote]:leading-relaxed
            [&_.references-section]:mt-12 [&_.references-section]:pt-12 [&_.references-section]:border-t [&_.references-section]:border-gray-200
            [&_.references-section_h3]:text-lg [&_.references-section_h3]:sm:text-xl [&_.references-section_h3]:font-bold [&_.references-section_h3]:text-gray-900 [&_.references-section_h3]:mb-6
            [&_.references-section_ol]:space-y-3 [&_.references-section_ol]:list-decimal [&_.references-section_ol]:ml-6
            [&_.references-section_li]:text-gray-700 [&_.references-section_li]:text-sm [&_.references-section_li]:sm:text-base [&_.references-section_li]:leading-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags (si existen) */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-14 pt-10 border-t-2 border-gray-200">
            <h3 className="font-poppins font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-5 break-words">
              Palabras clave
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-colors duration-200 break-words"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer del artículo */}
      <footer className="border-t-2 border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14">
          {/* Información del autor extendida */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {post.authorImage && (
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="author-avatar-large"
                />
              )}
              <div className="flex-grow">
                <h3 className="font-poppins font-bold text-lg text-gray-900 mb-1">
                  {post.author}
                </h3>
                {post.authorRole && (
                  <p className="text-gray-600 text-sm sm:text-base mb-3">
                    {post.authorRole}
                  </p>
                )}
                <p className="text-gray-700 text-sm leading-relaxed">
                  Miembro activo del Grupo de Investigación en Farmacología y Terapéutica (FyT), 
                  dedicado a la generación de conocimiento científico y la divulgación académica 
                  en temas de salud y farmacoterapia en Colombia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </article>

      {/* Compartir artículo */}
      <section className="border-t-2 border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14">
          <div className="flex flex-col items-start gap-6">
            <div>
              <h3 className="font-poppins font-bold text-lg sm:text-xl text-gray-900 mb-2 flex items-center gap-2 flex-wrap">
                <Share2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="break-words">Compartir este artículo</span>
              </h3>
              <p className="text-gray-600 text-sm break-words">
                Ayúdanos a difundir este análisis académico en tu red
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={shareOnLinkedIn}
                className="gap-2 text-[#0A66C2] bg-white border-2 border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors w-full sm:w-auto justify-center"
                variant="outline"
                size="lg"
              >
                <Linkedin className="w-5 h-5 flex-shrink-0" />
                <span>LinkedIn</span>
              </Button>
              <Button
                onClick={shareOnWhatsApp}
                className="gap-2 text-[#25D366] bg-white border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors w-full sm:w-auto justify-center"
                variant="outline"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp</span>
              </Button>
              <Button
                onClick={copyLink}
                className="gap-2 text-gray-700 bg-white border-2 border-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-colors w-full sm:w-auto justify-center"
                variant="outline"
                size="lg"
              >
                <Copy className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Copiar enlace</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA institucional */}
      <section className="border-t-2 border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 break-words px-2">
            ¿Interesado en colaborar?
          </h2>
          <p className="font-inter text-sm sm:text-base lg:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed break-words px-2">
            Si este tema te interesa o deseas proponer una colaboración académica con nuestro grupo de investigación, 
            estaremos encantados de establecer un diálogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-2">
            <Button 
              asChild 
              className="text-sm sm:text-base px-6 sm:px-8 font-medium w-full sm:w-auto bg-transparent border-2 border-gray-400 text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
              variant="outline"
              size="lg"
            >
              <Link to="/contactos" className="whitespace-nowrap">
                Ponerse en contacto
              </Link>
            </Button>
            <Button 
              asChild 
              className="text-sm sm:text-base px-6 sm:px-8 font-medium w-full sm:w-auto bg-transparent border-2 border-gray-400 text-gray-900 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200"
              variant="outline"
              size="lg"
            >
              <Link to="/investigacion" className="whitespace-nowrap">
                Ver más investigación
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="border-t-2 border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="break-words">Más artículos de divulgación</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-10 max-w-2xl break-words">
              Continúa explorando nuestras publicaciones científicas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {relatedPosts.map(relatedPost => (
                <DivulgacionCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-2 font-medium text-sm sm:text-base w-full sm:w-auto">
                <Link to="/divulgacion" className="flex items-center justify-center gap-2">
                  <span>Ver todos los artículos</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DivulgacionPostPage;
