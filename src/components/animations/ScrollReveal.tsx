import React from 'react';
import { useReveal } from '@/hooks/useReveal';

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
  const { ref } = useReveal({ threshold: 0.12, rootMargin: '0px 0px -50px 0px', triggerOnce: true });
  const style: React.CSSProperties = {
    // Allow per-instance tuning while keeping CSS-driven transitions
    ['--reveal-distance' as any]: `${slideDistance}px`,
    ['--reveal-duration' as any]: `${duration}s`,
    ['--reveal-extra-delay' as any]: `${Math.max(0, delay * 1000)}ms`,
  };
  return (
    <div ref={ref as any} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
};
