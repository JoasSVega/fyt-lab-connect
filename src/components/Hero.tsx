// src/components/Hero.tsx
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    bgRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  return (
    <section
      id="inicio"
      className="hero-container"
    >
      {/* Imagen de fondo unificada */}
      <picture>
        <source 
          srcSet="/images/hero-index-large.webp" 
          media="(min-width: 1280px)" 
        />
        <source 
          srcSet="/images/hero-index-medium.webp" 
          media="(min-width: 640px)" 
        />
        <img 
          ref={bgRef}
          src="/images/hero-index-small.webp" 
          alt="" 
          className="hero-image" 
          aria-hidden="true"
        />
      </picture>
      {/* Overlay oscuro unificado */}
      <div className="hero-overlay" />
      {/* Contenido centrado con text-shadow */}
      <div className="relative z-10 w-full flex items-center justify-center px-6 md:px-12 hero-text-shadow">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-center text-white">
          <h1 className="hero-title text-white font-poppins font-bold text-center mb-6 tracking-tight">
            {"Investigación rigurosa, impacto real en la "}
            <span className="glow-salud" style={{ fontFamily: 'Merriweather, serif' }}>SALUD</span>{", "}
            <span className="glow-ciencia" style={{ fontFamily: 'Merriweather, serif' }}>CIENCIA</span>{" e "}
            <span className="glow-innovacion" style={{ fontFamily: 'Merriweather, serif' }}>INNOVACIÓN</span>{"."} 
          </h1>
          <h2 className="hero-subtitle text-white font-light font-poppins text-center mb-8 leading-relaxed" style={{ maxWidth: 700 }}>
            Unimos ciencia, formación y compromiso para avanzar en la farmacología y la terapéutica.
          </h2>
          <a
            href="/herramientas"
            className="bg-[#9333ea] text-white font-semibold py-2.5 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:ring-offset-2 font-poppins inline-flex items-center justify-center text-center w-auto max-w-[92vw] border-2 border-transparent btn-text-enhanced btn-solid-interactive"
            style={{
              fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
              marginTop: '1rem',
              minWidth: '10rem',
              fontSize: 'clamp(0.95rem, 2.1vw, 1.125rem)'
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
