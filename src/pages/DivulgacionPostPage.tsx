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
    try {
      await navigator.clipboard.writeText(window.location.href);
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

  return (
    <div className="w-full bg-background">
      <Seo
        title={`${post.title} | Divulgación FyT`}
        description={post.excerpt}
        canonical={`https://fyt-research.org/divulgacion/${post.slug}`}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          type: "article"
        }}
      />

      {/* Botón de regreso */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/divulgacion">
              <ArrowLeft className="w-4 h-4" />
              Volver a Divulgación
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero del artículo */}
      <DivulgacionHero
        title={post.title}
        subtitle={post.excerpt}
        author={post.author}
        authorRole={post.authorRole}
        authorImage={post.authorImage}
        date={post.date}
        readTime={post.readTime}
        category={post.category}
      />

      {/* Contenido del artículo */}
      <article className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Contenido en formato Markdown/HTML */}
        <div 
          className="prose prose-gray max-w-none
            prose-headings:font-poppins prose-headings:font-bold prose-headings:text-gray-900 prose-headings:leading-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-200
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-gray-800
            prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-5 prose-h4:text-gray-800
            prose-h5:text-lg prose-h5:mt-8 prose-h5:mb-4 prose-h5:text-gray-800
            prose-h6:text-base prose-h6:mt-6 prose-h6:mb-3 prose-h6:font-semibold prose-h6:text-gray-800
            prose-p:font-inter prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-7 prose-p:text-base
            prose-p:first-of-type:text-lg prose-p:first-of-type:leading-relaxed prose-p:first-of-type:text-gray-800 prose-p:first-of-type:font-medium
            prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-colors prose-a:break-words
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-em:text-gray-800 prose-em:italic
            prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2.5 prose-code:py-1.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:mb-8 prose-pre:overflow-x-auto prose-pre:text-sm prose-pre:leading-relaxed
            prose-pre:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:mb-8 prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic prose-blockquote:font-semibold
            prose-ol:font-inter prose-ol:mb-8 prose-ol:space-y-3 prose-ol:ml-2 prose-ol:list-decimal
            prose-ul:font-inter prose-ul:mb-8 prose-ul:space-y-3 prose-ul:ml-2 prose-ul:list-disc
            prose-li:text-gray-700 prose-li:leading-7 prose-li:text-base
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-10 prose-img:w-full prose-img:border prose-img:border-gray-200
            prose-hr:border-gray-200 prose-hr:my-12 prose-hr:opacity-60
            prose-table:my-8 prose-table:border-collapse prose-table:w-full
            prose-thead:bg-gray-100
            prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
            prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags (si existen) */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-14 pt-10 border-t-2 border-gray-200">
            <h3 className="font-poppins font-bold text-sm uppercase tracking-wider text-gray-600 mb-5">
              Palabras clave
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Compartir artículo */}
      <section className="border-t-2 border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
          <div className="flex flex-col items-start gap-6">
            <div>
              <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Compartir este artículo
              </h3>
              <p className="text-gray-600 text-sm">
                Ayúdanos a difundir este análisis académico en tu red
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={shareOnLinkedIn}
                className="gap-2 text-[#0A66C2] bg-white border-2 border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
                variant="outline"
                size="lg"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
              <Button
                onClick={shareOnWhatsApp}
                className="gap-2 text-[#25D366] bg-white border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                variant="outline"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
              <Button
                onClick={copyLink}
                className="gap-2 text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                variant="outline"
                size="lg"
              >
                <Copy className="w-5 h-5" />
                Copiar enlace
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA institucional */}
      <section className="border-t-2 border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            ¿Interesado en colaborar?
          </h2>
          <p className="font-inter text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Si este tema te interesa o deseas proponer una colaboración académica con nuestro grupo de investigación, 
            estaremos encantados de establecer un diálogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8 font-medium">
              <Link to="/contactos">Ponerse en contacto</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 font-medium border-2">
              <Link to="/investigacion">Ver más investigación</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="border-t-2 border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-3 flex items-center gap-3">
              <span>Más artículos de divulgación</span>
              <ArrowRight className="w-6 h-6 text-primary" />
            </h2>
            <p className="text-gray-600 text-base mb-10 max-w-2xl">
              Continúa explorando nuestras publicaciones científicas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {relatedPosts.map(relatedPost => (
                <DivulgacionCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-2 font-medium">
                <Link to="/divulgacion" className="flex items-center gap-2">
                  Ver todos los artículos
                  <ArrowRight className="w-4 h-4" />
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
