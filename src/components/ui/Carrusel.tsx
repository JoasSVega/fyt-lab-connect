import React from "react";
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
  height?: number; // altura en px
  showDescription?: boolean;
  className?: string;
  imageClassName?: string; // clase personalizada para la imagen
}

const Carrusel: React.FC<CarruselProps> = ({ items, color = "#9B59B6", height = 192, showDescription = true, className, imageClassName }) => {
  return (
    <Carousel opts={{ align: "start", loop: true }} className={className || "w-full"}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
            <Card className={`bg-white/90 border-2 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden group h-full border-[${color}]`}>
              <div className="relative" style={{ height }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={imageClassName ? imageClassName : "w-full h-full object-contain bg-white"}
                  style={{ maxHeight: height, minHeight: height }}
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-raleway font-semibold mb-3" style={{ color }}>{item.title}</h4>
                {showDescription && item.description && (
                  <p className="text-sm font-inter text-gray-700 leading-relaxed text-justify">{item.description}</p>
                )}
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12" />
      <CarouselNext className="hidden md:flex -right-12" />
    </Carousel>
  );
};

export default Carrusel;
