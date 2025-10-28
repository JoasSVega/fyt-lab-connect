// src/components/Hero.tsx
import { useEffect, useRef } from "react";
const keywords = [
  { word: "Salud", color: "#9333ea" },
  { word: "Ciencia", color: "#9333ea" },
  { word: "Innovación", color: "#9333ea" },
];

export default function Hero() {
  const bgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Apply fetchpriority via DOM to avoid React 18 type gaps
    bgRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  return (
    <section
      id="inicio"
      className="relative left-1/2 -translate-x-1/2 w-screen h-[68vh] min-h-[460px] flex items-center justify-center overflow-hidden"
    >
      {/* LCP image with responsive sources; fetchpriority set via ref on img */}
      <picture>
        <source
          type="image/avif"
          srcSet="/images/Hero-Index-400.avif 400w, /images/Hero-Index-800.avif 800w, /images/Hero-Index-1200.avif 1200w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/Hero-Index-400.webp 400w, /images/Hero-Index-800.webp 800w, /images/Hero-Index-1200.webp 1200w"
          sizes="100vw"
        />
        <img
          src="/images/Hero-Index.jpg"
          alt="Fondo del hero"
          decoding="async"
          ref={bgRef}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      </picture>
      {/* Overlay oscuro opaco al 50% sobre toda el área */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      {/* Contenido centrado */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-8">
  <div className="mx-auto max-w-4xl rounded-xl p-5 md:p-10 shadow-lg flex flex-col items-center text-white">
          <h1
            className="text-white font-bold text-center mb-6 tracking-tight"
            style={{
              fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
              lineHeight: 1.15,
              // Tipografía fluida: entre ~28px y ~56px según ancho de viewport
              fontSize: 'clamp(1.75rem, 5.5vw, 3.5rem)',
              // No cortar palabras: solo saltos en espacios
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
              hyphens: 'none',
            }}
          >
            {"Investigación rigurosa, impacto real en la "}
            <span className="highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>SALUD</span>{", "}
            <span className="highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>CIENCIA</span>{" e "}
            <span className="highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>INNOVACIÓN</span>{"."}
          </h1>
          <h2
            className="text-white font-light text-center mb-8 leading-relaxed"
            style={{
              fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
              lineHeight: 1.6,
              maxWidth: 700,
              // Tipografía fluida secundaria: ~16px a ~22px
              fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
              // No cortar palabras
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
              hyphens: 'none',
            }}
          >
            Unimos ciencia, formación y compromiso para avanzar en la farmacología y la terapéutica.
          </h2>
          <a
            href="/herramientas"
            className="bg-[#9333ea] text-white font-semibold py-2.5 px-6 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:ring-offset-2 font-poppins inline-flex items-center justify-center text-center w-auto max-w-[92vw] border-2 border-transparent hover:bg-white hover:text-[#9333ea] hover:border-[#9333ea]"
            style={{
              fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
              marginTop: '1rem',
              minWidth: '10rem',
              // Texto del botón fluido y centrado; menos agresivo en móviles
              fontSize: 'clamp(0.95rem, 2.1vw, 1.125rem)'
            }}
            aria-label="Accede a nuestras herramientas científicas"
          >
            Accede a nuestras herramientas científicas
          </a>
        </div>
      </div>
      {/* Estilos reutilizables */}
      <style>{`
        .highlight {
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .highlight-keyword {
          color: #9333ea; /* morado vibrante */
          text-transform: uppercase;
          font-weight: 800;
          display: inline-block;
          font-size: inherit; /* usar mismo tamaño que el texto circundante */
          text-shadow: 0 1px 6px rgba(0,0,0,0.45);
        }
        /* Ajustes móviles adicionales: asegurar envoltura de palabras y evitar recortes */
        @media (max-width: 640px) {
          h1, h2 { 
            overflow-wrap: normal; 
            word-break: keep-all; 
            hyphens: none; 
          }
        }
      `}</style>
    </section>
  );
}