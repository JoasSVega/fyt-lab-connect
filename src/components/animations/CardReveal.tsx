import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface CardRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function CardReveal({ children, delay = 0, className = "" }: CardRevealProps) {
  return (
    <motion.div
      className={className}
      variants={cardReveal}
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
