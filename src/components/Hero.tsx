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
      className="relative left-1/2 -translate-x-1/2 w-screen h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-index.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {/* Contenido centrado */}
      <div className="relative z-10 w-full flex items-center justify-center px-6 md:px-12">
  <div className="mx-auto max-w-5xl w-full flex flex-col items-center text-white">
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
          position: relative;
          text-transform: uppercase;
          font-weight: 800;
          display: inline-block;
          font-size: 0.85em; /* ligeramente menor para evitar superposición */
          line-height: 1.05;
          padding: .1rem .55rem .2rem;
          border-radius: 0.75rem;
          letter-spacing: .08em;
          background: linear-gradient(135deg,#6d28d9 0%, #7e22ce 35%, #9333ea 60%, #b07df8 100%);
          color: #ffffff;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 3px 10px rgba(147,51,234,0.5);
          text-shadow: 0 2px 8px rgba(0,0,0,0.55);
          isolation: isolate;
          vertical-align: baseline;
        }
        .highlight-keyword::after {
          content: '';
          position: absolute;
          left: 8%;
          bottom: 4px;
          width: 84%;
          height: 6px;
          background: linear-gradient(90deg,rgba(255,255,255,0.15),rgba(255,255,255,0.5),rgba(255,255,255,0.15));
          border-radius: 999px;
          filter: blur(3px);
          pointer-events: none;
          z-index: -1;
        }
        .highlight-keyword:focus-visible, .highlight-keyword:hover {
          box-shadow: 0 0 0 2px rgba(255,255,255,0.25), 0 6px 18px rgba(147,51,234,0.65);
          outline: none;
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