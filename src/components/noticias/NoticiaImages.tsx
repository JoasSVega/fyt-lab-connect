import React, { useState } from "react";
import ImageGalleryModal from "./ImageGalleryModal";

interface NoticiaImagesProps {
  slug: string;
  images?: Array<{
    webp: string;
    png?: string;
    alt: string;
  }>;
}

/**
 * Componente para mostrar imágenes en galería horizontal
 * Click abre modal fullscreen con navegación circular
 * Layout responsivo: 3 columnas en desktop, 1 en mobile
 */
const NoticiaImages: React.FC<NoticiaImagesProps> = ({ slug, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full bg-gray-50 noticia-page__images-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="noticia-page__images-gallery">
            {images.map((image, index) => (
              <figure
                key={index}
                className="noticia-page__image-item"
                role="button"
                tabIndex={0}
                onClick={() => handleImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleImageClick(index);
                  }
                }}
              >
                <picture>
                  <source
                    srcSet={image.webp}
                    type="image/webp"
                  />
                  {image.png && (
                    <source
                      srcSet={image.png}
                      type="image/png"
                    />
                  )}
                  <img
                    src={image.webp}
                    alt={image.alt}
                    className="noticia-page__image"
                    loading="lazy"
                  />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de galería */}
      <ImageGalleryModal
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NoticiaImages;

