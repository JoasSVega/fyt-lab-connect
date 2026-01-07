import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ImageReveal({ children, delay = 0, className = "" }: ImageRevealProps) {
  return (
    <motion.div
      className={className}
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
