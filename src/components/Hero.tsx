// src/components/Hero.tsx
const keywords = [
  { word: "Salud", color: "#9333ea" },
  { word: "Ciencia", color: "#9333ea" },
  { word: "Innovación", color: "#9333ea" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative left-1/2 -translate-x-1/2 w-screen h-[70vh] min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/Hero-Index.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay degradado */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="w-full h-full rounded-2xl"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)"
          }}
        />
      </div>
      {/* Contenido centrado */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-8">
        <div className="mx-auto max-w-4xl bg-black/50 rounded-xl p-6 md:p-10 shadow-lg backdrop-blur-sm flex flex-col items-center text-white">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight tracking-tight break-words"
            style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', lineHeight: 1.15 }}
          >
            Investigación rigurosa, impacto real en la
            <span className="inline-block mx-2 highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>SALUD</span>,
            <span className="inline-block mx-2 highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>CIENCIA</span> e
            <span className="inline-block mx-2 highlight-keyword" style={{ fontFamily: 'Merriweather, serif' }}>INNOVACIÓN</span>.
          </h1>
          <h2
            className="text-white text-base sm:text-xl font-light text-center mb-8 leading-relaxed"
            style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', lineHeight: 1.6, maxWidth: 700 }}
          >
            Unimos ciencia, formación y compromiso para avanzar en la farmacología y la terapéutica.
          </h2>
          <a
            href="/herramientas"
            className="bg-[#9333ea] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#3BB9FF] transition text-lg focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:ring-offset-2 font-poppins"
            style={{ fontFamily: 'Poppins, Montserrat, Arial, sans-serif', marginTop: '1rem', minWidth: '180px' }}
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
        @media (max-width: 640px) {
          h1 {
            font-size: 1.9rem;
            line-height: 1.15;
          }
          h2 {
            font-size: 0.95rem;
            line-height: 1.45;
          }
        }
      `}</style>
    </section>
  );
}