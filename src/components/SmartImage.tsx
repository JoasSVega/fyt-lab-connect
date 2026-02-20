import React from "react";

/**
 * SmartImage - Componente optimizado para imágenes responsivas
 * 
 * REGLAS DE ORO - MOBILE FIRST:
 * 1. El atributo `src` apunta SIEMPRE a -small.webp (mobile first)
 * 2. El `srcSet` NUNCA incluye -large.webp (prohibido en móvil)
 *    - srcSet limitado: ${basePath}-small.webp 500w, ${basePath}-medium.webp 1000w
 * 3. El atributo `sizes` es "mentiroso" para engañar a pantallas Retina:
 *    - "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 * 4. Lazy loading por defecto: loading="lazy", decoding="async"
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

export interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'loading' | 'fetchPriority'> {
  /** 
   * Ruta base de la imagen (sin sufijos -small/-medium/-large.webp)
   * Ejemplo: "/images/Carrusel/Farmacologia"
   */
  basePath: string;
  
  /** 
   * Tipo de uso para determinar el atributo sizes automáticamente
   * - 'hero': Imagen a pantalla completa (100vw en todas las resoluciones)
   * - 'card': Tarjetas en carrusel/grid (mobile first: 100vw, optimiza para small/medium)
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
   * - 'small': Ideal para móviles (default - RECOMENDADO)
   * - 'medium': Balance entre calidad y tamaño
   * - 'large': Máxima calidad (RARA VEZ - solo héroes críticos)
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

  /**
   * Prioridad semántica: cuando es true, fuerza `loading="eager"` y `fetchPriority="high"`.
   * Por defecto false (carga diferida).
   */
  priority?: boolean;
}

/**
 * Configuración de sizes predefinidos por tipo de uso
 * MOBILE FIRST - Con "sizes mentiroso" para forzar descarga de versiones ligeras
 */
const USAGE_SIZES: Record<ImageUsage, string> = {
  // Hero: Ocupa toda la pantalla en todos los dispositivos
  hero: '100vw',
  
  // Card: Para carruseles y grids responsivos (MOBILE FIRST)
  // Google PageSpeed detectó: dimensiones reales en móvil = 455x455px
  // Ajustado para coincidir con las dimensiones reales mostradas
  // Móvil (<640px): 455px (valor real medido en Chrome DevTools móvil)
  // Tablet (640-1024px): 600px (mantiene medium)
  // Desktop (>1024px): 455px (regresa a card compacto)
  card: '(max-width: 640px) 455px, (max-width: 1024px) 600px, 455px',
  
  // Avatar: Tamaño fijo para logos/perfiles
  avatar: '100px',
  
  // Team: Fotos de equipo adaptativas
  team: '(max-width: 640px) 180px, 220px',
  
  // Thumbnail: Miniaturas pequeñas
  thumbnail: '(max-width: 640px) 150px, 200px',
};

/**
 * Configuración de anchos descriptores para cada variante
 * IMPORTANTE: Deben coincidir con las dimensiones REALES de las imágenes generadas
 * - small.webp: 800x689px reales (no 500px!)
 * - medium.webp: 1024x882px reales
 */
const VARIANT_WIDTHS = {
  small: 800,  // Ancho REAL de -small.webp generado
  medium: 1024, // Ancho REAL de -medium.webp generado
  // large NUNCA aparece en srcSet - solo como fallback en casos especiales
};

const SmartImage: React.FC<SmartImageProps> = ({
  basePath,
  usage,
  alt,
  fallbackSize = 'small',
  width,
  height,
  decoding = 'async',
  priority = false,
  className,
  style,
  ...rest
}) => {
  // Limpiar basePath de posibles sufijos existentes
  const cleanBasePath = basePath.replace(/(?:-(small|medium|large))?\.webp$/i, '');
  
  // REGLA DE ORO: srcSet NUNCA incluye -large.webp
  // Solo small (500w) y medium (1000w) para forzar descargas ligeras en móvil
  const srcSet = `${cleanBasePath}-small.webp ${VARIANT_WIDTHS.small}w, ${cleanBasePath}-medium.webp ${VARIANT_WIDTHS.medium}w`;
  
  // REGLA DE ORO: src SIEMPRE apunta a -small.webp (mobile first)
  const src = `${cleanBasePath}-small.webp`;
  
  // Obtener sizes predefinido según el uso (con "tamaño mentiroso" mobile-first)
  const sizes = USAGE_SIZES[usage];
  
  // Derivar atributos de prioridad
  const loading: 'eager' | 'lazy' = priority ? 'eager' : 'lazy';
  const fetchPriority: 'high' | 'low' | 'auto' = priority ? 'high' : 'auto';

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
