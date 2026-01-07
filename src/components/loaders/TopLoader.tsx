import { useEffect, useState } from 'react';

interface TopLoaderProps {
  isLoading: boolean;
  color?: string;
}

/**
 * TopLoader - Barra de progreso superior animada
 * Se muestra en la parte superior cuando hay cambios de ruta
 * Simula progreso con transiciones suaves
 */
export const TopLoader = ({ isLoading, color = '#8b5cf6' }: TopLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Completar al 100% cuando termine de cargar
      setProgress(100);
      // Fade out después de 300ms
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(hideTimer);
    }

    // Mostrar la barra
    setIsVisible(true);
    setProgress(10);

    // Incremento simulado de progreso
    const intervals = [
      setTimeout(() => setProgress(25), 200),
      setTimeout(() => setProgress(45), 500),
      setTimeout(() => setProgress(65), 1000),
      setTimeout(() => setProgress(85), 2000),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [isLoading]);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 z-50 transition-all duration-300"
      style={{
        width: `${progress}%`,
        backgroundColor: color,
        opacity: isVisible ? 1 : 0,
        boxShadow: `0 0 15px ${color}`,
      }}
    />
  );
};

export default TopLoader;
