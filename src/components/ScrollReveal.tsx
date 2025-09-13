import { motion, MotionProps } from "framer-motion";
import React, { ReactNode } from "react";

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  ...motionProps
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.18 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
