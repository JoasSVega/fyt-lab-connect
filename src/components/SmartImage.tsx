import React from "react";

/**
 * SmartImage - Componente optimizado para imágenes responsivas
 * 
 * Automatiza la generación de srcSet y sizes para garantizar que:
 * - Los dispositivos móviles descarguen versiones ligeras (-small.webp)
 * - Los escritorios usen versiones de alta calidad (-large.webp)
 * - Nunca más escribir manualmente srcSet
 * 
 * @example
 * ```tsx
 * <SmartImage 
 *   basePath="/images/evento-importante"
 *   alt="Descripción del evento"
 *   usage="card"
 *   loading="lazy"
 * />
 * ```
 */

type ImageUsage = 'hero' | 'card' | 'avatar' | 'team' | 'thumbnail';

export interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  /** 
   * Ruta base de la imagen (sin sufijos -small/-medium/-large.webp)
   * Ejemplo: "/images/Carrusel/Farmacologia"
   */
  basePath: string;
  
  /** 
   * Tipo de uso para determinar el atributo sizes automáticamente
   * - 'hero': Imagen a pantalla completa (100vw en todas las resoluciones)
   * - 'card': Tarjetas en carrusel/grid (90vw móvil, 45vw tablet, 300px escritorio)
   * - 'avatar': Logos pequeños o fotos de perfil (100px fijo)
   * - 'team': Fotos de equipo (180px móvil, 220px escritorio)
   * - 'thumbnail': Miniaturas pequeñas (150px móvil, 200px escritorio)
   */
  usage: ImageUsage;
  
  /**
   * Atributo alt requerido para accesibilidad
   */
  alt: string;
  
  /**
   * Versión por defecto a usar como fallback
   * - 'small': Ideal para móviles (default)
   * - 'medium': Balance entre calidad y tamaño
   * - 'large': Máxima calidad (solo usar para héroes críticos)
   */
  fallbackSize?: 'small' | 'medium' | 'large';
  
  /**
   * Ancho en píxeles de la imagen (para aspect ratio)
   */
  width?: number;
  
  /**
   * Alto en píxeles de la imagen (para aspect ratio)
   */
  height?: number;
  
  /**
   * Prioridad de carga ('eager' para LCP, 'lazy' para el resto)
   */
  loading?: 'eager' | 'lazy';
  
  /**
   * Decoding strategy
   */
  decoding?: 'async' | 'sync' | 'auto';
  
  /**
   * fetchPriority para control fino de priorización
   */
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Configuración de sizes predefinidos por tipo de uso
 */
const USAGE_SIZES: Record<ImageUsage, string> = {
  // Hero: Ocupa toda la pantalla en todos los dispositivos
  hero: '100vw',
  
  // Card: Para carruseles y grids responsivos
  // Móvil: 90% del ancho de pantalla
  // Tablet: 45% (2 columnas)
  // Desktop: 300px fijo
  card: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px',
  
  // Avatar: Tamaño fijo para logos/perfiles
  avatar: '100px',
  
  // Team: Fotos de equipo adaptativas
  team: '(max-width: 640px) 180px, 220px',
  
  // Thumbnail: Miniaturas pequeñas
  thumbnail: '(max-width: 640px) 150px, 200px',
};

/**
 * Configuración de anchos descriptores para cada variante
 */
const VARIANT_WIDTHS = {
  small: 480,
  medium: 800,
  large: 1200,
};

const SmartImage: React.FC<SmartImageProps> = ({
  basePath,
  usage,
  alt,
  fallbackSize = 'small',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className,
  style,
  ...rest
}) => {
  // Limpiar basePath de posibles sufijos existentes
  const cleanBasePath = basePath.replace(/-(small|medium|large)\.webp$/i, '');
  
  // Generar srcSet automáticamente
  const srcSet = `${cleanBasePath}-small.webp ${VARIANT_WIDTHS.small}w, ${cleanBasePath}-medium.webp ${VARIANT_WIDTHS.medium}w, ${cleanBasePath}-large.webp ${VARIANT_WIDTHS.large}w`;
  
  // Seleccionar src fallback basado en fallbackSize
  const src = `${cleanBasePath}-${fallbackSize}.webp`;
  
  // Obtener sizes predefinido según el uso
  const sizes = USAGE_SIZES[usage];
  
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default SmartImage;
