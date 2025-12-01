import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#0A0A0A" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Glow background */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 0.25, delay: 0.4 }}
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
          filter: "blur(35px)",
          borderRadius: "50%",
        }}
      />

      {/* Logo animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [1, 1, 1.03, 1, 1],
          filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.33, 0.5, 0.67, 1],
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <picture>
          <source
            type="image/avif"
            srcSet="/logo-fyt-128.avif 128w, /logo-fyt-256.avif 256w, /logo-fyt-400.avif 400w"
            sizes="256px"
          />
          <img
            src="/logo-fyt-256.avif"
            alt="Logo Grupo FyT"
            loading="eager"
            decoding="async"
            className="w-64 h-auto"
            style={{ maxWidth: "256px" }}
          />
        </picture>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
