import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface ButtonRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ButtonReveal({ children, delay = 0, className = "" }: ButtonRevealProps) {
  return (
    <motion.button
      className={className}
      variants={buttonReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      style={{ position: "relative", overflow: "hidden" }}
      whileHover={{ scale: 1.06, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
