import React from "react";
import { motion } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  // Preload logo variants to ensure they're cached before showing
  useImagePreloader([
    '/images/logo-fyt-small.webp',
    '/images/logo-fyt-medium.webp',
    '/images/logo-fyt-large.webp',
  ], { priority: 'critical', timeout: 5000 });

  // Timing optimizado (más rápido, sin demora al final):
  // Fase 1: Fade-in (0.3s) → 0s-0.3s
  // Fase 2: Hold (0.4s) → 0.3s-0.7s
  // Fase 3: Fade-out (0.2s) → 0.7s-0.9s
  // Total: 0.9s (OPTIMIZADO - sin demora extra)

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    imgRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#FFFFFF" }}
      initial={{ opacity: 1 }}
      animate={{
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        duration: 0.9,
        times: [0, 0.33, 0.78, 1],
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {/* Glow sutil detrás del logo - aparece sutilmente */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, #667eea 0%, transparent 70%)",
          filter: "blur(35px)",
          borderRadius: "50%",
        }}
      />

      {/* Logo con animación optimizada (entrada suave, sin salida demora) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.95, 1, 1, 1],
        }}
        transition={{
          duration: 0.9,
          times: [0, 0.33, 0.78, 1],
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <picture>
          <source
            srcSet="/images/logo-fyt-large.webp"
            media="(min-width: 1280px)"
          />
          <source
            srcSet="/images/logo-fyt-medium.webp"
            media="(min-width: 640px)"
          />
          <img
            src="/images/logo-fyt-small.webp"
            alt="Logo Grupo FyT"
            loading="eager"
            decoding="async"
            ref={imgRef}
            className="w-64 h-auto"
            width={256}
            height={256}
            style={{ maxWidth: "256px" }}
          />
        </picture>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
