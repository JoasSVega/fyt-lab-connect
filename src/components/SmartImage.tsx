import React from "react";

/**
 * SmartImage - Componente ULTRA-OPTIMIZADO para móviles
 * 
 * ESTRATEGIA RADICAL PARA GOOGLE PAGESPEED 90+:
 * =================================================
 * 
 * PROBLEMA IDENTIFICADO:
 * - Móviles Retina (2x DPR) calculan: 455px × 2 = 910px
 * - Con srcSet "600w, 1024w", navegador elige 1024w (medium)
 * - Resultado: 549 KiB desperdiciados en móviles
 * 
 * SOLUCIÓN IMPLEMENTADA:
 * Para CARDS (carrusel): NO usar srcSet en absoluto
 * - Solo src="/path/small.webp" 
 * - Navegador SIEMPRE carga small (600px)
 * - Suficiente incluso para Retina 2x (1.32x coverage)
 * 
 * Para HERO: srcSet normal (necesita calidad)
 * 
 * @example
 * ```tsx
 * <SmartImage 
 *   basePath="/images/Carrusel/Farmacologia"
 *   alt="Farmacología"
 *   usage="card"  // NO genera srcSet
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
 * OPTIMIZADO PARA FORZAR SMALL EN MÓVILES
 */
const USAGE_SIZES: Record<ImageUsage, string> = {
  // Hero: Necesita srcSet para diferentes viewports
  hero: '100vw',
  
  // Card: SOLO usa small.webp (sin srcSet)
  // No necesita sizes porque no tiene srcSet
  card: '455px', // Informativo, no se usa realmente
  
  // Avatar: Tamaño fijo pequeño
  avatar: '100px',
  
  // Team: Fotos de equipo
  team: '(max-width: 640px) 180px, 220px',
  
  // Thumbnail: SOLO usa small.webp (sin srcSet)
  thumbnail: '150px', // Informativo, no se usa realmente
};

/**
 * Configuración de anchos descriptores para cada variante
 * ULTRA-OPTIMIZADO PARA PAGESPEED 90+
 * - small.webp: 480x480px (PERFECTO para 455px display = 1.05x ratio)
 * - medium.webp: 1024x882px reales
 * 
 * AHORRO ACUMULADO:
 * - 800px → 600px: 419.6 KB
 * - 600px → 480px: 251.8 KB
 * - Total: 671.4 KB ahorrados
 */
const VARIANT_WIDTHS = {
  small: 480,  // Ancho REAL de -small.webp generado (ULTRA-optimizado)
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
  
  // ESTRATEGIA RADICAL: Para cards y thumbnails, NO usar srcSet
  // Esto FUERZA al navegador a cargar SIEMPRE small.webp
  // incluso en pantallas Retina 2x/3x
  const shouldUseSrcSet = usage !== 'card' && usage !== 'thumbnail';
  
  // REGLA: src SIEMPRE apunta a -small.webp (mobile first)
  const src = `${cleanBasePath}-small.webp`;
  
  // srcSet SOLO para hero, avatar, team (donde se necesita calidad)
  // Para cards: undefined (navegador solo usa src)
  const srcSet = shouldUseSrcSet 
    ? `${cleanBasePath}-small.webp ${VARIANT_WIDTHS.small}w, ${cleanBasePath}-medium.webp ${VARIANT_WIDTHS.medium}w`
    : undefined;
  
  // sizes SOLO si hay srcSet
  const sizes = shouldUseSrcSet ? USAGE_SIZES[usage] : undefined;
  
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
