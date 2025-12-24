// src/components/Hero.tsx

export default function Hero() {
  return (
    <section
      id="inicio"
      className="hero-container"
      style={{ minHeight: '500px' }}
    >
      {/* Imagen de fondo optimizada para móviles - LCP crítico */}
      {/* ESTRUCTURA ESTRICTA: Cada viewport carga EXACTAMENTE su versión */}
      <picture>
        {/* 1. ESCRITORIO (>1024px): Solo aquí se permite la imagen pesada */}
        <source 
          media="(min-width: 1024px)" 
          srcSet="/images/hero-index-large.webp" 
        />
        
        {/* 2. TABLET (640px - 1023px): Imagen mediana */}
        <source 
          media="(min-width: 640px)" 
          srcSet="/images/hero-index-medium.webp" 
        />
        
        {/* 3. MÓVIL (<640px): Imagen súper ligera OBLIGATORIA */}
        {/* Nota: NO usamos srcSet aquí, solo src para evitar que el navegador decida mal */}
        <img 
          src="/images/hero-index-small.webp" 
          alt="Investigación rigurosa, impacto real en la salud, ciencia e innovación"
          className="hero-image"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
      {/* Overlay oscuro unificado */}
      <div className="hero-overlay" />
      {/* Contenido centrado con text-shadow */}
      <div className="relative z-10 w-full flex items-center justify-center px-6 md:px-12 hero-text-shadow">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-center text-white">
          <h1 className="hero-title text-white font-poppins font-bold text-center mb-6">
            {"Investigación rigurosa, impacto real en la "}
            <span className="glow-salud font-bold">SALUD</span>{", "}
            <span className="glow-ciencia font-bold">CIENCIA</span>{" e "}
            <span className="glow-innovacion font-bold">INNOVACIÓN</span>{"."} 
          </h1>
          <h2 className="hero-subtitle text-white/95 font-light font-poppins text-center mb-8" style={{ maxWidth: 680 }}>
            Unimos ciencia, formación y compromiso para avanzar en la farmacología y la terapéutica.
          </h2>
          <a
            href="/herramientas"
            className="bg-fyt-purple text-white font-semibold py-3 px-7 rounded-full shadow-soft focus:outline-none focus:ring-2 focus:ring-fyt-purple/50 focus:ring-offset-2 font-poppins inline-flex items-center justify-center text-center w-auto max-w-[92vw] border-2 border-transparent btn-text-enhanced btn-solid-interactive"
            style={{
              marginTop: '0.5rem',
              minWidth: '11rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.0625rem)'
            }}
            aria-label="Accede a nuestras herramientas científicas"
          >
            Accede a nuestras herramientas científicas
          </a>
        </div>
      </div>
    </section>
  );
}
