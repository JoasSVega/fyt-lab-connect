import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  slideDistance?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  slideDistance = 12,
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: slideDistance }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: slideDistance }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
