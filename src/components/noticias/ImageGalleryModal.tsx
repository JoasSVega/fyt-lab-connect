import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryModalProps {
  images: Array<{
    webp: string;
    png?: string;
    alt: string;
  }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal de galería de imágenes con navegación circular
 * Animación similar a CalculatorModal (scale + opacity)
 * Soporta navegación con flechas, teclado y swipe/drag
 */
const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  // Actualizar índice cuando cambie initialIndex
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Navegación circular
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handlers de swipe/touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    isDragging.current = false;
    
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50; // mínimo de píxeles para detectar swipe
    
    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        // Swipe a la izquierda = siguiente imagen
        goToNext();
      } else {
        // Swipe a la derecha = imagen anterior
        goToPrev();
      }
    }
  };

  // Handlers de teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  // Prevenir scroll del body cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentImage = images[currentIndex];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 }
  };

  const content = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="noticia-gallery__backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="noticia-gallery__modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              className="noticia-gallery__close"
              onClick={onClose}
              aria-label="Cerrar galería"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image container */}
            <div className="noticia-gallery__image-container">
              <picture>
                <source
                  srcSet={currentImage.webp}
                  type="image/webp"
                />
                {currentImage.png && (
                  <source
                    srcSet={currentImage.png}
                    type="image/png"
                  />
                )}
                <img
                  src={currentImage.webp}
                  alt={currentImage.alt}
                  className="noticia-gallery__image"
                  draggable={false}
                />
              </picture>
            </div>

            {/* Navigation - Hidden on mobile, use swipe instead */}
            <button
              className="noticia-gallery__nav-btn noticia-gallery__nav-prev"
              onClick={goToPrev}
              aria-label="Imagen anterior"
              type="button"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="noticia-gallery__nav-btn noticia-gallery__nav-next"
              onClick={goToNext}
              aria-label="Imagen siguiente"
              type="button"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="noticia-gallery__counter">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Swipe hint for mobile */}
            <div className="noticia-gallery__swipe-hint">
              Desliza para cambiar imagen
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

export default ImageGalleryModal;

