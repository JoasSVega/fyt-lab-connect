import Navbar from "../components/Navbar";
import AboutSobreNosotros from "@/components/AboutSobreNosotros";
import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";

const SobreNosotros = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-24">
      {/* Hero Institucional */}
      <section
        className="relative left-1/2 -translate-x-1/2 w-screen min-h-[70vh] flex items-center justify-center text-center overflow-hidden"
        aria-label="Hero Sobre Nosotros"
      >
        {/* Background Image */}
        <img
          src="/images/hero-nosotros.png"
          alt="Fondo hero Sobre Nosotros"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-white/65 pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-extrabold text-slate-800 mb-6 tracking-tight">
            Sobre Nosotros
          </h1>
          <p className="text-lg sm:text-xl font-inter text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Nuestra misión, visión y compromiso con la ciencia y la innovación.
          </p>
        </div>
      </section>
      {/* Sección Nuestro Objetivo y Nuestros Valores (desde About) */}
  <AboutSobreNosotros />
      {/* Sección Nuestro Equipo */}
      <section className="py-20 min-h-[60vh] bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="site-section-title text-center text-fyt-dark mb-8 drop-shadow-lg">Nuestro Equipo</h2>
          <Team compact />
        </div>
      </section>
    </main>
      <FloatingContact />
  </div>
);

export default SobreNosotros;
