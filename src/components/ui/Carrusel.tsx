import React from "react";
import type { CarouselApi } from "./carousel";
import { Card } from "./card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

export interface CarruselItem {
  image: string;
  title: string;
  description?: string;
}

interface CarruselProps {
  items: CarruselItem[];
  color?: string; // color para el borde/título
  /**
   * Altura visual de la imagen del carrusel.
   * Usa unidades relativas cuando sea posible. Acepta valores CSS (por ejemplo, "clamp(14rem,28vw,18rem)"),
   * o un número (px) para compatibilidad retro.
   */
  height?: string | number;
  /**
   * Relación de aspecto de la imagen cuando no se proporcione `height`.
   * Ejemplos válidos: '16 / 9', '4 / 3', '3 / 2'.
   */
  imageAspect?: string;
  showDescription?: boolean;
  className?: string;
  imageClassName?: string; // clase personalizada para la imagen
}

const Carrusel: React.FC<CarruselProps> = ({
  items,
  color = "#9B59B6",
  height = "",
  imageAspect = "4 / 3",
  showDescription = true,
  className,
  imageClassName,
}) => {
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Recalculate layout when number of items changes to ensure Embla snap list is correct
  React.useEffect(() => {
    if (!emblaApi) return;
    try {
      emblaApi.reInit();
    } catch (e) {
      // ignore
    }
  }, [emblaApi, items.length]);

  // Autoplay: advance every 4s, pause on hover, tab hidden, or reduced motion preference
  React.useEffect(() => {
    if (!emblaApi) return;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const tick = () => {
      if (isHovered) return;
      if (typeof document !== 'undefined' && document.hidden) return;
      try {
        // Avoid calling when only one slide or cannot scroll
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        }
      } catch {
        // noop
      }
    };
    const interval = setInterval(tick, 4000);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  const heightCss = height ? (typeof height === "number" ? `${height}px` : height) : "";
  const defaultImageClass = imageClassName ? imageClassName : `w-full h-full object-cover`;

  React.useEffect(() => {
    if (!emblaApi) return;
    let timeout: number | null = null;
    const handleResize = () => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        try {
          emblaApi.reInit();
        } catch (e) {
          // ignore
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [emblaApi]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className || "w-full px-2 sm:px-3"}
    >
  <Carousel
        opts={{ align: "center", loop: true, containScroll: 'keepSnaps', slidesToScroll: 1 }}
        setApi={setEmblaApi}
        className={"w-full"}
      >
      <CarouselContent className="gap-x-4">
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className="px-2 md:px-4 basis-[85%] sm:basis-[70%] md:basis-[48%] lg:basis-[31%] xl:basis-[24%] 2xl:basis-[19%] min-w-[280px] md:min-w-[320px] max-w-[520px]"
          >
            <Card
              style={{ borderColor: color }}
              className={`bg-white/90 border-2 shadow-xl md:hover:shadow-2xl md:hover:scale-[1.03] transition-all duration-300 overflow-hidden group h-full will-change-transform`}
            >
              <div
                className="relative"
                style={heightCss ? ({ height: heightCss } as React.CSSProperties) : ({ aspectRatio: imageAspect } as React.CSSProperties)}
              >
                {/* Responsive <picture> with AVIF/WebP sources and fallback to original */}
                {(() => {
                  const base = item.image.replace(/\.(png|jpe?g|webp)$/i, '');
                  // Usar únicamente tamaños garantizados en /public/images/Carrusel (evita 404 -> imagen en blanco en móviles)
                  const avifSet = `${base}-128.avif 128w, ${base}-256.avif 256w, ${base}-400.avif 400w, ${base}-800.avif 800w`;
                  const webpSet = `${base}-128.webp 128w, ${base}-256.webp 256w, ${base}-400.webp 400w, ${base}-800.webp 800w`;
                  const sizes = "(max-width: 639px) 92vw, (max-width: 1023px) 85vw, (max-width: 1279px) 50vw, 33vw";
                  // Evitar fallos de lazy-loading en móviles/iOS dentro de contenedores con overflow/transform
                  // Cargamos con prioridad 'eager' las primeras diapositivas visibles para asegurar render.
                  const loadingMode: 'eager' | 'lazy' = index < 3 ? 'eager' : 'lazy';
                  return (
                    <picture>
                      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
                      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
                      <img
                        src={item.image}
                        alt={item.title}
                        loading={loadingMode}
                        decoding="async"
                        className={defaultImageClass}
                        style={heightCss ? ({ height: '100%', maxHeight: heightCss, minHeight: heightCss } as React.CSSProperties) : ({ height: '100%' } as React.CSSProperties)}
                      />
                    </picture>
                  );
                })()}
              </div>
              <div className="p-6">
                <h4
                  className="text-[clamp(1rem,1.4vw,1.125rem)] md:text-[clamp(1.05rem,1.2vw,1.25rem)] font-raleway font-semibold mb-3 leading-snug break-normal whitespace-normal"
                  style={{ color, hyphens: 'none', overflowWrap: 'normal', wordBreak: 'normal' }}
                >
                  {item.title}
                </h4>
                {showDescription && item.description && (
                  <p
                    className="text-[clamp(0.92rem,1.2vw,1rem)] font-inter text-gray-700 leading-relaxed text-left break-normal whitespace-normal"
                    style={{ hyphens: 'none', overflowWrap: 'normal', wordBreak: 'normal' }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-10 lg:-left-12" />
      <CarouselNext className="hidden md:flex -right-10 lg:-right-12" />
    </Carousel>

    {/* Pagination dots */}
    <div className="flex items-center justify-center mt-4 space-x-2">
      {items.map((_, i) => (
        <button
          key={i}
          onClick={() => emblaApi && emblaApi.scrollTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={selected === i}
          className={`h-2 w-6 md:w-8 rounded-full transition-all ${selected === i ? 'scale-110' : 'bg-gray-300'}`}
          style={{ backgroundColor: selected === i ? color : undefined }}
        />
      ))}
    </div>
    </div>
  );
};

export default Carrusel;
