import Navbar from "../components/Navbar";
import AboutSobreNosotros from "@/components/AboutSobreNosotros";
import Team from "@/components/Team";
import FloatingContact from "@/components/FloatingContact";

const SobreNosotros = () => (
  <div className="w-full bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-24">
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
