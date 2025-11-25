import Navbar from "../components/Navbar";
import AboutSobreNosotros from "@/components/AboutSobreNosotros";
import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";

const SobreNosotros = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1 w-full">
      {/* Hero Institucional */}
      <section
        className="relative left-1/2 -translate-x-1/2 w-screen h-[50vh] md:h-[70vh] flex items-center overflow-hidden"
        aria-label="Hero Sobre Nosotros"
        style={{
          backgroundImage: "url('/images/hero-nosotros.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Sobre Nosotros
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-inter text-white/95 leading-relaxed drop-shadow-md">
              Somos un equipo comprometido con la innovación farmacéutica, la seguridad del paciente y la excelencia científica. Nuestra misión es desarrollar soluciones inteligentes que impulsen el futuro de la salud.
            </p>
          </div>
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
