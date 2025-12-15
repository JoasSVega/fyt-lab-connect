import React from "react";
import type { CarouselApi } from "./carousel";
import { Card } from "./card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { useImagePreloader } from "@/hooks/useImagePreloader";

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
  const bufferedIndices = React.useRef<Set<number>>(new Set([0, 1, 2]));
  
  // Preload initial carousel images before rendering to prevent flickering
  // Only preload first 3 slides initially for faster initial render
  const imagesToPreload = items.slice(0, 3).map(item => {
    const base = (item.image || '').replace(/-medium\.webp$/i, '');
    return `${base}-medium.webp`;
  });
  const { loaded: imagesLoaded } = useImagePreloader(imagesToPreload, { priority: 'high', timeout: 8000 });
  
  // Buffer adjacent slides when carousel position changes
  React.useEffect(() => {
    if (!emblaApi || !imagesLoaded) return;
    
    const bufferAdjacentSlides = () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      const totalSlides = items.length;
      
      // Calculate indices to buffer (current, next 2, prev 2)
      const indicesToBuffer = new Set<number>();
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + totalSlides) % totalSlides;
        indicesToBuffer.add(index);
      }
      
      // Preload images that haven't been buffered yet
      indicesToBuffer.forEach(index => {
        if (!bufferedIndices.current.has(index)) {
          bufferedIndices.current.add(index);
          const item = items[index];
          if (item) {
            const base = item.image.replace(/-medium\.webp$/i, '');
            // Preload all 3 sizes for buffered slides
            ['-small.webp', '-medium.webp', '-large.webp'].forEach(suffix => {
              const img = new Image();
              img.src = `${base}${suffix}`;
            });
          }
        }
      });
    };
    
    bufferAdjacentSlides(); // Initial buffer
    emblaApi.on('select', bufferAdjacentSlides);
    
    return () => {
      emblaApi.off('select', bufferAdjacentSlides);
    };
  }, [emblaApi, items, imagesLoaded]);

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

  // Show loading skeleton while images preload
  if (!imagesLoaded) {
    return (
      <div className={className || "w-full px-2 sm:px-3"}>
        <div className="w-full flex items-center justify-center" style={{ minHeight: heightCss || '18rem' }}>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              className={`bg-white/90 border-2 shadow-soft md:hover:shadow-medium md:hover:scale-[1.02] transition-all duration-300 overflow-hidden group h-full will-change-transform`}
            >
              <div
                className="relative"
                style={heightCss ? ({ height: heightCss } as React.CSSProperties) : ({ aspectRatio: imageAspect } as React.CSSProperties)}
              >
                {/* Responsive image with srcset for optimized loading */}
                {(() => {
                  const base = item.image.replace(/-medium\.webp$/i, '');
                  // Cargar con prioridad las primeras 3 diapositivas para asegurar render inmediato
                  const loadingMode: 'eager' | 'lazy' = index < 3 ? 'eager' : 'lazy';
                  
                  return (
                    <img
                      src={`${base}-medium.webp`}
                      srcSet={`${base}-small.webp 480w, ${base}-medium.webp 800w, ${base}-large.webp 1200w`}
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 48vw, (max-width: 1280px) 31vw, (max-width: 1536px) 24vw, 19vw"
                      alt={item.title}
                      loading={loadingMode}
                      decoding="async"
                      className={defaultImageClass}
                      style={heightCss ? ({ height: '100%', maxHeight: heightCss, minHeight: heightCss } as React.CSSProperties) : ({ height: '100%' } as React.CSSProperties)}
                      width={1200}
                      height={900}
                    />
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
