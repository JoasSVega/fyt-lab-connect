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

  // Si no existe el post, redirigir a 404
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Obtener posts relacionados (otros 2 posts)
  const relatedPosts = useMemo(() => {
    return divulgacionPosts
      .filter(p => p.slug !== slug)
      .slice(0, 2);
  }, [slug]);

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
      <article className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* Contenido en formato Markdown/HTML */}
        <div 
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-poppins prose-headings:font-bold prose-headings:text-gray-900
            prose-p:font-inter prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ol:font-inter prose-ul:font-inter
            prose-li:text-gray-700 prose-li:leading-relaxed
            prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1
            prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags (si existen) */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-poppins font-semibold text-sm text-gray-500 uppercase tracking-wide mb-4">
              Temas relacionados
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Compartir artículo */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Compartir artículo
              </h3>
              <p className="text-gray-600 text-sm">
                Ayúdanos a difundir conocimiento científico
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={shareOnLinkedIn}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
              <Button
                onClick={shareOnWhatsApp}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
              <Button
                onClick={copyLink}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Copy className="w-5 h-5" />
                Copiar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA institucional */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
          <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-4">
            ¿Te interesó este tema?
          </h2>
          <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Si deseas conocer más sobre nuestra investigación o proponer una colaboración, 
            estamos abiertos al diálogo académico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/contactos">Proponer colaboración</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/investigacion">Ver investigación</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <h2 className="font-poppins font-bold text-3xl text-gray-900 mb-8 flex items-center gap-2">
              Más artículos
              <ArrowRight className="w-6 h-6 text-primary" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(relatedPost => (
                <DivulgacionCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/divulgacion">Ver todos los artículos</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DivulgacionPostPage;
