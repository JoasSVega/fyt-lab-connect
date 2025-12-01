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

  // Timing exacto según especificación:
  // Fase 1: Inicio (0s)
  // Fase 2: Fade-in (0.4s) → 0s-0.4s
  // Fase 3: Pulse (0.2s) → 0.4s-0.6s
  // Fase 4: Glow (0.25s) → 0.6s-0.85s
  // Fase 5: Pausa (0.2s) → 0.85s-1.05s
  // Fase 6: Fade-out (0.4s) → 1.05s-1.45s
  // Total: 1.45s

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#FFFFFF" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 1.05, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {/* Glow sutil detrás del logo - aparece en fase 4 */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 0.25, delay: 0.6, ease: "easeOut" }}
        style={{
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          filter: "blur(35px)",
          borderRadius: "50%",
        }}
      />

      {/* Logo con animación secuencial exacta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: [0, 1, 1, 1, 1, 0],
          scale: [0.95, 1, 1, 1.03, 1, 1],
          filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(6px)"],
        }}
        transition={{
          duration: 1.45,
          times: [0, 0.28, 0.41, 0.48, 0.72, 1],
          ease: [0.25, 0.1, 0.25, 1],
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
            fetchpriority="high"
            className="w-64 h-auto"
            style={{ maxWidth: "256px" }}
          />
        </picture>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
